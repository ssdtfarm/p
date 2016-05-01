// jquery plugins begin
//楼层焦点
(function($){
	$.fn.kfloor = function() {
		var sw = 0;
		var $this = $(this);
		var $num = $this.find(".num a");
		var $slides = $this.find("ul li");

		$num.mouseover(function() {
			sw = $num.index(this);
			myShow(sw);
		});

		function myShow(i) {
			$num.eq(i).addClass("cur").siblings("a").removeClass("cur");
			$slides.eq(i).stop(true, false).show().siblings("li").hide();
		}

		//滑入停止动画，滑出开始动画
		$this.hover(function() {
			if (myTime) {
				clearInterval(myTime);
			}
		}, function() {
			myTime = setInterval(function() {
				myShow(sw)
				sw++;
				if (sw == 2) {
					sw = 0;
				}
			}, 4000);
		});

		//自动开始
		var myTime = setInterval(function() {
			myShow(sw)
			sw++;
			if (sw == 2) {
				sw = 0;
			}
		}, 4000);
	}
})(jQuery);
// jquery plugins end

//首页焦点图
$(function() {
	var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focus ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;

	//以下代码添加数字按钮和按钮后的半透明长条
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span>" +"</span>";
	}
	btn += "</div>"
	$("#focus").append(btn);
	$("#focus .btnBg").css("opacity",0.2);

	//为数字按钮添加鼠标滑入事件，以显示相应的内容
	$("#focus .btn span").mouseenter(function() {
		index = $("#focus .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focus ul").css("width",sWidth * (len + 1));

	//鼠标滑入某li中的某div里，调整其同辈div元素的透明度，由于li的背景为黑色，所以会有变暗的效果
	$("#focus ul li div").hover(function() {
		$(this).siblings().css("opacity",1);
	},function() {
		$("#focus ul li div").css("opacity",1);
	});

	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			if(index == len) { //如果索引值等于li元素个数，说明最后一张图播放完毕，接下来要显示第一张图，即调用showFirPic()，然后将索引值清零
				showFirPic();
				index = 0;
			} else { //如果索引值不等于li元素个数，按普通状态切换，调用showPics()
				showPics(index);
			}
			index++;
		},3000); //此3000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");

	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$("#focus ul").stop(true,false).animate({"left":nowLeft},0); //通过animate()调整ul元素滚动到计算出的position
		$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
	}

	function showFirPic() { //最后一张图自动切换到第一张图时专用
		$("#focus ul li:first").find("script").remove();
		$("#focus ul").append($("#focus ul li:first").clone());
		var nowLeft = -len*sWidth; //通过li元素个数计算ul元素的left值，也就是最后一个li元素的右边
		$("#focus ul").stop(true,false).animate({"left":nowLeft},0,function() {
			//通过callback，在动画结束后把ul元素重新定位到起点，然后删除最后一个复制过去的元素
			$("#focus ul").css("left","0");
			$("#focus ul li:last").remove();
		});
		$("#focus .btn span").removeClass("on").eq(0).addClass("on"); //为第一个按钮添加选中的效果
	}
});

/*分页面焦点图*/
$(function() {
	var sWidth = $("#focus0").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focus0 ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;

	//以下代码添加数字按钮和按钮后的半透明长条
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span>" + (i+1) + "</span>";
	}
	btn += "</div>"
	$("#focus0").append(btn);
	$("#focus0 .btnBg").css("opacity",0.5);

	//为数字按钮添加鼠标滑入事件，以显示相应的内容
	$("#focus0 .btn span").mouseenter(function() {
		index = $("#focus0 .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focus0 ul").css("width",sWidth * (len + 1));

	//鼠标滑入某li中的某div里，调整其同辈div元素的透明度，由于li的背景为黑色，所以会有变暗的效果
	$("#focus0 ul li div").hover(function() {
		$(this).siblings().css("opacity",0.7);
	},function() {
		$("#focus0 ul li div").css("opacity",1);
	});

	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focus0").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			if(index == len) { //如果索引值等于li元素个数，说明最后一张图播放完毕，接下来要显示第一张图，即调用showFirPic()，然后将索引值清零
				showFirPic();
				index = 0;
			} else { //如果索引值不等于li元素个数，按普通状态切换，调用showPics()
				showPics(index);
			}
			index++;
		},3000); //此3000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");

	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$("#focus0 ul").stop(true,false).animate({"left":nowLeft},500); //通过animate()调整ul元素滚动到计算出的position
		$("#focus0 .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
	}

	function showFirPic() { //最后一张图自动切换到第一张图时专用
		$("#focus0 ul li:first").find("script").remove();
		$("#focus0 ul").append($("#focus0 ul li:first").clone());
		var nowLeft = -len*sWidth; //通过li元素个数计算ul元素的left值，也就是最后一个li元素的右边
		$("#focus0 ul").stop(true,false).animate({"left":nowLeft},500,function() {
			//通过callback，在动画结束后把ul元素重新定位到起点，然后删除最后一个复制过去的元素
			$("#focus0 ul").css("left","0");
			$("#focus0 ul li:last").remove();
		});
		$("#focus0 .btn span").removeClass("on").eq(0).addClass("on"); //为第一个按钮添加选中的效果
	}
});

