// Prevent junk from going into typescript definitions
import { ISideNavService, SideNavConfig } from '../sidenav/SideNavService';
import { NavMenuConfig, NavMenuSection, INavMenuService, NavMenuLink } from './NavMenuService';
import { SideNavStateNames, SideNavState } from '../sidenav/SideNavState';

(() => {
    class NavMenuDirectiveController {
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;
        private _injector: ng.auto.IInjectorService;
        private _scope: angular.IScope;
        private _log: ng.ILogService;
        private _rootScope: ng.IRootScopeService;
        private _pipSideNav: ISideNavService;
        private _pipNavMenu: INavMenuService;
        private _state: angular.ui.IStateService;
        private _window: ng.IWindowService;
        private _location: ng.ILocationService;
        private _pipMedia: pip.layouts.IMediaService;
        private _timeout: ng.ITimeoutService;
        private _animationDuration;
        private _pipSideNavElement: ng.IAugmentedJQuery;

        public sections: NavMenuSection[];
        public defaultIcon: string;
        public isCollapsed: boolean;
        public expanded: boolean;
        public expandedButton: boolean;
        public sideNavState: SideNavState;

        constructor(
            $element: ng.IAugmentedJQuery,
            $attrs: ng.IAttributes,
            $injector: ng.auto.IInjectorService,
            $scope: angular.IScope,
            $log: ng.ILogService,
            $window: ng.IWindowService,
            $location: ng.ILocationService,
            $rootScope: ng.IRootScopeService,
            $timeout: ng.ITimeoutService,
            pipSideNav: ISideNavService,
            pipNavMenu: INavMenuService,
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
            this._window = $window;
            this._location = $location;
            this._pipSideNav = pipSideNav;
            this._pipNavMenu = pipNavMenu;

            this._state = this._injector.has('$state') ? <angular.ui.IStateService>this._injector.get('$state') : null;

            this._animationDuration = navConstant.SIDENAV_ANIMATION_DURATION,
                this._pipSideNavElement = $element.parent().parent();
            // Apply class and call resize
            this._element.addClass('pip-sticky-nav-menu');

            this.sections = this._scope['sections'] || this._pipNavMenu.sections;
console.log('sections', this.sections);

            this.setCollapsible();

            this.defaultIcon = this._pipNavMenu.defaultIcon;

            this.onStateChanged(null, this._pipSideNav.state);

            let cleanupNavMenuChanged: Function = this._rootScope.$on('pipNavMenuChanged', ($event: ng.IAngularEvent, config: NavMenuConfig) => { //navState
                this.onConfigChanged($event, config)
            });
            let cleanupSideNavStateChanged: Function = this._rootScope.$on('pipSideNavStateChanged', ($event: ng.IAngularEvent, state: SideNavState) => { //navState
                this.onStateChanged($event, state)
            });

            $scope.$on('$destroy', () => {
                if (angular.isFunction(cleanupNavMenuChanged)) {
                    cleanupNavMenuChanged();
                }
                if (angular.isFunction(cleanupSideNavStateChanged)) {
                    cleanupSideNavStateChanged();
                }
            });

        }

        private setCollapsible(): void {
            var collapsed: boolean;
            if (angular.isFunction(this._scope['collapsed'])) {
                collapsed = this._scope['collapsed']();
            } else {
                collapsed = this._scope['collapsed'] !== false && this._scope['collapsed'] !== 'false';
            }

            this.isCollapsed = collapsed;
        }

        public onExpand(): void {
            if (!this.isCollapsed) { return }

            this.expanded = !this.expanded;

            if (this.expanded) {
                this._pipSideNavElement.removeClass('pip-sticky-nav-small');
            } else {
                this._pipSideNavElement.addClass('pip-sticky-nav-small');
            }
            this._rootScope.$emit('pipNavExpanded', this.expanded);
        }

        public isHidden(item: NavMenuLink): boolean {
            return item && item.access && !item.access(item);
        }

        public isSectionEmpty(linkCollection: NavMenuLink[]): boolean {
            var result = true;
            _.each(linkCollection, (link: NavMenuLink) => {
                if (!this.isHidden(link)) {
                    result = false;
                }
            });

            return result;
        }

        private onConfigChanged($event: ng.IAngularEvent, config: NavMenuConfig): void {
            if (!config) return;
            this.sections = config.sections;

console.log('sections config', this.sections, config);            
        }

        private onStateChanged(event: ng.IAngularEvent, state: SideNavState): void {
            // SS> You shall not set it into the menu state. Instead it shall be controlled by the state of Sidenav
            if (!state) return;

            this.isCollapsed = state.expand;
            this.expanded = state.isExpanded;
            this.expandedButton = state.expandedButton;

            this.sideNavState = state;
        }

        public isActive(link: NavMenuLink): boolean {
            if (link.parentState) {

                if (this._state != null && this._state.includes(link.parentState)) {
                    return true;
                }
            } else if (link.state) {
                if (this._state != null && this._state.includes(link.state)) {
                    return true;
                }
            } else if (link.href) {
                if (link.href.split('?')[0] === this._window.location.href.split('?')[0]) {
                    return true;
                }
            } else if (link.url) {
                if (link.url.split(/[\s/?]+/)[1] === this._location.url().split(/[\s/?]+/)[1]) {
                    return true;
                }
            }

            return false;
        }

        public clickLink(event: ng.IAngularEvent, link: NavMenuLink): void {
            event.stopPropagation();

            if (!link) {
                this._pipSideNav.close();

                return;
            }

            if (link.href) {
                if (link.href.split('?')[0] === this._window.location.href.split('?')[0]) {
                    this._pipSideNav.close();

                    return;
                }

                this._pipSideNav.close();
                this._timeout(() => {
                    this._window.location.href = link.href;
                }, this._animationDuration);

                return;
            } else if (link.url) {
                if (link.url.split(/[\s/?]+/)[1] === this._location.url().split(/[\s/?]+/)[1]) {
                    this._pipSideNav.close();
                    return;
                }

                this._pipSideNav.close();
                this._timeout(() => {
                    this._location.url(link.url);
                }, this._animationDuration);

                return;
            } else if (link.state) {
                if (this._state != null && this._state.current.name === link.state) {
                    this._pipSideNav.close();

                    return;
                }

                this._pipSideNav.close();
                this._timeout(() => {
                    this._state.go(link.state, link.stateParams);
                }, this._animationDuration);

                return;
            } else if (link.event) {
                this._rootScope.$broadcast(link.event, link);
            }


            this._pipSideNav.close();
        }
    }


    function navMenuDirective() {
        return {
            restrict: 'EA',
            scope: {
                sections: '=?pipSections',
                collapsed: '=?pipCollapsed'
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