/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipSideNav.Service', []);

    thisModule.provider('pipSideNav', function (): any {
        var config = {
            // Theme to be applied to the header
            theme: 'default',
            // Parts of the sidenav
            parts: []
        },
        sideNavId = 'pip-sidenav'; // sidenav identificatior

        this.id = id; 
        this.theme = theme;
        this.parts = initParts;

        this.$get = function ($rootScope, $mdSidenav) {
            $rootScope.$on('pipOpenSideNav', open);
            $rootScope.$on('pipCloseSideNav', close);

            return {
                config: getConfig,
                //theme: setTheme,
                part: getOrSetPart,
                parts: getOrSetParts,
                id: getOrSetId,
                open: open,
                close: close,
                toggle: toggle
            };

            //---------------------

            function getConfig() {
                return config;  
            }
                            
            function getOrSetPart(name, value) {
                if (!_.isString(name))
                    throw new Error("Part name has to be a string");

                if (value != undefined) {
                    if (config.parts[name] != value) {
                        config.parts[name] = value;
                        sendConfigEvent();
                    }
                }

                return config.parts[name];
            }

            function getOrSetId(id) {
                if (_.isString(id)) {
                    if (sideNavId !== id) {
                        sideNavId = id;
                    }
                }

                return sideNavId;
            }

            function getOrSetParts(parts) {
                if (_.isObject(parts)) {
                    if (!_.isEqual(config.parts, parts)) {
                        config.parts = parts;
                        sendConfigEvent();
                    }
                }

                return config.parts;
            }
                            
            function sendConfigEvent() {
                $rootScope.$broadcast('pipSideNavChanged', config);
            }

            function open(event) {
                console.log('open pip', sideNavId);
                $mdSidenav(sideNavId).open();
            }
                 
            function close(event) {
                console.log('close pip', sideNavId);
                $mdSidenav(sideNavId).close();   
            }                

            function toggle() {
                console.log('toggle pip', sideNavId);
                $mdSidenav(sideNavId).toggle();   
                $rootScope.$broadcast('pipSideNavToggle', config);
            }
        };

        function id(id) {
            console.log('set id', sideNavId);
            sideNavId = id || sideNavId;

            return sideNavId;
        }

        function theme(theme) {
            config.theme = theme || config.theme;

            return config.theme;
        }

        function initParts(parts) {
            if (_.isObject(parts)) {
                config.parts = parts;
            }

            return config.parts;
        }
    });

})();
