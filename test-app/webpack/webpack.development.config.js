/**
 * Created by Vidailhet on 28/07/16.
 */

'use strict';

var utils = require('./webpack.utils');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = utils.configNoFastcss({
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!sass?sourceMap')
        }
        ]
    }
});

