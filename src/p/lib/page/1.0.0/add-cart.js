define(function(require, exports, module){

    $(function() {

        resetContainerHei();
        $(window).resize(function () { 
            resetContainerHei();
        });

        function resetContainerHei() {
            var container = $("#J_addCartContainer");
            var conHei = container.innerHeight();
            var winHei = $(window).innerHeight();

            var topBar = $(".top-bar").outerHeight();
            var headerHei = $("header").innerHeight();
            var footHei = $("footer").outerHeight();

            var countHei = 0;

            var disHei = winHei - headerHei - topBar - footHei - 50;
            // console.log(disHei);

            if (disHei >= 200) {
                container.height(disHei);
            }
        }
    });
});