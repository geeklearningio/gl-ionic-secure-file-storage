'use strict';
import {SecureFileStorageServiceConfigProvider} from "gl-ionic-secure-file-storage/package/src/SecureFileStorageServiceConfigProvider";

export class Config {
    /** @ngInject */
    constructor(secureFileStorageServiceConfigProvider: SecureFileStorageServiceConfigProvider) {

        // you must define a namespace for the service. It will create a directory with this name
        secureFileStorageServiceConfigProvider.setNamespace('test-app');
    }
}
