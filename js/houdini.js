/* =============================================================

	Houdini v5.0
	A simple collapse and expand widget by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.houdini = (function (window, document, undefined) {

	'use strict';

	// Stop YouTube, Vimeo, and HTML5 videos from playing when leaving the slide
	var _stopVideo = function (content) {
		if ( !buoy.hasClass(content, 'active') ) {
			var iframe = content.querySelector( 'iframe');
			var video = content.querySelector( 'video' );
			if ( iframe !== null ) {
				var iframeSrc = iframe.src;
				iframe.src = iframeSrc;
			}
			if ( video !== null ) {
				video.pause();
			}
		}
	};

	// Toggle the collapse/expand widget
	var _toggleCollapse = function (event) {

		// Selectors and variables
		var dataID = this.getAttribute('data-target');
		var dataTarget = document.querySelector(dataID);

		// Events, listeners, and inits
		event.preventDefault(); // Prevent default behavior
		buoy.toggleClass(this, 'active'); // Change text on collapse toggle
		buoy.toggleClass(dataTarget, 'active'); // Collapse or expand content area
		_stopVideo(dataTarget); // If content area is closed, stop playing any videos

	};

	// Initialize Houdini
	var init = function () {

		// Feature test before initilizing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			var toggles = document.querySelectorAll('[data-collapse]'); // Get all collapse toggles
			buoy.addClass(document.documentElement, 'js-houdini'); // Add class to HTML element to activate conditional CSS

			// Whenever a toggle is clicked, run the expand/collapse function
			Array.prototype.forEach.call(toggles, function (toggle, index) {
				toggle.addEventListener('click', _toggleCollapse, false);
			});

		}

	};

	// Return public methods
	return {
		init: init
	};

})(window, document);