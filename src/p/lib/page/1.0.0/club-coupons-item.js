define(function(require){

    var zoom = require("../../components/zoom/1.0.0/zoom");
    var lazyload = require('../../components/lazyload/1.0.0/lazyload');
    var tempcomment = require("../../template/tempcomment");

    document.getElementById("J_clubNav").innerHTML = document.getElementById("J_templateClubNav").innerHTML;

    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell   : '#J_minBar',
        pathConfig : cdnConfig,
        tpl        : tempcomment,
        tplName    : "tplMinBar",
        data : _globalConfig.minBar.data
    });

    //页面所有图片延迟加载
    if(!$("img").hasClass("lazy")){
        $("img").addClass("lazy");
    }
    $("img.lazy").lazyload();

    /*
     * 产品相册处理模块 ============================================
     */
    //调用zoom插件
    $("#J_albumBig").zoom({
        url : $("#J_albumBig").children("img").attr("src")
    })
    //点击小图设置大图
    $("#J_thumb li a").each(function(index){
        var that = $(this);
        that.on("click", function(event){
            event.preventDefault();
            //变换class
            toggleClass(that.parent("li"), "cur");
            //设置大图
            setBigThumb(that, "J_albumBig");
        })
    })
    /*
     * 变换class函数 toggleClass(obj, className)
     * @param obj为要操作的对象
     * @param className 变换的class名
     */
    function toggleClass(obj, className) {
        if(!obj.hasClass(className)){
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

        var targetURL = sourceURL.indexOf("!") > -1 ? sourceURL.split("!")[0]+"!max" : sourceURL;
        var tarObj = $("#"+domID).children("img");
        tarObj.attr("src", targetURL);
    }

});

