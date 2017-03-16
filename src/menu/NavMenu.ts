import { ISideNavService} from '../sidenav/ISideNavService';
import { INavMenuService} from './INavMenuService';
import { SideNavStateNames, SideNavState, SideNavConfig } from '../sidenav/SideNavState';
import { NavMenuConfig, NavMenuSection, NavMenuLink } from './NavMenuConfig';

(() => {
    class NavMenuController {
        private _state: angular.ui.IStateService;
        private _pipMedia: pip.layouts.IMediaService;
        private _animationDuration;
        private _pipSideNavElement: ng.IAugmentedJQuery;

        public sections: NavMenuSection[];
        public defaultIcon: string;
        public isCollapsed: boolean;
        public expanded: boolean;
        public expandedButton: boolean;
        public sideNavState: SideNavState;

        constructor(
            private $scope: angular.IScope,
            private $window: ng.IWindowService,
            private $location: ng.ILocationService,
            private $rootScope: ng.IRootScopeService,
            private $timeout: ng.ITimeoutService,
            private pipSideNav: ISideNavService,
            private pipNavMenu: INavMenuService,

            $element: ng.IAugmentedJQuery,
            $injector: ng.auto.IInjectorService,
            navConstant: any

        ) {
            "ngInject";

            this._state = $injector.has('$state') ? <angular.ui.IStateService>$injector.get('$state') : null;

            this._animationDuration = navConstant.SIDENAV_ANIMATION_DURATION,
                this._pipSideNavElement = $element.parent().parent();
            // Apply class and call resize
            $element.addClass('pip-sticky-nav-menu');

            this.sections = this.$scope['sections'] || this.pipNavMenu.sections;

            this.setCollapsible();

            this.defaultIcon = this.pipNavMenu.defaultIcon;

            this.onStateChanged(null, this.pipSideNav.state);

            let cleanupNavMenuChanged: Function = this.$rootScope.$on('pipNavMenuChanged', ($event: ng.IAngularEvent, config: NavMenuConfig) => { //navState
                this.onConfigChanged($event, config)
            });
            let cleanupSideNavStateChanged: Function = this.$rootScope.$on('pipSideNavStateChanged', ($event: ng.IAngularEvent, state: SideNavState) => { //navState
                this.onStateChanged($event, state)
            });

            this.$scope.$on('$destroy', () => {
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
            if (angular.isFunction(this.$scope['collapsed'])) {
                collapsed = this.$scope['collapsed']();
            } else {
                collapsed = this.$scope['collapsed'] !== false && this.$scope['collapsed'] !== 'false';
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
            this.$rootScope.$emit('pipNavExpanded', this.expanded);
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
                if (link.href.split('?')[0] === this.$window.location.href.split('?')[0]) {
                    return true;
                }
            } else if (link.url) {
                if (link.url.split(/[\s/?]+/)[1] === this.$location.url().split(/[\s/?]+/)[1]) {
                    return true;
                }
            }

            return false;
        }

        public clickLink(event: ng.IAngularEvent, link: NavMenuLink): void {
            event.stopPropagation();

            if (!link) {
                this.pipSideNav.close();

                return;
            }

            if (link.href) {
                if (link.href.split('?')[0] === this.$window.location.href.split('?')[0]) {
                    this.pipSideNav.close();

                    return;
                }

                this.pipSideNav.close();
                this.$timeout(() => {
                    this.$window.location.href = link.href;
                }, this._animationDuration);

                return;
            } else if (link.url) {
                if (link.url.split(/[\s/?]+/)[1] === this.$location.url().split(/[\s/?]+/)[1]) {
                    this.pipSideNav.close();
                    return;
                }

                this.pipSideNav.close();
                this.$timeout(() => {
                    this.$location.url(link.url);
                }, this._animationDuration);

                return;
            } else if (link.state) {
                if (this._state != null && this._state.current.name === link.state) {
                    this.pipSideNav.close();

                    return;
                }

                this.pipSideNav.close();
                this.$timeout(() => {
                    this._state.go(link.state, link.stateParams);
                }, this._animationDuration);

                return;
            } else if (link.event) {
                this.$rootScope.$broadcast(link.event, link);
            }

            this.pipSideNav.close();
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
            controller: NavMenuController,
            controllerAs: '$ctrl'
        };
    }

    angular
        .module('pipNavMenu')
        .directive('pipNavMenu', navMenuDirective);

})();