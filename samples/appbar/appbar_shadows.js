(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Shadows', []);

    thisModule.controller('ShadowsController',
        function($scope) {

            $scope.onShowShadow = function () {
                pipAppBar.showShadow();
            };

            $scope.onShowShadowSm = function () {
                pipAppBar.showShadowSm();
            };

            $scope.onHideShadow = function () {
                pipAppBar.hideShadow();
            };
        }
    );

})();