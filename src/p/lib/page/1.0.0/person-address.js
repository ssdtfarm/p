define(function(require, exports, module){
	var template = require('../../template/tempcomment');
	var dialog   = require('../../components/dialog/1.0.0/dialog');
	var khSelect = require('../../components/khSelect/1.0.0/khSelect');
	var khValidate = require('../../components/khValidate/1.0.0/khValidate');
	var khSelectAddress = require('../../components/khSelectAddress/1.0.0/khSelectAddress');
	var minBar = require('../../components/minBar/1.0.1/minBar');

	/* =====================================================================
	 *    新版浮动工具栏交互
	 * =====================================================================*/
	minBar({
		mainCell   : '#J_minBar',
		pathConfig : cdnConfig,
		tpl        : template,
		tplName    : "tplMinBar",
        data : _globalConfig.minBar.data
	});

	document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;

	// 初始化form表单数据
		var data = {
			"actionURL"   : "",  //form表单的action地址
			"userName"    : "",  //收货人姓名 
			"valPro"      : "",  //省份ID
			"textPro"     : "",  //省份名称
			"valCity"     : "",  //市级ID
			"textCity"    : "",  //市级名称
			"valArea"     : "",  //地区ID
			"textArea"    : "",  //地区名称
			"address"     : "",  //详细地址
			"telephone"   : "",  //固话
			"mobilephone" : "",  //手机
			"defaultAdd"  : 0 ,  //是否为默认地址
			"addressID"   : 0    //地址ID号
		};
		/*
		 * 新增收货地址 ==========================================================
		 */
		var addDialog;
		//点击新增按钮
		$("#J_addNewAddress").on("click",function(event){
			//清空data对象
			for (var v in data){
				data[v] = "";
			}
			//阻止a标签默认事件
			event.preventDefault();
			//获取action地址
			data.actionURL = $(this).attr("href");
			//初始化模板
			var tempForm = template('tplAddressForm',data);
			//弹窗
			addDialog = new dialog({
				title : '新增收货地址',
				width : 560,
				fixed : true,
				button : [
					{
						value : '保存收货人信息',
						className : 'ui-btns-orange',
						callback : function(){
							// submitAddForm();
							submitAddForm($("#J_addressForm"), addDialog);
							return false;
						}
					},
					{
						value : '取消',
						className : 'ui-btns-gray',
						callback : function(){}
					}
				]
			});
			// 渲染弹出内容
			addDialog.content(tempForm);
			//显示弹窗
			addDialog.showModal();
			//弹框后渲染模板
			$("#J_selectAddress").html(template('tplSelectAddress',data));
			//初始化地址选择模块
			khSelectAddress({
				"selectModule" : khSelect
			});

			/* 设置默认地址 */
			$("#J_setDefault").on("click",function(){
				if($(this).hasClass("icon-box-normal")){
					$(this).removeClass("icon-box-normal").addClass("icon-box-checked");
					$(this).siblings("input").val("1");
				}else{
					$(this).removeClass("icon-box-checked").addClass("icon-box-normal");
					$(this).siblings("input").val("0");
				}

			});
		});
		/*
		 * 新增地址表单处理 =================================================
		 */
		function submitAddForm(formObj, dialogObj){

			var tipDialog;
			var valName = $.trim($("input[name=userName]").val());
			var valAddress = $.trim($("input[name=address]").val());
			var valTel = $.trim($("input[name=tel]").val());
			var valPhone = $.trim($("input[name=phone]").val());
			var valPro = $.trim($("input[name=valProvince]").val());
			var valCity = $.trim($("input[name=valCity]").val());
			var valArea = $.trim($("input[name=valArea]").val());
			//验证收货人
			//
			//
			if(!valiUserName($("input[name=userName]"), valName)){
				return;
			}
			/*
			 * 验证详细地址
			 */
			//是否选择了省、市、区
			if(valPro==""){
				showTipDialog("请选择您所在的省份!", "J_selectAddress", "left");
				return;
			}else{
				if(valCity == "" ){
					showTipDialog("请选择您所在的城市!", "J_selectAddress", "left");
					return;
				}else{
					if(valArea==""){
						showTipDialog("请选择您所在的地区!", "J_selectAddress", "left");
						return;
					}
				}
			}

			if(!valiStreet($("input[name=address]"), valAddress)){
				return;
			}

			// 验证固定电话和手机
			if(valPhone==""){
				$("input[name=phone]").addClass('error');
				showTipDialog("请输入手机号码!", "J_phone", "right");
				return;
			}else{
				if(valPhone!=""){
					if(!khValidate.chkPhone(valPhone)){
						showTipDialog("请输入11位正确的手机号码", "J_phone", "right");
						return;
					}
				}
			}
			//提交表单
			formObj.submit();
			//删除弹窗
			dialogObj.close().remove();

			//显示提示窗统一函数
			function showTipDialog(str, domID, textAlign){
				var tDialog = new dialog({
					content : '<span class="fc-f60">'+str+'</span>',
					align : textAlign
				})
					.show(document.getElementById(domID));

				setTimeout(function(){ tDialog.remove(); }, 1500);
			}
		}
		/*
		 *  修改地址表单处理 ================================================
		 */
		$(document).on("click", ".JQ_modifyAddress", function(event){
			//抓取对应行的数据
			var mainObj = $(this).parents("dl");

			data.addressID = $(this).attr("data-value");

			data.actionURL = $(this).attr("href");

			data.userName = mainObj.find(".JQ_userName").attr("title");

			data.valPro = mainObj.find(".JQ_area").attr("data-value").split(",")[0];
			data.valCity = mainObj.find(".JQ_area").attr("data-value").split(",")[1];
			data.valArea = mainObj.find(".JQ_area").attr("data-value").split(",")[2];
			data.textPro = mainObj.find(".JQ_area").attr("data-value").split(",")[3];
			data.textCity = mainObj.find(".JQ_area").attr("data-value").split(",")[4];
			data.textArea = mainObj.find(".JQ_area").attr("data-value").split(",")[5];

			data.address = mainObj.find(".JQ_address").attr("title");

			data.telephone = mainObj.find(".JQ_telephone").attr("data-value").split(",")[1];

			data.mobilephone = mainObj.find(".JQ_telephone").attr("data-value").split(",")[0];

			data.defaultAdd = mainObj.find(".JQ_default").val();
			//阻止a标签默认事件
			event.preventDefault();

			//初始化模板
			var tempForm = template('tplAddressForm',data);
			//弹窗
			addDialog = new dialog({
				title : '编辑收货地址',
				width : 560,
				fixed : true,
				button : [
					{
						value : '保存收货人信息',
						className : 'ui-btns-orange',
						callback : function(){
							submitAddForm($("#J_addressForm"), addDialog);
							return false;
						}
					},
					{
						value : '取消',
						className : 'ui-btns-gray',
						callback : function(){}
					}
				]
			});
			// 渲染弹出内容
			addDialog.content(tempForm);
			//显示弹窗
			addDialog.showModal();
			//弹框后渲染模板
			$("#J_selectAddress").html(template('tplSelectAddress',data));
			//初始化地址选择模块
			khSelectAddress({
				"selectModule" : khSelect
			});

			/* 设置默认地址 */
			$("#J_setDefault").on("click",function(){
				if($(this).hasClass("icon-box-normal")){
					$(this).removeClass("icon-box-normal").addClass("icon-box-checked");
					$(this).siblings("input").val("1");
				}else{
					$(this).removeClass("icon-box-checked").addClass("icon-box-normal");
					$(this).siblings("input").val("0");
				}

			});
		})
		/*
		 * 删除地址 =========================================================
		 */
		$(document).on("click", ".JQ_delAddress", function(event){

			var that = $(this);
			//阻止a标签默认事件
			event.preventDefault();
			var confirmDialog = new dialog({
				title : '提示',
				content : '<p>&nbsp;</p><p class="tc fc-333 fs-14">是否删除该地址？</p>',
				width : 400,
				height : 60,
				fixed: true,
				button : [
					{
						value : '确定',
						className : 'ui-btns-orange',
						callback : function(){
							window.location.href = that.attr("href");
						}
					},
					{
						value : '取消',
						className : 'ui-btns-gray',
						callback : function(){

						}
					}
				]
			}).showModal();
		})
		/*
		 * 设为默认地址 =====================================================
		 */
		$(document).on("click", ".JQ_setDefault", function(event) {
			var that = $(this);
			var add_id = that.siblings(".JQ_modifyAddress").attr("data-value");
			var resultDialog = new dialog({
				fixed : true
			})
			//到后台设置默认
			$.ajax({
				url : cdnConfig.apiPath + '/member/defauleaddress',
				data : {
					"address_id" : add_id
				},
				dataType : "jsonp",
				success : function(result) {
					console.log(result);
					if(result.status=="succ"){

						resultDialog.content('<p>&nbsp;</p><p class="fs-14 fc-333 tc w130">设置成功!</p>');
						resultDialog.showModal();
						setTimeout( function(){ resultDialog.close(); } ,1000);

						//that.remove();
						setDefault(that);

					}else{
						resultDialog.content('<span class="fs-14 fc-f60">设置失败!</span>');
						resultDialog.showModal();
						setTimeout( function(){ resultDialog.close(); } ,1000);
					}
				}
			})
		});
		//设置默认
		function setDefault(obj){
			var mainObj = obj.parents(".address-list");

			mainObj.find(".JQ_setDefault").remove();

			mainObj.find("dt").append('<span class="default-address-btn JQ_defaultText">默认地址</span>');

			mainObj.find(".JQ_default").val(1)
			//设置邻居的状态
			mainObj.siblings(".address-list").each(function(index){
				var that = $(this);
				that.find(".JQ_defaultText").remove();

				that.find(".JQ_setDefault").remove();

				that.find(".JQ_default").val(0)

				that.find("dd").prepend('<a href="javascript:void(0);" class="address-set-default JQ_setDefault">设为默认地址</a>');
			});


		}



		/**
		 * 添加验证提示
		 * lijinrong
		 * 2015-06-08
		 */
		//收货人验证
		//显示提示窗统一函数
		function showTipDialog(str, domID, textAlign){
			var tDialog = new dialog({
				content : '<span class="fc-f60">'+str+'</span>',
				align : textAlign
			})
				.show(document.getElementById(domID));

			setTimeout(function(){ tDialog.remove(); }, 1500);
		}


		//验证收货人姓名
		function valiUserName(obj,val){
			if(val == '') {
				obj.addClass('error');
				showTipDialog("收货人姓内容不能为空", "J_userName", "right");
				return;
			}
			if(!checkName(val)){
				obj.addClass('error');
				showTipDialog("收货人姓名为2-12个汉字、英文!", "J_userName", "right");
				return false;
			}else{
				obj.addClass('succ');
				obj.siblings('.fc-f60').html('<i class="icon-tip-ok"></i>');
				return true;
			}
		}
		function checkName(val){ //收货人姓名为2-12个汉字、英文
			var partten = /^[A-Za-z\u4e00-\u9fa5]{2,12}$/;

			return partten.test(val);
		}
		$(document).on("blur", "#J_userName", function(event) {
			var self = $(this),
			    val = self.val();

			valiUserName(self, val);
		});
		$(document).on("focus", "#J_userName", function(event) {
			var self = $(this),
			    val = self.val();
			self.removeClass('error').siblings('.fc-f60').html('*');
		});

		//验证收货详细地址
		function valiStreet(obj,val){
			if(val == '') {
				obj.addClass('error');
				showTipDialog("详细地址不能为空", "J_address", "right");
				return false;
			}
			if(!checkStreet(val)){
				obj.addClass('error');
				showTipDialog("详细地址为2-20个汉字、英文、数字", "J_address", "right");
				return false;
			}else{

				if(checkNum(val)){

					obj.addClass('error');
					showTipDialog("详细地址不能全部为数字", "J_address", "right");
					return false;
				}else {

					obj.addClass('succ');
					obj.siblings('.fc-f60').html('<i class="icon-tip-ok"></i>');
					return true;
				}
			}
		}
		function checkNum(val){
			var partten = /^[0-9]{2,200}$/;
			return partten.test(val);
		}
		function checkStreet(val){//详细地址为2-20个汉字、英文、数字;
			var partten = /^[A-Za-z0-9\u4e00-\u9fa5\(\)\（\）\-_\\—]{2,200}$/;
			return partten.test(val);
		}
		$(document).on("blur", "#J_address", function(event) {
			var self = $(this),
			    val = self.val();

			valiStreet(self, val);
		});
		$(document).on("focus", "#J_address", function(event) {
			var self = $(this),
			    val = self.val();

			self.removeClass('error').siblings('.fc-f60').html('*');
		});


		//固定电话验证
		$(document).on("blur", "#J_tel", function(event) {
			var self = $(this),
			    val = self.val();

			if(val != ''){
				if(!khValidate.chkTelephone(val)){
					self.addClass('error');
					showTipDialog("固话格式有误！", "J_tel", "right");
				}else{
					self.siblings('label').find('span').html('<i class="icon-tip-ok"></i>');
				}
			}
		});
		$(document).on("focus", "#J_tel", function(event) {
			var self = $(this),
			    val = self.val();

			self.removeClass('error').siblings('label').find('span').html('*');
		});

		//手机验证
		$(document).on("blur", "#J_phone", function(event) {
			var self = $(this),
			    val = self.val();


			if(!khValidate.chkPhone(val)){
				self.addClass('error');
				showTipDialog("手机号码为11位1开头的数字,请输入11位正确的手机号码", "J_phone", "right");
			}else{
				self.siblings('label').find('span').html('<i class="icon-tip-ok"></i>');
			}

		});
		$(document).on("focus", "#J_phone", function(event) {
			var self = $(this),
			    val = self.val();

			self.removeClass('error').siblings('label').find('span').html('*');
		});

	//});
});
