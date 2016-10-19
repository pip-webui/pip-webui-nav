
(function (angular) {
    'use strict';

    var thisModule = angular.module('app', ['pipServices', 'pipSideNav', 'ngMaterial',
        'pipNavMenu', 'pipNavHeader']);

    thisModule.config(function (pipSideNavProvider, $mdIconProvider, pipTranslateProvider) {
        $mdIconProvider.iconSet('icons', '../images/icons.svg', 512);

        // Set translation strings for the module
        pipTranslateProvider.translations('en', {
            SAMPLE: 'sample',
            CODE_TO_CONFIGURE_AND_DISPLAY: 'Code sample to configure and display Side Nav',
            OPEN: 'Open',
            CODE: 'Code',
            CLOSE: 'Close',
            TOGGLE: 'Toggle'
        });

        pipTranslateProvider.translations('ru', {
            SAMPLE: 'пример',
            CODE_TO_CONFIGURE_AND_DISPLAY: 'Пример кода для конфигурации и отображения Side Nav',
            OPEN: 'Открыть',
            CODE: 'Код',
            CLOSE: 'Закрыть',
            TOGGLE: 'Переключить'
        });

        /*pipSideNavProvider.sections();*/
    });


    thisModule.controller('appController',
        function ($scope, $rootScope, pipSideNav, pipTranslate, $mdTheming, localStorageService, $timeout) {

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    Prism.highlightElement(block);
                });
            });

            $scope.user = {
                fullName: 'Kate Negrienko',
                details: 'details'
            };
            
            $scope.links = [
                {
                    links: [
                        {title: 'Dashboard', url: '/dashboard?party_id=:party_id'},
                        {title: 'About', url: '/about?party_id=:party_id'}
                    ]
                },
                {
                    title: 'Get',
                    links: [
                        {title: 'Incoming', icon: 'icons:folder', url: '/ideas?party_id=:party_id'},
                        {title: 'Big Picture', icon: 'icons:goal', url: '/unfinished?party_id=:party_id'},
                        {title: 'Events', icon: 'icons:star', url: '/ultimate_todo?party_id=:party_id'}
                    ]
                },
                {
                    links: [
                        {title: 'Help', url: '/help'},
                        {title: 'Support', url: '/support?party_id=:user_id'},
                        {title: 'Settings', url: '/settings?party_id=:party_id'}
                    ]
                }
            ];
            $rootScope.$theme = localStorageService.get('theme');

            $scope.languages = ['en', 'ru'];
            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));

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

        }
    );

})(window.angular);
