/**
 * @file Application Nav Menu service
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipNavMenu.Service', []);

    thisModule.provider('pipNavMenu', function () {
        var config = [];

        this.sections = init;

        this.$get = function ($rootScope, $mdSidenav) {
            return {
                get: getConfig,
                set: setConfig
            };
            
            //---------------------

            function getConfig() {
                return config;  
            }
                                                        
            function setConfig(newConfig) {
                init(newConfig);
                $rootScope.$broadcast('pipNavMenuChanged', config);
                return config;  
            }
        };

        // function validateConfig(sections) {
        //     pipAssertProvider.isArray(sections, 'pipNavMenuProvider.config or pipNavMenu.config: sections should be an array');
        //     _.each(sections, function (section, number) {
        //         if (section.access) {
        //             pipAssertProvider.isFunction(section.access, 'pipNavMenuProvider.config or pipNavMenu.config: in section number '
        //                 + number + " with title " + section.title + ' access should be a function');
        //         }
        //         if (section.links) {
        //             pipAssertProvider.isArray(section.links, 'pipNavMenuProvider.config or pipNavMenu.config: in section number '
        //                 + number + " with title " + section.title + ' links should be an array');
        //             _.each(section.links, function (link) {
        //                 if (link.access) pipAssertProvider.isFunction(link.access, 'pipNavMenuProvider.config or pipNavMenu.config: in section number '
        //                     + number + " with title " + section.title + ' in link with title ' + link.title + ' access should be a function');
        //             });
        //         }
        //     });
        // }

        function init(newConfig) {
            // if (pipDebugProvider.enabled()) 
            //     validateConfig(newConfig);

            if (_.isArray(newConfig))
                config = newConfig;

            return config;
        };
    });

})();
