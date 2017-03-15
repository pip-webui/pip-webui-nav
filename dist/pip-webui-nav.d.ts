declare module pip.nav {

export let ActionsChangedEvent: string;
export let SecondaryActionsOpenEvent: string;
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
    openMenuEvent(): void;
}
export interface IActionsProvider extends ng.IServiceProvider {
    config: ActionsConfig;
    primaryGlobalActions: ActionItem[];
    primaryLocalActions: ActionItem[];
    secondaryGlobalActions: ActionItem[];
    secondaryLocalActions: ActionItem[];
}





export class AppBarConfig {
    visible: boolean;
    parts: any;
    classes: string[];
}


export let AppBarChangedEvent: string;

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

export let BreadcrumbChangedEvent: string;
export let BreadcrumbBackEvent: string;

export interface IBreadcrumbService {
    config: BreadcrumbConfig;
    text: string;
    items: BreadcrumbItem[];
    criteria: string;
    showText(text: string, criteria?: string): void;
    showItems(items: BreadcrumbItem[], criteria?: string): void;
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




export interface INavHeaderService {
    readonly config: NavHeaderConfig;
    imageUrl: string;
    title: string;
    subtitle: string;
    event: string;
    show(title: string, subtitle: string, imageUrl: string, callbackOrEvent?: any): void;
    hide(): void;
    click: () => void;
}
export interface INavHeaderProvider extends ng.IServiceProvider {
    config: NavHeaderConfig;
    defaultImageUrl: string;
    imageUrl: string;
    title: string;
    subtitle: string;
    event: string;
    set(title: string, subtitle: string, imageUrl: string, callbackOrEvent?: any): void;
    clear(): void;
    click: () => void;
}



export class NavHeaderConfig {
    imageUrl: string;
    defaultImageUrl: string;
    title: string;
    subtitle: string;
    imageCss: string;
    click: () => void;
    event: string;
}

export let NavHeaderChangedEvent: string;

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



export class NavIconConfig {
    type: string;
    imageUrl: string;
    icon: string;
    click: () => void;
    event: string;
}

export let NavIconClickedEvent: string;
export let NavIconChangedEvent: string;




export let NavMenuChangedEvent: string;
export class NavMenuLink {
    name: string;
    title: string;
    tooltipText?: string;
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
    tooltipText?: string;
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

export class SideNavStateNames {
    static Toggle: string;
    static Small: string;
    static Large: string;
    static XLarge: string;
}
export class SideNavState {
    id: SideNavStateNames;
    addClass: string;
    isLockedOpen: boolean;
    showHeader: boolean;
    expandedButton: boolean;
    isExpanded: boolean;
    expand: boolean;
    showIconTooltype: boolean;
}
export class SideNavStateConfig {
    toggle: SideNavState;
    small: SideNavState;
    large: SideNavState;
    xlarge: SideNavState;
}

class PipTab {
    id: string;
    name?: string;
    count: number;
    title: string;
}
interface ITabsBindings {
    [key: string]: any;
    ngDisabled: any;
    tabs: any;
    showTabs: any;
    showTabsShadow: any;
    activeIndex: any;
    select: any;
    breakpoints: any;
    themeClass: any;
}
const TabsBindings: ITabsBindings;
class TabsChanges implements ng.IOnChangesObject, ITabsBindings {
    [key: string]: ng.IChangesObject<any>;
    ngDisabled: ng.IChangesObject<() => ng.IPromise<void>>;
    tabs: ng.IChangesObject<PipTab[]>;
    showTabs: ng.IChangesObject<() => ng.IPromise<void>>;
    showTabsShadow: ng.IChangesObject<() => ng.IPromise<void>>;
    activeIndex: ng.IChangesObject<number>;
    select: ng.IChangesObject<() => ng.IPromise<void>>;
    breakpoints: ng.IChangesObject<string>;
    themeClass: ng.IChangesObject<string>;
}
class TabsDirectiveController implements ITabsBindings {
    private _element;
    private _injector;
    private _log;
    private _rootScope;
    private _pipTranslate;
    private _pipTheme;
    private _pipMedia;
    private _timeout;
    private _navConstant;
    private selectedTabId;
    ngDisabled: Function;
    tabs: PipTab[];
    activeIndex: number;
    breakpoints: string;
    showTabs: Function;
    showTabsShadow: Function;
    select: Function;
    themeClass: string;
    media: any;
    currentTheme: string;
    change: () => ng.IPromise<any>;
    constructor($element: ng.IAugmentedJQuery, $injector: ng.auto.IInjectorService, $log: ng.ILogService, $rootScope: ng.IRootScopeService, $mdMedia: angular.material.IMedia, $timeout: ng.ITimeoutService, navConstant: any);
    private setTheme();
    private setMedia($mdMedia);
    private setTranslate();
    isDisabled(): boolean;
    tabDisabled(index: number): boolean;
    onSelect(index: number): void;
    showShadow(): boolean;
    show(): boolean;
    toBoolean(value: any): boolean;
    $onChanges(changes: TabsChanges): void;
}
const Tabs: ng.IComponentOptions;

}
