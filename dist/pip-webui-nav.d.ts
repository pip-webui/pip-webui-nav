declare module pip {



export interface INavService {
    appBar: any;
    navIcon: any;
    breadcrumb: IBreadcrumbService;
    actions: any;
    search: ISearchService;
    sideNav: any;
    navHeader: any;
    navMenu: any;
}
export class NavService implements INavService {
    constructor($injector: any);
    appBar: any;
    navIcon: any;
    breadcrumb: IBreadcrumbService;
    actions: any;
    search: ISearchService;
    sideNav: any;
    navHeader: any;
    navMenu: any;
}

var thisModule: ng.IModule;














export class BreadcrumbController {
    private _rootScope;
    private _window;
    config: BreadcrumbConfig;
    constructor($element: any, $rootScope: ng.IRootScopeService, $window: ng.IWindowService, $state: ng.ui.IStateService, pipBreadcrumb: IBreadcrumbService);
    private onBreadcrumbChanged(event, config);
    private onBreadcrumbBack();
    onClick(item: BreadcrumbItem): void;
    openSearch(): void;
}


export function breadcrumbDirective(): {
    restrict: string;
    scope: {};
    replace: boolean;
    templateUrl: string;
    controller: typeof BreadcrumbController;
    controllerAs: string;
};


export interface IBreadcrumbProvider extends ng.IServiceProvider {
    text: string;
}
export class BreadcrumbProvider implements IBreadcrumbProvider {
    private _config;
    private _service;
    text: string;
    $get($rootScope: ng.IRootScopeService): any;
}

export let BreadcrumbChangedEvent: string;
export let BreadcrumbBackEvent: string;
export class BreadcrumbItem {
    title: string;
    click: (item: BreadcrumbItem) => void;
    constructor(title?: string, click?: (item: BreadcrumbItem) => void);
    withClick(click: (item: BreadcrumbItem) => void): BreadcrumbItem;
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
}
export class BreadcrumbService implements IBreadcrumbService {
    private _config;
    private _rootScope;
    constructor(config: BreadcrumbConfig, $rootScope: ng.IRootScopeService);
    readonly config: BreadcrumbConfig;
    text: string;
    items: BreadcrumbItem[];
    criteria: string;
    sendEvent(): void;
}

function translateFilter($injector: any): (key: any) => any;




module pip.nav {
}











export class SearchBarController {
    private _rootScope;
    config: SearchConfig;
    enabled: boolean;
    search: any;
    constructor($element: any, $rootScope: ng.IRootScopeService, pipSearch: ISearchService);
    private onSearchChanged(event, config);
    private focusText();
    enable(): void;
    onClick(): void;
    clear(): void;
    onKeyDown(event: any): void;
}


export function searchBarDirective(): {
    restrict: string;
    scope: {};
    replace: boolean;
    templateUrl: string;
    controller: typeof SearchBarController;
    controllerAs: string;
};



export interface ISearchProvider extends ng.IServiceProvider {
}
export class SearchProvider implements ISearchProvider {
    private _config;
    private _service;
    $get($rootScope: ng.IRootScopeService): SearchService;
}

export let OpenSearchEvent: string;
export let CloseSearchEvent: string;
export let SearchChangedEvent: string;
export let SearchActivatedEvent: string;
export class SearchConfig {
    visible: boolean;
    criteria: string;
    history: string[];
    callback: (criteria: string) => void;
}
export interface ISearchService {
    config: SearchConfig;
    set(callback: (criteria: string) => void, criteria?: string, history?: string[]): void;
    criteria(value: string): void;
    history(history: string[]): void;
    clear(): void;
    open(): void;
    close(): void;
    toggle(): void;
}
export class SearchService implements ISearchService {
    private _config;
    private _rootScope;
    constructor(config: SearchConfig, $rootScope: ng.IRootScopeService);
    readonly config: SearchConfig;
    set(callback: (criteria: string) => void, criteria?: string, history?: string[]): void;
    clear(): void;
    open(): void;
    close(): void;
    toggle(): void;
    criteria(value: string): void;
    history(history: string[]): void;
    private sendConfigEvent();
}



















}
