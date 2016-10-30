(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Search', [
        'pipAppBar', 'pipAppBar.Part','pipSearchBar'
    ]);

    thisModule.controller('SearchController',
        function($scope, $rootScope, pipAppBar, pipSearch, $injector) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate && pipTranslate.setTranslations) {
                pipTranslate.setTranslations('en', {
                    DISPLAY_AND_HIDE_SEARCH: 'Display and hide search',
                    SHOW_SEARCH: 'Show search',
                    HIDE_SEARCH: 'Hide search',
                    UPDATE_SEARCH: 'Update search',
                });
                pipTranslate.setTranslations('ru', {
                  
                    DISPLAY_AND_HIDE_SEARCH: 'Отображение и скрытие поиска',
                    SHOW_SEARCH: 'Отобразить поиск',
                    HIDE_SEARCH: 'Скрыть поиск',
                    UPDATE_SEARCH: 'Обновить поиск',
                });
            }
            $scope.searchCriteria = 'Find this';
            
            $scope.$on('pipSearchActivated', function (event, search) {
                console.log('Search Clicked: ' + search);// eslint-disable-line
                $scope.searchCriteria = search;
                pipSearch.criteria($scope.searchCriteria);
            });
            
            $scope.onHideSearch = function () {
                pipAppBar.part('search', false);
                pipAppBar.part('title', 'text');
                $rootScope.$broadcast('pipCloseSearch');
            };
            
            function searchClicked (search) {
                alert('Search'+ search);
            };
            
            $scope.onShowSearch = function () {
                pipAppBar.part('search', true);
                pipAppBar.part('title', false);
                pipSearch.set(searchClicked, $scope.searchCriteria, null);
                $rootScope.$broadcast('pipOpenSearch');
            };
            

            $scope.onUpdateSearch = function () {
                pipSearch.criteria($scope.searchCriteria);
            };
            
            $scope.searchEnabled = true;

        }
    );

})();