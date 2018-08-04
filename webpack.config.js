'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackAssetsManifest = require('webpack-assets-manifest');

var _webpackAssetsManifest2 = _interopRequireDefault(_webpackAssetsManifest);

var _webpackNodeExternals = require('webpack-node-externals');

var _webpackNodeExternals2 = _interopRequireDefault(_webpackNodeExternals);

var _uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

var _miniCssExtractPlugin = require('mini-css-extract-plugin');

var _miniCssExtractPlugin2 = _interopRequireDefault(_miniCssExtractPlugin);

var _optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

var _optimizeCssAssetsWebpackPlugin2 = _interopRequireDefault(_optimizeCssAssetsWebpackPlugin);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _faviconsWebpackPlugin = require('favicons-webpack-plugin');

var _faviconsWebpackPlugin2 = _interopRequireDefault(_faviconsWebpackPlugin);

var _cleanWebpackPlugin = require('clean-webpack-plugin');

var _cleanWebpackPlugin2 = _interopRequireDefault(_cleanWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var devMode = process.env.Node_ENV !== 'production';

var reactScripts = /\.(js|jsx) $/;
var reactStyles = /\.(sass|scss|)$/;
var reactImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

var minimizationCssOptions = {
  discardComments: {
    removeAll: true
  }

  // const config = {
  //   mode: isDebug ? 'development' : 'production'
  // }

};module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: '/\.css$/',
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [new _uglifyjsWebpackPlugin2.default({
      cache: true,
      parallel: true,
      sourceMap: true
    }), new _optimizeCssAssetsWebpackPlugin2.default({})]
  },
  target: "web",
  // externals: [nodeExternals({
  //   whitelist: ['jquery', 'webpack/hot/dev-server']
  // })],
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: _path2.default.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [{
      test: /\.ejs$/,
      loader: 'ejs-loader'
    }, {
      test: reactScripts,
      use: ['babel-loader']
    }, {
      test: reactStyles,
      use: [!devMode ? 'style-loader' : _miniCssExtractPlugin2.default.loader, "css-loader", 'sass-loader']
    }, {
      test: /\.css$/,
      use: [{
        loader: _miniCssExtractPlugin2.default.loader,
        options: {
          publicPath: './dist/css'
        }
      }, "css-loader"]
    }]
  },
  //plugins for webpack
  plugins: [new _cleanWebpackPlugin2.default(['dist']), new _miniCssExtractPlugin2.default({
    filename: devMode ? 'main.css' : 'main.[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
  }), new _faviconsWebpackPlugin2.default({
    logo: './src/img/favicon.png',
    prefix: 'icon-[hash]/',
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: false,
      favicons: true,
      firefox: true,
      opengraph: false,
      twitter: true,
      yandex: false,
      windows: false
    }
  }), new _htmlWebpackPlugin2.default({
    title: 'This weather app',
    template: './views/index.ejs',
    minify: true,
    inject: 'body',
    "files": {
      "css": ["main.css"]
    }
  })]
};

