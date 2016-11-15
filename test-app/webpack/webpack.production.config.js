/**
 * Created by Vidailhet on 28/07/16.
 */

'use strict';

var utils = require('./webpack.utils');

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = utils.configNoFastcss({
    plugins: [
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.optimize.UglifyJsPlugin(
            {
                warning: false,
                mangle: true,
                comments: false
            }
        )],
    postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass')
        }]
    }
});

