(() => {
    class DropdownController {
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;
        private _injector: ng.auto.IInjectorService;
        private _scope: angular.IScope;
        private _log: ng.ILogService;
        private _rootScope: ng.IRootScopeService;
        private _pipTranslate: pip.services.ITranslateService;

        private _pipTheme: pip.themes.IThemeService;
        private _pipMedia: pip.layouts.IMediaService;
        private _timeout: ng.ITimeoutService;

        public themeClass: string;
        public media: any;
        public actions: any; // string or array
        public activeIndex: number;
        public selectedIndex: number;
        public currentTheme: string;

        constructor(
            $element: ng.IAugmentedJQuery,
            $attrs: ng.IAttributes,
            $injector: ng.auto.IInjectorService,
            $scope: angular.IScope,
            $log: ng.ILogService,
            $rootScope: ng.IRootScopeService,
            $mdMedia: angular.material.IMedia,
            $timeout: ng.ITimeoutService

        ) {
            "ngInject";

            this._element = $element;
            this._attrs = $attrs;
            this._scope = $scope;
            this._injector = $injector;
            this._log = $log;
            this._rootScope = $rootScope;
            this._timeout = $timeout;

            this._pipTheme = $injector.has('pipTheme') ? <pip.themes.IThemeService>$injector.get('pipTheme') : null;
            this._pipMedia = $injector.has('pipMedia') ? <pip.layouts.IMediaService>$injector.get('pipMedia') : null;

            if (this._pipTheme) {
                this.currentTheme = this._pipTheme.theme;
            } else if (this._rootScope['$theme']) {
                this.currentTheme = this._rootScope['$theme'];
            }

            this.themeClass = ($attrs.class || '') + ' md-' + this.currentTheme + '-theme';

            //pipAssert.isArray($scope.actions, 'pipDropdown: pip-actions attribute should take an array, but take ' + typeof $scope.actions);
            this.media = this._pipMedia !== undefined ? this._pipMedia : $mdMedia;
            this.actions = ($scope['actions'] && _.isArray($scope['actions'])) ? $scope['actions'] : [];
            this.activeIndex = $scope['activeIndex'] || 0;
        }


        public disabled(): boolean {
            if (this._scope['ngDisabled']) {
                return this._scope['ngDisabled']();
            } else {
                return false;
            }
        }

        public onSelect(index: number): void {
            this.activeIndex = index;
            this._scope['activeIndex'] = index;
            if (this._scope['select']) {
                this._scope['select'](this.actions[index], this.activeIndex);
            }

            if (this._scope['pipChange']) {
                this._timeout(() => {
                    this._scope['pipChange']();
                });
            }
        }

        public show(): boolean {
            let result: boolean;
            if (this._scope['showDropdown']()) {
                return !!this._scope['showDropdown']();
            } else {
                return true;
            }
        }

    }

    function dropdownDirective() {
        return {
            restrict: 'E',
            scope: {
                ngDisabled: '&',
                actions: '=pipActions',
                showDropdown: '&pipShow',
                activeIndex: '=pipActiveIndex',
                select: '=pipDropdownSelect',
                pipChange: '&'
            },
            templateUrl: 'dropdown/Dropdown.html',
            controller: DropdownController,
            controllerAs: '$ctrl'
        };
    }

    angular
        .module('pipDropdown', ['pipNav.Templates'])
        .directive('pipDropdown', dropdownDirective);

})();