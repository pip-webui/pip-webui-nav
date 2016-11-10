'use strict';

// Prevent junk from going into typescript definitions
(() => {

    function StickyNavHeaderDirectiveController($scope, $element, $rootScope, $timeout, pipNavHeader) {
        "ngInject";

        var
            image = null,
            imageBlock = $element.find('.pip-sticky-nav-header-user'),
            $image,
            currentState,
            loadedDefaultImage = false;

        // Apply class and call resize
        $element.addClass('pip-sticky-nav-header');

        $scope.onUserClick = onUserClick;
        $scope.onImageError = onImageError;
        $scope.onImageLoad = onImageLoad;

        $timeout(function () {
            $image = $element.find('.pip-sticky-nav-header-user-image');

            if ($image[0]) {
                $image[0].onload = onImageLoad;
                $image[0].onerror = onImageError;
            } else {
                $image.onload = onImageLoad;
                $image.onerror = onImageError;
            }

            onNavHeaderChanged(null, pipNavHeader.config);
        }, 20);

        $rootScope.$on('pipNavHeaderChanged', onNavHeaderChanged);
        $rootScope.$on('pipSideNavStateChanged', onStateChanged);

        return;

        function initHeader() {
            if (!pipNavHeader.config) return;

            $scope.title = pipNavHeader.config.title;
            $scope.subtitle = pipNavHeader.config.subtitle;
            $scope.imageUrl = pipNavHeader.config.imageUrl;
            $scope.imageCss = pipNavHeader.config.imageCss;
        }

        // When image is loaded resize/reposition it
        function onImageLoad($event) {
            var image = $($event.target);
            setImageMarginCSS(imageBlock, image);
        };

        function onImageError($event) {
            if (loadedDefaultImage) return;
            $scope.$apply(function () {
                setImage(pipNavHeader.config, true);
            });
        };

        function onStateChanged(event, state) {
            if (state === undefined) return;
            currentState = state;

            if (state.id == 'toggle') {
                $timeout(function () {
                    $scope.showHeader = currentState && currentState.id == 'toggle';
                }, 400);
            } else {
                $scope.showHeader = false;
            }
        }

        function setImageMarginCSS(container, image) {
            var cssParams = {},
                containerWidth = container.width ? container.width() : container.clientWidth,
                containerHeight = container.height ? container.height() : container.clientHeight,
                imageWidth = image[0].naturalWidth || image.width,
                imageHeight = image[0].naturalHeight || image.height,
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

        function setImage(config, loadError: boolean) {
            if (!config) return;

            var url: string;

            if (!loadError && !!config.imageUrl && !loadedDefaultImage) {
                url = config.imageUrl;
            } else {
                loadedDefaultImage = true;
                url = config.defaultImageUrl;
            }

            if (url && $image) {
                $image.attr('src', url);
            } else {
                imageBlock.css('display', 'none');
            }
        }

        function onNavHeaderChanged($event, config) {
            if (!config) return;
            setImage(config, false)

            $scope.title = config.title;
            $scope.subtitle = config.subtitle;
            $scope.imageUrl = config.imageUrl;
            $scope.imageCss = config.imageCss;
        }

        function onUserClick() {
            $rootScope.$broadcast('pipNavUserClicked');
        }

    }

    function stickyNavHeaderDirective() {
        return {
            restrict: 'EA',
            scope: {

            },
            replace: false,
            templateUrl: 'header/StickyNavHeader.html',
            controller: StickyNavHeaderDirectiveController
        };
    }

    angular
        .module('pipNavHeader')
        .directive('pipStickyNavHeader', stickyNavHeaderDirective);

})();