define(function(require, exports, module){

	 function itemAddress(config) {
    	
        var config = config || {};
        //默认参数
    	var tplData = {
    		"defaultPro"    :   config.defaultPro    ||  '广东省',   //默认省份
    		"defaultCity"   :   config.defaultCity   ||  '广州市',   //默认城市
    		"defaultArea"   :   config.defaultArea   ||  '天河区',   //默认地区
    		"defaultProID"  :   config.defaultProID  ||   440000,    //默认省份ID
    		"defaultCityID" :   config.defaultCityID ||   440100,    //默认城市ID
    		"defaultAreaID" :   config.defaultAreaID ||   440106     //默认地区ID
    	};
        var tpl = config.tpl || null;   //模板对象
		 var tplName = config.tplName || null; //模板名称
        var  proCallback = config.proCallback  || function(){};//省份点击回调函数
        var cityCallback = config.cityCallback || function(){};//城市点击回调函数
        var areaCallback = config.areaCallback || function(){};//区域点击回调函数
        // console.log(tpl());
        //是否鼠标移出消失
        var flag = false;
		 //console.log(tpl('item/tplItemAddress',tplData));
        //主容器
        var mainCell = typeof config.dom == 'string' ?  (config.dom.indexOf("#") > -1 ? $(config.dom) : $("#"+config.dom))  : config.dom;
        // console.log(mainCell);
        //渲染模板
        mainCell.html(tpl(tplName,tplData));

        //显示框对象
        var labelObj = mainCell.find("#J_addressLabel");
        // console.log(labelObj);
        //下拉选择框容器对象
        var selector = mainCell.find("#J_selector");
        // console.log(selector);
        //下拉框导航对象
        var selectorNav = mainCell.find("#J_selectorNav");

        //省份地址容器
        var proContainer = $(".JQ_selectorItem_0");
        //市级地址容器
        var cityContainer = $(".JQ_selectorItem_1");
        //地区地址容器
        var areaContainer = $(".JQ_selectorItem_2");
        //加载省份
        loadPro(proContainer);
        //加载城市
        loadCity(cityContainer, tplData.defaultProID);
        //加载地区
        loadArea(areaContainer, tplData.defaultCityID);

        //鼠标覆盖事件
        labelObj.on("click", function(event){
        	event.preventDefault();
        	//添加样式
        	$(this).addClass("hover");
        	//显示下拉容器
        	selector.show();
        });
        //鼠标移除事件
       
        //选择框鼠标移除事件
        
        //关闭下拉选择框
        $(document).on("click","#J_close", function(event){
        	event.preventDefault();
        	//去掉样式
        	labelObj.removeClass("hover");
        	//隐藏下拉容器
        	selector.hide();
        });
        //导航tab切换
        $(".JQ_navItem").each(function(index){
        	var ind = index;
        	var that = $(this);
        	that.on("click", function(event){
        		event.preventDefault();
        		if(!that.hasClass("on")){
        			//切换样式
        			that.addClass("on")
        				.siblings("a")
        				.removeClass("on");
        			//对应内容
        			$(".JQ_selectorItem_"+ind)
        				.show()
        				.siblings("ul")
        				.hide();
        		}
        	});
        });
        //选择省份事件
        $(document).on("click", ".JQ_selectorItem_0 a", function(event){
        	var pID = $(this).attr("data-id");
        	var pName = $(this).html();
        	event.preventDefault();
        	//修改导航内容
        	$(".JQ_navItem")
        	.eq(1)
        	.addClass("on")
        	.show()
        	.siblings()
        	.removeClass("on");
        	//省级单位导航变换
        	$(".JQ_pro")
        	.html(pName)
        	.attr("data-id", pID);
        	//市级单位导航变换
        	$(".JQ_city").html("请选择");
        	//清空市级单位内容
        	cityContainer.html('<div class="loading"><i></i></div>');
        	//显示和隐藏内容容器
        	proContainer.hide();
        	cityContainer.show();
        	areaContainer.hide();
        	//加载数据到市级容器
        	loadCity(cityContainer, pID);
           	//隐藏区域单位
           	$(".JQ_navItem")
           	.eq(2)
           	.html('<span class="JQ_area" data-id="">请选择</span><i class="icon-select-down-small"></i>')
           	.addClass("on")
           	.hide();
           	//区域容器清空
           	areaContainer.html('<div class="loading"><i></i></div>');
        	//调用区域回调函数
        	doCallback(proCallback, $(this));
        });
        //选择市级单位事件
        $(document).on("click", ".JQ_selectorItem_1 a", function(event){
        	event.preventDefault();

        	// var pID = $(this).attr("parent-id");
        	var ID  = $(this).attr("data-id");
        	var pName = $(this).html();

        	//添加区域单位的nav
        	$(".JQ_city")
        	.attr("data-id", ID)
        	.html(pName);
        	//去除市级单位的on
        	$(".JQ_navItem")
        	.eq(1)
        	.removeClass("on");

        	$(".JQ_navItem")
        	.eq(2)
        	.show()
        	.addClass("on")
        	.html('<span class="JQ_area" data-id="">请选择</span><i class="icon-select-down-small"></i>');
        	//显示和隐藏内容容器
        	proContainer.hide();
        	cityContainer.hide();
        	areaContainer.show();

        	areaContainer.html('<div class="loading"><i></i></div>');

        	//加载地区数据
        	loadArea(areaContainer, ID);
        	//调用区域回调函数
        	doCallback(cityCallback, $(this));
        });
        //选择区域事件
        $(document).on("click", ".JQ_selectorItem_2 a", function(event){
        	event.preventDefault();
        	flag = true;
        	var ID = $(this).attr("data-id");
        	var pName = $(this).html();
        	//赋值给对应的导航
        	$(".JQ_area")
        	.attr("data-id", ID)
        	.html(pName);
        	//关闭弹窗
        	selector.hide();
        	//变换样式
        	labelObj.removeClass("hover");
        	//选中内容赋值到显示的label
        	setLabel();
        	//调用区域回调函数
        	doCallback(areaCallback, $(this));
        });

        //调用回调函数
        function doCallback(fun, obj) {
        	return fun(obj); 
        }
        //设置选中值到label
        function setLabel() {
        	var value = "";
        	$(".JQ_navItem").each(function(){
        		var itemVal = $(this).find("span").html();
        		value += itemVal;
        	});
        	$("#J_label").html(value);
        }
        /*
		 * 加载数据函数 =========================================
        */
        /**
         * 加载省份函数
         * @param {obj} 放数据的容器对象
         */
        function loadPro(obj) {
        	var proHtml = '';

        	$.ajax({
        		url : 'http://api.kinhom.com/region/pro',
        		dataType : 'jsonp',
        		success : function(res) {
        			for(var i=0; len = res.length, i<len; i++){
        				proHtml += '<li>';
        				proHtml += '<a href="javascript:void(0)" data-id="'+ res[i].region_id+'" parent-id="'+ res[i].parent_id +'">'+ res[i].region_name +'</a>';
						proHtml	+= '</li>';
					}
					obj.html(proHtml);
        		}
        	});
        }
        /**
		 * 加载市级单位函数 
		 * @param {obj}       加载容器对象
		 * @param {parentID}  父id号
		 * demo: loadCity(obj, parentID);
        */
        function loadCity(obj, parentID) {
        	var cityHtml = '';

        	$.ajax({
        		url : 'http://api.kinhom.com/region/city/' + parentID,
        		dataType : 'jsonp',
        		success  : function(res) {
        			for(var i=0; len = res.length, i<len; i++){
        				cityHtml += '<li>';
        				cityHtml += '<a href="javascript:void(0)" data-id="'+ res[i].region_id+'" parent-id="'+ res[i].parent_id +'">'+ res[i].region_name +'</a>';
						cityHtml += '</li>';
					}
					obj.html(cityHtml);
        		}
        	});
        }
        /**
		 * 加载地区单位函数 
		 * @param {obj}       加载容器对象
		 * @param {parentID}  父id号
		 * demo: loadCity(obj, parentID);
        */
        function loadArea(obj, parentID) {
        	var areaHtml = '';

        	$.ajax({
        		url : 'http://api.kinhom.com/region/area/' + parentID,
        		dataType : 'jsonp',
        		success  : function(res) {
        			for(var i=0; len = res.length, i<len; i++){
        				areaHtml += '<li>';
        				areaHtml += '<a href="javascript:void(0)" data-id="'+ res[i].region_id+'" parent-id="'+ res[i].parent_id +'">'+ res[i].region_name +'</a>';
						areaHtml += '</li>';
					}
					obj.html(areaHtml);
        		}
        	});
        }
    }

	module.exports = itemAddress;
});