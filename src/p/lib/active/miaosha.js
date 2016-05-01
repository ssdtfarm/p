/**
 * Created by lijinrong on 2015-12-14.
 * Remix by zhangzhensheng on 2016-02-02.(remix on ac201517.js)
 */
define(function(require, exports, module) {
    var jquery = require("../jquery/jquery/1.9.1/jquery");
    var slider = require("../components/slider/1.0.0/slider");

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
                if(now - 1455638400 < 0) {
                    return 'wait';//全天秒杀，2月17日之前设置为“敬请期待”
                }

                if(num  ==  0 || now - 1457107199 > 0 ) {
                    return 'none';//全天秒杀，直到“抢光光”为止或直到3月4日后
                }

                if(now - 1455638400 >= 0) {
                    return 'sale';//全天秒杀，从2月17日开始
                }
            }

            var statusHandler = {
                wait: function (obj, itemData) {
                    obj.find(".buy").html("敬请期待");
                    var totalTime = startTime*1000 - now*1000;
                    countDowner(totalTime, function(curDay, curHour, curMinute, curSecond){
                        //
                    } , function(){
                        obj.trigger('sale');
                    });
                    
                },
                sale: function (obj, itemData) {
                    obj.find(".buy").addClass('on').html("立即抢");
                    obj.find(".on").on("click", function() {
                        window.open(cdnConfig.itemApiPath + "/seckill/" + itemData.sku_id + ".html");//商品链接
                        window.location.href = window.location.href;
                    });
                },
                none: function (obj, itemData) {
                    obj.find(".con-img").unbind("click");
                    obj.find(".buy").html("已抢光");
                }
            }

            item.each(function(idx){
                var that = $(this),
                    itemData = skuData[idx];

                that.find(".con-img").css("background", "url(" + settings.imgData.basePath + settings.imgData.baseFolder[mIdx] + settings.imgData.src[mIdx][idx] + ") no-repeat ");
                that.find(".con-img").on("click", function(e){
                    window.open(cdnConfig.itemApiPath + "/seckill/" + itemData.sku_id + ".html");//商品链接
                    window.location.href = window.location.href;
                })
                that.find(".con-op .p .fav").html("￥"+parseInt(itemData.pro_price));
                that.find(".con-op .p .cost").html("￥"+parseInt(itemData.store_price));

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
        // console.log("xianxia");
        //抽检逻辑
        var nowDate = (new Date(commonData.now*1000)).getDate();
        var imgPathArray = ['img/1/', 'img/2/', 'img/3/', 'img/4/'];
        var imgBasePath = '';
        var acData = [];
        //设置每天的秒杀数据
        var curData = repast(commonData.miaosha, 4);
        acData = curData[0];
        imgBasePath = 'http://misc.jjcdn.com/p/active/miaosha/';
        //调用秒杀
        limited({
            wraper: '.limited-bd .limited-con',
            actData: acData,
            imgData: {
                src: [
                    ['1.jpg', '2.jpg', '3.jpg'],
                    ['4.jpg', '5.jpg', '6.jpg'],
                    ['7.jpg', '8.jpg', '9.jpg'],
                    ['10.jpg', '11.jpg', '12.jpg']
                ],
                basePath: imgBasePath,
                baseFolder: imgPathArray
            }
        });

        //**********************************************************************
        //以下部分交互以UI展示为主，每一次的秒杀形式可能不同，独立出来
        //**********************************************************************
        //superslider的tab切换效果
        $(".limited-content").slide({trigger:"click",autoPlay:true,interTime:3000});
    });

});
