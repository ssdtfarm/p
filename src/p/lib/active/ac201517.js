/**
 * Created by lijinrong on 2015-12-14.
 */
define(function(require, exports, module) {
    var jquery = require("../jquery/jquery/1.9.1/jquery");

    /**
     * 倒计时方法
     * @param totalTime
     * @param timingFn
     * @param callback
     */
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

    /**
     * 分隔数据函数，用于分隔多天的秒杀活动数据
     * @param guests
     * @param seatNum
     * @returns {Array}
     */
    function repast (guests, seatNum) {
        var arr=[];
        for(var i=0;i<guests.length;i+=seatNum){
            arr.push(guests.slice(i,i+seatNum));
        }
        return arr;
    }
    /**
     * 秒杀逻辑，以一个秒杀活动为数据范围，以每一个秒杀产品处理对象
     * @param opt
     */
    function  limited(opt) {

        var settings = {
            wraper: '.limited-bd .limited-con',
            actData: commonData.miaosha,
            imgData: {}
        }

        $.extend(true, settings, opt);

        for(var i=0; i<settings.actData.length; i++) {
            _init(i, $(settings.wraper).eq(i), settings.actData[i]);
        }

        function _init(mIdx, dom, data) {
            var now = commonData.now,
                startTime = data.start_time,
                endTime = data.end_time,
                skuData = data.sku,
                item = dom.find('li');

            function _getStatus(itemData) {

                var num = itemData.pro_num - itemData.sales_volume - itemData.v_sale;

                if(now - startTime < 0) {
                    return 'wait';
                }

                if( num  ==  0 || now - endTime > 0) {
                    return 'none';
                }

                if(now - startTime > 0) {
                    return 'sale';
                }

            }

            var statusHandler = {
                wait: function (obj, itemData) {
                    obj.find(".mark").show();
                    obj.find(".tips").html("敬请期待").show();

                    var totalTime = startTime*1000 - now*1000;
                    countDowner(totalTime, function(curDay, curHour, curMinute, curSecond){
                        //
                    } , function(){
                        obj.trigger('sale');
                    });
                },
                sale: function (obj, itemData) {
                    obj.addClass('sale');
                    obj.find(".mark").hide();
                    obj.find(".tips").hide();
                    obj.on("click", function() {
                        window.open(cdnConfig.itemApiPath + "/seckill/" + itemData.sku_id + ".html");
                        window.location.href = window.location.href;
                    });
                },
                none: function (obj, itemData) {
                    obj.find(".mark").show();
                    obj.find(".tips").html("抢光光").show();
                }
            }

            item.each(function(idx){
                var that = $(this),
                    itemData = skuData[idx];

                that.css("background", "url(" + settings.imgData.basePath + settings.imgData.src[mIdx][idx] + ") no-repeat ");

                that.attr('sku-id', itemData.sku_id);
                that.attr('pro-id', itemData.pro_id);

                that.on('wait', function(){
                    statusHandler.wait(that, itemData);
                });
                that.on('sale', function(){
                    statusHandler.sale(that, itemData);
                });
                that.on('none', function(){
                    statusHandler.none(that, itemData);
                });
                that.trigger(_getStatus(itemData));
            });

        }
    };

    $(function(){

        //抽检逻辑
        var nowDate = (new Date(commonData.now*1000)).getDate()
        var imgPathArray = ['img/1/', 'img/2/', 'img/3/', 'img/4/'];
        var imgBasePath = '';
        var acData = [];

        //设置每天的秒杀数据
        var curData = repast(commonData.miaosha, 3);

        acData = curData[0];

        if(nowDate == 16 || nowDate == 20 || nowDate == 24 || nowDate == 28) {
            acData = curData[0];
        }
        if(nowDate == 17 || nowDate == 21 || nowDate == 25 || nowDate == 29) {
            acData = curData[1];
        }
        if(nowDate == 18 || nowDate == 22 || nowDate == 26 || nowDate == 30) {
            acData = curData[2];
        }
        if(nowDate == 19 || nowDate == 23 || nowDate == 27 || nowDate == 31) {
            acData = curData[3];
        }

        //设置图片地址
        if(nowDate <= 19) {
            imgBasePath = imgPathArray[0];
        }
        if(nowDate >= 20 && nowDate <= 23) {
            imgBasePath = imgPathArray[1];
        }
        if(nowDate >= 24 && nowDate <= 27) {
            imgBasePath = imgPathArray[2];
        }
        if(nowDate >= 28 && nowDate <= 31) {
            imgBasePath = imgPathArray[3];
        }
        imgBasePath = 'http://misc.jjcdn.com/p/active/ac201506/'+imgBasePath;

        //调用秒杀
        limited({
            wraper: '.limited-bd .limited-con',
            actData: acData,
            imgData: {
                src: [
                    ['1.jpg', '2.jpg', '3.jpg'],
                    ['4.jpg', '5.jpg', '6.jpg'],
                    ['7.jpg', '8.jpg', '9.jpg']
                ],
                basePath: imgBasePath
            }
        });

        //**********************************************************************
        //一下部分交互以UI展示为主，每一次的秒杀形式可能不同，独立出力
        //**********************************************************************
        //普通的tab切换效果
        $('.limited-hd .hd-item').on('click', function(){
            var self = $(this),
                idx = self.index();
            self.addClass('active').siblings().removeClass('active');
            $('.limited-bd .limited-con').removeClass('active').eq(idx).addClass('active');
        });

        //按时段自动切换tab，活动需求每个时间段的秒杀为1小时，如果超过了时间段，显示下一tab
        function autoTab(nowHour) {
            var idx = 0;
            if(nowHour >= 11) {
                idx = 1;
            }
            if(nowHour >= 16) {
                idx = 2;
            }
            $('.limited-hd .hd-item').removeClass('active').eq(idx).addClass('active');
            $('.limited-bd .limited-con').removeClass('active').eq(idx).addClass('active');
        }
        autoTab(new Date(commonData.now*1000).getHours());

        //数据处理完成后渐变显示
        $('.limited-content').animate({
            opacity: 1
        }, 400);
    });

});
