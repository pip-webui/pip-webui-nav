'use strict';

import { SearchBarController } from './SearchBarController';

export function searchBarDirective() {
    return {
        restrict: 'E',
        scope: {},
        replace: false,
        templateUrl: 'search/SearchBar.html',
        controller: SearchBarController,
        controllerAs: 'vm'
    };
}