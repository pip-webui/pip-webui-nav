
(function (angular) {
    'use strict';

    var thisModule = angular.module('app', ['pipCore', 'pipSideNav', 'ngMaterial']);

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

        pipSideNavProvider.sections([
            {
                links: [
                    {title: 'Dashboard', url: '/dashboard?party_id=:party_id', access: accessOwner},
                    {title: 'About', url: '/about?party_id=:party_id'}
                ]
            },
            {
                title: 'Get',
                access: accessContributor,
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
                    {title: 'Settings', url: '/settings?party_id=:party_id', access: accessManager}
                ]
            }
        ]);
    });

    function accessOwner($party, $user) {
        return $user && $user.owner;
    }

    function accessManager($party, $user) {
        return $user && $user.manager;
    }

    function accessContributor($party, $user) {
        return $user && $user.contributor;
    }

    thisModule.controller('appController',
        function ($scope, $rootScope, pipSideNav, pipTranslate, $mdTheming, localStorageService) {
            $rootScope.$theme = localStorageService.get('theme');

            $rootScope.$party = {
                id: '55f28f064b0c570c4b1f138d',
                name: 'Misha Seroukhov',
                theme: $rootScope.$theme
            };

            $rootScope.$user = {
                id: '53b63780bf898e927e49325b',
                name: 'Sergey Seroukhov',
                owner: false,
                manager: true,
                contributor: true,
                admin: false
            };

            $scope.languages = ['en', 'ru'];
            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));

            $scope.onLanguageClick = function (language) {
                pipTranslate.use(language);
            };

            $scope.onThemeClick = function (theme) {
                // pipTheme.setCurrentTheme(theme);
                $rootScope.$party = theme;
                pipSideNav.theme(theme);
            };

            $rootScope.$connection = {
                party_id: '53b63780bf898e927e49325b',
                to_party_id: '5483bdaf812e2fba3381be90',
                to_party_name: 'Misha Seroukhov',
                relation: 'Son',
                relation_since: '2001-07-11',
                manager: true,
                contributor: true
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
