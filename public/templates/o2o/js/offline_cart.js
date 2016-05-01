//线下购物车专用
  function  getfreight(vala) {
				  id = $('#select_ocart_ids').val();
				  $.ajax({
					 type: "get",
					  url : "index.php?act=detail&op=ajaxgetfreightcart",
					  data: "cart_id="+id+"&area_id="+vala,
					 success: function(data){
					  $("#freight").html(data);
					 },
					  });
				   
				  }
function subtype(type){
	$("#search_type").val(type);
}
//获取修改购物车信息
function editcart(ocart_id){
	toList(cartW5);
	$("#cartW5").load('index.php?act=offline_cart&op=getEditCartInfo&ocart_id='+ocart_id);
}
//购物车修改
function edit_submit(){
	
	var ocart_id = $("#ocart_id").val();
	var mech_sn = $("#mech_sn").val();
	if (mech_sn == '') {
		$("#error_mech").attr("style","display:block");
		return false;
	}
	//判断数量必须为正整数，否则不能提交
	var number = parseInt($("#quantity").val());
	var number_patrn=/[1-9]/;
	if(!number_patrn.test(number)||number<0)
	{
		$('#error_num').html('&nbsp;&nbsp;数量必须为大于0的整数')
		return false;
	}

	
	//价格格式判断
	var price = $("#edit_price").val();
	var patrn=/^(([1-9]\d*)|0)(\.\d{1,2})?$/;
	if (price == '' || price == 0) {
		$("#error_price").html('金额不能为空');
		$("#error_price").attr("style","display:block");
		return false;
	}
	if (!patrn.exec(price)) {
		$("#error_price").html('金额格式不正确');
		$("#error_price").attr("style","display:block");
		return false;
	}
	var original_price = $("#original_price").val();
	var apply_comment = $("#apply_comment").val();
	var rate_price = parseInt(original_price) * 99 / 100;
	if (price < rate_price){
	if (apply_comment == '' || apply_comment == '备注打折原因') {
		$("#error_comment").attr("style","display:block");
		return false;
	}
}
	var manage = $("#manage").val();
	var werks = $("#center_werks_sn").val();
	$.getJSON('index.php?act=offline_cart&op=editOfflineCart',
			{'ocart_id':ocart_id,
			 'mech_sn':mech_sn,
			 'number':number,
			 'price':price,
			 'original_price':original_price,
			 'apply_comment':apply_comment,
			 'manage':manage,
			 'werks':werks
		},function(data){
			if (data['code'] == 'succ'){
				$("#mech_"+data['ocart_id']).html(data['mech_sn']);
				$("#number_"+data['ocart_id']).html(data['number']);
				if (data['price']){
				$("#price_"+data['ocart_id']).html(data['price'] + '.00');
				}
				$("#orp_"+data['ocart_id']).html(data['original_price']+'.00');
				var html_s = '';
				if (data['apply_status']){
					
				if (data['apply_status'] == '1'){
					$("#edit_"+data['ocart_id']).attr('style','display:none;');
					$("#orgshow_"+data['ocart_id']).attr('style','display:block;');
					$("#sapr_"+data['ocart_id']).attr('style','display:inline;');
					$("#aprice_"+data['ocart_id']).html('&yen;'+price);
					$("#sp_"+data['ocart_id']).attr('style','display:none;');
					$("#apply_"+data['ocart_id']).removeClass();
					$("#apply_"+data['ocart_id']).addClass('wc2');
					html_s = " <strong>待审批</strong>";
					
					}
				if (data['apply_status'] == '2') {
					$("#sapr_"+data['ocart_id']).attr('style','display:inline;');
					$("#aprice_"+data['ocart_id']).html('&yen;'+price);
					$("#orgshow_"+data['ocart_id']).attr('style','display:block;');
					$("#apply_"+data['ocart_id']).removeClass();
					$("#apply_"+data['ocart_id']).addClass('wc4');
					html_s = " <strong>审批已通过</strong>";
				}
			}
			else {
					$("#sapr_"+data['ocart_id']).attr('style','display:none;');
					$("#orgshow_"+data['ocart_id']).attr('style','display:none;');
					$("#apply_"+data['ocart_id']).removeClass();
					$("#apply_"+data['ocart_id']).addClass('wc1');
					html_s = " <strong>正常</strong>";
				}
				$("#apply_"+data['ocart_id']).html(html_s);
				toList(cartW5);
				$("#error_tip").attr('style','color:green');
				if (data['apply_status'] == '1') {
					$("#error_tip").html(" 您的修改申请已提交到店长，请等待审批通过后再下订单！");
				}
				else {
					$("#error_tip").html("您的修改申请已通过，您可直接下订单！");
				}
				toList(cartW12);
				}
			else {
				toList(cartW5);
				$("#error_tip").attr('style','color:black;');
				$("#error_tip").html(data['message']);
				toList(cartW12);
			}
			});
}
//选择跟单员
function addmech(mech_sn){

	if (mech_sn != ''){

		$("#mech_sn").val(mech_sn);
		}
	tominiList(salesList1);
}
//打折
function rate(rate){

	var original_price = $("#original_price").val();
	var rate_price = 0;
	if (rate){
		rate_price = Math.ceil((parseInt(original_price) * rate) / 100);
		$("#edit_price").val(rate_price+'.00');
		}
	else{
		$("#edit_price").val(original_price);
		}
	tominiList(discountW2);
}
//确认人选择
function select_man(id){
	$("#select_b").find("a").removeClass("b4");
	$("#m_"+id).addClass('b4');
	$("#manage").val(id);
}
function werks_sel(werks){
	$("#werks_stock").find("a").removeClass("b4");
	$("#ws_"+werks).addClass('b4');
	$("#center_werks_sn").val(werks);
}
//删除确认
function deletesure(ocart_id){

	$("#delete_id").html(ocart_id);
	toList(cartW6);
}
//删除购物车
function deleteocart(){

	var ocart_id = parseInt($("#delete_id").html());
	$.getJSON('index.php?act=offline_cart&op=ajax_delete_cart',{'ocart_id':ocart_id},
			function(data){
		if (data['type'] == 'succ'){
			window.location.reload();
			}
		if (data['type'] == 'limit') {
			$("#error_tip").html("您不能删除导购员"+data['guide_name']+"的商品！");
			toList(cartW12);
			toList(cartW6);
		}
	});
}

