﻿'use strict';

import './dependencies/TranslateFilter';
import './language/LanguagePickerDirective';
import './dropdown/DropdownDirective';
import './tabs/TabsDirective';
import './actions';
import './appbar';
import './search';
import './breadcrumb';
import './sidenav';
import './header';
import './menu';
import './icon';
import './common/NavService';

angular
    .module('pipNav', [
        'pipNavService',
        'pipDropdown',
        'pipTabs',
        'pipAppBar',
        'pipSearchBar',
        'pipNavIcon',
        'pipBreadcrumb',
        'pipLanguagePicker',
        'pipActions', 
        'pipSideNav',
        'pipNavMenu',
        'pipNavHeader'
    ])
    .constant('navConstant', {
        'TAB_BREAKPOINT': 'gt-sm'
    })

export * from './actions';
export * from './appbar';
export * from './breadcrumb';
export * from './search';
export * from './sidenav';
export * from './icon';
export * from './menu';
export * from './header';
export * from './common/NavService';
