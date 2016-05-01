/****************************************************
 *	 Author :	linyandi					        *
 *	 Update :   20140911	     					*
 *   Email  :   wwwlinyandi@126.com                 *
****************************************************/


$(function(){
	var nObj = $("#rateNum"); //记录次数,全局变量,请设置id号为rateNum的容器，容器内容为次数即可
	$(".marking").height($("body").outerHeight()); //初始化遮罩层的高度
	//关闭弹窗
	$(document).on("click",".close-dialog-btn, .close-dialog",function(e){
		$(".marking, .rotate-dialog").hide();
		$(".rotate-dialog").html('<a href="javascript:void(0);" class="close-dialog"></a>').removeClass("ro-good").removeClass("ro-bad");
	});
	$("#rotate_point").rotate({
		bind:{
			click:function(){

						alert('抱歉，活动已结束');
						return false;


				//检查登录
				var is_login = $('#is_login').html();
				is_login = parseInt(is_login);
				if (is_login != 1) {
				    loadLoginDialog();
				    return false;
				};
				//发送请求
				var result = [];
				$.post( "index.php?act=jiaju&op=lottery", function(data) {
					var result = eval ('(' + data + ')');
					var status = parseInt(result.status);
					
					//判断抽奖状态
					if(status == -1) {
						window.location.href = 'http://seller.kinhom.com/index.php?act=login&ref_url=%2Findex.php%3Fact%3Djiaju'
						return false;
					} else if(status == -2) {
						var html = '<div class="ro-dialog-over"><p class="big">本次活动您的抽奖机会已用完，请继续逛逛吧！</p></div>'
						$(".rotate-dialog").append(html).addClass("ro-bad");
						$(".marking, .rotate-dialog").show();
						return false;
					} else if(status == -3) {
						alert(result.msg);
						return false;
					} else if(status == 1) {
						var prize_id = parseInt(result.msg);
						
						var a = runzp(prize_id);
				 		$("#rotate_point").rotate({
					 		duration:4000,    //转盘转的时间
					 		angle: 0, 
            				animateTo:2565+a.angle,    // 2565 是轮盘转动的圈数+45,此处是 7*360+45 = 2565
							easing: $.easing.easeOutSine,
							callback: function(){
								//实物 
								if(a.phyFlag==1){
									var html = '<div class="ro-dialog-phy"><p class="big">恭喜您抽中 <label>'+a.prize+'</label> 一份！</p><p class="small">(只要再购买任意一款商品，即有专人联系你并安排发放赠品)</p><a href="javascript:void(0);" class="close-dialog-btn btn-phy"></a><a href=\"/index.php?act=member&op=address\" target=\"_blank\" class=\"close-dialog-btn btn-info\"></a></div>';
									$(".rotate-dialog").append(html).addClass("ro-good");									
									$(".marking, .rotate-dialog").show();
								}else{
						    	//虚拟
									var html = '<div class="ro-dialog-vir"><p class="big">恭喜您获得</p><p class="small"><label>'+a.prize+'</label> 一份！</p><p class=\"vir-small\">(下单时请选择使用)</p><a href="javascript:void(0);" class="close-dialog-btn btn-vir"></a></div>';									$(".rotate-dialog").append(html).addClass("ro-good");									
									$(".marking, .rotate-dialog").show();
								}
							}
				 		});

					}
					

				});


				
			}
		}
	});
});
/*------------------------------*/
/*   id为奖项id号
/*   prize为对应奖项奖品的提示字样
/*   v为奖项概率 0.0-100.0% 
/*------------------------------*/

