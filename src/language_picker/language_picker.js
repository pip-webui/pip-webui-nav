/**
 * @file Application Language Picker component
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _, $) {
    'use strict';

    var thisModule = angular.module('pipLanguagePicker',
        ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);

    // Main application header directive
    thisModule.directive('pipLanguagePicker', function () {
        return {
            restrict: 'E',
            scope: {
                languages: '=languages',
            },
            replace: false,
            templateUrl: function (element, attr) {
                return 'language_picker/language_picker.html';
            },
            controller: 'pipLanguagePickerController'
        };
    });

    thisModule.controller('pipLanguagePickerController',
        function ($scope, $element, $attrs, $rootScope, $window, $state, $location, $injector) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;

            // Initialize default application title
            if ($scope.title) {
                pipLanguagePicker.showTitleText($scope.title);
            }
            if ($scope.showMenu) {
                pipLanguagePicker.showMenuNavIcon();
            }
            // Apply class and call resize
            $element.addClass('pip-language-picker');

            $scope.language = getLanguage;
            $scope.onLanguageClick = onLanguageClick;

            function getLanguage() {
                return pipTranslate ? pipTranslate.use() : null;
            }

            function onLanguageClick(language) {
                if (pipTranslate) {
                    setTimeout(function () {
                        pipTranslate.use(language);
                        $rootScope.$apply();
                    }, 0);
                }
            }

        }
    );

})(window.angular, window._, window.jQuery);
