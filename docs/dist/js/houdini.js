/*!
 * houdinijs v9.4.2: A simple collapse-and-expand script
 * (c) 2018 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/houdini
 */

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
		btnShow: 'Show More',
		btnHide: 'Show Less',

		// Accordion
		isAccordion: false,
		collapseOthers: false,
		headingClass: 'houdini-heading',
		icon: true,
		iconClass: 'houdini-toggle-icon',
		iconAttribute: 'data-houdini-icon',
		iconShow: '+',
		iconHide: '&ndash;',

		// Custom Events
		emitEvents: true // Emit custom events

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
			content.dispatchEvent(event);
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
				' aria-controls="' + elem.id + '"' +
			'>' +
				heading.innerHTML +
				icon +
			'</button>';

	};

	/**
	 * Add a new toggle button to the DOM
	 * @param  {Node}   elem     The disclosure content
	 * @param  {Object} settings The settings object
	 */
	var addNewBtn = function (elem, settings) {

		// Create the button
		var btn = document.createElement('button');

		// Add selectors and labels
		btn.setAttribute(settings.btnAttribute, elem.id);
		btn.className = settings.btnClass;
		btn.textContent = settings.expanded ? settings.btnHide : settings.btnShow;

		// Add a11y attributes
		btn.setAttribute('aria-expanded', elem.classList.contains(settings.expandedClass));
		btn.setAttribute('aria-controls', elem.id);

		// Inject into the DOM
		elem.parentNode.insertBefore(btn, settings.btnAfter ? elem.nextSibling : elem);

	};

	/**
	 * Create the disclosure button
	 * @param  {Node}   elem     The disclosure content
	 * @param  {Object} settings The settings object
	 */
	var createBtn = function (elem, settings) {
		if (settings.isAccordion) {
			wrapInBtn(elem, settings);
		} else {
			addNewBtn(elem, settings);
		}
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

		// Accordion icons
		if (settings.isAccordion) {
			var icon = btn.querySelector('[' + settings.iconAttribute + ']');
			if (icon) {
				icon.innerHTML = settings.iconShow;
			}
		}

		// Simple disclosures
		else {
			btn.textContent = settings.btnShow;
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
			var btn = document.querySelector('[aria-controls="' + content.id + '"]');
			collapseContent(btn, content, settings);
		}));

	};

	/**
	 * Expand a toggle button
	 * @param  {Node} btn        The button
	 * @param  {Object} settings The settings object
	 */
	var expandBtn = function (btn, settings) {

		// Accordion icons
		if (settings.isAccordion) {
			var icon = btn.querySelector('[' + settings.iconAttribute + ']');
			if (icon) {
				icon.innerHTML = settings.iconHide;
			}
		}

		// Simple disclosures
		else {
			btn.textContent = settings.btnHide;
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
		expandBtn(btn, settings);

		// Update a11y attributes
		btn.setAttribute('aria-expanded', true);

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
	var toggleContent = function (btn, selector, settings) {

		// Variables
		var isExpanded = btn.getAttribute('aria-expanded');
		var target = document.querySelector('#' + btn.getAttribute('aria-controls'));
		if (!target || !target.matches(selector)) return;

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
	var getBtn = function (target, selector) {

		var btn;

		// If selector string instead of element
		if (typeof target === 'string') {
			btn = document.querySelector(target);
		}

		// If content area instead of button
		if (btn && btn.matches(selector)) {
			btn = document.querySelector('[aria-controls="' + btn.id + '"]');
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
			toggleContent(getBtn(target, selector), selector, settings);
		};

		/**
		 * Expand a disclosure
		 * @param  {String|Node} target The content or button to toggle
		 */
		publicAPIs.expand = function (target) {
			expandContent(getBtn(target, selector), getContent(target, settings.btnAttribute), settings);
		};

		/**
		 * Collapse a disclosure
		 * @param  {String|Node} target The content or button to toggle
		 */
		publicAPIs.collapse = function (target) {
			var btn = getBtn(target, selector);
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

				// Create the toggle button
				createBtn(content, settings);

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
			if (!event.target.matches('[' + settings.btnAttribute + ']')) return;

			// Show/hide content
			toggleContent(event.target, selector, settings);

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
			settings = extend (defaults, options || {});
			settings.expandedOnInit = [];

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