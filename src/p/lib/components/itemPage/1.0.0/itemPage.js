define(function(require, exports, module){
	//主函数
	function itemLoadPage(config){
		var config = config || {};

		var loadURL =  config.loadURL || '';     //加载数据的url
		var curPage =  config.curPage || 1;      //当前页码
		var pages   =  config.pages || 1;        //总页数
		var data    =  config.data || {};   //加载数据的参数

		var dataList = config.dataList || function(){};   //数据列表模板对象 
		var pageList = config.pageList || function(){};   //页码模板对象

		var template = config.template || function(){};
		var dataTplName  = config.dataTplName  || "";
		var pageTplName  = config.pageTplName  || "";

		var dataDom  = config.dataDom || '';    //数据列表容器对象
		var pageDom  = config.pageDom || '';    //页码列表容器对象

		var pageArr = '';        //页码对象数组

		//拼合参数
		var options = '';
		//初始化
		init();

		//初始化函数，默认加载第一页数据
		function init(){
			$.ajax({
				url : loadURL,
				data : data,
				dataType : 'jsonp',
				success : function(result){
					if(result.status=="succ"){
						//设置循环的页数值
						result.data.sPage = getStartPage(result.data.curPage, result.data.pages);
						result.data.ePage = getEndPage(result.data.curPage, result.data.pages);
						//下一页
						result.data.nextPage = result.data.curPage == result.data.pages ? result.data.pages : parseInt(result.data.curPage) + 1;
						//渲染数据列表
						//dataDom.html(dataList(result.data));
						dataDom.html(template(dataTplName, result.data));
						//渲染页码
						//pageDom.html(pageList(result.data));
						pageDom.html(template(pageTplName, result.data));
						//绑定页码对象事件
						addEvent(pageDom);
					}else{
						dataDom.html('暂无数据');
					}
				}
			});
		}
		//添加事件监听
		function addEvent(){
			pageDomID = pageDom.attr("id");

			pageArr = pageDom.find("a");

			pageArr.each(function(index){
				$(this).on("click", function(event){
					event.preventDefault();
					loadMore($(this).attr("data-page"));
				});
			});
		}
		//绑定页码对象
		function addEventListen(obj, type, loadPage){
			if(document.addEventListener){
				obj.addEventListener(type, loadMore, false);
			}else{
				obj.attachEvent("on"+type, loadMore);
			}
		}
		//加载下一页函数
		function loadMore(pageNum) {
			var loadPage = pageNum; //this.getAttribute("data-page");
			$.ajax({
				url : loadURL,
				data : {
					curPage : loadPage
				},
				dataType : 'jsonp',
				success : function(result){
					if(result.status=="succ"){
						//设置循环的页数值
						result.data.sPage = getStartPage(result.data.curPage, result.data.pages);
						result.data.ePage = getEndPage(result.data.curPage, result.data.pages);
						//下一页
						result.data.nextPage = result.data.curPage == result.data.pages ? result.data.pages : parseInt(result.data.curPage) + 1;
						//渲染数据列表
						//dataDom.html(dataList(result.data));
						dataDom.html(template(dataTplName, result.data));
						//渲染页码
						//pageDom.html(pageList(result.data));
						pageDom.html(template(pageTplName, result.data));
						//绑定页码对象事件
						addEvent(pageDom);
					}else{
						dataDom.html('暂无数据');
					}
				}
			})
		}
		//获取开始循环页码
		function getStartPage(cPage, pages) {

			var sPage = 0;
			if(pages <=5) {
				sPage = 1;
				return sPage;
			}
			if(cPage == pages){
				sPage = pages >=7 ? parseInt(pages)-6 : 1;
			}else {
				sPage = cPage <=4 ? 1 : (parseInt(cPage) - 2);
			}
			return sPage;
		}
		//获取结束循环页码
		function getEndPage(cPage, pages) {
			var ePage = 0;
			if(pages<=5){
				ePage = pages;
				return ePage;
			}
			if(cPage == pages ){
				ePage = pages;
			}else{
				ePage = (parseInt(cPage)+2) <= pages ?  (parseInt(cPage)+2) : pages;
			}
			return ePage;
		}
	}

	module.exports = itemLoadPage;
});