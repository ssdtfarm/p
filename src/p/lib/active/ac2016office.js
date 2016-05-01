define(function(require, exports, module) {
    var jquery = require("../jquery/jquery/1.9.1/jquery");
    window.$ = window.jQuery = $;
    var dialog = require("../components/dialog/1.0.0/dialog");
    var loginDialog = require("../components/loginDialog/1.0.0/loginDialog");
    var template = require("../template/template");

    /*获取验证码*/
    var officeName = $("#J_officeName");
    var officeTel = $("#J_officeTel");
    var officeYzm = $("#J_officeYzm");
    $("#J_yzmBtn").on('click', function(e) {
        if (chkEnrTel(officeTel)) {
            $("#J_yzmBtn").hide();
            var btnMSG = "<a id=\"J_btnUnabled\" class=\"yzm-btn\">发送请求中</a>";
            $(this).parent().append(btnMSG);
            $.ajax({
                url: "http://sale.jiajucn.com/api/sendPhone",
                dataType: "jsonp",
                data: {
                    "phone": $.trim(officeTel.val()),
                    "type": "7"
                },
                success: function(res) {
                    var sta = res.status;
                    if (sta == 2 || sta == 3 || sta == 5) {
                        switch (sta) {
                            case 2:
                                actDialog.d0("对不起！该手机号码已经报名！");
                                $("#J_btnUnabled").remove();
                                $("#J_yzmBtn").html("手机获取验证码").show();
                                break;
                            case 3:
                                actDialog.d0("验证码已经发送过，请在60秒后重试");
                                $("#J_btnUnabled").html("<span id=\"J_countDown\">59</span>秒后可获取");
                                subTime("#J_countDown", {
                                    num: 50,
                                });
                                break;
                            case 5:
                                actDialog.d0("发送验证码成功，请查看手机短信");
                                $("#J_btnUnabled").html("<span id=\"J_countDown\">59</span>秒后可获取");
                                subTime("#J_countDown", {
                                    num: 60,
                                });
                                break;
                            default:
                                break;
                        }
                    } else {
                        var msg = res.message;
                        actDialog.d0(msg);
                    }
                },
                error: function() {
                    console.log("连接错误，请再次尝试");
                }
            });
        }
    });

    $("#J_officeBtn").on("click", function() {
        if (chkEnrName(officeName) && chkEnrTel(officeTel) && verifyYzm(officeYzm)) {
            $.ajax({
                url: 'http://sale.jiajucn.com/api/signs',
                dataType: "jsonp",
                data: {
                    "name": $.trim(officeName.val()),
                    "phone": $.trim(officeTel.val()),
                    "phone_code": $.trim(officeYzm.val()),
                    "type": "7"
                },
                success: function(res) {
                    var sta = res.status;
                    if (sta == 3 || sta == 4) {
                        switch (sta) {
                            case 3:
                                actDialog.d0('短信验证码错误');
                                break;
                            case 4:
                                actDialog.d1("您已经报名成功！到门店即可免费领精美礼品！");
                                break;
                            default:
                                break;
                        }
                    } else {
                        var msg = res.message;
                        actDialog.d0(msg);
                    }
                },
                error: function() {
                    console.log("连接错误，请再次尝试");
                }
            });
        }
    });

    function chkEnrName(objName) {
        var dom = objName || $("#J_officeName");
        var reg = /^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{2,40}$/;
        var val = $.trim(dom.val());
        if (reg.test(val)) {
            return true;
        } else {
            if (val === "") {
                actDialog.d0('姓名不能为空');
            } else {
                actDialog.d0('姓名格式有误，请输入正确的姓名');
            }
            //actDialog.d0("姓名格式有误，请输入正确格式。");
            return false;
        }
    };

    function chkEnrTel(objName) {
        var dom = objName || $("#J_officeTel");
        var reg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/; //匹配手机
        var regFixed = /^0\d{9,11}$/; //匹配固话（11或12位电话号）
        var val = $.trim(dom.val());
        if (reg.test(val) || regFixed.test(val)) {
            return true;
        } else {
            if (val === "") {
                actDialog.d0('手机号码不能为空');
            } else {
                actDialog.d0('手机号码格式有误，请输入正确的手机号码');
            }
            //actDialog.d0("手机号码格式有误，请输入正确的手机号码");
            return false;
        }
    };

    function verifyYzm(objName) {
        var dom = objName || $("#J_officeYzm");
        var val = $.trim(dom.val());
        if (!val == "") {
            if (val.length == 6 && !isNaN(val)) {
                return true;
            } else {
                actDialog.d0("验证码应为6位数字！");
                return false;
            }
        } else {
            actDialog.d0("验证码不能为空");
            return false;
        }
    };


    /*
     *小林倒计时
     *
     * @param timeNumId; 验证码倒计时标签id
     * @param config; 需要做倒计时的时间
     */

    function subTime(timeNumId, config) {
        config = config || {}
        this.num = config['num'];
        var obj = $(timeNumId);
        var str = this.num;
        var timer = setInterval(function(e) {
            if (str == 0) {
                clearInterval(timer);
                $("#J_btnUnabled").remove();
                $("#J_yzmBtn").html("重新获取验证码").show();
                obj.html(this.num);
            } else {
                str = str - 1;
                obj.html(str);
            }
        }, 1000)
    };
    /*
     * 金龟tip提示
     * @param {objName}  提示框内容目标容器name值，已经使用变量暴露置顶
     * @param {str} 提示文字
     * demo:   formTipShow(paw, "密码输入错误");
     */

    function formTipShow(objName, str) {
        var obj = objName;
        //obj.addClass("error");
        //var text = "<i class=\"icon-tip-wrong\"></i>" + "&nbsp;<span>" + str + "</span>";
        obj.parent().parent().find(".JQ_tip").html(str);
        //obj.parent().find(".icon-tip-ok").remove();
        //如果聚焦，去除内容和样式
        $(".inp").on("focus", function() {
            // $(this).removeClass("error");
            $(".JQ_tip").html("");
        });
    };

    //金龟弹框开始=================================

    var actDialog = new actDialog();

    function actDialog() {
        this.txt = "";
        this.setTxt = function(newTxt) {
            this.txt = newTxt;
        };
        //没有小字（弹框自动关闭）
        this.d0 = function(txt) {
            var str = "<table class=\"lucky-dialog-content\"><tr><th><i class=\"icon-face-smile-orange\"></i></th><td><span class=\"msg-18\">" + txt + "</span></td></tr></table>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "确定",
                    id: "J_btnCj",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                    }
                }]
            }).showModal();
        };
        //有小字（弹框自动关闭）
        this.d1 = function(txt) {
            var str = "<table class=\"lucky-dialog-content\"><tr><th><i class=\"icon-face-smile-orange\"></i></th><td><span class=\"msg-18\">" + txt + "</span><br/><span class=\"msg-14\" style=\"color:#8c8c8c;\">门店地址在活动页底部有提示，详情请咨询客服。</span></td></tr></table>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "确定",
                    id: "J_btnCj",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                        window.location.reload();
                    }
                }]
            }).showModal();
        };
    };
});
