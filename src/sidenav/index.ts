'use strict';

angular.module('pipSideNav', ['ngMaterial', 'pipNav.Templates']);

import './SideNavService';
import './SideNavDirective';
import './SideNavPartDirective';
import './StickySideNavDirective';

export * from './SideNavService';