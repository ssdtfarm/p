define(function(require) {
    $(function () {

        var $pages = $('.instroduction-page'),//获取切换页面元素
            $pageNav = $('a[class*=JQ_page_nav]'),//获取导航元素
            $wrap = $('.JQ_member_wrap'),
            $changeToPage2 = $('.JQ_changeToPage2'),
            $btnNav = $('.JQ_member_nav'),
            $experience_btn = $('.JQ_experience_btn'),
            canScroll = true,
            pageNow = 0,
            winH = 0;


        //初始化第一页，启用css3动画
        $pages.eq(0).addClass('member-page-active');
        //初始化页面，除了特殊页面（页面2），保证切换切面全屏显示
        randerDom();

        $experience_btn.on('click', function () {
            $(this).addClass('visited');
        })
        //导航按钮事件
        $pageNav.each(function (index, el) {
            $(this).on('click', function () {
                var str = $(this).attr('class'),
                    rs = str.match(/JQ_page_nav[\d]/)[0];
                pageNow = rs.charAt(rs.length - 1);
                pageChage(pageNow, $pages.eq(pageNow));

                if (!$(this).hasClass('visited') && $(this).index() != 0) {
                    $(this).addClass('visited');
                }
            });
        });


        //鼠标滚轮事件
        $(document).on('mousewheel DOMMouseScroll', mouseWheelHandler);
        //键盘事件
        $(document).on('keydown', keyDownHandler);

        //第一屏切换到第二屏点击事件
        $changeToPage2.on('click', function () {
            pageNow = 1;
            pageChage(pageNow, $pages.eq(pageNow));

        });

        //浏览器resize时，重新定义切换页面的高度，并且切换到对应页面
        $(window).resize(function () {
            setTimeout(function () {
                randerDom();
                pageChage(pageNow, $pages.eq(pageNow));
            }, 500);
        });

        /**
         * [randerDom description] 初始化页面，除了特殊页面（页面2），保证切换切面全屏显示
         * @return {[type]} [description]
         */
        function randerDom() {
            winH = $(window).height();
            if (winH < 700) {
                fixSmallScreen();
            }
            $pages.each(function (index, el) {
                if (!$(this).hasClass('instroduction-page2')) {
                    $(this).height(winH);
                }
            });
        }

        /**
         * [mouseWheelHandler description] 重写鼠标滚轮事件
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        function mouseWheelHandler(e) {
            e.preventDefault()
            var value = e.originalEvent.wheelDelta || -e.originalEvent.detail,
                delta = Math.max(-1, Math.min(1, value));
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
            } else if (iNow == 1) {
                distence = iNow * winH;
            } else if (iNow == 2) {
                distence = winH + 440;
            } else {
                distence = (iNow - 1) * winH + 440;
            }
            if (iNow >= 2) {
                $('.JQ_floatNav:hidden').fadeIn(800);
            } else {
                $('.JQ_floatNav').fadeOut(300);
            }
            $wrap.css({
                "transition": "all 1s",
                "transform": "translate3d(0," + -distence + "px,0)"
            });
            $wrap.on('webkitTransitionEnd msTransitionend mozTransitionend transitionend', function () {
                canScroll = true;
            });
            pager.addClass('member-page-active');
        }

        function fixSmallScreen() {
            $('.JQ_fixed_page_title_img').css('marginTop', '9%');
            $('.JQ_fixed_img').addClass('fixedScreen');
        }
    })
});