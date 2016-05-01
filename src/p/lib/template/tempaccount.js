!function() {
    function s(s, e) {
        return (/string|function/.test(typeof e) ? c : i)(s, e);
    }
    function e(s, p) {
        return "string" != typeof s && (p = typeof s, "number" === p ? s += "" : s = "function" === p ? e(s.call(s)) : ""), 
        s;
    }
    function p(s) {
        return d[s];
    }
    function t(s) {
        return e(s).replace(/&(?![\w#]+;)|[<>"']/g, p);
    }
    function a(s, e) {
        if (f(s)) for (var p = 0, t = s.length; t > p; p++) e.call(s, s[p], p, s); else for (p in s) e.call(s, s[p], p);
    }
    function n(s, e) {
        var p = /(\/)[^/]+\1\.\.\1/, t = ("./" + s).replace(/[^/]+$/, ""), a = t + e;
        for (a = a.replace(/\/\.\//g, "/"); a.match(p); ) a = a.replace(p, "/");
        return a;
    }
    function i(e, p) {
        var t = s.get(e) || l({
            filename: e,
            name: "Render Error",
            message: "Template not found"
        });
        return p ? t(p) : t;
    }
    function c(s, e) {
        if ("string" == typeof e) {
            var p = e;
            e = function() {
                return new o(p);
            };
        }
        var t = r[s] = function(p) {
            try {
                return new e(p, s) + "";
            } catch (t) {
                return l(t)();
            }
        };
        return t.prototype = e.prototype = h, t.toString = function() {
            return e + "";
        }, t;
    }
    function l(s) {
        var e = "{Template Error}", p = s.stack || "";
        if (p) p = p.split("\n").slice(0, 2).join("\n"); else for (var t in s) p += "<" + t + ">\n" + s[t] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(e + "\n\n" + p), e;
        };
    }
    var r = s.cache = {}, o = this.String, d = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, f = Array.isArray || function(s) {
        return "[object Array]" === {}.toString.call(s);
    }, h = s.utils = {
        $helpers: {},
        $include: function(s, e, p) {
            return s = n(p, s), i(s, e);
        },
        $string: e,
        $escape: t,
        $each: a
    }, u = s.helpers = h.$helpers;
    s.get = function(s) {
        return r[s.replace(/^\.\//, "")];
    }, s.helper = function(s, e) {
        u[s] = e;
    }, "function" == typeof define ? define(function() {
        return s;
    }) : "undefined" != typeof exports ? module.exports = s : this.template = s, s("tplSetEmail", function(s, e) {
        "use strict";
        var p = this, t = (p.$helpers, p.$escape), a = s.email, n = "";
        return n += '<div class="set-email-form">  <p class="fc-333">系统将向您的邮箱 ', n += t(a), 
        n += ' 发送一封验证邮件，请您登录邮箱，点击邮件中的链接完成邮箱验证。</p>  <p id="J_sendBtnWrap" class="email-btn-tr"> <a id="J_sendMail" href="javascript:void(0);" class="send-btn orange" target="_blank">发送验证邮件</a> </p>  <p id="J_sendMailSub" class="tc fs-14"> <span id="J_subWrap" class="fc-f60"></span> </p>  <p class="fc-8c8 tc mt-10"> <label>如果您超过5分钟未收到邮件，您可以重新发送验证邮件</label> </p>  <p class="email-send-tip"> 为什么要验证邮箱？<br> 1. 验证邮箱可加强账户安全，您可以使用已验证手机快速找回密码或支付密码；<br> 2. 已验证邮箱可用于接收金海马商城优惠信息、会员资讯等。 </p> </div>', 
        new o(n);
    }), s("tplSetMailOne", '<div class="set-phone-form"> <input type="hidden" name="setPhoneOneRes"> <p class="set-phone-steps"> <span class="step-on">验证身份</span> <span class="step-off">验证邮箱</span> <span class="step-off">完成绑定</span> </p> <p class="tc fc-333 step-tip">为了确保您的帐号安全，请先验证您的身份。</p> <div class="step-tr"> <p id="J_stepPass" class="step-input-wrap w178"> <input type="password" name="stepMailPass" placeholder="请输入登录密码" class="JQ_editPassOption"> </p> <p class="edit-pass-tip"></p> </div> <div class="step-tr clearfix"> <p id="J_setCode" class="step-input-wrap w78 fl"> <input type="text" name="stepMailCode" placeholder="验证码" class="JQ_editPassOption"> </p> <p class="step-code-wrap fl"> <img id="J_stepMailCode" src="http://misc.jjcdn.com/p/images/testYZM.png" width="90" height="26" /> <a id="J_getMailCode" href="javascript:void(0);" class="change-code-btn">换一张</a> </p> <div class="clear"></div> <p class="edit-pass-tip"></p> </div> </div>'), 
    s("tplSetMailThree", function(s, e) {
        "use strict";
        var p = this, t = (p.$helpers, p.$escape), a = s.mail, n = "";
        return n += '<div class="set-phone-form"> <p class="set-phone-steps">  <span class="step-on">验证邮箱</span> <span class="step-on">完成绑定</span> </p> <p class="tc fc-333 fs-14 step-tip"> <i class="icon-face-smile-orange"></i> <b>恭喜您，邮箱<label id="J_mailBind" class="fc-f60">', 
        n += t(a), n += '</label>绑定成功！</b> </p> <p class="tc fc-8c8 step-tip">现在开始，您可以用该邮箱来登录金海马商城了</p> </div>', 
        new o(n);
    }), s("tplSetMailTwo", '<div class="set-phone-form"> <p class="set-phone-steps">  <span class="step-on">验证邮箱</span> <span class="step-off">完成绑定</span> </p> <p class="tc fc-333 step-tip">请确保您的邮箱能正常使用，验证成功，邮箱才能生效。</p> <div class="step-tr"> <p id="J_stepPhone" class="step-input-wrap w178"> <input type="text" name="stepTwoMail" placeholder="请输入邮箱" class="JQ_editPassOption"> </p> <p class="edit-pass-tip"></p> </div> <div class="step-tr clearfix"> <p id="J_stepPhoneCode" class="step-input-wrap w78 fl"> <input type="text" name="stepTwoMailCode" placeholder="输入验证码" class="JQ_editPassOption"> </p> <p class="step-code-wrap fl"> <a id="J_sendEmailCode" href="javascript:void(0);" class="phone-code-btn"> 发送邮箱验证码 </a> <a id="J_codeWait" href="javascript:void(0);" class="phone-code-btn-gray hide"> <label id="J_subMTimeWrap" class="fc-f60">300</label>秒 </a> </p> <div class="clear"></div> <p class="edit-pass-tip"></p> </div> </div>'), 
    s("tplSetPhoneOne", '<div class="set-phone-form"> <input type="hidden" name="setPhoneOneRes"> <p class="set-phone-steps"> <span class="step-on">验证身份</span> <span class="step-off">验证手机</span> <span class="step-off">完成绑定</span> </p> <p class="tc fc-333 step-tip">为了确保您的帐号安全，请先验证您的身份。</p> <div class="step-tr"> <p id="J_stepPass" class="step-input-wrap w178"> <input type="password" name="stepPass" placeholder="请输入登录密码" class="JQ_editPassOption"> </p> <p class="edit-pass-tip"></p> </div> <div class="step-tr clearfix"> <p id="J_setCode" class="step-input-wrap w78 fl"> <input type="text" name="stepCode" placeholder="验证码" class="JQ_editPassOption"> </p> <p class="step-code-wrap fl"> <img id="J_stepRCode" src="http://misc.jjcdn.com/p/images/testYZM.png" width="90" height="26" /> <a id="J_getNewCode" href="javascript:void(0);" class="change-code-btn">换一张</a> </p> <div class="clear"></div> <p class="edit-pass-tip"></p> </div> </div>'), 
    s("tplSetPhoneThree", function(s, e) {
        "use strict";
        var p = this, t = (p.$helpers, p.$escape), a = s.phone, n = "";
        return n += '<div class="set-phone-form"> <p class="set-phone-steps">  <span class="step-on">验证手机</span> <span class="step-on">完成绑定</span> </p> <p class="tc fc-333 fs-14 step-tip"> <i class="icon-face-smile-orange"></i> <b>恭喜您，手机<label id="J_mobilePhone" class="fc-f60">', 
        n += t(a), n += '</label>绑定成功！</b> </p> <p class="tc fc-8c8 step-tip">现在开始，您可以用该手机号码来登录金海马商城了</p> </div>', 
        new o(n);
    }), s("tplSetPhoneTwo", '<div class="set-phone-form"> <p class="set-phone-steps">  <span class="step-on">验证手机</span> <span class="step-off">完成绑定</span> </p> <p class="tc fc-333 step-tip">请确保您的手机能正常接收短信，验证成功，新手机才能生效。</p> <div class="step-tr"> <p id="J_stepPhone" class="step-input-wrap w178"> <input type="text" name="stepTwoPhone" placeholder="请输入手机号码" class="JQ_editPassOption"> </p> <p class="edit-pass-tip"></p> </div> <div class="step-tr clearfix"> <p id="J_stepPhoneCode" class="step-input-wrap w78 fl"> <input type="text" name="stepTwoPhoneCode" placeholder="输入验证码" class="JQ_editPassOption"> </p> <p class="step-code-wrap fl"> <a id="J_getPhoneCode" href="javascript:void(0);" class="phone-code-btn"> 获取手机验证码 </a> <a id="J_codeWait" href="javascript:void(0);" class="phone-code-btn-gray"> <label id="J_subTimeWrap" class="fc-f60">60</label>秒 </a> </p> <div class="clear"></div> <p class="edit-pass-tip"></p> </div> </div>');
}();