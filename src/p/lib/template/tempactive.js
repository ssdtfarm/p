!function() {
    function t(t, e) {
        return (/string|function/.test(typeof e) ? p : c)(t, e);
    }
    function e(t, n) {
        return "string" != typeof t && (n = typeof t, "number" === n ? t += "" : t = "function" === n ? e(t.call(t)) : ""), 
        t;
    }
    function n(t) {
        return _[t];
    }
    function r(t) {
        return e(t).replace(/&(?![\w#]+;)|[<>"']/g, n);
    }
    function o(t, e) {
        if (f(t)) for (var n = 0, r = t.length; r > n; n++) e.call(t, t[n], n, t); else for (n in t) e.call(t, t[n], n);
    }
    function i(t, e) {
        var n = /(\/)[^/]+\1\.\.\1/, r = ("./" + t).replace(/[^/]+$/, ""), o = r + e;
        for (o = o.replace(/\/\.\//g, "/"); o.match(n); ) o = o.replace(n, "/");
        return o;
    }
    function c(e, n) {
        var r = t.get(e) || a({
            filename: e,
            name: "Render Error",
            message: "Template not found"
        });
        return n ? r(n) : r;
    }
    function p(t, e) {
        if ("string" == typeof e) {
            var n = e;
            e = function() {
                return new l(n);
            };
        }
        var r = u[t] = function(n) {
            try {
                return new e(n, t) + "";
            } catch (r) {
                return a(r)();
            }
        };
        return r.prototype = e.prototype = g, r.toString = function() {
            return e + "";
        }, r;
    }
    function a(t) {
        var e = "{Template Error}", n = t.stack || "";
        if (n) n = n.split("\n").slice(0, 2).join("\n"); else for (var r in t) n += "<" + r + ">\n" + t[r] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(e + "\n\n" + n), e;
        };
    }
    var u = t.cache = {}, l = this.String, _ = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, f = Array.isArray || function(t) {
        return "[object Array]" === {}.toString.call(t);
    }, g = t.utils = {
        $helpers: {},
        $include: function(t, e, n) {
            return t = i(n, t), c(t, e);
        },
        $string: e,
        $escape: r,
        $each: o
    }, h = t.helpers = g.$helpers;
    t.get = function(t) {
        return u[t.replace(/^\.\//, "")];
    }, t.helper = function(t, e) {
        h[t] = e;
    }, "function" == typeof define ? define(function() {
        return t;
    }) : "undefined" != typeof exports ? module.exports = t : this.template = t, t("tplAnchor", function(t, e) {
        "use strict";
        var n = this, r = (n.$helpers, t.activity_mddh_status), o = n.$escape, i = t.activity_anchor_info, c = t.i, p = t.list, a = "";
        if (a += " ", 1 == r) {
            a += ' <div class="nav_act" style="width:', a += o(i.g_width), a += "px; position:fixed; top:", 
            a += o(i.g_top), a += 'px;"> <a onclick="cose()"> <p style="width:', a += o(i.g_close_width), 
            a += "px;height:", a += o(i.g_close_height), a += 'px;position:absolute;top:0;right:0;"></p> </a> <p style="width:', 
            a += o(i.g_top_width), a += "px;height:", a += o(i.g_top_height), a += "px;background:url(", 
            a += o(i.g_top_url), a += ") no-repeat ", a += o(i.g_top_coordinate_x), a += "px ", 
            a += o(i.g_top_coordinate_x), a += 'px;"></p> ';
            for (var c = 0; c < p.length; c++) a += ' <a href="#img_', a += o(p[c].g_md_id), 
            a += '"> <p style="width:', a += o(p[c].g_md_width), a += "px;height:", a += o(p[c].g_md_height), 
            a += "px;background:url(", a += o(p[c].g_md_url), a += ") no-repeat ", a += o(p[c].g_md_coordinate_x), 
            a += "px ", a += o(p[c].g_md_coordinate_y), a += 'px;"></p> </a> ';
            a += ' <a href="#"> <p style="width:', a += o(i.g_bottom_width), a += "px;height:", 
            a += o(i.g_bottom_height), a += "px;background:url(", a += o(i.g_bottom_url), a += ") no-repeat ", 
            a += o(i.g_bottom_coordinate_x), a += "px ", a += o(i.g_bottom_coordinate_y), a += 'px;"></p> </a> </div> ';
        }
        return a += "  ", new l(a);
    });
}();