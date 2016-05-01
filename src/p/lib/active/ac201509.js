define(function(require, exports, module) {

    var jquery = require('../jquery/jquery/1.9.1/jquery');
    var dialog = require("../components/dialog/1.0.0/dialog");
    var loginDialog = require("../components/loginDialog/1.0.0/loginDialog");
    var template = require("../template/template");
    var countdown = require("../components/countDown/1.0.0/countDown");
    var yanNow = commonData.now,
        yanStartTime = commonData.start_time,
        yanEndTime = commonData.end_time;
    var acNum = commonData.piAlias,
        homeMain = commonData.domain,
        loginSta = commonData.login;
    var checkSta = commonData.check,
        contin = commonData.continued;

    /*倒计时*/
    //function yanCountdown(now, startTime, endTime) {
    //$(".countdown-box").countdown({
    // 假设传入的为服务器端的时间time(时间戳，毫秒为单位)
    //now: now,
    //startTime: startTime, // 开始倒计时的时间戳
    //endTime: endTime // 结束倒计时的时间戳
    //});
    //}
    //$(function() {
    //yanCountdown(yanNow * 1000, yanStartTime * 1000, yanEndTime * 1000);
    //checkLogin();
    //});

    /*报名*/
    $("#J_enrollBtn").click(function() {
        if (loginSta == 1) {
            acDialog.enrollForm();
        } else {
            loginDialog({
                "cdnConfig": cdnConfig,
                "tpl": template,
                "dialog": dialog,
                "url": "http://passport.kinhom.com/passport/login"
            });
        }
    });

    function chkEnrName() {
        var dom = $("#J_enrName");
        var domTip = $("#J_enrNameTip");
        var reg = /^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{2,20}$/;
        var val = dom.val();
        if (reg.test(val)) {
            return true;
        } else {
            if (val === "") {
                showTip(domTip, '称呼不能为空');
            } else {
                showTip(domTip, '称呼格式有误');
            }
            return false;
        }
    };

    function chkEnrTel() {
        var dom = $("#J_enrTel");
        var domTip = $("#J_enrTelTip");
        var reg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
        var val = dom.val();
        if (reg.test(val)) {
            return true;
        } else {
            if (val == "") {
                showTip(domTip, '手机号码不能为空');
            } else {
                showTip(domTip, '手机号码格式有误');
            }
            return false;
        }
    };

    function showTip(tarDOM, text) {
        tarDOM.html(text);
        $(".enroll-input").focus(function() {
            tarDOM.html("");
        })
    };

    /*签到*/
    // 判断是否登录
    function checkLogin() {
        if (loginSta == 1) {
            // 判断是否连续签到
            switch (contin) {
                case "0":
                    $(".ac-preheat .price").css("display", "none");
                    break;
                case "1":
                    $(".ac-preheat .price").css("display", "block");
                    $(".ac-preheat .price").css("background-position", "0px 0px");
                    break;
                case "2":
                    $(".ac-preheat .price").css("display", "block");
                    $(".ac-preheat .price").css("background-position", "0px -65px");
                    break;
                case "3":
                    $(".ac-preheat .price").css("display", "block");
                    $(".ac-preheat .price").css("background-position", "0px -65px");
                    break;
                default:
                    break;
            }
            // 判断今天是否已经签到
            if (checkSta == 1) {
                $(".ac-preheat .layer").css("display", "block");
            } else if (checkSta == 0) {
                $(".ac-preheat .layer").css("display", "none");
            }
        } else {
            $(".ac-preheat .price").css("display", "none");
        }
    };
    // 签到弹出框
    $("#J_checkinBtn").on("click", function(event) {
        if (loginSta == 1) {
            $.ajax({
                url: 'http://' + homeMain + '/default/check',
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    checkIn: "ok"
                },
                success: function(res) {
                    var result = res.result;
                    if (result == "1") {
                        var time = res.times;
                        switch (time) {
                            case 0:
                                $(".ac-preheat .layer").css("display", "block");
                                break;
                            case 1:
                                acDialog.dialogPre(2, "20元现金券");
                                $(".ac-preheat .layer").css("display", "block");
                                break;
                            case 2:
                                acDialog.dialogPre(2, "50元现金券");
                                $(".ac-preheat .layer").css("display", "block");
                                break;
                            case 3:
                                acDialog.dialogPre(2, "80元现金券");
                                $(".ac-preheat .layer").css("display", "block");
                                break;
                            default:
                                break;
                        }
                    } else if (result == "-1") {
                        $(".ac-preheat .layer").css("display", "block");
                    }
                },
                error: function() {
                    alert("连接错误，请再次尝试");
                }
            });
        } else {
            loginDialog({
                "cdnConfig": cdnConfig,
                "tpl": template,
                "dialog": dialog,
                "url": "http://passport.kinhom.com/passport/login"
            });
        }
    });

    /*秒杀*/
    function countDowner(totalTime, timingFn, callback) {
        if (totalTime > 0) {
            var seconds = totalTime / 1000;
            minutes = Math.floor(seconds / 60),
                hours = Math.floor(minutes / 60),
                days = Math.floor(hours / 24),

                curDay = days < 10 ? '0' + days : days,
                curHour = hours % 24 < 10 ? '0' + hours % 24 : hours % 24,
                curMinute = minutes % 60 < 10 ? '0' + minutes % 60 : minutes % 60,
                curSecond = Math.floor(seconds % 60) < 10 ? '0' + Math.floor(seconds % 60) : Math.floor(seconds % 60);

            timingFn && timingFn(curDay, curHour, curMinute, curSecond);
            countDownTimer = setTimeout(function() {
                countDowner(totalTime - 1000, timingFn, callback);
            }, 1000);
        } else {
            clearTimeout(countDownTimer);
            callback && callback();
        }
    }
    //秒杀
    $(function() {
        var miaoshaArray = commonData.miaosha;

        //切换商品列表数据
        $('.limited-hd .hd-item').on('click', function() {
            var self = $(this);
            var idx = self.index();

            self.addClass('active').siblings('.hd-item').removeClass('active');
            $('.limited-con').eq(idx).addClass('active').siblings('.limited-con').removeClass('active');
        });

        function autoTab(idx) {
            $('.hd-item').eq(idx).addClass('active').siblings('.hd-item').removeClass('active');
            $('.limited-con').eq(idx).addClass('active').siblings('.limited-con').removeClass('active');
        };
        //自动切换tab
        setAutoTab();

        function setAutoTab() {
            var hours = new Date().getHours();
            var idx = 0;
            if (hours >= 14) {
                idx = 1;
            }
            if (hours >= 17) {
                idx = 2;
            }
            if (hours >= 20) {
                idx = 3;
            }
            autoTab(idx);
        };
        //绑定各个商品点击跳转事件
        $('.limited-con').each(function() {
            var self = $(this);
            var idx = $(this).index();
            var li = self.find('li');
            var dataArray = miaoshaArray[idx];

            li.each(function() {
                var that = $(this);
                var liIdx = that.index();
                that[0].itemLimited = true;
                that.on('click', function() {
                    var skuData = dataArray.sku[liIdx] //每个商品的sku数据
                    var sku_id = skuData.sku_id; //商品的skuid
                    var num = skuData.pro_num - skuData.v_sale - skuData.sales_volume; //对应的商品数量

                    if (!that[0].itemLimited && num > 0) {
                        //alert(cdnConfig.itemApiPath + '/seckill/' + sku_id + '.html');
                        window.open(cdnConfig.itemApiPath + '/seckill/' + sku_id + '.html')
                        window.location.href = window.location.href;
                    }
                });
            });
        });

        //初始化页面状态
        initItemStatus();

        $(function() {
            for (var i = 0; i < commonData.miaosha.length; i++) {
                upDate(commonData.miaosha[i], i);
            };

            function upDate(obj, index) {

                var start_time = obj.start_time;
                var end_tiem = obj.end_time;
                var now = commonData.now * 1000;
                //var now = new Date().getTime();


                var totalTime = start_time * 1000 - now;
                var activeEnd = end_tiem * 1000 - now;
                //如果当前时间已经迟于活动结束时间,活动结束
                if (activeEnd < 0) {
                    var self = $('.limited-con').eq(index);
                    var idx = $(this).index();
                    var li = self.find('li');

                    li.each(function() {
                        var that = $(this);
                        setItemStatus('0', that);
                    });
                    return;
                }

                //如果活动开始了，返回
                if (totalTime < 0) {
                    return;
                }
                //倒计时，更新页面状态
                countDowner(totalTime, function(curDay, curHour, curMinute, curSecond) {

                }, function() {
                    setAutoTab();
                    var self = $('.limited-con').eq(index);
                    var idx = $(this).index();
                    var li = self.find('li');

                    li.each(function() {
                        var that = $(this);
                        setItemStatus('1', that);
                    });

                });

            };
        });

        function initItemStatus() {
            $('.limited-con').each(function() {
                var self = $(this);
                var idx = $(this).index();
                var li = self.find('li');
                var dataArray = miaoshaArray[idx];
                //当前tab的数据
                var nowTime = commonData.now * 1000; //当前服务器时间
                //var nowTime = new Date().getTime(); //当前服务器时间
                var endTime = dataArray.end_time * 1000; //当前秒杀活动结束时间
                var starTime = dataArray.start_time * 1000; //当前秒杀活动开始时间

                var timeFlag = nowTime - starTime > 0 ? true : false; //当前tab是否处于秒杀中


                li.each(function() {
                    var that = $(this);
                    var liIdx = that.index();

                    var skuData = dataArray.sku[liIdx] //每个商品的sku数据
                    var sku_id = skuData.sku_id; //商品的skuid
                    var num = skuData.pro_num - skuData.v_sale - skuData.sales_volume; //对应的商品数量

                    if (timeFlag) {
                        if (num > 0) {
                            setItemStatus('1', that);
                        } else {
                            setItemStatus('2', that);
                        }
                    } else {
                        setItemStatus('0', that);
                    }
                });
            });
        };

        function setItemStatus(type, that) {
            switch (type) {
                case '0':
                    that.find('.mark').show();
                    that.find('.tips').html('敬请期待').show();
                    that[0].itemLimited = true;
                    break;
                case '1':
                    that.find('.mark').hide();
                    that.find('.tips').hide();
                    that[0].itemLimited = false;
                    break;
                case '2':
                    that.find('.mark').show();
                    that.find('.tips').html('抢光光').show();
                    that[0].itemLimited = true;
                    break;
            }
        };
    });
    $('.hd-item').on('click', function() {
        $('body').trigger('scroll')
    });
    /*撕名牌*/
    var smpClicktag = 0;
    $("#J_simpBtn").on("click", function(event) {
        var coverLayer = $(".simp-cover-layer");
        coverLayer.show()
        if (smpClicktag == 0) {
            smpClicktag = 1;
            if (loginSta == 1) {
                $.ajax({
                    url: 'http://' + homeMain + '/default/lottery?pi=ac201506',
                    /*url: 'http://misc.jjcdn.com/p/active/ac201506/test.php',*/
                    dataType: "jsonp",
                    jsonp: "callback",
                    data: {
                        "send": "ok"
                    },
                    success: function(res) {
                        var sta = res.status;
                        var usrtype = res.data.usertype;
                        setTimeout(function() {
                            smpClicktag = 0
                            coverLayer.hide();
                        }, 2000);
                        switch (sta) {
                            case -1:
                                loginDialog({
                                    "cdnConfig": cdnConfig,
                                    "tpl": template,
                                    "dialog": dialog,
                                    "url": "http://passport.kinhom.com/passport/login",
                                    callback: function() {
                                        coverLayer.hide();
                                        smpClicktag = 0;
                                    }
                                });
                                break;
                            case 1:
                                var result = res.data.prize;
                                var cover = $("#J_simpCover");
                                switch (result) {
                                    case 1:
                                        acDialog.dialogSmp("lucky", "抱枕");
                                        cover.attr("class", "simp-cover cover1");
                                        break;
                                    case 2:
                                        acDialog.dialogSmp("lucky", "U盘");
                                        cover.attr("class", "simp-cover cover2");
                                        break;
                                    case 3:
                                        acDialog.dialogSmp("lucky", "真皮护理器");
                                        cover.attr("class", "simp-cover cover3");
                                        break;
                                    case 4:
                                        acDialog.dialogSmp("lucky", "天堂伞");
                                        cover.attr("class", "simp-cover cover4");
                                        break;
                                    case 5:
                                        acDialog.dialogSmp("lucky", "1000积分");
                                        cover.attr("class", "simp-cover cover5")
                                        break;
                                    case 6:
                                        acDialog.dialogSmp("lucky", "小风扇");
                                        cover.attr("class", "simp-cover cover6");
                                        break;
                                    case 7:
                                        acDialog.dialogSmp("thanks", "谢谢参与");
                                        cover.attr("class", "simp-cover cover0");
                                        break;
                                    default:
                                        break;
                                };
                                break;
                            case 2:
                                switch (usrtype) {
                                    case 1:
                                        acDialog.dialogSmp("sad", "未满1000元", 1);
                                        break;
                                    case 2:
                                        acDialog.dialogSmp("sad", "暂不符合撕名牌的条件", 3);
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case -4:
                                switch (usrtype) {
                                    case 1:
                                        acDialog.dialogSmp("sad", "次数已经用完了", 2);
                                        break;
                                    case 2:
                                        acDialog.dialogSmp("sad", "暂不符合撕名牌的条件", 3);
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            default:
                                break;
                        }
                    },
                    error: function() {
                        alert("连接错误，请再次尝试");
                    }
                });
            } else {
                loginDialog({
                    "cdnConfig": cdnConfig,
                    "tpl": template,
                    "dialog": dialog,
                    "url": "http://passport.kinhom.com/passport/login",
                    callback: function() {
                        coverLayer.hide();
                        smpClicktag = 0;
                    }
                })
            }
        }
    });


    //弹框开始=================================

    var acDialog = new enrollDialog();

    function enrollDialog() {
        this.enrollForm = function() {
            var str = "<div class=\"pre-dialog-content\"><form class=\"enroll-form\"><table class=\"enroll-table\"><tr><th>您的称呼：</th><td><input type=\"text\" class=\"enroll-input\" id=\"J_enrName\"/><p class=\"enroll-tip\" id=\"J_enrNameTip\"></p></td></tr><tr><th>手机号码：</th><td><input type=\"text\" class=\"enroll-input\" id=\"J_enrTel\"/><p class=\"enroll-tip\" id=\"J_enrTelTip\"></p></td></tr></table></form></div>";
            var d = new dialog({
                title: "报名表",
                content: str,
                width: 400,
                height: 110,
                fixed: true,
                button: [{
                    value: "提 交",
                    id: "J_subBtn",
                    className: "",
                    callback: function() {
                        if (chkEnrName() & chkEnrTel()) {
                            var enrName = $("#J_enrName").val(),
                                enrTel = $("#J_enrTel").val();
                            $.ajax({
                                url: 'http://' + homeMain + '/api/signs?type=2',
                                /*url: 'http://misc.jjcdn.com/p/active/ac201506/test.php',*/
                                dataType: "jsonp",
                                jsonp: "callback",
                                data: {
                                    "realname": enrName,
                                    "mobile": enrTel,
                                    "type": 2
                                },
                                success: function(res) {
                                    var sta = res.status;
                                    switch (sta) {
                                        case "succ":
                                            acDialog.dialogPre(1, "维尚定做四件套");
                                            break;
                                        case "fail":
                                            alert("传递数据失败，请重试");
                                            break;
                                        default:
                                            break;
                                    }
                                },
                                error: function() {
                                    alert("连接错误，请再次尝试");
                                }
                            });
                        } else {
                            return false;
                        }
                    }
                }]
            }).showModal();
        };
        this.dialogPre = function(type, txt) {
            var str;
            switch (type) {
                case 1:
                    str = "<div class=\"pre-dialog-content\"><table class=\"preheat-state\"><tr><th><i class=\"icon-smile\"></i></th><td>恭喜您已经报名成功!</td></tr></table><p class=\"preheat-text\">活动期间<span>（8.17-8.21）</span><span>购物满2000元</span>可获得<span>" + txt + "</span>哦。活动结束后7天内会为您发货。</p></div>";
                    break;
                case 2:
                    str = "<div class=\"pre-dialog-content\"><table class=\"preheat-state\"><tr><th><i class=\"icon-smile\"></i></th><td>恭喜您已经签到成功!</td></tr></table><p class=\"preheat-text\">得到一张<span>" + txt + "</span>，活动期间<span>（8.17-8.21）</span>可与其他优惠券叠加使用，结算时请咨询客服。</p></div>";
                    break;
                default:
                    break;
            }
            var d = new dialog({
                title: "提示",
                content: str,
                width: 474,
                height: 110,
                fixed: true,
                button: [{
                    value: "确 定",
                    id: "J_btn",
                    className: "",
                    callback: function() {
                        d.close().remove();
                        /*window.location.reload();*/
                    }
                }],
                onclose: function() {
                    /*window.location.reload();*/
                }
            }).showModal();
        };
        this.dialogSmp = function(type, txt, sadType) {
            var str, text, html;
            switch (type) {
                case "sad":
                    html = "<div class=\"pre-dialog-content\"><table class=\"preheat-state\"><tr><th><i class=\"icon-smile\"></i></th><td>非常抱歉!</td></tr></table>";
                    switch (sadType) {
                        case 1:
                            text = "<p class=\"preheat-text\">您实付尚<span>" + txt + "</span>，暂不符合撕名牌条件噢。</p></div>";
                            break;
                        case 2:
                            text = "<p class=\"preheat-text\">您的撕名牌" + txt + "噢！</p></div>";
                            break;
                        case 3:
                            text = "<p class=\"preheat-text\">您" + txt + "噢。只要手机号码<span>注册</span>登录即有3次撕名牌机会，购物实付每满1000元再送一次撕名牌机会。</p></div>";
                        default:
                            break;
                    }
                    str = html + text;
                    break;
                case "lucky":
                    str = "<div class=\"pre-dialog-content\"><table class=\"preheat-state\"><tr><th><i class=\"icon-smile\"></i></th><td>您非常幸运哦!</td></tr></table><p class=\"preheat-text\">恭喜您得到<span>" + txt + "</span>奖品一份。</p></div>";
                    break;
                case "thanks":
                    str = "<div class=\"pre-dialog-content\"><table class=\"preheat-state\"><tr><th><i class=\"icon-smile\"></i></th><td>" + txt + "!</td></tr></table><p class=\"preheat-text\">实付每<span>满1000元</span>都有多一次撕名牌机会哦！</p></div>";
                    break;
                default:
                    break;
            }
            var d = new dialog({
                title: "提示",
                content: str,
                width: 474,
                height: 110,
                fixed: true,
                button: [{
                    value: "确 定",
                    id: "J_btn",
                    className: "",
                    callback: function() {
                        d.close().remove();
                        /*window.location.reload();*/
                    }
                }],
                onclose: function() {
                    /*window.location.reload();*/
                }
            }).showModal();
        };
    };
});
