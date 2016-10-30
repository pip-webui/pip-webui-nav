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

            $scope.navState = {
                toggle: { // media(sm, xs)
                    addClass: 'sidenav-mobile', // change size, color, selected?
                    showHeader: true,
                    isLockedOpen: false,
                    expandedButton: false,
                    isExpanded: false,
                    expand: true,
                    showIconTooltype: false
                },
                small: { // media(md)
                    addClass: 'pip-sticky-nav-small sidenav-tablet', // change size, color, selected?
                    showHeader: false,
                    isLockedOpen: true,
                    expandedButton: false,
                    isExpanded: false,
                    expand: false,
                    showIconTooltype: true
                },
                large: { // media(lg)
                    addClass: 'sidenav-desktop', // change size, color, selected?
                    showHeader: false,
                    isLockedOpen: true,
                    expandedButton: true,
                    isExpanded: true,
                    expand: true,
                    showIconTooltype: true // if !expand
                },
                xlarge: { // media(xl)
                    addClass: 'sidenav-xdesktop', // change size, color, selected?
                    showHeader: false,
                    isLockedOpen: true,
                    expandedButton: true,
                    isExpanded: false,
                    expand: true,
                    showIconTooltype: false
                }
            };

            // Apply class and call resize
            $element.addClass('pip-sticky-sidenav');
            pipSideNav.id('pip-sticky-sidenav');

            setSideNaveState();

            $scope.$mdMedia = $mdMedia;

            $rootScope.$on('pipNavIconClicked', onNavIconClick);
            $rootScope.$on('pipSideNavToggle', onNavToggle);

            $rootScope.$on('pipWindowResized', onWindowResized);

            return;

            //------------------------

            function onNavIconClick(event) {
                pipSideNav.open();
            }

            function onNavToggle(event) {
                $element.addClass('overflow-visible');
            }

            function onWindowResized() {
                console.log('$scope.windowSize', $scope.windowSize);
                if (!$mdMedia($scope.windowSize)) {
                    setSideNaveState();
                }
            }


            function setSideNaveState() {
                if ($mdMedia('xs')) {
                    setState($scope.navState.toggle);
                    $scope.windowSize = 'xs';

                    return
                }

                if ($mdMedia('sm')) {
                    setState($scope.navState.toggle);
                    $scope.windowSize = 'sm';

                    return
                }
                if ($mdMedia('md') ) {
                    setState($scope.navState.small);
                    $scope.windowSize = 'md';

                    return
                }
                if ($mdMedia('lg') ) {
                    setState($scope.navState.large);
                    $scope.windowSize = 'lg';

                    return
                }
                if ($mdMedia('xl')) {
                    setState($scope.navState.xlarge);
                    $scope.windowSize = 'xl';

                    return;
                }
            }

            function setState(state: any) {
                $element.removeClass('sidenav-mobile sidenav-desktop sidenav-tablet sidenav-xdesktop pip-sticky-nav-small');
                $scope.sidenavState = state;
                $element.addClass($scope.sidenavState.addClass);
                console.log('$scope.sidenavState', $scope.sidenavState);
                pipSideNav.state($scope.sidenavState);
            }
        }
    );

})();
