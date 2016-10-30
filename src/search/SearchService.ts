'use strict';

export let OpenSearchEvent = 'pipOpenSearch';
export let CloseSearchEvent = 'pipCloseSearch';
export let SearchChangedEvent = 'pipSearchChanged';
export let SearchActivatedEvent = 'pipSearchActivated';

export class SearchConfig {
    // Search visible
    public visible: boolean;
    // Search criteria
    public criteria: string;
    // History for search autocomplete
    public history: string[];
    // Callback for search
    callback: (criteria: string) => void;
}

export interface ISearchService {
    config: SearchConfig;

    set(callback: (criteria: string) => void, criteria?: string, history?: string[]): void;
    criteria(value: string): void;
    history(history: string[]): void;

    clear(): void;
    open(): void;
    close(): void;
    toggle(): void;
}

export class SearchService implements ISearchService {
    private _config: SearchConfig;
    private _rootScope: ng.IRootScopeService;

    public constructor(
        config: SearchConfig,
        $rootScope: ng.IRootScopeService
    ) {
        this._config = config;
        this._rootScope = $rootScope;

        $rootScope.$on(OpenSearchEvent, () => { this.open });
        $rootScope.$on(CloseSearchEvent, () => { this.close });
    }

    public get config(): SearchConfig {
        return this._config;
    }

    public set(callback: (criteria: string) => void, criteria?: string, history?: string[]): void {
        this._config.callback = callback;
        this._config.criteria = criteria;
        this._config.history = history;
        this.sendConfigEvent();
    }

    public clear(): void {
        this._config.callback = null;
        this._config.criteria = null;
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

    public criteria(value: string): void {
        this._config.criteria = value;
        this.sendConfigEvent();
    }

    public history(history: string[]): void {
        this._config.history = history;
        this.sendConfigEvent();
    }

    private sendConfigEvent(): void {
        this._rootScope.$broadcast(SearchChangedEvent, this._config);
    }
}
