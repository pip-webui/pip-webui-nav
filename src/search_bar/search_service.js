/**
 * @file Search service
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipSearch.Service', []);

    thisModule.provider('pipSearch', function () {
        var config = {
            // Search visible
            visible: false,
            // Search criteria
            criteria: '',
            // History for search autocomplete
            history: [],
            // Callback for search
            callback: null,
        };

        // Get the service instance
        this.$get = function ($rootScope) {
            $rootScope.$on('pipSearchOpen', open);
            $rootScope.$on('pipSearchClose', close);

            return {
                set: setSearch,
                clear: clearSearch,
                criteria: updateCriteria,
                history: updateHistory,
            };

            // ----------------------

            function getConfig() {
                return config;
            }

            function setSearch(callback, criteria, history) {
                config.callback = callback;
                config.criteria = criteria;
                config.history = history;

                sendConfigEvent();
            }

            function clearSearch() {
                config.callback = null;
                config.criteria = null;

                sendConfigEvent();
            }

            function open(event) {
                config.visible = true;
                sendConfigEvent();                
            }
                 
            function close(event) {
                config.visible = false;
                sendConfigEvent();                
            }                

            function toggle() {
                config.visible = !config.visible;
                sendConfigEvent();                
            }                   

            function updateCriteria(criteria) {
                config.criteria = criteria;
                sendConfigEvent();
            }

            function updateHistory(history) {
                config.history = history;
                sendConfigEvent();
            }

            function sendConfigEvent() {
                $rootScope.$broadcast('pipSearchChanged', config);
            }
        };

    });

})(window.angular, window._);
