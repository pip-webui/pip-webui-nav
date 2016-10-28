/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipScaleSideNav', 
        ['ngMaterial', 'pipNav.Templates', 'pipScaleSideNav.Part', 'pipScaleSideNav.Service']);

    // Main application sidenav directive
    thisModule.directive('pipScaleSidenav', function() {
       return {
           restrict: 'E',
           transclude: true,
           scope: true,
           templateUrl: 'scale_sidenav/scale_sidenav.html',
           controller: 'pipScaleSideNavController'
       };
    });

    thisModule.controller('pipScaleSideNavController', 
        function ($scope, $element, $rootScope, pipScaleSideNav, $mdMedia) {

            // Apply class and call resize
            $element.addClass('pip-scale-sidenav');
            $scope.$mdMedia = $mdMedia;

            $rootScope.$on('pipNavIconClicked', onNavIconClick);
            $rootScope.$on('pipScaleSideNavToggle', onNavToggle);

            return;
            
            //------------------------

            function onNavIconClick(event) {
                pipScaleSideNav.open();
            }

            function onNavToggle(event) {
                console.log('onNavToggle')
                $element.addClass('overflow-visible');
            }

        }
    );

})();
