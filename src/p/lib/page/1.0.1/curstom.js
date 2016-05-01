define(function(require, exports, module) {

    var tempcomment = require('../../template/tempcomment');
    var tempcurstom = require('../../template/tempcurstom');

    var mainNav     = require('../../components/mainNav/1.0.1/mainNav');
    var initSlider = require('../../components/slider3D/1.0.0/slider3d');
    var dialog = require('../../components/dialog/1.0.0/dialog');
    var rotate = require('../../components/rotate/2.3.0/rotate');
    var minBar = require('../../components/minBar/1.0.1/minBar');

    $(function() {
        /* =====================================================================
         *    新版浮动工具栏交互
         * =====================================================================*/
        minBar({
            mainCell   : '#J_minBar',
            pathConfig : cdnConfig,
            tpl        : tempcomment,
            tplName    : "tplMinBar",
            data : _globalConfig.minBar.data
        });
        /*
         *  主导航滑动效果  =================================================
         */
        //主导航效果
        mainNav({
            mainCell: "JQ_headNavMenu",
            lineCell: "JQ_headNavLine"
        });
        $("input").each(function() {
            $(this).focus(function() {
                formTipHidden("#diyform");
            })
        });
        slider3Dstyle();
        silder3Dtab();
        initSlider({
            dom: "sliderList",
            number: $("#sliderList li").length,
            speed: 2000,
            showTitle: true
        });
        jsPlaceholder();
        bottomBar();
        diyToOfflineBaidu();
        diySelect();
        $("#J_desingerList").html(tempcurstom("tplCurstomDesigners", desigerData));
        desingerRotate();
        $("#J_submitBtn").on("click", function() {
            chkDiyForm();
        });
        $("#J_curstomTab .tab-item").each(function() {
            $(this).on('click', function() {
                $("#J_curstomTab .tab-item").removeClass('cur');
                $(this).addClass('cur');
                var tabValue = $(this).html() + "市";
                diyToOfflineBaidu(tabValue);
            })
        })
        diyGoTopBtn("#J_bookingBtn");
    });

    function silder3Dtab() {
        $(".diy-3d-tab a").each(function(index, element) {
            $(this).click(function(e) {
                $(this).addClass("cur").siblings().removeClass("cur");
            });
        });
    }

    function slider3Dstyle() {
        var sliderTitleHtml = '';
        for (var i = 0; i < sliderData.sliderTitle.length; i++) {
            sliderTitleHtml += '<a href="javascript:void(0);" class="3d-tab-item" data-idx="' + [i] + '">' + sliderData.sliderTitle[i] + '</a>';
        }
        $('#J_styleName').html(sliderTitleHtml);
        $('#J_styleName a').eq(0).addClass("cur");
        //3d结构
        $("#J_slider3D").html(tempcurstom("tplCurstomSlider3D", sliderData));
        //点击切换
        $(document).on('click', '.3d-tab-item', function() {
            var idx = $(this).attr('data-idx');
            $('.slider3DList img').each(function() {
                var imgIdx = $(this).parent().index();
                $(this).attr('src', sliderData.dataList[idx][imgIdx].imgSrc);
            });
            $('.slider3DList .b_tit').each(function() {
                var infoIdx = $(this).parent().index();
                $(this).html(sliderData.dataList[idx][infoIdx].thisInfo);
            });
        });
    }

    function chkDiyForm() {
        var userName = diyForm.userName.value;
        var phNum = diyForm.phNum.value;
        var uraddr = diyForm.uraddr.value;
        /*var urStyle = diyForm.urStyle.value;*/
        var changePro = diyForm.changePro.value;
        var changeCity = diyForm.changeCity.value;
        /*var changeSty = diyForm.changeSty.value;*/
        var data = {
            "userName": userName,
            "phNum": phNum,
            "addr": uraddr,
            "changePro": changePro,
            "changeCity": changeCity
        };
        if (chkUsername(userName)) {
            if (chkTelphone(phNum)) {
                if (!(uraddr == "")) {
                    $.ajax({
                        url: '/default/savecustom',
                        //url: "http://misc.jjcdn.com/p/html/curstom/test.php",
                        type: 'POST',
                        data: data,
                        dataType: 'json',
                        success: function(res) {
                            if (res.done == 'ok') {
                                var str = '<div class = \"ui-conments-dialog-content\" id = \"noticeContent\"><div class =\"ui-conments-dialog-msgbig\"><i class = \"ui-conments-dialog-icon-smile\"></i><b>恭喜您！申请成功！</b></div><p class = \"ui-conments-dialog-msgsp\"><span>金海马客服于24小时内与您电话联系。</span></p></div>';
                                var d = new dialog({
                                    title: '提示',
                                    content: str,
                                    width: 400,
                                    height: 130,
                                    fixed: true,
                                    button: [{
                                        value: "确定",
                                        id: "J_ok",
                                        className: "ui-btns-orange",
                                        callback: function() {
                                            window.location.reload();
                                        }
                                    }]
                                }).showModal();
                                setTimeout(function() {
                                    window.location.reload();
                                    d.close().remove();
                                }, 5000);
                            }
                        },
                        faile: function() {}
                    })
                } else {
                    formTipShow("uraddr", "详细地址不能空哦")
                    return false;
                }
            }
        }
        return false;
    };

    function diySelect() {
        //省选择下拉
        $("#proLabel").click(function() {
            $("#proList").css("display", "block");
            $("#ProIcon").addClass("cur");
            event.stopPropagation();
            return false;
        });
        $(document).on("click", "#proList li", function() {
            $("#selectPro").html($(this).html());
            $("#changePro").val($(this).attr("id"));
            $("#proList").hide();
            $("#ProIcon").removeClass("cur");
        });
        //城市选择下拉
        $("#cityLabel").click(function() {
            $("#cityList").css("display", "block");
            $("#cityIcon").addClass("cur");
            event.stopPropagation();
            return false;
        });
        $(document).on("click", "#cityList li", function() {
            $("#selectCity").html($(this).html());
            $("#changeCity").val($(this).attr("id"));
            $("#cityList").hide();
            $("#cityIcon").removeClass("cur");
        });
        //定制方式下拉
        /*$("#diyIcon").click(function() {
            $("#diyList").css("display", "block");
            event.stopPropagation();
            return false;
        });
        $(document).on("click", "#diyList li", function() {
            $("#selectDiy").html($(this).html());
            $("#changeDiy").val($(this).attr("id"));
            $("#diyList").hide();
        });*/
    }

    function chkUsername(inv) {
        var reg = /([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g
        if (inv == "") {
            formTipShow("userName", "您的称呼不能为空");
            return false;
        } else {
            if (reg.test(inv)) {
                formTipShow("userName", "姓名中不能有特殊字符")
                return false;
            } else {
                return true;
            }
        }
        return false;
    };

    function chkTelphone(inv) {
        /*var reg = /^(134|135|136|137|138|139|150|151|152|157|158|159|187|130|131|132|155|156|183|185|186|133|153|180|189|188|170)\d{8}$/;*/
        var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
        if (isNaN(inv) || inv == "") {
            inv == "" ? formTipShow("phNum", "您的手机号码不能为空") : formTipShow("phNum", "只能是纯数字");
            return false;
        } else {
            if (reg.test(inv)) {
                return true;
            } else {
                formTipShow("phNum", "手机号码格式有误")
                return false;
            }
        }
        return false;
    };

    function chkUrStyle150(inv) {
        if ((inv.length >= 0) && (inv.length <= 150)) {
            return true;
        } else {
            formTipShow("urStyle", "详细描述最多可以有150字哦")
            return false;
        }
        return false;
    };

    function formTipShow(objName, str) {
        var obj = $("input[name=" + objName + "]");
        var areaObj = $("textarea[name=" + objName + "]");
        obj.parent().append('<p class="tip"><i></i><span>' + str + '</span></p>');
        areaObj.parent().append('<p class="tip"><i></i><span>' + str + '</span></p>');
        $(".tip").show();
    };

    function delTip() {
        $(".tip").slideUp(500, function() {
            $(this).remove();
        });
    };

    function formTipHidden(formId) {
        var fId = $(formId);
        var allobj = fId.find(".tip");
        /*var pObj = document.getElementById(formId);
        pObj.getElementsByClassName("p");*/
        allobj.remove();
    };

    function jsPlaceholder() {
        $(".curstom-apply .text").each(function() {
            var thisVal = $(this).val();
            //判断文本框的值是否为空
            if (thisVal != "") {
                $(this).siblings("label").hide();
            } else {
                $(this).siblings("label").show();
            }
            //获取焦点后输入框验证
            $(this).focus(function() {
                $(this).siblings("label").hide();
            }).blur(function() {
                var val = $(this).val();
                if (val != "") {
                    $(this).siblings("label").hide();
                } else {
                    $(this).siblings("label").show();
                }
            });
        })
    };

    function desingerRotate() {
        //圆形PNG
        $("#J_desingerList .head-pic").each(function() {
            $(this).rotate({
                bind: {
                    mouseover: function() {
                        $(this).rotate({
                            duration: 300,
                            animateTo: 35,
                            callback: function() {
                                var thisPaPaNum = $(this).parent().attr("des-item");
                                var thisDetail = $(this).parent().find(".detail");
                                var str = "<i class=\"tip-icon-w\"></i><i class=\"tip-icon-g\"></i><p class=\"pic\"><img src=\"" + desigerData.desDetail[thisPaPaNum - 1].desPic + "\" alt=\"" + desigerData.desDetail[thisPaPaNum - 1].desTitle + "\"></p><div class=\"info\"><p class=\"name\">" + desigerData.desDetail[thisPaPaNum - 1].desName + "</p><p class=\"title\"><span>" + desigerData.desDetail[thisPaPaNum - 1].desTitle + "</span></p><p class=\"style\"><label>擅长风格：</label><span>" + desigerData.desDetail[thisPaPaNum - 1].desStyle + "</span></p><p class=\"idea\"><label>设计师理念：</label><span>" + desigerData.desDetail[thisPaPaNum - 1].desIdea + "</span></p></div>"
                                thisDetail.html(str);
                                thisDetail.addClass("cur");
                            }
                        })
                    },
                    mouseout: function() {
                        $(this).rotate({
                            duration: 0,
                            animateTo: 0,
                            callback: function() {
                                var thisDetail = $(this).parent().find(".detail");
                                thisDetail.removeClass("cur");
                            }
                        })
                    }
                }
            });
        });
    };

    function bottomBar() {
        diyGoTopBtn("#J_goToApply");
        $(window).scroll(function() {
            if ($(document).scrollTop() > 350) {
                $('.ui-curstom-alwaysdown').show();
                $('.ui-curstom-alwaysdown-bg').show();
            } else {
                $('.ui-curstom-alwaysdown').hide();
                $('.ui-curstom-alwaysdown-bg').hide();
            }
        })
    };

    function diyGoTopBtn(btnFlag) {
        $(btnFlag).click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
    };

    function diyToOfflineBaidu(city0) {
        var city = city0 || "广州市";
        var map = new BMap.Map("diyMap");
        map.centerAndZoom(new BMap.Point(113.375284, 23.101724), 10);
        map.enableScrollWheelZoom();
        map.enableContinuousZoom();
        var myCity = new BMap.LocalCity();
        setCurrentCity(city);

        function setCurrentCity(cName) {
            for (var i = 0; i < cityPoiData.cityName.length; i++) {
                if (cityPoiData.cityName[i] == cName) {
                    loadCityMap(i, cName);
                }
            }
        }

        function loadCityMap(index, cityName) {
            map.centerAndZoom(cityName, 11);
            map.setZoom(12);
            var contentString = [];
            var infoWindow = [];
            var marker = [];
            var infoWindowTitle = [];
            var myLatlng = [];
            for (var i = 0; i < cityPoiData.proList[index].length; i++) {
                myLatlng[i] = new BMap.Point(cityPoiData.proList[index][i].lat, cityPoiData.proList[index][i].lng);
                marker[i] = new BMap.Marker(myLatlng[i]);
                map.addOverlay(marker[i]);
                setInfo(0, cityName);
                try {
                    marker[i].addEventListener("click", setInfo.bind(null, i, cityName));
                } catch (error) {}
            }
        }

        function setInfo(index, cName) {
            for (var i = 0; i < cityPoiData.cityName.length; i++) {
                if (cityPoiData.cityName[i] == cName) {
                    $("#expTitle").html(cityPoiData.proList[i][index].title);
                    $("#expSerTel").html(cityPoiData.proList[i][index].tel);
                    $("#expSerTime").html(cityPoiData.proList[i][index].service_time);
                    $("#expAddress").html(cityPoiData.proList[i][index].address);
                    $("#expInfo").html(cityPoiData.proList[i][index].info);
                    $("#url").attr("href", "/offline?id=" + cityPoiData.proList[i][index].id);
                }
            }
        }
    };
    var desigerData = {
        "desDetail": [{
            "decHeadPic": "http://misc.jjcdn.com/p/images/curstom/desinger_headpic1.png",
            "desPic": "http://misc.jjcdn.com/p/images/curstom/desinger_pic1.jpg",
            "desName": "戴青松",
            "desTitle": "金海马商城●定制家居高级设计师",
            "desStyle": "现代风格,欧式风格,现代中式风格",
            "desIdea": "设计不是追求完美，设计是符合客户功能需求的同时来实现一种美感，它有取有舍，是一种思绪的较量，金海马家居定制为您打造一个完美而好用的家。"
        }, {
            "decHeadPic": "http://misc.jjcdn.com/p/images/curstom/desinger_headpic2.png",
            "desPic": "http://misc.jjcdn.com/p/images/curstom/desinger_pic2.jpg",
            "desName": "达传刚",
            "desTitle": "金海马商城●定制家居高级设计师",
            "desStyle": "现代简约，简欧风格，新中式",
            "desIdea": "定制设计最主要的是切合实际为顾客量身打造一个温暖、舒适的家，美观固然重要，实用才是设计根本所在。"
        }, {
            "decHeadPic": "http://misc.jjcdn.com/p/images/curstom/desinger_headpic3.png",
            "desPic": "http://misc.jjcdn.com/p/images/curstom/desinger_pic3.jpg",
            "desName": "刘升远",
            "desTitle": "金海马商城●定制家居高级设计师",
            "desStyle": "现代欧式，现代风格，混搭风",
            "desIdea": "设计“因人而起”－外观造型迎合个人喜好；空间尺度符合人机工程；风格特点表现人文文化。"
        }, {
            "decHeadPic": "http://misc.jjcdn.com/p/images/curstom/desinger_headpic4.png",
            "desPic": "http://misc.jjcdn.com/p/images/curstom/desinger_pic4.jpg",
            "desName": "朱建飞",
            "desTitle": "金海马商城●定制家居高级设计师",
            "desStyle": "地中海风格，现代风格，欧式风格",
            "desIdea": "定制设计就是根据客户喜欢的款式与需求，结合多年的经验，切合实际出发构思大方得体而又实在的方案，定制营造出一个时尚独特而又温馨实用的家。"
        }, {
            "decHeadPic": "http://misc.jjcdn.com/p/images/curstom/desinger_headpic5.png",
            "desPic": "http://misc.jjcdn.com/p/images/curstom/desinger_pic5.jpg",
            "desName": "许新凤",
            "desTitle": "金海马商城●定制家居高级设计师",
            "desStyle": "地中海风格，现代风格，欧式风格",
            "desIdea": "好的生活其实很简单，在一个并不很大的空间里满足你所有的想像。甚至于很少的细节，作为家居设计师都要让这种美好的感觉实现加倍，达到完美的体验。"
        }, {
            "decHeadPic": "http://misc.jjcdn.com/p/images/curstom/desinger_headpic6.png",
            "desPic": "http://misc.jjcdn.com/p/images/curstom/desinger_pic6.jpg",
            "desName": "苏丽梅",
            "desTitle": "金海马商城●定制家居高级设计师",
            "desStyle": "浪漫风格、北欧风格",
            "desIdea": "珍惜有限空间 打造无限品味，为“您”设计心灵的归宿—家。住空间并非单纯的物质品牌，更多的是精神物质的需求；设计最终能更具体、更感性地传达健康、舒适、情趣、高尚的生活态度和居住美学。"
        }]
    };

})
