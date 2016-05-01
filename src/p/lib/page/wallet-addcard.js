define(function(require, exports, module) {
    /*===============================*/
    /*  我的钱包 
     *  @author zhangzhensheng
     *  @date   2015-10-27
    /* ==============================*/
    var template = require('../template/tempcomment');
    var minBar = require('../components/minBar/1.0.1/minBar');
    var khValidate = require('../components/khValidate/1.0.0/khValidate');
    var khSelect = require('../components/khSelect/1.0.0/khSelect');
    var khSelectAddress = require('../components/khSelectAddress/1.0.0/khSelectAddress');


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

    // 地址选择框需要的数据
    // var addressName = $("input[name=address_name]").val();
    // var addressId   = $("input[name=address_id]").val();
    // var data = {
    //     "valPro"     : addressId.split(",")[0],
    //     "textPro"    : addressName.split(",")[0],
    //     "valCity"    : addressId.split(",")[1],
    //     "textCity"   : addressName.split(",")[1],
    //     "valArea"    : addressId.split(",")[2],
    //     "textArea"   : addressName.split(",")[2]
    // };
    var data = {};
        //初始化地址选择框
    $("#J_selectAddress").html(template('tplSelectAddress', data));

    khSelectAddress({
        "selectModule": khSelect
    });

    //选择地址
    // khSelect({
    //     mainCell : "#J_selectArea"
    // });

    $(function() {
        setChkCard();
        setChkBank();
        setChkName();
        setChkPhoneCode();
        setSendPhoneCode();
        setSubmit();
    });

    var isChkLocation = false,
        isChkCard = false,
        isChkBank = false,
        isChkName = false,
        isChkPhoneCode = false;
    // 验证银行卡所在地
    function setChkLocation() {
        var province = $("input[name='valProvince']").val().replace(/\s/g, '');
        var city = $("input[name='valCity']").val().replace(/\s/g, '');
        var area = $("input[name='valArea']").val().replace(/\s/g, '');
        if (province === "" || city === "" || area === "") {
            $(".address-select .danger-tip").html('<i class="icon-tip-wrong"></i>所在地不能为空').show();
            isChkLocation = false;
            return false;
        }
        $(".address-select .danger-tip").hide();
        isChkLocation = true;
    }
    // 验证银行卡号
    function setChkCard() {
        $("input[name='cardno']").bind("focus", function() {
            $(this).siblings(".danger-tip").hide();
        });
        $("input[name='cardno']").bind("blur", function(e) {

            $(this).addClass("bcB4").removeClass("bcC13D23");
            var cardnum = $(this).val().replace(/\s/g, '');
            var self = this;
            if (cardnum !== "") {

                // 输入格式
                if (!khValidate.chkBankAcount(cardnum)) {
                    $(this).addClass("bcC13D23").removeClass("bcB4");
                    $(this).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>输入格式有误').show();
                    isChkCard = false;
                    setSubStatus();
                    return false;
                }
                // ajax检测银行卡号 
                $.ajax({
                        url: cdnConfig.my + '/predeposit/checkcardno',
                        data: {
                            "cardno": $("input[name='cardno']").val()
                        },
                        dataType: "json"
                    })
                    .done(function(res) {
                        if (res.code.toString() == "200") {
                            $(self).siblings(".icon-tip-ok").show();
                            isChkCard = true;
                            setSubStatus();
                        } else if (res.code.toString() == "400") {
                            $(self).addClass("bcC13D23").removeClass("bcB4");
                            $(self).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>输入格式有误').show();
                            isChkCard = false;
                            setSubStatus();
                        }
                    })
                    .fail(function() {
                        $(self).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>发送失败，请检查网络是否通畅').show();
                    });
            } else if (cardnum === "") {
                $(this).addClass("bcC13D23").removeClass("bcB4");
                $(this).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>银行卡号不能为空').show();
                isChkCard = false;
                setSubStatus();
                return false;
            }
        });
    }
    // 验证开户行
    function setChkBank() {
        $("input[name='bankname']").bind("focus", function() {
            $(this).siblings(".danger-tip").hide();
        });
        $("input[name='bankname']").bind("blur", function(e) {

            $(this).addClass("bcB4").removeClass("bcC13D23");
            var bankname = $(this).val().replace(/\s/g, '');
            var self = this;

            if (bankname !== "") {

                // 输入格式
                if (!khValidate.chkCnName(bankname)) {
                    $(this).addClass("bcC13D23").removeClass("bcB4");
                    $(this).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>输入格式有误').show();

                    isChkBank = false;
                    setSubStatus();
                    return false;
                }

                $(this).siblings(".icon-tip-ok").show();
                isChkBank = true;
                setSubStatus();

            } else if (bankname === "") {
                $(this).addClass("bcC13D23").removeClass("bcB4");
                $(this).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>开户行不能为空').show();

                isChkBank = false;
                setSubStatus();
                return false;
            }
        });
    }
    // 验证开户人姓名
    function setChkName() {
        $("input[name='username']").bind("focus", function() {
            $(this).siblings(".danger-tip").hide();
        });
        $("input[name='username']").bind("blur", function(e) {

            $(this).addClass("bcB4").removeClass("bcC13D23");
            var username = $(this).val().replace(/\s/g, '');
            var self = this;

            if (username !== "") {

                // 输入格式
                if (!khValidate.chkCnName(username)) {
                    $(this).addClass("bcC13D23").removeClass("bcB4");
                    $(this).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>输入格式有误').show();

                    isChkName = false;
                    setSubStatus();
                    return false;
                }

                $(this).siblings(".icon-tip-ok").show();
                isChkName = true;
                setSubStatus();

                //通过银行接口检测银行卡预留姓名，暂不实现
                /*$.ajax({
                    url: "",
                    data: {
                        "username": username
                    },
                    dataType: "jsonp",
                    success: function(res){
                        if (res.status == "succ") {
                            $(self).siblings(".icon-tip-ok").show();
                            isChkName = true;
                            setSubStatus();
                        };
                    },
                    error: function(){
                        // alert("连接错误！");
                        $(self).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>检测姓名失败').show();
                        isChkName = false;
                        setSubStatus();
                        return false;
                    }
                });*/

            } else if (username === "") {
                $(this).addClass("bcC13D23").removeClass("bcB4");
                $(this).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>开户人姓名不能为空').show();

                isChkName = false;
                setSubStatus();
                return false;
            }
        });
    }
    // 验证短信验证码
    function setChkPhoneCode() {
        $("input[name='phoneCode']").bind("focus", function() {
            $(this).siblings(".danger-tip").hide();
        });
        $("input[name='phoneCode']").bind("blur", function(e) {

            $(this).addClass("bcB4").removeClass("bcC13D23");
            var phoneCode = $(this).val().replace(/\s/g, '');
            var self = this;

            if (phoneCode !== "") {

                // 输入格式
                if (!khValidate.chkNumber(phoneCode, 6)) {
                    $(this).addClass("bcC13D23").removeClass("bcB4");
                    $(this).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>请输入6位数字验证码').show();

                    isChkPhoneCode = false;
                    setSubStatus();
                    return false;
                }

                // ajax验证
                $.ajax({
                    url: cdnConfig.my + '/ajax/checkphonecode',
                    data: {
                        "phone_code": phoneCode
                    },
                    dataType: 'jsonp',
                    success: function(res) {
                        if (res.code.toString() == '200') {
                            $(self).siblings(".icon-tip-ok").show();
                            isChkPhoneCode = true;
                            setSubStatus();
                        } else if (res.code.toString() == "400") {
                            isChkPhoneCode = false;
                            $(self).addClass("bcC13D23").removeClass("bcB4");
                            $(self).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>' + res.message).show();
                            setSubStatus();
                        }
                    },
                    error: function() {
                        $(self).addClass("bcC13D23").removeClass("bcB4");
                        $(self).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>发送失败，请检查网络是否通畅').show();
                        isChkPhoneCode = false;
                        setSubStatus();
                    }
                });

            } else if (phoneCode === "") {
                $(this).addClass("bcC13D23").removeClass("bcB4");
                $(this).siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>短信验证码不能为空').show();

                isChkPhoneCode = false;
                setSubStatus();
                return false;
            }
        });
    }
    // 发送验证码
    function setSendPhoneCode() {
        $(".sendcode").on("click", function() {
            var phone = $('input[name="phone"]');
            var phoneNum = phone.val().replace(/\s/g, '');
            // var phoneNum = phone.val();
            if (!/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(phoneNum)) {
                phone.siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>手机有误，请检查手机是否正确').show();
                return false;
            }
            sendPhoneCode($("input[name='phoneCode']"), phoneNum);
        });
    }
    var sendCodeClickNum = 0;
    // 发送验证码
    function sendPhoneCode(phoneCode, phoneNum) {
        if (sendCodeClickNum >= 3) {
            // console.log("sendPhoneCode");
            phoneCode.siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>您本次发送手机验证码次数已经用完,请刷新页面重试').show();
            return;
        } else {
            sendCodeClickNum++;
        }
        countDownFn(60, $(".sendcode"), $(".countdown"));
        $.ajax({
                url: cdnConfig.my + '/ajax/sendsms',
                data: {
                    "phone": phoneNum,
                    "type": 7,
                    "h": $("#security").val(),
                    "m": $("#security").attr('name'),
                    "n": sendCodeClickNum,
                    "r": Math.random()
                },
                dataType: "json"
            })
            .done(function(res) {
                if (res.code.toString() == "200") {
                    phoneCode.siblings(".danger-tip").hide();
                    // refreshKey(res.pin);
                } else if (res.code.toString() == "400") {
                    phoneCode.siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>' + res.message).show();
                }
            })
            .fail(function() {
                phoneCode.siblings(".danger-tip").html('<i class="icon-tip-wrong"></i>发送失败，请检查网络是否通畅').show();
            });
    }
    // 倒计时
    function countDownFn(t, obj1, obj2) {
        var tempT = t;
        obj1.addClass("t999");
        obj2.css('display', 'inline-block').html(t + "秒");
        var timer = setInterval(function() {
            if (t <= 0) {
                clearInterval(timer);
                obj1.removeClass("t999").text('重新获取');
                obj2.hide();
            } else {
                t = t - 1;
                obj2.html(t + "秒");
            }
        }, 1000);
    }
    // 刷新页面的key
    function refreshKey(str) {
        var tar = $("#security");
        tar.val(str[1]);
        tar.attr("name", str[0]);
    }
    // 设置提交按钮状态
    function setSubStatus() {
        setChkLocation();
        if (isChkLocation && isChkCard && isChkName && isChkPhoneCode && isChkBank) {
            $("#J_submit").attr("class", "active");
        } else {
            $("#J_submit").attr("class", "inactive");
        }
    }
    // 提交 
    function setSubmit() {
        $("#J_submit").bind("click", function() {
            if ($("#J_submit").hasClass("active")) {
                setChkLocation();
                $("input[name='cardno']").blur();
                $("input[name='bankname']").blur();
                $("input[name='username']").blur();
                $("input[name='phoneCode']").blur();
                if (isChkLocation && isChkCard && isChkName && isChkPhoneCode && isChkBank) {
                    // ajax提交（方便检测验证码）
                    $.ajax({
                            url: cdnConfig.my + '/predeposit/addcard',
                            data: {
                                "provinceid": $("input[name='valProvince']").val(),
                                "cityid": $("input[name='valCity']").val(),
                                "areaid": $("input[name='valArea']").val(),
                                "bankname": $("input[name='bankname']").val(),
                                "cardno": $("input[name='cardno']").val(),
                                "usrname": $("input[name='username']").val(), //银行接口使用usrname，不是username
                                "h": $("#security").val(),
                                "m": $("#security").attr('name'),
                                "n": sendCodeClickNum,
                                "r": Math.random()
                            },
                            dataType: "json"
                        })
                        .done(function(res) {
                            if (res.code.toString() == "200") {
                                refreshKey(res.pin);
                                if (location.search.match(new RegExp("[\?\&]cash=([^\&]*)(\&?)", "i"))[1] == 1) {
                                    location.assign(cdnConfig.my + "/predeposit/addcash");
                                } else {
                                    location.assign(cdnConfig.my + "/predeposit/cardlist");
                                }
                            } else if (res.code.toString() == "400") {
                                alert(res.message);
                            }
                        })
                        .fail(function() {
                            alert("发送失败，请检查网络是否通畅");
                        });
                }
            } else {
                $("#J_submit").attr("class", "inactive");
            }
        });
    }
});
