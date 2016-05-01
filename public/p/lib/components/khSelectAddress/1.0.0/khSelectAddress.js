define(function(require,exports,module){function khSelectAddress(config){function init(){$.ajax({url:"http://api.kinhom.com/region/pro",type:"get",dataType:"jsonp",success:function(result){setOptions("#J_proList",result),khSelect({mainCell:"#J_selectProvience",callback:function(value,text,obj){setCityList("#J_selectAddress",obj.attr("data-parent"))}})},error:function(error){}})}var config=config||{};config.curPro||"",config.curCity||"",config.curArea||"";khSelect=config.selectModule,init()}function setCityList(target,parentID){var cityHtml='<div class="select-gray fl JQ_addressCity"><i class="select-corner icon-gray-left"></i><label class="JQ_option select-option w90" data-value="0">请选择市</label><i class="select-corner icon-gray-right"></i><a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_cityList"></ul><input type="hidden" name="valCity" /></div>',areaHtml='<div class="select-gray fl JQ_addressArea"><i class="select-corner icon-gray-left"></i><label class="JQ_option select-option w90" data-value="0">请选择区</label><i class="select-corner icon-gray-right"></i><a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_areaList"></ul><input type="hidden" name="valArea" /></div>',tarObj="string"==typeof target?target.indexOf("#")>-1?$(target):$("#"+target):target;tarObj.find(".JQ_addressCity").remove(),tarObj.find(".JQ_addressArea").remove(),tarObj.append(cityHtml),tarObj.append(areaHtml),tarObj.find(".JQ_addressCity").attr("id","J_selectCity_"+parentID),tarObj.find(".JQ_addressArea").attr("id","J_selectArea_"+parentID),cityObj=tarObj.find("#J_cityList");var optionHtml="";$.ajax({url:"http://api.kinhom.com/region/city/"+parentID,type:"get",dataType:"jsonp",success:function(result){for(var i=0;i<result.length;i++)optionHtml+='<li><a href="javascript:void(0)" data-parent="'+result[i].parent_id+'" data-value="'+result[i].region_id+'">'+result[i].region_name+"</a></li>";cityObj.append(optionHtml),khSelect({mainCell:"J_selectCity_"+parentID,callback:function(value,text,obj){setAreaList("#J_selectAddress",value)}}),khSelect({mainCell:"J_selectArea_"+parentID})}})}function setAreaList(target,parentID){var areaHtml='<div class="select-gray fl JQ_addressArea"><i class="select-corner icon-gray-left"></i><label class="JQ_option select-option w90" data-value="0">请选择区</label><i class="select-corner icon-gray-right"></i><a id="J_applyType" href="javascript:void(0);" class="select-btn JQ_selectBtn"><i class="triangle-down"></i></a> <ul id="J_areaList"></ul><input type="hidden" name="valArea" /></div>',tarObj="string"==typeof target?target.indexOf("#")>-1?$(target):$("#"+target):target;tarObj.find(".JQ_addressArea").remove(),tarObj.append(areaHtml),tarObj.find(".JQ_addressArea").attr("id","J_selectArea_"+parentID),areaObj=tarObj.find("#J_areaList");var optionHtml="";$.ajax({url:"http://api.kinhom.com/region/area/"+parentID,type:"get",dataType:"jsonp",success:function(result){for(var i=0;i<result.length;i++)optionHtml+='<li><a href="javascript:void(0)" data-parent="'+result[i].parent_id+'" data-value="'+result[i].region_id+'">'+result[i].region_name+"</a></li>";areaObj.append(optionHtml),khSelect({mainCell:"J_selectArea_"+parentID})}})}function setOptions(target,data){for(var tempHtml="",tarObj="string"==typeof target?target.indexOf("#")>-1?$(target):$("#"+target):target,i=0;i<data.length;i++)tempHtml+='<li><a href="javascript:void(0);" data-parent="'+data[i].region_id+'" data-value="'+data[i].region_id+'">'+data[i].region_name+"</a></li>";tarObj.append(tempHtml)}var khSelect=function(){};module.exports=khSelectAddress});