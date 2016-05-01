define(function(require, exports, module) {

    /* 按需加载js */
    var slider = require('../../components/slider/1.0.0/slider');
    var khVal        = require('../../components/khValidate/1.0.0/khValidate');
    var dialog       = require('../../components/dialog/1.0.0/dialog');
    // var template = require('../../template/template');

    /*
     * 按需加载对应css
     * 这里首先让右边加载完毕，然后再加载左边菜单
     */
        document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;
    /* 按需加载js */
        $("#J_historySlider").slide({
            titCell: ".hd ul",
            mainCell: ".bd ul",
            autoPage: true,
            autoPlay: true,
            effect: "left",
            vis: 3
        });

        $(function(){
            $("#J_walletBalance").remove();
        });
        /*$("#J_walletBalance").on("click", function(event) {
            var html = template('wallet/tplOneWallet');
            var d = new dialog({
                title: '提示',
                content: html,
                width: 550,
                height: 220,
                fixed: true,
                button: [{
                    value: "立即绑定",
                    className: 'ui-btns-orange bindings-wallet-btn',
                    callback: function() {
                        var phoneNum = $("input[name=phone]");
                        var passW = $("input[name=password]");
                        var regYzm = $("input[name=phonecode]");
                        var regYzmRes = $("input[name=gotcode]");
                        var dealAgree = $("#J_dealAgree");
                        if (verifyphone(phoneNum)  && verifyYzm(regYzm) ) {
                            $.ajax({
                                url: cdnConfig.apiPath + "/member/validateiphonecode",
                                dataType: "jsonp",
                                data: {
                                    "phonecode": regYzm.val()
                                },
                                success: function(res) {
                                    if (res.status == "succ") {
                                        if (isDealAgree(dealAgree)) {
                                            $.ajax({
                                                url: cdnConfig.apiPath + "/member/registerwallet",
                                                dataType: "jsonp",
                                                type: "POST",
                                                data: {
                                                    "phone": phoneNum.val()
                                                },
                                                success: function(res) {
                                                    if (res.status == "succ") {
                                                        d.remove();
                                                        var html = "<p style=\"text-align:center; padding-top:20px;\"><br><i class=\"icon-face-smile-orange mr-10\"></i>注册金海马-壹钱包成功。</p>";
                                                        var d3 = new dialog({
                                                            title: '提示',
                                                            content: html,
                                                            width: 400,
                                                            height: 150,
                                                            fixed: true,
                                                            button: [{
                                                                value: "确定",
                                                                className: 'ui-btns-orange',
                                                                callback: function() {
                                                                    window.location.reload();
                                                                }
                                                            }]
                                                        }).showModal();
                                                    }else{
                                                        var message = res.data.msg;
                                                        d.remove();
                                                        var html = "<p style=\"text-align:center; padding-top:20px;\"><br><i class=\"icon-face-frown-blue mr-10\"></i>"+message+"</p>";
                                                        var d3 = new dialog({
                                                            title: '提示',
                                                            content: html,
                                                            width: 400,
                                                            height: 150,
                                                            fixed: true,
                                                            button: [{
                                                                value: "确定",
                                                                className: 'ui-btns-orange',
                                                                callback: function() {
                                                                    window.location.reload();
                                                                }
                                                            }]
                                                        }).showModal();
                                                    }
                                                },
                                                error: function() {
                                                    alert('error');
                                                }
                                            });
                                        }
                                    }else{
                                        formTipShow(regYzm, "验证码错误或者过期，请重新尝试获取");
                                        return false;
                                    }
                                },
                                error: function() {
                                    formTipShow(regYzm, "连接错误，请再次尝试");
                                }
                            });
                        }
                        return false;
                    }

                }],
            }).showModal();
        });*/
        /*获取验证码*/
        $(document).on('click','#J_getPhoneYzm', function(event) {
            var phoneNum = $("input[name=phone]");
            var regYzm = $("input[name=phonecode]");
            var regYzmRes = $("input[name=gotcode]");
            if (verifyphone(phoneNum)) {
                $("#J_getPhoneYzm").hide();
                var btnMSG = "<a id=\"J_btnUnabled\" class=\"btn-190X30-unable ml-5\"><span id=\"J_countDown\">60</span>秒</a>";
                regYzm.parent().append(btnMSG);
                subTime("#J_countDown", {
                    num: 60,
                });

                $.ajax({
                    url: cdnConfig.apiPath + "/member/sendphonecode",
                    dataType: "jsonp",
                    data: {
                        "phone": phoneNum.val(),
                        "type": 4
                    },
                    success: function(res) {
                        if (res.status == "succ") {

                        }
                    },
                    error: function() {
                        formTipShow(regYzm, "连接错误，请再次尝试");
                    }
                });
            }
            //return false;
        });

        /*协议的勾选*/
        $(document).on('click','#J_dealAgree', function(event) {
            $(this).toggleClass("icon-box-checked");
        });


        function verifyphone(objName) {
            var val = $.trim(objName.val());
            if (!val == "") {
                if (khVal.chkPhone(val)) {
                    return true;
                } else {
                    formTipShow(objName, "手机号码格式错误，请输入由11位数字组成的手机号码");
                    return false;
                }
            } else {
                formTipShow(objName, "手机号码不能为空");
                return false;
            }
        };

        /*function verifyPassWord(objName) {
         var val = $.trim(objName.val());
         if (!val == "") {
         if (khVal.chkPass(val)) {
         return true;
         } else {
         formTipShow(objName, "密码为6-20个字符，允许字母（区分大小写）、数字、符号");
         return false;
         }
         } else {
         formTipShow(objName, "密码不能为空");
         return false;
         }
         };*/

        function verifyYzm(objName) {
            var val = $.trim(objName.val());
            if (!val == "") {
                if (val.length == 6 && !isNaN(val)) {
                    return true;
                } else {
                    formTipShow(objName, "验证码长度为6位");
                    return false;
                }
            } else {
                formTipShow(objName, "验证码不能为空");
                return false;
            }
        };

        function isDealAgree(dealAgree) {
            if (dealAgree.hasClass("icon-box-checked")) {
                return true;
            } else {
                var conHt5ml = "<p><br></p><p class=\"tc\">请同意并勾选我们的服务协议，以便我们能为您服务</p>";
                var d = new dialog({
                    title: '提示',
                    content: conHt5ml,
                    width: 400,
                    height: 55,
                    fixed: true,
                    button: [{
                        value: "确定",
                        className: 'ui-btns-orange',
                        callback: function() {
                            d.remove();
                        }
                    }]
                }).showModal();
            }
            return false;
        };
        /*获取验证码*/
        //$(document).on("click", "#J_getPhoneYzm", function(event) {

        /*
         *倒计时
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
                    $("#J_getPhoneYzm").html("重新获取验证码").show();
                    obj.html(this.num);
                } else {
                    str = str - 1;
                    obj.html(str);
                }
            }, 1000)
        };
        /*
         * 显示提示
         * @param {objName}  提示框内容目标容器name值，已经使用变量暴露置顶
         * @param {str} 提示文字
         * demo:   formTipShow(paw, "密码输入错误");
         */

        function formTipShow(objName, str) {
            var obj = objName;
            obj.addClass("error");
            var text = "<i class=\"icon-tip-wrong\"></i>" + "&nbsp;<span>" + str + "</span>";
            obj.parent().find(".JQ_tip").html(text);
            obj.parent().find(".icon-tip-ok").remove();
            //如果聚焦，去除内容和样式
            obj.on("focus", function() {
                $(this).removeClass("error");
                $(".JQ_tip").html("");
            });
        };
        /*
         * 显示正确提示
         * @param {objName}  提示框内容目标容器name值，已经使用变量暴露置顶
         * demo:   formTipRightShow(psw);
         */
        function formTipRightShow(objName) {
            var obj = objName;
            var text = "<i class=\"icon-tip-ok\"></i>"
            obj.parent().append(text);
        };
    //});

});