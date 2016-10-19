(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Icons', ['pipNavIcon', 'pipAppBar', 'pipAppBar.Part']);

    thisModule.controller('IconsController',
        function($scope, pipNavIcon, pipAppBar) {

            $scope.$on('pipAppBarNavIconClicked', function () {
                console.log('Nav Icon Clicked'); // eslint-disable-line
            });

            $scope.onHideNavIcon = function () {
                pipNavIcon.hide();
                pipAppBar.part('icon', false);
            };

            $scope.onShowMenuNavIcon = function () {
                pipNavIcon.showMenu();
                pipAppBar.part('icon', true);
            };

            $scope.onShowIcon = function () {
                pipNavIcon.showIcon('bug');
                pipAppBar.part('icon', true);
            };

            $scope.onShowBackNavIcon = function () {
                pipNavIcon.showBack();
                pipAppBar.part('icon', true);
            };

        }
    );

})();