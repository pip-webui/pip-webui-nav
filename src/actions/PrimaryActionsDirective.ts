'use strict';

// Prevent junk from going into typescript definitions

// todo: create class ActionsController and extend it 

class PrimaryActionsController {
    private _element: ng.IAugmentedJQuery;
    private _attrs: ng.IAttributes;
    private _injector: ng.auto.IInjectorService;
    private _scope: angular.IScope;
    private _log: ng.ILogService;
    private _rootScope: ng.IRootScopeService;
    private _window: ng.IWindowService;
    private _location: ng.ILocationService;
    private _pipActions: pip.nav.IActionsService;
    private _pipTranslate: pip.services.ITranslateService

    public config: pip.nav.ActionsConfig;

    constructor(
        $element: ng.IAugmentedJQuery,
        $attrs: ng.IAttributes,
        $injector: ng.auto.IInjectorService,
        $scope: angular.IScope,
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
        $window: ng.IWindowService,
        $location: ng.ILocationService,
        pipActions: pip.nav.IActionsService

    ) {
        "ngInject";

        this._element = $element;
        this._attrs = $attrs;
        this._scope = $scope;
        this._injector = $injector;
        this._log = $log;
        this._rootScope = $rootScope;
        this._window = $window;
        this._location = $location;
        this._pipActions = pipActions;


        this._pipTranslate = this._injector.has('pipTranslate') ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;
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
        this._element.addClass('pip-primary-actions');

        if (this._scope.localActions) {
            pipActions.primaryLocalActions = this._scope.localActions;
        }

        if (this._scope.globalActions) {
            pipActions.primaryGlobalActions = this._scope.globalActions;
        }

        this.config = pipActions.config;

        this._rootScope.$on('pipActionsChanged', (event: ng.IAngularEvent, config: pip.nav.ActionsConfig) => {
            this.onActionsChanged(event, config);
        });

    }

    private onActionsChanged(event: ng.IAngularEvent, config: pip.nav.ActionsConfig) {
        this.config = config;
    }

    public isHidden(action: pip.nav.ActionItem): boolean {
        // Todo: Check breakpoints here
        return action.access && !action.access(action);
    }

    public actionCount(action: pip.nav.ActionItem): string {
        if (action.count === null || action.count <= 0) {
            return '';
        }
        if (action.count > 99) {
            return '!';
        }

        return String(action.count);
    }

    public clickAction(action: pip.nav.ActionItem, $mdOpenMenu: Function): void {
        if (!action || action.divider) {
            return;
        }

        // todo: do not supported into ActionItem
        // if (action.close) {
        //     this._scope.originatorEv = null;
        // }

        if (action.subActions) {
            $mdOpenMenu(this._scope.originatorEv);
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
            if (this._injector.has('this._state')) {
                let _state: angular.ui.IStateService = this._injector.has('pipTranslate') ? <angular.ui.IStateService>this._injector.get('$state') : null ;
                if (_state) {
                    _state.go(action.state, action.stateParams);
                }
            }
            return;
        }

        if (action.event) {
            this._rootScope.$broadcast(action.event);
        } else {
            // Otherwise raise notification
            this._rootScope.$broadcast('pipActionClicked', action.name);
        }
    }

}

(() => {
    function primaryActionsDirective() {
        return {
            restrict: 'E',
            scope: {
                localActions: '=pipLocalActions',
                globalActions: '=pipGlobalActions'
            },
            replace: false,
            templateUrl: 'actions/PrimaryActions.html',
            controller: PrimaryActionsController,
            controllerAs: 'vm'
        };
    }


    angular
        .module('pipActions')
        .directive('pipPrimaryActions', primaryActionsDirective);

})();