/**
 *  ---------------------------------------------
 *      体验馆首页
 *      体验馆首页的交互脚本
 *
 *      author: zhangzhensheng
 *      data  : 2016-04-29      
 *  ---------------------------------------------
 */
define(function(require, exports, module) {
    var DiyScroll = require("../components/diyScroll/diyScroll");
    var slider = require("../components/slider/1.0.0/slider");
    var Dialog = require("../components/dialog/1.0.0/dialog");
    new DiyScroll(".J_detailWrap", ".J_detailList", { boxClass: "scrollbox", barClass: "scrollbar" });
    // 体验馆列表（手风琴效果）
    $("#J_sideMenu").slide({
        titCell: ".hd",
        targetCell: ".bd",
        defaultIndex: 1,
        effect: "slideDown",
        delayTime: 300,
        trigger: "click",
        returnDefault: false
    });
    // 切换手风琴右上角样式
    $(document).on("click", "#J_sideMenu .hd", function(e) {
        var self = $(this);
        if(self.hasClass("on")){
            self.find(".arrow").hide();
            self.find(".link").show();
            self.siblings(".hd").find(".arrow").show();
            self.siblings(".hd").find(".link").hide();
        }
    });
    $(function(){
        $("#J_sideMenu .bd").each(function(e) {
            var self = $(this);
            if (self.is(":hidden")) {
                self.prev().find(".arrow").show();
                self.prev().find(".link").hide();
            } else {
                self.prev().find(".arrow").hide();
                self.prev().find(".link").show();
            }
        });
    });
    // 发送到手机的弹窗
    $(document).on("click", ".J_sendBtn", function(){
        var d = new Dialog({
            title: "免费发送到手机",
            width: 400,
            height: 400,
            fixed: true,
            zIndex: 198502,
            button: [{
                value: '确定',
                className: 'ui-btns-orange',
                callback: function() {
                }
            }]
        }).showModal();
    });
    // 活动情报站（幻灯片效果）
    $("#J_activePic").slide({
        mainCell: ".bd ul",
        autoPlay: true
    });
    // 体验店详情（图片切换效果）
    $("#J_oflDetail").slide({
        mainCell: ".bd ul",
        effect: "left",
        autoPlay: true
    });
    //自定义下拉  
    !(function() {
        $(document).on('click', '.selector', function(e) {
            e.stopPropagation();
            $('.j_selector').removeAttr('data-open')
                .find('.list').slideUp('fast')
                .end()
                .find('.triangle').removeClass('triangle-up-active');

            var self = $(this),
                tit = self.find('.title'),
                triangle = self.find('.triangle'),
                input = self.find('.selector-input'),
                list = self.find('.list'),
                li = self.find('li');

            function setDef() {
                self.removeAttr('data-open');
                list.stop().slideUp('fast');
                triangle.removeClass('triangle-up-active');
            }

            function setOpen() {
                self.attr('data-open', true);
                list.stop().slideDown();
                triangle.addClass('triangle-up-active');
            }

            if (!self.attr('data-open')) {
                setOpen();
            } else {
                setDef();
            }

            li.on('click', function(e) {
                e.stopPropagation();
                tit.html($(this).find('a').html());
                setDef();
            });

        });

        $(document).on('click', function(e) {
            $('.selector').removeAttr('data-open')
                .find('.list').stop().slideUp('fast')
                .end()
                .find('.triangle').removeClass('triangle-up-active');
        })
    })();
});
