$(function(){

    //设置有无商业计划书上传开关
    $('.hasPlan').on('click', function(){
        $(this).addClass('check');
        $('.planInput').val(1);
        $('.hasNoPlan').removeClass('check');
    });
    $('.hasNoPlan').on('click', function(){
        $(this).addClass('check');
        $('.planInput').val(0);
        $('.hasPlan').removeClass('check');
    });

    //截取输入的字符串
    $('.J_checkInput').each(function(index, el) {
        var self = $(this);
        self.on('focus', function(){
            self.removeClass('error');
        })
        self.on('keyup',function(){
            var val =self.val();
            val = stripscript(val);
            self.val(val);

            if(val.length > 300) {
                self.val( val.substr(0,300));
            }
        })
    });
    //上传文件
    $('.fileBtn').on('click', function(){
       
    })
    //表单提交
    var hasSubmit = false;
    $('.subBtn').on('click', function(){
        //页面如果成功提价过一次了，提示并阻止织提交。
        if (hasSubmit) {
            showDialog('hasSub');
            return;
        }
        var submitFlag = true;
        $('.J_checkInput').each(function(index, el) {
            var self = $(this);
                val = $.trim(self.val());

            val = stripscript(val);
            self.val(val);   

            if (val == '') {
                submitFlag = false;
                self.addClass('error');
            }
        });

        //ajax提交表单
        if(submitFlag) {
            ajaxSubmit('http://sale.kinhom.com/api/index');
        }
        
    })

    function ajaxSubmit(url){
        $.ajax({
            url : url,
            type:'POST',
            dataType : 'jsonp',
            data : {
                projectName : $('.txt').val(),
                projectDes  : $('.projectDesTxt').val(),
                memberInfo  : $('.memberInfoTxt').val(),
                financeInfo : $('.financeInfoTxt').val(),
                plan        : $('.planInput').val()
            },
            success : function(result){
                if (result.status == "succ") {
                    showDialog('succ');
                    hasSubmit = true;
                } else {
                    showDialog('fail');
                }
            }
        });
    }

    //关闭弹窗
    $('.closeBtn,.okBtn').on('click', function(){
        hideDialog();
    })

    //显示弹窗
    function showDialog(flag){
        $('.winMark').show();
        $('.activeDialog').show();
        setDialogContent(flag);
    }
    //隐藏弹窗
    function hideDialog(){
        $('.winMark').hide();
        $('.activeDialog').hide();
    }
    function setDialogContent(flag) {
        var succHtml = '<h2 class="succ"><i class="icon-face-smile-orange"></i>恭喜您！您已报名成功！</h2><p class="succTips">评选结果会于7月31日前公布，请留意。</p>';

        var failHtml = '<h2 class="fail"><i class="icon-face-frown-blue"></i>提交失败，请重新提交。</h2>';

        var hasSubHtml = '<h2 class="succ"><i class="icon-face-smile-orange"></i>您已提交过了。</h2><p class="succTips">评选结果会于7月31日前公布，请留意。</h2>';

        if(flag == 'succ') {
            $('.dialogContent').html(succHtml);
        } else if(flag == 'fail') {
            $('.dialogContent').html(failHtml);
        } else if(flag == 'hasSub') {
            $('.dialogContent').html(hasSubHtml);
        }
    }
    //过滤特殊字符
    function stripscript(s) { 
        var pattern = new RegExp("[`~(){}':;'\\[\\]<>]"); 
        var rs = ""; 
        for (var i = 0; i < s.length; i++) { 
            rs = rs+s.substr(i, 1).replace(pattern, ''); 
        } 
        return rs; 
    }
})