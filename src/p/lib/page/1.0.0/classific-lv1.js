define(function(require, exports, module){
    /*===============================*/
    /*  二级分类页
     *  @author lijinrong
     *  @date   2015-08-19
     /* ==============================*/
    //引入依赖
    var tempClassific = require('../../template/tempClassific');
    var tempcomment = require('../../template/tempcomment');

    var mainNav     = require('../../components/mainNav/1.0.1/mainNav');
    var qrcoder     = require('../../components/qrcode/1.0.0/qrcode');
    var dialog      = require('../../components/dialog/1.0.0/dialog');
    var lazyload    = require('../../components/lazyload/1.0.0/lazyload');
    var zoom        = require('../../components/zoom/1.0.0/zoom');
    var itemPage    = require('../../components/itemPage/1.0.0/itemPage');
    var itemAddress = require('../../components/itemAddress/1.0.0/itemAddress');
    var slider      = require('../../components/slider/1.0.0/slider');
    var minBar      = require('../../components/minBar/1.0.1/minBar');

    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell: '#J_minBar',
        pathConfig: cdnConfig,
        tpl: tempcomment,
        tplName: "tplMinBar",
        data : _globalConfig.minBar.data 
    });
     
    /*
     * 导航栏和所有分类下拉菜单 =======================================
     */
    $("#J_mainNav").html($("#J_mainNavTemp").html());
    //主导航效果
    mainNav({ 
        mainCell : "JQ_headNavMenu",
        lineCell : "JQ_headNavLine" 
    });  

    //商品蒙层
    $('.img-link').hover(function() {
        $(this).find('.mark-info').show();
    }, function() {
        $(this).find('.mark-info').hide();   
    });


    var khClassific = function(){};
    khClassific.topAd      = function(ele, tplName, data) {
        var nowTime = ele.attr("data-time") || new Date().getTime()/1000;
        var dataIndex = -1;
        try {
            for (var i = 0; i < data.length; i++) {
                if ((data[i].startTime < nowTime) && (nowTime < data[i].endTime)) {
                    dataIndex = i;
                    break;
                }
            }
            if (dataIndex > -1) {
                ele.html(tempClassific(tplName, data[dataIndex]));

                var triggerDOM = ele.find("#J_indexTopAdClose");
                triggerDOM.on("click", function (event) {
                    ele.slideUp(500);
                });

            } else {
                ele.remove();
            }
        }catch(e) {
            ele.remove();
        }

    };
    khClassific.keyWord      = function(ele, tplName, data) {
        try {
            ele.html(tempClassific(tplName, data));
            
        }catch(e) {
            ele.remove();
        }
    };
    khClassific.fullSlider = function(ele, tplName, data) {

        try { 
            var len      = data.length;
            var nowTime  = ele.attr("data-time") || new Date().getTime()/1000;
            var tempArr  = [];
            var tempData = {};

            for (var i = 0; i < len; i++) {
                if ((data[i].startTime < nowTime) && (nowTime < data[i].endTime)) {
                    tempArr.push(data[i]);
                }
            }

            tempData.list = tempArr;
            ele.html(tempClassific(tplName, tempData));

            ele.slide({
                mainCell: '.bd ul',     //内容区域
                titCell: '.hd ul',      //标题区域
                effect: 'fold',         //切换效果, fold-淡入淡出, fade-渐现
                autoPage: true,         //自动分页
                autoPlay: true,         //自动轮换
                interTime: 3000,        //两张图片切换间隔
                delayTime: 500,         //效果持续时间
                trigger: 'click'        //鼠标点击切换图片
            });
        }catch(e) {
            ele.remove();
        }
    };
    khClassific.recommendSlider = function(ele, tplName, data) {
        try {
            ele.html(tempClassific(tplName,data));

            ele.slide({
                titCell:".hd li",
                mainCell:".bd ul",
                effect:"left",
                easing:"easeInOutSine",
                pnLoop : false,
                switchLoad: '_src',
                delayTime:800 
            });
        }catch(e) {
            ele.remove();
        }
    };
    khClassific.newProduct      = function(ele, tplName, data) {
        try {
            if(data.list.length >= 4) {
                ele.html(tempClassific(tplName, data));
            } else {
                ele.remove();
            }
            
        }catch(e) {
            ele.remove();
        }
    };
    khClassific.styleTheme      = function(ele, tplName, data) {
        try {
            if(data.list.length >= 2 ) {
                ele.html(tempClassific(tplName, data));


                //风格主题切换
                $(".J_styleSlider .bd li").each(function(i){ $(".J_styleSlider .bd li").slice(i*2,i*2+2).wrapAll("<ul></ul>");});
                 
                $(".J_styleSlider").slide({
                    mainCell:".bd .list",
                    autoPage:true,
                    effect:"top",
                    autoPlay:false,
                    switchLoad: '_src',
                    trigger: 'click'
                });

            } else {
                ele.remove();
            }
            
        }catch(e) {
            ele.remove();
        }
    };
    khClassific.saleList = function(ele, tplName, data) {

        var nowTime = ele.attr("data-time") || new Date().getTime()/1000;
        var dataIndex = -1;
        try {
            
            for (var i = 0; i < data.aList.length; i++) {
                if ((data.aList[i].startTime < nowTime) && (nowTime < data.aList[i].endTime)) {
                    dataIndex = i;
                    break;
                }
            }

            if (dataIndex > -1) {
                ele.html(tempClassific(tplName, data.aList[dataIndex]));

                function countDown(totalTime, timingFn, callback) {
                    if (totalTime>0) {
                        var seconds    = totalTime / 1000;
                            minutes    = Math.floor(seconds / 60),
                            hours      = Math.floor(minutes / 60), 
                            days       = Math.floor(hours / 24),
                        
                            curDay     = days < 10 ? '0'+days : days,
                            curHour    = hours % 24 < 10 ?  '0'+hours % 24 : hours % 24,
                            curMinute  = minutes % 60 <  10 ? '0'+minutes % 60 : minutes % 60,
                            curSecond  = Math.floor(seconds % 60) < 10 ? '0'+Math.floor(seconds % 60) : Math.floor(seconds % 60); 

                        timingFn && timingFn(curDay, curHour, curMinute, curSecond);
                        countDownTimer = setTimeout(function(){
                            countDown(totalTime-1000, timingFn, callback);
                        },1000);
                    } else {
                        clearTimeout(countDownTimer);
                        callback && callback();
                    }
                }

                var countDowner = $('.J_countDown');
                var startTime = countDowner.attr('data-start')*1000;
                var endTime = countDowner.attr('data-end')*1000;
                var totalTime = endTime - startTime;

                countDown(totalTime, function(curDay, curHour, curMinute, curSecond){
                    var str = '<span class="day">'+curDay+'</span><span class="hour">'+curHour+'</span><span class="minute">'+curMinute+'</span><span class="second">'+curSecond+'</span>';
                    countDowner.html(str);
                }, function(){});


                //促销切换
                ele.slide({
                    mainCell :'.bd ul',
                    effect   : 'left',
                    autoPlay: true,
                    autoPage : true,
                    interTime: 5000,
                    delayTime: 500,
                    pnLoop : false,
                    switchLoad: '_src',
                    vis:3,
                    scroll:1
                });
    
                $('.J_saleSlider .go').hover(function() {
                    $(this).find('span').addClass('active');
                }, function() {
                    $(this).find('span').removeClass('active');
                });

            } else {
                ele.remove();
            }
        }catch(e) {
            ele.remove();
        }


    };
    khClassific.hotKeyword      = function(ele, tplName, data) {
        try {
            if(data.hotKeyWord.length && data.hotList.length ) {
                ele.html(tempClassific(tplName, data));
            } else {
                ele.remove();
            }
            
        }catch(e) {
            ele.remove();
        }
    };
    khClassific.classificAdv      = function(ele, tplName, data) {
        try {
            if(data) {
                var nowTime  = ele.attr("data-time") || new Date().getTime()/1000;
                if ((data.startTime < nowTime) && (nowTime < data.endTime)) {
                        ele.html(tempClassific(tplName, data));
                } else {
                    ele.remove();
                }
                
            } else {
                ele.remove();
            }
            
        }catch(e) {
            ele.remove();
        }
    };
    khClassific.proFloor      = function(ele, tplName, data) {
        var level = ele.attr('data-level');
        try {
            if(data) {
                var floorData = data.floorList[level];
                ele.html(tempClassific(tplName, floorData));

                //楼层商品切换
                $('.J_proSlider').slide({
                    mainCell :'.bd ul',
                    effect   : 'left',
                    autoPlay: true,
                    autoPage : true,
                    interTime: 5000,
                    delayTime: 500,
                    pnLoop : false,
                    switchLoad: '_src',
                    vis:4,
                    scroll:1
                });

            } else {
                ele.remove();
            }
            
        }catch(e) {
            ele.remove();
        }
    };

    //DOM容器懒加载插件
    $.fn.khlazy = function(options){
        var defaults = {

        };
        $.extend(defaults, options);

        var winHei = $(window).height();

        var elem = this;

        var offsetTop = elem.offset().top;
        var scrollTop = $(window).scrollTop();

        if((offsetTop-scrollTop)<=winHei && !elem.hasClass("lazy-load-done")) {
            getModuleData(elem);
        }

        $(window).on("scroll", function(event){
            scrollTop = $(window).scrollTop();

            if((offsetTop-scrollTop)<=winHei && !elem.hasClass("lazy-load-done")) {
                getModuleData(elem);
            }
        });
    };

    $(function(){
        lazyloadImg();
        //循环监听页面容器
        $(".J_lazy").each(function(){
            var that = $(this);
            that.khlazy();

        });
        $(".JQ_lazy").each(function(){
            var that = $(this);
            that.khlazy();
        });
    });
        

    //根据页面滚动加载对应的DOM
    function getModuleData(ele) {
        var tplName = ele.attr("data-tpl");
        var dataPath = ele.attr("data-path");
        var loadName = dataPath.split("_")[1];

        var ajaxPath = cdnConfig.misc;

                switch(loadName) {
                    case "TopAd":
                        var data = loadTopAd();
                        khClassific.topAd(ele, tplName, data.content);
                        break;
                    case "keyWord":
                        var data = loadKeyWord();
                        khClassific.keyWord(ele, tplName, data.content);
                        break;
                    case "newProduct":
                        var data = loadNewProduct();
                        khClassific.newProduct(ele, tplName, data.content);
                        break;
                    case "fullSlider":
                        var data = loadFullSlider();
                        khClassific.fullSlider(ele, tplName, data.content);
                        break;
                    case "saleList":
                        var data = loadSaleList();
                        khClassific.saleList(ele, tplName, data.content);
                        break;
                    case "recommendSlider" :
                        var data = loadRecommend();
                        khClassific.recommendSlider(ele, tplName, data.content);
                        break;
                    case "styleTheme":
                        var data = loadStyleTheme();
                        khClassific.styleTheme(ele, tplName, data.content);
                        break;
                    case "hotKeyword":
                        var data = loadHotKeyword();
                        khClassific.hotKeyword(ele, tplName, data.content);
                        break;
                    case "classificAdv":
                        var data = loadClassificAdv();
                        khClassific.classificAdv(ele, tplName, data.content);
                        break;
                    case "proFloor":
                        var data = loadProFloor();
                        khClassific.proFloor(ele, tplName, data.content);
                        break;
                    default :
                        break;
                }

                ele.removeClass("lazy-preview").addClass("lazy-load-done");

                lazyloadImg();
    }



    //lazyload
    function lazyloadImg() {
        $("img.lazy").lazyload({
            effect: 'fadeIn',
            threshold : 200
        });
    }


    //装修汇中部切换
    $('.J_decorationSlider').slide({
        titCell:".hd li",
        mainCell:".bd ul",
        effect:"left",
        pnLoop : false,
        easing:"easeInOutSine",
        delayTime:800 
    });

    //装修汇热门切换
    //
    $(".J_decorationHotSlider .bd li").each(function(i){ $(".J_decorationHotSlider .bd li").slice(i*10,i*10+10).wrapAll("<ul></ul>");});
     
    $(".J_decorationHotSlider").slide({
        mainCell:".bd .list",
        titCell:".hd .list",
        autoPage:true,
        effect:"topLoop",
        autoPlay:false,
        trigger: 'click'
    });
});