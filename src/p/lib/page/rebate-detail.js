define(function(require, exports, module){
	/*===============================*/
	/*  我的返利详情js文件
	 *  @author zhangzhensheng
	 *  @date   2016-04-07
	 /* ==============================*/
     /*
      * 编辑店名
      */
     $(document).on("click","#J_edit",function(){
        var input = $("#J_inputname");
        var span = $("#J_shopname");
        var pen = $("#J_edit");
        var name = span.html();
        // 保存店名的接口
        var apiEditShopName = function(name){
            $.ajax({
                url: '',
                data: name
            });
        };
        // 判断店名是否合法
        var isLegalShopName = function(name) {
            var reg = /^[\u2E80-\u9FFF|0-9|a-zA-Z]{0,10}$/;
            return reg.test(name);
        };
        // 切换输入状态
        if($("#J_inputname").is(":hidden")){
            span.hide();
            pen.hide();
            input.show().focus();
            input.val(input.val());
        }
        $("#J_inputname").on("keydown",function(e){
            if(e.which==13){
                if(!isLegalShopName(input.val())) {
                    return false;
                }
                span.html(input.val()).show();
                pen.show();
                input.hide();
                $("#J_inputname").unbind();
                if(name != input.val()){
                    apiEditShopName(input.val());
                }
            }
        });
     });
});