/**
 * @file Application App Bar component
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global $, angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipAppBar', 
        ['ngMaterial', 'pipTranslate', 'pipNav.Templates', 'pipAppBar.Service']);

    thisModule.config(function(pipTranslateProvider) {

        pipTranslateProvider.translations('en', {
            'APPBAR_SEARCH': 'Search'
        });

        pipTranslateProvider.translations('ru', {
            'APPBAR_SEARCH': 'Поиск'
        });

    });

    // Main application header directive
    thisModule.directive('pipAppbar', function() {
       return {
           restrict: 'E',
           scope: {
               title: '=pipTitle',
               showMenu: '=pipShowMenu',
               localActions: '=pipLocalActions',
               globalActions: '=pipGlobalActions'
           },
           replace: false,
           templateUrl: function(element, attr) {
               return 'appbar/appbar.html';
           },
           controller: 'pipAppBarController'
       };
    });

    thisModule.controller('pipAppBarController',
        function ($scope, $element, $attrs, $rootScope, $window, $state, $location, pipTranslate, pipAppBar, localStorageService) {
            // Initialize default application title
            if ($scope.title)
                pipAppBar.showTitleText($scope.title);                
            if ($scope.showMenu)
                pipAppBar.showMenuNavIcon();


            // Apply class and call resize
            $element.addClass('pip-appbar');
            $scope.$emit('pipResizeWindow');

            $scope.config = pipAppBar.config();

            if ($scope.localActions) {
                pipAppBar.showLocalActions();
                $scope.config.primaryLocalActions = $scope.localActions[0];
                $scope.config.secondaryLocalActions = $scope.localActions[1];
            }

            if ($scope.globalActions) {
                pipAppBar.showLocalActions();
                $scope.config.primaryGlobalActions = $scope.globalActions[0];
                $scope.config.secondaryGlobalActions = $scope.globalActions[0];
            }

            $scope.searchEnabled = false;
            $scope.search = { text: '' };

            $rootScope.$on('pipAppBarChanged', onAppBarChanged);

            $scope.language = getLanguage;
            $scope.actionHidden = actionHidden;
            $scope.actionCount = actionCount;
            $scope.secondaryActionsVisible = secondaryActionsVisible;
            $scope.secondaryDividerVisible = secondaryDividerVisible;

            $scope.onNavIconClick = onNavIconClick;
            $scope.onBreadcrumbClick = onBreadcrumbClick;
            $scope.onLanguageClick = onLanguageClick;
            $scope.onActionClick = onActionClick;

            $scope.onSearchEnable = onSearchEnable;
            $scope.onSearchClick = onSearchClick;
            $scope.onSearchClear = onSearchClear;
            $scope.onSearchKeyDown = onSearchKeyDown;

            $scope.getParty = getParty;
            $scope.getUser = getUser;

            $scope.openMenu = openMenu;

            return;
            //---------------------------

             function openMenu ($mdOpenMenu, ev) {
                $scope.originatorEv = ev;
                $mdOpenMenu(ev);
            };

            function getParty(prop) {
                if (!$rootScope.$party) return;
                else {
                    if (prop) return $rootScope.$party[prop];
                    else return $rootScope.$party;
                }
            }

            function getUser(prop) {
                if (!$rootScope.$user) return;
                else {
                    if (prop) return $rootScope.$user[prop];
                    else return $rootScope.$user;
                }
            }

            function onAppBarChanged(event, config) {
                $scope.config = config;
                $scope.searchEnabled = false;
                $scope.search.text = '';
            }

            function getLanguage() {
                return pipTranslate.use();
            }

            function actionHidden(action) {
                return action.access
                    && !action.access($rootScope.$party, $rootScope.$user, action);
            }

            function actionCount(action) {
                if (action.count == null || action.count <= 0)
                    return '';
                if (action.count > 99)
                    return '!';
                return action.count;
            }

            function calcActions(actions) {
                var count = 0;
                _.each(actions, function(action) {
                    if (!actionHidden(action)) count++;
                });
                return count;
            }

            function secondaryActionsVisible() {
                return calcActions($scope.config.secondaryGlobalActions) > 0
                    || calcActions($scope.config.secondaryLocalActions) > 0;
            }

            function secondaryDividerVisible() {
                return calcActions($scope.config.secondaryGlobalActions) > 0
                    && calcActions($scope.config.secondaryLocalActions) > 0;
            }

            function onNavIconClick() {
                if (_.isFunction($scope.config.navIconCallback)) {
                    // Execute nav icon callback
                    $scope.config.navIconCallback();
                } else {
                    if ($scope.config.navIconType != 'back') {
                        // Raise an event
                        $rootScope.$broadcast('pipAppBarNavIconClicked');
                    }
                    else if ($scope.config.titleType == 'breadcrumb') {
                        var breadcrumb = $scope.config.titleBreadcrumb;
                        // Go to the last breadcrumb item
                        if (_.isArray(breadcrumb) && breadcrumb.length > 0) {
                            var backCallback = breadcrumb[breadcrumb.length - 1].click;
                            if (_.isFunction(backCallback)) backCallback();
                            else $window.history.back();
                        } else {
                            $window.history.back();
                        }
                    } else {
                        // Go back in history
                        $window.history.back();
                    }
                }
            }

            function onBreadcrumbClick(item) {
                if (_.isFunction(item.click))
                    item.click(item);
            }

            function onLanguageClick(language) {
                setTimeout(function () {
                    pipTranslate.use(language);
                    $rootScope.$apply();
                }, 0);
            }

            function processStateParams(params) {
                if (params == null) return null;

                var result = {};
                var prop;
                for (prop in params) {
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
                result = result.replace(':user_id', $rootScope.user ? $rootScope.$user.id : '');
                return result;
            }

            function focusSearchText() {
                setTimeout(function() {
                    var element = $('.pip-search-text');
                    if (element.length > 0)
                        element.focus();
                }, 0);
            }

            function onActionClick(action, $mdOpenMenu) {
                if (action == null || action.divider) {
                    return;
                }

                if(action.close){
                    $scope.originatorEv = null
                }

                if (action.menu)
                    $mdOpenMenu($scope.originatorEv);
                else if (action.callback)
                    action.callback();
                else if (action.href)
                    $window.location.href = processUrlParams(action.href);
                else if (action.url)
                    $location.url(processUrlParams(action.url));
                else if (action.state)
                    $state.go(action.state, processStateParams(action.stateParams));
                else if (action.event)
                    $rootScope.$broadcast(action.event);
                else
                    // Otherwise raise notification
                    $rootScope.$broadcast('pipAppBarActionClicked', action.name);


            }

            function onSearchEnable() {
                $scope.search.text = $scope.config.searchCriteria;
                $scope.searchEnabled = true;
                focusSearchText();
            }

            function onSearchClick() {
                var searchText = $scope.search.text;
                
                $scope.search.text = '';
                $scope.searchEnabled = false;

                if ($scope.config.searchCallback)
                    $scope.config.searchCallback(searchText);
                else
                    $rootScope.$broadcast('pipAppBarSearchClicked', searchText);
            }

            function onSearchClear() {
                if ($scope.search.text) {
                    $scope.search.text = '';

                    focusSearchText();
                } else {
                    $scope.searchEnabled = false;
                    onSearchClick();
                }
            }

            function onSearchKeyDown(event) {
                // Enter pressed
                if (event.keyCode == 13)
                    $scope.onSearchClick();
                // ESC pressed
                else if (event.keyCode == 27) 
                    $scope.searchEnabled = false;
            }
        }
    );

})();
