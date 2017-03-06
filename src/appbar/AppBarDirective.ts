'use strict';

// Prevent junk from going into typescript definitions

class AppBarDirectiveController {
    public config: pip.nav.AppBarConfig;

    constructor(
        $element: ng.IAugmentedJQuery,
        $scope: angular.IScope,
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
        pipAppBar: pip.nav.IAppBarService
    ) {
        "ngInject";
        // Apply class and call resize
        $element.addClass('pip-appbar');
        $element.addClass('color-primary-bg');

        $scope.config = pipAppBar.config;

        $rootScope.$on('pipAppBarChanged', (event: ng.IAngularEvent, config: pip.nav.AppBarConfig) => {
            this.onAppBarChanged(event, config)
        });
    }

    public onAppBarChanged(event: ng.IAngularEvent, config: pip.nav.AppBarConfig) {
        this.config = config;
    }
    
}

(() => {
    function appbarDirective() {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            templateUrl: 'appbar/AppBar.html',
            controller: AppBarDirectiveController,
            controllerAs: 'vm'
        };
    }

    angular
        .module('pipAppBar')
        .directive('pipAppbar', appbarDirective);

})();