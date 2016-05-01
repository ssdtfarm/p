define("lib/page/reg-new",["lib/components/khValidate/1.0.0/khValidate"],function(e,n,t){function i(){var e=Math.random();v=util.getToken(16),imgURL=cdnConfig.apiPath+"/member/imgcode?type=registercode&v="+e+"&token="+v,$("#J_findImgCode").attr("src",imgURL)}function o(e){var n=$.trim(e.val());if(""!=n){var t=n.toUpperCase();$.ajax({url:cdnConfig.apiPath+"/member/getimgcode",data:{token:v},dataType:"jsonp",success:function(n){"succ"==n.status?n.data.code==t?(g=!0,$("#token").val(v),s(e,"","ok")):s(e,"验证码输入有误，请核对后再输入!","error"):(g=!1,s(e,"输入的验证码不正确","error"))}})}else s(e,"请输入验证码","error")}function r(e){var n=$("#security");n.val(e[1]),n.attr("name",e[0])}function a(e,n,t){n.css("top","-9999px"),t.show();var i=setInterval(function(){0>=e?(clearInterval(i),n.css("top","auto").html("重新获取验证码"),t.hide()):(e-=1,t.find(".J_countDown").html(e))},1e3)}function s(e,n,t){switch(t){case"ok":e.siblings(".icon-tip-ok").show();break;case"error":e.addClass("error").siblings(".error-tips").show().find(".tips-info").html(n)}e.on("focus",function(e){e.preventDefault(),$(this).removeClass("error").siblings(".icon-tip-ok").hide().siblings(".error-tips").hide().find(".tips-info").html("")})}function c(e,n,t){var i=e.val();i=i.replace(/\s/g,""),$.ajax({url:cdnConfig.apiPath+"/member/validatemem",dataType:"jsonp",data:{username:i,key:$("#security").val(),name:$("#security").attr("name")},success:function(t){"succ"==t.status?(s(e,n,"error"),f=!0):(s(e,"","ok"),f=!1,p=!0),r(t.pin)}})}function l(e,n){return k>=3?void s(e,"您本次发送手机验证码次数已经用完,请刷新页面重试.","error"):(k++,a(60,$(".J_getPhoneCode"),$(".J_countDownWrap")),void $.ajax({url:cdnConfig.apiPath+"/member/sendphonecode",data:{phone:n,h:$("#security").val(),m:$("#security").attr("name"),n:k,r:Math.random()},dataType:"jsonp"}).done(function(e){"succ"==e.status&&r(e.pin)}).fail(function(){s(e,"发送失败，请检查网络是否通畅","error")}))}function u(e){var n=cdnConfig.apiPath+"/member/validateiphonecode";$.ajax({url:n,data:{phonecode:e.val()},dataType:"jsonp"}).done(function(n){"succ"==n.status?(m=!0,s(e,"","ok")):s(e,"验证码错误，请确认。","error")}).fail(function(){s(e,"发送失败，请检查网络是否通畅","error")})}function d(e){e.on("focus",function(){$(this).siblings(".info-tips").show()}),e.on("blur",function(){var e=$(this),n=e.val(),t=e.siblings(".level");if(0!=n.length){if(n.length>20)e.val(e.val().slice(0,20)),n=e.val();else if(n.length<6)return e.siblings(".info-tips").hide(),t.hide(),void s(e,"请设置6-20位数字、字母或符号的密码（不包括空格）","error");if(!h.chkPassNew(n))return e.siblings(".info-tips").hide(),t.hide(),void s(e,"请设置6-20位数字、字母或符号的密码（不包括空格）","error");s(e,"","ok"),b=!0,C=!0}}),e.on("keyup",function(){var e=$(this),n=e.val(),t=e.siblings(".level"),i=0;if(n.length>20)e.val(e.val().slice(0,20)),n=e.val();else if(n.length<6)return void t.hide();return/[\u4E00-\u9FA5\uFE30-\uFFA0|\s]/.test(n)?void t.hide():(/[0-9]/.test(n)&&i++,/[a-z]/.test(n)&&i++,/[A-Z]/.test(n)&&i++,/[^(\u4E00-\u9FA5\uF900-\uFA2D\uFE30-\uFFA0|\s|0-9|a-z|A-Z)]/.test(n)&&i++,1==i&&t.addClass("level1").removeClass("level2 level3").show().find(".level-tips").html("弱"),2==i&&t.addClass("level2").removeClass("level1 level3").show().find(".level-tips").html("中"),void(i>=3&&t.addClass("level3").removeClass("level1 level2").show().find(".level-tips").html("强")))})}var h=e("../components/khValidate/1.0.0/khValidate");window.$=window.jQuery=$;var v="";i(),$("#J_refreshCode,#J_findImgCode").on("click",function(e){e.preventDefault(),i()}),$(".J_imgCodeInput").on("blur",function(){var e=$(this),n=$.trim(e.val());""!=n.length&&o(e)}),$(".reg-left .hd-item").hover(function(){$(this).addClass("on")},function(){$(this).removeClass("on")}),$(".reg-left .hd-item").on("click",function(){var e=$(this),n=e.index();e.addClass("active").siblings(".hd-item").removeClass("active"),$(".J_reg_con").eq(n).addClass("active").siblings(".J_reg_con").removeClass("active")}),$(".protocol").on("click",function(){var e=$(this),n=$(this).find(".icon");n.toggleClass("icon-box-normal"),n.hasClass("icon-box-normal")||e.find(".error-tips").hide()}),$(".protocol a").on("click",function(e){e.stopPropagation()});var f=!1,p=!1,m=!1,g=!1;$('input[name="phone"]').on("blur",function(){var e=$(this),n=$.trim(e.val()).replace(/\s/g,"");""!=n&&(/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(n)?c(e,"此手机号已经被注册，请更换其他手机号"):s(e,"手机号码格式有误，请输入正确的手机号","error"))}),$('input[name="phone"]').on("keyup",function(){var e=$(this),n=$.trim(e.val());n.length>1?(e.css("fontSize","16px"),3!=n.length&&8!==n.length||e.val(n+" "),n.length>13&&e.val(n.substr(0,13))):e.css("fontSize","14px")}),$(".J_getPhoneCode").on("click",function(){var e=($(this),$('input[name="phone"]')),n=$('input[name="phone"]'),t=$.trim(e.val()).replace(/\s/g,"");return f?void 0:/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(t)?void l(n,t):void s(e,"手机号码格式有误，请输入正确的手机号","error")});var k=0;$('input[name="regCode"]').on("blur",function(){var e=$(this),n=$.trim($(this).val());""!=n&&(6!=n.length?s(e,"请输入6位手机验证码","error"):u(e))}),$(".J_phone_sub").on("click",function(){var e=$('input[name="phone"]'),n=$('input[name="phonePass"]'),t=$('input[name="regCode"]'),i=$.trim(e.val()),o=n.val(),r=$.trim(t.val()),a=$(".J_imgCodeInput"),c=($.trim(a.val()),$(".phone-protocol .icon").hasClass("icon-box-normal"));return""==i?void s(e,"请输入要注册的手机号码","error"):""==o?($(".info-tips").hide(),void s(n,"请设置登录密码","error")):""==r?void s(t,"请输入手机验证码","error"):""==r?void s(o,"请输入图片验证码","error"):c?void $(".phone-protocol .error-tips").show():void(p&&m&&g&&$("#J_regPhoneForm").submit())}),$(".info-tips").show();var b=!1,C=!1;d($('input[name="phonePass"]')),d($('input[name="emailPass"]')),$('input[name="email"]').on("focus",function(){var e=$(this);if(0==e.siblings(".info-tips").length){var n='<div class="info-tips">用户名需为字母、数字、点、减号、下划线组成；</div>';e.parent().append(n),e.siblings(".info-tips").show()}}),$('input[name="email"]').on("blur",function(){var e=$(this),n=$.trim(e.val());if(e.siblings(".info-tips").remove(),""!=n){if(/[\u4e00-\u9fa5]/.test(n))return void s(e,"用户名需为字母、数字、点、减号、下划线组成；","error");if(/@/.test(n))/^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+[.]{1}([a-zA-Z0-9_-])+/.test(n)?c(e,"此邮箱已经被注册，请更换其他邮箱","error"):s(e,"邮箱地址不正确，请重新输入","error");else{if(n.length>20||n.length<6)return void s(e,"用户名长度为6~20个字符","error");/^[A-Za-z0-9_\-.]+$/gi.test(n)?/^\d+$/.test(n)?s(e,"用户名不支持纯数字注册；（备：防止手机号码被注册）","error"):c(e,"该用户名已被他人注册，请重新输入"):s(e,"用户名需为字母、数字、点、减号、下划线组成；","error")}}}),$(".mail-protocol").on("click",function(){var e=self.find(".icon");e.toggleClass(".icon-box-normal")}),$(".phone-protocol").on("click",function(){var e=self.find(".icon");e.toggleClass(".icon-box-normal")}),$(".J_email_sub").on("click",function(){var e=$('input[name="email"]'),n=$('input[name="emailPass"]'),t=$(".mail-protocol .icon").hasClass("icon-box-normal"),i=$.trim(e.val()),o=$.trim(n.val());return""==i?void s(e,"请输入邮箱/用户名","error"):""==o?($(".info-tips").hide(),void s(n,"请设置登录密码","error")):t?void $(".mail-protocol .error-tips").show():void(p&&b&&$("#J_regEmail").submit())}),$(function(){function e(){n=i.height(),t=$(window).scrollTop()+$(window).height()-n+"px",$(document.body).height()<$(window).height()?(i.css({position:"absolute",marginTop:0,top:t}),i.show()):(i.css({position:"static"}),i.show())}var n=0,t=0,i=$(".member-foot");e(),$(window).scroll(e).resize(e)})}),define("lib/components/khValidate/1.0.0/khValidate",[],function(e,n,t){var i={chkEnName:function(e){var n=/^[a-zA-Z|0-9]{3,20}$/;return n.test(e)},chkCnName:function(e){var n=/^[\u2E80-\u9FFF]{2,20}$/;return n.test(e)},chkIsChinese:function(e){var n=/[\u4E00-\u9FA5\uF900-\uFA2D]/;return n.test(e)},chkUserName:function(e){var n=/^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{2,20}$/;return n.test(e)},chkTelephone:function(e){var n=/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;return n.test(e)},chkPhone:function(e){var n=/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;return n.test(e)},chkPass:function(e){var n=/^[a-zA-Z0-9_-]{6,20}$/;return n.test(e)},chkPassNew:function(e){var n=/^[^\u2E80-\uFFA0\s]{6,20}$/;return n.test(e)},chkNumber:function(e,n){var t;switch(n){case 4:t=/^[0-9]{4}$/;break;case 5:t=/^[0-9]{5}$/;break;case 6:t=/^[0-9]{6}$/;break;case 7:t=/^[0-9]{7}$/;break;case 8:t=/^[0-9]{8}$/;break;case 9:t=/^[0-9]{9}$/;break;case 10:t=/^[0-9]{10}$/;break;case 11:t=/^[0-9]{11}$/;break;case 12:t=/^[0-9]{12}$/;break;case 13:t=/^[0-9]{13}$/;break;case 14:t=/^[0-9]{14}$/;break;case 15:t=/^[0-9]{15}$/;break;case 16:t=/^[0-9]{16}$/;break;case 17:t=/^[0-9]{17}$/;break;case 18:t=/^[0-9]{18}$/;break;default:t=/^[0-9]{6}$/}return t.test(e)},chkAliAcount:function(e){var n=/^[0-9]{11}|^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;return n.test(e)},chkBankName:function(e){var n=/^[\u2E80-\u9FFF]{4,20}$/;return n.test(e)},chkBankAcount:function(e){var n=/^[0-9]{15,23}$/;return n.test(e)},chkBankOrderNum:function(e){var n=/^[0-9]{8,}$/;return n.test(e)},chkPrice:function(e){var n=/^[0-9]{1,10}[\.][0-9]{2}$/;return n.test(e)},chkEmail:function(e){var n=/^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;return n.test(e)},chkURL:function(e){var n=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;return n.test(e)},chkIP:function(e){var n=/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;return n.test(e)},chkScript:function(e){var n=/^[A-Za-z0-9|_|-|\u4E00-\u9FA5\uF900-\uFA2D|@|#|,|.|;]+$/;return n.test(e)}};t.exports=i});