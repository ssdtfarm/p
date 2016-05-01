define(function(require, exports, module){
    /*===============================*/
    /*  我的返利小店js文件
     *  @author zhangzhensheng
     *  @date   2016-04-06 
     /* ==============================*/
    var slider = require('../components/slider/1.0.0/slider');
    var temprebate = require('../template/temprebate');
    var addFly = require("../components/addCartFly/1.0.0/addCartFly");
     $(function(){
        !(function(){
            $.ajax({
                    url: '/rebate/countrebate',
                    dataType: 'json' 
            })
            .done(function(res) {
                if(res.code == 200) {
                    $('.add-total .num').html(res.data.num);
                }
            })
            .fail(function() {
                console.log("/shop/countrebate error");
            });
            
        })();
        !(function(){
            $('.full-wrap .slider').slide({
                mainCell: '.bd ul', //内容区域
                titCell: '.hd', //标题区域
                effect: 'fold', //切换效果, fold-淡入淡出, fade-渐现
                autoPage: true, //自动分页
                autoPlay: true, //自动轮换
                interTime: 3000, //两张图片切换间隔
                delayTime: 500, //效果持续时间
                trigger: 'click' //鼠标点击切换图片
            });
        })();

        $(".real-time-info").slide({mainCell:".list",autoPlay:true,effect:"topMarquee",vis:5,interTime:50,trigger:"click"});

        $('.rebate-btn').on('click', function(event) {

            var self = $(this);
            var skuID = self.attr('data-id');
            var proImg = self.parents('li').find('img');
            if(!proImg.length) {
                proImg = self.parents('.info').siblings('a').find('img');
            }
            event.preventDefault();
            
            if(skuID) {
                 $.ajax({
                    url: '/rebate/add',
                    dataType: 'json', 
                    data: {
                        skuId: skuID
                    }
                })
                .done(function(res) {
                    if(res.code == 200) {
                        //飞入购物车
                        flyToCart(proImg, self);
                        self.html('已参与').removeClass('rebate-btn').addClass('rebate-added').off();
                        $('.add-total .num').html($('.add-total .num').html() * 1 + 1);
                    } else {
                        console.log(res)
                    }
                })
                .fail(function() {
                    console.log("/shop/add error");
                });
            }
            
        });
        //动画加入购物车效果
        function flyToCart(proImg, btn) {

            var clickDOM = btn; //点击对象
            var imgDOM = proImg;
            //console.log(imgDOM);
            //点击按钮的左边距和上边距
            var sLeft = btn.offset().left;
            var sTop = btn.offset().top;

            var tarDOM = $(".add-total .num"); //目标元素
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

     }); 
});