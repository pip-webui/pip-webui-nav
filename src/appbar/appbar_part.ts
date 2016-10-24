/// <reference path="../../typings/tsd.d.ts" />

(function () {
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
            scope: true,
            link: function linkFunction($scope: any, $element, $attrs: any) {
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
        function ($scope, $element, $attrs, $rootScope, pipAppBar) {
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
                var visible = !!(partValue ? currentPartValue == partValue : currentPartValue);

                if (visible != $scope.visible)
                    $scope.visible = visible;
            }

        }
    );

})();
