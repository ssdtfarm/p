define("lib/page/rebate-select-goods",["lib/template/temprebate","lib/components/dialog/1.0.0/dialog","lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config","lib/components/diyScroll/diyScroll"],function(t,e,i){function n(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),i=window.location.search.substr(1).match(e);return null!=i?unescape(i[2]):null}var s=t("../template/temprebate"),a=t("../components/dialog/1.0.0/dialog"),o=t("../components/diyScroll/diyScroll");$(function(){$(".side2").length&&(new o(".side1 .side-list-wrap",".side1 .side-list-wrap .list"),new o(".side2 .side-list-wrap",".side2 .side-list-wrap .list"));var t={};!function(){$(document).on("click",".selector",function(t){function e(){n.removeAttr("data-open"),o.slideUp("fast"),a.removeClass("triangle-up-active")}function i(){n.attr("data-open",!0),o.slideDown(),a.addClass("triangle-up-active")}t.stopPropagation(),$(".j_selector").removeAttr("data-open").find(".list").slideUp("fast").end().find(".triangle").removeClass("triangle-up-active");var n=$(this),s=n.find(".title"),a=n.find(".triangle"),o=(n.find(".selector-input"),n.find(".list")),l=n.find("li");n.attr("data-open")?e():i(),l.on("click",function(t){t.stopPropagation(),s.html($(this).find("a").html()),e()})}),$(document).on("click",function(t){$(".selector").removeAttr("data-open").find(".list").slideUp("fast").end().find(".triangle").removeClass("triangle-up-active")})}(),!function(){var e=n("catId"),i=n("priceRange"),a=n("rebateRange"),o={},l=[null,"0-1000","1000-3000","3000-5000","5000-10000","10000以上"],r=[null,"10%以下","10%-20%","20%-30%","30以上"];$.ajax({url:"/rebate/cats",dataType:"json"}).done(function(i){if(200==i.code&&(t=i.data,e)){var n=$(".j_selector").eq(0).attr("data-parentId");$(".j_selector").eq(0).find("li a").each(function(){var t=$(this),e=t.attr("data-id");e==n&&$(".j_selector").eq(0).find(".title").html(t.html())}),o.list=t[n],$("#secondCats").show().html(s("tplSecondCatsSelect",o));for(var a=0;a<t[n].length;a++)t[n][a].catId==e&&$("#secondCats .title").html(t[n][a].name)}}).fail(function(t){console.log("/rebate/cats error")}),$(".j_selector").eq(0).find("li a").on("click",function(){var e=$(this),i=e.attr("data-id");o.list=t[i],$("#secondCats").show().html(s("tplSecondCatsSelect",o))}),i&&$(".j_priceSelector .title").html(l[i]),$(".j_priceSelector a").on("click",function(){var t=$(this),e=t.attr("data-id"),n=window.location.href;null==i?-1==n.indexOf("?")?window.location.href=n+"?priceRange="+e:window.location.href=n+"&priceRange="+e:window.location.href=n.replace(/(&?priceRange=)(\d{1})/,function(){return RegExp.$1+e})}),a&&$(".j_rebateSelector .title").html(r[a]),$(".j_rebateSelector a").on("click",function(){var t=$(this),e=t.attr("data-id"),i=window.location.href;null==a?-1==i.indexOf("?")?window.location.href=i+"?rebateRange="+e:window.location.href=i+"&rebateRange="+e:window.location.href=i.replace(/(&?rebateRange=)(\d{1})/,function(){return RegExp.$1+e})})}(),!function(){function t(t,e,i,n,s,a,o,r){var c="catId=",d="&rebateRange=";t||(d="rebateRange=");var u="&priceRange=";t||e||(u="priceRange=");var h="&key=";t||e||i||(h="key=");var p="&key=";t||e||i||(p="key=");var f="&key=";t||e||i||(f="key=");var g="&key=";t||e||i||(g="key=");var v="";null==t?c="":c+=t,null==e?d="":d+=e,null==s?p="":p+=s,null==n?h="":h+=n,null==i?u="":u+=i,null==a?f="":f+=a,null==o?g="":g+=o,r&&(v="&order="+r),window.location.href=l+"?"+c+d+u+h+p+f+g+v}var e=n("catId"),i=n("priceRange"),s=n("rebateRange"),a=n("key"),o=n("order");if(a&&"recommend"!=a)switch($(".nav-sort dd").removeClass("cur"),a){case"inviter_rate":"desc"==o?($(".nav-sort dd").eq(3).addClass("cur"),$(".j_rebatDsc").addClass("triangle-down-active")):"asc"==o&&$(".j_rebateAsc").addClass("triangle-up-active");break;case"current_price":"desc"==o?($(".nav-sort dd").eq(2).addClass("cur"),$(".j_priceDsc").addClass("triangle-down-active")):"asc"==o&&$(".j_priceAsc").addClass("triangle-up-active");break;case"hot":$(".nav-sort dd").eq(1).addClass("cur")}o="desc"==o?"asc":"desc";var l=location.protocol+"//"+location.host+location.pathname;$(".nav-sort dd").on("click",function(){var n=$(this),a=(n.html(),n.attr("data-id"),n.attr("data-type"));switch(a){case"recommend":t(e,s,i,null,"recommend",null,null,o);break;case"hot":t(e,s,i,"hot",null,null,null,o);break;case"current_price":t(e,s,i,null,null,"current_price",null,o);break;case"inviter_rate":t(e,s,i,null,null,null,"inviter_rate",o)}})}(),!function(){var t=$(".nav-sort .next-page"),e=$(".nav-sort .prev-page"),i=$(".nav-sort .page-now"),s=$(".nav-sort .page-all"),a=n("curpage"),o=window.location.href;1*i.html()!=1*s.html()&&t.addClass("page-active"),t.on("click",function(){1*i.html()<1*s.html()&&(null==a?-1==o.indexOf("?")?window.location.href=o+"?curpage="+(1*i.html()+1):window.location.href=o+"&curpage="+(1*i.html()+1):window.location.href=o.replace(/(&?curpage=)(\d{1,3})/,function(){var t=1*RegExp.$2+1;return RegExp.$1+t}))}),1*i.html()!=1&&e.addClass("page-active"),e.on("click",function(){1*i.html()>1&&(null==a?window.location.href=o+"&curpage="+(1*i.html()+1):window.location.href=o.replace(/(&?curpage=)(\d{1,3})/,function(t,e,i){var n=1*i-1;return e+n}))})}(),!function(){function t(){$(".side-title .num").html($(".side .item").length)}$(".j_checkedOne").on("click",function(){function e(){var e="",i={tit:a.find(".good-title").html(),price:a.find(".price").html(),rebatePprice:a.find(".rebate-price strong").html(),id:o,imgURL:a.find("img").attr("src"),goodLink:a.find("a").attr("href")};e=s("tplSelectGood",i),$(".side .list").css("margin-top","-93px").prepend(e).animate({marginTop:0},400,function(){$(".fade-in").animate({opacity:1},200,function(){$(".fade-in").removeClass("fade-in")})}),t()}function i(){$(".side .item").each(function(e,i){var n=$(this),s=n.attr("data-id");s==o&&n.fadeOut("300",function(){n.remove(),t()})})}var n=$(this),a=n.parents("li"),o=a.attr("data-id");a.hasClass("selected")?$.ajax({url:"/shop/delete",dataType:"json",data:{skuId:o}}).done(function(t){200==t.code?(a.removeClass("selected"),i()):console.log(t)}).fail(function(){console.log("/shop/add error")}):$.ajax({url:"/shop/add",dataType:"json",data:{skuId:o}}).done(function(t){200==t.code?(e(),a.addClass("selected")):console.log(t)}).fail(function(){console.log("/shop/add error")})}),$(document).on("click",".j_removeGood",function(){function e(){$.ajax({url:"/shop/delete",dataType:"json",data:{skuId:o}}).done(function(t){200==t.code?i():console.log(t)}).fail(function(){console.log("/shop/add error")})}function i(){s.fadeOut("300",function(){s.remove(),t()}),$(".main .item").each(function(){var t=$(this),e=t.attr("data-id");e==o&&t.removeClass("selected")})}var n=$(this),s=n.parents("li"),o=n.attr("data-id");new a({title:"提示",content:"确认删除该商品？",width:474,height:100,fixed:!0,zIndex:198502,button:[{value:"确定",className:"ui-btns-orange",callback:function(){e()}},{value:"取消",className:"ui-btns-cancel",callback:function(){}}]}).showModal()})}(),!function(){$.ajax({url:"/shop/ajaxlist",dataType:"json",data:{curpage:1}}).done(function(t){if(200==t.code){$(".side .side-title .num").html(t.data.list.length);var e=s("tplSelectGoodSideList",t);$(".side .list").html(e),new o(".side-list-wrap",".side-list-wrap .list")}}).fail(function(){console.log("/shop/ajaxlist error")})}()})}),!function(){function t(t,e){return(/string|function/.test(typeof e)?l:o)(t,e)}function e(t,i){return"string"!=typeof t&&(i=typeof t,"number"===i?t+="":t="function"===i?e(t.call(t)):""),t}function i(t){return u[t]}function n(t){return e(t).replace(/&(?![\w#]+;)|[<>"']/g,i)}function s(t,e){if(h(t))for(var i=0,n=t.length;n>i;i++)e.call(t,t[i],i,t);else for(i in t)e.call(t,t[i],i)}function a(t,e){var i=/(\/)[^/]+\1\.\.\1/,n=("./"+t).replace(/[^/]+$/,""),s=n+e;for(s=s.replace(/\/\.\//g,"/");s.match(i);)s=s.replace(i,"/");return s}function o(e,i){var n=t.get(e)||r({filename:e,name:"Render Error",message:"Template not found"});return i?n(i):n}function l(t,e){if("string"==typeof e){var i=e;e=function(){return new d(i)}}var n=c[t]=function(i){try{return new e(i,t)+""}catch(n){return r(n)()}};return n.prototype=e.prototype=p,n.toString=function(){return e+""},n}function r(t){var e="{Template Error}",i=t.stack||"";if(i)i=i.split("\n").slice(0,2).join("\n");else for(var n in t)i+="<"+n+">\n"+t[n]+"\n\n";return function(){return"object"==typeof console&&console.error(e+"\n\n"+i),e}}var c=t.cache={},d=this.String,u={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},h=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},p=t.utils={$helpers:{},$include:function(t,e,i){return t=a(i,t),o(t,e)},$string:e,$escape:n,$each:s},f=t.helpers=p.$helpers;t.get=function(t){return c[t.replace(/^\.\//,"")]},t.helper=function(t,e){f[t]=e},"function"==typeof define?define("lib/template/temprebate",[],function(e,i,n){return t}):"undefined"!=typeof exports?module.exports=t:this.template=t,t("tplFullSlider",function(t,e){"use strict";var i=this,n=(i.$helpers,t.i),s=t.list,a=i.$escape,o="";o+='<div class="bd"> <ul> ';for(var n=0;n<s.length;n++)o+=' <li> <a href="',o+=a(s[n].linkURL),o+='" target="_blank" title="',o+=a(s[n].pTitle),o+='" style=\'background: url("',o+=a(s[n].imgSRC),o+="\") center center no-repeat;'>&nbsp;</a> </li> ";return o+=' </ul> <a target="_blank" class="arrow prev">&nbsp;</a> <a target="_blank" class="arrow next">&nbsp;</a> </div> <div class="hd"> <ul></ul> </div>',new d(o)}),t("tplRebateAddMainGood",function(t,e){"use strict";var i=this,n=(i.$helpers,i.$escape),s=t.goodLink,a=t.imgURL,o=t.tit,l=t.price,r=t.id,c=t.rebatePprice,u="";return u+='<a href="',u+=n(s),u+='"> <img src="',u+=n(a),u+='" alt=""> <p class="good-title">',u+=n(o),u+='</p> </a> <p><span class="price">',u+=n(l),u+='</span><i class="del j_delMainGood" data-id="',u+=n(r),u+='"></i></p> <div class="tips"> <p>返</p> <p>&yen;',u+=n(c),u+="</p> </div> ",new d(u)}),t("tplSecondCatsSelect",function(t,e){"use strict";var i=this,n=(i.$helpers,t.i),s=t.list,a=i.$escape,o="";o+='<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';for(var n=0;n<s.length;n++)o+=' <li><a href="/rebate/list?catId=',o+=a(s[n].catId),o+='" data-id="',o+=a(s[n].catId),o+='">',o+=a(s[n].name),o+="</a></li> ";return o+=" </ul>",new d(o)}),t("tplSelectForUser",function(t,e){"use strict";var i=this,n=(i.$helpers,t.i),s=t.list,a=i.$escape,o="";o+='<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';for(var n=0;n<s.length;n++)o+=' <li><a href="/shop/justtest?catId=',o+=a(s[n].catId),o+='" data-id="',o+=a(s[n].catId),o+='">',o+=a(s[n].name),o+="</a></li> ";return o+=" </ul>",new d(o)}),t("tplSelectGood",function(t,e){"use strict";var i=this,n=(i.$helpers,i.$escape),s=t.id,a=t.goodLink,o=t.imgURL,l=t.tit,r=t.price,c=t.rebatePprice,u="";return u+='<li class="item fade-in" data-id="',u+=n(s),u+='"> <a href="',u+=n(a),u+='" class="img-link"><img src="',u+=n(o),u+='" ></a> <div class="good-info"> <a href="',u+=n(a),u+='" class="good-title">',u+=n(l),u+='</a> <p class="price">&yen;',u+=n(r),u+='</p> <p class="rebate-price">返',u+=n(c),u+='</p> </div> <i class="del j_removeGood" data-id="',u+=n(s),u+='"></i> </li> ',new d(u)}),t("tplSelectGoodSideList",function(t,e){"use strict";for(var i=this,n=(i.$helpers,t.i),s=t.data,a=i.$escape,o="",n=0;n<s.list.length;n++)o+=' <li class="item" data-id="',o+=a(s.list[n].sku_id),o+='"> <a href="#>" class="img-link"><img src="',o+=a(s.list[n].img),o+='" ></a> <div class="good-info"> <a href="#" class="good-title">',o+=a(s.list[n].sku_title),o+='</a> <p class="price">&yen;',o+=a(s.list[n].price),o+='</p> <p class="rebate-price">返',o+=a(s.list[n].rebatePrice),o+='</p> </div> <i class="del j_removeGood" data-id="',o+=a(s.list[n].sku_id),o+='"></i> </li> ';return new d(o)}),t("tplSelectShare",function(t,e){"use strict";var i=this,n=(i.$helpers,t.i),s=t.list,a=i.$escape,o="";o+='<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';for(var n=0;n<s.length;n++)o+=' <li><a href="/shop/share?catId=',o+=a(s[n].catId),o+='" data-id="',o+=a(s[n].catId),o+='">',o+=a(s[n].name),o+="</a></li> ";return o+=" </ul>",new d(o)}),t("tplSetMainDialog",function(t,e){"use strict";var i=this,n=(i.$helpers,t.i),s=t.data,a=i.$escape,o="";o+='<div class="goods-dialog"> <h6>只可以设置4个主推商品，请先删除已有的主推商品</h6> <ul class="goods-list"> ';for(var n=0;n<s.length;n++)o+=' <li> <dl class="goods"> <dt class="fl w140 ml-10 mr-10"> <a href="javascript:void(0);"><img src="',o+=a(s[n].img),o+='" alt=""></a> </dt> <dd class="fl"><a href="" class="title">',o+=a(s[n].sku_title),o+="</a><span>&yen;",o+=a(s[n].price),o+='</span><span class="fc-f60">返&yen;',o+=a(s[n].price),o+='</span></dd> </dl> <button class="btn-orange J_cancelMain" data-id="',o+=a(s[n].sku_id),o+='">取消主推</button> </li> ';return o+=" </ul> </div> ",new d(o)}),t("tplShopCreateCats",function(t,e){"use strict";var i=this,n=(i.$helpers,t.i),s=t.list,a=i.$escape,o="";o+='<p class="title">请选择</p> <i class="triangle triangle-down"></i> <input type="text" class="selector-input"> <ul class="list"> ';for(var n=0;n<s.length;n++)o+=' <li><a href="/shop/create?catId=',o+=a(s[n].catId),o+='" data-id="',o+=a(s[n].catId),o+='">',o+=a(s[n].name),o+="</a></li> ";return o+=" </ul>",new d(o)})}(),define("lib/components/dialog/1.0.0/dialog",["lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config"],function(t,e,i){var n=t("./popup"),s=t("./dialog-config"),a=s.cssUri;if(a){var o=t[t.toUrl?"toUrl":"resolve"];o&&(a=o(a),a='<link rel="stylesheet" href="'+a+'" />',$("base")[0]?$("base").before(a):$("head").append(a))}var l=0,r=new Date-0,c=!("minWidth"in $("html")[0].style),d="createTouch"in document&&!("onmousemove"in document)||/(iPhone|iPad|iPod)/i.test(navigator.userAgent),u=!c&&!d,h=function(t,e,i){var n=t=t||{};"string"!=typeof t&&1!==t.nodeType||(t={content:t,fixed:!d}),t=$.extend(!0,{},h.defaults,t),t.original=n;var s=t.id=t.id||r+l,a=h.get(s);return a?a.focus():(u||(t.fixed=!0),t.quickClose&&(t.modal=!0,t.backdropOpacity=0),$.isArray(t.button)||(t.button=[]),void 0!==i&&(t.cancel=i),t.cancel&&t.button.push({id:"cancel",className:t.cancelClassName,value:t.cancelValue,callback:t.cancel,display:t.cancelDisplay}),void 0!==e&&(t.ok=e),t.ok&&t.button.push({id:"ok",className:t.okClassName,value:t.okValue,callback:t.ok,autofocus:!0}),h.list[s]=new h.create(t))},p=function(){};p.prototype=n.prototype;var f=h.prototype=new p;return h.create=function(t){var e=this;$.extend(this,new n);var i=(t.original,$(this.node).html(t.innerHTML)),s=$(this.backdrop);return this.options=t,this._popup=i,$.each(t,function(t,i){"function"==typeof e[t]?e[t](i):e[t]=i}),t.zIndex&&(n.zIndex=t.zIndex),i.attr({"aria-labelledby":this._$("title").attr("id","title:"+this.id).attr("id"),"aria-describedby":this._$("content").attr("id","content:"+this.id).attr("id")}),this._$("close").css("display",this.cancel===!1?"none":"").on("click",function(t){e._trigger("cancel"),t.preventDefault()}),this._$("dialog").addClass(this.skin),this._$("body").css("padding",this.padding),t.quickClose&&s.on("onmousedown"in document?"mousedown":"click",function(){return e._trigger("cancel"),!1}),this.addEventListener("show",function(){s.css({opacity:0,background:t.backdropBackground}).animate({opacity:t.backdropOpacity},150)}),this._esc=function(t){var i=t.target,s=i.nodeName,a=/^input|textarea$/i,o=n.current===e,l=t.keyCode;!o||a.test(s)&&"button"!==i.type||27===l&&e._trigger("cancel")},$(document).on("keydown",this._esc),this.addEventListener("remove",function(){$(document).off("keydown",this._esc),delete h.list[this.id]}),l++,h.oncreate(this),this},h.create.prototype=f,$.extend(f,{content:function(t){var e=this._$("content");return"object"==typeof t?(t=$(t),e.empty("").append(t.show()),this.addEventListener("beforeremove",function(){$("body").append(t.hide())})):e.html(t),this.reset()},title:function(t){return this._$("title").text(t),this._$("header")[t?"show":"hide"](),this},width:function(t){return this._$("content").css("width",t),this.reset()},height:function(t){return this._$("content").css("height",t),this.reset()},button:function(t){t=t||[];var e=this,i="",n=0;return this.callbacks={},"string"==typeof t?(i=t,n++):$.each(t,function(t,s){var a=s.id=s.id||s.value,o="";e.callbacks[a]=s.callback,s.display===!1?o=' style="display:none"':n++,i+='<button type="button" i-id="'+a+'" class="'+(s.className?s.className:"ui-btns-nor")+'"'+o+(s.disabled?" disabled":"")+(s.autofocus?' autofocus class="ui-dialog-autofocus"':"")+">"+s.value+"</button>",e._$("button").on("click","[i-id="+a+"]",function(t){var i=$(this);i.attr("disabled")||e._trigger(a),t.preventDefault()})}),this._$("button").html(i),this._$("footer")[n?"show":"hide"](),this},statusbar:function(t){return this._$("statusbar").html(t)[t?"show":"hide"](),this},_$:function(t){return this._popup.find("[i="+t+"]")},_trigger:function(t){var e=this.callbacks[t];return"function"!=typeof e||e.call(this)!==!1?this.close().remove():this}}),h.oncreate=$.noop,h.getCurrent=function(){return n.current},h.get=function(t){return void 0===t?h.list:h.list[t]},h.list={},h.defaults=s,h}),define("lib/components/dialog/1.0.0/popup",[],function(t,e,i){function n(){this.destroyed=!1,this.__popup=$("<div />").css({display:"none",position:"absolute",outline:0}).attr("tabindex","-1").html(this.innerHTML).appendTo("body"),this.__backdrop=this.__mask=$("<div />").css({opacity:.7,background:"#000"}),this.node=this.__popup[0],this.backdrop=this.__backdrop[0],s++}var s=0,a=!("minWidth"in $("html")[0].style),o=!a;return $.extend(n.prototype,{node:null,backdrop:null,fixed:!1,destroyed:!0,open:!1,returnValue:"",autofocus:!0,align:"bottom left",innerHTML:"",className:"ui-popup",show:function(t){if(this.destroyed)return this;var e=this.__popup,i=this.__backdrop;if(this.__activeElement=this.__getActive(),this.open=!0,this.follow=t||this.follow,!this.__ready){if(e.addClass(this.className).attr("role",this.modal?"alertdialog":"dialog").css("position",this.fixed?"fixed":"absolute"),a||$(window).on("resize",$.proxy(this.reset,this)),this.modal){var s={position:"fixed",left:0,top:0,width:"100%",height:"100%",overflow:"hidden",userSelect:"none",zIndex:this.zIndex||n.zIndex};e.addClass(this.className+"-modal"),o||$.extend(s,{position:"absolute",width:$(window).width()+"px",height:$(document).height()+"px"}),i.css(s).attr({tabindex:"0"}).on("focus",$.proxy(this.focus,this)),this.__mask=i.clone(!0).attr("style","").insertAfter(e),i.addClass(this.className+"-backdrop").insertBefore(e),this.__ready=!0}e.html()||e.html(this.innerHTML)}return e.addClass(this.className+"-show").show(),i.show(),this.reset().focus(),this.__dispatchEvent("show"),this},showModal:function(){return this.modal=!0,this.show.apply(this,arguments)},close:function(t){return!this.destroyed&&this.open&&(void 0!==t&&(this.returnValue=t),this.__popup.hide().removeClass(this.className+"-show"),this.__backdrop.hide(),this.open=!1,this.blur(),this.__dispatchEvent("close")),this},remove:function(){if(this.destroyed)return this;this.__dispatchEvent("beforeremove"),n.current===this&&(n.current=null),this.__popup.remove(),this.__backdrop.remove(),this.__mask.remove(),a||$(window).off("resize",this.reset),this.__dispatchEvent("remove");for(var t in this)delete this[t];return this},reset:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("reset"),this},resize:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("resize"),this},focus:function(){var t=this.node,e=this.__popup,i=n.current,s=this.zIndex=n.zIndex++;if(i&&i!==this&&i.blur(!1),!$.contains(t,this.__getActive())){var a=e.find("[autofocus]")[0];!this._autofocus&&a?this._autofocus=!0:a=t,this.__focus(a)}return e.css("zIndex",s),n.current=this,e.addClass(this.className+"-focus"),this.__dispatchEvent("focus"),this},blur:function(){var t=this.__activeElement,e=arguments[0];return e!==!1&&this.__focus(t),this._autofocus=!1,this.__popup.removeClass(this.className+"-focus"),this.__dispatchEvent("blur"),this},addEventListener:function(t,e){return this.__getEventListener(t).push(e),this},removeEventListener:function(t,e){for(var i=this.__getEventListener(t),n=0;n<i.length;n++)e===i[n]&&i.splice(n--,1);return this},__getEventListener:function(t){var e=this.__listener;return e||(e=this.__listener={}),e[t]||(e[t]=[]),e[t]},__dispatchEvent:function(t){var e=this.__getEventListener(t);this["on"+t]&&this["on"+t]();for(var i=0;i<e.length;i++)e[i].call(this)},__focus:function(t){try{this.autofocus&&!/^iframe$/i.test(t.nodeName)&&t.focus()}catch(e){}},__getActive:function(){try{var t=document.activeElement,e=t.contentDocument,i=e&&e.activeElement||t;return i}catch(n){}},__center:function(){var t=this.__popup,e=$(window),i=$(document),n=this.fixed,s=n?0:i.scrollLeft(),a=n?0:i.scrollTop(),o=e.width(),l=e.innerHeight(),r=t.width(),c=t.height(),d=(o-r)/2,u=(l-c)/2,h=t[0].style;h.left=Math.max(parseInt(d),s)+"px",h.top=Math.max(parseInt(u),a)+"px"},__follow:function(t){var e=t.parentNode&&$(t),i=this.__popup;if(this.__followSkin&&i.removeClass(this.__followSkin),e){var n=e.offset();if(n.left*n.top<0)return this.__center()}var s=this,a=this.fixed,o=$(window),l=$(document),r=o.width(),c=o.height(),d=l.scrollLeft(),u=l.scrollTop(),h=i.width(),p=i.height(),f=e?e.outerWidth():0,g=e?e.outerHeight():0,v=this.__offset(t),m=v.left,_=v.top,b=a?m-d:m,w=a?_-u:_,y=a?0:d,k=a?0:u,x=y+r-h,C=k+c-p,S={},j=this.align.split(" "),E=this.className+"-",I={top:"bottom",bottom:"top",left:"right",right:"left"},L={top:"top",bottom:"top",left:"left",right:"left"},T=[{top:w-p,bottom:w+g,left:b-h,right:b+f},{top:w,bottom:w-p+g,left:b,right:b-h+f}],N={left:b+f/2-h/2,top:w+g/2-p/2},R={left:[y,x],top:[k,C]};$.each(j,function(t,e){T[t][e]>R[L[e]][1]&&(e=j[t]=I[e]),T[t][e]<R[L[e]][0]&&(j[t]=I[e])}),j[1]||(L[j[1]]="left"===L[j[0]]?"top":"left",T[1][j[1]]=N[L[j[1]]]),E+=j.join("-")+" "+this.className+"-follow",s.__followSkin=E,e&&i.addClass(E),S[L[j[0]]]=parseInt(T[0][j[0]]),S[L[j[1]]]=parseInt(T[1][j[1]]),i.css(S)},__offset:function(t){var e=t.parentNode,i=e?$(t).offset():{left:t.pageX,top:t.pageY};t=e?t:t.target;var n=t.ownerDocument,s=n.defaultView||n.parentWindow;if(s==window)return i;var a=s.frameElement,o=$(n),l=o.scrollLeft(),r=o.scrollTop(),c=$(a).offset(),d=c.left,u=c.top;return{left:i.left+d-l,top:i.top+u-r}}}),n.zIndex=1024,n.current=null,n}),define("lib/components/dialog/1.0.0/dialog-config",[],{backdropBackground:"#000",backdropOpacity:.7,content:'<span class="ui-dialog-loading">Loading..</span>',title:"",statusbar:"",button:null,ok:null,okClassName:"ui-btns-ok",cancel:null,cancelClassName:"ui-btns-cancel",okValue:"ok",cancelValue:"cancel",cancelDisplay:!0,width:"",height:"",padding:"",skin:"",quickClose:!1,cssUri:"",innerHTML:'<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><span i="close" class="ui-dialog-close">&#215;</span><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="button" class="ui-dialog-button"></div></td></tr><tr><td i="footerSub" class="ui-dialog-footer"><div i="statusbar" class="ui-dialog-statusbar"></div></td></tr></table></div>'}),define("lib/components/diyScroll/diyScroll",[],function(t,e,i){function n(t,e,i){(t||e)&&(this.wrap=$(t)[0],this.list=$(e)[0],this.scale=this.wrap.clientHeight/this.list.scrollHeight,this.scale>1||(this.settings={boxClass:"scrollbox",barClass:"scrollbar"},this.h=0,this.t=0,this.barMaxTop=0,this.contentMaxTop=0,i&&this.extend(this.settings,i),this.init()))}n.prototype={init:function(){this.scrollBox=document.createElement("div"),this.scrollBar=document.createElement("div"),this.scrollBox.className=this.settings.boxClass,this.scrollBar.className=this.settings.barClass,this.scrollBox.appendChild(this.scrollBar),this.wrap.appendChild(this.scrollBox),this.h=this.scale*this.scrollBox.scrollHeight,this.barMaxTop=this.scrollBox.scrollHeight-this.h,this.contentMaxTop=this.wrap.clientHeight-this.list.scrollHeight,1==this.scale&&(this.scrollBox.style.display="none"),this.scrollBar.style.height=this.h+"px",this.scroll(),this.bindEvent()},scroll:function(){var t=this;this.scrollBar.onmousedown=function(e){var e=e||event,i=e.clientY-this.offsetTop;document.onmousemove=function(e){var e=e||event;t.t=e.clientY-i,t.fnScroll()},document.onmouseup=function(){document.onmouseup=document.onmousemove=null},e.stopPropagation(),e.preventDefault()}},bindEvent:function(){var t=this;this.list.onmousewheel=function(e){t.mouseScroll(e)},this.list.addEventListener&&this.list.addEventListener("DOMMouseScroll",function(e){t.mouseScroll(e)},!1)},mouseScroll:function(t){var t=t||event,e=t.wheelDelta||t.detail,i=!0;return i=t.detail?e>0:!(e>0),i?this.t+=10:this.t-=10,this.fnScroll(),t.preventDefault&&t.preventDefault(),!1},fnScroll:function(){this.t<0&&(this.t=0),this.t>this.barMaxTop&&(this.t=this.barMaxTop);var t=this.t/this.barMaxTop,e=t*this.contentMaxTop;this.scrollBar.style.top=this.t+"px",this.list.style.top=e+"px"}},i.exports=n});