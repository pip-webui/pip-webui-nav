/**
 * @file Global configuration for sample application
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipSampleConfig', ['pipRest.State', 'pipRest', 'pipSideNav',
        'pipAppBar']);

    // Configure application services before start
    thisModule.config(
        function ($mdThemingProvider, $stateProvider, $urlRouterProvider, pipAuthStateProvider, pipTranslateProvider,
                  pipRestProvider, pipSideNavProvider, pipAppBarProvider, $mdIconProvider) {

            var content = [
                    {title: 'Dropdown', state: 'dropdown', url: '/dropdown', controller: 'DropdownController',
                        templateUrl: 'dropdown.html', auth: false
                    },
                    {title: 'Tabs', state: 'tabs', url: '/tabs', controller: 'TabsController', templateUrl: 'tabs.html',
                        auth: false}
                ],
                contentItem, i;

            $mdIconProvider.iconSet('icons', '../images/icons.svg', 512);

            // String translations
            pipTranslateProvider.translations('en', {
                NAVIGATION_CONTROLS: 'Navigation Controls',
                CODE: 'Code',
                SAMPLE: 'sample'
            });

            pipTranslateProvider.translations('ru', {
                NAVIGATION_CONTROLS: 'Навигационные Контролы',
                CODE: 'Код',
                SAMPLE: 'пример'
            });

            pipAuthStateProvider.unauthorizedState('tabs');
            pipAuthStateProvider.authorizedState('tabs');

            for (i = 0; i < content.length; i++) {
                contentItem = content[i];
                $stateProvider.state(contentItem.state, contentItem);
            }

            $urlRouterProvider.otherwise('/tabs');

            // Configure navigation menu
            pipSideNavProvider.sections([
                {
                    links: [{title: 'NAVIGATION_CONTROLS', url: '/tabs'}]
                }
            ]);
        }
    );

})(window.angular);

