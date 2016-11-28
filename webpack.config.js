var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: {
    cornichon: './src/cornichon.js',
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.node$/,
        loader: 'node',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015',],
          plugins: [
            'transform-function-bind',
          ],
        },
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/\.idl$/),
  ],
  resolve: {
    root: [
      path.resolve(__dirname, 'src'),
    ],
    modulesDirectories: ['node_modules',],
  },
  eslint: {
    configFile: '.eslintrc.js',
    failOnError: true,
  },
};
