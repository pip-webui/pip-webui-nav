(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Titles', ['pipBreadcrumb',  'pipAppBar',
        'pipNavIcon', 'pipAppBar.Part']);

    thisModule.controller('TitlesController',
        function ($scope, pipBreadcrumb, pipAppBar, $injector) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate) {
                pipTranslate.translations('en', {
                    TITLE_TEXT: 'Title text',
                    THEME: 'Theme',
                    TITLE_LOCAL_ACTION: 'Title of first primary action',
                    DISPLAY_AND_HIDE_TITLES: 'Display and hide titles',

                    SHOW_LOGO: 'Show logo',
                    SHOW_TEXT: 'Show title text',
                    SHOW_BREADCRUMB: 'Show breadcrumbs',
                });
                    pipTranslate.translations('ru', {
                        SHOW_LOGO: 'Отобразить логотип',
                        SHOW_TEXT: 'Отобразить текст заголовка',
                        SHOW_BREADCRUMB: 'Отобразить breadcrumbs'
                    });

            }
            $scope.title = 'Title';

            $scope.onShowTitleLogo = function () {
                pipAppBar.part('logo', true);
                pipAppBar.part('icon', false);
                pipAppBar.part('title', false);
            };

            $scope.onShowTitleText = function () {
                pipAppBar.parts({
                    logo: false,
                    icon: false,
                    title: 'text'
                });
            };

            $scope.onShowTitleBreadcrumb = function () {
                pipAppBar.parts({
                    logo: false,
                    icon: false,
                    title: 'breadcrumb',
                });
                pipBreadcrumb.items([
                    {title: 'Header'},
                    {title: 'SubHeader'},
                    {title: $scope.title}
                ]);

            };
        }
    );

})();