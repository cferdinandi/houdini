/* =============================================================

	Houdini v5.1
	A simple collapse and expand widget by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.houdini = (function (window, document, undefined) {

	'use strict';

	// Default settings
	// Private {object} variable
	var _defaults = {
		toggleActiveClass: 'active',
		contentActiveClass: 'active',
		initClass: 'js-houdini',
		callbackBefore: function () {},
		callbackAfter: function () {}
	};

	// Merge default settings with user options
	// Private method
	// Returns an {object}
	var _mergeObjects = function ( original, updates ) {
		for (var key in updates) {
			original[key] = updates[key];
		}
		return original;
	};

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
	var toggleContent = function (toggle, contentID, options, event) {

		options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
		var content = document.querySelector(contentID); // Get content area

		// If toggle is a link, prevent default click event
		if ( toggle && toggle.tagName === 'A' && event ) {
			event.preventDefault();
		}

		options.callbackBefore(); // Run callbacks before toggling content

		// Toggle collapse element
		buoy.toggleClass(toggle, options.toggleActiveClass); // Change text on collapse toggle
		buoy.toggleClass(content, options.contentActiveClass); // Collapse or expand content area
		_stopVideos(content); // If content area is closed, stop playing any videos

		options.callbackAfter(); // Run callbacks after toggling content

	};

	// Initialize Houdini
	// Public method
	// Runs functions
	var init = function ( options ) {

		// Feature test before initilizing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
			var toggles = document.querySelectorAll('[data-collapse]'); // Get all collapse toggles

			// Add class to HTML element to activate conditional CSS
			buoy.addClass(document.documentElement, options.initClass);

			// Whenever a toggle is clicked, run the expand/collapse function
			Array.prototype.forEach.call(toggles, function (toggle, index) {
				toggle.addEventListener('click', toggleContent.bind( null, toggle, toggle.getAttribute('data-collapse'), options ), false);
			});

		}

	};

	// Return public methods
	return {
		init: init,
		toggleContent: toggleContent
	};

})(window, document);