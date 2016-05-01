/**
 * O2O首页分类跳转
 * @param gc_id
 * @param m
 */
function goGet(gc_id,m,is_hd) {
	var tabid = $("#tabid").val();
	var bamgong_zh = ("undefined" != typeof(m))?m:0;

	if( "undefined" != typeof(is_hd) ){
		window.location.href = 'index.php?act=search&op=getskusbygcid&tabid=' + tabid+ '&is_hd=' + is_hd;
	}else if ("undefined" != typeof(m)) {
		window.location.href = 'index.php?act=search&op=getskusbygcid&gc_id='+ gc_id + '&tabid=' + tabid + '&m=' + m;
	}else{
		window.location.href = 'index.php?act=search&op=getskusbygcid&gc_id='+ gc_id + '&tabid=' + tabid;
	}
	return false;
}

/**
 * O2O首页搜索
 * @param sval
 * @param kw
 * @returns {Boolean}
 */
function ser(sval, kw) {
	var tabid = $("#tabid").val();
	if (sval == 0) {
		kw = "";
		sval = "";
		return false;
	} else if (sval == 2 && kw == "") {
		alert("请输入skuID");
		return false;
	} else if (sval == 3 && kw == "") {
		alert("请输入商品名称");
		return false;
	} else if (sval == 1 && kw == "") {
		alert("请输入sap编号");
		return false;
	} else if (sval == 4 && kw == "") {
		alert("请输入供应商");
		return false;
	}else if (sval == 5 && kw == "") {
		alert("请输入商品货号");
		return false;
	}else
		if (sval == 2 && kw != "") {
			if(!/^[0-9]*$/.test(kw)){
			    alert("请输入数字!");
			     return false;
			}
		};    
		window.location.href = 'index.php?act=search&op=getskusbygcid&tabid=' + tabid+'&keyword='+ kw + '&sval=' + sval;
}
/**
 * 登录页背景设置
 */
$(window).resize(function(){
    $('.center').css({
        position:'absolute',
        background: '#fff',
        opacity:' 0.8',
        left: ($(window).width() - $('.center').outerWidth())/2,
	    top: ($(window).height() - $('.center').outerHeight())/2
    });
});
/**
 * 登录页验证方法
 */
function login(){
	  $("#notic").show();
	  $("#notic").removeClass();
	 // $("#submit").text("请稍等...");
	  $("#submit").attr("disabled","disabled"); 	
		if( "" ==  $("#username").val() || "" ==  $("#password").val()  ){
			$("#notic").addClass('alert-danger');
			$("#notic").text("请输入员工编号和密码");
		 	$('#notic').delay(3000).hide(0);
		 	 myFunc()
		 	return false;
		}else if( "" !=  $("#username").val() && "" !=  $("#password").val() ){
			var username = $("#username").val();
			var password = $("#password").val();
			var ref_url = $("#ref_url").val();
			var formhash = $("input[name=formhash]").val();
			var url = "index.php?act=login&op=checkUserLegal";
		    var data =  {'username':username,'password':password,'ref_url':ref_url,'formhash':formhash};	
			 $.post(url,data,function(json){
				 var date = eval("(" + json + ")");
				 	if(119 == date.errNum){
				 		 $("#notic").addClass('wrong-danger');
				 		$("#notic").text(date.msg);
					 	$('#notic').delay(3000).hide(0);
					 	 myFunc();
				 		return false;
				 	}else if(110 ==  date.errNum){
				 		 $("#notic").addClass('alert-danger');
				 		$("#notic").text(date.msg);
					 	$('#notic').delay(3000).hide(0);
					 	 myFunc();
				 		return false;
					}else if(120 ==  date.errNum){
						 $("#notic").addClass('success-danger');
						 $("#notic").text(date.msg);
						 window.location.href = date.url;
					}
				 });
		}
}
/**
 * 登录按钮状态
 */
function myFunc(){
	//$("#submit").text("");
	$("#submit").removeAttr("disabled");		
}

