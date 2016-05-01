define(function(require, exports, module) {
    /*===============================*/
    /*  我的钱包 
     *  @author zhangzhensheng
     *  @date   2015-10-23
    /* ==============================*/
    var dialog = require('../components/dialog/1.0.0/dialog');
    var khValidate = require('../components/khValidate/1.0.0/khValidate');
    var minBar = require('../components/minBar/1.0.1/minBar');
    var template = require('../template/tempcomment');

    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell: '#J_minBar',
        pathConfig: cdnConfig,
        tpl: template,
        tplName: "tplMinBar",
        data: _globalConfig.minBar.data
    });

    // 加载侧边栏
    document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

    $(function() {
        // 当提现银行卡为空时显示空白框
        if ($(".getcash-list li").length < 2) {
            $(".no-card").removeClass("no-card-on");
        }
        selectCard();
        setChkPrice();
        setChkPwd();
        setSubmit();
    });
    // 提交提现申请
    var isChkPrice = false,
        isChkPwd = false,
        noSelect = true; //true表示没选中银行卡，false表示有选中
    // 设置输入框边框颜色
    function setInputColor(target) {
        target.warning ? target.element.addClass("bcC13D23").removeClass("bcB4") : target.element.addClass("bcB4").removeClass("bcC13D23");
    }
    // 选择银行卡
    function selectCard() {
        var $div = $("<div class='selected-box hide'></div>").appendTo($(".getcash-list"));
        $(".has-card").bind("click", function() {

            $(".danger-tip").hide();
            setInputColor({ "element": $("input[name='price']"), "warning": false });
            setInputColor({ "element": $("input[name='password']"), "warning": false });

            // 显示选择框
            $(".has-card").removeClass("selected").css("border-color", "#CCC");
            $(this).addClass("selected").css("border-color", "#F60");
            $div.css({
                "left": $(this).offset().left - 1,
                "top": $(this).offset().top - 1,
                "display": "block"
            });
            // 显示银行卡余额（需求有误，屏蔽）
            // $(".getcash-price").html('可用金额：<img class="loading-t" src="http://misc.jjcdn.com/p/images/loading-t.gif"/><i class="danger-tip hide mt-9"></i>');
            /*$.ajax({
                url:"",
                data:{
                    "security":"123",
                    "tailnum":"8888",
                    "type":"icbc"
                },
                dataType:"jsonp",
                success:function(res){
                    if (res.status == "succ") {
                        $(".getcash-price .danger-tip").hide();
                        $(".getcash-price").html("可用金额：<span>"+res.balance+"</span>");
                        if (res.balance >= 1) {
                            $("input[name='price']").removeAttr("disabled");
                            $("input[name='password']").removeAttr("disabled");
                        } else {
                            $("input[name='price']").attr("disabled","true");
                            $("input[name='password']").attr("disabled","true");
                        }
                    } else if (res.status == "fail") {
                        $(".getcash-price .danger-tip").html('<i class="icon-tip-wrong"></i>读取银行卡出错').show();
                        $("input[name='price']").attr("disabled","true");
                        $("input[name='password']").attr("disabled","true");
                    };
                },
                error:function(){
                    $(".getcash-price .danger-tip").html('<i class="icon-tip-wrong"></i>获取金额失败，请检查网络').show();
                    $("input[name='price']").attr("disabled","true");
                    $("input[name='password']").attr("disabled","true");
                }
            });*/

            // 显示银行卡开户人姓名
            $.ajax({
                    url: cdnConfig.my + "/predeposit/ajaxcardinfo",
                    data: {
                        "cardid": $("input[name='cardid']").val()
                    },
                    dataType: "json" //不用跨域，不用jsonp
                })
                .done(function(res) {
                    if (res.code.toString() == '200') {
                        $(".danger-name").hide();
                        $(".J_realname").html(res.data.pdcard_usrname);
                        $("input[name='price']").removeAttr("disabled");
                        $("input[name='password']").removeAttr("disabled");
                    } else if (res.code.toString() == '400') {
                        $(".J_realname").html("");
                        $(".danger-name").html('<i class="icon-tip-wrong"></i>读取银行卡出错').show();
                        $("input[name='price']").attr("disabled", "true");
                        $("input[name='password']").attr("disabled", "true");
                    }
                })
                .fail(function(res) {
                    $(".J_realname").html("");
                    $(".danger-name").html('<i class="icon-tip-wrong"></i>获取姓名失败，请检查网络').show();
                    $("input[name='price']").attr("disabled", "true");
                    $("input[name='password']").attr("disabled", "true");
                });
        });
    }
    // 验证是否选择银行卡
    function isSelectCard() {
        $(".has-card").each(function() {
            if ($(this).hasClass("selected")) {
                noSelect = false;
            }
        });
        setSubStatus();
        if (noSelect) {
            $(".danger-name").html('<i class="icon-tip-wrong"></i>请先选择银行卡！').show();
            $("input[name='price']").val("").attr("disabled", "true");
            $("input[name='password']").val("").attr("disabled", "true");
            return true;
        }
    }
    // 异步检测钱包余额是否足够
    function isEnoughPrice(element) {
        if (isSelectCard()) {
            return false;
        }
        $.ajax({
                url: cdnConfig.my + "/predeposit/checkprice",
                data: {
                    "price": $("input[name='price']").val()
                },
                dataType: "json"
            })
            .done(function(res) {
                if (res.code.toString() == "200") {
                    isChkPrice = true;
                    setSubStatus();
                } else if (res.code.toString() == "400") {
                    setInputColor({ "element": $("input[name='price']"), "warning": true });
                    $(".danger-price").html('<i class="icon-tip-wrong"></i>余额不足').show();
                    isChkPrice = false;
                    setSubStatus();
                }
            })
            .fail(function() {
                setInputColor({ "element": $("input[name='price']"), "warning": true });
                $(".danger-price").html('<i class="icon-tip-wrong"></i>网络错误，无法查询余额').show();
                isChkPrice = false;
                setSubStatus();
            });
    }
    // 验证提现金额
    function setChkPrice() {
        $("input[name='price']").bind("focus", function() {
            $(".danger-price").hide();
        });
        $("input[name='price']").bind("keydown", function(e) {
            // 只允许输入主键盘和小键盘上的数字、小数点，只允许使用方向键、Tab键、回退键、Shift键、Ctrl键、Home键、End键
            var keywords = [8, 9, 16, 17, 35, 36, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 190];
            if (keywords.every(function(item, index, array) {
                    return e.which != item; })) {
                return false;
            }
            // 只允许一个小数点
            if (e.which == 110 || e.which == 190) {
                if ($(this).val().split("").some(function(item, index, array) {
                        return item == "."; })) {
                    return false;
                }
            }
        });
        $("input[name='price']").bind("blur", function(e) {

            $(".danger-price").hide();
            setInputColor({ "element": $(this), "warning": false });

            var price = $(this).val();
            if (price !== "") {
                // 输入格式为".xxxx"时改为"0.xx"
                if (/^[\.][0-9]*$/.test(price)) {
                    $(this).val("0" + price);
                    price = $(this).val();
                }
                // 输入格式合法性
                if (!khValidate.chkPrice(price)) {
                    setInputColor({ "element": $(this), "warning": true });
                    $(".danger-price").html('<i class="icon-tip-wrong"></i>输入格式有误').show();
                    isChkPrice = false;
                    setSubStatus();
                    return false;
                } else {
                    // 取小数点后两位
                    $(this).val(parseFloat(price).toFixed(2));
                    price = $(this).val();
                }
                // 输入金额小于1.00时
                if (parseFloat(price) < 1.00) {
                    setInputColor({ "element": $(this), "warning": true });
                    $(".danger-price").html('<i class="icon-tip-wrong"></i>提现金额至少为￥1.00').show();
                    isChkPrice = false;
                    setSubStatus();
                    return false;
                }
                // 输入金额大于1000.00
                if (parseFloat(price) > 1000.00) {
                    $(this).val("1000.00");
                    price = $(this).val();
                }

                isEnoughPrice($("input[name='password']"));

            } else if (price === "") {
                setInputColor({ "element": $(this), "warning": true });
                $(".danger-price").html('<i class="icon-tip-wrong"></i>提现金额不能为空').show();
                isChkPrice = false;
                setSubStatus();
                return false;
            }
        });
        // 金额格式验证（自定义）
        khValidate.chkPrice = function(str) {
            var reg = /^[0-9]*[\.]?[0-9]*$/;
            return reg.test(str);
        };
    }
    // 验证支付密码
    function setChkPwd() {
        $("input[name='password']").bind("focus", function() {
            $(".danger-pwd").hide();
        });
        $("input[name='password']").bind("blur", function(e) {

            $(".danger-pwd").hide();
            setInputColor({ "element": $(this), "warning": false });

            // 检测错误时间是否过期
            /*var overdue = false;
            $.ajax({
                url:"",
                data:{
                    "userId":"id"
                },
                dataType:"jsonp",
                success:function(res){
                    if (res.status == "succ" || res.count < 3) {
                        $("input[name='password']").removeAttr("disabled");
                    } else if (res.status == "fail" || res.count >= 3) {
                        $(".icon-tip-ok").hide();
                        $("input[name='password']").val("").attr("disabled","true");
                        $(".danger-pwd").html('<i class="icon-tip-wrong"></i>密码输入错误已超过三次，为了账户安全，请30分钟后再试！').show();
                        overdue = true;
                    };
                },
                error:function(){
                    $(".icon-tip-ok").hide();
                }
            });
            if (overdue) {
                return false;
            };*/

            var pwd = $(this).val();
            if (pwd !== "") {
                // isEnoughPrice($("input[name='price']"));
                $.ajax({
                        url: cdnConfig.my + "/predeposit/checkpaypwd",
                        data: {
                            "paypasswd": pwd
                        },
                        dataType: "json"
                    })
                    .done(function(res) {
                        if (res.code.toString() == "200") {
                            $(".icon-tip-ok").show();
                            isChkPwd = true;
                            setSubStatus();
                        } else if (res.code.toString() == "400") {
                            $(".icon-tip-ok").hide();
                            $(".danger-pwd").html('<i class="icon-tip-wrong"></i>密码错误').show();
                            isChkPwd = false;
                            setSubStatus();

                            // 记录支付密码错误次数
                            /*$.ajax({
                                url:"",
                                data:{
                                    "errorcount":"count"
                                },
                                dataType:"jsonp",
                                success:function(res){
                                    $(".danger-pwd").html('<i class="icon-tip-wrong"></i>支付密码错误，还剩下'+(3-res.count)+'次机会').show();
                                },
                                error:function(){
                                    $(".danger-pwd").html('<i class="icon-tip-wrong"></i>网络错误，无法验证密码').show();
                                }
                            });*/
                        }
                    })
                    .fail(function(res) {
                        $(".icon-tip-ok").hide();
                        setInputColor({ "element": $(this), "warning": true });
                        $(".danger-pwd").html('<i class="icon-tip-wrong"></i>网络错误，无法验证密码').show();
                        isChkPwd = false;
                        setSubStatus();
                    });
            } else if (pwd === "") {
                setInputColor({ "element": $(this), "warning": true });
                $(".danger-pwd").html('<i class="icon-tip-wrong"></i>密码不能为空').show();
                isChkPwd = false;
                setSubStatus();
                return false;
            }
        });
    }
    // 设置提交按钮状态
    function setSubStatus() {
        if (!noSelect && isChkPwd && isChkPrice) {
            $("#J_subDialog").attr("class", "active");
        } else {
            $("#J_subDialog").attr("class", "inactive");
        }
    }
    // 提交申请
    function setSubmit() {
        $("#J_subDialog").bind("click", function() {
            // noSelect = false;
            if ($("#J_subDialog").hasClass("inactive")) {
                return false;
            } else if ($("#J_subDialog").hasClass("active")) {

                if (isSelectCard()) {
                    return false;
                }
                $("input[name='price']").blur();
                $("input[name='password']").blur();
                if (!noSelect && isChkPwd && isChkPrice) {
                    noSelect = true;
                    // 确认弹框
                    var str = '<div class="chk-tip-1">您的提现资金会在1-3个工作日内转入您的银行账户中。</div>';
                    str += '<div class="chk-tip-2"><i class="icon-tip-wrong"></i>请确认输入信息正确。如信息不正确，该笔提现交易将会退回您的钱包。</div>';
                    str += '<table class="confirm-table">';
                    str += '<tr>';
                    str += '    <td class="confirm-td pt5">会员帐号：</td>';
                    str += '    <td class="pt5">' + $(".J_membername").text() + '</td>';
                    str += '</tr>';
                    str += '<tr>';
                    str += '    <td class="confirm-td">开户名：</td>';
                    str += '    <td>' + $(".J_realname").text() + '</td>';
                    str += '</tr>';
                    str += '<tr>';
                    str += '    <td class="confirm-td">提现银行卡：</td>';
                    str += '    <td><span>' + $("input[name='cardno']").val() + '</span><img src="' + $(".has-card.selected img").attr("src") + '" alt="' + $(".has-card.selected img").attr("alt") + '"></td>';
                    str += '</tr>';
                    str += '<tr>';
                    str += '    <td class="confirm-td pb5">提现金额：</td>';
                    str += '    <td class="pb5">￥' + $("input[name='price']").val() + '</td>';
                    str += '</tr>';
                    str += '</table>';
                    str += '<div class="btn-cancel"><span id="J_cancelSubmit">返回修改</span></div>';
                    var chkDialog = new dialog({
                        title: "提现到银行卡信息确认",
                        content: str,
                        width: 550,
                        height: 248,
                        fixed: true,
                        button: [{
                            id: "J_submit",
                            value: "确认提现",
                            className: "ui-btns-ok",
                            callback: function() {
                                $("button[i-id='J_submit']").text("申请中 ...").attr("disabled", "true");

                                // 表单提交
                                // $("#J_getcashForm").submit();

                                // ajax提交（方便检测密码）
                                $.ajax({
                                        url: cdnConfig.my + '/predeposit/addcash',
                                        data: {
                                            "cardid": $("input[name='cardid']").val(),
                                            "price": $("input[name='price']").val()
                                        },
                                        dataType: "json"
                                    })
                                    .done(function(res) {
                                        if (res.code.toString() == "200") {
                                            $("button[i-id='J_submit']").text("申请成功").attr("disabled", "true");
                                            setTimeout(function() {
                                                location.assign(cdnConfig.my + "/predeposit/cashlist");
                                            }, 2000);
                                        } else if (res.code.toString() == "400") {
                                            $("button[i-id='J_submit']").text("申请失败").attr("disabled", "true");
                                        }
                                    })
                                    .fail(function() {
                                        $("button[i-id='J_submit']").text("申请失败").attr("disabled", "true");
                                    });
                                return false;
                            }
                        }]
                    }).showModal();
                    $("#J_cancelSubmit").on("click", function() { chkDialog.close().remove(); });
                }
            }
        });
    }

});
