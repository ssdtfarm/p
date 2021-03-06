define("lib/active/active",["lib/components/lazyload/1.0.1/lazyload","lib/template/tempactive","lib/template/tempcomment","lib/components/mainNav/1.0.1/mainNav","lib/components/minBar/1.0.1/minBar"],function(t,a,n){var e=(t("../components/lazyload/1.0.1/lazyload"),t("../template/tempactive")),i=t("../template/tempcomment"),o=t("../components/mainNav/1.0.1/mainNav"),r=t("../components/minBar/1.0.1/minBar");setTimeout(function(){void 0!=$(".lazy").eq(0).attr("data-original")&&$(".lazy").each(function(){var t=$(this),a=t.attr("data-original");t.attr("src",a)})},1e3),$(function(){$("#J_activeAllBg").css({background:"url("+activityBg+") center top no-repeat"})});try{$("#J_mainNav").html($("#J_mainNavTemp").html()),o({mainCell:"JQ_headNavMenu",lineCell:"JQ_headNavLine"})}catch(l){}try{for(var s=$(".cJSON"),c=0;c<s.length;c++){var d=s[c].innerHTML,p=d.replace(/<img/gi,'<img class="lazy"'),u=p.replace(/src/gi,"data-original"),m=s[c].getAttribute("id").split("_")[1]+"_"+s[c].getAttribute("id").split("_")[2],h=document.getElementById(m);h.innerHTML=u}}catch(l){}try{var f=e("tplAnchor",acData);$("body").append(f)}catch(l){}r({mainCell:"#J_minBar",pathConfig:cdnConfig,tpl:i,tplName:"tplMinBar",data:_globalConfig.minBar.data})}),define("lib/components/lazyload/1.0.1/lazyload",[],function(t,a,n){!function(t,a,n,e){"use strict";function i(i,o,r,l){function s(){if(J=a.devicePixelRatio>1,null!==o("defaultImage")||null!==o("placeholder"))for(var n=0;n<r.length;n++){var e=t(r[n]),s=r[n].tagName.toLowerCase(),d="background-image";e.data("plugin_"+i.name,i),"img"==s&&o("defaultImage")&&!e.attr("src")?e.attr("src",o("defaultImage")):"img"==s||!o("placeholder")||e.css(d)&&"none"!=e.css(d)||e.css(d,"url("+o("placeholder")+")")}o("delay")>=0&&setTimeout(function(){c(!0)},o("delay")),(o("delay")<0||o("combined"))&&(c(),l.e=f(o("throttle"),function(t){"resize"===t.type&&(w=B=-1),A(function(){c(t.all)},i,!0)}),t(o("appendScroll")).on("scroll."+i.name+" resize."+i.name,l.e))}function c(a){if(!r.length)return i.destroy();for(var n=!1,e=0;e<r.length;e++)(function(e){if(p(e)||a){var i=t(e),r=e.tagName.toLowerCase();if(i.data(o("handledName")))return;i.attr(o("attribute"))&&("img"==r&&i.attr(o("attribute"))!=i.attr("src")||"img"!=r&&i.attr(o("attribute"))!=i.css("background-image"))&&(i.is(":visible")||!o("visibleOnly"))&&(n=!0,i.data(o("handledName"),!0),A(function(){d(i,r)}))}})(r[e]);n&&A(function(){r=t(r).filter(function(){return!t(this).data(o("handledName"))})})}function d(a,n){var e=t(new Image);++y,e.error(function(){v("onError",a),g()}),e.one("load",function(){a.hide(),"img"==n?a.attr("src",e.attr("src")):a.css("background-image","url("+e.attr("src")+")"),a[o("effect")](o("effectTime")),o("removeAttribute")&&a.removeAttr(o("attribute")+" "+o("retinaAttribute")),v("afterLoad",a),e.off("error").remove(),g()}),v("beforeLoad",a),e.attr("src",a.attr(o(J&&a.attr(o("retinaAttribute"))?"retinaAttribute":"attribute"))),e.complete&&e.load()}function p(t){var a=t.getBoundingClientRect(),n=o("threshold"),e=m()+n>a.top&&-n<a.bottom,i=u()+n>a.left&&-n<a.right;return"vertical"==o("scrollDirection")?e:"horizontal"==o("scrollDirection")?i:e&&i}function u(){return w=h(w,"Width")}function m(){return B=h(B,"Height")}function h(t,e){return t>=0?t:a["inner"+e]||(n.documentElement||n.body)["client"+e]||n.body["offset"+e]||o("fallback"+e)}function f(t,a){var n,i=0;return function(r,l){function s(){i=+new Date,a.call(e,r)}var c=+new Date-i;n&&clearTimeout(n),c>t||!o("enableThrottle")||l?s():n=setTimeout(s,t-c)}}function g(){--y,r.size()||y||v("onFinishedAll",null)}function v(t,a){(t=o(t))&&(a?A(function(){t(a)},i):A(t,i))}function b(){_=setTimeout(function(){A(),C.length&&b()},2)}function A(t,n,e){return t?o("enableQueueing")?(e&&k||(C.push([t,n,e]),e&&(k=!0)),void(1==C.length&&b())):void t.call(n||a):void((t=C.shift())&&(t[2]&&(k=!1),t[0].call(t[1]||a)))}var y=0,w=-1,B=-1,J=!1,_=null,C=[],k=!1;!function(){if(o("onError"))for(var n=0;n<r.length;n++)A(function(){t(this).on("error."+i.name,function(){v("onError",t(this))})},r[n]);"event"==o("bind")?s():t(a).load(s)}()}function o(a,n){n&&t.extend(this.configuration,n);var e=this,o=a,r={e:null},l=function(t){return e.configuration[t]};return e.update=function(t){r.e&&r.e({},!t)},e.loadAll=function(){r.e&&r.e({all:!0})},e.destroy=function(){t(l("appendScroll")).off("."+e.name,r.e),o={},r.e=null},i(e,l,o,r),l("chainable")?a:e}t.fn.Lazy=t.fn.lazy=function(t){return new o(this,t)},t.extend(o.prototype,{name:"lazy",configuration:{chainable:!0,bind:"load",threshold:500,fallbackWidth:2e3,fallbackHeight:2e3,visibleOnly:!1,appendScroll:a,scrollDirection:"both",defaultImage:"data:image/gif;base64,R0lGODlhQAFAAbMLALOzs+Hh4dbW1rq6uoGBgTQ0NAEBARsbG8TExJeXl1RUVP///wAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNDY3OEE2OTA3NTQxMUU1QTU5QUIyMjdFNjUyQkNDMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNDY3OEE2QTA3NTQxMUU1QTU5QUIyMjdFNjUyQkNDMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI0Njc4QTY3MDc1NDExRTVBNTlBQjIyN0U2NTJCQ0MxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI0Njc4QTY4MDc1NDExRTVBNTlBQjIyN0U2NTJCQ0MxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp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",placeholder:null,delay:-1,combined:!1,attribute:"data-original",retinaAttribute:"data-retina",removeAttribute:!0,handledName:"handled",effect:"show",effectTime:0,enableThrottle:!0,throttle:250,enableQueueing:!0,beforeLoad:null,afterLoad:null,onError:null,onFinishedAll:null}})}(jQuery,window,document)}),!function(){function t(t,a){return(/string|function/.test(typeof a)?l:r)(t,a)}function a(t,n){return"string"!=typeof t&&(n=typeof t,"number"===n?t+="":t="function"===n?a(t.call(t)):""),t}function n(t){return p[t]}function e(t){return a(t).replace(/&(?![\w#]+;)|[<>"']/g,n)}function i(t,a){if(u(t))for(var n=0,e=t.length;e>n;n++)a.call(t,t[n],n,t);else for(n in t)a.call(t,t[n],n)}function o(t,a){var n=/(\/)[^/]+\1\.\.\1/,e=("./"+t).replace(/[^/]+$/,""),i=e+a;for(i=i.replace(/\/\.\//g,"/");i.match(n);)i=i.replace(n,"/");return i}function r(a,n){var e=t.get(a)||s({filename:a,name:"Render Error",message:"Template not found"});return n?e(n):e}function l(t,a){if("string"==typeof a){var n=a;a=function(){return new d(n)}}var e=c[t]=function(n){try{return new a(n,t)+""}catch(e){return s(e)()}};return e.prototype=a.prototype=m,e.toString=function(){return a+""},e}function s(t){var a="{Template Error}",n=t.stack||"";if(n)n=n.split("\n").slice(0,2).join("\n");else for(var e in t)n+="<"+e+">\n"+t[e]+"\n\n";return function(){return"object"==typeof console&&console.error(a+"\n\n"+n),a}}var c=t.cache={},d=this.String,p={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},u=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},m=t.utils={$helpers:{},$include:function(t,a,n){return t=o(n,t),r(t,a)},$string:a,$escape:e,$each:i},h=t.helpers=m.$helpers;t.get=function(t){return c[t.replace(/^\.\//,"")]},t.helper=function(t,a){h[t]=a},"function"==typeof define?define("lib/template/tempactive",[],function(a,n,e){return t}):"undefined"!=typeof exports?module.exports=t:this.template=t,t("tplAnchor",function(t,a){"use strict";var n=this,e=(n.$helpers,t.activity_mddh_status),i=n.$escape,o=t.activity_anchor_info,r=t.i,l=t.list,s="";if(s+=" ",1==e){s+=' <div class="nav_act" style="width:',s+=i(o.g_width),s+="px; position:fixed; top:",s+=i(o.g_top),s+='px;"> <a onclick="cose()"> <p style="width:',s+=i(o.g_close_width),s+="px;height:",s+=i(o.g_close_height),s+='px;position:absolute;top:0;right:0;"></p> </a> <p style="width:',s+=i(o.g_top_width),s+="px;height:",s+=i(o.g_top_height),s+="px;background:url(",s+=i(o.g_top_url),s+=") no-repeat ",s+=i(o.g_top_coordinate_x),s+="px ",s+=i(o.g_top_coordinate_x),s+='px;"></p> ';for(var r=0;r<l.length;r++)s+=' <a href="#img_',s+=i(l[r].g_md_id),s+='"> <p style="width:',s+=i(l[r].g_md_width),s+="px;height:",s+=i(l[r].g_md_height),s+="px;background:url(",s+=i(l[r].g_md_url),s+=") no-repeat ",s+=i(l[r].g_md_coordinate_x),s+="px ",s+=i(l[r].g_md_coordinate_y),s+='px;"></p> </a> ';s+=' <a href="#"> <p style="width:',s+=i(o.g_bottom_width),s+="px;height:",s+=i(o.g_bottom_height),s+="px;background:url(",s+=i(o.g_bottom_url),s+=") no-repeat ",s+=i(o.g_bottom_coordinate_x),s+="px ",s+=i(o.g_bottom_coordinate_y),s+='px;"></p> </a> </div> '}return s+="  ",new d(s)})}(),!function(){function t(t,a){return(/string|function/.test(typeof a)?l:r)(t,a)}function a(t,n){return"string"!=typeof t&&(n=typeof t,"number"===n?t+="":t="function"===n?a(t.call(t)):""),t}function n(t){return p[t]}function e(t){return a(t).replace(/&(?![\w#]+;)|[<>"']/g,n)}function i(t,a){if(u(t))for(var n=0,e=t.length;e>n;n++)a.call(t,t[n],n,t);else for(n in t)a.call(t,t[n],n)}function o(t,a){var n=/(\/)[^/]+\1\.\.\1/,e=("./"+t).replace(/[^/]+$/,""),i=e+a;for(i=i.replace(/\/\.\//g,"/");i.match(n);)i=i.replace(n,"/");return i}function r(a,n){var e=t.get(a)||s({filename:a,name:"Render Error",message:"Template not found"});return n?e(n):e}function l(t,a){if("string"==typeof a){var n=a;a=function(){return new d(n)}}var e=c[t]=function(n){try{return new a(n,t)+""}catch(e){return s(e)()}};return e.prototype=a.prototype=m,e.toString=function(){return a+""},e}function s(t){var a="{Template Error}",n=t.stack||"";if(n)n=n.split("\n").slice(0,2).join("\n");else for(var e in t)n+="<"+e+">\n"+t[e]+"\n\n";return function(){return"object"==typeof console&&console.error(a+"\n\n"+n),a}}var c=t.cache={},d=this.String,p={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},u=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},m=t.utils={$helpers:{},$include:function(t,a,n){return t=o(n,t),r(t,a)},$string:a,$escape:e,$each:i},h=t.helpers=m.$helpers;t.get=function(t){return c[t.replace(/^\.\//,"")]},t.helper=function(t,a){h[t]=a},"function"==typeof define?define("lib/template/tempcomment",[],function(a,n,e){return t}):"undefined"!=typeof exports?module.exports=t:this.template=t,t("tplAddressForm",function(t,a){"use strict";var n=this,e=(n.$helpers,n.$escape),i=t.actionURL,o=t.addressID,r=t.userName,l=t.address,s=t.telephone,c=t.mobilephone,p=t.defaultAdd,u="";return u+='<form id="J_addressForm" action="',u+=e(i),u+='" method="post"> <input type="hidden" name="addressID" value="',u+=e(o),u+='"> <table id="J_add" class="person-address-add-table"> <tbody class="person-address"> <tr class="item"> <th class="address-add-head">收货人：</th> <td> <input id="J_userName" class="person-address-add-input" name="userName" value="',u+=e(r),u+='" /> <span class="fc-f60">*</span> </td> </tr> <tr class="item"> <th class="address-add-head">详细地址：</th> <td id="J_selectAddress"></td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <p> <input id="J_address" class="person-address-add-input detailed-address-input" name="address" placeholder="具体地址" value="',u+=e(l),u+='" /> <span class="fc-f60">*</span> </p> <p> <label class="person-address-add-tip">&nbsp;&nbsp;&nbsp;(不需要重复填写省/市/区)</label> </p> </td> </tr> <tr class="item"> <th class="address-add-head">固定电话：</th> <td> <input id="J_tel" class="person-address-add-input" name="tel" value="',u+=e(s),u+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（示例：020-88888888-999）</label> </td> </tr> <tr class="item"> <th class="address-add-head">手机：</th> <td> <input id="J_phone" class="person-address-add-input" name="phone" value="',u+=e(c),u+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（手机或固话必填一项）</label> </td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <div class="defult-address-choose"> ',u+="1"==p?' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-checked"></a> ':' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-normal"></a> ',u+=' <span class="address-font-gray">设为默认地址</span> <input type="hidden" name="setDefault" value="',u+=e(p),u+='" /> </div> </td> </tr> </tbody> </table> </form>',new d(u)}),t("tplBottomAd",function(t,a){"use strict";var n=this,e=(n.$helpers,t.link),i=n.$escape,o=t.linkURL,r=t.title,l=t.imgURL,s="";return s+='<div class="full-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=e&&(s+=i(e)),""!=o&&(s+=i(o)),s+='" target="_blank" title="',s+=i(r),s+='" style=" display:block; width:100%;min-height: 80px;background:url(',s+=i(l),s+=') center top no-repeat; "> <img src="',s+=i(l),s+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="full-ad-close" id="J_itemBottomAdClose"><span></span></a> </div> </div>',new d(s)}),t("tplEditPassForm",function(t,a){"use strict";var n=this,e=(n.$helpers,n.$escape),i=t.actionURL,o="";return o+='<form id="J_editPassForm" action="',o+=e(i),o+='" method="post"> <div class="fc-8c8">为了您的账户安全，请定期更换登录密码，并确保登录密码设置与提现密码不同。</div> <input type="hidden" name="form" value="form"> <div class="a-edit-pass-tr"> <p id="J_oldPass" class="edit-input-wrap"> <input type="password" name="old_passwd" placeholder="原密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_newPass" class="edit-input-wrap"> <input type="password" name="new_passwd" placeholder="输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_confirmNewPass" class="edit-input-wrap"> <input type="password" name="confirmNewPass" placeholder="再次输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> </form>',new d(o)}),t("tplFloatNav",'<div id="J_floatNav" class="float-nav"> <a href="http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=201143&jid=2104161973" class="float-nav-char-wrap JQ_floatNavNormal" target="_blank"> <span class="floag-online-chat">在线客服</span> <i class="icon-float-chat normal-icon"></i> </a> <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4006538038&aty=0&a=0&curl=&ty=1" class="float-nav-qq JQ_floatNavNormal" target="_blank"> <span>QQ客服</span> <i class="icon-float-qq normal-icon"></i> </a> <a href="http://cart.kinhom.com/list.html" class="float-nav-cart JQ_floatNavNormal" target="_blank"> <span>购物车</span> <i class="icon-float-cart normal-icon"></i> <i class="icon-cart-num num-icon">0</i> </a> <a href="javascript:void(0);" class="float-nav-wechat JQ_floatNavWechat"> <span> <img src="http://misc.jjcdn.com/p/images/float_wechat.png" width="40" height="40" /> </span> <i class="icon-float-wechat normal-icon"></i> </a> <a href="http://www.wenjuan.com/s/qU36f2/" target="_blank" class="float-nav-feedback JQ_floatNavNormal"> <span>意见反馈</span> <i class="icon-float-feedback normal-icon"></i> </a> <a id="J_floatGoTop" href="javascript:void(0);" class="float-nav-top JQ_floatNavNormal"> <span>返回顶部</span> <i class="icon-float-top normal-icon"></i> </a> </div>'),t("tplLoginDialog",'<div class="login-dialog"> <div class="login-dialog-form"> <form action="javascript:void(0);" method="post"> <p class="login-dialog-form-tr" id="J_loginUserName"> <label>用户名：</label> <input type="text" name="loginUserName" placeholder="输入用户名/邮箱/手机"> </p> <p class="login-dialog-form-tip"></p> <p class="login-dialog-form-tr" id="J_loginPassword"> <label>密&nbsp;&nbsp;&nbsp;码：</label> <input type="password" name="loginPassword" placeholder="输入密码"> </p> <p class="login-dialog-form-tip"></p> </form> </div> </div> '),t("tplMinBar",function(t,a){"use strict";var n=this,e=(n.$helpers,n.$escape),i=t.live800,o=t.cdnPath,r=t.wapQQ,l=t.cart,s=t.mobile,c=t.wechat,p=t.feedback,u=t.gotop,m="";return m+=' <section id="J_minBar" class="min-bar"> <div class="min-bar-tabs"> <div class="min-bar-tab min-bar-online"> <div class="min-bar-online-icon"> <a href="',m+=e(i.clientLink),m+='" class="blankLink JQ_minBarOnline" target="_blank"> <img src="',m+=e(o),m+=e(i.iconPath),m+='" width="',m+=e(i.iconWidth),m+='" height="',m+=e(i.iconHeight),m+='" alt="',m+=e(i.iconText),m+='"/> <label class="min-bar-chat-num">',m+=e(i.chatNum),m+='</label> </a> <span class="min-bar-online-pop"> <span class="pop-close">&nbsp;</span> <a href="',m+=e(i.clientLink),m+='" class="pop-chat" target="_blank">&nbsp;</a> </span> </div> </div> <div class="min-bar-tab min-bar-qq min-text"> <div class="min-bar-qq-icon"> <a href="',m+=e(r.clientLink),m+='" class="blankLink" target="_blank"> <img src="',m+=e(o),m+=e(r.iconPath),m+='" width="',m+=e(r.iconWidth),m+='" height="',m+=e(r.iconHeight),m+='" alt="',m+=e(r.iconText),m+='"/> </a> <span class="min-bar-qq-text text">',m+=e(r.iconText),m+='</span> </div> </div> <div class="min-bar-tab min-bar-cart min-cart"> <div class="min-bar-cart-icon"> <a href="',m+=e(l.clientLink),m+='" class="icon-float-cart"> <span id="J_cartNum" class="min-bar-cart-num">',m+=e(l.chatNum),m+='</span> </a> </div> <div id="J_minBarPlugin" class="min-bar-plugin"> <div class="bar-plugin-cart"> <ul id="J_pluginCart"> </ul> <div class="plugin-cart-info"> <p class="cart-info-price"> <span class="cart-info-num"> 共 <label id="J_minBarCartNum">0</label> 件商品 </span> <span class="cart-info-total"> 合计: <small>&yen;</small> <label id="J_minBarCartTotal">0</label> </span> </p> <p class="cart-info-shipping">(不含运费)</p> <p class="cart-info-btn"> <a href="javascript:void(0);" id="J_minBarBtn" class="btn-gray" target="_blank">查看购物车</a> </p> </div> </div> </div> </div> <div class="min-bar-tab min-bar-phone min-phone"> <div class="min-bar-phone-icon"> <a href="',m+=e(s.clientLink),m+='" class="icon-float-phone">&nbsp;</a> <span class="min-bar-phone-img phone"> <img src="',m+=e(o),m+=e(s.iconPath),m+='" width="',m+=e(s.iconWidth),m+='" height="',m+=e(s.iconHeight),m+='" alt="',m+=e(s.iconText),m+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-wechat min-wechat"> <div class="min-bar-wechat-icon"> <a href="',m+=e(c.clientLink),m+='" class="icon-float-wechat">&nbsp;</a> <span class="min-bar-wechat-img wechat"> <img src="',m+=e(o),m+=e(c.iconPath),m+='" width="',m+=e(c.iconWidth),m+='" height="',m+=e(c.iconHeight),m+='" alt="',m+=e(c.iconText),m+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-feedback min-text"> <div class="min-bar-feedback-icon"> <a href="',m+=e(p.clientLink),m+='" class="icon-float-feedback blankLink" target="_blank">&nbsp;</a> <span class="min-bar-feedback-text text">',m+=e(p.iconText),m+='</span> </div> </div> <div class="min-bar-tab min-bar-gtop min-text"> <div class="min-bar-gtop-icon" id="J_minBarGoTop"> <a href="',m+=e(u.clientLink),m+='" class="icon-float-top">&nbsp;</a> <span class="min-bar-gtop-text text">',m+=e(u.iconText),m+='</span> </div> </div> </div> </section> <section class="min-bar-mark"></section> ',new d(m)}),t("tplSelectAddress",function(t,a){"use strict";var n=this,e=(n.$helpers,t.valCity),i=n.$escape,o=t.textPro,r=t.valPro,l=t.textCity,s=t.valArea,c=t.textArea,p="";return p+='<div id="J_selectProvience" class="select-gray fl"> <i class="select-corner icon-gray-left"></i> ',""==e?p+=' <label class="JQ_option select-option w90" data-value="0">请选择省</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=i(o),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_proList"></ul> <input type="hidden" name="valProvince" value="',p+=i(r),p+='" /> </div> <div class="select-gray fl JQ_addressCity"> <i class="select-corner icon-gray-left"></i> ',""==e?p+=' <label class="JQ_option select-option w90" data-value="0">请选择市</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=i(l),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_cityList"></ul> <input type="hidden" name="valCity" value="',p+=i(e),p+='" /> </div> <div class="select-gray fl JQ_addressArea"> <i class="select-corner icon-gray-left"></i> ',""==s?p+=' <label class="JQ_option select-option w90" data-value="0">请选择区</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=i(c),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_areaList"></ul> <input type="hidden" name="valArea" value="',p+=i(s),p+='" /> </div> ',new d(p)}),t("tplTopAd",function(t,a){"use strict";var n=this,e=(n.$helpers,t.link),i=n.$escape,o=t.linkURL,r=t.title,l=t.imgURL,s="";return s+='<div class="top-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=e&&(s+=i(e)),""!=o&&(s+=i(o)),s+='" target="_blank" title="',s+=i(r),s+='" style=" display:block; width:100%; min-height: 80px; background:url(',s+=i(l),s+=') center top no-repeat; "> <img src="',s+=i(l),s+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="index-top-ad-close" id="J_indexTopAdClose"> <span></span> </a> </div> </div>',new d(s)})}(),define("lib/components/mainNav/1.0.1/mainNav",[],function(t,a,n){function e(t){function a(){l.find("a.nav-item").each(function(t){var a=t;$(this).hasClass("cur")&&(e(a),d=a)}),n(),c=i(d)}function n(){l.find("a.nav-item").each(function(t){$(this).on("mouseover",function(){e(t)}),$(this).on("mouseout",function(){o(d)})})}function e(t){var a=l.find("a.nav-item").eq(t).outerWidth(!0),n=a-l.find("a.nav-item").eq(t).width();r(t);for(var e=0,i=0;t>i;i++)e+=l.find("a.nav-item").eq(i).innerWidth();s.stop().animate({left:e+n/2},200)}function i(t){for(var a=l.find("a.nav-item").eq(t).outerWidth(!0),n=a-l.find("a.nav-item").eq(t).width(),e=0,i=0;t>i;i++)e+=l.find("a.nav-item").eq(i).innerWidth();return e+n/2}function o(t){s.stop().animate({left:c},200),r(t)}function r(t){s.css({width:l.find("a.nav-item").eq(t).width()})}var t=t||{},l=$("."+t.mainCell),s=$("."+t.lineCell),c=(s.innerWidth(),0),d=0;a()}n.exports=e}),define("lib/components/minBar/1.0.1/minBar",[],function(t,a,n){function e(t){function a(){n(W),v(),f("#J_minBarPlugin"),i($(window).innerWidth()),$(window).resize(function(){i($(window).innerWidth())}),D.each(function(t){var a=$(this);a.on("mouseover",function(t){a.find("span.text").stop(!0,!0).delay(300).animate({right:"40px",opacity:1},300)}).on("mouseleave",function(t){a.find("span.text").stop(!0,!0).animate({right:"-80px",opacity:.1},300)}).on("click",function(t){var n=a.find("a.blankLink").attr("href");try{(n.indexOf("http")>-1||n.indexOf("https")>-1)&&window.open(n)}catch(e){}})}),x.hover(function(){$("#J_minBarPlugin").stop(!0,!0).fadeIn(300),c()},function(){$("#J_minBarPlugin").stop(!0,!0).hide()}),_.on("mouseenter",function(t){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"140px",height:"164px",padding:"5px",top:"-40px",opacity:1},300)}).on("mouseleave",function(t){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),C.on("mouseenter",function(t){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"160px",height:"250px",top:"-80px",opacity:1},300)}).on("mouseleave",function(t){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),J.on("click",function(t){$("body,html").stop(!0,!0).animate({scrollTop:0},300)}),T.on("click",function(t){t.preventDefault(),E.fadeOut(300),clearTimeout(M),U?q||(q=!0,n(G)):(U=!0,n(R))}),N.hover(function(){E.stop(!0,!0).fadeIn(300),clearTimeout(M),U?q||(q=!0,n(G)):(U=!0,n(R))},function(){E.stop(!0,!0).fadeOut(300),clearTimeout(M),U?q||(q=!0,n(G)):(U=!0,n(R))}),L.on("click",function(t){E.fadeOut(300),clearTimeout(M),U?q||(q=!0,n(G)):(U=!0,n(R))}),$(document).on("click",".JQ_minBarDelete",function(t){t.preventDefault();var a=$(this).attr("data-id"),n=$(this).parents("li");$.ajax({url:cdnConfig.cartApiPath+"/delete/"+a,dataType:"jsonp",success:function(t){"succ"==t.status?(n.addClass("delItem"),n.fadeOut(300,function(){$(".delItem").remove(),d(),f("#J_minBarPlugin")})):(d(),f("#J_minBarPlugin"))}})})}function n(t){setTimeout(function(){E.fadeIn(200),e(5e3)},t)}function e(t){t=isNaN(t)?5e3:t,M=setTimeout(function(){E.fadeOut(200),U?q||(q=!0,n(G)):(U=!0,n(R))},t)}function i(t){isNaN(t)?t=$(window).innerWidth():t,j>t?(l(),r(),x.on("mouseenter",function(t){t.stopPropagation(),o(),s()}),N.on("mouseenter",function(t){t.stopPropagation(),o(),s()}),Q.on("mouseenter",function(t){t.stopPropagation(),o(),s()}),J.on("mouseenter",function(t){t.stopPropagation(),o(),s()}),B.on("mouseleave",function(t){t.stopPropagation(),t.preventDefault(),r(),l()})):(s(),o())}function o(){I.stop(!0,!0).delay(300).animate({right:"0px"},300)}function r(){I.stop(!0,!0).delay(300).animate({right:"-40px"},300)}function l(){C.stop(!0,!0).animate({right:"-40px"}),_.stop(!0,!0).animate({right:"-40px"}),k.stop(!0,!0).animate({right:"-40px"})}function s(){C.stop(!0,!0).delay(300).animate({right:"0px"}),_.stop(!0,!0).delay(300).animate({right:"0px"}),k.stop(!0,!0).delay(300).animate({right:"0px"})}function c(){$.ajax({url:cdnConfig.apiPath+"/cart/minilist",dataType:"jsonp",success:function(t){var a="";if("200"==t.code){var n=t.data.list;if(n.length>0)for(var e=0;e<n.length;e++)a+="<li>",a+='<div class="plugin-cart-list-img">',a+='<a href="'+n[e].link+'" target="_blank">',a+='<img src="'+n[e].src+'" width="90" height="60" alt="'+n[e].title+'"/>',a+="</a>",a+="</div>",a+='<div class="plugin-cart-list-title">',a+='<a href="'+n[e].link+'" target="_blank" title="'+n[e].title+'">'+n[e].title+"</a>",a+="</div>",a+='<div class="plugin-cart-list-info">',a+='<p class="list-price">&yen; <span class="JQ_minCartItemPrice">'+n[e].price+"</span></p>",a+='<p class="list-num">x <span class="JQ_minCartItemNum">'+n[e].num+"</span></p>",a+='<input type="hidden" class="JQ_minCartItemTotal" value="'+n[e].price*n[e].num+'" />',a+="</div>",a+='<a class="cart-list-delete-btn JQ_minBarDelete" data-id="'+n[e].cart_id+'" href="javascript:void(0);" target="_blank">x</a>',a+="</li>",g(a,"no")}else a="<li>您的购物车空空的~</li>",g(a,"yes");d(),f("#J_minBarPlugin")},error:function(t){}})}function d(){h(".JQ_minCartItemTotal","#J_minBarCartTotal"),m(".JQ_minCartItemNum","#J_minBarCartNum"),u("#J_minBarBtn","#J_minBarCartNum")}function p(t,a){$(t).html(a)}function u(t,a){var n="http://cart.kinhom.com/list.html",e=$(a),i=$(t);parseInt(e.html())>0?i.removeClass("btn-gray").addClass("btn-orange").attr("href",n):i.removeClass("btn-orange").addClass("btn-gray").attr("href","javascript:void(0);")}function m(t,a){var n=$(a),e=0;if($(t).length>0)$(t).each(function(){e+=parseInt($(this).html())});else{var i="<li>您的购物车空空的~</li>";g(i,"yes"),u("#J_minBarBtn","#J_minBarCartNum")}n.html(e),p("#J_cartNum",e)}function h(t,a){var n=$(a),e=0;$(t).length>0?($(t).each(function(){e+=parseInt($(this).val())}),n.html(e)):n.html(0)}function f(t){var a=$(t),n=a.innerHeight();a.css({top:"50%","margin-top":"-"+parseInt(n/2)+"px"})}function g(t,a){switch(a){case"yes":$("#J_pluginCart").addClass("plugin-cart-empty").removeClass("plugin-cart-list").html(t);break;case"no":$("#J_pluginCart").removeClass("plugin-cart-empty").addClass("plugin-cart-list").html(t)}}function v(){$.ajax({url:cdnConfig.apiPath+"/cart/statistics",dataType:"jsonp",success:function(t){"succ"==t.status?p("#J_cartNum",t.data.num):p("#J_cartNum",0)},error:function(t){}})}var b=t.mainCell||"#J_minBar",A=t.tpl||function(){},y=t.tplName||"comment/tplMinBar",w=t.data||{};$("body").append(A(y,w));var B=b.indexOf("#")>-1?$(b):$("#"+b),J=B.find(".min-bar-gtop"),_=B.find(".min-wechat"),C=B.find(".min-phone"),k=B.find(".min-bar-feedback"),x=B.find(".min-cart"),Q=B.find(".min-bar-qq"),N=B.find(".min-bar-online"),I=$(".min-bar-mark"),E=$(".min-bar-online-pop"),T=$(".pop-close"),L=$(".pop-chat"),j=1280,D=B.find(".min-text"),U=!1,q=!1,W="30000",R="180000",G="180000";a();var M}n.exports=e});