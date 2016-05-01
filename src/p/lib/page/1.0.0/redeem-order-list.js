
define(function(require, exports, module) {

    /* 按需加载js */
    var dialog = require("../../components/dialog/1.0.0/dialog");
    var khVal  = require("../../components/khValidate/1.0.0/khValidate");

    var totalPrice = $.trim($(".total_goods_price").html())*1; //取得兑换的商品积分
    $(".J_check_point").on('click',function(){
        var user = $(this).data('user');
        var integral = 0;
        var cid = $('#cid').val();

        //异步获取积分值
        $.ajax({
            url : cdnConfig.apiPath+"/member/getintegral",
            type : "GET",
            dataType : "jsonp",
            success : function(res){
                if(res.status == 'succ'){
                    integral = parseInt(res.data);
                    if(integral < totalPrice){
                        var conHtml = "<p class=\"dialog-tips\"><i class=\"icon-face-frown-blue\"></i><span>您的积分不够兑换此商品！</span></p>";
                        var d = new dialog({
                            title: '提示',
                            content: conHtml,
                            width: 400,
                            height: 60,
                            fixed: true,
                            button: [{
                                value: "返回积分商城首页",
                                className: 'ui-btns-orange',
                                callback: function() {

                                    d.remove();
                                    window.location.href = 'http://my.kinhom.com/club/integralshop';
                                }
                            }]
                        }).showModal();
                    }else{
                        window.location.href = 'http://cart.kinhom.com/confirmcoupon?cid='+cid;
                    }
                }else{
                    var conHt5ml = "<p class=\"dialog-tips\"><br><span>亲，请先登录！</span></p>";
                    var d = new dialog({
                        title: '提示',
                        content: conHt5ml,
                        width: 400,
                        height: 60,
                        fixed: true
                    }).showModal();
                }
            },
            error : function(){

            }
        });
    });

        function validatePhone(obj) {
            var val = $.trim(obj.val());
            if (val == '') {
                showTips(obj, '手机号码不得为空！');
            } else {
                if (val.length != 11) {
                    showTips(obj, '手机号码必须为11位！');
                } else {
                    if (khVal.chkPhone(val)) {
                        return true;
                    } else {
                        showTips(obj, '手机格式不正确，请重新输入！');
                        return false;
                    }
                }
            }
        }

        function validateCode(obj) {
            var val = $.trim(obj.val());
            if (val == '') {
                showCodeTips(obj, '验证码不得为空！');
            } else {
                if (val.length != 6) {
                    showCodeTips(obj, '验证码长度为6位！');
                    return false;
                } else {
                    return true;
                }
            }

        }

        function showTips(obj, str) {
            obj.addClass("error");
            var html = "<i class=\"icon-tip-wrong\"></i>" + "&nbsp;<span>" + str + "</span>";
            obj.parent().find('.j_redeem_tips').html(html);
            //如果聚焦，去除内容和样式
            obj.on("focus", function () {
                $(this).removeClass("error");
                $('.j_redeem_tips').html("");
            });
        }

        function showCodeTips(obj, str) {
            obj.addClass("error");
            var html = "<i class=\"icon-tip-wrong\"></i>" + "&nbsp;<span>" + str + "</span>";
            obj.parent().find('.j_redeem_code_tips').html(html);
            //如果聚焦，去除内容和样式
            obj.on("focus", function () {
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
            config    = config || {}
            this.num  = config['num'];
            var obj   = $(timeNumId);
            var str   = this.num;
            var timer = setInterval(function (e) {
                if (str == 0) {
                    clearInterval(timer);
                    $("#J_btnUnabled").hide();
                    $(".J_get_code").css('display', 'inline-block');
                } else {
                    str = str - 1;
                    obj.html(str);
                }
            }, 1000)
        };

    //});

});

