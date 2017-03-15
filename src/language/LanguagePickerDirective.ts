{
    class LanguagePickerDirectiveController implements ILanguagePickerBindings {
        private _translate: pip.services.ITranslateService;
        public languages: string[] = ['en', 'ru'];
        public value: string = null;

        public constructor(
            $element: ng.IAugmentedJQuery,
            $injector: ng.auto.IInjectorService,
            $rootScope: ng.IRootScopeService
        ) {
            "ngInject";

            this._translate = $injector.has('pipTranslate') ? <pip.services.ITranslateService>$injector.get('pipTranslate') : null;

            // Apply class and call resize
            $element.addClass('pip-language-picker');

            this.setLanguages(this.languages);

            this.value = this.value  || this.languages[0];
        }

        public get language() {
            return this._translate ? this._translate.language : null;
        }

        public setLanguages(languages: string[]): void {
            this.languages = languages.length > 0 ? languages : ['en', 'ru'];
        }

        public onLanguageClick(language: string) {
            if (this._translate != null) {
                this.value = language;
                // this.$timeout(() => {
                this._translate.language = this.value;
                // }, 0);
            }
        }

    }

    interface ILanguagePickerBindings {
        [key: string]: any;

        languages: any,
        value: any
    }

    const LanguagePickerBindings: ILanguagePickerBindings = {
        languages: '<languages',
        value: '=?value'
    }

    const languagePickerDirective: ng.IComponentOptions = {
        bindings: LanguagePickerBindings,
        templateUrl: 'language/LanguagePicker.html',
        controller: LanguagePickerDirectiveController
    }

    angular
        .module('pipLanguagePicker', [
            'ngMaterial', 'pipNav.Translate', 'pipNav.Templates'
        ])
        .component('pipLanguagePicker', languagePickerDirective);

}