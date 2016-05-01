$(function(){
    /*生成二维码*/
    for (x in json_sku_id) {
        var setting = {
            render : renderType,
            width  : qr_size,
            height : qr_size,
            correctLevel : QRErrorCorrectLevel.L,
            text : 'http://m.kinhom.com/item/'+ json_sku_id[x] +'.html?werksId='+ werk_id,
        };
        if(dingzhi == 1) setting.text = 'http://m.kinhom.com';
        $('#sku_id_' + json_sku_id[x]).qrcode(setting);
    };

    /*点击数据内容可修改*/
    $('.modify').on('click', function(){
        save();
        var par = $(this).parent();
        var content = $(this).html();
        $(this).css('display', 'none');
        par.append('<input type="text" value="'+ content +'" class="temp" style="width: 80px;" />');
        par.find('input').focus();
    });

    /*回车保存信息*/
    $(document).keyup(function(e){
        if(e.keyCode=='13'){
            save();
        }
    });

    /*输入框失焦保存信息*/
    $(document).on("blur","input",function(){
        save();
    });

    /*设置打印区域并打印*/
    // $(".doPrint").click(function(){
    //     $("#qrPrintArea").printArea();
    // });
    
    /**
     * 保存信息
     * @return NONE
     */
    function save()
    {
        $('.temp').each(function(){
            var content = $(this).val();
            var par = $(this).parent();
            $(this).remove();
            var modify = par.find('.modify');
            modify.html(content);
            modify.css('display', 'inline-block');
            sync_info(modify);
        });
    }

    /**
     * 同步修改信息
     * @param  {[object]} obj_tag [标签对象]
     * @return NONE
     */
    function sync_info(obj_tag)
    {
        if(obj_tag.hasClass('info_price') || obj_tag.hasClass('info_num')) {
            var amount = 0;
            var printBack = obj_tag.parents('div.qr-printBack');
            var obj_tr = printBack.find('tbody tr');
            obj_tr.each(function(){
                var obj_info_price = $(this).find('.info_price');
                var info_price = obj_info_price.html();
                var info_num = $(this).find('.info_num').html();
                amount += info_price * info_num;
                // console.log(info_price);
                info_price = parseInt(info_price).toFixed(2);
                // console.log(info_price);
                obj_info_price.html(info_price);
            });
            var card_sku_id = printBack.attr('card_sku_id');
            amount = amount.toFixed(2);
            // $('div.card-front-'+ card_sku_id).find('.info_amount').html(amount);
            $('div[card_sku_id="'+ card_sku_id + '"]').find('.info_amount').html(amount);
        }
    }

});
