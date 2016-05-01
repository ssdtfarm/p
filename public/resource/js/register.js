/****
 * 用户名验证
 */
			$("#user_name").focus(function() {
            	 $("#user").removeClass('text_erro');
                 $("#user_tip").html('6~20个字母、数字、点、减号、下划线或邮箱地址');
                 $("#user_tip").attr('style','display:block'); 
                 });
             $("#user_name").blur(function() {
            	 $("#user_suer").attr('style','display:none;');
            	 $("#user_tip").attr('style','display:none;'); 
            	 if ($("#user_name").val() != "") {
                     check_user_name();
            	 }
                 });
             
             function check_user_name() {
                 var user = $("#user_name").val();
                 var is_email = 0;
                 var re = '';
                 if (user != $("#user_name").attr('title')) {
                     //中文验证
             	    if (isChineseChar(user)) {
             	    	showUserError('用户名需为字母、数字、点、减号、下划线组成');
             	    	return false;
             	    }
             	    //邮箱验证
             	    if (checkIsEmail(user)) {
             	        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
             	        if (reg.test(user)) {
             	        	is_email = 1;
             	        }
             	        else {
             	    	showUserError('邮箱地址不正确，请重新输入');
             	    	return false;
             	        }
             	    }
             	   //特殊字符验证
             	    if (stripscript(user) && ! is_email) {
             	    	showUserError('用户名需为字母、数字、点、减号、下划线组成');
             	    	return false;
                 	    }
             	   //纯数字验证
                    if (/^[0-9]*$/.test(user)) {
                    	showUserError('用户名不支持纯数字注册');
             	    	return false;
                    }
                	    //长度验证
                	    if (user.length < 6 || user.length > 20) {
                	    	showUserError('用户名长度为6~20个字符');
                	    	return false;
                    	    }
                    $.getJSON('index.php?act=login&op=check_member',{'user_name':user},
                			 function(data){
                		 if (data) {
                			 $("#user_suer").attr('style','display:block');
                			 return true;
                		 }else {
                			 showUserError('该用户名已被他人注册，请重新输入');
                			 return false;
                		 }
                	 });
                     }
                 }
             //验证中文函数
            function isChineseChar(str) {
            		 var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;  
            		 return reg.test(str);
            }
            //验证字母、数字、点、减号、下划线
            function stripscript(str) 
            {
            var pattern = /^[A-Za-z0-9_-]+$/ig;
            if (!str.match(pattern)) {
				return true;
                }
            return false;
            }
            //验证邮箱
            function checkIsEmail(str) {
				var reg1 = /^([a-zA-Z0-9._-])+@+/;
				var reg2 = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+/;
				
				if (str.match(reg1) || str.match(reg2)) {
					return true;
					}
				return false;
                }
            function showUserError(message) {
            	$("#user").addClass('text_erro');
            	$("#user_tip").html("<i></i>"+message);
                $("#user_tip").attr('style','display:block'); 
             }
/**
 * 密码验证
 */     
            $("#password2,#password").focus(function() {
           	 $("#passwd").removeClass('text_erro');
                $("#pwd_tip").html('6~20个字符，区分大小写');
                $("#pwd_tip").attr('style','display:block'); 
                });
            $("#password").blur(function() {
            	$("#pwd_suer").attr('style','display:none;');
           	 $("#pwd_tip").attr('style','display:none;'); 
           	 if ($("#password").val() != "") {
                    check_passwd();
           	 }
                });
         function check_passwd()  {
        	 var passwd = $("#password").val();
        	 if (passwd != $("#password").attr('title')) {
        		 if (passwd.length < 6 || passwd.length > 20) {
        			 showPwdError('密码长度为6-20个字符，且区分大小写');
        			 return false;
        		 }
        		var repeat = passwd.split('').sort().join('').replace(/(.)\1+/g, '$1');
        		if (repeat.length < 3 || passwd == '123456' || passwd == '654321') {
        			showPwdError('密码过于简单，建议字母+数字');
        			return false;
        		}
        		$("#pwd_suer").attr('style','display:block');
        		return true;
        	 }
         }
         function showPwdError(message) {
         	$("#passwd").addClass('text_erro');
         	$("#pwd_tip").html("<i></i>"+message);
             $("#pwd_tip").attr('style','display:block'); 
             }
         
         $("#password_confirm,#password4").focus(function() {
           	 $("#pwd_confirm").removeClass('text_erro');
                $("#pwd_con_tip").html('请再次确认您的密码');
                $("#pwd_con_tip").attr('style','display:block'); 
                });
            $("#password_confirm").blur(function() {
            	$("#pwd_con_suer").attr('style','display:none;');
           	 $("#pwd_con_tip").attr('style','display:none;'); 
           	 if ($("#password_confirm").val() != "") {
           		check_pwd_cf();
           	 }
            });
            function check_pwd_cf() {
            	var password = $('#password').val();
            	var password_confirm = $("#password_confirm").val();
            	if (password !== password_confirm) {
            		$("#pwd_confirm").addClass('text_erro');
                 	$("#pwd_con_tip").html("<i></i>"+'您两次输入的密码不一致');
                     $("#pwd_con_tip").attr('style','display:block');
                     return false;
            	}
            	$("#pwd_con_suer").attr('style','display:block');
            	return true;
            }
            
