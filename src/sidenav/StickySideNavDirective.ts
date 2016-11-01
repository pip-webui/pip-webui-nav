'use strict';

function StickySideNavDirectiveController($scope, $element, $rootScope, $injector, $mdMedia, $timeout, pipSideNav) {
    "ngInject";

    // var pipMedia = $mdMedia, 
    var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null,
        mainContainer = '.pip-main',
        bigWidth = 320, // expanded sidenav width
        smallWidth = 72, // shrink sidenav width
        isResizing = false,
        animationDuration = 400,
        mediaBreakpoints; 

    pipMedia = pipMedia !== undefined ? pipMedia : $mdMedia;

    $scope.navState = {
        toggle: { // media(sm, xs)
            id: 'toggle',
            addClass: 'sidenav-mobile', // change size, color, selected?
            showHeader: true,
            isLockedOpen: false,
            expandedButton: false,
            isExpanded: true,
            expand: true,
            showIconTooltype: false
        },
        small: { // media(md)
            id: 'small',
            addClass: 'pip-sticky-nav-small sidenav-desktop', // change size, color, selected?
            showHeader: false,
            isLockedOpen: true,
            expandedButton: false,
            isExpanded: false,
            expand: false,
            showIconTooltype: true
        },
        large: { // media(lg)
            id: 'large',
            addClass: 'sidenav-desktop', // change size, color, selected?
            showHeader: false,
            isLockedOpen: true,
            expandedButton: true,
            isExpanded: true,
            expand: true,
            showIconTooltype: true 
        },
        xlarge: { // media(xl)
            id: 'xlarge',
            addClass: 'sidenav-desktop', // change size, color, selected?
            showHeader: false,
            isLockedOpen: true,
            expandedButton: false,
            isExpanded: true,
            expand: true,
            showIconTooltype: false
        }
    };

    mediaBreakpoints = setBreakpoints();

    // Apply class and call resize
    $element.addClass('pip-sticky-sidenav .sidenav-desktop-not-animation');
    pipSideNav.id('pip-sticky-sidenav');

    $timeout(setSideNaveState, 100);

    var windowResize = _.debounce(setSideNaveState, 20);

    $rootScope.$on('pipNavIconClicked', onNavIconClick);
    $rootScope.$on('pipSideNavState', onSideNavState);
    $rootScope.$on('pipMainResized', windowResize);

    return;

    //------------------------
    function setBreakpoints() {
        if (!pipMedia || !angular.isObject(pipMedia.breakpoints)) {
            return  {xs: 639, sm: 959, md: 1024, lg: 1919}; 
        } else {
            return pipMedia.breakpoints;
        }
    }

    function onNavIconClick(event) {
        pipSideNav.open();
    }

    function onSideNavState(event, state) {
        if (angular.isString(state) && $scope.navState[state] !== undefined) {
            setState(state);
        }
    }

    function setSideNaveState() {
        if (isResizing) {
            $timeout(setSideNaveState, animationDuration); // for 

            return;
        }
        var mainWidth = $(mainContainer).innerWidth();

        if (mainWidth < mediaBreakpoints.sm ) {
            setState('toggle');

            return;
        } 
        if (mainWidth < mediaBreakpoints.md + smallWidth && mainWidth >= mediaBreakpoints.sm + smallWidth) {
            setState('small');
            return;
        } 
        if (mainWidth >= mediaBreakpoints.md + bigWidth && mainWidth <= mediaBreakpoints.lg ) {
            setState('large');
            return;
        } 
        if (mainWidth >  mediaBreakpoints.lg ) {
            setState('xlarge');
            return;
        } 
    }

    function setState(state: string) {
        if (isResizing) return;
        if ($scope.sidenavState && $scope.sidenavState.id == state) return;

        if ($scope.sidenavState && $scope.sidenavState.id == 'toggle') {
            $element.removeClass('sidenav-mobile');
        }

        if ($scope.sidenavState && $scope.sidenavState.id == 'small') {
            $element.removeClass('pip-sticky-nav-small');
        }

        if (state == 'toggle') {
            $element.removeClass('sidenav-desktop pip-sticky-nav-small'); 
        }
        isResizing = true;
        $scope.sidenavState = $scope.navState[state];
        $element.addClass($scope.sidenavState.addClass);
        pipSideNav.state($scope.sidenavState);

        // complete animation
        $timeout(function () {
            isResizing = false;
        }, animationDuration);

    }
}

function stickySideNavDirective() {
    return {
        restrict: 'E',
        transclude: true,
        scope: true,
        templateUrl: 'sidenav/StickySideNav.html',
        controller: StickySideNavDirectiveController
    };
}

angular
    .module('pipSideNav')
    .directive('pipStickySidenav', stickyNavHeaderDirective);
