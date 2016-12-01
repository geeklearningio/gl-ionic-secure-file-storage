'use strict';
import {SecureFileStorageServiceConfigProvider} from "./SecureFileStorageServiceConfigProvider";

export class SecureFileStorageService {
    private securityApi: any;
    private cryphoSecurityApi: any;
    private namespace: string;

    /* @ngInject */
    constructor(private $q: angular.IQService,
                private ionic: any,
                private $rootElement: any,
                private secureFileStorageServiceConfig: any) {

    }

    /**
     *  This function will set the namespace used to create a directory for the app.
     *  If the namespace was not set in the configuration using the SecureFileStorageServiceProvider, the service will try to set it as the app name.
     *  If the app name is not specified (the Angular app has been booted automatically, then throw an error)
     */
    public setNamespace() {
        this.namespace = this.secureFileStorageServiceConfig.namespace;

        if (!this.namespace || this.namespace === '') {
            var appName = this.$rootElement.attr('ng-app');
            if (appName) {
                this.namespace = appName;
            } else {
                throw new Error('You must specify a namespace to the SecureFileStorageService');
            }
        }
    }

    private setSecurityApis() {
        if ((<any>window).cordova) {
            this.securityApi = (<any>window).intel.security;

            this.setNamespace();
            this.cryphoSecurityApi = new (<any>window).cordova.plugins.SecureStorage(() => {
                // OK
            }, () => {
                console.log('error initializing Crypho Api');
            }, this.namespace);
        }
    }

    private canEncrypt() {
        return (<any>window).cordova && (<any>window).cordova.plugins && ((<any>window).intel || (<any>window).cordova.plugins.SecureStorage);
    }

    private securityApiReady(): angular.IPromise<boolean> {
        var deferred: ng.IDeferred<any> = this.$q.defer();
        this.ionic.Platform.ready(() => {
            if (this.canEncrypt()) {
                this.setSecurityApis();
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    }

    public write(key: string, data: any): angular.IPromise<any> {
        var deferred: ng.IDeferred<any> = this.$q.defer();
        this.securityApiReady().then((isReady: boolean) => {
            if (isReady) {
                if (this.ionic.Platform.isAndroid()) {
                    this.securityApi.secureData.createFromData({data: data})
                        .then((dataInstanceID: string) => {
                            return this.securityApi.secureStorage.write({id: key, instanceID: dataInstanceID});
                        })
                        .then(() => {
                            deferred.resolve();
                        })
                        .catch((error: any) => {
                            console.log("Error encrypting file data, error code is: " + error.code + ", error message is: " + error.message);
                            deferred.reject(error);
                        });
                } else {
                    this.cryphoSecurityApi.set((key) => {
                        deferred.resolve();
                    }, (error) => {
                        deferred.reject(error);
                    }, key, data);
                }
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    }

    public read(key: string): angular.IPromise<any> {
        var deferred: ng.IDeferred<any> = this.$q.defer();
        this.securityApiReady().then((isReady: boolean) => {
            if (isReady) {
                if (this.ionic.Platform.isAndroid()) {
                    this.securityApi.secureStorage.read({id: key})
                        .then(this.securityApi.secureData.getData)
                        .then((data: any) => {
                            deferred.resolve(data);
                        })
                        .catch((error: any) => {
                            // if the key does not exist, we get a file system error. Just don't log anything
                            if (error.code !== 1) {
                                console.log("Error getting encrypted file data, error code is: " + error.code + ", error message is: " + error.message);
                            }
                            deferred.reject(error);
                        });
                } else {
                    console.log('reading with crypho api');
                    this.cryphoSecurityApi.get((value) => {
                        deferred.resolve(value);
                    }, (error) => {
                        deferred.reject(error);
                    }, key);
                }
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    }

    public clear(): angular.IPromise<any> {
        var deferred: ng.IDeferred<any> = this.$q.defer();
        this.securityApiReady().then((isReady: boolean) => {
            if (isReady) {
                if (this.ionic.Platform.isAndroid()) {
                    deferred.reject('not implemented on Android yet');
                } else {
                    this.cryphoSecurityApi.clear(() => {
                        deferred.resolve();
                    }, (error) => {
                        deferred.reject(error);
                    });
                }
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    }

    public delete(key: string): angular.IPromise<any> {
        var deferred: ng.IDeferred<any> = this.$q.defer();
        this.securityApiReady().then((isReady: boolean) => {
            if (isReady) {
                if (this.ionic.Platform.isAndroid()) {
                    this.securityApi.secureStorage.delete({id: key})
                        .then(() => {
                            deferred.resolve();
                        })
                        .catch((error: any) => {
                            console.log("Error getting encrypted file data, error code is: " + error.code + ", error message is: " + error.message);
                            deferred.reject(error);
                        });
                } else {
                    this.cryphoSecurityApi.remove((key) => {
                        deferred.resolve();
                    }, (error) => {
                        deferred.reject(error);
                    }, key);
                }
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    }



    canUseSecureFileStorage(): angular.IPromise<boolean> {
        var deferred: ng.IDeferred<any> = this.$q.defer();
        this.ionic.Platform.ready(() => {
            deferred.resolve(this.ionic.Platform.isWebView() && (<any>window).cordova && this.canEncrypt());
        });
        return deferred.promise;
    }
}

declare var exports: any;

exports = angular.module("gl-ionic-secure-file-storage", [])
    .provider('secureFileStorageServiceConfig', SecureFileStorageServiceConfigProvider)
    .service("secureFileStorageService", SecureFileStorageService);

