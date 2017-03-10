
import { OpenSideNavEvent } from '../sidenav/SideNavEvents';
import {  INavIconService, NavIconConfig } from "./NavIconService";
// Prevent junk from going into typescript definitions
export let NavIconClickedEvent = 'pipNavIconClicked';

class NavIconDirectiveController {
    private _element: ng.IAugmentedJQuery;
    private _scope: angular.IScope;
    private _log: ng.ILogService;
    private _rootScope: ng.IRootScopeService;
    private _window: ng.IWindowService;

    public config: NavIconConfig;

    constructor(
        $element: ng.IAugmentedJQuery,
        $scope: angular.IScope,
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
        $window: ng.IWindowService,
        pipNavIcon: INavIconService
    ) {
        "ngInject";

        this._element = $element;
        this._scope = $scope;
        this._log = $log;
        this._rootScope = $rootScope;
        this._window = $window;

        // Apply class and call resize
        $element.addClass('pip-nav-icon');

        this.config = pipNavIcon.config;

        $rootScope.$on('pipNavIconChanged', (event: ng.IAngularEvent, config: NavIconConfig) => {
            this.onNavIconChanged(event, config)
        });

    }

    public onNavIconChanged(event: ng.IAngularEvent, config: NavIconConfig): void {
        this.config = config;
    }

    public onNavIconClick(): void {
        if (_.isFunction(this.config.click)) {
            // Execute nav icon callback
            this.config.click();
        } else if (this.config.event) {
            this._rootScope.$broadcast(this.config.event);
        } else if (this.config.type == 'menu') {
            this._rootScope.$broadcast(OpenSideNavEvent);
        } else if (this.config.type == 'back') {
            this._window.history.back();
        } else {
            this._rootScope.$broadcast(NavIconClickedEvent);
        }
    }

}

(() => {
    function navIconDirective() {
        return {
            restrict: 'E',
            scope: {
                type: '=pipType',
                imageUrl: '=pipImageUrl',
                icon: '=pipIcon'
            },
            replace: false,
            templateUrl: 'icon/NavIcon.html',
            controller: NavIconDirectiveController,
            controllerAs: '$ctrl'
        };
    }


    angular
        .module('pipNavIcon')
        .directive('pipNavIcon', navIconDirective);

})();