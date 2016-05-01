define(function(require, exports, module) {

    var jquery = require("../jquery/jquery/1.9.1/jquery");
    var dialog = require("../components/dialog/1.0.0/dialog");
    var loginDialog = require("../components/loginDialog/1.0.0/loginDialog");
    var rotate = require("../components/rotate/2.3.0/rotate");
    var template = require("../template/template");
    var itemPicData = {
        "imgSrc": ["http://misc.jjcdn.com/p/active/ac201506/img/item_1.jpg",
            "http://misc.jjcdn.com/p/active/ac201506/img/item_2.jpg",
            "http://misc.jjcdn.com/p/active/ac201506/img/item_3.jpg",
            "http://misc.jjcdn.com/p/active/ac201506/img/item_4.jpg"
        ],
        "imgXy": [
            "-2px 0", "-398px 0", "-795px 0"
        ]
    };
    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
        if ($("body").find(".pointer")) {
            $(".pointer").attr("title", "点击开始抽奖 为了获取更好的上网体验 请使用更高版本的浏览器");
        }
    };
    /*幸运墙*/
    $(function() {
        if (commonData.lotteryResult) {
            var luckyList = commonData.lotteryResult;
            $("#J_luckyList1").html("");
            for (var i = 0; i < luckyList.length; i++) {
                var luckyName = luckyList[i].username,
                    luckyTime = luckyList[i].prize_time,
                    luckyPrize = luckyList[i].prize_name;
                var luckyStr = '<li class="prize-item"><span class="prize-info">恭喜' + luckyName + "获得" + luckyPrize + '一个</span><span class="prize-time">' + luckyTime + "</span></li>";
                $("#J_luckyList1").append(luckyStr);
            }
            var $this = $("#J_LuckyWarp");
            var scrollTimer;
            $this.hover(function() {
                clearInterval(scrollTimer);
            }, function() {
                scrollTimer = setInterval(function() {
                    scrollNews($this);
                }, 2e3);
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
                });
            }
        }
    });
    /*抽奖*/
    var acNum = commonData.piAlias;
    var homeMain = commonData.domain;
    var loginSta = commonData.login;
    var luckyCred = 1;
    var rotateFunc = function(awards, angle, txt, time) {
        $("#J_luckyBtn").stopRotate();
        $("#J_luckyBtn").rotate({
            angle: 0,
            duration: 3e3,
            animateTo: angle + 1440,
            callback: function() {
                if (awards == 0) {
                    dNo.dialog2("谢谢参与", time);
                } else {
                    dLucky.dialog1(txt, time);
                    luckyCred = 0;
                }
            }
        });
    };
    var flag = false;
    $(function() {
        $("#J_luckyBtn").on("click", function() {
            if (loginSta == 1) {
                switch (luckyCred) {
                    case 0:
                        dNo.dialog0("点击太快>_<鼠标好痛啊", 0);
                        break;
                    case 1:
                        luckyCred = 0;
                        if (!flag) {
                            $.ajax({
                                url: "http://" + homeMain + "/default/lotterymore?pi=" + acNum + "&type=1",
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
                                                    rotateFunc(1, 0, "竹纤维儿童毛巾", time);
                                                    break;

                                                case 2:
                                                    rotateFunc(2, 60, "精品床笠", time);
                                                    break;

                                                case 3:
                                                    rotateFunc(3, 120, "时尚天堂伞", time);
                                                    break;

                                                case 4:
                                                    rotateFunc(4, 180, "Apple Watch", time);
                                                    break;

                                                case 5:
                                                    rotateFunc(5, 240, "智能扫地机", time);
                                                    break;

                                                case 0:
                                                    rotateFunc(0, 300, "谢谢参与", time);
                                                    break;

                                                default:
                                                    break;
                                            };
                                            break;

                                        case -1:
                                            /* var local = window.location.href;
                                             window.location.href  = "http://passport.kinhom.com/?url=" + local;*/
                                            loginDialog({
                                                "cdnConfig": cdnConfig,
                                                "tpl": template,
                                                "dialog": dialog
                                            });
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
                /*var local = window.location.href;
                window.location.href = "http://passport.kinhom.com/?url=" + local;*/
                loginDialog({
                    "cdnConfig": cdnConfig,
                    "tpl": template,
                    "dialog": dialog
                });
            }
        });
    });
    var dLucky = new LuckyDialog();
    var dNo = new LuckyDialog();
    /*弹框*/
    function LuckyDialog() {
        this.txt = "";
        this.setTxt = function(newTxt) {
            this.txt = newTxt;
        };
        this.dialog0 = function(txt, time) {
            var str = '<div class="lucky-dialog-content"><p class="lucky-msg">' + txt + "</p></div>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 350,
                height: 90,
                fixed: true,
                button: [{
                    value: "关闭",
                    id: "J_btnCj",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                    }
                }]
            }).showModal();
            setTimeout(function() {
                d.close().remove();
            }, 1000);
        };
        this.dialog1 = function(txt, time) {
            var str = '<div class="lucky-dialog-content"><p class="lucky-msg">恭喜哦！您中奖了，奖品是' + txt + '礼品1份! 活动后将由专人安排发放礼品。</p><p class="additional-remarks tc">您还剩' + time + "次抽奖机会！</p></div>";
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
            var str = '<div class="lucky-dialog-content"><p class="lucky-msg-strong">这次没抽中哦，再接再厉！</p><p class="additional-remarks tc">您还剩' + time + "次抽奖机会！</p></div>";
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
            var str = '<div class="lucky-dialog-content"><p class="lucky-msg">' + txt + "，继续购物每<span>满2000元可再获得1次抽奖</span>机会，上不封顶。</p></div>";
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
                        luckyCred = 1;
                        d.close().remove();
                    }
                }],
                onclose: function() {
                    luckyCred = 1;
                }
            }).showModal();
        };
        this.dialog4 = function(txt, time) {
            var str = '<div class="lucky-dialog-content"><p class="lucky-msg">' + txt + "，购物每<span>满2000元可再获得1次抽奖</span>机会，上不封顶。</p></div>";
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
                        luckyCred = 1;
                        d.close().remove();
                    }
                }],
                onclose: function() {
                    luckyCred = 1;
                }
            }).showModal();
        };
        this.dialog5 = function(txt, toUrl) {
            var str = '<div class="lucky-dialog-content"><p class="lucky-msg">' + txt + "</p></div>";
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
                }]
            }).showModal();
        };
    };
    /*秒杀*/


    $(function() {
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
        };
        function repast (guests, seatNum) {
            var arr=[];
            for(var i=0;i<guests.length;i+=seatNum){
                arr.push(guests.slice(i,i+seatNum));
            }
            return arr;
        }
        var miaoshaArray = commonData.miaosha;
        var miaoshaConData = repast(commonData.miaosha, 4);
        var itemPicArray = itemPicData.imgSrc;
        var picXyArray = itemPicData.imgXy;
        var activeDay = new Date(commonData.now * 1e3).getDate();
        var activeHour = new Date(commonData.now * 1e3).getHours();
        var activeIdx = 0;
        var mHours = new Date().getHours();
        var mDayIdx = 0;
        var mTimeIdx = 0;
        var mUlIdx = 0;

        switch (activeDay) {
            case 9:
                mDayIdx = 0;
                break;
            case 10:
                mDayIdx = 1;
                break;
            case 11:
                mDayIdx = 2;
                break;
            case 12:
                mDayIdx = 3;
                break;
            case 13:
                mDayIdx = 4;
                break;
        };


        if (mHours < 10) {
            mTimeIdx = 0;
            mUlIdx = 0;
        };
        if (mHours >= 10 && mHours < 15) {
            mTimeIdx = 1;
            mUlIdx = 1;
        };
        if (mHours >= 15 && mHours < 20) {
            mTimeIdx = 2;
            mUlIdx = 2;
        };
        if (mHours >= 20 && mHours < 24) {
            mTimeIdx = 3;
            mUlIdx = 3;
        };

        if(activeDay > 8) {
            autoTab(mDayIdx, mTimeIdx, mUlIdx);
            console.log(mDayIdx, mTimeIdx, mUlIdx)
        }

        function autoTab(mDayIdx, mTimeIdx, mUlIdx) {
            var tab = $(".day-item").eq(mDayIdx);
            tab.addClass("active").siblings(".day-item").removeClass("active");
            var obj = tab.parent().parent();

            var activeObj = obj.find('.limited-data').eq(mDayIdx);
            $('.limited-data').removeClass('active');
            activeObj.addClass('active');
            activeObj.find('.hd-item').removeClass('active').eq(mTimeIdx).addClass('active');
            activeObj.find('.limited-con').removeClass('active').eq(mTimeIdx).addClass('active');
        };

        $(".limited-day .day-item").on("click", function() {
            var self = $(this);
            var idx = self.index();
            self.addClass("active").siblings(".day-item").removeClass("active");

            $('.limited-data').removeClass('active').eq(idx).addClass('active')
                              .find('.hd-item').removeClass('active').eq(0).addClass('active');
            $('.limited-data').eq(idx).find('.limited-con').removeClass('active').eq(0).addClass('active');
        });


        $(".limited-hd .hd-item").on("click", function() {
            var self = $(this);
            var dayIdx = self.index();
            self.addClass("active").siblings(".hd-item").removeClass("active");

            self.parent().siblings('.limited-bd').find('.limited-con').eq(dayIdx).addClass("active").siblings(".limited-con").removeClass("active")
        });


        $(".limited-data").each(function() {
            var self = $(this);
            var dataIdx = $(this).index();

            var bd = self.find('.limited-bd');
            var dataArray = miaoshaConData[dataIdx-1];

            var lis = self.find('li');
            lis.each(function() {
                var that = $(this);
                var liIdx = that.index();

                var pIdx = that.parent().index();

                that[0].itemLimited = true;
                var picData = itemPicArray[pIdx];
                var picXy = picXyArray[liIdx];

                that.find(".limited-item").css("background", "url(" + picData + ") no-repeat " + picXy);

                var skuData = dataArray[pIdx].sku[liIdx];
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
        //$(function() {
        //    for (var i = 1; i < $(".limited-con").length; i++) {
        //        upDate(miaoshaArray[activeIdx + i], i);
        //    }
        //
        //    function upDate(obj, index) {
        //        var start_time = obj.start_time;
        //        var end_tiem = obj.end_time;
        //        var now = commonData.now * 1e3;
        //        var totalTime = start_time * 1e3 - now;
        //        var activeEnd = end_tiem * 1e3 - now;
        //        if (activeEnd < 0) {
        //            var self = $(".limited-con").eq(index);
        //            var idx = $(this).index();
        //            var li = self.find("li");
        //            li.each(function() {
        //                var that = $(this);
        //                setItemStatus("2", that);
        //            });
        //            return;
        //        }
        //        if (totalTime < 0) {
        //            return;
        //        }
        //        countDowner(totalTime, function(curDay, curHour, curMinute, curSecond) {}, function() {
        //            setAutoTab();
        //            var self = $(".limited-con").eq(index);
        //
        //            var idx = $(this).index();
        //            var li = self.find("li");
        //            li.each(function() {
        //                var that = $(this);
        //                setItemStatus("1", that);
        //            });
        //        });
        //    }
        //});

        function initItemStatus() {

            $(".limited-data").each(function() {
                var self = $(this);
                var dataIdx = $(this).index();

                var dataArray = miaoshaConData[dataIdx-1];



                var lis = self.find('li');
                lis.each(function() {
                    var that = $(this);
                    var liIdx = that.index();
                    var pIdx = that.parent().index();


                    var nowTime = commonData.now * 1e3;
                    var endTime = dataArray[pIdx].end_time * 1e3;
                    var starTime = dataArray[pIdx].start_time * 1e3;

                    var timeFlag = nowTime - starTime > 0 ? true : false;
                    var timeFlagEnd = endTime - nowTime > 0 ? true : false;
                    var skuData = dataArray[pIdx].sku[liIdx];
                    var sku_id = skuData.sku_id;
                    var num = skuData.pro_num - skuData.v_sale - skuData.sales_volume;
                    if(!timeFlagEnd) {
                        setItemStatus("2", that);
                        return;
                    }
                    if (timeFlag) {
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
        };

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
