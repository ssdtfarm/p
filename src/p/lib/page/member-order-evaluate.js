define(function(require, exports, module) {

    //加载依赖
    var dialog = require('../components/dialog/1.0.0/dialog');
    var minBar = require('../components/minBar/1.0.1/minBar');
    var WebUploader = require('../components/webUploader/webUploader');
    var template = require('../template/tempcomment');
    var shareImg = require("../components/shareImg/shareImg");

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
                that.next(".JQ_evaluateStar").val(ind + 1); //设置当前选择了几个星星
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
        var oldVal = obj.next(".JQ_evaluateVal");
        var str = "";
        var oldStr = "";
        switch (true) {
            case stars <= 1:
                str = "差评！";
                oldStr = -1;
                break;
            case stars == 2:
                str = "中评！";
                oldStr = 0;
                break;
            case stars >= 2:
                str = "好评！";
                oldStr = 1;
                break;
            default:
                break;
        };
        obj.html(str);
        oldVal.val(oldStr);
    };
    /**
     *  晒图上传
     */
    // 基类
    function UploadImg(opts) {
        var opts = opts || {};

        if (!opts.el) {
            return;
        };

        // 防止没有使用new 操作符
        if (!this instanceof UploadImg) {
            return new UploadImg(opts);
        };

        // 每个表单的包裹元素
        this.$wrap = $(opts.el);

        // 表单预览列表容器
        this.$list = this.$wrap.find(".JQ_uploadList");

        // 上传按钮
        this.$uploadBtn = this.$wrap.find(".upload-picker");

        // 存储id 的input 元素
        this.$input = this.$wrap.find("input.JQ_imgIDs");

        // 默认参数
        this.defaults = {
            fileIds: [],
            thumbWidth: opts.width || 88,
            thumbHeight: opts.height || 68,

        };
        // 插件参数
        this.uploadOptions = {
            // 禁用拖拽上传
            disableGlobalDnd: true,
            // 上传按钮 
            pick: {
                id: this.$uploadBtn,
                innerHTML: "+"
            },
            swf: cdnConfig.cdnPath + "/lib/components/webUploader/Uploader.swf",
            // 处理上传服务器
            server: cdnConfig.my + "/evaluate/index",
            // 生成缩略图
            thumb: {
                width: this.defaults.thumbWidth,
                height: this.defaults.thumbHeight,
                allowManify: false,
                quality: 80,
                type: "image/jpeg"
            },
            // 图片上传域名称
            fileVal: "pic",
            // 接受格式设置
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            // 多大开始压缩,这里设置100KB
            compressSize: 100 * 1024,
            // 限制最大上传
            fileSizeLimit: 1024 * 1024,
            // 限制多大加入队列
            fileSingleSizeLimit: 1024 * 1024
        };
        // 实例化
        this.uploader = WebUploader.create(this.uploadOptions);

        // 调用上传处理
        this.process(this.$wrap, this.$uploadBtn);

        // 添加事件
        this.addItemEvent(this.$wrap, this.$uploadBtn);

    };
    // 处理上传
    //@theWarp 最外层容器；@picker 上传按钮；
    UploadImg.prototype.process = function(theWarp, picker) {
        // 处理上传各种状态
        var upper = this.uploader,
            _this = this,
            statusTxt;

        // 加入队列之前
        upper.on("beforeFileQueued", function(file) {

            // console.log("加入队列之前", file.size, _this.uploadOptions.fileSizeLimit);

            if (file.size > _this.uploadOptions.fileSizeLimit) {
                alert("上传文件不能超过：" + WebUploader.formatSize(_this.uploadOptions.fileSizeLimit, 0, ["B", "K", "M", "G"]));
                return false;
            }

        });

        // 加入队列
        upper.on("fileQueued", function(file) {
            // 加入队列后开始上传
            upper.upload(file);
        });

        // 上传之前
        upper.on("uploadBeforeSend", function(file, data) {
            // console.log("上传之前: " + data + " ");
        });

        // 开始上传
        upper.on("uploadStart", function(file) {
            console.log("开始上传");
            picker.append("<p class=\"btn-uplord-mark JQ_btnUplodMark\">上传中...</p>");
        });

        // 正在上传
        upper.on("uploadProgress", function(file, percentage) {
            file.on("statuschange", function(cur, prev) {
                var str = "";
                switch (cur) {
                    case "inited":
                        str = "就绪";
                        break;
                    case "queued":
                        str = "已经进入队列, 等待上传";
                        break;
                    case "progress":
                        str = "上传中...";
                        break;
                    case "complete":
                        str = "上传完成";
                        break;
                    case "error":
                        str = "上传出错，</br>请重试";
                        break;
                    case "cancelled":
                        str = "文件被移除";
                        break;
                    default:
                        break;
                }
                picker.find(".JQ_btnUplodMark").html(str);
                setTimeout(picker.find(".JQ_btnUplodMark").remove(), 500000);
            });
            //console.log("上传百分比：" + (percentage * 100).toFixed(0));
        });

        // 文件上传出错
        upper.on("uploadError", function(file, reason) {

            console.log("上传错误！218:" + reason);
        });

        //上传服务端反馈
        upper.on("uploadAccept", function(file, ret) {
            console.log(ret.status)
        });

        // 上传错误
        upper.on("error", function(type) {
            alert("上传错误!223:" + type);
        });

        // 上传成功
        upper.on("uploadSuccess", function(file, response) {

            // 重置队列，防止队列中有错误的文件阻挡上传
            // 重置了队列，就表示每次上传都是单个文件上传的队列
            upper.reset();

            // 上传后根据返回状态渲染界面和设置id 列表
            if (response.status === "succ") {
                // 添加预览小图
                _this.rendPreview(response);
                picker.find(".JQ_btnUplodMark").remove();
                // 加入id 数组
                _this.addFileId(file);
                _this.pickerEvent(theWarp, picker);

            } else {
                // 上传失败，踢出队列
                upper.cancelFile(file);
            }

        });
    };
    // 添加预览
    UploadImg.prototype.rendPreview = function(res) {

        var _this = this,
            config = _this.defaults,
            result = res.data.result;
        // 预览模板
        var $li = '<li id="' + result.imgID + '" class="items">' + '<p class="title"></p>' + '<p class="imgWrap"><img width="' + config.thumbWidth + '" height="' + config.thumbHeight + '" src="' + result.imgUrl + '!small"></p>' + '<p class="progress"><span></span></p>' + '<p class="btns">' + '<i class="btn-file-delet icon-cancel JQ_btnFileDelet"></i>' + '</p>' + '</li>';
        // 渲染列表
        this.$list.append($li);

        // 加入到id 数组中
        this.addFileId(result.imgID);
    };
    // 删除预览
    UploadImg.prototype.removePreview = function(target) {

        target.remove();

    };
    // 添加id 数组列表
    UploadImg.prototype.addFileId = function(id) {

        var idArr = this.defaults.fileIds;

        if (($.inArray(id, idArr) === -1) && !isNaN(id)) {

            idArr.push(id);

            this.$input.val(idArr);

        }

    };
    // 删除id 数组列表中对应项
    UploadImg.prototype.removeFileId = function(id) {

        var idArr = this.defaults.fileIds;

        if (($.inArray(id, idArr) > -1) && !isNaN(id)) {
            var index = $.inArray(id, idArr) - 0;

            idArr.splice(index, 1);

            this.$input.val(idArr);

        }
    };
    // 对图片列表项添加事件监听
    UploadImg.prototype.addItemEvent = function(theWarp, picker) {
        var _this = this;
        var $list = this.$list;
        var target = null;
        var id = "";

        // 显示删除按钮
        $list.on("mouseover", ".items", function(e) {
            $(this).find(".btns").show();
            id = $(this).attr("id");
            target = $(this);
        });
        // 隐藏删除按钮
        $list.on("mouseout", ".items", function(e) {
            $(this).find(".btns").hide();
        });

        // 删除事件
        $list.on("click", ".JQ_btnFileDelet", function(e) {

            _this.removeFileId(id);
            _this.removePreview(target);
            _this.pickerEvent(theWarp, picker);
        })
    };
    //添加图片按钮的显示和隐藏，还有上传图片数的监听
    UploadImg.prototype.pickerEvent = function(theWarp, picker) {
        theWarp.find(".items").each(function(idx) {
            var shareLen;
            if (idx == 4) {
                picker.hide();
            } else {
                picker.show();
            }
            var idxStr = idx.toString();
            if (idxStr) {
                shareLen = idx + 1;
            } else {
                shareLen = 0
            }
            theWarp.find(".JQ_shareNum").html("<em>" + shareLen + "</em>/5");
            //console.log(idx + ":370:" + shareLen)
        });
    };
    // 调用
    $(function() {
        $(".JQ_evaluateUpload").append('<span class="share-num JQ_shareNum"><em>0</em>/5</span>');
        $("#J_shareRule").on("click", function() {
            var d = new dialog({
                title: '晒单送积分规则',
                content: "<div class=\"share-img-dialog\"><span class=\"title\">【评价时效】</span><span class=\"txt\">您可以在购买商品后的90天内进行评价（某些品类除外）、 物流服务评价和安装服务评价</span><p class=\"title\">【评价规则】</p><ul class=\"rule-list\"><li>金海马鼓励用户发表真实、客观、原创的评价，您的评价会直接影响商品好评率以及店铺动态评分。</li><li>金海马会对评价和晒单进行审核，且金海马有权删除违法、涉黄、违反道德的评价及晒单，且审核通过后的评价和晒单才能展示给其他用户</li><li>同一订单中的相同商品或者下单时间相隔15日内不同订单中的相同商品只能评价一次</li><li>系统会对退换货商品已经产生的商品评价进行删除，并扣除已获得积分</li></ul><span class=\"title\">【评价送积分规则】</span><span class=\"txt\">晒图评价均可获得200积分。</span></div>",
                width: 490,
                height: 230,
                fixed: true,
                button: [{
                    value: "我知道了",
                    id: "J_btnShareRule",
                    className: "ui-btns-orange",
                    callback: function() {
                        d.close().remove();
                    }
                }],
                onclose: function() {
                    d.close().remove();
                }
            }).showModal();
        });
        /**
         * 调用UploadImg 实例
         * @param object 设置参数
         * @@param  string el 设置按钮的包裹容器id，必须是 #id 或者 .class 形式
         * @return object UploadImg 的实例
         */
        $(".evaluate-item").each(function(idx) {
            for (var i = 0; i <= idx; i++) {
                var shareImgId = $(".evaluate-item").eq(i).attr("id");
            }
            var updemo = new UploadImg({
                el: "#" + shareImgId
            });
        });
        // var updemo = new UploadImg({
        //     el: "#J_evaluateItem_0"
        // });

        //已评价晒图展示
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
            var len = 500 - $(this).val().length;
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
                that.parents("form").submit();
                // alert("提交了")
            }
        });
    });
});
