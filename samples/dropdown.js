/* global angular */

(function (angular) {
    'use strict';

    var thisModule = angular.module('appNav.Dropdown', ['pipDropdown']);

    thisModule.controller('DropdownController',
        function ($scope, $injector) {

            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate && pipTranslate.translations) {
                pipTranslate.translations('en', {
                    ACTIVE_INDEX: 'Active index',
                    WITH: 'with',
                    BASIC_INFO: 'Basic info',
                    MONTH_MAY: 'May',
                    CONTACT_INFO: 'Contact info',
                    MOBILE: 'Mobile',
                    HOME: 'Home'
                });
                pipTranslate.translations('ru', {
                    ACTIVE_INDEX: 'Текущий индекс',
                    WITH: 'с',
                    BASIC_INFO: 'Основные данные',
                    MONTH_MAY: 'Май',
                    CONTACT_INFO: 'Контактная информация',
                    MOBILE: 'Мобильный',
                    HOME: 'Домашний'
                });
            }
            
            $scope.actions = [
                {title: 'BASIC_INFO', id: 1},
                {title: 'CONTACT_INFO', id: 2},
                {title: 'CODE_SAMPLE', id: 3}
            ];

            $scope.activeIndex = 0;

            $scope.onSelect = function (tab, index) {
                $scope.activeValue = tab.id;
            };
        }
    );

})(window.angular);
