'use strict';

export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
        $stateProvider
            .state('main',
            {
                url: '/main',
                template: require('./views/main/main.html'),
                controller: 'MainController',
                controllerAs: 'main'
            });

        $urlRouterProvider.otherwise('/main');
    }
}
