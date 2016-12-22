'use strict';
import {SecureFileStorageService} from "gl-ionic-secure-file-storage/package/src/SecureFileStorageService";

export class MainController {
    isLoading: boolean;
    result: string;

    /** @ngInject */
    constructor(private secureFileStorageService: SecureFileStorageService,
                private $ionicPopup: any) {
    }

    readSecureStorage() {
        this.isLoading = true;
        this.secureFileStorageService.read('mykey')
            .then((result: string) => {
                if (!result) {
                    this.$ionicPopup.alert({
                        title: 'Key does not exist',
                        template: 'The given key does not exist'
                    });
                }
                this.result = result;
                this.isLoading = false;
            }, (error) => {
                console.log(error);
            });
    }

    writeSecureStorage() {
        this.isLoading = true;
        var data = 'encrypted data';
        this.secureFileStorageService.write('mykey', data,false)
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
                this.isLoading = false;
            });
    }
}
