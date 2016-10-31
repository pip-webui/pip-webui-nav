
(function (angular) {
    'use strict';

    var thisModule = angular.module('appNav.StickySideNav', [ 'pipSideNav', 'ngMaterial',
        'pipNavMenu', 'pipNavHeader']);

    thisModule.controller('StickySideNavController',
        function ($scope, $rootScope, pipSideNav, $mdTheming, $timeout, $mdMedia,
                  $injector, pipNavHeader, pipNavMenu) {

            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate && pipTranslate.setTranslations) {

                // Set translation strings for the module
                pipTranslate.setTranslations('en', {
                    SAMPLE: 'sample',
                    CODE_TO_CONFIGURE_AND_DISPLAY: 'Code sample to configure and display Side Nav',
                    OPEN: 'Open',
                    CODE: 'Code',
                    CLOSE: 'Close',
                    TOGGLE: 'Toggle'
                });

                pipTranslate.setTranslations('ru', {
                    SAMPLE: 'пример',
                    CODE_TO_CONFIGURE_AND_DISPLAY: 'Пример кода для конфигурации и отображения Side Nav',
                    OPEN: 'Открыть',
                    CODE: 'Код',
                    CLOSE: 'Закрыть',
                    TOGGLE: 'Переключить'
                });
            }

            $scope.$mdMedia = $mdMedia;

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    Prism.highlightElement(block);
                });
            });

            $scope.onLanguageClick = function (language) {
                pipTranslate.use(language);
            };

            $scope.$on('pipSideNavLinkClicked', function (event, link) {
                console.log('Link ' + link + ' Clicked');// eslint-disable-line
            });

            $scope.onOpenSideNav = function () {
                pipSideNav.open();
            };

            $scope.onCloseSideNav = function () {
                pipSideNav.close();
            };

            $scope.onToggleSideNav = function () {
                pipSideNav.toggle();
            };

            $scope.onRefreshCounter = function () {
                pipNavMenu.setCounter('Help', 55);
            };

        }
    );

})(window.angular);
