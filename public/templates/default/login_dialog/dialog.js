/*================登陆框函数==============*/
/*    update by linyandi
/*    date 2014-09-18
/*======================================*/
function loadLoginDialog(){
	/*初始化遮罩层*/
	$(document.body).append("<div class=\"ui-login-dialog-mark\"></div>");
	$(".ui-login-dialog-mark").css({
		"width"   : $("html,body").outerWidth(),
		"height"  : $("html,body").height()	
	});
	$("#dialogLogin").show();
	/*关闭弹窗*/
	$(".login-dialog-close-btn").click(function(e) {
		$(this).parent().parent().hide();
		$(".ui-login-dialog-mark").hide();
	});
	/*显示隐藏input*/
	$(".ui-login-hide").on("focus",function(e){
		$(this).hide().next("input").show().focus();	
	});
	$(".ui-login-show").on("blur",function(e){
		if($(this).val()==""){
			$(this).hide().prev("input").show();	
		}else{
			$(this).prev("input").hide();	
		}
	});	
}
//
/*焦点到输入密码框内*/
$(document).on("keydown",".input_password,.input_username",function(e){
	if(e.keyCode=='13'){
		// submitEvent();
		submitForm();
		e.preventDefault();
	}
});
//提交函数
function submitForm(){
	var user_name = $(".input_username").val();
	var password = $(".input_password").val();
	var formhash = $('input[name="formhash"]').val();
	var form_submit = $('input[name="form_submit"]').val();
	var nchash = $('input[name="nchash"]').val();
	var param = {"user_name":user_name, "password":password, "formhash":formhash, "form_submit":form_submit, "nchash":nchash};
	if(chkUserName(user_name) && chkUserPass(password)){
		$.post('/index.php?act=login&ajax=1', param, function(result){
			result = eval ('(' + result + ')');
			if (result.status == 1) {
				location.reload(true);
			} else if (result.status < 0) {
				alert(result.msg);
			};
		});
	}
}
//提交函数
function submitEvent(){
	var user = $(".input_username").val();
	var pass = $(".input_password").val();
	if(chkUserName(user) && chkUserPass(pass)){
		return true;
	}
	return false;
}
//验证用户名
function chkUserName(user){
	var user = user;
	var is_email = 0;
	  //是否为空
	  if(isEmpty(user)){
			alert("用户名不能为空！");
			return false;	
	  }
	 //中文验证
		if (isChineseChar(user)) {
			alert('用户名不能包含中文字符！');
			return false;
		}
		//邮箱验证
		if (checkIsEmail(user)) {
			var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (reg.test(user)) {
				is_email = 1;
			}
			else {
			alert('邮箱地址不正确，请重新输入');
			return false;
			}
		}
	   //特殊字符验证
		if (stripscript(user) && ! is_email) {
			alert('用户名需为字母、数字、点、减号、下划线组成');
			return false;
		}
	   //纯数字验证
		if (/^[0-9]*$/.test(user) && user.length > 11) {
			alert('用户名不能为长于11位的纯数字!');
			return false;
		}
		//长度验证
		if (user.length < 6 || user.length > 20) {
			alert('用户名长度为6~20个字符');
			return false;
		}
		return true;
}
//验证密码
function chkUserPass(pass){
	//是否为空
	  if(isEmpty(pass)){
			alert("请输入您的密码！");
			return false;	
	  }
	if (pass.length < 6 || pass.length > 20) {
		 alert('密码长度为6-20个字符，且区分大小写!');
		 return false;
	 }
	 //特殊字符验证
	if (stripscript(pass)) {
		alert('请勿输入特殊字符');
		return false;
	}
	return true;
}

//验证是否为空
function isEmpty(str){
	var string = $.trim(str);
	if(string == ""){
		return true	
	}
	return false;
		
}
//验证中文函数
function isChineseChar(str) {
		 var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;  
		 return reg.test(str);
}
//验证字母、数字、点、减号、下划线
function stripscript(str){
var pattern = /^[A-Za-z0-9_-]+$/ig;
if(!pattern.test(str)){
	return true;	
}
return false;
}
//验证邮箱
function checkIsEmail(str) {
	var reg1 = /^([a-zA-Z0-9._-])+@+/;
	var reg2 = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+/;
	if(reg1.test(str) || reg2.test(str)){
		return true;	
	}
		return false;
}