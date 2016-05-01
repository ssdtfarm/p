define(function(require, exports, module) {

    //加载依赖
    var dialog = require('../../components/dialog/1.0.0/dialog');
    var minBar = require('../../components/minBar/1.0.1/minBar');
    var WebUploader = require('../../components/webUploader/webUploader');
    var template = require('../../template/tempcomment');
    var shareImg = require("../../components/shareImg/shareImg");

    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell: '#J_minBar',
        pathConfig: cdnConfig,
        tpl: template,
        tplName: "tplMinBar",
        data: _globalConfig.minBar.data
    });

    document.getElementById("J_memberAside").innerHTML = document.getElementById("J_templateMemberAside").innerHTML;
    /*
     * 点击星星 ====================================================
     */
    $(".JQ_evaluateStar").each(function(index, element) {
        var that = $(this);
        var arrLen = that.find("i").length;
        that.find("i").each(function(index, element) {
            var ind = index;
            $(this).click(function(e) {
                setEvaluateStar(that, ind, arrLen);
                that.next(".JQ_evaluateStar").val(ind); //设置当前选择了几个星星
            });
        });
    });

    /*
     * 设置星星函数 ====================================================
     *
     *  author: linyandi
     *  remix: jinjing
     *  remix-date: 20160329  
     *  obj是作用对象, index是索引, arrLen是星星数
     *
     */
    function setEvaluateStar(obj, index, arrLen) {
        var arr = obj.find("i");
        var len = index + 1;
        //设置前面的星星
        for (var i = 0; i < len; i++) {
            arr.eq(i).attr("class", "icon-star-on");
        }
        //设置后面的星星
        for (var j = 0; j < arrLen - len + 1; j++) {
            arr.eq(j + len).attr("class", "icon-star-off");
        }
        setEvaluateTxt(obj, ".JQ_evaluateTxt", index);
    };

    /*星星判断中差好评  ====================================================
     *
     *  author: jinjing
     *  date: 20160329
     *
     *
     *  objClass是文字对象id,stars是星星数
     */
    function setEvaluateTxt(thisClass, objClass, stars) {
        var obj = thisClass.siblings(objClass);
        var str = "";
        switch (true) {
            case stars <= 1:
                str = "差评！";
                break;
            case stars == 2:
                str = "中评！";
                break;
            case stars >= 2:
                str = "好评！";
                break;
            default:
                break;
        };
        obj.html(str);
    };
    /*上传晒图*/

    // $(".evaluate-item").each(function(idx) {
    //     for (var i = 0; i <= idx; i++) {
    //         var papaName = "JQ_evaluateItem_" + i;
    //         $(".evaluate-item").eq(i).addClass(papaName);

    //         console.log(papaName + ":25");
    //     };

    //     console.log(papaName + ":27");
    // });
    //baiduUpload(containerId, picker);

    $(".upload-picker").each(function(idx) {
        for (var i = 0; i <= idx; i++) {
            var picker = $(".upload-picker").eq(i).attr("id");
            var papaNum = picker.match(/[0-9]+/);
            var containerId = "#JQ_evaluateItem_" + papaNum;
        };
        console.log(containerId + ":106:" + picker);
        baiduUpload(containerId, picker);
    });

    function baiduUpload(containerId, picker) {
        var papa = containerId;
        var btnPicker = "#" + picker;
        var wrap = $(containerId + ' .JQ_evaluateUpload');

        // 图片容器
        var queue = $(containerId + ' .JQ_uploadList');

        // 状态栏，包括进度和控制按钮
        //var statusBar = wrap.find('.statusBar');

        // 文件总体选择信息。
        //var info = statusBar.find('.info');

        // 上传按钮
        var $upload = wrap.find('.JQ_submitEvaluate');

        // 没选择文件之前的内容。
        var placeHolder = wrap.find('.placeholder');

        // 总体进度条
        //var progress = statusBar.find('.progress').hide();

        // 添加的文件数量
        fileCount = 0;

        // 添加的文件总大小
        fileSize = 0;

        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1;

        // 缩略图大小
        thumbnailWidth = 88 * ratio;
        thumbnailHeight = 65 * ratio;

        // 可能有pedding, ready, uploading, confirm, done.
        state = 'pedding';

        // 所有文件的进度信息，key为file id
        percentages = {};

        supportTransition = (function() {
            var s = document.createElement('p').style,
                r = 'transition' in s ||
                'WebkitTransition' in s ||
                'MozTransition' in s ||
                'msTransition' in s ||
                'OTransition' in s;
            s = null;
            return r;
        })();

        // WebUploader实例
        uploader;

        if (!WebUploader.Uploader.support()) {
            alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
            throw new Error('WebUploader does not support the browser you are using.');
        };

        // 实例化
        var uploader = WebUploader.create({
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            // swf文件路径
            swf: '../../components/webUploader/Uploader.swf',
            disableGlobalDnd: true,
            chunked: true,
            server: 'http://my.kinhom.com/evaluate/index',
            //server: 'http://api.jjcdn.com:3000/api/show/evaluate',
            //server: 'http://misc.jjcdn.com/p/test.php',
            fileNumLimit: 5,
            fileSizeLimit: 10 * 1024 * 1024, // 10 M
            fileSingleSizeLimit: 2 * 1024 * 1024, // 2 M
            auto: true
        });

        //添加“ 添加文件” 的按钮，
        uploader.addButton({
            // id: '.JQ_filePicker',
            id: btnPicker,
            innerHTML: '+'
        });
        // uploader.on('uploadProgress', function(file) {

        // });
        // uploader.on('uploadSuccess', function(file, response) {
        //     console.log("sendOk204:" + response.status);
        //     addFile(file);
        //     //uploader.on('uploadAccept', function(file, response) {
        //     // if (hasError) {
        //     //     // 通过return false来告诉组件，此文件上传有错。
        //     //     console.log("sendNo:" + response);
        //     //     return false;
        //     // } else {
        //     //     addFile(file);
        //     //     console.log("sendOk:" + response);
        //     // }
        // });
        uploader.on('uploadAccept', function(file, ret) {
            console.log("sendOk204:" + ret.status);
            addFile(file);
        });
        // 当有文件添加进来时执行，负责view的创建
        function addFile(file) {
            var imgItem = $('<li id="' + file.id + '" class="items"><p class="title" title="' + file.name + '"></p><p class="imgWrap"></p><p class="progress"><span></span></p></li>');
            var itmBtns = $('<p class="btns"><i class="btn-file-delet icon-cancel JQ_btnFileDelet"></i></p>').appendTo(imgItem);
            var prgress = imgItem.find('p.progress span');
            var wrap = imgItem.find('p.imgWrap');
            var info = $('<p class="error JQ_error"></p>');
            var infoBg = $('<p class="error-bg JQ_errorBg"></p>');
            // console.log("222:" + imgItem);
            // console.log("223:" + queue);
            // console.log(file);
            console.log(containerId + ":224:" + picker);
            showError = function(code) {
                switch (code) {
                    case 'exceed_size':
                        text = '文件大小超出';
                        break;
                    case 'interrupt':
                        text = '上传暂停';
                        break;
                    default:
                        text = '上传失败，<a href="javascript:void(0)" class="btn-retry JQ_btnRetry">重试</a>';
                        break;
                }
                info.html(text).appendTo(imgItem);
                infoBg.appendTo(imgItem);
            };
            if (file.getStatus() === 'invalid') {
                showError(file.statusText);
            } else {
                // @todo lazyload
                wrap.text('预览中');
                uploader.makeThumb(file, function(error, src) {
                    if (error) {
                        wrap.text('不能预览');
                        return;
                    }
                    var img = $('<img src="' + src + '">');
                    wrap.empty().append(img);
                }, thumbnailWidth, thumbnailHeight);

                percentages[file.id] = [file.size, 0];
                file.rotation = 0;
            }
            file.on('statuschange', function(cur, prev) {
                if (prev === 'progress') {
                    prgress.hide().width(0);
                } else if (prev === 'queued') {
                    imgItem.off('mouseenter mouseleave');
                    itmBtns.remove();
                }
                // 成功
                switch (true) {
                    case cur === 'error' || cur === 'invalid':
                        showError(file.statusText);
                        percentages[file.id][1] = 1;
                        break;
                    case cur === 'interrupt':
                        showError('interrupt');
                        break;
                    case cur === 'queued':
                        percentages[file.id][1] = 0;
                        break;
                    case cur === 'progress':
                        info.remove();
                        infoBg.remove();
                        prgress.css('display', 'block');
                        break;
                    case cur === 'complete':
                        imgItem.append('<span class="success"></span>');
                        break;
                    default:
                        break;
                }

                imgItem.removeClass('state-' + prev).addClass('state-' + cur);
            });
            itmBtns.on('click', 'i', function() {
                var index = $(this).index()
                switch (index) {
                    case 0:
                        removeFile(file);
                        return;
                }
            });
            imgItem.on('mouseenter', function() {
                itmBtns.stop().show();
            });

            imgItem.on('mouseleave', function() {
                itmBtns.stop().hide();
            });
            $(".JQ_btnRetry").on('click', function() {
                retry();
            });

            imgItem.appendTo(queue);
        };

        // 负责view的销毁
        function removeFile(file) {
            var imgItem = $('#' + file.id);
            delete percentages[file.id];
            //updateTotalProgress();
            imgItem.off().find('.JQ_btnFileDelet').off().end().remove();
        };
        $upload.on('click', function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            switch (true) {
                case state === 'ready':
                    uploader.upload();
                    break;
                case state === 'paused':
                    uploader.upload();
                    break;
                case state === 'uploading':
                    uploader.stop();
                    break;
                default:
                    break;
            }
        });
    };
    //已评价晒图展示
    $(function() {
        shareImg(".JQ_imgItem", ".JQ_showImg");
    });
    /*
     * 评论内容 ========================================================
     */
    $(".JQ_evaluateContent").each(function(index, element) {
        var that = $(this);
        var objText = that.find(".JQ_evaluateAreaTxt");
        var target = that.find("i.JQ_charCount");
        //默认计算文字长度
        target.html(485);
        //按下计算文字长度
        objText.on("keyup", function(e) {
            var str = $(this).val();
            var len = 500 - $(this).html().length;
            if (len <= 0) {
                target.html(0);
                $(this).val(str.substr(0, 500));
            } else {
                target.html(len);
            }
        });
    });
    /*
     * 提交表单 =======================================================
     */
    $(".JQ_submitEvaluate").each(function(index, element) {
        var that = $(this);
        var target = that.parent().siblings().find("textarea");
        var tipDialog;
        that.click(function(e) {
            if (target.val().length < 10) {
                tipDialog = new dialog({
                    title: "温馨提示",
                    content: '<p class="tc fs-14">太少评论啦，其他买家等着您更详细的参考呢！</p>',
                    fixed: true,
                    width: 400,
                    button: [{
                        value: "确定",
                        className: "ui-btns-orange",
                        autofocus: false,
                        callback: function() {
                            //做点什么...
                        }
                    }]
                }).showModal();
            } else {
                //that.parents("form").submit();
                alert("提交了")
            }
        });
    });
});
