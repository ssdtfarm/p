define(function(require, exports, module){
    /*
     * 找回密码页面3
     * author : ljrong
     * date   : 2015-08-4
     */

    //显示提示信息函数 ==========================================
    function showTip(obj, text, type) {
        switch(type) {
            case 'ok' :
                obj.siblings('.icon-tip-ok').show();
            break;
            case 'error' : 

                obj.addClass('error').siblings('.error-tips').show().find('.tips-info').html(text);
            break;
        }
        
        //目标input的focus事件
        obj.on("focus", function (event) {
            event.preventDefault();
            $(this).removeClass("error").addClass('focus')
                                        .siblings('.icon-tip-ok').hide()
                                        .siblings('.error-tips').hide().find('.tips-info').html('');
        });
    }

    if($('input[name="status"]').length) {
        if(!$('input[name="status"]').val()) {
            alert('该邮箱验证连接已失效，请重新验证。');
            return;
        }
    }
    
    //新密码设置
    var newPassFlag = false;
    var newPassRepFlag = false;
    $('.J_newPass').on('focus', function(){
        $(this).siblings('.info-tips').show();
    });
    $('.J_newPass').on('blur', function(){
        var self = $(this);
        var val = $.trim(self.val());
        self.siblings('.info-tips').hide();

        if(val.length == 0) {
            return;
        }

        if(val.length >20 || val.length < 6) {
            showTip(self, '密码长度为6-20个字符，且区分大小写', 'error');
            return;
        }

        if(!/^[a-zA-z0-9-_]{6,20}$/.test(val)) {
            self.siblings('.info-tips').hide();
            showTip(self, '不能使用特殊字符', 'error');
            return;
        }

        showTip(self, '', 'ok');
        newPassFlag = true;

    });
    $('.J_newPass').on('keyup', function(){
        var self = $(this);
        var val = $.trim(self.val());
        var level = self.siblings('.level');
        var levelCount = 0;
        self.siblings('.info-tips').hide();

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
            if(/[-_]/.test(val)) {
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
    });
    //确认密码
    $('.J_newPassRep').on('blur', function(){
        var self = $(this);
        var J_newPass = $('.J_newPass');
        var val = $.trim(self.val());
        var newPassVal = $.trim(J_newPass.val());

        if(val != '') {
            if(val !== newPassVal) {
                showTip(self, '您两次输入的密码不一致', 'error');
            }else {
                showTip(self, '', 'ok');
                newPassRepFlag = true;
            }
        }
    });
    //提交
    $('.J_submitBtn').on('click', function(){
        var newPass = $('.J_newPass');
        var newPassRep = $('.J_newPassRep');

        var passVal = $.trim(newPass.val());
        var passRepVal = $.trim(newPassRep.val());

        if(passVal == '') {
            showTip(newPass, '密码长度为6-20个字符，且区分大小写','error');
            return;
        }
        if(passRepVal == '') {
           showTip(newPassRep, '您两次输入的密码不一致','error');
            return; 
        }
        if(newPassFlag && newPassRepFlag) {
            $('#newPass').submit();
        }

    });
    
    //当页面不足一屏幕是固定页脚在底部
    $(function(){
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
                    marginTop:0,
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