/*体验馆焦点图*/
$(function() {
	var sWidth = $("#focusT_1").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focusT_1 ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;

	//以下代码添加数字按钮和按钮后的半透明长条
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span>" /*+ (i+1) */+ "</span>";
	}
	btn += "</div>"
	$("#focusT_1").append(btn);
	$("#focusT_1 .btnBg").css("opacity",0.5);

	//为数字按钮添加鼠标滑入事件，以显示相应的内容
	$("#focusT_1 .btn span").mouseenter(function() {
		index = $("#focusT_1 .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focusT_1 ul").css("width",sWidth * (len + 1));

	//鼠标滑入某li中的某div里，调整其同辈div元素的透明度，由于li的背景为黑色，所以会有变暗的效果
	$("#focusT_1 ul li div").hover(function() {
		$(this).siblings().css("opacity",0.7);
	},function() {
		$("#focusT_1 ul li div").css("opacity",1);
	});

	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focusT_1").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			if(index == len) { //如果索引值等于li元素个数，说明最后一张图播放完毕，接下来要显示第一张图，即调用showFirPic()，然后将索引值清零
				showFirPic();
				index = 0;
			} else { //如果索引值不等于li元素个数，按普通状态切换，调用showPics()
				showPics(index);
			}
			index++;
		},3000); //此3000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");

	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$("#focusT_1 ul").stop(true,false).animate({"left":nowLeft},500); //通过animate()调整ul元素滚动到计算出的position
		$("#focusT_1 .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
	}

	function showFirPic() { //最后一张图自动切换到第一张图时专用
		$("#focusT_1 ul li:first").find("script").remove();
		$("#focusT_1 ul").append($("#focusT_1 ul li:first").clone());
		var nowLeft = -len*sWidth; //通过li元素个数计算ul元素的left值，也就是最后一个li元素的右边
		$("#focusT_1 ul").stop(true,false).animate({"left":nowLeft},500,function() {
			//通过callback，在动画结束后把ul元素重新定位到起点，然后删除最后一个复制过去的元素
			$("#focusT_1 ul").css("left","0");
			$("#focusT_1 ul li:last").remove();
		});
		$("#focusT_1 .btn span").removeClass("on").eq(0).addClass("on"); //为第一个按钮添加选中的效果
	}
});

/*裝修汇焦点图*/
$(function() {
	var sWidth = $("#focusD").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focusD ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;

	//以下代码添加数字按钮和按钮后的半透明长条
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span>" + (i+1) + "</span>";
	}
	btn += "</div>"
	$("#focusD").append(btn);
	$("#focusD .btnBg").css("opacity",0.2);

	//为数字按钮添加鼠标滑入事件，以显示相应的内容
	$("#focusD .btn span").mouseenter(function() {
		index = $("#focusD .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focusD ul").css("width",sWidth * (len + 1));

	//鼠标滑入某li中的某div里，调整其同辈div元素的透明度，由于li的背景为黑色，所以会有变暗的效果
	$("#focusD ul li div").hover(function() {
		$(this).siblings().css("opacity",0.7);
	},function() {
		$("#focusD ul li div").css("opacity",1);
	});

	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focusD").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			if(index == len) { //如果索引值等于li元素个数，说明最后一张图播放完毕，接下来要显示第一张图，即调用showFirPic()，然后将索引值清零
				showFirPic();
				index = 0;
			} else { //如果索引值不等于li元素个数，按普通状态切换，调用showPics()
				showPics(index);
			}
			index++;
		},3000); //此3000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");

	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$("#focusD ul").stop(true,false).animate({"left":nowLeft},1000); //通过animate()调整ul元素滚动到计算出的position
		$("#focusD .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
	}

	function showFirPic() { //最后一张图自动切换到第一张图时专用
		$("#focusD ul li:first").find("script").remove();
		$("#focusD ul").append($("#focusD ul li:first").clone());
		var nowLeft = -len*sWidth; //通过li元素个数计算ul元素的left值，也就是最后一个li元素的右边
		$("#focusD ul").stop(true,false).animate({"left":nowLeft},1000,function() {
			//通过callback，在动画结束后把ul元素重新定位到起点，然后删除最后一个复制过去的元素
			$("#focusD ul").css("left","0");
			$("#focusD ul li:last").remove();
		});
		$("#focusD .btn span").removeClass("on").eq(0).addClass("on"); //为第一个按钮添加选中的效果
	}
});


