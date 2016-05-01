define(function(require){

    /* 按需加载js */
    var dialog = require("../../components/dialog/1.0.0/dialog");
    var minBar = require('../../components/minBar/1.0.1/minBar');
    var tempcomment = require('../../template/tempcomment');
    
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

    document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

    /*
     * 处理列表项间距 =====================================================
     */
    $(".collection-item").each(function(index, element){
        if(index>0 && (index+1)%4==0){
            $(this).css({
                "margin-right" : "0px"
            })
        }
    });

    /*
     * 全选 和 单选按钮事件 ===============================================
     */
    var itemNum = $("input[name=chkItem]").length;
    /* 全选 */
    $(".JQ_chkAll").on("click",function(){

        setAllItem($(this));

        $(".JQ_chkAll").each(function(){
            if($(this).hasClass("icon-box-normal")){
                $(this).removeClass("icon-box-normal").addClass("icon-box-checked");
                $(this).siblings("input").prop("checked", true);
            }else{
                $(this).removeClass("icon-box-checked").addClass("icon-box-normal");
                $(this).siblings("input").prop("checked", true);
            }
        });
    });
    /* 单选 */
    $(".JQ_chkItem").on("click",function(){
        var obj = $(".JQ_chkAll");

        toggleChk($(this));

        if(itemNum==getChkNum("chkItem")){
            obj.removeClass("icon-box-normal").addClass("icon-box-checked");
            obj.siblings("input").prop("checked", true);
        }else{
            obj.removeClass("icon-box-checked").addClass("icon-box-normal");
            obj.siblings("input").prop("checked", false);
        }
    });
    /* 切换选择和未选择状态 */
    function toggleChk(obj){
        if(obj.hasClass("icon-box-normal")){
            obj.removeClass("icon-box-normal").addClass("icon-box-checked");
            obj.siblings("input").prop("checked", true);
        }else{
            obj.removeClass("icon-box-checked").addClass("icon-box-normal");
            obj.siblings("input").prop("checked", false);
        }

    }
    /* 返回选中的数量 */
    function getChkNum(name){
        return $("input[name="+name+"]:checked").length;
    }
    /* 返回选中的值 */
    function getChkItems(name) {
        var arr = [];
        var options = "";
        $("input[name="+ name +"]:checked").each(function(index){
            arr.push($(this).val());
        });
        for(var i=0; len=arr.length, i<len; i++){
            options += arr[i]+',';
        }
        // console.log(options);
        return options;
    }
    /* 设置全部和取消全部 */
    function setAllItem(obj){

        if(obj.hasClass("icon-box-normal")){

            $("input[name=chkItem]").each(function(index){
                $(this).prop("checked", true);
            })
            $(".JQ_chkItem").each(function(){
                $(this).removeClass("icon-box-normal").addClass("icon-box-checked");
            })

            obj.siblings("input").prop("checked", true);
        }else{

            $("input[name=chkItem]").each(function(index){
                $(this).prop("checked", false);
            });

            $(".JQ_chkItem").each(function(){
                $(this).removeClass("icon-box-checked").addClass("icon-box-normal");
            })

            obj.siblings("input").prop("checked", true);
        }
    }
    /*
     * 全部删除和单个删除 ===========================================================
     */
    /* 全部删除 */
    $(".JQ_delAll").on("click",function(event){
        event.preventDefault();

        var that = $(this);
        if(getChkNum("chkItem")<=0){
            var tipDialog = new dialog({
                title : '提示',
                content : '<p>&nbsp;<p><p class="tc">请选择需要删除的商品！</p>',
                width: 400,
                height : 60,
                fixed : true,
                button : [
                    {
                        value : '确定',
                        className : 'ui-btns-orange',
                        callback : function(){

                        }
                    }
                ]
            }).showModal();
        }else{
            var tipDialog = new dialog({
                title : '提示',
                title : '提示',
                content : '<p>&nbsp;<p><p class="tc">确定要删除所选商品？</p>',
                width: 400,
                height : 60,
                fixed : true,
                button : [
                    {
                        value : '确定',
                        className : 'ui-btns-orange',
                        callback : function(){
                            window.location.href = that.attr("href") + '?data=' +getChkItems("chkItem");
                            // console.log(that.attr("href") + '?data=' +getChkItems("chkItem"))
                        }
                    },
                    {
                        value : '取消',
                        className : 'ui-btns-gray',
                        callback : function(){

                        }
                    }
                ]
            }).showModal();
        }
    });
    /* 单个删除 */
    $(".JQ_delItem").on("click", function(event){
        event.preventDefault();

        var that = $(this);
        var tipDialog = new dialog({
            title : '提示',
            content : '<p>&nbsp;</p><p class="tc">您确定要删除该商品？</p>',
            width : 300,
            height : 60,
            fixed : true,
            button : [
                {
                    value : '确定',
                    className : 'ui-btns-orange',
                    callback : function(){
                        window.location.href = that.attr("href");
                    }
                },
                {
                    value : '取消',
                    className : 'ui-btns-gray',
                    callback : function(){

                    }
                }
            ]
        }).showModal();
    });
    /**
     *  全部加入购物车 ==============================================================
     */
    $(".JQ_favoriteAll").on("click", function(event){
        event.preventDefault();

        if(getChkNum("chkItem")<=0){
            var tipDialog = new dialog({
                title : '提示',
                content : '<p>&nbsp;<p><p class="tc">请选择要加入购物车的商品</p>',
                width: 400,
                height : 60,
                fixed : true,
                button : [
                    {
                        value : '确定',
                        className : 'ui-btns-orange',
                        callback : function(){}
                    }
                ]
            }).showModal();
        }else{
            reqURL = $(this).attr("href")+ '?sku_id=' + getChkItems("chkItem");
            window.location.href = reqURL;
        }
    });
});