/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./breadcrumb/breadcrumb_service.ts" />

module pip.nav {
    'use strict';

    export interface INavService {
        appBar: any;
        navIcon: any; 
        breadcrumb: IBreadcrumbService;
        actions: any;
        search: any;
        sideNav: any;
        navHeader: any;
        navMenu: any;   
        scaleSideNav: any;
        scaleNavHeader: any;
        scaleNavMenu: any; 
   }

    class NavService implements INavService {
        public constructor($injector) {
            "ngInject";

            this.appBar = $injector.has('pipAppBar') ? $injector.get('pipAppBar') : null;
            this.navIcon = $injector.has('pipNavIcon') ? $injector.get('pipNavIcon') : null;
            this.breadcrumb = $injector.has('pipBreadcrumb') ? $injector.get('pipBreadcrumb') : null;
            this.actions = $injector.has('pipActions') ? $injector.get('pipActions') : null;
            this.search = $injector.has('pipSearch') ? $injector.get('pipSearch') : null;
            this.sideNav = $injector.has('pipSideNav') ? $injector.get('pipSideNav') : null;
            this.navHeader = $injector.has('pipNavHeader') ? $injector.get('pipNavHeader') : null;
            this.navMenu = $injector.has('pipNavMenu') ? $injector.get('pipNavMenu') : null;    
            this.scaleSideNav = $injector.has('pipSacleSideNav') ? $injector.get('pipSacleSideNav') : null;
            this.scaleNavHeader = $injector.has('pipSacleNavHeader') ? $injector.get('pipSacleNavHeader') : null;
            this.scaleNavMenu = $injector.has('pipSacleNavMenu') ? $injector.get('pipSacleNavMenu') : null;                          
        }

        public appBar: any;
        public navIcon: any;
        public breadcrumb: IBreadcrumbService;
        public actions: any;
        public search: any;
        public sideNav: any;        
        public navHeader: any;
        public navMenu: any;    
        public scaleSideNav: any;        
        public scaleNavHeader: any;
        public scaleNavMenu: any;            
    }

    angular.module('pipNav.Service', [])
        .service('pipNavService', NavService);

}