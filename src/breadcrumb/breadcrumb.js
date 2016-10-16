/**
 * @file Breadcrumb component
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _, $) {
    'use strict';

    var thisModule = angular.module('pipBreadcrumb',
        ['ngMaterial', 'pipTranslate', 'pipNav.Templates', 'pipBreadcrumb.Service']);

    // Main application header directive
    thisModule.directive('pipBreadcrumb', function () {
        return {
            restrict: 'E',
            scope: {},
            replace: false,
            templateUrl: function (element, attr) {
                return 'breadcrumb/breadcrumb.html';
            },
            controller: 'pipBreadcrumbController'
        };
    });

    thisModule.controller('pipBreadcrumbController',
        function ($scope, $element, $attrs, $rootScope, $window, $state, $location, pipBreadcrumb) {
            // Apply class and call resize
            $element.addClass('pip-breadcrumb');

            $scope.config = pipBreadcrumb.config();

            $rootScope.$on('pipBreadcrumbChanged', onBreadcrumbChanged);
            $rootScope.$on('pipBreadcrumbBack', onBreadcrumbBack);

            $scope.onBreadcrumbClick = onBreadcrumbClick;

            function onBreadcrumbChanged(event, config) {
                $scope.config = config;
            }

            function onBreadcrumbBack() {
                var items, backCallback;

                items = $scope.config.items;
                // Go to the last breadcrumb item
                if (_.isArray(items) && items.length > 0) {
                    backCallback = items[items.length - 1].click;
                    if (_.isFunction(backCallback)) {
                        backCallback();
                    } else {
                        $window.history.back();
                    }
                } else {
                    $window.history.back();
                }
            }

            function onBreadcrumbClick(item) {
                if (_.isFunction(item.click)) {
                    item.click(item);
                }
            }

            function onSearchEnable() {
                $rootScope.$broadcast('pipSearchOpen');
            }

        }
    );

})(window.angular, window._, window.jQuery);
