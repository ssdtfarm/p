$(function(){
	//修改权限模块
	$("[nc_type='privacydiv']").live('mouseover',function(){
		$(this).find("[nc_type='privacytab']").show();
	});
	$("[nc_type='privacydiv']").live('mouseout',function(){
		$(this).find("[nc_type='privacytab']").hide();
	});
	$("[nc_type='privacyoption']").live('click',function(){
		var obj = $(this);
		var data_str = $(this).attr('data-param');
	    eval( "data_str = "+data_str);
	    var op = "editprivacy";
	    switch(data_str.op){
	    	case 'store':
	    		op = "storeprivacy";
	    		break;
	    	default:
	    		op = "editprivacy";
	    		break;
	    }
	    ajaxget('index.php?act=member_snsindex&op='+op+'&id='+data_str.sid+'&privacy='+data_str.v);
	});
	//表单权限模块
	$("[nc_type='formprivacydiv']").live('mouseover',function(){
		$(this).find("[nc_type='formprivacytab']").show();
	});
	$("[nc_type='formprivacydiv']").live('mouseout',function(){
		$(this).find("[nc_type='formprivacytab']").hide();
	});
	//选择权限
	$("[nc_type='formprivacyoption']").live('click',function(){
		var data_str = $(this).attr('data-param');
	    eval( "data_str = "+data_str);
	    var hiddenid = "privacy";
	    if(data_str.hiddenid !='' && data_str.hiddenid != undefined){
	    	hiddenid = data_str.hiddenid;
        }
	    //$("[nc_type='formprivacytab']").find('span').removeClass('selected');
	    $(this).parent().find('span').removeClass('selected');
	    $(this).find('span').addClass('selected');
	    $("#"+hiddenid).val(data_str.v);
	});
	//分享单个商品
	$("[nc_type='sharegoods']").bind('click',function(){
		var data_str = $(this).attr('data-param');
	    eval( "data_str = "+data_str);
	    ajaxget('index.php?act=member_snsindex&op=sharegoods_one&dialog=1&gid='+data_str.gid);
	    
	});
	//提交分享商品表单
	$("#weibobtn_goods").live("click",function(){
		if($("#sharegoods_form").valid()){
			var cookienum = $.cookie(COOKIE_PRE+'weibonum');
			cookienum = parseInt(cookienum);
			if(cookienum >= max_recordnum && $("#sg_seccode").css('display') == 'none'){
				//显示验证码
				$("#sg_seccode").show();
				var nchash = $("#sg_seccode").find("[name='nchash']").val();
				$("#sg_seccode").find("[name='codeimage']").attr('src','index.php?act=seccode&op=makecode&nchash='+nchash+'&t=' + Math.random());
			}else if(cookienum >= max_recordnum && $("#sg_seccode").find("[name='captcha']").val() == ''){
				showDialog('请填写验证码');
			}else{
				ajaxpost('sharegoods_form', '', '', 'onerror');
				//隐藏验证码
				$("#sg_seccode").hide();
				$("#sg_seccode").find("[name='codeimage']").attr('src','');
				$("#sg_seccode").find("[name='captcha']").val('');
			}
		}
		return false;
	});
	//分享单个店铺
	$("[nc_type='sharestore']").bind('click',function(){
		var data_str = $(this).attr('data-param');
	    eval( "data_str = "+data_str);	    
	    ajaxget('index.php?act=member_snsindex&op=sharestore_one&dialog=1&sid='+data_str.sid);
	});
	//提交分享店铺表单
	$("#weibobtn_store").live("click",function(){
		if($("#sharestore_form").valid()){
			var cookienum = $.cookie(COOKIE_PRE+'weibonum');
			cookienum = parseInt(cookienum);
			if(cookienum >= max_recordnum && $("#ss_seccode").css('display') == 'none'){
				//显示验证码
				$("#ss_seccode").show();
				var nchash = $("#ss_seccode").find("[name='nchash']").val();
				$("#ss_seccode").find("[name='codeimage']").attr('src','index.php?act=seccode&op=makecode&nchash='+nchash+'&t=' + Math.random());
			}else if(cookienum >= max_recordnum && $("#ss_seccode").find("[name='captcha']").val() == ''){
				showDialog('请填写验证码');
			}else{
				ajaxpost('sharestore_form', '', '', 'onerror');
				//隐藏验证码
				$("#ss_seccode").hide();
				$("#ss_seccode").find("[name='codeimage']").attr('src','');
				$("#ss_seccode").find("[name='captcha']").val('');
			}
		}
		return false;
	});
	//删除分享和喜欢的商品
	$("[nc_type='delbtn']").live('click',function(){
		var data_str = $(this).attr('data-param');
        eval( "data_str = "+data_str);
        showDialog('您确定要删除该信息吗？','confirm', '', function(){
        	ajaxget('index.php?act=member_snsindex&op=delgoods&id='+data_str.sid+'&type='+data_str.tabtype);
			return false;
		});
	});
	//喜欢操作
	$("[nc_type='likebtn']").live('click',function(){
		var obj = $(this);
		var data_str = $(this).attr('data-param');
        eval( "data_str = "+data_str);
        ajaxget('index.php?act=member_snsindex&op=editlike&inajax=1&id='+data_str.gid);
	});
	//表情模块
	//IE9下第一次弹出是位置总是定位错误，经过测试，发现找不到相对定位层，只要在正确的定位之前，先随意设置一个位置，再次正确点击的时候位置就正确了。所以添加了以下代码。
	$("#smilies_div").position({
		of: $("body"),
		at: "left bottom",
		offset: "10 10"
	});
    $("[nc_type='smiliesbtn']").live('click',function(){
    	//光标处插入代码功能
        $("[nc_type='contenttxt']").setCaret();
        var data = $(this).attr('data-param');
        eval( "data = "+data);
        smiliesshowdiv(data.txtid,this);        
    });
    //展示和隐藏评论列表
	$("[nc_type='fd_commentbtn']").live('click',function(){
		var data = $(this).attr('data-param');
        eval("data = "+data);
        //隐藏转发模块
        $('#forward_'+data.txtid).hide();
		if($('#tracereply_'+data.txtid).css("display")=='none'){
			//加载评论列表
	        $("#tracereply_"+data.txtid).load('index.php?act=member_snshome&op=commenttop&type=0&id='+data.txtid+'&mid='+data.mid);
	        $('#tracereply_'+data.txtid).show();	
		}else{
			$('#tracereply_'+data.txtid).hide();
		}
		return false;
	});
    //删除动态
	$("[nc_type='fd_del']").live('click',function(){
		var data_str = $(this).attr('data-param');
        eval("data_str = "+data_str);
        var url = "index.php?act=member_snsindex&op=deltrace&id="+data_str.txtid;
        if(data_str.type != undefined && data_str.type != ''){
        	url = url+'&type='+data_str.type;
        }
		showDialog('您确定要删除该信息吗？','confirm', '', function(){
			ajaxget(url);
			return false;
		});
	});
	//转发提交
	$("[nc_type='forwardbtn']").live('click',function(){
		var data = $(this).attr('data-param');
        eval("data = "+data);
		if($("#forwardform_"+data.txtid).valid()){
			var cookienum = $.cookie(COOKIE_PRE+'forwardnum');
			cookienum = parseInt(cookienum);
			if(cookienum >= max_recordnum && $("#forwardseccode"+data.txtid).css('display') == 'none'){
				//显示验证码
				$("#forwardseccode"+data.txtid).show();
				var nchash = $("#forwardseccode"+data.txtid).find("[name='nchash']").val();
				$("#forwardseccode"+data.txtid).find("[name='codeimage']").attr('src','index.php?act=seccode&op=makecode&nchash='+nchash+'&t=' + Math.random());
			}else if(cookienum >= max_recordnum && $("#forwardseccode"+data.txtid).find("[name='captcha']").val() == ''){
				showDialog('请填写验证码');
			}else{
				ajaxpost('forwardform_'+data.txtid, '', '', 'onerror');
				//隐藏验证码
				$("#forwardseccode"+data.txtid).hide();
				$("#forwardseccode"+data.txtid).find("[name='codeimage']").attr('src','');
				$("#forwardseccode"+data.txtid).find("[name='captcha']").val('');
			}
		}
		return false;
	});
	//展示和隐藏转发表单
	$("[nc_type='fd_forwardbtn']").live('click',function(){
		var data = $(this).attr('data-param');
        eval("data = "+data);
        //隐藏评论模块
        $('#tracereply_'+data.txtid).hide();
		if($('#forward_'+data.txtid).css("display")=='none'){
			//加载评论列表
	        $('#forward_'+data.txtid).show();
	        //添加字数提示
	        if($("#forwardcharcount"+data.txtid).html() == ''){
	        	$("#content_forward"+data.txtid).charCount({
		    		allowed: 150,
		    		warning: 10,
		    		counterContainerID:'forwardcharcount'+data.txtid,
		    		firstCounterText:'共可输入150字符，还剩',
		    		endCounterText:'个字符'
		    	});
	        }
	        //绑定表单验证
			$('#forwardform_'+data.txtid).validate({
				errorPlacement: function(error, element){
					element.next('.error').append(error);
			    },      
			    rules : {
			    	forwardcontent : {		            
			            maxlength : 150
			        }
			    },
			    messages : {
			    	forwardcontent : {
			            maxlength: '不能超过150字'
			        }
			    }
			});	        
		}else{
			$('#forward_'+data.txtid).hide();
		}
		return false;
	});
});
//显示和隐藏表情模块
function smiliesshowdiv(txtid,btnobj){
	if($('#smilies_div').css("display")=='none'){
		if($('#smilies_div').html() == ''){
			smilies_show('smiliesdiv', 8, 'e_',$("#content_"+txtid));
		}
		$('#smilies_div').show();
		smiliesposition(btnobj);
	}else{
		$('#smilies_div').hide();
	}
}
//弹出层位置控制
function smiliesposition(btnobj){
	$("#smilies_div").position({
		of: btnobj,
		at: "left bottom",
		offset: "105 57"
	});
}
function ajaxload_page(objname){
	$('#'+objname).find('.demo').ajaxContent({
		event:'click',
		loaderType:"img",
		loadingMsg:"templates/default/images/transparent.gif",
		target:'#'+objname
	});
}