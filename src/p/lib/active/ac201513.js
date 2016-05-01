define(function(require, exports, module) {

    // 按需加载
    var jquery = require("../jquery/jquery/1.9.1/jquery"); 
    window.$ = window.jQuery = $;
    var dialog = require("../components/dialog/1.0.0/dialog");

    // 弹框“在线提交”
    $(function(){

        $("#J_onlineSubmit").on("click", function() {
            var str = '<div><ul class="submit-list">';
            str += '<li><label for="J_username" class="future-label">姓名：</label><input type="text" name="username" id="J_username" class="future-input future-username" maxlength="40" /><span class="name-tip"></span></li>';
            str += '<li><label for="J_userphone" class="future-label">手机：</label><input type="text" name="userphone" id="J_userphone" class="future-input future-userphone" maxlength="12" /><span class="phone-tip"></span></li>';
            str += '<li><label for="J_slogan" class="future-label">口号：</label><input type="text" name="slogan" id="J_slogan" class="future-input future-slogan" maxlength="40" /><span class="slogan-tip"></span></li>';
            str += '<li><label for="J_meaning" class="future-label">解释：</label><input type="text" name="meaning" id="J_meaning" class="future-input future-meaning" maxlength="40" /><span class="meaning-tip"></span></li>';
            str += "</ul></div>";
            var d = new dialog({
                title: "在线提交",
                content: str,
                width: 474,
                height: 200,
                fixed: true,
                button: [{
                    value: "提 交",
                    id: "J_submitBtn",
                    className: "ui-btns-ok",
                    callback: function() {
                        onlineSubmit(d);
                        return false;
                    }
                }]
            }).showModal();
        });

    });
    // 在线提交
    function onlineSubmit(dialog) {
        if (chkUserName() && chkUserPhone() && chkSlogan() && chkMeaning()) {
            $.ajax({
                url: 'http://sale.kinhom.com/api/signs',
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    "name": $('input[name="username"]').val().replace(/\s/g, ""),
                    "mobile": $('input[name="userphone"]').val().replace(/\s/g, ""),
                    "email": $('input[name="slogan"]').val().replace(/\s/g, ""),
                    "address": $('input[name="meaning"]').val().replace(/\s/g, ""),
                    "type": "6"
                },
                success: function(res) {
                    if (res.status == "succ") {
                    	dialog.remove();
                    	showDialog("提交成功");
                    } else if (res.status == "fail") {
                    	dialog.remove();
                    	showDialog("已经提交过，请勿重复提交");
                    }
                },
                error: function() {
                    alert("连接错误，请再次尝试");
                }
            });
        }
    }

    // 验证姓名
    function chkUserName() {
        var dom = $("#J_username");
        var reg = /^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{1,40}$/;
        var val = $.trim(dom.val());
        if (reg.test(val)) {
            return true;
        } else {
            if (val === "") {
                showTip(dom, '姓名不能为空');
            } else {
                showTip(dom, '姓名只能包含文字、数字、字母和下划线');
            }
            return false;
        }
    }

    // 验证手机
    function chkUserPhone() {
        var dom = $("#J_userphone");
        var reg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/; //匹配手机
        var val = $.trim(dom.val());
        if (reg.test(val)) {
            return true;
        } else {
            if (val === "") {
                showTip(dom, '手机号码不能为空');
            } else {
                showTip(dom, '手机号码格式有误，请输入正确的手机号码');
            }
            return false;
        }
    }
    // 验证口号
    function chkSlogan() {
        var dom = $("#J_slogan");
        var reg = /^[\u2E80-\u9FFF|0-9|a-zA-Z|_|。|，|、|；|：|？|！|（|）|……|“|”|‘|’|.|,|:|;|?|!|(|)|"|']{1,40}$/;
        var val = $.trim(dom.val());
        if (reg.test(val)) {
            return true;
        } else {
            if (val === "") {
                showTip(dom, '口号不能为空');
            } else {
                showTip(dom, '口号只能包含文字、数字、字母和常用标点');
            }
            return false;
        }
    }
    // 验证解释    
    function chkMeaning() {
        var dom = $("#J_meaning");
        var val = $.trim(dom.val());
        if (val === "") {
            showTip(dom, '口号解释不能为空');
            return false;
        }
        return true;
    }
    // 显示错误Tip
    function showTip(tarDOM, text) {
        var tip = dialog({
            skin: 'min-dialog-tip',
            content: text,
            quickClose: true
        });
        tip.show(tarDOM.get(0));
        if (tarDOM.get(0).className.indexOf("name") != -1) {
            $("#J_username").focus();
        } else if (tarDOM.get(0).className.indexOf("phone") != -1) {
            $("#J_userphone").focus();
        }
    }
	// 显示弹窗
    function showDialog(text) {
        var str = "<div><table class=\"signup-tip\"><tr><th><i class=\"icon-smile\"></i></th><td>" + text + "</td></tr></table></div>";
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
