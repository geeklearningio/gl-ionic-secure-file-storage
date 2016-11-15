/**
 * Created by Vidailhet on 28/07/16.
 */

'use strict';

var utils = require('./webpack.utils');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');

__dirname = __dirname + '/../';

module.exports = utils.config({
    plugins: [
        new HtmlWebpackPlugin({
            pkg: require('../package.json'),
            template: path.join(__dirname, 'src/app/index.fastcss.html'),
            inject: 'body',
            hash: true
        })
    ]
});

