define(function(require,exports,module){function login(config){function doCallback(fun,res){return fun(res)}function submitLogin(){if(chkBox("loginUserName","name")&&chkBox("loginPassword","pass")){var uName=$("input[name=loginUserName]").val(),uPass=$("input[name=loginPassword]").val();$.ajax({url:reqURL,data:{username:uName,password:uPass},dataType:"jsonp",success:function(result){"succ"==result.status&&setTips(result),doCallback(callback,result)},error:function(error){alert("网络错误,请重试!"),removeMark("#J_loginMark"),doCallback(callback,error)}}),addMark(".login-dialog")}}function addMark(tarDOM){var tarObj=$(tarDOM);tarObj.append('<div id="J_loginMark" class="login-dialog-mark"><i class="login-dialog-loading"></i></div>')}function removeMark(domID){$(domID).remove()}function setTips(resData){var loginOk=new dialog({width:200,height:40,fixed:!0});switch(resData.sID){case"1":loginOk.content('<p>&nbsp;</p><p class="tc fs-14 fc-333">'+resData.msg+"</p>"),loginOk.showModal(),setTimeout(function(){loginOk.close().remove()},1e3),d.close().remove(),window.location.reload();break;case"2":removeMark("#J_loginMark"),showTips("#J_loginUserName",resData.msg,"no");break;case"3":removeMark("#J_loginMark"),showTips("#J_loginUserName",resData.msg,"no"),showTips("#J_loginPassword",resData.msg,"no");break;case"4":d.close().remove(),window.location.reload();break;case"5":d.close().remove(),alert(resData.msg)}}function chkBox(dom,type){var reg="",value=$.trim($("input[name="+dom+"]").val()),strName="用户名";switch(type){case"name":strName="用户名",reg=value.indexOf("@")>-1?/^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/:isNaN(value)?/^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{2,20}$/g:/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/g;break;case"pass":strName="密码",reg=/^[a-zA-Z0-9_-]{6,20}$/g}return""!=value?reg.test(value)?(showTips("#J_"+dom,"","ok"),!0):(showTips("#J_"+dom,strName+"格式有误!","no"),!1):(showTips("#J_"+dom,"请输入"+strName+"!","no"),!1)}function showTips(tarDom,text,type){var tarObj=$(tarDom),inputObj=tarObj.children("input"),tipObj=tarObj.next("p.login-dialog-form-tip"),tipHTML=(tarDom.split("_")[1],'<i class="icon-tip-wrong"></i>'+text);switch(type){case"ok":inputObj.removeClass("error"),tipObj.html("");break;case"no":inputObj.addClass("error"),tipObj.html(tipHTML)}inputObj.on("focus",function(){inputObj.removeClass("error"),tipObj.html("")})}var cdnConfig=config.pathConfig||{my:"http://my.kinhom.com"},reqURL=config.url||"http://passport.kinhom.com/passport/login",callback=config.callback||function(){},dialog=config.dialog||function(){},tpl=config.tpl||"",tplName=config.tplName||"comment/tplLoginDialog",d=new dialog({title:"欢迎登录金海马商城",content:tpl(tplName),width:400,statusbar:'您还没有帐号，<A href="'+cdnConfig.my+'/passport/register" target="_blank">立即注册</A> | <a href="'+cdnConfig.my+'/passport/findpwd" target="_blank">忘记密码?</a>',fixed:!0,zIndex:10086,onclose:function(){doCallback(callback,"")},button:[{id:"ok",value:"登录",className:"ui-btns-orange",callback:function(){return submitLogin(),!1}}],innerHTML:'<div i="dialog" class="ui-login-dialog"><div class="ui-login-dialog-arrow-a"></div><div class="ui-login-dialog-arrow-b"></div><table class="ui-login-dialog-grid"><tr><td i="header" class="ui-login-dialog-header"><span i="close" class="ui-login-dialog-close">&#215;</span><div i="title" class="ui-login-dialog-title"></div></td></tr><tr><td i="body" class="ui-login-dialog-body"><div i="content" class="ui-login-dialog-content"></div></td></tr><tr><td i="footer" class="ui-login-dialog-footer"><div i="button" class="ui-login-dialog-button"></div></td></tr><tr><td i="footerSub" class="ui-login-dialog-footer"><div i="statusbar" class="ui-login-dialog-statusbar"></div></td></tr></table></div>'}).showModal();$("input[name=loginUserName]").blur(function(){chkBox("loginUserName","name")}),$("input[name=loginPassword]").blur(function(){chkBox("loginPassword","pass")}),$(document).on("keyup","input[name=loginUserName],input[name=loginPassword]",function(event){13==event.keyCode&&submitLogin()})}module.exports=login});