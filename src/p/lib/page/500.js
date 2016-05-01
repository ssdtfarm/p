define(function(require, exports, module) {

    /*  404js文件
     *  @author jinjing
     *  @date   2016-04-25
     */
    var countDown = require('../components/countDown/1.0.1/countDown');
    $(function() {
        countDown(10000, function(CDay, CHour, CMinute, CSecond) {
            $("#J_secOut").html(CSecond);
        }, function() {
            location.href = "http://www.kinhom.com";
        });
    });
});
