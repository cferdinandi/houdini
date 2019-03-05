describe('houdini', function () {

	/**
	 * Simulate a click event.
	 * @param {Element} elem  the element to simulate a click on
	 */
	var simulateClick = function (elem) {
		// Create our event (with options)
		var evt = new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		});
		// If cancelled, don't dispatch our event
		var canceled = !elem.dispatchEvent(evt);
	};

	var $ = function (selector) {
		return document.querySelector(selector);
	};

	var $$ = function (selector) {
		return document.querySelectorAll(selector);
	};


	// Instantiating the plugin
	describe('instantiation', function () {

		// Setup instantiation
		var disclosure;
		beforeEach(function () {
			disclosure = new Houdini();
		});

		// The Constructor should exist
		it('should exist', function () {
			expect(Houdini).not.toBe(null);
		});

		// It should create a new instantiation
		it('should create new instantiation', function () {
			expect(Object.prototype.toString.call(disclosure)).toBe('[object Object]');
		});

	});

	// DOM Setup
	describe('DOM setup', function () {

		// Setup instantiation
		beforeEach(function () {

			// Create DOM
			document.body.innerHTML =
				'<div data-houdini data-houdini-button="Show More" id="show-me">' +
					'<p>Now you see me, now you don\'t.</p>' +
				'</div>' +

				'<h2 data-houdini-toggle="yo-ho-ho">Yo, ho ho!</h2>' +
				'<div data-houdini-group id="yo-ho-ho">Yo, ho ho and a bottle of rum!</div>' +

				'<h2 data-houdini-toggle="ahoy">Ahoy, there!</h2>' +
				'<div data-houdini-group id="ahoy">Ahoy there, matey!</div>';

			// Instantiate
			new Houdini('[data-houdini]');
			new Houdini('[data-houdini-group]', {
				isAccordion: true
			});

		});

		// Button should be created
		it('should create toggle button', function () {
			var btn = $('[data-houdini-toggle="show-me"]');
			expect(btn).not.toBe(null);
		});

		// Accordion buttons should be created
		it('should create accordion buttons', function () {
			var headingBtns = $$('h2 button[data-houdini-toggle]');
			expect(headingBtns.length).not.toBe(0);
		});

		// Accordion buttons should have an icon
		it('should create accordion button icons', function () {
			var icons = $$('h2 [data-houdini-toggle] [data-houdini-icon]');
			expect(icons.length).not.toBe(0);
		});

	});

	// Options and configurations
	describe('options', function () {

		var disclosure;
		beforeEach(function () {
			// Create DOM
			document.body.innerHTML =
				'<div data-houdini data-houdini-button-test="Show More Matey!" data-houdini-label-test="Show more about pirates" id="show-me">' +
					'<p>Now you see me, now you don\'t.</p>' +
				'</div>' +

				'<button data-houdini-toggle-test="show-me-too" aria-label-test="Show more about pirates, too" hidden>' +
					'Show me, too' +
				'</button>' +
				'<div data-houdini id="show-me-too">' +
					'<p>Some more content</p>' +
				'</div>';

			disclosure = new Houdini('[data-houdini]', {

				// Content
				contentClass: 'houdini-test',
				expanded: true,
				expandedClass: 'is-expanded-test',

				// Buttons
				btnAfter: true, // If true, load toggle button after the content
				btnClass: 'houdini-toggle-test', // The class to add to toggle buttons
				btnAttribute: 'data-houdini-toggle-test', // The data attribute to use for toggle buttons
				btnTextAttribute: 'data-houdini-button-test', // The data attribute for the button text
				btnLabelAttribute: 'data-houdini-label-test', // The data attribute for aria-label text
				btnPreExisting: 'data-houdini-button-preexisting-test', // The data attribute added to pre-existing buttons

			});
		});

		afterEach(function () {
			disclosure.destroy();
		});

		it('should have a custom content class', function () {
			expect($('.houdini-test')).not.toBe(null);
		});

		it('should expand content by default', function () {
			var content = $('#show-me');
			expect(content.classList.contains('is-expanded-test')).toBe(true);
		});

		it('should have a custom expanded class', function () {
			expect($('.is-expanded-test')).not.toBe(null);
		});

		it('should load button after content in the DOM', function () {
			var btn = $('[data-houdini-toggle-test="show-me"]');
			expect(btn.previousElementSibling.id).toBe('show-me');
		});

		it('should add custom class to buttons', function () {
			expect($('button.houdini-toggle-test')).not.toBe(null);
		});

		it('should have custom button text', function () {
			var btn = $('[data-houdini-toggle-test="show-me"]');
			expect(btn.textContent).toBe('Show More Matey!');
		});

		it('should have an aria-label', function () {
			var btn = $('[data-houdini-toggle-test="show-me"]');
			var label = btn.getAttribute('aria-label');
			expect(label).toBe('Show more about pirates');
		});

		it('should not hide BYO buttons', function () {
			var btn = $('[data-houdini-toggle-test="show-me-too"]');
			expect(btn.hasAttribute('hidden')).toBe(false);
		});

		it('should have custom button attribute if preexisting', function () {
			expect($('[data-houdini-button-preexisting-test]')).not.toBe(null);
		});

	});

});