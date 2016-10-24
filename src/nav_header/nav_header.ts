/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipNavHeader', 
        ['ngMaterial', 'pipNav.Templates']);

    // Main application nav-header directive
    thisModule.directive('pipNavHeader', function() {
       return {
           restrict: 'EA',
           scope: {
               user: '=pipUser',
           },
           replace: false,
           templateUrl: 'nav_header/nav_header.html',
           controller: 'pipNavHeaderController'
       };
    });

    thisModule.controller('pipNavHeaderController', 
        function ($scope, $element, $rootScope) {

            // Apply class and call resize
            $element.addClass('pip-nav-header');

            $rootScope.$on('pipIdentityChanged', onIdentityChanged);

            $scope.getUser = getUser;
            $scope.onUserClick = onUserClick;

            return;
            
            //------------------------

            function getUser(prop) {
                var value = $scope.user || $scope.identity || {};

                if (prop) return value[prop];

                return value;
            }
                        
            function onIdentityChanged(event, identity) {
                $scope.identity = identity;
            }

            function onUserClick() {
                $rootScope.$broadcast('pipNavUserClicked');
                //pipSideNav.close();
            }

        }
    );

})();
