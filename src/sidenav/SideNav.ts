import { ISideNavService } from './ISideNavService';
import { SideNavStateNames, SideNavState, SideNavStateConfig, SideNavConfig } from './SideNavState';

class SideNavController implements ISideNavBindings {
    private _pipMedia: pip.layouts.IMediaService;
    private _isResizing: boolean;
    private _animationDuration: number;
    private _mainContainer: string; // todo add  to config
    private _bigWidth: number;
    private _middleWidth: number;
    private _smallWidth: number;
    private _mediaBreakpoints: pip.layouts.MediaBreakpoints;
    private _navState: SideNavStateConfig;
    private cleanupMainResized: Function;
    private cleanupSideNavState: Function;
    private cleanupNavHeaderChanged: Function;
    private cleanupSideNavChanged: Function;
    private windowResize: Function;

    public sidenavState: SideNavState;

    constructor(
        private $element: ng.IAugmentedJQuery,
        $attrs: ng.IAttributes,
        $injector: ng.auto.IInjectorService,
        private $scope: angular.IScope,
        private $rootScope: ng.IRootScopeService,
        private $timeout: ng.ITimeoutService,
        private pipSideNav: ISideNavService,
        navConstant: any

    ) {
        "ngInject";

        this._pipMedia = $injector.has('pipMedia') ? <pip.layouts.IMediaService>$injector.get('pipMedia') : null;

        this._mainContainer = navConstant.SIDENAV_CONTAINER;
        this._bigWidth = navConstant.SIDENAV_LARGE_WIDTH;
        this._middleWidth = navConstant.SIDENAV_MIDDLE_WIDTH;
        this._smallWidth = navConstant.SIDENAV_SMALL_WIDTH;
        this._isResizing = false;
        this._animationDuration = navConstant.SIDENAV_ANIMATION_DURATION;
        this._navState = new SideNavStateConfig();
        this._mediaBreakpoints = this.setBreakpoints();

        // Apply class and call resize
        this.$element.addClass('pip-sticky-sidenav');

        if (this.pipSideNav.config && this.pipSideNav.config.type != 'popup') {
            this.$timeout(() => {
                this.setSideNaveState()
            }, 100);

            this.windowResize = _.debounce(() => { this.setSideNaveState(); }, 10);
            this.cleanupMainResized = this.$rootScope.$on('pipMainResized', () => {
                this.windowResize();
            });
            this.cleanupSideNavState = this.$rootScope.$on('pipSideNavState', ($event: ng.IAngularEvent, state: SideNavStateNames) => {
                this.onSideNavState($event, state)
            });
        } else {
            this._isResizing = false;
            this.sidenavState = null;
            this.$timeout(() => {
                if (this.pipSideNav.config.backdrop == false) {
                    this.$element.addClass('pip-sidenav-hide-backdrop');
                } else {
                    this.$element.removeClass('pip-sidenav-hide-backdrop');
                }
                this.setState(SideNavStateNames.Toggle);
            }, 100);
        }

        this.cleanupNavHeaderChanged = this.$rootScope.$on('pipNavIconClicked', () => {
            this.onNavIconClick();
        });
        this.cleanupSideNavChanged = this.$rootScope.$on('pipSideNavChanged', ($event: ng.IAngularEvent, config: SideNavConfig) => { //navState
            this.onSideNavChanged($event, config)
        });

    }

    public $onDestroy() {
        if (angular.isFunction(this.cleanupNavHeaderChanged)) {
            this.cleanupNavHeaderChanged();
        }
        if (angular.isFunction(this.cleanupSideNavChanged)) {
            this.cleanupSideNavChanged();
        }
        if (angular.isFunction(this.cleanupMainResized)) {
            this.cleanupMainResized();
        }
        if (angular.isFunction(this.cleanupSideNavState)) {
            this.cleanupSideNavState();
        }
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
            this.$element.css('display', 'block');
        } else {
            this.$element.css('display', 'none');
        }
    }

    private onNavIconClick(): void {
        this.pipSideNav.open();
    }

    private onSideNavState($event: ng.IAngularEvent, stateName: SideNavStateNames): void {
        if (angular.isString(stateName) && this._navState[stateName] !== undefined) {
            this.setState(stateName);
        }
    }

    private setSideNaveState(): void {
        if (this.pipSideNav.config && this.pipSideNav.config.type == 'popup') { return }

        if (this._isResizing) {
            this.$timeout(() => { this.setSideNaveState() }, this._animationDuration);

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
            this.$element.removeClass('sidenav-mobile');
        }

        if (stateName != SideNavStateNames.Small) {
            this.$element.removeClass('pip-sticky-nav-small');
        }

        if (stateName != SideNavStateNames.XLarge) {
            this.$element.removeClass('sidenav-desktop');
        }

        if (stateName != SideNavStateNames.Large) {
            this.$element.removeClass('sidenav-smalldesktop');
        }

        this._isResizing = true;
        /*if (stateName == SideNavStateNames.Toggle) {
            this.pipSideNav.close();
        }*/
        this.sidenavState = this._navState[String(stateName)];
        this.$element.addClass(this.sidenavState.addClass);

        this.pipSideNav.state = this.sidenavState;

        // check sideNav State
        this.$timeout(() => {
            this.setSideNaveState()
        }, 15);

        // complete animation
        this.$timeout(() => {
            this._isResizing = false;
        }, this._animationDuration); //animationDuration

    }
}


interface ISideNavBindings {
    [key: string]: any;
    sidenavState: any;
}

const SideNavBindings: ISideNavBindings = {
    sidenavState: '=?'
};

(() => {

    const sideNav: ng.IComponentOptions = {
        transclude: true,
        bindings: SideNavBindings,
        templateUrl: 'sidenav/SideNav.html',
        controller: SideNavController
    };

    angular
        .module('pipSideNav')
        .component('pipSidenav', sideNav);

})();