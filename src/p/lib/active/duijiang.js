/**
 *  ---------------------------------------------
 *      五一活动兑奖
 *      
 *      author: zhangzhensheng
 *      date  : 2016-04-26
 * 
 *  ---------------------------------------------
 */
define(function(require, exports, module) {

    var dialog = require("../components/dialog/1.0.0/dialog");
    var validate = require("../components/khValidate/1.0.0/khValidate");

    $(document).on("click", "#J_getPrizeBtn", function(e) {
        var self = $(this),
            phoneObj = $("#J_phone"),
            phoneVal = phoneObj.val();
        if (phoneVal.trim() == "") {
            $("#J_tip").show();
            return;
        };
        $("#J_tip").hide();
        $.ajax({
            // url: "http://192.168.67.188:3000/api/show/duijiang",
            url: "http://"+commonData.domain+"/default/getPrize",
            dataType: "jsonp",
            type: "get",
            data: {
                pi: 'ac201506',
                phone: phoneVal
            },
            success: function(res) {
                // res = JSON.parse(res);
                showDialog(res);
            },
            error: function(res) {
                console(res);
            }
        });
        // 显示兑奖信息弹窗
        function showDialog(res) {
            var status = res.data.status;
            var list = res.data.list;
            var msg = res.data.msg;
            // 临时代码，使用拼接字符串，不使用template
            var buttonVal = '确定';
            var contentVal = '<table class="lucky-dialog-content"><tr><th>';
            if (status === "luck") {
                var buttonVal = '兑换';
	            contentVal += '<i class="icon-face-smile-orange"></i></th><td class="pl-10"><span>恭喜您获得&nbsp;';
                if (list.length == 2 && list[0].prize == list[1].prize) {
                    contentVal += '<em class="fc-f60">两份' + list[0].name + '</em>';
                } else {
                    for (var i = 0; i < list.length; i++) {
    	                contentVal += '<em class="fc-f60">' + list[i].name + '</em>';
    	                if((i+1) < list.length){
    	                	contentVal += '&nbsp;和&nbsp;';
    	                }
                    }
                }
                for (var i = 0; i < list.length; i++) {
                    if(list[i].prize == 4){
                        contentVal += '<br/>券码是&nbsp;<em class="fc-f60">' + list[i].coupon + '</em>';
                    }
                }
            } else if(status === "unluck"){
                contentVal += '<i class="icon-face-sad-orange"></i></th><td class="pl-10"><span>' + msg;
            } else if(status === "taken"){
                contentVal += '<i class="icon-face-smile-orange"></i></th><td class="pl-10"><span>' + msg;
            } else {
                contentVal += '<i class="icon-face-sad-orange"></i></th><td class="pl-10"><span>' + msg;
            }
	        contentVal += '</span></td></tr></table>';

            var d = new dialog({
                title: "提示",
                content: contentVal,
                width: 400,
                height: 100,
                fixed: true,
                button: [{
                    value: buttonVal,
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                    }
                }]
            }).showModal();
        }
    });
})
