/* global angular */

(function () {
    'use strict';

    var content = [
        { title: 'Dropdown', state: 'dropdown', url: '/dropdown', controller: 'DropdownController', templateUrl: 'dropdown.html' },
        { title: 'Tabs', state: 'tabs', url: '/tabs', controller: 'TabsController', templateUrl: 'tabs.html' }
    ];

    var thisModule = angular.module('appNav', 
        [
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate', 
			'pipCore', 'pipNav',
            'appNav.Tabs', 'appNav.Dropdown'

        ]
    );

    thisModule.config(function (pipTranslateProvider, $stateProvider, $urlRouterProvider, $mdIconProvider) {
            $mdIconProvider.iconSet('icons', '../images/icons.svg', 512);

//             $mdThemingProvider.theme('blue')
//                 .primaryPalette('blue')
//                 .accentPalette('green');
// 
//             $mdThemingProvider.theme('pink')
//                 .primaryPalette('pink')
//                 .accentPalette('orange');
// 
//             $mdThemingProvider.theme('green')
//                 .primaryPalette('green')
//                 .accentPalette('purple');
// 
//             $mdThemingProvider.theme('grey')
//                 .primaryPalette('grey')
//                 .accentPalette('yellow');
// 
//             $mdThemingProvider.setDefaultTheme('blue');

            // String translations
            pipTranslateProvider.translations('en', {
                'APPLICATION_TITLE': 'WebUI Sampler',

                'blue': 'Blue Theme',
                'green': 'Green Theme',
                'pink': 'Pink Theme',
                'grey': 'Grey Theme'
            });

            pipTranslateProvider.translations('ru', {
                'APPLICATION_TITLE': 'WebUI Демонстратор',

                'blue': 'Голубая тема',
                'green': 'Зеленая тема',
                'pink': 'Розовая тема',
                'grey': 'Серая тема'
            });

            for (var i = 0; i < content.length; i++) {
                var contentItem = content[i];
                $stateProvider.state(contentItem.state, contentItem);
            }
                
            $urlRouterProvider.otherwise('/date');
        } 
    );

    thisModule.controller('AppController', 
        function ($scope, $rootScope, $state, $mdSidenav, pipTranslate, $mdTheming, $mdMedia, localStorageService) {
            $scope.languages = ['en', 'ru'];
            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));
            $rootScope.$theme = localStorageService.get('theme');

            $scope.content = content;
            $scope.menuOpened = false;

            $scope.onLanguageClick = function(language) {
                pipTranslate.use(language);
            };

            $scope.onThemeClick = function(theme) {
                $rootScope.$theme = theme;
                //pipTheme.setCurrentTheme(theme);
            };
                        
            $scope.onSwitchPage = function(state) {
                $mdSidenav('left').close();
                $state.go(state);
            };
            
            $scope.onToggleMenu = function() {
                $mdSidenav('left').toggle();
            };
                        
            $scope.isActiveState = function(state) {
                return $state.current.name == state;  
            };

            $scope.isPadding = function () {
                if (!$rootScope.$state) return true;

                return !($rootScope.$state.name == 'tabs' || ($rootScope.$state.name == 'dropdown' && $mdMedia('xs')))
            }
        }
    );

})();
