import { SimpleActionItem } from '../actions/ActionsService';
import { BreadcrumbItem } from './BreadcrumbConfig';
import { BreadcrumbConfig } from './BreadcrumbConfig';
import { IBreadcrumbService } from './IBreadcrumbService';
import { BreadcrumbChangedEvent } from './BreadcrumbService';
import { BreadcrumbBackEvent } from './BreadcrumbService';
import { OpenSearchEvent } from '../search/SearchAngularEvents'

class BreadcrumbController {
    private _rootScope: ng.IRootScopeService;
    private _window: ng.IWindowService;
    private _location: ng.ILocationService;
    private _injector: ng.auto.IInjectorService;
    private originatorEv: Event;
    private _media: any;

    public config: BreadcrumbConfig;

    public constructor(
        $element: ng.IAugmentedJQuery,
        $rootScope: ng.IRootScopeService,
        $window: ng.IWindowService,
        $state: ng.ui.IStateService,
        $location: ng.ILocationService,
        $injector: ng.auto.IInjectorService,
        pipBreadcrumb: IBreadcrumbService,
        $mdMedia: angular.material.IMedia
    ) {
        "ngInject";

        this._rootScope = $rootScope;
        this._window = $window;
        this._location = $location;
        this._injector = $injector;

        // Apply class and call resize
        $element.addClass('pip-breadcrumb');

        this.config = pipBreadcrumb.config;

        $rootScope.$on(BreadcrumbChangedEvent, (event: ng.IAngularEvent, config: BreadcrumbConfig) => {
            this.onBreadcrumbChanged(event, config);
        });
        $rootScope.$on(BreadcrumbBackEvent, () => { this.onBreadcrumbBack(); });

        let pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this._media = pipMedia !== undefined ? pipMedia : $mdMedia;
    }

    private onBreadcrumbChanged(event: ng.IAngularEvent, config: BreadcrumbConfig): void {
        this.config = config;
    }

    private onBreadcrumbBack(): void {
        let items: BreadcrumbItem[] = this.config.items;
        // Go to the last breadcrumb item
        if (_.isArray(items) && items.length > 0) {
            let item: BreadcrumbItem = items[items.length - 1];
            if (_.isFunction(item.click)) {
                item.click(item);
            } else {
                this._window.history.back();
            }
        } else {
            this._window.history.back();
        }
    }

    public onClick(item: BreadcrumbItem): void {
        if (_.isFunction(item.click)) {
            item.click(item);
        }
    }

    public openSearch(): void {
        this._rootScope.$broadcast(OpenSearchEvent);
    }

    public actionsVisible(item: BreadcrumbItem): boolean {

        return angular.isArray(item.subActions) && item.subActions.length > 1;
    }

    public onOpenMenu($mdOpenMenu: Function, event: Event): void {
        this.originatorEv = event;
        $mdOpenMenu(this.originatorEv);
    }

    public onSubActionClick(action: SimpleActionItem): void {
        if (!action || action.divider) {
            return;
        }

        if (_.isFunction(action.click)) {
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
                let _state: angular.ui.IStateService = this._injector.get('$state') as ng.ui.IStateService
                _state.go(action.state, action.stateParams);
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

const breadcrumb: ng.IComponentOptions = {
    bindings: {},
    templateUrl: 'breadcrumb/Breadcrumb.html',
    controller: BreadcrumbController
}

angular.module('pipBreadcrumb')
    .component('pipBreadcrumb', breadcrumb);