# Houdini
A simple collapse-and-expand script. [View the Demo](http://cferdinandi.github.io/houdini/).

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Options & Settings](#options-and-settings)
3. [Browser Compatability](#browser-compatibility)
4. [License](#license)
5. [Changelog](#changelog)
6. [Older Docs](#older-docs)



## Getting Started

### 1. Include Houdini on your site.

```Markup
<link rel="stylesheet" href="css/houdini-css.css">
<script src="js/houdini.js"></script>
<script src="buoy.js"></script>
```

Houdini is [built with Sass](http://sass-lang.com/) for easy customization. If you don't use Sass, that's ok. The `css` folder contains compiled vanilla CSS.

The `_config.scss` and `_mixins.scss` files are the same ones used in [Kraken](http://cferdinandi.github.io/kraken/), so you can drop the `_houdini.css` file right into Kraken without making any updates. Or, adjust the variables to suit your own project.

Houdini also requires [Buoy](http://cferdinandi.github.io/buoy/), a vanilla JS micro-library that contains simple helper functions used by Houdini.

### 2. Add the markup to your HTML.

	<div class="collapse" id="show-me">
		<p>Now you see me, now you don't.</p>
	</div>

	<a class="collapse-toggle" data-collapse="#show-me" href="#">
		<span class="collapse-text-show">Show +</span>
		<span class="collapse-text-hide">Hide -</span>
	</a>

If you'd prefer to show content by default, include the `.active` class along with the `.collapse` and `.collapse-toggle` classes.

	<button class="collapse-toggle active" data-collapse data-target="#hide-me">
		<span class="collapse-text-show">Show</span>
		<span class="collapse-text-hide">Hide</span>
	</button>

	<div class="collapse active" id="hide-me">
		<p>Hide me!</p>
	</div>

### 3. Initialize Houdini.

	<script>
		houdini.init();
	</script>

In the footer of your page, after the content, initialize Houdini. And that's it, you're done. Nice work!



## Options and Settings

Houdini includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into Houdini through the `init()` function:

	houdini.init({
		toggleActiveClass: 'active', // Class added to active toggle elements
		contentActiveClass: 'active', // Class added to active content elements
		initClass: 'js-houdini', // Class added to `<html>` element when initiated
		callbackBefore: function () {}, // Function that's run before content is expanded or collapsed
		callbackAfter: function () {} // Function that's run after content is expanded or collapsed
	});

### Use Houdini events in your own scripts

You can also call the Houdini toggle event in your own scripts:

	houdini.toggleContent(
		toggle, // Node that toggles the expand and collapse action. ex. document.querySelector('#toggle')
		contentID, // The ID of the content area to expand or collapse. ex. '#content'
		options, // Classes and callbacks. Same options as those passed into the init() function.
		event // Optional, if a DOM event was triggered.
	);



## License
Houdini is licensed under the [MIT License](http://gomakethings.com/mit/).



## Browser Compatibility

Houdini works in all modern browsers, and IE 9 and above.

Houdini is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, all content will be displayed by default. If you need to support older browsers, you can still download the [jQuery version of Houdini on GitHub](https://github.com/cferdinandi/houdini/tree/archive-v2).



## Changelog
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

* [Version 4](http://cferdinandi.github.io/houdini/archive/v4/)
* [Version 2](https://github.com/cferdinandi/houdini/tree/archive-v2)