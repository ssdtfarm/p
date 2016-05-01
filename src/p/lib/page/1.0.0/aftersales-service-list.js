define(function(require, exports, module){

    document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;
    
    var minBar = require('../../components/minBar/1.0.1/minBar');
    var tempcomment = require('../../template/tempcomment');
    var khSelect = require("../../components/khSelect/1.0.0/khSelect");
 
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
    /*
     * 订单筛选 ===================================
     */
    //选择最近时间的订单
    khSelect({ 
        mainCell: "#J_refund_1"
    });
    //选择订单状态
    khSelect({
        mainCell: "#J_refund_2"
    });


});