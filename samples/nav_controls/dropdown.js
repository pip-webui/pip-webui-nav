/* global angular */

(function (angular) {
    'use strict';

    var thisModule = angular.module('appNav.Dropdown', []);

    thisModule.config(function ($mdIconProvider, pipAppBarProvider, pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            ACTIVE_INDEX: 'Active index',
            WITH: 'with',
            BASIC_INFO: 'Basic info',
            MONTH_MAY: 'May',
            CONTACT_INFO: 'Contact info',
            MOBILE: 'Mobile',
            HOME: 'Home'
        });
        pipTranslateProvider.translations('ru', {
            ACTIVE_INDEX: 'Текущий индекс',
            WITH: 'с',
            BASIC_INFO: 'Основные данные',
            MONTH_MAY: 'Май',
            CONTACT_INFO: 'Контактная информация',
            MOBILE: 'Мобильный',
            HOME: 'Домашний'
        });
    });

    thisModule.controller('DropdownController',
        function ($scope) {
            $scope.actions = [
                {title: 'BASIC_INFO', id: 1},
                {title: 'CONTACT_INFO', id: 2}
            ];

            $scope.activeIndex = 1;

            $scope.onSelect = function (tab, index) {
                $scope.activeValue = tab.id;
            };
        }
    );

})(window.angular);
