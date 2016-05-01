define(function(require, exports, module) {
    /**
     *  @author ljrogn
     *  @date   2016-04-15
     * 简单封装的自定义滚动条
     * 1.html结构
     *     <div class="wrap">
     *           <ul class="list"></ul>
     *      </div>
     *  2.scss
     *      .wrap {
     *           position: relative;height: 466px; width: 338px; overflow: hidden;
     *           .list {position: absolute;}
     *           .scrollbox{opacity:0; position: absolute;right: 0; top: 0; width:2px; height:100%; background: #ccc; }
     *           .scrollbar{ position:absolute;left:0; top:0;width:100%; height:20px;background:#f60;}
     *           &:hover {.scrollbox { opacity: 1;}}
     *       }
     *  3.参数
     *      wrap (string) wrap元素的className，该元素，必须给定高度和设置相对定位。
     *      list (string) list元素的className
     *      opt
     *          boxClass (string) 用于指定自定义滚动条的元素样式
     *          barClass (string) 用于指定自定义滚动块的元素样式
     *  
     */
    function DiyScroll(wrap, list, opt) {

        if(!wrap && !list) return;

        this.wrap = $(wrap)[0];
        this.list = $(list)[0];

        this.scale = this.wrap.clientHeight / this.list.scrollHeight;
        if (this.scale > 1) return;

        this.settings = {
            boxClass: 'scrollbox',
            barClass: 'scrollbar'
        }

        this.h = 0; 
        this.t = 0;
        this.barMaxTop = 0;
        this.contentMaxTop = 0;

        if(opt) $.extend(this.settings, opt);

        this.init();
    }

    DiyScroll.prototype = {
        init: function() {

            this.scrollBox = document.createElement('div');
            this.scrollBar = document.createElement('div');

            this.scrollBox.className = this.settings['boxClass'];
            this.scrollBar.className = this.settings['barClass'];

            this.scrollBox.appendChild(this.scrollBar);
            this.wrap.appendChild(this.scrollBox);


            this.h = this.scale * this.scrollBox.scrollHeight;
            this.barMaxTop = this.scrollBox.scrollHeight - this.h;
            this.contentMaxTop = this.wrap.clientHeight - this.list.scrollHeight;
            if (this.scale == 1) this.scrollBox.style.display = 'none';
            this.scrollBar.style.height = this.h + 'px';
            this.scroll();
            this.bindEvent();

        },
        scroll: function() {
            var self = this;
            this.scrollBar.onmousedown = function(ev) {
                var ev = ev || event;
                var disY = ev.clientY - this.offsetTop;
                document.onmousemove = function(ev) {
                    var ev = ev || event;
                    self.t = ev.clientY - disY;
                    self.fnScroll();
                };

                document.onmouseup = function() {
                    document.onmouseup = document.onmousemove = null;
                };
                ev.stopPropagation();
                ev.preventDefault();
            };
        },
        bindEvent: function() {
            var self = this;

            this.list.onmousewheel = function(ev) {
                self.mouseScroll(ev);
            };
            if (this.list.addEventListener) {
                this.list.addEventListener('DOMMouseScroll', function(ev){
                    self.mouseScroll(ev);
                }, false);
            }
        },
        mouseScroll: function(ev) {
            var ev = ev || event;
            var fx = ev.wheelDelta || ev.detail;
            var bDown = true;

            if (ev.detail) {
                bDown = fx > 0 ? true : false;
            } else {
                bDown = fx > 0 ? false : true;
            }

            if (bDown) {
                this.t += 10;
            } else {
                this.t -= 10;
            }

            this.fnScroll();

            if (ev.preventDefault) {
                ev.preventDefault();
            }

            return false;
        },
        fnScroll: function() {
            if (this.t < 0) this.t = 0;
            if (this.t > this.barMaxTop) this.t = this.barMaxTop;

            var scale = this.t / this.barMaxTop;
            var listTop = scale * this.contentMaxTop;
            this.scrollBar.style.top = this.t + 'px';
            this.list.style.top = listTop + 'px';
        }
    }
    

    module.exports = DiyScroll;
});