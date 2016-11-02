'use strict';

// Prevent junk from going into typescript definitions
(() => {

function PrimaryActionsController(
    $scope, $element, $attrs, $rootScope, $window, $location, $injector, pipActions) {

    // Apply class and call resize
    $element.addClass('pip-primary-actions');

    if ($scope.localActions) 
        pipActions.primaryLocalActions = $scope.localActions;

    if ($scope.globalActions)
        pipActions.primaryGlobalActions = $scope.globalActions;

    $scope.config = pipActions.config;

    $rootScope.$on('pipActionsChanged', onActionsChanged);

    $scope.isHidden = isHidden;
    $scope.actionCount = actionCount;
    $scope.clickAction = clickAction;

    return;
    ///////////////////////

    function onActionsChanged(event, config) {
        $scope.config = config;
    }

    function isHidden(action) {
        // Todo: Check breakpoints here
        return action.access && !action.access(action);
    }

    function actionCount(action) {
        if (action.count === null || action.count <= 0) {
            return '';
        }
        if (action.count > 99) {
            return '!';
        }

        return action.count;
    }

    function calcActions(actions) {
        var count = 0;

        _.each(actions, function (action) {
            if (!isHidden(action)) {
                count++;
            }
        });

        return count;
    }

    function secondaryActionsVisible() {
        return calcActions($scope.config.secondaryGlobalActions) > 0 ||
            calcActions($scope.config.secondaryLocalActions) > 0;
    }

    function secondaryDividerVisible() {
        return calcActions($scope.config.secondaryGlobalActions) > 0 &&
            calcActions($scope.config.secondaryLocalActions) > 0;
    }

    function clickAction(action, $mdOpenMenu) {
        if (!action || action.divider) {
            return;
        }

        if (action.close) {
            $scope.originatorEv = null;
        }

        if (action.menu) {
            $mdOpenMenu($scope.originatorEv);
            return;
        }

        if (action.click) {
            action.click();
            return;
        }

        if (action.href) {
            $window.location.href = action.href;
            return;
        }

        if (action.url) {
            $location.url(action.url);
            return;
        }

        if (action.state) {
            if ($injector.has('$state')) {
                var $state = $injector.get('$state');
                $state.go(action.state, action.stateParams);
            }
            return;
        }

        if (action.event) {
            $rootScope.$broadcast(action.event);
        } else {
            // Otherwise raise notification
            $rootScope.$broadcast('pipActionClicked', action.name);
        }
    }

}


function primaryActionsDirective() {
    return {
        restrict: 'E',
        scope: {
            localActions: '=pipLocalActions',
            globalActions: '=pipGlobalActions'
        },
        replace: false,
        templateUrl: 'actions/PrimaryActions.html',
        controller: PrimaryActionsController
    };
}


angular
    .module('pipActions')
    .directive('pipPrimaryActions', primaryActionsDirective);

})();