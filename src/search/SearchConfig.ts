export class SearchConfig {
    // Search visible
    public visible: boolean;
    // Search criteria
    public criteria: string;
    // Custom search parameters
    public params: any;
    // History for search autocomplete
    public history: string[];
    // Callback for search
    callback: (criteria: string) => void;
}