define("lib/active/ac201604",["lib/components/dialog/1.0.0/dialog","lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config","lib/components/loginDialog/1.0.0/loginDialog","lib/components/rotate/2.3.0/rotate","lib/template/tempcomment"],function(t,e,i){function a(){return"Microsoft Internet Explorer"==navigator.appName&&"MSIE6.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,"")?!0:"Microsoft Internet Explorer"==navigator.appName&&"MSIE7.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,"")?!0:"Microsoft Internet Explorer"==navigator.appName&&"MSIE8.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,"")?!0:void 0}function s(){this.txt="",this.setTxt=function(t){this.txt=t},this.dialog0=function(t,e){var i='<table class="lucky-dialog-content"><tr><th><i class="icon-face-smile-orange"></i></th><td><span class="msg-16">谢谢参与！祝您新年快乐！您还有<em class="sp">" + time + "</em>次抽奖机会!</span></td></tr></table>',a=new n({title:"提示",content:i,width:490,height:120,fixed:!0,button:[{value:"确定",id:"J_btnCj",className:"ui-btns-orange",callback:function(){a.close().remove(),d=1}}],onclose:function(){a.close().remove(),d=1}}).showModal()},this.dialog1=function(t,e){var i='<table class="lucky-dialog-content"><tr><th><i class="icon-face-smile-orange"></i></th><td><span class="msg-20">恭喜您获得<em class="sp">'+t+'</em>好礼！</span><span>领奖请咨询在线客服</span></td></tr></table><p class="tips">请务必马上截取中奖画面，凭此截图在活动期间到体验店现场领取奖品。</p>',a=new n({title:"提示",content:i,width:490,height:120,fixed:!0,button:[{value:"确定",id:"J_btnCj",className:"ui-btns-orange",callback:function(){d=1,a.close().remove()}}],onclose:function(){window.location.reload()}}).showModal()},this.dialog2=function(t,e){var i='<table class="lucky-dialog-content"><tr><th><i class="icon-face-smile-orange"></i></th><td><span class="msg-16">谢谢参与，'+t+"</span></td></tr></table>",a=new n({title:"提示",content:i,width:490,height:120,fixed:!0,button:[{value:"确定",id:"J_btnGo",className:"ui-btns-orange",callback:function(){d=1,a.close().remove()}}],onclose:function(){d=1}}).showModal()},this.dialog3=function(t,e){var i='<table class="lucky-dialog-content"><tr><th><i class="icon-face-smile-orange"></i></th><td><span class="msg-16">'+t+"</span></td></tr></table>",a=new n({title:"提示",content:i,width:490,height:90,fixed:!0,button:[{value:"确定",id:"J_btnCj",className:"ui-btns-orange",callback:function(){a.close().remove()}}]}).showModal();setTimeout(function(){a.close().remove()},1800)},this.dialog4=function(t,e){var i='<table class="lucky-dialog-content"><tr><th><i class="icon-face-smile-orange"></i></th><td><span class="msg-16">'+t+"</span></td></tr></table>",a=new n({title:"提示",content:i,width:400,height:120,fixed:!0,button:[{value:"确定",id:"J_btnGo",className:"ui-btns-orange",callback:function(){d=1,a.close().remove()}}],onclose:function(){d=1}}).showModal()},this.dialog5=function(t,e){var i='<table class="lucky-dialog-content"><tr><th><i class="icon-face-smile-orange"></i></th><td><span class="msg-16">'+t+"</span></td></tr></table>",a=new n({title:"提示",content:i,width:490,height:120,fixed:!0,button:[{value:"确定",id:"J_btnGo",className:"ui-btns-orange",callback:function(){window.open(e),a.close().remove()}}]}).showModal()}}var n=t("../components/dialog/1.0.0/dialog"),o=t("../components/loginDialog/1.0.0/loginDialog"),r=(t("../components/rotate/2.3.0/rotate"),t("../template/tempcomment"));$(function(){function t(t){var e=t.find("ul:first"),i=e.find("li:first").height();e.animate({"margin-top":-i+"px"},600,function(){e.css({"margin-top":"0px"}).find("li:first").appendTo(e)})}if(commonData.lotteryResult){for(var e=commonData.lotteryResult,i="",a=0;a<e.length;a++){var s=e[a].username,n=e[a].prize_name;i+='<li class="prize-item"><span class="prize-info">恭喜'+s+"抽中"+n+"一对</span></li>"}$(".lotteryResult .list").html(i);var o,r=$(".listWrap");r.hover(function(){clearInterval(o)},function(){o=setInterval(function(){t(r)},2e3)}).trigger("mouseout")}});var l=(commonData.piAlias,commonData.domain),c=1,d=1;$(function(){$("#J_start").on("click",function(){if(a())return void u.dialog3("请使用IE8+或其他的浏览器进行抽奖 ^_^");if(1==c)switch(d){case 0:break;case 1:d=0,$.ajax({url:"http://"+l+"/default/lotterymore?pi=ac201506&callback=_jquery",dataType:"jsonp",data:{setOff:"ok"},success:function(t){switch(t.status){case 1:var e=t.data.remainder,i=t.data.prize,a=t.data.name;switch(i){case 1:h(1,36,a,e);break;case 2:h(2,108,a,e);break;case 3:h(3,180,a,e);break;case 4:h(4,252,a,e);break;case 5:h(5,324,a,e)}break;case-1:d=1,o({cdnConfig:cdnConfig,tpl:r,dialog:n});break;case-2:u.dialog4(t.msg,0);break;case-3:u.dialog4(t.msg,0);break;case-4:u.dialog4(t.msg,0);break;case-5:u.dialog4(t.msg,0);break;case-6:u.dialog4(t.msg,0);break;case-7:u.dialog4(t.msg,0);break;case-8:u.dialog4(t.msg,0)}},error:function(){u.dialog3("很抱歉，后台数据出错哦……")}})}else o({cdnConfig:cdnConfig,tpl:r,dialog:n})})});var h=function(t,e,i,a){$("#img").css({"padding-bottom":"84px"}),$("#img").stopRotate(),$("#img").rotate({angle:36,duration:5e3,animateTo:e+1800,callback:function(){p.dialog1(i,a)}})},p=new s,u=new s}),define("lib/components/dialog/1.0.0/dialog",["lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config"],function(t,e,i){var a=t("./popup"),s=t("./dialog-config"),n=s.cssUri;if(n){var o=t[t.toUrl?"toUrl":"resolve"];o&&(n=o(n),n='<link rel="stylesheet" href="'+n+'" />',$("base")[0]?$("base").before(n):$("head").append(n))}var r=0,l=new Date-0,c=!("minWidth"in $("html")[0].style),d="createTouch"in document&&!("onmousemove"in document)||/(iPhone|iPad|iPod)/i.test(navigator.userAgent),h=!c&&!d,p=function(t,e,i){var a=t=t||{};("string"==typeof t||1===t.nodeType)&&(t={content:t,fixed:!d}),t=$.extend(!0,{},p.defaults,t),t.original=a;var s=t.id=t.id||l+r,n=p.get(s);return n?n.focus():(h||(t.fixed=!0),t.quickClose&&(t.modal=!0,t.backdropOpacity=0),$.isArray(t.button)||(t.button=[]),void 0!==i&&(t.cancel=i),t.cancel&&t.button.push({id:"cancel",className:t.cancelClassName,value:t.cancelValue,callback:t.cancel,display:t.cancelDisplay}),void 0!==e&&(t.ok=e),t.ok&&t.button.push({id:"ok",className:t.okClassName,value:t.okValue,callback:t.ok,autofocus:!0}),p.list[s]=new p.create(t))},u=function(){};u.prototype=a.prototype;var m=p.prototype=new u;return p.create=function(t){var e=this;$.extend(this,new a);var i=(t.original,$(this.node).html(t.innerHTML)),s=$(this.backdrop);return this.options=t,this._popup=i,$.each(t,function(t,i){"function"==typeof e[t]?e[t](i):e[t]=i}),t.zIndex&&(a.zIndex=t.zIndex),i.attr({"aria-labelledby":this._$("title").attr("id","title:"+this.id).attr("id"),"aria-describedby":this._$("content").attr("id","content:"+this.id).attr("id")}),this._$("close").css("display",this.cancel===!1?"none":"").on("click",function(t){e._trigger("cancel"),t.preventDefault()}),this._$("dialog").addClass(this.skin),this._$("body").css("padding",this.padding),t.quickClose&&s.on("onmousedown"in document?"mousedown":"click",function(){return e._trigger("cancel"),!1}),this.addEventListener("show",function(){s.css({opacity:0,background:t.backdropBackground}).animate({opacity:t.backdropOpacity},150)}),this._esc=function(t){var i=t.target,s=i.nodeName,n=/^input|textarea$/i,o=a.current===e,r=t.keyCode;!o||n.test(s)&&"button"!==i.type||27===r&&e._trigger("cancel")},$(document).on("keydown",this._esc),this.addEventListener("remove",function(){$(document).off("keydown",this._esc),delete p.list[this.id]}),r++,p.oncreate(this),this},p.create.prototype=m,$.extend(m,{content:function(t){var e=this._$("content");return"object"==typeof t?(t=$(t),e.empty("").append(t.show()),this.addEventListener("beforeremove",function(){$("body").append(t.hide())})):e.html(t),this.reset()},title:function(t){return this._$("title").text(t),this._$("header")[t?"show":"hide"](),this},width:function(t){return this._$("content").css("width",t),this.reset()},height:function(t){return this._$("content").css("height",t),this.reset()},button:function(t){t=t||[];var e=this,i="",a=0;return this.callbacks={},"string"==typeof t?(i=t,a++):$.each(t,function(t,s){var n=s.id=s.id||s.value,o="";e.callbacks[n]=s.callback,s.display===!1?o=' style="display:none"':a++,i+='<button type="button" i-id="'+n+'" class="'+(s.className?s.className:"ui-btns-nor")+'"'+o+(s.disabled?" disabled":"")+(s.autofocus?' autofocus class="ui-dialog-autofocus"':"")+">"+s.value+"</button>",e._$("button").on("click","[i-id="+n+"]",function(t){var i=$(this);i.attr("disabled")||e._trigger(n),t.preventDefault()})}),this._$("button").html(i),this._$("footer")[a?"show":"hide"](),this},statusbar:function(t){return this._$("statusbar").html(t)[t?"show":"hide"](),this},_$:function(t){return this._popup.find("[i="+t+"]")},_trigger:function(t){var e=this.callbacks[t];return"function"!=typeof e||e.call(this)!==!1?this.close().remove():this}}),p.oncreate=$.noop,p.getCurrent=function(){return a.current},p.get=function(t){return void 0===t?p.list:p.list[t]},p.list={},p.defaults=s,p}),define("lib/components/dialog/1.0.0/popup",[],function(t,e,i){function a(){this.destroyed=!1,this.__popup=$("<div />").css({display:"none",position:"absolute",outline:0}).attr("tabindex","-1").html(this.innerHTML).appendTo("body"),this.__backdrop=this.__mask=$("<div />").css({opacity:.7,background:"#000"}),this.node=this.__popup[0],this.backdrop=this.__backdrop[0],s++}var s=0,n=!("minWidth"in $("html")[0].style),o=!n;return $.extend(a.prototype,{node:null,backdrop:null,fixed:!1,destroyed:!0,open:!1,returnValue:"",autofocus:!0,align:"bottom left",innerHTML:"",className:"ui-popup",show:function(t){if(this.destroyed)return this;var e=this.__popup,i=this.__backdrop;if(this.__activeElement=this.__getActive(),this.open=!0,this.follow=t||this.follow,!this.__ready){if(e.addClass(this.className).attr("role",this.modal?"alertdialog":"dialog").css("position",this.fixed?"fixed":"absolute"),n||$(window).on("resize",$.proxy(this.reset,this)),this.modal){var s={position:"fixed",left:0,top:0,width:"100%",height:"100%",overflow:"hidden",userSelect:"none",zIndex:this.zIndex||a.zIndex};e.addClass(this.className+"-modal"),o||$.extend(s,{position:"absolute",width:$(window).width()+"px",height:$(document).height()+"px"}),i.css(s).attr({tabindex:"0"}).on("focus",$.proxy(this.focus,this)),this.__mask=i.clone(!0).attr("style","").insertAfter(e),i.addClass(this.className+"-backdrop").insertBefore(e),this.__ready=!0}e.html()||e.html(this.innerHTML)}return e.addClass(this.className+"-show").show(),i.show(),this.reset().focus(),this.__dispatchEvent("show"),this},showModal:function(){return this.modal=!0,this.show.apply(this,arguments)},close:function(t){return!this.destroyed&&this.open&&(void 0!==t&&(this.returnValue=t),this.__popup.hide().removeClass(this.className+"-show"),this.__backdrop.hide(),this.open=!1,this.blur(),this.__dispatchEvent("close")),this},remove:function(){if(this.destroyed)return this;this.__dispatchEvent("beforeremove"),a.current===this&&(a.current=null),this.__popup.remove(),this.__backdrop.remove(),this.__mask.remove(),n||$(window).off("resize",this.reset),this.__dispatchEvent("remove");for(var t in this)delete this[t];return this},reset:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("reset"),this},resize:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("resize"),this},focus:function(){var t=this.node,e=this.__popup,i=a.current,s=this.zIndex=a.zIndex++;if(i&&i!==this&&i.blur(!1),!$.contains(t,this.__getActive())){var n=e.find("[autofocus]")[0];!this._autofocus&&n?this._autofocus=!0:n=t,this.__focus(n)}return e.css("zIndex",s),a.current=this,e.addClass(this.className+"-focus"),this.__dispatchEvent("focus"),this},blur:function(){var t=this.__activeElement,e=arguments[0];return e!==!1&&this.__focus(t),this._autofocus=!1,this.__popup.removeClass(this.className+"-focus"),this.__dispatchEvent("blur"),this},addEventListener:function(t,e){return this.__getEventListener(t).push(e),this},removeEventListener:function(t,e){for(var i=this.__getEventListener(t),a=0;a<i.length;a++)e===i[a]&&i.splice(a--,1);return this},__getEventListener:function(t){var e=this.__listener;return e||(e=this.__listener={}),e[t]||(e[t]=[]),e[t]},__dispatchEvent:function(t){var e=this.__getEventListener(t);this["on"+t]&&this["on"+t]();for(var i=0;i<e.length;i++)e[i].call(this)},__focus:function(t){try{this.autofocus&&!/^iframe$/i.test(t.nodeName)&&t.focus()}catch(e){}},__getActive:function(){try{var t=document.activeElement,e=t.contentDocument,i=e&&e.activeElement||t;return i}catch(a){}},__center:function(){var t=this.__popup,e=$(window),i=$(document),a=this.fixed,s=a?0:i.scrollLeft(),n=a?0:i.scrollTop(),o=e.width(),r=e.innerHeight(),l=t.width(),c=t.height(),d=(o-l)/2,h=(r-c)/2,p=t[0].style;p.left=Math.max(parseInt(d),s)+"px",p.top=Math.max(parseInt(h),n)+"px"},__follow:function(t){var e=t.parentNode&&$(t),i=this.__popup;if(this.__followSkin&&i.removeClass(this.__followSkin),e){var a=e.offset();if(a.left*a.top<0)return this.__center()}var s=this,n=this.fixed,o=$(window),r=$(document),l=o.width(),c=o.height(),d=r.scrollLeft(),h=r.scrollTop(),p=i.width(),u=i.height(),m=e?e.outerWidth():0,f=e?e.outerHeight():0,g=this.__offset(t),_=g.left,v=g.top,b=n?_-d:_,w=n?v-h:v,y=n?0:d,k=n?0:h,x=y+l-p,N=k+c-u,J={},j=this.align.split(" "),E=this.className+"-",C={top:"bottom",bottom:"top",left:"right",right:"left"},T={top:"top",bottom:"top",left:"left",right:"left"},L=[{top:w-u,bottom:w+f,left:b-p,right:b+m},{top:w,bottom:w-u+f,left:b,right:b-p+m}],P={left:b+m/2-p/2,top:w+f/2-u/2},W={left:[y,x],top:[k,N]};$.each(j,function(t,e){L[t][e]>W[T[e]][1]&&(e=j[t]=C[e]),L[t][e]<W[T[e]][0]&&(j[t]=C[e])}),j[1]||(T[j[1]]="left"===T[j[0]]?"top":"left",L[1][j[1]]=P[T[j[1]]]),E+=j.join("-")+" "+this.className+"-follow",s.__followSkin=E,e&&i.addClass(E),J[T[j[0]]]=parseInt(L[0][j[0]]),J[T[j[1]]]=parseInt(L[1][j[1]]),i.css(J)},__offset:function(t){var e=t.parentNode,i=e?$(t).offset():{left:t.pageX,top:t.pageY};t=e?t:t.target;var a=t.ownerDocument,s=a.defaultView||a.parentWindow;if(s==window)return i;var n=s.frameElement,o=$(a),r=o.scrollLeft(),l=o.scrollTop(),c=$(n).offset(),d=c.left,h=c.top;return{left:i.left+d-r,top:i.top+h-l}}}),a.zIndex=1024,a.current=null,a}),define("lib/components/dialog/1.0.0/dialog-config",[],{backdropBackground:"#000",backdropOpacity:.7,content:'<span class="ui-dialog-loading">Loading..</span>',title:"",statusbar:"",button:null,ok:null,okClassName:"ui-btns-ok",cancel:null,cancelClassName:"ui-btns-cancel",okValue:"ok",cancelValue:"cancel",cancelDisplay:!0,width:"",height:"",padding:"",skin:"",quickClose:!1,cssUri:"",innerHTML:'<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><span i="close" class="ui-dialog-close">&#215;</span><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="button" class="ui-dialog-button"></div></td></tr><tr><td i="footerSub" class="ui-dialog-footer"><div i="statusbar" class="ui-dialog-statusbar"></div></td></tr></table></div>'}),define("lib/components/loginDialog/1.0.0/loginDialog",[],function(t,e,i){function a(t){function e(t,e){return t(e)}function i(){if(o("loginUserName","name")&&o("loginPassword","pass")){var t=$("input[name=loginUserName]").val(),i=$("input[name=loginPassword]").val();$.ajax({url:c,data:{username:t,password:i},dataType:"jsonp",success:function(t){"succ"==t.status&&n(t),e(d,t)},error:function(t){alert("网络错误,请重试!"),s("#J_loginMark"),e(d,t)}}),a(".login-dialog")}}function a(t){var e=$(t);e.append('<div id="J_loginMark" class="login-dialog-mark"><i class="login-dialog-loading"></i></div>')}function s(t){$(t).remove()}function n(t){var e=new h({width:200,height:40,fixed:!0});switch(t.sID){case"1":e.content('<p>&nbsp;</p><p class="tc fs-14 fc-333">'+t.msg+"</p>"),e.showModal(),setTimeout(function(){e.close().remove()},1e3),m.close().remove(),window.location.reload();break;case"2":s("#J_loginMark"),r("#J_loginUserName",t.msg,"no");break;case"3":s("#J_loginMark"),r("#J_loginUserName",t.msg,"no"),r("#J_loginPassword",t.msg,"no");break;case"4":m.close().remove(),window.location.reload();break;case"5":m.close().remove(),alert(t.msg)}}function o(t,e){var i="",a=$.trim($("input[name="+t+"]").val()),s="用户名";switch(e){case"name":s="用户名",i=a.indexOf("@")>-1?/^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/:isNaN(a)?/^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{2,20}$/g:/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/g;break;case"pass":s="密码",i=/^.*$/g}return""!=a?i.test(a)?(r("#J_"+t,"","ok"),!0):(r("#J_"+t,s+"格式有误!","no"),!1):(r("#J_"+t,"请输入"+s+"!","no"),!1)}function r(t,e,i){var a=$(t),s=a.children("input"),n=a.next("p.login-dialog-form-tip"),o=(t.split("_")[1],'<i class="icon-tip-wrong"></i>'+e);switch(i){case"ok":s.removeClass("error"),n.html("");break;case"no":s.addClass("error"),n.html(o)}s.on("focus",function(){s.removeClass("error"),n.html("")})}var l=t.pathConfig||{my:"http://my.kinhom.com"},c=t.url||"http://passport.kinhom.com/passport/login",d=t.callback||function(){},h=t.dialog||function(){},p=t.tpl||"",u=t.tplName||"tplLoginDialog",m=new h({title:"欢迎登录金海马商城",content:p(u),width:400,statusbar:'您还没有帐号，<A href="'+l.my+'/passport/register" target="_blank">立即注册</A> | <a href="'+l.my+'/passport/findpwd" target="_blank">忘记密码?</a>',fixed:!0,zIndex:10086,onclose:function(){e(d,"")},button:[{id:"ok",value:"登录",className:"ui-btns-orange",callback:function(){return i(),!1}}],innerHTML:'<div i="dialog" class="ui-login-dialog"><div class="ui-login-dialog-arrow-a"></div><div class="ui-login-dialog-arrow-b"></div><table class="ui-login-dialog-grid"><tr><td i="header" class="ui-login-dialog-header"><span i="close" class="ui-login-dialog-close">&#215;</span><div i="title" class="ui-login-dialog-title"></div></td></tr><tr><td i="body" class="ui-login-dialog-body"><div i="content" class="ui-login-dialog-content"></div></td></tr><tr><td i="footer" class="ui-login-dialog-footer"><div i="button" class="ui-login-dialog-button"></div></td></tr><tr><td i="footerSub" class="ui-login-dialog-footer"><div i="statusbar" class="ui-login-dialog-statusbar"></div></td></tr></table></div>'}).showModal();$("input[name=loginUserName]").blur(function(){o("loginUserName","name")}),$("input[name=loginPassword]").blur(function(){o("loginPassword","pass")}),$(document).on("keyup","input[name=loginUserName],input[name=loginPassword]",function(t){13==t.keyCode&&i()})}i.exports=a}),define("lib/components/rotate/2.3.0/rotate",[],function(require,exports,module){!function(k){for(var d,f,l=document.getElementsByTagName("head")[0].style,h=["transformProperty","WebkitTransform","OTransform","msTransform","MozTransform"],g=0;g<h.length;g++)void 0!==l[h[g]]&&(d=h[g]);d&&(f=d.replace(/[tT]ransform/,"TransformOrigin"),"T"==f[0]&&(f[0]="t")),eval('IE = "v"=="\x0B"'),jQuery.fn.extend({rotate:function(t){if(0!==this.length&&"undefined"!=typeof t){"number"==typeof t&&(t={angle:t});for(var e=[],i=0,a=this.length;a>i;i++){var s=this.get(i);if(s.Wilq32&&s.Wilq32.PhotoEffect)s.Wilq32.PhotoEffect._handleRotation(t);else{var n=k.extend(!0,{},t),s=new Wilq32.PhotoEffect(s,n)._rootObj;e.push(k(s))}}return e}},getRotateAngle:function(){for(var t=[],e=0,i=this.length;i>e;e++){var a=this.get(e);a.Wilq32&&a.Wilq32.PhotoEffect&&(t[e]=a.Wilq32.PhotoEffect._angle)}return t},stopRotate:function(){for(var t=0,e=this.length;e>t;t++){var i=this.get(t);i.Wilq32&&i.Wilq32.PhotoEffect&&clearTimeout(i.Wilq32.PhotoEffect._timer)}}}),Wilq32=window.Wilq32||{},Wilq32.PhotoEffect=function(){return d?function(t,e){t.Wilq32={PhotoEffect:this},this._img=this._rootObj=this._eventObj=t,this._handleRotation(e)}:function(t,e){if(this._img=t,this._onLoadDelegate=[e],this._rootObj=document.createElement("span"),this._rootObj.style.display="inline-block",this._rootObj.Wilq32={PhotoEffect:this},t.parentNode.insertBefore(this._rootObj,t),t.complete)this._Loader();else{var i=this;jQuery(this._img).bind("load",function(){i._Loader()})}}}(),Wilq32.PhotoEffect.prototype={_setupParameters:function(t){this._parameters=this._parameters||{},"number"!=typeof this._angle&&(this._angle=0),"number"==typeof t.angle&&(this._angle=t.angle),this._parameters.animateTo="number"==typeof t.animateTo?t.animateTo:this._angle,this._parameters.step=t.step||this._parameters.step||null,this._parameters.easing=t.easing||this._parameters.easing||this._defaultEasing,this._parameters.duration=t.duration||this._parameters.duration||1e3,this._parameters.callback=t.callback||this._parameters.callback||this._emptyFunction,this._parameters.center=t.center||this._parameters.center||["50%","50%"],this._rotationCenterX="string"==typeof this._parameters.center[0]?parseInt(this._parameters.center[0],10)/100*this._imgWidth*this._aspectW:this._parameters.center[0],this._rotationCenterY="string"==typeof this._parameters.center[1]?parseInt(this._parameters.center[1],10)/100*this._imgHeight*this._aspectH:this._parameters.center[1],t.bind&&t.bind!=this._parameters.bind&&this._BindEvents(t.bind)},_emptyFunction:function(){},_defaultEasing:function(t,e,i,a,s){return-a*((e=e/s-1)*e*e*e-1)+i},_handleRotation:function(t,e){d||this._img.complete||e?(this._setupParameters(t),this._angle==this._parameters.animateTo?this._rotate(this._angle):this._animateStart()):this._onLoadDelegate.push(t)},_BindEvents:function(t){if(t&&this._eventObj){if(this._parameters.bind){var e,i=this._parameters.bind;for(e in i)i.hasOwnProperty(e)&&jQuery(this._eventObj).unbind(e,i[e])}this._parameters.bind=t;for(e in t)t.hasOwnProperty(e)&&jQuery(this._eventObj).bind(e,t[e])}},_Loader:function(){return IE?function(){var t=this._img.width,e=this._img.height;for(this._imgWidth=t,this._imgHeight=e,this._img.parentNode.removeChild(this._img),this._vimage=this.createVMLNode("image"),this._vimage.src=this._img.src,this._vimage.style.height=e+"px",this._vimage.style.width=t+"px",this._vimage.style.position="absolute",this._vimage.style.top="0px",this._vimage.style.left="0px",this._aspectW=this._aspectH=1,this._container=this.createVMLNode("group"),this._container.style.width=t,this._container.style.height=e,this._container.style.position="absolute",this._container.style.top="0px",this._container.style.left="0px",this._container.setAttribute("coordsize",t-1+","+(e-1)),this._container.appendChild(this._vimage),this._rootObj.appendChild(this._container),this._rootObj.style.position="relative",this._rootObj.style.width=t+"px",this._rootObj.style.height=e+"px",this._rootObj.setAttribute("id",this._img.getAttribute("id")),this._rootObj.className=this._img.className,this._eventObj=this._rootObj;t=this._onLoadDelegate.shift();)this._handleRotation(t,!0)}:function(){this._rootObj.setAttribute("id",this._img.getAttribute("id")),this._rootObj.className=this._img.className,this._imgWidth=this._img.naturalWidth,this._imgHeight=this._img.naturalHeight;var t=Math.sqrt(this._imgHeight*this._imgHeight+this._imgWidth*this._imgWidth);for(this._width=3*t,this._height=3*t,this._aspectW=this._img.offsetWidth/this._img.naturalWidth,this._aspectH=this._img.offsetHeight/this._img.naturalHeight,this._img.parentNode.removeChild(this._img),this._canvas=document.createElement("canvas"),this._canvas.setAttribute("width",this._width),this._canvas.style.position="relative",this._canvas.style.left=-this._img.height*this._aspectW+"px",this._canvas.style.top=-this._img.width*this._aspectH+"px",this._canvas.Wilq32=this._rootObj.Wilq32,this._rootObj.appendChild(this._canvas),this._rootObj.style.width=this._img.width*this._aspectW+"px",this._rootObj.style.height=this._img.height*this._aspectH+"px",this._eventObj=this._canvas,this._cnv=this._canvas.getContext("2d");t=this._onLoadDelegate.shift();)this._handleRotation(t,!0)}}(),_animateStart:function(){this._timer&&clearTimeout(this._timer),this._animateStartTime=+new Date,this._animateStartAngle=this._angle,this._animate()},_animate:function(){var t=+new Date,e=t-this._animateStartTime>this._parameters.duration;if(e&&!this._parameters.animatedGif)clearTimeout(this._timer);else{(this._canvas||this._vimage||this._img)&&(t=this._parameters.easing(0,t-this._animateStartTime,this._animateStartAngle,this._parameters.animateTo-this._animateStartAngle,this._parameters.duration),this._rotate(~~(10*t)/10)),this._parameters.step&&this._parameters.step(this._angle);var i=this;this._timer=setTimeout(function(){i._animate.call(i)},10)}this._parameters.callback&&e&&(this._angle=this._parameters.animateTo,this._rotate(this._angle),this._parameters.callback.call(this._rootObj))},_rotate:function(){var t=Math.PI/180;return IE?function(t){this._angle=t,this._container.style.rotation=t%360+"deg",this._vimage.style.top=-(this._rotationCenterY-this._imgHeight/2)+"px",this._vimage.style.left=-(this._rotationCenterX-this._imgWidth/2)+"px",this._container.style.top=this._rotationCenterY-this._imgHeight/2+"px",this._container.style.left=this._rotationCenterX-this._imgWidth/2+"px"}:d?function(t){this._angle=t,this._img.style[d]="rotate("+t%360+"deg)",this._img.style[f]=this._parameters.center.join(" ")}:function(e){this._angle=e,e=e%360*t,this._canvas.width=this._width,this._canvas.height=this._height,this._cnv.translate(this._imgWidth*this._aspectW,this._imgHeight*this._aspectH),this._cnv.translate(this._rotationCenterX,this._rotationCenterY),this._cnv.rotate(e),this._cnv.translate(-this._rotationCenterX,-this._rotationCenterY),this._cnv.scale(this._aspectW,this._aspectH),this._cnv.drawImage(this._img,0,0)}}()},IE&&(Wilq32.PhotoEffect.prototype.createVMLNode=function(){document.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{return!document.namespaces.rvml&&document.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<rvml:"+t+' class="rvml">')}}catch(t){return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}}())}(jQuery)}),!function(){function t(t,e){return(/string|function/.test(typeof e)?r:o)(t,e)}function e(t,i){return"string"!=typeof t&&(i=typeof t,"number"===i?t+="":t="function"===i?e(t.call(t)):""),t}function i(t){return h[t]}function a(t){return e(t).replace(/&(?![\w#]+;)|[<>"']/g,i)}function s(t,e){if(p(t))for(var i=0,a=t.length;a>i;i++)e.call(t,t[i],i,t);else for(i in t)e.call(t,t[i],i)}function n(t,e){var i=/(\/)[^/]+\1\.\.\1/,a=("./"+t).replace(/[^/]+$/,""),s=a+e;for(s=s.replace(/\/\.\//g,"/");s.match(i);)s=s.replace(i,"/");return s}function o(e,i){var a=t.get(e)||l({filename:e,name:"Render Error",message:"Template not found"});return i?a(i):a}function r(t,e){if("string"==typeof e){var i=e;e=function(){return new d(i)}}var a=c[t]=function(i){try{return new e(i,t)+""}catch(a){return l(a)()}};return a.prototype=e.prototype=u,a.toString=function(){return e+""},a}function l(t){var e="{Template Error}",i=t.stack||"";if(i)i=i.split("\n").slice(0,2).join("\n");else for(var a in t)i+="<"+a+">\n"+t[a]+"\n\n";return function(){return"object"==typeof console&&console.error(e+"\n\n"+i),e}}var c=t.cache={},d=this.String,h={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},p=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},u=t.utils={$helpers:{},$include:function(t,e,i){return t=n(i,t),o(t,e)},$string:e,$escape:a,$each:s},m=t.helpers=u.$helpers;t.get=function(t){return c[t.replace(/^\.\//,"")]},t.helper=function(t,e){m[t]=e},"function"==typeof define?define("lib/template/tempcomment",[],function(e,i,a){return t}):"undefined"!=typeof exports?module.exports=t:this.template=t,t("tplAddressForm",function(t,e){"use strict";var i=this,a=(i.$helpers,i.$escape),s=t.actionURL,n=t.addressID,o=t.userName,r=t.address,l=t.telephone,c=t.mobilephone,h=t.defaultAdd,p="";return p+='<form id="J_addressForm" action="',p+=a(s),p+='" method="post"> <input type="hidden" name="addressID" value="',p+=a(n),p+='"> <table id="J_add" class="person-address-add-table"> <tbody class="person-address"> <tr class="item"> <th class="address-add-head">收货人：</th> <td> <input id="J_userName" class="person-address-add-input" name="userName" value="',p+=a(o),p+='" /> <span class="fc-f60">*</span> </td> </tr> <tr class="item"> <th class="address-add-head">详细地址：</th> <td id="J_selectAddress"></td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <p> <input id="J_address" class="person-address-add-input detailed-address-input" name="address" placeholder="具体地址" value="',p+=a(r),p+='" /> <span class="fc-f60">*</span> </p> <p> <label class="person-address-add-tip">&nbsp;&nbsp;&nbsp;(不需要重复填写省/市/区)</label> </p> </td> </tr> <tr class="item"> <th class="address-add-head">固定电话：</th> <td> <input id="J_tel" class="person-address-add-input" name="tel" value="',p+=a(l),p+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（示例：020-88888888-999）</label> </td> </tr> <tr class="item"> <th class="address-add-head">手机：</th> <td> <input id="J_phone" class="person-address-add-input" name="phone" value="',p+=a(c),p+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（手机或固话必填一项）</label> </td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <div class="defult-address-choose"> ',p+="1"==h?' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-checked"></a> ':' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-normal"></a> ',p+=' <span class="address-font-gray">设为默认地址</span> <input type="hidden" name="setDefault" value="',p+=a(h),p+='" /> </div> </td> </tr> </tbody> </table> </form>',new d(p)}),t("tplBottomAd",function(t,e){"use strict";var i=this,a=(i.$helpers,t.link),s=i.$escape,n=t.linkURL,o=t.title,r=t.imgURL,l="";return l+='<div class="full-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=a&&(l+=s(a)),""!=n&&(l+=s(n)),l+='" target="_blank" title="',l+=s(o),l+='" style=" display:block; width:100%;min-height: 80px;background:url(',l+=s(r),l+=') center top no-repeat; "> <img src="',l+=s(r),l+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="full-ad-close" id="J_itemBottomAdClose"><span></span></a> </div> </div>',new d(l)}),t("tplEditPassForm",function(t,e){"use strict";var i=this,a=(i.$helpers,i.$escape),s=t.actionURL,n="";return n+='<form id="J_editPassForm" action="',n+=a(s),n+='" method="post"> <div class="fc-8c8">为了您的账户安全，请定期更换登录密码，并确保登录密码设置与提现密码不同。</div> <input type="hidden" name="form" value="form"> <div class="a-edit-pass-tr"> <p id="J_oldPass" class="edit-input-wrap"> <input type="password" name="old_passwd" placeholder="原密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_newPass" class="edit-input-wrap"> <input type="password" name="new_passwd" placeholder="输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_confirmNewPass" class="edit-input-wrap"> <input type="password" name="confirmNewPass" placeholder="再次输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> </form>',new d(n)}),t("tplFloatNav",'<div id="J_floatNav" class="float-nav"> <a href="http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=201143&jid=2104161973" class="float-nav-char-wrap JQ_floatNavNormal" target="_blank"> <span class="floag-online-chat">在线客服</span> <i class="icon-float-chat normal-icon"></i> </a> <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4006538038&aty=0&a=0&curl=&ty=1" class="float-nav-qq JQ_floatNavNormal" target="_blank"> <span>QQ客服</span> <i class="icon-float-qq normal-icon"></i> </a> <a href="http://cart.kinhom.com/list.html" class="float-nav-cart JQ_floatNavNormal" target="_blank"> <span>购物车</span> <i class="icon-float-cart normal-icon"></i> <i class="icon-cart-num num-icon">0</i> </a> <a href="javascript:void(0);" class="float-nav-wechat JQ_floatNavWechat"> <span> <img src="http://misc.jjcdn.com/p/images/float_wechat.png" width="40" height="40" /> </span> <i class="icon-float-wechat normal-icon"></i> </a> <a href="http://www.wenjuan.com/s/qU36f2/" target="_blank" class="float-nav-feedback JQ_floatNavNormal"> <span>意见反馈</span> <i class="icon-float-feedback normal-icon"></i> </a> <a id="J_floatGoTop" href="javascript:void(0);" class="float-nav-top JQ_floatNavNormal"> <span>返回顶部</span> <i class="icon-float-top normal-icon"></i> </a> </div>'),
t("tplLoginDialog",'<div class="login-dialog"> <div class="login-dialog-form"> <form action="javascript:void(0);" method="post"> <p class="login-dialog-form-tr" id="J_loginUserName"> <label>用户名：</label> <input type="text" name="loginUserName" placeholder="输入用户名/邮箱/手机"> </p> <p class="login-dialog-form-tip"></p> <p class="login-dialog-form-tr" id="J_loginPassword"> <label>密&nbsp;&nbsp;&nbsp;码：</label> <input type="password" name="loginPassword" placeholder="输入密码"> </p> <p class="login-dialog-form-tip"></p> </form> </div> </div> '),t("tplMinBar",function(t,e){"use strict";var i=this,a=(i.$helpers,i.$escape),s=t.live800,n=t.cdnPath,o=t.wapQQ,r=t.cart,l=t.mobile,c=t.wechat,h=t.feedback,p=t.gotop,u="";return u+=' <section id="J_minBar" class="min-bar"> <div class="min-bar-tabs"> <div class="min-bar-tab min-bar-online"> <div class="min-bar-online-icon"> <a href="',u+=a(s.clientLink),u+='" class="blankLink JQ_minBarOnline" target="_blank"> <img src="',u+=a(n),u+=a(s.iconPath),u+='" width="',u+=a(s.iconWidth),u+='" height="',u+=a(s.iconHeight),u+='" alt="',u+=a(s.iconText),u+='"/> <label class="min-bar-chat-num">',u+=a(s.chatNum),u+='</label> </a> <span class="min-bar-online-pop"> <span class="pop-close">&nbsp;</span> <a href="',u+=a(s.clientLink),u+='" class="pop-chat" target="_blank">&nbsp;</a> </span> </div> </div> <div class="min-bar-tab min-bar-qq min-text"> <div class="min-bar-qq-icon"> <a href="',u+=a(o.clientLink),u+='" class="blankLink" target="_blank"> <img src="',u+=a(n),u+=a(o.iconPath),u+='" width="',u+=a(o.iconWidth),u+='" height="',u+=a(o.iconHeight),u+='" alt="',u+=a(o.iconText),u+='"/> </a> <span class="min-bar-qq-text text">',u+=a(o.iconText),u+='</span> </div> </div> <div class="min-bar-tab min-bar-cart min-cart"> <div class="min-bar-cart-icon"> <a href="',u+=a(r.clientLink),u+='" class="icon-float-cart"> <span id="J_cartNum" class="min-bar-cart-num">',u+=a(r.chatNum),u+='</span> </a> </div> <div id="J_minBarPlugin" class="min-bar-plugin"> <div class="bar-plugin-cart"> <ul id="J_pluginCart"> </ul> <div class="plugin-cart-info"> <p class="cart-info-price"> <span class="cart-info-num"> 共 <label id="J_minBarCartNum">0</label> 件商品 </span> <span class="cart-info-total"> 合计: <small>&yen;</small> <label id="J_minBarCartTotal">0</label> </span> </p> <p class="cart-info-shipping">(不含运费)</p> <p class="cart-info-btn"> <a href="javascript:void(0);" id="J_minBarBtn" class="btn-gray" target="_blank">查看购物车</a> </p> </div> </div> </div> </div> <div class="min-bar-tab min-bar-phone min-phone"> <div class="min-bar-phone-icon"> <a href="',u+=a(l.clientLink),u+='" class="icon-float-phone">&nbsp;</a> <span class="min-bar-phone-img phone"> <img src="',u+=a(n),u+=a(l.iconPath),u+='" width="',u+=a(l.iconWidth),u+='" height="',u+=a(l.iconHeight),u+='" alt="',u+=a(l.iconText),u+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-wechat min-wechat"> <div class="min-bar-wechat-icon"> <a href="',u+=a(c.clientLink),u+='" class="icon-float-wechat">&nbsp;</a> <span class="min-bar-wechat-img wechat"> <img src="',u+=a(n),u+=a(c.iconPath),u+='" width="',u+=a(c.iconWidth),u+='" height="',u+=a(c.iconHeight),u+='" alt="',u+=a(c.iconText),u+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-feedback min-text"> <div class="min-bar-feedback-icon"> <a href="',u+=a(h.clientLink),u+='" class="icon-float-feedback blankLink" target="_blank">&nbsp;</a> <span class="min-bar-feedback-text text">',u+=a(h.iconText),u+='</span> </div> </div> <div class="min-bar-tab min-bar-gtop min-text"> <div class="min-bar-gtop-icon" id="J_minBarGoTop"> <a href="',u+=a(p.clientLink),u+='" class="icon-float-top">&nbsp;</a> <span class="min-bar-gtop-text text">',u+=a(p.iconText),u+='</span> </div> </div> </div> </section> <section class="min-bar-mark"></section> ',new d(u)}),t("tplSelectAddress",function(t,e){"use strict";var i=this,a=(i.$helpers,t.valCity),s=i.$escape,n=t.textPro,o=t.valPro,r=t.textCity,l=t.valArea,c=t.textArea,h="";return h+='<div id="J_selectProvience" class="select-gray fl"> <i class="select-corner icon-gray-left"></i> ',""==a?h+=' <label class="JQ_option select-option w90" data-value="0">请选择省</label> ':(h+=' <label class="JQ_option select-option w90" data-value="0">',h+=s(n),h+="</label> "),h+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_proList"></ul> <input type="hidden" name="valProvince" value="',h+=s(o),h+='" /> </div> <div class="select-gray fl JQ_addressCity"> <i class="select-corner icon-gray-left"></i> ',""==a?h+=' <label class="JQ_option select-option w90" data-value="0">请选择市</label> ':(h+=' <label class="JQ_option select-option w90" data-value="0">',h+=s(r),h+="</label> "),h+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_cityList"></ul> <input type="hidden" name="valCity" value="',h+=s(a),h+='" /> </div> <div class="select-gray fl JQ_addressArea"> <i class="select-corner icon-gray-left"></i> ',""==l?h+=' <label class="JQ_option select-option w90" data-value="0">请选择区</label> ':(h+=' <label class="JQ_option select-option w90" data-value="0">',h+=s(c),h+="</label> "),h+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_areaList"></ul> <input type="hidden" name="valArea" value="',h+=s(l),h+='" /> </div> ',new d(h)}),t("tplTopAd",function(t,e){"use strict";var i=this,a=(i.$helpers,t.link),s=i.$escape,n=t.linkURL,o=t.title,r=t.imgURL,l="";return l+='<div class="top-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=a&&(l+=s(a)),""!=n&&(l+=s(n)),l+='" target="_blank" title="',l+=s(o),l+='" style=" display:block; width:100%; min-height: 80px; background:url(',l+=s(r),l+=') center top no-repeat; "> <img src="',l+=s(r),l+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="index-top-ad-close" id="J_indexTopAdClose"> <span></span> </a> </div> </div>',new d(l)})}();