'use strict';

import { INavIconService } from '../icon/NavIconService';
import { INavMenuService } from '../menu/NavMenuService';
import { INavHeaderService } from '../header/NavHeaderService';
import { IBreadcrumbService } from '../breadcrumb/BreadcrumbService';
import { ISearchService } from '../search/SearchService';
import { IActionsService } from '../actions/ActionsService';
import { IAppBarService } from '../appbar/AppBarService';
import { ISideNavService } from '../sidenav/SideNavService';

export interface INavService {
    appbar: IAppBarService;
    icon: INavIconService; 
    breadcrumb: IBreadcrumbService;
    actions: IActionsService;
    search: ISearchService;
    sidenav: ISideNavService;
    header: INavHeaderService;
    menu: INavMenuService;   
}

class NavService implements INavService {

    public constructor($injector) {
        "ngInject";

        this.appbar = $injector.has('pipAppBar') ? $injector.get('pipAppBar') : null;
        this.icon = $injector.has('pipNavIcon') ? $injector.get('pipNavIcon') : null;
        this.breadcrumb = $injector.has('pipBreadcrumb') ? $injector.get('pipBreadcrumb') : null;
        this.actions = $injector.has('pipActions') ? $injector.get('pipActions') : null;
        this.search = $injector.has('pipSearch') ? $injector.get('pipSearch') : null;
        this.sidenav = $injector.has('pipSideNav') ? $injector.get('pipSideNav') : null;
        this.header = $injector.has('pipNavHeader') ? $injector.get('pipNavHeader') : null;
        this.menu = $injector.has('pipNavMenu') ? $injector.get('pipNavMenu') : null;    
    }

    public appbar: IAppBarService;
    public icon: INavIconService;
    public breadcrumb: IBreadcrumbService;
    public actions: IActionsService;
    public search: ISearchService;
    public sidenav: ISideNavService;        
    public header: INavHeaderService;
    public menu: INavMenuService;    
}

angular
    .module('pipNavService', [])
    .service('pipNavService', NavService);