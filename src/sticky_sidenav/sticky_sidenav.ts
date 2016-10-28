/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipStickySideNav', 
        ['ngMaterial', 'pipNav.Templates', 'pipSideNav.Part', 'pipSideNav.Service']);

    // Main application sidenav directive
    thisModule.directive('pipStickySidenav', function() {
       return {
           restrict: 'E',
           transclude: true,
           scope: true,
           templateUrl: 'sticky_sidenav/sticky_sidenav.html',
           controller: 'pipStickySideNavController'
       };
    });

    thisModule.controller('pipStickySideNavController', 
        function ($scope, $element, $rootScope, pipSideNav, $mdMedia) {

            // Apply class and call resize
            $element.addClass('pip-sticky-sidenav');
            $scope.$mdMedia = $mdMedia;

            $rootScope.$on('pipNavIconClicked', onNavIconClick);
            $rootScope.$on('pipSideNavToggle', onNavToggle);

            pipSideNav.id('pip-sticky-sidenav');

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
