define("libpage.0.0/member-introduction",[],function(n,e,i){$(function(){function n(){u=$(window).height(),700>u&&a(),o.each(function(n,e){$(this).hasClass("instroduction-page2")||$(this).height(u)})}function e(n){n.preventDefault();var e=n.originalEvent.wheelDelta||-n.originalEvent.detail,i=Math.max(-1,Math.min(1,e));return l&&(0>i?h<o.length-1&&(l=!1,h++,t(h,o.eq(h))):h>0&&(l=!1,h--,t(h,o.eq(h)))),!1}function i(n){var e=n.keyCode;l&&(40===e?h<o.length-1&&(l=!1,h++,t(h,o.eq(h))):38===e&&h>0&&(l=!1,h--,t(h,o.eq(h))))}function t(n,e){var i=0;i=0==n?0:1==n?n*u:2==n?u+440:(n-1)*u+440,n>=2?$(".JQ_floatNav:hidden").fadeIn(800):$(".JQ_floatNav").fadeOut(300),c.css({transition:"all 1s",transform:"translate3d(0,"+-i+"px,0)"}),c.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend",function(){l=!0}),e.addClass("member-page-active")}function a(){$(".JQ_fixed_page_title_img").css("marginTop","9%"),$(".JQ_fixed_img").addClass("fixedScreen")}var o=$(".instroduction-page"),s=$("a[class*=JQ_page_nav]"),c=$(".JQ_member_wrap"),d=$(".JQ_changeToPage2"),r=($(".JQ_member_nav"),$(".JQ_experience_btn")),l=!0,h=0,u=0;o.eq(0).addClass("member-page-active"),n(),r.on("click",function(){$(this).addClass("visited")}),s.each(function(n,e){$(this).on("click",function(){var n=$(this).attr("class"),e=n.match(/JQ_page_nav[\d]/)[0];h=e.charAt(e.length-1),t(h,o.eq(h)),$(this).hasClass("visited")||0==$(this).index()||$(this).addClass("visited")})}),$(document).on("mousewheel DOMMouseScroll",e),$(document).on("keydown",i),d.on("click",function(){h=1,t(h,o.eq(h))}),$(window).resize(function(){setTimeout(function(){n(),t(h,o.eq(h))},500)})})});