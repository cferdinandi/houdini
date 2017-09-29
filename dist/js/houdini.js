/*! houdinijs v9.4.2 | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/houdini */
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.houdini = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, (function (root) {

	'use strict';

	//
	// Variables
	//

	var houdini = {}; // Object for public APIs
	var supports = 'querySelector' in document && 'addEventListener' in root && 'classList' in document.createElement('_'); // Feature test
	var settings, collapse;

	// Default settings
	var defaults = {
		selectorToggle: '[data-collapse]',
		selectorContent: '.collapse',
		toggleActiveClass: 'active',
		contentActiveClass: 'active',
		initClass: 'js-houdini',
		stopVideo: true,
		callbackOpen: function () {},
		callbackClose: function () {}
	};


	//
	// Methods
	//

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function () {

		// Variables
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;

		// Check if a deep merge
		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function (obj) {
			for ( var prop in obj ) {
				if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
					// If deep merge and property is an object, merge properties
					if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
						extended[prop] = extend( true, extended[prop], obj[prop] );
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for ( ; i < length; i++ ) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * Get the closest matching element up the DOM tree
	 * @param {Element} elem Starting element
	 * @param {String} selector Selector to match against (class, ID, or data attribute)
	 * @return {Boolean|Element} Returns false if not match found
	 */
	var getClosest = function ( elem, selector ) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.matchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.oMatchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				function(s) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(s),
						i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {}
					return i > -1;
				};
		}

		// Get closest match
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}

		return null;

	};

	/**
	 * Escape special characters for use with querySelector
	 * @public
	 * @param {String} id The anchor ID to escape
	 * @author Mathias Bynens
	 * @link https://github.com/mathiasbynens/CSS.escape
	 */
	var escapeCharacters = function ( id ) {

		// Remove leading hash
		if ( id.charAt(0) === '#' ) {
			id = id.substr(1);
		}

		var string = String(id);
		var length = string.length;
		var index = -1;
		var codeUnit;
		var result = '';
		var firstCodeUnit = string.charCodeAt(0);
		while (++index < length) {
			codeUnit = string.charCodeAt(index);
			// Note: there’s no need to special-case astral symbols, surrogate
			// pairs, or lone surrogates.

			// If the character is NULL (U+0000), then throw an
			// `InvalidCharacterError` exception and terminate these steps.
			if (codeUnit === 0x0000) {
				throw new InvalidCharacterError(
					'Invalid character: the input contains U+0000.'
				);
			}

			if (
				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, […]
				(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), […]
				(index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
				(
					index === 1 &&
					codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
					firstCodeUnit === 0x002D
				)
			) {
				// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
				result += '\\' + codeUnit.toString(16) + ' ';
				continue;
			}

			// If the character is not handled by one of the above rules and is
			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
			// U+005A), or [a-z] (U+0061 to U+007A), […]
			if (
				codeUnit >= 0x0080 ||
				codeUnit === 0x002D ||
				codeUnit === 0x005F ||
				codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
				codeUnit >= 0x0041 && codeUnit <= 0x005A ||
				codeUnit >= 0x0061 && codeUnit <= 0x007A
			) {
				// the character itself
				result += string.charAt(index);
				continue;
			}

			// Otherwise, the escaped character.
			// http://dev.w3.org/csswg/cssom/#escape-a-character
			result += '\\' + string.charAt(index);

		}

		return '#' + result;

	};

	/**
	 * Stop YouTube, Vimeo, and HTML5 videos from playing when leaving the slide
	 * @private
	 * @param  {Element} content The content container the video is in
	 * @param  {String} activeClass The class asigned to expanded content areas
	 */
	var stopVideos = function ( content, settings ) {

		// Check if stop video enabled
		if ( !settings.stopVideo ) return;

		// Only run if content container is open
		if ( !content.classList.contains( settings.contentActiveClass ) ) return;

		// Check if the video is an iframe or HTML5 video
		var iframe = content.querySelector( 'iframe');
		var video = content.querySelector( 'video' );

		// Stop the video
		if ( iframe ) {
			var iframeSrc = iframe.src;
			iframe.src = iframeSrc;
		}
		if ( video ) {
			video.pause();
		}

	};

	/**
	 * Add focus to content
	 * @private
	 * @param  {node}   content  The content to bring into focus
	 * @param  {object} settings Options
	 */
	var adjustFocus = function ( content, settings ) {

		if ( content.hasAttribute( 'data-houdini-no-focus' ) ) return;

		// If content is closed, remove tabindex
		if ( !content.classList.contains( settings.contentActiveClass ) ) {
			if ( content.hasAttribute( 'data-houdini-focused' ) ) {
				content.removeAttribute( 'tabindex' );
			}
			return;
		}

		// Get current position on the page
		var position = {
			x: root.pageXOffset,
			y: root.pageYOffset
		};

		// Set focus and reset position to account for page jump on focus
		content.focus();
		if ( document.activeElement.id !== content.id ) {
			content.setAttribute( 'tabindex', '-1' );
			content.setAttribute( 'data-houdini-focused', true );
			content.focus();
		}
		root.scrollTo( position.x, position.y );

	};

	/**
	 * Open collapsed content
	 * @public
	 * @param  {String} contentID The ID of the content area to close
	 * @param  {Element} toggle The element that toggled the close action
	 * @param  {Object} options
	 */
	houdini.closeContent = function ( contentID, toggle, options ) {

		// Variables
		var localSettings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var content = document.querySelector( escapeCharacters( contentID ) ); // Get content area

		// Sanity check
		if ( !content ) return;

		// Toggle the content
		stopVideos( content, localSettings ); // If content area is closed, stop playing any videos
		if ( toggle ) {
			toggle.classList.remove( localSettings.toggleActiveClass );// Change text on collapse toggle
		}
		content.classList.remove( localSettings.contentActiveClass ); // Collapse or expand content area
		adjustFocus( content, localSettings );

		// Run callbacks after toggling content
		localSettings.callbackClose( content, toggle );

	};

	/**
	 * Open collapsed content
	 * @public
	 * @param  {String} contentID The ID of the content area to open
	 * @param  {Element} toggle The element that toggled the open action
	 * @param  {Object} options
	 */
	houdini.openContent = function ( contentID, toggle, options ) {

		// Variables
		var localSettings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var content = document.querySelector( escapeCharacters( contentID ) ); // Get content area
		var group = toggle && toggle.hasAttribute( 'data-group') ? document.querySelectorAll('[data-group="' + toggle.getAttribute( 'data-group') + '"]') : [];

		// Sanity check
		if ( !content ) return;

		// If a group, close all other content areas
		forEach(group, (function (item) {
			houdini.closeContent( item.hash, item );
		}));

		// Open the content
		if ( toggle ) {
			toggle.classList.add( localSettings.toggleActiveClass ); // Change text on collapse toggle
		}
		content.classList.add( localSettings.contentActiveClass ); // Collapse or expand content area
		adjustFocus( content, localSettings );
		content.removeAttribute( 'data-houdini-no-focus' );

		// Run callbacks after toggling content
		localSettings.callbackOpen( content, toggle );

	};

	/**
	 * Handle has change event
	 * @private
	 */
	var hashChangeHandler = function (event) {

		// Get hash from URL
		var hash = root.location.hash;

		// If clicked collapse is cached, reset it's ID
		if ( collapse ) {
			collapse.id = collapse.getAttribute( 'data-collapse-id' );
			collapse = null;
		}

		// If there's a URL hash, open the content with matching ID
		if ( !hash ) return;
		var toggle = document.querySelector( settings.selectorToggle + '[href*="' + hash + '"]' );
		houdini.openContent( hash, toggle );

	};

	/**
	 * Handle toggle click events
	 * @private
	 */
	var clickHandler = function (event) {

		// Don't run if right-click or command/control + click
		if ( event.button !== 0 || event.metaKey || event.ctrlKey ) return;

		// Check if a toggle was clicked
		var toggle = getClosest( event.target, settings.selectorToggle );
		if ( !toggle || !toggle.hash ) return;

		// If the tab is already open, close it
		if ( toggle.classList.contains( settings.toggleActiveClass ) ) {
			event.preventDefault();
			houdini.closeContent( toggle.hash, toggle );
			return;
		}

		// Get the collapse content
		collapse = document.querySelector( toggle.hash );

		// If tab content exists, save the ID as a data attribute and remove it (prevents scroll jump)
		if ( !collapse ) return;
		collapse.setAttribute( 'data-collapse-id', collapse.id );
		collapse.id = '';

		// If no hash change event will happen, fire manually
		if ( toggle.hash === root.location.hash ) {
			event.preventDefault();
			hashChangeHandler();
		}

	};

	/**
	 * Handle content focus events
	 * @private
	 */
	var focusHandler = function (event) {

		// Variables
		collapse = getClosest( event.target, settings.selectorContent );

		// Only run if content exists and isn't open already
		if ( !collapse || collapse.classList.contains( settings.contentActiveClass ) ) return;

		// Save the ID as a data attribute and remove it (prevents scroll jump)
		var hash = collapse.id;
		collapse.setAttribute( 'data-collapse-id', hash );
		collapse.setAttribute( 'data-houdini-no-focus', true );
		collapse.id = '';

		// If no hash change event will happen, fire manually
		if ( hash === root.location.hash.substring(1) ) {
			hashChangeHandler();
			return;
		}

		// Otherwise, update the hash
		root.location.hash = hash;

	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	houdini.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		document.removeEventListener('click', clickHandler, false);
		document.removeEventListener('focus', focusHandler, true);
		root.removeEventListener('hashchange', hashChangeHandler, false);
		settings = null;
		collapse = null;
	};

	/**
	 * Initialize Houdini
	 * @public
	 * @param {Object} options User settings
	 */
	houdini.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		houdini.destroy();

		// Merge user options with defaults
		settings = extend( defaults, options || {} );

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Listen for all click events
		document.addEventListener('click', clickHandler, false);
		document.addEventListener('focus', focusHandler, true);
		root.addEventListener('hashchange', hashChangeHandler, false);

		// If URL has a hash, activate hashed content by default
		hashChangeHandler();

	};


	//
	// Public APIs
	//

	return houdini;

}));