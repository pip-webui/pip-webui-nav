'use strict';

export interface IAppbarService {
    
}

function AppBarProvider(): any {
    var config = {
        // Theme to be applied to the header
        theme: 'default',
        cssClass: '',
        ngClasses: {},
        // Parts of the appbar
        parts: {},
        showAppBar: true
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
            
            show: showAppBar,
            hide: hideAppBar,
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

        // Show, show appbar 
        function showAppBar() {
            config.showAppBar = true;
            sendConfigEvent();
        }

        // Show, hide appbar 
        function hideAppBar() {
            config.showAppBar = false;
            sendConfigEvent();
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

}


angular
    .module('pipAppBar')
    .provider('pipAppBar', AppBarProvider);
