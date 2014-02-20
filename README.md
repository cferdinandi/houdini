# Houdini
Houdini is a lightweight and progressively enhanced expand-and-collapse widget.

## How It Works
Getting started with Houdini is really easy. [View the online tutorial](http://cferdinandi.github.com/houdini/) or dig through the `index.html` file.

## Changelog
* v5.0 (February 20, 2014)
  * Better public/private method namespacing.
  * Require `init()` call to run.
  * Better documentation (noting what's returned on functions).
* v4.3 (February 19, 2014)
  * Added method to stop playing videos (YouTube, Vimeo, HTML5) when collapse content is closed.
* v4.2 (February 4, 2014)
  * Reverted to `Array.prototype.forEach` loops.
* v4.1 (January 27, 2014)
  * Updated `addEventListener` to be more object oriented.
  * Moved feature test to script itself.
* v4.0 (January 27, 2014)
  * Switched to a data attribute for the toggle selector (separates scripts from styles).
  * Prefixed script with a `;` to prevent errors if other scripts are incorrectly closed.
  * Added namespacing to IIFE.
* v3.5 (December 2, 2013)
  * Added Sass support
* v3.4 (August 27, 2013)
  * Added missing semicolon.
  * Activated strict mode.
* v3.3 (August 26,2013)
  * Converted to IIFE pattern.
  * Added Buoy vanilla JS micro-library.
* v3.2 (August 14, 2013)
  * Added toggleCollapse function for better performance.
* v3.1 (August 12, 2013)
  * IE Bugfix.
* v3.0 (August 11, 2013)
  * Converted to vanilla JS.
  * Removed jQuery dependency.
* v2.2 (August 5, 2013)
  * Added variable for `$(this)` (better for performance).
* v2.1 (June 24,2013)
  * Added alternating "show/hide" text to toggle buttons.
* v2.0 (June 7, 2013)
  * Switched to MIT license.
* v2.0 (June 3, 2013)
  * Removed `href` as element selector. Just `data-target` supported now.
* v1.2 (February 13, 2013)
  * Renamed `example.html` to `index.html`.
  * Removed "Convert to Vanilla JS" from the roadmap.
* v1.1 (February 5, 2013)
  * Switched to relative sizing.
* v1.0 (January 24, 2013)
  * Initial release.

## License
Houdini is free to use under the [MIT License](http://gomakethings.com/mit/).
