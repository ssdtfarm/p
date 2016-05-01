define("lib/active/ac201514", ["../jquery/jquery/1.9.1/jquery", "../components/dialog/1.0.0/dialog"], function(require, exports, module) {
    var jquery = require("../jquery/jquery/1.9.1/jquery");
    window.$ = window.jQuery = $;
    var dialog = require("../components/dialog/1.0.0/dialog");
    var itemPicData = {
        imgSrc: [{
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/4_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/1_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/2_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_2.jpg"
            }]
        }, {
            pic: [{
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_1.jpg"
            }, {
                picSrc: "http://misc.jjcdn.com/p/active/ac201514/img/3_2.jpg"
            }]
        }]
    };

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
    var activeIdx;
    switch (activeDay) {
        case 21:
            activeIdx = 0;
            break;
        case 22:
            activeIdx = 2;
            break;
        case 23:
            activeIdx = 4;
            break;
        case 24:
            activeIdx = 6;
            break;
        case 25:
            activeIdx = 8;
            break;
        case 26:
            activeIdx = 10;
            break;
        case 27:
            activeIdx = 0;
            break;
        case 28:
            activeIdx = 2;
            break;
        case 29:
            activeIdx = 4;
            break;
        case 30:
            activeIdx = 6;
            break;
        case 31:
            activeIdx = 8;
            break;
        case 1:
            activeIdx = 10;
            break;
        case 2:
            activeIdx = 12;
            break;
        default:
            break;
    }

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
            if (hours >= 19) {
                idx = 1;
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
                        setItemStatus("0", that);
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
                    that.find(".tips").attr("class", "tips comingSoon").show();
                    that[0].itemLimited = true;
                    break;

                case "1":
                    that.find(".mark").hide();
                    that.find(".tips").hide();
                    that[0].itemLimited = false;
                    break;

                case "2":
                    that.find(".mark").show();
                    that.find(".tips").attr("class", "tips ending").show();
                    that[0].itemLimited = true;
                    break;
            }
        }
    });
    $(".hd-item").on("click", function() {
        $("body").trigger("scroll");
    });
});
