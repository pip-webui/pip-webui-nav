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
        };

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
                $mdSidenav('pip-sidenav md-is-locked-open').open();
            }
                 
            function close(event) {
                $mdSidenav('pip-sidenav').close();   
            }                

            function toggle() {
                $mdSidenav('pip-sidenav').toggle();   
            }
        };

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
