define(function(require, exports, module) {
    /*===============================*/
    /*  我的返利小店js文件
     *  @author zhangzhensheng
     *  @date   2016-04-06 
     *
     *  editor ljrong
     *  date 2016-04-06
     /* ==============================*/

    var dialog = require('../components/dialog/1.0.0/dialog');
    var temprebate = require('../template/temprebate');
    /*
     * 编辑店名
     */
    $(document).on("click", "#J_edit", function() {
        var input = $("#J_inputname");
        var span = $("#J_shopname");
        var pen = $("#J_edit");
        var name = span.html();
        // 保存店名的接口
        var apiEditShopName = function(name) {
            $.ajax({
                url: '/shop/editshopname',
                dataType: 'json',
                data: {
                    shopName: name
                }
            })
            .done(function(res) {
                console.log( res );
            })
            .fail(function(res) {
                console.log("/shop/editshopname error");
            }); 
        };
        // 判断店名是否合法
        var isLegalShopName = function(name) {
            var reg = /^[\u2E80-\u9FFF|0-9|a-zA-Z]{0,10}$/;
            return reg.test(name);
        };
        // 切换输入状态
        if ($("#J_inputname").is(":hidden")) {
            span.hide();
            pen.hide();
            input.show().focus();
            input.val(input.val());
        }
        $("#J_inputname").on("blur", function(event) {
            if (!isLegalShopName(input.val())) {
                return false;
            }
            span.html(input.val()).show();
            pen.show();
            input.hide();
            $("#J_inputname").unbind();
            if (name != input.val()) {
                apiEditShopName(input.val());
            }
        });
    });
    /*
     * 收藏商品
     */
    $(document).on("click", ".J_fav", function(event) {
        event.preventDefault();
        var self = $(this);
        var id = $(this).attr('data-id');
        //显示弹框函数
        var showFavoriteDialog = function(data) {
            var dHtmlHead = '<p>&nbsp;</p><p class="tc fs-14">';
            var dHtmlFoot = '</p>';

            //弹窗
            var d = new dialog({
                title: '提示',
                width: 400,
                height: 80,
                fixed: true,
                zIndex: 198502
            });
            switch (data.status) {
                //加入收藏成功
                case 'succ':
                    self.addClass("on");
                    d.button([{
                        value: '查看收藏夹',
                        className: 'ui-btns-orange',
                        callback: function() {
                            //跳转到收藏夹
                            window.location.href = '';
                        }
                    }, {
                        value: '继续逛逛',
                        className: 'ui-btns-blue',
                        callback: function() {}
                    }]);
                    d.content(dHtmlHead + data.msg + dHtmlFoot);
                    d.showModal();
                    break;
                case 'nologin':
                    d.button([{
                        value: '去登录',
                        className: 'ui-btns-orange',
                        callback: function() {
                            //去登录页面
                            window.location.href = cdnConfig.my + '/passport/login';
                        }
                    }, {
                        value: '继续逛逛',
                        className: 'ui-btns-blue',
                        callback: function() {}
                    }]);
                    d.content(dHtmlHead + data.msg + dHtmlFoot);
                    d.showModal();
                    break;
                case 'failed':
                    //$(".fav").addClass("on");
                    d.button([{
                        value: '好的',
                        className: 'ui-btns-orange',
                        callback: function() {}
                    }]);
                    d.content(dHtmlHead + data.msg + dHtmlFoot);
                    d.showModal();
                    break;
                default:
                    d.button([{
                        value: '好的',
                        className: 'ui-btns-orange',
                        callback: function() {}
                    }]);
                    d.content(dHtmlHead + data.msg + dHtmlFoot);
                    d.showModal();
                    break;
            }
        };
        //异步请求
        $.ajax({
            url: cdnConfig.apiPath + '/favorite/add/'+id,
            dataType: 'jsonp',
            success: function(res) {
                if (res.status == "succ") {
                    showFavoriteDialog(res.data);
                }
            }
        });
    });
    /*
     * 设置主推
     */
    $(document).on("click", ".j_setMainGood", function(){
        var self = this;
        var id = $(this).attr('data-id');
        // 设置主推
        var setMain = function(){
            $.ajax({
                url: '/shop/recommend',
                dataType: 'json',
                data: {
                    skuId: id 
                }
            })
            .done(function(res) {
                if(res.code == 200) {
                     $(self).addClass("setted").removeClass("btn j_setMainGood").html("已主推");
                } else if(res.code == 400) {
                    console.log(res);
                    showCancelMainDialog(res);
                }
            })
            .fail(function() {
                console.log("/shop/recommend error");
            });
        };
        setMain();
        // 取消主推 
        var cancelMain = function(){
            $(".J_cancelMain").on("click", function(){
                var self = this;
                var iid = $(this).attr('data-id');

                $.ajax({
                    url: '/shop/cancelrecommend',
                    dataType: 'json',
                    data: {
                        skuId: iid 
                    }
                })
                .done(function(res) {
                    console.log(res);
                    if(res.code == 200) {
                        $(self).addClass("btn-gray").removeClass("btn-orange").html("已取消");
                        $('.rebate-popular li').each(function() {
                            var pid = $(this).attr('data-id');
                            if(pid == iid) {
                                $(this).find('.setted').html('设为主推').removeClass('setted').addClass('btn j_setMainGood');
                            }
                        });
                    }
                })
                .fail(function() {
                    console.log("/shop/recommend error");
                });   
            });
        };
        // 取消主推的弹框
        var showCancelMainDialog = function(res){
            // 模板要加数据
            var listStr = temprebate("tplSetMainDialog", res);
            var tipsDialog = new dialog({
                title: '提示',
                content: listStr,
                width: 474,
                height: 524,
                fixed: true,
                zIndex: 198502,
                button: [{
                    value: '确定',
                    className: 'ui-btns-orange',
                    callback: function() {}
                }, {
                    value: '取消',
                    className: 'ui-btns-cancel',
                    callback: function() {}
                }]
            }).showModal();
            cancelMain();
        };
    });
    $(document).on('click', '.recommend-list .btn', function(){
        var self = $(this);
        var id = self.attr('data-id');
        var parent = self.parents('li');
        self.off();

         $.ajax({
            url: '/shop/add',
            dataType: 'json', 
            data: {
                skuId: id
            }
        })
        .done(function(res) {
            if(res.code == 200) {
                self.removeClass('btn').html('取消加入').addClass('cancel');
                parent.addClass('selected');
            } else {
                console.log(res);
            }
        })
        .fail(function() {
            console.log("/shop/add error");
        });
    });
    $(document).on('click', '.recommend-list .cancel', function(){
        var self = $(this);
        var id = self.attr('data-id');
        var parent = self.parents('li');
        self.off();

         $.ajax({
            url: '/shop/delete',
            dataType: 'json',
            data: {
                skuId: id
            }
        })
        .done(function(res) {
            if(res.code == 200) {
                parent.removeClass('selected');
                self.removeClass('cancel').html('加入小店').addClass('btn');


                $('.rebate-popular li').each(function() {
                    var pid = $(this).attr('data-id');
                    if(pid == id) {
                        $(this).remove();
                    }
                });
                
            } else {
                console.log(res);
            }
        })
        .fail(function() {
            console.log("/shop/add error");
        });
    });
});
