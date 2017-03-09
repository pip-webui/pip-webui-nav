'use strict';

angular.module('pipSideNav', ['ngMaterial', 'pipNav.Templates']);

import './SideNavEvents';
import './SideNavState';
import './SideNavService';
import './SideNavPartDirective';
import './SideNavDirective';

export * from './SideNavService';