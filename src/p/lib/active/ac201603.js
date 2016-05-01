/**
 * Created by lijinrong on 2015-12-14.
 * Remix by zhangzhensheng on 2016-02-25. 
 */
define(function(require, exports, module) {
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
     * @param guests 所有秒杀数据
     * @param seatNum 每天的秒杀场数
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
     * 秒杀逻辑，以一个秒杀活动为数据范围，以每一个秒杀商品处理对象
     * @param opt
     */
    function  limited(opt) {

        var settings = {
            wraper: '.limited-bd .limited-con',//每次秒杀的商品包裹层，格式为<ul></ul>
            actData: commonData.miaosha,//所有秒杀商品，格式为[{},{},{},...]
            imgData: {}//所有秒杀商品的图片，格式为{src:[[],[],[],...],basePath:path}
        }

        $.extend(true, settings, opt);

        // 对当天的每次秒杀作初始化，一个时间段为一次
        for(var i=0; i<settings.actData.length; i++) {
            _init(i, $(settings.wraper).eq(i), settings.actData[i]);
        }

        function _init(mIdx, dom, data) {
            var now = commonData.now,//当前时间
                startTime = data.start_time,//每次秒杀的开始时间
                endTime = data.end_time,//每次秒杀的结束时间
                skuData = data.sku,//每次秒杀的所有秒杀商品，格式为[{},{},{},...]
                item = dom.find('li');//每个秒杀商品的包裹层，格式为<li></li>

            function _getStatus(itemData) {

                var num = itemData.pro_num - itemData.sales_volume - itemData.v_sale;//秒杀商品的剩余数量
                // console.log(num);

                if (now - startTime < 0) { 
                    return 'wait';
                }

                if (num  ==  0 || now - endTime > 0) {
                    return 'none';
                }

                if (now - startTime > 0) {
                    return 'sale';
                }

            }

            var statusHandler = {
                wait: function (obj, itemData) {
                    obj.find(".mark").show();
                    obj.find(".tips").html("敬请期待！").show();

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
                    itemData = skuData[idx];//每个秒杀商品

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
        var imgPathArray = ['img/1/', 'img/2/', 'img/3/', 'img/4/', 'img/5/'];
        var imgBasePath = '';
        var acData = [];

        //设置每天的秒杀数据
        var curData = repast(commonData.miaosha, 3);

        acData = curData[0]; 

        if (nowDate == 1 || nowDate == 5 || nowDate == 9 || nowDate == 13 || nowDate == 17) {
            acData = curData[0];
        }
        if (nowDate == 2 || nowDate == 6 || nowDate == 10 || nowDate == 14 || nowDate == 18) {
            acData = curData[1];
        }
        if (nowDate == 3 || nowDate == 7 || nowDate == 11 || nowDate == 15 || nowDate == 19) {
            acData = curData[2];
        }
        if (nowDate == 4 || nowDate == 8 || nowDate == 12 || nowDate == 16 || nowDate == 20) {
            acData = curData[3];
        }

        //设置图片地址
        if (nowDate <= 4) {
            imgBasePath = imgPathArray[0];
        }
        if (nowDate >= 5 && nowDate <= 8) {
            imgBasePath = imgPathArray[1];
        }
        if (nowDate >= 9 && nowDate <= 12) {
            imgBasePath = imgPathArray[2];
        }
        if (nowDate >= 13 && nowDate <= 16) {
            imgBasePath = imgPathArray[3];
        }
        if (nowDate >= 17 && nowDate <= 20) {
            imgBasePath = imgPathArray[4];
        }
        imgBasePath = 'http://misc.jjcdn.com/p/active/ac201603/'+imgBasePath;

        //调用秒杀
        limited({
            wraper: '.limited-bd .limited-con',
            actData: acData,
            imgData: {
                src: [
                    ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
                    ['5.jpg', '6.jpg', '7.jpg', '8.jpg'],
                    ['9.jpg', '10.jpg', '11.jpg', '12.jpg']
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

        //按时段自动切换tab，活动需求每个时间段的秒杀为2小时，如果超过了时间段，显示下一tab
        function autoTab(nowHour) {
            var idx = 0;
            if (nowHour >= 12) {
                idx = 1;
            }
            if (nowHour >= 17) {
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

        /*
         * ======== 爆款商品亮点展示 ========
         */
        //插入要展示的图片-主会场
        var selector = ["img_1","img_2","img_3"];//需要展示的图片id
        $("#J_activeContent").css({"position":"relative"});
        $.each(selector, function(index, item){
            $("#J_activeContent").append('<div class="img-detail" id="J_'+item+'"><div></div></div>');
        });
 
        // 对每个展示图片设置样式
        $(".img-detail").css({
            "position": "absolute",
            "width": "1190px", 
            "height": "662px"
        });
        $(".img-detail div").css({
            "width": "1190px", 
            "height": "662px",
            "display": "none"
        });
        $("#J_img_1").css({
            // "top": "3792px",
            // "top": "3859px",
            "top": "3846px",
            "left": "0"
        });
        $("#J_img_1 div").css({
            "background": "url(http://misc.jjcdn.com/p/active/ac201506/img/baokuan_main/1.jpg) center no-repeat"
        });
        $("#J_img_2").css({
            // "top": "5003px",
            // "top": "5070px",
            "top": "4556px",
            "left": "0"
        });
        $("#J_img_2 div").css({
            "background": "url(http://misc.jjcdn.com/p/active/ac201506/img/baokuan_main/2.jpg) center no-repeat"
        });
        $("#J_img_3").css({
            // "top": "6214px",
            // "top": "6281px",
            "top": "5265px",
            "left": "0"
        });
        $("#J_img_3 div").css({
            "background": "url(http://misc.jjcdn.com/p/active/ac201506/img/baokuan_main/3.jpg) center no-repeat"
        });
        // 展示的效果
        $(".img-detail").hover(function(e){
            // $(this).stop().animate({"opacity":"1"},300);
            $(this).find("div").stop().fadeIn(300);
        },function(e){
            // $(this).stop().animate({"opacity":"0"},300);
            $(this).find("div").stop().fadeOut(300);
        });
        // 跳转页面
        $("#J_img_1").on("click", function(e){
            window.open("http://item.kinhom.com/143.html?from=ac201506");
        });
        $("#J_img_2").on("click", function(e){
            window.open("http://item.kinhom.com/52961.html?from=ac201506");
        });
        $("#J_img_3").on("click", function(e){
            window.open("http://item.kinhom.com/48584.html?from=ac201506");
        });
        /*
         * ======== 聚划算抢购 ========
         */
        // 立即抢购按钮
        $("#J_activeContent").append('<a class="buy" id="J_buy" href="http://sale.kinhom.com/juhuasuan.html" target="_blank"></a>');
        // 参与人数
        $("#J_activeContent").append('<div class="join" id="J_join">0000</div>');
        $.ajax({
            url: "/ju/saleCount",
            type: "GET", 
            success: function(res){
                var count;
                if(res.count>=1000){
                    count = res.count;
                } else
                if(res.count>=100){
                    count = "0"+res.count;
                } else
                if(res.count>=10){
                    count = "00"+res.count;
                } else
                if(res.count>=0){
                    count = "000"+res.count;
                }
                $("#J_join").html(count);
            },
            error: function(){
                $("#J_join").html("0000");
            }
        })
    });

});