$(function() {
	  // 全选
	  $('.chooseall').click(function() {
		var num = 0;
		var price = 0;
		var select_id = '';
		var cancel_id = '';
	    var that = this;
	    $('.choose').each(function() {
	      this.checked = that.checked;
	      if (this.checked) {
	        $(this).parent().parent().addClass("trhl");
	        select_id += $(this).val()+',';
	      } else {
	        $(this).parent().parent().removeClass("trhl");
	        cancel_id += $(this).val()+',';
	      }
	    });
		$("#sel_num").html(num);
		$("#sel_price").html("&yen;"+price);
		addcookie(select_id,cancel_id);
	  });
	  //单选
	  $('.choose').click(function() { 
		  var num = 0;
		  var price = 0;
		  var select_id = '';
		  var cancel_id = '';
	    if (this.checked) {
	      $(this).parent().parent().addClass("trhl");
	      select_id += $(this).val() + ',';
	    } else {
	      $(this).parent().parent().removeClass("trhl");
	      cancel_id += $(this).val() + ',';
	    }
	    $(".chooseall").removeAttr("checked");
			addcookie(select_id,cancel_id);
	  });
	  function addcookie(select_id,cancel_id) {
		  $.getJSON('index.php?act=offline_cart&op=addCartCookie',{'select_id':select_id,'cancel_id':cancel_id},
				  function(data){
			  		if (data['code'] == 'succ') {
			  			$("#sel_num").html(data['num']);
						$("#sel_price").html(data['price']);
			  		}
			  			
		  });
	  }
});
//确认订单
function order_sure() {
	 toList(cartW4);
	 $("#cartW4").load('index.php?act=offline_cart&op=sure_order_info');
}
//地址选择
function select_address(rank1,rank2,callback) {
	$("#address_id").val('');
	var html_city = '';
	var html_area = '';
	parent_id = $("#"+rank1).val();
	$.getJSON('index.php?act=offline_cart&op=getRegions',{'parent_id':parent_id,'type':rank2},
			function(data){
		if (data['city'])
		{
			
			for (var i=0;i<data['city'].length;i++)
			{
				html_city += "<option id='"+data['city'][i]['region_id']+"' value='"+data['city'][i]['region_id']+"' >"+data['city'][i]['region_name']+"</option>";

			}
			$("#city").html(html_city);
			data['city'] = null;
			html_city = '';
		}
		if (data['area'])
		{
			for (var j=0;j<data['area'].length;j++)
			{
				if(j==0) {
					callback(data['area'][j]['region_id']);
				}
				html_area += "<option id='"+data['area'][j]['region_id']+"' value='"+data['area'][j]['region_id']+"' >"+data['area'][j]['region_name']+"</option>";

			}
			$("#area").html(html_area);
			html_area = '';
			data['area'] = null
		}
	});
}

