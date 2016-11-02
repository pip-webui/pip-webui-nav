'use strict';

// Prevent junk from going into typescript definitions
(() => {

function TabsDirectiveController($scope, $element, $attrs, $mdMedia, $injector, $rootScope) {
    "ngInject";

    var pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null, 
        currentTheme = 'default';
    if (pipTheme)
        currentTheme = pipTheme.use();
    else if ($rootScope.$theme)
        currentTheme = $rootScope.$theme;

    $scope.class = ($attrs.class || '') + ' md-' + currentTheme + '-theme';

    if (pipTranslate) {
        if ($scope.tabs.length > 0 && $scope.tabs[0].title) {
            pipTranslate.translateObjects($scope.tabs, 'title', 'nameLocal');
        } else {
            pipTranslate.translateObjects($scope.tabs, 'name', 'nameLocal');
        }
    }
    
    $scope.$mdMedia = $mdMedia;
    $scope.tabs = ($scope.tabs && _.isArray($scope.tabs)) ? $scope.tabs : [];

    var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    if (pipTranslate) {
        if ($scope.tabs.length > 0 && $scope.tabs[0].title) {
            pipTranslate.translateObjects($scope.tabs, 'title', 'nameLocal');
        } else {
            pipTranslate.translateObjects($scope.tabs, 'name', 'nameLocal');
        }
    }

    $scope.activeIndex = $scope.activeIndex || 0;
    $scope.activeTab = $scope.activeIndex;

    $scope.disabled = function () {
        if ($scope.ngDisabled) {
            return $scope.ngDisabled();
        }
    };

    $scope.tabDisabled = function (index) {
        return ($scope.disabled() && $scope.activeIndex != index);
    };

    $scope.onSelect = function (index) {
        if ($scope.disabled()) return;

        $scope.activeIndex = index;
        $scope.activeTab = $scope.activeIndex;
        if ($scope.select) {
            $scope.select($scope.tabs[$scope.activeIndex], $scope.activeIndex);
        }
    };

    $scope.showShadow = function () {
        if ($scope.showTabsShadow) {
            return $scope.showTabsShadow();
        } else {
            return false;
        }
    };

    $scope.show = function () {
        if ($scope.showTabs) {
            return $scope.showTabs();
        } else {
            return true;
        }
    };
}


function tabsDirective() {
    return {
        restrict: 'E',
        scope: {
            ngDisabled: '&',
            tabs: '=pipTabs',
            showTabs: '&pipShowTabs',
            showTabsShadow: '&pipTabsShadow',
            activeIndex: '=pipActiveIndex',
            select: '=pipTabsSelect'
        },
        templateUrl: 'tabs/Tabs.html',
        controller: TabsDirectiveController
    };
}


angular
    .module("pipTabs", ['pipNav.Templates'])
    .directive('pipTabs', tabsDirective);

})();