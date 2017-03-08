/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appNav.Tabs', []);

    thisModule.controller('TabsController',
        function ($scope, $mdMedia, $injector) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate && pipTranslate.setTranslations) {
                pipTranslate.setTranslations('en', {
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

            $scope.onSelect = function (tab, tabIndex) {
                console.log('onSelect sample', tab, tabIndex);
                $scope.messages.push({text: 'Tab object: [title:' + tab.title +
                                                        '], tabIndex: ' + tabIndex});
                $scope.tabs[2].newCounts ++;
            };

            $scope.onClick = function() {
                console.log('onClick');
                $scope.tabIndex = 0;
            }
        }
    );

})();
