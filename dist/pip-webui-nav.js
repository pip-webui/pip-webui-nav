/**
 * @file Registration of navigation WebUI controls
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    angular.module('pipNav', [        
        'pipDropdown',
        'pipTabs',

        'pipAppBar',
        'pipSideNav'
    ]);
    
})();



(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('appbar/appbar.html',
    '<!--\n' +
    '@file App Bar component\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-toolbar md-theme-watch="true" ng-if="!$partialReset" ng-class="config.ngClasses" class="{{ config.cssClass }}">\n' +
    '\n' +
    '    <div class="md-toolbar-tools rp24-flex lp24-flex" ng-if="!searchEnabled">\n' +
    '        <!-- Navigation Icon -->\n' +
    '        <md-button class="md-icon-button flex-fixed p0"\n' +
    '                   ng-if="config.navIconType != \'none\'"\n' +
    '                   ng-class="{ \'pip-third-party\': getParty() && !getUser(\'owner\') }"\n' +
    '                   ng-click="onNavIconClick()"\n' +
    '                   aria-label="menu">\n' +
    '            <!-- Menu icon -->\n' +
    '            <md-icon ng-if="config.navIconType==\'menu\' && (!getParty() || getUser(\'owner\'))"\n' +
    '                md-svg-icon="icons:menu"></md-icon>\n' +
    '            <!-- Party avatar -->\n' +
    '            <pip-avatar ng-if="config.navIconType==\'menu\' && (getParty() && !getUser(\'owner\'))"\n' +
    '                        pip-rebind-avatar="true"\n' +
    '                        pip-rebind="true"\n' +
    '                        pip-image-url="partyAvatarUrl"\n' +
    '                        pip-party-id="getParty(\'id\')" class="pip-face"\n' +
    '                        pip-party-name="getParty(\'name\')">\n' +
    '            </pip-avatar>\n' +
    '            <!-- Back icon -->\n' +
    '            <md-icon ng-if="config.navIconType==\'back\'"\n' +
    '                md-svg-icon="icons:arrow-left"></md-icon>\n' +
    '        </md-button>\n' +
    '        \n' +
    '        <!-- Title -->            \n' +
    '        <div class="flex-var text-overflow">\n' +
    '            <!-- Logo -->\n' +
    '            <img class="pip-appbar-logo" \n' +
    '                ng-if="config.titleType == \'logo\'"\n' +
    '                ng-src="{{config.titleLogo}}"/>\n' +
    '                \n' +
    '            <!-- Title --> \n' +
    '            <div ng-if="config.titleType == \'text\'" class="text-overflow pip-appbar-text">\n' +
    '                <!-- Search criteria -->\n' +
    '                <span ng-if="config.searchCriteria"\n' +
    '                    ng-click="onSearchEnable()">{{config.searchCriteria}} -</span>\n' +
    '                <!-- Text title -->\n' +
    '                <span class="text-overflow">{{config.titleText | translate}}</span>\n' +
    '            </div>\n' +
    '\n' +
    '            <!-- Title with or without breadcrumb -->\n' +
    '            <div ng-if="config.titleType==\'breadcrumb\'">\n' +
    '                <div class="hide-xs text-overflow">\n' +
    '                    <!-- Search criteria -->\n' +
    '                    <span ng-if="config.searchCriteria"\n' +
    '                      ng-click="onSearchEnable()">{{config.searchCriteria}} -</span>\n' +
    '                    <!-- Breadcrumb navigation -->\n' +
    '                    <span class="pip-appbar-breadcrumb"\n' +
    '                        ng-repeat-start="item in config.titleBreadcrumb"\n' +
    '                        ng-click="onBreadcrumbClick(item)"\n' +
    '                        ng-init="stepWidth = 100/(config.titleBreadcrumb.length + 1)"\n' +
    '                        ng-style="{\'max-width\': stepWidth + \'%\'}">\n' +
    '                        {{item.title | translate}}\n' +
    '                    </span>\n' +
    '                    <md-icon ng-repeat-end md-svg-icon="icons:chevron-right"></md-icon>\n' +
    '                    <!-- Text title -->\n' +
    '                    <span class="pip-title">{{config.titleText | translate}}</span>\n' +
    '                </div>\n' +
    '\n' +
    '                <!-- Mobile breadcrumb dropdown -->\n' +
    '                <md-menu xmd-offset="0 48" class="hide-gt-xs">\n' +
    '                    <span class="pip-appbar-mobile-breadcrumb layout-row"\n' +
    '                        ng-click="$mdOpenMenu()"\n' +
    '                        md-ink-ripple\n' +
    '                        aria-label="open breadcrumb">\n' +
    '                        <span class="text-overflow">\n' +
    '                            <!-- Search criteria -->\n' +
    '                            <span ng-if="config.searchCriteria"\n' +
    '                                ng-click="onSearchEnable()">{{config.searchCriteria}} -</span>\n' +
    '                            {{config.titleText | translate}}\n' +
    '                        </span>\n' +
    '                        <md-icon class="m0 flex-none" md-svg-icon="icons:triangle-down"></md-icon>\n' +
    '                    </span>\n' +
    '                    <md-menu-content width="3">\n' +
    '                        <md-menu-item  ng-repeat="item in config.titleBreadcrumb" >\n' +
    '                            <md-button ng-click="onBreadcrumbClick(item)"><span>{{item.title | translate}}</span></md-button>\n' +
    '                        </md-menu-item>\n' +
    '                        <md-menu-item  >\n' +
    '                            <md-button><span class="text-grey">{{config.titleText | translate}}</span></md-button>\n' +
    '                        </md-menu-item>\n' +
    '                    </md-menu-content>\n' +
    '                </md-menu>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '\n' +
    '        <div class="flex-fixed pip-appbar-actions layout-row"\n' +
    '             ng-class="{ \'pip-language-action\': config.actionsType==\'language\' }">\n' +
    '            <!-- Laguage picker -->\n' +
    '            <md-menu ng-if="config.actionsType==\'language\'"\n' +
    '                md-position-mode="target-right target">\n' +
    '                <span class="pip-appbar-language"\n' +
    '                    ng-click="$mdOpenMenu()"\n' +
    '                    aria-label="language selection">\n' +
    '                    {{language() | translate}}\n' +
    '                    <md-icon md-svg-icon="icons:triangle-down"></md-icon>\n' +
    '                </span>\n' +
    '                <md-menu-content width="3">\n' +
    '                    <md-menu-item ng-repeat="lang in config.languages">\n' +
    '                        <md-button ng-click="onLanguageClick(lang)">{{lang | translate}}</md-button>\n' +
    '                    </md-menu-item>\n' +
    '                </md-menu-content>\n' +
    '            </md-menu>\n' +
    '\n' +
    '            <!-- Search toggle -->\n' +
    '            <md-button class="md-icon-button m0"\n' +
    '                       ng-if="config.searchVisible"\n' +
    '                       ng-click="onSearchEnable()"\n' +
    '                       aria-label="open search">\n' +
    '                <!--<md-tooltip>{{::\'APPBAR_SEARCH\' | translate}}</md-tooltip>-->\n' +
    '                <md-icon md-svg-icon="icons:search"></md-icon>\n' +
    '            </md-button>\n' +
    '\n' +
    '            <!-- Actions -->\n' +
    '            <div ng-if="config.actionsType==\'list\'">\n' +
    '\n' +
    '                <!-- Global primary actions -->\n' +
    '                <md-menu md-position-mode="target-right target" ng-repeat="action in config.primaryGlobalActions">\n' +
    '                    <md-button class="pip-appbar-action md-icon-button m0"\n' +
    '                               ng-class="{ \'pip-appbar-hide-sm\': action.hideSmall }"\n' +
    '                               ng-click="onActionClick(action, $mdOpenMenu);"\n' +
    '                               ng-hide="actionHidden(action)"\n' +
    '                               aria-label="{{action.tooltip | translate}}">\n' +
    '                        <!--<md-tooltip ng-if="action.tooltip">{{action.tooltip | translate}}</md-tooltip>-->\n' +
    '                        <div class="pip-appbar-badge color-badge-bg" ng-if="action.count > 0">\n' +
    '                            {{actionCount(action)}}\n' +
    '                        </div>\n' +
    '                        <md-icon md-svg-icon="{{action.icon}}"></md-icon>\n' +
    '                    </md-button>\n' +
    '                    <md-menu-content width="3" ng-show="action.menu">\n' +
    '                        <md-menu-item ng-repeat-start="subAction in action.subActions"\n' +
    '                                      ng-if="!subAction.divider"\n' +
    '                                      ng-hide="actionHidden(subAction)">\n' +
    '                            <md-button ng-hide="subAction.divider"\n' +
    '                                       ng-click="onActionClick(subAction)">\n' +
    '                                {{subAction.title | translate}}\n' +
    '                            </md-button>\n' +
    '                        </md-menu-item>\n' +
    '                        <md-menu-divider ng-if="subAction.divider" ng-repeat-end></md-menu-divider>\n' +
    '                    </md-menu-content>\n' +
    '                </md-menu>\n' +
    '\n' +
    '                <!-- Local primary actions -->\n' +
    '                <md-menu md-position-mode="target-right target" ng-repeat="action in config.primaryLocalActions">\n' +
    '                    <md-button class="pip-appbar-action md-icon-button m0"\n' +
    '                               ng-class="{ \'pip-appbar-hide-sm\': action.hideSmall,\n' +
    '                                            \'pip-appbar-show-sm\': action.showSmall,}"\n' +
    '                               ng-click="onActionClick(action, $mdOpenMenu);"\n' +
    '                               ng-hide="actionHidden(action)"\n' +
    '                               aria-label="{{action.tooltip | translate}}">\n' +
    '                        <!--<md-tooltip ng-if="action.tooltip">{{action.tooltip | translate}}</md-tooltip>-->\n' +
    '                        <div class="pip-appbar-badge" ng-show="action.count > 0">\n' +
    '                            {{actionCount(action)}}\n' +
    '                        </div>\n' +
    '                        <md-icon md-svg-icon="{{action.icon}}"></md-icon>\n' +
    '                    </md-button>\n' +
    '                    <md-menu-content width="3" >\n' +
    '                        <md-menu-item ng-repeat-start="subAction in action.subActions"\n' +
    '                                      ng-if="!subAction.divider"\n' +
    '                                      ng-hide="actionHidden(subAction)">\n' +
    '                            <md-button ng-hide="subAction.divider"\n' +
    '                                       ng-click="onActionClick(subAction)">\n' +
    '                                {{subAction.title | translate}}\n' +
    '                            </md-button>\n' +
    '                        </md-menu-item>\n' +
    '                        <md-menu-divider ng-if="subAction.divider" ng-repeat-end></md-menu-divider>\n' +
    '                    </md-menu-content>\n' +
    '                </md-menu>\n' +
    '\n' +
    '                <!-- Secondary actions dropdown -->\n' +
    '                <md-menu ng-if="secondaryActionsVisible()"\n' +
    '                    md-position-mode="target-right target">\n' +
    '                    <md-button class="md-icon-button m0"\n' +
    '                        ng-click="onSecondaryActionClick(); openMenu($mdOpenMenu, $event);"\n' +
    '                        aria-label="open actions">\n' +
    '                        <md-icon md-svg-icon="icons:vdots"></md-icon>\n' +
    '                    </md-button>\n' +
    '                    <md-menu-content width="3">\n' +
    '                        <!-- Local secondary actions -->\n' +
    '                        <md-menu-item ng-repeat-start="action in config.secondaryLocalActions"\n' +
    '                            ng-if="!action.divider"\n' +
    '                            ng-hide="actionHidden(action)">\n' +
    '                            <md-button ng-hide="action.divider"\n' +
    '                                ng-click="onActionClick(action)">\n' +
    '                                {{action.title | translate}}\n' +
    '                            </md-button>\n' +
    '                        </md-menu-item>\n' +
    '                        <md-menu-divider ng-if="action.divider" ng-repeat-end></md-menu-divider>\n' +
    '\n' +
    '                        <md-menu-divider ng-if="secondaryDividerVisible()" >\n' +
    '\n' +
    '                        </md-menu-divider>\n' +
    '                        <!-- Global secondary actions -->\n' +
    '                        <md-menu-item ng-repeat-start="action in config.secondaryGlobalActions"\n' +
    '                            ng-if="!action.divider"\n' +
    '                            ng-hide="actionHidden(action)">\n' +
    '                            <md-button ng-hide="action.divider"\n' +
    '                                ng-click="onActionClick(action)">\n' +
    '                                {{action.title | translate}}\n' +
    '                            </md-button>                    \n' +
    '                        </md-menu-item>\n' +
    '                        <md-menu-divider ng-if="action.divider" ng-repeat-end>\n' +
    '                        </md-menu-divider>                        \n' +
    '                    </md-menu-content>\n' +
    '                </md-menu>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="md-toolbar-tools layout-row" ng-if="searchEnabled">\n' +
    '        <md-button class="md-icon-button" \n' +
    '            aria-label="start search" \n' +
    '            ng-click="onSearchClick()">\n' +
    '            <md-icon md-svg-icon="icons:search"></md-icon>\n' +
    '        </md-button>\n' +
    '        <input class="pip-search-text flex"\n' +
    '            type="search"\n' +
    '            ng-model="search.text" \n' +
    '            ng-keydown="onSearchKeyDown($event)" />\n' +
    '        <md-button class="md-icon-button" \n' +
    '            aria-label="clear search" \n' +
    '            ng-click="onSearchClear()">\n' +
    '            <md-icon md-svg-icon="icons:cross-circle"></md-icon>\n' +
    '        </md-button>\n' +
    '    </div>\n' +
    '\n' +
    '</md-toolbar>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dropdown/dropdown.html',
    '<md-content class="md-subhead md-hue-1 {{class}}" ng-if="show()" ng-class="{\'md-whiteframe-3dp\': $mdMedia(\'xs\')}">\n' +
    '    <div class="pip-divider position-top m0"></div>\n' +
    '        <md-select ng-model="selectedIndex" ng-disabled="disabled()" md-container-class="pip-full-width-dropdown" aria-label="DROPDOWN" md-ink-ripple md-on-close="onSelect(selectedIndex)">\n' +
    '            <md-option ng-repeat="action in actions" value="{{ ::$index }}" ng-selected="activeIndex == $index ? true : false">\n' +
    '                {{ (action.title || action.name) | translate }}\n' +
    '            </md-option>\n' +
    '        </md-select>\n' +
    '</md-content>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('sidenav/sidenav.html',
    '<!--\n' +
    '@file Side Nav component\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-sidenav class="md-sidenav-left md-whiteframe-z2 pip-sidenav" \n' +
    '    md-component-id="pip-sidenav" \n' +
    '    ng-if="!$partialReset" \n' +
    '    pip-focused>\n' +
    '\n' +
    '    <md-toolbar class="pip-sidenav-header"\n' +
    '                ng-class="{\'pip-sidenav-owner\': getUser(\'owner\')}"\n' +
    '                md-theme="{{ $theme|| getUser(\'theme\') || config.theme }}"\n' +
    '                ng-hide="!getParty() && !primaryPartyAvatar && !secondaryPartyAvatar">\n' +
    '\n' +
    '            <md-button class="pip-sidenav-party md-icon-button"\n' +
    '                       ng-click="onPartyClick()"\n' +
    '                       aria-label="current party">\n' +
    '                <pip-avatar ng-if="!$avatarReset"\n' +
    '                            pip-party-id="getParty(\'id\')"\n' +
    '                            pip-default-icon="icon-person"\n' +
    '                            pip-party-name="getParty(\'name\')"\n' +
    '                            pip-image-url="primaryPartyAvatar"\n' +
    '                            pip-rebind-avatar="true"\n' +
    '                            pip-rebind="true">\n' +
    '                </pip-avatar>\n' +
    '            </md-button>\n' +
    '\n' +
    '            <md-button class="pip-sidenav-user md-icon-button"\n' +
    '                       ng-click="onUserClick()"\n' +
    '                       ng-hide="getUser(\'owner\')"\n' +
    '                       aria-label="current user">\n' +
    '                <pip-avatar class="pic-pic pip-face-ld"\n' +
    '                            ng-if="!$avatarReset"\n' +
    '                            pip-default-icon="icon-person"\n' +
    '                            pip-rebind="true"\n' +
    '                            pip-rebind-avatar="true"\n' +
    '                            pip-party-id="getUser(\'id\')"\n' +
    '                            pip-party-name="getUser(\'name\')"\n' +
    '                            pip-image-url="secondaryPartyAvatar">\n' +
    '                </pip-avatar>\n' +
    '            </md-button>\n' +
    '        \n' +
    '        <div class="pip-sidenav-party-text">\n' +
    '            <a class="pip-sidenav-party-pri cursor-pointer"\n' +
    '                ng-click="onPartyClick()">{{ partyName || getParty(\'name\')}}</a>\n' +
    '            <div class="pip-sidenav-party-sec"\n' +
    '                ng-show="getConnection() && !getUser(\'owner\')">\n' +
    '                {{getConnection(\'relation\') | translate}}\n' +
    '                <span ng-show="getConnection(\'relation_since\')">\n' +
    '                    {{::\'SIDENAV_SINCE\' | translate}}\n' +
    '                    {{getConnection(\'relation_since\') | formatLongDate}}\n' +
    '                </span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </md-toolbar>\n' +
    '\n' +
    '    <md-list>\n' +
    '        <div class="pip-section" ng-repeat="section in config.sections"\n' +
    '            ng-hide="section.access && !section.access(getParty(), getUser(), section)">\n' +
    '            \n' +
    '            <md-divider ng-show="$index > 0 && !isSectionEmpty(section.links)"></md-divider>\n' +
    '            <md-subheader ng-show="section.title">{{::section.title | translate}}</md-subheader>\n' +
    '            \n' +
    '            <md-list-item class="pip-focusable no-border" \n' +
    '                ng-repeat="link in section.links"\n' +
    '                ng-click="onLinkClick($event, link)"\n' +
    '                ng-hide="link.access && !link.access(getParty(), getUser(), link)">\n' +
    '                <md-icon md-svg-icon="{{link.icon}}" \n' +
    '                    ng-hide="!link.icon" \n' +
    '                    class="tm0 bm0"></md-icon>\n' +
    '                <p>{{::link.title | translate}}</p>\n' +
    '            </md-list-item>\n' +
    '        </div>\n' +
    '    </md-list>\n' +
    '\n' +
    '</md-sidenav>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/tabs.html',
    '<md-toolbar class="pip-nav {{ class }}" ng-class="{\'pip-visible\': show(), \'pip-shadow\': showShadow()}">\n' +
    '    <md-tabs ng-if="$mdMedia(\'gt-xs\')" md-selected="activeTab" ng-class="{\'disabled\': disabled()}" md-stretch-tabs="true" md-dynamic-height="true">\n' +
    '        <md-tab ng-repeat="tab in tabs track by $index"  ng-disabled="tabDisabled($index)" md-on-select="onSelect($index)">\n' +
    '            <md-tab-label>\n' +
    '                {{ ::tab.nameLocal }}\n' +
    '                <div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">{{ ::tab.newCounts }}</div>\n' +
    '                <div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div>\n' +
    '            </md-tab-label>\n' +
    '        </md-tab>\n' +
    '    </md-tabs>\n' +
    '    <md-content class="md-subhead md-hue-1" ng-if="$mdMedia(\'xs\')">\n' +
    '        <div class="pip-divider position-top m0"></div>\n' +
    '        <md-select ng-model="activeIndex" ng-disabled="disabled()"\n' +
    '                   md-container-class="pip-full-width-dropdown" aria-label="SELECT" md-ink-ripple md-on-close="onSelect(activeIndex)">\n' +
    '            <md-option ng-repeat="tab in tabs track by $index" value="{{ ::$index }}" >\n' +
    '                {{ ::tab.nameLocal }}\n' +
    '                <div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">{{ ::tab.newCounts }}</div>\n' +
    '                <div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div>\n' +
    '            </md-option>\n' +
    '        </md-select>\n' +
    '    </md-content>\n' +
    '</md-toolbar>\n' +
    '');
}]);
})();

/**
 * @file Application App Bar component
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _, $) {
    'use strict';

    var thisModule = angular.module('pipAppBar',
        ['ngMaterial', 'pipTranslate', 'pipNav.Templates', 'pipAppBar.Service']);

    thisModule.config(['pipTranslateProvider', function (pipTranslateProvider) {

        pipTranslateProvider.translations('en', {
            'APPBAR_SEARCH': 'Search'
        });

        pipTranslateProvider.translations('ru', {
            'APPBAR_SEARCH': 'Поиск'
        });

    }]);

    // Main application header directive
    thisModule.directive('pipAppbar', function () {
        return {
            restrict: 'E',
            scope: {
                title: '=pipTitle',
                showMenu: '=pipShowMenu',
                localActions: '=pipLocalActions',
                globalActions: '=pipGlobalActions',
                partyAvatarUrl: '=pipPartyAvatarUrl'
            },
            replace: false,
            templateUrl: function (element, attr) {
                return 'appbar/appbar.html';
            },
            controller: 'pipAppBarController'
        };
    });

    thisModule.controller('pipAppBarController',
        ['$scope', '$element', '$attrs', '$rootScope', '$window', '$state', '$location', 'pipTranslate', 'pipAppBar', function ($scope, $element, $attrs, $rootScope, $window, $state, $location, pipTranslate, pipAppBar) {
            // Initialize default application title
            if ($scope.title) {
                pipAppBar.showTitleText($scope.title);
            }
            if ($scope.showMenu) {
                pipAppBar.showMenuNavIcon();
            }
            // Apply class and call resize
            $element.addClass('pip-appbar');
            $scope.$emit('pipResizeWindow');

            $scope.config = pipAppBar.config();

            if ($scope.localActions) {
                pipAppBar.showLocalActions();
                $scope.config.primaryLocalActions = $scope.localActions[0];
                $scope.config.secondaryLocalActions = $scope.localActions[1];
            }

            if ($scope.globalActions) {
                pipAppBar.showLocalActions();
                $scope.config.primaryGlobalActions = $scope.globalActions[0];
                $scope.config.secondaryGlobalActions = $scope.globalActions[0];
            }

            $scope.searchEnabled = false;
            $scope.search = {text: ''};

            $rootScope.$on('pipAppBarChanged', onAppBarChanged);

            $scope.language = getLanguage;
            $scope.actionHidden = actionHidden;
            $scope.actionCount = actionCount;
            $scope.secondaryActionsVisible = secondaryActionsVisible;
            $scope.secondaryDividerVisible = secondaryDividerVisible;

            $scope.onNavIconClick = onNavIconClick;
            $scope.onBreadcrumbClick = onBreadcrumbClick;
            $scope.onLanguageClick = onLanguageClick;
            $scope.onActionClick = onActionClick;

            $scope.onSearchEnable = onSearchEnable;
            $scope.onSearchClick = onSearchClick;
            $scope.onSearchClear = onSearchClear;
            $scope.onSearchKeyDown = onSearchKeyDown;

            $scope.getParty = getParty;
            $scope.getUser = getUser;

            $scope.openMenu = openMenu;

            function openMenu($mdOpenMenu, ev) {
                $scope.originatorEv = ev;
                $mdOpenMenu(ev);
            }

            function getParty(prop) {
                if (!$rootScope.$party) {
                    return;
                }
                if (prop) {
                    return $rootScope.$party[prop];
                }

                return $rootScope.$party;
            }

            function getUser(prop) {
                if (!$rootScope.$user) {
                    return;
                }
                if (prop) {
                    return $rootScope.$user[prop];
                }

                return $rootScope.$user;
            }

            function onAppBarChanged(event, config) {
                $scope.config = config;
                $scope.searchEnabled = false;
                $scope.search.text = '';
            }

            function getLanguage() {
                return pipTranslate.use();
            }

            function actionHidden(action) {
                return action.access && !action.access($rootScope.$party, $rootScope.$user, action);
            }

            function actionCount(action) {
                if (action.count === null || action.count <= 0) {
                    return '';
                }
                if (action.count > 99) {
                    return '!';
                }

                return action.count;
            }

            function calcActions(actions) {
                var count = 0;

                _.each(actions, function (action) {
                    if (!actionHidden(action)) {
                        count++;
                    }
                });

                return count;
            }

            function secondaryActionsVisible() {
                return calcActions($scope.config.secondaryGlobalActions) > 0 ||
                    calcActions($scope.config.secondaryLocalActions) > 0;
            }

            function secondaryDividerVisible() {
                return calcActions($scope.config.secondaryGlobalActions) > 0 &&
                    calcActions($scope.config.secondaryLocalActions) > 0;
            }

            function onNavIconClick() {
                var breadcrumb, backCallback;

                if (_.isFunction($scope.config.navIconCallback)) {
                    // Execute nav icon callback
                    $scope.config.navIconCallback();

                    return;
                }
                if ($scope.config.navIconType !== 'back') {
                    // Raise an event
                    $rootScope.$broadcast('pipAppBarNavIconClicked');

                    return;
                }
                if ($scope.config.titleType === 'breadcrumb') {
                    breadcrumb = $scope.config.titleBreadcrumb;
                    // Go to the last breadcrumb item
                    if (_.isArray(breadcrumb) && breadcrumb.length > 0) {
                        backCallback = breadcrumb[breadcrumb.length - 1].click;
                        if (_.isFunction(backCallback)) {
                            backCallback();
                        } else {
                            $window.history.back();
                        }
                    } else {
                        $window.history.back();
                    }
                } else {
                    // Go back in history
                    $window.history.back();
                }
            }

            function onBreadcrumbClick(item) {
                if (_.isFunction(item.click)) {
                    item.click(item);
                }
            }

            function onLanguageClick(language) {
                setTimeout(function () {
                    pipTranslate.use(language);
                    $rootScope.$apply();
                }, 0);
            }

            function processStateParams(params) {
                var result = {}, prop;

                if (params === null) {
                    return null;
                }
                for (prop in params) {
                    if (params.hasOwnProperty(prop)) {
                        if (params[prop] === ':party_id') {
                            result[prop] = $rootScope.$party ? $rootScope.$party.id : null;
                        } else if (params[prop] === ':user_id') {
                            result[prop] = $rootScope.$user ? $rootScope.$user.id : null;
                        } else {
                            result[prop] = params[prop];
                        }
                    }
                }

                return result;
            }

            function processUrlParams(url) {
                var result;

                if (url === null) {
                    return null;
                }
                result = url.replace(':party_id', $rootScope.$party ? $rootScope.$party.id : '');
                result = result.replace(':user_id', $rootScope.user ? $rootScope.$user.id : '');

                return result;
            }

            function focusSearchText() {
                var element;

                setTimeout(function () {
                    element = $('.pip-search-text');
                    if (element.length > 0) {
                        element.focus();
                    }
                }, 0);
            }

            function onActionClick(action, $mdOpenMenu) {
                if (!action || action.divider) {
                    return;
                }

                if (action.close) {
                    $scope.originatorEv = null;
                }

                if (action.menu) {
                    $mdOpenMenu($scope.originatorEv);

                    return;
                }

                if (action.callback) {
                    action.callback();

                    return;
                }
                if (action.href) {
                    $window.location.href = processUrlParams(action.href);

                    return;
                }
                if (action.url) {
                    $location.url(processUrlParams(action.url));

                    return;
                }
                if (action.state) {
                    $state.go(action.state, processStateParams(action.stateParams));

                    return;
                }
                if (action.event) {
                    $rootScope.$broadcast(action.event);
                } else {
                    // Otherwise raise notification
                    $rootScope.$broadcast('pipAppBarActionClicked', action.name);
                }
            }

            function onSearchEnable() {
                $scope.search.text = $scope.config.searchCriteria;
                $scope.searchEnabled = true;
                focusSearchText();
            }

            function onSearchClick() {
                var searchText = $scope.search.text;

                $scope.search.text = '';
                $scope.searchEnabled = false;

                if ($scope.config.searchCallback) {
                    $scope.config.searchCallback(searchText);
                } else {
                    $rootScope.$broadcast('pipAppBarSearchClicked', searchText);
                }
            }

            function onSearchClear() {
                if ($scope.search.text) {
                    $scope.search.text = '';

                    focusSearchText();
                } else {
                    $scope.searchEnabled = false;
                    onSearchClick();
                }
            }

            function onSearchKeyDown(event) {
                // Enter pressed
                if (event.keyCode === 13) {
                    $scope.onSearchClick();

                    return;
                }
                // ESC pressed
                if (event.keyCode === 27) {
                    $scope.searchEnabled = false;
                }
            }
        }]
    );

})(window.angular, window._, window.jQuery);

/**
 * @file Application App Bar service
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipAppBar.Service', []);

    thisModule.provider('pipAppBar', function () {
        var config = {
            appTitleText: null,
            appTitleLogo: 'images/piplife_logo.svg',

            // Theme to be applied to the header
            theme: 'blue',
            cssClass: '',
            ngClasses: {},

            // Type of nav icon: 'back', 'menu' or 'none'
            navIconType: 'none',
            // Handle nav icon click event
            navIconCallback: false,

            // Type of title: 'logo', 'text', 'breadcrumb' or 'none'
            titleType: 'none',
            // URL to logo
            titleLogo: null,
            // Title text
            titleText: null,
            // Navigation breadcrumb [{ title, click }],
            titleBreadcrumb: null,

            // Type of actions: 'language', 'list' or 'none'
            actionsType: 'none',

            // Language options
            languages: ['en', 'ru'],

            // Search visible
            searchVisible: false,
            // Search criteria
            searchCriteria: '',
            // History for search autocomplete
            searchHistory: [],
            // Callback for search
            searchCallback: null,

            // Primary global actions visible on the screen
            primaryGlobalActions: [],
            // Primary local actions visible on the screen
            primaryLocalActions: [],

            // Secondary global actions available in popup
            secondaryGlobalActions: [],
            // Secondary local actions available in popup
            secondaryLocalActions: []
        };

        // Configure global parameters
        this.appTitleText = appTitleText;
        this.appTitleLogo = appTitleLogo;
        this.theme = theme;
        this.globalActions = globalActions;
        this.globalPrimaryActions = globalPrimaryActions;
        this.globalSecondaryActions = globalSecondaryActions;

        // Get the service instance
        this.$get = ['$rootScope', function ($rootScope) {
            return {
                config: getConfig,
                cssClass: cssClass,

                hideNavIcon: hideNavIcon,
                showMenuNavIcon: showMenuNavIcon,
                showBackNavIcon: showBackNavIcon,

                showAppTitleLogo: showAppTitleLogo,
                showAppTitleText: showAppTitleText,
                showTitleLogo: showTitleLogo,
                showTitleText: showTitleText,
                showTitleBreadcrumb: showTitleBreadcrumb,
                hideTitle: hideTitle,

                showLanguage: showLanguage,
                showLocalActions: showLocalActions,
                hideLocalActions: hideLocalActions,
                updateActionCount: updateActionCount,

                showSearch: showSearch,
                hideSearch: hideSearch,
                updateSearchCriteria: updateSearchCriteria,
                updateSearchHistory: updateSearchHistory,

                showShadow: showShadow,
                showShadowSm: showShadowSm,
                showShadowSmXs: showShadowSmXs,
                hideShadow: hideShadow
            };
            // ----------------------

            function getConfig() {
                return config;
            }

            function cssClass(newCssClass) {
                if (newCssClass != undefined) {
                    config.cssClass = newCssClass;
                    sendConfigEvent();
                }

                return config.cssClass;
            }

            // Show, hide appbar shadow
            function showShadowSm() {
                config.ngClasses['pip-shadow'] = false;
                config.ngClasses['pip-shadow-sm'] = true;
                config.ngClasses['pip-shadow-xs'] = false;
                sendConfigEvent();
            }

            function showShadowSmXs() {
                config.ngClasses['pip-shadow'] = false;
                config.ngClasses['pip-shadow-sm'] = true;
                config.ngClasses['pip-shadow-xs'] = true;
                sendConfigEvent();
            }

            function showShadow() {
                config.ngClasses['pip-shadow'] = true;
                sendConfigEvent();
            }

            function hideShadow() {
                config.ngClasses['pip-shadow'] = false;
                config.ngClasses['pip-shadow-sm'] = false;
                config.ngClasses['pip-shadow-xs'] = false;
                sendConfigEvent();
            }

            // Show navigation icon
            function hideNavIcon() {
                config.navIconType = 'none';
                config.navIconCallback = null;
                sendConfigEvent();
            }

            function showMenuNavIcon(click) {
                config.navIconType = 'menu';
                config.navIconCallback = click;
                sendConfigEvent();
            }

            function showBackNavIcon(click) {
                config.navIconType = 'back';
                config.navIconCallback = click;

                sendConfigEvent();
            }

            // Show title
            function hideTitle() {
                config.titleType = 'none';
                config.titleLogo = null;
                config.titleText = null;
                config.titleBreadcrumb = null;

                sendConfigEvent();
            }

            function showTitleLogo(titleLogo) {
                config.titleType = 'logo';
                config.titleLogo = titleLogo;
                config.titleText = null;
                config.titleBreadcrumb = null;

                sendConfigEvent();
            }

            function showTitleText(titleText) {
                config.titleType = 'text';
                config.titleLogo = null;
                config.titleText = titleText;
                config.titleBreadcrumb = null;

                sendConfigEvent();
            }

            function showTitleBreadcrumb(titleText, titleBreadcrumb) {
                if (_.isArray(titleText)) {
                    titleBreadcrumb = titleText;
                    titleText = titleBreadcrumb[titleBreadcrumb.length - 1].title;
                    titleBreadcrumb.splice(titleBreadcrumb.length - 1, 1);
                }
                config.titleType = 'breadcrumb';
                config.titleLogo = null;
                config.titleText = titleText;
                config.titleBreadcrumb = titleBreadcrumb;
                if (titleBreadcrumb.length > 0) {
                    config.navIconType = config.navIconType === 'none' ? 'back' : config.navIconType;
                    config.navIconCallback = titleBreadcrumb[titleBreadcrumb.length - 1];
                } else {
                    config.navIconType = 'menu';
                    config.navIconCallback = null;
                }

                sendConfigEvent();
            }

            function showAppTitleLogo() {
                showTitleLogo(config.appTitleLogo);
            }

            function showAppTitleText() {
                showTitleText(config.appTitleText);
            }

            // Show actions
            function hideLocalActions() {
                config.actionsType = 'none';
                config.primaryLocalActions = [];
                config.secondaryLocalActions = [];

                sendConfigEvent();
            }

            function showLanguage(languages) {
                config.actionsType = 'language';
                config.languages = languages || config.languages;

                sendConfigEvent();
            }

            function showLocalActions(primaryActions, secondaryActions) {
                config.actionsType = 'list';
                config.primaryLocalActions = primaryActions || [];
                config.secondaryLocalActions = secondaryActions || [];

                sendConfigEvent();
            }

            function updateActionCount(actionName, count) {
                // Update global actions
                _.each(config.primaryGlobalActions, function (action) {
                    if (action.name === actionName) {
                        action.count = count;
                    }
                });
                // Update local action
                _.each(config.primaryLocalActions, function (action) {
                    if (action.name === actionName) {
                        action.count = count;
                    }
                });
                sendConfigEvent();
            }

            // Show actions
            function showSearch(callback, criteria, history) {
                config.searchVisible = true;
                config.searchCallback = callback;
                config.searchCriteria = criteria;
                config.searchHistory = history;

                sendConfigEvent();
            }

            function hideSearch() {
                config.searchVisible = false;
                config.searchCallback = null;
                config.searchCriteria = null;

                sendConfigEvent();
            }

            function updateSearchCriteria(criteria) {
                config.searchCriteria = criteria;
                sendConfigEvent();
            }

            function updateSearchHistory(history) {
                config.searchHistory = history;
                sendConfigEvent();
            }

            function sendConfigEvent() {
                $rootScope.$broadcast('pipAppBarChanged', config);
            }
        }];
        function appTitleText(newTitleText) {
            if (newTitleText) {
                config.appTitleText = newTitleText;
            }

            return config.appTitleText;
        }

        function appTitleLogo(newTitleLogo) {
            if (newTitleLogo) {
                config.appTitleLogo = newTitleLogo;
            }

            return config.appTitleLogo;
        }

        function theme(theme) {
            config.theme = theme || config.theme;

            return config.theme;
        }

        function globalActions(primaryActions, secondaryActions) {
            config.primaryGlobalActions = primaryActions || [];
            config.secondaryGlobalActions = secondaryActions || [];
        }

        function globalPrimaryActions(primaryActions) {
            config.primaryGlobalActions = primaryActions || [];
        }

        function globalSecondaryActions(secondaryActions) {
            config.secondaryGlobalActions = secondaryActions || [];
        }

    });

})(window.angular, window._);

/**
 * @file Dropdown control
 * @copyright Digital Living Software Corp. 2014-2016
 *
 */

