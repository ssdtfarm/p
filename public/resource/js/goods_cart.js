function drop_cart_item(cart_id){
    $.getJSON('index.php?act=cart&op=drop&cart_id=' + cart_id, function(result){
        if(result.done){
            //删除成功
            window.location.reload();    //刷新
        }else{
        	alert(result.msg);
        }
    });
}
function change_quantity( rec_id, input, orig){
    var subtotal_span = $('#item' + rec_id + '_subtotal');
    var amount_span = $('#cart_amount');
    var discount_span = $('#cart_discount');
    var goods_span = $('#goods_amount');
    //暂存为局部变量，否则如果用户输入过快有可能造成前后值不一致的问题
    var _v = input.value;
    $.getJSON('index.php?act=cart&op=update&cart_id=' + rec_id + '&quantity=' + _v, function(result){
        if(result.done){
            //更新成功
            $(input).attr('changed', _v);
            $('#cart-modified-'+result.cart).show(10,function(){
            	$('#cart-modified-'+result.cart).hide(1000);
            });
            window.location.reload();
        }
        else{
            //更新失败
            alert(result.msg);
            $(input).val($(input).attr('changed'));
        }
    });
}
function decrease_quantity(rec_id){
    var item = $('#input_item_' + rec_id);
    var orig = Number(item.val());
    if(orig > 1){
        item.val(orig - 1);
        item.change();
    }


}
function add_quantity(rec_id){
    var item = $('#input_item_' + rec_id);
    var orig = Number(item.val());
    item.val(orig + 1);
    item.change();
}
function judge()
{
  obj = $("input[name=itemCh]:checked");
  skuArr = [""];
  obj.each(function(index, element) {
         if($(this).prop("checked")){
         skuArr[index] = $(this).attr("sku");
    }
  });
  if(skuArr[0]=='' || skuArr.length==0){
	  msgDialog({title:'提示',content:'请选择要删除的商品',position:'fixed'});
	  }else{
	  msgDialog({title:'提示',content:'您确定要删除所选的商品吗?',position:'fixed'},drop_pitch_sku);
		  }
}