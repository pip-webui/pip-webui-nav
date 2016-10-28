/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipScaleNavMenu', 
        ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipScaleNavMenu.Service']);

    // Main application navmenu directive
    thisModule.directive('pipScaleNavMenu', function() {
       return {
           restrict: 'EA',
           scope: {
               config: '=pipLinks',
               collapsed: '=pipCollapsed'
           },
           replace: false,
           templateUrl: 'scale_nav_menu/scale_nav_menu.html',
           controller: 'pipScaleNavMenuController'
       };
    });

    thisModule.controller('pipScaleNavMenuController', 
        function ($scope, $element, $rootScope, $window, $location, $timeout, $injector, pipSideNav, pipScaleNavMenu) {

            var pipSdeNavElement = $element.parent().parent();
            // Apply class and call resize
            $element.addClass('pip-scale-nav-menu');
            $scope.config = $scope.config || pipScaleNavMenu.get();
            setCollapsible();
            $scope.expanded = true;
            pipScaleNavMenu.set($scope.config);


            $rootScope.$on('pipScaleNavMenuChanged', onConfigChanged);

            $scope.itemVisible = itemVisible;
            $scope.onLinkClick = onLinkClick;
            $scope.isSectionEmpty = isSectionEmpty;
            $scope.onExpand = onExpand;

            return;
            
            //------------------------

            function setCollapsible() {
                var collapsed;
                if (angular.isFunction($scope.collapsed)) {
                    collapsed = $scope.collapsed();
                } else {
                    collapsed = $scope.collapsed !== false && $scope.collapsed !== 'false';
                }

                $scope.collapsibled = collapsed;
                pipScaleNavMenu.collapsed(collapsed);
            }

            function onExpand() {
                $scope.expanded = !$scope.expanded;

                if ($scope.expanded) {
                    pipSdeNavElement.removeClass('pip-scale-nav-small');
                } else {
                    pipSdeNavElement.addClass('pip-scale-nav-small');
                }
                $rootScope.$broadcast('pipScaleNavExpanded', $scope.expanded);
            }
            
            function itemVisible(item) {
                return item && item.access && !item.access(item);
            }

            function isSectionEmpty(linkCollection) {
                var result = true;
                _.each(linkCollection, function(link){
                    if (!itemVisible(link))
                        result = false;
                });
                return result;
            }

            function onConfigChanged(event, config) {
                $scope.isCollapsed = pipScaleNavMenu.collapsed();
                $scope.config = config;
            }

            function onLinkClick(event, link) {
                event.stopPropagation();

                if (!link) {
                    pipSideNav.close();
                    return;
                }

                if (link.href) {
                    if (link.href.split('?')[0] === $window.location.href.split('?')[0]) {
                        pipSideNav.close();
                        return;
                    }

                    pipSideNav.close();
                    $timeout(function() {
                        $window.location.href = link.href;
                    }, 300);

                    return;
                }
                else if (link.url) {
                    if (link.url.split(/[\s/?]+/)[1] === $location.url().split(/[\s/?]+/)[1]) {
                        pipSideNav.close();
                        return;
                    }

                    pipSideNav.close();
                    $timeout(function() {
                        $location.url(link.url);
                    }, 300);

                    return;
                }
                else if (link.state) {
                    var $state = $injector.has('$state') ? $injector.get('$state') : null;
                    
                    if ($state != null && $state.current.name === link.state) {
                        pipSideNav.close();
                        return;
                    }

                    pipSideNav.close();
                    $timeout(function() {
                        if ($injector.has('$state')) {
                            var $state = $injector.get('$state');
                            $state.go(link.state, link.stateParams);
                        }
                    }, 300);

                    return;
                }
                else if (link.event)
                    $rootScope.$broadcast(link.event, link);

                pipSideNav.close();
            }
        }
    );

})();
