(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Titles', ['pipBreadcrumb',  'pipAppBar',
        'pipNavIcon', 'pipAppBar.Part']);

    thisModule.controller('TitlesController',
        function ($scope, pipBreadcrumb, pipAppBar, pipNavIcon) {

            $scope.title = 'Title';
            pipAppBar.parts({
                logo: false,
                icon: false,
                title: false,
            });
            //pipAppBar.showTitleText('SAMPLE');

            $scope.onShowTitleLogo = function () {
                /*pipAppBar.parts({
                    logo: true,
                    icon: false,
                    title: false
                });*/
                
                //pipNavIcon.showIcon('bug');
                //pipNavIcon.showImage('piplife_logo.svg');
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