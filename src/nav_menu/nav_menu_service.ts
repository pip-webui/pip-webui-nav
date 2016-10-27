/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipNavMenu.Service', []);

    thisModule.provider('pipNavMenu', function (): any {
        var config = [];
        var collapsed = true;

        this.sections = init;

        this.$get = function ($rootScope, $mdSidenav) {
            return {
                get: getConfig,
                set: setConfig,
                setCounter: setCounter,
                collapsed: setCollapsed
            };
            
            //---------------------

            function getConfig() {

                return config;  
            }

            function setCollapsed(value: boolean) {
                if (value !== undefined) {
                    collapsed = value;
                }

                return collapsed;
            }

                                                        
            function setConfig(newConfig) {
                init(newConfig);
                $rootScope.$broadcast('pipNavMenuChanged', config);

                return config;  
            }

            function setCounter(linkTitle: string, counter: number) {
                if (!linkTitle || !angular.isNumber(counter)) { return; }

                let section: any, menuItem: any;

                section = _.find(config, function(s) {
                    let item = _.find(s.links, {title: linkTitle});
                    if (item) {
                        return item;
                    } else { return false };
                });

                menuItem = _.find(section.links, {title: linkTitle});
                menuItem.count = counter;
                setConfig(config);
            }
        };

        function init(newConfig) {
            if (_.isArray(newConfig)) {
                config = newConfig;
            }

            return config;
        };
    });

})();


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
