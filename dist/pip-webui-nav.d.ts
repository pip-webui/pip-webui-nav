declare module pip.nav {

export let ActionsChangedEvent: string;
export class SimpleActionItem {
    name: string;
    title?: string;
    divider?: boolean;
    icon?: string;
    count?: number;
    access?: (action: SimpleActionItem) => boolean;
    breakpoints?: string[];
    href?: string;
    url?: string;
    state?: string;
    stateParams?: any;
    event?: string;
    click?: (action: SimpleActionItem) => void;
}
export class ActionItem extends SimpleActionItem {
    subActions: SimpleActionItem[];
}
export class ActionsConfig {
    primaryGlobalActions: ActionItem[];
    primaryLocalActions: ActionItem[];
    secondaryGlobalActions: ActionItem[];
    secondaryLocalActions: ActionItem[];
}
export interface IActionsService {
    readonly config: ActionsConfig;
    primaryGlobalActions: ActionItem[];
    primaryLocalActions: ActionItem[];
    secondaryGlobalActions: ActionItem[];
    secondaryLocalActions: ActionItem[];
    show(primaryActions?: ActionItem[], secondaryActions?: ActionItem[]): void;
    hide(): void;
    updateCount(link: string, count: number): void;
    clearCounts(): void;
}
export interface IActionsProvider extends ng.IServiceProvider {
    config: ActionsConfig;
    primaryGlobalActions: ActionItem[];
    primaryLocalActions: ActionItem[];
    secondaryGlobalActions: ActionItem[];
    secondaryLocalActions: ActionItem[];
}





export let BreadcrumbChangedEvent: string;
export let BreadcrumbBackEvent: string;
export class BreadcrumbItem {
    title: string;
    click?: (item: BreadcrumbItem) => void;
    subActions?: SimpleActionItem[];
}
export class BreadcrumbConfig {
    text: string;
    items: BreadcrumbItem[];
    criteria: string;
}
export interface IBreadcrumbService {
    config: BreadcrumbConfig;
    text: string;
    items: BreadcrumbItem[];
    criteria: string;
    showText(text: string, criteria?: string): any;
    showItems(items: BreadcrumbItem[], criteria?: string): any;
}
export interface IBreadcrumbProvider extends ng.IServiceProvider {
    text: string;
}


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



export let AppBarChangedEvent: string;
export class AppBarConfig {
    visible: boolean;
    parts: any;
    classes: string[];
}
export interface IAppBarService {
    readonly config: AppBarConfig;
    readonly classes: string[];
    parts: any;
    show(parts?: any, classes?: string[], shadowBreakpoints?: string[]): void;
    hide(): void;
    addShadow(...breakpoints: string[]): void;
    removeShadow(): void;
    addClass(...classes: string[]): void;
    removeClass(...classes: string[]): void;
    part(part: string, value: any): void;
}
export interface IAppBarProvider extends ng.IServiceProvider {
    config: AppBarConfig;
    parts: any;
    classes: string[];
    addClass(...classes: string[]): void;
    removeClass(...classes: string[]): void;
    part(part: string, value: any): void;
}






export let NavHeaderChangedEvent: string;
export class NavHeaderConfig {
    imageUrl: string;
    defaultImageUrl: string;
    title: string;
    subtitle: string;
    click: () => void;
    event: string;
}
export interface INavHeaderService {
    readonly config: NavHeaderConfig;
    imageUrl: string;
    title: string;
    subtitle: string;
    click: () => void;
    event: string;
    show(title: string, subtitle: string, imageUrl: string, callbackOrEvent?: any): void;
    hide(): void;
}
export interface INavHeaderProvider extends ng.IServiceProvider {
    config: NavHeaderConfig;
    defaultImageUrl: string;
    imageUrl: string;
    title: string;
    subtitle: string;
    click: () => void;
    event: string;
    set(title: string, subtitle: string, imageUrl: string, callbackOrEvent?: any): void;
    clear(): void;
}



export let NavIconChangedEvent: string;
export class NavIconConfig {
    type: string;
    imageUrl: string;
    icon: string;
    click: () => void;
    event: string;
}
export interface INavIconService {
    readonly config: NavIconConfig;
    showMenu(callbackOrEvent?: any): void;
    showIcon(icon: string, callbackOrEvent?: any): void;
    showBack(callbackOrEvent?: any): void;
    showImage(imageUrl: string, callbackOrEvent?: any): void;
    hide(): void;
}
export interface INavIconProvider extends ng.IServiceProvider {
    config: NavIconConfig;
    setMenu(callbackOrEvent?: any): void;
    setIcon(icon: string, callbackOrEvent?: any): void;
    setBack(callbackOrEvent?: any): void;
    setImage(imageUrl: string, callbackOrEvent?: any): void;
    clear(): void;
}




export let NavMenuChangedEvent: string;
export class NavMenuLink {
    name: string;
    title: string;
    icon?: string;
    count?: number;
    badgeStyle?: string;
    access?: (link: NavMenuLink) => boolean;
    href?: string;
    url?: string;
    state?: string;
    stateParams?: any;
    parentState?: string;
    event?: string;
    click?: (link: NavMenuLink) => void;
}
export class NavMenuSection {
    name: string;
    title?: string;
    icon?: string;
    links: NavMenuLink[];
    access?: (section: NavMenuSection) => boolean;
}
export class NavMenuConfig {
    sections: NavMenuSection[];
    defaultIcon: string;
}
export interface INavMenuService {
    sections: NavMenuSection[];
    defaultIcon: string;
    updateCount(link: string, count: number): void;
    updateBadgeStyle(link: string, style: string): void;
    clearCounts(): void;
}
export interface INavMenuProvider extends ng.IServiceProvider {
    sections: NavMenuSection[];
    defaultIcon: string;
}



export let OpenSearchEvent: string;
export let CloseSearchEvent: string;
export let SearchChangedEvent: string;
export let SearchActivatedEvent: string;
export class SearchConfig {
    visible: boolean;
    criteria: string;
    params: any;
    history: string[];
    callback: (criteria: string) => void;
}
export interface ISearchService {
    config: SearchConfig;
    criteria: string;
    params: any;
    history: string[];
    callback: (criteria: string) => void;
    set(callback: (criteria: string) => void, criteria?: string, params?: any, history?: string[]): void;
    clear(): void;
    open(): void;
    close(): void;
    toggle(): void;
}
export interface ISearchProvider extends ng.IServiceProvider {
}




export let SideNavChangedEvent: string;
export let SideNavStateChangedEvent: string;
export let OpenSideNavEvent: string;
export let CloseSideNavEvent: string;
export class SideNavConfig {
    parts: any;
    classes: string[];
    state: any;
    type: string;
    visible: boolean;
}
export interface ISideNavService {
    readonly config: SideNavConfig;
    readonly classes: string[];
    parts: any;
    state: any;
    open(): void;
    close(): void;
    toggle(): void;
    show(): void;
    hide(): void;
    addClass(...classes: string[]): void;
    removeClass(...classes: string[]): void;
    part(part: string, value: any): void;
}
export interface ISideNavProvider extends ng.IServiceProvider {
    config: SideNavConfig;
    parts: any;
    type: string;
    visible: boolean;
    classes: string[];
    addClass(...classes: string[]): void;
    removeClass(...classes: string[]): void;
    part(part: string, value: any): void;
}


}
