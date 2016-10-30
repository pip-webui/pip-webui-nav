'use strict';

import { SearchConfig } from './SearchService';
import { SearchService } from './SearchService';

export interface ISearchProvider extends ng.IServiceProvider {    
}

export class SearchProvider implements ISearchProvider {
    private _config: SearchConfig = new SearchConfig();
    private _service: SearchService = null;

    public $get($rootScope: ng.IRootScopeService) {
        "ngInject";

        if (this._service == null)
            this._service = new SearchService(this._config, $rootScope);

        return this._service;
    } 
}
