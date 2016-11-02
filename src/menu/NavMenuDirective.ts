'use strict';

import { INavMenuService, NavMenuChangedEvent, NavMenuConfig, NavMenuLink, NavMenuSection } from './NavMenuService';

// Prevent junk from going into typescript definitions
(() => {

class NavMenuDirectiveController {
    private _rootScope: ng.IRootScopeService;
    private _timeout: ng.ITimeoutService;
    private _location: ng.ILocationService;
    private _window: ng.IWindowService;
    private _sideNav: any;    
    private _state: any;
    private _navMenu: INavMenuService;

    public constructor(
        $scope: any,
        $element: any, 
        $rootScope: ng.IRootScopeService, 
        $window: ng.IWindowService, 
        $location: ng.ILocationService, 
        $timeout: ng.ITimeoutService, 
        $injector: any, 
        pipSideNav, 
        pipNavMenu: INavMenuService
    ) {
        "ngInject";

        this._rootScope = $rootScope;
        this._timeout = $timeout;
        this._location = $location;
        this._window = $window;
        this._sideNav = pipSideNav;
        this._navMenu = pipNavMenu;
        this._state = $injector.has('$state') ? $injector.get('$state') : null;

        // Apply class and call resize
        $element.addClass('pip-nav-menu');

        this.sections = $scope.sections || pipNavMenu.sections;
        pipNavMenu.sections = $scope.sections;

        this.defaultIcon = pipNavMenu.defaultIcon;

        $rootScope.$on(NavMenuChangedEvent, (event, config) => { 
            this.onConfigChanged(event, config); 
        });
    }

    public sections: NavMenuSection[];
    public defaultIcon: string;

    public isHidden(item) {
        return item && item.access && !item.access(item);
    }

    public isSectionEmpty(section: NavMenuSection) {
        _.each(section.links, (link) => {
            if (!this.isHidden(link))
                return false;
        });
        return true;
    }

    public onConfigChanged(event: ng.IAngularEvent, config: NavMenuConfig) {
        this.sections = config.sections;
        this.defaultIcon = config.defaultIcon;
    }

    public clickLink(event: any, link: NavMenuLink) {
        event.stopPropagation();
        this._sideNav.close();

        if (!link) return;

        if (link.href) {
            if (link.href.split('?')[0] != this._window.location.href.split('?')[0])
                this._timeout(() => { this._window.location.href = link.href; }, 300);
        }
        else if (link.url) {
            if (link.url.split(/[\s/?]+/)[1] != this._location.url().split(/[\s/?]+/)[1])
                this._timeout(() => { this._location.url(link.url); }, 300);
        }
        else if (link.state) {
            if (this._state != null && this._state.current.name != link.state) {
                this._timeout(() => {
                    this._state.go(link.state, link.stateParams);
                }, 300);
            }
        }
        else if (link.event)
            this._rootScope.$broadcast(link.event, link);
    }
}

function navMenuDirective() {
    return {
        restrict: 'EA',
        scope: {
            sections: '=pipSections'
        },
        replace: false,
        templateUrl: 'menu/NavMenu.html',
        controller: NavMenuDirectiveController,
        controllerAs: 'vm'
    };
}

angular
    .module('pipNavMenu')
    .directive('pipNavMenu', navMenuDirective);


})();