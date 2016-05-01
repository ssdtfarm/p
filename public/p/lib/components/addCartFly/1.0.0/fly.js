define(function(require,exports,module){!function($){$.fly=function(element,options){var defaults={version:"1.0.0",autoPlay:!0,vertex_Rtop:20,speed:1.2,start:{},end:{},onEnd:$.noop},self=this,$element=$(element);self.init=function(options){this.setOptions(options),!!this.settings.autoPlay&&this.play()},self.setOptions=function(options){this.settings=$.extend(!0,{},defaults,options);var settings=this.settings,start=settings.start,end=settings.end;$element.css({marginTop:"0px",marginLeft:"0px",position:"fixed"}).appendTo("body"),null!=end.width&&null!=end.height&&$.extend(!0,start,{width:$element.width(),height:$element.height()});var vertex_top=Math.min(start.top,end.top)-Math.abs(start.left-end.left)/3;vertex_top<settings.vertex_Rtop&&(vertex_top=Math.min(settings.vertex_Rtop,Math.min(start.top,end.top)));var distance=Math.sqrt(Math.pow(start.top-end.top,2)+Math.pow(start.left-end.left,2)),steps=Math.ceil(Math.min(Math.max(Math.log(distance)/.05-75,30),100)/settings.speed),ratio=start.top==vertex_top?0:-Math.sqrt((end.top-vertex_top)/(start.top-vertex_top)),vertex_left=(ratio*start.left-end.left)/(ratio-1),curvature=end.left==vertex_left?0:(end.top-vertex_top)/Math.pow(end.left-vertex_left,2);$.extend(!0,settings,{count:-1,steps:steps,vertex_left:vertex_left,vertex_top:vertex_top,curvature:curvature})},self.play=function(){this.move()},self.move=function(){var settings=this.settings,start=settings.start,count=settings.count,steps=settings.steps,end=settings.end,left=start.left+(end.left-start.left)*count/steps,top=0==settings.curvature?start.top+(end.top-start.top)*count/steps:settings.curvature*Math.pow(left-settings.vertex_left,2)+settings.vertex_top;if(null!=end.width&&null!=end.height){var i=steps/2,width=end.width-(end.width-start.width)*Math.cos(i>count?0:(count-i)/(steps-i)*Math.PI/2),height=end.height-(end.height-start.height)*Math.cos(i>count?0:(count-i)/(steps-i)*Math.PI/2);$element.css({width:width+"px",height:height+"px","font-size":Math.min(width,height)+"px"})}$element.css({left:left+"px",top:top+"px"}),settings.count++;var time=window.requestAnimationFrame($.proxy(this.move,this));count==steps&&(window.cancelAnimationFrame(time),settings.onEnd.apply(this))},self.destroy=function(){$element.remove()},self.init(options)},$.fn.fly=function(options){return this.each(function(){void 0==$(this).data("fly")&&$(this).data("fly",new $.fly(this,options))})}}(jQuery)});