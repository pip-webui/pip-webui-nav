/// <reference path="../../typings/tsd.d.ts" />

(function () {
    'use strict';

    var thisModule = angular.module('pipScaleNavHeader', 
        ['ngMaterial', 'pipNav.Templates', 'pipNavHeader.Service']);

    // Main application nav-header directive
    thisModule.directive('pipScaleNavHeader', function() {
       return {
           restrict: 'EA',
           scope: {
               title: '=pipTitle',
               subtitle: '=pipSubTitle',
               imageUrl: '=pipImage',
               imageCss: '=pipImageCss'
           },
           replace: false,
           templateUrl: 'scale_nav_header/scale_nav_header.html',
           controller: 'pipScaleNavHeaderController'
       };
    });

    thisModule.controller('pipScaleNavHeaderController', 
        function ($scope, $element, $rootScope, $timeout, pipNavHeader) {
           
            var 
                image = null, 
                imageBlock = $element.find('.pip-scale-nav-header-user'),
                $image;

            // Apply class and call resize
            $element.addClass('pip-scale-nav-header');

            $rootScope.$on('pipIdentityChanged', onIdentityChanged);
            $rootScope.$on('pipNavHeaderImageChanged', onIdentityChanged);
            $rootScope.$on('pipNavExpanded', resizeImage);
            $scope.onUserClick = onUserClick;

            $timeout(function() {
                $image = $element.find('.pip-scale-nav-header-user-image');
                onIdentityChanged();
                $image.load(function ($event) {
                    image = $($event.target);
                    setImageMarginCSS(imageBlock, image);
                });                
            }, 10);

            return;

            function resizeImage() {
                if (!image) {
                    image = $element.find('.pip-scale-nav-header-user-image')
                } 
                setImageMarginCSS(imageBlock, image);
            }

            //------------------------
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
