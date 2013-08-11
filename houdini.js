/* =============================================================

    Houdini v3.0
    A simple collapse and expand widget by Chris Ferdinandi.
    http://gomakethings.com

    Free to use under the MIT License.
    http://gomakethings.com/mit/
    
 * ============================================================= */


/* =============================================================
    MICRO-FRAMEWORK
    Simple vanilla JavaScript functions to handle common tasks.
 * ============================================================= */

// Check if an element has a class
var hasClass = function (elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
 
// Add a class to an element
var addClass = function (elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}
 
// Remove a class from an element
var removeClass = function (elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
 
// Toggle a class on an element
var toggleClass = function (elem, className) {
    if ( hasClass(elem, className) ) {
        removeClass(elem, className);
    }
    else {
        addClass(elem, className);
    }
}


/* =============================================================
    HOUDINI FUNCTIONS
    Show/hide content.
 * ============================================================= */

// Feature Test
if ( 'querySelector' in document && 'addEventListener' in window ) {

    // Define collapse toggle
    var collapseToggle = document.querySelectorAll('.collapse-toggle');

    // For each collapse toggle
    [].forEach.call(collapseToggle, function (toggle) {

        // When the toggle is clicked
        toggle.addEventListener('click', function(e) {

            // Prevent default link behavior
            e.preventDefault();

            // Define the content container
            var dataID = this.dataset.target;
            var dataTarget = document.querySelector(dataID);

            // Toggle the '.active' class on the toggle and container elements
            toggleClass(this, 'active');
            toggleClass(dataTarget, 'active');
         
        }, false);

    });

}
