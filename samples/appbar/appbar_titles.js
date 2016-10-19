(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Titles', ['pipBreadcrumb',  'pipAppBar',
        'pipNavIcon', 'pipAppBar.Part']);

    thisModule.controller('TitlesController',
        function ($scope, pipBreadcrumb, pipAppBar, pipNavIcon) {

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