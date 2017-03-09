

// Prevent junk from going into typescript definitions
(() => {

function translateFilter($injector: ng.auto.IInjectorService) {
    "ngInject";

    let pipTranslate: pip.services.ITranslateService = $injector.has('pipTranslate') ? <pip.services.ITranslateService>$injector.get('pipTranslate') : null;

    return function (key: string) {
        return pipTranslate ? pipTranslate.translate(key) || key : key;
    }
}

angular
    .module('pipNav.Translate', [])
    .filter('translate', translateFilter);

})();