//提交订单
function submit_form() {
	$("#error_consumer").attr("style","display:none");
	$("#error_phone").attr("style","display:none");
	$("#error_address").attr("style","display:none");
	//表单验证
	var comsumer = $("#input_consumer").val();
	if (comsumer == '') {
		$("#error_consumer").attr("style","display:block");
		return false;
	}
	var mob_phone = $("#mob_phone").val();
	if (mob_phone == '') {
		$("#error_phone").html('联系号码不能为空');
		$("#error_phone").attr("style","display:block");
		return false;
	}
	var patrn = /^\d{5,12}$/;
	if(!patrn.exec(mob_phone)) {
		$("#error_phone").html('联系号码格式不正确');
		$("#error_phone").attr("style","display:block");
		return false;
	}
		
	var address = $("#address_info").val();
	if (address == '' || address == '填写详细地址') {
		$("#error_address").attr("style","display:block");
		return false;
	}
	var order_tip = $("#order_tip").val();
	if (order_tip == '' || order_tip == '备注运费、安装费以及打折原因等') {
		$("#order_tip").val('');
	}
	toList(cartW4);
	$("#confirm_order").submit();
}

function check_address() {
	$("#error_phone").attr("style","display:none");
	var mob_phone = $("#mob_phone").val();
	if (mob_phone == '') {
		$("#error_phone").html('联系号码不能为空');
		$("#error_phone").attr("style","display:block");
		return false;
	}
	var patrn = /^\d{5,12}$/;
	if(!patrn.exec(mob_phone)) {
		$("#error_phone").html('联系号码格式不正确');
		$("#error_phone").attr("style","display:block");
		return false;
	}
	$.getJSON('index.php?act=offline_cart&op=getMemberAddr',{'mob_phone':mob_phone},
			function(data){
			var html = '';
			if (data['code'] == 'succ') {
				for (var i=0;i<data['address'].length;i++) {
					html += "<li><a href='javascript:void(0);'  onclick='select_addr("+data['address'][i]['address_id']+");'> <input type='radio' name='address_radio'><span>"+data['address'][i]['true_name'] + "&nbsp;"+ data['address'][i]['mob_phone'] + "&nbsp;" +data['address'][i]['area_info'] + data['address'][i]['address'] +"</span></a></li>";
				}
			}
			else {
				html = "<li>暂无记录</li>";
			}
			$("#addrL").html(html);
	});
	tominiList(addrL);
}

//选择已存在地址
function select_addr(address_id) {
	$.getJSON('index.php?act=offline_cart&op=getAddressInfo',{'address_id':address_id},
			function(data){
			if (data['code'] == 'succ') {
				if (data['city'])
				{
					var html_city = '';
					for (var i=0;i<data['city'].length;i++)
					{
						html_city += "<option id='"+data['city'][i]['region_id']+"' value='"+data['city'][i]['region_id']+"' >"+data['city'][i]['region_name']+"</option>";
					}
					$("#city").html(html_city);
					data['city'] = null;
					html_city = '';
				}
				if (data['area'])
				{
					var html_area = '';
					for (var j=0;j<data['area'].length;j++)
					{
						html_area += "<option id='"+data['area'][j]['region_id']+"' value='"+data['area'][j]['region_id']+"' >"+data['area'][j]['region_name']+"</option>";

					}
					$("#area").html(html_area);
					html_area = '';
					data['area'] = null
				}
				$("#"+data['address']['area_id']).attr('selected','selected');
				$("#"+data['address']['city_id']).attr('selected','selected');
				$("#"+data['address']['province_id']).attr('selected','selected');
				$("#address_info").val(data['address']['address']);
				$("#address_info").html(data['address']['address']);
				$("#address_id").val(data['address']['address_id']);
				tominiList(addrL);
			}
	});
}
//清除已存在地址选择
function emptyaddr() {
	$("#address_id").val('');
	}
//修改备注
function sem(ocart_id){
	toList(cartW2);
	$("#cartW2").load('index.php?act=offline_cart&op=editBuyMessage&ocart_id='+ocart_id);
}
//提交备注修改
function message_submit() {
	var ocart_id = $("#m_ocart_id").val();
	var message = $("#edit_message").val();
	if (message == '请具体说明运费、安装费以及商品的具体需求等；') {
		message = '';
	}
	$.getJSON('index.php?act=offline_cart&op=saveEditMes',{'ocart_id':ocart_id,'message':message},
			function(data){
			if (data['code'] == 'succ') {
				$("#mes_text_"+ocart_id).val(message);
			}
			toList(cartW2);
	});
}