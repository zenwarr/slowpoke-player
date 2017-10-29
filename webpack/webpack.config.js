const webpack = require('webpack');
const webpackCommon = require('./common');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    /*
     * Server
     */

    entry: './src/server/index.ts',

    target: 'electron',

    output: {
      filename: "bundle.js",
      path: path.join(__dirname, '/../dist/server'),
      libraryTarget: 'commonjs2'
    },

    devtool: 'source-map',

    externals: [webpackCommon.buildExternals()],

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.webpack.js']
    },

    node: {
      __dirname: false,
      __filename: false
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        }
      ]
    }
  },

  {
    /**
     * Client
     */

    entry: './src/client/index.tsx',

    output: {
      filename: "bundle.js",
      path: path.join(__dirname, '/../dist/client'),
      libraryTarget: "commonjs2"
    },

    devtool: 'source-map',

    target: 'electron-renderer',

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.webpack.js'],
    },

    externals: webpackCommon.buildExternals(),

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        },
        {
          test: /\.css$/,
          loaders: ExtractTextPlugin.extract('css-loader')
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
        }
      ]
    },

    plugins: [new HtmlWebpackPlugin({
      title: 'electron-mpv'
    }), new ExtractTextPlugin('style.css', {
      allChunks: true
    })]
  }
];
