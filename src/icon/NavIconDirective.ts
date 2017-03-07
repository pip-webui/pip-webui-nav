'use strict';

// Prevent junk from going into typescript definitions
export let OpenSideNavEvent = 'pipOpenSideNav';
export let NavIconClickedEvent = 'pipNavIconClicked';

class NavIconDirectiveController {
    // ($scope, $element, $attrs, $rootScope, $window, pipNavIcon) {
    private _element: ng.IAugmentedJQuery;
    private _attrs: ng.IAttributes;
    private _injector: ng.auto.IInjectorService;
    private _scope: angular.IScope;
    private _log: ng.ILogService;
    private _rootScope: ng.IRootScopeService;
    private _window: ng.IWindowService;
    private _location: ng.ILocationService;
    private _pipActions: pip.nav.IActionsService;
    private _pipTranslate: pip.services.ITranslateService

    public config: pip.nav.NavIconConfig;

    constructor(
        $element: ng.IAugmentedJQuery,
        $scope: angular.IScope,
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
        $window: ng.IWindowService,
        pipNavIcon: pip.nav.INavIconService
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

        $rootScope.$on('pipNavIconChanged', (event: ng.IAngularEvent, config: pip.nav.NavIconConfig) => {
            this.onNavIconChanged(event, config)
        });

    }

    public onNavIconChanged(event: ng.IAngularEvent, config: pip.nav.NavIconConfig) {
        this.config = config;
    }

    public onNavIconClick() {
        var breadcrumb, backCallback;

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
            controllerAs: 'vm'
        };
    }


    angular
        .module('pipNavIcon')
        .directive('pipNavIcon', navIconDirective);

})();