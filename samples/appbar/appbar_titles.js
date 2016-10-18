(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Titles', ['pipBreadcrumb', 'pipAppBar']);

    thisModule.controller('TitlesController',
        function($scope, pipBreadcrumb, pipAppBar) {

            $scope.title = 'Title';
            pipAppBar.showTitleText('SAMPLE');
            
            $scope.onShowTitleLogo = function () {
                pipAppBar.showTitleLogo('piplife_logo.svg');
            };

            $scope.onShowTitleText = function () {
                pipAppBar.showTitleText($scope.title);
            };

            $scope.onShowTitleBreadcrumb = function () {
                console.log(pipBreadcrumb);

                pipBreadcrumb.items([
                    {title: 'Header'},
                    {title: 'SubHeader'},
                    {title: $scope.title}
                ]);

            };
        }
    );

})();