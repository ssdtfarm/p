define(function(require, exports, module){
	//var dialog = require("./dialog");
	// console.log(dialog);
	function khCheckbox(config){

		var config = config || {}
		//主容器ID号
		var mainCell = config.mainCell || "form";
		//按钮数组
		var button = config.button || [];
		//回调函数
		var callback = config.callback || function(){};
		//主容器
		var mainObj = typeof mainCell == "string" ? (mainCell.indexOf("#") >-1 ? $(mainCell) : $("#"+mainCell)) : mainCell;
		//全选的参数和回调函数
		var chkAllObj = $(config.chkAll.domID) || $(".JQ_chkAll");
		var chkAllCallback = config.chkAll.callback || function() {};

		//单选的参数和回调函数
		var chkItem = $(config.chkItem.domID) || $(".JQ_chkItem"); //$(".JQ_chkItem");
		var itemCallback = config.chkItem.callback || function() {}

		//按钮数组进行参数赋值
		for(var i=0; i<button.length; i++){
			addEventListen(button[i].domID, "click", button[i].callback);
		}

		//单选
		chkItem.on("click", function(event){
			event.preventDefault();
			
			//变换样式和选值
			toggleCheck($(this));

			

			// console.log(getItemNum(), getChkNum());
			//设置全选
			if(getItemNum() == getChkNum()){
				toggleCheck(chkAllObj);
			}else {
				reChkAll();
			}


			//调用单选的回调函数
			doCallback(itemCallback, $(this));
		});
		//全选 
		chkAllObj.each(function(index){
			$(this).on("click", function(event){
				event.preventDefault();
				//回调函数
				
				//变换样式和选值
				toggleCheck($(this));
				//选中和不选中全部
				if($(this).hasClass("icon-box-checked")){
					chkAllItem();
				} else {
					reChkAllItem();
				}

				//调用单选的回调函数
				doCallback(chkAllCallback, $(this));
			});
		});
		//绑定按钮组事件
		function addEventListen(domID, type, fun){
			
			var obj = $(domID); 

			// $("#"+domID);
			obj.on(type, function(event){
				//阻止默认事件
				event.preventDefault();
				var that = $(this);
				var thatURL = that.attr("href");
				var targetType = that.attr("target");
				// console.log(getChkItems());
				//没有选择就提示
				if(joinParam(getChkItems())==""){
					try{
						var tipDialog = new dialog({
							title : '提示',
							width : 400, 
							content : '<p>&nbsp;</p><p class="tc fs-14">请选择要操作的选项！</p>',
							fixed : true,
							button :[
								{
									value : "确定",
									className : 'ui-btns-orange',
									callback : function() {}
								}
							]
						}).showModal();
					}catch(e){
							alert("请选择要操作的选项！");
					}
					
					return false;
				}else{
					var openURL = thatURL+ '?params=' +joinParam(getChkItems());
				}
				//执行回调函数,判断是否返回了false，如果是true或者无定义返回值，则按照页面设定跳转。
				var doCall = doCallback(fun, that);
				// console.log(doCall);
				if(doCall || doCall==undefined) {
					openWin(targetType, openURL)
				}
				//打开新页面
				
			});	
		}
		/*
		 * 按钮回调函数，返回
		 * @param btnObj  当前点击的对象，jq对象
 		 * @param mainObj 表单对象，jq对象
		 */
		function doCallback(callback, btnObj){
			return callback(btnObj, mainObj);
		}
		//打开新窗口
		function openWin(targetType, openURL){
			(targetType == undefined || targetType == "_self") ? window.location.href = openURL : window.open(openURL, "新页面");
		}
		//拼合参数
		function joinParam(objArr) {
			var temp = [];
			for(var i=0; i<objArr.length; i++){
				temp.push(objArr[i].value);
			}
			return temp;
		}
		//变换classname
		function toggleCheck(obj) {
			obj.toggleClass("icon-box-checked");
			if(obj.hasClass("icon-box-checked")){
				// obj.removeClass("icon-box-checked");
				//先删除
				// obj.siblings("input").removeAttr("checked");
				//再添加
				obj.siblings("input").attr("checked", "checked");
			}else {
				// obj.removeClass("icon-box-checked");
				obj.siblings("input").removeAttr("checked");
			}
		}
		//获取选中对象集合
		function getChkItems() {
			// return $("input[name=chkItem]:checked");
			return $("input[checked=checked][name=chkItem]");
		}
		//获取选中数量
		function getChkNum() {
			return $("input[checked=checked]").length;
		}
		//获取item的个数
		function getItemNum() {
			return $("input[name=chkItem]").length;
		}
		//选中全部
		function chkAllItem() {
			chkItem.each(function(index){
				$(this).addClass("icon-box-checked");
				$(this).siblings("input").attr("checked", "checked");
			});
			chkAllObj.each(function(index){
				$(this).addClass("icon-box-checked");
			});
		}
		//取消全部
		function reChkAllItem() {
			chkItem.each(function(index){
				$(this)
				.removeClass("icon-box-checked")
				.siblings("input").removeAttr("checked");

			});
			chkAllObj.each(function(index){
				$(this).removeClass("icon-box-checked");
			});
		}
		//取消全部的全选
		function reChkAll() {
			chkAllObj.each(function(index){
				$(this).removeClass("icon-box-checked");
			});
		}
	}

	module.exports = khCheckbox;
});