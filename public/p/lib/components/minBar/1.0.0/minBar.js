define(function(require,exports,module){function minBar(config){function init(){getMinCartNum(),setPluginOffset("#J_minBarPlugin"),setMinBarOffset($(window).innerWidth()),$(window).resize(function(){setMinBarOffset($(window).innerWidth())}),$tabs.each(function(index){var that=$(this);that.on("mouseover",function(event){that.find("span").stop().animate({right:"40px",opacity:1},300)}).on("mouseout",function(event){that.find("span").stop().animate({right:"-80px",opacity:.1},300)}).on("click",function(event){var URL=that.find("a").attr("href");(URL.indexOf("http")>-1||URL.indexOf("https")>-1)&&window.open(URL)})}),cartObj.hover(function(){$("#J_minBarPlugin").show(),getCartInfo()},function(){$("#J_minBarPlugin").hide()}),wechatObj.on("mouseover",function(event){$(this).find(".min-bar-wechat-img").stop().css({display:"block"}).animate({width:"76px",height:"76px",opacity:1},300)}).on("mouseout",function(event){$(this).find(".min-bar-wechat-img").stop().css({display:"none"}).animate({width:"36px",height:"36px",opacity:0},300)}),goTopObj.on("click",function(event){$("body,html").stop().animate({scrollTop:0},300)}),$(document).on("click",".JQ_minBarDelete",function(event){event.preventDefault();var cartID=$(this).attr("data-id"),item=$(this).parents("li");$.ajax({url:cdnConfig.cartApiPath+"/delete/"+cartID,dataType:"jsonp",success:function(res){"succ"==res.status?(item.addClass("delItem"),item.fadeOut(300,function(){$(".delItem").remove(),setCartInfo(),setPluginOffset("#J_minBarPlugin")})):(setCartInfo(),setPluginOffset("#J_minBarPlugin"))}})})}function setMinBarOffset(w){isNaN(w)?w=$(window).innerWidth():w,minWid>w?(mainDOM.css({height:"200px",top:"50%","margin-top":"-100px"}),onlineObj.css({top:"0","margin-top":"0"}),qqObj.css({top:"40px","margin-top":"0"}),cartObj.css({top:"100px","margin-top":"0"}),wechatObj.fadeOut(200),feedbackObj.fadeOut(200)):(mainDOM.css({height:"100%",top:"0","margin-top":"0"}),onlineObj.css({top:"50%","margin-top":"-80px"}),qqObj.css({top:"50%","margin-top":"-40px"}),cartObj.css({top:"50%","margin-top":"20px"}),wechatObj.fadeIn(200),feedbackObj.fadeIn(200))}function getCartInfo(){$.ajax({url:cdnConfig.apiPath+"/cart/minilist",dataType:"jsonp",success:function(res){var html="";if("200"==res.code){var list=res.data.list;if(list.length>0)for(var i=0;i<list.length;i++)html+="<li>",html+='<div class="plugin-cart-list-img">',html+='<a href="'+list[i].link+'" target="_blank">',html+='<img src="'+list[i].src+'" width="90" height="60" alt="'+list[i].title+'"/>',html+="</a>",html+="</div>",html+='<div class="plugin-cart-list-title">',html+='<a href="'+list[i].link+'" target="_blank" title="'+list[i].title+'">'+list[i].title+"</a>",html+="</div>",html+='<div class="plugin-cart-list-info">',html+='<p class="list-price">&yen; <span class="JQ_minCartItemPrice">'+list[i].price+"</span></p>",html+='<p class="list-num">x <span class="JQ_minCartItemNum">'+list[i].num+"</span></p>",html+='<input type="hidden" class="JQ_minCartItemTotal" value="'+list[i].price*list[i].num+'" />',html+="</div>",html+='<a class="cart-list-delete-btn JQ_minBarDelete" data-id="'+list[i].cart_id+'" href="javascript:void(0);" target="_blank">x</a>',html+="</li>",setListInfo(html,"no")}else html="<li>您的购物车空空的~</li>",setListInfo(html,"yes");setCartInfo(),setPluginOffset("#J_minBarPlugin")},error:function(err){}})}function setCartInfo(){mountTotal(".JQ_minCartItemTotal","#J_minBarCartTotal"),mountNumber(".JQ_minCartItemNum","#J_minBarCartNum"),setBtn("#J_minBarBtn","#J_minBarCartNum")}function setCartNumber(domID,num){$(domID).html(num)}function setBtn(domID,numID){var url="http://cart.kinhom.com/list.html",numObj=$(numID),btnObj=$(domID);parseInt(numObj.html())>0?btnObj.removeClass("btn-gray").addClass("btn-orange").attr("href",url):btnObj.removeClass("btn-orange").addClass("btn-gray").attr("href","javascript:void(0);")}function mountNumber(className,tarID){var tarDOM=$(tarID),num=0;if($(className).length>0)$(className).each(function(){num+=parseInt($(this).html())});else{var html="<li>您的购物车空空的~</li>";setListInfo(html,"yes"),setBtn("#J_minBarBtn","#J_minBarCartNum")}tarDOM.html(num),setCartNumber("#J_cartNum",num)}function mountTotal(className,tarID){var tarDOM=$(tarID),price=0;$(className).length>0?($(className).each(function(){price+=parseInt($(this).val())}),tarDOM.html(price)):tarDOM.html(0)}function setPluginOffset(domID){var DOM=$(domID),domHei=DOM.innerHeight();DOM.css({top:"50%","margin-top":"-"+parseInt(domHei/2)+"px"})}function setListInfo(html,type){switch(type){case"yes":$("#J_pluginCart").addClass("plugin-cart-empty").removeClass("plugin-cart-list").html(html);break;case"no":$("#J_pluginCart").removeClass("plugin-cart-empty").addClass("plugin-cart-list").html(html)}}function getMinCartNum(){$.ajax({url:cdnConfig.apiPath+"/cart/statistics",dataType:"jsonp",success:function(res){"succ"==res.status?setCartNumber("#J_cartNum",res.data.num):setCartNumber("#J_cartNum",0)},error:function(err){}})}var mainID=config.mainCell||"#J_minBar",template=config.tpl||function(){},tplName=config.tplName||"comment/tplMinBar";$("body").append(template(tplName));var mainDOM=mainID.indexOf("#")>-1?$(mainID):$("#"+mainID),goTopObj=mainDOM.find("#J_minBarGoTop"),wechatObj=mainDOM.find(".min-wechat"),feedbackObj=mainDOM.find(".min-bar-feedback"),cartObj=mainDOM.find(".min-cart"),qqObj=mainDOM.find(".min-bar-qq"),onlineObj=mainDOM.find(".min-bar-online"),minWid=1280,$tabs=mainDOM.find(".min-text");init()}module.exports=minBar});