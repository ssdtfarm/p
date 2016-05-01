/** header.php **/
function slideUp_fn()
{
    $('.ncs_cart_popup').slideUp('slow');
}
/* 格式化金额 */
function price_format(price){
    if(typeof(PRICE_FORMAT) == 'undefined'){
        PRICE_FORMAT = '&yen;%s';
    }
    price = number_format(price, 2);

    return PRICE_FORMAT.replace('%s', price);
}

function number_format(num, ext){
    if(ext < 0){
        return num;
    }
    num = Number(num);
    if(isNaN(num)){
        num = 0;
    }
    var _str = num.toString();
    var _arr = _str.split('.');
    var _int = _arr[0];
    var _flt = _arr[1];
    if(_str.indexOf('.') == -1){
        /* 找不到小数点，则添加 */
        if(ext == 0){
            return _str;
        }
        var _tmp = '';
        for(var i = 0; i < ext; i++){
            _tmp += '0';
        }
        _str = _str + '.' + _tmp;
    }else{
        if(_flt.length == ext){
            return _str;
        }
        /* 找得到小数点，则截取 */
        if(_flt.length > ext){
            _str = _str.substr(0, _str.length - (_flt.length - ext));
            if(ext == 0){
                _str = _int;
            }
        }else{
            for(var i = 0; i < ext - _flt.length; i++){
                _str += '0';
            }
        }
    }

    return _str;
}

