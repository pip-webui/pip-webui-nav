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

    show(parts?: any, classes?: string[], shadowBreakpoints?: string[]): void;
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

    public show(parts?: any, classes?: string[], shadowBreakpoints?: string[]): void {
        this._config.visible = true;
        this._config.parts = parts || this._config.parts || {};
        this._config.classes = classes || this._config.classes || [];
        if (shadowBreakpoints) {
            this.setShadow(shadowBreakpoints); 
        }
        this.sendConfigEvent();
    }

    public hide(): void {
        this._config.visible = false;
        this.sendConfigEvent();
    }

    private hideShadow(): void {
        this._config.classes = _.reject(this._config.classes, (c) => c.startsWith('pip-shadow'));
    }

    private setShadow(breakpoints: string[]): void {
        this.hideShadow();

        if (breakpoints != null && breakpoints.length > 0) {
            _.each(breakpoints, (bp) => {
                this._config.classes.push('pip-shadow-' + bp);
            });
        } else {
            this._config.classes.push('pip-shadow');
        }
    }

    public addShadow(...breakpoints: string[]): void {
        this.setShadow(breakpoints);
        this.sendConfigEvent();
    }

    public removeShadow(): void {
        this.hideShadow();
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
            this._config.classes = _.reject(this._config.classes, (cc) => cc == c);
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
            this._config.classes = _.reject(this._config.classes, (cc) => cc == c);
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
