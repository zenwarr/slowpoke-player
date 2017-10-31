const webpack = require('webpack');
const webpackCommon = require('./common');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const child_process = require('child_process');
const process = require('process');

module.exports = [
  {
    /**
     * Client
     */

    entry: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      './src/client/index.tsx'
    ],

    output: {
      filename: "bundle.js",
      path: path.join(__dirname, '/../dist/client'),
      libraryTarget: "commonjs2",
      publicPath: "http://localhost:8080/dist/client"
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
    }), new webpack.HotModuleReplacementPlugin({

    }), new webpack.NamedModulesPlugin()],

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      publicPath: 'http://localhost:8080/dist/client',
      port: 8080,
      inline: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      watchOptions: {
        aggregateTimeout: 1000,
        poll: 100,
        ignored: /node_modules/
      },
      before() {
        console.log('Starting main processs...');
        child_process.spawn(
            'npm', [ 'run', 'start' ], { shell: true, stdio: 'inherit' }
        ).on('error', code => process.exit(code)).on('error', err => console.error(err));
      }
    }
  }
];
