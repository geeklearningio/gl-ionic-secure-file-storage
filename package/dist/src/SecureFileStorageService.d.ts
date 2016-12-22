export declare class SecureFileStorageService {
    private $q;
    private ionic;
    private $rootElement;
    private secureFileStorageServiceConfig;
    private securityApi;
    private cryphoSecurityApi;
    private namespace;
    constructor($q: angular.IQService, ionic: any, $rootElement: any, secureFileStorageServiceConfig: any);
    /**
     *  This function will set the namespace used to create a directory for the app.
     *  If the namespace was not set in the configuration using the SecureFileStorageServiceProvider, the service will try to set it as the app name.
     *  If the app name is not specified (the Angular app has been booted automatically, then throw an error)
     */
    setNamespace(): void;
    private setSecurityApis();
    private canEncrypt();
    private securityApiReady();
    write(key: string, data: any, iCloudSync?: boolean): angular.IPromise<any>;
    read(key: string): angular.IPromise<any>;
    clear(): angular.IPromise<any>;
    delete(key: string): angular.IPromise<any>;
    canUseSecureFileStorage(): angular.IPromise<boolean>;
}
