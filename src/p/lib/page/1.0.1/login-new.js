define(function(require, exports, module) {
    /*
     *   @remix Zhang Zhensheng
     *   @date 2015-11-17
     *
     */

    //显示提示信息函数 ==========================================

    function showTip(txt) {
        var msg = $('.login-msg');
        msg.find('span').html(txt);
        msg.show();
    }

    //自动登陆选择
    $('.remember').on('click', function() {
        var self = $(this);
        var check = $(this).find('i');
        check.toggleClass('icon-box-normal');
    });

    //登陆输入框事件绑定
    var loginItem = $('.J_loginItem input');
    loginItem.each(function() {
        var self = $(this);
        var parent = self.parent();
        var clearBtn = self.siblings('.J_clear');
        var mailFill = $('.mail-fill');
        var mailFillLi = mailFill.find('li');
        var nameTxt = mailFill.find('span');


        self.on('focus', function() {
            parent.addClass('focus');
        });

        self.on('blur', function() {
            parent.removeClass('focus');
        });

        self.on('keyup', function(event) {
            var val = $.trim(self.val());

            if (val.length > 0) {
                clearBtn.show();
                parent.removeClass('error');
                $('.login-msg').hide();
            } else {
                clearBtn.hide();
            }

            if (self.hasClass('userName') && /^.+@$/.test(val)) {
                mailFill.show();
                nameTxt.html(val);

                mailFillLi.css('background', 'none');

                if (event.keyCode == 40) {
                    if (this.index == undefined || this.index >= mailFillLi.length - 1) {
                        this.index = 0;
                    } else {
                        this.index++;
                    }
                    mailFillLi.eq(this.index).css('background', '#e8f2f8');
                }

                if (event.keyCode == 38) {
                    if (this.index == undefined || this.index <= 0) {
                        this.index = mailFillLi.length - 1;
                    } else {
                        this.index--;
                    }
                    mailFillLi.eq(this.index).css('background', '#e8f2f8');
                }


                if (event.keyCode == 13) {
                    event.stopPropagation();
                    self.val(mailFillLi.eq(this.index).text());
                    mailFill.hide();
                    this.index = undefined;
                    $('.userPass')[0].focus();
                }
            } else {
                mailFill.hide();
            }

        });



        clearBtn.on('click', function(event) {
            event.stopPropagation();
            self.val('');
            clearBtn.hide();
        });

    });

    $('.mail-fill li').on('click', function() {
        $('.userName').val($(this).text());
        $(this).parent().hide();
    });

    $(document).on('click', function() {
        $('.mail-fill').hide();
    });

    //登陆
    $('.J_login').on('click', function() {
        submitForm();
    });

    //enter提交表单
    $(document).on('keyup', function(event) {
        var key = event.which;

        if (key == "13") {
            submitForm();
        }
    });

    function submitForm() {
        var userName = $('.userName');
        var userPass = $('.userPass');
        var nameVal = $.trim(userName.val());
        var passVal = userPass.val();
        var token = $('#token');

        var data = {};
        data.username = userName.val();
        data.password = userPass.val();
        data[token.attr('name')] = token.val();


        if (nameVal === '' && passVal === '') {
            showTip('请输入帐户名和密码');
            userName.parent().addClass('error');
            userPass.parent().addClass('error');
            return;
        }

        if (nameVal !== '' && passVal == '') {
            showTip('请输入密码');
            userPass.parent().addClass('error');
            return;
        }

        if (nameVal === '' && passVal !== '') {
            showTip('请输入帐户名');
            userName.parent().addClass('error');
            return;
        }

        $('.J_login').html('登录中...');
        var data = {};
        data.username = userName.val();
        data.password = userPass.val();
        data[token.attr('name')] = token.val();
        data.url = $('input[name="url"]').val();
        if ($('input[name="url_link"]')) {
            data.url_link = $('input[name="url_link"]').val();
        };
        data.ref_url = $('input[name="ref_url"]').val();

        $.ajax({
            url: '/passport/index',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(res) {
                if (res.code == 200) {
                    setCookie('kUserNameForLogin', data.username, 1);
                    window.location.href = res.url;
                } else {
                    showTip('帐户名与密码不匹配，请重新输入');
                    userPass.parent().addClass('error');
                    $('.J_login').html('登&nbsp;录');
                    setTimeout(function() {
                        window.location.href = window.location.href;
                    }, 1000);
                    setCookie('kUserNameForLogin', data.username, 1);
                }
            },
            faile: function() {}
        })
    }

    if (getCookie('kUserNameForLogin')) {
        $('.userName').val(getCookie('kUserNameForLogin'));
        $('.userName').siblings('.J_clear').show();
        $('.userPass')[0].focus();
    } else {
        $('.userName')[0].focus();
    }
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


    function setCookie(objName, objValue, objHours) { //添加cookie 
        var str = objName + "=" + escape(objValue);
        if (objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失 
            var date = new Date();
            var ms = objHours * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
        document.cookie = str;
    }

    function getCookie(objName) { //获取指定名称的cookie的值 
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == objName) return unescape(temp[1]);
        }
    }

    function delCookie(name) { //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=a; expires=" + date.toGMTString();
    }
});
