'use strict';

// Prevent junk from going into typescript definitions

let currentTheme: string = 'default';

class DropdownDirectiveController {
    // ($scope, $element, $attrs, $injector, $rootScope, $mdMedia, $timeout) {
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

        let currentTheme: string;

        if (this._pipTheme) {
            currentTheme = this._pipTheme.theme;
        } else if (this._rootScope['$theme']) {
            currentTheme = this._rootScope['$theme'];
        }

        this.themeClass = ($attrs.class || '') + ' md-' + currentTheme + '-theme';

        //pipAssert.isArray($scope.actions, 'pipDropdown: pip-actions attribute should take an array, but take ' + typeof $scope.actions);
        this.media = this._pipMedia !== undefined ? this._pipMedia : $mdMedia;
        this.actions = ($scope['actions'] && _.isArray($scope['actions'])) ? $scope['actions'] : [];
        this.activeIndex = $scope['activeIndex'] || 0;
    }


    public disabled(): boolean {
        console.log('disabled');
        if (this._scope['ngDisabled']) {
            console.log('ngDisabled');
            return this._scope['ngDisabled']();
        } else {
            return false;
        }
    }

    public onSelect(index: number): void {
        console.log('onSelect');
        this.activeIndex = index;
        if (this._scope['select']) {
            console.log('select', this.selectedIndex, index, this.actions[index], this.activeIndex);

            let a = this.actions[index];
            let b = this.activeIndex
            this._scope['select'](a, b);
        }

        if (this._scope['pipChange']) {
            console.log('change');
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

(() => {

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
            controller: DropdownDirectiveController,
            controllerAs: 'vm'
        };
    }

    angular
        .module('pipDropdown', ['pipNav.Templates'])
        .directive('pipDropdown', dropdownDirective);

})();