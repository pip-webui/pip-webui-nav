
declare module pip.nav {
}



declare module pip.nav {
    interface INavService {
        appBar: any;
        sideNav: any;
        navIcon: any;
        breadcrumb: IBreadcrumbService;
        actions: any;
        navHeader: any;
        navMenu: any;
        search: any;
    }
}















<<<<<<< HEAD
/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="breadcrumb_service.d.ts" />
=======
>>>>>>> 56c0f0b80b99764f69fd98cbcecc24beea46ec74
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

<<<<<<< HEAD
/// <reference path="../../typings/tsd.d.ts" />
declare module pip.nav {
}

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />
=======
>>>>>>> 56c0f0b80b99764f69fd98cbcecc24beea46ec74


<<<<<<< HEAD
/// <reference path="../../typings/tsd.d.ts" />
=======



declare module pip.nav {
}
>>>>>>> 56c0f0b80b99764f69fd98cbcecc24beea46ec74
























