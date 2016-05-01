define(function(require){

    var slider = require("../../components/slider/1.0.0/slider");
    var tempcomment = require("../../template/tempcomment");
    var minBar = require('../../components/minBar/1.0.1/minBar');
    
    document.getElementById("J_clubNav").innerHTML = document.getElementById("J_templateClubNav").innerHTML;

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
    
    //全屏切换banner
    $("#J_pointsFullSlider").slide({
        titCell : '.hd ul',
        mainCell : '.bd ul',
        autoPage : true,
        autoPlay : true,
        vis : 1
    });

    //暂时隐藏加载下一页的按钮
    $(".loding-line").remove();

});