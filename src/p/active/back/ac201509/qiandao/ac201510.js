define(function(require, exports, module) {

    var jquery = require('../jquery/jquery/1.9.1/jquery');
    var dialog = require("../components/dialog/1.0.0/dialog");
    var loginDialog = require("../components/loginDialog/1.0.0/loginDialog");
    var template = require("../template/template");
    var acNum = commonData.piAlias;
    var homeMain = commonData.domain;
    var loginSta = commonData.login;
    var checkSta = commonData.check;
    var contin = commonData.continued;

    $("#J_enrollBtn").click(function() {
        if (loginSta == 1) {
            acDialog.enrollForm();
        } else {
            loginDialog({
                "cdnConfig": cdnConfig,
                "tpl": template,
                "dialog": dialog
            });
        }
    });
    // 判断是否登录
    if (loginSta == 1) {
    	// 判断是否连续签到
    	switch (contin) {
            case 0:
                $(".ac-preheat .price").css("display","none");
                break;            
            case 1:
                $(".ac-preheat .price").css("display","none");
                break;
            case 2:
            	$(".ac-preheat .price").css("display","block");
              	$(".ac-preheat .price").css("background-position","0px 0px");
                break;
            case 3:
            	$(".ac-preheat .price").css("display","block");
              	$(".ac-preheat .price").css("background-position","0px -65px");
                break;
            default:
                break;
    	}
    	// 判断今天是否已经签到
        if (checkSta == 1) {
        	$(".ac-preheat .layer").css("display","block");
        } else if (checkSta == 0) {
            $(".ac-preheat .layer").css("display","none"); 
        }
    } else {
    	$(".ac-preheat .price").css("display","none");
    }
    // 签到弹出框
    $("#J_checkinBtn").on("click", function(event){
        if (loginSta == 1) {
            $.ajax({
                url: 'http://misc.jjcdn.com/p/active/ac201506/test-z.php',
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    checkIn: "ok"
                },
                success: function(res) {
                    var result = res.result;
                    if (result == "1") {
                        var time = res.times;
                        switch (time) {
                            case "0":
                                $(".ac-preheat .layer").css("display","block");
                                break;                            
                            case "1":
                                acDialog.SignSuc("20元现金券");
                                $(".ac-preheat .layer").css("display","block");
                                break;
                            case "2":
                             	acDialog.SignSuc("50元现金券");
                             	$(".ac-preheat .layer").css("display","block");
                                break;
                            case "3":
                             	acDialog.SignSuc("80元现金券");
                             	$(".ac-preheat .layer").css("display","block");
                                break;
                            default:
                                break;
                        }
                    } else if (result == "-1") {
                        $(".ac-preheat .layer").css("display","block"); 
                    }
                },
                error: function() {
                    alert("连接错误，请再次尝试");
                }
            });
        } else {
            loginDialog({
                "cdnConfig": cdnConfig,
                "tpl": template,
                "dialog": dialog
            });
        }    	
    });

    function chkEnrName() {
        var dom = $("#J_enrName");
        var domTip = $("#J_enrNameTip");
        var reg = /^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{2,20}$/;
        var val = dom.val();
        if (reg.test(val)) {
            return true;
        } else {
            if (val === "") {
                showTip(domTip, '称呼不能为空');
            } else {
                showTip(domTip, '称呼格式有误');
            }
            console.log('陈虎错');
            return false;
        }
    };

    function chkEnrTel() {
        var dom = $("#J_enrTel");
        var domTip = $("#J_enrTelTip");
        var reg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
        var val = dom.val();
        if (reg.test(val)) {
            return true;
        } else {
            if (val == "") {
                showTip(domTip, '手机号码不能为空');
            } else {
                showTip(domTip, '手机号码格式有误');
            }
            console.log('号码错');
            return false;
        }
    };

    function showTip(tarDOM, text) {
        tarDOM.html(text);
        $(".enroll-input").focus(function() {
            tarDOM.html("");
        })
    };
    //弹框开始=================================

    var acDialog = new enrollDialog();
    var loading = new dialog({
        fixed: true
            //content : '<p style="text-align:center; font-size: 14px;">登录中...</p>'
    });

    function enrollDialog() {
        this.enrollForm = function() {
            var str = "<div class=\"pre-dialog-content\"><form class=\"enroll-form\"><table class=\"enroll-table\"><tr><th>您的称呼：</th><td><input type=\"text\" class=\"enroll-input\" id=\"J_enrName\"/><p class=\"enroll-tip\" id=\"J_enrNameTip\"></p></td></tr><tr><th>手机号码：</th><td><input type=\"text\" class=\"enroll-input\" id=\"J_enrTel\"/><p class=\"enroll-tip\" id=\"J_enrTelTip\"></p></td></tr></table></form></div>";
            var d = new dialog({
                title: "报名表",
                content: str,
                width: 400,
                height: 110,
                fixed: true,
                button: [{
                    value: "提 交",
                    id: "J_subBtn",
                    className: "",
                    callback: function() {
                        if (chkEnrName() & chkEnrTel()) {
                            $.ajax({
                                url: 'http://misc.jjcdn.com/p/active/ac201506/test.php',
                                dataType: "jsonp",
                                jsonp: "callback",
                                data: {
                                    setOff: "ok"
                                },
                                success: function(res) {
                                    var sta = res.status;
                                    switch (sta) {
                                        case "1":
                                            acDialog.enrollSuc("维尚定做四件套");
                                            break;
                                        case "2":
                                            break;
                                        default:
                                            break;
                                    }
                                },
                                error: function() {
                                    alert("连接错误，请再次尝试");
                                }
                            });
                        } else {
                            return false;
                        }
                    }
                }]
            }).showModal();
        };
        this.enrollSuc = function(txt) {
            var str = "<div class=\"pre-dialog-content\"><table class=\"preheat-state\"><tr><th><i class=\"icon-smile\"></i></th><td>恭喜您已经报名成功!</td></tr></table><p class=\"preheat-text\">活动期间<span>（8.17-8.21）</span><span>购物满2000元</span>可获得<span>" + txt + "</span>哦。活动结束后7天内会为您发货。</p></div>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 474,
                height: 110,
                fixed: true,
                button: [{
                    value: "确 定",
                    id: "J_btn",
                    className: "",
                    callback: function() {
                        d.close().remove();
                        window.location.reload();
                    }
                }],
                onclose: function() {
                    window.location.reload();
                }
            }).showModal();
        };
        this.SignSuc = function(txt) {
            var str = "<div class=\"pre-dialog-content\"><table class=\"preheat-state\"><tr><th><i class=\"icon-smile\"></i></th><td>恭喜您已经签到成功!</td></tr></table><p class=\"preheat-text\">得到一张<span>" + txt + "</span>，活动期间<span>（8.17-8.21）</span>可与其他优惠券叠加使用，结算时请咨询客服。</p></div>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 474,
                height: 110,
                fixed: true,
                button: [{
                    value: "确 定",
                    id: "J_btn",
                    className: "",
                    callback: function() {
                    }
                }],
                onclose: function() {
                }
            }).showModal();
        };
    };

});