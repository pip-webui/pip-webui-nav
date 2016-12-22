'use strict';

export let NavMenuChangedEvent = 'pipNavMenuChanged';

export class NavMenuLink {
    // Name to refer to the item
    public name: string;
    // Link visible title
    public title: string;
    // Icon name from $iconProvider
    public icon?: string;
    // Counter badge
    public count?: number;
    // class for badge style
    public badgeStyle?: string;
    // Access function
    public access?: (link: NavMenuLink) => boolean;
    // window.location.href
    public href?: string;
    // $location.url
    public url?: string;
    // $state.go(state, stateParams)
    public state?: string;
    // Parameters for $state.go(state, stateParams)
    public stateParams?: any;
    // parent state or parent state for selection item 
    public parentState?: string;
    // $rootScope.broadcast(event)
    public event?: string;
    // Click callback
    public click?: (link: NavMenuLink) => void;
}

export class NavMenuSection {
    // Name to refer to the section
    public name: string;
    // Section visible title
    public title?: string;
    // Icon name from $iconProvider
    public icon?: string;
    // Links shown in the section
    public links: NavMenuLink[];
    // Access function
    public access?: (section: NavMenuSection) => boolean;
}

export class NavMenuConfig {
    sections: NavMenuSection[];
    defaultIcon: string;
}

export interface INavMenuService {
    sections: NavMenuSection[];
    defaultIcon: string;
    updateCount(link: string, count: number): void; 
    updateBadgeStyle(link: string, style: string): void;
    clearCounts(): void;
}

export interface INavMenuProvider extends ng.IServiceProvider {
    sections: NavMenuSection[];
    defaultIcon: string;
}

class NavMenuService implements INavMenuService {
    private _config: NavMenuConfig;
    private _rootScope: ng.IRootScopeService;

    public constructor(
        config: NavMenuConfig,
        $rootScope: ng.IRootScopeService
    ) {
        this._config = config;
        this._rootScope = $rootScope;
    }

    public get sections(): NavMenuSection[] {
        return this._config.sections;
    }

    public set sections(value: NavMenuSection[]) {
        this._config.sections = value || [];
        this.sendChangeEvent();
    }

    public get defaultIcon(): string {
        return this._config.defaultIcon;
    }

    public updateBadgeStyle(link: string, style: string): void {
        if (link == null || !_.isString(style)) return;

        _.each(this._config.sections, (s) => {
            _.each(s.links, (l) => {
                if (l.name == link)
                    l.badgeStyle = style;
            });
        });

        this.sendChangeEvent();
    }

    public set defaultIcon(value: string) {
        this._config.defaultIcon = value;
        this.sendChangeEvent();
    }

    public updateCount(link: string, count: number): void {
        if (link == null || !_.isNumber(count)) return;

        _.each(this._config.sections, (s) => {
            _.each(s.links, (l) => {
                if (l.name == link)
                    l.count = count;
            });
        });

        this.sendChangeEvent();
    }

    public clearCounts(): void {
        _.each(this._config.sections, (s) => {
            _.each(s.links, (l) => {
                l.count = null;
            });
        });

        this.sendChangeEvent();
    }

    private sendChangeEvent() {
        this._rootScope.$emit(NavMenuChangedEvent, this._config);
    }
}

class NavMenuProvider implements INavMenuProvider {
    private _config: NavMenuConfig = {
        sections: [],
        defaultIcon: 'icons:folder'
    };
    private _service: NavMenuService;

    public get sections(): NavMenuSection[] {
        return this._config.sections;
    }

    public set sections(value: NavMenuSection[]) {
        this._config.sections = value || [];
    }

    public get defaultIcon(): string {
        return this._config.defaultIcon;
    }

    public set defaultIcon(value: string) {
        this._config.defaultIcon = value;
    }

    public $get($rootScope) {
        "ngInject";

        if (this._service == null)
            this._service = new NavMenuService(this._config, $rootScope);
        
        return this._service;
    }
}

angular
    .module('pipNavMenu')
    .provider('pipNavMenu', NavMenuProvider);
