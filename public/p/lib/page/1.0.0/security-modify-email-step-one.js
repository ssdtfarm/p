define("libpage.0.0/security-modify-email-step-one",["lib/components/dialog/1.0.0/dialog","lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config","lib/components/minBar/1.0.1/minBar","lib/template/tempcomment"],function(t,i,a){function e(){u.length;$("#J_submitBtn").on("click",function(){p&&n(u[0])})}function n(t){var i=t.obj,a=i.val(),e=i.parent().siblings("p.tips");$.ajax({url:m.sendEmailAction,data:{email:a},type:"post",dataType:"json"}).done(function(t){switch(t.code.toString()){case"200":p&&($("#J_submitBtn").addClass("on"),e.hide(),$("#J_tipsNotify").show(),s(),p=!1,o(120,$("#J_submitBtn")));break;case"400":l(i,t.message,"no")}})}function s(){var t=$("#J_email").val().split("@")[1];for(var i in h)i===t?$("#J_checkEmail").attr("href","http://"+h[t]):$("#J_checkEmail").attr("href","http://mail."+t)}function o(t,i){d=setInterval(function(){0>=t?(clearInterval(d),p=!0,i.removeClass("on"),i.html("获取验证邮件")):(i.html("重新获取(<span>"+t+"秒</span>)"),t-=1)},1e3)}function l(t,i,a){var e=t.parent(),n=e.siblings("p.tips"),s='<i class="icon-tip-wrong"></i><span class="fc-c13">'+i+"</span>",o='<span class="fc-c13">'+i+"</span>",l='<i class="icon-tip-ok tip-ok"></i>';switch(a){case"no":e.addClass("error").find(".tip-ok").remove(),n.html(s);break;case"ok":e.find(".tip-ok").remove().end().removeClass("error").append(l),n.html(o);break;default:n.html(i)}}document.getElementById("J_memberAside").innerHTML=document.getElementById("J_templateMemberAside").innerHTML;var c=(t("../../components/dialog/1.0.0/dialog"),t("../../components/minBar/1.0.1/minBar")),r=t("../../template/tempcomment");c({mainCell:"#J_minBar",pathConfig:cdnConfig,tpl:r,tplName:"tplMinBar",data:_globalConfig.minBar.data});var d,p=!0,h={"163.com":"mail.163.com","126.com":"mail.126.com","yeah.net":"mail.yeah.net","qq.com":"mail.qq.com","foxmail.com":"mail.foxmail.com","gmail.com":"mail.gmail.com","sohu.com":"mail.sohu.com","sogou.com":"mail.sogou.com","sina.com.cn":"mail.sina.com.cn","10086.com":"mail.10086.cn","139.com":"mail.139.com","wo.cn":"mail.wo.cn","189.cn":"webmail30.189.cn","live.cn":"mail.live.cn","hotmail.com":"mail.hotmail.com","live.com":"mail.live.com","aliyun.com":"mail.aliyun.com","21.cn":"mail.21cn.com"},u=[{obj:$("#J_email").length>0?$("#J_email"):null,type:"email",nullText:"请输入您能正常接收信息的邮箱地址如：abc@123.com",errorText:"邮箱地址无效，请输入正确地址，如：lenny211@163.com",existsText:"该邮箱已被注册，请更换新邮箱！",normalText:"请输入您能正常接收信息的邮箱地址如：abc@123.com",LenText:"邮箱名为6-30个字符",sendFailedText:"验证邮件发送失败"}],m={sendEmailAction:cdnConfig.my+"/security/editbindemailone"};e()}),define("lib/components/dialog/1.0.0/dialog",["lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config"],function(t,i,a){var e=t("./popup"),n=t("./dialog-config"),s=n.cssUri;if(s){var o=t[t.toUrl?"toUrl":"resolve"];o&&(s=o(s),s='<link rel="stylesheet" href="'+s+'" />',$("base")[0]?$("base").before(s):$("head").append(s))}var l=0,c=new Date-0,r=!("minWidth"in $("html")[0].style),d="createTouch"in document&&!("onmousemove"in document)||/(iPhone|iPad|iPod)/i.test(navigator.userAgent),p=!r&&!d,h=function(t,i,a){var e=t=t||{};"string"!=typeof t&&1!==t.nodeType||(t={content:t,fixed:!d}),t=$.extend(!0,{},h.defaults,t),t.original=e;var n=t.id=t.id||c+l,s=h.get(n);return s?s.focus():(p||(t.fixed=!0),t.quickClose&&(t.modal=!0,t.backdropOpacity=0),$.isArray(t.button)||(t.button=[]),void 0!==a&&(t.cancel=a),t.cancel&&t.button.push({id:"cancel",className:t.cancelClassName,value:t.cancelValue,callback:t.cancel,display:t.cancelDisplay}),void 0!==i&&(t.ok=i),t.ok&&t.button.push({id:"ok",className:t.okClassName,value:t.okValue,callback:t.ok,autofocus:!0}),h.list[n]=new h.create(t))},u=function(){};u.prototype=e.prototype;var m=h.prototype=new u;return h.create=function(t){var i=this;$.extend(this,new e);var a=(t.original,$(this.node).html(t.innerHTML)),n=$(this.backdrop);return this.options=t,this._popup=a,$.each(t,function(t,a){"function"==typeof i[t]?i[t](a):i[t]=a}),t.zIndex&&(e.zIndex=t.zIndex),a.attr({"aria-labelledby":this._$("title").attr("id","title:"+this.id).attr("id"),"aria-describedby":this._$("content").attr("id","content:"+this.id).attr("id")}),this._$("close").css("display",this.cancel===!1?"none":"").on("click",function(t){i._trigger("cancel"),t.preventDefault()}),this._$("dialog").addClass(this.skin),this._$("body").css("padding",this.padding),t.quickClose&&n.on("onmousedown"in document?"mousedown":"click",function(){return i._trigger("cancel"),!1}),this.addEventListener("show",function(){n.css({opacity:0,background:t.backdropBackground}).animate({opacity:t.backdropOpacity},150)}),this._esc=function(t){var a=t.target,n=a.nodeName,s=/^input|textarea$/i,o=e.current===i,l=t.keyCode;!o||s.test(n)&&"button"!==a.type||27===l&&i._trigger("cancel")},$(document).on("keydown",this._esc),this.addEventListener("remove",function(){$(document).off("keydown",this._esc),delete h.list[this.id]}),l++,h.oncreate(this),this},h.create.prototype=m,$.extend(m,{content:function(t){var i=this._$("content");return"object"==typeof t?(t=$(t),i.empty("").append(t.show()),this.addEventListener("beforeremove",function(){$("body").append(t.hide())})):i.html(t),this.reset()},title:function(t){return this._$("title").text(t),this._$("header")[t?"show":"hide"](),this},width:function(t){return this._$("content").css("width",t),this.reset()},height:function(t){return this._$("content").css("height",t),this.reset()},button:function(t){t=t||[];var i=this,a="",e=0;return this.callbacks={},"string"==typeof t?(a=t,e++):$.each(t,function(t,n){var s=n.id=n.id||n.value,o="";i.callbacks[s]=n.callback,n.display===!1?o=' style="display:none"':e++,a+='<button type="button" i-id="'+s+'" class="'+(n.className?n.className:"ui-btns-nor")+'"'+o+(n.disabled?" disabled":"")+(n.autofocus?' autofocus class="ui-dialog-autofocus"':"")+">"+n.value+"</button>",i._$("button").on("click","[i-id="+s+"]",function(t){var a=$(this);a.attr("disabled")||i._trigger(s),t.preventDefault()})}),this._$("button").html(a),this._$("footer")[e?"show":"hide"](),this},statusbar:function(t){return this._$("statusbar").html(t)[t?"show":"hide"](),this},_$:function(t){return this._popup.find("[i="+t+"]")},_trigger:function(t){var i=this.callbacks[t];return"function"!=typeof i||i.call(this)!==!1?this.close().remove():this}}),h.oncreate=$.noop,h.getCurrent=function(){return e.current},h.get=function(t){return void 0===t?h.list:h.list[t]},h.list={},h.defaults=n,h}),define("lib/components/dialog/1.0.0/popup",[],function(t,i,a){function e(){this.destroyed=!1,this.__popup=$("<div />").css({display:"none",position:"absolute",outline:0}).attr("tabindex","-1").html(this.innerHTML).appendTo("body"),this.__backdrop=this.__mask=$("<div />").css({opacity:.7,background:"#000"}),this.node=this.__popup[0],this.backdrop=this.__backdrop[0],n++}var n=0,s=!("minWidth"in $("html")[0].style),o=!s;return $.extend(e.prototype,{node:null,backdrop:null,fixed:!1,destroyed:!0,open:!1,returnValue:"",autofocus:!0,align:"bottom left",innerHTML:"",className:"ui-popup",show:function(t){if(this.destroyed)return this;var i=this.__popup,a=this.__backdrop;if(this.__activeElement=this.__getActive(),this.open=!0,this.follow=t||this.follow,!this.__ready){if(i.addClass(this.className).attr("role",this.modal?"alertdialog":"dialog").css("position",this.fixed?"fixed":"absolute"),s||$(window).on("resize",$.proxy(this.reset,this)),this.modal){var n={position:"fixed",left:0,top:0,width:"100%",height:"100%",overflow:"hidden",userSelect:"none",zIndex:this.zIndex||e.zIndex};i.addClass(this.className+"-modal"),o||$.extend(n,{position:"absolute",width:$(window).width()+"px",height:$(document).height()+"px"}),a.css(n).attr({tabindex:"0"}).on("focus",$.proxy(this.focus,this)),this.__mask=a.clone(!0).attr("style","").insertAfter(i),a.addClass(this.className+"-backdrop").insertBefore(i),this.__ready=!0}i.html()||i.html(this.innerHTML)}return i.addClass(this.className+"-show").show(),a.show(),this.reset().focus(),this.__dispatchEvent("show"),this},showModal:function(){return this.modal=!0,this.show.apply(this,arguments)},close:function(t){return!this.destroyed&&this.open&&(void 0!==t&&(this.returnValue=t),this.__popup.hide().removeClass(this.className+"-show"),this.__backdrop.hide(),this.open=!1,this.blur(),this.__dispatchEvent("close")),this},remove:function(){if(this.destroyed)return this;this.__dispatchEvent("beforeremove"),e.current===this&&(e.current=null),this.__popup.remove(),this.__backdrop.remove(),this.__mask.remove(),s||$(window).off("resize",this.reset),this.__dispatchEvent("remove");for(var t in this)delete this[t];return this},reset:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("reset"),this},resize:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("resize"),this},focus:function(){var t=this.node,i=this.__popup,a=e.current,n=this.zIndex=e.zIndex++;if(a&&a!==this&&a.blur(!1),!$.contains(t,this.__getActive())){var s=i.find("[autofocus]")[0];!this._autofocus&&s?this._autofocus=!0:s=t,this.__focus(s)}return i.css("zIndex",n),e.current=this,i.addClass(this.className+"-focus"),this.__dispatchEvent("focus"),this},blur:function(){var t=this.__activeElement,i=arguments[0];return i!==!1&&this.__focus(t),this._autofocus=!1,this.__popup.removeClass(this.className+"-focus"),this.__dispatchEvent("blur"),this},addEventListener:function(t,i){return this.__getEventListener(t).push(i),this},removeEventListener:function(t,i){for(var a=this.__getEventListener(t),e=0;e<a.length;e++)i===a[e]&&a.splice(e--,1);return this},__getEventListener:function(t){var i=this.__listener;return i||(i=this.__listener={}),i[t]||(i[t]=[]),i[t]},__dispatchEvent:function(t){var i=this.__getEventListener(t);this["on"+t]&&this["on"+t]();for(var a=0;a<i.length;a++)i[a].call(this)},__focus:function(t){try{this.autofocus&&!/^iframe$/i.test(t.nodeName)&&t.focus()}catch(i){}},__getActive:function(){try{var t=document.activeElement,i=t.contentDocument,a=i&&i.activeElement||t;return a}catch(e){}},__center:function(){var t=this.__popup,i=$(window),a=$(document),e=this.fixed,n=e?0:a.scrollLeft(),s=e?0:a.scrollTop(),o=i.width(),l=i.innerHeight(),c=t.width(),r=t.height(),d=(o-c)/2,p=(l-r)/2,h=t[0].style;h.left=Math.max(parseInt(d),n)+"px",h.top=Math.max(parseInt(p),s)+"px"},__follow:function(t){var i=t.parentNode&&$(t),a=this.__popup;if(this.__followSkin&&a.removeClass(this.__followSkin),i){var e=i.offset();if(e.left*e.top<0)return this.__center()}var n=this,s=this.fixed,o=$(window),l=$(document),c=o.width(),r=o.height(),d=l.scrollLeft(),p=l.scrollTop(),h=a.width(),u=a.height(),m=i?i.outerWidth():0,f=i?i.outerHeight():0,v=this.__offset(t),g=v.left,b=v.top,_=s?g-d:g,y=s?b-p:b,w=s?0:d,k=s?0:p,x=w+c-h,J=k+r-u,C={},N=this.align.split(" "),T=this.className+"-",B={top:"bottom",bottom:"top",left:"right",right:"left"},L={top:"top",bottom:"top",left:"left",right:"left"},P=[{top:y-u,bottom:y+f,left:_-h,right:_+m},{top:y,bottom:y-u+f,left:_,right:_-h+m}],j={left:_+m/2-h/2,top:y+f/2-u/2},I={left:[w,x],top:[k,J]};$.each(N,function(t,i){P[t][i]>I[L[i]][1]&&(i=N[t]=B[i]),P[t][i]<I[L[i]][0]&&(N[t]=B[i])}),N[1]||(L[N[1]]="left"===L[N[0]]?"top":"left",P[1][N[1]]=j[L[N[1]]]),T+=N.join("-")+" "+this.className+"-follow",n.__followSkin=T,i&&a.addClass(T),C[L[N[0]]]=parseInt(P[0][N[0]]),C[L[N[1]]]=parseInt(P[1][N[1]]),a.css(C)},__offset:function(t){var i=t.parentNode,a=i?$(t).offset():{left:t.pageX,top:t.pageY};t=i?t:t.target;var e=t.ownerDocument,n=e.defaultView||e.parentWindow;if(n==window)return a;var s=n.frameElement,o=$(e),l=o.scrollLeft(),c=o.scrollTop(),r=$(s).offset(),d=r.left,p=r.top;return{left:a.left+d-l,top:a.top+p-c}}}),e.zIndex=1024,e.current=null,e}),define("lib/components/dialog/1.0.0/dialog-config",[],{backdropBackground:"#000",backdropOpacity:.7,content:'<span class="ui-dialog-loading">Loading..</span>',title:"",statusbar:"",button:null,ok:null,okClassName:"ui-btns-ok",cancel:null,cancelClassName:"ui-btns-cancel",okValue:"ok",cancelValue:"cancel",cancelDisplay:!0,width:"",height:"",padding:"",skin:"",quickClose:!1,cssUri:"",innerHTML:'<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><span i="close" class="ui-dialog-close">&#215;</span><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="button" class="ui-dialog-button"></div></td></tr><tr><td i="footerSub" class="ui-dialog-footer"><div i="statusbar" class="ui-dialog-statusbar"></div></td></tr></table></div>'}),define("lib/components/minBar/1.0.1/minBar",[],function(t,i,a){function e(t){function i(){a(z),g(),f("#J_minBarPlugin"),n($(window).innerWidth()),$(window).resize(function(){n($(window).innerWidth())}),A.each(function(t){var i=$(this);i.on("mouseover",function(t){i.find("span.text").stop(!0,!0).delay(300).animate({right:"40px",opacity:1},300)}).on("mouseleave",function(t){i.find("span.text").stop(!0,!0).animate({right:"-80px",opacity:.1},300)}).on("click",function(t){var a=i.find("a.blankLink").attr("href");try{(a.indexOf("http")>-1||a.indexOf("https")>-1)&&window.open(a)}catch(e){}})}),T.hover(function(){$("#J_minBarPlugin").stop(!0,!0).fadeIn(300),r()},function(){$("#J_minBarPlugin").stop(!0,!0).hide()}),J.on("mouseenter",function(t){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"140px",height:"164px",padding:"5px",top:"-40px",opacity:1},300)}).on("mouseleave",function(t){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),C.on("mouseenter",function(t){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"160px",height:"250px",top:"-80px",opacity:1},300)}).on("mouseleave",function(t){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),x.on("click",function(t){$("body,html").stop(!0,!0).animate({scrollTop:0},300)}),I.on("click",function(t){t.preventDefault(),j.fadeOut(300),clearTimeout(M),q?D||(D=!0,a(H)):(q=!0,a(O))}),L.hover(function(){j.stop(!0,!0).fadeIn(300),clearTimeout(M),q?D||(D=!0,a(H)):(q=!0,a(O))},function(){j.stop(!0,!0).fadeOut(300),clearTimeout(M),q?D||(D=!0,a(H)):(q=!0,a(O))}),E.on("click",function(t){j.fadeOut(300),clearTimeout(M),q?D||(D=!0,a(H)):(q=!0,a(O))}),$(document).on("click",".JQ_minBarDelete",function(t){t.preventDefault();var i=$(this).attr("data-id"),a=$(this).parents("li");$.ajax({url:cdnConfig.cartApiPath+"/delete/"+i,dataType:"jsonp",success:function(t){"succ"==t.status?(a.addClass("delItem"),a.fadeOut(300,function(){$(".delItem").remove(),d(),f("#J_minBarPlugin")})):(d(),f("#J_minBarPlugin"))}})})}function a(t){setTimeout(function(){j.fadeIn(200),e(5e3)},t)}function e(t){t=isNaN(t)?5e3:t,M=setTimeout(function(){j.fadeOut(200),q?D||(D=!0,a(H)):(q=!0,a(O))},t)}function n(t){isNaN(t)?t=$(window).innerWidth():t,Q>t?(l(),o(),T.on("mouseenter",function(t){t.stopPropagation(),s(),c()}),L.on("mouseenter",function(t){t.stopPropagation(),s(),c()}),B.on("mouseenter",function(t){t.stopPropagation(),s(),c()}),x.on("mouseenter",function(t){t.stopPropagation(),s(),c()}),k.on("mouseleave",function(t){t.stopPropagation(),t.preventDefault(),o(),l()})):(c(),s())}function s(){P.stop(!0,!0).delay(300).animate({right:"0px"},300)}function o(){P.stop(!0,!0).delay(300).animate({right:"-40px"},300)}function l(){C.stop(!0,!0).animate({right:"-40px"}),J.stop(!0,!0).animate({right:"-40px"}),N.stop(!0,!0).animate({right:"-40px"})}function c(){C.stop(!0,!0).delay(300).animate({right:"0px"}),J.stop(!0,!0).delay(300).animate({right:"0px"}),N.stop(!0,!0).delay(300).animate({right:"0px"})}function r(){$.ajax({url:cdnConfig.apiPath+"/cart/minilist",dataType:"jsonp",success:function(t){var i="";if("200"==t.code){var a=t.data.list;if(a.length>0)for(var e=0;e<a.length;e++)i+="<li>",i+='<div class="plugin-cart-list-img">',i+='<a href="'+a[e].link+'" target="_blank">',i+='<img src="'+a[e].src+'" width="90" height="60" alt="'+a[e].title+'"/>',i+="</a>",i+="</div>",i+='<div class="plugin-cart-list-title">',i+='<a href="'+a[e].link+'" target="_blank" title="'+a[e].title+'">'+a[e].title+"</a>",i+="</div>",i+='<div class="plugin-cart-list-info">',i+='<p class="list-price">&yen; <span class="JQ_minCartItemPrice">'+a[e].price+"</span></p>",i+='<p class="list-num">x <span class="JQ_minCartItemNum">'+a[e].num+"</span></p>",i+='<input type="hidden" class="JQ_minCartItemTotal" value="'+a[e].price*a[e].num+'" />',i+="</div>",i+='<a class="cart-list-delete-btn JQ_minBarDelete" data-id="'+a[e].cart_id+'" href="javascript:void(0);" target="_blank">x</a>',i+="</li>",v(i,"no")}else i="<li>您的购物车空空的~</li>",v(i,"yes");d(),f("#J_minBarPlugin")},error:function(t){}})}function d(){m(".JQ_minCartItemTotal","#J_minBarCartTotal"),u(".JQ_minCartItemNum","#J_minBarCartNum"),h("#J_minBarBtn","#J_minBarCartNum")}function p(t,i){$(t).html(i)}function h(t,i){var a="http://cart.kinhom.com/list.html",e=$(i),n=$(t);parseInt(e.html())>0?n.removeClass("btn-gray").addClass("btn-orange").attr("href",a):n.removeClass("btn-orange").addClass("btn-gray").attr("href","javascript:void(0);")}function u(t,i){var a=$(i),e=0;if($(t).length>0)$(t).each(function(){e+=parseInt($(this).html())});else{var n="<li>您的购物车空空的~</li>";v(n,"yes"),h("#J_minBarBtn","#J_minBarCartNum")}a.html(e),p("#J_cartNum",e)}function m(t,i){var a=$(i),e=0;$(t).length>0?($(t).each(function(){e+=parseInt($(this).val())}),a.html(e)):a.html(0)}function f(t){var i=$(t),a=i.innerHeight();i.css({top:"50%","margin-top":"-"+parseInt(a/2)+"px"})}function v(t,i){switch(i){case"yes":$("#J_pluginCart").addClass("plugin-cart-empty").removeClass("plugin-cart-list").html(t);break;case"no":$("#J_pluginCart").removeClass("plugin-cart-empty").addClass("plugin-cart-list").html(t)}}function g(){$.ajax({url:cdnConfig.apiPath+"/cart/statistics",dataType:"jsonp",success:function(t){"succ"==t.status?p("#J_cartNum",t.data.num):p("#J_cartNum",0)},error:function(t){}})}var b=t.mainCell||"#J_minBar",_=t.tpl||function(){},y=t.tplName||"comment/tplMinBar",w=t.data||{};$("body").append(_(y,w));var k=b.indexOf("#")>-1?$(b):$("#"+b),x=k.find(".min-bar-gtop"),J=k.find(".min-wechat"),C=k.find(".min-phone"),N=k.find(".min-bar-feedback"),T=k.find(".min-cart"),B=k.find(".min-bar-qq"),L=k.find(".min-bar-online"),P=$(".min-bar-mark"),j=$(".min-bar-online-pop"),I=$(".pop-close"),E=$(".pop-chat"),Q=1280,A=k.find(".min-text"),q=!1,D=!1,z="30000",O="180000",H="180000";i();var M}a.exports=e}),!function(){function t(t,i){return(/string|function/.test(typeof i)?l:o)(t,i)}function i(t,a){return"string"!=typeof t&&(a=typeof t,"number"===a?t+="":t="function"===a?i(t.call(t)):""),t}function a(t){return p[t]}function e(t){return i(t).replace(/&(?![\w#]+;)|[<>"']/g,a)}function n(t,i){if(h(t))for(var a=0,e=t.length;e>a;a++)i.call(t,t[a],a,t);else for(a in t)i.call(t,t[a],a)}function s(t,i){var a=/(\/)[^/]+\1\.\.\1/,e=("./"+t).replace(/[^/]+$/,""),n=e+i;for(n=n.replace(/\/\.\//g,"/");n.match(a);)n=n.replace(a,"/");return n}function o(i,a){var e=t.get(i)||c({filename:i,name:"Render Error",message:"Template not found"});return a?e(a):e}function l(t,i){if("string"==typeof i){var a=i;i=function(){return new d(a)}}var e=r[t]=function(a){try{return new i(a,t)+""}catch(e){return c(e)()}};return e.prototype=i.prototype=u,e.toString=function(){return i+""},e}function c(t){var i="{Template Error}",a=t.stack||"";if(a)a=a.split("\n").slice(0,2).join("\n");else for(var e in t)a+="<"+e+">\n"+t[e]+"\n\n";return function(){return"object"==typeof console&&console.error(i+"\n\n"+a),i}}var r=t.cache={},d=this.String,p={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},h=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},u=t.utils={$helpers:{},$include:function(t,i,a){return t=s(a,t),o(t,i)},$string:i,$escape:e,$each:n},m=t.helpers=u.$helpers;t.get=function(t){return r[t.replace(/^\.\//,"")]},t.helper=function(t,i){m[t]=i},"function"==typeof define?define("lib/template/tempcomment",[],function(i,a,e){return t}):"undefined"!=typeof exports?module.exports=t:this.template=t,t("tplAddressForm",function(t,i){"use strict";var a=this,e=(a.$helpers,a.$escape),n=t.actionURL,s=t.addressID,o=t.userName,l=t.address,c=t.telephone,r=t.mobilephone,p=t.defaultAdd,h="";return h+='<form id="J_addressForm" action="',h+=e(n),h+='" method="post"> <input type="hidden" name="addressID" value="',h+=e(s),h+='"> <table id="J_add" class="person-address-add-table"> <tbody class="person-address"> <tr class="item"> <th class="address-add-head">收货人：</th> <td> <input id="J_userName" class="person-address-add-input" name="userName" value="',h+=e(o),h+='" /> <span class="fc-f60">*</span> </td> </tr> <tr class="item"> <th class="address-add-head">详细地址：</th> <td id="J_selectAddress"></td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <p> <input id="J_address" class="person-address-add-input detailed-address-input" name="address" placeholder="具体地址" value="',h+=e(l),h+='" /> <span class="fc-f60">*</span> </p> <p> <label class="person-address-add-tip">&nbsp;&nbsp;&nbsp;(不需要重复填写省/市/区)</label> </p> </td> </tr> <tr class="item"> <th class="address-add-head">固定电话：</th> <td> <input id="J_tel" class="person-address-add-input" name="tel" value="',h+=e(c),h+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（示例：020-88888888-999）</label> </td> </tr> <tr class="item"> <th class="address-add-head">手机：</th> <td> <input id="J_phone" class="person-address-add-input" name="phone" value="',h+=e(r),h+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（手机或固话必填一项）</label> </td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <div class="defult-address-choose"> ',h+="1"==p?' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-checked"></a> ':' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-normal"></a> ',h+=' <span class="address-font-gray">设为默认地址</span> <input type="hidden" name="setDefault" value="',h+=e(p),h+='" /> </div> </td> </tr> </tbody> </table> </form>',new d(h)}),t("tplBottomAd",function(t,i){"use strict";var a=this,e=(a.$helpers,t.link),n=a.$escape,s=t.linkURL,o=t.title,l=t.imgURL,c="";return c+='<div class="full-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=e&&(c+=n(e)),""!=s&&(c+=n(s)),c+='" target="_blank" title="',c+=n(o),c+='" style=" display:block; width:100%;min-height: 80px;background:url(',c+=n(l),c+=') center top no-repeat; "> <img src="',c+=n(l),c+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="full-ad-close" id="J_itemBottomAdClose"><span></span></a> </div> </div>',new d(c)}),t("tplEditPassForm",function(t,i){"use strict";var a=this,e=(a.$helpers,a.$escape),n=t.actionURL,s="";return s+='<form id="J_editPassForm" action="',s+=e(n),s+='" method="post"> <div class="fc-8c8">为了您的账户安全，请定期更换登录密码，并确保登录密码设置与提现密码不同。</div> <input type="hidden" name="form" value="form"> <div class="a-edit-pass-tr"> <p id="J_oldPass" class="edit-input-wrap"> <input type="password" name="old_passwd" placeholder="原密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_newPass" class="edit-input-wrap"> <input type="password" name="new_passwd" placeholder="输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_confirmNewPass" class="edit-input-wrap"> <input type="password" name="confirmNewPass" placeholder="再次输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> </form>',new d(s)}),t("tplFloatNav",'<div id="J_floatNav" class="float-nav"> <a href="http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=201143&jid=2104161973" class="float-nav-char-wrap JQ_floatNavNormal" target="_blank"> <span class="floag-online-chat">在线客服</span> <i class="icon-float-chat normal-icon"></i> </a> <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4006538038&aty=0&a=0&curl=&ty=1" class="float-nav-qq JQ_floatNavNormal" target="_blank"> <span>QQ客服</span> <i class="icon-float-qq normal-icon"></i> </a> <a href="http://cart.kinhom.com/list.html" class="float-nav-cart JQ_floatNavNormal" target="_blank"> <span>购物车</span> <i class="icon-float-cart normal-icon"></i> <i class="icon-cart-num num-icon">0</i> </a> <a href="javascript:void(0);" class="float-nav-wechat JQ_floatNavWechat"> <span> <img src="http://misc.jjcdn.com/p/images/float_wechat.png" width="40" height="40" /> </span> <i class="icon-float-wechat normal-icon"></i> </a> <a href="http://www.wenjuan.com/s/qU36f2/" target="_blank" class="float-nav-feedback JQ_floatNavNormal"> <span>意见反馈</span> <i class="icon-float-feedback normal-icon"></i> </a> <a id="J_floatGoTop" href="javascript:void(0);" class="float-nav-top JQ_floatNavNormal"> <span>返回顶部</span> <i class="icon-float-top normal-icon"></i> </a> </div>'),t("tplLoginDialog",'<div class="login-dialog"> <div class="login-dialog-form"> <form action="javascript:void(0);" method="post"> <p class="login-dialog-form-tr" id="J_loginUserName"> <label>用户名：</label> <input type="text" name="loginUserName" placeholder="输入用户名/邮箱/手机"> </p> <p class="login-dialog-form-tip"></p> <p class="login-dialog-form-tr" id="J_loginPassword"> <label>密&nbsp;&nbsp;&nbsp;码：</label> <input type="password" name="loginPassword" placeholder="输入密码"> </p> <p class="login-dialog-form-tip"></p> </form> </div> </div> '),t("tplMinBar",function(t,i){"use strict";var a=this,e=(a.$helpers,a.$escape),n=t.live800,s=t.cdnPath,o=t.wapQQ,l=t.cart,c=t.mobile,r=t.wechat,p=t.feedback,h=t.gotop,u="";return u+=' <section id="J_minBar" class="min-bar"> <div class="min-bar-tabs"> <div class="min-bar-tab min-bar-online"> <div class="min-bar-online-icon"> <a href="',u+=e(n.clientLink),u+='" class="blankLink JQ_minBarOnline" target="_blank"> <img src="',u+=e(s),u+=e(n.iconPath),u+='" width="',u+=e(n.iconWidth),u+='" height="',u+=e(n.iconHeight),u+='" alt="',u+=e(n.iconText),u+='"/> <label class="min-bar-chat-num">',u+=e(n.chatNum),u+='</label> </a> <span class="min-bar-online-pop"> <span class="pop-close">&nbsp;</span> <a href="',u+=e(n.clientLink),u+='" class="pop-chat" target="_blank">&nbsp;</a> </span> </div> </div> <div class="min-bar-tab min-bar-qq min-text"> <div class="min-bar-qq-icon"> <a href="',u+=e(o.clientLink),u+='" class="blankLink" target="_blank"> <img src="',u+=e(s),u+=e(o.iconPath),u+='" width="',u+=e(o.iconWidth),u+='" height="',u+=e(o.iconHeight),u+='" alt="',u+=e(o.iconText),u+='"/> </a> <span class="min-bar-qq-text text">',u+=e(o.iconText),u+='</span> </div> </div> <div class="min-bar-tab min-bar-cart min-cart"> <div class="min-bar-cart-icon"> <a href="',u+=e(l.clientLink),u+='" class="icon-float-cart"> <span id="J_cartNum" class="min-bar-cart-num">',u+=e(l.chatNum),u+='</span> </a> </div> <div id="J_minBarPlugin" class="min-bar-plugin"> <div class="bar-plugin-cart"> <ul id="J_pluginCart"> </ul> <div class="plugin-cart-info"> <p class="cart-info-price"> <span class="cart-info-num"> 共 <label id="J_minBarCartNum">0</label> 件商品 </span> <span class="cart-info-total"> 合计: <small>&yen;</small> <label id="J_minBarCartTotal">0</label> </span> </p> <p class="cart-info-shipping">(不含运费)</p> <p class="cart-info-btn"> <a href="javascript:void(0);" id="J_minBarBtn" class="btn-gray" target="_blank">查看购物车</a> </p> </div> </div> </div> </div> <div class="min-bar-tab min-bar-phone min-phone"> <div class="min-bar-phone-icon"> <a href="',u+=e(c.clientLink),u+='" class="icon-float-phone">&nbsp;</a> <span class="min-bar-phone-img phone"> <img src="',u+=e(s),u+=e(c.iconPath),u+='" width="',u+=e(c.iconWidth),u+='" height="',u+=e(c.iconHeight),u+='" alt="',u+=e(c.iconText),u+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-wechat min-wechat"> <div class="min-bar-wechat-icon"> <a href="',u+=e(r.clientLink),u+='" class="icon-float-wechat">&nbsp;</a> <span class="min-bar-wechat-img wechat"> <img src="',u+=e(s),u+=e(r.iconPath),u+='" width="',u+=e(r.iconWidth),u+='" height="',u+=e(r.iconHeight),u+='" alt="',u+=e(r.iconText),u+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-feedback min-text"> <div class="min-bar-feedback-icon"> <a href="',u+=e(p.clientLink),u+='" class="icon-float-feedback blankLink" target="_blank">&nbsp;</a> <span class="min-bar-feedback-text text">',u+=e(p.iconText),u+='</span> </div> </div> <div class="min-bar-tab min-bar-gtop min-text"> <div class="min-bar-gtop-icon" id="J_minBarGoTop"> <a href="',u+=e(h.clientLink),u+='" class="icon-float-top">&nbsp;</a> <span class="min-bar-gtop-text text">',u+=e(h.iconText),u+='</span> </div> </div> </div> </section> <section class="min-bar-mark"></section> ',new d(u)}),t("tplSelectAddress",function(t,i){"use strict";var a=this,e=(a.$helpers,t.valCity),n=a.$escape,s=t.textPro,o=t.valPro,l=t.textCity,c=t.valArea,r=t.textArea,p="";return p+='<div id="J_selectProvience" class="select-gray fl"> <i class="select-corner icon-gray-left"></i> ',""==e?p+=' <label class="JQ_option select-option w90" data-value="0">请选择省</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=n(s),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_proList"></ul> <input type="hidden" name="valProvince" value="',p+=n(o),p+='" /> </div> <div class="select-gray fl JQ_addressCity"> <i class="select-corner icon-gray-left"></i> ',""==e?p+=' <label class="JQ_option select-option w90" data-value="0">请选择市</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=n(l),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_cityList"></ul> <input type="hidden" name="valCity" value="',p+=n(e),p+='" /> </div> <div class="select-gray fl JQ_addressArea"> <i class="select-corner icon-gray-left"></i> ',""==c?p+=' <label class="JQ_option select-option w90" data-value="0">请选择区</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=n(r),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_areaList"></ul> <input type="hidden" name="valArea" value="',p+=n(c),p+='" /> </div> ',new d(p)}),t("tplTopAd",function(t,i){"use strict";var a=this,e=(a.$helpers,t.link),n=a.$escape,s=t.linkURL,o=t.title,l=t.imgURL,c="";return c+='<div class="top-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=e&&(c+=n(e)),""!=s&&(c+=n(s)),c+='" target="_blank" title="',c+=n(o),c+='" style=" display:block; width:100%; min-height: 80px; background:url(',c+=n(l),c+=') center top no-repeat; "> <img src="',c+=n(l),c+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="index-top-ad-close" id="J_indexTopAdClose"> <span></span> </a> </div> </div>',new d(c)})}();