
function sendSmsDialog(config) {
    var conString = "";
    config = config || {}
    var othis = this;
    var tid = config['tid'] || 0;
    var phoneNumber = config['phoneNumber'] || "";
    this.height = config['height'] || 400;
    this.title = config['title'] || "免费发送到手机";
    this.content = config['content'] || "这里是发送的内容";
    this.telInput = config['telTip'] || "请输入您的手机号码";
    this.codeInput = config['codeTip'] || "请输入验证码";
    this.codeUrl = config['codeUrl'] || "";
    this.second = config['second'] || 120;

    var telTip = this.telInput;
    var codeTip = this.codeInput;
    var cDownTime = this.second;
    //弹框结构
    conString = "<div class=\"ui-send_sms-dialog\">";
    conString += "<form id=\"semdSmsForm\" action=\"#\">";
    conString += "<div class=\"ui-send_sms-dialog-title\">";
    conString += "  <label id=\"uiSendSmsTitle\">" + this.title + "</label>";
    conString += "  <a href=\"javascript:void(0);\" class=\"ui-send_sms-close\"></a>";
    conString += "</div>";
    conString += "<div class=\"ui-send_sms-dialog-content\">";
    conString += "  <p class=\"ui-send_sms-dialog-msg\">发送内容：</p>";
    conString += "    <div class=\"ui-send_sms-send-content\">" + this.content;
    conString += "    </div>";
    conString += "</div>";
    conString += "<div class=\"ui-send_sms-dialog-form\">";
    conString += "  <input type=\"text\" name=\"sendSmsTel\" value=\"请输入您的手机号码\" class=\"ui-send_sms-dialog-input\" /><br />";
    conString += "<p class=\"ui-send_sms_dialog-tip\" id=\"tel_tip\">手机号码错误！</p>";
    conString += "    <input type=\"text\" name=\"sendSmsQrCode\" value=\"请输入验证码\" class=\"ui-send_sms-dialog-input\" /> <label class=\"ui-send_sms-dialog-qrcode\" id=\"getCode\">获取手机验证码</label><label class=\"ui-send_sms-dialog-qrcode-gray\" id=\"getCodeGray\">获取手机验证码</label><br />";
    conString += "<p class=\"ui-send_sms_dialog-tip\" id=\"second_tip\"><span id=\"secondSub\">" + this.second + "</span> 秒后重新获取验证码</p>";
    conString += "<p class=\"ui-send_sms_dialog-tip\" id=\"code_tip\">验证码错误！</p>";
    conString += "    <input type=\"submit\" class=\"ui-send_sms-dialog-submit\" value=\"确定\" />";
    conString += "</div>";
    conString += "</form>";
    conString += "</div>";

    //弹出窗口
    $(document.body).append(conString);
    //建立遮罩层
    $(document.body).append("<div class=\"ui-marker-sms\"></div>");
    //获取弹框高度
    var _hei = $(".ui-send_sms-dialog").height();
    var _formHei = $(".ui-send_sms-dialog-form").innerHeight();
    var _fromHeiP = $(".ui-send_sms-dialog-form").innerHeight();
    //重置弹窗位置
    resetDialogPos(_formHei, _fromHeiP);

    //窗口大小变化时重置位置
    $(window).resize(function(e) {
        resetDialogPos(_formHei, _fromHeiP);
    });

    //关闭窗口
	$(document).on("click",".ui-send_sms-close,#buttonCloseDialog,.ui-marker-sms",function(e){
        $(".ui-marker-sms,.ui-send_sms-dialog").remove();
    });

    //输入手机号码的focus和blur事件
    $("input[name=sendSmsTel]").focus(function(e) {
        if ($(this).val() == telTip) {
            $(this).val("");
        }
        $("#tel_tip").hide();
        resetDialogPos(_formHei, _fromHeiP);
    });
    $("input[name=sendSmsTel]").blur(function(e) {
        if ($(this).val() == "") {
            $(this).val(telTip);
        }
    });
    //输入验证码的focus和blur事件
    $("input[name=sendSmsQrCode]").focus(function(e) {
        if ($(this).val() == codeTip) {
            $(this).val("");
        }
        $("#code_tip").hide();
        resetDialogPos(_formHei, _fromHeiP);
    });
    $("input[name=sendSmsQrCode]").blur(function(e) {
        if ($(this).val() == "") {
            $(this).val(codeTip);
        }
    });

    //获取手机验证码点击
    $("#getCode").bind("click", function(e) {
        if ($("input[name=sendSmsTel]").val() == "" || $("input[name=sendSmsTel]").val() == telTip) {
            alert(telTip);
            $("input[name=sendSmsTel]").focus();
            return false;
        }
       phoneNumber = $("input[name=sendSmsTel]").val();
        $.getJSON(
            "index.php?act=offline_store&op=genCaptcha&phone=" + phoneNumber, 
            function(data) {
                if(data.status=="succ"){
                    $("#getCode").hide();
                    $("#second_tip,#getCodeGray").show();
                    //重置弹框高度
                    _formHeiP = $(".ui-send_sms-dialog-form").innerHeight();
                    resetDialogPos(_formHei, _formHeiP);
                    timeCountDown(cDownTime, "#secondSub");
                }else{
                    alert("发送错误！"); 
                }
        });
    });

    //提交函数
    $("form[id=semdSmsForm]").submit(function(e) {
        if (!chkTelphone($("input[name=sendSmsTel]").val())) {
            return false;
        }
        if (!chkQrCode($("input[name=sendSmsQrCode]").val())) {
            return false;
        }
        captcha = $("input[name=sendSmsQrCode]").val();
        phoneNumber = $("input[name=sendSmsTel]").val();
        $.getJSON("index.php?act=offline_store&op=sendSms&id=" +tid +"&phone="+ phoneNumber +"&captcha=" + captcha , 
            function(data) {
                var result = data
                console.log(result.status);
            if (data.status=="succ") {
                $(".ui-send_sms-dialog-content").css({
                    "height": "120px",
                    "line-height": "120px",
                    "text-align": "center"
                }).html("发送成功");
                $(".ui-send_sms-dialog-input,#second_tip,#getCodeGray").remove();
                $(".ui-send_sms-dialog-form").css({
                    "padding": "0px",
                    "text-align": "center"
                }).html("<input type=\"button\" class=\"ui-send_sms-dialog-submit\" id=\"buttonCloseDialog\" value=\"确定\">")
                //重置弹框高度
                resetDialogPos(_formHei, 180);
            } else {
                $(".ui-send_sms-dialog-content").css({
                    "height": "120px",
                    "line-height": "120px",
                    "text-align": "center"
                }).html("发送失败,请重试");
                $(".ui-send_sms-dialog-input,#second_tip,#getCodeGray").remove();
                $(".ui-send_sms-dialog-form").css({
                    "padding": "0px",
                    "text-align": "center"
                }).html("<input type=\"button\" class=\"ui-send_sms-dialog-submit\" id=\"buttonCloseDialog\" value=\"确定\">")
                //重置弹框高度
                resetDialogPos(_formHei, 180);
            }

        })
        return false;
    });

    //验证手机号码函数
    function chkTelphone(str) {
        var reg = /^(134|135|136|137|138|139|150|151|152|157|158|159|187|130|131|132|155|156|185|186|133|153|180|189|188|170)\d{8}$/
        if (isNaN(str) || str == "") {
            $("#tel_tip").show();
            return false;
        } else {
            if (reg.test(str)) {
                return true;
            } else {
                $("#tel_tip").show();
                return false;
            }
        }
        //重置弹框高度
        _formHeiP = $(".ui-send_sms-dialog-form").innerHeight();
        resetDialogPos(_formHei, _formHeiP);
    }
    //验证手机验证码
    function chkQrCode(num) {
        var reg = /^\d{4}$/ //6位纯数字
        if (isNaN(num) || num == "") {
            $("#code_tip").show();
            return false;
        } else {
            if (reg.test(num)) {
                return true;
            } else {
                $("#code_tip").show();
                return false;
            }
        }
        //重置弹框高度
        _formHeiP = $(".ui-send_sms-dialog-form").innerHeight();
        resetDialogPos(_formHei, _formHeiP);
    }
    //倒计时函数
    function timeCountDown(Time, objId) {
        var obj = $(objId);
        var timer = setInterval(function() {
            Time--;
            if (Time == 0) {
                $("#getCode").show();

                $("#second_tip,#getCodeGray").hide();
                clearInterval(timer);
                obj.html(cDownTime);
                //重置弹框高度
                _formHeiP = $(".ui-send_sms-dialog-form").innerHeight();
                resetDialogPos(_formHei, _formHeiP);
            } else {
                obj.html(Time);
            }
        }, 1000);
    }
    //临时存储form的高度
    var tempHei = _formHei;
    //重置弹框位置函数
    function resetDialogPos(norHei, nowHei) {
        if (nowHei == 0) {
            disHei = 0;
            tempHei = norHei;
        } else {
            disHei = parseInt(nowHei) - parseInt(tempHei);
            tempHei = nowHei;
        }
        $("body").css({
            "position": "relative"
        });
        $(".ui-marker-sms").css({
            "height": $(document).innerHeight() + "px",
            "top": 0,
            "left": 0
        });
        $(".ui-send_sms-dialog").css({
            "height": (parseInt($(".ui-send_sms-dialog").outerHeight()) + parseInt(disHei)) + "px"
        });
        _hei = $(".ui-send_sms-dialog").height();
        $(".ui-send_sms-dialog").css({
            "top": ($(window).height() - _hei) / 2 + "px"
        });
    }
}