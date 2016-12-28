(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).nav = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
exports.ActionsChangedEvent = 'pipActionsChanged';
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
    SecondaryActionsController.$inject = ['$scope', '$element', '$attrs', '$rootScope', '$window', '$location', '$injector', 'pipActions'];
    function SecondaryActionsController($scope, $element, $attrs, $rootScope, $window, $location, $injector, pipActions) {
        $element.addClass('pip-secondary-actions');
        if ($scope.localActions)
            pipActions.secondaryLocalActions = $scope.localActions;
        if ($scope.globalActions)
            pipActions.secondaryGlobalActions = $scope.globalActions;
        $scope.config = pipActions.config;
        $rootScope.$on('pipActionsChanged', onActionsChanged);
        $scope.isHidden = isHidden;
        $scope.actionCount = actionCount;
        $scope.secondaryActionsVisible = secondaryActionsVisible;
        $scope.secondaryDividerVisible = secondaryDividerVisible;
        $scope.clickAction = clickAction;
        $scope.openMenu = openMenu;
        return;
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
        BreadcrumbController.$inject = ['$element', '$rootScope', '$window', '$state', '$location', '$injector', 'pipBreadcrumb'];
        function BreadcrumbController($element, $rootScope, $window, $state, $location, $injector, pipBreadcrumb) {
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
                console.log('element', this._element.parent());
                this._element.addClass('w-stretch');
                this._element.parent().addClass('pip-search-active');
            }
            else {
                console.log('element', this._element.parent());
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
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null, mainContainer = '.pip-main', bigWidth = 320, middleWidth = 240, smallWidth = 72, isResizing = false, animationDuration = 600, mediaBreakpoints;
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
        this.id = 'pip-sticky-sidenav';
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
        this._sidenav(this.id).open();
    };
    SideNavService.prototype.close = function () {
        this._sidenav(this.id).close();
    };
    SideNavService.prototype.toggle = function () {
        this._sidenav(this.id).toggle();
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
    TabsDirectiveController.$inject = ['$scope', '$element', '$attrs', '$mdMedia', '$injector', '$rootScope', '$parse'];
    function TabsDirectiveController($scope, $element, $attrs, $mdMedia, $injector, $rootScope, $parse) {
        "ngInject";
        var pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null, pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null, currentTheme = 'default';
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
    '<md-menu md-position-mode="target-right target" class="pip-primary-actions" ng-repeat="action in config.primaryLocalActions"><md-button class="pip-primary-actions-action md-icon-button" ng-click="clickAction(action, $mdOpenMenu);" ng-hide="isHidden(action)" aria-label="{{action.title | translate}}"><div class="pip-primary-actions-badge" ng-show="action.count > 0">{{actionCount(action)}}</div><md-icon md-svg-icon="{{action.icon}}"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="subAction in action.subActions" ng-if="!subAction.divider" ng-hide="isHidden(subAction)"><md-button ng-hide="subAction.divider" ng-click="clickAction(subAction)">{{::subAction.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="subAction.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu><md-menu md-position-mode="target-right target" class="pip-primary-actions" ng-repeat="action in config.primaryGlobalActions"><md-button class="pip-primary-actions-action md-icon-button" ng-click="clickAction(action, $mdOpenMenu);" ng-hide="isHidden(action)" aria-label="{{action.title | translate}}"><div class="pip-primary-actions-badge color-badge-bg" ng-show="action.count > 0">{{actionCount(action)}}</div><md-icon md-svg-icon="{{action.icon}}"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="subAction in action.subActions" ng-if="!subAction.divider" ng-hide="isHidden(subAction)"><md-button ng-hide="subAction.divider" ng-click="clickAction(subAction)">{{subAction.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="subAction.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu>');
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
    '<md-menu ng-if="secondaryActionsVisible()" md-position-mode="target-right target"><md-button class="md-icon-button" ng-click="onSecondaryActionClick(); openMenu($mdOpenMenu, $event);" aria-label="open actions"><md-icon md-svg-icon="icons:vdots"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="action in config.secondaryLocalActions" ng-if="!action.divider" ng-hide="isHidden(action)"><md-button ng-hide="action.divider" ng-click="clickAction(action)">{{::action.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="action.divider" ng-repeat-end=""></md-menu-divider><md-menu-divider ng-if="secondaryDividerVisible()"></md-menu-divider><md-menu-item ng-repeat-start="action in config.secondaryGlobalActions" ng-if="!action.divider" ng-hide="isHidden(action)"><md-button ng-hide="action.divider" ng-click="clickAction(action)">{{::action.title | translate}}</md-button></md-menu-item><md-menu-divider ng-if="action.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu>');
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
    '<div style="height: 23px;"><div class="hide-xs text-overflow"><span ng-if="vm.config.criteria" ng-click="vm.openSearch()">{{vm.config.criteria}} -</span><span class="pip-breadcrumb-item {{$last ? \'breadcrumb-accent\' : \'\'}}" ng-if="vm.config.items && vm.config.items.length > 0" ng-repeat-start="item in vm.config.items" ng-click="vm.onClick(item)" ng-init="stepWidth = 100/(vm.config.items.length + 1)" ng-class="{\'cursor-pointer\': !$last}" ng-style="{\'max-width\': stepWidth + \'%\'}"><span class="hide-xs" ng-if="!$last || !vm.actionsVisible(item)">{{item.title | translate}}</span><div ng-if="$last && vm.actionsVisible(item)" style="display: inline-block; position: relative;"><md-menu class="hide-xs" md-offset="0 44"><span class="layout-row pip-breadcrumb-item-menu cursor-pointer {{$last ? \'breadcrumb-accent\' : \'\'}}" ng-click="vm.onOpenMenu($mdOpenMenu, $event)" md-ink-ripple="" aria-label="open breadcrumb actions">{{item.title | translate}}<md-icon class="pip-triangle-down" md-svg-icon="icons:triangle-down"></md-icon></span><md-menu-content width="4"><md-menu-item ng-if="!subItem.divider" ng-repeat-start="subItem in item.subActions"><md-button ng-click="vm.onSubActionClick(subItem)" ng-hide="action.divider"><md-icon md-menu-align-target="" ng-if="subItem.icon" md-svg-icon="{{subItem.icon}}"></md-icon><span>{{subItem.title | translate}}</span></md-button></md-menu-item><md-menu-divider ng-if="subItem.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu></div></span><md-icon ng-repeat-end="" md-svg-icon="icons:chevron-right" ng-hide="$last"></md-icon><span class="pip-title breadcrumb-accent" ng-if="vm.config.text">{{vm.config.text | translate}}</span></div><div style="position: relative;" class="hide-gt-xs"><md-menu md-offset="0 44"><span class="pip-mobile-breadcrumb layout-row" ng-click="vm.config.items && vm.config.items.length > 1 ? $mdOpenMenu() : return" aria-label="open breadcrumb"><span class="text-overflow"><span ng-if="vm.config.criteria" ng-click="vm.openSearch()">{{vm.config.criteria}} -</span> <span class="breadcrumb-accent" ng-if="vm.config.text">{{vm.config.text | translate}}</span> <span ng-if="vm.config.items && vm.config.items.length > 0" class="breadcrumb-accent {{(vm.config.items && vm.config.items.length > 1) ? \'cursor-pointer\' : \'\' }}">{{vm.config.items[vm.config.items.length - 1].title | translate}}</span></span><md-icon class="pip-triangle-down cursor-pointer breadcrumb-accent" md-svg-icon="icons:triangle-down" ng-if="vm.config.items && vm.config.items.length > 1"></md-icon></span><md-menu-content width="4"><md-menu-item ng-repeat="item in vm.config.items" ng-if="vm.config.items && vm.config.items.length > 0"><md-button ng-click="vm.onClick(item)"><md-icon md-menu-align-target="" ng-if="item.icon" md-svg-icon="{{item.icon}}"></md-icon><span>{{item.title | translate}}</span></md-button></md-menu-item><md-menu-item ng-if="vm.config.text"><md-button><span class="text-grey">{{vm.config.text | translate}}</span></md-button></md-menu-item></md-menu-content></md-menu></div></div>');
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
    '<md-toolbar ng-show="showHeader" class="layout-row layout-align-start-center"><div class="flex-fixed pip-sticky-nav-header-user"><md-button class="md-icon-button" ng-click="onUserClick()" aria-label="current user"><img src="" class="pip-sticky-nav-header-user-image" ng-class="imageCss"></md-button></div><div class="pip-sticky-nav-header-user-text"><div class="pip-sticky-nav-header-user-pri" ng-click="onUserClick()">{{ title | translate }}</div><div class="pip-sticky-nav-header-user-sec">{{ subtitle | translate }}</div></div></md-toolbar>');
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
    '<md-toolbar class="md-subhead color-primary-bg {{class}}" ng-if="show()" ng-class="{\'md-whiteframe-3dp\': media(\'xs\')}"><div class="pip-divider"></div><md-select ng-model="selectedIndex" ng-disabled="disabled()" md-container-class="pip-full-width-dropdown" aria-label="DROPDOWN" md-ink-ripple="" md-on-close="onSelect(selectedIndex)"><md-option ng-repeat="action in actions" value="{{ ::$index }}" ng-selected="activeIndex == $index ? true : false">{{ (action.title || action.name || action) | translate }}</md-option></md-select></md-toolbar>');
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
    '<md-button class="md-icon-button pip-nav-icon" ng-if="config.type != \'none\'" ng-class="config.class" ng-click="onNavIconClick()" aria-label="menu"><md-icon ng-if="config.type==\'menu\'" md-svg-icon="icons:menu"></md-icon><img ng-src="{{config.imageUrl}}" ng-if="config.type==\'image\'" height="24" width="24"><md-icon ng-if="config.type==\'back\'" md-svg-icon="icons:arrow-left"></md-icon><md-icon ng-if="config.type==\'icon\'" md-svg-icon="{{config.icon}}"></md-icon></md-button>');
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
    '<md-list class="sidenav-list" xxxng-if="sections.length > 0"><md-list-item class="pip-focusable no-border pip-sticky-nav-menu-item pip-sticky-nav-expanded-button" ng-click="onExpand()" ng-disabled="!isCollapsed" ng-if="expandedButton"><md-icon md-svg-icon="icons:chevron-left" ng-if="expanded" class="pip-sticky-nav-menu-icon"></md-icon><md-icon md-svg-icon="icons:chevron-right" ng-if="!expanded" class="pip-sticky-nav-menu-icon"></md-icon></md-list-item><md-divider ng-show="expandedButton"></md-divider><div class="pip-section" ng-repeat="section in sections" ng-hide="section.access && !section.access(section)"><md-divider ng-show="$index > 0 && !isSectionEmpty(section.links)"></md-divider><md-subheader ng-show="section.title" style="height: 48px;"><span ng-if="expanded" class="pip-sticky-nav-menu-title section-title">{{::section.title | translate}}</span><md-icon md-svg-icon="{{section.icon}}" ng-if="!sideNavState.showIconTooltype && !expanded && section.icon" class="pip-sticky-nav-menu-icon section-icon"></md-icon><md-icon md-svg-icon="{{section.icon}}" ng-if="sideNavState.showIconTooltype && !expanded && section.icon" class="pip-sticky-nav-menu-icon section-icon"><md-tooltip md-visible="showTooltip" md-direction="right">{{::section.title | translate}}</md-tooltip></md-icon><md-icon md-svg-icon="{{defaultIcon}}" ng-if="!sideNavState.showIconTooltype && !expanded && !section.icon" class="pip-sticky-nav-menu-icon section-icon"></md-icon><md-icon md-svg-icon="{{defaultIcon}}" ng-if="sideNavState.showIconTooltype && !expanded && !section.icon" class="pip-sticky-nav-menu-icon section-icon"><md-tooltip md-visible="showTooltip" class="md-secondary">{{::section.title | translate}}</md-tooltip></md-icon></md-subheader><md-list-item class="no-border pip-sticky-nav-menu-item" ng-repeat="link in section.links" ng-class="{\'active\': isActive(link)}" ng-hide="link.access && !link.access(link)"><md-button class="layout-row layout-align-start-center pip-focusable" ng-click="clickLink($event, link)"><div class="pip-sticky-nav-menu-icon-block"><md-icon md-svg-icon="{{link.icon}}" ng-if="!(sideNavState.showIconTooltype && !expanded)" ng-hide="!link.icon" class="pip-sticky-nav-menu-icon flex-fixed"></md-icon><md-icon md-svg-icon="{{link.icon}}" ng-hide="!link.icon" ng-if="sideNavState.showIconTooltype && !expanded" class="pip-sticky-nav-menu-icon flex-fixed"><md-tooltip md-visible="showTooltip" md-direction="right">{{::link.title | translate}}</md-tooltip></md-icon></div><div class="pip-sticky-nav-menu-title">{{::link.title | translate}}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count < 100">{{link.count}}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count > 99">!</div></md-button></md-list-item></div></md-list>');
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
  $templateCache.put('search/SearchBar.html',
    '<div class="md-toolbar-tools pip-search-container" ng-if="vm.enabled"><div class="layout-row pip-search-selected"><md-button class="md-icon-button" aria-label="start search" ng-click="vm.onClick()"><md-icon md-svg-icon="icons:search"></md-icon></md-button><input class="pip-search-text flex" type="search" ng-model="vm.search.text" ng-keydown="vm.onKeyDown($event)"><md-button class="md-icon-button" aria-label="clear search" ng-click="vm.clear()"><md-icon md-svg-icon="icons:cross-circle"></md-icon></md-button></div></div><div class="md-toolbar-tools layout-row layout-align-end-center flex-fixed lp0 rp0" ng-if="!vm.enabled"><md-button class="md-icon-button" aria-label="start search" ng-click="vm.enable()"><md-icon md-svg-icon="icons:search"></md-icon></md-button></div>');
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
    '<md-toolbar class="pip-nav {{ class }}" ng-class="{\'pip-visible\': show(), \'pip-shadow\': showShadow()}"><md-tabs ng-if="media(\'gt-xs\')" md-selected="selected.activeTab" ng-class="{\'disabled\': disabled()}" md-stretch-tabs="true" md-dynamic-height="true"><md-tab ng-repeat="tab in tabs track by $index" ng-disabled="tabDisabled($index)" md-on-select="onSelect($index)"><md-tab-label>{{::tab.nameLocal }}<div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">{{ tab.newCounts }}</div><div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div></md-tab-label></md-tab></md-tabs><div class="md-subhead pip-tabs-content color-primary-bg" ng-if="media(\'xs\')"><div class="pip-divider position-top m0"></div><md-select ng-model="selected.activeIndex" ng-disabled="disabled()" md-container-class="pip-full-width-dropdown" aria-label="SELECT" md-ink-ripple="" md-on-close="onSelect(selected.activeIndex)"><md-option ng-repeat="tab in tabs track by $index" class="pip-tab-option" value="{{ ::$index }}">{{ ::tab.nameLocal }}<div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">{{ tab.newCounts }}</div><div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div></md-option></md-select></div></md-toolbar>');
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
    '<md-sidenav class="md-sidenav-left" md-is-locked-open="sidenavState.isLockedOpen" md-component-id="pip-sticky-sidenav" pip-focused="" ng-transclude=""></md-sidenav>');
}]);
})();



},{}]},{},[34,21])(34)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWN0aW9ucy9BY3Rpb25zU2VydmljZS50cyIsInNyYy9hY3Rpb25zL1ByaW1hcnlBY3Rpb25zRGlyZWN0aXZlLnRzIiwic3JjL2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9uc0RpcmVjdGl2ZS50cyIsInNyYy9hY3Rpb25zL2luZGV4LnRzIiwic3JjL2FwcGJhci9BcHBCYXJEaXJlY3RpdmUudHMiLCJzcmMvYXBwYmFyL0FwcEJhclBhcnREaXJlY3RpdmUudHMiLCJzcmMvYXBwYmFyL0FwcEJhclNlcnZpY2UudHMiLCJzcmMvYXBwYmFyL2luZGV4LnRzIiwic3JjL2JyZWFkY3J1bWIvQnJlYWRjcnVtYkRpcmVjdGl2ZS50cyIsInNyYy9icmVhZGNydW1iL0JyZWFkY3J1bWJTZXJ2aWNlLnRzIiwic3JjL2JyZWFkY3J1bWIvaW5kZXgudHMiLCJzcmMvY29tbW9uL05hdlNlcnZpY2UudHMiLCJzcmMvZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlci50cyIsInNyYy9kcm9wZG93bi9Ecm9wZG93bkRpcmVjdGl2ZS50cyIsInNyYy9oZWFkZXIvTmF2SGVhZGVyRGlyZWN0aXZlLnRzIiwic3JjL2hlYWRlci9OYXZIZWFkZXJTZXJ2aWNlLnRzIiwic3JjL2hlYWRlci9pbmRleC50cyIsInNyYy9pY29uL05hdkljb25EaXJlY3RpdmUudHMiLCJzcmMvaWNvbi9OYXZJY29uU2VydmljZS50cyIsInNyYy9pY29uL2luZGV4LnRzIiwic3JjL2luZGV4LnRzIiwic3JjL2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyRGlyZWN0aXZlLnRzIiwic3JjL21lbnUvTmF2TWVudURpcmVjdGl2ZS50cyIsInNyYy9tZW51L05hdk1lbnVTZXJ2aWNlLnRzIiwic3JjL21lbnUvaW5kZXgudHMiLCJzcmMvc2VhcmNoL1NlYXJjaEJhckRpcmVjdGl2ZS50cyIsInNyYy9zZWFyY2gvU2VhcmNoU2VydmljZS50cyIsInNyYy9zZWFyY2gvaW5kZXgudHMiLCJzcmMvc2lkZW5hdi9TaWRlTmF2RGlyZWN0aXZlLnRzIiwic3JjL3NpZGVuYXYvU2lkZU5hdlBhcnREaXJlY3RpdmUudHMiLCJzcmMvc2lkZW5hdi9TaWRlTmF2U2VydmljZS50cyIsInNyYy9zaWRlbmF2L2luZGV4LnRzIiwic3JjL3RhYnMvVGFic0RpcmVjdGl2ZS50cyIsInRlbXAvcGlwLXdlYnVpLW5hdi1odG1sLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBRUYsUUFBQSxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUVyRDtJQUFBO0lBMkJBLENBQUM7SUFBRCx1QkFBQztBQUFELENBM0JBLEFBMkJDLElBQUE7QUEzQlksNENBQWdCO0FBNkI3QjtJQUFnQyw4QkFBZ0I7SUFBaEQ7O0lBRUEsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FGQSxBQUVDLENBRitCLGdCQUFnQixHQUUvQztBQUZZLGdDQUFVO0FBSXZCO0lBQUE7UUFFVyx5QkFBb0IsR0FBaUIsRUFBRSxDQUFDO1FBRXhDLHdCQUFtQixHQUFpQixFQUFFLENBQUM7UUFHdkMsMkJBQXNCLEdBQWlCLEVBQUUsQ0FBQztRQUUxQywwQkFBcUIsR0FBZ0IsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFBRCxvQkFBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBVlksc0NBQWE7QUFtQzFCO0lBSUksd0JBQ0ksTUFBcUIsRUFDckIsVUFBZ0M7UUFFaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELHNCQUFXLGtDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxnREFBb0I7YUFBL0I7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBsZXQgQWN0aW9uc0NoYW5nZWRFdmVudCA9ICdwaXBBY3Rpb25zQ2hhbmdlZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2ltcGxlQWN0aW9uSXRlbSB7XHJcbiAgICAvLyBOYW1lIHRvIHJlZmVyIHRvIHRoZSBpdGVtXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgLy8gTGluayB2aXNpYmxlIHRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU/OiBzdHJpbmc7XHJcbiAgICAvLyBTaG93IGRpdmlkZXIgaW5zdGVhZCBvZiB0aXRsZVxyXG4gICAgcHVibGljIGRpdmlkZXI/OiBib29sZWFuO1xyXG4gICAgLy8gSWNvbiBuYW1lIGZyb20gJGljb25Qcm92aWRlclxyXG4gICAgcHVibGljIGljb24/OiBzdHJpbmc7XHJcbiAgICAvLyBDb3VudGVyIGJhZGdlXHJcbiAgICBwdWJsaWMgY291bnQ/OiBudW1iZXI7XHJcbiAgICAvLyBBY2Nlc3MgZnVuY3Rpb25cclxuICAgIHB1YmxpYyBhY2Nlc3M/OiAoYWN0aW9uOiBTaW1wbGVBY3Rpb25JdGVtKSA9PiBib29sZWFuO1xyXG4gICAgLy8gU2hvdyBvbiBzcGVjaWZpZWQgYnJlYWtwb2ludHNcclxuICAgIHB1YmxpYyBicmVha3BvaW50cz86IHN0cmluZ1tdO1xyXG4gICAgLy8gd2luZG93LmxvY2F0aW9uLmhyZWZcclxuICAgIHB1YmxpYyBocmVmPzogc3RyaW5nO1xyXG4gICAgLy8gJGxvY2F0aW9uLnVybFxyXG4gICAgcHVibGljIHVybD86IHN0cmluZztcclxuICAgIC8vICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMpXHJcbiAgICBwdWJsaWMgc3RhdGU/OiBzdHJpbmc7XHJcbiAgICAvLyBQYXJhbWV0ZXJzIGZvciAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zKVxyXG4gICAgcHVibGljIHN0YXRlUGFyYW1zPzogYW55O1xyXG4gICAgLy8gJHJvb3RTY29wZS5icm9hZGNhc3QoZXZlbnQpXHJcbiAgICBwdWJsaWMgZXZlbnQ/OiBzdHJpbmc7XHJcbiAgICAvLyBDbGljayBjYWxsYmFja1xyXG4gICAgcHVibGljIGNsaWNrPzogKGFjdGlvbjogU2ltcGxlQWN0aW9uSXRlbSkgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGlvbkl0ZW0gZXh0ZW5kcyBTaW1wbGVBY3Rpb25JdGVtIHtcclxuICAgIHB1YmxpYyBzdWJBY3Rpb25zOiBTaW1wbGVBY3Rpb25JdGVtW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25zQ29uZmlnIHtcclxuICAgIC8vIFByaW1hcnkgZ2xvYmFsIGFjdGlvbnMgdmlzaWJsZSBvbiB0aGUgc2NyZWVuXHJcbiAgICBwdWJsaWMgcHJpbWFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXSA9IFtdO1xyXG4gICAgLy8gUHJpbWFyeSBsb2NhbCBhY3Rpb25zIHZpc2libGUgb24gdGhlIHNjcmVlblxyXG4gICAgcHVibGljIHByaW1hcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXSA9IFtdO1xyXG5cclxuICAgIC8vIFNlY29uZGFyeSBnbG9iYWwgYWN0aW9ucyBhdmFpbGFibGUgaW4gcG9wdXBcclxuICAgIHB1YmxpYyBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW10gPSBbXTtcclxuICAgIC8vIFNlY29uZGFyeSBsb2NhbCBhY3Rpb25zIGF2YWlsYWJsZSBpbiBwb3B1cFxyXG4gICAgcHVibGljIHNlY29uZGFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdPSBbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uc1NlcnZpY2Uge1xyXG4gICAgcmVhZG9ubHkgY29uZmlnOiBBY3Rpb25zQ29uZmlnO1xyXG5cclxuICAgIHByaW1hcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBwcmltYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBzZWNvbmRhcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTsgICAgXHJcblxyXG4gICAgc2hvdyhwcmltYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSwgc2Vjb25kYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSk6IHZvaWQ7XHJcbiAgICBoaWRlKCk6IHZvaWQ7XHJcbiAgICB1cGRhdGVDb3VudChsaW5rOiBzdHJpbmcsIGNvdW50OiBudW1iZXIpOiB2b2lkOyBcclxuICAgIGNsZWFyQ291bnRzKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbnNQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgY29uZmlnOiBBY3Rpb25zQ29uZmlnO1xyXG4gICAgXHJcbiAgICBwcmltYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgcHJpbWFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107ICAgIFxyXG59XHJcblxyXG5jbGFzcyBBY3Rpb25zU2VydmljZSBpbXBsZW1lbnRzIElBY3Rpb25zU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEFjdGlvbnNDb25maWc7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25maWc6IEFjdGlvbnNDb25maWcsXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IEFjdGlvbnNDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwcmltYXJ5R2xvYmFsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucHJpbWFyeUdsb2JhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwcmltYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY29uZGFyeUdsb2JhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwcmltYXJ5TG9jYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJpbWFyeUxvY2FsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWNvbmRhcnlMb2NhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93KHByaW1hcnlBY3Rpb25zPzogQWN0aW9uSXRlbVtdLCBzZWNvbmRhcnlBY3Rpb25zPzogQWN0aW9uSXRlbVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnMgPSBwcmltYXJ5QWN0aW9ucyB8fCBbXTtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zID0gc2Vjb25kYXJ5QWN0aW9ucyB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUNvdW50KGFjdGlvbjogc3RyaW5nLCBjb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PSBudWxsIHx8ICFfLmlzTnVtYmVyKGNvdW50KSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYS5uYW1lID09IGFjdGlvbilcclxuICAgICAgICAgICAgICAgIGEuY291bnQgPSBjb3VudDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnMsIChhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhLm5hbWUgPT0gYWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgYS5jb3VudCA9IGNvdW50O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckNvdW50cygpOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBhLmNvdW50ID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnMsIChhKSA9PiB7XHJcbiAgICAgICAgICAgIGEuY291bnQgPSBudWxsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENoYW5nZUV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kZW1pdChBY3Rpb25zQ2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBY3Rpb25zUHJvdmlkZXIgaW1wbGVtZW50cyBJQWN0aW9uc1Byb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQWN0aW9uc0NvbmZpZyA9IG5ldyBBY3Rpb25zQ29uZmlnKCk7XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBY3Rpb25zU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBY3Rpb25zQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29uZmlnKHZhbHVlOiBBY3Rpb25zQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsdWUgfHwgbmV3IEFjdGlvbnNDb25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHByaW1hcnlHbG9iYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByaW1hcnlHbG9iYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUdsb2JhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY29uZGFyeUdsb2JhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByaW1hcnlMb2NhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWNvbmRhcnlMb2NhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlY29uZGFyeUxvY2FsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGUpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgQWN0aW9uc1NlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQWN0aW9ucycpXHJcbiAgICAucHJvdmlkZXIoJ3BpcEFjdGlvbnMnLCBBY3Rpb25zUHJvdmlkZXIpO1xyXG5cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5mdW5jdGlvbiBQcmltYXJ5QWN0aW9uc0NvbnRyb2xsZXIoXHJcbiAgICAkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRyb290U2NvcGUsICR3aW5kb3csICRsb2NhdGlvbiwgJGluamVjdG9yLCBwaXBBY3Rpb25zKSB7XHJcblxyXG4gICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXByaW1hcnktYWN0aW9ucycpO1xyXG5cclxuICAgIGlmICgkc2NvcGUubG9jYWxBY3Rpb25zKSBcclxuICAgICAgICBwaXBBY3Rpb25zLnByaW1hcnlMb2NhbEFjdGlvbnMgPSAkc2NvcGUubG9jYWxBY3Rpb25zO1xyXG5cclxuICAgIGlmICgkc2NvcGUuZ2xvYmFsQWN0aW9ucylcclxuICAgICAgICBwaXBBY3Rpb25zLnByaW1hcnlHbG9iYWxBY3Rpb25zID0gJHNjb3BlLmdsb2JhbEFjdGlvbnM7XHJcblxyXG4gICAgJHNjb3BlLmNvbmZpZyA9IHBpcEFjdGlvbnMuY29uZmlnO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCdwaXBBY3Rpb25zQ2hhbmdlZCcsIG9uQWN0aW9uc0NoYW5nZWQpO1xyXG5cclxuICAgICRzY29wZS5pc0hpZGRlbiA9IGlzSGlkZGVuO1xyXG4gICAgJHNjb3BlLmFjdGlvbkNvdW50ID0gYWN0aW9uQ291bnQ7XHJcbiAgICAkc2NvcGUuY2xpY2tBY3Rpb24gPSBjbGlja0FjdGlvbjtcclxuXHJcbiAgICByZXR1cm47XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uQWN0aW9uc0NoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICRzY29wZS5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNIaWRkZW4oYWN0aW9uKSB7XHJcbiAgICAgICAgLy8gVG9kbzogQ2hlY2sgYnJlYWtwb2ludHMgaGVyZVxyXG4gICAgICAgIHJldHVybiBhY3Rpb24uYWNjZXNzICYmICFhY3Rpb24uYWNjZXNzKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWN0aW9uQ291bnQoYWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKGFjdGlvbi5jb3VudCA9PT0gbnVsbCB8fCBhY3Rpb24uY291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPiA5OSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyEnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5jb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYWxjQWN0aW9ucyhhY3Rpb25zKSB7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgXy5lYWNoKGFjdGlvbnMsIGZ1bmN0aW9uIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKCFpc0hpZGRlbihhY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zKSA+IDAgfHxcclxuICAgICAgICAgICAgY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMpID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZWNvbmRhcnlEaXZpZGVyVmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zKSA+IDAgJiZcclxuICAgICAgICAgICAgY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMpID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbGlja0FjdGlvbihhY3Rpb24sICRtZE9wZW5NZW51KSB7XHJcbiAgICAgICAgaWYgKCFhY3Rpb24gfHwgYWN0aW9uLmRpdmlkZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5jbG9zZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUub3JpZ2luYXRvckV2ID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24ubWVudSkge1xyXG4gICAgICAgICAgICAkbWRPcGVuTWVudSgkc2NvcGUub3JpZ2luYXRvckV2KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5jbGljaykge1xyXG4gICAgICAgICAgICBhY3Rpb24uY2xpY2soKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ocmVmKSB7XHJcbiAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFjdGlvbi5ocmVmO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnVybCkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24udXJsKGFjdGlvbi51cmwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICgkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRzdGF0ZSA9ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLnN0YXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50KSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChhY3Rpb24uZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByYWlzZSBub3RpZmljYXRpb25cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBBY3Rpb25DbGlja2VkJywgYWN0aW9uLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBwcmltYXJ5QWN0aW9uc0RpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBsb2NhbEFjdGlvbnM6ICc9cGlwTG9jYWxBY3Rpb25zJyxcclxuICAgICAgICAgICAgZ2xvYmFsQWN0aW9uczogJz1waXBHbG9iYWxBY3Rpb25zJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhY3Rpb25zL1ByaW1hcnlBY3Rpb25zLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IFByaW1hcnlBY3Rpb25zQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEFjdGlvbnMnKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwUHJpbWFyeUFjdGlvbnMnLCBwcmltYXJ5QWN0aW9uc0RpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gU2Vjb25kYXJ5QWN0aW9uc0NvbnRyb2xsZXIoXHJcbiAgICAkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRyb290U2NvcGUsICR3aW5kb3csICRsb2NhdGlvbiwgJGluamVjdG9yLCBwaXBBY3Rpb25zKSB7XHJcblxyXG4gICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXNlY29uZGFyeS1hY3Rpb25zJyk7XHJcblxyXG4gICAgaWYgKCRzY29wZS5sb2NhbEFjdGlvbnMpIFxyXG4gICAgICAgIHBpcEFjdGlvbnMuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zID0gJHNjb3BlLmxvY2FsQWN0aW9ucztcclxuXHJcbiAgICBpZiAoJHNjb3BlLmdsb2JhbEFjdGlvbnMpIFxyXG4gICAgICAgIHBpcEFjdGlvbnMuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyA9ICRzY29wZS5nbG9iYWxBY3Rpb25zO1xyXG5cclxuICAgICRzY29wZS5jb25maWcgPSBwaXBBY3Rpb25zLmNvbmZpZztcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbigncGlwQWN0aW9uc0NoYW5nZWQnLCBvbkFjdGlvbnNDaGFuZ2VkKTtcclxuXHJcbiAgICAkc2NvcGUuaXNIaWRkZW4gPSBpc0hpZGRlbjtcclxuICAgICRzY29wZS5hY3Rpb25Db3VudCA9IGFjdGlvbkNvdW50O1xyXG4gICAgJHNjb3BlLnNlY29uZGFyeUFjdGlvbnNWaXNpYmxlID0gc2Vjb25kYXJ5QWN0aW9uc1Zpc2libGU7XHJcbiAgICAkc2NvcGUuc2Vjb25kYXJ5RGl2aWRlclZpc2libGUgPSBzZWNvbmRhcnlEaXZpZGVyVmlzaWJsZTtcclxuXHJcbiAgICAkc2NvcGUuY2xpY2tBY3Rpb24gPSBjbGlja0FjdGlvbjtcclxuXHJcbiAgICAkc2NvcGUub3Blbk1lbnUgPSBvcGVuTWVudTtcclxuXHJcbiAgICByZXR1cm47XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuTWVudSgkbWRPcGVuTWVudSwgZXYpIHtcclxuICAgICAgICAkc2NvcGUub3JpZ2luYXRvckV2ID0gZXY7XHJcbiAgICAgICAgJG1kT3Blbk1lbnUoZXYpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uQWN0aW9uc0NoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICRzY29wZS5jb25maWcgPSBjb25maWc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzSGlkZGVuKGFjdGlvbikge1xyXG4gICAgICAgIHJldHVybiBhY3Rpb24uYWNjZXNzICYmICFhY3Rpb24uYWNjZXNzKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWN0aW9uQ291bnQoYWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKGFjdGlvbi5jb3VudCA9PT0gbnVsbCB8fCBhY3Rpb24uY291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPiA5OSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyEnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5jb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYWxjQWN0aW9ucyhhY3Rpb25zKSB7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgXy5lYWNoKGFjdGlvbnMsIGZ1bmN0aW9uIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKCFpc0hpZGRlbihhY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zKSA+IDAgfHxcclxuICAgICAgICAgICAgY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMpID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZWNvbmRhcnlEaXZpZGVyVmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zKSA+IDAgJiZcclxuICAgICAgICAgICAgY2FsY0FjdGlvbnMoJHNjb3BlLmNvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMpID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbGlja0FjdGlvbihhY3Rpb24sICRtZE9wZW5NZW51KSB7XHJcbiAgICAgICAgaWYgKCFhY3Rpb24gfHwgYWN0aW9uLmRpdmlkZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5jbG9zZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUub3JpZ2luYXRvckV2ID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24ubWVudSkge1xyXG4gICAgICAgICAgICAkbWRPcGVuTWVudSgkc2NvcGUub3JpZ2luYXRvckV2KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5jbGljaykge1xyXG4gICAgICAgICAgICBhY3Rpb24uY2xpY2soKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ocmVmKSB7XHJcbiAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFjdGlvbi5ocmVmO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnVybCkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24udXJsKGFjdGlvbi51cmwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICgkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRzdGF0ZSA9ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLnN0YXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50KSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChhY3Rpb24uZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByYWlzZSBub3RpZmljYXRpb25cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBBY3Rpb25DbGlja2VkJywgYWN0aW9uLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlY29uZGFyeUFjdGlvbnNEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbG9jYWxBY3Rpb25zOiAnPXBpcExvY2FsQWN0aW9ucycsXHJcbiAgICAgICAgICAgIGdsb2JhbEFjdGlvbnM6ICc9cGlwR2xvYmFsQWN0aW9ucydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYWN0aW9ucy9TZWNvbmRhcnlBY3Rpb25zLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IFNlY29uZGFyeUFjdGlvbnNDb250cm9sbGVyXHJcbiAgICB9O1xyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBY3Rpb25zJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcFNlY29uZGFyeUFjdGlvbnMnLCBzZWNvbmRhcnlBY3Rpb25zRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcEFjdGlvbnMnLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcycsICd1aS5yb3V0ZXInXSk7XHJcblxyXG5pbXBvcnQgJy4vQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgJy4vUHJpbWFyeUFjdGlvbnNEaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vU2Vjb25kYXJ5QWN0aW9uc0RpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL0FjdGlvbnNTZXJ2aWNlJzsiLCLvu78ndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmZ1bmN0aW9uIEFwcEJhckRpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJHJvb3RTY29wZSwgcGlwQXBwQmFyKSB7XHJcbiAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLWFwcGJhcicpO1xyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2NvbG9yLXByaW1hcnktYmcnKTtcclxuICAgIFxyXG4gICAgLy8kc2NvcGUuJGVtaXQoJ3BpcFJlc2l6ZVdpbmRvdycpO1xyXG5cclxuICAgICRzY29wZS5jb25maWcgPSBwaXBBcHBCYXIuY29uZmlnO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCdwaXBBcHBCYXJDaGFuZ2VkJywgb25BcHBCYXJDaGFuZ2VkKTtcclxuXHJcbiAgICBmdW5jdGlvbiBvbkFwcEJhckNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICRzY29wZS5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGJhckRpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxyXG4gICAgICAgIHNjb3BlOiB0cnVlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwYmFyL0FwcEJhci5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBBcHBCYXJEaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICB9O1xyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBcHBCYXInKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwQXBwYmFyJywgYXBwYmFyRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5mdW5jdGlvbiBBcHBCYXJQYXJ0RGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRyb290U2NvcGUsIHBpcEFwcEJhcikge1xyXG4gICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgIHZhciBwYXJ0TmFtZSA9ICcnICsgJGF0dHJzLnBpcEFwcGJhclBhcnQ7XHJcbiAgICB2YXIgcGFydFZhbHVlID0gbnVsbDtcclxuXHJcbiAgICAvLyBCcmVhayBwYXJ0IGFwYXJ0XHJcbiAgICB2YXIgcG9zID0gcGFydE5hbWUuaW5kZXhPZignOicpO1xyXG4gICAgaWYgKHBvcyA+IDApIHtcclxuICAgICAgICBwYXJ0VmFsdWUgPSBwYXJ0TmFtZS5zdWJzdHIocG9zICsgMSk7XHJcbiAgICAgICAgcGFydE5hbWUgPSBwYXJ0TmFtZS5zdWJzdHIoMCwgcG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkFwcEJhckNoYW5nZWQobnVsbCwgcGlwQXBwQmFyLmNvbmZpZyk7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJ3BpcEFwcEJhckNoYW5nZWQnLCBvbkFwcEJhckNoYW5nZWQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uQXBwQmFyQ2hhbmdlZChldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHBhcnRzID0gY29uZmlnLnBhcnRzIHx8IHt9O1xyXG4gICAgICAgIHZhciBjdXJyZW50UGFydFZhbHVlID0gcGFydHNbcGFydE5hbWVdO1xyXG5cclxuICAgICAgICAvLyBTZXQgdmlzaWJsZSB2YXJpYWJsZSB0byBzd2l0Y2ggbmdJZlxyXG4gICAgICAgIHZhciB2aXNpYmxlID0gISEocGFydFZhbHVlID8gY3VycmVudFBhcnRWYWx1ZSA9PSBwYXJ0VmFsdWUgOiBjdXJyZW50UGFydFZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHZpc2libGUgIT0gJHNjb3BlLnZpc2libGUpXHJcbiAgICAgICAgICAgICRzY29wZS52aXNpYmxlID0gdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vIEV4YW1wbGUgaXMgdGFrZW4gZnJvbSBoZXJlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIwMzI1NDgwL2FuZ3VsYXJqcy13aGF0cy10aGUtYmVzdC1wcmFjdGljZS10by1hZGQtbmdpZi10by1hLWRpcmVjdGl2ZS1wcm9ncmFtbWF0aWNhbGx5XHJcbmZ1bmN0aW9uIGFwcGJhclBhcnREaXJlY3RpdmUobmdJZkRpcmVjdGl2ZSkge1xyXG4gICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgIHZhciBuZ0lmID0gbmdJZkRpcmVjdGl2ZVswXTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRyYW5zY2x1ZGU6IG5nSWYudHJhbnNjbHVkZSxcclxuICAgICAgICBwcmlvcml0eTogbmdJZi5wcmlvcml0eSxcclxuICAgICAgICB0ZXJtaW5hbDogbmdJZi50ZXJtaW5hbCxcclxuICAgICAgICByZXN0cmljdDogbmdJZi5yZXN0cmljdCxcclxuICAgICAgICBzY29wZTogdHJ1ZSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbiBsaW5rRnVuY3Rpb24oJHNjb3BlOiBhbnksICRlbGVtZW50LCAkYXR0cnM6IGFueSkge1xyXG4gICAgICAgICAgICAvLyBWaXN1YWxpemUgYmFzZWQgb24gdmlzaWJsZSB2YXJpYWJsZSBpbiBzY29wZVxyXG4gICAgICAgICAgICAkYXR0cnMubmdJZiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUudmlzaWJsZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbmdJZi5saW5rLmFwcGx5KG5nSWYsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyOiBBcHBCYXJQYXJ0RGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcEFwcEJhcicpXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBBcHBiYXJQYXJ0JywgYXBwYmFyUGFydERpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBsZXQgQXBwQmFyQ2hhbmdlZEV2ZW50ID0gJ3BpcEFwcEJhckNoYW5nZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcEJhckNvbmZpZyB7XHJcbiAgICB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgcGFydHM6IGFueTtcclxuICAgIGNsYXNzZXM6IHN0cmluZ1tdO1xyXG59IFxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXBwQmFyU2VydmljZSB7XHJcbiAgICByZWFkb25seSBjb25maWc6IEFwcEJhckNvbmZpZztcclxuICAgIHJlYWRvbmx5IGNsYXNzZXM6IHN0cmluZ1tdO1xyXG4gICAgcGFydHM6IGFueTtcclxuXHJcbiAgICBzaG93KHBhcnRzPzogYW55LCBjbGFzc2VzPzogc3RyaW5nW10sIHNoYWRvd0JyZWFrcG9pbnRzPzogc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgaGlkZSgpOiB2b2lkO1xyXG4gXHJcbiAgICBhZGRTaGFkb3coLi4uYnJlYWtwb2ludHM6IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIHJlbW92ZVNoYWRvdygpOiB2b2lkO1xyXG4gXHJcbiAgICBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiBcclxuICAgIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXBwQmFyUHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGNvbmZpZzogQXBwQmFyQ29uZmlnO1xyXG4gICAgcGFydHM6IGFueTtcclxuICAgIGNsYXNzZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZDtcclxuXHJcbiAgICBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIEFwcEJhclNlcnZpY2UgaW1wbGVtZW50cyBJQXBwQmFyU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEFwcEJhckNvbmZpZztcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogQXBwQmFyQ29uZmlnLCAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IEFwcEJhckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsYXNzZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcnRzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhcnRzKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHMgPSB2YWx1ZSB8fCB7fTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93KHBhcnRzPzogYW55LCBjbGFzc2VzPzogc3RyaW5nW10sIHNoYWRvd0JyZWFrcG9pbnRzPzogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gcGFydHMgfHwgdGhpcy5fY29uZmlnLnBhcnRzIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gY2xhc3NlcyB8fCB0aGlzLl9jb25maWcuY2xhc3NlcyB8fCBbXTtcclxuICAgICAgICBpZiAoc2hhZG93QnJlYWtwb2ludHMpIHRoaXMuc2V0U2hhZG93KHNoYWRvd0JyZWFrcG9pbnRzKTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhpZGVTaGFkb3coKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBfLnJlamVjdCh0aGlzLl9jb25maWcuY2xhc3NlcywgKGMpID0+IGMuc3RhcnRzV2l0aCgncGlwLXNoYWRvdycpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNoYWRvdyhicmVha3BvaW50czogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhpZGVTaGFkb3coKTtcclxuXHJcbiAgICAgICAgaWYgKGJyZWFrcG9pbnRzICE9IG51bGwgJiYgYnJlYWtwb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBfLmVhY2goYnJlYWtwb2ludHMsIChicCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaCgncGlwLXNoYWRvdy0nICsgYnApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKCdwaXAtc2hhZG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRTaGFkb3coLi4uYnJlYWtwb2ludHM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRTaGFkb3coYnJlYWtwb2ludHMpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVNoYWRvdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhpZGVTaGFkb3coKTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaChjKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IF8ucmVqZWN0KHRoaXMuX2NvbmZpZy5jbGFzc2VzLCAoY2MpID0+IGNjID09IGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0c1twYXJ0XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoQXBwQmFyQ2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBcHBCYXJQcm92aWRlciBpbXBsZW1lbnRzIElBcHBCYXJQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEFwcEJhckNvbmZpZyA9IHtcclxuICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgIHBhcnRzOiB7fSxcclxuICAgICAgICBjbGFzc2VzOiBbXVxyXG4gICAgfTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFwcEJhclNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogQXBwQmFyQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29uZmlnKHZhbHVlOiBBcHBCYXJDb25maWcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB2YWx1ZSB8fCBuZXcgQXBwQmFyQ29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJ0cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gdmFsdWUgfHwge307XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xhc3NlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2xhc3Nlcyh2YWx1ZTogc3RyaW5nW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IF8ucmVqZWN0KHRoaXMuX2NvbmZpZy5jbGFzc2VzLCAoY2MpID0+IGNjID09IGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHNbcGFydF0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBBcHBCYXJTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfSAgICAgXHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEFwcEJhcicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcEFwcEJhcicsIEFwcEJhclByb3ZpZGVyKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQXBwQmFyJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vQXBwQmFyU2VydmljZSc7XHJcbmltcG9ydCAnLi9BcHBCYXJEaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vQXBwQmFyUGFydERpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL0FwcEJhclNlcnZpY2UnO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVBY3Rpb25JdGVtIH0gZnJvbSAnLi4vYWN0aW9ucy9BY3Rpb25zU2VydmljZSc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWJJdGVtIH0gZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWJDb25maWcgfSBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJyZWFkY3J1bWJTZXJ2aWNlIH0gZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWJDaGFuZ2VkRXZlbnQgfSBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYkJhY2tFdmVudCB9IGZyb20gJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPcGVuU2VhcmNoRXZlbnQgfSBmcm9tICcuLi9zZWFyY2gvU2VhcmNoU2VydmljZSdcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuY2xhc3MgQnJlYWRjcnVtYkNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuICAgIHByaXZhdGUgX3dpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9sb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZTtcclxuICAgIHByaXZhdGUgX2luamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2U7XHJcbiAgICBwcml2YXRlIG9yaWdpbmF0b3JFdjogRXZlbnQ7XHJcbiAgICBcclxuICAgIHB1YmxpYyBjb25maWc6IEJyZWFkY3J1bWJDb25maWc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRlbGVtZW50OiBhbnksIFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxyXG4gICAgICAgICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSxcclxuICAgICAgICAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgJGluamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2UsXHJcbiAgICAgICAgcGlwQnJlYWRjcnVtYjogSUJyZWFkY3J1bWJTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgdGhpcy5fd2luZG93ID0gJHdpbmRvdztcclxuICAgICAgICB0aGlzLl9sb2NhdGlvbiA9ICRsb2NhdGlvbjtcclxuICAgICAgICB0aGlzLl9pbmplY3RvciA9ICRpbmplY3RvcjtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1icmVhZGNydW1iJyk7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gcGlwQnJlYWRjcnVtYi5jb25maWc7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKEJyZWFkY3J1bWJDaGFuZ2VkRXZlbnQsIChldmVudCwgY29uZmlnKSA9PiB7IHRoaXMub25CcmVhZGNydW1iQ2hhbmdlZChldmVudCwgY29uZmlnKTsgfSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQnJlYWRjcnVtYkJhY2tFdmVudCwgKCkgPT4geyB0aGlzLm9uQnJlYWRjcnVtYkJhY2soKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJyZWFkY3J1bWJDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnJlYWRjcnVtYkJhY2soKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5jb25maWcuaXRlbXM7XHJcbiAgICAgICAgLy8gR28gdG8gdGhlIGxhc3QgYnJlYWRjcnVtYiBpdGVtXHJcbiAgICAgICAgaWYgKF8uaXNBcnJheShpdGVtcykgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBsZXQgYmFja0NhbGxiYWNrID0gaXRlbS5jbGljaztcclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihiYWNrQ2FsbGJhY2spKSBcclxuICAgICAgICAgICAgICAgIGJhY2tDYWxsYmFjayhpdGVtKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICB0aGlzLl93aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xpY2soaXRlbTogQnJlYWRjcnVtYkl0ZW0pIHtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0uY2xpY2spKVxyXG4gICAgICAgICAgICBpdGVtLmNsaWNrKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuU2VhcmNoKCkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KE9wZW5TZWFyY2hFdmVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhY3Rpb25zVmlzaWJsZShpdGVtOiBCcmVhZGNydW1iSXRlbSk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICByZXR1cm4gYW5ndWxhci5pc0FycmF5KGl0ZW0uc3ViQWN0aW9ucykgJiYgaXRlbS5zdWJBY3Rpb25zLmxlbmd0aCA+IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT3Blbk1lbnUoJG1kT3Blbk1lbnUsIGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYXRvckV2ID0gZXZlbnQ7XHJcbiAgICAgICAgJG1kT3Blbk1lbnUodGhpcy5vcmlnaW5hdG9yRXYpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblN1YkFjdGlvbkNsaWNrKGFjdGlvbjogU2ltcGxlQWN0aW9uSXRlbSk6IHZvaWQgeyBcclxuICAgICAgICBpZiAoIWFjdGlvbiB8fCBhY3Rpb24uZGl2aWRlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmNsaWNrKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbi5jbGljayhhY3Rpb24pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmhyZWYpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhY3Rpb24uaHJlZjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi51cmwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb24udXJsKGFjdGlvbi51cmwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbmplY3Rvci5oYXMoJyRzdGF0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHN0YXRlID0gdGhpcy5faW5qZWN0b3IuZ2V0KCckc3RhdGUnKSBhcyBuZy51aS5JU3RhdGVTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oYWN0aW9uLnN0YXRlLCBhY3Rpb24uc3RhdGVQYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoYWN0aW9uLmV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5vcmlnaW5hdG9yRXYgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByYWlzZSBub3RpZmljYXRpb25cclxuICAgICAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcEFjdGlvbkNsaWNrZWQnLCBhY3Rpb24ubmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYXRvckV2ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBicmVhZGNydW1iRGlyZWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2JyZWFkY3J1bWIvQnJlYWRjcnVtYi5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBCcmVhZGNydW1iQ29udHJvbGxlcixcclxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwQnJlYWRjcnVtYicpXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBCcmVhZGNydW1iJywgYnJlYWRjcnVtYkRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IFNpbXBsZUFjdGlvbkl0ZW0gfSBmcm9tICcuLi9hY3Rpb25zL0FjdGlvbnNTZXJ2aWNlJztcclxuZXhwb3J0IGxldCBCcmVhZGNydW1iQ2hhbmdlZEV2ZW50ID0gXCJwaXBCcmVhZGNydW1iQ2hhbmdlZFwiO1xyXG5leHBvcnQgbGV0IEJyZWFkY3J1bWJCYWNrRXZlbnQgPSBcInBpcEJyZWFkY3J1bWJCYWNrXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkl0ZW0ge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGNsaWNrPzogKGl0ZW06IEJyZWFkY3J1bWJJdGVtKSA9PiB2b2lkOyAgIFxyXG4gICAgc3ViQWN0aW9ucz86IFNpbXBsZUFjdGlvbkl0ZW1bXTsgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iQ29uZmlnIHtcclxuICAgIHRleHQ6IHN0cmluZztcclxuICAgIGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdO1xyXG4gICAgY3JpdGVyaWE6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQnJlYWRjcnVtYlNlcnZpY2Uge1xyXG4gICAgY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnO1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgaXRlbXM6IEJyZWFkY3J1bWJJdGVtW107XHJcbiAgICBjcml0ZXJpYTogc3RyaW5nO1xyXG5cclxuICAgIHNob3dUZXh0KHRleHQ6IHN0cmluZywgY3JpdGVyaWE/OiBzdHJpbmcpO1xyXG4gICAgc2hvd0l0ZW1zKGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdLCBjcml0ZXJpYT86IHN0cmluZyk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJyZWFkY3J1bWJQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuY2xhc3MgQnJlYWRjcnVtYlNlcnZpY2UgaW1wbGVtZW50cyBJQnJlYWRjcnVtYlNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLml0ZW1zID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGl0ZW1zKCk6IEJyZWFkY3J1bWJJdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpdGVtcyh2YWx1ZTogQnJlYWRjcnVtYkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuaXRlbXMgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNyaXRlcmlhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jcml0ZXJpYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNyaXRlcmlhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93VGV4dCh0ZXh0OiBzdHJpbmcsIGNyaXRlcmlhPzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pdGVtcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gY3JpdGVyaWE7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0l0ZW1zKGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdLCBjcml0ZXJpYT86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pdGVtcyA9IGl0ZW1zIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSBjcml0ZXJpYTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoQnJlYWRjcnVtYkNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIEJyZWFkY3J1bWJQcm92aWRlciBpbXBsZW1lbnRzIElCcmVhZGNydW1iUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnID0geyBcclxuICAgICAgICB0ZXh0OiBudWxsLFxyXG4gICAgICAgIGl0ZW1zOiBudWxsLFxyXG4gICAgICAgIGNyaXRlcmlhOiBudWxsXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQnJlYWRjcnVtYlNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCB0ZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSk6IGFueSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IEJyZWFkY3J1bWJTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcEJyZWFkY3J1bWInKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBCcmVhZGNydW1iJywgQnJlYWRjcnVtYlByb3ZpZGVyKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcEJyZWFkY3J1bWInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcycsICdwaXBOYXYuVHJhbnNsYXRlJ10pO1xyXG5cclxuaW1wb3J0ICcuL0JyZWFkY3J1bWJEaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcblxyXG5cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgSU5hdkljb25TZXJ2aWNlIH0gZnJvbSAnLi4vaWNvbi9OYXZJY29uU2VydmljZSc7XHJcbmltcG9ydCB7IElOYXZNZW51U2VydmljZSB9IGZyb20gJy4uL21lbnUvTmF2TWVudVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJTmF2SGVhZGVyU2VydmljZSB9IGZyb20gJy4uL2hlYWRlci9OYXZIZWFkZXJTZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJyZWFkY3J1bWJTZXJ2aWNlIH0gZnJvbSAnLi4vYnJlYWRjcnVtYi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IElTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoL1NlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQWN0aW9uc1NlcnZpY2UgfSBmcm9tICcuLi9hY3Rpb25zL0FjdGlvbnNTZXJ2aWNlJztcclxuaW1wb3J0IHsgSUFwcEJhclNlcnZpY2UgfSBmcm9tICcuLi9hcHBiYXIvQXBwQmFyU2VydmljZSc7XHJcbmltcG9ydCB7IElTaWRlTmF2U2VydmljZSB9IGZyb20gJy4uL3NpZGVuYXYvU2lkZU5hdlNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2U2VydmljZSB7XHJcbiAgICBhcHBiYXI6IElBcHBCYXJTZXJ2aWNlO1xyXG4gICAgaWNvbjogSU5hdkljb25TZXJ2aWNlOyBcclxuICAgIGJyZWFkY3J1bWI6IElCcmVhZGNydW1iU2VydmljZTtcclxuICAgIGFjdGlvbnM6IElBY3Rpb25zU2VydmljZTtcclxuICAgIHNlYXJjaDogSVNlYXJjaFNlcnZpY2U7XHJcbiAgICBzaWRlbmF2OiBJU2lkZU5hdlNlcnZpY2U7XHJcbiAgICBoZWFkZXI6IElOYXZIZWFkZXJTZXJ2aWNlO1xyXG4gICAgbWVudTogSU5hdk1lbnVTZXJ2aWNlOyAgIFxyXG5cclxuICAgIHJlc2V0KCk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIE5hdlNlcnZpY2UgaW1wbGVtZW50cyBJTmF2U2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCRpbmplY3Rvcikge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdGhpcy5hcHBiYXIgPSAkaW5qZWN0b3IuaGFzKCdwaXBBcHBCYXInKSA/ICRpbmplY3Rvci5nZXQoJ3BpcEFwcEJhcicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLmljb24gPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZJY29uJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZJY29uJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuYnJlYWRjcnVtYiA9ICRpbmplY3Rvci5oYXMoJ3BpcEJyZWFkY3J1bWInKSA/ICRpbmplY3Rvci5nZXQoJ3BpcEJyZWFkY3J1bWInKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gJGluamVjdG9yLmhhcygncGlwQWN0aW9ucycpID8gJGluamVjdG9yLmdldCgncGlwQWN0aW9ucycpIDogbnVsbDtcclxuICAgICAgICB0aGlzLnNlYXJjaCA9ICRpbmplY3Rvci5oYXMoJ3BpcFNlYXJjaCcpID8gJGluamVjdG9yLmdldCgncGlwU2VhcmNoJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuc2lkZW5hdiA9ICRpbmplY3Rvci5oYXMoJ3BpcFNpZGVOYXYnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFNpZGVOYXYnKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZIZWFkZXInKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE5hdkhlYWRlcicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLm1lbnUgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZNZW51JykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZNZW51JykgOiBudWxsOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXBwYmFyOiBJQXBwQmFyU2VydmljZTtcclxuICAgIHB1YmxpYyBpY29uOiBJTmF2SWNvblNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYnJlYWRjcnVtYjogSUJyZWFkY3J1bWJTZXJ2aWNlO1xyXG4gICAgcHVibGljIGFjdGlvbnM6IElBY3Rpb25zU2VydmljZTtcclxuICAgIHB1YmxpYyBzZWFyY2g6IElTZWFyY2hTZXJ2aWNlO1xyXG4gICAgcHVibGljIHNpZGVuYXY6IElTaWRlTmF2U2VydmljZTsgICAgICAgIFxyXG4gICAgcHVibGljIGhlYWRlcjogSU5hdkhlYWRlclNlcnZpY2U7XHJcbiAgICBwdWJsaWMgbWVudTogSU5hdk1lbnVTZXJ2aWNlOyAgICBcclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKSB7XHJcbiAgICAgICAgLy8gUmVzZXQgYXBwYmFyXHJcbiAgICAgICAgaWYgKHRoaXMuYXBwYmFyKSBcclxuICAgICAgICAgICAgdGhpcy5hcHBiYXIuc2hvdygpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBpY29uXHJcbiAgICAgICAgaWYgKHRoaXMuaWNvbilcclxuICAgICAgICAgICAgdGhpcy5pY29uLnNob3dNZW51KCk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGJyZWFkY3J1bWJcclxuICAgICAgICBpZiAodGhpcy5icmVhZGNydW1iKVxyXG4gICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWIuc2hvd1RleHQobnVsbCk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGFjdGlvbnNcclxuICAgICAgICBpZiAodGhpcy5hY3Rpb25zKVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuc2hvdygpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBzZWFyY2hcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2gpXHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLnNldChudWxsKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2lkZW5hdilcclxuICAgICAgICAgICAgdGhpcy5zaWRlbmF2LnNob3coKTtcclxuICAgIH1cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2U2VydmljZScsIFtdKVxyXG4gICAgLnNlcnZpY2UoJ3BpcE5hdlNlcnZpY2UnLCBOYXZTZXJ2aWNlKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmZ1bmN0aW9uIHRyYW5zbGF0ZUZpbHRlcigkaW5qZWN0b3IpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICBsZXQgcGlwVHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gcGlwVHJhbnNsYXRlICA/IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoa2V5KSB8fCBrZXkgOiBrZXk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdi5UcmFuc2xhdGUnLCBbXSlcclxuICAgIC5maWx0ZXIoJ3RyYW5zbGF0ZScsIHRyYW5zbGF0ZUZpbHRlcik7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gRHJvcGRvd25EaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGluamVjdG9yLCAkcm9vdFNjb3BlLCAkbWRNZWRpYSwgJHRpbWVvdXQpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICBsZXQgcGlwVGhlbWUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUaGVtZScpID8gJGluamVjdG9yLmdldCgncGlwVGhlbWUnKSA6IG51bGw7IFxyXG4gICAgbGV0IHBpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsO1xyXG4gICAgbGV0IGN1cnJlbnRUaGVtZSA9ICdkZWZhdWx0JztcclxuXHJcbiAgICBpZiAocGlwVGhlbWUpXHJcbiAgICAgICAgY3VycmVudFRoZW1lID0gcGlwVGhlbWUudXNlKCk7XHJcbiAgICBlbHNlIGlmICgkcm9vdFNjb3BlLiR0aGVtZSlcclxuICAgICAgICBjdXJyZW50VGhlbWUgPSAkcm9vdFNjb3BlLiR0aGVtZTtcclxuXHJcbiAgICAkc2NvcGUuY2xhc3MgPSAoJGF0dHJzLmNsYXNzIHx8ICcnKSArICcgbWQtJyArIGN1cnJlbnRUaGVtZSArICctdGhlbWUnO1xyXG5cclxuICAgIC8vcGlwQXNzZXJ0LmlzQXJyYXkoJHNjb3BlLmFjdGlvbnMsICdwaXBEcm9wZG93bjogcGlwLWFjdGlvbnMgYXR0cmlidXRlIHNob3VsZCB0YWtlIGFuIGFycmF5LCBidXQgdGFrZSAnICsgdHlwZW9mICRzY29wZS5hY3Rpb25zKTtcclxuICAgICRzY29wZS5tZWRpYSA9IHBpcE1lZGlhICE9PSB1bmRlZmluZWQgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG4gICAgJHNjb3BlLmFjdGlvbnMgPSAoJHNjb3BlLmFjdGlvbnMgJiYgXy5pc0FycmF5KCRzY29wZS5hY3Rpb25zKSkgPyAkc2NvcGUuYWN0aW9ucyA6IFtdO1xyXG4gICAgJHNjb3BlLmFjdGl2ZUluZGV4ID0gJHNjb3BlLmFjdGl2ZUluZGV4IHx8IDA7XHJcblxyXG4gICAgJHNjb3BlLmRpc2FibGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkc2NvcGUubmdEaXNhYmxlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUubmdEaXNhYmxlZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5vblNlbGVjdCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICRzY29wZS5hY3RpdmVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGlmICgkc2NvcGUuc2VsZWN0KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3QoJHNjb3BlLmFjdGlvbnNbaW5kZXhdLCAkc2NvcGUuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRzY29wZS5waXBDaGFuZ2UpIHtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUucGlwQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCRzY29wZS5zaG93RHJvcGRvd24oKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNob3dEcm9wZG93bigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkcm9wZG93bkRpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBuZ0Rpc2FibGVkOiAnJicsXHJcbiAgICAgICAgICAgIGFjdGlvbnM6ICc9cGlwQWN0aW9ucycsXHJcbiAgICAgICAgICAgIHNob3dEcm9wZG93bjogJyZwaXBTaG93JyxcclxuICAgICAgICAgICAgYWN0aXZlSW5kZXg6ICc9cGlwQWN0aXZlSW5kZXgnLFxyXG4gICAgICAgICAgICBzZWxlY3Q6ICc9cGlwRHJvcGRvd25TZWxlY3QnLFxyXG4gICAgICAgICAgICBwaXBDaGFuZ2U6ICcmJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdkcm9wZG93bi9Ecm9wZG93bi5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBEcm9wZG93bkRpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcERyb3Bkb3duJywgWydwaXBOYXYuVGVtcGxhdGVzJ10pXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBEcm9wZG93bicsIGRyb3Bkb3duRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gTmF2SGVhZGVyRGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkcm9vdFNjb3BlLCAkdGltZW91dCwgcGlwTmF2SGVhZGVyKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgaW1hZ2UgPSBudWxsLFxyXG4gICAgICAgICAgICBpbWFnZUJsb2NrID0gJGVsZW1lbnQuZmluZCgnLnBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyJyksXHJcbiAgICAgICAgICAgICRpbWFnZSxcclxuICAgICAgICAgICAgY3VycmVudFN0YXRlLFxyXG4gICAgICAgICAgICBsb2FkZWREZWZhdWx0SW1hZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LWhlYWRlcicpO1xyXG5cclxuICAgICAgICAkc2NvcGUub25Vc2VyQ2xpY2sgPSBvblVzZXJDbGljaztcclxuICAgICAgICAkc2NvcGUub25JbWFnZUVycm9yID0gb25JbWFnZUVycm9yO1xyXG4gICAgICAgICRzY29wZS5vbkltYWdlTG9hZCA9IG9uSW1hZ2VMb2FkO1xyXG5cclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRpbWFnZSA9ICRlbGVtZW50LmZpbmQoJy5waXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci1pbWFnZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRpbWFnZVswXSkge1xyXG4gICAgICAgICAgICAgICAgJGltYWdlWzBdLm9ubG9hZCA9IG9uSW1hZ2VMb2FkO1xyXG4gICAgICAgICAgICAgICAgJGltYWdlWzBdLm9uZXJyb3IgPSBvbkltYWdlRXJyb3I7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2Uub25sb2FkID0gb25JbWFnZUxvYWQ7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2Uub25lcnJvciA9IG9uSW1hZ2VFcnJvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb25OYXZIZWFkZXJDaGFuZ2VkKG51bGwsIHBpcE5hdkhlYWRlci5jb25maWcpO1xyXG4gICAgICAgIH0sIDIwKTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcE5hdkhlYWRlckNoYW5nZWQnLCBvbk5hdkhlYWRlckNoYW5nZWQpO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGVDaGFuZ2VkJywgb25TdGF0ZUNoYW5nZWQpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRIZWFkZXIoKSB7XHJcbiAgICAgICAgICAgIGlmICghcGlwTmF2SGVhZGVyLmNvbmZpZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnRpdGxlID0gcGlwTmF2SGVhZGVyLmNvbmZpZy50aXRsZTtcclxuICAgICAgICAgICAgJHNjb3BlLnN1YnRpdGxlID0gcGlwTmF2SGVhZGVyLmNvbmZpZy5zdWJ0aXRsZTtcclxuICAgICAgICAgICAgJHNjb3BlLmltYWdlVXJsID0gcGlwTmF2SGVhZGVyLmNvbmZpZy5pbWFnZVVybDtcclxuICAgICAgICAgICAgJHNjb3BlLmltYWdlQ3NzID0gcGlwTmF2SGVhZGVyLmNvbmZpZy5pbWFnZUNzcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdoZW4gaW1hZ2UgaXMgbG9hZGVkIHJlc2l6ZS9yZXBvc2l0aW9uIGl0XHJcbiAgICAgICAgZnVuY3Rpb24gb25JbWFnZUxvYWQoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICQoJGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgIHNldEltYWdlTWFyZ2luQ1NTKGltYWdlQmxvY2ssIGltYWdlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkltYWdlRXJyb3IoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChsb2FkZWREZWZhdWx0SW1hZ2UpIHJldHVybjtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRJbWFnZShwaXBOYXZIZWFkZXIuY29uZmlnLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25TdGF0ZUNoYW5nZWQoZXZlbnQsIHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlLmlkID09ICd0b2dnbGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNob3dIZWFkZXIgPSBjdXJyZW50U3RhdGUgJiYgY3VycmVudFN0YXRlLmlkID09ICd0b2dnbGUnO1xyXG4gICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zaG93SGVhZGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldEltYWdlTWFyZ2luQ1NTKGNvbnRhaW5lciwgaW1hZ2UpIHtcclxuICAgICAgICAgICAgdmFyIGNzc1BhcmFtcyA9IHt9LFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyV2lkdGggPSBjb250YWluZXIud2lkdGggPyBjb250YWluZXIud2lkdGgoKSA6IGNvbnRhaW5lci5jbGllbnRXaWR0aCxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lci5oZWlnaHQgPyBjb250YWluZXIuaGVpZ2h0KCkgOiBjb250YWluZXIuY2xpZW50SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VXaWR0aCA9IGltYWdlWzBdLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aCxcclxuICAgICAgICAgICAgICAgIGltYWdlSGVpZ2h0ID0gaW1hZ2VbMF0ubmF0dXJhbEhlaWdodCB8fCBpbWFnZS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW4gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKChpbWFnZVdpZHRoIC8gY29udGFpbmVyV2lkdGgpID4gKGltYWdlSGVpZ2h0IC8gY29udGFpbmVySGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luID0gLSgoaW1hZ2VXaWR0aCAvIGltYWdlSGVpZ2h0ICogY29udGFpbmVySGVpZ2h0IC0gY29udGFpbmVyV2lkdGgpIC8gMik7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ21hcmdpbi1sZWZ0J10gPSAnJyArIG1hcmdpbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ2hlaWdodCddID0gJycgKyBjb250YWluZXJIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWyd3aWR0aCddID0gJycgKyBpbWFnZVdpZHRoICogY29udGFpbmVySGVpZ2h0IC8gaW1hZ2VIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydtYXJnaW4tdG9wJ10gPSAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hcmdpbiA9IC0oKGltYWdlSGVpZ2h0IC8gaW1hZ2VXaWR0aCAqIGNvbnRhaW5lcldpZHRoIC0gY29udGFpbmVySGVpZ2h0KSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydtYXJnaW4tdG9wJ10gPSAnJyArIG1hcmdpbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ2hlaWdodCddID0gJycgKyBpbWFnZUhlaWdodCAqIGNvbnRhaW5lcldpZHRoIC8gaW1hZ2VXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ3dpZHRoJ10gPSAnJyArIGNvbnRhaW5lcldpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snbWFyZ2luLWxlZnQnXSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbWFnZS5jc3MoY3NzUGFyYW1zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRJbWFnZShjb25maWcsIGxvYWRFcnJvcjogYm9vbGVhbikge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVybDogc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsb2FkRXJyb3IgJiYgISFjb25maWcuaW1hZ2VVcmwgJiYgIWxvYWRlZERlZmF1bHRJbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gY29uZmlnLmltYWdlVXJsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkRGVmYXVsdEltYWdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHVybCA9IGNvbmZpZy5kZWZhdWx0SW1hZ2VVcmw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh1cmwgJiYgJGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2UuYXR0cignc3JjJywgdXJsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGltYWdlQmxvY2suY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25OYXZIZWFkZXJDaGFuZ2VkKCRldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmICghY29uZmlnKSByZXR1cm47XHJcbiAgICAgICAgICAgIHNldEltYWdlKGNvbmZpZywgZmFsc2UpXHJcblxyXG4gICAgICAgICAgICAkc2NvcGUudGl0bGUgPSBjb25maWcudGl0bGU7XHJcbiAgICAgICAgICAgICRzY29wZS5zdWJ0aXRsZSA9IGNvbmZpZy5zdWJ0aXRsZTtcclxuICAgICAgICAgICAgJHNjb3BlLmltYWdlVXJsID0gY29uZmlnLmltYWdlVXJsO1xyXG4gICAgICAgICAgICAkc2NvcGUuaW1hZ2VDc3MgPSBjb25maWcuaW1hZ2VDc3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblVzZXJDbGljaygpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBOYXZVc2VyQ2xpY2tlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbmF2SGVhZGVyRGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaGVhZGVyL05hdkhlYWRlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogTmF2SGVhZGVyRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcE5hdkhlYWRlcicpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgncGlwTmF2SGVhZGVyJywgbmF2SGVhZGVyRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBOYXZIZWFkZXJDaGFuZ2VkRXZlbnQgPSAncGlwTmF2SGVhZGVyQ2hhbmdlZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2SGVhZGVyQ29uZmlnIHtcclxuICAgIC8vIEltYWdlIHVybFxyXG4gICAgcHVibGljIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICAvLyBJbWFnZSB1cmxcclxuICAgIHB1YmxpYyBkZWZhdWx0SW1hZ2VVcmw6IHN0cmluZztcclxuICAgIC8vIFRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIC8vIFN1YnRpdGxlXHJcbiAgICBwdWJsaWMgc3VidGl0bGU6IHN0cmluZztcclxuICAgIC8vIEhhbmRsZSBoZWFkZXIgY2xpY2sgZXZlbnRcclxuICAgIGNsaWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgLy8gRXZlbnQgbmFtZVxyXG4gICAgZXZlbnQ6IHN0cmluZ1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2SGVhZGVyU2VydmljZSB7XHJcbiAgICByZWFkb25seSBjb25maWc6IE5hdkhlYWRlckNvbmZpZztcclxuICAgIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgc3VidGl0bGU6IHN0cmluZztcclxuICAgIGNsaWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgZXZlbnQ6IHN0cmluZztcclxuXHJcbiAgICBzaG93KHRpdGxlOiBzdHJpbmcsIHN1YnRpdGxlOiBzdHJpbmcsIGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBoaWRlKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdkhlYWRlclByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBjb25maWc6IE5hdkhlYWRlckNvbmZpZztcclxuICAgIGRlZmF1bHRJbWFnZVVybDogc3RyaW5nO1xyXG4gICAgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgY2xpY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBldmVudDogc3RyaW5nO1xyXG5cclxuICAgIHNldCh0aXRsZTogc3RyaW5nLCBzdWJ0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgY2xlYXIoKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgTmF2SGVhZGVyU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdkhlYWRlckNvbmZpZztcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogTmF2SGVhZGVyQ29uZmlnLCAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkhlYWRlckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3VidGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnN1YnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc3VidGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbWFnZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpbWFnZVVybCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsaWNrKCk6ICgpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xpY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGljayh2YWx1ZTogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBldmVudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBldmVudCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyh0aXRsZTogc3RyaW5nLCBzdWJ0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSBzdWJ0aXRsZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBpbWFnZVVybDtcclxuXHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc1N0cmluZyhjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgdGhpcy5fcm9vdFNjb3BlLiRlbWl0KE5hdkhlYWRlckNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2SGVhZGVyUHJvdmlkZXIgaW1wbGVtZW50cyBJTmF2SGVhZGVyUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZIZWFkZXJDb25maWcgPSBuZXcgTmF2SGVhZGVyQ29uZmlnKCk7XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBOYXZIZWFkZXJTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkhlYWRlckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogTmF2SGVhZGVyQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsdWUgfHwgbmV3IE5hdkhlYWRlckNvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVmYXVsdEltYWdlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5kZWZhdWx0SW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkZWZhdWx0SW1hZ2VVcmwodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5kZWZhdWx0SW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN1YnRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN1YnRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGltYWdlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5pbWFnZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGltYWdlVXJsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsaWNrKCk6ICgpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xpY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGljayh2YWx1ZTogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZXZlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmV2ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZXZlbnQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQodGl0bGU6IHN0cmluZywgc3VidGl0bGU6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gc3VidGl0bGU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcblxyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcoY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IE5hdkhlYWRlclNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbiAgICAgXHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZIZWFkZXInKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBOYXZIZWFkZXInLCBOYXZIZWFkZXJQcm92aWRlcik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBOYXZIZWFkZXInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9OYXZIZWFkZXJTZXJ2aWNlJztcclxuaW1wb3J0ICcuL05hdkhlYWRlckRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL05hdkhlYWRlclNlcnZpY2UnOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gTmF2SWNvbkRpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCAkd2luZG93LCBwaXBOYXZJY29uKSB7XHJcbiAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLW5hdi1pY29uJyk7XHJcblxyXG4gICAgJHNjb3BlLmNvbmZpZyA9IHBpcE5hdkljb24uY29uZmlnO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCdwaXBOYXZJY29uQ2hhbmdlZCcsIG9uTmF2SWNvbkNoYW5nZWQpO1xyXG5cclxuICAgICRzY29wZS5vbk5hdkljb25DbGljayA9IG9uTmF2SWNvbkNsaWNrO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uTmF2SWNvbkNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICRzY29wZS5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25OYXZJY29uQ2xpY2soKSB7XHJcbiAgICAgICAgdmFyIGJyZWFkY3J1bWIsIGJhY2tDYWxsYmFjaztcclxuXHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbigkc2NvcGUuY29uZmlnLmNsaWNrKSkge1xyXG4gICAgICAgICAgICAvLyBFeGVjdXRlIG5hdiBpY29uIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICRzY29wZS5jb25maWcuY2xpY2soKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5jb25maWcuZXZlbnQpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCRzY29wZS5jb25maWcuZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLmNvbmZpZy50eXBlID09ICdtZW51Jykge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcE9wZW5TaWRlTmF2Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuY29uZmlnLnR5cGUgPT0gJ2JhY2snKSB7XHJcbiAgICAgICAgICAgICR3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBOYXZJY29uQ2xpY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5hdkljb25EaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgdHlwZTogJz1waXBUeXBlJyxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6ICc9cGlwSW1hZ2VVcmwnLFxyXG4gICAgICAgICAgICBpY29uOiAnPXBpcEljb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2ljb24vTmF2SWNvbi5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBOYXZJY29uRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdkljb24nKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwTmF2SWNvbicsIG5hdkljb25EaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IE5hdkljb25DaGFuZ2VkRXZlbnQgPSAncGlwTmF2SWNvbkNoYW5nZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdkljb25Db25maWcge1xyXG4gICAgLy8gVHlwZSBvZiBuYXYgaWNvbjogJ2JhY2snLCAnbWVudScsICdpbWFnZScgb3IgJ25vbmUnXHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgLy8gSW1hZ2UgdXJsXHJcbiAgICBwdWJsaWMgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIC8vIEljb24gbmFtZVxyXG4gICAgcHVibGljIGljb246IHN0cmluZztcclxuICAgIC8vIEhhbmRsZSBuYXYgaWNvbiBjbGljayBldmVudFxyXG4gICAgY2xpY2s6ICgpID0+IHZvaWQ7XHJcbiAgICAvLyBFdmVudCBuYW1lXHJcbiAgICBldmVudDogc3RyaW5nXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOYXZJY29uU2VydmljZSB7XHJcbiAgICByZWFkb25seSBjb25maWc6IE5hdkljb25Db25maWc7XHJcblxyXG4gICAgc2hvd01lbnUoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIHNob3dJY29uKGljb246IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIHNob3dCYWNrKGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzaG93SW1hZ2UoaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIGhpZGUoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2SWNvblByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBjb25maWc6IE5hdkljb25Db25maWc7XHJcblxyXG4gICAgc2V0TWVudShjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgc2V0SWNvbihpY29uOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzZXRCYWNrKGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzZXRJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgY2xlYXIoKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgTmF2SWNvblNlcnZpY2UgaW1wbGVtZW50cyBJTmF2SWNvblNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZJY29uQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBOYXZJY29uQ29uZmlnLCAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkljb25Db25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNTdHJpbmcoY2FsbGJhY2tPckV2ZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dNZW51KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ21lbnUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0ljb24oaWNvbjogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpY29uJztcclxuICAgICAgICB0aGlzLl9jb25maWcuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93QmFjayhjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdiYWNrJztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpbWFnZSc7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KG51bGwpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoTmF2SWNvbkNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2SWNvblByb3ZpZGVyIGltcGxlbWVudHMgSU5hdkljb25Qcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdkljb25Db25maWcgPSBuZXcgTmF2SWNvbkNvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogTmF2SWNvblNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogTmF2SWNvbkNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogTmF2SWNvbkNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBOYXZJY29uQ29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc1N0cmluZyhjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNZW51KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ21lbnUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEljb24oaWNvbjogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpY29uJztcclxuICAgICAgICB0aGlzLl9jb25maWcuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QmFjayhjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdiYWNrJztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpbWFnZSc7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgTmF2SWNvblNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbiAgICAgXHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZJY29uJylcclxuICAgIC5wcm92aWRlcigncGlwTmF2SWNvbicsIE5hdkljb25Qcm92aWRlcik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBOYXZJY29uJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9OYXZJY29uU2VydmljZSc7XHJcbmltcG9ydCAnLi9OYXZJY29uRGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vTmF2SWNvblNlcnZpY2UnO1xyXG4iLCLvu78ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJy4vZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlcic7XHJcbmltcG9ydCAnLi9sYW5ndWFnZS9MYW5ndWFnZVBpY2tlckRpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9kcm9wZG93bi9Ecm9wZG93bkRpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi90YWJzL1RhYnNEaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vYWN0aW9ucyc7XHJcbmltcG9ydCAnLi9hcHBiYXInO1xyXG5pbXBvcnQgJy4vc2VhcmNoJztcclxuaW1wb3J0ICcuL2JyZWFkY3J1bWInO1xyXG5pbXBvcnQgJy4vc2lkZW5hdic7XHJcbmltcG9ydCAnLi9oZWFkZXInO1xyXG5pbXBvcnQgJy4vbWVudSc7XHJcbmltcG9ydCAnLi9pY29uJztcclxuaW1wb3J0ICcuL2NvbW1vbi9OYXZTZXJ2aWNlJztcclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdicsIFtcclxuICAgICAgICAncGlwTmF2U2VydmljZScsXHJcbiAgICAgICAgJ3BpcERyb3Bkb3duJyxcclxuICAgICAgICAncGlwVGFicycsXHJcbiAgICAgICAgJ3BpcEFwcEJhcicsXHJcbiAgICAgICAgJ3BpcFNlYXJjaEJhcicsXHJcbiAgICAgICAgJ3BpcE5hdkljb24nLFxyXG4gICAgICAgICdwaXBCcmVhZGNydW1iJyxcclxuICAgICAgICAncGlwQWN0aW9ucycsIFxyXG4gICAgICAgICdwaXBTaWRlTmF2JyxcclxuICAgICAgICAncGlwTmF2TWVudScsXHJcbiAgICAgICAgJ3BpcE5hdkhlYWRlcidcclxuICAgIF0pO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9hY3Rpb25zJztcclxuZXhwb3J0ICogZnJvbSAnLi9hcHBiYXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2JyZWFkY3J1bWInO1xyXG5leHBvcnQgKiBmcm9tICcuL3NlYXJjaCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2lkZW5hdic7XHJcbmV4cG9ydCAqIGZyb20gJy4vaWNvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbWVudSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaGVhZGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb21tb24vTmF2U2VydmljZSc7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuY2xhc3MgTGFuZ3VhZ2VQaWNrZXJEaXJlY3RpdmVDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgX3RyYW5zbGF0ZTogYW55O1xyXG4gICAgcHJpdmF0ZSBfdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkc2NvcGU6IGFueSwgXHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueSwgXHJcbiAgICAgICAgJGF0dHJzOiBhbnksIFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCBcclxuICAgICAgICAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxyXG4gICAgICAgICRpbmplY3RvcjogYW55XHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSAkdGltZW91dDtcclxuICAgICAgICB0aGlzLl90cmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1sYW5ndWFnZS1waWNrZXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZXMgPSAkc2NvcGUubGFuZ3VhZ2VzO1xyXG5cclxuICAgICAgICAvLyBUb2RvOiBXaGVyZSBpcyB0aGlzIGV2ZW50IGNvbWluZyBmcm9tPyBXaHkgbm90IHRocm91Z2ggc2VydmljZSBvciBhdHRyaWJ1dGU/XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcFNldExhbmd1YWdlcycsIHRoaXMuc2V0TGFuZ3VhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGFuZ3VhZ2VzOiBzdHJpbmdbXSA9IFsnZW4nLCAncnUnXTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxhbmd1YWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFuc2xhdGUgPyB0aGlzLl90cmFuc2xhdGUubGFuZ3VhZ2UgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRMYW5ndWFnZXMobGFuZykge1xyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VzID0gbGFuZy5sZW5ndGggPiAwID8gbGFuZyA6IFsnZW4nLCAncnUnXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25MYW5ndWFnZUNsaWNrKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYW5zbGF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlLmxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gbGFuZ3VhZ2VQaWNrZXJEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbGFuZ3VhZ2VzOiAnPWxhbmd1YWdlcycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdsYW5ndWFnZS9MYW5ndWFnZVBpY2tlci5odG1sJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IExhbmd1YWdlUGlja2VyRGlyZWN0aXZlQ29udHJvbGxlcixcclxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcExhbmd1YWdlUGlja2VyJywgW1xyXG4gICAgICAgICduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcydcclxuICAgIF0pXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBMYW5ndWFnZVBpY2tlcicsIGxhbmd1YWdlUGlja2VyRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gTmF2TWVudURpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJHJvb3RTY29wZSwgJHdpbmRvdywgJGxvY2F0aW9uLCAkdGltZW91dCwgJGluamVjdG9yLCBwaXBTaWRlTmF2LCBwaXBOYXZNZW51KSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXIgYW5pbWF0aW9uRHVyYXRpb24gPSA0NTAsXHJcbiAgICAgICAgICAgIHBpcFNpZGVOYXZFbGVtZW50ID0gJGVsZW1lbnQucGFyZW50KCkucGFyZW50KCk7XHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LW1lbnUnKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlY3Rpb25zID0gJHNjb3BlLnNlY3Rpb25zIHx8IHBpcE5hdk1lbnUuc2VjdGlvbnM7XHJcbiAgICAgICAgLy8gJHNjb3BlLnNob3dUb29sdGlwID0gdHJ1ZTtcclxuICAgICAgICAvLyBwaXBOYXZNZW51LnNlY3Rpb25zID0gJHNjb3BlLnNlY3Rpb25zO1xyXG4gICAgICAgIHNldENvbGxhcHNpYmxlKCk7XHJcbiAgICAgICAgLy8gdG9kbyBzZXQgZnJvbSBzZXJ2aWNlc1xyXG4gICAgICAgICRzY29wZS5kZWZhdWx0SWNvbiA9IHBpcE5hdk1lbnUuZGVmYXVsdEljb247XHJcblxyXG4gICAgICAgIG9uU3RhdGVDaGFuZ2VkKG51bGwsIHBpcFNpZGVOYXYuc3RhdGUpO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwTmF2TWVudUNoYW5nZWQnLCBvbkNvbmZpZ0NoYW5nZWQpO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGVDaGFuZ2VkJywgb25TdGF0ZUNoYW5nZWQpO1xyXG5cclxuICAgICAgICAkc2NvcGUuaXRlbVZpc2libGUgPSBpc0hpZGRlbjtcclxuICAgICAgICAkc2NvcGUuY2xpY2tMaW5rID0gY2xpY2tMaW5rO1xyXG4gICAgICAgICRzY29wZS5pc1NlY3Rpb25FbXB0eSA9IGlzU2VjdGlvbkVtcHR5O1xyXG4gICAgICAgICRzY29wZS5vbkV4cGFuZCA9IG9uRXhwYW5kO1xyXG4gICAgICAgICRzY29wZS5pc0FjdGl2ZSA9IGlzQWN0aXZlO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldENvbGxhcHNpYmxlKCkge1xyXG4gICAgICAgICAgICB2YXIgY29sbGFwc2VkO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKCRzY29wZS5jb2xsYXBzZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQgPSAkc2NvcGUuY29sbGFwc2VkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQgPSAkc2NvcGUuY29sbGFwc2VkICE9PSBmYWxzZSAmJiAkc2NvcGUuY29sbGFwc2VkICE9PSAnZmFsc2UnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkV4cGFuZCgpIHtcclxuICAgICAgICAgICAgaWYgKCEkc2NvcGUuaXNDb2xsYXBzZWQpIHsgcmV0dXJuIH1cclxuXHJcbiAgICAgICAgICAgICRzY29wZS5leHBhbmRlZCA9ICEkc2NvcGUuZXhwYW5kZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2RWxlbWVudC5yZW1vdmVDbGFzcygncGlwLXN0aWNreS1uYXYtc21hbGwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXZFbGVtZW50LmFkZENsYXNzKCdwaXAtc3RpY2t5LW5hdi1zbWFsbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGVtaXQoJ3BpcE5hdkV4cGFuZGVkJywgJHNjb3BlLmV4cGFuZGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlzSGlkZGVuKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gJiYgaXRlbS5hY2Nlc3MgJiYgIWl0ZW0uYWNjZXNzKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaXNTZWN0aW9uRW1wdHkobGlua0NvbGxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgIF8uZWFjaChsaW5rQ29sbGVjdGlvbiwgZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNIaWRkZW4obGluaykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25Db25maWdDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5zZWN0aW9ucyA9IGNvbmZpZy5zZWN0aW9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU3RhdGVDaGFuZ2VkKGV2ZW50LCBzdGF0ZSkge1xyXG4gICAgICAgICAgICAvLyBTUz4gWW91IHNoYWxsIG5vdCBzZXQgaXQgaW50byB0aGUgbWVudSBzdGF0ZS4gSW5zdGVhZCBpdCBzaGFsbCBiZSBjb250cm9sbGVkIGJ5IHRoZSBzdGF0ZSBvZiBTaWRlbmF2XHJcbiAgICAgICAgICAgIC8vcGlwTmF2TWVudS5jb2xsYXBzZWQoc3RhdGUuZXhwYW5kKTtcclxuICAgICAgICAgICAgaWYgKCFzdGF0ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gc3RhdGUuZXhwYW5kO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXhwYW5kZWQgPSBzdGF0ZS5pc0V4cGFuZGVkO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXhwYW5kZWRCdXR0b24gPSBzdGF0ZS5leHBhbmRlZEJ1dHRvbjtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5zaWRlTmF2U3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlzQWN0aXZlKGxpbmspIHtcclxuICAgICAgICAgICAgaWYgKGxpbmsucGFyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSA/ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICgkc3RhdGUgIT0gbnVsbCAmJiAkc3RhdGUuaW5jbHVkZXMobGluay5wYXJlbnRTdGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5rLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmhhcygnJHN0YXRlJykgPyAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlICE9IG51bGwgJiYgJHN0YXRlLmluY2x1ZGVzKGxpbmsuc3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluay5ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluay5ocmVmLnNwbGl0KCc/JylbMF0gPT09ICR3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluay51cmwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLnVybC5zcGxpdCgvW1xccy8/XSsvKVsxXSA9PT0gJGxvY2F0aW9uLnVybCgpLnNwbGl0KC9bXFxzLz9dKy8pWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbGlja0xpbmsoZXZlbnQsIGxpbmspIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmsuaHJlZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdID09PSAkd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbmsuaHJlZjtcclxuICAgICAgICAgICAgICAgIH0sIGFuaW1hdGlvbkR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobGluay51cmwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLnVybC5zcGxpdCgvW1xccy8/XSsvKVsxXSA9PT0gJGxvY2F0aW9uLnVybCgpLnNwbGl0KC9bXFxzLz9dKy8pWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnVybChsaW5rLnVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCBhbmltYXRpb25EdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxpbmsuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSA/ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlICE9IG51bGwgJiYgJHN0YXRlLmN1cnJlbnQubmFtZSA9PT0gbGluay5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmdldCgnJHN0YXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhsaW5rLnN0YXRlLCBsaW5rLnN0YXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBhbmltYXRpb25EdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxpbmsuZXZlbnQpXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QobGluay5ldmVudCwgbGluayk7XHJcblxyXG4gICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5hdk1lbnVEaXJlY3RpdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZWN0aW9uczogJz89cGlwU2VjdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgLy8gY29sbGFwc2VkOiAnPXBpcENvbGxhcHNlZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbWVudS9OYXZNZW51Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBOYXZNZW51RGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcE5hdk1lbnUnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcE5hdk1lbnUnLCBuYXZNZW51RGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBOYXZNZW51Q2hhbmdlZEV2ZW50ID0gJ3BpcE5hdk1lbnVDaGFuZ2VkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZNZW51TGluayB7XHJcbiAgICAvLyBOYW1lIHRvIHJlZmVyIHRvIHRoZSBpdGVtXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgLy8gTGluayB2aXNpYmxlIHRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIC8vIEljb24gbmFtZSBmcm9tICRpY29uUHJvdmlkZXJcclxuICAgIHB1YmxpYyBpY29uPzogc3RyaW5nO1xyXG4gICAgLy8gQ291bnRlciBiYWRnZVxyXG4gICAgcHVibGljIGNvdW50PzogbnVtYmVyO1xyXG4gICAgLy8gY2xhc3MgZm9yIGJhZGdlIHN0eWxlXHJcbiAgICBwdWJsaWMgYmFkZ2VTdHlsZT86IHN0cmluZztcclxuICAgIC8vIEFjY2VzcyBmdW5jdGlvblxyXG4gICAgcHVibGljIGFjY2Vzcz86IChsaW5rOiBOYXZNZW51TGluaykgPT4gYm9vbGVhbjtcclxuICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcbiAgICBwdWJsaWMgaHJlZj86IHN0cmluZztcclxuICAgIC8vICRsb2NhdGlvbi51cmxcclxuICAgIHB1YmxpYyB1cmw/OiBzdHJpbmc7XHJcbiAgICAvLyAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zKVxyXG4gICAgcHVibGljIHN0YXRlPzogc3RyaW5nO1xyXG4gICAgLy8gUGFyYW1ldGVycyBmb3IgJHN0YXRlLmdvKHN0YXRlLCBzdGF0ZVBhcmFtcylcclxuICAgIHB1YmxpYyBzdGF0ZVBhcmFtcz86IGFueTtcclxuICAgIC8vIHBhcmVudCBzdGF0ZSBvciBwYXJlbnQgc3RhdGUgZm9yIHNlbGVjdGlvbiBpdGVtIFxyXG4gICAgcHVibGljIHBhcmVudFN0YXRlPzogc3RyaW5nO1xyXG4gICAgLy8gJHJvb3RTY29wZS5icm9hZGNhc3QoZXZlbnQpXHJcbiAgICBwdWJsaWMgZXZlbnQ/OiBzdHJpbmc7XHJcbiAgICAvLyBDbGljayBjYWxsYmFja1xyXG4gICAgcHVibGljIGNsaWNrPzogKGxpbms6IE5hdk1lbnVMaW5rKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2TWVudVNlY3Rpb24ge1xyXG4gICAgLy8gTmFtZSB0byByZWZlciB0byB0aGUgc2VjdGlvblxyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIC8vIFNlY3Rpb24gdmlzaWJsZSB0aXRsZVxyXG4gICAgcHVibGljIHRpdGxlPzogc3RyaW5nO1xyXG4gICAgLy8gSWNvbiBuYW1lIGZyb20gJGljb25Qcm92aWRlclxyXG4gICAgcHVibGljIGljb24/OiBzdHJpbmc7XHJcbiAgICAvLyBMaW5rcyBzaG93biBpbiB0aGUgc2VjdGlvblxyXG4gICAgcHVibGljIGxpbmtzOiBOYXZNZW51TGlua1tdO1xyXG4gICAgLy8gQWNjZXNzIGZ1bmN0aW9uXHJcbiAgICBwdWJsaWMgYWNjZXNzPzogKHNlY3Rpb246IE5hdk1lbnVTZWN0aW9uKSA9PiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2TWVudUNvbmZpZyB7XHJcbiAgICBzZWN0aW9uczogTmF2TWVudVNlY3Rpb25bXTtcclxuICAgIGRlZmF1bHRJY29uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdk1lbnVTZXJ2aWNlIHtcclxuICAgIHNlY3Rpb25zOiBOYXZNZW51U2VjdGlvbltdO1xyXG4gICAgZGVmYXVsdEljb246IHN0cmluZztcclxuICAgIHVwZGF0ZUNvdW50KGxpbms6IHN0cmluZywgY291bnQ6IG51bWJlcik6IHZvaWQ7IFxyXG4gICAgdXBkYXRlQmFkZ2VTdHlsZShsaW5rOiBzdHJpbmcsIHN0eWxlOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgY2xlYXJDb3VudHMoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2TWVudVByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBzZWN0aW9uczogTmF2TWVudVNlY3Rpb25bXTtcclxuICAgIGRlZmF1bHRJY29uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIE5hdk1lbnVTZXJ2aWNlIGltcGxlbWVudHMgSU5hdk1lbnVTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogTmF2TWVudUNvbmZpZztcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvbmZpZzogTmF2TWVudUNvbmZpZyxcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWN0aW9ucygpOiBOYXZNZW51U2VjdGlvbltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VjdGlvbnModmFsdWU6IE5hdk1lbnVTZWN0aW9uW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2VjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVmYXVsdEljb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmRlZmF1bHRJY29uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVCYWRnZVN0eWxlKGxpbms6IHN0cmluZywgc3R5bGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChsaW5rID09IG51bGwgfHwgIV8uaXNTdHJpbmcoc3R5bGUpKSByZXR1cm47XHJcblxyXG4gICAgICAgIF8uZWFjaCh0aGlzLl9jb25maWcuc2VjdGlvbnMsIChzKSA9PiB7XHJcbiAgICAgICAgICAgIF8uZWFjaChzLmxpbmtzLCAobCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGwubmFtZSA9PSBsaW5rKVxyXG4gICAgICAgICAgICAgICAgICAgIGwuYmFkZ2VTdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRlZmF1bHRJY29uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZGVmYXVsdEljb24gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDb3VudChsaW5rOiBzdHJpbmcsIGNvdW50OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAobGluayA9PSBudWxsIHx8ICFfLmlzTnVtYmVyKGNvdW50KSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnNlY3Rpb25zLCAocykgPT4ge1xyXG4gICAgICAgICAgICBfLmVhY2gocy5saW5rcywgKGwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsLm5hbWUgPT0gbGluaylcclxuICAgICAgICAgICAgICAgICAgICBsLmNvdW50ID0gY291bnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckNvdW50cygpOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnNlY3Rpb25zLCAocykgPT4ge1xyXG4gICAgICAgICAgICBfLmVhY2gocy5saW5rcywgKGwpID0+IHtcclxuICAgICAgICAgICAgICAgIGwuY291bnQgPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDaGFuZ2VFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoTmF2TWVudUNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2TWVudVByb3ZpZGVyIGltcGxlbWVudHMgSU5hdk1lbnVQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdk1lbnVDb25maWcgPSB7XHJcbiAgICAgICAgc2VjdGlvbnM6IFtdLFxyXG4gICAgICAgIGRlZmF1bHRJY29uOiAnaWNvbnM6Zm9sZGVyJ1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IE5hdk1lbnVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VjdGlvbnMoKTogTmF2TWVudVNlY3Rpb25bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlY3Rpb25zKHZhbHVlOiBOYXZNZW51U2VjdGlvbltdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZWZhdWx0SWNvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZGVmYXVsdEljb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkZWZhdWx0SWNvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmRlZmF1bHRJY29uID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBOYXZNZW51U2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZNZW51JylcclxuICAgIC5wcm92aWRlcigncGlwTmF2TWVudScsIE5hdk1lbnVQcm92aWRlcik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBOYXZNZW51JywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9OYXZNZW51U2VydmljZSc7XHJcbmltcG9ydCAnLi9OYXZNZW51RGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vTmF2TWVudVNlcnZpY2UnOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IFNlYXJjaENvbmZpZyB9IGZyb20gJy4vU2VhcmNoU2VydmljZSc7XHJcbmltcG9ydCB7IElTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9TZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VhcmNoQ2hhbmdlZEV2ZW50IH0gZnJvbSAnLi9TZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VhcmNoQWN0aXZhdGVkRXZlbnQgfSBmcm9tICcuL1NlYXJjaFNlcnZpY2UnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5jbGFzcyBTZWFyY2hCYXJDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9lbGVtZW50OiBhbnk7XHJcblxyXG4gICAgcHVibGljIGNvbmZpZzogU2VhcmNoQ29uZmlnO1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzZWFyY2g6IGFueSA9IHsgdGV4dDogJycgfTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKFxyXG4gICAgICAgICRlbGVtZW50LCBcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSwgXHJcbiAgICAgICAgcGlwU2VhcmNoOiBJU2VhcmNoU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSAkZWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zZWFyY2gtYmFyJyk7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gcGlwU2VhcmNoLmNvbmZpZztcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oU2VhcmNoQ2hhbmdlZEV2ZW50LCAoZXZlbnQsIGNvbmZpZykgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5vblNlYXJjaENoYW5nZWQoZXZlbnQsIGNvbmZpZyk7IFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGVDaGFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZWxlbWVudCcsIHRoaXMuX2VsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9lbGVtZW50LmFkZENsYXNzKCd3LXN0cmV0Y2gnKTtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5hZGRDbGFzcygndy1zdHJldGNoJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQucGFyZW50KCkuYWRkQ2xhc3MoJ3BpcC1zZWFyY2gtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbGVtZW50JywgdGhpcy5fZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2VsZW1lbnQucmVtb3ZlQ2xhc3MoJ3ctc3RyZXRjaCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUNsYXNzKCd3LXN0cmV0Y2gnKTtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5wYXJlbnQoKS5yZW1vdmVDbGFzcygncGlwLXNlYXJjaC1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNlYXJjaENoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoLnRleHQgPSAnJztcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmb2N1c1RleHQoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gJCgnLnBpcC1zZWFyY2gtdGV4dCcpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2gudGV4dCA9IHRoaXMuY29uZmlnLmNyaXRlcmlhO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mb2N1c1RleHQoKTtcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xpY2soKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaCA9IHRoaXMuc2VhcmNoLnRleHQ7XHJcblxyXG4gICAgICAgIHRoaXMuc2VhcmNoLnRleHQgPSAnJztcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jYWxsYmFjaylcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuY2FsbGJhY2soc2VhcmNoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KFNlYXJjaEFjdGl2YXRlZEV2ZW50LCBzZWFyY2gpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2gudGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaC50ZXh0ID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUZXh0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbktleURvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIC8vIEVudGVyIHByZXNzZWRcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpXHJcbiAgICAgICAgICAgIHRoaXMub25DbGljaygpO1xyXG4gICAgICAgIC8vIEVTQyBwcmVzc2VkXHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzZWFyY2hCYXJEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VhcmNoL1NlYXJjaEJhci5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBTZWFyY2hCYXJDb250cm9sbGVyLFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcFNlYXJjaEJhcicpXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBTZWFyY2hCYXInLCBzZWFyY2hCYXJEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IE9wZW5TZWFyY2hFdmVudCA9ICdwaXBPcGVuU2VhcmNoJztcclxuZXhwb3J0IGxldCBDbG9zZVNlYXJjaEV2ZW50ID0gJ3BpcENsb3NlU2VhcmNoJztcclxuZXhwb3J0IGxldCBTZWFyY2hDaGFuZ2VkRXZlbnQgPSAncGlwU2VhcmNoQ2hhbmdlZCc7XHJcbmV4cG9ydCBsZXQgU2VhcmNoQWN0aXZhdGVkRXZlbnQgPSAncGlwU2VhcmNoQWN0aXZhdGVkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hDb25maWcge1xyXG4gICAgLy8gU2VhcmNoIHZpc2libGVcclxuICAgIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgLy8gU2VhcmNoIGNyaXRlcmlhXHJcbiAgICBwdWJsaWMgY3JpdGVyaWE6IHN0cmluZztcclxuICAgIC8vIEN1c3RvbSBzZWFyY2ggcGFyYW1ldGVyc1xyXG4gICAgcHVibGljIHBhcmFtczogYW55O1xyXG4gICAgLy8gSGlzdG9yeSBmb3Igc2VhcmNoIGF1dG9jb21wbGV0ZVxyXG4gICAgcHVibGljIGhpc3Rvcnk6IHN0cmluZ1tdO1xyXG4gICAgLy8gQ2FsbGJhY2sgZm9yIHNlYXJjaFxyXG4gICAgY2FsbGJhY2s6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZWFyY2hTZXJ2aWNlIHtcclxuICAgIGNvbmZpZzogU2VhcmNoQ29uZmlnO1xyXG4gICAgY3JpdGVyaWE6IHN0cmluZztcclxuICAgIHBhcmFtczogYW55O1xyXG4gICAgaGlzdG9yeTogc3RyaW5nW107XHJcbiAgICBjYWxsYmFjazogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQ7XHJcblxyXG4gICAgc2V0KGNhbGxiYWNrOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZCwgY3JpdGVyaWE/OiBzdHJpbmcsIHBhcmFtcz86IGFueSwgaGlzdG9yeT86IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIGNsZWFyKCk6IHZvaWQ7XHJcbiAgICBvcGVuKCk6IHZvaWQ7XHJcbiAgICBjbG9zZSgpOiB2b2lkO1xyXG4gICAgdG9nZ2xlKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNlYXJjaFByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7ICAgIFxyXG59XHJcblxyXG5cclxuY2xhc3MgU2VhcmNoU2VydmljZSBpbXBsZW1lbnRzIElTZWFyY2hTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogU2VhcmNoQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBTZWFyY2hDb25maWcsXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbihPcGVuU2VhcmNoRXZlbnQsICgpID0+IHsgdGhpcy5vcGVuIH0pO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKENsb3NlU2VhcmNoRXZlbnQsICgpID0+IHsgdGhpcy5jbG9zZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBTZWFyY2hDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjcml0ZXJpYSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY3JpdGVyaWE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjcml0ZXJpYSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmFtcygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFyYW1zKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFyYW1zID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhpc3RvcnkoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaGlzdG9yeTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGhpc3RvcnkodmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmhpc3RvcnkgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2FsbGJhY2soKTogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjYWxsYmFjayh2YWx1ZTogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2FsbGJhY2sgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQoY2FsbGJhY2s6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkLCBjcml0ZXJpYT86IHN0cmluZywgcGFyYW1zPzogYW55LCBoaXN0b3J5Pzogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSBjcml0ZXJpYTtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5oaXN0b3J5ID0gaGlzdG9yeTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcmFtcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTsgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gZmFsc2U7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpOyAgICAgICAgICAgICAgICBcclxuICAgIH0gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgcHVibGljIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9ICF0aGlzLl9jb25maWcudmlzaWJsZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpOyAgICAgICAgICAgICAgICBcclxuICAgIH0gICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoU2VhcmNoQ2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTZWFyY2hQcm92aWRlciBpbXBsZW1lbnRzIElTZWFyY2hQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IFNlYXJjaENvbmZpZyA9IG5ldyBTZWFyY2hDb25maWcoKTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IFNlYXJjaFNlcnZpY2UgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9IFxyXG59XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcFNlYXJjaEJhcicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcFNlYXJjaCcsIFNlYXJjaFByb3ZpZGVyKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcFNlYXJjaEJhcicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVHJhbnNsYXRlJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vU2VhcmNoU2VydmljZSc7XHJcbmltcG9ydCAnLi9TZWFyY2hCYXJEaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9TZWFyY2hTZXJ2aWNlJzsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbiAgICBmdW5jdGlvbiBTaWRlTmF2RGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkcm9vdFNjb3BlLCAkaW5qZWN0b3IsICRtZE1lZGlhLCAkdGltZW91dCwgcGlwU2lkZU5hdikge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgLy8gdmFyIHBpcE1lZGlhID0gJG1kTWVkaWEsIFxyXG4gICAgICAgIHZhciBwaXBNZWRpYSA9ICRpbmplY3Rvci5oYXMoJ3BpcE1lZGlhJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBNZWRpYScpIDogbnVsbCxcclxuICAgICAgICAgICAgbWFpbkNvbnRhaW5lciA9ICcucGlwLW1haW4nLFxyXG4gICAgICAgICAgICBiaWdXaWR0aCA9IDMyMCwgLy8gZXhwYW5kZWQgc2lkZW5hdiB3aWR0aFxyXG4gICAgICAgICAgICBtaWRkbGVXaWR0aCA9IDI0MCxcclxuICAgICAgICAgICAgc21hbGxXaWR0aCA9IDcyLCAvLyBzaHJpbmsgc2lkZW5hdiB3aWR0aFxyXG4gICAgICAgICAgICBpc1Jlc2l6aW5nID0gZmFsc2UsXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uID0gNjAwLFxyXG4gICAgICAgICAgICBtZWRpYUJyZWFrcG9pbnRzO1xyXG5cclxuICAgICAgICBwaXBNZWRpYSA9IHBpcE1lZGlhICE9PSB1bmRlZmluZWQgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG5cclxuICAgICAgICAkc2NvcGUubmF2U3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZTogeyAvLyBtZWRpYShzbSwgeHMpXHJcbiAgICAgICAgICAgICAgICBpZDogJ3RvZ2dsZScsXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogJ3NpZGVuYXYtbW9iaWxlJywgLy8gY2hhbmdlIHNpemUsIGNvbG9yLCBzZWxlY3RlZD9cclxuICAgICAgICAgICAgICAgIHNob3dIZWFkZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpc0xvY2tlZE9wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kZWRCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dJY29uVG9vbHR5cGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNtYWxsOiB7IC8vIG1lZGlhKG1kKVxyXG4gICAgICAgICAgICAgICAgaWQ6ICdzbWFsbCcsXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogJ3BpcC1zdGlja3ktbmF2LXNtYWxsIHNpZGVuYXYtc21hbGxkZXNrdG9wJywgLy8gY2hhbmdlIHNpemUsIGNvbG9yLCBzZWxlY3RlZD9cclxuICAgICAgICAgICAgICAgIHNob3dIZWFkZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNMb2NrZWRPcGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kZWRCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBleHBhbmQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0ljb25Ub29sdHlwZTogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXJnZTogeyAvLyBtZWRpYShsZylcclxuICAgICAgICAgICAgICAgIGlkOiAnbGFyZ2UnLFxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6ICdzaWRlbmF2LXNtYWxsZGVza3RvcCcsIC8vIGNoYW5nZSBzaXplLCBjb2xvciwgc2VsZWN0ZWQ/XHJcbiAgICAgICAgICAgICAgICBzaG93SGVhZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGlzTG9ja2VkT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZGVkQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dJY29uVG9vbHR5cGU6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeGxhcmdlOiB7IC8vIG1lZGlhKHhsKVxyXG4gICAgICAgICAgICAgICAgaWQ6ICd4bGFyZ2UnLFxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6ICdzaWRlbmF2LWRlc2t0b3AnLCAvLyBjaGFuZ2Ugc2l6ZSwgY29sb3IsIHNlbGVjdGVkP1xyXG4gICAgICAgICAgICAgICAgc2hvd0hlYWRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0xvY2tlZE9wZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBleHBhbmRlZEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0V4cGFuZGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0ljb25Ub29sdHlwZTogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1lZGlhQnJlYWtwb2ludHMgPSBzZXRCcmVha3BvaW50cygpO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXN0aWNreS1zaWRlbmF2Jyk7XHJcblxyXG4gICAgICAgIGlmIChwaXBTaWRlTmF2LmNvbmZpZyAmJiBwaXBTaWRlTmF2LmNvbmZpZy50eXBlICE9ICdwb3B1cCcpIHtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0U2lkZU5hdmVTdGF0ZSgpXHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgd2luZG93UmVzaXplID0gXy5kZWJvdW5jZShzZXRTaWRlTmF2ZVN0YXRlLCAxMCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBNYWluUmVzaXplZCcsIHdpbmRvd1Jlc2l6ZSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGUnLCBvblNpZGVOYXZTdGF0ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXNSZXNpemluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2lkZW5hdlN0YXRlID0gbnVsbDtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhdGUoJ3RvZ2dsZScpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBOYXZJY29uQ2xpY2tlZCcsIG9uTmF2SWNvbkNsaWNrKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdkNoYW5nZWQnLCBvblNpZGVOYXZDaGFuZ2VkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGZ1bmN0aW9uIHNldEJyZWFrcG9pbnRzKCkge1xyXG4gICAgICAgICAgICBpZiAoIXBpcE1lZGlhIHx8ICFhbmd1bGFyLmlzT2JqZWN0KHBpcE1lZGlhLmJyZWFrcG9pbnRzKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeHM6IDYzOSwgc206IDk1OSwgbWQ6IDEwMjQsIGxnOiAxOTE5IH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGlwTWVkaWEuYnJlYWtwb2ludHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU2lkZU5hdkNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uTmF2SWNvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHBpcFNpZGVOYXYub3BlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25TaWRlTmF2U3RhdGUoZXZlbnQsIHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHN0YXRlKSAmJiAkc2NvcGUubmF2U3RhdGVbc3RhdGVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNldFN0YXRlKHN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U2lkZU5hdmVTdGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHBpcFNpZGVOYXYuY29uZmlnICYmIHBpcFNpZGVOYXYuY29uZmlnLnR5cGUgPT0gJ3BvcHVwJykgeyByZXR1cm4gfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlzUmVzaXppbmcpIHtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KHNldFNpZGVOYXZlU3RhdGUsIGFuaW1hdGlvbkR1cmF0aW9uKTsgLy8gZm9yIFxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG1haW5XaWR0aCA9ICQobWFpbkNvbnRhaW5lcikuaW5uZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICBsZXQgc2lkZU5hdldpZHRoID0gJCgnLnBpcC1zdGlja3ktc2lkZW5hdicpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRXaWR0aCA9IHNpZGVOYXZXaWR0aCA/IHNpZGVOYXZXaWR0aCArIDIgOiAwOyAvLyBhZGQgYm9yZGVyIHdpZHRoXHJcblxyXG4gICAgICAgICAgICBpZiAobWFpbldpZHRoICsgY3VycmVudFdpZHRoIDwgbWVkaWFCcmVha3BvaW50cy5zbSApIHtcclxuICAgICAgICAgICAgICAgIHNldFN0YXRlKCd0b2dnbGUnLCApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChtYWluV2lkdGggKyBjdXJyZW50V2lkdGggPCBtZWRpYUJyZWFrcG9pbnRzLm1kICkge1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhdGUoJ3NtYWxsJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgaWYgKG1haW5XaWR0aCArIGN1cnJlbnRXaWR0aCA8IG1lZGlhQnJlYWtwb2ludHMubGcgKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZSgnbGFyZ2UnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFN0YXRlKCd4bGFyZ2UnKTsgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U3RhdGUoc3RhdGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoaXNSZXNpemluZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNpZGVuYXZTdGF0ZSAmJiAkc2NvcGUuc2lkZW5hdlN0YXRlLmlkID09IHN0YXRlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgIT0gJ3RvZ2dsZScpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdzaWRlbmF2LW1vYmlsZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgIT0gJ3NtYWxsJykge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LXNtYWxsJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSAhPSAneGxhcmdlJykge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtZGVza3RvcCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgIT0gJ2xhcmdlJykge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtc21hbGxkZXNrdG9wJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlzUmVzaXppbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT0gJ3RvZ2dsZScpIHtcclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc2NvcGUuc2lkZW5hdlN0YXRlID0gJHNjb3BlLm5hdlN0YXRlW3N0YXRlXTtcclxuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJHNjb3BlLnNpZGVuYXZTdGF0ZS5hZGRDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBwaXBTaWRlTmF2LnN0YXRlID0gJHNjb3BlLnNpZGVuYXZTdGF0ZTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgc2lkZU5hdiBTdGF0ZVxyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTaWRlTmF2ZVN0YXRlKClcclxuICAgICAgICAgICAgfSwgMTUpO1xyXG5cclxuICAgICAgICAgICAgLy8gY29tcGxldGUgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlzUmVzaXppbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgYW5pbWF0aW9uRHVyYXRpb24pOyAvL2FuaW1hdGlvbkR1cmF0aW9uXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaWRlTmF2RGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNjb3BlOiB0cnVlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NpZGVuYXYvU2lkZU5hdi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogU2lkZU5hdkRpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBTaWRlTmF2JylcclxuICAgICAgICAuZGlyZWN0aXZlKCdwaXBTaWRlbmF2Jywgc2lkZU5hdkRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuICAgIGZ1bmN0aW9uIFNpZGVOYXZQYXJ0RGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRyb290U2NvcGUsIHBpcFNpZGVOYXYpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHZhciBwYXJ0TmFtZSA9ICcnICsgJGF0dHJzLnBpcFNpZGVuYXZQYXJ0O1xyXG4gICAgICAgIHZhciBwYXJ0VmFsdWUgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBCcmVhayBwYXJ0IGFwYXJ0XHJcbiAgICAgICAgdmFyIHBvcyA9IHBhcnROYW1lLmluZGV4T2YoJzonKTtcclxuICAgICAgICBpZiAocG9zID4gMCkge1xyXG4gICAgICAgICAgICBwYXJ0VmFsdWUgPSBwYXJ0TmFtZS5zdWJzdHIocG9zICsgMSk7XHJcbiAgICAgICAgICAgIHBhcnROYW1lID0gcGFydE5hbWUuc3Vic3RyKDAsIHBvcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblNpZGVOYXZDaGFuZ2VkKG51bGwsIHBpcFNpZGVOYXYuY29uZmlnKVxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2Q2hhbmdlZCcsIG9uU2lkZU5hdkNoYW5nZWQpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblNpZGVOYXZDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gY29uZmlnLnBhcnRzIHx8IHt9O1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFBhcnRWYWx1ZSA9IHBhcnRzW3BhcnROYW1lXTtcclxuICAgICAgICAgICAgdmFyIHZpc2libGUgPSAhIShwYXJ0VmFsdWUgPyBjdXJyZW50UGFydFZhbHVlID09IHBhcnRWYWx1ZSA6IGN1cnJlbnRQYXJ0VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZpc2libGUgIT0gJHNjb3BlLnZpc2libGUpXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaWRlbmF2UGFydERpcmVjdGl2ZShuZ0lmRGlyZWN0aXZlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXIgbmdJZiA9IG5nSWZEaXJlY3RpdmVbMF07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IG5nSWYudHJhbnNjbHVkZSxcclxuICAgICAgICAgICAgcHJpb3JpdHk6IG5nSWYucHJpb3JpdHksXHJcbiAgICAgICAgICAgIHRlcm1pbmFsOiBuZ0lmLnRlcm1pbmFsLFxyXG4gICAgICAgICAgICByZXN0cmljdDogbmdJZi5yZXN0cmljdCxcclxuICAgICAgICAgICAgc2NvcGU6IHRydWUsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIGxpbmtGdW5jdGlvbigkc2NvcGU6IGFueSwgJGVsZW1lbnQsICRhdHRycykge1xyXG4gICAgICAgICAgICAgICAgJGF0dHJzLm5nSWYgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAkc2NvcGUudmlzaWJsZSB9O1xyXG4gICAgICAgICAgICAgICAgbmdJZi5saW5rLmFwcGx5KG5nSWYsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFNpZGVOYXZQYXJ0RGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcFNpZGVOYXYnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcFNpZGVuYXZQYXJ0Jywgc2lkZW5hdlBhcnREaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IFNpZGVOYXZDaGFuZ2VkRXZlbnQgPSAncGlwU2lkZU5hdkNoYW5nZWQnO1xyXG5leHBvcnQgbGV0IFNpZGVOYXZTdGF0ZUNoYW5nZWRFdmVudCA9ICdwaXBTaWRlTmF2U3RhdGVDaGFuZ2VkJztcclxuZXhwb3J0IGxldCBPcGVuU2lkZU5hdkV2ZW50ID0gJ3BpcE9wZW5TaWRlTmF2JztcclxuZXhwb3J0IGxldCBDbG9zZVNpZGVOYXZFdmVudCA9ICdwaXBDbG9zZVNpZGVOYXYnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZGVOYXZDb25maWcge1xyXG4gICAgcGFydHM6IGFueTtcclxuICAgIGNsYXNzZXM6IHN0cmluZ1tdO1xyXG4gICAgc3RhdGU6IGFueTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNpZGVOYXZTZXJ2aWNlIHtcclxuICAgIHJlYWRvbmx5IGNvbmZpZzogU2lkZU5hdkNvbmZpZztcclxuICAgIHJlYWRvbmx5IGNsYXNzZXM6IHN0cmluZ1tdO1xyXG4gICAgcGFydHM6IGFueTtcclxuICAgIHN0YXRlOiBhbnk7XHJcblxyXG4gICAgb3BlbigpOiB2b2lkO1xyXG4gICAgY2xvc2UoKTogdm9pZDtcclxuICAgIHRvZ2dsZSgpOiB2b2lkO1xyXG4gICAgc2hvdygpOiB2b2lkO1xyXG4gICAgaGlkZSgpOiB2b2lkO1xyXG5cclxuICAgIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZDtcclxuXHJcbiAgICBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNpZGVOYXZQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgY29uZmlnOiBTaWRlTmF2Q29uZmlnO1xyXG4gICAgcGFydHM6IGFueTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxuXHJcbiAgICBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcblxyXG4gICAgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBTaWRlTmF2U2VydmljZSBpbXBsZW1lbnRzIElTaWRlTmF2U2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IFNpZGVOYXZDb25maWc7XHJcbiAgICBwcml2YXRlIF9zdGF0ZTogYW55O1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuICAgIHByaXZhdGUgX3NpZGVuYXY6IG5nLm1hdGVyaWFsLklTaWRlbmF2U2VydmljZTtcclxuICAgIHByaXZhdGUgaWQgPSAncGlwLXN0aWNreS1zaWRlbmF2JztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBTaWRlTmF2Q29uZmlnLCAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSwgJG1kU2lkZW5hdjogbmcubWF0ZXJpYWwuSVNpZGVuYXZTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgdGhpcy5fc2lkZW5hdiA9ICRtZFNpZGVuYXY7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogU2lkZU5hdkNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsYXNzZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcnRzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhcnRzKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHMgPSB2YWx1ZSB8fCB7fTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3RhdGUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzdGF0ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB2YWx1ZSB8fCB7fTtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdChTaWRlTmF2U3RhdGVDaGFuZ2VkRXZlbnQsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbigpIHtcclxuICAgICAgICB0aGlzLl9zaWRlbmF2KHRoaXMuaWQpLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fc2lkZW5hdih0aGlzLmlkKS5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGUoKSB7XHJcbiAgICAgICAgdGhpcy5fc2lkZW5hdih0aGlzLmlkKS50b2dnbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHNbcGFydF0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kZW1pdChTaWRlTmF2Q2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTaWRlTmF2UHJvdmlkZXIgaW1wbGVtZW50cyBJU2lkZU5hdlByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogU2lkZU5hdkNvbmZpZyA9IHtcclxuICAgICAgICBwYXJ0czoge30sXHJcbiAgICAgICAgY2xhc3NlczogW10sXHJcbiAgICAgICAgdHlwZTogJ3BvcHVwJyxcclxuICAgICAgICBzdGF0ZTogbnVsbCxcclxuICAgICAgICB2aXNpYmxlOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IFNpZGVOYXZTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IFNpZGVOYXZDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb25maWcodmFsdWU6IFNpZGVOYXZDb25maWcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB2YWx1ZSB8fCBuZXcgU2lkZU5hdkNvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFydHMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnBhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFydHModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHZhbHVlIHx8IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHR5cGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xhc3NlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2xhc3Nlcyh2YWx1ZTogc3RyaW5nW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IF8ucmVqZWN0KHRoaXMuX2NvbmZpZy5jbGFzc2VzLCAoY2MpID0+IGNjID09IGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0c1twYXJ0XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCAkbWRTaWRlbmF2OiBuZy5tYXRlcmlhbC5JU2lkZW5hdlNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgU2lkZU5hdlNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlLCAkbWRTaWRlbmF2KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhvb2tTaWRlTmF2RXZlbnRzKCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCBwaXBTaWRlTmF2OiBJU2lkZU5hdlNlcnZpY2UpIHtcclxuICAgICRyb290U2NvcGUuJG9uKE9wZW5TaWRlTmF2RXZlbnQsICgpID0+IHsgcGlwU2lkZU5hdi5vcGVuKCk7IH0pO1xyXG4gICAgJHJvb3RTY29wZS4kb24oQ2xvc2VTaWRlTmF2RXZlbnQsICgpID0+IHsgcGlwU2lkZU5hdi5jbG9zZSgpOyB9KTtcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwU2lkZU5hdicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcFNpZGVOYXYnLCBTaWRlTmF2UHJvdmlkZXIpXHJcbiAgICAucnVuKGhvb2tTaWRlTmF2RXZlbnRzKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcFNpZGVOYXYnLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9TaWRlTmF2U2VydmljZSc7XHJcbmltcG9ydCAnLi9TaWRlTmF2UGFydERpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9TaWRlTmF2RGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vU2lkZU5hdlNlcnZpY2UnOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuICAgIGZ1bmN0aW9uIFRhYnNEaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG1kTWVkaWEsICRpbmplY3RvciwgJHJvb3RTY29wZSwgJHBhcnNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXIgcGlwVGhlbWUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUaGVtZScpID8gJGluamVjdG9yLmdldCgncGlwVGhlbWUnKSA6IG51bGwsXHJcbiAgICAgICAgICAgIHBpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsLFxyXG4gICAgICAgICAgICBjdXJyZW50VGhlbWUgPSAnZGVmYXVsdCc7XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZCA9IHt9O1xyXG5cclxuICAgICAgICBpZiAocGlwVGhlbWUpXHJcbiAgICAgICAgICAgIGN1cnJlbnRUaGVtZSA9IHBpcFRoZW1lLnVzZSgpO1xyXG4gICAgICAgIGVsc2UgaWYgKCRyb290U2NvcGUuJHRoZW1lKVxyXG4gICAgICAgICAgICBjdXJyZW50VGhlbWUgPSAkcm9vdFNjb3BlLiR0aGVtZTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNsYXNzID0gKCRhdHRycy5jbGFzcyB8fCAnJykgKyAnIG1kLScgKyBjdXJyZW50VGhlbWUgKyAnLXRoZW1lJztcclxuXHJcbiAgICAgICAgaWYgKHBpcFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnRhYnMubGVuZ3RoID4gMCAmJiAkc2NvcGUudGFic1swXS50aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZU9iamVjdHMoJHNjb3BlLnRhYnMsICd0aXRsZScsICduYW1lTG9jYWwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGVPYmplY3RzKCRzY29wZS50YWJzLCAnbmFtZScsICduYW1lTG9jYWwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLm1lZGlhID0gcGlwTWVkaWEgIT09IHVuZGVmaW5lZCA/IHBpcE1lZGlhIDogJG1kTWVkaWE7XHJcbiAgICAgICAgJHNjb3BlLnRhYnMgPSAoJHNjb3BlLnRhYnMgJiYgXy5pc0FycmF5KCRzY29wZS50YWJzKSkgPyAkc2NvcGUudGFicyA6IFtdO1xyXG5cclxuICAgICAgICB2YXIgcGlwVHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcbiAgICAgICAgaWYgKHBpcFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnRhYnMubGVuZ3RoID4gMCAmJiAkc2NvcGUudGFic1swXS50aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZU9iamVjdHMoJHNjb3BlLnRhYnMsICd0aXRsZScsICduYW1lTG9jYWwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGVPYmplY3RzKCRzY29wZS50YWJzLCAnbmFtZScsICduYW1lTG9jYWwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4ID0gJHNjb3BlLmFjdGl2ZUluZGV4IHx8IDA7XHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZVRhYiA9ICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleDtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRpc2FibGVkID0gZGlzYWJsZWQ7XHJcbiAgICAgICAgJHNjb3BlLnRhYkRpc2FibGVkID0gdGFiRGlzYWJsZWQ7XHJcbiAgICAgICAgJHNjb3BlLm9uU2VsZWN0ID0gb25TZWxlY3Q7XHJcbiAgICAgICAgJHNjb3BlLnNob3dTaGFkb3cgPSBzaG93U2hhZG93O1xyXG4gICAgICAgICRzY29wZS5zaG93ID0gc2hvdztcclxuXHJcbiAgICAgICAgaWYgKHRvQm9vbGVhbigkYXR0cnMucGlwUmViaW5kKSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCdhY3RpdmVJbmRleCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4ID0gbmV3VmFsdWUgfHwgMDtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZC5hY3RpdmVUYWIgPSAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRpc2FibGVkKCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLm5nRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUubmdEaXNhYmxlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdGFiRGlzYWJsZWQoaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgkc2NvcGUuZGlzYWJsZWQoKSAmJiAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXggIT0gaW5kZXgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU2VsZWN0KGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuZGlzYWJsZWQoKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAkc2NvcGUuYWN0aXZlSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZC5hY3RpdmVUYWIgPSAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0KCRzY29wZS50YWJzWyRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleF0sICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93U2hhZG93KCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNob3dUYWJzU2hhZG93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNob3dUYWJzU2hhZG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93KCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNob3dUYWJzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNob3dUYWJzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvQm9vbGVhbih2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT0gJzEnIHx8IHZhbHVlID09ICd0cnVlJztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiB0YWJzRGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBuZ0Rpc2FibGVkOiAnJicsXHJcbiAgICAgICAgICAgICAgICB0YWJzOiAnPXBpcFRhYnMnLFxyXG4gICAgICAgICAgICAgICAgc2hvd1RhYnM6ICcmcGlwU2hvd1RhYnMnLFxyXG4gICAgICAgICAgICAgICAgc2hvd1RhYnNTaGFkb3c6ICcmcGlwVGFic1NoYWRvdycsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleDogJz1waXBBY3RpdmVJbmRleCcsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Q6ICc9cGlwVGFic1NlbGVjdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0YWJzL1RhYnMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFRhYnNEaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJwaXBUYWJzXCIsIFsncGlwTmF2LlRlbXBsYXRlcyddKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcFRhYnMnLCB0YWJzRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2FjdGlvbnMvUHJpbWFyeUFjdGlvbnMuaHRtbCcsXG4gICAgJzxtZC1tZW51IG1kLXBvc2l0aW9uLW1vZGU9XCJ0YXJnZXQtcmlnaHQgdGFyZ2V0XCIgY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zXCIgbmctcmVwZWF0PVwiYWN0aW9uIGluIGNvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zXCI+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnMtYWN0aW9uIG1kLWljb24tYnV0dG9uXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihhY3Rpb24sICRtZE9wZW5NZW51KTtcIiBuZy1oaWRlPVwiaXNIaWRkZW4oYWN0aW9uKVwiIGFyaWEtbGFiZWw9XCJ7e2FjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19XCI+PGRpdiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnMtYmFkZ2VcIiBuZy1zaG93PVwiYWN0aW9uLmNvdW50ID4gMFwiPnt7YWN0aW9uQ291bnQoYWN0aW9uKX19PC9kaXY+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e2FjdGlvbi5pY29ufX1cIj48L21kLWljb24+PC9tZC1idXR0b24+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cInN1YkFjdGlvbiBpbiBhY3Rpb24uc3ViQWN0aW9uc1wiIG5nLWlmPVwiIXN1YkFjdGlvbi5kaXZpZGVyXCIgbmctaGlkZT1cImlzSGlkZGVuKHN1YkFjdGlvbilcIj48bWQtYnV0dG9uIG5nLWhpZGU9XCJzdWJBY3Rpb24uZGl2aWRlclwiIG5nLWNsaWNrPVwiY2xpY2tBY3Rpb24oc3ViQWN0aW9uKVwiPnt7OjpzdWJBY3Rpb24udGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJzdWJBY3Rpb24uZGl2aWRlclwiIG5nLXJlcGVhdC1lbmQ9XCJcIj48L21kLW1lbnUtZGl2aWRlcj48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+PG1kLW1lbnUgbWQtcG9zaXRpb24tbW9kZT1cInRhcmdldC1yaWdodCB0YXJnZXRcIiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnNcIiBuZy1yZXBlYXQ9XCJhY3Rpb24gaW4gY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zXCI+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnMtYWN0aW9uIG1kLWljb24tYnV0dG9uXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihhY3Rpb24sICRtZE9wZW5NZW51KTtcIiBuZy1oaWRlPVwiaXNIaWRkZW4oYWN0aW9uKVwiIGFyaWEtbGFiZWw9XCJ7e2FjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19XCI+PGRpdiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnMtYmFkZ2UgY29sb3ItYmFkZ2UtYmdcIiBuZy1zaG93PVwiYWN0aW9uLmNvdW50ID4gMFwiPnt7YWN0aW9uQ291bnQoYWN0aW9uKX19PC9kaXY+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e2FjdGlvbi5pY29ufX1cIj48L21kLWljb24+PC9tZC1idXR0b24+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cInN1YkFjdGlvbiBpbiBhY3Rpb24uc3ViQWN0aW9uc1wiIG5nLWlmPVwiIXN1YkFjdGlvbi5kaXZpZGVyXCIgbmctaGlkZT1cImlzSGlkZGVuKHN1YkFjdGlvbilcIj48bWQtYnV0dG9uIG5nLWhpZGU9XCJzdWJBY3Rpb24uZGl2aWRlclwiIG5nLWNsaWNrPVwiY2xpY2tBY3Rpb24oc3ViQWN0aW9uKVwiPnt7c3ViQWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwic3ViQWN0aW9uLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9ucy5odG1sJyxcbiAgICAnPG1kLW1lbnUgbmctaWY9XCJzZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSgpXCIgbWQtcG9zaXRpb24tbW9kZT1cInRhcmdldC1yaWdodCB0YXJnZXRcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiBuZy1jbGljaz1cIm9uU2Vjb25kYXJ5QWN0aW9uQ2xpY2soKTsgb3Blbk1lbnUoJG1kT3Blbk1lbnUsICRldmVudCk7XCIgYXJpYS1sYWJlbD1cIm9wZW4gYWN0aW9uc1wiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6dmRvdHNcIj48L21kLWljb24+PC9tZC1idXR0b24+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cImFjdGlvbiBpbiBjb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zXCIgbmctaWY9XCIhYWN0aW9uLmRpdmlkZXJcIiBuZy1oaWRlPVwiaXNIaWRkZW4oYWN0aW9uKVwiPjxtZC1idXR0b24gbmctaGlkZT1cImFjdGlvbi5kaXZpZGVyXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihhY3Rpb24pXCI+e3s6OmFjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cImFjdGlvbi5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJzZWNvbmRhcnlEaXZpZGVyVmlzaWJsZSgpXCI+PC9tZC1tZW51LWRpdmlkZXI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQtc3RhcnQ9XCJhY3Rpb24gaW4gY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnNcIiBuZy1pZj1cIiFhY3Rpb24uZGl2aWRlclwiIG5nLWhpZGU9XCJpc0hpZGRlbihhY3Rpb24pXCI+PG1kLWJ1dHRvbiBuZy1oaWRlPVwiYWN0aW9uLmRpdmlkZXJcIiBuZy1jbGljaz1cImNsaWNrQWN0aW9uKGFjdGlvbilcIj57ezo6YWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwiYWN0aW9uLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2FwcGJhci9BcHBCYXIuaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIGNsYXNzPVwie3sgY29uZmlnLmNsYXNzZXMuam9pbihcXCcgXFwnKSB9fVwiIG5nLWlmPVwiY29uZmlnLnZpc2libGVcIiBuZy10cmFuc2NsdWRlPVwiXCI+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2JyZWFkY3J1bWIvQnJlYWRjcnVtYi5odG1sJyxcbiAgICAnPGRpdiBzdHlsZT1cImhlaWdodDogMjNweDtcIj48ZGl2IGNsYXNzPVwiaGlkZS14cyB0ZXh0LW92ZXJmbG93XCI+PHNwYW4gbmctaWY9XCJ2bS5jb25maWcuY3JpdGVyaWFcIiBuZy1jbGljaz1cInZtLm9wZW5TZWFyY2goKVwiPnt7dm0uY29uZmlnLmNyaXRlcmlhfX0gLTwvc3Bhbj48c3BhbiBjbGFzcz1cInBpcC1icmVhZGNydW1iLWl0ZW0ge3skbGFzdCA/IFxcJ2JyZWFkY3J1bWItYWNjZW50XFwnIDogXFwnXFwnfX1cIiBuZy1pZj1cInZtLmNvbmZpZy5pdGVtcyAmJiB2bS5jb25maWcuaXRlbXMubGVuZ3RoID4gMFwiIG5nLXJlcGVhdC1zdGFydD1cIml0ZW0gaW4gdm0uY29uZmlnLml0ZW1zXCIgbmctY2xpY2s9XCJ2bS5vbkNsaWNrKGl0ZW0pXCIgbmctaW5pdD1cInN0ZXBXaWR0aCA9IDEwMC8odm0uY29uZmlnLml0ZW1zLmxlbmd0aCArIDEpXCIgbmctY2xhc3M9XCJ7XFwnY3Vyc29yLXBvaW50ZXJcXCc6ICEkbGFzdH1cIiBuZy1zdHlsZT1cIntcXCdtYXgtd2lkdGhcXCc6IHN0ZXBXaWR0aCArIFxcJyVcXCd9XCI+PHNwYW4gY2xhc3M9XCJoaWRlLXhzXCIgbmctaWY9XCIhJGxhc3QgfHwgIXZtLmFjdGlvbnNWaXNpYmxlKGl0ZW0pXCI+e3tpdGVtLnRpdGxlIHwgdHJhbnNsYXRlfX08L3NwYW4+PGRpdiBuZy1pZj1cIiRsYXN0ICYmIHZtLmFjdGlvbnNWaXNpYmxlKGl0ZW0pXCIgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTtcIj48bWQtbWVudSBjbGFzcz1cImhpZGUteHNcIiBtZC1vZmZzZXQ9XCIwIDQ0XCI+PHNwYW4gY2xhc3M9XCJsYXlvdXQtcm93IHBpcC1icmVhZGNydW1iLWl0ZW0tbWVudSBjdXJzb3ItcG9pbnRlciB7eyRsYXN0ID8gXFwnYnJlYWRjcnVtYi1hY2NlbnRcXCcgOiBcXCdcXCd9fVwiIG5nLWNsaWNrPVwidm0ub25PcGVuTWVudSgkbWRPcGVuTWVudSwgJGV2ZW50KVwiIG1kLWluay1yaXBwbGU9XCJcIiBhcmlhLWxhYmVsPVwib3BlbiBicmVhZGNydW1iIGFjdGlvbnNcIj57e2l0ZW0udGl0bGUgfCB0cmFuc2xhdGV9fTxtZC1pY29uIGNsYXNzPVwicGlwLXRyaWFuZ2xlLWRvd25cIiBtZC1zdmctaWNvbj1cImljb25zOnRyaWFuZ2xlLWRvd25cIj48L21kLWljb24+PC9zcGFuPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCI0XCI+PG1kLW1lbnUtaXRlbSBuZy1pZj1cIiFzdWJJdGVtLmRpdmlkZXJcIiBuZy1yZXBlYXQtc3RhcnQ9XCJzdWJJdGVtIGluIGl0ZW0uc3ViQWN0aW9uc1wiPjxtZC1idXR0b24gbmctY2xpY2s9XCJ2bS5vblN1YkFjdGlvbkNsaWNrKHN1Ykl0ZW0pXCIgbmctaGlkZT1cImFjdGlvbi5kaXZpZGVyXCI+PG1kLWljb24gbWQtbWVudS1hbGlnbi10YXJnZXQ9XCJcIiBuZy1pZj1cInN1Ykl0ZW0uaWNvblwiIG1kLXN2Zy1pY29uPVwie3tzdWJJdGVtLmljb259fVwiPjwvbWQtaWNvbj48c3Bhbj57e3N1Ykl0ZW0udGl0bGUgfCB0cmFuc2xhdGV9fTwvc3Bhbj48L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwic3ViSXRlbS5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT48L2Rpdj48L3NwYW4+PG1kLWljb24gbmctcmVwZWF0LWVuZD1cIlwiIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y2hldnJvbi1yaWdodFwiIG5nLWhpZGU9XCIkbGFzdFwiPjwvbWQtaWNvbj48c3BhbiBjbGFzcz1cInBpcC10aXRsZSBicmVhZGNydW1iLWFjY2VudFwiIG5nLWlmPVwidm0uY29uZmlnLnRleHRcIj57e3ZtLmNvbmZpZy50ZXh0IHwgdHJhbnNsYXRlfX08L3NwYW4+PC9kaXY+PGRpdiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIiBjbGFzcz1cImhpZGUtZ3QteHNcIj48bWQtbWVudSBtZC1vZmZzZXQ9XCIwIDQ0XCI+PHNwYW4gY2xhc3M9XCJwaXAtbW9iaWxlLWJyZWFkY3J1bWIgbGF5b3V0LXJvd1wiIG5nLWNsaWNrPVwidm0uY29uZmlnLml0ZW1zICYmIHZtLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAxID8gJG1kT3Blbk1lbnUoKSA6IHJldHVyblwiIGFyaWEtbGFiZWw9XCJvcGVuIGJyZWFkY3J1bWJcIj48c3BhbiBjbGFzcz1cInRleHQtb3ZlcmZsb3dcIj48c3BhbiBuZy1pZj1cInZtLmNvbmZpZy5jcml0ZXJpYVwiIG5nLWNsaWNrPVwidm0ub3BlblNlYXJjaCgpXCI+e3t2bS5jb25maWcuY3JpdGVyaWF9fSAtPC9zcGFuPiA8c3BhbiBjbGFzcz1cImJyZWFkY3J1bWItYWNjZW50XCIgbmctaWY9XCJ2bS5jb25maWcudGV4dFwiPnt7dm0uY29uZmlnLnRleHQgfCB0cmFuc2xhdGV9fTwvc3Bhbj4gPHNwYW4gbmctaWY9XCJ2bS5jb25maWcuaXRlbXMgJiYgdm0uY29uZmlnLml0ZW1zLmxlbmd0aCA+IDBcIiBjbGFzcz1cImJyZWFkY3J1bWItYWNjZW50IHt7KHZtLmNvbmZpZy5pdGVtcyAmJiB2bS5jb25maWcuaXRlbXMubGVuZ3RoID4gMSkgPyBcXCdjdXJzb3ItcG9pbnRlclxcJyA6IFxcJ1xcJyB9fVwiPnt7dm0uY29uZmlnLml0ZW1zW3ZtLmNvbmZpZy5pdGVtcy5sZW5ndGggLSAxXS50aXRsZSB8IHRyYW5zbGF0ZX19PC9zcGFuPjwvc3Bhbj48bWQtaWNvbiBjbGFzcz1cInBpcC10cmlhbmdsZS1kb3duIGN1cnNvci1wb2ludGVyIGJyZWFkY3J1bWItYWNjZW50XCIgbWQtc3ZnLWljb249XCJpY29uczp0cmlhbmdsZS1kb3duXCIgbmctaWY9XCJ2bS5jb25maWcuaXRlbXMgJiYgdm0uY29uZmlnLml0ZW1zLmxlbmd0aCA+IDFcIj48L21kLWljb24+PC9zcGFuPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCI0XCI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQ9XCJpdGVtIGluIHZtLmNvbmZpZy5pdGVtc1wiIG5nLWlmPVwidm0uY29uZmlnLml0ZW1zICYmIHZtLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAwXCI+PG1kLWJ1dHRvbiBuZy1jbGljaz1cInZtLm9uQ2xpY2soaXRlbSlcIj48bWQtaWNvbiBtZC1tZW51LWFsaWduLXRhcmdldD1cIlwiIG5nLWlmPVwiaXRlbS5pY29uXCIgbWQtc3ZnLWljb249XCJ7e2l0ZW0uaWNvbn19XCI+PC9tZC1pY29uPjxzcGFuPnt7aXRlbS50aXRsZSB8IHRyYW5zbGF0ZX19PC9zcGFuPjwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWl0ZW0gbmctaWY9XCJ2bS5jb25maWcudGV4dFwiPjxtZC1idXR0b24+PHNwYW4gY2xhc3M9XCJ0ZXh0LWdyZXlcIj57e3ZtLmNvbmZpZy50ZXh0IHwgdHJhbnNsYXRlfX08L3NwYW4+PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PjwvZGl2PjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2hlYWRlci9OYXZIZWFkZXIuaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIG5nLXNob3c9XCJzaG93SGVhZGVyXCIgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIj48ZGl2IGNsYXNzPVwiZmxleC1maXhlZCBwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlclwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIG5nLWNsaWNrPVwib25Vc2VyQ2xpY2soKVwiIGFyaWEtbGFiZWw9XCJjdXJyZW50IHVzZXJcIj48aW1nIHNyYz1cIlwiIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXItaW1hZ2VcIiBuZy1jbGFzcz1cImltYWdlQ3NzXCI+PC9tZC1idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLXRleHRcIj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXItcHJpXCIgbmctY2xpY2s9XCJvblVzZXJDbGljaygpXCI+e3sgdGl0bGUgfCB0cmFuc2xhdGUgfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXItc2VjXCI+e3sgc3VidGl0bGUgfCB0cmFuc2xhdGUgfX08L2Rpdj48L2Rpdj48L21kLXRvb2xiYXI+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZHJvcGRvd24vRHJvcGRvd24uaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIGNsYXNzPVwibWQtc3ViaGVhZCBjb2xvci1wcmltYXJ5LWJnIHt7Y2xhc3N9fVwiIG5nLWlmPVwic2hvdygpXCIgbmctY2xhc3M9XCJ7XFwnbWQtd2hpdGVmcmFtZS0zZHBcXCc6IG1lZGlhKFxcJ3hzXFwnKX1cIj48ZGl2IGNsYXNzPVwicGlwLWRpdmlkZXJcIj48L2Rpdj48bWQtc2VsZWN0IG5nLW1vZGVsPVwic2VsZWN0ZWRJbmRleFwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWQoKVwiIG1kLWNvbnRhaW5lci1jbGFzcz1cInBpcC1mdWxsLXdpZHRoLWRyb3Bkb3duXCIgYXJpYS1sYWJlbD1cIkRST1BET1dOXCIgbWQtaW5rLXJpcHBsZT1cIlwiIG1kLW9uLWNsb3NlPVwib25TZWxlY3Qoc2VsZWN0ZWRJbmRleClcIj48bWQtb3B0aW9uIG5nLXJlcGVhdD1cImFjdGlvbiBpbiBhY3Rpb25zXCIgdmFsdWU9XCJ7eyA6OiRpbmRleCB9fVwiIG5nLXNlbGVjdGVkPVwiYWN0aXZlSW5kZXggPT0gJGluZGV4ID8gdHJ1ZSA6IGZhbHNlXCI+e3sgKGFjdGlvbi50aXRsZSB8fCBhY3Rpb24ubmFtZSB8fCBhY3Rpb24pIHwgdHJhbnNsYXRlIH19PC9tZC1vcHRpb24+PC9tZC1zZWxlY3Q+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2ljb24vTmF2SWNvbi5odG1sJyxcbiAgICAnPG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWljb24tYnV0dG9uIHBpcC1uYXYtaWNvblwiIG5nLWlmPVwiY29uZmlnLnR5cGUgIT0gXFwnbm9uZVxcJ1wiIG5nLWNsYXNzPVwiY29uZmlnLmNsYXNzXCIgbmctY2xpY2s9XCJvbk5hdkljb25DbGljaygpXCIgYXJpYS1sYWJlbD1cIm1lbnVcIj48bWQtaWNvbiBuZy1pZj1cImNvbmZpZy50eXBlPT1cXCdtZW51XFwnXCIgbWQtc3ZnLWljb249XCJpY29uczptZW51XCI+PC9tZC1pY29uPjxpbWcgbmctc3JjPVwie3tjb25maWcuaW1hZ2VVcmx9fVwiIG5nLWlmPVwiY29uZmlnLnR5cGU9PVxcJ2ltYWdlXFwnXCIgaGVpZ2h0PVwiMjRcIiB3aWR0aD1cIjI0XCI+PG1kLWljb24gbmctaWY9XCJjb25maWcudHlwZT09XFwnYmFja1xcJ1wiIG1kLXN2Zy1pY29uPVwiaWNvbnM6YXJyb3ctbGVmdFwiPjwvbWQtaWNvbj48bWQtaWNvbiBuZy1pZj1cImNvbmZpZy50eXBlPT1cXCdpY29uXFwnXCIgbWQtc3ZnLWljb249XCJ7e2NvbmZpZy5pY29ufX1cIj48L21kLWljb24+PC9tZC1idXR0b24+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWVudS9OYXZNZW51Lmh0bWwnLFxuICAgICc8bWQtbGlzdCBjbGFzcz1cInNpZGVuYXYtbGlzdFwiIHh4eG5nLWlmPVwic2VjdGlvbnMubGVuZ3RoID4gMFwiPjxtZC1saXN0LWl0ZW0gY2xhc3M9XCJwaXAtZm9jdXNhYmxlIG5vLWJvcmRlciBwaXAtc3RpY2t5LW5hdi1tZW51LWl0ZW0gcGlwLXN0aWNreS1uYXYtZXhwYW5kZWQtYnV0dG9uXCIgbmctY2xpY2s9XCJvbkV4cGFuZCgpXCIgbmctZGlzYWJsZWQ9XCIhaXNDb2xsYXBzZWRcIiBuZy1pZj1cImV4cGFuZGVkQnV0dG9uXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpjaGV2cm9uLWxlZnRcIiBuZy1pZj1cImV4cGFuZGVkXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb25cIj48L21kLWljb24+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpjaGV2cm9uLXJpZ2h0XCIgbmctaWY9XCIhZXhwYW5kZWRcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvblwiPjwvbWQtaWNvbj48L21kLWxpc3QtaXRlbT48bWQtZGl2aWRlciBuZy1zaG93PVwiZXhwYW5kZWRCdXR0b25cIj48L21kLWRpdmlkZXI+PGRpdiBjbGFzcz1cInBpcC1zZWN0aW9uXCIgbmctcmVwZWF0PVwic2VjdGlvbiBpbiBzZWN0aW9uc1wiIG5nLWhpZGU9XCJzZWN0aW9uLmFjY2VzcyAmJiAhc2VjdGlvbi5hY2Nlc3Moc2VjdGlvbilcIj48bWQtZGl2aWRlciBuZy1zaG93PVwiJGluZGV4ID4gMCAmJiAhaXNTZWN0aW9uRW1wdHkoc2VjdGlvbi5saW5rcylcIj48L21kLWRpdmlkZXI+PG1kLXN1YmhlYWRlciBuZy1zaG93PVwic2VjdGlvbi50aXRsZVwiIHN0eWxlPVwiaGVpZ2h0OiA0OHB4O1wiPjxzcGFuIG5nLWlmPVwiZXhwYW5kZWRcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtdGl0bGUgc2VjdGlvbi10aXRsZVwiPnt7OjpzZWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L3NwYW4+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e3NlY3Rpb24uaWNvbn19XCIgbmctaWY9XCIhc2lkZU5hdlN0YXRlLnNob3dJY29uVG9vbHR5cGUgJiYgIWV4cGFuZGVkICYmIHNlY3Rpb24uaWNvblwiIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uIHNlY3Rpb24taWNvblwiPjwvbWQtaWNvbj48bWQtaWNvbiBtZC1zdmctaWNvbj1cInt7c2VjdGlvbi5pY29ufX1cIiBuZy1pZj1cInNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZCAmJiBzZWN0aW9uLmljb25cIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBzZWN0aW9uLWljb25cIj48bWQtdG9vbHRpcCBtZC12aXNpYmxlPVwic2hvd1Rvb2x0aXBcIiBtZC1kaXJlY3Rpb249XCJyaWdodFwiPnt7OjpzZWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L21kLXRvb2x0aXA+PC9tZC1pY29uPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwie3tkZWZhdWx0SWNvbn19XCIgbmctaWY9XCIhc2lkZU5hdlN0YXRlLnNob3dJY29uVG9vbHR5cGUgJiYgIWV4cGFuZGVkICYmICFzZWN0aW9uLmljb25cIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBzZWN0aW9uLWljb25cIj48L21kLWljb24+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e2RlZmF1bHRJY29ufX1cIiBuZy1pZj1cInNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZCAmJiAhc2VjdGlvbi5pY29uXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgY2xhc3M9XCJtZC1zZWNvbmRhcnlcIj57ezo6c2VjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48L21kLXN1YmhlYWRlcj48bWQtbGlzdC1pdGVtIGNsYXNzPVwibm8tYm9yZGVyIHBpcC1zdGlja3ktbmF2LW1lbnUtaXRlbVwiIG5nLXJlcGVhdD1cImxpbmsgaW4gc2VjdGlvbi5saW5rc1wiIG5nLWNsYXNzPVwie1xcJ2FjdGl2ZVxcJzogaXNBY3RpdmUobGluayl9XCIgbmctaGlkZT1cImxpbmsuYWNjZXNzICYmICFsaW5rLmFjY2VzcyhsaW5rKVwiPjxtZC1idXR0b24gY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgcGlwLWZvY3VzYWJsZVwiIG5nLWNsaWNrPVwiY2xpY2tMaW5rKCRldmVudCwgbGluaylcIj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uLWJsb2NrXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e2xpbmsuaWNvbn19XCIgbmctaWY9XCIhKHNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZClcIiBuZy1oaWRlPVwiIWxpbmsuaWNvblwiIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uIGZsZXgtZml4ZWRcIj48L21kLWljb24+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e2xpbmsuaWNvbn19XCIgbmctaGlkZT1cIiFsaW5rLmljb25cIiBuZy1pZj1cInNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZFwiIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uIGZsZXgtZml4ZWRcIj48bWQtdG9vbHRpcCBtZC12aXNpYmxlPVwic2hvd1Rvb2x0aXBcIiBtZC1kaXJlY3Rpb249XCJyaWdodFwiPnt7OjpsaW5rLnRpdGxlIHwgdHJhbnNsYXRlfX08L21kLXRvb2x0aXA+PC9tZC1pY29uPjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LXRpdGxlXCI+e3s6OmxpbmsudGl0bGUgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWJhZGdlIHt7IGxpbmsuYmFkZ2VTdHlsZSA/IGxpbmsuYmFkZ2VTdHlsZSA6IFxcJ2NvbG9yLWJhZGdlLWJnXFwnIH19IGZsZXgtZml4ZWRcIiBuZy1pZj1cImxpbmsuY291bnQgJiYgbGluay5jb3VudCA8IDEwMFwiPnt7bGluay5jb3VudH19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtYmFkZ2Uge3sgbGluay5iYWRnZVN0eWxlID8gbGluay5iYWRnZVN0eWxlIDogXFwnY29sb3ItYmFkZ2UtYmdcXCcgfX0gZmxleC1maXhlZFwiIG5nLWlmPVwibGluay5jb3VudCAmJiBsaW5rLmNvdW50ID4gOTlcIj4hPC9kaXY+PC9tZC1idXR0b24+PC9tZC1saXN0LWl0ZW0+PC9kaXY+PC9tZC1saXN0PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyLmh0bWwnLFxuICAgICc8bWQtbWVudSBtZC1wb3NpdGlvbi1tb2RlPVwidGFyZ2V0LXJpZ2h0IHRhcmdldFwiPjxzcGFuIGNsYXNzPVwicGlwLWxhbmd1YWdlXCIgbmctY2xpY2s9XCIkbWRPcGVuTWVudSgpXCIgYXJpYS1sYWJlbD1cImxhbmd1YWdlIHNlbGVjdGlvblwiPnt7dm0ubGFuZ3VhZ2UgfCB0cmFuc2xhdGV9fTxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6dHJpYW5nbGUtZG93blwiPjwvbWQtaWNvbj48L3NwYW4+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdD1cImxhbmd1YWdlIGluIHZtLmxhbmd1YWdlc1wiPjxtZC1idXR0b24gbmctY2xpY2s9XCJ2bS5vbkxhbmd1YWdlQ2xpY2sobGFuZylcIj57e2xhbmd1YWdlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnc2VhcmNoL1NlYXJjaEJhci5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cIm1kLXRvb2xiYXItdG9vbHMgcGlwLXNlYXJjaC1jb250YWluZXJcIiBuZy1pZj1cInZtLmVuYWJsZWRcIj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBwaXAtc2VhcmNoLXNlbGVjdGVkXCI+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWljb24tYnV0dG9uXCIgYXJpYS1sYWJlbD1cInN0YXJ0IHNlYXJjaFwiIG5nLWNsaWNrPVwidm0ub25DbGljaygpXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpzZWFyY2hcIj48L21kLWljb24+PC9tZC1idXR0b24+PGlucHV0IGNsYXNzPVwicGlwLXNlYXJjaC10ZXh0IGZsZXhcIiB0eXBlPVwic2VhcmNoXCIgbmctbW9kZWw9XCJ2bS5zZWFyY2gudGV4dFwiIG5nLWtleWRvd249XCJ2bS5vbktleURvd24oJGV2ZW50KVwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJjbGVhciBzZWFyY2hcIiBuZy1jbGljaz1cInZtLmNsZWFyKClcIj48bWQtaWNvbiBtZC1zdmctaWNvbj1cImljb25zOmNyb3NzLWNpcmNsZVwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwibWQtdG9vbGJhci10b29scyBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1lbmQtY2VudGVyIGZsZXgtZml4ZWQgbHAwIHJwMFwiIG5nLWlmPVwiIXZtLmVuYWJsZWRcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiBhcmlhLWxhYmVsPVwic3RhcnQgc2VhcmNoXCIgbmctY2xpY2s9XCJ2bS5lbmFibGUoKVwiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6c2VhcmNoXCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RhYnMvVGFicy5odG1sJyxcbiAgICAnPG1kLXRvb2xiYXIgY2xhc3M9XCJwaXAtbmF2IHt7IGNsYXNzIH19XCIgbmctY2xhc3M9XCJ7XFwncGlwLXZpc2libGVcXCc6IHNob3coKSwgXFwncGlwLXNoYWRvd1xcJzogc2hvd1NoYWRvdygpfVwiPjxtZC10YWJzIG5nLWlmPVwibWVkaWEoXFwnZ3QteHNcXCcpXCIgbWQtc2VsZWN0ZWQ9XCJzZWxlY3RlZC5hY3RpdmVUYWJcIiBuZy1jbGFzcz1cIntcXCdkaXNhYmxlZFxcJzogZGlzYWJsZWQoKX1cIiBtZC1zdHJldGNoLXRhYnM9XCJ0cnVlXCIgbWQtZHluYW1pYy1oZWlnaHQ9XCJ0cnVlXCI+PG1kLXRhYiBuZy1yZXBlYXQ9XCJ0YWIgaW4gdGFicyB0cmFjayBieSAkaW5kZXhcIiBuZy1kaXNhYmxlZD1cInRhYkRpc2FibGVkKCRpbmRleClcIiBtZC1vbi1zZWxlY3Q9XCJvblNlbGVjdCgkaW5kZXgpXCI+PG1kLXRhYi1sYWJlbD57ezo6dGFiLm5hbWVMb2NhbCB9fTxkaXYgY2xhc3M9XCJwaXAtdGFicy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLWlmPVwidGFiLm5ld0NvdW50cyA+IDAgJiYgdGFiLm5ld0NvdW50cyA8PSA5OVwiPnt7IHRhYi5uZXdDb3VudHMgfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXRhYnMtYmFkZ2UgY29sb3ItYmFkZ2UtYmdcIiBuZy1pZj1cInRhYi5uZXdDb3VudHMgPiA5OVwiPiE8L2Rpdj48L21kLXRhYi1sYWJlbD48L21kLXRhYj48L21kLXRhYnM+PGRpdiBjbGFzcz1cIm1kLXN1YmhlYWQgcGlwLXRhYnMtY29udGVudCBjb2xvci1wcmltYXJ5LWJnXCIgbmctaWY9XCJtZWRpYShcXCd4c1xcJylcIj48ZGl2IGNsYXNzPVwicGlwLWRpdmlkZXIgcG9zaXRpb24tdG9wIG0wXCI+PC9kaXY+PG1kLXNlbGVjdCBuZy1tb2RlbD1cInNlbGVjdGVkLmFjdGl2ZUluZGV4XCIgbmctZGlzYWJsZWQ9XCJkaXNhYmxlZCgpXCIgbWQtY29udGFpbmVyLWNsYXNzPVwicGlwLWZ1bGwtd2lkdGgtZHJvcGRvd25cIiBhcmlhLWxhYmVsPVwiU0VMRUNUXCIgbWQtaW5rLXJpcHBsZT1cIlwiIG1kLW9uLWNsb3NlPVwib25TZWxlY3Qoc2VsZWN0ZWQuYWN0aXZlSW5kZXgpXCI+PG1kLW9wdGlvbiBuZy1yZXBlYXQ9XCJ0YWIgaW4gdGFicyB0cmFjayBieSAkaW5kZXhcIiBjbGFzcz1cInBpcC10YWItb3B0aW9uXCIgdmFsdWU9XCJ7eyA6OiRpbmRleCB9fVwiPnt7IDo6dGFiLm5hbWVMb2NhbCB9fTxkaXYgY2xhc3M9XCJwaXAtdGFicy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLWlmPVwidGFiLm5ld0NvdW50cyA+IDAgJiYgdGFiLm5ld0NvdW50cyA8PSA5OVwiPnt7IHRhYi5uZXdDb3VudHMgfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXRhYnMtYmFkZ2UgY29sb3ItYmFkZ2UtYmdcIiBuZy1pZj1cInRhYi5uZXdDb3VudHMgPiA5OVwiPiE8L2Rpdj48L21kLW9wdGlvbj48L21kLXNlbGVjdD48L2Rpdj48L21kLXRvb2xiYXI+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnc2lkZW5hdi9TaWRlTmF2Lmh0bWwnLFxuICAgICc8bWQtc2lkZW5hdiBjbGFzcz1cIm1kLXNpZGVuYXYtbGVmdFwiIG1kLWlzLWxvY2tlZC1vcGVuPVwic2lkZW5hdlN0YXRlLmlzTG9ja2VkT3BlblwiIG1kLWNvbXBvbmVudC1pZD1cInBpcC1zdGlja3ktc2lkZW5hdlwiIHBpcC1mb2N1c2VkPVwiXCIgbmctdHJhbnNjbHVkZT1cIlwiPjwvbWQtc2lkZW5hdj4nKTtcbn1dKTtcbn0pKCk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcC13ZWJ1aS1uYXYtaHRtbC5taW4uanMubWFwXG4iXX0=