/**
 * @file Application App Bar service
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipAppBar.Service', []);

    thisModule.provider('pipAppBar', function () {
        var config = {
            // Theme to be applied to the header
            theme: 'blue',
            cssClass: '',
            ngClasses: {},
            // Parts of the appbar
            parts: {}
        };

        // Configure global parameters
        this.theme = theme;
        this.parts = initParts;

        // Get the service instance
        this.$get = function ($rootScope) {
            return {
                config: getConfig,
                cssClass: cssClass,

                part: getOrSetPart,
                parts: getOrSetParts,
                
                showShadow: showShadow,
                showShadowSm: showShadowSm,
                showShadowSmXs: showShadowSmXs,
                hideShadow: hideShadow
            };

            // ----------------------

            function getConfig() {
                return config;
            }

            // Todo: Do we need that "hack"?
            function cssClass(newCssClass) {
                if (newCssClass != undefined) {
                    config.cssClass = newCssClass;
                    sendConfigEvent();
                }

                return config.cssClass;
            }

            // Show, hide appbar shadow
            function showShadowSm() {
                config.ngClasses['pip-shadow'] = false;
                config.ngClasses['pip-shadow-sm'] = true;
                config.ngClasses['pip-shadow-xs'] = false;
                sendConfigEvent();
            }

            function showShadowSmXs() {
                config.ngClasses['pip-shadow'] = false;
                config.ngClasses['pip-shadow-sm'] = true;
                config.ngClasses['pip-shadow-xs'] = true;
                sendConfigEvent();
            }

            function showShadow() {
                config.ngClasses['pip-shadow'] = true;
                sendConfigEvent();
            }

            function hideShadow() {
                config.ngClasses['pip-shadow'] = false;
                config.ngClasses['pip-shadow-sm'] = false;
                config.ngClasses['pip-shadow-xs'] = false;
                sendConfigEvent();
            }

            function sendConfigEvent() {
                $rootScope.$broadcast('pipAppBarChanged', config);
            }

            function getOrSetPart(name, value) {
                if (!_.isString(name))
                    throw new Exception("Part name has to be a string");

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
                $rootScope.$broadcast('pipAppBarChanged', config);
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

})(window.angular, window._);
