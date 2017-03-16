import { AppBarConfig } from './AppBarConfig';
import { IAppBarService } from "./IAppBarService";

class AppBarController {
    public config: AppBarConfig;

    constructor(
        $element: ng.IAugmentedJQuery,
        $rootScope: ng.IRootScopeService,
        pipAppBar: IAppBarService
    ) {
        "ngInject";
        // Apply class and call resize
        $element.addClass('pip-appbar');
        $element.addClass('color-primary-bg');

        this.config = pipAppBar.config;

        $rootScope.$on('pipAppBarChanged', (event: ng.IAngularEvent, config: AppBarConfig) => {
            this.onAppBarChanged(event, config)
        });
    }

    public onAppBarChanged(event: ng.IAngularEvent, config: AppBarConfig) {
        this.config = config;
    }
    
}

{
    const appbar: ng.IComponentOptions = {
        transclude: true,
        templateUrl: 'appbar/AppBar.html',
        controller: AppBarController
    }

    angular
        .module('pipAppBar')
        .component('pipAppbar', appbar);

}