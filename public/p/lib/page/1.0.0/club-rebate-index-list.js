define("libpage.0.0/club-rebate-index-list",["lib/components/slider/1.0.0/slider","lib/components/khSelect/1.0.0/khSelect","lib/template/tempcomment","lib/components/minBar/1.0.1/minBar"],function(t,e,a){function n(){var t=window.location.href,e=$(".club-rebate-filler-warp"),a=e.offset().top;t.indexOf("tiao")>-1&&$("html,body").stop().animate({scrollTop:a},300)}function i(t,e){function a(t){if("number"==o)i.html(t);else{var e=parseInt(t).toFixed(2);i.html(e)}}var t=t||{},n=t.dom||null,i=$(n),s=t.speed||1e3,l=t.tarNum||i.attr("data-value")||100,e=e||null,o=t.type||"number",r=i.html(),c=0,p=0;c=parseInt(l/s),p=10*c;var d=setInterval(function(){l>r?(r=parseInt(r)+p,r>=l?a(l):i.html(r)):(u(),clearInterval(d))},1),u=function(){$.isFunction(e)&&e(n)}}var s=(t("../../components/slider/1.0.0/slider"),t("../../components/khSelect/1.0.0/khSelect")),l=t("../../template/tempcomment"),o=t("../../components/minBar/1.0.1/minBar");document.getElementById("J_clubNav").innerHTML=document.getElementById("J_templateClubNav").innerHTML,document.getElementById("J_clubAside").innerHTML=document.getElementById("J_templateClubAside").innerHTML,o({mainCell:"#J_minBar",pathConfig:cdnConfig,tpl:l,tplName:"tplMinBar",data:_globalConfig.minBar.data}),n(),$(".club-rebate-mouse").html(""),$("#J_fullSlider").slide({mainCell:".bd ul",titCell:".hd ul",autoPage:!0,autoPlay:!0,vis:1,effect:"left"}),i({dom:"#J_peopleMount",speed:1500}),i({dom:"#J_moneyMount",speed:1500,type:"money"}),$(".JQ_fillterBtn").on("click",function(){$(this).parents("form").submit()}),s({mainCell:"#J_selectStyle"}),s({mainCell:"#J_selectRebatePer"}),s({mainCell:"#J_selectPointsPer"})}),define("lib/components/slider/1.0.0/slider",[],function(t,e,a){!function(t){t.fn.slide=function(e){return t.fn.slide.defaults={type:"slide",effect:"fade",autoPlay:!1,delayTime:500,interTime:2500,triggerTime:150,defaultIndex:0,titCell:".hd li",mainCell:".bd",targetCell:null,trigger:"mouseover",scroll:1,vis:1,titOnClassName:"on",autoPage:!1,prevCell:".prev",nextCell:".next",pageStateCell:".pageState",opp:!1,pnLoop:!0,easing:"swing",startFun:null,endFun:null,switchLoad:null,playStateCell:".playState",mouseOverStop:!0,defaultPlay:!0,returnDefault:!1},this.each(function(){var a,n=t.extend({},t.fn.slide.defaults,e),i=t(this),s=n.effect,l=t(n.prevCell,i),o=t(n.nextCell,i),r=t(n.pageStateCell,i),c=t(n.playStateCell,i),p=t(n.titCell,i),d=p.size(),u=t(n.mainCell,i),f=u.children().size(),m=n.switchLoad,h=t(n.targetCell,i),v=parseInt(n.defaultIndex),g=parseInt(n.delayTime),b=parseInt(n.interTime),y=(parseInt(n.triggerTime),parseInt(n.scroll)),w=parseInt(n.vis),_="false"!=n.autoPlay&&0!=n.autoPlay,k="false"!=n.opp&&0!=n.opp,x="false"!=n.autoPage&&0!=n.autoPage,J="false"!=n.pnLoop&&0!=n.pnLoop,C="false"!=n.mouseOverStop&&0!=n.mouseOverStop,$="false"!=n.defaultPlay&&0!=n.defaultPlay,I="false"!=n.returnDefault&&0!=n.returnDefault,P=0,T=0,B=0,M=0,Q=n.easing,j=null,O=null,N=null,q=n.titOnClassName,L=p.index(i.find("."+q)),S=v=-1==L?v:L,D=v,A=v,F=f>=w?f%y!=0?f%y:y:0,U="leftMarquee"==s||"topMarquee"==s,E=function(){t.isFunction(n.startFun)&&n.startFun(v,d,i,t(n.titCell,i),u,h,l,o)},W=function(){t.isFunction(n.endFun)&&n.endFun(v,d,i,t(n.titCell,i),u,h,l,o)},H=function(){p.removeClass(q),$&&p.eq(D).addClass(q)};if("menu"==n.type)return $&&p.removeClass(q).eq(v).addClass(q),p.hover(function(){a=t(this).find(n.targetCell);var e=p.index(t(this));O=setTimeout(function(){switch(v=e,p.removeClass(q).eq(v).addClass(q),E(),s){case"fade":a.stop(!0,!0).animate({opacity:"show"},g,Q,W);break;case"slideDown":a.stop(!0,!0).animate({height:"show"},g,Q,W)}},n.triggerTime)},function(){switch(clearTimeout(O),s){case"fade":a.animate({opacity:"hide"},g,Q);break;case"slideDown":a.animate({height:"hide"},g,Q)}}),void(I&&i.hover(function(){clearTimeout(N)},function(){N=setTimeout(H,g)}));if(0==d&&(d=f),U&&(d=2),x){if(f>=w)if("leftLoop"==s||"topLoop"==s)d=f%y!=0?(f/y^0)+1:f/y;else{var R=f-w;d=1+parseInt(R%y!=0?R/y+1:R/y),0>=d&&(d=1)}else d=1;p.html("");var z="";if(1==n.autoPage||"true"==n.autoPage)for(var G=0;d>G;G++)z+="<li>"+(G+1)+"</li>";else for(var G=0;d>G;G++)z+=n.autoPage.replace("$",G+1);p.html(z);var p=p.children()}if(f>=w){u.children().each(function(){t(this).width()>B&&(B=t(this).width(),T=t(this).outerWidth(!0)),t(this).height()>M&&(M=t(this).height(),P=t(this).outerHeight(!0))});var K=u.children(),V=function(){for(var t=0;w>t;t++)K.eq(t).clone().addClass("clone").appendTo(u);for(var t=0;F>t;t++)K.eq(f-t-1).clone().addClass("clone").prependTo(u)};switch(s){case"fold":u.css({position:"relative",width:T,height:P}).children().css({position:"absolute",width:B,left:0,top:0,display:"none"});break;case"top":u.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+w*P+'px"></div>').css({top:-(v*y)*P,position:"relative",padding:"0",margin:"0"}).children().css({height:M});break;case"left":u.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+w*T+'px"></div>').css({width:f*T,left:-(v*y)*T,position:"relative",overflow:"hidden",padding:"0",margin:"0"}).children().css({"float":"left",width:B});break;case"leftLoop":case"leftMarquee":V(),u.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+w*T+'px"></div>').css({width:(f+w+F)*T,position:"relative",overflow:"hidden",padding:"0",margin:"0",left:-(F+v*y)*T}).children().css({"float":"left",width:B});break;case"topLoop":case"topMarquee":V(),u.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+w*P+'px"></div>').css({height:(f+w+F)*P,position:"relative",padding:"0",margin:"0",top:-(F+v*y)*P}).children().css({height:M})}}var X=function(t){var e=t*y;return t==d?e=f:-1==t&&f%y!=0&&(e=-f%y),e},Y=function(e){var a=function(a){for(var n=a;w+a>n;n++)e.eq(n).find("img["+m+"]").each(function(){var e=t(this);if(e.attr("src",e.attr(m)).removeAttr(m),u.find(".clone")[0])for(var a=u.children(),n=0;n<a.size();n++)a.eq(n).find("img["+m+"]").each(function(){t(this).attr(m)==e.attr("src")&&t(this).attr("src",t(this).attr(m)).removeAttr(m)})})};switch(s){case"fade":case"fold":case"top":case"left":case"slideDown":a(v*y);break;case"leftLoop":case"topLoop":a(F+X(A));break;case"leftMarquee":case"topMarquee":var n="leftMarquee"==s?u.css("left").replace("px",""):u.css("top").replace("px",""),i="leftMarquee"==s?T:P,l=F;if(n%i!=0){var o=Math.abs(n/i^0);l=1==v?F+o:F+o-1}a(l)}},Z=function(t){if(!$||S!=v||t||U){if(U?v>=1?v=1:0>=v&&(v=0):(A=v,v>=d?v=0:0>v&&(v=d-1)),E(),null!=m&&Y(u.children()),h[0]&&(a=h.eq(v),null!=m&&Y(h),"slideDown"==s?(h.not(a).stop(!0,!0).slideUp(g),a.slideDown(g,Q,function(){u[0]||W()})):(h.not(a).stop(!0,!0).hide(),a.animate({opacity:"show"},g,function(){u[0]||W()}))),f>=w)switch(s){case"fade":u.children().stop(!0,!0).eq(v).animate({opacity:"show"},g,Q,function(){W()}).siblings().hide();break;case"fold":u.children().stop(!0,!0).eq(v).animate({opacity:"show"},g,Q,function(){W()}).siblings().animate({opacity:"hide"},g,Q);break;case"top":u.stop(!0,!1).animate({top:-v*y*P},g,Q,function(){W()});break;case"left":u.stop(!0,!1).animate({left:-v*y*T},g,Q,function(){W()});break;case"leftLoop":var e=A;u.stop(!0,!0).animate({left:-(X(A)+F)*T},g,Q,function(){-1>=e?u.css("left",-(F+(d-1)*y)*T):e>=d&&u.css("left",-F*T),W()});break;case"topLoop":var e=A;u.stop(!0,!0).animate({top:-(X(A)+F)*P},g,Q,function(){-1>=e?u.css("top",-(F+(d-1)*y)*P):e>=d&&u.css("top",-F*P),W()});break;case"leftMarquee":var n=u.css("left").replace("px","");0==v?u.animate({left:++n},0,function(){u.css("left").replace("px","")>=0&&u.css("left",-f*T)}):u.animate({left:--n},0,function(){u.css("left").replace("px","")<=-(f+F)*T&&u.css("left",-F*T)});break;case"topMarquee":var i=u.css("top").replace("px","");0==v?u.animate({top:++i},0,function(){u.css("top").replace("px","")>=0&&u.css("top",-f*P)}):u.animate({top:--i},0,function(){u.css("top").replace("px","")<=-(f+F)*P&&u.css("top",-F*P)})}p.removeClass(q).eq(v).addClass(q),S=v,J||(o.removeClass("nextStop"),l.removeClass("prevStop"),0==v&&l.addClass("prevStop"),v==d-1&&o.addClass("nextStop")),r.html("<span>"+(v+1)+"</span>/"+d)}};$&&Z(!0),I&&i.hover(function(){clearTimeout(N)},function(){N=setTimeout(function(){v=D,$?Z():"slideDown"==s?a.slideUp(g,H):a.animate({opacity:"hide"},g,H),S=v},300)});var tt=function(t){j=setInterval(function(){k?v--:v++,Z()},t?t:b)},et=function(t){j=setInterval(Z,t?t:b)},at=function(){C||(clearInterval(j),tt())},nt=function(){(J||v!=d-1)&&(v++,Z(),U||at())},it=function(){(J||0!=v)&&(v--,Z(),U||at())},st=function(){clearInterval(j),U?et():tt(),c.removeClass("pauseState")},lt=function(){clearInterval(j),c.addClass("pauseState")};if(_?U?(k?v--:v++,et(),C&&u.hover(lt,st)):(tt(),C&&i.hover(lt,st)):(U&&(k?v--:v++),c.addClass("pauseState")),c.click(function(){c.hasClass("pauseState")?st():lt()}),"mouseover"==n.trigger?p.hover(function(){var t=p.index(this);O=setTimeout(function(){v=t,Z(),at()},n.triggerTime)},function(){clearTimeout(O)}):p.click(function(){v=p.index(this),Z(),at()}),U){if(o.mousedown(nt),l.mousedown(it),J){var ot,rt=function(){ot=setTimeout(function(){clearInterval(j),et(b/10^0)},150)},ct=function(){clearTimeout(ot),clearInterval(j),et()};o.mousedown(rt),o.mouseup(ct),l.mousedown(rt),l.mouseup(ct)}"mouseover"==n.trigger&&(o.hover(nt,function(){}),l.hover(it,function(){}))}else o.click(nt),l.click(it)})}}(jQuery),jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(t,e,a,n,i){return jQuery.easing[jQuery.easing.def](t,e,a,n,i)},easeInQuad:function(t,e,a,n,i){return n*(e/=i)*e+a},easeOutQuad:function(t,e,a,n,i){return-n*(e/=i)*(e-2)+a},easeInOutQuad:function(t,e,a,n,i){return(e/=i/2)<1?n/2*e*e+a:-n/2*(--e*(e-2)-1)+a},easeInCubic:function(t,e,a,n,i){return n*(e/=i)*e*e+a},easeOutCubic:function(t,e,a,n,i){return n*((e=e/i-1)*e*e+1)+a},easeInOutCubic:function(t,e,a,n,i){return(e/=i/2)<1?n/2*e*e*e+a:n/2*((e-=2)*e*e+2)+a},easeInQuart:function(t,e,a,n,i){return n*(e/=i)*e*e*e+a},easeOutQuart:function(t,e,a,n,i){return-n*((e=e/i-1)*e*e*e-1)+a},easeInOutQuart:function(t,e,a,n,i){return(e/=i/2)<1?n/2*e*e*e*e+a:-n/2*((e-=2)*e*e*e-2)+a},easeInQuint:function(t,e,a,n,i){return n*(e/=i)*e*e*e*e+a},easeOutQuint:function(t,e,a,n,i){return n*((e=e/i-1)*e*e*e*e+1)+a},easeInOutQuint:function(t,e,a,n,i){return(e/=i/2)<1?n/2*e*e*e*e*e+a:n/2*((e-=2)*e*e*e*e+2)+a},easeInSine:function(t,e,a,n,i){return-n*Math.cos(e/i*(Math.PI/2))+n+a},easeOutSine:function(t,e,a,n,i){return n*Math.sin(e/i*(Math.PI/2))+a},easeInOutSine:function(t,e,a,n,i){return-n/2*(Math.cos(Math.PI*e/i)-1)+a},easeInExpo:function(t,e,a,n,i){return 0==e?a:n*Math.pow(2,10*(e/i-1))+a},easeOutExpo:function(t,e,a,n,i){return e==i?a+n:n*(-Math.pow(2,-10*e/i)+1)+a},easeInOutExpo:function(t,e,a,n,i){return 0==e?a:e==i?a+n:(e/=i/2)<1?n/2*Math.pow(2,10*(e-1))+a:n/2*(-Math.pow(2,-10*--e)+2)+a},easeInCirc:function(t,e,a,n,i){return-n*(Math.sqrt(1-(e/=i)*e)-1)+a},easeOutCirc:function(t,e,a,n,i){return n*Math.sqrt(1-(e=e/i-1)*e)+a},easeInOutCirc:function(t,e,a,n,i){return(e/=i/2)<1?-n/2*(Math.sqrt(1-e*e)-1)+a:n/2*(Math.sqrt(1-(e-=2)*e)+1)+a},easeInElastic:function(t,e,a,n,i){var s=1.70158,l=0,o=n;if(0==e)return a;if(1==(e/=i))return a+n;if(l||(l=.3*i),o<Math.abs(n)){o=n;var s=l/4}else var s=l/(2*Math.PI)*Math.asin(n/o);return-(o*Math.pow(2,10*(e-=1))*Math.sin((e*i-s)*(2*Math.PI)/l))+a},easeOutElastic:function(t,e,a,n,i){var s=1.70158,l=0,o=n;if(0==e)return a;if(1==(e/=i))return a+n;if(l||(l=.3*i),o<Math.abs(n)){o=n;var s=l/4}else var s=l/(2*Math.PI)*Math.asin(n/o);return o*Math.pow(2,-10*e)*Math.sin((e*i-s)*(2*Math.PI)/l)+n+a},easeInOutElastic:function(t,e,a,n,i){var s=1.70158,l=0,o=n;if(0==e)return a;if(2==(e/=i/2))return a+n;if(l||(l=i*(.3*1.5)),o<Math.abs(n)){o=n;var s=l/4}else var s=l/(2*Math.PI)*Math.asin(n/o);return 1>e?-.5*(o*Math.pow(2,10*(e-=1))*Math.sin((e*i-s)*(2*Math.PI)/l))+a:o*Math.pow(2,-10*(e-=1))*Math.sin((e*i-s)*(2*Math.PI)/l)*.5+n+a},easeInBack:function(t,e,a,n,i,s){return void 0==s&&(s=1.70158),n*(e/=i)*e*((s+1)*e-s)+a},easeOutBack:function(t,e,a,n,i,s){return void 0==s&&(s=1.70158),n*((e=e/i-1)*e*((s+1)*e+s)+1)+a},easeInOutBack:function(t,e,a,n,i,s){return void 0==s&&(s=1.70158),(e/=i/2)<1?n/2*(e*e*(((s*=1.525)+1)*e-s))+a:n/2*((e-=2)*e*(((s*=1.525)+1)*e+s)+2)+a},easeInBounce:function(t,e,a,n,i){return n-jQuery.easing.easeOutBounce(t,i-e,0,n,i)+a},easeOutBounce:function(t,e,a,n,i){return(e/=i)<1/2.75?n*(7.5625*e*e)+a:2/2.75>e?n*(7.5625*(e-=1.5/2.75)*e+.75)+a:2.5/2.75>e?n*(7.5625*(e-=2.25/2.75)*e+.9375)+a:n*(7.5625*(e-=2.625/2.75)*e+.984375)+a},easeInOutBounce:function(t,e,a,n,i){return i/2>e?.5*jQuery.easing.easeInBounce(t,2*e,0,n,i)+a:.5*jQuery.easing.easeOutBounce(t,2*e-i,0,n,i)+.5*n+a}})}),define("lib/components/khSelect/1.0.0/khSelect",[],function(t,e,a){function n(t){function e(t){var e=t.attr("id");$(".select-gray").each(function(t){$(this).attr("id")!=e&&$(this).find("ul").slideUp()})}var t=t||{},a=t.mainCell||"",n=t.callback||null,i="string"==typeof a?a.indexOf("#")>-1?$(a):$("#"+a):a,s=i.find("ul"),l=i.find(".JQ_option"),o=i.find(".JQ_selectBtn"),r=s.find("a"),c=i.find("input");ulObj=i.children("ul"),i.css({display:"inline-block","min-width":parseInt(l.width()+30)+"px"}),ulObj.height()>200?ulObj.css({"overflow-y":"scroll",height:"200px","min-width":parseInt(l.width()+28)+"px"}):ulObj.css({"min-width":parseInt(l.width()+28)+"px"}),l.on("click",function(t){s.slideToggle(),t.stopPropagation(),e(i)}),o.on("click",function(t){s.slideToggle(),t.stopPropagation(),e(i)}),r.on("click",function(t){s.slideUp(),l.html($(this).html()),c.length>0&&c.val($(this).attr("data-value")),"function"==typeof n?n($(this).attr("data-value"),$(this).html(),$(this)):"",t.stopPropagation()}),$(document).on("click","body",function(t){s.slideUp(),t.stopPropagation()})}a.exports=n}),!function(){function t(t,e){return(/string|function/.test(typeof e)?o:l)(t,e)}function e(t,a){return"string"!=typeof t&&(a=typeof t,"number"===a?t+="":t="function"===a?e(t.call(t)):""),t}function a(t){return d[t]}function n(t){return e(t).replace(/&(?![\w#]+;)|[<>"']/g,a)}function i(t,e){if(u(t))for(var a=0,n=t.length;n>a;a++)e.call(t,t[a],a,t);else for(a in t)e.call(t,t[a],a)}function s(t,e){var a=/(\/)[^/]+\1\.\.\1/,n=("./"+t).replace(/[^/]+$/,""),i=n+e;for(i=i.replace(/\/\.\//g,"/");i.match(a);)i=i.replace(a,"/");return i}function l(e,a){var n=t.get(e)||r({filename:e,name:"Render Error",message:"Template not found"});return a?n(a):n}function o(t,e){if("string"==typeof e){var a=e;e=function(){return new p(a)}}var n=c[t]=function(a){try{return new e(a,t)+""}catch(n){return r(n)()}};return n.prototype=e.prototype=f,n.toString=function(){return e+""},n}function r(t){var e="{Template Error}",a=t.stack||"";if(a)a=a.split("\n").slice(0,2).join("\n");else for(var n in t)a+="<"+n+">\n"+t[n]+"\n\n";return function(){return"object"==typeof console&&console.error(e+"\n\n"+a),e}}var c=t.cache={},p=this.String,d={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},u=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},f=t.utils={$helpers:{},$include:function(t,e,a){return t=s(a,t),l(t,e)},$string:e,$escape:n,$each:i},m=t.helpers=f.$helpers;t.get=function(t){return c[t.replace(/^\.\//,"")]},t.helper=function(t,e){m[t]=e},"function"==typeof define?define("lib/template/tempcomment",[],function(e,a,n){return t}):"undefined"!=typeof exports?module.exports=t:this.template=t,t("tplAddressForm",function(t,e){"use strict";var a=this,n=(a.$helpers,a.$escape),i=t.actionURL,s=t.addressID,l=t.userName,o=t.address,r=t.telephone,c=t.mobilephone,d=t.defaultAdd,u="";return u+='<form id="J_addressForm" action="',u+=n(i),u+='" method="post"> <input type="hidden" name="addressID" value="',u+=n(s),u+='"> <table id="J_add" class="person-address-add-table"> <tbody class="person-address"> <tr class="item"> <th class="address-add-head">收货人：</th> <td> <input id="J_userName" class="person-address-add-input" name="userName" value="',u+=n(l),u+='" /> <span class="fc-f60">*</span> </td> </tr> <tr class="item"> <th class="address-add-head">详细地址：</th> <td id="J_selectAddress"></td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <p> <input id="J_address" class="person-address-add-input detailed-address-input" name="address" placeholder="具体地址" value="',u+=n(o),u+='" /> <span class="fc-f60">*</span> </p> <p> <label class="person-address-add-tip">&nbsp;&nbsp;&nbsp;(不需要重复填写省/市/区)</label> </p> </td> </tr> <tr class="item"> <th class="address-add-head">固定电话：</th> <td> <input id="J_tel" class="person-address-add-input" name="tel" value="',u+=n(r),u+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（示例：020-88888888-999）</label> </td> </tr> <tr class="item"> <th class="address-add-head">手机：</th> <td> <input id="J_phone" class="person-address-add-input" name="phone" value="',u+=n(c),u+='" /> <label class="person-address-add-tip"><span>*</span>&nbsp;&nbsp;（手机或固话必填一项）</label> </td> </tr> <tr class="item"> <th>&nbsp;</th> <td> <div class="defult-address-choose"> ',u+="1"==d?' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-checked"></a> ':' <a id="J_setDefault" href="javascript:void(0);" class="icon icon-box-normal"></a> ',u+=' <span class="address-font-gray">设为默认地址</span> <input type="hidden" name="setDefault" value="',u+=n(d),u+='" /> </div> </td> </tr> </tbody> </table> </form>',new p(u)}),t("tplBottomAd",function(t,e){"use strict";var a=this,n=(a.$helpers,t.link),i=a.$escape,s=t.linkURL,l=t.title,o=t.imgURL,r="";return r+='<div class="full-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=n&&(r+=i(n)),""!=s&&(r+=i(s)),r+='" target="_blank" title="',r+=i(l),r+='" style=" display:block; width:100%;min-height: 80px;background:url(',r+=i(o),r+=') center top no-repeat; "> <img src="',r+=i(o),r+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="full-ad-close" id="J_itemBottomAdClose"><span></span></a> </div> </div>',new p(r)}),t("tplEditPassForm",function(t,e){"use strict";var a=this,n=(a.$helpers,a.$escape),i=t.actionURL,s="";return s+='<form id="J_editPassForm" action="',s+=n(i),s+='" method="post"> <div class="fc-8c8">为了您的账户安全，请定期更换登录密码，并确保登录密码设置与提现密码不同。</div> <input type="hidden" name="form" value="form"> <div class="a-edit-pass-tr"> <p id="J_oldPass" class="edit-input-wrap"> <input type="password" name="old_passwd" placeholder="原密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_newPass" class="edit-input-wrap"> <input type="password" name="new_passwd" placeholder="输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> <div class="a-edit-pass-tr fc-8c8"> <p id="J_confirmNewPass" class="edit-input-wrap"> <input type="password" name="confirmNewPass" placeholder="再次输入新密码" class="JQ_editPassOption" /> </p> <p class="edit-pass-tip"></p> </div> </form>',new p(s)}),t("tplFloatNav",'<div id="J_floatNav" class="float-nav"> <a href="http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=201143&jid=2104161973" class="float-nav-char-wrap JQ_floatNavNormal" target="_blank"> <span class="floag-online-chat">在线客服</span> <i class="icon-float-chat normal-icon"></i> </a> <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4006538038&aty=0&a=0&curl=&ty=1" class="float-nav-qq JQ_floatNavNormal" target="_blank"> <span>QQ客服</span> <i class="icon-float-qq normal-icon"></i> </a> <a href="http://cart.kinhom.com/list.html" class="float-nav-cart JQ_floatNavNormal" target="_blank"> <span>购物车</span> <i class="icon-float-cart normal-icon"></i> <i class="icon-cart-num num-icon">0</i> </a> <a href="javascript:void(0);" class="float-nav-wechat JQ_floatNavWechat"> <span> <img src="http://misc.jjcdn.com/p/images/float_wechat.png" width="40" height="40" /> </span> <i class="icon-float-wechat normal-icon"></i> </a> <a href="http://www.wenjuan.com/s/qU36f2/" target="_blank" class="float-nav-feedback JQ_floatNavNormal"> <span>意见反馈</span> <i class="icon-float-feedback normal-icon"></i> </a> <a id="J_floatGoTop" href="javascript:void(0);" class="float-nav-top JQ_floatNavNormal"> <span>返回顶部</span> <i class="icon-float-top normal-icon"></i> </a> </div>'),t("tplLoginDialog",'<div class="login-dialog"> <div class="login-dialog-form"> <form action="javascript:void(0);" method="post"> <p class="login-dialog-form-tr" id="J_loginUserName"> <label>用户名：</label> <input type="text" name="loginUserName" placeholder="输入用户名/邮箱/手机"> </p> <p class="login-dialog-form-tip"></p> <p class="login-dialog-form-tr" id="J_loginPassword"> <label>密&nbsp;&nbsp;&nbsp;码：</label> <input type="password" name="loginPassword" placeholder="输入密码"> </p> <p class="login-dialog-form-tip"></p> </form> </div> </div> '),t("tplMinBar",function(t,e){"use strict";var a=this,n=(a.$helpers,a.$escape),i=t.live800,s=t.cdnPath,l=t.wapQQ,o=t.cart,r=t.mobile,c=t.wechat,d=t.feedback,u=t.gotop,f="";return f+=' <section id="J_minBar" class="min-bar"> <div class="min-bar-tabs"> <div class="min-bar-tab min-bar-online"> <div class="min-bar-online-icon"> <a href="',f+=n(i.clientLink),f+='" class="blankLink JQ_minBarOnline" target="_blank"> <img src="',f+=n(s),f+=n(i.iconPath),f+='" width="',f+=n(i.iconWidth),f+='" height="',f+=n(i.iconHeight),f+='" alt="',f+=n(i.iconText),f+='"/> <label class="min-bar-chat-num">',f+=n(i.chatNum),f+='</label> </a> <span class="min-bar-online-pop"> <span class="pop-close">&nbsp;</span> <a href="',f+=n(i.clientLink),f+='" class="pop-chat" target="_blank">&nbsp;</a> </span> </div> </div> <div class="min-bar-tab min-bar-qq min-text"> <div class="min-bar-qq-icon"> <a href="',f+=n(l.clientLink),f+='" class="blankLink" target="_blank"> <img src="',f+=n(s),f+=n(l.iconPath),f+='" width="',f+=n(l.iconWidth),f+='" height="',f+=n(l.iconHeight),f+='" alt="',f+=n(l.iconText),f+='"/> </a> <span class="min-bar-qq-text text">',f+=n(l.iconText),f+='</span> </div> </div> <div class="min-bar-tab min-bar-cart min-cart"> <div class="min-bar-cart-icon"> <a href="',f+=n(o.clientLink),f+='" class="icon-float-cart"> <span id="J_cartNum" class="min-bar-cart-num">',f+=n(o.chatNum),f+='</span> </a> </div> <div id="J_minBarPlugin" class="min-bar-plugin"> <div class="bar-plugin-cart"> <ul id="J_pluginCart"> </ul> <div class="plugin-cart-info"> <p class="cart-info-price"> <span class="cart-info-num"> 共 <label id="J_minBarCartNum">0</label> 件商品 </span> <span class="cart-info-total"> 合计: <small>&yen;</small> <label id="J_minBarCartTotal">0</label> </span> </p> <p class="cart-info-shipping">(不含运费)</p> <p class="cart-info-btn"> <a href="javascript:void(0);" id="J_minBarBtn" class="btn-gray" target="_blank">查看购物车</a> </p> </div> </div> </div> </div> <div class="min-bar-tab min-bar-phone min-phone"> <div class="min-bar-phone-icon"> <a href="',f+=n(r.clientLink),f+='" class="icon-float-phone">&nbsp;</a> <span class="min-bar-phone-img phone"> <img src="',f+=n(s),f+=n(r.iconPath),f+='" width="',f+=n(r.iconWidth),f+='" height="',f+=n(r.iconHeight),f+='" alt="',f+=n(r.iconText),f+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-wechat min-wechat"> <div class="min-bar-wechat-icon"> <a href="',f+=n(c.clientLink),f+='" class="icon-float-wechat">&nbsp;</a> <span class="min-bar-wechat-img wechat"> <img src="',f+=n(s),f+=n(c.iconPath),f+='" width="',f+=n(c.iconWidth),f+='" height="',f+=n(c.iconHeight),f+='" alt="',f+=n(c.iconText),f+='" /> </span> </div> </div> <div class="min-bar-tab min-bar-feedback min-text"> <div class="min-bar-feedback-icon"> <a href="',f+=n(d.clientLink),f+='" class="icon-float-feedback blankLink" target="_blank">&nbsp;</a> <span class="min-bar-feedback-text text">',f+=n(d.iconText),f+='</span> </div> </div> <div class="min-bar-tab min-bar-gtop min-text"> <div class="min-bar-gtop-icon" id="J_minBarGoTop"> <a href="',f+=n(u.clientLink),f+='" class="icon-float-top">&nbsp;</a> <span class="min-bar-gtop-text text">',f+=n(u.iconText),f+='</span> </div> </div> </div> </section> <section class="min-bar-mark"></section> ',new p(f)}),t("tplSelectAddress",function(t,e){"use strict";var a=this,n=(a.$helpers,t.valCity),i=a.$escape,s=t.textPro,l=t.valPro,o=t.textCity,r=t.valArea,c=t.textArea,d="";return d+='<div id="J_selectProvience" class="select-gray fl"> <i class="select-corner icon-gray-left"></i> ',""==n?d+=' <label class="JQ_option select-option w90" data-value="0">请选择省</label> ':(d+=' <label class="JQ_option select-option w90" data-value="0">',d+=i(s),d+="</label> "),d+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_proList"></ul> <input type="hidden" name="valProvince" value="',d+=i(l),d+='" /> </div> <div class="select-gray fl JQ_addressCity"> <i class="select-corner icon-gray-left"></i> ',""==n?d+=' <label class="JQ_option select-option w90" data-value="0">请选择市</label> ':(d+=' <label class="JQ_option select-option w90" data-value="0">',d+=i(o),d+="</label> "),d+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_cityList"></ul> <input type="hidden" name="valCity" value="',d+=i(n),d+='" /> </div> <div class="select-gray fl JQ_addressArea"> <i class="select-corner icon-gray-left"></i> ',""==r?d+=' <label class="JQ_option select-option w90" data-value="0">请选择区</label> ':(d+=' <label class="JQ_option select-option w90" data-value="0">',d+=i(c),d+="</label> "),d+=' <i class="select-corner icon-gray-right"></i> <a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_areaList"></ul> <input type="hidden" name="valArea" value="',d+=i(r),d+='" /> </div> ',new p(d)}),t("tplTopAd",function(t,e){"use strict";var a=this,n=(a.$helpers,t.link),i=a.$escape,s=t.linkURL,l=t.title,o=t.imgURL,r="";return r+='<div class="top-ad-wrap" style="width: 100%; overflow: hidden;"> <div style="background:url(http://misc.jjcdn.com/p/images/loading-t.gif) center center no-repeat;"> <a href="',""!=n&&(r+=i(n)),""!=s&&(r+=i(s)),r+='" target="_blank" title="',r+=i(l),r+='" style=" display:block; width:100%; min-height: 80px; background:url(',r+=i(o),r+=') center top no-repeat; "> <img src="',r+=i(o),r+='" style="visibility: hidden;display: block" /> </a> <a href="javascript:void(0);" class="index-top-ad-close" id="J_indexTopAdClose"> <span></span> </a> </div> </div>',new p(r)})}(),define("lib/components/minBar/1.0.1/minBar",[],function(t,e,a){function n(t){function e(){a(D),g(),h("#J_minBarPlugin"),i($(window).innerWidth()),$(window).resize(function(){i($(window).innerWidth())}),q.each(function(t){var e=$(this);e.on("mouseover",function(t){e.find("span.text").stop(!0,!0).delay(300).animate({right:"40px",opacity:1},300)}).on("mouseleave",function(t){e.find("span.text").stop(!0,!0).animate({right:"-80px",opacity:.1},300)}).on("click",function(t){var a=e.find("a.blankLink").attr("href");try{(a.indexOf("http")>-1||a.indexOf("https")>-1)&&window.open(a)}catch(n){}})}),P.hover(function(){$("#J_minBarPlugin").stop(!0,!0).fadeIn(300),c()},function(){$("#J_minBarPlugin").stop(!0,!0).hide()}),J.on("mouseenter",function(t){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"140px",height:"164px",padding:"5px",top:"-40px",opacity:1},300)}).on("mouseleave",function(t){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),C.on("mouseenter",function(t){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"160px",height:"250px",top:"-80px",opacity:1},300)}).on("mouseleave",function(t){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),x.on("click",function(t){$("body,html").stop(!0,!0).animate({scrollTop:0},300)}),j.on("click",function(t){t.preventDefault(),Q.fadeOut(300),clearTimeout(U),L?S||(S=!0,a(F)):(L=!0,a(A))}),B.hover(function(){Q.stop(!0,!0).fadeIn(300),clearTimeout(U),L?S||(S=!0,a(F)):(L=!0,a(A))},function(){Q.stop(!0,!0).fadeOut(300),clearTimeout(U),L?S||(S=!0,a(F)):(L=!0,a(A))}),O.on("click",function(t){Q.fadeOut(300),clearTimeout(U),L?S||(S=!0,a(F)):(L=!0,a(A))}),$(document).on("click",".JQ_minBarDelete",function(t){t.preventDefault();var e=$(this).attr("data-id"),a=$(this).parents("li");$.ajax({url:cdnConfig.cartApiPath+"/delete/"+e,dataType:"jsonp",success:function(t){"succ"==t.status?(a.addClass("delItem"),a.fadeOut(300,function(){$(".delItem").remove(),p(),h("#J_minBarPlugin")})):(p(),h("#J_minBarPlugin"))}})})}function a(t){setTimeout(function(){Q.fadeIn(200),n(5e3)},t)}function n(t){t=isNaN(t)?5e3:t,U=setTimeout(function(){Q.fadeOut(200),L?S||(S=!0,a(F)):(L=!0,a(A))},t)}function i(t){isNaN(t)?t=$(window).innerWidth():t,N>t?(o(),l(),P.on("mouseenter",function(t){t.stopPropagation(),s(),r()}),B.on("mouseenter",function(t){t.stopPropagation(),s(),r()}),T.on("mouseenter",function(t){t.stopPropagation(),s(),r()}),x.on("mouseenter",function(t){t.stopPropagation(),s(),r()}),k.on("mouseleave",function(t){t.stopPropagation(),t.preventDefault(),l(),o()})):(r(),s())}function s(){M.stop(!0,!0).delay(300).animate({right:"0px"},300)}function l(){M.stop(!0,!0).delay(300).animate({right:"-40px"},300)}function o(){C.stop(!0,!0).animate({right:"-40px"}),J.stop(!0,!0).animate({right:"-40px"}),I.stop(!0,!0).animate({right:"-40px"})}function r(){C.stop(!0,!0).delay(300).animate({right:"0px"}),J.stop(!0,!0).delay(300).animate({right:"0px"}),I.stop(!0,!0).delay(300).animate({right:"0px"})}function c(){$.ajax({url:cdnConfig.apiPath+"/cart/minilist",dataType:"jsonp",success:function(t){var e="";if("200"==t.code){var a=t.data.list;if(a.length>0)for(var n=0;n<a.length;n++)e+="<li>",e+='<div class="plugin-cart-list-img">',e+='<a href="'+a[n].link+'" target="_blank">',e+='<img src="'+a[n].src+'" width="90" height="60" alt="'+a[n].title+'"/>',e+="</a>",e+="</div>",e+='<div class="plugin-cart-list-title">',e+='<a href="'+a[n].link+'" target="_blank" title="'+a[n].title+'">'+a[n].title+"</a>",e+="</div>",e+='<div class="plugin-cart-list-info">',e+='<p class="list-price">&yen; <span class="JQ_minCartItemPrice">'+a[n].price+"</span></p>",e+='<p class="list-num">x <span class="JQ_minCartItemNum">'+a[n].num+"</span></p>",e+='<input type="hidden" class="JQ_minCartItemTotal" value="'+a[n].price*a[n].num+'" />',e+="</div>",e+='<a class="cart-list-delete-btn JQ_minBarDelete" data-id="'+a[n].cart_id+'" href="javascript:void(0);" target="_blank">x</a>',e+="</li>",v(e,"no")}else e="<li>您的购物车空空的~</li>",v(e,"yes");p(),h("#J_minBarPlugin")},error:function(t){}})}function p(){m(".JQ_minCartItemTotal","#J_minBarCartTotal"),f(".JQ_minCartItemNum","#J_minBarCartNum"),u("#J_minBarBtn","#J_minBarCartNum")}function d(t,e){$(t).html(e)}function u(t,e){var a="http://cart.kinhom.com/list.html",n=$(e),i=$(t);parseInt(n.html())>0?i.removeClass("btn-gray").addClass("btn-orange").attr("href",a):i.removeClass("btn-orange").addClass("btn-gray").attr("href","javascript:void(0);")}function f(t,e){var a=$(e),n=0;if($(t).length>0)$(t).each(function(){n+=parseInt($(this).html())});else{var i="<li>您的购物车空空的~</li>";v(i,"yes"),u("#J_minBarBtn","#J_minBarCartNum")}a.html(n),d("#J_cartNum",n)}function m(t,e){var a=$(e),n=0;$(t).length>0?($(t).each(function(){n+=parseInt($(this).val())}),a.html(n)):a.html(0)}function h(t){var e=$(t),a=e.innerHeight();e.css({top:"50%","margin-top":"-"+parseInt(a/2)+"px"})}function v(t,e){switch(e){case"yes":$("#J_pluginCart").addClass("plugin-cart-empty").removeClass("plugin-cart-list").html(t);break;case"no":$("#J_pluginCart").removeClass("plugin-cart-empty").addClass("plugin-cart-list").html(t)}}function g(){$.ajax({url:cdnConfig.apiPath+"/cart/statistics",dataType:"jsonp",success:function(t){"succ"==t.status?d("#J_cartNum",t.data.num):d("#J_cartNum",0);
},error:function(t){}})}var b=t.mainCell||"#J_minBar",y=t.tpl||function(){},w=t.tplName||"comment/tplMinBar",_=t.data||{};$("body").append(y(w,_));var k=b.indexOf("#")>-1?$(b):$("#"+b),x=k.find(".min-bar-gtop"),J=k.find(".min-wechat"),C=k.find(".min-phone"),I=k.find(".min-bar-feedback"),P=k.find(".min-cart"),T=k.find(".min-bar-qq"),B=k.find(".min-bar-online"),M=$(".min-bar-mark"),Q=$(".min-bar-online-pop"),j=$(".pop-close"),O=$(".pop-chat"),N=1280,q=k.find(".min-text"),L=!1,S=!1,D="30000",A="180000",F="180000";e();var U}a.exports=n});