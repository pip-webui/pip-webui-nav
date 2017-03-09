

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
        'TAB_BREAKPOINT': 'gt-sm',
        'SIDENAV_CONTAINER': '.pip-main',
        'SIDENAV_LARGE_WIDTH': 320,
        'SIDENAV_MIDDLE_WIDTH': 240,
        'SIDENAV_SMALL_WIDTH': 72,
        'SIDENAV_ANIMATION_DURATION': 600

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
