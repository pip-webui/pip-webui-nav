import { SideNavState, SideNavConfig } from "./SideNavState";
import { ISideNavProvider, ISideNavService } from "./ISideNavService";

export const SideNavChangedEvent = 'pipSideNavChanged';
export const SideNavStateChangedEvent = 'pipSideNavStateChanged';
export const OpenSideNavEvent = 'pipOpenSideNav';
export const CloseSideNavEvent = 'pipCloseSideNav';

class SideNavService implements ISideNavService {
    private _config: SideNavConfig;
    private _state: any;

    public constructor(
        config: SideNavConfig,
        private $rootScope: ng.IRootScopeService,
        private $mdSidenav: ng.material.ISidenavService) {
        this._config = config;
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
        this.$rootScope.$broadcast(SideNavStateChangedEvent, value);
    }

    public get type(): string {
        return this._config.type;
    }

    public set type(value: string) {
        this._config.type = value;
    }

    public get backdrop(): boolean {
        return this._config.backdrop;
    }

    public set backdrop(value: boolean) {
        this._config.backdrop = value;
    }

    public open() {
        this.$mdSidenav('pip-sticky-sidenav').open();
    }

    public close() {
        this.$mdSidenav('pip-sticky-sidenav').close();
    }

    public toggle() {
        this.$mdSidenav('pip-sticky-sidenav').toggle();
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
        this.$rootScope.$emit(SideNavChangedEvent, this._config);
    }
}

class SideNavProvider implements ISideNavProvider {
    private _config: SideNavConfig = {
        parts: {},
        classes: [],
        type: 'popup',
        backdrop: true,
        state: null,
        visible: true
    };

    private _service: SideNavService;

    public get backdrop(): boolean {
        return this._config.backdrop;
    }

    public set backdrop(value: boolean) {
        this._config.backdrop = value;
    }

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
