'use strict';

// Prevent junk from going into typescript definitions
(() => {

function SideNavDirectiveController($scope, $element, $rootScope, pipSideNav) {
    "ngInject";

    // Apply class and call resize
    $element.addClass('pip-sidenav');
    pipSideNav.id = 'pip-sidenav';

    $rootScope.$on('pipNavIconClicked', onNavIconClick);

    return;

    //------------------------

    function onNavIconClick(event) {
        pipSideNav.open();
    }
}

function sidenavDirective() {
    return {
        restrict: 'E',
        transclude: true,
        scope: true,
        templateUrl: 'sidenav/SideNav.html',
        controller: SideNavDirectiveController
    };
}

angular
    .module('pipSideNav')
    .directive('pipSidenav', sidenavDirective);

})();