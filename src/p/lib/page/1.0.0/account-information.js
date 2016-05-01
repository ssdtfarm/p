define(function(require, exports, module) {
    /*
     * 按需加载对应css
     * 这里首先让右边加载完毕，然后再加载左边菜单
     */
    //seajs.use(["http://misc.jjcdn.com/p/css/member-aside.css"],function(){
    document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;
    //});  

    /* 按需加载js */
    var tempcomment = require("../../template/tempcomment");
    var tempaccount = require("../../template/tempaccount");
    var minBar = require('../../components/minBar/1.0.1/minBar');

    var dialogs = require('../../components/dialog/1.0.0/dialog');
    var khValidate = require('../../components/khValidate/1.0.0/khValidate');

    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell   : '#J_minBar',
        pathConfig : cdnConfig,
        tpl        : tempcomment,
        tplName    : "tplMinBar",
        data : _globalConfig.minBar.data
    });

    /*
     * 修改昵称 ===============================================
     */
    //点击修改
    var oFlag = false;
    $(document).on("click", "#J_modifyNickBtn", function(event) {
        var that = $(this);
        //阻止默认事件
        event.preventDefault();

        if (!oFlag) {

            var nickHtml = '<tr id="J_nickName" class="account-information-item"><th class="fc-8c8">昵称：</th><td>';
            nickHtml += '<input id="J_nickInput" class="account-information-input"  value="' + $("#J_nickText").html() + '" placeholder="2-15个中英文或数字字符，不含特殊符号"/>';
            nickHtml += '<a href="javascript:void(0);" class="btn-100x30 btn-orange JQ_submitModifyNick">提交</a>' + '<a href="javascript:void(0);" class="btn-100x30 btn-gray JQ_cancelModifyNick">取消</a>' + '</td></tr>'
            $("#J_nickTable").append(nickHtml);
            oFlag = true;
        }
    });

    //提交修改昵称
    $(document).on("click", ".JQ_submitModifyNick", function(event) {
        //阻止默认事件
        event.preventDefault();

        var that = $(this);
        var val = that.siblings("input").val();
        if (val == "" || !khValidate.chkUserName(val)) {
            //提示
            var nickTip = new dialogs({
                align: 'top',
                content: '昵称只能是2-15个中英文或数字字符，不含特殊符号！'
            }).show(document.getElementById("J_nickInput"));

            setTimeout(function() {
                nickTip.close();
            }, 1500)
        } else {
            //发起ajax设置昵称
            $.ajax({
                url: cdnConfig.apiPath + '/member/updatemem',
                data: {
                    "member_nicheng": val
                },
                dataType: 'jsonp',
                success: function(result) {
                    if (result.status == "succ") {
                        // $("#J_nickText").html(that.siblings("input").val());
                        //删除表单
                        $("#J_nickName").remove();
                        // window.location.reload();
                    } else {
                        //删除表单
                        $("#J_nickName").remove();
                    }
                    //刷新页面
                    window.location.reload();
                    oFlag = false;
                }
            });
        }
    });
    
    
    //取消修改
    $(document).on("click", ".JQ_cancelModifyNick", function(event) {
        //阻止a标签默认事件
        event.preventDefault();

        //删除表单
        $("#J_nickName").remove();
        //重设阀值
        oFlag = false;
    });

    /**
     * 修改密码 =================================================================
     * 
     * 修改内容：弹框出现后，为弹框内的表单元素注册blur/focus事件
     * 修改时间：2015-11-19 09:20:41
     * 修改人： yansiwen
     */
    $(".JQ_editPassBtn").on("click", function(event) {
        var editData = {
                "actionURL": cdnConfig.my + '/user/updatemem'
            };
            //event prevent default
        event.preventDefault();
        //show dialog
        var editDialog = new dialogs({
            title: '修改登录密码',
            content: tempcomment('tplEditPassForm', editData),
            fixed: true,
            width: 400,
            button: [{
                value: '确定',
                className: 'ui-btns-orange',
                callback: function() {
                    //submit form
                    submitEditForm(editDialog);
                    return false;
                }
            }, {
                value: '取消',
                className: 'ui-btns-gray',
                callback: function() {}
            }],
            onshow: function() {
                bindEvent();
            }
        }).showModal();
    });

    /**
     * 为表单元素注册blur或focus事件
     * 创建时间：2015-11-18 15:30:14
     * 创建人：yansiwen
     */
    function bindEvent() {
        var oldPass = $("input[name=old_passwd]");
        var newPass = $("input[name=new_passwd]");
        var conPass = $("input[name=confirmNewPass]");
        var oldPassVal, newPassVal, conPassVal;

        $("input[name=old_passwd]").on("blur", function(event) {
            //验证旧密码
            if (verifyEditPass(oldPass, 'old')) {
                oldPassVal = $("input[name=old_passwd]").val();
                //异步验证密码是否正确
                $.ajax({
                    url: cdnConfig.apiPath + '/member/validatepwd',
                    // url: "account-info/checkOldPsw.php",
                    data: {
                        "old_passwd": oldPassVal
                    },
                    dataType: 'jsonp',
                    success: function(res) {
                        if (res.status == "succ") {
                            showTips(oldPass, '', 'ok');
                        } else {
                            showTips(oldPass, '密码错误，请重新输入！', 'no');
                        }
                    }
                });
                return false;
            }
        });
        showTips(newPass, '请设置6-20位数字、字母或符号的新密码（不包括空格）', '');
        $("input[name=new_passwd]").on("blur", function(event) {
            newPassVal = newPass.val();
            // 限制输入框字符长度为20个
            if(newPassVal.length > 20) {
                newPass.val(newPassVal.substr(0, 20));
            }
            //验证新密码并判断新密码与再次输入密码是否一致
            checkIsEqual("new");
        }).on("keyup", function() {
            newPassVal = newPass.val();
            // 限制输入框字符长度为20个
            if(newPassVal.length > 20) {
                newPass.val(newPassVal.substr(0, 20));
            }
        })
        .one("focus", function() {
            showTips(newPass, '请设置6-20位数字、字母或符号的新密码（不包括空格）', '');
        });
        
        $("input[name=confirmNewPass]").on("blur", function(event) {
            //验证再次输入新密码并判断新密码与再次输入密码是否一致
            checkIsEqual("confirm");
        });
    }

    /**
     * 验证新密码或再次输入密码字段，并判断新密码与再次输入密码是否一致
     * @param   {String}    type  密码类型
     * @return    void
     * 
     * 创建时间：2015-11-19 16:48:58
     * 创建人：yansiwen
     */
    function checkIsEqual(type) {
        var newPass = $("input[name=new_passwd]");
        var conPass = $("input[name=confirmNewPass]");
        var newPassVal = newPass.val();
        var conPassVal = conPass.val();
        
        if(type == "new") verifyEditPass(newPass, type);
        if(type == "confirm" && conPassVal == "") {
            showTips(conPass, "请再次确认您的密码!", "no");
        }
        if(conPassVal != "") {
            if(newPassVal != conPassVal) {
                showTips(conPass, "两次输入的密码不一致，请重新输入！", "no");
            } else {
                if(verifyEditPass(newPass, type)) {
                    showTips(newPass, "请设置6-20位数字、字母或符号的新密码（不包括空格）", "ok");
                }
                showTips(conPass, "", "ok");
            }
        }
    }

    //修改密码提交事件
    function submitEditForm(dialogObj) {
        var oldPassTip = $("#J_oldPass").siblings(".edit-pass-tip");
        var newPassTip = $("#J_newPass").siblings(".edit-pass-tip");
        var conPassTip = $("#J_confirmNewPass").siblings(".edit-pass-tip");

        var oldPass = $("input[name=old_passwd]");
        var newPass = $("input[name=new_passwd]");
        var conPass = $("input[name=confirmNewPass]");

        var oldPassVal = $("input[name=old_passwd]").val();
        var newPassVal = $("input[name=new_passwd]").val();
        var conPassVal = $("input[name=confirmNewPass]").val();

        //验证旧密码+新密码＋确认新密码
        if (verifyEditPass(oldPass, 'old')) {
            //异步验证密码是否正确
            $.ajax({
                url: cdnConfig.apiPath + '/member/validatepwd',
                // url: 'account-info/checkOldPsw.php',
                data: {
                    "old_passwd": oldPassVal
                },
                dataType: 'jsonp',
                success: function(res) {
                    if (res.status == "succ") {
                        verifyEditPass(newPass, 'new') && verifyEditPass(conPass, 'confirm');
                        if (verifyEditPass(newPass, 'new') && verifyEditPass(conPass, 'confirm')) {
                            if(newPassVal == conPassVal) {
                                //提交表单
                                submitEditPassForm();
                                // $("#J_editPassForm").submit();
                            } else {
                                showTips(conPass, '两次输入的密码不一致，请重新输入！', 'no');
                                return false;
                            }
                        }
                    } else {
                        showTips(oldPass, '密码错误，请重新输入！', 'no');
                    }
                }
            });


            return false;
        } else {

        }

    }
    
    /**
     * 修改密码表单提交前检测所有字段，检测通过提交表单
     * 
     * 创建时间：2015-11-24 15:49:17
     * 创建人：yansiwen
     */
    function submitEditPassForm() {
        var oldPass = $("input[name=old_passwd]");
        var newPass = $("input[name=new_passwd]");
        var conPass = $("input[name=confirmNewPass]");

        var url = $("#J_editPassForm").attr("action");
        $.ajax({
            url: url,
            type: "post",
            data: $("#J_editPassForm").serialize(),
            dataType: "json",
            success: function(res) {
                if(res.status == "success") {
                    switch(res.data.code) {
                        case 2: 
                            // 用户未登录
                            window.location.href = cdnConfig.passport;
                            break;
                        case 3:
                            // 原密码输入错误 
                            showTips(oldPass, "密码错误，请重新输入！", "no");
                            break;
                        case 4:
                            // 两次密码输入不一致
                            showTips(conPass, "两次输入的密码不一致，请重新输入！", "no");
                            break;
                        case 5: 
                            // 新密码错误
                            showTips(newPass, "请设置6-20位数字、字母或符号的新密码（不包括空格）！", "no");
                            break;
                        case 200: 
                            // 修改成功
                            window.location.reload();
                            break;
                        default: 
                            break;
                    }
                } else {
                    // 网络失败
                    return;
                }
            }
        });
    }


    /**
     * 验证密码函数
     * 
     * 修改内容：密码通过正则验证后，根据type显示不同的提示信息
     * 修改时间：2015-11-17 14:40:09
     * 修改人：yansiwen
     */
    function verifyEditPass(obj, type) {
        var val = obj.val();
        var text = "";
        switch (type) {
            case 'old':
                text = '请输入原登录密码!';
                break;
            case 'new':
                text = '请设置6-20位数字、字母或符号的新密码（不包括空格）';
                break;
            case 'confirm':
                text = '请再次确认您的密码!';
                break;
            default:
                break;
        }

        if (val != "") {
            if (khValidate.chkPassNew(val)) {
                if(type == "old") return true;
                if(type == 'confirm') return true;
                showTips(obj, '请设置6-20位数字、字母或符号的新密码（不包括空格）', 'ok');
                return true;
            } else {
                if(type == 'old') text = '密码错误，请重新输入！';
                if(type == 'confirm') return;
                showTips(obj, text, 'no');
                return false;
            }
        } else {
            if(type == 'new') {
                showTips(obj, text, "");
                return;
            }
            showTips(obj, text, 'no');
            return false;
        }
    }

    /**
     * 设置／修改邮箱      ====================================================
     * 
     * 修改内容：设置/修改邮箱省略步骤一
     * 修改时间：2015-11-17 10:58:49
     * 修改人： yansiwen
     */
    //弹出设置邮件
    //模板数据
    var setData = {
        "email": "",
        "emailSuffix": ""
    };
    //设置按钮事件
    $("#J_setEmail").on("click", function(event) {
        //stop event prevent
        event.preventDefault();
        var that = $(this);
        //设置标题
        // setData.title = "设置邮箱";
        that.hasClass("first") ? setData.title = "设置邮箱" : setData.title = "修改邮箱";
        //获取邮箱
        // var that = $(this);
        // setData.email = that.attr("data-value");
        // setData.emailSuffix = that.attr("data-value").split("@")[1];

        //弹窗
        // 省略步骤一，直接步骤二(使用tplSetMailTwo)
        var setDialog = new dialogs({
            title: setData.title,
            content: tempaccount('tplSetMailTwo'),
            width: 400,
            fixed: true,
            button: [{
                value: '下一步',
                className: 'ui-btns-orange',
                callback: function() {
                    //表单二交互
                    submitSetMailTwo(setDialog);
                    return false;
                }
            }, {
                value: '取消',
                className: 'ui-btns-gray',
                callback: function() {}
            }]
        }).showModal();

        loadImgCode($("#J_stepMailCode"));
    });

    //设置／修改邮箱表单一交互
    /*function submitSetMailOne(dialog) {

        var setMailPass = $("input[name=stepMailPass]");
        var setMailCode = $("input[name=stepMailCode]");

        var valMailPass = $.trim(setMailPass.val());
        var valMailCode = $.trim(setMailCode.val());

        //验证密码
        if (valMailPass != "" && khValidate.chkPass(valMailPass)) {
            $.ajax({
                url: cdnConfig.apiPath + '/member/validatepwd',
                data: {
                    "old_passwd": valMailPass
                },
                dataType: 'jsonp',
                success: function(res) {
                    if (res.status == "succ") {
                        showTips(setMailPass, "", "ok");
                        //验证验证码
                        verifySetEmailCode(setMailCode, dialog);
                    } else {
                        showTips(setMailPass, "登录密码输入错误", "no");
                        return false;
                    }
                }
            });
            // verifySetEmailCode(setMailCode, dialog);
        } else {
            showTips(setMailPass, "请输入登录密码！", "no");
            return false;
        }
    }*/

    //验证第一步的图片验证码
    /*function verifySetEmailCode(tar, dialog) {
        var val = $.trim(tar.val());
        if (val != "") {
            $.ajax({
                url: cdnConfig.apiPath + '/member/getimgcode',
                dataType: 'jsonp',
                success: function(res) {
                    // console.log(res);
                    if (res.status == "succ" && val.toUpperCase() == res.data.code) {
                        //验证码正确
                        showTips(tar, "", "ok");
                        //显示下个验证内容
                        dialog.content(tempaccount('account/tplSetMailTwo'));
                        dialog.button([{
                            value: '下一步',
                            className: 'ui-btns-orange',
                            callback: function() {
                                //表单2的提交处理
                                submitSetMailTwo(dialog);
                                return false;
                            }
                        }, {
                            value: '取消',
                            className: 'ui-btns-gray',
                            callback: function() {}
                        }])
                    } else {
                        showTips(tar, "验证码错误或者已经失效", "no");
                        return false;
                    }
                }
            });
        } else {
            showTips(tar, "请输入验证码", "no");
            return false;
        }
    }*/

    //设置／修改邮箱表单二交互
    function submitSetMailTwo(dialog) {
        var setMailData = {
            "mail": ""
        }

        var mail = $("input[name=stepTwoMail]");
        var mailVal = $.trim(mail.val());

        var mailCode = $("input[name=stepTwoMailCode]");
        var mailCodeVal = $.trim(mailCode.val());

        if (mailVal != "" && khValidate.chkEmail(mailVal)) {

            //输入的邮箱格式验证通过
            showTips(mail, "", "ok");

            if (mailCodeVal != "" && khValidate.chkNumber(mailCodeVal, 6)) {
                // showTips(mailCode, "", "ok");
                //验证验证码是否正确
                $.ajax({
                    url: cdnConfig.apiPath + '/member/validateemailcode',
                    data: {
                        'emailcode': mailCodeVal
                    },
                    dataType: 'jsonp',
                    success: function(res) {
                        // console.log(res);
                        if (res.status == "succ") {
                            if (mailCodeVal == res.data.phonecode) {
                                setMailData.mail = mailVal;
                                //异步设置/修改邮箱
                                $.post(
                                    cdnConfig.my + '/user/bindinfo', {
                                        "type": "email",
                                        "val": mailVal
                                    },
                                    function(result) {
                                        // conso/le.log(result);
                                        if (result.status == "succ") {
                                            //显示下个验证内容
                                            dialog.content(tempaccount('tplSetMailThree', setMailData));
                                            dialog.button([{
                                                value: '完成',
                                                className: 'ui-btns-orange',
                                                callback: function() {
                                                    // 设置或者修改成功刷新当前页面
                                                    window.location.reload();
                                                    return false;
                                                }
                                            }]);
                                        } else {
                                            //提示错误，重试！
                                            var modifyDialog = new dialogs({
                                                title: '提示',
                                                content: '<p>&nbsp;</p><p class="tc fs-14">修改/设置邮箱失败，请重试</p>',
                                                width: 400,
                                                height: 60,
                                                fixed: true,
                                                button: [{
                                                    value: '确定',
                                                    className: 'ui-btns-orange',
                                                    callback: function() {}
                                                }]
                                            }).showModal();
                                        }
                                    },
                                    "json"
                                );

                            } else {
                                showTips(mailCode, "验证码错误或已失效，请重新获取!", "no");
                            }
                        } else {
                            showTips(mailCode, "验证码错误或已失效，请重新获取!", "no");
                            return false;

                        }
                    }
                })
            } else {
                //没有输入验证码或者输错了！
                if (mailCodeVal == "") {
                    showTips(mailCode, "请输入验证码！", "no");
                } else {
                    showTips(mailCode, "验证码错误或者已过期！", "no");
                }
                return false;
            }
        } else {
            //没有输入邮箱或者输入错了！
            if (mailCode == "") {
                showTips(mail, "请输入邮箱！", "no");
            } else {
                showTips(mail, "邮箱格式有误！", "no");
            }
            return false;
        }
    }

    //刷新表单1的图片验证码
    /*$(document).on("click", "#J_getMailCode", function(event) {
        event.preventDefault();
        loadImgCode($("#J_stepMailCode"));
    });*/

    //发送邮件按钮click事件
    $(document).on("click", "#J_sendEmailCode", function() {
        var that = $(this);
        var subBtn = $("#J_codeWait");

        var mail = $("input[name=stepTwoMail]");
        var mailName = $.trim($("input[name=stepTwoMail]").val());

        if (mailName != "" && khValidate.chkEmail(mailName)) {
            //显示验证通过
            showTips(mail, "", "ok");

            //变化按钮
            that.hide();
            subBtn.css({
                'display': 'inline-block'
            });

            $.ajax({
                url: cdnConfig.apiPath + '/member/sendemailcode',
                data: {
                    "email": mailName,
                    "type": "3"
                },
                dataType: 'jsonp',
                success: function(res) {

                    if (res.status == "succ") {

                        //倒计时
                        acTime($("#J_subMTimeWrap"), 300);
                        // console.log(res);

                    }
                }
            });
        } else {
            if (mailName == "") {
                showTips(mail, "请输入邮箱！", "no");
                return false;
            } else {
                showTips(mail, "邮箱格式有误！", "no");
                return false;
            }
        }
        //5分钟后显示可以重新发送
        // subTime.sub(300, "#J_subWrap");
        //重置按钮
        // $("#J_sendBtnWrap").html('<a href="javascript:void(0);" class="send-btn gray" target="_blank">发送验证邮件</a>');
        //显示倒计时
        // $("#J_sendMailSub").show();
    });

    /**
     * 修改/设置手机 ========================================================
     * 
     * 修改内容：修改/绑定手机省略步骤一
     * 修改时间：  2015-11-17 10:48:11
     */
    var setPhoneData = {
            "verifyCode": '', //getVerifyCode(),    //表单一的验证码
            "phoneCode": '', //getPhoneCode(),     //表单二的手机验证码
            "phone": '' //表单三需要的手机号码
        }
        // 修改/绑定手机弹窗
    $(".JQ_setPhone").on("click", function(event) {
        var that = $(this);
        //绑定手机弹窗对象
        var setPhoneDialog = new dialogs({
            width: 400,
            fixed: true
        });

        that.hasClass("first") ? setPhoneDialog.title("绑定手机") : setPhoneDialog.title("修改绑定手机");
        // 省略步骤一，直接从步骤二开始
        setPhoneDialog.content(tempaccount('tplSetPhoneTwo', setPhoneData));
        //加载图片验证码
        // loadImgCode($("#J_stepRCode"));
        setPhoneDialog.button([{
                value: '下一步',
                className: 'ui-btns-orange',
                callback: function() {

                    //调用表单二的提交
                    submitFormTwo(setPhoneDialog);
                    return false;
                }
            }, {
                value: '取消',
                className: 'ui-btns-gray',
                callback: function() {

                }
            }])
            .showModal();
    });
    /*
     * 设置／修改手机表单一 的交互
     */
    //提交表单
    /*function submitFormOne(dialog) {

        var setPass = $("input[name=stepPass]");
        var setCode = $("input[name=stepCode]");

        var valSetPass = $.trim($("input[name=stepPass]").val());
        var valSetCode = $.trim($("input[name=stepCode]").val());
        var valReSetCode = $.trim($("#J_stepRCode").html());

        //验证登录密码
        if (valSetPass == "") {
            showTips(setPass, "请输入登录密码！", "no");
            return false;
        } else {
            //验证格式
            if (khValidate.chkPass(valSetPass)) {
                //异步验证密码
                $.ajax({
                    url: cdnConfig.apiPath + '/member/validatepwd',
                    data: {
                        "old_passwd": valSetPass
                    },
                    dataType: 'jsonp',
                    success: function(res) {
                        if (res.status == "succ") {
                            showTips(setPass, "", "ok");
                            //验证验证码

                            verifySetPassCode(setCode, dialog);
                        } else {
                            showTips(setPass, "登录密码输入错误", "no");
                            return false;
                        }
                    }
                });
            } else {
                showTips(setPass, "登录密码输入错误", "no");
                return false;
            }
        }
    }*/

    /**
     *   验证验证码函数
     *   @param  {tar}  要验证的对象，jq对象，如 $("#id"),$(".class")
     *   @param  {dialog}  弹窗对象，用于下一步的模版加载
     */
    /*function verifySetPassCode(tar, dialog) {
        var val = $.trim(tar.val());
        if (val != "") {
            $.ajax({
                url: cdnConfig.apiPath + '/member/getimgcode',
                dataType: 'jsonp',
                success: function(res) {
                    // console.log(res);
                    if (res.status == "succ" && val.toUpperCase() == res.data.code) {
                        //验证码正确
                        showTips(tar, "", "ok");
                        //显示下个验证内容
                        dialog.content(tempaccount('account/tplSetPhoneTwo'));
                        dialog.button([
                            {
                                                        value: '下一步', //暂是处理多次触发~~~~~~~
                                                        className: 'ui-btns-orange ui-btns-orange-none',
                                                        callback: function() {
                                                            //表单2的提交处理
                                                            submitFormTwo(dialog);
                                                            return false;
                                                        }
                                                    }, 
                            {
                                value: '下一步',
                                className: 'ui-btns-orange',
                                id: 'J_SetPhoneThree',
                                callback: function() {
                                    //表单2的提交处理
                                    submitFormTwo(dialog);
                                    return false;
                                }
                            }, {
                                value: '取消',
                                className: 'ui-btns-gray',
                                callback: function() {}
                            }
                        ])
                    } else {
                        showTips(tar, "验证码错误或者已经失效", "no");
                    }
                }
            });
        } else {
            showTips(tar, "请输入验证码", "no");
            return false;
        }
    }*/

    //刷新表单1的图片验证码
    /*$(document).on("click", "#J_getNewCode", function(event) {
        event.preventDefault();

        loadImgCode($("#J_stepRCode"));
    });*/

    /*
     * 设置／修改手机表单二的交互
     */
    function submitFormTwo(dialog) {
        // console.log("sdfdsfdfsdf")
        var setData = {
            "phone": ""
        }
        var stepPhone = $("input[name=stepTwoPhone]");
        var stepCode = $("input[name=stepTwoPhoneCode]");

        var valStepPhone = $.trim($("input[name=stepTwoPhone]").val());
        var valPhoneCode = $.trim($("input[name=stepTwoPhoneCode]").val());
        //验证手机号码格式
        if (valStepPhone != "" && khValidate.chkPhone(valStepPhone)) {
            //验证-手机验证码
            if (valPhoneCode != "" && khValidate.chkNumber(valPhoneCode, 6)) {
                //验证码是否正确
                $.ajax({
                    url: cdnConfig.apiPath + '/member/validateiphonecode',
                    data: {
                        "phoneNum": valStepPhone,
                        "phonecode": valPhoneCode
                    },
                    dataType: 'jsonp',
                    success: function(res) {
                        if (res.status == "succ" && (valPhoneCode == res.data.phonecode)) {
                            setData.phone = valStepPhone;
                            //异步设置/修改邮箱
                            $.post(
                                cdnConfig.my + '/user/bindinfo', {
                                    "type": "phone",
                                    "val": valStepPhone
                                },
                                function(result) {
                                    // conso/le.log(result);
                                    if (result.status == "succ") {
                                        //显示下个验证内容
                                        //显示表单3
                                        dialog.content(tempaccount('tplSetPhoneThree', setData));
                                        dialog.button([{
                                            value: '完成',
                                            className: 'ui-btns-orange',
                                            callback: function() {
                                                dialog.close().remove();
                                                window.location.reload();
                                                // return false;
                                            }
                                        }]);
                                        dialog.showModal();
                                    } else {
                                        //提示错误，重试！
                                        var falseStatus = result.data;
                                        switch (falseStatus) {
                                            case 1:
                                                var modifyDialog = new dialogs({
                                                    title: '提示',
                                                    content: '<p>&nbsp;</p><p class="tc fs-14">您的手机已经绑定过了哦~</p>',
                                                    width: 400,
                                                    height: 60,
                                                    fixed: true,
                                                    button: [{
                                                        value: '确定',
                                                        className: 'ui-btns-orange',
                                                        callback: function() {}
                                                    }]
                                                }).showModal();
                                                break;
                                            case 2:
                                                var modifyDialog = new dialogs({
                                                    title: '提示',
                                                    content: '<p>&nbsp;</p><p class="tc fs-14">修改/设置手机失败，请重试</p>',
                                                    width: 400,
                                                    height: 60,
                                                    fixed: true,
                                                    button: [{
                                                        value: '确定',
                                                        className: 'ui-btns-orange',
                                                        callback: function() {}
                                                    }]
                                                }).showModal();
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                },
                                "json"
                            );
                            return false;
                        } else {
                            showTips(stepCode, "手机验证码输入有误", "no");
                            return false;
                        }
                    }
                });
            } else {
                showTips(stepCode, "手机验证码输入有误", "no");
                return false;
            }
        } else {
            showTips(stepPhone, "请输入正确的手机号码", "no");
            return false;
        }
        return false;
    }
    var sendCodeClickNum = 0;

    //发送手机验证码
    $(document).on("click", "#J_getPhoneCode", function(event) {
        event.preventDefault();

        var setPhone = $("input[name=stepTwoPhone]");
        var setPhoneCode = $("input[name=stepTwoPhoneCode]");
        var valPhoneCode = $.trim($("input[name=stepTwoPhoneCode]").val());
        var phoneVal = $.trim(setPhone.val());

        if (phoneVal == "" || !khValidate.chkPhone(phoneVal)) {
            showTips(setPhone, "请输入手机号码", "no");
            return false;
        } else {
            $.ajax({
                url: cdnConfig.apiPath + '/member/checkphone',
                data: {
                    "phone": phoneVal,
                    "h": $("#security").val(),
                    "m": $("#security").attr('name')
                },
                dataType: 'jsonp',
                jsonp: "callback",
                success: function(res) {
                    if (res.status == 'succ') {
                        if (sendCodeClickNum >= 3) {
                            showTip(setPhone, '您本次发送手机验证码次数已经用完,请刷新页面重试.', 'no');
                            return;
                        } else {
                            sendCodeClickNum++;
                        };
                        refreshKey(res.pin);
                        //重置获取手机验证码按钮
                        $("#J_getPhoneCode").hide();
                        $("#J_codeWait").css({
                            "display": "inline-block"
                        });
                        //
                        $("#J_getPhoneCode").hide();
                        $("#J_codeWait").css({
                            "display": "inline-block"
                        });
                        //倒计时
                        acountSubTime($("#J_subTimeWrap"), 60, $("#J_getPhoneCode"), $("#J_codeWait"));

                        //发送验证码
                        $.ajax({
                            url: cdnConfig.apiPath + '/member/sendphonecode',
                            data: {
                                "phone": phoneVal,
                                "type": 4,
                                "h": $("#security").val(),
                                "m": $("#security").attr('name'),
                                "n": sendCodeClickNum,
                                "r": Math.random()
                            },
                            dataType: 'jsonp',
                            jsonp: 'callback',
                            success: function(res) {
                                if (res.status == "succ") {
                                    showTips(setPhone, '手机验证码已经发送到您的手机', 'ok');
                                    setPhoneCode.attr("data-value", res.data.phonecode);
                                } else {
                                    showTips(setPhoneCode, '手机验证已经发送失败，请重试', 'no');
                                }
                                refreshKey(res.pin);
                            }
                        });
                    } else {
                        //已存在的的用户
                        showTips(setPhone, "此手机号已经被注册，请更换其他手机号", "no");
                    }
                    refreshKey(res.pin);
                }
            });
        }
    });


    //刷新页面的key
    function refreshKey(str) {
        var tar = $("#security");
        tar.val(str[1]);
        tar.attr("name", str[0]);
    }
    /*
     * 页面通用函数 ====================================================
     */
    //加载验证码
    function loadImgCode(dom) {
        var randNum = Math.random();
        imgURL = cdnConfig.apiPath + '/member/imgcode?type=registercode' + '&v=' + randNum;

        dom.attr("src", imgURL);
    }
    /*
     *   通用提示信息函数
     *   @param {obj}  要提示的对象容器
     *
     *   修改内容：1.type不提供时，显示默认提示;
     *             2.对象聚焦时根据name属性显示内容;
     *   修改时间：2015-11-19 10:03:14
     *   修改人：yansiwen
     */
    function showTips(obj, text, type) {

        var tarDOM = obj.parent();
        var tipDOM = tarDOM.siblings("p.edit-pass-tip");

        var TipHtml = '<i class="icon-tip-wrong"></i><span class="fc-c13">' + text + '</span>';
        var okTip = '<span class="fc-c13">' + text + '</span>';
        var okHtml = '<i class="icon-tip-ok tip-ok"></i>';
        switch (type) {
            case 'no':
                tarDOM
                    .addClass("error")
                    .find(".tip-ok")
                    .remove();

                tipDOM.html(TipHtml);

                break;
            case 'ok':
                tarDOM
                    .find(".tip-ok")
                    .remove()
                    .end()
                    .removeClass("error")
                    .append(okHtml);
                if(text != "") {
                    tipDOM.html('<span>' + text + '</span>');
                    break;
                }
                tipDOM.html(okTip);

                break;
            default:
                tarDOM
                    .removeClass("error");

                tipDOM.html(text);
                break;
        }
        //focus
        obj.on("focus", function(event) {
            /*tipDOM.html("");

            tarDOM
                .removeClass("error")
                .find(".tip-ok")
                .remove();*/
            
            tarDOM.removeClass("error").find(".tip-ok").remove();
            if(obj.attr("name") == "new_passwd") {
                tipDOM.html("请设置6-20位数字、字母或符号的新密码（不包括空格）");
            } else {
                tipDOM.html("");
            }
        });
    }
    /*
     *  倒计时函数－新
     */
    function acountSubTime(obj, t, tar_1, tar_2) {
        var tempT = t;
        var timer = setInterval(function() {

            if (t <= 0) {
                clearInterval(timer);
                tar_1.show();
                tar_2.hide();
                obj.html(tempT);
            } else {
                t = t - 1;
                obj.html(t);
            }
        }, 1000);
    }
    /*
     *  发送邮箱验证码倒计时
     */
    function acTime(obj, t) {
        var timer = setInterval(function() {

            if (t <= 0) {
                clearInterval(timer);
                $("#J_sendEmailCode").html("重发邮箱验证码").show();
                $("#J_codeWait").hide();
            } else {
                t = t - 1;
                obj.html(t);
            }

        }, 1000);
    }

});
