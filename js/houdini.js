/* =============================================================

	Houdini v4.3
	A simple collapse and expand widget by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.houdini = (function (window, document, undefined) {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// SELECTORS

		// Get all collapse toggles
		var toggles = document.querySelectorAll('[data-collapse]');


		// METHODS

		// Stop YouTube, Vimeo, and HTML5 videos from playing when leaving the slide
		var stopVideo = function (content) {
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
		var toggleCollapse = function (event) {

			// SELECTORS
			var dataID = this.getAttribute('data-target');
			var dataTarget = document.querySelector(dataID);

			// EVENTS, LISTENERS, AND INITS
			event.preventDefault(); // Prevent default behavior
			buoy.toggleClass(this, 'active'); // Change text on collapse toggle
			buoy.toggleClass(dataTarget, 'active'); // Collapse or expand content area
			stopVideo(dataTarget); // If content area is closed, stop playing any videos

		};


		// EVENTS, LISTENERS, AND INITS

		// Add class to HTML element to activate conditional CSS
		buoy.addClass(document.documentElement, 'js-houdini');

		// Whenever a toggle is clicked, run the expand/collapse function
		Array.prototype.forEach.call(toggles, function (toggle, index) {
			toggle.addEventListener('click', toggleCollapse, false);
		});

	}

})(window, document);