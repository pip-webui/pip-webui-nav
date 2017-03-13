import { AppBarConfig } from './AppBarConfig';

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
