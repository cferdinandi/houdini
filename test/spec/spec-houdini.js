describe('Houdini', function () {

	//
	// Helper Functions
	//

	/**
	 * Inserts Houdini markup into DOM
	 */
	var injectElem = function () {
		var elem =
			'<a class="collapse-toggle" data-collapse="#content1" data-group="accordion" href="#">' +
				'<span class="collapse-text-show">Show +</span>' +
				'<span class="collapse-text-hide">Hide -</span>' +
			'</a>' +
			'<div class="collapse" id="content1">' +
				'<p>Content</p>' +
			'</div>' +
			'<a class="collapse-toggle" data-collapse="#content2" data-group="accordion" href="#">' +
				'<span class="collapse-text-show">Show +</span>' +
				'<span class="collapse-text-hide">Hide -</span>' +
			'</a>' +
			'<div class="collapse" id="content2">' +
				'<p>Content</p>' +
			'</div>';
		document.body.innerHTML = elem;
	};

	/**
	 * Triggers an event
	 * @param  {String} type Type of event (ex. 'click')
	 * @param  {Element} elem The element that triggered the event
	 * @link http://stackoverflow.com/a/2490876
	 */
	var trigger = function (type, elem) {
		var event; // The custom event that will be created

		if (document.createEvent) {
			event = document.createEvent('HTMLEvents');
			event.initEvent(type, true, true);
		} else {
			event = document.createEventObject();
			event.eventType = type;
		}

		event.eventName = type;

		if (document.createEvent) {
			elem.dispatchEvent(event);
		} else {
			elem.fireEvent("on" + event.eventType, event);
		}
	};

	/**
	 * Bind polyfill for PhantomJS
	 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility
	 */
	if (!Function.prototype.bind) {
		Function.prototype.bind = function (oThis) {
			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5
				// internal IsCallable function
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1);
			var fToBind = this;
			var fNOP = function () {};
			var fBound = function () {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
			};

			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();

			return fBound;
		};
	}


	//
	// Init
	//

	describe('init()', function () {

		beforeEach(function () {
			houdini.init();
		});

		it('Document should include the houdini module', function () {
			expect(!!houdini).toBe(true);
		});

		it('Document should contain init class', function () {
			expect(document.documentElement.classList.contains('js-houdini')).toBe(true);
		});

	});


	//
	// Events
	//

	describe('toggleCollapse()', function () {

		var toggle, content;

		beforeEach(function () {
			injectElem();
			houdini.init();
			toggle = document.querySelector('[data-collapse]');
			content = document.querySelector( toggle.getAttribute('data-collapse') );
		});

		it('Content should have an active class on click', function () {
			trigger('click', document.querySelector('[data-collapse]'));
			expect(content.classList.contains('active')).toBe(true);
		});

		it('Content should not have an active class if toggle is clicked again', function () {
			trigger('click', toggle);
			expect(content.classList.contains('active')).toBe(true);
			trigger('click', toggle);
			expect(content.classList.contains('active')).toBe(false);
		});

	});

	describe('closeCollapseGroup()', function () {

		var toggles, content;

		beforeEach(function () {
			injectElem();
			houdini.init();
			toggles = document.querySelectorAll('[data-collapse]');
			content = document.querySelectorAll('.collapse');
		});

		it('First content section should be open on click', function () {
			trigger('click', toggles[0]);
			expect(content[0].classList.contains('active')).toBe(true);
		});

		it('First content section should be closed when second toggle is clicked', function () {
			trigger('click', toggles[0]);
			expect(content[0].classList.contains('active')).toBe(true);
			trigger('click', toggles[1]);
			expect(content[1].classList.contains('active')).toBe(true);
			expect(content[0].classList.contains('active')).toBe(false);
		});

		it('Second content section should be closed when first toggle is clicked', function () {
			trigger('click', toggles[1]);
			expect(content[1].classList.contains('active')).toBe(true);
			trigger('click', toggles[0]);
			expect(content[0].classList.contains('active')).toBe(true);
			expect(content[1].classList.contains('active')).toBe(false);
		});

	});

	// @todo Test init with options
	// @todo Add tests for public APIs

});