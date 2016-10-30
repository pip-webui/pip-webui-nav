declare module pip {

module pip.nav {
}


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

var thisModule: ng.IModule;












export let BreadcrumbChangedEvent: string;
export let BreadcrumbBackEvent: string;
export class BreadcrumbItem {
    title: string;
    click: () => void;
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






module pip.nav {
}































}
