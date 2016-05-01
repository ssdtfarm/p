/*===============================*/
/*  注册成功js
  *  @author lijinrong
  *  @date   2015-05-27
/* ==============================*/
//页面js
define(function(require, exports, module) {
    //选择性别交互
    $('.J_sex_select').each(function(index) {
        var self = $(this);
        self.click(function() {
            if (!self.hasClass('cur')) {
                self.addClass('cur')
                    .siblings('.J_sex_select').removeClass('cur')
                    .end()
                    .siblings('input[name="sex"]').val(index + 1);
            }
        })
    });

    //收货人验证dom交互
    $('.J_name_input').focus(function() {
        //设置同一的获取焦点状态
        setFocusStatus($(this));
    }).blur(function() {
        var self = $(this);
        var val = self.val();
        if (val != '') {
            valiUserName(self, val);
        }
    });

    //收货人详细验证dom交互
    $('.J_street_input').focus(function() {
        //设置同一的获取焦点状态
        setFocusStatus($(this));
    }).blur(function() {
        var self = $(this);
        var val = self.val();
        if (val != '') {
            valiStreet(self, val);
        }
    });

    //收货人手机dom交互
    $('.J_phone_input').focus(function() {
        //设置同一的获取焦点状态
        setFocusStatus($(this));
    }).blur(function() {
        var self = $(this);
        var val = self.val();
        if (val != '') {
            valiPhone(self, val);
        }
    });

    //获取省份信息
    $('.J_select_province .title').on('click', function(event) {
        var self = $(this);
        var list = self.siblings('.select-list');
        //设置选择初始状态
        setSelectStatus(self);

        $(this).addClass('cur');
        if (list.html() == '') {
            $.ajax({
                url: cdnConfig.apiPath + "/region/pro",
                type: "get",
                dataType: "jsonp",
                success: function(result) {
                    setAddressData(result, list);
                    list.slideDown('fast');
                },
                error: function(error) {
                    console.log("获取数据失败，请稍后再试!");
                }
            });
        } else {
            if (list.css('display') == 'none') {
                list.slideDown('fast');

            } else {
                list.slideUp('fast');
                $(this).removeClass('cur');
            }
        }
        event.stopPropagation();
    });
    //点击省份列表，设置城市列表
    $(document).on('click', '.J_select_province .select-list li', function(event) {
        var self = $(this),
            parentID = self.attr('data-parent'),
            list = $('.J_select_city .select-list');
        //设置表单提交值
        self.parent().siblings('input[name="province"]').val(parentID);

        self.parent().slideUp('fast')
            .siblings('.title').find('span').html(self.html());

        $.ajax({
            url: cdnConfig.apiPath + '/region/city/' + parentID,
            type: 'get',
            dataType: 'jsonp',
            success: function(result) {
                setAddressData(result, list);
                $('.J_select_city .title span').html('所在城市');
                $('.J_select_area .title span').html('所在区');
            }
        });
    });

    //选择城市信息
    $('.J_select_city .title').on('click', function(event) {
        var self = $(this);
        var list = self.siblings('.select-list');
        setSelectStatus(self);

        if (list.html() != '') {
            $(this).addClass('cur');
            if (list.css('display') == 'none') {
                list.slideDown('fast');
            } else {
                list.slideUp('fast');
                $(this).removeClass('cur');
            }
        }
        event.stopPropagation();
    });
    //点击城市列表，设置地区列表
    $(document).on('click', '.J_select_city .select-list li', function(event) {
        var self = $(this),
            parentID = self.attr('data-parent'),
            list = $('.J_select_area .select-list');
        //设置表单提交值
        self.parent().siblings('input[name="city"]').val(parentID);

        self.parent().slideUp('fast')
            .siblings('.title').find('span').html(self.html());

        $.ajax({
            url: cdnConfig.apiPath + '/region/area/' + parentID,
            type: 'get',
            dataType: 'jsonp',
            success: function(result) {
                setAddressData(result, list);
                $('.J_select_area .title span').html('所在区');
            }
        });
    });

    //选择地区信息
    $('.J_select_area .title').on('click', function(event) {
        var self = $(this);
        var list = self.siblings('.select-list');
        //设置选择初始状态
        setSelectStatus(self);

        if (list.html() != '') {
            $(this).addClass('cur');
            if (list.css('display') == 'none') {
                list.slideDown('fast');

            } else {
                list.slideUp('fast');
                $(this).removeClass('cur');
            }
        }
        event.stopPropagation();
    });
    $(document).on('click', '.J_select_area .select-list li', function(event) {
        var self = $(this);
        var parentID = self.attr('data-parent');
        //设置表单提交值
        self.parent().siblings('input[name="area"]').val(parentID);
        self.parent().slideUp('fast')
            .siblings('.title').find('span').html(self.html());
        if (valiProvince() && valiCity() && valiArea()) {
            showTips($('.selectWrap'), '', 'succ', 20, 460);
        }
    });


    //提交前检查提交信息
    $('.J_sub_btn').on('click', function() {
        var username = $('.J_name_input');
        var street = $('.J_street_input');
        var phone = $('.J_phone_input');
        if (valiUserName(username, username.val()) && valiProvince() && valiCity() && valiArea() && valiStreet(street, street.val()) && valiPhone(phone, phone.val())) {
            $('.J_register_succcess_form').submit();
        }
    });

    //点击页面其他地方收取下拉列表
    $(document).on('click', 'body', function(event) {
            $('.select-list').each(function() {
                $(this).slideUp('fast').siblings('.title').removeClass('cur');
            });
            //event.stopPropagation();
        })
        //选择省份
    function valiProvince() {
        var pro = $('input[name="province"]');
        if (pro.val() == '') {
            pro.parent().parent().addClass('error');
            return false;
        } else {
            return true;
        }
    }
    //选择城市
    function valiCity() {
        var pro = $('input[name="city"]');
        if (pro.val() == '') {
            pro.parent().parent().addClass('error');
            return false;
        } else {
            return true;
        }
    }
    //选择地区
    function valiArea() {
        var pro = $('input[name="area"]');
        if (pro.val() == '') {
            pro.parent().parent().addClass('error');
            return false;
        } else {
            return true;
        }
    }
    //设置同一获取焦点状态
    function setFocusStatus(obj) {
        //重新获得焦点是，取消错误状态和成功状态
        if (obj.hasClass('error')) {
            obj.removeClass('error')
                .parent().find('.error-tips').hide();
        }
        if (obj.hasClass('succ')) {
            obj.removeClass('succ')
                .parent().find('.succ-tips').hide();
        }
    }
    //设置选择初始状态
    function setSelectStatus(obj) {
        //
        obj.attr('onOff', true);
        //重新选择时，取消错误状态
        if (obj.parent().parent().hasClass('error')) {
            obj.parent().parent().removeClass('error');
        }
        //重新选择时，取消成功状态
        $('.selectWrap .succ-tips').hide();
        //重新选择时, 收取各个下拉列表
        $('.select-list').each(function() {
            $(this).slideUp('fast').siblings('.title').removeClass('cur');
        });
    }
    //收货人验证
    function valiUserName(obj, val) {
        if (!checkName(val)) {
            obj.addClass('error');
            showTips(obj.parent(), '收货人姓名为2-12个汉字、英文', 'error', 60);
            return false;
        } else {
            obj.addClass('succ');
            showTips(obj.parent(), '', 'succ', 20, 460);
            return true;
        }
    }
    //详细地址验证
    function valiStreet(obj, val) {
        if (!checkStreet(val)) {
            obj.addClass('error');
            showTips(obj.parent(), '详细地址为2-200个汉字、英文、数字', 'error', 60);
            return false;
        } else {
            obj.addClass('succ');
            showTips(obj.parent(), '', 'succ', 20, 460);
            return true;
        }
    }
    //收货人验证
    function valiPhone(obj, val) {
        if (!checkPhone(val)) {
            obj.addClass('error');
            showTips(obj.parent(), '请输入11位正确的手机号码', 'error', 60);
            return false;
        } else {
            obj.addClass('succ');
            showTips(obj.parent(), '', 'succ', 20, 460);
            return true;
        }
    }

    //显示提示信息
    function showTips(obj, str, type, top, left) {
        //错误提示
        var errorTips = obj.find('.error-tips');
        var succTips = obj.find('.succ-tips');
        var top = top || 0;
        var left = left || 0;

        if (type === 'error') {
            if (errorTips.length) {
                errorTips.show();
            } else {
                errorTips = $('<div class="error-tips" style="top:' + top + 'px; left:' + left + 'px;"><i class="icon-tip-wrong"></i>' + str + '</div>');
                obj.append(errorTips);
            }
        } else if (type === 'succ') {
            if (succTips.length) {
                succTips.show();
            } else {
                succTips = $('<div class="succ-tips" style="top:' + top + 'px; left:' + left + 'px;"><i class="icon-tip-ok"></i>' + str + '</div>');
                obj.append(succTips);
            }
        }
    }

    //验证正则方法
    function checkName(val) { //收货人姓名为2-12个汉字、英文
        var partten = /^[A-Za-z\u4e00-\u9fa5]{2,12}$/;
        return partten.test(val);
    }

    function checkStreet(val) { //详细地址为2-20个汉字、英文、数字;
        var partten = /^[A-Za-z0-9\u4e00-\u9fa5\(\)\（\）\-_\\—#]{2,200}$/;
        return partten.test(val);
    }

    function checkPhone(val) { //手机号码为11位1开头的数字
        var partten = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
        return partten.test(val);
    }

    function setAddressData(data, list) {
        var html = '';
        list.html('');
        for (var i = 0; i < data.length; i++) {
            html += '<li data-parent="' + data[i].region_id + '" data-value="' + data[i].region_id + '" >' + data[i]['region_name'] + '</li>';
        }
        list.append(html);
    }
});
