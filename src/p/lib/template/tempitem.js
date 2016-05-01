!function() {
    function e(e, t) {
        return (/string|function/.test(typeof t) ? c : r)(e, t);
    }
    function t(e, a) {
        return "string" != typeof e && (a = typeof e, "number" === a ? e += "" : e = "function" === a ? t(e.call(e)) : ""), 
        e;
    }
    function a(e) {
        return p[e];
    }
    function s(e) {
        return t(e).replace(/&(?![\w#]+;)|[<>"']/g, a);
    }
    function i(e, t) {
        if (h(e)) for (var a = 0, s = e.length; s > a; a++) t.call(e, e[a], a, e); else for (a in e) t.call(e, e[a], a);
    }
    function l(e, t) {
        var a = /(\/)[^/]+\1\.\.\1/, s = ("./" + e).replace(/[^/]+$/, ""), i = s + t;
        for (i = i.replace(/\/\.\//g, "/"); i.match(a); ) i = i.replace(a, "/");
        return i;
    }
    function r(t, a) {
        var s = e.get(t) || n({
            filename: t,
            name: "Render Error",
            message: "Template not found"
        });
        return a ? s(a) : s;
    }
    function c(e, t) {
        if ("string" == typeof t) {
            var a = t;
            t = function() {
                return new o(a);
            };
        }
        var s = d[e] = function(a) {
            try {
                return new t(a, e) + "";
            } catch (s) {
                return n(s)();
            }
        };
        return s.prototype = t.prototype = m, s.toString = function() {
            return t + "";
        }, s;
    }
    function n(e) {
        var t = "{Template Error}", a = e.stack || "";
        if (a) a = a.split("\n").slice(0, 2).join("\n"); else for (var s in e) a += "<" + s + ">\n" + e[s] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(t + "\n\n" + a), t;
        };
    }
    var d = e.cache = {}, o = this.String, p = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, h = Array.isArray || function(e) {
        return "[object Array]" === {}.toString.call(e);
    }, m = e.utils = {
        $helpers: {},
        $include: function(e, t, a) {
            return e = l(a, e), r(e, t);
        },
        $string: t,
        $escape: s,
        $each: i
    }, f = e.helpers = m.$helpers;
    e.get = function(e) {
        return d[e.replace(/^\.\//, "")];
    }, e.helper = function(e, t) {
        f[e] = t;
    }, "function" == typeof define ? define(function() {
        return e;
    }) : "undefined" != typeof exports ? module.exports = e : this.template = e, e("tplItemAddress", function(e, t) {
        "use strict";
        var a = this, s = (a.$helpers, a.$escape), i = e.defaultPro, l = e.defaultCity, r = e.defaultArea, c = e.defaultProID, n = e.defaultCityID, d = e.defaultAreaID, p = "";
        return p += '<div class="item-address"> <div id="J_addressLabel" class="address-label"> <div id="J_label">', 
        p += s(i), p += s(l), p += s(r), p += '</div> <i class="icon-select-down"></i> </div> <div id="J_selector" class="address-selector">  <a id="J_close" href="javascript:void(0);" class="address-close icon-address-close"></a>  <div id="J_selectorNav" class="selector-nav"> <a class="JQ_navItem" href="javascript:void(0);"> <span class="JQ_pro" data-id="', 
        p += s(c), p += '">', p += s(i), p += '</span> <i class="icon-select-down-small"></i> </a> <a class="JQ_navItem" href="javascript:void(0);"> <span class="JQ_city" data-id="', 
        p += s(n), p += '">', p += s(l), p += '</span> <i class="icon-select-down-small"></i> </a> <a class="JQ_navItem on" href="javascript:void(0);"> <span class="JQ_area" data-id="', 
        p += s(d), p += '">', p += s(r), p += '</span> <i class="icon-select-down-small"></i> </a> <span class="selector-nav-blank"></span> </div>  <div id="J_selectorList" class="selector-list">  <ul class="JQ_selectorItem_0 dis-none clearfix"> <div class="loading"><i></i></div> </ul> <ul class="JQ_selectorItem_1 dis-none clearfix"> <div class="loading"><i></i></div> </ul> <ul class="JQ_selectorItem_2 clearfix"> <div class="loading"><i></i></div> </ul> </div> </div> </div> ', 
        new o(p);
    }), e("tplItemBid", function(e, t) {
        "use strict";
        var a = this, s = (a.$helpers, e.list), i = e.j, l = a.$escape, r = "";
        if (0 == s.length) r += ' <p class="tc">暂时没有成交记录</p> '; else {
            r += ' <table class="bid-history"> <thead> <tr> <th>买家</th> <th>商品名称</th> <th>成交数量</th> <th>成交时间</th> </tr> </thead> <tbody> ';
            for (var i = 0; i < s.length; i++) r += ' <tr> <td class="fc-2f6"> ', r += l(s[i].buyer), 
            r += " </td> <td> ", r += l(s[i].title), r += " </td> <td> ", r += l(s[i].num), 
            r += " </td> <td> ", r += l(s[i].time), r += " </td> </tr> ";
            r += " </tbody> </table> ";
        }
        return new o(r);
    }), e("tplItemComments", function(e, t) {
        "use strict";
        var a = this, s = (a.$helpers, e.list), i = e.i, l = a.$escape, r = e.j, c = e.k, n = e.h, d = "";
        if (0 == s.length) d += ' <p class="tc">暂时没有评价</p> '; else {
            d += " ";
            for (var i = 0; i < s.length; i++) {
                if (d += ' <dl class="item-comments-list clearfix"> <dt> <p class="comments-list-img"><img src="', 
                d += l(s[i].imgURL), d += '" width="60" height="60"></p> <p class="fc-2f6"> ', d += l(s[i].buyer), 
                d += ' </p> </dt> <dd> <p class="comments-list-info"> <span class="comments-evaluate-star"> ', 
                s[i].evalStar) {
                    d += " ";
                    for (var r = 0; r < s[i].evalStar; r++) d += ' <i class="icon-star-on" data-star="', 
                    d += l(r), d += '"></i> ';
                    if (d += " ", s[i].evalStar < 5) {
                        d += " ";
                        for (var c = 0; 5 - r > c; c++) d += ' <i class="icon-star-off" data-star="', d += l(c), 
                        d += '"></i> ';
                        d += " ";
                    }
                    d += " ";
                }
                if (d += ' </span> <span class="comments-list-time">', d += l(s[i].time), d += '</span> </p> <p class="comments-list-content"> ', 
                d += l(s[i].content), d += ' </p> <p class="comments-list-goods"> ', d += l(s[i].goodsInfo), 
                d += " </p> ", s[i].evalImgURL) {
                    d += ' <div class="comments-img-share"> <ul class="img-list"> ';
                    for (var n = 0; n < s[i].evalImgURL.length; n++) d += ' <li class="img-item JQ_imgItem"><img src="', 
                    d += l(s[i].evalImgURL[n]), d += '"></li> ';
                    d += ' </ul> <p class="show-img JQ_showImg"></p> </div> ';
                }
                d += " </dd> </dl> ";
            }
            d += " ";
        }
        return d += " ", new o(d);
    }), e("tplItemFloorAd", function(e, t) {
        "use strict";
        var a = this, s = (a.$helpers, a.$escape), i = e.listType, l = e.i, r = e.list, c = "";
        c += '<div class="item-floor-ad"> <ul class="floor-list ad-type-', c += s(i), c += '"> ';
        for (var l = 0; l < r.length; l++) c += ' <li class="ad-pro-item"> <a href="', c += s(r[l].proLink), 
        c += '" class="pro-link"> <img src="', c += s(r[l].imgSrc), c += '" alt="', c += s(r[l].imgAlt), 
        c += '" class="pro-img"> <div class="title-mark"></div> <p class="pro-title">', 
        c += s(r[l].proTitle), c += '</p> <div class="price-info"> <p class="txt-1">市场价&yen;<span class="marky-price">', 
        c += s(r[l].markyPrice), c += '</span></p> <p class="txt-2">&yen;&nbsp;', c += s(r[l].proPrice), 
        c += "</p> </div> </a> </li> ";
        return c += " </ul> </div>", new o(c);
    }), e("tplItemGuestLike", function(e, t) {
        "use strict";
        var a = this, s = (a.$helpers, e.list), i = e.i, l = a.$escape, r = "";
        if (r += '<dl class="item-guest-like"> <dt class="guest-like-title"> <span>猜·你·喜·欢</span> </dt> <dt class="guest-like-subtitle">MAYBE YOU LIKE</dt> <dd class="guest-like-list"> ', 
        0 != s.length) {
            r += " ";
            for (var i = 0; i < s.length; i++) r += ' <dl class="guest-like-item"> <dd> <a href="', 
            r += l(s[i].linkURL), r += '" target="_blank"> <img class="lazy" data-original="', 
            r += l(s[i].imgURL), r += '!small" alt="', r += l(s[i].title), r += '" width="200" height="133" /> </a> </dd> <dt> <a href="', 
            r += l(s[i].linkURL), r += '" title="', r += l(s[i].title), r += '" target="_blank">', 
            r += l(s[i].title), r += '</a> </dt> <dd class="clearfix"> <label>&yen;', r += l(s[i].salePrice), 
            r += "</label> <span>", r += l(s[i].commentNum), r += "人评价</span> </dd> </dl> ";
            r += " ";
        }
        return r += ' </dd> </dl> <div class="blank-20"></div>', new o(r);
    }), e("tplItemHistory", function(e, t) {
        "use strict";
        var a = this, s = (a.$helpers, e.hasMt), i = e.i, l = e.list, r = a.$escape, c = "";
        c += '<dl class="item-history ', s && (c += "mt-20"), c += '"> <dt> <span>最近浏览</span> </dt> <dd> <ul class="clearfix"> ';
        for (var i = 0; i < l.length; i++) c += ' <li> <a href="', c += r(l[i].linkURL), 
        c += '"><img src="', c += r(l[i].imgURL), c += '!small" alt="', c += r(l[i].title), 
        c += '" width="152" height="102" /></a> <a class="item-history-title" href="', c += r(l[i].linkURL), 
        c += '" title="', c += r(l[i].title), c += '">', c += r(l[i].title), c += '</a> <p class="item-history-store clearfix"> <label class="fl fc-f60">&yen;', 
        c += r(l[i].salePrice), c += '</label> <span class="fr"> <span class="fc-8c8">已售</span> <span class="fc-f60">', 
        c += r(l[i].saleNum), c += "件</span></span> </p> </li> ";
        return c += " </ul> </dd> </dl>", new o(c);
    }), e("tplItemHot", function(e, t) {
        "use strict";
        var a = this, s = (a.$helpers, e.list), i = e.i, l = a.$escape, r = "";
        if (r += '<dl class="item-hot-sale"> <dt class="hot-sale-title"> <span>同·类·热·销</span> </dt> <dt class="hot-sale-subtitle">TOP RECOMMEND</dt> <dd class="hot-sale-list"> ', 
        0 != s.length) {
            r += " ";
            for (var i = 0; i < s.length; i++) r += ' <dl class="hot-list-item"> <dd> <a href="', 
            r += l(s[i].linkURL), r += '" target="_blank"> <img class="lazy" src="', r += l(s[i].imgURL), 
            r += '!small" alt="', r += l(s[i].title), r += '" width="200" height="133" /> </a> </dd> <dt> <a href="', 
            r += l(s[i].linkURL), r += '" title="', r += l(s[i].title), r += '" target="_blank">', 
            r += l(s[i].title), r += '</a> </dt> <dd class="clearfix"> <label>优惠价: &yen;', r += l(s[i].salePrice), 
            r += '</label> </dd> <span class="list-item-nums">热销<br />', r += l(s[i].saleNum), 
            r += "件</span> </dl> ";
            r += " ";
        }
        return r += ' </dd> </dl> <div class="blank-20"></div>', new o(r);
    }), e("tplItemPage", function(e, t) {
        "use strict";
        var a = this, s = (a.$helpers, e.list), i = e.curPage, l = a.$escape, r = e.j, c = e.sPage, n = e.ePage, d = e.pages, p = e.nextPage, h = "";
        if (0 != s.length) {
            h += ' <div class="item-page"> <a href="javascript:void(0);" data-page="1">首页</a> ', 
            1 >= i ? h += ' <a href="javascript:void(0);" data-page="1">上一页</a> ' : (h += ' <a href="javascript:void(0);" data-page="', 
            h += l(i - 1), h += '">上一页</a> '), h += " ", i >= 4 && (h += ' <a href="javascript:void(0);" data-page="1">1</a> <span>...</span> '), 
            h += " ";
            for (var r = c; n > r; r++) h += ' <a href="javascript:void(0);" ', r == i && (h += 'class="cur"'), 
            h += ' data-page="', h += l(r), h += '">', h += l(r), h += "</a> ";
            h += " ", i == d ? (h += ' <a href="javascript:void(0);" class="cur" data-page="', 
            h += l(d), h += '">', h += l(d), h += "</a> ") : (h += ' <span>...</span> <a href="javascript:void(0);" data-page="', 
            h += l(d), h += '">', h += l(d), h += "</a> "), h += ' <a href="javascript:void(0)" data-page="', 
            h += l(p), h += '">下一页</a> <a href="javascript:void(0)" data-page="', h += l(d), 
            h += '">末页</a> </div> ';
        }
        return new o(h);
    }), e("tplItemRebateShare", function(e, t) {
        "use strict";
        var a = this, s = (a.$helpers, a.$escape), i = e.shareImg, l = e.shareName, r = e.percent, c = e.shareUrl, n = "";
        return n += '<div class="rebate-share-dialog"> <div class="share-qrcode" id="J_qrcode"> <img src="" alt=""> <span>扫码分享</span> </div> <div class="share-other"> <div class="share-social"> <h6>直接分享：</h6> <ul class="clearfix" id="J_share"> <li class="qq" data-type="qq"><dl data-type="qq"><dt data-type="qq"></dt><dd data-type="qq">QQ</dd></dl></li> <li class="qzone" data-type="qzone"><dl data-type="qzone"><dt data-type="qzone"></dt><dd data-type="qzone">QQ空间</dd></dl></li>  <li class="weibo" data-type="weibo"><dl data-type="weibo"><dt data-type="weibo"></dt><dd data-type="weibo">新浪微博</dd></dl></li> </ul> </div> <div class="share-copy"> <h6>复制分享：</h6> <dl> <dt><img src="', 
        n += s(i), n += '" alt="" /></dt> <dd> <textarea name="" id="J_shareDscr">亲~这是我推荐给您的商品：', 
        n += s(l), n += "，购买可获", n += s(r), n += "%返利哦！", n += s(c), n += '</textarea> </dd> </dl> <div> <button id="J_copy">复制分享</button> <span>可直接复制上面内容</span> </div> </div> </div> </div>', 
        new o(n);
    }), e("tplItemRecomment", function(e, t) {
        "use strict";
        var a = this, s = (a.$helpers, e.hotList), i = e.recList, l = a.$escape, r = e.apiPath, c = e.itemLinkURL, n = e.itemImgURL, d = e.itemTitle, p = e.itemPrice, h = e.itemMarketPrice, m = e.itemSkuID, f = e.i, v = e.skuID, u = e.j, g = "";
        if (s || i) {
            if (g += ' <nav id="J_hotTitle" class="recommend-tab-title clearfix"> ', g += s ? ' <a href="javascript:void(0)" class="tab-item on">人气搭配</a> <a href="javascript:void(0)" class="tab-item">同类推荐</a> ' : ' <a href="javascript:void(0)" class="tab-item on">同类推荐</a> ', 
            g += ' </nav> <section id="J_hotContent" class="recommend-tab-content"> ', s) {
                g += ' <form id="J_hotForm" action="', g += l(r), g += '/addCarts" method="post" target="_blank"> <dl class="item-recomment-hot JQ_tabContent"> <dd class="recoment-hot-left"> <p class="recomment-hot-img"> <a href="', 
                g += l(c), g += '" target="_blank"> <img src="', g += l(n), g += '!small" class="lazy" alt="', 
                g += l(d), g += '" width="165" height="110" /> </a> </p> <p class="recomment-hot-title"> <a href="', 
                g += l(c), g += '" target="_blank"> ', g += l(d), g += ' </a> </p> <p class="recomment-hot-price">&yen; ', 
                g += l(p), g += ' </p> <span class="recomment-hot-add">+</span> <input type="hidden" name="itemPrice" value="', 
                g += l(p), g += '" /> <input type="hidden" name="itemMarketPrice" value="', g += l(h), 
                g += '" /> <input type="hidden" name="itemSkuID" value="', g += l(m), g += '" /> </dd> <dd class="recomment-hot-main">  <div id="J_hotSlider" class="recomment-slider"> <div class="hd"> <ul></ul> </div> <div class="bd"> <ul> ';
                for (var f = 0; f < s.length; f++) g += ' <li> <p> <a href="', g += l(s[f].linkURL), 
                g += '" target="_blank"> <img src="', g += l(s[f].imgURL), g += '!small" alt="', 
                g += l(s[f].title), g += '" class="lazy" width="165" height="110"> </a> </p> <p class="recomment-slider-title"> <a href="', 
                g += l(s[f].linkURL), g += '" target="_blank"> ', g += l(s[f].title), g += ' </a> </p> <p class="recoment-slider-text clearfix"> <a href="javascript:void(0);" class="item-hot-check-off vtm JQ_hotCheck"></a> <label class="fc-f60 fs-14">&yen; ', 
                g += l(s[f].salePrice), g += ' </label> </p> <p class="fc-333 recoment-slider-form"> <input type="checkbox" style="display: none;" name="hotItem" /> <input type="hidden" name="hotNum" value="1" /> <input type="hidden" value="', 
                g += l(s[f].storePrice), g += '" name="storePrice" /> <input type="hidden" value="', 
                g += l(s[f].salePrice), g += '" name="salePrice" /> <input type="hidden" value="', 
                g += l(s[f].skuId), g += '" name="skuID" /> </p> </li> ';
                g += ' </ul> </div> <a href="javascript:void(0)" class="prev item-hot-point-up">上一页</a> <a href="javascript:void(0)" class="next item-hot-point-down">下一页</a> </div> </dd> <dd class="recomment-hot-right"> <p class="hot-right-choice"> <span id="J_choiceNum" class="fc-f60">0</span>件商品搭配购买 </p> <p class="hot-all-price"> 搭配价：<span id="J_hotAllPrice" class="fc-f60 fs-18">&yen;', 
                g += l(p), g += '</span> </p> <p class="hot-off-price"> 立省：<span id="J_offPriceCount">&yen;', 
                g += l((h - p).toFixed(2)), g += '</span> </p> <p class="hot-market-price"> 原价：<span id="J_marketPriceCount">&yen;', 
                g += l(p), g += '</span> </p> <input type="hidden" name="skuArr" value="', g += l(v), 
                g += '" /> <input type="hidden" name="numArr" value="1" /> <p class="hot-choice-btn"> <a href="javascript:void(0)" id="J_hotBtnCart" class="hot-btn-cart">组合购买</a> </p> </dd> </dl> </form> ';
            } else g += " ";
            if (g += " ", i) {
                g += ' <dl class="dis-none JQ_tabContent"> <dd id="J_recommentSlider" class="similar-recomment-slider"> <div class="hd"> <ul></ul> </div> <div class="bd"> <ul class="clearfix"> ';
                for (var u = 0; u < i.length; u++) g += ' <li> <p> <a href="', g += l(i[u].linkURL), 
                g += '" target="_blank"> <img src="', g += l(i[u].imgURL), g += '!small" class="lazy" alt="', 
                g += l(i[u].title), g += '" width="165" height="110"> </a> </p> <p class="recomment-slider-title"> <a href="', 
                g += l(i[u].linkURL), g += '" target="_blank"> ', g += l(i[u].title), g += ' </a> </p> <p class="tc fc-f60 fs-14">&yen; ', 
                g += l(i[u].salePrice), g += " </p> </li> ";
                g += " </ul> </div> ", i.length > 5 && (g += ' <a href="javascript:void(0)" class="prev icon-item-rec-prev">上一页</a> <a href="javascript:void(0)" class="next icon-item-rec-next">下一页</a> '), 
                g += " </dd> </dl> ";
            } else g += " ";
            g += ' </section> <div class="blank-20"></div> ';
        } else g += " ";
        return new o(g);
    }), e("tplItemService", function(e, t) {
        "use strict";
        var a = this, s = (a.$helpers, e.sell), i = e.i, l = e.list, r = a.$escape, c = e.message, n = "";
        if (s) {
            n += " ";
            for (var i = 0; i < l.length; i++) n += ' <span href="javascript:void(0);" class="service-text">', 
            n += r(l[i].name), n += "<label>&yen;", n += r(l[i].price), n += "</label></span> ";
            n += " ";
        } else n += ' <span href="javascript:void(0);" class="service-text">', n += r(c), 
        n += "</span> ";
        return n += " ", new o(n);
    });
}();