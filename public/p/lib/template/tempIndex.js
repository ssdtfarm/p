!function() {
    function a(a, s) {
        return (/string|function/.test(typeof s) ? n : r)(a, s);
    }
    function s(a, l) {
        return "string" != typeof a && (l = typeof a, "number" === l ? a += "" : a = "function" === l ? s(a.call(a)) : ""), 
        a;
    }
    function l(a) {
        return o[a];
    }
    function i(a) {
        return s(a).replace(/&(?![\w#]+;)|[<>"']/g, l);
    }
    function t(a, s) {
        if (g(a)) for (var l = 0, i = a.length; i > l; l++) s.call(a, a[l], l, a); else for (l in a) s.call(a, a[l], l);
    }
    function e(a, s) {
        var l = /(\/)[^/]+\1\.\.\1/, i = ("./" + a).replace(/[^/]+$/, ""), t = i + s;
        for (t = t.replace(/\/\.\//g, "/"); t.match(l); ) t = t.replace(l, "/");
        return t;
    }
    function r(s, l) {
        var i = a.get(s) || c({
            filename: s,
            name: "Render Error",
            message: "Template not found"
        });
        return l ? i(l) : i;
    }
    function n(a, s) {
        if ("string" == typeof s) {
            var l = s;
            s = function() {
                return new d(l);
            };
        }
        var i = p[a] = function(l) {
            try {
                return new s(l, a) + "";
            } catch (i) {
                return c(i)();
            }
        };
        return i.prototype = s.prototype = h, i.toString = function() {
            return s + "";
        }, i;
    }
    function c(a) {
        var s = "{Template Error}", l = a.stack || "";
        if (l) l = l.split("\n").slice(0, 2).join("\n"); else for (var i in a) l += "<" + i + ">\n" + a[i] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(s + "\n\n" + l), s;
        };
    }
    var p = a.cache = {}, d = this.String, o = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, g = Array.isArray || function(a) {
        return "[object Array]" === {}.toString.call(a);
    }, h = a.utils = {
        $helpers: {},
        $include: function(a, s, l) {
            return a = e(l, a), r(a, s);
        },
        $string: s,
        $escape: i,
        $each: t
    }, m = a.helpers = h.$helpers;
    a.get = function(a) {
        return p[a.replace(/^\.\//, "")];
    }, a.helper = function(a, s) {
        m[a] = s;
    }, "function" == typeof define ? define( 'lib\template/tempIndex', [], function( require, exports, module){
        return a;
    }) : "undefined" != typeof exports ? module.exports = a : this.template = a, a("tplAnnualList", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, l.$escape), t = a.annualListTitle, e = a.i, r = a.list, n = a.j, c = a.len, p = a.ad, o = "";
        o += '  <div class="annualList-title"> <a href="', o += i(t.linkURL), o += '" target="_blank" title="', 
        o += i(t.pTitle), o += '"> <img class="lazy" data-original="', o += i(t.imgSRC), 
        o += '"/> </a> </div>   <ul class="annualList-hot-list clearfix"> ';
        for (var e = 0; 2 > e; e++) o += ' <li> <div class="pro-img"> <a href="', o += i(r[e].linkURL), 
        o += '" target="_blank" title="', o += i(r[e].pTitle), o += '"> ', "" != r[e].rTitle && (o += ' <div class="tag"><i></i><span class="tag-name">', 
        o += i(r[e].rTitle), o += "</span></div> "), o += ' <img class="lazy" data-original="', 
        o += i(r[e].imgSRC), o += '" alt="', o += i(r[e].seoAlt), o += '"/> </a> </div> <div class="pro-detail"> <div class="pro-detail-title"></div> <p class="taglines">', 
        o += i(r[e].slogan), o += '</p> <a class="pro-title" href="', o += i(r[e].linkURL), 
        o += '" target="_blank" title="', o += i(r[e].pTitle), o += '">', o += i(r[e].pTitle), 
        o += '</a> <div class="pro-price"> <dl class="market-price"> <dt>市场价</dt> <dd><i>&yen;</i><span>', 
        o += i(r[e].mPrice), o += '</span></dd> </dl> <dl class="act-price"> <dt>活动价</dt> <dd><i>&yen;</i><span>', 
        o += i(r[e].price), o += '</span></dd> </dl> <span class="line-through"></span> <a href="', 
        o += i(r[e].linkURL), o += '" target="_blank">立即抢购</a> </div> <div class="left-bg"></div> <div class="right-bg"></div> </div> </li> ';
        o += " </ul>   ";
        for (var n = 0, c = (r.length - 2) / 3; c > n; n++) {
            o += " ", o += n == c - 1 ? ' <ul class="annualList-hot-list annualList-list annualList-list-last clearfix"> ' : ' <ul class="annualList-hot-list annualList-list clearfix"> ', 
            o += " ";
            for (var e = 2; 5 > e; e++) o += ' <li> <div class="pro-img"> <a href="', o += i(r[3 * n + e].linkURL), 
            o += '" target="_blank" title="', o += i(r[3 * n + e].pTitle), o += '"> ', "" != r[3 * n + e].rTitle && (o += ' <div class="tag"><p>', 
            o += i(r[3 * n + e].rTitle), o += "</p></div> "), o += ' <img class="lazy" data-original="', 
            o += i(r[3 * n + e].imgSRC), o += '" alt="', o += i(r[3 * n + e].seoAlt), o += '"/> </a> </div> <div class="pro-detail"> <div class="pro-detail-title"></div> <p class="taglines">', 
            o += i(r[3 * n + e].slogan), o += '</p> <a class="pro-title" href="', o += i(r[3 * n + e].linkURL), 
            o += '" target="_blank" title="', o += i(r[3 * n + e].pTitle), o += '">', o += i(r[3 * n + e].pTitle), 
            o += '</a> <div class="pro-price"> <p class="market-price"> 市场价&yen;', o += i(r[3 * n + e].mPrice), 
            o += ' </p> <dl class="act-price"> <dt>活动价</dt> <dd><i>&yen;</i><span>', o += i(r[3 * n + e].price), 
            o += '</span></dd> </dl> <a href="', o += i(r[3 * n + e].linkURL), o += '" target="_blank">立即抢购</a> </div> <div class="left-bg"></div> <div class="right-bg"></div> </div> </li> ';
            o += " </ul> ";
        }
        return o += '   <div class="new-year-ad"> <a href="', o += i(p.linkURL), o += '" target="_blank" title="', 
        o += i(p.pTitle), o += '"> <img class="lazy" data-original="', o += i(p.imgSRC), 
        o += '"/> </a> </div> ', new d(o);
    }), a("tplCrazyPrice", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, l.$escape), t = a.moreLink, e = a.i, r = a.list1, n = a.list2, c = "";
        c += '<div class="act-1212-title"> <span>钜惠爆款</span>0利润清仓，优惠超双11，限量抢购。 <a href="', 
        c += i(t), c += '" class="act-1212-icon more-link" target="_blank">更多</a> </div> <ul class="crazy-pro-list crazy-pro-list-1"> ';
        for (var e = 0; e < r.length; e++) c += ' <li class="pro-item"> <a href="', c += i(r[e].proLink), 
        c += '" class="pro-link" target="_blank"> <img class="lazy" data-original="', c += i(r[e].imgSrc), 
        c += '" alt="', c += i(r[e].imgAlt), c += '" width="588" height="391"> </a> <div class="pro-info"> <div class="bg"></div> <div class="tit"> <p class="pro-name"> <a href="', 
        c += i(r[e].proLink), c += '">', c += i(r[e].proTitle), c += '</a> </p> <p class="desc"><strong>市场价</strong><span>', 
        c += i(r[e].markyPrice), c += '</span></p> </div> <div class="price"> <p><span>特惠价&yen;</span><strong>', 
        c += i(r[e].price), c += '</strong></p> <a href="', c += i(r[e].proLink), c += '" class="buy-link " target="_blank">立即抢购<i class="icon act-1212-icon"></i></a> </div> </div> </li> ';
        c += ' </ul> <ul class="crazy-pro-list crazy-pro-list-2"> ';
        for (var e = 0; e < n.length; e++) c += ' <li class="pro-item"> <a href="', c += i(n[e].proLink), 
        c += '" class="pro-link" target="_blank"> <img class="lazy" data-original="', c += i(n[e].imgSrc), 
        c += '" alt="', c += i(n[e].imgAlt), c += '" width="388" height="258"> </a> <div class="pro-info"> <div class="tit"> <p class="pro-name"> <a href="', 
        c += i(n[e].proLink), c += '">', c += i(n[e].proTitle), c += '</a> </p> <p class="desc"><strong>市场价</strong><span>', 
        c += i(n[e].markyPrice), c += '</span></p> </div> <div class="price"> <p><span>特惠价&yen;</span><strong>', 
        c += i(n[e].price), c += '</strong></p> <a href="', c += i(n[e].proLink), c += '" class="buy-link act-1212-icon" target="_blank">立即抢购<i class="icon act-1212-icon"></i></a> </div> </div> </li> ';
        return c += " </ul> ", new d(c);
    }), a("tplDayNew", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, a.i), t = a.list, e = l.$escape, r = a.j, n = "";
        n += '<dl> <dt class="index-comment-title"> <i class="index-icon icon-index-newer"></i> <label class="comment-title-label">每周上新</label> </dt> <dd id="J_newerSlider" class="index-newer-slider"> <div class="hd"> <ul> ';
        for (var i = 0; i < t.length; i++) n += ' <li> <i class="icon-newer-', n += e(i + 1), 
        n += '"></i> <span class="text-', n += e(i + 1), n += '">', 0 == i && (n += "上"), 
        1 == i && (n += "本"), 2 == i && (n += "下"), n += "周", n += e(t[i].startTime), n += "-", 
        n += e(t[i].endTime), n += "</span> </li> ";
        n += ' </ul> <span class="newer-slider-line"></span> </div> <div class="bd"> ';
        for (var i = 0; i < t.length; i++) {
            n += " <ul> ";
            for (var r = 0; r < t[i].dList.length; r++) n += " <li ", r != t[i].dList.length - 1 && (n += 'class="r-10"'), 
            n += '> <a href="', n += e(t[i].dList[r].linkURL), n += '" target="_blank" title="', 
            n += e(t[i].dList[r].seoAlt), n += '"> <img _src="', n += e(t[i].dList[r].imgSRC), 
            n += '" width="290" height="193" alt="', n += e(t[i].dList[r].seoAlt), n += '"/> <span class="text-money">&yen;</span> <span class="text-wrap"> <span class="text-price">', 
            n += e(t[i].dList[r].price), n += '</span> <span class="text-title">', n += e(t[i].dList[r].pTitle), 
            n += "</span> </span> </a> </li> ";
            n += " </ul> ";
        }
        return n += " </div> </dd> </dl> ", new d(n);
    }), a("tplElevenPreSale", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, l.$escape), t = a.moreLink, e = a.preSaleBig, r = (a.nowTime, 
        a.i), n = a.list, c = "";
        c += '<div class="act-1212-title"> <span>双12预售</span>预付<i>100</i> 元抵<i>500</i> 元，比双11更划算。 <a href="', 
        c += i(t), c += '" class="act-1212-icon more-link" target="_blank">更多</a> </div> <div class="pre-sale-big"> <div class="left fl"> <a href="', 
        c += i(e.proLink), c += '" target="_blank"><img class="lazy" data-original="', c += i(e.imgSrc), 
        c += '" alt="" width="697" height="465"></a> </div> <div class="pre-info"> <div class="content-top"> <h3>', 
        c += i(e.proDesc1), c += "</h3> <h4>", c += i(e.proDesc2), c += "</h4> <h5>", c += i(e.proDesc3), 
        c += "</h5> ", c += ' <img class="lazy" data-original="http://misc.jjcdn.com/p/images/act-1212/pre-time-0.png" alt=""> ', 
        c += ' </div> <div class="content-foot"> <div class="marky-price"> <p class="cut"><span>市场价</span><strong>&yen;', 
        c += i(e.markyPrice), c += '</strong></p> <p class="pre-price">预售价 &yen;<strong>', 
        c += i(e.skuPrice), c += '</strong></p> </div> <div class="price"> <p class="tail"><span>定金</span><strong>&yen;', 
        c += i(e.bookPrice), c += "</strong><span>抵", c += i(e.asPrice), c += '</span></p> <a href="', 
        c += i(e.proLink), c += '" class="link" target="_blank"><span>立即预定</span><i class="act-1212-icon pointer"></i></a> </div> </div> </div> </div> <ul class="pre-pro-list"> ';
        for (var r = 0; r < n.length; r++) c += ' <li class="pro-item"> <a href="', c += i(n[r].proLink), 
        c += '" class="pro-link" target="_blank"> <img class="lazy" data-original="', c += i(n[r].imgSrc), 
        c += '" alt="" width="388" height="258"> <div class="tit"> <div class="bg"></div> <div class="pro-title">', 
        c += i(n[r].proTitle), c += '</div> </div>  </a> <div class="pro-info"> <div class="marky-price"> <p class="cut"><span>市场价</span><strong>&yen;', 
        c += i(n[r].markyPrice), c += '</strong></p> <p class="pre-price">预售价 &yen;<strong>', 
        c += i(n[r].skuPrice), c += '</strong></p> </div> <div class="price"> <p class="tail"><span>定金</span><strong>&yen;', 
        c += i(n[r].bookPrice), c += "</strong><span>抵", c += i(n[r].asPrice), c += '</span></p> <a href="', 
        c += i(n[r].proLink), c += '" class="link" target="_blank"><span>立即预定</span><i class="act-1212-icon pointer"></i></a> </div> </div> </li> ';
        return c += " </ul> ", new d(c);
    }), a("tplFeastList", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, l.$escape), t = a.feastTitle, e = a.feastSp, r = a.i, n = a.list, c = a.ad, p = "";
        p += ' <div class="feastList-title"> <!-- <a href="', p += i(t.linkURL), p += '" target="_blank" title="', 
        p += i(t.pTitle), p += '"> --> <img class="lazy" data-original="', p += i(t.imgSRC), 
        p += '"/>  </div>   <p class="feastList-sp"> <a href="', p += i(e.linkURL), p += '"><img class="lazy" data-original="', 
        p += i(e.imgSRC), p += '" alt=""></a> </p>   <ul class="feastList-list clearfix"> ';
        for (var r = 0; r < n.length; r++) p += ' <li class="item-', p += i(r + 1), p += '"> <div class="pro-img"> <a href="', 
        p += i(n[r].linkURL), p += '" target="_blank" title="', p += i(n[r].pTitle), p += '"> <img class="lazy" data-original="', 
        p += i(n[r].imgSRC), p += '" alt="', p += i(n[r].seoAlt), p += '" /> </a> <i class="icon icon-like100p"></i><i class="icon icon-48h"></i> </div> <div class="pro-detail"> <div class="pro-detail-title"> <span class="tag-txt"> ', 
        p += i(n[r].slogan), p += ' </span> <p class="tag-line"></p> </div> <a class="pro-title" href="', 
        p += i(n[r].linkURL), p += '" target="_blank" title="', p += i(n[r].pTitle), p += '"> ', 
        p += i(n[r].pTitle), p += ' </a> <div class="pro-price"> <p class="market-price"> <span class="market-price-txt">市场价</span><span class="market-price-line"><i>¥</i><em class="price">', 
        p += i(n[r].mPrice), p += '</em><i class="line-through"></i></span> </p> <p class="act-price"><span class="act-price-txt">开仓价</span> <br/><span class="price"><i>&yen;</i><em>', 
        p += i(n[r].price), p += '</em></span></p> <a class="btn-buy" href="', p += i(n[r].linkURL), 
        p += '" target="_blank">立即抢购 ></a> <i class="icon icon-cheap"></i> </div> </div> </li> ';
        return p += ' </ul>   <!-- <div class="index-315-ad"> <a href="', p += i(c.linkURL), 
        p += '" target="_blank" title="', p += i(c.pTitle), p += '"> <img class="lazy" data-original="', 
        p += i(c.imgSRC), p += '"/> </a> </div> -->  ', new d(p);
    }), a("tplFloor", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, a.list), t = a.i, e = l.$escape, r = a.j, n = a.m, c = a.n, p = "";
        if (i.length > 0) {
            p += " ";
            for (var t = 0; t < i.length; t++) {
                p += ' <section class="floor clearfix"> <div class="floor-left">  <p class="floor-head-img"> <a href="', 
                p += e(i[t].head.linkURL), p += '" target="_blank" title="', p += e(i[t].head.selAlt), 
                p += '"> <img class="lazy" data-original="', p += e(i[t].head.imgSRC), p += '" width="290" height="110" alt="', 
                p += e(i[t].head.selAlt), p += '"/> </a> </p>  <p class="floor-cats"> ';
                for (var r = 0; r < i[t].cats.length; r++) p += ' <a href="', p += e(i[t].cats[r].linkURL), 
                p += '" target="_blank" title="', p += e(i[t].cats[r].name), p += '">', p += e(i[t].cats[r].name), 
                p += "</a> ";
                if (p += ' </p> <p class="floor-left-ad">  <a href="', p += e(i[t].ad[0].linkURL), 
                p += '" title="', p += e(i[t].ad[0].selAlt), p += '"> <img class="lazy" data-original="', 
                p += e(i[t].ad[0].imgSRC), p += '" alt="', p += e(i[t].ad[0].selAlt), p += '" width="290" height="409" /> </a> </p> </div> <div class="floor-right"> <dl class="floor-right-top clearfix">  <dt class="floor-one"> <a class="floor-one-link" href="', 
                p += e(i[t].product[0].linkURL), p += '" target="_blank" title="', p += e(i[t].product[0].selAlt), 
                p += '"> <img class="lazy" data-original="', p += e(i[t].product[0].imgSRC), p += '" width="590" height="393" alt="', 
                p += e(i[t].product[0].pTitle), p += '"/>\' <span class="floor-one-mark"> <span class="title">', 
                p += e(i[t].product[0].pTitle), p += '</span> <span class="price ', i[t].product[0].hot && (p += "off-sale"), 
                p += '">&yen; ', p += e(i[t].product[0].price), p += '</span> </span> </a> </dt>  <dd class="floor-hot"> <a href="', 
                p += e(i[t].ad[1].linkURL), p += '" target="_blank" title="', p += e(i[t].ad[1].selAlt), 
                p += '"> <img class="lazy" data-original="', p += e(i[t].ad[1].imgSRC), p += '!mid" width="290" height="193" alt="', 
                p += e(i[t].ad[1].selAlt), p += '"/> <span>&nbsp;</span> </a> </dd>  <dd class="floor-guess-like"> <a href="', 
                p += e(i[t].enjoy.linkURL), p += '" target="_blank" title="', p += e(i[t].enjoy.selAlt), 
                p += '"> <img class="lazy" data-original="', p += e(i[t].enjoy.imgSRC), p += '" width="290" height="193" alt="', 
                p += e(i[t].enjoy.selAlt), p += '"/> <span class="guess-like-mark"> &yen; ', p += e(i[t].enjoy.price), 
                p += ' </span> </a> </dd> </dl>  <ul class="floor-right-list clearfix"> <li class="li-gap"> <a href="', 
                p += e(i[t].product[1].linkURL), p += '" target="_blank" title="', p += e(i[t].product[1].pTitle), 
                p += '"> <img class="lazy" data-original="', p += e(i[t].product[1].imgSRC), p += '" width="290" height="193" alt="', 
                p += e(i[t].product[1].selAlt), p += '"/> <span class="title">', p += e(i[t].product[1].pTitle), 
                p += '</span> <span class="price ', i[t].product[1].hot && (p += " off-sale"), p += '">&yen; ', 
                p += e(i[t].product[1].price), p += '</span> </a> </li> <li class="li-gap"> <a href="', 
                p += e(i[t].product[2].linkURL), p += '" target="_blank" title="', p += e(i[t].product[1].pTitle), 
                p += '"> <img class="lazy" data-original="', p += e(i[t].product[2].imgSRC), p += '" width="290" height="193" alt="', 
                p += e(i[t].product[2].selAlt), p += '"/> <span class="title">', p += e(i[t].product[2].pTitle), 
                p += '</span> <span class="price ', i[t].product[2].hot && (p += " off-sale"), p += '">&yen; ', 
                p += e(i[t].product[2].price), p += '</span> </a> </li> <li> <a href="', p += e(i[t].product[3].linkURL), 
                p += '" target="_blank" title="', p += e(i[t].product[1].pTitle), p += '"> <img class="lazy" data-original="', 
                p += e(i[t].product[3].imgSRC), p += '" width="290" height="193" alt="', p += e(i[t].product[3].selAlt), 
                p += '"/> <span class="title">', p += e(i[t].product[3].pTitle), p += '</span> <span class="price ', 
                i[t].product[3].hot && (p += " off-sale"), p += '">&yen; ', p += e(i[t].product[3].price), 
                p += "</span> </a> </li> </ul> </div> ", i[t].subFloor.length > 0) {
                    p += " ";
                    for (var n = 0; n < i[t].subFloor.length; n++) {
                        p += ' <dl class="sub-floor"> <dt class="sub-floor-title"> <span class="sub-title-wrap"> <i class="icon-sub-right"></i> <label>', 
                        p += e(i[t].subFloor[n].titCh), p += "</label> <span>", p += e(i[t].subFloor[n].titEn), 
                        p += '</span> </span> </dt> <dd class="sub-floor-list"> <ul> ';
                        for (var c = 0; c < i[t].subFloor[n].list.length; c++) p += ' <li class="sub-list-item" style="', 
                        p += 3 == c ? "width:289px" : "width:290px ", p += '"> <a class="JQ_floorSubListItem" href="', 
                        p += e(i[t].subFloor[n].list[c].linkURL), p += '" target="_blank"> <img src="', 
                        p += e(i[t].subFloor[n].list[c].imgSRC), p += '" ', p += 3 == c ? 'width="289"' : 'width="290" ', 
                        p += ' height="193" alt="', p += e(i[t].subFloor[n].list[c].pTitle), p += '"/> <span class="list-item-title"> <span class="item-title-price">&yen; ', 
                        p += e(i[t].subFloor[n].list[c].price), p += '</span> <span class="item-title">', 
                        p += e(i[t].subFloor[n].list[c].pTitle), p += "</span> </span> </a> </li> ";
                        p += ' </ul> </dd> <dd class="sub-list-bottom"> <span class="list-bottom-line"></span> </dd> </dl> ';
                    }
                    p += " ";
                }
                p += " </section>  ", "no" == i[t].floorAd.isShow ? p += " " : (p += ' <section class="index-wrap-ad"> <a href="', 
                p += e(i[t].floorAd.linkURL), p += '" target="_blank" title="', p += e(i[t].floorAd.pTitle), 
                p += '"> <img class="lazy" data-original="', p += e(i[t].floorAd.imgSRC), p += '" alt="', 
                p += e(i[t].floorAd.seoAlt), p += '"/> </a> </section> '), p += " ";
            }
            p += " ";
        }
        return new d(p);
    }), a("tplFullSlider", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, a.i), t = a.list, e = l.$escape, r = "";
        r += '<div id="J_indexFullSlider"> <div class="bd"> <ul> ';
        for (var i = 0; i < t.length; i++) r += ' <li> <a href="', r += e(t[i].linkURL), 
        r += '" target="_blank" title="', r += e(t[i].pTitle), r += '" style=\'background: url("', 
        r += e(t[i].imgSRC), r += "\") center center no-repeat;'>&nbsp;</a> </li> ";
        return r += ' </ul> <a target="_blank" class="arrow prev">&nbsp;</a> <a target="_blank" class="arrow next">&nbsp;</a> </div> <div class="hd"> <ul></ul> </div> </div>', 
        new d(r);
    }), a("tplHonorList", '<div class="company-honor-list clearfix"> <a href="http://www.kinhom.com/help/article-31.html" target="_blank" class="list-item list-item-1"></a> <a href="http://www.kinhom.com/help/article-31.html" target="_blank" class="list-item list-item-2"></a> <a href="http://www.kinhom.com/help/7.html" target="_blank" class="list-item list-item-3"></a> <a href="http://www.kinhom.com/help/4.html" target="_blank" class="list-item list-item-4"></a> </div>'), 
    a("tplOldToNew", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, l.$escape), t = a.moreLink, e = a.i, r = a.list, n = "";
        n += '<div class="act-1111-title"> <span>以旧换新</span>全场床垫支持以旧换新 <a href="', n += i(t), 
        n += '" class="act-1111-icon more-link" target="_blank">更多</a> </div> <div class="act-rule"> <p class="tit">活动规则:</p> <p class="desc">1.活动时间：<span>11月3日至11月13日，全场床垫可参与，享包邮优惠</span>。仅限广州、深圳、东莞、中山、珠海、佛山、江门（市区）客户。</p> <p class="desc">2.抵扣金额：<span>金海马旧床垫每张抵扣200元，其余品牌旧床垫每张抵扣100元</span>。支付前先将旧床垫照片（品牌名可见）发给在线客服确认，并请咨询在线客服减价。<span class="details">活动详情<i></i></span></p> <p class="rule-desc">3.购买的床垫数量和回收的旧床垫数量一一对应，即购买一张床垫，对应回收一张旧床垫，并抵扣一张床垫相应的优惠金额，以此类推。</p> <p class="rule-desc">4.旧床垫将在送货时同时回收，配送人员现场确认旧床垫品牌，如发现与前期提供床垫品牌不符，客户需补差价。</p> <p class="rule-desc">5.如发生退货，则不可享受抵扣优惠（正常换货除外），如损坏产品，需按原价扣除费用。</p> <p class="rule-desc">6.旧床垫如可通过电梯运输无需收取抬楼费，如不可，1-7楼不收取费用，7楼以上 每层20元/件收取。</p> <p class="rule-desc">7.本活动最终解释权归金海马商城所有。</p> </div> <ul class="crazy-pro-list crazy-pro-list-3"> ';
        for (var e = 0; e < r.length; e++) n += ' <li class="pro-item"> <a href="', n += i(r[e].proLink), 
        n += '" class="pro-link" target="_blank"> <img class="lazy" data-original="', n += i(r[e].imgSrc), 
        n += '" alt="" width="388" height="258"> </a> <div class="pro-info"> <div class="tit"> <p class="pro-name"> <a href="', 
        n += i(r[e].proLink), n += '">', n += i(r[e].proTitle), n += '</a> </p> <p class="desc">特惠价 <span>&yen;', 
        n += i(r[e].price), n += '</span></p> </div> <div class="price"> <a href="', n += i(r[e].proLink), 
        n += '" class="buy-link act-1111-icon" target="_blank">立即抢购</a> </div> </div> </li> ';
        return n += " </ul> ", new d(n);
    }), a("tplPreferentials", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, l.$escape), t = a.list, e = a.i, r = "";
        r += ' <section class="index-preferentials-box" id="J_Preferentials"> <div class="index-preferentials-content clearfix">  <div class="preferentials-title"></div>   <div class="preferentials clearfix"> <div class="pro-img"> <a href="', 
        r += i(t[0].linkURL), r += '" target="_blank" title="', r += i(t[0].pTitle), r += '"> <span class="tag">直降<i>', 
        r += i(t[0].diffPrice), r += '</i></span> <img class="lazy" data-original="', r += i(t[0].imgSRC), 
        r += '" alt="', r += i(t[0].seoAlt), r += '"/> </a> </div> <dl class="description"> <dt class="recommend-title"> <img src="http://misc.jjcdn.com/p/images/index_new_year/top-recommend.png" alt=""/> <p>新年精品推荐！</p> </dt> <dd class="pro-detail"> <a class="pro-title" href="', 
        r += i(t[0].linkURL), r += '" target="_blank" title="', r += i(t[0].pTitle), r += '">', 
        r += i(t[0].pTitle), r += "</a> ";
        for (var e = 0; e < t[0].summarize.length; e++) r += ' <p class="pro-summarize"><i></i>', 
        r += i(t[0].summarize[e].title), r += '</p> <p class="pro-summarize-detial">', r += i(t[0].summarize[e].description), 
        r += "</p> ";
        r += ' <div class="pro-price"> <dl class="act-price"> <dt>特惠活动价</dt> <dd><i>&yen;</i><span>', 
        r += i(t[0].price), r += '</span></dd> </dl> <dl class="sale-price"> <dt>市场销售价</dt> <dd>', 
        r += i(t[0].mPrice), r += '</dd> </dl> <span class="line-through"></span> <a href="', 
        r += i(t[0].linkURL), r += '" target="_blank">立即抢购</a> </div> </dd> </dl> </div>   <ul class="clearfix"> ';
        for (var e = 1; e < t.length; e++) r += ' <li class="preferentials sub-preferentials"> <div class="pro-img"> <a href="', 
        r += i(t[e].linkURL), r += '" target="_blank" title="', r += i(t[e].pTitle), r += '"> <span class="tag">直降<i>', 
        r += i(t[e].diffPrice), r += '</i></span> <img class="lazy" data-original="', r += i(t[e].imgSRC), 
        r += '" alt="', r += i(t[e].seoAlt), r += '"/> </a> </div> <div class="pro-detail"> <a class="pro-title" href="', 
        r += i(t[e].linkURL), r += '" target="_blank" title="', r += i(t[e].pTitle), r += '">', 
        r += i(t[e].pTitle), r += '</a> <div class="pro-price"> <dl class="act-price"> <dt>特惠活动价</dt> <dd><i>&yen;</i><span>', 
        r += i(t[e].price), r += '</span></dd> </dl> <dl class="sale-price"> <dt>市场销售价</dt> <dd>', 
        r += i(t[e].mPrice), r += '</dd> </dl> <span class="line-through"></span> <a href="', 
        r += i(t[e].linkURL), r += '" target="_blank">立即抢购</a> </div> </div> </li> ';
        return r += " </ul>  </div> </section> ", new d(r);
    }), a("tplRecommend", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, l.$escape), t = a.commentTitle, e = a.i, r = a.list, n = a.j, c = a.hotList, p = "";
        p += '<div class="recommend-left"> <div class="top"> <img class="lazy" data-original="', 
        p += i(t.imgSRC), p += '" width="840" height="64" alt="今日推荐"/> </div> <div class="recommend-slider" id="J_recommendSlider"> <div class="hd"> <ul> ';
        for (var e = 0; e < r.length; e++) p += ' <li> <a href="javascript:void(0);"> <img class="lazy" data-original="', 
        p += i(r[e].imgSRC), p += '!small" width="189" height="145" alt="', p += i(r[e].pTitle), 
        p += '"/> </a> <span class="mark"><span>', p += i(r[e].offPrice), p += "折</span></span> </li> ";
        p += ' </ul> </div> <div class="bd"> <ul> ';
        for (var e = 0; e < r.length; e++) p += ' <li class="JQ_recItem"> <a href="', p += i(r[e].linkURL), 
        p += '" target="_blank"><img _src="', p += i(r[e].imgSRC), p += '!max" width="640" height="490" alt="', 
        p += i(r[e].pTitle), p += '"/></a> <a href="javascript:void(0);" class="point" style="left: ', 
        p += i(r[e].xPoint), p += "px; top: ", p += i(r[e].yPoint), p += 'px;"> <span class="point-plus"></span> <span class="point-animate"></span> </a> <span class="point-box"> <span class="point-text"> ', 
        p += i(r[e].seoAlt), p += ' </span> <span class="point-price"> <small>RMB</small> ', 
        p += i(r[e].price), p += ' </span> <a href="', p += i(r[e].linkURL), p += '" target="_blank" class="point-btn">立即购买</a> <span class="point-market-price">&yen; ', 
        p += i(r[e].mPrice), p += '</span> <span class="point-sale-num">已有', p += i(r[e].saleNum), 
        p += '人购买</span> <span class="point-mark"></span> </span> </li> ';
        p += ' </ul> </div> </div> </div> <div class="recommend-right">  <div class="custom-box"> <a href="http://www.kinhom.com/custom" target="_blank"> 免费申请 <i class="icon-index-custom-point"></i> </a> </div>  <dl class="hot-sale"> <dt class="hot-sale-title"> <img class="lazy" data-original="http://static.jjcdn.com/p/images/index_hot_sale_list_head.jpg" width="290" height="107" alt="热销排行榜"/> </dt> <dd class="hot-sale-slider" id="J_hotSaleSlider"> <a href="javascript:void(0);" class="gray" id="J_hotSaleSliderBtn"></a> <div class="hd"> <ul></ul> </div> <div class="bd clearfix"> <ul> ';
        for (var e = 0, n = 1; e < c.length; e++, n++) p += ' <li class="sale-list-item ', 
        e % 2 == 0 && (p += "r-10"), p += '"> <a class="item-link" href="', p += i(c[e].linkURL), 
        p += '" target="_blank"> <img _src="', p += i(c[e].imgSRC), p += '" width="140" height="94" alt="', 
        p += i(c[e].pTitle), p += '"/> <span class="sale-mark">', p += i(c[e].pTitle), p += '</span> <span class="sale-title"><label>RMB</label>', 
        p += i(c[e].price), p += "</span> </a> ", 3 >= n && (p += '<span class="sale-rank">', 
        p += i(n), p += "</span>"), p += " </li> ", 0 != e && (e - 3) % 4 == 0 && (p += " </ul> ", 
        e + 1 != c.length && (p += "<ul>"), p += " "), p += " ";
        return p += " </div> </dd> </dl> </div>", new d(p);
    }), a("tplSpecial", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, a.i), t = a.list, e = l.$escape, r = "";
        r += '<dl> <dt class="index-comment-title"> <i class="index-icon icon-index-special"></i> <label class="comment-title-label">限时特价</label>  <span class="special-time"> <label>还剩:</label> <span class="time"> <b id="J_sDay">00</b> <small>天</small> </span> <span class="time"> <b id="J_sHour">00</b> <small>时</small> </span> <span class="time"> <b id="J_sMinute">00</b> <small>分</small> </span> <span class="time"> <b id="J_sSecond">00</b> <small>秒</small> </span> </span> </dt> <dd id="J_indexSpecialSlider" class="special-slider"> <div class="hd"></div> <div class="bd clearfix"> <ul> ';
        for (var i = 0; i < t.length; i++) r += " ", r += " <li> ", r += ' <a href="', r += e(t[i].linkURL), 
        r += '" target="_blank"> <span class="item-img"> <img _src="', r += e(t[i].imgSRC), 
        r += '" width="240" height="158" alt="', r += e(t[i].seoAlt), r += '"/> <span class="item-img-text"> ', 
        r += e(t[i].pTitle), r += ' </span> </span> <span class="item-label"> <span class="item-label-price"> <span class="off">直降 &yen;', 
        r += e(t[i].offPrice), r += '</span>  <span class="price">&yen; ', r += e(t[i].price), 
        r += '</span> </span> <span class="item-label-off">立即抢购 ></span> </span> </a> </li> ';
        return r += ' </ul> </div> <a href="javascript:void(0);" class="s-icon prev"></a> <a href="javascript:void(0);" class="s-icon next"></a> </dd> </dl>', 
        new d(r);
    }), a("tplTopicStyle", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, a.i), t = a.list, e = l.$escape, r = "";
        r += '<dl class="clearfix"> <dt class="index-comment-title"> <i class="index-icon icon-index-style"></i> <label class="comment-title-label">风格主题</label> </dt> <dd id="J_topicStyleSlider" class="topic-slider"> <a href="javascript:void(0);" class="next"> <i class="icon-topic-refresh"></i> 换一批 </a> <div class="hd"> <ul></ul> </div> <div class="bd"> <ul> ';
        for (var i = 0; i < t.length; i++) r += " <li ", i % 2 == 0 && (r += 'class="r-10"'), 
        r += '> <a href="', r += e(t[i].linkURL), r += '" target="_blank" title="', r += e(t[i].seoAlt), 
        r += '"> <img _src="', r += e(t[i].imgSRC), r += '" width="590" height="280" alt="', 
        r += e(t[i].seoAlt), r += '"/> <span class="index-style-icon-show">去看看</span> </a> </li> ', 
        i % 2 == 1 && i + 1 != t.length && (r += "</ul><ul>"), r += " ";
        return r += " </ul> </div> </dd> </dl>", new d(r);
    }), a("tplWrapAd", function(a, s) {
        "use strict";
        var l = this, i = (l.$helpers, l.$escape), t = a.link, e = a.title, r = a.src, n = a.alt, c = "";
        return c += '<a href="', c += i(t), c += '" target="_blank" title="', c += i(e), 
        c += '"> <img class="lazy" data-original="', c += i(r), c += '" alt="', c += i(n), 
        c += '"/> </a>', new d(c);
    });
}();
