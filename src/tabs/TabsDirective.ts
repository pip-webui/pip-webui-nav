'use strict';

// Prevent junk from going into typescript definitions

class Selected {
    activeIndex: number = 0;
    activeTab: number = 0;
}

class TabsDirectiveController {

    private _element: ng.IAugmentedJQuery;
    private _attrs: ng.IAttributes;
    private _injector: ng.auto.IInjectorService;
    private _scope: angular.IScope;
    private _log: ng.ILogService;
    private _rootScope: ng.IRootScopeService;
    private _pipTranslate: pip.services.ITranslateService;

    private _pipTheme: pip.themes.IThemeService;
    private _pipMedia: pip.layouts.IMediaService;
    private _timeout: ng.ITimeoutService;

    public themeClass: string;
    public media: any;
    public pipTabIndex: number;
    public selected: Selected;
    public tabs: any[];
    public currentTheme: string;
    public breakpoints: string;

    constructor(
        $element: ng.IAugmentedJQuery,
        $attrs: ng.IAttributes,
        $injector: ng.auto.IInjectorService,
        $scope: angular.IScope,
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
        $mdMedia: angular.material.IMedia,
        $timeout: ng.ITimeoutService,
        navConstant: any

    ) {
        "ngInject";

        this._element = $element;
        this._attrs = $attrs;
        this._scope = $scope;
        this._injector = $injector;
        this._log = $log;
        this._rootScope = $rootScope;
        this._timeout = $timeout;

        this._pipTheme = $injector.has('pipTheme') ? <pip.themes.IThemeService>$injector.get('pipTheme') : null;
        this._pipMedia = $injector.has('pipMedia') ? <pip.layouts.IMediaService>$injector.get('pipMedia') : null;
        this._pipTranslate = this._injector.has('pipTranslate') ? <pip.services.ITranslateService>this._injector.get('pipTranslate') : null;

        if (this._pipTheme) {
            this.currentTheme = this._pipTheme.theme;
        } else if (this._rootScope['$theme']) {
            this.currentTheme = this._rootScope['$theme'];
        }

        this.themeClass = ($attrs['class'] || '') + ' md-' + this.currentTheme + '-theme';
        this.tabs = ($scope['tabs'] && _.isArray($scope['tabs'])) ? $scope['tabs'] : [];

        this.selected = new Selected();

        this.media = this._pipMedia !== undefined ? this._pipMedia : $mdMedia;

        this.breakpoints = $scope['breakpoints'] ? $scope['breakpoints'] : navConstant.TAB_BREAKPOINT;
        this.pipTabIndex = $attrs['pipTabIndex'] ? parseInt($attrs['pipTabIndex']) : 0,
            this.selected.activeIndex = $scope['activeIndex'] || 0;
        this.selected.activeTab = this.selected.activeIndex;

        if (this._pipTranslate) {
            if (this.tabs.length > 0 && this.tabs[0].title) {
                this._pipTranslate.translateObjects(this.tabs, 'title', 'nameLocal');
            } else {
                this._pipTranslate.translateObjects(this.tabs, 'name', 'nameLocal');
            }
        }

        if (this.pipTabIndex) {
            $timeout(() => {
                let a = $element.find('md-tabs-canvas');
                if (a && a[0]) {
                    angular.element(a[0]).attr('tabindex', this.pipTabIndex);
                }
                a.on('focusout', function () {
                    angular.element(a[0]).attr('tabindex', this.pipTabIndex);
                    $timeout(() => {
                        angular.element(a[0]).attr('tabindex', this.pipTabIndex);
                    }, 50);
                });
            }, 1000);
        }

        if (this.toBoolean($attrs['pipRebind'])) {
            this._scope.$watch(() => this._scope['activeIndex'],
                (newValue: number, oldValue: number) => {
                    console.log('watch', oldValue, newValue);
                    this.selected.activeIndex = newValue || 0;
                    this.selected.activeTab = this.selected.activeIndex;
                });
        }

    }


    public disabled(): boolean {
        if (this._scope['ngDisabled']) {
            return this._scope['ngDisabled']();
        }

        return false;
    };

    public tabDisabled(index: number): boolean {
        return (this.disabled() && this.selected.activeIndex != index);
    };

    public onSelect(index: number): void {
        console.log('onSelect', index);
        if (this.disabled()) return;


        this.selected.activeIndex = index;
        this.selected.activeTab = this.selected.activeIndex;
        this._timeout(() => {
            this._scope['activeIndex'] = index;
            console.log('activeIndex', this._scope['activeIndex']);
            if (this._scope['select']) {
                this._scope['select'](this.tabs[this.selected.activeIndex], this.selected.activeIndex);
            }
        }, 0);

    };

    public showShadow(): boolean {
        if (this._scope['showTabsShadow']) {
            return this._scope['showTabsShadow']();
        } else {
            return false;
        }
    };

    public show(): boolean {
        if (this._scope['showTabs']) {
            return this._scope['showTabs']();
        } else {
            return true;
        }
    };

    public toBoolean(value: any): boolean {
        if (value == null) return false;
        if (!value) return false;
        value = value.toString().toLowerCase();
        return value == '1' || value == 'true';
    }

}

(() => {
    function tabsDirective() {
        return {
            restrict: 'E',
            scope: {
                ngDisabled: '&',
                tabs: '=pipTabs',
                showTabs: '&pipShowTabs',
                showTabsShadow: '&pipTabsShadow',
                activeIndex: '=pipActiveIndex',
                select: '=pipTabsSelect',
                breakpoints: '=pipBreakpoints'
            },
            templateUrl: 'tabs/Tabs.html',
            controller: TabsDirectiveController,
            controllerAs: 'vm'
        };
    }


    angular
        .module("pipTabs", ['pipNav.Templates'])
        .directive('pipTabs', tabsDirective);

})();