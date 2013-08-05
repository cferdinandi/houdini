/* =============================================================

    Houdini v2.2
    A simple collapse and expand widget by Chris Ferdinandi.
    http://gomakethings.com

    Free to use under the MIT License.
    http://gomakethings.com/mit/
    
 * ============================================================= */

(function($) {
    $(function () {
        $('.collapse-toggle').click(function(e) { // When a link or button with the .collapse-toggle class is clicked
            e.preventDefault(); // Prevent the default action from occurring
            var toggle = $(this);
            var dataID = toggle.attr('data-target'); // Get the ID of the target element
            toggle.toggleClass('active'); // Add or remove the '.active' class from the toggle element
            $(dataID).toggleClass('active'); // Add or remove the '.active' class from the target element
        });
    });
})(jQuery);





/* =============================================================

    Progressively Enhanced JS v1.0
    Adds .js class to <body> for progressive enhancement.

    Script by Chris Ferdinandi.
    http://gomakethings.com

    Free to use under the MIT License.
    http://gomakethings.com/mit/
    
 * ============================================================= */

(function($) {
    $(function () {
        $('body').addClass('js'); // On page load, add the .js class to the <body> element.
    });
})(jQuery);
