$(function(){
	setAcStatus();
});

/*活动状态判断函数*/
function setAcStatus(){
	switch(timeStatus.acOnId){
		case 0 : //10点活动
			switch(timeStatus.acStatus){
				case 0 : 
					$("#J_tenTime").addClass("t-ten-start");
					$("#J_fityTime").addClass("t-fity-start");
					$("#J_twentyTime").addClass("t-twenty-start");
					$(".ac-list-status").each(function(index, element) {
                        $(this).addClass("twenty-over");
                    });
					eTime = timeStatus.eTime;
					subTime(); //倒计时下一轮
					break;
				case 1 :
					if(timeStatus.acStack_25953==0 && timeStatus.acStack_13564==0 && timeStatus.acStack_6688==0 && timeStatus.acStack_41234==0){
						$("#J_tenTime").addClass("t-ten-over");
						$("#J_fityTime").addClass("t-fity-start");
						$("#J_twentyTime").addClass("t-twenty-start");
						setProStatus(timeStatus.acStack_25953,timeStatus.acStack_13564,timeStatus.acStack_6688,timeStatus.acStack_41234,"ten");
						eTime = timeStatus.eTime;
						subTime(); //倒计时下一轮
							
					}else{
						//设置对应的产品
						setProStatus(timeStatus.acStack_25953,timeStatus.acStack_13564,timeStatus.acStack_6688,timeStatus.acStack_41234,"ten");
						//状态改变
						$("#J_tenTime").addClass("t-ten-on");
						$("#J_fityTime").addClass("t-fity-start");
						$("#J_twentyTime").addClass("t-twenty-start");
						
						
					}
					break;
				case 2 : 
					$("#J_tenTime").addClass("t-ten-over");
					$("#J_fityTime").addClass("t-fity-start");
					$("#J_twentyTime").addClass("t-twenty-start");
					$(".ac-list-status").each(function(index, element) {
                        $(this).addClass("ten-over");
                    });
					eTime = timeStatus.eTime;
					subTime(); //倒计时下一轮
					break;
					
			}
			break;
		case 1 :  //15点活动
			switch(timeStatus.acStatus){
				case 0 : 
					$("#J_tenTime").addClass("t-ten-over");
					$("#J_fityTime").addClass("t-fity-start");
					$("#J_twentyTime").addClass("t-twenty-start");
					$(".ac-list-status").each(function(index, element) {
                        $(this).addClass("ten-over");
                    });
					eTime = timeStatus.eTime;
					subTime(); //倒计时下一轮
					break;
				case 1 : 
				if(timeStatus.acStack_25953==0 && timeStatus.acStack_13564==0 && timeStatus.acStack_6688==0 && timeStatus.acStack_41234==0){
						$("#J_tenTime").addClass("t-ten-over");
						$("#J_fityTime").addClass("t-fity-over");
						$("#J_twentyTime").addClass("t-twenty-start");
						setProStatus(timeStatus.acStack_25953,timeStatus.acStack_13564,timeStatus.acStack_6688,timeStatus.acStack_41234,"fity");
						eTime = timeStatus.eTime;
						subTime(); //倒计时下一轮
							
					}else{
						//设置对应的产品
						setProStatus(timeStatus.acStack_25953,timeStatus.acStack_13564,timeStatus.acStack_6688,timeStatus.acStack_41234,"fity");
						//状态改变
						$("#J_tenTime").addClass("t-ten-over");
						$("#J_fityTime").addClass("t-fity-on");
						$("#J_twentyTime").addClass("t-twenty-start");
					}
					break;
				case 2 : 
					$("#J_tenTime").addClass("t-ten-over");
					$("#J_fityTime").addClass("t-fity-over");
					$("#J_twentyTime").addClass("t-twenty-start");
					$(".ac-list-status").each(function(index, element) {
                        $(this).addClass("fity-over");
                    });
					eTime = timeStatus.eTime;
					subTime(); //倒计时下一轮
					break;
			}
			break;	
		case 2 :  //22点活动
			switch(timeStatus.acStatus){
				case 0 : 
					$("#J_tenTime").addClass("t-ten-over");
					$("#J_fityTime").addClass("t-fity-over");
					$("#J_twentyTime").addClass("t-twenty-start");
					$(".ac-list-status").each(function(index, element) {
                        $(this).addClass("fity-over");
                    });
					eTime = timeStatus.eTime;
					subTime(); //倒计时下一轮
					break;
				case 1 : 
					if(timeStatus.acStack_25953==0 && timeStatus.acStack_13564==0 && timeStatus.acStack_6688==0 && timeStatus.acStack_41234==0){
						$("#J_tenTime").addClass("t-ten-over");
						$("#J_fityTime").addClass("t-fity-over");
						$("#J_twentyTime").addClass("t-twenty-over");
						setProStatus(timeStatus.acStack_25953,timeStatus.acStack_13564,timeStatus.acStack_6688,timeStatus.acStack_41234,"twenty");
						eTime = timeStatus.eTime;
						subTime(); //倒计时下一轮
							
					}else{
						//设置对应的产品
						setProStatus(timeStatus.acStack_25953,timeStatus.acStack_13564,timeStatus.acStack_6688,timeStatus.acStack_41234,"twenty");
						//状态改变
						$("#J_tenTime").addClass("t-ten-over");
						$("#J_fityTime").addClass("t-fity-over");
						$("#J_twentyTime").addClass("t-twenty-on");
					}
					break;
				case 2 : 
					$("#J_tenTime").addClass("t-ten-start");
					$("#J_fityTime").addClass("t-fity-start");
					$("#J_twentyTime").addClass("t-twenty-start");
					$(".ac-list-status").each(function(index, element) {
                        $(this).addClass("twenty-over");
                    });
					eTime = timeStatus.eTime;
					subTime(); //倒计时下一轮
					break;
			}
			break;
	}
}
function setProStatus(pro_1,pro_2,pro_3,pro_4,acId){
	var sClass = acId+"-over"
	if(pro_1==0){
		$("#J_acStack_25953 .ac-list-mark").show();
		$("#J_acStack_25953 .ac-list-status").show().addClass(sClass);
	}else{
		$("#J_acStack_25953 .ac-list-mark").hide();
		$("#J_acStack_25953 .ac-list-status").hide().removeClass(sClass);
	}
	if(pro_2==0){
		$("#J_acStack_13564 .ac-list-mark").show();
		$("#J_acStack_13564 .ac-list-status").show().addClass(sClass);
	}else{
		$("#J_acStack_13564 .ac-list-mark").hide();
		$("#J_acStack_13564 .ac-list-status").hide().removeClass(sClass);
	}
	if(pro_3==0){
		$("#J_acStack_6688 .ac-list-mark").show();
		$("#J_acStack_6688 .ac-list-status").show().addClass(sClass);
	}else{
		$("#J_acStack_6688 .ac-list-mark").hide();
		$("#J_acStack_6688 .ac-list-status").hide().removeClass(sClass);
	}
	if(pro_4==0){
		$("#J_acStack_41234 .ac-list-mark").show();
		$("#J_acStack_41234 .ac-list-status").show().addClass(sClass);
	}else{
		$("#J_acStack_41234 .ac-list-mark").hide();
		$("#J_acStack_41234 .ac-list-status").hide().removeClass(sClass);
	}
}

