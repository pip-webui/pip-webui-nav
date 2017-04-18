(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Shadows', []);

    thisModule.controller('ShadowsController',
        function($scope, pipAppBar, $injector, pipMedia) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate && pipTranslate.setTranslations) {
                pipTranslate.setTranslations('en', {
                    DISPLAY_AND_HIDE_SHADOWS: 'Display and hide shadows',
                    SHOW_SHADOW: 'Show shadow',
                    SHOW_SMALL_SHADOW: 'Show shadow for resolution (md, lg)',
                    HIDE_SHADOW: 'Hide shadow',
                    BY_SERVICE: 'By service: ',
                    BY_COMPONENT: 'By component:'
                });
                pipTranslate.setTranslations('ru', {
                    DISPLAY_AND_HIDE_SHADOWS: 'Отображение и скрытие теней',
                    SHOW_SHADOW: 'Отобразить тень',
                    SHOW_SMALL_SHADOW: 'Отобразить тень дляразрешения (md, lg)',
                    HIDE_SHADOW: 'Скрыть тень',
                    BY_SERVICE: 'При помощи сервиса:',
                    BY_COMPONENT: 'При помощи компонента:'
                });
            }

            $scope.showComponentShadow = false;
            $scope.showComponentShadowOnExSm = false;

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
                pipAppBar.addShadow('md', 'lg');
            };

            $scope.onHideShadow = function () {
                pipAppBar.removeShadow();
            };

            $scope.onShowShadowComponent = function () {
                $scope.showComponentShadow = true;
            };

            $scope.onShowShadowSmComponent = function () {
                $scope.showComponentShadowOnExSm = true;
            };

            $scope.onHideShadowComponent = function () {
                $scope.showComponentShadow = false;
                $scope.showComponentShadowOnExSm = false;
            };

            $scope.showComponentOnExSm = function () {
                return $scope.showComponentShadowOnExSm ? pipMedia('gt-sm') : false;
            };
        }
    );
})();