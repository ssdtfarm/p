define(function(require, exports, module){
	var slider = require("../components/slider/1.0.0/slider");
	var assortData = [
		//前三组主会场
		{

			"moreLink" : "http://sale.kinhom.com/ac2016assort03", //分会场链接
			"itemSku" : [71375, 7273, 48863],  //大图sku
			"listSku" : [71375,69347,7273,7453, 7441, 48863,0] //组合sku
		},
		{

			"moreLink" : "http://sale.kinhom.com/ac2016assort01", //分会场链接
			"itemSku" : [71372,	42818,	53462],  //大图sku
			"listSku" : [71372,	39254,	42818,49214	,49211,	53462,0] //组合sku
		},
		{

			"moreLink" : "http://sale.kinhom.com/ac2016assort02", //分会场链接
			"itemSku" : [71381,52082,53462],  //大图sku
			"listSku" : [71381,69326,52082,49214,49211,53462,0] //组合sku
		},
		//第一分会场数据
		{

			"moreLink" : "",
			"itemSku" : [71363,	53756,	42689],  //大图sku
			"listSku" : [71363,	41438,	53756,17817,	17835,	42689,0] //组合sku
		},
		{

			"moreLink" : "", //分会场链接
			"itemSku" : [71366,	50945,	71195],  //大图sku
			"listSku" : [71366,	13621,	50945,56174,	56168,	71195,0] //组合sku
		},
		{

			"moreLink" : "",
			"itemSku" : [52037,	51479,	51455],  //大图sku
			"listSku" : [52037,	13621,	51479,51476,	51437,	51455,0] //组合sku
		},
		//第二分会场数据
		{

			"moreLink" : "",
			"itemSku" : [71393,7597	,	18720],  //大图sku
			"listSku" : [71393,	143,	7597,19311,	19308,	18720,0] //组合sku
		},
		{

			"moreLink" : "",
			"itemSku" : [71390,18453,	53453],  //大图sku
			"listSku" : [71390,	69524,	18453,49223,	71396,	53453,0] //组合sku
		},
		{

			"moreLink" : "",
			"itemSku" : [71387,48992,	53453],  //大图sku
			"listSku" : [71387,	143,	48992,49223	,71396,	53453,0] //组合sku
		},
		//第三分会场数据
		{

			"moreLink" : "",
			"itemSku" : [71384,35564,	18720],  //大图sku
			"listSku" : [71384,	69491,	35564,19311,	19308,	18720,0] //组合sku
		},
		{

			"moreLink" : "",
			"itemSku" : [71381,57746,	71195],  //大图sku
			"listSku" : [71381,	41438,	57746,56174,	56168,	71195,0] //组合sku
		},
		{

			"moreLink" : "",
			"itemSku" : [71378,52964,	48863],  //大图sku
			"listSku" : [71378,	41438,	52964,7453,	7441,	48863,0] //组合sku
		}

	];
	$(function() {
		assortInit("JQ_assort", assortData, function (arr) {

			arr.each(function (index) {
				var that = $(this);
				var domID = that.attr("id");
				$("#" + domID).slide({
					mainCell: ".slide-wrap",
					effect: "left",
					trigger: "mouseover",
					pnLoop: false,
					autoPlay: true,
					interTime : 3000,
					switchLoad : "data-original"
				});
			});

		});
	});

	//入口函数
	function assortInit(classname,data, cb) {
		var objArr = $("."+classname);

		objArr.each(function(index){

			var that = $(this);
			var id = that.attr("id").split("_")[2];

			if(data[index]) {
				setSkuLink(data[id-1],that);   //设置大图sku
				setMoreLink(data[id-1], that); //设置进入分会场链接
				setListLink(data[id-1], that); //设置小图链接
			}
		});
		return cb(objArr);
	}

	//设置主页进入分会场的链接
	function setMoreLink(data, target) {
		var findTar = target.find("a.more");
		var tar = findTar.length > 1 ? findTar[0] : findTar;

		if((typeof tar == "object") && data.moreLink != "") {
			tar.attr("href", data.moreLink);
		}
	}
	//设置大图sku链接
	function setSkuLink(data, target) {

		var skuList = target.find(".slide-item");

		skuList.each(function(index){
			var that = $(this);

			var skuLink = "http://item.kinhom.com/" + data.itemSku[index] + ".html";

			that.find("a")[0].href = skuLink;
		});
	}

	//设置小图sku链接
	function setListLink(data, target) {
		var tarBot = target.children(".assort-bottom");

		var skuList = tarBot.find("a");

		skuList.each(function(index){

			var that = $(this);
			var skuLink;

			if(!data.listSku[index]) {
				skulink = "javascript:void(0);";
			} else {
				skuLink = "http://item.kinhom.com/" + data.listSku[index] + ".html";
			}

			that.attr("href",skuLink);
		});
	}
});