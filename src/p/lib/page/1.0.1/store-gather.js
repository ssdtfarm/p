define(function(require, exports, module) {
    /*
     *  新体验店-聚合页（首页、反馈页、热门商品、了解金海马）
     *  @author Zhang Zhensheng & Yan Siwen
     *  @date   2015-09-12
     */
    require("../../components/slider/1.0.0/slider");
    var dialog = require("../../components/dialog/1.0.0/dialog");
    var lazy = require('../../components/lazyload/1.0.0/lazyload');  

    /*========== 首页 ==========*/
    // 主推图轮播
    $("#J_indexBanner").slide({
        titCell: '.hd ul',
        mainCell: '.bd ul',
        autoPage: '<li>&nbsp;</li>',
        autoPlay: true,
        effect: 'left'
    });

    // 热门商品
    // 如果页面中引入了data数据，即热门商品数据
    function loadNavGoods(pro_list) {
        var smallImg = new Image();
        var bigImg = new Image();
        var imgLoaded = false;
        smallImg.src = "http://misc.jjcdn.com/p/images/store-gather/navigate-small.png";
        bigImg.src = "http://misc.jjcdn.com/p/images/store-gather/navigate-big.png";
        bigImg.onload = function(){
            imgLoaded = true;
        }
        if(pro_list) {
            var hotNavFragment = "", hotNavItem = "", hotProFragment = "";
            var typeLen = type_cat.type_id.length;

            // 将数据填充到热门商品页面左侧导航栏
            for(i = 0; i < typeLen; i++) {
                hotNavItem = '<li class="nav-tab-hd-item"><a href="javascript:void(0);">'+ type_cat.type_name[i] +'<i class="icon"></i></a></li>';
                hotNavFragment += hotNavItem;
                hotProFragment += '<div class="hot-goods-slider JQ_hotGoodsSlider" data-type-id='+ type_cat.type_id[i] +'>'+
                                            '<div class="goods-slider-hd hd">'+
                                                '<ul class="goods-slider-hd-ul">'+
                                                '</ul>'+
                                            '</div>'+
                                            '<div class="goods-slider-bd bd">'+
                                                '<ul class="goods-slider-bd-ul">'+
                                                '</ul>'+
                                            '</div>'+
                                            '<a href="javascript:void(0);" class="slide-next J_slideNext">&nbsp;</a>'+
                                        '</div>';
            }
            $("#J_navTabHdUl").html(hotNavFragment);
            $("#J_navTabBd").html(hotProFragment);

            // 处理热门商品数据为二维数组
            var tempArr = [];
            var tempData = pro_list.list_item;
            for(var i=0; i<type_cat.type_id.length; i++) {
                tempArr[i] = [];
                for(var j=0; j<tempData.length; j++) {
                     if(i==tempData[j].type_id) {
                        tempArr[i].push(tempData[j]);
                    }
                }
            }
            // 将数据填充到热门商品右侧商品展示区
            $("#J_navTabBd").html(renderHTML(tempArr));
        }
    }
    try {
        loadNavGoods(pro_list);
    } catch(e) {
        
    }

    function renderHTML(data) {
        var navLen = data.length;
        var dataLen, i, j;
        var hotProFragment = "";
        for(i = 0; i < navLen; i++) {
            hotProFragment += '<div class="hot-goods-slider JQ_hotGoodsSlider">'+
                                '<div class="goods-slider-hd hd">'+
                                    '<ul class="goods-slider-hd-ul"></ul>'+
                                '</div>'+
                            '<div class="goods-slider-bd bd">'+
                                '<ul class="goods-slider-bd-ul">';
            for(j = 0, dataLen = data[i].length; j < dataLen; j++) {
                if(j % 7 === 0) {
                    hotProFragment += '<li class="goods-panel JQ_goodsPanel"><ol class="goods-list clearfix">';
                }
                var className = (j % 7 === 0) ? "" : " clearfix";
                if(j % 7 >= 0 && j % 7 <= 2) {
                    hotProFragment += '<li class="goods'+ className +'">'+
                                        '<a class="goods-pic" href="'+data[i][j]["link_url"]+'" target="_blank" title="'+data[i][j]["title"]+'">'+
                                            '<img src="'+data[i][j]["img_src"]+'" alt="'+data[i][j]["title"]+'">'+
                                        '</a>'+
                                        '<dl class="clearfix">'+
                                            '<dt>'+
                                                '<a class="goods-name" href="'+data[i][j]["link_url"]+'" target="_blank" title="'+data[i][j]["title"]+'">'+data[i][j]["title"]+'</a>'+
                                                '<span class="split">---------------------------</span>'+
                                                '<span class="descript">此商品在未来之家有售</span>'+
                                            '</dt>'+
                                            '<dd>'+
                                                '<span class="price"><i class="icon">&yen;&nbsp;</i>'+data[i][j]["active_price"]+'</span>'+
                                                '<a class="buy-btn" href="'+data[i][j]["link_url"]+'" target="_blank">网上购买</a>'+
                                            '</dd>'+
                                        '</dl>'+
                                    '</li>';
                }
                if(j % 7 === 2) {
                    hotProFragment += '</ol><ol class="goods-list clearfix">';
                }
                if(j % 7 >= 3 && j % 7 <= 6) {
                    hotProFragment += '<li class="goods">'+
                                        '<a class="goods-pic" href="'+data[i][j]["link_url"]+'" target="_blank" title="'+data[i][j]["title"]+'">'+
                                            '<img src="'+data[i][j]["img_src"]+'" alt="'+data[i][j]["title"]+'">'+
                                        '</a>'+
                                        '<dl class="clearfix">'+
                                            '<dt>'+
                                                '<a class="goods-name" href="'+data[i][j]["link_url"]+'" target="_blank" title="'+data[i][j]["title"]+'">'+data[i][j]["title"]+'</a>'+
                                                    '<span class="descript">此商品在未来之家有售</span>'+
                                            '</dt>'+
                                            '<dd>'+
                                                '<span class="price"><i class="icon">&yen;&nbsp;</i>'+data[i][j]["active_price"]+'</span>'+
                                                    '<a class="buy-btn" href="'+data[i][j]["link_url"]+'" target="_blank">网上购买</a>'+
                                            '</dd>'+
                                        '</dl>'+
                                    '</li>';
                }
                if(j % 7 === 6) {
                    hotProFragment += '</ol></li>';
                }
            }
            hotProFragment += '</ul>'+
                            '</div>'+
                            '<a href="javascript:void(0);" class="slide-next JQ_slideNext">&nbsp;</a>'+
                        '</div>';
        }
        return hotProFragment;
    }
    // 判断右侧图片列表是否超过一个列表，如果没有，则隐藏“向右”按钮
    $(".JQ_hotGoodsSlider").each(function(index, item) {
        $(this).find(".JQ_goodsPanel").length > 1 ? $(this).find(".JQ_slideNext").show() : $(this).find(".JQ_slideNext").css("display", "none");
    });

    // 右侧图片列表切换
    $(".JQ_hotGoodsSlider").slide({
        titCell: ".goods-slider-hd ul",
        mainCell: ".goods-slider-bd ul",
        autoPage: "<li>&nbsp;</li>",
        effect: "left",
        nextCell: ".slide-next"
    });

    // 热门商品左侧导航tab切换
    $("#J_hotNavTab").slide({
        titCell: ".nav-tab-hd li",
        mainCell: ".nav-tab-bd",
        trigger: "click"
    });
    /*========== 注册 ==========*/
    //手机号
    $("input[name='userphone']").on("focus", function() {
        clearTip($(this));
    }).on("blur", function(event) {
        event.preventDefault();
        var self = $(this);
        var val = $.trim(self.val()).replace(/\s/g, '');

        if (val == '') {
            activeSubmit();
            return;
        } else {
            if (/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(val)) {
                checkIsMember(self, '此手机号已经被注册，请更换其他手机号');
            } else {
                hasCheckMember = false;
                showTip(self, '手机号码格式有误，请输入正确的手机号', 'error');
                return;
            }
        }
    }).on('keyup', function(event) {
        var self = $(this);
        var val = $.trim(self.val());

        if (val.length > 0) {
            self.css('fontSize', '16px');
            if (val.length == 3 || val.length === 8) {
                if (event.which != 8) { //解决遇到空格时backspace失效的问题
                    self.val(val + ' ');
                }
            }

            if (val.length > 13) {
                self.val(val.substr(0, 13));
            }
        } else {
            self.css('fontSize', '14px');
        }
    });

    //密码
    $("input[name='password']").on("focus", function() {
        clearTip($(this));
        $(this).parent().siblings('.reg-tips').find('.info-tips').show();
    }).on("blur", function() {
        clearTip($(this));

        var self = $(this);
        var val = $.trim(self.val());

        if (val.length == 0) {
        	hasCheckPwd = false;
            activeSubmit();
            return;
		}
        if (val.length > 20 || val.length < 6) {
            hasCheckPwd = false;
            showTip(self, '密码长度为6-20个字符，且区分大小写', 'error');
            return;
        }

        if (!/^[a-zA-z0-9-_]{6,20}$/.test(val)) {
            hasCheckPwd = false;
            showTip(self, '不能使用特殊字符', 'error');
            return;
        }
        hasCheckPwd = true;
        showTip(self, '', 'ok');
    }).on('keyup', function(){
           var self = $(this);
           var val = $.trim(self.val());
           var level = self.siblings('.pwd-level');
           var levelCount = 0;
           if(val.length >= 6) {
                self.siblings('.info-tips').hide();
           }else {
                self.siblings('.info-tips').show();
           }
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
                   level.addClass('level1').removeClass('level2 level3').show().find('b').html('弱');
               }
               if(levelCount == 2) {
                   level.addClass('level2').removeClass('level1 level3').show().find('b').html('中');
               }
               if(levelCount >= 3) {
                   level.addClass('level3').removeClass('level1 level2').show().find('b').html('强');
               }
           }
       });
    
	// 手机验证码    
    $("input[name='vcode']").on("focus", function() {
        clearTip($(this));
    }).on("blur", function() {
        var self = $(this);
        var val = $.trim($(this).val());

        if(val != '') {
            if(val.length != 6) {
                hasCheckPhoneCode = false;
                showTip(self, '请输入6位手机验证码', 'error');
                return;
            } else {
                checkPhoneCode(self);
            }
        }
    });
	function checkPhoneCode(code) {
        var ajaxUrl =  cdnConfig.apiPath+'/member/validateiphonecode';
        $.ajax({
            url: ajaxUrl,
            data: {
                "phonecode" : code.val()
            },
            dataType: 'jsonp'
        })
        .done(function(res) {
            if(res.status == 'succ') {
                hasCheckPhoneCode = true;
                showTip(code, '', 'ok');
            } else {
                hasCheckPhoneCode = false;
                showTip(code, '验证码错误，请确认。', 'error');
            }
            
        })
        .fail(function() {
            hasCheckPhoneCode = false;
            showTip(code, '发送失败，请检查网络是否通畅', 'error');
        });
    }
    //发送手机短信
    var isKhMember = false;
    var hasCheckMember = false;
    var hasCheckPhoneCode = false;
    var hasCheckImgCode = false;
    var hasCheckPwd = false;    
    $("input[name='vcodebtn']").on("click", function(){
        var phone = $('input[name="userphone"]');
        var phoneNum = $.trim(phone.val()).replace(/\s/g,'');
        if(isKhMember) {
            return;
        }
        if(phone.val() == "") {
            showTip(phone, '手机号码格式有误，请输入正确的手机号', 'error');
            return;
        }
        if(!/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(phoneNum)) {
            showTip(phone, '手机号码格式有误，请输入正确的手机号', 'error');
            return;
        }        
		sendPhoneCode(phone, phoneNum);    
    });
	var sendCodeClickNum = 0;
    function sendPhoneCode(phoneCode, phoneNum) {
        if(sendCodeClickNum>=3){
            showTip(phoneCode, '您本次发送手机验证码次数已经用完,请刷新页面重试.','error');
            return;
        }else{
            sendCodeClickNum++;
        }
        countDownFn(60, $(".vcode-btn"), $(".countdown"));
        $.ajax({
            url: cdnConfig.apiPath + '/member/sendphonecode',
            data: {
                "phone": phoneNum,
                "h": $("#security").val(),
                "m": $("#security").attr('name'),
                "n": sendCodeClickNum,
                "r"  : Math.random()
            },
            dataType: "jsonp"
        })
        .done(function(res) {
            console.log(res.status);
            if(res.status == 'succ') {
                refreshKey(res.pin);
            }
        })
        .fail(function() {
            showTip(phoneCode, '发送失败，请检查网络是否通畅', 'error');
        });
    }
    // 倒计时
    function countDownFn(t, obj1, obj2) {
        var tempT = t;
        obj1.css('top','-9999px');
        obj2.css('display','inline-block').html(t+"秒");
        var timer =  setInterval(function(){
            if(t<=0){
                clearInterval(timer);
                obj1.css('top','auto').val('重新获取验证码');
                obj2.hide();
            }else{
                t = t - 1;
                obj2.html(t+"秒");
            }
        },1000);
    }
    // 刷新页面的key
    function refreshKey(str){
        var tar = $("#security");
        tar.val(str[1]);
        tar.attr("name", str[0]);
    }    

    // 图片验证码
    var token = "";
    // 加载图片验证码
    loadImgCode();
    // 加载图片验证码函数
    function loadImgCode() {
        var randNum = Math.random();
        token = util.getToken(16);
        // 获取图片code
        imgURL = cdnConfig.apiPath + '/member/imgcode?type=registercode' + '&v=' + randNum + '&token=' + token;
        $("#J_findImgCode").attr("src", imgURL);
        $("input[name='token']").val(token);
    }
    // 刷新图片验证码
    $("#J_changeCode,#J_findImgCode").on("click", function (event) {
        event.preventDefault();
        // 更新图片验证码
        loadImgCode();
    });

    $('.pcode').on("focus", function() {
        clearTip($(this));
    }).on('blur', function(){
        var self = $(this);
        var val = $.trim(self.val());

        if(val.length != '') {
           verifyValidateCode(self);
        }
    });
    // 验证图片验证码函数
    function verifyValidateCode(self) {

        var codeVal = $.trim(self.val());
        if (codeVal != "") {
            
            var val = codeVal.toUpperCase();
            $.ajax({
                url: cdnConfig.apiPath + '/member/getimgcode',
                data : {
                    "token" : token
                },
                dataType: 'jsonp',
                success: function (res) {
                    if (res.status == 'succ') {
                        if (res.data.code == val) {
                            hasCheckImgCode = true;
                            $('#token').val(token);
                            showTip(self, '', 'ok');
                        } else {
                            hasCheckImgCode = false;
                            showTip(self, '验证码输入有误，请核对后再输入!', 'error');
                        }
                    } else {
                        hasCheckImgCode = false;
                        showTip(self, '输入的验证码不正确', 'error');
                    }
                }
            });
            
        } else {
            hasCheckImgCode = false;
            showTip(self, '请输入验证码', 'error');
        }
    }

    // 同意协议
    $("#J_regCheck").on("click", function() {
        $(".reg-check").toggleClass("reg-check-active");
        activeSubmit();
    });

    // 立即注册
	// 激活立即注册
    function activeSubmit() {
        var protocol = $('#J_regCheck').hasClass('reg-check-active');
        if(hasCheckMember && hasCheckPhoneCode && hasCheckImgCode && hasCheckPwd && protocol) {
            $('.reg-submit-btn').removeAttr("disabled").addClass("reg-submit-active");
        } else {
            $('.reg-submit-btn').attr("disabled", "true").removeClass("reg-submit-active");
        }
    }
    // 点击立即注册 
    $('.reg-submit-btn').on('click', function(){
        var phone = $('input[name="userphone"]');
        var pass = $('input[name="password"]');
        var phoneCode = $('input[name="vcode"]');
        var phoneVal = $.trim(phone.val());
        var passVal = $.trim(pass.val());
        var phoneCodeVal = $.trim(phoneCode.val());

        var imgCode = $('.pcode');
        var imgCodeVal = $.trim(imgCode.val());

        var protocol = $('#J_regCheck');

        if(phoneVal == '') {
            showTip(phone, '请输入要注册的手机号码', 'error');
            return;
        }
        if(passVal == '') {
            showTip(pass, '请设置登陆密码','error');
            return;
        }

        if(phoneCodeVal == '') {
            showTip(phoneCode, '请输入手机验证码', 'error');
            return;
        }

        if(phoneCodeVal == '') {
            showTip(passVal, '请输入图片验证码', 'error');
            return;
        }

        if(!protocol.hasClass('reg-check-active')) {
            protocol.siblings(".icon-tip-wrong").show().siblings(".reg-error-tips").show();
            return;
        }
        if(hasCheckMember && hasCheckPhoneCode && hasCheckImgCode) {
            //$('#J_regPhoneForm').submit();
            submitRegister();
        }
    });
    function submitRegister() {
        $.ajax({
            url: '/aggregation/register',
            data: {
                "userphone": $('input[name="userphone"]').val().replace(/\s/g, ""),
                "password": $('input[name="password"]').val(),
                "vcode": $('input[name="vcode"]').val(),
                "pcode": $('input[name="pcode"]').val(),
                "security": $('#security').val(),
                "token": $('input[name="token"]').val()
            },
            type: "POST",
            dataType: "json",
            success: function(res) {
                if(res.status == "succ"){
                    // $("#J_feedbackBtn").removeClass("on");
                    $('.reg-submit-btn').attr("disabled", "true").removeClass("reg-submit-active");
                    isSubmitted = true;
                    // 提交成功提示框
                    var succDialog = new dialog({
                        title: "提示",
                        content: "<div class='feedback-tip'><i class='icon-face-smile-orange'></i>恭喜您注册成功，并获得<span style='color:#F60'>100元</span>优惠券</div>",
                        width: 474,
                        height: 104,
                        fixed: true,
                        button: [{
                            id: "J_succOk",
                            value: "确定",
                            className: "ui-btns-ok"}]

                    }).showModal();
                    succDialog.addEventListener("close", function(){
                        window.location.href = "/aggregation/index";
                    });
                }
            },
            error: function(res) {
                // 提交失败提示框
                var failDialog = new dialog({
                    title: "提示",
                    content: "<div class='feedback-tip'><i class='icon-face-sad-orange'></i>注册失败，请重新提交</div>",
                    width: 474,
                    height: 104,
                    fixed: true,
                    button: [
                        {
                            id: "J_failOk",
                            value: "重新提交",
                            className: "ui-btns-ok",
                            callback: function() {
                                // 重新提交
                                submitRegister();
                            }
                        }, {
                            id: "J_cancel",
                            value: "返回首页",
                            className: "ui-btns-cancel",
                            callback: function() {
                                // 返回首页
                                window.location.href = "/aggregation/index";
                            }
                        }]
                }).showModal();
            }
        });
    }
    // 清除提示信息
    function clearTip(obj) {
        obj.removeClass("reg-error").parent()
        .siblings(".reg-tips").find('.reg-error-tips').hide()
        .siblings('.icon-tip-wrong').hide().siblings('.info-tips').hide();
        obj.siblings(".icon-tip-ok").hide();
    }

    // 显示提示信息
    function showTip(obj, text, type) {
        switch (type) {
            case 'ok':
                obj.siblings('.icon-tip-ok').show();
                activeSubmit();
                break;
            case 'error':
                obj.siblings(".icon-tip-ok").hide();
                obj.addClass('reg-error').parent().siblings(".reg-tips").find('.reg-error-tips').html(text).show().siblings('.icon-tip-wrong').show();
                activeSubmit();
                break;
        }
    }

    // 检验是否是已注册的账号名
    function checkIsMember(user, txt, type) {
        var val = user.val();
        val = val.replace(/\s/g, '');
        $.ajax({
            url: cdnConfig.apiPath + '/member/validatemem',
            // url: "/aggregation/register",
            dataType: "jsonp",
            data: {
                "username": val,
                "key": $("#security").val(),
                "name": $("#security").attr('name')
            },
            success: function(res) {
                if (res.status == 'succ') { //已存在的的用户
                    isKhMember = true;
                    showTip(user, txt, 'error');
                } else {
                    isKhMember = false;
                    hasCheckMember = true;
                    showTip(user, '', 'ok');
                }
                refreshKey(res.pin);
            }
        });
    }

	/*========== 了解金海马 ==========*/
    $(function(){
        $("img.lazy").lazyload();
    });

	// 反馈内容
    var isSubmitted = false;  // 是否已经提交过表单，false为还未提交
    $("#J_feedback").on("keyup", function(event) {
        if(!isSubmitted && checkEmpty($(this).val()) && checkPhone($("#J_feedbackPhone").val()) && checkEmpty($("#J_feedbackAccount").val())) {
            $("#J_feedbackBtn").addClass("on");
        } else {
            $("#J_feedbackBtn").removeClass("on");
        }
    });
    // 账号
    $("#J_feedbackAccount").on("keyup", function() {
        if(!isSubmitted && checkEmpty($("#J_feedback").val()) && checkPhone($("#J_feedbackPhone").val()) && checkEmpty($(this).val())) {
            $("#J_feedbackBtn").addClass("on");
        } else {
            $("#J_feedbackBtn").removeClass("on");
        }
    });
    // 手机号码
    $("#J_feedbackPhone").on("keydown", function(event) {
        var $JQ_self = $(this);
        var str = $JQ_self.val();
        if(str.length > 1) {
            if(str.length == 3 || str.length == 8) {
                if(event.which == 8) {
                    // 如果用户删除号码
                    $(this).val(str);
                } else {
                    // 限制手机输入格式为xxx xxxx xxxx
                    $(this).val(str + " ");
                }
            }  
        }
    }).on("keyup", function() {
        var $JQ_self = $(this);
        var str = $JQ_self.val();
        // 判断反馈内容与称呼是否为空、手机输入是否正确
        if(!isSubmitted && checkEmpty($("#J_feedback").val()) && checkPhone($(this).val()) && checkEmpty($("#J_feedbackAccount").val())) {
            $("#J_feedbackBtn").addClass("on");
        } else {
            $("#J_feedbackBtn").removeClass("on");
        }
    });
    // 提交按钮
    $("#J_feedbackBtn").on("click", function() {
        // 判断反馈内容与称呼是否为空、手机输入是否正确
        if(checkEmpty($("#J_feedback").val()) && checkPhone($("#J_feedbackPhone").val()) && checkEmpty($("#J_feedbackAccount").val())) {
            if($("#J_feedbackBtn").hasClass("on") && !isSubmitted) {
                submitFeedback();
            }
        } else {
            return false;
        }
    });
    // 判断传入的str字符串是否为空
    function checkEmpty(str) {
        var string = str.replace(/\s/g, "");
        if(string === "") {
            return false;
        }
        return true;
    }
    // 判断手机号码的格式是否为13X/15X/18X开头
    function checkPhone(str) {
        var string = str.replace(/\s/g, "");
        if(/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(string)) {
            return true;            
        } else {
            return false;
        }
    }
    // 使用ajax提交反馈表单
    function submitFeedback() {
        $.ajax({
            url: '/aggregation/feedback',
            data: {
                "content": $("#J_feedback").val(),
                "member_name": $("#J_feedbackAccount").val(),
                "member_phone": $("#J_feedbackPhone").val().replace(/\s/g, "")
            },
            type: "POST",
            dataType: "json",
            success: function(res) {
                if(res.status == "succ"){
                    $("#J_feedbackBtn").removeClass("on");
                    isSubmitted = true;
                    // 提交成功提示框
                    var succDialog = new dialog({
                        title: "提示",
                        content: "<div class='feedback-tip'><i class='icon-face-smile-orange'></i>您的宝贵意见已提交</div>",
                        width: 474,
                        height: 104,
                        fixed: true,
                        button: [{
                            id: "J_succOk",
                            value: "确定",
                            className: "ui-btns-ok"}]

                    }).showModal();
                    succDialog.addEventListener("close", function() {
                        window.location.href = '/aggregation/index';
                    });
                }
            },
            error: function() {
                // 提交失败提示框
                var failDialog = new dialog({
                    title: "提示",
                    content: "<div class='feedback-tip'><i class='icon-face-sad-orange'></i>提交失败，请检查是否网络问题~</div>",
                    width: 474,
                    height: 104,
                    fixed: true,
                    button: [
                        {
                            id: "J_failOk",
                            value: "重新提交",
                            className: "ui-btns-ok",
                            callback: function() {
                                // 重新提交
                                submitFeedback();
                            }
                        }, {
                            id: "J_cancel",
                            value: "返回首页",
                            className: "ui-btns-cancel",
                            callback: function() {
                                // 返回首页
                                window.location.href = '/aggregation/index';
                            }
                        }]
                }).showModal();
            }
        });
    }

    /*========== 商场导视图 ==========*/
    // 拖拽
    jQuery.fn.navDrag = function() {

        _IsMove = 0;
        _MouseLeft = 0;
        _MouseTop = 0;

        return $(this).bind("mousemove", function(e) {
            e.preventDefault();
            if (_IsMove == 1) {
                $(this).offset({
                    top: e.pageY - _MouseTop,
                    left: e.pageX - _MouseLeft
                });
            }
        }).bind("mousedown", function(e) {
            e.preventDefault();
            _IsMove = 1;
            var offset = $(this).offset();
            // 鼠标在图片上的坐标
            _MouseLeft = e.pageX - offset.left;
            _MouseTop = e.pageY - offset.top;
        }).bind("mouseup", function(e) {
            e.preventDefault();
            var offset = $(this).offset();
            var offsetRight = offset.left + $(this).width();
            var offsetBottom = offset.top + $(this).height();
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            var offsetRightEnd = windowWidth - $(this).width();
            var offsetBottomEnd = windowHeight - $(this).height();

            if (offset.left > 0) {
                $(this).offset({
                    left: 0
                });
            }
            if (offset.top > 0) {
                $(this).offset({
                    top: 0
                });
            }
            if (offsetRight < windowWidth) {
                $(this).offset({
                    left: offsetRightEnd
                });
            }
            if (offsetBottom < windowHeight) {
                $(this).offset({
                    top: offsetBottomEnd
                });
            }

            _IsMove = 0;
        }).bind("mouseout", function(e) {
            e.preventDefault();
            _IsMove = 0;
        });
    }
    // 放大
    jQuery.fn.zoomIn = function() {

        return $(this).on("click", function() {
            // 创建加载层
            var html = '<div class="loaded-layout" style="position:fixed;z-index:90;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:.7;text-align:center;line-height: 970px;"><img style="" src="http://misc.jjcdn.com/p/images/loading-t.gif" /></div>';
            var div = $(html);
            $("body").append(div);
            $(".navigate-div").empty();
            $(".zoomin").unbind().find("i").addClass("inactive").removeClass("active");
            $(".zoomout").zoomOut().find("i").addClass("active").removeClass("inactive");
            if (imgLoaded == true) {

                // 移除加载层
                $(".loaded-layout").remove();
                // 插入大图
                $(bigImg).attr({
                    "id": "J_navigateImg",
                    "class": "navigate-img",
                    "draggable": "true"
                });
                $(".navigate-div").append($(bigImg));
                $("#J_navigateImg").navDrag();
                $(".navigate-div").addClass("big-div").removeClass("small-div");
                $(".navigate-img").addClass("big-img").removeClass("small-img");
            }
        });

    }
    // 缩小
    jQuery.fn.zoomOut = function() {

        return $(this).on("click", function() {

            // 移除加载层
            $(".loaded-layout").remove();

            $(".zoomout").unbind().find("i").addClass("inactive").removeClass("active");
            $(".zoomin").zoomIn().find("i").addClass("active").removeClass("inactive");
            $(smallImg).attr({
                "id": "J_navigateImg",
                "class": "navigate-img",
                "draggable": "true"
            });            
            $(".navigate-div").empty().append(smallImg);
            $("#J_navigateImg").unbind();
            $(".navigate-div").addClass("small-div").removeClass("big-div");
            $(".navigate-img").addClass("small-img").removeClass("big-img").removeAttr("style");
        });

    }
    // 商场导视初始化
    if(typeof($(".zoomin")) != undefined) {
        $(".zoomin").zoomIn();
    }
});

