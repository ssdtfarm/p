/*=================================
 seajs config
 =================================*/
var randVersion = Math.random();
seajs.config({
	base : cdnConfig.cdnPath,
	alias : {
		"jquery" : cdnConfig.cdnPath + "/lib/jquery/jquery/1.9.1/jquery.js",
		"util"   : cdnConfig.cdnPath + "/js/util.js"
	}
}); 

/*================================================
    定义全局参数,此参数在全站范围内有效
 ================================================*/
window._globalConfig = {
	"minBar" : { 
		"data" : {
			"cdnPath" : cdnConfig.cdnPath,
			"live800" : {
				"clientLink" : "http://care3.live800.com/live800/chatClient/chatbox.jsp?companyID=8141&configID=1408&enterurl=http%3A%2F%2Fcare3%2Elive800%2Ecom%2Flive800%2Fpreview%2Ejsp%3Fid%3D8141&pagereferrer=http%3A%2F%2Fcare3%2Elive800%2Ecom%2Flive800%2FembedScript%2Ejsp%3FcurrentConfigId%3D1408&k=1",
				// "clientLink" : "http://chat32.live800.com/live800/chatClient/chatbox.jsp?companyID=542108&configID=76897&jid=4159371206",
				"iconPath"   : "/images/icon-float-nav-chat.gif",
				"iconWidth"  : 40,
				"iconHeight" : 40,
				"chatNum"    : 1,
				"iconText"   : "在线客服"
			},
			"wapQQ" : {
				"clientLink" : "http://crm2.qq.com/page/portalpage/wpa.php?uin=4006538038&aty=0&a=0&curl=&ty=1",
				"iconPath"   : "/images/float_min_bar_qq.png",
				"iconWidth"  : 40,
				"iconHeight" : 40,
				"chatNum"    : 0,
				"iconText"   : "QQ客服"
			},
			"cart" : {
				"clientLink" : "javascript:void(0);",
				"iconPath"   : "",
				"iconWidth"  : 40,
				"iconHeight" : 40,
				"chatNum"    : 0,
				"iconText"   : ""

			},
			"mobile" : {
				"clientLink" : "javascript:void(0);",
				"iconPath"   : "/images/float_app.png",
				"iconWidth"  : 160,
				"iconHeight" : 250,
				"chatNum"    : 0,
				"iconText"   : "金海马商城触屏版"

			},
			"wechat" : {
				"clientLink" : "javascript:void(0);",
				"iconPath"   : "/images/float_wechat.png",
				"iconWidth"  : 140,
				"iconHeight" : 164,
				"chatNum"    : 0,
				"iconText"   : "关注微信公众号"

			},
			"feedback" : {
				"clientLink" : "http://www.wenjuan.com/s/qU36f2/",
				"iconPath"   : "",
				"iconWidth"  : 40,
				"iconHeight" : 40,
				"chatNum"    : 0,
				"iconText"   : "意见反馈"

			},
			"gotop" : {
				"clientLink" : "javascript:void(0);",
				"iconPath"   : "",
				"iconWidth"  : 40,
				"iconHeight" : 40,
				"chatNum"    : 0,
				"iconText"   : "返回顶部"

			}
		}
	}
};