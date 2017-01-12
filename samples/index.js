(function (angular) {
    'use strict';

    var thisModule = angular.module('app', [
        'ui.router', 'ngMaterial', 'ngAria', 'wu.masonry', 'ngAnimate',
        'pipTranslate', 'pipLayout', 'pipServices', 'pipBehaviors',
        // 'pipTheme.Default', 'pipTheme.BootBarn.Cool', 
        'pipTheme', 'pipNav', 'pipNav.Templates',

        'appAppbar.Icons', 'appAppbar.Titles', 'appAppbar.Actions', 'appAppbar.Search',
        'appAppbar.Shadows', 'appNav.Dropdown', 'appNav.Tabs', 'appNav.StickySideNav',
        'appNav.Navigations'
    ]);

    var content = [
        { title: 'Nav icons', state: 'nav_icons', icon: 'icons:archive', url: '/nav_icons', controller: 'IconsController', templateUrl: 'appbar_icons.html' },
        { title: 'Titles', state: 'titles', icon: 'icons:list', url: '/titles', controller: 'TitlesController', templateUrl: 'appbar_titles.html' },
        { title: 'Actions', state: 'actions', icon: 'icons:action', url: '/actions', controller: 'ActionsController', templateUrl: 'appbar_actions.html' },
        { title: 'Search', state: 'search', icon: 'icons:search', url: '/search', controller: 'SearchController', templateUrl: 'appbar_search.html' },
        { title: 'Shadows', state: 'shadows', icon: 'icons:lamp', url: '/shadows', controller: 'ShadowsController', templateUrl: 'appbar_shadows.html' },

        { title: 'Tabs', state: 'tabs', icon: 'icons:folder', url: '/tabs', controller: 'TabsController', templateUrl: 'tabs.html' },
        { title: 'Dropdown', state: 'dropdown', icon: 'icons:list', url: '/dropdown', controller: 'DropdownController', templateUrl: 'dropdown.html' },
        { title: 'StickySideNav', state: 'sticky_sidenav', icon: 'icons:submenu', url: '/sticky_sidenav', controller: 'StickySideNavController', templateUrl: 'sticky_sidenav.html' },
        { title: 'Navigations', state: 'navigations', icon: 'icons:preview', url: '/navigations', controller: 'NavigationsController', templateUrl: 'navigations.html' },
    ];

    thisModule.config(function ($mdIconProvider, pipAppBarProvider, $stateProvider, $urlRouterProvider, pipSideNavProvider, pipNavHeaderProvider, pipNavMenuProvider) {
        $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

        for (var i = 0; i < content.length; i++) {
            var contentItem = content[i];
            $stateProvider.state(contentItem.state, contentItem);
        }

        pipNavMenuProvider.sections = [
            {
                title: 'Appbar',
                icon: 'icons:goal',
                links: [
                    { name: 'Nav icons', title: 'Nav icons', state: 'nav_icons', icon: 'icons:archive', url: '/nav_icons', controller: 'IconsController', templateUrl: 'appbar_icons.html' },
                    { name: 'Titles', title: 'Titles', state: 'titles', icon: 'icons:list', url: '/titles', controller: 'TitlesController', templateUrl: 'appbar_titles.html' },
                    { name: 'Actions', title: 'Actions', state: 'actions', icon: 'icons:action', url: '/actions', controller: 'ActionsController', templateUrl: 'appbar_actions.html' },
                    { name: 'Search', title: 'Search', state: 'search', icon: 'icons:search', url: '/search', controller: 'SearchController', templateUrl: 'appbar_search.html' },
                    { name: 'Shadows', title: 'Shadows', state: 'shadows', icon: 'icons:lamp', url: '/shadows', controller: 'ShadowsController', templateUrl: 'appbar_shadows.html' },

                    { name: 'Tabs', title: 'Tabs', state: 'tabs', icon: 'icons:folder', url: '/tabs', controller: 'TabsController', templateUrl: 'tabs.html' },
                    { name: 'Dropdown', title: 'Dropdown', state: 'dropdown', icon: 'icons:list', url: '/dropdown', controller: 'DropdownController', templateUrl: 'dropdown.html' },
                ]
            },
            {
                title: 'SideNav',
                icon: 'icons:area',
                links: [
                    { name: 'StickySideNav', title: 'StickySideNav', state: 'sticky_sidenav', icon: 'icons:submenu', url: '/sticky_sidenav', controller: 'StickySideNavController', templateUrl: 'sticky_sidenav.html' },
                    { name: 'Navigations', title: 'Navigations', state: 'navigations', icon: 'icons:preview', url: '/navigations', controller: 'NavigationsController', templateUrl: 'navigations.html' }
                ]
            }
        ];
        pipSideNavProvider.part('user', true);
        pipSideNavProvider.part('links', true);
        pipSideNavProvider.type = 'sticky';
        pipNavHeaderProvider.defaultImageUrl = 'https://leaders.com.ua/images/temp/rJM6HQsLT6bGC8i.png';
        $urlRouterProvider.otherwise('/nav_icons');
    });

    thisModule.controller('appController',
        function ($scope, $mdDialog, $rootScope, $mdTheming, $timeout, $state, $mdSidenav, pipSideNav, pipNavHeader) {

            $timeout(function () {
                $('pre code').each(function (i, block) {
                    Prism.highlightElement(block);
                });
            });


            $scope.user = {
                fullName: 'Kate Negrienko',
                details: 'details',
                imageUrl: 'https://www.american.edu1/uploads/profiles/large/kate_resnick_avatar_3001.jpg'
            };

            pipNavHeader.show($scope.user.fullName, $scope.user.details, $scope.user.imageUrl);
            $scope.languages = ['en', 'ru'];
            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));

            $scope.onSwitchPage = function (state) {

                pipSideNav.close();
                $state.go(state);
            };

            $scope.onToggleMenu = function () {

                pipSideNav.toggle();
            };

            $scope.isActiveState = function (state) {
                return $state.current.name == state;
            };

        });

})(window.angular);
