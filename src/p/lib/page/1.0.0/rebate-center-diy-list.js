define(function(require, exports, module) {
    //加载依赖
    var dialog = require('../../components/dialog/1.0.0/dialog');
    var khSelect = require('../../components/khSelect/1.0.0/khSelect');
    var khCheckbox = require('../../components/khCheckbox/1.0.0/khCheckbox');

    document.getElementById("J_clubAside").innerHTML = document.getElementById("J_templateClubAside").innerHTML;
    /*
     * 初始化选择框 ================================================
     */
    khSelect({
        mainCell: "#J_selectRebateStyle"
    });
    khSelect({
        mainCell: "#J_selectRebateScale"
    });
    khSelect({
        mainCell: "#J_selectPointScale"
    });
    /*
     * 提交搜索 =====================================================
     */
    $("#J_submitSearch").on("click", function(event) {
        var that = $(this);
        //表单对象
        var formCell = that.parents("form");
        var actionURL = formCell.attr("action");
        // console.log(actionURL)
        var options = formCell.find("input");
        var params = "";

        for (var i = 0; i < options.length; i++) {
            if (i != options.length - 1) { p = "&"; } else { p = ""; }
            params += options[i].getAttribute("name") + '=' + options[i].value + p
        }
        //prevent default 
        event.preventDefault();
        //console.log(actionURL+params);
        //submit
        if (actionURL != "javascript:void(0);") {
            window.location.href = actionURL + params;
        }
    });
    /*
     * 全选和单选 ===================================================
     */
    khCheckbox({
        //主容器，一般为form表单ID号
        mainCell: "#J_chkForm",
        //全选按钮对象
        chkAll: {
            domID: '.JQ_chkAll',
            callback: function() {}
        },
        //单选按钮对象
        chkItem: {
            domID: '.JQ_chkItem',
            callback: function() {}
        },
        //设置提交按钮,数组形式，可设置多个,回调中使用return false可以阻止提交
        button: [{
            //按钮ID号
            domID: "#J_previewShare",
            //按钮回调函数
            callback: function(obj) {}
        }, {
            domID: "#J_createShare",
            callback: function() {}
        }]
    })

});
