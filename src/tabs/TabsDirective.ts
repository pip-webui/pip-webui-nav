'use strict';

// Prevent junk from going into typescript definitions
(() => {

    function TabsDirectiveController($scope, $element, $attrs, $mdMedia, $injector, $rootScope, $parse, $timeout) {
        "ngInject";

        var pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null,
            pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null,
            pipTabIndex = $attrs.pipTabIndex ? parseInt($attrs.pipTabIndex) : 0,
            currentTheme = 'default';

        $scope.selected = {};

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

        if (pipTabIndex) {
            $timeout(function () {
                let a = $element.find('md-tabs-canvas');
                if (a && a[0]) {
                    angular.element(a[0]).attr('tabindex', pipTabIndex);
                }
                a.on('focusout', function () {
                    angular.element(a[0]).attr('tabindex', pipTabIndex);
                    $timeout(function () {
                        angular.element(a[0]).attr('tabindex', pipTabIndex);
                    }, 50);
                });
            }, 1000);
        }
        
        $scope.media = pipMedia !== undefined ? pipMedia : $mdMedia;
        $scope.tabs = ($scope.tabs && _.isArray($scope.tabs)) ? $scope.tabs : [];

        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            if ($scope.tabs.length > 0 && $scope.tabs[0].title) {
                pipTranslate.translateObjects($scope.tabs, 'title', 'nameLocal');
            } else {
                pipTranslate.translateObjects($scope.tabs, 'name', 'nameLocal');
            }
        }

        $scope.selected.activeIndex = $scope.activeIndex || 0;
        $scope.selected.activeTab = $scope.selected.activeIndex;

        $scope.disabled = disabled;
        $scope.tabDisabled = tabDisabled;
        $scope.onSelect = onSelect;
        $scope.showShadow = showShadow;
        $scope.show = show;

        if (toBoolean($attrs.pipRebind)) {
            $scope.$watch('activeIndex', function (newValue) {
                $scope.selected.activeIndex = newValue || 0;
                $scope.selected.activeTab = $scope.selected.activeIndex;
            });
        }

        return;

        function disabled() {
            if ($scope.ngDisabled) {
                return $scope.ngDisabled();
            }
        };

        function tabDisabled(index) {
            return ($scope.disabled() && $scope.selected.activeIndex != index);
        };

        function onSelect(index) {
            if ($scope.disabled()) return;
            $scope.activeIndex = index;
            $scope.selected.activeIndex = index;
            $scope.selected.activeTab = $scope.selected.activeIndex;
            if ($scope.select) {
                $scope.select($scope.tabs[$scope.selected.activeIndex], $scope.selected.activeIndex);
            }
        };

        function showShadow() {
            if ($scope.showTabsShadow) {
                return $scope.showTabsShadow();
            } else {
                return false;
            }
        };

        function show() {
            if ($scope.showTabs) {
                return $scope.showTabs();
            } else {
                return true;
            }
        };

        function toBoolean(value) {
            if (value == null) return false;
            if (!value) return false;
            value = value.toString().toLowerCase();
            return value == '1' || value == 'true';
        }

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