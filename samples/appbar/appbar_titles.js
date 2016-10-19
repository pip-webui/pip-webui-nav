(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Titles', ['pipBreadcrumb', 'pipAppBar.Part', 'pipAppBar',
        'pipNavIcon']);

    thisModule.controller('TitlesController',
        function($scope, pipBreadcrumb, pipAppBar, pipNavIcon) {

            $scope.title = 'Title';
            //pipAppBar.showTitleText('SAMPLE');
            
            $scope.onShowTitleLogo = function () {
                pipNavIcon.showImage('piplife_logo.svg');
                //pipAppBar.showTitleLogo('piplife_logo.svg');
                //pipNavIcon.showMenu();
            };

            $scope.onShowTitleText = function () { 
                pipBreadcrumb.items($scope.title);
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