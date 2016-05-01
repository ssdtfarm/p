/**
 *	@remix zhangzhensheng
 *	@date  2015-12-01
 *	@add new password rules
 */
define(function(require, exports, module){
	var khValidate = {
		//验证英文用户名
		chkEnName : function(str){
			var reg = /^[a-zA-Z|0-9]{3,20}$/;
			return reg.test(str);	
		},
		//验证中文用户名
		chkCnName : function(str){
			var reg = /^[\u2E80-\u9FFF]{2,20}$/;
			return reg.test(str);	
		},
		//验证是否中文
		chkIsChinese : function(str){
			var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
			return reg.test(str);
		},
		//验证用户名，含中文、英文、字母
		chkUserName : function(str){
			var reg = /^[\u2E80-\u9FFF|0-9|a-zA-Z|_]{2,20}$/;
			return reg.test(str);	
		},
		//验证固定电话
		chkTelephone : function(str){
			var reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
			return reg.test(str);
		},
		//验证手机号码
		chkPhone : function(str){
			var reg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			return reg.test(str);	
		},
		//验证密码  只能是字母加 _ 和 - 和 数字 6-18个字符
		chkPass : function(str){
			var reg = /^[a-zA-Z0-9_-]{6,20}$/;
			return reg.test(str);
		},
		//验证密码（新规则），6-20位数字、字母或符号的密码（不包括空格）
		chkPassNew : function(str){
			// var reg = /^[^\u4E00-\u9FA5\uF900-\uFA2D\uFE30-\uFFA0\s]{6,20}$/;
			var reg = /^[^\u2E80-\uFFA0\s]{6,20}$/;
			return reg.test(str);
		},
		/*
		 *   验证纯数字的验证码，可传入要验证的长度值
		 *   @param {str} 要验证的字符串
		 *   @param {len} 要验证的长度
		 */ 
		chkNumber : function(str, len){
			var reg;
			switch(len) {
				case 4:
					reg = /^[0-9]{4}$/;
					break;
				case 5 :
					reg = /^[0-9]{5}$/;
					break;
				case 6 :
					reg = /^[0-9]{6}$/;
					break;
				case 7:
					reg = /^[0-9]{7}$/;
					break;
				case 8:
					reg = /^[0-9]{8}$/;
					break;
				case 9:
					reg = /^[0-9]{9}$/;
					break;
				case 10:
					reg = /^[0-9]{10}$/;
					break;
				case 11:
					reg = /^[0-9]{11}$/;
					break;
				case 12:
					reg = /^[0-9]{12}$/;
					break;
				case 13:
					reg = /^[0-9]{13}$/;
					break;
				case 14:
					reg = /^[0-9]{14}$/;
					break;
				case 15:
					reg = /^[0-9]{15}$/;
					break;
				case 16:
					reg = /^[0-9]{16}$/;
					break;
				case 17:
					reg = /^[0-9]{17}$/;
					break;
				case 18:
					reg = /^[0-9]{18}$/;
					break;
				default:
					reg = /^[0-9]{6}$/;
					break;
			}
			return reg.test(str);
		},
		//验证支付宝账号
		chkAliAcount : function(str){
			var reg = /^[0-9]{11}|^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
			return reg.test(str);
		},
		//验证银行名称
		chkBankName : function(str){
			var reg = /^[\u2E80-\u9FFF]{4,20}$/;
			return reg.test(str);	
		},
		//验证银行账号
		chkBankAcount : function(str){
			var reg = /^[0-9]{15,23}$/;
			return reg.test(str);
		},
		//验证汇款单号
		chkBankOrderNum : function(str){
			var reg = /^[0-9]{8,}$/;
			return reg.test(str);	
		},
		//验证价格
		chkPrice : function(str){
			var reg = /^[0-9]{1,10}[\.][0-9]{2}$/;
			return reg.test(str);
		},
		//验证邮箱
		chkEmail : function(str){
			// var reg = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
			var reg = /^([a-zA-Z0-9_\.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
			return reg.test(str);		
		},
		//验证URL
		chkURL : function(str){
			var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
			return reg.test(str);		
		},
		//验证IP 地址
		chkIP : function(str){
			var reg = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
			return reg.test(str);		
		},
		//检测特殊字符
		chkScript : function(str) { 
			var reg = /^[A-Za-z0-9|_|-|\u4E00-\u9FA5\uF900-\uFA2D|@|#|,|.|;]+$/;
			return reg.test(str);
		}
		
	};
	
	module.exports = khValidate;
});