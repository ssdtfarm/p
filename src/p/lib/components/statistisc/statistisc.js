define(function(require, exports, module){

    /**
     *   处理页面统计代码.
     */
    $(function () {

        setTimeout(function () {
            /**
             *
             * @type {_gaq|Array}
             * @private
             */
            try {
                var _gaq = _gaq || [];
                _gaq.push(['_setAccount', 'UA-18196369-47']);
                _gaq.push(['_setDomainName', '.kinhom.com']);
                _gaq.push(['_addOrganic', 'sogou', 'query']);
                _gaq.push(['_addOrganic', 'yodao', 'q']);
                _gaq.push(['_addOrganic', '3721', 'name']);
                _gaq.push(['_addOrganic', 'soso', 'w']);
                _gaq.push(['_addOrganic', 'sina', 'q']);
                _gaq.push(['_trackPageview']);
                (function () {
                    var ga = document.createElement('script');
                    ga.type = 'text/javascript';
                    ga.async = true;
                    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(ga, s);
                })();
            } catch (e) {
            }
            /**
             *  ga-1
             */
            try {
                (function (i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r;
                    i[r] = i[r] || function () {
                            (i[r].q = i[r].q || []).push(arguments)
                        }, i[r].l = 1 * new Date();
                    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                    a.async = 1;
                    a.src = g;
                    m.parentNode.insertBefore(a, m)
                })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
                ga('create', 'UA-63947532-1', 'auto');
                ga('send', 'pageview');
            } catch (e) {
            }
            /**
             *  baidu
             */
            try {
                var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
                var baidu = document.createElement("script");
                baidu.src = _bdhmProtocol + "hm.baidu.com/h.js%3F975d860ef9bde4a108716e560d868e0b";

                document.body.appendChild(baidu);
            } catch (e) {
            }
            /**
             *  cnzz
             */
            try {
                var cnzzDOM = document.createElement("div");
                cnzzDOM.style.display = "none";
                cnzzDOM.id = "J_cnzzWrap";
                document.body.appendChild(cnzzDOM);

                var cnzz = document.createElement("script");
                cnzz.src = "http://s9.cnzz.com/stat.php?id=5383237&web_id=5383237";

                document.getElementById("J_cnzzWrap").appendChild(cnzz);

            } catch (e) {
            }
            /**
             *  QQ
             */
            try {
                var _QQ = document.createElement("script");
                _QQ.src = "http://wpa.b.qq.com/cgi/wpa.php?key=XzkzODAxNTU1MF8xMDA3MDRfNDAwNjUzODAzOF8";

                document.body.appendChild(_QQ);
            } catch (e) {
            }
            /**
             *  pinyou
             */
            try {
                var _goodsData = {
                    id: '18684',
                    soldOut: '0',
                    category: '客厅-茶几',
                    categoryId: '250',
                    name: '超值特卖 梵尔特系列 现代简约 白色+黑色 钢化玻璃 多功能茶几',
                    price: '1620.00',
                    imgUrl: "http://img.jjcdn.com/g1/M00/01/9B/CvoBM1OH_kuAUKZUAAJv_53xWd0316.jpg!small",
                    productUrl: "http://img.jjcdn.com/g1/M00/01/9B/CvoBM1OH_kuAUKZUAAJv_53xWd0316.jpg!max",
                    domain: '',
                    brand: '金海马',
                    promotion: '',
                    discount: '',
                    origPrice: ''
                };
                var _py = _py || [];
                _py.push(['a', 'Qt..rB7YcalmcnAmXjbdqhc86P']);
                _py.push(['domain', 'stats.ipinyou.com']);
                _py.push(['pi', _goodsData]);
                _py.push(['e', '']);
                -function (d) {
                    var s = d.createElement('script'), e = d.body.getElementsByTagName('script')[0];
                    e.parentNode.insertBefore(s, e), f = 'https:' == location.protocol;
                    s.src = (f ? 'https' : 'http') + '://' + (f ? 'fm.ipinyou.com' : 'fm.p0y.cn') + '/j/adv.js';
                }(document);
            } catch (e) {
            }

        }, 500)

    });

});