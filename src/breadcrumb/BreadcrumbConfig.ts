import { SimpleActionItem } from '../actions/ActionsService';
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
