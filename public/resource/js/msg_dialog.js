/*! kinhom 2014-12-01 */
var msgDialog=function(a,b,c,d){{var a=a||{},e=a.width||400,f=a.height||160,g=a.position||"fixed",h=a.dialogZindex||999999,i=a.markZindex||999998;a.btnOkEvent||""}240>e&&(e=240),160>f&&(f=160),"fixed"!=g&&"absolute"!=g&&(g="fixed"),isNaN(h)&&(h=999999),isNaN(i)&&(i=999998),i>=h&&(i=h-1);var j=a.title||"提示";this.content=a.content||"内容",this.btns=a.btns||1,this.btnOkText=a.btnOkText||"确定",this.btnCancelText=a.btnCancelText||"取消",this.btnOkClass=a.btnOkClass||"btn-ok",this.btnCancelClass=a.btnCancelClass||"btn-cancel";var k=a.bottom||"false",l=a.botAlign||"center",c=c||null,b=b||null,d=d||null,m=a.onearg,n="";n+='<div class="ui-msg-dialog" id="J_msgDialog">',"false"!=j&&(n+='<div class="ui-msg-dialog-title"><label id="uiSendSmsTitle">'+j+'</label><a href="javascript:void(0);" id="J_msgDialogClose" class="ui-msg-close"></a></div>'),n+='<div class="ui-msg-dialog-content">',n+='<div class="ui-msg-content">'+this.content+"</div></div>",n+='<div class="ui-msg-dialog-btns">',n+='<a href="javascript:void(0);" id="J_msgDialogCancel" class="'+this.btnCancelClass+' msgDialogBtn">'+this.btnCancelText+"</a>",n+='<a href="javascript:void(0);" id="J_msgDialogOk" class="'+this.btnOkClass+' msgDialogBtn">'+this.btnOkText+"</a>",n+="</div>","false"!=k&&(n+='<div class="ui-msg-dialog-bottom"  id="J_msgDialogBottom" style="text-align:'+l+'">'+k+"</div>"),n+="</div>",$("body").append(n),$("body").append('<div id="J_msgDialogMark" class="ui-marker-msg-dialog"></div>');var o=function(){$.isFunction(c)&&c()},p=function(){$.isFunction(b)&&b(m)},q=function(){$.isFunction(d)&&d()},r=function(){$("#J_msgDialog,#J_msgDialogMark").remove()};switch(q(),btns){case 1:$("#J_msgDialogOk").show().css({display:"inline-block"});break;case 2:$("#J_msgDialogOk,#J_msgDialogCancel").show().css({display:"inline-block"});break;default:$("#J_msgDialogOk").show().css({display:"inline-block"})}var s=function(){var a=$("#J_msgDialog"),b=$("#J_msgDialogMark"),c=$(document).width(),d=$(document).height(),j=$(window).width(),k=top.window.innerHeight,l=0,m=0;l=c>j?c:j,m=k>j?(k-f)/4:(k-f)/2,a.css({position:g,"z-index":h,width:e+"px",height:f+"px",left:(j-e)/2+"px",top:m+"px"}),b.css({"z-index":i,width:l+"px",height:d+"px"})};s(),$(window).resize(function(){s()}),$(document).on("click","#J_msgDialogOk",function(){p()}),$(document).on("click","#J_msgDialogCancel",function(){o(),r()}),$(document).on("click","#J_msgDialogClose",function(){r()})};msgDialog.closeAll=function(){$("#J_msgDialog,#J_msgDialogMark").remove()};