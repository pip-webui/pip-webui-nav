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
        function ($scope, $element, $rootScope, $injector, $mdMedia, pipSideNav) {

            var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null,
                mainContainer = '.pip-main',
                bigWidth = 322, // expanded sidenav width
                smallWidth = 74; // shrink sidenav width

            $scope.media = pipMedia ? pipMedia : $mdMedia;
            // $scope.$mdMedia = $mdMedia;

            $scope.navState = {
                toggle: { // media(sm, xs)
                    id: 'toggle',
                    addClass: 'sidenav-mobile', // change size, color, selected?
                    showHeader: true,
                    isLockedOpen: false,
                    expandedButton: false,
                    isExpanded: false,
                    expand: true,
                    showIconTooltype: false
                },
                small: { // media(md)
                    id: 'small',
                    addClass: 'pip-sticky-nav-small sidenav-tablet', // change size, color, selected?
                    showHeader: false,
                    isLockedOpen: true,
                    expandedButton: false,
                    isExpanded: false,
                    expand: false,
                    showIconTooltype: true
                },
                large: { // media(lg)
                    id: 'large',
                    addClass: 'sidenav-desktop', // change size, color, selected?
                    showHeader: false,
                    isLockedOpen: true,
                    expandedButton: true,
                    isExpanded: true,
                    expand: true,
                    showIconTooltype: true 
                },
                xlarge: { // media(xl)
                    id: 'xlarge',
                    addClass: 'sidenav-xdesktop', // change size, color, selected?
                    showHeader: false,
                    isLockedOpen: true,
                    expandedButton: true,
                    isExpanded: false,
                    expand: true,
                    showIconTooltype: true
                }
            };

            // Apply class and call resize
            $element.addClass('pip-sticky-sidenav');
            pipSideNav.id('pip-sticky-sidenav');

            setSideNaveState();

            $rootScope.$on('pipNavIconClicked', onNavIconClick);
            $rootScope.$on('pipSideNavState', onSideNavState);
            $rootScope.$on('pipWindowResized', onWindowResized);

            return;

            //------------------------

            function onNavIconClick(event) {
                pipSideNav.open();
            }

            function onWindowResized() {
                if (!$mdMedia($scope.windowSize)) {
                    setSideNaveState();
                }
            }

            function onSideNavState(event, state) {
                if (angular.isString(state) && $scope.navState[state] !== undefined) {
                    setState(state);
                }
            }

            function setSideNaveState() {
                if ($scope.media('xs')) {
                    setState('toggle');
                    $scope.windowSize = 'xs';

                    return
                }

                if ($scope.media('sm')) {
                    setState('toggle');
                    $scope.windowSize = 'sm';

                    return
                }
                if ($scope.media('md') ) {
                    if (isChange('small')) {
                        setState('small');
                        $scope.windowSize = 'md';
                    }

                    return
                }
                if ($scope.media('lg') ) {
                    if (isChange('small')) {
                        setState('large');
                        $scope.windowSize = 'lg';
                    }
                    return
                }
                if ($scope.media('xl')) {
                    setState('xlarge');
                    $scope.windowSize = 'xl';

                    return;
                }
            }

            function isChange(state) {
                if (!$scope.sidenavState || !$scope.sidenavState.id) return true;

                var mainWidth = $(mainContainer).innerWidth(),
                    elementWidth = $('pip-sticky-sidenav').innerWidth(),
                    prevState = $scope.sidenavState.id, boundaries; 
console.log('width', elementWidth, mainWidth);
                if (pipMedia) {
                    if (state == 'large' && prevState == 'small') {
                        boundaries = pipMedia().getBoundaries('lg');
                        if (boundaries && boundaries[0] && mainWidth) {
                            return (mainWidth - bigWidth + elementWidth) > boundaries[0]
                        } return true;
                    } else if (state == 'small' && prevState == 'large') {
                        boundaries = pipMedia().getBoundaries('lg');
                        if (boundaries && boundaries[0] && mainWidth) {
                            return (mainWidth - smallWidth + elementWidth < boundaries[0]);
                        }  return true;
                    } return true;
                } else {
                    return true;
                }
            }

            function setState(state: string) {
                $element.removeClass('sidenav-mobile sidenav-desktop sidenav-tablet sidenav-xdesktop pip-sticky-nav-small');
                $scope.sidenavState = $scope.navState[state];
                $element.addClass($scope.sidenavState.addClass);

                pipSideNav.state($scope.sidenavState);
            }
        }
    );

})();
