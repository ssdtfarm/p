define(function(require, exports, module){
	/*
	 mainNav v1.0.0
	 author  linyandi
	 date    2015-03-30
	 */
	function mainNav(config){
		var config = config || {};
		var mainCell = $("."+config.mainCell);
		var lineCell = $("."+config.lineCell);

		var lineWidth = lineCell.innerWidth();

		var staticLeft = 0;

		var curIndex = 0;

		init();

		//初始化函数
		function init(){
			mainCell.find("a.nav-item").each(function(index){
				var ind = index;
				if($(this).hasClass("cur")){
					//设置默认线的位置
					setDefaultLine(ind);
					curIndex = ind;
				}

			});
			//监听鼠标事件
			addEventListen();
			//设置默认左边距
			staticLeft = getStatic(curIndex);
		}
		//console.log(staticLeft);

		function addEventListen(){
			mainCell.find("a.nav-item").each(function(index){
				//鼠标覆盖
				$(this).on("mouseover", function(){
					setDefaultLine(index);
				});
				//鼠标移走
				$(this).on("mouseout", function(){
					backToStatic(curIndex);
				});
			})
		}
		//设置默认位置
		function setDefaultLine(ind) {
			var curWidth = mainCell.find("a.nav-item").eq(ind).outerWidth(true);
			var disWidth = curWidth - mainCell.find("a.nav-item").eq(ind).width();
			//设置线宽以适应不同的宽度
			setLineWidth(ind);

			var left = 0;
			for(var i=0; i<ind; i++){
				left += mainCell.find("a.nav-item").eq(i).innerWidth();
			}

			//设置左边距
			lineCell
				.stop()
				.animate({
					"left" : left + (disWidth / 2)
				},200);

		}
		function getStatic(ind){
			var curWidth = mainCell.find("a.nav-item").eq(ind).outerWidth(true);
			var disWidth = curWidth - mainCell.find("a.nav-item").eq(ind).width();
			var left = 0;
			for(var i=0; i<ind; i++){
				left += mainCell.find("a.nav-item").eq(i).innerWidth();
			}
			//设置静态回归坐标
			return left + (disWidth / 2);
		}
		//回到默认位置
		function backToStatic(index){
			lineCell
				.stop()
				.animate({
					"left" : staticLeft
				},200);
			setLineWidth(index)
		}
		//设置线的宽度跟标签同宽
		function setLineWidth(ind){
			lineCell.css({
				"width" : mainCell.find("a.nav-item").eq(ind).width()
			})
		}
	}
	module.exports = mainNav;

});