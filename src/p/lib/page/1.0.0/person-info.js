/* 页面js */
define(function(require, exports, module){ 
	//加载依赖
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

	/* 页面js */
		var addressName = $("input[name=address_name]").val();
		var addressId   = $("input[name=address_id]").val();
		// 地址选择框需要的数据
		var data = {
			"valPro"     : addressId.split(",")[0],
			"textPro"    : addressName.split(",")[0],
			"valCity"    : addressId.split(",")[1],
			"textCity"   : addressName.split(",")[1],
			"valArea"    : addressId.split(",")[2],
			"textArea"   : addressName.split(",")[2]
		};
		//初始化地址选择框
		$("#J_selectAddress").html(template('tplSelectAddress',data));

		khSelectAddress({
			"selectModule" : khSelect
		});
		/*
		 * 初始化年、月、日 ==============================================
		 */
		setCurrentYear("#J_birthYear");

		setCurrentMonth("#J_birthMonth");

		var bFlag = false;
		/* 设置年份函数 */
		function setCurrentYear(domID){
			var obj = typeof domID == "string" ? $(domID) : "";
			var curYear = new Date().getFullYear();
			var yearHtml = '';
			for(var i=0; i<=100; i++){
				var value = parseInt(curYear-100+i);
				yearHtml += '<li><a href="javascript:void(0);" data-value="'+ value +'">'+ value +'</a></li>';
			}
			obj.append(yearHtml);
		}
		/* 设置月份函数 */
		function setCurrentMonth(domID){
			var obj = typeof domID == "string" ? $(domID) : "";
			var monthHtml = '';
			for(var i=0; i<12; i++){
				var val = i+1;
				monthHtml += '<li><a href="javascript:void(0);" data-value="'+ val +'">'+ val +'</a></li>';
			}
			obj.append(monthHtml);
		}
		/* 设置日函数 */
		function setCurrentDay(domID, value){
			var num = parseInt(value);
			var obj = typeof domID == "string" ? $(domID) : domID;

			if(!bFlag){
				var monthHtml = '';
				for(var i=0; i<31; i++){
					var value = i+1;
					monthHtml += '<li><a href="javascript:void(0);" data-value="'+ value +'">'+ value +'</a></li>';
				}
				obj.append(monthHtml);
				//调用select函数
				khSelect({
					mainCell : '#J_selectBirthDay'
				});

				bFlag = true;
			}
			switch(num){
				case 1 :
					setLargeMonth();
					break;
				case 2 :
					setSpecialMonth();
					break;
				case 3 :
					setLargeMonth();
					break;
				case 4 :
					setSmallMonth();
					break;
				case 5 :
					setLargeMonth();
					break;
				case 6 :
					setSmallMonth();
					break;
				case 7 :
					setLargeMonth();
					break;
				case 8 :
					setLargeMonth();
					break;
				case 9 :
					setSmallMonth();
					break;
				case 10 :
					setLargeMonth();
					break;
				case 11 :
					setSmallMonth();
					break;
				case 12 :
					setLargeMonth();
					break;
				default :
					break;
			}

			//设置大月份
			function setLargeMonth(){
				$("#J_birthDay li").each(function(){
					$(this).show();
				})
			}
			//设置小月份
			function setSmallMonth(){
				$("#J_birthDay li").each(function(index){
					if(index==30){
						$(this).hide();
					}else{
						$(this).show();
					}
				})
			}
			//设置2月
			function setSpecialMonth(){
				var len = 28;    //二月的天数
				var dayHtml = '';
				// 扩展Date对象判断当前年份是否是闰年
				Date.prototype.isLeapYear = function()
				{
					return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));
				}
				var curDate = new Date();
				//设置二月天数
				if(curDate.isLeapYear()) { len = 29; }

				for(var i=len+1,j=0; l = 31-len, j<l; j++,i++){
					$("#J_birthDay li").eq(i).hide();
				}
			}

		}
		/*
		 * 初始化省、市、区===============================================
		 */

		/*
		 * 初始化选择菜单事件 ============================================
		 */
		// 选择生日
		khSelect({
			mainCell : "#J_selectBirthYear"
		});
		khSelect({
			mainCell : "#J_selectBirthMonth",
			callback : function(value){
				setCurrentDay("#J_birthDay", value);
			}
		});


		//选择地址
		khSelect({
			mainCell : "#J_selectArea"
		});

		//选择月收入
		khSelect({
			mainCell : "#J_selectIncome"
		});

		//教育程度
		khSelect({
			mainCell : "#J_selectEducation"
		});
		// 行业
		khSelect({
			mainCell : "#J_selectIndustry"
		});


		/*
		 * 单选效果 =======================================================
		 */
		radioCheck(".JQ_sex");  //性别单选
		radioCheck(".JQ_mar");  //婚姻状况单选
		//单选函数
		function radioCheck(className){
			var obj = $(className);
			obj.each(function(index){
				var that = $(this);
				$(this).find("a").on("click", function(){
					setRadioItem($(this));
					that.siblings("input")
						.val($(this).attr("data-value"));
				});
			});
		}
		// 设置单选效果
		function setRadioItem(obj){
			if(obj.hasClass("icon-radio-off")){

				obj.removeClass("icon-radio-off")
					.addClass("icon-radio-on");

				obj.parents("label")
					.siblings().find("a")
					.removeClass("icon-radio-on")
					.addClass("icon-radio-off");
			}
		}
		/*
		 * 多选效果 =======================================================
		 */
		$(".JQ_interest").each(function(index){
			var that = $(this).find("a");
			that.on("click",function(event){
				setItem($(this));
				$("input[name=xingqu]").val(getItemValue(".JQ_interest"));
			});
		});
		// 设置选中是否
		function setItem(obj){
			if(obj.hasClass("icon-box-normal")){
				obj.removeClass("icon-box-normal").addClass("icon-box-checked");
			}else{
				obj.removeClass("icon-box-checked").addClass("icon-box-normal");
			}
		}
		// 获取选中的值
		function getItemValue(className){
			var arr = Array();
			var obj = $(className);
			obj.each(function(index){
				var sonObj = $(this).find("a")
				if(sonObj.hasClass("icon-box-checked")){
					arr.push(sonObj.attr("data-value"));
				}
			});
			return arr;
		}
		/*
		 * 提交表单  ===========================================================
		 */
		/* 提交事件 */
		$("#J_submitBtn").on("click",function(){
			var that = $(this);
			var formEmail = $("input[name=member_email]");
			var formPhone = $("input[name=member_phone]");

			//验证通过，提交表单
			$("#J_personForm").submit();
		});
	//});
});
