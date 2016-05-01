!function() {
    function e(e, t) {
        return (/string|function/.test(typeof t) ? a : c)(e, t);
    }
    function t(e, r) {
        return "string" != typeof e && (r = typeof e, "number" === r ? e += "" : e = "function" === r ? t(e.call(e)) : ""), 
        e;
    }
    function r(e) {
        return f[e];
    }
    function n(e) {
        return t(e).replace(/&(?![\w#]+;)|[<>"']/g, r);
    }
    function i(e, t) {
        if (p(e)) for (var r = 0, n = e.length; n > r; r++) t.call(e, e[r], r, e); else for (r in e) t.call(e, e[r], r);
    }
    function s(e, t) {
        var r = /(\/)[^/]+\1\.\.\1/, n = ("./" + e).replace(/[^/]+$/, ""), i = n + t;
        for (i = i.replace(/\/\.\//g, "/"); i.match(r); ) i = i.replace(r, "/");
        return i;
    }
    function c(t, r) {
        var n = e.get(t) || o({
            filename: t,
            name: "Render Error",
            message: "Template not found"
        });
        return r ? n(r) : n;
    }
    function a(e, t) {
        if ("string" == typeof t) {
            var r = t;
            t = function() {
                return new u(r);
            };
        }
        var n = l[e] = function(r) {
            try {
                return new t(r, e) + "";
            } catch (n) {
                return o(n)();
            }
        };
        return n.prototype = t.prototype = d, n.toString = function() {
            return t + "";
        }, n;
    }
    function o(e) {
        var t = "{Template Error}", r = e.stack || "";
        if (r) r = r.split("\n").slice(0, 2).join("\n"); else for (var n in e) r += "<" + n + ">\n" + e[n] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(t + "\n\n" + r), t;
        };
    }
    var l = e.cache = {}, u = this.String, f = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, p = Array.isArray || function(e) {
        return "[object Array]" === {}.toString.call(e);
    }, d = e.utils = {
        $helpers: {},
        $include: function(e, t, r) {
            return e = s(r, e), c(e, t);
        },
        $string: t,
        $escape: n,
        $each: i
    }, v = e.helpers = d.$helpers;
    e.get = function(e) {
        return l[e.replace(/^\.\//, "")];
    }, e.helper = function(e, t) {
        v[e] = t;
    }, "function" == typeof define ? define(function() {
        return e;
    }) : "undefined" != typeof exports ? module.exports = e : this.template = e, e("tplCurstomDesigners", function(e, t) {
        "use strict";
        for (var r = this, n = (r.$helpers, e.i), i = e.desDetail, s = r.$escape, c = "", n = 0; n < i.length; n++) c += ' <li class="item JQ_item', 
        c += s(n + 1), c += '" des-item="', c += s(n + 1), c += '"> <img class="head-pic" src="', 
        c += s(i[n].decHeadPic), c += '" alt="', c += s(i[n].desTitle), c += " ", c += s(i[n].desName), 
        c += '"> <div class="detail"></div> </li> ';
        return c += " ", new u(c);
    }), e("tplCurstomSlider3D", function(e, t) {
        "use strict";
        var r = this, n = (r.$helpers, e.i), i = e.dataList, s = r.$escape, c = "";
        c += '<div class="ui-diy-3d-content" id="J_slider"> <div class="slider3DList" id="sliderList"> <ul> ';
        for (var n = 0; n < i[0].length; n++) c += ' <li class="" style=""> <img src="', 
        c += s(i[0][n].imgSrc), c += '"> <div></div> <p class="b_tit">', c += s(i[0][n].thisInfo), 
        c += "</p> </li> ";
        return c += ' </ul> <a href="javascript:;" class="prev"></a> <a href="javascript:;" class="next"></a> </div> </div> ', 
        new u(c);
    });
}();