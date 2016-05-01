define(function(require){

    /* 按需加载js */
    var dialog  = require("../../components/dialog/1.0.0/dialog");
    var minBar = require('../../components/minBar/1.0.1/minBar');
    var template = require('../../template/tempcomment');
    
    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell: '#J_minBar',
        pathConfig: cdnConfig,
        tpl: template,
        tplName: "tplMinBar",
        data : _globalConfig.minBar.data
    });    

    document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

    /*
     *   删除订单 ========================================================
     */
    $("#J_deleteOrder").on("click",function(event){
        var that = $(this);
        event.preventDefault();  // 阻止a标签默认事件
        //弹窗
        var deleteDialog = new dialog({
            title : "温馨提示",
            content : '<p class="tc">订单取消后，将不能恢复，您确认要取消吗？<p/>',
            fixed : true,
            width : 400,
            button : [
                {
                    value : "确定",
                    className : "ui-btns-orange",
                    callback : function(){
                        var loadingDialog = new dialog({title:"请稍等..."}).showModal();
                        window.location.href = that.attr("href");
                    }
                },
                {
                    value : "取消",
                    className : "ui-btns-gray",
                    callback : function(){
                        deleteDialog.remove();
                    }
                }
            ]
        }).showModal();
    });

    /*
     *  取消订单 ==========================================================================
     */
    $(".JQ_cancelOrder").each(function(index, element) {
        var that = $(this);

        that.on("click",function(event){
            event.preventDefault();  // 阻止a标签默认事件
            //弹窗
            var CancelDialog = new dialog({
                title : "温馨提示",
                content : '<p class="tc">订单取消后，将不能恢复，您确认要取消吗？<p/>',
                fixed : true,
                width : 400,
                button : [
                    {
                        value : "确定",
                        className : "ui-btns-orange",
                        callback : function(){
                            var loadingDialog = new dialog({title:"请稍等..."}).showModal();
                            window.location.href = that.attr("href");
                        }
                    },
                    {
                        value : "取消",
                        className : "ui-btns-gray",
                        callback : function(){
                            CancelDialog.remove();
                        }
                    }
                ]
            }).showModal();
        })
    });
    /*
     *  确认收货(未到时间) ==========================================================================
     */
    var restTimeHtml;
    restTimeHtml = '<div class="tc">'+$("#J_confirmInfo").html();
    restTimeHtml += '<span class="rest-time">'
        + '<i class="icon-count-time"></i>'
        + '<label>您有20天时间来确认收货：</label>'
        + '<span class="fc-333 detail-rest-time">剩余 <span id="J_confirmTime">loading...</span></span>'
        + '</span></div>';
    //点击按钮
    $("#J_confirmGoods").on("click",function(e){
        var targetURL = $(this).attr("href");
        e.preventDefault();  //阻止默认事件

        var confirmGoodsDialog = new dialog({
            title : "确认收货",
            fixed : true,
            width : 600,
            okValue : "确认收货",
            ok : function(){
                window.location.href = targetURL;
                confirmGoodsDialog.remove();
            },

        });
        confirmGoodsDialog.content(restTimeHtml);
        //getRestTime("J_confirmTime");
        confirmGoodsDialog.showModal();
    });

    /*
     * 获取确认收货时间函数 ===============================================================================
     */
    function getRestTime(dom){
        var obj;
        obj = typeof dom == "string" ? (dom.indexOf("#")>-1 ? $(dom) : $("#"+dom) ) : $("#"+dom);
        $.ajax({
            url : "getTime.php",
            data: {},
            dataType : "jsonp",
            success: function(result){
                if(result.status == "suc"){
                    obj.countdown({
                        until : result.time,       //结束时间，可设置为时间戳，单位为秒
                        padZeroes : true, //个位数前加0
                        format: 'DHMS',
                        onExpiry : function(){  //倒计时结束回调函数
                            //console.log("hello,world!");
                        }
                    });
                }else{
                    obj.html("获取时间失败！");
                }
            },
            error: function(error){}
        });
    }
});