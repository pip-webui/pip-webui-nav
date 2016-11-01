(function (angular) {
    'use strict';

    var thisModule = angular.module('app', [
        'ui.router', 'ngMaterial',  'ngAria', 'wu.masonry', 'ngAnimate',
        'pipTranslate', 'pipLayout', 'pipServices', 'pipBehaviors',
        // 'pipTheme.Default', 'pipTheme.BootBarn.Cool', 
        'pipTheme',  

        'pipAppBar', 'pipNav',
        'appAppbar.Icons', 'appAppbar.Titles', 'appAppbar.Actions', 'appAppbar.Search',
        'appAppbar.Shadows', 'appNav.Dropdown', 'appNav.Tabs', 'appNav.SideNav', 'appNav.StickySideNav'
    ]);

    var content = [

                { title: 'Nav icons', state: 'nav_icons', icon: 'icons:archive', url: '/nav_icons', controller: 'IconsController', templateUrl: 'appbar_icons.html' },
                { title: 'Titles', state: 'titles', icon: 'icons:list', url: '/titles', controller: 'TitlesController', templateUrl: 'appbar_titles.html' },
                { title: 'Actions', state: 'actions', icon: 'icons:action', url: '/actions', controller: 'ActionsController', templateUrl: 'appbar_actions.html' },
                { title: 'Search', state: 'search', icon: 'icons:search', url: '/search', controller: 'SearchController', templateUrl: 'appbar_search.html' },
                { title: 'Shadows', state: 'shadows', icon: 'icons:lamp', url: '/shadows', controller: 'ShadowsController', templateUrl: 'appbar_shadows.html' },

                { title: 'Tabs', state: 'tabs', icon: 'icons:folder', url: '/tabs', controller: 'TabsController', templateUrl: 'tabs.html' },
                { title: 'Dropdown', state: 'dropdown', icon: 'icons:list', url: '/dropdown', controller: 'DropdownController', templateUrl: 'dropdown.html' },
                { title: 'SideNav', state: 'sidenav', icon: 'icons:submenu', url: '/sidenav', controller: 'SideNavController', templateUrl: 'sidenav.html' },
                { title: 'StickySideNav', state: 'sticky_sidenav', icon: 'icons:submenu', url: '/sticky_sidenav', controller: 'StickySideNavController', templateUrl: 'sticky_sidenav.html' },
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

            $scope.content = [ 
                { 
                    title: 'Appbar',
                    icon: 'icons:goal',
                    links: [               
                        { title: 'Nav icons', state: 'nav_icons', icon: 'icons:archive', url: '/nav_icons', controller: 'IconsController', templateUrl: 'appbar_icons.html' },
                        { title: 'Titles', state: 'titles', icon: 'icons:list', url: '/titles', controller: 'TitlesController', templateUrl: 'appbar_titles.html' },
                        { title: 'Actions', state: 'actions', icon: 'icons:action', url: '/actions', controller: 'ActionsController', templateUrl: 'appbar_actions.html' },
                        { title: 'Search', state: 'search', icon: 'icons:search', url: '/search', controller: 'SearchController', templateUrl: 'appbar_search.html' },
                        { title: 'Shadows', state: 'shadows', icon: 'icons:lamp', url: '/shadows', controller: 'ShadowsController', templateUrl: 'appbar_shadows.html' },

                        { title: 'Tabs', state: 'tabs', icon: 'icons:folder', url: '/tabs', controller: 'TabsController', templateUrl: 'tabs.html' },
                        { title: 'Dropdown', state: 'dropdown', icon: 'icons:list', url: '/dropdown', controller: 'DropdownController', templateUrl: 'dropdown.html' },
                    ]
                },
                {
                    title: 'SideNav',
                    icon: 'icons:area',
                    links: [  
                        { title: 'SideNav', state: 'sidenav', icon: 'icons:submenu', url: '/sidenav', controller: 'SideNavController', templateUrl: 'sidenav.html' },
                        { title: 'StickySideNav', state: 'sticky_sidenav', icon: 'icons:submenu', url: '/sticky_sidenav', controller: 'StickySideNavController', templateUrl: 'sticky_sidenav.html' }
                    ]                    
                }
            ];

            $scope.onSwitchPage = function(state) {
                pipSideNav.id('pip-sticky-sidenav');
                pipSideNav.close();
                $state.go(state);
            };

            $scope.onToggleMenu = function() {
                pipSideNav.id('pip-sticky-sidenav');
                pipSideNav.toggle();
            };

            $scope.isActiveState = function(state) {
                return $state.current.name == state;
            };

        });

})(window.angular);
