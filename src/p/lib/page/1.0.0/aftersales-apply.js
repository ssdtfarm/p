define(function(require, exports, module) {

    /*
     * 这里首先让右边加载完毕，然后再加载左边菜单
     */
    document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

    //加载依赖
    var dialog      =  require('../../components/dialog/1.0.0/dialog');
    var khValidate  =  require('../../components/khValidate/1.0.0/khValidate');
    var khSelect    =  require('../../components/khSelect/1.0.0/khSelect');
    require("../../components/kindeditor/4.1.0/kindeditor");
    var tempcomment = require('../../template/tempcomment');
    var minBar = require('../../components/minBar/1.0.1/minBar');

    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell   : '#J_minBar',
        pathConfig : cdnConfig,
        tpl        : tempcomment,
        tplName    : "tplMinBar",
        data       : _globalConfig.minBar.data
    });

    /* 按需加载js */
            /*
             * 上传图片按钮 ====================================
             */
            addEvent($("#J_uploadBtn"), "click");
            $("#J_uploadBtn").removeClass("btn-130x30");
            /*
             * 凭证图片删除 和 放大  ===========================================
             */
            var picNum = 3; // 定义可上传的图片数
            $(document).on("click", ".JQ_delPic", function (e) {

                var that = $(this);

                var confirmDialog = new dialog({
                    title: '提示',
                    content: '<p>&nbsp;</p><p class="tc">是否要删除图片？</p>',
                    width: 400,
                    height: 60,
                    fixed: true,
                    button: [
                        {
                            value: "确定",
                            className: "ui-btns-orange",
                            callback: function () {

                                //删除前端图片
                                that.parents(".JQ_pictureItem").remove();

                                /* 提示框 */
                                var okDialog = new dialog({
                                    fixed: true,
                                    content: '<p>&nbsp;</p><p class="tc">删除成功！</p>'
                                }).showModal();
                                setTimeout(function () {
                                    okDialog.close().remove();
                                }, 500);
                                //删除成功 检测是否上传按钮不可用，不可用时重新绑定事件
                                if ($("#J_uploadBtn").hasClass("btn-gray")) {
                                    $(".ke-button").html("上传图片");
                                    $(".ke-inline-block").show();
                                    $("#J_uploadBtn").hide();
                                    // addEvent(K("#J_uploadBtn"), "click");
                                }
                            }
                        },
                        {
                            value: "取消",
                            className: "ui-btns-gray",
                            callback: function () {
                            }
                        }
                    ]
                }).showModal();
            });

            /*
             * 上传按钮绑定事件和解除事件 ======================================
             */
            /* 上传按钮增加事件 */
            function addEvent(obj, type) {
                /* 是否不可用 */
                if (obj.hasClass("btn-gray")) {
                    obj.removeClass("btn-gray")
                        .addClass("btn-orange")
                        .css({
                            "cursor": "pointer"
                        });
                }
                //调用kineditor控件
                KindEditor.ready(function (K) {
                    // console.log("1111")
                    // $('.ke-button').val("上传图片");
                    var uploadbutton = K.uploadbutton({
                        button: K('#J_uploadBtn')[0],
                        fieldName: 'localUrl',
                        title: '上传图片',
                        url: 'http://my.kinhom.com/upload/ajaxUpload?dir=image&domain=1',
                        afterUpload: function (data) {
                            if (data.error === 0) {
                                var itemHtml = '<li class="JQ_pictureItem">'
                                    + '<img src="' + data.domain + data.url + '!small" width="100" height="80" />'
                                    + '<span class="item-mark">'
                                    + '<a href="javascript:void(0);" class="icon-refund-delete JQ_delPic">删除</a>'
                                    + '<a href="' + data.domain + data.url + '!small" class="icon-refund-find JQ_blowUpPic" target="_blank">放大</a>'
                                    + '</span>'
                                    + '</li>'
                                $("#J_itemPicWrap").append(itemHtml);

                                var len = $("#J_itemPicWrap").find("li").length;
                                if (len >= picNum) {
                                    deleteEvent($('#J_uploadBtn'), "click");
                                }
                            } else {
                                var upDialog = new dialog({
                                    title: '提示',
                                    content: '<p>&nbsp;</p><p class="tc fs-14 fc-333">每张图片大小不超过5M，最多3张<br />仅支持GIF、JPG、PNG、BMP格式</p>',
                                    width: 400,
                                    height: 60,
                                    fixed: true,
                                    button: [
                                        {
                                            value: '确定',
                                            className: 'ui-btns-orange',
                                            callback: function () {
                                            }
                                        }
                                    ]
                                }).showModal();
                            }
                        },
                        afterError: function (str) {
                            // alert('自定义错误信息: ' + str);
                        }
                    });
                    uploadbutton.fileBox.change(function (e) {
                        uploadbutton.submit();
                    });
                });
                // console.log("22222");
                // $('.ke-button').val("上传图片");
            }

            /* 解除事件绑定 */
            function deleteEvent(obj, type) {
                obj.removeClass("btn-orange")
                    .addClass("btn-gray")
                    .css({
                        "cursor": "default"
                    });
                $(".ke-inline-block").hide();
                $("#J_uploadBtn").show();
                obj.unbind(type);
            }

            /*
             * 菜单选择事件 =========================================
             */
            //选择售后类型
            khSelect({
                mainCell: "J_selectType",
                callback: function (value) {
                    if (value > 1) {
                        $("#J_refoudAmountTr").hide();
                    } else {
                        $("#J_refoudAmountTr").show();
                    }
                }
            });
            //选择售后原因
            khSelect({
                mainCell: "J_selectReason"
            });

            /*
             * 表单提交事件 ==========================================
             */
            /* 提示框 */
            var tipDialog = dialog({align: 'right'});
            /* 提交事件 */
            $("#J_submitBtn").on("click", function (e) {
                var applyType = $("input[name=custome_type]");  //服务类型
                var applyReson = $("input[name=custome_reason]");  //申请原因
                var applyAmount = $("input[name=custome_price]");  //申请金额
                var applyNode = $("textarea[name=custome_info]");  //申请说明

                /* 验证服务类型 */
                if (applyType.val() == "") {
                    var tipDialog = new dialog({
                        align: 'right',
                        content: '<span class="fc-f60">请选择服务类型</span>'
                    });
                    tipDialog.show(document.getElementById("J_applyType"));

                    hideDialog(tipDialog, 2000);
                    return false;
                }
                /* 验证原因 */
                if (applyReson.val() == "") {
                    var reasonDialog = new dialog({
                        align: 'right',
                        content: '<span class="fc-f60">请选择退款/售后原因</span>'
                    })

                    reasonDialog.show(document.getElementById("J_applyReason"));

                    hideDialog(reasonDialog, 2000);
                    return false;
                }

                /* 需要输入金额时 验证输入的金额*/
                if (applyType.val() <= 1) {
                    //console.log($("#J_refoudAmount"));
                    var amountDialog = new dialog({
                        align: 'right',
                        content: '<span class="fc-f60">金额不能为空</span>'
                    })
                    if (applyAmount.val() == "") {

                        amountDialog.show(document.getElementById("J_applyAmount"));

                        hideDialog(amountDialog, 2000);  //隐藏弹框

                        return false;

                    } else {
                        if (isNaN(applyAmount.val())) {
                            amountDialog.content('<span class="fc-f60">金额只能为数字</span>');
                            amountDialog.show(document.getElementById("J_applyAmount"));
                            hideDialog(amountDialog, 2000);  //隐藏弹框
                            return false;
                        } else {
                            if (applyAmount.val() > parseFloat($("#J_Amount").html())) {
                                amountDialog.content('<span class="fc-f60">最多' + $("#J_Amount").html() + '元!</span>');
                                amountDialog.show(document.getElementById("J_applyAmount"));
                                hideDialog(amountDialog, 2000);  //隐藏弹框
                                return false;
                            }
                            if (!khValidate.chkPrice(applyAmount.val())) {
                                amountDialog.content('<span class="fc-f60">金额格式不对!</span>');
                                amountDialog.show(document.getElementById("J_applyAmount"));
                                hideDialog(amountDialog, 2000);  //隐藏弹框
                                return false;
                            }
                        }
                    }
                }

                /* 验证备注 */
                if (applyNode.val() == "") {
                    var noteDialog = new dialog({
                        align: 'right',
                        content: '<span class="fc-f60">说明不能为空</span>'
                    });
                    noteDialog.show(document.getElementById("J_applyNode"));
                    hideDialog(noteDialog, 2000);  //隐藏弹框

                    return false;
                }

                $(this).parents("form").submit();
                //console.log(khValidate.chk)
            });
            /* 定时关闭 */
            function hideDialog(obj, time) {
                setTimeout(function () {
                    obj.close();
                }, time)
            }

            /*
             * 备注内容字数计算 ========================================================
             */
            var noteObj = $("#J_applyNode");
            var objText = noteObj.find("textarea");
            var target = noteObj.find(".JQ_charCount");
            //默认计算文字长度
            target.html(200 - objText.val().length);
            //按下计算文字长度
            objText.on("keyup", function (e) {
                var reg = new RegExp("[~!#$%^&*【】\\[\\]\\<\\>+]", "gi");

                var str = $(this).val();
                var len = 200 - $(this).val().length;
                if (len <= 0) {
                    target.html(0);
                    $(this).val(str.substr(0, 200));
                } else {
                    $(this).val(str.replace(reg, ""));
                    target.html(len);
                }
            });
        //});
    //});

});