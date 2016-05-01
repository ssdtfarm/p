function initSlider(config){
	
	//参数
	var config = config || {}
	var sNumber = config['number'] || 5      //默认图片数量，5
	var scrollSpeed = config['speed'] || 3000   //切换速度,默认3秒
	var warpObj = config['dom'] || ""; //包裹层domid
	var showFlag = config['showHide'] || 1;
	var i = iNow = 0;
	var timer = null;
	var noLi = {width:340,height:246,top:124,left:150,zIndex:2};
	var aSort = [];
	//包裹层
	var oBut = document.getElementById(warpObj);
	//showFlag > 1 ? oBut.style.display="none" : oBut.style.display="block";  //隐藏
	//顶部缩略图
	//var oTop = document.getElementById('top');
	//var oTli = oTop.getElementsByTagName('li');
	//内容图片部分
	var aLi = oBut.getElementsByTagName('li');
	var aA = oBut.getElementsByTagName('a');
	//提示文字部分
	var aP = getClass(oBut, 'b_tit');
	//var oSmall = getClass(oTop, 'small')[0];
	
	var aPosition = [
		{width:690,height:500,top:0,left:246,zIndex:10},  //第一张
		{width:540,height:390,top:55,left:100,zIndex:8},  //第二张
		{width:340,height:246,top:124,left:0,zIndex:6},   //中间的
		{width:340,height:246,top:124,left:850,zIndex:6},  //最后一张
		{width:540,height:390,top:55,left:550,zIndex:8},   //倒数第二
	]
		
	if(sNumber>5){
		disNum = sNumber - 5;
		var le=0;
		
		for(var h=0; h<disNum; h++){
			le+=(600/(parseInt(disNum)+1))+50;
			aPosition.splice(h+3,0,{width:340,height:246,top:124,left:le,zIndex:2});
		}
	}
	
	for(i=0;i<aLi.length;i++){
		aLi[i].index = i;
		aLi[i].style.width = aPosition[i].width +'px';
		aLi[i].style.height = aPosition[i].height +'px';
		aLi[i].style.top = aPosition[i].top +'px';
		aLi[i].style.left = aPosition[i].left +'px';
		aLi[i].style.zIndex = aPosition[i].zIndex;
		aSort[i] = aPosition[i];
		myAddEvent(aLi[i], 'mouseover', function(){
			var oDiv = this.getElementsByTagName('div')[0];
			startMove(oDiv, {opacity:1});
			if(this.style.width == '690px'){
				startMove(aP[this.index], {bottom:0});
			}
		});
		myAddEvent(aLi[i], 'mouseout', function(){
			if(this.style.width == '690px'){
				startMove(aP[this.index], {bottom:-120});
			}else{
				var oDiv = this.getElementsByTagName('div')[0];
				startMove(oDiv, {opacity:20});
			}
		});
		myAddEvent(aLi[i], 'click', function(){
			var iSort = this.index;
			iNow = this.index;
			Sort();
			for(i=0;i<iSort;i++){
				aSort.unshift(aSort.pop());
			}
			sMove();
		});
	}
	myAddEvent(aA[0], 'click', function(){
		aSort.unshift(aSort.pop());
		sMove();
		setInter();
	});
	myAddEvent(aA[1], 'click', function(){
		aSort.push(aSort.shift());
		sMove();
		iNow--;
		if(iNow<0)iNow = aLi.length - 1;
		tab();
	});
	
	//oSmall.onmouseover = 
	oBut.onmouseover = function(){
		clearInterval(timer);
	};
	//oSmall.onmouseout = 
	oBut.onmouseout = function(){
		clearInterval(timer);
		timer = setInterval(setInter,scrollSpeed);
	};
	
	timer = setInterval(setInter,scrollSpeed); //自动播放
	function setInter(){
		iNow++;
		if(iNow>aLi.length-1)iNow = 0;
		tab();
	}
	function tab(){
		//for(i=0;i<oTli.length;i++)oTli[i].className = '',startMove(oTli[i], {opacity:20});
		//oTli[iNow].className = 'hove';
		//startMove(oTli[iNow], {opacity:100})
		var iSort = iNow;
		Sort();
		for(i=0;i<iSort;i++){
			aSort.unshift(aSort.pop());
		}
		sMove();
	}
	function Sort(){
		for(i=0;i<aLi.length;i++){
			aSort[i] = aPosition[i];
		}
	}
	function sMove(){
		for(i=0;i<aLi.length;i++){
			var oDiv = aLi[i].getElementsByTagName('div')[0];
			startMove(oDiv, {opacity:20});
			startMove(aLi[i], aSort[i], function(){one();});
			aLi[i].className = '';
		}
		aLi[iNow].className = 'hove';
	}
	function one(){
		for(i=0;i<aLi.length;i++){
			if(aLi[i].style.width == '690px'){
				var oDiv = aLi[i].getElementsByTagName('div')[0];
				startMove(oDiv, {opacity:1});
			}
		}
	}
	one();

function getClass(oParent, sClass){
	var aElem = document.getElementsByTagName('*');
	var aClass = [];
	var i = 0;
	for(i=0;i<aElem.length;i++)if(aElem[i].className == sClass)aClass.push(aElem[i]);
	return aClass;
}
function myAddEvent(obj, sEvent, fn){
	if(obj.attachEvent){
		obj.attachEvent('on' + sEvent, function(){
			fn.call(obj);
		});
	}else{
		obj.addEventListener(sEvent, fn, false);
	}
}
function startMove(obj, json, fnEnd){
	if(obj.timer)clearInterval(obj.timer);
	obj.timer = setInterval(function (){
		doMove(obj, json, fnEnd);
	}, 30);
}
function getStyle(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}
function doMove(obj, json, fnEnd){
	var iCur = 0;
	var attr = '';
	var bStop = true;
	for(attr in json){
		attr == 'opacity' ? iCur = parseInt(100*parseFloat(getStyle(obj, 'opacity'))) : iCur = parseInt(getStyle(obj, attr));
		if(isNaN(iCur))iCur = 0;
		if(navigator.userAgent.indexOf("MSIE 8.0") > 0){
			var iSpeed = (json[attr]-iCur) / 3;
		}else{
			var iSpeed = (json[attr]-iCur) / 5;
		}
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if(parseInt(json[attr])!=iCur)bStop = false;
		if(attr=='opacity'){
			obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")";
			obj.style.opacity = (iCur + iSpeed) / 100;
		}else{
			attr == 'zIndex' ? obj.style[attr] = iCur + iSpeed : obj.style[attr] = iCur + iSpeed +'px';
		}
	}
	if(bStop){
		clearInterval(obj.timer);
		obj.timer = null;		
		if(fnEnd)fnEnd();
	}
}

};