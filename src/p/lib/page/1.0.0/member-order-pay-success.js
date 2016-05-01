define(function(require, exports){
	$(function(){ 
		/* 处理空白高度 */
		resizeHei();
		$(window).resize(function(e) {
			resizeHei();
		});
		function resizeHei() {
			$("#J_orderPaySuccess").css({
				"height": parseInt($(window).innerHeight() - $("header").innerHeight() - $("footer").innerHeight()) + "px"
			});
		}
	});
});