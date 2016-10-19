/**
 * @file Application App Bar part component
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _, $) {
    'use strict';

    var thisModule = angular.module('pipAppBar.Part', ['pipAppBar.Service']);

    // Example is taken from here: http://stackoverflow.com/questions/20325480/angularjs-whats-the-best-practice-to-add-ngif-to-a-directive-programmatically
    thisModule.directive('pipAppbarPart', function (ngIfDirective) {
        var ngIf = ngIfDirective[0];

        return {
            transclude: ngIf.transclude,
            priority: ngIf.priority,
            terminal: ngIf.terminal,
            restrict: ngIf.restrict,
            link: function linkFunction($scope, $element, $attrs) {
                console.log('a', $scope.visible);
                // Visualize based on visible variable in scope
                $attrs.ngIf = function () {
                    return $scope.visible;
                };
                ngIf.link.apply(ngIf, arguments);
            },
            controller: 'pipAppBarPartController'
        };
    });

    thisModule.controller('pipAppBarPartController',
        function ($scope, $element, $attrs, $rootScope, pipAppBar, ngIfDirective) {
            var partName = '' + $attrs.pipAppbarPart;
            var partValue = null;

            // Break part apart
            var pos = partName.indexOf(':');
            if (pos > 0) {
                partValue = partName.substr(pos + 1);
                partName = partName.substr(0, pos);
            }

            onAppBarChanged(null, pipAppBar.config());

            $rootScope.$on('pipAppBarChanged', onAppBarChanged);

            function onAppBarChanged(event, config) {
                var parts = config.parts || {};
                var currentPartValue = parts[partName];
                // Set visible variable to switch ngIf
                $scope.visible = partValue ? currentPartValue == partValue : currentPartValue;

            }

        }
    );

})(window.angular, window._, window.jQuery);
