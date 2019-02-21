/*!
 * houdinijs v11.0.0
 * A simple collapse-and-expand script
 * (c) 2019 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/houdini
 */

/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.closest) {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}
	Element.prototype.closest = function (s) {
		var el = this;
		var ancestor = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (ancestor.matches(s)) return ancestor;
			ancestor = ancestor.parentElement;
		} while (ancestor !== null);
		return null;
	};
}
/**
 * CustomEvent() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */
(function () {

	if (typeof window.CustomEvent === "function") return false;

	function CustomEvent(event, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
})();
/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
/**
 * requestAnimationFrame() polyfill
 * By Erik Möller. Fixes from Paul Irish and Tino Zijdel.
 * @link http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @link http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * @license MIT
 */
(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
		                              window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout((function() { callback(currTime + timeToCall); }),
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
}());

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], (function () {
			return factory(root);
		}));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.Houdini = factory(root);
	}
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (function (window) {

	'use strict';

	//
	// Variables
	//

	var defaults = {

		// Content
		contentClass: 'houdini',
		expanded: false,
		expandedClass: 'is-expanded',

		// Toggle Buttons
		btnAfter: false,
		btnClass: 'houdini-toggle',
		btnAttribute: 'data-houdini-toggle',
		btnTextAttribute: 'data-houdini-button',
		btnLabelAttribute: 'data-houdini-label',
		btnPreExisting: 'data-houdini-button-preexisting',

		// Accordion
		isAccordion: false,
		collapseOthers: false,
		headingClass: 'houdini-heading',

		// Icons
		icon: -1,
		iconClass: 'houdini-toggle-icon',
		iconAttribute: 'data-houdini-icon',
		iconShow: '+',
		iconHide: '&ndash;',

		// Custom Events
		emitEvents: true

	};


	//
	// Methods
	//

	/**
	 * Merge two or more objects together.
	 * @param   {Object}   objects  The objects to merge together
	 * @returns {Object}            Merged values of defaults and options
	 */
	var extend = function () {
		var merged = {};
		Array.prototype.forEach.call(arguments, (function (obj) {
			for (var key in obj) {
				if (!obj.hasOwnProperty(key)) return;
				merged[key] = obj[key];
			}
		}));
		return merged;
	};

	/**
	 * Emit a custom event
	 * @param  {String} type     The event type
	 * @param  {Object} settings The settings object
	 * @param  {Node}   content  The content element
	 * @param  {Node}   btn      The toggle button element
	 */
	var emitEvent = function (type, settings, details) {
		if (!settings.emitEvents || typeof window.CustomEvent !== 'function') return;
		var event = new CustomEvent(type, {
			bubbles: true,
			detail: details
		});
		if (details.content) {
			details.content.dispatchEvent(event);
		} else {
			document.dispatchEvent(event);
		}
	};

	/**
	 * Add button to accordion headings
	 * @param  {Node}   elem     The accordion content
	 * @param  {Object} settings The settings object
	 */
	var wrapInBtn = function (elem, settings) {

		// Variables
		var heading = document.querySelector('[' + settings.btnAttribute + '="' + elem.id + '"]');
		if (!heading) return;
		var isExpanded = elem.classList.contains(settings.expandedClass);

		// Update heading attributes
		heading.classList.add(settings.headingClass);
		heading.removeAttribute(settings.btnAttribute);

		// Create the icon
		var icon = '';
		if (settings.icon) {
			icon =
				'<span' +
					' class="' + settings.iconClass + '"' +
					' ' + settings.iconAttribute +
				'>' +
					(isExpanded ? settings.iconHide : settings.iconShow) +
				'</span>';
		}

		// Wrap heading in a button
		heading.innerHTML =
			'<button' +
				' class="' + settings.btnClass + '"' +
				' ' + settings.btnAttribute + '="' + elem.id + '"' +
				' aria-expanded="' + (isExpanded ? true : false) + '"' +
			'>' +
				heading.innerHTML +
				icon +
			'</button>';

		return heading;

	};

	/**
	 * Get a preexisting button for the content
	 * @param  {Node}   elem     The disclosure content
	 * @param  {Object} settings The settings object
	 * @return {Node}            The preexisting button
	 */
	var getExistingBtn = function (elem, settings) {
		var btn = document.querySelector('[' + settings.btnAttribute + '="' + elem.id + '"]');
		if (!btn) return;
		btn.removeAttribute('hidden');
		if (btn.tagName.toLowerCase() === 'a') {
			btn.setAttribute('role', 'button');
		}
		btn.setAttribute(settings.btnPreexisting, 'true');
		return btn;
	};

	/**
	 * Add a new toggle button to the DOM
	 * @param  {Node}   elem     The disclosure content
	 * @param  {Object} settings The settings object
	 */
	var addNewBtn = function (elem, settings) {

		// Variables
		var text = elem.getAttribute(settings.btnTextAttribute);
		var isExpanded = elem.classList.contains(settings.expandedClass);
		var label = elem.getAttribute(settings.btnLabelAttribute);

		// Create the button
		var existingBtn = getExistingBtn(elem, settings);
		var btn = existingBtn ? existingBtn : document.createElement('button');

		// Add button text
		if (!existingBtn) {
			// btn.textContent = text && text.length > 0 ? text : settings.btnText; // @todo
			if (!text || text.length < 1) return;
			btn.textContent = text;
		}

		// Add selectors and labels
		btn.setAttribute(settings.btnAttribute, elem.id);
		btn.className = settings.btnClass;

		// Add an icon
		var icon = '';
		if (settings.icon) {
			btn.innerHTML +=
				'<span' +
					' class="' + settings.iconClass + '"' +
					' ' + settings.iconAttribute +
				'>' +
					(isExpanded ? settings.iconHide : settings.iconShow) +
				'</span>';
		}

		// Add a11y attributes
		btn.setAttribute('aria-expanded', isExpanded);
		if (label) {
			btn.setAttribute('aria-label', label);
		}

		// Inject into the DOM
		if (!existingBtn) {
			elem.parentNode.insertBefore(btn, settings.btnAfter ? elem.nextSibling : elem);
		}

		return btn;

	};

	/**
	 * Create the disclosure button
	 * @param  {Node}   elem     The disclosure content
	 * @param  {Object} settings The settings object
	 */
	var createBtn = function (elem, settings) {
		if (settings.isAccordion) {
			return wrapInBtn(elem, settings);
		}
		return addNewBtn(elem, settings);
	};

	/**
	 * Remove button from accordion headings
	 * @param  {Node}   elem     The accordion content
	 * @param  {Object} settings The settings object
	 */
	var unwrapInBtn = function (elem, settings) {

		// Variables
		var btn = document.querySelector('[' + settings.btnAttribute + '="' + elem.id + '"]');
		if (!btn) return;

		// Update heading attributes
		heading.classList.remove(settings.headingClass);
		btn.parentNode.setAttribute(settings.btnAttribute, elem.id);

		// Unwrap heading in a button
		var heading = btn.cloneNode(true);
		var icon = heading.querySelector('[' + settings.iconAttribute + ']');
		if (icon) {
			heading.removeChild(icon);
		}
		btn.parentNode.innerHTML = heading.innerHTML;

	};

	/**
	 * Remove toggle button from the DOM
	 * @param  {Node}   elem     The disclosure content
 	 * @param  {Object} settings The settings object
	 */
	var removeNewBtn = function (elem, settings) {
		var btn = document.querySelector('[' + settings.btnAttribute + '="' + elem.id + '"]');
		if (!btn) return;
		if (btn.hasAttribute(settings.btnPreexisting)) {
			btn.setAttribute('hidden', 'hidden');
			return;
		}
		btn.parentNode.removeChild(btn);
	};

	/**
	 * Remove button elements
	 * @param  {Node}   elem     The disclosure content
	 * @param  {Object} settings The settings object
	 */
	var removeBtn = function (elem, settings) {
		if (settings.isAccordion) {
			unwrapInBtn(elem, settings);
		} else {
			removeNewBtn(elem, settings);
		}
	};

	/**
	 * Collapse a toggle button
	 * @param  {Node} btn        The button
	 * @param  {Object} settings The settings object
	 */
	var collapseBtn = function (btn, settings) {

		// Update a11y attributes
		btn.setAttribute('aria-expanded', 'false');
		btn.removeAttribute('aria-controls');

		// Toggle icons
		var icon = btn.querySelector('[' + settings.iconAttribute + ']');
		if (icon) {
			icon.innerHTML = settings.iconShow;
		}

	};

	/**
	 * Collapse disclosure content
	 * @param  {Node}   btn      The toggle button
	 * @param  {Node}   target   The disclosure content
	 * @param  {Object} settings The settings object
	 */
	var collapseContent = function (btn, target, settings) {

		// Update button text
		collapseBtn(btn, settings);

		// Collapse content
		target.classList.remove(settings.expandedClass);

		// Emit event
		emitEvent('houdiniCollapse', settings, {
			button: btn,
			content: target
		});

	};

	/**
	 * Collapse open accordion content in a group
	 * @param  {Node}   btn      The toggle button
	 * @param  {Node}   target   The disclosure content
	 * @param  {String} selector The selector for this instantiation
	 * @param  {Object} settings The settings object
	 */
	var collapseOthers = function (btn, target, selector, settings) {

		// Only run for accordions where others should be collapsed
		if (!settings.isAccordion || !settings.collapseOthers) return;

		// Close open content areas
		Array.prototype.forEach.call(document.querySelectorAll(selector + '.' + settings.expandedClass), (function (content) {
			var btn = document.querySelector('[' + settings.btnAttribute + '="' + content.id + '"]');
			collapseContent(btn, content, settings);
		}));

	};

	/**
	 * Expand a toggle button
	 * @param  {Node} btn        The button
	 * @param  {Object} settings The settings object
	 */
	var expandBtn = function (btn, target, settings) {

		// Update a11y attributes
		btn.setAttribute('aria-expanded', true);
		btn.setAttribute('aria-controls', target.id);

		// Toggle icons
		var icon = btn.querySelector('[' + settings.iconAttribute + ']');
		if (icon) {
			icon.innerHTML = settings.iconHide;
		}

	};

	/**
	 * Expand disclosure content
	 * @param  {Node}   btn      The button
	 * @param  {Node}   target   The disclosure content
	 * @param  {Object} settings The settings object
	 */
	var expandContent = function (btn, target, settings) {

		// Update button text
		expandBtn(btn, target, settings);

		// Expand content
		target.classList.add(settings.expandedClass);

		// Update focus
		if (settings.btnAfter && !settings.isAccordion) {
			target.focus();
		}

		// Emit event
		emitEvent('houdiniExpand', settings, {
			button: btn,
			content: target
		});

	};

	/**
	 * Toggle disclosure content visibility
	 * @param  {Node}   btn      The button
	 * @param  {Node}   target   The disclosure content
	 * @param  {String} selector The selector for this instantiation
	 * @param  {Object} settings The settings object
	 * @return {[type]}          [description]
	 */
	var toggleContent = function (btn, selector, settings, event) {

		// Variables
		var isExpanded = btn.getAttribute('aria-expanded');
		var target = document.querySelector('#' + btn.getAttribute(settings.btnAttribute));
		if (!target || !target.matches(selector)) return;

		// Prevent default click event
		// For links or buttons inside a form
		if (event) {
			event.preventDefault();
		}

		// Toggle content visibility
		// Must explicitly specify true here and use type coercion because value returned is a string
		if (isExpanded == 'true') {
			collapseContent(btn, target, settings);
		} else {
			collapseOthers(btn, target, selector, settings);
			expandContent(btn, target, settings);
		}

	};

	/**
	 * Get the content element from the DOM
	 * @param  {String|Node} target The selector
	 * @param  {String}      att    The data attribute for toggle buttons
	 * @return {Node}               The content element
	 */
	var getContent = function (target, att) {

		var content;

		// If selector string instead of element
		if (typeof target === 'string') {
			content = document.querySelector(target);
		}

		// If button instead of content
		if (content && content.matches('[' + att + ']')) {
			content = document.querySelector('#' + content.getAttribute(att));
		}

		return content;

	};

	/**
	 * Get the button element from the DOM
	 * @param  {String|Node} target   The element or selector string
	 * @param  {String}      selector The selector for this instantiation
	 * @return {Node}                 The button element
	 */
	var getBtn = function (target, selector, settings) {

		var btn;

		// If selector string instead of element
		if (typeof target === 'string') {
			btn = document.querySelector(target);
		}

		// If content area instead of button
		if (btn && btn.matches(selector)) {
			btn = document.querySelector('[' + settings.btnAttribute + '="' + btn.id + '"]');
		}

		return btn;

	};

	/**
	 * Restore the DOM to its original state
	 * @param  {String} selector The selector for this instantiation
	 * @param  {Object} settings The settings object
	 */
	var teardown = function (selector, settings) {
		Array.prototype.forEach.call(document.querySelectorAll(selector), (function (content) {

			// Remove the toggle button
			removeBtn(content, settings);

			// Add the content class
			content.classList.remove(settings.contentClass);

			// Restore default expanded state
			if (settings.expandedOnInit.indexOf(content.id) < 0) {
				content.classList.remove(settings.expandedClass);
			} else {
				content.classList.add(settings.expandedClass);
			}

		}));
	};


	//
	// Constructor
	//

	var Constructor = function (selector, options) {

		//
		// Variables
		//

		var publicAPIs = {};
		var settings;


		//
		// Methods
		//

		/**
		 * Toggle a disclosure
		 * @param  {String|Node} target The content or button to toggle
		 */
		publicAPIs.toggle = function (target) {
			toggleContent(getBtn(target, selector, settings), selector, settings);
		};

		/**
		 * Expand a disclosure
		 * @param  {String|Node} target The content or button to toggle
		 */
		publicAPIs.expand = function (target) {
			expandContent(getBtn(target, selector, settings), getContent(target, settings.btnAttribute), settings);
		};

		/**
		 * Collapse a disclosure
		 * @param  {String|Node} target The content or button to toggle
		 */
		publicAPIs.collapse = function (target) {
			var btn = getBtn(target, selector, settings);
			var content = getContent(target, settings.btnAttribute);
			collapseOthers(btn, content, selector, settings);
			collapseContent(btn, content, settings);
		};

		/**
		 * Add required markup to the DOM
		 */
		publicAPIs.setup = function () {

			// Add markup
			Array.prototype.forEach.call(document.querySelectorAll(selector), (function (content) {

				// If already setup, bail
				if (content.classList.contains(settings.contentClass)) return;

				// Create the toggle button
				if (!createBtn(content, settings)) return;

				// Add the content class
				content.classList.add(settings.contentClass);

				// Cache items that are expanded by default
				if (content.classList.contains(settings.expandedClass)) {
					settings.expandedOnInit.push(content.id);
				}

				// If the button appears after the content, give it a tabindex so it can be focused
				if (settings.btnAfter && !content.getAttribute('tabindex')) {
					content.setAttribute('tabindex', -1);
				}

				// If item should be expanded by default, expand it
				if (settings.expanded) {
					content.classList.add(settings.expandedClass);
				}

			}));

			// Emit event
			emitEvent('houdiniSetup', settings, {
				settings: settings
			});

		};

		/**
		 * Handle click events
		 */
		var clickHandler = function (event) {

			// Only run if clicked element matches our selector
			var toggle = event.target.closest('[' + settings.btnAttribute + ']');
			if (!toggle) return;

			// Show/hide content
			toggleContent(toggle, selector, settings, event);

		};

		/**
		 * Destroy the current instatiation
		 */
		publicAPIs.destroy = function () {
			document.removeEventListener('click', clickHandler, false);
			teardown(selector, settings);
			emitEvent('houdiniDestroy', settings, {
				settings: settings
			});
			settings = null;
		};

		/**
		 * Initialize the plugin
		 */
		var init = function () {

			// Merge user options into defaults
			settings = extend(defaults, options || {});
			settings.expandedOnInit = [];
			if (settings.icon < 0) {
				settings.icon = settings.isAccordion;
			}

			// Setup the DOM
			publicAPIs.setup();

			// Add event listener
			document.addEventListener('click', clickHandler, false);

			// Emit event
			emitEvent('houdiniInitialize', settings, {
				settings: settings
			});

		};

		// Initialize the plugin
		init(options);

		// Return the public APIs
		return publicAPIs;

	};


	//
	// Return the constructor
	//

	return Constructor;

}));