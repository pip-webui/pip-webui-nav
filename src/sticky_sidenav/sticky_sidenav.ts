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
            pipSideNav.id('pip-sticky-sidenav');            
            $scope.$mdMedia = $mdMedia;

            $rootScope.$on('pipNavIconClicked', onNavIconClick);
            $rootScope.$on('pipSideNavToggle', onNavToggle);

            $scope.navState = {
                toggle: { // media(sm, xs)
                    addClass: '', // change size, color, selected?
                    showHeader: true,
                    isLockedOpen: false,
                    expandedButton: false,
                    isExpanded: false,
                    expand: true,
                    showIconTooltype: false
                },
                small: { // media(md)
                    addClass: '', // change size, color, selected?
                    showHeader: false,
                    isLockedOpen: true,
                    expandedButton: false,
                    isExpanded: false,
                    expand: false,
                    showIconTooltype: true
                },
                large: { // media(lg)
                    addClass: '', // change size, color, selected?
                    showHeader: false,
                    isLockedOpen: true,
                    expandedButton: true,
                    isExpanded: true,
                    expand: true,
                    showIconTooltype: true // if !expand
                },
                xlarge: { // media(xl)
                    addClass: '', // change size, color, selected?
                    showHeader: false,
                    isLockedOpen: true,
                    expandedButton: true,
                    isExpanded: false,
                    expand: true,                    
                    showIconTooltype: false
                }                                

            };


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
