define("lib/page/1.0.1/login-new",[],function(e,n,i){function o(e){var n=$(".login-msg");n.find("span").html(e),n.show()}function s(){var e=$(".userName"),n=$(".userPass"),i=$.trim(e.val()),s=n.val(),t=$("#token"),r={};if(r.username=e.val(),r.password=n.val(),r[t.attr("name")]=t.val(),""===i&&""===s)return o("请输入帐户名和密码"),e.parent().addClass("error"),void n.parent().addClass("error");if(""!==i&&""==s)return o("请输入密码"),void n.parent().addClass("error");if(""===i&&""!==s)return o("请输入帐户名"),void e.parent().addClass("error");$(".J_login").html("登录中...");var r={};r.username=e.val(),r.password=n.val(),r[t.attr("name")]=t.val(),r.url=$('input[name="url"]').val(),$('input[name="url_link"]')&&(r.url_link=$('input[name="url_link"]').val()),r.ref_url=$('input[name="ref_url"]').val(),$.ajax({url:"/passport/index",type:"POST",data:r,dataType:"json",success:function(e){200==e.code?(a("kUserNameForLogin",r.username,1),window.location.href=e.url):(o("帐户名与密码不匹配，请重新输入"),n.parent().addClass("error"),$(".J_login").html("登&nbsp;录"),setTimeout(function(){window.location.href=window.location.href},1e3),a("kUserNameForLogin",r.username,1))},faile:function(){}})}function a(e,n,i){var o=e+"="+escape(n);if(i>0){var s=new Date,a=3600*i*1e3;s.setTime(s.getTime()+a),o+="; expires="+s.toGMTString()}document.cookie=o}function t(e){for(var n=document.cookie.split("; "),i=0;i<n.length;i++){var o=n[i].split("=");if(o[0]==e)return unescape(o[1])}}$(".remember").on("click",function(){var e=($(this),$(this).find("i"));e.toggleClass("icon-box-normal")});var r=$(".J_loginItem input");r.each(function(){var e=$(this),n=e.parent(),i=e.siblings(".J_clear"),o=$(".mail-fill"),s=o.find("li"),a=o.find("span");e.on("focus",function(){n.addClass("focus")}),e.on("blur",function(){n.removeClass("focus")}),e.on("keyup",function(t){var r=$.trim(e.val());r.length>0?(i.show(),n.removeClass("error"),$(".login-msg").hide()):i.hide(),e.hasClass("userName")&&/^.+@$/.test(r)?(o.show(),a.html(r),s.css("background","none"),40==t.keyCode&&(void 0==this.index||this.index>=s.length-1?this.index=0:this.index++,s.eq(this.index).css("background","#e8f2f8")),38==t.keyCode&&(void 0==this.index||this.index<=0?this.index=s.length-1:this.index--,s.eq(this.index).css("background","#e8f2f8")),13==t.keyCode&&(t.stopPropagation(),e.val(s.eq(this.index).text()),o.hide(),this.index=void 0,$(".userPass")[0].focus())):o.hide()}),i.on("click",function(n){n.stopPropagation(),e.val(""),i.hide()})}),$(".mail-fill li").on("click",function(){$(".userName").val($(this).text()),$(this).parent().hide()}),$(document).on("click",function(){$(".mail-fill").hide()}),$(".J_login").on("click",function(){s()}),$(document).on("keyup",function(e){var n=e.which;"13"==n&&s()}),t("kUserNameForLogin")?($(".userName").val(t("kUserNameForLogin")),$(".userName").siblings(".J_clear").show(),$(".userPass")[0].focus()):$(".userName")[0].focus(),$(function(){function e(){n=o.height(),i=$(window).scrollTop()+$(window).height()-n+"px",$(document.body).height()<$(window).height()?(o.css({position:"absolute",marginTop:0,top:i}),o.show()):(o.css({position:"static"}),o.show())}var n=0,i=0,o=$(".member-foot");e(),$(window).scroll(e).resize(e)})});