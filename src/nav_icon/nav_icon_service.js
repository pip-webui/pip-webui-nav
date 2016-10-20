/**
 * @file Nav Icon service
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipNavIcon.Service', []);

    thisModule.provider('pipNavIcon', function () {
        var config = {
            // Type of nav icon: 'back', 'menu', 'image' or 'none'
            type: 'menu',
            // Image url
            imageUrl: null,
            // Icon name
            iconName: 'back',
            // Handle nav icon click event
            callback: null,
            // Event name
            event: null
        };

        // Get the service instance
        this.$get = function ($rootScope) {
            return {
                getConfig: getConfig,
                hide: hide,
                showMenu: showMenu,
                showBack: showBack,
                showIcon: showIcon,
                showImage: showImage
            };

            // ----------------------
            
            function getConfig() {
                return config;
            }

            // Show navigation icon
            function hide() {
                config.type = 'none';
                config.callback = null;
                config.event = null;
                sendConfigEvent();
            }

            function showMenu(callbackOrEvent) {
                config.type = 'menu';
                config.callback = null;
                config.event = null;

                if (_.isFunction(callbackOrEvent))
                    config.callback = callbackOrEvent;
                if (_.isString(callbackOrEvent))
                    config.event = callbackOrEvent;

                sendConfigEvent();
            }

            function showIcon(iconName, callbackOrEvent) {
                config.type = 'icon';
                config.iconName = iconName;
                config.callback = null;
                config.event = null;

                if (_.isFunction(callbackOrEvent))
                    config.callback = callbackOrEvent;
                if (_.isString(callbackOrEvent))
                    config.event = callbackOrEvent;

                sendConfigEvent();
            }

            function showBack(callbackOrEvent) {
                config.type = 'back';
                config.callback = null;
                config.event = null;

                if (_.isFunction(callbackOrEvent))
                    config.callback = callbackOrEvent;
                if (_.isString(callbackOrEvent))
                    config.event = callbackOrEvent;

                sendConfigEvent();
            }

            function showImage(imageUrl, callbackOrEvent) {
                config.type = 'image';
                config.imageUrl = imageUrl;
                config.callback = null;
                config.event = null;

                if (_.isFunction(callbackOrEvent))
                    config.callback = callbackOrEvent;
                if (_.isString(callbackOrEvent))
                    config.event = callbackOrEvent;

                sendConfigEvent();
            }

            function sendConfigEvent() {
                $rootScope.$broadcast('pipNavIconChanged', config);
            }

        };

    });

})(window.angular, window._);
