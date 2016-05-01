!function() {
    function e(e, n) {
        return (/string|function/.test(typeof n) ? c : a)(e, n);
    }
    function n(e, t) {
        return "string" != typeof e && (t = typeof e, "number" === t ? e += "" : e = "function" === t ? n(e.call(e)) : ""), 
        e;
    }
    function t(e) {
        return f[e];
    }
    function r(e) {
        return n(e).replace(/&(?![\w#]+;)|[<>"']/g, t);
    }
    function i(e, n) {
        if (p(e)) for (var t = 0, r = e.length; r > t; t++) n.call(e, e[t], t, e); else for (t in e) n.call(e, e[t], t);
    }
    function l(e, n) {
        var t = /(\/)[^/]+\1\.\.\1/, r = ("./" + e).replace(/[^/]+$/, ""), i = r + n;
        for (i = i.replace(/\/\.\//g, "/"); i.match(t); ) i = i.replace(t, "/");
        return i;
    }
    function a(n, t) {
        var r = e.get(n) || o({
            filename: n,
            name: "Render Error",
            message: "Template not found"
        });
        return t ? r(t) : r;
    }
    function c(e, n) {
        if ("string" == typeof n) {
            var t = n;
            n = function() {
                return new u(t);
            };
        }
        var r = s[e] = function(t) {
            try {
                return new n(t, e) + "";
            } catch (r) {
                return o(r)();
            }
        };
        return r.prototype = n.prototype = v, r.toString = function() {
            return n + "";
        }, r;
    }
    function o(e) {
        var n = "{Template Error}", t = e.stack || "";
        if (t) t = t.split("\n").slice(0, 2).join("\n"); else for (var r in e) t += "<" + r + ">\n" + e[r] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(n + "\n\n" + t), n;
        };
    }
    var s = e.cache = {}, u = this.String, f = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, p = Array.isArray || function(e) {
        return "[object Array]" === {}.toString.call(e);
    }, v = e.utils = {
        $helpers: {},
        $include: function(e, n, t) {
            return e = l(t, e), a(e, n);
        },
        $string: n,
        $escape: r,
        $each: i
    }, g = e.helpers = v.$helpers;
    e.get = function(e) {
        return s[e.replace(/^\.\//, "")];
    }, e.helper = function(e, n) {
        g[e] = n;
    }, "function" == typeof define ? define(function() {
        return e;
    }) : "undefined" != typeof exports ? module.exports = e : this.template = e, e("tplClubPrivilege", function(e, n) {
        "use strict";
        var t = this, r = (t.$helpers, e.list), i = e.i, l = e.len, a = t.$escape, c = "";
        if (0 != r.length) {
            c += ' <div class="hd dis-none">  <ul></ul> </div> <div class="bd"> <ul class="club-privilege-list"> ';
            for (var i = 0; l = r.length, l > i; i++) c += ' <li> <a data-name="', c += a(r[i].name), 
            c += '" class="JQ_showTipItem" href="', c += "" == r[i].linkURL ? "javascript:void(0);" : a(r[i].linkURL), 
            c += '"> <img src="', c += a(r[i].imgURL), c += '" /> <i class="tip-item-trungle"></i> </a> </li> ';
            c += ' </ul> </div> <a href="javascript:void(0);" class="prev last-page-btn"><</a> <a href="javascript:void(0);" class="next next-page-btn">></a> <span id="J_listTip" class="list-tip"> <label id="J_listTipText"></label> </span> ';
        }
        return c += " ", new u(c);
    });
}();