//搜索页 拖到效果 start //=======================================================================================================
function pullUpAction () {
	var swt_id = $("#belong").val();
	var gc_id = $("#gc_id").val();
	var curpage  = parseInt($("#curpage").val())+parseInt(1);
	var sval = $("#sval").val();
	var tabid = $("#tabid").val();
	var keyword = $("#keyw").val();
	var is_hd = $('#is_hd').val();
	var date = "" ;
	var date = sval==""? "gc_id=" + gc_id+"&curpage=" + curpage+"&tabid=" + tabid:"sval=" + sval+"&keyword=" + keyword+"&curpage=" + curpage+"&tabid=" + tabid;
	if ("" != is_hd) {
		var date =  "is_hd=" + is_hd+"&curpage=" + curpage+"&tabid=" + tabid;
	};
	if (swt_id == 4) {
		var date = "gc_id="+"&belong=4"+"&curpage=" + curpage;
	}

	// if ("" == is_hd) 
	// 	var date =  "is_hd=" + is_hd+"&curpage=" + curpage+"&tabid=" + tabid;
	// }else if("" != sval){
	// 	var date = "sval=" + sval+"&keyword=" + keyword+"&curpage=" + curpage+"&tabid=" + tabid;
	// }else{
	// 	var date =  "gc_id=" + gc_id+"&curpage=" + curpage+"&tabid=" + tabid;
	// };
	//function goGet(gc_id,m,is_hd) {
	 $.ajax({
	 		type : "GET",
	 		url : "index.php?act=search&op=getmore",
	 		data : date,
	 		dataType : "json",
	 		success : function(json) {
	 			if (json.error == '' || json.error == null || json.error == undefined) {
	 				$("#curpage").val(curpage);
	 				var dtlist = json.skulist;
	     			setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
	     				var el, li, i,html;
	     					el = document.getElementById('thelist');
	     					if (9 > json.totalnum) {$("#pullUp").css("display","none");};
	     					$(json.skulist).each(function(){
	     						var ss = this.skustock ;
	     						if( 0==ss || ""==ss || null==ss){
	     							var skustock = "<a href='javascript:void(0);' onclick='bh("+this.sku_id+",2)'>补货查询</a>";
	     							var zt = "预订";

	     						}else{ 
	     							var skustock ="<b>"+this.skustock+" 件</b>";
	     							var zt = "加入购物车";
	     						}
	     						
	     						html = "<h2><b>SKU编码："+this.sku_id+"</b></h2>"
	     	 							     +"<dl>"
	     	 							 	 +"<dt><a href='index.php?act=detail&skuid="+this.sku_id+"' title='"+this.sku_name+"'><img  onload='javascript:DrawImage(this,292,197);' src="+this.img_url+"><p><b>"+this.sku_name+"</b></p></a></dt>"
	     	 							 	 +"<dd>"
	     	 							 	 +"<div><p class='today_price'><b>售价：<strong>&yen;"+this.price+"</strong></b></p>"
	     	 							  	 +"<p class='stock'>库存："+skustock+"</p></div>"
	     	 							     +"<p class='today_btn'><a class='book_now'  href='javascript:void(0)' onclick='addsku("+this.sku_id+")'><i></i><b>"+zt+"</b></a></p>"
	     	 							 	 +"</dd>"
	     	 								 +"</dl>"
	     	 								li = document.createElement('li');
	     	     				li.innerHTML = html ;
	     	     				el.appendChild(li, el.childNodes[0]);
	     					}); 
	 						
	     					myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	    				}, 1000);
	     				
	 				
	 			} else { // 出错啦usep
	 				alert('错误提示：' + json.error);
	 			}
	 		}
	 	}); 
}

