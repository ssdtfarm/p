!function() {
    function e(e, t) {
        return (/string|function/.test(typeof t) ? n : l)(e, t);
    }
    function t(e, i) {
        return "string" != typeof e && (i = typeof e, "number" === i ? e += "" : e = "function" === i ? t(e.call(e)) : ""), 
        e;
    }
    function i(e) {
        return u[e];
    }
    function a(e) {
        return t(e).replace(/&(?![\w#]+;)|[<>"']/g, i);
    }
    function s(e, t) {
        if (d(e)) for (var i = 0, a = e.length; a > i; i++) t.call(e, e[i], i, e); else for (i in e) t.call(e, e[i], i);
    }
    function r(e, t) {
        var i = /(\/)[^/]+\1\.\.\1/, a = ("./" + e).replace(/[^/]+$/, ""), s = a + t;
        for (s = s.replace(/\/\.\//g, "/"); s.match(i); ) s = s.replace(i, "/");
        return s;
    }
    function l(t, i) {
        var a = e.get(t) || c({
            filename: t,
            name: "Render Error",
            message: "Template not found"
        });
        return i ? a(i) : a;
    }
    function n(e, t) {
        if ("string" == typeof t) {
            var i = t;
            t = function() {
                return new p(i);
            };
        }
        var a = o[e] = function(i) {
            try {
                return new t(i, e) + "";
            } catch (a) {
                return c(a)();
            }
        };
        return a.prototype = t.prototype = f, a.toString = function() {
            return t + "";
        }, a;
    }
    function c(e) {
        var t = "{Template Error}", i = e.stack || "";
        if (i) i = i.split("\n").slice(0, 2).join("\n"); else for (var a in e) i += "<" + a + ">\n" + e[a] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(t + "\n\n" + i), t;
        };
    }
    var o = e.cache = {}, p = this.String, u = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, d = Array.isArray || function(e) {
        return "[object Array]" === {}.toString.call(e);
    }, f = e.utils = {
        $helpers: {},
        $include: function(e, t, i) {
            return e = r(i, e), l(e, t);
        },
        $string: t,
        $escape: a,
        $each: s
    }, h = e.helpers = f.$helpers;
    e.get = function(e) {
        return o[e.replace(/^\.\//, "")];
    }, e.helper = function(e, t) {
        h[e] = t;
    }, "function" == typeof define ? define(function() {
        return e;
    }) : "undefined" != typeof exports ? module.exports = e : this.template = e, e("tplFullSlider", function(e, t) {
        "use strict";
        var i = this, a = (i.$helpers, e.i), s = e.list, r = i.$escape, l = "";
        l += '<div class="bd"> <ul> ';
        for (var a = 0; a < s.length; a++) l += ' <li> <a href="', l += r(s[a].linkURL), 
        l += '" target="_blank" title="', l += r(s[a].pTitle), l += '" style=\'background: url("', 
        l += r(s[a].imgSRC), l += "\") center center no-repeat;'>&nbsp;</a> </li> ";
        return l += ' </ul> <a target="_blank" class="arrow prev">&nbsp;</a> <a target="_blank" class="arrow next">&nbsp;</a> </div> <div class="hd"> <ul></ul> </div>', 
        new p(l);
    }), e("tplRebateAddMainGood", function(e, t) {
        "use strict";
        var i = this, a = (i.$helpers, i.$escape), s = e.goodLink, r = e.imgURL, l = e.tit, n = e.price, c = e.id, o = e.rebatePprice, u = "";
        return u += '<a href="', u += a(s), u += '"> <img src="', u += a(r), u += '" alt=""> <p class="good-title">', 
        u += a(l), u += '</p> </a> <p><span class="price">', u += a(n), u += '</span><i class="del j_delMainGood" data-id="', 
        u += a(c), u += '"></i></p> <div class="tips"> <p>返</p> <p>&yen;', u += a(o), u += "</p> </div> ", 
        new p(u);
    }), e("tplSecondCatsSelect", function(e, t) {
        "use strict";
        var i = this, a = (i.$helpers, e.i), s = e.list, r = i.$escape, l = "";
        l += '<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';
        for (var a = 0; a < s.length; a++) l += ' <li><a href="/rebate/list?catId=', l += r(s[a].catId), 
        l += '" data-id="', l += r(s[a].catId), l += '">', l += r(s[a].name), l += "</a></li> ";
        return l += " </ul>", new p(l);
    }), e("tplSelectForUser", function(e, t) {
        "use strict";
        var i = this, a = (i.$helpers, e.i), s = e.list, r = i.$escape, l = "";
        l += '<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';
        for (var a = 0; a < s.length; a++) l += ' <li><a href="/shop/justtest?catId=', l += r(s[a].catId), 
        l += '" data-id="', l += r(s[a].catId), l += '">', l += r(s[a].name), l += "</a></li> ";
        return l += " </ul>", new p(l);
    }), e("tplSelectGood", function(e, t) {
        "use strict";
        var i = this, a = (i.$helpers, i.$escape), s = e.id, r = e.goodLink, l = e.imgURL, n = e.tit, c = e.price, o = e.rebatePprice, u = "";
        return u += '<li class="item fade-in" data-id="', u += a(s), u += '"> <a href="', 
        u += a(r), u += '" class="img-link"><img src="', u += a(l), u += '" ></a> <div class="good-info"> <a href="', 
        u += a(r), u += '" class="good-title">', u += a(n), u += '</a> <p class="price">&yen;', 
        u += a(c), u += '</p> <p class="rebate-price">返', u += a(o), u += '</p> </div> <i class="del j_removeGood" data-id="', 
        u += a(s), u += '"></i> </li> ', new p(u);
    }), e("tplSelectGoodSideList", function(e, t) {
        "use strict";
        for (var i = this, a = (i.$helpers, e.i), s = e.data, r = i.$escape, l = "", a = 0; a < s.list.length; a++) l += ' <li class="item" data-id="', 
        l += r(s.list[a].sku_id), l += '"> <a href="#>" class="img-link"><img src="', l += r(s.list[a].img), 
        l += '" ></a> <div class="good-info"> <a href="#" class="good-title">', l += r(s.list[a].sku_title), 
        l += '</a> <p class="price">&yen;', l += r(s.list[a].price), l += '</p> <p class="rebate-price">返', 
        l += r(s.list[a].rebatePrice), l += '</p> </div> <i class="del j_removeGood" data-id="', 
        l += r(s.list[a].sku_id), l += '"></i> </li> ';
        return new p(l);
    }), e("tplSelectShare", function(e, t) {
        "use strict";
        var i = this, a = (i.$helpers, e.i), s = e.list, r = i.$escape, l = "";
        l += '<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';
        for (var a = 0; a < s.length; a++) l += ' <li><a href="/shop/share?catId=', l += r(s[a].catId), 
        l += '" data-id="', l += r(s[a].catId), l += '">', l += r(s[a].name), l += "</a></li> ";
        return l += " </ul>", new p(l);
    }), e("tplSetMainDialog", function(e, t) {
        "use strict";
        var i = this, a = (i.$helpers, e.i), s = e.data, r = i.$escape, l = "";
        l += '<div class="goods-dialog"> <h6>只可以设置4个主推商品，请先删除已有的主推商品</h6> <ul class="goods-list"> ';
        for (var a = 0; a < s.length; a++) l += ' <li> <dl class="goods"> <dt class="fl w140 ml-10 mr-10"> <a href="javascript:void(0);"><img src="', 
        l += r(s[a].img), l += '" alt=""></a> </dt> <dd class="fl"><a href="" class="title">', 
        l += r(s[a].sku_title), l += "</a><span>&yen;", l += r(s[a].price), l += '</span><span class="fc-f60">返&yen;', 
        l += r(s[a].price), l += '</span></dd> </dl> <button class="btn-orange J_cancelMain" data-id="', 
        l += r(s[a].sku_id), l += '">取消主推</button> </li> ';
        return l += " </ul> </div> ", new p(l);
    }), e("tplShopCreateCats", function(e, t) {
        "use strict";
        var i = this, a = (i.$helpers, e.i), s = e.list, r = i.$escape, l = "";
        l += '<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';
        for (var a = 0; a < s.length; a++) l += ' <li><a href="/shop/create?catId=', l += r(s[a].catId), 
        l += '" data-id="', l += r(s[a].catId), l += '">', l += r(s[a].name), l += "</a></li> ";
        return l += " </ul>", new p(l);
    });
}();