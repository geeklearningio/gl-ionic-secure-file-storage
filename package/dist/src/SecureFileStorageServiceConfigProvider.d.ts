/**
 * Created by Vidailhet on 14/11/16.
 */
export declare class SecureFileStorageServiceConfigProvider {
    config: {
        namespace: string;
    };
    constructor();
    $get(): {
        namespace: string;
    };
    setNamespace(namespace: string): void;
}
