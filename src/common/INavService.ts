import { INavIconService } from '../icon/INavIconService';
import { INavMenuService } from '../menu/NavMenuService';
import { INavHeaderService } from '../header/NavHeaderService';
import { IBreadcrumbService } from '../breadcrumb/BreadcrumbService';
import { ISearchService } from '../search/ISearchService';
import { IActionsService } from '../actions/ActionsService';
import { IAppBarService } from '../appbar/IAppBarService';
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
