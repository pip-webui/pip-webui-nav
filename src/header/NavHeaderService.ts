import { NavHeaderConfig } from "./NavHeaderConfig";
import { INavHeaderService, INavHeaderProvider } from "./INavHeaderService";

export let NavHeaderChangedEvent = 'pipNavHeaderChanged';

class NavHeaderService implements INavHeaderService {
    private _config: NavHeaderConfig;

    public constructor(config: NavHeaderConfig, private $rootScope: ng.IRootScopeService) {
        this._config = config;
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

        if (_.isFunction(callbackOrEvent)) {
            this._config.click = callbackOrEvent;
        } else {
            this._config.click = null;
        }
        if (_.isString(callbackOrEvent)) {
            this._config.event = callbackOrEvent;
        } else {
            this._config.event = null;
        }
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
        this.$rootScope.$emit(NavHeaderChangedEvent, this._config);
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

        if (_.isFunction(callbackOrEvent)) {
            this._config.click = callbackOrEvent;
        } else {
            this._config.click = null;
        }
        if (_.isString(callbackOrEvent)) {
            this._config.event = callbackOrEvent;
        } else {
            this._config.event = null;
        }
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
