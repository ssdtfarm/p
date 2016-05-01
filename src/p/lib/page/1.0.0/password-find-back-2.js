define(function(require, exports, module){
        //引入依赖
        var khValidate = require("../../components/khValidate/1.0.0/khValidate");
        /*var dialog     = require("../../components/dialog/1.0.0/dialog");
        var template   = require("../../template/template");*/

        //刷新页面的key
        function refreshKey(str){
            var tar = $("#security");
            tar.val(str[1]);
            tar.attr("name", str[0]);
        }

        //倒计时
        function countDownFn(t, obj1, obj2) {
            var tempT = t;
            obj1.hide();
            obj2.show();
            var timer =  setInterval(function(){
                if(t<=0){
                    clearInterval(timer);
                    obj1.show();
                    obj2.hide();
                }else{
                    t = t - 1;
                    obj2.find('.J_countDown').html(t);
                }
            },1000);
        }

        //显示提示信息函数 ==========================================
        
        function showTip(obj, text, type) {
            switch(type) {
                case 'ok' :
                    obj.siblings('.icon-tip-ok').css('top', 'auto');
                break;
                case 'error' : 

                    obj.addClass('error').siblings('.error-tips').css('top', 'auto').find('.tips-info').html(text);
                break;
            }
            
            //目标input的focus事件
            obj.on("focus", function (event) {
                event.preventDefault();
                $(this).removeClass("error").addClass('focus')
                                            .siblings('.icon-tip-ok').css('top', '-9999px')
                                            .siblings('.error-tips').css('top', '-9999px').find('.tips-info').html('');
            });
        }
        $(document).on('click', function(){
            $('.select-list').css('top', '-9999px');
        });

        //自定义下拉列表
        $('.kh-my-select').each(function() {
            var self = $(this);
            var title = self.find('.select-title ');
            var list = self.find('.select-list');
            var li = list.find('li');

            title.on('click', function(event){
                list.css('top','auto');
                event.stopPropagation();
            });

            li.on('click', function(event){
                var type = $(this).attr('data-value');
                if(type == '1') {
                    $('.J_phoneWrap').show();
                    $('.J_emailWrap').hide();
                }else if(type == '2') {
                    $('.J_emailWrap').show();
                    $('.J_phoneWrap').hide();
                }
                title.html($(this).html());
                list.css('top','-9999px');
                event.stopPropagation();
            });
        });

        $(document).on('focus' , '.J_phoneCode', function(){
            $(this).addClass('focus');
            $(this).siblings('.info-tips').hide();
        });
        $(document).on('blur' , '.J_phoneCode', function(){
            $(this).removeClass('focus');
        });

        //提交手机验证
        $('.form-content').each(function() {
            var self = $(this);

            var J_phoneSubmitBtn = self.find('.J_phoneSubmitBtn');
            var J_phoneCode = self.find('.J_phoneCode');
            var J_getPhoneCode = self.find('.J_getPhoneCode');
            var phoneNum = J_getPhoneCode.attr('data-phone');

            J_phoneSubmitBtn.on('click', function(){
                var val = $.trim(J_phoneCode.val());
                if( val == '') {
                    showTip(J_phoneCode, '请输入验证码', 'error');
                } else {
                    checkPhoneCode(J_phoneCode);
                    //subPhone(phoneNum, J_getPhoneCode.val());
                }
            });
        });

        function subPhone(phoneNum, phoneCode) {
            $.ajax({
                url: '/passport/findpwdtwoByPhone',
                type: 'post',
                dataType: 'json',
                data: {
                    phone: 45454,
                    phoneCode: 454545
                },
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
            
        }
        //发送手机短信
        $('.J_getPhoneCode').on('click', function(){
            var self = $(this);
            var phoneCode = self.siblings('.J_phoneCode');
            var phoneNum = self.attr('data-phone');
            sendPhoneCode(phoneCode, phoneNum);
        });
        var sendCodeClickNum = 0;
        function sendPhoneCode(phoneCode, phoneNum) {
            if(sendCodeClickNum>=3){
                showTip(phoneCode, '您本次发送手机验证码次数已经用完,请刷新页面重试.','error');
                return;
            }else{
                sendCodeClickNum++;
            }
            var ajaxUrl = cdnConfig.apiPath+'/member/sendphonecode';
            countDownFn(60, $(".J_getPhoneCode"), $(".J_countDownWrap"));
            $.ajax({
                url: ajaxUrl,
                data: {
                    "phone":phoneNum,
                    "h": $("#security").val(),
                    "m": $("#security").attr('name'),
                    "n": sendCodeClickNum,
                    "r"  : Math.random()
                },
                dataType: 'jsonp'
            })
            .done(function(res) {
                if(res.status == 'succ') {
                    phoneCode.siblings('.info-tips').css('top','auto');
                    
                    refreshKey(res.pin);
                }
            })
            .fail(function() {
                showTip(phoneCode, '发送失败，请检查网络是否通畅', 'error');
            });
        }

        //验证手机验证码
        function checkPhoneCode(code) {
            var ajaxUrl = cdnConfig.apiPath+'/member/validateiphonecode';
            $.ajax({
                url: ajaxUrl,
                data: {
                    "phonecode" : code.val()
                },
                dataType: 'jsonp'
            })
            .done(function(res) {
                if(res.status == 'succ') {
                    var phoneNum = $('.J_getPhoneCode').attr('data-phone');
                    window.location.href ='http://'+window.location.host+'/passport/findpwdbyphone?phone='+phoneNum;
                } else {
                    showTip(code, '验证码错误，请确认。', 'error');
                }
                
            })
            .fail(function() {
                showTip(code, '发送失败，请检查网络是否通畅', 'error');
            });
        }


        //发送邮件验证
        $('.J_sendMail').on('click', function(){
            //$('.J_before_tips').hide();
            var email = $(this).attr('data-email');
            //$('.send-succ').show();
            sendCheckMail(email);
        });

        $('.send-succ a').on('click', function(){
            var email = $('.J_sendMail').attr('data-email');
            if(/@(\w+)./.test(email)) {
                var type = RegExp.$1;
                switch(type) {
                    case '163' : 
                        window.open('http://www.mail.163.com');
                    break;
                    case 'qq' : 
                        window.open('http://www.mail.qq.com');
                    break;
                    case '189' : 
                        window.open('http://mail.189.cn');
                    break;
                    case '126' : 
                        window.open('http://mail.126.com');
                    break;
                    case 'sina' : 
                        window.open('http://mail.sina.com.cn');
                    break;
                    case 'hotmail' :
                        window.open('http://hotmail.msn.com'); 
                    break;
                    case 'gmail' :
                        window.open('http://gmail.google.com'); 
                    break;
                    case 'soho' :
                        window.open('http://mail.sohu.net'); 
                    break;
                    case '139' :
                        window.open('http://mail.10086.cn/'); 
                    break;
                }
            }

        });
        function sendCheckMail(email) {
            $.ajax({
                url: '/passport/findpwdtwobyemail',
                type: 'post',
                dataType: 'json',
                data: {
                   "email": email
               }
            })
            .done(function(res) {
                if(res.code = 200) {
                    $('.J_before_tips').hide();
                    $('.send-succ').show();
                }
            })
            .fail(function() {
                console.log("error");
            });
            
        }

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



