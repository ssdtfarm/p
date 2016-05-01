/**
 * zhangzhensheng 2016-01-12
 */
define(function(require, exports, module) {

    // var jquery = require("../jquery/jquery/1.9.1/jquery");
    var dialog = require("../components/dialog/1.0.0/dialog");
    var loginDialog = require("../components/loginDialog/1.0.0/loginDialog");
    var rotate = require("../components/rotate/2.3.0/rotate");
    var tempcomment = require("../template/tempcomment");

    /*幸运墙*/
    // 数据过少时滚动条会抖动
    $(function() {
        if (commonData.lotteryResult) {
            var luckyList = commonData.lotteryResult,
                listHtml = '';

            for (var i = 0; i < luckyList.length; i++) {
                var luckyName = luckyList[i].username,
                    luckyPrize = luckyList[i].prize_name;
                listHtml += '<li class="prize-item"><span class="prize-info">恭喜' + luckyName + '抽中' + luckyPrize + '一对</span></li>';
            }

            $(".lotteryResult .list").html(listHtml);

            var $this = $(".listWrap");
            var scrollTimer;

            $this.hover(function() {
                clearInterval(scrollTimer);
            }, function() {
                scrollTimer = setInterval(function() {
                    scrollNews($this);
                }, 2e3);
            }).trigger("mouseout");

            function scrollNews(obj) {
                var $self = obj.find("ul:first");
                var lineHeight = $self.find("li:first").height();
                $self.animate({
                    "margin-top": -lineHeight + "px"
                }, 600, function() {
                    $self.css({
                        "margin-top": "0px"
                    }).find("li:first").appendTo($self);
                });
            }
        }
    });
    /*抽奖*/
    var acNum = commonData.piAlias;
    var homeMain = commonData.domain;
    var loginSta = commonData.login;
    var luckyCred = 1;
    var flag = false;

    $(function() {
        $("#J_start").on("click", function() {
            if (loginSta == 1) {
                switch (luckyCred) {
                    case 0:
                    //console.log("0");
                       // dNo.dialog3("点击太快>_<鼠标好痛啊", 0);
                        break;
                    case 1:
                    //console.log("1");
                        luckyCred = 0;
                        //if (!flag) {
                            $.ajax({
                                url: "http://" + homeMain + "/default/lotterymore?pi=" + acNum + "&type=1",
                                dataType: "jsonp",
                                jsonp: "callback",
                                data: {
                                    setOff: "ok"
                                },
                                success: function(res) {
                                    var sta = res.status;
                                    switch (sta) {
                                        case 1:
                                            var time = res.data.remainder;
                                            var result = res.data.prize;
                                           // flag = true;
                                            switch (result) {
                                                case 6:
                                                    rotateFunc(6, 0, "谢谢参与", time);
                                                    break;
                                                case 1:
                                                    rotateFunc(1, 60, "5克猴年纪念黄金", time);
                                                    break;
                                                case 2:
                                                    rotateFunc(2, 120, "10个定制红包", time);
                                                    break;
                                                case 3:
                                                    rotateFunc(3, 180, "10克猴年纪念黄金", time);
                                                    break;
                                                case 4:
                                                    rotateFunc(4, 240, "保健枕", time);
                                                    break;
                                                case 5:
                                                    rotateFunc(5, 300, "床上四件套", time);
                                                    break;
                                                default:
                                                    break;
                                            };
                                            break;
                                        case -1:
                                            /* var local = window.location.href;
                                             window.location.href  = "http://passport.kinhom.com/?url=" + local;*/
                                            loginDialog({
                                                "cdnConfig": cdnConfig,
                                                "tpl": tempcomment,
                                                "dialog": dialog
                                            });
                                            break;
                                        case -4:
                                            dNo.dialog4("您目前还没有符合抽奖条件。", 0);
                                            break;
                                        case -7:
                                            dNo.dialog2("目前您的抽奖机会已用完。", 0);
                                            break;
                                        case -8:
                                            var toUrl = res.msg;
                                            dNo.dialog5("很抱歉，您尚未绑定手机不能参加抽奖哦!", toUrl);
                                            break;
                                        default:
                                            break;
                                    }
                                },
                                error: function() {
                                    dNo.dialog3("很抱歉，后台数据出错哦……");
                                }
                            });
                        //};
                        break;
                    default:
                        break;
                }
            } else {
                /*var local = window.location.href;
                window.location.href = "http://passport.kinhom.com/?url=" + local;*/
                loginDialog({
                    "cdnConfig": cdnConfig,
                    "tpl": tempcomment,
                    "dialog": dialog
                });
            }
        });
    });
    var rotateFunc = function(awards, angle, txt, time) {
        $("#J_pointer").stopRotate();
        $("#J_pointer").rotate({
            angle: 0,
            duration: 3e3,
            animateTo: angle + 1440,
            callback: function() {
                if (awards == 6) {
                    dNo.dialog0("谢谢参与", time);
                    luckyCred = 0;
                } else {
                    dLucky.dialog1(txt, time);
                    luckyCred = 0;
                }
            }
        });
    };
    //金龟弹框开始=================================
    var dLucky = new LuckyDialog();
    var dNo = new LuckyDialog();

    function LuckyDialog() {
        this.txt = "";
        this.setTxt = function(newTxt) {
            this.txt = newTxt;
        };
        //没有中还有机会（刷新）
        this.dialog0 = function(txt, time) {
            var str = "<table class=\"lucky-dialog-content\"><tr><th><i class=\"icon-face-smile-orange\"></i></th><td><span class=\"msg-16\">谢谢参与！祝您新年快乐！您还有<em class=\"sp\">" + time + "</em>次抽奖机会!</span></td></tr></table>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "确定",
                    id: "J_btnCj",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                        luckyCred = 1;
                    }
                }],
                onclose: function() {
                    d.close().remove();
                    luckyCred = 1;
                }
            }).showModal();
        };
        //中奖（刷新）
        this.dialog1 = function(txt, time) {
            var str1 = "<table class=\"lucky-dialog-content\"><tr><th><i class=\"icon-face-smile-orange\"></i></th><td><span class=\"msg-20\">恭喜您获得<em class=\"sp\">" + txt + "</em>好礼！</span><br/><span class=\"msg-12\">活动后有专人安排发货，详情请咨询客服。"
            var str2 = "";
            if (time == 0) {
                str2 = "您已经没有抽奖机会了哦。</span></td></tr></table>";
            } else {
                str2 = "您还有<em class=\"sp\">" + time + "</em>次抽奖机会。</span></td></tr></table>";
            }
            var str = str1 + str2;
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "确定",
                    id: "J_btnCj",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                    }
                }],
                onclose: function() {
                    window.location.reload();
                }
            }).showModal();
        };
        //没有中且没有机会了（关闭弹框滚动到顶部）
        this.dialog2 = function(txt, time) {
            var str = "<table class=\"lucky-dialog-content\"><tr><th><i class=\"icon-face-smile-orange\"></i></th><td><span class=\"msg-16\">谢谢参与，祝您新年快乐！" + txt + "</span><br/><span class=\"msg-14\">继续购物每<em class=\"sp\">满2000元</em>可再获得<em class=\"sp\">1次</em>抽奖机会，上不封顶。</span></td></tr></table>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "确定",
                    id: "J_btnGo",
                    className: "ui-btns-orange",
                    callback: function() {
                        var goToTop = $("#J_activeAllBg").offset().top;
                        $("html,body").stop().animate({
                            scrollTop: goToTop
                        }, 300);
                        luckyCred = 1;
                        d.close().remove();
                    }
                }],
                onclose: function() {
                    luckyCred = 1;
                }
            }).showModal();
        };
        //万用文字（弹框自动关闭）
        this.dialog3 = function(txt, time) {
            var str = "<table class=\"lucky-dialog-content\"><tr><th><i class=\"icon-face-smile-orange\"></i></th><td><span class=\"msg-16\">" + txt + "</span></td></tr></table>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 350,
                height: 90,
                fixed: true,
                button: [{
                    value: "确定",
                    id: "J_btnCj",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                    }
                }]
            }).showModal();
            setTimeout(function() {
                d.close().remove();
            }, 1800);
        };
        //去注册（跳转）
        this.dialog4 = function(txt, time) {
            var str = "<table class=\"lucky-dialog-content\"><tr><th><i class=\"icon-face-smile-orange\"></i></th><td><span class=\"msg-16\">" + txt + "</span></td></tr></table>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "确定",
                    id: "J_btnGo",
                    className: "ui-btns-orange",
                    callback: function() {
                        window.open(toUrl);
                        d.close().remove();
                    }
                }],
                /*onclose: function() {
                    window.location.reload();
                }*/
            }).showModal();
        };
        //绑定手机（跳转）
        this.dialog5 = function(txt, toUrl) {
            var str = "<table class=\"lucky-dialog-content\"><tr><th><i class=\"icon-face-smile-orange\"></i></th><td><span class=\"msg-16\">" + txt + "</span></td></tr></table>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 490,
                height: 120,
                fixed: true,
                button: [{
                    value: "确定",
                    id: "J_btnGo",
                    className: "ui-btns-orange",
                    callback: function() {
                        window.open(toUrl);
                        d.close().remove();
                    }
                }],
                /*onclose: function() {
                    window.location.reload();
                }*/
            }).showModal();
        }; 
    };
    /*
     * ======== 爆款商品亮点展示 ========
     */
    //插入要展示的图片
    /*var selector = ["img_414605","img_414632","img_414641"];//需要展示的图片id
    selector.forEach(function(item, index, array){
        var imgObj = $("#"+item);
        imgObj.parent().css({"position":"relative"});
        imgObj.after('<div class="img-detail" id="J_'+item+'"></div>');
    });
    // 对每个展示图片设置样式
    $(".img-detail").css({
        "position": "absolute",
        "width": "844px",
        "height": "499px",
        "opacity": "0"
    });
    $("#J_img_414605").css({
        "top": "226px",
        "left": "-1190px",
        "background": "url(http://misc.jjcdn.com/p/active/ac201603/img/baokuan_main/1_01.jpg) center no-repeat"
    });
    $("#J_img_414632").css({
        "top": "2472px",
        "left": "-1190px",
        "background": "url(http://misc.jjcdn.com/p/active/ac201603/img/baokuan_main/1_02.jpg) center no-repeat"
    });
    $("#J_img_414641").css({
        "top": "4034px",
        "left": "-1190px",
        "background": "url(http://misc.jjcdn.com/p/active/ac201603/img/baokuan_main/1_03.jpg) center no-repeat"
    });
    // 展示的效果
    $(".img-detail").hover(function(e){
        $(this).stop().animate({"opacity":"1"},300);
    },function(e){
        $(this).stop().animate({"opacity":"0"},300);
    })*/
});
