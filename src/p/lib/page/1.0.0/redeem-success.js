
define(function(require, exports, module){

    /* 按需加载js */
    var dialog = require("../../components/dialog/1.0.0/dialog");
    var khVal = require("../../components/khValidate/1.0.0/khValidate");

        $('.J_send_other').on('click', function(){
            $(this).addClass('disable');
            $('.J_other_phone_num').val('');
            $('.J_input_wrap').show();
        });
        /*发送信息至其他手机号*/
        $(document).on('click', '.J_redeem_send_btn', function(e){
            e.preventDefault();
            var phoneNum = $('.J_other_phone_num');
            var cid = $('#cid').val();
            console.log(cid);
            if(validatePhone(phoneNum)){
                $.ajax({
                    url : "http://cart.kinhom.com/sendother",
                    dataType : "jsonp",
                    data : {
                        "cid" : cid,
                        "phone" : phoneNum.val()
                    },
                    success: function(result){
                        if(result.status == 'succ'){
                            $('.redeem-send-wrap').hide();
                            $('.J_send_other').removeClass('disable');
                            $('.J_redeem_phone_num').html(phoneNum.val());

                            //发送优惠券信息
                            var d = new dialog({
                                content:"发送成功!"
                            }).showModal();

                            setTimeout(function(){
                                d.close().remove();
                            },2300);
                        }
                    }
                });


            }else{
                console.log('error')
            }
        });

        /*获取手机验证码*/
        $(document).on('click', '.J_get_code', function(e){
            e.preventDefault();
            var phoneNum = $('.J_redeem_reg_phone');
            if(validatePhone(phoneNum)){
                var code = $('.J_code_input');
                $(this).hide();
                $('#J_btnUnabled').css('display','inline-block');
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
                            //发送优惠券到手机
                        }
                    },
                    error: function() {
                        formTipShow(regYzm, "连接错误，请再次尝试");
                    }
                });
            }
        });

        /*验证手机验证码*/
        $(document).on('click', '.J_redeem_reg', function(e){
            e.preventDefault();
            var phoneNum = $('.J_redeem_reg_phone');
            var code = $('.J_code_input');
            var cid = $('#cid').val();
            if(validatePhone(phoneNum) && validateCode(code)){
                $.ajax({
                    url: cdnConfig.apiPath + "/member/validateiphonecode",
                    dataType: "jsonp",
                    data: {
                        "phonecode": code.val()
                    },
                    success: function(res) {
                        if(res.status == 'succ'){
                            $.ajax({
                                url : "http://cart.kinhom.com/bindphone",
                                dataType : "jsonp",
                                data : {
                                    "cid" : cid,
                                    "phone" : phoneNum.val()
                                },
                                success: function(result){
                                    if(result.status == 'succ'){
                                        $('.redeem-send-code-succ').show();
                                        $('.J_redeem_reg_wrap').hide();
                                        $('.J_redeem_phone_num').html(phoneNum.val());
                                    }
                                }
                            });

                        }else{
                            showCodeTips(code, "验证码错误!");
                        }
                    },
                    error: function() {
                        formTipShow(regYzm, "连接错误，请再次尝试");
                    }
                });
            }else{
                console.log('error')
            }
        });


        function validatePhone(obj) {
            var val = $.trim(obj.val());
            if(val == ''){
                showTips(obj,'手机号码不得为空！');
            }else{
                if(val.length != 11){
                    showTips(obj,'手机号码必须为11位！');
                }else{
                    if(khVal.chkPhone(val)){
                        return true;
                    }else{
                        showTips(obj,'手机格式不正确，请重新输入！');
                        return false;
                    }
                }
            }
        }

        function validateCode(obj) {
            var val = $.trim(obj.val());
            if(val == ''){
                showCodeTips(obj,'验证码不得为空！');
            }else{
                if(val.length != 6){
                    showCodeTips(obj,'验证码长度为6位！');
                    return false;
                }else{
                    return true;
                }
            }

        }
        function showTips(obj, str) {
            obj.addClass("error");
            var html = "<i class=\"icon-tip-wrong\"></i>" + "&nbsp;<span>" + str + "</span>";
            obj.parent().find('.j_redeem_tips').html(html);
            //如果聚焦，去除内容和样式
            obj.on("focus", function() {
                $(this).removeClass("error");
                $('.j_redeem_tips').html("");
            });
        }
        function showCodeTips(obj, str) {
            obj.addClass("error");
            var html = "<i class=\"icon-tip-wrong\"></i>" + "&nbsp;<span>" + str + "</span>";
            obj.parent().find('.j_redeem_code_tips').html(html);
            //如果聚焦，去除内容和样式
            obj.on("focus", function() {
                $(this).removeClass("error");
                $('.j_redeem_code_tips').html("");
            });
        }
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
                    $("#J_btnUnabled").hide();
                    $(".J_get_code").css('display','inline-block');
                } else {
                    str = str - 1;
                    obj.html(str);
                }
            }, 1000)
        };


});

