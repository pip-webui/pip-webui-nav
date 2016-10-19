/**
 * @file Application Side Nav service
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipSideNav.Service', []);

    thisModule.provider('pipSideNav', function () {
        var config = {
            // Theme to be applied to the header
            theme: 'blue',
            // Parts of the sidenav
            parts: []
        };

        this.theme = theme;
        this.parts = initParts;

        this.$get = function ($rootScope, $mdSidenav) {
            $rootScope.$on('pipSideNavOpen', open);
            $rootScope.$on('pipSideNavClose', close);

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
                    throw new Exception("Part name has to be a string");

                if (value != null) {
                    config.parts[name] = value;
                    sendConfigEvent();
                }

                return config.parts[name];
            }

            function getOrSetParts(parts) {
                if (_.isObject(parts)) {
                    config.parts = parts;
                    sendConfigEvent();
                }

                return config.parts;
            }
                            
            function sendConfigEvent() {
                $rootScope.$broadcast('pipSideNavChanged', config);
            }

            function open(event) {
                $mdSidenav('pip-sidenav').open();
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
