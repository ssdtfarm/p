define(function(require, exports, module) {

    var jquery = require('../jquery/jquery/1.9.1/jquery');
    var lazyload = require("../components/lazyload/1.0.1/lazyload.js");

    $(document).ready(function() {
        $("img.water-lazy").lazy();
        var loadingFlag = 1;
        var waterfall = new Waterfall(commonData);
        $(window).on('scroll', function() {
            var min = waterfall.getMinColumn();
            if ($(window).scrollTop() + $(window).height() >= min.minHeight + 798 - 80) {
                var page = $("#J_warterfallPage"),
                    url = "/default/ajaxshoworderlist";
                if (loadingFlag == 1) {
                    loadingFlag = -1;
                    $.ajax({
                        "url": url,
                        "dataType": "jsonp",
                        "jsonp": "callback",
                        "data": {
                            "page": page.val(),
                        },
                        success: function(res) {
                            if (res.status == "succ") {
                                if (page.val() < res.data.page) {
                                    waterfall.loadData(res.data.item);
                                    page.val(res.data.page);
                                    loadingFlag = 1;
                                }else if(page.val() == res.data.page){
                                    loadingFlag = -1;
                                    $("#J_noMore").show();
                                };
                            }
                        },
                        error: function() {
                            alert("网络忙");
                        }
                    });
                }
            }
        });
    });

    function Waterfall(waterfallData) {
        //var waterfallData = commonData;
        var columns; //所有数据列
        var dataLoaded; //已加载数据块的个数

        //数据列
        var column = {
            "colWidth": 369, //列宽
            "colCount": 3, //列数
            "colGap": 12, //列之间的间隔
            "colBorder": 2, // 列边框
            "colCommentHeight": 103, //列评论的高度
            "minHeight": 0, //最小高度列的值
            "minIndex": 0, //最小高度列的下标
            //最小高度列
            "minColumn": {
                "minHeight": 0,
                "minIndex": 0,
                "offsetBottom": 0
            },
            //最大高度列
            "maxColumn": {
                "maxHeight": 0,
                "maxIndex": 0
            }
        };

        //数据块
        var data = {
            "left": 0,
            "top": 0,
            "width": 0,
            "height": 0
        };

        //初始化数据列
        this.init = function() {

            dataLoaded = 0;
            columns = new Array(column.colCount);
            for (var i = 0; i < columns.length; i++) {
                columns[i] = 0;
            }

        }

        //插入数据块
        this.loadData = function(waterfallData) {

            //每次插入10个
            for (var i = 0; i < waterfallData.length; i++) {
                var waterImgoH = $(waterfallData[i].imgTag).attr("height"),
                    waterImgoW = $(waterfallData[i].imgTag).attr("width"),
                    warterImgSrc = $(waterfallData[i].imgTag).attr("src");
                //当前最小高度列
                column.minColumn = this.getMinColumn();
                var waterImgH = (waterImgoH * 369) / waterImgoW;
                //创建一个数据块
                data.left = (column.colWidth + column.colGap + column.colBorder) * column.minColumn.minIndex; //绝对定位的left
                data.top = column.minColumn.minHeight; //绝对定位的top
                data.width = column.colWidth;
                data.height = parseInt(waterImgH) + column.colCommentHeight;
                var $div = $("<div></div>").addClass("pbl-data").css({
                    "left": data.left,
                    "top": data.top,
                    "width": data.width,
                    "height": data.height
                });

                //插入图片
                var $img = $("<img class=\"water-lazy\"/>").css({
                    "width": 369,
                    "height": waterImgH
                }).attr({
                    "src": warterImgSrc+"!mid",
                    "alt": " "
                });
                var $a = $("<a target='_blank'></a>").append($img).attr({
                    "href": waterfallData[i].imgHref
                });
                var $divImg = $("<div></div>").addClass("pbl-img").css({
                    "width": 369,
                    "height": waterImgH
                }).append($a);
                $div.append($divImg);

                //插入用户名和评论
                var $divComment = $("<div></div>").addClass("pbl-comment");
                var $pName = $("<p></p>").addClass("comment-name");
                $("<a target='_blank'></a>").attr({
                    "href": waterfallData[i].imgHref
                }).text(waterfallData[i].imgName).appendTo($pName);
                var $pContent = $("<p></p>").addClass("comment-content");
                $("<a target='_blank'></a>").attr({
                    "href": waterfallData[i].imgHref
                }).text(waterfallData[i].imgContent).appendTo($pContent);
                $divComment.append($pName).append($pContent);
                $div.append($divComment);

                //把数据块插入容器
                $div.appendTo("#J_pbl-c-action").fadeIn(200);

                //插入后更新最小列的高度
                columns[column.minColumn.minIndex] = columns[column.minColumn.minIndex] + data.height + column.colGap;

                //插入后更新容器的高度
                $(".pbl-container").css({
                    "height": this.getMaxColumn().maxHeight
                });
            }

            //dataLoaded += i; //更新已加载数据的个数

        }

        /*根据窗口滚动加载数据块*/
        this.addData = function() {

            var that = this;
            $(window).scroll(function() {

                column.minColumn = that.getMinColumn();
                column.minColumn.offsetBottom = column.minColumn.minHeight + 798 - $(window).height() + 100;

                //当最小数据列出现在可视窗口内则加载数据块
                if ($(window).scrollTop() >= column.minColumn.offsetBottom /*&& dataLoaded < waterfallData.length-10*/ ) {
                    var page = $("#J_warterfallPage"),
                        url = "/p/active/ac201506/test.php";
                    /*$.ajax({
                        url: "http://misc.jjcdn.com" + url,
                        dataType: "jsonp",
                        jsonp: "callback",
                        data: {
                            page: page.val(),
                        },
                        success: function(res) {
                            if (res.status == "succ") {
                                var waterfallData = res.data;
                                that.loadData();
                                page.val(res.data.page);
                            }else if(res.status == "none"){
                                alert("没有更多了");
                            }
                        },
                        error: function() {
                            alert("网络忙");
                        }
                    });*/

                    //this.loadData();
                }
            });
        }

        /*获取最小高度数据列*/
        this.getMinColumn = function() {

            //获得最小高度及其下标
            minHeight = columns[0];
            minIndex = 0;
            for (var i = 1; i < columns.length; i++) {
                if (minHeight > columns[i]) {
                    minHeight = columns[i];
                    minIndex = i;
                }
            }

            var column = {
                "minHeight": minHeight,
                "minIndex": minIndex
            };
            return column;

        }

        /*获取最大高度数据列*/
        this.getMaxColumn = function() {

            //获得最小高度及其下标
            maxHeight = columns[0];
            maxIndex = 0;
            for (var i = 1; i < columns.length; i++) {
                if (maxHeight < columns[i]) {
                    maxHeight = columns[i];
                    maxIndex = i;
                }
            }

            var column = {
                "maxHeight": maxHeight,
                "maxIndex": maxIndex
            };
            return column;

        }

        this.init();
        this.loadData(waterfallData);

    }; //Waterfall end
})
