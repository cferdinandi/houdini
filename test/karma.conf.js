module.exports = function (config) {
	config.set({
		basePath: '',
		autoWatch: true,
		frameworks: ['jasmine'],
		browsers: ['PhantomJS'],
		files: [
			'../dist/js/houdini.js',
			'spec/*-spec.js'
		],
		plugins: [
			'karma-spec-reporter',
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-coverage'
		],
		preprocessors: {
			'../dist/js/houdini.js': ['coverage']
		},
		reporters: ['spec', 'coverage']
	});
};