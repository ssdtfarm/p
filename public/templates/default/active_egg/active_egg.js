
//建立弹窗
var hasShow = false;   //检测是否第一次弹出
function appendDialog(){

				//检查登录
				isLogin = parseInt(isLogin);
				if (isLogin != 1) {
				    loadLoginDialog();
				    return false;
				};
	
if(!hasShow){
	showDialog();
	hasShow = true;
}else{
	$("#J_acEggDialog,#J_acEggMark").show();	
}
	function showDialog(){
	var acEggStr = '<div class="ac-egg-dialog" id="J_acEggDialog">'
		acEggStr+= '<div class="ac-egg-dialog-top">'
		acEggStr+= '    <a href="javascript:void(0);" class="ac-egg-close-btn" id="J_eggDialogClose"></a>'
		acEggStr+= '</div>'
		acEggStr+= '<div class="ac-egg-dialog-main">'
		acEggStr+= '    <div class="ac-egg-nor nor-left" id="J_leftEgg"></div>'
		acEggStr+= '   <div class="ac-egg-smash smash-left" id="J_leftEggSmash"></div>'
		acEggStr+= '    <div class="ac-egg-gift gift-left-1" id="J_leftGift_1"></div>'
		acEggStr+= '    <div class="ac-egg-gift gift-left-2" id="J_leftGift_2"></div>'
		acEggStr+= '   <div class="ac-egg-nor nor-right" id="J_rightEgg"></div>'
		acEggStr+= '    <div class="ac-egg-smash smash-right-1" id="J_rightEggSmash_0"></div>'
		acEggStr+= '    <div class="ac-egg-smash smash-right-2" id="J_rightEggSmash_1"></div>'
		acEggStr+= '    <div class="ac-egg-smash smash-right-3" id="J_rightEggSmash_2"></div>'
		acEggStr+= '    <div class="ac-egg-gift gift-right-1" id="J_rightGift_0"></div>'
		acEggStr+= '    <div class="ac-egg-gift gift-right-2" id="J_rightGift_1"></div>'
		acEggStr+= '    <div class="ac-egg-gift gift-right-3" id="J_rightGift_2"></div>'
		acEggStr+= '    <div class="ac-egg-hammer" id="J_acEggHammer"></div>'
		acEggStr+= '    <div class="ac-egg-hammer-mark" id="J_hammerWrap"></div>'
		acEggStr+= '    <div class="ac-egg-tip" id="J_acEggTip">'
		acEggStr+= '    	<span class="ac-egg-tip-text">您已参与过活动了，请慢慢挑选喜欢的产品！</span>'
		 acEggStr+= '   	<span class="ac-egg-tip-mark"></span>'
		acEggStr+= '    </div>'
		acEggStr+= '</div>'
		acEggStr+= '<div class="ac-egg-dialog-bottom">'
		acEggStr+= '	<a href="javascript:void(0);" id="J_eggDialogCloseBot"><img src="http://misc.jjcdn.com/templates/default/active_egg/img/ac-egg-bot-img.jpg" width="819" height="168" /></a>'
		acEggStr+= '</div>'
		acEggStr+= '</div>'
		$(document.body).append(acEggStr);
		//添加遮罩层
		$(document.body).append('<div id="J_acEggMark" class="ac-egg-mark"></div>');
		
		//设置遮罩层高度
		$("#J_acEggMark").css({
			"height" : $(document).height()+"px"	
		});
	
	}
}


