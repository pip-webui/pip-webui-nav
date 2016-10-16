/**
 * @file Breadcrumb service
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipBreadcrumb.Service', []);

    thisModule.provider('pipBreadcrumb', function () {
        var config = {
            // Title text
            text: null,
            // Navigation items [{ title, click }],
            items: null,
            // Search criteria
            criteria: '',
        };

        // Get the service instance
        this.$get = function ($rootScope) {
            return {
                config: getConfig,

                text: setText,
                path: setItems,
                items: setItems,

                criteria: setCriteria
            };

            // ----------------------

            function getConfig() {
                return config;
            }

            function setText(text) {
                config.text = text;
                config.items = null;
                
                sendConfigEvent();
            }

            function setItems(text, items) {
                if (_.isArray(text)) {
                    items = text;
                    text = items[items.length - 1].title;
                    items.splice(items.length - 1, 1);
                }
                config.text = text;
                config.items = items;

                // if (items.length > 0) {
                //     config.navIconType = config.navIconType === 'none' ? 'none' : config.navIconType;
                //     config.navIconCallback = items[items.length - 1];
                // } else {
                //     config.navIconType = 'menu';
                //     config.navIconCallback = null;
                // }

                sendConfigEvent();
            }

            function setCriteria(criteria) {
                config.criteria = criteria;
                sendConfigEvent();
            }

            function sendConfigEvent() {
                $rootScope.$broadcast('pipBreadcrumbChanged', config);
            }
        };
        
    });

})(window.angular, window._);
