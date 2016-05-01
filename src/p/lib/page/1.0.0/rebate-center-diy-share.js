
define(function(require, exports, module){
    //加载依赖
    var dialog   = require('../../components/dialog/1.0.0/dialog');
    var qrcode = require('../../components/qrcode/1.0.0/qrcode');

    document.getElementById("J_clubAside").innerHTML = document.getElementById("J_templateClubAside").innerHTML;
    /*分享到*/
    var a = $("#J_shareHref").html(),
        b = $("#J_shareText").html();
    $(".JQ_share").each(function() {
        var c = parseInt($(this).attr("data-for"));
        switch (c) {
            case 0:
                shareUrl = "http://connect.qq.com/widget/shareqq/index.html?title=返现赚钱&url=" + a + "&desc=" + b, $(this).find("a").attr("href", shareUrl);
                break;
            case 1:
                shareUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + a + "&desc=" + b, $(this).find("a").attr("href", shareUrl);
                break;
            case 2:
                shareUrl = "http://v.t.sina.com.cn/share/share.php?url=" + a + "&title=" + b, $(this).find("a").attr("href", shareUrl);
                break;
            case 3:
                shareUrl = "http://v.t.qq.com/share/share.php?url=" + a + "&title=" + b, $(this).find("a").attr("href", shareUrl);
                break;
            case 4:
                shareUrl = "http://www.douban.com/recommend/?url=" + a + "&title=" + b, $(this).find("a").attr("href", shareUrl);
                break;
            case 5:
                shareUrl = "http://share.renren.com/share/buttonshare.do?link=" + a + "&title=" + b, $(this).find("a").attr("href", shareUrl);
                break;
        }
    });
    /*二维码*/
    var randerType = "canvas";
    //alert(navigator.appVersion);
    if (navigator.appVersion.indexOf("Trident") > -1) {
        randerType = "table"
    };
    $("#J_shareQrcode").qrcode({
        render: randerType,
        width: 154,
        height: 154,
        text: $("#J_shareHref").html()
    });

});

