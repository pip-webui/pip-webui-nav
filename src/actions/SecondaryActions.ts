import { IActionsService, ActionItem, ActionsConfig } from "./IActionsService";

class SecondaryActionsController {
    private pipTranslate: pip.services.ITranslateService
    private _menuFn: Function;
    private originatorEv: any;

    public config: ActionsConfig;
    public localActions: ActionItem[];
    public globalActions: ActionItem[];

    constructor(
        private $attrs: ng.IAttributes,
        private $injector: ng.auto.IInjectorService,
        private $log: ng.ILogService,
        private $rootScope: ng.IRootScopeService,
        private $window: ng.IWindowService,
        private $location: ng.ILocationService,
        private pipActions: IActionsService,
        $element: ng.IAugmentedJQuery,
    ) {
        "ngInject";

        // Apply class and call resize
        $element.addClass('pip-secondary-actions');

        if (this.localActions) {
            pipActions.secondaryLocalActions = this.localActions;
        }

        if (this.globalActions) {
            pipActions.secondaryGlobalActions = this.globalActions;
        }

        this.config = pipActions.config;

        this.$rootScope.$on('pipActionsChanged', (event: ng.IAngularEvent, config: ActionsConfig) => {
            this.onActionsChanged(event, config);
        });

        this.$rootScope.$on('pipSecondaryActionsOpen', () => {
            this.onActionsMenuOpen();
        });

    }

    public getMenu(menuFn: Function): void {
         this._menuFn = menuFn;
    }

    public onActionsMenuOpen(): void {
        this._menuFn();
    }

    public openMenu($mdOpenMenu: Function, ev: ng.IAngularEvent): void {
        this.originatorEv = ev;
        $mdOpenMenu(ev);
    }

    private onActionsChanged(event: ng.IAngularEvent, config: ActionsConfig) {
        this.config = config;
    }

    public isHidden(action: ActionItem): boolean {
        // Todo: Check breakpoints here
        return action.access && !action.access(action);
    }

    public actionCount(action: ActionItem): string {
        if (action.count === null || action.count <= 0) {
            return '';
        }
        if (action.count > 99) {
            return '!';
        }

        return String(action.count);
    }


    private calcActions(actions: ActionItem[]): number {
        let count: number = 0;

        _.each(actions, (action: ActionItem) => {
            if (!this.isHidden(action)) {
                count++;
            }
        });

        return count;
    }

    public secondaryActionsVisible() {
        return this.calcActions(this.config.secondaryGlobalActions) > 0 ||
            this.calcActions(this.config.secondaryLocalActions) > 0;
    }

    public secondaryDividerVisible() {
        return this.calcActions(this.config.secondaryGlobalActions) > 0 &&
            this.calcActions(this.config.secondaryLocalActions) > 0;
    }

    public clickAction(action: ActionItem, $mdOpenMenu: Function): void {
        if (!action || action.divider) {
            return;
        }

        // todo: do not supported into ActionItem
        // if (action.close) {
        //     this.$scope.originatorEv = null;
        // }

        if (action.subActions) {
            $mdOpenMenu(this.originatorEv);
            return;
        }

        if (action.click) {
            action.click(action);
            return;
        }

        if (action.href) {
            this.$window.location.href = action.href;
            return;
        }

        if (action.url) {
            this.$location.url(action.url);
            return;
        }

        if (action.state) {
            if (this.$injector.has('$state')) {
                let _state: angular.ui.IStateService = this.$injector.has('pipTranslate') ? <angular.ui.IStateService>this.$injector.get('$state') : null;
                if (_state) {
                    _state.go(action.state, action.stateParams);
                }
            }
            return;
        }

        if (action.event) {
            this.$rootScope.$broadcast(action.event);
        } else {
            // Otherwise raise notification
            this.$rootScope.$broadcast('pipActionClicked', action.name);
        }
    }

}


interface ISecondaryActionsBindings {
    [key: string]: any;

    localActions: any,
    globalActions: any
}

const SecondaryActionsBindings: ISecondaryActionsBindings = {
    localActions: '<pipLocalActions',
    globalActions: '<pipGlobalActions'
}

class SecondaryActionsChanges implements ng.IOnChangesObject, ISecondaryActionsBindings {
    [key: string]: ng.IChangesObject<any>;

    localActions: ng.IChangesObject<ActionItem[]>;
    globalActions: ng.IChangesObject<ActionItem[]>;
}


(() => {
    const secondaryActions: ng.IComponentOptions = {
        bindings: SecondaryActionsBindings,
        templateUrl: 'actions/SecondaryActions.html',
        controller: SecondaryActionsController
    };

    angular
        .module('pipActions')
        .component('pipSecondaryActions', secondaryActions);

})();
