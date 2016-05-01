define(function(require, exports, module){

    /*!
     * jQuery Lazy - v0.5.4
     * http://jquery.eisbehr.de/lazy/
     * http://eisbehr.de
     *
     * Copyright 2012 - 2015, Daniel 'Eisbehr' Kern
     *
     * Dual licensed under the MIT and GPL-2.0 licenses:
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.gnu.org/licenses/gpl-2.0.html
     *
     * jQuery("img.lazy").lazy();
     */

    ;(function($, window, document, undefined)
    {
        "use strict";

        // make lazy a bit more case-insensitive :)
        $.fn.Lazy = $.fn.lazy = function(settings)
        {
            return new LazyPlugin(this, settings);
        };

        /**
         * contains all logic and the whole element handling
         * is packed in a private function outside class to reduce memory usage, because it will not be created on every plugin instance
         * @access private
         * @type {function}
         * @param {LazyPlugin} instance
         * @param {function} configuration
         * @param {object} items
         * @param {object} event
         * @returns void
         */
        function _executeLazy(instance, configuration, items, event)
        {
            /**
             * a helper to trigger the onFinishedAll callback after all other events
             * @access private
             * @type {number}
             */
            var _awaitingAfterLoad = 0,

                /**
                 * visible content width
                 * @access private
                 * @type {number}
                 */
                _actualWidth = -1,

                /**
                 * visible content height
                 * @access private
                 * @type {number}
                 */
                _actualHeight = -1,

                /**
                 * determine possible detected high pixel density
                 * @access private
                 * @type {boolean}
                 */
                _isRetinaDisplay = false,

                /**
                 * queue timer
                 * @access private
                 * @type {null|number}
                 */
                _queueTimer = null,

                /**
                 * array of items in queue
                 * @access private
                 * @type {Array}
                 */
                _queueItems = [],

                /**
                 * identifies if queue actually contains the lazy magic
                 * @access private
                 * @type {boolean}
                 */
                _queueContainsMagic = false;

            /**
             * initialize plugin
             * bind loading to events or set delay time to load all images at once
             * @access private
             * @return void
             */
            function _initialize()
            {
                // detect actual device pixel ratio
                // noinspection JSUnresolvedVariable
                _isRetinaDisplay = window.devicePixelRatio > 1;

                // bind instance to every element and set default image and placeholder to all images if nothing else is set
                if( configuration("defaultImage") !== null || configuration("placeholder") !== null )
                    for( var i = 0; i < items.length; i++ )
                    {
                        var element = $(items[i]),
                            tag = items[i].tagName.toLowerCase(),
                            propertyName = "background-image";

                        // append instance to all elements
                        element.data("plugin_" + instance.name, instance);

                        // set default image on every element without source
                        if( tag == "img" && configuration("defaultImage") && !element.attr("src") )
                            element.attr("src", configuration("defaultImage"));

                        // set placeholder on every element without background image
                        else if( tag != "img" && configuration("placeholder") && (!element.css(propertyName) || element.css(propertyName) == "none") )
                            element.css(propertyName, "url(" + configuration("placeholder") + ")");
                    }

                // if delay time is set load all images at once after delay time
                if( configuration("delay") >= 0 ) setTimeout(function() { _lazyLoadImages(true); }, configuration("delay"));

                // if no delay is set or combine usage is active bind events
                if( configuration("delay") < 0 || configuration("combined") )
                {
                    // load initial images
                    _lazyLoadImages();

                    // create unique event function
                    event.e = _throttle(configuration("throttle"), function(event)
                    {
                        // reset detected window size on resize event
                        if( event.type === "resize" )
                            _actualWidth = _actualHeight = -1;

                        // append 'lazy magic' to queue
                        _addToQueue(function() { _lazyLoadImages(event.all); }, instance, true);
                    });

                    // bind lazy load functions to scroll and resize event
                    $(configuration("appendScroll")).on("scroll." + instance.name + " resize." + instance.name, event.e);
                }
            }

            /**
             * the 'lazy magic' - check all items
             * @access private
             * @param {boolean} [allImages]
             * @return void
             */
            function _lazyLoadImages(allImages)
            {
                // stop and unbind if no items where left
                if( !items.length ) return instance.destroy();

                // helper to see if something was changed
                var loadedImages = false;

                // loop all available items
                for( var i = 0; i < items.length; i++ )
                    (function(item)
                    {
                        if( _isInLoadableArea(item) || allImages )
                        {
                            var element = $(item),
                                tag = item.tagName.toLowerCase();

                            // skip element if already loaded, this may happen because of queued cleanup function
                            if( element.data(configuration("handledName")) ) return;

                            if( // image source attribute is available
                            element.attr(configuration("attribute")) &&
                                // and is image tag where attribute is not equal source
                            ((tag == "img" && element.attr(configuration("attribute")) != element.attr("src")) ||
                                // or is non image tag where attribute is not equal background
                            ((tag != "img" && element.attr(configuration("attribute")) != element.css("background-image"))) ) &&
                                // and is visible or visibility doesn't matter
                            (element.is(":visible") || !configuration("visibleOnly")) )
                            {
                                // mark element always as handled as this point to prevent double loading
                                loadedImages = true;
                                element.data(configuration("handledName"), true);

                                // add item to loading queue
                                _addToQueue(function() { _handleItem(element, tag); });
                            }
                        }
                    })(items[i]);

                // when something was loaded remove them from remaining items
                if( loadedImages ) _addToQueue(function()
                {
                    items = $(items).filter(function()
                    {
                        return !$(this).data(configuration("handledName"));
                    });
                });
            }

            /**
             * load the given element the lazy way
             * @access private
             * @param {object} element
             * @param {string} tag
             * @return void
             */
            function _handleItem(element, tag)
            {
                // create image object
                var imageObj = $(new Image());

                // increment count of items waiting for after load
                ++_awaitingAfterLoad;

                // bind error event to trigger callback and reduce waiting amount
                imageObj.error(function()
                {
                    _triggerCallback("onError", element);
                    _reduceAwaiting();
                });

                // bind after load callback to image
                imageObj.one("load", function()
                {
                    // remove element from view
                    element.hide();

                    // set image back to element
                    if( tag == "img" ) element.attr("src", imageObj.attr("src"));
                    else element.css("background-image", "url(" + imageObj.attr("src") + ")");

                    // bring it back with some effect!
                    element[configuration("effect")](configuration("effectTime"));

                    // remove attribute from element
                    if( configuration("removeAttribute") )
                        element.removeAttr(configuration("attribute") + " " + configuration("retinaAttribute"));

                    // call after load event
                    _triggerCallback("afterLoad", element);

                    // unbind error event and remove image object
                    imageObj.off("error").remove();

                    // remove item from waiting cue and possible trigger finished event
                    _reduceAwaiting();
                });

                // trigger function before loading image
                _triggerCallback("beforeLoad", element);

                // set source
                imageObj.attr("src", element.attr(configuration(_isRetinaDisplay && element.attr(configuration("retinaAttribute")) ? "retinaAttribute" : "attribute")));

                // call after load even on cached image
                if( imageObj.complete ) imageObj.load();
            }

            /**
             * check if the given element is inside the current viewport or threshold
             * @access private
             * @param {object} element
             * @return {boolean}
             */
            function _isInLoadableArea(element)
            {
                var elementBound = element.getBoundingClientRect(),
                    threshold    = configuration("threshold"),
                    vertical     = // check if element is in loadable area from top
                        ((_getActualHeight() + threshold) > elementBound.top) &&
                            // check if element is even in loadable are from bottom
                        (-threshold < elementBound.bottom),
                    horizontal   = // check if element is in loadable area from left
                        ((_getActualWidth() + threshold) > elementBound.left) &&
                            // check if element is even in loadable are from right
                        (-threshold < elementBound.right);

                if( configuration("scrollDirection") == "vertical" ) return vertical;
                else if( configuration("scrollDirection") == "horizontal" ) return horizontal;

                return vertical && horizontal;
            }

            /**
             * receive the current viewed width of the browser
             * @access private
             * @return {number}
             */
            function _getActualWidth()
            {
                return (_actualWidth = _getDimension(_actualWidth, "Width"));
            }

            /**
             * receive the current viewed height of the browser
             * @access private
             * @return {number}
             */
            function _getActualHeight()
            {
                return (_actualHeight = _getDimension(_actualHeight, "Height"));
            }

            /**
             * try to allocate current viewed dimension (width or height) of the browser
             * uses fallback option when no dimension is found
             * @access private
             * @param {number} buffer
             * @param {string} type
             * @return {number}
             */
            function _getDimension(buffer, type)
            {
                if( buffer >= 0 ) return buffer;

                return window["inner" + type] ||
                    (document.documentElement || document.body)["client" + type] ||
                    document.body["offset" + type] ||
                    configuration("fallback" + type);
            }

            /**
             * helper function to throttle down event triggering
             * @access private
             * @param {number} delay
             * @param {function} callback
             * @return {function}
             */
            function _throttle(delay, callback)
            {
                var timeout, lastExecute = 0;

                return function(event, ignoreThrottle)
                {
                    var elapsed = +new Date() - lastExecute;

                    function run()
                    {
                        lastExecute = +new Date();
                        callback.call(undefined, event);
                    }

                    timeout && clearTimeout(timeout);

                    if( elapsed > delay || !configuration("enableThrottle") || ignoreThrottle ) run();
                    else timeout = setTimeout(run, delay - elapsed);
                };
            }

            /**
             * reduce count of awaiting elements to 'afterLoad' event and fire 'onFinishedAll' if reached zero
             * @access private
             * @return void
             */
            function _reduceAwaiting()
            {
                --_awaitingAfterLoad;

                // if no items were left trigger finished event
                if( !items.size() && !_awaitingAfterLoad ) _triggerCallback("onFinishedAll", null);
            }

            /**
             * single implementation to handle callbacks and pass parameter
             * @access private
             * @param {string|function} callback
             * @param {object} [element]
             * @return void
             */
            function _triggerCallback(callback, element)
            {
                if( (callback = configuration(callback)) )
                {
                    if( element )
                        _addToQueue(function() { callback(element); }, instance);
                    else
                        _addToQueue(callback, instance);
                }
            }

            /**
             * set next timer for queue execution
             * @access private
             * @return void
             */
            function _setQueueTimer()
            {
                _queueTimer = setTimeout(function()
                {
                    _addToQueue();
                    if( _queueItems.length ) _setQueueTimer();
                }, 2);
            }

            /**
             * add new function to queue for execution
             * @access private
             * @param {function} [callable]
             * @param {object} [context]
             * @param {boolean} [isLazyMagic]
             * @returns void
             */
            function _addToQueue(callable, context, isLazyMagic)
            {
                if( callable )
                {
                    // execute directly when queue is disabled and stop queuing
                    if( !configuration("enableQueueing") )
                    {
                        callable.call(context || window);
                        return;
                    }

                    // let the lazy magic only be once in queue
                    if( !isLazyMagic || !_queueContainsMagic )
                    {
                        _queueItems.push([callable, context, isLazyMagic]);
                        if( isLazyMagic ) _queueContainsMagic = true;
                    }

                    // start queue execution directly on first item
                    if( _queueItems.length == 1 ) _setQueueTimer();
                    return;
                }

                if( (callable = _queueItems.shift()) )
                {
                    if( callable[2] ) _queueContainsMagic = false;
                    callable[0].call(callable[1] || window);
                }
            }

            // set up lazy
            (function()
            {
                // late-bind error callback to images if set
                if( configuration("onError") )
                    for( var i = 0; i < items.length; i++ )
                        _addToQueue(function()
                        {
                            $(this).on("error." + instance.name, function()
                            {
                                _triggerCallback("onError", $(this));
                            });
                        }, items[i]);

                // if event driven don't wait for page loading
                if( configuration("bind") == "event" ) _initialize();

                // otherwise load initial images and start lazy after page load
                else $(window).load(_initialize);
            })();
        }

        /**
         * lazy plugin class constructor
         * @constructor
         * @access private
         * @param {object} elements
         * @param {object} settings
         * @returns {object|LazyPlugin}
         */
        function LazyPlugin(elements, settings)
        {
            // overwrite configuration with custom user settings
            if( settings ) $.extend(this.configuration, settings);

            /**
             * this lazy plugin instance
             * @access private
             * @type {LazyPlugin}
             */
            var _instance = this,

                /**
                 * all selected elements by jquery
                 * @access private
                 * @type {object}
                 */
                _items = elements,

                /**
                 * instance generated event executed on container scroll or resize
                 * packed in an object to be referenceable
                 * @access private
                 * @type {object}
                 */
                _event = {e: null},

                /**
                 * wrapper to get an entry from plugin instance configuration
                 * much smaller on minify as direct access
                 * @access private
                 * @type {function}
                 * @param {string} entryName
                 * @return {*}
                 */
                _configuration = function(entryName)
                {
                    return _instance.configuration[entryName];
                };

            /**
             * force lazy to load all images in loadable area right now
             * by default without throttle
             * @access public
             * @type {function}
             * @param {boolean} [useThrottle]
             * @returns void
             */
            _instance.update = function(useThrottle)
            {
                if( _event.e ) _event.e({}, !useThrottle);
            };

            /**
             * force lazy to load all images right now
             * @access public
             * @type {function}
             * @returns void
             */
            _instance.loadAll = function()
            {
                if( _event.e ) _event.e({all: true});
            };

            /**
             * destroy this plugin instance
             * @access public
             * @type {function}
             * @returns void
             */
            _instance.destroy = function ()
            {
                // unbind instance generated events
                $(_configuration("appendScroll")).off("." + _instance.name, _event.e);

                // clear items and event
                _items = {};
                _event.e = null;
            };

            // start using lazy and return all elements to be chainable or instance for further use
            _executeLazy(_instance, _configuration, _items, _event);
            return _configuration("chainable") ? elements : _instance;
        }

        // use jquery to extend class prototype without conflicts
        $.extend(LazyPlugin.prototype,
            {
                /**
                 * internal name used for bindings and namespaces
                 * @access public
                 * @var {string}
                 */
                name: "lazy",

                /**
                 * settings and configuration data
                 * @access public
                 * @type {object}
                 */
                configuration:
                {
                    // general
                    chainable       : true,
                    bind            : "load",
                    threshold       : 500,
                    fallbackWidth   : 2000,
                    fallbackHeight  : 2000,
                    visibleOnly     : false,
                    appendScroll    : window,
                    scrollDirection : "both",
                    defaultImage    : "data:image/gif;base64,R0lGODlhQAFAAbMLALOzs+Hh4dbW1rq6uoGBgTQ0NAEBARsbG8TExJeXl1RUVP///wAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNDY3OEE2OTA3NTQxMUU1QTU5QUIyMjdFNjUyQkNDMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNDY3OEE2QTA3NTQxMUU1QTU5QUIyMjdFNjUyQkNDMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI0Njc4QTY3MDc1NDExRTVBNTlBQjIyN0U2NTJCQ0MxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI0Njc4QTY4MDc1NDExRTVBNTlBQjIyN0U2NTJCQ0MxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp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",
                    placeholder     : null,

                    // delay
                    delay           : -1,
                    combined        : false,

                    // attributes
                    attribute       : "data-original",
                    retinaAttribute : "data-retina",
                    removeAttribute : true,
                    handledName     : "handled",

                    // effect
                    effect          : "show",
                    effectTime      : 0,

                    // throttle
                    enableThrottle  : true,
                    throttle        : 250,

                    // queue
                    enableQueueing  : true,

                    // callbacks
                    beforeLoad      : null,
                    afterLoad       : null,
                    onError         : null,
                    onFinishedAll   : null
                }
            });
    })(jQuery, window, document);

});