/*
 *  产品对比页面需求中途关闭，保留此js文件，以防后续重新开启需求
 */
define(function(require, exports, module){
    /*=====================================
     *   seo: product compare js
     *   author : yansiwen
     *   date : 2015-12-28
     *======================================*/ 
    var slider = require('../../components/slider/1.0.0/slider');
    var minBar = require('../../components/minBar/1.0.1/minBar');
    var template = require('../../template/tempcomment');

    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell   : '#J_minBar',
        pathConfig : cdnConfig,
        tpl        : template,
        tplName    : "tplMinBar"
    });

    /* 专题内容slider */
    $("#J_subjectSlider").slide({
        "trigger": "click"
    });

    (function() {
        // 遍历超过两行的评论，隐藏第三行以后的内容
        $(".JQ_commentList dd").each(function() {
            var $that = $(this);
            if($that.height() > 36) {
                $that.parent().find("dt").append('<span class="comment-btn JQ_commentBtn">展开<b class="compare-icon comment-icon-expand"></b></span>');
                $that.addClass("comment-hide");
            }
        });
        // 口碑对比——评论展开收起功能
        $(".JQ_commentBtn").on("click", function() {
            var $target = $(this).parentsUntil("li").find("dd");
            if($target.hasClass("comment-hide")) {
                $(this).html('收起<b class="compare-icon comment-icon-collapse"></b>');
                $target.removeClass("comment-hide");
            } else {
                $(this).html('展开<b class="compare-icon comment-icon-expand"></b>');
                $target.addClass("comment-hide");
            }
        });
    }());
});