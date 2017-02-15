(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).nav = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
exports.ActionsChangedEvent = 'pipActionsChanged';
exports.SecondaryActionsOpenEvent = 'pipSecondaryActionsOpen';
var SimpleActionItem = (function () {
    function SimpleActionItem() {
    }
    return SimpleActionItem;
}());
exports.SimpleActionItem = SimpleActionItem;
var ActionItem = (function (_super) {
    __extends(ActionItem, _super);
    function ActionItem() {
        return _super.apply(this, arguments) || this;
    }
    return ActionItem;
}(SimpleActionItem));
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
var ActionsService = (function () {
    function ActionsService(config, $rootScope) {
        this._config = config;
        this._rootScope = $rootScope;
    }
    Object.defineProperty(ActionsService.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionsService.prototype, "primaryGlobalActions", {
        get: function () {
            return this._config.primaryGlobalActions;
        },
        set: function (value) {
            this._config.primaryGlobalActions = value || [];
            this.sendChangeEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionsService.prototype, "secondaryGlobalActions", {
        get: function () {
            return this._config.secondaryGlobalActions;
        },
        set: function (value) {
            this._config.secondaryGlobalActions = value || [];
            this.sendChangeEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionsService.prototype, "primaryLocalActions", {
        get: function () {
            return this._config.primaryLocalActions;
        },
        set: function (value) {
            this._config.primaryLocalActions = value || [];
            this.sendChangeEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionsService.prototype, "secondaryLocalActions", {
        get: function () {
            return this._config.secondaryLocalActions;
        },
        set: function (value) {
            this._config.secondaryLocalActions = value || [];
            this.sendChangeEvent();
        },
        enumerable: true,
        configurable: true
    });
    ActionsService.prototype.show = function (primaryActions, secondaryActions) {
        this._config.primaryLocalActions = primaryActions || [];
        this._config.secondaryLocalActions = secondaryActions || [];
        this.sendChangeEvent();
    };
    ActionsService.prototype.hide = function () {
        this._config.primaryLocalActions = [];
        this._config.secondaryLocalActions = [];
        this.sendChangeEvent();
    };
    ActionsService.prototype.updateCount = function (action, count) {
        if (action == null || !_.isNumber(count))
            return;
        _.each(this._config.primaryGlobalActions, function (a) {
            if (a.name == action)
                a.count = count;
        });
        _.each(this._config.primaryLocalActions, function (a) {
            if (a.name == action)
                a.count = count;
        });
        this.sendChangeEvent();
    };
    ActionsService.prototype.clearCounts = function () {
        _.each(this._config.primaryGlobalActions, function (a) {
            a.count = null;
        });
        _.each(this._config.primaryLocalActions, function (a) {
            a.count = null;
        });
        this.sendChangeEvent();
    };
    ActionsService.prototype.sendChangeEvent = function () {
        this._rootScope.$emit(exports.ActionsChangedEvent, this._config);
    };
    ActionsService.prototype.openMenuEvent = function () {
        this._rootScope.$emit(exports.SecondaryActionsOpenEvent);
    };
    return ActionsService;
}());
var ActionsProvider = (function () {
    function ActionsProvider() {
        this._config = new ActionsConfig();
    }
    Object.defineProperty(ActionsProvider.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value || new ActionsConfig();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionsProvider.prototype, "primaryGlobalActions", {
        get: function () {
            return this._config.primaryGlobalActions;
        },
        set: function (value) {
            this._config.primaryGlobalActions = value || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionsProvider.prototype, "secondaryGlobalActions", {
        get: function () {
            return this._config.secondaryGlobalActions;
        },
        set: function (value) {
            this._config.secondaryGlobalActions = value || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionsProvider.prototype, "primaryLocalActions", {
        get: function () {
            return this._config.primaryLocalActions;
        },
        set: function (value) {
            this._config.primaryLocalActions = value || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionsProvider.prototype, "secondaryLocalActions", {
        get: function () {
            return this._config.secondaryLocalActions;
        },
        set: function (value) {
            this._config.secondaryLocalActions = value || [];
        },
        enumerable: true,
        configurable: true
    });
    ActionsProvider.prototype.$get = ['$rootScope', function ($rootScope) {
        "ngInject";
        if (this._service == null)
            this._service = new ActionsService(this._config, $rootScope);
        return this._service;
    }];
    return ActionsProvider;
}());
angular
    .module('pipActions')
    .provider('pipActions', ActionsProvider);
},{}],2:[function(require,module,exports){
'use strict';
(function () {
    PrimaryActionsController.$inject = ['$scope', '$element', '$attrs', '$rootScope', '$window', '$location', '$injector', 'pipActions'];
    function PrimaryActionsController($scope, $element, $attrs, $rootScope, $window, $location, $injector, pipActions) {
        $element.addClass('pip-primary-actions');
        if ($scope.localActions)
            pipActions.primaryLocalActions = $scope.localActions;
        if ($scope.globalActions)
            pipActions.primaryGlobalActions = $scope.globalActions;
        $scope.config = pipActions.config;
        $rootScope.$on('pipActionsChanged', onActionsChanged);
        $scope.isHidden = isHidden;
        $scope.actionCount = actionCount;
        $scope.clickAction = clickAction;
        return;
        function onActionsChanged(event, config) {
            $scope.config = config;
        }
        function isHidden(action) {
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
                if (!isHidden(action)) {
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
        function clickAction(action, $mdOpenMenu) {
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
            if (action.click) {
                action.click();
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
            templateUrl: 'actions/PrimaryActions.html',
            controller: PrimaryActionsController
        };
    }
    angular
        .module('pipActions')
        .directive('pipPrimaryActions', primaryActionsDirective);
})();
},{}],3:[function(require,module,exports){
'use strict';
(function () {
    SecondaryActionsController.$inject = ['$scope', '$element', '$attrs', '$rootScope', '$window', '$location', '$injector', 'pipActions', '$timeout'];
    function SecondaryActionsController($scope, $element, $attrs, $rootScope, $window, $location, $injector, pipActions, $timeout) {
        $element.addClass('pip-secondary-actions');
        if ($scope.localActions)
            pipActions.secondaryLocalActions = $scope.localActions;
        if ($scope.globalActions)
            pipActions.secondaryGlobalActions = $scope.globalActions;
        $scope.config = pipActions.config;
        $rootScope.$on('pipActionsChanged', onActionsChanged);
        $rootScope.$on('pipSecondaryActionsOpen', onActionsMenuOpen);
        $scope.isHidden = isHidden;
        $scope.actionCount = actionCount;
        $scope.secondaryActionsVisible = secondaryActionsVisible;
        $scope.secondaryDividerVisible = secondaryDividerVisible;
        $scope.clickAction = clickAction;
        $scope.getMenu = function (menuFn) {
            $scope.menuFn = menuFn;
        };
        $scope.openMenu = openMenu;
        return;
        function onActionsMenuOpen() {
            $scope.menuFn();
        }
        function openMenu($mdOpenMenu, ev) {
            $scope.originatorEv = ev;
            $mdOpenMenu(ev);
        }
        function onActionsChanged(event, config) {
            $scope.config = config;
        }
        function isHidden(action) {
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
                if (!isHidden(action)) {
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
        function clickAction(action, $mdOpenMenu) {
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
            if (action.click) {
                action.click();
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
                localActions: '=pipLocalActions',
                globalActions: '=pipGlobalActions'
            },
            replace: false,
            templateUrl: 'actions/SecondaryActions.html',
            controller: SecondaryActionsController
        };
    }
    angular
        .module('pipActions')
        .directive('pipSecondaryActions', secondaryActionsDirective);
})();
},{}],4:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipActions', ['ngMaterial', 'pipNav.Templates', 'ui.router']);
require("./ActionsService");
require("./PrimaryActionsDirective");
require("./SecondaryActionsDirective");
__export(require("./ActionsService"));
},{"./ActionsService":1,"./PrimaryActionsDirective":2,"./SecondaryActionsDirective":3}],5:[function(require,module,exports){
'use strict';
(function () {
    AppBarDirectiveController.$inject = ['$scope', '$element', '$rootScope', 'pipAppBar'];
    function AppBarDirectiveController($scope, $element, $rootScope, pipAppBar) {
        "ngInject";
        $element.addClass('pip-appbar');
        $element.addClass('color-primary-bg');
        $scope.config = pipAppBar.config;
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
})();
},{}],6:[function(require,module,exports){
'use strict';
(function () {
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
        onAppBarChanged(null, pipAppBar.config);
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
})();
},{}],7:[function(require,module,exports){
'use strict';
exports.AppBarChangedEvent = 'pipAppBarChanged';
var AppBarConfig = (function () {
    function AppBarConfig() {
    }
    return AppBarConfig;
}());
exports.AppBarConfig = AppBarConfig;
var AppBarService = (function () {
    function AppBarService(config, $rootScope) {
        this._config = config;
        this._rootScope = $rootScope;
    }
    Object.defineProperty(AppBarService.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBarService.prototype, "classes", {
        get: function () {
            return this._config.classes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBarService.prototype, "parts", {
        get: function () {
            return this._config.parts;
        },
        set: function (value) {
            this._config.parts = value || {};
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    AppBarService.prototype.show = function (parts, classes, shadowBreakpoints) {
        this._config.visible = true;
        this._config.parts = parts || this._config.parts || {};
        this._config.classes = classes || this._config.classes || [];
        if (shadowBreakpoints)
            this.setShadow(shadowBreakpoints);
        this.sendConfigEvent();
    };
    AppBarService.prototype.hide = function () {
        this._config.visible = false;
        this.sendConfigEvent();
    };
    AppBarService.prototype.hideShadow = function () {
        this._config.classes = _.reject(this._config.classes, function (c) { return c.startsWith('pip-shadow'); });
    };
    AppBarService.prototype.setShadow = function (breakpoints) {
        var _this = this;
        this.hideShadow();
        if (breakpoints != null && breakpoints.length > 0) {
            _.each(breakpoints, function (bp) {
                _this._config.classes.push('pip-shadow-' + bp);
            });
        }
        else {
            this._config.classes.push('pip-shadow');
        }
    };
    AppBarService.prototype.addShadow = function () {
        var breakpoints = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            breakpoints[_i] = arguments[_i];
        }
        this.setShadow(breakpoints);
        this.sendConfigEvent();
    };
    AppBarService.prototype.removeShadow = function () {
        this.hideShadow();
        this.sendConfigEvent();
    };
    AppBarService.prototype.addClass = function () {
        var _this = this;
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        _.each(classes, function (c) {
            _this._config.classes.push(c);
        });
        this.sendConfigEvent();
    };
    AppBarService.prototype.removeClass = function () {
        var _this = this;
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        _.each(classes, function (c) {
            _this._config.classes = _.reject(_this._config.classes, function (cc) { return cc == c; });
        });
        this.sendConfigEvent();
    };
    AppBarService.prototype.part = function (part, value) {
        this._config.parts[part] = value;
        this.sendConfigEvent();
    };
    AppBarService.prototype.sendConfigEvent = function () {
        this._rootScope.$broadcast(exports.AppBarChangedEvent, this._config);
    };
    return AppBarService;
}());
var AppBarProvider = (function () {
    function AppBarProvider() {
        this._config = {
            visible: true,
            parts: {},
            classes: []
        };
    }
    Object.defineProperty(AppBarProvider.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value || new AppBarConfig();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBarProvider.prototype, "parts", {
        get: function () {
            return this._config.parts;
        },
        set: function (value) {
            this._config.parts = value || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBarProvider.prototype, "classes", {
        get: function () {
            return this._config.classes;
        },
        set: function (value) {
            this._config.classes = value || [];
        },
        enumerable: true,
        configurable: true
    });
    AppBarProvider.prototype.addClass = function () {
        var _this = this;
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        _.each(classes, function (c) {
            _this._config.classes.push(c);
        });
    };
    AppBarProvider.prototype.removeClass = function () {
        var _this = this;
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        _.each(classes, function (c) {
            _this._config.classes = _.reject(_this._config.classes, function (cc) { return cc == c; });
        });
    };
    AppBarProvider.prototype.part = function (part, value) {
        this._config.parts[part] = value;
    };
    AppBarProvider.prototype.$get = ['$rootScope', function ($rootScope) {
        "ngInject";
        if (this._service == null)
            this._service = new AppBarService(this._config, $rootScope);
        return this._service;
    }];
    return AppBarProvider;
}());
angular
    .module('pipAppBar')
    .provider('pipAppBar', AppBarProvider);
},{}],8:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular
    .module('pipAppBar', ['ngMaterial', 'pipNav.Templates']);
require("./AppBarService");
require("./AppBarDirective");
require("./AppBarPartDirective");
__export(require("./AppBarService"));
},{"./AppBarDirective":5,"./AppBarPartDirective":6,"./AppBarService":7}],9:[function(require,module,exports){
'use strict';
var BreadcrumbService_1 = require("./BreadcrumbService");
var BreadcrumbService_2 = require("./BreadcrumbService");
var SearchService_1 = require("../search/SearchService");
(function () {
    var BreadcrumbController = (function () {
        BreadcrumbController.$inject = ['$element', '$rootScope', '$window', '$state', '$location', '$injector', 'pipBreadcrumb', '$mdMedia'];
        function BreadcrumbController($element, $rootScope, $window, $state, $location, $injector, pipBreadcrumb, $mdMedia) {
            "ngInject";
            var _this = this;
            this._rootScope = $rootScope;
            this._window = $window;
            this._location = $location;
            this._injector = $injector;
            $element.addClass('pip-breadcrumb');
            this.config = pipBreadcrumb.config;
            $rootScope.$on(BreadcrumbService_1.BreadcrumbChangedEvent, function (event, config) { _this.onBreadcrumbChanged(event, config); });
            $rootScope.$on(BreadcrumbService_2.BreadcrumbBackEvent, function () { _this.onBreadcrumbBack(); });
            var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
            this._media = pipMedia !== undefined ? pipMedia : $mdMedia;
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
        BreadcrumbController.prototype.actionsVisible = function (item) {
            return angular.isArray(item.subActions) && item.subActions.length > 1;
        };
        BreadcrumbController.prototype.onOpenMenu = function ($mdOpenMenu, event) {
            this.originatorEv = event;
            $mdOpenMenu(this.originatorEv);
        };
        BreadcrumbController.prototype.onSubActionClick = function (action) {
            if (!action || action.divider) {
                return;
            }
            if (action.click) {
                action.click(action);
                return;
            }
            if (action.href) {
                this._window.location.href = action.href;
                return;
            }
            if (action.url) {
                this._location.url(action.url);
                return;
            }
            if (action.state) {
                if (this._injector.has('$state')) {
                    var $state = this._injector.get('$state');
                    $state.go(action.state, action.stateParams);
                }
                return;
            }
            if (action.event) {
                this._rootScope.$broadcast(action.event);
                this.originatorEv = null;
            }
            else {
                this._rootScope.$broadcast('pipActionClicked', action.name);
                this.originatorEv = null;
            }
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
})();
},{"../search/SearchService":27,"./BreadcrumbService":10}],10:[function(require,module,exports){
'use strict';
exports.BreadcrumbChangedEvent = "pipBreadcrumbChanged";
exports.BreadcrumbBackEvent = "pipBreadcrumbBack";
var BreadcrumbItem = (function () {
    function BreadcrumbItem() {
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
            this.sendConfigEvent();
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
            this.sendConfigEvent();
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
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    BreadcrumbService.prototype.showText = function (text, criteria) {
        this._config.text = text;
        this._config.items = null;
        this._config.criteria = criteria;
        this.sendConfigEvent();
    };
    BreadcrumbService.prototype.showItems = function (items, criteria) {
        this._config.items = items || [];
        this._config.text = null;
        this._config.criteria = criteria;
        this.sendConfigEvent();
    };
    BreadcrumbService.prototype.sendConfigEvent = function () {
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
require("./BreadcrumbDirective");
require("./BreadcrumbService");
__export(require("./BreadcrumbService"));
},{"./BreadcrumbDirective":9,"./BreadcrumbService":10}],12:[function(require,module,exports){
'use strict';
var NavService = (function () {
    NavService.$inject = ['$injector'];
    function NavService($injector) {
        "ngInject";
        this.appbar = $injector.has('pipAppBar') ? $injector.get('pipAppBar') : null;
        this.icon = $injector.has('pipNavIcon') ? $injector.get('pipNavIcon') : null;
        this.breadcrumb = $injector.has('pipBreadcrumb') ? $injector.get('pipBreadcrumb') : null;
        this.actions = $injector.has('pipActions') ? $injector.get('pipActions') : null;
        this.search = $injector.has('pipSearch') ? $injector.get('pipSearch') : null;
        this.sidenav = $injector.has('pipSideNav') ? $injector.get('pipSideNav') : null;
        this.header = $injector.has('pipNavHeader') ? $injector.get('pipNavHeader') : null;
        this.menu = $injector.has('pipNavMenu') ? $injector.get('pipNavMenu') : null;
    }
    NavService.prototype.reset = function () {
        if (this.appbar)
            this.appbar.show();
        if (this.icon)
            this.icon.showMenu();
        if (this.breadcrumb)
            this.breadcrumb.showText(null);
        if (this.actions)
            this.actions.show();
        if (this.search)
            this.search.set(null);
        if (this.sidenav)
            this.sidenav.show();
    };
    return NavService;
}());
angular
    .module('pipNavService', [])
    .service('pipNavService', NavService);
},{}],13:[function(require,module,exports){
'use strict';
(function () {
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
})();
},{}],14:[function(require,module,exports){
'use strict';
(function () {
    DropdownDirectiveController.$inject = ['$scope', '$element', '$attrs', '$injector', '$rootScope', '$mdMedia', '$timeout'];
    function DropdownDirectiveController($scope, $element, $attrs, $injector, $rootScope, $mdMedia, $timeout) {
        "ngInject";
        var pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        var currentTheme = 'default';
        if (pipTheme)
            currentTheme = pipTheme.use();
        else if ($rootScope.$theme)
            currentTheme = $rootScope.$theme;
        $scope.class = ($attrs.class || '') + ' md-' + currentTheme + '-theme';
        $scope.media = pipMedia !== undefined ? pipMedia : $mdMedia;
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
            if ($scope.pipChange) {
                $timeout(function () {
                    $scope.pipChange();
                });
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
                select: '=pipDropdownSelect',
                pipChange: '&'
            },
            templateUrl: 'dropdown/Dropdown.html',
            controller: DropdownDirectiveController
        };
    }
    angular
        .module('pipDropdown', ['pipNav.Templates'])
        .directive('pipDropdown', dropdownDirective);
})();
},{}],15:[function(require,module,exports){
'use strict';
(function () {
    NavHeaderDirectiveController.$inject = ['$scope', '$element', '$rootScope', '$timeout', 'pipNavHeader'];
    function NavHeaderDirectiveController($scope, $element, $rootScope, $timeout, pipNavHeader) {
        "ngInject";
        var image = null, imageBlock = $element.find('.pip-sticky-nav-header-user'), $image, currentState, loadedDefaultImage = false;
        $element.addClass('pip-sticky-nav-header');
        $scope.onUserClick = onUserClick;
        $scope.onImageError = onImageError;
        $scope.onImageLoad = onImageLoad;
        $timeout(function () {
            $image = $element.find('.pip-sticky-nav-header-user-image');
            if ($image[0]) {
                $image[0].onload = onImageLoad;
                $image[0].onerror = onImageError;
            }
            else {
                $image.onload = onImageLoad;
                $image.onerror = onImageError;
            }
            onNavHeaderChanged(null, pipNavHeader.config);
        }, 20);
        $rootScope.$on('pipNavHeaderChanged', onNavHeaderChanged);
        $rootScope.$on('pipSideNavStateChanged', onStateChanged);
        return;
        function initHeader() {
            if (!pipNavHeader.config)
                return;
            $scope.title = pipNavHeader.config.title;
            $scope.subtitle = pipNavHeader.config.subtitle;
            $scope.imageUrl = pipNavHeader.config.imageUrl;
            $scope.imageCss = pipNavHeader.config.imageCss;
        }
        function onImageLoad($event) {
            var image = $($event.target);
            setImageMarginCSS(imageBlock, image);
        }
        ;
        function onImageError($event) {
            if (loadedDefaultImage)
                return;
            $scope.$apply(function () {
                setImage(pipNavHeader.config, true);
            });
        }
        ;
        function onStateChanged(event, state) {
            if (state === undefined)
                return;
            currentState = state;
            if (state.id == 'toggle') {
                $timeout(function () {
                    $scope.showHeader = currentState && currentState.id == 'toggle';
                }, 400);
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
        function setImage(config, loadError) {
            if (!config)
                return;
            var url;
            if (!loadError && !!config.imageUrl && !loadedDefaultImage) {
                url = config.imageUrl;
            }
            else {
                loadedDefaultImage = true;
                url = config.defaultImageUrl;
            }
            if (url && $image) {
                $image.attr('src', url);
            }
            else {
                imageBlock.css('display', 'none');
            }
        }
        function onNavHeaderChanged($event, config) {
            if (!config)
                return;
            setImage(config, false);
            $scope.title = config.title;
            $scope.subtitle = config.subtitle;
            $scope.imageUrl = config.imageUrl;
            $scope.imageCss = config.imageCss;
        }
        function onUserClick() {
            $rootScope.$broadcast('pipNavUserClicked');
        }
    }
    function navHeaderDirective() {
        return {
            restrict: 'EA',
            scope: {},
            replace: false,
            templateUrl: 'header/NavHeader.html',
            controller: NavHeaderDirectiveController
        };
    }
    angular
        .module('pipNavHeader')
        .directive('pipNavHeader', navHeaderDirective);
})();
},{}],16:[function(require,module,exports){
'use strict';
exports.NavHeaderChangedEvent = 'pipNavHeaderChanged';
var NavHeaderConfig = (function () {
    function NavHeaderConfig() {
    }
    return NavHeaderConfig;
}());
exports.NavHeaderConfig = NavHeaderConfig;
;
var NavHeaderService = (function () {
    function NavHeaderService(config, $rootScope) {
        this._config = config;
        this._rootScope = $rootScope;
    }
    Object.defineProperty(NavHeaderService.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavHeaderService.prototype, "title", {
        get: function () {
            return this._config.title;
        },
        set: function (value) {
            this._config.title = value;
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavHeaderService.prototype, "subtitle", {
        get: function () {
            return this._config.subtitle;
        },
        set: function (value) {
            this._config.subtitle = value;
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavHeaderService.prototype, "imageUrl", {
        get: function () {
            return this._config.imageUrl;
        },
        set: function (value) {
            this._config.imageUrl = value;
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavHeaderService.prototype, "click", {
        get: function () {
            return this._config.click;
        },
        set: function (value) {
            this._config.click = value;
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavHeaderService.prototype, "event", {
        get: function () {
            return this._config.event;
        },
        set: function (value) {
            this._config.event = value;
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    NavHeaderService.prototype.show = function (title, subtitle, imageUrl, callbackOrEvent) {
        this._config.title = title;
        this._config.subtitle = subtitle;
        this._config.imageUrl = imageUrl;
        if (_.isFunction(callbackOrEvent))
            this._config.click = callbackOrEvent;
        else
            this._config.click = null;
        if (_.isString(callbackOrEvent))
            this._config.event = callbackOrEvent;
        else
            this._config.event = null;
        this.sendConfigEvent();
    };
    NavHeaderService.prototype.hide = function () {
        this._config.title = null;
        this._config.subtitle = null;
        this._config.imageUrl = null;
        this._config.click = null;
        this._config.event = null;
        this.sendConfigEvent();
    };
    NavHeaderService.prototype.sendConfigEvent = function () {
        this._rootScope.$emit(exports.NavHeaderChangedEvent, this._config);
    };
    return NavHeaderService;
}());
var NavHeaderProvider = (function () {
    function NavHeaderProvider() {
        this._config = new NavHeaderConfig();
    }
    Object.defineProperty(NavHeaderProvider.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value || new NavHeaderConfig();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavHeaderProvider.prototype, "defaultImageUrl", {
        get: function () {
            return this._config.defaultImageUrl;
        },
        set: function (value) {
            this._config.defaultImageUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavHeaderProvider.prototype, "title", {
        get: function () {
            return this._config.title;
        },
        set: function (value) {
            this._config.title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavHeaderProvider.prototype, "subtitle", {
        get: function () {
            return this._config.subtitle;
        },
        set: function (value) {
            this._config.subtitle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavHeaderProvider.prototype, "imageUrl", {
        get: function () {
            return this._config.imageUrl;
        },
        set: function (value) {
            this._config.imageUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavHeaderProvider.prototype, "click", {
        get: function () {
            return this._config.click;
        },
        set: function (value) {
            this._config.click = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavHeaderProvider.prototype, "event", {
        get: function () {
            return this._config.event;
        },
        set: function (value) {
            this._config.event = value;
        },
        enumerable: true,
        configurable: true
    });
    NavHeaderProvider.prototype.set = function (title, subtitle, imageUrl, callbackOrEvent) {
        this._config.title = title;
        this._config.subtitle = subtitle;
        this._config.imageUrl = imageUrl;
        if (_.isFunction(callbackOrEvent))
            this._config.click = callbackOrEvent;
        else
            this._config.click = null;
        if (_.isString(callbackOrEvent))
            this._config.event = callbackOrEvent;
        else
            this._config.event = null;
    };
    NavHeaderProvider.prototype.clear = function () {
        this._config.title = null;
        this._config.subtitle = null;
        this._config.imageUrl = null;
        this._config.click = null;
        this._config.event = null;
    };
    NavHeaderProvider.prototype.$get = ['$rootScope', function ($rootScope) {
        "ngInject";
        if (this._service == null)
            this._service = new NavHeaderService(this._config, $rootScope);
        return this._service;
    }];
    return NavHeaderProvider;
}());
angular
    .module('pipNavHeader')
    .provider('pipNavHeader', NavHeaderProvider);
},{}],17:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipNavHeader', ['ngMaterial', 'pipNav.Templates']);
require("./NavHeaderService");
require("./NavHeaderDirective");
__export(require("./NavHeaderService"));
},{"./NavHeaderDirective":15,"./NavHeaderService":16}],18:[function(require,module,exports){
'use strict';
(function () {
    NavIconDirectiveController.$inject = ['$scope', '$element', '$attrs', '$rootScope', '$window', 'pipNavIcon'];
    function NavIconDirectiveController($scope, $element, $attrs, $rootScope, $window, pipNavIcon) {
        "ngInject";
        $element.addClass('pip-nav-icon');
        $scope.config = pipNavIcon.config;
        $rootScope.$on('pipNavIconChanged', onNavIconChanged);
        $scope.onNavIconClick = onNavIconClick;
        function onNavIconChanged(event, config) {
            $scope.config = config;
        }
        function onNavIconClick() {
            var breadcrumb, backCallback;
            if (_.isFunction($scope.config.click)) {
                $scope.config.click();
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
                imageUrl: '=pipImageUrl',
                icon: '=pipIcon'
            },
            replace: false,
            templateUrl: 'icon/NavIcon.html',
            controller: NavIconDirectiveController
        };
    }
    angular
        .module('pipNavIcon')
        .directive('pipNavIcon', navIconDirective);
})();
},{}],19:[function(require,module,exports){
'use strict';
exports.NavIconChangedEvent = 'pipNavIconChanged';
var NavIconConfig = (function () {
    function NavIconConfig() {
    }
    return NavIconConfig;
}());
exports.NavIconConfig = NavIconConfig;
;
var NavIconService = (function () {
    function NavIconService(config, $rootScope) {
        this._config = config;
        this._rootScope = $rootScope;
    }
    Object.defineProperty(NavIconService.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    NavIconService.prototype.setCallbackOrEvent = function (callbackOrEvent) {
        if (_.isFunction(callbackOrEvent)) {
            this._config.click = callbackOrEvent;
            this._config.event = null;
        }
        else if (_.isString(callbackOrEvent)) {
            this._config.click = null;
            this._config.event = callbackOrEvent;
        }
        else {
            this._config.click = null;
            this._config.event = null;
        }
    };
    NavIconService.prototype.showMenu = function (callbackOrEvent) {
        this._config.type = 'menu';
        this.setCallbackOrEvent(callbackOrEvent);
        this.sendConfigEvent();
    };
    NavIconService.prototype.showIcon = function (icon, callbackOrEvent) {
        this._config.type = 'icon';
        this._config.icon = icon;
        this.setCallbackOrEvent(callbackOrEvent);
        this.sendConfigEvent();
    };
    NavIconService.prototype.showBack = function (callbackOrEvent) {
        this._config.type = 'back';
        this.setCallbackOrEvent(callbackOrEvent);
        this.sendConfigEvent();
    };
    NavIconService.prototype.showImage = function (imageUrl, callbackOrEvent) {
        this._config.type = 'image';
        this._config.imageUrl = imageUrl;
        this.setCallbackOrEvent(callbackOrEvent);
        this.sendConfigEvent();
    };
    NavIconService.prototype.hide = function () {
        this._config.type = 'none';
        this.setCallbackOrEvent(null);
        this.sendConfigEvent();
    };
    NavIconService.prototype.sendConfigEvent = function () {
        this._rootScope.$broadcast(exports.NavIconChangedEvent, this._config);
    };
    return NavIconService;
}());
var NavIconProvider = (function () {
    function NavIconProvider() {
        this._config = new NavIconConfig();
    }
    Object.defineProperty(NavIconProvider.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value || new NavIconConfig();
        },
        enumerable: true,
        configurable: true
    });
    NavIconProvider.prototype.setCallbackOrEvent = function (callbackOrEvent) {
        if (_.isFunction(callbackOrEvent))
            this._config.click = callbackOrEvent;
        else
            this._config.click = null;
        if (_.isString(callbackOrEvent))
            this._config.event = callbackOrEvent;
        else
            this._config.event = null;
    };
    NavIconProvider.prototype.setMenu = function (callbackOrEvent) {
        this._config.type = 'menu';
        this.setCallbackOrEvent(callbackOrEvent);
    };
    NavIconProvider.prototype.setIcon = function (icon, callbackOrEvent) {
        this._config.type = 'icon';
        this._config.icon = icon;
        this.setCallbackOrEvent(callbackOrEvent);
    };
    NavIconProvider.prototype.setBack = function (callbackOrEvent) {
        this._config.type = 'back';
        this.setCallbackOrEvent(callbackOrEvent);
    };
    NavIconProvider.prototype.setImage = function (imageUrl, callbackOrEvent) {
        this._config.type = 'image';
        this._config.imageUrl = imageUrl;
        this.setCallbackOrEvent(callbackOrEvent);
    };
    NavIconProvider.prototype.clear = function () {
        this._config.type = 'none';
        this.setCallbackOrEvent(null);
    };
    NavIconProvider.prototype.$get = ['$rootScope', function ($rootScope) {
        "ngInject";
        if (this._service == null)
            this._service = new NavIconService(this._config, $rootScope);
        return this._service;
    }];
    return NavIconProvider;
}());
angular
    .module('pipNavIcon')
    .provider('pipNavIcon', NavIconProvider);
},{}],20:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipNavIcon', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require("./NavIconService");
require("./NavIconDirective");
__export(require("./NavIconService"));
},{"./NavIconDirective":18,"./NavIconService":19}],21:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
require("./dependencies/TranslateFilter");
require("./language/LanguagePickerDirective");
require("./dropdown/DropdownDirective");
require("./tabs/TabsDirective");
require("./actions");
require("./appbar");
require("./search");
require("./breadcrumb");
require("./sidenav");
require("./header");
require("./menu");
require("./icon");
require("./common/NavService");
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
__export(require("./actions"));
__export(require("./appbar"));
__export(require("./breadcrumb"));
__export(require("./search"));
__export(require("./sidenav"));
__export(require("./icon"));
__export(require("./menu"));
__export(require("./header"));
},{"./actions":4,"./appbar":8,"./breadcrumb":11,"./common/NavService":12,"./dependencies/TranslateFilter":13,"./dropdown/DropdownDirective":14,"./header":17,"./icon":20,"./language/LanguagePickerDirective":22,"./menu":25,"./search":28,"./sidenav":32,"./tabs/TabsDirective":33}],22:[function(require,module,exports){
'use strict';
(function () {
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
})();
},{}],23:[function(require,module,exports){
'use strict';
(function () {
    NavMenuDirectiveController.$inject = ['$scope', '$element', '$rootScope', '$window', '$location', '$timeout', '$injector', 'pipSideNav', 'pipNavMenu'];
    function NavMenuDirectiveController($scope, $element, $rootScope, $window, $location, $timeout, $injector, pipSideNav, pipNavMenu) {
        "ngInject";
        var animationDuration = 450, pipSideNavElement = $element.parent().parent();
        $element.addClass('pip-sticky-nav-menu');
        $scope.sections = $scope.sections || pipNavMenu.sections;
        setCollapsible();
        $scope.defaultIcon = pipNavMenu.defaultIcon;
        onStateChanged(null, pipSideNav.state);
        $rootScope.$on('pipNavMenuChanged', onConfigChanged);
        $rootScope.$on('pipSideNavStateChanged', onStateChanged);
        $scope.itemVisible = isHidden;
        $scope.clickLink = clickLink;
        $scope.isSectionEmpty = isSectionEmpty;
        $scope.onExpand = onExpand;
        $scope.isActive = isActive;
        return;
        function setCollapsible() {
            var collapsed;
            if (angular.isFunction($scope.collapsed)) {
                collapsed = $scope.collapsed();
            }
            else {
                collapsed = $scope.collapsed !== false && $scope.collapsed !== 'false';
            }
            $scope.isCollapsed = collapsed;
        }
        function onExpand() {
            if (!$scope.isCollapsed) {
                return;
            }
            $scope.expanded = !$scope.expanded;
            if ($scope.expanded) {
                pipSideNavElement.removeClass('pip-sticky-nav-small');
            }
            else {
                pipSideNavElement.addClass('pip-sticky-nav-small');
            }
            $rootScope.$emit('pipNavExpanded', $scope.expanded);
        }
        function isHidden(item) {
            return item && item.access && !item.access(item);
        }
        function isSectionEmpty(linkCollection) {
            var result = true;
            _.each(linkCollection, function (link) {
                if (!isHidden(link))
                    result = false;
            });
            return result;
        }
        function onConfigChanged(event, config) {
            if (!config)
                return;
            $scope.sections = config.sections;
        }
        function onStateChanged(event, state) {
            if (!state)
                return;
            $scope.isCollapsed = state.expand;
            $scope.expanded = state.isExpanded;
            $scope.expandedButton = state.expandedButton;
            $scope.sideNavState = state;
        }
        function isActive(link) {
            if (link.parentState) {
                var $state = $injector.has('$state') ? $injector.get('$state') : null;
                if ($state != null && $state.includes(link.parentState)) {
                    return true;
                }
            }
            else if (link.state) {
                var $state = $injector.has('$state') ? $injector.get('$state') : null;
                if ($state != null && $state.includes(link.state)) {
                    return true;
                }
            }
            else if (link.href) {
                if (link.href.split('?')[0] === $window.location.href.split('?')[0]) {
                    return true;
                }
            }
            else if (link.url) {
                if (link.url.split(/[\s/?]+/)[1] === $location.url().split(/[\s/?]+/)[1]) {
                    return true;
                }
            }
            return false;
        }
        function clickLink(event, link) {
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
                }, animationDuration);
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
                }, animationDuration);
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
                }, animationDuration);
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
            scope: {},
            replace: false,
            templateUrl: 'menu/NavMenu.html',
            controller: NavMenuDirectiveController
        };
    }
    angular
        .module('pipNavMenu')
        .directive('pipNavMenu', navMenuDirective);
})();
},{}],24:[function(require,module,exports){
'use strict';
exports.NavMenuChangedEvent = 'pipNavMenuChanged';
var NavMenuLink = (function () {
    function NavMenuLink() {
    }
    return NavMenuLink;
}());
exports.NavMenuLink = NavMenuLink;
var NavMenuSection = (function () {
    function NavMenuSection() {
    }
    return NavMenuSection;
}());
exports.NavMenuSection = NavMenuSection;
var NavMenuConfig = (function () {
    function NavMenuConfig() {
    }
    return NavMenuConfig;
}());
exports.NavMenuConfig = NavMenuConfig;
var NavMenuService = (function () {
    function NavMenuService(config, $rootScope) {
        this._config = config;
        this._rootScope = $rootScope;
    }
    Object.defineProperty(NavMenuService.prototype, "sections", {
        get: function () {
            return this._config.sections;
        },
        set: function (value) {
            this._config.sections = value || [];
            this.sendChangeEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavMenuService.prototype, "defaultIcon", {
        get: function () {
            return this._config.defaultIcon;
        },
        set: function (value) {
            this._config.defaultIcon = value;
            this.sendChangeEvent();
        },
        enumerable: true,
        configurable: true
    });
    NavMenuService.prototype.updateBadgeStyle = function (link, style) {
        if (link == null || !_.isString(style))
            return;
        _.each(this._config.sections, function (s) {
            _.each(s.links, function (l) {
                if (l.name == link)
                    l.badgeStyle = style;
            });
        });
        this.sendChangeEvent();
    };
    NavMenuService.prototype.updateCount = function (link, count) {
        if (link == null || !_.isNumber(count))
            return;
        _.each(this._config.sections, function (s) {
            _.each(s.links, function (l) {
                if (l.name == link)
                    l.count = count;
            });
        });
        this.sendChangeEvent();
    };
    NavMenuService.prototype.clearCounts = function () {
        _.each(this._config.sections, function (s) {
            _.each(s.links, function (l) {
                l.count = null;
            });
        });
        this.sendChangeEvent();
    };
    NavMenuService.prototype.sendChangeEvent = function () {
        this._rootScope.$emit(exports.NavMenuChangedEvent, this._config);
    };
    return NavMenuService;
}());
var NavMenuProvider = (function () {
    function NavMenuProvider() {
        this._config = {
            sections: [],
            defaultIcon: 'icons:folder'
        };
    }
    Object.defineProperty(NavMenuProvider.prototype, "sections", {
        get: function () {
            return this._config.sections;
        },
        set: function (value) {
            this._config.sections = value || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavMenuProvider.prototype, "defaultIcon", {
        get: function () {
            return this._config.defaultIcon;
        },
        set: function (value) {
            this._config.defaultIcon = value;
        },
        enumerable: true,
        configurable: true
    });
    NavMenuProvider.prototype.$get = ['$rootScope', function ($rootScope) {
        "ngInject";
        if (this._service == null)
            this._service = new NavMenuService(this._config, $rootScope);
        return this._service;
    }];
    return NavMenuProvider;
}());
angular
    .module('pipNavMenu')
    .provider('pipNavMenu', NavMenuProvider);
},{}],25:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipNavMenu', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require("./NavMenuService");
require("./NavMenuDirective");
__export(require("./NavMenuService"));
},{"./NavMenuDirective":23,"./NavMenuService":24}],26:[function(require,module,exports){
'use strict';
var SearchService_1 = require("./SearchService");
var SearchService_2 = require("./SearchService");
(function () {
    var SearchBarController = (function () {
        SearchBarController.$inject = ['$element', '$rootScope', 'pipSearch'];
        function SearchBarController($element, $rootScope, pipSearch) {
            "ngInject";
            var _this = this;
            this.enabled = false;
            this.search = { text: '' };
            this._rootScope = $rootScope;
            this._element = $element;
            $element.addClass('pip-search-bar');
            this.config = pipSearch.config;
            this.stateChange();
            $rootScope.$on(SearchService_1.SearchChangedEvent, function (event, config) {
                _this.onSearchChanged(event, config);
            });
        }
        SearchBarController.prototype.stateChange = function () {
            if (this.enabled) {
                this._element.addClass('w-stretch');
                this._element.parent().addClass('pip-search-active');
            }
            else {
                this._element.removeClass('w-stretch');
                this._element.parent().removeClass('pip-search-active');
            }
        };
        SearchBarController.prototype.onSearchChanged = function (event, config) {
            this.config = config;
            this.enabled = false;
            this.search.text = '';
            this.stateChange();
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
            this.stateChange();
        };
        SearchBarController.prototype.onClick = function () {
            var search = this.search.text;
            this.search.text = '';
            this.enabled = false;
            this.stateChange();
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
                this.stateChange();
                this.onClick();
            }
        };
        SearchBarController.prototype.onKeyDown = function (event) {
            if (event.keyCode === 13)
                this.onClick();
            else if (event.keyCode === 27) {
                this.enabled = false;
                this.stateChange();
            }
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
})();
},{"./SearchService":27}],27:[function(require,module,exports){
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
    Object.defineProperty(SearchService.prototype, "criteria", {
        get: function () {
            return this._config.criteria;
        },
        set: function (value) {
            this._config.criteria = value;
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "params", {
        get: function () {
            return this._config.params;
        },
        set: function (value) {
            this._config.params = value;
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "history", {
        get: function () {
            return this._config.history;
        },
        set: function (value) {
            this._config.history = value;
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "callback", {
        get: function () {
            return this._config.callback;
        },
        set: function (value) {
            this._config.callback = value;
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    SearchService.prototype.set = function (callback, criteria, params, history) {
        this._config.callback = callback;
        this._config.criteria = criteria;
        this._config.params = params;
        this._config.history = history;
        this.sendConfigEvent();
    };
    SearchService.prototype.clear = function () {
        this._config.callback = null;
        this._config.criteria = null;
        this._config.params = null;
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
},{}],28:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipSearchBar', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require("./SearchService");
require("./SearchBarDirective");
__export(require("./SearchService"));
},{"./SearchBarDirective":26,"./SearchService":27}],29:[function(require,module,exports){
'use strict';
(function () {
    SideNavDirectiveController.$inject = ['$scope', '$element', '$rootScope', '$injector', '$mdMedia', '$timeout', 'pipSideNav'];
    function SideNavDirectiveController($scope, $element, $rootScope, $injector, $mdMedia, $timeout, pipSideNav) {
        "ngInject";
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null, pipSystemInfo = $injector.has('pipSystemInfo') ? $injector.get('pipSystemInfo') : null, mainContainer = '.pip-main', bigWidth = 320, middleWidth = 240, smallWidth = 72, isResizing = false, animationDuration = 600, mediaBreakpoints;
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
                addClass: 'pip-sticky-nav-small sidenav-smalldesktop',
                showHeader: false,
                isLockedOpen: true,
                expandedButton: false,
                isExpanded: false,
                expand: false,
                showIconTooltype: true
            },
            large: {
                id: 'large',
                addClass: 'sidenav-smalldesktop',
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
        $element.addClass('pip-sticky-sidenav');
        checkSafari();
        if (pipSideNav.config && pipSideNav.config.type != 'popup') {
            $timeout(function () {
                setSideNaveState();
            }, 100);
            var windowResize = _.debounce(setSideNaveState, 10);
            $rootScope.$on('pipMainResized', windowResize);
            $rootScope.$on('pipSideNavState', onSideNavState);
        }
        else {
            isResizing = false;
            $scope.sidenavState = null;
            $timeout(function () {
                setState('toggle');
            }, 100);
        }
        $rootScope.$on('pipNavIconClicked', onNavIconClick);
        $rootScope.$on('pipSideNavChanged', onSideNavChanged);
        return;
        function checkSafari() {
            if (!pipSystemInfo || pipSystemInfo.browserName != 'safari') {
            }
        }
        function setBreakpoints() {
            if (!pipMedia || !angular.isObject(pipMedia.breakpoints)) {
                return { xs: 639, sm: 959, md: 1024, lg: 1919 };
            }
            else {
                return pipMedia.breakpoints;
            }
        }
        function onSideNavChanged(event, config) {
            var config = config || {};
            if (config.visible) {
                $element.css('display', 'block');
            }
            else {
                $element.css('display', 'none');
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
            if (pipSideNav.config && pipSideNav.config.type == 'popup') {
                return;
            }
            if (isResizing) {
                $timeout(setSideNaveState, animationDuration);
                return;
            }
            var mainWidth = $(mainContainer).innerWidth();
            var sideNavWidth = $('.pip-sticky-sidenav').innerWidth();
            var currentWidth = sideNavWidth ? sideNavWidth + 2 : 0;
            if (mainWidth + currentWidth < mediaBreakpoints.sm) {
                setState('toggle');
                return;
            }
            if (mainWidth + currentWidth < mediaBreakpoints.md) {
                setState('small');
                return;
            }
            if (mainWidth + currentWidth < mediaBreakpoints.lg) {
                setState('large');
                return;
            }
            setState('xlarge');
        }
        function setState(state) {
            if (isResizing)
                return;
            if ($scope.sidenavState && $scope.sidenavState.id == state)
                return;
            if (state != 'toggle') {
                $element.removeClass('sidenav-mobile');
            }
            if (state != 'small') {
                $element.removeClass('pip-sticky-nav-small');
            }
            if (state != 'xlarge') {
                $element.removeClass('sidenav-desktop');
            }
            if (state != 'large') {
                $element.removeClass('sidenav-smalldesktop');
            }
            isResizing = true;
            if (state == 'toggle') {
                pipSideNav.close();
            }
            $scope.sidenavState = $scope.navState[state];
            $element.addClass($scope.sidenavState.addClass);
            pipSideNav.state = $scope.sidenavState;
            $timeout(function () {
                setSideNaveState();
            }, 15);
            $timeout(function () {
                isResizing = false;
            }, animationDuration);
        }
    }
    function sideNavDirective() {
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
        .directive('pipSidenav', sideNavDirective);
})();
},{}],30:[function(require,module,exports){
'use strict';
(function () {
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
        onSideNavChanged(null, pipSideNav.config);
        $rootScope.$on('pipSideNavChanged', onSideNavChanged);
        function onSideNavChanged(event, config) {
            var parts = config.parts || {};
            var currentPartValue = parts[partName];
            var visible = !!(partValue ? currentPartValue == partValue : currentPartValue);
            if (visible != $scope.visible)
                $scope.visible = visible;
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
            link: function linkFunction($scope, $element, $attrs) {
                $attrs.ngIf = function () { return $scope.visible; };
                ngIf.link.apply(ngIf, arguments);
            },
            controller: SideNavPartDirectiveController
        };
    }
    angular
        .module('pipSideNav')
        .directive('pipSidenavPart', sidenavPartDirective);
})();
},{}],31:[function(require,module,exports){
'use strict';
hookSideNavEvents.$inject = ['$rootScope', 'pipSideNav'];
exports.SideNavChangedEvent = 'pipSideNavChanged';
exports.SideNavStateChangedEvent = 'pipSideNavStateChanged';
exports.OpenSideNavEvent = 'pipOpenSideNav';
exports.CloseSideNavEvent = 'pipCloseSideNav';
var SideNavConfig = (function () {
    function SideNavConfig() {
    }
    return SideNavConfig;
}());
exports.SideNavConfig = SideNavConfig;
var SideNavService = (function () {
    function SideNavService(config, $rootScope, $mdSidenav) {
        this._config = config;
        this._rootScope = $rootScope;
        this._sidenav = $mdSidenav;
    }
    Object.defineProperty(SideNavService.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideNavService.prototype, "classes", {
        get: function () {
            return this._config.classes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideNavService.prototype, "parts", {
        get: function () {
            return this._config.parts;
        },
        set: function (value) {
            this._config.parts = value || {};
            this.sendConfigEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideNavService.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value || {};
            this._rootScope.$broadcast(exports.SideNavStateChangedEvent, value);
        },
        enumerable: true,
        configurable: true
    });
    SideNavService.prototype.open = function () {
        this._sidenav('pip-sticky-sidenav').open();
    };
    SideNavService.prototype.close = function () {
        this._sidenav('pip-sticky-sidenav').close();
    };
    SideNavService.prototype.toggle = function () {
        this._sidenav('pip-sticky-sidenav').toggle();
    };
    SideNavService.prototype.show = function () {
        if (!this._config.visible) {
            this._config.visible = true;
            this.sendConfigEvent();
        }
    };
    SideNavService.prototype.hide = function () {
        if (this._config.visible) {
            this._config.visible = false;
            this.sendConfigEvent();
        }
    };
    SideNavService.prototype.addClass = function () {
        var _this = this;
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        _.each(classes, function (c) {
            _this._config.classes.push(c);
        });
        this.sendConfigEvent();
    };
    SideNavService.prototype.removeClass = function () {
        var _this = this;
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        _.each(classes, function (c) {
            _this._config.classes = _.reject(_this._config.classes, function (cc) { return cc == c; });
        });
        this.sendConfigEvent();
    };
    SideNavService.prototype.part = function (part, value) {
        this._config.parts[part] = value;
        this.sendConfigEvent();
    };
    SideNavService.prototype.sendConfigEvent = function () {
        this._rootScope.$emit(exports.SideNavChangedEvent, this._config);
    };
    return SideNavService;
}());
var SideNavProvider = (function () {
    function SideNavProvider() {
        this._config = {
            parts: {},
            classes: [],
            type: 'popup',
            state: null,
            visible: true
        };
    }
    Object.defineProperty(SideNavProvider.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value || new SideNavConfig();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideNavProvider.prototype, "parts", {
        get: function () {
            return this._config.parts;
        },
        set: function (value) {
            this._config.parts = value || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideNavProvider.prototype, "type", {
        get: function () {
            return this._config.type;
        },
        set: function (value) {
            this._config.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideNavProvider.prototype, "visible", {
        get: function () {
            return this._config.visible;
        },
        set: function (value) {
            this._config.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideNavProvider.prototype, "classes", {
        get: function () {
            return this._config.classes;
        },
        set: function (value) {
            this._config.classes = value || [];
        },
        enumerable: true,
        configurable: true
    });
    SideNavProvider.prototype.addClass = function () {
        var _this = this;
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        _.each(classes, function (c) {
            _this._config.classes.push(c);
        });
    };
    SideNavProvider.prototype.removeClass = function () {
        var _this = this;
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        _.each(classes, function (c) {
            _this._config.classes = _.reject(_this._config.classes, function (cc) { return cc == c; });
        });
    };
    SideNavProvider.prototype.part = function (part, value) {
        this._config.parts[part] = value;
    };
    SideNavProvider.prototype.$get = ['$rootScope', '$mdSidenav', function ($rootScope, $mdSidenav) {
        "ngInject";
        if (this._service == null)
            this._service = new SideNavService(this._config, $rootScope, $mdSidenav);
        return this._service;
    }];
    return SideNavProvider;
}());
function hookSideNavEvents($rootScope, pipSideNav) {
    $rootScope.$on(exports.OpenSideNavEvent, function () { pipSideNav.open(); });
    $rootScope.$on(exports.CloseSideNavEvent, function () { pipSideNav.close(); });
}
angular
    .module('pipSideNav')
    .provider('pipSideNav', SideNavProvider)
    .run(hookSideNavEvents);
},{}],32:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipSideNav', ['ngMaterial', 'pipNav.Templates']);
require("./SideNavService");
require("./SideNavPartDirective");
require("./SideNavDirective");
__export(require("./SideNavService"));
},{"./SideNavDirective":29,"./SideNavPartDirective":30,"./SideNavService":31}],33:[function(require,module,exports){
'use strict';
(function () {
    TabsDirectiveController.$inject = ['$scope', '$element', '$attrs', '$mdMedia', '$injector', '$rootScope', '$parse', '$timeout'];
    function TabsDirectiveController($scope, $element, $attrs, $mdMedia, $injector, $rootScope, $parse, $timeout) {
        "ngInject";
        var pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null, pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null, pipTabIndex = $attrs.pipTabIndex ? parseInt($attrs.pipTabIndex) : 0, currentTheme = 'default';
        $scope.selected = {};
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
        if (pipTabIndex) {
            $timeout(function () {
                var a = $element.find('md-tabs-canvas');
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
            }
            else {
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
        }
        ;
        function tabDisabled(index) {
            return ($scope.disabled() && $scope.selected.activeIndex != index);
        }
        ;
        function onSelect(index) {
            if ($scope.disabled())
                return;
            $scope.activeIndex = index;
            $scope.selected.activeIndex = index;
            $scope.selected.activeTab = $scope.selected.activeIndex;
            if ($scope.select) {
                $scope.select($scope.tabs[$scope.selected.activeIndex], $scope.selected.activeIndex);
            }
        }
        ;
        function showShadow() {
            if ($scope.showTabsShadow) {
                return $scope.showTabsShadow();
            }
            else {
                return false;
            }
        }
        ;
        function show() {
            if ($scope.showTabs) {
                return $scope.showTabs();
            }
            else {
                return true;
            }
        }
        ;
        function toBoolean(value) {
            if (value == null)
                return false;
            if (!value)
                return false;
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
},{}],34:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('actions/PrimaryActions.html',
    '<div pip-focused="" pip-focused-tabindex="2"><md-menu md-position-mode="target-right target" class="pip-primary-actions" ng-repeat="action in config.primaryLocalActions"><md-button class="pip-primary-actions-action md-icon-button pip-focusable" ng-click="clickAction(action, $mdOpenMenu);" tabindex="-1" ng-hide="isHidden(action)" aria-label="{{action.title | translate}}"><div class="pip-primary-actions-badge" ng-show="action.count > 0">{{actionCount(action)}}</div><md-icon md-svg-icon="{{action.icon}}"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="subAction in action.subActions" ng-if="!subAction.divider" ng-hide="isHidden(subAction)"><md-button class="pip-focusable" ng-hide="subAction.divider" tabindex="-1" ng-click="clickAction(subAction)">{{::subAction.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="subAction.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu><md-menu md-position-mode="target-right target" class="pip-primary-actions" ng-repeat="action in config.primaryGlobalActions"><md-button class="pip-primary-actions-action md-icon-button pip-focusable" ng-click="clickAction(action, $mdOpenMenu);" ng-hide="isHidden(action)" tabindex="-1" aria-label="{{action.title | translate}}"><div class="pip-primary-actions-badge color-badge-bg" ng-show="action.count > 0">{{actionCount(action)}}</div><md-icon md-svg-icon="{{action.icon}}"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="subAction in action.subActions" ng-if="!subAction.divider" ng-hide="isHidden(subAction)"><md-button class="pip-focusable" ng-hide="subAction.divider" tabindex="-1" ng-click="clickAction(subAction)">{{subAction.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="subAction.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu></div>');
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
    '<md-menu ng-if="secondaryActionsVisible()" md-position-mode="target-right target"><md-button class="md-icon-button" tabindex="3" ng-init="getMenu($mdOpenMenu)" ng-click="onSecondaryActionClick(); openMenu($mdOpenMenu, $event);" aria-label="open actions"><md-icon md-svg-icon="icons:vdots"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="action in config.secondaryLocalActions" ng-if="!action.divider" ng-hide="isHidden(action)"><md-button ng-hide="action.divider" ng-click="clickAction(action)">{{::action.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="action.divider" ng-repeat-end=""></md-menu-divider><md-menu-divider ng-if="secondaryDividerVisible()"></md-menu-divider><md-menu-item ng-repeat-start="action in config.secondaryGlobalActions" ng-if="!action.divider" ng-hide="isHidden(action)"><md-button ng-hide="action.divider" ng-click="clickAction(action)">{{::action.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="action.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu>');
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
    '<md-toolbar class="{{ config.classes.join(\' \') }}" ng-if="config.visible" ng-transclude=""></md-toolbar>');
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
    '<div class="pip-breadcrumb-block"><div class="text-overflow" ng-if="!vm._media(\'xs\')"><span ng-if="vm.config.criteria" ng-click="vm.openSearch()">{{vm.config.criteria}} -</span><span class="pip-breadcrumb-item {{$last ? \'breadcrumb-accent\' : \'\'}}" ng-if="vm.config.items && vm.config.items.length > 0" ng-repeat-start="item in vm.config.items" ng-click="vm.onClick(item)" ng-init="stepWidth = 100/(vm.config.items.length + 1)" ng-class="{\'cursor-pointer\': !$last}" ng-style="{\'max-width\': stepWidth + \'%\'}"><span ng-if="!$last || !vm.actionsVisible(item)">{{item.title | translate}}</span><div ng-if="$last && vm.actionsVisible(item)" style="display: inline-block; position: relative;"><md-menu md-offset="0 44"><span class="layout-row pip-breadcrumb-item-menu cursor-pointer {{$last ? \'breadcrumb-accent\' : \'\'}}" ng-click="vm.onOpenMenu($mdOpenMenu, $event)" md-ink-ripple="" aria-label="open breadcrumb actions">{{item.title | translate}}<md-icon class="pip-triangle-down" md-svg-icon="icons:triangle-down"></md-icon></span><md-menu-content width="4"><md-menu-item ng-if="!subItem.divider" ng-repeat-start="subItem in item.subActions"><md-button ng-click="vm.onSubActionClick(subItem)" ng-if="!action.divider" tabindex="4"><md-icon md-menu-align-target="" ng-if="subItem.icon" md-svg-icon="{{subItem.icon}}"></md-icon><span>{{subItem.title | translate}}</span></md-button></md-menu-item><md-menu-divider ng-if="subItem.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu></div></span><md-icon ng-repeat-end="" md-svg-icon="icons:chevron-right" ng-hide="$last"></md-icon><span class="pip-title breadcrumb-accent" ng-if="vm.config.text">{{vm.config.text | translate}}</span></div><div style="position: relative;" ng-if="vm._media(\'xs\')"><md-menu md-offset="0 44"><span class="pip-mobile-breadcrumb layout-row" ng-click="vm.config.items && vm.config.items.length > 1 ? $mdOpenMenu() : return"><span class="text-overflow"><span ng-if="vm.config.criteria" ng-click="vm.openSearch()">{{vm.config.criteria}} -</span> <span class="breadcrumb-accent" ng-if="vm.config.text">{{vm.config.text | translate}}</span> <span ng-if="vm.config.items && vm.config.items.length > 0" class="breadcrumb-accent {{(vm.config.items && vm.config.items.length > 1) ? \'cursor-pointer\' : \'\' }}">{{vm.config.items[vm.config.items.length - 1].title | translate}}</span></span><md-icon class="pip-triangle-down cursor-pointer breadcrumb-accent" md-svg-icon="icons:triangle-down" ng-if="vm.config.items && vm.config.items.length > 1"></md-icon></span><md-menu-content width="4"><md-menu-item ng-repeat="item in vm.config.items" ng-if="vm.config.items && vm.config.items.length > 0"><md-button ng-click="vm.onClick(item)" tabindex="5"><md-icon md-menu-align-target="" ng-if="item.icon" md-svg-icon="{{item.icon}}"></md-icon><span>{{item.title | translate}}</span></md-button></md-menu-item><md-menu-item ng-if="vm.config.text"><md-button tabindex="5"><span class="text-grey">{{vm.config.text | translate}}</span></md-button></md-menu-item></md-menu-content></md-menu></div></div>');
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
    '<md-toolbar class="md-subhead color-primary-bg {{class}}" ng-if="show()" ng-class="{\'md-whiteframe-3dp\': media(\'xs\')}"><div class="pip-divider"></div><md-select ng-model="selectedIndex" tabindex="15" ng-disabled="disabled()" md-container-class="pip-full-width-dropdown" aria-label="DROPDOWN" md-ink-ripple="" md-on-close="onSelect(selectedIndex)"><md-option ng-repeat="action in actions" value="{{ ::$index }}" ng-selected="activeIndex == $index ? true : false">{{ (action.title || action.name || action) | translate }}</md-option></md-select></md-toolbar>');
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
    '<md-toolbar ng-show="showHeader" class="layout-row layout-align-start-center"><div class="flex-fixed pip-sticky-nav-header-user"><md-button class="md-icon-button" ng-click="onUserClick()" aria-label="current user" tabindex="-1"><img src="" class="pip-sticky-nav-header-user-image" ng-class="imageCss"></md-button></div><div class="pip-sticky-nav-header-user-text"><div class="pip-sticky-nav-header-user-pri" ng-click="onUserClick()" tabindex="-1">{{ title | translate }}</div><div class="pip-sticky-nav-header-user-sec">{{ subtitle | translate }}</div></div></md-toolbar>');
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
    '<md-button class="md-icon-button pip-nav-icon" ng-if="config.type != \'none\'" ng-class="config.class" ng-click="onNavIconClick()" tabindex="{{config.type==\'menu\' || config.type==\'back\' ? 4 : -1 }}" aria-label="menu"><md-icon ng-if="config.type==\'menu\'" md-svg-icon="icons:menu"></md-icon><img ng-src="{{config.imageUrl}}" ng-if="config.type==\'image\'" height="24" width="24"><md-icon ng-if="config.type==\'back\'" md-svg-icon="icons:arrow-left"></md-icon><md-icon ng-if="config.type==\'icon\'" md-svg-icon="{{config.icon}}"></md-icon></md-button>');
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
    '<md-menu md-position-mode="target-right target"><span class="pip-language" ng-click="$mdOpenMenu()" aria-label="language selection">{{vm.language | translate}}<md-icon md-svg-icon="icons:triangle-down"></md-icon></span><md-menu-content width="3"><md-menu-item ng-repeat="language in vm.languages"><md-button ng-click="vm.onLanguageClick(lang)" tabindex="7">{{language | translate}}</md-button></md-menu-item></md-menu-content></md-menu>');
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
    '<div ng-if="sections && sections.length"><md-list class="sidenav-list" pip-focused="" pip-focused-tabindex="10" pip-with-hidden="true"><md-list-item class="no-border pip-sticky-nav-menu-item pip-sticky-nav-expanded-button" ng-click="onExpand()" ng-disabled="!isCollapsed" tabindex="-1" ng-if="expandedButton"><md-icon md-svg-icon="icons:chevron-left" ng-if="expanded" class="pip-sticky-nav-menu-icon"></md-icon><md-icon md-svg-icon="icons:chevron-right" ng-if="!expanded" class="pip-sticky-nav-menu-icon"></md-icon></md-list-item><md-divider ng-show="expandedButton"></md-divider><div class="pip-section" ng-repeat="section in sections" ng-hide="section.access && !section.access(section)"><md-divider ng-show="$index > 0 && !isSectionEmpty(section.links)"></md-divider><md-subheader ng-show="section.title" style="height: 48px;"><span ng-if="expanded" class="pip-sticky-nav-menu-title section-title">{{::section.title | translate}}</span><md-icon md-svg-icon="{{section.icon}}" ng-if="!sideNavState.showIconTooltype && !expanded && section.icon" class="pip-sticky-nav-menu-icon section-icon"></md-icon><md-icon md-svg-icon="{{section.icon}}" ng-if="sideNavState.showIconTooltype && !expanded && section.icon" class="pip-sticky-nav-menu-icon section-icon"><md-tooltip md-visible="showTooltip" md-direction="right" class="sidenav-icon-tooltip">{{::section.tooltipText || section.title | translate}}</md-tooltip></md-icon><md-icon md-svg-icon="{{defaultIcon}}" ng-if="!sideNavState.showIconTooltype && !expanded && !section.icon" class="pip-sticky-nav-menu-icon section-icon"></md-icon><md-icon md-svg-icon="{{defaultIcon}}" ng-if="sideNavState.showIconTooltype && !expanded && !section.icon" class="pip-sticky-nav-menu-icon section-icon"><md-tooltip md-visible="showTooltip" class="md-secondary">{{::section.tooltipText || section.title | translate}}</md-tooltip></md-icon></md-subheader><md-list-item class="no-border pip-sticky-nav-menu-item pip-focusable" ng-repeat="link in section.links" tabindex="-1" ng-class="{\'active\': isActive(link)}" ng-hide="link.access && !link.access(link)"><md-button class="layout-row layout-align-start-center pip-button-block" tabindex="-1" ng-click="clickLink($event, link)"><md-tooltip md-visible="showTooltip" md-direction="right">{{::link.tooltipText | translate}}</md-tooltip><div class="pip-sticky-nav-menu-icon-block"><md-icon md-svg-icon="{{link.icon}}" ng-if="!(sideNavState.showIconTooltype && !link.tooltipText && !expanded)" ng-hide="!link.icon" class="pip-sticky-nav-menu-icon flex-fixed"></md-icon><md-icon md-svg-icon="{{link.icon}}" ng-hide="!link.icon" ng-if="sideNavState.showIconTooltype && !link.tooltipText && !expanded" class="pip-sticky-nav-menu-icon flex-fixed"><md-tooltip md-visible="showTooltip" md-direction="right" class="sidenav-icon-tooltip">{{::link.tooltipText || link.title | translate}}</md-tooltip></md-icon></div><div class="pip-sticky-nav-menu-title">{{::link.title | translate}}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count < 100">{{link.count}}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count > 99">!</div></md-button></md-list-item></div></md-list></div>');
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
    '<md-sidenav class="md-sidenav-left" md-is-locked-open="sidenavState.isLockedOpen" md-component-id="pip-sticky-sidenav" ng-transclude=""></md-sidenav>');
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
    '<div class="md-toolbar-tools pip-search-container" ng-if="vm.enabled"><div class="layout-row pip-search-selected"><md-button class="md-icon-button" tabindex="6" aria-label="start search" ng-click="vm.onClick()"><md-icon md-svg-icon="icons:search"></md-icon></md-button><input class="pip-search-text flex" type="search" tabindex="6" ng-model="vm.search.text" ng-keydown="vm.onKeyDown($event)"><md-button class="md-icon-button" tabindex="6" aria-label="clear search" ng-click="vm.clear()"><md-icon md-svg-icon="icons:cross-circle"></md-icon></md-button></div></div><div class="md-toolbar-tools layout-row layout-align-end-center flex-fixed lp0 rp0" ng-if="!vm.enabled"><md-button class="md-icon-button" tabindex="5" aria-label="start search" ng-click="vm.enable()"><md-icon md-svg-icon="icons:search"></md-icon></md-button></div>');
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
    '<md-toolbar class="pip-nav {{ class }}" ng-class="{\'pip-visible\': show(), \'pip-shadow\': showShadow()}"><md-tabs ng-if="media(\'gt-sm\')" md-selected="selected.activeTab" ng-class="{\'disabled\': disabled()}" md-stretch-tabs="true" md-dynamic-height="true"><md-tab ng-repeat="tab in tabs track by $index" ng-disabled="tabDisabled($index)" md-on-select="onSelect($index)"><md-tab-label>{{::tab.nameLocal }}<div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">{{ tab.newCounts }}</div><div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div></md-tab-label></md-tab></md-tabs><div class="md-subhead pip-tabs-content color-primary-bg" ng-if="!media(\'gt-sm\')"><div class="pip-divider position-top m0"></div><md-select ng-model="selected.activeIndex" ng-disabled="disabled()" md-container-class="pip-full-width-dropdown" aria-label="SELECT" md-ink-ripple="" md-on-close="onSelect(selected.activeIndex)"><md-option ng-repeat="tab in tabs track by $index" class="pip-tab-option" value="{{ ::$index }}">{{ ::tab.nameLocal }}<div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">{{ tab.newCounts }}</div><div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div></md-option></md-select></div></md-toolbar>');
}]);
})();



},{}]},{},[34,21])(34)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWN0aW9ucy9BY3Rpb25zU2VydmljZS50cyIsInNyYy9hY3Rpb25zL1ByaW1hcnlBY3Rpb25zRGlyZWN0aXZlLnRzIiwic3JjL2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9uc0RpcmVjdGl2ZS50cyIsInNyYy9hY3Rpb25zL2luZGV4LnRzIiwic3JjL2FwcGJhci9BcHBCYXJEaXJlY3RpdmUudHMiLCJzcmMvYXBwYmFyL0FwcEJhclBhcnREaXJlY3RpdmUudHMiLCJzcmMvYXBwYmFyL0FwcEJhclNlcnZpY2UudHMiLCJzcmMvYXBwYmFyL2luZGV4LnRzIiwic3JjL2JyZWFkY3J1bWIvQnJlYWRjcnVtYkRpcmVjdGl2ZS50cyIsInNyYy9icmVhZGNydW1iL0JyZWFkY3J1bWJTZXJ2aWNlLnRzIiwic3JjL2JyZWFkY3J1bWIvaW5kZXgudHMiLCJzcmMvY29tbW9uL05hdlNlcnZpY2UudHMiLCJzcmMvZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlci50cyIsInNyYy9kcm9wZG93bi9Ecm9wZG93bkRpcmVjdGl2ZS50cyIsInNyYy9oZWFkZXIvTmF2SGVhZGVyRGlyZWN0aXZlLnRzIiwic3JjL2hlYWRlci9OYXZIZWFkZXJTZXJ2aWNlLnRzIiwic3JjL2hlYWRlci9pbmRleC50cyIsInNyYy9pY29uL05hdkljb25EaXJlY3RpdmUudHMiLCJzcmMvaWNvbi9OYXZJY29uU2VydmljZS50cyIsInNyYy9pY29uL2luZGV4LnRzIiwic3JjL2luZGV4LnRzIiwic3JjL2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyRGlyZWN0aXZlLnRzIiwic3JjL21lbnUvTmF2TWVudURpcmVjdGl2ZS50cyIsInNyYy9tZW51L05hdk1lbnVTZXJ2aWNlLnRzIiwic3JjL21lbnUvaW5kZXgudHMiLCJzcmMvc2VhcmNoL1NlYXJjaEJhckRpcmVjdGl2ZS50cyIsInNyYy9zZWFyY2gvU2VhcmNoU2VydmljZS50cyIsInNyYy9zZWFyY2gvaW5kZXgudHMiLCJzcmMvc2lkZW5hdi9TaWRlTmF2RGlyZWN0aXZlLnRzIiwic3JjL3NpZGVuYXYvU2lkZU5hdlBhcnREaXJlY3RpdmUudHMiLCJzcmMvc2lkZW5hdi9TaWRlTmF2U2VydmljZS50cyIsInNyYy9zaWRlbmF2L2luZGV4LnRzIiwic3JjL3RhYnMvVGFic0RpcmVjdGl2ZS50cyIsInRlbXAvcGlwLXdlYnVpLW5hdi1odG1sLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBRUYsUUFBQSxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUMxQyxRQUFBLHlCQUF5QixHQUFHLHlCQUF5QixDQUFDO0FBRWpFO0lBQUE7SUEyQkEsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0EzQkEsQUEyQkMsSUFBQTtBQTNCWSw0Q0FBZ0I7QUE2QjdCO0lBQWdDLDhCQUFnQjtJQUFoRDs7SUFFQSxDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQUZBLEFBRUMsQ0FGK0IsZ0JBQWdCLEdBRS9DO0FBRlksZ0NBQVU7QUFJdkI7SUFBQTtRQUVXLHlCQUFvQixHQUFpQixFQUFFLENBQUM7UUFFeEMsd0JBQW1CLEdBQWlCLEVBQUUsQ0FBQztRQUd2QywyQkFBc0IsR0FBaUIsRUFBRSxDQUFDO1FBRTFDLDBCQUFxQixHQUFnQixFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FWQSxBQVVDLElBQUE7QUFWWSxzQ0FBYTtBQW9DMUI7SUFJSSx3QkFDSSxNQUFxQixFQUNyQixVQUFnQztRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsc0JBQVcsa0NBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGdEQUFvQjthQUEvQjtZQUNJLE1BQU0s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QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBBY3Rpb25zQ2hhbmdlZEV2ZW50ID0gJ3BpcEFjdGlvbnNDaGFuZ2VkJztcclxuZXhwb3J0IGxldCBTZWNvbmRhcnlBY3Rpb25zT3BlbkV2ZW50ID0gJ3BpcFNlY29uZGFyeUFjdGlvbnNPcGVuJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaW1wbGVBY3Rpb25JdGVtIHtcclxuICAgIC8vIE5hbWUgdG8gcmVmZXIgdG8gdGhlIGl0ZW1cclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICAvLyBMaW5rIHZpc2libGUgdGl0bGVcclxuICAgIHB1YmxpYyB0aXRsZT86IHN0cmluZztcclxuICAgIC8vIFNob3cgZGl2aWRlciBpbnN0ZWFkIG9mIHRpdGxlXHJcbiAgICBwdWJsaWMgZGl2aWRlcj86IGJvb2xlYW47XHJcbiAgICAvLyBJY29uIG5hbWUgZnJvbSAkaWNvblByb3ZpZGVyXHJcbiAgICBwdWJsaWMgaWNvbj86IHN0cmluZztcclxuICAgIC8vIENvdW50ZXIgYmFkZ2VcclxuICAgIHB1YmxpYyBjb3VudD86IG51bWJlcjtcclxuICAgIC8vIEFjY2VzcyBmdW5jdGlvblxyXG4gICAgcHVibGljIGFjY2Vzcz86IChhY3Rpb246IFNpbXBsZUFjdGlvbkl0ZW0pID0+IGJvb2xlYW47XHJcbiAgICAvLyBTaG93IG9uIHNwZWNpZmllZCBicmVha3BvaW50c1xyXG4gICAgcHVibGljIGJyZWFrcG9pbnRzPzogc3RyaW5nW107XHJcbiAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZlxyXG4gICAgcHVibGljIGhyZWY/OiBzdHJpbmc7XHJcbiAgICAvLyAkbG9jYXRpb24udXJsXHJcbiAgICBwdWJsaWMgdXJsPzogc3RyaW5nO1xyXG4gICAgLy8gJHN0YXRlLmdvKHN0YXRlLCBzdGF0ZVBhcmFtcylcclxuICAgIHB1YmxpYyBzdGF0ZT86IHN0cmluZztcclxuICAgIC8vIFBhcmFtZXRlcnMgZm9yICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMpXHJcbiAgICBwdWJsaWMgc3RhdGVQYXJhbXM/OiBhbnk7XHJcbiAgICAvLyAkcm9vdFNjb3BlLmJyb2FkY2FzdChldmVudClcclxuICAgIHB1YmxpYyBldmVudD86IHN0cmluZztcclxuICAgIC8vIENsaWNrIGNhbGxiYWNrXHJcbiAgICBwdWJsaWMgY2xpY2s/OiAoYWN0aW9uOiBTaW1wbGVBY3Rpb25JdGVtKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uSXRlbSBleHRlbmRzIFNpbXBsZUFjdGlvbkl0ZW0ge1xyXG4gICAgcHVibGljIHN1YkFjdGlvbnM6IFNpbXBsZUFjdGlvbkl0ZW1bXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGlvbnNDb25maWcge1xyXG4gICAgLy8gUHJpbWFyeSBnbG9iYWwgYWN0aW9ucyB2aXNpYmxlIG9uIHRoZSBzY3JlZW5cclxuICAgIHB1YmxpYyBwcmltYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdID0gW107XHJcbiAgICAvLyBQcmltYXJ5IGxvY2FsIGFjdGlvbnMgdmlzaWJsZSBvbiB0aGUgc2NyZWVuXHJcbiAgICBwdWJsaWMgcHJpbWFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdID0gW107XHJcblxyXG4gICAgLy8gU2Vjb25kYXJ5IGdsb2JhbCBhY3Rpb25zIGF2YWlsYWJsZSBpbiBwb3B1cFxyXG4gICAgcHVibGljIHNlY29uZGFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXSA9IFtdO1xyXG4gICAgLy8gU2Vjb25kYXJ5IGxvY2FsIGFjdGlvbnMgYXZhaWxhYmxlIGluIHBvcHVwXHJcbiAgICBwdWJsaWMgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW109IFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25zU2VydmljZSB7XHJcbiAgICByZWFkb25seSBjb25maWc6IEFjdGlvbnNDb25maWc7XHJcblxyXG4gICAgcHJpbWFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHByaW1hcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHNlY29uZGFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHNlY29uZGFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdOyAgICBcclxuXHJcbiAgICBzaG93KHByaW1hcnlBY3Rpb25zPzogQWN0aW9uSXRlbVtdLCBzZWNvbmRhcnlBY3Rpb25zPzogQWN0aW9uSXRlbVtdKTogdm9pZDtcclxuICAgIGhpZGUoKTogdm9pZDtcclxuICAgIHVwZGF0ZUNvdW50KGxpbms6IHN0cmluZywgY291bnQ6IG51bWJlcik6IHZvaWQ7IFxyXG4gICAgY2xlYXJDb3VudHMoKTogdm9pZDtcclxuICAgIG9wZW5NZW51RXZlbnQoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uc1Byb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBjb25maWc6IEFjdGlvbnNDb25maWc7XHJcbiAgICBcclxuICAgIHByaW1hcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBwcmltYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBzZWNvbmRhcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTsgICAgXHJcbn1cclxuXHJcbmNsYXNzIEFjdGlvbnNTZXJ2aWNlIGltcGxlbWVudHMgSUFjdGlvbnNTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQWN0aW9uc0NvbmZpZztcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvbmZpZzogQWN0aW9uc0NvbmZpZyxcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogQWN0aW9uc0NvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHByaW1hcnlHbG9iYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByaW1hcnlHbG9iYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUdsb2JhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlY29uZGFyeUdsb2JhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHByaW1hcnlMb2NhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwcmltYXJ5TG9jYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWNvbmRhcnlMb2NhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlY29uZGFyeUxvY2FsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3cocHJpbWFyeUFjdGlvbnM/OiBBY3Rpb25JdGVtW10sIHNlY29uZGFyeUFjdGlvbnM/OiBBY3Rpb25JdGVtW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucyA9IHByaW1hcnlBY3Rpb25zIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMgPSBzZWNvbmRhcnlBY3Rpb25zIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlQ291bnQoYWN0aW9uOiBzdHJpbmcsIGNvdW50OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoYWN0aW9uID09IG51bGwgfHwgIV8uaXNOdW1iZXIoY291bnQpKSByZXR1cm47XHJcblxyXG4gICAgICAgIF8uZWFjaCh0aGlzLl9jb25maWcucHJpbWFyeUdsb2JhbEFjdGlvbnMsIChhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhLm5hbWUgPT0gYWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgYS5jb3VudCA9IGNvdW50O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF8uZWFjaCh0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGEubmFtZSA9PSBhY3Rpb24pXHJcbiAgICAgICAgICAgICAgICBhLmNvdW50ID0gY291bnQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQ291bnRzKCk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaCh0aGlzLl9jb25maWcucHJpbWFyeUdsb2JhbEFjdGlvbnMsIChhKSA9PiB7XHJcbiAgICAgICAgICAgIGEuY291bnQgPSBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF8uZWFjaCh0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgYS5jb3VudCA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ2hhbmdlRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRlbWl0KEFjdGlvbnNDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5NZW51RXZlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRlbWl0KFNlY29uZGFyeUFjdGlvbnNPcGVuRXZlbnQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBY3Rpb25zUHJvdmlkZXIgaW1wbGVtZW50cyBJQWN0aW9uc1Byb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQWN0aW9uc0NvbmZpZyA9IG5ldyBBY3Rpb25zQ29uZmlnKCk7XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBY3Rpb25zU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBY3Rpb25zQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29uZmlnKHZhbHVlOiBBY3Rpb25zQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsdWUgfHwgbmV3IEFjdGlvbnNDb25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHByaW1hcnlHbG9iYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByaW1hcnlHbG9iYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUdsb2JhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY29uZGFyeUdsb2JhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByaW1hcnlMb2NhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWNvbmRhcnlMb2NhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlY29uZGFyeUxvY2FsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGUpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgQWN0aW9uc1NlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQWN0aW9ucycpXHJcbiAgICAucHJvdmlkZXIoJ3BpcEFjdGlvbnMnLCBBY3Rpb25zUHJvdmlkZXIpO1xyXG5cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5mdW5jdGlvbiBQcmltYXJ5QWN0aW9uc0NvbnRyb2xsZXIoXHJcbiAgICAkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRyb290U2NvcGUsICR3aW5kb3csICRsb2NhdGlvbiwgJGluamVjdG9yLCBwaXBBY3Rpb25zKSB7XHJcblxyXG4gICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXByaW1hcnktYWN0aW9ucycpO1xyXG5cclxuICAgIGlmICgkc2NvcGUubG9jYWxBY3Rpb25zKSBcclxuICAgICAgICBwaXBBY3Rpb25zLnByaW1hcnlMb2NhbEFjdGlvbnMgPSAkc2NvcGUubG9jYWxBY3Rpb25zO1xyXG5cclxuICAgIGlmICgkc2NvcGUuZ2xvYmFsQWN0aW9ucylcclxuICAgICAgICBwaXBBY3Rpb25zLnByaW1hcnlHbG9iYWxBY3Rpb25zID0gJHNjb3BlLmdsb2JhbEFjdGlvbnM7XHJcblxyXG4gICAgJHNjb3BlLmNvbmZpZyA9IHBpcEFjdGlvbnMuY29uZmlnO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCdwaXBBY3Rpb25zQ2hhbmdlZCcsIG9uQWN0aW9uc0NoYW5nZWQpO1xyXG5cclxuICAgICRzY29wZS5pc0hpZGRlbiA9IGlzSGlkZGVuO1xyXG4gICAgJHNjb3BlLmFjdGlvbkNvdW50ID0gYWN0aW9uQ291bnQ7XHJcbiAgICAkc2NvcGUuY2xpY2tBY3Rpb24gPSBjbGlja0FjdGlvbjtcclxuXHJcbiAgICByZXR1cm47XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uQWN0aW9uc0NoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICRzY29wZS5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNIaWRkZW4oYWN0aW9uKSB7XHJcbiAgICAgICAgLy8gVG9kbzogQ2hlY2sgYnJlYWtwb2ludHMgaGVyZVxyXG4gICAgICAgIHJldHVybiBhY3Rpb24uYWNjZXNzICYmICFhY3Rpb24uYWNjZXNzKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWN0aW9uQ291bnQoYWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKGFjdGlvbi5jb3VudCA9PT0gbnVsbCB8fCBhY3Rpb24uY291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPiA5OSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyEnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5jb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYWxjQWN0aW9ucyhhY3Rpb25zKSB7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgXy5lYWNoKGFjdGlvbnMsIGZ1bmN0aW9uIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKCFpc0hpZGRlbihhY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zKSA+IDAgfHxcclxuICAgICAgICAgICAgY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMpID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZWNvbmRhcnlEaXZpZGVyVmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zKSA+IDAgJiZcclxuICAgICAgICAgICAgY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMpID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbGlja0FjdGlvbihhY3Rpb24sICRtZE9wZW5NZW51KSB7XHJcbiAgICAgICAgaWYgKCFhY3Rpb24gfHwgYWN0aW9uLmRpdmlkZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5jbG9zZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUub3JpZ2luYXRvckV2ID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24ubWVudSkge1xyXG4gICAgICAgICAgICAkbWRPcGVuTWVudSgkc2NvcGUub3JpZ2luYXRvckV2KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5jbGljaykge1xyXG4gICAgICAgICAgICBhY3Rpb24uY2xpY2soKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ocmVmKSB7XHJcbiAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFjdGlvbi5ocmVmO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnVybCkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24udXJsKGFjdGlvbi51cmwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICgkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRzdGF0ZSA9ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLnN0YXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50KSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChhY3Rpb24uZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByYWlzZSBub3RpZmljYXRpb25cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBBY3Rpb25DbGlja2VkJywgYWN0aW9uLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBwcmltYXJ5QWN0aW9uc0RpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBsb2NhbEFjdGlvbnM6ICc9cGlwTG9jYWxBY3Rpb25zJyxcclxuICAgICAgICAgICAgZ2xvYmFsQWN0aW9uczogJz1waXBHbG9iYWxBY3Rpb25zJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhY3Rpb25zL1ByaW1hcnlBY3Rpb25zLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IFByaW1hcnlBY3Rpb25zQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEFjdGlvbnMnKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwUHJpbWFyeUFjdGlvbnMnLCBwcmltYXJ5QWN0aW9uc0RpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gU2Vjb25kYXJ5QWN0aW9uc0NvbnRyb2xsZXIoXHJcbiAgICAkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRyb290U2NvcGUsICR3aW5kb3csICRsb2NhdGlvbiwgJGluamVjdG9yLCBwaXBBY3Rpb25zLCAkdGltZW91dCkge1xyXG5cclxuICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zZWNvbmRhcnktYWN0aW9ucycpO1xyXG5cclxuICAgIGlmICgkc2NvcGUubG9jYWxBY3Rpb25zKSBcclxuICAgICAgICBwaXBBY3Rpb25zLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9ICRzY29wZS5sb2NhbEFjdGlvbnM7XHJcblxyXG4gICAgaWYgKCRzY29wZS5nbG9iYWxBY3Rpb25zKSBcclxuICAgICAgICBwaXBBY3Rpb25zLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSAkc2NvcGUuZ2xvYmFsQWN0aW9ucztcclxuXHJcbiAgICAkc2NvcGUuY29uZmlnID0gcGlwQWN0aW9ucy5jb25maWc7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJ3BpcEFjdGlvbnNDaGFuZ2VkJywgb25BY3Rpb25zQ2hhbmdlZCk7XHJcbiAgICAkcm9vdFNjb3BlLiRvbigncGlwU2Vjb25kYXJ5QWN0aW9uc09wZW4nLCBvbkFjdGlvbnNNZW51T3Blbik7XHJcblxyXG4gICAgJHNjb3BlLmlzSGlkZGVuID0gaXNIaWRkZW47XHJcbiAgICAkc2NvcGUuYWN0aW9uQ291bnQgPSBhY3Rpb25Db3VudDtcclxuICAgICRzY29wZS5zZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSA9IHNlY29uZGFyeUFjdGlvbnNWaXNpYmxlO1xyXG4gICAgJHNjb3BlLnNlY29uZGFyeURpdmlkZXJWaXNpYmxlID0gc2Vjb25kYXJ5RGl2aWRlclZpc2libGU7XHJcblxyXG4gICAgJHNjb3BlLmNsaWNrQWN0aW9uID0gY2xpY2tBY3Rpb247XHJcbiAgICAkc2NvcGUuZ2V0TWVudSA9IGZ1bmN0aW9uKG1lbnVGbikge1xyXG4gICAgICAgICRzY29wZS5tZW51Rm4gPSBtZW51Rm47XHJcbiAgICB9XHJcblxyXG4gICAgJHNjb3BlLm9wZW5NZW51ID0gb3Blbk1lbnU7XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgZnVuY3Rpb24gb25BY3Rpb25zTWVudU9wZW4oKSB7XHJcbiAgICAgICAgJHNjb3BlLm1lbnVGbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5NZW51KCRtZE9wZW5NZW51LCBldikge1xyXG4gICAgICAgICRzY29wZS5vcmlnaW5hdG9yRXYgPSBldjtcclxuICAgICAgICAkbWRPcGVuTWVudShldik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25BY3Rpb25zQ2hhbmdlZChldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgJHNjb3BlLmNvbmZpZyA9IGNvbmZpZztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNIaWRkZW4oYWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5hY2Nlc3MgJiYgIWFjdGlvbi5hY2Nlc3MoYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhY3Rpb25Db3VudChhY3Rpb24pIHtcclxuICAgICAgICBpZiAoYWN0aW9uLmNvdW50ID09PSBudWxsIHx8IGFjdGlvbi5jb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjdGlvbi5jb3VudCA+IDk5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnISc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWN0aW9uLmNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGNBY3Rpb25zKGFjdGlvbnMpIHtcclxuICAgICAgICB2YXIgY291bnQgPSAwO1xyXG5cclxuICAgICAgICBfLmVhY2goYWN0aW9ucywgZnVuY3Rpb24gKGFjdGlvbikge1xyXG4gICAgICAgICAgICBpZiAoIWlzSGlkZGVuKGFjdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlY29uZGFyeUFjdGlvbnNWaXNpYmxlKCkge1xyXG4gICAgICAgIHJldHVybiBjYWxjQWN0aW9ucygkc2NvcGUuY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMpID4gMCB8fFxyXG4gICAgICAgICAgICBjYWxjQWN0aW9ucygkc2NvcGUuY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucykgPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlY29uZGFyeURpdmlkZXJWaXNpYmxlKCkge1xyXG4gICAgICAgIHJldHVybiBjYWxjQWN0aW9ucygkc2NvcGUuY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMpID4gMCAmJlxyXG4gICAgICAgICAgICBjYWxjQWN0aW9ucygkc2NvcGUuY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucykgPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsaWNrQWN0aW9uKGFjdGlvbiwgJG1kT3Blbk1lbnUpIHtcclxuICAgICAgICBpZiAoIWFjdGlvbiB8fCBhY3Rpb24uZGl2aWRlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmNsb3NlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5vcmlnaW5hdG9yRXYgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5tZW51KSB7XHJcbiAgICAgICAgICAgICRtZE9wZW5NZW51KCRzY29wZS5vcmlnaW5hdG9yRXYpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmNsaWNrKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbi5jbGljaygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmhyZWYpIHtcclxuICAgICAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYWN0aW9uLmhyZWY7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24udXJsKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi51cmwoYWN0aW9uLnVybCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKCRpbmplY3Rvci5oYXMoJyRzdGF0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmdldCgnJHN0YXRlJyk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oYWN0aW9uLnN0YXRlLCBhY3Rpb24uc3RhdGVQYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uZXZlbnQpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KGFjdGlvbi5ldmVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHJhaXNlIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcEFjdGlvbkNsaWNrZWQnLCBhY3Rpb24ubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gc2Vjb25kYXJ5QWN0aW9uc0RpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBsb2NhbEFjdGlvbnM6ICc9cGlwTG9jYWxBY3Rpb25zJyxcclxuICAgICAgICAgICAgZ2xvYmFsQWN0aW9uczogJz1waXBHbG9iYWxBY3Rpb25zJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhY3Rpb25zL1NlY29uZGFyeUFjdGlvbnMuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogU2Vjb25kYXJ5QWN0aW9uc0NvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEFjdGlvbnMnKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwU2Vjb25kYXJ5QWN0aW9ucycsIHNlY29uZGFyeUFjdGlvbnNEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwQWN0aW9ucycsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVGVtcGxhdGVzJywgJ3VpLnJvdXRlciddKTtcclxuXHJcbmltcG9ydCAnLi9BY3Rpb25zU2VydmljZSc7XHJcbmltcG9ydCAnLi9QcmltYXJ5QWN0aW9uc0RpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9TZWNvbmRhcnlBY3Rpb25zRGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vQWN0aW9uc1NlcnZpY2UnOyIsIu+7vyd1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gQXBwQmFyRGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkcm9vdFNjb3BlLCBwaXBBcHBCYXIpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtYXBwYmFyJyk7XHJcbiAgICAkZWxlbWVudC5hZGRDbGFzcygnY29sb3ItcHJpbWFyeS1iZycpO1xyXG4gICAgXHJcbiAgICAvLyRzY29wZS4kZW1pdCgncGlwUmVzaXplV2luZG93Jyk7XHJcblxyXG4gICAgJHNjb3BlLmNvbmZpZyA9IHBpcEFwcEJhci5jb25maWc7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJ3BpcEFwcEJhckNoYW5nZWQnLCBvbkFwcEJhckNoYW5nZWQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uQXBwQmFyQ2hhbmdlZChldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgJHNjb3BlLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwYmFyRGlyZWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgc2NvcGU6IHRydWUsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHBiYXIvQXBwQmFyLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IEFwcEJhckRpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEFwcEJhcicpXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBBcHBiYXInLCBhcHBiYXJEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmZ1bmN0aW9uIEFwcEJhclBhcnREaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJHJvb3RTY29wZSwgcGlwQXBwQmFyKSB7XHJcbiAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgdmFyIHBhcnROYW1lID0gJycgKyAkYXR0cnMucGlwQXBwYmFyUGFydDtcclxuICAgIHZhciBwYXJ0VmFsdWUgPSBudWxsO1xyXG5cclxuICAgIC8vIEJyZWFrIHBhcnQgYXBhcnRcclxuICAgIHZhciBwb3MgPSBwYXJ0TmFtZS5pbmRleE9mKCc6Jyk7XHJcbiAgICBpZiAocG9zID4gMCkge1xyXG4gICAgICAgIHBhcnRWYWx1ZSA9IHBhcnROYW1lLnN1YnN0cihwb3MgKyAxKTtcclxuICAgICAgICBwYXJ0TmFtZSA9IHBhcnROYW1lLnN1YnN0cigwLCBwb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQXBwQmFyQ2hhbmdlZChudWxsLCBwaXBBcHBCYXIuY29uZmlnKTtcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbigncGlwQXBwQmFyQ2hhbmdlZCcsIG9uQXBwQmFyQ2hhbmdlZCk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25BcHBCYXJDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICB2YXIgcGFydHMgPSBjb25maWcucGFydHMgfHwge307XHJcbiAgICAgICAgdmFyIGN1cnJlbnRQYXJ0VmFsdWUgPSBwYXJ0c1twYXJ0TmFtZV07XHJcblxyXG4gICAgICAgIC8vIFNldCB2aXNpYmxlIHZhcmlhYmxlIHRvIHN3aXRjaCBuZ0lmXHJcbiAgICAgICAgdmFyIHZpc2libGUgPSAhIShwYXJ0VmFsdWUgPyBjdXJyZW50UGFydFZhbHVlID09IHBhcnRWYWx1ZSA6IGN1cnJlbnRQYXJ0VmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAodmlzaWJsZSAhPSAkc2NvcGUudmlzaWJsZSlcclxuICAgICAgICAgICAgJHNjb3BlLnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy8gRXhhbXBsZSBpcyB0YWtlbiBmcm9tIGhlcmU6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjAzMjU0ODAvYW5ndWxhcmpzLXdoYXRzLXRoZS1iZXN0LXByYWN0aWNlLXRvLWFkZC1uZ2lmLXRvLWEtZGlyZWN0aXZlLXByb2dyYW1tYXRpY2FsbHlcclxuZnVuY3Rpb24gYXBwYmFyUGFydERpcmVjdGl2ZShuZ0lmRGlyZWN0aXZlKSB7XHJcbiAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgdmFyIG5nSWYgPSBuZ0lmRGlyZWN0aXZlWzBdO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhbnNjbHVkZTogbmdJZi50cmFuc2NsdWRlLFxyXG4gICAgICAgIHByaW9yaXR5OiBuZ0lmLnByaW9yaXR5LFxyXG4gICAgICAgIHRlcm1pbmFsOiBuZ0lmLnRlcm1pbmFsLFxyXG4gICAgICAgIHJlc3RyaWN0OiBuZ0lmLnJlc3RyaWN0LFxyXG4gICAgICAgIHNjb3BlOiB0cnVlLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIGxpbmtGdW5jdGlvbigkc2NvcGU6IGFueSwgJGVsZW1lbnQsICRhdHRyczogYW55KSB7XHJcbiAgICAgICAgICAgIC8vIFZpc3VhbGl6ZSBiYXNlZCBvbiB2aXNpYmxlIHZhcmlhYmxlIGluIHNjb3BlXHJcbiAgICAgICAgICAgICRhdHRycy5uZ0lmID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS52aXNpYmxlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBuZ0lmLmxpbmsuYXBwbHkobmdJZiwgYXJndW1lbnRzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IEFwcEJhclBhcnREaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICB9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwQXBwQmFyJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcEFwcGJhclBhcnQnLCBhcHBiYXJQYXJ0RGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBBcHBCYXJDaGFuZ2VkRXZlbnQgPSAncGlwQXBwQmFyQ2hhbmdlZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwQmFyQ29uZmlnIHtcclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICBwYXJ0czogYW55O1xyXG4gICAgY2xhc3Nlczogc3RyaW5nW107XHJcbn0gXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBcHBCYXJTZXJ2aWNlIHtcclxuICAgIHJlYWRvbmx5IGNvbmZpZzogQXBwQmFyQ29uZmlnO1xyXG4gICAgcmVhZG9ubHkgY2xhc3Nlczogc3RyaW5nW107XHJcbiAgICBwYXJ0czogYW55O1xyXG5cclxuICAgIHNob3cocGFydHM/OiBhbnksIGNsYXNzZXM/OiBzdHJpbmdbXSwgc2hhZG93QnJlYWtwb2ludHM/OiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICBoaWRlKCk6IHZvaWQ7XHJcbiBcclxuICAgIGFkZFNoYWRvdyguLi5icmVha3BvaW50czogc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgcmVtb3ZlU2hhZG93KCk6IHZvaWQ7XHJcbiBcclxuICAgIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZDtcclxuIFxyXG4gICAgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBcHBCYXJQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgY29uZmlnOiBBcHBCYXJDb25maWc7XHJcbiAgICBwYXJ0czogYW55O1xyXG4gICAgY2xhc3Nlczogc3RyaW5nW107XHJcblxyXG4gICAgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG5cclxuICAgIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgQXBwQmFyU2VydmljZSBpbXBsZW1lbnRzIElBcHBCYXJTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQXBwQmFyQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBBcHBCYXJDb25maWcsICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogQXBwQmFyQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xhc3NlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFydHMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnBhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFydHModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHZhbHVlIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3cocGFydHM/OiBhbnksIGNsYXNzZXM/OiBzdHJpbmdbXSwgc2hhZG93QnJlYWtwb2ludHM/OiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHMgPSBwYXJ0cyB8fCB0aGlzLl9jb25maWcucGFydHMgfHwge307XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBjbGFzc2VzIHx8IHRoaXMuX2NvbmZpZy5jbGFzc2VzIHx8IFtdO1xyXG4gICAgICAgIGlmIChzaGFkb3dCcmVha3BvaW50cykgdGhpcy5zZXRTaGFkb3coc2hhZG93QnJlYWtwb2ludHMpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGlkZVNoYWRvdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IF8ucmVqZWN0KHRoaXMuX2NvbmZpZy5jbGFzc2VzLCAoYykgPT4gYy5zdGFydHNXaXRoKCdwaXAtc2hhZG93JykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2hhZG93KGJyZWFrcG9pbnRzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGlkZVNoYWRvdygpO1xyXG5cclxuICAgICAgICBpZiAoYnJlYWtwb2ludHMgIT0gbnVsbCAmJiBicmVha3BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaChicmVha3BvaW50cywgKGJwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKCdwaXAtc2hhZG93LScgKyBicCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goJ3BpcC1zaGFkb3cnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFNoYWRvdyguLi5icmVha3BvaW50czogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFNoYWRvdyhicmVha3BvaW50cyk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2hhZG93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGlkZVNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzW3BhcnRdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDb25maWdFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdChBcHBCYXJDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEFwcEJhclByb3ZpZGVyIGltcGxlbWVudHMgSUFwcEJhclByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQXBwQmFyQ29uZmlnID0ge1xyXG4gICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgcGFydHM6IHt9LFxyXG4gICAgICAgIGNsYXNzZXM6IFtdXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQXBwQmFyU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBcHBCYXJDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb25maWcodmFsdWU6IEFwcEJhckNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBBcHBCYXJDb25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcnRzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhcnRzKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHMgPSB2YWx1ZSB8fCB7fTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGFzc2VzKHZhbHVlOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0c1twYXJ0XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IEFwcEJhclNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9ICAgICBcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQXBwQmFyJylcclxuICAgIC5wcm92aWRlcigncGlwQXBwQmFyJywgQXBwQmFyUHJvdmlkZXIpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBcHBCYXInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9BcHBCYXJTZXJ2aWNlJztcclxuaW1wb3J0ICcuL0FwcEJhckRpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9BcHBCYXJQYXJ0RGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vQXBwQmFyU2VydmljZSc7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IFNpbXBsZUFjdGlvbkl0ZW0gfSBmcm9tICcuLi9hY3Rpb25zL0FjdGlvbnNTZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYkl0ZW0gfSBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYkNvbmZpZyB9IGZyb20gJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQnJlYWRjcnVtYlNlcnZpY2UgfSBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYkNoYW5nZWRFdmVudCB9IGZyb20gJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCcmVhZGNydW1iQmFja0V2ZW50IH0gZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IE9wZW5TZWFyY2hFdmVudCB9IGZyb20gJy4uL3NlYXJjaC9TZWFyY2hTZXJ2aWNlJ1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5jbGFzcyBCcmVhZGNydW1iQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfd2luZG93OiBuZy5JV2luZG93U2VydmljZTtcclxuICAgIHByaXZhdGUgX2xvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZTtcclxuICAgIHByaXZhdGUgb3JpZ2luYXRvckV2OiBFdmVudDtcclxuICAgIHByaXZhdGUgX21lZGlhOiBhbnk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBjb25maWc6IEJyZWFkY3J1bWJDb25maWc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRlbGVtZW50OiBhbnksIFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxyXG4gICAgICAgICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSxcclxuICAgICAgICAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgJGluamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2UsXHJcbiAgICAgICAgcGlwQnJlYWRjcnVtYjogSUJyZWFkY3J1bWJTZXJ2aWNlLFxyXG4gICAgICAgICRtZE1lZGlhOiBhbnlcclxuICAgICkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgICAgICB0aGlzLl93aW5kb3cgPSAkd2luZG93O1xyXG4gICAgICAgIHRoaXMuX2xvY2F0aW9uID0gJGxvY2F0aW9uO1xyXG4gICAgICAgIHRoaXMuX2luamVjdG9yID0gJGluamVjdG9yO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLWJyZWFkY3J1bWInKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBwaXBCcmVhZGNydW1iLmNvbmZpZztcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQnJlYWRjcnVtYkNoYW5nZWRFdmVudCwgKGV2ZW50LCBjb25maWcpID0+IHsgdGhpcy5vbkJyZWFkY3J1bWJDaGFuZ2VkKGV2ZW50LCBjb25maWcpOyB9KTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbihCcmVhZGNydW1iQmFja0V2ZW50LCAoKSA9PiB7IHRoaXMub25CcmVhZGNydW1iQmFjaygpOyB9KTtcclxuXHJcbiAgICAgICAgbGV0IHBpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuX21lZGlhID0gcGlwTWVkaWEgIT09IHVuZGVmaW5lZCA/IHBpcE1lZGlhIDogJG1kTWVkaWE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJyZWFkY3J1bWJDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnJlYWRjcnVtYkJhY2soKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5jb25maWcuaXRlbXM7XHJcbiAgICAgICAgLy8gR28gdG8gdGhlIGxhc3QgYnJlYWRjcnVtYiBpdGVtXHJcbiAgICAgICAgaWYgKF8uaXNBcnJheShpdGVtcykgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBsZXQgYmFja0NhbGxiYWNrID0gaXRlbS5jbGljaztcclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihiYWNrQ2FsbGJhY2spKSBcclxuICAgICAgICAgICAgICAgIGJhY2tDYWxsYmFjayhpdGVtKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICB0aGlzLl93aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xpY2soaXRlbTogQnJlYWRjcnVtYkl0ZW0pIHtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0uY2xpY2spKVxyXG4gICAgICAgICAgICBpdGVtLmNsaWNrKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuU2VhcmNoKCkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KE9wZW5TZWFyY2hFdmVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhY3Rpb25zVmlzaWJsZShpdGVtOiBCcmVhZGNydW1iSXRlbSk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICByZXR1cm4gYW5ndWxhci5pc0FycmF5KGl0ZW0uc3ViQWN0aW9ucykgJiYgaXRlbS5zdWJBY3Rpb25zLmxlbmd0aCA+IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT3Blbk1lbnUoJG1kT3Blbk1lbnUsIGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYXRvckV2ID0gZXZlbnQ7XHJcbiAgICAgICAgJG1kT3Blbk1lbnUodGhpcy5vcmlnaW5hdG9yRXYpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblN1YkFjdGlvbkNsaWNrKGFjdGlvbjogU2ltcGxlQWN0aW9uSXRlbSk6IHZvaWQgeyBcclxuICAgICAgICBpZiAoIWFjdGlvbiB8fCBhY3Rpb24uZGl2aWRlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmNsaWNrKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbi5jbGljayhhY3Rpb24pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmhyZWYpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhY3Rpb24uaHJlZjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi51cmwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb24udXJsKGFjdGlvbi51cmwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbmplY3Rvci5oYXMoJyRzdGF0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHN0YXRlID0gdGhpcy5faW5qZWN0b3IuZ2V0KCckc3RhdGUnKSBhcyBuZy51aS5JU3RhdGVTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oYWN0aW9uLnN0YXRlLCBhY3Rpb24uc3RhdGVQYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoYWN0aW9uLmV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5vcmlnaW5hdG9yRXYgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByYWlzZSBub3RpZmljYXRpb25cclxuICAgICAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcEFjdGlvbkNsaWNrZWQnLCBhY3Rpb24ubmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYXRvckV2ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBicmVhZGNydW1iRGlyZWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2JyZWFkY3J1bWIvQnJlYWRjcnVtYi5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBCcmVhZGNydW1iQ29udHJvbGxlcixcclxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwQnJlYWRjcnVtYicpXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBCcmVhZGNydW1iJywgYnJlYWRjcnVtYkRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IFNpbXBsZUFjdGlvbkl0ZW0gfSBmcm9tICcuLi9hY3Rpb25zL0FjdGlvbnNTZXJ2aWNlJztcclxuZXhwb3J0IGxldCBCcmVhZGNydW1iQ2hhbmdlZEV2ZW50ID0gXCJwaXBCcmVhZGNydW1iQ2hhbmdlZFwiO1xyXG5leHBvcnQgbGV0IEJyZWFkY3J1bWJCYWNrRXZlbnQgPSBcInBpcEJyZWFkY3J1bWJCYWNrXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkl0ZW0ge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGNsaWNrPzogKGl0ZW06IEJyZWFkY3J1bWJJdGVtKSA9PiB2b2lkOyAgIFxyXG4gICAgc3ViQWN0aW9ucz86IFNpbXBsZUFjdGlvbkl0ZW1bXTsgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iQ29uZmlnIHtcclxuICAgIHRleHQ6IHN0cmluZztcclxuICAgIGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdO1xyXG4gICAgY3JpdGVyaWE6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQnJlYWRjcnVtYlNlcnZpY2Uge1xyXG4gICAgY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnO1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgaXRlbXM6IEJyZWFkY3J1bWJJdGVtW107XHJcbiAgICBjcml0ZXJpYTogc3RyaW5nO1xyXG5cclxuICAgIHNob3dUZXh0KHRleHQ6IHN0cmluZywgY3JpdGVyaWE/OiBzdHJpbmcpO1xyXG4gICAgc2hvd0l0ZW1zKGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdLCBjcml0ZXJpYT86IHN0cmluZyk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJyZWFkY3J1bWJQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuY2xhc3MgQnJlYWRjcnVtYlNlcnZpY2UgaW1wbGVtZW50cyBJQnJlYWRjcnVtYlNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLml0ZW1zID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGl0ZW1zKCk6IEJyZWFkY3J1bWJJdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpdGVtcyh2YWx1ZTogQnJlYWRjcnVtYkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuaXRlbXMgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNyaXRlcmlhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jcml0ZXJpYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNyaXRlcmlhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93VGV4dCh0ZXh0OiBzdHJpbmcsIGNyaXRlcmlhPzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pdGVtcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gY3JpdGVyaWE7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0l0ZW1zKGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdLCBjcml0ZXJpYT86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pdGVtcyA9IGl0ZW1zIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSBjcml0ZXJpYTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoQnJlYWRjcnVtYkNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIEJyZWFkY3J1bWJQcm92aWRlciBpbXBsZW1lbnRzIElCcmVhZGNydW1iUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnID0geyBcclxuICAgICAgICB0ZXh0OiBudWxsLFxyXG4gICAgICAgIGl0ZW1zOiBudWxsLFxyXG4gICAgICAgIGNyaXRlcmlhOiBudWxsXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQnJlYWRjcnVtYlNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCB0ZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSk6IGFueSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IEJyZWFkY3J1bWJTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcEJyZWFkY3J1bWInKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBCcmVhZGNydW1iJywgQnJlYWRjcnVtYlByb3ZpZGVyKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcEJyZWFkY3J1bWInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcycsICdwaXBOYXYuVHJhbnNsYXRlJ10pO1xyXG5cclxuaW1wb3J0ICcuL0JyZWFkY3J1bWJEaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcblxyXG5cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgSU5hdkljb25TZXJ2aWNlIH0gZnJvbSAnLi4vaWNvbi9OYXZJY29uU2VydmljZSc7XHJcbmltcG9ydCB7IElOYXZNZW51U2VydmljZSB9IGZyb20gJy4uL21lbnUvTmF2TWVudVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJTmF2SGVhZGVyU2VydmljZSB9IGZyb20gJy4uL2hlYWRlci9OYXZIZWFkZXJTZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJyZWFkY3J1bWJTZXJ2aWNlIH0gZnJvbSAnLi4vYnJlYWRjcnVtYi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IElTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoL1NlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQWN0aW9uc1NlcnZpY2UgfSBmcm9tICcuLi9hY3Rpb25zL0FjdGlvbnNTZXJ2aWNlJztcclxuaW1wb3J0IHsgSUFwcEJhclNlcnZpY2UgfSBmcm9tICcuLi9hcHBiYXIvQXBwQmFyU2VydmljZSc7XHJcbmltcG9ydCB7IElTaWRlTmF2U2VydmljZSB9IGZyb20gJy4uL3NpZGVuYXYvU2lkZU5hdlNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2U2VydmljZSB7XHJcbiAgICBhcHBiYXI6IElBcHBCYXJTZXJ2aWNlO1xyXG4gICAgaWNvbjogSU5hdkljb25TZXJ2aWNlOyBcclxuICAgIGJyZWFkY3J1bWI6IElCcmVhZGNydW1iU2VydmljZTtcclxuICAgIGFjdGlvbnM6IElBY3Rpb25zU2VydmljZTtcclxuICAgIHNlYXJjaDogSVNlYXJjaFNlcnZpY2U7XHJcbiAgICBzaWRlbmF2OiBJU2lkZU5hdlNlcnZpY2U7XHJcbiAgICBoZWFkZXI6IElOYXZIZWFkZXJTZXJ2aWNlO1xyXG4gICAgbWVudTogSU5hdk1lbnVTZXJ2aWNlOyAgIFxyXG5cclxuICAgIHJlc2V0KCk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIE5hdlNlcnZpY2UgaW1wbGVtZW50cyBJTmF2U2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCRpbmplY3Rvcikge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdGhpcy5hcHBiYXIgPSAkaW5qZWN0b3IuaGFzKCdwaXBBcHBCYXInKSA/ICRpbmplY3Rvci5nZXQoJ3BpcEFwcEJhcicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLmljb24gPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZJY29uJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZJY29uJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuYnJlYWRjcnVtYiA9ICRpbmplY3Rvci5oYXMoJ3BpcEJyZWFkY3J1bWInKSA/ICRpbmplY3Rvci5nZXQoJ3BpcEJyZWFkY3J1bWInKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gJGluamVjdG9yLmhhcygncGlwQWN0aW9ucycpID8gJGluamVjdG9yLmdldCgncGlwQWN0aW9ucycpIDogbnVsbDtcclxuICAgICAgICB0aGlzLnNlYXJjaCA9ICRpbmplY3Rvci5oYXMoJ3BpcFNlYXJjaCcpID8gJGluamVjdG9yLmdldCgncGlwU2VhcmNoJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuc2lkZW5hdiA9ICRpbmplY3Rvci5oYXMoJ3BpcFNpZGVOYXYnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFNpZGVOYXYnKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZIZWFkZXInKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE5hdkhlYWRlcicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLm1lbnUgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZNZW51JykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZNZW51JykgOiBudWxsOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXBwYmFyOiBJQXBwQmFyU2VydmljZTtcclxuICAgIHB1YmxpYyBpY29uOiBJTmF2SWNvblNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYnJlYWRjcnVtYjogSUJyZWFkY3J1bWJTZXJ2aWNlO1xyXG4gICAgcHVibGljIGFjdGlvbnM6IElBY3Rpb25zU2VydmljZTtcclxuICAgIHB1YmxpYyBzZWFyY2g6IElTZWFyY2hTZXJ2aWNlO1xyXG4gICAgcHVibGljIHNpZGVuYXY6IElTaWRlTmF2U2VydmljZTsgICAgICAgIFxyXG4gICAgcHVibGljIGhlYWRlcjogSU5hdkhlYWRlclNlcnZpY2U7XHJcbiAgICBwdWJsaWMgbWVudTogSU5hdk1lbnVTZXJ2aWNlOyAgICBcclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKSB7XHJcbiAgICAgICAgLy8gUmVzZXQgYXBwYmFyXHJcbiAgICAgICAgaWYgKHRoaXMuYXBwYmFyKSBcclxuICAgICAgICAgICAgdGhpcy5hcHBiYXIuc2hvdygpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBpY29uXHJcbiAgICAgICAgaWYgKHRoaXMuaWNvbilcclxuICAgICAgICAgICAgdGhpcy5pY29uLnNob3dNZW51KCk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGJyZWFkY3J1bWJcclxuICAgICAgICBpZiAodGhpcy5icmVhZGNydW1iKVxyXG4gICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWIuc2hvd1RleHQobnVsbCk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGFjdGlvbnNcclxuICAgICAgICBpZiAodGhpcy5hY3Rpb25zKVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuc2hvdygpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBzZWFyY2hcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2gpXHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLnNldChudWxsKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2lkZW5hdilcclxuICAgICAgICAgICAgdGhpcy5zaWRlbmF2LnNob3coKTtcclxuICAgIH1cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2U2VydmljZScsIFtdKVxyXG4gICAgLnNlcnZpY2UoJ3BpcE5hdlNlcnZpY2UnLCBOYXZTZXJ2aWNlKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmZ1bmN0aW9uIHRyYW5zbGF0ZUZpbHRlcigkaW5qZWN0b3IpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICBsZXQgcGlwVHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gcGlwVHJhbnNsYXRlICA/IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoa2V5KSB8fCBrZXkgOiBrZXk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdi5UcmFuc2xhdGUnLCBbXSlcclxuICAgIC5maWx0ZXIoJ3RyYW5zbGF0ZScsIHRyYW5zbGF0ZUZpbHRlcik7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gRHJvcGRvd25EaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGluamVjdG9yLCAkcm9vdFNjb3BlLCAkbWRNZWRpYSwgJHRpbWVvdXQpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICBsZXQgcGlwVGhlbWUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUaGVtZScpID8gJGluamVjdG9yLmdldCgncGlwVGhlbWUnKSA6IG51bGw7IFxyXG4gICAgbGV0IHBpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsO1xyXG4gICAgbGV0IGN1cnJlbnRUaGVtZSA9ICdkZWZhdWx0JztcclxuXHJcbiAgICBpZiAocGlwVGhlbWUpXHJcbiAgICAgICAgY3VycmVudFRoZW1lID0gcGlwVGhlbWUudXNlKCk7XHJcbiAgICBlbHNlIGlmICgkcm9vdFNjb3BlLiR0aGVtZSlcclxuICAgICAgICBjdXJyZW50VGhlbWUgPSAkcm9vdFNjb3BlLiR0aGVtZTtcclxuXHJcbiAgICAkc2NvcGUuY2xhc3MgPSAoJGF0dHJzLmNsYXNzIHx8ICcnKSArICcgbWQtJyArIGN1cnJlbnRUaGVtZSArICctdGhlbWUnO1xyXG5cclxuICAgIC8vcGlwQXNzZXJ0LmlzQXJyYXkoJHNjb3BlLmFjdGlvbnMsICdwaXBEcm9wZG93bjogcGlwLWFjdGlvbnMgYXR0cmlidXRlIHNob3VsZCB0YWtlIGFuIGFycmF5LCBidXQgdGFrZSAnICsgdHlwZW9mICRzY29wZS5hY3Rpb25zKTtcclxuICAgICRzY29wZS5tZWRpYSA9IHBpcE1lZGlhICE9PSB1bmRlZmluZWQgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG4gICAgJHNjb3BlLmFjdGlvbnMgPSAoJHNjb3BlLmFjdGlvbnMgJiYgXy5pc0FycmF5KCRzY29wZS5hY3Rpb25zKSkgPyAkc2NvcGUuYWN0aW9ucyA6IFtdO1xyXG4gICAgJHNjb3BlLmFjdGl2ZUluZGV4ID0gJHNjb3BlLmFjdGl2ZUluZGV4IHx8IDA7XHJcblxyXG4gICAgJHNjb3BlLmRpc2FibGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkc2NvcGUubmdEaXNhYmxlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUubmdEaXNhYmxlZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5vblNlbGVjdCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICRzY29wZS5hY3RpdmVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGlmICgkc2NvcGUuc2VsZWN0KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3QoJHNjb3BlLmFjdGlvbnNbaW5kZXhdLCAkc2NvcGUuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRzY29wZS5waXBDaGFuZ2UpIHtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUucGlwQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCRzY29wZS5zaG93RHJvcGRvd24oKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNob3dEcm9wZG93bigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkcm9wZG93bkRpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBuZ0Rpc2FibGVkOiAnJicsXHJcbiAgICAgICAgICAgIGFjdGlvbnM6ICc9cGlwQWN0aW9ucycsXHJcbiAgICAgICAgICAgIHNob3dEcm9wZG93bjogJyZwaXBTaG93JyxcclxuICAgICAgICAgICAgYWN0aXZlSW5kZXg6ICc9cGlwQWN0aXZlSW5kZXgnLFxyXG4gICAgICAgICAgICBzZWxlY3Q6ICc9cGlwRHJvcGRvd25TZWxlY3QnLFxyXG4gICAgICAgICAgICBwaXBDaGFuZ2U6ICcmJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdkcm9wZG93bi9Ecm9wZG93bi5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBEcm9wZG93bkRpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcERyb3Bkb3duJywgWydwaXBOYXYuVGVtcGxhdGVzJ10pXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBEcm9wZG93bicsIGRyb3Bkb3duRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gTmF2SGVhZGVyRGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkcm9vdFNjb3BlLCAkdGltZW91dCwgcGlwTmF2SGVhZGVyKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgaW1hZ2UgPSBudWxsLFxyXG4gICAgICAgICAgICBpbWFnZUJsb2NrID0gJGVsZW1lbnQuZmluZCgnLnBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyJyksXHJcbiAgICAgICAgICAgICRpbWFnZSxcclxuICAgICAgICAgICAgY3VycmVudFN0YXRlLFxyXG4gICAgICAgICAgICBsb2FkZWREZWZhdWx0SW1hZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LWhlYWRlcicpO1xyXG5cclxuICAgICAgICAkc2NvcGUub25Vc2VyQ2xpY2sgPSBvblVzZXJDbGljaztcclxuICAgICAgICAkc2NvcGUub25JbWFnZUVycm9yID0gb25JbWFnZUVycm9yO1xyXG4gICAgICAgICRzY29wZS5vbkltYWdlTG9hZCA9IG9uSW1hZ2VMb2FkO1xyXG5cclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRpbWFnZSA9ICRlbGVtZW50LmZpbmQoJy5waXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci1pbWFnZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRpbWFnZVswXSkge1xyXG4gICAgICAgICAgICAgICAgJGltYWdlWzBdLm9ubG9hZCA9IG9uSW1hZ2VMb2FkO1xyXG4gICAgICAgICAgICAgICAgJGltYWdlWzBdLm9uZXJyb3IgPSBvbkltYWdlRXJyb3I7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2Uub25sb2FkID0gb25JbWFnZUxvYWQ7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2Uub25lcnJvciA9IG9uSW1hZ2VFcnJvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb25OYXZIZWFkZXJDaGFuZ2VkKG51bGwsIHBpcE5hdkhlYWRlci5jb25maWcpO1xyXG4gICAgICAgIH0sIDIwKTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcE5hdkhlYWRlckNoYW5nZWQnLCBvbk5hdkhlYWRlckNoYW5nZWQpO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGVDaGFuZ2VkJywgb25TdGF0ZUNoYW5nZWQpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRIZWFkZXIoKSB7XHJcbiAgICAgICAgICAgIGlmICghcGlwTmF2SGVhZGVyLmNvbmZpZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnRpdGxlID0gcGlwTmF2SGVhZGVyLmNvbmZpZy50aXRsZTtcclxuICAgICAgICAgICAgJHNjb3BlLnN1YnRpdGxlID0gcGlwTmF2SGVhZGVyLmNvbmZpZy5zdWJ0aXRsZTtcclxuICAgICAgICAgICAgJHNjb3BlLmltYWdlVXJsID0gcGlwTmF2SGVhZGVyLmNvbmZpZy5pbWFnZVVybDtcclxuICAgICAgICAgICAgJHNjb3BlLmltYWdlQ3NzID0gcGlwTmF2SGVhZGVyLmNvbmZpZy5pbWFnZUNzcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdoZW4gaW1hZ2UgaXMgbG9hZGVkIHJlc2l6ZS9yZXBvc2l0aW9uIGl0XHJcbiAgICAgICAgZnVuY3Rpb24gb25JbWFnZUxvYWQoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICQoJGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgIHNldEltYWdlTWFyZ2luQ1NTKGltYWdlQmxvY2ssIGltYWdlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkltYWdlRXJyb3IoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChsb2FkZWREZWZhdWx0SW1hZ2UpIHJldHVybjtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRJbWFnZShwaXBOYXZIZWFkZXIuY29uZmlnLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25TdGF0ZUNoYW5nZWQoZXZlbnQsIHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlLmlkID09ICd0b2dnbGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNob3dIZWFkZXIgPSBjdXJyZW50U3RhdGUgJiYgY3VycmVudFN0YXRlLmlkID09ICd0b2dnbGUnO1xyXG4gICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zaG93SGVhZGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldEltYWdlTWFyZ2luQ1NTKGNvbnRhaW5lciwgaW1hZ2UpIHtcclxuICAgICAgICAgICAgdmFyIGNzc1BhcmFtcyA9IHt9LFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyV2lkdGggPSBjb250YWluZXIud2lkdGggPyBjb250YWluZXIud2lkdGgoKSA6IGNvbnRhaW5lci5jbGllbnRXaWR0aCxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lci5oZWlnaHQgPyBjb250YWluZXIuaGVpZ2h0KCkgOiBjb250YWluZXIuY2xpZW50SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VXaWR0aCA9IGltYWdlWzBdLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aCxcclxuICAgICAgICAgICAgICAgIGltYWdlSGVpZ2h0ID0gaW1hZ2VbMF0ubmF0dXJhbEhlaWdodCB8fCBpbWFnZS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW4gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKChpbWFnZVdpZHRoIC8gY29udGFpbmVyV2lkdGgpID4gKGltYWdlSGVpZ2h0IC8gY29udGFpbmVySGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luID0gLSgoaW1hZ2VXaWR0aCAvIGltYWdlSGVpZ2h0ICogY29udGFpbmVySGVpZ2h0IC0gY29udGFpbmVyV2lkdGgpIC8gMik7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ21hcmdpbi1sZWZ0J10gPSAnJyArIG1hcmdpbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ2hlaWdodCddID0gJycgKyBjb250YWluZXJIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWyd3aWR0aCddID0gJycgKyBpbWFnZVdpZHRoICogY29udGFpbmVySGVpZ2h0IC8gaW1hZ2VIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydtYXJnaW4tdG9wJ10gPSAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hcmdpbiA9IC0oKGltYWdlSGVpZ2h0IC8gaW1hZ2VXaWR0aCAqIGNvbnRhaW5lcldpZHRoIC0gY29udGFpbmVySGVpZ2h0KSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydtYXJnaW4tdG9wJ10gPSAnJyArIG1hcmdpbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ2hlaWdodCddID0gJycgKyBpbWFnZUhlaWdodCAqIGNvbnRhaW5lcldpZHRoIC8gaW1hZ2VXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ3dpZHRoJ10gPSAnJyArIGNvbnRhaW5lcldpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snbWFyZ2luLWxlZnQnXSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbWFnZS5jc3MoY3NzUGFyYW1zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRJbWFnZShjb25maWcsIGxvYWRFcnJvcjogYm9vbGVhbikge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVybDogc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsb2FkRXJyb3IgJiYgISFjb25maWcuaW1hZ2VVcmwgJiYgIWxvYWRlZERlZmF1bHRJbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gY29uZmlnLmltYWdlVXJsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkRGVmYXVsdEltYWdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHVybCA9IGNvbmZpZy5kZWZhdWx0SW1hZ2VVcmw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh1cmwgJiYgJGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2UuYXR0cignc3JjJywgdXJsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGltYWdlQmxvY2suY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25OYXZIZWFkZXJDaGFuZ2VkKCRldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmICghY29uZmlnKSByZXR1cm47XHJcbiAgICAgICAgICAgIHNldEltYWdlKGNvbmZpZywgZmFsc2UpXHJcblxyXG4gICAgICAgICAgICAkc2NvcGUudGl0bGUgPSBjb25maWcudGl0bGU7XHJcbiAgICAgICAgICAgICRzY29wZS5zdWJ0aXRsZSA9IGNvbmZpZy5zdWJ0aXRsZTtcclxuICAgICAgICAgICAgJHNjb3BlLmltYWdlVXJsID0gY29uZmlnLmltYWdlVXJsO1xyXG4gICAgICAgICAgICAkc2NvcGUuaW1hZ2VDc3MgPSBjb25maWcuaW1hZ2VDc3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblVzZXJDbGljaygpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBOYXZVc2VyQ2xpY2tlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbmF2SGVhZGVyRGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaGVhZGVyL05hdkhlYWRlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogTmF2SGVhZGVyRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcE5hdkhlYWRlcicpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgncGlwTmF2SGVhZGVyJywgbmF2SGVhZGVyRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBOYXZIZWFkZXJDaGFuZ2VkRXZlbnQgPSAncGlwTmF2SGVhZGVyQ2hhbmdlZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2SGVhZGVyQ29uZmlnIHtcclxuICAgIC8vIEltYWdlIHVybFxyXG4gICAgcHVibGljIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICAvLyBJbWFnZSB1cmxcclxuICAgIHB1YmxpYyBkZWZhdWx0SW1hZ2VVcmw6IHN0cmluZztcclxuICAgIC8vIFRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIC8vIFN1YnRpdGxlXHJcbiAgICBwdWJsaWMgc3VidGl0bGU6IHN0cmluZztcclxuICAgIC8vIEhhbmRsZSBoZWFkZXIgY2xpY2sgZXZlbnRcclxuICAgIGNsaWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgLy8gRXZlbnQgbmFtZVxyXG4gICAgZXZlbnQ6IHN0cmluZ1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2SGVhZGVyU2VydmljZSB7XHJcbiAgICByZWFkb25seSBjb25maWc6IE5hdkhlYWRlckNvbmZpZztcclxuICAgIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgc3VidGl0bGU6IHN0cmluZztcclxuICAgIGNsaWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgZXZlbnQ6IHN0cmluZztcclxuXHJcbiAgICBzaG93KHRpdGxlOiBzdHJpbmcsIHN1YnRpdGxlOiBzdHJpbmcsIGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBoaWRlKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdkhlYWRlclByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBjb25maWc6IE5hdkhlYWRlckNvbmZpZztcclxuICAgIGRlZmF1bHRJbWFnZVVybDogc3RyaW5nO1xyXG4gICAgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgY2xpY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBldmVudDogc3RyaW5nO1xyXG5cclxuICAgIHNldCh0aXRsZTogc3RyaW5nLCBzdWJ0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgY2xlYXIoKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgTmF2SGVhZGVyU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdkhlYWRlckNvbmZpZztcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogTmF2SGVhZGVyQ29uZmlnLCAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkhlYWRlckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3VidGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnN1YnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc3VidGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbWFnZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpbWFnZVVybCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsaWNrKCk6ICgpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xpY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGljayh2YWx1ZTogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBldmVudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBldmVudCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyh0aXRsZTogc3RyaW5nLCBzdWJ0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSBzdWJ0aXRsZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBpbWFnZVVybDtcclxuXHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc1N0cmluZyhjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgdGhpcy5fcm9vdFNjb3BlLiRlbWl0KE5hdkhlYWRlckNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2SGVhZGVyUHJvdmlkZXIgaW1wbGVtZW50cyBJTmF2SGVhZGVyUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZIZWFkZXJDb25maWcgPSBuZXcgTmF2SGVhZGVyQ29uZmlnKCk7XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBOYXZIZWFkZXJTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkhlYWRlckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogTmF2SGVhZGVyQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsdWUgfHwgbmV3IE5hdkhlYWRlckNvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVmYXVsdEltYWdlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5kZWZhdWx0SW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkZWZhdWx0SW1hZ2VVcmwodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5kZWZhdWx0SW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN1YnRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN1YnRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGltYWdlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5pbWFnZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGltYWdlVXJsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsaWNrKCk6ICgpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xpY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGljayh2YWx1ZTogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZXZlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmV2ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZXZlbnQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQodGl0bGU6IHN0cmluZywgc3VidGl0bGU6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gc3VidGl0bGU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcblxyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcoY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IE5hdkhlYWRlclNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbiAgICAgXHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZIZWFkZXInKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBOYXZIZWFkZXInLCBOYXZIZWFkZXJQcm92aWRlcik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBOYXZIZWFkZXInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9OYXZIZWFkZXJTZXJ2aWNlJztcclxuaW1wb3J0ICcuL05hdkhlYWRlckRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL05hdkhlYWRlclNlcnZpY2UnOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gTmF2SWNvbkRpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCAkd2luZG93LCBwaXBOYXZJY29uKSB7XHJcbiAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLW5hdi1pY29uJyk7XHJcblxyXG4gICAgJHNjb3BlLmNvbmZpZyA9IHBpcE5hdkljb24uY29uZmlnO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCdwaXBOYXZJY29uQ2hhbmdlZCcsIG9uTmF2SWNvbkNoYW5nZWQpO1xyXG5cclxuICAgICRzY29wZS5vbk5hdkljb25DbGljayA9IG9uTmF2SWNvbkNsaWNrO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uTmF2SWNvbkNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICRzY29wZS5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25OYXZJY29uQ2xpY2soKSB7XHJcbiAgICAgICAgdmFyIGJyZWFkY3J1bWIsIGJhY2tDYWxsYmFjaztcclxuXHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbigkc2NvcGUuY29uZmlnLmNsaWNrKSkge1xyXG4gICAgICAgICAgICAvLyBFeGVjdXRlIG5hdiBpY29uIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICRzY29wZS5jb25maWcuY2xpY2soKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5jb25maWcuZXZlbnQpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCRzY29wZS5jb25maWcuZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLmNvbmZpZy50eXBlID09ICdtZW51Jykge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcE9wZW5TaWRlTmF2Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuY29uZmlnLnR5cGUgPT0gJ2JhY2snKSB7XHJcbiAgICAgICAgICAgICR3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBOYXZJY29uQ2xpY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5hdkljb25EaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgdHlwZTogJz1waXBUeXBlJyxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6ICc9cGlwSW1hZ2VVcmwnLFxyXG4gICAgICAgICAgICBpY29uOiAnPXBpcEljb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2ljb24vTmF2SWNvbi5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBOYXZJY29uRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdkljb24nKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwTmF2SWNvbicsIG5hdkljb25EaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IE5hdkljb25DaGFuZ2VkRXZlbnQgPSAncGlwTmF2SWNvbkNoYW5nZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdkljb25Db25maWcge1xyXG4gICAgLy8gVHlwZSBvZiBuYXYgaWNvbjogJ2JhY2snLCAnbWVudScsICdpbWFnZScgb3IgJ25vbmUnXHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgLy8gSW1hZ2UgdXJsXHJcbiAgICBwdWJsaWMgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIC8vIEljb24gbmFtZVxyXG4gICAgcHVibGljIGljb246IHN0cmluZztcclxuICAgIC8vIEhhbmRsZSBuYXYgaWNvbiBjbGljayBldmVudFxyXG4gICAgY2xpY2s6ICgpID0+IHZvaWQ7XHJcbiAgICAvLyBFdmVudCBuYW1lXHJcbiAgICBldmVudDogc3RyaW5nXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOYXZJY29uU2VydmljZSB7XHJcbiAgICByZWFkb25seSBjb25maWc6IE5hdkljb25Db25maWc7XHJcblxyXG4gICAgc2hvd01lbnUoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIHNob3dJY29uKGljb246IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIHNob3dCYWNrKGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzaG93SW1hZ2UoaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIGhpZGUoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2SWNvblByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBjb25maWc6IE5hdkljb25Db25maWc7XHJcblxyXG4gICAgc2V0TWVudShjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgc2V0SWNvbihpY29uOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzZXRCYWNrKGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzZXRJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgY2xlYXIoKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgTmF2SWNvblNlcnZpY2UgaW1wbGVtZW50cyBJTmF2SWNvblNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZJY29uQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBOYXZJY29uQ29uZmlnLCAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkljb25Db25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNTdHJpbmcoY2FsbGJhY2tPckV2ZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dNZW51KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ21lbnUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0ljb24oaWNvbjogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpY29uJztcclxuICAgICAgICB0aGlzLl9jb25maWcuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93QmFjayhjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdiYWNrJztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpbWFnZSc7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KG51bGwpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoTmF2SWNvbkNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2SWNvblByb3ZpZGVyIGltcGxlbWVudHMgSU5hdkljb25Qcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdkljb25Db25maWcgPSBuZXcgTmF2SWNvbkNvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogTmF2SWNvblNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogTmF2SWNvbkNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogTmF2SWNvbkNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBOYXZJY29uQ29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc1N0cmluZyhjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNZW51KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ21lbnUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEljb24oaWNvbjogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpY29uJztcclxuICAgICAgICB0aGlzLl9jb25maWcuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QmFjayhjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdiYWNrJztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpbWFnZSc7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgTmF2SWNvblNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbiAgICAgXHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZJY29uJylcclxuICAgIC5wcm92aWRlcigncGlwTmF2SWNvbicsIE5hdkljb25Qcm92aWRlcik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBOYXZJY29uJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9OYXZJY29uU2VydmljZSc7XHJcbmltcG9ydCAnLi9OYXZJY29uRGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vTmF2SWNvblNlcnZpY2UnO1xyXG4iLCLvu78ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJy4vZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlcic7XHJcbmltcG9ydCAnLi9sYW5ndWFnZS9MYW5ndWFnZVBpY2tlckRpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9kcm9wZG93bi9Ecm9wZG93bkRpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi90YWJzL1RhYnNEaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vYWN0aW9ucyc7XHJcbmltcG9ydCAnLi9hcHBiYXInO1xyXG5pbXBvcnQgJy4vc2VhcmNoJztcclxuaW1wb3J0ICcuL2JyZWFkY3J1bWInO1xyXG5pbXBvcnQgJy4vc2lkZW5hdic7XHJcbmltcG9ydCAnLi9oZWFkZXInO1xyXG5pbXBvcnQgJy4vbWVudSc7XHJcbmltcG9ydCAnLi9pY29uJztcclxuaW1wb3J0ICcuL2NvbW1vbi9OYXZTZXJ2aWNlJztcclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdicsIFtcclxuICAgICAgICAncGlwTmF2U2VydmljZScsXHJcbiAgICAgICAgJ3BpcERyb3Bkb3duJyxcclxuICAgICAgICAncGlwVGFicycsXHJcbiAgICAgICAgJ3BpcEFwcEJhcicsXHJcbiAgICAgICAgJ3BpcFNlYXJjaEJhcicsXHJcbiAgICAgICAgJ3BpcE5hdkljb24nLFxyXG4gICAgICAgICdwaXBCcmVhZGNydW1iJyxcclxuICAgICAgICAncGlwQWN0aW9ucycsIFxyXG4gICAgICAgICdwaXBTaWRlTmF2JyxcclxuICAgICAgICAncGlwTmF2TWVudScsXHJcbiAgICAgICAgJ3BpcE5hdkhlYWRlcidcclxuICAgIF0pO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9hY3Rpb25zJztcclxuZXhwb3J0ICogZnJvbSAnLi9hcHBiYXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2JyZWFkY3J1bWInO1xyXG5leHBvcnQgKiBmcm9tICcuL3NlYXJjaCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2lkZW5hdic7XHJcbmV4cG9ydCAqIGZyb20gJy4vaWNvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbWVudSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaGVhZGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb21tb24vTmF2U2VydmljZSc7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuY2xhc3MgTGFuZ3VhZ2VQaWNrZXJEaXJlY3RpdmVDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgX3RyYW5zbGF0ZTogYW55O1xyXG4gICAgcHJpdmF0ZSBfdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkc2NvcGU6IGFueSwgXHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueSwgXHJcbiAgICAgICAgJGF0dHJzOiBhbnksIFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCBcclxuICAgICAgICAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxyXG4gICAgICAgICRpbmplY3RvcjogYW55XHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSAkdGltZW91dDtcclxuICAgICAgICB0aGlzLl90cmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1sYW5ndWFnZS1waWNrZXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZXMgPSAkc2NvcGUubGFuZ3VhZ2VzO1xyXG5cclxuICAgICAgICAvLyBUb2RvOiBXaGVyZSBpcyB0aGlzIGV2ZW50IGNvbWluZyBmcm9tPyBXaHkgbm90IHRocm91Z2ggc2VydmljZSBvciBhdHRyaWJ1dGU/XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcFNldExhbmd1YWdlcycsIHRoaXMuc2V0TGFuZ3VhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGFuZ3VhZ2VzOiBzdHJpbmdbXSA9IFsnZW4nLCAncnUnXTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxhbmd1YWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFuc2xhdGUgPyB0aGlzLl90cmFuc2xhdGUubGFuZ3VhZ2UgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRMYW5ndWFnZXMobGFuZykge1xyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VzID0gbGFuZy5sZW5ndGggPiAwID8gbGFuZyA6IFsnZW4nLCAncnUnXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25MYW5ndWFnZUNsaWNrKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYW5zbGF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlLmxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gbGFuZ3VhZ2VQaWNrZXJEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbGFuZ3VhZ2VzOiAnPWxhbmd1YWdlcycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdsYW5ndWFnZS9MYW5ndWFnZVBpY2tlci5odG1sJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IExhbmd1YWdlUGlja2VyRGlyZWN0aXZlQ29udHJvbGxlcixcclxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcExhbmd1YWdlUGlja2VyJywgW1xyXG4gICAgICAgICduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcydcclxuICAgIF0pXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBMYW5ndWFnZVBpY2tlcicsIGxhbmd1YWdlUGlja2VyRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gTmF2TWVudURpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJHJvb3RTY29wZSwgJHdpbmRvdywgJGxvY2F0aW9uLCAkdGltZW91dCwgJGluamVjdG9yLCBwaXBTaWRlTmF2LCBwaXBOYXZNZW51KSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXIgYW5pbWF0aW9uRHVyYXRpb24gPSA0NTAsXHJcbiAgICAgICAgICAgIHBpcFNpZGVOYXZFbGVtZW50ID0gJGVsZW1lbnQucGFyZW50KCkucGFyZW50KCk7XHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LW1lbnUnKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlY3Rpb25zID0gJHNjb3BlLnNlY3Rpb25zIHx8IHBpcE5hdk1lbnUuc2VjdGlvbnM7XHJcbiAgICAgICAgLy8gJHNjb3BlLnNob3dUb29sdGlwID0gdHJ1ZTtcclxuICAgICAgICAvLyBwaXBOYXZNZW51LnNlY3Rpb25zID0gJHNjb3BlLnNlY3Rpb25zO1xyXG4gICAgICAgIHNldENvbGxhcHNpYmxlKCk7XHJcbiAgICAgICAgLy8gdG9kbyBzZXQgZnJvbSBzZXJ2aWNlc1xyXG4gICAgICAgICRzY29wZS5kZWZhdWx0SWNvbiA9IHBpcE5hdk1lbnUuZGVmYXVsdEljb247XHJcblxyXG4gICAgICAgIG9uU3RhdGVDaGFuZ2VkKG51bGwsIHBpcFNpZGVOYXYuc3RhdGUpO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwTmF2TWVudUNoYW5nZWQnLCBvbkNvbmZpZ0NoYW5nZWQpO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGVDaGFuZ2VkJywgb25TdGF0ZUNoYW5nZWQpO1xyXG5cclxuICAgICAgICAkc2NvcGUuaXRlbVZpc2libGUgPSBpc0hpZGRlbjtcclxuICAgICAgICAkc2NvcGUuY2xpY2tMaW5rID0gY2xpY2tMaW5rO1xyXG4gICAgICAgICRzY29wZS5pc1NlY3Rpb25FbXB0eSA9IGlzU2VjdGlvbkVtcHR5O1xyXG4gICAgICAgICRzY29wZS5vbkV4cGFuZCA9IG9uRXhwYW5kO1xyXG4gICAgICAgICRzY29wZS5pc0FjdGl2ZSA9IGlzQWN0aXZlO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldENvbGxhcHNpYmxlKCkge1xyXG4gICAgICAgICAgICB2YXIgY29sbGFwc2VkO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKCRzY29wZS5jb2xsYXBzZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQgPSAkc2NvcGUuY29sbGFwc2VkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQgPSAkc2NvcGUuY29sbGFwc2VkICE9PSBmYWxzZSAmJiAkc2NvcGUuY29sbGFwc2VkICE9PSAnZmFsc2UnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkV4cGFuZCgpIHtcclxuICAgICAgICAgICAgaWYgKCEkc2NvcGUuaXNDb2xsYXBzZWQpIHsgcmV0dXJuIH1cclxuXHJcbiAgICAgICAgICAgICRzY29wZS5leHBhbmRlZCA9ICEkc2NvcGUuZXhwYW5kZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2RWxlbWVudC5yZW1vdmVDbGFzcygncGlwLXN0aWNreS1uYXYtc21hbGwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXZFbGVtZW50LmFkZENsYXNzKCdwaXAtc3RpY2t5LW5hdi1zbWFsbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGVtaXQoJ3BpcE5hdkV4cGFuZGVkJywgJHNjb3BlLmV4cGFuZGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlzSGlkZGVuKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gJiYgaXRlbS5hY2Nlc3MgJiYgIWl0ZW0uYWNjZXNzKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaXNTZWN0aW9uRW1wdHkobGlua0NvbGxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgIF8uZWFjaChsaW5rQ29sbGVjdGlvbiwgZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNIaWRkZW4obGluaykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25Db25maWdDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5zZWN0aW9ucyA9IGNvbmZpZy5zZWN0aW9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU3RhdGVDaGFuZ2VkKGV2ZW50LCBzdGF0ZSkge1xyXG4gICAgICAgICAgICAvLyBTUz4gWW91IHNoYWxsIG5vdCBzZXQgaXQgaW50byB0aGUgbWVudSBzdGF0ZS4gSW5zdGVhZCBpdCBzaGFsbCBiZSBjb250cm9sbGVkIGJ5IHRoZSBzdGF0ZSBvZiBTaWRlbmF2XHJcbiAgICAgICAgICAgIC8vcGlwTmF2TWVudS5jb2xsYXBzZWQoc3RhdGUuZXhwYW5kKTtcclxuICAgICAgICAgICAgaWYgKCFzdGF0ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gc3RhdGUuZXhwYW5kO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXhwYW5kZWQgPSBzdGF0ZS5pc0V4cGFuZGVkO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXhwYW5kZWRCdXR0b24gPSBzdGF0ZS5leHBhbmRlZEJ1dHRvbjtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5zaWRlTmF2U3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlzQWN0aXZlKGxpbmspIHtcclxuICAgICAgICAgICAgaWYgKGxpbmsucGFyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSA/ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICgkc3RhdGUgIT0gbnVsbCAmJiAkc3RhdGUuaW5jbHVkZXMobGluay5wYXJlbnRTdGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5rLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmhhcygnJHN0YXRlJykgPyAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlICE9IG51bGwgJiYgJHN0YXRlLmluY2x1ZGVzKGxpbmsuc3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluay5ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluay5ocmVmLnNwbGl0KCc/JylbMF0gPT09ICR3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluay51cmwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLnVybC5zcGxpdCgvW1xccy8/XSsvKVsxXSA9PT0gJGxvY2F0aW9uLnVybCgpLnNwbGl0KC9bXFxzLz9dKy8pWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbGlja0xpbmsoZXZlbnQsIGxpbmspIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmsuaHJlZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdID09PSAkd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbmsuaHJlZjtcclxuICAgICAgICAgICAgICAgIH0sIGFuaW1hdGlvbkR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobGluay51cmwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLnVybC5zcGxpdCgvW1xccy8/XSsvKVsxXSA9PT0gJGxvY2F0aW9uLnVybCgpLnNwbGl0KC9bXFxzLz9dKy8pWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnVybChsaW5rLnVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCBhbmltYXRpb25EdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxpbmsuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSA/ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlICE9IG51bGwgJiYgJHN0YXRlLmN1cnJlbnQubmFtZSA9PT0gbGluay5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmdldCgnJHN0YXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhsaW5rLnN0YXRlLCBsaW5rLnN0YXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBhbmltYXRpb25EdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxpbmsuZXZlbnQpXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QobGluay5ldmVudCwgbGluayk7XHJcblxyXG4gICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5hdk1lbnVEaXJlY3RpdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZWN0aW9uczogJz89cGlwU2VjdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgLy8gY29sbGFwc2VkOiAnPXBpcENvbGxhcHNlZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbWVudS9OYXZNZW51Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBOYXZNZW51RGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcE5hdk1lbnUnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcE5hdk1lbnUnLCBuYXZNZW51RGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBOYXZNZW51Q2hhbmdlZEV2ZW50ID0gJ3BpcE5hdk1lbnVDaGFuZ2VkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZNZW51TGluayB7XHJcbiAgICAvLyBOYW1lIHRvIHJlZmVyIHRvIHRoZSBpdGVtXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgLy8gTGluayB2aXNpYmxlIHRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIC8vIFRvb2x0aXAgdGV4dFxyXG4gICAgcHVibGljIHRvb2x0aXBUZXh0Pzogc3RyaW5nOyAgICBcclxuICAgIC8vIEljb24gbmFtZSBmcm9tICRpY29uUHJvdmlkZXJcclxuICAgIHB1YmxpYyBpY29uPzogc3RyaW5nO1xyXG4gICAgLy8gQ291bnRlciBiYWRnZVxyXG4gICAgcHVibGljIGNvdW50PzogbnVtYmVyO1xyXG4gICAgLy8gY2xhc3MgZm9yIGJhZGdlIHN0eWxlXHJcbiAgICBwdWJsaWMgYmFkZ2VTdHlsZT86IHN0cmluZztcclxuICAgIC8vIEFjY2VzcyBmdW5jdGlvblxyXG4gICAgcHVibGljIGFjY2Vzcz86IChsaW5rOiBOYXZNZW51TGluaykgPT4gYm9vbGVhbjtcclxuICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcbiAgICBwdWJsaWMgaHJlZj86IHN0cmluZztcclxuICAgIC8vICRsb2NhdGlvbi51cmxcclxuICAgIHB1YmxpYyB1cmw/OiBzdHJpbmc7XHJcbiAgICAvLyAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zKVxyXG4gICAgcHVibGljIHN0YXRlPzogc3RyaW5nO1xyXG4gICAgLy8gUGFyYW1ldGVycyBmb3IgJHN0YXRlLmdvKHN0YXRlLCBzdGF0ZVBhcmFtcylcclxuICAgIHB1YmxpYyBzdGF0ZVBhcmFtcz86IGFueTtcclxuICAgIC8vIHBhcmVudCBzdGF0ZSBvciBwYXJlbnQgc3RhdGUgZm9yIHNlbGVjdGlvbiBpdGVtIFxyXG4gICAgcHVibGljIHBhcmVudFN0YXRlPzogc3RyaW5nO1xyXG4gICAgLy8gJHJvb3RTY29wZS5icm9hZGNhc3QoZXZlbnQpXHJcbiAgICBwdWJsaWMgZXZlbnQ/OiBzdHJpbmc7XHJcbiAgICAvLyBDbGljayBjYWxsYmFja1xyXG4gICAgcHVibGljIGNsaWNrPzogKGxpbms6IE5hdk1lbnVMaW5rKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2TWVudVNlY3Rpb24ge1xyXG4gICAgLy8gTmFtZSB0byByZWZlciB0byB0aGUgc2VjdGlvblxyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIC8vIFNlY3Rpb24gdmlzaWJsZSB0aXRsZVxyXG4gICAgcHVibGljIHRpdGxlPzogc3RyaW5nO1xyXG4gICAgLy8gVG9vbHRpcCB0ZXh0XHJcbiAgICBwdWJsaWMgdG9vbHRpcFRleHQ/OiBzdHJpbmc7ICAgICAgXHJcbiAgICAvLyBJY29uIG5hbWUgZnJvbSAkaWNvblByb3ZpZGVyXHJcbiAgICBwdWJsaWMgaWNvbj86IHN0cmluZztcclxuICAgIC8vIExpbmtzIHNob3duIGluIHRoZSBzZWN0aW9uXHJcbiAgICBwdWJsaWMgbGlua3M6IE5hdk1lbnVMaW5rW107XHJcbiAgICAvLyBBY2Nlc3MgZnVuY3Rpb25cclxuICAgIHB1YmxpYyBhY2Nlc3M/OiAoc2VjdGlvbjogTmF2TWVudVNlY3Rpb24pID0+IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZNZW51Q29uZmlnIHtcclxuICAgIHNlY3Rpb25zOiBOYXZNZW51U2VjdGlvbltdO1xyXG4gICAgZGVmYXVsdEljb246IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2TWVudVNlcnZpY2Uge1xyXG4gICAgc2VjdGlvbnM6IE5hdk1lbnVTZWN0aW9uW107XHJcbiAgICBkZWZhdWx0SWNvbjogc3RyaW5nO1xyXG4gICAgdXBkYXRlQ291bnQobGluazogc3RyaW5nLCBjb3VudDogbnVtYmVyKTogdm9pZDsgXHJcbiAgICB1cGRhdGVCYWRnZVN0eWxlKGxpbms6IHN0cmluZywgc3R5bGU6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBjbGVhckNvdW50cygpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOYXZNZW51UHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIHNlY3Rpb25zOiBOYXZNZW51U2VjdGlvbltdO1xyXG4gICAgZGVmYXVsdEljb246IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgTmF2TWVudVNlcnZpY2UgaW1wbGVtZW50cyBJTmF2TWVudVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZNZW51Q29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBOYXZNZW51Q29uZmlnLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY3Rpb25zKCk6IE5hdk1lbnVTZWN0aW9uW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2VjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWN0aW9ucyh2YWx1ZTogTmF2TWVudVNlY3Rpb25bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZWZhdWx0SWNvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZGVmYXVsdEljb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUJhZGdlU3R5bGUobGluazogc3RyaW5nLCBzdHlsZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGxpbmsgPT0gbnVsbCB8fCAhXy5pc1N0cmluZyhzdHlsZSkpIHJldHVybjtcclxuXHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5zZWN0aW9ucywgKHMpID0+IHtcclxuICAgICAgICAgICAgXy5lYWNoKHMubGlua3MsIChsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobC5uYW1lID09IGxpbmspXHJcbiAgICAgICAgICAgICAgICAgICAgbC5iYWRnZVN0eWxlID0gc3R5bGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGVmYXVsdEljb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5kZWZhdWx0SWNvbiA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUNvdW50KGxpbms6IHN0cmluZywgY291bnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChsaW5rID09IG51bGwgfHwgIV8uaXNOdW1iZXIoY291bnQpKSByZXR1cm47XHJcblxyXG4gICAgICAgIF8uZWFjaCh0aGlzLl9jb25maWcuc2VjdGlvbnMsIChzKSA9PiB7XHJcbiAgICAgICAgICAgIF8uZWFjaChzLmxpbmtzLCAobCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGwubmFtZSA9PSBsaW5rKVxyXG4gICAgICAgICAgICAgICAgICAgIGwuY291bnQgPSBjb3VudDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQ291bnRzKCk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaCh0aGlzLl9jb25maWcuc2VjdGlvbnMsIChzKSA9PiB7XHJcbiAgICAgICAgICAgIF8uZWFjaChzLmxpbmtzLCAobCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbC5jb3VudCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENoYW5nZUV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kZW1pdChOYXZNZW51Q2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBOYXZNZW51UHJvdmlkZXIgaW1wbGVtZW50cyBJTmF2TWVudVByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogTmF2TWVudUNvbmZpZyA9IHtcclxuICAgICAgICBzZWN0aW9uczogW10sXHJcbiAgICAgICAgZGVmYXVsdEljb246ICdpY29uczpmb2xkZXInXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogTmF2TWVudVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBzZWN0aW9ucygpOiBOYXZNZW51U2VjdGlvbltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VjdGlvbnModmFsdWU6IE5hdk1lbnVTZWN0aW9uW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2VjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlZmF1bHRJY29uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5kZWZhdWx0SWNvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRlZmF1bHRJY29uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZGVmYXVsdEljb24gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IE5hdk1lbnVTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdk1lbnUnKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBOYXZNZW51JywgTmF2TWVudVByb3ZpZGVyKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcE5hdk1lbnUnLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRyYW5zbGF0ZScsICdwaXBOYXYuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL05hdk1lbnVTZXJ2aWNlJztcclxuaW1wb3J0ICcuL05hdk1lbnVEaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9OYXZNZW51U2VydmljZSc7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoQ29uZmlnIH0gZnJvbSAnLi9TZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0IHsgSVNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL1NlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hDaGFuZ2VkRXZlbnQgfSBmcm9tICcuL1NlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hBY3RpdmF0ZWRFdmVudCB9IGZyb20gJy4vU2VhcmNoU2VydmljZSc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmNsYXNzIFNlYXJjaEJhckNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgY29uZmlnOiBTZWFyY2hDb25maWc7XHJcbiAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHNlYXJjaDogYW55ID0geyB0ZXh0OiAnJyB9O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoXHJcbiAgICAgICAgJGVsZW1lbnQsIFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCBcclxuICAgICAgICBwaXBTZWFyY2g6IElTZWFyY2hTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9ICRlbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXNlYXJjaC1iYXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBwaXBTZWFyY2guY29uZmlnO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbihTZWFyY2hDaGFuZ2VkRXZlbnQsIChldmVudCwgY29uZmlnKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLm9uU2VhcmNoQ2hhbmdlZChldmVudCwgY29uZmlnKTsgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0ZUNoYW5nZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2VsZW1lbnQuYWRkQ2xhc3MoJ3ctc3RyZXRjaCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LmFkZENsYXNzKCd3LXN0cmV0Y2gnKTtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5wYXJlbnQoKS5hZGRDbGFzcygncGlwLXNlYXJjaC1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5fZWxlbWVudC5yZW1vdmVDbGFzcygndy1zdHJldGNoJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQ2xhc3MoJ3ctc3RyZXRjaCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdwaXAtc2VhcmNoLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2VhcmNoQ2hhbmdlZChldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWFyY2gudGV4dCA9ICcnO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZvY3VzVGV4dCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSAkKCcucGlwLXNlYXJjaC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaC50ZXh0ID0gdGhpcy5jb25maWcuY3JpdGVyaWE7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZvY3VzVGV4dCgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGljaygpIHtcclxuICAgICAgICBsZXQgc2VhcmNoID0gdGhpcy5zZWFyY2gudGV4dDtcclxuXHJcbiAgICAgICAgdGhpcy5zZWFyY2gudGV4dCA9ICcnO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmNhbGxiYWNrKVxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jYWxsYmFjayhzZWFyY2gpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoU2VhcmNoQWN0aXZhdGVkRXZlbnQsIHNlYXJjaCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaC50ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLnRleHQgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5mb2N1c1RleHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uS2V5RG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgLy8gRW50ZXIgcHJlc3NlZFxyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMylcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XHJcbiAgICAgICAgLy8gRVNDIHByZXNzZWRcclxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNlYXJjaEJhckRpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICBzY29wZToge30sXHJcbiAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzZWFyY2gvU2VhcmNoQmFyLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IFNlYXJjaEJhckNvbnRyb2xsZXIsXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICB9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwU2VhcmNoQmFyJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcFNlYXJjaEJhcicsIHNlYXJjaEJhckRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBsZXQgT3BlblNlYXJjaEV2ZW50ID0gJ3BpcE9wZW5TZWFyY2gnO1xyXG5leHBvcnQgbGV0IENsb3NlU2VhcmNoRXZlbnQgPSAncGlwQ2xvc2VTZWFyY2gnO1xyXG5leHBvcnQgbGV0IFNlYXJjaENoYW5nZWRFdmVudCA9ICdwaXBTZWFyY2hDaGFuZ2VkJztcclxuZXhwb3J0IGxldCBTZWFyY2hBY3RpdmF0ZWRFdmVudCA9ICdwaXBTZWFyY2hBY3RpdmF0ZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbmZpZyB7XHJcbiAgICAvLyBTZWFyY2ggdmlzaWJsZVxyXG4gICAgcHVibGljIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICAvLyBTZWFyY2ggY3JpdGVyaWFcclxuICAgIHB1YmxpYyBjcml0ZXJpYTogc3RyaW5nO1xyXG4gICAgLy8gQ3VzdG9tIHNlYXJjaCBwYXJhbWV0ZXJzXHJcbiAgICBwdWJsaWMgcGFyYW1zOiBhbnk7XHJcbiAgICAvLyBIaXN0b3J5IGZvciBzZWFyY2ggYXV0b2NvbXBsZXRlXHJcbiAgICBwdWJsaWMgaGlzdG9yeTogc3RyaW5nW107XHJcbiAgICAvLyBDYWxsYmFjayBmb3Igc2VhcmNoXHJcbiAgICBjYWxsYmFjazogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNlYXJjaFNlcnZpY2Uge1xyXG4gICAgY29uZmlnOiBTZWFyY2hDb25maWc7XHJcbiAgICBjcml0ZXJpYTogc3RyaW5nO1xyXG4gICAgcGFyYW1zOiBhbnk7XHJcbiAgICBoaXN0b3J5OiBzdHJpbmdbXTtcclxuICAgIGNhbGxiYWNrOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZDtcclxuXHJcbiAgICBzZXQoY2FsbGJhY2s6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkLCBjcml0ZXJpYT86IHN0cmluZywgcGFyYW1zPzogYW55LCBoaXN0b3J5Pzogc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgY2xlYXIoKTogdm9pZDtcclxuICAgIG9wZW4oKTogdm9pZDtcclxuICAgIGNsb3NlKCk6IHZvaWQ7XHJcbiAgICB0b2dnbGUoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2VhcmNoUHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHsgICAgXHJcbn1cclxuXHJcblxyXG5jbGFzcyBTZWFyY2hTZXJ2aWNlIGltcGxlbWVudHMgSVNlYXJjaFNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBTZWFyY2hDb25maWc7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25maWc6IFNlYXJjaENvbmZpZyxcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKE9wZW5TZWFyY2hFdmVudCwgKCkgPT4geyB0aGlzLm9wZW4gfSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQ2xvc2VTZWFyY2hFdmVudCwgKCkgPT4geyB0aGlzLmNsb3NlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IFNlYXJjaENvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNyaXRlcmlhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jcml0ZXJpYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNyaXRlcmlhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFyYW1zKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJhbXModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJhbXMgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaGlzdG9yeSgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5oaXN0b3J5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaGlzdG9yeSh2YWx1ZTogc3RyaW5nW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuaGlzdG9yeSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjYWxsYmFjaygpOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNhbGxiYWNrKHZhbHVlOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jYWxsYmFjayA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldChjYWxsYmFjazogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQsIGNyaXRlcmlhPzogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGhpc3Rvcnk/OiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IGNyaXRlcmlhO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmhpc3RvcnkgPSBoaXN0b3J5O1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFyYW1zID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpOyAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSBmYWxzZTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgfSAgICAgICAgICAgICAgICBcclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gIXRoaXMuX2NvbmZpZy52aXNpYmxlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgfSAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICBwcml2YXRlIHNlbmRDb25maWdFdmVudCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdChTZWFyY2hDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNlYXJjaFByb3ZpZGVyIGltcGxlbWVudHMgSVNlYXJjaFByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogU2VhcmNoQ29uZmlnID0gbmV3IFNlYXJjaENvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogU2VhcmNoU2VydmljZSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH0gXHJcbn1cclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwU2VhcmNoQmFyJylcclxuICAgIC5wcm92aWRlcigncGlwU2VhcmNoJywgU2VhcmNoUHJvdmlkZXIpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwU2VhcmNoQmFyJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9TZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1NlYXJjaEJhckRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL1NlYXJjaFNlcnZpY2UnOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuICAgIGZ1bmN0aW9uIFNpZGVOYXZEaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRyb290U2NvcGUsICRpbmplY3RvciwgJG1kTWVkaWEsICR0aW1lb3V0LCBwaXBTaWRlTmF2KSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICAvLyB2YXIgcGlwTWVkaWEgPSAkbWRNZWRpYSwgXHJcbiAgICAgICAgdmFyIHBpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsLFxyXG4gICAgICAgICAgICBwaXBTeXN0ZW1JbmZvID0gJGluamVjdG9yLmhhcygncGlwU3lzdGVtSW5mbycpID8gJGluamVjdG9yLmdldCgncGlwU3lzdGVtSW5mbycpIDogbnVsbCxcclxuICAgICAgICAgICAgbWFpbkNvbnRhaW5lciA9ICcucGlwLW1haW4nLFxyXG4gICAgICAgICAgICBiaWdXaWR0aCA9IDMyMCwgLy8gZXhwYW5kZWQgc2lkZW5hdiB3aWR0aFxyXG4gICAgICAgICAgICBtaWRkbGVXaWR0aCA9IDI0MCxcclxuICAgICAgICAgICAgc21hbGxXaWR0aCA9IDcyLCAvLyBzaHJpbmsgc2lkZW5hdiB3aWR0aFxyXG4gICAgICAgICAgICBpc1Jlc2l6aW5nID0gZmFsc2UsXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uID0gNjAwLFxyXG4gICAgICAgICAgICBtZWRpYUJyZWFrcG9pbnRzO1xyXG5cclxuICAgICAgICBwaXBNZWRpYSA9IHBpcE1lZGlhICE9PSB1bmRlZmluZWQgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG5cclxuICAgICAgICAkc2NvcGUubmF2U3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZTogeyAvLyBtZWRpYShzbSwgeHMpXHJcbiAgICAgICAgICAgICAgICBpZDogJ3RvZ2dsZScsXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogJ3NpZGVuYXYtbW9iaWxlJywgLy8gY2hhbmdlIHNpemUsIGNvbG9yLCBzZWxlY3RlZD9cclxuICAgICAgICAgICAgICAgIHNob3dIZWFkZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpc0xvY2tlZE9wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kZWRCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dJY29uVG9vbHR5cGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNtYWxsOiB7IC8vIG1lZGlhKG1kKVxyXG4gICAgICAgICAgICAgICAgaWQ6ICdzbWFsbCcsXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogJ3BpcC1zdGlja3ktbmF2LXNtYWxsIHNpZGVuYXYtc21hbGxkZXNrdG9wJywgLy8gY2hhbmdlIHNpemUsIGNvbG9yLCBzZWxlY3RlZD9cclxuICAgICAgICAgICAgICAgIHNob3dIZWFkZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNMb2NrZWRPcGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kZWRCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBleHBhbmQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0ljb25Ub29sdHlwZTogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXJnZTogeyAvLyBtZWRpYShsZylcclxuICAgICAgICAgICAgICAgIGlkOiAnbGFyZ2UnLFxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6ICdzaWRlbmF2LXNtYWxsZGVza3RvcCcsIC8vIGNoYW5nZSBzaXplLCBjb2xvciwgc2VsZWN0ZWQ/XHJcbiAgICAgICAgICAgICAgICBzaG93SGVhZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGlzTG9ja2VkT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZGVkQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dJY29uVG9vbHR5cGU6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeGxhcmdlOiB7IC8vIG1lZGlhKHhsKVxyXG4gICAgICAgICAgICAgICAgaWQ6ICd4bGFyZ2UnLFxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6ICdzaWRlbmF2LWRlc2t0b3AnLCAvLyBjaGFuZ2Ugc2l6ZSwgY29sb3IsIHNlbGVjdGVkP1xyXG4gICAgICAgICAgICAgICAgc2hvd0hlYWRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0xvY2tlZE9wZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBleHBhbmRlZEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0V4cGFuZGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0ljb25Ub29sdHlwZTogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1lZGlhQnJlYWtwb2ludHMgPSBzZXRCcmVha3BvaW50cygpO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXN0aWNreS1zaWRlbmF2Jyk7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIFNhZmFyaVxyXG4gICAgICAgIGNoZWNrU2FmYXJpKCk7XHJcblxyXG4gICAgICAgIGlmIChwaXBTaWRlTmF2LmNvbmZpZyAmJiBwaXBTaWRlTmF2LmNvbmZpZy50eXBlICE9ICdwb3B1cCcpIHtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0U2lkZU5hdmVTdGF0ZSgpXHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgd2luZG93UmVzaXplID0gXy5kZWJvdW5jZShzZXRTaWRlTmF2ZVN0YXRlLCAxMCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBNYWluUmVzaXplZCcsIHdpbmRvd1Jlc2l6ZSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGUnLCBvblNpZGVOYXZTdGF0ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXNSZXNpemluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2lkZW5hdlN0YXRlID0gbnVsbDtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhdGUoJ3RvZ2dsZScpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBOYXZJY29uQ2xpY2tlZCcsIG9uTmF2SWNvbkNsaWNrKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdkNoYW5nZWQnLCBvblNpZGVOYXZDaGFuZ2VkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGVja1NhZmFyaSgpIHtcclxuICAgICAgICAgICAgaWYgKCFwaXBTeXN0ZW1JbmZvIHx8IHBpcFN5c3RlbUluZm8uYnJvd3Nlck5hbWUgIT0gJ3NhZmFyaScpIHtcclxuICAgICAgICAgICAgICAgIC8vICRlbGVtZW50LmFkZENsYXNzKCdzaWRlbmF2LWFuaW1hdGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBmdW5jdGlvbiBzZXRCcmVha3BvaW50cygpIHtcclxuICAgICAgICAgICAgaWYgKCFwaXBNZWRpYSB8fCAhYW5ndWxhci5pc09iamVjdChwaXBNZWRpYS5icmVha3BvaW50cykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHhzOiA2MzksIHNtOiA5NTksIG1kOiAxMDI0LCBsZzogMTkxOSB9O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpcE1lZGlhLmJyZWFrcG9pbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblNpZGVOYXZDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWcudmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbk5hdkljb25DbGljayhldmVudCkge1xyXG4gICAgICAgICAgICBwaXBTaWRlTmF2Lm9wZW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU2lkZU5hdlN0YXRlKGV2ZW50LCBzdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhzdGF0ZSkgJiYgJHNjb3BlLm5hdlN0YXRlW3N0YXRlXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFNpZGVOYXZlU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmIChwaXBTaWRlTmF2LmNvbmZpZyAmJiBwaXBTaWRlTmF2LmNvbmZpZy50eXBlID09ICdwb3B1cCcpIHsgcmV0dXJuIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc1Jlc2l6aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChzZXRTaWRlTmF2ZVN0YXRlLCBhbmltYXRpb25EdXJhdGlvbik7IC8vIGZvciBcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBtYWluV2lkdGggPSAkKG1haW5Db250YWluZXIpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICAgICAgbGV0IHNpZGVOYXZXaWR0aCA9ICQoJy5waXAtc3RpY2t5LXNpZGVuYXYnKS5pbm5lcldpZHRoKCk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50V2lkdGggPSBzaWRlTmF2V2lkdGggPyBzaWRlTmF2V2lkdGggKyAyIDogMDsgLy8gYWRkIGJvcmRlciB3aWR0aFxyXG5cclxuICAgICAgICAgICAgaWYgKG1haW5XaWR0aCArIGN1cnJlbnRXaWR0aCA8IG1lZGlhQnJlYWtwb2ludHMuc20gKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZSgndG9nZ2xlJywgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAobWFpbldpZHRoICsgY3VycmVudFdpZHRoIDwgbWVkaWFCcmVha3BvaW50cy5tZCApIHtcclxuICAgICAgICAgICAgICAgIHNldFN0YXRlKCdzbWFsbCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgIGlmIChtYWluV2lkdGggKyBjdXJyZW50V2lkdGggPCBtZWRpYUJyZWFrcG9pbnRzLmxnICkge1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhdGUoJ2xhcmdlJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgICAgICBzZXRTdGF0ZSgneGxhcmdlJyk7ICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFN0YXRlKHN0YXRlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGlzUmVzaXppbmcpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5zaWRlbmF2U3RhdGUgJiYgJHNjb3BlLnNpZGVuYXZTdGF0ZS5pZCA9PSBzdGF0ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlICE9ICd0b2dnbGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnc2lkZW5hdi1tb2JpbGUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlICE9ICdzbWFsbCcpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdwaXAtc3RpY2t5LW5hdi1zbWFsbCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgIT0gJ3hsYXJnZScpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdzaWRlbmF2LWRlc2t0b3AnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlICE9ICdsYXJnZScpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdzaWRlbmF2LXNtYWxsZGVza3RvcCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpc1Jlc2l6aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09ICd0b2dnbGUnKSB7XHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLnNpZGVuYXZTdGF0ZSA9ICRzY29wZS5uYXZTdGF0ZVtzdGF0ZV07XHJcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCRzY29wZS5zaWRlbmF2U3RhdGUuYWRkQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgcGlwU2lkZU5hdi5zdGF0ZSA9ICRzY29wZS5zaWRlbmF2U3RhdGU7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIHNpZGVOYXYgU3RhdGVcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0U2lkZU5hdmVTdGF0ZSgpXHJcbiAgICAgICAgICAgIH0sIDE1KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbXBsZXRlIGFuaW1hdGlvblxyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpc1Jlc2l6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIGFuaW1hdGlvbkR1cmF0aW9uKTsgLy9hbmltYXRpb25EdXJhdGlvblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2lkZU5hdkRpcmVjdGl2ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxyXG4gICAgICAgICAgICBzY29wZTogdHJ1ZSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzaWRlbmF2L1NpZGVOYXYuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFNpZGVOYXZEaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwU2lkZU5hdicpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgncGlwU2lkZW5hdicsIHNpZGVOYXZEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbiAgICBmdW5jdGlvbiBTaWRlTmF2UGFydERpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCBwaXBTaWRlTmF2KSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXIgcGFydE5hbWUgPSAnJyArICRhdHRycy5waXBTaWRlbmF2UGFydDtcclxuICAgICAgICB2YXIgcGFydFZhbHVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gQnJlYWsgcGFydCBhcGFydFxyXG4gICAgICAgIHZhciBwb3MgPSBwYXJ0TmFtZS5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgaWYgKHBvcyA+IDApIHtcclxuICAgICAgICAgICAgcGFydFZhbHVlID0gcGFydE5hbWUuc3Vic3RyKHBvcyArIDEpO1xyXG4gICAgICAgICAgICBwYXJ0TmFtZSA9IHBhcnROYW1lLnN1YnN0cigwLCBwb3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25TaWRlTmF2Q2hhbmdlZChudWxsLCBwaXBTaWRlTmF2LmNvbmZpZylcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdkNoYW5nZWQnLCBvblNpZGVOYXZDaGFuZ2VkKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25TaWRlTmF2Q2hhbmdlZChldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IGNvbmZpZy5wYXJ0cyB8fCB7fTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRQYXJ0VmFsdWUgPSBwYXJ0c1twYXJ0TmFtZV07XHJcbiAgICAgICAgICAgIHZhciB2aXNpYmxlID0gISEocGFydFZhbHVlID8gY3VycmVudFBhcnRWYWx1ZSA9PSBwYXJ0VmFsdWUgOiBjdXJyZW50UGFydFZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2aXNpYmxlICE9ICRzY29wZS52aXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2lkZW5hdlBhcnREaXJlY3RpdmUobmdJZkRpcmVjdGl2ZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdmFyIG5nSWYgPSBuZ0lmRGlyZWN0aXZlWzBdO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiBuZ0lmLnRyYW5zY2x1ZGUsXHJcbiAgICAgICAgICAgIHByaW9yaXR5OiBuZ0lmLnByaW9yaXR5LFxyXG4gICAgICAgICAgICB0ZXJtaW5hbDogbmdJZi50ZXJtaW5hbCxcclxuICAgICAgICAgICAgcmVzdHJpY3Q6IG5nSWYucmVzdHJpY3QsXHJcbiAgICAgICAgICAgIHNjb3BlOiB0cnVlLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiBsaW5rRnVuY3Rpb24oJHNjb3BlOiBhbnksICRlbGVtZW50LCAkYXR0cnMpIHtcclxuICAgICAgICAgICAgICAgICRhdHRycy5uZ0lmID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJHNjb3BlLnZpc2libGUgfTtcclxuICAgICAgICAgICAgICAgIG5nSWYubGluay5hcHBseShuZ0lmLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBTaWRlTmF2UGFydERpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBTaWRlTmF2JylcclxuICAgICAgICAuZGlyZWN0aXZlKCdwaXBTaWRlbmF2UGFydCcsIHNpZGVuYXZQYXJ0RGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBTaWRlTmF2Q2hhbmdlZEV2ZW50ID0gJ3BpcFNpZGVOYXZDaGFuZ2VkJztcclxuZXhwb3J0IGxldCBTaWRlTmF2U3RhdGVDaGFuZ2VkRXZlbnQgPSAncGlwU2lkZU5hdlN0YXRlQ2hhbmdlZCc7XHJcbmV4cG9ydCBsZXQgT3BlblNpZGVOYXZFdmVudCA9ICdwaXBPcGVuU2lkZU5hdic7XHJcbmV4cG9ydCBsZXQgQ2xvc2VTaWRlTmF2RXZlbnQgPSAncGlwQ2xvc2VTaWRlTmF2JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlTmF2Q29uZmlnIHtcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxuICAgIHN0YXRlOiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2aXNpYmxlOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaWRlTmF2U2VydmljZSB7XHJcbiAgICByZWFkb25seSBjb25maWc6IFNpZGVOYXZDb25maWc7XHJcbiAgICByZWFkb25seSBjbGFzc2VzOiBzdHJpbmdbXTtcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBzdGF0ZTogYW55O1xyXG5cclxuICAgIG9wZW4oKTogdm9pZDtcclxuICAgIGNsb3NlKCk6IHZvaWQ7XHJcbiAgICB0b2dnbGUoKTogdm9pZDtcclxuICAgIHNob3coKTogdm9pZDtcclxuICAgIGhpZGUoKTogdm9pZDtcclxuXHJcbiAgICBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcblxyXG4gICAgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaWRlTmF2UHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGNvbmZpZzogU2lkZU5hdkNvbmZpZztcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgY2xhc3Nlczogc3RyaW5nW107XHJcblxyXG4gICAgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG5cclxuICAgIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgU2lkZU5hdlNlcnZpY2UgaW1wbGVtZW50cyBJU2lkZU5hdlNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBTaWRlTmF2Q29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfc3RhdGU6IGFueTtcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9zaWRlbmF2OiBuZy5tYXRlcmlhbC5JU2lkZW5hdlNlcnZpY2U7XHJcblxyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IFNpZGVOYXZDb25maWcsICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCAkbWRTaWRlbmF2OiBuZy5tYXRlcmlhbC5JU2lkZW5hdlNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgICAgICB0aGlzLl9zaWRlbmF2ID0gJG1kU2lkZW5hdjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBTaWRlTmF2Q29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xhc3NlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFydHMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnBhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFydHModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHZhbHVlIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdGF0ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN0YXRlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KFNpZGVOYXZTdGF0ZUNoYW5nZWRFdmVudCwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuKCkge1xyXG4gICAgICAgIHRoaXMuX3NpZGVuYXYoJ3BpcC1zdGlja3ktc2lkZW5hdicpLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fc2lkZW5hdigncGlwLXN0aWNreS1zaWRlbmF2JykuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlKCkge1xyXG4gICAgICAgIHRoaXMuX3NpZGVuYXYoJ3BpcC1zdGlja3ktc2lkZW5hdicpLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY29uZmlnLnZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLnZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBfLnJlamVjdCh0aGlzLl9jb25maWcuY2xhc3NlcywgKGNjKSA9PiBjYyA9PSBjKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0c1twYXJ0XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRlbWl0KFNpZGVOYXZDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNpZGVOYXZQcm92aWRlciBpbXBsZW1lbnRzIElTaWRlTmF2UHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBTaWRlTmF2Q29uZmlnID0ge1xyXG4gICAgICAgIHBhcnRzOiB7fSxcclxuICAgICAgICBjbGFzc2VzOiBbXSxcclxuICAgICAgICB0eXBlOiAncG9wdXAnLFxyXG4gICAgICAgIHN0YXRlOiBudWxsLFxyXG4gICAgICAgIHZpc2libGU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogU2lkZU5hdlNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogU2lkZU5hdkNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogU2lkZU5hdkNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBTaWRlTmF2Q29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJ0cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gdmFsdWUgfHwge307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy52aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGFzc2VzKHZhbHVlOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzW3BhcnRdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsICRtZFNpZGVuYXY6IG5nLm1hdGVyaWFsLklTaWRlbmF2U2VydmljZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBTaWRlTmF2U2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUsICRtZFNpZGVuYXYpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaG9va1NpZGVOYXZFdmVudHMoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsIHBpcFNpZGVOYXY6IElTaWRlTmF2U2VydmljZSkge1xyXG4gICAgJHJvb3RTY29wZS4kb24oT3BlblNpZGVOYXZFdmVudCwgKCkgPT4geyBwaXBTaWRlTmF2Lm9wZW4oKTsgfSk7XHJcbiAgICAkcm9vdFNjb3BlLiRvbihDbG9zZVNpZGVOYXZFdmVudCwgKCkgPT4geyBwaXBTaWRlTmF2LmNsb3NlKCk7IH0pO1xyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBTaWRlTmF2JylcclxuICAgIC5wcm92aWRlcigncGlwU2lkZU5hdicsIFNpZGVOYXZQcm92aWRlcilcclxuICAgIC5ydW4oaG9va1NpZGVOYXZFdmVudHMpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwU2lkZU5hdicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL1NpZGVOYXZTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1NpZGVOYXZQYXJ0RGlyZWN0aXZlJztcclxuaW1wb3J0ICcuL1NpZGVOYXZEaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9TaWRlTmF2U2VydmljZSc7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gVGFic0RpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbWRNZWRpYSwgJGluamVjdG9yLCAkcm9vdFNjb3BlLCAkcGFyc2UsICR0aW1lb3V0KSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXIgcGlwVGhlbWUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUaGVtZScpID8gJGluamVjdG9yLmdldCgncGlwVGhlbWUnKSA6IG51bGwsXHJcbiAgICAgICAgICAgIHBpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsLFxyXG4gICAgICAgICAgICBwaXBUYWJJbmRleCA9ICRhdHRycy5waXBUYWJJbmRleCA/IHBhcnNlSW50KCRhdHRycy5waXBUYWJJbmRleCkgOiAwLFxyXG4gICAgICAgICAgICBjdXJyZW50VGhlbWUgPSAnZGVmYXVsdCc7XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZCA9IHt9O1xyXG5cclxuICAgICAgICBpZiAocGlwVGhlbWUpXHJcbiAgICAgICAgICAgIGN1cnJlbnRUaGVtZSA9IHBpcFRoZW1lLnVzZSgpO1xyXG4gICAgICAgIGVsc2UgaWYgKCRyb290U2NvcGUuJHRoZW1lKVxyXG4gICAgICAgICAgICBjdXJyZW50VGhlbWUgPSAkcm9vdFNjb3BlLiR0aGVtZTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNsYXNzID0gKCRhdHRycy5jbGFzcyB8fCAnJykgKyAnIG1kLScgKyBjdXJyZW50VGhlbWUgKyAnLXRoZW1lJztcclxuXHJcbiAgICAgICAgaWYgKHBpcFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnRhYnMubGVuZ3RoID4gMCAmJiAkc2NvcGUudGFic1swXS50aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZU9iamVjdHMoJHNjb3BlLnRhYnMsICd0aXRsZScsICduYW1lTG9jYWwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGVPYmplY3RzKCRzY29wZS50YWJzLCAnbmFtZScsICduYW1lTG9jYWwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBpcFRhYkluZGV4KSB7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhID0gJGVsZW1lbnQuZmluZCgnbWQtdGFicy1jYW52YXMnKTtcclxuICAgICAgICAgICAgICAgIGlmIChhICYmIGFbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoYVswXSkuYXR0cigndGFiaW5kZXgnLCBwaXBUYWJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhLm9uKCdmb2N1c291dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoYVswXSkuYXR0cigndGFiaW5kZXgnLCBwaXBUYWJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoYVswXSkuYXR0cigndGFiaW5kZXgnLCBwaXBUYWJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUubWVkaWEgPSBwaXBNZWRpYSAhPT0gdW5kZWZpbmVkID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuICAgICAgICAkc2NvcGUudGFicyA9ICgkc2NvcGUudGFicyAmJiBfLmlzQXJyYXkoJHNjb3BlLnRhYnMpKSA/ICRzY29wZS50YWJzIDogW107XHJcblxyXG4gICAgICAgIHZhciBwaXBUcmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuICAgICAgICBpZiAocGlwVHJhbnNsYXRlKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUudGFicy5sZW5ndGggPiAwICYmICRzY29wZS50YWJzWzBdLnRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRlT2JqZWN0cygkc2NvcGUudGFicywgJ3RpdGxlJywgJ25hbWVMb2NhbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZU9iamVjdHMoJHNjb3BlLnRhYnMsICduYW1lJywgJ25hbWVMb2NhbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXggPSAkc2NvcGUuYWN0aXZlSW5kZXggfHwgMDtcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlVGFiID0gJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgICAgICAkc2NvcGUudGFiRGlzYWJsZWQgPSB0YWJEaXNhYmxlZDtcclxuICAgICAgICAkc2NvcGUub25TZWxlY3QgPSBvblNlbGVjdDtcclxuICAgICAgICAkc2NvcGUuc2hvd1NoYWRvdyA9IHNob3dTaGFkb3c7XHJcbiAgICAgICAgJHNjb3BlLnNob3cgPSBzaG93O1xyXG5cclxuICAgICAgICBpZiAodG9Cb29sZWFuKCRhdHRycy5waXBSZWJpbmQpKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goJ2FjdGl2ZUluZGV4JywgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXggPSBuZXdWYWx1ZSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZVRhYiA9ICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRpc2FibGVkKCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLm5nRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUubmdEaXNhYmxlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdGFiRGlzYWJsZWQoaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgkc2NvcGUuZGlzYWJsZWQoKSAmJiAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXggIT0gaW5kZXgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU2VsZWN0KGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuZGlzYWJsZWQoKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAkc2NvcGUuYWN0aXZlSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZC5hY3RpdmVUYWIgPSAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0KCRzY29wZS50YWJzWyRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleF0sICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93U2hhZG93KCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNob3dUYWJzU2hhZG93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNob3dUYWJzU2hhZG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93KCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNob3dUYWJzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNob3dUYWJzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvQm9vbGVhbih2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT0gJzEnIHx8IHZhbHVlID09ICd0cnVlJztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiB0YWJzRGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBuZ0Rpc2FibGVkOiAnJicsXHJcbiAgICAgICAgICAgICAgICB0YWJzOiAnPXBpcFRhYnMnLFxyXG4gICAgICAgICAgICAgICAgc2hvd1RhYnM6ICcmcGlwU2hvd1RhYnMnLFxyXG4gICAgICAgICAgICAgICAgc2hvd1RhYnNTaGFkb3c6ICcmcGlwVGFic1NoYWRvdycsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleDogJz1waXBBY3RpdmVJbmRleCcsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Q6ICc9cGlwVGFic1NlbGVjdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0YWJzL1RhYnMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFRhYnNEaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJwaXBUYWJzXCIsIFsncGlwTmF2LlRlbXBsYXRlcyddKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcFRhYnMnLCB0YWJzRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2FjdGlvbnMvUHJpbWFyeUFjdGlvbnMuaHRtbCcsXG4gICAgJzxkaXYgcGlwLWZvY3VzZWQ9XCJcIiBwaXAtZm9jdXNlZC10YWJpbmRleD1cIjJcIj48bWQtbWVudSBtZC1wb3NpdGlvbi1tb2RlPVwidGFyZ2V0LXJpZ2h0IHRhcmdldFwiIGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9uc1wiIG5nLXJlcGVhdD1cImFjdGlvbiBpbiBjb25maWcucHJpbWFyeUxvY2FsQWN0aW9uc1wiPjxtZC1idXR0b24gY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zLWFjdGlvbiBtZC1pY29uLWJ1dHRvbiBwaXAtZm9jdXNhYmxlXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihhY3Rpb24sICRtZE9wZW5NZW51KTtcIiB0YWJpbmRleD1cIi0xXCIgbmctaGlkZT1cImlzSGlkZGVuKGFjdGlvbilcIiBhcmlhLWxhYmVsPVwie3thY3Rpb24udGl0bGUgfCB0cmFuc2xhdGV9fVwiPjxkaXYgY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zLWJhZGdlXCIgbmctc2hvdz1cImFjdGlvbi5jb3VudCA+IDBcIj57e2FjdGlvbkNvdW50KGFjdGlvbil9fTwvZGl2PjxtZC1pY29uIG1kLXN2Zy1pY29uPVwie3thY3Rpb24uaWNvbn19XCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCIzXCI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQtc3RhcnQ9XCJzdWJBY3Rpb24gaW4gYWN0aW9uLnN1YkFjdGlvbnNcIiBuZy1pZj1cIiFzdWJBY3Rpb24uZGl2aWRlclwiIG5nLWhpZGU9XCJpc0hpZGRlbihzdWJBY3Rpb24pXCI+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1mb2N1c2FibGVcIiBuZy1oaWRlPVwic3ViQWN0aW9uLmRpdmlkZXJcIiB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihzdWJBY3Rpb24pXCI+e3s6OnN1YkFjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cInN1YkFjdGlvbi5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT48bWQtbWVudSBtZC1wb3NpdGlvbi1tb2RlPVwidGFyZ2V0LXJpZ2h0IHRhcmdldFwiIGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9uc1wiIG5nLXJlcGVhdD1cImFjdGlvbiBpbiBjb25maWcucHJpbWFyeUdsb2JhbEFjdGlvbnNcIj48bWQtYnV0dG9uIGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9ucy1hY3Rpb24gbWQtaWNvbi1idXR0b24gcGlwLWZvY3VzYWJsZVwiIG5nLWNsaWNrPVwiY2xpY2tBY3Rpb24oYWN0aW9uLCAkbWRPcGVuTWVudSk7XCIgbmctaGlkZT1cImlzSGlkZGVuKGFjdGlvbilcIiB0YWJpbmRleD1cIi0xXCIgYXJpYS1sYWJlbD1cInt7YWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX1cIj48ZGl2IGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9ucy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLXNob3c9XCJhY3Rpb24uY291bnQgPiAwXCI+e3thY3Rpb25Db3VudChhY3Rpb24pfX08L2Rpdj48bWQtaWNvbiBtZC1zdmctaWNvbj1cInt7YWN0aW9uLmljb259fVwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj48bWQtbWVudS1jb250ZW50IHdpZHRoPVwiM1wiPjxtZC1tZW51LWl0ZW0gbmctcmVwZWF0LXN0YXJ0PVwic3ViQWN0aW9uIGluIGFjdGlvbi5zdWJBY3Rpb25zXCIgbmctaWY9XCIhc3ViQWN0aW9uLmRpdmlkZXJcIiBuZy1oaWRlPVwiaXNIaWRkZW4oc3ViQWN0aW9uKVwiPjxtZC1idXR0b24gY2xhc3M9XCJwaXAtZm9jdXNhYmxlXCIgbmctaGlkZT1cInN1YkFjdGlvbi5kaXZpZGVyXCIgdGFiaW5kZXg9XCItMVwiIG5nLWNsaWNrPVwiY2xpY2tBY3Rpb24oc3ViQWN0aW9uKVwiPnt7c3ViQWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwic3ViQWN0aW9uLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9ucy5odG1sJyxcbiAgICAnPG1kLW1lbnUgbmctaWY9XCJzZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSgpXCIgbWQtcG9zaXRpb24tbW9kZT1cInRhcmdldC1yaWdodCB0YXJnZXRcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiB0YWJpbmRleD1cIjNcIiBuZy1pbml0PVwiZ2V0TWVudSgkbWRPcGVuTWVudSlcIiBuZy1jbGljaz1cIm9uU2Vjb25kYXJ5QWN0aW9uQ2xpY2soKTsgb3Blbk1lbnUoJG1kT3Blbk1lbnUsICRldmVudCk7XCIgYXJpYS1sYWJlbD1cIm9wZW4gYWN0aW9uc1wiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6dmRvdHNcIj48L21kLWljb24+PC9tZC1idXR0b24+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cImFjdGlvbiBpbiBjb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zXCIgbmctaWY9XCIhYWN0aW9uLmRpdmlkZXJcIiBuZy1oaWRlPVwiaXNIaWRkZW4oYWN0aW9uKVwiPjxtZC1idXR0b24gbmctaGlkZT1cImFjdGlvbi5kaXZpZGVyXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihhY3Rpb24pXCI+e3s6OmFjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cImFjdGlvbi5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJzZWNvbmRhcnlEaXZpZGVyVmlzaWJsZSgpXCI+PC9tZC1tZW51LWRpdmlkZXI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQtc3RhcnQ9XCJhY3Rpb24gaW4gY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnNcIiBuZy1pZj1cIiFhY3Rpb24uZGl2aWRlclwiIG5nLWhpZGU9XCJpc0hpZGRlbihhY3Rpb24pXCI+PG1kLWJ1dHRvbiBuZy1oaWRlPVwiYWN0aW9uLmRpdmlkZXJcIiBuZy1jbGljaz1cImNsaWNrQWN0aW9uKGFjdGlvbilcIj57ezo6YWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwiYWN0aW9uLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2FwcGJhci9BcHBCYXIuaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIGNsYXNzPVwie3sgY29uZmlnLmNsYXNzZXMuam9pbihcXCcgXFwnKSB9fVwiIG5nLWlmPVwiY29uZmlnLnZpc2libGVcIiBuZy10cmFuc2NsdWRlPVwiXCI+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2JyZWFkY3J1bWIvQnJlYWRjcnVtYi5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cInBpcC1icmVhZGNydW1iLWJsb2NrXCI+PGRpdiBjbGFzcz1cInRleHQtb3ZlcmZsb3dcIiBuZy1pZj1cIiF2bS5fbWVkaWEoXFwneHNcXCcpXCI+PHNwYW4gbmctaWY9XCJ2bS5jb25maWcuY3JpdGVyaWFcIiBuZy1jbGljaz1cInZtLm9wZW5TZWFyY2goKVwiPnt7dm0uY29uZmlnLmNyaXRlcmlhfX0gLTwvc3Bhbj48c3BhbiBjbGFzcz1cInBpcC1icmVhZGNydW1iLWl0ZW0ge3skbGFzdCA/IFxcJ2JyZWFkY3J1bWItYWNjZW50XFwnIDogXFwnXFwnfX1cIiBuZy1pZj1cInZtLmNvbmZpZy5pdGVtcyAmJiB2bS5jb25maWcuaXRlbXMubGVuZ3RoID4gMFwiIG5nLXJlcGVhdC1zdGFydD1cIml0ZW0gaW4gdm0uY29uZmlnLml0ZW1zXCIgbmctY2xpY2s9XCJ2bS5vbkNsaWNrKGl0ZW0pXCIgbmctaW5pdD1cInN0ZXBXaWR0aCA9IDEwMC8odm0uY29uZmlnLml0ZW1zLmxlbmd0aCArIDEpXCIgbmctY2xhc3M9XCJ7XFwnY3Vyc29yLXBvaW50ZXJcXCc6ICEkbGFzdH1cIiBuZy1zdHlsZT1cIntcXCdtYXgtd2lkdGhcXCc6IHN0ZXBXaWR0aCArIFxcJyVcXCd9XCI+PHNwYW4gbmctaWY9XCIhJGxhc3QgfHwgIXZtLmFjdGlvbnNWaXNpYmxlKGl0ZW0pXCI+e3tpdGVtLnRpdGxlIHwgdHJhbnNsYXRlfX08L3NwYW4+PGRpdiBuZy1pZj1cIiRsYXN0ICYmIHZtLmFjdGlvbnNWaXNpYmxlKGl0ZW0pXCIgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTtcIj48bWQtbWVudSBtZC1vZmZzZXQ9XCIwIDQ0XCI+PHNwYW4gY2xhc3M9XCJsYXlvdXQtcm93IHBpcC1icmVhZGNydW1iLWl0ZW0tbWVudSBjdXJzb3ItcG9pbnRlciB7eyRsYXN0ID8gXFwnYnJlYWRjcnVtYi1hY2NlbnRcXCcgOiBcXCdcXCd9fVwiIG5nLWNsaWNrPVwidm0ub25PcGVuTWVudSgkbWRPcGVuTWVudSwgJGV2ZW50KVwiIG1kLWluay1yaXBwbGU9XCJcIiBhcmlhLWxhYmVsPVwib3BlbiBicmVhZGNydW1iIGFjdGlvbnNcIj57e2l0ZW0udGl0bGUgfCB0cmFuc2xhdGV9fTxtZC1pY29uIGNsYXNzPVwicGlwLXRyaWFuZ2xlLWRvd25cIiBtZC1zdmctaWNvbj1cImljb25zOnRyaWFuZ2xlLWRvd25cIj48L21kLWljb24+PC9zcGFuPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCI0XCI+PG1kLW1lbnUtaXRlbSBuZy1pZj1cIiFzdWJJdGVtLmRpdmlkZXJcIiBuZy1yZXBlYXQtc3RhcnQ9XCJzdWJJdGVtIGluIGl0ZW0uc3ViQWN0aW9uc1wiPjxtZC1idXR0b24gbmctY2xpY2s9XCJ2bS5vblN1YkFjdGlvbkNsaWNrKHN1Ykl0ZW0pXCIgbmctaWY9XCIhYWN0aW9uLmRpdmlkZXJcIiB0YWJpbmRleD1cIjRcIj48bWQtaWNvbiBtZC1tZW51LWFsaWduLXRhcmdldD1cIlwiIG5nLWlmPVwic3ViSXRlbS5pY29uXCIgbWQtc3ZnLWljb249XCJ7e3N1Ykl0ZW0uaWNvbn19XCI+PC9tZC1pY29uPjxzcGFuPnt7c3ViSXRlbS50aXRsZSB8IHRyYW5zbGF0ZX19PC9zcGFuPjwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJzdWJJdGVtLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PjwvZGl2Pjwvc3Bhbj48bWQtaWNvbiBuZy1yZXBlYXQtZW5kPVwiXCIgbWQtc3ZnLWljb249XCJpY29uczpjaGV2cm9uLXJpZ2h0XCIgbmctaGlkZT1cIiRsYXN0XCI+PC9tZC1pY29uPjxzcGFuIGNsYXNzPVwicGlwLXRpdGxlIGJyZWFkY3J1bWItYWNjZW50XCIgbmctaWY9XCJ2bS5jb25maWcudGV4dFwiPnt7dm0uY29uZmlnLnRleHQgfCB0cmFuc2xhdGV9fTwvc3Bhbj48L2Rpdj48ZGl2IHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiIG5nLWlmPVwidm0uX21lZGlhKFxcJ3hzXFwnKVwiPjxtZC1tZW51IG1kLW9mZnNldD1cIjAgNDRcIj48c3BhbiBjbGFzcz1cInBpcC1tb2JpbGUtYnJlYWRjcnVtYiBsYXlvdXQtcm93XCIgbmctY2xpY2s9XCJ2bS5jb25maWcuaXRlbXMgJiYgdm0uY29uZmlnLml0ZW1zLmxlbmd0aCA+IDEgPyAkbWRPcGVuTWVudSgpIDogcmV0dXJuXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0LW92ZXJmbG93XCI+PHNwYW4gbmctaWY9XCJ2bS5jb25maWcuY3JpdGVyaWFcIiBuZy1jbGljaz1cInZtLm9wZW5TZWFyY2goKVwiPnt7dm0uY29uZmlnLmNyaXRlcmlhfX0gLTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJicmVhZGNydW1iLWFjY2VudFwiIG5nLWlmPVwidm0uY29uZmlnLnRleHRcIj57e3ZtLmNvbmZpZy50ZXh0IHwgdHJhbnNsYXRlfX08L3NwYW4+IDxzcGFuIG5nLWlmPVwidm0uY29uZmlnLml0ZW1zICYmIHZtLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAwXCIgY2xhc3M9XCJicmVhZGNydW1iLWFjY2VudCB7eyh2bS5jb25maWcuaXRlbXMgJiYgdm0uY29uZmlnLml0ZW1zLmxlbmd0aCA+IDEpID8gXFwnY3Vyc29yLXBvaW50ZXJcXCcgOiBcXCdcXCcgfX1cIj57e3ZtLmNvbmZpZy5pdGVtc1t2bS5jb25maWcuaXRlbXMubGVuZ3RoIC0gMV0udGl0bGUgfCB0cmFuc2xhdGV9fTwvc3Bhbj48L3NwYW4+PG1kLWljb24gY2xhc3M9XCJwaXAtdHJpYW5nbGUtZG93biBjdXJzb3ItcG9pbnRlciBicmVhZGNydW1iLWFjY2VudFwiIG1kLXN2Zy1pY29uPVwiaWNvbnM6dHJpYW5nbGUtZG93blwiIG5nLWlmPVwidm0uY29uZmlnLml0ZW1zICYmIHZtLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAxXCI+PC9tZC1pY29uPjwvc3Bhbj48bWQtbWVudS1jb250ZW50IHdpZHRoPVwiNFwiPjxtZC1tZW51LWl0ZW0gbmctcmVwZWF0PVwiaXRlbSBpbiB2bS5jb25maWcuaXRlbXNcIiBuZy1pZj1cInZtLmNvbmZpZy5pdGVtcyAmJiB2bS5jb25maWcuaXRlbXMubGVuZ3RoID4gMFwiPjxtZC1idXR0b24gbmctY2xpY2s9XCJ2bS5vbkNsaWNrKGl0ZW0pXCIgdGFiaW5kZXg9XCI1XCI+PG1kLWljb24gbWQtbWVudS1hbGlnbi10YXJnZXQ9XCJcIiBuZy1pZj1cIml0ZW0uaWNvblwiIG1kLXN2Zy1pY29uPVwie3tpdGVtLmljb259fVwiPjwvbWQtaWNvbj48c3Bhbj57e2l0ZW0udGl0bGUgfCB0cmFuc2xhdGV9fTwvc3Bhbj48L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1pdGVtIG5nLWlmPVwidm0uY29uZmlnLnRleHRcIj48bWQtYnV0dG9uIHRhYmluZGV4PVwiNVwiPjxzcGFuIGNsYXNzPVwidGV4dC1ncmV5XCI+e3t2bS5jb25maWcudGV4dCB8IHRyYW5zbGF0ZX19PC9zcGFuPjwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT48L2Rpdj48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdkcm9wZG93bi9Ecm9wZG93bi5odG1sJyxcbiAgICAnPG1kLXRvb2xiYXIgY2xhc3M9XCJtZC1zdWJoZWFkIGNvbG9yLXByaW1hcnktYmcge3tjbGFzc319XCIgbmctaWY9XCJzaG93KClcIiBuZy1jbGFzcz1cIntcXCdtZC13aGl0ZWZyYW1lLTNkcFxcJzogbWVkaWEoXFwneHNcXCcpfVwiPjxkaXYgY2xhc3M9XCJwaXAtZGl2aWRlclwiPjwvZGl2PjxtZC1zZWxlY3QgbmctbW9kZWw9XCJzZWxlY3RlZEluZGV4XCIgdGFiaW5kZXg9XCIxNVwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWQoKVwiIG1kLWNvbnRhaW5lci1jbGFzcz1cInBpcC1mdWxsLXdpZHRoLWRyb3Bkb3duXCIgYXJpYS1sYWJlbD1cIkRST1BET1dOXCIgbWQtaW5rLXJpcHBsZT1cIlwiIG1kLW9uLWNsb3NlPVwib25TZWxlY3Qoc2VsZWN0ZWRJbmRleClcIj48bWQtb3B0aW9uIG5nLXJlcGVhdD1cImFjdGlvbiBpbiBhY3Rpb25zXCIgdmFsdWU9XCJ7eyA6OiRpbmRleCB9fVwiIG5nLXNlbGVjdGVkPVwiYWN0aXZlSW5kZXggPT0gJGluZGV4ID8gdHJ1ZSA6IGZhbHNlXCI+e3sgKGFjdGlvbi50aXRsZSB8fCBhY3Rpb24ubmFtZSB8fCBhY3Rpb24pIHwgdHJhbnNsYXRlIH19PC9tZC1vcHRpb24+PC9tZC1zZWxlY3Q+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2hlYWRlci9OYXZIZWFkZXIuaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIG5nLXNob3c9XCJzaG93SGVhZGVyXCIgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIj48ZGl2IGNsYXNzPVwiZmxleC1maXhlZCBwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlclwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIG5nLWNsaWNrPVwib25Vc2VyQ2xpY2soKVwiIGFyaWEtbGFiZWw9XCJjdXJyZW50IHVzZXJcIiB0YWJpbmRleD1cIi0xXCI+PGltZyBzcmM9XCJcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLWltYWdlXCIgbmctY2xhc3M9XCJpbWFnZUNzc1wiPjwvbWQtYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci10ZXh0XCI+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLXByaVwiIG5nLWNsaWNrPVwib25Vc2VyQ2xpY2soKVwiIHRhYmluZGV4PVwiLTFcIj57eyB0aXRsZSB8IHRyYW5zbGF0ZSB9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci1zZWNcIj57eyBzdWJ0aXRsZSB8IHRyYW5zbGF0ZSB9fTwvZGl2PjwvZGl2PjwvbWQtdG9vbGJhcj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdpY29uL05hdkljb24uaHRtbCcsXG4gICAgJzxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvbiBwaXAtbmF2LWljb25cIiBuZy1pZj1cImNvbmZpZy50eXBlICE9IFxcJ25vbmVcXCdcIiBuZy1jbGFzcz1cImNvbmZpZy5jbGFzc1wiIG5nLWNsaWNrPVwib25OYXZJY29uQ2xpY2soKVwiIHRhYmluZGV4PVwie3tjb25maWcudHlwZT09XFwnbWVudVxcJyB8fCBjb25maWcudHlwZT09XFwnYmFja1xcJyA/IDQgOiAtMSB9fVwiIGFyaWEtbGFiZWw9XCJtZW51XCI+PG1kLWljb24gbmctaWY9XCJjb25maWcudHlwZT09XFwnbWVudVxcJ1wiIG1kLXN2Zy1pY29uPVwiaWNvbnM6bWVudVwiPjwvbWQtaWNvbj48aW1nIG5nLXNyYz1cInt7Y29uZmlnLmltYWdlVXJsfX1cIiBuZy1pZj1cImNvbmZpZy50eXBlPT1cXCdpbWFnZVxcJ1wiIGhlaWdodD1cIjI0XCIgd2lkdGg9XCIyNFwiPjxtZC1pY29uIG5nLWlmPVwiY29uZmlnLnR5cGU9PVxcJ2JhY2tcXCdcIiBtZC1zdmctaWNvbj1cImljb25zOmFycm93LWxlZnRcIj48L21kLWljb24+PG1kLWljb24gbmctaWY9XCJjb25maWcudHlwZT09XFwnaWNvblxcJ1wiIG1kLXN2Zy1pY29uPVwie3tjb25maWcuaWNvbn19XCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyLmh0bWwnLFxuICAgICc8bWQtbWVudSBtZC1wb3NpdGlvbi1tb2RlPVwidGFyZ2V0LXJpZ2h0IHRhcmdldFwiPjxzcGFuIGNsYXNzPVwicGlwLWxhbmd1YWdlXCIgbmctY2xpY2s9XCIkbWRPcGVuTWVudSgpXCIgYXJpYS1sYWJlbD1cImxhbmd1YWdlIHNlbGVjdGlvblwiPnt7dm0ubGFuZ3VhZ2UgfCB0cmFuc2xhdGV9fTxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6dHJpYW5nbGUtZG93blwiPjwvbWQtaWNvbj48L3NwYW4+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdD1cImxhbmd1YWdlIGluIHZtLmxhbmd1YWdlc1wiPjxtZC1idXR0b24gbmctY2xpY2s9XCJ2bS5vbkxhbmd1YWdlQ2xpY2sobGFuZylcIiB0YWJpbmRleD1cIjdcIj57e2xhbmd1YWdlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWVudS9OYXZNZW51Lmh0bWwnLFxuICAgICc8ZGl2IG5nLWlmPVwic2VjdGlvbnMgJiYgc2VjdGlvbnMubGVuZ3RoXCI+PG1kLWxpc3QgY2xhc3M9XCJzaWRlbmF2LWxpc3RcIiBwaXAtZm9jdXNlZD1cIlwiIHBpcC1mb2N1c2VkLXRhYmluZGV4PVwiMTBcIiBwaXAtd2l0aC1oaWRkZW49XCJ0cnVlXCI+PG1kLWxpc3QtaXRlbSBjbGFzcz1cIm5vLWJvcmRlciBwaXAtc3RpY2t5LW5hdi1tZW51LWl0ZW0gcGlwLXN0aWNreS1uYXYtZXhwYW5kZWQtYnV0dG9uXCIgbmctY2xpY2s9XCJvbkV4cGFuZCgpXCIgbmctZGlzYWJsZWQ9XCIhaXNDb2xsYXBzZWRcIiB0YWJpbmRleD1cIi0xXCIgbmctaWY9XCJleHBhbmRlZEJ1dHRvblwiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y2hldnJvbi1sZWZ0XCIgbmctaWY9XCJleHBhbmRlZFwiIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uXCI+PC9tZC1pY29uPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y2hldnJvbi1yaWdodFwiIG5nLWlmPVwiIWV4cGFuZGVkXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb25cIj48L21kLWljb24+PC9tZC1saXN0LWl0ZW0+PG1kLWRpdmlkZXIgbmctc2hvdz1cImV4cGFuZGVkQnV0dG9uXCI+PC9tZC1kaXZpZGVyPjxkaXYgY2xhc3M9XCJwaXAtc2VjdGlvblwiIG5nLXJlcGVhdD1cInNlY3Rpb24gaW4gc2VjdGlvbnNcIiBuZy1oaWRlPVwic2VjdGlvbi5hY2Nlc3MgJiYgIXNlY3Rpb24uYWNjZXNzKHNlY3Rpb24pXCI+PG1kLWRpdmlkZXIgbmctc2hvdz1cIiRpbmRleCA+IDAgJiYgIWlzU2VjdGlvbkVtcHR5KHNlY3Rpb24ubGlua3MpXCI+PC9tZC1kaXZpZGVyPjxtZC1zdWJoZWFkZXIgbmctc2hvdz1cInNlY3Rpb24udGl0bGVcIiBzdHlsZT1cImhlaWdodDogNDhweDtcIj48c3BhbiBuZy1pZj1cImV4cGFuZGVkXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LXRpdGxlIHNlY3Rpb24tdGl0bGVcIj57ezo6c2VjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9zcGFuPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwie3tzZWN0aW9uLmljb259fVwiIG5nLWlmPVwiIXNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZCAmJiBzZWN0aW9uLmljb25cIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBzZWN0aW9uLWljb25cIj48L21kLWljb24+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e3NlY3Rpb24uaWNvbn19XCIgbmctaWY9XCJzaWRlTmF2U3RhdGUuc2hvd0ljb25Ub29sdHlwZSAmJiAhZXhwYW5kZWQgJiYgc2VjdGlvbi5pY29uXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgbWQtZGlyZWN0aW9uPVwicmlnaHRcIiBjbGFzcz1cInNpZGVuYXYtaWNvbi10b29sdGlwXCI+e3s6OnNlY3Rpb24udG9vbHRpcFRleHQgfHwgc2VjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48bWQtaWNvbiBtZC1zdmctaWNvbj1cInt7ZGVmYXVsdEljb259fVwiIG5nLWlmPVwiIXNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZCAmJiAhc2VjdGlvbi5pY29uXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCI+PC9tZC1pY29uPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwie3tkZWZhdWx0SWNvbn19XCIgbmctaWY9XCJzaWRlTmF2U3RhdGUuc2hvd0ljb25Ub29sdHlwZSAmJiAhZXhwYW5kZWQgJiYgIXNlY3Rpb24uaWNvblwiIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uIHNlY3Rpb24taWNvblwiPjxtZC10b29sdGlwIG1kLXZpc2libGU9XCJzaG93VG9vbHRpcFwiIGNsYXNzPVwibWQtc2Vjb25kYXJ5XCI+e3s6OnNlY3Rpb24udG9vbHRpcFRleHQgfHwgc2VjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48L21kLXN1YmhlYWRlcj48bWQtbGlzdC1pdGVtIGNsYXNzPVwibm8tYm9yZGVyIHBpcC1zdGlja3ktbmF2LW1lbnUtaXRlbSBwaXAtZm9jdXNhYmxlXCIgbmctcmVwZWF0PVwibGluayBpbiBzZWN0aW9uLmxpbmtzXCIgdGFiaW5kZXg9XCItMVwiIG5nLWNsYXNzPVwie1xcJ2FjdGl2ZVxcJzogaXNBY3RpdmUobGluayl9XCIgbmctaGlkZT1cImxpbmsuYWNjZXNzICYmICFsaW5rLmFjY2VzcyhsaW5rKVwiPjxtZC1idXR0b24gY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgcGlwLWJ1dHRvbi1ibG9ja1wiIHRhYmluZGV4PVwiLTFcIiBuZy1jbGljaz1cImNsaWNrTGluaygkZXZlbnQsIGxpbmspXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgbWQtZGlyZWN0aW9uPVwicmlnaHRcIj57ezo6bGluay50b29sdGlwVGV4dCB8IHRyYW5zbGF0ZX19PC9tZC10b29sdGlwPjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24tYmxvY2tcIj48bWQtaWNvbiBtZC1zdmctaWNvbj1cInt7bGluay5pY29ufX1cIiBuZy1pZj1cIiEoc2lkZU5hdlN0YXRlLnNob3dJY29uVG9vbHR5cGUgJiYgIWxpbmsudG9vbHRpcFRleHQgJiYgIWV4cGFuZGVkKVwiIG5nLWhpZGU9XCIhbGluay5pY29uXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gZmxleC1maXhlZFwiPjwvbWQtaWNvbj48bWQtaWNvbiBtZC1zdmctaWNvbj1cInt7bGluay5pY29ufX1cIiBuZy1oaWRlPVwiIWxpbmsuaWNvblwiIG5nLWlmPVwic2lkZU5hdlN0YXRlLnNob3dJY29uVG9vbHR5cGUgJiYgIWxpbmsudG9vbHRpcFRleHQgJiYgIWV4cGFuZGVkXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gZmxleC1maXhlZFwiPjxtZC10b29sdGlwIG1kLXZpc2libGU9XCJzaG93VG9vbHRpcFwiIG1kLWRpcmVjdGlvbj1cInJpZ2h0XCIgY2xhc3M9XCJzaWRlbmF2LWljb24tdG9vbHRpcFwiPnt7OjpsaW5rLnRvb2x0aXBUZXh0IHx8IGxpbmsudGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtdG9vbHRpcD48L21kLWljb24+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtdGl0bGVcIj57ezo6bGluay50aXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtYmFkZ2Uge3sgbGluay5iYWRnZVN0eWxlID8gbGluay5iYWRnZVN0eWxlIDogXFwnY29sb3ItYmFkZ2UtYmdcXCcgfX0gZmxleC1maXhlZFwiIG5nLWlmPVwibGluay5jb3VudCAmJiBsaW5rLmNvdW50IDwgMTAwXCI+e3tsaW5rLmNvdW50fX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1iYWRnZSB7eyBsaW5rLmJhZGdlU3R5bGUgPyBsaW5rLmJhZGdlU3R5bGUgOiBcXCdjb2xvci1iYWRnZS1iZ1xcJyB9fSBmbGV4LWZpeGVkXCIgbmctaWY9XCJsaW5rLmNvdW50ICYmIGxpbmsuY291bnQgPiA5OVwiPiE8L2Rpdj48L21kLWJ1dHRvbj48L21kLWxpc3QtaXRlbT48L2Rpdj48L21kLWxpc3Q+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnc2lkZW5hdi9TaWRlTmF2Lmh0bWwnLFxuICAgICc8bWQtc2lkZW5hdiBjbGFzcz1cIm1kLXNpZGVuYXYtbGVmdFwiIG1kLWlzLWxvY2tlZC1vcGVuPVwic2lkZW5hdlN0YXRlLmlzTG9ja2VkT3BlblwiIG1kLWNvbXBvbmVudC1pZD1cInBpcC1zdGlja3ktc2lkZW5hdlwiIG5nLXRyYW5zY2x1ZGU9XCJcIj48L21kLXNpZGVuYXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnc2VhcmNoL1NlYXJjaEJhci5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cIm1kLXRvb2xiYXItdG9vbHMgcGlwLXNlYXJjaC1jb250YWluZXJcIiBuZy1pZj1cInZtLmVuYWJsZWRcIj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBwaXAtc2VhcmNoLXNlbGVjdGVkXCI+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWljb24tYnV0dG9uXCIgdGFiaW5kZXg9XCI2XCIgYXJpYS1sYWJlbD1cInN0YXJ0IHNlYXJjaFwiIG5nLWNsaWNrPVwidm0ub25DbGljaygpXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpzZWFyY2hcIj48L21kLWljb24+PC9tZC1idXR0b24+PGlucHV0IGNsYXNzPVwicGlwLXNlYXJjaC10ZXh0IGZsZXhcIiB0eXBlPVwic2VhcmNoXCIgdGFiaW5kZXg9XCI2XCIgbmctbW9kZWw9XCJ2bS5zZWFyY2gudGV4dFwiIG5nLWtleWRvd249XCJ2bS5vbktleURvd24oJGV2ZW50KVwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIHRhYmluZGV4PVwiNlwiIGFyaWEtbGFiZWw9XCJjbGVhciBzZWFyY2hcIiBuZy1jbGljaz1cInZtLmNsZWFyKClcIj48bWQtaWNvbiBtZC1zdmctaWNvbj1cImljb25zOmNyb3NzLWNpcmNsZVwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwibWQtdG9vbGJhci10b29scyBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1lbmQtY2VudGVyIGZsZXgtZml4ZWQgbHAwIHJwMFwiIG5nLWlmPVwiIXZtLmVuYWJsZWRcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiB0YWJpbmRleD1cIjVcIiBhcmlhLWxhYmVsPVwic3RhcnQgc2VhcmNoXCIgbmctY2xpY2s9XCJ2bS5lbmFibGUoKVwiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6c2VhcmNoXCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RhYnMvVGFicy5odG1sJyxcbiAgICAnPG1kLXRvb2xiYXIgY2xhc3M9XCJwaXAtbmF2IHt7IGNsYXNzIH19XCIgbmctY2xhc3M9XCJ7XFwncGlwLXZpc2libGVcXCc6IHNob3coKSwgXFwncGlwLXNoYWRvd1xcJzogc2hvd1NoYWRvdygpfVwiPjxtZC10YWJzIG5nLWlmPVwibWVkaWEoXFwnZ3Qtc21cXCcpXCIgbWQtc2VsZWN0ZWQ9XCJzZWxlY3RlZC5hY3RpdmVUYWJcIiBuZy1jbGFzcz1cIntcXCdkaXNhYmxlZFxcJzogZGlzYWJsZWQoKX1cIiBtZC1zdHJldGNoLXRhYnM9XCJ0cnVlXCIgbWQtZHluYW1pYy1oZWlnaHQ9XCJ0cnVlXCI+PG1kLXRhYiBuZy1yZXBlYXQ9XCJ0YWIgaW4gdGFicyB0cmFjayBieSAkaW5kZXhcIiBuZy1kaXNhYmxlZD1cInRhYkRpc2FibGVkKCRpbmRleClcIiBtZC1vbi1zZWxlY3Q9XCJvblNlbGVjdCgkaW5kZXgpXCI+PG1kLXRhYi1sYWJlbD57ezo6dGFiLm5hbWVMb2NhbCB9fTxkaXYgY2xhc3M9XCJwaXAtdGFicy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLWlmPVwidGFiLm5ld0NvdW50cyA+IDAgJiYgdGFiLm5ld0NvdW50cyA8PSA5OVwiPnt7IHRhYi5uZXdDb3VudHMgfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXRhYnMtYmFkZ2UgY29sb3ItYmFkZ2UtYmdcIiBuZy1pZj1cInRhYi5uZXdDb3VudHMgPiA5OVwiPiE8L2Rpdj48L21kLXRhYi1sYWJlbD48L21kLXRhYj48L21kLXRhYnM+PGRpdiBjbGFzcz1cIm1kLXN1YmhlYWQgcGlwLXRhYnMtY29udGVudCBjb2xvci1wcmltYXJ5LWJnXCIgbmctaWY9XCIhbWVkaWEoXFwnZ3Qtc21cXCcpXCI+PGRpdiBjbGFzcz1cInBpcC1kaXZpZGVyIHBvc2l0aW9uLXRvcCBtMFwiPjwvZGl2PjxtZC1zZWxlY3QgbmctbW9kZWw9XCJzZWxlY3RlZC5hY3RpdmVJbmRleFwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWQoKVwiIG1kLWNvbnRhaW5lci1jbGFzcz1cInBpcC1mdWxsLXdpZHRoLWRyb3Bkb3duXCIgYXJpYS1sYWJlbD1cIlNFTEVDVFwiIG1kLWluay1yaXBwbGU9XCJcIiBtZC1vbi1jbG9zZT1cIm9uU2VsZWN0KHNlbGVjdGVkLmFjdGl2ZUluZGV4KVwiPjxtZC1vcHRpb24gbmctcmVwZWF0PVwidGFiIGluIHRhYnMgdHJhY2sgYnkgJGluZGV4XCIgY2xhc3M9XCJwaXAtdGFiLW9wdGlvblwiIHZhbHVlPVwie3sgOjokaW5kZXggfX1cIj57eyA6OnRhYi5uYW1lTG9jYWwgfX08ZGl2IGNsYXNzPVwicGlwLXRhYnMtYmFkZ2UgY29sb3ItYmFkZ2UtYmdcIiBuZy1pZj1cInRhYi5uZXdDb3VudHMgPiAwICYmIHRhYi5uZXdDb3VudHMgPD0gOTlcIj57eyB0YWIubmV3Q291bnRzIH19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC10YWJzLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctaWY9XCJ0YWIubmV3Q291bnRzID4gOTlcIj4hPC9kaXY+PC9tZC1vcHRpb24+PC9tZC1zZWxlY3Q+PC9kaXY+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGlwLXdlYnVpLW5hdi1odG1sLm1pbi5qcy5tYXBcbiJdfQ==