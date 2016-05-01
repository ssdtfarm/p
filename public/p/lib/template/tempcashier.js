!function(){function a(a,b){return(/string|function/.test(typeof b)?h:g)(a,b)}function b(a,c){return"string"!=typeof a&&(c=typeof a,"number"===c?a+="":a="function"===c?b(a.call(a)):""),a}function c(a){return l[a]}function d(a){return b(a).replace(/&(?![\w#]+;)|[<>"']/g,c)}function e(a,b){if(m(a))for(var c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)}function f(a,b){var c=/(\/)[^/]+\1\.\.\1/,d=("./"+a).replace(/[^/]+$/,""),e=d+b;for(e=e.replace(/\/\.\//g,"/");e.match(c);)e=e.replace(c,"/");return e}function g(b,c){var d=a.get(b)||i({filename:b,name:"Render Error",message:"Template not found"});return c?d(c):d}function h(a,b){if("string"==typeof b){var c=b;b=function(){return new k(c)}}var d=j[a]=function(c){try{return new b(c,a)+""}catch(d){return i(d)()}};return d.prototype=b.prototype=n,d.toString=function(){return b+""},d}function i(a){var b="{Template Error}",c=a.stack||"";if(c)c=c.split("\n").slice(0,2).join("\n");else for(var d in a)c+="<"+d+">\n"+a[d]+"\n\n";return function(){return"object"==typeof console&&console.error(b+"\n\n"+c),b}}var j=a.cache={},k=this.String,l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},n=a.utils={$helpers:{},$include:function(a,b,c){return a=f(c,a),g(a,b)},$string:b,$escape:d,$each:e},o=a.helpers=n.$helpers;a.get=function(a){return j[a.replace(/^\.\//,"")]},a.helper=function(a,b){o[a]=b},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:this.template=a,a("tplAddressForm",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.actionURL,e=a.addressID,f=a.userName,g=a.address,h=a.telephone,i=a.mobilephone,j=a.defaultAdd,l="";return l+='<form id="J_addressForm" action="',l+=c(d),l+='" method="post"> <input type="hidden" name="addressID" value="',l+=c(e),l+='"> <table id="J_add" class="person-address-add-table"> <tbody class="person-address"> <tr class="item"> <th class="address-add-head">收货人：</th> <td> <input id="J_userName" class="person-address-add-input" name="userName" value="',l+=c(f),l+='" /> <span class="fc-f60">*</span> </td> </tr> <tr class="item"> <th class="address-add-head">详细地址：</th> <td id="J_selectAddress"></td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <p> <input id="J_address" class="person-address-add-input detailed-address-input" name="address" placeholder="具体地址" value="',l+=c(g),l+='" /> <span class="fc-f60">*</span> </p> <p> <label class="person-address-add-tip">&nbsp;&nbsp;&nbsp;(不需要重复填写省/市/区)</label> </p> </td> </tr> <tr class="item"> <th class="address-add-head">固定电话：</th> <td> <input id="J_tel" class="person-address-add-input" name="tel" value="',l+=c(h),l+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（示例：020-88888888-999）</label> </td> </tr> <tr class="item"> <th class="address-add-head">手机：</th> <td> <input id="J_phone" class="person-address-add-input" name="phone" value="',l+=c(i),l+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（手机或固话必填一项）</label> </td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <div class="defult-address-choose"> ',l+="1"==j?' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-checked"></a> ':' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-normal"></a> ',l+=' <span class="address-font-gray">设为默认地址</span> <input type="hidden" name="setDefault" value="',l+=c(j),l+='" /> </div> </td> </tr> </tbody> </table> </form>',new k(l)}),a("tplAddressSelector",'<div class="address-select"> <div class="hd"> <a href="javascript:;" class="address-title active">所在省份</a> <a href="javascript:;" class="address-title">所在城市</a> <a href="javascript:;" class="address-title">所在区</a> </div> <div class="bd"> <div class="con pro-con active"> <ul class="select-list J_select_province"></ul> </div> <div class="con city-con"> <ul class="select-list J_select_city"></ul> </div> <div class="con area-con"> <ul class="select-list J_select_area"></ul> </div> </div> </div>'),a("tplEditPassForm",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.actionURL,e="";return e+='<form id="J_editPassForm" action="',e+=c(d),e+='" method="post"> <div class="fc-8c8">为了您的账户安全，请定期更换登录密码，并确保登录密码设置与提现密码不同。</div> <input type="hidden" name="form" value="form"> <div class="a-edit-pass-tr"> <p id="J_oldPass" class="edit-input-wrap"> <input type="password" name="old_passwd" placeholder="原密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_newPass" class="edit-input-wrap"> <input type="password" name="new_passwd" placeholder="输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_confirmNewPass" class="edit-input-wrap"> <input type="password" name="confirmNewPass" placeholder="再次输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> </form>',new k(e)}),a("tplFloatNav",'<div id="J_floatNav" class="float-nav"> <a href="http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=201143&jid=2104161973" class="float-nav-char-wrap JQ_floatNavNormal" target="_blank"> <span class="floag-online-chat">在线客服</span> <i class="icon-float-chat normal-icon"></i> </a> <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4006538038&aty=0&a=0&curl=&ty=1" class="float-nav-qq JQ_floatNavNormal" target="_blank"> <span>QQ客服</span> <i class="icon-float-qq normal-icon"></i> </a> <a href="http://cart.kinhom.com/list.html" class="float-nav-cart JQ_floatNavNormal" target="_blank"> <span>购物车</span> <i class="icon-float-cart normal-icon"></i> <i class="icon-cart-num num-icon">0</i> </a> <a href="javascript:void(0);" class="float-nav-wechat JQ_floatNavWechat"> <span> <img src="http://misc.jjcdn.com/p/images/float_wechat.png" width="40" height="40" /> </span> <i class="icon-float-wechat normal-icon"></i> </a> <a href="http://www.wenjuan.com/s/qU36f2/" target="_blank" class="float-nav-feedback JQ_floatNavNormal"> <span>意见反馈</span> <i class="icon-float-feedback normal-icon"></i> </a> <a id="J_floatGoTop" href="javascript:void(0);" class="float-nav-top JQ_floatNavNormal"> <span>返回顶部</span> <i class="icon-float-top normal-icon"></i> </a> </div>'),a("tplLoginDialog",'<div class="login-dialog"> <div class="login-dialog-form"> <form action="javascript:void(0);" method="post"> <p class="login-dialog-form-tr" id="J_loginUserName"> <input type="text" name="loginUserName" placeholder="输入用户名/邮箱/手机" /> </p> <p class="login-dialog-form-tip"></p> <p class="login-dialog-form-tr" id="J_loginPassword"> <input type="password" name="loginPassword" placeholder="输入密码" /> </p> <p class="login-dialog-form-tip"></p> </form> </div> </div> '),a("tplMinBar",' <section id="J_minBar" class="min-bar"> <div class="min-bar-tabs"> <div class="min-bar-tab min-bar-online"> <div class="min-bar-online-icon"> <a href="http://chat32.live800.com/live800/chatClient/chatbox.jsp?companyID=542108&configID=76897&jid=4159371206" class="blankLink JQ_minBarOnline" target="_blank"> <img src="http://misc.jjcdn.com/p/images/icon-float-nav-chat.gif" width="40" height="40" alt="在线客服"/> <label class="min-bar-chat-num">1</label> </a>  <span class="min-bar-online-pop"> <span class="pop-close">&nbsp;</span> <a href="http://chat32.live800.com/live800/chatClient/chatbox.jsp?companyID=542108&configID=76897&jid=4159371206" class="pop-chat" target="_blank">&nbsp;</a> </span> </div> </div> <div class="min-bar-tab min-bar-qq min-text"> <div class="min-bar-qq-icon"> <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4006538038&aty=0&a=0&curl=&ty=1" class="blankLink" target="_blank"> <img src="http://misc.jjcdn.com/p/images/float_min_bar_qq.png" alt="qq客服"/> </a> <span class="min-bar-qq-text text">QQ客服</span> </div> </div> <div class="min-bar-tab min-bar-cart min-cart"> <div class="min-bar-cart-icon"> <a href="javascript:void(0);" class="icon-float-cart"> <span id="J_cartNum" class="min-bar-cart-num">0</span> </a> </div> <div id="J_minBarPlugin" class="min-bar-plugin"> <div class="bar-plugin-cart"> <ul id="J_pluginCart"> </ul> <div class="plugin-cart-info"> <p class="cart-info-price"> <span class="cart-info-num"> 共 <label id="J_minBarCartNum">0</label> 件商品 </span> <span class="cart-info-total"> 合计: <small>&yen;</small> <label id="J_minBarCartTotal">0</label> </span> </p> <p class="cart-info-shipping">(不含运费)</p> <p class="cart-info-btn"> <a href="javascript:void(0);" id="J_minBarBtn" class="btn-gray" target="_blank">查看购物车</a> </p> </div> </div> </div> </div> <div class="min-bar-tab min-bar-phone min-phone"> <div class="min-bar-phone-icon"> <a href="javascript:void(0);" class="icon-float-phone">&nbsp;</a> <span class="min-bar-phone-img phone"> <img src="http://misc.jjcdn.com/p/images/float_app.png" width="160" height="250" /> </span> </div> </div> <div class="min-bar-tab min-bar-wechat min-wechat"> <div class="min-bar-wechat-icon"> <a href="javascript:void(0);" class="icon-float-wechat">&nbsp;</a> <span class="min-bar-wechat-img wechat"> <img src="http://misc.jjcdn.com/p/images/float_wechat.png" width="140" height="164" /> </span> </div> </div> <div class="min-bar-tab min-bar-feedback min-text"> <div class="min-bar-feedback-icon"> <a href="http://www.wenjuan.com/s/qU36f2/" class="icon-float-feedback blankLink" target="_blank">&nbsp;</a> <span class="min-bar-feedback-text text">意见反馈</span> </div> </div> <div class="min-bar-tab min-bar-gtop min-text"> <div class="min-bar-gtop-icon" id="J_minBarGoTop"> <a href="javascript:void(0);" class="icon-float-top">&nbsp;</a> <span class="min-bar-gtop-text text">返回顶部</span> </div> </div> </div> </section> <section class="min-bar-mark"></section> '),a("tplMoreBank",'<div class="pay-more-bank"> <div class="hd"> <ul> <li class="on">储蓄卡</li> <li>信用卡</li> </ul> </div> <div class="bd"> <div class="conWrap"> <div class="con on"> <ul class="bank-list clearfix"> <li> <img src="/p/images/banks/1.png" alt=""> </li> <li class="bank-selected"> <img src="/p/images/banks/2.png" alt=""> </li> <li> <img src="/p/images/banks/3.png" alt=""> </li> <li> <img src="/p/images/banks/4.png" alt=""> </li> <li> <img src="/p/images/banks/5.png" alt=""> </li> <li> <img src="/p/images/banks/6.png" alt=""> </li> <li> <img src="/p/images/banks/7.png" alt=""> </li> <li> <img src="/p/images/banks/1.png" alt=""> </li> <li> <img src="/p/images/banks/2.png" alt=""> </li> <li> <img src="/p/images/banks/3.png" alt=""> </li> <li> <img src="/p/images/banks/4.png" alt=""> </li> <li> <img src="/p/images/banks/5.png" alt=""> </li> <li> <img src="/p/images/banks/6.png" alt=""> </li> <li> <img src="/p/images/banks/7.png" alt=""> </li> </ul> <div> <div class="input-wrap"> <strong>更多银行：</strong><input type="text" class="bank-number" value=""><i class="cashier-icon cashier-succ-icon"></i><span class="error-info"><i class="cashier-icon cashier-error-icon"></i>请输入银行卡号</span> </div> <div class="btn-wrap"> <a href="javascript:;" class="pay-btn">去支付</a> <a href="javascript:;" class="cancle-btn">取消</a> </div> </div> </div> <div class="con"> <ul class="bank-list clearfix"> <li> <img src="/p/images/banks/1.png" alt=""> </li> <li> <img src="/p/images/banks/2.png" alt=""> </li> <li> <img src="/p/images/banks/3.png" alt=""> </li> <li> <img src="/p/images/banks/4.png" alt=""> </li> <li> <img src="/p/images/banks/5.png" alt=""> </li> <li> <img src="/p/images/banks/6.png" alt=""> </li> <li> <img src="/p/images/banks/7.png" alt=""> </li> </ul> <div> <div class="input-wrap"> <strong>更多银行：</strong><input type="text" class="bank-number" value=""><i class="cashier-icon cashier-succ-icon"></i><span class="error-info"><i class="cashier-icon cashier-error-icon"></i>请输入银行卡号</span> </div> <div class="btn-wrap"> <a href="javascript:;" class="pay-btn">去支付</a> <a href="javascript:;" class="cancle-btn">取消</a> </div> </div> </div> </div> </div> </div>'),a("tplSelectAddress",function(a){"use strict";var b=this,c=(b.$helpers,a.valCity),d=b.$escape,e=a.textPro,f=a.valPro,g=a.textCity,h=a.valArea,i=a.textArea,j="";return j+='<div id="J_selectProvience" class="select-gray fl"> <i class="select-corner icon-gray-left"></i> ',""==c?j+=' <label class="JQ_option select-option w90" data-value="0">请选择省</label> ':(j+=' <label class="JQ_option select-option w90" data-value="0">',j+=d(e),j+="</label> "),j+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_proList"></ul> <input type="hidden" name="valProvince" value="',j+=d(f),j+='" /> </div> <div class="select-gray fl JQ_addressCity"> <i class="select-corner icon-gray-left"></i> ',""==c?j+=' <label class="JQ_option select-option w90" data-value="0">请选择市</label> ':(j+=' <label class="JQ_option select-option w90" data-value="0">',j+=d(g),j+="</label> "),j+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_cityList"></ul> <input type="hidden" name="valCity" value="',j+=d(c),j+='" /> </div> <div class="select-gray fl JQ_addressArea"> <i class="select-corner icon-gray-left"></i> ',""==h?j+=' <label class="JQ_option select-option w90" data-value="0">请选择区</label> ':(j+=' <label class="JQ_option select-option w90" data-value="0">',j+=d(i),j+="</label> "),j+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_areaList"></ul> <input type="hidden" name="valArea" value="',j+=d(h),j+='" /> </div> ',new k(j)}),a("tplTopAd",function(a){"use strict";var b=this,c=(b.$helpers,a.link),d=b.$escape,e=a.linkURL,f=a.title,g=a.imgURL,h="";return h+='<div class="top-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=c&&(h+=d(c)),""!=e&&(h+=d(e)),h+='" target="_blank" title="',h+=d(f),h+='" style=" display:block; width:100%; min-height: 80px; background:url(',h+=d(g),h+=') center top no-repeat; "> <img src="',h+=d(g),h+='" style="visibility: hidden;" /> </a> <a href="javascript:void(0);" class="index-top-ad-close" id="J_indexTopAdClose"> <span></span> </a> </div> </div>',new k(h)})}();