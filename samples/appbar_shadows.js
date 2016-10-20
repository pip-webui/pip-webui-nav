(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Shadows', ['pipShadow.Service', 'pipAppBar']);

    thisModule.controller('ShadowsController',
        function($scope, pipShadow, $injector) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate) {
                pipTranslate.translations('en', {
                    DISPLAY_AND_HIDE_SHADOWS: 'Display and hide shadows',
                    SHOW_SHADOW: 'Show shadow',
                    SHOW_SMALL_SHADOW: 'Show shadow for small resolution only (width < 1200px)',
                    HIDE_SHADOW: 'Hide shadow'
                });
                pipTranslate.translations('ru', {
                    DISPLAY_AND_HIDE_SHADOWS: 'Отображение и скрытие теней',
                    SHOW_SHADOW: 'Отобразить тень',
                    SHOW_SMALL_SHADOW: 'Отобразить тень для маленького разрешения (ширина < 1200px)',
                    HIDE_SHADOW: 'Скрыть тень'
                });
            }
            
            $scope.onShowShadow = function () {
                pipShadow.showShadow();
            };

            $scope.onShowShadowSm = function () {
                pipShadow.showShadowSm();
            };

            $scope.onHideShadow = function () {
                pipShadow.hideShadow();
            };
        }
    );

})();