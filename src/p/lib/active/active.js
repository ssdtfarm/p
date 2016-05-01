define(function(require, exports, module) {
    /*===================================================*/
    /*                静态活动页通用 js                    */
    /* J_activeAllBg, J_activeContent, content_Actpage
     /*==================================================*/

    //引入依赖
    var lazyload = require("../components/lazyload/1.0.1/lazyload");
    var templateActive = require("../template/tempactive");
    var templateComment = require("../template/tempcomment");
    var mainNav  = require("../components/mainNav/1.0.1/mainNav");
    var minBar   = require("../components/minBar/1.0.1/minBar");
 
    //判断是否lazyload阻塞
    setTimeout(function() {
        if ($('.lazy').eq(0).attr('data-original') != undefined) {
            $('.lazy').each(function() {
                var self = $(this); 
                var url = self.attr('data-original');
                self.attr('src', url);
            });
        } 
    }, 1000); 

    $(function(){
        $("#J_activeAllBg").css({ 
            "background" : 'url('+activityBg+') center top no-repeat'
        });
    });


    /*
     * 导航栏和所有分类下拉菜单 =======================================
     */
    try {
        $("#J_mainNav").html($("#J_mainNavTemp").html());
        //主导航效果
        mainNav({
            mainCell: "JQ_headNavMenu",
            lineCell: "JQ_headNavLine"
        });
    }catch(err) {

    }
    /*  ============================================================
     *                      活动页数据处理区域
     ============================================================*/

    //使用原生js进行数据循处理
    try { 
        var arr = $(".cJSON");  

        for (var i = 0; i < arr.length; i++) {
            var temp = arr[i].innerHTML;
            var regH = temp.replace(/<img/gi, '<img class="lazy"');
            var temH = regH.replace(/src/gi, 'data-original');

            var tarID = arr[i].getAttribute("id").split("_")[1] + '_' + arr[i].getAttribute("id").split("_")[2];

            var tarDOM = document.getElementById(tarID);
            tarDOM.innerHTML = temH;

        }
    }catch(err){

    }
    // 应用lazyload插件 
    /*$(function () {
        jQuery("img.lazy").Lazy();
    });*/

    /*
     *  处理浮动锚点 ===========================================================
     */
    try {
        var anchorHTML = templateActive("tplAnchor", acData);
        $("body").append(anchorHTML);
    } catch(err){

    }
    /*
     *    新版浮动工具栏交互  ================================================
     *
     * */
    minBar({
        mainCell   : '#J_minBar',
        pathConfig : cdnConfig,
        tpl        : templateComment,
        tplName    : "tplMinBar",
        data : _globalConfig.minBar.data
    });
});