//模拟数据
// var data = {"status" : "succ" , "giftId" : 2, "hasClick":true}
/*============锤子对应的事件=============*/
//记录是否砸过
var hasClickLeft = false;
var hasClickRight = false;
//标记左右砸蛋范围
var eggPoi    = []   //坐标
var leftCope  = [];  //左边范围
var rightCope = [];  //右边范围

	$(document).on("mousedown","#J_hammerWrap",function(e) {
    $("#J_acEggHammer").css({
		"background" : "url(http://misc.jjcdn.com/templates/default/active_egg/img/ac-egg-spire.png) -160px -207px no-repeat"	
	});
	//console.log(e.offsetX,e.offsetY);
	//判断是否火狐
	if(e.offsetX!=undefined){
		leftCope[0] = 180;
		leftCope[1] = 360;
		leftCope[2] = 200;
		leftCope[3] = 400;
		
		rightCope[0] = 480;
		rightCope[1] = 670;
		rightCope[2] = 200;
		rightCope[3] = 400;
		
		eggPoi[0] = e.offsetX;
		eggPoi[1] = e.offsetY;
		
		//console.log("not firefox");	
	}else{
		leftCope[0] = 180;
		leftCope[1] = 360;
		leftCope[2] = 200;
		leftCope[3] = 400;
		
		rightCope[0] = 480;
		rightCope[1] = 670;
		rightCope[2] = 200;
		rightCope[3] = 400;
		
		eggPoi[0] = e.clientX - parseInt(($(window).width()-819)/2);
		eggPoi[1] = e.clientY - parseInt(($(window).height()-666)/2);
		
		//console.log("firefox");	
	}
	//console.log(eggPoi[0],eggPoi[1]);

	//判断是否砸完了
	if(hasClickRight && hasClickLeft){
		$("#J_acEggTip").show();	
	}
	//砸左边的蛋
	if((eggPoi[0]>=leftCope[0] &&  eggPoi[0]<=leftCope[1]) && (eggPoi[1]>=leftCope[2] &&  eggPoi[1]<=leftCope[3] )){		if(!hasClickLeft){
			hasClickLeft = true;
			$.getJSON("index.php?act=shuangshiyiqxg&op=lottery&type=left",function(data){
				console.log(data);

				if(data.status=="succ"){
					$("#J_leftEgg").hide();
					$("#J_leftEggSmash").fadeIn(500);
				} else {
					alert(data.giftId);
					return false;
				}
				switch(data.giftId){
					case 1 :  
						$("#J_leftGift_1").show();
						break;	
					case 2 : 
						$("#J_leftGift_2").show();
						break;
					default: break;
				}
			});
		}
		//console.log("你砸中了左边的！");	
	}
	//砸右边的蛋
	else if((eggPoi[0]>=rightCope[0] &&  eggPoi[0]<=rightCope[1]) && (eggPoi[1]>=rightCope[2] &&  eggPoi[1]<=rightCope[3] )){		if(!hasClickRight){
			hasClickRight = true;
			$.getJSON("index.php?act=shuangshiyiqxg&op=lottery&type=right",function(data){
				console.log(data);
				
				if(data.status=="succ"){
					$("#J_rightEgg").hide();
				} else {
					alert(data.giftId);
					return false;
				}
				switch(data.giftId){
					case 1 :  
						$("#J_rightEggSmash_0,#J_rightGift_0").fadeIn(500);
						break;	
					case 2 : 
						$("#J_rightEggSmash_1,#J_rightGift_1").fadeIn(500);
						break;
					case 3 : 
						$("#J_rightEggSmash_2,#J_rightGift_2").fadeIn(500);
						break;
					default: break;
				}
			});
		}
		//console.log("你砸中了右边的！");	
	}else{
		
	}
});
$(document).on("mouseup","#J_hammerWrap",function(e) {
    $("#J_acEggHammer").css({
		"background" : "url(http://misc.jjcdn.com/templates/default/active_egg/img/ac-egg-spire.png) -6px -207px no-repeat"	
	});
	//console.log(e.offsetX,e.offsetY);
});
//显示隐藏
$(document).on("mouseover","#J_hammerWrap",function(e) {
    $("#J_acEggHammer").show();
});
$(document).on("mouseout","#J_hammerWrap",function(e) {
    $("#J_acEggHammer").hide();
});
//console.log($("#J_acEggHammer").offset().top)
//图片跟随
$(document).on("mousemove","#J_hammerWrap",function(e) {
	var hammerOffsetLeft = $("#J_acEggHammer").offset().left;
	var hammerOffsetTop = $("#J_acEggHammer").offset().top;
	if(e.offsetX!=undefined){
		var disX = e.offsetX - hammerOffsetLeft;
		var disY = e.offsetY - hammerOffsetTop;
		$("#J_acEggHammer").css({
			"left" : e.offsetX-70 + "px",
			"top" : e.offsetY-60 + "px"	
		});
	}else{
		var disX = ($(window).width() - 819)/2+50;
		var disY = ($(window).height() - 666)/2 + 50;	
		$("#J_acEggHammer").css({
			"left" : e.clientX - disX + "px",
			"top"  : e.clientY - disY + "px"	
		});
	}
    //console.log(e.offsetX,e.offsetY);
});

//关闭当前窗口
$(document).on("click","#J_eggDialogClose,#J_eggDialogCloseBot",function(e) {
	$("#J_acEggDialog,#J_acEggMark").hide();
});

