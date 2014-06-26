describe('Houdini', function () {

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

	// .bind polyfill for PhantomJS
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

	injectElem();
	houdini.init();
	var toggles = document.querySelectorAll('[data-collapse]');
	var content = document.querySelectorAll('.collapse');

	describe('init', function () {
		it('Document should include the houdini module', function () {
			expect(!!houdini).toBe(true);
		});

		it('Document should contain init class', function () {
			expect(document.documentElement.classList.contains('js-houdini')).toBe(true);
		});
	});

	describe('toggleContent', function () {
		it('Toggle content should have an active class on click', function () {
			trigger('click', toggles[0]);
			expect(content[0].classList.contains('active')).toBe(true);
		});

		it('Toggle content should not have an active class on click again', function () {
			trigger('click', toggles[0]);
			expect(content[0].classList.contains('active')).toBe(false);
		});
	});

	describe('Accordion functionality', function () {
		it('First toggle content should be open on click', function () {
			trigger('click', toggles[0]);
			expect(content[0].classList.contains('active')).toBe(true);
		});

		it('First toggle content should be closed when second toggle is clicked', function () {
			trigger('click', toggles[1]);
			expect(content[1].classList.contains('active')).toBe(true);
			expect(content[0].classList.contains('active')).toBe(false);
		});

		it('Second toggle content should be closed when first toggle is clicked', function () {
			trigger('click', toggles[0]);
			expect(content[0].classList.contains('active')).toBe(true);
			expect(content[1].classList.contains('active')).toBe(false);
		});
	});

	// @todo Add destroy functionality to houdini
	// @todo Test init with options
	// @todo Add tests for public APIs

});