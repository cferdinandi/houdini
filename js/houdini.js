/* =============================================================

	Houdini v6.0
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
	var _stopVideos = function ( content, activeClass ) {
		if ( !content.classList.contains( activeClass ) ) {
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

	// Close all content areas in an expand/collapse group
	// Private method
	// Runs functions
	var _closeCollapseGroup = function ( toggle, options ) {
		if ( !toggle.classList.contains( options.toggleActiveClass ) && toggle.hasAttribute('data-group') ) {

			// Get all toggles in the group
			var groupName = toggle.getAttribute('data-group');
			var group = document.querySelectorAll('[data-group="' + groupName + '"]');

			// Deactivate each toggle and it's content area
			Array.prototype.forEach.call(group, function (item, index) {
				var content = document.querySelector( item.getAttribute('data-collapse') );
				item.classList.remove( options.toggleActiveClass );
				content.classList.remove( options.contentActiveClass );
			});

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

		options.callbackBefore( toggle, contentID ); // Run callbacks before toggling content

		// Toggle collapse element
		_closeCollapseGroup(toggle, options); // Close collapse group items
		toggle.classList.toggle( options.toggleActiveClass );// Change text on collapse toggle
		content.classList.toggle( options.contentActiveClass ); // Collapse or expand content area
		_stopVideos( content, options.contentActiveClass ); // If content area is closed, stop playing any videos

		options.callbackAfter( toggle, contentID ); // Run callbacks after toggling content

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
			document.documentElement.classList.add( options.initClass );

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