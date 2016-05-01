define(function(require, exports, module){
    /*===============================*/
    /*  未来之家
     *  @author lijinrong
     *  @date   2015-09-12
     /* ==============================*/
    //引入依赖

    $(function () {

        $('html,body').animate({scrollTop: 0});

        var $pages = $('.future-page'),//获取切换页面元素
            $pageNav = $('.nav-item,.next-page'),//获取导航元素
            canScroll = true,
            pageNow = 0;

        //导航按钮事件
        $pageNav.each(function (index, el) {
            $(this).on('click', function () {
                var self = $(this);
                var idx = self.attr('data-idx');
                pageNow = idx;
                pageChage(pageNow, $pages.eq(pageNow));

                if (!self.hasClass('active')) {

                    self.addClass('active').siblings('span').removeClass('active');
                }
            });
        });


        //鼠标滚轮事件
        $(document).on('mousewheel DOMMouseScroll', mouseWheelHandler);
        //键盘事件
        $(document).on('keydown', keyDownHandler);
        /**
         * [mouseWheelHandler description] 重写鼠标滚轮事件
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        function mouseWheelHandler(e) {

            e.preventDefault()
            var value = e.originalEvent.wheelDelta || -e.originalEvent.detail,
                delta = Math.max(-1, Math.min(1, value));

            var scrollTop = $('body').scrollTop();
            if (canScroll) {

                if (delta < 0) {
                    if (pageNow < $pages.length - 1) {
                        canScroll = false;
                        pageNow++;
                        pageChage(pageNow, $pages.eq(pageNow));
                    }
                } else {
                    if (pageNow > 0) {
                        canScroll = false;
                        pageNow--;
                        pageChage(pageNow, $pages.eq(pageNow));
                    }
                }
            }
            return false;
        }

        function keyDownHandler(e) {
            var keyCode = e.keyCode;
            if (canScroll) {
                if (keyCode === 40) {
                    if (pageNow < $pages.length - 1) {
                        canScroll = false;
                        pageNow++;
                        pageChage(pageNow, $pages.eq(pageNow));
                    }
                } else if (keyCode === 38) {
                    if (pageNow > 0) {
                        canScroll = false;
                        pageNow--;
                        pageChage(pageNow, $pages.eq(pageNow));
                    }
                }
            }
        }

        /**
         * [pageChage description] 页面切换元素
         * @param  {[type]} iNow  当前切换页数
         * @param  {[type]} pager 当前页jQuery对象
         * @return {[type]}       [description]
         */
        function pageChage(iNow, pager) {
            var distence = 0;
            if (iNow == 0) {
                distence = 0;
            } else {
                distence = (iNow-1)*722+680;
            }
            if (iNow >=1) {
                $('.fix-nav').fadeIn(800);
            } else {
                $('.fix-nav').fadeOut(300);
            }
            // console.log(distence);
            $('html,body').animate({scrollTop: distence }, 400, 'swing',function(){
                canScroll = true;
            });



            $pages.removeClass('active_page');
            pager.addClass('active_page');
            $pageNav.eq(iNow).addClass('active').siblings('span').removeClass('active');
            /*$('body').css({
                "transition": "all 1s",
                "transform": "translate3d(0," + -distence + "px,0)"
            });
            $('body').on('webkitTransitionEnd msTransitionend mozTransitionend transitionend', function () {
                canScroll = true;
            });
            pager.addClass('member-page-active');*/
            
        }

       
    })


   
});