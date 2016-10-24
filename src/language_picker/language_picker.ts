/// <reference path="../../typings/tsd.d.ts" />

module pip.nav {
    'use strict';

    class LanguagePickerController {
        private _translate: any;
        private _timeout: ng.ITimeoutService;

        public constructor(
            $scope: any, 
            $element: any, 
            $attrs: any, 
            $rootScope: ng.IRootScopeService, 
            $timeout: ng.ITimeoutService,
            $injector: any
        ) {
            "ngInject";

            this._timeout = $timeout;
            this._translate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;

            // Apply class and call resize
            $element.addClass('pip-language-picker');

            this.languages = $scope.languages;

            // Todo: Where is this event coming from? Why not through service or attribute?
            $rootScope.$on('pipSetLanguages', this.setLanguages);
        }

        public languages: string[] = ['en', 'ru'];

        public get language() {
            return this._translate ? this._translate.language : null;
        }

        public setLanguages(lang) {
            this.languages = lang.length > 0 ? lang : ['en', 'ru'];
        }

        public onLanguageClick(language) {
            if (this._translate != null) {
                this._timeout(() => {
                    this._translate.language = this.language;
                }, 0);
            }
        }

    }

    function languagePickerDirective() {
        return {
            restrict: 'E',
            scope: {
                languages: '=languages',
            },
            replace: false,
            templateUrl: function (element, attr) {
                return 'language_picker/language_picker.html';
            },
            controller: LanguagePickerController,
            controllerAs: 'vm'
        };
    }

    angular
        .module('pipLanguagePicker', [
            'ngMaterial', 'pipNav.Translate', 'pipNav.Templates'
        ])
        .directive('pipLanguagePicker', languagePickerDirective);
}
