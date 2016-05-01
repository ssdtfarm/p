define(function(require, exports, module) {

    /*
     * 确认订单页js文件
     * author : linyandi
     * date : 2015-04-07 
     */
    //引入依赖
    var tempcomment = require('../../template/tempcomment');
    var tempcart = require('../../template/tempcart');
    var khSelect = require('../../components/khSelect/1.0.0/khSelect');
    var dialog = require('../../components/dialog/1.0.0/dialog');
    var khValidate = require('../../components/khValidate/1.0.0/khValidate');
    var khSelectAddress = require('../../components/khSelectAddress/1.0.0/khSelectAddress');
    var khSellType; //下单购物类型；
    if ($("body").find(".JQ_preType")) {
        //进入预售流程
        var JproSell = $("#J_prosell").val(),
            JpreSellType = $(".JQ_preType").attr("data-preSellType"),
            JbalanceType = $(".JQ_preType").attr("data-balanceType");
        /*=================*/
        /*JpreSellType== 1 为预售标识
        /*JbalanceType == 1为预售定金标识（定金不计算运费+尾款支付计算运费）
        /*JbalanceType == 2为全额支付标识（计算金额+运费）
        /*=================*/
        if (JpreSellType == 1 && JbalanceType == 1) {
            //预售定金；
            khSellType = 1; 
        } else {
            if (JpreSellType == 1 && JbalanceType == 2) {
                //预售全额付款；
                khSellType = 2;
            }
        };
    } else {
        //普通的下单流程；
        khSellType = 0; 
    };

    /*
     * 初始化选择框等 ====================================================
     */
    //获取现金券
    getCashList();
    //获取优惠券
    getCounponList();
    //获取积分
    getPoints("#J_shopPoints");
    //选择满减等活动优惠
    khSelect({
        mainCell: '#J_privilege'
    });

    //提交按钮的控制
    function isAllRight(btnOk) {
        // console.log(btnOk);
        var subBtn = '<a href="javascript:void(0);" id="J_submitBtn" class="submit-cart-btn">提交订单<i class="icon-point-right"></i></a>';
        var grayBtn = '<a href="javascript:void(0);" id="J_grayBtn" class="submit-cart-btn" style="background-color: #ccc; cursor: default;">提交订单<i class="icon-point-right"></i></a>';
        if (btnOk == "true") {
            $("#J_submitBtn").css({
                "background-color": "#f60"
            }).attr("id", "J_submitBtn");
            if ($(".btns-item").children("#J_submitBtn").length == 0) {
                $(".btns-item").children("#J_grayBtn").remove();
                $(".btns-item").append(subBtn);
            };
        } else {
            if (btnOk == "false") {
                $(".btns-item").children("#J_submitBtn").remove();
                if ($(".btns-item").children("#J_grayBtn").length == 0) {
                    $(".btns-item").append(grayBtn);
                }
            };
        }
    };

    /*
     * 载入地址模块 ======================================================
     */
    loadAddressList("#J_addressWrap");

    //载入地址函数
    function loadAddressList(tarID) {
        //目标容器
        var tarObj = $(tarID);
        //获取数据
        $.ajax({
            url: cdnConfig.cartApiPath + '/cart/address',
            dataType: 'jsonp',
            success: function(res) {
                if (res.status == "succ" && res.data.list.length != 0) {
                    loadAddressData(res.data, tarObj);
                } else {
                    tarObj.html('<input type="hidden" name="addressID" value="" /><p>&nbsp;</p><p class="vtm tc fs-14">暂无收货地址</p><p class="tc fs-14"><a class="JQ_addNewAddress" href="' + cdnConfig.my + '/user/addressdo?type=1">添加地址</a></p>');
                };
                //选取默认地址的电话作为预售尾款支付提醒通知的默认号码
                if (khSellType == 1) {
                    var phoneNum = $(".J_noticePhone");
                    var rePhoneNum = $("input[name='rePhoneNum']");
                    var i, phoneVal;
                    var addressID = $.trim($("input[name=addressID]").val());
                    if (addressID != "") {
                        for (i = 0; i < res.data.list.length; i++) {
                            if (res.data.list[i].def == 1) {
                                phoneVal = res.data.list[i].mobile;
                                phoneNum.html(phoneVal);
                                rePhoneNum.val(phoneVal);
                            } else {
                                phoneVal = res.data.list[0].mobile;
                                phoneNum.html(phoneVal);
                                rePhoneNum.val(phoneVal);
                            };
                        }
                    } else {
                        $(".retainage-notice").html('<div class="notice-bg"><span class="iblock pl-10 pr-10">没有您的详细地址和联系方式哦！<a href="javascript:void(0);" class="edit JQ_toToAdd">添加</a></span></div>');
                        $(".JQ_toToAdd").on("click", function() {
                            var addressTop = $(".ship-address-top").offset().top;
                            $("html,body").stop().animate({
                                scrollTop: addressTop
                            }, 300);
                        })
                    }
                };
            }
        });
        //载入需要的模块渲染模板
        function loadAddressData(data, target) {
            if (data.list.length == 0) {

            } else {
                //渲染模板
                target.html(tempcart('tplAddressList', data));
                $(".JQ_radio").each(function() {
                    if ($(this).hasClass("icon-radio-on")) {
                        var cityID = $(this).parent("dt").attr("data-value").split(",")[1];
                        //获取物流信息
                        getShipService(cityID);
                    }
                });
            }
        }
    };

    /*
     * 选择地址 ===========================================================
     */
    $(document).on("click", ".JQ_chkAddress", function() {
        var mainObj = $(this).parents("dl");
        //获取地址ID
        var addID = $(this).attr("data-value").split(",")[0];
        //获取城市ID号
        var cityID = $(this).attr("data-value").split(",")[1];
        //设置地址ID
        $("input[name=addressID]").val(addID);
        //获取物流信息
        getShipService(cityID);

        //切换样式
        if (!$(this).find(".JQ_radio").hasClass("icon-radio-on")) {
            $(this).find(".JQ_radio").addClass("icon-radio-on");

            mainObj.siblings("dl").find(".JQ_radio").removeClass("icon-radio-on");
        }
    });
    /*
     * 初始化form表单数据 ==================================================
     */
    var data = {
        "actionURL": "", //form表单的action地址
        "userName": "", //收货人姓名
        "valPro": "", //省份ID
        "textPro": "", //省份名称
        "valCity": "", //市级ID
        "textCity": "", //市级名称
        "valArea": "", //地区ID
        "textArea": "", //地区名称
        "address": "", //详细地址
        "telephone": "", //固话
        "mobilephone": "", //手机
        "defaultAdd": 0, //是否为默认地址
        "addressID": 0 //地址ID号
    };
    /*
     * 新增收货地址 ==========================================================
     */
    var addDialog;
    //点击新增按钮
    $(document).on("click", ".JQ_addNewAddress", function(event) {
        //清空data对象
        for (var v in data) {
            data[v] = "";
        }
        //阻止a标签默认事件
        event.preventDefault();
        //获取action地址
        data.actionURL = $(this).attr("href");
        //初始化模板
        var tempForm = tempcomment('tplAddressForm', data);
        //弹窗
        addDialog = new dialog({
            title: '新增收货地址',
            width: 560,
            fixed: true,
            button: [{
                value: '保存收货人信息',
                className: 'ui-btns-orange',
                callback: function() {
                    submitAddForm();
                    return false;
                }
            }, {
                value: '取消',
                className: 'ui-btns-gray',
                callback: function() {}
            }]
        });
        // 渲染弹出内容
        addDialog.content(tempForm);
        //显示弹窗
        addDialog.showModal();
        //弹框后渲染模板
        $("#J_selectAddress").html(tempcomment('tplSelectAddress', data));
        //初始化地址选择模块
        khSelectAddress({
            "selectModule": khSelect
        });

        /* 设置默认地址 */
        $("#J_setDefault").on("click", function() {
            if ($(this).hasClass("icon-box-normal")) {
                $(this).removeClass("icon-box-normal").addClass("icon-box-checked");
                $(this).siblings("input").val("1");
            } else {
                $(this).removeClass("icon-box-checked").addClass("icon-box-normal");
                $(this).siblings("input").val("0");
            }

        });
    });
    /*
     * 新增地址表单处理 =================================================
     */
    function submitAddForm() {
        //获取url
        var URL = window.location.href;
        $("#J_addressForm").append('<input type="hidden" name="url" value="' + URL + '" />');

        var tipDialog;
        var valName = $.trim($("input[name=userName]").val());
        var valAddress = $.trim($("input[name=address]").val());
        var valTel = $.trim($("input[name=tel]").val());
        var valPhone = $.trim($("input[name=phone]").val());
        var valPro = $.trim($("input[name=valProvince]").val());
        var valCity = $.trim($("input[name=valCity]").val());
        var valArea = $.trim($("input[name=valArea]").val());
        //验证收货人
        if (valName == "") {
            showTipDialog("请输入收货人!", "J_userName", "right");

            $("input[name=userName]").focus();

            return false;
        } else {
            if (!khValidate.chkUserName(valName)) {
                showTipDialog("收货人姓名不能有特殊符号!", "J_userName", "right");

                $("input[name=username]").focus();

                return false;
            }
        };
        /*
         * 验证详细地址
         */
        //是否选择了省、市、区
        if (valPro == "" || valCity == "" || valArea == "") {

            showTipDialog("请选择您所在的地区!", "J_selectAddress", "left");

            return false;
        };
        //是否输入了具体地址
        if (valAddress == "") {

            showTipDialog("请输入具体地址!", "J_address", "left");

            return false;
        } else {
            if (!/^[A-Za-z0-9\u4e00-\u9fa5\(\)\（\）\-_\\—]{2,200}$/.test(valAddress)) {
                showTipDialog("请勿输入非法字符!", "J_address", "left");

                return false;
            }
        };
        // 验证固定电话和手机
        if (valTel == "" && valPhone == "") {

            showTipDialog("手机固话至少必填一个！", "J_tel", "right");

            showTipDialog("手机固话至少必填一个！", "J_phone", "right");

            return false;
        } else {
            if (valTel != "") {
                if (!khValidate.chkTelephone(valTel)) {
                    showTipDialog("固话格式有误！", "J_tel", "right");
                    return false;
                }
            }
            if (valPhone != "") {
                if (!khValidate.chkPhone(valPhone)) {
                    showTipDialog("手机格式有误！", "J_phone", "right");
                    return false;
                }
            }
        };

        //提交表单
        $("#J_addressForm").submit();
        //显示提示窗统一函数
        function showTipDialog(str, domID, textAlign) {
            var tDialog = new dialog({
                    content: '<span class="fc-f60">' + str + '</span>',
                    align: textAlign
                })
                .show(document.getElementById(domID));

            setTimeout(function() {
                tDialog.remove();
            }, 1500);
        }
    };
    /*
     *  修改地址表单处理 ================================================
     */
    $(document).on("click", ".JQ_modifyAddress", function(event) {
        //抓取对应行的数据
        var mainObj = $(this).parents("dl");

        data.actionURL = $(this).attr("href");

        data.userName = mainObj.find(".JQ_userName").attr("title");

        data.valPro = mainObj.find(".JQ_area").attr("data-value").split(",")[0];
        data.valCity = mainObj.find(".JQ_area").attr("data-value").split(",")[1];
        data.valArea = mainObj.find(".JQ_area").attr("data-value").split(",")[2];
        data.textPro = mainObj.find(".JQ_area").attr("data-value").split(",")[3];
        data.textCity = mainObj.find(".JQ_area").attr("data-value").split(",")[4];
        data.textArea = mainObj.find(".JQ_area").attr("data-value").split(",")[5];

        data.address = mainObj.find(".JQ_address").attr("title");
        //获取addressID
        data.addressID = mainObj.find(".JQ_chkAddress").attr("data-value").split(",")[0];

        data.telephone = mainObj.find(".JQ_telephone").attr("data-value").split(",")[1];

        data.mobilephone = mainObj.find(".JQ_telephone").attr("data-value").split(",")[0];

        data.defaultAdd = mainObj.find(".JQ_default").val();
        //阻止a标签默认事件
        //preventDefault(event);
        event.preventDefault();

        //初始化模板
        var tempForm = tempcomment('tplAddressForm', data);
        //弹窗
        addDialog = new dialog({
            title: '编辑收货地址',
            width: 560,
            fixed: true,
            button: [{
                value: '保存收货人信息',
                className: 'ui-btns-orange',
                callback: function() {
                    submitAddForm();
                    return false;
                }
            }, {
                value: '取消',
                className: 'ui-btns-gray',
                callback: function() {}
            }]
        });
        // 渲染弹出内容
        addDialog.content(tempForm);
        //显示弹窗
        addDialog.showModal();
        //弹框后渲染模板
        $("#J_selectAddress").html(tempcomment('tplSelectAddress', data));
        //初始化地址选择模块
        khSelectAddress({
            "selectModule": khSelect
        });

        /* 设置默认地址 */
        $("#J_setDefault").on("click", function() {
            if ($(this).hasClass("icon-box-normal")) {
                $(this).removeClass("icon-box-normal").addClass("icon-box-checked");
                $(this).siblings("input").val("1");
            } else {
                $(this).removeClass("icon-box-checked").addClass("icon-box-normal");
                $(this).siblings("input").val("0");
            }

        });
    });
    /*
     * 设为默认地址 =====================================================
     */
    $(document).on("click", ".JQ_setDefault", function(event) {
        // console.log("sdsdf");
        var that = $(this);
        var addressID = that.parent(".JQ_chkAddress").attr("data-value").split(",")[0];
        //that.attr("data-id");
        var resultDialog = new dialog({
                fixed: true
            })
            //到后台设置默认
        $.ajax({
            url: cdnConfig.cartApiPath + '/cart/setdefault/' + addressID,
            dataType: "jsonp",
            success: function(result) {
                // console.log(result);
                if (result.status == "succ") {

                    resultDialog.content('<p>&nbsp;</p><p class="fs-14 fc-333 tc w130">设置成功!</p>');
                    resultDialog.showModal();
                    setTimeout(function() {
                        resultDialog.close();
                    }, 1000);

                    setDefault(that);

                } else {
                    resultDialog.content('<p class="fs-14 fc-333 tc">设置失败!</p>');
                    resultDialog.showModal();
                    setTimeout(function() {
                        resultDialog.close();
                    }, 1000);
                }
            }
        })
    });
    //设置默认地址的函数  @param obj, 当前点击的对象
    function setDefault(obj) {
        var mainObj = obj.parents(".ship-address-list");
        //设置当前行
        mainObj.find(".JQ_setDefault").remove();

        mainObj.find(".JQ_modifyAddress").before('<span class="default-address-text JQ_defaultText">默认地址</span>');

        mainObj.find(".JQ_labelIcon").addClass("icon-label-f60");

        mainObj.find(".JQ_default").val(1);

        //设置其他行
        mainObj.siblings(".ship-address-list").each(function(index) {
            var that = $(this);
            //切换icon的class
            that.find(".JQ_labelIcon")
                .removeClass("icon-label-f60")
                .addClass("icon-empty");
            //删除默认的提示字
            that.find(".JQ_defaultText").remove();
            //删除设置默认的按钮
            that.find(".JQ_setDefault").remove();
            //设置默认值
            that.find(".JQ_default").val(0);
            //加上设置默认的按钮
            that.find(".JQ_modifyAddress").before('<a href="javascript:void(0);" class="list-set-label JQ_setDefault">设为默认地址</a>');
        });
    };
    /*
     *  提交表单 ========================================================
     */
    $(document).on("click", "#J_submitBtn", function(event) {
        // $("#J_submitBtn").on("click", function(event){
        // preventDefault(event);
        //addressid容器对象
        var addressID = $.trim($("input[name=addressID]").val());
        var addressTop = $(".ship-address").offset().top;
        // console.log(addressTop)
        //提示没有收货地址提示框
        var addDialog = new dialog({
            title: '提示',
            content: '<p>&nbsp;</p><p class="tc fs-14">您还没有收货地址，请添加后提交订单。</p>',
            width: 400,
            height: 60,
            fixed: true,
            button: [{
                value: '确定',
                className: 'ui-btns-orange',
                callback: function() {
                    $("html,body").stop().animate({
                        scrollTop: addressTop
                    }, 300);
                    // return false;
                }
            }]
        });
        //提交表单时防止重复点击提示
        var waitDialog = new dialog({
            fixed: true,
            width: 190,
            height: 40,
            content: '<p>&nbsp;</p><p class="fc-333 fs-14 tc">请稍等...</p>'
        })
        if (addressID != "") {
            waitDialog.showModal();
            $("#J_form").submit();
        } else {
            addDialog.showModal();
        }
    });
    /*
     * 页面通用函数 =====================================================
     */
    /*
     * 获取物流信息函数
     * @param ID, 获取物流信息需要的城市ID号
     */
    //获取物流
    function getShipService(ID) {
        var shipData = {
            "labelName": "",
            "list": ""
        };

        function addPreEarnestLine() {
            $(".btns-item").html("<span class=\"J_agreeDeposit\"><i class=\"icon icon-box-normal \"></i>同意支付定金<sapn class=\"fc-f60\">（定金恕不退还）</sapn></span><a href=\"javascript:void(0);\" id=\"J_grayBtn\" class=\"submit-cart-btn\" style=\"background-color: #ccc; cursor: default;\">提交订单<i class=\"icon-point-right\"></i></a>");
        };

        //function AjaxShipService() {
        $.ajax({
            url: cdnConfig.cartApiPath + '/cart/ship/' + ID,
            dataType: "jsonp",
            success: function(res) {
                if (res.status == "succ") {
                    shipData.labelName = res.data.list[0].name;
                    shipData.list = res.data.list;
                    randShipSelect(shipData, "#J_shiping");
                    var shipPriceS = res.data.list[0].price;
                    $("#J_shipPrice").html(shipPriceS.toFixed(2));
                    if (khSellType == 1) {
                        addPreEarnestLine();
                        agreePreRule("true");
                    } else {
                        isAllRight("true");
                    };
                    //设置应付金额
                    setPayPrice();
                } else {
                    shipData.labelName = "此地址不支持配送";
                    shipData.list = []; //res.data.list;
                    $("#J_shipPrice").html("0.00");
                    randShipSelect(shipData, "#J_shiping");
                    if (khSellType == 1) {
                        addPreEarnestLine();
                        isAllRight("false");
                    } else {
                        isAllRight("false");
                    };
                    //设置应付金额
                    setPayPrice();
                    //isPreShipRight("false");
                }
            }
        });
        //};

    };
    //渲染物流模板
    function randShipSelect(data, tarID) {
        var tarObj = $(tarID);

        //seajs.use(['lib/v1/1.0.0/cart/tplSelectShip'], function(tplShip){
        //渲染模板
        tarObj.html(tempcart('tplSelectShip', data));

        //选择物流服务
        khSelect({
            mainCell: "#J_shiping",
            callback: function(val, text, obj) {
                var price = obj.attr("data-price");
                $("#J_shipPrice").html(parseInt(price).toFixed(2));
                setPayPrice();
            }
        })

        //});
    }
    /*  计算商品总价 */
    getTotalPrice();

    function getTotalPrice() {
        var total = 0;
        $(".JQ_subtotal").each(function() {
            total = total + parseInt($(this).html());
        });
        $("#J_totalPrice").html(total.toFixed(2));
    }
    /*
     * 限制输入数字函数 ========================================
     * @param domID, 对象容器ID号，格式为："#id"
     */
    inputAcount("#J_summary");

    function inputAcount(domID) {
        var obj = $(domID);
        var textArea = obj.find("textArea");
        var textMount = obj.find("#J_textMount");
        var maxMount = textMount.attr("data-max");
        //点击提示文字事件
        $(".JQ_placeHolder").on("click", function() {
            $(this).hide();
            textArea.focus();
        });
        //聚焦事件
        textArea.on("focus", function() {
            $(".JQ_placeHolder").hide();
        });
        //失去焦点事件
        textArea.on("blur", function() {
            if ($.trim($(this).val()) == "") {
                $(".JQ_placeHolder").show();
            }
        });
        //按键事件
        textArea.on("keyup", function() {
            var str = $(this).val()
            if (str.length <= maxMount) {
                textMount.html(str.length);
            } else {
                $(this).val(str.substr(0, 200));
            }
            //console.log(str.length);
        });
    }
    /*
     * 获取现金券 ====================================================
     */
    //是否选择使用现金券
    var useCashFlag = false;
    var cashTemp = "";
    $(".JQ_useCash").on("click", function() {
        var that = $(this);
        if (that.hasClass("icon-box-checked")) {
            //变换样式
            that.removeClass("icon-box-checked");
            //删除使用优惠券的下拉菜单
            $("#J_cashWrap").hide();
            //清空所选的券
            cashTemp = $("input[name=selectCash]").val();
            $("input[name=selectCash]").val("");
            //删除使用优惠券的金额
            $("#J_cashPrice").html('0.00');
            //重新计算应付金额
            setPayPrice();
        } else {
            //变换样式
            that.addClass("icon-box-checked");
            //显示下拉菜单
            $("#J_cashWrap").css({
                "display": 'inline'
            });
            //
            $("input[name=selectCash]").val(cashTemp);

            $("#J_cashPrice").html($("input[name=selectCashPrice]").val());
            //重新计算应付金额
            setPayPrice();
        }
    });
    //获取现金券函数
    function getCashList() {
        var cashData = {
            "labelName": "暂无可用现金券",
            "list": []
        }
        $.ajax({
            url: cdnConfig.cartApiPath + '/cart/cash',
            dataType: 'jsonp',
            success: function(res) {
                if (res.status == "succ") {
                    cashData.list = res.data.list;
                } else {
                    cashData.labelName = res.data.msg;
                    cashData.list.length = 0;
                    $("#J_cash .JQ_option").html(res.data.msg);
                }
                //渲染现金券下拉菜单模板
                $("#J_useCashWrap").append(tempcart('tplCartCash', cashData));
                //选择现金券
                khSelect({
                    mainCell: "#J_cash",
                    callback: function(val, text, obj) {
                        //设置使用了多少现金券的金额
                        $("#J_cashPrice").html(obj.attr("data-price"));
                        $("input[name=selectCashPrice]").val(obj.attr("data-price"));
                        //重新计算应付金额
                        setPayPrice();
                    }
                });
            }
        });
    }
    /*
     * 获取优惠券 ====================================================
     */
    //是否选择使用优惠券
    var useCouponFlag = false;
    var coupontTemp = "";
    $(".JQ_useConpon").on("click", function() {
        var that = $(this);
        if ($(".JQ_useRedWallet").hasClass("icon-box-checked")) {
            alert("优惠券和红包不能同时使用哦！");
        } else {
            if (that.hasClass("icon-box-checked")) {
                //变换样式
                that.removeClass("icon-box-checked");
                //删除使用优惠券的下拉菜单
                $("#J_couponWrap").hide();
                //清空所选的券
                coupontTemp = $("input[name=selectCoupon]").val();
                $("input[name=selectCoupon]").val("");
                //删除使用优惠券的金额
                $("#J_couponPrice").html('0.00');
                //重新计算应付金额
                setPayPrice();
            } else {
                //变换样式
                that.addClass("icon-box-checked");
                //显示下拉菜单
                $("#J_couponWrap").css({
                    "display": 'inline'
                });
                //
                $("input[name=selectCoupon]").val(coupontTemp);

                $("#J_couponPrice").html($("input[name=selectCouponPrice]").val());
                // console.log($("#J_couponPrice").html());
                //重新计算应付金额
                setPayPrice();
            }
        };

    });
    //获取优惠券函数
    function getCounponList() {
        var couponData = {
            "labelName": "暂无可用优惠券",
            "list": []
        }
        $.ajax({
            url: cdnConfig.cartApiPath + '/cart/coupon',
            dataType: 'jsonp',
            success: function(res) {
                if (res.status == "succ") {
                    couponData.list = res.data.list;
                } else {
                    couponData.labelName = res.data.msg;
                    couponData.list.length = 0;
                    $("#J_coupon .JQ_option").html(res.data.msg);
                }
                //渲染优惠券下拉菜单模板
                $("#J_useCouponWrap").append(tempcart('tplCoupon', couponData));
                //选择优惠券
                khSelect({
                    mainCell: "#J_coupon",
                    callback: function(val, text, obj) {
                        //设置使用了多少优惠券的金额
                        $("#J_couponPrice").html(obj.attr("data-price"));
                        $("input[name=selectCouponPrice]").val(obj.attr("data-price"));
                        //重新计算应付金额
                        setPayPrice();
                    }
                });
            }
        });
    }
    /*
     * 获取红包 ====================================================
     */
    //是否选择使用红包
    var useRedWalletFlag = false;
    var redWalletTemp = "";
    $(".JQ_useRedWallet").on("click", function() {
        var that = $(this);
        if ($(".JQ_useConpon").hasClass("icon-box-checked")) {
            alert("优惠券和红包不能同时使用哦！");
        } else {
            if (that.hasClass("icon-box-checked")) {
                //变换样式
                that.removeClass("icon-box-checked");
                //隐藏使用红包的下拉菜单
                $("#J_redWalletWrap").hide();
                //清空所选的券
                redWalletTemp = $("input[name=selectRedWallet]").val();
                $("input[name=selectRedWallet]").val("");
                //删除使用红包的金额
                $("#J_redWalletPrice").html('0.00');
                //重新计算应付金额
                setPayPrice();
            } else {
                //变换样式
                that.addClass("icon-box-checked");
                //显示下拉菜单
                $("#J_redWalletWrap").css({
                    "display": 'inline'
                });
                //
                $("input[name=selectRedWallet]").val(redWalletTemp);
                $("#J_redWalletPrice").html($("input[name=selectRedWalletPrice]").val());
                //console.log($("#J_redWalletPrice").html());
                //重新计算应付金额
                setPayPrice();
            }
        };
    });
    $(function() {
        //选择红包
        khSelect({
            mainCell: "#J_redWallet",
            callback: function(val, text, obj) {
                //设置使用了多少红包的金额
                $("#J_redWalletPrice").html(obj.attr("data-price"));
                $("input[name=selectRedWalletPrice]").val(obj.attr("data-price"));
                //重新计算应付金额
                setPayPrice();
            }
        });
    });
    /*
     * 获取积分  ====================================================
     */
    //是否选择使用积分抵现
    $(".JQ_usePoints").on("click", function() {
        var that = $(this);
        if (that.hasClass("icon-box-checked")) {
            //删除样式
            that.removeClass("icon-box-checked");

            $(".list-points").hide();
            //清空input和后面的积分值
            $("input[name=shopPoints]").val(0);
            $("#J_toUse").html(0);
            $("#J_pointsPrice").html('0.00');
            setPayPrice();
        } else {
            //添加样式
            that.addClass("icon-box-checked");
            //显示下拉
            $(".list-points").show();
        }
    });
    //获取积分函数  @param domID, 目标容器，用于放置获取到的积分总数
    function getPoints(domID) {
        var tarObj = $(domID);
        var usePointVal = $("#J_shopPoints").html();

        if (usePointVal == 0) {
            $("input[name=shopPoints]").attr("disabled", "disabled");
        } else {
            $("input[name=shopPoints]").attr("data-max", usePointVal);
            $("input[name=shopPoints]").removeAttr("disabled");
        }

        //监听输入
        usePoints();

    }
    //积分输入处理函数
    function usePoints() {
        var obj = $("input[name=shopPoints]");
        var max = obj.attr("data-max");
        var tarUse = $("#J_toUse");
        var tipDialog = new dialog({
            align: 'bottom'
        });
        obj.on("keyup", function(event) {
            //preventDefault(event);
            event.preventDefault();

            var that = $(this);
            var val = $(this).val();

            if (isNaN(val)) {
                that.val(0);
                //设置可抵现金额
                tarUse.html(parseFloat(that.val() / 100).toFixed(2));
                //设置可计算的积分金额
                $("#J_pointsPrice").html(parseFloat(that.val() / 100).toFixed(2));
            } else {
                if (parseInt(val) > parseInt(max)) {
                    tipDialog.content('<p class="mt-10">最多只能使用' + max + '积分</p>')
                    tipDialog.show(document.getElementById("J_shopPoints"));

                    setTimeout(function() {
                        tipDialog.close();
                    }, 3000);
                    //设置为最大
                    that.val(max);
                    //设置可抵现金额
                    tarUse.html(parseFloat(max / 100).toFixed(2));
                    //设置可计算的积分金额
                    $("#J_pointsPrice").html(parseFloat(max / 100).toFixed(2));

                } else {
                    //设置可抵现金额
                    tarUse.html(parseFloat(that.val() / 100).toFixed(2));
                    //设置可计算的积分金额
                    $("#J_pointsPrice").html(parseFloat(that.val() / 100).toFixed(2));

                }
            }
            //计算应付金额
            setPayPrice();
        });
    }
    //设置应付金额函数
    function setPayPrice() {
        //console.log("hello");
        var payPrice = 0;
        var orderPoints = $(".JQ_orderPoints");
        var totalPrice = $.trim($("#J_totalPrice").html());
        var cashPrice = $.trim($("#J_cashPrice").html());
        var couponPrice = $.trim($("#J_couponPrice").html());
        var redWalletPrice = $.trim($("#J_redWalletPrice").html());
        var pointsPrice = $.trim($("#J_pointsPrice").html());
        var shipPrice = $.trim($("#J_shipPrice").html());

        //是否为预售模块
        if (khSellType == 2) {
            payPrice = parseFloat(totalPrice) + parseFloat(shipPrice);
            var GetPoints = Math.floor(payPrice);
            orderPoints.html(GetPoints);
        } else {
            if (khSellType == 1) {
                payPrice = parseFloat(totalPrice);
            } else {
                payPrice = parseFloat(totalPrice) - parseFloat(cashPrice) - parseFloat(couponPrice) - parseFloat(redWalletPrice) - parseFloat(pointsPrice) + parseFloat(shipPrice);
            }
        };

        //是否为预售计价

        /*if($('.JQ_preSalePrice').length) {
            payPrice = parseFloat(totalPrice) - parseFloat(cashPrice) - parseFloat(couponPrice) - parseFloat(pointsPrice);
        }*/
        $(".JQ_payPrice").html(payPrice.toFixed(2));
    }
    //});

    //预售同意支付定金
    function agreePreRule(btnOk) {
        var subBtn = '<a href="javascript:void(0);" id="J_submitBtn" class="submit-cart-btn">提交订单<i class="icon-point-right"></i></a>';
        var grayBtn = '<a href="javascript:void(0);" id="J_grayBtn" class="submit-cart-btn" style="background-color: #ccc; cursor: default;">提交订单<i class="icon-point-right"></i></a>';
        if (btnOk == "true") {
            $('.J_agreeDeposit').on('click', function() {
                var self = $(this);
                var icon = self.find('.icon');
                if (!icon.hasClass('icon-box-checked')) {
                    icon.addClass('icon-box-checked');
                    isAllRight("true");
                } else {
                    icon.removeClass('icon-box-checked');
                    isAllRight("false");
                }
            });
        } else {
            icon.removeClass('icon-box-checked');
            isAllRight("false");
        };
    }


    //预售修改通知手机号码
    ;
    (function() {
        var editBtn = $('.J_noticeEdit');
        var saveBtn = $('.J_noticeSave');
        var cancleBtn = $('.J_noticeCancle');
        var modify = $('.J_noticeModify');
        var phone = $('.J_noticePhone');
        var msg = $('.J_noticeMsg');
        var prePhone = $("input[name='rePhoneNum']");
        //修改
        editBtn.on('click', function() {
            editBtn.addClass('pre-sale-hide');
            phone.addClass('pre-sale-hide');
            saveBtn.removeClass('pre-sale-hide');
            cancleBtn.removeClass('pre-sale-hide');
            modify.removeClass('pre-sale-hide');
        });
        //取消修改
        cancleBtn.on('click', function() {
            editBtn.removeClass('pre-sale-hide');
            phone.removeClass('pre-sale-hide');
            saveBtn.addClass('pre-sale-hide');
            cancleBtn.addClass('pre-sale-hide');
            modify.addClass('pre-sale-hide');
            msg.hide();
        });
        //保存修改
        saveBtn.on('click', function() {
            var val = $.trim(modify.val());
            if (val == '') {
                msg.html('请输入尾款提醒手机号码').show();
            } else {
                if (/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(val)) {
                    prePhone.val(val);
                    phone.html(val).removeClass('pre-sale-hide');
                    editBtn.removeClass('pre-sale-hide');
                    saveBtn.addClass('pre-sale-hide');
                    cancleBtn.addClass('pre-sale-hide');
                    modify.val('').addClass('pre-sale-hide');
                } else {
                    msg.html('请输入正确的手机号码').show();
                }
            }
        });

        modify.on('focus', function() {
            msg.hide();
        });

        modify.on('blur', function() {
            var val = $.trim(modify.val());
            if (val == '') {
                msg.html('请输入尾款提醒手机号码').show();
            } else {
                if (!/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(val)) {
                    msg.html('请输入正确的手机号码').show();
                }
            }
        });

    })();


});
