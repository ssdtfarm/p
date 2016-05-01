define(function(require, exports, module) {
    /*
     * 找回密码页面3
     * author : ljrong
     * date   : 2015-08-4
     * 
     * remix  : Zhang Zhensheng
     * date   : 2015-11-17
     */
    //加载依赖 
    var khValidate = require('../../components/khValidate/1.0.0/khValidate');

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
            $(this).removeClass("error").addClass('focus')
                .siblings('.icon-tip-ok').hide()
                .siblings('.error-tips').hide().find('.tips-info').html('');
        });
    }

    if ($('input[name="status"]').length) {
        if (!$('input[name="status"]').val()) {
            alert('该邮箱验证连接已失效，请重新验证。');
            return;
        }
    }

    //新密码设置
    $('.info-tips').show();
    var newPassFlag = false;
    var newPassRepFlag = false;
    $('.J_newPass').on('focus', function() {
        $(this).siblings('.info-tips').show();
    });
    $('.J_newPass').on('blur', function() {
        var self = $(this);
        var val = self.val();
        var level = self.siblings('.level');
        // self.siblings('.info-tips').hide();

        $('.J_newPassRep').blur();

        if (val.length == 0) {
            return;
        }

        //此处防止误操作（还没松开键盘就blur）
        if (val.length > 20) {
            self.val(self.val().slice(0,20));
            val = self.val();//此处须重新赋值
        } else if (val.length < 6) {
            self.siblings('.info-tips').hide();
            level.hide();
            showTip(self, '请设置6-20位数字、字母或符号的新密码（不包括空格）', 'error');
            newPassFlag = false;
            return;
        }

        // if (val.length > 20 || val.length < 6) {
        //     self.siblings('.info-tips').hide();
        //     showTip(self, '请设置6-20位数字、字母或符号的新密码（不包括空格）', 'error');
        //     newPassFlag = false;
        //     return;
        // }

        if (!khValidate.chkPassNew(val)) {
            self.siblings('.info-tips').hide();
            showTip(self, '请设置6-20位数字、字母或符号的新密码（不包括空格）', 'error');
            newPassFlag = false;
            return;
        }

        showTip(self, '', 'ok');
        newPassFlag = true;

    });
    $('.J_newPass').on('keyup', function() {
        var self = $(this);
        var val = self.val();
        var level = self.siblings('.level');
        var levelCount = 0;
        // self.siblings('.info-tips').hide();
        // if (val.length >= 6) {
        //     self.siblings('.info-tips').hide();
        // } else {
        //     self.siblings('.info-tips').show();
        // }
        if (val.length > 20 || val.length < 6) {
            // 密码长度<=20
            if (val.length > 20) {
                self.val(val.slice(0, 20));
            };
            level.hide();
        } else {
            // 如果包含汉字与空格则返回
            if (/[\u4E00-\u9FA5\uF900-\uFA2D|\s]/.test(val)) {
                level.hide();
                return;
            }
            if (/[0-9]/.test(val)) {
                levelCount++;
            }
            if (/[a-z]/.test(val)) {
                levelCount++;
            }
            if (/[A-Z]/.test(val)) {
                levelCount++;
            }
            // 非汉字|数字|大小写字母|空格，即符号
            if (/[^(\u4E00-\u9FA5\uF900-\uFA2D|\s|0-9|a-z|A-Z)]/.test(val)) {
                levelCount++;
            }
            // if(/[-_]/.test(val)) {
            //     levelCount++;
            // }
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
    //确认密码
    $('.J_newPassRep').on('blur', function() {
        var self = $(this);
        var J_newPass = $('.J_newPass');
        var val = self.val();
        var newPassVal = J_newPass.val();

        if (val != '') {
            if (val !== newPassVal) {
                self.siblings(".icon-tip-ok").hide();
                showTip(self, '两次输入的密码不一致，请重新输入！', 'error');
                newPassRepFlag = false;
            } else {
                self.removeClass("error").addClass('focus')
                    .siblings('.error-tips').hide().find('.tips-info').html('');
                showTip(self, '', 'ok');
                newPassRepFlag = true;
            }
        }
    });
    //提交
    $('.J_submitBtn').on('click', function() {
        var newPass = $('.J_newPass');
        var newPassRep = $('.J_newPassRep');

        var passVal = newPass.val();
        var passRepVal = newPassRep.val();

        if (passVal == '') {
            $('.info-tips').hide();
            showTip(newPass, '请设置6-20位数字、字母或符号的新密码（不包括空格）', 'error');
            newPassFlag = false;
            return;
        }
        if (passRepVal == '') {
            showTip(newPassRep, '两次输入的密码不一致，请重新输入！', 'error');
            newPassRepFlag = false;
            return;
        }
        $(".newPassRep").blur();
        if (newPassFlag && newPassRepFlag) {
            $('#newPass').submit();
            $(this).unbind();
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
            if (($(document.body).height() + footerHeight) < $(window).height()) {
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
