'use strict';

import { BreadcrumbController } from './BreadcrumbController';

export function breadcrumbDirective() {
    return {
        restrict: 'E',
        scope: {},
        replace: false,
        templateUrl: 'breadcrumb/Breadcrumb.html',
        controller: BreadcrumbController,
        controllerAs: 'vm'
    };
}