//倒计时函数
function subTime(){
		var endtime = new Date(timeStatus.eTime).getTime(); //取结束日期(毫秒值)
		var nowtime =  new Date().getTime(); //今天的日期(毫秒值)
		var youtime = eTime; //还有多久(毫秒值)
		//var youtime = endtime - new Date(sTime).getTime();
		//console.log(endtime+":"+new Date(sTime).getTime()+":"+youtime);
			var seconds = youtime / 1000;
			var minutes = Math.floor(seconds / 60);
			var hours = Math.floor(minutes / 60);
			var days = Math.floor(hours / 24);
			var CDay = days;
			var CHour = hours % 24;
			var CMinute = minutes % 60;
			var CSecond = Math.floor(seconds % 60); //"%"是取余运算，可以理解为60进一后取余数，然后只要余数。
			
			CHour < 10 ? CHour="0"+CHour : CHour;
			CMinute < 10 ? CMinute="0"+CMinute : CMinute;
			CSecond < 10 ? CSecond="0"+CSecond : CSecond;
			console.log(youtime);
			if(youtime==0){
				console.log(youtime+"00");
				$("#J_acHour").html("00")
				$("#J_acMin").html("00")
				$("#J_acSec").html("00")
				//setAcStatus();  //设置状态和倒计时
				clearTimeout(timer);
			} else {
				
				$("#J_acHour").html(CHour)
				$("#J_acMin").html(CMinute)
				$("#J_acSec").html(CSecond);
				eTime = eTime - 1000;
			}
		
		var timer = setTimeout("subTime()", 1000);
}
