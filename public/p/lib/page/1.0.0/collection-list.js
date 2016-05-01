define("libpage.0.0/collection-list",["lib/components/dialog/1.0.0/dialog","lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config","lib/components/minBar/1.0.1/minBar","lib/template/tempcomment"],function(t,i,e){function a(t){t.hasClass("icon-box-normal")?(t.removeClass("icon-box-normal").addClass("icon-box-checked"),t.siblings("input").prop("checked",!0)):(t.removeClass("icon-box-checked").addClass("icon-box-normal"),t.siblings("input").prop("checked",!1))}function n(t){return $("input[name="+t+"]:checked").length}function s(t){var i=[],e="";$("input[name="+t+"]:checked").each(function(t){i.push($(this).val())});for(var a=0;len=i.length,a<len;a++)e+=i[a]+",";return e}function o(t){t.hasClass("icon-box-normal")?($("input[name=chkItem]").each(function(t){$(this).prop("checked",!0)}),$(".JQ_chkItem").each(function(){$(this).removeClass("icon-box-normal").addClass("icon-box-checked")}),t.siblings("input").prop("checked",!0)):($("input[name=chkItem]").each(function(t){$(this).prop("checked",!1)}),$(".JQ_chkItem").each(function(){$(this).removeClass("icon-box-checked").addClass("icon-box-normal")}),t.siblings("input").prop("checked",!0))}var l=t("../../components/dialog/1.0.0/dialog"),c=t("../../components/minBar/1.0.1/minBar"),r=t("../../template/tempcomment");c({mainCell:"#J_minBar",pathConfig:cdnConfig,tpl:r,tplName:"tplMinBar",data:_globalConfig.minBar.data}),document.getElementById("J_memberAside").innerHTML=document.getElementById("J_templateMemberAside").innerHTML,$(".collection-item").each(function(t,i){t>0&&(t+1)%4==0&&$(this).css({"margin-right":"0px"})});var d=$("input[name=chkItem]").length;$(".JQ_chkAll").on("click",function(){o($(this)),$(".JQ_chkAll").each(function(){$(this).hasClass("icon-box-normal")?($(this).removeClass("icon-box-normal").addClass("icon-box-checked"),$(this).siblings("input").prop("checked",!0)):($(this).removeClass("icon-box-checked").addClass("icon-box-normal"),$(this).siblings("input").prop("checked",!0))})}),$(".JQ_chkItem").on("click",function(){var t=$(".JQ_chkAll");a($(this)),d==n("chkItem")?(t.removeClass("icon-box-normal").addClass("icon-box-checked"),t.siblings("input").prop("checked",!0)):(t.removeClass("icon-box-checked").addClass("icon-box-normal"),t.siblings("input").prop("checked",!1))}),$(".JQ_delAll").on("click",function(t){t.preventDefault();var i=$(this);if(n("chkItem")<=0){new l({title:"提示",content:'<p>&nbsp;<p><p class="tc">请选择需要删除的商品！</p>',width:400,height:60,fixed:!0,button:[{value:"确定",className:"ui-btns-orange",callback:function(){}}]}).showModal()}else{new l({title:"提示",title:"提示",content:'<p>&nbsp;<p><p class="tc">确定要删除所选商品？</p>',width:400,height:60,fixed:!0,button:[{value:"确定",className:"ui-btns-orange",callback:function(){window.location.href=i.attr("href")+"?data="+s("chkItem")}},{value:"取消",className:"ui-btns-gray",callback:function(){}}]}).showModal()}}),$(".JQ_delItem").on("click",function(t){t.preventDefault();var i=$(this);new l({title:"提示",content:'<p>&nbsp;</p><p class="tc">您确定要删除该商品？</p>',width:300,height:60,fixed:!0,button:[{value:"确定",className:"ui-btns-orange",callback:function(){window.location.href=i.attr("href")}},{value:"取消",className:"ui-btns-gray",callback:function(){}}]}).showModal()}),$(".JQ_favoriteAll").on("click",function(t){if(t.preventDefault(),n("chkItem")<=0){new l({title:"提示",content:'<p>&nbsp;<p><p class="tc">请选择要加入购物车的商品</p>',width:400,height:60,fixed:!0,button:[{value:"确定",className:"ui-btns-orange",callback:function(){}}]}).showModal()}else reqURL=$(this).attr("href")+"?sku_id="+s("chkItem"),window.location.href=reqURL})}),define("lib/components/dialog/1.0.0/dialog",["lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config"],function(t,i,e){var a=t("./popup"),n=t("./dialog-config"),s=n.cssUri;if(s){var o=t[t.toUrl?"toUrl":"resolve"];o&&(s=o(s),s='<link rel="stylesheet" href="'+s+'" />',$("base")[0]?$("base").before(s):$("head").append(s))}var l=0,c=new Date-0,r=!("minWidth"in $("html")[0].style),d="createTouch"in document&&!("onmousemove"in document)||/(iPhone|iPad|iPod)/i.test(navigator.userAgent),p=!r&&!d,h=function(t,i,e){var a=t=t||{};"string"!=typeof t&&1!==t.nodeType||(t={content:t,fixed:!d}),t=$.extend(!0,{},h.defaults,t),t.original=a;var n=t.id=t.id||c+l,s=h.get(n);return s?s.focus():(p||(t.fixed=!0),t.quickClose&&(t.modal=!0,t.backdropOpacity=0),$.isArray(t.button)||(t.button=[]),void 0!==e&&(t.cancel=e),t.cancel&&t.button.push({id:"cancel",className:t.cancelClassName,value:t.cancelValue,callback:t.cancel,display:t.cancelDisplay}),void 0!==i&&(t.ok=i),t.ok&&t.button.push({id:"ok",className:t.okClassName,value:t.okValue,callback:t.ok,autofocus:!0}),h.list[n]=new h.create(t))},u=function(){};u.prototype=a.prototype;var f=h.prototype=new u;return h.create=function(t){var i=this;$.extend(this,new a);var e=(t.original,$(this.node).html(t.innerHTML)),n=$(this.backdrop);return this.options=t,this._popup=e,$.each(t,function(t,e){"function"==typeof i[t]?i[t](e):i[t]=e}),t.zIndex&&(a.zIndex=t.zIndex),e.attr({"aria-labelledby":this._$("title").attr("id","title:"+this.id).attr("id"),"aria-describedby":this._$("content").attr("id","content:"+this.id).attr("id")}),this._$("close").css("display",this.cancel===!1?"none":"").on("click",function(t){i._trigger("cancel"),t.preventDefault()}),this._$("dialog").addClass(this.skin),this._$("body").css("padding",this.padding),t.quickClose&&n.on("onmousedown"in document?"mousedown":"click",function(){return i._trigger("cancel"),!1}),this.addEventListener("show",function(){n.css({opacity:0,background:t.backdropBackground}).animate({opacity:t.backdropOpacity},150)}),this._esc=function(t){var e=t.target,n=e.nodeName,s=/^input|textarea$/i,o=a.current===i,l=t.keyCode;!o||s.test(n)&&"button"!==e.type||27===l&&i._trigger("cancel")},$(document).on("keydown",this._esc),this.addEventListener("remove",function(){$(document).off("keydown",this._esc),delete h.list[this.id]}),l++,h.oncreate(this),this},h.create.prototype=f,$.extend(f,{content:function(t){var i=this._$("content");return"object"==typeof t?(t=$(t),i.empty("").append(t.show()),this.addEventListener("beforeremove",function(){$("body").append(t.hide())})):i.html(t),this.reset()},title:function(t){return this._$("title").text(t),this._$("header")[t?"show":"hide"](),this},width:function(t){return this._$("content").css("width",t),this.reset()},height:function(t){return this._$("content").css("height",t),this.reset()},button:function(t){t=t||[];var i=this,e="",a=0;return this.callbacks={},"string"==typeof t?(e=t,a++):$.each(t,function(t,n){var s=n.id=n.id||n.value,o="";i.callbacks[s]=n.callback,n.display===!1?o=' style="display:none"':a++,e+='<button type="button" i-id="'+s+'" class="'+(n.className?n.className:"ui-btns-nor")+'"'+o+(n.disabled?" disabled":"")+(n.autofocus?' autofocus class="ui-dialog-autofocus"':"")+">"+n.value+"</button>",i._$("button").on("click","[i-id="+s+"]",function(t){var e=$(this);e.attr("disabled")||i._trigger(s),t.preventDefault()})}),this._$("button").html(e),this._$("footer")[a?"show":"hide"](),this},statusbar:function(t){return this._$("statusbar").html(t)[t?"show":"hide"](),this},_$:function(t){return this._popup.find("[i="+t+"]")},_trigger:function(t){var i=this.callbacks[t];return"function"!=typeof i||i.call(this)!==!1?this.close().remove():this}}),h.oncreate=$.noop,h.getCurrent=function(){return a.current},h.get=function(t){return void 0===t?h.list:h.list[t]},h.list={},h.defaults=n,h}),define("lib/components/dialog/1.0.0/popup",[],function(t,i,e){function a(){this.destroyed=!1,this.__popup=$("<div />").css({display:"none",position:"absolute",outline:0}).attr("tabindex","-1").html(this.innerHTML).appendTo("body"),this.__backdrop=this.__mask=$("<div />").css({opacity:.7,background:"#000"}),this.node=this.__popup[0],this.backdrop=this.__backdrop[0],n++}var n=0,s=!("minWidth"in $("html")[0].style),o=!s;return $.extend(a.prototype,{node:null,backdrop:null,fixed:!1,destroyed:!0,open:!1,returnValue:"",autofocus:!0,align:"bottom left",innerHTML:"",className:"ui-popup",show:function(t){if(this.destroyed)return this;var i=this.__popup,e=this.__backdrop;if(this.__activeElement=this.__getActive(),this.open=!0,this.follow=t||this.follow,!this.__ready){if(i.addClass(this.className).attr("role",this.modal?"alertdialog":"dialog").css("position",this.fixed?"fixed":"absolute"),s||$(window).on("resize",$.proxy(this.reset,this)),this.modal){var n={position:"fixed",left:0,top:0,width:"100%",height:"100%",overflow:"hidden",userSelect:"none",zIndex:this.zIndex||a.zIndex};i.addClass(this.className+"-modal"),o||$.extend(n,{position:"absolute",width:$(window).width()+"px",height:$(document).height()+"px"}),e.css(n).attr({tabindex:"0"}).on("focus",$.proxy(this.focus,this)),this.__mask=e.clone(!0).attr("style","").insertAfter(i),e.addClass(this.className+"-backdrop").insertBefore(i),this.__ready=!0}i.html()||i.html(this.innerHTML)}return i.addClass(this.className+"-show").show(),e.show(),this.reset().focus(),this.__dispatchEvent("show"),this},showModal:function(){return this.modal=!0,this.show.apply(this,arguments)},close:function(t){return!this.destroyed&&this.open&&(void 0!==t&&(this.returnValue=t),this.__popup.hide().removeClass(this.className+"-show"),this.__backdrop.hide(),this.open=!1,this.blur(),this.__dispatchEvent("close")),this},remove:function(){if(this.destroyed)return this;this.__dispatchEvent("beforeremove"),a.current===this&&(a.current=null),this.__popup.remove(),this.__backdrop.remove(),this.__mask.remove(),s||$(window).off("resize",this.reset),this.__dispatchEvent("remove");for(var t in this)delete this[t];return this},reset:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("reset"),this},resize:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("resize"),this},focus:function(){var t=this.node,i=this.__popup,e=a.current,n=this.zIndex=a.zIndex++;if(e&&e!==this&&e.blur(!1),!$.contains(t,this.__getActive())){var s=i.find("[autofocus]")[0];!this._autofocus&&s?this._autofocus=!0:s=t,this.__focus(s)}return i.css("zIndex",n),a.current=this,i.addClass(this.className+"-focus"),this.__dispatchEvent("focus"),this},blur:function(){var t=this.__activeElement,i=arguments[0];return i!==!1&&this.__focus(t),this._autofocus=!1,this.__popup.removeClass(this.className+"-focus"),this.__dispatchEvent("blur"),this},addEventListener:function(t,i){return this.__getEventListener(t).push(i),this},removeEventListener:function(t,i){for(var e=this.__getEventListener(t),a=0;a<e.length;a++)i===e[a]&&e.splice(a--,1);return this},__getEventListener:function(t){var i=this.__listener;return i||(i=this.__listener={}),i[t]||(i[t]=[]),i[t]},__dispatchEvent:function(t){var i=this.__getEventListener(t);this["on"+t]&&this["on"+t]();for(var e=0;e<i.length;e++)i[e].call(this)},__focus:function(t){try{this.autofocus&&!/^iframe$/i.test(t.nodeName)&&t.focus()}catch(i){}},__getActive:function(){try{var t=document.activeElement,i=t.contentDocument,e=i&&i.activeElement||t;return e}catch(a){}},__center:function(){var t=this.__popup,i=$(window),e=$(document),a=this.fixed,n=a?0:e.scrollLeft(),s=a?0:e.scrollTop(),o=i.width(),l=i.innerHeight(),c=t.width(),r=t.height(),d=(o-c)/2,p=(l-r)/2,h=t[0].style;h.left=Math.max(parseInt(d),n)+"px",h.top=Math.max(parseInt(p),s)+"px"},__follow:function(t){var i=t.parentNode&&$(t),e=this.__popup;if(this.__followSkin&&e.removeClass(this.__followSkin),i){var a=i.offset();if(a.left*a.top<0)return this.__center()}var n=this,s=this.fixed,o=$(window),l=$(document),c=o.width(),r=o.height(),d=l.scrollLeft(),p=l.scrollTop(),h=e.width(),u=e.height(),f=i?i.outerWidth():0,m=i?i.outerHeight():0,v=this.__offset(t),b=v.left,g=v.top,_=s?b-d:b,k=s?g-p:g,w=s?0:d,y=s?0:p,x=w+c-h,J=y+r-u,C={},N=this.align.split(" "),B=this.className+"-",I={top:"bottom",bottom:"top",left:"right",right:"left"},L={top:"top",bottom:"top",left:"left",right:"left"},T=[{top:k-u,bottom:k+m,left:_-h,right:_+f},{top:k,bottom:k-u+m,left:_,right:_-h+f}],Q={left:_+f/2-h/2,top:k+m/2-u/2},P={left:[w,x],top:[y,J]};$.each(N,function(t,i){T[t][i]>P[L[i]][1]&&(i=N[t]=I[i]),T[t][i]<P[L[i]][0]&&(N[t]=I[i])}),N[1]||(L[N[1]]="left"===L[N[0]]?"top":"left",T[1][N[1]]=Q[L[N[1]]]),B+=N.join("-")+" "+this.className+"-follow",n.__followSkin=B,i&&e.addClass(B),C[L[N[0]]]=parseInt(T[0][N[0]]),C[L[N[1]]]=parseInt(T[1][N[1]]),e.css(C)},__offset:function(t){var i=t.parentNode,e=i?$(t).offset():{left:t.pageX,top:t.pageY};t=i?t:t.target;var a=t.ownerDocument,n=a.defaultView||a.parentWindow;if(n==window)return e;var s=n.frameElement,o=$(a),l=o.scrollLeft(),c=o.scrollTop(),r=$(s).offset(),d=r.left,p=r.top;return{left:e.left+d-l,top:e.top+p-c}}}),a.zIndex=1024,a.current=null,a}),define("lib/components/dialog/1.0.0/dialog-config",[],{backdropBackground:"#000",backdropOpacity:.7,content:'<span class="ui-dialog-loading">Loading..</span>',title:"",statusbar:"",button:null,ok:null,okClassName:"ui-btns-ok",cancel:null,cancelClassName:"ui-btns-cancel",okValue:"ok",cancelValue:"cancel",cancelDisplay:!0,width:"",height:"",padding:"",skin:"",quickClose:!1,cssUri:"",innerHTML:'<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><span i="close" class="ui-dialog-close">&#215;</span><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="button" class="ui-dialog-button"></div></td></tr><tr><td i="footerSub" class="ui-dialog-footer"><div i="statusbar" class="ui-dialog-statusbar"></div></td></tr></table></div>'}),define("lib/components/minBar/1.0.1/minBar",[],function(t,i,e){function a(t){function i(){e(M),b(),m("#J_minBarPlugin"),n($(window).innerWidth()),$(window).resize(function(){n($(window).innerWidth())}),E.each(function(t){var i=$(this);i.on("mouseover",function(t){i.find("span.text").stop(!0,!0).delay(300).animate({right:"40px",opacity:1},300)}).on("mouseleave",function(t){i.find("span.text").stop(!0,!0).animate({right:"-80px",opacity:.1},300)}).on("click",function(t){var e=i.find("a.blankLink").attr("href");try{(e.indexOf("http")>-1||e.indexOf("https")>-1)&&window.open(e)}catch(a){}})}),B.hover(function(){$("#J_minBarPlugin").stop(!0,!0).fadeIn(300),r()},function(){$("#J_minBarPlugin").stop(!0,!0).hide()}),J.on("mouseenter",function(t){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"140px",height:"164px",padding:"5px",top:"-40px",opacity:1},300)}).on("mouseleave",function(t){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),C.on("mouseenter",function(t){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"160px",height:"250px",top:"-80px",opacity:1},300)}).on("mouseleave",function(t){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),x.on("click",function(t){$("body,html").stop(!0,!0).animate({scrollTop:0},300)}),P.on("click",function(t){t.preventDefault(),Q.fadeOut(300),clearTimeout(U),D?q||(q=!0,e(O)):(D=!0,e(z))}),L.hover(function(){Q.stop(!0,!0).fadeIn(300),clearTimeout(U),D?q||(q=!0,e(O)):(D=!0,e(z))},function(){Q.stop(!0,!0).fadeOut(300),clearTimeout(U),D?q||(q=!0,e(O)):(D=!0,e(z))}),j.on("click",function(t){Q.fadeOut(300),clearTimeout(U),D?q||(q=!0,e(O)):(D=!0,e(z))}),$(document).on("click",".JQ_minBarDelete",function(t){t.preventDefault();var i=$(this).attr("data-id"),e=$(this).parents("li");$.ajax({url:cdnConfig.cartApiPath+"/delete/"+i,dataType:"jsonp",success:function(t){"succ"==t.status?(e.addClass("delItem"),e.fadeOut(300,function(){$(".delItem").remove(),d(),m("#J_minBarPlugin")})):(d(),m("#J_minBarPlugin"))}})})}function e(t){setTimeout(function(){Q.fadeIn(200),a(5e3)},t)}function a(t){t=isNaN(t)?5e3:t,U=setTimeout(function(){Q.fadeOut(200),D?q||(q=!0,e(O)):(D=!0,e(z))},t)}function n(t){isNaN(t)?t=$(window).innerWidth():t,A>t?(l(),o(),B.on("mouseenter",function(t){t.stopPropagation(),s(),c()}),L.on("mouseenter",function(t){t.stopPropagation(),s(),c()}),I.on("mouseenter",function(t){t.stopPropagation(),s(),c()}),x.on("mouseenter",function(t){t.stopPropagation(),s(),c()}),y.on("mouseleave",function(t){t.stopPropagation(),t.preventDefault(),o(),l()})):(c(),s())}function s(){T.stop(!0,!0).delay(300).animate({right:"0px"},300)}function o(){T.stop(!0,!0).delay(300).animate({right:"-40px"},300)}function l(){C.stop(!0,!0).animate({right:"-40px"}),J.stop(!0,!0).animate({right:"-40px"}),N.stop(!0,!0).animate({right:"-40px"})}function c(){C.stop(!0,!0).delay(300).animate({right:"0px"}),J.stop(!0,!0).delay(300).animate({right:"0px"}),N.stop(!0,!0).delay(300).animate({right:"0px"})}function r(){$.ajax({url:cdnConfig.apiPath+"/cart/minilist",dataType:"jsonp",success:function(t){var i="";if("200"==t.code){var e=t.data.list;if(e.length>0)for(var a=0;a<e.length;a++)i+="<li>",i+='<div class="plugin-cart-list-img">',i+='<a href="'+e[a].link+'" target="_blank">',i+='<img src="'+e[a].src+'" width="90" height="60" alt="'+e[a].title+'"/>',i+="</a>",i+="</div>",i+='<div class="plugin-cart-list-title">',i+='<a href="'+e[a].link+'" target="_blank" title="'+e[a].title+'">'+e[a].title+"</a>",i+="</div>",i+='<div class="plugin-cart-list-info">',i+='<p class="list-price">&yen; <span class="JQ_minCartItemPrice">'+e[a].price+"</span></p>",i+='<p class="list-num">x <span class="JQ_minCartItemNum">'+e[a].num+"</span></p>",i+='<input type="hidden" class="JQ_minCartItemTotal" value="'+e[a].price*e[a].num+'" />',i+="</div>",i+='<a class="cart-list-delete-btn JQ_minBarDelete" data-id="'+e[a].cart_id+'" href="javascript:void(0);" target="_blank">x</a>',i+="</li>",v(i,"no")}else i="<li>您的购物车空空的~</li>",v(i,"yes");d(),m("#J_minBarPlugin")},error:function(t){}})}function d(){f(".JQ_minCartItemTotal","#J_minBarCartTotal"),u(".JQ_minCartItemNum","#J_minBarCartNum"),h("#J_minBarBtn","#J_minBarCartNum")}function p(t,i){$(t).html(i)}function h(t,i){var e="http://cart.kinhom.com/list.html",a=$(i),n=$(t);parseInt(a.html())>0?n.removeClass("btn-gray").addClass("btn-orange").attr("href",e):n.removeClass("btn-orange").addClass("btn-gray").attr("href","javascript:void(0);")}function u(t,i){var e=$(i),a=0;if($(t).length>0)$(t).each(function(){a+=parseInt($(this).html())});else{var n="<li>您的购物车空空的~</li>";v(n,"yes"),h("#J_minBarBtn","#J_minBarCartNum")}e.html(a),p("#J_cartNum",a)}function f(t,i){var e=$(i),a=0;$(t).length>0?($(t).each(function(){a+=parseInt($(this).val())}),e.html(a)):e.html(0)}function m(t){var i=$(t),e=i.innerHeight();i.css({top:"50%","margin-top":"-"+parseInt(e/2)+"px"})}function v(t,i){switch(i){case"yes":$("#J_pluginCart").addClass("plugin-cart-empty").removeClass("plugin-cart-list").html(t);break;case"no":$("#J_pluginCart").removeClass("plugin-cart-empty").addClass("plugin-cart-list").html(t)}}function b(){$.ajax({url:cdnConfig.apiPath+"/cart/statistics",dataType:"jsonp",success:function(t){"succ"==t.status?p("#J_cartNum",t.data.num):p("#J_cartNum",0)},error:function(t){}})}var g=t.mainCell||"#J_minBar",_=t.tpl||function(){},k=t.tplName||"comment/tplMinBar",w=t.data||{};$("body").append(_(k,w));var y=g.indexOf("#")>-1?$(g):$("#"+g),x=y.find(".min-bar-gtop"),J=y.find(".min-wechat"),C=y.find(".min-phone"),N=y.find(".min-bar-feedback"),B=y.find(".min-cart"),I=y.find(".min-bar-qq"),L=y.find(".min-bar-online"),T=$(".min-bar-mark"),Q=$(".min-bar-online-pop"),P=$(".pop-close"),j=$(".pop-chat"),A=1280,E=y.find(".min-text"),D=!1,q=!1,M="30000",z="180000",O="180000";i();var U}e.exports=a}),!function(){function t(t,i){return(/string|function/.test(typeof i)?l:o)(t,i)}function i(t,e){return"string"!=typeof t&&(e=typeof t,"number"===e?t+="":t="function"===e?i(t.call(t)):""),t}function e(t){return p[t]}function a(t){return i(t).replace(/&(?![\w#]+;)|[<>"']/g,e)}function n(t,i){if(h(t))for(var e=0,a=t.length;a>e;e++)i.call(t,t[e],e,t);else for(e in t)i.call(t,t[e],e)}function s(t,i){var e=/(\/)[^/]+\1\.\.\1/,a=("./"+t).replace(/[^/]+$/,""),n=a+i;for(n=n.replace(/\/\.\//g,"/");n.match(e);)n=n.replace(e,"/");return n}function o(i,e){var a=t.get(i)||c({filename:i,name:"Render Error",message:"Template not found"});return e?a(e):a}function l(t,i){if("string"==typeof i){var e=i;i=function(){return new d(e)}}var a=r[t]=function(e){try{return new i(e,t)+""}catch(a){return c(a)()}};return a.prototype=i.prototype=u,a.toString=function(){return i+""},a}function c(t){var i="{Template Error}",e=t.stack||"";if(e)e=e.split("\n").slice(0,2).join("\n");else for(var a in t)e+="<"+a+">\n"+t[a]+"\n\n";return function(){return"object"==typeof console&&console.error(i+"\n\n"+e),i}}var r=t.cache={},d=this.String,p={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},h=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},u=t.utils={$helpers:{},$include:function(t,i,e){return t=s(e,t),o(t,i)},$string:i,$escape:a,$each:n},f=t.helpers=u.$helpers;t.get=function(t){return r[t.replace(/^\.\//,"")]},t.helper=function(t,i){f[t]=i},"function"==typeof define?define("lib/template/tempcomment",[],function(i,e,a){return t}):"undefined"!=typeof exports?module.exports=t:this.template=t,t("tplAddressForm",function(t,i){"use strict";var e=this,a=(e.$helpers,e.$escape),n=t.actionURL,s=t.addressID,o=t.userName,l=t.address,c=t.telephone,r=t.mobilephone,p=t.defaultAdd,h="";return h+='<form id="J_addressForm" action="',h+=a(n),h+='" method="post"> <input type="hidden" name="addressID" value="',h+=a(s),h+='"> <table id="J_add" class="person-address-add-table"> <tbody class="person-address"> <tr class="item"> <th class="address-add-head">收货人：</th> <td> <input id="J_userName" class="person-address-add-input" name="userName" value="',h+=a(o),h+='" /> <span class="fc-f60">*</span> </td> </tr> <tr class="item"> <th class="address-add-head">详细地址：</th> <td id="J_selectAddress"></td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <p> <input id="J_address" class="person-address-add-input detailed-address-input" name="address" placeholder="具体地址" value="',h+=a(l),h+='" /> <span class="fc-f60">*</span> </p> <p> <label class="person-address-add-tip">&nbsp;&nbsp;&nbsp;(不需要重复填写省/市/区)</label> </p> </td> </tr> <tr class="item"> <th class="address-add-head">固定电话：</th> <td> <input id="J_tel" class="person-address-add-input" name="tel" value="',h+=a(c),h+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（示例：020-88888888-999）</label> </td> </tr> <tr class="item"> <th class="address-add-head">手机：</th> <td> <input id="J_phone" class="person-address-add-input" name="phone" value="',h+=a(r),h+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（手机或固话必填一项）</label> </td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <div class="defult-address-choose"> ',h+="1"==p?' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-checked"></a> ':' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-normal"></a> ',h+=' <span class="address-font-gray">设为默认地址</span> <input type="hidden" name="setDefault" value="',h+=a(p),h+='" /> </div> </td> </tr> </tbody> </table> </form>',new d(h)}),t("tplBottomAd",function(t,i){"use strict";var e=this,a=(e.$helpers,t.link),n=e.$escape,s=t.linkURL,o=t.title,l=t.imgURL,c="";return c+='<div class="full-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=a&&(c+=n(a)),""!=s&&(c+=n(s)),c+='" target="_blank" title="',c+=n(o),c+='" style=" display:block; width:100%;min-height: 80px;background:url(',c+=n(l),c+=') center top no-repeat; "> <img src="',c+=n(l),c+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="full-ad-close" id="J_itemBottomAdClose"><span></span></a> </div> </div>',new d(c)}),t("tplEditPassForm",function(t,i){"use strict";var e=this,a=(e.$helpers,e.$escape),n=t.actionURL,s="";return s+='<form id="J_editPassForm" action="',s+=a(n),s+='" method="post"> <div class="fc-8c8">为了您的账户安全，请定期更换登录密码，并确保登录密码设置与提现密码不同。</div> <input type="hidden" name="form" value="form"> <div class="a-edit-pass-tr"> <p id="J_oldPass" class="edit-input-wrap"> <input type="password" name="old_passwd" placeholder="原密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_newPass" class="edit-input-wrap"> <input type="password" name="new_passwd" placeholder="输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_confirmNewPass" class="edit-input-wrap"> <input type="password" name="confirmNewPass" placeholder="再次输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> </form>',new d(s)}),t("tplFloatNav",'<div id="J_floatNav" class="float-nav"> <a href="http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=201143&jid=2104161973" class="float-nav-char-wrap JQ_floatNavNormal" target="_blank"> <span class="floag-online-chat">在线客服</span> <i class="icon-float-chat normal-icon"></i> </a> <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4006538038&aty=0&a=0&curl=&ty=1" class="float-nav-qq JQ_floatNavNormal" target="_blank"> <span>QQ客服</span> <i class="icon-float-qq normal-icon"></i> </a> <a href="http://cart.kinhom.com/list.html" class="float-nav-cart JQ_floatNavNormal" target="_blank"> <span>购物车</span> <i class="icon-float-cart normal-icon"></i> <i class="icon-cart-num num-icon">0</i> </a> <a href="javascript:void(0);" class="float-nav-wechat JQ_floatNavWechat"> <span> <img src="http://misc.jjcdn.com/p/images/float_wechat.png" width="40" height="40" /> </span> <i class="icon-float-wechat normal-icon"></i> </a> <a href="http://www.wenjuan.com/s/qU36f2/" target="_blank" class="float-nav-feedback JQ_floatNavNormal"> <span>意见反馈</span> <i class="icon-float-feedback normal-icon"></i> </a> <a id="J_floatGoTop" href="javascript:void(0);" class="float-nav-top JQ_floatNavNormal"> <span>返回顶部</span> <i class="icon-float-top normal-icon"></i> </a> </div>'),t("tplLoginDialog",'<div class="login-dialog"> <div class="login-dialog-form"> <form action="javascript:void(0);" method="post"> <p class="login-dialog-form-tr" id="J_loginUserName"> <label>用户名：</label> <input type="text" name="loginUserName" placeholder="输入用户名/邮箱/手机"> </p> <p class="login-dialog-form-tip"></p> <p class="login-dialog-form-tr" id="J_loginPassword"> <label>密&nbsp;&nbsp;&nbsp;码：</label> <input type="password" name="loginPassword" placeholder="输入密码"> </p> <p class="login-dialog-form-tip"></p> </form> </div> </div> '),t("tplMinBar",function(t,i){"use strict";var e=this,a=(e.$helpers,e.$escape),n=t.live800,s=t.cdnPath,o=t.wapQQ,l=t.cart,c=t.mobile,r=t.wechat,p=t.feedback,h=t.gotop,u="";return u+=' <section id="J_minBar" class="min-bar"> <div class="min-bar-tabs"> <div class="min-bar-tab min-bar-online"> <div class="min-bar-online-icon"> <a href="',u+=a(n.clientLink),u+='" class="blankLink JQ_minBarOnline" target="_blank"> <img src="',u+=a(s),u+=a(n.iconPath),u+='" width="',u+=a(n.iconWidth),u+='" height="',u+=a(n.iconHeight),u+='" alt="',u+=a(n.iconText),u+='"/> <label class="min-bar-chat-num">',u+=a(n.chatNum),u+='</label> </a> <span class="min-bar-online-pop"> <span class="pop-close">&nbsp;</span> <a href="',u+=a(n.clientLink),u+='" class="pop-chat" target="_blank">&nbsp;</a> </span> </div> </div> <div class="min-bar-tab min-bar-qq min-text"> <div class="min-bar-qq-icon"> <a href="',u+=a(o.clientLink),u+='" class="blankLink" target="_blank"> <img src="',u+=a(s),u+=a(o.iconPath),u+='" width="',u+=a(o.iconWidth),u+='" height="',u+=a(o.iconHeight),u+='" alt="',u+=a(o.iconText),u+='"/> </a> <span class="min-bar-qq-text text">',u+=a(o.iconText),u+='</span> </div> </div> <div class="min-bar-tab min-bar-cart min-cart"> <div class="min-bar-cart-icon"> <a href="',u+=a(l.clientLink),u+='" class="icon-float-cart"> <span id="J_cartNum" class="min-bar-cart-num">',u+=a(l.chatNum),u+='</span> </a> </div> <div id="J_minBarPlugin" class="min-bar-plugin"> <div class="bar-plugin-cart"> <ul id="J_pluginCart"> </ul> <div class="plugin-cart-info"> <p class="cart-info-price"> <span class="cart-info-num"> 共 <label id="J_minBarCartNum">0</label> 件商品 </span> <span class="cart-info-total"> 合计: <small>&yen;</small> <label id="J_minBarCartTotal">0</label> </span> </p> <p class="cart-info-shipping">(不含运费)</p> <p class="cart-info-btn"> <a href="javascript:void(0);" id="J_minBarBtn" class="btn-gray" target="_blank">查看购物车</a> </p> </div> </div> </div> </div> <div class="min-bar-tab min-bar-phone min-phone"> <div class="min-bar-phone-icon"> <a href="',u+=a(c.clientLink),u+='" class="icon-float-phone">&nbsp;</a> <span class="min-bar-phone-img phone"> <img src="',u+=a(s),u+=a(c.iconPath),u+='" width="',u+=a(c.iconWidth),u+='" height="',u+=a(c.iconHeight),u+='" alt="',u+=a(c.iconText),u+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-wechat min-wechat"> <div class="min-bar-wechat-icon"> <a href="',u+=a(r.clientLink),u+='" class="icon-float-wechat">&nbsp;</a> <span class="min-bar-wechat-img wechat"> <img src="',u+=a(s),u+=a(r.iconPath),u+='" width="',u+=a(r.iconWidth),u+='" height="',u+=a(r.iconHeight),u+='" alt="',u+=a(r.iconText),u+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-feedback min-text"> <div class="min-bar-feedback-icon"> <a href="',u+=a(p.clientLink),u+='" class="icon-float-feedback blankLink" target="_blank">&nbsp;</a> <span class="min-bar-feedback-text text">',u+=a(p.iconText),u+='</span> </div> </div> <div class="min-bar-tab min-bar-gtop min-text"> <div class="min-bar-gtop-icon" id="J_minBarGoTop"> <a href="',u+=a(h.clientLink),u+='" class="icon-float-top">&nbsp;</a> <span class="min-bar-gtop-text text">',u+=a(h.iconText),u+='</span> </div> </div> </div> </section> <section class="min-bar-mark"></section> ',new d(u)}),t("tplSelectAddress",function(t,i){"use strict";var e=this,a=(e.$helpers,t.valCity),n=e.$escape,s=t.textPro,o=t.valPro,l=t.textCity,c=t.valArea,r=t.textArea,p="";return p+='<div id="J_selectProvience" class="select-gray fl"> <i class="select-corner icon-gray-left"></i> ',""==a?p+=' <label class="JQ_option select-option w90" data-value="0">请选择省</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=n(s),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_proList"></ul> <input type="hidden" name="valProvince" value="',p+=n(o),p+='" /> </div> <div class="select-gray fl JQ_addressCity"> <i class="select-corner icon-gray-left"></i> ',""==a?p+=' <label class="JQ_option select-option w90" data-value="0">请选择市</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=n(l),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_cityList"></ul> <input type="hidden" name="valCity" value="',p+=n(a),p+='" /> </div> <div class="select-gray fl JQ_addressArea"> <i class="select-corner icon-gray-left"></i> ',""==c?p+=' <label class="JQ_option select-option w90" data-value="0">请选择区</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=n(r),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_areaList"></ul> <input type="hidden" name="valArea" value="',p+=n(c),p+='" /> </div> ',new d(p)}),t("tplTopAd",function(t,i){"use strict";var e=this,a=(e.$helpers,t.link),n=e.$escape,s=t.linkURL,o=t.title,l=t.imgURL,c="";return c+='<div class="top-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',
""!=a&&(c+=n(a)),""!=s&&(c+=n(s)),c+='" target="_blank" title="',c+=n(o),c+='" style=" display:block; width:100%; min-height: 80px; background:url(',c+=n(l),c+=') center top no-repeat; "> <img src="',c+=n(l),c+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="index-top-ad-close" id="J_indexTopAdClose"> <span></span> </a> </div> </div>',new d(c)})}();