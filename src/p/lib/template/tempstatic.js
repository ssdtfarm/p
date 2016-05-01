!function() {
    function t(t, e) {
        return (/string|function/.test(typeof e) ? a : r)(t, e);
    }
    function e(t, l) {
        return "string" != typeof t && (l = typeof t, "number" === l ? t += "" : t = "function" === l ? e(t.call(t)) : ""), 
        t;
    }
    function l(t) {
        return p[t];
    }
    function s(t) {
        return e(t).replace(/&(?![\w#]+;)|[<>"']/g, l);
    }
    function i(t, e) {
        if (f(t)) for (var l = 0, s = t.length; s > l; l++) e.call(t, t[l], l, t); else for (l in t) e.call(t, t[l], l);
    }
    function n(t, e) {
        var l = /(\/)[^/]+\1\.\.\1/, s = ("./" + t).replace(/[^/]+$/, ""), i = s + e;
        for (i = i.replace(/\/\.\//g, "/"); i.match(l); ) i = i.replace(l, "/");
        return i;
    }
    function r(e, l) {
        var s = t.get(e) || c({
            filename: e,
            name: "Render Error",
            message: "Template not found"
        });
        return l ? s(l) : s;
    }
    function a(t, e) {
        if ("string" == typeof e) {
            var l = e;
            e = function() {
                return new o(l);
            };
        }
        var s = d[t] = function(l) {
            try {
                return new e(l, t) + "";
            } catch (s) {
                return c(s)();
            }
        };
        return s.prototype = e.prototype = u, s.toString = function() {
            return e + "";
        }, s;
    }
    function c(t) {
        var e = "{Template Error}", l = t.stack || "";
        if (l) l = l.split("\n").slice(0, 2).join("\n"); else for (var s in t) l += "<" + s + ">\n" + t[s] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(e + "\n\n" + l), e;
        };
    }
    var d = t.cache = {}, o = this.String, p = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, f = Array.isArray || function(t) {
        return "[object Array]" === {}.toString.call(t);
    }, u = t.utils = {
        $helpers: {},
        $include: function(t, e, l) {
            return t = n(l, t), r(t, e);
        },
        $string: e,
        $escape: s,
        $each: i
    }, h = t.helpers = u.$helpers;
    t.get = function(t) {
        return d[t.replace(/^\.\//, "")];
    }, t.helper = function(t, e) {
        h[t] = e;
    }, "function" == typeof define ? define(function() {
        return t;
    }) : "undefined" != typeof exports ? module.exports = t : this.template = t, t("tplGetPointsRules", '<div id="J_getPointsRules" class="points-rules-section"> <div class="points-rules-title-line"> <span class="points-rules-title"><i class="icon-star-on"></i>积分获取规则<i class="icon-star-on"></i></span> </div> <ul class="points-rules-list"> <li class="item"><i class="icon-star-333"></i>积分不得进行任何转让，只可兑换实物或虚拟商品，不可兑现。</li> <li class="item"><i class="icon-star-333"></i>有效期默认为一年，由积分获取当日开始计算有效期。特殊积分的有效期会有相应提示。</li> </ul> </div> '), 
    t("tplGrowthLevel", '<div class="explain-title-line"> <p class="section-title"><i class="icon-growth"></i><b>成长值说明</b><i class="before"></i><i class="after"></i></p> </div> <div class="growth-value-container"> <p class="growth-value"> <b>1元=1成长值</b> </p> <p class="explain-msg">会员成长值主要是金海马会员在金海马商城购物所获得的经验值</p> </div> '), 
    t("tplGrowthLevelRule", '<div class="explain-title-line"> <p class="section-title">会员等级规则<i class="before"></i><i class="after"></i></p> </div> <table class="level-rule-table" border="0" cellpadding="0" cellspacing="0"> <thead> <tr> <td>会员级别</td> <td>会员等级名称</td> <td>成长值范围</td> <td>级别有效期</td> </tr> </thead> <tbody> <tr> <th><i class="icon-level-k0"></i></th> <td>Q萌学徒</td> <td>0</td> <td>永久</td> </tr> <tr> <th><i class="icon-level-k1"></i></th> <td>俏皮工匠</td> <td>1-4999</td> <td>永久</td> </tr> <tr> <th><i class="icon-level-k2"></i></th> <td>造诣大师</td> <td>5000-19999</td> <td>有效期1年，一年之后扣除2000成长值，根据剩余成长值调整会员级别</td> </tr> <tr> <th><i class="icon-level-k3"></i></th> <td>一代宗师</td> <td>20000-49999</td> <td>有效期1年，一年之后扣除8000成长值，根据剩余成长值调整会员级别</td> </tr> <tr> <th><i class="icon-level-k4"></i></th> <td>鼻祖鲁班</td> <td>50000及以上</td> <td>有效期1年，一年之后扣除20000成长值，根据剩余成长值调整会员级别</td> </tr> </tbody> </table> '), 
    t("tplGrowthLevelUp", '<div class="explain-title-line"> <p class="section-title"><i class="icon-member-vip"></i><b>会员升级条件</b><i class="before"></i><i class="after"></i></p> </div> <table class="level-up-table" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <th><i class="icon-level-title-k0"></i></th> <th><i class="icon-level-title-k1"></i></th> <th><i class="icon-level-title-k2"></i></th> <th><i class="icon-level-title-k3"></i></th> <th><i class="icon-level-title-k4"></i></th> </tr> <tr> <td>成功注册且登陆过金海马任一平台的用户（金海马PC版商城、WAP版商城等）</td> <td>产生至少一笔交易的会员，且会员成长值小于4999</td> <td>会员成长值大于等于5000，且小于19999的会员</td> <td>会员成长值大于等于20000，且小于49999的会员</td> <td>会员成长值大于等于50000的会员</td> </tr> </tbody> </table> '), 
    t("tplHowGetPoints", '<div class="how-get-points-title"> <p class="title">如何获取积分<i class="before"></i><i class="after"></i></p> </div> <table class="how-get-points-table" border="0" cellpadding="0" cellspacing="0"> <thead> <tr> <td>领取途径</td> <td>获得积分</td> <td>要求说明</td> </tr> </thead> <tbody> <tr> <td>注册成功</td> <td class="fc-f60">50</td> <td class="explain-sp">只要成功注册为金海马商城会员，适用于所有注册用户</td> </tr> <tr> <td rowspan="4">登录</td> <td class="fc-f60">5</td> <td class="explain-sp">同一天内登陆多次，只记录初次登陆的积分，同一天不同平台的登陆，只记录一次。</td> </tr> <tr> <td class="fc-f60">5+</td> <td class="explain-sp">连续登陆每天递增5积分，最高每天可获得20积分，若出现中断，回到初始值每日5积分。</td> </tr> <tr> <td class="fc-f60">100</td> <td class="explain-sp">通过下载APP，初次登陆奖励100积分，可与PC端连续登陆获取积分叠加。</td> </tr> <tr> <td class="fc-f60">100</td> <td class="explain-sp">通过微信绑定会员账号，初次绑定登陆奖励100积分</td> </tr> <tr> <td>商品评价</td> <td class="fc-f60">50</td> <td class="explain-sp">截图好评，每次获取50积分，最高可获得500积分。</td> </tr> <tr> <td>购物积分奖励</td> <td class="fc-f60">1元=1积分</td> <td class="explain-sp"><span>购物付款每1元返1个积分。</span><a class="rule-href" href="http://www.kinhom.com/" target="_blank"> 立即获取<i>></i></a></td> </tr> <tr> <td>返积分商品额外奖励</td> <td class="fc-f60">购物积分+额外积分</td> <td class="explain-sp"><span>在金海马积分商城中购买返积分商品，除了购物积分外，确认收货后还能够获得额外积分。</span><a class="rule-href" href="http://my.kinhom.com/club/integralshop" target="_blank"> 立即获取<i>></i></a></td> </tr> </tbody> </table> ');
}();