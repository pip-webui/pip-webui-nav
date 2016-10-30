/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipStickyNavHeader',
        ['ngMaterial', 'pipNav.Templates', 'pipNavHeader.Service']);

    // Main application nav-header directive
    thisModule.directive('pipStickyNavHeader', function() {
        return {
            restrict: 'EA',
            scope: {
                title: '=pipTitle',
                subtitle: '=pipSubTitle',
                imageUrl: '=pipImage',
                imageCss: '=pipImageCss'
            },
            replace: false,
            templateUrl: 'sticky_nav_header/sticky_nav_header.html',
            controller: 'pipStickyNavHeaderController'
        };
    });

    thisModule.controller('pipStickyNavHeaderController',
        function ($scope, $element, $rootScope, $timeout, pipNavHeader) {

            var
                image = null,
                imageBlock = $element.find('.pip-sticky-nav-header-user'),
                $image;

            // Apply class and call resize
            $element.addClass('pip-sticky-nav-header');

            $rootScope.$on('pipIdentityChanged', onIdentityChanged);
            $rootScope.$on('pipNavHeaderImageChanged', onIdentityChanged);
             $scope.onUserClick = onUserClick;

            $timeout(function() {
                $image = $element.find('.pip-sticky-nav-header-user-image');
                onIdentityChanged();
                $image.load(function ($event) {
                    image = $($event.target);
                    setImageMarginCSS(imageBlock, image);
                });
            }, 10);

            return;

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

            function onIdentityChanged() {
                var url: string,
                    config = pipNavHeader.config();

                url = $scope.imageUrl ? $scope.imageUrl : config.defaultImageUrl;
                if (url) {
                    $image.attr('src', url);
                } else {
                    imageBlock.css('display', 'none');
                }
            }

            function onUserClick() {
                $rootScope.$broadcast('pipNavUserClicked');
            }

        }
    );

})();
