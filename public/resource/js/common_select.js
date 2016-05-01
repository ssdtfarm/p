/* 多级选择相关函数，如地区选择，分类选择
 * common_select
 */

/* 地区选择函数 */
function regionInit(divId){
	var area_id = 100000;
     var type = 1;//地区行政级别
     var area_select = $("#" + divId + " > select");//选择要初始化的对象
     areaInit(area_select,area_id,type);
	$("#" + divId + " > select").change(regionChange); // select的onchange事件
	$("#" + divId + " > input:button[class='edit_region']").click(regionEdit); // 编辑按钮的onclick事件
}
function areaInit(area_select,area_id,type){//初始化地区
	if(typeof(area_select) == 'object'){
          var url = 'index.php?act=cart&op=area&rand='+Math.random();
		$.getJSON(url, {'area_id':area_id,'region_type':type}, function(data){
               if( data.length>0){
                    $(area_select).append("<option>-请选择-</option>");
                    for(arr in data)
                    {
                            $(area_select).append("<option value='" + data[arr].region_id + "'>" + data[arr].region_name + "</option>");
                    }
               }
		})
	}
}
if(typeof(regionChange) != 'function'){//检测是否已经被定义过，防止重写
	function regionChange(){
	    // 删除后面的select
	    $(this).nextAll("select").remove();
	    // 计算当前选中到id和拼起来的name
	    var selects = $(this).siblings("select").andSelf();
	    var id = '';
	    var names = new Array();
	    for (i = 0; i < selects.length; i++){
	        sel = selects[i];
	        if (sel.value > 0){
	            id = sel.value;
	            name = sel.options[sel.selectedIndex].text;
	            names.push(name);
	        }
	    }
	    $(".area_ids").val(id);
	    $(".area_name").val(name);
	    $(".area_names").val(names.join("\t"));
	    
	    if (this.value > 0){//下级地区
	        var area_id = this.value;
             var type = 1;
             if(this.length == 35){
                 type = 2;
             }else{
                 type = 3;
             }
            $("<select r_type="+type+" class=c_"+type+" ></select>").change(regionChange).insertAfter(this);
            if($(this).attr("r_type") == 3){    //3级地区的时候，后面不在加<select>
                // 删除后面的select
                $(this).nextAll("select").remove();
            }
            areaInit($(this).next("select"),area_id,type);//初始化地区
	    }
	}
}

function regionEdit()
{
    $(this).siblings("select").show();
    $(this).siblings("span").andSelf().hide();
}

/* 商品分类选择函数 */
function gcategoryInit(divId)
{
    $("#" + divId + " > select").get(0).onchange = gcategoryChange; // select的onchange事件
    window.onerror = function(){return true;}; //屏蔽jquery报错
    $("#" + divId + " .edit_gcategory").click(gcategoryEdit); // 编辑按钮的onclick事件
}

function gcategoryChange()
{
    // 删除后面的select
    $(this).nextAll("select").remove();

    // 计算当前选中到id和拼起来的name
    var selects = $(this).siblings("select").andSelf();
    var id = 0;
    var names = new Array();
    for (i = 0; i < selects.length; i++)
    {
        sel = selects[i];
        if (sel.value > 0)
        {
            id = sel.value;
            name = sel.options[sel.selectedIndex].text;
            names.push(name);
        }
    }
    $(".mls_id").val(id);
    $(".mls_name").val(name);
    $(".mls_names").val(names.join("\t"));

    // ajax请求下级分类
    if (this.value > 0)
    {
        var _self = this;
        var url = SITE_URL + '/index.php?act=index&op=josn_class';
        $.getJSON(url, {'gc_id':this.value}, function(data){
            if (data)
            {
                if (data.length > 0)
                {
                    $("<select><option>-请选择-</option></select>").change(gcategoryChange).insertAfter(_self);
                    var data  = data;
                    for (i = 0; i < data.length; i++)
                    {
                        $(_self).next("select").append("<option value='" + data[i].gc_id + "'>" + data[i].gc_name + "</option>");
                    }
                }
            }
        });
    }
}

function gcategoryEdit()
{
    $(this).siblings("select").show();
    $(this).siblings("span").andSelf().remove();
}

if(typeof(nc_a) == 'undefined'){//加载地区数据
	var area_scripts_src = '';
	area_scripts_src = $("script[src*='jquery.js']").attr("src");//取JS目录的地址
	area_scripts_src = area_scripts_src.replace('jquery.js', 'area_array.js');
	$(document).append('<script type="text/javascript" src="' + area_scripts_src + '" charset="utf-8"></script>');
	if(typeof(jQuery.validator.addMethod) == 'function'){//添加自动检测是否是最后一级地区
		jQuery.validator.addMethod("checkarea", function(value, element) {
			return this.optional(element) || (typeof(nc_a[value]) == 'undefined');//当数组不存在时确定选到最后
		}, "请选择所在地区");
	} 
}