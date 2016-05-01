define(function(require, exports, module){
    //加载依赖
    var dialog   = require('../../components/dialog/1.0.0/dialog');

	document.getElementById("J_clubAside").innerHTML = document.getElementById("J_templateClubAside").innerHTML;

    $(".JQ_reason").on("click", function(){
			var resonDialog = new dialog({
				title : '提示',
				content : '<p>&nbsp;</p><p class="tc">未返现原因</p>',
				width : 400,
				height : 50,
				fixed : true
			}).showModal();
	});
});
	