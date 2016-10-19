/**
 * @file Application Side Nav component
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular, moment */

(function (angular, moment) {
    'use strict';

    var thisModule = angular.module('pipSideNav', 
        ['ngMaterial', 'pipNav.Templates', 'pipSideNav.Service']);

    // Main application sidenav directive
    thisModule.directive('pipSidenav', function() {
       return {
           restrict: 'E',
           transclude: true,
           scope: true,
           templateUrl: 'sidenav/sidenav.html',
           controller: 'pipSideNavController'
       };
    });

    thisModule.controller('pipSideNavController', 
        function ($scope, $element, $rootScope, pipSideNav) {

            // Apply class and call resize
            $element.addClass('pip-sidenav');

            $rootScope.$on('pipNavIconClicked', onNavIconClick);
            //$rootScope.$on('pipSideNavChanged', onConfigChanged);

            return;
            
            //------------------------

            function onNavIconClick(event) {
                pipSideNav.open();
            }

        }
    );

})(window.angular, window.moment);
