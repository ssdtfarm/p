define(function(require, exports, module) {
    var token = "";
    //加载图片验证码
    loadImgCode();
    //加载图片验证码函数
    function loadImgCode() {
        var randNum = Math.random();
        token = util.getToken(16);
        //获取图片code
        imgURL = cdnConfig.apiPath + '/member/imgcode?type=registercode' + '&v=' + randNum + '&token=' + token;
        $("#J_findImgCode").attr("src", imgURL);
    }

    //刷新图片验证码
    $("#J_refreshCode,#J_findImgCode").on("click", function(event) {
        event.preventDefault();
        //更新图片验证码
        loadImgCode();
    });

    $('.J_imgCodeInput').on('blur', function() {
        var self = $(this);
        var val = $.trim(self.val());

        if (val.length != '') {
            verifyValidateCode(self);
        }
    });

    /**
     *   验证图片验证码函数  =======================================
     */
    function verifyValidateCode(self) {

        var codeVal = $.trim(self.val());
        if (codeVal != "") {

            var val = codeVal.toUpperCase();
            $.ajax({
                url: cdnConfig.apiPath + '/member/getimgcode',
                data: {
                    "token": token
                },
                dataType: 'jsonp',
                success: function(res) {
                    if (res.status == 'succ') {
                        if (res.data.code == val) {
                            hasCheckImgCode = true;
                            $('#token').val(token);
                            showTip(self, '', 'ok');
                        } else {
                            showTip(self, '验证码输入有误，请核对后再输入!', 'error');
                        }
                    } else {
                        hasCheckImgCode = false;
                        showTip(self, '输入的验证码不正确', 'error');
                    }
                }
            });

        } else {
            showTip(self, '请输入验证码', 'error');
        }
    }

    //刷新页面的key
    function refreshKey(str) {
        var tar = $("#security");
        tar.val(str[1]);
        tar.attr("name", str[0]);
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
                obj2.hide();
            } else {
                t = t - 1;
                obj2.find('.J_countDown').html(t);
            }
        }, 1000);
    }

    //显示提示信息函数 ==========================================

    function showTip(obj, text, type) {
        switch (type) {
            case 'ok':
                obj.siblings('.icon-tip-ok').show();
                break;
            case 'error':

                obj.addClass('error').siblings('.error-tips').show().find('.tips-info').html(text);
                break;
        }

        //目标input的focus事件
        obj.on("focus", function(event) {
            event.preventDefault();
            $(this).removeClass("error").siblings('.icon-tip-ok').hide()
                .siblings('.error-tips').hide().find('.tips-info').html('');
        });
    }

    //选择切换
    $('.reg-left .hd-item').hover(function() {
        $(this).addClass('on');
    }, function() {
        $(this).removeClass('on');
    })

    $('.reg-left .hd-item').on('click', function() {
        var self = $(this);
        var idx = self.index();

        self.addClass('active').siblings('.hd-item').removeClass('active');
        $('.J_reg_con').eq(idx).addClass('active').siblings('.J_reg_con').removeClass('active');
    });


    //协议
    $('.protocol').on('click', function() {
        var self = $(this);
        var check = $(this).find('.icon');
        check.toggleClass('icon-box-normal');
        if (!check.hasClass('icon-box-normal')) {
            self.find('.error-tips').hide();
        }
    });

    $('.protocol a').on('click', function(event) {
        event.stopPropagation();
    });

    var isKhMember = false;
    var hasCheckMember = false;
    var hasCheckPhoneCode = false;
    var hasCheckImgCode = false;
    //**************************手机注册******************************//

    $('input[name="phone"]').on('blur', function() {
        var self = $(this);
        var val = $.trim(self.val()).replace(/\s/g, '');

        if (val == '') {
            return;
        } else {
            if (/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(val)) {
                checkIsMember(self, '此手机号已经被注册，请更换其他手机号');
            } else {
                showTip(self, '手机号码格式有误，请输入正确的手机号', 'error');
            }
        }
    });

    $('input[name="phone"]').on('keyup', function() {
        var self = $(this);
        var val = $.trim(self.val());

        if (val.length > 1) {
            self.css('fontSize', '16px');
            if (val.length == 3 || val.length === 8) {
                self.val(val + ' ');
            }

            if (val.length > 13) {
                self.val(val.substr(0, 13));
            }
        } else {
            self.css('fontSize', '14px');
        }
    });
    //检验查是否是已注册的账号名
    function checkIsMember(user, txt, type) {
        var val = user.val();
        val = val.replace(/\s/g, '');
        $.ajax({
            url: cdnConfig.apiPath + '/member/validatemem',
            dataType: "jsonp",
            data: {
                "username": val,
                "key": $("#security").val(),
                "name": $("#security").attr('name')
            },
            success: function(res) {
                if (res.status == 'succ') { //已存在的的用户
                    showTip(user, txt, 'error');
                    isKhMember = true;
                } else {
                    showTip(user, '', 'ok');
                    isKhMember = false;
                    hasCheckMember = true;
                }
                refreshKey(res.pin);
            }
        });
    }

    //发送手机短信
    $('.J_getPhoneCode').on('click', function() {
        var self = $(this);
        var phone = $('input[name="phone"]');
        var phoneCode = $('input[name="phone"]');
        var phoneNum = $.trim(phone.val()).replace(/\s/g, '');
        if (isKhMember) {
            return;
        }
        if (!/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(phoneNum)) {
            showTip(phone, '手机号码格式有误，请输入正确的手机号', 'error');
            return;
        }
        sendPhoneCode(phoneCode, phoneNum);
    });
    var sendCodeClickNum = 0;

    function sendPhoneCode(phoneCode, phoneNum) {
        if (sendCodeClickNum >= 3) {
            showTip(phoneCode, '您本次发送手机验证码次数已经用完,请刷新页面重试.', 'error');
            return;
        } else {
            sendCodeClickNum++;
        }
        countDownFn(60, $(".J_getPhoneCode"), $(".J_countDownWrap"));
        $.ajax({
                url: cdnConfig.apiPath + '/member/sendphonecode',
                data: {
                    "phone": phoneNum,
                    "h": $("#security").val(),
                    "m": $("#security").attr('name'),
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
                showTip(phoneCode, '发送失败，请检查网络是否通畅', 'error');
            });
    }

    //验证手机验证码
    $('input[name="regCode"]').on('blur', function() {
        var self = $(this);
        var val = $.trim($(this).val());

        if (val != '') {
            if (val.length != 6) {
                showTip(self, '请输入6位手机验证码', 'error');
            } else {
                checkPhoneCode(self);
            }
        }

    });

    function checkPhoneCode(code) {
        var ajaxUrl = cdnConfig.apiPath + '/member/validateiphonecode';
        $.ajax({
                url: ajaxUrl,
                data: {
                    "phonecode": code.val()
                },
                dataType: 'jsonp'
            })
            .done(function(res) {
                if (res.status == 'succ') {
                    hasCheckPhoneCode = true;
                    showTip(code, '', 'ok');
                } else {
                    showTip(code, '验证码错误，请确认。', 'error');
                }

            })
            .fail(function() {
                showTip(code, '发送失败，请检查网络是否通畅', 'error');
            });
    }

    $('.J_phone_sub').on('click', function() {
        var phone = $('input[name="phone"]');
        var pass = $('input[name="phonePass"]');
        var phoneCode = $('input[name="regCode"]');
        var phoneVal = $.trim(phone.val());
        var passVal = $.trim(pass.val());
        var phoneCodeVal = $.trim(phoneCode.val());

        var imgCode = $('.J_imgCodeInput');
        var imgCodeVal = $.trim(imgCode.val());

        var protocol = $('.phone-protocol .icon').hasClass('icon-box-normal');

        if (phoneVal == '') {
            showTip(phone, '请输入要注册的手机号码', 'error');
            return;
        }
        if (passVal == '') {
            showTip(pass, '请设置登陆密码', 'error');
            return;
        }

        if (phoneCodeVal == '') {
            showTip(phoneCode, '请输入手机验证码', 'error');
            return;
        }

        if (phoneCodeVal == '') {
            showTip(passVal, '请输入图片验证码', 'error');
            return;
        }

        if (protocol) {
            $('.phone-protocol .error-tips').show();
            return;
        }

        if (hasCheckMember && hasCheckPhoneCode && hasCheckImgCode) {
            $('#J_regPhoneForm').submit();
        }
    });
    //新密码设置
    var checkemailpass = false;
    var checkphonepass = false;
    setPass($('input[name="phonePass"]'));
    setPass($('input[name="emailPass"]'));

    function setPass(obj) {
        obj.on('focus', function() {
            $(this).siblings('.info-tips').show();
        });
        obj.on('blur', function() {
            var self = $(this);
            var val = $.trim(self.val());

            self.siblings('.info-tips').hide();

            if (val.length == 0) {
                return;
            }
            if (val.length > 20 || val.length < 6) {
                showTip(self, '密码长度为6-20个字符，且区分大小写', 'error');
                return;
            }

            if (!/^[a-zA-z0-9-_]{6,20}$/.test(val)) {
                self.siblings('.info-tips').hide();
                showTip(self, '不能使用特殊字符', 'error');
                return;
            }

            showTip(self, '', 'ok');
            checkemailpass = true;
            checkphonepass = true;
        });
        obj.on('keyup', function() {
            var self = $(this);
            var val = $.trim(self.val());
            var level = self.siblings('.level');
            var levelCount = 0;
            if (val.length >= 6) {
                self.siblings('.info-tips').hide();
            } else {
                self.siblings('.info-tips').show();
            }
            if (val.length > 20 || val.length < 6) {
                level.hide();
            } else {
                if (/[0-9]/.test(val)) {
                    levelCount++;
                }
                if (/[a-z]/.test(val)) {
                    levelCount++;
                }
                if (/[A-Z]/.test(val)) {
                    levelCount++;
                }
                if (/[-_.]/.test(val)) {
                    levelCount++;
                }
                if (levelCount == 1) {
                    level.addClass('level1').removeClass('level2 level3').show().find('.level-tips').html('弱');
                }
                if (levelCount == 2) {
                    level.addClass('level2').removeClass('level1 level3').show().find('.level-tips').html('中');
                }
                if (levelCount >= 3) {
                    level.addClass('level3').removeClass('level1 level2').show().find('.level-tips').html('强');
                }
            }
        });
    }


    //**************************邮箱注册******************************//
    $('input[name="email"]').on('focus', function() {
        var self = $(this);
        if (self.siblings('.info-tips').length == 0) {
            var tips = '<div class="info-tips">用户名需为字母、数字、点、减号、下划线组成；</div>';
            self.parent().append(tips);
            self.siblings('.info-tips').show();
        }

    });
    $('input[name="email"]').on('blur', function() {
        var self = $(this);
        var val = $.trim(self.val());
        self.siblings('.info-tips').remove();
        if (val == '') {
            return;
        } else {
            if (/[\u4e00-\u9fa5]/.test(val)) {
                showTip(self, '用户名需为字母、数字、点、减号、下划线组成；', 'error');
                return;
            }
            if (/@/.test(val)) {
                if (/^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+[.]{1}([a-zA-Z0-9_-])+/.test(val)) {
                    checkIsMember(self, '此邮箱已经被注册，请更换其他邮箱', 'error');
                } else {
                    showTip(self, '邮箱地址不正确，请重新输入', 'error');
                }
            } else {
                if (val.length > 20 || val.length < 6) {
                    showTip(self, '用户名长度为6~20个字符', 'error');
                    return;
                }
                if (/[\u2E80-\u9FFF~！#￥%……&*（）？——、<>\/,=\+]+/.test(val)) {
                    showTip(self, '用户名需为字母、数字、点、减号、下划线组成；', 'error');
                } else {
                    if (/^\d+$/.test(val)) {
                        showTip(self, '用户名不支持纯数字注册；（备：防止手机号码被注册）', 'error');
                    } else {
                        checkIsMember(self, '该用户名已被他人注册，请重新输入');
                    }
                    //showTip(self, '用户名注册，则用户名需为字母、数字、点、减号、下划线组成', 'error');
                }
            }
        }
    });

    $('.mail-protocol').on('click', function() {
        var item = self.find('.icon');
        item.toggleClass('.icon-box-normal');
    });
    $('.phone-protocol').on('click', function() {
        var item = self.find('.icon');
        item.toggleClass('.icon-box-normal');
    });

    $('.J_email_sub').on('click', function() {
        var mail = $('input[name="email"]');
        var pass = $('input[name="emailPass"]');
        var protocol = $('.mail-protocol .icon').hasClass('icon-box-normal');
        var mailVal = $.trim(mail.val());
        var passVal = $.trim(pass.val());

        if (mailVal == '') {
            showTip(mail, '请输入邮箱/用户名', 'error');
            return;
        }
        if (passVal == '') {
            showTip(pass, '请设置登陆密码', 'error');
            return;
        }

        if (protocol) {
            $('.mail-protocol .error-tips').show();
            return;
        }

        if (hasCheckMember && checkemailpass) {
            $('#J_regEmail').submit();
        }
    });



    //当页面不足一屏幕是固定页脚在底部
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
