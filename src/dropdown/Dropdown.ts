{
    class DropdownController {
        private _pipTranslate: pip.services.ITranslateService;
        private _pipTheme: pip.themes.IThemeService;
        private _pipMedia: pip.layouts.IMediaService;

        public themeClass: string;
        public media: any;
        public actions: any[]; // string or array
        public activeIndex: number;
        public selectedIndex: number;
        public currentTheme: string;

        public ngDisabled: Function;
        public showDropdown: Function;
        public select: any;
        public pipChange: Function;

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
            this.media = !_.isUndefined(this._pipMedia) ? this._pipMedia : $mdMedia;
            this.actions = (this.actions && _.isArray(this.actions)) ? this.actions : [];
            this.activeIndex = this.activeIndex || 0;
        }

        public disabled(): boolean {
            if (this.ngDisabled) {
                return this.ngDisabled();
            } else {
                return false;
            }
        }

        public onSelect(index: number): void {
            this.activeIndex = index;
            if (this.select) {
                this.select(this.actions[index], this.activeIndex);
            }

            if (this.pipChange) {
                this.$timeout(() => {
                    this.pipChange();
                });
            }
        }

        public show(): boolean {
            let result: boolean;
            if (this.showDropdown()) {
                return !!this.showDropdown();
            } else {
                return true;
            }
        }

    }


    interface IDropdownBindings {
        [key: string]: any;

        ngDisabled: any,
        actions: any,
        showDropdown: any,
        activeIndex: any,
        select: any,
        pipChange: any
    }

    const DropdownBindings: IDropdownBindings = {
        ngDisabled: '&',
        actions: '=pipActions',
        showDropdown: '&pipShow',
        activeIndex: '=pipActiveIndex',
        select: '=pipDropdownSelect',
        pipChange: '&'
    }

    class DropdownChanges implements ng.IOnChangesObject, IDropdownBindings {
        [key: string]: ng.IChangesObject<any>;

        ngDisabled: ng.IChangesObject<Function>;
        actions: ng.IChangesObject<any>;
        showDropdown: ng.IChangesObject<Function>;
        activeIndex: ng.IChangesObject<number>;
        select: ng.IChangesObject<any>;
        pipChange: ng.IChangesObject<Function>;
    }

    const dropdown: ng.IComponentOptions = {
        bindings: DropdownBindings,
        templateUrl: 'dropdown/Dropdown.html',
        controller: DropdownController
    };

    angular
        .module('pipDropdown', ['pipNav.Templates'])
        .component('pipDropdown', dropdown);

}