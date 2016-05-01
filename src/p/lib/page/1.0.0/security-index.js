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

	/*
	 *	validatePhone	验证手机页面
	 *	setPayPsw	设置支付密码页面
	 */
	var commonData = {
		validatePhone: location.protocol+"//"+location.hostname+"/security/bindphone",
		setPayPsw:  location.protocol+"//"+location.hostname+"/security/editpaypwd?type=1"
	}

	$(function() {
		// 启用支付密码前，若用户未绑定手机，弹窗通知用户先绑定手机，
		// 否则，页面跳转到“设置支付密码页面”
		$("#J_enablePayPsw").on("click", function() {
			if($("#J_isPhone").val().toString() == "0"){
				var notify = new dialog({
					width: 474,
					height: 88,
					title: "启用支付密码提示",
					content: "<p>启用支付密码需先绑定手机号</p><p>已验证手机是防止密码被盗，找回密码的重要途径，请您先完成绑定！</p>",
					button: [
						{
							value: '去绑定',
							className : 'ui-btns-orange',
							callback: function () {
								location.href = commonData.validatePhone;
								return true;
							}
						}]
				}).showModal();
			} else {
				location.href = commonData.setPayPsw;
			}
		});
	});
});
