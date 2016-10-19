(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Actions', []);

    thisModule.controller('ActionsController',
        function($scope) {
            
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
                //pipAppBar.hideLocalActions();
                $scope.disableOfActionTitleEditing = true;
            };

            $scope.onShowLanguage = function () {
                //pipAppBar.showLanguage(['en', 'ru']);
            };

            $scope.onChangeNotificationCount = function () {
                //pipAppBar.updateActionCount('sample.notifications', $scope.notificationCount);
            };

            $scope.onShowActions = function () {
                /*
                pipAppBar.showLocalActions(
                    [
                        {
                            name: 'sample.send', tooltip: 'Send Message', icon: 'icons:send', menu: true,
                            subActions: [{name: 'sample.sendSomeone', title: 'Send someone'}, {
                                name: 'sample.sendToAll',
                                title: 'Send to All'
                            }]
                        },
                        {name: 'sample.discard', tooltip: 'Discard Message', icon: 'icons:trash', hideSmall: true},
                        {name: 'sample.discard2', tooltip: 'Discard2 Message', icon: 'icons:bug', showSmall: true}
                    ],
                    [
                        {name: 'sample.send', title: 'Send Message1', close: true},
                        {name: 'sample.discard', title: 'Discard Message'},
                        {divider: true},
                        {name: 'configure', title: 'Configure...', href: 'http://www.google.com'}
                    ]
                );
                */

                //pipAppBar.updateActionCount('sample.notifications', $scope.notificationCount);
            };

            
        }
    );

})();