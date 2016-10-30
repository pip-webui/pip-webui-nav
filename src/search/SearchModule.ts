'use strict';

import { searchBarDirective } from './SearchBarDirective';
import { SearchProvider } from './SearchProvider';

angular
    .module('pipSearchBar', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates'])
    .provider('pipSearch', SearchProvider)
    .directive('pipSearchBar', searchBarDirective);
