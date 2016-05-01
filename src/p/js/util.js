define(function(require){

    (function(){
        /*
        *    创建全局函数util
        * */ 
        window.util = {};

        /* 
        *      修复顶部栏电话热线缺失图片
        * */
        //console.log($(".top-hot-line").find(".icon-top-hotline").length);
 

        if($(".top-hot-line").find(".icon-top-hotline").length==0) {
            $(".top-hot-line").prepend('<i class="icon-top-hotline"></i>');
        }
 
        /*  =====================================================================
                        兼容ie9以下，a标签内嵌套label无法跳转问题。
            ===================================================================== */
        $('.member-nav label,.corner-tab-nav label,.member-aside-item label').click(function() {
            if(navigator.userAgent.indexOf('MSIE') >= 0){
                var self = $(this),
                    pathname = self.parent('a').attr('href'); 

                window.location.href = pathname;
            }  
        });  
        /*
         *  加入收藏 ==============================================================
         */
        // $(document).on("click", "#J_topAddFavorate", function(event){
        //  event.preventDefault();
        //  AddFavorite('金海马商城','http://www.kinhom.com/'); 
        // });
        // $(document).on("click", ".top-nav-favorite", function(event){
        //  event.preventDefault();
        //  AddFavorite('金海马商城','http://www.kinhom.com/');
        // }); 
        //加入收藏夹按钮
        // function AddFavorite(title, url) {
        //  try {
        //      window.external.addFavorite(url, title);
        //  }
        //  catch (e) {
        //      try {
        //          window.sidebar.addPanel(title, url, "");
        //      }
        //      catch (e) {
        //          alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        //      } 
        //  }
        // }
        /*
         * 我的金海马 通用顶部搜索框  ================================================
         */
        //点击输入框
        $(".JQ_hotKeyTip").each(function(index, element) {
            var that = $(this);
            $(this).on("click",function(e){
                that.hide();
                that.siblings("input[name=keyword]").focus();
            });
        });

        //输入框获得焦点
        $(".JQ_searchKeyword").each(function(index, element) {

            var that = $(this);
            if($.trim(that.val()) != ""){
                that.siblings(".JQ_hotKeyTip").hide();
            }
            that.on("focus",function(e){
                that.val('');
                that.siblings(".JQ_hotKeyTip").hide();
            });
            that.on("keyup", function(event){
                event.preventDefault();
                if($.trim(that.val()) == "" || ($.trim(that.val()) == that.siblings(".JQ_hotKeyTip").html()) ) {

                }else{
                    that.siblings(".JQ_hotKeyTip").hide();
                }
            });
        });
        //提交搜索
        $(".JQ_searchBarBtn").each(function(index, element) {
            var that = $(this);
            that.on("click",function(e){
                var keyWord = $(".JQ_searchKeyword");
                var tips = $(".JQ_hotKeyTip");
                if($.trim(keyWord.val()) == ''){
                    tips.hide();
                    keyWord.val(tips.html());
                }
                that.parent("form").submit();
            });
        });

        //输入焦点离开
        $(".JQ_searchKeyword").each(function(index, element) {
            var that = $(this);
            that.on("blur keyup",function(e){
                if($.trim(that.val()) == "" || $.trim(that.val()) == that.siblings(".JQ_hotKeyTip").html()){
                    that.siblings(".JQ_hotKeyTip").show();
                }
            });
        });

        /*
         **  会员系统通用分页控制函数  =================================================
         *   @btnID   domID ; 按钮对象id号，如 ＃id
         *   @pageID
         */
        memberPageControll();

        function memberPageControll() {
            //分页对象
            var page = $(".go-page input");

            //页码输入事件
            chkPageIn();

            //确定按钮click事件
            $(document).on("click", "#J_goPage", function(event){
                event.preventDefault();
                //请求地址
                var cURL = $(this).attr("href");
                var URL = "" ;
                //获取分页
                var pageVal = $.trim(page.val());
                if(pageVal=="" || pageVal==0) {
                    alert("请输入正确的页码！");
                    page.focus();
                    // pageVal = 1;
                    // console.log(URL);
                    return false;
                }else{
                    URL = cURL + pageVal;
                    // console.log(URL);
                    //跳转
                    window.location.href = URL;
                }


            });


            //验证页码输入
            function chkPageIn() {
                //分页对象的输入事件
                page.on("keyup", function(event){
                    // event.preventDefault();
                    preventDefault();

                    var value = $.trim($(this).val());

                    if(isNaN(value) || value==0){
                        $(this).val(1);
                    }else{
                        var reg = /^[0-9]{1,}$/;
                        if(!reg.test(value)){
                            $(this).val(1);
                            return false;
                        }
                    }
                });
            }
        }

        /* ===============================================================
         *    获取随机字符串函数
         *    @len   len表示需要获取的字符串长度,只能填数字.
         *    该函数返回生产的字符串
         *    author : linyandi
         *    date   : 2015-07-15
         *  ===============================================================*/
        function getToken(len) {
            var sn = "";
            var randString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for(var i=0; i<len; i++) {
                var randStart = parseInt(Math.random()*(randString.length-1));
                var randEnd   = parseInt(randStart) +1;
                sn += randString.slice(randStart, randEnd);
            }
            return sn;
        }

        util.getToken = getToken;

        /* ===============================================================
         *    获取登录状态接口
         *    该函数返回用户登录状态并重置顶部的个人状态栏
         *    author : linyandi
         *    date   : 2015-07-29
         *
         *    修改登录后显示的内容loginHTML
         *    mender : yansiwen
         *    data   : 2016-02-29
         *  ===============================================================*/
        // util.getLoginStatus = function() {
        //  //console.log("sdfsdf");
        //  var tarDOM = $(".top-login-status");
        //  var loginHTML = '';
        //  //获取登录状态
        //  $.ajax({
        //      url : cdnConfig.apiPath + "/login/status",    
        //      dataType : "jsonp",
        //      success  : function(res) {  
        //          //console.log(res); 
        //          if(res.status=="succ" && res.data.islogin) {
        //              // loginHTML = '<label>Hi ~  </label><a href="'+ cdnConfig.my +'/user">'+ res.data.member_name +'</a><a href="'+ cdnConfig.passport +'/passport/logout">[退出]</a></div>'
        //              loginHTML = '您好，<span><a href="'+ cdnConfig.my +'/user">' + res.data.member_name +'</a></span><a href="' + cdnConfig.passport + '/passport/logout" class="top-logout">退出</a>';
        //              tarDOM.html(loginHTML);
        //          }
        //      }  
        //  })   
        // };
        //调用该方法
        //util.getLoginStatus();

        /* ==================================================================
        *  主站左边分类切换效果方法
        *  该方法设置左边分类的切换效果,加入了鼠标覆盖延迟显示的效果
        *  author : linyandi
        *  date   : 2015-08-31
        *  ==================================================================*/
        util.leftAllCats = function() {
            var mainDOM = $("#J_leftAllCats");
            var itemDOM = mainDOM.find(".aside-menu-item");
            var hoverTimer,outTimer;

            //console.log(itemDOM);

            itemDOM.hover(function(event){
                var that = $(this);
                clearTimeout(hoverTimer);

                hoverTimer = setTimeout( function() {
                    that.addClass("hover");

                    that.siblings("li").removeClass("hover");

                },50);

            }, function(){
                var that = $(this);

                clearTimeout(outTimer);

                outTimer = setTimeout( function() {
                    that.removeClass("hover");
                },50);

            });

        };
        //调用该方法
        util.leftAllCats();

        /* ========================================================================
        *  全局处理console.log不支持的问题
        *  author : linyandi
        *  date   : 20150901
        *  =======================================================================*/
        util.fixConsole = function() {
            if (!window.console) {
                window.console = {};
            }else{
                console.log("hello, welcome to kinhom web site");
            }
            if (!console.log) {
                console.log = function () {};
            }
        };
        //调用此方法
        util.fixConsole();
    })(window);
});