
/*===============================*/
/*  获取优惠券成功提示页
 *  @author linyandi
 *  @date   2015-03-24
 /* ==============================*/
define(function(require, exports, module){
    /* 加载依赖 */ 
    var template = require('../../template/tempcomment');
    var mainNav  = require('../../components/mainNav/1.0.1/mainNav');
    var minBar = require('../../components/minBar/1.0.1/minBar');

    /*
     * 导航栏 =======================================
     */ 
    //渲染模板
    $("#J_mainNav").html($("#J_mainNavTemp").html());
    //主导航效果
    mainNav({
        mainCell : "JQ_headNavMenu",
        lineCell : "JQ_headNavLine"
    });
 
    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell   : '#J_minBar',
        pathConfig : cdnConfig,
        tpl        : template,
        tplName    : "tplMinBar",
        data : _globalConfig.minBar.data
    });
});