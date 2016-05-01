define(function(require, exports, module){

	//引入依赖
	var qrcode = require("../../components/qrcode/1.0.0/qrcode");
	/*
	 * 渲染二维码图片 ======================================
	 */
		//添加ios提示
		$('.load-head .load-content').append('<div class="ios-tips"></div>');
		$('.load-head .load-content').append('<div class="appLogo"></div>');
		$('.load-head .load-content').append('<div class="wapLogo"></div>');
		$('.load-foot .load-content').append('<div class="appLogo"></div>');


		var iosTips = $('.ios-tips');
		$('.iphoneLoad').on('click', function(event){
			event.preventDefault();
			return false;
		})
		$('.iphoneLoad').hover(function(){
			iosTips.show();
		},function(){
			iosTips.hide();
		})

		function addAppLogo(obj) {
			obj.append('<div class="appLogo"></div>')
		}
		function randerQrcode(w, h, url, wrap) {

			var userAgent = navigator.userAgent.toLowerCase()
			renderType = 'canvas';
			if(/msie/ig.test(userAgent)){
				renderType = 'table';
			}

			wrap.qrcode({
				text   : url,
				render : renderType,
				width  : w,
				height : h
			});

		}
		randerQrcode(90,90,$('#down_url').val(),$('.load-content .code'));
		randerQrcode(90,90,$('#gowap_url').val(),$('.load-content .code1'));
		randerQrcode(98,98,$('#down_url').val(),$('.load-content .code2'));
});