define("libpage.0.0/rebate-center-diy-share",["lib/components/dialog/1.0.0/dialog","lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config","lib/components/qrcode/1.0.0/qrcode"],function(t,e,i){t("../../components/dialog/1.0.0/dialog"),t("../../components/qrcode/1.0.0/qrcode");document.getElementById("J_clubAside").innerHTML=document.getElementById("J_templateClubAside").innerHTML;var o=$("#J_shareHref").html(),r=$("#J_shareText").html();$(".JQ_share").each(function(){var t=parseInt($(this).attr("data-for"));switch(t){case 0:shareUrl="http://connect.qq.com/widget/shareqq/index.html?title=返现赚钱&url="+o+"&desc="+r,$(this).find("a").attr("href",shareUrl);break;case 1:shareUrl="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+o+"&desc="+r,$(this).find("a").attr("href",shareUrl);break;case 2:shareUrl="http://v.t.sina.com.cn/share/share.php?url="+o+"&title="+r,$(this).find("a").attr("href",shareUrl);break;case 3:shareUrl="http://v.t.qq.com/share/share.php?url="+o+"&title="+r,$(this).find("a").attr("href",shareUrl);break;case 4:shareUrl="http://www.douban.com/recommend/?url="+o+"&title="+r,$(this).find("a").attr("href",shareUrl);break;case 5:shareUrl="http://share.renren.com/share/buttonshare.do?link="+o+"&title="+r,$(this).find("a").attr("href",shareUrl)}});var n="canvas";navigator.appVersion.indexOf("Trident")>-1&&(n="table"),$("#J_shareQrcode").qrcode({render:n,width:154,height:154,text:$("#J_shareHref").html()})}),define("lib/components/dialog/1.0.0/dialog",["lib/components/dialog/1.0.0/popup","lib/components/dialog/1.0.0/dialog-config"],function(t,e,i){var o=t("./popup"),r=t("./dialog-config"),n=r.cssUri;if(n){var s=t[t.toUrl?"toUrl":"resolve"];s&&(n=s(n),n='<link rel="stylesheet" href="'+n+'" />',$("base")[0]?$("base").before(n):$("head").append(n))}var a=0,h=new Date-0,l=!("minWidth"in $("html")[0].style),u="createTouch"in document&&!("onmousemove"in document)||/(iPhone|iPad|iPod)/i.test(navigator.userAgent),c=!l&&!u,d=function(t,e,i){var o=t=t||{};"string"!=typeof t&&1!==t.nodeType||(t={content:t,fixed:!u}),t=$.extend(!0,{},d.defaults,t),t.original=o;var r=t.id=t.id||h+a,n=d.get(r);return n?n.focus():(c||(t.fixed=!0),t.quickClose&&(t.modal=!0,t.backdropOpacity=0),$.isArray(t.button)||(t.button=[]),void 0!==i&&(t.cancel=i),t.cancel&&t.button.push({id:"cancel",className:t.cancelClassName,value:t.cancelValue,callback:t.cancel,display:t.cancelDisplay}),void 0!==e&&(t.ok=e),t.ok&&t.button.push({id:"ok",className:t.okClassName,value:t.okValue,callback:t.ok,autofocus:!0}),d.list[r]=new d.create(t))},f=function(){};f.prototype=o.prototype;var g=d.prototype=new f;return d.create=function(t){var e=this;$.extend(this,new o);var i=(t.original,$(this.node).html(t.innerHTML)),r=$(this.backdrop);return this.options=t,this._popup=i,$.each(t,function(t,i){"function"==typeof e[t]?e[t](i):e[t]=i}),t.zIndex&&(o.zIndex=t.zIndex),i.attr({"aria-labelledby":this._$("title").attr("id","title:"+this.id).attr("id"),"aria-describedby":this._$("content").attr("id","content:"+this.id).attr("id")}),this._$("close").css("display",this.cancel===!1?"none":"").on("click",function(t){e._trigger("cancel"),t.preventDefault()}),this._$("dialog").addClass(this.skin),this._$("body").css("padding",this.padding),t.quickClose&&r.on("onmousedown"in document?"mousedown":"click",function(){return e._trigger("cancel"),!1}),this.addEventListener("show",function(){r.css({opacity:0,background:t.backdropBackground}).animate({opacity:t.backdropOpacity},150)}),this._esc=function(t){var i=t.target,r=i.nodeName,n=/^input|textarea$/i,s=o.current===e,a=t.keyCode;!s||n.test(r)&&"button"!==i.type||27===a&&e._trigger("cancel")},$(document).on("keydown",this._esc),this.addEventListener("remove",function(){$(document).off("keydown",this._esc),delete d.list[this.id]}),a++,d.oncreate(this),this},d.create.prototype=g,$.extend(g,{content:function(t){var e=this._$("content");return"object"==typeof t?(t=$(t),e.empty("").append(t.show()),this.addEventListener("beforeremove",function(){$("body").append(t.hide())})):e.html(t),this.reset()},title:function(t){return this._$("title").text(t),this._$("header")[t?"show":"hide"](),this},width:function(t){return this._$("content").css("width",t),this.reset()},height:function(t){return this._$("content").css("height",t),this.reset()},button:function(t){t=t||[];var e=this,i="",o=0;return this.callbacks={},"string"==typeof t?(i=t,o++):$.each(t,function(t,r){var n=r.id=r.id||r.value,s="";e.callbacks[n]=r.callback,r.display===!1?s=' style="display:none"':o++,i+='<button type="button" i-id="'+n+'" class="'+(r.className?r.className:"ui-btns-nor")+'"'+s+(r.disabled?" disabled":"")+(r.autofocus?' autofocus class="ui-dialog-autofocus"':"")+">"+r.value+"</button>",e._$("button").on("click","[i-id="+n+"]",function(t){var i=$(this);i.attr("disabled")||e._trigger(n),t.preventDefault()})}),this._$("button").html(i),this._$("footer")[o?"show":"hide"](),this},statusbar:function(t){return this._$("statusbar").html(t)[t?"show":"hide"](),this},_$:function(t){return this._popup.find("[i="+t+"]")},_trigger:function(t){var e=this.callbacks[t];return"function"!=typeof e||e.call(this)!==!1?this.close().remove():this}}),d.oncreate=$.noop,d.getCurrent=function(){return o.current},d.get=function(t){return void 0===t?d.list:d.list[t]},d.list={},d.defaults=r,d}),define("lib/components/dialog/1.0.0/popup",[],function(t,e,i){function o(){this.destroyed=!1,this.__popup=$("<div />").css({display:"none",position:"absolute",outline:0}).attr("tabindex","-1").html(this.innerHTML).appendTo("body"),this.__backdrop=this.__mask=$("<div />").css({opacity:.7,background:"#000"}),this.node=this.__popup[0],this.backdrop=this.__backdrop[0],r++}var r=0,n=!("minWidth"in $("html")[0].style),s=!n;return $.extend(o.prototype,{node:null,backdrop:null,fixed:!1,destroyed:!0,open:!1,returnValue:"",autofocus:!0,align:"bottom left",innerHTML:"",className:"ui-popup",show:function(t){if(this.destroyed)return this;var e=this.__popup,i=this.__backdrop;if(this.__activeElement=this.__getActive(),this.open=!0,this.follow=t||this.follow,!this.__ready){if(e.addClass(this.className).attr("role",this.modal?"alertdialog":"dialog").css("position",this.fixed?"fixed":"absolute"),n||$(window).on("resize",$.proxy(this.reset,this)),this.modal){var r={position:"fixed",left:0,top:0,width:"100%",height:"100%",overflow:"hidden",userSelect:"none",zIndex:this.zIndex||o.zIndex};e.addClass(this.className+"-modal"),s||$.extend(r,{position:"absolute",width:$(window).width()+"px",height:$(document).height()+"px"}),i.css(r).attr({tabindex:"0"}).on("focus",$.proxy(this.focus,this)),this.__mask=i.clone(!0).attr("style","").insertAfter(e),i.addClass(this.className+"-backdrop").insertBefore(e),this.__ready=!0}e.html()||e.html(this.innerHTML)}return e.addClass(this.className+"-show").show(),i.show(),this.reset().focus(),this.__dispatchEvent("show"),this},showModal:function(){return this.modal=!0,this.show.apply(this,arguments)},close:function(t){return!this.destroyed&&this.open&&(void 0!==t&&(this.returnValue=t),this.__popup.hide().removeClass(this.className+"-show"),this.__backdrop.hide(),this.open=!1,this.blur(),this.__dispatchEvent("close")),this},remove:function(){if(this.destroyed)return this;this.__dispatchEvent("beforeremove"),o.current===this&&(o.current=null),this.__popup.remove(),this.__backdrop.remove(),this.__mask.remove(),n||$(window).off("resize",this.reset),this.__dispatchEvent("remove");for(var t in this)delete this[t];return this},reset:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("reset"),this},resize:function(){var t=this.follow;return t?this.__follow(t):this.__center(),this.__dispatchEvent("resize"),this},focus:function(){var t=this.node,e=this.__popup,i=o.current,r=this.zIndex=o.zIndex++;if(i&&i!==this&&i.blur(!1),!$.contains(t,this.__getActive())){var n=e.find("[autofocus]")[0];!this._autofocus&&n?this._autofocus=!0:n=t,this.__focus(n)}return e.css("zIndex",r),o.current=this,e.addClass(this.className+"-focus"),this.__dispatchEvent("focus"),this},blur:function(){var t=this.__activeElement,e=arguments[0];return e!==!1&&this.__focus(t),this._autofocus=!1,this.__popup.removeClass(this.className+"-focus"),this.__dispatchEvent("blur"),this},addEventListener:function(t,e){return this.__getEventListener(t).push(e),this},removeEventListener:function(t,e){for(var i=this.__getEventListener(t),o=0;o<i.length;o++)e===i[o]&&i.splice(o--,1);return this},__getEventListener:function(t){var e=this.__listener;return e||(e=this.__listener={}),e[t]||(e[t]=[]),e[t]},__dispatchEvent:function(t){var e=this.__getEventListener(t);this["on"+t]&&this["on"+t]();for(var i=0;i<e.length;i++)e[i].call(this)},__focus:function(t){try{this.autofocus&&!/^iframe$/i.test(t.nodeName)&&t.focus()}catch(e){}},__getActive:function(){try{var t=document.activeElement,e=t.contentDocument,i=e&&e.activeElement||t;return i}catch(o){}},__center:function(){var t=this.__popup,e=$(window),i=$(document),o=this.fixed,r=o?0:i.scrollLeft(),n=o?0:i.scrollTop(),s=e.width(),a=e.innerHeight(),h=t.width(),l=t.height(),u=(s-h)/2,c=(a-l)/2,d=t[0].style;d.left=Math.max(parseInt(u),r)+"px",d.top=Math.max(parseInt(c),n)+"px"},__follow:function(t){var e=t.parentNode&&$(t),i=this.__popup;if(this.__followSkin&&i.removeClass(this.__followSkin),e){var o=e.offset();if(o.left*o.top<0)return this.__center()}var r=this,n=this.fixed,s=$(window),a=$(document),h=s.width(),l=s.height(),u=a.scrollLeft(),c=a.scrollTop(),d=i.width(),f=i.height(),g=e?e.outerWidth():0,p=e?e.outerHeight():0,m=this.__offset(t),v=m.left,_=m.top,b=n?v-u:v,k=n?_-c:_,y=n?0:u,w=n?0:c,C=y+h-d,L=w+l-f,E={},B=this.align.split(" "),T=this.className+"-",x={top:"bottom",bottom:"top",left:"right",right:"left"},D={top:"top",bottom:"top",left:"left",right:"left"},A=[{top:k-f,bottom:k+p,left:b-d,right:b+g},{top:k,bottom:k-f+p,left:b,right:b-d+g}],P={left:b+g/2-d/2,top:k+p/2-f/2},M={left:[y,C],top:[w,L]};$.each(B,function(t,e){A[t][e]>M[D[e]][1]&&(e=B[t]=x[e]),A[t][e]<M[D[e]][0]&&(B[t]=x[e])}),B[1]||(D[B[1]]="left"===D[B[0]]?"top":"left",A[1][B[1]]=P[D[B[1]]]),T+=B.join("-")+" "+this.className+"-follow",r.__followSkin=T,e&&i.addClass(T),E[D[B[0]]]=parseInt(A[0][B[0]]),E[D[B[1]]]=parseInt(A[1][B[1]]),i.css(E)},__offset:function(t){var e=t.parentNode,i=e?$(t).offset():{left:t.pageX,top:t.pageY};t=e?t:t.target;var o=t.ownerDocument,r=o.defaultView||o.parentWindow;if(r==window)return i;var n=r.frameElement,s=$(o),a=s.scrollLeft(),h=s.scrollTop(),l=$(n).offset(),u=l.left,c=l.top;return{left:i.left+u-a,top:i.top+c-h}}}),o.zIndex=1024,o.current=null,o}),define("lib/components/dialog/1.0.0/dialog-config",[],{backdropBackground:"#000",backdropOpacity:.7,content:'<span class="ui-dialog-loading">Loading..</span>',title:"",statusbar:"",button:null,ok:null,okClassName:"ui-btns-ok",cancel:null,cancelClassName:"ui-btns-cancel",okValue:"ok",cancelValue:"cancel",cancelDisplay:!0,width:"",height:"",padding:"",skin:"",quickClose:!1,cssUri:"",innerHTML:'<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><span i="close" class="ui-dialog-close">&#215;</span><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="button" class="ui-dialog-button"></div></td></tr><tr><td i="footerSub" class="ui-dialog-footer"><div i="statusbar" class="ui-dialog-statusbar"></div></td></tr></table></div>'}),define("lib/components/qrcode/1.0.0/qrcode",[],function(t,e,i){!function(t){t.fn.qrcode=function(e){function i(t){this.mode=a,this.data=t}function o(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function r(t,e){if(void 0==t.length)throw Error(t.length+"/"+e);for(var i=0;i<t.length&&0==t[i];)i++;this.num=Array(t.length-i+e);for(var o=0;o<t.length-i;o++)this.num[o]=t[o+i]}function n(t,e){this.totalCount=t,this.dataCount=e}function s(){this.buffer=[],this.length=0}var a;i.prototype={getLength:function(){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},o.prototype={addData:function(t){this.dataList.push(new i(t)),this.dataCache=null},isDark:function(t,e){if(0>t||this.moduleCount<=t||0>e||this.moduleCount<=e)throw Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){for(var t=1,t=1;40>t;t++){for(var e=n.getRSBlocks(t,this.errorCorrectLevel),i=new s,o=0,r=0;r<e.length;r++)o+=e[r].dataCount;for(r=0;r<this.dataList.length;r++)e=this.dataList[r],i.put(e.mode,4),i.put(e.getLength(),h.getLengthInBits(e.mode,t)),e.write(i);if(i.getLengthInBits()<=8*o)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=Array(this.moduleCount);for(var i=0;i<this.moduleCount;i++){this.modules[i]=Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++)this.modules[i][r]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),7<=this.typeNumber&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var i=-1;7>=i;i++)if(!(-1>=t+i||this.moduleCount<=t+i))for(var o=-1;7>=o;o++)-1>=e+o||this.moduleCount<=e+o||(this.modules[t+i][e+o]=i>=0&&6>=i&&(0==o||6==o)||o>=0&&6>=o&&(0==i||6==i)||i>=2&&4>=i&&o>=2&&4>=o)},getBestMaskPattern:function(){for(var t=0,e=0,i=0;8>i;i++){this.makeImpl(!0,i);var o=h.getLostPoint(this);(0==i||t>o)&&(t=o,e=i)}return e},createMovieClip:function(t,e,i){for(t=t.createEmptyMovieClip(e,i),this.make(),e=0;e<this.modules.length;e++)for(var i=1*e,o=0;o<this.modules[e].length;o++){var r=1*o;this.modules[e][o]&&(t.beginFill(0,100),t.moveTo(r,i),t.lineTo(r+1,i),t.lineTo(r+1,i+1),t.lineTo(r,i+1),t.endFill())}return t},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=0==t%2);for(t=8;t<this.moduleCount-8;t++)null==this.modules[6][t]&&(this.modules[6][t]=0==t%2)},setupPositionAdjustPattern:function(){for(var t=h.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var i=0;i<t.length;i++){var o=t[e],r=t[i];if(null==this.modules[o][r])for(var n=-2;2>=n;n++)for(var s=-2;2>=s;s++)this.modules[o+n][r+s]=-2==n||2==n||-2==s||2==s||0==n&&0==s}},setupTypeNumber:function(t){for(var e=h.getBCHTypeNumber(this.typeNumber),i=0;18>i;i++){var o=!t&&1==(e>>i&1);this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=o}for(i=0;18>i;i++)o=!t&&1==(e>>i&1),this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=o},setupTypeInfo:function(t,e){for(var i=h.getBCHTypeInfo(this.errorCorrectLevel<<3|e),o=0;15>o;o++){var r=!t&&1==(i>>o&1);6>o?this.modules[o][8]=r:8>o?this.modules[o+1][8]=r:this.modules[this.moduleCount-15+o][8]=r}for(o=0;15>o;o++)r=!t&&1==(i>>o&1),8>o?this.modules[8][this.moduleCount-o-1]=r:9>o?this.modules[8][15-o-1+1]=r:this.modules[8][15-o-1]=r;this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var i=-1,o=this.moduleCount-1,r=7,n=0,s=this.moduleCount-1;s>0;s-=2)for(6==s&&s--;;){for(var a=0;2>a;a++)if(null==this.modules[o][s-a]){var l=!1;n<t.length&&(l=1==(t[n]>>>r&1)),h.getMask(e,o,s-a)&&(l=!l),this.modules[o][s-a]=l,r--,-1==r&&(n++,r=7)}if(o+=i,0>o||this.moduleCount<=o){o-=i,i=-i;break}}}},o.PAD0=236,o.PAD1=17,o.createData=function(t,e,i){for(var e=n.getRSBlocks(t,e),r=new s,a=0;a<i.length;a++){var l=i[a];r.put(l.mode,4),r.put(l.getLength(),h.getLengthInBits(l.mode,t)),l.write(r)}for(a=t=0;a<e.length;a++)t+=e[a].dataCount;if(r.getLengthInBits()>8*t)throw Error("code length overflow. ("+r.getLengthInBits()+">"+8*t+")");for(r.getLengthInBits()+4<=8*t&&r.put(0,4);0!=r.getLengthInBits()%8;)r.putBit(!1);for(;!(r.getLengthInBits()>=8*t)&&(r.put(o.PAD0,8),!(r.getLengthInBits()>=8*t));)r.put(o.PAD1,8);return o.createBytes(r,e)},o.createBytes=function(t,e){for(var i=0,o=0,n=0,s=Array(e.length),a=Array(e.length),l=0;l<e.length;l++){var u=e[l].dataCount,c=e[l].totalCount-u,o=Math.max(o,u),n=Math.max(n,c);s[l]=Array(u);for(var d=0;d<s[l].length;d++)s[l][d]=255&t.buffer[d+i];for(i+=u,d=h.getErrorCorrectPolynomial(c),u=new r(s[l],d.getLength()-1).mod(d),a[l]=Array(d.getLength()-1),d=0;d<a[l].length;d++)c=d+u.getLength()-a[l].length,a[l][d]=c>=0?u.get(c):0}for(d=l=0;d<e.length;d++)l+=e[d].totalCount;for(i=Array(l),d=u=0;o>d;d++)for(l=0;l<e.length;l++)d<s[l].length&&(i[u++]=s[l][d]);for(d=0;n>d;d++)for(l=0;l<e.length;l++)d<a[l].length&&(i[u++]=a[l][d]);return i},a=4;for(var h={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;0<=h.getBCHDigit(e)-h.getBCHDigit(h.G15);)e^=h.G15<<h.getBCHDigit(e)-h.getBCHDigit(h.G15);return(t<<10|e)^h.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;0<=h.getBCHDigit(e)-h.getBCHDigit(h.G18);)e^=h.G18<<h.getBCHDigit(e)-h.getBCHDigit(h.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return h.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,i){switch(t){case 0:return 0==(e+i)%2;case 1:return 0==e%2;case 2:return 0==i%3;case 3:return 0==(e+i)%3;case 4:return 0==(Math.floor(e/2)+Math.floor(i/3))%2;case 5:return 0==e*i%2+e*i%3;case 6:return 0==(e*i%2+e*i%3)%2;case 7:return 0==(e*i%3+(e+i)%2)%2;default:throw Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new r([1],0),i=0;t>i;i++)e=e.multiply(new r([1,l.gexp(i)],0));return e},getLengthInBits:function(t,e){if(e>=1&&10>e)switch(t){case 1:return 10;case 2:return 9;case a:return 8;case 8:return 8;default:throw Error("mode:"+t)}else if(27>e)switch(t){case 1:return 12;case 2:return 11;case a:return 16;case 8:return 10;default:throw Error("mode:"+t)}else{if(!(41>e))throw Error("type:"+e);switch(t){case 1:return 14;case 2:return 13;case a:return 16;case 8:return 12;default:throw Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),i=0,o=0;e>o;o++)for(var r=0;e>r;r++){for(var n=0,s=t.isDark(o,r),a=-1;1>=a;a++)if(!(0>o+a||o+a>=e))for(var h=-1;1>=h;h++)0>r+h||r+h>=e||0==a&&0==h||s==t.isDark(o+a,r+h)&&n++;n>5&&(i+=3+n-5)}for(o=0;e-1>o;o++)for(r=0;e-1>r;r++)n=0,t.isDark(o,r)&&n++,t.isDark(o+1,r)&&n++,t.isDark(o,r+1)&&n++,t.isDark(o+1,r+1)&&n++,(0==n||4==n)&&(i+=3);for(o=0;e>o;o++)for(r=0;e-6>r;r++)t.isDark(o,r)&&!t.isDark(o,r+1)&&t.isDark(o,r+2)&&t.isDark(o,r+3)&&t.isDark(o,r+4)&&!t.isDark(o,r+5)&&t.isDark(o,r+6)&&(i+=40);for(r=0;e>r;r++)for(o=0;e-6>o;o++)t.isDark(o,r)&&!t.isDark(o+1,r)&&t.isDark(o+2,r)&&t.isDark(o+3,r)&&t.isDark(o+4,r)&&!t.isDark(o+5,r)&&t.isDark(o+6,r)&&(i+=40);for(r=n=0;e>r;r++)for(o=0;e>o;o++)t.isDark(o,r)&&n++;return t=Math.abs(100*n/e/e-50)/5,i+10*t}},l={glog:function(t){if(1>t)throw Error("glog("+t+")");return l.LOG_TABLE[t]},gexp:function(t){for(;0>t;)t+=255;for(;t>=256;)t-=255;return l.EXP_TABLE[t]},EXP_TABLE:Array(256),LOG_TABLE:Array(256)},u=0;8>u;u++)l.EXP_TABLE[u]=1<<u;for(u=8;256>u;u++)l.EXP_TABLE[u]=l.EXP_TABLE[u-4]^l.EXP_TABLE[u-5]^l.EXP_TABLE[u-6]^l.EXP_TABLE[u-8];for(u=0;255>u;u++)l.LOG_TABLE[l.EXP_TABLE[u]]=u;return r.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=Array(this.getLength()+t.getLength()-1),i=0;i<this.getLength();i++)for(var o=0;o<t.getLength();o++)e[i+o]^=l.gexp(l.glog(this.get(i))+l.glog(t.get(o)));return new r(e,0)},mod:function(t){if(0>this.getLength()-t.getLength())return this;for(var e=l.glog(this.get(0))-l.glog(t.get(0)),i=Array(this.getLength()),o=0;o<this.getLength();o++)i[o]=this.get(o);for(o=0;o<t.getLength();o++)i[o]^=l.gexp(l.glog(t.get(o))+e);return new r(i,0).mod(t)}},n.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],n.getRSBlocks=function(t,e){var i=n.getRsBlockTable(t,e);if(void 0==i)throw Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var o=i.length/3,r=[],s=0;o>s;s++)for(var a=i[3*s+0],h=i[3*s+1],l=i[3*s+2],u=0;a>u;u++)r.push(new n(h,l));return r},n.getRsBlockTable=function(t,e){switch(e){case 1:return n.RS_BLOCK_TABLE[4*(t-1)+0];case 0:return n.RS_BLOCK_TABLE[4*(t-1)+1];case 3:return n.RS_BLOCK_TABLE[4*(t-1)+2];case 2:return n.RS_BLOCK_TABLE[4*(t-1)+3]}},s.prototype={get:function(t){return 1==(this.buffer[Math.floor(t/8)]>>>7-t%8&1)},put:function(t,e){for(var i=0;e>i;i++)this.putBit(1==(t>>>e-i-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},"string"==typeof e&&(e={text:e}),e=t.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,correctLevel:2,background:"#ffffff",foreground:"#000000"},e),this.each(function(){var i;if("canvas"==e.render){i=new o(e.typeNumber,e.correctLevel),i.addData(e.text),i.make();var r=document.createElement("canvas");r.width=e.width,r.height=e.height;for(var n=r.getContext("2d"),s=e.width/i.getModuleCount(),a=e.height/i.getModuleCount(),h=0;h<i.getModuleCount();h++)for(var l=0;l<i.getModuleCount();l++){n.fillStyle=i.isDark(h,l)?e.foreground:e.background;var u=Math.ceil((l+1)*s)-Math.floor(l*s),c=Math.ceil((h+1)*s)-Math.floor(h*s);n.fillRect(Math.round(l*s),Math.round(h*a),u,c)}}else for(i=new o(e.typeNumber,e.correctLevel),i.addData(e.text),i.make(),r=t("<table></table>").css("width",e.width+"px").css("height",e.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",e.background),n=e.width/i.getModuleCount(),s=e.height/i.getModuleCount(),a=0;a<i.getModuleCount();a++)for(h=t("<tr></tr>").css("height",s+"px").appendTo(r),l=0;l<i.getModuleCount();l++)t("<td></td>").css("width",n+"px").css("background-color",i.isDark(a,l)?e.foreground:e.background).appendTo(h);i=r,jQuery(i).appendTo(this)})}}(jQuery)});