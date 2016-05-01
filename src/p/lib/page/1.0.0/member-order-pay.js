define(function(require, exports, module) {
    /* 按需加载js */
    var dialog = require("../../components/dialog/1.0.0/dialog");
    var khValidate = require("../../components/khValidate/1.0.0/khValidate");

    var Pikaday = require('../../components/pickDate/1.0.0/pickDate');

    var picker = new Pikaday({
        field: document.getElementById('J_datepicker'),
        trigger: document.getElementById("J_pickDateBtn"),
        firstDay: 1,
        minDate: new Date('2000-01-01'),
        maxDate: new Date('2020-12-31'),
        yearRange: [2000, 2020],
        position: "left bottom"
    });

    /* 按需加载js */

    //显示扫码支付提示
    $('#JQ_code_img').hover(function() {
        $('.JQ_tips_img').stop(true, true).fadeIn();
    }, function() {
        $('.JQ_tips_img').stop(true, true).fadeOut();
    });
    // 刷新当前页面
    $("#J_refreshBtn").click(function(e) {
        window.location.reload();
    });
    // tab 切换
    $("#J_orderPayTab li").each(function(index, element) {
        var ind = index;
        $(this).click(function(e) {
            $(this).hasClass("on") ? $(this).siblings().removeClass("on") : $(this).addClass("on").siblings().removeClass("on");
            $("#J_content_" + index).show().siblings().hide();
            if (ind == 1) {
                startChkStatus();
            } else {
                if (stat != null || stat != undefined) {
                    stopChkStatus();
                }
            }
        });
    });

    // 付款图标选择
    var paymentArr = $(".JQ_onlinePayment");
    var tarObj = $("input[name=payType]");
    $(".JQ_onlinePayment").each(function(index, element) {
        var that = $(this);
        var ind = index;
        $(this).click(function(e) {
            if (!$(this).hasClass("on")) {
                setPayment(paymentArr, ind, tarObj);
            }

        });
    });
    //设置付款方式
    function setPayment(obj, index, target) {
        for (var i = 0; i < obj.length; i++) {
            if (i == index) {
                obj.eq(i).addClass("on");
                target.val(obj.eq(i).attr("data-pay"));
            } else {
                obj.eq(i).removeClass("on");
            }
        }
    }
    /*  =====================================================
     *   微信支付轮询接口
     *   author : linyandi
     *   date   : 2015-07-06
     *   =====================================================*/
    //修复微信支付接口点击客服图标无反应
    $("#J_content_1 .icon-order-pay").on("click", function(event) {
        window.open('http://chat32.live800.com/live800/chatClient/chatbox.jsp?companyID=542108&configID=76897&jid=4159371206');
    });
    //接口开始
    var stat = null;

    // startChkStatus();
    // start polling
    function startChkStatus() {
        chkPayStatus();
        stat = setInterval(chkPayStatus, 2000);
    }
    //stop polling
    function stopChkStatus() {
        window.clearInterval(stat);
    }
    // send polling ajax
    function chkPayStatus() {
        // console.log("hello,world!");
        var orderListURL = cdnConfig.my + '/user/orderlist';
        $.ajax({
            url: 'order_status',
            data: {
                "tradeSn": $.trim($("input[name=tradeSn]").val())
            },
            dataType: 'jsonp',
            success: function(res) {
                //console.log(res);

                if (res == 1) {
                    var sd = new dialog({
                        title: '提示',
                        content: '<p>&nbsp;</p><p class="tc fs-14 fc-333">已支付成功</p>',
                        width: 400,
                        height: 60,
                        fixed: true,
                        button: [{
                            value: '查看我的订单',
                            className: 'ui-btns-orange',
                            callback: function() {
                                window.location.href = orderListURL;
                                return false;
                            }
                        }],
                        onclose: function() {
                            window.location.href = orderListURL;
                        }
                    }).showModal();
                    //停止轮询
                    stopChkStatus();
                    // console.log(res.msg);
                } else {
                    if (res == -1) {
                        //停止轮询
                        stopChkStatus();
                        window.location.reload();
                    }
                }
            }

        })

    }

    /*
     * 在线支付 ===============================================
     */

    //点击支付按钮
    $("#J_onlinePay").on("click", function() {
        //提交表单
        var onlinePayForm = $("#J_content_0").find("form");
        onlinePayForm.submit();

        //弹框
        var onlinePayDialog = new dialog({
            title: "订单支付",
            // content : '<p class="tc">单是否支付成功？</p>',
            content: '',
            width: 400,
            fixed: true,
            // statusbar: '<p class="fc-8c8 tc">温馨提示：收款商户为深圳市香江祥龙电子商务有限公司</p>',
            button: [{
                value: "已支付成功",
                className: "ui-btns-orange",
                callback: function() {
                    //点击支付成功按钮，刷新当前页
                    window.location.reload();
                }
            }, {
                value: "未成功，重新支付",
                className: "ui-btns-gray",
                callback: function() {
                    //点击未支付成功,刷新当前页
                    window.location.reload();
                }
            }]
        });
        //显示弹框
        onlinePayDialog.showModal();
    });

    /*
     * 转账支付弹窗
     */
    var flagArr = [0, 0, 0, 0, 0, 0];
    //点击付款按钮
    $("#J_remitPayBtn").on("click", function() {
        var payForm = $(this).parents("form");
        var flagLen = 0;
        //弹框
        var remitPayDialog = dialog({
            title: "提示",
            content: "你的订单转账信息已提交，商城在确认货款到账后，尽快为您安排发货！",
            width: 400,
            fixed: true,
            onclose: function() {
                window.location.href = cdnConfig.my + '/user/orderlist';
            },
            button: [{
                value: "查看订单详情",
                className: "ui-btns-orange",
                callback: function() {
                    //点击查看订单详情
                    location.href = cdnConfig.my + '/user/orderlist';
                }
            }, {
                value: "返回我的订单",
                className: "ui-btns-gray",
                callback: function() {
                    //点击返回我的订单
                    location.href = cdnConfig.my + '/user/orderlist';
                }
            }]
        });
        //验证字段
        $(".JQ_validateTr").each(function(index, element) {
            var tipText = $(this).find("label").text().replace("：", "");
            var inputVal = $(this).find("input[type=text]").val();
            var that = $(this);
            if (inputVal == "") {
                that.next("p").html(tipText + "不能为空");
                flagArr[index] = 0;
            } else {
                switch (index) {
                    case 0: //验证账户名
                        if (khValidate.chkCnName(inputVal)) {
                            flagArr[index] = 1;
                            that.next("p").html("");
                        } else {
                            flagArr[index] = 0;
                            that.next("p").html(tipText + "格式有误");
                        }
                        break;
                    case 1: //验证银行名称
                        if (khValidate.chkBankName(inputVal)) {
                            flagArr[index] = 1;
                            that.next("p").html("");
                        } else {
                            flagArr[index] = 0;
                            that.next("p").html(tipText + "格式有误");
                        }
                        break;
                    case 2: //验证银行账号
                        if (khValidate.chkBankAcount(inputVal)) {
                            flagArr[index] = 1;
                            that.next("p").html("");
                        } else {
                            flagArr[index] = 0;
                            that.next("p").html(tipText + "格式有误");
                        }
                        break;
                    case 3: //验证汇款金额
                        if (khValidate.chkPrice(inputVal)) {
                            flagArr[index] = 1;
                            that.next("p").html("");
                        } else {
                            flagArr[index] = 0;
                            that.next("p").html(tipText + "格式有误");
                        }
                        break;
                    case 4: //验证汇款单号
                        if (khValidate.chkBankOrderNum(inputVal)) {
                            flagArr[index] = 1;
                            that.next("p").html("");
                        } else {
                            flagArr[index] = 0;
                            that.next("p").html(tipText + "格式有误");
                        }
                        break;
                    case 5: //验证汇款日期
                        flagArr[index] = 1;
                        that.next("p").html("");
                    default:
                        break;
                }

            }
        });
        for (var i = 0; i < flagArr.length; i++) {
            flagLen = flagLen + parseInt(flagArr[i]);
        }
        //console.log(flagArr,flagLen);
        //显示弹框
        if (flagLen == 6) {
            //提交表单
            payForm.submit();
            //显示弹窗
            remitPayDialog.showModal();
        }
    });
    //倒计时
    function preSaleEndtime() {
        $(".JQ_curtTime").each(function() {
            var endtime = ($(this).attr("data-endTime")) * 1000;
            var nowtime = ($(this).attr("data-curTime")) * 1000; //new Date().getTime(); //今天的日期(毫秒值)
            var target = $(this).parent();
            timeSub(endtime, nowtime, target);
        });
    };

    function timeSub(endtime, nowtime, target) {
        var youtime = endtime - nowtime; //还有多久(毫秒值)
        var timer = setInterval(function() {
            var seconds = youtime / 1000;
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);
            var CDay = days;
            var CHour = hours % 24;
            CHour = CHour < 10 ? "0" + CHour : CHour;
            var CMinute = minutes % 60;
            CMinute = CMinute < 10 ? "0" + CMinute : CMinute;
            var CSecond = Math.floor(seconds % 60);
            CSecond = CSecond < 10 ? "0" + CSecond : CSecond;
            if (youtime <= 1000) {
                //如果结束日期小于当前日期就提示过期啦
                target.find("#J_onlinePay").remove();
                target.find(".JQ_cutTime").html("未按时支付定金，订单已取消");
                clearTimeout(timer);
            } else {
                target.find(".JQ_cutTime").html("支付剩余时间：<em class=\"pay-countdown\">" + CHour + ": " + CMinute + ": " + CSecond + "</em>");
                youtime -= 1000;
            }
        }, 1000);
    };
    if($(".order-pay").find(".JQ_curtTime")){
        preSaleEndtime();
    }

    /*
     * @description: 添加“立减10元”图标，以及相应文案（二维码右侧）
     *
     * @author: cwen
     * @time: 2015/12/17
     */
    (function() {
        var now = Date.parse(new Date());
        var stTime = Date.parse("12/16/2015");  // 活动开始时间，参数格式为"月/日/年"
        var endTime = Date.parse("1/1/2016"); // 参数格式为"月/日/年"，此处指：活动结束时间为2015年12月31日（包括当天）
        if(now > stTime && now < endTime) {
            $("#J_orderPayTab li").eq(1).append('<i class="icon-weixinPay-10off"></i>');
            $("#J_content_1")
                .find(".code-pay-tips")
                .prepend('<p class="fc-f60 active-title">金海马年终清仓下单立减优惠</p><p class="fc-8c8 active-txt">订单满2000元自动扣减，活动时间：2015-12-16至2015-12-31</p>');
        }
    }());
});
