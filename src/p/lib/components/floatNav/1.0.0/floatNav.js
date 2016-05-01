define(function(require, exports, module){

function floatNav(config) {
	var config = config || {};
	var domID  = config.domID || "#J_floatNav";

	//console.log($("#J_floatGoTop").html());

	var floatObj = $(domID); //$("#J_floatNav");
	//console.log(floatObj);
	var navHei = floatObj.height();

	//设置浮动窗位置
	setNavOffset();

	//浮窗设置位置函数
	function setNavOffset() {
		var winHei = $(window).height();
		var winWid = $(window).width();
		var disHei = winHei <= navHei ? -((navHei - winHei) / 2) : (winHei - navHei) / 2;
		var disWid = winWid >= 1190 ? (winWid - 1190) / 2 - 50 : 0;

		disHei = disHei >= 100 ? 100 : disHei;

		//设置右上位置
		floatObj.css({
			bottom: disHei + "px",
			right: disWid + "px"
		});
	}

	//通用的鼠标覆盖效果
	$(".JQ_floatNavNormal").on("mouseover", function (event) {
		var that = $(this);
		//设置对象宽度
		that
			.stop()
			.animate({
				"width": "120px"
			}, 200);
		//设置文字
		that
			.children("span")
			.stop()
			.animate({
				"width": "80px"
			})
			.css({
				"color": "#fff"
			})
	});
	//通用的鼠标移除效果
	$(".JQ_floatNavNormal").on("mouseout", function (event) {
		var that = $(this);
		//设置对象宽度
		that
			.stop()
			.animate({
				"width": "40px"
			}, 200);
		//设置文字
		that
			.children("span")
			.stop()
			.animate({
				"width": "40px"
			})
			.css({
				"color": "transparent"
			});
	});
	//监控窗口变换，重设客服位置
	$(window).resize(function () {
		setNavOffset();
	});

	//微信鼠标覆盖效果
	$(".JQ_floatNavWechat").on("mouseover", function (event) {
		var that = $(this);
		event.preventDefault();
		//设置宽度
		that
			.stop()
			.animate({
				// "width"  : "120px",
				// "height" : "0px"
			}, 200);

		that.children("span")
			.stop()
			.animate({
				"width": "76px",
				"height": "76px"
			}, 200)
			.css({
				"left": "-80px",
				"padding": "2px",
				"backgroundColor": "#16458b"
			});

		that.find("img")
			.css({
				"display": "inline-block",
				"width": "76px",
				"height": "76px;"
			});
	})

	//微信鼠标移除效果
	$(".JQ_floatNavWechat").on("mouseout", function (event) {
		var that = $(this);
		event.preventDefault();
		//设置宽度
		that
			.stop()
			.animate({
				"width": "40px",
				"height": "40px"
			}, 200);

		that.children("span")
			.stop()
			.animate({
				"width": "36px",
				"height": "36px"
			}, 200)
			.css({
				"left": "0px",
				"padding": "2px",
				"backgroundColor": "#2f6ceb"
			})

		that.find("img")
			.css({
				"display": "none",
				"width": "36px",
				"height": "36px;"
			});
	});

	//回到顶部按钮
	$("#J_floatGoTop").on("click", function (event) {
		event.preventDefault();

		$("html,body")
			.stop()
			.animate({
				scrollTop: 0
			}, 300);

	});
}
	module.exports = floatNav;
});