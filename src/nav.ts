/// <reference path="../typings/tsd.d.ts" />

module pip.nav {
    'use strict';

    angular.module('pipNav', [
        'pipNav.Service',

        'pipDropdown',
        'pipTabs',

        'pipAppBar',
        'pipSideNav',
        'pipNavIcon',
        'pipNavMenu',
        'pipNavHeader',
        'pipBreadcrumb',
        'pipPrimaryActions', 
        'pipSecondaryActions'
    ]);
    
}


