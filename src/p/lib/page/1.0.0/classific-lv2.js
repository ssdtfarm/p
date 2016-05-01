define(function(require, exports, module) {
    /*===============================*/
    /*  二级分类页
     *  @author lijinrong
     *  @date   2015-08-19
     /* ==============================*/
    //引入依赖
    var tempClassific = require('../../template/tempClassific');
    var tempcomment = require('../../template/tempcomment');

    var mainNav = require('../../components/mainNav/1.0.1/mainNav');
    var qrcoder = require('../../components/qrcode/1.0.0/qrcode');
    var dialog = require('../../components/dialog/1.0.0/dialog');
    var lazyload = require('../../components/lazyload/1.0.0/lazyload');
    var zoom = require('../../components/zoom/1.0.0/zoom');
    var itemPage = require('../../components/itemPage/1.0.0/itemPage');
    var itemAddress = require('../../components/itemAddress/1.0.0/itemAddress');
    var slider = require('../../components/slider/1.0.0/slider');
    var minBar = require('../../components/minBar/1.0.1/minBar');

    var addFly = require("../../components/addCartFly/1.0.0/addCartFly");

    /*
     * 导航栏和所有分类下拉菜单 =======================================
     */
    $("#J_mainNav").html($("#J_mainNavTemp").html());
    //主导航效果
    mainNav({
        mainCell: "JQ_headNavMenu",
        lineCell: "JQ_headNavLine"
    });
    //右侧购物车导航
    minBar({
        mainCell: '#J_minBar',
        pathConfig: cdnConfig,
        tpl: tempcomment,
        tplName: "tplMinBar",
        data : _globalConfig.minBar.data
    });
    //商品蒙层
    $('.img-link').hover(function() {
        $(this).find('.mark-info').show();
    }, function() {
        $(this).find('.mark-info').hide();
    });

    //筛选条件不为空是像是撤销按钮
    if ($('.selector-hd dd').length > 0) {
        $('.reset').show();
    }

    var khClassific = function() {};
    khClassific.topAd = function(ele, tplName, data) {
        var nowTime = ele.attr("data-time") || new Date().getTime() / 1000;
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
    khClassific.recommendList = function(ele, tplName, data) {
        try {
            ele.html(tempClassific(tplName, data));
        } catch (e) {
            ele.remove();
        }
    };
    khClassific.hotSaleing = function(ele, tplName, data) {
        try {
            ele.html(tempClassific(tplName, data));


            ele.find('.img-link').hover(function() {
                $(this).find('.mark-info').show();
            }, function() {
                $(this).find('.mark-info').hide();
            });
        } catch (e) {
            ele.remove();
        }
    };
    khClassific.youLike = function(ele, tplName, data) {
        try {

            ele.html(tempClassific(tplName, data));

            ele.find('.img-link').hover(function() {
                $(this).find('.mark-info').show();
            }, function() {
                $(this).find('.mark-info').hide();
            });

        } catch (e) {
            ele.remove();
        }
    };
    khClassific.sideAd = function(ele, tplName, data) {
        var nowTime = ele.attr("data-time") || new Date().getTime() / 1000;
        var tmp = {};
        tmp.list = [];
        try {
            for (var i = 0; i < data.length; i++) {
                if ((data[i].startTime < nowTime) && (nowTime < data[i].endTime)) {
                    tmp.list.push(data[i]);
                }
            }
            if (tmp.list.length > 0) {
                ele.html(tempClassific(tplName, tmp));
            } else {
                ele.remove();
            }
        } catch (e) {
            ele.remove();
        }
    };
    khClassific.history = function(ele, tplName, data) {
        try {
            if (data.list.length >= 1) {
                ele.html(tempClassific(tplName, data));

                $(".J_historySlider .bd li").each(function(i) {
                    $(".J_historySlider .bd li").slice(i * 4, i * 4 + 4).wrapAll("<ul></ul>");
                });

                $(".J_historySlider").slide({
                    titCell: ".hd ul",
                    mainCell: ".bd .list",
                    autoPage: true,
                    effect: "top",
                    autoPlay: false,
                    trigger: 'click'
                });

            } else {
                ele.remove();
            }

        } catch (e) {
            ele.remove();
        }
    };
    khClassific.listAd = function(ele, tplName, data) {
        var nowTime = ele.attr("data-time") || new Date().getTime() / 1000;
        var tmp = {};
        tmp.list = [];
        try {
            for (var i = 0; i < data.list.length; i++) {
                if ((data.list[i].startTime < nowTime) && (nowTime < data.list[i].endTime)) {
                    tmp.list.push(data.list[i]);
                }
            }
            if (tmp.list.length > 0) {
                ele.html(tempClassific(tplName, tmp));

                $('.J_listAdvSlider').slide({
                    mainCell: '.bd ul',
                    effect: 'left',
                    switchLoad: '_src',
                    autoPlay: true,
                    autoPage: true,
                    interTime: 4000,
                    pnLoop: false,
                    delayTime: 500
                });
            } else {
                ele.remove();
            }
        } catch (e) {
            ele.remove();
        }
    };
    //DOM容器懒加载插件
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

            if ((offsetTop - scrollTop) <= winHei && !elem.hasClass("lazy-load-done")) {
                getModuleData(elem);
            }
        });
    };

    $(function() {
        lazyloadImg();
        //循环监听页面容器
        $(".J_lazy").each(function() {
            var that = $(this);
            that.khlazy();
        });
        $(".JQ_lazy").each(function() {
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

        switch (loadName) {
            case "TopAd":
                var data = loadTopAd();
                khClassific.topAd(ele, tplName, data.content);
                break;
            case "recommendList":
                var data = loadHotRecommend();
                khClassific.recommendList(ele, tplName, data.content);
                break;
            case "hotSaleing":
                var data = loadHotSaleing();
                khClassific.hotSaleing(ele, tplName, data.content);
                break;
            case "youLike":
                var data = loadYouLike();
                khClassific.youLike(ele, tplName, data.content);
                break;
            case "sideAd":
                var data = loadSideAd();
                khClassific.sideAd(ele, tplName, data.content);
                break;
            case "history":
                var data = loadHistory();
                khClassific.history(ele, tplName, data.content);
                break;
            case "listAd":
                var data = loadListAd();
                khClassific.listAd(ele, tplName, data.content);
                break;
            default:
                break;
        }

        ele.removeClass("lazy-preview").addClass("lazy-load-done");

        lazyloadImg();
    }

    //lazyload
    function lazyloadImg() {
        $("img.lazy").lazyload({
            effect: 'fadeIn',
            threshold: 200
        });
    }
    //属性选择跳转
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    };
    (function() {
        //单个选择条件
        var conditions = $('.selector-bd dd>a');
        var url = location.protocol + '//' + location.host + location.pathname;
        var search = location.search;

        var cat = getUrlParam('cat');
        var brand = getUrlParam('brand');
        var style = getUrlParam('style');
        var spec = getUrlParam('spec');
        var priceRange = getUrlParam('priceRange');
        var rid = getUrlParam('rid');

        //添加选择条件
        conditions.on('click', function() {

            var self = $(this);
            var str = self.html();
            var id = self.attr('data-id');
            var type = self.attr('data-type');

            switch (type) {
                case 'brand':
                    brand = id;
                    break;
                case 'style':
                    style = id;
                    break;
                case 'priceRange':
                    priceRange = id;
                    break;
                case 'spec':
                    if (spec != '' && spec != null) {
                        spec = spec + ',' + id;
                    } else {
                        spec = '';
                        spec += id;
                    }
                    break;
            }
            go(cat, brand, style, spec, priceRange, rid);

        });

        function go(cat, brand, style, spec, priceRange, rid) {
            var brandTxt = '&brand=';
            var styleTxt = '&style=';
            var specTxt = '&spec=';
            var ridTxt = '&rid=';
            var priceRangeTxt = '&priceRange=';
            brand === null ? brandTxt = '' : brandTxt += brand;
            style === null ? styleTxt = '' : styleTxt += style;
            spec === null ? specTxt = '' : specTxt += spec;
            rid === null ? ridTxt = '' : ridTxt += rid;
            priceRange === null ? priceRangeTxt = '' : priceRangeTxt += priceRange;
            window.location.href = url + '?cat=' + cat + brandTxt + ridTxt + styleTxt + specTxt + priceRangeTxt;
        }

        //移除选择条件
        $('.selector-hd dd').on('click', function() {

            var self = $(this);
            var str = self.html();
            var id = self.attr('data-id');
            var type = self.attr('data-type');
            switch (type) {
                case 'brand':
                    go(cat, null, style, spec, priceRange, rid);
                    break;
                case 'style':
                    go(cat, brand, null, spec, priceRange, rid);
                    break;
                case 'priceRange':
                    go(cat, brand, style, spec, null, rid);
                    break;
                case 'spec':
                    if (spec.indexOf(id) > -1) {
                        var arr = spec.split(',');
                        var rs = [];
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] !== id) {
                                rs.push(arr[i]);
                            }
                        }
                        spec = rs.join(',');
                    }
                    go(cat, brand, style, spec, priceRange, rid);
                    break;
            }

        });

        $('.select-price').on('click', function() {
            var self = $(this);
            var price1 = self.siblings('input')[0].value;
            var price2 = self.siblings('input')[1].value;

            if (price1 == '') {
                //self.siblings('input')[0].focus();
                //return;
                price1 = 0;
            }

            if (price2 == '') {
                //self.siblings('input')[1].focus();
                //return;
                price2 = 99999;
            }
            priceRange = price1 + '~' + price2;
            go(cat, brand, style, spec, priceRange, rid);
        });

    })();
    //条件刷选更多切换
    ;(function() {

        var category = $('.selector-bd dl:gt(3)');
        category.hide();

        var toggleBtn = $('.more-select');
        toggleBtn.on('click', function() {
            if (category.is(':visible')) {
                category.hide();
                $(this).find('span').html("更多选项");
            } else {
                category.show();
                $(this).find('span').html("收起");

            }
        });


        $('.pro-item').hover(function() {
            var self = $(this);
            var cart = self.find('.cart');
            var favors = self.find('.favors');
            cart.show();
            favors.show();
        }, function() {
            var self = $(this);
            var cart = self.find('.cart');
            var favors = self.find('.favors');
            if (!cart.hasClass('cart-active')) {
                cart.hide();
            }
            if (!favors.hasClass('favors-active')) {
                favors.hide();
            }
        });
    })();

    //上下页切换
    ;(function() {
        var next = $('.nav-sort .next-page');
        var prev = $('.nav-sort .prev-page');
        var now = $('.nav-sort .page-now');
        var all = $('.nav-sort .page-all');

        var curpage = getUrlParam('curpage');

        var url = window.location.href;
        if (now.html() * 1 != all.html() * 1) {
            next.addClass('page-active');
        }
        next.on('click', function() {
            if (now.html() * 1 < all.html() * 1) {
                if (curpage == null) {
                    window.location.href = url + '&curpage=' + (now.html() * 1 + 1)
                } else {
                    window.location.href = url.replace(/(&curpage=)(\d{1,3})/, function() {
                        var str = RegExp.$2 * 1 + 1;
                        return RegExp.$1 + str;
                    })
                }
            }
        });

        if (now.html() * 1 != 1) {
            prev.addClass('page-active');
        }
        prev.on('click', function() {
            if (now.html() * 1 > 1) {
                if (curpage == null) {
                    window.location.href = url + '&curpage=' + (now.html() * 1 + 1)
                } else {
                    window.location.href = url.replace(/(&curpage=)(\d{1,3})/, function(match, p1, p2) {
                        var str = p2 * 1 - 1;
                        return p1 + str;
                    })
                }
            }
        });
    })();




    /*控制分页跳转*/

    $(".paginator input[type='submit']").on('click', function(ev) {
        ev.preventDefault();
        var toPage = $('#toPage');
        var pageVal = $.trim(toPage.val());
        var totalPage = $('.page-all').html();

        if (pageVal == '' || pageVal <= 0) {
            toPage.val(1);
        } else if (parseInt(pageVal) > parseInt(totalPage)) {
            toPage.val(totalPage);
        }
        $(this).parent('form').submit();
    });

    /**
     *  加入购物车===========================================================
     *  @param   {}
     */
    $(".cart").on("click", function(event) {
        var self = $(this);
        var skuID = self.attr('data-skuid');
        var proImg = self.siblings('.pro-link').find('img');
        event.preventDefault();
        //飞入购物车
        flyToCart(proImg, self);
        //异步请求
        $.ajax({
            url: cdnConfig.cartApiPath + '/default/addcart/' + skuID + '/1',
            dataType: 'jsonp',
            success: function(res) {
                if (res.status == "succ") {
                    $('#J_cartNum').html($('#J_cartNum').html() * 1 + 1);
                }
            }
        });
    });

    //动画加入购物车效果
    function flyToCart(proImg, btn) {

        var clickDOM = btn; //点击对象
        var imgDOM = proImg;
        //console.log(imgDOM);
        //点击按钮的左边距和上边距
        var sLeft = btn.offset().left;
        var sTop = btn.offset().top;

        var tarDOM = $(".min-bar-cart-icon"); //目标元素
        var eLeft = tarDOM.offset().left;
        var eTop = tarDOM.offset().top;

        var wScrollTop = $(window).scrollTop();

        var $colone = proImg.clone();
        $colone.attr("class", "J_flyImg").css({
            'width': '30',
            'height': '30'
        }).appendTo(btn);

        //console.log(sLeft, sTop, eLeft, eTop, wScrollTop);
        //
        $colone.fly({
            start: {
                left: sLeft, //开始位置（必填）#fly元素会被设置成position: fixed
                top: sTop - wScrollTop //开始位置（必填）
            },
            end: {
                left: eLeft, //结束位置（必填）
                top: eTop - wScrollTop, //结束位置（必填）
                width: 10, //结束时高度
                height: 10 //结束时高度
            },
            autoPlay: true, //是否直接运动,默认true
            speed: 1.0, //越大越快，默认1.2
            vertex_Rtop: 60, //运动轨迹最高点top值，默认20
            onEnd: function() {
                    $colone.remove();
                } //结束回调
        });
    }



    /**
     *  加入收藏 ===========================================================
     *  @param   {}
     */
    $(".favors").on("click", function(event) {
        var self = $(this);
        var skuID = self.attr('data-skuid');
        event.preventDefault();
        //异步请求
        $.ajax({
            url: cdnConfig.apiPath + '/favorite/add/' + skuID,
            dataType: 'jsonp',
            success: function(res) {
                if (res.status == "succ") {

                    showFavoriteDialog(res.data, self);
                }
            }
        });
    });
    //显示弹框函数
    function showFavoriteDialog(data, favors) {
        var dHtmlHead = '<p>&nbsp;</p><p class="tc fs-14">';
        var dHtmlFoot = '</p>';

        //弹窗
        var d = new dialog({
            title: '提示',
            width: 400,
            height: 80,
            fixed: true
        });
        switch (data.status) {
            //加入收藏成功
            case 'succ':
                d.button([{
                    value: '查看收藏夹',
                    className: 'ui-btns-orange',
                    callback: function() {
                        //跳转到收藏夹
                        window.location.href = ''
                    },
                    value: '继续逛逛',
                    className: 'ui-btns-blue',
                    callback: function() {}
                }]);
                d.content(dHtmlHead + data.msg + dHtmlFoot);
                d.showModal();
                favors.addClass('favors-active');
                break;
            case 'nologin':
                d.button([{
                    value: '去登录',
                    className: 'ui-btns-orange',
                    callback: function() {
                        //去登录页面
                        window.location.href = cdnConfig.my + '/passport/login';
                    }
                }, {
                    value: '继续逛逛',
                    className: 'ui-btns-blue',
                    callback: function() {}
                }]);
                d.content(dHtmlHead + data.msg + dHtmlFoot);
                d.showModal();
                break;
            case 'failed':
                d.button([{
                    value: '好的',
                    className: 'ui-btns-orange',
                    callback: function() {}
                }])
                d.content(dHtmlHead + data.msg + dHtmlFoot);
                d.showModal();
                break;
            default:
                d.button([{
                    value: '好的',
                    className: 'ui-btns-orange',
                    callback: function() {}
                }]);
                d.content(dHtmlHead + data.msg + dHtmlFoot);
                d.showModal();
                break;
        }
    }



});
