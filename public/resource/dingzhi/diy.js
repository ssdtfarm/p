$(function() {
    $("input").each(function() {
        $(this).focus(function() {
            formTipHidden("#diyform");
        })
    })
})

function chkDiyForm() {
    var userName = diyForm.userName.value;
    var phNum = diyForm.phNum.value;
    var addr = diyForm.addr.value;
    var urStyle = diyForm.urStyle.value;
    var changePro = diyForm.changePro.value;
    var changeCity = diyForm.changeCity.value;
    var changeSty = diyForm.changeSty.value;
    var data = {"userName":userName,"phNum":phNum,"addr":addr,"urStyle":urStyle,"changePro":changePro,"changeCity":changeCity,"changeSty":changeSty};
    if (chkUsername(userName)) {
        if (chkTelphone(phNum)) {
            /*if (chkAddr(diyForm.addr.value)) {*/
			if(chkUrStyle150(diyForm.urStyle.value)){
                /*if (chkUrStyle(diyForm.urStyle.value)) {*/

                    $.getJSON('./index.php?act=custom&op=dingzhi',data,function(jsdata){
                        if (jsdata.done == 'ok') {
                            applytoDialog("#diyform");
                        }
                        if (jsdata.done == 1) {
                            formTipShow("phNum", "手机号码格式有误");
                        }
                        if (jsdata.done == 2) {
                            formTipShow("userName", "称呼格式错误");
                        }
                    })
                    
                    //return true;
                //}
            }
        }
    }
    return false;
}

function chkUsername(inv) {
    var reg = /([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g
    if (inv == "") {
        formTipShow("userName", "您的称呼不能为空");
        return false;
    } else {
        if (reg.test(inv)) {
            formTipShow("userName", "姓名中不能有特殊字符")
            return false;
        } else {
            return true;
        }
    }
    return false;
}

function chkTelphone(inv) {
    var reg = /^(134|135|136|137|138|139|150|151|152|157|158|159|187|130|131|132|155|156|185|186|133|153|180|189|188|170)\d{8}$/
    if (isNaN(inv) || inv == "") {
        inv == "" ? formTipShow("phNum", "您的手机号码不能为空") : formTipShow("phNum", "只能是纯数字");
        return false;
    } else {
        if (reg.test(inv)) {
            return true;
        } else {
            formTipShow("phNum", "手机号码格式有误")
            return false;
        }
    }
    return false;
}
function chkUrStyle150(inv){
          if ((inv.length>=0)&&(inv.length<=150)){
            return true;
           } else {
            formTipShow("urStyle", "详细描述最多可以有150字哦")
            return false;
        }  
    return false;
}

/*function chkAddr(inv) {
    var reg = /([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g
    if (inv == "") {
        formTipShow("addr", "详细地址不能为空");
        return false;
    } else {
        if (reg.test(inv)) {
            formTipShow("addr", "详细地址中不能有特殊字符")
            return false;
        } else {
            return true;
        }
    }
    return false;
}

function chkUrStyle(inv) {
    if (inv == "") {
        formTipShow("urStyle", "请您能够将的需求进一步告诉我们");
        return false;
    } else {
        return true;
    }
    return false;
}
*/
function formTipShow(objName, str) {
    var obj = $("input[name=" + objName + "]");
    var areaObj = $("textarea[name=" + objName + "]");
    obj.parent().append('<p class="tip"><i></i><span>' + str + '</span></p>');
    areaObj.parent().append('<p class="tip"><i></i><span>' + str + '</span></p>');
    $(".tip").slideDown(500, function() {
        setTimeout(function() {
            delTip()
        }, 1800);
    });

}

function delTip() {
    $(".tip").slideUp(500, function() {
        $(this).remove();
    });
}

function formTipHidden(formId) {
    var fId = $(formId);
    var allobj = fId.find(".tip");
    /*var pObj = document.getElementById(formId);
    pObj.getElementsByClassName("p");*/
    allobj.remove();
}
$(function() {
  $(".ui-diy-apply .text").each(function() {
        var thisVal = $(this).val();
        //判断文本框的值是否为空
        if (thisVal != "") {
            $(this).siblings("label").hide();
        } else {
            $(this).siblings("label").show();
        }
        //获取焦点后输入框验证
            $(this).focus(function() {
                $(this).siblings("label").hide();
            }).blur(function() {
                var val = $(this).val();
                if (val != "") {
                    $(this).siblings("label").hide();
                } else {
                    $(this).siblings("label").show();
                }
            });
        })
})

