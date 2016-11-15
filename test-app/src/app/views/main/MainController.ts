'use strict';
import {SecureFileStorageService} from "gl-ionic-secure-file-storage/package/src/SecureFileStorageService";

export class MainController {
    isLoading: boolean;
    result: string;

    /** @ngInject */
    constructor(private secureFileStorageService: SecureFileStorageService) {
    }

    readSecureStorage() {
        this.isLoading = true;
        this.secureFileStorageService.read('mykey')
            .then((result: string) => {
                this.result = result;
                this.isLoading = false;
            });
    }

    writeSecureStorage() {
        this.isLoading = true;
        var data = 'encrypted data';
        this.secureFileStorageService.write('mykey', data)
            .then(() => {
                this.isLoading = false;
            });
    }
}
