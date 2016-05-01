define(function(require, exports, module) {
	/*
	 * 按需加载对应css
	 * 这里首先让右边加载完毕，然后再加载左边菜单
	 */
	document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

	/* 按需加载js */
	var dialog = require('../../components/dialog/1.0.0/dialog');
	var minBar = require('../../components/minBar/1.0.1/minBar');
	var template = require('../../template/tempcomment');
	
	/* =====================================================================
	 *    新版浮动工具栏交互
	 * =====================================================================*/
	minBar({
		mainCell   : '#J_minBar',
		pathConfig : cdnConfig,
		tpl        : template,
		tplName    : "tplMinBar",
        data : _globalConfig.minBar.data
	});

	// 是否可以倒计时开始
	var canCountDown = true;
	// 获取邮箱倒计时
	var getEmailTimer;
	// 邮箱域名对应地址
	var hash = {
		"163.com": "mail.163.com",
		"126.com": "mail.126.com",
		"yeah.net": "mail.yeah.net",
		"qq.com": "mail.qq.com",
		"foxmail.com": "mail.foxmail.com",
		"gmail.com": "mail.gmail.com",
		"sohu.com": "mail.sohu.com",
		"sogou.com": "mail.sogou.com",
		"sina.com.cn": "mail.sina.com.cn",//mail.10086.cn
		"10086.com": "mail.10086.cn", //139邮箱
		"139.com": "mail.139.com",
		"wo.cn": "mail.wo.cn", //沃邮箱
		"189.cn": "webmail30.189.cn", //电信189邮箱
		"live.cn": "mail.live.cn",	// Outlook
		"hotmail.com": "mail.hotmail.com", // Outlook
		"live.com":"mail.live.com", // Outlook
		"aliyun.com": "mail.aliyun.com", //阿里云
		"21.cn": "mail.21cn.com"	//21cn邮箱
	};

	// 表单交互数据，包括表单对象、类型、提示内容
	var interactArr = [
		// 修改邮箱-验证身份
		{
			// 验证邮箱-验证身份
			obj: $("#J_email").length > 0 ? $("#J_email") : null,
			type: "email",
			nullText: "请输入您能正常接收信息的邮箱地址如：abc@123.com",
			errorText: "邮箱地址无效，请输入正确地址，如：lenny211@163.com",
			existsText: "该邮箱已被注册，请更换新邮箱！",
			normalText: "请输入您能正常接收信息的邮箱地址如：abc@123.com",
			LenText: "邮箱名为6-30个字符",
			sendFailedText: "验证邮件发送失败"
		}
	];

	// 接口数据
	var apiData  = {
		// 发送验证邮件
		sendEmailAction: cdnConfig.my + "/security/editbindemailone"
	};

	// 绑定事件
	bindEvent();

	// 绑定事件
	function bindEvent() {
		var len = interactArr.length;
		// 验证邮箱-验证身份"发送验证邮件"按钮的click事件
		$("#J_submitBtn").on("click", function() {
			if(canCountDown) {
				// 发送邮件验证到邮箱
				sendEmail(interactArr[0]);
			}
		});
	}

	// 发送验证邮件到邮箱
	function sendEmail(arrItem) {
		var obj = arrItem["obj"],
			mailName = obj.val(),
			tipDOM = obj.parent().siblings("p.tips");

		$.ajax({
			url: apiData.sendEmailAction,
            data : {
				"email"  :  mailName
			},
			type: "post",
			dataType: "json"
        })
        .done(function(res) {
			switch(res.code.toString()) {
				case "200":
					if(canCountDown) {
						$("#J_submitBtn").addClass("on");
						tipDOM.hide();
						$("#J_tipsNotify").show();

						// 修改查看验证邮箱的地址
						alterEmailAddr();

						canCountDown = false;
						// 倒计时120秒
						countDownFn(120, $("#J_submitBtn"));
					}
					break;
				case "400":
					// 发送邮件失败或提示120秒内只能获取一封邮件
					showTips(obj, res.message, "no");
					break;
				default:
					break;
			}
        });
	}

	// 修改查看验证邮箱的地址
	function alterEmailAddr() {
		var url = $("#J_email").val().split('@')[1]; 
		for(var j in hash){
			if(j === url) {
				$("#J_checkEmail").attr("href", "http://" + hash[url]); 
			} else {
				$("#J_checkEmail").attr("href", "http://mail." + url);
			}
		}
	}

	//倒计时
    function countDownFn(t, obj) {
        var tempT = t;
	    getEmailTimer =  setInterval(function(){
            if(t<=0){
                clearInterval(getEmailTimer);
                canCountDown = true;
            	obj.removeClass("on");
            	obj.html("获取验证邮件");
            } else{
                obj.html("重新获取(<span>" + t + "秒</span>)");
                t = t - 1;
            }
        },1000);
    }

	/*
	 *   通用提示信息函数
	 *   @param {obj}  要提示的对象容器
	 */
	function showTips(obj, text, type) {
		var tarDOM = obj.parent();
		var tipDOM = tarDOM.siblings("p.tips");
		var TipHtml = '<i class="icon-tip-wrong"></i><span class="fc-c13">'+ text +'</span>';
		var okTip   = '<span class="fc-c13">' + text +'</span>';
		var okHtml  = '<i class="icon-tip-ok tip-ok"></i>';
		switch(type) {
			case 'no':
				tarDOM
					.addClass("error")
					.find(".tip-ok")
					.remove();

				tipDOM.html(TipHtml);

				break;
			case 'ok':
				tarDOM
					.find(".tip-ok")
					.remove()
					.end()
					.removeClass("error")
					.append(okHtml);

				tipDOM.html(okTip);

				break;
			default :
				tipDOM.html(text);
				break;
		}
	}
});
