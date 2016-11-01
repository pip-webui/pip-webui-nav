'use strict';

function PrimaryActionsController(
    $scope, $element, $attrs, $rootScope, $window, $location, $injector, pipActions) {

    // Apply class and call resize
    $element.addClass('pip-primary-actions');

    $scope.config = pipActions.config();

    if ($scope.localActions) {
        pipActions.showLocalActions();
        $scope.config.primaryLocalActions = $scope.localActions[0];
    }

    if ($scope.globalActions) {
        pipActions.showLocalActions();
        $scope.config.primaryGlobalActions = $scope.globalActions[0];
    }

    $rootScope.$on('pipActionsChanged', onActionsChanged);

    $scope.actionHidden = actionHidden;
    $scope.actionCount = actionCount;

    $scope.onActionClick = onActionClick;

    function onActionsChanged(event, config) {
        $scope.config = config;
    }

    function actionHidden(action) {
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
            if (!actionHidden(action)) {
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

    function onActionClick(action, $mdOpenMenu) {
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


function primaryActionsDirective() {
    return {
        restrict: 'E',
        scope: {
            localActions: '=pipLocalActions',
            globalActions: '=pipGlobalActions'
        },
        replace: false,
        templateUrl: function (element, attr) {
            return 'actions/PrimaryActions.html';
        },
        controller: PrimaryActionsController
    };
}


angular
    .module('pipActions')
    .directive('pipPrimaryActions', primaryActionsDirective);

