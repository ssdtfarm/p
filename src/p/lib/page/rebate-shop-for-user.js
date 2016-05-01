define(function(require, exports, module){
    var minBar = require('../components/minBar/1.0.1/minBar');
    var dialog = require('../components/dialog/1.0.0/dialog');
    var templateComment = require('../template/tempcomment');
    var addFly = require("../components/addCartFly/1.0.0/addCartFly");
    var temprebate = require('../template/temprebate');
    //属性选择跳转
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]); 
        }
        return null;
    };
    $(function(){
        var secondCats = {};
        minBar({
            mainCell: '#J_minBar',
            pathConfig: cdnConfig,
            tpl: templateComment,
            tplName: "tplMinBar",
            data: _globalConfig.minBar.data
        });
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

        //获取二级分列数据  以及初始化已选择二级分类，初始化返利区间、价格区间
        !(function(){ 
            var rebateRange = getUrlParam('rebateRange'),
                secondCatsData = {},
                priceRangArray = [null, '0-1000', '1000-3000', '3000-5000', '5000-10000', '10000以上'],
                rebateRangeArray = [null, '10%以下', '10%-20%', '20%-30%', '30以上'];


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

        //左侧菜单切换
        !(function(){
            $('.side-nav dd').on('click', function(){
                var self = $(this);
                self.addClass('cur').siblings('dd').removeClass('cur');
                $('.side-nav .sub').hide();
                self.find('.sub').show();
            });
        })();

        /**
         *  加入购物车===========================================================
         *  @param   {}
         */
        $('.j_addCart').on('click', function(event) {
            var self = $(this);
            var skuID = self.attr('data-id');
            var proImg = self.parents('li').find('img');
            event.preventDefault();
            //飞入购物车
            flyToCart(proImg, self);
            //异步请求
            $.ajax({
                url: cdnConfig.cartApiPath + '/default/addcart/' + skuID + '/1',
                dataType: 'jsonp',
                success: function(res) {
                    if (res.status == "succ") {
                        $('#J_cartNum').html($('#J_cartNum').html() * 1 + 1);
                    }
                }
            });
        });

        //动画加入购物车效果
        function flyToCart(proImg, btn) {

            var clickDOM = btn; //点击对象
            var imgDOM = proImg;
            //console.log(imgDOM);
            //点击按钮的左边距和上边距
            var sLeft = btn.offset().left;
            var sTop = btn.offset().top;

            var tarDOM = $(".min-bar-cart-icon"); //目标元素
            var eLeft = tarDOM.offset().left;
            var eTop = tarDOM.offset().top;

            var wScrollTop = $(window).scrollTop();

            var $colone = proImg.clone();
            $colone.attr("class", "J_flyImg").css({
                'width': '30',
                'height': '30'
            }).appendTo(btn);

            //console.log(sLeft, sTop, eLeft, eTop, wScrollTop);
            //
            $colone.fly({
                start: {
                    left: sLeft, //开始位置（必填）#fly元素会被设置成position: fixed
                    top: sTop - wScrollTop //开始位置（必填）
                },
                end: {
                    left: eLeft, //结束位置（必填）
                    top: eTop - wScrollTop, //结束位置（必填）
                    width: 10, //结束时高度
                    height: 10 //结束时高度
                },
                autoPlay: true, //是否直接运动,默认true
                speed: 1.0, //越大越快，默认1.2
                vertex_Rtop: 60, //运动轨迹最高点top值，默认20
                onEnd: function() {
                        $colone.remove();
                    } //结束回调
            });
        }
    }) 
}); 