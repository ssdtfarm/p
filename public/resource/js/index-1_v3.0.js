// jquery plugins begin
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
				if (sw == 3) {
					sw = 0;
				}
			}, 5000);
		});

		//自动开始
		var myTime = setInterval(function() {
			myShow(sw)
			sw++;
			if (sw == 3) {
				sw = 0;
			}
		}, 5000);
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
		btn += "<span>" + (i+1) + "</span>";
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
		$(this).siblings().css("opacity",0.7);
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
		},5000); //此3000代表自动播放的间隔，单位：毫秒
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

/*团购焦点图*/
$(function() {
	var sWidth = $("#focusT").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focusT ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;

	//以下代码添加数字按钮和按钮后的半透明长条
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span>" + (i+1) + "</span>";
	}
	btn += "</div>"
	$("#focusT").append(btn);
	$("#focusT .btnBg").css("opacity",0.5);

	//为数字按钮添加鼠标滑入事件，以显示相应的内容
	$("#focusT .btn span").mouseenter(function() {
		index = $("#focusT .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focusT ul").css("width",sWidth * (len + 1));

	//鼠标滑入某li中的某div里，调整其同辈div元素的透明度，由于li的背景为黑色，所以会有变暗的效果
	$("#focusT ul li div").hover(function() {
		$(this).siblings().css("opacity",0.7);
	},function() {
		$("#focusT ul li div").css("opacity",1);
	});

	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focusT").hover(function() {
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
		$("#focusT ul").stop(true,false).animate({"left":nowLeft},500); //通过animate()调整ul元素滚动到计算出的position
		$("#focusT .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
	}

	function showFirPic() { //最后一张图自动切换到第一张图时专用
		$("#focusT ul li:first").find("script").remove();
		$("#focusT ul").append($("#focusT ul li:first").clone());
		var nowLeft = -len*sWidth; //通过li元素个数计算ul元素的left值，也就是最后一个li元素的右边
		$("#focusT ul").stop(true,false).animate({"left":nowLeft},500,function() {
			//通过callback，在动画结束后把ul元素重新定位到起点，然后删除最后一个复制过去的元素
			$("#focusT ul").css("left","0");
			$("#focusT ul li:last").remove();
		});
		$("#focusT .btn span").removeClass("on").eq(0).addClass("on"); //为第一个按钮添加选中的效果
	}
});

//首页二级导航

	/*$(function(){
		$(".menuer").hover(
			function(){
 	 			$(".nc-nav-menu2").css("display","block");
				},
			function(){
 	 			$(".nc-nav-menu2").css("display","none");
				});
	    })
        */


         /* $(function(){
		$(this).children("ul").hover(
			function(){
 	 			$(".nc-nav-menu2").css("display","block");
				},
			function(){
 	 			$(".nc-nav-menu2").css("display","none");
				});
	      })
         */

    /* $(".nc-nav-menu").hover(function(){
        $(this).children("ul").css("display","block");
        addnc-nav-menu2Class($(this).children("a"));
    },function(){
        $(this).children("ul").css("display","none");
        removenc-nav-menu2Class($(this).children("a"));
    });
});

      function addnc-nav-menu2Class(){
        $($(this).children("a").addClass(".nc-nav-menu2");
      }

      function removenc-nav-menu2Class(){
        $($(this).children("a").removeClass(".nc-nav-menu2");
      }
    */

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
