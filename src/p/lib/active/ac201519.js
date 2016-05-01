/**
 * zhangzhensheng 2016-01-12
 */
define(function(require, exports, module) {

    var jquery = require("../jquery/jquery/1.9.1/jquery");
    var dialog = require("../components/dialog/1.0.0/dialog");
    var loginDialog = require("../components/loginDialog/1.0.0/loginDialog");
    var rotate = require("../components/rotate/2.3.0/rotate");
    var template = require("../template/template");

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
	
    var flag = true;
	/*弹框*/ 
	function showDialog(config) {
		var fun =  config.callback || function(){};
        var contentHTML = '<div class="my-dialog-content clearfix"><i class="icon-face-smile-orange"></i><span class="my-dialog-dscr">'+config.content+'</span></div>';
        var dHeight = 115;
        if(!!config.win) {
            contentHTML += '<div class="my-dialog-address clearfix">'
            +               '<ul class="list-left">'
            +                   '<li class="list-name">广州门店地址：</li>'
            +                   '<li>芳村金海马店<br/>地址：花地大道转右进喜鹊路金海马家居四楼</li>'
            +                   '<li>海珠香江家居店<br/>地址：江南大道南411号香江家居工厂批发城三楼</li>'
            +                   '<li>智能家居馆<br/>地址：天河区黄埔大道中303号维亚国际广场金海马家居二楼金海马商城</li>'
            +               '</ul>'
            +               '<ul class="list-right">'
            +                   '<li class="list-name">深圳门店地址：</li>'
            +                   '<li>南山百安居店<br/>地址：南沙区沙河东路255号欧洲城3栋百安居2楼</li>'
            +                   '<li>南山欧洲店<br/>地址：南山区沙河东路255号欧洲城香江家居MALL首层</li>'
            +                   '<li>福田金海马店<br/>地址：福田区益田路皇庭世纪北区裙楼金海马家居4楼</li>'
            +                   '<li>龙华万众城店<br/>地址：龙华民治大道与布龙公路交汇处（万众城家居广场）</li>'
            +               '</ul>'
            +            '</div>';
            dHeight = 353;
        }
		var d = new dialog({
			title: '提示',
			content: contentHTML, 
			width: 474,
			height: dHeight,
			fixed: true,
			zIndex: 10086,
			button: [
				{
					id    : 'ok',
					value : '确定',
					className : 'ui-btns-orange',
					callback: fun
				}
			],
            onclose: function() {
                flag = true;
                if (!!config.reload) {
                    location.reload();
                }
            }
        }).showModal();
	}

    /*抽奖*/
    $(function() {
        var toAngle;
        var prize;
        var acName = commonData.piAlias;
        var hostName = commonData.domain;

        $("#J_start").on("click", function(){
            if (flag) {
                flag = false;
            	$.ajax({
            	    url: 'http://' + hostName + '/default/lottery?pi=' + acName,
            	    dataType: "jsonp",
            	    jsonp: "callback",
            	    data: {
            	        setOff: "ok"
            	    },
            	    success: function(res) {
                        if (res.status != -1) {
                        	if (res.status != -8) {
                                if (res.status == -7) {
                                    showDialog({
                                        content: "谢谢参与！祝您新年快乐！您没有抽奖机会了哦！"
                                    });
                                } else if (res.status == 1) {
                                    switch(res.data.prize) {
                                        case 1: 
                                            prize = "10克猴年纪念黄金金条";
                                            toAngle = 3 * 60 + 360 * 5;
                                            break;
                                        case 2: 
                                            prize = "5克猴年纪念黄金";
                                            toAngle = 1 * 60 + 360 * 5;
                                            break;
                                        case 3: 
                                            prize = "10元现金券";
                                            toAngle = 4 * 60 + 360 * 5;
                                            break;
                                        case 4: 
                                            prize = "新年对联";
                                            toAngle = 2 * 60 + 360 * 5;
                                            break;
                                        case 5: 
                                            prize = "新年福字";
                                            toAngle = 5 * 60 + 360 * 5;
                                            break;
                                        case 6: 
                                            prize = "谢谢参与";
                                            toAngle = 6 * 60 + 360 * 5;
                                            break;
                                        default: break; 
                                    }
                                    var dContent = '<span class="my-dialog-prizedscr">恭喜！您抽中<span class="my-dialog-prize">'+prize+'</span>！凭手机号码可到最近的门店领取相应礼品，礼品领取时间仅限<span class="my-dialog-prize">2016年1月16-17日两天</span>，过期无效。您没有抽奖机会了哦。</span>';
                                    if (res.data.prize == 6) {
                                        dContent = "谢谢参与！祝您新年快乐！您没有抽奖机会了哦！";
                                    }
    	                            $("#J_pointer").rotate({
    	                                angle: 0,
    	                                animateTo: toAngle,
    	                                duration: 6000,
    	                                callback: function() {
    	                                	showDialog({
    	                                		content: dContent,
                                                reload: true,
                                                win: true
    	                                	});
    	                                }
    	                            });
                                }
                        	} else {
                        		showDialog({
                        			content: "很抱歉，您尚未绑定手机不能参加抽奖哦！",
                                    callback: function(){
                                        location.href = res.msg;
                                    }
                        		})
                        	}
                        } else {
                            flag = true;
                            loginDialog({
                                "cdnConfig": cdnConfig,
                                "tpl": template,
                                "dialog": dialog
                            });                       
                        }
            	    },
            	    error: function() {
            	        showDialog({
            				content: "很抱歉，后台数据出错哦……"
            			})
            	    }
            	});
            }
        });
    });
});
