/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./breadcrumb/breadcrumb_service.ts" />

module pip.nav {
    'use strict';

    export interface INavService {
        appBar: any;
        sideNav: any;
        navIcon: any; 
        breadcrumb: IBreadcrumbService;
        actions: any;
        navHeader: any;
        navMenu: any;
        search: any;
    }

    class NavService implements INavService {
        public constructor($injector) {
            "ngInject";

            this.appBar = $injector.has('pipAppBar') ? $injector.get('pipAppBar') : null;
            this.sideNav = $injector.has('pipSideNav') ? $injector.get('pipSideNav') : null;
            this.navIcon = $injector.has('pipNavIcon') ? $injector.get('pipNavIcon') : null;
            this.breadcrumb = $injector.has('pipBreadcrumb') ? $injector.get('pipBreadcrumb') : null;
            this.actions = $injector.has('pipActions') ? $injector.get('pipActions') : null;
            this.navHeader = $injector.has('pipNavHeader') ? $injector.get('pipNavHeader') : null;
            this.navMenu = $injector.has('pipNavMenu') ? $injector.get('pipNavMenu') : null;
            this.search = $injector.has('pipSearch') ? $injector.get('pipSearch') : null;
        }

        public appBar: any;
        public sideNav: any;
        public navIcon: any;
        public breadcrumb: IBreadcrumbService;
        public actions: any;
        public navHeader: any;
        public navMenu: any;
        public search: any;
    }

    angular.module('pipNav.Service', [])
        .service('pipNavService', NavService);

}