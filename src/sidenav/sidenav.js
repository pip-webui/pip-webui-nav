/**
 * @file Application Side Nav component
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipSideNav', 
        ['ngMaterial', 'pipTranslate', 'pipFocused', 'pipNav.Templates', 'pipSideNav.Service']);

    thisModule.config(function(pipTranslateProvider) {

        pipTranslateProvider.translations('en', {
            'SIDENAV_SINCE': 'since'
        });

        pipTranslateProvider.translations('ru', {
            'SIDENAV_SINCE': 'с'
        });

    });

    // Main application sidenav directive
    thisModule.directive('pipSidenav', function() {
       return {
           restrict: 'EA',
           scope: false,
           replace: false,
           templateUrl: 'sidenav/sidenav.html',
           controller: 'pipSideNavController'
       };
    });

    thisModule.controller('pipSideNavController', 
        function ($scope, $element, $state, $rootScope, $window, $location, $timeout, pipState, pipTranslate, pipSideNav) {

            // Apply class and call resize
            $element.addClass('pip-sidenav');

            $scope.config = pipSideNav.config();
            $scope.$avatarReset = false;

            $rootScope.$on('pipAppBarNavIconClicked', onAppBarNavIconClick);
            $rootScope.$on('pipSideNavChanged', onConfigChanged);

            $scope.itemVisible = itemVisible;
            $scope.onUserClick = onUserClick;
            $scope.onPartyClick = onPartyClick;
            $scope.onLinkClick = onLinkClick;
            $scope.isSectionEmpty = isSectionEmpty;

            return;
            
            //------------------------

            function itemVisible(item) {
                return item && item.access && !item.access($rootScope.$party, $rootScope.$user, item);
            }

            function isSectionEmpty(linkCollection) {
                var result = true;
                _.each(linkCollection, function(link){
                    if (!itemVisible(link))
                        result = false;
                });
                return result;
            }

            function onAppBarNavIconClick(event) {
                pipSideNav.open();
            }

            function onConfigChanged(event, config) {
                $scope.config = config; 
            }

            function onUserClick() {
                $rootScope.$broadcast('pipSideNavUserClicked');
                pipSideNav.close();
            }

            function onPartyClick() {
                $rootScope.$broadcast('pipSideNavPartyClicked');
                pipSideNav.close();
            }

            function processStateParams(params) {
                if (params == null) return null;

                var result = {};
                for (var prop in params) {
                    if (params.hasOwnProperty(prop)) {
                        if (params[prop] == ':party_id') {
                            result[prop] = $rootScope.$party ? $rootScope.$party.id : null;
                        } else if (params[prop] == ':user_id') {
                            result[prop] = $rootScope.$user ? $rootScope.$user.id : null;
                        } else {
                            result[prop] = params[prop];   
                        }
                    }
                }
                return result;
            }

            function processUrlParams(url) {
                if (url == null) return null;

                var result = url.replace(':party_id', $rootScope.$party ? $rootScope.$party.id : '');
                result = result.replace(':user_id', $rootScope.$user ? $rootScope.$user.id : '');

                return result;
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

                    $window.location.href = processUrlParams(link.href);
                }
                else if (link.url) {
                    if (link.url.split(/[\s/?]+/)[1] === $location.url().split(/[\s/?]+/)[1]) {
                        pipSideNav.close();
                        return;
                    }

                    $location.url(processUrlParams(link.url));
                }
                else if (link.state) {
                    if ($state.current.name === link.state) {
                        pipSideNav.close();
                        return;
                    }

                    pipState.go(link.state, processStateParams(link.stateParams));
                }
                else if (link.event)
                    $rootScope.$broadcast('pipSideNavLinkClicked', link.event);

                pipSideNav.close();
            }
        }
    );

})();
