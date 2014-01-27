/* =============================================================

	Houdini v4.0
	A simple collapse and expand widget by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

;window.houdini = (function (window, document, undefined) {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// SELECTORS

		// Collapse toggle
		var collapseToggle = document.querySelectorAll('[data-collapse]');


		// METHODS

		// Toggle collapse/expand widget
		var toggleCollapse = function (toggle) {

			// Define the content container
			var dataID = toggle.getAttribute('data-target');
			var dataTarget = document.querySelector(dataID);

			// Toggle the '.active' class on the toggle and container elements
			buoy.toggleClass(toggle, 'active');
			buoy.toggleClass(dataTarget, 'active');

		};


		// EVENTS, LISTENERS, AND INITS

		// Whenever a toggle is clicked, run the expand/collapse function
		[].forEach.call(collapseToggle, function (toggle) {
			toggle.addEventListener('click', function(e) {
				e.preventDefault();
				toggleCollapse(toggle);
			}, false);
		});

	}

})(window, document);