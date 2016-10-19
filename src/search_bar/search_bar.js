/**
 * @file Search Bar component
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _, $) {
    'use strict';

    var thisModule = angular.module('pipSearchBar',
        ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipSearch.Service']);

    thisModule.run(function ($injector) {
        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', {
                'APPBAR_SEARCH': 'Search'
            });

            pipTranslate.translations('ru', {
                'APPBAR_SEARCH': 'Поиск'
            });
        }
    });

    // Main application header directive
    thisModule.directive('pipSearchBar', function () {
        return {
            restrict: 'E',
            scope: {},
            replace: false,
            templateUrl: function (element, attr) {
                return 'search_bar/search_bar.html';
            },
            controller: 'pipSearchBarController'
        };
    });

    thisModule.controller('pipSearchBarController',
        function ($scope, $element, $attrs, $rootScope, pipSearch) {
            // Apply class and call resize
            $element.addClass('pip-search-bar');

            $scope.config = pipSearch.config();

            $scope.searchEnabled = false;
            $scope.search = {text: ''};

            $rootScope.$on('pipSearchChanged', onSearchBarChanged);

            $scope.onSearchEnable = onSearchEnable;
            $scope.onSearchClick = onSearchClick;
            $scope.onSearchClear = onSearchClear;
            $scope.onSearchKeyDown = onSearchKeyDown;

            function onSearchBarChanged(event, config) {
                $scope.config = config;
                $scope.searchEnabled = false;
                $scope.search.text = '';
            }

            function focusSearchText() {
                var element;

                setTimeout(function () {
                    element = $('.pip-search-text');
                    if (element.length > 0) {
                        element.focus();
                    }
                }, 0);
            }

            function onSearchEnable() {
                $scope.search.text = $scope.config.criteria;
                $scope.searchEnabled = true;
                focusSearchText();
            }

            function onSearchClick() {
                var searchText = $scope.search.text;

                $scope.search.text = '';
                $scope.searchEnabled = false;

                if ($scope.config.callback) {
                    $scope.config.callback(searchText);
                } else {
                    $rootScope.$broadcast('pipSearchBarSearchClicked', searchText);
                }
            }

            function onSearchClear() {
                if ($scope.search.text) {
                    $scope.search.text = '';

                    focusSearchText();
                } else {
                    $scope.searchEnabled = false;
                    onSearchClick();
                }
            }

            function onSearchKeyDown(event) {
                // Enter pressed
                if (event.keyCode === 13) {
                    $scope.onSearchClick();

                    return;
                }
                // ESC pressed
                if (event.keyCode === 27) {
                    $scope.searchEnabled = false;
                }
            }
        }
    );

})(window.angular, window._, window.jQuery);