/**
 * 验证码验证
 */
            $('#captcha').focus( function(){
            	$("#captcha_err").removeClass('text_erro');
                $("#yzm_tip").html('请输入右侧验证码');
                $("#yzm_tip").attr('style','display:block');
    		});
               $("#captcha").blur(function() {
              	 $("#yzm_tip").attr('style','display:none;'); 
              	if ($("#captcha").val().length < 4) {
          		  $('#captcha_sure').attr('style','display:none;');
          		  check_captcha();
          	  }
               });
               $("#captcha").keyup(function () {
            	  if ($("#captcha").val().length >= 4) {
            		  $('#captcha_sure').attr('style','display:none;');
            		  check_captcha();
            	  }
               });
    	function check_captcha() {
    		var nchash = $('#nchash').val();
    		var captcha = $('#captcha').val();
    	$.getJSON('index.php?act=login&op=checkSeccode',{'nchash':nchash,'captcha':captcha},
    				function(data) {
    				if (data) {
       						$('#captcha_sure').attr('style','display:block');
       						return true;
    					}
    				else {
    					$("#captcha_err").addClass('text_erro');
    		         	$("#yzm_tip").html("<i></i>"+'验证码不正确');
    		             $("#yzm_tip").attr('style','display:block'); 
    		             return false;
    				}
    			});
    		}
 /**
  * 提交验证
  */   	
    	$("form").submit( function () {
    		if ($("#user_name").val() == $("#user_name").attr('title') || $("#user_suer").attr('style') == 'display:none;') {
    			if ($("#user_name").val() == $("#user_name").attr('title')) {
    				showUserError('输入您的用户名或邮箱地址');
    			}
    			return false;
    		}
    		
    		if ($("#password").val() == $("#password").attr('title') || $("#password").val() == ''|| $("#pwd_suer").attr('style') == 'display:none;') {
    			if($("#password").val() == $("#password").attr('title') || $("#password").val() == '') {
    				showPwdError('输入您的密码');
    			}
    			return false;
    		} 
    	
    		if ($("#password_confirm").val() == $("#password_confirm").attr('title') || $("#password_confirm").val() == '' || $("#pwd_con_suer").attr('style') == 'display:none;') {
    			if ($("#password_confirm").val() == $("#password_confirm").attr('title') || $("#password_confirm").val() == '') {
    				$("#pwd_confirm").addClass('text_erro');
                 	$("#pwd_con_tip").html("<i></i>"+'再次输入您的密码');
                     $("#pwd_con_tip").attr('style','display:block');
    			}
    			return false;
    		}
    		
    		if ($("#captcha").val() == $("#captcha").attr('title') || $("#captcha_sure").attr('style') == 'display:none;') {
    			if ($("#captcha").val() == $("#captcha").attr('title')) {
    				$("#captcha_err").addClass('text_erro');
		         	$("#yzm_tip").html("<i></i>"+'输入右侧图片验证码');
		             $("#yzm_tip").attr('style','display:block'); 
    			}
    			return false;
    		}
    		if (!$("#clause").attr('checked')) {
    			alert('请您先阅读服务条款后再注册');
    			return false;
    		}
    		return true;
    	});