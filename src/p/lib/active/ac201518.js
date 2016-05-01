/**
 * Created by Administrator on 2015-12-28.
 */
define(function(require, exports, module) {

    var jquery = require("../jquery/jquery/1.9.1/jquery");
    var dialog = require("../components/dialog/1.0.0/dialog");
    var loginDialog = require("../components/loginDialog/1.0.0/loginDialog");
    var template = require("../template/template");

    /*幸运墙*/
    $(function() {
        if (commonData.lotteryResult) {
            var luckyList = commonData.lotteryResult,
                listHtml = '';

            for (var i = 0; i < luckyList.length; i++) {
                var luckyName = luckyList[i].username,
                    luckyTime = luckyList[i].prize_time,
                    luckyPrize = luckyList[i].prize_name;
                    listHtml += '<li class="prize-item"><span class="prize-info">恭喜' + luckyName + "获得" + luckyPrize + '一个</span><span class="prize-time">' + luckyTime + "</span></li>";
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
    $(function() {

        var defaultProps = {
            pialias: commonData.piAlias,
            domain: commonData.domain,
            loginStatus: commonData.login,
            flag: true,
            Egg: null
        };
        //自定义弹窗
        var myDialog = {
            set: function(opt) {
                $('.tips-dialog .d-footer').html(opt.footer);
                $('.tips-dialog .d-content').html(opt.content);
                myDialog.show();
            },
            show: function() {
                $('.screenMark').show();
                $('.tips-dialog').show();
            },
            remove: function(){
                $('.screenMark').hide();
                $('.tips-dialog .d-footer').html('');
                $('.tips-dialog .d-content').html('');
                $('.tips-dialog').hide();
            }
        }

        /**
         * 处理中奖的各种情况
         * 每个抽奖活动的中奖都不一样，需要独立设置
         * prizeArray 中奖提示语
         * 0-n 中奖处理函数，n以每次抽奖活动的产品数而定
         * @type {{prizeArray: string[], 0: luckStatus.'0'}}
         */

        var luckStatus = {
            'prizeArray': ['null','东芝u盘','真皮护理剂','天堂伞','床笠'],
            'words': ['祝您：2016 幸福自动找上门！','祝您：2016 人人想跟你做朋友！','祝您：颜值爆表，惊呆小伙伴！', '祝您：2016 天天拿大奖，人品好的没话说！'],
            'setContent': function(prizeType, remainder) {
                var footerHtml = '<span class="btn J_shopping">去逛逛商品</span>';
                var showTimesHtml = '<p class="text-center">很抱歉，没有抽奖机会了</p>';
                var luckyWords= luckStatus.words[Math.floor(Math.random()*4)];
                if(remainder > 0) {
                    showTimesHtml = '<p  class="text-center">您还有<span>'+remainder+'</span>次砸金蛋机会！</p>';
                    footerHtml = '<span class="btn J_goON">继续砸金蛋</span><span class="btn J_shopping">去逛逛商品</span>';
                }
                var contentHtml = '<p class="text-center">您<span>中奖了</span>，奖品是'+luckStatus.prizeArray[prizeType]+'</p>'+showTimesHtml+'<p class="small">活动后将由专人安排发放礼品。</p>'
                if(prizeType == '5') {
                    contentHtml = '<p class="big">赢运气了</p><p class="text-center" style="font-size:20px;">'+luckyWords+'</p>'+showTimesHtml;
                }

                myDialog.set({
                    content: contentHtml,
                    footer: footerHtml
                });
            },
            '5': function (prizeType, remainder) {
                //没中奖，祝福语
                luckStatus.setContent(prizeType, remainder);

            },
            '1': function (prizeType, remainder) {
                //东芝u盘
                luckStatus.setContent(prizeType, remainder);
            },
            '2': function (prizeType, remainder) {
                //真皮护理剂
                luckStatus.setContent(prizeType, remainder);
            },
            '3': function (prizeType, remainder) {
                //天堂伞
                luckStatus.setContent(prizeType, remainder);
            },
            '4': function (prizeType, remainder) {
                //床笠
                luckStatus.setContent(prizeType, remainder);
            }
        };

        //获取
        function luckyAct () {
            /**
             * 处理ajax的各种返回状态
             * 除中奖部分外其他状态处理都是基本固定的，中奖部分根据每次活动需求，独立配置
             */
            var resStatus = {
                '1': function (res) {
                    //参与了一次抽奖
                    var remainder = res.data.remainder,
                        prizeType = res.data.prize;

                    luckStatus[prizeType](prizeType, remainder);
                },
                '-1': function (res) {
                    //'未登录'
                    myDialog.set({
                        content: '<p class="big">很抱歉！</p><p>您还<span>未登陆</span>不能砸金蛋哦！</p><p class="small">祝您：2016 幸福自动找上门！</p>',
                        footer: '<span class="btn J_goLogin">立即登陆</span>'
                    });
                },
                '-2': function (res) {
                    //'未指定综合活动'
                    myDialog.set({
                        content: '<p class="big">很抱歉！</p><p class="text-center">后台数据出错哦</p><p class="small">祝您：2016 幸福自动找上门！</p>',
                        footer: '<span class="btn J_later">稍后再试</span>'
                    });
                },
                '-3': function (res) {
                    //'未找到相关抽奖活动'
                    myDialog.set({
                        content: '<p class="big">很抱歉！</p><p class="text-center">后台数据出错哦</p><p class="small">祝您：2016 人人想跟你做朋友！</p>',
                        footer: '<span class="btn  J_later">稍后再试</span>'
                    });
                },
                '-4': function (res) {
                    //'没有抽奖机会'
                    myDialog.set({
                        content: '<p>目前您没有抽奖机会，购物<span>每满2000</span>元可再获得1次抽奖机会，上不封顶。</p>',
                        footer: '<span class="btn J_shopping">去逛逛商品</span>'
                    });
                },
                '-5': function (res) {
                    //'奖品数据出错'
                    myDialog.set({
                        content: '<p class="big">很抱歉！</p><p class="text-center">后台数据出错哦！</p><p class="small">祝您：2016 天天拿大奖，人品好的没话说！</p>',
                        footer: '<span class="btn  J_later">稍后再试</span>'
                    });
                },
                '-6': function (res) {
                    //'保存中奖信息出错'
                    myDialog.set({
                        content: '<p class="big">很抱歉！</p><p class="text-center">后台数据出错哦</p><p class="small">祝您：2016 人人想跟你做朋友！</p>',
                        footer: '<span class="btn  J_later">稍后再试</span>'
                    });
                },
                '-7': function (res) {
                    //'抽奖次数已用完'
                    myDialog.set({
                        content: '<p>目前您的砸金蛋机会已用完，继续购物<span>每满2000</span>元可再获得1次抽奖机会，上不封顶。</p>',
                        footer: '<span class="btn J_shopping">去逛逛商品</span>'
                    });
                },
                '-8': function (res) {
                    //'先绑定手机再抽奖哦',link -> res.msg
                    myDialog.set({
                        content: '<p class="big">很抱歉！</p><p class="text-center">先绑定手机再抽奖哦</p><p class="small">祝您：2016 天天拿大奖，人品好的没话说！</p>',
                        footer: '<span class="btn J_goBind" data-url="'+res.msg+'">去绑定</span>'
                    });
                }
            };

            //ajax获取请求状态
            $.ajax({
                url: "http://" + defaultProps.domain + "/default/lotterymore?pi=" + defaultProps.pialias + "&type=1",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    setOff: "ok"
                }
            })
            .done(function(res) {
                var statusType = res.status;
                resStatus[statusType](res);
                defaultProps.flag = true;
                defaultProps.Egg.trigger('hasResponse');
            })
            .fail(function() {
                console.log("接口请求异常，请检查!");
            });

        }
        function goodLuckyAct () {
            if(defaultProps.loginStatus == 1) {
                luckyAct()
            } else {
                myDialog.set({
                    content: '<p class="big">很抱歉！</p><p>您还<span>未登陆</span>不能砸金蛋哦！</p><p class="small">祝您：2016 幸福自动找上门！</p>',
                    footer: '<span class="btn J_goLogin">立即登陆</span>'
                });
                defaultProps.flag = true;
            }

        }

        //触发抽奖
        $('.egg').on('click',function(){
            if(defaultProps.flag) {
                defaultProps.flag = false;
                defaultProps.Egg = $(this);
                defaultProps.Egg.on('hasResponse', function(){
                    defaultProps.Egg.addClass('eggOpen');
                });
                goodLuckyAct ();
            }

        });

        $(document).on('click', '.J_goON', function(){
            $('.egg').removeClass('eggOpen');
            myDialog.remove();
        });
        $(document).on('click', '.J_later', function(){
            $('.egg').removeClass('eggOpen');
            myDialog.remove();
        });
        $(document).on('click', '.J_shopping', function(){
            $('.egg').removeClass('eggOpen');
            myDialog.remove();
            window.location.href = 'http://sale.kinhom.com/ac201506';
        });
        $(document).on('click', '.J_myDialogClose', function(){
            $('.egg').removeClass('eggOpen');
            myDialog.remove();
        });
        $(document).on('click', '.J_goBind', function(){
            $('.egg').removeClass('eggOpen');
            myDialog.remove();
            window.open($(this).attr('data-url'));
        });
        $(document).on('click', '.J_goLogin', function(){
            $('.egg').removeClass('eggOpen');
            myDialog.remove();
            loginDialog({"cdnConfig": cdnConfig, "tpl": template, "dialog": dialog})
        });

    });

});
