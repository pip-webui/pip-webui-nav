import { OpenSideNavEvent } from '../sidenav/SideNavService';
import { NavIconConfig } from './NavIconConfig';
import { INavIconService } from './INavIconService';
import { NavIconClickedEvent, NavIconChangedEvent } from './NavIconService';

interface INavIconBindings {
    [key: string]: any;

    type: any;
    imageUrl: any;
    icon: any;
}

const NavIconBindings: INavIconBindings = {
    type: '<?pipType',
    imageUrl: '<?pipImageUrl',
    icon: '<?pipIcon'
}

class NavIconChanges implements ng.IOnChangesObject, INavIconBindings {
    [key: string]: ng.IChangesObject<any>;
    // Not one way bindings

    type: ng.IChangesObject<string>;
    imageUrl: ng.IChangesObject<string>;
    icon: ng.IChangesObject<string>;
}

class NavIconController implements INavIconBindings {
    private clearFn: Function;

    public config: NavIconConfig;
    public type: string;
    public imageUrl: string;
    public icon: string;

    constructor(
        private $rootScope: ng.IRootScopeService,
        private $window: ng.IWindowService,
        $element: ng.IAugmentedJQuery,
        $scope: angular.IScope,
        $log: ng.ILogService,
        pipNavIcon: INavIconService
    ) {
        "ngInject";


        // Apply class and call resize
        $element.addClass('pip-nav-icon');

        this.config = pipNavIcon.config;

        this.clearFn = $rootScope.$on('pipNavIconChanged', (event: ng.IAngularEvent, config: NavIconConfig) => {
            this.onNavIconChanged(event, config)
        });

    }

    public $onInit() {
        if (this.type) {
            this.config.type = this.type;
        }
        if (this.imageUrl) {
            this.config.imageUrl = this.imageUrl;
        }
        if (this.icon) {
            this.config.icon = this.icon;
        }        
    }

    public $onDestroy() {
        if (_.isFunction(this.clearFn)) {
            this.clearFn();
        }
    }

    public onNavIconChanged(event: ng.IAngularEvent, config: NavIconConfig): void {
        this.config = config;
    }

    public onNavIconClick(): void {
        if (_.isFunction(this.config.click)) {
            // Execute nav icon callback
            this.config.click();
        } else if (this.config.event) {
            this.$rootScope.$broadcast(this.config.event);
        } else if (this.config.type == 'menu') {
            this.$rootScope.$broadcast(OpenSideNavEvent);
        } else if (this.config.type == 'back') {
            this.$window.history.back();
        } else {
            this.$rootScope.$broadcast(NavIconClickedEvent);
        }
    }

}

const NavIcon: ng.IComponentOptions = {
    bindings: NavIconBindings,
    templateUrl: 'icon/NavIcon.html',
    controller: NavIconController
}

angular
    .module('pipNavIcon')
    .component('pipNavIcon', NavIcon);
