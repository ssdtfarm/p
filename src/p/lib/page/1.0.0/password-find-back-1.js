define(function(require, exports, module) {

	var khValidate = require('../../components/khValidate/1.0.0/khValidate');
	var token = "";
		//加载图片验证码
		loadImgCode();
		//加载图片验证码函数
		function loadImgCode() {
			var randNum = Math.random();
			token = util.getToken(16);
			//获取图片code
			imgURL = cdnConfig.apiPath + '/member/imgcode?type=registercode' + '&v=' + randNum + '&token=' + token;
			$("#J_findImgCode").attr("src", imgURL);
		}

		//刷新图片验证码
		$("#J_refreshCode").on("click", function (event) {
			event.preventDefault();
			//更新图片验证码
			loadImgCode();
		});
		/*
		 *   提交表单 =======================================================
		 */
		var sendCodeClickNum = 0;

		$(document).on('focus' , '.kh-form-item', function(){
			$(this).addClass('focus');
		});
		$(document).on('blur' , '.kh-form-item', function(){
			$(this).removeClass('focus');
		});


		$(document).on("click", "#J_submitBtn", function (event) {
			event.preventDefault();

			var userName = $("input[name=userName]");
			var usrVal   = $.trim(userName.val());
			var imgCode  = $("input[name=codeInput]");
			var codeVal  = $.trim(imgCode.val());

			if (usrVal == "") {
				showTip(userName, '请填写您的用户名/邮箱/已验证手机', 'error');
			} else {
				if (chkUserName(userName)) {
					//验证用户名是否存在
					verifyUserName(userName);
				}
			}
		});
		/**
		 *   验证用户名格式 ===============================================
		 */
		function chkUserName(tarDOM) {
			var val = $.trim(tarDOM.val());
			//通过验证邮箱，手机，用户名
			if (khValidate.chkUserName(val) || khValidate.chkTelephone(val) || khValidate.chkEmail(val)) {
				return true;
			} else {
				showTip(tarDOM,'登录名输入有误', 'error');
				return false;
			}
		}

		/**
		 *   验证用户名是否存在  =======================================
		 */

		function verifyUserName(usrDom) {
			var val = $.trim(usrDom.val());

			if (sendCodeClickNum >= 3) {
				showTip(usrDom, '发送手机验证码次数已经用完,请刷新页面重试.', 'error');
				return;
			} else {
				sendCodeClickNum++;
			}

			$.ajax({
				url: cdnConfig.apiPath + '/member/validatemem',
				data: {
					"username": val,
					"key": $("#security").val(),
					"name": $("#security").attr('name')
				},
				dataType: 'jsonp',
				success: function (res) {

					refreshKey(res.pin);
					if (res.status == "succ") {
						//验证图片验证码
						showTip(usrDom, '', 'ok');
						verifyValidateCode();
					} else {
						showTip(usrDom, '您输入的用户名不存在，请确认后输入', 'error');
					}
				}
			});
		}

		/**
		 *   验证图片验证码函数  =======================================
		 */
		function verifyValidateCode() {
			var imgCode = $("input[name=findcode]");
			var codeVal = $.trim(imgCode.val());
			if (codeVal != "") {
				if (khValidate.chkScript(codeVal)) {
					var val = codeVal.toUpperCase();
					$.ajax({
						url: cdnConfig.apiPath + '/member/getimgcode',
						data : {
							"token" : token
						},
						dataType: 'jsonp',
						success: function (res) {
							if (res.status == 'succ') {
								if (res.data.code == val) {
									showTip(imgCode, '', 'ok');
									$('#token').val(token);
									$('#J_form_step_1').submit();
								} else {
									showTip(imgCode, '验证码输入有误，请核对后再输入!', 'error');
								}
							} else {
								showTip(imgCode, '输入的验证码不正确', 'error');
							}
						}
					});
				} else {
					showTip(imgCode, '请输入正确的验证码', 'error');
				}
			} else {
				showTip(imgCode, '请输入验证码', 'error');
			}
		}

		//刷新页面的key
		function refreshKey(str) {
			var tar = $("#security");
			tar.val(str[1]);
			tar.attr("name", str[0]);
		}

		/**
		 *    显示提示信息函数 ==========================================
		 */
		function showTip(obj, text, type) {
			switch(type) {
				case 'ok' :
					obj.siblings('.icon-tip-ok').css('top', 'auto');
				break;
				case 'error' : 

					obj.addClass('error').siblings('.error-tips').css('top', 'auto').find('.tips-info').html(text);
				break;
			}
			
			//目标input的focus事件
			obj.on("focus", function (event) {
				event.preventDefault();
				$(this).removeClass("error").addClass('focus')
											.siblings('.icon-tip-ok').css('top', '-9999px')
											.siblings('.error-tips').css('top', '-9999px').find('.tips-info').html('');
			});
		}

		//当页面不足一屏幕是固定页脚在底部
        $(function(){
            var footerHeight = 0,
                footerTop = 0,
                $footer = $(".member-foot");
            positionFooter();
            function positionFooter() {
                //取到div#footer高度 
                footerHeight = $footer.height();
                //div#footer离屏幕顶部的距离 
                footerTop = ($(window).scrollTop() + $(window).height() - footerHeight) + "px";
               
                //如果页面内容高度小于屏幕高度，div#footer将绝对定位到屏幕底部，否则div#footer保留它的正常静态定位 
                if (($(document.body).height() + footerHeight) < $(window).height()) {
                    $footer.css({
                        position: "absolute",
                        marginTop:0,
                        top: footerTop
                    });
                    $footer.show();
                } else {
                    $footer.css({
                        position: "static"
                    });
                    $footer.show();
                }
            }
            $(window).scroll(positionFooter).resize(positionFooter);
        });
});

