define(function(require, exports, module) {
    /*===============================*/
    /*  注册后完善信息 
     *  @author unknown
     *  @date   
     *  
     *  @remix zhangzhensheng
     *  @date 2015-10-29
    /* ==============================*/
    var khVal = require('../../components/khValidate/1.0.0/khValidate');

    //*******************************省市区设置**************************************************************//

    // 当选择一个下拉框时，其它下拉框隐藏
    $(document).on("click", "body", function(e) {
        e.stopPropagation();
        $(".select-list").css({
            "display": "none"
        });
    });

    $(".select-title").each(function(index, item) {
        var that = $(this);
        that.on("click", function(e) {
            hideOther(index);
        })
    });

    function hideOther(ind) {
        $(".select-title").each(function(index, item) {
            if (index !== ind) {
                $(this).siblings(".select-list").css({
                    "display": "none"
                });
            }
        });
    }

    //获取省份信息
    $('.J_select_province .select-title').on('click', function(event) {
        var self = $(this);
        var list = self.siblings('.select-list');
        //设置选择初始状态


        if (list.html() == '') {
            $.ajax({
                url: cdnConfig.apiPath + "/region/pro",
                type: "get",
                dataType: "jsonp",
                success: function(result) {
                    setAddressData(result, list);
                    list.show();
                },
                error: function(error) {
                    alert("获取数据失败，请稍后再试!");
                }
            });
        } else {
            if (list.css('display') == 'none') {
                list.show();

            } else {
                list.hide();
            }
        }
        event.stopPropagation();
    });
    //点击省份列表，设置城市列表
    $(document).on('click', '.J_select_province .select-list li', function(event) {
        event.preventDefault();
        // console.log("df");
        var self = $(this),
            parentID = self.attr('data-parent'),
            list = $('.J_select_city .select-list');
        //设置表单提交值
        self.parent().siblings('input[name="province"]').val(parentID);

        self.parent().hide()
            .siblings('.select-title').html(self.html());

        $.ajax({
            url: cdnConfig.apiPath + '/region/city/' + parentID,
            type: 'get',
            dataType: 'jsonp',
            success: function(result) {
                setAddressData(result, list);
                $('.J_select_city .select-title').html('所在市');
                $('.J_select_area .select-title').html('所在区');
            }
        });
    });

    //选择城市信息
    $('.J_select_city .select-title').on('click', function(event) {
        var self = $(this);
        var list = self.siblings('.select-list');

        if (list.html() != '') {

            if (list.css('display') == 'none') {
                list.show();
            } else {
                list.hide();
            }
        }
        event.stopPropagation();
    });
    //点击城市列表，设置地区列表
    $(document).on('click', '.J_select_city .select-list li', function(event) {
        event.preventDefault();
        var self = $(this),
            parentID = self.attr('data-parent'),
            list = $('.J_select_area .select-list');
        //设置表单提交值
        self.parent().siblings('input[name="city"]').val(parentID);

        self.parent().hide()
            .siblings('.select-title').html(self.html());

        $.ajax({
            url: cdnConfig.apiPath + '/region/area/' + parentID,
            type: 'get',
            dataType: 'jsonp',
            success: function(result) {
                setAddressData(result, list);
                $('.J_select_area .select-title').html('所在区');
            }
        });
    });

    //选择地区信息
    $('.J_select_area .select-title').on('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        var self = $(this);
        var list = self.siblings('.select-list');

        //设置选择初始状态
        if (list.html() != '') {
            if (list.css('display') == 'none') {
                list.show();

            } else {
                list.hide();
            }
        }
    });
    $(document).on('click', '.J_select_area .select-list li', function(event) {
        var self = $(this);
        var parentID = self.attr('data-parent');
        //设置表单提交值
        self.parent().siblings('input[name="area"]').val(parentID);
        self.parent().hide()
            .siblings('.select-title').html(self.html());

    });
    //设置地区下拉列表
    function setAddressData(data, list) {
        var html = '';
        list.html('');
        for (var i = 0; i < data.length; i++) {
            html += '<li data-parent="' + data[i].region_id + '" data-value="' + data[i].region_id + '" >' + data[i]['region_name'] + '</li>';
        }
        list.append(html);
    }

    //性别选择
    $('.gender-select').each(function() {
        var self = $(this);
        var check = self.find('i');
        var genderInput = $('input[name="gender"]');
        self.on('click', function() {
            check.addClass('icon-radio-on');
            self.siblings('.gender-select').find('i').removeClass('icon-radio-on');
            genderInput.val(self.attr('data-value'));
        });
    });

    //爱好选择
    $('.favors-select').each(function() {
        var self = $(this);
        var check = self.find('i');
        var favorsInput = $('input[name="favors"]');
        self.on('click', function() {
            check.toggleClass('icon-box-checked');
            favorsInput.val(setFavors());
        });

    });
    //设置爱好提交值
    function setFavors() {
        var favors = $('.favors-select i');
        var rs = [];
        var i = 0;
        var len = favors.length;

        for (; i < len; i++) {
            if ($(favors[i]).hasClass('icon-box-checked')) {
                rs.push($(favors[i]).parent().attr('data-value'));
            }
        }
        return rs.toString();
    }

    /*
     * 初始化年、月、日 ==============================================
     */
    // 修改页面样式
    $(".register-success-form .kh-form-wrap:eq(5)").addClass("birthday");
    $(".register-success-form .kh-form-wrap:eq(1)").addClass("required");
    if ($(".phone-item").css("display") != "none" && $(".phone-item").css("display") != undefined) {
        $(".register-success-form .kh-form-wrap:eq(7)").addClass("required");
    };
    if ($(".email-item").css("display") != "none" && $(".email-item").css("display") != undefined) {
        $(".register-success-form .kh-form-wrap:eq(7)").addClass("required");
    };

    //获取年份信息
    $('.J_select_year .select-title').on('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        var self = $(this);
        var list = self.siblings('.select-list');

        //设置选择初始状态
        var curYear = new Date().getFullYear();
        var yearHtml = '';
        for (var i = 0; i <= 100; i++) {
            var value = parseInt(curYear - 100 + i);
            yearHtml += '<li><a href="javascript:void(0);" data-value="' + value + '">' + value + '</a></li>';
        }
        list.append(yearHtml);

        if (list.html() != "") {
            if (list.css('display') == 'none') {
                list.show();
            } else {
                list.hide();
            }
        };

    });
    // 点击年份列表，设置月份列表
    $(document).on('click', '.J_select_year .select-list li', function(event) {

        var self = $(this),
            parentID = self.find("a").attr('data-value');

        //设置表单提交值
        self.parent().siblings('input[name="year"]').val(parentID);
        self.parent().hide().siblings('.select-title').html(self.html());

        var list = $('.J_select_month .select-list');
        var monthHtml = '';
        for (var i = 0; i < 12; i++) {
            var val = i + 1;
            monthHtml += '<li><a href="javascript:void(0);" data-value="' + val + '">' + val + '</a></li>';
        }
        list.append(monthHtml);

    });

    //选择月份信息
    $('.J_select_month .select-title').on('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        var self = $(this);
        var list = self.siblings('.select-list');

        if (list.html() != "") {
            if (list.css('display') == 'none') {
                list.show();
            } else {
                list.hide();
            }
        };

    });
    var bFlag = false;
    //点击月份列表，设置日期列表
    $(document).on('click', '.J_select_month .select-list li', function(event) {
        var self = $(this),
            parentID = self.find("a").attr('data-value'),
            list = $('.J_select_day .select-list');
        //设置表单提交值
        self.parent().siblings('input[name="month"]').val(parentID);

        self.parent().hide().siblings('.select-title').html(self.html());

        var num = parseInt(self.text());

        if (!bFlag) {
            var monthHtml = '';
            for (var i = 0; i < 31; i++) {
                var value = i + 1;
                monthHtml += '<li><a href="javascript:void(0);" data-value="' + value + '">' + value + '</a></li>';
            }
            list.append(monthHtml);

            bFlag = true;
        }
        switch (num) {
            case 1:
                setLargeMonth();
                break;
            case 2:
                setSpecialMonth();
                break;
            case 3:
                setLargeMonth();
                break;
            case 4:
                setSmallMonth();
                break;
            case 5:
                setLargeMonth();
                break;
            case 6:
                setSmallMonth();
                break;
            case 7:
                setLargeMonth();
                break;
            case 8:
                setLargeMonth();
                break;
            case 9:
                setSmallMonth();
                break;
            case 10:
                setLargeMonth();
                break;
            case 11:
                setSmallMonth();
                break;
            case 12:
                setLargeMonth();
                break;
            default:
                break;
        }
    });
    //设置大月份
    function setLargeMonth() {
        $("#J_birthDay li").each(function() {
            $(this).show();
        })
    }
    //设置小月份
    function setSmallMonth() {
        $("#J_birthDay li").each(function(index) {
            if (index == 30) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    }
    //设置2月
    function setSpecialMonth() {
        var len = 28; //二月的天数
        var dayHtml = '';
        // 扩展Date对象判断当前年份是否是闰年
        Date.prototype.isLeapYear = function() {
            return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)));
        }
        var year = $("input[name='year']").val();
        var curDate = new Date(year, 0, 1);
        //设置二月天数
        if (curDate.isLeapYear()) {
            len = 29;
        }

        $("#J_birthDay li").each(function(index) {
            if (index >= len) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    }

    //选择日期信息
    $('.J_select_day .select-title').on('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        var self = $(this);
        var list = self.siblings('.select-list');
        //设置选择初始状态
        if (list.html() != "") {
            if (list.css('display') == 'none') {
                list.show();
            } else {
                list.hide();
            }
        };

    });
    $(document).on('click', '.J_select_day .select-list li', function(event) {
        var self = $(this);
        var parentID = self.find("a").attr('data-value');
        //设置表单提交值
        self.parent().siblings('input[name="day"]').val(parentID);
        self.parent().hide().siblings('.select-title').html(self.html());

    });

    //设置表单提示状态
    var canSubmit = false;
    var hasValCode = false;

    //获取邮箱验证码
    var emailLock = false;
    var mailCodeFlag = false;
    $('.J_getMailcode').on('click', function() {
        var email = $('input[name="email"]');
        var val = $.trim(email.val());
        if (val == '') {
            showTip(email, '请输入邮箱地址', 'error');
        } else {
            if (!khVal.chkEmail(val)) {
                showTip(email, '您输入的邮箱格式不正确，请重新输入', 'error');
            } else {
                hasValCode = false;
                $('.J_subBtn').addClass('not');
                sendEmailCode(val);
            }
        }
    });

    //发送email
    function sendEmailCode(val) {
        if (emailLock) {
            return;
        }

        $.ajax({
            url: cdnConfig.apiPath + "/member/sendemailcode",
            dataType: "jsonp",
            data: {
                "email": val
            },
            success: function(res) {
                if (res.status == "succ") {
                    emailLock = true;
                    mailCodeFlag = true;
                    // $('.mail-link').show();//显示进入邮箱的链接
                    $('.emailCode').show();
                    $('.J_register_succcess_form .kh-form-wrap:eq(8)').addClass("required-code");
                }
            }
        });
    }

    //验证邮箱验证码
    $('input[name="emailCode"]').on('blur', function() {
        if (!mailCodeFlag) {
            return;
        }
        var self = $(this);
        var val = $.trim(self.val());
        var email = $('input[name="email"]').val();

        if (val == '') {
            showTip(self, '请输入邮箱验证码', 'error');
        } else {
            $.ajax({
                url: cdnConfig.apiPath + "/member/validateemailcode",
                dataType: "jsonp",
                data: {
                    "email": email,
                    "emailcode": val
                },
                success: function(res) {
                    if (res.status == "succ") {
                        $('.J_subBtn').removeClass('not');
                        showTip(self, '', 'ok');
                        hasValCode = true;
                        setCanSub();
                    } else {
                        $('.J_subBtn').addClass('not');
                        showTip(self, '验证码错误', 'error');
                        hasValCode = false;
                        setContSub();
                    }
                },
                error: function() {}
            });
        }
    });


    //获取手机验证码
    var phoneLock = false;
    var phoneCodeFlag = false;
    var sendCodeClickNum = 0;
    $('.J_getPhonecode').on('click', function() {
        var phone = $('input[name="phone"]');
        var val = $.trim(phone.val());

        if (val == '') {
            showTip(phone, '请输入手机号码', 'error');
        } else {
            if (!khVal.chkPhone(val)) {
                showTip(phone, '您输入的手机号码格式不正确，请重新输入', 'error');
            } else {
                hasValCode = false;
                $('.J_subBtn').addClass('not');
                sendPhoneCode(phone, val);
            }
        }
    });

    //发送手机验证码
    function sendPhoneCode(phone, val) {
        if (phoneLock) {
            return;
        }

        if (sendCodeClickNum >= 3) {
            showTip(phone, '您本次发送手机验证码次数已经用完,请刷新页面重试.', 'error');
            return;
        } else {
            sendCodeClickNum++;
        }
        countDownFn(60, $(".J_getPhoneCode"), $(".J_countDownWrap"));
        $.ajax({
            url: cdnConfig.apiPath + '/member/sendphonecode',
            data: {
                "phone": val,
                "h": $("#security").val(),
                "m": $("#security").attr('name'),
                "n": sendCodeClickNum,
                "r": Math.random()
            },
            dataType: 'jsonp',
            success: function(res) {
                if (res.status == "succ") {
                    phoneCodeFlag = true;
                    $('.phoneCode').show();
                    $('.J_register_succcess_form .kh-form-wrap:eq(8)').addClass("required-code");
                } 
                refreshKey(res.pin);
            }
        });
    }

    //验证手机验证码
    $('input[name="phoneCode"]').on('blur', function() {
        if (!phoneCodeFlag) {
            return;
        }
        var self = $(this);
        var val = $.trim(self.val());

        if (val.length != 6) {
            showTip(self, '请输入6位手机验证码', 'error');
            hasValCode = false;
        } else {
            $.ajax({
                url: cdnConfig.apiPath + "/member/validateiphonecode",
                dataType: "jsonp",
                data: {
                    "phonecode": val
                },
                success: function(res) {
                    if (res.status == "succ") {
                        $('.J_subBtn').removeClass('not');
                        showTip(self, '', 'ok');
                        hasValCode = true;
                        needStatus();
                    } else {
                        $('.J_subBtn').addClass('not');
                        showTip(self, '验证码错误', 'error');
                        hasValCode = false;
                        setContSub();
                    }
                },
                error: function() {}
            });
        }
    });
    //设置提交转态
    $('.J_need').each(function() {
        var self = $(this);
        self.on('blur', function() {
            needStatus();
        });
    });
    $('.phoneCode').on('blur', function() {
        needStatus();
    });
    $('.mailCode').on('blur', function() {
        needStatus();
    });

    function needStatus() {
        var needs = $('.J_need');
        var i = 0;
        var len = needs.length;
        var needFlag = false;
        for (; i < len; i++) {
            if ($(needs[i]).val() != '') {
                needFlag = true;
                break;
            }
        }
        if ($.trim($('input[name="userName"]').val()) == "") {
            needFlag = false;
        }

        if (needFlag && hasValCode) {
            setCanSub();
        } else {
            canSubmit = false;
            setContSub();
        }
    }

    function setCanSub() {
        canSubmit = true;
        $('.J_subBtn').removeClass('not');
    }

    function setContSub() {
        canSubmit = false;
        $('.J_subBtn').addClass('not');
    }

    //提交表单
    $('.J_subBtn').on('click', function() {
        if (!canSubmit) {
            return;
        }
        if (!mailCodeFlag || !phoneCodeFlag) {
            if (!hasValCode) {
                // var codeInput = $('.codeInput');
                // showTip(codeInput, '请输入验证码', 'error');
                return;
            }
            $('.J_register_succcess_form').submit();
        }

    });

    //显示提示信
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

    //倒计时
    function countDownFn(t, obj1, obj2) {
        var tempT = t;
        obj1.hide();
        obj2.show();
        var timer = setInterval(function() {
            if (t <= 0) {
                clearInterval(timer);
                obj1.show();
                obj2.hide().find('.J_countDown').html(t);
            } else {
                t = t - 1;
                obj2.find('.J_countDown').html(t);
            }
        }, 1000);
    }

    //刷新页面的key
    function refreshKey(str) {
        var tar = $("#security");
        tar.val(str[1]);
        tar.attr("name", str[0]);
    }

    //
});
