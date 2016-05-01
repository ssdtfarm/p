define(function(require, exports, module){
    /*===============================*/
    /*  体验馆重构
     *  @author lijinrong
     *  @date   2015-09-11
     /* ==============================*/
    //引入依赖
    var template = require('../../template/tempcomment');
    var templateCurstom = require('../../template/tempcurstom');
    var mainNav     = require('../../components/mainNav/1.0.1/mainNav');
    var dialog      = require('../../components/dialog/1.0.0/dialog');
    var lazyload    = require('../../components/lazyload/1.0.0/lazyload');
    var slider      = require('../../components/slider/1.0.0/slider');
    var minBar = require('../../components/minBar/1.0.1/minBar');

    var initSlider = require('../../components/slider3D/1.0.0/slider3d');


    var sliderData={"dataList":[[{"imgSrc":"http:\/\/img1.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBmiACPVaAAD6HRj4miQ100.jpg","thisInfo":""},{"imgSrc":"http:\/\/img0.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBT-AOEjoAAGD3z01pXY511.jpg","thisInfo":""},{"imgSrc":"http:\/\/img2.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBlOAU994AAFri47-O0U008.jpg","thisInfo":""},{"imgSrc":"http:\/\/img.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBmqABIhIAAFY0u6nrJU212.jpg","thisInfo":""},{"imgSrc":"http:\/\/img0.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBUCAQA0HAAGaY4zyWr0677.jpg","thisInfo":""},{"imgSrc":"http:\/\/img0.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBmyAe1ooAAFKF2uKANM078.jpg","thisInfo":""}],[{"imgSrc":"http:\/\/img2.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBUyAOKPlAAGbohaDXlo592.jpg","thisInfo":"1.\u63a8\u8350\u914d\u642d\uff1a\u6696\u767d\u6d6e\u96d5\u67dc\u4f53+\u68a6\u5e7b\u91d1\u4e1d\u6728\u76ae\u94a2\u7434\u6f06\u95e8\u677f 2.\u94a2\u7434\u6f06\u6728\u76ae\u95e8\u6d41\u91d1\u6ea2\u5f69\u6781\u7b80\u5962\u534e\uff0c\u73b0\u4ee3\u7b80\u7ea6\u5b9a\u5236\u5bb6\u5177\u9876\u7ea7\u5448\u73b03.\u6696\u767d\u67dc\u4f53\u7ebf\u6761\u4e0e\u8282\u70b9\u7684\u72c2\u70ed\u4ea4\u7ec7."},{"imgSrc":"http:\/\/img3.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBniAXR4cAAGf-EqgeTw645.jpg","thisInfo":""},{"imgSrc":"http:\/\/img1.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBVOAC0wPAAF2x9y7w-c003.jpg","thisInfo":""},{"imgSrc":"http:\/\/img.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBVSAUazLAAGWlqy9N1c021.jpg","thisInfo":""},{"imgSrc":"http:\/\/img3.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBpWAGcMHAAF_WghobSE689.jpg","thisInfo":""},{"imgSrc":"http:\/\/img1.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBoCAXd0pAAEAM1amNz4977.jpg","thisInfo":""}],[{"imgSrc":"http:\/\/img1.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBkaAVvgLAAFIA8Pmu0U202.jpg","thisInfo":""},{"imgSrc":"http:\/\/img3.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBR2AIM7cAAFhQFJsozw018.jpg","thisInfo":""},{"imgSrc":"http:\/\/img3.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBjOAbyVMAAFDESkFzlU008.jpg","thisInfo":""},{"imgSrc":"http:\/\/img3.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBQmAAaePAAFf98SIi38480.jpg","thisInfo":""},{"imgSrc":"http:\/\/img.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBkCACxVyAAFLeTKikNk819.jpg","thisInfo":""},{"imgSrc":"http:\/\/img2.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBRaALyt5AAFNqPHeyY8905.jpg","thisInfo":""},{"imgSrc":"http:\/\/img1.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBSeAfd7eAAEzaOA_T7M969.jpg","thisInfo":""},{"imgSrc":"http:\/\/img0.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBkyAMqW_AAFZbqZ5ahI084.jpg","thisInfo":""},{"imgSrc":"http:\/\/img1.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBSCAcuSJAAFQAjg6ejk978.jpg","thisInfo":""},{"imgSrc":"http:\/\/img3.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBkqAaZaMAAFoo2QpnE0990.jpg","thisInfo":""},{"imgSrc":"http:\/\/img0.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBR6AB9gRAAEm2UAt3Lc338.jpg","thisInfo":""}],[{"imgSrc":"http:\/\/img.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBWyATHsvAAGPeeQYlDA174.jpg","thisInfo":""},{"imgSrc":"http:\/\/img0.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBpeAJrmeAAFV3tXszgk920.jpg","thisInfo":""},{"imgSrc":"http:\/\/img1.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBW6AHNFkAAGEmmbpGFM643.jpg","thisInfo":""},{"imgSrc":"http:\/\/img3.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBpqAR1tNAAFTKKly6UU066.jpg","thisInfo":""},{"imgSrc":"http:\/\/img.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBNFRsBXqASAytAAGeeCPE_Dg594.jpg","thisInfo":""},{"imgSrc":"http:\/\/img0.jjcdn.com\/\/g1\/M00\/01\/F8\/CvoBM1RsBmyAe1ooAAFKF2uKANM078.jpg","thisInfo":""}]],"sliderTitle":["\u7b80\u6b27\u98ce\u683c","\u73b0\u4ee3\u5962\u534e","\u73b0\u4ee3\u7b80\u7ea6","\u73b0\u4ee3\u4e2d\u5f0f"]};


    $(function(){

        //主导航效果
        mainNav({
            mainCell : "JQ_headNavMenu",
            lineCell : "JQ_headNavLine"
        });
        /* =====================================================================
         *    新版浮动工具栏交互
         * =====================================================================*/

        minBar({
            mainCell   : '#J_minBar',
            pathConfig : cdnConfig,
            tpl        : template,
            tplName    : "tplMinBar",
            data : _globalConfig.minBar.data
        });
        //初始化 
        initMap();

        //查询地图
        $("#seachMap").click(function(e) {
            var aIndex = parseInt($("input[name=changeArea]").val());
            var cIndex = parseInt($("input[name=changeCity]").val());

            if(aIndex == 0 && cIndex== 0) {
                $('.euro-city').hide();
                $('.future-wrap').show();
            } else {
                $('.euro-city').show();
                $('.future-wrap').hide();
            }
            for(var i=0; i<cityPoiData.cityName.length; i++){
                if(provenceData.areaList[aIndex][cIndex]==cityPoiData.cityName[i]){
                    loadCityMap(i); //加载图片点
                    changeAddressSelect(i); //对应地址列表
                }
            }
        });
        //发送到手机
        $(".sms-btn").click(function(e) {
            var sendContent ='<div class="send-msg">'
                +'<div class="title">发送内容：</div>'
                +'<div class="msg-wrap">'
                +'<p>'
                +'<b>【'+$("input[name=changeAddressTitle]").val()+'】</b>'
                +'<span>展馆地址：</span><b>'+$("input[name=changeAddress]").val()+'</b>'
                +'<span>营业时间：</span><b>'+$("input[name=changeAddressTime]").val()+'</b>'
                +'<span>服务电话：</span><b>'+$("input[name=changeAddressTel]").val()+'</b>'
                +'</p>'
                +'</div>'
                +'<div class="input-wrap">'
                +'<input type="text" class="phone J_phone" placeholder="请输入您的手机号码">'
                +'<div class="error-info phone-msg"></div>'
                +'</div>'
                +'<div class="input-wrap">'
                +'<input type="text" class="code J_code" placeholder="请输入您验证码">'
                +'<a href="javascript:;" class="btn J_getCode">获取手机验证码</a>'
                +'<span class="J_countDownWrap countDown" href="javascript:void(0);" id="J_timeSub"><span class="J_countDown">60</span>秒</span>'
                +'<div class="error-info"></div>'
                +'</div>'
                +'</div>';

            var sendDialog = new dialog({
                title   : '免费发送到手机',
                content : sendContent,
                width   : 400,
                fixed   : true,
                button  : [
                    {
                        value : '确定',
                        className : 'ui-btns-orange',
                        callback : function() {
                            checkPhoneCode(sendDialog);
                            return false;
                        }
                    }
                ]
            }).showModal();

        });

        //点击按钮
        var sliderTitleHtml = '';
        for(var i=0; i<sliderData.sliderTitle.length; i++) {
            sliderTitleHtml += '<a href="javascript:;" class="3d-tab-item" data-idx="'+[i]+'">'+sliderData.sliderTitle[i]+'</a>';
        }
        $('.slider-tab').html(sliderTitleHtml);
        //3d结构
        $("#J_slider3D").html(templateCurstom("tplCurstomSlider3D",sliderData));
        //点击切换
        $(document).on('click', '.3d-tab-item', function(){
            var idx = $(this).attr('data-idx');
            $('.slider3DList img').each(function() {
                var imgIdx = $(this).parent().index();
                $(this).attr('src', sliderData.dataList[idx][imgIdx].imgSrc);
            });
        });

        initSlider({
            dom: "sliderList",
            number: $("#sliderList li").length,
            speed: 2000
        });



    });

    //刷新页面的key
    function refreshKey(str){
        var tar = $("#security");
        tar.val(str[1]);
        tar.attr("name", str[0]);
    }

    //倒计时
    function countDownFn(t, obj1, obj2) {
        var tempT = t;
        obj1.css('top','-9999px');
        obj2.show();
        var timer =  setInterval(function(){
            if(t<=0){
                clearInterval(timer);
                obj1.css('top','auto').html('重新获取验证码');
                obj2.hide();
            }else{
                t = t - 1;
                obj2.find('.J_countDown').html(t);
            }
        },1000);
    }

    //显示提示信息函数 ==========================================

    function showTip(obj, text, type) {
        obj.siblings('.error-info').html(text).show();
        //目标input的focus事件
        obj.on("focus", function (event) {
            event.preventDefault();
            obj.siblings('.error-info').html('').hide();
        });
    }

    //发送手机短信
    $(document).on('click', '.J_getCode', function(){
        var self = $(this);
        var phone = $('.J_phone');
        var phoneCode = $('input[name="phone"]');
        var phoneNum = $.trim(phone.val()).replace(/\s/g,'');

        if(!/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(phoneNum)) {
            showTip(phone,'手机号码格式有误，请输入正确的手机号');
            return;
        }
        sendPhoneCode(phone, phoneNum);
    });

    var sendCodeClickNum = 0;
    function sendPhoneCode(phone, phoneNum) {
        if(sendCodeClickNum>=3){
            showTip(phone, '您本次发送手机验证码次数已经用完,请刷新页面重试.','error');
            return;
        }else{
            sendCodeClickNum++;
        }
        countDownFn(60, $(".J_getPhoneCode"), $(".J_countDownWrap"));
        $.ajax({
            url: cdnConfig.apiPath + '/member/sendphonecode',
            data: {
                "phone": phoneNum,
                "h": $("#security").val(),
                "m": $("#security").attr('name'),
                "n": sendCodeClickNum,
                "r"  : Math.random()
            },
            dataType: "jsonp"
        })
            .done(function(res) {
                if(res.status == 'succ') {
                    refreshKey(res.pin);
                    showTip(phone, '验证码发送成功','error');
                }
            })
            .fail(function() {
                showTip(phone, '发送失败，请检查网络是否通畅');
            });
    }

    //验证手机验证码
    function checkPhoneCode(dialog) {
        var code = $('.J_code');
        var val = $.trim(code.val());

        if(val != '') {
            if(val.length != 6) {
                showTip(code, '请输入6位手机验证码');
            } else {
                var ajaxUrl =  cdnConfig.apiPath+'/member/validateiphonecode';
                $.ajax({
                    url: ajaxUrl,
                    data: {
                        "phonecode" : val
                    },
                    dataType: 'jsonp'
                })
                    .done(function(res) {
                        if(res.status == 'succ') {
                            sendMsgToPhone(val, dialog);
                        } else {
                            showTip(code, '验证码错误，请确认。', 'error');
                        }

                    })
                    .fail(function() {
                        showTip(code, '发送失败，请检查网络是否通畅', 'error');
                    });
            }
        } else {
            showTip(code, '请输入6位手机验证码');
        }

    }


    function sendMsgToPhone(code, dialog2) {

        var phoneNum = $.trim($('.J_phone').val());
        $.ajax({
            url: 'index/sendofflineaddress',
            type: 'POST',
            dataType: 'json',
            data: {
                phone: phoneNum,
                id : $("input[name=changeId]").val(),
                code : code
            }
        })
            .done(function(res) {
                if(res.status == 'succ') {
                    dialog2.remove();

                    var d = new dialog({
                        title   : '发送成功',
                        width   : 400,
                        content : '<p style="text-align:center; padding: 20px 0; font-size: 14px;">发送成功，请注意查收！</p>',
                        fixed   : true
                    }).showModal();
                    setTimeout(function(){
                        d.remove();
                    },3000);
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    }


    //初始化地图,map暴露为全局对象
    var map = new BMap.Map("offlineMap");
    map.centerAndZoom("广州天河区", 12);// 初始化地图,设置城市和地图级别。
    map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

    //检测地图级别
    map.addEventListener("zoomend",function(e){
        if(map.getZoom()<=6) {
            //清除遮罩物
            map.clearOverlays();
            //加载省级点
            loadAreaOverlay();
        }
    });
    //初始化城市函数
    function initMap(){
        var myCity = new BMap.LocalCity();
        myCity.get(myfun);
        //加载当前城市
        function myfun(result){
            for(var i=0; i<cityPoiData.cityName.length; i++){
                if(result.name==cityPoiData.cityName[i]){
                    loadCityMap(i); //加载图片点
                }
            }
            for(var j=0; j<provenceData.areaList.length;j++){
                for(var k=0; k<provenceData.areaList[j].length; k++){
                    if(provenceData.areaList[j][k]==result.name){
                        loadSelectOption(j); //加载select选择框
                    }
                }
            }
        }
    }
    //加载select内容
    function loadSelectOption(index){
        var pLen = provenceData.area.length;
        var pListLen = provenceData.areaList[index].length;
        var listArr = provenceData.areaList[index];
        for(var i=0;i<pLen; i++){
            $("#areaList").append("<li id=\""+i+"\">"+provenceData.area[i]+"</li>");
        }
        for(var j=0; j<pListLen; j++){
            $("#cityList").append("<li id=\""+j+"\">"+listArr[j]+"</li>");
        }
        //定位当前城市和区域
        var myCity = new BMap.LocalCity();
        myCity.get(myfun);
        var aIndex = 0;
        var cIndex = 0;
        function myfun(result){
            for(var j=0; j<provenceData.areaList.length;j++){
                for(var k=0; k<provenceData.areaList[j].length; k++){
                    if(provenceData.areaList[j][k]==result.name){
                        aIndex = j;
                        cIndex = k;
                    }
                }
            }
            //赋值地区和城市
            $("#selectCity").html(result.name);
            $("#selectArea").html(provenceData.area[aIndex]);
            $("input[name=changeArea]").val(aIndex);
            $("input[name=changeCity]").val(cIndex);
            //赋值地址列表
            for(var l=0; l<cityPoiData.proList[cIndex].length; l++){
                $("#addressList").append("<li p-id=\""+index+"\" id=\""+l+"\" class=\"w280\" title=\""+cityPoiData.proList[cIndex][l].address+"\">"+cityPoiData.proList[cIndex][l].address+"</li>");
                $("#selectAddress").html(cityPoiData.proList[cIndex][0].address);
                $("input[name=changeId]").val(cityPoiData.proList[cIndex][0].id);
                $("input[name=changeAddressTitle]").val(cityPoiData.proList[cIndex][0].title);
                $("input[name=changeAddress]").val(cityPoiData.proList[cIndex][0].address);
                $("input[name=changeAddressTel]").val(cityPoiData.proList[cIndex][0].tel);
                $("input[name=changeAddressTime]").val(cityPoiData.proList[cIndex][0].service_time);
            }

            //地区下拉
            $("#areaIcon").click(function(e) {
                $("#areaList").slideToggle();
                $("#cityList,#addressList").slideUp();
                return false;
            });
            //地区列表点击
            $(document).on("click","#areaList li",function(e){
                $("#selectArea").html($(this).html());
                $("#changeArea").val($(this).attr("id"));
                changeArea($(this).attr("id"));
            });

            //城市下拉
            $("#cityIcon").click(function(e){
                $("#cityList").slideToggle();
                $("#areaList,#addressList").slideUp();
                return false;
            });
            //城市列表点击
            $(document).on("click","#cityList li",function(e){
                $("#selectCity").html($(this).html());
                $("#changeCity").val($(this).attr("id"));
            });
            //地址下拉
            $("#addressIcon").click(function(e) {
                $("#addressList").slideToggle();
                $("#areaList,#cityList").slideUp();
                return false;
            });
            //地址列表点击
            $(document).on("click","#addressList li",function(e){
                $("#selectAddress").html($(this).html());
                setOptions($(this).attr("p-id"),$(this).attr("id"));

                var pid = $(this).attr('p-id');
                var id = $(this).attr('id');

                if( pid ==0 && id == 0) {
                    $('.euro-city').hide();
                    $('.future-wrap').show();
                } else {
                    $('.euro-city').show();
                    $('.future-wrap').hide();
                }

            });
            //外围点击上拉
            $(document).click(function(e){
                $("#areaList,#cityList,#addressList").slideUp();
            });
        }

    }
    //设置发送到手机的信息到对应的字段
    function setOptions(cIndex,index){
        $("input[name=changeId]").val(cityPoiData.proList[cIndex][index].id);
        $("input[name=changeAddressTitle]").val(cityPoiData.proList[cIndex][index].title);
        $("input[name=changeAddress]").val(cityPoiData.proList[cIndex][index].address);
        $("input[name=changeAddressTel]").val(cityPoiData.proList[cIndex][index].tel);
        $("input[name=changeAddressTime]").val(cityPoiData.proList[cIndex][index].service_time);
    }
    //区域改变城市列表
    function changeArea(index){
        var pListLen = provenceData.areaList[index].length;
        var listArr = provenceData.areaList[index];
        $("#cityList").html("");//清空

        for(var j=0; j<pListLen; j++){ //加载
            $("#cityList").append("<li id=\""+j+"\">"+listArr[j]+"</li>");
            $("input[name=changeCity]").val(0);
            $("#selectCity").html(listArr[0]);
        }
    }
    //查询地址列表结果
    function changeAddressSelect(index){
        var pListLen = cityPoiData.proList[index].length;
        var listArr = cityPoiData.proList[index];
        $("#addressList").html("");//清空

        //load的时候加载第一个地址
        setOptions(index,0);

        for(var j=0; j<pListLen; j++){ //加载
            $("#addressList").append("<li p-id=\""+index+"\" id=\""+j+"\"  class=\"w280\" title=\""+listArr[j].address+"\">"+listArr[j].address+"</li>");
            $("input[name=changeAddress]").val(listArr[0].address);
            $("#selectAddress").html(listArr[0].address);
        }
    }
    //加载区域点遮罩物
    function loadAreaOverlay(){
        var contentString = [];
        var infoWindowTitle=[];
        var infoWindow = [];
        var myLatlng = [];
        var marker = [];
        for(var i=0; i<provenceData.area.length; i++){
            myLatlng[i]=new BMap.Point(provenceData.lat[i],provenceData.lng[i]);
            infoWindowTitle[i]=provenceData.area[i];
            contentString[i] = "<div class=\"ui_area_infoContent\">";
            for(var j=0; j<provenceData.areaList[i].length;j++){
                contentString[i] += "<A class=\"areaPoint\" onclick=\"moveToCity(this.id);\" id=\""+provenceData.areaList[i][j]+"\" href=\"javascript:void(0);\">"+provenceData.areaList[i][j]+"</a> ";
            }
            contentString[i] += "</div>";
            //设置窗口参数
            infoWindow[i] = new BMapLib.SearchInfoWindow(map,contentString[i],{
                title:infoWindowTitle[i],
                width:386,
                panel:"panel",
                enableSendToPhone: false,
                searchTypes :[
                    //BMAPLIB_TAB_SEARCH,   //周边检索
                    //BMAPLIB_TAB_TO_HERE,  //到这里去
                    //BMAPLIB_TAB_FROM_HERE //从这里出发
                ]
            });
            marker[i]= new BMap.Marker(myLatlng[i]);
            map.addOverlay(marker[i]);
            //信息点绑定click事件
            try{
                //marker[i].addEventListener("click",openInfo.bind(null,infoWindowTitle[i],contentString[i],i));
                addClickHandler(infoWindowTitle[i],contentString[i],marker[i]);
            }catch(error){
            }
        }

    }

    //点击加载对应城市
    function moveToCity(cityName){
        var name = cityName;
        map.clearOverlays();
        map.setZoom(12);
        for(var i=0; i<cityPoiData.cityName.length; i++){
            if(name==cityPoiData.cityName[i]){
                loadCityMap(i);
            }
        }
    }

    //加载体验店函数
    function loadCityMap(index){
        map.clearOverlays();
        map.setZoom(12);
        var contentString = [];
        var infoWindow =[];
        var marker =[];
        var infoWindowTitle=[];
        var myLatlng = [];
        var tArr = [];
        var cArr = [];
        for(var i=0; i<cityPoiData.proList[index].length; i++){
            myLatlng[i]=new BMap.Point(cityPoiData.proList[index][i].lat,cityPoiData.proList[index][i].lng);
            infoWindowTitle[i]=cityPoiData.proList[index][i].title+'<a class="show_pralion" href="'+cityPoiData.proList[index][i].url+'?tId='+cityPoiData.proList[index][i].id+'" title="参观该馆" target="_blank">参观该馆</a>';
            contentString[i]='<div class="ui_map_info"><em>展馆地址：</em>'+cityPoiData.proList[index][i].address+'<br />';
            contentString[i]+='<em>营业时间：</em>'+cityPoiData.proList[index][i].service_time+'<br />';
            contentString[i]+='<em>服务电话：</em>'+cityPoiData.proList[index][i].tel+'</div>';
            //设置窗口参数
            infoWindow[i] = new BMapLib.SearchInfoWindow(
                map,contentString[i],{
                    title:infoWindowTitle[i],
                    width:386,
                    panel:"panel",
                    enableSendToPhone: false,
                    searchTypes :[
                        //BMAPLIB_TAB_SEARCH,   //周边检索
                        //BMAPLIB_TAB_TO_HERE,  //到这里去
                        //BMAPLIB_TAB_FROM_HERE //从这里出发
                    ]
                });

            marker[i]= new BMap.Marker(myLatlng[i]);
            map.addOverlay(marker[i]);
            infoWindow[0].open(myLatlng[0]); //默认打开第一个点的窗口
            //信息点绑定click事件
            try{
                addClickHandler(infoWindowTitle[i],contentString[i],marker[i]);
            }catch(error){

            }

        }
    }
    //市级点点击打开窗口事件
    function addClickHandler(title,content,marker){
        marker.addEventListener("click",function(e){
            var p = e.target;
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            var infoWindow = new BMapLib.SearchInfoWindow(map,content,{
                title:title,
                width:386,
                enableSendToPhone: false,
                searchTypes :[
                    //BMAPLIB_TAB_SEARCH,   //周边检索
                    //BMAPLIB_TAB_TO_HERE,  //到这里去
                    //BMAPLIB_TAB_FROM_HERE //从这里出发
                ]
            });  // 创建信息窗口对象
            infoWindow.open(point); //开启信息窗口
        });
    }


});