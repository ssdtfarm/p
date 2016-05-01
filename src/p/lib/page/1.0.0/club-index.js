define(function (require) {

    /* 加载依赖 */
    var tempclub    =  require("../../template/tempclub");
    var tempcomment = require("../../template/tempcomment");
    var slider      =  require('../../components/slider/1.0.0/slider');
    var lazyload    =  require('../../components/lazyload/1.0.0/lazyload');
    var minBar = require('../../components/minBar/1.0.1/minBar');
    
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
    
    /*
     * 按需加载对应css
     * 这里首先让下边加载完毕，然后再加载上边菜单
     */
        document.getElementById("J_clubNav").innerHTML = document.getElementById("J_templateClubNav").innerHTML;

        //整页面lazyload图片
        if(!$("img").hasClass("lazy")){
            $("img").addClass("lazy");
        }
        $("img.lazy").lazyload();
        //通栏banner
        $("#J_idnexFullSlider").slide({
            titCell : '.hd ul',
            mainCell : '.bd ul',
            autoPage : true,
            autoPlay : true,
            trigger  : 'click',
            effect : 'left',
            vis : 1
        });

        /*
         *  特权图标  =====================================================
         */
        var privateData = {
            "list" :  ''
        }
        $.ajax({
            url : cdnConfig.apiPath + '/member/gette',
            dataType : 'jsonp',
            success  : function(res) {
                //是否有数据
                if(res.status=="succ"){
                    privateData = res.data;
                    // console.log(privateData);
                }else{
                    privateData.list = [];
                }
                //渲染模板
                $("#J_clubPriSlider").html(tempclub('tplClubPrivilege',privateData));
                //应用滑动模块
                $("#J_clubPriSlider").slide({
                    titCell  : '.hd ul',
                    mainCell : '.bd ul',
                    autoPage : true,
                    effect   : 'left',
                    vis      : 3,
                    endFun   : function(i, c, slider, titCell, mainCell, targetCell, prevCell, nextCell ) {
                        //特权图标鼠标事件
                        privMouseEvent($(".JQ_showTipItem"))
                    }
                });
                //特权图标鼠标事件
            },
            error :  function(err) {
            }
        })
        //特权图标鼠标事件处理函数
        function privMouseEvent(dom) {
            dom.each(function(index){
                var that = $(this);
                var parentObj = $(this).parents("ul");
                var pLeft = parentObj.offset().left;
                var aLeft = that.offset().left;
                var disLeft = aLeft - pLeft;
                //鼠标覆盖
                that.on("mouseover", function(event){
                    $("#J_listTip")
                        .show()
                        .find("label")
                        .html(that.attr("data-name"));
                });
                //鼠标移出
                that.on("mouseout", function(event) {
                    $("#J_listTip")
                        .hide();
                });
            });
        }
});