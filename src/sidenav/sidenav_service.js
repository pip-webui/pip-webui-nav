/**
 * @file Application Side Nav service
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipSideNav.Service', ['pipAssert', 'pipDebug']);

    thisModule.provider('pipSideNav', function (pipAssertProvider, pipDebugProvider) {
        var config = {
            // Theme to be applied to the header
            theme: 'blue',
            // Sections with navigation links
            sections: []
        };

        this.theme = theme;
        this.sections = sections;

        this.$get = function ($rootScope, $mdSidenav) {
            $rootScope.$on('pipSideNavOpen', open);
            $rootScope.$on('pipSideNavClose', close);

            return {
                config: getConfig,
                theme: setTheme,
                sections: setSections,
                open: open,
                close: close,
                toggle: toggle
            };
            //---------------------

            function getConfig() {
                return config;  
            };
                            
            function setTheme(newTheme) {
                theme(newTheme);
                sendConfigEvent();  
                return config.theme;
            };
                            
            function setSections(newSections) {
                sections(newSections);
                sendConfigEvent();
                return config.sections;  
            };
                            
            function sendConfigEvent() {
                $rootScope.$broadcast('pipSideNavChanged', config);
            };

            function open(event) {
                $mdSidenav('pip-sidenav').open();   
            };
                 
            function close(event) {
                $mdSidenav('pip-sidenav').close();   
            };                

            function toggle() {
                $mdSidenav('pip-sidenav').toggle();   
            };                   
        };

        function theme(newTheme) {
            config.theme = newTheme || config.theme;
            return config.theme;            
        };

        function validateSections(sections) {
            pipAssertProvider.isArray(sections, 'pipSideNavProvider.sections or pipSideNav.sections: sections should be an array');
            _.each(sections, function (section, number) {
                if (section.access) {
                    pipAssertProvider.isFunction(section.access, 'pipSideNavProvider.sections or pipSideNav.sections: in section number '
                        + number + " with title " + section.title + ' access should be a function');
                }
                if (section.links) {
                    pipAssertProvider.isArray(section.links, 'pipSideNavProvider.sections or pipSideNav.sections: in section number '
                        + number + " with title " + section.title + ' links should be an array');
                    _.each(section.links, function (link) {
                        if (link.access) pipAssertProvider.isFunction(link.access, 'pipSideNavProvider.sections or pipSideNav.sections: in section number '
                            + number + " with title " + section.title + ' in link with title ' + link.title + ' access should be a function');
                    });
                }
            });
        }

        function sections(newSections) {
            if (pipDebugProvider.enabled()) validateSections(newSections);

            if (_.isArray(newSections))
                config.sections = newSections;
            return config.sections;
        };
    });

})();
