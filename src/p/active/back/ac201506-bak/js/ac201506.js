function countDown(totalTime, timingFn, callback) {
    if (totalTime > 0) {
        var seconds = totalTime / 1000;
        minutes = Math.floor(seconds / 60),
            hours = Math.floor(minutes / 60),
            days = Math.floor(hours / 24),

            curDay = days < 10 ? '0' + days : days,
            curHour = hours % 24 < 10 ? '0' + hours % 24 : hours % 24,
            curMinute = minutes % 60 < 10 ? '0' + minutes % 60 : minutes % 60,
            curSecond = Math.floor(seconds % 60) < 10 ? '0' + Math.floor(seconds % 60) : Math.floor(seconds % 60);

        timingFn && timingFn(curDay, curHour, curMinute, curSecond);
        countDownTimer = setTimeout(function() {
            countDown(totalTime - 1000, timingFn, callback);
        }, 1000);
    } else {
        clearTimeout(countDownTimer);
        callback && callback();
    }
}

$(function() {
    //timeLimited
    $("#con_2,#con_3").removeClass("active-json").removeClass("clearfix");
    $("#con_2,#con_3").wrapAll("<div id=\"J_acTimeLimit\" class=\"timeLimit-container\"></div>");
    $("#J_acTimeLimit").addClass("clearfix");
    var miaoshaArray = commonData.miaosha,
        activePi = commonData.piAlias,
        miaoshaData1 = [],
        nextMiaoshaDate1 = [],
        miaoshaData2 = [],
        nextMiaoshaDate2 = [],
        activeDate = new Date(commonData.now * 1000).getDate();

    function timeOverView(id) {
        var thisId = $("#" + id);
        thisId.find(".screenMark").show();
        thisId.find(".countDown").hide();
        thisId.find(".waitting").hide();
        thisId.find(".buying").addClass('timeOver').show();
    };

    function isLogin() {
        return commonData.login;
    };

    function canBuyNow(id) {
        var thisId = $("#" + id),
            countOff = true;
        thisId.find('.screenMark').hide();
        thisId.find('.countDown').hide();
        thisId.find('.waitting').hide();
    };

    function limitTiming(countTime, id) {
        var thisId = $("#" + id);
        countDown(countTime, function(curDay, curHour, curMinute, curSecond) {
            thisId.find('.countDown').find('.day').html(curDay);
            thisId.find('.countDown').find('.hour').html(curHour);
            thisId.find('.countDown').find('.minute').html(curMinute);
            thisId.find('.countDown').find('.second').html(curSecond);
        }, function() {
            canBuyNow(id);
            //nextTiming(nextcountTime);
        });
    };

    function nextTiming(nextcountTime, id) {
        var thisId = $("#" + id);
        thisId.find('.countDown').show();
        countDown(nextcountTime, function(curDay, curHour, curMinute, curSecond) {
            thisId.find('.countDown').find('.day').html(curDay);
            thisId.find('.countDown').find('.hour').html(curHour);
            thisId.find('.countDown').find('.minute').html(curMinute);
            thisId.find('.countDown').find('.second').html(curSecond);
        }, function() {
            //canBuyNow(id);
            //
        });
    };

    function hasStock(miaoshaDataId) {
        var proData = miaoshaDataId.sku[0],
            pro_num = proData.pro_num,
            sales_volume = proData.sales_volume,
            v_sale = proData.v_sale,
            stock = pro_num - sales_volume - v_sale;
        return stock > 0 ? true : false;
    };

    function showBuyEnd(id) {
        var cur = 'day',
            thisId = $("#" + id),
            date = new Date().getDate() + 1;
        if (date < 14) {
            date = 14;
        }
        cur += date;
        thisId.find(".screenMark").show();
        thisId.find(".buying").addClass(cur).show();
        countOff = false;
    };

    if (activeDate >= 18) {
        timeOverView("J_acTimeLimit1");
        timeOverView("J_acTimeLimit2");
        countOff = false;
    };
    switch (activeDate) {
        case 13:
            miaoshaData1 = miaoshaArray[0];
            nextMiaoshaDate1 = miaoshaArray[2];
            miaoshaData2 = miaoshaArray[1];
            nextMiaoshaDate2 = miaoshaArray[3];
            break;
        case 14:
            miaoshaData1 = miaoshaArray[2];
            nextMiaoshaDate1 = miaoshaArray[4];
            miaoshaData2 = miaoshaArray[3];
            nextMiaoshaDate2 = miaoshaArray[5];
            break;
        case 15:
            miaoshaData1 = miaoshaArray[4];
            nextMiaoshaDate1 = miaoshaArray[6];
            miaoshaData2 = miaoshaArray[5];
            nextMiaoshaDate2 = miaoshaArray[7];
            break;
        case 16:
            miaoshaData1 = miaoshaArray[6];
            nextMiaoshaDate1 = miaoshaArray[8];
            miaoshaData2 = miaoshaArray[7];
            nextMiaoshaDate2 = miaoshaArray[9];
            break;
        case 17:
            miaoshaData1 = miaoshaArray[8];
            miaoshaData2 = miaoshaArray[9];
            break;
    };
    /*
     *at last day
     *
     */
    console.log(commonData.miaosha.length);
    console.log(activeDate);

    var countTime1 = miaoshaData1.start_time * 1000 - commonData.now * 1000,
        countTime2 = miaoshaData2.start_time * 1000 - commonData.now * 1000,
        countOff = false,
        nextcountTime1 = 0,
        nextcountTime2 = 0;
    console.log(countTime1);
    if (activeDate != 17) {
        nextcountTime1 = nextMiaoshaDate1.start_time * 1000 - commonData.now * 1000;
        nextcountTime2 = nextMiaoshaDate2.start_time * 1000 - commonData.now * 1000;
    };
    if (countTime1 < 0) {
        canBuyNow("J_acTimeLimit1");
        if (!hasStock(miaoshaData1)) {
            showBuyEnd("J_acTimeLimit1");
            if (activeDate != 17) {
                nextTiming(nextcountTime1, "J_acTimeLimit1");
            }
        }
    } else {
        if (activeDate < 18) {
            limitTiming(countTime1, "J_acTimeLimit1");
        }
    };

    if (countTime2 < 0) {
        canBuyNow("J_acTimeLimit2");
        if (!hasStock(miaoshaData2)) {
            showBuyEnd("J_acTimeLimit2");
            if (activeDate != 17) {
                nextTiming(nextcountTime2, "J_acTimeLimit2");
            }
        }
    } else {
        if (activeDate < 18) {
            limitTiming(countTime2, "J_acTimeLimit2");
        }
    };
    $('.JQ_pro_link_1').click(function() {
        if (countOff) {
            window.open(cdnConfig.itemApiPath + '/seckill/' + miaoshaData1.sku[0].sku_id + '.html');
            window.location.href = window.location.href;
        }
    });
    $('.JQ_pro_link_2').click(function() {
        if (countOff) {
            window.open(cdnConfig.itemApiPath + '/seckill/' + miaoshaData2.sku[0].sku_id + '.html');
            window.location.href = window.location.href;
        }
    });
})
