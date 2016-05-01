define(function(require, exports, modlue) {
    /* 晒图平滑显示 =====================
     *
     * author: jinjing
     * date: 20160406
     *
     * @smallImg是缩略图容器class名,@bigImg是放大图的显示区域容器class名
     */
    function shareImg(smallImg, bigImg) {
        if (smallImg && bigImg) {
            $(document).on("click",smallImg, function() {
                var that = $(this),
                    thatImg = that.find("img"),
                    imgShow = that.parent().parent().find(bigImg);
                var theImg = new Image();
                theImg.src = thatImg.attr("src");
                var imgOW = theImg.width,
                    imgOH = theImg.height,
                    imgW, imgH, showTime;
                if (imgOW >= 490) {
                    imgW = 490;
                    imgH = imgW * imgOH / imgOW;
                } else {
                    imgW = imgOW;
                    imgH = imgOH;
                };
                showTime = 100;
                if (that.hasClass("cur")) {
                    that.removeClass("cur");
                    imgHide(imgShow, 800);
                } else {
                    if (that.siblings().hasClass("cur")) {
                        that.siblings().removeClass("cur");
                        that.addClass("cur");
                        imgSmooth(imgShow, theImg.src, showTime);
                    } else {
                        that.addClass("cur");
                        imgBig(imgShow, theImg.src, showTime);
                    };
                }
                imgShow.on("click", function() {
                    that.removeClass("cur");
                    imgHide(imgShow, 800);
                });

                function imgBig(obj, imgSrc, showTime) {
                    obj.html('<img class="JQ_imgFadeIn" src="' + imgSrc + '"/><p class="img-big-mark JQ_imgBigMark"></p>').show().animate({ width: imgW, height: imgH }, showTime)
                        .find("img")
                        .animate({ width: imgW, height: imgH }, showTime)
                        .end();
                }

                function imgSmooth(obj, imgSrc, showTime) {
                    obj.fadeIn().animate({ width: imgW, height: imgH }, showTime)
                        .find(".JQ_imgFadeIn").attr("src", imgSrc)
                        .animate({ width: imgW, height: imgH }, showTime)
                        .end();
                }

                function imgHide(obj, showTime) {
                    obj.hide(showTime);
                }
            });
        }
    };
    module.exports = shareImg;
});
