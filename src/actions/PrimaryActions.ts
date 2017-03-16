import { IActionsService, ActionItem, ActionsConfig } from "./IActionsService";

class PrimaryActionsController {
    private _pipTranslate: pip.services.ITranslateService

    public config: ActionsConfig;

    public localActions: ActionItem[];
    public globalActions: ActionItem[];
    public originatorEv: any;

    constructor(
        private $element: ng.IAugmentedJQuery,
        private $injector: ng.auto.IInjectorService,
        private $scope: angular.IScope,
        private $rootScope: ng.IRootScopeService,
        private $window: ng.IWindowService,
        private $location: ng.ILocationService,
        private pipActions: IActionsService,
        $log: ng.ILogService,
        $attrs: ng.IAttributes

    ) {
        "ngInject";


        this._pipTranslate = this.$injector.has('pipTranslate') ? <pip.services.ITranslateService>this.$injector.get('pipTranslate') : null;
        if (this._pipTranslate && this._pipTranslate.setTranslations) {
            this._pipTranslate.setTranslations('en', {
                DOCUMENTS_ATTACHED: 'document(s) attached',
                ERROR_DOCUMENTS_LOADED: 'Error: <%= error_number %> document(s) are not loaded'
            });
            this._pipTranslate.setTranslations('ru', {
                DOCUMENTS_ATTACHED: 'документов добавлено',
                ERROR_DOCUMENTS_LOADED: 'Ошибка: <%= error_number %> документ(ов) не загружено'

            });
        }

        // Apply class and call resize
        this.$element.addClass('pip-primary-actions');

        this.$rootScope.$on('pipActionsChanged', (event: ng.IAngularEvent, config: ActionsConfig) => {
            this.onActionsChanged(event, config);
        });

    }
    
    public $onInit() {
        if (this.localActions) {
            this.pipActions.primaryLocalActions = this.localActions;
        }

        if (this.globalActions) {
            this.pipActions.primaryGlobalActions = this.globalActions;
        }

        this.config = this.pipActions.config;
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

    public clickAction(action: ActionItem, $mdOpenMenu: Function): void {
        if (!action || action.divider) {
            return;
        }

        if (action.subActions) {
            $mdOpenMenu(this.originatorEv);
            return;
        }

        if (_.isFunction(action.click)) {
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
            if (this.$injector.has('this._state')) {
                let _state: angular.ui.IStateService = this.$injector.has('pipTranslate') ? <angular.ui.IStateService>this.$injector.get('$state') : null ;
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


interface IPrimaryActionsBindings {
    [key: string]: any;

    localActions: any,
    globalActions: any,
    originatorEv: any
}

const PrimaryActionsBindings: IPrimaryActionsBindings = {
    localActions: '<pipLocalActions',
    globalActions: '<pipGlobalActions',
    originatorEv: '<?pipOriginatorEv'
}

class PrimaryActionsChanges implements ng.IOnChangesObject, IPrimaryActionsBindings {
    [key: string]: ng.IChangesObject<any>;

    localActions: ng.IChangesObject<ActionItem[]>;
    globalActions: ng.IChangesObject<ActionItem[]>;
    originatorEv: ng.IChangesObject<any>;
}


(() => {
    const primaryActions: ng.IComponentOptions = {
        bindings: PrimaryActionsBindings,
        templateUrl: 'actions/PrimaryActions.html',
        controller: PrimaryActionsController
    };


    angular
        .module('pipActions')
        .component('pipPrimaryActions', primaryActions);

})();