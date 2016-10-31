
(function (angular) {
    'use strict';

    var thisModule = angular.module('appNav.StickySideNav', [ 'pipSideNav', 'ngMaterial', 'pipLayout',
        'pipNavMenu', 'pipNavHeader']);

    thisModule.controller('StickySideNavController',
        function ($scope, $rootScope, pipSideNav, $mdTheming, $timeout, $mdMedia,
                  $injector, pipNavHeader, pipNavMenu) {

            var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
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

            onWindowResized();
            $scope.media = pipMedia ? pipMedia : $mdMedia;
            $scope.$mdMedia = $mdMedia;
            pipSideNav.id('pip-sticky-sidenav');

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    Prism.highlightElement(block);
                });
            });

            $rootScope.$on('pipWindowResized', onWindowResized);

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
                pipNavMenu.setCounter('StickySideNav', Math.floor(Math.random() * (99 - 20) + 20));
            };

            function onWindowResized() {
                var mainWidth = $('.pip-main').innerWidth(),
                    elementWidth = $('.pip-sticky-sidenav').innerWidth(),
                    resultSize;

                
                $scope.sizeLabel = 'Main region size: ' + mainWidth + '. SideNav size: ' + elementWidth;// + 'Size after change: '
                
            }

        }
    );

})(window.angular);
