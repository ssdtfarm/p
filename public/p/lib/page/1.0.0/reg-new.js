define("libpage.0.0/reg-new",[],function(o,e,i){function n(){var o=Math.random();v=util.getToken(16),imgURL=cdnConfig.apiPath+"/member/imgcode?type=registercode&v="+o+"&token="+v,$("#J_findImgCode").attr("src",imgURL)}function t(o){var e=$.trim(o.val());if(""!=e){var i=e.toUpperCase();$.ajax({url:cdnConfig.apiPath+"/member/getimgcode",data:{token:v},dataType:"jsonp",success:function(e){"succ"==e.status?e.data.code==i?(f=!0,$("#token").val(v),a(o,"","ok")):a(o,"验证码输入有误，请核对后再输入!","error"):(f=!1,a(o,"输入的验证码不正确","error"))}})}else a(o,"请输入验证码","error")}function r(o){var e=$("#security");e.val(o[1]),e.attr("name",o[0])}function s(o,e,i){e.css("top","-9999px"),i.show();var n=setInterval(function(){0>=o?(clearInterval(n),e.css("top","auto").html("重新获取验证码"),i.hide()):(o-=1,i.find(".J_countDown").html(o))},1e3)}function a(o,e,i){switch(i){case"ok":o.siblings(".icon-tip-ok").show();break;case"error":o.addClass("error").siblings(".error-tips").show().find(".tips-info").html(e)}o.on("focus",function(o){o.preventDefault(),$(this).removeClass("error").siblings(".icon-tip-ok").hide().siblings(".error-tips").hide().find(".tips-info").html("")})}function l(o,e,i){var n=o.val();n=n.replace(/\s/g,""),$.ajax({url:cdnConfig.apiPath+"/member/validatemem",dataType:"jsonp",data:{username:n,key:$("#security").val(),name:$("#security").attr("name")},success:function(i){"succ"==i.status?(a(o,e,"error"),h=!0):(a(o,"","ok"),h=!1,p=!0),r(i.pin)}})}function c(o,e){return g>=3?void a(o,"您本次发送手机验证码次数已经用完,请刷新页面重试.","error"):(g++,s(60,$(".J_getPhoneCode"),$(".J_countDownWrap")),void $.ajax({url:cdnConfig.apiPath+"/member/sendphonecode",data:{phone:e,h:$("#security").val(),m:$("#security").attr("name"),n:g,r:Math.random()},dataType:"jsonp"}).done(function(o){"succ"==o.status&&r(o.pin)}).fail(function(){a(o,"发送失败，请检查网络是否通畅","error")}))}function u(o){var e=cdnConfig.apiPath+"/member/validateiphonecode";$.ajax({url:e,data:{phonecode:o.val()},dataType:"jsonp"}).done(function(e){"succ"==e.status?(m=!0,a(o,"","ok")):a(o,"验证码错误，请确认。","error")}).fail(function(){a(o,"发送失败，请检查网络是否通畅","error")})}function d(o){o.on("focus",function(){$(this).siblings(".info-tips").show()}),o.on("blur",function(){var o=$(this),e=$.trim(o.val());if(o.siblings(".info-tips").hide(),0!=e.length){if(e.length>20||e.length<6)return void a(o,"密码长度为6-20个字符，且区分大小写","error");if(!/^[a-zA-z0-9-_]{6,20}$/.test(e))return o.siblings(".info-tips").hide(),void a(o,"不能使用特殊字符","error");a(o,"","ok"),b=!0,C=!0}}),o.on("keyup",function(){var o=$(this),e=$.trim(o.val()),i=o.siblings(".level"),n=0;e.length>=6?o.siblings(".info-tips").hide():o.siblings(".info-tips").show(),e.length>20||e.length<6?i.hide():(/[0-9]/.test(e)&&n++,/[a-z]/.test(e)&&n++,/[A-Z]/.test(e)&&n++,/[-_.]/.test(e)&&n++,1==n&&i.addClass("level1").removeClass("level2 level3").show().find(".level-tips").html("弱"),2==n&&i.addClass("level2").removeClass("level1 level3").show().find(".level-tips").html("中"),n>=3&&i.addClass("level3").removeClass("level1 level2").show().find(".level-tips").html("强"))})}var v="";n(),$("#J_refreshCode,#J_findImgCode").on("click",function(o){o.preventDefault(),n()}),$(".J_imgCodeInput").on("blur",function(){var o=$(this),e=$.trim(o.val());""!=e.length&&t(o)}),$(".reg-left .hd-item").hover(function(){$(this).addClass("on")},function(){$(this).removeClass("on")}),$(".reg-left .hd-item").on("click",function(){var o=$(this),e=o.index();o.addClass("active").siblings(".hd-item").removeClass("active"),$(".J_reg_con").eq(e).addClass("active").siblings(".J_reg_con").removeClass("active")}),$(".protocol").on("click",function(){var o=$(this),e=$(this).find(".icon");e.toggleClass("icon-box-normal"),e.hasClass("icon-box-normal")||o.find(".error-tips").hide()}),$(".protocol a").on("click",function(o){o.stopPropagation()});var h=!1,p=!1,m=!1,f=!1;$('input[name="phone"]').on("blur",function(){var o=$(this),e=$.trim(o.val()).replace(/\s/g,"");""!=e&&(/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(e)?l(o,"此手机号已经被注册，请更换其他手机号"):a(o,"手机号码格式有误，请输入正确的手机号","error"))}),$('input[name="phone"]').on("keyup",function(){var o=$(this),e=$.trim(o.val());e.length>1?(o.css("fontSize","16px"),3!=e.length&&8!==e.length||o.val(e+" "),e.length>13&&o.val(e.substr(0,13))):o.css("fontSize","14px")}),$(".J_getPhoneCode").on("click",function(){var o=($(this),$('input[name="phone"]')),e=$('input[name="phone"]'),i=$.trim(o.val()).replace(/\s/g,"");return h?void 0:/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(i)?void c(e,i):void a(o,"手机号码格式有误，请输入正确的手机号","error")});var g=0;$('input[name="regCode"]').on("blur",function(){var o=$(this),e=$.trim($(this).val());""!=e&&(6!=e.length?a(o,"请输入6位手机验证码","error"):u(o))}),$(".J_phone_sub").on("click",function(){var o=$('input[name="phone"]'),e=$('input[name="phonePass"]'),i=$('input[name="regCode"]'),n=$.trim(o.val()),t=$.trim(e.val()),r=$.trim(i.val()),s=$(".J_imgCodeInput"),l=($.trim(s.val()),$(".phone-protocol .icon").hasClass("icon-box-normal"));return""==n?void a(o,"请输入要注册的手机号码","error"):""==t?void a(e,"请设置登陆密码","error"):""==r?void a(i,"请输入手机验证码","error"):""==r?void a(t,"请输入图片验证码","error"):l?void $(".phone-protocol .error-tips").show():void(p&&m&&f&&$("#J_regPhoneForm").submit())});var b=!1,C=!1;d($('input[name="phonePass"]')),d($('input[name="emailPass"]')),$('input[name="email"]').on("focus",function(){var o=$(this);if(0==o.siblings(".info-tips").length){var e='<div class="info-tips">用户名需为字母、数字、点、减号、下划线组成；</div>';o.parent().append(e),o.siblings(".info-tips").show()}}),$('input[name="email"]').on("blur",function(){var o=$(this),e=$.trim(o.val());if(o.siblings(".info-tips").remove(),""!=e){if(/[\u4e00-\u9fa5]/.test(e))return void a(o,"用户名需为字母、数字、点、减号、下划线组成；","error");if(/@/.test(e))/^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+[.]{1}([a-zA-Z0-9_-])+/.test(e)?l(o,"此邮箱已经被注册，请更换其他邮箱","error"):a(o,"邮箱地址不正确，请重新输入","error");else{if(e.length>20||e.length<6)return void a(o,"用户名长度为6~20个字符","error");/[\u2E80-\u9FFF~！#￥%……&*（）？——、<>\/,=\+]+/.test(e)?a(o,"用户名需为字母、数字、点、减号、下划线组成；","error"):/^\d+$/.test(e)?a(o,"用户名不支持纯数字注册；（备：防止手机号码被注册）","error"):l(o,"该用户名已被他人注册，请重新输入")}}}),$(".mail-protocol").on("click",function(){var o=self.find(".icon");o.toggleClass(".icon-box-normal")}),$(".phone-protocol").on("click",function(){var o=self.find(".icon");o.toggleClass(".icon-box-normal")}),$(".J_email_sub").on("click",function(){var o=$('input[name="email"]'),e=$('input[name="emailPass"]'),i=$(".mail-protocol .icon").hasClass("icon-box-normal"),n=$.trim(o.val()),t=$.trim(e.val());return""==n?void a(o,"请输入邮箱/用户名","error"):""==t?void a(e,"请设置登陆密码","error"):i?void $(".mail-protocol .error-tips").show():void(p&&b&&$("#J_regEmail").submit())}),$(function(){function o(){e=n.height(),i=$(window).scrollTop()+$(window).height()-e+"px",$(document.body).height()<$(window).height()?(n.css({position:"absolute",marginTop:0,top:i}),n.show()):(n.css({position:"static"}),n.show())}var e=0,i=0,n=$(".member-foot");o(),$(window).scroll(o).resize(o)})});