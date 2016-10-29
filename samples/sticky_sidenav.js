
(function (angular) {
    'use strict';

    var thisModule = angular.module('appNav.StickySideNav', [ 'pipSideNav', 'ngMaterial',
        'pipNavMenu', 'pipNavHeader']);

    thisModule.controller('StickySideNavController',
        function ($scope, $rootScope, pipSideNav, $mdTheming, localStorageService, $timeout, $mdMedia,
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

            // set sidenav 
            pipSideNav.id('pip-sticky-sidenav');

            $scope.$mdMedia = $mdMedia;

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    Prism.highlightElement(block);
                });
            });

            pipNavHeader.image('http://leaders.com.ua/images/temp/rJM6HQsLT6bGC8i.png');

            $scope.user = {
                fullName: 'Kate Negrienko',
                details: 'details',
                imageUrl: 'http://www.american.edu/uploads/profiles/large/kate_resnick_avatar_3001.jpg'
            };
            
            $scope.links = [
                {
                    links: [
                        {title: 'Dashboard', icon: 'icons:list', url: '/dashboard?party_id=:party_id'},
                        {title: 'About', icon: 'icons:person', url: '/about?party_id=:party_id', count: 4}
                    ]
                },
                {
                    title: 'Get',
                    links: [
                        {title: 'Incoming', icon: 'icons:folder', url: '/ideas?party_id=:party_id'},
                        {title: 'Big Picture', icon: 'icons:goal', url: '/unfinished?party_id=:party_id', count: 25},
                        {title: 'Events', icon: 'icons:action', url: '/ultimate_todo?party_id=:party_id'}
                    ]
                },
                {
                    title: 'Feedback',
                    icon: 'icons:goal',
                    links: [
                        {title: 'Help', icon: 'icons:help', url: '/help'},
                        {title: 'Support', icon: 'icons:phone', url: '/support?party_id=:user_id'},
                        {title: 'Settings', icon: 'icons:star', url: '/settings?party_id=:party_id', count: 25}
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

            $scope.onRefreshCounter = function () {
                pipNavMenu.setCounter('Help', 55);
            };

        }
    );

})(window.angular);