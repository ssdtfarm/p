define(function(require, exports, module) {

    /*  主站首页js文件
     *  @author linyandi
     *  @date   2015-08-27
     *
     *  修复个性定制浮窗：首屏以及浏览器宽度小于1430px不出现。
     *  @remix  yansiwen
     *  @date   2016-04-18
     */
 
    //引入依赖 
    //顶部搜索模块 

    var mainNav = require('../components/mainNav/1.0.1/mainNav');
    var slider = require('../components/slider/1.0.0/slider');
    var lazy = require('../components/lazyload/1.0.0/lazyload');
    var minBar = require('../components/minBar/1.0.1/minBar');
    var template = require('../template/tempIndex');
    var templateComment = require('../template/tempcomment');
    /*
     * 	修复首页焦点图——缩放页面时焦点图宽度不随浏览器变动
     * 	editor by yansiwen on 2016/01/04
     * */
    $(function() {
        var resizeTimeout = null;
        $(window).on("resize", function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(function() {
                var width = $(document.body).width();
                $(".bd ul").css({
                    "width": width > 1190 ? width : "1190px"
                }).children().css({
                    "width": width > 1190 ? width : "1190px"
                });
            }, 100);
        });
    });

    /*
     *     个性定制模块的位置处理
     * */

    setCustomOffset();
    //处理定制模块位置函数
    function setCustomOffset() {
        var tarDOM = $(".float-custom"); //以荣誉模块为标尺
        var offsetTop = 628;
        var minWidth = 1430;
        var winWidth = $(window).width();
        var scrollTop = $(document.body).scrollTop();

        // console.log(tarDOM, offsetTop, scrollTop);
        if ((scrollTop > offsetTop) && (winWidth > minWidth)) {
            tarDOM.fadeIn();
        } else {
            tarDOM.hide();
        }

        $(window).resize(function(event) {
            event.preventDefault();
            if ((scrollTop > offsetTop) && ($(window).width() > minWidth)) {
                tarDOM.fadeIn();
            } else {
                tarDOM.hide();
            }
        });
        $(window).scroll(function(event) {
            scrollTop = $(window).scrollTop();
            if ((scrollTop > offsetTop) && ($(window).width() > minWidth)) {
                tarDOM.fadeIn();
            } else {
                tarDOM.hide();
            }
        });
        /*
         *  处理首页个人定制浮窗在IE8下无法使用媒体查询的问题
         */
        try {
            if (navigator.userAgent.indexOf("MSIE 8.0") > -1 || navigator.userAgent.indexOf("MSIE 7.0") > -1) {
                //if (!Modernizr.mq('screen and (max-width:1430px)')) {
                $(window).resize(function() {
                    winWidth = $(window).width();
                    winWidth < minWidth ? $(".float-custom").hide() : $(".float-custom").show();
                });
                //}
            }
        } catch (e) {}
    }

    /* =========================================================================
     *               处理本页模板和获取模板数据
     *  =========================================================================*/

    //不需要获取数据的模板
    $(".JQ_preload").each(function() {
        var that = $(this);
        var tplName = that.attr("data-tpl");
        that.html(template(tplName)).removeClass("lazy-preview");

    });
    /*  ========================================================================
     *                       首页设置各种效果
     *   ========================================================================*/
    var khIndex = function() {};
    khIndex.fullSlider = function(ele, tplName, data) {
        try {
            var len = data.length;
            var nowTime = ele.attr("data-time") || new Date().getTime();
            var tempArr = [];
            var tempData = {};

            for (var i = 0; i < len; i++) {
                if ((data[i].startTime < nowTime) && (nowTime < data[i].endTime)) {
                    tempArr.push(data[i]);
                }
            }

            tempData.list = tempArr;

            ele.html(template(tplName, tempData));

            ele.slide({
                mainCell: '.bd ul', //内容区域
                titCell: '.hd ul', //标题区域
                effect: 'fold', //切换效果, fold-淡入淡出, fade-渐现
                autoPage: true, //自动分页
                autoPlay: true, //自动轮换
                interTime: 3000, //两张图片切换间隔
                delayTime: 500, //效果持续时间
                trigger: 'click' //鼠标点击切换图片
            });
        } catch (e) {
            ele.remove();
        }
    };
    khIndex.feastList = function(ele, tplName, data) {
        try {
            if (data.list.length == 0) {
                ele.remove();
            } else {
                ele.html(template(tplName, data));
            }
        } catch (e) {
            ele.remove();
        }
    };
    khIndex.recomSlider = function(ele, tplName, data) {
        try {
            var len = data.length;
            ele.html(template(tplName, data));

            //recommend slider
            $("#J_recommendSlider").slide({
                titCell: '.hd li',
                mainCell: '.bd ul',
                autoPage: false,
                autoPlay: true,
                trigger: 'mouseover',
                interTime: 5000,
                switchLoad: '_src',
                endFun: function() {
                    setRecommentPoint();
                }
            });

            setRecommentPointEvent();

            // hot sale list
            if (data.hotList.length > 4) {
                $("#J_hotSaleSliderBtn").removeClass("gray").addClass("next");
            }
            $("#J_hotSaleSlider").slide({
                titCell: '.hd ul',
                mainCell: '.bd',
                autoPage: true,
                effect: 'topLoop',
                switchLoad: "_src"
            });

        } catch (e) {
            ele.remove();
        }
    };
    khIndex.special = function(ele, tplName, data) {

        try {
            //如果没有设置这个时间戳就按照客户端的去判断
            var nTime = ele.attr("data-time") || new Date().getTime();
            var dIndex = -1;

            //获取离当前时间最近的数据
            for (var i = 0; i < data.length; i++) {
                if ((data[i].startTime < nTime) && (nTime < data[i].endTime)) {
                    dIndex = i;
                    break;
                }
            }
            //判断是否有可调用数据
            if (dIndex > -1) {
                //填充数据
                ele.html(template(tplName, data[dIndex]));
                //调用切换
                if ($("#J_indexSpecialSlider .bd li").length > 3) {

                    $("#J_indexSpecialSlider .s-icon").css({
                        "display": "inline-block"
                    });
                }
                $("#J_indexSpecialSlider").slide({
                    titCell: '.hd ul',
                    mainCell: '.bd ul',
                    vis: 3,
                    effect: 'left',
                    autoPage: true,
                    switchLoad: '_src'
                });


                var tarDay = ele.find("#J_sDay");
                var tarHou = ele.find("#J_sHour");
                var tarMin = ele.find("#J_sMinute");
                var tarSec = ele.find("#J_sSecond");

                //倒计时
                var coutDown = setInterval(function() {

                    var startTime = new Date().getTime(); //获取当前时间
                    var disTime = parseFloat(data[dIndex].endTime * 1000 - startTime);

                    if (disTime <= 0) {
                        window.clearInterval(coutDown);
                    } else {
                        var secon = parseInt(disTime / 1000);
                        var minus = parseInt(disTime / 1000 / 60); // 分钟数
                        var hours = parseInt(minus / 60); //小时
                        var day = parseInt(hours / 24); //天数

                        var curSecond = Math.floor(secon % 60) >= 10 ? (secon % 60) : "0" + (secon % 60);
                        var curMinus = Math.floor(minus % 60) >= 10 ? Math.floor(minus % 60) : "0" + Math.floor(minus % 60);
                        var curHour = Math.floor(hours % 24) >= 10 ? Math.floor(hours % 24) : "0" + Math.floor(hours % 24);
                        var curDay = Math.floor(day) >= 10 ? day : "0" + day;

                        tarDay.html(curDay);
                        tarHou.html(curHour);
                        tarMin.html(curMinus);
                        tarSec.html(curSecond);

                    }

                }, 1000);
            } else {
                //如果所有数据时间都比服务器现在时间早,则不显示当前的容器
                ele.remove()
            }
        } catch (e) {
            ele.remove();
        }
    };
    khIndex.daynew = function(ele, tplName, data) {
        try {
            //临时存储数组
            var tempArr = [];
            var len = data.length;
            var nowTime = ele.attr("data-time") || new Date().getTime();
            var dIndex = 0;
            //必须大于4个周的数据才会正常显示
            if (len >= 4) {
                //获取当前周的索引
                for (var i = 0; i < len; i++) {
                    if ((data[i].startTime < nowTime) && (nowTime < data[i].endTime)) {
                        tempArr[1] = data[i];
                        dIndex = i;
                        break;
                    }
                }

                /*
                 *  获取上周和下周的索引
                 *  情况1: 如果当前天数位于数据的第一周,那么上周就没有数据,则使用本周数据填充上周数据
                 *  情况2: 如果当前天数位于数据的最后一周,那么下周就没有数据,则使用本周填充下周数据
                 */
                var pIndex = dIndex <= 0 ? 0 : dIndex - 1;
                var nIndex = dIndex >= len ? len : dIndex + 1;
                tempArr[0] = data[pIndex];
                tempArr[2] = data[nIndex];

                for (var j = 0; j < tempArr.length; j++) {

                    tempArr[j].startTime = tempArr[j].sDay;
                    tempArr[j].endTime = tempArr[j].eDay;

                }
                var tData = {};

                tData.list = tempArr;

                //没有数据就删除容器
                if (data.length == 0) {
                    ele.remove();
                } else {
                    ele.html(template(tplName, tData));

                    $("#J_newerSlider").slide({
                        titCell: '.hd li',
                        mainCell: '.bd',
                        autoPage: false,
                        trigger: 'mouseover',
                        defaultIndex: 1,
                        switchLoad: "_src"
                    });
                }
            } else {
                ele.remove();
            }
        } catch (e) {
            ele.remove();
        }
    };
    khIndex.topicStyle = function(ele, tplname, data) {

        try {
            //没有数据就删除容器
            if (data.list.length == 0) {
                ele.remove();
            } else {
                //console.log(template(tplname, data));
                ele.html(template(tplname, data));

                if ($("#J_topicStyleSlider .bd li").length > 2) {
                    $("#J_topicStyleSlider .next").show();

                    $("#J_topicStyleSlider").slide({
                        titCell: '.hd ul',
                        mainCell: '.bd',
                        vis: 2,
                        autoPage: true,
                        effect: 'topLoop',
                        switchLoad: '_src'
                    });
                }
            }
        } catch (e) {
            ele.remove();
        }
    };
    khIndex.topAd = function(ele, tplName, data) {
        //console.log(data);
        var nowTime = ele.attr("data-time") || new Date().getTime();
        var dataIndex = -1;

        try {
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i].startTime, nowTime);
                if ((data[i].startTime < nowTime) && (nowTime < data[i].endTime)) {
                    dataIndex = i;
                    break;
                }
            }
            if (dataIndex > -1) {

                ele.html(templateComment(tplName, data[dataIndex]));

                var triggerDOM = ele.find("#J_indexTopAdClose");
                triggerDOM.on("click", function(event) {
                    ele.slideUp(500);
                });

            } else {
                ele.remove();
            }
        } catch (e) {
            ele.remove();
        }
    };
    khIndex.wrapAd = function(ele, tplName, data) {

        var nowTime = ele.attr("data-time") || new Date().getTime();
        var dataIndex = -1;

        try {
            for (var i = 0; i < data.length; i++) {
                if ((data[i].startTime < nowTime) && (nowTime < data[i].endTime)) {
                    dataIndex = i;
                    break;
                }
            }
            if (dataIndex > -1) {
                ele.html(template(tplName, data[dataIndex]));
            } else {
                ele.remove();
            }
        } catch (e) {
            ele.remove();
        }
    };

    khIndex.floor = function(ele, tplName, data) {
        try {
            if (data.list.length == 0) {
                ele.remove();
            } else {
                ele.html(template(tplName, data));

                $(".JQ_floorSubListItem").hover(function() {
                    //console.log("hover");
                    $(this).children(".list-item-title").stop(true, true).animate({
                        "bottom": "0"
                    });
                }, function() {
                    //console.log("out");
                    $(this).children(".list-item-title").stop(true, true).animate({
                        "bottom": "-18px"
                    });
                });
            }
        } catch (e) {
            ele.remove();
        }
    };
    khIndex.preferentials = function(ele, tplName, data) {
        try {
            if (data.list.length == 0) {
                ele.remove();
            } else {
                ele.html(template(tplName, data));
            }
        } catch (e) {
            ele.remove();
        }
    };
    /* =========================================================================
     *                           DOM容器懒加载插件
     *  =========================================================================*/

    $.fn.khlazy = function(options) {
        var defaults = {

        };
        $.extend(defaults, options);

        var winHei = $(window).height();

        var elem = this;

        var offsetTop = elem.offset().top;
        var scrollTop = $(window).scrollTop();

        if ((offsetTop - scrollTop) <= winHei && !elem.hasClass("lazy-load-done")) {
            getModuleData(elem);
        }

        $(window).on("scroll", function(event) {
            scrollTop = $(window).scrollTop();
            offsetTop = elem.offset().top;

            if ((offsetTop - scrollTop) <= winHei && !elem.hasClass("lazy-load-done")) {
                getModuleData(elem);
            }
        });
        //console.log(this.offset().top);

    };
    //循环监听页面容器
    $(".JQ_lazy").each(function() {
        var that = $(this);
        //开发阶段获取当前浏览器时间戳
        var nTime = new Date().getTime();
        that.attr("data-time", nTime);
        //调用懒加载
        that.khlazy();

    });
    /* 异步获取静态数据函数
     * @ele  jq对象.
     */
    function getModuleData(ele) {
        var tplName = ele.attr("data-tpl");
        var dataPath = ele.attr("data-path");

        var loadName = dataPath.split("_")[1];

        var ajaxPath = cdnConfig.misc;
        //同步方式处理数据

        switch (loadName) {
            case "FullSlider":
                var data = loadFullSlider();
                khIndex.fullSlider(ele, tplName, data.content);
                break;
            case "Recommend":
                var data = loadRecommend();
                khIndex.recomSlider(ele, tplName, data.content);
                break;
            case "Special":
                var data = loadSpecial();
                khIndex.special(ele, tplName, data.content);
                break;
            case "DayNew":
                var data = loadDayNew();
                khIndex.daynew(ele, tplName, data.content);
                break;
            case "TopicStyle":
                var data = loadTopicStyle();
                khIndex.topicStyle(ele, tplName, data.content);
                break;
            case "TopAd":
                var data = loadTopAd();
                khIndex.topAd(ele, tplName, data.content);
                break;
                //case "WrapAd" :
                //  var data = loadWrapAd();
                //  khIndex.wrapAd(ele, tplName, data.content);
                //
                //  break;
            case "Floor":
                var data = loadFloor();
                khIndex.floor(ele, tplName, data.content);
                break;
            case "Preferentials":
                var data = loadPreferentials();
                khIndex.preferentials(ele, tplName, data.content);
                break;
            case "feastList":
                var data = loadfeast();
                khIndex.feastList(ele, tplName, data.content);
                break;
            default:
                break;
        }

        ele.removeClass("lazy-preview").addClass("lazy-load-done");

        lazyloadImg();
    }
    
    /*
     *  主导航滑动效果  =================================================
     */

    //主导航效果
    mainNav({
        mainCell: "JQ_headNavMenu",
        lineCell: "JQ_headNavLine"
    });
    /*
     *    今日推荐漂浮提示框  ==========================================
     */

    function setRecommentPoint() {
        var pointItem = $("#J_recommendSlider .bd li");
        var flag = [];
        pointItem.each(function(index, item) {
            flag[index] = "false";
            //console.log(index);
            if (item.style.display != 'none') {
                var that = $(this).find(".point");
                var box = $(this).find(".point-box");
                var maxLeft = 640;
                var maxTop = 490;

                var tLeft = that.position().left;
                var tTop = that.position().top;

                if ((maxLeft - tLeft) > 326) {
                    box.css({
                        "left": parseInt(tLeft + 16) + "px"
                    });
                } else {
                    box.css({
                        "right": parseInt(maxLeft - tLeft) - 16 + "px"
                    });
                }
                if ((maxTop - tTop) > 222) {
                    box.css({
                        "top": parseInt(tTop + 42) + "px"
                    });
                } else {
                    box.css({
                        "bottom": parseInt(maxTop - tTop) + 10 + "px"
                    });
                }

            }

        });
    }

    function setRecommentPointEvent() {

        var flag = [];

        $(".JQ_recItem").each(function(index, item) {
            var that = $(this);
            var box = that.find(".point-box");
            var point = that.find(".point-plus");


            flag[index] = "false";

            point.click(function(event) {

                event.preventDefault();
                event.stopPropagation();

                if (flag[index] == "false") {
                    flag[index] = "true";
                    box.fadeIn();
                } else {
                    flag[index] = "false";
                    box.fadeOut();
                }
            });
        });
    }
    /*
     *     装修汇模块 ===================================================
     *
     */
    if ($("#J_fitmentHotSlider .bd li").length > 1) {
        $("#J_fitmentSliderBtn").removeClass("gray").addClass("next");
        $("#J_fitmentHotSlider").slide({
            titCell: '.hd ul',
            mainCell: '.bd ul',
            autoPage: '<li></li>',
            effect: 'topLoop',
            vis: 1,
            scroll: 1
        });
    }

    //seo新增模块
    $(function() {
        newListSlider("#J_newListSlider1");
        newListSlider("#J_newListSlider2");
    });

    function newListSlider(id) {
        $(id).slide({
            titCell: '.hd ul',
            mainCell: '.bd ul',
            autoPage: '<li></li>',
            effect: 'topLoop',
            pnLoop: false,
            vis: 1,
            scroll: 1,
            startFun: function(i, c) {
                var that = $(id);
                if (i == 0) {
                    that.find(".prev").hide();
                    that.find(".next").show();
                } else {
                    if (i == 1) {
                        that.find(".prev").show();
                        that.find(".next").hide();
                    };
                };
            }
        });
    }
    /* =====================================================================
     *                       处理装修汇"more"标签
     *  =====================================================================*/

    $(".news-list-more a").html("MORE>");
    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/

    minBar({
        mainCell: '#J_minBar',
        pathConfig: cdnConfig,
        tpl: templateComment,
        tplName: "tplMinBar",
        data: _globalConfig.minBar.data
    });
    /* =====================================================================
     *                          底部友情链接
     * =====================================================================*/

    oprationLink();

    function oprationLink() {
        var mainDOM = $("#J_indexFootLink");
        var items = mainDOM.find(".lItem");
        var len = mainDOM.find(".lItem").length;
        var startNum = 28;

        if (len == 0) {
            mainDOM.remove();
        } else {
            if (len > startNum) {
                mainDOM.append('<A id="J_indexShowAllLink" href="javascript:void(0);">更多 >></A>');
                items.each(function(index) {
                    if (index > startNum) {
                        $(this).hide();

                    }
                });

            }
        }
        //监听点击更多按钮
        $(document).on("click", "#J_indexShowAllLink", function(event) {
            event.preventDefault();

            $(this).remove();

            items.each(function(index) {
                if (index > startNum) {
                    $(this).fadeIn();

                }
            });
        });

    }
    /*
     *  调用懒加载函数  ===================================================
     */
    $(function() {
        lazyloadImg();
    });
    /*
     *   懒加载图片函数 ======================================================
     * */

    function lazyloadImg() {
        $("img.lazy").lazyload({
            effect: 'fadeIn',
            threshold: 200
        });
    }
});
