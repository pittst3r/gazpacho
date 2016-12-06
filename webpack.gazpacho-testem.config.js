var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: {
    features: './tests/features/index.js',
    adapter: './tests/features/testem-adapter.js',
  },
  output: {
    path: path.resolve(__dirname, 'tmp'),
    filename: '[name].js',
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: require.resolve('./src/gazpacho'),
        loader: 'expose-loader?gazpacho',
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
