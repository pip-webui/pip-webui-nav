(function (angular) {
    'use strict';

    var thisModule = angular.module('app', [
        'ngAria', 'wu.masonry',
        'ngAnimate', 'pipTranslate',
        'pipLayout', 'ui.utils',
        'pipServices', 'LocalStorageModule',
        'ui.router',
        'ngMaterial',
        'pipNav',
        'pipTheme.Default', 'pipTheme.Bootbarn', 'pipTheme',  'pipBehaviors',
        'pipTranslate'
    ]);

    var content = [
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
                {title: 'Big Picture Big Picture Big Picture', icon: 'icons:goal', url: '/unfinished?party_id=:party_id', count: 25},
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

    thisModule.config(function ($mdIconProvider, pipAppBarProvider, $stateProvider,
                                $urlRouterProvider) {
        $mdIconProvider.iconSet('icons', '../images/icons.svg', 512);

    });

    thisModule.controller('appController',
        function ($scope, $mdDialog, $rootScope, $mdTheming, $timeout,
                  $state, $mdSidenav, pipSideNav) { //  pipBreadcrumb,

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    Prism.highlightElement(block);
                });
            });

            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));
            pipSideNav.id('pip-sticky-sidenav');

            $scope.content = content;
            $scope.content1 = [
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

            $scope.user = {
                fullName: 'Kate Negrienko',
                details: 'details',
                imageUrl: 'http://www.american.edu/uploads/profiles/large/kate_resnick_avatar_3001.jpg'
            };

            $scope.onToggleMenu = function() {
                //$mdSidenav('left').toggle();
            };

            $scope.isActiveState = function(state) {
                return ;//$state.current.name == state;
            };

            $scope.test = true;

            $scope.onTest = function() {
                // $scope.smallSize = !$scope.smallSize;
                $scope.test = !$scope.test;
            }

            $scope.onToggleSideNav = function () {
                pipSideNav.toggle();
            };

        });

})(window.angular);
