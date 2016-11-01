'use strict';

import { SearchConfig } from './SearchService';
import { ISearchService } from './SearchService';
import { SearchChangedEvent } from './SearchService';
import { SearchActivatedEvent } from './SearchService';

class SearchBarController {
    private _rootScope: ng.IRootScopeService;

    public config: SearchConfig;
    public enabled: boolean = false;
    public search: any = { text: '' };

    public constructor (
        $element, 
        $rootScope: ng.IRootScopeService, 
        pipSearch: ISearchService
    ) {
        "ngInject";

        this._rootScope = $rootScope;

        // Apply class and call resize
        $element.addClass('pip-search-bar');

        this.config = pipSearch.config;

        $rootScope.$on(SearchChangedEvent, (event, config) => { 
            this.onSearchChanged(event, config); 
        });
    }

    private onSearchChanged(event, config) {
        this.config = config;
        this.enabled = false;
        this.search.text = '';
    }

    private focusText() {
        setTimeout(() => {
            let element = $('.pip-search-text');
            if (element.length > 0)
                element.focus();
        }, 0);
    }

    public enable() {
        this.search.text = this.config.criteria;
        this.enabled = true;
        this.focusText();
    }

    public onClick() {
        let search = this.search.text;

        this.search.text = '';
        this.enabled = false;

        if (this.config.callback)
            this.config.callback(search);
        else
            this._rootScope.$broadcast(SearchActivatedEvent, search);
    }

    public clear() {
        if (this.search.text) {
            this.search.text = '';
            this.focusText();
        } else {
            this.enabled = false;
            this.onClick();
        }
    }

    public onKeyDown(event: any) {
        // Enter pressed
        if (event.keyCode === 13)
            this.onClick();
        // ESC pressed
        else if (event.keyCode === 27)
            this.enabled = false;
    }
}


function searchBarDirective() {
    return {
        restrict: 'E',
        scope: {},
        replace: false,
        templateUrl: 'search/SearchBar.html',
        controller: SearchBarController,
        controllerAs: 'vm'
    };
}

angular.module('pipSearchBar')
    .directive('pipSearchBar', searchBarDirective);
