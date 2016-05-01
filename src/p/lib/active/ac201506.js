define(function(require, exports, module) {
    var jquery = require("../jquery/jquery/1.9.1/jquery");
    window.$ = window.jQuery = $;
    var dialog = require("../components/dialog/1.0.0/dialog");
    var loginDialog = require("../components/loginDialog/1.0.0/loginDialog");
    var template = require("../template/template");
    $("#J_signupBtn").on("click", function() {
        if (chkEnrName() && chkEnrTel()) {
            $.ajax({ 
                url: 'http://sale.kinhom.com/api/signs',
                dataType: "jsonp",
                jsonp: "callback",
                data: { 
                    "name": $('input[name="username"]').val().replace(/\s/g, ""),
                    "mobile": $('input[name="userphone"]').val().replace(/\s/g, ""),
                    "type": "5"
                },
                success: function(res) {    
                    if (res.status == "succ") {
                        var str = "<div><table class=\"signup-tip\"><tr><th><i class=\"icon-smile\"></i></th><td>谢谢，您已成功报名，欢迎参加《中国好声音》歌迷见面会！</td></tr></table></div>";
                        var d = new dialog({
                            title: "提示",
                            content: str,
                            width: 474,
                            height: 110, 
                            fixed: true,
                            button: [{
                                value: "确 定",
                                id: "J_btn",
                                className: "ui-btns-ok",
                                callback: function() {
                                    d.close().remove();
                                    $('input[name="username"]').val("");
                                    $('input[name="userphone"]').val("");
                                }
                            }]
                        }).showModal();
                        d.addEventListener('close', function () {
                            $('input[name="username"]').val("");
                            $('input[name="userphone"]').val("");
                        });
                    } else if (res.status == "fail" && res.error == "1") {
                        showDialog("您好，您已经报名，不需要再次报名。");
                    }
                },
                error: function() {
                    alert("连接错误，请再次尝试");
                }
            });
        }
    });

    function chkEnrName() {
        var dom = $("#J_username");
        var domTip = $(".name-tip");
        var reg = /^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{3,40}$/;
        var val = dom.val();
        if (reg.test(val)) {
            return true;
        } else {
            if (val === "") {
                showTip(domTip, '姓名不能为空');
            } else {
                showTip(domTip, '姓名格式有误，请输入正确的姓名');
            }
            showDialog("姓名格式有误，请输入正确格式。");
            return false;
        }
    };

    function chkEnrTel() {
        var dom = $("#J_userphone");
        var domTip = $(".phone-tip");
        var reg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;//匹配手机
        var regFixed = /^0\d{9,11}$/;//匹配固话（11或12位电话号）
        var val = dom.val();
        if (reg.test(val) || regFixed.test(val)) {
            return true;
        } else {
            if (val === "") {
                showTip(domTip, '手机号码不能为空');
            } else {
                showTip(domTip, '手机号码格式有误，请输入正确的手机号码');
            }
            showDialog("手机号码格式有误，请输入正确格式。");
            return false;
        }
    };

    function showTip(tarDOM, text) {
        var tip = dialog({
            skin: 'min-dialog-tip',
            content: text,
            quickClose: true
        });
        tip.show(tarDOM.get(0));
        if(tarDOM.get(0).className.indexOf("name") != -1){
            $("#J_username").focus();
        } else if(tarDOM.get(0).className.indexOf("phone") != -1){
            $("#J_userphone").focus();
        }
    };

    function showDialog(text) {
        var str = "<div><table class=\"signup-tip\"><tr><th><i class=\"icon-smile\"></i></th><td>"+text+"</td></tr></table></div>";
        var d = new dialog({
            title: "提示",
            content: str,
            width: 474,
            height: 110,
            fixed: true,
            button: [{
                value: "确 定",
                id: "J_btn",
                className: "ui-btns-ok",
                callback: function() {
                    d.close().remove();
                }
            }]
        }).showModal();
    }
});
