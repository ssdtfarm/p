define(function(require,exports,modlue){!function($){var init=function(userOptions){var $target,leftSeconds,interval,seconds,minutes,hour,day,options={now:new Date,startTime:null,endTime:null,obj:{day:".day",hour:".hour",minutes:".minutes",seconds:".seconds"}},createDigits=function(callback){callback||leftSeconds--,leftSeconds>0?(seconds=leftSeconds%60,minutes=parseInt(leftSeconds/60)%60,hour=parseInt(leftSeconds/3600)%24,day=parseInt(leftSeconds/3600/24),$target.find(options.obj.day).text(day>9?day:"0"+day).end().find(options.obj.hour).text(hour>9?hour:"0"+hour).end().find(options.obj.minutes).text(minutes>9?minutes:"0"+minutes).end().find(options.obj.seconds).text(seconds>9?seconds:"0"+seconds).end()):pause(),callback&&"function"==typeof callback&&callback()},start=function(){void 0==interval&&(interval=setInterval(function(){createDigits()},1e3))},pause=function(){interval&&(clearTimeout(interval),interval=void 0),$target.slideUp()};$.extend(options,userOptions),leftSeconds=parseInt(parseInt(options.endTime-options.now)/1e3),$target=$(this.selector),(options.now>options.endTime||options.now<options.startTime)&&$target.hide(),options.now>options.startTime&&options.now<options.endTime&&options.startTime<options.endTime?createDigits(start):$target.hide()};$.fn.countdown=function(method){var methods=this.data("countdown");return methods&&methods[method]?methods[method].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof method&&method?void $.error("方法不存在于countdown中"):init.apply(this,arguments)}}(jQuery)});