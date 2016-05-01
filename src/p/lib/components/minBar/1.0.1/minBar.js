define(function(require, exports, module){

	//浮动工具交互函数
	function minBar(config) {

		var mainID = config.mainCell || '#J_minBar';
		//模板对象
		var template   = config.tpl || function() {};
		//模板名称
		var tplName    = config.tplName || "comment/tplMinBar";
		//配置数据, 2016-02-01 add by linyandi
		var data = config.data || {};
		//直接添加到body上
		$("body").append(template(tplName, data));

		//主容器对象
		var mainDOM = mainID.indexOf("#")>-1 ? $(mainID) : $("#"+mainID);   //获取容器对象
		//返回顶部按钮对象
		//var goTopObj  = mainDOM.find("#J_minBarGoTop");
		var goTopObj  = mainDOM.find(".min-bar-gtop");

		//微信按钮对象
		var wechatObj = mainDOM.find(".min-wechat");

		//手机app按钮对象
		var appObj = mainDOM.find(".min-phone");

		//调查按钮对象
		var feedbackObj = mainDOM.find(".min-bar-feedback");

		//购物车按钮对象
		var cartObj   = mainDOM.find(".min-cart");

		//qq按钮对象
		var qqObj = mainDOM.find(".min-bar-qq");

		//在线客服对象
		var onlineObj = mainDOM.find(".min-bar-online");
		//var onlineObj = mainDOM.find(".JQ_minBarOnline");

		//背景遮罩层
		var minBarMark = $(".min-bar-mark");

		//在线客服弹出泡泡
		var popObj = $(".min-bar-online-pop");

		//关闭泡泡对象
		var closePop = $(".pop-close");
		var popChat  = $(".pop-chat");

		//最小标准宽度
		var minWid = 1280;

		//获取tab列表
		var $tabs = mainDOM.find(".min-text");

		//第一次弹出标记
		var popFirst  = false;
		//第二次弹出标记
		var popSecond = false;
		//三次弹出的间隔
		var firtTime  = "30000";
		var secodTime = "180000";
		var thirdTime = "180000";

		var hideTime  = "5000";

		//初始化
		init();
		//timeout对象
		var timeout;

		/*
		 *  初始化函数
		 */
		function init() {
			//显示在线客服泡泡,默认5秒显示
			popOnline(firtTime);
			//获取购物车数量
			getMinCartNum();

			//设置列表的位置
			setPluginOffset("#J_minBarPlugin");

			//设置主容器位置的大小
			setMinBarOffset($(window).innerWidth());
			$(window).resize(function(){
				setMinBarOffset($(window).innerWidth());
			});

			//监听列表tab
			$tabs.each(function (index) {
				var that = $(this);

				that.on("mouseover", function (event) {
					that.find("span.text").stop(true, true).delay(300).animate({
						"right": "40px",
						"opacity": 1
					}, 300);
					//console.log(that);
				}).on("mouseleave", function (event) {
					that.find("span.text").stop(true, true).animate({
						"right": "-80px",
						"opacity": 0.1
					}, 300);
				}).on("click", function (event) {
					var URL = that.find("a.blankLink").attr("href");
					try {
						if (URL.indexOf("http") > -1 || URL.indexOf("https") > -1) {
							window.open(URL);
						}
					}catch(erro){

					}
				});

			});

			//购物车按钮显示购物车列表
			cartObj.hover(function () {
					$("#J_minBarPlugin").stop(true, true).fadeIn(300);
					//获取购物车信息
					getCartInfo();
				},
				function () {
					$("#J_minBarPlugin").stop(true, true).hide();
				});

			// show wechat img
			wechatObj.on("mouseenter", function (event) {
				$(this).find(".min-bar-wechat-img")
					.stop(true, true)
					.css({
						"display": "block"
					})
					.delay(200)
					.animate({
						"width": "140px",
						"height": "164px",
						"padding" : "5px",
						"top"  : "-40px",
						"opacity": 1
					}, 300);
			}).on("mouseleave", function (event) {
				$(this).find(".min-bar-wechat-img")
					.stop(true, true)
					.css({
						"display": "none"
					})
					.animate({
						"width": "36px",
						"height": "36px",
						"opacity": 0
					}, 300);
			});

			// show app img
			appObj.on("mouseenter", function (event) {
				$(this).find(".min-bar-phone-img")
					.stop(true, true)
					.css({
						"display": "block"
					})
					.delay(200)
					.animate({
						"width": "160px",
						"height": "250px",
						"top"  : "-80px",
						"opacity": 1
					}, 300);
			}).on("mouseleave", function (event) {
				$(this).find(".min-bar-phone-img")
					.stop(true, true)
					.css({
						"display": "none"
					})
					.animate({
						"width": "36px",
						"height": "36px",
						"opacity": 0
					}, 300);
			});

			//返回顶部事件
			goTopObj.on("click", function (event) {
				$("body,html").stop(true, true).animate({
					scrollTop: 0
				}, 300);
			});


			//关闭在线客服弹窗
			closePop.on("click", function(event){
				event.preventDefault();
				popObj.fadeOut(300);
				clearTimeout(timeout);

				if(!popFirst) {
					popFirst = true;
					popOnline(secodTime);

				}else if(!popSecond){
					popSecond = true;
					popOnline(thirdTime);
				}

			});
			// 鼠标移到对于图标时触发
			onlineObj.hover(function(){
				//console.log("sdfsdf");
				popObj.stop(true, true).fadeIn(300);
				clearTimeout(timeout);

				if(!popFirst) {
					popFirst = true;
					popOnline(secodTime);

				}else if(!popSecond){
					popSecond = true;
					popOnline(thirdTime);
				}

			},function(){
				popObj.stop(true, true).fadeOut(300);
				clearTimeout(timeout);

				if(!popFirst) {
					popFirst = true;
					popOnline(secodTime);

				}else if(!popSecond){
					popSecond = true;
					popOnline(thirdTime);
				}
			});
			//点击在线客服弹窗
			popChat.on("click", function(event){
				popObj.fadeOut(300);
				clearTimeout(timeout);

				if(!popFirst) {
					popFirst = true;
					popOnline(secodTime);

				}else if(!popSecond){
					popSecond = true;
					popOnline(thirdTime);
				}

			});

			//监听删除商品列表按钮
			$(document).on("click", ".JQ_minBarDelete", function(event){
				event.preventDefault();
				var cartID = $(this).attr("data-id");
				var item = $(this).parents("li");

				$.ajax({
					url : cdnConfig.cartApiPath + '/delete/' + cartID,
					dataType : 'jsonp',
					success  : function(res) {
						//console.log(res);
						if(res.status=="succ") {
							item.addClass("delItem");

							item.fadeOut(300,function(){
								$(".delItem").remove();
								//设置列表内容状态
								setCartInfo();
								//设置列表位置
								setPluginOffset("#J_minBarPlugin");
							});

						}else{
							//设置列表内容状态
							setCartInfo();
							//设置列表位置
							setPluginOffset("#J_minBarPlugin");
						}


					}
				});


			});
		}
		//
		function popOnline(time) {
			setTimeout( function(){ popObj.fadeIn(200); hidePop(5000); }, time);
		}
		function hidePop(t) {
			t = isNaN(t) ? 5000 : t;
			timeout = setTimeout( function(){
				popObj.fadeOut(200);
				//第一次
				if(!popFirst) {
					popFirst = true;
					popOnline(secodTime);

				}else if(!popSecond){
					popSecond = true;
					popOnline(thirdTime);
				}

			}, t);
		}
		/*
		 *     设置主容器大小和tab位置函数
		 * */
		function setMinBarOffset(w) {

			isNaN(w) ? w=$(window).innerWidth() : w;

			if(w<minWid) {
				//默认显示简化导航
				showLiteBar();
				hideMark();

				cartObj.on("mouseenter", function(event){
					event.stopPropagation();
					showMark();
					showAllBar();
				});
				onlineObj.on("mouseenter", function(event){
					event.stopPropagation();
					showMark();
					showAllBar();
				});
				qqObj.on("mouseenter", function(event){
					event.stopPropagation();
					showMark();
					showAllBar();
				});
				goTopObj.on("mouseenter", function(event){
					event.stopPropagation();
					showMark();
					showAllBar();
				});

				mainDOM.on("mouseleave",function(event){
					event.stopPropagation();
					event.preventDefault();
					hideMark();
					showLiteBar();
				});

			}else {
				showAllBar();
				showMark();
			}
		}
		//显示蒙层
		function showMark() {
			minBarMark.stop(true, true).delay(300).animate({
				"right" : "0px"
			},300);
		}
		//隐藏蒙层
		function hideMark() {
			minBarMark.stop(true, true).delay(300).animate({
				"right" : "-40px"
			},300);
		}
		//显示缩小版导航条
		function showLiteBar() {

			appObj.stop(true, true).animate({
				"right" : "-40px"
			});
			wechatObj.stop(true, true).animate({
				"right" : "-40px"
			});
			feedbackObj.stop(true, true).animate({
				"right" : "-40px"
			});
		}
		//显示完整导航条
		function showAllBar() {

			appObj.stop(true, true).delay(300).animate({
				"right" : "0px"
			});
			wechatObj.stop(true, true).delay(300).animate({
				"right" : "0px"
			});
			feedbackObj.stop(true, true).delay(300).animate({
				"right" : "0px"
			});
		}
		/*
		 *    获取购物车信息
		 * */
		function getCartInfo() {
			//console.log("sfsdf");
			//异步获取数据,获取购物车信息
			$.ajax({
				url : cdnConfig.apiPath + '/cart/minilist',
				//url : 'http://api.jiajucn.com/cart/minilist',
				dataType : 'jsonp',
				success : function(res) {
					var html = '';

					if(res.code == "200") {
						var list = res.data.list;
						if(list.length>0) {
							for (var i = 0; i < list.length; i++) {

								html += '<li>';
								html += '<div class="plugin-cart-list-img">';
								html += '<a href="' + list[i].link + '" target="_blank">';
								html += '<img src="' + list[i].src + '" width="90" height="60" alt="' + list[i].title + '"/>';
								html += '</a>';
								html += '</div>';
								html += '<div class="plugin-cart-list-title">';
								html += '<a href="' + list[i].link + '" target="_blank" title="' + list[i].title + '">' + list[i].title + '</a>';
								html += '</div>';
								html += '<div class="plugin-cart-list-info">';
								html += '<p class="list-price">&yen; <span class="JQ_minCartItemPrice">' + list[i].price + '</span></p>';
								html += '<p class="list-num">x <span class="JQ_minCartItemNum">' + list[i].num + '</span></p>';
								html += '<input type="hidden" class="JQ_minCartItemTotal" value="' + (list[i].price * list[i].num) + '" />';
								html += '</div>';
								html += '<a class="cart-list-delete-btn JQ_minBarDelete" data-id="' + list[i].cart_id + '" href="javascript:void(0);" target="_blank">x</a>';
								html += '</li>';

								setListInfo(html, "no");
							}
						}
					}else{
						//console.log(res.msg);
						html = '<li>您的购物车空空的~</li>';
						setListInfo(html,"yes");
					}


					//设置价格数量和按钮
					setCartInfo();

					//设置列表的位置
					setPluginOffset("#J_minBarPlugin");
				},
				error   : function(err) {
					//console.log(err);
				}
			});
		}
		/*
		 *    计算数量+计算总计+设置按钮状态
		 * */
		function setCartInfo() {
			//计算价格
			mountTotal(".JQ_minCartItemTotal", "#J_minBarCartTotal");
			//计算数量
			mountNumber(".JQ_minCartItemNum", "#J_minBarCartNum");
			//设置按钮
			setBtn("#J_minBarBtn","#J_minBarCartNum");
			//设置小圆圈数量
			//setCartNumber();
		}
		/*
		 *   设置小圆圈数量
		 * */
		function setCartNumber(domID, num) {
			$(domID).html(num);
		}
		/*
		 *   设置按钮状态
		 * */
		function setBtn(domID, numID) {
			var url = "http://cart.kinhom.com/list.html";
			var numObj = $(numID);
			var btnObj = $(domID);
			if(parseInt(numObj.html())>0){
				btnObj.removeClass("btn-gray")
					.addClass("btn-orange")
					.attr("href",url);
			}else{
				btnObj.removeClass("btn-orange")
					.addClass("btn-gray")
					.attr("href","javascript:void(0);");
			}
		}
		/*
		 *    计算数量
		 * */
		function mountNumber(className, tarID) {
			var tarDOM = $(tarID);
			var num    = 0;
			//console.log($(className).length);
			if($(className).length>0) {
				$(className).each(function () {
					num += parseInt($(this).html());
				});

			}else{
				var html = '<li>您的购物车空空的~</li>';
				setListInfo(html,"yes");
				setBtn("#J_minBarBtn","#J_minBarCartNum");
				//setPluginOffset()
			}
			tarDOM.html(num);
			//setCartNumber("#J_cartNum", $(className).length);
			//console.log(tarDOM, num);
			setCartNumber("#J_cartNum", num);
		}
		/*
		 *    计算总价函数
		 * */
		function mountTotal(className, tarID) {
			var tarDOM = $(tarID);
			var price  = 0;
			if($(className).length>0) {
				$(className).each(function () {
					price += parseInt($(this).val());
				});
				tarDOM.html(price);
			}else{
				tarDOM.html(0);
			}
		}
		/*
		 *   设置购物车列表容器位置函数
		 * */
		function setPluginOffset(domID) {
			var DOM = $(domID);
			var domHei = DOM.innerHeight();
			DOM.css({
				"top" : "50%",
				"margin-top" : "-"+parseInt(domHei/2)+"px"
			})
		}
		/*
		 *   设置列表内容和按钮状态函数
		 * */
		function setListInfo(html,type) {
			switch(type){
				case 'yes':
					$("#J_pluginCart").addClass("plugin-cart-empty").removeClass("plugin-cart-list").html(html);
					break;
				case 'no':
					$("#J_pluginCart").removeClass("plugin-cart-empty").addClass("plugin-cart-list").html(html);
					break;
				default :
					break;
			}

		}
		/*
		*     获取购物车数量
		* */
		function getMinCartNum() {
			$.ajax({
				url : cdnConfig.apiPath + '/cart/statistics',
				dataType : "jsonp",
				success  : function(res) {
					//console.log(res);
					if(res.status=="succ") {
						setCartNumber("#J_cartNum", res.data.num);
					}else {
						setCartNumber("#J_cartNum", 0);
					}
				},
				error    : function(err) {
					//console.log(err);
				}
			})
		}

	}
	module.exports = minBar;
});