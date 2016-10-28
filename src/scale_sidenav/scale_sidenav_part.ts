/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipScaleSideNav.Part', ['pipScaleSideNav.Service']);

    // Example is taken from here: http://stackoverflow.com/questions/20325480/angularjs-whats-the-best-practice-to-add-ngif-to-a-directive-programmatically
    thisModule.directive('pipScaleSidenavPart', function (ngIfDirective) {
        var ngIf = ngIfDirective[0];

        return {
            transclude: ngIf.transclude,
            priority: ngIf.priority,
            terminal: ngIf.terminal,
            restrict: ngIf.restrict,
            scope: true,
            link: function($scope: any, $element, $attrs) {
                // Visualize based on visible variable in scope
                $attrs.ngIf = function() { return $scope.visible };
                ngIf.link.apply(ngIf);
            },
            controller: 'pipScaleSideNavPartController'
        };
    });

    thisModule.controller('pipScaleSideNavPartController',
        function ($scope, $element, $attrs, $rootScope, pipScaleSideNav) {
            var partName = '' + $attrs.pipScaleSidenavPart;
            var partValue = null;

            // Break part apart
            var pos = partName.indexOf(':');
            if (pos > 0) {
                partValue = partName.substr(pos + 1);
                partName = partName.substr(0, pos);
            }

            onSideNavChanged(null, pipScaleSideNav.config())

            $rootScope.$on('pipScaleSideNavChanged', onSideNavChanged);

            function onSideNavChanged(event, config) {
                var parts = config.parts || {};
                var currentPartValue = config[partName];
                // Set visible variable to switch ngIf
                $scope.visible = partValue ? currentPartValue == partValue : currentPartValue;
            }

        }
    );

})();
