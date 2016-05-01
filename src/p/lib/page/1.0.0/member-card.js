define(function(require, exports, module) {
    /*===============================*/
    /*  我的银行卡
     *  @author zhangzhensheng
     *  @date   2015-10-20
     *  
     /* ==============================*/

    /* 按需加载js */
    var dialog = require('../../components/dialog/1.0.0/dialog');

    var minBar = require('../../components/minBar/1.0.1/minBar');
    var template = require('../../template/tempcomment');

    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell   : '#J_minBar',
        pathConfig : cdnConfig,
        tpl        : template,
        tplName: "tplMinBar",
        data : _globalConfig.minBar.data
    });
    /*
     * 按需加载对应css
     * 这里首先让右边加载完毕，然后再加载左边菜单
     */
    document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

    // 当提现银行卡为空时
    if ($(".card-cash-list li").length < 3) {
        $(".no-card").removeClass("no-card-on");
    }

    // 选择银行卡
    var $div = $("<div class='selected-box hide'></div>").appendTo($(".card-cash-list"));
    $(function(){
        $(".has-card").bind("click", function(){
            $(".has-card").css("border-color","#CCC");
            $(this).css("border-color","#F60");
            $div.css({
                "left":$(this).offset().left-1,
                "top":$(this).offset().top-1,
                "display":"block"
            });
        });
    });

    // 银行卡-添加
    $(".card-cash-add a").on("click", function(){
        $.ajax({
            url: cdnConfig.my + "/predeposit/checkbindphone"
        })
        .done(function(res){
            if(res.code.toString() == "200"){
                location.assign(cdnConfig.my+"/predeposit/addcard");
            } else if(res.code.toString() == "400"){
                // 未绑定手机提示框
                var chkDialog = new dialog({
                    title: "提示",
                    content: '<div class="chk-tip-3">添加银行卡需要绑定手机，您尚未绑定手机</div>',
                    width: 474,
                    height: 88,
                    fixed: true,
                    button: [{
                        value: "去绑定",
                        className: "ui-btns-ok",
                        callback: function(){
                            location.assign(cdnConfig.my+"/security/bindphone");
                        }
                    }]
                }).showModal();
            }
        })
        .fail(function(res){
            return false;
        })
    })

    // 银行卡-删除
    $(".J_cashDelete").on("click", function() {
        var self = this;
        var card = $(self).parent().parent();
        // 未设置支付密码提示框
        var chkDialog = new dialog({
            title: "删除提示",
            content: '<div class="chk-tip-3">确定要取消绑定该银行卡吗？</div>',
            width: 474,
            height: 88,
            fixed: true,
            button: [{
                id: "J_toDelete",
                value: "确定",
                className: "ui-btns-ok",
                callback: function(){
                    $.ajax({
                        url: cdnConfig.my + "/predeposit/ajaxdelcard",
                        data: {
                            "cardid": card.attr("id")
                        },
                        dataType: "json",
                        success: function(res) {
                            if (res.code.toString() == "200") {
                                chkDialog.content('<div class="chk-tip-3">删除银行卡成功！</div>');
                                $("button[i-id='J_toDelete']").hide();
                                setTimeout(function(){chkDialog.close().remove();},2000);
                                card.remove();
                                $(".selected-box").css("display","none");
                                if ($(".card-cash-list li").length < 3) {
                                    $(".card-cash-list .no-card").addClass("no-card-on");
                                }
                            } else if (res.code.toString() == "400") {
                                chkDialog.content('<div class="chk-tip-3">删除银行卡失败！</div>');
                            }
                        },
                        error: function() {
                            chkDialog.content('<div class="chk-tip-3">连接错误，请再次尝试！</div>');
                        }
                    });
                    return false;
                }
            }],
            cancel: true,
            cancelValue: "取消"
        }).showModal();
    });

    // 快捷支付-删除
    $(".J_quickDelete").on("click", function() {
        var self = this;
        var card = $(self).parent().parent();
        // 未设置支付密码提示框
        var chkDialog = new dialog({
            title: "删除提示",
            content: '<div class="chk-tip-3">确定要取消绑定该银行卡吗？</div>',
            width: 474,
            height: 88,
            fixed: true,
            button: [{
                id: "J_toDelete",
                value: "确定",
                className: "ui-btns-ok",
                callback: function(){
                    $.ajax({
                        url: cdnConfig.my + "/predeposit/ajaxdelcard",
                        data: {
                            "cardid": card.attr("id")
                        },
                        dataType: "json",
                        success: function(res) {
                            if (res.code.toString() == "200") {
                                chkDialog.content('<div class="chk-tip-3">删除银行卡成功！</div>');
                                $("button[i-id='J_toDelete']").hide();
                                setTimeout(function(){chkDialog.close().remove();},2000);
                                card.remove();
                                $(".selected-box").css("display","none");
                                if ($(".card-cash-list li").length < 3) {
                                    $(".card-cash-list .no-card").addClass("no-card-on");
                                }
                            } else if (res.code.toString() == "400") {
                                chkDialog.content('<div class="chk-tip-3">删除银行卡失败！</div>');
                            }
                        },
                        error: function() {
                            chkDialog.content('<div class="chk-tip-3">连接错误，请再次尝试！</div>');
                        }
                    });
                    return false;
                }
            }],
            cancel: true,
            cancelValue: "取消"
        }).showModal();
    });
});
