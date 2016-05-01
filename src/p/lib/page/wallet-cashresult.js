define(function(require, exports, module) {
    /*===============================*/
    /*  我的钱包 
     *  @author zhangzhensheng
     *  @date   2015-10-28
     *  
    /* ==============================*/
    var khValidate = require('../components/khValidate/1.0.0/khValidate');
    var minBar = require('../components/minBar/1.0.1/minBar');
    var template = require('../template/tempcomment');

    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell: '#J_minBar',
        pathConfig: cdnConfig,
        tpl: template,
        tplName: "tplMinBar",
        data: _globalConfig.minBar.data
    });

    // 加载侧边栏
    document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

    // 修改提现结果
    var getcashSucc = true;
    $(function() {
        if (getcashSucc) {
            $(".result-title h4").text("提现成功").css("color", "#57BB89");
            $(".J_complete").text("银行处理完成，转账成功").css("color", "#61BBE0");
            $(".J_comtime").html("2015-02-02<br/>11 : 20 : 07");
            $(".icon-2").css("background-position-y", "-22px");
        } else {
            $(".result-title h4").text("提现失败").css("color", "#C13D23");
            $(".J_complete").text("转账失败").css("color", "#C13D23");
            $(".J_comtime").html("2015-02-02<br/>11 : 20 : 07");
            $(".icon-2").css("background-position-y", "-44px");
        }
    });
});
