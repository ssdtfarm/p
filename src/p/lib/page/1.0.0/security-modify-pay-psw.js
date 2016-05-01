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

	// 是否已经检测手机验证码
	var isCheckedPhoneCode = false;
	// 是否已经检测旧密码
	var isCheckedOldPsw = false;
	// 是否已经检测"新支付密码"
	var isCheckedSetPsw = false;
	// 是否已经检测“确认新支付密码”
	var isCheckedConfirmPsw = false;

	// 表单交互数据，包括表单对象、类型、提示内容
	var interactArr = {
		// 设置支付密码
		"set": [{
			// 设置支付密码-获取验证码
			obj: $("#J_modifyPhoneCode").length > 0 ? $("#J_modifyPhoneCode") : null,
			type: "phoneCode",
			nullText: "请输入发送到您手机上的6位数字短信验证码",
			errorText: "验证码不正确，请重新输入",
			sendFailedText: "验证码发送失败",
			sendSuccessText: "验证码发送成功，请查看手机"

		},
		{
			// 设置支付密码-设置支付密码
			obj: $("#J_modifyPayPsw").length > 0 ? $("#J_modifyPayPsw") : null,
			type: "set",
			nullText: "请设置6-20位数字、字母或符号的支付密码（不包括空格）",
			equalLoginPswText: "支付密码不能与登录密码相同",
			errorText: "请设置6-20位数字、字母或符号的新密码（不包括空格）",
			minLenText: "请设置6-20位数字、字母或符号的支付密码！",
			maxLenText: "密码太长了，你确定能记住吗？",
			normalText: "请设置6-20位数字、字母或符号的支付密码（不包括空格）"
		},
		{
			// 设置支付密码-确认支付密码
			obj: $("#J_modifyConfirmPayPsw").length > 0 ? $("#J_modifyConfirmPayPsw") : null,
			type: "confirm",
			normalText: "请再次确认您的密码",
			nullText: "请再次确认您的密码",
			errorText: "两次输入的密码不一致，请重新输入！"
		}],
		// 修改支付密码
		"modify": [{
			// 修改支付密码-获取验证码
			obj: $("#J_modifyPhoneCode").length > 0 ? $("#J_modifyPhoneCode") : null,
			type: "phoneCode",
			nullText: "请输入发送到您手机上的6位数字短信验证码",
			errorText: "验证码不正确，请重新输入",
			sendFailedText: "验证码发送失败",
			sendSuccessText: "验证码发送成功，请查看手机"
		},
		{
			// 修改支付密码-旧支付密码
			obj: $("#J_modifyOldPayPsw").length > 0 ? $("#J_modifyOldPayPsw") : null,
			type: "old",
			nullText: "请输入原支付密码",
			errorText: "旧的支付密码不正确，请重新输入"
		}, 
		{
			// 修改支付密码-新支付密码
			obj: $("#J_modifyPayPsw").length > 0 ? $("#J_modifyPayPsw") : null,
			type: "set",
			nullText: "请设置6-20位数字、字母或符号的新支付密码（不包括空格）",
			equalLoginPswText: "支付密码不能与登录密码相同",
			errorText: "请设置6-20位数字、字母或符号的新支付密码（不包括空格）！",
			minLenText: "请设置6-20位数字、字母或符号的新支付密码（不包括空格）！",
			maxLenText: "密码太长了，你确定能记住吗？",
			normalText: "请设置6-20位数字、字母或符号的新支付密码（不包括空格）"
		},
		{
			// 修改支付密码-确认新支付密码
			obj: $("#J_modifyConfirmPayPsw").length > 0 ? $("#J_modifyConfirmPayPsw") : null,
			type: "confirm",
			normalText: "请再次确认您的密码",
			nullText: "请再次确认您的密码",
			errorText: "两次输入的密码不一致，请重新输入！"
		}],
		// 重置支付密码
		"reset": [{
			// 重置支付密码-获取验证码
			obj: $("#J_modifyPhoneCode").length > 0 ? $("#J_modifyPhoneCode") : null,
			type: "phoneCode",
			nullText: "请输入发送到您手机上的6位数字短信验证码",
			errorText: "验证码不正确，请重新输入",
			sendFailedText: "验证码发送失败",
			sendSuccessText: "验证码发送成功，请查看手机"
		},
		{
			// 重置支付密码-设置支付密码
			obj: $("#J_modifyPayPsw").length > 0 ? $("#J_modifyPayPsw") : null,
			type: "set",
			nullText: "请设置6-20位数字、字母或符号的支付密码（不包括空格）",
			equalLoginPswText: "支付密码不能与登录密码相同",
			errorText: "请设置6-20位数字、字母或符号的新密码（不包括空格）！",
			minLenText: "请设置6-20位数字、字母或符号的支付密码！",
			maxLenText: "密码太长了，你确定能记住吗？",
			normalText: "请设置6-20位数字、字母或符号的支付密码（不包括空格）"
		},
		{
			// 重置支付密码-确认新支付密码
			obj: $("#J_modifyConfirmPayPsw").length > 0 ? $("#J_modifyConfirmPayPsw") : null,
			type: "confirm",
			normalText: "请再次确认您的密码",
			nullText: "请再次确认您的密码",
			errorText: "两次输入的密码不一致，请重新输入！"
		}]
	};
	// 获取验证码数据
	var getPhoneCodeArr = [
		// 修改支付密码
		{
			obj: $("#J_modifyPhoneCode").length > 0 ? $("#J_modifyPhoneCode") : null,
			phoneObj: $("#J_phone").length > 0 ? $("#J_phone") : null,
			sendCodeClickNum: 0
		}
	];
    // 接口数据
	var apiData  = {
		// 表单提交
		formAction: cdnConfig.my + '/security/editpaypwd',
		// 检测输入的旧支付密码是否正确
		checkOldPswAction: cdnConfig.my + "/ajax/checkoldpaypwd",
		// 旧密码是否与登录密码一致
		checkIsEqualAction: cdnConfig.my + '/ajax/checkpaypwd',
		// 发送验证码
		sendPhoneCodeAction: cdnConfig.my + '/ajax/sendsms',
		// 检验验证码是否正确
		checkPhoneCodeAction: cdnConfig.my + "/ajax/checkphonecode",
		// 成功页面
		success: cdnConfig.my + "/security/editpaypwdsucc"

	};

	var phoneCode = getPhoneCodeArr[0];
	// 判断密码的正则表达式(匹配非汉字、非空格的数字、字母、特殊字符)
    var pswReg = /^[^(\u4E00-\u9FA5\uF900-\uFA2D)\s]{6,20}$/;

	// 绑定事件
	bindEvent();

	function bindEvent() {
		// 针对#type的值判断当前页为设置/重置/修改支付密码页
		var type = $("#type").val();
		if(type) {
			switch(type.toString()) {
				case "1":
					// 设置支付密码默认提示内容
					showTips($("#J_modifyPayPsw"), '请设置6-20位数字、字母或符号的支付密码（不包括空格）', 'normal');
					setPswBindEvent();
					break;
				case "2":
					// 修改支付密码默认提示内容
					showTips($("#J_modifyPayPsw"), '请设置6-20位数字、字母或符号的新支付密码（不包括空格）', 'normal');
					modifyPswBindEvent();
					break;
				case "3":
					// 重置支付密码默认提示内容
					showTips($("#J_modifyPayPsw"), '请设置6-20位数字、字母或符号的支付密码（不包括空格）', 'normal');
					resetPswBindEvent();
					break;
				default : break;
			}
		}
		// 点击获取验证码
		$("#J_getModifyPhoneCode").on("click", function() {
			if(phoneCode["sendCodeClickNum"] >= 3){
	            showTips(phoneCode["obj"], '您本次发送手机验证码次数已经用完,请刷新页面重试.','no');
	            return;
	        } else{
	            phoneCode["sendCodeClickNum"] ++;
	        }
			if(type) {
				// 倒计时60秒
				countDownFn(60, $("#J_getModifyPhoneCode"), $("#J_countDown"));
				switch(type.toString()) {
					case "1":
						// 发送验证码到手机,type=1表示设置支付密码
						sendPhoneCode(interactArr["set"][0], phoneCode, 1);
						break;
					case "2":
						// 发送验证码到手机，type=2表示修改支付密码
						sendPhoneCode(interactArr["modify"][0], phoneCode, 2);
						break;
					case "3":
						// 发送验证码到手机，type=3表示重置支付密码
						sendPhoneCode(interactArr["reset"][0], phoneCode, 3);
						break;
					default: break;
				}
			}
		});

		// 修改支付密码按钮的click事件
		$("#J_submitBtn").on("click", function() {
			switch(type.toString()) {
				case "2":
					if(isCheckedPhoneCode && isCheckedOldPsw && isCheckedSetPsw && isCheckedConfirmPsw) {
						submitEditPassForm(type);
					}
					break;
				case "1":
				case "3":
					if(isCheckedPhoneCode && isCheckedSetPsw && isCheckedConfirmPsw) {
						submitEditPassForm(type);
					}
					break;
				default : break;
			}

		});
	}

	// 设置支付密码页面的事件绑定
	function setPswBindEvent() {
		var len = interactArr["set"].length;
		var arr = interactArr["set"];
		for(var i = 0; i < len; i++) {
			(function(index) {
				var arrItem = arr[index];
				// 为表单对象注册blur和keyup事件
				if(arrItem["obj"]) {
					arrItem["obj"].on("blur", function() {
						if(arrItem["type"] == "confirm") {
							// 检测“确认支付密码”以及其与“设置支付密码”是否相同
							checkConfirmPsw(arrItem, arr[1]);
						} else if(arrItem["type"] == "set") {
							// 检测“设置支付密码”以及其与“确认支付密码”是否相同
							subVal(arrItem["obj"], 20);
							checkSetPsw(arrItem, arr[2]);
						} else {
							// 检测短信验证码
							checkPhoneCode(arrItem);
						}
					}).on("keyup", function() {
						// 判断是否所有输入框都有内容。如果有，则"提交"按钮高亮显示
						var setPhoneCodeVal = $.trim(arr[0]["obj"].val()).replace("/\s/g",''),
							setPayPswVal = $.trim(arr[1]["obj"].val()).replace("/\s/g",''),
							setConfirmPayPswVal = $.trim(arr[2]["obj"].val()).replace("/\s/g",'');
						(setPhoneCodeVal != "" && setPayPswVal != "" && setConfirmPayPswVal != "") ? $("#J_submitBtn").addClass("on") : $("#J_submitBtn").removeClass("on");
						if(arrItem["type"] == "set") {
							subVal(arrItem["obj"], 20);
						}
					});
				}
			})(i);
		}
	}

	// 修改支付密码页面的事件绑定
	function modifyPswBindEvent() {
		var len = interactArr["modify"].length;
		var arr = interactArr["modify"];
		for(var i = 0; i < len; i++) {
			(function(index) {
				var arrItem = arr[index];
				// 为表单对象注册blur和keyup事件
				if(arrItem["obj"]) {
					arrItem["obj"].on("blur", function() {
						// 根据type类型检验不同的字段
						switch(arrItem["type"]) {
							case "confirm":
								// 检测"确认新支付密码"以及其与"新支付密码"是否相同
								checkConfirmPsw(arrItem, arr[2]);
								break;
							case "set":
								// 检测"新支付密码"以及其与"确认新支付密码"是否相同以及"确认新支付密码"是否与登录密码相同
								subVal(arrItem["obj"], 20);
								checkSetPsw(arrItem, arr[1], arr[3]);
								break;
							case "phoneCode":
								// 检测"短信验证码"
								checkPhoneCode(arrItem);
								break;
							case "old":
								// 检测"旧支付密码"
								checkOldPsw(arrItem, arr[2]);
								break;
							default:
								break;
						}
					}).on("keyup", function() {
						// 判断是否所有输入框都有内容。如果有，则"提交"按钮高亮显示
						var modifyPhoneCodeVal = $.trim(arr[0]["obj"].val()).replace("/\s/g",''),
							modifyOldPayPswVal = $.trim(arr[1]["obj"].val()).replace("/\s/g",''),
							modifyPayPswVal = $.trim(arr[2]["obj"].val()).replace("/\s/g",''),
							modifyConfirmPayPswVal = $.trim(arr[3]["obj"].val()).replace("/\s/g",'');
						(modifyPhoneCodeVal != "" && modifyOldPayPswVal != "" && modifyPayPswVal != "" && modifyConfirmPayPswVal != "") ? $("#J_submitBtn").addClass("on") : $("#J_submitBtn").removeClass("on");
						if(arrItem["type"] == "set") {
							subVal(arrItem["obj"], 20);
						}
					});
				}
			})(i);
		}
	}

	// 重置支付密码页面的事件绑定
	function resetPswBindEvent() {
		var len = interactArr["reset"].length;
		var arr = interactArr["reset"];
		for(var i = 0; i < len; i++) {
			(function(index) {
				var arrItem = arr[index];
				// 为表单对象注册blur和keyup事件
				if(arrItem["obj"]) {
					arrItem["obj"].on("blur", function() {
						if(arrItem["type"] == "confirm") {
							// 检测“确认支付密码”以及其与“设置支付密码”是否相同
							checkConfirmPsw(arrItem, arr[1]);
						} else if(arrItem["type"] == "set") {
							// 检测“设置支付密码”以及其与“确认支付密码”是否相同
							subVal(arrItem["obj"], 20);
							checkSetPsw(arrItem, arr[2]);
						} else {
							// 检测短信验证码
							checkPhoneCode(arrItem);
						}
					}).on("keyup", function() {
						// 判断是否所有输入框都有内容。如果有，则"提交"按钮高亮显示
						var resetPhoneCodeVal = $.trim(arr[0]["obj"].val()).replace("/\s/g",''),
							resetPayPswVal = $.trim(arr[1]["obj"].val()).replace("/\s/g",''),
							resetConfirmPayPswVal = $.trim(arr[2]["obj"].val()).replace("/\s/g",'');
						(resetPhoneCodeVal != "" && resetPayPswVal != "" && resetConfirmPayPswVal != "") ? $("#J_submitBtn").addClass("on") : $("#J_submitBtn").removeClass("on");
						if(arrItem["type"] == "set") {
							subVal(arrItem["obj"], 20);
						}
					});
				}
			})(i);
		}
	}


	/**
	 * 修改密码表单提交前检测所有字段，检测通过提交表单
	 *
	 * 创建时间：2016-01-12
	 * 创建人：yansiwen
	 */
	function submitEditPassForm(type) {
		$.ajax({
			url: apiData.formAction,
			type: "post",
			data: $("#J_editPassForm").serialize(),
			dataType: "json",
			success: function(res) {
				switch(res.code.toString()) {
					case "200":
						// 修改成功
						window.location.href = apiData.success;
						break;
					case "400":
						// 修改失败
						break;
					default:
						break;
				}
			}
		});
	}
	/**
	 * 控制输入的字符串长度
	 * 功能：输入框keyup或blur时，传入对象以及长度截断输入的值
	 * 
	 * 创建时间：2015-11-23 11:14:46
	 * 创建人： yansiwen
	 */
	function subVal(obj, len) {
		var val = obj.val();
        if(val.length > len) {
            obj.val(val.substr(0, len));
        }
	}

	// 检测"确认新支付密码"字段
	function checkConfirmPsw(arrItem, item) {
		var arrItemObj = arrItem["obj"],
			itemObj = item ? item["obj"] : {},
			arrItemObjVal = arrItemObj.val(),
			itemObjVal = item ? itemObj.val() : null;
		
		if(arrItemObjVal == "") {
			isCheckedConfirmPsw = false;
			showTips(arrItemObj, arrItem.nullText, "no");
			return;
		}
		checkIsEqual("confirm", arrItem);
	}


	// 检测"新支付密码"字段
	function checkSetPsw(arrItem, oldItem, confirmItem) {
		var arrItemObj = arrItem["obj"],
			oldItemObj = oldItem ? oldItem["obj"] : {},
			confirmItemObj = confirmItem ? confirmItem["obj"] : {},
			arrItemObjVal = arrItemObj.val(),
			oldItemObjVal = oldItem ? oldItemObj.val() : null,
			confirmItemObjVal = confirmItem ? confirmItemObj.val() : null;

		// "新密码"为空
		if(arrItemObjVal == "") {
			isCheckedSetPsw = false;
			showTips(arrItemObj, arrItem["nullText"], "normal");
			return;
		}
		if(arrItemObjVal.length < 6) {
			isCheckedSetPsw = false;
			showTips(arrItemObj, arrItem["minLenText"], "no");
		} else if(arrItemObjVal.length > 20) {
			isCheckedSetPsw = false;
			showTips(arrItemObj, arrItem["maxLenText"], "no");
		} else {
			// 检测新密码是否为数字、字母、特殊字符构成
			// if(khValidate.chkPass(arrItemObjVal)) {
			if(pswReg.test(arrItemObjVal)) {
				isCheckedSetPsw = true;
				showTips(arrItemObj, arrItem["normalText"], "ok");
				checkIsEqualOldPsw(arrItem);
			} else {
				isCheckedSetPsw = false;
				showTips(arrItemObj, arrItem["errorText"], "no");
			}
		}
		checkIsEqual("set", arrItem);
	}

	/**
     * 验证新密码或再次输入密码字段，并判断新密码与再次输入密码是否一致
     * @param   {String}    type  密码类型
     * @return    void
     * 
     * 创建时间：2015-11-24 09:07:20
     * 创建人：yansiwen
     */
    function checkIsEqual(type, arrItem) {
        var newPass = $("#J_modifyPayPsw");
        var conPass = $("#J_modifyConfirmPayPsw");
        var newPassVal = newPass.val();
        var conPassVal = conPass.val();
		var type = $("#type").val().toString();
        
        if(type == "confirm" && conPassVal == "") {
        	isCheckedConfirmPsw = false;
            showTips(conPass, "请再次确认您的密码!", "no");
        }
        if(conPassVal != "") {
            if(newPassVal != conPassVal) {
        		isCheckedConfirmPsw = false;
                showTips(conPass, "两次输入的密码不一致，请重新输入！", "no");
            } else {
                // if(khValidate.chkPass(newPassVal)) {
                if(isCheckedSetPsw) {
	                if(type == "2") {
                        showTips(newPass, "请设置6-20位数字、字母或符号的新支付密码（不包括空格）", "ok");
	                } else {
		                showTips(newPass, "请设置6-20位数字、字母或符号的支付密码（不包括空格）", "ok");
	                }
	                isCheckedSetPsw = true;
                }
                showTips(conPass, "", "ok");
                isCheckedConfirmPsw = true;
            }
        }
    }


	// 检测"验证码"
	function checkPhoneCode(arrItem) {
		var obj = arrItem["obj"],
			val = obj.val(),
			clickNum = getPhoneCodeArr[0].sendCodeClickNum;

		if(val == "") {
			isCheckedPhoneCode = false;
			showTips(obj, arrItem["nullText"], "no");
			return;
		}
		// 判断验证码是否为6位纯数字以及判断输入的验证码与发送到手机的验证码是否相同
		if(!khValidate.chkNumber(val, 6)) {
			isCheckedPhoneCode = false;
			showTips(obj, arrItem.errorText, "no");
		} else {
			if(clickNum > 0 && clickNum < 4) {
				// 检测验证码是否正确
				checkCodeIsCorrect(obj, arrItem);
			}
		}
	}

	// 检测"旧支付密码"
	function checkOldPsw(arrItem, newItem) {
		var arrItemObj = arrItem["obj"],
			arrItemObjVal = arrItemObj.val();

		if(arrItemObjVal == "") {
			isCheckedOldPsw = false;
			showTips(arrItemObj, arrItem.nullText, "no");
			return;
		}
		// 检验输入的旧支付密码是否正确
		checkOldPswCorrect(arrItem, newItem);
	}

	// 检验输入的旧支付密码是否正确
	function checkOldPswCorrect(arrItem, newItem) {
		var arrItemObj = arrItem["obj"],
			arrItemObjVal = arrItemObj.val();
		$.ajax({
			url: apiData.checkOldPswAction,
			type: "post",
			data: {
				"old_paypasswd"  : arrItemObjVal
			},
			dataType: "json",
			success: function(res) {
				// 旧密码正确，提交表单
				if(res.code.toString() == "200") {
					isCheckedOldPsw = true;
					showTips(arrItemObj, "", "ok");
				} else if(res.code.toString() == "400") {
					isCheckedOldPsw = false;
					showTips(arrItemObj, arrItem["errorText"], "no");
				}
			}
		});
	}

	//倒计时
    function countDownFn(t, obj1, obj2) {
	    var tempT = t;
	    obj2.show();
	    var timer =  setInterval(function(){
		    if(t<=0){
			    clearInterval(timer);
			    obj2.html(tempT + "秒");
			    obj2.hide();
			    obj1.html('重新获取验证码');
		    }else{
			    t = t - 1;
			    obj2.html(t + "秒");
		    }
	    },1000);
    }

	// 检测输入的支付密码是否与登录密码一致
	function checkIsEqualOldPsw(arrItem) {
		var arrItemObj = arrItem["obj"],
			arrItemObjVal = arrItemObj.val();

		$.ajax({
			url: apiData.checkIsEqualAction,
			type: "post",
			data: {
				"new_paypasswd"  : arrItemObjVal
			},
			dataType: "json",
			success: function(res) {
				if(res.code.toString() == "200") {
					isCheckedSetPsw = true;
					showTips(arrItemObj, arrItem["normalText"], "ok");
				} else if(res.code.toString() == "400") {
					// 支付密码与登录密码一致（不允许）
					isCheckedSetPsw = false;
					showTips(arrItemObj, arrItem["equalLoginPswText"], "no");
				}
			}
		});
	}

	// 发送验证码到手机
	function sendPhoneCode(arrItem, obj, type) {
		var phoneNum = obj["phoneObj"].val();
		var sendCodeClickNum = obj["sendCodeClickNum"];

		$.ajax({
            url: apiData.sendPhoneCodeAction,
			type: "post",
            data: {
                "phone": phoneNum,
	            "type": type
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
	function checkCodeIsCorrect(code, arrItem) {
		var val = code.val();
        $.ajax({
            url: apiData.checkPhoneCodeAction,
	        type: "post",
            data: {
                "phone_code" : val
            },
            dataType: 'json'
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
			default:
				break;
		}
		//focus
		obj.on("focus", function(event){
			tarDOM.removeClass("error").find(".tip-ok").remove();
			var type1 = $("#type").val().toString();
			if(obj.attr("id") == "J_modifyPayPsw") {
				if(type1 == "2") {
					tipDOM.html("请设置6-20位数字、字母或符号的新支付密码（不包括空格）");
				} else if(type1 == "1" || type1 == "3") {
					tipDOM.html("请设置6-20位数字、字母或符号的支付密码（不包括空格）");
				} else {
					tipDOM.empty();
				}
			} else {
				tipDOM.empty();
				tarDOM
					.removeClass("error")
					.find(".tip-ok")
					.remove();
			}

		});
	}
});
