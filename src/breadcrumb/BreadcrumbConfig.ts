import { SimpleActionItem } from '../actions/ActionsService';
export class BreadcrumbItem {
    title: string;
    click?: (item: BreadcrumbItem) => void;   
    subActions?: SimpleActionItem[]; 
}

export class BreadcrumbConfig {
    text: string;
    items: BreadcrumbItem[];
    criteria: string;
}
