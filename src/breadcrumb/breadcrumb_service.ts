/// <reference path="../../typings/tsd.d.ts" />

module pip.nav {

    export let BreadcrumbChangedEvent = "pipBreadcrumbChanged";

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
            this._rootScope.$broadcast(pip.nav.BreadcrumbChangedEvent, this._config);
        }
    }

    class BreadcrumbProvider implements IBreadcrumbProvider {
        private _config: BreadcrumbConfig = { 
            text: null,
            items: null,
            criteria: null
        };
        private _service: IBreadcrumbService;

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

    angular
        .module('pipBreadcrumb.Service', [])
        .provider('pipBreadcrumb', BreadcrumbProvider);

}
