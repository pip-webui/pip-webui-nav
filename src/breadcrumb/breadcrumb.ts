/// <reference path="../../typings/tsd.d.ts" />

module pip.nav {

    class BreadcrumbController {
        private _rootScope: ng.IRootScopeService;
        private _window: ng.IWindowService;
        public config: any;

        public constructor($scope, $element, $attrs, $rootScope, $window, $state, pipBreadcrumb) {
            "ngInject";

            this._rootScope = $rootScope;
            this._window = $window;

            // Apply class and call resize
            $element.addClass('pip-breadcrumb');

            this.config = pipBreadcrumb.config();

            $rootScope.$on('pipBreadcrumbChanged', this.onBreadcrumbChanged);
            $rootScope.$on('pipBreadcrumbBack', this.onBreadcrumbBack);
        }

        private onBreadcrumbChanged(event, config) {
            this.config = config;
        }

        private onBreadcrumbBack() {
            let items = this.config.items;
            // Go to the last breadcrumb item
            if (_.isArray(items) && items.length > 0) {
                let backCallback = (<any>items[items.length - 1]).click;
                if (_.isFunction(backCallback)) 
                    backCallback();
                else
                    this._window.history.back();
            } else
                this._window.history.back();
        }

        public onBreadcrumbClick(item) {
            if (_.isFunction(item.click))
                item.click(item);
        }

        public onSearchOpen() {
            this._rootScope.$broadcast('pipSearchOpen');
        }
    }

    function breadcrumbDirective() {
        return {
            restrict: 'E',
            scope: {},
            replace: false,
            templateUrl: function (element, attr) {
                return 'breadcrumb/breadcrumb.html';
            },
            controller: BreadcrumbController,
            controllerAs: 'vm'
        };
    }

    angular
        .module('pipBreadcrumb', ['ngMaterial', 'pipNav.Templates', 'pipNav.Translate', // 'pipBreadcrumb.Service'
        ])
        .directive('pipBreadcrumb', breadcrumbDirective);

}
