'use strict';

function AppBarDirectiveController($scope, $element, $rootScope, pipAppBar) {
    "ngInject";

    // Apply class and call resize
    $element.addClass('pip-appbar');
    $element.addClass('color-primary-bg');
    
    //$scope.$emit('pipResizeWindow');

    $scope.config = pipAppBar.config();

    $rootScope.$on('pipAppBarChanged', onAppBarChanged);

    function onAppBarChanged(event, config) {
        $scope.config = config;
    }
}

function appbarDirective() {
    return {
        restrict: 'E',
        transclude: true,
        scope: true,
        templateUrl: 'appbar/AppBar.html',
        controller: AppBarDirectiveController
    };
}

angular
    .module('pipAppBar')
    .directive('pipAppbar', appbarDirective);
