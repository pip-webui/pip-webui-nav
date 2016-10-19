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
                title: 'breadcrumb'
            });

            $scope.onShowTitleLogo = function () {
                pipAppBar.parts({
                    logo: true,
                    icon: false,
                    title: false
                });
                
                //pipNavIcon.showIcon('bug');
                //pipNavIcon.showImage('piplife_logo.svg');
                //pipAppBar.showTitleLogo('piplife_logo.svg');
                //pipNavIcon.showMenu();
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