function loaded() {
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '往上拖加载更多商品...';
			}
		},
		onScrollMove: function () {
			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开后刷新...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '往上拖加载更多商品...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			 if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}
//搜索页 拖到效果 end
//=======================================================================================================



//库存查询
function bh(skuid,dtail){
    $(".list_stock").children().empty();
  var date = "skuid=" + skuid;
   $.ajax({
      type : "GET",
      url : "index.php?act=search&op=goodInquiry",
      data : date,
      dataType : "json",
      success : function(json) {
        var html;
        if (json.error == 0) { 
		  $(json.stocklist).each(function(){
		  	var cycle_time = this.cycle_time ;
		  	var center_werks_name = this.center_werks_name ;
		  	 if (typeof(cycle_time) != "undefined" && typeof(center_werks_name) != "undefined") {
	     	 if (1!=dtail){ 
		     		 html = "<li style='margin:5px'>"
		     	 		+"<em class='kh_stockStatus2'>"+this.center_werks_name+" : <font color='#ec6c00'>"+this.cycle_time+" 天</font>内到货</em>"
		     	 		+"</li>";
		     	 		$(".list_stock").append(html);
				}else{
					 html = " <em   class='kh_stockStatus'>"+this.center_werks_name+" : <font color='#fff'>"+this.cycle_time+" 天</font>内到货</em>";
					 $(".list_stock2").append(html);
				}
	     		}
	     	});
        } else {
        	if (1!=dtail){ 
          		html = "<li style='margin:5px'><em class='kh_stockStatus2'> 补货周期没记录 </em></li>";
      			$(".list_stock").append(html);
      		}else{
      			 html = " <em  class='kh_stockStatus'>补货周期没记录</em>";
      			 $(".list_stock2").append(html);
      		}
        };
      }
    });
  if (1!=dtail){     
	 toList(stocktips);
	}
}

/**
 * 检查是否存在sap
 * @param  {[type]} sapgoodsn  [description]
 * @param  {[type]} factory_sn [description]
 * @param  {[type]} price      [description]
 * @return {[type]}            [description]
 */
function getSapGood(sapgoodsn,factory_sn,price){

      var sapgoodsn  = typeof(sapgoodsn) == "undefined" ? 0:sapgoodsn;
      var factory_sn = typeof(factory_sn) == "undefined" ? 0:factory_sn;
      var price      = typeof(price) == "undefined" ? 0:price;
      var sysid      = $("#belong_sys_id").val();
      var date = "sapgoodsn=" + sapgoodsn +  "&sysid=" + sysid;
      if(0 == sapgoodsn) {
      		$("#sap_refer_sn_error").attr("style","display:block");
	     	$("#sap_refer_sn_error").text("参考SAP商品编码不能为空");
	     	return false;
      }
      $.ajax({
      	type : "GET",
      	url : "index.php?act=search&op=existsap",
      	data : date,
      	dataType : "json",
      	success : function(json) {
      		if ("undefined" != typeof(json.factory_sn) && "undefined" != typeof(json.price) ) {
      			$("#sap_refer_sn_error").attr("style","display:none");
         		$("#factory_sn").val(json.factory_sn);
          		$("#ofsn").val(json.factory_sn);
         		$("#price").val(json.price);
	    	 }else{
	     		$("#sap_refer_sn_error").attr("style","display:block");
	     		$("#sap_refer_sn_error").text("sap商品不存在");
	     		$("#sap_refer_sn").val("");
	     		$("#factory_sn").val("");
	     		$("#price").val("");
	     	};
       	}
      }) ;  
   }	
/**
 * 检查是否存在厂商
 * @param  {[type]} fsn [description]
 * @return {[type]}     [description]
 */
function checkfsn (fsn) {
	var ofsn = $("#ofsn").val();
	 var date = "fsn=" + fsn;
	  $.ajax({
      type : "GET",
      url : "index.php?act=search&op=existfsn",
      data : date,
      success : function(data) {
	      	if(0 == data ){
	      		$("#factory_sn_error").attr("style","display:block");
		     	$("#factory_sn_error").text("输入供应商不存在");	
	      		 setTimeout(function () {
				     $("#factory_sn").val(ofsn);
		     		 $("#factory_sn_error").attr("style","display:none");
		     		 $("#factory_sn_error").text("供应商不能为空");
	     		}, 3000); 
	      	}
        }
      }) ;  
}
