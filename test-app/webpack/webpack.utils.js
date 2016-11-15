/**
 * Created by Vidailhet on 28/07/16.
 */

'use strict';

var _ = require('lodash');
var baseConfig = require('./webpack.base.config');
var noFastCssBaseConfig = require('./webpack.nofastcss.config');

module.exports = {
    customizer: function (objValue, srcValue) {
        if (_.isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    },

    config: function (customization) {
        return _.mergeWith(baseConfig, customization, module.exports.customizer);
    },

    configNoFastcss: function (customization) {
        var mergedConfig = _.mergeWith(baseConfig, customization, module.exports.customizer);
        return _.mergeWith(noFastCssBaseConfig, mergedConfig, module.exports.customizer);
    }
};



