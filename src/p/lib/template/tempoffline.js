!function() {
    function n(n, e) {
        return (/string|function/.test(typeof e) ? s : c)(n, e);
    }
    function e(n, t) {
        return "string" != typeof n && (t = typeof n, "number" === t ? n += "" : n = "function" === t ? e(n.call(n)) : ""), 
        n;
    }
    function t(n) {
        return l[n];
    }
    function r(n) {
        return e(n).replace(/&(?![\w#]+;)|[<>"']/g, t);
    }
    function i(n, e) {
        if (f(n)) for (var t = 0, r = n.length; r > t; t++) e.call(n, n[t], t, n); else for (t in n) e.call(n, n[t], t);
    }
    function o(n, e) {
        var t = /(\/)[^\/]+\1\.\.\1/, r = ("./" + n).replace(/[^\/]+$/, ""), i = r + e;
        for (i = i.replace(/\/\.\//g, "/"); i.match(t); ) i = i.replace(t, "/");
        return i;
    }
    function c(e, t) {
        var r = n.get(e) || a({
            filename: e,
            name: "Render Error",
            message: "Template not found"
        });
        return t ? r(t) : r;
    }
    function s(n, e) {
        if ("string" == typeof e) {
            var t = e;
            e = function() {
                return new u(t);
            };
        }
        var r = p[n] = function(t) {
            try {
                return new e(t, n) + "";
            } catch (r) {
                return a(r)();
            }
        };
        return r.prototype = e.prototype = d, r.toString = function() {
            return e + "";
        }, r;
    }
    function a(n) {
        var e = "{Template Error}", t = n.stack || "";
        if (t) t = t.split("\n").slice(0, 2).join("\n"); else for (var r in n) t += "<" + r + ">\n" + n[r] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(e + "\n\n" + t), e;
        };
    }
    var p = n.cache = {}, u = this.String, l = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, f = Array.isArray || function(n) {
        return "[object Array]" === {}.toString.call(n);
    }, d = n.utils = {
        $helpers: {},
        $include: function(n, e, t) {
            return n = o(t, n), c(n, e);
        },
        $string: e,
        $escape: r,
        $each: i
    }, h = n.helpers = d.$helpers;
    n.get = function(n) {
        return p[n.replace(/^\.\//, "")];
    }, n.helper = function(n, e) {
        h[n] = e;
    }, "function" == typeof define ? define(function() {
        return n;
    }) : "undefined" != typeof exports ? module.exports = n : this.template = n, n("tplSendPhone", '<div class="send-dialog"> <p>发送内容：</p> <div class="send-content"> 【金海马家居黄埔大道店】<span>展馆地址：</span>黄埔大道中303号金海马家居二楼（地铁五号线科韵路B出口）；<span>营业时间：</span>9：00-21：00；<span>服务电话：</span>020-32321587 </div> <div class="send-op"> <input class="send-input" name="phone" type="text" placeholder="请输入您的手机号码" /><i class="send-tips">手机号码错误</i> <input class="send-input" name="phonecode" type="text" placeholder="请输入手机验证码" /><i class="send-tips">60秒后重新获取验证码</i> <a href="javascript:void(0)" class="send-getcode" id="J_getCode">获取手机验证码</a> </div> </div>');
}();