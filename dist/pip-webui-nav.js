<<<<<<< HEAD
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



=======
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('actions/primary_actions.html',
<<<<<<< HEAD
    '<md-menu md-position-mode="target-right target" ng-repeat="action in config.primaryLocalActions">\n' +
=======
    '<md-menu md-position-mode="target-right target" class="pip-primary-actions" ng-repeat="action in config.primaryLocalActions">\n' +
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
    '    <md-button class="pip-primary-actions-action md-icon-button"\n' +
    '                ng-class="{ \'pip-primary-actions-hide-sm\': action.hideSmall,\n' +
    '                            \'pip-primary-actions-show-sm\': action.showSmall }"\n' +
    '                ng-click="onActionClick(action, $mdOpenMenu);"\n' +
    '                ng-hide="actionHidden(action)"\n' +
    '                aria-label="{{action.tooltip | translate}}">\n' +
    '        <!--<md-tooltip ng-if="action.tooltip">{{action.tooltip | translate}}</md-tooltip>-->\n' +
    '        <div class="pip-primary-actions-badge" ng-show="action.count > 0">\n' +
    '            {{actionCount(action)}}\n' +
    '        </div>\n' +
    '        <md-icon md-svg-icon="{{action.icon}}"></md-icon>\n' +
    '    </md-button>\n' +
    '    <md-menu-content width="3" >\n' +
    '        <md-menu-item ng-repeat-start="subAction in action.subActions"\n' +
    '                        ng-if="!subAction.divider"\n' +
    '                        ng-hide="actionHidden(subAction)">\n' +
    '            <md-button ng-hide="subAction.divider"\n' +
    '                        ng-click="onActionClick(subAction)">\n' +
    '                {{subAction.title | translate}}\n' +
    '            </md-button>\n' +
    '        </md-menu-item>\n' +
    '        <md-menu-divider ng-if="subAction.divider" ng-repeat-end></md-menu-divider>\n' +
    '    </md-menu-content>\n' +
    '</md-menu>\n' +
    '\n' +
    '<md-menu md-position-mode="target-right target" class="pip-primary-actions" ng-repeat="action in config.primaryGlobalActions">\n' +
    '    <md-button class="pip-primary-actions-action md-icon-button"\n' +
    '               ng-class="{ \'pip-primary-actions-hide-sm\': action.hideSmall,\n' +
    '                            \'pip-primary-actions-show-sm\': action.showSmall }"\n' +
    '               ng-click="onActionClick(action, $mdOpenMenu);"\n' +
    '               ng-hide="actionHidden(action)"\n' +
    '               aria-label="{{action.tooltip | translate}}">\n' +
    '        <!--<md-tooltip ng-if="action.tooltip">{{action.tooltip | translate}}</md-tooltip>-->\n' +
    '        <div class="pip-primary-actions-badge" ng-show="action.count > 0">\n' +
    '            {{actionCount(action)}}\n' +
    '        </div>\n' +
    '        <md-icon md-svg-icon="{{action.icon}}"></md-icon>\n' +
    '    </md-button>\n' +
    '    <md-menu-content width="3" >\n' +
    '        <md-menu-item ng-repeat-start="subAction in action.subActions"\n' +
    '                      ng-if="!subAction.divider"\n' +
    '                      ng-hide="actionHidden(subAction)">\n' +
    '            <md-button ng-hide="subAction.divider"\n' +
    '                       ng-click="onActionClick(subAction)">\n' +
    '                {{subAction.title | translate}}\n' +
    '            </md-button>\n' +
    '        </md-menu-item>\n' +
    '        <md-menu-divider ng-if="subAction.divider" ng-repeat-end></md-menu-divider>\n' +
    '    </md-menu-content>\n' +
    '</md-menu>\n' +
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
  $templateCache.put('actions/secondary_actions.html',
    '<md-menu ng-if="secondaryActionsVisible()"\n' +
    '    md-position-mode="target-right target">\n' +
    '    <md-button class="md-icon-button"\n' +
    '        ng-click="onSecondaryActionClick(); openMenu($mdOpenMenu, $event);"\n' +
    '        aria-label="open actions">\n' +
    '        <md-icon md-svg-icon="icons:vdots"></md-icon>\n' +
    '    </md-button>\n' +
    '    <md-menu-content width="3">\n' +
    '        <!-- Local secondary actions -->\n' +
    '        <md-menu-item ng-repeat-start="action in config.secondaryLocalActions"\n' +
    '            ng-if="!action.divider"\n' +
    '            ng-hide="actionHidden(action)">\n' +
    '            <md-button ng-hide="action.divider"\n' +
    '                ng-click="onActionClick(action)">\n' +
    '                {{action.title | translate}}\n' +
    '            </md-button>\n' +
    '        </md-menu-item>\n' +
    '        <md-menu-divider ng-if="action.divider" ng-repeat-end></md-menu-divider>\n' +
    '\n' +
    '        <md-menu-divider ng-if="secondaryDividerVisible()" >\n' +
    '\n' +
    '        </md-menu-divider>\n' +
    '        <!-- Global secondary actions -->\n' +
    '        <md-menu-item ng-repeat-start="action in config.secondaryGlobalActions"\n' +
    '            ng-if="!action.divider"\n' +
    '            ng-hide="actionHidden(action)">\n' +
    '            <md-button ng-hide="action.divider"\n' +
    '                ng-click="onActionClick(action)">\n' +
    '                {{action.title | translate}}\n' +
    '            </md-button>                    \n' +
    '        </md-menu-item>\n' +
    '        <md-menu-divider ng-if="action.divider" ng-repeat-end>\n' +
    '        </md-menu-divider>                        \n' +
    '    </md-menu-content>\n' +
    '</md-menu>\n' +
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
  $templateCache.put('appbar/appbar.html',
    '<!--\n' +
    '@file App Bar component\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-toolbar md-theme-watch="true" ng-if="!$partialReset" ng-class="config.ngClasses"\n' +
<<<<<<< HEAD
    '            class="{{ config.cssClass }} color-primary-bg">\n' +
    '\n' +
    '    <div class="md-toolbar-tools pip-toolbar-tools" ng-if="!searchEnabled">\n' +
    '        <!-- Navigation Icon -->\n' +
    '        <md-button class="md-icon-button pip-icon-button"\n' +
    '                   ng-if="config.navIconType != \'none\'"\n' +
    '                   ng-class="{ \'pip-third-party\': getParty() && !getUser(\'owner\') }"\n' +
    '                   ng-click="onNavIconClick()"\n' +
    '                   aria-label="menu">\n' +
    '            <!-- Menu icon -->\n' +
    '            <md-icon ng-if="config.navIconType==\'menu\' && (!getParty() || getUser(\'owner\'))"\n' +
    '                md-svg-icon="icons:menu"></md-icon>\n' +
    '            <!-- Party avatar -->\n' +
    '            <!--<pip-avatar ng-if="config.navIconType==\'menu\' && (getParty() && !getUser(\'owner\'))"\n' +
    '                        pip-rebind-avatar="true"\n' +
    '                        pip-rebind="true"\n' +
    '                        pip-image-url="partyAvatarUrl"\n' +
    '                        pip-party-id="getParty(\'id\')" class="pip-face"\n' +
    '                        pip-party-name="getParty(\'name\')">\n' +
    '            </pip-avatar>-->\n' +
    '            <!-- Back icon -->\n' +
    '            <md-icon ng-if="config.navIconType==\'back\'"\n' +
    '                md-svg-icon="icons:arrow-left"></md-icon>\n' +
    '        </md-button>\n' +
    '        \n' +
    '        <!-- Title -->            \n' +
    '        <div class="flex-var text-overflow">\n' +
    '            <!-- Logo -->\n' +
    '            <img class="pip-appbar-logo"\n' +
    '                 ng-click="onLogoState(config.logoState)"\n' +
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
=======
    '            class="{{ config.cssClass }}" ng-transclude>\n' +
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
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
  $templateCache.put('breadcrumb/breadcrumb.html',
    '<div>\n' +
    '    <div class="hide-xs text-overflow">\n' +
    '        <!-- Search criteria -->\n' +
    '        <span ng-if="config.criteria"\n' +
    '            ng-click="onSearchEnable()">{{config.criteria}} -</span>\n' +
    '        <!-- Breadcrumb navigation -->\n' +
    '        <span class="pip-breadcrumb-item"\n' +
    '            ng-repeat-start="item in config.items"\n' +
    '            ng-click="onBreadcrumbClick(item)"\n' +
    '            ng-init="stepWidth = 100/(config.items.length + 1)"\n' +
    '            ng-style="{\'max-width\': stepWidth + \'%\'}">\n' +
    '            {{item.title | translate}}\n' +
    '        </span>\n' +
    '        <md-icon ng-repeat-end md-svg-icon="icons:chevron-right"></md-icon>\n' +
    '        <!-- Text title -->\n' +
    '        <span class="pip-title">{{config.text | translate}}</span>\n' +
    '    </div>\n' +
    '\n' +
    '    <!-- Mobile breadcrumb dropdown -->\n' +
    '    <md-menu xmd-offset="0 48" class="hide-gt-xs">\n' +
    '        <span class="pip-mobile-breadcrumb layout-row"\n' +
    '            ng-click="$mdOpenMenu()"\n' +
    '            md-ink-ripple\n' +
    '            aria-label="open breadcrumb">\n' +
    '            <span class="text-overflow">\n' +
    '                <!-- Search criteria -->\n' +
    '                <span ng-if="config.criteria"\n' +
    '                    ng-click="onSearchEnable()">{{config.criteria}} -</span>\n' +
    '                {{config.text | translate}}\n' +
    '            </span>\n' +
    '            <md-icon class="pip-triangle-down" md-svg-icon="icons:triangle-down"></md-icon>\n' +
    '        </span>\n' +
    '        <md-menu-content width="3">\n' +
    '            <md-menu-item  ng-repeat="item in config.items" >\n' +
    '                <md-button ng-click="onBreadcrumbClick(item)"><span>{{item.title | translate}}</span></md-button>\n' +
    '            </md-menu-item>\n' +
    '            <md-menu-item  >\n' +
    '                <md-button><span class="text-grey">{{config.text | translate}}</span></md-button>\n' +
    '            </md-menu-item>\n' +
    '        </md-menu-content>\n' +
    '    </md-menu>\n' +
    '\n' +
    '</div>\n' +
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
    '<md-toolbar class="md-subhead color-primary-bg {{class}}" ng-if="show()" ng-class="{\'md-whiteframe-3dp\': $mdMedia(\'xs\')}">\n' +
    '    <div class="pip-divider"></div>\n' +
    '        <md-select ng-model="selectedIndex" ng-disabled="disabled()" md-container-class="pip-full-width-dropdown" aria-label="DROPDOWN" md-ink-ripple md-on-close="onSelect(selectedIndex)">\n' +
    '            <md-option ng-repeat="action in actions" value="{{ ::$index }}" ng-selected="activeIndex == $index ? true : false">\n' +
    '                {{ (action.title || action.name) | translate }}\n' +
    '            </md-option>\n' +
    '        </md-select>\n' +
    '</md-toolbar>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('language_picker/language_picker.html',
    '<md-menu md-position-mode="target-right target">\n' +
    '    <span class="pip-language"\n' +
    '        ng-click="$mdOpenMenu()"\n' +
    '        aria-label="language selection">\n' +
    '        {{language() | translate}}\n' +
    '        <md-icon md-svg-icon="icons:triangle-down"></md-icon>\n' +
    '    </span>\n' +
    '    <md-menu-content width="3">\n' +
    '        <md-menu-item ng-repeat="lang in languages">\n' +
    '            <md-button ng-click="onLanguageClick(lang)">{{lang | translate}}</md-button>\n' +
    '        </md-menu-item>\n' +
    '    </md-menu-content>\n' +
    '</md-menu>\n' +
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
  $templateCache.put('nav_header/nav_header.html',
    '<md-toolbar md-theme="{{ $theme }}" ng-hide="!user">\n' +
    '\n' +
    '    <md-button class="pip-nav-header-user md-icon-button"\n' +
    '                ng-click="onUserClick()"\n' +
    '                aria-label="current user">\n' +
    '        <!--<pip-avatar ng-if="!$avatarReset"\n' +
    '                    pip-default-icon="icon-person"\n' +
    '                    pip-party-name="getParty(\'name\')"\n' +
    '                    pip-image-url="primaryPartyAvatar"\n' +
    '                    pip-rebind-avatar="true"\n' +
    '                    pip-rebind="true">\n' +
    '        </pip-avatar>-->\n' +
    '    </md-button>\n' +
    '    \n' +
    '    <div class="pip-nav-header-user-text">\n' +
    '        <a class="pip-nav-header-user-pri cursor-pointer"\n' +
    '            ng-click="onUserClick()">{{ getUser(\'fullName\') }}</a>\n' +
    '        <div class="pip-nav-header-user-sec">\n' +
    '            {{ getUser(\'details\') | translate }}\n' +
    '        </div>\n' +
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
  $templateCache.put('nav_icon/nav_icon.html',
    '<md-button class="md-icon-button pip-nav-icon"\n' +
    '            ng-if="config.type != \'none\'"\n' +
    '            ng-class="config.class"\n' +
    '            ng-click="onNavIconClick()"\n' +
    '            aria-label="menu">\n' +
    '    <!-- Menu icon -->\n' +
    '    <md-icon ng-if="config.type==\'menu\'"\n' +
    '        md-svg-icon="icons:menu"></md-icon>\n' +
    '    <!-- Image -->\n' +
    '    <img ng-src="{{config.imageUrl}}" ng-if="config.type==\'image\'" height="24" width="24">\n' +
    '    <!--<pip-avatar ng-if="config.navIconType==\'menu\' && (getParty() && !getUser(\'owner\'))"\n' +
    '                pip-rebind-avatar="true"\n' +
    '                pip-rebind="true"\n' +
    '                pip-image-url="partyAvatarUrl"\n' +
    '                pip-party-id="getParty(\'id\')" class="pip-face"\n' +
    '                pip-party-name="getParty(\'name\')">\n' +
    '    </pip-avatar>-->\n' +
    '    <!-- Back icon -->\n' +
    '    <md-icon ng-if="config.type==\'back\'"\n' +
    '        md-svg-icon="icons:arrow-left"></md-icon>\n' +
    '    <!--Icon -->\n' +
    '    <md-icon ng-if="config.type==\'icon\'"\n' +
    '             md-svg-icon="icons:{{config.iconName}}"></md-icon>\n' +
    '</md-button>\n' +
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
  $templateCache.put('nav_menu/nav_menu.html',
    '<md-list>\n' +
    '    <div class="pip-section" ng-repeat="section in config"\n' +
    '        ng-hide="section.access && !section.access(section)">\n' +
    '        \n' +
    '        <md-divider ng-show="$index > 0 && !isSectionEmpty(section.links)"></md-divider>\n' +
    '        <md-subheader ng-show="section.title">{{::section.title | translate}}</md-subheader>\n' +
    '        \n' +
    '        <md-list-item class="pip-focusable no-border" \n' +
    '            ng-repeat="link in section.links"\n' +
    '            ng-click="onLinkClick($event, link)"\n' +
    '            ng-hide="link.access && !link.access(link)">\n' +
    '            <md-icon md-svg-icon="{{link.icon}}" \n' +
    '                ng-hide="!link.icon" \n' +
    '                class="tm0 bm0"></md-icon>\n' +
    '            <p>{{::link.title | translate}}</p>\n' +
    '        </md-list-item>\n' +
    '    </div>\n' +
    '</md-list>\n' +
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
  $templateCache.put('search_bar/search_bar.html',
    '<div class="md-toolbar-tools layout-row" ng-if="searchEnabled">\n' +
    '    <md-button class="md-icon-button" \n' +
    '        aria-label="start search" \n' +
    '        ng-click="onSearchClick()">\n' +
    '        <md-icon md-svg-icon="icons:search"></md-icon>\n' +
    '    </md-button>\n' +
    '    <input class="pip-search-text flex"\n' +
    '        type="search"\n' +
    '        ng-model="search.text" \n' +
    '        ng-keydown="onSearchKeyDown($event)" />\n' +
    '    <md-button class="md-icon-button" \n' +
    '        aria-label="clear search" \n' +
    '        ng-click="onSearchClear()">\n' +
    '        <md-icon md-svg-icon="icons:cross-circle"></md-icon>\n' +
    '    </md-button>\n' +
    '</div>\n' +
    '<div class="md-toolbar-tools layout-row layout-align-end-center"  ng-if="!searchEnabled">\n' +
    '    <md-button class="md-icon-button"\n' +
    '               aria-label="start search"\n' +
    '               ng-click="onSearchEnable()">\n' +
    '        <md-icon md-svg-icon="icons:search"></md-icon>\n' +
    '    </md-button>\n' +
    '</div>\n' +
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
  $templateCache.put('sidenav/sidenav.html',
    '<!--\n' +
    '@file Side Nav component\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-sidenav class="md-sidenav-left md-whiteframe-z2 pip-sidenav color-content-bg"\n' +
    '    md-component-id="pip-sidenav" ng-if="!$partialReset" pip-focused ng-transclude>\n' +
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
<<<<<<< HEAD
    '    <md-tabs ng-if="$mdMedia(\'gt-xs\')" md-selected="activeTab" ng-class="{\'disabled\': disabled()}" md-stretch-tabs="true" md-dynamic-height="true">\n' +
    '        <md-tab ng-repeat="tab in tabs track by $index"  ng-disabled="tabDisabled($index)" md-on-select="onSelect($index)">\n' +
    '            <md-tab-label>\n' +
    '                {{ ::tab.nameLocal }}\n' +
    '                <div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">{{ ::tab.newCounts }}</div>\n' +
=======
    '    <md-tabs ng-if="$mdMedia(\'gt-xs\')" md-selected="activeTab" ng-class="{\'disabled\': disabled()}"\n' +
    '             md-stretch-tabs="true" md-dynamic-height="true">\n' +
    '        <md-tab ng-repeat="tab in tabs track by $index" ng-disabled="tabDisabled($index)"\n' +
    '                md-on-select="onSelect($index)">\n' +
    '            <md-tab-label>\n' +
    '                {{::tab.nameLocal }}\n' +
    '                <div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">\n' +
    '                    {{::tab.newCounts }}\n' +
    '                </div>\n' +
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
    '                <div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div>\n' +
    '            </md-tab-label>\n' +
    '        </md-tab>\n' +
    '    </md-tabs>\n' +
<<<<<<< HEAD
    '    <md-content class="md-subhead color-primary-bg md-hue-1 " ng-if="$mdMedia(\'xs\')">\n' +
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
=======
    '    <div class="md-subhead pip-tabs-content color-primary-bg  " ng-if="$mdMedia(\'xs\')">\n' +
    '        <div class="pip-divider position-top m0"></div>\n' +
    '        <md-select ng-model="activeIndex" ng-disabled="disabled()"\n' +
    '                   md-container-class="pip-full-width-dropdown" aria-label="SELECT" md-ink-ripple\n' +
    '                   md-on-close="onSelect(activeIndex)">\n' +
    '            <md-option ng-repeat="tab in tabs track by $index" value="{{ ::$index }}">\n' +
    '                {{ ::tab.nameLocal }}\n' +
    '                <div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">\n' +
    '                    {{ ::tab.newCounts }}\n' +
    '                </div>\n' +
    '                <div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div>\n' +
    '            </md-option>\n' +
    '        </md-select>\n' +
    '    </div>\n' +
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
    '</md-toolbar>\n' +
    '');
}]);
})();

<<<<<<< HEAD
/**
 * @file Application Actions service
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _) {
=======
(function () {
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
    'use strict';
    angular.module('pipNav', [
        'pipDropdown',
        'pipTabs',
        'pipAppBar',
        'pipSideNav',
        'pipNavIcon',
        'pipNavMenu',
        'pipBreadcrumb',
        'pipPrimaryActions',
        'pipSecondaryActions'
    ]);
})();

<<<<<<< HEAD
    var thisModule = angular.module('pipActions.Service', []);

    thisModule.provider('pipActions', function () {
        var config = {
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
        this.globalActions = globalActions;
        this.globalPrimaryActions = globalPrimaryActions;
        this.globalSecondaryActions = globalSecondaryActions;

        // Get the service instance
        this.$get = ['$rootScope', function ($rootScope) {
            return {
                config: getConfig,
                
                showLocalActions: showLocalActions,
                hideLocalActions: hideLocalActions,
                updateActionCount: updateActionCount,
            };

            // ----------------------

            function getConfig() {
                return config;
            }

            // Show actions
            function hideLocalActions() {
                config.primaryLocalActions = [];
                config.secondaryLocalActions = [];

                sendConfigEvent();
            }

            function showLocalActions(primaryActions, secondaryActions) {
                config.primaryLocalActions = primaryActions || [];
                config.secondaryLocalActions = secondaryActions || [];

=======
(function () {
    'use strict';
    var thisModule = angular.module('pipActions.Service', []);
    thisModule.provider('pipActions', function () {
        var config = {
            primaryGlobalActions: [],
            primaryLocalActions: [],
            secondaryGlobalActions: [],
            secondaryLocalActions: []
        };
        this.globalActions = globalActions;
        this.globalPrimaryActions = globalPrimaryActions;
        this.globalSecondaryActions = globalSecondaryActions;
        this.$get = ['$rootScope', function ($rootScope) {
            return {
                config: getConfig,
                show: showLocalActions,
                hide: hideLocalActions,
                count: updateActionCount,
            };
            function getConfig() {
                return config;
            }
            function hideLocalActions() {
                config.primaryLocalActions = [];
                config.secondaryLocalActions = [];
                sendConfigEvent();
            }
            function showLocalActions(primaryActions, secondaryActions) {
                config.primaryLocalActions = primaryActions || [];
                config.secondaryLocalActions = secondaryActions || [];
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
                sendConfigEvent();
            }
            function updateActionCount(actionName, count) {
                _.each(config.primaryGlobalActions, function (action) {
                    if (action.name === actionName) {
                        action.count = count;
                    }
                });
                _.each(config.primaryLocalActions, function (action) {
                    if (action.name === actionName) {
                        action.count = count;
                    }
                });
                sendConfigEvent();
            }
            function sendConfigEvent() {
                $rootScope.$broadcast('pipActionsChanged', config);
            }
        }];
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
})();

(function () {
    'use strict';
    var thisModule = angular.module('pipPrimaryActions', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipActions.Service']);
    thisModule.directive('pipPrimaryActions', function () {
        return {
            restrict: 'E',
            scope: {
                localActions: '=pipLocalActions',
                globalActions: '=pipGlobalActions'
            },
            replace: false,
            templateUrl: function (element, attr) {
                return 'actions/primary_actions.html';
            },
            controller: 'pipPrimaryActionsController'
        };
    });
    thisModule.controller('pipPrimaryActionsController', ['$scope', '$element', '$attrs', '$rootScope', '$window', '$location', '$injector', 'pipActions', function ($scope, $element, $attrs, $rootScope, $window, $location, $injector, pipActions) {
        $element.addClass('pip-primary-actions');
        $scope.config = pipActions.config();
        if ($scope.localActions) {
            pipActions.showLocalActions();
            $scope.config.primaryLocalActions = $scope.localActions[0];
        }
        if ($scope.globalActions) {
            pipActions.showLocalActions();
            $scope.config.primaryGlobalActions = $scope.globalActions[0];
        }
        $rootScope.$on('pipActionsChanged', onActionsChanged);
        $scope.actionHidden = actionHidden;
        $scope.actionCount = actionCount;
        $scope.onActionClick = onActionClick;
        function onActionsChanged(event, config) {
            $scope.config = config;
        }
        function actionHidden(action) {
            return action.access && !action.access(action);
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
                $window.location.href = action.href;
                return;
            }
            if (action.url) {
                $location.url(action.url);
                return;
            }
            if (action.state) {
                if ($injector.has('$state')) {
                    var $state = $injector.get('$state');
                    $state.go(action.state, action.stateParams);
                }
                return;
            }
            if (action.event) {
                $rootScope.$broadcast(action.event);
            }
            else {
                $rootScope.$broadcast('pipActionClicked', action.name);
            }
        }
    }]);
})();

(function () {
    'use strict';
    var thisModule = angular.module('pipSecondaryActions', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipActions.Service']);
    thisModule.directive('pipSecondaryActions', function () {
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
                return 'actions/secondary_actions.html';
            },
            controller: 'pipSecondaryActionsController'
        };
    });
    thisModule.controller('pipSecondaryActionsController', ['$scope', '$element', '$attrs', '$rootScope', '$window', '$location', '$injector', 'pipActions', function ($scope, $element, $attrs, $rootScope, $window, $location, $injector, pipActions) {
        $element.addClass('pip-secondary-actions');
        $scope.config = pipActions.config();
        if ($scope.localActions) {
            pipActions.showLocalActions();
            $scope.config.secondaryLocalActions = $scope.localActions[1];
        }
        if ($scope.globalActions) {
            pipActions.showLocalActions();
            $scope.config.secondaryGlobalActions = $scope.globalActions[0];
        }
        $rootScope.$on('pipActionsChanged', onActionsChanged);
        $scope.actionHidden = actionHidden;
        $scope.actionCount = actionCount;
        $scope.secondaryActionsVisible = secondaryActionsVisible;
        $scope.secondaryDividerVisible = secondaryDividerVisible;
        $scope.onActionClick = onActionClick;
        $scope.openMenu = openMenu;
        function openMenu($mdOpenMenu, ev) {
            $scope.originatorEv = ev;
            $mdOpenMenu(ev);
        }
        function onActionsChanged(event, config) {
            $scope.config = config;
        }
        function actionHidden(action) {
            return action.access && !action.access(action);
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
                $window.location.href = action.href;
                return;
            }
            if (action.url) {
                $location.url(action.url);
                return;
            }
            if (action.state) {
                if ($injector.has('$state')) {
                    var $state = $injector.get('$state');
                    $state.go(action.state, action.stateParams);
                }
                return;
            }
<<<<<<< HEAD

        }]
    );

})(window.angular, window._, window.jQuery);

/**
 * @file Application App Bar component
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _, $) {
    'use strict';

    var thisModule = angular.module('pipAppBar',
        ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipAppBar.Service']);

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
        ['$scope', '$element', '$attrs', '$rootScope', '$window', '$state', '$location', '$injector', 'pipAppBar', function ($scope, $element, $attrs, $rootScope, $window, $state, $location, $injector, pipAppBar) {
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;

            if (pipTranslate) {
                pipTranslate.translations('en', {
                    'APPBAR_SEARCH': 'Search'
                });
                pipTranslate.translations('ru', {
                    'APPBAR_SEARCH': 'Поиск'
                });
            } 

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
            $scope.onLogoState = onLogoState;

            $scope.getParty = getParty;
            $scope.getUser = getUser;

            $scope.openMenu = openMenu;

            function onLogoState(state) {
                if(state)
                $state.go(state);
            }
            
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
                return pipTranslate ? pipTranslate.use() : null;
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
            logoState: null,

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
                
                logoState:logoState,
                setLogoState: setLogoState,

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

            function setLogoState(logoState) {
                config.logoState = logoState;
                return config.logoState;
            }
            
            function logoState() {
                return config.logoState;
            }
            
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
                    config.navIconType = config.navIconType === 'none' ? 'none' : config.navIconType;
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
 * @file Breadcrumb component
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _, $) {
    'use strict';

    var thisModule = angular.module('pipBreadcrumb',
        ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipBreadcrumb.Service']);

    // Main application header directive
    thisModule.directive('pipBreadcrumb', function () {
        return {
            restrict: 'E',
            scope: {},
            replace: false,
            templateUrl: function (element, attr) {
                return 'breadcrumb/breadcrumb.html';
            },
            controller: 'pipBreadcrumbController'
        };
    });

    thisModule.controller('pipBreadcrumbController',
        ['$scope', '$element', '$attrs', '$rootScope', '$window', '$state', '$location', 'pipBreadcrumb', function ($scope, $element, $attrs, $rootScope, $window, $state, $location, pipBreadcrumb) {
            // Apply class and call resize
            $element.addClass('pip-breadcrumb');

            $scope.config = pipBreadcrumb.config();

            $rootScope.$on('pipBreadcrumbChanged', onBreadcrumbChanged);
            $rootScope.$on('pipBreadcrumbBack', onBreadcrumbBack);

            $scope.onBreadcrumbClick = onBreadcrumbClick;

            function onBreadcrumbChanged(event, config) {
                $scope.config = config;
            }

            function onBreadcrumbBack() {
                var items, backCallback;

                items = $scope.config.items;
                // Go to the last breadcrumb item
                if (_.isArray(items) && items.length > 0) {
                    backCallback = items[items.length - 1].click;
                    if (_.isFunction(backCallback)) {
                        backCallback();
                    } else {
                        $window.history.back();
                    }
                } else {
                    $window.history.back();
                }
            }

            function onBreadcrumbClick(item) {
                if (_.isFunction(item.click)) {
                    item.click(item);
                }
            }

            function onSearchEnable() {
                $rootScope.$broadcast('pipSearchOpen');
            }

        }]
    );

})(window.angular, window._, window.jQuery);

/**
 * @file Breadcrumb service
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipBreadcrumb.Service', []);

    thisModule.provider('pipBreadcrumb', function () {
=======
            if (action.event) {
                $rootScope.$broadcast(action.event);
            }
            else {
                $rootScope.$broadcast('pipActionClicked', action.name);
            }
        }
    }]);
})();

(function () {
    'use strict';
    var thisModule = angular.module('pipAppBar', ['ngMaterial', 'pipNav.Templates', 'pipAppBar.Service']);
    thisModule.directive('pipAppbar', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            templateUrl: 'appbar/appbar.html',
            controller: 'pipAppBarController'
        };
    });
    thisModule.controller('pipAppBarController', ['$scope', '$element', '$rootScope', 'pipAppBar', function ($scope, $element, $rootScope, pipAppBar) {
        $element.addClass('pip-appbar');
        $element.addClass('color-primary-bg');
        $scope.$emit('pipResizeWindow');
        $scope.config = pipAppBar.config();
        $rootScope.$on('pipAppBarChanged', onAppBarChanged);
        function onAppBarChanged(event, config) {
            $scope.config = config;
        }
    }]);
})();

(function () {
    'use strict';
    var thisModule = angular.module('pipAppBar.Part', ['pipAppBar.Service']);
    thisModule.directive('pipAppbarPart', ['ngIfDirective', function (ngIfDirective) {
        var ngIf = ngIfDirective[0];
        return {
            transclude: ngIf.transclude,
            priority: ngIf.priority,
            terminal: ngIf.terminal,
            restrict: ngIf.restrict,
            scope: true,
            link: function linkFunction($scope, $element, $attrs) {
                $attrs.ngIf = function () {
                    return $scope.visible;
                };
                ngIf.link.apply(ngIf, arguments);
            },
            controller: 'pipAppBarPartController'
        };
    }]);
    thisModule.controller('pipAppBarPartController', ['$scope', '$element', '$attrs', '$rootScope', 'pipAppBar', function ($scope, $element, $attrs, $rootScope, pipAppBar) {
        var partName = '' + $attrs.pipAppbarPart;
        var partValue = null;
        var pos = partName.indexOf(':');
        if (pos > 0) {
            partValue = partName.substr(pos + 1);
            partName = partName.substr(0, pos);
        }
        onAppBarChanged(null, pipAppBar.config());
        $rootScope.$on('pipAppBarChanged', onAppBarChanged);
        function onAppBarChanged(event, config) {
            var parts = config.parts || {};
            var currentPartValue = parts[partName];
            var visible = !!(partValue ? currentPartValue == partValue : currentPartValue);
            if (visible != $scope.visible)
                $scope.visible = visible;
        }
    }]);
})();

(function () {
    'use strict';
    var thisModule = angular.module('pipAppBar.Service', []);
    thisModule.provider('pipAppBar', function () {
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
        var config = {
            theme: 'default',
            cssClass: '',
            ngClasses: {},
            parts: {}
        };
        this.theme = theme;
        this.parts = initParts;
        this.$get = ['$rootScope', function ($rootScope) {
            return {
                config: getConfig,
                cssClass: cssClass,
                part: getOrSetPart,
                parts: getOrSetParts,
                showShadow: showShadow,
                showShadowSm: showShadowSm,
                showShadowSmXs: showShadowSmXs,
                hideShadow: hideShadow
            };
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
            function getOrSetPart(name, value) {
                if (!_.isString(name))
                    throw new Error("Part name has to be a string");
                if (value != undefined) {
                    if (config.parts[name] != value) {
                        config.parts[name] = value;
                        sendConfigEvent();
                    }
                }
                return config.parts[name];
            }
            function getOrSetParts(parts) {
                if (_.isObject(parts)) {
                    if (!_.isEqual(config.parts, parts)) {
                        config.parts = parts;
                        sendConfigEvent();
                    }
                }
                return config.parts;
            }
            function sendConfigEvent() {
                $rootScope.$broadcast('pipAppBarChanged', config);
            }
        }];
        function theme(theme) {
            config.theme = theme || config.theme;
            return config.theme;
        }
        function initParts(parts) {
            if (_.isObject(parts)) {
                config.parts = parts;
            }
            return config.parts;
        }
    });
})();

"use strict";
var pip;
(function (pip) {
    var nav;
    (function (nav) {
        'use strict';
        var BreadcrumbController = (function () {
            BreadcrumbController.$inject = ['$scope', '$element', '$attrs', '$rootScope', '$window', '$state', 'pipBreadcrumb'];
            function BreadcrumbController($scope, $element, $attrs, $rootScope, $window, $state, pipBreadcrumb) {
                "ngInject";
                this._rootScope = $rootScope;
                this._window = $window;
                $element.addClass('pip-breadcrumb');
                this.config = pipBreadcrumb.config();
                $rootScope.$on('pipBreadcrumbChanged', this.onBreadcrumbChanged);
                $rootScope.$on('pipBreadcrumbBack', this.onBreadcrumbBack);
            }
            BreadcrumbController.prototype.onBreadcrumbChanged = function (event, config) {
                this.config = config;
            };
            BreadcrumbController.prototype.onBreadcrumbBack = function () {
                var items = this.config.items;
                if (_.isArray(items) && items.length > 0) {
                    var backCallback = items[items.length - 1].click;
                    if (_.isFunction(backCallback))
                        backCallback();
                    else
                        this._window.history.back();
                }
                else
                    this._window.history.back();
            };
            BreadcrumbController.prototype.onBreadcrumbClick = function (item) {
                if (_.isFunction(item.click))
                    item.click(item);
            };
            BreadcrumbController.prototype.onSearchOpen = function () {
                this._rootScope.$broadcast('pipSearchOpen');
            };
            return BreadcrumbController;
        }());
        function breadcrumbDirective() {
            return {
                restrict: 'E',
                scope: {},
                replace: false,
                templateUrl: function (element, attr) {
                    return 'breadcrumb/breadcrumb.html';
                },
                controller: BreadcrumbController,
                controllerAs: 'vm'
            };
        }
        angular
            .module('pipBreadcrumb', [
            'ngMaterial', 'pipNav.Translate', 'pipNav.Templates',
            'pipBreadcrumb.Service'
        ])
            .directive('pipBreadcrumb', breadcrumbDirective);
    })(nav = pip.nav || (pip.nav = {}));
})(pip || (pip = {}));

"use strict";
var pip;
(function (pip) {
    var nav;
    (function (nav) {
        'use strict';
        nav.BreadcrumbChangedEvent = "pipBreadcrumbChanged";
        var BreadcrumbItem = (function () {
            function BreadcrumbItem() {
            }
            return BreadcrumbItem;
        }());
        nav.BreadcrumbItem = BreadcrumbItem;
        var BreadcrumbConfig = (function () {
            function BreadcrumbConfig() {
            }
            return BreadcrumbConfig;
        }());
        nav.BreadcrumbConfig = BreadcrumbConfig;
        var BreadcrumbService = (function () {
            function BreadcrumbService(config, $rootScope) {
                this._config = config;
                this._rootScope = $rootScope;
            }
            Object.defineProperty(BreadcrumbService.prototype, "config", {
                get: function () {
                    return this._config;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BreadcrumbService.prototype, "text", {
                get: function () {
                    return this._config.text;
                },
                set: function (value) {
                    this._config.text = value;
                    this._config.items = null;
                    this.sendEvent();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BreadcrumbService.prototype, "items", {
                get: function () {
                    return this._config.items;
                },
                set: function (value) {
                    this._config.text = null;
                    this._config.items = value;
                    this.sendEvent();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BreadcrumbService.prototype, "criteria", {
                get: function () {
                    return this._config.criteria;
                },
                set: function (value) {
                    this._config.criteria = value;
                    this.sendEvent();
                },
                enumerable: true,
                configurable: true
            });
            BreadcrumbService.prototype.sendEvent = function () {
                this._rootScope.$broadcast(pip.nav.BreadcrumbChangedEvent, this._config);
            };
            return BreadcrumbService;
        }());
        var BreadcrumbProvider = (function () {
            function BreadcrumbProvider() {
                this._config = {
                    text: null,
                    items: null,
                    criteria: null
                };
            }
            Object.defineProperty(BreadcrumbProvider.prototype, "text", {
                get: function () {
                    return this._config.text;
                },
                set: function (value) {
                    this._config.text = value;
                },
                enumerable: true,
                configurable: true
            });
            BreadcrumbProvider.prototype.$get = ['$rootScope', function ($rootScope) {
                "ngInject";
                if (this._service == null)
                    this._service = new BreadcrumbService(this._config, $rootScope);
                return this._service;
            }];
            return BreadcrumbProvider;
        }());
        angular
            .module('pipBreadcrumb.Service', [])
            .provider('pipBreadcrumb', BreadcrumbProvider);
    })(nav = pip.nav || (pip.nav = {}));
})(pip = exports.pip || (exports.pip = {}));

(function () {
    'use strict';
    var thisModule = angular.module('pipNav.Translate', []);
    thisModule.filter('translate', ['$injector', function ($injector) {
        var pipTranslate = $injector.has('pipTranslate')
            ? $injector.get('pipTranslate') : null;
        return function (key) {
            return pipTranslate ? pipTranslate.translate(key) || key : key;
        };
    }]);
})();

(function () {
    'use strict';
    var thisModule = angular.module("pipDropdown", ['pipNav.Templates']);
<<<<<<< HEAD

    thisModule.directive('pipDropdown',
        ['$mdMedia', function ($mdMedia) {
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
                        // Todo: Remove dependency on local storage or make it optional
                        $scope.class = ($attrs.class || '') + ' md-' + localStorageService.get('theme') + '-theme';
                        //pipAssert.isArray($scope.actions, 'pipDropdown: pip-actions attribute should take an array, but take ' + typeof $scope.actions);
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

=======
    thisModule.directive('pipDropdown', ['$mdMedia', function ($mdMedia) {
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
            controller: ['$scope', '$element', '$attrs', 'localStorageService', function ($scope, $element, $attrs, localStorageService) {
                $scope.class = ($attrs.class || '') + ' md-' + localStorageService.get('theme') + '-theme';
                $scope.$mdMedia = $mdMedia;
                $scope.actions = ($scope.actions && _.isArray($scope.actions)) ? $scope.actions : [];
                $scope.activeIndex = $scope.activeIndex || 0;
                $scope.disabled = function () {
                    if ($scope.ngDisabled()) {
                        return $scope.ngDisabled();
                    }
                    else {
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
                    }
                    else {
                        return true;
                    }
                };
            }]
        };
    }]);
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
})();

(function () {
    'use strict';
    var thisModule = angular.module('pipLanguagePicker', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
    thisModule.directive('pipLanguagePicker', function () {
        return {
            restrict: 'E',
            scope: {
                languages: '=languages',
            },
            replace: false,
            templateUrl: function (element, attr) {
                return 'language_picker/language_picker.html';
            },
            controller: 'pipLanguagePickerController'
        };
    });
    thisModule.controller('pipLanguagePickerController', ['$scope', '$element', '$attrs', '$rootScope', '$window', '$state', '$location', '$injector', function ($scope, $element, $attrs, $rootScope, $window, $state, $location, $injector) {
        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        $element.addClass('pip-language-picker');
        $scope.language = getLanguage;
        $scope.onLanguageClick = onLanguageClick;
        $rootScope.$on('pipSetLanguages', setLanguages);
        function setLanguages(lang) {
            $scope.languages = lang.length > 0 ? lang : ['en', 'ru'];
        }
        function getLanguage() {
            return pipTranslate ? pipTranslate.use() : null;
        }
        function onLanguageClick(language) {
            if (pipTranslate) {
                setTimeout(function () {
                    pipTranslate.use(language);
                    $rootScope.$apply();
                }, 0);
            }
<<<<<<< HEAD

        }]
    );

})(window.angular, window._, window.jQuery);

/**
 * @file Nav Icon component
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _, $) {
=======
        }
    }]);
})();

(function () {
    'use strict';
    var thisModule = angular.module('pipNavHeader', ['ngMaterial', 'pipNav.Templates']);
    thisModule.directive('pipNavHeader', function () {
        return {
            restrict: 'EA',
            scope: {
                user: '=pipUser',
            },
            replace: false,
            templateUrl: 'nav_header/nav_header.html',
            controller: 'pipNavHeaderController'
        };
    });
    thisModule.controller('pipNavHeaderController', ['$scope', '$element', '$rootScope', function ($scope, $element, $rootScope) {
        $element.addClass('pip-nav-header');
        $rootScope.$on('pipIdentityChanged', onIdentityChanged);
        $scope.getUser = getUser;
        $scope.onUserClick = onUserClick;
        return;
        function getUser(prop) {
            var value = $scope.user || $scope.identity || {};
            if (prop)
                return value[prop];
            return value;
        }
        function onIdentityChanged(event, identity) {
            $scope.identity = identity;
        }
        function onUserClick() {
            $rootScope.$broadcast('pipNavUserClicked');
        }
    }]);
})();

(function () {
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
    'use strict';
    var thisModule = angular.module('pipNavIcon', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipNavIcon.Service']);
    thisModule.directive('pipNavIcon', function () {
        return {
            restrict: 'E',
            scope: {
                type: '=pipType',
                imageUrl: '=pipImageUrl'
            },
            replace: false,
            templateUrl: function (element, attr) {
                return 'nav_icon/nav_icon.html';
            },
            controller: 'pipNavIconController'
        };
    });
    thisModule.controller('pipNavIconController', ['$scope', '$element', '$attrs', '$rootScope', '$window', 'pipNavIcon', function ($scope, $element, $attrs, $rootScope, $window, pipNavIcon) {
        $element.addClass('pip-nav-icon');
        $scope.config = pipNavIcon.config();
        $rootScope.$on('pipNavIconChanged', onNavIconChanged);
        $scope.onNavIconClick = onNavIconClick;
        function onNavIconChanged(event, config) {
            $scope.config = config;
        }
        function onNavIconClick() {
            var breadcrumb, backCallback;
            if (_.isFunction($scope.config.callback)) {
                $scope.config.callback();
            }
            else if ($scope.config.event) {
                $rootScope.$broadcast($scope.config.event);
            }
            else if ($scope.config.type == 'menu') {
                $rootScope.$broadcast('pipOpenSideNav');
            }
            else if ($scope.config.type == 'back') {
                $window.history.back();
            }
            else {
                $rootScope.$broadcast('pipNavIconClicked');
            }
        }
    }]);
})();

<<<<<<< HEAD
        }]
    );

})(window.angular, window._, window.jQuery);

/**
 * @file Nav Icon service
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _) {
=======
(function () {
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
    'use strict';
    var thisModule = angular.module('pipNavIcon.Service', []);
    thisModule.provider('pipNavIcon', function () {
        var config = {
            type: 'menu',
            imageUrl: null,
            iconName: 'back',
            callback: null,
            event: null
        };
        this.config = getConfig;
        this.clear = clear;
        this.menu = setMenu;
        this.back = setBack;
        this.icon = setIcon;
        this.image = setImage;
        this.$get = ['$rootScope', function ($rootScope) {
            return {
                config: getConfig,
                hide: hide,
                menu: showMenu,
                back: showBack,
                icon: showIcon,
                image: showImage
            };
            function hide() {
                clear();
                sendConfigEvent();
            }
            function showMenu(callbackOrEvent) {
                setMenu(callbackOrEvent);
                sendConfigEvent();
            }
            function showIcon(iconName, callbackOrEvent) {
                setIcon(iconName, callbackOrEvent);
                sendConfigEvent();
            }
            function showBack(callbackOrEvent) {
                setBack(callbackOrEvent);
                sendConfigEvent();
            }
            function showImage(imageUrl, callbackOrEvent) {
                setImage(imageUrl, callbackOrEvent);
                sendConfigEvent();
            }
            function sendConfigEvent() {
                $rootScope.$broadcast('pipNavIconChanged', config);
            }
        }];
        function getConfig() {
            return config;
        }
        function clear() {
            config.type = 'none';
            config.callback = null;
            config.event = null;
        }
        function setMenu(callbackOrEvent) {
            config.type = 'menu';
            config.callback = null;
            config.event = null;
            if (_.isFunction(callbackOrEvent))
                config.callback = callbackOrEvent;
            if (_.isString(callbackOrEvent))
                config.event = callbackOrEvent;
        }
        function setIcon(iconName, callbackOrEvent) {
            config.type = 'icon';
            config.iconName = iconName;
            config.callback = null;
            config.event = null;
            if (_.isFunction(callbackOrEvent))
                config.callback = callbackOrEvent;
            if (_.isString(callbackOrEvent))
                config.event = callbackOrEvent;
        }
        function setBack(callbackOrEvent) {
            config.type = 'back';
            config.callback = null;
            config.event = null;
            if (_.isFunction(callbackOrEvent))
                config.callback = callbackOrEvent;
            if (_.isString(callbackOrEvent))
                config.event = callbackOrEvent;
        }
        function setImage(imageUrl, callbackOrEvent) {
            config.type = 'image';
            config.imageUrl = imageUrl;
            config.callback = null;
            config.event = null;
            if (_.isFunction(callbackOrEvent))
                config.callback = callbackOrEvent;
            if (_.isString(callbackOrEvent))
                config.event = callbackOrEvent;
        }
    });
<<<<<<< HEAD

})(window.angular, window._);

/**
 * @file Application Nav Header component
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipNavHeader', 
        ['ngMaterial', 'pipNav.Templates']);

    // Main application nav-header directive
    thisModule.directive('pipNavHeader', function() {
       return {
           restrict: 'EA',
           scope: {
               user: '=pipUser',
           },
           replace: false,
           templateUrl: 'nav_header/nav_header.html',
           controller: 'pipNavHeaderController'
       };
    });

    thisModule.controller('pipNavHeaderController', 
        ['$scope', '$element', '$rootScope', function ($scope, $element, $rootScope) {

            // Apply class and call resize
            $element.addClass('pip-nav-header');

            $rootScope.$on('pipIdentityChanged', onIdentityChanged);

            $scope.getUser = getUser;
            $scope.onUserClick = onUserClick;

            return;
            
            //------------------------

            function getUser(prop) {
                var value = $scope.user || $scope.identity || {};

                if (prop) return value[prop];

                return value;
            }
                        
            function onIdentityChanged(event, identity) {
                $scope.identity = identity;
            }

            function onUserClick() {
                $rootScope.$broadcast('pipNavUserClicked');
                //pipSideNav.close();
            }

        }]
    );

})();

/**
 * @file Application Nav Menu component
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */
=======
})();
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673

(function () {
    'use strict';
    var thisModule = angular.module('pipNavMenu', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipNavMenu.Service']);
    thisModule.directive('pipNavMenu', function () {
        return {
            restrict: 'EA',
            scope: {
                config: '=pipLinks'
            },
            replace: false,
            templateUrl: 'nav_menu/nav_menu.html',
            controller: 'pipNavMenuController'
        };
    });
    thisModule.controller('pipNavMenuController', ['$scope', '$element', '$rootScope', '$window', '$location', '$timeout', '$injector', 'pipSideNav', 'pipNavMenu', function ($scope, $element, $rootScope, $window, $location, $timeout, $injector, pipSideNav, pipNavMenu) {
        $element.addClass('pip-nav-menu');
        $scope.config = $scope.config || pipNavMenu.get();
        $rootScope.$on('pipNavMenuChanged', onConfigChanged);
        $scope.itemVisible = itemVisible;
        $scope.onLinkClick = onLinkClick;
        $scope.isSectionEmpty = isSectionEmpty;
        return;
        function itemVisible(item) {
            return item && item.access && !item.access(item);
        }
        function isSectionEmpty(linkCollection) {
            var result = true;
            _.each(linkCollection, function (link) {
                if (!itemVisible(link))
                    result = false;
            });
            return result;
        }
        function onConfigChanged(event, config) {
            $scope.config = config;
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
                $timeout(function () {
                    $window.location.href = link.href;
                }, 300);
                return;
            }
            else if (link.url) {
                if (link.url.split(/[\s/?]+/)[1] === $location.url().split(/[\s/?]+/)[1]) {
                    pipSideNav.close();
                    return;
                }
                pipSideNav.close();
                $timeout(function () {
                    $location.url(link.url);
                }, 300);
                return;
            }
            else if (link.state) {
                var $state = $injector.has('$state') ? $injector.get('$state') : null;
                if ($state != null && $state.current.name === link.state) {
                    pipSideNav.close();
                    return;
                }
                pipSideNav.close();
                $timeout(function () {
                    if ($injector.has('$state')) {
                        var $state = $injector.get('$state');
                        $state.go(link.state, link.stateParams);
                    }
                }, 300);
                return;
            }
            else if (link.event)
                $rootScope.$broadcast(link.event, link);
            pipSideNav.close();
        }
    }]);
})();

(function () {
    'use strict';
    var thisModule = angular.module('pipNavMenu.Service', []);
    thisModule.provider('pipNavMenu', function () {
        var config = [];
        this.sections = init;
        this.$get = ['$rootScope', '$mdSidenav', function ($rootScope, $mdSidenav) {
            return {
                get: getConfig,
                set: setConfig
            };
            function getConfig() {
                return config;
            }
            function setConfig(newConfig) {
                init(newConfig);
                $rootScope.$broadcast('pipNavMenuChanged', config);
                return config;
            }
        }];
        function init(newConfig) {
            if (_.isArray(newConfig))
                config = newConfig;
            return config;
        }
        ;
    });
})();

<<<<<<< HEAD
})(window.angular, window._);

