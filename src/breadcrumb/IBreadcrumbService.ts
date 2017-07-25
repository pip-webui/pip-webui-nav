
import { BreadcrumbItem, BreadcrumbConfig } from './BreadcrumbConfig';

export interface IBreadcrumbService {
    config: BreadcrumbConfig;
    text: string;
    items: BreadcrumbItem[];
    criteria: string;
    breakpoint: string;

    showText(text: string, criteria?: string): void;
    showItems(items: BreadcrumbItem[], criteria?: string): void;
}

export interface IBreadcrumbProvider extends ng.IServiceProvider {
    text: string;
}
