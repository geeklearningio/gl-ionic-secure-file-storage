'use strict';
import {SecureFileStorageService} from "gl-ionic-secure-file-storage/package/src/SecureFileStorageService";

export class MainController {
    isLoading: boolean;
    result: string;

    /** @ngInject */
    constructor(
        private secureFileStorageService: SecureFileStorageService,
        private $ionicPopup: any) {
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

    clearSecureStorage() {
        this.isLoading = true;
        this.secureFileStorageService.clear()
            .then(() => {
                this.isLoading = false;
                this.$ionicPopup.alert({
                    title: 'Cache cleared',
                    template: 'The cache has been cleared'
                });
            }, (error) => {
                this.$ionicPopup.alert({
                    title: 'Warning',
                    template: 'This functionnality is not implemented yet on Android'
                });
            });
    }
}
