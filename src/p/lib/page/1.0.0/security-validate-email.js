define(function(require, exports, module) {
	/*
	 * 按需加载对应css
	 * 这里首先让右边加载完毕，然后再加载左边菜单
	 */
	document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

	/* 按需加载js */
	var khValidate = require('../../components/khValidate/1.0.0/khValidate');
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

	// 是否已经检测“邮箱地址”
	var isCheckedEmail = false;
	// 是否可以开始倒计时
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
		// 验证邮箱
		{
			// 验证邮箱
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
		// 检验邮箱是否已经被绑定
		checkEmailExistsAction: cdnConfig.my + "/ajax/checkemail",
		// 发送验证邮件
		sendEmailAction: cdnConfig.my + "/security/bindemail"
	};

	// 绑定事件
	bindEvent();

	// 绑定事件
	function bindEvent() {
		var len = interactArr.length;
		for(var i = 0; i < len; i++) {
			(function(index) {
				var arrItem = interactArr[index];
				// 为表单对象注册blur和keyup事件
				if(arrItem["obj"]) {
					arrItem["obj"].on("blur", function() {
						if(arrItem["type"] == "email") {
							checkEmail(arrItem);
						}
					}).on("keyup", function() {
						if(canCountDown) {
							// 判断是否所有输入框都有内容。如果有，则"提交"按钮高亮显示
							var validateEmailVal = $.trim(interactArr[0]["obj"].val()).replace("/\s/g",'');
							validateEmailVal != "" ? $("#J_submitBtn").addClass("on") : $("#J_submitBtn").removeClass("on");
						}
					}).on("focus", function() {
						isCheckedEmail = false;
						showTips(arrItem["obj"], arrItem["normalText"], "normal");
					});
				}
			})(i);
		}

		// 验证邮箱"发送验证邮件"按钮的click事件
		$("#J_submitBtn").on("click", function() {
			if(isCheckedEmail && canCountDown) {
				// 发送邮件验证到邮箱
				sendEmail(interactArr[0]);
			}
		});
	}

    // 检测邮箱地址
	function checkEmail(arrItem) {
		var obj = arrItem["obj"] || arrItem,
			tipDOM = obj.parent().siblings("p.tips"),
			val = obj.val();

		// var reg = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/;
			
		if(val == "") {
			chkEmailError(tipDOM);
			
			$("#J_submitBtn").removeClass("on").html("发送验证邮件");
			showTips(obj, arrItem["nullText"], "no");
			return;
		}
		// 检测邮箱长度是否小于6或大于30个字符
		if(val.length < 6 || val.length > 30) {
			chkEmailError(tipDOM);

			$("#J_submitBtn").addClass("on").html("发送验证邮件");
			showTips(obj, arrItem["LenText"], "no");
		} else {
			// 检测邮箱格式
			if(khValidate.chkEmail(val)) {
			// if(reg.test(val)){
				if(canCountDown) {
					tipDOM.show();
					$("#J_submitBtn").addClass("on");
					$("#J_tipsNotify").hide();
					// 检验邮箱地址是否已经存在
					checkEmailIsExists(obj, arrItem);
				}
			} else {
				chkEmailError(tipDOM);

				$("#J_submitBtn").addClass("on").html("发送验证邮件");
				showTips(obj, arrItem["errorText"], "no");
			}
		}
	}

	// 邮箱地址有误
	function chkEmailError(tipDOM) {
		clearInterval(getEmailTimer);
		tipDOM.show();
		$("#J_tipsNotify").hide();
		isCheckedEmail = false;
		canCountDown = true;
	}

	// 检验邮箱地址是否已经存在
	function checkEmailIsExists(obj, arrItem) {
		var val = obj.val();
		$.ajax({
			url: apiData.checkEmailExistsAction,
			type: "post",
			data: {
				"email": val
			},
			dataType: "json",
			success: function(res) {
				if(res.code.toString() == "400") {
					// 邮箱地址已经被绑定
					isCheckedEmail = false;
					showTips(obj, arrItem["existsText"], "no");
				} else if(res.code.toString() == "200") {
					// 该邮箱地址未被绑定
					isCheckedEmail = true;
					showTips(obj, "", "ok");
				}
			},
			error: function() {
				isCheckedEmail = false;
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
			type: "post",
			data : {
				"email"  :  mailName
			},
			dataType: "json"
        })
        .done(function(res) {
			switch(res.code.toString()) {
				case "200":
					// 发送邮件成功
					if(canCountDown) {
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
					// 发送邮件失败
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

	/*
     *	获取"验证邮件"倒计时
	 *	@param	{time}	时间间隔
	 *			{obj}	倒计时容器
     */
    function countDownFn(time, obj) {
        var tempT = time;
        obj.removeClass("on");
        getEmailTimer =  setInterval(function(){
            if(time <= 0){
                clearInterval(getEmailTimer);
	            canCountDown = true;
	            obj.addClass("on").html("发送验证邮件");
            } else{
	            canCountDown = false;
	            obj.html("重新获取(<span>" + time + "秒</span>)");
                time = time - 1;
            }
        },1000);
    }

	/*
	 *   通用提示信息函数
	 *   @param	{obj}  要提示的对象容器
	 *			{text}	提示的内容
	 *			{type}	提示类型
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
			case 'normal':
				if(canCountDown) {
					tipDOM.show().empty().html(text);
					$("#J_tipsNotify").hide();
				}
			default :
				break;
		}
	}
});
