(function () {
    'use strict';

    var thisModule = angular.module('appAppbar.Search', []);

    thisModule.controller('SearchController',
        function($scope, $rootScope, pipAppBar, pipSearch, pipActions, pipNavIcon, pipBreadcrumb, $injector) {
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
            

            $scope.localPrimaryActions = [
                {
                    name: 'sample.send', tooltip: 'Send Message', icon: 'icons:send', menu: true,
                    subActions: [{ name: 'sample.sendSomeone', title: 'Send someone' }, {
                        name: 'sample.sendToAll',
                        title: 'Send to All'
                    }]
                },
                { name: 'sample.discard', tooltip: 'Discard Message', icon: 'icons:trash', hideSmall: true }
            ];

            $scope.localSecondaryActions = [
                { name: 'sample.send', title: 'Send Message', close: true, event: 'pipGuidesClicked' },
                { name: 'sample.discard', title: 'Discard Message' },
                { divider: true },
                { name: 'configure', title: 'Configure...', href: 'http://www.google.com' }
            ];

            
                pipActions.show($scope.localPrimaryActions, $scope.localSecondaryActions);
                pipAppBar.part('actions', 'primary');       
                pipAppBar.part('search', true);

            $scope.$on('pipSearchActivated', function (event, search) {
                console.log('Search Clicked: ' + search);// eslint-disable-line
                $scope.searchCriteria = search;
                pipSearch.criteria = $scope.searchCriteria;
            });
            
            $scope.onHideSearch = function () {
                pipAppBar.part('search', false);
                pipAppBar.part('title', 'text');
                $rootScope.$broadcast('pipCloseSearch');
            };

       
            
            function searchClicked (search) {
                alert('Search'+ search);
            };

            $scope.onHideAppBar = function () {
                pipAppBar.hide();
            }

            $scope.onShowAppBar = function () {
                pipAppBar.show();
            }

            $scope.onShowSearch = function () {
                pipAppBar.part('search', true);
                pipAppBar.part('title', false);
                pipSearch.set(searchClicked, $scope.searchCriteria, null);
                $rootScope.$broadcast('pipOpenSearch');
            };   

            $scope.onUpdateSearch = function () {
                pipSearch.criteria = $scope.searchCriteria;
            };
            
            $scope.searchEnabled = true;

            $scope.onShowActions = function () {
                pipActions.show($scope.localPrimaryActions, $scope.localSecondaryActions);
                pipAppBar.part('actions', 'primary');                
            }

            $scope.onShowMenu = function () {
                pipNavIcon.showMenu();
                pipAppBar.part('icon', true);
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
                pipAppBar.part('breadcrumb', true);           
            }

            $scope.onHideOther = function () {
                pipActions.hide();
                pipAppBar.part('actions', false);
                pipNavIcon.hide();
                pipAppBar.part('icon', false);  
                pipNavIcon.hide(); 
                pipAppBar.part('breadcrumb', false);             
            }

            //$scope.onHideOther();
        }
    );

})();