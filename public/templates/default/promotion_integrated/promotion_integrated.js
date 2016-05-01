    var content = '';

    /*点击数据内容可修改*/
    $('.modifiable_inner').on('click', function(){
        restore(content);
        var par = $(this).parent();
        content = $(this).html();
        $(this).hide();
        par.append('<input type="text" value="'+ content +'" class="temp" />');
        par.find('input').select();
    });

    /*输入框失焦恢复原样，不保存数据*/
    $(document).on("blur","input.temp",function(){
        restore();
    });

    /*回车保存信息*/
    $(document).keyup(function(e){
        if(e.keyCode=='13'){
           save();
        }
    });

    /**
     * 恢复原样式
     * @param  {mixed} content [需要恢复的值]
     * @return {[type]}         [none]
     */
    function restore(content)
    {
        var obj_input_temp = $('input.temp');
        var par = obj_input_temp.parent();
        obj_input_temp.remove();
        var modifiable_inner = par.find('.modifiable_inner');
        modifiable_inner.html(content);
        content = '';
        modifiable_inner.show();
    }
  
    /**
     * 保存数据
     * @return {[type]} [none]
     */
    function save()
    {
        var obj_input_temp = $('.temp');
        var new_data = obj_input_temp.val();
        var modifiable_outter = obj_input_temp.parent();
        var prom_inte_id = modifiable_outter.attr('prom_inte_id');
        var field = modifiable_outter.attr('field');
        console.log(field);
        $.get('index.php?act=promotion_integrated&op=ajaxSave&id=' + prom_inte_id + '&' + field + '=' + new_data, function(result){
            if(result == 1) content = new_data;
            restore(content);
        });
    }
    
    /**
     * 解除综合活动关联
     * @return {[type]} [none]
     */
    function unbound(id)
    {
        if(!confirm("确定解除关联？")) return false;

        id = parseInt(id);
        if(id <= 0) return false;

        $.get('index.php?act=promotion_integrated&op=unbound&id=' + id, function(result){
            if(result == 1) {
                location.reload();
            } else {
                alert('操作失败');
            }
        });
    }
    