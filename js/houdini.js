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
	// Private method
	// Runs functions
	var _stopVideos = function (content) {
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
	// Public method
	// Runs functions
	var toggleCollapse = function (toggle, contentID, event) {

		var content = document.querySelector(contentID); // Get content area

		// If a link, prevent default click event
		if ( toggle !== null && toggle !== undefined && toggle.tagName == 'A' ) {
			if ( event !== undefined && event !== null ) {
				event.preventDefault();
			}
		}

		// Toggle collapse element
		buoy.toggleClass(toggle, 'active'); // Change text on collapse toggle
		buoy.toggleClass(content, 'active'); // Collapse or expand content area
		_stopVideos(content); // If content area is closed, stop playing any videos

	};

	// Initialize Houdini
	// Public method
	// Runs functions
	var init = function ( options ) {

		// Feature test before initilizing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			var toggles = document.querySelectorAll('[data-collapse]'); // Get all collapse toggles

			// Add class to HTML element to activate conditional CSS
			buoy.addClass(document.documentElement, 'js-houdini');

			// Whenever a toggle is clicked, run the expand/collapse function
			Array.prototype.forEach.call(toggles, function (toggle, index) {
				toggle.addEventListener('click', _toggleCollapse.bind( null, toggle, toggle.getAttribute('data-collapse') ), false);
			});

		}

	};

	// Return public methods
	return {
		init: init,
		toggleCollapse: toggleCollapse
	};

})(window, document);