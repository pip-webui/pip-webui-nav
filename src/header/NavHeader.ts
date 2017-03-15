import { INavHeaderService } from "./INavHeaderService";
import { NavHeaderConfig } from "./NavHeaderConfig";

(() => {
    class NavHeaderController {

        public title: string;
        public subtitle: string;
        public imageUrl: string;
        public imageCss: string;
        public image: any;
        public imageBlock: any;
        public loadedDefaultImage: boolean;
        public showHeader: boolean;

        constructor(
            private $element: ng.IAugmentedJQuery,
            private $scope: angular.IScope,
            $log: ng.ILogService,
            private $rootScope: ng.IRootScopeService,
            private $timeout: ng.ITimeoutService,
            private pipNavHeader: INavHeaderService,
            navConstant: any

        ) {
            "ngInject";

            // Apply class and call resize
            $element.addClass('pip-sticky-nav-header');


            this.initImage();

            let cleanupNavHeaderChanged: Function = $rootScope.$on('pipNavHeaderChanged', ($event: ng.IAngularEvent, config: NavHeaderConfig) => {
                this.onNavHeaderChanged($event, config)
            });
            let cleanupSideNavStateChanged: Function = $rootScope.$on('pipSideNavStateChanged', ($event: ng.IAngularEvent, state: any) => { //navState
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
            this.imageBlock = this.$element.find('.pip-sticky-nav-header-user')

            this.$timeout(() => {
                this.image = this.$element.find('.pip-sticky-nav-header-user-image');

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

                this.onNavHeaderChanged(null, this.pipNavHeader.config);
            }, 20);
        }

        private initHeader() {
            if (!this.pipNavHeader.config) return;

            this.title = this.pipNavHeader.config.title;
            this.subtitle = this.pipNavHeader.config.subtitle;
            this.imageUrl = this.pipNavHeader.config.imageUrl;
            this.imageCss = this.pipNavHeader.config.imageCss;
        }

        // // When image is loaded resize/reposition it
        // private onImageLoad($event) {
        //     let image: ng.IAugmentedJQuery = $($event.target);
        //     this.setImageMarginCSS(image);
        // };

        // private onImageError($event) {
        //     if (this.loadedDefaultImage) return;
        //     this.$scope.$apply(() => {
        //         this.setImage(this.pipNavHeader.config, true);
        //     });
        // };
        // When image is loaded resize/reposition it
        private onImageLoad() {
            this.setImageMarginCSS(this.image);
        };

        private onImageError() {
            if (this.loadedDefaultImage) return;
            this.$scope.$apply(() => {
                this.setImage(this.pipNavHeader.config, true);
            });
        };

        private onStateChanged(event: ng.IAngularEvent, state: any) { // navState
            if (state === undefined) return;

            if (state.id == 'toggle') {
                this.$timeout(() => {
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
            this.$rootScope.$broadcast('pipNavUserClicked'); // todo
        }

    }

    function navHeaderDirective() {
        return {
            restrict: 'EA',
            replace: false,
            templateUrl: 'header/NavHeader.html',
            controller: NavHeaderController,
            controllerAs: '$ctrl'

        };
    }

    angular
        .module('pipNavHeader')
        .directive('pipNavHeader', navHeaderDirective);

})();