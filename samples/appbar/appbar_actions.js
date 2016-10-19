(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Actions', [
        'pipAppBar', 'pipActions.Service', 'pipLanguagePicker',
        'pipPrimaryActions', 'pipSecondaryActions', 'pipAppBar.Part'
    ]);
    thisModule.config(function (pipActionsProvider) {

        pipActionsProvider.globalPrimaryActions(
            [
                {
                    name: 'sample.notifications', tooltip: 'Notifications',
                    event: 'pipNotificationsClicked', count: 0,
                    icon: 'icons:bell'
                }
            ]);
        pipActionsProvider.globalSecondaryActions(
            [
                {name: 'sample.settings', title: 'Settings'},
                {name: 'sample.signout', title: 'Signout'}
            ]
        );
    });

    thisModule.controller('ActionsController',
        function ($scope, pipActions, pipAppBar) {

            $scope.localActions = [
                [
                    {
                        name: 'sample.send', tooltip: 'Send Message', icon: 'icons:send', menu: true,
                        subActions: [{name: 'sample.sendSomeone', title: 'Send someone'}, {
                            name: 'sample.sendToAll',
                            title: 'Send to All'
                        }]
                    },
                    {name: 'sample.discard', tooltip: 'Discard Message', icon: 'icons:trash', hideSmall: true}
                ],
                [
                    {name: 'sample.send', title: 'Send Message', close: true, event: 'pipGuidesClicked'},
                    {name: 'sample.discard', title: 'Discard Message'},
                    {divider: true},
                    {name: 'configure', title: 'Configure...', href: 'http://www.google.com'}
                ]
            ];

            $scope.notificationCount = 2;

            $scope.$on('pipAppBarActionClicked', function (event, action) {
                console.log('Action ' + action + ' Clicked');// eslint-disable-line
            });

            $scope.onHideActions = function () {
                pipActions.hideLocalActions();
                pipAppBar.part('actions',false);
            };

            $scope.onShowLanguage = function () {
                pipAppBar.part('actions','language');
            };

            $scope.onChangeNotificationCount = function () {
                pipActions.updateActionCount('sample.notifications', $scope.notificationCount);
            };

            $scope.onShowActions = function () {
                pipActions.showLocalActions($scope.localActions[0], $scope.localActions[1]);
                pipActions.updateActionCount('sample.notifications', $scope.notificationCount);
                pipAppBar.part('actions','primary');
            };


        }
    );

})();