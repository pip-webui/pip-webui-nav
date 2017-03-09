

import { SimpleActionItem } from '../actions/ActionsService';
export let BreadcrumbChangedEvent = "pipBreadcrumbChanged";
export let BreadcrumbBackEvent = "pipBreadcrumbBack";

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

class BreadcrumbService implements IBreadcrumbService {
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

        this.sendConfigEvent();
    }

    public get items(): BreadcrumbItem[] {
        return this._config.items;
    }

    public set items(value: BreadcrumbItem[]) {
        this._config.text = null;
        this._config.items = value;

        this.sendConfigEvent();
    }

    public get criteria(): string {
        return this._config.criteria;
    }

    public set criteria(value: string) {
        this._config.criteria = value;
        this.sendConfigEvent();
    }

    public showText(text: string, criteria?: string): void {
        this._config.text = text;
        this._config.items = null;
        this._config.criteria = criteria;
        this.sendConfigEvent();
    }

    public showItems(items: BreadcrumbItem[], criteria?: string): void {
        this._config.items = items || [];
        this._config.text = null;
        this._config.criteria = criteria;
        this.sendConfigEvent();
    }

    public sendConfigEvent() {
        this._rootScope.$broadcast(BreadcrumbChangedEvent, this._config);
    }
}


class BreadcrumbProvider implements IBreadcrumbProvider {
    private _config: BreadcrumbConfig = { 
        text: null,
        items: null,
        criteria: null
    };
    private _service: BreadcrumbService;

    public get text(): string {
        return this._config.text;
    }

    public set text(value: string) {
        this._config.text = value;
    }

    public $get($rootScope: ng.IRootScopeService): any {
        "ngInject";

        if (this._service == null)
            this._service = new BreadcrumbService(this._config, $rootScope);

        return this._service;
    }
}


angular.module('pipBreadcrumb')
    .provider('pipBreadcrumb', BreadcrumbProvider);