// 获取2个值之间的随机数函数
function randomnum(smin, smax) {
	var Range = smax - smin;
	var Rand = Math.random();
	return (smin + Math.round(Rand * Range));
}
// 轮盘转动函数
function runzp(index) {
	var angle = 330;
	var prize = "";
	var msg=msg1=msg2="";
	var phyFlag = 1;
	var myreturn = {};
		msg = "恭喜您抽中";
		tempMsg = "";
		msg1 = "一份！运气不错哦！只要在本网站购买任意一款商品，即可连同此奖品一起送到您家！  继续逛逛>>";
		msg2 = "一份！  我要使用>>"
		var angle0 = [ 0, 18 ];  //5%免单
		var angle1 = [ 22, 63 ];  //决明子
		var angle2 = [ 63, 109 ];  //8%免单
		var angle3 = [ 115, 154 ];   //u型护颈枕
		var angle4 = [ 160, 199 ];  //30%免单
		var angle5 = [ 199, 244 ];  //笔记本
		var angle6 = [ 244, 299 ];  //100%免单
		var angle7 = [ 299, 336 ];  //四件套
		switch (index) {
		case 2://8%免单
			var r2 = randomnum(angle2[0], angle2[1]);
			angle = r2;
			tempMsg = msg1;
			phyFlag = 0;
			prize = "8%免单";
			break;
		case 8:// 5%免单券
			var r0 = randomnum(angle0[0], angle0[1]);
			angle = r0;
			tempMsg = msg1;
			phyFlag = 0;
			prize = "5%免单券";
			break;
			
		case 1://决明子
			var r1 = randomnum(angle1[0], angle1[1]);
			angle = r1;
			tempMsg = msg2;
			phyFlag = 1;
			prize = "决明子";
			break;
		case 3://u型护颈枕
			var r3 = randomnum(angle3[0], angle3[1]);
			angle = r3;
			tempMsg = msg2;
			phyFlag = 1;
			prize = "u型护颈枕";
			break;
		case 4://30%免单
			var r4 = randomnum(angle4[0], angle4[1]);
			angle = r4;
			tempMsg = msg1;
			phyFlag = 0;
			prize = "30%免单";
			break;
		case 5://笔记本
			var r5 = randomnum(angle5[0], angle5[1]);
			angle = r5;
			tempMsg = msg2;
			phyFlag = 1;
			prize = "笔记本";
			break;
		case 6://100%免单
			var r6 = randomnum(angle6[0], angle6[1]);
			angle = r6;
			tempMsg = msg1;
			phyFlag = 0;
			prize = "100%免单";
			break;
		case 7:// 四件套
			var r7 = randomnum(angle7[0], angle7[1]);
			angle = r7;
			tempMsg = msg2;
			phyFlag = 1;
			prize = "四件套";
			break;
		}
	myreturn.prize = prize;
	myreturn.msg = msg;
	myreturn.msg1 = tempMsg;
	myreturn.angle = angle;
	myreturn.phyFlag = phyFlag;
	return myreturn;
}
/*=================================*/
/*         风云榜向上滚动控制
/*=================================*/
jQuery(".ro-slider").slide({
	mainCell:".bd ul",
	autoPlay:true,
	effect:"topMarquee",
	vis:7,                //可见个数
	interTime:50,         //滚动间隔时间
	trigger:"click"
});
/*--------------------------------*/
/*      左边浮层控制
/*--------------------------------*/
/*控制浮层位置*/
$(function(){
	/*控制图层位置，左边上下居中*/
	setFloagFix();
	/*改变窗口大小时重新定位*/
	$(window).resize(function(e) {
        setFloagFix();
    });
});
function setFloagFix(){
	var _screenHei = $(window).height();
	var _objHei    = $(".ro-left-dialog").outerHeight();
	var _objSmallHei    = $(".ro-left-dialog-small").outerHeight();
	var _hei = (_screenHei - _objHei)/2
	var _smallHei = ((_screenHei - _objSmallHei)/2)
	$(".ro-left-dialog").css({
		"top" : _hei + "px"	
	});	
	$(".ro-left-dialog-small").css({
		"top" : _smallHei + "px"	
	});
}
/*关闭浮层*/
$(".ro-left-dialog-close-btn").click(function(e) {
    $(this).parent(".ro-left-dialog").animate({
		"left"   : "-200px"	
	},500);
	$(".ro-left-dialog-small").animate({
		"left"   : 0	
	},500)
	return false;
});
/*打开浮层*/
$(".ro-open-float").click(function(e) {
    $(".ro-left-dialog").animate({
		"left"   : 0	
	},500);
	$(".ro-left-dialog-small").animate({
		"left"   : "-60px"	
	},200)
	return false;
});
/*返回顶部*/
function scrollToWhere(souObj,tarObj){
	var sObj = $(souObj);
	var rObj = $(tarObj);
	sObj.click(function(e) {
        $("html, body").animate({
			scrollTop : rObj.offset().top + "px"	
		},500);
    });
}
scrollToWhere(".ro-left-btn-1",".ro-quan-box");  //免费领券
scrollToWhere(".ro-left-btn-2",".rotate_box");      //幸运抽奖 
scrollToWhere(".ro-left-btn-3",".ro-hot-box");   //人气爆款
scrollToWhere(".ro-left-btn-4",".ro-limit-box"); //限量
scrollToWhere(".ro-left-btn-5",".ro-new-box");    //新品团
scrollToWhere(".ro-left-btn-6","#img_207347");   //客厅专区
scrollToWhere(".ro-left-btn-7","#img_207380");  //卧房专区
scrollToWhere(".ro-left-btn-8","#img_207410");  //餐厅专区
scrollToWhere(".ro-left-btn-9","#img_207122");   //办公专区
scrollToWhere(".ro-left-btn-10","#img_207149");   //儿童专区
scrollToWhere(".ro-left-btn-11","#img_207188");   //套餐专区
scrollToWhere(".ro-left-btn-12","#img_207209");   //清仓专区
scrollToWhere(".go-top","html,body");