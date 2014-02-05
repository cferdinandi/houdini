/* =============================================================

	Houdini v4.2
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

		// Toggle the collapse/expand widget
		var toggleCollapse = function (event) {

			// Define the content container
			var dataID = this.getAttribute('data-target');
			var dataTarget = document.querySelector(dataID);

			// Prevent default link behavior, and toggle the '.active' class on the toggle and container elements
			event.preventDefault();
			buoy.toggleClass(this, 'active');
			buoy.toggleClass(dataTarget, 'active');

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