/**
 * @file Application Side Nav component
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular, moment */

(function (angular, moment) {
=======
(function () {
    'use strict';
    var thisModule = angular.module('pipSearchBar', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipSearch.Service']);
    thisModule.run(['$injector', function ($injector) {
        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate) {
            pipTranslate.translations('en', {
                'APPBAR_SEARCH': 'Search'
            });
            pipTranslate.translations('ru', {
                'APPBAR_SEARCH': 'Поиск'
            });
        }
    }]);
    thisModule.directive('pipSearchBar', function () {
        return {
            restrict: 'E',
            scope: {},
            replace: false,
            templateUrl: function (element, attr) {
                return 'search_bar/search_bar.html';
            },
            controller: 'pipSearchBarController'
        };
    });
    thisModule.controller('pipSearchBarController', ['$scope', '$element', '$attrs', '$rootScope', 'pipSearch', function ($scope, $element, $attrs, $rootScope, pipSearch) {
        $element.addClass('pip-search-bar');
        $scope.config = pipSearch.config();
        $scope.searchEnabled = false;
        $scope.search = { text: '' };
        $rootScope.$on('pipSearchChanged', onSearchBarChanged);
        $scope.onSearchEnable = onSearchEnable;
        $scope.onSearchClick = onSearchClick;
        $scope.onSearchClear = onSearchClear;
        $scope.onSearchKeyDown = onSearchKeyDown;
        function onSearchBarChanged(event, config) {
            $scope.config = config;
            $scope.searchEnabled = false;
            $scope.search.text = '';
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
        function onSearchEnable() {
            $scope.search.text = $scope.config.criteria;
            $scope.searchEnabled = true;
            focusSearchText();
        }
        function onSearchClick() {
            var searchText = $scope.search.text;
            $scope.search.text = '';
            $scope.searchEnabled = false;
            if ($scope.config.callback) {
                $scope.config.callback(searchText);
            }
            else {
                $rootScope.$broadcast('pipSearchBarSearchClicked', searchText);
            }
        }
        function onSearchClear() {
            if ($scope.search.text) {
                $scope.search.text = '';
                focusSearchText();
            }
            else {
                $scope.searchEnabled = false;
                onSearchClick();
            }
        }
        function onSearchKeyDown(event) {
            if (event.keyCode === 13) {
                $scope.onSearchClick();
                return;
            }
            if (event.keyCode === 27) {
                $scope.searchEnabled = false;
            }
        }
    }]);
})();

(function () {
    'use strict';
    var thisModule = angular.module('pipSearch.Service', []);
    thisModule.provider('pipSearch', function () {
        var config = {
            visible: false,
            criteria: '',
            history: [],
            callback: null,
        };
        this.$get = ['$rootScope', function ($rootScope) {
            $rootScope.$on('pipSearchOpen', open);
            $rootScope.$on('pipSearchClose', close);
            return {
                config: getConfig,
                set: setSearch,
                clear: clearSearch,
                criteria: updateCriteria,
                history: updateHistory,
            };
            function getConfig() {
                return config;
            }
            function setSearch(callback, criteria, history) {
                config.callback = callback;
                config.criteria = criteria;
                config.history = history;
                sendConfigEvent();
            }
            function clearSearch() {
                config.callback = null;
                config.criteria = null;
                sendConfigEvent();
            }
            function open(event) {
                config.visible = true;
                sendConfigEvent();
            }
            function close(event) {
                config.visible = false;
                sendConfigEvent();
            }
            function toggle() {
                config.visible = !config.visible;
                sendConfigEvent();
            }
            function updateCriteria(criteria) {
                config.criteria = criteria;
                sendConfigEvent();
            }
            function updateHistory(history) {
                config.history = history;
                sendConfigEvent();
            }
            function sendConfigEvent() {
                $rootScope.$broadcast('pipSearchChanged', config);
            }
        }];
    });
})();

(function () {
>>>>>>> c1b0e404b0830e03ed6d5bae8c07543d0afda673
    'use strict';
    var thisModule = angular.module('pipSideNav', ['ngMaterial', 'pipNav.Templates', 'pipSideNav.Service']);
    thisModule.directive('pipSidenav', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            templateUrl: 'sidenav/sidenav.html',
            controller: 'pipSideNavController'
        };
    });
    thisModule.controller('pipSideNavController', ['$scope', '$element', '$rootScope', 'pipSideNav', function ($scope, $element, $rootScope, pipSideNav) {
        $element.addClass('pip-sidenav');
        $rootScope.$on('pipNavIconClicked', onNavIconClick);
        return;
        function onNavIconClick(event) {
            pipSideNav.open();
        }
    }]);
})();

(function () {
    'use strict';
    var thisModule = angular.module('pipSideNav.Part', ['pipSideNav.Service']);
    thisModule.directive('pipSidenavPart', ['ngIfDirective', function (ngIfDirective) {
        var ngIf = ngIfDirective[0];
        return {
            transclude: ngIf.transclude,
            priority: ngIf.priority,
            terminal: ngIf.terminal,
            restrict: ngIf.restrict,
            scope: true,
            link: function ($scope, $element, $attrs) {
                $attrs.ngIf = function () { return $scope.visible; };
                ngIf.link.apply(ngIf);
            },
            controller: 'pipSideNavPartController'
        };
    }]);
    thisModule.controller('pipSideNavPartController', ['$scope', '$element', '$attrs', '$rootScope', 'pipSideNav', function ($scope, $element, $attrs, $rootScope, pipSideNav) {
        var partName = '' + $attrs.pipSidenavPart;
        var partValue = null;
        var pos = partName.indexOf(':');
        if (pos > 0) {
            partValue = partName.substr(pos + 1);
            partName = partName.substr(0, pos);
        }
        onSideNavChanged(null, pipSideNav.config());
        $rootScope.$on('pipSideNavChanged', onSideNavChanged);
        function onSideNavChanged(event, config) {
            var parts = config.parts || {};
            var currentPartValue = config[partName];
            $scope.visible = partValue ? currentPartValue == partValue : currentPartValue;
        }
    }]);
})();

(function () {
    'use strict';
    var thisModule = angular.module('pipSideNav.Service', []);
    thisModule.provider('pipSideNav', function () {
        var config = {
            theme: 'default',
            parts: []
        };
        this.theme = theme;
        this.parts = initParts;
        this.$get = ['$rootScope', '$mdSidenav', function ($rootScope, $mdSidenav) {
            $rootScope.$on('pipOpenSideNav', open);
            $rootScope.$on('pipCloseSideNav', close);
            return {
                config: getConfig,
                part: getOrSetPart,
                parts: getOrSetParts,
                open: open,
                close: close,
                toggle: toggle
            };
            function getConfig() {
                return config;
            }
            function getOrSetPart(name, value) {
                if (!_.isString(name))
                    throw new Error("Part name has to be a string");
                if (value != undefined) {
                    if (config.parts[name] != value) {
                        config.parts[name] = value;
                        sendConfigEvent();
                    }
                }
                return config.parts[name];
            }
            function getOrSetParts(parts) {
                if (_.isObject(parts)) {
                    if (!_.isEqual(config.parts, parts)) {
                        config.parts = parts;
                        sendConfigEvent();
                    }
                }
                return config.parts;
            }
            function sendConfigEvent() {
                $rootScope.$broadcast('pipSideNavChanged', config);
            }
            function open(event) {
                $mdSidenav('pip-sidenav').open();
            }
            function close(event) {
                $mdSidenav('pip-sidenav').close();
            }
            function toggle() {
                $mdSidenav('pip-sidenav').toggle();
            }
        }];
        function theme(theme) {
            config.theme = theme || config.theme;
            return config.theme;
        }
        function initParts(parts) {
            if (_.isObject(parts)) {
                config.parts = parts;
            }
            return config.parts;
        }
    });
})();

(function () {
    'use strict';
    var thisModule = angular.module("pipTabs", ['pipNav.Templates']);
    thisModule.directive('pipTabs', ['$mdMedia', 'pipAssert', function ($mdMedia, pipAssert) {
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
            controller: ['$scope', '$element', '$attrs', '$mdMedia', 'localStorageService', '$injector', function ($scope, $element, $attrs, $mdMedia, localStorageService, $injector) {
                $scope.class = ($attrs.class || '') + ' md-' + localStorageService.get('theme') + '-theme';
                $scope.$mdMedia = $mdMedia;
                $scope.tabs = ($scope.tabs && _.isArray($scope.tabs)) ? $scope.tabs : [];
                var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
                if (pipTranslate) {
                    if ($scope.tabs.length > 0 && $scope.tabs[0].title) {
                        pipTranslate.translateObjects($scope.tabs, 'title', 'nameLocal');
                    }
                    else {
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
                    if ($scope.disabled())
                        return;
                    $scope.activeIndex = index;
                    $scope.activeTab = $scope.activeIndex;
                    if ($scope.select) {
                        $scope.select($scope.tabs[$scope.activeIndex], $scope.activeIndex);
                    }
                };
                $scope.showShadow = function () {
                    if ($scope.showTabsShadow) {
                        return $scope.showTabsShadow();
                    }
                    else {
                        return false;
                    }
                };
                $scope.show = function () {
                    if ($scope.showTabs) {
                        return $scope.showTabs();
                    }
                    else {
                        return true;
                    }
                };
            }]
        };
    }]);
})();



//# sourceMappingURL=pip-webui-nav.js.map
