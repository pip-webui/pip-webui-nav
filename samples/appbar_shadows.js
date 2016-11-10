(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Shadows', []);

    thisModule.controller('ShadowsController',
        function($scope, pipAppBar, $injector) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate && pipTranslate.setTranslations) {
                pipTranslate.setTranslations('en', {
                    DISPLAY_AND_HIDE_SHADOWS: 'Display and hide shadows',
                    SHOW_SHADOW: 'Show shadow',
                    SHOW_SMALL_SHADOW: 'Show shadow for small resolution only (width < 1200px)',
                    HIDE_SHADOW: 'Hide shadow'
                });
                pipTranslate.setTranslations('ru', {
                    DISPLAY_AND_HIDE_SHADOWS: 'Отображение и скрытие теней',
                    SHOW_SHADOW: 'Отобразить тень',
                    SHOW_SMALL_SHADOW: 'Отобразить тень для маленького разрешения (ширина < 1200px)',
                    HIDE_SHADOW: 'Скрыть тень'
                });
            }

            $scope.onHideAppBar = function () {
                pipAppBar.hide();
            }

            $scope.onShowAppBar = function () {
                pipAppBar.show();
            }

            $scope.onShowShadow = function () {
                pipAppBar.addShadow();
            };

            $scope.onShowShadowSm = function () {
                pipAppBar.addShadow(['sm']);
            };

            $scope.onHideShadow = function () {
                pipAppBar.removeShadow();
            };
        }
    );

})();