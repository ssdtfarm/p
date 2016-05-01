define(function(require,exports,module){function minBar(config){function init(){popOnline(firtTime),getMinCartNum(),setPluginOffset("#J_minBarPlugin"),setMinBarOffset($(window).innerWidth()),$(window).resize(function(){setMinBarOffset($(window).innerWidth())}),$tabs.each(function(index){var that=$(this);that.on("mouseover",function(event){that.find("span.text").stop(!0,!0).delay(300).animate({right:"40px",opacity:1},300)}).on("mouseleave",function(event){that.find("span.text").stop(!0,!0).animate({right:"-80px",opacity:.1},300)}).on("click",function(event){var URL=that.find("a.blankLink").attr("href");try{(URL.indexOf("http")>-1||URL.indexOf("https")>-1)&&window.open(URL)}catch(erro){}})}),cartObj.hover(function(){$("#J_minBarPlugin").stop(!0,!0).fadeIn(300),getCartInfo()},function(){$("#J_minBarPlugin").stop(!0,!0).hide()}),wechatObj.on("mouseenter",function(event){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"140px",height:"164px",padding:"5px",top:"-40px",opacity:1},300)}).on("mouseleave",function(event){$(this).find(".min-bar-wechat-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),appObj.on("mouseenter",function(event){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"block"}).delay(200).animate({width:"160px",height:"250px",top:"-80px",opacity:1},300)}).on("mouseleave",function(event){$(this).find(".min-bar-phone-img").stop(!0,!0).css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),goTopObj.on("click",function(event){$("body,html").stop(!0,!0).animate({scrollTop:0},300)}),closePop.on("click",function(event){event.preventDefault(),popObj.fadeOut(300),clearTimeout(timeout),popFirst?popSecond||(popSecond=!0,popOnline(thirdTime)):(popFirst=!0,popOnline(secodTime))}),onlineObj.hover(function(){popObj.stop(!0,!0).fadeIn(300),clearTimeout(timeout),popFirst?popSecond||(popSecond=!0,popOnline(thirdTime)):(popFirst=!0,popOnline(secodTime))},function(){popObj.stop(!0,!0).fadeOut(300),clearTimeout(timeout),popFirst?popSecond||(popSecond=!0,popOnline(thirdTime)):(popFirst=!0,popOnline(secodTime))}),popChat.on("click",function(event){popObj.fadeOut(300),clearTimeout(timeout),popFirst?popSecond||(popSecond=!0,popOnline(thirdTime)):(popFirst=!0,popOnline(secodTime))}),$(document).on("click",".JQ_minBarDelete",function(event){event.preventDefault();var cartID=$(this).attr("data-id"),item=$(this).parents("li");$.ajax({url:cdnConfig.cartApiPath+"/delete/"+cartID,dataType:"jsonp",success:function(res){"succ"==res.status?(item.addClass("delItem"),item.fadeOut(300,function(){$(".delItem").remove(),setCartInfo(),setPluginOffset("#J_minBarPlugin")})):(setCartInfo(),setPluginOffset("#J_minBarPlugin"))}})})}function popOnline(time){setTimeout(function(){popObj.fadeIn(200),hidePop(5e3)},time)}function hidePop(t){t=isNaN(t)?5e3:t,timeout=setTimeout(function(){popObj.fadeOut(200),popFirst?popSecond||(popSecond=!0,popOnline(thirdTime)):(popFirst=!0,popOnline(secodTime))},t)}function setMinBarOffset(w){isNaN(w)?w=$(window).innerWidth():w,minWid>w?(showLiteBar(),hideMark(),cartObj.on("mouseenter",function(event){event.stopPropagation(),showMark(),showAllBar()}),onlineObj.on("mouseenter",function(event){event.stopPropagation(),showMark(),showAllBar()}),qqObj.on("mouseenter",function(event){event.stopPropagation(),showMark(),showAllBar()}),goTopObj.on("mouseenter",function(event){event.stopPropagation(),showMark(),showAllBar()}),mainDOM.on("mouseleave",function(event){event.stopPropagation(),event.preventDefault(),hideMark(),showLiteBar()})):(showAllBar(),showMark())}function showMark(){minBarMark.stop(!0,!0).delay(300).animate({right:"0px"},300)}function hideMark(){minBarMark.stop(!0,!0).delay(300).animate({right:"-40px"},300)}function showLiteBar(){appObj.stop(!0,!0).animate({right:"-40px"}),wechatObj.stop(!0,!0).animate({right:"-40px"}),feedbackObj.stop(!0,!0).animate({right:"-40px"})}function showAllBar(){appObj.stop(!0,!0).delay(300).animate({right:"0px"}),wechatObj.stop(!0,!0).delay(300).animate({right:"0px"}),feedbackObj.stop(!0,!0).delay(300).animate({right:"0px"})}function getCartInfo(){$.ajax({url:cdnConfig.apiPath+"/cart/minilist",dataType:"jsonp",success:function(res){var html="";if("200"==res.code){var list=res.data.list;if(list.length>0)for(var i=0;i<list.length;i++)html+="<li>",html+='<div class="plugin-cart-list-img">',html+='<a href="'+list[i].link+'" target="_blank">',html+='<img src="'+list[i].src+'" width="90" height="60" alt="'+list[i].title+'"/>',html+="</a>",html+="</div>",html+='<div class="plugin-cart-list-title">',html+='<a href="'+list[i].link+'" target="_blank" title="'+list[i].title+'">'+list[i].title+"</a>",html+="</div>",html+='<div class="plugin-cart-list-info">',html+='<p class="list-price">&yen; <span class="JQ_minCartItemPrice">'+list[i].price+"</span></p>",html+='<p class="list-num">x <span class="JQ_minCartItemNum">'+list[i].num+"</span></p>",html+='<input type="hidden" class="JQ_minCartItemTotal" value="'+list[i].price*list[i].num+'" />',html+="</div>",html+='<a class="cart-list-delete-btn JQ_minBarDelete" data-id="'+list[i].cart_id+'" href="javascript:void(0);" target="_blank">x</a>',html+="</li>",setListInfo(html,"no")}else html="<li>您的购物车空空的~</li>",setListInfo(html,"yes");setCartInfo(),setPluginOffset("#J_minBarPlugin")},error:function(err){}})}function setCartInfo(){mountTotal(".JQ_minCartItemTotal","#J_minBarCartTotal"),mountNumber(".JQ_minCartItemNum","#J_minBarCartNum"),setBtn("#J_minBarBtn","#J_minBarCartNum")}function setCartNumber(domID,num){$(domID).html(num)}function setBtn(domID,numID){var url="http://cart.kinhom.com/list.html",numObj=$(numID),btnObj=$(domID);parseInt(numObj.html())>0?btnObj.removeClass("btn-gray").addClass("btn-orange").attr("href",url):btnObj.removeClass("btn-orange").addClass("btn-gray").attr("href","javascript:void(0);")}function mountNumber(className,tarID){var tarDOM=$(tarID),num=0;if($(className).length>0)$(className).each(function(){num+=parseInt($(this).html())});else{var html="<li>您的购物车空空的~</li>";setListInfo(html,"yes"),setBtn("#J_minBarBtn","#J_minBarCartNum")}tarDOM.html(num),setCartNumber("#J_cartNum",num)}function mountTotal(className,tarID){var tarDOM=$(tarID),price=0;$(className).length>0?($(className).each(function(){price+=parseInt($(this).val())}),tarDOM.html(price)):tarDOM.html(0)}function setPluginOffset(domID){var DOM=$(domID),domHei=DOM.innerHeight();DOM.css({top:"50%","margin-top":"-"+parseInt(domHei/2)+"px"})}function setListInfo(html,type){switch(type){case"yes":$("#J_pluginCart").addClass("plugin-cart-empty").removeClass("plugin-cart-list").html(html);break;case"no":$("#J_pluginCart").removeClass("plugin-cart-empty").addClass("plugin-cart-list").html(html)}}function getMinCartNum(){$.ajax({url:cdnConfig.apiPath+"/cart/statistics",dataType:"jsonp",success:function(res){"succ"==res.status?setCartNumber("#J_cartNum",res.data.num):setCartNumber("#J_cartNum",0)},error:function(err){}})}var mainID=config.mainCell||"#J_minBar",template=config.tpl||function(){},tplName=config.tplName||"comment/tplMinBar";$("body").append(template(tplName));var mainDOM=mainID.indexOf("#")>-1?$(mainID):$("#"+mainID),goTopObj=mainDOM.find(".min-bar-gtop"),wechatObj=mainDOM.find(".min-wechat"),appObj=mainDOM.find(".min-phone"),feedbackObj=mainDOM.find(".min-bar-feedback"),cartObj=mainDOM.find(".min-cart"),qqObj=mainDOM.find(".min-bar-qq"),onlineObj=mainDOM.find(".min-bar-online"),minBarMark=$(".min-bar-mark"),popObj=$(".min-bar-online-pop"),closePop=$(".pop-close"),popChat=$(".pop-chat"),minWid=1280,$tabs=mainDOM.find(".min-text"),popFirst=!1,popSecond=!1,firtTime="30000",secodTime="180000",thirdTime="180000";init();var timeout}module.exports=minBar});