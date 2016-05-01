        function applytoDialog(formId) {
            $(document.body).append('<div class="ui-conments-dialog-mark"></div>')
            var str = ' <div class="ui-conments-dialog">';
            str += '<div class="ui-conments-dialog-title">'
            str += '<a href="javascript:;" class="ui-conments-dialog-close"></a>'
            str += ' <span id="noticeIitle">提示</span>'
            str += '</div>'
            str += '<div class="ui-conments-dialog-content" id="noticeContent">'
            str += '  <div class="ui-conments-dialog-msgbig"><i class="ui-conments-dialog-icon-smile"></i><b>恭喜您！申请成功！</b>'
            str += '  </div>'
            str += ' <p class="ui-conments-dialog-msgsp">'
            str += '   <span>金海马客服于24小时内与您电话联系。</span>'
            str += ' </p>'
            str += ' </div>'
            str += ' <div class="ui-conments-footer">'
            str += '   <a href="javascript:;" class="ui-conments-dialog-btn" id="noticeOk">确定</a>'
            str += '</div>'
            str += ' </div>'
            $(document.body).append(str);
            var contentdiv = $(".ui-conments-dialog");
            var mark =$(".ui-conments-dialog-mark");
            var content_t = ($(window).height()-contentdiv.height())/2+"px";
            /*var content_l = (window.innerWidth - content_l)/2 + "px";
            contentdiv.style.left = content_l;*/
            contentdiv.css("top",content_t);
            mark.width($(window).width());
            mark.height($("html,body").height());
            $(".ui-conments-dialog-mark").click(function() {
                $(".ui-conments-dialog,.ui-conments-dialog-mark").remove();
            })
            $(".ui-conments-dialog-btn").click(function(){
                $(".ui-conments-dialog,.ui-conments-dialog-mark").remove();
                //alert('hello');
                //$("#urname,#urpmun,#uraddr,#urwstyle").val("");
                window.location.reload();
                //display()

            })
            $(".ui-conments-dialog-btn,.ui-conments-dialog-close").click(function() {
                $(".ui-conments-dialog,.ui-conments-dialog-mark").remove();
            
            })
        }
