'use strict';

export let SideNavChangedEvent = 'pipSideNavChanged';
export let SideNavStateChangedEvent = 'pipSideNavStateChanged';
export let OpenSideNavEvent = 'pipOpenSideNav';
export let CloseSideNavEvent = 'pipCloseSideNav';

export class SideNavConfig {
    id: string;
    parts: any;
    classes: string[];
    state: any;
} 

export interface ISideNavService {
    readonly config: SideNavConfig;
    readonly classes: string[];
    id: string;
    parts: any;
    state: any;    

    open(): void;
    close(): void;
    toggle(): void;
  
    addClass(...classes: string[]): void;
    removeClass(...classes: string[]): void;
 
    part(part: string, value: any): void;
}

export interface ISideNavProvider extends ng.IServiceProvider {
    config: SideNavConfig;
    id: string;
    parts: any;
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

    public get id(): string {
        return this._config.id;
    }

    public set id(value: string) {
        this._config.id = value;
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
        console.log('SideNavStateChangedEvent send', value);
        this._rootScope.$emit(SideNavStateChangedEvent, value);
    }

    public open() {
        this._sidenav(this._config.id).open();
    }
            
    public close() {
        this._sidenav(this._config.id).close();
    }

    public toggle() {
        this._sidenav(this._config.id).toggle();
    }
  
    public addClass(...classes: string[]): void {
        _.each(classes, (c) => {
            this._config.classes.push(c);
        });
        this.sendConfigEvent();
    }

    public removeClass(...classes: string[]): void {
        _.each(classes, (c) => {
            this._config.classes = _.remove(this._config.classes, (cc) => cc == c);
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
        id: "pip-sidenav",
        parts: {},
        classes: [],
        state: null
    };
    private _service: SideNavService;

    public get config(): SideNavConfig {
        return this._config;
    }

    public set config(value: SideNavConfig) {
        this._config = value || new SideNavConfig();
    }

    public get id(): string {
        return this._config.id;
    }

    public set id(value: string) {
        this._config.id = value;
    }

    public get parts(): any {
        return this._config.parts;
    }

    public set parts(value: any) {
        this._config.parts = value || {};
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
            this._config.classes = _.remove(this._config.classes, (cc) => cc == c);
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
    $rootScope.$on(OpenSideNavEvent, pipSideNav.open);
    $rootScope.$on(CloseSideNavEvent, pipSideNav.close);
}

angular
    .module('pipSideNav')
    .provider('pipSideNav', SideNavProvider)
    .run(hookSideNavEvents);
