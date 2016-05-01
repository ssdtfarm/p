define(function(require, exports, module) {
  /*===============================*/
  /*  详情页js文件
   *  @author linyandi
   *  @date   2015-03-24
   /* ==============================*/
  //引入依赖
  var template = require('../../template/tempitem');
  var templateComment = require('../../template/tempcomment');
  var mainNav = require('../../components/mainNav/1.0.1/mainNav');
  var qrcoder = require('../../components/qrcode/1.0.0/qrcode');
  var dialog = require('../../components/dialog/1.0.0/dialog');
  var lazyload = require('../../components/lazyload/1.0.0/lazyload');
  var zoom = require('../../components/zoom/1.0.0/zoom');
  var itemPage = require('../../components/itemPage/1.0.0/itemPage');
  var itemAddress = require('../../components/itemAddress/1.0.0/itemAddress');
  var slider = require('../../components/slider/1.0.0/slider');
  var minBar = require('../../components/minBar/1.0.1/minBar');

  var addFly = require("../../components/addCartFly/1.0.0/addCartFly");

  var countDownTimer = null;
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
      countDownTimer && clearTimeout(countDownTimer);
      callback && callback();
    }
  }

  function limitEnd() {
    countOff = false;
    if (getDate() != 22) {
      setStatus(1);
    } else {
      setStatus(0);
    }

  }

  function limitStart() {
    $('.item-btn-cart').html('立即抢购').removeClass('item-btn-cart-forbit');
    countOff = true;
  }

  function hideCount() {
    $('.countDown').hide();
  }

  function forBitAddcart() {
    $('.item-btn-cart').addClass('item-btn-cart-forbit').html('敬请期待');
  }

  function getDate() {
    return new Date().getDate();
  }

  function setStatus(num) {
    var html = '';
    switch (num) {
      case 0:
        html = '活动已结束！';
        break;
      case 1:
        html = '抢光了，敬请期待。';
        break;
      case 2:
        html = '抢购中...';
        break;
    }
    $('.acTips').html(html);
  }

  function startTiming(startTime) {
    countDown(startTime, function(curDay, curHour, curMinute, curSecond) {
      $('.countDown .tips').html('距离活动开始还有:');
      $('.countDown .hour').html(curHour + "时");
      $('.countDown .minute').html(curMinute + "分");
      $('.countDown .second').html(curSecond + "秒");
    }, function() {
      limitStart();
      endTiming(endTime);
    });
  }

  function endTiming(endTime) {
    countDown(endTime, function(curDay, curHour, curMinute, curSecond) {
      $('.countDown .tips').html('抢购中...，离结束:');
      $('.countDown .hour').html(curHour + "时");
      $('.countDown .minute').html(curMinute + "分");
      $('.countDown .second').html(curSecond + "秒");
    }, function() {
      hideCount();
      forBitAddcart();
      limitEnd();
    });
  }

  var startTime = itemConfig.limitTime - itemConfig.startTime,
    endTime = itemConfig.endTime - itemConfig.startTime,
    countOff = false,
    limitStock = itemConfig.stock;

  //startTime = 1000;

  if (itemConfig.acStart) {

    if (limitStock === 0) {
      limitEnd();
      forBitAddcart();
    } else {
      if (endTime < 0) {
        limitEnd();
      } else {
        limitStart();
        endTiming(endTime);
      }
    }
  } else {
    forBitAddcart();
    startTiming(startTime);
  }

  //loadDetail("#J_detailContent");

  /*
   * 导航栏和所有分类下拉菜单 =======================================
   */
  $("#J_mainNav").html($("#J_mainNavTemp").html());
  //主导航效果
  mainNav({
    mainCell: "JQ_headNavMenu",
    lineCell: "JQ_headNavLine"
  });
  //console.End("ddd");
  /*
   * app下载二维码 =======================================
   */

  function randerQrcode(w, h, url, wrap) {

    var userAgent = navigator.userAgent.toLowerCase();
    var renderType = 'canvas';

    if (/msie/ig.test(userAgent)) {
      renderType = 'table';
    }

    wrap.qrcode({
      text: url,
      render: renderType,
      width: w,
      height: h
    });

  }
  /*randerQrcode(29, 29, "http://m.kinhom.com/download/index", $('#J_appDownSmall'));*/
  randerQrcode(85, 85, "http://m.kinhom.com/download/index", $('#J_appDownBig'));

  //显示大的二维码
  /*$(".item-btn-app").mouseover(function(event) {
      event.preventDefault();

      var that = $(this);
      that.find(".app-qrcode-big").show();
  }).mouseout(function(event){
     var that = $(this);
      that.find(".app-qrcode-big").hide();
  });*/

  //点击二维码去到下载主页
  $(".item-btn-app").attr("href", itemConfig.appDownLoad).attr("target", "_blank");
  /*
   * 产品相册处理模块 ============================================
   */
  //调用zoom插件
  $("#J_albumBig").zoom({
    url: $("#J_albumBig").children("img").attr("src")
  });
  //点击小图设置大图
  $("#J_thumb li a").each(function(index) {
    var that = $(this);
    that.on("click", function(event) {
      event.preventDefault();
      //变换class
      toggleClass(that.parent("li"), "cur");
      //设置大图
      setBigThumb(that, "J_albumBig");
    });
  });
  /*
   * 变换class函数 toggleClass(obj, className)
   * @param obj为要操作的对象
   * @param className 变换的class名
   */
  function toggleClass(obj, className) {
    if (!obj.hasClass(className)) {
      obj.addClass(className);
      obj.siblings().removeClass(className);
    }
  }
  /*
   * 点击小图设置大图函数 setBigThumb(obj, domID)
   * @param obj当前对象
   * @param domID 目标对象ID
   */
  function setBigThumb(obj, domID) {
    var sourceURL = obj.children("img").attr("src");

    var targetURL = sourceURL.indexOf("!") > -1 ? sourceURL.split("!")[0] + "!max" : sourceURL;
    var tarObj = $("#" + domID).children("img");
    tarObj.attr("src", targetURL);
  }
  /*
   * 获取成交数量、评论数量 ==========================================
   */
  try {
    $.ajax({
      url: cdnConfig.itemApiPath + '/static/' + itemConfig.skuID,
      dataType: 'jsonp',
      success: function(result) {
        // console.log(result);
        if (result.status == "succ") {
          //商品信息里面的成交总数
          //$("#J_saleNum").html(result.data.bidTotal);
          //商品信息里面的评论总数
          $("#J_commentNum").html(result.data.commentsTotal);
          //详情里面的成交总数
          $("#J_bidDetailTotal").html(result.data.bidTotal);
          //商品详情里面的评论总数
          $("#J_detailCommentsTotal").html(result.data.commentsTotal);
          //全部评价
          $("#J_allCommentsNum").html(result.data.commentsTotal);
          //好评
          $("#J_goodCommentsNum").html(result.data.comGoodTotal);
          //中评
          $("#J_normalCommentsNum").html(result.data.comNormalTotal);
          //差评
          $("#J_badCommentsNum").html(result.data.comBadTotal);
          //设置评论的百分比
          setCommentsPercent(result.data.commentsTotal, result.data.comGoodTotal, result.data.comNormalTotal, result.data.comBadTotal);
        }
      }
    });
  } catch (e) {}
  /*
   * 地址相关 ====================================================
   */
  //计算默认的物流信息
  //获取库存
  getStock(440100, 440106, itemConfig.skuID, $("#J_itemNumTip"));

  //调用选择地址模块
  itemAddress({
    dom: "#J_selectAddress",
    tpl: template,
    tplName: 'tplItemAddress',
    proCallback: function(obj) {
      // console.log(obj)
    },
    cityCallback: function(obj) {
      // console.log(obj);
    },
    areaCallback: function(obj) {
      // console.log(obj);
      // getShip(obj.attr("data-id"));
      getStock(obj.attr("data-id"), obj.attr("data-id"), itemConfig.skuID, $("#J_itemNumTip"));
    }
  });
  /*
   * 属性相关 =======================================================
   */
  //分享返现标题的提示框
  if (typeof document.getElementById("J_rebateTag") != undefined) {
    try {
      var tagObj = document.getElementById("J_rebateTag");
      var rebateTagDialog = new dialog({
        content: tagObj.getAttribute("title"),
        align: 'right'
      });

      tagObj.onmouseover = function() {
        rebateTagDialog.show(tagObj);
      };

      tagObj.onmouseout = function() {
        rebateTagDialog.close();
      }
    } catch (e) {}
  }
  //删除温馨提示前面的dt,暂时处理.
  $(".item-btns").nextAll(".item-propery-list").children("dt").remove();
  //暂时处理没有活动时删除活动提示容器
  if ($.trim($(".item-active-info").html()) === "") {
    $(".item-active-info").remove();
  }
  //返现规则提示框
  if (typeof document.getElementById("J_itemRebateRule") != undefined) {
    //暂时处理返现提示框
    if (document.getElementById("J_rebateTag") != undefined) {
      //console.log($("#J_rebateTag").parents("dd"));
      var target = $("#J_rebateTag").parents("dd");
      var $temp = $("#J_itemRebateRule");
      $("#J_itemRebateRule").remove();

      target.append($temp);
    }
    try {
      var rebateHtml = '';
      if (typeof document.getElementById("J_ruleText") != undefined) {
        rebateHtml = document.getElementById("J_ruleText").innerHTML;
      }

      var ruleObj = document.getElementById("J_itemRebateRule");
      var rebateRuleDialog = new dialog({
        width: 250,
        content: rebateHtml,
        align: 'bottom left',
        zIndex: 10023
      });
      ruleObj.onmouseover = function() {
        rebateRuleDialog.show(ruleObj);
      };
      ruleObj.onmouseout = function() {
        rebateRuleDialog.close();
      }
    } catch (e) {}
  }


  //预售
  if (typeof document.getElementById("J_preRuleText") != undefined) {
    try {
      var rebateHtml = '';
      if (typeof document.getElementById("J_preRuleText") != undefined) {
        rebateHtml = document.getElementById("J_preRuleText").innerHTML;
      }

      var ruleObj = document.getElementById("J_preRule");
      var rebateRuleDialog = new dialog({
        width: 366,
        content: rebateHtml,
        align: 'bottom right'
      });
      ruleObj.onmouseover = function() {
        rebateRuleDialog.show(ruleObj);
      };
      ruleObj.onmouseout = function() {
        rebateRuleDialog.close();
      }
    } catch (e) {}
  }
  /*
   * 库存和物流信息获取 ===================================================
   */
  //设置物流模板函数
  function setServiceTemplate(data) {
    //seajs.use(['lib/v1/1.0.0/item/tplItemService'], function(tplService){
    $("#J_service").html(template("tplItemService", data));
  //});
  }
  /**
   *  获取库存函数
   *  @param {ID}  城市或者地区的ID号
   *  @param {sku}  商品的sku
   *  @param {tarDom}  目标dom元素，格式为：$("#id") / $(".class")
   *  demo : getStock(410100, 143, $("#id"));
   */
  function getStock(cityID, areaID, sku, tarDom) {
    $.ajax({
      url: cdnConfig.itemApiPath + '/stock/' + sku,
      data: {
        "regionId": cityID
      },
      dataType: 'jsonp',
      success: function(res) {
        var result = res;
        var sellArr = [];
        var flagNum = 0;
        if (result.status == "succ") {
          $.ajax({
            url: cdnConfig.itemApiPath + '/ship/' + itemConfig.skuID,
            data: {
              "regionId": areaID
            },
            dataType: 'jsonp',
            success: function(res) {
              // console.log(res.data+"-189");
              if (res.status == "succ") {
                setServiceTemplate(res.data);
              }
              sellArr.push(res.data.sell);

              for (var i = 0; len = sellArr.length, i < len; i++) {
                if (sellArr[i]) {
                  flagNum += 1;
                }
              }
              // console.log(flagNum);
              setButton(flagNum);
            }
          });

          tarDom.html(result.data.name);

          sellArr.push(res.data.sell);

        }
      }
    });
  }
  //设置 “加入购物车按钮"
  function setButton(num) {
    if (num > 1) {
      //如果没有售空/下架，能加入购物车
      $(".item-btn-cart,.tab-cart-btn").attr("id", "JQ_addToCart");
      $(".item-btn-cart,.tab-cart-btn").removeClass("disable");
    } else {
      //不能加入购物车
      $(".item-btn-cart,.tab-cart-btn").removeAttr("id");
      $(".item-btn-cart,.tab-cart-btn").addClass("disable");
      //立即购不能用
      $("#J_buyNow").remove();
    }
  }
  /*
   * 详情页加减 ==========================================================
   */
  changeNumber();

  function changeNumber() {
    var numObj = $("#J_itemNum");
    var addNum = $("#J_addNum");
    var subNum = $("#J_subNum");
    //加数量
    addNum.on("click", function(event) {
      event.preventDefault();
      var numVal = numObj.val();

      numVal = numVal > 9999 ? 9999 : parseInt(numVal) + 1;

      numObj.val(numVal);
    });
    //减数量
    subNum.on("click", function(event) {
      event.preventDefault();
      var numVal = numObj.val();

      numVal = numVal <= 1 ? 1 : parseInt(numVal) - 1;

      numObj.val(numVal);
    });
    //输入数量
    numObj.on("keyup", function() {
      var valNum = $(this).val();
      if (isNaN(valNum)) {
        $(this).val(1);
      } else {
        if ((parseInt(valNum) <= 0) || (parseInt(valNum) > 9999)) {
          $(this).val(1);
        }
      }
    });
  }
  /*
   *     处理商品详情标题的"加入购物车"按钮的显示与否问题 ======================
   * */

  showSubAddCartBtn();

  function showSubAddCartBtn() {
    var target = $(".item-tab-cart");
    var DOM = $(".item-btn-cart");
    var _tarHei = target.outerHeight();

    var $topAdHei = $("#J_TopAd");
    var _topAdHei = 0;

    setTimeout(function() {
      _topAdHei = $topAdHei.outerHeight();

    }, 10);


    var offsetTop = DOM.offset().top;
    var scrollTop = $(window).scrollTop();
    var disHei = (offsetTop + _tarHei + _topAdHei) - scrollTop;

    if (disHei <= 0) {
      target.css({
        "display": "inline-block"
      });
    } else {
      target.css({
        "display": "none"
      });
    }

    $(window).scroll(function(event) {
      event.preventDefault();

      scrollTop = $(window).scrollTop();
      disHei = (offsetTop + _tarHei + _topAdHei) - scrollTop;

      if (disHei <= 0) {
        target.css({
          "display": "inline-block"
        });
      } else {
        target.css({
          "display": "none"
        });
      }

    });
  }


  /*
   *  加入收藏 ===========================================================
   *  @param   {}
   */
  if ($("#J_favorite i").hasClass("icon-item-fav-on")) {
    $("#J_favorite").addClass("album-info-fav-on");
  }
  $("#J_favorite").on("click", function(event) {
    event.preventDefault();
    //异步请求
    $.ajax({
      url: cdnConfig.apiPath + '/favorite/add/' + itemConfig.skuID,
      dataType: 'jsonp',
      success: function(res) {
        if (res.status == "succ") {
          showFavoriteDialog(res.data);
        }
      }
    });
  });
  //显示弹框函数
  function showFavoriteDialog(data) {
    var dHtmlHead = '<p>&nbsp;</p><p class="tc fs-14">';
    var dHtmlFoot = '</p>';

    //弹窗
    var d = new dialog({
      title: '提示',
      width: 400,
      height: 80,
      fixed: true,
      zIndex: 198502
    });
    switch (data.status) {
      //加入收藏成功
      case 'succ':
        $("#J_favorite i").removeClass("icon-item-fav-off").addClass("icon-item-fav-on");
        $("#J_favorite").addClass("album-info-fav-on");
        d.button([{
          value: '查看收藏夹',
          className: 'ui-btns-orange',
          callback: function() {
            //跳转到收藏夹
            window.location.href = ''
          },
          value: '继续逛逛',
          className: 'ui-btns-blue',
          callback: function() {}
        }]);
        d.content(dHtmlHead + data.msg + dHtmlFoot);
        d.showModal();
        break;
      case 'nologin':
        d.button([{
          value: '去登录',
          className: 'ui-btns-orange',
          callback: function() {
            //去登录页面
            window.location.href = cdnConfig.my + '/passport/login';
          }
        }, {
          value: '继续逛逛',
          className: 'ui-btns-blue',
          callback: function() {}
        }]);
        d.content(dHtmlHead + data.msg + dHtmlFoot);
        d.showModal();
        break;
      case 'failed':
        //$("#J_favorite i").removeClass("icon-item-fav-off").addClass("icon-item-fav-on");
        d.button([{
          value: '好的',
          className: 'ui-btns-orange',
          callback: function() {}
        }]);
        d.content(dHtmlHead + data.msg + dHtmlFoot);
        d.showModal();
        break;
      default:
        d.button([{
          value: '好的',
          className: 'ui-btns-orange',
          callback: function() {}
        }]);
        d.content(dHtmlHead + data.msg + dHtmlFoot);
        d.showModal();
        break;
    }
  }
  /*
   * 加入购物车 ===========================================================
   */
  $(document).on("click", ".J_addToCart", function(event) {
    // $("#J_addToCart").on("click", function(event){
    event.preventDefault();

    var addDialog = new dialog({
      title: '成功加入购物车',
      content: '<p>&nbsp;</p><p class="tc fs-16"><i class="icon-face-smile-orange"></i>&nbsp;&nbsp;<b>成功添加到购物车！</b></p>',
      width: 400,
      height: 80,
      fixed: true,
      zIndex: 198502,
      button: [{
        value: '去购物车结算',
        className: 'ui-btns-orange',
        callback: function() {
          window.location.href = cdnConfig.cartApiPath + '/list.html';
        }
      }, {
        value: '继续逛逛',
        className: 'ui-btns-blue',
        callback: function() {}
      }]
    });
    //2015-05-11修改加入购物车提交方式为跳转页面
    try {
      if (countOff) {
        if (itemConfig.isLogin) {
          window.location.href = 'http://cart.kinhom.com/buynow/' + itemConfig.skuID + '/' + 1 + '?pro_id=' + itemConfig.pro_id;
        } else {
          window.location.href = 'http://passport.kinhom.com/' + '?url=' + window.location.href;
        }
      }
    } catch (e) {}
  });
  //处理要飞的缩略图,详情页跟列表页需要区分出来.

  //动画加入购物车效果
  function flyToCart(domID, btn) {

    var clickDOM = btn; //点击对象
    var imgDOM = $("#J_thumb img").eq(0);
    //console.log(imgDOM);
    //点击按钮的左边距和上边距
    var sLeft = btn.offset().left;
    var sTop = btn.offset().top;

    var tarDOM = $(".min-bar-cart-icon"); //目标元素
    var eLeft = tarDOM.offset().left;
    var eTop = tarDOM.offset().top;

    var wScrollTop = $(window).scrollTop();

    $("#J_thumb img").each(function(index) {
      if (index === 0) {
        $colone = $(this).clone();
        $colone.attr("id", "J_flyImg").appendTo(".JQ_addToCart").css({
          "position": "fixed",
          "left": "-999999px"
        });
      }
    });

    //console.log(sLeft, sTop, eLeft, eTop, wScrollTop);
    //
    $("#J_flyImg").fly({
      start: {
        left: sLeft, //开始位置（必填）#fly元素会被设置成position: fixed
        top: sTop - wScrollTop //开始位置（必填）
      },
      end: {
        left: eLeft, //结束位置（必填）
        top: eTop - wScrollTop, //结束位置（必填）
        width: 10, //结束时高度
        height: 10 //结束时高度
      },
      autoPlay: true, //是否直接运动,默认true
      speed: 1.1, //越大越快，默认1.2
      vertex_Rtop: 100, //运动轨迹最高点top值，默认20
      onEnd: function() {
        //console.log("sfsdfsdf");
        //$("#J_flyImg").remove();
      } //结束回调
    });
  //$(domID).play(); //autoPlay: false后，手动调用运动
  //移除dom
  }
  /*
   *   立即购 ===============================================================
   */
  $("#J_buyNow").on("click", function(event) {
    event.preventDefault();
    var beUserID = $("input[name=beUser]").val();
    var num = $("#J_itemNum").val();
    reqURL = cdnConfig.cartApiPath + '/buynow/' + itemConfig.skuID + '/' + num + '?beuser=' + beUserID;
    window.location.href = reqURL;
  });
  /*
   *   商品详情加入购物车按钮 =================================================
   *
   * */
  $("#J_detailAddCart").on("mouseover", function(event) {
    event.preventDefault();
    var tarDom = $(".JQ_tabCartList");
    var imgURL = itemConfig.itemImgURL;
    var html = "";
    if (!/!small/.test(itemConfig.itemImgURL)) {
      imgURL = itemConfig.itemImgURL + '!small'
    }
    //显示当前商品信息
    html += '<span class="cart-list-item clearfix">';
    html += '<img src="' + imgURL + '" alt="' + itemConfig.itemTitle + '" width="90" height="60" />';
    html += '<span class="cart-item-title">' + itemConfig.itemTitle + '</span>';
    html += '<span class="cart-item-price">&yen; ' + itemConfig.itemPrice + '</span>';
    html += '</span>';

    tarDom.html(html);


  //获取购物车列表
  //$.ajax({
  //    url : cdnConfig.apiPath + '/cart/minilist',
  //    //url : 'http://api.jiajucn.com/cart/minilist',
  //    dataType : 'jsonp',
  //    success : function(res) {
  //        var html = '';
  //
  //        if(res.code == "200") {
  //            var list = res.data.list;
  //            if(list.length>0) {
  //                for (var i = 0; i < list.length; i++) {
  //
  //                    html += '<span class="cart-list-item clearfix">';
  //                    html += '<img src="'+ list[i].src +'" alt="'+ list[i].title +'" width="90" height="60" />';
  //                    html += '<span class="cart-item-title">'+ list[i].title +'</span>';
  //                    html += '<span class="cart-item-price">&yen; '+ list[i].price+'</span>';
  //                    html += '</span>';
  //
  //                    tarDom.html(html);
  //                }
  //            }
  //        }else{
  //            //console.log(res.msg);
  //            //html = '<span class="cart-list-item clearfix tc">您的购物车空空的~</span>';
  //            html = '';
  //            tarDom.html(html);
  //        }
  //    },
  //    error   : function(err) {
  //        //console.log(err);
  //    }
  //});
  });

  /*
   *  热销排行 =============================================================
   */
  //热销排行榜默认数据
  var rankData = {
    "list": ""
  };



  //热销排行榜获取数据函数
  function loadHotSale() {
    $.ajax({
      url: cdnConfig.apiPath + '/rank',
      dataType: 'jsonp',
      success: function(res) {
        // console.log(res);
        if (res.status == "succ") {
          //组合数据
          rankData.list = res.data;
          //删除loading层
          $("#J_itemLeftLoading").remove();
          //加载相关的组件并渲染模板
          //seajs.use(['lib/v1/1.0.0/item/tplItemHot'],function(tplHot){
          $("#J_itemLeft").append(template("tplItemHot", rankData));
          //});
          loadHistory({
            "hasMt": true
          });
        } else {
          loadHistory({
            "hasMt": false
          });
        }
        //加载左边广告
        loadLeftAd();
      }
    });
  }
  /*
   *   加载猜你喜欢 =====================================================
   * */
  loadGuestLike();

  function loadGuestLike() {
    var guestData = {};
    $.ajax({
      url: cdnConfig.apiPath + '/recommend/getyoulike',
      dataType: 'jsonp',
      success: function(res) {
        //console.log(res);
        guestData.list = res.data;
        $("#J_itemLeft").append(template("tplItemGuestLike", guestData));

        //运行加载热销排行榜
        loadHotSale();

        lazyloadImg();
      }
    });

  }
  /*
   * 加载历史记录 =======================================================
   */
  function loadHistory(config) {
    var viewedData = {
      "list": "",
      "hasMt": config.hasMt
    };


    $.ajax({
      url: cdnConfig.apiPath + '/viewed',
      dataType: 'jsonp',
      success: function(res) {
        if (res.status == "succ") {
          //删除loading层
          $("#J_itemLeftLoading").remove();
          //组合数据
          viewedData.list = res.data;
          //加载相关的组件并渲染模板
          $("#J_itemRight").append(template("tplItemHistory", viewedData));

          lazyloadImg();

        } else {

        }
      }
    });
  }

  /*
   * 人气搭配 + 同类推荐 ===============================================================
   */
  //默认数据，异步获取时会更新这的数据
  var recData = {
    "hotList": "", //人气搭配数据
    "recList": "", //同类推荐数据
    "itemMarketPrice": itemConfig.itemMarketPrice, //产品市场价
    "itemPrice": itemConfig.itemPrice, //产品售价
    "itemTitle": itemConfig.itemTitle, //产品标题
    "itemImgURL": itemConfig.itemImgURL, //产品图片路径
    "itemLinkURL": itemConfig.itemLinkURL, //产品链接
    "itemSkuID": itemConfig.skuID, //产品skuID
    "apiPath": cdnConfig.cartApiPath //api

  };
  //调用获取人气搭配和同类推荐
  loadMatchRecomment("#J_itemRight");
  //异步获取人气搭配和同类推荐
  function loadMatchRecomment(tarID) {
    var tarObj = $(tarID);
    $.ajax({
      //获取人气搭配数据
      url: cdnConfig.itemApiPath + '/relevance/' + itemConfig.skuID,
      dataType: 'jsonp',
      success: function(hotRes) {
        if (hotRes.status == "succ") {
          // console.log(hotRes.data)
          recData.hotList = hotRes.data;
          //获取同类推荐数据
          $.ajax({
            url: cdnConfig.itemApiPath + '/congeneric/' + itemConfig.skuID,
            dataType: 'jsonp',
            success: function(ricRes) {
              if (ricRes.status == "succ") {
                recData.recList = ricRes.data;
              // console.log(ricRes.data);
              } else {
                recData.recList = false;
              }
              //渲染
              randerAll(tarObj);
            }
          })

        } else {
          recData.hotList = false;
          $.ajax({
            url: cdnConfig.itemApiPath + '/congeneric/' + itemConfig.skuID,
            dataType: 'jsonp',
            success: function(ricRes) {
              if (ricRes.status == "succ") {
                recData.recList = ricRes.data;
              } else {
                recData.recList = false;
              }
              randerAll(tarObj);
            }
          })
        }
      }
    });
  }
  //渲染人气搭配+同类推荐模块
  function randerAll(tarObj) {
    //渲染dom
    $("#J_itemRecommend").html(template("tplItemRecomment", recData));

    //调用tab切换
    itemTab({
      titCell: '#J_hotTitle',
      conCell: '#J_hotContent'
    });
    //人气搭配调用slider
    $("#J_hotSlider").slide({
      titCell: '.hd ul',
      mainCell: '.bd ul',
      autoPage: true,
      effect: 'left',
      vis: 3
    });
    //同类推荐调用slider
    $("#J_recommentSlider").slide({
      titCell: '.hd ul',
      mainCell: '.bd ul',
      autoPage: true,
      effect: 'left',
      vis: 5
    });
    $("input[name=skuArr]").val(itemConfig.skuID);
    //调用交互函数
    matchInteration(".JQ_hotCheck");

    lazyloadImg();
  //});
  }
  //人气搭配 交互
  function matchInteration(domNAME) {
    var inputName = "hotItem";
    var obj = $(domNAME);
    //var obj = $("input[name="+ inputName +"]");
    var numObj = $("input[name=hotNum]");
    //监听checkbox
    obj.each(function(index) {
      var that = $(this);
      var ind = index;
      that.on("click", function() {
        //console.log(that.hasClass("item-hot-check-on"));
        if (that.hasClass("item-hot-check-on")) {
          //console.log("sfsdf");
          that.removeClass("item-hot-check-on");
          that.parents("p").siblings().find("input[name=hotItem]").prop("checked", false);
        } else {
          //console.log(that);
          that.addClass("item-hot-check-on");
          that.parents("p").siblings().find("input[name=hotItem]").prop("checked", true);
        }

        setAllPrice(inputName);
      });
    });
  //监听数量输入
  //numObj.each(function(index){
  //    var reg = /^[0-9]{1,6}$/;
  //
  //    var that = $(this);
  //    var subChk = that.siblings("input[type=checkbox]");
  //    that.on("keyup", function(){
  //        var val = $(this).val();
  //        if(subChk.prop("checked") && reg.test(val)){
  //            setAllPrice(domNAME);
  //        }else{
  //            if(!reg.test(val)){
  //                $(this).val(1);
  //            }
  //            setAllPrice(domNAME);
  //        }
  //    })
  //})
  }
  //设置数量，价格，参数等
  function setAllPrice(domNAME) {
    //设置数量
    setChkNum(domNAME);
    //设置本站价
    $("#J_marketPriceCount").html(getMarketPrice(domNAME).toFixed(2));
    //设置搭配价
    $("#J_hotAllPrice").html(getSalePrice(domNAME).toFixed(2));
    //设置已优惠价
    var disPrice = parseInt(getMarketPrice(domNAME)) - parseInt(getSalePrice(domNAME));
    disPrice = disPrice <= 0 ? 0 : disPrice;

    $("#J_offPriceCount").html(disPrice.toFixed(2));
    //获取选中的skuID
    $("input[name=skuArr]").val(getChkSku(domNAME));
    //获取选中的数量
    $("input[name=numArr]").val(getChkNumbers(domNAME));
  }
  //获取选中的skuID
  function getChkSku(domNAME) {
    var itemArr = $("input[name=" + domNAME + "]:checked");
    var itemSku = $("input[name=itemSkuID]").val();
    var skuArr = new Array();
    skuArr.push(itemSku);
    itemArr.each(function(index) {
      skuArr.push(parseInt($(this).siblings("input[name=skuID]").val()));
    });
    return skuArr;
  }
  //获取选中的产品数量
  function getChkNumbers(domNAME) {
    var itemArr = $("input[name=" + domNAME + "]:checked");
    var numArr = new Array();
    numArr.push(1);
    itemArr.each(function(index) {
      numArr.push(parseInt($(this).siblings("input[name=hotNum]").val()));
    });
    return numArr;
  }
  //获取市场价
  function getMarketPrice(domNAME) {
    var itemArr = $("input[name=" + domNAME + "]:checked");
    var itemPrice = $("input[name=itemMarketPrice]").val();
    var chkPrice = 0;
    itemArr.each(function(index) {
      var num = parseInt($(this).siblings("input[name=hotNum]").val());
      var price = parseInt($(this).siblings("input[name=storePrice]").val());
      chkPrice += num * price;
    });
    return parseInt(chkPrice) + parseInt(itemPrice);
  }
  //获取售价
  function getSalePrice(domNAME) {
    var itemArr = $("input[name=" + domNAME + "]:checked");
    var itemPrice = $("input[name=itemPrice]").val();
    var chkPrice = 0;
    itemArr.each(function(index) {
      var num = parseInt($(this).siblings("input[name=hotNum]").val());
      var price = parseInt($(this).siblings("input[name=salePrice]").val());
      chkPrice += num * price;
    });
    return parseInt(chkPrice) + parseInt(itemPrice);
  }
  //设置选中数量
  function setChkNum(domNAME) {
    var num = getChkItem(domNAME);
    $("#J_choiceNum").html(num);
  }
  //获取选中个数
  function getChkItem(domNAME) {
    return $("input[name=" + domNAME + "]:checked").length;
  }
  //提交人气搭配加入购物车的表单
  $(document).on("click", "#J_hotBtnCart", function(event) {
    event.preventDefault();
    if (getChkItem("hotItem") == 0) {
      var tipDg = new dialog({
        title: '提示',
        content: '<p>&nbsp;</p><p class="tc fs-14">请选择要搭配的商品</p>',
        width: 400,
        height: 60,
        fixed: true,
        zIndex: 10024,
        button: [{
          value: '确定',
          className: 'ui-btns-orange',
          callback: function() {}
        }]
      }).showModal();
    } else {
      //提交表单
      $("#J_hotForm").submit();
    }
  });
  /*
   * 商品详细介绍 ========================================================
   */
  //浮动标题调用tab切换
  itemTab({
    titCell: '#J_itemDetailTitle',
    conCell: '#J_itemDetailCon'
  });
  //判断是否在视窗内
  // offsetBody();
  var bFlag = false;
  //根据滚动高度决定要不要显示商品详情
  function offsetBody() {

    var winScrollTop = $(window).scrollTop();
    var winHei = $(window).height();
    var dOffsetTop = $("#J_itemDetail").offset().top;

    if (((winScrollTop + winHei) >= dOffsetTop) && !bFlag) {
      loadDetail("#J_detailContent");
      bFlag = true;
    }

    $(window).scroll(function() {
      winScrollTop = $(window).scrollTop();
      if (((winScrollTop + winHei) >= dOffsetTop) && !bFlag) {
        loadDetail("#J_detailContent");
        bFlag = true;
      }
    });

  }
  /*
   * 加载商品详情函数
   * @param domID, 目标容器的id号，格式为  "#id"
   */


  function loadDetail(domID) {

    var detailLoadFlag = false;

    var tarObj = $(domID);

    var tempHtml = $.trim(tarObj.html()); //$.trim($("#J_detailContentTemp").html());
    //tarObj.html("");

    var temp = tempHtml.replace(/<img/gi, '<img class="lazy"');
    var t = temp.replace(/src/gi, 'data-original');
    // console.log(t);

    //tarObj.html(t);
    //调用懒加载
    //lazyloadImg();

  }
  ;
  //初始化浮动标题函数
  !(function(window) {
    setDetailNav("#J_itemDetail", "#J_itemDetailTitle");

    $(window).scroll(function() {
      setDetailNav("#J_itemDetail", "#J_itemDetailTitle");
    });

    function setDetailNav(domID, tarID) {
      var staticDom = $(domID);
      var detailNav = $(tarID);

      var tarOffsetTop = staticDom.offset().top;
      var winScrollTop = $(window).scrollTop();
      if (winScrollTop >= tarOffsetTop) {
        //设置位置
        detailNav.css({
          "position": "fixed",
          "top": 0,
          "z-index": 9999
        });
        //设置锚点
        detailNav.find("a").attr("href", '#navAnchor');
      } else {
        //设置位置
        detailNav.css({
          "position": "relative"
        });
        //去除锚点
        detailNav.find("a").attr("href", 'javascript:void(0);');
      }
    }
  })(window);
  //滚动到某处函数
  function scrollTo(tar, obj) {
    var tarOffset = tar.offset().top;
    obj.each(function() {
      $(this).on("click", function() {
        $(window).animate({
          scrollTop: tarOffset
        }, 200)
      });
    });
  }
  /*
   *   加载成交记录  =========================================
   */
  var bidFlag = false;
  $("#J_bidHistoryBtn").on("click", function() {
    if (!bidFlag) {
      //调用js分页模块
      itemPage({
        loadURL: cdnConfig.itemApiPath + '/salelog/' + itemConfig.skuID,
        data: {
          curPage: 1
        },
        dataDom: $("#J_bidLoad"),
        pageDom: $("#J_bidPage"),
        template: template,
        dataTplName: "tplItemBid",
        pageTplName: "tplItemPage"
      });
      bidFlag = true;
    }
  });
  /*
   *   加载商品评价  =========================================
   */
  //商品评价的标题tab
  itemTab({
    titCell: '#J_commmentsNav',
    conCell: '#J_commentsContent',
    conItemCell: '.JQ_comContent'
  });
  //加载全部商品评价
  var commentsFlag = false;
  $("#J_commentsBtn").on("click", function() {
    if (!commentsFlag) {
      //调用函数
      itemPage({
        loadURL: cdnConfig.itemApiPath + '/comments/' + itemConfig.skuID,
        data: {
          type: 'all',
          curPage: 1
        },
        dataDom: $("#J_commentsAllTable"),
        pageDom: $("#J_commentsAllPage"),
        template: template,
        dataTplName: "tplItemComments",
        pageTplName: "tplItemPage"
      });
      commentsFlag = true;
    }
  });
  //加载好评
  var goodComFlag = false;
  $("#J_goodCommetsBtn").on("click", function() {
    if (!goodComFlag) {
      //调用函数
      itemPage({
        loadURL: cdnConfig.itemApiPath + '/comments/' + itemConfig.skuID,
        data: {
          type: 'goods',
          curPage: 1
        },
        dataDom: $("#J_commentsGoodTable"),
        pageDom: $("#J_commentsGoodPage"),
        template: template,
        dataTplName: "tplItemComments",
        pageTplName: "tplItemPage"
      });
      goodComFlag = true;
    }
  });
  //加载中评
  var normalComFlag = false;
  $("#J_normalcommentsBtn").on("click", function() {
    if (!normalComFlag) {
      //调用函数
      itemPage({
        loadURL: cdnConfig.itemApiPath + '/comments/' + itemConfig.skuID,
        data: {
          type: 'normal',
          curPage: 1
        },
        dataDom: $("#J_commentsNormalTable"),
        pageDom: $("#J_commentsNormalPage"),
        template: template,
        dataTplName: "tplItemComments",
        pageTplName: "tplItemPage"
      });
      normalComFlag = true;
    }
  });
  //加载差评
  var badComFlag = false;
  $("#J_badCommentsBtn").on("click", function() {
    if (!badComFlag) {
      //调用函数
      itemPage({
        loadURL: cdnConfig.itemApiPath + '/comments/' + itemConfig.skuID,
        data: {
          type: 'bad',
          curPage: 1
        },
        dataDom: $("#J_commentsBadTable"),
        pageDom: $("#J_commentsBadPage"),
        template: template,
        dataTplName: "tplItemComments",
        pageTplName: "tplItemPage"
      });
      badComFlag = true;
    }
  });
  /*
   *  详情页tab切换通用函数 ========================================
   */
  function itemTab(config) {
    var config = config || {};
    var titCell = config.titCell || ".item-tab-title";
    var conCell = config.conCell || ".item-tab-content";
    var conItemCell = config.conItemCell || '.JQ_tabContent';
    var callback = typeof config.callback == "function" ? config.callback : null;

    var titObj = $(titCell + " a");
    var conObj = $(conCell);

    titObj.each(function(index) {
      var that = $(this);
      var ind = index;
      that.on("click", function() {
        //变换class
        if (!that.hasClass("on")) {
          //设置class
          that
            .addClass("on")
            .siblings("a")
            .removeClass("on");
        }
        //调用回调函数
        if (callback != null) {
          doCallback(that, callback);
        }
        //显示对应内容
        showContent(conObj, index);
      });
    });
    //显示tab内容函数
    function showContent(obj, index) {
      var ind = index;
      var arr = obj.find(conItemCell);
      arr.each(function(index) {
        if (ind == index) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
    //调用回调函数
    function doCallback(obj, fun) {
      fun(obj);
    }
  }
  /*
   * 计算评价百分比函数
   * @param allP    评价总数
   * @param goods  好评数
   * @param norma 中评数
   * @param bad    差评数
   */
  function setCommentsPercent(all, goods, normal, bad) {
    // console.log(all, goods, normal, bad, (parseInt(goods)/0));

    var goodPer = all == 0 ? 0 : parseFloat(goods / all) * 100;
    var normalPer = all == 0 ? 0 : parseFloat(normal / all) * 100;
    var badPer = all == 0 ? 0 : parseFloat(bad / all) * 100;

    // console.log(goodPer, normalPer, badPer);
    //好评率
    $(".JQ_goodsPercent").html(goodPer.toFixed(2) + "%");
    $(".JQ_goodsLine").css({
      "width": goodPer.toFixed(2) + "%"
    });
    //中评率
    $(".JQ_normalPercent").html(normalPer.toFixed(2) + "%");
    $(".JQ_normalLine").css({
      "width": normalPer.toFixed(2) + "%"
    });
    //差评率
    $(".JQ_badPercent").html(badPer.toFixed(2) + "%");
    $(".JQ_badLine").css({
      "width": badPer.toFixed(2) + "%"
    })

  }
  /*
   *  调用懒加载函数  ===================================================
   */
  $(function() {
    lazyloadImg();
  });
  /*
   *   懒加载图片函数 ======================================================
   * */
  function lazyloadImg() {
    $("img.lazy").lazyload({
      effect: 'fadeIn',
      threshold: 200
    });
  }
  /*
   *    2015版浮动工具栏交互  ================================================
   *
   * */
  minBar({
    mainCell: '#J_minBar',
    pathConfig: cdnConfig,
    tpl: templateComment,
    tplName: "tplMinBar",
    data : _globalConfig.minBar.data

  });
  /*
   *    处理广告 =============================================================
   * */

  /* 顶部广告 */
  loadTopAd();

  function loadTopAd() {
    var target = $("#J_TopAd");
    var nowTime = target.attr("data-time") || new Date().getTime();
    //var tempArr = [];
    var list = itemData.topAd;
    //console.log(list.length);
    if (list.length === 0) {
      target.remove();
    } else {
      for (var i = 0; i < list.length; i++) {
        if ((list[i].startTime < nowTime) && (nowTime < list[i].endTime)) {
          target.html(templateComment("tplTopAd", list[i]));
          break;
        }
      }
      var triggerDOM = target.find("#J_indexTopAdClose");
      triggerDOM.on("click", function(event) {
        target.slideUp(500);
      });
    }

  }

  /* 商品详情广告 */
  loadDetailAd();

  function loadDetailAd() {
    var target = $("#J_detailAd");
    var nowTime = target.attr("data-time") || new Date().getTime();
    var list = itemData.detailAd;
    var html = '';

    if (list.length === 0) {
      target.remove();
    } else {
      for (var i = 0; i < list.length; i++) {
        //判断当前服务器时间是否在广告设定的时间段内
        if ((list[i].startTime < nowTime) && (nowTime < list[i].endTime)) {

          html += '<A href="' + list[i].linkURL + '" target="_blank" title="' + list[i].title + '">';
          html += '<img src="' + list[i].imgURL + '" width="900" height="182" />';
          html += '</a>';

          target.html(html);
          //只取一个符合条件的广告,其它的忽略
          break;
        }
      }
    }

  }
  /* 左边广告 */


  function loadLeftAd() {
    var target = $("#J_itemLeft");
    var nowTime = $("#J_TopAd").attr("data-time") || new Date().getTime();
    var list = itemData.leftAd;
    var html = '<div class="item-left-ad">';
    var tempArr = [];

    if (list.length === 0) {
      //target.remove();
    } else {
      for (var i = 0; i < list.length; i++) {
        if ((list[i].startTime < nowTime) && (nowTime < list[i].endTime)) {
          tempArr.push(list[i]);
        }
      }

      for (var j = 0; j < tempArr.length; j++) {
        html += '<a class="left-ad-item" href="' + tempArr[j].linkURL + '" target="_blank" >';
        html += '<img class="lazy" data-original="' + tempArr[j].imgURL + '" width="200" height="270" alt="' + tempArr[j].title + '" />';
        html += '</a>';
      }

      html += '</div>';

      target.append(html);

      lazyloadImg();
    }

  }

});
