/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipNavMenu', 
        ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipNavMenu.Service']);

    // Main application navmenu directive
    thisModule.directive('pipNavMenu', function() {
       return {
           restrict: 'EA',
           scope: {
               config: '=pipLinks',
               collapsed: '=pipCollapsed'
           },
           replace: false,
           templateUrl: 'nav_menu/nav_menu.html',
           controller: 'pipNavMenuController'
       };
    });

    thisModule.controller('pipNavMenuController', 
        function ($scope, $element, $rootScope, $window, $location, $timeout, $injector, pipSideNav, pipNavMenu) {

            var pipSdeNavElement = $element.parent().parent();
            // Apply class and call resize
            $element.addClass('pip-nav-menu');
            $scope.config = $scope.config || pipNavMenu.get();
            setCollapsible();
            $scope.expanded = true;
            pipNavMenu.set($scope.config);


            $rootScope.$on('pipNavMenuChanged', onConfigChanged);

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
                pipNavMenu.collapsed(collapsed);
            }

            function onExpand() {
                $scope.expanded = !$scope.expanded;

                if ($scope.expanded) {
                    pipSdeNavElement.removeClass('pip-nav-small');
                } else {
                    pipSdeNavElement.addClass('pip-nav-small');
                }
                $rootScope.$broadcast('pipNavExpanded', $scope.expanded);
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
                $scope.isCollapsed = pipNavMenu.collapsed();
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
