/**
 * jQuery plugin template
 */
(function ($) {

	function createWidget($ele, opts) {

	}

	$.fn.widgetName = function (opts) {
		opts = $.extend({
			// place widget defaults here
		}, opts || {});

		return this.each(function () {
			createWidget($(this), opts);
		});
	};

}(jQuery));
