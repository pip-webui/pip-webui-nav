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
            link: function($scope, $element, $attrs) {
                // Visualize based on visible variable in scope
                $attrs.ngIf = function() { $scope.visible };
                ngIf.link.apply(ngIf);
            },
            controller: 'pipAppBarPartController'
        };
    });

    thisModule.controller('pipAppBarPartController',
        function ($scope, $element, $attrs, $rootScope, pipAppBar) {
            var partName = '' + $attrs.pipAppbarPart;
            var partValue = null;

            // Break part apart
            var pos = part.indexOf(':');
            if (pos > 0) {
                partValue = partName.substr(pos + 1);
                partName = partName.substr(0, pos - 1);
            }

            onAppBarChanged(null, pipAppBar.config())

            $rootScope.$on('pipAppBarChanged', onAppBarChanged);

            function onAppBarChanged(event, config) {
                var parts = config.parts || {};
                var currentPartValue = config[partName];
                // Set visible variable to switch ngIf
                $scope.visible = partValue ? currentPartValue == partValue : partValue;
            }

        }
    );

})(window.angular, window._, window.jQuery);
