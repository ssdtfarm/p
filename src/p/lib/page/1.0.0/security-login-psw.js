define(function(require, exports, module) {
	/*
	 * 按需加载对应css
	 * 这里首先让右边加载完毕，然后再加载左边菜单
	 */
	document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

	/* 按需加载js */
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

	// 是否已经检测原密码
	var isCheckedOldPsw = false;
	// 是否已经检测新密码
	var isCheckedNewPsw = false;
	// 是否已经检测过“再次输入新密码”
	var isCheckedConfirmPsw = false;
	// 交互数据，包括表单对象、类型、提示内容
	var interactArr = [
		{
			obj: $("#J_oldPsw"),
			type: "old",
			nullText: "请输入原登录密码！",
			errorText: "密码错误，请重新输入！",
			networkErrorText: "验证失败，请检查网络是否通畅"
		}, 
		{
			obj: $("#J_newPsw"),
			type: "new",
			normalText: "请设置6-20位数字、字母或符号的新密码（不包括空格）",
			errorText: "请设置6-20位数字、字母或符号的新密码（不包括空格）",
			minLenText: "请设置6-20位数字、字母或符号的新密码（不包括空格）！",
			maxLenText: "密码太长了，你确定能记住吗？"
		}, 
		{
			obj: $("#J_confirmNewPsw"),
			type: "confirm",
			nullText: "请再次确认您的密码",
			errorText: "两次输入的密码不一致，请重新输入！"
		}
	];
	
	// 接口数据
	var apiData  = {
		// 表单提交
		formAction: cdnConfig.my + '/security/editpwd',
		// 旧密码是否与登录密码一致
		checkIsEqualAction: cdnConfig.my + '/ajax/checkoldpwd',
		// 成功页面
		success: cdnConfig.my + "/security/editpwdsucc"
	};

	// 判断密码的正则表达式(匹配非汉字、非空格的数字、字母、特殊字符)
    var pswReg = /^[^(\u4E00-\u9FA5\uF900-\uFA2D)\s]{6,20}$/;
	// 设置新密码默认提示内容
	showTips($("#J_newPsw"), '请设置6-20位数字、字母或符号的新密码（不包括空格）', 'normal');

	// 绑定事件
	bindEvent();

	function bindEvent() {
		var len = interactArr.length;
		for(var i = 0; i < len; i++) {
			(function(index) {
				var arrItem = interactArr[index];
				// 为表单对象注册blur和keyup事件
				arrItem["obj"].on("blur", function() {
					// 根据type类型检验不同的字段
					switch(arrItem["type"]) {
						case "confirm":
							// 检测"再次输入新密码"字段
							checkConfirmPsw(arrItem, interactArr[1]);
							break;
						case "new":
							// 检测"新密码"字段并限制输入字符的长度
							subVal(arrItem["obj"], 20);
							checkNewPsw(arrItem, interactArr[0], interactArr[2]);
							break;
						case "old":
							// 检测"原密码"字段
							checkOldPsw(arrItem, interactArr[1]);
							break;
						default:
							break;
					}
				}).on("keyup", function() {
					// 判断是否所有输入框都有内容。如果有，则"提交"按钮高亮显示
					var oldPswVal = $.trim(interactArr[0]["obj"].val()).replace("/\s/g",''),
						newPswVal = $.trim(interactArr[1]["obj"].val()).replace("/\s/g",''),
						confirmNewPswVal = $.trim(interactArr[2]["obj"].val()).replace("/\s/g",'');
					(oldPswVal != "" && newPswVal != "" && confirmNewPswVal != "") ? $("#J_submitBtn").addClass("on") : $("#J_submitBtn").removeClass("on");
					if(arrItem["type"] == "new") {
						subVal(arrItem["obj"], 20);
					}
				});
			})(i);
		}
		$("#J_submitBtn").on("click", function() {
			// 如果所有字段都检测无误，则提交表单
			if(isCheckedOldPsw && isCheckedNewPsw && isCheckedConfirmPsw) {
				submitEditPassForm();
			}
		});
	}

	/**
     * 修改密码表单提交前检测所有字段，检测通过提交表单
     * 
     * 创建时间：2015-11-24 15:49:17
     * 创建人：yansiwen
     */
    function submitEditPassForm() {
        var oldPass = $("input[name=old_passwd]");
        var newPass = $("input[name=new_passwd]");
        var conPass = $("input[name=confirm_passwd]");

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

	// 检测"原密码"字段
	function checkOldPsw(arrItem, newItem) {
		var arrItemObj = arrItem["obj"],
			newItemObj = newItem ? newItem["obj"] : {},
			arrItemObjVal = arrItemObj.val(),
			newItemObjVal = newItem ? newItemObj.val() : null;

		if(arrItemObjVal != "") {
			checkIsEqualOldPsw(arrItem, newItem);
			/*isCheckedOldPsw = true;
			showTips(arrItemObj, "", "ok");*/
		} else {
			isCheckedOldPsw = false;
			showTips(arrItemObj, arrItem.nullText, "no");
		}
	}

	// 检测"新密码"字段
	function checkNewPsw(arrItem, oldItem, confirmItem) {
		var arrItemObj = arrItem["obj"],
			oldItemObj = oldItem ? oldItem["obj"] : {},
			confirmItemObj = confirmItem ? confirmItem["obj"] : {},
			arrItemObjVal = arrItemObj.val(),
			oldItemObjVal = oldItem ? oldItemObj.val() : null,
			confirmItemObjVal = confirmItem ? confirmItemObj.val() : null;
        // console.log("newPass:" + isCheckedNewPsw, "conPass:" + isCheckedConfirmPsw);
		
		// "新密码"为空
		if(arrItemObjVal == "") {
			isCheckedNewPsw = false;
			showTips(arrItemObj, arrItem.normalText, "normal");
			return;
		}
		// "新密码"不为空
		if(arrItemObjVal.length < 6) {
			isCheckedNewPsw = false;
			showTips(arrItemObj, arrItem["minLenText"], "no");
		} else if(arrItemObjVal.length > 20) {
			isCheckedNewPsw = false;
			showTips(arrItemObj, arrItem["maxLenText"], "no");
		} else {
			// 检测新密码是否为数字、字母、特殊字符构成
			// if(khValidate.chkPass(arrItemObjVal)) {
			if(pswReg.test(arrItemObjVal)) {
				isCheckedNewPsw = true;
				showTips(arrItemObj, arrItem.normalText, "ok");
			} else {
				isCheckedNewPsw = false;
				showTips(arrItemObj, arrItem.errorText, "no");
			}
		}
		checkIsEqual("new");

	}

	// 检测"再次输入新密码"字段
	function checkConfirmPsw(arrItem, item) {
		var arrItemObj = arrItem["obj"],
			itemObj = item ? item["obj"] : {},
			arrItemObjVal = arrItemObj.val(),
			itemObjVal = item ? itemObj.val() : null;

		if(arrItemObjVal != "") {
			checkIsEqual("confirm");
		} else {
			isCheckedConfirmPsw = false;
			showTips(arrItemObj, arrItem.nullText, "no");
		}	
	}

	/**
     * 验证新密码或再次输入密码字段，并判断新密码与再次输入密码是否一致
     * @param   {String}    type  密码类型
     * @return    void
     * 
     * 创建时间：2015-11-24 09:07:20
     * 创建人：yansiwen
     */
    function checkIsEqual(type) {
    	var oldPass = $("input[name=old_passwd]");
        var newPass = $("input[name=new_passwd]");
        var conPass = $("input[name=confirm_passwd]");
        var oldPassVal = oldPass.val();
        var newPassVal = newPass.val();
        var conPassVal = conPass.val();
        // console.log("newPass:" + isCheckedNewPsw, "conPass:" + isCheckedConfirmPsw);
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
                if(isCheckedNewPsw) {
                    showTips(newPass, "请设置6-20位数字、字母或符号的新密码（不包括空格）", "ok");
                    isCheckedNewPsw = true;
                }
                showTips(conPass, "", "ok");
                isCheckedConfirmPsw = true;
            }
        }
    }

	// 检测输入的原密码是否与登录密码一致以及原密码是否与新密码相同
	function checkIsEqualOldPsw(arrItem, newItem) {
		var arrItemObj = arrItem["obj"],
			arrItemObjVal = arrItemObj.val(),
			newItemObj = newItem["obj"],
			newItemObjVal = newItemObj.val();
		$.ajax({
			url: apiData.checkIsEqualAction,
			type: "post",
			data: {
				"old_passwd"  : arrItemObjVal
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
			},
			error: function() {
				isCheckedOldPsw = false;
				showTips(arrItemObj, arrItem["networkErrorText"], "no");
			}
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
				if(text != "") {
					tipDOM.html('<span>' + text + '</span>');
					break;
				}
				tipDOM.html(okTip);

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
			tarDOM.removeClass("error").find(".tip-ok").remove();
            if(obj.attr("id") == "J_newPsw") {
                tipDOM.html("请设置6-20位数字、字母或符号的新密码（不包括空格）");
            } else {
				tipDOM.empty();
            }
		});
	}
});