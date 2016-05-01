function countDown(totalTime, timingFn, callback) {
    if (totalTime>0) {
        var seconds    = totalTime / 1000;
            minutes    = Math.floor(seconds / 60),
            hours      = Math.floor(minutes / 60), 
            days       = Math.floor(hours / 24),
        
            curDay     = days < 10 ? '0'+days : days,
            curHour    = hours % 24 < 10 ?  '0'+hours % 24 : hours % 24,
            curMinute  = minutes % 60 <  10 ? '0'+minutes % 60 : minutes % 60,
            curSecond  = Math.floor(seconds % 60) < 10 ? '0'+Math.floor(seconds % 60) : Math.floor(seconds % 60); 

        timingFn && timingFn(curDay, curHour, curMinute, curSecond);
        countDownTimer = setTimeout(function(){
            countDown(totalTime-1000, timingFn, callback);
        },1000);
    } else {
        clearTimeout(countDownTimer);
        callback && callback();
    }
}


$(function() {
    //timeLimited
    var miaoshaArray =  commonData.miaosha,
        choujiangData = commonData.choujiang[0],
        activePi = commonData.piAlias,
        miaoshaData = [],
        nextMiaoshaDate = [],
        activeDate = new Date(commonData.now*1000).getDate();

        if (activeDate >= 23) {
            $('.timeLimited .screenMark').show();
            $('.countDown').hide();
            $('.waitting').hide();
            $('.buying').addClass('day23').show();
            countOff = false;
        }

    switch (activeDate) {
        case 17 :
            miaoshaData = miaoshaArray[0];
            nextMiaoshaDate = miaoshaArray[1];
            break;
        case 18 :
            miaoshaData = miaoshaArray[1];
            nextMiaoshaDate = miaoshaArray[2];
            break;
        case 19 :
            miaoshaData = miaoshaArray[2];
            nextMiaoshaDate = miaoshaArray[3];
            break;
        case 20 :
            miaoshaData = miaoshaArray[3];
            nextMiaoshaDate = miaoshaArray[4];
            break;
        case 21 :
            miaoshaData = miaoshaArray[4];
            nextMiaoshaDate = miaoshaArray[5];
            break;
        case 22 :
            miaoshaData = miaoshaArray[5];
            break;
    }

    function isLogin() {
        return commonData.login;
    }
    function canBuyNow() {
        countOff = true;
        $('.timeLimited .screenMark').hide();
        $('.timeLimited .countDown').hide();
        $('.timeLimited .waitting').hide();
    }
    function limitTiming(countTime) {
        countDown(countTime,function(curDay, curHour, curMinute, curSecond){
            $('.countDown .day').html(curDay);
            $('.countDown .hour').html(curHour);
            $('.countDown .minute').html(curMinute);
            $('.countDown .second').html(curSecond);
        },function() {
            canBuyNow();
            //nextTiming(nextCountTime);
        });
    }
    function nextTiming(nextCountTime) {
        $('.timeLimited .countDown').show();
        countDown(nextCountTime,function(curDay, curHour, curMinute, curSecond){
            $('.countDown .day').html(curDay);
            $('.countDown .hour').html(curHour);
            $('.countDown .minute').html(curMinute);
            $('.countDown .second').html(curSecond);
        },function() {
            //canBuyNow();
            //
        });
    }
    function hasStock(){
        var proData = miaoshaData.sku[0],
            pro_num = proData.pro_num,
            sales_volume = proData.sales_volume,
            v_sale = proData.v_sale,
            stock = pro_num - sales_volume - v_sale;
        return stock > 0 ? true : false;
    }
    function showBuyEnd(){
        var cur = 'day',
            date = new Date().getDate()+1;
        if(date < 18) {
            date = 18;
        }
        cur += date;
        $('.timeLimited .screenMark').show();
        $('.buying').addClass(cur).show();
        countOff = false;
    }

    var countTime = miaoshaData.start_time*1000 - commonData.now*1000,
        countOff = false,
        nextCountTime = 0;
        if (activeDate != 22) {
            nextCountTime = nextMiaoshaDate.start_time*1000 - commonData.now*1000;
        }
        
    if (countTime<0) {
        canBuyNow();
        if(!hasStock()) {
            showBuyEnd();
            if(activeDate != 22){
                nextTiming(nextCountTime);
            }  
        }
    } else {
        if (activeDate < 23) {
            limitTiming(countTime);
        }
        
    }

    $('.JQ_pro_link').click(function() {
        if (countOff) {
            window.open(cdnConfig.itemApiPath+'/seckill/'+miaoshaData.sku[0].sku_id+'.html');
            window.location.href=window.location.href;
        } 
    });

    //luckyName
    var nameArray = ['钱','吴','陈','沈','梁','秦','吕','曹','魏','谢','水','苏','范','韦','凤','任','鲍','廉','贺','殷','邬','于','卞','余','孟','穆','邵','毛','贝','伏','宋','纪','祝','阮','季','路','童','盛','徐','夏','胡','万','管','房','解','宣','单','诸','吉','嵇','陆','羊','曲','羿','邴','段','焦','隗','侯','郗','仲','仇','钭','武','詹','幸','黎','宿','邰','咸','蔺','乔','能','莘','贡','申','宰','璩','牛','扈','浦','别','瞿','连','艾','古','廖','居','耿','国','禄','殳','越','巩','勾','訾','简','母','鞠','关','后','竺','益','孙','郑','褚','韩','尤','施','严','陶','邹','窦','潘','彭','昌','花','袁','史','岑','倪','罗','安','时','齐','元','平','萧','湛','禹','明','成','茅','舒','董','蓝','麻','娄','颜','林','邱','蔡','凌','支','卢','裘','应','贲','杭','左','钮','邢','荣','於','家','储','糜','富','巴','山','宓','班','伊','栾','厉','符','束','司','蓟','白','从','籍','屠','阴','苍','党','劳','扶','郦','桑','寿','燕','尚','庄','阎','茹','鱼','易','庾','衡','满','文','阙','沃','夔','厍','敖','辛','饶','沙','须','蒯','荆','权','桓','李','王','卫','杨','许','张','华','姜','喻','章','葛','郎','马','方','柳','唐','薛','汤','毕','常','傅','康','卜','黄','尹','汪','狄','臧','戴','庞','屈','粱','闵','强','危','郭','刁','骆','田','霍','柯','莫','缪','宗','邓','洪','石','龚','滑','翁','惠','封','靳','松','巫','弓','谷','蓬','仰','宫','暴','戎','刘','龙','韶','薄','怀','鄂','赖','蒙','鬰','双','翟','逄','堵','雍','桂','通','冀','农','晏','充','习','容','慎','终','步','弘','寇','东','利','隆','聂','融','阚','空','乜','丰','相','红','逯','公','司马','欧阳','诸葛','东方','皇甫','公羊','公冶','濮阳','单于','申屠','仲孙','令狐','宇文','慕容','闾丘','司空','司寇','子车','端木','公西','乐正','公良','夹谷','谷粱','闫法','涂钦','百里','南门','归海','微生','缑亢','有琴','左丘','西门','佘佴','南宫','谯笪','阳佟','言福','姓终'],
        nameArray2 = ['赵','周','冯','蒋','朱','何','孔','金','戚','柏','云','奚','鲁','苗','俞','酆','费','雷','滕','郝','乐','皮','伍','顾','和','姚','祁','米','计','谈','熊','项','杜','席','贾','江','梅','钟','高','樊','虞','咎','经','干','丁','郁','包','崔','程','裴','荀','甄','芮','汲','井','乌','牧','车','全','秋','宁','甘','祖','景','叶','郜','印','蒲','索','卓','池','胥','闻','谭','姬','冉','郤','濮','边','郏','温','柴','慕','宦','向','戈','暨','都','匡','广','殴','蔚','师','晁','冷','那','曾','养','巢','查','游','盖','万俟','上官','夏侯','闻人','赫连','尉迟','澹台','宗政','淳于','太叔','公孙','轩辕','钟离','长孙','鲜于','司徒','亓官','仉督','颛孙','巫马','漆雕','壤驷','拓拔','宰父','晋楚','汝鄢','段干','东郭','呼延','羊舌','岳帅','况后','梁丘','东门','商牟','伯赏','墨哈','年爱','第五','百家'],
        onOff = true,
        winMark = null,
        winH = $(window).height(),
        luckyNum = -1,
        couponUrl = cdnConfig.my+'/user/coupon',
        val = '',
        hasGot = false;

    function getLuckyNum() {
        var i = 0,
            j = 0,
            len = nameArray.length,
            len2 = nameArray2.length,
            rs = 0;
        val = $.trim($('.luckyInput').val());

        for(i=0; i<len; i++){
            if(val === nameArray[i]){
                rs = 1;
            }
        }

        for(j=0; j<len; j++){
            if(val === nameArray2[j]){
                rs = 2;
            }
        }

        return rs;
    }
    function hasLuckyNum() {
        return choujiangData.count === 0 ? false : true;
    }

    function createMark() {
        if(winMark == null){
            winMark = $('<div class="winMark" style="height:'+winH+'px;"></div>');
            $('body').append(winMark);
            winMark.show();
        }else{
            winMark.show();
        }  
    }
    function hideMark() {
        winMark.hide();
    }
    function showDialog(num) {
        var content = '';
        switch(num) {
            case -1:
                content = '<div class="hasNum details"><h4>每个人只能<span>测1次</span>姓运值哦~</h4><h5>相应的现金券已发放到您的会员中心，下单即可使用~</h5><a href="javascript:;" class="link JQ_lucky_link">查看现金券>></a></div>';
            break;
            case 0:
                content = '<div class="errorName details"><h3>请输入正确姓氏</h3><p>非姓氏文字无法参与测姓运值哦~</p></div>';
            break;
            case 1:
                content = '<div class="num50 details"><h3>您的姓运值是50分！</h3><p>您昨晚一定夜观了星云，知道今天有财运是不是？~</p><h4><span>50</span>元现金券请笑纳～</h4><h5>购满1000元，即可使用50元现金券！</h5><a href="javascript:;" class="link JQ_lucky_link">查看现金券>></a></div>';
            break;
            case 2:
                content = '<div class="num100 details"><h3>您的姓运值是100分！</h3><p>您昨晚一定夜观了星云，知道今天有财运是不是？~</p><h4><span>100</span>元现金券请笑纳～</h4><h5>购满1000元，即可使用100元现金券！</h5><a href="javascript:;" class="link JQ_lucky_link">查看现金券>></a></div>';
            break;

            //no default
        }

        $('.dialogContent').html(content);
        $('.luckyDialog').show();
        createMark();
    }
    function closeDialog() {
        $('.luckyDialog').hide();
        hideMark();
        onOff = true;
        if(hasGot) {
            window.location.href=window.location.href;
        }
    }
    function toCouponPage() {
        window.open(couponUrl);
        window.location.href=window.location.href;
    }
    function sendData(callback){
        $.ajax({
            url: 'http://sale.kinhom.com/default/lottery?pi='+activePi,
            dataType: "jsonp",
            data: {},
            success: function(res) {
                 callback && callback(res);
            },
            error: function() {
                alert("连接错误，请再次尝试");
            }
        });
    }
    
    $('.JQ_lucky').click(function() {
        
        if(!onOff) {
            return;
        }

        onOff = false;
        
        //判断是否登陆
        if(isLogin()) {
            //判断是否已经领取
            if(hasLuckyNum()) { //抽过奖的
                showDialog(-1);
            } else {
                if (getLuckyNum() == 0) {
                    showDialog(0);
                } else {
                    sendData(function(res) {
                        if(res.status == 1) {
                           var  id =  res.data;
                           if (id == 320) {
                                showDialog(1)
                           } else if (id == 323) {
                                showDialog(2)
                           }
                           hasGot = true;
                        }
                    });

                }
            }
        }else {
            seajs.use(['lib/v1/1.0.0/loginDialog'],function(login) {
                /* click event */
                    login({
                        pathConfig : cdnConfig,
                        url        : "http://passport.kinhom.com/passport/login",
                        callback   : function(res){
                            
                        }
                    });
            });
            onOff = true;
        } 
    });

    $('.JQ_lucky_close').click(function() {
        closeDialog();
    });

    $(document).on('click', '.JQ_lucky_link', function() {
        toCouponPage();
    })

})



