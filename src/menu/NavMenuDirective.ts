'use strict';

// Prevent junk from going into typescript definitions
(() => {

    function NavMenuDirectiveController($scope, $element, $rootScope, $window, $location, $timeout, $injector, pipSideNav, pipNavMenu) {
        "ngInject";

        var animationDuration = 450,
            pipSideNavElement = $element.parent().parent();
        // Apply class and call resize
        $element.addClass('pip-sticky-nav-menu');

        $scope.sections = $scope.sections || pipNavMenu.sections;
        // $scope.showTooltip = true;
        // pipNavMenu.sections = $scope.sections;
        setCollapsible();
        // todo set from services
        $scope.defaultIcon = pipNavMenu.defaultIcon;

        onStateChanged(null, pipSideNav.state);

        $rootScope.$on('pipNavMenuChanged', onConfigChanged);
        $rootScope.$on('pipSideNavStateChanged', onStateChanged);

        $scope.itemVisible = isHidden;
        $scope.clickLink = clickLink;
        $scope.isSectionEmpty = isSectionEmpty;
        $scope.onExpand = onExpand;
        $scope.isActive = isActive;

        return;

        function setCollapsible() {
            var collapsed;
            if (angular.isFunction($scope.collapsed)) {
                collapsed = $scope.collapsed();
            } else {
                collapsed = $scope.collapsed !== false && $scope.collapsed !== 'false';
            }

            $scope.isCollapsed = collapsed;
        }

        function onExpand() {
            if (!$scope.isCollapsed) { return }

            $scope.expanded = !$scope.expanded;

            if ($scope.expanded) {
                pipSideNavElement.removeClass('pip-sticky-nav-small');
            } else {
                pipSideNavElement.addClass('pip-sticky-nav-small');
            }
            $rootScope.$emit('pipNavExpanded', $scope.expanded);
        }

        function isHidden(item) {
            return item && item.access && !item.access(item);
        }

        function isSectionEmpty(linkCollection) {
            var result = true;
            _.each(linkCollection, function (link) {
                if (!isHidden(link))
                    result = false;
            });
            return result;
        }

        function onConfigChanged(event, config) {
            if (!config) return;

            $scope.sections = config.sections;
        }

        function onStateChanged(event, state) {
            // SS> You shall not set it into the menu state. Instead it shall be controlled by the state of Sidenav
            //pipNavMenu.collapsed(state.expand);
            if (!state) return;

            $scope.isCollapsed = state.expand;
            $scope.expanded = state.isExpanded;
            $scope.expandedButton = state.expandedButton;

            $scope.sideNavState = state;
        }

        function isActive(link) {
            if (link.parentState) {
                var $state = $injector.has('$state') ? $injector.get('$state') : null;
                if ($state != null && $state.includes(link.parentState)) {
                    return true;
                }
            } else if (link.state) {
                var $state = $injector.has('$state') ? $injector.get('$state') : null;
                if ($state != null && $state.includes(link.state)) {
                    return true;
                }
            } else if (link.href) {
                if (link.href.split('?')[0] === $window.location.href.split('?')[0]) {
                    return true;
                }
            } else if (link.url) {
                if (link.url.split(/[\s/?]+/)[1] === $location.url().split(/[\s/?]+/)[1]) {
                    return true;
                }
            }


            return false;
        }

        function clickLink(event, link) {
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
                $timeout(function () {
                    $window.location.href = link.href;
                }, animationDuration);

                return;
            }
            else if (link.url) {
                if (link.url.split(/[\s/?]+/)[1] === $location.url().split(/[\s/?]+/)[1]) {
                    pipSideNav.close();
                    return;
                }

                pipSideNav.close();
                $timeout(function () {
                    $location.url(link.url);
                }, animationDuration);

                return;
            }
            else if (link.state) {
                var $state = $injector.has('$state') ? $injector.get('$state') : null;

                if ($state != null && $state.current.name === link.state) {
                    pipSideNav.close();
                    return;
                }

                pipSideNav.close();
                $timeout(function () {
                    if ($injector.has('$state')) {
                        var $state = $injector.get('$state');
                        $state.go(link.state, link.stateParams);
                    }
                }, animationDuration);

                return;
            }
            else if (link.event)
                $rootScope.$broadcast(link.event, link);

            pipSideNav.close();
        }
    }

    function navMenuDirective() {
        return {
            restrict: 'EA',
            scope: {
                // sections: '?=pipSections',
                // collapsed: '=pipCollapsed'
            },
            replace: false,
            templateUrl: 'menu/NavMenu.html',
            controller: NavMenuDirectiveController
        };
    }

    angular
        .module('pipNavMenu')
        .directive('pipNavMenu', navMenuDirective);

})();