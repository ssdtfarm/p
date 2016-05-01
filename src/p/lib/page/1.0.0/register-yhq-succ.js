define(function(require, exports, module){
//当页面不足一屏幕是固定页脚在底部
    $(function(){
        var footerHeight = 0,
            footerTop = 0,
            $footer = $(".member-foot");
        positionFooter();
        function positionFooter() {
            //取到div#footer高度 
            footerHeight = $footer.height();
            //div#footer离屏幕顶部的距离 
            footerTop = ($(window).scrollTop() + $(window).height() - footerHeight) + "px";
            //如果页面内容高度小于屏幕高度，div#footer将绝对定位到屏幕底部，否则div#footer保留它的正常静态定位 
            if (($(document.body).height()) < $(window).height()) {
                $footer.css({
                    position: "absolute",
                    marginTop:0,
                    top: footerTop
                });
                $footer.show();
            } else {
                $footer.css({
                    position: "static"
                });
                $footer.show();
            }
        }
        $(window).scroll(positionFooter).resize(positionFooter);
    });

});