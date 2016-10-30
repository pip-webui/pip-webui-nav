'use strict';

import { BreadcrumbProvider } from './BreadcrumbProvider';
import { breadcrumbDirective } from './BreadcrumbDirective';

angular
    .module('pipBreadcrumb', ['ngMaterial', 'pipNav.Templates', 'pipNav.Translate'])
    .provider('pipBreadcrumb', BreadcrumbProvider)
    .directive('pipBreadcrumb', breadcrumbDirective);
