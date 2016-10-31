(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).nav = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var NavService_1 = require('./NavService');
angular
    .module('pipNav', [
    'pipDropdown',
    'pipTabs',
    'pipAppBar',
    'pipSearchBar',
    'pipNavIcon',
    'pipBreadcrumb',
    'pipPrimaryActions',
    'pipSecondaryActions',
    'pipSideNav',
    'pipNavMenu',
    'pipNavHeader',
    'pipStickySideNav',
    'pipStickyNavMenu',
    'pipStickyNavHeader'
])
    .service('pipNav', NavService_1.NavService);
},{"./NavService":2}],2:[function(require,module,exports){
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
exports.NavService = NavService;
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
            if (action.event) {
                $rootScope.$broadcast(action.event);
            }
            else {
                $rootScope.$broadcast('pipActionClicked', action.name);
            }
        }
    }]);
})();
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipAppBar.Service', []);
    thisModule.provider('pipAppBar', function () {
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
    });
})();
},{}],9:[function(require,module,exports){
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
exports.BreadcrumbController = BreadcrumbController;
},{"../search/SearchService":29,"./BreadcrumbService":13}],10:[function(require,module,exports){
'use strict';
var BreadcrumbController_1 = require('./BreadcrumbController');
function breadcrumbDirective() {
    return {
        restrict: 'E',
        scope: {},
        replace: false,
        templateUrl: 'breadcrumb/Breadcrumb.html',
        controller: BreadcrumbController_1.BreadcrumbController,
        controllerAs: 'vm'
    };
}
exports.breadcrumbDirective = breadcrumbDirective;
},{"./BreadcrumbController":9}],11:[function(require,module,exports){
'use strict';
var BreadcrumbProvider_1 = require('./BreadcrumbProvider');
var BreadcrumbDirective_1 = require('./BreadcrumbDirective');
angular
    .module('pipBreadcrumb', ['ngMaterial', 'pipNav.Templates', 'pipNav.Translate'])
    .provider('pipBreadcrumb', BreadcrumbProvider_1.BreadcrumbProvider)
    .directive('pipBreadcrumb', BreadcrumbDirective_1.breadcrumbDirective);
},{"./BreadcrumbDirective":10,"./BreadcrumbProvider":12}],12:[function(require,module,exports){
'use strict';
var BreadcrumbService_1 = require('./BreadcrumbService');
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
            this._service = new BreadcrumbService_1.BreadcrumbService(this._config, $rootScope);
        return this._service;
    }];
    return BreadcrumbProvider;
}());
exports.BreadcrumbProvider = BreadcrumbProvider;
},{"./BreadcrumbService":13}],13:[function(require,module,exports){
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
exports.BreadcrumbService = BreadcrumbService;
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipDropdown', ['pipNav.Templates']);
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
            controller: ['$scope', '$element', '$attrs', '$injector', '$rootScope', function ($scope, $element, $attrs, $injector, $rootScope) {
                var pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null, currentTheme = 'blue';
                if (pipTheme) {
                    currentTheme = pipTheme.use();
                }
                else if ($rootScope.$theme) {
                    currentTheme = $rootScope.$theme;
                }
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
            }]
        };
    }]);
})();
},{}],16:[function(require,module,exports){
var pip;
(function (pip) {
    var nav;
    (function (nav) {
        'use strict';
        var LanguagePickerController = (function () {
            LanguagePickerController.$inject = ['$scope', '$element', '$attrs', '$rootScope', '$timeout', '$injector'];
            function LanguagePickerController($scope, $element, $attrs, $rootScope, $timeout, $injector) {
                "ngInject";
                this.languages = ['en', 'ru'];
                this._timeout = $timeout;
                this._translate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
                $element.addClass('pip-language-picker');
                this.languages = $scope.languages;
                $rootScope.$on('pipSetLanguages', this.setLanguages);
            }
            Object.defineProperty(LanguagePickerController.prototype, "language", {
                get: function () {
                    return this._translate ? this._translate.language : null;
                },
                enumerable: true,
                configurable: true
            });
            LanguagePickerController.prototype.setLanguages = function (lang) {
                this.languages = lang.length > 0 ? lang : ['en', 'ru'];
            };
            LanguagePickerController.prototype.onLanguageClick = function (language) {
                var _this = this;
                if (this._translate != null) {
                    this._timeout(function () {
                        _this._translate.language = _this.language;
                    }, 0);
                }
            };
            return LanguagePickerController;
        }());
        function languagePickerDirective() {
            return {
                restrict: 'E',
                scope: {
                    languages: '=languages',
                },
                replace: false,
                templateUrl: function (element, attr) {
                    return 'language_picker/language_picker.html';
                },
                controller: LanguagePickerController,
                controllerAs: 'vm'
            };
        }
        angular
            .module('pipLanguagePicker', [
            'ngMaterial', 'pipNav.Translate', 'pipNav.Templates'
        ])
            .directive('pipLanguagePicker', languagePickerDirective);
    })(nav = pip.nav || (pip.nav = {}));
})(pip || (pip = {}));
},{}],17:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipNavHeader', ['ngMaterial', 'pipNav.Templates', 'pipNavHeader.Service']);
    thisModule.directive('pipNavHeader', function () {
        return {
            restrict: 'EA',
            scope: {
                title: '=pipTitle',
                subtitle: '=pipSubTitle',
                imageUrl: '=pipImage',
                imageCss: '=pipImageCss'
            },
            replace: false,
            templateUrl: 'nav_header/nav_header.html',
            controller: 'pipNavHeaderController'
        };
    });
    thisModule.controller('pipNavHeaderController', ['$scope', '$element', '$rootScope', '$timeout', 'pipNavHeader', function ($scope, $element, $rootScope, $timeout, pipNavHeader) {
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
    }]);
})();
},{}],18:[function(require,module,exports){
(function () {
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
},{}],19:[function(require,module,exports){
(function () {
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
})();
},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipNavHeader.Service', []);
    thisModule.provider('pipNavHeader', function () {
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
    });
})();
},{}],22:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipNavMenu.Service', []);
    thisModule.provider('pipNavMenu', function () {
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
    });
})();
},{}],23:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipSideNav.Service', []);
    thisModule.provider('pipSideNav', function () {
        var config = {
            theme: 'default',
            parts: []
        }, sideNavId = 'pip-sidenav', sideNavState = {};
        this.id = id;
        this.theme = theme;
        this.parts = initParts;
        this.state = setState;
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
                $rootScope.$broadcast('pipSideNavStateChange', value);
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
    });
})();
},{}],25:[function(require,module,exports){
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
exports.SearchBarController = SearchBarController;
},{"./SearchService":29}],26:[function(require,module,exports){
'use strict';
var SearchBarController_1 = require('./SearchBarController');
function searchBarDirective() {
    return {
        restrict: 'E',
        scope: {},
        replace: false,
        templateUrl: 'search/SearchBar.html',
        controller: SearchBarController_1.SearchBarController,
        controllerAs: 'vm'
    };
}
exports.searchBarDirective = searchBarDirective;
},{"./SearchBarController":25}],27:[function(require,module,exports){
'use strict';
var SearchBarDirective_1 = require('./SearchBarDirective');
var SearchProvider_1 = require('./SearchProvider');
angular
    .module('pipSearchBar', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates'])
    .provider('pipSearch', SearchProvider_1.SearchProvider)
    .directive('pipSearchBar', SearchBarDirective_1.searchBarDirective);
},{"./SearchBarDirective":26,"./SearchProvider":28}],28:[function(require,module,exports){
'use strict';
var SearchService_1 = require('./SearchService');
var SearchService_2 = require('./SearchService');
var SearchProvider = (function () {
    function SearchProvider() {
        this._config = new SearchService_1.SearchConfig();
        this._service = null;
    }
    SearchProvider.prototype.$get = ['$rootScope', function ($rootScope) {
        "ngInject";
        if (this._service == null)
            this._service = new SearchService_2.SearchService(this._config, $rootScope);
        return this._service;
    }];
    return SearchProvider;
}());
exports.SearchProvider = SearchProvider;
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
exports.SearchService = SearchService;
},{}],30:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipSideNav', ['ngMaterial', 'pipNav.Templates', 'pipSideNav.Part', 'pipSideNav.Service']);
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
        pipSideNav.id('pip-sidenav');
        $rootScope.$on('pipNavIconClicked', onNavIconClick);
        return;
        function onNavIconClick(event) {
            pipSideNav.open();
        }
    }]);
})();
},{}],31:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipStickyNavHeader', ['ngMaterial', 'pipNav.Templates', 'pipNavHeader.Service']);
    thisModule.directive('pipStickyNavHeader', function () {
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
    thisModule.controller('pipStickyNavHeaderController', ['$scope', '$element', '$rootScope', '$timeout', 'pipNavHeader', function ($scope, $element, $rootScope, $timeout, pipNavHeader) {
        var image = null, imageBlock = $element.find('.pip-sticky-nav-header-user'), $image;
        $element.addClass('pip-sticky-nav-header');
        $rootScope.$on('pipIdentityChanged', onIdentityChanged);
        $rootScope.$on('pipNavHeaderImageChanged', onIdentityChanged);
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
    }]);
})();
},{}],32:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipStickyNavMenu', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates', 'pipNavMenu.Service']);
    thisModule.directive('pipStickyNavMenu', function () {
        return {
            restrict: 'EA',
            scope: {
                config: '=pipLinks',
                collapsed: '=pipCollapsed'
            },
            replace: false,
            templateUrl: 'sticky_nav_menu/sticky_nav_menu.html',
            controller: 'pipStickyNavMenuController'
        };
    });
    thisModule.controller('pipStickyNavMenuController', ['$scope', '$element', '$rootScope', '$window', '$location', '$timeout', '$injector', 'pipSideNav', 'pipNavMenu', function ($scope, $element, $rootScope, $window, $location, $timeout, $injector, pipSideNav, pipNavMenu) {
        var pipSdeNavElement = $element.parent().parent();
        $element.addClass('pip-sticky-nav-menu');
        $scope.config = $scope.config || pipNavMenu.get();
        pipNavMenu.set($scope.config);
        $scope.defaultIicon = 'icons:folder';
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
    }]);
})();
},{}],33:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipStickySideNav', ['ngMaterial', 'pipNav.Templates', 'pipSideNav.Part', 'pipSideNav.Service']);
    thisModule.directive('pipStickySidenav', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            templateUrl: 'sticky_sidenav/sticky_sidenav.html',
            controller: 'pipStickySideNavController'
        };
    });
    thisModule.controller('pipStickySideNavController', ['$scope', '$element', '$rootScope', '$injector', '$mdMedia', 'pipSideNav', function ($scope, $element, $rootScope, $injector, $mdMedia, pipSideNav) {
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null, mainContainer = '.pip-main', bigWidth = 322, smallWidth = 74;
        $scope.media = pipMedia ? pipMedia : $mdMedia;
        $scope.navState = {
            toggle: {
                id: 'toggle',
                addClass: 'sidenav-mobile',
                showHeader: true,
                isLockedOpen: false,
                expandedButton: false,
                isExpanded: false,
                expand: true,
                showIconTooltype: false
            },
            small: {
                id: 'small',
                addClass: 'pip-sticky-nav-small sidenav-tablet',
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
                addClass: 'sidenav-xdesktop',
                showHeader: false,
                isLockedOpen: true,
                expandedButton: true,
                isExpanded: false,
                expand: true,
                showIconTooltype: true
            }
        };
        $element.addClass('pip-sticky-sidenav');
        pipSideNav.id('pip-sticky-sidenav');
        setSideNaveState();
        $rootScope.$on('pipNavIconClicked', onNavIconClick);
        $rootScope.$on('pipSideNavState', onSideNavState);
        $rootScope.$on('pipWindowResized', onWindowResized);
        return;
        function onNavIconClick(event) {
            pipSideNav.open();
        }
        function onWindowResized() {
            if (!$mdMedia($scope.windowSize)) {
                setSideNaveState();
            }
        }
        function onSideNavState(event, state) {
            if (angular.isString(state) && $scope.navState[state] !== undefined) {
                setState(state);
            }
        }
        function setSideNaveState() {
            if ($scope.media('xs')) {
                setState('toggle');
                $scope.windowSize = 'xs';
                return;
            }
            if ($scope.media('sm')) {
                setState('toggle');
                $scope.windowSize = 'sm';
                return;
            }
            if ($scope.media('md')) {
                if (isChange('small')) {
                    setState('small');
                    $scope.windowSize = 'md';
                }
                return;
            }
            if ($scope.media('lg')) {
                if (isChange('small')) {
                    setState('large');
                    $scope.windowSize = 'lg';
                }
                return;
            }
            if ($scope.media('xl')) {
                setState('xlarge');
                $scope.windowSize = 'xl';
                return;
            }
        }
        function isChange(state) {
            if (!$scope.sidenavState || !$scope.sidenavState.id)
                return true;
            var mainWidth = $(mainContainer).innerWidth(), elementWidth = $('pip-sticky-sidenav').innerWidth(), prevState = $scope.sidenavState.id, boundaries;
            console.log('width', elementWidth, mainWidth);
            if (pipMedia) {
                if (state == 'large' && prevState == 'small') {
                    boundaries = pipMedia().getBoundaries('lg');
                    if (boundaries && boundaries[0] && mainWidth) {
                        return (mainWidth - bigWidth + elementWidth) > boundaries[0];
                    }
                    return true;
                }
                else if (state == 'small' && prevState == 'large') {
                    boundaries = pipMedia().getBoundaries('lg');
                    if (boundaries && boundaries[0] && mainWidth) {
                        return (mainWidth - smallWidth + elementWidth < boundaries[0]);
                    }
                    return true;
                }
                return true;
            }
            else {
                return true;
            }
        }
        function setState(state) {
            $element.removeClass('sidenav-mobile sidenav-desktop sidenav-tablet sidenav-xdesktop pip-sticky-nav-small');
            $scope.sidenavState = $scope.navState[state];
            $element.addClass($scope.sidenavState.addClass);
            pipSideNav.state($scope.sidenavState);
        }
    }]);
})();
},{}],34:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module("pipTabs", ['pipNav.Templates']);
    thisModule.directive('pipTabs', function () {
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
            controller: ['$scope', '$element', '$attrs', '$mdMedia', '$injector', '$rootScope', function ($scope, $element, $attrs, $mdMedia, $injector, $rootScope) {
                var pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null, currentTheme = 'blue';
                if (pipTheme) {
                    currentTheme = pipTheme.use();
                }
                else if ($rootScope.$theme) {
                    currentTheme = $rootScope.$theme;
                }
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
            }]
        };
    });
})();
},{}],35:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('actions/primary_actions.html',
    '<md-menu md-position-mode="target-right target" class="pip-primary-actions" ng-repeat="action in config.primaryLocalActions">\n' +
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
    '<md-toolbar md-theme-watch="true" ng-if="!$partialReset && config.showAppBar" ng-class="config.ngClasses"\n' +
    '            class="{{ config.cssClass }}" ng-transclude>\n' +
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
    '        <span ng-if="vm.config.criteria"\n' +
    '            ng-click="vm.openSearch()">{{vm.config.criteria}} -</span>\n' +
    '        <!-- Breadcrumb navigation -->\n' +
    '        <span class="pip-breadcrumb-item"\n' +
    '            ng-if="vm.config.items && vm.config.items.length > 0"\n' +
    '            ng-repeat-start="item in vm.config.items"\n' +
    '            ng-click="vm.onClick(item)"\n' +
    '            ng-init="stepWidth = 100/(vm.config.items.length + 1)"\n' +
    '            ng-class="{\'cursor-pointer\': !$last}"\n' +
    '            ng-style="{\'max-width\': stepWidth + \'%\'}">\n' +
    '            {{item.title | translate}}\n' +
    '        </span>\n' +
    '        <md-icon ng-repeat-end md-svg-icon="icons:chevron-right" ng-hide="$last"></md-icon>\n' +
    '        <!-- Text title -->\n' +
    '        <span class="pip-title" ng-if="vm.config.text">{{vm.config.text | translate}}</span>\n' +
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
    '                <span ng-if="vm.config.criteria"\n' +
    '                    ng-click="vm.openSearch()">{{vm.config.criteria}} -</span>\n' +
    '                <span ng-if="vm.config.text">    \n' +
    '                    {{vm.config.text | translate}}\n' +
    '                </span>   \n' +
    '                <span ng-if="vm.config.items && vm.config.items.length > 0">    \n' +
    '                    {{vm.config.items[vm.config.items.length - 1].title | translate}}\n' +
    '                </span>                   \n' +
    '            </span>\n' +
    '            <md-icon class="pip-triangle-down" md-svg-icon="icons:triangle-down"></md-icon>\n' +
    '        </span>\n' +
    '        <md-menu-content width="3">\n' +
    '            <md-menu-item  ng-repeat="item in vm.config.items" ng-if="vm.config.items && vm.config.items.length > 0">\n' +
    '                <md-button ng-click="vm.onClick(item)"><span>{{item.title | translate}}</span></md-button>\n' +
    '            </md-menu-item>\n' +
    '            <md-menu-item  ng-if="vm.config.text">\n' +
    '                <md-button><span class="text-grey">{{vm.config.text | translate}}</span></md-button>\n' +
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
    '        {{vm.language | translate}}\n' +
    '        <md-icon md-svg-icon="icons:triangle-down"></md-icon>\n' +
    '    </span>\n' +
    '    <md-menu-content width="3">\n' +
    '        <md-menu-item ng-repeat="language in vm.languages">\n' +
    '            <md-button ng-click="vm.onLanguageClick(lang)">{{language | translate}}</md-button>\n' +
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
    '<md-toolbar md-theme="{{ $theme }}" ng-hide="!title" class="layout-row layout-align-start-center">\n' +
    '\n' +
    '    <md-button class="pip-nav-header-user md-icon-button"\n' +
    '                ng-click="onUserClick()"\n' +
    '                aria-label="current user">\n' +
    '\n' +
    '        <img  src="" class="pip-nav-header-user-image" ng-class="imageCss"></img>\n' +
    '    </md-button>\n' +
    '    \n' +
    '    <div class="pip-nav-header-user-text">\n' +
    '        <a class="pip-nav-header-user-pri"\n' +
    '            ng-click="onUserClick()">\n' +
    '            {{ title }}\n' +
    '        </a>\n' +
    '        <div class="pip-nav-header-user-sec">\n' +
    '            {{ subtitle | translate }}\n' +
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
  $templateCache.put('search/SearchBar.html',
    '<div class="md-toolbar-tools layout-row" ng-if="vm.enabled">\n' +
    '    <md-button class="md-icon-button" \n' +
    '        aria-label="start search" \n' +
    '        ng-click="vm.onClick()">\n' +
    '        <md-icon md-svg-icon="icons:search"></md-icon>\n' +
    '    </md-button>\n' +
    '    <input class="pip-search-text flex"\n' +
    '        type="search"\n' +
    '        ng-model="vm.search.text" \n' +
    '        ng-keydown="vm.onKeyDown($event)" />\n' +
    '    <md-button class="md-icon-button" \n' +
    '        aria-label="clear search" \n' +
    '        ng-click="vm.clear()">\n' +
    '        <md-icon md-svg-icon="icons:cross-circle"></md-icon>\n' +
    '    </md-button>\n' +
    '</div>\n' +
    '<div class="md-toolbar-tools layout-row layout-align-end-center"  ng-if="!vm.enabled">\n' +
    '    <md-button class="md-icon-button"\n' +
    '               aria-label="start search"\n' +
    '               ng-click="vm.enable()">\n' +
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
  $templateCache.put('sticky_nav_menu/sticky_nav_menu.html',
    '<md-list>\n' +
    '    <md-list-item class="pip-focusable no-border pip-sticky-nav-menu-item pip-sticky-nav-expanded-button" \n' +
    '        ng-click="onExpand()"\n' +
    '        ng-disabled="!isCollapsed"\n' +
    '        ng-if="expandedButton">\n' +
    '        <md-icon md-svg-icon="icons:chevron-left" ng-if="expanded" class="pip-sticky-nav-menu-icon">\n' +
    '            <md-tooltip ng-show="sideNavState.showIconTooltype && !expanded">\n' +
    '                {{::\'Expand menu\' | translate}}\n' +
    '            </md-tooltip>\n' +
    '        </md-icon>\n' +
    '        <md-icon md-svg-icon="icons:chevron-right" ng-if="!expanded" class="pip-sticky-nav-menu-icon">\n' +
    '            {{::\'Shrink menu\' | translate}} \n' +
    '        </md-icon>\n' +
    '    </md-list-item>\n' +
    '    <div class="pip-section" ng-repeat="section in config"\n' +
    '         ng-hide="section.access && !section.access(section)">\n' +
    '\n' +
    '        <md-divider ng-show="$index > 0 && !isSectionEmpty(section.links)"></md-divider>\n' +
    '        <md-subheader ng-show="section.title" style="height: 48px;">\n' +
    '            <span ng-if="expanded" class="pip-sticky-nav-menu-title section-title">\n' +
    '                {{::section.title | translate}}\n' +
    '            </span>\n' +
    '            <md-icon md-svg-icon="{{section.icon}}" ng-if="!expanded && section.icon" class="pip-sticky-nav-menu-icon section-icon">\n' +
    '                <md-tooltip ng-show="sideNavState.showIconTooltype && !expanded">{{::section.title | translate}}</md-tooltip>\n' +
    '            </md-icon>\n' +
    '            <md-icon md-svg-icon="{{defaultIicon}}" ng-if="!expanded && !section.icon" class="pip-sticky-nav-menu-icon section-icon">\n' +
    '                <md-tooltip ng-show="sideNavState.showIconTooltype && !expanded">{{::section.title | translate}}</md-tooltip>\n' +
    '            </md-icon>\n' +
    '        </md-subheader>\n' +
    '\n' +
    '        <md-list-item class="no-border pip-sticky-nav-menu-item" \n' +
    '                      ng-repeat="link in section.links"\n' +
    '                      ng-class="{\'active\': isActive(link)}"\n' +
    '                      ng-hide="link.access && !link.access(link)">\n' +
    '            <md-button class="layout-row layout-align-start-center pip-focusable" \n' +
    '                       ng-click="onLinkClick($event, link)">\n' +
    '                <div class="pip-sticky-nav-menu-icon-block">\n' +
    '                    <md-icon md-svg-icon="{{link.icon}}"\n' +
    '                             ng-hide="!link.icon"\n' +
    '                             class="pip-sticky-nav-menu-icon flex-fixed">\n' +
    '                        <md-tooltip ng-show="sideNavState.showIconTooltype && !expanded">{{::link.title | translate}}</md-tooltip>\n' +
    '                    </md-icon>\n' +
    '                </div>\n' +
    '                <div class="pip-sticky-nav-menu-title">{{::link.title | translate}}</div>\n' +
    '\n' +
    '                <!--<div class="flex pip-sticky-nav-menu-expander"></div>-->\n' +
    '                <div class="pip-sticky-nav-menu-badge color-badge-bg flex-fixed" ng-if="link.count">\n' +
    '                    {{link.count}}\n' +
    '                </div>\n' +
    '            </md-button>\n' +
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
  $templateCache.put('sticky_nav_header/sticky_nav_header.html',
    '<md-toolbar md-theme="{{ $theme }}" ng-hide="!title" class="layout-row layout-align-start-center">\n' +
    '\n' +
    '    <md-button class="pip-sticky-nav-header-user md-icon-button flex-fixed"\n' +
    '               ng-click="onUserClick()"\n' +
    '               aria-label="current user">\n' +
    '\n' +
    '        <img  src="" class="pip-sticky-nav-header-user-image" ng-class="imageCss"></img>\n' +
    '    </md-button>\n' +
    '\n' +
    '    <div class="pip-sticky-nav-header-user-text">\n' +
    '        <div class="pip-sticky-nav-header-user-pri"\n' +
    '             ng-click="onUserClick()">\n' +
    '            {{ title }}\n' +
    '        </div>\n' +
    '        <div class="pip-sticky-nav-header-user-sec">\n' +
    '            {{ subtitle | translate }}\n' +
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
  $templateCache.put('sticky_sidenav/sticky_sidenav.html',
    '<!--\n' +
    '@file Sticky Side Nav component\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-sidenav class="md-sidenav-left" md-is-locked-open="sidenavState.isLockedOpen"\n' +
    '            md-component-id="pip-sticky-sidenav" ng-if="!$partialReset" pip-focused ng-transclude>\n' +
    '</md-sidenav>\n' +
    '\n' +
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
    '    <md-tabs ng-if="$mdMedia(\'gt-xs\')" md-selected="activeTab" ng-class="{\'disabled\': disabled()}"\n' +
    '             md-stretch-tabs="true" md-dynamic-height="true">\n' +
    '        <md-tab ng-repeat="tab in tabs track by $index" ng-disabled="tabDisabled($index)"\n' +
    '                md-on-select="onSelect($index)">\n' +
    '            <md-tab-label>\n' +
    '                {{::tab.nameLocal }}\n' +
    '                <div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">\n' +
    '                    {{::tab.newCounts }}\n' +
    '                </div>\n' +
    '                <div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div>\n' +
    '            </md-tab-label>\n' +
    '        </md-tab>\n' +
    '    </md-tabs>\n' +
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
    '</md-toolbar>\n' +
    '');
}]);
})();



},{}]},{},[3,4,5,7,8,6,9,10,11,12,13,14,15,16,17,19,18,20,21,22,23,24,1,2,25,26,27,28,29,30,31,32,33,34,35])(35)
});


//# sourceMappingURL=pip-webui-nav.js.map
