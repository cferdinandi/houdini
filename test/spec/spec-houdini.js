describe('Houdini', function () {

	var injectElem = function () {
		var elem =
			'<a class="collapse-toggle" data-collapse="#show-me" href="#">' +
				'<span class="collapse-text-show">Show +</span>' +
				'<span class="collapse-text-hide">Hide -</span>' +
			'</a>' +
			'<div class="collapse" id="show-me">' +
				'<p>Now you see me, now you don\'t.</p>' +
			'</div>';
		document.body.innerHTML = elem;
	};

	describe('init', function () {
		houdini.init();
		var toggle = document.querySelector('[data-collapse]');

		it('Document should include the houdini module', function () {
			expect(!!houdini).toBe(true);
		});

		it('Document should contain init class', function () {
			expect(document.documentElement.classList.contains('js-houdini')).toBe(true);
		});
	});

	describe('toggleContent', function () {
		injectElem();
		var toggle = document.querySelector('[data-collapse]');
		var content = document.querySelector('#show-me');
		var showText = document.querySelector('.collapse-text-show');
		var hideText = document.querySelector('.collapse-text-hide');

		it('Toggle content should have an active class on toggle', function () {
			houdini.toggleContent(toggle, '#show-me', null, null);
			expect(content.classList.contains('active')).toBe(true);
		});

		it('Toggle content should not have an active class on toggle again', function () {
			houdini.toggleContent(toggle, '#show-me', null, null);
			expect(content.classList.contains('active')).toBe(false);
		});
	});

});