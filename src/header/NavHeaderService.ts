'use strict';

export interface INavHeaderService {

}

export interface INavHeaderProvider extends ng.IServiceProvider {

}

function NavHeaderProvider(): any {
    var config = {
        // Image url
        defaultImageUrl: null,
    };

    this.config = getConfig;
    this.clear = clear;
    this.image = setImage;

    // Get the service instance
    this.$get = function ($rootScope) {
        return {
            config: getConfig,
            image: showImage
        };

        // ----------------------

        function showImage(imageUrl) {
            setImage(imageUrl);
            sendConfigEvent();
        }

        function sendConfigEvent() {
            $rootScope.$broadcast('pipNavHeaderImageChanged', config);
        }

    };

    function getConfig() {
        return config;
    }

    // Show navigation icon
    function clear() {
        config.defaultImageUrl = null;
    }

    function setImage(imageUrl) {
        config.defaultImageUrl = imageUrl;
    }

}

angular
    .module('pipNavHeader')
    .provider('pipNavHeader', NavHeaderProvider);
