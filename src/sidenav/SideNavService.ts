'use strict';

export interface ISideNavService {

}

export interface ISideNavProvider extends ng.IServiceProvider {
    
}

function SideNavProvider(): any {
    var config = {
        // Theme to be applied to the header
        theme: 'default',
        // Parts of the sidenav
        parts: []
    },
    sideNavId = 'pip-sidenav', // sidenav identificatior
    sideNavState = {};

    this.id = id; 
    this.theme = theme;
    this.parts = initParts;

    this.$get = function ($rootScope, $mdSidenav) {
        $rootScope.$on('pipOpenSideNav', open);
        $rootScope.$on('pipCloseSideNav', close);

        return {
            config: getConfig,
            part: getOrSetPart,
            parts: getOrSetParts,
            id: getOrSetId,
            open: open,
            close: close,
            toggle: toggle,
            state: getOrSetState
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

        function getOrSetId(value) {
            if (_.isString(value)) {
                if (sideNavId !== value) {
                    sideNavId = value;
                }
            }

            return sideNavId;
        }

        function getOrSetState(value) {
            if (angular.isObject(value)) {
                sideNavState = _.cloneDeep(value);
                
            }
            $rootScope.$broadcast('pipSideNavStateChange', sideNavState);

            return sideNavState;
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

            $mdSidenav(sideNavId).open();
        }
                
        function close(event) {
            console.log('close', sideNavId);
            $mdSidenav(sideNavId).close();   
        }                

        function toggle() {
            $mdSidenav(sideNavId).toggle();   
            $rootScope.$broadcast('pipSideNavToggle', config);
        }
    };

    function setState(value) {
        sideNavState = value || sideNavState;

        return sideNavState;
    }

    function id(value) {
        sideNavId = value || sideNavId;

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
}


angular
    .module('pipSideNav')
    .provider('pipSideNav', SideNavProvider);
