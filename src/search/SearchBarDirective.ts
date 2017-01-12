'use strict';

import { SearchConfig } from './SearchService';
import { ISearchService } from './SearchService';
import { SearchChangedEvent } from './SearchService';
import { SearchActivatedEvent } from './SearchService';

// Prevent junk from going into typescript definitions
(() => {

class SearchBarController {
    private _rootScope: ng.IRootScopeService;
    private _element: any;

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
        this._element = $element;

        // Apply class and call resize
        $element.addClass('pip-search-bar');

        this.config = pipSearch.config;
        this.stateChange();
        $rootScope.$on(SearchChangedEvent, (event, config) => { 
            this.onSearchChanged(event, config); 
        });
    }

    private stateChange() {
        if (this.enabled) {
            // this._element.addClass('w-stretch');
            this._element.addClass('w-stretch');
            this._element.parent().addClass('pip-search-active');

        } else {
            // this._element.removeClass('w-stretch');
            this._element.removeClass('w-stretch');
            this._element.parent().removeClass('pip-search-active');
        }
    }

    private onSearchChanged(event, config) {
        this.config = config;
        this.enabled = false;
        this.search.text = '';
        this.stateChange();
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
        this.stateChange();
    }

    public onClick() {
        let search = this.search.text;

        this.search.text = '';
        this.enabled = false;
        this.stateChange();

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
            this.stateChange();
            this.onClick();
        }
    }

    public onKeyDown(event: any) {
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

})();