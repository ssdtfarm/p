define(function(require, exports, module) {
    /*===============================*/
    /*  我的钱包 
     *  @author lijinrong
     *  @date   2015-10-10
     *  
     *  @remix zhangzhensheng
     *  @date   2015-10-20
     /* ==============================*/
    var dialog = require('../components/dialog/1.0.0/dialog');
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

    document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

    // 是否有记录
    var hasHistory = true;
    $(function() {
        if (hasHistory) {
            $(".pager").show();
            $(".history-table tbody").show();
            $(".paginator").show();
            $(".no-history").hide();
        } else {
            $(".pager").hide();
            $(".history-table tbody").hide();
            $(".paginator").hide();
            $(".no-history").show();
        }
    });

    // 提现按钮
    $(function() {
        $("#J_take").bind("click", function() {
            // location.asssign("http://misc.jjcdn.com/p/html/member/wallet-addcard.html?cash=1");
            $.ajax({
                    url: cdnConfig.my + "/predeposit/checkcash"
                })
                .done(function(res) {
                    var chkDialog;
                    if (res.code.toString() == "1") {
                        // 未设置支付密码提示框
                        chkDialog = new dialog({
                            title: "启用支付密码提示",
                            content: '<div class="chk-tip-1">提现申请需先绑定手机号</div><div class="chk-tip-2">已验证手机是防止密码被盗，找回密码的重要途径，请您先完成绑定！</div>',
                            width: 474,
                            height: 88,
                            fixed: true,
                            button: [{
                                id: "J_toCheckPhone",
                                value: "去绑定",
                                className: "ui-btns-ok",
                                callback: function() {
                                    location.assign(cdnConfig.my + "/security/bindphone");
                                }
                            }]
                        }).showModal();
                    } else if (res.code.toString() == "2") {
                        // 未绑定银行卡
                        chkDialog = new dialog({
                            title: "设置银行卡提示",
                            content: '<div class="chk-tip-3">提现申请需先设置提现银行卡</div>',
                            width: 474,
                            height: 88,
                            fixed: true,
                            button: [{
                                id: "J_toSetCard",
                                value: "去设置",
                                className: "ui-btns-ok",
                                callback: function() {
                                    location.assign(cdnConfig.my + "/predeposit/addcard?cash=1");
                                }
                            }]
                        }).showModal();
                    } else if (res.code.toString() == "200") {
                        // 申请成功
                        location.assign(cdnConfig.my + "/predeposit/addcash");
                    }
                })
                .fail(function(res) {
                    var chkDialog = new dialog({
                        title: "提示",
                        content: '<div class="chk-tip-3">网络错误，请检查网络</div>',
                        width: 474,
                        height: 88,
                        fixed: true,
                        button: [{
                            value: "确定",
                            className: "ui-btns-ok"
                        }]
                    }).showModal();
                });
        });
    });

});
