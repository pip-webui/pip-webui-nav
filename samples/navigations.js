/* global angular */

(function (angular) {
    'use strict';

    var thisModule = angular.module('appNav.Navigations', []);

    thisModule.controller('NavigationsController',
        function ($scope, $injector, $mdMedia, pipAppBar, pipSearch, pipActions, pipNavIcon, pipBreadcrumb) {

            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate) {
                pipTranslate.setTranslations('en', {
                    ACTIVE_INDEX: 'Active index',
                    WITH: 'with',
                    BASIC_INFO: 'Basic info',
                    MONTH_MAY: 'May',
                    CONTACT_INFO: 'Contact info',
                    MOBILE: 'Mobile',
                    HOME: 'Home',
                    TAB_INDEX: 'Current tab index',
                    LIST_CHANGES: 'List of changes',
                    ADDING: 'Counts of first tab',
                    VISIBLE: 'Visible',
                    DISABLED: 'Disabled',
                    SHADOW: 'Shadow',
                    TABS_CONFIG_AND_INFO: 'Tabs configuration and info',
                    CODE_SAMPLE: 'Code sample'                    
                });
                pipTranslate.setTranslations('ru', {
                    ACTIVE_INDEX: 'Текущий индекс',
                    WITH: 'с',
                    BASIC_INFO: 'Основные данные',
                    MONTH_MAY: 'Май',
                    CONTACT_INFO: 'Контактная информация',
                    MOBILE: 'Мобильный',
                    HOME: 'Домашний',
                    TAB_INDEX: 'Текущий индекс',
                    LIST_CHANGES: 'Список изменений',
                    ADDING: 'Устанавливает количество для первого таба',
                    VISIBLE: 'Видимость',
                    DISABLED: 'Отключен',
                    SHADOW: 'Тень',
                    TABS_CONFIG_AND_INFO: 'Настройка и информация о табах',
                    CODE_SAMPLE: 'Пример кода'                    
                });
            }

            $scope.actions = [
                { title: 'BASIC_INFO', id: 1 },
                { title: 'CONTACT_INFO', id: 2 },
                { title: 'CODE_SAMPLE', id: 3 }
            ];

            $scope.messages = [];
            $scope.$mdMedia = $mdMedia;
            $scope.selected = {};
            $scope.selected.showTabs = true;
            $scope.selected.showShadow = false;
            $scope.selected.disabled = false;
            $scope.tabIndex = 0;

            $scope.tabs = [{
                title: 'TABS_CONFIG_AND_INFO',
                newCounts: 0
            }, {title: 'CODE_SAMPLE',
                newCounts: 0
            }, {title: 'LIST_CHANGES',
                newCounts: 0
            }];

            $scope.localPrimaryActions = [
                {
                    name: 'sample.send', tooltip: 'Send Message', icon: 'icons:send', menu: true,
                    subActions: [{ name: 'sample.sendSomeone', title: 'Send someone' }, {
                        name: 'sample.sendToAll',
                        title: 'Send to All'
                    }]
                },
                { name: 'sample.discard', tooltip: 'Discard Message', icon: 'icons:trash', hideSmall: true }
            ];

            $scope.localSecondaryActions = [
                { name: 'sample.send', title: 'Send Message', close: true, event: 'pipGuidesClicked' },
                { name: 'sample.discard', title: 'Discard Message' },
                { divider: true },
                { name: 'configure', title: 'Configure...', href: 'http://www.google.com' }
            ];

            pipAppBar.show();
            pipNavIcon.showMenu();
            pipAppBar.part('icon', true);
            pipBreadcrumb.items = [
                { title: 'Header' },
                {
                    title: 'SubHeader',
                    subActions: [
                        { name: 'sample.send', icon: 'icons:list', title: 'Send Message', event: 'pipGuidesClicked' },
                        { name: 'sample.discard', icon: 'icons:action', title: 'Discard Message' },
                        { divider: true },
                        { name: 'configure', icon: 'icons:area', title: 'Configure...', href: 'http://www.google.com' }
                    ]
                },
                {
                    title: $scope.title,
                    subActions: [
                        { name: 'sample.send', icon: 'icons:list', title: 'Send Message', event: 'pipGuidesClicked' },
                        { name: 'sample.discard', icon: 'icons:action', title: 'Discard Message' },
                        { divider: true },
                        { name: 'configure', icon: 'icons:area', title: 'Configure...', href: 'http://www.google.com' }
                    ]
                }
            ];
            pipAppBar.part('breadcrumb', true);
            pipActions.show($scope.localPrimaryActions, $scope.localSecondaryActions);
            pipAppBar.part('actions', 'primary');
            pipAppBar.part('search', true);
            pipAppBar.part('title', false);
            pipSearch.set(searchClicked, $scope.searchCriteria, null);

            $scope.activeIndex = 0;

            $scope.onSelect = onSelect;
            $scope.onChange = onChange;
            $scope.onSelectTab = onSelectTab;
            $scope.onClickTab = onClickTab;

            return;


            function onSelectTab(tab, tabIndex) {
                console.log('onSelect', tab, tabIndex);
                $scope.messages.push({text: 'Tab object: [title:' + tab.title +
                                                        '], tabIndex: ' + tabIndex});
                $scope.tabs[2].newCounts ++;
            };

            function onClickTab() {
                console.log('onClick');
                $scope.tabIndex = 0;
            }

            function searchClicked (search) {
                alert('Search'+ search);
            };

            function onSelect(tab, index) {
                $scope.activeValue = tab.id;
            };

            function onChange() {
                console.log('activeIndex', $scope.activeIndex);
            }
        }
    );

})(window.angular);
