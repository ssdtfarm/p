define(function(require, exports, module) {
    /*
     *  微信账号与金海马账号绑定
     *  editor: yansiwen
     *  date: 2016/03/14
     */
    var khValidate = require("../../components/khValidate/1.0.0/khValidate");
    
    // 选择切换(tab)
    $('#J_slideBox .hd-item').on('click', function() {
        var self = $(this);
        var idx = self.index();
        self.addClass('active').siblings('.hd-item').removeClass('active');
        $('.JQ_content').eq(idx).addClass('active').siblings('.JQ_content').removeClass('active');
    }).on("mouseover mouseout", function() {
        $(this).toggleClass("on");
    }); 

    /*************************** 手机注册 *******************************/
    // 协议选择
    $('.protocol').on('click', function() {
        var item = $(this).find('.icon');
        item.toggleClass('icon-box-normal');
    });

    var isKhMember = false;         // 手机号码未被注册
    var hasCheckMember = false;     // 手机号码未被检测  
    var hasCheckPsw = false;        // 密码未被检测
    var hasCheckPhoneCode = false;  // 短信验证码未被检测
    var token = "";
    var ajaxPath = {
        checkIsMember: cdnConfig.apiPath + "/member/validatemem",
        sendPhoneCode: cdnConfig.apiPath + "/member/sendphonecode",
        checkPhoneCode: cdnConfig.apiPath + "/member/validateiphonecode",
        registerPath: "/oauth/dobind",
        loginPath: "/oauth/dobind"
    };

    // 事件绑定以及表单验证
    $(".JQ_content").on("keyup", function(event) {
        var target = $(event.target);
        var type = target.attr("id");
        var val = target.val();

        if(type === "J_phone") {
            // 输入框为手机号码输入框
            if(val.length > 1) {
                if(val.length > 11) {
                    target.val(val.substr(0, 11));
                }
            }
        } else if(type === "J_regPsw") {
            // 输入框为密码输入框，根据输入的密码显示密码强度
            showPswLevel(target);
        } else if(type === "J_userName" || type === "J_userPsw") {
            // 输入框为账号/密码
            var parent = target.parent();
            if(val.length > 0) {
                parent.removeClass("error");
            }
        }
    }).on("focusout", function(event) {
        var target = $(event.target);
        var type = target.attr("id");
        var val = target.val();

        if(val === "") { 
            return;
        }
 
        if(type === "J_phone") {
            // 输入框为手机号码
            if(khValidate.chkPhone(val)) {
                // 检测手机号码是否已被注册
                checkIsMember(target, "此手机号已经被注册，请更换其他手机号");
            } else {
                showTips(target, "手机号码格式有误，请输入正确的手机号", "error");
            }
        } else if(type === "J_regPsw") {
            // 输入框为密码
            if(val.length > 20 || val.length < 6) {
                // 密码长度
                target.siblings('.info-tips').hide();
                showTips(target, "密码长度为6-20个字符，且区分大小写", "error");
                return;
            }

            if(!khValidate.chkPass(val)) {
                // 检测密码
                showTips(target, '不能使用特殊字符', 'error');
                return;
            }

            // 通过验证
            showTips(target, "", "ok");
            hasCheckPsw = true;
        } else if(type === "J_regCode") {
            // 输入框为验证码
            if(!khValidate.chkNumber(val, 6)) {
                showTips(target, '请输入6位手机验证码', 'error');
            } else {
                checkPhoneCode(target);
            }
        } else if(type === "J_userName" || type === "J_userPsw") {
            // 输入框为账号/密码
            var parent = target.parent();
            if(val.length > 0) {
                showTips(target, "", "ok");
                parent.removeClass("error");
            }
        }
    }).on("focusin", function(event) {
        var target = $(event.target);
        var type = target.attr("name");
        // 隐藏错误提示信息
        target.removeClass('error').siblings('.error-tips').hide().end().siblings(".icon-tip-ok").hide();
        if(type === "J_regPsw") {
            target.siblings(".info-tips").show();
        }
    });

    //发送手机短信
    $('#J_getPhoneCode').on('click', function() {
        var self = $(this);
        var phone = $('#J_phone');
        var phoneCode = $('#J_regCode');
        var phoneNum = phone.val();
        if (isKhMember) {
            return;
        }
        if (!khValidate.chkPhone(phoneNum)) {
            showTips(phone, '手机号码格式有误，请输入正确的手机号', 'error');
            return;
        }
        sendPhoneCode(phoneCode, phoneNum);  
    });

    // 注册表单提交
    $("#J_reg").on("click", function() {
        var phone = $('#J_phone');
        var pass = $('#J_regPsw');
        var phoneCode = $('#J_regCode');
        var phoneVal = phone.val();
        var passVal = pass.val();
        var phoneCodeVal = phoneCode.val();

        var protocol = $('.protocol .icon').hasClass('icon-box-normal');

        if (phoneVal == '') {
            showTips(phone, '请输入要注册的手机号码', 'error');
            return;
        }
        if (passVal == '') {
            $('.info-tips').hide();
            showTips(pass, '请设置登录密码', 'error');
            return;
        }

        if (phoneCodeVal == '') {
            showTips(phoneCode, '请输入手机验证码', 'error');
            return;
        }

        if (phoneCodeVal == '') {
            showTips(passVal, '请输入图片验证码', 'error');
            return;
        }

        if (protocol) {
            // 如果不选择同意协议
            $('.protocol .error-tips').show();
            return;
        }

        if (hasCheckMember && hasCheckPhoneCode) {
            // $('#J_regForm').submit();
            var data = {};
            data["bind_type"] = "register";
            data["phone"] = phoneVal;
            data["password"] = passVal;     
            data["code"] = phoneCodeVal;
            data["agree"] = 1;
            // var data = $("#J_regForm").serialize();
            $.ajax({
                url: ajaxPath.registerPath,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function(res) {
                    if (res.code == 0) {
                        if(res.url) {
                            window.location.href = res.url;
                        }
                    } else {
                        // showTips(phoneCode, '绑定失败，请重新绑定', "error");
                        if(res.msg) {
                            phoneCode.siblings('.icon-tip-ok').hide();
                            showTips(phoneCode, res.msg, "error");
                        }
                        phoneCode.parent().addClass('error');
                        $('#J_reg').html('立即注册及绑定');
                    }
                },
                fail: function() {}
            });
        }
    });

    // 显示密码强度
    function showPswLevel(target) {
        var level = target.siblings('.level');
        var val = $.trim(target.val());
        var levelCount = 0;
        target.siblings(".info-tips").show();
        if(val.length >20 || val.length < 6) {
           level.hide();
        } else {
           if(/[0-9]/.test(val)) {
               levelCount++;
           }
           if(/[a-z]/.test(val)) {
               levelCount++;
           }
           if(/[A-Z]/.test(val)) {
               levelCount++;
           }
           if(/[-_.]/.test(val)) {
               levelCount++;
           }
           if(levelCount == 1) {
               level.addClass('level1').removeClass('level2 level3').show().find('.level-tips').html('弱');
           }
           if(levelCount == 2) {
               level.addClass('level2').removeClass('level1 level3').show().find('.level-tips').html('中');
           }
           if(levelCount >= 3) {
               level.addClass('level3').removeClass('level1 level2').show().find('.level-tips').html('强');
           }
       }
    }

    //检验查是否是已注册的账号名
    function checkIsMember(user, txt, type) {
        var val = user.val();
        val = val.replace(/\s/g,'');
        $.ajax({
            url: ajaxPath.checkIsMember,
            dataType : "jsonp",
            data : {
                "username" :val,
                "key"  : $("#J_security").val(), 
                "name" : $("#J_security").attr('name')
            },
            success : function(res) {
                if(res.status == 'succ') {
                    //已存在的的用户
                    showTips(user, txt, 'error');
                    isKhMember = true;
                } else { 
                    showTips(user, '', 'ok');
                    isKhMember = false;
                    hasCheckMember = true;
                }
                refreshKey(res.pin);
            }
        });
    }
    
    //倒计时
    function countDownFn(t, obj1, obj2) {
        var tempT = t;
        obj1.css('top', '-9999px');
        obj2.show();
        var timer = setInterval(function() {
            if (t <= 0) {
                clearInterval(timer);
                obj1.css('top', 'auto').html('重新获取验证码');
                obj2.html(tempT + "秒").hide();
            } else {
                t = t - 1;
                obj2.html(t + "秒");
            }
        }, 1000);
    }

    // 发送短信验证码次数
    var sendCodeClickNum = 0;
    function sendPhoneCode(phoneCode, phoneNum) {
        if (sendCodeClickNum >= 3) {
            showTips(phoneCode, '您本次发送手机验证码次数已经用完,请刷新页面重试.', 'error');
            return;
        } else {
            sendCodeClickNum++;
        }
        countDownFn(60, $("#J_getPhoneCode"), $("#J_countDownWrap"));
        $.ajax({
                url: ajaxPath.sendPhoneCode,
                data: {
                    "phone": phoneNum,
                    "h": $("#J_security").val(),
                    "m": $("#J_security").attr('name'),
                    "n": sendCodeClickNum,
                    "r": Math.random()
                },
                dataType: "jsonp"
            })
            .done(function(res) {
                if (res.status == 'succ') {
                    refreshKey(res.pin);
                }
            })
            .fail(function() {
                showTips(phoneCode, '发送失败，请检查网络是否通畅', 'error');
            });
    }

    // 检测手机验证码是否正确 
    function checkPhoneCode(code) {
        $.ajax({
            url: ajaxPath.checkPhoneCode,
            data: {
                "phonecode": code.val()
            },
            dataType: 'jsonp'
        })
        .done(function(res) {
            if (res.status == 'succ') {
                hasCheckPhoneCode = true;
                showTips(code, '', 'ok');
            } else {
                showTips(code, '验证码错误，请确认。', 'error');
            }
        })
        .fail(function() {
            showTip(code, '发送失败，请检查网络是否通畅', 'error');
        });
    }

    //刷新页面的key
    function refreshKey(str){
        var tar = $("#J_security");
        tar.val(str[1]);
        tar.attr("name", str[0]);
    }

    /*************************** 用户登录 *******************************/
    // 登录表单提交
    $("#J_login").on("click", function() {
        var userName = $('#J_userName');
        var userPass = $('#J_userPsw');
        var nameVal = $.trim(userName.val());
        var passVal = $.trim(userPass.val());
        var token = $('#J_loginToken');

        if (nameVal === '') {
            userName.siblings('.icon-tip-ok').hide();
            showTips(userName, '请输入帐户名', "error"); 
            userName.parent().addClass('error');
            return;
        }

        if (passVal == '') {
            userPass.siblings('.icon-tip-ok').hide();
            showTips(userPass, '请输入密码', "error");
            userPass.parent().addClass('error');
            return;
        }

        $('#J_login').html('绑定中...'); 
        
        /*var data = {};
        data["user_name"] = userName.val();
        data["password"] = userPass.val();
        data[token.attr('name')] = token.val();
        data.ref_url = $('input[name="ref_url"]').val();*/
        var data = $("#J_loginForm").serialize();

        $.ajax({
            url: ajaxPath.loginPath,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(res) {
                if (res.code == 0) {
                    if(res.url) {
                        window.location.href = res.url;
                    }
                } else {
                    // showTips(userPass, '帐户名与密码不匹配，请重新输入', "error");
                    if(res.msg) {
                        userPass.siblings('.icon-tip-ok').hide();
                        showTips(userPass, res.msg, "error");
                    }
                    userPass.parent().addClass('error');
                    $('#J_login').html('立即绑定');
                }
            }, 
            fail: function() {}
        });
    });

    //显示提示信息函数 ==========================================
    function showTips(obj, text, type) {
        switch(type) {
            case 'ok':
                obj.siblings('.icon-tip-ok').show();
            break;
            case 'error': 
                obj.addClass('error').siblings('.error-tips').show().find('.tips-info').html(text);
            break;

        }
    }

    // 当页面不足一屏幕是固定页脚在底部
    $(function() {
        var footerHeight = 0,
            footerTop = 0,
            $footer = $(".member-foot");
        positionFooter();

        function positionFooter() {
            //取到div#footer高度 
            footerHeight = $footer.height();
            //div#footer离屏幕顶部的距离 
            footerTop = ($(window).scrollTop() + $(window).height() - footerHeight) + "px";
            //如果页面内容高度小于屏幕高度，div#footer将绝对定位到屏幕底部，否则div#footer保留它的正常静态定位 
            if (($(document.body).height()) < $(window).height()) {
                $footer.css({
                    position: "absolute",
                    marginTop: 0,
                    top: footerTop
                });
                $footer.show();
            } else {
                $footer.css({
                    position: "static"
                });
                $footer.show();
            }
        }
        $(window).scroll(positionFooter).resize(positionFooter);
    });
});