define(function(require, exports, module) {

    var jquery = require('../jquery/jquery/1.9.1/jquery');
    var dialog = require("../components/dialog/1.0.0/dialog");
    var loginDialog = require("../components/loginDialog/1.0.0/loginDialog");
    var rotate = require("../components/rotate/2.3.0/rotate");
    var template = require("../template/template");

    var itemPicData = {
        imgSrc: [{
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/1_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/1_2.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/1_3.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/2_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/2_2.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/2_3.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/3_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/3_2.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/3_3.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/4_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/4_2.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/4_3.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/5_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/5_2.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201506/img/5_3.jpg"
            }]
        }]
    };
    var acNum = commonData.piAlias;
    var homeMain = commonData.domain;
    var loginSta = commonData.login;
    var luckyCred = 1;
    var rotateFunc = function(awards, angle, txt, time) {
        //awards:奖项，angle:奖项对应的角度
        $('#J_luckyBtn').stopRotate();
        $("#J_luckyBtn").rotate({
            angle: 0,
            duration: 3000,
            animateTo: angle + 1440,
            //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback: function() {
                if (awards == 0) {
                    dNo.dialog2("谢谢参与", time)
                } else {
                    dLucky.dialog1(txt, time);
                    luckyCred = 0;
                }
            }
        });
    };
    var flag = false;
    $(function() {
        $("#J_luckyBtn").rotate({
            bind: {
                click: function() {
                    if (loginSta == 1) {
                        switch (luckyCred) {
                            case 0:
                                dNo.dialog0("太多人了啊！请刷新重试", 0);
                                break;
                            case 1:
                                if (!flag) {
                                    $.ajax({
                                        url: 'http://' + homeMain + '/default/lotterymore?pi=' + acNum + '&type=1',
                                        dataType: "jsonp",
                                        jsonp: "callback",
                                        data: {
                                            setOff: "ok"
                                        },
                                        success: function(res) {
                                            var sta = res.status;
                                            switch (sta) {
                                                case 1:
                                                    var time = res.data.remainder;
                                                    var result = res.data.prize;
                                                    flag = true;
                                                    switch (result) {
                                                        case 1:
                                                            rotateFunc(1, 0, '价值99元东芝U盘', time);
                                                            break;
                                                        case 2:
                                                            rotateFunc(2, 60, '价值300元乐扣保温杯', time);
                                                            break;
                                                        case 3:
                                                            rotateFunc(3, 120, '价值200元加湿器', time);
                                                            break;
                                                        case 4:
                                                            rotateFunc(4, 180, '价值999元智能扫地机', time);
                                                            break;
                                                        case 5:
                                                            rotateFunc(5, 240, '价值150元沙发护理剂', time);
                                                            break;
                                                        case 0:
                                                            rotateFunc(0, 300, '谢谢参与', time);
                                                            break;
                                                        default:
                                                            break;
                                                    };
                                                    break;
                                                case -1:
                                                    // var local = window.location.href;
                                                    // window.location.href = "http://passport.kinhom.com/?url=" + local;
                                                    var local = window.location.href;
                                                    window.location.href = "http://passport.kinhom.com/?url=" + local;
                                                    break;
                                                case -4:
                                                    dNo.dialog4("您目前还没有符合抽奖条件", 0);
                                                    break;
                                                case -7:
                                                    dNo.dialog3("您目前的抽奖机会已用完", 0);
                                                    break;
                                                case -8:
                                                    var toUrl = res.msg;
                                                    dNo.dialog5("你好，绑定手机即可参与抽奖哦！", toUrl);
                                                    break;
                                                default:
                                                    break;
                                            }
                                        },
                                        error: function() {
                                            alert("连接错误，请再次尝试");
                                        }
                                    });
                                };
                                break;
                            default:
                                break;
                        }
                    } else {
                        var local = window.location.href;
                        window.location.href = "http://passport.kinhom.com/?url=" + local;
                    }
                }
            }
        });
    });
    //弹框开始=================================
    var dLucky = new LuckyDialog();
    var dNo = new LuckyDialog();

    function LuckyDialog() {
        this.txt = "";
        this.setTxt = function(newTxt) {
            this.txt = newTxt;
        };
        this.dialog0 = function(txt, time) {
            var str = "<div class=\"lucky-dialog-content\"><p class=\"lucky-msg\">" + txt + "</p></div>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "刷新",
                    id: "J_btnCj",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                        window.location.reload();
                    }
                }],
                onclose: function() {
                    window.location.reload();
                }
            }).showModal();
        };
        this.dialog1 = function(txt, time) {
            var str = "<div class=\"lucky-dialog-content\"><p class=\"lucky-msg\">恭喜哦！您中奖了，奖品是" + txt + "礼品1份! 活动后将由专人安排发放礼品。</p><p class=\"additional-remarks tc\">您还剩" + time + "次抽奖机会！</p></div>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "继续抽奖",
                    id: "J_btnCj",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                    }
                }, {
                    value: "稍后再试",
                    id: "J_btnZs",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                    }
                }],
                onclose: function() {
                    window.location.reload();
                }
            }).showModal();
        };
        this.dialog2 = function(txt, time) {
            var str = "<div class=\"lucky-dialog-content\"><p class=\"lucky-msg-strong\">这次没抽中哦，再接再厉！</p><p class=\"additional-remarks tc\">您还剩" + time + "次抽奖机会！</p></div>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "继续抽奖",
                    id: "J_btnCj",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                    }
                }, {
                    value: "稍后再试",
                    id: "J_btnZs",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                    }
                }],
                onclose: function() {
                    window.location.reload();
                }
            }).showModal();
        };
        this.dialog3 = function(txt, time) {
            var str = "<div class=\"lucky-dialog-content\"><p class=\"lucky-msg\">" + txt + "，继续购物每<span>满2000元可再获得1次抽奖</span>机会，上不封顶。</p></div>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "去逛逛商品",
                    id: "J_btnGo",
                    className: "ui-btns-orange",
                    callback: function() {
                        var goToTop = $("#J_activeAllBg").offset().top;
                        $("html,body").stop().animate({
                            scrollTop: goToTop
                        }, 300);
                        d.close().remove();
                    }
                }],
                /*onclose: function() {
                    window.location.reload();
                }*/
            }).showModal();
        };
        this.dialog4 = function(txt, time) {
            var str = "<div class=\"lucky-dialog-content\"><p class=\"lucky-msg\">" + txt + "，购物每<span>满2000元可再获得1次抽奖</span>机会，上不封顶。</p></div>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "去逛逛商品",
                    id: "J_btnGo",
                    className: "ui-btns-orange",
                    callback: function() {
                        var goToTop = $("#J_activeAllBg").offset().top;
                        $("html,body").stop().animate({
                            scrollTop: goToTop
                        }, 300);
                        d.close().remove();
                    }
                }],
                /*onclose: function() {
                    window.location.reload();
                }*/
            }).showModal();
        };
        this.dialog5 = function(txt, toUrl) {
            var str = "<div class=\"lucky-dialog-content\"><p class=\"lucky-msg\">" + txt + "</p></div>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "去绑定",
                    id: "J_btnGo",
                    className: "ui-btns-orange",
                    callback: function() {
                        window.open(toUrl);
                        d.close().remove();
                    }
                }],
                /*onclose: function() {
                    window.location.reload();
                }*/
            }).showModal();
        };
    };

    //幸运名单=================================
    var luckyList = commonData.lotteryResult;

    //填充数据
    $(function() {
        $("#J_luckyList1").html("");
        for (var i = 0; i < luckyList.length; i++) {
            var luckyName = luckyList[i].username,
                luckyTime = luckyList[i].prize_time,
                luckyPrize = luckyList[i].prize_name;
            var luckyStr = "<li class=\"prize-item\"><span class=\"prize-info\">恭喜" + luckyName + "获得" + luckyPrize + "一个</span><span class=\"prize-time\">" + luckyTime + "</span></li>";
            $("#J_luckyList1").append(luckyStr);
        };
        //滚动
        var $this = $("#J_LuckyWarp");
        var scrollTimer;
        $this.hover(function() {
            clearInterval(scrollTimer);
        }, function() {
            scrollTimer = setInterval(function() {
                scrollNews($this);
            }, 2000);
        }).trigger("mouseout");


        function scrollNews(obj) {
            var $self = obj.find("ul:first");
            var lineHeight = $self.find("li:first").height();
            $self.animate({
                "margin-top": -lineHeight + "px"
            }, 600, function() {
                $self.css({
                    "margin-top": "0px"
                }).find("li:first").appendTo($self);
            })
        };
    });

    //秒杀======================================

    function countDowner(totalTime, timingFn, callback) {
        if (totalTime > 0) {
            var seconds = totalTime / 1e3,
                minutes = Math.floor(seconds / 60),
                hours = Math.floor(minutes / 60),
                days = Math.floor(hours / 24),
                curDay = days < 10 ? "0" + days : days,
                curHour = hours % 24 < 10 ? "0" + hours % 24 : hours % 24,
                curMinute = minutes % 60 < 10 ? "0" + minutes % 60 : minutes % 60,
                curSecond = Math.floor(seconds % 60) < 10 ? "0" + Math.floor(seconds % 60) : Math.floor(seconds % 60);
            timingFn && timingFn(curDay, curHour, curMinute, curSecond);
            countDownTimer = setTimeout(function() {
                countDowner(totalTime - 1e3, timingFn, callback);
            }, 1e3);
        } else {
            clearTimeout(countDownTimer);
            callback && callback();
        }
    }

    var miaoshaArray = commonData.miaosha;
    var itemPicArray = itemPicData.imgSrc;
    var activeDay = new Date(commonData.now * 1e3).getDate();
    //var activeDay = new Date().getDate();
    var activeHour = new Date(commonData.now * 1e3).getHours();
    var activeIdx = 0;
    /*switch (activeDay) {
        case 11:
            switch (activeHour) {
                case 0:
                    activeIdx = 0;
                    break;
                case 10:
                    activeIdx = 3;
                    break;
                case 14:
                    activeIdx = 6;
                    break;
                case 20:
                    activeIdx = 9;
                    break;
                default:
                    break;
            };
            activeIdx = 0;
            break;
        case 12:
            switch (activeHour) {
                case 0:
                    activeIdx = 12;
                    break;
                default:
                    break;
            }
            activeIdx = 12;
            break;
        default:
            break;
    }*/

    $(function() {
        $(".limited-hd .hd-item").on("click", function() {
            var self = $(this);
            var idx = self.index();
            self.addClass("active").siblings(".hd-item").removeClass("active");
            $(".limited-con").eq(idx).addClass("active").siblings(".limited-con").removeClass("active");
        });

        function autoTab(idx) {
            $(".hd-item").eq(idx).addClass("active").siblings(".hd-item").removeClass("active");
            $(".limited-con").eq(idx).addClass("active").siblings(".limited-con").removeClass("active");
        }
        setAutoTab();

        function setAutoTab() {
            var hours = new Date().getHours();
            var idx = 0;
            switch (activeDay) {
                case 11:
                    if (hours < 10) {
                        idx = 0;
                    };
                    if (hours >= 10 && hours < 14) {
                        idx = 1;
                    };
                    if (hours >= 14 && hours < 20) {
                        idx = 2;
                    };
                    if (hours >= 20 && hours < 24) {
                        idx = 3;
                    };
                    break;
                case 12:
                    idx = 4;
                default:
                    idx = 0;
                    break;
            }
            autoTab(idx);
        }

        $(".limited-con").each(function() {
            var self = $(this);
            var idx = $(this).index();
            var li = self.find("li");
            var dataArray = miaoshaArray[activeIdx + idx];

            var picDataArray = itemPicArray[activeIdx + idx];
            li.each(function() {
                var that = $(this);
                var liIdx = that.index();
                that[0].itemLimited = true;
                var picData = picDataArray.pic[liIdx].picSrc;
                that.find(".limited-item").css("background", "url(" + picData + ")");
                var skuData = dataArray.sku[liIdx];
                var sku_id = skuData.sku_id;
                var num = skuData.pro_num - skuData.v_sale - skuData.sales_volume;
                that.find(".limited-item").attr("title", cdnConfig.itemApiPath + "/" + sku_id + ".html");
                that.on("click", function() {
                    if (!that[0].itemLimited && num > 0) {
                        window.open(cdnConfig.itemApiPath + "/seckill/" + sku_id + ".html");
                        window.location.href = window.location.href;
                    }
                });
            });
        });
        initItemStatus();
        $(function() {
            for (var i = 0; i < $(".limited-con").length; i++) {
                upDate(miaoshaArray[activeIdx + i], i);
            }

            function upDate(obj, index) {
                var start_time = obj.start_time;
                var end_tiem = obj.end_time;
                var now = commonData.now * 1e3;
                var totalTime = start_time * 1e3 - now;
                var activeEnd = end_tiem * 1e3 - now;
                if (activeEnd < 0) {
                    var self = $(".limited-con").eq(index);
                    var idx = $(this).index();
                    var li = self.find("li");
                    li.each(function() {
                        var that = $(this);
                        setItemStatus("2", that);
                    });
                    return;
                }
                if (totalTime < 0) {
                    return;
                }
                countDowner(totalTime, function(curDay, curHour, curMinute, curSecond) {}, function() {
                    setAutoTab();
                    var self = $(".limited-con").eq(index);
                    var idx = $(this).index();
                    var li = self.find("li");
                    li.each(function() {
                        var that = $(this);
                        setItemStatus("1", that);
                    });
                });
            }
        });

        function initItemStatus() {
            $(".limited-con").each(function() {
                var self = $(this);
                var idx = $(this).index();
                var li = self.find("li");
                var dataArray = miaoshaArray[activeIdx + idx];

                var nowTime = commonData.now * 1e3;
                var endTime = dataArray.end_time * 1e3;
                var starTime = dataArray.start_time * 1e3;
                var timeFlag = nowTime - starTime > 0 ? true : false;

                li.each(function() {
                    var that = $(this);
                    var liIdx = that.index();
                    var skuData = dataArray.sku[liIdx];
                    var sku_id = skuData.sku_id;
                    var num = skuData.pro_num - skuData.v_sale - skuData.sales_volume;

                    if (timeFlag) {
                        console.log(num);
                        if (num > 0) {
                            setItemStatus("1", that);
                        } else {
                            setItemStatus("2", that);
                        }
                    } else {
                        setItemStatus("0", that);
                    }
                });
            });
        }

        function setItemStatus(type, that) {
            switch (type) {
                case "0":
                    that.find(".mark").show();
                    that.find(".tips").attr("class", "tips comingSoon").html("敬请期待").show();
                    that[0].itemLimited = true;
                    break;

                case "1":
                    that.find(".mark").hide();
                    that.find(".tips").hide();
                    that[0].itemLimited = false;
                    break;

                case "2":
                    that.find(".mark").show();
                    that.find(".tips").attr("class", "tips ending").html("抢光光").show();
                    that[0].itemLimited = true;
                    break;
            }
        }
    });
    $(".hd-item").on("click", function() {
        $("body").trigger("scroll");
    });
});
