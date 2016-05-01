define(function(require, exports, module){
	/*
	 *   time countDown module
	 *   author : yansiwen
	 *   date : 2015-08-12
	 */
	var jquery = require("../jquery/jquery/1.9.1/jquery");
	var countDown = require("../components/countDown/1.0.0/countDown");
	var yanStartTime = commonData.startTime,
		yanEndTime = commonData.endTime,
		yanNow = commonData.now;
	function countdown(now, startTime, endTime) {
		$(".countdown-box").countdown({
			// 假设传入的为服务器端的时间time(时间戳，毫秒为单位)
			now: now,
			startTime: startTime, // 开始倒计时的时间戳
			endTime: endTime// 结束倒计时的时间戳
		});
    }
    $(function(){
    	countdown(yanNow * 1000, yanStartTime * 1000, yanEndTime * 1000);
    });
});