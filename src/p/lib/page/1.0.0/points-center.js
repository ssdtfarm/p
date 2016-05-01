define(function(require, exports, module){

	var jquery = require('../../jquery/jquery/1.9.1/jquery');
	window.$ = window.jQuery = $;

	var khSelect = require('../../components/khSelect/1.0.0/khSelect');
	var initPage = require('../../components/comment/util'); 

	document.getElementById("J_clubAside").innerHTML = document.getElementById("J_templateClubAside").innerHTML;

	khSelect({
		mainCell : '#J_selectTime'
	})

});
