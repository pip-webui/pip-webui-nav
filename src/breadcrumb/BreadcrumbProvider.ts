'use strict';

import { BreadcrumbConfig } from './BreadcrumbService';
import { BreadcrumbService } from './BreadcrumbService';

export interface IBreadcrumbProvider extends ng.IServiceProvider {
    text: string;
}

export class BreadcrumbProvider implements IBreadcrumbProvider {
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
