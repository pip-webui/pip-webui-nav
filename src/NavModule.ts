'use strict';

import { NavService } from './NavService';

angular
    .module('pipNav', [
        'pipDropdown',
        'pipTabs',

        'pipAppBar',
        'pipSearchBar',
        'pipNavIcon',
        'pipBreadcrumb',
        'pipPrimaryActions', 
        'pipSecondaryActions',
        'pipSideNav',
        'pipNavMenu',
        'pipNavHeader',
        'pipStickySideNav',
        'pipStickyNavMenu',
        'pipStickyNavHeader'
    ])
    .service('pipNav', NavService);


