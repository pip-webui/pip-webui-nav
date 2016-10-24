/// <reference path="../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />
<<<<<<< HEAD

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />
declare module pip.nav {
}

/// <reference path="../../typings/tsd.d.ts" />
=======
>>>>>>> 2a3b4033e4498340dff680edd8b82714f224dda6
declare module pip.nav {
    let BreadcrumbChangedEvent: string;
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

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="../../typings/tsd.d.ts" />
