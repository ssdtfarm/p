define("libpage.0.0/redeem-order-list",["lib/components/dialog/1.0.0/dialog","lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config","lib/components/khValidate/1.0.0/khValidate"],function(t,e,i){var s=t("../../components/dialog/1.0.0/dialog"),o=(t("../../components/khValidate/1.0.0/khValidate"),1*$.trim($(".total_goods_price").html()));$(".J_check_point").on("click",function(){var t=($(this).data("user"),0),e=$("#cid").val();$.ajax({url:cdnConfig.apiPath+"/member/getintegral",type:"GET",dataType:"jsonp",success:function(i){if("succ"==i.status)if(t=parseInt(i.data),o>t)var n='<p class="dialog-tips"><i class="icon-face-frown-blue"></i><span>您的积分不够兑换此商品！</span></p>',a=new s({title:"提示",content:n,width:400,height:60,fixed:!0,button:[{value:"返回积分商城首页",className:"ui-btns-orange",callback:function(){a.remove(),window.location.href="http://my.kinhom.com/club/integralshop"}}]}).showModal();else window.location.href="http://cart.kinhom.com/confirmcoupon?cid="+e;else var r='<p class="dialog-tips"><br><span>亲，请先登录！</span></p>',a=new s({title:"提示",content:r,width:400,height:60,fixed:!0}).showModal()},error:function(){}})})}),define("lib/components/dialog/1.0.0/dialog",["lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config"],function(t,e,i){var s=t("./popup"),o=t("./dialog-config"),n=o.cssUri;if(n){var a=t[t.toUrl?"toUrl":"resolve"];a&&(n=a(n),n='<link rel="stylesheet" href="'+n+'" />',$("base")[0]?$("base").before(n):$("head").append(n))}var r=0,c=new Date-0,l=!("minWidth"in $("html")[0].style),d="createTouch"in document&&!("onmousemove"in document)||/(iPhone|iPad|iPod)/i.test(navigator.userAgent),u=!l&&!d,h=function(t,e,i){var s=t=t||{};"string"!=typeof t&&1!==t.nodeType||(t={content:t,fixed:!d}),t=$.extend(!0,{},h.defaults,t),t.original=s;var o=t.id=t.id||c+r,n=h.get(o);return n?n.focus():(u||(t.fixed=!0),t.quickClose&&(t.modal=!0,t.backdropOpacity=0),$.isArray(t.button)||(t.button=[]),void 0!==i&&(t.cancel=i),t.cancel&&t.button.push({id:"cancel",className:t.cancelClassName,value:t.cancelValue,callback:t.cancel,display:t.cancelDisplay}),void 0!==e&&(t.ok=e),t.ok&&t.button.push({id:"ok",className:t.okClassName,value:t.okValue,callback:t.ok,autofocus:!0}),h.list[o]=new h.create(t))},p=function(){};p.prototype=s.prototype;var f=h.prototype=new p;return h.create=function(t){var e=this;$.extend(this,new s);var i=(t.original,$(this.node).html(t.innerHTML)),o=$(this.backdrop);return this.options=t,this._popup=i,$.each(t,function(t,i){"function"==typeof e[t]?e[t](i):e[t]=i}),t.zIndex&&(s.zIndex=t.zIndex),i.attr({"aria-labelledby":this._$("title").attr("id","title:"+this.id).attr("id"),"aria-describedby":this._$("content").attr("id","content:"+this.id).attr("id")}),this._$("close").css("display",this.cancel===!1?"none":"").on("click",function(t){e._trigger("cancel"),t.preventDefault()}),this._$("dialog").addClass(this.skin),this._$("body").css("padding",this.padding),t.quickClose&&o.on("onmousedown"in document?"mousedown":"click",function(){return e._trigger("cancel"),!1}),this.addEventListener("show",function(){o.css({opacity:0,background:t.backdropBackground}).animate({opacity:t.backdropOpacity},150)}),this._esc=function(t){var i=t.target,o=i.nodeName,n=/^input|textarea$/i,a=s.current===e,r=t.keyCode;!a||n.test(o)&&"button"!==i.type||27===r&&e._trigger("cancel")},$(document).on("keydown",this._esc),this.addEventListener("remove",function(){$(document).off("keydown",this._esc),delete h.list[this.id]}),r++,h.oncreate(this),this},h.create.prototype=f,$.extend(f,{content:function(t){var e=this._$("content");return"object"==typeof t?(t=$(t),e.empty("").append(t.show()),this.addEventListener("beforeremove",function(){$("body").append(t.hide())})):e.html(t),this.reset()},title:function(t){return this._$("title").text(t),this._$("header")[t?"show":"hide"](),this},width:function(t){return this._$("content").css("width",t),this.reset()},height:function(t){return this._$("content").css("height",t),this.reset()},button:function(t){t=t||[];var e=this,i="",s=0;return this.callbacks={},"string"==typeof t?(i=t,s++):$.each(t,function(t,o){var n=o.id=o.id||o.value,a="";e.callbacks[n]=o.callback,o.display===!1?a=' style="display:none"':s++,i+='<button type="button" i-id="'+n+'" class="'+(o.className?o.className:"ui-btns-nor")+'"'+a+(o.disabled?" disabled":"")+(o.autofocus?' autofocus class="ui-dialog-autofocus"':"")+">"+o.value+"</button>",e._$("button").on("click","[i-id="+n+"]",function(t){var i=$(this);i.attr("disabled")||e._trigger(n),t.preventDefault()})}),this._$("button").html(i),this._$("footer")[s?"show":"hide"](),this},statusbar:function(t){return this._$("statusbar").html(t)[t?"show":"hide"](),this},_$:function(t){return this._popup.find("[i="+t+"]")},_trigger:function(t){var e=this.callbacks[t];return"function"!=typeof e||e.call(this)!==!1?this.close().remove():this}}),h.oncreate=$.noop,h.getCurrent=function(){return s.current},h.get=function(t){return void 0===t?h.list:h.list[t]},h.list={},h.defaults=o,h}),define("lib/components/dialog/1.0.0/popup",[],function(t,e,i){function s(){this.destroyed=!1,this.__popup=$("<div />").css({display:"none",position:"absolute",outline:0}).attr("tabindex","-1").html(this.innerHTML).appendTo("body"),this.__backdrop=this.__mask=$("<div />").css({opacity:.7,background:"#000"}),this.node=this.__popup[0],this.backdrop=this.__backdrop[0],o++}var o=0,n=!("minWidth"in $("html")[0].style),a=!n;return $.extend(s.prototype,{node:null,backdrop:null,fixed:!1,destroyed:!0,open:!1,returnValue:"",autofocus:!0,align:"bottom left",innerHTML:"",className:"ui-popup",show:function(t){if(this.destroyed)return this;var e=this.__popup,i=this.__backdrop;if(this.__activeElement=this.__getActive(),this.open=!0,this.follow=t||this.follow,!this.__ready){if(e.addClass(this.className).attr("role",this.modal?"alertdialog":"dialog").css("position",this.fixed?"fixed":"absolute"),n||$(window).on("resize",$.proxy(this.reset,this)),this.modal){var o={position:"fixed",left:0,top:0,width:"100%",height:"100%",overflow:"hidden",userSelect:"none",zIndex:this.zIndex||s.zIndex};e.addClass(this.className+"-modal"),a||$.extend(o,{position:"absolute",width:$(window).width()+"px",height:$(document).height()+"px"}),i.css(o).attr({tabindex:"0"}).on("focus",$.proxy(this.focus,this)),this.__mask=i.clone(!0).attr("style","").insertAfter(e),i.addClass(this.className+"-backdrop").insertBefore(e),this.__ready=!0}e.html()||e.html(this.innerHTML)}return e.addClass(this.className+"-show").show(),i.show(),this.reset().focus(),this.__dispatchEvent("show"),this},showModal:function(){return this.modal=!0,this.show.apply(this,arguments)},close:function(t){return!this.destroyed&&this.open&&(void 0!==t&&(this.returnValue=t),this.__popup.hide().removeClass(this.className+"-show"),this.__backdrop.hide(),this.open=!1,this.blur(),this.__dispatchEvent("close")),this},remove:function(){if(this.destroyed)return this;this.__dispatchEvent("beforeremove"),s.current===this&&(s.current=null),this.__popup.remove(),this.__backdrop.remove(),this.__mask.remove(),n||$(window).off("resize",this.reset),this.__dispatchEvent("remove");for(var t in this)delete this[t];return this},reset:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("reset"),this},resize:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("resize"),this},focus:function(){var t=this.node,e=this.__popup,i=s.current,o=this.zIndex=s.zIndex++;if(i&&i!==this&&i.blur(!1),!$.contains(t,this.__getActive())){var n=e.find("[autofocus]")[0];!this._autofocus&&n?this._autofocus=!0:n=t,this.__focus(n)}return e.css("zIndex",o),s.current=this,e.addClass(this.className+"-focus"),this.__dispatchEvent("focus"),this},blur:function(){var t=this.__activeElement,e=arguments[0];return e!==!1&&this.__focus(t),this._autofocus=!1,this.__popup.removeClass(this.className+"-focus"),this.__dispatchEvent("blur"),this},addEventListener:function(t,e){return this.__getEventListener(t).push(e),this},removeEventListener:function(t,e){for(var i=this.__getEventListener(t),s=0;s<i.length;s++)e===i[s]&&i.splice(s--,1);return this},__getEventListener:function(t){var e=this.__listener;return e||(e=this.__listener={}),e[t]||(e[t]=[]),e[t]},__dispatchEvent:function(t){var e=this.__getEventListener(t);this["on"+t]&&this["on"+t]();for(var i=0;i<e.length;i++)e[i].call(this)},__focus:function(t){try{this.autofocus&&!/^iframe$/i.test(t.nodeName)&&t.focus()}catch(e){}},__getActive:function(){try{var t=document.activeElement,e=t.contentDocument,i=e&&e.activeElement||t;return i}catch(s){}},__center:function(){var t=this.__popup,e=$(window),i=$(document),s=this.fixed,o=s?0:i.scrollLeft(),n=s?0:i.scrollTop(),a=e.width(),r=e.innerHeight(),c=t.width(),l=t.height(),d=(a-c)/2,u=(r-l)/2,h=t[0].style;h.left=Math.max(parseInt(d),o)+"px",h.top=Math.max(parseInt(u),n)+"px"},__follow:function(t){var e=t.parentNode&&$(t),i=this.__popup;if(this.__followSkin&&i.removeClass(this.__followSkin),e){var s=e.offset();if(s.left*s.top<0)return this.__center()}var o=this,n=this.fixed,a=$(window),r=$(document),c=a.width(),l=a.height(),d=r.scrollLeft(),u=r.scrollTop(),h=i.width(),p=i.height(),f=e?e.outerWidth():0,_=e?e.outerHeight():0,v=this.__offset(t),m=v.left,b=v.top,g=n?m-d:m,k=n?b-u:b,w=n?0:d,y=n?0:u,x=w+c-h,E=y+l-p,N={},z=this.align.split(" "),C=this.className+"-",A={top:"bottom",bottom:"top",left:"right",right:"left"},L={top:"top",bottom:"top",left:"left",right:"left"},F=[{top:k-p,bottom:k+_,left:g-h,right:g+f},{top:k,bottom:k-p+_,left:g,right:g-h+f}],I={left:g+f/2-h/2,top:k+_/2-p/2},T={left:[w,x],top:[y,E]};$.each(z,function(t,e){F[t][e]>T[L[e]][1]&&(e=z[t]=A[e]),F[t][e]<T[L[e]][0]&&(z[t]=A[e])}),z[1]||(L[z[1]]="left"===L[z[0]]?"top":"left",F[1][z[1]]=I[L[z[1]]]),C+=z.join("-")+" "+this.className+"-follow",o.__followSkin=C,e&&i.addClass(C),N[L[z[0]]]=parseInt(F[0][z[0]]),N[L[z[1]]]=parseInt(F[1][z[1]]),i.css(N)},__offset:function(t){var e=t.parentNode,i=e?$(t).offset():{left:t.pageX,top:t.pageY};t=e?t:t.target;var s=t.ownerDocument,o=s.defaultView||s.parentWindow;if(o==window)return i;var n=o.frameElement,a=$(s),r=a.scrollLeft(),c=a.scrollTop(),l=$(n).offset(),d=l.left,u=l.top;return{left:i.left+d-r,top:i.top+u-c}}}),s.zIndex=1024,s.current=null,s}),define("lib/components/dialog/1.0.0/dialog-config",[],{backdropBackground:"#000",backdropOpacity:.7,content:'<span class="ui-dialog-loading">Loading..</span>',title:"",statusbar:"",button:null,ok:null,okClassName:"ui-btns-ok",cancel:null,cancelClassName:"ui-btns-cancel",okValue:"ok",cancelValue:"cancel",cancelDisplay:!0,width:"",height:"",padding:"",skin:"",quickClose:!1,cssUri:"",innerHTML:'<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><span i="close" class="ui-dialog-close">&#215;</span><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="button" class="ui-dialog-button"></div></td></tr><tr><td i="footerSub" class="ui-dialog-footer"><div i="statusbar" class="ui-dialog-statusbar"></div></td></tr></table></div>'}),define("lib/components/khValidate/1.0.0/khValidate",[],function(t,e,i){var s={chkEnName:function(t){var e=/^[a-zA-Z|0-9]{3,20}$/;return e.test(t)},chkCnName:function(t){var e=/^[\u2E80-\u9FFF]{2,20}$/;return e.test(t)},chkIsChinese:function(t){var e=/[\u4E00-\u9FA5\uF900-\uFA2D]/;return e.test(t)},chkUserName:function(t){var e=/^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{2,20}$/;return e.test(t)},chkTelephone:function(t){var e=/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;return e.test(t)},chkPhone:function(t){var e=/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;return e.test(t)},chkPass:function(t){var e=/^[a-zA-Z0-9_-]{6,20}$/;return e.test(t)},chkPassNew:function(t){var e=/^[^\u2E80-\uFFA0\s]{6,20}$/;return e.test(t)},chkNumber:function(t,e){var i;switch(e){case 4:i=/^[0-9]{4}$/;break;case 5:i=/^[0-9]{5}$/;break;case 6:i=/^[0-9]{6}$/;break;case 7:i=/^[0-9]{7}$/;break;case 8:i=/^[0-9]{8}$/;break;case 9:i=/^[0-9]{9}$/;break;case 10:i=/^[0-9]{10}$/;break;case 11:i=/^[0-9]{11}$/;break;case 12:i=/^[0-9]{12}$/;break;case 13:i=/^[0-9]{13}$/;break;case 14:i=/^[0-9]{14}$/;break;case 15:i=/^[0-9]{15}$/;break;case 16:i=/^[0-9]{16}$/;break;case 17:i=/^[0-9]{17}$/;break;case 18:i=/^[0-9]{18}$/;break;default:i=/^[0-9]{6}$/}return i.test(t)},chkAliAcount:function(t){var e=/^[0-9]{11}|^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;return e.test(t)},chkBankName:function(t){var e=/^[\u2E80-\u9FFF]{4,20}$/;return e.test(t)},chkBankAcount:function(t){var e=/^[0-9]{15,23}$/;return e.test(t)},chkBankOrderNum:function(t){var e=/^[0-9]{8,}$/;return e.test(t)},chkPrice:function(t){var e=/^[0-9]{1,10}[\.][0-9]{2}$/;return e.test(t)},chkEmail:function(t){var e=/^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;return e.test(t)},chkURL:function(t){var e=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;return e.test(t)},chkIP:function(t){var e=/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;return e.test(t)},chkScript:function(t){var e=/^[A-Za-z0-9|_|-|\u4E00-\u9FA5\uF900-\uFA2D|@|#|,|.|;]+$/;return e.test(t)}};i.exports=s});