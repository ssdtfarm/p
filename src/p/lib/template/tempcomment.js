!function() {
    function a(a, t) {
        return (/string|function/.test(typeof t) ? c : l)(a, t);
    }
    function t(a, s) {
        return "string" != typeof a && (s = typeof a, "number" === s ? a += "" : a = "function" === s ? t(a.call(a)) : ""), 
        a;
    }
    function s(a) {
        return p[a];
    }
    function e(a) {
        return t(a).replace(/&(?![\w#]+;)|[<>"']/g, s);
    }
    function i(a, t) {
        if (h(a)) for (var s = 0, e = a.length; e > s; s++) t.call(a, a[s], s, a); else for (s in a) t.call(a, a[s], s);
    }
    function n(a, t) {
        var s = /(\/)[^/]+\1\.\.\1/, e = ("./" + a).replace(/[^/]+$/, ""), i = e + t;
        for (i = i.replace(/\/\.\//g, "/"); i.match(s); ) i = i.replace(s, "/");
        return i;
    }
    function l(t, s) {
        var e = a.get(t) || r({
            filename: t,
            name: "Render Error",
            message: "Template not found"
        });
        return s ? e(s) : e;
    }
    function c(a, t) {
        if ("string" == typeof t) {
            var s = t;
            t = function() {
                return new d(s);
            };
        }
        var e = o[a] = function(s) {
            try {
                return new t(s, a) + "";
            } catch (e) {
                return r(e)();
            }
        };
        return e.prototype = t.prototype = m, e.toString = function() {
            return t + "";
        }, e;
    }
    function r(a) {
        var t = "{Template Error}", s = a.stack || "";
        if (s) s = s.split("\n").slice(0, 2).join("\n"); else for (var e in a) s += "<" + e + ">\n" + a[e] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(t + "\n\n" + s), t;
        };
    }
    var o = a.cache = {}, d = this.String, p = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, h = Array.isArray || function(a) {
        return "[object Array]" === {}.toString.call(a);
    }, m = a.utils = {
        $helpers: {},
        $include: function(a, t, s) {
            return a = n(s, a), l(a, t);
        },
        $string: t,
        $escape: e,
        $each: i
    }, f = a.helpers = m.$helpers;
    a.get = function(a) {
        return o[a.replace(/^\.\//, "")];
    }, a.helper = function(a, t) {
        f[a] = t;
    }, "function" == typeof define ? define(function() {
        return a;
    }) : "undefined" != typeof exports ? module.exports = a : this.template = a, a("tplAddressForm", function(a, t) {
        "use strict";
        var s = this, e = (s.$helpers, s.$escape), i = a.actionURL, n = a.addressID, l = a.userName, c = a.address, r = a.telephone, o = a.mobilephone, p = a.defaultAdd, h = "";
        return h += '<form id="J_addressForm" action="', h += e(i), h += '" method="post"> <input type="hidden" name="addressID" value="', 
        h += e(n), h += '"> <table id="J_add" class="person-address-add-table"> <tbody class="person-address"> <tr class="item"> <th class="address-add-head">收货人：</th> <td> <input id="J_userName" class="person-address-add-input" name="userName" value="', 
        h += e(l), h += '" /> <span class="fc-f60">*</span> </td> </tr> <tr class="item"> <th class="address-add-head">详细地址：</th> <td id="J_selectAddress"></td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <p> <input id="J_address" class="person-address-add-input detailed-address-input" name="address" placeholder="具体地址" value="', 
        h += e(c), h += '" /> <span class="fc-f60">*</span> </p> <p> <label class="person-address-add-tip">&nbsp;&nbsp;&nbsp;(不需要重复填写省/市/区)</label> </p> </td> </tr> <tr class="item"> <th class="address-add-head">固定电话：</th> <td> <input id="J_tel" class="person-address-add-input" name="tel" value="', 
        h += e(r), h += '" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（示例：020-88888888-999）</label> </td> </tr> <tr class="item"> <th class="address-add-head">手机：</th> <td> <input id="J_phone" class="person-address-add-input" name="phone" value="', 
        h += e(o), h += '" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（手机或固话必填一项）</label> </td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <div class="defult-address-choose"> ', 
        h += "1" == p ? ' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-checked"></a> ' : ' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-normal"></a> ', 
        h += ' <span class="address-font-gray">设为默认地址</span> <input type="hidden" name="setDefault" value="', 
        h += e(p), h += '" /> </div> </td> </tr> </tbody> </table> </form>', new d(h);
    }), a("tplBottomAd", function(a, t) {
        "use strict";
        var s = this, e = (s.$helpers, a.link), i = s.$escape, n = a.linkURL, l = a.title, c = a.imgURL, r = "";
        return r += '<div class="full-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="', 
        "" != e && (r += i(e)), "" != n && (r += i(n)), r += '" target="_blank" title="', 
        r += i(l), r += '" style=" display:block; width:100%;min-height: 80px;background:url(', 
        r += i(c), r += ') center top no-repeat; "> <img src="', r += i(c), r += '" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="full-ad-close" id="J_itemBottomAdClose"><span></span></a> </div> </div>', 
        new d(r);
    }), a("tplEditPassForm", function(a, t) {
        "use strict";
        var s = this, e = (s.$helpers, s.$escape), i = a.actionURL, n = "";
        return n += '<form id="J_editPassForm" action="', n += e(i), n += '" method="post"> <div class="fc-8c8">为了您的账户安全，请定期更换登录密码，并确保登录密码设置与提现密码不同。</div> <input type="hidden" name="form" value="form"> <div class="a-edit-pass-tr"> <p id="J_oldPass" class="edit-input-wrap"> <input type="password" name="old_passwd" placeholder="原密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_newPass" class="edit-input-wrap"> <input type="password" name="new_passwd" placeholder="输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_confirmNewPass" class="edit-input-wrap"> <input type="password" name="confirmNewPass" placeholder="再次输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> </form>', 
        new d(n);
    }), a("tplFloatNav", '<div id="J_floatNav" class="float-nav"> <a href="http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=201143&jid=2104161973" class="float-nav-char-wrap JQ_floatNavNormal" target="_blank"> <span class="floag-online-chat">在线客服</span> <i class="icon-float-chat normal-icon"></i> </a> <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4006538038&aty=0&a=0&curl=&ty=1" class="float-nav-qq JQ_floatNavNormal" target="_blank"> <span>QQ客服</span> <i class="icon-float-qq normal-icon"></i> </a> <a href="http://cart.kinhom.com/list.html" class="float-nav-cart JQ_floatNavNormal" target="_blank"> <span>购物车</span> <i class="icon-float-cart normal-icon"></i> <i class="icon-cart-num num-icon">0</i> </a> <a href="javascript:void(0);" class="float-nav-wechat JQ_floatNavWechat"> <span> <img src="http://misc.jjcdn.com/p/images/float_wechat.png" width="40" height="40" /> </span> <i class="icon-float-wechat normal-icon"></i> </a> <a href="http://www.wenjuan.com/s/qU36f2/" target="_blank" class="float-nav-feedback JQ_floatNavNormal"> <span>意见反馈</span> <i class="icon-float-feedback normal-icon"></i> </a> <a id="J_floatGoTop" href="javascript:void(0);" class="float-nav-top JQ_floatNavNormal"> <span>返回顶部</span> <i class="icon-float-top normal-icon"></i> </a> </div>'), 
    a("tplLoginDialog", '<div class="login-dialog"> <div class="login-dialog-form"> <form action="javascript:void(0);" method="post"> <p class="login-dialog-form-tr" id="J_loginUserName"> <label>用户名：</label> <input type="text" name="loginUserName" placeholder="输入用户名/邮箱/手机"> </p> <p class="login-dialog-form-tip"></p> <p class="login-dialog-form-tr" id="J_loginPassword"> <label>密&nbsp;&nbsp;&nbsp;码：</label> <input type="password" name="loginPassword" placeholder="输入密码"> </p> <p class="login-dialog-form-tip"></p> </form> </div> </div> '), 
    a("tplMinBar", function(a, t) {
        "use strict";
        var s = this, e = (s.$helpers, s.$escape), i = a.live800, n = a.cdnPath, l = a.wapQQ, c = a.cart, r = a.mobile, o = a.wechat, p = a.feedback, h = a.gotop, m = "";
        return m += ' <section id="J_minBar" class="min-bar"> <div class="min-bar-tabs"> <div class="min-bar-tab min-bar-online"> <div class="min-bar-online-icon"> <a href="', 
        m += e(i.clientLink), m += '" class="blankLink JQ_minBarOnline" target="_blank"> <img src="', 
        m += e(n), m += e(i.iconPath), m += '" width="', m += e(i.iconWidth), m += '" height="', 
        m += e(i.iconHeight), m += '" alt="', m += e(i.iconText), m += '"/> <label class="min-bar-chat-num">', 
        m += e(i.chatNum), m += '</label> </a> <span class="min-bar-online-pop"> <span class="pop-close">&nbsp;</span> <a href="', 
        m += e(i.clientLink), m += '" class="pop-chat" target="_blank">&nbsp;</a> </span> </div> </div> <div class="min-bar-tab min-bar-qq min-text"> <div class="min-bar-qq-icon"> <a href="', 
        m += e(l.clientLink), m += '" class="blankLink" target="_blank"> <img src="', m += e(n), 
        m += e(l.iconPath), m += '" width="', m += e(l.iconWidth), m += '" height="', m += e(l.iconHeight), 
        m += '" alt="', m += e(l.iconText), m += '"/> </a> <span class="min-bar-qq-text text">', 
        m += e(l.iconText), m += '</span> </div> </div> <div class="min-bar-tab min-bar-cart min-cart"> <div class="min-bar-cart-icon"> <a href="', 
        m += e(c.clientLink), m += '" class="icon-float-cart"> <span id="J_cartNum" class="min-bar-cart-num">', 
        m += e(c.chatNum), m += '</span> </a> </div> <div id="J_minBarPlugin" class="min-bar-plugin"> <div class="bar-plugin-cart"> <ul id="J_pluginCart"> </ul> <div class="plugin-cart-info"> <p class="cart-info-price"> <span class="cart-info-num"> 共 <label id="J_minBarCartNum">0</label> 件商品 </span> <span class="cart-info-total"> 合计: <small>&yen;</small> <label id="J_minBarCartTotal">0</label> </span> </p> <p class="cart-info-shipping">(不含运费)</p> <p class="cart-info-btn"> <a href="javascript:void(0);" id="J_minBarBtn" class="btn-gray" target="_blank">查看购物车</a> </p> </div> </div> </div> </div> <div class="min-bar-tab min-bar-phone min-phone"> <div class="min-bar-phone-icon"> <a href="', 
        m += e(r.clientLink), m += '" class="icon-float-phone">&nbsp;</a> <span class="min-bar-phone-img phone"> <img src="', 
        m += e(n), m += e(r.iconPath), m += '" width="', m += e(r.iconWidth), m += '" height="', 
        m += e(r.iconHeight), m += '" alt="', m += e(r.iconText), m += '" /> </span> </div> </div> <div class="min-bar-tab min-bar-wechat min-wechat"> <div class="min-bar-wechat-icon"> <a href="', 
        m += e(o.clientLink), m += '" class="icon-float-wechat">&nbsp;</a> <span class="min-bar-wechat-img wechat"> <img src="', 
        m += e(n), m += e(o.iconPath), m += '" width="', m += e(o.iconWidth), m += '" height="', 
        m += e(o.iconHeight), m += '" alt="', m += e(o.iconText), m += '" /> </span> </div> </div> <div class="min-bar-tab min-bar-feedback min-text"> <div class="min-bar-feedback-icon"> <a href="', 
        m += e(p.clientLink), m += '" class="icon-float-feedback blankLink" target="_blank">&nbsp;</a> <span class="min-bar-feedback-text text">', 
        m += e(p.iconText), m += '</span> </div> </div> <div class="min-bar-tab min-bar-gtop min-text"> <div class="min-bar-gtop-icon" id="J_minBarGoTop"> <a href="', 
        m += e(h.clientLink), m += '" class="icon-float-top">&nbsp;</a> <span class="min-bar-gtop-text text">', 
        m += e(h.iconText), m += '</span> </div> </div> </div> </section> <section class="min-bar-mark"></section> ', 
        new d(m);
    }), a("tplSelectAddress", function(a, t) {
        "use strict";
        var s = this, e = (s.$helpers, a.valCity), i = s.$escape, n = a.textPro, l = a.valPro, c = a.textCity, r = a.valArea, o = a.textArea, p = "";
        return p += '<div id="J_selectProvience" class="select-gray fl"> <i class="select-corner icon-gray-left"></i> ', 
        "" == e ? p += ' <label class="JQ_option select-option w90" data-value="0">请选择省</label> ' : (p += ' <label class="JQ_option select-option w90" data-value="0">', 
        p += i(n), p += "</label> "), p += ' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_proList"></ul> <input type="hidden" name="valProvince" value="', 
        p += i(l), p += '" /> </div> <div class="select-gray fl JQ_addressCity"> <i class="select-corner icon-gray-left"></i> ', 
        "" == e ? p += ' <label class="JQ_option select-option w90" data-value="0">请选择市</label> ' : (p += ' <label class="JQ_option select-option w90" data-value="0">', 
        p += i(c), p += "</label> "), p += ' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_cityList"></ul> <input type="hidden" name="valCity" value="', 
        p += i(e), p += '" /> </div> <div class="select-gray fl JQ_addressArea"> <i class="select-corner icon-gray-left"></i> ', 
        "" == r ? p += ' <label class="JQ_option select-option w90" data-value="0">请选择区</label> ' : (p += ' <label class="JQ_option select-option w90" data-value="0">', 
        p += i(o), p += "</label> "), p += ' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_areaList"></ul> <input type="hidden" name="valArea" value="', 
        p += i(r), p += '" /> </div> ', new d(p);
    }), a("tplTopAd", function(a, t) {
        "use strict";
        var s = this, e = (s.$helpers, a.link), i = s.$escape, n = a.linkURL, l = a.title, c = a.imgURL, r = "";
        return r += '<div class="top-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="', 
        "" != e && (r += i(e)), "" != n && (r += i(n)), r += '" target="_blank" title="', 
        r += i(l), r += '" style=" display:block; width:100%; min-height: 80px; background:url(', 
        r += i(c), r += ') center top no-repeat; "> <img src="', r += i(c), r += '" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="index-top-ad-close" id="J_indexTopAdClose"> <span></span> </a> </div> </div>', 
        new d(r);
    });
}();