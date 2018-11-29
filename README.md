# Houdini [![Build Status](https://travis-ci.org/cferdinandi/houdini.svg)](https://travis-ci.org/cferdinandi/houdini)
A simple, accessible show-and-hide/accordion script.

Houdini progressively enhances your markup when it loads. You provide the content, and Houdini layers in the toggle buttons, ARIA attributes, and interactivity for you.

[Getting Started](#getting-started) | [Accordions](#accordions) | [Demos](#demos) | [Options & Settings](#options-and-settings) | [What's New?](#whats-new) | [Browser Compatibility](#browser-compatibility) | [License](#license)


<hr>

### Want to learn how to write your own vanilla JS plugins? Check out my [Vanilla JS Pocket Guides](https://vanillajsguides.com/) or join the [Vanilla JS Academy](https://vanillajsacademy.com) and level-up as a web developer. 🚀

<hr>



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include Houdini on your site.

Houdini has two required files: JavaScript and CSS.

There are two versions of the Houdini JavaScript file: the standalone version, and one that comes preloaded with polyfills for `matches()`, `closest()`, `classList`, and `CustomEvent()`, which are only supported in newer browsers.

If you're including your own polyfills or don't want to enable this feature for older browsers, use the standalone version. Otherwise, use the version with polyfills.

**Direct Download**

You can [download the files directly from GitHub](https://github.com/cferdinandi/houdini/archive/master.zip).

```html
<link rel="stylesheet" type="text/css" href="/path/to/houdini.min.css">
<script src="path/to/houdini.polyfills.min.js"></script>
```

**CDN**

You can also use the [jsDelivr CDN](https://cdn.jsdelivr.net/gh/cferdinandi/houdini/dist/). I recommend linking to a specific version number or version range to prevent major updates from breaking your site. Houdini uses semantic versioning.

```html
<!-- Always get the latest version -->
<!-- Not recommended for production sites! -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/cferdinandi/houdini/dist/css/houdini.min.js">
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/houdini/dist/js/houdini.polyfills.min.js"></script>

<!-- Get minor updates and patch fixes within a major version -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/cferdinandi/houdini@10/dist/css/houdini.min.js">
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/houdini@11/dist/js/houdini.polyfills.min.js"></script>

<!-- Get patch fixes within a minor version -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/cferdinandi/houdini@10.0/dist/css/houdini.min.js">
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/houdini@11.0/dist/js/houdini.polyfills.min.js"></script>

<!-- Get a specific version -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/cferdinandi/houdini@10.0.0/dist/css/houdini.min.js">
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/houdini@11.0.0/dist/js/houdini.polyfills.min.js"></script>
```

### 2. Add the markup to your HTML.

1. Wrap your content in a `div` element and assign it a unique ID.
2. Add a selector (the example below uses the `[data-houdini]` attribute, but this could be a class or ID instead).
3. Add a `[data-houdini-button]` attribute with the text you want for your button. Houdini will create the button and add any required ARIA attributes automatically when it loads.

```html
<div data-houdini data-houdini-button="Show More" id="show-me">
	<p>Now you see me, now you don't.</p>
</div>
```

*__Note:__ The ID can serve as the selector. However, if you'll be including multiple disclosures with the same options and settings, it's better to use a shared selector like a class or data attribute for all of them.*

### 3. Initialize Houdini.

In the footer of your page, after the content, initialize Houdini by passing in the selector for your disclosure component(s). And that's it, you're done. Nice work!

```html
<script>
	var disclosure = new Houdini('[data-houdini]');
</script>
```

[Here's a simple demo you can play with.](https://codepen.io/cferdinandi/pen/JeByZQ)



## Accordions

Houdini also supports accordion groups.

### Accordion Markup

For semantic reasons, these should have a heading/content relationship. You can use heading elements, data lists, and more.

The heading should have a `[data-houdini-toggle]` attribute, with a value equal to the ID of the content it toggles.

```html
<h2 data-houdini-toggle="yo-ho-ho">Yo, ho ho!</h2>
<div data-houdini-group id="yo-ho-ho">Yo, ho ho and a bottle of rum!</div>

<h2 data-houdini-toggle="ahoy">Ahoy, there!</h2>
<div data-houdini-group id="ahoy">Ahoy there, matey!</div>
```

### Accordion Initialization

Initialize an accordion by passing in the `isAccordion` option with a value of `true`.

```js
var accordion = new Houdini('[data-houdini-group]', {
	isAccordion: true
});
```

If opening one accordion section should close any others in the group that are open, also include the `collapseOthers` option, with a value of `true`.

It's recommended that you give each group a unique selector if using this option.

```js
var accordion = new Houdini('[data-houdini-group="pirates"]', {
	isAccordion: true,
	collapseOthers: true
});
```



## Demos

- [Basic Demo](https://codepen.io/cferdinandi/pen/JeByZQ)
- [Button after the content](https://codepen.io/cferdinandi/pen/yQqoRE)
- [Adding extra info for screen readers](https://codepen.io/cferdinandi/pen/bQQXjG)
- [Using your own button](https://codepen.io/cferdinandi/pen/jQQgKb)
- [Accordion](https://codepen.io/cferdinandi/pen/PxBKxp)
- [Accordion with only one open content area](https://codepen.io/cferdinandi/pen/NEBvew)
- [Accordion with datalist](https://codepen.io/cferdinandi/pen/LXBjaE)



## Options and Settings

Houdini includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Expanded by Default

If you want specific disclosures or accordions to be expanded by default, add the `.is-expanded` class to your markup.

**Expanded Disclosure**

```html
<div data-houdini class="is-expanded" id="show-me">
	<p>Now you see me, now you don't.</p>
</div>
```

**Expanded Accordion**

```html
<h2 data-houdini-toggle="yo-ho-ho">Yo, ho ho!</h2>
<div data-houdini-group class="is-expanded" id="yo-ho-ho">Yo, ho ho and a bottle of rum!</div>

<h2 data-houdini-toggle="ahoy">Ahoy, there!</h2>
<div data-houdini-group id="ahoy">Ahoy there, matey!</div>
```

To expand all items by default, pass in the `expanded` option with a value of `true`.

```js
// Disclosure expanded by default
var disclosure = new Houdini('[data-houdini]', {
	expanded: true
});

// Accordions expanded by default
var accordion = new Houdini('[data-houdini-group]', {
	isAccordion: true,
	expanded: true
});
```

### Extra Info for Screen Readers

If you want to add extra information to your button for screen reader users, include the `[data-houdini-label]` attribute. This will add an `aria-label` to the button.

```html
<div data-houdini data-houdini-button="Show More" data-houdini-label="Show more about pirates" id="show-me">
	<p>Now you see me, now you don't.</p>
</div>
```

### Using Your Own Buttons

If you want to have more control over the toggle buttons, you can include your own instead.

Make sure your button has a `[data-houdini-toggle]` attribute with a value that matches the ID of the content it's supposed to toggle. You should also add the `[hidden]` attribute to hide the button until the script loads (Houdini will make it visible automatically).

```html
<button data-houdini-toggle="show-me-too" aria-label="Show more about pirates, too" hidden>
	Show me, too
</button>
```

*__Note:__ You DO NOT need to include the `[data-houdini-button]` or `[data-houdini-label]` attributes, since you're creating your own button and can add that content directly.*

### Global Settings

You can override the default settings by passing in user options as a second argument when initializing.

```javascript
var disclosure = new Houdini('[data-houdini]', {

	// Content
	contentClass: 'houdini',
	expanded: false,
	expandedClass: 'is-expanded',

	// Toggle Buttons
	btnAfter: false, // If true, load toggle button after the content
	btnClass: 'houdini-toggle', // The class to add to toggle buttons
	btnAttribute: 'data-houdini-toggle', // The data attribute to use for toggle buttons
	btnTextAttribute: 'data-houdini-button', // The data attribute for the button text
	btnLabelAttribute: 'data-houdini-label', // The data attribute for aria-label text
	btnPreExisting: 'data-houdini-button-preexisting', // The data attribute added to pre-existing buttons

	// Accordion
	isAccordion: false, // If true, treat as an accordion
	collapseOthers: false, // If true, only allow on open piece of content at a time
	headingClass: 'houdini-heading', // The class to add to the heading element

	// Icons
	icon: -1, // If true, include an expand/collapse icon
	iconClass: 'houdini-toggle-icon', // The class to use for the expand/collapse icon
	iconAttribute: 'data-houdini-icon', // The data attribute to use for the expand/collapse icon
	iconShow: '+', // The icon to expand an accordion
	iconHide: '&ndash;', // The icon to collapse an accordion

	// Custom Events
	emitEvents: true // If true, emit custom events

});
```

### Custom Events

Houdini emits five custom events:

- `houdiniExpand` is emitted on a content element after it's expanded.
- `houdiniCollapse` is emitted on a content element after it's collapsed.
- `houdiniInitialize` is emitted on the `document` when the script is initialized, but before the DOM is setup.
- `houdiniSetup` is emitted on the `document` after the DOM is setup.
- `houdiniDestroy` is emitted on the `document` after an initialization is destroyed.

On the `houdiniExpand` and `houdiniCollapse` event, the `event.detail` object includes the content and button. For the `houdiniInitialize`, `houdiniSetup`, and `houdiniDestroy` event, it includes the `settings` object.

All five events bubble, and can be captured with event delegation.

```js
// Log scroll events
var logHoudiniEvent = function (event) {

	// The event type
	console.log('type:', event.type);

	// The content being expanded or collapsed
	console.log('content:', event.detail.content);

	// The button for the content
	console.log('button:', event.detail.button);

};

// Listen for scroll events
document.addEventListener('houdiniExpand', logHoudiniEvent, false);
document.addEventListener('houdiniCollapse', logHoudiniEvent, false);
```

### Methods

You can also call Houdini's methods in your own scripts.

#### toggle()
Toggle the visibility of a content area. Accepts an element or selector string as an argument. Can be the toggle *or* content.

```javascript
var disclosure = new Houdini();

// Selector string
disclosure.toggle('#yo-ho-ho');

// Content element
var content = document.querySelector('#yo-ho-ho');
disclosure.toggle(content);

// Button element
var btn = document.querySelector('[data-houdini-toggle="yo-ho-ho"]');
disclosure.toggle(btn);
```

#### expand()
Expand a content area. Accepts an element or selector string as an argument. Can be the toggle *or* content.

```javascript
var disclosure = new Houdini();

// Selector string
disclosure.expand('#yo-ho-ho');

// Content element
var content = document.querySelector('#yo-ho-ho');
disclosure.expand(content);

// Button element
var btn = document.querySelector('[data-houdini-toggle="yo-ho-ho"]');
disclosure.expand(btn);
```

#### collapse()
Collapse a content area. Accepts an element or selector string as an argument. Can be the toggle *or* content.

```javascript
var disclosure = new Houdini();

// Selector string
disclosure.collapse('#yo-ho-ho');

// Content element
var content = document.querySelector('#yo-ho-ho');
disclosure.collapse(content);

// Button element
var btn = document.querySelector('[data-houdini-toggle="yo-ho-ho"]');
disclosure.collapse(btn);
```

#### setup()
Adds the required markup to the DOM. This runs automatically when you initialize Houdini, but if you add new elements to the DOM later, you should run it again.

```js
var disclosure = new Houdini('[data-houdini]');

// Some time later...
disclosure.setup();
```

#### destroy()
Destroy an instantiation of Houdini and restore the markup to its original state.

```js
var disclosure = new Houdini('[data-houdini]');

// Some time later...
disclosure.destroy();
```



## What's New?

- Supports multiple instantiations at once.
- Better accessibility and semantics.
- Automatically progressively enhances your markup for you.
- Deprecated callbacks in favor of custom events.

### Migrating to Houdini 11 from Houdini 10

Based on feedback from accessibility experts, Houdini no longer supports changing button text or using the same text for all buttons.

- Every content area now needs a `[data-houdini-button]` attribute or a `button` element with a `[data-houdini-toggle]` attribute that matches the content ID.
- The `btnShow` and `btnHide` options no longer exist.

### Migrating to Houdini 10 from Older Versions

The entire markup and initialization process has changed in Houdini 10. To migrate:

- Remove existing toggle buttons from your markup.
- Switch the `.active` to `.is-expanded` for content you want expanded by default.
- Accordions should use a semantic heading/content relational structure instead of anchor links.
- Instantiate Houdini with `new Houdini()` instead of `houdini.init()`.
- Move any callbacks to custom event listeners.



## Kudos 👏

Major kudos to [Scott O'Hara](https://www.scottohara.me/) for walking me through the nuances of accordion accessibility and giving me tons of feedback along the way.



## Browser Compatibility

Houdini works in all modern browsers, and IE 9 and above.

Houdini is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, all of your content will be displayed as-is.

### Polyfills

Support back to IE9 requires polyfills for `matches()`, `closest()`, `classList`, and `CustomEvent()`. Without them, support starts with Edge.

Use the included polyfills version of Houdini, or include your own.



## License

The code is available under the [MIT License](LICENSE.md).