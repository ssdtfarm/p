define(function(require){
    
/* 按需加载js */
    var khVal  = require("../../components/khValidate/1.0.0/khValidate");


    //暴露两个input对象
    var usrName = $("input[name=username]");
    var usrPass = $("input[name=password]");

    //enter提交表单
    $(document).on("keydown", function(event){
        var key = event.which;
        if(key=="13"){
            submitForm(usrName, usrPass);
        }
    });
    //提交按钮提交事件
    $("#J_loginBtn").on("click", function(event){
        event.preventDefault();
        submitForm(usrName, usrPass);
    });
    /**
     * 提交表单处理函数
     * @param {usrName}  用户名输入对象
     * @param {usrPass}  密码输入对象
     */
    function submitForm(usrName, usrPass) {
        //验证用户名+密码,验证通过发起ajax进行密码和用户名验证
        if(verifyUserName(usrName) && verifyPassword(usrPass)) {
            //冻结按钮
            $("#J_loginBtnWrap").append('<span class="mark">loading...</span>')
            //发出ajax去后台验证
            $.ajax({
                url : cdnConfig.apiPath + '/member/validatemem',
                data : {
                    "username" : $.trim(usrName.val()),
                    "password" : $.trim(usrPass.val())
                },
                dataType : "jsonp",
                success  : function(res) {
                    if(res.status=="succ") {
                        showWrongTip("#J_passTip", usrPass, "登录成功！");
                        $("#J_loginForm").submit();
                    }else {
                        $(".mark").remove();
                        showWrongTip("#J_usrTip", usrName, "用户名或密码有误！");
                        showWrongTip("#J_passTip", usrPass, "用户名或密码有误！");
                    }
                }
            })
        }
    }
    /**
     * 验证用户名函数,此处只验证是否输入和格式
     * @param  {target}  要验证的目标
     */
    function verifyUserName(target) {
        var val = $.trim(target.val())
        if(val=="") {
            showWrongTip("#J_usrTip", target, "请输入用户名！");
            return false;
        }else {
            //是否输入的是邮箱
            if(val.indexOf("@")>-1) {
                return verifyMaill(val, target);
            }else{
                if(!khVal.chkUserName(val) && !khVal.chkPhone(val)) {
                    showWrongTip("#J_usrTip", target, "用户名格式有误！");
                    return false;
                }else {
                    return true;
                }
            }
        }
    }
    /**
     *  验证用户密码函数
     *
     */
    function verifyPassword(target) {
        var val = $.trim(target.val());
        if(val=="") {
            showWrongTip("#J_passTip", target, "请输入用户密码！");
            return false;
        }else {
            if(!khVal.chkPass(val)) {
                showWrongTip("#J_passTip", target, "用户密码有误！");
                return false;
            }else {
                return true;
            }
        }
    }
    /**
     * 验证邮箱函数
     * @param {val}  要验证的字符串，string
     * @param {target} 验证提示的针对目标 为jq对象
     */
    function verifyMaill(val, target) {
        if(!khVal.chkEmail(val)){
            showWrongTip("#J_usrTip", target, "邮箱格式有误！");
            return false;
        }else {
            return true;
        }
    }
    /**
     * 显示提示
     * @param {tarID}  提示框内容目标容器ID号，形式为：“#id”
     * @param {tarDom} 提示框针对的目标容器对象，只能为jq对象，如$("input")
     * @param {content} 提示的内容，可以为html内容
     * demo:   showWrongTip("#id", $("input"), "hello,world!");
     */
    function showWrongTip(tarID, tarDom, content) {
        //拼接提示内容
        var con = '<i class="icon-tip-wrong"></i>'+ '&nbsp;<span>' + content + '</span>'
        //提示框对象
        var tarObj = $(tarID);

        //设置提示内容
        tarObj.html(con);

        //针对容器添加样式
        tarDom.addClass("error");

        //如果聚焦，去除内容和样式
        tarDom.on("focus", function(){
            $(this).removeClass("error");
            tarObj.html("");
        });
    }
})