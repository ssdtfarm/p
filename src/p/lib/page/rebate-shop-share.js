define(function(require, exports, module){
    var temprebate = require('../template/temprebate');
    var qrcode = require("../components/qrcode/1.0.0/qrcode");
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

            //初始化已有的价格区间
            if(rebateRange) {
                $('.j_rebateSelector .title').html(rebateRangeArray[rebateRange]);
            }
            //价格区间跳转
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


        //设置分享
        !(function(){
            var shareURL = $('#J_share').attr('data-url');
            var shareConfig = {
                url: shareURL,// 分享的网页链接
                title: '标题',// 标题
                summary: '描述',// 描述
                pics: 'http://img3.jjcdn.com/g1/M00/03/4A/CvoBNFYqAY6ABymFAAS7E5xgneM249.jpg!mid'
            };
            // 新浪微博自定义分享内容
            var weiboConfig = {
                url: shareURL,// 分享的网页链接
                title: '标题333',// 标题
                pic: 'http://img3.jjcdn.com/g1/M00/03/4A/CvoBNFYqAY6ABymFAAS7E5xgneM249.jpg!mid'
            }
            function encodeShareURI(shareConfig) {
                var param = [];
                for(var i in shareConfig) {
                    param.push(i + "=" + encodeURIComponent(shareConfig[i] || ""));
                }
                return param;
            }
            var param = encodeShareURI(shareConfig);
            var weiboParam = encodeShareURI(weiboConfig);
            var target = document.getElementById("J_share");

            target.addEventListener("click", function(event) {
                var obj = event.target;
                var to_app = obj.getAttribute("data-type");
                switch(to_app) {
                    case "qq": 
                        window.open("http://connect.qq.com/widget/shareqq/index.html?" + param.join("&"));
                        break;
                    case "qzone": 
                        window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + param.join("&"));
                        break;
                    case "weibo":
                        window.open("http://service.weibo.com/share/share.php?" + weiboParam.join("&"));
                        break;
                    default: break;
                }
            }, false);
            
        })();
        //显示二维码弹窗
        !(function(){
            var shareURL = $('#J_share').attr('data-url');

            function randerQrcode(w, h, url, wrap) {

                var userAgent = navigator.userAgent.toLowerCase()
                renderType = 'canvas';
                if(/msie/ig.test(userAgent)){
                    renderType = 'table';
                }

                wrap.qrcode({
                    text   : url,
                    render : renderType,
                    width  : w,
                    height : h
                });

        }
        randerQrcode(120,120, shareURL,$('.j_pop .code-img'));
            $('.j_pop').hover(function(){
                $(this).find('.pop').show();
            }, function(){
                $(this).find('.pop').hide();
            });
        })();
    }) 
}); 