define("libpage.0.0/security-validate-email",["lib/components/khValidate/1.0.0/khValidate","lib/components/dialog/1.0.0/dialog","lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config","lib/components/minBar/1.0.1/minBar","lib/template/tempcomment"],function(t,a,e){function i(){for(var t=g.length,a=0;t>a;a++)!function(t){var a=g[t];a.obj&&a.obj.on("blur",function(){"email"==a.type&&n(a)}).on("keyup",function(){if(v){var t=$.trim(g[0].obj.val()).replace("/s/g","");""!=t?$("#J_submitBtn").addClass("on"):$("#J_submitBtn").removeClass("on")}}).on("focus",function(){f=!1,d(a.obj,a.normalText,"normal")})}(a);$("#J_submitBtn").on("click",function(){f&&v&&l(g[0])})}function n(t){var a=t.obj||t,e=a.parent().siblings("p.tips"),i=a.val();return""==i?(s(e),$("#J_submitBtn").removeClass("on").html("发送验证邮件"),void d(a,t.nullText,"no")):void(i.length<6||i.length>30?(s(e),$("#J_submitBtn").addClass("on").html("发送验证邮件"),d(a,t.LenText,"no")):p.chkEmail(i)?v&&(e.show(),$("#J_submitBtn").addClass("on"),$("#J_tipsNotify").hide(),o(a,t)):(s(e),$("#J_submitBtn").addClass("on").html("发送验证邮件"),d(a,t.errorText,"no")))}function s(t){clearInterval(m),t.show(),$("#J_tipsNotify").hide(),f=!1,v=!0}function o(t,a){var e=t.val();$.ajax({url:_.checkEmailExistsAction,type:"post",data:{email:e},dataType:"json",success:function(e){"400"==e.code.toString()?(f=!1,d(t,a.existsText,"no")):"200"==e.code.toString()&&(f=!0,d(t,"","ok"))},error:function(){f=!1}})}function l(t){var a=t.obj,e=a.val(),i=a.parent().siblings("p.tips");$.ajax({url:_.sendEmailAction,type:"post",data:{email:e},dataType:"json"}).done(function(t){switch(t.code.toString()){case"200":v&&(i.hide(),$("#J_tipsNotify").show(),r(),v=!1,c(120,$("#J_submitBtn")));break;case"400":d(a,t.message,"no")}})}function r(){var t=$("#J_email").val().split("@")[1];for(var a in b)a===t?$("#J_checkEmail").attr("href","http://"+b[t]):$("#J_checkEmail").attr("href","http://mail."+t)}function c(t,a){a.removeClass("on"),m=setInterval(function(){0>=t?(clearInterval(m),v=!0,a.addClass("on").html("发送验证邮件")):(v=!1,a.html("重新获取(<span>"+t+"秒</span>)"),t-=1)},1e3)}function d(t,a,e){var i=t.parent(),n=i.siblings("p.tips"),s='<i class="icon-tip-wrong"></i><span class="fc-c13">'+a+"</span>",o='<span class="fc-c13">'+a+"</span>",l='<i class="icon-tip-ok tip-ok"></i>';switch(e){case"no":i.addClass("error").find(".tip-ok").remove(),n.html(s);break;case"ok":i.find(".tip-ok").remove().end().removeClass("error").append(l),n.html(o);break;case"normal":v&&(n.show().empty().html(a),$("#J_tipsNotify").hide())}}document.getElementById("J_memberAside").innerHTML=document.getElementById("J_templateMemberAside").innerHTML;var p=t("../../components/khValidate/1.0.0/khValidate"),u=(t("../../components/dialog/1.0.0/dialog"),t("../../components/minBar/1.0.1/minBar")),h=t("../../template/tempcomment");u({mainCell:"#J_minBar",pathConfig:cdnConfig,tpl:h,tplName:"tplMinBar",data:_globalConfig.minBar.data});var m,f=!1,v=!0,b={"163.com":"mail.163.com","126.com":"mail.126.com","yeah.net":"mail.yeah.net","qq.com":"mail.qq.com","foxmail.com":"mail.foxmail.com","gmail.com":"mail.gmail.com","sohu.com":"mail.sohu.com","sogou.com":"mail.sogou.com","sina.com.cn":"mail.sina.com.cn","10086.com":"mail.10086.cn","139.com":"mail.139.com","wo.cn":"mail.wo.cn","189.cn":"webmail30.189.cn","live.cn":"mail.live.cn","hotmail.com":"mail.hotmail.com","live.com":"mail.live.com","aliyun.com":"mail.aliyun.com","21.cn":"mail.21cn.com"},g=[{obj:$("#J_email").length>0?$("#J_email"):null,type:"email",nullText:"请输入您能正常接收信息的邮箱地址如：abc@123.com",errorText:"邮箱地址无效，请输入正确地址，如：lenny211@163.com",existsText:"该邮箱已被注册，请更换新邮箱！",normalText:"请输入您能正常接收信息的邮箱地址如：abc@123.com",LenText:"邮箱名为6-30个字符",sendFailedText:"验证邮件发送失败"}],_={checkEmailExistsAction:cdnConfig.my+"/ajax/checkemail",sendEmailAction:cdnConfig.my+"/security/bindemail"};i()}),define("lib/components/khValidate/1.0.0/khValidate",[],function(t,a,e){var i={chkEnName:function(t){var a=/^[a-zA-Z|0-9]{3,20}$/;return a.test(t)},chkCnName:function(t){var a=/^[\u2E80-\u9FFF]{2,20}$/;return a.test(t)},chkIsChinese:function(t){var a=/[\u4E00-\u9FA5\uF900-\uFA2D]/;return a.test(t)},chkUserName:function(t){var a=/^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{2,20}$/;return a.test(t)},chkTelephone:function(t){var a=/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;return a.test(t)},chkPhone:function(t){var a=/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;return a.test(t)},chkPass:function(t){var a=/^[a-zA-Z0-9_-]{6,20}$/;return a.test(t)},chkPassNew:function(t){var a=/^[^\u2E80-\uFFA0\s]{6,20}$/;return a.test(t)},chkNumber:function(t,a){var e;switch(a){case 4:e=/^[0-9]{4}$/;break;case 5:e=/^[0-9]{5}$/;break;case 6:e=/^[0-9]{6}$/;break;case 7:e=/^[0-9]{7}$/;break;case 8:e=/^[0-9]{8}$/;break;case 9:e=/^[0-9]{9}$/;break;case 10:e=/^[0-9]{10}$/;break;case 11:e=/^[0-9]{11}$/;break;case 12:e=/^[0-9]{12}$/;break;case 13:e=/^[0-9]{13}$/;break;case 14:e=/^[0-9]{14}$/;break;case 15:e=/^[0-9]{15}$/;break;case 16:e=/^[0-9]{16}$/;break;case 17:e=/^[0-9]{17}$/;break;case 18:e=/^[0-9]{18}$/;break;default:e=/^[0-9]{6}$/}return e.test(t)},chkAliAcount:function(t){var a=/^[0-9]{11}|^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;return a.test(t)},chkBankName:function(t){var a=/^[\u2E80-\u9FFF]{4,20}$/;return a.test(t)},chkBankAcount:function(t){var a=/^[0-9]{15,23}$/;return a.test(t)},chkBankOrderNum:function(t){var a=/^[0-9]{8,}$/;return a.test(t)},chkPrice:function(t){var a=/^[0-9]{1,10}[\.][0-9]{2}$/;return a.test(t)},chkEmail:function(t){var a=/^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;return a.test(t)},chkURL:function(t){var a=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;return a.test(t)},chkIP:function(t){var a=/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;return a.test(t)},chkScript:function(t){var a=/^[A-Za-z0-9|_|-|\u4E00-\u9FA5\uF900-\uFA2D|@|#|,|.|;]+$/;return a.test(t)}};e.exports=i}),define("lib/components/dialog/1.0.0/dialog",["lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config"],function(t,a,e){var i=t("./popup"),n=t("./dialog-config"),s=n.cssUri;if(s){var o=t[t.toUrl?"toUrl":"resolve"];o&&(s=o(s),s='<link rel="stylesheet" href="'+s+'" />',$("base")[0]?$("base").before(s):$("head").append(s))}var l=0,r=new Date-0,c=!("minWidth"in $("html")[0].style),d="createTouch"in document&&!("onmousemove"in document)||/(iPhone|iPad|iPod)/i.test(navigator.userAgent),p=!c&&!d,u=function(t,a,e){var i=t=t||{};"string"!=typeof t&&1!==t.nodeType||(t={content:t,fixed:!d}),t=$.extend(!0,{},u.defaults,t),t.original=i;var n=t.id=t.id||r+l,s=u.get(n);return s?s.focus():(p||(t.fixed=!0),t.quickClose&&(t.modal=!0,t.backdropOpacity=0),$.isArray(t.button)||(t.button=[]),void 0!==e&&(t.cancel=e),t.cancel&&t.button.push({id:"cancel",className:t.cancelClassName,value:t.cancelValue,callback:t.cancel,display:t.cancelDisplay}),void 0!==a&&(t.ok=a),t.ok&&t.button.push({id:"ok",className:t.okClassName,value:t.okValue,callback:t.ok,autofocus:!0}),u.list[n]=new u.create(t))},h=function(){};h.prototype=i.prototype;var m=u.prototype=new h;return u.create=function(t){var a=this;$.extend(this,new i);var e=(t.original,$(this.node).html(t.innerHTML)),n=$(this.backdrop);return this.options=t,this._popup=e,$.each(t,function(t,e){"function"==typeof a[t]?a[t](e):a[t]=e}),t.zIndex&&(i.zIndex=t.zIndex),e.attr({"aria-labelledby":this._$("title").attr("id","title:"+this.id).attr("id"),"aria-describedby":this._$("content").attr("id","content:"+this.id).attr("id")}),this._$("close").css("display",this.cancel===!1?"none":"").on("click",function(t){a._trigger("cancel"),t.preventDefault()}),this._$("dialog").addClass(this.skin),this._$("body").css("padding",this.padding),t.quickClose&&n.on("onmousedown"in document?"mousedown":"click",function(){return a._trigger("cancel"),!1}),this.addEventListener("show",function(){n.css({opacity:0,background:t.backdropBackground}).animate({opacity:t.backdropOpacity},150)}),this._esc=function(t){var e=t.target,n=e.nodeName,s=/^input|textarea$/i,o=i.current===a,l=t.keyCode;!o||s.test(n)&&"button"!==e.type||27===l&&a._trigger("cancel")},$(document).on("keydown",this._esc),this.addEventListener("remove",function(){$(document).off("keydown",this._esc),delete u.list[this.id]}),l++,u.oncreate(this),this},u.create.prototype=m,$.extend(m,{content:function(t){var a=this._$("content");return"object"==typeof t?(t=$(t),a.empty("").append(t.show()),this.addEventListener("beforeremove",function(){$("body").append(t.hide())})):a.html(t),this.reset()},title:function(t){return this._$("title").text(t),this._$("header")[t?"show":"hide"](),this},width:function(t){return this._$("content").css("width",t),this.reset()},height:function(t){return this._$("content").css("height",t),this.reset()},button:function(t){t=t||[];var a=this,e="",i=0;return this.callbacks={},"string"==typeof t?(e=t,i++):$.each(t,function(t,n){var s=n.id=n.id||n.value,o="";a.callbacks[s]=n.callback,n.display===!1?o=' style="display:none"':i++,e+='<button type="button" i-id="'+s+'" class="'+(n.className?n.className:"ui-btns-nor")+'"'+o+(n.disabled?" disabled":"")+(n.autofocus?' autofocus class="ui-dialog-autofocus"':"")+">"+n.value+"</button>",a._$("button").on("click","[i-id="+s+"]",function(t){var e=$(this);e.attr("disabled")||a._trigger(s),t.preventDefault()})}),this._$("button").html(e),this._$("footer")[i?"show":"hide"](),this},statusbar:function(t){return this._$("statusbar").html(t)[t?"show":"hide"](),this},_$:function(t){return this._popup.find("[i="+t+"]")},_trigger:function(t){var a=this.callbacks[t];return"function"!=typeof a||a.call(this)!==!1?this.close().remove():this}}),u.oncreate=$.noop,u.getCurrent=function(){return i.current},u.get=function(t){return void 0===t?u.list:u.list[t]},u.list={},u.defaults=n,u}),define("lib/components/dialog/1.0.0/popup",[],function(t,a,e){function i(){this.destroyed=!1,this.__popup=$("<div />").css({display:"none",position:"absolute",outline:0}).attr("tabindex","-1").html(this.innerHTML).appendTo("body"),this.__backdrop=this.__mask=$("<div />").css({opacity:.7,background:"#000"}),this.node=this.__popup[0],this.backdrop=this.__backdrop[0],n++}var n=0,s=!("minWidth"in $("html")[0].style),o=!s;return $.extend(i.prototype,{node:null,backdrop:null,fixed:!1,destroyed:!0,open:!1,returnValue:"",autofocus:!0,align:"bottom left",innerHTML:"",className:"ui-popup",show:function(t){if(this.destroyed)return this;var a=this.__popup,e=this.__backdrop;if(this.__activeElement=this.__getActive(),this.open=!0,this.follow=t||this.follow,!this.__ready){if(a.addClass(this.className).attr("role",this.modal?"alertdialog":"dialog").css("position",this.fixed?"fixed":"absolute"),s||$(window).on("resize",$.proxy(this.reset,this)),this.modal){var n={position:"fixed",left:0,top:0,width:"100%",height:"100%",overflow:"hidden",userSelect:"none",zIndex:this.zIndex||i.zIndex};a.addClass(this.className+"-modal"),o||$.extend(n,{position:"absolute",width:$(window).width()+"px",height:$(document).height()+"px"}),e.css(n).attr({tabindex:"0"}).on("focus",$.proxy(this.focus,this)),this.__mask=e.clone(!0).attr("style","").insertAfter(a),e.addClass(this.className+"-backdrop").insertBefore(a),this.__ready=!0}a.html()||a.html(this.innerHTML)}return a.addClass(this.className+"-show").show(),e.show(),this.reset().focus(),this.__dispatchEvent("show"),this},showModal:function(){return this.modal=!0,this.show.apply(this,arguments)},close:function(t){return!this.destroyed&&this.open&&(void 0!==t&&(this.returnValue=t),this.__popup.hide().removeClass(this.className+"-show"),this.__backdrop.hide(),this.open=!1,this.blur(),this.__dispatchEvent("close")),this},remove:function(){if(this.destroyed)return this;this.__dispatchEvent("beforeremove"),i.current===this&&(i.current=null),this.__popup.remove(),this.__backdrop.remove(),this.__mask.remove(),s||$(window).off("resize",this.reset),this.__dispatchEvent("remove");for(var t in this)delete this[t];return this},reset:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("reset"),this},resize:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("resize"),this},focus:function(){var t=this.node,a=this.__popup,e=i.current,n=this.zIndex=i.zIndex++;if(e&&e!==this&&e.blur(!1),!$.contains(t,this.__getActive())){var s=a.find("[autofocus]")[0];!this._autofocus&&s?this._autofocus=!0:s=t,this.__focus(s)}return a.css("zIndex",n),i.current=this,a.addClass(this.className+"-focus"),this.__dispatchEvent("focus"),this},blur:function(){var t=this.__activeElement,a=arguments[0];return a!==!1&&this.__focus(t),this._autofocus=!1,this.__popup.removeClass(this.className+"-focus"),this.__dispatchEvent("blur"),this},addEventListener:function(t,a){return this.__getEventListener(t).push(a),this},removeEventListener:function(t,a){for(var e=this.__getEventListener(t),i=0;i<e.length;i++)a===e[i]&&e.splice(i--,1);return this},__getEventListener:function(t){var a=this.__listener;return a||(a=this.__listener={}),a[t]||(a[t]=[]),a[t]},__dispatchEvent:function(t){var a=this.__getEventListener(t);this["on"+t]&&this["on"+t]();for(var e=0;e<a.length;e++)a[e].call(this)},__focus:function(t){try{this.autofocus&&!/^iframe$/i.test(t.nodeName)&&t.focus()}catch(a){}},__getActive:function(){try{var t=document.activeElement,a=t.contentDocument,e=a&&a.activeElement||t;return e}catch(i){}},__center:function(){var t=this.__popup,a=$(window),e=$(document),i=this.fixed,n=i?0:e.scrollLeft(),s=i?0:e.scrollTop(),o=a.width(),l=a.innerHeight(),r=t.width(),c=t.height(),d=(o-r)/2,p=(l-c)/2,u=t[0].style;u.left=Math.max(parseInt(d),n)+"px",u.top=Math.max(parseInt(p),s)+"px"},__follow:function(t){var a=t.parentNode&&$(t),e=this.__popup;if(this.__followSkin&&e.removeClass(this.__followSkin),a){var i=a.offset();if(i.left*i.top<0)return this.__center()}var n=this,s=this.fixed,o=$(window),l=$(document),r=o.width(),c=o.height(),d=l.scrollLeft(),p=l.scrollTop(),u=e.width(),h=e.height(),m=a?a.outerWidth():0,f=a?a.outerHeight():0,v=this.__offset(t),b=v.left,g=v.top,_=s?b-d:b,k=s?g-p:g,y=s?0:d,w=s?0:p,x=y+r-u,J=w+c-h,C={},N=this.align.split(" "),B=this.className+"-",T={top:"bottom",bottom:"top",left:"right",right:"left"},j={top:"top",bottom:"top",left:"left",right:"left"},E=[{top:k-h,bottom:k+f,left:_-u,right:_+m},{top:k,bottom:k-h+f,left:_,right:_-u+m}],L={left:_+m/2-u/2,top:k+f/2-h/2},P={left:[y,x],top:[w,J]};$.each(N,function(t,a){E[t][a]>P[j[a]][1]&&(a=N[t]=T[a]),E[t][a]<P[j[a]][0]&&(N[t]=T[a])}),N[1]||(j[N[1]]="left"===j[N[0]]?"top":"left",E[1][N[1]]=L[j[N[1]]]),B+=N.join("-")+" "+this.className+"-follow",n.__followSkin=B,a&&e.addClass(B),C[j[N[0]]]=parseInt(E[0][N[0]]),C[j[N[1]]]=parseInt(E[1][N[1]]),e.css(C)},__offset:function(t){var a=t.parentNode,e=a?$(t).offset():{left:t.pageX,top:t.pageY};t=a?t:t.target;var i=t.ownerDocument,n=i.defaultView||i.parentWindow;if(n==window)return e;var s=n.frameElement,o=$(i),l=o.scrollLeft(),r=o.scrollTop(),c=$(s).offset(),d=c.left,p=c.top;return{left:e.left+d-l,top:e.top+p-r}}}),i.zIndex=1024,i.current=null,i}),define("lib/components/dialog/1.0.0/dialog-config",[],{backdropBackground:"#000",backdropOpacity:.7,content:'<span class="ui-dialog-loading">Loading..</span>',title:"",statusbar:"",button:null,ok:null,okClassName:"ui-btns-ok",cancel:null,cancelClassName:"ui-btns-cancel",okValue:"ok",cancelValue:"cancel",cancelDisplay:!0,width:"",height:"",padding:"",skin:"",quickClose:!1,cssUri:"",innerHTML:'<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><span i="close" class="ui-dialog-close">&#215;</span><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="button" class="ui-dialog-button"></div></td></tr><tr><td i="footerSub" class="ui-dialog-footer"><div i="statusbar" class="ui-dialog-statusbar"></div></td></tr></table></div>'}),define("lib/components/minBar/1.0.1/minBar",[],function(t,a,e){function i(t){function a(){e(q),b(),f("#J_minBarPlugin"),n($(window).innerWidth()),$(window).resize(function(){n($(window).innerWidth())}),Q.each(function(t){var a=$(this);a.on("mouseover",function(t){a.find("span.text").stop(!0,!0).delay(300).animate({right:"40px",opacity:1},300)}).on("mouseleave",function(t){a.find("span.text").stop(!0,!0).animate({right:"-80px",opacity:.1},300)}).on("click",function(t){var e=a.find("a.blankLink").attr("href");try{(e.indexOf("http")>-1||e.indexOf("https")>-1)&&window.open(e)}catch(i){}})}),B.hover(function(){$("#J_minBarPlugin").stop(!0,!0).fadeIn(300),c()},function(){$("#J_minBarPlugin").stop(!0,!0).hide()}),J.on("mouseenter",function(t){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"140px",height:"164px",padding:"5px",top:"-40px",opacity:1},300)}).on("mouseleave",function(t){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),C.on("mouseenter",function(t){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"160px",height:"250px",top:"-80px",opacity:1},300)}).on("mouseleave",function(t){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),x.on("click",function(t){$("body,html").stop(!0,!0).animate({scrollTop:0},300)}),P.on("click",function(t){t.preventDefault(),L.fadeOut(300),clearTimeout(U),z?F||(F=!0,e(O)):(z=!0,e(D))}),j.hover(function(){L.stop(!0,!0).fadeIn(300),clearTimeout(U),z?F||(F=!0,e(O)):(z=!0,e(D))},function(){L.stop(!0,!0).fadeOut(300),clearTimeout(U),z?F||(F=!0,e(O)):(z=!0,e(D))}),A.on("click",function(t){L.fadeOut(300),clearTimeout(U),z?F||(F=!0,e(O)):(z=!0,e(D))}),$(document).on("click",".JQ_minBarDelete",function(t){t.preventDefault();var a=$(this).attr("data-id"),e=$(this).parents("li");$.ajax({url:cdnConfig.cartApiPath+"/delete/"+a,dataType:"jsonp",success:function(t){"succ"==t.status?(e.addClass("delItem"),e.fadeOut(300,function(){$(".delItem").remove(),d(),f("#J_minBarPlugin")})):(d(),f("#J_minBarPlugin"))}})})}function e(t){setTimeout(function(){L.fadeIn(200),i(5e3)},t)}function i(t){t=isNaN(t)?5e3:t,U=setTimeout(function(){L.fadeOut(200),z?F||(F=!0,e(O)):(z=!0,e(D))},t)}function n(t){isNaN(t)?t=$(window).innerWidth():t,I>t?(l(),o(),B.on("mouseenter",function(t){t.stopPropagation(),s(),r()}),j.on("mouseenter",function(t){t.stopPropagation(),s(),r()}),T.on("mouseenter",function(t){t.stopPropagation(),s(),r()}),x.on("mouseenter",function(t){t.stopPropagation(),s(),r()}),w.on("mouseleave",function(t){t.stopPropagation(),t.preventDefault(),o(),l()})):(r(),s())}function s(){E.stop(!0,!0).delay(300).animate({right:"0px"},300)}function o(){E.stop(!0,!0).delay(300).animate({right:"-40px"},300)}function l(){C.stop(!0,!0).animate({right:"-40px"}),J.stop(!0,!0).animate({right:"-40px"}),N.stop(!0,!0).animate({right:"-40px"})}function r(){C.stop(!0,!0).delay(300).animate({right:"0px"}),J.stop(!0,!0).delay(300).animate({right:"0px"}),N.stop(!0,!0).delay(300).animate({right:"0px"})}function c(){$.ajax({url:cdnConfig.apiPath+"/cart/minilist",dataType:"jsonp",success:function(t){var a="";if("200"==t.code){var e=t.data.list;if(e.length>0)for(var i=0;i<e.length;i++)a+="<li>",a+='<div class="plugin-cart-list-img">',a+='<a href="'+e[i].link+'" target="_blank">',a+='<img src="'+e[i].src+'" width="90" height="60" alt="'+e[i].title+'"/>',a+="</a>",a+="</div>",a+='<div class="plugin-cart-list-title">',a+='<a href="'+e[i].link+'" target="_blank" title="'+e[i].title+'">'+e[i].title+"</a>",a+="</div>",a+='<div class="plugin-cart-list-info">',a+='<p class="list-price">&yen; <span class="JQ_minCartItemPrice">'+e[i].price+"</span></p>",a+='<p class="list-num">x <span class="JQ_minCartItemNum">'+e[i].num+"</span></p>",a+='<input type="hidden" class="JQ_minCartItemTotal" value="'+e[i].price*e[i].num+'" />',a+="</div>",a+='<a class="cart-list-delete-btn JQ_minBarDelete" data-id="'+e[i].cart_id+'" href="javascript:void(0);" target="_blank">x</a>',a+="</li>",v(a,"no")}else a="<li>您的购物车空空的~</li>",v(a,"yes");d(),f("#J_minBarPlugin")},error:function(t){}})}function d(){m(".JQ_minCartItemTotal","#J_minBarCartTotal"),h(".JQ_minCartItemNum","#J_minBarCartNum"),u("#J_minBarBtn","#J_minBarCartNum")}function p(t,a){$(t).html(a)}function u(t,a){var e="http://cart.kinhom.com/list.html",i=$(a),n=$(t);parseInt(i.html())>0?n.removeClass("btn-gray").addClass("btn-orange").attr("href",e):n.removeClass("btn-orange").addClass("btn-gray").attr("href","javascript:void(0);")}function h(t,a){var e=$(a),i=0;if($(t).length>0)$(t).each(function(){i+=parseInt($(this).html())});else{var n="<li>您的购物车空空的~</li>";v(n,"yes"),u("#J_minBarBtn","#J_minBarCartNum")}e.html(i),p("#J_cartNum",i)}function m(t,a){var e=$(a),i=0;$(t).length>0?($(t).each(function(){i+=parseInt($(this).val())}),e.html(i)):e.html(0)}function f(t){var a=$(t),e=a.innerHeight();a.css({top:"50%","margin-top":"-"+parseInt(e/2)+"px"})}function v(t,a){switch(a){case"yes":$("#J_pluginCart").addClass("plugin-cart-empty").removeClass("plugin-cart-list").html(t);break;case"no":$("#J_pluginCart").removeClass("plugin-cart-empty").addClass("plugin-cart-list").html(t)}}function b(){$.ajax({url:cdnConfig.apiPath+"/cart/statistics",dataType:"jsonp",success:function(t){"succ"==t.status?p("#J_cartNum",t.data.num):p("#J_cartNum",0)},error:function(t){}})}var g=t.mainCell||"#J_minBar",_=t.tpl||function(){},k=t.tplName||"comment/tplMinBar",y=t.data||{};$("body").append(_(k,y));var w=g.indexOf("#")>-1?$(g):$("#"+g),x=w.find(".min-bar-gtop"),J=w.find(".min-wechat"),C=w.find(".min-phone"),N=w.find(".min-bar-feedback"),B=w.find(".min-cart"),T=w.find(".min-bar-qq"),j=w.find(".min-bar-online"),E=$(".min-bar-mark"),L=$(".min-bar-online-pop"),P=$(".pop-close"),A=$(".pop-chat"),I=1280,Q=w.find(".min-text"),z=!1,F=!1,q="30000",D="180000",O="180000";a();var U}e.exports=i}),!function(){function t(t,a){return(/string|function/.test(typeof a)?l:o)(t,a)}function a(t,e){return"string"!=typeof t&&(e=typeof t,"number"===e?t+="":t="function"===e?a(t.call(t)):""),t}function e(t){return p[t]}function i(t){return a(t).replace(/&(?![\w#]+;)|[<>"']/g,e)}function n(t,a){if(u(t))for(var e=0,i=t.length;i>e;e++)a.call(t,t[e],e,t);else for(e in t)a.call(t,t[e],e)}function s(t,a){var e=/(\/)[^/]+\1\.\.\1/,i=("./"+t).replace(/[^/]+$/,""),n=i+a;for(n=n.replace(/\/\.\//g,"/");n.match(e);)n=n.replace(e,"/");return n}function o(a,e){var i=t.get(a)||r({filename:a,name:"Render Error",message:"Template not found"});return e?i(e):i}function l(t,a){if("string"==typeof a){var e=a;a=function(){return new d(e)}}var i=c[t]=function(e){try{return new a(e,t)+""}catch(i){return r(i)()}};return i.prototype=a.prototype=h,i.toString=function(){return a+""},i}function r(t){var a="{Template Error}",e=t.stack||"";if(e)e=e.split("\n").slice(0,2).join("\n");else for(var i in t)e+="<"+i+">\n"+t[i]+"\n\n";return function(){return"object"==typeof console&&console.error(a+"\n\n"+e),a}}var c=t.cache={},d=this.String,p={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},u=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},h=t.utils={$helpers:{},$include:function(t,a,e){return t=s(e,t),o(t,a)},$string:a,$escape:i,$each:n},m=t.helpers=h.$helpers;t.get=function(t){return c[t.replace(/^\.\//,"")]},t.helper=function(t,a){m[t]=a},"function"==typeof define?define("lib/template/tempcomment",[],function(a,e,i){return t}):"undefined"!=typeof exports?module.exports=t:this.template=t,t("tplAddressForm",function(t,a){"use strict";var e=this,i=(e.$helpers,e.$escape),n=t.actionURL,s=t.addressID,o=t.userName,l=t.address,r=t.telephone,c=t.mobilephone,p=t.defaultAdd,u="";return u+='<form id="J_addressForm" action="',u+=i(n),u+='" method="post"> <input type="hidden" name="addressID" value="',u+=i(s),u+='"> <table id="J_add" class="person-address-add-table"> <tbody class="person-address"> <tr class="item"> <th class="address-add-head">收货人：</th> <td> <input id="J_userName" class="person-address-add-input" name="userName" value="',u+=i(o),u+='" /> <span class="fc-f60">*</span> </td> </tr> <tr class="item"> <th class="address-add-head">详细地址：</th> <td id="J_selectAddress"></td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <p> <input id="J_address" class="person-address-add-input detailed-address-input" name="address" placeholder="具体地址" value="',u+=i(l),u+='" /> <span class="fc-f60">*</span> </p> <p> <label class="person-address-add-tip">&nbsp;&nbsp;&nbsp;(不需要重复填写省/市/区)</label> </p> </td> </tr> <tr class="item"> <th class="address-add-head">固定电话：</th> <td> <input id="J_tel" class="person-address-add-input" name="tel" value="',u+=i(r),u+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（示例：020-88888888-999）</label> </td> </tr> <tr class="item"> <th class="address-add-head">手机：</th> <td> <input id="J_phone" class="person-address-add-input" name="phone" value="',u+=i(c),u+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（手机或固话必填一项）</label> </td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <div class="defult-address-choose"> ',u+="1"==p?' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-checked"></a> ':' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-normal"></a> ',u+=' <span class="address-font-gray">设为默认地址</span> <input type="hidden" name="setDefault" value="',u+=i(p),u+='" /> </div> </td> </tr> </tbody> </table> </form>',new d(u)}),t("tplBottomAd",function(t,a){"use strict";var e=this,i=(e.$helpers,t.link),n=e.$escape,s=t.linkURL,o=t.title,l=t.imgURL,r="";return r+='<div class="full-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=i&&(r+=n(i)),""!=s&&(r+=n(s)),r+='" target="_blank" title="',r+=n(o),r+='" style=" display:block; width:100%;min-height: 80px;background:url(',r+=n(l),r+=') center top no-repeat; "> <img src="',r+=n(l),r+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="full-ad-close" id="J_itemBottomAdClose"><span></span></a> </div> </div>',new d(r)}),t("tplEditPassForm",function(t,a){"use strict";var e=this,i=(e.$helpers,e.$escape),n=t.actionURL,s="";return s+='<form id="J_editPassForm" action="',s+=i(n),s+='" method="post"> <div class="fc-8c8">为了您的账户安全，请定期更换登录密码，并确保登录密码设置与提现密码不同。</div> <input type="hidden" name="form" value="form"> <div class="a-edit-pass-tr"> <p id="J_oldPass" class="edit-input-wrap"> <input type="password" name="old_passwd" placeholder="原密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_newPass" class="edit-input-wrap"> <input type="password" name="new_passwd" placeholder="输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_confirmNewPass" class="edit-input-wrap"> <input type="password" name="confirmNewPass" placeholder="再次输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> </form>',new d(s)}),t("tplFloatNav",'<div id="J_floatNav" class="float-nav"> <a href="http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=201143&jid=2104161973" class="float-nav-char-wrap JQ_floatNavNormal" target="_blank"> <span class="floag-online-chat">在线客服</span> <i class="icon-float-chat normal-icon"></i> </a> <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4006538038&aty=0&a=0&curl=&ty=1" class="float-nav-qq JQ_floatNavNormal" target="_blank"> <span>QQ客服</span> <i class="icon-float-qq normal-icon"></i> </a> <a href="http://cart.kinhom.com/list.html" class="float-nav-cart JQ_floatNavNormal" target="_blank"> <span>购物车</span> <i class="icon-float-cart normal-icon"></i> <i class="icon-cart-num num-icon">0</i> </a> <a href="javascript:void(0);" class="float-nav-wechat JQ_floatNavWechat"> <span> <img src="http://misc.jjcdn.com/p/images/float_wechat.png" width="40" height="40" /> </span> <i class="icon-float-wechat normal-icon"></i> </a> <a href="http://www.wenjuan.com/s/qU36f2/" target="_blank" class="float-nav-feedback JQ_floatNavNormal"> <span>意见反馈</span> <i class="icon-float-feedback normal-icon"></i> </a> <a id="J_floatGoTop" href="javascript:void(0);" class="float-nav-top JQ_floatNavNormal"> <span>返回顶部</span> <i class="icon-float-top normal-icon"></i> </a> </div>'),t("tplLoginDialog",'<div class="login-dialog"> <div class="login-dialog-form"> <form action="javascript:void(0);" method="post"> <p class="login-dialog-form-tr" id="J_loginUserName"> <label>用户名：</label> <input type="text" name="loginUserName" placeholder="输入用户名/邮箱/手机"> </p> <p class="login-dialog-form-tip"></p> <p class="login-dialog-form-tr" id="J_loginPassword"> <label>密&nbsp;&nbsp;&nbsp;码：</label> <input type="password" name="loginPassword" placeholder="输入密码"> </p> <p class="login-dialog-form-tip"></p> </form> </div> </div> '),t("tplMinBar",function(t,a){"use strict";var e=this,i=(e.$helpers,e.$escape),n=t.live800,s=t.cdnPath,o=t.wapQQ,l=t.cart,r=t.mobile,c=t.wechat,p=t.feedback,u=t.gotop,h="";return h+=' <section id="J_minBar" class="min-bar"> <div class="min-bar-tabs"> <div class="min-bar-tab min-bar-online"> <div class="min-bar-online-icon"> <a href="',h+=i(n.clientLink),h+='" class="blankLink JQ_minBarOnline" target="_blank"> <img src="',h+=i(s),h+=i(n.iconPath),h+='" width="',h+=i(n.iconWidth),h+='" height="',h+=i(n.iconHeight),h+='" alt="',h+=i(n.iconText),h+='"/> <label class="min-bar-chat-num">',h+=i(n.chatNum),h+='</label> </a> <span class="min-bar-online-pop"> <span class="pop-close">&nbsp;</span> <a href="',h+=i(n.clientLink),h+='" class="pop-chat" target="_blank">&nbsp;</a> </span> </div> </div> <div class="min-bar-tab min-bar-qq min-text"> <div class="min-bar-qq-icon"> <a href="',h+=i(o.clientLink),h+='" class="blankLink" target="_blank"> <img src="',h+=i(s),h+=i(o.iconPath),h+='" width="',h+=i(o.iconWidth),h+='" height="',h+=i(o.iconHeight),h+='" alt="',h+=i(o.iconText),h+='"/> </a> <span class="min-bar-qq-text text">',h+=i(o.iconText),h+='</span> </div> </div> <div class="min-bar-tab min-bar-cart min-cart"> <div class="min-bar-cart-icon"> <a href="',h+=i(l.clientLink),h+='" class="icon-float-cart"> <span id="J_cartNum" class="min-bar-cart-num">',h+=i(l.chatNum),h+='</span> </a> </div> <div id="J_minBarPlugin" class="min-bar-plugin"> <div class="bar-plugin-cart"> <ul id="J_pluginCart"> </ul> <div class="plugin-cart-info"> <p class="cart-info-price"> <span class="cart-info-num"> 共 <label id="J_minBarCartNum">0</label> 件商品 </span> <span class="cart-info-total"> 合计: <small>&yen;</small> <label id="J_minBarCartTotal">0</label> </span> </p> <p class="cart-info-shipping">(不含运费)</p> <p class="cart-info-btn"> <a href="javascript:void(0);" id="J_minBarBtn" class="btn-gray" target="_blank">查看购物车</a> </p> </div> </div> </div> </div> <div class="min-bar-tab min-bar-phone min-phone"> <div class="min-bar-phone-icon"> <a href="',h+=i(r.clientLink),h+='" class="icon-float-phone">&nbsp;</a> <span class="min-bar-phone-img phone"> <img src="',h+=i(s),h+=i(r.iconPath),h+='" width="',h+=i(r.iconWidth),h+='" height="',h+=i(r.iconHeight),h+='" alt="',h+=i(r.iconText),h+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-wechat min-wechat"> <div class="min-bar-wechat-icon"> <a href="',h+=i(c.clientLink),h+='" class="icon-float-wechat">&nbsp;</a> <span class="min-bar-wechat-img wechat"> <img src="',h+=i(s),h+=i(c.iconPath),h+='" width="',h+=i(c.iconWidth),h+='" height="',h+=i(c.iconHeight),h+='" alt="',h+=i(c.iconText),h+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-feedback min-text"> <div class="min-bar-feedback-icon"> <a href="',h+=i(p.clientLink),h+='" class="icon-float-feedback blankLink" target="_blank">&nbsp;</a> <span class="min-bar-feedback-text text">',
h+=i(p.iconText),h+='</span> </div> </div> <div class="min-bar-tab min-bar-gtop min-text"> <div class="min-bar-gtop-icon" id="J_minBarGoTop"> <a href="',h+=i(u.clientLink),h+='" class="icon-float-top">&nbsp;</a> <span class="min-bar-gtop-text text">',h+=i(u.iconText),h+='</span> </div> </div> </div> </section> <section class="min-bar-mark"></section> ',new d(h)}),t("tplSelectAddress",function(t,a){"use strict";var e=this,i=(e.$helpers,t.valCity),n=e.$escape,s=t.textPro,o=t.valPro,l=t.textCity,r=t.valArea,c=t.textArea,p="";return p+='<div id="J_selectProvience" class="select-gray fl"> <i class="select-corner icon-gray-left"></i> ',""==i?p+=' <label class="JQ_option select-option w90" data-value="0">请选择省</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=n(s),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_proList"></ul> <input type="hidden" name="valProvince" value="',p+=n(o),p+='" /> </div> <div class="select-gray fl JQ_addressCity"> <i class="select-corner icon-gray-left"></i> ',""==i?p+=' <label class="JQ_option select-option w90" data-value="0">请选择市</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=n(l),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_cityList"></ul> <input type="hidden" name="valCity" value="',p+=n(i),p+='" /> </div> <div class="select-gray fl JQ_addressArea"> <i class="select-corner icon-gray-left"></i> ',""==r?p+=' <label class="JQ_option select-option w90" data-value="0">请选择区</label> ':(p+=' <label class="JQ_option select-option w90" data-value="0">',p+=n(c),p+="</label> "),p+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_areaList"></ul> <input type="hidden" name="valArea" value="',p+=n(r),p+='" /> </div> ',new d(p)}),t("tplTopAd",function(t,a){"use strict";var e=this,i=(e.$helpers,t.link),n=e.$escape,s=t.linkURL,o=t.title,l=t.imgURL,r="";return r+='<div class="top-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=i&&(r+=n(i)),""!=s&&(r+=n(s)),r+='" target="_blank" title="',r+=n(o),r+='" style=" display:block; width:100%; min-height: 80px; background:url(',r+=n(l),r+=') center top no-repeat; "> <img src="',r+=n(l),r+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="index-top-ad-close" id="J_indexTopAdClose"> <span></span> </a> </div> </div>',new d(r)})}();