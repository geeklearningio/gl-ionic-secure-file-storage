/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var SecureFileStorageServiceConfigProvider_1 = __webpack_require__(2);
	var SecureFileStorageService = (function () {
	    /* @ngInject */
	    SecureFileStorageService.$inject = ["$q", "ionic", "$rootElement", "secureFileStorageServiceConfig"];
	    function SecureFileStorageService($q, ionic, $rootElement, secureFileStorageServiceConfig) {
	        this.$q = $q;
	        this.ionic = ionic;
	        this.$rootElement = $rootElement;
	        this.secureFileStorageServiceConfig = secureFileStorageServiceConfig;
	    }
	    /**
	     *  This function will set the namespace used to create a directory for the app.
	     *  If the namespace was not set in the configuration using the SecureFileStorageServiceProvider, the service will try to set it as the app name.
	     *  If the app name is not specified (the Angular app has been booted automatically, then throw an error)
	     */
	    SecureFileStorageService.prototype.setNamespace = function () {
	        this.namespace = this.secureFileStorageServiceConfig.namespace;
	        if (!this.namespace || this.namespace === '') {
	            var appName = this.$rootElement.attr('ng-app');
	            if (appName) {
	                this.namespace = appName;
	            }
	            else {
	                throw new Error('You must specify a namespace to the SecureFileStorageService');
	            }
	        }
	    };
	    SecureFileStorageService.prototype.setSecurityApis = function () {
	        if (window.cordova) {
	            this.securityApi = window.intel.security;
	            this.setNamespace();
	            this.cryphoSecurityApi = new window.cordova.plugins.SecureStorage(function () {
	                // OK
	            }, function () {
	                console.log('error initializing Crypho Api');
	            }, this.namespace);
	        }
	    };
	    SecureFileStorageService.prototype.canEncrypt = function () {
	        return window.cordova && window.cordova.plugins && (window.intel || window.cordova.plugins.SecureStorage);
	    };
	    SecureFileStorageService.prototype.securityApiReady = function () {
	        var _this = this;
	        var deferred = this.$q.defer();
	        this.ionic.Platform.ready(function () {
	            if (_this.canEncrypt()) {
	                _this.setSecurityApis();
	                deferred.resolve(true);
	            }
	            else {
	                deferred.resolve(false);
	            }
	        });
	        return deferred.promise;
	    };
	    SecureFileStorageService.prototype.write = function (key, data) {
	        var _this = this;
	        var deferred = this.$q.defer();
	        this.securityApiReady().then(function (isReady) {
	            if (isReady) {
	                if (_this.ionic.Platform.isAndroid()) {
	                    _this.securityApi.secureData.createFromData({ data: data })
	                        .then(function (dataInstanceID) {
	                        return _this.securityApi.secureStorage.write({ id: key, instanceID: dataInstanceID });
	                    })
	                        .then(function () {
	                        deferred.resolve();
	                    })
	                        .catch(function (error) {
	                        console.log("Error encrypting file data, error code is: " + error.code + ", error message is: " + error.message);
	                        deferred.reject(error);
	                    });
	                }
	                else {
	                    _this.cryphoSecurityApi.set(function (key) {
	                        deferred.resolve();
	                    }, function (error) {
	                        deferred.reject(error);
	                    }, key, data);
	                }
	            }
	            else {
	                deferred.reject();
	            }
	        });
	        return deferred.promise;
	    };
	    SecureFileStorageService.prototype.read = function (key) {
	        var _this = this;
	        var deferred = this.$q.defer();
	        this.securityApiReady().then(function (isReady) {
	            if (isReady) {
	                if (_this.ionic.Platform.isAndroid()) {
	                    _this.securityApi.secureStorage.read({ id: key })
	                        .then(_this.securityApi.secureData.getData)
	                        .then(function (data) {
	                        deferred.resolve(data);
	                    })
	                        .catch(function (error) {
	                        // if the key does not exist, we get a file system error. Just don't log anything
	                        if (error.code !== 1) {
	                            console.log("Error getting encrypted file data, error code is: " + error.code + ", error message is: " + error.message);
	                        }
	                        deferred.reject(error);
	                    });
	                }
	                else {
	                    console.log('reading with crypho api');
	                    _this.cryphoSecurityApi.get(function (value) {
	                        deferred.resolve(value);
	                    }, function (error) {
	                        deferred.reject(error);
	                    }, key);
	                }
	            }
	            else {
	                deferred.reject();
	            }
	        });
	        return deferred.promise;
	    };
	    SecureFileStorageService.prototype.clear = function () {
	        var _this = this;
	        var deferred = this.$q.defer();
	        this.securityApiReady().then(function (isReady) {
	            if (isReady) {
	                if (_this.ionic.Platform.isAndroid()) {
	                    deferred.reject('not implemented on Android yet');
	                }
	                else {
	                    _this.cryphoSecurityApi.clear(function () {
	                        deferred.resolve();
	                    }, function (error) {
	                        deferred.reject(error);
	                    });
	                }
	            }
	            else {
	                deferred.reject();
	            }
	        });
	        return deferred.promise;
	    };
	    SecureFileStorageService.prototype.delete = function (key) {
	        var _this = this;
	        var deferred = this.$q.defer();
	        this.securityApiReady().then(function (isReady) {
	            if (isReady) {
	                if (_this.ionic.Platform.isAndroid()) {
	                    _this.securityApi.secureStorage.delete({ id: key })
	                        .then(function () {
	                        deferred.resolve();
	                    })
	                        .catch(function (error) {
	                        console.log("Error getting encrypted file data, error code is: " + error.code + ", error message is: " + error.message);
	                        deferred.reject(error);
	                    });
	                }
	                else {
	                    _this.cryphoSecurityApi.remove(function (key) {
	                        deferred.resolve();
	                    }, function (error) {
	                        deferred.reject(error);
	                    }, key);
	                }
	            }
	            else {
	                deferred.reject();
	            }
	        });
	        return deferred.promise;
	    };
	    SecureFileStorageService.prototype.canUseSecureFileStorage = function () {
	        var _this = this;
	        var deferred = this.$q.defer();
	        this.ionic.Platform.ready(function () {
	            deferred.resolve(_this.ionic.Platform.isWebView() && window.cordova && _this.canEncrypt());
	        });
	        return deferred.promise;
	    };
	    return SecureFileStorageService;
	}());
	exports.SecureFileStorageService = SecureFileStorageService;
	exports = angular.module("gl-ionic-secure-file-storage", [])
	    .provider('secureFileStorageServiceConfig', SecureFileStorageServiceConfigProvider_1.SecureFileStorageServiceConfigProvider)
	    .service("secureFileStorageService", SecureFileStorageService);


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by Vidailhet on 14/11/16.
	 */
	"use strict";
	var SecureFileStorageServiceConfigProvider = (function () {
	    /* @ngInject */
	    function SecureFileStorageServiceConfigProvider() {
	        this.config = {
	            namespace: ''
	        };
	    }
	    /* @ngInject */
	    SecureFileStorageServiceConfigProvider.prototype.$get = function () {
	        return this.config;
	    };
	    SecureFileStorageServiceConfigProvider.prototype.setNamespace = function (namespace) {
	        this.config.namespace = namespace;
	    };
	    return SecureFileStorageServiceConfigProvider;
	}());
	exports.SecureFileStorageServiceConfigProvider = SecureFileStorageServiceConfigProvider;


/***/ }
/******/ ]);