/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appNav.Tabs', []);

    thisModule.config(function($mdIconProvider, pipAppBarProvider, pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            TAB_INDEX: 'Current tab index',
            LIST_CHANGES: 'List of changes',
            ADDING: 'Counts of first tab'
        });
        pipTranslateProvider.translations('ru', {
            TAB_INDEX: 'Текущий индекс',
            LIST_CHANGES: 'Список изменений',
            ADDING: 'Устанавливает количество для первого таба'
        });
    });

    thisModule.controller('TabsController',
        function($scope, $mdMedia) {
            $scope.tabs = [ ];
            $scope.messages = [];
            $scope.$mdMedia = $mdMedia;
            $scope.showTabs = false;

            $scope.onSelect = function (tab, tabIndex) {
                $scope.messages.push({text: 'Tab object: [title:' + tab.title + '], tabIndex: ' + tabIndex});
            };
            generateArray(30);

            //$scope.tabIndex = 2;

            function generateArray(count) {
                var maxNameLength = 20, minNameLength = 5;

                for (var i = 0; i < count; i++) {
                    var oCount = Math.floor(minNameLength + (Math.random(maxNameLength) * 10) + 1),
                        newCounts = Math.floor(0 + (Math.random(100) * 10));
                    var title = "L";
                    for (var j = 0; j < oCount; j++) {
                        title += 'o';
                    }
                    title += "ng title";
                    $scope.tabs.push({
                        title: title,
                        state: 'state ' + title,
                        newCounts: newCounts
                    })
                }
            }
        }
    );

})();
