// 根据域名判断当前环境进行设置对应的cdn地址和api地址
var CURL = window.location.host || document.location.host;
var cdnHost = "misc";
var apiHost = "kinhom";

if(CURL){
	if((CURL.indexOf("static") > -1) || (CURL.indexOf("jiajucn") > -1)) {
		cdnHost = "static";
		apiHost = "jiajucn";
	}
} 
/*================================
 path config
 ================================*/
var cdnConfig = {
	"cdnPath"     : "http://"+ cdnHost +".jjcdn.com/p",
	"itemApiPath" : "http://item."+ apiHost +".com",               //详情页请求地址
	"cartApiPath" : "http://cart."+ apiHost +".com",               //购物车请求域名
	"apiPath"     : "http://api."+ apiHost +".com",                //统一全站api接口地址
	"m"           : "http://m."+ apiHost +".com",                  //wap地址
	"my"          : "http://my."+ apiHost +".com",                 //会员系统临时请求域名
	"passport"    : "http://passport."+ apiHost +".com",           //统一登录域名
	"misc"        : "http://"+ cdnHost +".jjcdn.com",                 //静态自由域名
	"pay"         : "http://pay."+ apiHost +".com"                //支付api
};
