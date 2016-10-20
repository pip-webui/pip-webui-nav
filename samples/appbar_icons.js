(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Icons', ['pipNavIcon', 'pipAppBar', 'pipAppBar.Part']);

    thisModule.controller('IconsController',
        function($scope, pipNavIcon, pipAppBar, $injector) {

            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate) {
                pipTranslate.translations('en', {

                    DISPLAY_AND_HIDE_NAV_ICONS: 'Display and hide nav icons',
                    SHOW_MENU: 'Show menu icon',
                    SHOW_BACK: 'Show back icon',
                    HIDE_NAV_ICON: 'Hide nav icon'

                });
                pipTranslate.translations('ru', {

                    DISPLAY_AND_HIDE_NAV_ICONS: 'Отображение и скрытие навигационных иконок',
                    SHOW_MENU: 'Отобразить иконку меню',
                    SHOW_BACK: 'Отобразить иконку назад',
                    HIDE_NAV_ICON: 'Скрыть иконку навигации'
                });
            }
            $scope.$on('pipAppBarNavIconClicked', function () {
                console.log('Nav Icon Clicked'); // eslint-disable-line
            });

            $scope.onHideNavIcon = function () {
                pipNavIcon.hide();
                pipAppBar.part('icon', false);
            };

            $scope.onShowMenuNavIcon = function () {
                pipNavIcon.showMenu();
                pipAppBar.part('icon', true);
            };

            $scope.onShowIcon = function () {
                pipNavIcon.showIcon('bug');
                pipAppBar.part('icon', true);
            };

            $scope.onShowBackNavIcon = function () {
                pipNavIcon.showBack();
                pipAppBar.part('icon', true);
            };

        }
    );

})();