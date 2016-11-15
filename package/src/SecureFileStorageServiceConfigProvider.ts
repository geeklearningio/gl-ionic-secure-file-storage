/**
 * Created by Vidailhet on 14/11/16.
 */

export class SecureFileStorageServiceConfigProvider {
    public config = {
        namespace: ''
    };


    /* @ngInject */
    constructor() {

    }

    /* @ngInject */
    public $get() {
        return this.config;
    }

    public setNamespace(namespace: string) {
        this.config.namespace = namespace;
    }
}
