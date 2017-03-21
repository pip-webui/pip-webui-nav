import { SideNavState, SideNavConfig } from "./SideNavState";

export interface ISideNavService {
    readonly config: SideNavConfig;
    readonly classes: string[];
    parts: any;
    state: any;
    type: string;
    backdrop: boolean;

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
    backdrop: boolean;
    visible: boolean;
    classes: string[];

    addClass(...classes: string[]): void;
    removeClass(...classes: string[]): void;

    part(part: string, value: any): void;
}