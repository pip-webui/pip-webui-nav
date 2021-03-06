import { SearchConfig } from './SearchConfig';
import { ISearchProvider, ISearchService } from './ISearchService';

export const OpenSearchEvent = 'pipOpenSearch';
export const CloseSearchEvent = 'pipCloseSearch';
export const SearchChangedEvent = 'pipSearchChanged';
export const SearchActivatedEvent = 'pipSearchActivated';

class SearchService implements ISearchService {
    private _config: SearchConfig;

    public constructor(
        config: SearchConfig,
        private $rootScope: ng.IRootScopeService
    ) {
        this._config = config;

        $rootScope.$on(OpenSearchEvent, () => { this.open });
        $rootScope.$on(CloseSearchEvent, () => { this.close });
    }

    public get config(): SearchConfig {
        return this._config;
    }

    public get criteria(): string {
        return this._config.criteria;
    }

    public set criteria(value: string) {
        this._config.criteria = value;
        this.sendConfigEvent();
    }

    public get params(): any {
        return this._config.params;
    }

    public set params(value: any) {
        this._config.params = value;
        this.sendConfigEvent();
    }

    public get history(): string[] {
        return this._config.history;
    }

    public set history(value: string[]) {
        this._config.history = value;
        this.sendConfigEvent();
    }

    public get callback(): (criteria: string) => void {
        return this._config.callback;
    }

    public set callback(value: (criteria: string) => void) {
        this._config.callback = value;
        this.sendConfigEvent();
    }

    public set(callback: (criteria: string) => void, criteria?: string, params?: any, history?: string[]): void {
        this._config.callback = callback;
        this._config.criteria = criteria;
        this._config.params = params;
        this._config.history = history;
        this.sendConfigEvent();
    }

    public clear(): void {
        this._config.callback = null;
        this._config.criteria = null;
        this._config.params = null;
        this.sendConfigEvent();
    }

    public open(): void {
        this._config.visible = true;
        this.sendConfigEvent();
    }

    public close(): void {
        this._config.visible = false;
        this.sendConfigEvent();
    }

    public toggle(): void {
        this._config.visible = !this._config.visible;
        this.sendConfigEvent();
    }

    private sendConfigEvent(): void {
        this.$rootScope.$broadcast(SearchChangedEvent, this._config);
    }
}

class SearchProvider implements ISearchProvider {
    private _config: SearchConfig = new SearchConfig();
    private _service: SearchService = null;

    public $get($rootScope: ng.IRootScopeService) {
        "ngInject";

        if (this._service == null)
            this._service = new SearchService(this._config, $rootScope);

        return this._service;
    }
}


angular.module('pipSearchBar')
    .provider('pipSearch', SearchProvider);
