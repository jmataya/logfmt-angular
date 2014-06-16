// Karma configuration

module.exports = function(config) {
  config.set({
    // Base path, this will be used to resolve files and exclude.
    basePath: '',

    // Framework to use for testing.
    frameworks: ['jasmine'],

    // List of files/patterns to load in the browser.
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'src/logfmt-angular.js',
      'test/*.js'
    ],

    // List of files to exclude.
    exclude: [],

    // Test results reporter to use.
    // Possible values: 'dots', 'progress', 'junit'.
    reporters: ['progress'],

    // Web server port.
    port: 7890,

    // CLI runner port.
    runnerPort: 7100,

    // Enable/disable colors in the output (reporters and logs).
    colors: true,

    // Enable/disable watching files and executing tests whenever
    // any file changes.
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout (ms), kill it.
    captureTimeout: 60000,

    // Continuous integration mode.
    // If true, it captures browsers, runs tests, and exits.
    singleRun: false
  });
};
