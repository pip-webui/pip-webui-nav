(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Icons', []);

    thisModule.controller('IconsController',
        function($scope) {

            $scope.$on('pipAppBarNavIconClicked', function () {
                console.log('Nav Icon Clicked'); // eslint-disable-line
            });

            $scope.onHideNavIcon = function () {
                pipAppBar.hideNavIcon();
            };

            $scope.onShowMenuNavIcon = function () {
                pipAppBar.showMenuNavIcon();
            };

            $scope.onShowBackNavIcon = function () {
                pipAppBar.showBackNavIcon();
            };

        }
    );

})();