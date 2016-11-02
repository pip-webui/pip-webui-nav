'use strict';

import { BreadcrumbItem } from './BreadcrumbService';
import { BreadcrumbConfig } from './BreadcrumbService';
import { IBreadcrumbService } from './BreadcrumbService';
import { BreadcrumbChangedEvent } from './BreadcrumbService';
import { BreadcrumbBackEvent } from './BreadcrumbService';
import { OpenSearchEvent } from '../search/SearchService'

// Prevent junk from going into typescript definitions
(() => {

class BreadcrumbController {
    private _rootScope: ng.IRootScopeService;
    private _window: ng.IWindowService;
    
    public config: BreadcrumbConfig;

    public constructor(
        $element: any, 
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

        $rootScope.$on(BreadcrumbChangedEvent, (event, config) => { this.onBreadcrumbChanged(event, config); });
        $rootScope.$on(BreadcrumbBackEvent, () => { this.onBreadcrumbBack(); });
    }

    private onBreadcrumbChanged(event, config) {
        this.config = config;
    }

    private onBreadcrumbBack() {
        let items = this.config.items;
        // Go to the last breadcrumb item
        if (_.isArray(items) && items.length > 0) {
            let item = items[items.length - 1];
            let backCallback = item.click;
            if (_.isFunction(backCallback)) 
                backCallback(item);
            else
                this._window.history.back();
        } else
            this._window.history.back();
    }

    public onClick(item: BreadcrumbItem) {
        if (_.isFunction(item.click))
            item.click(item);
    }

    public openSearch() {
        this._rootScope.$broadcast(OpenSearchEvent);
    }
}


function breadcrumbDirective() {
    return {
        restrict: 'E',
        scope: {},
        replace: false,
        templateUrl: 'breadcrumb/Breadcrumb.html',
        controller: BreadcrumbController,
        controllerAs: 'vm'
    };
}


angular.module('pipBreadcrumb')
    .directive('pipBreadcrumb', breadcrumbDirective);

})();