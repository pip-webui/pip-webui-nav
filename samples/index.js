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
        { title: 'Nav icons', state: 'nav_icons', url: '/nav_icons', controller: 'IconsController', templateUrl: 'appbar_icons.html' },
        { title: 'Titles', state: 'titles', url: '/titles', controller: 'TitlesController', templateUrl: 'appbar_titles.html' },
        { title: 'Actions', state: 'actions', url: '/actions', controller: 'ActionsController', templateUrl: 'appbar_actions.html' },
        { title: 'Search', state: 'search', url: '/search', controller: 'SearchController', templateUrl: 'appbar_search.html' },
        { title: 'Shadows', state: 'shadows', url: '/shadows', controller: 'ShadowsController', templateUrl: 'appbar_shadows.html' },

        { title: 'Tabs', state: 'tabs', url: '/tabs', controller: 'TabsController', templateUrl: 'tabs.html' },
        { title: 'Dropdown', state: 'dropdown', url: '/dropdown', controller: 'DropdownController', templateUrl: 'dropdown.html' },
        
        { title: 'SideNav', state: 'sidenav', url: '/sidenav', controller: 'SideNavController', templateUrl: 'sidenav.html' },
        { title: 'StickySideNav', state: 'sticky_sidenav', url: '/sticky_sidenav', controller: 'StickySideNavController', templateUrl: 'sticky_sidenav.html' },

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
        function ($scope, $mdDialog, $rootScope, $mdTheming, $timeout,
            $state, $mdSidenav) { //  pipBreadcrumb,

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    Prism.highlightElement(block);
                });
            });

            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));

            $scope.content = content;

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
