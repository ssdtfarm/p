seajs.use(["http://misc.jjcdn.com/p/sea-modules/jquery/jquery/1.9.1/jquery.js","lib/v1/1.0.0/dialog", "http://misc.jjcdn.com/p/css/dialog.css"], function($,dialog) {
    window.$ = $;
    seajs.use(["http://misc.jjcdn.com/p/active/ac_201503/js/jQueryRotate-2.3.min.js"],function(){
        var timeOut = function() { //超时函数
        $("#J_luckyBtn img").rotate({
            angle: 0,
            duration: 10000,
            animateTo: 2160, //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
            callback: function() {
                alert('网络超时')
            }
        });
    };


    var rotateFunc = function(awards, angle, txt) { //awards:奖项，angle:奖项对应的角度
        $('#J_luckyBtn img').stopRotate();
        $("#J_luckyBtn img").rotate({
            angle: 0,
            duration: 3000,
            animateTo: angle + 1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback: function() {
                dLucky.dialog1(txt);
                $("#J_luckyCred").val("1");
            }
        });
    };


    var flag = false;

    $("#J_luckyBtn img").rotate({
        bind: {
            click: function() {
                if ($("#J_isLogin").val() == "1") {
                    if ($("#J_luckyCred").val() == "0") {  
                        if(!flag) {
                            $.ajax({
                                url: 'http://sale.kinhom.com/default/lottery?pi='+$("#J_luckyAPI").val(),
                                dataType: "jsonp",
                                data: {},
                                success: function(res) {
                                    if (res.status == "1") {
                                        var time = 1;
                                        var num;
                                        var item;
                                        flag = true;
                                        if (time == 1) {
                                            var present = res.data;
                                            switch (present) {
                                                case 1:
                                                    num = [1, 6];
                                                    item = num[Math.floor(Math.random() * num.length)];
                                                    break;
                                                case 2:
                                                    num = [2, 5];
                                                    item = num[Math.floor(Math.random() * num.length)];
                                                    break;
                                                case 3:
                                                    num = [3, 8];
                                                    item = num[Math.floor(Math.random() * num.length)];
                                                    break;
                                                case 4:
                                                    num = [4, 7];
                                                    item = num[Math.floor(Math.random() * num.length)];
                                                    break;
                                            };
                                            switch (item) {
                                                case 1:
                                                    rotateFunc(1, 22, '50元现金券');
                                                    break;
                                                case 2:
                                                    rotateFunc(2, 67, '150现金券');
                                                    break;
                                                case 3:
                                                    rotateFunc(3, 112, '100元现金券');
                                                    break;
                                                case 4:
                                                    rotateFunc(4, 157, '200元现金券');
                                                    break;
                                                case 5:
                                                    rotateFunc(5, 202, '150元现金券');
                                                    break;
                                                case 6:
                                                    rotateFunc(6, 247, '50元现金券');
                                                    break;
                                                case 7:
                                                    rotateFunc(7, 292, '200元现金券');
                                                    break;
                                                case 8:
                                                    rotateFunc(8, 337, '100元现金券');
                                                    break;
                                            };
                                        }   
                                    }
                                },
                                error: function() {
                                    alert("连接错误，请再次尝试");
                                }
                            });  
                        }
                    } else {
                        dNo.dialog2("每个人只能参与一次哦～～");
                    }
                } else {
                    var local = window.location.href;
                    window.location.href = "http://passport.kinhom.com/?url=" + local;
                }
            }
        }
    });

    //弹框开始=================================
    var dLucky = new LuckyDialog();
    var dNo = new LuckyDialog();

    function LuckyDialog() {
        this.txt = "";
        this.setTxt = function(newTxt) {
            this.txt = newTxt;
        }
        this.dialog1 = function(txt) {
            var str = "<div class=\"lucky-dialog-content\"><i class=\"icon-kh\"></i>";
            str += "<p id=\"J_luckyM1\" class=\"lucky-msg\">恭喜您获得<span>" + txt + "</span>一张！</p>";
            str += "<p class=\"conditions\">（购满3000元即可使用）</p>";
            str += "<p class=\"additional-remarks\">（与红包一起使用，优惠更给力！使用现金券时，请咨询客服减价～）</p></div>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 534,
                height: 99,
                fixed: true,
                button: [{
                    value: "咨询客服",
                    className: "",
                    callback: function() {
                        window.open('http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=201143&jid=2104161973');
                        d.close().remove();
                    }
                }, {
                    value: "挑选商品",
                    className: "",
                    callback: function() {
                        d.close().remove();
                    }
                }]
            }).showModal();

        }
        this.dialog2 = function(txt) {
            var str = "<div class=\"lucky-dialog-content\"><i class=\"icon-kh\"></i>";
            str += "<p id = \"J_luckyM1\" class=\"lucky-msg\">" + txt + "</p>";
            str += "<p class = \"additional-remarks\">（所获得的现金券已发放到个人后台，使用时请咨询客服减价～）</p></div>";
            var d = new dialog({
                title: "提示",
                content: str,
                width: 534,
                height: 99,
                fixed: true,
                button: [{
                    value: "咨询客服",
                    className: "",
                    callback: function() {
                        window.open('http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=201143&jid=2104161973');
                        d.close().remove();
                    }
                }, {
                    value: "挑选商品",
                    className: "",
                    callback: function() {
                        d.close().remove();
                    }
                }]
            }).showModal();

        }
    };
    //弹框结束=================================
    //数据格式 {"status":1; "data":2; "msg":"成功" }
    })
});
