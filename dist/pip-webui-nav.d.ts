
declare module pip.nav {
}



declare module pip.nav {
    interface INavService {
        appBar: any;
        navIcon: any;
        breadcrumb: IBreadcrumbService;
        actions: any;
        search: any;
        sideNav: any;
        navHeader: any;
        navMenu: any;
    }
}















declare module pip.nav {
}


declare module pip.nav {
    let BreadcrumbChangedEvent: string;
    let BreadcrumbBackEvent: string;
    class BreadcrumbItem {
        title: string;
        click: () => void;
    }
    class BreadcrumbConfig {
        text: string;
        items: BreadcrumbItem[];
        criteria: string;
    }
    interface IBreadcrumbService {
        config: BreadcrumbConfig;
        text: string;
        items: BreadcrumbItem[];
        criteria: string;
    }
    interface IBreadcrumbProvider extends ng.IServiceProvider {
        text: string;
    }
}






declare module pip.nav {
}






























