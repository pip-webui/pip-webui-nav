export const ActionsChangedEvent: string = 'pipActionsChanged';
export const SecondaryActionsOpenEvent: string = 'pipSecondaryActionsOpen';

export class SimpleActionItem {
    // Name to refer to the item
    public name: string;
    // Link visible title
    public title?: string;
    // Show divider instead of title
    public divider?: boolean;
    // Icon name from $iconProvider
    public icon?: string;
    // Counter badge
    public count?: number;
    // Access function
    public access?: (action: SimpleActionItem) => boolean;
    // Show on specified breakpoints
    public breakpoints?: string[];
    // window.location.href
    public href?: string;
    // $location.url
    public url?: string;
    // $state.go(state, stateParams)
    public state?: string;
    // Parameters for $state.go(state, stateParams)
    public stateParams?: any;
    // $rootScope.broadcast(event)
    public event?: string;
    // Click callback
    public click?: (action: SimpleActionItem) => void;
}

export class ActionItem extends SimpleActionItem {
    public subActions: SimpleActionItem[];
}

export class ActionsConfig {
    // Primary global actions visible on the screen
    public primaryGlobalActions: ActionItem[] = [];
    // Primary local actions visible on the screen
    public primaryLocalActions: ActionItem[] = [];

    // Secondary global actions available in popup
    public secondaryGlobalActions: ActionItem[] = [];
    // Secondary local actions available in popup
    public secondaryLocalActions: ActionItem[]= [];
}

export interface IActionsService {
    readonly config: ActionsConfig;

    primaryGlobalActions: ActionItem[];
    primaryLocalActions: ActionItem[];
    secondaryGlobalActions: ActionItem[];
    secondaryLocalActions: ActionItem[];    

    show(primaryActions?: ActionItem[], secondaryActions?: ActionItem[]): void;
    hide(): void;
    updateCount(link: string, count: number): void; 
    clearCounts(): void;
    openMenuEvent(): void;
}

export interface IActionsProvider extends ng.IServiceProvider {
    config: ActionsConfig;
    
    primaryGlobalActions: ActionItem[];
    primaryLocalActions: ActionItem[];
    secondaryGlobalActions: ActionItem[];
    secondaryLocalActions: ActionItem[];    
}

class ActionsService implements IActionsService {
    private _config: ActionsConfig;
    private _rootScope: ng.IRootScopeService;

    public constructor(
        config: ActionsConfig,
        $rootScope: ng.IRootScopeService
    ) {
        this._config = config;
        this._rootScope = $rootScope;
    }

    public get config(): ActionsConfig {
        return this._config;
    }

    public get primaryGlobalActions(): ActionItem[] {
        return this._config.primaryGlobalActions;
    }

    public set primaryGlobalActions(value: ActionItem[]) {
        this._config.primaryGlobalActions = value || [];
        this.sendChangeEvent();
    }

    public get secondaryGlobalActions(): ActionItem[] {
        return this._config.secondaryGlobalActions;
    }

    public set secondaryGlobalActions(value: ActionItem[]) {
        this._config.secondaryGlobalActions = value || [];
        this.sendChangeEvent();
    }

    public get primaryLocalActions(): ActionItem[] {
        return this._config.primaryLocalActions;
    }

    public set primaryLocalActions(value: ActionItem[]) {
        this._config.primaryLocalActions = value || [];
        this.sendChangeEvent();
    }

    public get secondaryLocalActions(): ActionItem[] {
        return this._config.secondaryLocalActions;
    }

    public set secondaryLocalActions(value: ActionItem[]) {
        this._config.secondaryLocalActions = value || [];
        this.sendChangeEvent();
    }

    public show(primaryActions?: ActionItem[], secondaryActions?: ActionItem[]): void {
        this._config.primaryLocalActions = primaryActions || [];
        this._config.secondaryLocalActions = secondaryActions || [];
        this.sendChangeEvent();
    }

    public hide(): void {
        this._config.primaryLocalActions = [];
        this._config.secondaryLocalActions = [];
        this.sendChangeEvent();
    }

    public updateCount(action: string, count: number) {
        if (action == null || !_.isNumber(count)) return;

        _.each(this._config.primaryGlobalActions, (a) => {
            if (a.name == action)
                a.count = count;
        });
        _.each(this._config.primaryLocalActions, (a) => {
            if (a.name == action)
                a.count = count;
        });

        this.sendChangeEvent();
    }

    public clearCounts(): void {
        _.each(this._config.primaryGlobalActions, (a) => {
            a.count = null;
        });
        _.each(this._config.primaryLocalActions, (a) => {
            a.count = null;
        });

        this.sendChangeEvent();
    }

    private sendChangeEvent() {
        this._rootScope.$emit(ActionsChangedEvent, this._config);
    }

    public openMenuEvent(): void {
        this._rootScope.$emit(SecondaryActionsOpenEvent);
    }
}

class ActionsProvider implements IActionsProvider {
    private _config: ActionsConfig = new ActionsConfig();
    private _service: ActionsService;

    public get config(): ActionsConfig {
        return this._config;
    }

    public set config(value: ActionsConfig) {
        this._config = value || new ActionsConfig();
    }

    public get primaryGlobalActions(): ActionItem[] {
        return this._config.primaryGlobalActions;
    }

    public set primaryGlobalActions(value: ActionItem[]) {
        this._config.primaryGlobalActions = value || [];
    }

    public get secondaryGlobalActions(): ActionItem[] {
        return this._config.secondaryGlobalActions;
    }

    public set secondaryGlobalActions(value: ActionItem[]) {
        this._config.secondaryGlobalActions = value || [];
    }

    public get primaryLocalActions(): ActionItem[] {
        return this._config.primaryLocalActions;
    }

    public set primaryLocalActions(value: ActionItem[]) {
        this._config.primaryLocalActions = value || [];
    }

    public get secondaryLocalActions(): ActionItem[] {
        return this._config.secondaryLocalActions;
    }

    public set secondaryLocalActions(value: ActionItem[]) {
        this._config.secondaryLocalActions = value || [];
    }

    public $get($rootScope) {
        "ngInject";

        if (this._service == null)
            this._service = new ActionsService(this._config, $rootScope);
        
        return this._service;
    }
}

angular
    .module('pipActions')
    .provider('pipActions', ActionsProvider);

