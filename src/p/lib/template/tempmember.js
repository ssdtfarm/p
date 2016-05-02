!function() {
    function a(a, e) {
        return (/string|function/.test(typeof e) ? n : s)(a, e);
    }
    function e(a, t) {
        return "string" != typeof a && (t = typeof a, "number" === t ? a += "" : a = "function" === t ? e(a.call(a)) : ""), 
        a;
    }
    function t(a) {
        return f[a];
    }
    function i(a) {
        return e(a).replace(/&(?![\w#]+;)|[<>"']/g, t);
    }
    function r(a, e) {
        if (p(a)) for (var t = 0, i = a.length; i > t; t++) e.call(a, a[t], t, a); else for (t in a) e.call(a, a[t], t);
    }
    function l(a, e) {
        var t = /(\/)[^\/]+\1\.\.\1/, i = ("./" + a).replace(/[^\/]+$/, ""), r = i + e;
        for (r = r.replace(/\/\.\//g, "/"); r.match(t); ) r = r.replace(t, "/");
        return r;
    }
    function s(e, t) {
        var i = a.get(e) || c({
            filename: e,
            name: "Render Error",
            message: "Template not found"
        });
        return t ? i(t) : i;
    }
    function n(a, e) {
        if ("string" == typeof e) {
            var t = e;
            e = function() {
                return new o(t);
            };
        }
        var i = d[a] = function(t) {
            try {
                return new e(t, a) + "";
            } catch (i) {
                return c(i)();
            }
        };
        return i.prototype = e.prototype = u, i.toString = function() {
            return e + "";
        }, i;
    }
    function c(a) {
        var e = "{Template Error}", t = a.stack || "";
        if (t) t = t.split("\n").slice(0, 2).join("\n"); else for (var i in a) t += "<" + i + ">\n" + a[i] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(e + "\n\n" + t), e;
        };
    }
    var d = a.cache = {}, o = this.String, f = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, p = Array.isArray || function(a) {
        return "[object Array]" === {}.toString.call(a);
    }, u = a.utils = {
        $helpers: {},
        $include: function(a, e, t) {
            return a = l(t, a), s(a, e);
        },
        $string: e,
        $escape: i,
        $each: r
    }, m = a.helpers = u.$helpers;
    a.get = function(a) {
        return d[a.replace(/^\.\//, "")];
    }, a.helper = function(a, e) {
        m[a] = e;
    }, "function" == typeof define ? define(function() {
        return a;
    }) : "undefined" != typeof exports ? module.exports = a : this.template = a, a("tplMemberAside", '<aside class="member-aside"> <dl class="member-aside-icons">  <dt class="member-aside-info"> <a href="javascript:void(0);"><img src="//misc.jjcdn.com/p/images/member-default-portrait.gif" width="100" height="100" /></a> <p>晚上好，沙发君</p> </dt>  <dt class="member-aside-item item-on"> <a href="javascript:void(0);"> <i class="m-icon icon-customer"></i> <label>我的金海马</label> </a> </dt>  <dt class="member-aside-item"> <a href="javascript:void(0);"> <i class="m-icon icon-order"></i> <label>我的订单</label> </a> </dt>  <dt class="member-aside-item"> <a href="javascript:void(0);"> <i class="m-icon icon-coupon"></i> <label>我的优惠券</label> </a> </dt>  <dt class="member-aside-item"> <a href="javascript:void(0);"> <i class="m-icon icon-favorite"></i> <label>我的收藏</label> </a> </dt>  <dt class="member-aside-item"> <span> <i class="m-icon icon-service"></i> <label>售后管理</label> </span> </dt> <dd class="member-aside-list"> <a href="javascript:void(0);">退款管理</a> <a href="javascript:void(0);">售后管理</a> </dd>  <dt class="member-aside-item"> <span> <i class="m-icon icon-config"></i> <label>账户设置</label> </span> </dt> <dd class="member-aside-list"> <a href="javascript:void(0);" class="on">账号信息与安全</a> <a href="javascript:void(0);">个人信息</a> <a href="javascript:void(0);">收货地址</a> </dd> </dl> </aside>'), 
    a("tplRefundForm", function(a, e) {
        "use strict";
        var t = this, i = (t.$helpers, t.$escape), r = a.applyTypeText, l = a.applyType, s = a.applyReasonText, n = a.applyReason, c = a.applyAmount, d = a.applyNote, f = a.i, p = a.pictures, u = "";
        u += '<div class="refund-form"> <form action="javascript:void(0);" method="post"> <table cellpadding="0" cellspacing="0" width="100%"> <tr class="refund-form-tr clearfix"> <td width="25%" align="right"><label class="refund-form-th">请选择售后服务类型：</label></td> <td width="75%"> <div id="J_selectType" class="select-gray"> <i class="select-corner icon-gray-left"></i> <label class="JQ_option select-option w130">', 
        u += i(r), u += '</label> <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul> <li><a href="javascript:void(0);" data-value="0">仅退款</a></li> <li><a href="javascript:void(0);" data-value="1">退款退货</a></li> <li><a href="javascript:void(0);" data-value="2">换货</a></li> <li><a href="javascript:void(0);" data-value="3">维修</a></li> </ul> <input type="hidden" name="applyType" value="', 
        u += i(l), u += '" /> </div> </td> </tr> <tr class="refund-form-tr clearfix"> <td width="25%"><label class="refund-form-th">退款/售后原因：</label></td> <td width="75%"> <div id="J_selectReason" class="select-gray"> <i class="select-corner icon-gray-left"></i> <label class="JQ_option select-option w130">', 
        u += i(s), u += '</label> <i class="select-corner icon-gray-right"></i> <a id="J_applyReason" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul> <li><a href="javascript:void(0);" data-value="0">信息有误，重新购买</a></li> <li><a href="javascript:void(0);" data-value="1">商品质量问题</a></li> <li><a href="javascript:void(0);" data-value="2">物流配送问题</a></li> <li><a href="javascript:void(0);" data-value="3">需要去实体店看看</a></li> <li><a href="javascript:void(0);" data-value="4">协商一致退款</a></li> <li><a href="javascript:void(0);" data-value="5">其他原因</a></li> </ul> <input type="hidden" name="applyReason" value="', 
        u += i(n), u += '" /> </div> </td> </tr> <tr class="refund-form-tr clearfix"> <td width="25%"><label class="refund-form-th">退款/售后金额：</label></td> <td width="75%"><input id="J_applyAmount" type="text" class="refund-form-amount" name="applyAmount" value="', 
        u += i(c), u += '" /></td> </tr> <tr class="refund-form-tr clearfix"> <td width="25%" valign="top"><label class="refund-form-th">退款/售后说明：</label></td> <td width="75%"><textarea id="J_applyNode" type="text" class="refund-form-note" name="applyNote" >', 
        u += i(d), u += '</textarea></td> </tr> <tr class="refund-form-tr clearfix"> <td width="25%"><label class="refund-form-th">上传凭证：</label></td> <td width="75%"> <a id="J_uploadBtn" href="javascript:void(0);" class="btn-130x30 btn-orange margin-left">上传图片</a> <a id="J_uploadBtnHide" href="javascript:void(0);" class="btn-130x30 btn-gray margin-left">上传图片</a> </td> </tr> <tr class="refund-form-tr clearfix"> <td width="25%"><label class="refund-form-th">&nbsp;</label></td> <td width="75%"> <ul id="J_itemPicWrap" class="refund-form-pictures clearfix"> ';
        for (var f = 0; f < p.length; f++) u += ' <li class="JQ_pictureItem"> <img src="', 
        u += i(p[f].thumbPic), u += '" width="100" height="80"> <span class="item-mark"> <a href="javascript:void(0);" class="icon-refund-delete JQ_delPic">删除</a> <a href="', 
        u += i(p[f].bigPic), u += '" class="icon-refund-find JQ_blowUpPic" target="_blank">放大</a> </span> </li> ';
        return u += ' </ul> </td> </tr> <tr class="refund-form-tr clearfix"> <td width="25%"><label class="refund-form-th">&nbsp;</label></td> <td width="75%"><span class="fc-8c8">每张图片大小不超过5M，最多3张，支持GIF、JPG、PNG、BMP格式</span></td> </tr> </table> </form> </div>', 
        new o(u);
    });
}();