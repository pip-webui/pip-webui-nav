import { OpenSideNavEvent } from '../sidenav/SideNavEvents';
import { INavIconService, NavIconConfig } from "./NavIconService";
import { INavIconBindings } from './INavIconBindings';

export let NavIconClickedEvent = 'pipNavIconClicked';

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

class NavIconDirectiveController implements INavIconBindings {
    private _element: ng.IAugmentedJQuery;
    private _scope: angular.IScope;
    private _log: ng.ILogService;
    private _rootScope: ng.IRootScopeService;
    private _window: ng.IWindowService;

    private clearFn: Function;

    public config: NavIconConfig;

    public type: string;
    public imageUrl: string;
    public icon: string;

    constructor(
        $element: ng.IAugmentedJQuery,
        $scope: angular.IScope,
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
        $window: ng.IWindowService,
        pipNavIcon: INavIconService
    ) {
        "ngInject";

        this._element = $element;
        this._scope = $scope;
        this._log = $log;
        this._rootScope = $rootScope;
        this._window = $window;

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
            this._rootScope.$broadcast(this.config.event);
        } else if (this.config.type == 'menu') {
            this._rootScope.$broadcast(OpenSideNavEvent);
        } else if (this.config.type == 'back') {
            this._window.history.back();
        } else {
            this._rootScope.$broadcast(NavIconClickedEvent);
        }
    }

}

const NavIcon: ng.IComponentOptions = {
    bindings: NavIconBindings,
    templateUrl: 'icon/NavIcon.html',
    controller: NavIconDirectiveController
}

angular
    .module('pipNavIcon')
    .component('pipNavIcon', NavIcon);


// (() => {
//     function navIconDirective() {
//         return {
//             restrict: 'E',
//             scope: {
//                 type: '=pipType',
//                 imageUrl: '=pipImageUrl',
//                 icon: '=pipIcon'
//             },
//             replace: false,
//             templateUrl: 'icon/NavIcon.html',
//             controller: NavIconDirectiveController,
//             controllerAs: '$ctrl'
//         };
//     }


//     angular
//         .module('pipNavIcon')
//         .directive('pipNavIcon', navIconDirective);

// })();