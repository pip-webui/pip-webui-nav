import { BreadcrumbItem, BreadcrumbConfig } from './BreadcrumbConfig';
import { IBreadcrumbService, IBreadcrumbProvider } from './IBreadcrumbService';

export const BreadcrumbChangedEvent: string = "pipBreadcrumbChanged";
export const BreadcrumbBackEvent: string = "pipBreadcrumbBack";

class BreadcrumbService implements IBreadcrumbService {
    private _config: BreadcrumbConfig;

    public constructor(
        private $rootScope: ng.IRootScopeService,
        config: BreadcrumbConfig
    ) {
        this._config = config;
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
        this.$rootScope.$broadcast(BreadcrumbChangedEvent, this._config);
    }
}


class BreadcrumbProvider implements IBreadcrumbProvider, ng.IServiceProvider {
    private _config: BreadcrumbConfig = new BreadcrumbConfig();
    private _service: BreadcrumbService;

    public get text(): string {
        return this._config.text;
    }

    public set text(value: string) {
        this._config.text = value;
    }

    public $get($rootScope: ng.IRootScopeService): IBreadcrumbService {
        "ngInject";

        if (this._service == null)
            this._service = new BreadcrumbService($rootScope, this._config);

        return this._service;
    }
}


angular.module('pipBreadcrumb')
    .provider('pipBreadcrumb', BreadcrumbProvider);
