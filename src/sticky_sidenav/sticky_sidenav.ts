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
        function ($scope, $element, $rootScope, $injector, $mdMedia, $timeout, pipSideNav) {

            var pipMedia = $mdMedia, 
            // var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null,
                mainContainer = '.pip-main',
                bigWidth = 320, // expanded sidenav width
                smallWidth = 72,
                isResizing = false; // shrink sidenav width

            pipMedia = pipMedia !== undefined ? pipMedia : $mdMedia;

            $scope.navState = {
                toggle: { // media(sm, xs)
                    id: 'toggle',
                    addClass: 'sidenav-mobile', // change size, color, selected?
                    showHeader: true,
                    isLockedOpen: false,
                    expandedButton: false,
                    isExpanded: true,
                    expand: true,
                    showIconTooltype: false
                },
                small: { // media(md)
                    id: 'small',
                    addClass: 'pip-sticky-nav-small sidenav-desktop', // change size, color, selected?
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
                    addClass: 'sidenav-desktop', // change size, color, selected?
                    showHeader: false,
                    isLockedOpen: true,
                    expandedButton: false,
                    isExpanded: true,
                    expand: true,
                    showIconTooltype: false
                }
            };

            // Apply class and call resize
            $element.addClass('pip-sticky-sidenav .sidenav-desktop-not-animation');
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
                if (!pipMedia)  return;

                if (!pipMedia($scope.windowSize)) {
                    setSideNaveState();
                }
            }

            function onSideNavState(event, state) {
                if (angular.isString(state) && $scope.navState[state] !== undefined) {
                    setState(state);
                }
            }

            function setSideNaveState() {
                if (isResizing) return;

                if (!pipMedia)  setState('toggle');

                if (pipMedia('xs')) {
                    if (isChange('small')) {
                        setState('toggle');
                        $scope.windowSize = 'xs';
                    }

                    return
                }

                if (pipMedia('sm')) {
                    if (isChange('small')) {
                        setState('toggle');
                        $scope.windowSize = 'sm';
                    }

                    return
                }
               
                if (pipMedia('md') ) {
                    if (isChange('small')) {
                        setState('small');
                        $scope.windowSize = 'md';
                    }

                    return
                }
               
                if (pipMedia('lg') ) {
                    if (isChange('small')) {
                        setState('large');
                        $scope.windowSize = 'lg';
                    }
                    return
                }
           
                if (pipMedia('xl')) {
                    setState('xlarge');
                    $scope.windowSize = 'xl';

                    return;
                }
            }

            function isChange(state) {
                return true;
                // if (!$scope.sidenavState || !$scope.sidenavState.id) return true;

                // var mainWidth = $(mainContainer).innerWidth(),
                //     elementWidth = $('.pip-sticky-sidenav').innerWidth(),
                //     prevState = $scope.sidenavState.id, boundaries; 

                // if (pipMedia) {
                //     if (state == 'large' && prevState == 'small') {
                //         boundaries = pipMedia().getBoundaries('lg');
                //         console.log('large -> small', mainWidth + smallWidth - elementWidth < boundaries[0]);
                //         console.log('(mainWidth + smallWidth - elementWidth) < boundaries[0]', mainWidth + smallWidth - elementWidth, boundaries[0]);                        
                //         console.log('(mainWidth + smallWidth - elementWidth) < boundaries[0]', mainWidth, bigWidth, elementWidth, boundaries[0]);                        
                //         if (boundaries && boundaries[0] && mainWidth) {
                //             return (mainWidth + smallWidth - elementWidth) < boundaries[0]
                //         } return true;
                //     } else if (state == 'small' && prevState == 'large') {
                //         boundaries = pipMedia().getBoundaries('lg');
                //         console.log('large -> small', mainWidth + smallWidth - elementWidth < boundaries[0]);
                //         console.log('large -> small', mainWidth + smallWidth - elementWidth, boundaries[0]);
                //         console.log('mainWidth + smallWidth - elementWidth < boundaries[0]', mainWidth, smallWidth, elementWidth, boundaries[0]);
                //         if (boundaries && boundaries[0] && mainWidth) {
                //             return (mainWidth + smallWidth - elementWidth < boundaries[0]);
                //         }  return true;
                //     } if (state == 'toggle') {
                //         boundaries = pipMedia().getBoundaries('md');
                //         console.log('small -> toggle', mainWidth - smallWidth + elementWidth < boundaries[0]);
                //         console.log('mainWidth - elementWidth < boundaries[0]', mainWidth, elementWidth, boundaries[0]);                          
                //         if (boundaries && boundaries[0] && mainWidth) {
                //             return (mainWidth - elementWidth < boundaries[0]);
                //         }  return true;                        
                //     } else return true;
                // } else {
                //     return true;
                // }
            }

            function setState(state: string) {
                if (isResizing) return;
                if ($scope.sidenavState && state == $scope.sidenavState.id) return;

                if ($scope.sidenavState && $scope.sidenavState.id == 'toggle') {
                    $element.removeClass('sidenav-mobile');
                }

                if ($scope.sidenavState && $scope.sidenavState.id == 'small') {
                    $element.removeClass('pip-sticky-nav-small');
                }

                if (state == 'toggle') {
                    $element.removeClass('sidenav-desktop pip-sticky-nav-small'); 
                }
                isResizing = true;
                $scope.sidenavState = $scope.navState[state];
                $element.addClass($scope.sidenavState.addClass);
                pipSideNav.state($scope.sidenavState);

                // complete animation
                $timeout(function () {
                    isResizing = false;
                }, 450);

            }
        }
    );

})();
