import { AppBarConfig } from './AppBarConfig';
import { IAppBarService } from "./IAppBarService";

class AppBarDirectiveController {
    public config: AppBarConfig;

    constructor(
        $element: ng.IAugmentedJQuery,
        $scope: angular.IScope,
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
        pipAppBar: IAppBarService
    ) {
        "ngInject";
        // Apply class and call resize
        $element.addClass('pip-appbar');
        $element.addClass('color-primary-bg');

        $scope.config = pipAppBar.config;

        $rootScope.$on('pipAppBarChanged', (event: ng.IAngularEvent, config: AppBarConfig) => {
            this.onAppBarChanged(event, config)
        });
    }

    public onAppBarChanged(event: ng.IAngularEvent, config: AppBarConfig) {
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
            controllerAs: '$ctrl'
        };
    }

    angular
        .module('pipAppBar')
        .directive('pipAppbar', appbarDirective);

})();