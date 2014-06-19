# Houdini [![Build Status](https://travis-ci.org/cferdinandi/houdini.svg)](https://travis-ci.org/cferdinandi/houdini)
A simple collapse-and-expand script.

[Download Houdini 6](https://github.com/cferdinandi/houdini/archive/master.zip) / [View the Demo](http://cferdinandi.github.io/houdini/).

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Installing with Package Managers](#installing-with-package-managers)
3. [Options & Settings](#options-and-settings)
4. [Browser Compatibility](#browser-compatibility)
5. [How to Contribute](#how-to-contribute)
6. [License](#license)
7. [Changelog](#changelog)
8. [Older Docs](#older-docs)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Unit tests are located in the `test` directory.

1. Include Houdini on your site.

	```html
	<link rel="stylesheet" href="dist/css/houdini.css">
	<script src="dist/js/classList.js"></script>
	<script src="dist/js/houdini.js"></script>
	```

	Houdini is [built with Sass](http://sass-lang.com/) for easy customization. If you don't use Sass, that's ok. The `css` folder contains compiled vanilla CSS.

	The `_config.scss` file the same one used in [Kraken](http://cferdinandi.github.io/kraken/), so you can drop the `_houdini.css` file right into Kraken without making any updates. Or, adjust the variables to suit your own project.

	Houdini also requires [classList.js](https://github.com/eligrey/classList.js), a polyfill that extends `classList` support back to IE8.

2. Add the markup to your HTML.

	```html
	<a class="collapse-toggle" data-collapse="#show-me" href="#">
		<span class="collapse-text-show">Show +</span>
		<span class="collapse-text-hide">Hide -</span>
	</a>
	<div class="collapse" id="show-me">
		<p>Now you see me, now you don't.</p>
	</div>
	```

	**Expanded by Default**

	If you'd prefer to show content by default, include the `.active` class along with the `.collapse` and `.collapse-toggle` classes.

	```html
	<button class="collapse-toggle active" data-collapse="#hide-me">
		<span class="collapse-text-show">Show</span>
		<span class="collapse-text-hide">Hide</span>
	</button>

	<div class="collapse active" id="hide-me">
		<p>Hide me!</p>
	</div>
	```

	**[NEW] Accordions**

	Houdini now supports expand and collapse accordion groups. Add a `data-group` data attribute to every toggle in the accordion, and make sure they all have the same name. Houdini will sort out the rest.

	```html
	<a class="collapse-toggle active" data-collapse="#section1" data-group="accordion" href="#">
		Section 1
		<span class="collapse-text-show">+</span>
		<span class="collapse-text-hide">-</span>
	</a>
	<div class="collapse active" id="section1">
		<h3>Section 1</h3>
		<p>The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs.</p>
	</div>
	<a class="collapse-toggle" data-collapse="#section2" data-group="accordion" href="#">
		Section 2
		<span class="collapse-text-show">+</span>
		<span class="collapse-text-hide">-</span>
	</a>
	<div class="collapse" id="section2">
		<h3>Section 2</h3>
		<p>Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz.</p>
	</div>
	<a class="collapse-toggle" data-collapse="#section3" data-group="accordion" href="#">
		Section 3
		<span class="collapse-text-show">+</span>
		<span class="collapse-text-hide">-</span>
	</a>
	<div class="collapse" id="section3">
		<h3>Section 3</h3>
		<p>Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls.</p>
	</div>
	```

3. Initialize Houdini.

	```html
	<script>
		houdini.init();
	</script>
	```

	In the footer of your page, after the content, initialize Houdini. And that's it, you're done. Nice work!



## Installing with Package Managers

You can install Houdini with your favorite package manager.

* **NPM:** `npm install cferdinandi/houdini`
* **Bower:** `bower install https://github.com/cferdinandi/houdini.git`
* **Component:** `component install cferdinandi/houdini`



## Options and Settings

Houdini includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into Houdini through the `init()` function:

```javascript
houdini.init({
	toggleActiveClass: 'active', // Class added to active toggle elements
	contentActiveClass: 'active', // Class added to active content elements
	initClass: 'js-houdini', // Class added to `<html>` element when initiated
	callbackBefore: function ( toggle, contentID ) {}, // Function that's run before content is expanded or collapsed
	callbackAfter: function ( toggle, contentID ) {} // Function that's run after content is expanded or collapsed
});
```

### Use Houdini events in your own scripts

You can also call the Houdini toggle event in your own scripts:

```javascript
houdini.toggleContent(
	toggle, // Node that toggles the expand and collapse action. ex. document.querySelector('#toggle')
	contentID, // The ID of the content area to expand or collapse. ex. '#content'
	options, // Classes and callbacks. Same options as those passed into the init() function.
	event // Optional, if a DOM event was triggered.
);
```

**Example**

```javascript
var toggle = document.querySelector('[data-collapse="#show-me"]');
houdini.toggleContent( toggle, '#show-me' );
```



## Browser Compatibility

Houdini works in all modern browsers, and IE 9 and above.

Houdini is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, all content will be displayed by default. If you need to support older browsers, you can still download the [jQuery version of Houdini on GitHub](https://github.com/cferdinandi/houdini/tree/archive-v2).



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Don't forget to update the version number, the changelog (in the `readme.md` file), and when applicable, the documentation.



## License

Houdini is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog

* v6.2.1 - June 19, 2014
	* Converted to gulp.js workflow.
	* Added unit testing.
	* Updated naming conventions.
	* Removed unused `_mixins.scss` file.
	* Added minified versions of files.
* v6.1.1 - June 19, 2014
	* Fixed factory/root/UMD definition.
* v6.1.0 - June 7, 2014
	* Converted to UMD module.
	* Replaced `Buoy` with `classList.js` polyfill.
	* Moved public APIs to `exports` variable.
	* Improved feature test.
	* Replaced `Array.prototype.forEach` hack with proper `forEach` function.
	* Added a more well supported trim function.
	* General code optimizations for better minification and performance.
	* Updated to JSDoc documentation (sort of).
	* Updated to three number versioning system.
	* Added package manager installation info.
* v6.0 - April 3, 2014
	* Converted from Buoy class helpers to `classList` with polyfill.
* v5.3 - March 19, 2014
	* Passed arguments into callback functions.
* v5.2 - March 1, 2014
	* Added accordion support.
* v5.1 - February 27, 2014
	* Converted `defaults` to a literal object.
* v5.0 - February 24, 2014
	* Better public/private method namespacing.
	* Require `init()` call to run.
	* New API exposes additional methods for use in your own scripts.
	* Better documentation (noting what's returned on functions).
* v4.3 - February 19, 2014
	* Added method to stop playing videos (YouTube, Vimeo, HTML5) when collapse content is closed.
* v4.2 - February 4, 2014
	* Reverted to `Array.prototype.forEach` loops.
* v4.1 - January 27, 2014
	* Updated `addEventListener` to be more object oriented.
	* Moved feature test to script itself.
* v4.0 - January 27, 2014
	* Switched to a data attribute for the toggle selector (separates scripts from styles).
	* Prefixed script with a `;` to prevent errors if other scripts are incorrectly closed.
	* Added namespacing to IIFE.
* v3.5 - December 2, 2013
	* Added Sass support
* v3.4 - August 27, 2013
	* Added missing semicolon.
	* Activated strict mode.
* v3.3 - August 26,2013
	* Converted to IIFE pattern.
	* Added Buoy vanilla JS micro-library.
* v3.2 - August 14, 2013
	* Added toggleCollapse function for better performance.
* v3.1 - August 12, 2013
	* IE Bugfix.
* v3.0 - August 11, 2013
	* Converted to vanilla JS.
	* Removed jQuery dependency.
* v2.2 - August 5, 2013
	* Added variable for `$(this)` (better for performance).
* v2.1 - June 24,2013
	* Added alternating "show/hide" text to toggle buttons.
* v2.0 - June 7, 2013
	* Switched to MIT license.
* v2.0 - June 3, 2013
	* Removed `href` as element selector. Just `data-target` supported now.
* v1.2 - February 13, 2013
	* Renamed `example.html` to `index.html`.
	* Removed "Convert to Vanilla JS" from the roadmap.
* v1.1 - February 5, 2013
	* Switched to relative sizing.
* v1.0 - January 24, 2013
	* Initial release.



## Older Docs

* [Version 5](https://github.com/cferdinandi/houdini/tree/archive-v5)
* [Version 4](http://cferdinandi.github.io/houdini/archive/v4/)
* [Version 2](https://github.com/cferdinandi/houdini/tree/archive-v2)