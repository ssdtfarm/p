/*---------------------*/
/*  author : linyandi
/*  uodate : 2014-09-23
/*---------------------*/
$(function(){
	//上下定位
	FixTop("ui-national-left");
	$(window).resize(function(e) {
        FixTop("ui-national-left");
    });
	//滚动到对应位置
	$(".ui-national-left li").each(function(index, element) {
		if($(this).hasClass("top")){
			scrollToWhere($(this),"html,body");	
		}else{
			scrollToWhere($(this),"#tar_"+index);	
		}
    });
	//关闭浮层
	$(".national-close-btn").click(function(e) {
        $(this).parent().hide();
    });
});
//上下定位
function FixTop(objId){
	var _screenHei = $(window).height();
	var _obj = $("."+objId);
	var _objHei    = _obj.outerHeight();
	var _hei = (_screenHei - _objHei)/2
	_obj.css({
		"top" : _hei + "px"	
	});	
}
//滚动到对应位置
function scrollToWhere(souObj,tarObj){
	var sObj = $(souObj);
	var rObj = $(tarObj);
	sObj.click(function(e) {
        $("html, body").animate({
			scrollTop : rObj.offset().top + "px"	
		},500);
    });
}
