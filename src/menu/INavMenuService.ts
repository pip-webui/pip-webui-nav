import { NavMenuConfig, NavMenuSection } from './NavMenuConfig';

export interface INavMenuService {
    sections: NavMenuSection[];
    defaultIcon: string;
    updateCount(link: string, count: number): void;
    updateBadgeStyle(link: string, style: string): void;
    clearCounts(): void;
}

export interface INavMenuProvider extends ng.IServiceProvider {
    sections: NavMenuSection[];
    defaultIcon: string;
}