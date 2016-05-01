(function($) {
	$.fn.F_slider = function(options){
		var defaults = {
			page : 1
		}
		var options = $.extend(defaults,options);
		return this.each(function(){
			var $this = $(this);
			var Height = $(this).find('.F-center').height();
			var len = $(this).find('ul').length;
			var page = options.page;
			$this.find('.F-prev').click(function(){
				if( page == 1){
					$this.find('.F-center').animate({top:'-=' + Height*(len-1)},'slow');
					page=len;
				}else{
					$this.find('.F-center').animate({top:'+=' + Height},'slow');
					page--;
				}
			});
			$this.find('.F-next').click(function(){
				if(page == len){
					$this.find('.F-center').animate({top:0},'slow');
					page=1;
				}else{
					$this.find('.F-center').animate({top:'-=' + Height},'show');
					page++;
				}
			});
		});
	}
})(jQuery);