(function (angular) {
    'use strict';

    var thisModule = angular.module('app', [
        'pipAppBar',
        //'pipServices',
        'ui.router',
        'ngMaterial',
        'pipNav',

        'appAppbar.Icons',
        'appAppbar.Titles',
        'appAppbar.Actions',
        'appAppbar.Search',
        'appAppbar.Shadows',

        'appNav.Dropdown',
        'appNav.Tabs',

        'appNav.SideNav',
        'appNav.StickySideNav',
        'pipTranslate'
    ]);

    var content = [

                { title: 'Nav icons', state: 'nav_icons', icon: 'icons:list', url: '/nav_icons', controller: 'IconsController', templateUrl: 'appbar_icons.html' },
                { title: 'Titles', state: 'titles', icon: 'icons:list', url: '/titles', controller: 'TitlesController', templateUrl: 'appbar_titles.html' },
                { title: 'Actions', state: 'actions', icon: 'icons:list', url: '/actions', controller: 'ActionsController', templateUrl: 'appbar_actions.html' },
                { title: 'Search', state: 'search', icon: 'icons:list', url: '/search', controller: 'SearchController', templateUrl: 'appbar_search.html' },
                { title: 'Shadows', state: 'shadows', icon: 'icons:list', url: '/shadows', controller: 'ShadowsController', templateUrl: 'appbar_shadows.html' },

                { title: 'Tabs', state: 'tabs', icon: 'icons:list', url: '/tabs', controller: 'TabsController', templateUrl: 'tabs.html' },
                { title: 'Dropdown', state: 'dropdown', icon: 'icons:list', url: '/dropdown', controller: 'DropdownController', templateUrl: 'dropdown.html' },

                { title: 'SideNav', state: 'sidenav', icon: 'icons:list', url: '/sidenav', controller: 'SideNavController', templateUrl: 'sidenav.html' },
                { title: 'StickySideNav', state: 'sticky_sidenav', icon: 'icons:list', url: '/sticky_sidenav', controller: 'StickySideNavController', templateUrl: 'sticky_sidenav.html' },
    ];

    thisModule.config(function ($mdIconProvider, pipAppBarProvider, $stateProvider,
                                $urlRouterProvider) {
        $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

        for (var i = 0; i < content.length; i++) {
            var contentItem = content[i];
            $stateProvider.state(contentItem.state, contentItem);
        }

        $urlRouterProvider.otherwise('/nav_icons');
    });

    thisModule.controller('appController',
        function ($scope, $mdDialog, $rootScope, $mdTheming, $timeout, $state, $mdSidenav, pipSideNav, pipNavHeader) { 

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    Prism.highlightElement(block);
                });
            });

            pipNavHeader.image('http://leaders.com.ua/images/temp/rJM6HQsLT6bGC8i.png');
            pipSideNav.id('pip-sticky-sidenav');
            $scope.user = {
                fullName: 'Kate Negrienko',
                details: 'details',
                imageUrl: 'http://www.american.edu/uploads/profiles/large/kate_resnick_avatar_3001.jpg'
            };

            $scope.languages = ['en', 'ru'];
            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));

            $scope.content = [ { links: content } ];

            $scope.onSwitchPage = function(state) {
                $mdSidenav('left').close();
                $state.go(state);
            };

            $scope.onToggleMenu = function() {
                $mdSidenav('left').toggle();
            };

            $scope.isActiveState = function(state) {
                return $state.current.name == state;
            };

        });

})(window.angular);
