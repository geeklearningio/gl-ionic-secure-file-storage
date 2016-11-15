/// <reference path="../../typings/index.d.ts" />
/// <reference path="index.d.ts" />

'use strict';

import 'ionic-sdk/release/js/ionic.bundle';
import 'gl-ionic-secure-file-storage/package/src/SecureFileStorageService.ts';

declare var exports: any;

import {MainController} from './views/main/MainController.ts';
import {Config} from  './index.config.ts';
import {RouterConfig} from  './index.route.ts';
import {RunBlock} from  './index.run.ts';
import {loadConfigurationJSON} from "gl-angular-configuration/package/src/ConfigurationProvider.ts";

exports = angular.module('testApp', [
    'ionic',
    'ui.router',
    'gl-ionic-secure-file-storage',
    'ngAnimate'])
    .config(Config)
    .constant('ionic', (<any>window).ionic)

    .config(RouterConfig)

    .run(RunBlock)
    .controller('MainController', MainController)
    ;


loadConfigurationJSON(() => {
    var domElement = document.querySelector('html');
    angular.bootstrap(domElement, ["testApp"]);
});
