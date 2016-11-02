'use strict';

angular.module('pipNavMenu', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);

import './NavMenuService';
import './NavMenuDirective';
import './StickyNavMenuDirective';

export * from './NavMenuService';