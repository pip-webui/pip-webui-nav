declare module pip.nav {

export class ActionItem {
}
export class ActionsConfig {
    primaryGlobalActions: ActionItem[];
    primaryLocalActions: ActionItem[];
    secondaryGlobalActions: ActionItem[];
    secondaryLocalActions: ActionItem[];
}
export interface IActionService {
}
export interface IActionProvider extends ng.IServiceProvider {
}


function PrimaryActionsController($scope: any, $element: any, $attrs: any, $rootScope: any, $window: any, $location: any, $injector: any, pipActions: any): void;
function primaryActionsDirective(): {
    restrict: string;
    scope: {
        localActions: string;
        globalActions: string;
    };
    replace: boolean;
    templateUrl: (element: any, attr: any) => string;
    controller: ($scope: any, $element: any, $attrs: any, $rootScope: any, $window: any, $location: any, $injector: any, pipActions: any) => void;
};

function SecondaryActionsController($scope: any, $element: any, $attrs: any, $rootScope: any, $window: any, $location: any, $injector: any, pipActions: any): void;
function secondaryActionsDirective(): {
    restrict: string;
    scope: {
        title: string;
        showMenu: string;
        localActions: string;
        globalActions: string;
        partyAvatarUrl: string;
    };
    replace: boolean;
    templateUrl: string;
    controller: ($scope: any, $element: any, $attrs: any, $rootScope: any, $window: any, $location: any, $injector: any, pipActions: any) => void;
};

function AppBarDirectiveController($scope: any, $element: any, $rootScope: any, pipAppBar: any): void;
function appbarDirective(): {
    restrict: string;
    transclude: boolean;
    scope: boolean;
    templateUrl: string;
    controller: ($scope: any, $element: any, $rootScope: any, pipAppBar: any) => void;
};

function AppBarPartDirectiveController($scope: any, $element: any, $attrs: any, $rootScope: any, pipAppBar: any): void;
function appbarPartDirective(ngIfDirective: any): {
    transclude: any;
    priority: any;
    terminal: any;
    restrict: any;
    scope: boolean;
    link: ($scope: any, $element: any, $attrs: any) => void;
    controller: ($scope: any, $element: any, $attrs: any, $rootScope: any, pipAppBar: any) => void;
};

export interface IAppbarService {
}


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


export let BreadcrumbChangedEvent: string;
export let BreadcrumbBackEvent: string;
export class BreadcrumbItem {
    title: string;
    click: (item: BreadcrumbItem) => void;
    constructor(title?: string, click?: (item: BreadcrumbItem) => void);
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
export interface IBreadcrumbProvider extends ng.IServiceProvider {
    text: string;
}


function translateFilter($injector: any): (key: any) => any;

function DropdownDirectiveController($scope: any, $element: any, $attrs: any, $injector: any, $rootScope: any, $mdMedia: any): void;
function dropdownDirective(): {
    restrict: string;
    scope: {
        ngDisabled: string;
        actions: string;
        showDropdown: string;
        activeIndex: string;
        select: string;
    };
    templateUrl: string;
    controller: ($scope: any, $element: any, $attrs: any, $injector: any, $rootScope: any, $mdMedia: any) => void;
};


function NavIconDirectiveController($scope: any, $element: any, $attrs: any, $rootScope: any, $window: any, pipNavIcon: any): void;
function navIconDirective(): {
    restrict: string;
    scope: {
        type: string;
        imageUrl: string;
    };
    replace: boolean;
    templateUrl: string;
    controller: ($scope: any, $element: any, $attrs: any, $rootScope: any, $window: any, pipNavIcon: any) => void;
};

export interface INavIconService {
}
export interface INavIconProvider extends ng.IServiceProvider {
}


function NavHeaderDirectiveController($scope: any, $element: any, $rootScope: any, $timeout: any, pipNavHeader: any): void;
function navHeaderDirective(): {
    restrict: string;
    scope: {
        title: string;
        subtitle: string;
        imageUrl: string;
        imageCss: string;
    };
    replace: boolean;
    templateUrl: string;
    controller: ($scope: any, $element: any, $rootScope: any, $timeout: any, pipNavHeader: any) => void;
};

export interface INavHeaderService {
}
export interface INavHeaderProvider extends ng.IServiceProvider {
}

function StickyNavHeaderDirectiveController($scope: any, $element: any, $rootScope: any, $timeout: any, pipNavHeader: any): void;
function stickyNavHeaderDirective(): {
    restrict: string;
    scope: {
        title: string;
        subtitle: string;
        imageUrl: string;
        imageCss: string;
    };
    replace: boolean;
    templateUrl: string;
    controller: ($scope: any, $element: any, $rootScope: any, $timeout: any, pipNavHeader: any) => void;
};

class LanguagePickerDirectiveController {
    private _translate;
    private _timeout;
    constructor($scope: any, $element: any, $attrs: any, $rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService, $injector: any);
    languages: string[];
    readonly language: any;
    setLanguages(lang: any): void;
    onLanguageClick(language: any): void;
}
function languagePickerDirective(): {
    restrict: string;
    scope: {
        languages: string;
    };
    replace: boolean;
    templateUrl: (element: any, attr: any) => string;
    controller: typeof LanguagePickerDirectiveController;
    controllerAs: string;
};


function NavMenuDirectiveController($scope: any, $element: any, $rootScope: any, $window: any, $location: any, $timeout: any, $injector: any, pipSideNav: any, pipNavMenu: any): void;
function navMenuDirective(): {
    restrict: string;
    scope: {
        config: string;
    };
    replace: boolean;
    templateUrl: string;
    controller: ($scope: any, $element: any, $rootScope: any, $window: any, $location: any, $timeout: any, $injector: any, pipSideNav: any, pipNavMenu: any) => void;
};

export interface INavMenuService {
}
export interface INavMenuProvider extends ng.IServiceProvider {
}

function StickyNavMenuDirectiveController($scope: any, $element: any, $rootScope: any, $window: any, $location: any, $timeout: any, $injector: any, pipSideNav: any, pipNavMenu: any): void;
function stickyNavMenuDirective(): {
    restrict: string;
    scope: {
        config: string;
        collapsed: string;
    };
    replace: boolean;
    templateUrl: string;
    controller: ($scope: any, $element: any, $rootScope: any, $window: any, $location: any, $timeout: any, $injector: any, pipSideNav: any, pipNavMenu: any) => void;
};



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
export interface ISearchProvider extends ng.IServiceProvider {
}


function SideNavDirectiveController($scope: any, $element: any, $rootScope: any, pipSideNav: any): void;
function sidenavDirective(): {
    restrict: string;
    transclude: boolean;
    scope: boolean;
    templateUrl: string;
    controller: ($scope: any, $element: any, $rootScope: any, pipSideNav: any) => void;
};

function SideNavPartDirectiveController($scope: any, $element: any, $attrs: any, $rootScope: any, pipSideNav: any): void;
function sidenavPartDirective(ngIfDirective: any): {
    transclude: any;
    priority: any;
    terminal: any;
    restrict: any;
    scope: boolean;
    link: ($scope: any, $element: any, $attrs: any) => void;
    controller: ($scope: any, $element: any, $attrs: any, $rootScope: any, pipSideNav: any) => void;
};

export interface ISideNavService {
}
export interface ISideNavProvider extends ng.IServiceProvider {
}

function StickySideNavDirectiveController($scope: any, $element: any, $rootScope: any, $injector: any, $mdMedia: any, $timeout: any, pipSideNav: any): void;
function stickySideNavDirective(): {
    restrict: string;
    transclude: boolean;
    scope: boolean;
    templateUrl: string;
    controller: ($scope: any, $element: any, $rootScope: any, $injector: any, $mdMedia: any, $timeout: any, pipSideNav: any) => void;
};

function TabsDirectiveController($scope: any, $element: any, $attrs: any, $mdMedia: any, $injector: any, $rootScope: any): void;
function tabsDirective(): {
    restrict: string;
    scope: {
        ngDisabled: string;
        tabs: string;
        showTabs: string;
        showTabsShadow: string;
        activeIndex: string;
        select: string;
    };
    templateUrl: string;
    controller: ($scope: any, $element: any, $attrs: any, $mdMedia: any, $injector: any, $rootScope: any) => void;
};

}
