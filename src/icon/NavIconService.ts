'use strict';

export let NavIconChangedEvent: 'pipNavIconChanged';

export class NavIconConfig {
    // Type of nav icon: 'back', 'menu', 'image' or 'none'
    public type: string;
    // Image url
    public imageUrl: string;
    // Icon name
    public icon: string;
    // Handle nav icon click event
    click: () => void;
    // Event name
    event: string
};

export interface INavIconService {
    readonly config: NavIconConfig;

    showMenu(callbackOrEvent?: any): void;
    showIcon(icon: string, callbackOrEvent?: any): void;
    showBack(callbackOrEvent?: any): void;
    showImage(imageUrl: string, callbackOrEvent?: any): void;
    hide(): void;
}

export interface INavIconProvider extends ng.IServiceProvider {
    config: NavIconConfig;

    setMenu(callbackOrEvent?: any): void;
    setIcon(icon: string, callbackOrEvent?: any): void;
    setBack(callbackOrEvent?: any): void;
    setImage(imageUrl: string, callbackOrEvent?: any): void;
    clear(): void;
}

class NavIconService implements INavIconService {
    private _config: NavIconConfig;
    private _rootScope: ng.IRootScopeService;

    public constructor(config: NavIconConfig, $rootScope: ng.IRootScopeService) {
        this._config = config;
        this._rootScope = $rootScope;
    }

    public get config(): NavIconConfig {
        return this._config;
    }

    private setCallbackOrEvent(callbackOrEvent?: any): void {
        if (_.isFunction(callbackOrEvent))
            this._config.click = callbackOrEvent;
        else this._config.click = null;

        if (_.isString(callbackOrEvent))
            this._config.event = callbackOrEvent;
        else this._config.event = null;
    }

    public showMenu(callbackOrEvent?: any): void {
        this._config.type = 'menu';
        this.setCallbackOrEvent(callbackOrEvent);
        this.sendConfigEvent();
    }

    public showIcon(icon: string, callbackOrEvent?: any): void {
        this._config.type = 'icon';
        this._config.icon = icon;
        this.setCallbackOrEvent(callbackOrEvent);
        this.sendConfigEvent();
    }

    public showBack(callbackOrEvent?: any): void {
        this._config.type = 'back';
        this.setCallbackOrEvent(callbackOrEvent);
        this.sendConfigEvent();
    }

    public showImage(imageUrl: string, callbackOrEvent?: any): void {
        this._config.type = 'image';
        this._config.imageUrl = imageUrl;
        this.setCallbackOrEvent(callbackOrEvent);
        this.sendConfigEvent();
    }

    public hide(): void {
        this._config.type = 'none';
        this.setCallbackOrEvent(null);
        this.sendConfigEvent();
    }

    private sendConfigEvent() {
        this._rootScope.$broadcast(NavIconChangedEvent, this._config);
    }
}

class NavIconProvider implements INavIconProvider {
    private _config: NavIconConfig = new NavIconConfig();
    private _service: NavIconService;

    public get config(): NavIconConfig {
        return this._config;
    }

    public set config(value: NavIconConfig) {
        this._config = value || new NavIconConfig();
    }

    private setCallbackOrEvent(callbackOrEvent?: any): void {
        if (_.isFunction(callbackOrEvent))
            this._config.click = callbackOrEvent;
        else this._config.click = null;

        if (_.isString(callbackOrEvent))
            this._config.event = callbackOrEvent;
        else this._config.event = null;
    }

    public setMenu(callbackOrEvent?: any): void {
        this._config.type = 'menu';
        this.setCallbackOrEvent(callbackOrEvent);
    }

    public setIcon(icon: string, callbackOrEvent?: any): void {
        this._config.type = 'icon';
        this._config.icon = icon;
        this.setCallbackOrEvent(callbackOrEvent);
    }

    public setBack(callbackOrEvent?: any): void {
        this._config.type = 'back';
        this.setCallbackOrEvent(callbackOrEvent);
    }

    public setImage(imageUrl: string, callbackOrEvent?: any): void {
        this._config.type = 'image';
        this._config.imageUrl = imageUrl;
        this.setCallbackOrEvent(callbackOrEvent);
    }

    public clear(): void {
        this._config.type = 'none';
        this.setCallbackOrEvent(null);
    }

    public $get($rootScope: ng.IRootScopeService) {
        "ngInject";

        if (this._service == null)
            this._service = new NavIconService(this._config, $rootScope);

        return this._service;
    }
     
}


angular
    .module('pipNavIcon')
    .provider('pipNavIcon', NavIconProvider);
