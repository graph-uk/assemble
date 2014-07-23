/*! assemble-template-project 2014-07-23 */

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


;(function () {

	// Place main initialization of application here

}());