import { BreadcrumbConfig } from './breadcrumb_service';
import { IBreadcrumbService } from './breadcrumb_service';
import { BreadcrumbChangedEvent } from './breadcrumb_service';
import { BreadcrumbBackEvent } from './breadcrumb_service';

class BreadcrumbController {
    private _rootScope: ng.IRootScopeService;
    private _window: ng.IWindowService;
    
    public config: BreadcrumbConfig;

    public constructor(
        $scope: ng.IScope,
        $element: any, 
        $attrs: any, 
        $rootScope: ng.IRootScopeService,
        $window: ng.IWindowService,
        $state: ng.ui.IStateService,
        pipBreadcrumb: IBreadcrumbService
    ) {
        "ngInject";

        this._rootScope = $rootScope;
        this._window = $window;

        // Apply class and call resize
        $element.addClass('pip-breadcrumb');

        this.config = pipBreadcrumb.config;

        $rootScope.$on(BreadcrumbChangedEvent, this.onBreadcrumbChanged);
        $rootScope.$on(BreadcrumbBackEvent, this.onBreadcrumbBack);
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
    .module('pipBreadcrumb', [
        'ngMaterial',
        'pipNav.Templates',
        'pipNav.Translate',
        'pipBreadcrumb.Service'
    ])
    .directive('pipBreadcrumb', breadcrumbDirective);
