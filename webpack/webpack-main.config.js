const webpack = require('webpack');
const webpackCommon = require('./common');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const child_process = require('child_process');
const process = require('process');

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
  }
];
