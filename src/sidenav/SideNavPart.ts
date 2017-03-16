(() => {

    interface ISideNavPartBindings {
        [key: string]: any;
        visible: any
    }

    const SideNavPartBindings: ISideNavPartBindings = {
        visible: '=?'
    }

    class SideNavPartController {
        private partName: string;
        private partValue: string = null;
        private pos: number;

        constructor(
            private $scope: ng.IScope,
            $element: ng.IRootElementService,
            $attrs: ng.IAttributes,
            $rootScope: ng.IRootScopeService,
            pipSideNav) {

            this.partName = '' + $attrs['pipSidenavPart'];
            this.pos = this.partName.indexOf(':');
            if (this.pos > 0) {
                this.partValue = this.partName.substr(this.pos + 1);
                this.partName = this.partName.substr(0, this.pos);
            }

            this.onSideNavChanged(null, pipSideNav.config)
            $rootScope.$on('pipSideNavChanged', (event, config) => { this.onSideNavChanged(event, config) });
        }

        private onSideNavChanged(event, config) {
            let parts = config.parts || {};
            let currentPartValue = parts[this.partName];
            let visible: boolean = !!(this.partValue ? currentPartValue == this.partValue : currentPartValue);

            if (visible != this.$scope['visible'])
                this.$scope['visible'] = visible;
        }
    }

    function sidenavPartDirective(ngIfDirective) {
        "ngInject";
        let ngIf = ngIfDirective[0];

        return {
            transclude: ngIf.transclude,
            priority: ngIf.priority,
            terminal: ngIf.terminal,
            restrict: ngIf.restrict,
            scope: SideNavPartBindings,
            link: function linkFunction(
                $scope: ng.IScope,
                $element: ng.IRootElementService,
                $attrs: ng.IAttributes) {
                $attrs['ngIf'] = () => { return $scope['visible'] };
                ngIf.link.apply(ngIf, arguments);
            },
            controller: SideNavPartController
        };
    }

    angular
        .module('pipSideNav')
        .directive('pipSidenavPart', sidenavPartDirective);

})();