/// <reference path="../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />
<<<<<<< HEAD
=======

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />
>>>>>>> c89c5abba05e6c3749968b3db77dda0ae808d792
/// <reference path="breadcrumb_service.d.ts" />
declare module pip.nav {
}

/// <reference path="../../typings/tsd.d.ts" />
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

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />
<<<<<<< HEAD

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />
=======
>>>>>>> c89c5abba05e6c3749968b3db77dda0ae808d792
declare module pip.nav {
}

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />
