define(function(require, exports, module) {
    /*===============================*/
    /*  详情页js文件
     *  @author linyandi
     *  @date   2015-03-24 
     /* ==============================*/
    //引入依赖
    var template = require("../../template/tempcomment");

    var mainNav = require('../../components/mainNav/1.0.1/mainNav');
    var qrcoder = require('../../components/qrcode/1.0.0/qrcode');
    var dialog = require('../../components/dialog/1.0.0/dialog');
    var loginDialog = require('../../components/loginDialog/1.0.0/loginDialog');
    var lazyload = require('../../components/lazyload/1.0.0/lazyload');
    var zoom = require('../../components/zoom/1.0.0/zoom');
    var itemPage = require('../../components/itemPage/1.0.0/itemPage');
    var itemAddress = require('../../components/itemAddress/1.0.0/itemAddress');
    var slider = require('../../components/slider/1.0.0/slider');

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
    /*
     * 315详情页专有接口 ============================================
     */
    // jiathis自定义分享URL和Title
    var jiathis_config = { 
        url: "http://sale.kinhom.com/juhuasuan.html", 
        title: "【金海马商城聚划算】", 
        summary:"创意户外高端便携透明水杯0元抢购，限前1000名。",
        pic: "http://misc.jjcdn.com/p/images/item-315-goods.jpg"
    }
    window.jiathis_config = jiathis_config;
    $(function(){
        // $(".sub-hot-sale").eq(0).find("img").attr("src","http://misc.jjcdn.com/p/images/item-315-goods.jpg");
        $(".logo").prepend('<img src="http://misc.jjcdn.com/p/images/item-315-goods.jpg" width="0" height="0" />')
        // 修改页面title以控制微信分享title
        $("title").html("【金海马商城聚划算】创意户外高端便携透明水杯0元抢购，限前1000名。")
        // 获取已购商品数量
        $.ajax({
            url: "/ju/saleCount",
            type: "GET", 
            success: function(res){
                $("#J_saled").html(res.count);
            },
            error: function(){
                $("#J_saled").html("--");
            }
        });
        // 显示“3月4日10:00准点开抢”
        if (parseInt(new Date().getTime()/1000) - juConfig.startTime < 0) {
            $(".J_itemTips").show();
            $(".JQ_addToCart").html("敬请期待<i></i>"); 
        } else {
            $(".JQ_addToCart").addClass("on");
            $(".JQ_addToCart").html("立即抢购<i></i>");
        }
        // 倒计时
        setInterval(function(){
            var now = parseInt(new Date().getTime()/1000);
            var endTime = juConfig.endTime;
            var lastTimes = endTime-now < 0 ? 0 : endTime-now;

            var lastDays = parseInt(lastTimes/86400);
            var lastHours = parseInt((lastTimes%86400)/3600);
            var lastMinutes = parseInt((lastTimes%86400%3600)/60);
            var lastSeconds = lastTimes%86400%3600%60;

            lastHours < 10 ? lastHours = "0" + lastHours : lastHours = lastHours;
            lastMinutes < 10 ? lastMinutes = "0" + lastMinutes : lastMinutes = lastMinutes;
            lastSeconds < 10 ? lastSeconds = "0" + lastSeconds : lastSeconds = lastSeconds;

            $(".item-info-sp-list dt").html('距离结束还剩：'+lastDays+'天'+lastHours+'小时'+lastMinutes+'分'+lastSeconds+'秒');

        },1000);

        /*var imgUrl = 'http://xxx/share_ico.png';  // 分享后展示的一张图片
        var lineLink = 'http://xxx'; // 点击分享后跳转的页面地址
        var descContent = "xx！";  // 分享后的描述信息
        var shareTitle = 'xx';  // 分享后的标题
        var appid = '';  // 应用id,如果有可以填，没有就留空
        
        function shareFriend() {
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid": appid,
                "img_url": imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function(res) {
                //_report('send_msg', res.err_msg);  // 这是回调函数，必须注释掉
            })
        }
        function shareTimeline() {
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url": imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function(res) {
                   //_report('timeline', res.err_msg); // 这是回调函数，必须注释掉
            });
        }
        function shareWeibo() {
            WeixinJSBridge.invoke('shareWeibo',{
                "content": descContent,
                "url": lineLink,
            }, function(res) {
                //_report('weibo', res.err_msg);
            });
        }
        // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            // 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
                shareFriend();
            });
            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function(argv){
                shareTimeline();
            });
            // 分享到微博
            WeixinJSBridge.on('menu:share:weibo', function(argv){
                shareWeibo();
            });
        }, false);*/

    });

    /* 
     * 产品相册处理模块 ============================================
     */
    //页面加载完毕调用zoom插件
    /*$(function(){
        $("#J_albumBig").zoom({
            url : $("#J_albumBig").children("img").attr("src")
        });
    });*/
    //点击小图设置大图
    $("#J_thumb li a").each(function(index) {
        var that = $(this);
        that.on("click", function(event) {
            event.preventDefault();
            //变换class
            toggleClass(that.parent("li"), "cur");
            //设置大图
            setBigThumb(that, "J_albumBig");
        });
    });
    /*
     * 变换class函数 toggleClass(obj, className)
     * @param obj为要操作的对象
     * @param className 变换的class名
     */
    function toggleClass(obj, className) {
        if (!obj.hasClass(className)) {
            obj.addClass(className);
            obj.siblings().removeClass(className);
        }
    }
    /*
     * 点击小图设置大图函数 setBigThumb(obj, domID)
     * @param obj当前对象
     * @param domID 目标对象ID
     */
    function setBigThumb(obj, domID) {
        var sourceURL = obj.children("img").attr("src");

        var targetURL = sourceURL.indexOf("!") > -1 ? sourceURL.split("!")[0] + "!max" : sourceURL;
        var tarObj = $("#" + domID).children("img");
        tarObj.attr("src", targetURL);
    }
    //设置 “加入购物车按钮"
    function setButton(num) {
        if (num > 1) {
            //如果没有售空/下架，能加入购物车
            //如果页面出现$("#J_preSaleType")，为预售商品;
            if ($("body").find($("#J_preSaleType")) && itemIsPreSale == 1) {
                $(".item-btn-cart,.tab-cart-btn").attr("id", "J_preSalePay");
            } else {
                $(".item-btn-cart,.tab-cart-btn").attr("id", "JQ_addToCart");
            };
            $(".item-btn-cart,.tab-cart-btn").removeClass("disable");
        } else {
            //不能加入购物车
            $(".item-btn-cart,.tab-cart-btn").removeAttr("id");
            $(".item-btn-cart,.tab-cart-btn").addClass("disable");
            //立即购不能用
            $("#J_buyNow").remove();
        }
    }
    /*
     * 加入购物车 ===========================================================
     */
    $(document).on("click", ".JQ_addToCart", function(event) {
        event.preventDefault();
        if ($(this).hasClass("on")) {
            $.ajax({
                url: "/ju/addToCart",
                type: "GET",
                success: function(res){
                    if (res.code == "success") {
                        var addDialog = new dialog({
                            title: '成功加入购物车',
                            content: '<p>&nbsp;</p><p class="tc fs-16"><i class="icon-face-smile-orange"></i>&nbsp;&nbsp;<b>'+res.msg+'</b></p>',
                            width: 400,
                            height: 80,
                            fixed: true,
                            zIndex: 198502,
                            button: [{
                                value: '去购物车结算',
                                className: 'ui-btns-orange',
                                callback: function() {
                                    // window.location.href = cdnConfig.cartApiPath + '/list.html';
                                    location.assign(res.data.url);
                                    // window.location.href = res.data.url;
                                }
                            }, {
                                value: '继续逛逛',
                                className: 'ui-btns-blue',
                                callback: function() {}
                            }] 
                        }).showModal();
                    } else if (res.code == "need_login") {
                        loginDialog({
                            "cdnConfig": cdnConfig,
                            "tpl": template,
                            "dialog": dialog
                        });
                    } else if (res.code == "need_bind_phone") {
                        var addDialog = new dialog({
                            title: '提示',
                            content: '<p>&nbsp;</p><p class="tc fs-16"><b>'+res.msg+'</b></p>',
                            width: 400,
                            height: 80,
                            fixed: true,
                            zIndex: 198502,
                            button: [{
                                value: '去绑定',
                                className: 'ui-btns-orange',
                                callback: function() {
                                    // window.location.href = cdnConfig.cartApiPath + '/list.html';
                                    // location.assign(cdnConfig.my+'/security/bindphone','_blank');//当前窗口
                                    window.open(cdnConfig.my+'/security/bindphone');//新窗口
                                }
                            }]
                        }).showModal();
                    } else if (res.code == "fail") {
                        var addDialog = new dialog({
                            title: '提示',
                            content: '<p>&nbsp;</p><p class="tc fs-16"><b>'+res.msg+'</b></p>',
                            width: 400,
                            height: 80,
                            fixed: true,
                            zIndex: 198502,
                            button: [{
                                value: '确定',
                                className: 'ui-btns-orange'
                            }]
                        }).showModal();
                    }
                },
                error: function(){
                    alert("error");
                }
            });
        }
    });
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
    /*
     *    处理广告 =============================================================
     * */

    /*=========== 全横幅广告的处理 ==========*/
    var itemData = {topAd:[],detailAd:[]};
    $(function() {
        /* 顶部广告 */
        loadFullAd("#J_TopAd", "tplTopAd", "#J_indexTopAdClose", itemData.topAd);
        /* 底部部广告 */
        loadFullAd("#J_bottomAd", "tplBottomAd", "#J_itemBottomAdClose", itemData.topAd);
    });
    function loadFullAd(adId, adTplId, adCloseId, dataName) {
        var target = $((adId));
        var nowTime = target.attr("data-time") || new Date().getTime();
        //var tempArr = [];
        var list = dataName; 
        //console.log(list);
        if (list.length === 0) {
            target.remove();
        } else {
            for (var i = 0; i < list.length; i++) {
                if ((list[i].startTime < nowTime) && (nowTime < list[i].endTime)) {
                    target.html(template(adTplId, list[i]));
                    break;
                }
            }
            var triggerDOM = target.find(adCloseId);
            triggerDOM.on("click", function(event) {
                target.slideUp(500);
            });
        }
    }
    /* 商品详情广告 */
    loadDetailAd();
    function loadDetailAd() {
        var target = $("#J_detailAd");
        var nowTime = target.attr("data-time") || new Date().getTime();
        var list = itemData.detailAd;
        var html = '';

        if (list.length === 0) {
            target.remove();
        } else {
            for (var i = 0; i < list.length; i++) {
                //判断当前服务器时间是否在广告设定的时间段内
                if ((list[i].startTime < nowTime) && (nowTime < list[i].endTime)) {

                    html += '<A href="' + list[i].linkURL + '" target="_blank" title="' + list[i].title + '">';
                    html += '<img src="' + list[i].imgURL + '" width="900" height="182" />';
                    html += '</a>';

                    target.html(html);
                    //只取一个符合条件的广告,其它的忽略
                    break;
                }
            }
        }
    }
    /* 左边广告 */
    function loadLeftAd() {
        var target = $("#J_itemLeft");
        var nowTime = $("#J_TopAd").attr("data-time") || new Date().getTime();
        var list = itemData.leftAd;
        var html = '<div class="item-left-ad">';
        var tempArr = [];

        if (list.length === 0) {
            //target.remove();
        } else {
            for (var i = 0; i < list.length; i++) {
                if ((list[i].startTime < nowTime) && (nowTime < list[i].endTime)) {
                    tempArr.push(list[i]);
                }
            }

            for (var j = 0; j < tempArr.length; j++) {
                html += '<a class="left-ad-item" href="' + tempArr[j].linkURL + '" target="_blank" >';
                html += '<img class="lazy" data-original="' + tempArr[j].imgURL + '" width="200" height="270" alt="' + tempArr[j].title + '" />';
                html += '</a>';
            }

            html += '</div>';

            target.append(html);

            lazyloadImg();
        }
    }
});
