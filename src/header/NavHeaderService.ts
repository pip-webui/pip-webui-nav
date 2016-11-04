'use strict';

export let NavHeaderChangedEvent: 'pipNavHeaderChanged';

export class NavHeaderConfig {
    // Image url
    public imageUrl: string;
    // Image url
    public defaultImageUrl: string;
    // Title
    public title: string;
    // Subtitle
    public subtitle: string;
    // Handle header click event
    click: () => void;
    // Event name
    event: string
};

export interface INavHeaderService {
    readonly config: NavHeaderConfig;
    imageUrl: string;
    title: string;
    subtitle: string;
    click: () => void;
    event: string;

    show(title: string, subtitle: string, imageUrl: string, callbackOrEvent?: any): void;
    hide(): void;
}

export interface INavHeaderProvider extends ng.IServiceProvider {
    config: NavHeaderConfig;
    defaultImageUrl: string;
    imageUrl: string;
    title: string;
    subtitle: string;
    click: () => void;
    event: string;

    set(title: string, subtitle: string, imageUrl: string, callbackOrEvent?: any): void;
    clear(): void;
}

class NavHeaderService {
    private _config: NavHeaderConfig;
    private _rootScope: ng.IRootScopeService;

    public constructor(config: NavHeaderConfig, $rootScope: ng.IRootScopeService) {
        this._config = config;
        this._rootScope = $rootScope;
    }

    public get config(): NavHeaderConfig {
        return this._config;
    }

    public get title(): string {
        return this._config.title;
    }

    public set title(value: string) {
        this._config.title = value;
        this.sendConfigEvent();
    }

    public get subtitle(): string {
        return this._config.subtitle;
    }

    public set subtitle(value: string) {
        this._config.subtitle = value;
        console.log('set subtitle', value)
        this.sendConfigEvent();
    }

    public get imageUrl(): string {
        return this._config.imageUrl;
    }

    public set imageUrl(value: string) {
        this._config.imageUrl = value;
        this.sendConfigEvent();
    }

    public get click(): () => void {
        return this._config.click;
    }

    public set click(value: () => void) {
        this._config.click = value;
        this.sendConfigEvent();
    }

    public get event(): string {
        return this._config.event;
    }

    public set event(value: string) {
        this._config.event = value;
        this.sendConfigEvent();
    }

    public show(title: string, subtitle: string, imageUrl: string, callbackOrEvent?: any): void {
        this._config.title = title;
        this._config.subtitle = subtitle;
        this._config.imageUrl = imageUrl;

        if (_.isFunction(callbackOrEvent))
            this._config.click = callbackOrEvent;
        else this._config.click = null;

        if (_.isString(callbackOrEvent))
            this._config.event = callbackOrEvent;
        else this._config.event = null;

        this.sendConfigEvent();
    }

    public hide(): void {
        this._config.title = null;
        this._config.subtitle = null;
        this._config.imageUrl = null;
        this._config.click = null;
        this._config.event = null;
        this.sendConfigEvent();
    }

    private sendConfigEvent() {
        console.log('send pipNavHeaderChanged');
       this._rootScope.$broadcast(NavHeaderChangedEvent, this._config);
    }
}

class NavHeaderProvider implements INavHeaderProvider {
    private _config: NavHeaderConfig = new NavHeaderConfig();
    private _service: NavHeaderService;

    public get config(): NavHeaderConfig {
        return this._config;
    }

    public set config(value: NavHeaderConfig) {
        this._config = value || new NavHeaderConfig();
    }

    public get defaultImageUrl(): string {
        return this._config.defaultImageUrl;
    }

    public set defaultImageUrl(value: string) {
        this._config.defaultImageUrl = value;
    }

    public get title(): string {
        return this._config.title;
    }

    public set title(value: string) {
        this._config.title = value;
    }

    public get subtitle(): string {
        return this._config.subtitle;
    }

    public set subtitle(value: string) {
        this._config.subtitle = value;
    }

    public get imageUrl(): string {
        return this._config.imageUrl;
    }

    public set imageUrl(value: string) {
        this._config.imageUrl = value;
    }

    public get click(): () => void {
        return this._config.click;
    }

    public set click(value: () => void) {
        this._config.click = value;
    }

    public get event(): string {
        return this._config.event;
    }

    public set event(value: string) {
        this._config.event = value;
    }

    public set(title: string, subtitle: string, imageUrl: string, callbackOrEvent?: any): void {
        this._config.title = title;
        this._config.subtitle = subtitle;
        this._config.imageUrl = imageUrl;

        if (_.isFunction(callbackOrEvent))
            this._config.click = callbackOrEvent;
        else this._config.click = null;

        if (_.isString(callbackOrEvent))
            this._config.event = callbackOrEvent;
        else this._config.event = null;
    }

    public clear(): void {
        this._config.title = null;
        this._config.subtitle = null;
        this._config.imageUrl = null;
        this._config.click = null;
        this._config.event = null;
    }

    public $get($rootScope: ng.IRootScopeService) {
        "ngInject";

        if (this._service == null)
            this._service = new NavHeaderService(this._config, $rootScope);

        return this._service;
    }
     
}


angular
    .module('pipNavHeader')
    .provider('pipNavHeader', NavHeaderProvider);
