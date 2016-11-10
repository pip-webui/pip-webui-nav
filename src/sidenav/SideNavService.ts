'use strict';

export let SideNavChangedEvent = 'pipSideNavChanged';
export let SideNavStateChangedEvent = 'pipSideNavStateChanged';
export let OpenSideNavEvent = 'pipOpenSideNav';
export let CloseSideNavEvent = 'pipCloseSideNav';

export class SideNavConfig {
    parts: any;
    classes: string[];
    state: any;
    type: string;
    visible: boolean;
} 

export interface ISideNavService {
    readonly config: SideNavConfig;
    readonly classes: string[];
    parts: any;
    state: any;    

    open(): void;
    close(): void;
    toggle(): void;
    show(): void;
    hide(): void;
  
    addClass(...classes: string[]): void;
    removeClass(...classes: string[]): void;
 
    part(part: string, value: any): void;
}

export interface ISideNavProvider extends ng.IServiceProvider {
    config: SideNavConfig;
    parts: any;
    type: string;
    visible: boolean;
    classes: string[];

    addClass(...classes: string[]): void;
    removeClass(...classes: string[]): void;

    part(part: string, value: any): void;
}

class SideNavService implements ISideNavService {
    private _config: SideNavConfig;
    private _state: any;
    private _rootScope: ng.IRootScopeService;
    private _sidenav: ng.material.ISidenavService;
    private id = 'pip-sticky-sidenav';

    public constructor(config: SideNavConfig, $rootScope: ng.IRootScopeService, $mdSidenav: ng.material.ISidenavService) {
        this._config = config;
        this._rootScope = $rootScope;
        this._sidenav = $mdSidenav;
    }

    public get config(): SideNavConfig {
        return this._config;
    }

    public get classes(): string[] {
        return this._config.classes;
    }

    public get parts(): any {
        return this._config.parts;
    }

    public set parts(value: any) {
        this._config.parts = value || {};
        this.sendConfigEvent();
    }

    public get state(): any {
        return this._state;
    }

    public set state(value: any) {
        this._state = value || {};
        this._rootScope.$broadcast(SideNavStateChangedEvent, value);
    }

    public open() {
        this._sidenav(this.id).open();
    }
            
    public close() {
        this._sidenav(this.id).close();
    }

    public toggle() {
        this._sidenav(this.id).toggle();
    }

    public show() {
        if (!this._config.visible) {
            this._config.visible = true;
            this.sendConfigEvent();
        }
    }

    public hide() {
        if (this._config.visible) {
            this._config.visible = false;
            this.sendConfigEvent();
        }
    }

    public addClass(...classes: string[]): void {
        _.each(classes, (c) => {
            this._config.classes.push(c);
        });
        this.sendConfigEvent();
    }

    public removeClass(...classes: string[]): void {
        _.each(classes, (c) => {
            this._config.classes = _.reject(this._config.classes, (cc) => cc == c);
        });
        this.sendConfigEvent();
    }
 
    public part(part: string, value: any): void {
        this._config.parts[part] = value;
        this.sendConfigEvent();
    }

    private sendConfigEvent() {
        this._rootScope.$emit(SideNavChangedEvent, this._config);
    }
}

class SideNavProvider implements ISideNavProvider {
    private _config: SideNavConfig = {
        parts: {},
        classes: [],
        type: 'sticky',
        state: null,
        visible: true
    };

    private _service: SideNavService;

    public get config(): SideNavConfig {
        return this._config;
    }

    public set config(value: SideNavConfig) {
        this._config = value || new SideNavConfig();
    }

    public get parts(): any {
        return this._config.parts;
    }

    public set parts(value: any) {
        this._config.parts = value || {};
    }

    public get type(): string {
        return this._config.type;
    }

    public set type(value: string) {
        this._config.type = value;
    }

    public get visible(): boolean {
        return this._config.visible;
    }

    public set visible(value: boolean) {
        this._config.visible = value;
    }

    public get classes(): string[] {
        return this._config.classes;
    }

    public set classes(value: string[]) {
        this._config.classes = value || [];
    }

    public addClass(...classes: string[]): void {
        _.each(classes, (c) => {
            this._config.classes.push(c);
        });
    }

    public removeClass(...classes: string[]): void {
        _.each(classes, (c) => {
            this._config.classes = _.reject(this._config.classes, (cc) => cc == c);
        });
    }
 
    public part(part: string, value: any): void {
        this._config.parts[part] = value;
    }

    public $get($rootScope: ng.IRootScopeService, $mdSidenav: ng.material.ISidenavService) {
        "ngInject";

        if (this._service == null)
            this._service = new SideNavService(this._config, $rootScope, $mdSidenav);

        return this._service;
    }     
}

function hookSideNavEvents($rootScope: ng.IRootScopeService, pipSideNav: ISideNavService) {
    $rootScope.$on(OpenSideNavEvent, () => { pipSideNav.open(); });
    $rootScope.$on(CloseSideNavEvent, () => { pipSideNav.close(); });
}

angular
    .module('pipSideNav')
    .provider('pipSideNav', SideNavProvider)
    .run(hookSideNavEvents);
