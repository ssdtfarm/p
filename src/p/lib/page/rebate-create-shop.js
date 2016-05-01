define(function(require, exports, module){
    /**
     *  ---------------------------------------------
     *      创建返利小店 
     *      author : ljrong
     *      date   : 2016-04-07
     *  ---------------------------------------------
     */
    //属性选择跳转
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    };
    var dialog = require('../components/dialog/1.0.0/dialog');
    var temprebate = require('../template/temprebate');
    $(function(){   
         var secondCats = {};
        //设置店铺名称，限10个字内, 设置个性域名
        !(function(){ 
            $('.j_shopName').on('keyup onpaste', function(){
                var self = $(this),
                    val = self.val();

                if(val.length > 10) {
                    self.val(val.substr(0,10));
                }

                $('.j_shopNameCur').html(self.val().length);
            });
            $('.j_shopName').on('blur', function(){
                var self = $(this),
                    val = self.val();


                if($.trim(val) != '') {
                    checkshopname(val, function(res){
                        if(res.code != 200) {
                            alert(res.message);
                        }
                    });
                }
                     
            });
            $('.j_shopWebUrl').on('keyup onpaste', function(){
                var self = $(this),

                    val = self.val();

                val = val.replace(/[^\w]+/g, '');
                self.val(val);
                
                if(val.length > 20) {
                    self.val(val.substr(0,20));
                }

                $('.j_shopWebUrlCur').html(self.val().length);
            });

             $('.j_shopWebUrl').on('blur', function(){
                var self = $(this),
                    val = self.val();

                if($.trim(val) != '') {
                    checkAlias(val, function(res){
                        if(res.code != 200) {
                            alert(res.message);
                        }
                    });
                }
                     
            });
        })();

        //选择模板
        !(function(){
            $('.style-type').on('click', function(){
                $(this).addClass('selected').siblings('.style-type').removeClass('selected');
            });
        })();

        //自定义下拉  
        !(function() {
            $(document).on('click', '.selector',function(e) {
                e.stopPropagation();
                $('.j_selector').removeAttr('data-open')
                    .find('.list').slideUp('fast')
                    .end()
                    .find('.triangle').removeClass('triangle-up-active');

                var self = $(this),
                    tit = self.find('.title'),
                    triangle = self.find('.triangle'),
                    input = self.find('.selector-input'),
                    list = self.find('.list'),
                    li = self.find('li');

                function setDef() { 
                    self.removeAttr('data-open');
                    list.slideUp('fast');
                    triangle.removeClass('triangle-up-active');
                }

                function setOpen() {
                    self.attr('data-open', true);
                    list.slideDown();
                    triangle.addClass('triangle-up-active');
                }

                if (!self.attr('data-open')) {
                    setOpen();
                } else {
                    setDef();
                }

                li.on('click', function(e) {
                    e.stopPropagation();
                    tit.html($(this).find('a').html());
                    setDef();
                });

            });

            $(document).on('click', function(e) {
                $('.selector').removeAttr('data-open')
                    .find('.list').slideUp('fast')
                    .end()
                    .find('.triangle').removeClass('triangle-up-active');
            })
        })();

        //设置主推商品
        !(function(){
            $(document).on('click', '.j_setMainGood', function(){

                if($('.side li.selected').length == 4) {
                    var tipsDialog = new dialog({
                        title: '提示',
                        content: '<p class="tips-title">已设置了4个主推商品,如需设置，请先删除现有的主推商品。</p>',
                        width: 474,
                        height: 100,
                        fixed: true,
                        zIndex: 198502,
                        button: [{
                            value: '确定',
                            className: 'ui-btns-orange',
                            callback: function() {
                            }
                        }, {
                            value: '取消',
                            className: 'ui-btns-cancel',
                            callback: function() {}
                        }]
                    }).showModal();
                    return;
                }

                var self = $(this), 
                    parent = self.parents('li'),
                    id = self.attr('data-id'),
                    html = '';

                $.ajax({
                    url: '/shop/recommend',
                    dataType: 'json',
                    data: {
                        skuId: id 
                    }
                })
                .done(function(res) {
                    console.log(res);
                    if(res.code == 200) {
                        setRecommend();
                    }
                })
                .fail(function() {
                    console.log("/shop/recommend error");
                });
                
                
                function setRecommend() {
                    var  tplData = {
                            tit: parent.find('.good-title').html(),
                            price: parent.find('.price').html(),
                            rebatePprice: parent.find('.rebate-price strong').html(),
                            id: id,
                            imgURL: parent.find('img').attr('src'),
                            goodLink: parent.find('a').attr('href'),
                        }; 
                    html = temprebate('tplRebateAddMainGood', tplData);

                    $('.side .list .empty').eq(0).removeClass('empty').addClass('selected  fade-in').html(html);

                    setTimeout(function(){
                        $('.fade-in').animate({
                            opacity: 1}, 
                            1000, function() {
                                $('.fade-in').removeClass('fade-in');
                        });
                    }, 10);
                    

                    self.off();
                    parent.addClass('selected');
                    self.html('已主推');
                    self[0].className = 'setted';
                }
            });
        })();

        //删除返利商品
        !(function(){ 
            $('.j_delGood').on('click', function(){ 
                var self = $(this),
                    id = self.attr('data-id');

            var tipsDialog = new dialog({
                title: '提示',
                content: '<p class="tips-title">确认删除该商品？</p>',
                width: 474,
                height: 100,
                fixed: true,
                zIndex: 198502,
                button: [{
                    value: '确定',
                    className: 'ui-btns-orange',
                    callback: function() {
                        delAjax();
                    }
                }, {
                    value: '取消',
                    className: 'ui-btns-cancel',
                    callback: function() {}
                }]
            }).showModal();

            function delAjax(){
                $.ajax({
                    url: '/shop/delete',
                    dataType: 'json',
                    data: {
                        skuId: id
                    }
                })
                .done(function(res) {
                    if(res.code == 200) {
                        self.parent().html('').fadeOut('800', function(){
                            self.parent().remove();
                        });

                        $('.side .selected').each(function() {
                            var that = $(this),
                                iid = that.attr('data-id'),
                                idx = that.index();
                                
                                if(iid == id) {
                                    that.html('主推'+(idx*1+1)).removeClass('selected').addClass('empty');
                                }
                        });

                    } else {
                        console.log(res)
                    }
                })
                .fail(function() {
                    console.log("/shop/add error");
                });
            }
                
            });
        })();

        //取消主推商品
        !(function(){
            $(document).on('click', '.j_delMainGood', function(){
                var self = $(this),
                    id = self.attr('data-id'),
                    parent = self.parent().parent(),
                    idx = parent.index();

                var tipsDialog = new dialog({
                    title: '提示',
                    content: '<p class="tips-title">确认删除该主推商品？</p>',
                    width: 474,
                    height: 100,
                    fixed: true,
                    zIndex: 198502,
                    button: [{
                        value: '确定',
                        className: 'ui-btns-orange',
                        callback: function() {
                            delAjax();
                        }
                    }, {
                        value: '取消',
                        className: 'ui-btns-cancel',
                        callback: function() {}
                    }]
                }).showModal();   


                function delAjax() {
                    $.ajax({
                        url: '/shop/cancelrecommend',
                        dataType: 'json',
                        data: {
                            skuId: id 
                        }
                    })
                    .done(function(res) {
                        console.log(res);
                        if(res.code == 200) {
                            cancelrecommend();
                        }
                    })
                    .fail(function() {
                        console.log("/shop/recommend error");
                    });
                }

                function cancelrecommend() {
                    parent.html('主推'+(idx*1+1)).removeClass('selected').addClass('empty');
                    $('.main .item').each(function() {
                        var that = $(this),
                            iid = that.attr('data-id'),
                            btn = that.find('.setted');
                            if(iid == id) {
                                that.removeClass('selected');
                                btn.html('设为主推');
                                btn[0].className = 'btn j_setMainGood';
                            }
                    });
                }
                
            });
        })();

        //获取二级分列数据  以及初始化已选择二级分类，初始化返利区间、价格区间
        !(function(){ 
            var catId = getUrlParam('catId'),
                priceRange = getUrlParam('priceRange'),
                rebateRange = getUrlParam('rebateRange'),
                secondCatsData = {},
                priceRangArray = [null, '0-1000', '1000-3000', '3000-5000', '5000-10000', '10000以上'],
                rebateRangeArray = [null, '10%以下', '10%-20%', '20%-30%', '30以上'];

            $.ajax({  
                url: '/shop/shopcats',
                dataType: 'json'
            })
            .done(function(res) {
                if(res.code == 200) {
                    secondCats = res.data;
                    //已有catId时
                    if(catId) {
                        var parentId = $('.j_selector').eq(0).attr('data-parentId');
                        
                        $('.j_selector').eq(0).find('li a').each(function() {
                            var thatA = $(this);
                            var id = thatA.attr('data-id');
                            if(id == parentId) {
                                $('.j_selector').eq(0).find('.title').html(thatA.html());
                            }
                        });


                        secondCatsData.list = secondCats[parentId];
                        $('#secondCats').show().html( temprebate('tplSecondCatsSelect', secondCatsData) );

                        for( var i=0; i<secondCats[parentId].length; i++) {
                            if(secondCats[parentId][i].catId == catId) {
                                $('#secondCats .title').html(secondCats[parentId][i].name);
                            }
                        }
                        
                    }
                }
            })
            .fail(function(res) {
                console.log("shop/shopcats error");
            }); 
 
            
            //选择一级菜单，显示二级对应的菜单
            $('.j_selector').eq(0).find('li a').on('click', function(){
                var self = $(this),
                    id = self.attr('data-id');
                         
                secondCatsData.list = secondCats[id];
                $('#secondCats').show().html( temprebate('tplShopCreateCats', secondCatsData) );
            });

            //初始化已有的返利区间
            if(rebateRange) {
                $('.j_rebateSelector .title').html(rebateRangeArray[rebateRange]);
            }
            //返利区间跳转
            $('.j_rebateSelector a').on('click', function(){
                var self = $(this),
                    id = self.attr('data-id'),
                    url = window.location.href; 
                    
                if (rebateRange == null) {
                    if(url.indexOf('?') == -1) {
                        window.location.href = url + '?rebateRange=' + id
                    } else {
                        window.location.href = url + '&rebateRange=' + id;
                    }
                } else {
                    window.location.href = url.replace(/(&?rebateRange=)(\d{1})/, function() {
                        return RegExp.$1 + id;
                    })
                }
            });
        })();

        //排序跳转
        !(function(){
            var catId = getUrlParam('catId'),
                priceRange = getUrlParam('priceRange'),
                rebateRange = getUrlParam('rebateRange'),
                key = getUrlParam('key'),
                order = getUrlParam('order');

                if(key &&　key != 'recommend') {
                    $('.nav-sort dd').removeClass('cur');
                    switch (key) {
                        case 'inviter_rate' : 
                            if(order == 'desc') {
                                $('.nav-sort dd').eq(3).addClass('cur');
                                $('.j_rebatDsc').addClass('triangle-down-active');
                            } else if( order == 'asc') {
                                $('.j_rebateAsc').addClass('triangle-up-active');
                            }
                        break;
                        case 'current_price' :
                            if(order == 'desc') {
                                $('.nav-sort dd').eq(2).addClass('cur');
                                $('.j_priceDsc').addClass('triangle-down-active');
                            } else if( order == 'asc') {
                                $('.j_priceAsc').addClass('triangle-up-active');
                            }
                        break;
                        case 'hot' : 
                            $('.nav-sort dd').eq(1).addClass('cur');
                        break;
                    }
                }
                
                if(order == 'desc') {

                    order = 'asc';
                } else { 
                    order = 'desc';
                }



            var url = location.protocol + '//' + location.host + location.pathname;

            function go(catId, rebateRange, priceRange, hot, recommend, current_price, inviter_rate, order) {
                var catIdTxt = 'catId=';
                var rebateRangeTxt = '&rebateRange=';
                    if(!catId)  rebateRangeTxt =  'rebateRange=';

                var priceRangeTxt = '&priceRange=';
                     if(!catId && !rebateRange )  priceRangeTxt =  'priceRange=';

                var hotTxt = '&key=';
                if(!catId && !rebateRange && !priceRange)  hotTxt =  'key=';   
                var recommendTxt = '&key=';
                    if(!catId && !rebateRange && !priceRange)  recommendTxt =  'key=';
                var current_priceTxt = '&key=';
                    if(!catId && !rebateRange && !priceRange)  current_priceTxt =  'key=';
                var inviter_rateTxt = '&key=';
                    if(!catId && !rebateRange && !priceRange)  inviter_rateTxt =  'key=';
                var orderTxt = '';

                catId == null ? catIdTxt = '' : catIdTxt += catId;
                rebateRange == null ? rebateRangeTxt = '' : rebateRangeTxt += rebateRange;
                recommend == null ? recommendTxt = '' : recommendTxt += recommend;
                hot == null ? hotTxt = '' : hotTxt += hot;
                priceRange == null ? priceRangeTxt = '' : priceRangeTxt += priceRange;
                current_price == null ? current_priceTxt = '' : current_priceTxt += current_price;
                inviter_rate == null ? inviter_rateTxt = '' : inviter_rateTxt += inviter_rate;

                if(order) orderTxt = '&order='+order;



                window.location.href = url + '?'+ catIdTxt + rebateRangeTxt +  priceRangeTxt + hotTxt + recommendTxt + current_priceTxt + inviter_rateTxt + orderTxt;
            }

            //移除选择条件
            $('.nav-sort dd').on('click', function() {

                var self = $(this);
                var str = self.html();
                var id = self.attr('data-id');
                var type = self.attr('data-type');

                switch (type) {
                    case 'recommend':
                        go(catId, rebateRange, priceRange, null, 'recommend', null, null, order);
                        break;
                    case 'hot':
                        go(catId, rebateRange, priceRange, 'hot', null, null, null, order)
                        break;
                    case 'current_price':
                        go(catId, rebateRange, priceRange, null, null, 'current_price', null, order)
                        break;
                    case 'inviter_rate':
                        go(catId, rebateRange, priceRange, null, null, null, 'inviter_rate', order)
                        break;
                }

            });
        })();

        //上下页切换
        !(function() {
            var next = $('.nav-sort .next-page');
            var prev = $('.nav-sort .prev-page');
            var now = $('.nav-sort .page-now');
            var all = $('.nav-sort .page-all');

            var curpage = getUrlParam('curpage');
            var url = window.location.href;
            
            if (now.html() * 1 != all.html() * 1) {
                next.addClass('page-active');
            }

            next.on('click', function() {
                if (now.html() * 1 < all.html() * 1) {
                    if (curpage == null) {
                        if(url.indexOf('?') == -1) {
                            window.location.href = url + '?curpage=' + (now.html() * 1 + 1)
                        } else {
                            window.location.href = url + '&curpage=' + (now.html() * 1 + 1)
                        }
                    } else {
                        window.location.href = url.replace(/(&?curpage=)(\d{1,3})/, function() {
                            var str = RegExp.$2 * 1 + 1;
                            return RegExp.$1 + str;
                        })
                    }
                }
            });

            if (now.html() * 1 != 1) {
                prev.addClass('page-active');
            }
            prev.on('click', function() {
                if (now.html() * 1 > 1) {
                    if (curpage == null) {
                        window.location.href = url + '&curpage=' + (now.html() * 1 + 1)
                    } else {
                        window.location.href = url.replace(/(&?curpage=)(\d{1,3})/, function(match, p1, p2) {
                            var str = p2 * 1 - 1;
                            return p1 + str;
                        })
                    }
                }
            });
        })();

        //验证唯一个性域名
        function checkAlias(aliasStr, callback) {
            $.ajax({
                url: '/shop/checkalias',
                dataType: 'json',
                data: {
                    alias: aliasStr 
                }
            })
            .done(function(res) {
                callback && callback(res);
            })
            .fail(function() {
                console.log("/shop/checkalias error");
            });
        }
        //验证店铺名
        function checkshopname(shopName, callback) {
            $.ajax({
                url: '/shop/checkshopname',
                dataType: 'json',
                data: {
                    shopName: shopName 
                }
            })
            .done(function(res) {
                callback && callback(res);
            })
            .fail(function() {
                console.log("/shop/checkshopname error");
            });
        }

        //保存设置
        !(function(){
            $('.save-change').on('click', function(){

                var flagArray = [false, false];
                var shopName = $('.j_shopName');
                var shopUrl = $('.j_shopWebUrl');

                if(shopName.length) {
                    if(shopName.val() == '') {
                        alert('请输入店铺名');
                        return;
                    } else {
                        checkAlias(shopName.val(), function(res){
                            if(res.code == 200) {
                                flagArray[0]  =  true;
                                go();  
                            }
                            
                        })
                    }
                } else {
                    flagArray[0]  =  true;
                }

                if(shopUrl.length) {
                    if(shopUrl.val() == '') {
                        alert('请输入个性域名');
                        return;
                    } else {
                        checkshopname(shopUrl.val(), function(res){
                            if(res.code == 200) {
                                flagArray[1]  =  true;
                                go();  
                            };
                        })
                    }
                } else {
                    flagArray[1]  =  true;
                }
                
                function go() {
                    if(flagArray[0] && flagArray[1]) {
                        $('#createShop').submit();
                    }
                }
                
                
            });
        })();
    })
});