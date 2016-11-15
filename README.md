# Introduction
This is a secure file storage package for Ionic apps.
It allows you to transparently use Cordova encryption plugins to encrypt and store safely your data on the phone.

# Requirements
- npm
- ionic
- cordova

#Installation
1) In your project folder, install this plugin using npm
`npm install git+https://git@github.com/geeklearningio/gl-ionic-secure-file-storage.git --save`

2) Install the [https://github.com/AppSecurityApi/com-intel-security-cordova-plugin](Intel Security Cordova Plugin)
`cordova plugin add com-intel-security-cordova-plugin --save`

3) Install the [https://github.com/Crypho/cordova-plugin-secure-storage](Crypho Cordova Plugin Secure Storage)
`cordova plugin add https://github.com/crypho/cordova-plugin-secure-storage.git --save`

Note:
We need both plugins, because the Intel plugin does not work on iOS9 and more. As specified in this issue: https://github.com/AppSecurityApi/com-intel-security-cordova-plugin/issues/9
And the Android version of the Crypho Plugin uses a system that does not work with big files to encrypt (several hundred kilos).


# How to configure
1) You can use the Typescript (`package/src/SecureFileStorageService.ts`) or the Javascript ((`package/dist/SecureFileStorageService.js`)) version of the Service.

2) In your application's main module, inject the dependency `gl-ionic-secure-file-storage` in order to use the service.
```
angular.module('mainModuleName', ['ionic', 'gl-ionic-secure-file-storage']){

}
```

3) Specify a namespace for the service. It will create a secure directory with this name on the device. In the angular configm inject the `SecureFileStorageServiceConfigProvider`and set the namespace like this:
`secureFileStorageServiceConfigProvider.setNamespace('test-app');`

# How to use
This service has a simple Key/Value System.
The service usage is pretty straightforward after that. Just use `write`, `read` and `delete` to write, read and delete your data.

# How to use the test app
the test app does not have the package as a dependency. It allows you to make changes directly to the package and use it in your test app.

You need to link the package locally.
At the root of the project (containing the `package` and the `test-app` folders) type this in the terminal:
```
npm link
```
It will add `gl-ionic-secure-file-storage` as a global npm module.

Then go in the test-app folder and type this:
```
npm link gl-ionic-secure-file-storage
```
It will link it to the test-app.

