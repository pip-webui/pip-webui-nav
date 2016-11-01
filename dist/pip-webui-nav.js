(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).nav = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var ActionItem = (function () {
    function ActionItem() {
    }
    return ActionItem;
}());
exports.ActionItem = ActionItem;
var ActionsConfig = (function () {
    function ActionsConfig() {
        this.primaryGlobalActions = [];
        this.primaryLocalActions = [];
        this.secondaryGlobalActions = [];
        this.secondaryLocalActions = [];
    }
    return ActionsConfig;
}());
exports.ActionsConfig = ActionsConfig;
function ActionsProvider() {
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
}
angular
    .module('pipActions')
    .provider('pipActions', ActionsProvider);
},{}],2:[function(require,module,exports){
'use strict';
PrimaryActionsController.$inject = ['$scope', '$element', '$attrs', '$rootScope', '$window', '$location', '$injector', 'pipActions'];
function PrimaryActionsController($scope, $element, $attrs, $rootScope, $window, $location, $injector, pipActions) {
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
}
function primaryActionsDirective() {
    return {
        restrict: 'E',
        scope: {
            localActions: '=pipLocalActions',
            globalActions: '=pipGlobalActions'
        },
        replace: false,
        templateUrl: function (element, attr) {
            return 'actions/PrimaryActions.html';
        },
        controller: PrimaryActionsController
    };
}
angular
    .module('pipActions')
    .directive('pipPrimaryActions', primaryActionsDirective);
},{}],3:[function(require,module,exports){
'use strict';
SecondaryActionsController.$inject = ['$scope', '$element', '$attrs', '$rootScope', '$window', '$location', '$injector', 'pipActions'];
function SecondaryActionsController($scope, $element, $attrs, $rootScope, $window, $location, $injector, pipActions) {
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
        if (action.event) {
            $rootScope.$broadcast(action.event);
        }
        else {
            $rootScope.$broadcast('pipActionClicked', action.name);
        }
    }
}
function secondaryActionsDirective() {
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
        templateUrl: 'actions/SecondaryActions.html',
        controller: SecondaryActionsController
    };
}
angular
    .module('pipActions')
    .directive('pipSecondaryActions', secondaryActionsDirective);
},{}],4:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipActions', ['ngMaterial', 'pipNav.Templates', 'ui.router']);
require('./ActionsService');
require('./PrimaryActionsDirective');
require('./SecondaryActionsDirective');
__export(require('./ActionsService'));
},{"./ActionsService":1,"./PrimaryActionsDirective":2,"./SecondaryActionsDirective":3}],5:[function(require,module,exports){
'use strict';
AppBarDirectiveController.$inject = ['$scope', '$element', '$rootScope', 'pipAppBar'];
function AppBarDirectiveController($scope, $element, $rootScope, pipAppBar) {
    "ngInject";
    $element.addClass('pip-appbar');
    $element.addClass('color-primary-bg');
    $scope.config = pipAppBar.config();
    $rootScope.$on('pipAppBarChanged', onAppBarChanged);
    function onAppBarChanged(event, config) {
        $scope.config = config;
    }
}
function appbarDirective() {
    return {
        restrict: 'E',
        transclude: true,
        scope: true,
        templateUrl: 'appbar/AppBar.html',
        controller: AppBarDirectiveController
    };
}
angular
    .module('pipAppBar')
    .directive('pipAppbar', appbarDirective);
},{}],6:[function(require,module,exports){
'use strict';
AppBarPartDirectiveController.$inject = ['$scope', '$element', '$attrs', '$rootScope', 'pipAppBar'];
appbarPartDirective.$inject = ['ngIfDirective'];
function AppBarPartDirectiveController($scope, $element, $attrs, $rootScope, pipAppBar) {
    "ngInject";
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
}
function appbarPartDirective(ngIfDirective) {
    "ngInject";
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
        controller: AppBarPartDirectiveController
    };
}
angular.module('pipAppBar')
    .directive('pipAppbarPart', appbarPartDirective);
},{}],7:[function(require,module,exports){
'use strict';
function AppBarProvider() {
    var config = {
        theme: 'default',
        cssClass: '',
        ngClasses: {},
        parts: {},
        showAppBar: true
    };
    this.theme = theme;
    this.parts = initParts;
    this.$get = ['$rootScope', function ($rootScope) {
        return {
            config: getConfig,
            cssClass: cssClass,
            part: getOrSetPart,
            parts: getOrSetParts,
            show: showAppBar,
            hide: hideAppBar,
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
        function showAppBar() {
            config.showAppBar = true;
            sendConfigEvent();
        }
        function hideAppBar() {
            config.showAppBar = false;
            sendConfigEvent();
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
}
angular
    .module('pipAppBar')
    .provider('pipAppBar', AppBarProvider);
},{}],8:[function(require,module,exports){
'use strict';
angular
    .module('pipAppBar', ['ngMaterial', 'pipNav.Templates']);
require('./AppBarService');
require('./AppBarDirective');
require('./AppBarPartDirective');
},{"./AppBarDirective":5,"./AppBarPartDirective":6,"./AppBarService":7}],9:[function(require,module,exports){
'use strict';
var BreadcrumbService_1 = require('./BreadcrumbService');
var BreadcrumbService_2 = require('./BreadcrumbService');
var SearchService_1 = require('../search/SearchService');
var BreadcrumbController = (function () {
    BreadcrumbController.$inject = ['$element', '$rootScope', '$window', '$state', 'pipBreadcrumb'];
    function BreadcrumbController($element, $rootScope, $window, $state, pipBreadcrumb) {
        "ngInject";
        var _this = this;
        this._rootScope = $rootScope;
        this._window = $window;
        $element.addClass('pip-breadcrumb');
        this.config = pipBreadcrumb.config;
        $rootScope.$on(BreadcrumbService_1.BreadcrumbChangedEvent, function (event, config) { _this.onBreadcrumbChanged(event, config); });
        $rootScope.$on(BreadcrumbService_2.BreadcrumbBackEvent, function () { _this.onBreadcrumbBack(); });
    }
    BreadcrumbController.prototype.onBreadcrumbChanged = function (event, config) {
        this.config = config;
    };
    BreadcrumbController.prototype.onBreadcrumbBack = function () {
        var items = this.config.items;
        if (_.isArray(items) && items.length > 0) {
            var item = items[items.length - 1];
            var backCallback = item.click;
            if (_.isFunction(backCallback))
                backCallback(item);
            else
                this._window.history.back();
        }
        else
            this._window.history.back();
    };
    BreadcrumbController.prototype.onClick = function (item) {
        if (_.isFunction(item.click))
            item.click(item);
    };
    BreadcrumbController.prototype.openSearch = function () {
        this._rootScope.$broadcast(SearchService_1.OpenSearchEvent);
    };
    return BreadcrumbController;
}());
function breadcrumbDirective() {
    return {
        restrict: 'E',
        scope: {},
        replace: false,
        templateUrl: 'breadcrumb/Breadcrumb.html',
        controller: BreadcrumbController,
        controllerAs: 'vm'
    };
}
angular.module('pipBreadcrumb')
    .directive('pipBreadcrumb', breadcrumbDirective);
},{"../search/SearchService":29,"./BreadcrumbService":10}],10:[function(require,module,exports){
'use strict';
exports.BreadcrumbChangedEvent = "pipBreadcrumbChanged";
exports.BreadcrumbBackEvent = "pipBreadcrumbBack";
var BreadcrumbItem = (function () {
    function BreadcrumbItem(title, click) {
        if (title === void 0) { title = null; }
        if (click === void 0) { click = null; }
        this.title = title;
        this.click = click;
    }
    return BreadcrumbItem;
}());
exports.BreadcrumbItem = BreadcrumbItem;
var BreadcrumbConfig = (function () {
    function BreadcrumbConfig() {
    }
    return BreadcrumbConfig;
}());
exports.BreadcrumbConfig = BreadcrumbConfig;
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
        this._rootScope.$broadcast(exports.BreadcrumbChangedEvent, this._config);
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
angular.module('pipBreadcrumb')
    .provider('pipBreadcrumb', BreadcrumbProvider);
},{}],11:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipBreadcrumb', ['ngMaterial', 'pipNav.Templates', 'pipNav.Translate']);
require('./BreadcrumbDirective');
require('./BreadcrumbService');
__export(require('./BreadcrumbService'));
},{"./BreadcrumbDirective":9,"./BreadcrumbService":10}],12:[function(require,module,exports){
'use strict';
var NavService = (function () {
    NavService.$inject = ['$injector'];
    function NavService($injector) {
        "ngInject";
        this.appBar = $injector.has('pipAppBar') ? $injector.get('pipAppBar') : null;
        this.navIcon = $injector.has('pipNavIcon') ? $injector.get('pipNavIcon') : null;
        this.breadcrumb = $injector.has('pipBreadcrumb') ? $injector.get('pipBreadcrumb') : null;
        this.actions = $injector.has('pipActions') ? $injector.get('pipActions') : null;
        this.search = $injector.has('pipSearch') ? $injector.get('pipSearch') : null;
        this.sideNav = $injector.has('pipSideNav') ? $injector.get('pipSideNav') : null;
        this.navHeader = $injector.has('pipNavHeader') ? $injector.get('pipNavHeader') : null;
        this.navMenu = $injector.has('pipNavMenu') ? $injector.get('pipNavMenu') : null;
    }
    return NavService;
}());
angular
    .module('pipNavService', [])
    .service('pipNavService', NavService);
},{}],13:[function(require,module,exports){
'use strict';
translateFilter.$inject = ['$injector'];
function translateFilter($injector) {
    "ngInject";
    var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    return function (key) {
        return pipTranslate ? pipTranslate.translate(key) || key : key;
    };
}
angular
    .module('pipNav.Translate', [])
    .filter('translate', translateFilter);
},{}],14:[function(require,module,exports){
'use strict';
DropdownDirectiveController.$inject = ['$scope', '$element', '$attrs', '$injector', '$rootScope', '$mdMedia'];
function DropdownDirectiveController($scope, $element, $attrs, $injector, $rootScope, $mdMedia) {
    "ngInject";
    var pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null;
    var currentTheme = 'default';
    if (pipTheme)
        currentTheme = pipTheme.use();
    else if ($rootScope.$theme)
        currentTheme = $rootScope.$theme;
    $scope.class = ($attrs.class || '') + ' md-' + currentTheme + '-theme';
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
}
function dropdownDirective() {
    return {
        restrict: 'E',
        scope: {
            ngDisabled: '&',
            actions: '=pipActions',
            showDropdown: '&pipShow',
            activeIndex: '=pipActiveIndex',
            select: '=pipDropdownSelect'
        },
        templateUrl: 'dropdown/Dropdown.html',
        controller: DropdownDirectiveController
    };
}
angular
    .module('pipDropdown', ['pipNav.Templates'])
    .directive('pipDropdown', dropdownDirective);
},{}],15:[function(require,module,exports){
'use strict';
NavHeaderDirectiveController.$inject = ['$scope', '$element', '$rootScope', '$timeout', 'pipNavHeader'];
function NavHeaderDirectiveController($scope, $element, $rootScope, $timeout, pipNavHeader) {
    "ngInject";
    var image = null, imageBlock = $element.find('.pip-nav-header-user'), $image;
    $element.addClass('pip-nav-header');
    $rootScope.$on('pipIdentityChanged', onIdentityChanged);
    $rootScope.$on('pipNavHeaderImageChanged', onIdentityChanged);
    $scope.onUserClick = onUserClick;
    $timeout(function () {
        $image = $element.find('.pip-nav-header-user-image');
        onIdentityChanged();
        $image.load(function ($event) {
            image = $($event.target);
            setImageMarginCSS(imageBlock, image);
        });
    }, 10);
    return;
    function setImageMarginCSS(container, image) {
        var cssParams = {}, containerWidth = container.width ? container.width() : container.clientWidth, containerHeight = container.height ? container.height() : container.clientHeight, imageWidth = image[0].naturalWidth || image.width, imageHeight = image[0].naturalHeight || image.height, margin = 0;
        if ((imageWidth / containerWidth) > (imageHeight / containerHeight)) {
            margin = -((imageWidth / imageHeight * containerHeight - containerWidth) / 2);
            cssParams['margin-left'] = '' + margin + 'px';
            cssParams['height'] = '' + containerHeight + 'px';
            cssParams['width'] = '' + imageWidth * containerHeight / imageHeight + 'px';
            cssParams['margin-top'] = '';
        }
        else {
            margin = -((imageHeight / imageWidth * containerWidth - containerHeight) / 2);
            cssParams['margin-top'] = '' + margin + 'px';
            cssParams['height'] = '' + imageHeight * containerWidth / imageWidth + 'px';
            cssParams['width'] = '' + containerWidth + 'px';
            cssParams['margin-left'] = '';
        }
        image.css(cssParams);
    }
    ;
    function onIdentityChanged() {
        var url, config = pipNavHeader.config();
        url = $scope.imageUrl ? $scope.imageUrl : config.defaultImageUrl;
        if (url) {
            $image.attr('src', url);
        }
        else {
            imageBlock.css('display', 'none');
        }
    }
    function onUserClick() {
        $rootScope.$broadcast('pipNavUserClicked');
    }
}
function navHeaderDirective() {
    return {
        restrict: 'EA',
        scope: {
            title: '=pipTitle',
            subtitle: '=pipSubTitle',
            imageUrl: '=pipImage',
            imageCss: '=pipImageCss'
        },
        replace: false,
        templateUrl: 'header/NavHeader.html',
        controller: NavHeaderDirectiveController
    };
}
angular.module('pipNavHeader')
    .directive('pipNavHeader', navHeaderDirective);
},{}],16:[function(require,module,exports){
'use strict';
function NavHeaderProvider() {
    var config = {
        defaultImageUrl: null,
    };
    this.config = getConfig;
    this.clear = clear;
    this.image = setImage;
    this.$get = ['$rootScope', function ($rootScope) {
        return {
            config: getConfig,
            image: showImage
        };
        function showImage(imageUrl) {
            setImage(imageUrl);
            sendConfigEvent();
        }
        function sendConfigEvent() {
            $rootScope.$broadcast('pipNavHeaderImageChanged', config);
        }
    }];
    function getConfig() {
        return config;
    }
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
},{}],17:[function(require,module,exports){
'use strict';
StickyNavHeaderDirectiveController.$inject = ['$scope', '$element', '$rootScope', '$timeout', 'pipNavHeader'];
function StickyNavHeaderDirectiveController($scope, $element, $rootScope, $timeout, pipNavHeader) {
    "ngInject";
    var image = null, imageBlock = $element.find('.pip-sticky-nav-header-user'), $image;
    $element.addClass('pip-sticky-nav-header');
    $rootScope.$on('pipIdentityChanged', onIdentityChanged);
    $rootScope.$on('pipNavHeaderImageChanged', onIdentityChanged);
    $rootScope.$on('pipSideNavStateChange', onStateChanged1);
    $scope.onUserClick = onUserClick;
    $timeout(function () {
        $image = $element.find('.pip-sticky-nav-header-user-image');
        onIdentityChanged();
        $image.load(function ($event) {
            image = $($event.target);
            setImageMarginCSS(imageBlock, image);
        });
    }, 10);
    return;
    function onStateChanged1(event, state) {
        if (state === undefined)
            return;
        var def = $scope.showHeader === undefined ? 0 : 450;
        if (state.id == 'toggle') {
            $timeout(function () {
                $scope.showHeader = true;
            }, 450);
        }
        else {
            $scope.showHeader = false;
        }
    }
    function setImageMarginCSS(container, image) {
        var cssParams = {}, containerWidth = container.width ? container.width() : container.clientWidth, containerHeight = container.height ? container.height() : container.clientHeight, imageWidth = image[0].naturalWidth || image.width, imageHeight = image[0].naturalHeight || image.height, margin = 0;
        if ((imageWidth / containerWidth) > (imageHeight / containerHeight)) {
            margin = -((imageWidth / imageHeight * containerHeight - containerWidth) / 2);
            cssParams['margin-left'] = '' + margin + 'px';
            cssParams['height'] = '' + containerHeight + 'px';
            cssParams['width'] = '' + imageWidth * containerHeight / imageHeight + 'px';
            cssParams['margin-top'] = '';
        }
        else {
            margin = -((imageHeight / imageWidth * containerWidth - containerHeight) / 2);
            cssParams['margin-top'] = '' + margin + 'px';
            cssParams['height'] = '' + imageHeight * containerWidth / imageWidth + 'px';
            cssParams['width'] = '' + containerWidth + 'px';
            cssParams['margin-left'] = '';
        }
        image.css(cssParams);
    }
    ;
    function onIdentityChanged() {
        var url, config = pipNavHeader.config();
        url = $scope.imageUrl ? $scope.imageUrl : config.defaultImageUrl;
        if (url) {
            $image.attr('src', url);
        }
        else {
            imageBlock.css('display', 'none');
        }
    }
    function onUserClick() {
        $rootScope.$broadcast('pipNavUserClicked');
    }
}
function stickyNavHeaderDirective() {
    return {
        restrict: 'EA',
        scope: {
            title: '=pipTitle',
            subtitle: '=pipSubTitle',
            imageUrl: '=pipImage',
            imageCss: '=pipImageCss'
        },
        replace: false,
        templateUrl: 'header/StickyNavHeader.html',
        controller: StickyNavHeaderDirectiveController
    };
}
angular
    .module('pipNavHeader')
    .directive('pipStickyNavHeader', stickyNavHeaderDirective);
},{}],18:[function(require,module,exports){
'use strict';
angular.module('pipNavHeader', ['ngMaterial', 'pipNav.Templates']);
require('./NavHeaderService');
require('./NavHeaderDirective');
require('./StickyNavHeaderDirective');
},{"./NavHeaderDirective":15,"./NavHeaderService":16,"./StickyNavHeaderDirective":17}],19:[function(require,module,exports){
'use strict';
NavIconDirectiveController.$inject = ['$scope', '$element', '$attrs', '$rootScope', '$window', 'pipNavIcon'];
function NavIconDirectiveController($scope, $element, $attrs, $rootScope, $window, pipNavIcon) {
    "ngInject";
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
}
function navIconDirective() {
    return {
        restrict: 'E',
        scope: {
            type: '=pipType',
            imageUrl: '=pipImageUrl'
        },
        replace: false,
        templateUrl: 'icon/NavIcon.html',
        controller: NavIconDirectiveController
    };
}
angular
    .module('pipNavIcon')
    .directive('pipNavIcon', navIconDirective);
},{}],20:[function(require,module,exports){
'use strict';
function NavIconProvider() {
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
}
angular
    .module('pipNavIcon')
    .provider('pipNavIcon', NavIconProvider);
},{}],21:[function(require,module,exports){
'use strict';
angular.module('pipNavIcon', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require('./NavIconService');
require('./NavIconDirective');
},{"./NavIconDirective":19,"./NavIconService":20}],22:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
require('./dependencies/TranslateFilter');
require('./language/LanguagePicker');
require('./dropdown/DropdownDirective');
require('./tabs/TabsDirective');
require('./actions');
require('./appbar');
require('./search');
require('./breadcrumb');
require('./sidenav');
require('./header');
require('./menu');
require('./icon');
require('./common/NavService');
angular
    .module('pipNav', [
    'pipNavService',
    'pipDropdown',
    'pipTabs',
    'pipAppBar',
    'pipSearchBar',
    'pipNavIcon',
    'pipBreadcrumb',
    'pipActions',
    'pipSideNav',
    'pipNavMenu',
    'pipNavHeader'
]);
__export(require('./actions'));
__export(require('./breadcrumb'));
__export(require('./search'));
},{"./actions":4,"./appbar":8,"./breadcrumb":11,"./common/NavService":12,"./dependencies/TranslateFilter":13,"./dropdown/DropdownDirective":14,"./header":18,"./icon":21,"./language/LanguagePicker":23,"./menu":27,"./search":30,"./sidenav":35,"./tabs/TabsDirective":36}],23:[function(require,module,exports){
'use strict';
var LanguagePickerDirectiveController = (function () {
    LanguagePickerDirectiveController.$inject = ['$scope', '$element', '$attrs', '$rootScope', '$timeout', '$injector'];
    function LanguagePickerDirectiveController($scope, $element, $attrs, $rootScope, $timeout, $injector) {
        "ngInject";
        this.languages = ['en', 'ru'];
        this._timeout = $timeout;
        this._translate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        $element.addClass('pip-language-picker');
        this.languages = $scope.languages;
        $rootScope.$on('pipSetLanguages', this.setLanguages);
    }
    Object.defineProperty(LanguagePickerDirectiveController.prototype, "language", {
        get: function () {
            return this._translate ? this._translate.language : null;
        },
        enumerable: true,
        configurable: true
    });
    LanguagePickerDirectiveController.prototype.setLanguages = function (lang) {
        this.languages = lang.length > 0 ? lang : ['en', 'ru'];
    };
    LanguagePickerDirectiveController.prototype.onLanguageClick = function (language) {
        var _this = this;
        if (this._translate != null) {
            this._timeout(function () {
                _this._translate.language = _this.language;
            }, 0);
        }
    };
    return LanguagePickerDirectiveController;
}());
function languagePickerDirective() {
    return {
        restrict: 'E',
        scope: {
            languages: '=languages',
        },
        replace: false,
        templateUrl: function (element, attr) {
            return 'language/LanguagePicker.html';
        },
        controller: LanguagePickerDirectiveController,
        controllerAs: 'vm'
    };
}
angular
    .module('pipLanguagePicker', [
    'ngMaterial', 'pipNav.Translate', 'pipNav.Templates'
])
    .directive('pipLanguagePicker', languagePickerDirective);
},{}],24:[function(require,module,exports){
'use strict';
NavMenuDirectiveController.$inject = ['$scope', '$element', '$rootScope', '$window', '$location', '$timeout', '$injector', 'pipSideNav', 'pipNavMenu'];
function NavMenuDirectiveController($scope, $element, $rootScope, $window, $location, $timeout, $injector, pipSideNav, pipNavMenu) {
    "ngInject";
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
}
function navMenuDirective() {
    return {
        restrict: 'EA',
        scope: {
            config: '=pipLinks'
        },
        replace: false,
        templateUrl: 'menu/NavMenu.html',
        controller: NavMenuDirectiveController
    };
}
angular
    .module('pipNavMenu')
    .directive('pipNavMenu', navMenuDirective);
},{}],25:[function(require,module,exports){
'use strict';
function NavMenuProvider() {
    var config = [], collapsed = true, sectionIcon;
    this.sections = init;
    this.sectionIcon = setOrGetIcon;
    this.collapsed = setOrGetCollapsed;
    this.$get = ['$rootScope', '$mdSidenav', function ($rootScope, $mdSidenav) {
        return {
            get: getConfig,
            set: setConfig,
            setCounter: setCounter,
            collapsed: setOrGetCollapsed,
            icon: setOrGetIcon
        };
        function getConfig() {
            return config;
        }
        function setConfig(newConfig) {
            init(newConfig);
            $rootScope.$broadcast('pipNavMenuChanged', config);
            return config;
        }
        function setCounter(linkTitle, counter) {
            if (!linkTitle || !angular.isNumber(counter)) {
                return;
            }
            var section, menuItem;
            section = _.find(config, function (s) {
                var item = _.find(s.links, { title: linkTitle });
                if (item) {
                    return item;
                }
                else {
                    return false;
                }
                ;
            });
            menuItem = _.find(section.links, { title: linkTitle });
            menuItem.count = counter;
            setConfig(config);
        }
    }];
    function setOrGetIcon(value) {
        if (_.isString(value)) {
            sectionIcon = value;
        }
        return sectionIcon;
    }
    function setOrGetCollapsed(value) {
        if (value !== undefined) {
            collapsed = value;
        }
        return collapsed;
    }
    function init(newConfig) {
        if (_.isArray(newConfig)) {
            config = newConfig;
        }
        return config;
    }
    ;
}
angular
    .module('pipNavMenu')
    .provider('pipNavMenu', NavMenuProvider);
},{}],26:[function(require,module,exports){
'use strict';
StickyNavMenuDirectiveController.$inject = ['$scope', '$element', '$rootScope', '$window', '$location', '$timeout', '$injector', 'pipSideNav', 'pipNavMenu'];
function StickyNavMenuDirectiveController($scope, $element, $rootScope, $window, $location, $timeout, $injector, pipSideNav, pipNavMenu) {
    "ngInject";
    var pipSdeNavElement = $element.parent().parent();
    $element.addClass('pip-sticky-nav-menu');
    $scope.config = $scope.config || pipNavMenu.get();
    pipNavMenu.set($scope.config);
    $scope.defaultIcon = 'icons:folder';
    onStateChanged(null, pipSideNav.state());
    $rootScope.$on('pipNavMenuChanged', onConfigChanged);
    $rootScope.$on('pipSideNavStateChange', onStateChanged);
    $scope.itemVisible = itemVisible;
    $scope.onLinkClick = onLinkClick;
    $scope.isSectionEmpty = isSectionEmpty;
    $scope.onExpand = onExpand;
    $scope.isActive = isActive;
    return;
    function onExpand() {
        if (!$scope.isCollapsed) {
            return;
        }
        $scope.expanded = !$scope.expanded;
        if ($scope.expanded) {
            pipSdeNavElement.removeClass('pip-sticky-nav-small');
        }
        else {
            pipSdeNavElement.addClass('pip-sticky-nav-small');
        }
        $rootScope.$broadcast('pipNavExpanded', $scope.expanded);
    }
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
        $scope.isCollapsed = pipNavMenu.collapsed();
        $scope.config = config;
    }
    function onStateChanged(event, state) {
        pipNavMenu.collapsed(state.expand);
        $scope.isCollapsed = state.expand;
        $scope.expanded = state.isExpanded;
        $scope.expandedButton = state.expandedButton;
        $scope.sideNavState = state;
    }
    function isActive(link) {
        if (link.href) {
            if (link.href.split('?')[0] === $window.location.href.split('?')[0]) {
                return true;
            }
        }
        else if (link.url) {
            if (link.url.split(/[\s/?]+/)[1] === $location.url().split(/[\s/?]+/)[1]) {
                return true;
            }
        }
        else if (link.state) {
            var $state = $injector.has('$state') ? $injector.get('$state') : null;
            if ($state != null && $state.includes(link.state)) {
                return true;
            }
        }
        return false;
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
}
function stickyNavMenuDirective() {
    return {
        restrict: 'EA',
        scope: {
            config: '=pipLinks',
            collapsed: '=pipCollapsed'
        },
        replace: false,
        templateUrl: 'menu/StickyNavMenu.html',
        controller: StickyNavMenuDirectiveController
    };
}
angular
    .module('pipNavMenu')
    .directive('pipStickyNavMenu', stickyNavMenuDirective);
},{}],27:[function(require,module,exports){
'use strict';
angular.module('pipNavMenu', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require('./NavMenuService');
require('./NavMenuDirective');
require('./StickyNavMenuDirective');
},{"./NavMenuDirective":24,"./NavMenuService":25,"./StickyNavMenuDirective":26}],28:[function(require,module,exports){
'use strict';
var SearchService_1 = require('./SearchService');
var SearchService_2 = require('./SearchService');
var SearchBarController = (function () {
    SearchBarController.$inject = ['$element', '$rootScope', 'pipSearch'];
    function SearchBarController($element, $rootScope, pipSearch) {
        "ngInject";
        var _this = this;
        this.enabled = false;
        this.search = { text: '' };
        this._rootScope = $rootScope;
        $element.addClass('pip-search-bar');
        this.config = pipSearch.config;
        $rootScope.$on(SearchService_1.SearchChangedEvent, function (event, config) {
            _this.onSearchChanged(event, config);
        });
    }
    SearchBarController.prototype.onSearchChanged = function (event, config) {
        this.config = config;
        this.enabled = false;
        this.search.text = '';
    };
    SearchBarController.prototype.focusText = function () {
        setTimeout(function () {
            var element = $('.pip-search-text');
            if (element.length > 0)
                element.focus();
        }, 0);
    };
    SearchBarController.prototype.enable = function () {
        this.search.text = this.config.criteria;
        this.enabled = true;
        this.focusText();
    };
    SearchBarController.prototype.onClick = function () {
        var search = this.search.text;
        this.search.text = '';
        this.enabled = false;
        if (this.config.callback)
            this.config.callback(search);
        else
            this._rootScope.$broadcast(SearchService_2.SearchActivatedEvent, search);
    };
    SearchBarController.prototype.clear = function () {
        if (this.search.text) {
            this.search.text = '';
            this.focusText();
        }
        else {
            this.enabled = false;
            this.onClick();
        }
    };
    SearchBarController.prototype.onKeyDown = function (event) {
        if (event.keyCode === 13)
            this.onClick();
        else if (event.keyCode === 27)
            this.enabled = false;
    };
    return SearchBarController;
}());
function searchBarDirective() {
    return {
        restrict: 'E',
        scope: {},
        replace: false,
        templateUrl: 'search/SearchBar.html',
        controller: SearchBarController,
        controllerAs: 'vm'
    };
}
angular.module('pipSearchBar')
    .directive('pipSearchBar', searchBarDirective);
},{"./SearchService":29}],29:[function(require,module,exports){
'use strict';
exports.OpenSearchEvent = 'pipOpenSearch';
exports.CloseSearchEvent = 'pipCloseSearch';
exports.SearchChangedEvent = 'pipSearchChanged';
exports.SearchActivatedEvent = 'pipSearchActivated';
var SearchConfig = (function () {
    function SearchConfig() {
    }
    return SearchConfig;
}());
exports.SearchConfig = SearchConfig;
var SearchService = (function () {
    function SearchService(config, $rootScope) {
        var _this = this;
        this._config = config;
        this._rootScope = $rootScope;
        $rootScope.$on(exports.OpenSearchEvent, function () { _this.open; });
        $rootScope.$on(exports.CloseSearchEvent, function () { _this.close; });
    }
    Object.defineProperty(SearchService.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    SearchService.prototype.set = function (callback, criteria, history) {
        this._config.callback = callback;
        this._config.criteria = criteria;
        this._config.history = history;
        this.sendConfigEvent();
    };
    SearchService.prototype.clear = function () {
        this._config.callback = null;
        this._config.criteria = null;
        this.sendConfigEvent();
    };
    SearchService.prototype.open = function () {
        this._config.visible = true;
        this.sendConfigEvent();
    };
    SearchService.prototype.close = function () {
        this._config.visible = false;
        this.sendConfigEvent();
    };
    SearchService.prototype.toggle = function () {
        this._config.visible = !this._config.visible;
        this.sendConfigEvent();
    };
    SearchService.prototype.criteria = function (value) {
        this._config.criteria = value;
        this.sendConfigEvent();
    };
    SearchService.prototype.history = function (history) {
        this._config.history = history;
        this.sendConfigEvent();
    };
    SearchService.prototype.sendConfigEvent = function () {
        this._rootScope.$broadcast(exports.SearchChangedEvent, this._config);
    };
    return SearchService;
}());
var SearchProvider = (function () {
    function SearchProvider() {
        this._config = new SearchConfig();
        this._service = null;
    }
    SearchProvider.prototype.$get = ['$rootScope', function ($rootScope) {
        "ngInject";
        if (this._service == null)
            this._service = new SearchService(this._config, $rootScope);
        return this._service;
    }];
    return SearchProvider;
}());
angular.module('pipSearchBar')
    .provider('pipSearch', SearchProvider);
},{}],30:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipSearchBar', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require('./SearchService');
require('./SearchBarDirective');
__export(require('./SearchService'));
},{"./SearchBarDirective":28,"./SearchService":29}],31:[function(require,module,exports){
'use strict';
SideNavDirectiveController.$inject = ['$scope', '$element', '$rootScope', 'pipSideNav'];
function SideNavDirectiveController($scope, $element, $rootScope, pipSideNav) {
    "ngInject";
    $element.addClass('pip-sidenav');
    pipSideNav.id('pip-sidenav');
    $rootScope.$on('pipNavIconClicked', onNavIconClick);
    return;
    function onNavIconClick(event) {
        pipSideNav.open();
    }
}
function sidenavDirective() {
    return {
        restrict: 'E',
        transclude: true,
        scope: true,
        templateUrl: 'sidenav/SideNav.html',
        controller: SideNavDirectiveController
    };
}
angular
    .module('pipSideNav')
    .directive('pipSidenav', sidenavDirective);
},{}],32:[function(require,module,exports){
'use strict';
SideNavPartDirectiveController.$inject = ['$scope', '$element', '$attrs', '$rootScope', 'pipSideNav'];
sidenavPartDirective.$inject = ['ngIfDirective'];
function SideNavPartDirectiveController($scope, $element, $attrs, $rootScope, pipSideNav) {
    "ngInject";
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
}
function sidenavPartDirective(ngIfDirective) {
    "ngInject";
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
        controller: SideNavPartDirectiveController
    };
}
angular
    .module('pipSideNav')
    .directive('pipSidenavPart', sidenavPartDirective);
},{}],33:[function(require,module,exports){
'use strict';
function SideNavProvider() {
    var config = {
        theme: 'default',
        parts: []
    }, sideNavId = 'pip-sidenav', sideNavState = {};
    this.id = id;
    this.theme = theme;
    this.parts = initParts;
    this.$get = ['$rootScope', '$mdSidenav', function ($rootScope, $mdSidenav) {
        $rootScope.$on('pipOpenSideNav', open);
        $rootScope.$on('pipCloseSideNav', close);
        return {
            config: getConfig,
            part: getOrSetPart,
            parts: getOrSetParts,
            id: getOrSetId,
            open: open,
            close: close,
            toggle: toggle,
            state: getOrSetState
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
        function getOrSetId(value) {
            if (_.isString(value)) {
                if (sideNavId !== value) {
                    sideNavId = value;
                }
            }
            return sideNavId;
        }
        function getOrSetState(value) {
            if (angular.isObject(value)) {
                sideNavState = _.cloneDeep(value);
            }
            $rootScope.$broadcast('pipSideNavStateChange', sideNavState);
            return sideNavState;
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
            $mdSidenav(sideNavId).open();
        }
        function close(event) {
            console.log('close', sideNavId);
            $mdSidenav(sideNavId).close();
        }
        function toggle() {
            $mdSidenav(sideNavId).toggle();
            $rootScope.$broadcast('pipSideNavToggle', config);
        }
    }];
    function setState(value) {
        sideNavState = value || sideNavState;
        return sideNavState;
    }
    function id(value) {
        sideNavId = value || sideNavId;
        return sideNavId;
    }
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
}
angular
    .module('pipSideNav')
    .provider('pipSideNav', SideNavProvider);
},{}],34:[function(require,module,exports){
'use strict';
StickySideNavDirectiveController.$inject = ['$scope', '$element', '$rootScope', '$injector', '$mdMedia', '$timeout', 'pipSideNav'];
function StickySideNavDirectiveController($scope, $element, $rootScope, $injector, $mdMedia, $timeout, pipSideNav) {
    "ngInject";
    var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null, mainContainer = '.pip-main', bigWidth = 320, smallWidth = 72, isResizing = false, animationDuration = 400, mediaBreakpoints;
    pipMedia = pipMedia !== undefined ? pipMedia : $mdMedia;
    $scope.navState = {
        toggle: {
            id: 'toggle',
            addClass: 'sidenav-mobile',
            showHeader: true,
            isLockedOpen: false,
            expandedButton: false,
            isExpanded: true,
            expand: true,
            showIconTooltype: false
        },
        small: {
            id: 'small',
            addClass: 'pip-sticky-nav-small sidenav-desktop',
            showHeader: false,
            isLockedOpen: true,
            expandedButton: false,
            isExpanded: false,
            expand: false,
            showIconTooltype: true
        },
        large: {
            id: 'large',
            addClass: 'sidenav-desktop',
            showHeader: false,
            isLockedOpen: true,
            expandedButton: true,
            isExpanded: true,
            expand: true,
            showIconTooltype: true
        },
        xlarge: {
            id: 'xlarge',
            addClass: 'sidenav-desktop',
            showHeader: false,
            isLockedOpen: true,
            expandedButton: false,
            isExpanded: true,
            expand: true,
            showIconTooltype: false
        }
    };
    mediaBreakpoints = setBreakpoints();
    $element.addClass('pip-sticky-sidenav .sidenav-desktop-not-animation');
    pipSideNav.id('pip-sticky-sidenav');
    $timeout(setSideNaveState, 100);
    var windowResize = _.debounce(setSideNaveState, 20);
    $rootScope.$on('pipNavIconClicked', onNavIconClick);
    $rootScope.$on('pipSideNavState', onSideNavState);
    $rootScope.$on('pipMainResized', windowResize);
    return;
    function setBreakpoints() {
        if (!pipMedia || !angular.isObject(pipMedia.breakpoints)) {
            return { xs: 639, sm: 959, md: 1024, lg: 1919 };
        }
        else {
            return pipMedia.breakpoints;
        }
    }
    function onNavIconClick(event) {
        pipSideNav.open();
    }
    function onSideNavState(event, state) {
        if (angular.isString(state) && $scope.navState[state] !== undefined) {
            setState(state);
        }
    }
    function setSideNaveState() {
        if (isResizing) {
            $timeout(setSideNaveState, animationDuration);
            return;
        }
        var mainWidth = $(mainContainer).innerWidth();
        if (mainWidth < mediaBreakpoints.sm) {
            setState('toggle');
            return;
        }
        if (mainWidth < mediaBreakpoints.md + smallWidth && mainWidth >= mediaBreakpoints.sm + smallWidth) {
            setState('small');
            return;
        }
        if (mainWidth >= mediaBreakpoints.md + bigWidth && mainWidth <= mediaBreakpoints.lg) {
            setState('large');
            return;
        }
        if (mainWidth > mediaBreakpoints.lg) {
            setState('xlarge');
            return;
        }
    }
    function setState(state) {
        if (isResizing)
            return;
        if ($scope.sidenavState && $scope.sidenavState.id == state)
            return;
        if ($scope.sidenavState && $scope.sidenavState.id == 'toggle') {
            $element.removeClass('sidenav-mobile');
        }
        if ($scope.sidenavState && $scope.sidenavState.id == 'small') {
            $element.removeClass('pip-sticky-nav-small');
        }
        if (state == 'toggle') {
            $element.removeClass('sidenav-desktop pip-sticky-nav-small');
        }
        isResizing = true;
        $scope.sidenavState = $scope.navState[state];
        $element.addClass($scope.sidenavState.addClass);
        pipSideNav.state($scope.sidenavState);
        $timeout(function () {
            isResizing = false;
        }, animationDuration);
    }
}
function stickySideNavDirective() {
    return {
        restrict: 'E',
        transclude: true,
        scope: true,
        templateUrl: 'sidenav/StickySideNav.html',
        controller: StickySideNavDirectiveController
    };
}
angular
    .module('pipSideNav')
    .directive('pipStickySidenav', stickySideNavDirective);
},{}],35:[function(require,module,exports){
'use strict';
angular.module('pipSideNav', ['ngMaterial', 'pipNav.Templates']);
require('./SideNavService');
require('./SideNavDirective');
require('./SideNavPartDirective');
require('./StickySideNavDirective');
},{"./SideNavDirective":31,"./SideNavPartDirective":32,"./SideNavService":33,"./StickySideNavDirective":34}],36:[function(require,module,exports){
'use strict';
TabsDirectiveController.$inject = ['$scope', '$element', '$attrs', '$mdMedia', '$injector', '$rootScope'];
function TabsDirectiveController($scope, $element, $attrs, $mdMedia, $injector, $rootScope) {
    "ngInject";
    var pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null, currentTheme = 'default';
    if (pipTheme)
        currentTheme = pipTheme.use();
    else if ($rootScope.$theme)
        currentTheme = $rootScope.$theme;
    $scope.class = ($attrs.class || '') + ' md-' + currentTheme + '-theme';
    if (pipTranslate) {
        if ($scope.tabs.length > 0 && $scope.tabs[0].title) {
            pipTranslate.translateObjects($scope.tabs, 'title', 'nameLocal');
        }
        else {
            pipTranslate.translateObjects($scope.tabs, 'name', 'nameLocal');
        }
    }
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
},{}],37:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('actions/PrimaryActions.html',
    '<md-menu md-position-mode="target-right target" class="pip-primary-actions" ng-repeat="action in config.primaryLocalActions"><md-button class="pip-primary-actions-action md-icon-button" ng-class="{ \'pip-primary-actions-hide-sm\': action.hideSmall, \'pip-primary-actions-show-sm\': action.showSmall }" ng-click="onActionClick(action, $mdOpenMenu);" ng-hide="actionHidden(action)" aria-label="{{action.tooltip | translate}}"><div class="pip-primary-actions-badge" ng-show="action.count > 0">{{actionCount(action)}}</div><md-icon md-svg-icon="{{action.icon}}"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="subAction in action.subActions" ng-if="!subAction.divider" ng-hide="actionHidden(subAction)"><md-button ng-hide="subAction.divider" ng-click="onActionClick(subAction)">{{subAction.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="subAction.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu><md-menu md-position-mode="target-right target" class="pip-primary-actions" ng-repeat="action in config.primaryGlobalActions"><md-button class="pip-primary-actions-action md-icon-button" ng-class="{ \'pip-primary-actions-hide-sm\': action.hideSmall, \'pip-primary-actions-show-sm\': action.showSmall }" ng-click="onActionClick(action, $mdOpenMenu);" ng-hide="actionHidden(action)" aria-label="{{action.tooltip | translate}}"><div class="pip-primary-actions-badge" ng-show="action.count > 0">{{actionCount(action)}}</div><md-icon md-svg-icon="{{action.icon}}"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="subAction in action.subActions" ng-if="!subAction.divider" ng-hide="actionHidden(subAction)"><md-button ng-hide="subAction.divider" ng-click="onActionClick(subAction)">{{subAction.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="subAction.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('actions/SecondaryActions.html',
    '<md-menu ng-if="secondaryActionsVisible()" md-position-mode="target-right target"><md-button class="md-icon-button" ng-click="onSecondaryActionClick(); openMenu($mdOpenMenu, $event);" aria-label="open actions"><md-icon md-svg-icon="icons:vdots"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="action in config.secondaryLocalActions" ng-if="!action.divider" ng-hide="actionHidden(action)"><md-button ng-hide="action.divider" ng-click="onActionClick(action)">{{action.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="action.divider" ng-repeat-end=""></md-menu-divider><md-menu-divider ng-if="secondaryDividerVisible()"></md-menu-divider><md-menu-item ng-repeat-start="action in config.secondaryGlobalActions" ng-if="!action.divider" ng-hide="actionHidden(action)"><md-button ng-hide="action.divider" ng-click="onActionClick(action)">{{action.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="action.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('appbar/AppBar.html',
    '<md-toolbar md-theme-watch="true" ng-if="config.showAppBar" ng-class="config.ngClasses" class="{{ config.cssClass }}" ng-transclude=""></md-toolbar>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('breadcrumb/Breadcrumb.html',
    '<div><div class="hide-xs text-overflow"><span ng-if="vm.config.criteria" ng-click="vm.openSearch()">{{vm.config.criteria}} -</span><span class="pip-breadcrumb-item" ng-if="vm.config.items && vm.config.items.length > 0" ng-repeat-start="item in vm.config.items" ng-click="vm.onClick(item)" ng-init="stepWidth = 100/(vm.config.items.length + 1)" ng-class="{\'cursor-pointer\': !$last}" ng-style="{\'max-width\': stepWidth + \'%\'}">{{item.title | translate}}</span><md-icon ng-repeat-end="" md-svg-icon="icons:chevron-right" ng-hide="$last"></md-icon><span class="pip-title" ng-if="vm.config.text">{{vm.config.text | translate}}</span></div><md-menu xmd-offset="0 48" class="hide-gt-xs"><span class="pip-mobile-breadcrumb layout-row" ng-click="$mdOpenMenu()" md-ink-ripple="" aria-label="open breadcrumb"><span class="text-overflow"><span ng-if="vm.config.criteria" ng-click="vm.openSearch()">{{vm.config.criteria}} -</span> <span ng-if="vm.config.text">{{vm.config.text | translate}}</span> <span ng-if="vm.config.items && vm.config.items.length > 0">{{vm.config.items[vm.config.items.length - 1].title | translate}}</span></span><md-icon class="pip-triangle-down" md-svg-icon="icons:triangle-down"></md-icon></span><md-menu-content width="3"><md-menu-item ng-repeat="item in vm.config.items" ng-if="vm.config.items && vm.config.items.length > 0"><md-button ng-click="vm.onClick(item)"><span>{{item.title | translate}}</span></md-button></md-menu-item><md-menu-item ng-if="vm.config.text"><md-button><span class="text-grey">{{vm.config.text | translate}}</span></md-button></md-menu-item></md-menu-content></md-menu></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dropdown/Dropdown.html',
    '<md-toolbar class="md-subhead color-primary-bg {{class}}" ng-if="show()" ng-class="{\'md-whiteframe-3dp\': $mdMedia(\'xs\')}"><div class="pip-divider"></div><md-select ng-model="selectedIndex" ng-disabled="disabled()" md-container-class="pip-full-width-dropdown" aria-label="DROPDOWN" md-ink-ripple="" md-on-close="onSelect(selectedIndex)"><md-option ng-repeat="action in actions" value="{{ ::$index }}" ng-selected="activeIndex == $index ? true : false">{{ (action.title || action.name) | translate }}</md-option></md-select></md-toolbar>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('header/NavHeader.html',
    '<md-toolbar md-theme="{{ $theme }}" ng-hide="!title" class="layout-row layout-align-start-center"><md-button class="pip-nav-header-user md-icon-button" ng-click="onUserClick()" aria-label="current user"><img src="" class="pip-nav-header-user-image" ng-class="imageCss"></md-button><div class="pip-nav-header-user-text"><a class="pip-nav-header-user-pri" ng-click="onUserClick()">{{ title }}</a><div class="pip-nav-header-user-sec">{{ subtitle | translate }}</div></div></md-toolbar>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('header/StickyNavHeader.html',
    '<md-toolbar md-theme="{{ $theme }}" ng-hide="!title || !showHeader" class="layout-row layout-align-start-center"><div class="flex-fixed pip-sticky-nav-header-user"><md-button class="" ng-click="onUserClick()" aria-label="current user"><img src="" class="pip-sticky-nav-header-user-image" ng-class="imageCss"></md-button></div><div class="pip-sticky-nav-header-user-text"><div class="pip-sticky-nav-header-user-pri" ng-click="onUserClick()">{{ title }}</div><div class="pip-sticky-nav-header-user-sec">{{ subtitle | translate }}</div></div></md-toolbar>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('icon/NavIcon.html',
    '<md-button class="md-icon-button pip-nav-icon" ng-if="config.type != \'none\'" ng-class="config.class" ng-click="onNavIconClick()" aria-label="menu"><md-icon ng-if="config.type==\'menu\'" md-svg-icon="icons:menu"></md-icon><img ng-src="{{config.imageUrl}}" ng-if="config.type==\'image\'" height="24" width="24"><md-icon ng-if="config.type==\'back\'" md-svg-icon="icons:arrow-left"></md-icon><md-icon ng-if="config.type==\'icon\'" md-svg-icon="icons:{{config.iconName}}"></md-icon></md-button>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('language/LanguagePicker.html',
    '<md-menu md-position-mode="target-right target"><span class="pip-language" ng-click="$mdOpenMenu()" aria-label="language selection">{{vm.language | translate}}<md-icon md-svg-icon="icons:triangle-down"></md-icon></span><md-menu-content width="3"><md-menu-item ng-repeat="language in vm.languages"><md-button ng-click="vm.onLanguageClick(lang)">{{language | translate}}</md-button></md-menu-item></md-menu-content></md-menu>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('menu/NavMenu.html',
    '<md-list><div class="pip-section" ng-repeat="section in config" ng-hide="section.access && !section.access(section)"><md-divider ng-show="$index > 0 && !isSectionEmpty(section.links)"></md-divider><md-subheader ng-show="section.title">{{::section.title | translate}}</md-subheader><md-list-item class="pip-focusable no-border" ng-repeat="link in section.links" ng-click="onLinkClick($event, link)" ng-hide="link.access && !link.access(link)"><md-icon md-svg-icon="{{link.icon}}" ng-hide="!link.icon" class="tm0 bm0"></md-icon><p>{{::link.title | translate}}</p></md-list-item></div></md-list>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('menu/StickyNavMenu.html',
    '<md-list><md-list-item class="pip-focusable no-border pip-sticky-nav-menu-item pip-sticky-nav-expanded-button" ng-click="onExpand()" ng-disabled="!isCollapsed" ng-if="expandedButton"><md-icon md-svg-icon="icons:chevron-left" ng-if="expanded" class="pip-sticky-nav-menu-icon"><md-tooltip md-visible="showTooltip" ng-show="sideNavState.showIconTooltype && !expanded" md-direction="right">{{::\'Expand menu\' | translate}}</md-tooltip></md-icon><md-icon md-svg-icon="icons:chevron-right" ng-if="!expanded" class="pip-sticky-nav-menu-icon"><md-tooltip md-visible="showTooltip" ng-show="sideNavState.showIconTooltype && !expanded" md-direction="right">{{::\'Shrink menu\' | translate}}</md-tooltip></md-icon></md-list-item><md-divider ng-show="expandedButton"></md-divider><div class="pip-section" ng-repeat="section in config" ng-hide="section.access && !section.access(section)"><md-divider ng-show="$index > 0 && !isSectionEmpty(section.links)"></md-divider><md-subheader ng-show="section.title" style="height: 48px;"><span ng-if="expanded" class="pip-sticky-nav-menu-title section-title">{{::section.title | translate}}</span><md-icon md-svg-icon="{{section.icon}}" ng-if="!expanded && section.icon" class="pip-sticky-nav-menu-icon section-icon"><md-tooltip md-visible="showTooltip" ng-show="sideNavState.showIconTooltype && !expanded" md-direction="right">{{::section.title | translate}}</md-tooltip></md-icon><md-icon md-svg-icon="{{defaultIicon}}" ng-if="!expanded && !section.icon" class="pip-sticky-nav-menu-icon section-icon"><md-tooltip md-visible="showTooltip" ng-show="sideNavState.showIconTooltype && !expanded" md-direction="right">{{::section.title | translate}}</md-tooltip></md-icon></md-subheader><md-list-item class="no-border pip-sticky-nav-menu-item" ng-repeat="link in section.links" ng-class="{\'active\': isActive(link)}" ng-hide="link.access && !link.access(link)"><md-button class="layout-row layout-align-start-center pip-focusable" ng-click="onLinkClick($event, link)"><div class="pip-sticky-nav-menu-icon-block"><md-icon md-svg-icon="{{link.icon}}" ng-hide="!link.icon" class="pip-sticky-nav-menu-icon flex-fixed"><md-tooltip md-visible="showTooltip" ng-show="sideNavState.showIconTooltype && !expanded" md-direction="right">{{::link.title | translate}}</md-tooltip></md-icon></div><div class="pip-sticky-nav-menu-title">{{::link.title | translate}}</div><div class="pip-sticky-nav-menu-badge color-badge-bg flex-fixed" ng-if="link.count">{{link.count}}</div></md-button></md-list-item></div></md-list>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('search/SearchBar.html',
    '<div class="md-toolbar-tools layout-row" ng-if="vm.enabled"><md-button class="md-icon-button" aria-label="start search" ng-click="vm.onClick()"><md-icon md-svg-icon="icons:search"></md-icon></md-button><input class="pip-search-text flex" type="search" ng-model="vm.search.text" ng-keydown="vm.onKeyDown($event)"><md-button class="md-icon-button" aria-label="clear search" ng-click="vm.clear()"><md-icon md-svg-icon="icons:cross-circle"></md-icon></md-button></div><div class="md-toolbar-tools layout-row layout-align-end-center" ng-if="!vm.enabled"><md-button class="md-icon-button" aria-label="start search" ng-click="vm.enable()"><md-icon md-svg-icon="icons:search"></md-icon></md-button></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('sidenav/SideNav.html',
    '<md-sidenav class="md-sidenav-left md-whiteframe-z2 pip-sidenav color-content-bg" md-component-id="pip-sidenav" pip-focused="" ng-transclude=""></md-sidenav>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('sidenav/StickySideNav.html',
    '<md-sidenav class="md-sidenav-left" md-is-locked-open="sidenavState.isLockedOpen" md-component-id="pip-sticky-sidenav" pip-focused="" ng-transclude=""></md-sidenav>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/Tabs.html',
    '<md-toolbar class="pip-nav {{ class }}" ng-class="{\'pip-visible\': show(), \'pip-shadow\': showShadow()}"><md-tabs ng-if="$mdMedia(\'gt-xs\')" md-selected="activeTab" ng-class="{\'disabled\': disabled()}" md-stretch-tabs="true" md-dynamic-height="true"><md-tab ng-repeat="tab in tabs track by $index" ng-disabled="tabDisabled($index)" md-on-select="onSelect($index)"><md-tab-label>{{::tab.nameLocal }}<div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">{{::tab.newCounts }}</div><div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div></md-tab-label></md-tab></md-tabs><div class="md-subhead pip-tabs-content color-primary-bg" ng-if="$mdMedia(\'xs\')"><div class="pip-divider position-top m0"></div><md-select ng-model="activeIndex" ng-disabled="disabled()" md-container-class="pip-full-width-dropdown" aria-label="SELECT" md-ink-ripple="" md-on-close="onSelect(activeIndex)"><md-option ng-repeat="tab in tabs track by $index" value="{{ ::$index }}">{{ ::tab.nameLocal }}<div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">{{ ::tab.newCounts }}</div><div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div></md-option></md-select></div></md-toolbar>');
}]);
})();



},{}]},{},[22,37])(37)
});


//# sourceMappingURL=pip-webui-nav.js.map
