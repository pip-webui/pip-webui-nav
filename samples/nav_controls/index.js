
(function (angular) {
    'use strict';
    
    var thisModule = angular.module('appNav',
        [
            'pipSampleConfig',
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate',
            'pipCore', 'pipNav',
            'appNav.Tabs', 'appNav.Dropdown'

        ]
    );

    thisModule.controller('AppController',
        function ($scope, $rootScope, $state, $mdSidenav, pipTranslate, $timeout, $mdMedia, pipAppBar) {
            $scope.pages = [
                {title: 'DROPDOWN', state: 'dropdown', url: '/dropdown', controller: 'DropdownController',
                    templateUrl: 'dropdown.html'
                },
                {title: 'TABS', state: 'tabs', url: '/tabs', controller: 'TabsController', templateUrl: 'tabs.html'}
            ];
            $scope.selected = {};
            $timeout(function () {
                $scope.selected.pageIndex = _.findIndex($scope.pages, {state: $state.current.name});
            });

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('NAVIGATION_CONTROLS');

            $scope.onNavigationSelect = function (stateName) {
                if ($state.current.name !== stateName) {
                    $state.go(stateName);
                }
            };

            $scope.onDropdownSelect = function (obj) {
                if ($state.current.name !== obj.state) {
                    $state.go(obj.state);
                }
            };
        }
    );

})(window.angular);
