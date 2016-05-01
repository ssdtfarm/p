define(function(require, exports, module){

	var jquery = require('../jquery/jquery/1.9.1/jquery');
	var dialog = require("../components/dialog/1.0.0/dialog");
	var loginDialog = require("../components/loginDialog/1.0.0/loginDialog");
	// var jqRotate = require("http://misc.jjcdn.com/p/active/ac_201503/js/jQueryRotate-2.3.min.js");
	var acNum = commonData.piAlias;
	var homeMain = commonData.domain;
	var loginSta = commonData.login;
	var luckyCred = 1;
	var rotateFunc = function(awards, angle, txt, time) { //awards:奖项，angle:奖项对应的角度
		$('#J_luckyBtn').stopRotate();
		$("#J_luckyBtn").rotate({
			angle: 0,
			duration: 3000,
			animateTo: angle + 1440,
			//angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
			callback: function() {
				if (awards == 0) {
					dNo.dialog2("谢谢参与", time)
				} else {
					dLucky.dialog1(txt, time);
					luckyCred = 0;
				}
			}
		});
	};
	/*$("#J_luckyBtn").click(function() {
	 loginDialog({
	 "cdnConfig": cdnConfig
	 });
	 });*/
	var flag = false;
	$("#J_luckyBtn").rotate({
		bind: {
			click: function() {
				if (loginSta == 1) {
					switch (luckyCred) {
						case 0:
							dNo.dialog0("太多人了啊！请刷新重试", 0);
							break;
						case 1:
							if (!flag) {
								$.ajax({
									url: 'http://' + homeMain + '/default/lottery?pi=' + acNum + '&type=1',
									dataType: "jsonp",
									jsonp: "callback",
									data: {
										setOff: "ok"
									},
									success: function(res) {
										var sta = res.status;
										switch (sta) {
											case 1:
												var time = res.data.remainder;
												var result = res.data.prize;
												flag = true;
												switch (result) {
													case 1:
														rotateFunc(1, 0, '价值49元时尚抱枕', time);
														break;
													case 2:
														rotateFunc(2, 60, '价值79元小风扇', time);
														break;
													case 3:
														rotateFunc(3, 120, '价值200元加湿器', time);
														break;
													case 4:
														rotateFunc(4, 180, '价值99元遮阳伞', time);
														break;
													case 5:
														rotateFunc(5, 240, '价值500元精美四件套', time);
														break;
													case 0:
														rotateFunc(0, 300, '谢谢参与', time);
														break;
													default:
														break;
												};
												break;
											case -1:
												// var local = window.location.href;
												// window.location.href = "http://passport.kinhom.com/?url=" + local;
												var local = window.location.href;
												window.location.href = "http://passport.kinhom.com/?url=" + local;
												break;
											case -4:
												dNo.dialog4("您目前还没有符合抽奖条件", 0);
												break;
											case -7:
												dNo.dialog3("您目前的抽奖机会已用完", 0);
												break;
											default:
												break;
										}
									},
									error: function() {
										alert("连接错误，请再次尝试");
									}
								});
							};
							break;
						default:
							break;
					}
				} else {
					var local = window.location.href;
					window.location.href = "http://passport.kinhom.com/?url=" + local;
				}
			}
		}
	});

	//弹框开始=================================
	var dLucky = new LuckyDialog();
	var dNo = new LuckyDialog();

	function LuckyDialog() {
		this.txt = "";
		this.setTxt = function(newTxt) {
			this.txt = newTxt;
		};
		this.dialog0 = function(txt, time) {
			var str = "<div class=\"lucky-dialog-content\"><p class=\"lucky-msg\">" + txt + "</p></div>";
			var d = new dialog({
				title: "提示",
				content: str,
				width: 534,
				height: 99,
				fixed: true,
				button: [{
					value: "刷新",
					id: "J_btnCj",
					className: "",
					callback: function() {
						d.close().remove();
						window.location.reload();
					}
				}],
				onclose: function() {
				 window.location.reload();
				 }
			}).showModal();
		};
		this.dialog1 = function(txt, time) {
			var str = "<div class=\"lucky-dialog-content\"><p class=\"lucky-msg tc\">恭喜您! </p><p class=\"lucky-msg\">抽中<span>" + txt + "</span>礼品1份! 活动后将由专人安排发放礼品。</p><p class=\"additional-remarks tc\">您还剩" + time + "次抽奖机会！</p></div>";
			var d = new dialog({
				title: "提示",
				content: str,
				width: 534,
				height: 99,
				fixed: true,
				button: [{
					value: "继续抽奖>>",
					id: "J_btnCj",
					className: "",
					callback: function() {
						d.close().remove();
					}
				}, {
					value: "稍后再试>>",
					id: "J_btnZs",
					className: "",
					callback: function() {
						d.close().remove();
					}
				}],
				onclose: function() {
				 window.location.reload();
				 }
			}).showModal();
		};
		this.dialog2 = function(txt, time) {
			var str = "<div class=\"lucky-dialog-content\"><p class=\"lucky-msg-strong\">这次没抽中哦，再接再厉！</p><p class=\"additional-remarks tc\">您还剩" + time + "次抽奖机会！</p></div>";
			var d = new dialog({
				title: "提示",
				content: str,
				width: 534,
				height: 99,
				fixed: true,
				button: [{
					value: "继续抽奖>>",
					id: "J_btnCj",
					className: "",
					callback: function() {
						d.close().remove();
					}
				}, {
					value: "稍后再试>>",
					id: "J_btnZs",
					className: "",
					callback: function() {
						d.close().remove();
					}
				}],
				onclose: function() {
				 window.location.reload();
				 }
			}).showModal();
		};
		this.dialog3 = function(txt, time) {
			var str = "<div class=\"lucky-dialog-content\"><p class=\"lucky-msg\">" + txt + "，继续购物每<span>满1000元可再获得1次抽奖</span>机会，上不封顶。</p></div>";
			var d = new dialog({
				title: "提示",
				content: str,
				width: 534,
				height: 99,
				fixed: true,
				button: [{
					value: "去逛逛商品>",
					id: "J_btnGo",
					className: "",
					callback: function() {
						d.close().remove();
					}
				}],
				/*onclose: function() {
				 window.location.reload();
				 }*/
			}).showModal();
		};
		this.dialog4 = function(txt, time) {
			var str = "<div class=\"lucky-dialog-content\"><p class=\"lucky-msg-strong\"><span>" + txt + "</span>， </p><p class=\"lucky-msg-strong\">暂时无法参与抽奖。</p></div>";
			var d = new dialog({
				title: "提示",
				content: str,
				width: 534,
				height: 99,
				fixed: true,
				button: [{
					value: "去逛逛商品>",
					id: "J_btnGo",
					className: "",
					callback: function() {
						d.close().remove();
					}
				}],
				/*onclose: function() {
				 window.location.reload();
				 }*/
			}).showModal();
		};
	};

});