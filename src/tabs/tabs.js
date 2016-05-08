/**
 * @file Tabs control
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 */

/* global _, angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipTabs", ['pipAssert', 'pipNav.Templates']);

    thisModule.directive('pipTabs',
        function ($mdMedia, pipAssert) {
            return {
                restrict: 'E',
                scope: {
                    ngDisabled: '&',
                    tabs: '=pipTabs',
                    showTabs: '&pipShowTabs',
                    showTabsShadow: '&pipTabsShadow',
                    activeIndex: '=pipActiveIndex',
                    select: '=pipTabsSelect'
                },
                templateUrl: 'tabs/tabs.html',
                controller:
                    function ($scope, $element, $attrs, localStorageService) {
                        $scope.class = ($attrs.class || '') + ' md-' + localStorageService.get('theme') + '-theme';
                        pipAssert.isArray($scope.tabs, 'pipTabs: pipTabs attribute should take an array');
                        $scope.$mdMedia = $mdMedia;
                        $scope.tabs = ($scope.tabs && _.isArray($scope.tabs)) ? $scope.tabs : [];
                        $scope.activeIndex = $scope.activeIndex || 0;
                        $scope.activeTab = $scope.activeIndex;

                        $scope.disabled = function () {
                            if ($scope.ngDisabled) {
                                return $scope.ngDisabled();
                            }
                        };

                        $scope.tabDisabled = function (index) {
                            return ($scope.disabled() && $scope.activeIndex != index);
                        };

                        $scope.onSelect = function (index) {
                            if ($scope.disabled()) return;

                            $scope.activeIndex = index;
                            $scope.activeTab = $scope.activeIndex;
                            if ($scope.select) {
                                $scope.select($scope.tabs[$scope.activeIndex], $scope.activeIndex);
                            }
                        };

                        $scope.showShadow = function () {
                            if ($scope.showTabsShadow) {
                                return $scope.showTabsShadow();
                            } else {
                                return false;
                            }
                        };

                        $scope.show = function () {
                            if ($scope.showTabs) {
                                return $scope.showTabs();
                            } else {
                                return true;
                            }
                        };
                    }
            };
        }
    );

})();
