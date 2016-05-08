/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appNav.Dropdown', []);

    thisModule.config(function($mdIconProvider, pipAppBarProvider, pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            ACTIVE_INDEX: 'Active index',
            WITH: 'with'
        });
        pipTranslateProvider.translations('ru', {
            ACTIVE_INDEX: 'Текущий индекс',
            WITH: 'с'
        });
    });

    thisModule.controller('DropdownController',
        function($scope) {
            $scope.actions = [
                {title: '1', id: 1},
                {title: '2', id: 2}
            ];

            $scope.activeIndex = 1;

            $scope.onSelect = function (tab, index) {
                $scope.activeValue = tab.id;
            }
        }
    );

})();
