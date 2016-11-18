// Karma configuration
// Generated on Wed Nov 02 2016 19:28:54 GMT-0400 (EDT)

var path = require('path');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['cukes',],


    // list of files / patterns to load in the browser
    files: [
      'tests/features/**/*-feature.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/features/**/*-feature.js': ['webpack', 'sourcemap',],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress',],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    
    plugins: [
      'karma-webpack',
      'karma-cukes',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
    ],

    webpack: {
      externals: {},
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['es2015',],
            },
          },
          {
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          },
        ],
        devtool: 'inline-source-map',
      },
      resolve: {
        root: [
          path.resolve(__dirname),
          path.resolve(__dirname, 'src'),
        ],
        modulesDirectories: ['node_modules',],
      },
      eslint: {
        configFile: '.eslintrc.js',
        emitError: true,
      },
    },
  })
}
