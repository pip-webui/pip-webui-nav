(function (angular) {
    'use strict';

    var thisModule = angular.module('app', ['pipAppBar', 'pipServices', 'ngMaterial']);

    thisModule.config(function ($mdIconProvider, pipAppBarProvider, pipTranslateProvider) {
        $mdIconProvider.iconSet('icons', '../images/icons.svg', 512);

        pipTranslateProvider.translations('en', {
            TITLE_TEXT: 'Title text',
            THEME: 'Theme',
            TITLE_LOCAL_ACTION: 'Title of first primary action',
            CODE_TO_DISPLAY: 'Code to display Appbar :',
            CODE: 'Code :',
            SEARCH_CRITERIA: 'Search criteria',
            FIND_THIS: 'Find this...',
            SAMPLE: 'Sample',
            DISPLAY_AND_HIDE_NAV_ICONS: 'Display and hide nav icons',
            DISPLAY_AND_HIDE_TITLES: 'Display and hide titles',
            SHOW_MENU: 'Show menu icon',
            SHOW_BACK: 'Show back icon',
            HIDE_NAV_ICON: 'Hide nav icon',
            SHOW_LOGO: 'Show logo',
            SHOW_TEXT: 'Show title text',
            SHOW_BREADCRUMB: 'Show breadcrumbs',
            DISPLAY_AND_HIDE_SEARCH: 'Display and hide search',
            SHOW_SEARCH: 'Show search',
            HIDE_SEARCH: 'Hide search',
            UPDATE_SEARCH: 'Update search',
            DISPLAY_AND_HIDE_ACTIONS_AND_LANGUAGES: 'Display and hide actions and languages',
            SHOW_ACTIONS: 'Show actions',
            HIDE_ACTIONS: 'Hide actions',
            SHOW_LANGUAGES: 'Show languages',
            DISPLAY_AND_HIDE_SHADOWS: 'Display and hide shadows',
            SHOW_SHADOW: 'Show shadow',
            SHOW_SMALL_SHADOW: 'Show shadow for small resolution only (width < 1200px)',
            HIDE_SHADOW: 'Hide shadow'
        });
        pipTranslateProvider.translations('ru', {
            TITLE_TEXT: 'Заголовок',
            THEME: 'Тема',
            TITLE_LOCAL_ACTION: 'Заголовок первого основного действия',
            CODE_TO_DISPLAY: 'Пример кода для отбражения Appbar :',
            CODE: 'Код :',
            SEARCH_CRITERIA: 'Критерий поиска',
            FIND_THIS: 'НАйдите это...',
            SAMPLE: 'Пример',
            DISPLAY_AND_HIDE_NAV_ICONS: 'Отображение и скрытие навигационных иконок',
            DISPLAY_AND_HIDE_TITLES: 'Отображение и скрытие заголовков',
            SHOW_MENU: 'Отобразить иконку меню',
            SHOW_BACK: 'Отобразить иконку назад',
            HIDE_NAV_ICON: 'Скрыть иконку навигации',
            SHOW_LOGO: 'Отобразить логотип',
            SHOW_TEXT: 'Отобразить текст заголовка',
            SHOW_BREADCRUMB: 'Отобразить breadcrumbs',
            DISPLAY_AND_HIDE_SEARCH: 'Отображение и скрытие поиска',
            SHOW_SEARCH: 'Отобразить поиск',
            HIDE_SEARCH: 'Скрыть поиск',
            UPDATE_SEARCH: 'Обновить поиск',
            DISPLAY_AND_HIDE_ACTIONS_AND_LANGUAGES: 'Отображение и скрытие списка действий и языков',
            SHOW_ACTIONS: 'Отобразить список действий',
            HIDE_ACTIONS: 'Скрыть список действий',
            SHOW_LANGUAGES: 'Отобразить языки',
            DISPLAY_AND_HIDE_SHADOWS: 'Отображение и скрытие теней',
            SHOW_SHADOW: 'Отобразить тень',
            SHOW_SMALL_SHADOW: 'Отобразить тень для маленького разрешения (ширина < 1200px)',
            HIDE_SHADOW: 'Скрыть тень'
        });

        pipAppBarProvider.globalActions(
            [
                {
                    name: 'sample.notifications', tooltip: 'Notifications',
                    event: 'pipNotificationsClicked', count: 0,
                    icon: 'icons:bell'
                }
            ],
            [
                {name: 'sample.settings', title: 'Settings'},
                {name: 'sample.signout', title: 'Signout'}
            ]
        );
    });

    thisModule.controller('appController',
        function ($scope, $mdDialog, $rootScope, pipAppBar, pipTranslate, $mdTheming, $timeout) {

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    Prism.highlightElement(block);
                });
            });

            $rootScope.$party = {
                id: '55f26dda4b0c570c4b1f1313',
                name: 'Sergey Seroukhov'
            };

            $rootScope.$user = {
                id: '55f26dda4b0c570c4b1f1313',
                name: 'Sergey Seroukhov',
                owner: true,
                theme: $rootScope.$theme
            };

            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));

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

            $scope.title = 'TITLE';
            $scope.notificationCount = 2;
            $scope.searchCriteria = pipTranslate.translate('FIND_THIS');

            pipAppBar.showTitleText('SAMPLE');

            $scope.$on('pipGuidesClicked', function (event) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .targetEvent(event)
                        .clickOutsideToClose(true)
                        .parent('body')
                        .title('Suddenly, a redial')
                        .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
                        .ok('That was easy')
                );
            });

            $scope.$on('pipAppBarNavIconClicked', function () {
                console.log('Nav Icon Clicked'); // eslint-disable-line
            });

            $scope.$on('pipAppBarSearchClicked', function (event, search) {
                console.log('Search Clicked: ' + search);// eslint-disable-line
                $scope.searchCriteria = search;
                pipAppBar.updateSearchCriteria($scope.searchCriteria);
            });

            $scope.$on('pipAppBarActionClicked', function (event, action) {
                console.log('Action ' + action + ' Clicked');// eslint-disable-line
            });

            $scope.onHideNavIcon = function () {
                pipAppBar.hideNavIcon();
            };

            $scope.onShowMenuNavIcon = function () {
                pipAppBar.showMenuNavIcon();
            };

            $scope.onShowBackNavIcon = function () {
                pipAppBar.showBackNavIcon();
            };

            $scope.onShowTitleLogo = function () {
                pipAppBar.showTitleLogo('piplife_logo.svg');
            };

            $scope.onShowTitleText = function () {
                pipAppBar.showTitleText($scope.title);
            };

            $scope.onShowTitleBreadcrumb = function () {
                pipAppBar.showTitleBreadcrumb([
                    {title: 'Header'},
                    {title: 'SubHeader'},
                    {title: $scope.title}
                ]);
            };

            $scope.onHideSearch = function () {
                pipAppBar.hideSearch();
            };

            $scope.onShowSearch = function () {
                pipAppBar.showSearch();
            };

            $scope.onUpdateSearch = function () {
                pipAppBar.updateSearchCriteria($scope.searchCriteria);
            };

            $scope.onHideActions = function () {
                pipAppBar.hideLocalActions();
                $scope.disableOfActionTitleEditing = true;
            };

            $scope.onShowLanguage = function () {
                pipAppBar.showLanguage(['en', 'ru']);
            };

            $scope.onShowShadow = function () {
                pipAppBar.showShadow();
            };

            $scope.onShowShadowSm = function () {
                pipAppBar.showShadowSm();
            };

            $scope.onHideShadow = function () {
                pipAppBar.hideShadow();
            };

            $scope.onChangeNotificationCount = function () {
                pipAppBar.updateActionCount('sample.notifications', $scope.notificationCount);
            };

            $scope.onShowActions = function () {
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

                pipAppBar.updateActionCount('sample.notifications', $scope.notificationCount);
            };

            $scope.searchEnabled = true;
        });

})(window.angular);
