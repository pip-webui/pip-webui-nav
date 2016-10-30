'use strict';

import { IBreadcrumbService } from './breadcrumb/breadcrumb_service';

export interface INavService {
    appBar: any;
    navIcon: any; 
    breadcrumb: IBreadcrumbService;
    actions: any;
    search: any;
    sideNav: any;
    navHeader: any;
    navMenu: any;   
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
    }

    public appBar: any;
    public navIcon: any;
    public breadcrumb: IBreadcrumbService;
    public actions: any;
    public search: any;
    public sideNav: any;        
    public navHeader: any;
    public navMenu: any;    
}

angular.module('pipNav.Service', [])
    .service('pipNavService', NavService);
