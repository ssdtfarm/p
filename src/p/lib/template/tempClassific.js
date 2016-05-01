!function() {
    function i(i, t) {
        return (/string|function/.test(typeof t) ? c : r)(i, t);
    }
    function t(i, s) {
        return "string" != typeof i && (s = typeof i, "number" === s ? i += "" : i = "function" === s ? t(i.call(i)) : ""), 
        i;
    }
    function s(i) {
        return d[i];
    }
    function l(i) {
        return t(i).replace(/&(?![\w#]+;)|[<>"']/g, s);
    }
    function e(i, t) {
        if (v(i)) for (var s = 0, l = i.length; l > s; s++) t.call(i, i[s], s, i); else for (s in i) t.call(i, i[s], s);
    }
    function a(i, t) {
        var s = /(\/)[^/]+\1\.\.\1/, l = ("./" + i).replace(/[^/]+$/, ""), e = l + t;
        for (e = e.replace(/\/\.\//g, "/"); e.match(s); ) e = e.replace(s, "/");
        return e;
    }
    function r(t, s) {
        var l = i.get(t) || n({
            filename: t,
            name: "Render Error",
            message: "Template not found"
        });
        return s ? l(s) : l;
    }
    function c(i, t) {
        if ("string" == typeof t) {
            var s = t;
            t = function() {
                return new p(s);
            };
        }
        var l = o[i] = function(s) {
            try {
                return new t(s, i) + "";
            } catch (l) {
                return n(l)();
            }
        };
        return l.prototype = t.prototype = f, l.toString = function() {
            return t + "";
        }, l;
    }
    function n(i) {
        var t = "{Template Error}", s = i.stack || "";
        if (s) s = s.split("\n").slice(0, 2).join("\n"); else for (var l in i) s += "<" + l + ">\n" + i[l] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(t + "\n\n" + s), t;
        };
    }
    var o = i.cache = {}, p = this.String, d = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, v = Array.isArray || function(i) {
        return "[object Array]" === {}.toString.call(i);
    }, f = i.utils = {
        $helpers: {},
        $include: function(i, t, s) {
            return i = a(s, i), r(i, t);
        },
        $string: t,
        $escape: l,
        $each: e
    }, h = i.helpers = f.$helpers;
    i.get = function(i) {
        return o[i.replace(/^\.\//, "")];
    }, i.helper = function(i, t) {
        h[i] = t;
    }, "function" == typeof define ? define(function() {
        return i;
    }) : "undefined" != typeof exports ? module.exports = i : this.template = i, i("tplAttrSelector", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, s.$escape), e = i.goodNums, a = i.i, r = i.list, c = i.j, n = "";
        n += '<div class="selector-hd"> <dl> <dt>筛选（共<span class="fc-f60">', n += l(e), 
        n += '</span>个商品）</dt> </dl> <a href="javascript:void(0);" class="reset J_reset">全部撤销</a> </div> <div class="selector-bd"> ';
        for (var a = 0; a < r.length; a++) {
            if (n += " <dl ", a > 3 && (n += 'class="hide"'), n += "> <dt>", n += l(r[a].attrName), 
            n += "</dt> ", "price" == r[a].attrType) {
                n += " <dd> ";
                for (var c = 0; c < r[a].attrInfo.length; c++) n += ' <a href="javascript:void(0);" data-idx="', 
                n += l(a), n += '" data-type="', n += l(r[a].attrType), n += '" data-id="', n += l(r[a].attrInfo[c].id), 
                n += '">', n += l(r[a].attrInfo[c].value), n += "</a> ";
                n += ' <span> <input type="text" value="100"> <span>~</span> <input type="text" value=""> <span class="select-price">确定</span> </span> </dd> ';
            } else {
                n += " <dd> ";
                for (var c = 0; c < r[a].attrInfo.length; c++) n += ' <a href="javascript:void(0);" data-idx="', 
                n += l(a), n += '" data-type="', n += l(r[a].attrType), n += '" data-id="', n += l(r[a].attrInfo[c].id), 
                n += '">', n += l(r[a].attrInfo[c].value), n += "</a> ";
                n += "  </dd> ";
            }
            n += " </dl> ";
        }
        return n += " </div> ", r.length > 4 && (n += ' <div class="more-select"> <span>更多选项</span><i class="classific-icon triangle"></i> </div> '), 
        new p(n);
    }), i("tplClassificAdv", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, s.$escape), e = i.proLink, a = i.proTitle, r = i.imgURL, c = i.proAlt, n = "";
        return n += '<a href="', n += l(e), n += '" title="', n += l(a), n += '" target="_blank"> <img class="lazy" data-original="', 
        n += l(r), n += '" alt="', n += l(c), n += '"> </a>', new p(n);
    }), i("tplClassificList", '<dt></dt> <dd class="pro-item"> <a href="#" class="pro-link"> <img src="{cdn}/p/images/classific-item-img.jpg" alt=""> </a> <div class="cart classific-icon"></div> <div class="favors classific-icon"></div> <p class="pro-info"> <span class="brand">金海马</span> <a href="#" class="pro-title">现代简约 棕色 真皮 沙发组合 布艺沙发 商品名限制2行！</a> </p> <div class="promotion"> <p class="promotion-title">促销信息：最多不超过1行，限制好！</p> </div> <p class="price fc-f60"><span>&yen;</span><strong>3999</strong></p> <p class="buyers"> 已有<span class="fc-f60">300</span>人购买 | 评价 <span class="fc-f60">20</span> </p> </dd>'), 
    i("tplClassificSelect", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, i.i), e = i.list, a = i.flag, r = i.k, c = i.curSelect, n = s.$escape, o = i.j, d = "";
        d += '<h2 class="title">商品分类</h2> ';
        for (var l = 0; l < e.length; l++) {
            d += " <dl> ";
            var a = !1;
            d += " ";
            for (var r = 0; r < e[l].typeLink.length; r++) {
                if (d += " ", c == e[l].typeLink[r].proName) {
                    d += ' <dt class="open"><i class="classific-icon triangle"></i><a href="', d += n(e[l].proLink), 
                    d += '"></a>', d += n(e[l].proName), d += "</dt> ", a = !0;
                    break;
                }
                d += " ";
            }
            d += " ", a || (d += ' <dt><i class="classific-icon triangle"></i><a href="', d += n(e[l].proLink), 
            d += '"></a>', d += n(e[l].proName), d += "</dt> "), d += " <dd ", a && (d += 'class="active"'), 
            d += "> ";
            for (var o = 0; o < e[l].typeLink.length; o++) d += " ", 3 >= o ? (d += ' <div><a href="', 
            d += n(e[l].typeLink[o].proLink), d += '" ', c == e[l].typeLink[o].proName && (d += 'class="active"'), 
            d += " >", d += n(e[l].typeLink[o].proName), d += "</a></div> ") : (d += ' <div class="hide"><a href="', 
            d += n(e[l].typeLink[o].proLink), d += '" ', c == e[l].typeLink[o].proName && (d += 'class="active"'), 
            d += " >", d += n(e[l].typeLink[o].proName), d += "</a></div> "), d += " ";
            d += " ", e[l].typeLink.length > 3 && (d += ' <span class="more">更多</span> '), d += " </dd> </dl> ";
        }
        return d += " ", new p(d);
    }), i("tplFullSlider", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, i.i), e = i.list, a = s.$escape, r = "";
        r += '<div class="J_fullSlider" class="full-slider"> <div class="bd"> <ul class="list"> ';
        for (var l = 0; l < e.length; l++) r += ' <li class="slider-item" style="background: url(', 
        r += a(e[l].imgURL), r += ') no-repeat center top;"> <a href="', r += a(e[l].proLink), 
        r += '" class="slider-link" target="_blank" title="', r += a(e[l].proTitle), r += '"></a> </li> ';
        return r += ' </ul> </div> <div class="hd"> <ul></ul> </div> </div> ', new p(r);
    }), i("tplHistory", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, i.i), e = i.list, a = s.$escape, r = "";
        r += '<div class="bg"> <span>最近浏览</span> </div> <div class="hd"> <ul></ul> </div> <div class="bd"> <div class="list"> ';
        for (var l = 0; l < e.length; l++) r += ' <li class="bd-item"> <a href="', r += a(e[l].proLink), 
        r += '" title="', r += a(e[l].proTitle), r += '"> <img class="lazy" data-original="', 
        r += a(e[l].imgURL), r += '" alt="', r += a(e[l].proAlt), r += '" width="190" height="127"> <p class="price fc-f60">&yen;<span>', 
        r += a(e[l].proPrice), r += "</span></p> </a> </li> ";
        return r += " </div> </div>", new p(r);
    }), i("tplHotKeyword", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, i.i), e = i.hotKeyWord, a = s.$escape, r = i.j, c = i.hotList, n = "";
        n += ' <div class="left fl"> <h3 class="title">热门关键词</h3> <div class="hot-link"> ';
        for (var l = 0; l < e.length; l++) n += ' <a href="', n += a(e[l].proLink), n += '" class="link-item" target="_blank" title="', 
        n += a(e[l].proTitle), n += '">', n += a(e[l].proName), n += "</a> ";
        n += ' </div> </div> <div class="right fr"> <div class="title classific-icon"></div> <div class="list-wrap"> <i class="classific-icon hot-item hot-1"></i> <i class="classific-icon hot-item hot-2"></i> <i class="classific-icon hot-item hot-3"></i> <ul class="list"> ';
        for (var r = 0; r < c.length; r++) n += ' <li class="item"> <a href="', n += a(c[r].proLink), 
        n += '" class="pro-link" title="', n += a(c[r].proTitle), n += '" target="_blank"> <div class="mark"> <div class="bg"></div> <p class="pro-title" >', 
        n += a(c[r].proTitle), n += '</p> </div> <img class="lazy" data-original="', n += a(c[r].imgURL), 
        n += '" alt="', n += a(c[r].proAlt), n += '" width="140" height="93"> </a> <p class="info"><span class="price fc-f60">&yen;', 
        n += a(c[r].proPrice), n += '</span><span class="num">销量', n += a(c[r].saleNum), 
        n += "</span></p> </li> ";
        return n += " </ul> </div> </div>", new p(n);
    }), i("tplHotSaleing", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, i.i), e = i.list, a = s.$escape, r = "";
        r += '<div class="title classific-icon"></div> <i class="classific-icon hot-item hot-1"></i> <i class="classific-icon hot-item hot-2"></i> <i class="classific-icon hot-item hot-3"></i> <ul class="list"> ';
        for (var l = 0; l < e.length; l++) r += ' <li class="saleing-item"> <a href="', 
        r += a(e[l].proLink), r += '" title="', r += a(e[l].proTitle), r += '" target="_blank" class="img-link"> <div class="mark-info"> <div class="mark"></div> <p class="item-title">', 
        r += a(e[l].proTitle), r += '</p> </div> <img class="lazy" data-original="', r += a(e[l].imgURL), 
        r += '" alt="', r += a(e[l].proAlt), r += '" width="140" height="93"> </a> <div class="info"> <p class="fc-f60 price">&yen;<span>', 
        r += a(e[l].proPrice), r += '</span></p> <p class="num">销量', r += a(e[l].saleNum), 
        r += "</p> </div> </li> ";
        return r += " </ul>", new p(r);
    }), i("tplKeyWord", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, s.$escape), e = i.mainTitle, a = i.subTitle, r = i.i, c = i.list, n = "";
        n += '<dt class="title"> <h2>', n += l(e), n += "</h2> <p>", n += l(a), n += "</p> </dt> <dd> ";
        for (var r = 0; r < c.length; r++) n += ' <a href="', n += l(c[r].proLink), n += '" class="type-link" title="', 
        n += l(c[r].seoTitle), n += '">', n += l(c[r].proTitle), n += "</a> ";
        return n += " </dd>", new p(n);
    }), i("tplListAd", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, i.i), e = i.list, a = s.$escape, r = "";
        r += '<div class="prev classific-icon"></div> <div class="next classific-icon"></div> <div class="bd"> <ul> ';
        for (var l = 0; l < e.length; l++) r += ' <li class="bd-item"> <a href="', r += a(e[l].proLink), 
        r += '" title="', r += a(e[l].proTitle), r += '" target="_blank"> <img _src="', 
        r += a(e[l].imgURL), r += '" alt="', r += a(e[l].proAlt), r += '" width="288" height="345"> </a> </li> ';
        return r += " </ul> </div>", new p(r);
    }), i("tplMainTopAd", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, s.$escape), e = i.proLink, a = i.proTitle, r = i.imgURL, c = i.proAlt, n = "";
        return n += '<a href="', n += l(e), n += '" title="', n += l(a), n += '"><img class="lazy" data-original="', 
        n += l(r), n += '" alt="', n += l(c), n += '"></a>', new p(n);
    }), i("tplNewPorduct", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, i.i), e = i.list, a = s.$escape, r = "";
        r += '<div class="new-title"><i class="classific-icon title-icon"></i>新品<span>尝鲜</span></div> <ul class="list"> ';
        for (var l = 0; l < e.length; l++) r += ' <li class="new-item"> <a href="', r += a(e[l].proLink), 
        r += '" class="pro-link" target="_blank" title="', r += a(e[l].proTitle), r += '"> <img class="lazy" data-original="', 
        r += a(e[l].imgURL), r += '" width="290" height="193" alt="', r += a(e[l].proAlt), 
        r += '"> </a> <h3 class="pro-title">', r += a(e[l].proTitle), r += '</h3> <p class="pro-price fc-f60">&yen;<strong>', 
        r += a(e[l].proPrice), r += "</strong></p> </li> ";
        return r += " </ul>", new p(r);
    }), i("tplProFloor", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, s.$escape), e = i.floorLevel, a = i.floorName, r = i.moreLink, c = i.i, n = i.floorItemList, o = "";
        o += '<div class="floor-title"><strong>', o += l(e), o += "F · </strong>", o += l(a), 
        o += ' <a href="', o += l(r), o += '" class="floor-more" target="_blank">MORE ></a></div> <div class="pro-slider J_proSlider"> <div class="prev classific-icon"></div> <div class="next classific-icon"></div> <div class="bd"> <ul class="list"> ';
        for (var c = 0; c < n.length; c++) o += ' <li class="item"> <a href="', o += l(n[c].proLink), 
        o += '" class="pro-link" title="', o += l(n[c].proTitle), o += '" target="_blank"> <h3 class="pro-title">', 
        o += l(n[c].proTitle), o += '</h3> <img _src="', o += l(n[c].imgURL), o += '" alt="', 
        o += l(n[c].proAlt), o += '" width="290" height="193"> </a> <p class="pro-price fc-f60">&yen;<strong>', 
        o += l(n[c].proPrice), o += "</strong></p> </li> ";
        return o += " </div> </div>", new p(o);
    }), i("tplRecommendList", function(i, t) {
        "use strict";
        for (var s = this, l = (s.$helpers, i.i), e = i.list, a = s.$escape, r = "", l = 0; l < e.length; l++) r += ' <li class="recommend-item"> <a href="', 
        r += a(e[l].proLink), r += '" target="_blank" title="', r += a(e[l].proTitle), r += '" class="img-link"> <img class="lazy" data-original="', 
        r += a(e[l].imgURL), r += '" alt="', r += a(e[l].proAlt), r += '" width="190" height="125"> </a> <div class="info"> <a href="', 
        r += a(e[l].proLink), r += '" target="_blank" title="', r += a(e[l].proTitle), r += '" class="good-title">', 
        r += a(e[l].proTitle), r += '</a> <p class="fc-f60 price">&yen;<span>', r += a(e[l].proPrice), 
        r += "</span></p> </div> </li> ";
        return r += " ", new p(r);
    }), i("tplRecommendSlider", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, i.i), e = i.typeList, a = s.$escape, r = i.j, c = i.list, n = i.k, o = i.l, d = "";
        d += '<div class="recommend-title"><i class="classific-icon title-icon"></i>热门推荐</div> <div class="recommend-slider-wrap"> <div class="recommend-slider J_recommendSlider"> <div class="hd"> <ul> ';
        for (var l = 0; l < e.length; l++) d += " <li>", d += a(e[l]), d += "</li> ";
        d += ' </ul> </div> <div class="bd"> <ul class="list"> ';
        for (var r = 0; r < c.length; r++) {
            d += ' <li> <div class="left"> <a href="', d += a(c[r].left.proLink), d += '" title="', 
            d += a(c[r].left.porTitle), d += '" target="_blank"><img _src="', d += a(c[r].left.imgURL), 
            d += '" alt="', d += a(c[r].left.proAlt), d += '" width="590" height="393"></a> <div class="info"> <div class="bg"></div> <div class="content"> <h2 class="tit">', 
            d += a(c[r].left.porTitle), d += '</h2> <h3 class="tit2">', d += a(c[r].left.porTitle2), 
            d += '</h3> <p class="line"></p> <p class="pro-price">&yen;<strong>', d += a(c[r].left.porPrice), 
            d += '</strong></p> </div> </div> </div> <div class="middle"> ';
            for (var n = 0; n < c[r].middle.length; n++) d += ' <div class="item"> <div class="pro-title"> <div class="title-bg"></div> <p class="title">', 
            d += a(c[r].middle[n].porTitle), d += '</p> </div> <a href="', d += a(c[r].middle[n].proLink), 
            d += '" class="pro-link" title="', d += a(c[r].middle[n].porTitle), d += '" target="_blank"> <img _src="', 
            d += a(c[r].middle[n].imgURL), d += '" alt="', d += a(c[r].middle[n].proAlt), d += '" width="290" height="193"> </a> <p class="price">&yen;<span>', 
            d += a(c[r].middle[n].porPrice), d += "</span></p> </div> ";
            d += ' </div> <div class="right"> ';
            for (var o = 0; o < c[r].right.length; o++) d += ' <div class="item"> <div class="pro-title"> <div class="title-bg"></div> <p class="title">', 
            d += a(c[r].right[o].porTitle), d += '</p> </div> <a href="', d += a(c[r].right[o].proLink), 
            d += '" title="', d += a(c[r].right[o].porTitle), d += '" class="pro-link" target="_blank"> <img _src="', 
            d += a(c[r].right[o].imgURL), d += '" alt="', d += a(c[r].right[o].proAlt), d += '" width="190" height="127"> </a> <p class="price">&yen;<span>', 
            d += a(c[r].right[o].porPrice), d += "</span></p> </div> ";
            d += " </div> </li> ";
        }
        return d += ' </ul> </div> <div class="prev classific-icon"></div> <div class="next classific-icon"></div> </div> </div> ', 
        new p(d);
    }), i("tplSaleList", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, s.$escape), e = i.startTime, a = i.endTime, r = i.i, c = i.list, n = "";
        n += '<div class="left fl classific-icon"> <div class="countDown J_countDown" data-start="', 
        n += l(e), n += '" data-end="', n += l(a), n += '"></div> </div> <div class="right fr"> <div class="sale-slider J_saleSlider"> <div class="bd"> <ul class="list"> ';
        for (var r = 0; r < c.length; r++) n += ' <li class="item"> <div class="pro-title"> <div class="title-bg"></div> <p class="title">', 
        n += l(c[r].proTitle), n += '</p> </div> <a href="', n += l(c[r].proLink), n += '" class="pro-link" target="_blank" title="', 
        n += l(c[r].proTitle), n += '"> <img class="lazy" _src="', n += l(c[r].imgURL), 
        n += '" width="290" height="193" alt="', n += l(c[r].proAlt), n += '" > </a> <div class="tips classific-icon">', 
        n += l(c[r].cutPrice), n += '</div> <div class="info"> <span class="price fc-f60">&yen;<strong>', 
        n += l(c[r].proPrice), n += '</strong></span> <a href="', n += l(c[r].proLink), 
        n += '" class="go"><span>立即抢&gt;</span></a> </div> </li> ';
        return n += ' </ul> </div> <div class="prev classific-icon"></div> <div class="next classific-icon"></div> </div> </div>', 
        new p(n);
    }), i("tplSideAd", function(i, t) {
        "use strict";
        for (var s = this, l = (s.$helpers, i.i), e = i.list, a = s.$escape, r = "", l = 0; l < e.length; l++) r += ' <a href="', 
        r += a(e[l].proLink), r += '" target="_blank" class="side-ad-link" title="', r += a(e[l].proTitle), 
        r += '"> <img class="lazy" data-original="', r += a(e[l].imgURL), r += '" alt="', 
        r += a(e[l].proAlt), r += '" width="240"> </a> ';
        return r += " ", new p(r);
    }), i("tplStyleTheme", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, i.i), e = i.list, a = s.$escape, r = "";
        r += '<div class="style-title"><i class="classific-icon title-icon"></i>风格主题</div> <div class="style-slider J_styleSlider"> <div class="next"><i class="classific-icon"></i>换一换</div> <div class="bd"> <div class="list"> ';
        for (var l = 0; l < e.length; l++) r += ' <li class="item"> <a href="', r += a(e[l].proLink), 
        r += '" title="', r += a(e[l].proTitle), r += '" target="_blank"> <img _src="', 
        r += a(e[l].imgURL), r += '" alt="', r += a(e[l].proAlt), r += '" width="590" height="280"> <i class="classific-icon go"></i> </a> </li> ';
        return r += " </div> </div> </div>", new p(r);
    }), i("tplTopAd", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, i.bgColor), e = s.$escape, a = i.link, r = i.title, c = i.imgURL, n = i.height, o = "";
        return o += '<div class="top-ad-wrap" style="', "" != l && (o += "background-color: ", 
        o += e(l), o += ";"), o += ' width: 100%;"> <div> <a href="', o += e(a), o += '" target="_blank" title="', 
        o += e(r), o += '" style="background: url(', o += e(c), o += ") top center no-repeat; display:block; width:100%; height: ", 
        o += "" == n ? "120" : e(n), o += 'px;"> <!--<img src="', o += e(c), o += '" alt="', 
        o += e(r), o += '" width="1190" height="80" />--> </a> <a href="javascript:void(0);" class="index-top-ad-close" id="J_indexTopAdClose"> <span></span> </a> </div> </div> ', 
        new p(o);
    }), i("tplYouLike", function(i, t) {
        "use strict";
        var s = this, l = (s.$helpers, i.i), e = i.list, a = s.$escape, r = "";
        r += '<div class="title classific-icon"></div> <ul class="list"> ';
        for (var l = 0; l < e.length; l++) r += ' <li class="like-item"> <a href="', r += a(e[l].proLink), 
        r += '" title="', r += a(e[l].proTitle), r += '" class="img-link" target="_blank"> <div class="mark-info"> <div class="mark"></div> <p class="item-title">', 
        r += a(e[l].proTitle), r += '</p> </div> <img class="lazy" data-original="', r += a(e[l].imgURL), 
        r += '" alt="', r += a(e[l].proAlt), r += '" width="119" height="79"> </a> <p class="fc-f60 price">&yen;<span>', 
        r += a(e[l].proPrice), r += "</span></p> </li> ";
        return r += " </ul> ", new p(r);
    });
}();