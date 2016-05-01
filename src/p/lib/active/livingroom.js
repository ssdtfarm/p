/**
 * Created by zhangzhensheng on 2016-03-01
 */
define(function(require, exports, module) {

    $(function(){
        //插入要展示的图片-客厅会场
        var selector = ["img_1","img_2","img_3","img_4","img_5"];//需要展示的图片id
        $("#J_activeContent").css({"position":"relative"});
        $.each(selector, function(index, item){
            $("#J_activeContent").append('<div class="img-detail" id="J_'+item+'"><div></div></div>');
        });
        // 对每个展示图片设置样式
        $(".img-detail").css({
            "position": "absolute",
            "width": "844px",
            "height": "499px"
        });
        $(".img-detail div").css({
            "width": "844px",
            "height": "499px",
            "display": "none"
        });
        $("#J_img_1 div").css({
            "background": "url(http://misc.jjcdn.com/p/active/livingroom/img/baokuan_kt/1.jpg) center no-repeat"
        });
        $("#J_img_1").css({
            "top": "2095px",
            // "top": "2374px",
            "left": "10px"
        });
        $("#J_img_2 div").css({
            "background": "url(http://misc.jjcdn.com/p/active/livingroom/img/baokuan_kt/2.jpg) center no-repeat"
        });
        $("#J_img_2").css({
            "top": "2637px",
            // "top": "2916px",
            "right": "10px"
        });
        $("#J_img_3 div").css({
            "background": "url(http://misc.jjcdn.com/p/active/livingroom/img/baokuan_kt/3.jpg) center no-repeat"
        });
        $("#J_img_3").css({
            "top": "3832px",
            // "top": "4111px",
            "left": "10px"
        });
        $("#J_img_4 div").css({
            "background": "url(http://misc.jjcdn.com/p/active/livingroom/img/baokuan_kt/4.jpg) center no-repeat"
        });
        $("#J_img_4").css({
            "top": "4374px",
            // "top": "4653px",
            "right": "10px"
        });
        $("#J_img_5 div").css({
            "background": "url(http://misc.jjcdn.com/p/active/livingroom/img/baokuan_kt/5.jpg) center no-repeat"
        });
        $("#J_img_5").css({
            "top": "5552px",
            // "top": "5831px",
            "left": "10px"
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
            window.open("http://item.kinhom.com/7273.html?from=bedroom");
        });
        $("#J_img_2").on("click", function(e){
            window.open("http://item.kinhom.com/35564.html?from=bedroom");
        });
        $("#J_img_3").on("click", function(e){
            window.open("http://item.kinhom.com/18003.html?from=bedroom");
        });
        $("#J_img_4").on("click", function(e){
            window.open("http://item.kinhom.com/52961.html?from=bedroom");
        });
        $("#J_img_5").on("click", function(e){
            window.open("http://item.kinhom.com/50138.html?from=bedroom");
        });
    });
});