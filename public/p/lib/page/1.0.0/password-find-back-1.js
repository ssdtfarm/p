define("libpage.0.0/password-find-back-1",["lib/components/khValidate/1.0.0/khValidate"],function(e,t,r){function n(){var e=Math.random();d=util.getToken(16),imgURL=cdnConfig.apiPath+"/member/imgcode?type=registercode&v="+e+"&token="+d,$("#J_findImgCode").attr("src",imgURL)}function a(e){var t=$.trim(e.val());return u.chkUserName(t)||u.chkTelephone(t)||u.chkEmail(t)?!0:(c(e,"登录名输入有误","error"),!1)}function o(e){var t=$.trim(e.val());return f>=3?void c(e,"发送手机验证码次数已经用完,请刷新页面重试.","error"):(f++,void $.ajax({url:cdnConfig.apiPath+"/member/validatemem",data:{username:t,key:$("#security").val(),name:$("#security").attr("name")},dataType:"jsonp",success:function(t){i(t.pin),"succ"==t.status?(c(e,"","ok"),s()):c(e,"您输入的用户名不存在，请确认后输入","error")}}))}function s(){var e=$("input[name=findcode]"),t=$.trim(e.val());if(""!=t)if(u.chkScript(t)){var r=t.toUpperCase();$.ajax({url:cdnConfig.apiPath+"/member/getimgcode",data:{token:d},dataType:"jsonp",success:function(t){"succ"==t.status?t.data.code==r?(c(e,"","ok"),$("#token").val(d),$("#J_form_step_1").submit()):c(e,"验证码输入有误，请核对后再输入!","error"):c(e,"输入的验证码不正确","error")}})}else c(e,"请输入正确的验证码","error");else c(e,"请输入验证码","error")}function i(e){var t=$("#security");t.val(e[1]),t.attr("name",e[0])}function c(e,t,r){switch(r){case"ok":e.siblings(".icon-tip-ok").css("top","auto");break;case"error":e.addClass("error").siblings(".error-tips").css("top","auto").find(".tips-info").html(t)}e.on("focus",function(e){e.preventDefault(),$(this).removeClass("error").addClass("focus").siblings(".icon-tip-ok").css("top","-9999px").siblings(".error-tips").css("top","-9999px").find(".tips-info").html("")})}var u=e("../../components/khValidate/1.0.0/khValidate"),d="";n(),$("#J_refreshCode").on("click",function(e){e.preventDefault(),n()});var f=0;$(document).on("focus",".kh-form-item",function(){$(this).addClass("focus")}),$(document).on("blur",".kh-form-item",function(){$(this).removeClass("focus")}),$(document).on("click","#J_submitBtn",function(e){e.preventDefault();var t=$("input[name=userName]"),r=$.trim(t.val()),n=$("input[name=codeInput]");$.trim(n.val());""==r?c(t,"请填写您的用户名/邮箱/已验证手机","error"):a(t)&&o(t)}),$(function(){function e(){t=n.height(),r=$(window).scrollTop()+$(window).height()-t+"px",$(document.body).height()+t<$(window).height()?(n.css({position:"absolute",marginTop:0,top:r}),n.show()):(n.css({position:"static"}),n.show())}var t=0,r=0,n=$(".member-foot");e(),$(window).scroll(e).resize(e)})}),define("lib/components/khValidate/1.0.0/khValidate",[],function(e,t,r){var n={chkEnName:function(e){var t=/^[a-zA-Z|0-9]{3,20}$/;return t.test(e)},chkCnName:function(e){var t=/^[\u2E80-\u9FFF]{2,20}$/;return t.test(e)},chkIsChinese:function(e){var t=/[\u4E00-\u9FA5\uF900-\uFA2D]/;return t.test(e)},chkUserName:function(e){var t=/^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{2,20}$/;return t.test(e)},chkTelephone:function(e){var t=/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;return t.test(e)},chkPhone:function(e){var t=/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;return t.test(e)},chkPass:function(e){var t=/^[a-zA-Z0-9_-]{6,20}$/;return t.test(e)},chkPassNew:function(e){var t=/^[^\u2E80-\uFFA0\s]{6,20}$/;return t.test(e)},chkNumber:function(e,t){var r;switch(t){case 4:r=/^[0-9]{4}$/;break;case 5:r=/^[0-9]{5}$/;break;case 6:r=/^[0-9]{6}$/;break;case 7:r=/^[0-9]{7}$/;break;case 8:r=/^[0-9]{8}$/;break;case 9:r=/^[0-9]{9}$/;break;case 10:r=/^[0-9]{10}$/;break;case 11:r=/^[0-9]{11}$/;break;case 12:r=/^[0-9]{12}$/;break;case 13:r=/^[0-9]{13}$/;break;case 14:r=/^[0-9]{14}$/;break;case 15:r=/^[0-9]{15}$/;break;case 16:r=/^[0-9]{16}$/;break;case 17:r=/^[0-9]{17}$/;break;case 18:r=/^[0-9]{18}$/;break;default:r=/^[0-9]{6}$/}return r.test(e)},chkAliAcount:function(e){var t=/^[0-9]{11}|^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;return t.test(e)},chkBankName:function(e){var t=/^[\u2E80-\u9FFF]{4,20}$/;return t.test(e)},chkBankAcount:function(e){var t=/^[0-9]{15,23}$/;return t.test(e)},chkBankOrderNum:function(e){var t=/^[0-9]{8,}$/;return t.test(e)},chkPrice:function(e){var t=/^[0-9]{1,10}[\.][0-9]{2}$/;return t.test(e)},chkEmail:function(e){var t=/^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;return t.test(e)},chkURL:function(e){var t=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;return t.test(e)},chkIP:function(e){var t=/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;return t.test(e)},chkScript:function(e){var t=/^[A-Za-z0-9|_|-|\u4E00-\u9FA5\uF900-\uFA2D|@|#|,|.|;]+$/;return t.test(e)}};r.exports=n});