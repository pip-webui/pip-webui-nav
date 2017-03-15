
export class PipTab {
    id: string;
    name?: string;
    count: number;
    title: string;
}

{
    interface ITabsBindings {
        [key: string]: any;

        ngDisabled: any;
        tabs: any;
        showTabs: any;
        showTabsShadow: any;
        activeIndex: any;
        select: any;
        breakpoints: any;
        themeClass: any;
    }

    const TabsBindings: ITabsBindings = {
        ngDisabled: '&?', // function
        tabs: '<pipTabs', // PipTab[]
        showTabs: '&pipShowTabs', // function
        showTabsShadow: '&pipTabsShadow', // function
        activeIndex: '<?pipActiveIndex', // number
        select: '=pipTabsSelect', // function
        breakpoints: '<?pipBreakpoints', // string
        themeClass: '<?themeClass', // string
    }

    class TabsChanges implements ng.IOnChangesObject, ITabsBindings {
        [key: string]: ng.IChangesObject<any>;
        // Not one way bindings
        ngDisabled: ng.IChangesObject<() => ng.IPromise<void>>;
        tabs: ng.IChangesObject<PipTab[]>;
        showTabs: ng.IChangesObject<() => ng.IPromise<void>>;
        showTabsShadow: ng.IChangesObject<() => ng.IPromise<void>>;
        activeIndex: ng.IChangesObject<number>;
        select: ng.IChangesObject<() => ng.IPromise<void>>;
        breakpoints: ng.IChangesObject<string>;
        themeClass: ng.IChangesObject<string>;
    }

    class TabsDirectiveController implements ITabsBindings {
        private _pipTranslate: pip.services.ITranslateService;
        private _pipTheme: pip.themes.IThemeService;
        private _pipMedia: pip.layouts.IMediaService;
        private selectedTabId: string;

        public ngDisabled: Function;
        public tabs: PipTab[];
        public activeIndex: number;
        public breakpoints: string;
        public showTabs: Function;
        public showTabsShadow: Function;
        public select: Function;
        public themeClass: string;

        public media: any;
        public currentTheme: string;

        public change: () => ng.IPromise<any>;

        constructor(
            private $element: ng.IAugmentedJQuery,
            private $injector: ng.auto.IInjectorService,
            private $rootScope: ng.IRootScopeService,
            private $timeout: ng.ITimeoutService,
            private navConstant: any,
            $mdMedia: angular.material.IMedia
        ) {
            "ngInject";

            this.setTheme();
            this.setMedia($mdMedia);
        }

        private setTheme(): void {
            this._pipTheme = this.$injector.has('pipTheme') ? <pip.themes.IThemeService>this.$injector.get('pipTheme') : null;
            if (this._pipTheme) {
                this.currentTheme = this._pipTheme.theme;
            } else if (this.$rootScope['$theme']) {
                this.currentTheme = this.$rootScope['$theme'];
            }

            this.themeClass = (this.themeClass || '') + ' md-' + this.currentTheme + '-theme';
        }

        private setMedia($mdMedia: angular.material.IMedia): void {
            this._pipMedia = this.$injector.has('pipMedia') ? <pip.layouts.IMediaService>this.$injector.get('pipMedia') : null;
            this.media = this._pipMedia !== undefined ? this._pipMedia : $mdMedia;
        }

        private setTranslate(): void {
            this._pipTranslate = this.$injector.has('pipTranslate') ? <pip.services.ITranslateService>this.$injector.get('pipTranslate') : null;
            if (this._pipTranslate) {
                if (this.tabs.length > 0 && this.tabs[0].title) {
                    this._pipTranslate.translateObjects(this.tabs, 'title', 'nameLocal');
                } else {
                    this._pipTranslate.translateObjects(this.tabs, 'name', 'nameLocal');
                }
            }
        }

        public isDisabled(): boolean {
            if (_.isFunction(this.ngDisabled)) {
                return this.ngDisabled();
            } else {
                return this.toBoolean(this.ngDisabled);
            }
        };

        public tabDisabled(index: number): boolean {
            return (this.isDisabled() && this.activeIndex != index);
        };

        public onSelect(index: number): void {
            if (this.isDisabled()) return;
            this.activeIndex = index;
            this.selectedTabId = this.tabs.length >= this.activeIndex ? this.tabs[this.activeIndex].id : null;
            this.$timeout(() => {
                if (this.select) {
                    this.select(this.tabs[this.activeIndex], this.activeIndex);
                }
            }, 0);

        };

        public showShadow(): boolean {
            if (_.isFunction(this.showTabsShadow)) {
                return this.showTabsShadow();
            } else {
                return this.toBoolean(this.showTabsShadow);
            }
        };

        public show(): boolean {
            if (_.isFunction(this.showTabs)) {
                return this.showTabs();
            } else {
                return this.toBoolean(this.showTabs);
            }
        };

        public toBoolean(value: any): boolean {
            if (value == null) return false;
            if (!value) return false;
            value = value.toString().toLowerCase();
            return value == '1' || value == 'true';
        }

        public $onChanges(changes: TabsChanges) {
            if (changes.activeIndex === undefined) {
                if (!this.activeIndex) {
                    this.activeIndex = 0;
                }
            } else {
                this.activeIndex = changes.activeIndex.currentValue || 0;
                if (this.$timeout && this.activeIndex !== changes.activeIndex.previousValue) {
                    this.$timeout(() => {
                        let a = this.$element.find('md-tabs-canvas');
                        if (a && a[0]) {
                            angular.element(a[0]).attr('activeIndex', this.activeIndex);
                        }
                        a.on('focusout', () => {
                            angular.element(a[0]).attr('activeIndex', this.activeIndex);
                            this.$timeout(() => {
                                angular.element(a[0]).attr('activeIndex', this.activeIndex);
                            }, 50);
                        });
                    }, 1000);
                }
            }

            if (changes.breakpoints === undefined) {
                if (!this.breakpoints) {
                    this.breakpoints = this.navConstant.TAB_BREAKPOINT;
                }
            } else {
                this.breakpoints = changes.breakpoints.currentValue ? changes.breakpoints.currentValue : this.navConstant.TAB_BREAKPOINT
            }

            if (changes.tabs === undefined || !_.isArray(changes.tabs.currentValue)) {
                if (!this.tabs) {
                    this.tabs = [];
                }
            } else {
                this.tabs = changes.tabs.currentValue;
                this.setTranslate();
            }

            if (!changes.activeIndex && changes.tabs && this.selectedTabId !== undefined) {
                const index = _.indexOf(this.tabs, _.find(this.tabs, {
                    id: this.selectedTabId
                }));
                if (index < 0) {
                    this.selectedTabId = this.tabs.length >= this.activeIndex ? this.tabs[this.activeIndex].id : null;
                } else if (this.tabs.length > 0 && this.activeIndex) {
                    this.onSelect(index);
                }
            } else {
                this.selectedTabId = this.tabs.length >= this.activeIndex ? this.tabs[this.activeIndex].id : null;
            }
        }

    }

    const Tabs: ng.IComponentOptions = {
        bindings: TabsBindings,
        templateUrl: 'tabs/Tabs.html',
        controller: TabsDirectiveController
    }

    angular
        .module('pipTabs', ['pipNav.Templates'])
        .component('pipTabs', Tabs);
}
