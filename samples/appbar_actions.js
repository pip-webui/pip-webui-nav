(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Actions', []);
    thisModule.config(function (pipActionsProvider, pipAppBarProvider) {

        pipActionsProvider.primaryGlobalActions = [
            {
                name: 'sample.notifications', tooltip: 'Notifications',
                event: 'pipNotificationsClicked', count: 0,
                icon: 'icons:bell'
            }
        ];

        pipActionsProvider.secondaryGlobalActions = [
            {name: 'sample.settings', title: 'Settings'},
            {name: 'sample.signout', title: 'Signout'}
        ];

        pipAppBarProvider.parts = {icon: true, title: 'breadcrumb', actions: 'primary', menu: true };
    });

    thisModule.controller('ActionsController',
        function ($scope, pipActions, pipAppBar, $injector, $rootScope) {

            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate && pipTranslate.setTranslations) {
                pipTranslate.setTranslations('en', {
                    TITLE_TEXT: 'Title text',
                    THEME: 'Theme',
                    TITLE_LOCAL_ACTION: 'Title of first primary action',
                    DISPLAY_AND_HIDE_NAV_ICONS: 'Display and hide nav icons',
                    DISPLAY_AND_HIDE_TITLES: 'Display and hide titles',
                    DISPLAY_AND_HIDE_ACTIONS_AND_LANGUAGES: 'Display and hide actions and languages',
                    SHOW_ACTIONS: 'Show actions',
                    HIDE_ACTIONS: 'Hide actions',
                    HIDE_LOCAL_ACTIONS: 'Hide local primary actions',
                    SHOW_LANGUAGES: 'Show languages',
                    OPEN_SECONDARY_MENU: 'Open menu'
                });
                pipTranslate.setTranslations('ru', {
                    TITLE_LOCAL_ACTION: 'Заголовок первого основного действия',
                    DISPLAY_AND_HIDE_ACTIONS_AND_LANGUAGES: 'Отображение и скрытие списка действий и языков',
                    SHOW_ACTIONS: 'Отобразить список действий',
                    HIDE_ACTIONS: 'Скрыть список действий',
                    HIDE_LOCAL_ACTIONS: 'Скрыть список локальных акций',
                    SHOW_LANGUAGES: 'Отобразить языки',
                    
                });
            }

            // Update page after language changed
            $rootScope.$on('languageChanged', function(event) {
                $state.reload();
            });
            $scope.languages = ['en', 'ru'];
            $scope.localPrimaryActions = [
                {
                    name: 'sample.send', tooltip: 'Send Message', icon: 'icons:send', menu: true,
                    subActions: [{name: 'sample.sendSomeone', title: 'Send someone'}, {
                        name: 'sample.sendToAll',
                        title: 'Send to All'
                    }]
                },
                {name: 'sample.discard', tooltip: 'Discard Message', icon: 'icons:trash', hideSmall: true}
            ];

            $scope.localSecondaryActions = [
                {name: 'sample.send', title: 'Send Message', close: true, event: 'pipGuidesClicked'},
                {name: 'sample.discard', title: 'Discard Message'},
                {divider: true},
                {name: 'configure', title: 'Configure...', href: 'http://www.google.com'}
            ];

            $scope.notificationCount = 2;

            $scope.$on('pipAppBarActionClicked', function (event, action) {
                console.log('Action ' + action + ' Clicked');// eslint-disable-line
            });

            $scope.onHideActions = function () {
                pipActions.hide();
                pipAppBar.part('actions', false);
            };
            $scope.onHideLocalActions = function () {
                pipActions.hide();
                //pipAppBar.part('actions', false);
            };

            $scope.onShowLanguage = function () {
                pipAppBar.part('actions', 'language');
            };

            $scope.onChangeNotificationCount = function () {
                pipActions.updateCount('sample.notifications', $scope.notificationCount);
            };

            $scope.onHideAppBar = function () {
                pipAppBar.hide();
            }

            $scope.onShowAppBar = function () {
                pipAppBar.show();
            }

            $scope.onShowActions = function () {
                pipActions.show($scope.localPrimaryActions, $scope.localSecondaryActions);
                pipActions.updateCount('sample.notifications', $scope.notificationCount);
                pipAppBar.part('actions', 'primary');
            };

            $scope.openSecondaryMenu = function() {
                pipActions.openMenuEvent();
            }

        }
    );

})();