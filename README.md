# Houdini [![Build Status](https://travis-ci.org/cferdinandi/houdini.svg)](https://travis-ci.org/cferdinandi/houdini)
A simple collapse-and-expand and accordion script.

Supports deep linking to a specific collapsed content via anchor links (ex. http://some-url.com#contentID). Browser back button can be used to navigate back through content.

[Download Houdini](https://github.com/cferdinandi/houdini/archive/master.zip) / [View the Demo](http://cferdinandi.github.io/houdini/)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include Houdini on your site.

```html
<link rel="stylesheet" href="dist/css/houdini.css">
<script src="dist/js/houdini.js"></script>
```

### 2. Add the markup to your HTML.

Add the `.collapse-toggle` class to your toggle element, and the `.collapse` class to your content. You also need to add the `[data-collapse]` attribute to your toggle element, and provide an `href` that matches the `id` of the content you want to expand-and-collapse.

```html
<a class="collapse-toggle" data-collapse href="#show-me">
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
<a class="collapse-toggle active" data-collapse href="#hide-me">
	<span class="collapse-text-show">Show +</span>
	<span class="collapse-text-hide">Hide -</span>
</a>
<div class="collapse active" id="hide-me">
	<p>Hide me!</p>
</div>
```

**Accordions**

Houdini also supports expand-and-collapse accordion groups. Add a `[data-group]` attribute to every toggle in the accordion, and make sure they all have the same value. Houdini will sort out the rest.

```html
<a class="collapse-toggle active" data-collapse data-group="accordion" href="#section1">
	Section 1
	<span class="collapse-text-show">+</span>
	<span class="collapse-text-hide">-</span>
</a>
<div class="collapse active" id="section1">
	<h3>Section 1</h3>
	<p>The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs.</p>
</div>
<a class="collapse-toggle" data-collapse data-group="accordion" href="#section2">
	Section 2
	<span class="collapse-text-show">+</span>
	<span class="collapse-text-hide">-</span>
</a>
<div class="collapse" id="section2">
	<h3>Section 2</h3>
	<p>Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz.</p>
</div>
<a class="collapse-toggle" data-collapse data-group="accordion" href="#section3">
	Section 3
	<span class="collapse-text-show">+</span>
	<span class="collapse-text-hide">-</span>
</a>
<div class="collapse" id="section3">
	<h3>Section 3</h3>
	<p>Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls.</p>
</div>
```

### 3. Initialize Houdini.

In the footer of your page, after the content, initialize Houdini. And that's it, you're done. Nice work!

```html
<script>
	houdini.init();
</script>
```



## Installing with Package Managers

You can install Houdini with your favorite package manager.

* **NPM:** `npm install cferdinandi/houdini`
* **Bower:** `bower install https://github.com/cferdinandi/houdini.git`
* **Component:** `component install cferdinandi/houdini`



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/).

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).



## Options and Settings

Houdini includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into Houdini through the `init()` function:

```javascript
houdini.init({
	selectorToggle: '[data-collapse]', // Collapse toggle selector
	selectorContent: '.collapse', // Collapse content selector
	toggleActiveClass: 'active', // Class added to active toggle elements
	contentActiveClass: 'active', // Class added to active content elements
	initClass: 'js-houdini', // Class added to `<html>` element when initiated
	stopVideo: true, // If true, stop any videos that are playing when content is collapsed
	callbackOpen: function ( content, toggle ) {}, // Function that's run after content is expanded
	callbackClose: function ( content, toggle ) {} // Function that's run after content is collapse
});
```

### Use Houdini events in your own scripts

You can also call the Houdini toggle event in your own scripts.

#### openContent()
Expand a closed content area.

```javascript
houdini.openContent(
	contentID, // The ID of the content area to expand. ex. '#content'
	toggle, // Node that toggles the expand and collapse action. ex. document.querySelector('#toggle') [optional]
	options // Classes and callbacks. Same options as those passed into the init() function. [optional]
);
```

**Examples**

```javascript
houdini.openContent( '#show-me' );
houdini.openContent( '#show-me-too', document.querySelector( 'a[href*="#show-me-too"]' ) );
```

#### closeContent()
Expand a closed content area.

```javascript
houdini.closeContent(
	contentID, // The ID of the content area to collapse. ex. '#content'
	toggle, // Node that toggles the expand and collapse action. ex. document.querySelector('#toggle') [optional]
	options // Classes and callbacks. Same options as those passed into the init() function. [optional]
);
```

**Examples**

```javascript
houdini.closeContent( '#hide-me' );
houdini.closeContent( '#hide-me-too', document.querySelector( 'a[href*="#show-me-too"]' ) );
```

#### destroy()
Destroy the current `houdini.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
houdini.destroy();
```



## Browser Compatibility

Houdini works in all modern browsers, and IE 10 and above. You can push browser support back to IE 9 with the [classList.js polyfill](https://github.com/eligrey/classList.js/).

Houdini is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, all content will be displayed by default. If you need to support older browsers, you can still download the [jQuery version of Houdini on GitHub](https://github.com/cferdinandi/houdini/tree/archive-v2).



## How to Contribute

Please review the  [contributing guidelines](CONTRIBUTING.md).



## License

The code is available under the [MIT License](LICENSE.md).