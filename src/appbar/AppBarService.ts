'use strict';

export let AppBarChangedEvent = 'pipAppBarChanged';

export class AppBarConfig {
    visible: boolean;
    parts: any;
    classes: string[];
} 

export interface IAppBarService {
    readonly config: AppBarConfig;
    readonly classes: string[];
    parts: any;

    show(): void;
    hide(): void;
 
    addShadow(...breakpoints: string[]): void;
    removeShadow(): void;
 
    addClass(...classes: string[]): void;
    removeClass(...classes: string[]): void;
 
    part(part: string, value: any): void;
}

export interface IAppBarProvider extends ng.IServiceProvider {
    config: AppBarConfig;
    parts: any;
    classes: string[];

    addClass(...classes: string[]): void;
    removeClass(...classes: string[]): void;

    part(part: string, value: any): void;
}

class AppBarService implements IAppBarService {
    private _config: AppBarConfig;
    private _rootScope: ng.IRootScopeService;

    public constructor(config: AppBarConfig, $rootScope: ng.IRootScopeService) {
        this._config = config;
        this._rootScope = $rootScope;
    }

    public get config(): AppBarConfig {
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

    public show(): void {
        this._config.visible = true;
        this.sendConfigEvent();
    }

    public hide(): void {
        this._config.visible = false;
        this.sendConfigEvent();
    }
 
    public addShadow(...breakpoints: string[]): void {
        this._config.classes = _.remove(this._config.classes, (c) => c.startsWith('pip-shadow'));

        this._config.classes.push('pip-shadow');
        _.each(breakpoints, (bp) => {
            this._config.classes.push('pip-shadow-' + bp);
        });

        this.sendConfigEvent();
    }

    public removeShadow(): void {
        this._config.classes = _.remove(this._config.classes, (c) => c.startsWith('pip-shadow'));
        this.sendConfigEvent();
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
        this._rootScope.$broadcast(AppBarChangedEvent, this._config);
    }
}

class AppBarProvider implements IAppBarProvider {
    private _config: AppBarConfig = {
        visible: true,
        parts: {},
        classes: []
    };
    private _service: AppBarService;

    public get config(): AppBarConfig {
        return this._config;
    }

    public set config(value: AppBarConfig) {
        this._config = value || new AppBarConfig();
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

    public $get($rootScope: ng.IRootScopeService) {
        "ngInject";

        if (this._service == null)
            this._service = new AppBarService(this._config, $rootScope);

        return this._service;
    }     
}

angular
    .module('pipAppBar')
    .provider('pipAppBar', AppBarProvider);
