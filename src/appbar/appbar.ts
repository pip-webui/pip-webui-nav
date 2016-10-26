/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipAppBar',
        ['ngMaterial', 'pipNav.Templates', 'pipAppBar.Service']);

    // Main application header directive
    thisModule.directive('pipAppbar', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            templateUrl: 'appbar/appbar.html',
            controller: 'pipAppBarController'
        };
    });

    thisModule.controller('pipAppBarController',
        function ($scope, $element, $rootScope, pipAppBar) {
            // Apply class and call resize
            $element.addClass('pip-appbar');
            $element.addClass('color-primary-bg');
            
            $scope.$emit('pipResizeWindow');

            $scope.config = pipAppBar.config();

            $rootScope.$on('pipAppBarChanged', onAppBarChanged);

            function onAppBarChanged(event, config) {
                $scope.config = config;
            }
        }
    );

})();
