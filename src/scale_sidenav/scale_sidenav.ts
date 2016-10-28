/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipScaleSideNav', 
        ['ngMaterial', 'pipNav.Templates', 'pipSideNav.Part', 'pipSideNav.Service']);

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
        function ($scope, $element, $rootScope, pipSideNav, $mdMedia) {

            // Apply class and call resize
            $element.addClass('pip-scale-sidenav');
            $scope.$mdMedia = $mdMedia;

            $rootScope.$on('pipNavIconClicked', onNavIconClick);
            $rootScope.$on('pipSideNavToggle', onNavToggle);

            pipSideNav.id('pip-scale-sidenav');

            return;
            
            //------------------------

            function onNavIconClick(event) {
                pipSideNav.open();
            }

            function onNavToggle(event) {
                console.log('onNavToggle')
                $element.addClass('overflow-visible');
            }

        }
    );

})();
