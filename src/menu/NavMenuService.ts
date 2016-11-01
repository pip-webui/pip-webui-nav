'use strict';

export interface INavMenuService {

}

export interface INavMenuProvider extends ng.IServiceProvider {

}

function NavMenuProvider(): any {
    var config = [],
        collapsed = true,
        sectionIcon: string;

    this.sections = init;
    this.sectionIcon = setOrGetIcon;
    this.collapsed = setOrGetCollapsed;

    this.$get = function ($rootScope, $mdSidenav) {
        return {
            get: getConfig,
            set: setConfig,
            setCounter: setCounter,
            collapsed: setOrGetCollapsed,
            icon: setOrGetIcon
        };
        
        //---------------------

        function getConfig() {

            return config;  
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

    function setOrGetIcon(value: string) {
        if (_.isString(value)) {
            sectionIcon = value;
        }

        return sectionIcon;
    }

    function setOrGetCollapsed(value: boolean) {
        if (value !== undefined) {
            collapsed = value;
        }

        return collapsed;
    }

    function init(newConfig) {
        if (_.isArray(newConfig)) {
            config = newConfig;
        }

        return config;
    };
}

angular
    .module('pipNavMenu')
    .provider('pipNavMenu', NavMenuProvider);
