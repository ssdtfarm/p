/*!
	Zoom 1.7.14
	license: MIT
	http://www.jacklmoore.com/zoom

	edit by linyandi 2015-12-16
	新增可设置是否显示当前鼠标所在区域,设置参数如下:
    pointZoom boolean   设置为true时,表示需要显示鼠标区域框,此时设置pointZoomWidth,pointZoomHeight有效,反之无效
    pointZoomWidth  number  数字,设置区域宽度,默认为100
    pointZoomHeight number  数字,设置区域高度,默认为100
*/

define(function(require, exports, module){
	(function ($) {
		var defaults = {
			url: false,
			callback: false,
			target: false,
			duration: 120,
			on: 'mouseover', // other options: grab, click, toggle
			touch: true, // enables a touch fallback
			onZoomIn: false,
			onZoomOut: false,
			magnify: 1,
			pointZoom : false,
			pointZoomWidth : 100,
			pointZoomHeight : 100
		};

		// Core Zoom Logic, independent of event listeners.
		$.zoom = function (target, source, img, magnify, pzoom) {
			var targetHeight,
				targetWidth,
				sourceHeight,
				sourceWidth,
				pzoomWidth,
				pzoomHeight,
				xRatio,
				yRatio,
				offset,
				$target = $(target),
				position = $target.css('position'),
				$source = $(source);

			// The parent element needs positioning so that the zoomed element can be correctly positioned within.
			$target.css('position', /(absolute|fixed)/.test(position) ? position : 'relative');
			$target.css('overflow', 'hidden');

			img.style.width = img.style.height = '';

			$(img)
				.addClass('zoomImg')
				.css({
					position: 'absolute',
					top: 0,
					left: 0,
					opacity: 0,
					width: img.width * magnify,
					height: img.height * magnify,
					border: 'none',
					maxWidth: 'none',
					maxHeight: 'none'
				})
				.appendTo(target);

			return {
				init: function () {
					targetWidth = $target.outerWidth();
					targetHeight = $target.outerHeight();

					if (source === $target[0]) {
						sourceWidth = targetWidth;
						sourceHeight = targetHeight;
					} else {
						sourceWidth = $source.outerWidth();
						sourceHeight = $source.outerHeight();
					}
					pzoomWidth = pzoom.clientWidth;
					pzoomHeight = pzoom.clientHeight;

					xRatio = (img.width - targetWidth + pzoomWidth) / sourceWidth;
					yRatio = (img.height - targetHeight + pzoomHeight) / sourceHeight;

					offset = $source.offset();

				},
				move: function (e) {

					var left = (e.pageX - offset.left - pzoomWidth/2),
						top = (e.pageY - offset.top - pzoomHeight/2),
						pleft = 0,
						ptop  = 0;

					top = Math.max(Math.min(top, sourceHeight), 0);
					left = Math.max(Math.min(left, sourceWidth), 0);

					img.style.left = (left * -xRatio) + 'px';
					img.style.top = (top * -yRatio) + 'px';

					pleft = Math.max(Math.min(left,sourceWidth - pzoomWidth),0);
					ptop = Math.max(Math.min(top,sourceHeight - pzoomHeight),0);

					//console.log(pleft, ptop, sourceWidth, sourceHeight);

					pzoom.style.left = (pleft) + 'px';
					pzoom.style.top  = (ptop) + 'px';
				}
			};
		};

		$.fn.zoom = function (options) {
			return this.each(function () {
				var
					settings = $.extend({}, defaults, options || {}),
				//target will display the zoomed image
					target = settings.target || this,
				//source will provide zoom location info (thumbnail)
					source = this,
					$source = $(source),
					$target = $(target),
					pZoom = document.createElement("div"),
					$pZoom  = $(pZoom),
					img = document.createElement('img'),
					$img = $(img),
					mousemove = 'mousemove.zoom',
					clicked = false,
					touched = false,
					$urlElement;
				// if allow point zoom
				if(settings.pointZoom) {

					$pZoom.css({
						"position" : "absolute",
						"z-index" : 1,
						"display" : "none",
						"cursor" : "move",
						"width" : settings.pointZoomWidth + "px",
						"height" : settings.pointZoomHeight + "px",
						"background-color" : "#000",
						"opacity" : ".5",
						"filter"  : "alpha(opacity=50)"
					});
					$source.append($pZoom);
				}
				// If a url wasn't specified, look for an image element.
				if (!settings.url) {
					$urlElement = $source.find('img');
					if ($urlElement[0]) {
						settings.url = $urlElement.data('src') || $urlElement.attr('src');
					}
					if (!settings.url) {
						return;
					}
				}

				(function () {
					var position = $target.css('position');
					var overflow = $target.css('overflow');

					$source.one('zoom.destroy', function () {
						$source.off(".zoom");
						$target.css('position', position);
						$target.css('overflow', overflow);
						$img.remove();
					});

				}());

				img.onload = function () {
					var zoom = $.zoom(target, source, img, settings.magnify, pZoom);

					function start(e) {
						zoom.init();
						zoom.move(e);

						// Skip the fade-in for IE8 and lower since it chokes on fading-in
						// and changing position based on mousemovement at the same time.
						$img.stop()
							.fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
						$pZoom.show();
					}

					function stop() {
						$img.stop()
							.fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
						$pZoom.hide();
					}

					// Mouse events
					if (settings.on === 'grab') {
						$source
							.on('mousedown.zoom',
							function (e) {
								if (e.which === 1) {
									$(document).one('mouseup.zoom',
										function () {
											stop();

											$(document).off(mousemove, zoom.move);
										}
									);

									start(e);

									$(document).on(mousemove, zoom.move);

									e.preventDefault();
								}
							}
						);
					} else if (settings.on === 'click') {
						$source.on('click.zoom',
							function (e) {
								if (clicked) {
									// bubble the event up to the document to trigger the unbind.
									return;
								} else {
									clicked = true;
									start(e);
									$(document).on(mousemove, zoom.move);
									$(document).one('click.zoom',
										function () {
											stop();
											clicked = false;
											$(document).off(mousemove, zoom.move);
										}
									);
									return false;
								}
							}
						);
					} else if (settings.on === 'toggle') {
						$source.on('click.zoom',
							function (e) {
								if (clicked) {
									stop();
								} else {
									start(e);
								}
								clicked = !clicked;
							}
						);
					} else if (settings.on === 'mouseover') {
						zoom.init(); // Preemptively call init because IE7 will fire the mousemove handler before the hover handler.

						$source
							.on('mouseenter.zoom', start)
							.on('mouseleave.zoom', stop)
							.on(mousemove, zoom.move);
					}

					// Touch fallback
					if (settings.touch) {
						$source
							.on('touchstart.zoom', function (e) {
								e.preventDefault();
								if (touched) {
									touched = false;
									stop();
								} else {
									touched = true;
									start(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]);
								}
							})
							.on('touchmove.zoom', function (e) {
								e.preventDefault();
								zoom.move(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]);
							});
					}

					if ($.isFunction(settings.callback)) {
						settings.callback.call(img);
					}
				};

				img.src = settings.url;
			});
		};

		$.fn.zoom.defaults = defaults;
	}(window.jQuery));

});