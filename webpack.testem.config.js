var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: './tests/unit/index.js',
  output: {
    path: path.resolve(__dirname, 'tmp'),
    filename: 'unit-tests.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [],
  resolve: {
    root: [
      path.resolve(__dirname),
      path.resolve(__dirname, 'src'),
    ],
    modulesDirectories: ['node_modules',],
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
  },
  eslint: {
    configFile: '.eslintrc.js',
  },
};
