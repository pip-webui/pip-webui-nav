'use strict';

import { SimpleActionItem } from '../actions/ActionsService';
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
    private _location: ng.ILocationService;
    private _injector: ng.auto.IInjectorService;
    private originatorEv: Event;
    private _media: any;
    
    public config: BreadcrumbConfig;

    public constructor(
        $element: any, 
        $rootScope: ng.IRootScopeService,
        $window: ng.IWindowService,
        $state: ng.ui.IStateService,
        $location: ng.ILocationService,
        $injector: ng.auto.IInjectorService,
        pipBreadcrumb: IBreadcrumbService,
        $mdMedia: any
    ) {
        "ngInject";

        this._rootScope = $rootScope;
        this._window = $window;
        this._location = $location;
        this._injector = $injector;

        // Apply class and call resize
        $element.addClass('pip-breadcrumb');

        this.config = pipBreadcrumb.config;

        $rootScope.$on(BreadcrumbChangedEvent, (event, config) => { this.onBreadcrumbChanged(event, config); });
        $rootScope.$on(BreadcrumbBackEvent, () => { this.onBreadcrumbBack(); });

        let pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this._media = pipMedia !== undefined ? pipMedia : $mdMedia;
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
    
    public actionsVisible(item: BreadcrumbItem): boolean {

        return angular.isArray(item.subActions) && item.subActions.length > 1;
    }

    public onOpenMenu($mdOpenMenu, event: Event) {
        this.originatorEv = event;
        $mdOpenMenu(this.originatorEv);
    }

    public onSubActionClick(action: SimpleActionItem): void { 
        if (!action || action.divider) {
            return;
        }

        if (action.click) {
            action.click(action);
            return;
        }

        if (action.href) {
            this._window.location.href = action.href;
            return;
        }

        if (action.url) {
            this._location.url(action.url);
            return;
        }

        if (action.state) {
            if (this._injector.has('$state')) {
                let $state = this._injector.get('$state') as ng.ui.IStateService
                $state.go(action.state, action.stateParams);
            }
            return;
        }

        if (action.event) {
            this._rootScope.$broadcast(action.event);
            this.originatorEv = null;
        } else {
            // Otherwise raise notification
            this._rootScope.$broadcast('pipActionClicked', action.name);
            this.originatorEv = null;
        }
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