define(function(require, exports, module){

	var minBar = require('../../components/minBar/1.0.1/minBar');
	var tempcomment = require('../../template/tempcomment'); 

	/* =====================================================================
	 *    新版浮动工具栏交互
	 * =====================================================================*/
    minBar({
        mainCell   : '#J_minBar',
        pathConfig : cdnConfig,
        tpl        : tempcomment,
        tplName    : "tplMinBar",
        data : _globalConfig.minBar.data
    });

	document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

});  