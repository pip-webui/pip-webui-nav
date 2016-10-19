(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Search', [
        'pipAppBar', 'pipAppBar.Part','pipSearchBar'
    ]);

    thisModule.controller('SearchController',
        function($scope, $rootScope, pipAppBar, pipSearch) {
            $scope.searchCriteria = 'Find this';
            
            $scope.$on('pipAppBarSearchClicked', function (event, search) {
                console.log('Search Clicked: ' + search);// eslint-disable-line
                $scope.searchCriteria = search;
                pipSearch.criteria($scope.searchCriteria);
            });
            
            $scope.onHideSearch = function () {
                pipAppBar.part('search', false);
                pipAppBar.part('title', 'text');
                $rootScope.$broadcast('pipSearchClose');
            };

            $scope.onShowSearch = function () {
                pipAppBar.part('search', true);
                pipAppBar.part('title', false);
                pipSearch.set(null, $scope.searchCriteria, null);
                $rootScope.$broadcast('pipSearchOpen');
            };

            $scope.onUpdateSearch = function () {
                pipSearch.criteria($scope.searchCriteria);
            };
            
            $scope.searchEnabled = true;

        }
    );

})();