//首页楼层Tab标签卡滑门切换
$(function() {
jQuery.jqtab = function(tabtit,tab_conbox,shijian) {
		$(tab_conbox).find("li").hide();
		$(tabtit).find("li:first").addClass("thistab").show();
		$(tab_conbox).find("li:first").show();

		$(tabtit).find("li").bind(shijian,function(){
		  $(this).addClass("thistab").siblings("li").removeClass("thistab");
			var activeindex = $(tabtit).find("li").index(this);
			$(tab_conbox).children().eq(activeindex).show().siblings().hide();
			return false;
		});
	};
	/*调用方法如下：*/
	$.jqtab("#tabs","#tab_conbox","click");
	$.jqtab("#tabs2","#tab_conbox2","mouseenter");
	$.jqtab("#tabs3","#tab_conbox3","mouseenter");
	$.jqtab("#tabs4","#tab_conbox4","mouseenter");
	$.jqtab("#tabs5","#tab_conbox5","mouseenter");
	$.jqtab("#tabs6","#tab_conbox6","mouseenter");
	$.jqtab("#tabs7","#tab_conbox7","mouseenter");
	$.jqtab("#tabs8","#tab_conbox8","mouseenter");
	$.jqtab("#tabs9","#tab_conbox9","mouseenter");
});

//首页排行榜
$(function(){
	$(".mt20 .tab_conbox li.tab_li dl.productph").mouseover(function(){
		$(this).addClass('hover').siblings().removeClass('hover');
		if($(this).index()!=0){
			$(this).css('margin-top','0px');
			$(this).siblings().css('margin-top','0px');
		} else{$(this).siblings().css('margin-top','0px');}
	})
})

//楼层分类效果
$(function(){
	$(".fenlei").hover(
		function(){
			$(this).children(".floor_category").slideDown(200);
		},
		function(){
			$(this).children(".floor_category").hide();
	});
})

//楼层内部焦点图
$(function(){
	$(".floor_focus").each(function(){
		$(this).kfloor();
	});
});

//显示带切换效果楼层的第一张焦点图
$(function(){
	$(".floor_focus").each(function(){
		$(this).find("ul li:first").css("display","block");
	});
});

//顶部广告
 $(function(){
	$(".xx").click(function(){$("#topad").slideUp()});
})

/*顾客声音*/
$(function() {
	var sHeight = $("#Cvoice_show ul").height(); //获取宽度（显示面积）
	var len = $("#Cvoice_show ul").length; //获取焦点图个数
	var index = 0;
	var picTimer;

	//以下代码添加数字按钮和按钮后的半透明长条
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span>" /*+ (i+1) */+ "</span>";
	}
	btn += "</div>"
	$("#Cvoice_show").append(btn);
	$("#Cvoice_show .btnBg").css("opacity",0);

	//为数字按钮添加鼠标滑入事件，以显示相应的内容
	$("#Cvoice_show .btn span").mouseenter(function() {
		index = $("#Cvoice_show .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	//本例为左右滚动，即所有ul元素都是在同一排向左浮动，所以这里需要计算出外框元素的宽度
	$(".Cvoice_slide").css("height",sHeight * (len + 1));

	//鼠标滑入某ul中的某li里，调整其同辈li元素的透明度，由于ul的背景为白色，所以会有变亮的效果
	/*$("#Cvoice_show ul li").hover(function() {
		$(this).siblings().css("opacity",0.7);
	},function() {
		$("#Cvoice_show ul li").css("opacity",1);
	});*/

	//鼠标滑上ul时停止自动播放，滑出时开始自动播放
	$("#Cvoice_show").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			if(index == len) { //如果索引值等于ul元素个数，说明最后一张图播放完毕，接下来要显示第一组ul，即调用showFirPic()，然后将索引值清零
				showFirPic();
				index = 0;
			} else { //如果索引值不等于ul元素个数，按普通状态切换，调用showPics()
				showPics(index);
			}
			index++;
		},5000); //此3000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");

	//显示评论函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowTop = -index*sHeight; //根据index值计算外框元素的top值
		$(".Cvoice_slide").stop(true,false).animate({"top":nowTop},700); //通过animate()调整外框元素滚动到计算出的position
		$("#Cvoice_show .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
	}

	function showFirPic() { //最后一组ul自动切换到第一张图时专用
		$(".Cvoice_slide ul:first").find("script").remove();
		$(".Cvoice_slide").append($(".Cvoice_slide ul:first").clone());
		var nowTop = -len*sHeight; //通过ul元素个数计算元素的top值，也就是最后一个ul元素的右边
		$(".Cvoice_slide").stop(true,false).animate({"top":nowTop},700,function() {
			//通过callback，在动画结束后把外框元素重新定位到起点，然后删除最后一个复制过去的元素
			$(".Cvoice_slide").css("top","0");
			$(".Cvoice_slide ul:last").remove();
		});
		$("#Cvoice_show .btn span").removeClass("on").eq(0).addClass("on"); //为第一个按钮添加选中的效果
	}
});