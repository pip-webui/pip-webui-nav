(() => {
    class DropdownController {
        private _pipTranslate: pip.services.ITranslateService;
        private _pipTheme: pip.themes.IThemeService;
        private _pipMedia: pip.layouts.IMediaService;

        public themeClass: string;
        public media: any;
        public actions: any; // string or array
        public activeIndex: number;
        public selectedIndex: number;
        public currentTheme: string;

        constructor(
            private $scope: angular.IScope,
            private $timeout: ng.ITimeoutService,
            $element: ng.IAugmentedJQuery,
            $attrs: ng.IAttributes,
            $injector: ng.auto.IInjectorService,
            $log: ng.ILogService,
            $rootScope: ng.IRootScopeService,
            $mdMedia: angular.material.IMedia,

        ) {
            "ngInject";

            this._pipTheme = $injector.has('pipTheme') ? <pip.themes.IThemeService>$injector.get('pipTheme') : null;
            this._pipMedia = $injector.has('pipMedia') ? <pip.layouts.IMediaService>$injector.get('pipMedia') : null;

            if (this._pipTheme) {
                this.currentTheme = this._pipTheme.theme;
            } else if ($rootScope['$theme']) {
                this.currentTheme = $rootScope['$theme'];
            }

            this.themeClass = ($attrs['class'] || '') + ' md-' + this.currentTheme + '-theme';

            //pipAssert.isArray($scope.actions, 'pipDropdown: pip-actions attribute should take an array, but take ' + typeof $scope.actions);
            this.media = this._pipMedia !== undefined ? this._pipMedia : $mdMedia;
            this.actions = ($scope['actions'] && _.isArray($scope['actions'])) ? $scope['actions'] : [];
            this.activeIndex = $scope['activeIndex'] || 0;
        }


        public disabled(): boolean {
            if (this.$scope['ngDisabled']) {
                return this.$scope['ngDisabled']();
            } else {
                return false;
            }
        }

        public onSelect(index: number): void {
            this.activeIndex = index;
            this.$scope['activeIndex'] = index;
            if (this.$scope['select']) {
                this.$scope['select'](this.actions[index], this.activeIndex);
            }

            if (this.$scope['pipChange']) {
                this.$timeout(() => {
                    this.$scope['pipChange']();
                });
            }
        }

        public show(): boolean {
            let result: boolean;
            if (this.$scope['showDropdown']()) {
                return !!this.$scope['showDropdown']();
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