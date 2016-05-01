define(function(require){var Popup=require("./popup"),defaults=require("./dialog-config"),css=defaults.cssUri;if(css){var fn=require[require.toUrl?"toUrl":"resolve"];fn&&(css=fn(css),css='<link rel="stylesheet" href="'+css+'" />',$("base")[0]?$("base").before(css):$("head").append(css))}var _count=0,_expando=new Date-0,_isIE6=!("minWidth"in $("html")[0].style),_isMobile="createTouch"in document&&!("onmousemove"in document)||/(iPhone|iPad|iPod)/i.test(navigator.userAgent),_isFixed=!_isIE6&&!_isMobile,artDialog=function(options,ok,cancel){var originalOptions=options=options||{};("string"==typeof options||1===options.nodeType)&&(options={content:options,fixed:!_isMobile}),options=$.extend(!0,{},artDialog.defaults,options),options.original=originalOptions;var id=options.id=options.id||_expando+_count,api=artDialog.get(id);return api?api.focus():(_isFixed||(options.fixed=!0),options.quickClose&&(options.modal=!0,options.backdropOpacity=0),$.isArray(options.button)||(options.button=[]),void 0!==cancel&&(options.cancel=cancel),options.cancel&&options.button.push({id:"cancel",className:options.cancelClassName,value:options.cancelValue,callback:options.cancel,display:options.cancelDisplay}),void 0!==ok&&(options.ok=ok),options.ok&&options.button.push({id:"ok",className:options.okClassName,value:options.okValue,callback:options.ok,autofocus:!0}),artDialog.list[id]=new artDialog.create(options))},popup=function(){};popup.prototype=Popup.prototype;var prototype=artDialog.prototype=new popup;return artDialog.create=function(options){var that=this;$.extend(this,new Popup);var $popup=(options.original,$(this.node).html(options.innerHTML)),$backdrop=$(this.backdrop);return this.options=options,this._popup=$popup,$.each(options,function(name,value){"function"==typeof that[name]?that[name](value):that[name]=value}),options.zIndex&&(Popup.zIndex=options.zIndex),$popup.attr({"aria-labelledby":this._$("title").attr("id","title:"+this.id).attr("id"),"aria-describedby":this._$("content").attr("id","content:"+this.id).attr("id")}),this._$("close").css("display",this.cancel===!1?"none":"").on("click",function(event){that._trigger("cancel"),event.preventDefault()}),this._$("dialog").addClass(this.skin),this._$("body").css("padding",this.padding),options.quickClose&&$backdrop.on("onmousedown"in document?"mousedown":"click",function(){return that._trigger("cancel"),!1}),this.addEventListener("show",function(){$backdrop.css({opacity:0,background:options.backdropBackground}).animate({opacity:options.backdropOpacity},150)}),this._esc=function(event){var target=event.target,nodeName=target.nodeName,rinput=/^input|textarea$/i,isTop=Popup.current===that,keyCode=event.keyCode;!isTop||rinput.test(nodeName)&&"button"!==target.type||27===keyCode&&that._trigger("cancel")},$(document).on("keydown",this._esc),this.addEventListener("remove",function(){$(document).off("keydown",this._esc),delete artDialog.list[this.id]}),_count++,artDialog.oncreate(this),this},artDialog.create.prototype=prototype,$.extend(prototype,{content:function(html){var $content=this._$("content");return"object"==typeof html?(html=$(html),$content.empty("").append(html.show()),this.addEventListener("beforeremove",function(){$("body").append(html.hide())})):$content.html(html),this.reset()},title:function(text){return this._$("title").text(text),this._$("header")[text?"show":"hide"](),this},width:function(value){return this._$("content").css("width",value),this.reset()},height:function(value){return this._$("content").css("height",value),this.reset()},button:function(args){args=args||[];var that=this,html="",number=0;return this.callbacks={},"string"==typeof args?(html=args,number++):$.each(args,function(i,val){var id=val.id=val.id||val.value,style="";that.callbacks[id]=val.callback,val.display===!1?style=' style="display:none"':number++,html+='<button type="button" i-id="'+id+'" class="'+(val.className?val.className:"ui-btns-nor")+'"'+style+(val.disabled?" disabled":"")+(val.autofocus?' autofocus class="ui-dialog-autofocus"':"")+">"+val.value+"</button>",that._$("button").on("click","[i-id="+id+"]",function(event){var $this=$(this);$this.attr("disabled")||that._trigger(id),event.preventDefault()})}),this._$("button").html(html),this._$("footer")[number?"show":"hide"](),this},statusbar:function(html){return this._$("statusbar").html(html)[html?"show":"hide"](),this},_$:function(i){return this._popup.find("[i="+i+"]")},_trigger:function(id){var fn=this.callbacks[id];return"function"!=typeof fn||fn.call(this)!==!1?this.close().remove():this}}),artDialog.oncreate=$.noop,artDialog.getCurrent=function(){return Popup.current},artDialog.get=function(id){return void 0===id?artDialog.list:artDialog.list[id]},artDialog.list={},artDialog.defaults=defaults,artDialog});