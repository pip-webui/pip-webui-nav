(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Titles', []);

    thisModule.controller('TitlesController',
        function ($scope, pipBreadcrumb, pipAppBar, $injector) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate) {
                pipTranslate.setTranslations('en', {
                    TITLE_TEXT: 'Title text',
                    THEME: 'Theme',
                    TITLE_LOCAL_ACTION: 'Title of first primary action',
                    DISPLAY_AND_HIDE_TITLES: 'Display and hide titles',

                    SHOW_LOGO: 'Show logo',
                    SHOW_TEXT: 'Show title text',
                    SHOW_BREADCRUMB: 'Show breadcrumbs',
                    SHOW_BREADCRUMB_WITH_ACTION: 'Show breadcrumbs with actions',
                    SHOW_APPBAR: 'Show appBar',
                    HIDE_APPBAR: 'Hide appBar'
                });
                pipTranslate.setTranslations('ru', {
                    SHOW_LOGO: 'Отобразить логотип',
                    SHOW_TEXT: 'Отобразить текст заголовка',
                    SHOW_BREADCRUMB: 'Отобразить breadcrumbs',
                    SHOW_BREADCRUMB_WITH_ACTION: 'Отобразить breadcrumbs c подменю',
                    SHOW_APPBAR: 'Показать appBar',
                    HIDE_APPBAR: 'Скрыть appBar'
                });

            }
            $scope.title = 'Title';

            $scope.onShowTitleLogo = function () {
                pipAppBar.part('logo', true);
                pipAppBar.part('icon', false);
                pipAppBar.part('title', false);
            };

            $scope.onShowAppBar = function () {
                pipAppBar.show();
            };

            $scope.onHideAppBar = function () {
                pipAppBar.hide();
            };

            $scope.onShowTitleText = function () {
                pipAppBar.parts = {
                    logo: false,
                    icon: false,
                    title: 'text'
                };
            };

            $scope.onShowTitleBreadcrumb = function () {
                pipAppBar.parts = {
                    logo: false,
                    icon: false,
                    title: 'breadcrumb',
                };
                pipBreadcrumb.items = [
                    { title: 'Header' },
                    { title: 'SubHeader' },
                    { title: $scope.title }
                ];
            };

            $scope.onHideAppBar = function () {
                pipAppBar.hide();
            }

            $scope.onShowAppBar = function () {
                pipAppBar.show();
            }

            $scope.onShowTitleBreadcrumbActions = function () {
                pipAppBar.parts = {
                    logo: false,
                    icon: false,
                    title: 'breadcrumb',
                };
                pipBreadcrumb.items = [
                    { title: 'Header' },
                    { title: 'SubHeader', 
                      subActions: [
                        {name: 'sample.send', icon: 'icons:list', title: 'Send Message', event: 'pipGuidesClicked'},
                        {name: 'sample.discard', icon: 'icons:action', title: 'Discard Message'},
                        {divider: true},
                        {name: 'configure',  icon: 'icons:area', title: 'Configure...', href: 'http://www.google.com'}                          
                      ]
                    },
                    { title: $scope.title,
                      subActions: [
                        {name: 'sample.send', icon: 'icons:list', title: 'Send Message', event: 'pipGuidesClicked'},
                        {name: 'sample.discard', icon: 'icons:action', title: 'Discard Message'},
                        {divider: true},
                        {name: 'configure', icon: 'icons:area', title: 'Configure...', href: 'http://www.google.com'}                          
                      ]
                    }
                ];
            };

            $scope.onShowTitleText();
        }
        
    );

})();