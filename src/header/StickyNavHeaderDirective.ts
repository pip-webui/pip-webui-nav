'use strict';

// Prevent junk from going into typescript definitions
(() => {

function StickyNavHeaderDirectiveController($scope, $element, $rootScope, $timeout, pipNavHeader) {
    "ngInject";

    var
        image = null,
        imageBlock = $element.find('.pip-sticky-nav-header-user'),
        $image,
        loadedDefaultImage = false;

    // initHeader();

    // Apply class and call resize
    $element.addClass('pip-sticky-nav-header');

    $scope.onUserClick = onUserClick;
    $scope.onImageError = onImageError;
    $scope.onImageLoad = onImageLoad;

    $timeout(function() {
        $image = $element.find('.pip-sticky-nav-header-user-image');

        onNavHeaderChanged(null, pipNavHeader.config);
    }, 10);

    $rootScope.$on('pipNavHeaderChanged', onNavHeaderChanged);
    $rootScope.$on('pipSideNavStateChanged', onStateChanged);
    console.log('pipSideNav $rootScope', _.cloneDeep($rootScope));
    return;

    function initHeader() {
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
        $scope.$apply(function () {
            var image = $($event.target);
            loadedDefaultImage = true;
            setImage(pipNavHeader.config);
        });
    };

    function onStateChanged(event, state) {
        if (state  === undefined) return;
        var def = $scope.showHeader === undefined ? 0 : 450;

        if (state.id == 'toggle') {
            $timeout(function() {
                $scope.showHeader = true;
            }, 450);
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
            cssParams['width'] = '' + imageWidth * containerHeight/imageHeight + 'px';
            cssParams['margin-top'] = '';
        } else {
            margin = -((imageHeight / imageWidth * containerWidth - containerHeight) / 2);
            cssParams['margin-top'] = '' + margin + 'px';
            cssParams['height'] = '' + imageHeight * containerWidth/imageWidth + 'px';
            cssParams['width'] = '' + containerWidth + 'px';
            cssParams['margin-left'] = '';
        }

        image.css(cssParams);
    };

    function setImage(config) {
        var url: string;

        if (!!config.imageUrl && !loadedDefaultImage) {
            url = config.imageUrl;
        } else {
            loadedDefaultImage = true;
            url = config.defaultImageUrl;
        }

        if (url) {
            $image.attr('src', url);
        } else {
            imageBlock.css('display', 'none');
        }        
    }

    function onNavHeaderChanged($event, config) {
        console.log('on onNavHeaderChanged', config);
        setImage(config)

            console.log('apply onNavHeaderChanged', config);
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
            // title: '=pipTitle',
            // subtitle: '=pipSubTitle',
            // imageUrl: '=pipImage',
            // imageCss: '=pipImageCss'
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