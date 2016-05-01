define(function(require){

    var tempstatic  = require("../../template/tempstatic");
    var tempcomment = require("../../template/tempcomment");
    var minBar = require('../../components/minBar/1.0.1/minBar');
    
    document.getElementById("J_clubNav").innerHTML = document.getElementById("J_templateClubNav").innerHTML;

    $("#J_growthLevel").html(tempstatic('tplGrowthLevel'));
    $("#J_growthLevelUp").html(tempstatic('tplGrowthLevelUp'));
    $("#J_growthLevelRule").html(tempstatic('tplGrowthLevelRule'));
    
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

});