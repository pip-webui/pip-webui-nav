'use strict';

// Prevent junk from going into typescript definitions
(() => {

function translateFilter($injector) {
    "ngInject";

    let pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;

    return function (key) {
        return pipTranslate  ? pipTranslate.translate(key) || key : key;
    }
}

angular
    .module('pipNav.Translate', [])
    .filter('translate', translateFilter);

})();