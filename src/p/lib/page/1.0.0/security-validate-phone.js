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

	// 是否已经检测“短信验证号”
	var isCheckedPhoneCode = false;
	// 是否已经检测过“手机号”
	var isCheckedPhone = false;
	// 是否可以开始倒计时
	var canCountDown = true;
	// 手机验证码对象
	var phoneCode;
	// 获取验证码倒计时Timer
	var getPhoneCodeTimer;

	// 表单交互数据，包括表单对象、类型、提示内容
	var interactArr = [
		// 验证手机
		{
			// 验证手机-手机号
			obj: $("#J_phone").length > 0 ? $("#J_phone") : null,
			type: "phone",
			nullText: "请输入11位您常用的手机号码！",
			errorText: "手机号不正确，请重新输入！",
			existsText: "该手机号已存在或已绑定，请更换手机！",
			irrelevantText: "请输入接收到验证码的手机号！",
			validateFailedText: "验证手机失败，请重试"
		},
		{
			// 验证手机-短信验证码
			obj: $("#J_phoneCode").length > 0 ? $("#J_phoneCode") : null,
			type: "phoneCode",
			nullText: "请输入发送到您手机上的6位数字短信验证码",
			errorText: "验证码不正确，请重新输入",
			expiredText: "验证码已过期，请重新获取",
			sendFailedText: "手机验证码发送失败",
			sendSuccessText: "验证码发送成功，请查看手机",
			getCodeTipText: "请点击获取验证码"
		}
	];
    // 接口数据
	var apiData  = {
		// 表单提交
		formAction: cdnConfig.my + "/security/bindphone",
		// 检验手机是否已经被绑定
		checkPhoneAction: cdnConfig.my + "/ajax/checkphone",
		// 发送验证码
		sendPhoneCodeAction: cdnConfig.my + '/ajax/sendsms',
		// 检验验证码是否正确
		checkPhoneCodeAction: cdnConfig.my + "/ajax/checkphonecode",
		// 成功页面
		success: cdnConfig.my + "/security/bindphonesucc"
	};

	// 获取验证码数据
	var getPhoneCodeArr = [
		// 验证手机
		{
			obj: $("#J_phoneCode").length > 0 ? $("#J_phoneCode") : null,
			phoneObj: $("#J_phone").length > 0 ? $("#J_phone") : null,
			sendCodeClickNum: 0,
			phoneNum: ""
		}
	];
	phoneCode = getPhoneCodeArr[0];
	// 绑定事件
	bindEvent(interactArr, phoneCode);

	// 绑定事件
	function bindEvent(interactArr, phoneCode) {
		var len = interactArr.length;
		for(var i = 0; i < len; i++) {
			(function(index) {
				var arrItem = interactArr[index];
				// 为表单对象注册blur和keyup事件
				if(arrItem["obj"]) {
					arrItem["obj"].on("blur", function() {
						if(arrItem["type"] == "phone") {
							checkPhone(arrItem);
						} else if(arrItem["type"] == "phoneCode") {
							checkPhoneCode(arrItem);
						}
					}).on("keyup", function() {
						// 判断是否所有输入框都有内容。如果有，则"提交"按钮高亮显示
						var validatePhoneVal = $.trim(interactArr[0]["obj"].val()).replace("/\s/g",''),
							validatePhoneCodeVal = $.trim(interactArr[1]["obj"].val()).replace("/\s/g",'');
						(validatePhoneVal != "" && validatePhoneCodeVal != "") ? $("#J_submitBtn").addClass("on") : $("#J_submitBtn").removeClass("on");
					});
				}
			})(i);
		}

		// 点击获取验证码
		$("#J_getValidatePhoneCode").on("click", function() {
			if(isCheckedPhone) {
				// 如果手机号码已经检测
				if(phoneCode["sendCodeClickNum"] >= 3){
		            showTips(phoneCode["obj"], '您本次发送手机验证码次数已经用完,请刷新页面重试.','no');
		            return;
		        } else{
		            phoneCode["sendCodeClickNum"] ++;
		        }
				canCountDown = false;
				// 倒计时60秒
				countDownFn(60, $("#J_getValidatePhoneCode"), $("#J_countDown"));
				// 发送验证码到手机
				sendPhoneCode(interactArr[1], phoneCode, interactArr[0]);
			}
		});

		// 验证手机下一步按钮的click事件
		$("#J_submitBtn").on("click", function() {
			if(isCheckedPhoneCode && isCheckedPhone) {
				submitForm();
			}
		});
	}

	/**
	 * 表单验证通过，提交表单
	 * 
	 * 创建时间：2015-11-25 13:48:44
	 * 创建人：yansiwen
	 */
	function submitForm() {
		$.post(
            apiData.formAction, {
                "phone": $("#J_phone").val(),
                "phone_code": $("#J_phoneCode").val()
            },
            function(result) {
                switch(result.code.toString()) {
	                case "200":
		                // 绑定成功
		                window.location.href = apiData.success;
		                break;
	                case "400":
		                // 绑定失败
		                break;
	                default:
		                break;
                }
            },
            "json"
        );
	}

	//倒计时
    function countDownFn(t, obj1, obj2) {
	    var tempT = t;
	    obj2.show();
	    var getPhoneCodeTimer =  setInterval(function(){
		    if(t<=0){
			    clearInterval(getPhoneCodeTimer);
			    canCountDown = true;
			    obj2.html(tempT + "秒");
			    obj2.hide();
			    obj1.html('重新获取验证码');
		    }else{
			    t = t - 1;
			    obj2.html(t + "秒");
		    }
	    },1000);
    }

    // 检测手机号码格式
    function checkPhone(arrItem) {
    	var obj = arrItem["obj"] || arrItem,
			val = obj.val();

		if(val == "") {
			chkPhoneError();
			showTips(obj, arrItem["nullText"], "no");
			return;
		}
		// 判断手机号是否正确
		if(!khValidate.chkPhone(val)) {
			chkPhoneError();
			showTips(obj, arrItem["errorText"], "no");
		} else {
			// 检验手机号码是否已经存在或已绑定
			checkPhoneIsExists(obj, arrItem);
			if(isCheckedPhoneCode) {
				$("#J_submitBtn").addClass("on");
			}
		}
    }

    // 检测验证码格式
    function checkPhoneCode(arrItem) {
    	var obj = arrItem["obj"] || arrItem,
			val = obj.val(),
		    clickNum = getPhoneCodeArr[0]["sendCodeClickNum"];

		if(val == "") {
			isCheckedPhoneCode = false;
			showTips(obj, arrItem["nullText"], "no");
			return;
		}
		// 判断验证码是否为6位纯数字以及判断输入的验证码与发送到手机的验证码是否相同
		if(!khValidate.chkNumber(val, 6)) {
			isCheckedPhoneCode = false;
			showTips(obj, arrItem["errorText"], "no");
		} else {
			if(clickNum > 0 && clickNum < 4) {
				// 检测验证码是否正确
				validatePhoneCode(obj, arrItem);
				if(isCheckedPhone) {
					$("#J_submitBtn").addClass("on");
				}
			}
		}
    }

    // 手机号码格式有误
    function chkPhoneError(flag) {
    	isCheckedPhone = false;
    	clearInterval(getPhoneCodeTimer);
    	if(canCountDown == false) {
        	$("#J_countDown").html("60秒").hide();
        	$("#J_getValidatePhoneCode").html('重新获取验证码');
        }
    	canCountDown = true;
    }

	// 检验手机号码是否已经存在
	function checkPhoneIsExists(obj, arrItem) {
		var val = obj.val();
		$.ajax({
			url: apiData.checkPhoneAction,
			type: "post",
			data: {
				"phone": val
			},
			dataType: "json",
			success: function(res) {
				if(res.code.toString() == "200") {
					// 该手机号码未被绑定
					isCheckedPhone = true;
					showTips(obj, "", "ok");
				} else if(res.code.toString() == "400") {
					// 该手机号码已存在或已绑定
					chkPhoneError();
					showTips(obj, arrItem["existsText"], "no");
				}
			},
			error: function() {
				chkPhoneError();
				showTips(obj, arrItem["validateFailedText"], "no");
			}
		});
	}

	// 发送验证码到手机
	function sendPhoneCode(arrItem, obj, phoneObj) {
		var phoneNum = obj["phoneObj"].val();
		var sendCodeClickNum = obj["sendCodeClickNum"];

		$.ajax({
			url: apiData.sendPhoneCodeAction,
			type: "post",
            data: {
                "phone": phoneNum,
	            "type": 4
            },
            dataType: "json"
        })
        .done(function(res) {
            switch(res.code.toString()) {
	            case "200":
		            // 验证码发送成功
		            showTips(obj["obj"], arrItem["sendSuccessText"], "normal");
		            break;
	            case "400":
		            // 验证码发送失败或提示60秒内只能获取一次验证码
		            showTips(obj["obj"], res.message, "no");
		            break;
            }
        });
	}

	// 检测验证码是否正确
	function validatePhoneCode(code, arrItem) {
		var val = code.val();
        $.ajax({
            url: apiData.checkPhoneCodeAction,
	        type: "post",
	        data: {
                "phone_code": val
            },
            dataType: "json"
        })
        .done(function(res) {
            if(res.code.toString() == "200") {
            	isCheckedPhoneCode = true;
                showTips(code, "", "ok");
            } else if(res.code.toString() == "400") {
	            // 验证码过期
	            isCheckedPhoneCode = false;
	            showTips(code, res.message, "no");
            }
        })
        .fail(function() {
        	isCheckedPhoneCode = false;
        });
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

				text != "" ? tipDOM.html('<span>' + text + '</span>') : tipDOM.html(okTip);
				break;
			case 'normal':
				tarDOM
					.removeClass("error");

				tipDOM.html(text);
				break;
			default :
				break;
		}
		//focus
		obj.on("focus", function(event){
			tipDOM.empty();
			tarDOM
				.removeClass("error")
				.find(".tip-ok")
				.remove();
		});
	}

});
