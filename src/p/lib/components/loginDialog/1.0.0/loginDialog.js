define(function(require, exports, module){

	/* login dialog function */
	function login(config){

		var cdnConfig = config.pathConfig || {
				"my" : "http://my.kinhom.com"
			};
		var reqURL   = config.url || 'http://passport.kinhom.com/passport/login';      //请求地址
		var callback = config.callback || function() {};
		var dialog = config.dialog || function() {};
		var tpl    = config.tpl || "";
		var tplName = config.tplName || "tplLoginDialog";

		/* login dialog */
		var d = new dialog({
			title   : '欢迎登录金海马商城',
			content : tpl(tplName),
			width   : 400,
			statusbar : '您还没有帐号，<A href="'+cdnConfig.my+'/passport/register" target="_blank">立即注册</A> | <a href="'+cdnConfig.my+'/passport/findpwd" target="_blank">忘记密码?</a>',
			fixed  : true,
			zIndex : 10086,
			onclose : function() {
				doCallback(callback,"");
			},
			button : [
				{
					id    : 'ok',
					value : '登录',
					className : 'ui-btns-orange',
					callback  : function(){
						submitLogin();
						return false;
					}
				}
			],
			innerHTML:
			'<div i="dialog" class="ui-login-dialog">'
			+       '<div class="ui-login-dialog-arrow-a"></div>'
			+       '<div class="ui-login-dialog-arrow-b"></div>'
			+       '<table class="ui-login-dialog-grid">'
			+           '<tr>'
			+               '<td i="header" class="ui-login-dialog-header">'
			+                   '<span i="close" class="ui-login-dialog-close">&#215;</span>'
			+                   '<div i="title" class="ui-login-dialog-title"></div>'
			+               '</td>'
			+           '</tr>'
			+           '<tr>'
			+               '<td i="body" class="ui-login-dialog-body">'
			+                   '<div i="content" class="ui-login-dialog-content"></div>'
			+               '</td>'
			+           '</tr>'
			+           '<tr>'
			+               '<td i="footer" class="ui-login-dialog-footer">'
			+                   '<div i="button" class="ui-login-dialog-button"></div>'
			+               '</td>'
			+           '</tr>'
			+           '<tr>'
			+               '<td i="footerSub" class="ui-login-dialog-footer">'
			+                   '<div i="statusbar" class="ui-login-dialog-statusbar"></div>'
			+               '</td>'
			+           '</tr>'
			+       '</table>'
			+'</div>'

		}).showModal();

		/* do callback */
		function doCallback(fun,res){
			return fun(res);
		}
		/* input events */
		//blur
		$("input[name=loginUserName]").blur(function(){
			chkBox("loginUserName","name");
		});
		//blur
		$("input[name=loginPassword]").blur(function(){
			chkBox("loginPassword","pass");
		});
		//enter
		$(document).on("keyup","input[name=loginUserName],input[name=loginPassword]",function(event){
			if(event.keyCode==13){
				submitLogin();
			};
		});

		/* form submit */
		function submitLogin() {

			/* validate all */
			if(chkBox("loginUserName","name") && chkBox("loginPassword","pass")){
				var uName = $("input[name=loginUserName]").val();
				var uPass = $("input[name=loginPassword]").val();
				//console.log("验证成功!");
				$.ajax({
					url  : reqURL,
					data : {
						"username" : uName,
						"password" : uPass
					},
					dataType : 'jsonp',
					success : function(result) {
						if(result.status=="succ"){
							//根据结果设置状态
							setTips(result);
							//console.log("succ");
						}
						doCallback(callback, result);
					},
					error : function(error) {
						alert("网络错误,请重试!");
						removeMark("#J_loginMark");

						doCallback(callback, error);
					}
				});
				/* add mark */
				addMark(".login-dialog");

			}
		}
		/* add and remove mark */
		function addMark(tarDOM){
			var tarObj = $(tarDOM);

			tarObj.append('<div id="J_loginMark" class="login-dialog-mark"><i class="login-dialog-loading"></i></div>');
		}
		function removeMark(domID){
			$(domID).remove();
		}
		/* set status code and show tips */
		function setTips(resData) {
			//console.log(resData.sID);
			var loginOk = new dialog({
				width  : 200,
				height : 40,
				fixed  : true
			});
			switch(resData.sID) {
				case "1":
					//登录成功
					//alert(resData.msg);
					loginOk.content('<p>&nbsp;</p><p class="tc fs-14 fc-333">'+resData.msg+'</p>');
					loginOk.showModal();

					setTimeout( function(){ loginOk.close().remove(); }, 1000);

					d.close().remove();
					window.location.reload();

					break;
				case "2":
					//用户不存在
					removeMark("#J_loginMark");
					showTips("#J_loginUserName", resData.msg,'no');
					break;

				case "3":
					//用户名或密码错误
					removeMark("#J_loginMark");
					showTips("#J_loginUserName", resData.msg,'no');
					showTips("#J_loginPassword", resData.msg,'no');
					break;
				case "4":
					//已登录
					d.close().remove();
					window.location.reload();
					break;
				case "5":
					d.close().remove();
					alert(resData.msg);
				default:
					break;
			}
		}

		/* check values */
		function chkBox(dom,type){

			var reg  = "";
			var value = $.trim($("input[name="+dom+"]").val());
			var strName = '用户名';

			switch(type){
				case "name":
					strName = '用户名';
					//console.log(value.indexOf("@"));
					if(value.indexOf("@")>-1){
						reg = /^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
					}else{
						isNaN(value) ? reg = /^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{2,20}$/g : reg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/g;
					}

					break;
				case "pass":
					strName = '密码';
					reg  = /^.*$/g;
					break;
				default :
					break;
			}

			if(value !=""){
				if(!reg.test(value)){
					showTips("#J_"+dom, strName+'格式有误!','no');
					return false;
				}else{
					showTips("#J_"+dom, '','ok');
					return true;
				}
			}else{
				showTips("#J_"+dom, '请输入'+strName+'!','no');
				return false;
			}
		}

		/* show tips */
		function showTips(tarDom, text, type){

			/* init objs */
			var tarObj   = $(tarDom);
			var inputObj = tarObj.children("input");
			var tipObj   = tarObj.next("p.login-dialog-form-tip");
			var domName  = tarDom.split("_")[1];

			var tipHTML  = '<i class="icon-tip-wrong"></i>'+text;

			/* type for different tip text */
			switch(type){
				case "ok":
					inputObj.removeClass("error");
					tipObj.html("");
					break;
				case "no":
					inputObj.addClass("error");
					tipObj.html(tipHTML);
					break;
				default:
					break;
			}
			/* input obj input events*/
			inputObj.on("focus", function(){
				inputObj.removeClass("error");
				tipObj.html("");
			});

		}
	}
	module.exports = login;
});