define("libpage.0.0/club-member-privileges-mine",["lib/template/tempcomment","lib/components/minBar/1.0.1/minBar"],function(a,t,i){var n=a("../../template/tempcomment"),e=a("../../components/minBar/1.0.1/minBar");document.getElementById("J_clubNav").innerHTML=document.getElementById("J_templateClubNav").innerHTML,e({mainCell:"#J_minBar",pathConfig:cdnConfig,tpl:n,tplName:"tplMinBar",data:_globalConfig.minBar.data})}),!function(){function a(a,t){return(/string|function/.test(typeof t)?o:l)(a,t)}function t(a,i){return"string"!=typeof a&&(i=typeof a,"number"===i?a+="":a="function"===i?t(a.call(a)):""),a}function i(a){return d[a]}function n(a){return t(a).replace(/&(?![\w#]+;)|[<>"']/g,i)}function e(a,t){if(m(a))for(var i=0,n=a.length;n>i;i++)t.call(a,a[i],i,a);else for(i in a)t.call(a,a[i],i)}function s(a,t){var i=/(\/)[^/]+\1\.\.\1/,n=("./"+a).replace(/[^/]+$/,""),e=n+t;for(e=e.replace(/\/\.\//g,"/");e.match(i);)e=e.replace(i,"/");return e}function l(t,i){var n=a.get(t)||c({filename:t,name:"Render Error",message:"Template not found"});return i?n(i):n}function o(a,t){if("string"==typeof t){var i=t;t=function(){return new p(i)}}var n=r[a]=function(i){try{return new t(i,a)+""}catch(n){return c(n)()}};return n.prototype=t.prototype=u,n.toString=function(){return t+""},n}function c(a){var t="{Template Error}",i=a.stack||"";if(i)i=i.split("\n").slice(0,2).join("\n");else for(var n in a)i+="<"+n+">\n"+a[n]+"\n\n";return function(){return"object"==typeof console&&console.error(t+"\n\n"+i),t}}var r=a.cache={},p=this.String,d={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},u=a.utils={$helpers:{},$include:function(a,t,i){return a=s(i,a),l(a,t)},$string:t,$escape:n,$each:e},f=a.helpers=u.$helpers;a.get=function(a){return r[a.replace(/^\.\//,"")]},a.helper=function(a,t){f[a]=t},"function"==typeof define?define("lib/template/tempcomment",[],function(t,i,n){return a}):"undefined"!=typeof exports?module.exports=a:this.template=a,a("tplAddressForm",function(a,t){"use strict";var i=this,n=(i.$helpers,i.$escape),e=a.actionURL,s=a.addressID,l=a.userName,o=a.address,c=a.telephone,r=a.mobilephone,d=a.defaultAdd,m="";return m+='<form id="J_addressForm" action="',m+=n(e),m+='" method="post"> <input type="hidden" name="addressID" value="',m+=n(s),m+='"> <table id="J_add" class="person-address-add-table"> <tbody class="person-address"> <tr class="item"> <th class="address-add-head">收货人：</th> <td> <input id="J_userName" class="person-address-add-input" name="userName" value="',m+=n(l),m+='" /> <span class="fc-f60">*</span> </td> </tr> <tr class="item"> <th class="address-add-head">详细地址：</th> <td id="J_selectAddress"></td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <p> <input id="J_address" class="person-address-add-input detailed-address-input" name="address" placeholder="具体地址" value="',m+=n(o),m+='" /> <span class="fc-f60">*</span> </p> <p> <label class="person-address-add-tip">&nbsp;&nbsp;&nbsp;(不需要重复填写省/市/区)</label> </p> </td> </tr> <tr class="item"> <th class="address-add-head">固定电话：</th> <td> <input id="J_tel" class="person-address-add-input" name="tel" value="',m+=n(c),m+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（示例：020-88888888-999）</label> </td> </tr> <tr class="item"> <th class="address-add-head">手机：</th> <td> <input id="J_phone" class="person-address-add-input" name="phone" value="',m+=n(r),m+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（手机或固话必填一项）</label> </td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <div class="defult-address-choose"> ',m+="1"==d?' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-checked"></a> ':' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-normal"></a> ',m+=' <span class="address-font-gray">设为默认地址</span> <input type="hidden" name="setDefault" value="',m+=n(d),m+='" /> </div> </td> </tr> </tbody> </table> </form>',new p(m)}),a("tplBottomAd",function(a,t){"use strict";var i=this,n=(i.$helpers,a.link),e=i.$escape,s=a.linkURL,l=a.title,o=a.imgURL,c="";return c+='<div class="full-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=n&&(c+=e(n)),""!=s&&(c+=e(s)),c+='" target="_blank" title="',c+=e(l),c+='" style=" display:block; width:100%;min-height: 80px;background:url(',c+=e(o),c+=') center top no-repeat; "> <img src="',c+=e(o),c+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="full-ad-close" id="J_itemBottomAdClose"><span></span></a> </div> </div>',new p(c)}),a("tplEditPassForm",function(a,t){"use strict";var i=this,n=(i.$helpers,i.$escape),e=a.actionURL,s="";return s+='<form id="J_editPassForm" action="',s+=n(e),s+='" method="post"> <div class="fc-8c8">为了您的账户安全，请定期更换登录密码，并确保登录密码设置与提现密码不同。</div> <input type="hidden" name="form" value="form"> <div class="a-edit-pass-tr"> <p id="J_oldPass" class="edit-input-wrap"> <input type="password" name="old_passwd" placeholder="原密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_newPass" class="edit-input-wrap"> <input type="password" name="new_passwd" placeholder="输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_confirmNewPass" class="edit-input-wrap"> <input type="password" name="confirmNewPass" placeholder="再次输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> </form>',new p(s)}),a("tplFloatNav",'<div id="J_floatNav" class="float-nav"> <a href="http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=201143&jid=2104161973" class="float-nav-char-wrap JQ_floatNavNormal" target="_blank"> <span class="floag-online-chat">在线客服</span> <i class="icon-float-chat normal-icon"></i> </a> <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4006538038&aty=0&a=0&curl=&ty=1" class="float-nav-qq JQ_floatNavNormal" target="_blank"> <span>QQ客服</span> <i class="icon-float-qq normal-icon"></i> </a> <a href="http://cart.kinhom.com/list.html" class="float-nav-cart JQ_floatNavNormal" target="_blank"> <span>购物车</span> <i class="icon-float-cart normal-icon"></i> <i class="icon-cart-num num-icon">0</i> </a> <a href="javascript:void(0);" class="float-nav-wechat JQ_floatNavWechat"> <span> <img src="http://misc.jjcdn.com/p/images/float_wechat.png" width="40" height="40" /> </span> <i class="icon-float-wechat normal-icon"></i> </a> <a href="http://www.wenjuan.com/s/qU36f2/" target="_blank" class="float-nav-feedback JQ_floatNavNormal"> <span>意见反馈</span> <i class="icon-float-feedback normal-icon"></i> </a> <a id="J_floatGoTop" href="javascript:void(0);" class="float-nav-top JQ_floatNavNormal"> <span>返回顶部</span> <i class="icon-float-top normal-icon"></i> </a> </div>'),a("tplLoginDialog",'<div class="login-dialog"> <div class="login-dialog-form"> <form action="javascript:void(0);" method="post"> <p class="login-dialog-form-tr" id="J_loginUserName"> <label>用户名：</label> <input type="text" name="loginUserName" placeholder="输入用户名/邮箱/手机"> </p> <p class="login-dialog-form-tip"></p> <p class="login-dialog-form-tr" id="J_loginPassword"> <label>密&nbsp;&nbsp;&nbsp;码：</label> <input type="password" name="loginPassword" placeholder="输入密码"> </p> <p class="login-dialog-form-tip"></p> </form> </div> </div> '),a("tplMinBar",function(a,t){"use strict";var i=this,n=(i.$helpers,i.$escape),e=a.live800,s=a.cdnPath,l=a.wapQQ,o=a.cart,c=a.mobile,r=a.wechat,d=a.feedback,m=a.gotop,u="";return u+=' <section id="J_minBar" class="min-bar"> <div class="min-bar-tabs"> <div class="min-bar-tab min-bar-online"> <div class="min-bar-online-icon"> <a href="',u+=n(e.clientLink),u+='" class="blankLink JQ_minBarOnline" target="_blank"> <img src="',u+=n(s),u+=n(e.iconPath),u+='" width="',u+=n(e.iconWidth),u+='" height="',u+=n(e.iconHeight),u+='" alt="',u+=n(e.iconText),u+='"/> <label class="min-bar-chat-num">',u+=n(e.chatNum),u+='</label> </a> <span class="min-bar-online-pop"> <span class="pop-close">&nbsp;</span> <a href="',u+=n(e.clientLink),u+='" class="pop-chat" target="_blank">&nbsp;</a> </span> </div> </div> <div class="min-bar-tab min-bar-qq min-text"> <div class="min-bar-qq-icon"> <a href="',u+=n(l.clientLink),u+='" class="blankLink" target="_blank"> <img src="',u+=n(s),u+=n(l.iconPath),u+='" width="',u+=n(l.iconWidth),u+='" height="',u+=n(l.iconHeight),u+='" alt="',u+=n(l.iconText),u+='"/> </a> <span class="min-bar-qq-text text">',u+=n(l.iconText),u+='</span> </div> </div> <div class="min-bar-tab min-bar-cart min-cart"> <div class="min-bar-cart-icon"> <a href="',u+=n(o.clientLink),u+='" class="icon-float-cart"> <span id="J_cartNum" class="min-bar-cart-num">',u+=n(o.chatNum),u+='</span> </a> </div> <div id="J_minBarPlugin" class="min-bar-plugin"> <div class="bar-plugin-cart"> <ul id="J_pluginCart"> </ul> <div class="plugin-cart-info"> <p class="cart-info-price"> <span class="cart-info-num"> 共 <label id="J_minBarCartNum">0</label> 件商品 </span> <span class="cart-info-total"> 合计: <small>&yen;</small> <label id="J_minBarCartTotal">0</label> </span> </p> <p class="cart-info-shipping">(不含运费)</p> <p class="cart-info-btn"> <a href="javascript:void(0);" id="J_minBarBtn" class="btn-gray" target="_blank">查看购物车</a> </p> </div> </div> </div> </div> <div class="min-bar-tab min-bar-phone min-phone"> <div class="min-bar-phone-icon"> <a href="',u+=n(c.clientLink),u+='" class="icon-float-phone">&nbsp;</a> <span class="min-bar-phone-img phone"> <img src="',u+=n(s),u+=n(c.iconPath),u+='" width="',u+=n(c.iconWidth),u+='" height="',u+=n(c.iconHeight),u+='" alt="',u+=n(c.iconText),u+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-wechat min-wechat"> <div class="min-bar-wechat-icon"> <a href="',u+=n(r.clientLink),u+='" class="icon-float-wechat">&nbsp;</a> <span class="min-bar-wechat-img wechat"> <img src="',u+=n(s),u+=n(r.iconPath),u+='" width="',u+=n(r.iconWidth),u+='" height="',u+=n(r.iconHeight),u+='" alt="',u+=n(r.iconText),u+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-feedback min-text"> <div class="min-bar-feedback-icon"> <a href="',u+=n(d.clientLink),u+='" class="icon-float-feedback blankLink" target="_blank">&nbsp;</a> <span class="min-bar-feedback-text text">',u+=n(d.iconText),u+='</span> </div> </div> <div class="min-bar-tab min-bar-gtop min-text"> <div class="min-bar-gtop-icon" id="J_minBarGoTop"> <a href="',u+=n(m.clientLink),u+='" class="icon-float-top">&nbsp;</a> <span class="min-bar-gtop-text text">',u+=n(m.iconText),u+='</span> </div> </div> </div> </section> <section class="min-bar-mark"></section> ',new p(u)}),a("tplSelectAddress",function(a,t){"use strict";var i=this,n=(i.$helpers,a.valCity),e=i.$escape,s=a.textPro,l=a.valPro,o=a.textCity,c=a.valArea,r=a.textArea,d="";return d+='<div id="J_selectProvience" class="select-gray fl"> <i class="select-corner icon-gray-left"></i> ',""==n?d+=' <label class="JQ_option select-option w90" data-value="0">请选择省</label> ':(d+=' <label class="JQ_option select-option w90" data-value="0">',d+=e(s),d+="</label> "),d+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_proList"></ul> <input type="hidden" name="valProvince" value="',d+=e(l),d+='" /> </div> <div class="select-gray fl JQ_addressCity"> <i class="select-corner icon-gray-left"></i> ',""==n?d+=' <label class="JQ_option select-option w90" data-value="0">请选择市</label> ':(d+=' <label class="JQ_option select-option w90" data-value="0">',d+=e(o),d+="</label> "),d+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_cityList"></ul> <input type="hidden" name="valCity" value="',d+=e(n),d+='" /> </div> <div class="select-gray fl JQ_addressArea"> <i class="select-corner icon-gray-left"></i> ',""==c?d+=' <label class="JQ_option select-option w90" data-value="0">请选择区</label> ':(d+=' <label class="JQ_option select-option w90" data-value="0">',d+=e(r),d+="</label> "),d+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_areaList"></ul> <input type="hidden" name="valArea" value="',d+=e(c),d+='" /> </div> ',new p(d)}),a("tplTopAd",function(a,t){"use strict";var i=this,n=(i.$helpers,a.link),e=i.$escape,s=a.linkURL,l=a.title,o=a.imgURL,c="";return c+='<div class="top-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=n&&(c+=e(n)),""!=s&&(c+=e(s)),c+='" target="_blank" title="',c+=e(l),c+='" style=" display:block; width:100%; min-height: 80px; background:url(',c+=e(o),c+=') center top no-repeat; "> <img src="',c+=e(o),c+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="index-top-ad-close" id="J_indexTopAdClose"> <span></span> </a> </div> </div>',new p(c)})}(),define("lib/components/minBar/1.0.1/minBar",[],function(a,t,i){function n(a){function t(){i(U),g(),h("#J_minBarPlugin"),e($(window).innerWidth()),$(window).resize(function(){e($(window).innerWidth())}),q.each(function(a){var t=$(this);t.on("mouseover",function(a){t.find("span.text").stop(!0,!0).delay(300).animate({right:"40px",opacity:1},300)}).on("mouseleave",function(a){t.find("span.text").stop(!0,!0).animate({right:"-80px",opacity:.1},300)}).on("click",function(a){var i=t.find("a.blankLink").attr("href");try{(i.indexOf("http")>-1||i.indexOf("https")>-1)&&window.open(i)}catch(n){}})}),C.hover(function(){$("#J_minBarPlugin").stop(!0,!0).fadeIn(300),r()},function(){$("#J_minBarPlugin").stop(!0,!0).hide()}),x.on("mouseenter",function(a){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"140px",height:"164px",padding:"5px",top:"-40px",opacity:1},300)}).on("mouseleave",function(a){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),B.on("mouseenter",function(a){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"160px",height:"250px",top:"-80px",opacity:1},300)}).on("mouseleave",function(a){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),k.on("click",function(a){$("body,html").stop(!0,!0).animate({scrollTop:0},300)}),L.on("click",function(a){a.preventDefault(),j.fadeOut(300),clearTimeout(R),D?O||(O=!0,i(H)):(D=!0,i(W))}),Q.hover(function(){j.stop(!0,!0).fadeIn(300),clearTimeout(R),D?O||(O=!0,i(H)):(D=!0,i(W))},function(){j.stop(!0,!0).fadeOut(300),clearTimeout(R),D?O||(O=!0,i(H)):(D=!0,i(W))}),I.on("click",function(a){j.fadeOut(300),clearTimeout(R),D?O||(O=!0,i(H)):(D=!0,i(W))}),$(document).on("click",".JQ_minBarDelete",function(a){a.preventDefault();var t=$(this).attr("data-id"),i=$(this).parents("li");$.ajax({url:cdnConfig.cartApiPath+"/delete/"+t,dataType:"jsonp",success:function(a){"succ"==a.status?(i.addClass("delItem"),i.fadeOut(300,function(){$(".delItem").remove(),p(),h("#J_minBarPlugin")})):(p(),h("#J_minBarPlugin"))}})})}function i(a){setTimeout(function(){j.fadeIn(200),n(5e3)},a)}function n(a){a=isNaN(a)?5e3:a,R=setTimeout(function(){j.fadeOut(200),D?O||(O=!0,i(H)):(D=!0,i(W))},a)}function e(a){isNaN(a)?a=$(window).innerWidth():a,A>a?(o(),l(),C.on("mouseenter",function(a){a.stopPropagation(),s(),c()}),Q.on("mouseenter",function(a){a.stopPropagation(),s(),c()}),P.on("mouseenter",function(a){a.stopPropagation(),s(),c()}),k.on("mouseenter",function(a){a.stopPropagation(),s(),c()}),w.on("mouseleave",function(a){a.stopPropagation(),a.preventDefault(),l(),o()})):(c(),s())}function s(){T.stop(!0,!0).delay(300).animate({right:"0px"},300)}function l(){T.stop(!0,!0).delay(300).animate({right:"-40px"},300)}function o(){B.stop(!0,!0).animate({right:"-40px"}),x.stop(!0,!0).animate({right:"-40px"}),N.stop(!0,!0).animate({right:"-40px"})}function c(){B.stop(!0,!0).delay(300).animate({right:"0px"}),x.stop(!0,!0).delay(300).animate({right:"0px"}),N.stop(!0,!0).delay(300).animate({right:"0px"})}function r(){$.ajax({url:cdnConfig.apiPath+"/cart/minilist",dataType:"jsonp",success:function(a){var t="";if("200"==a.code){var i=a.data.list;if(i.length>0)for(var n=0;n<i.length;n++)t+="<li>",t+='<div class="plugin-cart-list-img">',t+='<a href="'+i[n].link+'" target="_blank">',t+='<img src="'+i[n].src+'" width="90" height="60" alt="'+i[n].title+'"/>',t+="</a>",t+="</div>",t+='<div class="plugin-cart-list-title">',t+='<a href="'+i[n].link+'" target="_blank" title="'+i[n].title+'">'+i[n].title+"</a>",t+="</div>",t+='<div class="plugin-cart-list-info">',t+='<p class="list-price">&yen; <span class="JQ_minCartItemPrice">'+i[n].price+"</span></p>",t+='<p class="list-num">x <span class="JQ_minCartItemNum">'+i[n].num+"</span></p>",t+='<input type="hidden" class="JQ_minCartItemTotal" value="'+i[n].price*i[n].num+'" />',t+="</div>",t+='<a class="cart-list-delete-btn JQ_minBarDelete" data-id="'+i[n].cart_id+'" href="javascript:void(0);" target="_blank">x</a>',t+="</li>",v(t,"no")}else t="<li>您的购物车空空的~</li>",v(t,"yes");p(),h("#J_minBarPlugin")},error:function(a){}})}function p(){f(".JQ_minCartItemTotal","#J_minBarCartTotal"),u(".JQ_minCartItemNum","#J_minBarCartNum"),m("#J_minBarBtn","#J_minBarCartNum")}function d(a,t){$(a).html(t)}function m(a,t){var i="http://cart.kinhom.com/list.html",n=$(t),e=$(a);parseInt(n.html())>0?e.removeClass("btn-gray").addClass("btn-orange").attr("href",i):e.removeClass("btn-orange").addClass("btn-gray").attr("href","javascript:void(0);")}function u(a,t){var i=$(t),n=0;if($(a).length>0)$(a).each(function(){n+=parseInt($(this).html())});else{var e="<li>您的购物车空空的~</li>";v(e,"yes"),m("#J_minBarBtn","#J_minBarCartNum")}i.html(n),d("#J_cartNum",n)}function f(a,t){var i=$(t),n=0;$(a).length>0?($(a).each(function(){n+=parseInt($(this).val())}),i.html(n)):i.html(0)}function h(a){var t=$(a),i=t.innerHeight();t.css({top:"50%","margin-top":"-"+parseInt(i/2)+"px"})}function v(a,t){switch(t){case"yes":$("#J_pluginCart").addClass("plugin-cart-empty").removeClass("plugin-cart-list").html(a);break;case"no":$("#J_pluginCart").removeClass("plugin-cart-empty").addClass("plugin-cart-list").html(a)}}function g(){$.ajax({url:cdnConfig.apiPath+"/cart/statistics",dataType:"jsonp",success:function(a){"succ"==a.status?d("#J_cartNum",a.data.num):d("#J_cartNum",0)},error:function(a){}})}var b=a.mainCell||"#J_minBar",_=a.tpl||function(){},y=a.tplName||"comment/tplMinBar",J=a.data||{};$("body").append(_(y,J));var w=b.indexOf("#")>-1?$(b):$("#"+b),k=w.find(".min-bar-gtop"),x=w.find(".min-wechat"),B=w.find(".min-phone"),N=w.find(".min-bar-feedback"),C=w.find(".min-cart"),P=w.find(".min-bar-qq"),Q=w.find(".min-bar-online"),T=$(".min-bar-mark"),j=$(".min-bar-online-pop"),L=$(".pop-close"),I=$(".pop-chat"),A=1280,q=w.find(".min-text"),D=!1,O=!1,U="30000",W="180000",H="180000";t();var R}i.exports=n});