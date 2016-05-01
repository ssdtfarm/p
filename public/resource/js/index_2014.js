// JavaScript Document   By_kame 2014.5.6

 $(function(){
  $(".all_cata").find("li.list").each(
    function() {
        $(this).mouseover(
            function() {
                menu = $("#"+this.id+" .hide_map");
                menu_height = menu.height();
                if (menu_height <45) menu.height(333);
                menu_height = menu.height();
                li_top = $(this).position().top;
                li_left = $(this).position().left;
                if ((li_top > 102) && (menu_height >= li_top)) $(menu).css("top",-li_top+204);
                if ((li_top > 290) && (menu_height >= li_top)) $(menu).css("top",-li_top+483);
                if ((li_top > 308) && (menu_height <= li_top)) $(menu).css("top",-li_top+585);   
                menu.show();
                $(this).addClass("hover");
            }
        );
        $(this).mouseout(
            function() {
                $(this).removeClass("hover");
                $(".hide_map").hide();
            });
         });


  //热卖切换
  $('.hot .mt h2').mousemove(function(){
    var num=$(this).index();
    var myleft=num*74;
    $('.hot .tab_arrow').stop().animate({top:myleft},74);
    $(this).addClass('curr').siblings().removeClass('curr');
    $('.hot .show ul').eq(num).addClass('curr').siblings().removeClass('curr');
  })
  
  //新闻Js
  $('.hot .tab h2').mouseover(function(){
    $(this).addClass('curr').siblings().removeClass('curr');
    $(this).parent().siblings().children().eq($(this).index()).addClass('curr').siblings().removeClass('curr')
  })


  //楼层切换
   $('body').find('.floor .pro_list_til li:first-child').addClass('curr');
  $('.floor .pro_list_til li').mousemove(function(){
    var num=$(this).index();
    var myleft=225+num*140;
    $(this).parent().siblings('.tab_arrow').stop().animate({left:myleft},140);
    $(this).parent().siblings('.floor_in').children('.f_mainW').children('.f_main_slide').children().eq(num).show().siblings().hide();
        $(this).addClass('curr').siblings().removeClass('curr');
    $(this).eq($(this).index()).addClass('curr').siblings().removeClass('curr')
  })
    $('.floor .pro_list_til li').mouseout(function(){
      $(this).parent().find('a').removeClass('curr');
    });
   });
//装修汇
//<![CDATA[
$(function(){
  (function(){
    var curr = 0;
    $("#ZslidesBtn .trigger").each(function(i){
      $(this).click(function(){
        curr = i;
        $("#Zslides li").eq(i).fadeIn("slow").siblings("li").hide();
        $(this).siblings(".trigger").removeClass("imgSelected").end().addClass("imgSelected");
        return false;
      });
    });
    
    var pg = function(flag){
      if (flag) {
        if (curr == 0) {
          todo = 2;
        } else {
          todo = (curr - 1) % 3;
        }
      } else {
        todo = (curr + 1) % 3;
      }
      $("#ZslidesBtn .trigger").eq(todo).click();
    };
    
    //上一个
    $("#prev").click(function(){
      pg(true);
      return false;
    });
    
    //下一个
    $("#next").click(function(){
      pg(false);
      return false;
    });
    
    //滑入停止
    var timer = setInterval(function(){
      todo = (curr + 1) % 3;
      $("#ZslidesBtn .trigger").eq(todo).click();
    },3000);
    
    $("#Zslides,#prev,#next").hover(function(){
        clearInterval(timer);
      },
      function(){
        timer = setInterval(function(){
          todo = (curr + 1) % 3;
          $("#ZslidesBtn .trigger").eq(todo).click();
        },3000);      
      }
    );
  })();
});
//]]>
    //右侧导航
    $(window).resize(function(){
      var khT = ($(window).height()-$(".kh_bar").height())/2+"px"
      $(".kh_bar").css({
        "top":khT
      });
    })
    $(function(){
      $(".kh_bar li").mouseenter(function() {
          $(this).stop().animate({
            right: 0
          }, 500);
        }).mouseleave(function() {
          $(this).stop().animate({
            right: -61
          }, 500);
        });
        //回到顶部
        $(".kh_top").click(function() {
          $('body,html').animate({
            scrollTop: 0
          }, 1000);
           return false;
        });
    })

   //浮动导航
/*   $(function(){
    $(window).scroll(function(){
      if($(document).scrollTop()>260){
         $(".kh_bar").show();//当滚动大于260出现
        };
      if ($(document).scrollTop()<=260) {
         $(".kh_bar").hide();
      };
    });
   });*/

//奖牌展示
$(function(){
 $('.kh_credit ul li').mouseenter(function(){
      $(this).find('.cred_hide,.cred_hide_sp').removeClass('none');
    $(this).find('.cred_hide,.cred_hide_sp').addClass('db');
  }).mouseleave(function(){
    $(this).find('.cred_hide,.cred_hide_sp').removeClass('db');
    $(this).find('.cred_hide,.cred_hide_sp').addClass('none');
  });
});

//购买记录
function startmarquee(lh,speed,delay) {
var p=false;
var t;
var o=document.getElementById("Cbuy_box");
o.innerHTML+=o.innerHTML;
o.style.marginTop=0;
o.onmouseover=function(){p=true;}
o.onmouseout=function(){p=false;}
function start(){
t=setInterval(scrolling,speed);
if(!p) o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
}
function scrolling(){
if(parseInt(o.style.marginTop)%lh!=0){
o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2) o.style.marginTop=0;
}else{
clearInterval(t);
setTimeout(start,delay);
}
}
setTimeout(start,delay);
}

/*首页 双十一广告*/
$(function(){
  var adMain = $("#top_AD_1111");
  var adxx = $("#top_AD_1111 .kh_active_1111_topADxx");
  var adL = ($(window).width()-1190)/2-20+"px";
  adxx.css({
      "right":adL
  });
  $("#top_AD_1111 .kh_active_1111_topADxx").click(function(){
       $(this).hide();
       $("#top_AD_1111").slideUp(1000);
    })
})

/*=====================*/
//品牌馆20141203
// by.jinjing
/*=====================*/
$(function(){
  $(".ui-searchBrand-navBar-sort dd a").each(function(index, element){
      var _index = index;
      var childThis= $(this).children("i");
      $(this).click(function(e) {
        $(".ui-searchBrand-navBar-sort dd a").each(function(index, element){
          if(index==_index){
            if($(this).children("i").hasClass("icon-2w")){
            	if (!($(this).children("i").hasClass("icon-2w-down"))&&!($(this).children("i").hasClass("icon-2w-up"))) {
                    $(this).children("i").addClass("icon-2w-down");
            	}else{
            	    if ($(this).children("i").hasClass("icon-2w-down")) {
            		$(this).children("i").removeClass("icon-2w-down");
            		$(this).children("i").addClass("icon-2w-up");
            			}else {
            		$(this).children("i").removeClass("icon-2w-up");
            		$(this).children("i").addClass("icon-2w-down");
            	}
            }
            }
            $(this).addClass("cur");  
          }else{
            $(this).removeClass("cur");
          }

                });
            });
        }); 	
})

  