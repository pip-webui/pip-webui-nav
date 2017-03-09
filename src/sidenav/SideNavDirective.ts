'use strict';
import { ISideNavService, SideNavConfig } from './SideNavService';

import { SideNavStateNames, SideNavState, SideNavStateConfig } from './SideNavState';

// Prevent junk from going into typescript definitions


class SideNavDirectiveController {
    private _element: ng.IAugmentedJQuery;
    private _attrs: ng.IAttributes;
    private _injector: ng.auto.IInjectorService;
    private _scope: angular.IScope;
    private _log: ng.ILogService;
    private _rootScope: ng.IRootScopeService;
    private _pipSideNav: ISideNavService;

    private _pipMedia: pip.layouts.IMediaService;
    private _timeout: ng.ITimeoutService;

    private _isResizing: boolean;
    private _animationDuration: number;
    private _mainContainer: string; // todo add  to config
    private _bigWidth: number;

    private _middleWidth: number;
    private _smallWidth: number;
    private _mediaBreakpoints: pip.layouts.MediaBreakpoints;
    private _navState: SideNavStateConfig;

    private windowResize: Function;

    public sidenavState: SideNavState;

    constructor(
        $element: ng.IAugmentedJQuery,
        $attrs: ng.IAttributes,
        $injector: ng.auto.IInjectorService,
        $scope: angular.IScope,
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
        $timeout: ng.ITimeoutService,
        pipSideNav: ISideNavService,
        navConstant: any

    ) {
        "ngInject";

        this._element = $element;
        this._attrs = $attrs;
        this._scope = $scope;
        this._injector = $injector;
        this._log = $log;
        this._rootScope = $rootScope;
        this._timeout = $timeout;
        this._pipSideNav = pipSideNav;

        this._pipMedia = this._injector.has('pipMedia') ? <pip.layouts.IMediaService>this._injector.get('pipMedia') : null;

        this._mainContainer = navConstant.SIDENAV_CONTAINER;
        this._bigWidth = navConstant.SIDENAV_LARGE_WIDTH;
        this._middleWidth = navConstant.SIDENAV_MIDDLE_WIDTH;
        this._smallWidth = navConstant.SIDENAV_SMALL_WIDTH;
        this._isResizing = false;
        this._animationDuration = navConstant.SIDENAV_ANIMATION_DURATION;
        this._navState = new SideNavStateConfig();
        this._mediaBreakpoints = this.setBreakpoints();

        // Apply class and call resize
        this._element.addClass('pip-sticky-sidenav');

        let cleanupMainResized;
        let cleanupSideNavState;

        if (this._pipSideNav.config && this._pipSideNav.config.type != 'popup') {
            this._timeout(() => {
                this.setSideNaveState()
            }, 100);

            this.windowResize = _.debounce(() => { this.setSideNaveState(); }, 10);
            cleanupMainResized = this._rootScope.$on('pipMainResized', () => {
                this.windowResize();
            });
            cleanupSideNavState = this._rootScope.$on('pipSideNavState', ($event: ng.IAngularEvent, state: SideNavStateNames) => {
                this.onSideNavState($event, state)
            });
        } else {
            this._isResizing = false;
            this.sidenavState = null;
            this._timeout(() => {
                this.setState(SideNavStateNames.Toggle);
            }, 100);
        }

        let cleanupNavHeaderChanged: Function = this._rootScope.$on('pipNavIconClicked', () => {
            this.onNavIconClick();
        });
        let cleanupSideNavChanged: Function = this._rootScope.$on('pipSideNavChanged', ($event: ng.IAngularEvent, config: SideNavConfig) => { //navState
            this.onSideNavChanged($event, config)
        });

        this._scope.$on('$destroy', () => {
            if (angular.isFunction(cleanupNavHeaderChanged)) {
                cleanupNavHeaderChanged();
            }
            if (angular.isFunction(cleanupSideNavChanged)) {
                cleanupSideNavChanged();
            }
            if (angular.isFunction(cleanupMainResized)) {
                cleanupMainResized();
            }
            if (angular.isFunction(cleanupSideNavState)) {
                cleanupSideNavState();
            }
        });

    }

    private setBreakpoints(): pip.layouts.MediaBreakpoints {
        if (!this._pipMedia || !angular.isObject(this._pipMedia.breakpoints)) {
            return { xs: 639, sm: 959, md: 1024, lg: 1919 };
        } else {
            return this._pipMedia.breakpoints;
        }
    }

    private onSideNavChanged($event: ng.IAngularEvent, config: SideNavConfig): void {
        if (config && config.visible) {
            this._element.css('display', 'block');
        } else {
            this._element.css('display', 'none');
        }
    }

    private onNavIconClick(): void {
        this._pipSideNav.open();
    }

    private onSideNavState($event: ng.IAngularEvent, stateName: SideNavStateNames): void {
        if (angular.isString(stateName) && this._navState[stateName] !== undefined) {
            this.setState(stateName);
        }
    }

    private setSideNaveState(): void {
        if (this._pipSideNav.config && this._pipSideNav.config.type == 'popup') { return }

        if (this._isResizing) {
            this._timeout(() => { this.setSideNaveState() }, this._animationDuration); 

            return;
        }

        let mainWidth: number = $(this._mainContainer).innerWidth();
        let sideNavWidth: number = $('.pip-sticky-sidenav').innerWidth();
        let currentWidth: number = sideNavWidth ? sideNavWidth + 2 : 0; // add border width

        if (mainWidth + currentWidth < this._mediaBreakpoints.sm) {
            this.setState(SideNavStateNames.Toggle);
            return;
        }
        if (mainWidth + currentWidth < this._mediaBreakpoints.md) {
            this.setState(SideNavStateNames.Small);
            return;
        }
        if (mainWidth + currentWidth < this._mediaBreakpoints.lg) {
            this.setState(SideNavStateNames.Large);
            return;
        }
        this.setState(SideNavStateNames.XLarge);
    }

    private setState(stateName: SideNavStateNames) {
        if (this._isResizing) return;
        if (this.sidenavState && this.sidenavState.id == stateName) return;

        if (stateName != SideNavStateNames.Toggle) {
            this._element.removeClass('sidenav-mobile');
        }

        if (stateName != SideNavStateNames.Small) {
            this._element.removeClass('pip-sticky-nav-small');
        }

        if (stateName != SideNavStateNames.XLarge) {
            this._element.removeClass('sidenav-desktop');
        }

        if (stateName != SideNavStateNames.Large) {
            this._element.removeClass('sidenav-smalldesktop');
        }

        this._isResizing = true;
        if (stateName == SideNavStateNames.Toggle) {
            this._pipSideNav.close();
        }
        this.sidenavState = this._navState[String(stateName)];
        this._element.addClass(this.sidenavState.addClass);

        this._pipSideNav.state = this.sidenavState;

        // check sideNav State
        this._timeout(() => {
            this.setSideNaveState()
        }, 15);

        // complete animation
        this._timeout(() => {
            this._isResizing = false;
        }, this._animationDuration); //animationDuration

    }
}

(() => {
    function sideNavDirective() {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            templateUrl: 'sidenav/SideNav.html',
            controller: SideNavDirectiveController,
            controllerAs: 'vm'
        };
    }

    angular
        .module('pipSideNav')
        .directive('pipSidenav', sideNavDirective);

})();