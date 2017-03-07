'use strict';

// Prevent junk from going into typescript definitions


class LanguagePickerDirectiveController {
    private _element: ng.IAugmentedJQuery;
    private _attrs: ng.IAttributes;
    private _injector: ng.auto.IInjectorService;
    private _scope: ng.IScope;
    private _log: ng.ILogService;
    private _rootScope: ng.IRootScopeService;
    private _translate: pip.services.ITranslateService;
    private _timeout: ng.ITimeoutService;

    public languages: string[] = ['en', 'ru'];
    public selectedLanguage: string;

    public constructor(
        $element: ng.IAugmentedJQuery,
        $attrs: ng.IAttributes,
        $injector: ng.auto.IInjectorService,
        $scope: ng.IScope,
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
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
        this._translate = $injector.has('pipTranslate') ? <pip.services.ITranslateService>$injector.get('pipTranslate') : null;

        // Apply class and call resize
        $element.addClass('pip-language-picker');

        this.setLanguages($scope['languages']);

        this.selectedLanguage = $scope['value'] || this.languages[0]; 
    }

    public get language() {
        return this._translate ? this._translate.language : null;
    }

    public setLanguages(languages: string[]): void {
        this.languages = languages.length > 0 ? languages : ['en', 'ru'];
    }

    public onLanguageClick(language: string) {
        if (this._translate != null) {
            this.selectedLanguage = language;
            // this._timeout(() => {
                this._translate.language = this.selectedLanguage;
            // }, 0);
        }
    }

}

(() => {
    function languagePickerDirective() {
        return {
            restrict: 'E',
            scope: {
                languages: '=languages',
                value: '=value'
            },
            replace: false,
            templateUrl: function (element, attr) {
                return 'language/LanguagePicker.html';
            },
            controller: LanguagePickerDirectiveController,
            controllerAs: 'vm'
        };
    }

    angular
        .module('pipLanguagePicker', [
            'ngMaterial', 'pipNav.Translate', 'pipNav.Templates'
        ])
        .directive('pipLanguagePicker', languagePickerDirective);

})();