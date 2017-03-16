import { SimpleActionItem } from '../actions/IActionsService';
export class BreadcrumbItem {
    title: string = null;
    click?: (item: BreadcrumbItem) => void = null;   
    subActions?: SimpleActionItem[] = null; 
}

export class BreadcrumbConfig {
    text: string;
    items: BreadcrumbItem[];
    criteria: string;
}
