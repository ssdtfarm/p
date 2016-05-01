define(function(require, exports, module) {

    var slider = require('../../components/slider/1.0.0/slider');
    var dialog = require('../../components/dialog/1.0.0/dialog');
    var tempcashier = require('../../template/tempcashier');
    var Pikaday = require('../../components/pickDate/1.0.0/pickDate');

    //var picker = new Pikaday({
    //    field: document.getElementById('J_datepicker'),
    //    trigger: document.getElementById('J_pickDateBtn'),
    //    firstDay: 1,
    //    minDate: new Date('2000-01-01'),
    //    maxDate: new Date('2020-12-31'),
    //    yearRange: [2000, 2020],
    //    position: "left bottom"
    //});
    var picker = new Pikaday({
        field: document.getElementById('J_datepicker'),
        trigger: document.getElementById('J_datepicker'),
        firstDay: 1,
        minDate: new Date('2000-01-01'),
        maxDate: new Date('2020-12-31'),
        yearRange: [2000, 2020],
        position: "left bottom"
    });
    $('#J_pickDateBtn').on('click', function() {
        $('.J_datepicker').trigger('click');
    });
    //当页面不足一屏幕是固定页脚在底部
    $(function() {
        var footerHeight = 0,
            footerTop = 0,
            $footer = $(".member-foot");
        positionFooter();

        function positionFooter() {
            //取到div#footer高度
            footerHeight = $footer.height();
            //div#footer离屏幕顶部的距离
            footerTop = ($(window).scrollTop() + $(window).height() - footerHeight) + "px";
            //如果页面内容高度小于屏幕高度，div#footer将绝对定位到屏幕底部，否则div#footer保留它的正常静态定位
            if (($(document.body).height()) < $(window).height()) {
                $footer.css({
                    position: "absolute",
                    marginTop: 0,
                    top: footerTop
                });
                $footer.show();
            } else {
                $footer.css({
                    position: "static"
                });
                $footer.show();
            }
        }
        $(window).scroll(positionFooter).resize(positionFooter);
    });
    //时效性需求，官网迎新春2016营销活动，微信支付立减10元
    ;
    (function() {
        //时效性，先检查是否处于有效时段内
        var nowTime = new Date().getTime();
        if (nowTime > 1453737600 * 1000 || nowTime < 1452009600 * 1000) return;
        var tipsHtml = '<p style="font-size: 16px;font-weight: bold;color:red;">2016迎新电商大促，支付立减10元；</p> <p style="color:red;">（订单满2000元可用，同一微信号只能使用一次；活动时间：2016年1月6日--2016年1月25日）</p>'
        $('.wx-pay .info .timer').html(tipsHtml);
    })();
    //**************通用方法和操作*******************//
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return r[2];
        }
        return null;
    };

    //刷新页面的key
    function refreshKey(str) {
        var tar = $("#security");
        tar.val(str[1]);
        tar.attr("name", str[0]);
    }

    //倒计时
    function countDownFn(t, smsBtn, countWrap) {
        var tempT = t;
        smsBtn.hide();
        countWrap.css('display', 'inline-block');
        countWrap.find('.J_countDown').html(t);
        var timer = setInterval(function() {
            if (t <= 0) {
                clearInterval(timer);
                smsBtn.css('display', 'inline-block').html('重新获取验证码').attr('lock', false);
                countWrap.hide();
            } else {
                t = t - 1;
                countWrap.find('.J_countDown').html(t);
            }
        }, 1000);
    }


    //信息提示方法
    function showTips(obj, type, txt) {
        if (type === 'error') {
            obj.addClass('error');
            obj.siblings('.error-info').find('span').html(txt).end().show();
            obj.siblings('.tips-info').hide();
        } else if (type === 'ok') {
            obj.siblings('.cashier-succ-icon').show();
        } else if (type === 'tips') {
            obj.siblings('.tips-info').find('span').html(txt).end().show();
            obj.siblings('.error-info').hide();
        } else {
            obj.siblings('.error-info').hide();
        }
        obj.on('focus', function() {
            obj.removeClass('error');
            obj.siblings('.error-info').hide();
            obj.siblings('.tips-info').hide();
        });
    }


    //银行卡验证方法
    function checkBankNo(obj, btn) {
        obj.on('keyup', function() {
            var self = $(this);
            var val = self.val();
            self.val(val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 "));

            if (val.length > 0) {
                obj.addClass('focus');
            } else {
                if (obj.hasClass('focus')) {
                    obj.removeClass('focus');
                }
            }
            if (/[^\d ]+/.test(val)) {
                showTips(self, 'error', '银行卡号为16-19位数字，请正确输入');
                lockComfirm(btn, true);
            } else {
                showTips(self);

                if (val.length > 23) {
                    self.val(val.substr(0, 23));
                }

                var card_no = self.val().replace(/\s/g, '');

                var bankNoLen = card_no.length;

                if (bankNoLen >= 16 && bankNoLen <= 19) {
                    lockComfirm(btn, false);
                    CARD_NO_QUICK = card_no;
                    CARD_NO_INSTALMENT = card_no;
                } else {
                    lockComfirm(btn, true);
                }
            }
        });
    }

    //锁定提交按钮
    function lockComfirm(obj, flag) {
        if (flag) {
            obj.addClass('go-pay-disable');
        } else {
            obj.removeClass('go-pay-disable');
        }
    }

    //waitting dialog
    function waittingDialog(txt) {
        WAITTINGDIALOG = new dialog({
            content: '<p style="padding-top: 10px;"><span class="ui-dialog-loading">Loading..</span>' + txt + '</p>'
        }).showModal();
    }

    //全局公用变量
    var PAYPATH = cdnConfig.pay;
    //var PAYPATH = 'http://pay.jiajucn.com';
    var CARD_NO_QUICK = '';
    var CARD_NO_INSTALMENT = '';
    var ORDER_ID = getUrlParam('order_id') || '';
    var CHILD_ID = getUrlParam('child_id') || '';
    var TRADESN = '';
    var BIND_NO_QUICK = '';
    var BIND_NO_INSTALMENT = '';
    var ORDER_PRICE = 0;
    var WAITTINGDIALOG = null;

    //左侧导航菜单切换
    
    ;(function() {
        var navItem = $('.side-nav .nav-item');
        var payTypeItem = $('.pay-type');

        navItem.each(function(index, el) {
            var self = $(this);

            self.on('click', function() {
                if (!self.hasClass('active-item')) {
                    navItem.removeClass('active-item');
                    self.addClass('active-item');

                    payTypeItem.removeClass('pay-type-active');
                    payTypeItem.eq(index).addClass('pay-type-active');
                }
            });
        });
    })();

    //获取订单信息 设置支付宝链接

    
    ;(function() {
        function getOrderInfoData(orderId, childId) {
            $.ajax({
                    url: PAYPATH + '/cashier/getOrderInfo',
                    dataType: 'json',
                    data: {
                        order_id: orderId,
                        child_id: childId
                    },
                    xhrFields: {
                        withCredentials: true
                    }
                })
                .done(function(res) {
                    if (res.code == 'success') {
                        TRADESN = res.data.order.order_sn;
                        ORDER_PRICE = res.data.order.order_amount;

                        //设置转账提交默认值
                        $('.J_offlineNum').attr('value', ORDER_PRICE);
                        $('.J_offlineOrderId').attr('value', ORDER_ID);
                        $('.J_offlineChildId').attr('value', CHILD_ID);
                        $('.J_offlineTotalPrice').html(ORDER_PRICE);

                        setAlipayUrl();
                        renderOrderInfo(res, 'success');
                    } else if (res.code == 'fail') {
                        renderOrderInfo(res);
                        TRADESN = '';
                    }
                })
                .fail(function() {
                    console.log("error");
                });
        }

        function setAlipayUrl() {
            $('#alipayForm .orderId').attr('value', ORDER_ID);
            $('#alipayForm .childId').attr('value', CHILD_ID);
            $('#alipayForm .payType').attr('value', 2);
            $('#alipayForm .tradeSn').attr('value', TRADESN);
        }

        function renderOrderInfo(res, type) {
            var orderInfoHtml = '';
            if (type == 'success') {
                orderInfoHtml = '<p class="order-number">订单号：' + res.data.order.order_sn + '</p>';
                orderInfoHtml += '<p class="play-title">应付金额</p>';
                orderInfoHtml += '<p class="order-price"><span>&yen;' + res.data.order.order_amount + '</span> <i class="cashier-icon refresh J_refreshPrice"></i></p>';
                if (res.data.address) {
                    orderInfoHtml += '<a href="javascript:void(0);" class="order-details">订单详情 &gt;</a>';
                    orderInfoHtml += '<div class="details-box hide"><p>收货人：' + res.data.address.true_name + ' </p><p>收货地址：' + res.data.address.area_info + ' ' + res.data.address.address + '</p><p>手机号码：' + res.data.address.mob_phone + '</p></div>';
                }
            } else {
                if (res.data.message) {
                    orderInfoHtml = '<p class="order-info-fail">' + res.data.message + '</p>';
                } else {
                    orderInfoHtml = '<p class="order-info-fail">' + res.message + '</p>';
                }
            }
            $('.order-info').html(orderInfoHtml);
        }
        getOrderInfoData(ORDER_ID, CHILD_ID);

        //刷新订单价格
        $(document).on('click', '.J_refreshPrice', function() {
            $('.cashier-side .order-price').html('获取订单信息..').css('fontSize', '18px');
            setTimeout(function() {
                getOrderInfoData(ORDER_ID, CHILD_ID);
            }, 300);

        });

        //获取订单详情
        $(document).on('click', '.order-details', function(e) {
            var box = $(this).siblings('.details-box');
            box.toggleClass('hide');
            e.stopPropagation();
        });
        $(document).on('click', function() {
            $('.details-box').addClass('hide');
        });
    })();


    //网银支付

    
    ;(function() {

        var parentNode = $('.webpay');
        var payBtn = parentNode.find('.go-pay');
        //选择银行
        function getBankListData() {
            $.ajax({
                    url: PAYPATH + '/china-pay/bankList',
                    dataType: 'json'
                })
                .done(function(res) {
                    renderBankList(res);
                })
                .fail(function() {
                    console.log("error");
                });
        }

        function renderBankList(res) {
            var listHtml = '';
            for (var i = 0; i < res.length; i++) {
                listHtml += '<li data-gateId="' + res[i].gateId + '"><img src="' + cdnConfig.cdnPath + '/images/banks/' + res[i].code + '.png" alt="' + res[i].code + '"></li>';
            }
            listHtml += '<li class="last J_moreBanks">更多银行&nbsp;&nbsp;+</li>';
            parentNode.find('.bank-list').html(listHtml);
        }
        getBankListData();

        function setPyaUrl(gateId) {
            var url = PAYPATH + '/china-pay/pay?order_id=' + ORDER_ID + '&child_id=' + CHILD_ID + '&gate_id=' + gateId
            payBtn.attr('href', url);
        }

        $(document).on('click', '.bank-list li:not(".last")', function() {
            var self = $(this)
            self.addClass('bank-selected').siblings('li').removeClass('bank-selected');

            setPyaUrl(self.attr('data-gateId'));
            payBtn.removeClass('go-pay-disable');
        });

        $(document).on('click', '.J_moreBanks', function() {
            window.open(PAYPATH + '/china-pay/pay?order_id=' + ORDER_ID + '&child_id=' + CHILD_ID);
            var onlinePayDialog = new dialog({
                title: "订单支付",
                content: '',
                width: 400,
                fixed: true,
                button: [{
                    value: "已支付成功",
                    className: "ui-btns-orange",
                    callback: function() {
                        //点击支付成功按钮，刷新当前页
                        window.location.href = window.location.href;
                    }
                }, {
                    value: "未成功，重新支付",
                    className: "ui-btns-gray",
                    callback: function() {
                        //点击未支付成功,刷新当前页
                        // window.location.reload();
                        window.location.href = window.location.href;
                    }
                }]
            }).showModal();
        });

        $('.webpay .go-pay').on('click', function() {
            if ($(this).hasClass('go-pay-disable')) return;
            //弹框
            var onlinePayDialog = new dialog({
                title: "订单支付",
                content: '',
                width: 400,
                fixed: true,
                button: [{
                    value: "已支付成功",
                    className: "ui-btns-orange",
                    callback: function() {
                        //点击支付成功按钮，刷新当前页
                        window.location.href = window.location.href;
                    }
                }, {
                    value: "未成功，重新支付",
                    className: "ui-btns-gray",
                    callback: function() {
                        //点击未支付成功,刷新当前页
                        // window.location.reload();
                        window.location.href = window.location.href;
                    }
                }]
            }).showModal();
        })

    })();


    //快捷支付
    
    ;(function() {
        var authDefaultProps = {
            'apis': {
                'getOrderInfo': PAYPATH + '/cashier/getOrderInfo',
                'bankList': PAYPATH + '/china-pay/bankList',
                'cards': PAYPATH + '/china-pay-auth-pay/cards',
                'isBind': PAYPATH + '/china-pay-auth-pay/isBind',
                'bindResult': PAYPATH + '/china-pay-auth-pay/bindResult',
                'sendSms': PAYPATH + '/china-pay-auth-pay/sendSms',
                'pay': PAYPATH + '/china-pay-auth-pay/pay'
            },
            'loopBindStatusTimer': null
        };

        var parentNode = $('.quick-pay');
        var bankInput = parentNode.find('.bank-number');
        var bankNoBtn = parentNode.find('.J_checkBankNo');

        checkBankNo(bankInput, bankNoBtn);
        //渲染绑定的银行卡列表
        var renderBankListHandler = {
            'init': function() {
                $.ajax({
                        url: authDefaultProps.apis.cards,
                        dataType: 'json',
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                    .done(function(res) {
                        if (res.code === 'success' && res.cards.length > 0) {
                            renderBankListHandler.renderBandCardList(res.cards);
                        } else {
                            $('.quick-pay .bank-number-wrap').show();
                        }
                    })
                    .fail(function() {
                        console.log("error");
                    });
            },
            'renderBandCardList': function(data) {

                var htmlStr = '';
                for (var i = 0; i < data.length; i++) {
                    htmlStr += '<div class="bank-list-item" data-bindNo="' + data[i].bind_no + '"><div class="img-wrap"><img src="' + cdnConfig.cdnPath + '/images/banks/' + data[i].bank_code + '.png" alt=""></div><div class="info"><span class="type">储蓄卡</span><span>尾号*' + data[i].last_number + '</span></div></div>';
                }
                htmlStr += '<a href="javascript:void(0);" class="other-bank">使用其它银行卡 &gt;</a>';
                $('.select-pay .clearfix').html(htmlStr);
            }
        }
        renderBankListHandler.init();
        //卡片绑定状态处理集中
        var authPayHandler = {
            'isBind': function() {
                $.ajax({
                        url: authDefaultProps.apis.isBind,
                        dataType: 'json',
                        data: {
                            card_no: CARD_NO_QUICK
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                    .done(function(res) {
                        WAITTINGDIALOG.remove();
                        authPayHandler.isBindHandler[res.code](res);
                    })
                    .fail(function() {
                        console.log("error");
                    });
            },
            'isBindHandler': {
                'fail': function() {
                    console.log('查询失败，可以多试试');
                    setTimeout(function() {
                        authPayHandler.isBind();
                    }, 100);
                },
                'bind': function(res) {
                    console.log('走支付流程');
                    //显示短信输入框
                    $('.J_checkBankNo').hide();
                    $('.bank-number-wrap .send-wrap').show();
                    BIND_NO_QUICK = res.bindNo;
                    authPayHandler.sendSms($('.bank-number-wrap .txtInput-code'));
                },
                'not_bind': function() {
                    console.log('走绑定流程');
                    authPayHandler.bindCard();
                },
                'not_support': function() {
                    showTips(bankInput, 'error', '该卡片未支持，请更换。');
                }
            },
            'bindCard': function() {
                var popBox = new dialog({
                    title: '绑定查询提示',
                    content: '<p style="text-align:center; line-height:30px; font-size:16px;">该卡未绑定快捷支付</p>',
                    fixed: true,
                    cancel: true,
                    width: 300,
                    cancelDisplay: false,
                    button: [{
                        value: "取消",
                        callback: function() {}
                    }, {
                        value: "去绑定",
                        callback: function() {
                            authPayHandler.goBinding();
                            popBox.remove();
                            return false;
                        }
                    }]
                }).showModal();
            },
            'goBinding': function() {
                window.open(PAYPATH + '/china-pay-auth-pay/bind?card_no=' + CARD_NO_QUICK);
                var popBoxWait = new dialog({
                    title: '绑定结果',
                    content: ' ',
                    fixed: true,
                    cancel: true,
                    width: 300,
                    cancelDisplay: false,
                    button: [{
                        value: "绑定失败",
                        callback: function() {
                            clearInterval(authDefaultProps.loopBindStatusTimer);
                        }
                    }, {
                        value: "绑定成功",
                        callback: function() {
                            clearInterval(authDefaultProps.loopBindStatusTimer);
                            popBoxWait.remove();
                            waittingDialog("查询绑定结果，请等待...")
                            authPayHandler.isBind();
                            return false;
                        }
                    }]
                }).showModal();

                authPayHandler.loopBindStatus(popBoxWait);
            },
            'loopBindStatus': function(popBoxWait) {
                authDefaultProps.loopBindStatusTimer = setInterval(function() {
                    $.ajax({
                            url: authDefaultProps.apis.isBind,
                            dataType: 'json',
                            data: {
                                card_no: CARD_NO_QUICK
                            },
                            xhrFields: {
                                withCredentials: true
                            }
                        })
                        .done(function(res) {
                            if (res.code == 'bind') {
                                popBoxWait.remove();
                                clearInterval(authDefaultProps.loopBindStatusTimer);
                                console.log('走支付流程');
                                //显示短信输入框
                                $('.J_checkBankNo').hide();
                                $('.bank-number-wrap .send-wrap').show();
                                BIND_NO_QUICK = res.bindNo;
                                authPayHandler.sendSms();
                            }
                        })
                        .fail(function() {
                            console.log("error");
                        });
                }, 5000);
            },
            'sendSms': function(codeInput) {
                $.ajax({
                        url: authDefaultProps.apis.sendSms,
                        dataType: 'json',
                        data: {
                            order_id: ORDER_ID,
                            child_id: CHILD_ID,
                            bind_no: BIND_NO_QUICK
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                    .done(function(res) {
                        authPayHandler.smsHandler[res.code](res, codeInput);
                    })
                    .fail(function() {
                        console.log("error");
                    });
            },
            'smsHandler': {
                'wait': function(res, codeInput) {
                    console.log('未到下次发送时间，此时，reSendTime存有下次发送时间，单位秒');
                },
                'success': function(res, codeInput) {
                    showTips(codeInput, 'tips', '验证短信发送成功，请注意查收。');

                    countDownFn(res.reSendTime, codeInput.siblings('.getPhoneCode'), codeInput.siblings('.J_countDownWrap'));

                    var payment_id = res.paymentId;
                    $('.J_quickPay_create').off();
                    $('.J_quickPay_list').off();

                    $('.J_quickPay_create').on('pay', function(e, sms) {
                        authPayHandler.orderPay(sms, payment_id, codeInput);
                    });
                    $('.J_quickPay_list').on('pay', function(e, sms) {
                        authPayHandler.orderPay(sms, payment_id, codeInput);
                    });
                },
                'fail': function(res, codeInput) {
                    showTips(codeInput, 'error', '验证短信发送失败，请重新发送。');
                    codeInput.siblings('.getPhoneCode').html('获取验证码').attr('lock', false);
                }
            },
            'orderPay': function(sms, payment_id, codeInput) {
                $.ajax({
                        url: authDefaultProps.apis.pay,
                        dataType: 'json',
                        data: {
                            order_id: ORDER_ID,
                            child_id: CHILD_ID,
                            bind_no: BIND_NO_QUICK,
                            sms: sms,
                            payment_id: payment_id
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                    .done(function(res) {
                        var code = res.code;
                        switch (code) {
                            case 'success':
                                $('.J_quickPay_create').off();
                                $('.J_quickPay_list').off();
                                //showTips(codeInput, 'tips', '订单支付成功。');
                                window.location.href = window.location.href;
                                break;
                            case 'fail':
                                showTips(codeInput, 'error', res.message);
                                break;
                        }
                    })
                    .fail(function() {
                        console.log("error");
                    });
            }
        }

        //绑定银行卡点击事件绑定
        $(document).on('click', '.select-pay .bank-list-item', function() {
            var self = $(this);
            self.addClass('bank-selected').siblings('.bank-list-item').removeClass('bank-selected');
            BIND_NO_QUICK = self.attr('data-bindNO');
            $('.select-pay .send-wrap').show();
            $('.quick-pay .bank-number-wrap').hide();
        });
        //更多银行卡点击事件绑定
        $(document).on('click', '.other-bank', function() {
            $('.select-pay .send-wrap').hide();
            $('.quick-pay .bank-number-wrap').show();
            $('.select-pay .bank-list-item').removeClass('bank-selected');
        });
        //已绑定银行卡发送短信事件绑定
        $(document).on('click', '.J_bindCardPay', function() {
            var self = $(this);
            if (self.attr('lock') == 'true') return;
            self.attr('lock', true).html('发送中');
            authPayHandler.sendSms($('.select-pay .txtInput-code'));

        });
        //新添加银行卡发送信息
        $(document).on('click', '.J_newCardPay', function() {
            var self = $(this);
            if (self.attr('lock') == 'true') return;
            self.attr('lock', true).html('发送中');
            authPayHandler.sendSms($('.bank-number-wrap .txtInput-code'));
        });
        //添加新卡验证绑定情况
        $(document).on('click', '.J_checkBankNo', function() {
            if (!$(this).hasClass('go-pay-disable')) {
                waittingDialog("查询中，请等待..")
                authPayHandler.isBind();
            }
        });
        //输入验证码，长度验证以及可支付提示
        $(document).on('blur', '.bank-number-wrap .txtInput-code', function() {
            var self = $(this);
            var val = $.trim(self.val());

            if (/^\d{6}$/.test(val)) {
                $('.J_quickPay_create').removeClass('go-pay-disable');
            } else {
                showTips(self, 'error', '请输入6位数字验证码');
                $('.J_quickPay_create').addClass('go-pay-disable');
            }
        });
        $(document).on('blur', '.select-pay  .txtInput-code', function() {
            var self = $(this);
            var val = $.trim(self.val());
            if (/^\d{6}$/.test(val)) {
                $('.J_quickPay_list').removeClass('go-pay-disable');
            } else {
                showTips(self, 'error', '请输入6位数字验证码');
                $('.J_quickPay_list').addClass('go-pay-disable');
            }

        });
        //主动触发pay事件,该事件在成功发送手机验证码是被绑定
        $(document).on('click', '.J_quickPay_list', function() {
            var self = $(this);
            if (!self.hasClass('go-pay-disable')) {

                var sms = $('.select-pay .txtInput-code').val();
                self.trigger('pay', [sms]);
            }
        });
        $(document).on('click', '.J_quickPay_create', function() {
            var self = $(this);
            if (!self.hasClass('go-pay-disable')) {
                var sms = $('.bank-number-wrap .txtInput-code').val();
                self.trigger('pay', [sms]);
            }
        });

    })();


    //微信支付
    
    ;(function() {
        var wxTimer = null;
        var loopTimer = null;

        function loopStatus() {
            $.ajax({
                url: PAYPATH + '/order_status',
                data: {
                    "tradeSn": TRADESN
                },
                dataType: 'jsonp',
                success: function(res) {
                    if (res == 1) {
                        clearInterval(loopTimer)
                        window.location.href = window.location.href;
                    } else {
                        if (res == -1) {
                            window.location.reload();
                        }
                    }
                }

            })
        }

        function render() {
            wxTimer && clearTimeout(wxTimer);
            loopTimer && clearInterval(loopTimer);
            $.ajax({
                    url: PAYPATH + '/weixin-pay/QRCode?order_id=' + ORDER_ID + '&child_id=' + CHILD_ID,
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    }
                })
                .done(function(res) {
                    if (res.code == 'success') {
                        $('.J_payCodeWrap').html('');
                        $('<img class="J_payCode" alt="">').appendTo($('.J_payCodeWrap'));
                        $('.J_payCode').attr('src', res.url);

                        wxTimer = setTimeout(function() {
                            render();
                        }, 1000 * 60 * 9);
                    } else {
                        $('.J_payCodeWrap span').html(res.msg);
                    }
                })
                .fail(function() {
                    console.log("微信支付接口出错");
                });
        }
        render();
        $('.J_wxPay').on('click', function() {
            if (loopTimer) return;
            loopStatus();
            loopTimer = setInterval(function() {
                loopStatus();
            }, 2000);
        });

    })();
// console.log('123adev');
    //分期付款，接口不同暂时不上，代码逻辑勿删！！！
    ;(function() {
        var instalmentDefaultProps = {
            'apis': {
                'isBind': PAYPATH + '/china-pay-instalment/isBind',
                'sendSms': PAYPATH + '/china-pay-instalment/sendSms',
                'pay': PAYPATH + '/china-pay-instalment/pay'
            },
            'loopBindStatusTimer': null
        };

        var parentNode = $('.financing');
        var bankInput = parentNode.find('.bank-number');

        //卡片绑定状态处理集中
        var instalmentPayHandler = {
            'isBind': function() {
                $.ajax({
                        url: instalmentDefaultProps.apis.isBind,
                        dataType: 'json',
                        data: {
                            card_no: CARD_NO_INSTALMENT
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                    .done(function(res) {
                        WAITTINGDIALOG.remove();
                        instalmentPayHandler.isBindHandler[res.code](res);
                    })
                    .fail(function() {
                        console.log("error");
                    });
            },
            'isBindHandler': {
                'fail': function() {
                    console.log('查询失败，可以多试试');
                    setTimeout(function() {
                        instalmentPayHandler.isBind();
                    }, 100);
                },
                'bind': function(res) {
                    console.log('走支付流程');
                    //显示短信输入框
                    $('.J_checkBankNo').hide();
                    $('.bank-number-wrap .send-wrap').show();
                    BIND_NO_INSTALMENT = res.bindNo;
                    $('.J_financingCheckBankNo').hide();
                    instalmentPayHandler.sendSms($('.financing .bank-number-wrap .txtInput-code'));
                },
                'not_bind': function() {
                    console.log('走绑定流程');
                    instalmentPayHandler.bindCard();
                },
                'not_support': function() {
                    showTips(bankInput, 'error', '该卡片未支持，请更换。');
                }
            },
            'bindCard': function() {
                var popBox = new dialog({
                    title: '绑定查询提示',
                    content: '<p style="text-align:center; line-height:30px; font-size:16px;">该卡未绑定分期付款功能</p>',
                    fixed: true,
                    cancel: true,
                    width: 300,
                    cancelDisplay: false,
                    button: [{
                        value: "取消",
                        callback: function() {}
                    }, {
                        value: "去绑定",
                        callback: function() {
                            instalmentPayHandler.goBinding();
                            popBox.remove();
                            return false;
                        }
                    }]
                }).showModal();
            },
            'goBinding': function() {
                window.open(PAYPATH + '/china-pay-instalment/bind/bind?card_no=' + CARD_NO_INSTALMENT);
                var popBoxWait = new dialog({
                    title: '绑定结果',
                    content: ' ',
                    fixed: true,
                    cancel: true,
                    width: 300,
                    cancelDisplay: false,
                    button: [{
                        value: "绑定失败",
                        callback: function() {
                            clearInterval(instalmentDefaultProps.loopBindStatusTimer);
                        }
                    }, {
                        value: "绑定成功",
                        callback: function() {
                            clearInterval(instalmentDefaultProps.loopBindStatusTimer);
                            popBoxWait.remove();
                            waittingDialog("查询绑定结果，请等待..")
                            instalmentPayHandler.isBind();
                            return false;
                        }
                    }]
                }).showModal();

                instalmentPayHandler.loopBindStatus(popBoxWait);
            },
            'loopBindStatus': function(popBoxWait) {
                instalmentDefaultProps.loopBindStatusTimer = setInterval(function() {
                    $.ajax({
                            url: instalmentDefaultProps.apis.isBind,
                            dataType: 'json',
                            data: {
                                card_no: CARD_NO_INSTALMENT
                            },
                            xhrFields: {
                                withCredentials: true
                            }
                        })
                        .done(function(res) {
                            if (res.code == 'bind') {
                                popBoxWait.remove();
                                clearInterval(instalmentDefaultProps.loopBindStatusTimer);
                                console.log('走支付流程');
                                //显示短信输入框
                                $('.J_checkBankNo').hide();
                                $('.bank-number-wrap .send-wrap').show();
                                BIND_NO_INSTALMENT = res.bindNo;
                                instalmentPayHandler.sendSms();
                            }
                        })
                        .fail(function() {
                            console.log("error");
                        });
                }, 5000);
            },
            'sendSms': function(codeInput) {
                $.ajax({
                        url: instalmentDefaultProps.apis.sendSms,
                        dataType: 'json',
                        data: {
                            order_id: ORDER_ID,
                            child_id: CHILD_ID,
                            bind_no: BIND_NO_INSTALMENT
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                    .done(function(res) {
                        instalmentPayHandler.smsHandler[res.code](res, codeInput);
                    })
                    .fail(function() {
                        console.log("error");
                    });
            },
            'smsHandler': {
                'wait': function(res) {
                    console.log('未到下次发送时间，此时，reSendTime存有下次发送时间，单位秒');
                },
                'success': function(res, codeInput) {
                    showTips(codeInput, 'tips', '验证短信发送成功，请注意查收。');

                    countDownFn(res.reSendTime, codeInput.siblings('.getPhoneCode'), codeInput.siblings('.J_countDownWrap'));

                    var payment_id = res.paymentId;
                    $('.J_financing_pay').on('pay', function(e, sms) {
                        instalmentPayHandler.orderPay(sms, payment_id, codeInput);
                    });
                },
                'fail': function(res, codeInput) {
                    showTips(codeInput, 'error', '验证短信发送失败，请重新发送。');
                }
            },
            'orderPay': function(sms, payment_id, codeInput) {
                $.ajax({
                        url: instalmentDefaultProps.apis.pay,
                        dataType: 'json',
                        data: {
                            order_id: ORDER_ID,
                            child_id: CHILD_ID,
                            payment_id: payment_id,
                            bind_no: BIND_NO_INSTALMENT,
                            sms: sms,
                            installments_num: $('.J_financing_pay').attr('data-num')
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                    .done(function(res) {
                        var code = res.code;
                        switch (code) {
                            case 'success':
                                $('.J_financing_pay').off();
                                //showTips(codeInput, 'tips', '订单支付成功。');
                                window.location.href = window.location.href;
                                break;
                            case 'fail':
                                showTips(codeInput, 'error', res.message);
                                break;
                        }
                    })
                    .fail(function() {
                        console.log("error");
                    });
            }
        }
        var bankItem = $('.financing .bank-list li'),
            typeItem = $('.financing-type li');

        function toFixed(number, len) {
            len ? len : len = 2;
            return parseFloat(number).toFixed(len);
        }

        //分期手续费技术
        var installment = {
            //广发银行分期付款技术   一次性支付手续费 分期最低限额 500
            'CGB': function(num) {
                num ? num : num = 0;
                //分期数
                var periods = [3, 6, 12];
                //费率
                var rate = [2.1, 4.2, 8.4];
                //手续费： 订单金额*分期费率    四舍五入，小数点保留2位
                var fee = toFixed(ORDER_PRICE * rate[num] / 100);
                //每期还款      订单总金额/期数   四舍五入，小数点保留2位
                var preFee = toFixed(ORDER_PRICE / periods[num]);
                //首期还款      [订单总金额-（订单总金额/期数)*（期数-1）]+全部手续费   四舍五入，小数点保留2位
                var firstFee = toFixed((ORDER_PRICE - (ORDER_PRICE / periods[num]) * (periods[num] - 1)) + fee);

                return {
                    fee: fee,
                    preFee: preFee,
                    firstFee: firstFee,
                    periods: periods,
                    ORDER_PRICE: ORDER_PRICE,
                    num: num
                }

            },
            //光大银行分期付款计算  一次性支付手续费 分期最低限额 200
            'CEB': function(num) {
                num ? num : num = 0;
                //分期数
                var periods = [3, 6, 9, 12];
                //费率
                var rate = [3.5, 4.5, 6.5, 7.5];
                //手续费： 订单总金额*费率     四舍五入，保留小数点后两位
                var fee = toFixed(ORDER_PRICE * rate[num] / 100);
                //每期还款      订单总金额/期数        不四舍五入，取整数位
                var preFee = parseInt(ORDER_PRICE / periods[num]);
                //首期还款      订单总金额/期数+订单手续费      不四舍五入，取整数位
                var firstFee = parseInt(preFee) + parseInt(fee);
                //尾期还款      订单总金额-每期还款金额*（总期数-1）   保留小数点后两位
                var lastFee = toFixed(ORDER_PRICE - preFee * (periods[num] - 1));

                return {
                    fee: fee,
                    preFee: preFee,
                    firstFee: firstFee,
                    lastFee: lastFee,
                    periods: periods,
                    ORDER_PRICE: ORDER_PRICE,
                    num: num
                }

            },
            //工商银行分期付款计算 分期支付手续费 分期最低限额 600
            'ICBC': function(num) {
                num ? num : num = 0;
                //分期数
                var periods = [3, 6, 9, 12, 18, 24];
                //费率 ,
                var rate = [1.12, 1.96, 3, 3.9, 5.84, 7.69];
                //手续费       订单金额×费率，四舍五入，小数点保留2位
                var fee = toFixed(ORDER_PRICE * rate[num] / 100);
                //每期还款      订单总金额/期数（取整）+全部手续费/期数（取整）
                var preFee = parseInt(ORDER_PRICE / periods[num]) + parseInt(fee / periods[num]);
                //首期还款      订单总金额/期数（取整）+余数+全部手续费/期数（取整）+余数
                var firstFee = toFixed(parseInt(ORDER_PRICE / periods[num]) + toFixed(ORDER_PRICE % periods[num]) * 1 + parseInt(fee / periods[num]) + toFixed(fee % periods[num]) * 1);

                return {
                    fee: fee,
                    preFee: preFee,
                    firstFee: firstFee,
                    periods: periods,
                    ORDER_PRICE: ORDER_PRICE,
                    num: num
                }
            }
        }

        //选择银行
        bankItem.each(function(index, el) {
            var self = $(this);
            var type = self.attr('data-type');

            self.on('click', function() {
                bankItem.removeClass('bank-selected');
                self.addClass('bank-selected');
                installmentRender(type);

                $('.bank-number-wrap .send-wrap').hide();
                $('.financing .bank-number-wrap .txtInput-code').val('');
                $('.J_financing_pay').attr('data-num', 3);
                $('.financing .bank-number-wrap').show();
                $('.J_financing_pay').attr('data-type', type);
                $('.J_financingCheckBankNo').show();
            });


        });

        checkBankNo($('.financing .bank-number'), $('.financing .J_financingCheckBankNo'));
        //渲染分期数据信息
        function installmentRender(type) {
            var installmentData = installment[type]();

            installmentData.type = type;

            var periodsHtml = tempcashier('tplInstallmentPeriods', installmentData),
                detailsHtml = tempcashier('tplInstallmentDetails', installmentData),
                html = periodsHtml + detailsHtml;

            $('.financing-type').html(html);
        }

        //选择期数
        $(document).on('click', '.periods-item', function() {
            var self = $(this),
                periodsNum = self.attr('data-num'),
                periodsType = self.attr('data-type'),
                periodsDetailsData = installment[periodsType](periodsNum),
                detailsHtml = tempcashier('tplInstallmentDetails', periodsDetailsData);

            $('.details-wrap').html(detailsHtml);
            self.addClass('bank-selected').siblings('li').removeClass('bank-selected');

            $('.J_financing_pay').attr('data-num', periodsDetailsData.periods[periodsNum]);
        });


        //添加新卡验证绑定情况
        $(document).on('click', '.J_financingCheckBankNo', function() {
            if (!$(this).hasClass('go-pay-disable')) {
                waittingDialog("查询中，请等待..")
                instalmentPayHandler.isBind();
            }
        });


        $(document).on('blur', '.financing .txtInput-code', function() {
            var self = $(this);
            var val = $.trim(self.val());
            if (/^\d{6}$/.test(val)) {
                $('.J_financing_pay').removeClass('go-pay-disable');
            } else {
                showTips(self, 'error', '请输入6位数字验证码');
                $('.J_financing_pay').addClass('go-pay-disable');
            }
        });

        $(document).on('click', '.J_financing_pay', function() {
            var self = $(this);
            if (!self.hasClass('go-pay-disable')) {
                var sms = $('.financing .txtInput-code').val();
                self.trigger('pay', [sms]);
            }
        });

    })();

    //支付宝
    
    ;(function() {
        $('.alipay .go-pay').on('click', function() {
            $('#alipayForm').submit();
            //弹框
            var onlinePayDialog = new dialog({
                title: "订单支付",
                content: '',
                width: 400,
                fixed: true,
                button: [{
                    value: "已支付成功",
                    className: "ui-btns-orange",
                    callback: function() {
                        //点击支付成功按钮，刷新当前页
                        window.location.href = window.location.href;
                    }
                }, {
                    value: "未成功，重新支付",
                    className: "ui-btns-gray",
                    callback: function() {
                        //点击未支付成功,刷新当前页
                        // window.location.reload();
                        window.location.href = window.location.href;
                    }
                }]
            }).showModal();
        });
    })();
    //转账汇款

    
    ;(function() {
        var dateTime = $('.J_datepicker'),
            cartUserName = $('.cartUserName'),
            serialNumber = $('.serialNumber'),
            accountCode = $('.accountCode');


        var checkStatus = {
            date: false,
            userName: false,
            serialNumber: false,
            accountCode: false
        };
        //验证收货日期
        function checkDate() {

            if (/^\d{4}-\d{2}-\d{2}$/.test(dateTime.val())) {
                showTips(dateTime, 'ok');
                checkStatus.date = true;
                return true;
            }
            dateTime.siblings('.cashier-succ-icon').hide();
            showTips(dateTime, 'error', '请填写正确的汇款日期,格式如2015-10-10');
            checkStatus.date = false;
            return false;
        }

        //验证汇款人姓名
        function checkCartUserName() {

            if (/^[\u4e00-\u9fa5]+$/.test(cartUserName.val())) {
                showTips(cartUserName, 'ok');
                checkStatus.userName = true;
                return true;
            }
            cartUserName.siblings('.cashier-succ-icon').hide();
            showTips(cartUserName, 'error', '请填写正确的汇款人姓名');
            checkStatus.userName = false;
            return false;
        }

        //验证交易流水号
        function checkSerialNumber() {

            if (/^\d+$/.test(serialNumber.val())) {
                showTips(serialNumber, 'ok');
                checkStatus.serialNumber = true;
                return true;
            }
            serialNumber.siblings('.cashier-succ-icon').hide();
            showTips(serialNumber, 'error', '请填写正确的交易流水号');
            checkStatus.serialNumber = false;
            return false;
        }

        //验证交易行名
        function checkAccountCode() {

            if (/^[\u4e00-\u9fa5]+$/.test(accountCode.val())) {
                showTips(accountCode, 'ok');
                checkStatus.accountCode = true;
                return true;
            }
            accountCode.siblings('.cashier-succ-icon').hide();
            showTips(accountCode, 'error', '请填写正确的交易行名');
            checkStatus.accountCode = false;
            return false;
        }
        //设置提交按钮状态
        function setSubmit() {
            if ($('.J_offlineAddress').val() == '') return;
            if (checkStatus.accountCode && checkStatus.serialNumber && checkStatus.userName && checkStatus.date) {
                $('.J_remittanceComfirm').removeClass('go-pay-disable');
            } else {
                $('.J_remittanceComfirm').addClass('go-pay-disable');
            }
        }

        dateTime.on('blur', function() {
            checkDate();
            setSubmit();
        });
        cartUserName.on('blur', function() {
            checkCartUserName();
            setSubmit();
        });
        serialNumber.on('blur', function() {
            checkSerialNumber();
            setSubmit();
        });
        accountCode.on('blur', function() {
            checkAccountCode();
            setSubmit();
        });

        //提交转账汇款表单
        $('.J_remittanceComfirm').on('click', function() {
            var self = $(this);
            if (self.hasClass('go-pay-disable')) return;
            if (checkDate() && checkCartUserName() && checkSerialNumber() && checkAccountCode()) {
                $('#J_offlineForm').submit();
            }
        });

    })();


    //地址选择

    
    ;(function() {
        $(document).on('click', function() {
            $('.address-select').hide();
        });
        var addressDialog = null;
        var addressStr = '',
            proStr = '',
            cityStr = '',
            areaStr = '';
        $(document).on('click', '.address', function(e) {
            e.stopPropagation();
        });

        $(document).on('click', '.J_select_address', function(e) {

            addressStr = '';
            if ($('.address-selector').html() == '') {
                var addressHtml = tempcashier('tplAddressSelector', {});
                $('.address-selector').html(addressHtml);
                setProvince();
            } else {
                $('.address-select').show();
                $('.address-selector').show();
            }

        });
        //设置省份信息
        function setProvince() {
            $.ajax({
                url: "http://api.kinhom.com/region/pro",
                type: "get",
                dataType: "jsonp",
                success: function(result) {
                    setAddressData(result, $('.pro-con .select-list'));
                },
                error: function(error) {
                    console.log("获取数据失败，请稍后再试!");
                }
            });
        }

        function setAddressData(data, list) {
            var htmls = '';
            list.html('');

            for (var i = 0; i < data.length; i++) {
                htmls += '<li data-parent="' + data[i].region_id + '" data-value="' + data[i].region_id + '" >' + data[i].region_name + '</li>';
            }
            list.append(htmls);
        }
        //点击省份列表，设置城市列表
        $(document).on('click', '.J_select_province li', function(event) {
            var self = $(this),
                parentID = self.attr('data-parent'),
                list = $('.J_select_city');
            //设置表单提交值
            $('.J_offlineProvince').val(parentID);
            //拼接地址信息
            proStr = self.html();
            addressStr = ' ' + proStr + ' ' + cityStr + ' ' + areaStr;

            $.ajax({
                url: 'http://api.kinhom.com/region/city/' + parentID,
                type: 'get',
                dataType: 'jsonp',
                success: function(result) {
                    setAddressData(result, list);
                    setAddressStatus(self, list);
                }
            });
        });

        //点击城市列表，设置地区列表
        $(document).on('click', '.J_select_city li', function(event) {
            var self = $(this),
                parentID = self.attr('data-parent'),
                list = $('.J_select_area');


            //设置表单提交值
            $('.J_offlineCity').val(parentID);
            //拼接地址信息
            cityStr = self.html();
            addressStr = ' ' + proStr + ' ' + cityStr + ' ' + areaStr;

            $.ajax({
                url: 'http://api.kinhom.com/region/area/' + parentID,
                type: 'get',
                dataType: 'jsonp',
                success: function(result) {
                    setAddressData(result, list);
                    setAddressStatus(self, list);
                }
            });

            event.stopPropagation();
        });

        //选择地区信息
        $(document).on('click', '.J_select_area li', function(event) {
            var self = $(this),
                parentID = self.attr('data-parent');

            //设置表单提交值
            $('.J_offlineArea').val(parentID);
            //获取运费信息
            //getShippingfee(parentID);
            //拼接地址信息
            areaStr = self.html();
            addressStr = ' ' + proStr + ' ' + cityStr + ' ' + areaStr;

            //设置转账地址
            $('.J_offlineAddress').attr('value', proStr + cityStr + areaStr);

            $('.order-transfer-form .address .cashier-succ-icon').show();
            $('.remittance .address .triangle').hide();
            $('.address-title').eq(self.parent().parent('.con').index()).html(self.html());
            $('.userAddress').html(addressStr);

            $('.address-selector').hide();

        });
        //切换头部按钮
        $(document).on('click', '.address-title', function() {
            var self = $(this);
            var con = self.parent().parent().find('.con');
            var idx = self.index();
            var conHmtl = con.eq(idx).html();
            if (conHmtl !== '') {
                self.addClass('active').siblings('.address-title').removeClass('active');
                con.removeClass('active').eq(idx).addClass('active');
            }
        });


        function setAddressStatus(self, list) {
            $('.address-title').removeClass('active');
            $('.address-title').eq(list.parent('.con').index()).addClass('active');
            $('.address-title').eq(self.parent().parent('.con').index()).html(self.html());
            self.parent().parent('.con').removeClass('active');
            list.parent('.con').addClass('active');
        }
    })();
});
