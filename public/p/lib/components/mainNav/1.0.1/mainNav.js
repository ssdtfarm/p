define(function(require,exports,module){function mainNav(config){function init(){mainCell.find("a.nav-item").each(function(index){var ind=index;$(this).hasClass("cur")&&(setDefaultLine(ind),curIndex=ind)}),addEventListen(),staticLeft=getStatic(curIndex)}function addEventListen(){mainCell.find("a.nav-item").each(function(index){$(this).on("mouseover",function(){setDefaultLine(index)}),$(this).on("mouseout",function(){backToStatic(curIndex)})})}function setDefaultLine(ind){var curWidth=mainCell.find("a.nav-item").eq(ind).outerWidth(!0),disWidth=curWidth-mainCell.find("a.nav-item").eq(ind).width();setLineWidth(ind);for(var left=0,i=0;ind>i;i++)left+=mainCell.find("a.nav-item").eq(i).innerWidth();lineCell.stop().animate({left:left+disWidth/2},200)}function getStatic(ind){for(var curWidth=mainCell.find("a.nav-item").eq(ind).outerWidth(!0),disWidth=curWidth-mainCell.find("a.nav-item").eq(ind).width(),left=0,i=0;ind>i;i++)left+=mainCell.find("a.nav-item").eq(i).innerWidth();return left+disWidth/2}function backToStatic(index){lineCell.stop().animate({left:staticLeft},200),setLineWidth(index)}function setLineWidth(ind){lineCell.css({width:mainCell.find("a.nav-item").eq(ind).width()})}var config=config||{},mainCell=$("."+config.mainCell),lineCell=$("."+config.lineCell),staticLeft=(lineCell.innerWidth(),0),curIndex=0;init()}module.exports=mainNav});