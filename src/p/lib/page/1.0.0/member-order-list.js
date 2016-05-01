define(function(require, exports, module) {

    /* 按需加载js */
    var slider = require('../../components/slider/1.0.0/slider');
    var dialog = require("../../components/dialog/1.0.0/dialog");
    var khSelect = require("../../components/khSelect/1.0.0/khSelect");
    var minBar = require('../../components/minBar/1.0.1/minBar');
    var template = require('../../template/tempcomment');
    var countDown = require('../../components/countDown/1.0.1/countDown');
    document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;
    $(function() {
        preSaleEndtime();
        orderEndingtime();
    });
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
    //seajs.use(["lib/v1/1.0.0/slider", "lib/v1/1.0.0/dialog","lib/v1/1.0.0/selectUi"],function(slider, dialog, khSelect){
    /*
     * 订单筛选 ===================================
     */
    //选择最近时间的订单
    khSelect({
        mainCell: "#J_selectTime"
    });
    //选择订单状态
    khSelect({
        mainCell: "#J_selectStatus"
    });
    /*
     * 取消订单 ===============================
     */
    $(".JQ_cancelOrder").on("click", function(event) {
        //
        event.preventDefault();

        var that = $(this);
        var cancelDialog = new dialog({
            title: '提示',
            content: '<p>&nbsp;</p><p class="tc fs-14">确定要取消订单吗？</p>',
            fixed: true,
            width: 400,
            height: 60,
            button: [{
                value: '确定',
                className: 'ui-btns-orange',
                callback: function() {
                    window.location.href = that.attr("href");
                }
            }, {
                value: '取消',
                className: 'ui-btns-gray',
                callback: function() {}
            }]
        }).showModal();
    });
    /* 删除订单 */
    $(".JQ_delOrder").on("click", function() {
        event.preventDefault();
        var that = $(this);
        var delDialog = new dialog({
            title: '提示',
            content: '<p>&nbsp;</p><p class="tc fs-14">确定要删除订单吗？</p>',
            fixed: true,
            width: 400,
            height: 60,
            button: [{
                value: '确定',
                className: 'ui-btns-orange',
                callback: function() {
                    window.location.href = that.attr("href");
                }
            }, {
                value: '取消',
                className: 'ui-btns-gray',
                callback: function() {}
            }]
        }).showModal();
    });

    $(".thumb-mark").each(function(index) {
        var that = $(this);
        var str_1 = that.html().split("<br>")[0].substring(0, 14);
        var str_2 = that.html().split("<br>")[1]
        that.html(str_1 + '<br>' + str_2);
    });

    //预售倒计时
    function preSaleEndtime() {
        $(".JQ_curtTime").each(function() {
            //$(this).attr("data-endTime"); //取结束日期(毫秒值)
            var endtime = ($(this).attr("data-endTime")) * 1000;
            var nowtime = ($(this).attr("data-curTime")) * 1000; //new Date().getTime(); //今天的日期(毫秒值)
            var countTime = endtime - nowtime;
            var target = $(this).parent();
            countDown(countTime, function(CDay, CHour, CMinute, CSecond) {
                target.find(".JQ_prePayTime").html("支付剩余时间：<span class=\"pay-countdown\">" + CHour + ": " + CMinute + ": " + CSecond + "</span>");
            }, function() {
                location.reload();
            });
        });
    };

    //预售我的订单修改通知手机号码
    $(function() {
        var editBtn = '.JQ_phoneEditBtn';
        var saveBtn = '.JQ_savePhoneBtn';
        var cancleBtn = '.JQ_cancelPhoneBtn';
        var defPhone = '.JQ_defPhone';
        var prePhone = '.JQ_prePhone';
        var phone = '.JQ_prePhoneInp';
        var tip = '.JQ_prePhoneTip';
        var orderId = '.JQ_orderId';

        //修改
        $(editBtn).each(function() {
            $(this).on('click', function() {
                var papa = $(this).parent();
                $(this).addClass('pre-sale-hide');
                papa.find(phone).removeClass('pre-sale-hide');
                papa.find(saveBtn).removeClass('pre-sale-hide');
                papa.find(cancleBtn).removeClass('pre-sale-hide');
                papa.find(prePhone).addClass('pre-sale-hide');
            });
        });

        //取消修改
        $(cancleBtn).each(function() {
            $(this).on('click', function() {
                var papa = $(this).parent();
                $(this).addClass('pre-sale-hide');
                papa.find(editBtn).removeClass('pre-sale-hide');
                papa.find(phone).addClass('pre-sale-hide');
                papa.find(saveBtn).addClass('pre-sale-hide');
                papa.find(prePhone).removeClass('pre-sale-hide');
                papa.find(tip).hide();
            });
        });

        //保存修改
        $(saveBtn).each(function() {
            $(this).on('click', function() {
                var papa = $(this).parent();
                var bigpapa = $(this).parent().parent();
                var val = $.trim(papa.find(phone).val());
                var thatOrderId = bigpapa.find(orderId).attr("data-orderId");
                var thatProId = bigpapa.find(orderId).attr("data-proId");
                var thatPhone = papa.find(phone).val();
                if (val == '') {
                    papa.find(tip).html('请输入尾款提醒手机号码').show();
                } else {
                    if (/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(val)) {
                        $.ajax({
                            url: cdnConfig.my + '/user/presellorderinfo',
                            type: 'POST',
                            data: {
                                "order_id": thatOrderId,
                                "phone": thatPhone,
                                "pro_id": thatProId
                            },
                            dataType: 'json',
                            success: function(res) {
                                if (res.status == "succ") {
                                    papa.find(prePhone).html(val).removeClass('pre-sale-hide');
                                    papa.find(saveBtn).addClass('pre-sale-hide');
                                    papa.find(editBtn).removeClass('pre-sale-hide');
                                    papa.find(cancleBtn).addClass('pre-sale-hide');
                                    papa.find(phone).val('').addClass('pre-sale-hide');
                                }
                            }
                        });
                    } else {
                        papa.find(tip).html('请输入正确的手机号码').show();
                    }
                }
            });
        });

        $(phone).each(function() {
            $(this).on('focus', function() {
                var papa = $(this).parent();
                papa.find(tip).hide();
            });
            $(this).on('blur', function() {
                var papa = $(this).parent();
                var val = $.trim(papa.find(phone).val());
                if (val == '') {
                    papa.find(tip).html('请输入尾款提醒手机号码').show();
                } else {
                    if (!/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(val)) {
                        papa.find(tip).html('请输入正确的手机号码').show();
                    }
                }
            });
        });
    });
    //正常订单过期后不能支付倒计时
    function orderEndingtime() {
        $(".JQ_orderStatus").each(function() {
            if ($(this).attr("data-cancle-time")) {
                var countTime = ($(this).attr("data-cancle-time")*1000);
                var target = $(this);
                countDown(countTime, function(CDay, CHour, CMinute, CSecond) {
                    target.find(".JQ_orderCountDown").html("支付剩余时间：<br/><span class=\"pay-countdown\">" + CHour + ": " + CMinute + ": " + CSecond + "</span>");
                }, function() {
                    target.html("<p class=\"fc-333\">订单过期<br/>已取消</p>");
                });
            }
        });
    };

    //倒计时回调
    function orderTimeout() {
        if (countTime <= 1000) {
            target.html("<p class=\"fc-333 fl\">已取消</p>");
            clearTimeout(timer);
        } else {
            target.find(".JQ_prePayTime").html("支付剩余时间：<span class=\"pay-countdown\">" + CHour + ": " + CMinute + ": " + CSecond + "</span>");
            countTime -= 1000;
        }
    };
});
