import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import webpack from 'webpack';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import nodeExternals from 'webpack-node-externals';
import UglifyJSPlugin  from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizationCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';


const devMode = process.env.Node_ENV !== 'production';

const reactScripts = /\.(js|jsx) $/;
const reactStyles = /\.(sass|scss|)$/;
const reactImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

const minimizationCssOptions = {
  discardComments: {
    removeAll: true
  }
}

// const config = {
//   mode: isDebug ? 'development' : 'production'
// }

module.exports = {
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
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizationCSSAssetsPlugin({})
    ]
  },
  target: "web",
  // externals: [nodeExternals({
  //   whitelist: ['jquery', 'webpack/hot/dev-server']
  // })],
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      },
      {
        test: reactScripts,
        use: [
          'babel-loader'
        ]
      },
      {
        test: reactStyles,
        use: [
          !devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './dist/css'
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  //plugins for webpack
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: devMode ? 'main.css' : 'main.[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new FaviconsWebpackPlugin({
      logo:'./src/img/favicon.png',
      prefix:'icon-[hash]/',
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
  }),
    new HtmlWebpackPlugin({
      title: 'This weather app',
      template: './views/index.ejs',
      minify: true,
      inject: 'body',
      "files": {
        "css": ["main.css"]
      }
    })

  ]
}
