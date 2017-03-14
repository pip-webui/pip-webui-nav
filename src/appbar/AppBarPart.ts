import { AppBarConfig } from './AppBarConfig';
import { IAppBarService } from "./IAppBarService";

class AppBarPartController {
    
    private _partName: string;
    private _partValue: string;

    constructor(
        private $scope: ng.IScope,
        $element: ng.IAugmentedJQuery,
        $attrs: ng.IAttributes,
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
        pipAppBar: IAppBarService
    ) {
        "ngInject";

        this._partName = String($attrs['pipAppbarPart']);
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

        if (visible != this.$scope['visible'])
            this.$scope['visible'] = visible;
    }

}

// Example is taken from here: http://stackoverflow.com/questions/20325480/angularjs-whats-the-best-practice-to-add-ngif-to-a-directive-programmatically
(() => {
    function appbarPart(ngIfDirective) {
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
                $attrs['ngIf'] = () => {
                    return $scope['visible'];
                };
                ngIf.link.apply(ngIf, arguments);
            },
            controller: AppBarPartController
        };
    }

    angular.module('pipAppBar')
        .directive('pipAppbarPart', appbarPart);

})();