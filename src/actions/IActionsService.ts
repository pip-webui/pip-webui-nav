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
    public subActions?: SimpleActionItem[];
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