/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipDropdown', ['pipNav.Templates']);

    thisModule.directive('pipDropdown',
        function ($mdMedia) {
            return {
                restrict: 'E',
                scope: {
                    ngDisabled: '&',
                    actions: '=pipActions',
                    showDropdown: '&pipShow',
                    activeIndex: '=pipActiveIndex',
                    select: '=pipDropdownSelect'
                },
                templateUrl: 'dropdown/dropdown.html',
                controller:
                    function ($scope, $element, $attrs, $injector, $rootScope) {
                        var pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null, 
                            currentTheme = 'blue';
                        if (pipTheme) {
                            currentTheme = pipTheme.use();
                        } else if ($rootScope.$theme) {
                            currentTheme = $rootScope.$theme;
                        }
                        $scope.class = ($attrs.class || '') + ' md-' + currentTheme + '-theme';

                        //pipAssert.isArray($scope.actions, 'pipDropdown: pip-actions attribute should take an array, but take ' + typeof $scope.actions);
                        $scope.$mdMedia = $mdMedia;
                        $scope.actions = ($scope.actions && _.isArray($scope.actions)) ? $scope.actions : [];
                        $scope.activeIndex = $scope.activeIndex || 0;

                        $scope.disabled = function () {
                            if ($scope.ngDisabled()) {
                                return $scope.ngDisabled();
                            } else {
                                return false;
                            }
                        };

                        $scope.onSelect = function (index) {
                            $scope.activeIndex = index;
                            if ($scope.select) {
                                $scope.select($scope.actions[index], $scope.activeIndex);
                            }
                        };

                        $scope.show = function () {
                            if ($scope.showDropdown()) {
                                return $scope.showDropdown();
                            } else {
                                return true;
                            }
                        };

                    }
            };
        }
    );

})();
