'use strict';

// Prevent junk from going into typescript definitions
(() => {

function NavIconDirectiveController($scope, $element, $attrs, $rootScope, $window, pipNavIcon) {
    "ngInject";

    // Apply class and call resize
    $element.addClass('pip-nav-icon');

    $scope.config = pipNavIcon.config;

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
        } else if ($scope.config.event) {
            $rootScope.$broadcast($scope.config.event);
        } else if ($scope.config.type == 'menu') {
            $rootScope.$broadcast('pipOpenSideNav');
        } else if ($scope.config.type == 'back') {
            $window.history.back();
        } else {
            $rootScope.$broadcast('pipNavIconClicked');
        }
    }

}

function navIconDirective() {
    return {
        restrict: 'E',
        scope: {
            type: '=pipType',
            imageUrl: '=pipImageUrl',
            icon: '=pipIcon'
        },
        replace: false,
        templateUrl: 'icon/NavIcon.html',
        controller: NavIconDirectiveController
    };
}


angular
    .module('pipNavIcon')
    .directive('pipNavIcon', navIconDirective);

})();