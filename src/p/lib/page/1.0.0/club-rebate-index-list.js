define(function(require){

/* 按需加载js */

    var slider = require('../../components/slider/1.0.0/slider');
    var khSelect = require('../../components/khSelect/1.0.0/khSelect');
    var tempcomment = require("../../template/tempcomment");
    var minBar = require('../../components/minBar/1.0.1/minBar');
    
    document.getElementById("J_clubNav").innerHTML = document.getElementById("J_templateClubNav").innerHTML;
    document.getElementById("J_clubAside").innerHTML = document.getElementById("J_templateClubAside").innerHTML;

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
     *  修复页面刷新定位问题 ===========================================
     */
    fixScrollTop();

    function fixScrollTop() {
        var URL = window.location.href;

        var offsetObj = $(".club-rebate-filler-warp");
        var offsetTop = offsetObj.offset().top;
        if(URL.indexOf("tiao")>-1){
            $("html,body")
                .stop()
                .animate({
                    scrollTop : offsetTop
                }, 300);
        }
        //console.log(offsetTop);
    }
    //先隐藏鼠标滚动加载下一页的提示
    $(".club-rebate-mouse").html("");

    /*
     * 全屏广告图 =====================================================
     */
    $("#J_fullSlider").slide({
        mainCell : ".bd ul",
        titCell  : ".hd ul",
        autoPage : true,
        autoPlay : true,
        vis      : 1,
        effect   : "left"
    });
    /*
     * 返现人数和收益动画效果 ========================================
     */
    /*
     * 数字翻滚函数
     * @param domID, 要翻滚的容器ID，格式为：“#ID”,
     * @param type， 翻滚的数字类型，可设置为 number，money
     */
    plusToNumber({
        dom : "#J_peopleMount",
        speed : 1500
    });
    plusToNumber({
        dom : "#J_moneyMount",
        speed : 1500,
        type : "money"
    });
    /*
     * 数字自加到指定数字函数
     * @param config   ： 接受的参数
     * @param dom      :  要操作的容器id
     * @param tarNum   ： 目标数字
     * @param speed    :  数字自加的时间，毫秒，必须是100的整数倍
     * @param callBack ： 回调函数，可带一个参数：dom,返回操作的容器id号
     */
    function plusToNumber(config,callBack){
        var config = config || {};
        var dom = config.dom || null;       //滚动容器id号
        var obj = $(dom);
        var speed = config.speed || 1000;   //滚动速度
        var tarNum = config.tarNum || obj.attr("data-value") || 100;  //目标数字
        var callBack = callBack || null;    //回调函数
        var type = config.type || "number"

        var sNum = obj.html(); //开始数字，越接近目标数字，滚动速度越快
        var plusInterval = 0;
        var plusSpeed = 0;

        plusInterval = parseInt(tarNum / speed);
        plusSpeed = plusInterval*10;

        var timer = setInterval(function(){
            if(sNum < tarNum){
                sNum = parseInt(sNum) + plusSpeed;
                sNum >= tarNum ? setTarNum(tarNum) : obj.html(sNum);
            }else{
                doCallBack();
                clearInterval(timer);
            }
        },1);
        //回调函数
        var doCallBack = function(){ if($.isFunction(callBack)){ callBack(dom); } };
        //设置目标数字
        function setTarNum(tNum) {
            if(type=="number") {
                obj.html(tNum);
            }else {
                var n = parseInt(tNum).toFixed(2);
                obj.html(n);
            }
        }
    }
    /*
     * 筛选模块 ================================================
     */
    //筛选表单提交
    $(".JQ_fillterBtn").on("click", function(){
        $(this).parents("form").submit();
    });
    //初始化选择框
    khSelect({
        mainCell : "#J_selectStyle"
    });
    khSelect({
        mainCell : "#J_selectRebatePer"
    });
    khSelect({
        mainCell : "#J_selectPointsPer"
    });

});