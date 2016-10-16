/**
 * @file Nav Icon component
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _, $) {
    'use strict';

    var thisModule = angular.module('pipNavIcon',
        ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipNavIcon.Service']);

    thisModule.directive('pipNavIcon', function () {
        return {
            restrict: 'E',
            scope: {
                type: '=pipType',
                imageUrl: '=pipImageUrl'
            },
            replace: false,
            templateUrl: function (element, attr) {
                return 'nav_icon/nav_icon.html';
            },
            controller: 'pipNavIconController'
        };
    });

    thisModule.controller('pipNavIconController',
        function ($scope, $element, $attrs, $rootScope, $window, pipNavIcon) {
            // Apply class and call resize
            $element.addClass('pip-nav-icon');

            $scope.config = pipNavIcon.config();

            $rootScope.$on('pipNavIconChanged', onNavIconChanged);

            $scope.onNavIconClick = onNavIconClick;

            function onNavIconChanged(event, config) {
                $scope.config = config;
            }

            function onNavIconClick() {
                var breadcrumb, backCallback;

                if (_.isFunction($scope.config.callback)) {
                    // Execute nav icon callback
                    $scope.config.callback();
                }
                else if ($scope.config.event) {
                    $rootScope.$broadcast($scope.config.event);
                }
                else if ($scope.config.type == 'back') {
                    $window.history.back();
                } else {
                    $rootScope.$broadcast('pipNavIconClicked');
                }
            }

        }
    );

})(window.angular, window._, window.jQuery);
