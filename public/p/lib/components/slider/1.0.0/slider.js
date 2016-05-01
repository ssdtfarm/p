define(function(require,exports,module){!function($){$.fn.slide=function(options){return $.fn.slide.defaults={type:"slide",effect:"fade",autoPlay:!1,delayTime:500,interTime:2500,triggerTime:150,defaultIndex:0,titCell:".hd li",mainCell:".bd",targetCell:null,trigger:"mouseover",scroll:1,vis:1,titOnClassName:"on",autoPage:!1,prevCell:".prev",nextCell:".next",pageStateCell:".pageState",opp:!1,pnLoop:!0,easing:"swing",startFun:null,endFun:null,switchLoad:null,playStateCell:".playState",mouseOverStop:!0,defaultPlay:!0,returnDefault:!1},this.each(function(){var _tar,opts=$.extend({},$.fn.slide.defaults,options),slider=$(this),effect=opts.effect,prevBtn=$(opts.prevCell,slider),nextBtn=$(opts.nextCell,slider),pageState=$(opts.pageStateCell,slider),playState=$(opts.playStateCell,slider),navObj=$(opts.titCell,slider),navObjSize=navObj.size(),conBox=$(opts.mainCell,slider),conBoxSize=conBox.children().size(),sLoad=opts.switchLoad,tarObj=$(opts.targetCell,slider),index=parseInt(opts.defaultIndex),delayTime=parseInt(opts.delayTime),interTime=parseInt(opts.interTime),scroll=(parseInt(opts.triggerTime),parseInt(opts.scroll)),vis=parseInt(opts.vis),autoPlay="false"==opts.autoPlay||0==opts.autoPlay?!1:!0,opp="false"==opts.opp||0==opts.opp?!1:!0,autoPage="false"==opts.autoPage||0==opts.autoPage?!1:!0,pnLoop="false"==opts.pnLoop||0==opts.pnLoop?!1:!0,mouseOverStop="false"==opts.mouseOverStop||0==opts.mouseOverStop?!1:!0,defaultPlay="false"==opts.defaultPlay||0==opts.defaultPlay?!1:!0,returnDefault="false"==opts.returnDefault||0==opts.returnDefault?!1:!0,slideH=0,slideW=0,selfW=0,selfH=0,easing=opts.easing,inter=null,mst=null,rtnST=null,titOn=opts.titOnClassName,onIndex=navObj.index(slider.find("."+titOn)),oldIndex=index=-1==onIndex?index:onIndex,defaultIndex=index,_ind=index,cloneNum=conBoxSize>=vis?conBoxSize%scroll!=0?conBoxSize%scroll:scroll:0,isMarq="leftMarquee"==effect||"topMarquee"==effect?!0:!1,doStartFun=function(){$.isFunction(opts.startFun)&&opts.startFun(index,navObjSize,slider,$(opts.titCell,slider),conBox,tarObj,prevBtn,nextBtn)},doEndFun=function(){$.isFunction(opts.endFun)&&opts.endFun(index,navObjSize,slider,$(opts.titCell,slider),conBox,tarObj,prevBtn,nextBtn)},resetOn=function(){navObj.removeClass(titOn),defaultPlay&&navObj.eq(defaultIndex).addClass(titOn)};if("menu"==opts.type)return defaultPlay&&navObj.removeClass(titOn).eq(index).addClass(titOn),navObj.hover(function(){_tar=$(this).find(opts.targetCell);var hoverInd=navObj.index($(this));mst=setTimeout(function(){switch(index=hoverInd,navObj.removeClass(titOn).eq(index).addClass(titOn),doStartFun(),effect){case"fade":_tar.stop(!0,!0).animate({opacity:"show"},delayTime,easing,doEndFun);break;case"slideDown":_tar.stop(!0,!0).animate({height:"show"},delayTime,easing,doEndFun)}},opts.triggerTime)},function(){switch(clearTimeout(mst),effect){case"fade":_tar.animate({opacity:"hide"},delayTime,easing);break;case"slideDown":_tar.animate({height:"hide"},delayTime,easing)}}),void(returnDefault&&slider.hover(function(){clearTimeout(rtnST)},function(){rtnST=setTimeout(resetOn,delayTime)}));if(0==navObjSize&&(navObjSize=conBoxSize),isMarq&&(navObjSize=2),autoPage){if(conBoxSize>=vis)if("leftLoop"==effect||"topLoop"==effect)navObjSize=conBoxSize%scroll!=0?(conBoxSize/scroll^0)+1:conBoxSize/scroll;else{var tempS=conBoxSize-vis;navObjSize=1+parseInt(tempS%scroll!=0?tempS/scroll+1:tempS/scroll),0>=navObjSize&&(navObjSize=1)}else navObjSize=1;navObj.html("");var str="";if(1==opts.autoPage||"true"==opts.autoPage)for(var i=0;navObjSize>i;i++)str+="<li>"+(i+1)+"</li>";else for(var i=0;navObjSize>i;i++)str+=opts.autoPage.replace("$",i+1);navObj.html(str);var navObj=navObj.children()}if(conBoxSize>=vis){conBox.children().each(function(){$(this).width()>selfW&&(selfW=$(this).width(),slideW=$(this).outerWidth(!0)),$(this).height()>selfH&&(selfH=$(this).height(),slideH=$(this).outerHeight(!0))});var _chr=conBox.children(),cloneEle=function(){for(var i=0;vis>i;i++)_chr.eq(i).clone().addClass("clone").appendTo(conBox);for(var i=0;cloneNum>i;i++)_chr.eq(conBoxSize-i-1).clone().addClass("clone").prependTo(conBox)};switch(effect){case"fold":conBox.css({position:"relative",width:slideW,height:slideH}).children().css({position:"absolute",width:selfW,left:0,top:0,display:"none"});break;case"top":conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+vis*slideH+'px"></div>').css({top:-(index*scroll)*slideH,position:"relative",padding:"0",margin:"0"}).children().css({height:selfH});break;case"left":conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+vis*slideW+'px"></div>').css({width:conBoxSize*slideW,left:-(index*scroll)*slideW,position:"relative",overflow:"hidden",padding:"0",margin:"0"}).children().css({"float":"left",width:selfW});break;case"leftLoop":case"leftMarquee":cloneEle(),conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+vis*slideW+'px"></div>').css({width:(conBoxSize+vis+cloneNum)*slideW,position:"relative",overflow:"hidden",padding:"0",margin:"0",left:-(cloneNum+index*scroll)*slideW}).children().css({"float":"left",width:selfW});break;case"topLoop":case"topMarquee":cloneEle(),conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+vis*slideH+'px"></div>').css({height:(conBoxSize+vis+cloneNum)*slideH,position:"relative",padding:"0",margin:"0",top:-(cloneNum+index*scroll)*slideH}).children().css({height:selfH})}}var scrollNum=function(ind){var _tempCs=ind*scroll;return ind==navObjSize?_tempCs=conBoxSize:-1==ind&&conBoxSize%scroll!=0&&(_tempCs=-conBoxSize%scroll),_tempCs},doSwitchLoad=function(objs){var changeImg=function(t){for(var i=t;vis+t>i;i++)objs.eq(i).find("img["+sLoad+"]").each(function(){var _this=$(this);if(_this.attr("src",_this.attr(sLoad)).removeAttr(sLoad),conBox.find(".clone")[0])for(var chir=conBox.children(),j=0;j<chir.size();j++)chir.eq(j).find("img["+sLoad+"]").each(function(){$(this).attr(sLoad)==_this.attr("src")&&$(this).attr("src",$(this).attr(sLoad)).removeAttr(sLoad)})})};switch(effect){case"fade":case"fold":case"top":case"left":case"slideDown":changeImg(index*scroll);break;case"leftLoop":case"topLoop":changeImg(cloneNum+scrollNum(_ind));break;case"leftMarquee":case"topMarquee":var curS="leftMarquee"==effect?conBox.css("left").replace("px",""):conBox.css("top").replace("px",""),slideT="leftMarquee"==effect?slideW:slideH,mNum=cloneNum;if(curS%slideT!=0){var curP=Math.abs(curS/slideT^0);mNum=1==index?cloneNum+curP:cloneNum+curP-1}changeImg(mNum)}},doPlay=function(init){if(!defaultPlay||oldIndex!=index||init||isMarq){if(isMarq?index>=1?index=1:0>=index&&(index=0):(_ind=index,index>=navObjSize?index=0:0>index&&(index=navObjSize-1)),doStartFun(),null!=sLoad&&doSwitchLoad(conBox.children()),tarObj[0]&&(_tar=tarObj.eq(index),null!=sLoad&&doSwitchLoad(tarObj),"slideDown"==effect?(tarObj.not(_tar).stop(!0,!0).slideUp(delayTime),_tar.slideDown(delayTime,easing,function(){conBox[0]||doEndFun()})):(tarObj.not(_tar).stop(!0,!0).hide(),_tar.animate({opacity:"show"},delayTime,function(){conBox[0]||doEndFun()}))),conBoxSize>=vis)switch(effect){case"fade":conBox.children().stop(!0,!0).eq(index).animate({opacity:"show"},delayTime,easing,function(){doEndFun()}).siblings().hide();break;case"fold":conBox.children().stop(!0,!0).eq(index).animate({opacity:"show"},delayTime,easing,function(){doEndFun()}).siblings().animate({opacity:"hide"},delayTime,easing);break;case"top":conBox.stop(!0,!1).animate({top:-index*scroll*slideH},delayTime,easing,function(){doEndFun()});break;case"left":conBox.stop(!0,!1).animate({left:-index*scroll*slideW},delayTime,easing,function(){doEndFun()});break;case"leftLoop":var __ind=_ind;conBox.stop(!0,!0).animate({left:-(scrollNum(_ind)+cloneNum)*slideW},delayTime,easing,function(){-1>=__ind?conBox.css("left",-(cloneNum+(navObjSize-1)*scroll)*slideW):__ind>=navObjSize&&conBox.css("left",-cloneNum*slideW),doEndFun()});break;case"topLoop":var __ind=_ind;conBox.stop(!0,!0).animate({top:-(scrollNum(_ind)+cloneNum)*slideH},delayTime,easing,function(){-1>=__ind?conBox.css("top",-(cloneNum+(navObjSize-1)*scroll)*slideH):__ind>=navObjSize&&conBox.css("top",-cloneNum*slideH),doEndFun()});break;case"leftMarquee":var tempLeft=conBox.css("left").replace("px","");0==index?conBox.animate({left:++tempLeft},0,function(){conBox.css("left").replace("px","")>=0&&conBox.css("left",-conBoxSize*slideW)}):conBox.animate({left:--tempLeft},0,function(){conBox.css("left").replace("px","")<=-(conBoxSize+cloneNum)*slideW&&conBox.css("left",-cloneNum*slideW)});break;case"topMarquee":var tempTop=conBox.css("top").replace("px","");0==index?conBox.animate({top:++tempTop},0,function(){conBox.css("top").replace("px","")>=0&&conBox.css("top",-conBoxSize*slideH)}):conBox.animate({top:--tempTop},0,function(){conBox.css("top").replace("px","")<=-(conBoxSize+cloneNum)*slideH&&conBox.css("top",-cloneNum*slideH)})}navObj.removeClass(titOn).eq(index).addClass(titOn),oldIndex=index,pnLoop||(nextBtn.removeClass("nextStop"),prevBtn.removeClass("prevStop"),0==index&&prevBtn.addClass("prevStop"),index==navObjSize-1&&nextBtn.addClass("nextStop")),pageState.html("<span>"+(index+1)+"</span>/"+navObjSize)}};defaultPlay&&doPlay(!0),returnDefault&&slider.hover(function(){clearTimeout(rtnST)},function(){rtnST=setTimeout(function(){index=defaultIndex,defaultPlay?doPlay():"slideDown"==effect?_tar.slideUp(delayTime,resetOn):_tar.animate({opacity:"hide"},delayTime,resetOn),oldIndex=index},300)});var setInter=function(time){inter=setInterval(function(){opp?index--:index++,doPlay()},time?time:interTime)},setMarInter=function(time){inter=setInterval(doPlay,time?time:interTime)},resetInter=function(){mouseOverStop||(clearInterval(inter),setInter())},nextTrigger=function(){(pnLoop||index!=navObjSize-1)&&(index++,doPlay(),isMarq||resetInter())},prevTrigger=function(){(pnLoop||0!=index)&&(index--,doPlay(),isMarq||resetInter())},playStateFun=function(){clearInterval(inter),isMarq?setMarInter():setInter(),playState.removeClass("pauseState")},pauseStateFun=function(){clearInterval(inter),playState.addClass("pauseState")};if(autoPlay?isMarq?(opp?index--:index++,setMarInter(),mouseOverStop&&conBox.hover(pauseStateFun,playStateFun)):(setInter(),mouseOverStop&&slider.hover(pauseStateFun,playStateFun)):(isMarq&&(opp?index--:index++),playState.addClass("pauseState")),playState.click(function(){playState.hasClass("pauseState")?playStateFun():pauseStateFun()}),"mouseover"==opts.trigger?navObj.hover(function(){var hoverInd=navObj.index(this);mst=setTimeout(function(){index=hoverInd,doPlay(),resetInter()},opts.triggerTime)},function(){clearTimeout(mst)}):navObj.click(function(){index=navObj.index(this),doPlay(),resetInter()}),isMarq){if(nextBtn.mousedown(nextTrigger),prevBtn.mousedown(prevTrigger),pnLoop){var st,marDown=function(){st=setTimeout(function(){clearInterval(inter),setMarInter(interTime/10^0)},150)},marUp=function(){clearTimeout(st),clearInterval(inter),setMarInter()};nextBtn.mousedown(marDown),nextBtn.mouseup(marUp),prevBtn.mousedown(marDown),prevBtn.mouseup(marUp)}"mouseover"==opts.trigger&&(nextBtn.hover(nextTrigger,function(){}),prevBtn.hover(prevTrigger,function(){}))}else nextBtn.click(nextTrigger),prevBtn.click(prevTrigger)})}}(jQuery),jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d)},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b},easeInOutQuad:function(x,t,b,c,d){return(t/=d/2)<1?c/2*t*t+b:-c/2*(--t*(t-2)-1)+b},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOutCubic:function(x,t,b,c,d){return(t/=d/2)<1?c/2*t*t*t+b:c/2*((t-=2)*t*t+2)+b},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b},easeInOutQuart:function(x,t,b,c,d){return(t/=d/2)<1?c/2*t*t*t*t+b:-c/2*((t-=2)*t*t*t-2)+b},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOutQuint:function(x,t,b,c,d){return(t/=d/2)<1?c/2*t*t*t*t*t+b:c/2*((t-=2)*t*t*t*t+2)+b},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b},easeInExpo:function(x,t,b,c,d){return 0==t?b:c*Math.pow(2,10*(t/d-1))+b},easeOutExpo:function(x,t,b,c,d){return t==d?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOutExpo:function(x,t,b,c,d){return 0==t?b:t==d?b+c:(t/=d/2)<1?c/2*Math.pow(2,10*(t-1))+b:c/2*(-Math.pow(2,-10*--t)+2)+b},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOutCirc:function(x,t,b,c,d){return(t/=d/2)<1?-c/2*(Math.sqrt(1-t*t)-1)+b:c/2*(Math.sqrt(1-(t-=2)*t)+1)+b},easeInElastic:function(x,t,b,c,d){var s=1.70158,p=0,a=c;if(0==t)return b;if(1==(t/=d))return b+c;if(p||(p=.3*d),a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOutElastic:function(x,t,b,c,d){var s=1.70158,p=0,a=c;if(0==t)return b;if(1==(t/=d))return b+c;if(p||(p=.3*d),a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},easeInOutElastic:function(x,t,b,c,d){var s=1.70158,p=0,a=c;if(0==t)return b;if(2==(t/=d/2))return b+c;if(p||(p=d*(.3*1.5)),a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return 1>t?-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b:a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b},easeInBack:function(x,t,b,c,d,s){return void 0==s&&(s=1.70158),c*(t/=d)*t*((s+1)*t-s)+b},easeOutBack:function(x,t,b,c,d,s){return void 0==s&&(s=1.70158),c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOutBack:function(x,t,b,c,d,s){return void 0==s&&(s=1.70158),(t/=d/2)<1?c/2*(t*t*(((s*=1.525)+1)*t-s))+b:c/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+b},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b},easeOutBounce:function(x,t,b,c,d){return(t/=d)<1/2.75?c*(7.5625*t*t)+b:2/2.75>t?c*(7.5625*(t-=1.5/2.75)*t+.75)+b:2.5/2.75>t?c*(7.5625*(t-=2.25/2.75)*t+.9375)+b:c*(7.5625*(t-=2.625/2.75)*t+.984375)+b},easeInOutBounce:function(x,t,b,c,d){return d/2>t?.5*jQuery.easing.easeInBounce(x,2*t,0,c,d)+b:.5*jQuery.easing.easeOutBounce(x,2*t-d,0,c,d)+.5*c+b}})});