'use strict';

// Prevent junk from going into typescript definitions
(() => {

function SecondaryActionsController(
    $scope, $element, $attrs, $rootScope, $window, $location, $injector, pipActions) {

    // Apply class and call resize
    $element.addClass('pip-secondary-actions');

    if ($scope.localActions) 
        pipActions.secondaryLocalActions = $scope.localActions;

    if ($scope.globalActions) 
        pipActions.secondaryGlobalActions = $scope.globalActions;

    $scope.config = pipActions.config;

    $rootScope.$on('pipActionsChanged', onActionsChanged);

    $scope.isHidden = isHidden;
    $scope.actionCount = actionCount;
    $scope.secondaryActionsVisible = secondaryActionsVisible;
    $scope.secondaryDividerVisible = secondaryDividerVisible;

    $scope.clickAction = clickAction;

    $scope.openMenu = openMenu;

    return;
    /////////////////////

    function openMenu($mdOpenMenu, ev) {
        $scope.originatorEv = ev;
        $mdOpenMenu(ev);
    }

    function onActionsChanged(event, config) {
        $scope.config = config;
    }

    function isHidden(action) {
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

        if (action.callback) {
            action.callback();
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

function secondaryActionsDirective() {
    return {
        restrict: 'E',
        scope: {
            localActions: '=pipLocalActions',
            globalActions: '=pipGlobalActions'
        },
        replace: false,
        templateUrl: 'actions/SecondaryActions.html',
        controller: SecondaryActionsController
    };
}

angular
    .module('pipActions')
    .directive('pipSecondaryActions', secondaryActionsDirective);

})();