define(function(require, exports, module){	
	
	function khSelect(config){
		
		var config = config || {};
		
		var mainCell = config.mainCell || '';     //主容器
		
		var callback = config.callback || null;  //回调函数

		/* 主容器对象*/
		var mainObj = typeof mainCell == 'string' ? (mainCell.indexOf("#")>-1 ? $(mainCell) : $("#"+mainCell) ) : mainCell ;

		/* 列表对象 */
		var listObj = mainObj.find("ul");

		/* 容器的label对象 */
		var mainLabel = mainObj.find(".JQ_option");

		/* 下三角按钮对象 */
		var selectBtn = mainObj.find(".JQ_selectBtn");

		/* 下拉列表项 对象 */
		var option = listObj.find("a");

		/* input 对象*/
		var inputObj = mainObj.find("input");
		/* ul 列表对象 */
		ulObj = mainObj.children("ul");

		/*
		 * 设置初始化 ==========================================
		*/
		//设置主容器的宽度
		mainObj.css({
			"display" : "inline-block",
			"min-width" : parseInt(mainLabel.width()+30)+"px"	
		});
		
		/* 设置下拉列表的宽度 */
		if(ulObj.height()>200){
			ulObj.css({
				"overflow-y" : "scroll",
				"height"     : "200px",
				"min-width"      : parseInt(mainLabel.width()+28)+"px"
			});
		}else{
			ulObj.css({
				"min-width" : parseInt(mainLabel.width()+28)+"px"	
			});
		}
		
		/*
		 * 各种事件 ==========================================
		*/
		/* 点击出现下拉列表 */
		//$(document).on("click",mainLabel,function(event){
		mainLabel.on("click", function(event){
			listObj.slideToggle();	
			event.stopPropagation();
			hideOther(mainObj);
		});
		
		selectBtn.on("click", function(event){
			listObj.slideToggle();	
			event.stopPropagation();
			hideOther(mainObj);
		});
		
		/* 点击列表项 */
			option.on("click", function(event){
				//隐藏列表项
				listObj.slideUp();  
				
				//设置选择值
				mainLabel.html($(this).html()); 
				
				//设置input值
				if(inputObj.length>0) {
					inputObj.val($(this).attr("data-value"))
				};  
				
				//调用回调函数
				/*
				 * 可调用参数
				 * @value  点击项的值
				 * @text   点击项的内容
				 * @obj    点击项的对象。jq对象
				*/
				//console.log(typeof callback);
				typeof callback=='function' ? callback($(this).attr("data-value"), $(this).html(), $(this)) : "";   
				 
				//阻止冒泡
				event.stopPropagation(); 
			});
		
		/* 点击任意地方隐藏 */
		$(document).on("click","body",function(event){
			listObj.slideUp();
			event.stopPropagation();
		});
		//隐藏其它选择菜单
		function hideOther(obj){
			var ID = obj.attr("id");
			$(".select-gray").each(function(index){
				if($(this).attr("id")!=ID){
					$(this).find("ul").slideUp();
				}
			})
		}

	}

	module.exports = khSelect;
});