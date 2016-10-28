/// <reference path="../typings/tsd.d.ts" />

module pip.nav {
    'use strict';

    angular.module('pipNav', [
        'pipNav.Service',

        'pipDropdown',
        'pipTabs',

        'pipAppBar',
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
    ]);
    
}


