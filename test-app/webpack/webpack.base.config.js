/**
 * Created by Vidailhet on 28/07/16.
 */

'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var webpack = require('webpack');
var path = require('path');

__dirname = __dirname + '/../';

var jsonConfigurationFile;

for (var i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--env') {
        if (process.argv[i + 1]) {
            jsonConfigurationFile = process.argv[i + 1] + '.json';
        }
    }
}

module.exports = {
    entry: {
        app: [
            path.join(__dirname, "src/app/index.module.ts")
        ]
    },
    output: {
        path: path.join(__dirname, "www"),
        filename: "[name].js",
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.scss', '.json'],
        alias: {}
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, "src/app/configuration/" + jsonConfigurationFile),
                to: path.join(__dirname, "www/configuration.json")
            }
        ]),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8080,
            server: {
                baseDir: 'www'
            },
            ui: false,
            online: false,
            notify: false
        }),
        new ExtractTextPlugin("style.css")
    ],
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file?name=fonts/[name].[ext]"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file?name=fonts/[name].[ext]"
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file?name=[path][name].[ext]&context=./src/app'
        }, {
            test: /\.json$/,
            loader: "json"
        }
        ]
    }
};
