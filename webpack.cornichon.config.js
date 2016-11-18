var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: './tests/features/index.js',
  output: {
    path: path.resolve(__dirname, 'tmp'),
    filename: 'features.js',
    library: 'features',
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
          presets: ['es2015'],
        }
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
      path.resolve(__dirname),
      path.resolve(__dirname, 'src'),
    ],
    modulesDirectories: ['node_modules',],
  },
  eslint: {
    configFile: '.eslintrc.js',
  },
};
