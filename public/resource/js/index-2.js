
	$(function(){
		$(".offline-area").mouseover(
				function(){
					$(".offline-area-list").css("display","block")
					}
			);
			$(".offline-area").mouseout(
				function(){
					$(".offline-area-list").css("display","none")
					}
			)
		$(".offline-area h2").click(
			function(){
				$(".offline-area-list").css("display","block")
				}
		);
		$(".offline-area-close").click(
			function(){
				$(".offline-area-list").css("display","none")
				}
		)
		})
		
	$(function(){
		$(".nc-nav-menu3 .choose").hover(
			function(){
				$(".nc-nav-menu3 .choose ul").css("display","block")
				},
			function(){
				$(".nc-nav-menu3 .choose ul").css("display","none")
				}
		)
		})

	$(function(){

	var sw = 0;

	$(".focus .num a").mouseover(function(){

		sw = $(".num a").index(this);

		myShow(sw);

	});

	function myShow(i){

		$(".focus .num a").eq(i).addClass("cur").siblings("a").removeClass("cur");

		$(".focus ul li").eq(i).stop(true,true).fadeIn(600).siblings("li").fadeOut(600);

	}

	//滑入停止动画，滑出开始动画

	$(".focus").hover(function(){

		if(myTime){

		   clearInterval(myTime);

		}

	},function(){

		myTime = setInterval(function(){

		  myShow(sw)

		  sw++;

		  if(sw==5){sw=0;}

		} , 6000);

	});

	//自动开始

	var myTime = setInterval(function(){

	   myShow(sw)

	   sw++;

	   if(sw==5){sw=0;}

	} , 6000);

})

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
	$.jqtab("#tabs","#tab_conbox","mouseenter");
});

//活动页面倒计时，临时添加 by linyandi 20141218
var eTime = "12/19/2014 20:00:00";
$(function(){
	subTime();
});
//倒计时函数
function subTime(){
		var objCount = document.getElementById("J_acCountTime");
		var objDay = document.getElementById("J_countDay");
		var objHour = document.getElementById("J_countHour");
		var objMin = document.getElementById("J_countMin");
		var objSecond = document.getElementById("J_countSecond");
		if(objCount!=null){
		var endtime = new Date(eTime).getTime(); //取结束日期(毫秒值)
		var nowtime =  new Date().getTime(); //今天的日期(毫秒值)
		//var youtime = eTime; //还有多久(毫秒值)
		
		var youtime = endtime - nowtime;
		//console.log(endtime+":"+new Date(sTime).getTime()+":"+youtime);
			var seconds = youtime / 1000;
			var minutes = Math.floor(seconds / 60);
			var hours = Math.floor(minutes / 60);
			var days = Math.floor(hours / 24);
			var CDay = days;
			var CHour = hours % 24;
			var CMinute = minutes % 60;
			var CSecond = Math.floor(seconds % 60); //"%"是取余运算，可以理解为60进一后取余数，然后只要余数。
			
			CDay < 10 ? CDay="0"+CDay : CDay;
			CHour < 10 ? CHour="0"+CHour : CHour;
			CMinute < 10 ? CMinute="0"+CMinute : CMinute;
			CSecond < 10 ? CSecond="0"+CSecond : CSecond;
			//console.log(youtime);
			if(youtime<1000){
				//console.log("done")
				objCount.className = "ac-count-over";
				objDay.style.display = "none";
				objHour.style.display = "none";
				objMin.style.display = "none";
				objSecond.style.display = "none";
				//setAcStatus();  //设置状态和倒计时
				clearTimeout(timer);
			} else {
				//console.log(CDay,CHour,CMinute,CSecond)
				objDay.innerHTML = CDay;
				objHour.innerHTML = CHour;
				objMin.innerHTML = CMinute;
				objSecond.innerHTML = CSecond;
				//eTime = eTime - 1000;
			}
		
		var timer = setTimeout("subTime()", 1000);
		}else{
			return;	
		}
}

