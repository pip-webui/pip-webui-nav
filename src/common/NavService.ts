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

    reset(): void;
}

class NavService implements INavService {

    public constructor($injector: ng.auto.IInjectorService) {
        "ngInject";

        this.appbar = $injector.has('pipAppBar') ? <IAppBarService>$injector.get('pipAppBar') : null;
        this.icon = $injector.has('pipNavIcon') ? <INavIconService>$injector.get('pipNavIcon') : null;
        this.breadcrumb = $injector.has('pipBreadcrumb') ? <IBreadcrumbService>$injector.get('pipBreadcrumb') : null;
        this.actions = $injector.has('pipActions') ? <IActionsService>$injector.get('pipActions') : null;
        this.search = $injector.has('pipSearch') ? <ISearchService>$injector.get('pipSearch') : null;
        this.sidenav = $injector.has('pipSideNav') ? <ISideNavService>$injector.get('pipSideNav') : null;
        this.header = $injector.has('pipNavHeader') ? <INavHeaderService>$injector.get('pipNavHeader') : null;
        this.menu = $injector.has('pipNavMenu') ? <INavMenuService>$injector.get('pipNavMenu') : null;
    }

    public appbar: IAppBarService;
    public icon: INavIconService;
    public breadcrumb: IBreadcrumbService;
    public actions: IActionsService;
    public search: ISearchService;
    public sidenav: ISideNavService;
    public header: INavHeaderService;
    public menu: INavMenuService;

    public reset() {
        // Reset appbar
        if (this.appbar) {
            this.appbar.show();
        }

        // Reset icon
        if (this.icon) {
            this.icon.showMenu();
        }

        // Reset breadcrumb
        if (this.breadcrumb) {
            this.breadcrumb.showText(null);
        }

        // Reset actions
        if (this.actions) {
            this.actions.show();
        }

        // Reset search
        if (this.search) {
            this.search.set(null);
        }

        if (this.sidenav) {
            this.sidenav.show();
        }

    }
}

angular
    .module('pipNavService', [])
    .service('pipNavService', NavService);