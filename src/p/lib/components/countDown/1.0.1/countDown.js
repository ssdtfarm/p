define(function(require, exports, modlue) {
    /* 初始化前后端时间戳 =====================
     *
     * author: lijinron
     *  remix: jinjing
     * date: 20160405
     */
    function countDown(countTime, timingFn, callback) {
        if (countTime > 0) {
            var seconds = countTime / 1000,
                minutes = Math.floor(seconds / 60),
                hours = Math.floor(minutes / 60),
                days = Math.floor(hours / 24),
                curDay = days < 10 ? '0' + days : days,
                curHour = hours % 24 < 10 ? '0' + hours % 24 : hours % 24,
                curMinute = minutes % 60 < 10 ? '0' + minutes % 60 : minutes % 60,
                curSecond = Math.floor(seconds % 60) < 10 ? '0' + Math.floor(seconds % 60) : Math.floor(seconds % 60);
            timingFn && timingFn(curDay, curHour, curMinute, curSecond);
            countDownTimer = setTimeout(function() {
                countDown(countTime - 1000, timingFn, callback);
            }, 1000);
        } else {
            clearTimeout(countDownTimer);
            callback && callback();
        }
    };
    module.exports = countDown;

    //demo
    // var endtime = ($(this).attr("data-endTime")) * 1000;
    // var nowtime = ($(this).attr("data-curTime")) * 1000; //new Date().getTime(); //今天的日期(毫秒值)
    // var countTime = endtime - nowtime;
    // var target = $(this).parent();
    // countDown(countTime, function(CDay, CHour, CMinute, CSecond) {
    //     target.find(".JQ_prePayTime").html("支付剩余时间：<span class=\"pay-countdown\">" + CHour + ": " + CMinute + ": " + CSecond + "</span>");
    // }, function() {
    //     location.reload();
    // });
})
