/**
 * @file Application Sid Nav part component
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _, $) {
    'use strict';

    var thisModule = angular.module('pipSideNav.Part', ['pipSideNav.Service']);

    // Example is taken from here: http://stackoverflow.com/questions/20325480/angularjs-whats-the-best-practice-to-add-ngif-to-a-directive-programmatically
    thisModule.directive('pipSidenavPart', function (ngIfDirective) {
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
            controller: 'pipSideNavPartController'
        };
    });

    thisModule.controller('pipSideNavPartController',
        function ($scope, $element, $attrs, $rootScope, pipSideNav) {
            var partName = '' + $attrs.pipSidenavPart;
            var partValue = null;

            // Break part apart
            var pos = part.indexOf(':');
            if (pos > 0) {
                partValue = partName.substr(pos + 1);
                partName = partName.substr(0, pos - 1);
            }

            onSideNavChanged(null, pipSideNav.config())

            $rootScope.$on('pipSideNavChanged', onSideNavChanged);

            function onSideNavChanged(event, config) {
                var parts = config.parts || {};
                var currentPartValue = config[partName];
                // Set visible variable to switch ngIf
                $scope.visible = partValue ? currentPartValue == partValue : partValue;
            }

        }
    );

})(window.angular, window._, window.jQuery);
