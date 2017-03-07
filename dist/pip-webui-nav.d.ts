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


class PrimaryActionsController {
    private _element;
    private _attrs;
    private _injector;
    private _scope;
    private _log;
    private _rootScope;
    private _window;
    private _location;
    private _pipActions;
    private _pipTranslate;
    config: pip.nav.ActionsConfig;
    constructor($element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, $injector: ng.auto.IInjectorService, $scope: angular.IScope, $log: ng.ILogService, $rootScope: ng.IRootScopeService, $window: ng.IWindowService, $location: ng.ILocationService, pipActions: pip.nav.IActionsService);
    private onActionsChanged(event, config);
    isHidden(action: pip.nav.ActionItem): boolean;
    actionCount(action: pip.nav.ActionItem): string;
    clickAction(action: pip.nav.ActionItem, $mdOpenMenu: Function): void;
}

class SecondaryActionsController {
    private _element;
    private _attrs;
    private _injector;
    private _scope;
    private _log;
    private _rootScope;
    private _window;
    private _location;
    private _pipActions;
    private _pipTranslate;
    private _menuFn;
    config: pip.nav.ActionsConfig;
    constructor($element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, $injector: ng.auto.IInjectorService, $scope: angular.IScope, $log: ng.ILogService, $rootScope: ng.IRootScopeService, $window: ng.IWindowService, $location: ng.ILocationService, pipActions: pip.nav.IActionsService);
    getMenu(menuFn: Function): void;
    onActionsMenuOpen(): void;
    openMenu($mdOpenMenu: Function, ev: ng.IAngularEvent): void;
    private onActionsChanged(event, config);
    isHidden(action: pip.nav.ActionItem): boolean;
    actionCount(action: pip.nav.ActionItem): string;
    private calcActions(actions);
    secondaryActionsVisible(): boolean;
    secondaryDividerVisible(): boolean;
    clickAction(action: pip.nav.ActionItem, $mdOpenMenu: Function): void;
}

class AppBarDirectiveController {
    config: pip.nav.AppBarConfig;
    constructor($element: ng.IAugmentedJQuery, $scope: angular.IScope, $log: ng.ILogService, $rootScope: ng.IRootScopeService, pipAppBar: pip.nav.IAppBarService);
    onAppBarChanged(event: ng.IAngularEvent, config: pip.nav.AppBarConfig): void;
}

class AppBarPartDirectiveController {
    private _scope;
    private _partName;
    private _partValue;
    constructor($element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, $scope: ng.IScope, $log: ng.ILogService, $rootScope: ng.IRootScopeService, pipAppBar: pip.nav.IAppBarService);
    private onAppBarChanged(event, config);
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


let currentTheme: string;
class DropdownDirectiveController {
    private _element;
    private _attrs;
    private _injector;
    private _scope;
    private _log;
    private _rootScope;
    private _pipTranslate;
    private _pipTheme;
    private _pipMedia;
    private _timeout;
    themeClass: string;
    media: any;
    actions: any;
    activeIndex: number;
    selectedIndex: number;
    constructor($element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, $injector: ng.auto.IInjectorService, $scope: angular.IScope, $log: ng.ILogService, $rootScope: ng.IRootScopeService, $mdMedia: angular.material.IMedia, $timeout: ng.ITimeoutService);
    disabled(): boolean;
    onSelect(index: number): void;
    show(): boolean;
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


export let OpenSideNavEvent: string;
export let NavIconClickedEvent: string;

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

class LanguagePickerDirectiveController {
    private _element;
    private _attrs;
    private _injector;
    private _scope;
    private _log;
    private _rootScope;
    private _translate;
    private _timeout;
    languages: string[];
    selectedLanguage: string;
    constructor($element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, $injector: ng.auto.IInjectorService, $scope: ng.IScope, $log: ng.ILogService, $rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService);
    readonly language: string;
    setLanguages(languages: string[]): void;
    onLanguageClick(language: string): void;
}



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
