'use strict';

export let BreadcrumbChangedEvent = "pipBreadcrumbChanged";
export let BreadcrumbBackEvent = "pipBreadcrumbBack";

export class BreadcrumbItem {
    title: string;
    click: (item: BreadcrumbItem) => void;

    public constructor(title: string = null, click: (item: BreadcrumbItem) => void = null) {
        this.title = title;
        this.click = click;
    }
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
    private _config: BreadcrumbConfig;
    private _rootScope: ng.IRootScopeService;

    public constructor(
        config: BreadcrumbConfig,
        $rootScope: ng.IRootScopeService
    ) {
        this._config = config;
        this._rootScope = $rootScope;
    }

    public get config() {
        return this._config;
    }

    public get text(): string {
        return this._config.text;
    }

    public set text(value: string) {
        this._config.text = value;
        this._config.items = null;

        this.sendEvent();
    }

    public get items(): BreadcrumbItem[] {
        return this._config.items;
    }

    public set items(value: BreadcrumbItem[]) {
        this._config.text = null;
        this._config.items = value;

        this.sendEvent();
    }

    public get criteria(): string {
        return this._config.criteria;
    }

    public set criteria(value: string) {
        this._config.criteria = value;
        this.sendEvent();
    }

    public sendEvent() {
        this._rootScope.$broadcast(BreadcrumbChangedEvent, this._config);
    }
}

