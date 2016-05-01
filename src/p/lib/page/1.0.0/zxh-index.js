define(function(require, exports, module) {
    var slider = require("../../components/slider/1.0.0/slider");
    var minBar = require('../../components/minBar/1.0.1/minBar');
    var template = require('../../template/tempcomment');

    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell: '#J_minBar',
        pathConfig: cdnConfig,
        tpl: template,
        tplName: "tplMinBar",
        data: _globalConfig.minBar.data
    });

    //顶部主图切换调用
    $("#J_mainScroller").slide({
        titCell: '.hd ul',
        mainCell: '.bd ul',
        autoPage: '<a>&nbsp;</a>',
        autoPlay: true,
        effect: 'left'
    });
    //频道成功案例切换调用
    $(".JQ_successSlider").slide({
        titCell: '.hd ul',
        mainCell: '.bd ul',
        effect: 'left',
        autoPlay: true,
        autoPage: true,
        delayTime: 700
    });
    // 首页及文章详情页相关文章部分标题切换调用
    $(".JQ_addtionalDetail").each(function(index, item) {
        $(item).on({
            "mouseenter": function(event) {
                if (!$(".JQ_addtionalTitile").eq(index).is(":hidden")) {
                    $(".JQ_addtionalTitile").eq(index).hide();
                    $(".JQ_addtionalArticle").eq(index).show();
                }
            },
            "mouseleave": function(event) {
                if ($(".JQ_addtionalTitile").eq(index).is(":hidden")) {
                    $(".JQ_addtionalArticle").eq(index).hide();
                    $(".JQ_addtionalTitile").eq(index).show();
                }
            }
        });
    });
    // 首页“成功案例”只有一张图时箭头消失
    $(".JQ_successSlider").each(function() {
        if ($(this).find("img").length == 1)
            $(this).children("a").css("display", "none");
    });
    // 首页"最新"文字向上无缝滚动
    $(".JQ_newList").slide({
        mainCell: ".bd ul",
        autoPlay: true,
        effect: "top",
        scroll: 1,
        vis: 2
    });

    // 详情页“回到顶部”的效果
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 300) {
            $("#J_totop").fadeIn("fast");
        }
        if ($(window).scrollTop() < 300) {
            $("#J_totop").fadeOut("fast");
        }
    });
    $("#J_totop i").click(function() {
        $("html,body").stop().animate({ scrollTop: "0px" }, 300);
    });
    //});
});
