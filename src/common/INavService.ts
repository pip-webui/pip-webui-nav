import { INavIconService } from '../icon/INavIconService';
import { INavMenuService } from '../menu/INavMenuService';
import { INavHeaderService } from '../header/INavHeaderService';
import { IBreadcrumbService } from '../breadcrumb/IBreadcrumbService';
import { ISearchService } from '../search/ISearchService';
import { IActionsService } from '../actions/ActionsService';
import { IAppBarService } from '../appbar/IAppBarService';
import { ISideNavService } from '../sidenav/ISideNavService';

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
