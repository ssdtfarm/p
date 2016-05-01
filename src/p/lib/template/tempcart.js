!function() {
    function e(e, a) {
        return (/string|function/.test(typeof a) ? r : n)(e, a);
    }
    function a(e, t) {
        return "string" != typeof e && (t = typeof e, "number" === t ? e += "" : e = "function" === t ? a(e.call(e)) : ""), 
        e;
    }
    function t(e) {
        return d[e];
    }
    function l(e) {
        return a(e).replace(/&(?![\w#]+;)|[<>"']/g, t);
    }
    function s(e, a) {
        if (u(e)) for (var t = 0, l = e.length; l > t; t++) a.call(e, e[t], t, e); else for (t in e) a.call(e, e[t], t);
    }
    function i(e, a) {
        var t = /(\/)[^/]+\1\.\.\1/, l = ("./" + e).replace(/[^/]+$/, ""), s = l + a;
        for (s = s.replace(/\/\.\//g, "/"); s.match(t); ) s = s.replace(t, "/");
        return s;
    }
    function n(a, t) {
        var l = e.get(a) || c({
            filename: a,
            name: "Render Error",
            message: "Template not found"
        });
        return t ? l(t) : l;
    }
    function r(e, a) {
        if ("string" == typeof a) {
            var t = a;
            a = function() {
                return new p(t);
            };
        }
        var l = o[e] = function(t) {
            try {
                return new a(t, e) + "";
            } catch (l) {
                return c(l)();
            }
        };
        return l.prototype = a.prototype = f, l.toString = function() {
            return a + "";
        }, l;
    }
    function c(e) {
        var a = "{Template Error}", t = e.stack || "";
        if (t) t = t.split("\n").slice(0, 2).join("\n"); else for (var l in e) t += "<" + l + ">\n" + e[l] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(a + "\n\n" + t), a;
        };
    }
    var o = e.cache = {}, p = this.String, d = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, u = Array.isArray || function(e) {
        return "[object Array]" === {}.toString.call(e);
    }, f = e.utils = {
        $helpers: {},
        $include: function(e, a, t) {
            return e = i(t, e), n(e, a);
        },
        $string: a,
        $escape: l,
        $each: s
    }, h = e.helpers = f.$helpers;
    e.get = function(e) {
        return o[e.replace(/^\.\//, "")];
    }, e.helper = function(e, a) {
        h[e] = a;
    }, "function" == typeof define ? define(function() {
        return e;
    }) : "undefined" != typeof exports ? module.exports = e : this.template = e, e("tplAddressList", function(e, a) {
        "use strict";
        for (var t = this, l = (t.$helpers, e.i), s = e.list, i = t.$escape, n = "", l = 0; l < s.length; l++) n += " ", 
        0 == l && (n += ' <input type="hidden" name="addressID" value="', n += i(s[l].addressID), 
        n += '" /> '), n += ' <dl class="ship-address-list"> <dt class="JQ_chkAddress" data-value="', 
        n += i(s[l].addressID), n += ",", n += i(s[l].areaID), n += '"> <a href="javascript:void(0);" class="icon-radio-off ', 
        0 == l && (n += "icon-radio-on"), n += ' JQ_radio"></a> ', n += 1 == s[l].def ? ' <i class="JQ_labelIcon icon-label-f60"></i> ' : ' <i class="JQ_labelIcon icon-empty"></i> ', 
        n += ' <label class="JQ_userName address-name" title="', n += i(s[l].name), n += '">', 
        n += i(s[l].name), n += '</label> <span class="JQ_area address-area" title="', n += i(s[l].proName), 
        n += i(s[l].cityName), n += i(s[l].areaName), n += '" data-value="', n += i(s[l].proID), 
        n += ",", n += i(s[l].cityID), n += ",", n += i(s[l].areaID), n += ",", n += i(s[l].proName), 
        n += ",", n += i(s[l].cityName), n += ",", n += i(s[l].areaName), n += '"> ', n += i(s[l].proName), 
        n += i(s[l].cityName), n += i(s[l].areaName), n += ' </span> <span class="JQ_address address-detail" title="', 
        n += i(s[l].address), n += '"> ', n += i(s[l].address), n += ' </span> <span class="JQ_telephone address-phone" title="手机/电话：', 
        n += i(s[l].mobile), n += "/", n += i(s[l].telphone), n += '" data-value="', n += i(s[l].mobile), 
        n += ",", n += i(s[l].telphone), n += '"> 手机/电话：', n += i(s[l].mobile), n += "/", 
        n += i(s[l].telphone), n += ' </span> <input type="hidden" class="JQ_default" value="', 
        n += i(s[l].def), n += '"> ', 1 == s[l].def ? n += ' <span class="default-address-text JQ_defaultText">默认地址</span> ' : (n += ' <a href="javascript:void(0);" data-id="', 
        n += i(s[l].addressID), n += '" class="list-set-label JQ_setDefault">设为默认地址</a> '), 
        n += ' <a href="//my.kinhom.com/user/addressdo?type=3" class="icon-modify-8c8 JQ_modifyAddress"></a> </dt> </dl> ';
        return new p(n);
    }), e("tplCartCash", function(e, a) {
        "use strict";
        var t = this, l = (t.$helpers, e.list), s = t.$escape, i = e.labelName, n = e.j, r = "";
        if (r += '<div id="J_cashWrap" style="display: none;"> <div id="J_cash" class="select-gray fl"> <i class="select-corner icon-gray-left"></i> ', 
        0 == l.length ? (r += ' <label class="JQ_option select-option ">', r += s(i), r += "</label> ") : r += ' <label class="JQ_option select-option ">选择可用的现金券</label> ', 
        r += ' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"> <i class="triangle-down"></i> </a> <input type="hidden" name="selectCash" /> <input type="hidden" name="selectCashPrice" value="0.00" /> ', 
        0 != l.length) {
            r += ' <ul id="J_cashList"> ';
            for (var n = 0; n < l.length; n++) r += ' <li> <a href="javascript:void(0);" data-value="', 
            r += s(l[n].cash), r += '" data-price="', r += s(l[n].price), r += '"> ', r += s(l[n].name), 
            r += " </a> </li> ";
            r += " </ul> ";
        }
        return r += " </div> </div>", new p(r);
    }), e("tplCoupon", function(e, a) {
        "use strict";
        var t = this, l = (t.$helpers, e.list), s = t.$escape, i = e.labelName, n = e.j, r = "";
        if (r += '<div id="J_couponWrap" style="display: none;"> <div id="J_coupon" class="select-gray fl"> <i class="select-corner icon-gray-left"></i> ', 
        0 == l.length ? (r += ' <label class="JQ_option select-option ">', r += s(i), r += "</label> ") : r += ' <label class="JQ_option select-option ">选择可用的优惠券</label> ', 
        r += ' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"> <i class="triangle-down"></i> </a> <input type="hidden" name="selectCoupon" /> <input type="hidden" name="selectCouponPrice" value="0.00" /> ', 
        0 != l.length) {
            r += ' <ul id="J_couponList"> ';
            for (var n = 0; n < l.length; n++) r += ' <li> <a href="javascript:void(0);" data-value="', 
            r += s(l[n].coupon), r += '" data-price="', r += s(l[n].price), r += '"> ', r += s(l[n].name), 
            r += " </a> </li> ";
            r += " </ul> ";
        }
        return r += " </div> </div>", new p(r);
    }), e("tplHotList", function(e, a) {
        "use strict";
        var t = this, l = (t.$helpers, e.list), s = e.i, i = e.len, n = t.$escape, r = "";
        if (r += '<dl class="cart-hot-list clearfix"> <dt>热销单品</dt> ', 0 != l.length) {
            r += " ";
            for (var s = 0; i = l.length, i > s; s++) r += ' <dd> <a href="', r += n(l[s].linkURL), 
            r += '"><img src="', r += n(l[s].imgURL), r += '" width="190" height="127" /></a> <a href="', 
            r += n(l[s].linkURL), r += '" class="cart-hot-list-title">', r += n(l[s].title), 
            r += '</a> <p> <label class="cart-hot-list-price">&yen ', r += n(l[s].price), r += '</label> <span class="cart-hot-list-text">已有<i>', 
            r += n(l[s].saleNum), r += "</i>人购买</span> </p> </dd> ";
        }
        return r += " </dl>", new p(r);
    }), e("tplSelectShip", function(e, a) {
        "use strict";
        var t = this, l = (t.$helpers, t.$escape), s = e.labelName, i = e.list, n = e.j, r = e.len, c = "";
        if (c += '<i class="select-corner icon-gray-left"></i> <label class="JQ_option select-option">', 
        c += l(s), c += '</label> <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"> <i class="triangle-down"></i> </a> ', 
        0 != i.length) {
            c += ' <input name="shipType" type="hidden" value="', c += l(i[0].shipType), c += '" /> <ul> ';
            for (var n = 0; r = i.length, r > n; n++) c += ' <li> <a href="javascript:void(0);" data-value="', 
            c += l(i[n].shipType), c += '" data-price="', c += l(i[n].price), c += '">', c += l(i[n].name), 
            c += "</a> </li> ";
            c += " </ul> ";
        } else c += " <ul></ul> ";
        return new p(c);
    });
}();