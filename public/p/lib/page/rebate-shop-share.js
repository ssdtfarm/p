define("lib/page/rebate-shop-share",["lib/template/temprebate","lib/components/qrcode/1.0.0/qrcode"],function(t,e,r){function n(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),r=window.location.search.substr(1).match(e);return null!=r?unescape(r[2]):null}var a=t("../template/temprebate");t("../components/qrcode/1.0.0/qrcode");$(function(){var t={};!function(){$(document).on("click",".selector",function(t){function e(){n.removeAttr("data-open"),o.slideUp("fast"),i.removeClass("triangle-up-active")}function r(){n.attr("data-open",!0),o.slideDown(),i.addClass("triangle-up-active")}t.stopPropagation(),$(".j_selector").removeAttr("data-open").find(".list").slideUp("fast").end().find(".triangle").removeClass("triangle-up-active");var n=$(this),a=n.find(".title"),i=n.find(".triangle"),o=(n.find(".selector-input"),n.find(".list")),s=n.find("li");n.attr("data-open")?e():r(),s.on("click",function(t){t.stopPropagation(),a.html($(this).find("a").html()),e()})}),$(document).on("click",function(t){$(".selector").removeAttr("data-open").find(".list").slideUp("fast").end().find(".triangle").removeClass("triangle-up-active")})}(),!function(){var e=n("catId"),r=(n("priceRange"),n("rebateRange")),i={},o=[null,"10%以下","10%-20%","20%-30%","30以上"];$.ajax({url:"/shop/shopcats",dataType:"json"}).done(function(r){if(200==r.code&&(t=r.data,e)){var n=$(".j_selector").eq(0).attr("data-parentId");$(".j_selector").eq(0).find("li a").each(function(){var t=$(this),e=t.attr("data-id");e==n&&$(".j_selector").eq(0).find(".title").html(t.html())}),i.list=t[n],$("#secondCats").show().html(a("tplSecondCatsSelect",i));for(var o=0;o<t[n].length;o++)t[n][o].catId==e&&$("#secondCats .title").html(t[n][o].name)}}).fail(function(t){console.log("shop/shopcats error")}),$(".j_selector").eq(0).find("li a").on("click",function(){var e=$(this),r=e.attr("data-id");i.list=t[r],$("#secondCats").show().html(a("tplShopCreateCats",i))}),r&&$(".j_rebateSelector .title").html(o[r]),$(".j_rebateSelector a").on("click",function(){var t=$(this),e=t.attr("data-id"),n=window.location.href;null==r?-1==n.indexOf("?")?window.location.href=n+"?rebateRange="+e:window.location.href=n+"&rebateRange="+e:window.location.href=n.replace(/(&?rebateRange=)(\d{1})/,function(){return RegExp.$1+e})})}(),!function(){function t(t,e,r,n,a,i,o,l){var c="catId=",u="&rebateRange=";t||(u="rebateRange=");var d="&priceRange=";t||e||(d="priceRange=");var h="&key=";t||e||r||(h="key=");var f="&key=";t||e||r||(f="key=");var g="&key=";t||e||r||(g="key=");var p="&key=";t||e||r||(p="key=");var m="";null==t?c="":c+=t,null==e?u="":u+=e,null==a?f="":f+=a,null==n?h="":h+=n,null==r?d="":d+=r,null==i?g="":g+=i,null==o?p="":p+=o,l&&(m="&order="+l),window.location.href=s+"?"+c+u+d+h+f+g+p+m}var e=n("catId"),r=n("priceRange"),a=n("rebateRange"),i=n("key"),o=n("order");if(i&&"recommend"!=i)switch($(".nav-sort dd").removeClass("cur"),i){case"inviter_rate":"desc"==o?($(".nav-sort dd").eq(3).addClass("cur"),$(".j_rebatDsc").addClass("triangle-down-active")):"asc"==o&&$(".j_rebateAsc").addClass("triangle-up-active");break;case"current_price":"desc"==o?($(".nav-sort dd").eq(2).addClass("cur"),$(".j_priceDsc").addClass("triangle-down-active")):"asc"==o&&$(".j_priceAsc").addClass("triangle-up-active");break;case"hot":$(".nav-sort dd").eq(1).addClass("cur")}o="desc"==o?"asc":"desc";var s=location.protocol+"//"+location.host+location.pathname;$(".nav-sort dd").on("click",function(){var n=$(this),i=(n.html(),n.attr("data-id"),n.attr("data-type"));switch(i){case"recommend":t(e,a,r,null,"recommend",null,null,o);break;case"hot":t(e,a,r,"hot",null,null,null,o);break;case"current_price":t(e,a,r,null,null,"current_price",null,o);break;case"inviter_rate":t(e,a,r,null,null,null,"inviter_rate",o)}})}(),!function(){var t=$(".nav-sort .next-page"),e=$(".nav-sort .prev-page"),r=$(".nav-sort .page-now"),a=$(".nav-sort .page-all"),i=n("curpage"),o=window.location.href;1*r.html()!=1*a.html()&&t.addClass("page-active"),t.on("click",function(){1*r.html()<1*a.html()&&(null==i?-1==o.indexOf("?")?window.location.href=o+"?curpage="+(1*r.html()+1):window.location.href=o+"&curpage="+(1*r.html()+1):window.location.href=o.replace(/(&?curpage=)(\d{1,3})/,function(){var t=1*RegExp.$2+1;return RegExp.$1+t}))}),1*r.html()!=1&&e.addClass("page-active"),e.on("click",function(){1*r.html()>1&&(null==i?window.location.href=o+"&curpage="+(1*r.html()+1):window.location.href=o.replace(/(&?curpage=)(\d{1,3})/,function(t,e,r){var n=1*r-1;return e+n}))})}(),!function(){$(".side-nav dd").on("click",function(){var t=$(this);t.addClass("cur").siblings("dd").removeClass("cur"),$(".side-nav .sub").hide(),t.find(".sub").show()})}(),!function(){function t(t){var e=[];for(var r in t)e.push(r+"="+encodeURIComponent(t[r]||""));return e}var e=$("#J_share").attr("data-url"),r={url:e,title:"标题",summary:"描述",pics:"http://img3.jjcdn.com/g1/M00/03/4A/CvoBNFYqAY6ABymFAAS7E5xgneM249.jpg!mid"},n={url:e,title:"标题333",pic:"http://img3.jjcdn.com/g1/M00/03/4A/CvoBNFYqAY6ABymFAAS7E5xgneM249.jpg!mid"},a=t(r),i=t(n),o=document.getElementById("J_share");o.addEventListener("click",function(t){var e=t.target,r=e.getAttribute("data-type");switch(r){case"qq":window.open("http://connect.qq.com/widget/shareqq/index.html?"+a.join("&"));break;case"qzone":window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?"+a.join("&"));break;case"weibo":window.open("http://service.weibo.com/share/share.php?"+i.join("&"))}},!1)}(),!function(){function t(t,e,r,n){var a=navigator.userAgent.toLowerCase();renderType="canvas",/msie/gi.test(a)&&(renderType="table"),n.qrcode({text:r,render:renderType,width:t,height:e})}var e=$("#J_share").attr("data-url");t(120,120,e,$(".j_pop .code-img")),$(".j_pop").hover(function(){$(this).find(".pop").show()},function(){$(this).find(".pop").hide()})}()})}),!function(){function t(t,e){return(/string|function/.test(typeof e)?s:o)(t,e)}function e(t,r){return"string"!=typeof t&&(r=typeof t,"number"===r?t+="":t="function"===r?e(t.call(t)):""),t}function r(t){return d[t]}function n(t){return e(t).replace(/&(?![\w#]+;)|[<>"']/g,r)}function a(t,e){if(h(t))for(var r=0,n=t.length;n>r;r++)e.call(t,t[r],r,t);else for(r in t)e.call(t,t[r],r)}function i(t,e){var r=/(\/)[^/]+\1\.\.\1/,n=("./"+t).replace(/[^/]+$/,""),a=n+e;for(a=a.replace(/\/\.\//g,"/");a.match(r);)a=a.replace(r,"/");return a}function o(e,r){var n=t.get(e)||l({filename:e,name:"Render Error",message:"Template not found"});return r?n(r):n}function s(t,e){if("string"==typeof e){var r=e;e=function(){return new u(r)}}var n=c[t]=function(r){try{return new e(r,t)+""}catch(n){return l(n)()}};return n.prototype=e.prototype=f,n.toString=function(){return e+""},n}function l(t){var e="{Template Error}",r=t.stack||"";if(r)r=r.split("\n").slice(0,2).join("\n");else for(var n in t)r+="<"+n+">\n"+t[n]+"\n\n";return function(){return"object"==typeof console&&console.error(e+"\n\n"+r),e}}var c=t.cache={},u=this.String,d={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},h=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},f=t.utils={$helpers:{},$include:function(t,e,r){return t=i(r,t),o(t,e)},$string:e,$escape:n,$each:a},g=t.helpers=f.$helpers;t.get=function(t){return c[t.replace(/^\.\//,"")]},t.helper=function(t,e){g[t]=e},"function"==typeof define?define("lib/template/temprebate",[],function(e,r,n){return t}):"undefined"!=typeof exports?module.exports=t:this.template=t,t("tplFullSlider",function(t,e){"use strict";var r=this,n=(r.$helpers,t.i),a=t.list,i=r.$escape,o="";o+='<div class="bd"> <ul> ';for(var n=0;n<a.length;n++)o+=' <li> <a href="',o+=i(a[n].linkURL),o+='" target="_blank" title="',o+=i(a[n].pTitle),o+='" style=\'background: url("',o+=i(a[n].imgSRC),o+="\") center center no-repeat;'>&nbsp;</a> </li> ";return o+=' </ul> <a target="_blank" class="arrow prev">&nbsp;</a> <a target="_blank" class="arrow next">&nbsp;</a> </div> <div class="hd"> <ul></ul> </div>',new u(o)}),t("tplRebateAddMainGood",function(t,e){"use strict";var r=this,n=(r.$helpers,r.$escape),a=t.goodLink,i=t.imgURL,o=t.tit,s=t.price,l=t.id,c=t.rebatePprice,d="";return d+='<a href="',d+=n(a),d+='"> <img src="',d+=n(i),d+='" alt=""> <p class="good-title">',d+=n(o),d+='</p> </a> <p><span class="price">',d+=n(s),d+='</span><i class="del j_delMainGood" data-id="',d+=n(l),d+='"></i></p> <div class="tips"> <p>返</p> <p>&yen;',d+=n(c),d+="</p> </div> ",new u(d)}),t("tplSecondCatsSelect",function(t,e){"use strict";var r=this,n=(r.$helpers,t.i),a=t.list,i=r.$escape,o="";o+='<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';for(var n=0;n<a.length;n++)o+=' <li><a href="/rebate/list?catId=',o+=i(a[n].catId),o+='" data-id="',o+=i(a[n].catId),o+='">',o+=i(a[n].name),o+="</a></li> ";return o+=" </ul>",new u(o)}),t("tplSelectForUser",function(t,e){"use strict";var r=this,n=(r.$helpers,t.i),a=t.list,i=r.$escape,o="";o+='<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';for(var n=0;n<a.length;n++)o+=' <li><a href="/shop/justtest?catId=',o+=i(a[n].catId),o+='" data-id="',o+=i(a[n].catId),o+='">',o+=i(a[n].name),o+="</a></li> ";return o+=" </ul>",new u(o)}),t("tplSelectGood",function(t,e){"use strict";var r=this,n=(r.$helpers,r.$escape),a=t.id,i=t.goodLink,o=t.imgURL,s=t.tit,l=t.price,c=t.rebatePprice,d="";return d+='<li class="item fade-in" data-id="',d+=n(a),d+='"> <a href="',d+=n(i),d+='" class="img-link"><img src="',d+=n(o),d+='" ></a> <div class="good-info"> <a href="',d+=n(i),d+='" class="good-title">',d+=n(s),d+='</a> <p class="price">&yen;',d+=n(l),d+='</p> <p class="rebate-price">返',d+=n(c),d+='</p> </div> <i class="del j_removeGood" data-id="',d+=n(a),d+='"></i> </li> ',new u(d)}),t("tplSelectGoodSideList",function(t,e){"use strict";for(var r=this,n=(r.$helpers,t.i),a=t.data,i=r.$escape,o="",n=0;n<a.list.length;n++)o+=' <li class="item" data-id="',o+=i(a.list[n].sku_id),o+='"> <a href="#>" class="img-link"><img src="',o+=i(a.list[n].img),o+='" ></a> <div class="good-info"> <a href="#" class="good-title">',o+=i(a.list[n].sku_title),o+='</a> <p class="price">&yen;',o+=i(a.list[n].price),o+='</p> <p class="rebate-price">返',o+=i(a.list[n].rebatePrice),o+='</p> </div> <i class="del j_removeGood" data-id="',o+=i(a.list[n].sku_id),o+='"></i> </li> ';return new u(o)}),t("tplSelectShare",function(t,e){"use strict";var r=this,n=(r.$helpers,t.i),a=t.list,i=r.$escape,o="";o+='<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';for(var n=0;n<a.length;n++)o+=' <li><a href="/shop/share?catId=',o+=i(a[n].catId),o+='" data-id="',o+=i(a[n].catId),o+='">',o+=i(a[n].name),o+="</a></li> ";return o+=" </ul>",new u(o)}),t("tplSetMainDialog",function(t,e){"use strict";var r=this,n=(r.$helpers,t.i),a=t.data,i=r.$escape,o="";o+='<div class="goods-dialog"> <h6>只可以设置4个主推商品，请先删除已有的主推商品</h6> <ul class="goods-list"> ';for(var n=0;n<a.length;n++)o+=' <li> <dl class="goods"> <dt class="fl w140 ml-10 mr-10"> <a href="javascript:void(0);"><img src="',o+=i(a[n].img),o+='" alt=""></a> </dt> <dd class="fl"><a href="" class="title">',o+=i(a[n].sku_title),o+="</a><span>&yen;",o+=i(a[n].price),o+='</span><span class="fc-f60">返&yen;',o+=i(a[n].price),o+='</span></dd> </dl> <button class="btn-orange J_cancelMain" data-id="',o+=i(a[n].sku_id),o+='">取消主推</button> </li> ';return o+=" </ul> </div> ",new u(o)}),t("tplShopCreateCats",function(t,e){"use strict";var r=this,n=(r.$helpers,t.i),a=t.list,i=r.$escape,o="";o+='<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';for(var n=0;n<a.length;n++)o+=' <li><a href="/shop/create?catId=',o+=i(a[n].catId),o+='" data-id="',o+=i(a[n].catId),o+='">',o+=i(a[n].name),o+="</a></li> ";return o+=" </ul>",new u(o)})}(),define("lib/components/qrcode/1.0.0/qrcode",[],function(t,e,r){!function(t){t.fn.qrcode=function(e){function r(t){this.mode=s,this.data=t}function n(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function a(t,e){if(void 0==t.length)throw Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=Array(t.length-r+e);for(var n=0;n<t.length-r;n++)this.num[n]=t[n+r]}function i(t,e){this.totalCount=t,this.dataCount=e}function o(){this.buffer=[],this.length=0}var s;r.prototype={getLength:function(){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},n.prototype={addData:function(t){this.dataList.push(new r(t)),this.dataCache=null},isDark:function(t,e){if(0>t||this.moduleCount<=t||0>e||this.moduleCount<=e)throw Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){for(var t=1,t=1;40>t;t++){for(var e=i.getRSBlocks(t,this.errorCorrectLevel),r=new o,n=0,a=0;a<e.length;a++)n+=e[a].dataCount;for(a=0;a<this.dataList.length;a++)e=this.dataList[a],r.put(e.mode,4),r.put(e.getLength(),l.getLengthInBits(e.mode,t)),e.write(r);if(r.getLengthInBits()<=8*n)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=Array(this.moduleCount);for(var a=0;a<this.moduleCount;a++)this.modules[r][a]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),7<=this.typeNumber&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=n.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var r=-1;7>=r;r++)if(!(-1>=t+r||this.moduleCount<=t+r))for(var n=-1;7>=n;n++)-1>=e+n||this.moduleCount<=e+n||(this.modules[t+r][e+n]=r>=0&&6>=r&&(0==n||6==n)||n>=0&&6>=n&&(0==r||6==r)||r>=2&&4>=r&&n>=2&&4>=n)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;8>r;r++){this.makeImpl(!0,r);var n=l.getLostPoint(this);(0==r||t>n)&&(t=n,e=r)}return e},createMovieClip:function(t,e,r){for(t=t.createEmptyMovieClip(e,r),this.make(),e=0;e<this.modules.length;e++)for(var r=1*e,n=0;n<this.modules[e].length;n++){var a=1*n;this.modules[e][n]&&(t.beginFill(0,100),t.moveTo(a,r),t.lineTo(a+1,r),t.lineTo(a+1,r+1),t.lineTo(a,r+1),t.endFill())}return t},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=0==t%2);for(t=8;t<this.moduleCount-8;t++)null==this.modules[6][t]&&(this.modules[6][t]=0==t%2)},setupPositionAdjustPattern:function(){for(var t=l.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var n=t[e],a=t[r];if(null==this.modules[n][a])for(var i=-2;2>=i;i++)for(var o=-2;2>=o;o++)this.modules[n+i][a+o]=-2==i||2==i||-2==o||2==o||0==i&&0==o}},setupTypeNumber:function(t){for(var e=l.getBCHTypeNumber(this.typeNumber),r=0;18>r;r++){var n=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=n}for(r=0;18>r;r++)n=!t&&1==(e>>r&1),this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=n},setupTypeInfo:function(t,e){for(var r=l.getBCHTypeInfo(this.errorCorrectLevel<<3|e),n=0;15>n;n++){var a=!t&&1==(r>>n&1);6>n?this.modules[n][8]=a:8>n?this.modules[n+1][8]=a:this.modules[this.moduleCount-15+n][8]=a}for(n=0;15>n;n++)a=!t&&1==(r>>n&1),8>n?this.modules[8][this.moduleCount-n-1]=a:9>n?this.modules[8][15-n-1+1]=a:this.modules[8][15-n-1]=a;this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,n=this.moduleCount-1,a=7,i=0,o=this.moduleCount-1;o>0;o-=2)for(6==o&&o--;;){for(var s=0;2>s;s++)if(null==this.modules[n][o-s]){var c=!1;i<t.length&&(c=1==(t[i]>>>a&1)),l.getMask(e,n,o-s)&&(c=!c),this.modules[n][o-s]=c,a--,-1==a&&(i++,a=7)}if(n+=r,0>n||this.moduleCount<=n){n-=r,r=-r;break}}}},n.PAD0=236,n.PAD1=17,n.createData=function(t,e,r){for(var e=i.getRSBlocks(t,e),a=new o,s=0;s<r.length;s++){var c=r[s];a.put(c.mode,4),a.put(c.getLength(),l.getLengthInBits(c.mode,t)),c.write(a)}for(s=t=0;s<e.length;s++)t+=e[s].dataCount;if(a.getLengthInBits()>8*t)throw Error("code length overflow. ("+a.getLengthInBits()+">"+8*t+")");for(a.getLengthInBits()+4<=8*t&&a.put(0,4);0!=a.getLengthInBits()%8;)a.putBit(!1);for(;!(a.getLengthInBits()>=8*t)&&(a.put(n.PAD0,8),!(a.getLengthInBits()>=8*t));)a.put(n.PAD1,8);return n.createBytes(a,e)},n.createBytes=function(t,e){for(var r=0,n=0,i=0,o=Array(e.length),s=Array(e.length),c=0;c<e.length;c++){var u=e[c].dataCount,d=e[c].totalCount-u,n=Math.max(n,u),i=Math.max(i,d);o[c]=Array(u);for(var h=0;h<o[c].length;h++)o[c][h]=255&t.buffer[h+r];for(r+=u,h=l.getErrorCorrectPolynomial(d),u=new a(o[c],h.getLength()-1).mod(h),s[c]=Array(h.getLength()-1),h=0;h<s[c].length;h++)d=h+u.getLength()-s[c].length,s[c][h]=d>=0?u.get(d):0}for(h=c=0;h<e.length;h++)c+=e[h].totalCount;for(r=Array(c),h=u=0;n>h;h++)for(c=0;c<e.length;c++)h<o[c].length&&(r[u++]=o[c][h]);for(h=0;i>h;h++)for(c=0;c<e.length;c++)h<s[c].length&&(r[u++]=s[c][h]);return r},s=4;for(var l={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;0<=l.getBCHDigit(e)-l.getBCHDigit(l.G15);)e^=l.G15<<l.getBCHDigit(e)-l.getBCHDigit(l.G15);return(t<<10|e)^l.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;0<=l.getBCHDigit(e)-l.getBCHDigit(l.G18);)e^=l.G18<<l.getBCHDigit(e)-l.getBCHDigit(l.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return l.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case 0:return 0==(e+r)%2;case 1:return 0==e%2;case 2:return 0==r%3;case 3:return 0==(e+r)%3;case 4:return 0==(Math.floor(e/2)+Math.floor(r/3))%2;case 5:return 0==e*r%2+e*r%3;case 6:return 0==(e*r%2+e*r%3)%2;case 7:return 0==(e*r%3+(e+r)%2)%2;default:throw Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new a([1],0),r=0;t>r;r++)e=e.multiply(new a([1,c.gexp(r)],0));return e},getLengthInBits:function(t,e){if(e>=1&&10>e)switch(t){case 1:return 10;case 2:return 9;case s:return 8;case 8:return 8;default:throw Error("mode:"+t)}else if(27>e)switch(t){case 1:return 12;case 2:return 11;case s:return 16;case 8:return 10;default:throw Error("mode:"+t)}else{if(!(41>e))throw Error("type:"+e);switch(t){case 1:return 14;case 2:return 13;case s:return 16;case 8:return 12;default:throw Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,n=0;e>n;n++)for(var a=0;e>a;a++){for(var i=0,o=t.isDark(n,a),s=-1;1>=s;s++)if(!(0>n+s||n+s>=e))for(var l=-1;1>=l;l++)0>a+l||a+l>=e||0==s&&0==l||o==t.isDark(n+s,a+l)&&i++;i>5&&(r+=3+i-5)}for(n=0;e-1>n;n++)for(a=0;e-1>a;a++)i=0,t.isDark(n,a)&&i++,t.isDark(n+1,a)&&i++,t.isDark(n,a+1)&&i++,t.isDark(n+1,a+1)&&i++,(0==i||4==i)&&(r+=3);for(n=0;e>n;n++)for(a=0;e-6>a;a++)t.isDark(n,a)&&!t.isDark(n,a+1)&&t.isDark(n,a+2)&&t.isDark(n,a+3)&&t.isDark(n,a+4)&&!t.isDark(n,a+5)&&t.isDark(n,a+6)&&(r+=40);for(a=0;e>a;a++)for(n=0;e-6>n;n++)t.isDark(n,a)&&!t.isDark(n+1,a)&&t.isDark(n+2,a)&&t.isDark(n+3,a)&&t.isDark(n+4,a)&&!t.isDark(n+5,a)&&t.isDark(n+6,a)&&(r+=40);for(a=i=0;e>a;a++)for(n=0;e>n;n++)t.isDark(n,a)&&i++;return t=Math.abs(100*i/e/e-50)/5,r+10*t}},c={glog:function(t){if(1>t)throw Error("glog("+t+")");return c.LOG_TABLE[t]},gexp:function(t){for(;0>t;)t+=255;for(;t>=256;)t-=255;return c.EXP_TABLE[t]},EXP_TABLE:Array(256),LOG_TABLE:Array(256)},u=0;8>u;u++)c.EXP_TABLE[u]=1<<u;for(u=8;256>u;u++)c.EXP_TABLE[u]=c.EXP_TABLE[u-4]^c.EXP_TABLE[u-5]^c.EXP_TABLE[u-6]^c.EXP_TABLE[u-8];for(u=0;255>u;u++)c.LOG_TABLE[c.EXP_TABLE[u]]=u;return a.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var n=0;n<t.getLength();n++)e[r+n]^=c.gexp(c.glog(this.get(r))+c.glog(t.get(n)));return new a(e,0)},mod:function(t){if(0>this.getLength()-t.getLength())return this;for(var e=c.glog(this.get(0))-c.glog(t.get(0)),r=Array(this.getLength()),n=0;n<this.getLength();n++)r[n]=this.get(n);for(n=0;n<t.getLength();n++)r[n]^=c.gexp(c.glog(t.get(n))+e);return new a(r,0).mod(t)}},i.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],i.getRSBlocks=function(t,e){var r=i.getRsBlockTable(t,e);if(void 0==r)throw Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var n=r.length/3,a=[],o=0;n>o;o++)for(var s=r[3*o+0],l=r[3*o+1],c=r[3*o+2],u=0;s>u;u++)a.push(new i(l,c));return a},i.getRsBlockTable=function(t,e){switch(e){case 1:return i.RS_BLOCK_TABLE[4*(t-1)+0];case 0:return i.RS_BLOCK_TABLE[4*(t-1)+1];case 3:return i.RS_BLOCK_TABLE[4*(t-1)+2];case 2:return i.RS_BLOCK_TABLE[4*(t-1)+3]}},o.prototype={get:function(t){return 1==(this.buffer[Math.floor(t/8)]>>>7-t%8&1)},put:function(t,e){for(var r=0;e>r;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},"string"==typeof e&&(e={text:e}),e=t.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,correctLevel:2,background:"#ffffff",foreground:"#000000"},e),this.each(function(){var r;if("canvas"==e.render){r=new n(e.typeNumber,e.correctLevel),r.addData(e.text),r.make();var a=document.createElement("canvas");a.width=e.width,a.height=e.height;for(var i=a.getContext("2d"),o=e.width/r.getModuleCount(),s=e.height/r.getModuleCount(),l=0;l<r.getModuleCount();l++)for(var c=0;c<r.getModuleCount();c++){i.fillStyle=r.isDark(l,c)?e.foreground:e.background;var u=Math.ceil((c+1)*o)-Math.floor(c*o),d=Math.ceil((l+1)*o)-Math.floor(l*o);i.fillRect(Math.round(c*o),Math.round(l*s),u,d)}}else for(r=new n(e.typeNumber,e.correctLevel),r.addData(e.text),r.make(),a=t("<table></table>").css("width",e.width+"px").css("height",e.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",e.background),i=e.width/r.getModuleCount(),o=e.height/r.getModuleCount(),s=0;s<r.getModuleCount();s++)for(l=t("<tr></tr>").css("height",o+"px").appendTo(a),c=0;c<r.getModuleCount();c++)t("<td></td>").css("width",i+"px").css("background-color",r.isDark(s,c)?e.foreground:e.background).appendTo(l);r=a,jQuery(r).appendTo(this)})}}(jQuery)});