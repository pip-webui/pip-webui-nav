(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Search', []);

    thisModule.controller('SearchController',
        function($scope) {
            $scope.searchCriteria = 'FIND_THIS';
            
            $scope.$on('pipAppBarSearchClicked', function (event, search) {
                console.log('Search Clicked: ' + search);// eslint-disable-line
                $scope.searchCriteria = search;
                pipAppBar.updateSearchCriteria($scope.searchCriteria);
            });
            
            $scope.onHideSearch = function () {
                pipAppBar.hideSearch();
            };

            $scope.onShowSearch = function () {
                pipAppBar.showSearch();
            };

            $scope.onUpdateSearch = function () {
                pipAppBar.updateSearchCriteria($scope.searchCriteria);
            };
            
            $scope.searchEnabled = true;

        }
    );

})();