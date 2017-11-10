// Karma configuration

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'mocha', 'chai-as-promised', 'chai', 'sinon'],

    plugins: [
      'karma-jspm',
      'karma-sinon',
      'karma-mocha',
      'karma-chai-as-promised',
      'karma-chai',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-junit-reporter',
      'karma-typescript-preprocessor'
    ],
    client: {
      captureConsole: true,
      chai: {
        includeStack: true
      },
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage', 'junit'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    coverageReporter: {
      instrumenters: { isparta: require('isparta')},
      instrumenter: {
        '**/*.js': 'isparta'
      },
      type: 'html',
      dir: 'coverage'
    },

    htmlReporter: {
      outputFile: 'tests/units.html'
    },

    junitReporter: {
      outputDir: 'coverage', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'test-results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      useBrowserName: false // add browser name to report and classes names
    },

    preprocessors: {
      'src/components/**/!(*.spec).js': ['typescript', 'coverage']
    },

    typescriptPreprocessor: {
      // options passed to the typescript compiler
      options: {
        sourceMap: false, // (optional) Generates corresponding .map file.
        target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
        module: 'commonjs', // (optional) Specify module code generation: 'commonjs' or 'amd'
        noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
        noResolve: true, // (optional) Skip resolution and preprocessing.
        removeComments: true, // (optional) Do not emit comments to output.
        concatenateOutput: false // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
      }
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // list of files / patterns to load in the browser
    files: [],

    jspm: {
      // Edit this to your needs
      config: 'config.js',
      packages: 'jspm_packages',
      useBundles: true,
      paths: {},
      loadFiles: [
        'jspm_packages/system-polyfills.js',
        'src/components/**/*.spec.js'
      ],
      serveFiles: [
        'src/components/**/*.js',
        'src/components/**/*.html',
        'src/components/**/*.css'
      ]
    },

    proxies: {
      '/jspm_packages': './jspm_packages',
      '/config.js': './config.js',
      '/base': '.'
    },

    // list of files to exclude
    exclude: [],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

  });
};
