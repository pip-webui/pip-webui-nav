
(function (angular) {
    'use strict';
    
    var thisModule = angular.module('appNav',
        [
            'pipSampleConfig',
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate',
            'pipServices', 'pipNav',
            'appNav.Tabs', 'appNav.Dropdown'

        ]
    );

    var content = [
        {title: 'DROPDOWN', state: 'dropdown', url: '/dropdown', controller: 'DropdownController',
            templateUrl: 'dropdown.html'
        },
        {title: 'TABS', state: 'tabs', url: '/tabs', controller: 'TabsController', templateUrl: 'tabs.html'}
    ];
    
    
    thisModule.controller('AppController',
        function ($scope, $rootScope, $state, $mdSidenav, pipTranslate, $timeout, $mdMedia, pipAppBar) {
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
        }
    );

})(window.angular);