/** goods.php **/
$(function(){	
	// 商品小图关联大图选中后样式变化
	$('.nc-zoom-gallery').click(function(){
		$('.zoom-desc').find('.nc-zoom-gallery').removeClass('hovered');
		$(this).addClass('hovered');
	});
	// 商品内容部分折叠收起侧边栏控制
	$('#abc').click(function(){
  		$('.layout').toggleClass('expanded');
	});
	// 商品内容介绍Tab样式切换控制
	$('#categorymenu').find("li").click(function(){
		$('#categorymenu').find("li").removeClass('current');
		$(this).addClass('current');
	});
	$('#categorymenu0').find("li").click(function(){
		$('#categorymenu0').find("li").removeClass('current');
		$(this).addClass('current');
	});
	$('#categorymenu1').find("li").click(function(){
		$('#categorymenu1').find("li").removeClass('current1');
		$(this).addClass('current1');
	});
	
	  //推荐商品切换
	   
    // 点击人气组合隐藏其他以及其标题栏
   $('#tabGoodsBund').click(function(){
		$('.recom_bd').css('display','none');
		$('#kh-Bund').css('display','');	
	});
	//同类推荐
   $('#tabGoodsRecom').click(function(){
		$('.recom_bd').css('display','none');
		$('#kh-Recom').css('display','');		
	});
   
	// 商品详情默认情况下显示全部
	$('#tabGoodsIntro').click(function(){
		$('.bd').css('display','');
		$('.hd').css('display','');	
	});

     // 点击配送信息隐藏其他以及标题栏
      $('#tabgoodsCirculate').click(function(){
		$('.bd').css('display','none');
		$('#kh-goodsCirculate').css('display','');
		$('.hd').css('display','none');
	});

     // 点击如何购买隐藏其他以及标题栏
      $('#tabgoodsHowtoBuy').click(function(){
		$('.bd').css('display','none');
		$('#kh-goodsHowtoBuy').css('display','');
		$('.hd').css('display','none');
	});

	// 点击规格参数隐藏其他以及标题栏
	 $('#tabGoodsnNorm').click(function(){
		$('.bd').css('display','none');
		$('#kh-goodsnNorm').css('display','');
		$('.hd').css('display','none');
	});
	// 点击评价隐藏其他以及其标题栏
	$('#tabGoodsRate').click(function(){
		$('.bd').css('display','none');
		$('#ncGoodsRate').css('display','');
		$('.hd').css('display','none');
	});
       /*评价------------点击好评 隐藏其他评价--------------*/
            $('#tabRate_good').click(function(){
		        $('.rate_bd').css('display','none');
		        $('#Rate_good').css('display','');
		        $('.rate_hd').css('display','none');
	        });
          
           /*点击中评 隐藏其他评价*/
            $('#tabRate_soso').click(function(){
		        $('.rate_bd').css('display','none');
		        $('#Rate_soso').css('display','');
		        $('.rate_hd').css('display','none');
	        });

	        /*点击中评 隐藏其他评价*/
	        $('#tabRate_bad').click(function(){
		        $('.rate_bd').css('display','none');
		        $('#Rate_bad').css('display','');
		        $('.rate_hd').css('display','none');
	        });

	        /*全部评价*/
	        $('#tabRate_all').click(function(){
		        $('.rate_bd').css('display','none');
		        $('#Rate_all').css('display','');
		        $('.rate_hd').css('display','none');
	        });


	// 点击成交隐藏其他以及其标题
	$('#tabGoodsTraded').click(function(){
		$('.bd').css('display','none');
		$('#ncGoodsTraded').css('display','');
		$('.hd').css('display','none');
	});
	// 点击咨询隐藏其他以及其标题
	$('#tabGuestbook').click(function(){
		$('.bd').css('display','none');
		$('#ncGuestbook').css('display','');
		$('.hd').css('display','none');
	});
	//商品排行Tab切换
	$(".ncs-top-tab > li > a").mouseover(function(e) {
		if (e.target == this) {
			var tabs = $(this).parent().parent().children("li");
			var panels = $(this).parent().parent().parent().children(".ncs-top-panel");
			var index = $.inArray(this, $(this).parent().parent().find("a"));
			if (panels.eq(index)[0]) {
				tabs.removeClass("current ").eq(index).addClass("current ");
				panels.addClass("hide").eq(index).removeClass("hide");
			}
		}
	});
	//商品评价动态评分打分人次Tab切换
	$(".ncs-rate-tab > li > a").mouseover(function(e) {
		if (e.target == this) {
			var tabs = $(this).parent().parent().children("li");
			var panels = $(this).parent().parent().parent().children(".ncs-rate-panel");
			var index = $.inArray(this, $(this).parent().parent().find("a"));
			if (panels.eq(index)[0]) {
				tabs.removeClass("current ").eq(index).addClass("current ");
				panels.addClass("hide").eq(index).removeClass("hide");
			}
		}
	});
		
//触及显示缩略图	
	$('.goods-pic > .thumb').hover(
		function(){
			$(this).next().css('display','block');
		},
		function(){
			$(this).next().css('display','none');
		}
	);
	
	/* 商品购买数量增减js */
	// 增加
	$('.increase').click(function(){
		num = parseInt($('#quantity').val());
		max = 999;
		if(num < max){
			$('#quantity').val(num+1);
		}
	});
	//减少
	$('.decrease').click(function(){
		num = parseInt($('#quantity').val());
		if(num > 1){
			$('#quantity').val(num-1);
		}
	});
	
	// 搜索价格不能填写非数字。
	var re = /^[1-9]+[0-9]*(\.\d*)?$|^0(\.\d*)?$/;
	$('input[name="start_price"]').change(function(){
		if(!re.test($(this).val())){
			$(this).val('');
		}
	});
	$('input[name="end_price"]').change(function(){
		if(!re.test($(this).val())){
			$(this).val('');
		}
	});
});

/* add cart */
function add_to_cart(sku_id, quantity, service_type, region_id)
{
    var url = 'index.php?act=cart&op=add';
    $.getJSON(url, {'sku_id':sku_id, 'quantity':quantity,'type':service_type,'region_id':region_id}, function(data){
    	if(data != null){
    		if (data.done)
            {
                $('#bold_num').html(data.num);
                $('#bold_mly').html(price_format(data.amount));
                $('.ncs_cart_popup').slideDown('slow');
                setTimeout(slideUp_fn, 5000);
                // 头部加载购物车信息
                load_cart_information();
            }
            else
            {
                alert(data.msg);
            }
    	}
    });
}

/** left.php **/
// 商品分类
function class_list(obj){
	var stc_id=$(obj).attr('span_id');
	var span_class=$(obj).attr('class');
	if(span_class=='ico-block') {
		$("#stc_"+stc_id).show();
		$(obj).html('<em>-</em>');
		$(obj).attr('class','ico-none');
	}else{
		$("#stc_"+stc_id).hide();
		$(obj).html('<em>+</em>');
		$(obj).attr('class','ico-block');
	}
}