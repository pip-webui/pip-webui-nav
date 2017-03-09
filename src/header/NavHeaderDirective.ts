

// Prevent junk from going into typescript definitions
import { INavHeaderService, NavHeaderConfig } from "./NavHeaderService";

(() => {
    class NavHeaderDirectiveController {
        private _element: ng.IAugmentedJQuery;
        private _scope: angular.IScope;
        private _log: ng.ILogService;
        private _rootScope: ng.IRootScopeService;
        private _timeout: ng.ITimeoutService;
        private _pipNavHeader: INavHeaderService;

        public title: string;
        public subtitle: string;
        public imageUrl: string;
        public imageCss: string;
        public image: ng.IAugmentedJQuery;
        public imageBlock: ng.IAugmentedJQuery;
        public loadedDefaultImage: boolean;
        public showHeader: boolean;

        constructor(
            $element: ng.IAugmentedJQuery,
            $scope: angular.IScope,
            $log: ng.ILogService,
            $rootScope: ng.IRootScopeService,
            $timeout: ng.ITimeoutService,
            pipNavHeader: INavHeaderService,
            navConstant: any

        ) {
            "ngInject";

            this._element = $element;
            this._scope = $scope;
            this._log = $log;
            this._rootScope = $rootScope;
            this._timeout = $timeout;
            this._pipNavHeader = pipNavHeader;

            // Apply class and call resize
            this._element.addClass('pip-sticky-nav-header');


            this.initImage();

            let cleanupNavHeaderChanged: Function = this._rootScope.$on('pipNavHeaderChanged', ($event: ng.IAngularEvent, config: NavHeaderConfig) => {
                this.onNavHeaderChanged($event, config)
            });
            let cleanupSideNavStateChanged: Function = this._rootScope.$on('pipSideNavStateChanged', ($event: ng.IAngularEvent, state: any) => { //navState
                this.onStateChanged($event, state)
            });

            $scope.$on('$destroy', () => {
                if (angular.isFunction(cleanupNavHeaderChanged)) {
                    cleanupNavHeaderChanged();
                }
                if (angular.isFunction(cleanupSideNavStateChanged)) {
                    cleanupSideNavStateChanged();
                }
            });

        }

        private initImage() {
            this.imageBlock = this._element.find('.pip-sticky-nav-header-user')

            this._timeout(() => {
                this.image = this._element.find('.pip-sticky-nav-header-user-image');

                if (this.image[0]) {
                    this.image[0].onload = (() => this.onImageLoad());

                    // ($event: HTMLElement, erroev: Event): any =>  {
                    //     this.onImageLoad($event);
                    //     return null;
                    // }
                    this.image[0].onerror = (() => this.onImageError());
                    // ($event: ng.IAngularEvent) => {
                    //     this.onImageError($event);
                    // }
                } else {
                    this.image.onload = (() => this.onImageLoad());
                    this.image.onerror = (() => this.onImageError());
                }

                this.onNavHeaderChanged(null, this._pipNavHeader.config);
            }, 20);
        }

        private initHeader() {
            if (!this._pipNavHeader.config) return;

            this.title = this._pipNavHeader.config.title;
            this.subtitle = this._pipNavHeader.config.subtitle;
            this.imageUrl = this._pipNavHeader.config.imageUrl;
            this.imageCss = this._pipNavHeader.config.imageCss;
        }

        // // When image is loaded resize/reposition it
        // private onImageLoad($event) {
        //     let image: ng.IAugmentedJQuery = $($event.target);
        //     this.setImageMarginCSS(image);
        // };

        // private onImageError($event) {
        //     if (this.loadedDefaultImage) return;
        //     this._scope.$apply(() => {
        //         this.setImage(this._pipNavHeader.config, true);
        //     });
        // };
        // When image is loaded resize/reposition it
        private onImageLoad() {
            this.setImageMarginCSS(this.image);
        };

        private onImageError() {
            if (this.loadedDefaultImage) return;
            this._scope.$apply(() => {
                this.setImage(this._pipNavHeader.config, true);
            });
        };

        private onStateChanged(event: ng.IAngularEvent, state: any) { // navState
            if (state === undefined) return;

            if (state.id == 'toggle') {
                this._timeout(() => {
                    this.showHeader = state && state.id == 'toggle';
                }, 400);
            } else {
                this.showHeader = false;
            }
        }

        private setImageMarginCSS(image: ng.IAugmentedJQuery) { //image[0]
            var cssParams = {},
                containerWidth = this.imageBlock.width ? this.imageBlock.width() : this.imageBlock.clientWidth,
                containerHeight = this.imageBlock.height ? this.imageBlock.height() : this.imageBlock.clientHeight,
                imageWidth = image[0]['naturalWidth'] || image.width,
                imageHeight = image[0]['naturalHeight'] || image.height,
                margin = 0;

            if ((imageWidth / containerWidth) > (imageHeight / containerHeight)) {
                margin = -((imageWidth / imageHeight * containerHeight - containerWidth) / 2);
                cssParams['margin-left'] = '' + margin + 'px';
                cssParams['height'] = '' + containerHeight + 'px';
                cssParams['width'] = '' + imageWidth * containerHeight / imageHeight + 'px';
                cssParams['margin-top'] = '';
            } else {
                margin = -((imageHeight / imageWidth * containerWidth - containerHeight) / 2);
                cssParams['margin-top'] = '' + margin + 'px';
                cssParams['height'] = '' + imageHeight * containerWidth / imageWidth + 'px';
                cssParams['width'] = '' + containerWidth + 'px';
                cssParams['margin-left'] = '';
            }

            image.css(cssParams);
        };

        private setImage(config, loadError: boolean) {
            if (!config) return;

            var url: string;

            if (!loadError && !!config.imageUrl && !this.loadedDefaultImage) {
                url = config.imageUrl;
            } else {
                this.loadedDefaultImage = true;
                url = config.defaultImageUrl;
            }

            if (url && this.image) {
                this.image.attr('src', url);
            } else {
                this.imageBlock.css('display', 'none');
            }
        }

        private onNavHeaderChanged($event: ng.IAngularEvent, config: NavHeaderConfig) {
            if (!config) return;
            this.setImage(config, false)

            this.title = config.title;
            this.subtitle = config.subtitle;
            this.imageUrl = config.imageUrl;
            this.imageCss = config.imageCss;
        }

        public onUserClick() {
            this._rootScope.$broadcast('pipNavUserClicked'); // todo
        }

    }

    function navHeaderDirective() {
        return {
            restrict: 'EA',
            replace: false,
            templateUrl: 'header/NavHeader.html',
            controller: NavHeaderDirectiveController,
            controllerAs: 'vm'

        };
    }

    angular
        .module('pipNavHeader')
        .directive('pipNavHeader', navHeaderDirective);

})();