/* global _, angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipDropdown", ['pipAssert', 'pipNav.Templates']);

    thisModule.directive('pipDropdown',
        ['$mdMedia', 'pipAssert', function ($mdMedia, pipAssert) {
            return {
                restrict: 'E',
                scope: {
                    ngDisabled: '&',
                    actions: '=pipActions',
                    showDropdown: '&pipShow',
                    activeIndex: '=pipActiveIndex',
                    select: '=pipDropdownSelect'
                },
                templateUrl: 'dropdown/dropdown.html',
                controller:
                    ['$scope', '$element', '$attrs', 'localStorageService', function ($scope, $element, $attrs, localStorageService) {
                        $scope.class = ($attrs.class || '') + ' md-' + localStorageService.get('theme') + '-theme';
                        pipAssert.isArray($scope.actions, 'pipDropdown: pip-actions attribute should take an array, but take ' + typeof $scope.actions);
                        $scope.$mdMedia = $mdMedia;
                        $scope.actions = ($scope.actions && _.isArray($scope.actions)) ? $scope.actions : [];
                        $scope.activeIndex = $scope.activeIndex || 0;

                        $scope.disabled = function () {
                            if ($scope.ngDisabled()) {
                                return $scope.ngDisabled();
                            } else {
                                return false;
                            }
                        };

                        $scope.onSelect = function (index) {
                            $scope.activeIndex = index;
                            if ($scope.select) {
                                $scope.select($scope.actions[index], $scope.activeIndex);
                            }
                        };

                        $scope.show = function () {
                            if ($scope.showDropdown()) {
                                return $scope.showDropdown();
                            } else {
                                return true;
                            }
                        };

                    }]
            };
        }]
    );

})();

/**
 * @file Application Side Nav component
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipSideNav', 
        ['ngMaterial', 'pipTranslate', 'pipFocused', 'pipNav.Templates', 'pipSideNav.Service']);

    thisModule.config(['pipTranslateProvider', function(pipTranslateProvider) {

        pipTranslateProvider.translations('en', {
            'SIDENAV_SINCE': 'since'
        });

        pipTranslateProvider.translations('ru', {
            'SIDENAV_SINCE': 'с'
        });

    }]);

    // Main application sidenav directive
    thisModule.directive('pipSidenav', function() {
       return {
           restrict: 'EA',
           scope: {
               primaryPartyAvatar: '=pipPrimaryAvatar',
               secondaryPartyAvatar: '=pipSecondaryAvatar',
               partyName: '=pipName'
           },
           replace: false,
           templateUrl: 'sidenav/sidenav.html',
           controller: 'pipSideNavController'
       };
    });

    thisModule.controller('pipSideNavController', 
        ['$scope', '$element', '$state', '$rootScope', '$window', '$location', '$timeout', 'pipState', 'pipTranslate', 'pipSideNav', function ($scope, $element, $state, $rootScope, $window, $location, $timeout, pipState, pipTranslate, pipSideNav) {

            // Apply class and call resize
            $element.addClass('pip-sidenav');

            $scope.config = pipSideNav.config();
            $scope.$avatarReset = false;

            $rootScope.$on('pipAppBarNavIconClicked', onAppBarNavIconClick);
            $rootScope.$on('pipSideNavChanged', onConfigChanged);

            $scope.itemVisible = itemVisible;
            $scope.onUserClick = onUserClick;
            $scope.onPartyClick = onPartyClick;
            $scope.onLinkClick = onLinkClick;
            $scope.isSectionEmpty = isSectionEmpty;

            $scope.getParty = getParty;
            $scope.getUser = getUser;
            $scope.getConnection = getConnection;
            
            return;
            
            //------------------------

            function getParty(prop) {
                if (!$rootScope.$party) {
                    return;
                }
                if (prop) {
                    return $rootScope.$party[prop];
                }

                return $rootScope.$party;
            }

            function getUser(prop) {
                if (!$rootScope.$user) {
                    return;
                }
                if (prop) {
                    return $rootScope.$user[prop];
                }

                return $rootScope.$user;
            }
            
            function getConnection(prop) {
                if (!$rootScope.$connection) {
                    return;
                }
                if (prop) {
                    return $rootScope.$connection[prop];
                }

                return $rootScope.$connection;
            }
            
            function itemVisible(item) {
                return item && item.access && !item.access($rootScope.$party, $rootScope.$user, item);
            }

            function isSectionEmpty(linkCollection) {
                var result = true;
                _.each(linkCollection, function(link){
                    if (!itemVisible(link))
                        result = false;
                });
                return result;
            }

            function onAppBarNavIconClick(event) {
                pipSideNav.open();
            }

            function onConfigChanged(event, config) {
                $scope.config = config;
            }

            function onUserClick() {
                $rootScope.$broadcast('pipSideNavUserClicked');
                pipSideNav.close();
            }

            function onPartyClick() {
                $rootScope.$broadcast('pipSideNavPartyClicked');
                pipSideNav.close();
            }

            function processStateParams(params) {
                if (params == null) return null;

                var result = {};
                for (var prop in params) {
                    if (params.hasOwnProperty(prop)) {
                        if (params[prop] == ':party_id') {
                            result[prop] = $rootScope.$party ? $rootScope.$party.id : null;
                        } else if (params[prop] == ':user_id') {
                            result[prop] = $rootScope.$user ? $rootScope.$user.id : null;
                        } else {
                            result[prop] = params[prop];   
                        }
                    }
                }
                return result;
            }

            function processUrlParams(url) {
                if (url == null) return null;

                var result = url.replace(':party_id', $rootScope.$party ? $rootScope.$party.id : '');
                result = result.replace(':user_id', $rootScope.$user ? $rootScope.$user.id : '');

                return result;
            }

            function onLinkClick(event, link) {
                event.stopPropagation();

                if (!link) {
                    pipSideNav.close();
                    return;
                }

                if (link.href) {
                    if (link.href.split('?')[0] === $window.location.href.split('?')[0]) {
                        pipSideNav.close();
                        return;
                    }

                    pipSideNav.close();
                    $timeout(function() {
                        $window.location.href = processUrlParams(link.href);
                    }, 300);

                    return;
                }
                else if (link.url) {
                    if (link.url.split(/[\s/?]+/)[1] === $location.url().split(/[\s/?]+/)[1]) {
                        pipSideNav.close();
                        return;
                    }

                    pipSideNav.close();
                    $timeout(function() {
                        $location.url(processUrlParams(link.url));
                    }, 300);

                    return;
                }
                else if (link.state) {
                    if ($state.current.name === link.state) {
                        pipSideNav.close();
                        return;
                    }

                    pipSideNav.close();
                    $timeout(function() {
                        pipState.go(link.state, processStateParams(link.stateParams));
                    }, 300);

                    return;
                }
                else if (link.event)
                    $rootScope.$broadcast('pipSideNavLinkClicked', link.event);

                pipSideNav.close();
            }
        }]
    );

})();

/**
 * @file Application Side Nav service
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipSideNav.Service', ['pipAssert', 'pipDebug']);

    thisModule.provider('pipSideNav', ['pipAssertProvider', 'pipDebugProvider', function (pipAssertProvider, pipDebugProvider) {
        var config = {
            // Theme to be applied to the header
            theme: 'blue',
            // Sections with navigation links
            sections: []
        };

        this.theme = theme;
        this.sections = sections;

        this.$get = ['$rootScope', '$mdSidenav', function ($rootScope, $mdSidenav) {
            $rootScope.$on('pipSideNavOpen', open);
            $rootScope.$on('pipSideNavClose', close);

            return {
                config: getConfig,
                theme: setTheme,
                sections: setSections,
                open: open,
                close: close,
                toggle: toggle
            };
            //---------------------

            function getConfig() {
                return config;  
            };
                            
            function setTheme(newTheme) {
                theme(newTheme);
                sendConfigEvent();  
                return config.theme;
            };
                            
            function setSections(newSections) {
                sections(newSections);
                sendConfigEvent();
                return config.sections;  
            };
                            
            function sendConfigEvent() {
                $rootScope.$broadcast('pipSideNavChanged', config);
            };

            function open(event) {
                $mdSidenav('pip-sidenav').open();
            };
                 
            function close(event) {
                $mdSidenav('pip-sidenav').close();   
            };                

            function toggle() {
                $mdSidenav('pip-sidenav').toggle();   
            };                   
        }];

        function theme(newTheme) {
            config.theme = newTheme || config.theme;
            return config.theme;            
        };

        function validateSections(sections) {
            pipAssertProvider.isArray(sections, 'pipSideNavProvider.sections or pipSideNav.sections: sections should be an array');
            _.each(sections, function (section, number) {
                if (section.access) {
                    pipAssertProvider.isFunction(section.access, 'pipSideNavProvider.sections or pipSideNav.sections: in section number '
                        + number + " with title " + section.title + ' access should be a function');
                }
                if (section.links) {
                    pipAssertProvider.isArray(section.links, 'pipSideNavProvider.sections or pipSideNav.sections: in section number '
                        + number + " with title " + section.title + ' links should be an array');
                    _.each(section.links, function (link) {
                        if (link.access) pipAssertProvider.isFunction(link.access, 'pipSideNavProvider.sections or pipSideNav.sections: in section number '
                            + number + " with title " + section.title + ' in link with title ' + link.title + ' access should be a function');
                    });
                }
            });
        }

        function sections(newSections) {
            if (pipDebugProvider.enabled()) validateSections(newSections);

            if (_.isArray(newSections))
                config.sections = newSections;
            return config.sections;
        };
    }]);

})();

/**
 * @file Tabs control
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 */

/* global _, angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipTabs", ['pipAssert', 'pipNav.Templates']);

    thisModule.directive('pipTabs',
        ['$mdMedia', 'pipAssert', function ($mdMedia, pipAssert) {
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
                templateUrl: 'tabs/tabs.html',
                controller:
                    ['$scope', '$element', '$attrs', '$mdMedia', 'localStorageService', 'pipTranslate', function ($scope, $element, $attrs, $mdMedia, localStorageService, pipTranslate) {
                        $scope.class = ($attrs.class || '') + ' md-' + localStorageService.get('theme') + '-theme';
                        pipAssert.isArray($scope.tabs, 'pipTabs: pipTabs attribute should take an array');
                        $scope.$mdMedia = $mdMedia;
                        $scope.tabs = ($scope.tabs && _.isArray($scope.tabs)) ? $scope.tabs : [];
                        if ($scope.tabs.length > 0 && $scope.tabs[0].title) {
                            pipTranslate.translateObjects($scope.tabs, 'title', 'nameLocal');
                        } else {
                            pipTranslate.translateObjects($scope.tabs, 'name', 'nameLocal');
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
                    }]
            };
        }]
    );

})();

//# sourceMappingURL=pip-webui-nav.js.map
