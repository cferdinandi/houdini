/* =============================================================

	Houdini v3.4
	A simple collapse and expand widget by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

(function() {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// Function to toggle collapse/expand widget
		var toggleCollapse = function (toggle) {

			// Define the content container
			var dataID = toggle.getAttribute('data-target');
			var dataTarget = document.querySelector(dataID);

			// Toggle the '.active' class on the toggle and container elements
			buoy.toggleClass(toggle, 'active');
			buoy.toggleClass(dataTarget, 'active');

		};

		// Define collapse toggle
		var collapseToggle = document.querySelectorAll('.collapse-toggle');

		// For each collapse toggle
		[].forEach.call(collapseToggle, function (toggle) {

			// When the toggle is clicked
			toggle.addEventListener('click', function(e) {

				// Prevent default link behavior
				e.preventDefault();

				// Toggle the collapse/expand widget
				toggleCollapse(toggle);

			}, false);

		});

	}

})();
