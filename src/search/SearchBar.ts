import { SearchConfig } from './SearchConfig';
import { ISearchService } from './ISearchService';
import { OpenSearchEvent, CloseSearchEvent, SearchChangedEvent, SearchActivatedEvent } from './SearchService';

class SearchBarController {
    private clearFn: Function;

    public config: SearchConfig;
    public enabled: boolean = false;
    public search: any = { text: '' };

    public constructor(
        private $element: ng.IAugmentedJQuery,
        private $rootScope: ng.IRootScopeService,
        pipSearch: ISearchService
    ) {
        "ngInject";

        // Apply class and call resize
        $element.addClass('pip-search-bar');

        this.config = pipSearch.config;
        this.stateChange();
        this.clearFn = $rootScope.$on(SearchChangedEvent, (event: ng.IAngularEvent, config: SearchConfig) => {
            this.onSearchChanged(event, config);
        });
    }

    public $onDestroy() {
        if (_.isFunction(this.clearFn)) {
            this.clearFn();
        }
    }

    private stateChange(): void {
        if (this.enabled) {
            this.$element.addClass('w-stretch');
            this.$element.parent().addClass('pip-search-active');

        } else {
            this.$element.removeClass('w-stretch');
            this.$element.parent().removeClass('pip-search-active');
        }
    }

    private onSearchChanged(event: ng.IAngularEvent, config: SearchConfig): void {
        this.config = config;
        this.enabled = false;
        this.search.text = '';
        this.stateChange();
    }

    private focusText(): void {
        setTimeout(() => {
            let element: JQuery = $('.pip-search-text');
            if (element.length > 0)
                element.focus();
        }, 0);
    }

    public enable(): void {
        this.search.text = this.config.criteria;
        this.enabled = true;
        this.focusText();
        this.stateChange();
    }

    public onClick(): void {
        let search = this.search.text;

        this.search.text = '';
        this.enabled = false;
        this.stateChange();

        if (this.config.callback) {
            this.config.callback(search);
        } else {
            this.$rootScope.$broadcast(SearchActivatedEvent, search);
        }
    }

    public clear(): void {
        if (this.search.text) {
            this.search.text = '';
            this.focusText();
        } else {
            this.enabled = false;
            this.stateChange();
            this.onClick();
        }
    }

    public onKeyDown(event: KeyboardEvent): void {
        // Enter pressed
        if (event.keyCode === 13)
            this.onClick();
        // ESC pressed
        else if (event.keyCode === 27) {
            this.enabled = false;
            this.stateChange();
        }
    }
}

const SearchBar: ng.IComponentOptions = {
    templateUrl: 'search/SearchBar.html',
    controller: SearchBarController
}

angular
    .module('pipSearchBar')
    .component('pipSearchBar', SearchBar);
