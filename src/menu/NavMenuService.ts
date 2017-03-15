import { NavMenuConfig, NavMenuSection } from './NavMenuConfig';
import { INavMenuService, INavMenuProvider } from './INavMenuService';

export const NavMenuChangedEvent: string = 'pipNavMenuChanged';

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
