import { AppBarConfig, IAppBarService } from "./AppBarService";

class AppBarPartDirectiveController {
    private _scope: ng.IScope;
    private _partName: string;
    private _partValue: string;

    constructor(
        $element: ng.IAugmentedJQuery,
        $attrs: ng.IAttributes,
        $scope: ng.IScope,
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
        pipAppBar: IAppBarService
    ) {
        "ngInject";

        this._scope = $scope;
        this._partName = String($attrs.pipAppbarPart);
        this._partValue = null;

        // Break part apart
        let pos: number = this._partName.indexOf(':');
        if (pos > 0) {
            this._partValue = this._partName.substr(pos + 1);
            this._partName = this._partName.substr(0, pos);
        }

        // onAppBarChanged(null, pipAppBar.config);
        $rootScope.$on('pipAppBarChanged', (event: ng.IAngularEvent, config: AppBarConfig) => {
            this.onAppBarChanged(null, config)
        });

    }

    private onAppBarChanged(event: ng.IAngularEvent, config: AppBarConfig) {
        let parts: any = config.parts || {};
        let currentPartValue = parts[this._partName];

        // Set visible variable to switch ngIf
        let visible: boolean = !!(this._partValue ? currentPartValue == this._partValue : currentPartValue);

        if (visible != this._scope['visible'])
            this._scope['visible'] = visible;
    }

}

// Example is taken from here: http://stackoverflow.com/questions/20325480/angularjs-whats-the-best-practice-to-add-ngif-to-a-directive-programmatically
(() => {
    function appbarPartDirective(ngIfDirective) {
        "ngInject";

        var ngIf = ngIfDirective[0];

        return {
            transclude: ngIf.transclude,
            priority: ngIf.priority,
            terminal: ngIf.terminal,
            restrict: ngIf.restrict,
            scope: true,
            link: function linkFunction($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes) {
                // Visualize based on visible variable in scope
                $attrs.ngIf = function () {
                    return $scope.visible;
                };
                ngIf.link.apply(ngIf, arguments);
            },
            controller: AppBarPartDirectiveController
        };
    }

    angular.module('pipAppBar')
        .directive('pipAppbarPart', appbarPartDirective);

})();