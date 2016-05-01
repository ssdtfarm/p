define(function(require, exports, module){

    /*
     *  购物车首页js文件
     *  @author linyandi
     *  @date   2015-04-06 
     */

    //引入依赖
    var tempCart = require('../../template/tempcart');
    var template = require('../../template/tempcomment');
    var dialog = require('../../components/dialog/1.0.0/dialog');
    var khCheckbox = require('../../components/khCheckbox/1.0.0/khCheckbox');
    var qrcode = require('../../components/qrcode/1.0.0/qrcode');

        /*
         * 初始化选择事件 ===========================================
         */
        //初始化
        setAll();
        //加减函数
        setNumberAddSub(".JQ_setNumer");
        /*
         * 加入收藏 =================================================
         */
        $(".JQ_favorite").on("click", function(){
            var that = $(this);
            var itemSku = that.parents("tr").find("input[name=chkItem]").val();
            var domID = that.attr("id");
            if(that.hasClass("icon-cart-favorite-off")){
                //异步设置收藏
                $.ajax({
                    url : cdnConfig.apiPath + '/favorite/add/' + itemSku,
                    dataType :'jsonp',
                    success : function(res) {
                        if(res.status=="succ" && res.data.status=="succ"){
                            //切换样式
                            that
                                .removeClass("icon-cart-favorite-off")
                                .addClass("icon-cart-favorite-on");
                            showTip("已成功加入收藏夹", domID, "top");
                        }else{

                            showTip(res.data.msg , domID, "top");
                        }
                    }
                });
            }else{
                //已经收藏，弹窗提示
                var hasFavorite = new dialog({
                    title : '提示',
                    content : '<p>&nbsp;</p><p class="fs-14 fc-333>您已经收藏过此商品。</p>',
                    fixed : true,
                    width : 400,
                    height: 80,
                    okValue : '确定',
                    ok      : function() {

                    }
                })
            }
        });
        /*
         * 删除商品 ==================================================
         */
        //单行删除
        $(".JQ_deleteItem").on("click", function(){
            var html = '<p class="tc fs-14">是否删除此商品？</p>'
            var skuId = $(this).attr("id");
            var delDialog = new dialog({
                title : '提示',
                width : 400,
                fixed : true,
                content : html,
                button : [
                    {
                        value : '确定',
                        className : 'ui-btns-orange',
                        callback : function() {
                            deleteCartItem(skuId);
                        }
                    },
                    {
                        value : '取消',
                        className : 'ui-btns-gray',
                        callback : function() {}
                    }
                ]
            }).showModal();
        });
        //删除函数
        function deleteCartItem(cartID) {
            $.ajax({
                url : cdnConfig.cartApiPath + '/delete/' + cartID,
                dataType : 'jsonp',
                success : function(res) {
                    // console.log(res);
                    window.location.reload();

                }
            })
        }
        //删除全部
        $(".JQ_deleteAll").on("click", function(event){
            // return false;
            event.preventDefault();
            //弹窗
            var dg = new dialog({
                title : '提示',
                width : 400,
                fixed : true
            });
            var noCheckHtml = '<p class="tc fs-14">请选择要删除的商品！</p>' ;
            var confirmHtml = '<p class="tc fs-14">是否要删除选中的商品？</p>' ;
            var nums = $("input[name=chkItem][checked=checked]").length;
            //是否选择了
            if(nums==0){
                // showDialog(noCheckHtml);
                dg.content(noCheckHtml);
                dg.button([
                    {
                        value : '确定',
                        className : 'ui-btns-orange',
                        callback : function() {}
                    }
                ])
                dg.showModal();
            }else{
                // console.log("sdfsdfsdf");
                // return false;
                dg.content(confirmHtml);
                dg.button([
                    {
                        value : '确定',
                        className : 'ui-btns-orange',
                        callback : function() {
                            deleteCartItem($("input[name=cartIdArr]").val());
                        }
                    },
                    {
                        value : '取消',
                        className : 'ui-btns-gray',
                        callback  : function() {}
                    }
                ]);
                dg.showModal();

                // showDialog(confirmHtml);
            }
        });
        /*
         * 单选和全选事件 ============================================
         */
        //调用单选和全选组件
        khCheckbox({
            mainCell : "#J_cartForm",
            chkAll : {
                domID : ".JQ_chkAll",
                callback : function(btns) {
                    setAll();
                }
            },
            chkItem : {
                domID : ".JQ_chkItem",
                callback : function() {
                    setAll();
                }
            },
            button : [
                {
                    domID :  "#J_cartSubmit",
                    callback : function(obj){
                        // event.preventDefault();
                        //所需要的总积分
                        var TotalPoints = $("input[name=totalPonits]").val();
                        // 没有选择商品的提示
                        var tHtml = '<p class="tc fs-14>请选择要购买的商品！</p>';
                        //积分不够的提示
                        var noPointHtml = '<p class="tc fs-14">您的积分不够，不能使用积分换购！</p>';
                        //选中的个数
                        var chkNums = $("input[name=chkItem][checked=checked]").length;

                        if(chkNums==0){
                            showDialog(tHtml);
                        }else{
                            //看看是否登录了
                            $.ajax({
                                url : cdnConfig.apiPath + '/login/status',
                                dataType : 'jsonp',
                                success : function(res) {
                                    // 未登录跳转到登录页面
                                    if(res.status=="succ" && !(res.data.islogin)){
                                        window.location.href = cdnConfig.passport + '?url=' + window.location.href;
                                    }else {
                                        //使用积分
                                        if(TotalPoints>0) {
                                            $.ajax({
                                                url : cdnConfig.cartApiPath + '/cart/integral',
                                                dataType : 'jsonp',
                                                success : function(result) {
                                                    if(result.status=="failed") {
                                                        showDialog(noPointHtml);
                                                        return false;
                                                    }else{
                                                        // console.log(result.data.points,TotalPoints);
                                                        if(parseInt(result.data.points) >= parseInt(TotalPoints)){
                                                            //提交表单
                                                            $("#J_cartForm").submit();
                                                        }else{
                                                            //提示不够积分
                                                            showDialog(noPointHtml);
                                                        }
                                                    }
                                                }
                                            });
                                            //不使用积分
                                        }else{
                                            //提交表单
                                            $("#J_cartForm").submit();
                                        }

                                    }
                                }
                            });
                            //提交表单
                            // $("#J_cartForm").submit();
                            // submitCartForm(obj);
                        }
                        return false;
                    }
                }
            ]
        });
        /*
         * 渲染二维码图片 ======================================
         */
        function randerQrcode() {
            //seajs.use(['lib/v1/1.0.0/qrcode'], function(qrcode){
                var skuArr  = $("input[name=skuArr]").val();
                var numArr  = $("input[name=numArr]").val();
                var werksID = $("input[name=werksID]").val();

                var textStr = cdnConfig.m + "/cart/werks?id="+skuArr+"&num="+numArr+"&werks_sn="+werksID;

                $("#qrcodeCanvas").html('<i><img src="http://misc.jjcdn.com/p/images/qrcode-logo.png"></i>');

                var userAgent = navigator.userAgent.toLowerCase();
                renderType = 'canvas';
                if(/msie/ig.test(userAgent)){
                    renderType = 'table';
                }

                $("#qrcodeCanvas").qrcode({
                    text   : textStr,
                    render : renderType,
                    width  : 120,
                    height : 120
                });
            //});
        }
        /*
         * 加减数量函数 ==================================================
         * @param domID, 包含加减按钮和input元素的容易ID号必须为 "#ID" 格式
         */
        //加减数量函数
        function setNumberAddSub(domID) {
            var mainObj = $(domID);

            mainObj.each(function(index){
                var that = $(this);
                var subObj = that.find(".JQ_subNumber");
                var addObj = that.find(".JQ_addNumber");
                var inputObj = that.find("input[name=number]");
                var cartID = $.trim(that.parents("tr").find("input[name=cartId]").val());
                // console.log(cartID);
                //加数量
                addObj.on("click", function(){
                    // console.log(val);
                    var value = $.trim(inputObj.val());
                    num = parseInt(value) + 1;
                    // console.log(num);
                    inputObj.val(num);
                    //设置所有
                    setAll();
                    //更新数量
                    updateCartNum(cartID, $.trim(inputObj.val()));
                });
                //减数量
                subObj.on("click", function(){
                    var val = inputObj.val();
                    val = val <= 1 ? 1 : parseInt(val) -1;
                    inputObj.val(val);
                    //设置所有
                    setAll();
                    //更新数量
                    updateCartNum(cartID, $.trim(inputObj.val()));
                });
                //input的输入
                inputObj.on("keyup", function(){
                    var val = parseInt($(this).val());
                    val = val <=0 ? $(this).val(1) : val;
                    var reg = /^[0-9]{1,}$/g;
                    if(!reg.test(val)){
                        $(this).val(1);
                    }
                    //设置所有
                    setAll();
                    //更新数量
                    updateCartNum(cartID, $.trim(inputObj.val()));
                });
            });
        }
        /**
         *  更新购物车数量的函数 ================================================
         */
        function updateCartNum(cartID, num) {
            $.ajax({
                url  :  cdnConfig.cartApiPath + '/update/' + cartID + '/' + num,
                dataType  :  'jsonp',
                success  : function(res) {
                    // console.log(res);
                }
            });
        }
        /**
         *   加载热销单品 =======================================================
         */
            $.ajax({
                url : cdnConfig.cartApiPath + '/cart/ad',
                dataType : 'jsonp',
                success : function(res) {
                    if(res.status=="succ") {
                        // console.log(res.data);
                        $("#J_cartHotList").html(tempCart('tplHotList',res.data));
                    }else{
                        $("#J_cartHotList").html("");
                    }
                }
            });
        /*
         * 页面通用函数 =========================================
         */
        //显示弹窗  @param con, 提示窗的内容，为html
        function showDialog(con){
            var d = new dialog({
                title : '提示',
                width : 400,
                fixed : true,
                content : con,
                button : [
                    {
                        value : '确定',
                        className : 'ui-btns-orange',
                        callback : function() {

                        }
                    },
                    {
                        value : '取消',
                        className : 'ui-btns-gray',
                        callback : function() {}
                    }
                ]
            }).showModal();
        }
        /*
         * 显示提示层
         * @param text, 提示文字，可以为html
         * @param domID, 提示层停靠的元素的ID号，必须为 “ID” 格式
         * @param align, 提示层的停靠位置，可以设置12个方位，分别为 top,left,right,bottom, top left, top right, left top, left bottom, right top, right bottom, bottom left, bottom right
         */
        function showTip(text, domID, align) {
            var tDialog = new dialog({
                align   : align,
                content : text
            }).show(document.getElementById(domID));

            setTimeout(function(){ tDialog.remove(); }, 1500);
        }
        //设置所有参数函数
        function setAll(){
            //设置数量
            setNumber();
            //设置sku
            setSku();
            //设置选中的cartID
            setCartID();
            //设置选中了几个商品
            setChkNumber();
            //渲染二维码
            randerQrcode();
            //计算总价格
            setTotalPrice();
            //计算需要的总积分
            setTotalPoints();
        }
        //获取选中的cartID
        function setCartID() {
            var obj = $("input[name=chkItem][checked=checked]");
            var arr = [];
            obj.each(function(index){
                arr.push($(this).siblings("input[name=cartId]").val());
            });
            //设置到容器
            $("input[name=cartIdArr]").val(arr);
        }
        //获取选中的sku
        function setSku() {
            var obj = $("input[name=chkItem][checked=checked]");
            var arr = [];
            obj.each(function(){
                var that = $(this);
                var sku = that.val();
                arr.push(sku);
            });
            //设置到
            $("input[name=skuArr]").val(arr);
        }
        //获取选中的产品的数量
        function setNumber() {
            var obj = $("input[name=chkItem][checked=checked]");
            var arr = [];
            obj.each(function(){
                var that = $(this);
                var num = that.parents("tr").find("input[name=number]").val();
                arr.push(num);
            });
            $("input[name=numArr]").val(arr);
        }
        //设置选中了几个商品
        function setChkNumber() {
            var chkNum =  $("input[name=chkItem][checked=checked]").length;
            // console.log(chkNum);
            $("#J_chkNums").html(chkNum);
        }
        //设置总价格
        function setTotalPrice() {
            var chkObj = $("input[name=chkItem][checked=checked]");
            chkObj.each(function(index){
                var that = $(this);
                var itemPrice = that.parents("tr").find(".JQ_itemPrice");
                var itemPoints = that.parents("tr").find(".JQ_itemPoints");
                var num = that.parents("tr").find("input[name=number]").val();

                var salePrice = that.parents("tr").find(".JQ_salePrice").html();
                // console.log(salePrice+'--439',typeof salePrice);

                salePrice = typeof salePrice=="undefined" ? 0 : salePrice;
                // console.log(salePrice+'--442');

                var usePoints = that.parents("tr").find(".JQ_usePoints").html();

                itemPrice.html(num*salePrice);

                itemPoints.html(num*usePoints);


            });
            getTotalPrice();
        }
        //获取选中商品的总价格
        function getTotalPrice() {
            var total = 0;
            var obj = $("input[name=chkItem][checked=checked]");
            var len = $("input[name=chkItem][checked=checked]").length;
            // console.log(len);
            if(len!=0){
                obj.each(function(){
                    // var price = $(this).html();
                    var price = $(this).parents("tr").find(".JQ_itemPrice").html();
                    price = typeof price == "undefined" ? 0 : price;
                    // console.log(price+'--464');
                    total += parseInt(price);
                });
                $("#J_total").html(total.toFixed(2));
            }else{
                $("#J_total").html(0);
            }
        }
        //获取选中商品所需的总积分
        function setTotalPoints() {
            var total = 0;
            var obj = $("input[name=chkItem][checked=checked]");
            var len = $("input[name=chkItem][checked=checked]").length;
            if(len!=0) {
                obj.each(function(){
                    var price = $.trim($(this).parents("tr").find(".JQ_itemPoints").html());
                    // console.log(price);
                    price = price == "" ? 0 : price;
                    // console.log(price);
                    total += parseInt(price);
                });
                $("input[name=totalPonits]").val(total);
            }else{
                $("input[name=totalPonits]").val(0);
            }
        }
        //页面是否支持canvas渲染
        function canvasSupport() {
            return !!document.createElement('canvas').getContext;
        }
});