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
},{}],16:[function(require,module,exports){
'use strict';
(function () {
    StickyNavHeaderDirectiveController.$inject = ['$scope', '$element', '$rootScope', '$timeout', 'pipNavHeader'];
    function StickyNavHeaderDirectiveController($scope, $element, $rootScope, $timeout, pipNavHeader) {
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
    function stickyNavHeaderDirective() {
        return {
            restrict: 'EA',
            scope: {},
            replace: false,
            templateUrl: 'header/StickyNavHeader.html',
            controller: StickyNavHeaderDirectiveController
        };
    }
    angular
        .module('pipNavHeader')
        .directive('pipStickyNavHeader', stickyNavHeaderDirective);
})();
},{}],17:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipNavHeader', ['ngMaterial', 'pipNav.Templates']);
require("./NavHeaderService");
require("./StickyNavHeaderDirective");
__export(require("./NavHeaderService"));
},{"./NavHeaderService":15,"./StickyNavHeaderDirective":16}],18:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
'use strict';
(function () {
    StickyNavMenuDirectiveController.$inject = ['$scope', '$element', '$rootScope', '$window', '$location', '$timeout', '$injector', 'pipSideNav', 'pipNavMenu'];
    function StickyNavMenuDirectiveController($scope, $element, $rootScope, $window, $location, $timeout, $injector, pipSideNav, pipNavMenu) {
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
    function stickyNavMenuDirective() {
        return {
            restrict: 'EA',
            scope: {},
            replace: false,
            templateUrl: 'menu/StickyNavMenu.html',
            controller: StickyNavMenuDirectiveController
        };
    }
    angular
        .module('pipNavMenu')
        .directive('pipStickyNavMenu', stickyNavMenuDirective);
})();
},{}],25:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipNavMenu', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require("./NavMenuService");
require("./StickyNavMenuDirective");
__export(require("./NavMenuService"));
},{"./NavMenuService":23,"./StickyNavMenuDirective":24}],26:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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
            type: 'sticky',
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
},{}],31:[function(require,module,exports){
'use strict';
(function () {
    StickySideNavDirectiveController.$inject = ['$scope', '$element', '$rootScope', '$injector', '$mdMedia', '$timeout', 'pipSideNav'];
    function StickySideNavDirectiveController($scope, $element, $rootScope, $injector, $mdMedia, $timeout, pipSideNav) {
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
})();
},{}],32:[function(require,module,exports){
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipSideNav', ['ngMaterial', 'pipNav.Templates']);
require("./SideNavService");
require("./SideNavPartDirective");
require("./StickySideNavDirective");
__export(require("./SideNavService"));
},{"./SideNavPartDirective":29,"./SideNavService":30,"./StickySideNavDirective":31}],33:[function(require,module,exports){
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
  $templateCache.put('header/StickyNavHeader.html',
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
  $templateCache.put('menu/StickyNavMenu.html',
    '<md-list class="sidenav-list"><md-list-item class="pip-focusable no-border pip-sticky-nav-menu-item pip-sticky-nav-expanded-button" ng-click="onExpand()" ng-disabled="!isCollapsed" ng-if="expandedButton"><md-icon md-svg-icon="icons:chevron-left" ng-if="expanded" class="pip-sticky-nav-menu-icon"></md-icon><md-icon md-svg-icon="icons:chevron-right" ng-if="!expanded" class="pip-sticky-nav-menu-icon"></md-icon></md-list-item><md-divider ng-show="expandedButton"></md-divider><div class="pip-section" ng-repeat="section in sections" ng-hide="section.access && !section.access(section)"><md-divider ng-show="$index > 0 && !isSectionEmpty(section.links)"></md-divider><md-subheader ng-show="section.title" style="height: 48px;"><span ng-if="expanded" class="pip-sticky-nav-menu-title section-title">{{::section.title | translate}}</span><md-icon md-svg-icon="{{section.icon}}" ng-if="!sideNavState.showIconTooltype && !expanded && section.icon" class="pip-sticky-nav-menu-icon section-icon"></md-icon><md-icon md-svg-icon="{{section.icon}}" ng-if="sideNavState.showIconTooltype && !expanded && section.icon" class="pip-sticky-nav-menu-icon section-icon"><md-tooltip md-visible="showTooltip" md-direction="right">{{::section.title | translate}}</md-tooltip></md-icon><md-icon md-svg-icon="{{defaultIcon}}" ng-if="!sideNavState.showIconTooltype && !expanded && !section.icon" class="pip-sticky-nav-menu-icon section-icon"></md-icon><md-icon md-svg-icon="{{defaultIcon}}" ng-if="sideNavState.showIconTooltype && !expanded && !section.icon" class="pip-sticky-nav-menu-icon section-icon"><md-tooltip md-visible="showTooltip" class="md-secondary">{{::section.title | translate}}</md-tooltip></md-icon></md-subheader><md-list-item class="no-border pip-sticky-nav-menu-item" ng-repeat="link in section.links" ng-class="{\'active\': isActive(link)}" ng-hide="link.access && !link.access(link)"><md-button class="layout-row layout-align-start-center pip-focusable" ng-click="clickLink($event, link)"><div class="pip-sticky-nav-menu-icon-block"><md-icon md-svg-icon="{{link.icon}}" ng-if="!(sideNavState.showIconTooltype && !expanded)" ng-hide="!link.icon" class="pip-sticky-nav-menu-icon flex-fixed"></md-icon><md-icon md-svg-icon="{{link.icon}}" ng-hide="!link.icon" ng-if="sideNavState.showIconTooltype && !expanded" class="pip-sticky-nav-menu-icon flex-fixed"><md-tooltip md-visible="showTooltip" md-direction="right">{{::link.title | translate}}</md-tooltip></md-icon></div><div class="pip-sticky-nav-menu-title">{{::link.title | translate}}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count < 100">{{link.count}}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count > 99">!</div></md-button></md-list-item></div></md-list>');
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
  $templateCache.put('sidenav/StickySideNav.html',
    '<md-sidenav class="md-sidenav-left" md-is-locked-open="sidenavState.isLockedOpen" md-component-id="pip-sticky-sidenav" pip-focused="" ng-transclude=""></md-sidenav>');
}]);
})();



},{}]},{},[34,21])(34)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWN0aW9ucy9BY3Rpb25zU2VydmljZS50cyIsInNyYy9hY3Rpb25zL1ByaW1hcnlBY3Rpb25zRGlyZWN0aXZlLnRzIiwic3JjL2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9uc0RpcmVjdGl2ZS50cyIsInNyYy9hY3Rpb25zL2luZGV4LnRzIiwic3JjL2FwcGJhci9BcHBCYXJEaXJlY3RpdmUudHMiLCJzcmMvYXBwYmFyL0FwcEJhclBhcnREaXJlY3RpdmUudHMiLCJzcmMvYXBwYmFyL0FwcEJhclNlcnZpY2UudHMiLCJzcmMvYXBwYmFyL2luZGV4LnRzIiwic3JjL2JyZWFkY3J1bWIvQnJlYWRjcnVtYkRpcmVjdGl2ZS50cyIsInNyYy9icmVhZGNydW1iL0JyZWFkY3J1bWJTZXJ2aWNlLnRzIiwic3JjL2JyZWFkY3J1bWIvaW5kZXgudHMiLCJzcmMvY29tbW9uL05hdlNlcnZpY2UudHMiLCJzcmMvZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlci50cyIsInNyYy9kcm9wZG93bi9Ecm9wZG93bkRpcmVjdGl2ZS50cyIsInNyYy9oZWFkZXIvTmF2SGVhZGVyU2VydmljZS50cyIsInNyYy9oZWFkZXIvU3RpY2t5TmF2SGVhZGVyRGlyZWN0aXZlLnRzIiwic3JjL2hlYWRlci9pbmRleC50cyIsInNyYy9pY29uL05hdkljb25EaXJlY3RpdmUudHMiLCJzcmMvaWNvbi9OYXZJY29uU2VydmljZS50cyIsInNyYy9pY29uL2luZGV4LnRzIiwic3JjL2luZGV4LnRzIiwic3JjL2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyRGlyZWN0aXZlLnRzIiwic3JjL21lbnUvTmF2TWVudVNlcnZpY2UudHMiLCJzcmMvbWVudS9TdGlja3lOYXZNZW51RGlyZWN0aXZlLnRzIiwic3JjL21lbnUvaW5kZXgudHMiLCJzcmMvc2VhcmNoL1NlYXJjaEJhckRpcmVjdGl2ZS50cyIsInNyYy9zZWFyY2gvU2VhcmNoU2VydmljZS50cyIsInNyYy9zZWFyY2gvaW5kZXgudHMiLCJzcmMvc2lkZW5hdi9TaWRlTmF2UGFydERpcmVjdGl2ZS50cyIsInNyYy9zaWRlbmF2L1NpZGVOYXZTZXJ2aWNlLnRzIiwic3JjL3NpZGVuYXYvU3RpY2t5U2lkZU5hdkRpcmVjdGl2ZS50cyIsInNyYy9zaWRlbmF2L2luZGV4LnRzIiwic3JjL3RhYnMvVGFic0RpcmVjdGl2ZS50cyIsInRlbXAvcGlwLXdlYnVpLW5hdi1odG1sLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBRUYsUUFBQSxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUVyRDtJQUFBO0lBMkJBLENBQUM7SUFBRCx1QkFBQztBQUFELENBM0JBLEFBMkJDLElBQUE7QUEzQlksNENBQWdCO0FBNkI3QjtJQUFnQyw4QkFBZ0I7SUFBaEQ7O0lBRUEsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FGQSxBQUVDLENBRitCLGdCQUFnQixHQUUvQztBQUZZLGdDQUFVO0FBSXZCO0lBQUE7UUFFVyx5QkFBb0IsR0FBaUIsRUFBRSxDQUFDO1FBRXhDLHdCQUFtQixHQUFpQixFQUFFLENBQUM7UUFHdkMsMkJBQXNCLEdBQWlCLEVBQUUsQ0FBQztRQUUxQywwQkFBcUIsR0FBZ0IsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFBRCxvQkFBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBVlksc0NBQWE7QUFtQzFCO0lBSUksd0JBQ0ksTUFBcUIsRUFDckIsVUFBZ0M7UUFFaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELHNCQUFXLGtDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxnREFBb0I7YUFBL0I7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztRQUM3QyxDQUFDO2FBRUQsVUFBZ0MsS0FBbUI7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLGtEQUFzQjthQUFqQztZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO1FBQy9DLENBQUM7YUFFRCxVQUFrQyxLQUFtQjtZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT0Qsc0JBQVcsK0NBQW1CO2FBQTlCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7UUFDNUMsQ0FBQzthQUVELFVBQStCLEtBQW1CO1lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPRCxzQkFBVyxpREFBcUI7YUFBaEM7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztRQUM5QyxDQUFDO2FBRUQsVUFBaUMsS0FBbUI7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMQTtJQU9NLDZCQUFJLEdBQVgsVUFBWSxjQUE2QixFQUFFLGdCQUErQjtRQUN0RSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLGNBQWMsSUFBSSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7UUFDNUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSw2QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxvQ0FBVyxHQUFsQixVQUFtQixNQUFjLEVBQUUsS0FBYTtRQUM1QyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUVqRCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsVUFBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDO2dCQUNqQixDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxvQ0FBVyxHQUFsQjtRQUNJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxVQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyx3Q0FBZSxHQUF2QjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLDJCQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQTdGQSxBQTZGQyxJQUFBO0FBRUQ7SUFBQTtRQUNZLFlBQU8sR0FBa0IsSUFBSSxhQUFhLEVBQUUsQ0FBQztJQW1EekQsQ0FBQztJQWhERyxzQkFBVyxtQ0FBTTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFrQixLQUFvQjtZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssSUFBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ2hELENBQUM7OztPQUpBO0lBTUQsc0JBQVcsaURBQW9CO2FBQS9CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7UUFDN0MsQ0FBQzthQUVELFVBQWdDLEtBQW1CO1lBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNwRCxDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLG1EQUFzQjthQUFqQztZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO1FBQy9DLENBQUM7YUFFRCxVQUFrQyxLQUFtQjtZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdEQsQ0FBQzs7O09BSkE7SUFNRCxzQkFBVyxnREFBbUI7YUFBOUI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QyxDQUFDO2FBRUQsVUFBK0IsS0FBbUI7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ25ELENBQUM7OztPQUpBO0lBTUQsc0JBQVcsa0RBQXFCO2FBQWhDO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUM7UUFDOUMsQ0FBQzthQUVELFVBQWlDLEtBQW1CO1lBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNyRCxDQUFDOzs7T0FKQTtJQU1NLDhCQUFJLEdBQVgsVUFBWSxVQUFVO1FBQ2xCLFVBQVUsQ0FBQztRQUVYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVqRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQXBEQSxBQW9EQyxJQUFBO0FBRUQsT0FBTztLQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUM7S0FDcEIsUUFBUSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQzs7QUMvTjdDLFlBQVksQ0FBQztBQUdiLENBQUM7SUFFRCxrQ0FDSSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVTtRQUcvRSxRQUFRLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFekMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUNwQixVQUFVLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUV6RCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1lBQ3JCLFVBQVUsQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBRTNELE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUVsQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFdEQsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDM0IsTUFBTSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDakMsTUFBTSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFFakMsTUFBTSxDQUFDO1FBR1AsMEJBQTBCLEtBQUssRUFBRSxNQUFNO1lBQ25DLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzNCLENBQUM7UUFFRCxrQkFBa0IsTUFBTTtZQUVwQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELHFCQUFxQixNQUFNO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNkLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDZixDQUFDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDeEIsQ0FBQztRQUVELHFCQUFxQixPQUFPO1lBQ3hCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUVkLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsTUFBTTtnQkFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixLQUFLLEVBQUUsQ0FBQztnQkFDWixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRDtZQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUM7Z0JBQ3hELFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRDtZQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUM7Z0JBQ3hELFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRCxxQkFBcUIsTUFBTSxFQUFFLFdBQVc7WUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZixNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUMvQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsV0FBVyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDZixNQUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDcEMsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBQ0QsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFSixVQUFVLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRCxDQUFDO1FBQ0wsQ0FBQztJQUVMLENBQUM7SUFHRDtRQUNJLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFO2dCQUNILFlBQVksRUFBRSxrQkFBa0I7Z0JBQ2hDLGFBQWEsRUFBRSxtQkFBbUI7YUFDckM7WUFDRCxPQUFPLEVBQUUsS0FBSztZQUNkLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsVUFBVSxFQUFFLHdCQUF3QjtTQUN2QyxDQUFDO0lBQ04sQ0FBQztJQUdELE9BQU87U0FDRixNQUFNLENBQUMsWUFBWSxDQUFDO1NBQ3BCLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0FBRTdELENBQUMsQ0FBQyxFQUFFLENBQUM7O0FDeElMLFlBQVksQ0FBQztBQUdiLENBQUM7SUFFRCxvQ0FDSSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVTtRQUcvRSxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFM0MsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUNwQixVQUFVLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUUzRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1lBQ3JCLFVBQVUsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBRTdELE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUVsQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFdEQsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDM0IsTUFBTSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDakMsTUFBTSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO1FBQ3pELE1BQU0sQ0FBQyx1QkFBdUIsR0FBRyx1QkFBdUIsQ0FBQztRQUV6RCxNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUVqQyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUUzQixNQUFNLENBQUM7UUFHUCxrQkFBa0IsV0FBVyxFQUFFLEVBQUU7WUFDN0IsTUFBTSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDekIsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BCLENBQUM7UUFFRCwwQkFBMEIsS0FBSyxFQUFFLE1BQU07WUFDbkMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFM0IsQ0FBQztRQUVELGtCQUFrQixNQUFNO1lBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQscUJBQXFCLE1BQU07WUFDdkIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2QsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNmLENBQUM7WUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN4QixDQUFDO1FBRUQscUJBQXFCLE9BQU87WUFDeEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRWQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxNQUFNO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEtBQUssRUFBRSxDQUFDO2dCQUNaLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEO1lBQ0ksTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQztnQkFDeEQsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVEO1lBQ0ksTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQztnQkFDeEQsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVELHFCQUFxQixNQUFNLEVBQUUsV0FBVztZQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQy9CLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxXQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNmLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxNQUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDckMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEQsQ0FBQztnQkFDRCxNQUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVKLFVBQVUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELENBQUM7UUFDTCxDQUFDO0lBRUwsQ0FBQztJQUVEO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLEdBQUc7WUFDYixLQUFLLEVBQUU7Z0JBQ0gsWUFBWSxFQUFFLGtCQUFrQjtnQkFDaEMsYUFBYSxFQUFFLG1CQUFtQjthQUNyQztZQUNELE9BQU8sRUFBRSxLQUFLO1lBQ2QsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxVQUFVLEVBQUUsMEJBQTBCO1NBQ3pDLENBQUM7SUFDTixDQUFDO0lBRUQsT0FBTztTQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDcEIsU0FBUyxDQUFDLHFCQUFxQixFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFFakUsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7QUNoSkwsWUFBWSxDQUFDOzs7O0FBRWIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUU5RSw0QkFBMEI7QUFDMUIscUNBQW1DO0FBQ25DLHVDQUFxQztBQUVyQyxzQ0FBaUM7O0FDUmhDLFlBQVksQ0FBQztBQUdkLENBQUM7SUFFRCxtQ0FBbUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUztRQUN0RSxVQUFVLENBQUM7UUFHWCxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUl0QyxNQUFNLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFFakMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUVwRCx5QkFBeUIsS0FBSyxFQUFFLE1BQU07WUFDbEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFRDtRQUNJLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxHQUFHO1lBQ2IsVUFBVSxFQUFFLElBQUk7WUFDaEIsS0FBSyxFQUFFLElBQUk7WUFDWCxXQUFXLEVBQUUsb0JBQW9CO1lBQ2pDLFVBQVUsRUFBRSx5QkFBeUI7U0FDeEMsQ0FBQztJQUNOLENBQUM7SUFFRCxPQUFPO1NBQ0YsTUFBTSxDQUFDLFdBQVcsQ0FBQztTQUNuQixTQUFTLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRTdDLENBQUMsQ0FBQyxFQUFFLENBQUM7O0FDckNMLFlBQVksQ0FBQztBQUdiLENBQUM7SUFFRCx1Q0FBdUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVM7UUFDbEYsVUFBVSxDQUFDO1FBRVgsSUFBSSxRQUFRLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDekMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBR3JCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVixTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxlQUFlLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QyxVQUFVLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRXBELHlCQUF5QixLQUFLLEVBQUUsTUFBTTtZQUNsQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUMvQixJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUd2QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLElBQUksU0FBUyxHQUFHLGdCQUFnQixDQUFDLENBQUM7WUFFL0UsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2pDLENBQUM7SUFFTCxDQUFDO0lBR0QsNkJBQTZCLGFBQWE7UUFDdEMsVUFBVSxDQUFDO1FBRVgsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVCLE1BQU0sQ0FBQztZQUNILFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxzQkFBc0IsTUFBVyxFQUFFLFFBQVEsRUFBRSxNQUFXO2dCQUUxRCxNQUFNLENBQUMsSUFBSSxHQUFHO29CQUNWLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUMxQixDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDRCxVQUFVLEVBQUUsNkJBQTZCO1NBQzVDLENBQUM7SUFDTixDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7U0FDdEIsU0FBUyxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBRXJELENBQUMsQ0FBQyxFQUFFLENBQUM7O0FDN0RMLFlBQVksQ0FBQztBQUVGLFFBQUEsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFFbkQ7SUFBQTtJQUlBLENBQUM7SUFBRCxtQkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksb0NBQVk7QUFrQ3pCO0lBSUksdUJBQW1CLE1BQW9CLEVBQUUsVUFBZ0M7UUFDckUsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELHNCQUFXLGlDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrQ0FBTzthQUFsQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGdDQUFLO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFpQixLQUFVO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT00sNEJBQUksR0FBWCxVQUFZLEtBQVcsRUFBRSxPQUFrQixFQUFFLGlCQUE0QjtRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQzdELEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sNEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLGtDQUFVLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRU8saUNBQVMsR0FBakIsVUFBa0IsV0FBcUI7UUFBdkMsaUJBVUM7UUFURyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEIsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBQyxFQUFFO2dCQUNuQixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDTCxDQUFDO0lBRU0saUNBQVMsR0FBaEI7UUFBaUIscUJBQXdCO2FBQXhCLFVBQXdCLEVBQXhCLHFCQUF3QixFQUF4QixJQUF3QjtZQUF4QixnQ0FBd0I7O1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxvQ0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLGdDQUFRLEdBQWY7UUFBQSxpQkFLQztRQUxlLGlCQUFvQjthQUFwQixVQUFvQixFQUFwQixxQkFBb0IsRUFBcEIsSUFBb0I7WUFBcEIsNEJBQW9COztRQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7WUFDZCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLG1DQUFXLEdBQWxCO1FBQUEsaUJBS0M7UUFMa0IsaUJBQW9CO2FBQXBCLFVBQW9CLEVBQXBCLHFCQUFvQixFQUFwQixJQUFvQjtZQUFwQiw0QkFBb0I7O1FBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztZQUNkLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBQyxFQUFFLElBQUssT0FBQSxFQUFFLElBQUksQ0FBQyxFQUFQLENBQU8sQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSw0QkFBSSxHQUFYLFVBQVksSUFBWSxFQUFFLEtBQVU7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sdUNBQWUsR0FBdkI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQywwQkFBa0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0F2RkEsQUF1RkMsSUFBQTtBQUVEO0lBQUE7UUFDWSxZQUFPLEdBQWlCO1lBQzVCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFvRE4sQ0FBQztJQWpERyxzQkFBVyxrQ0FBTTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFrQixLQUFtQjtZQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssSUFBSSxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsaUNBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLEtBQVU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUVyQyxDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLG1DQUFPO2FBQWxCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ2hDLENBQUM7YUFFRCxVQUFtQixLQUFlO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdkMsQ0FBQzs7O09BSkE7SUFNTSxpQ0FBUSxHQUFmO1FBQUEsaUJBSUM7UUFKZSxpQkFBb0I7YUFBcEIsVUFBb0IsRUFBcEIscUJBQW9CLEVBQXBCLElBQW9CO1lBQXBCLDRCQUFvQjs7UUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO1lBQ2QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLG9DQUFXLEdBQWxCO1FBQUEsaUJBSUM7UUFKa0IsaUJBQW9CO2FBQXBCLFVBQW9CLEVBQXBCLHFCQUFvQixFQUFwQixJQUFvQjtZQUFwQiw0QkFBb0I7O1FBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztZQUNkLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBQyxFQUFFLElBQUssT0FBQSxFQUFFLElBQUksQ0FBQyxFQUFQLENBQU8sQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDZCQUFJLEdBQVgsVUFBWSxJQUFZLEVBQUUsS0FBVTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVNLDZCQUFJLEdBQVgsVUFBWSxVQUFnQztRQUN4QyxVQUFVLENBQUM7UUFFWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0F6REEsQUF5REMsSUFBQTtBQUVELE9BQU87S0FDRixNQUFNLENBQUMsV0FBVyxDQUFDO0tBQ25CLFFBQVEsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7O0FDNUwzQyxZQUFZLENBQUM7Ozs7QUFFYixPQUFPO0tBQ0YsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFFN0QsMkJBQXlCO0FBQ3pCLDZCQUEyQjtBQUMzQixpQ0FBK0I7QUFFL0IscUNBQWdDOztBQ1RoQyxZQUFZLENBQUM7QUFNYix5REFBNkQ7QUFDN0QseURBQTBEO0FBQzFELHlEQUF5RDtBQUd6RCxDQUFDO0lBRUQ7UUFTSSw4QkFDSSxRQUFhLEVBQ2IsVUFBZ0MsRUFDaEMsT0FBMEIsRUFDMUIsTUFBMkIsRUFDM0IsU0FBOEIsRUFDOUIsU0FBbUMsRUFDbkMsYUFBaUM7WUFFakMsVUFBVSxDQUFDO1lBVGYsaUJBdUJDO1lBWkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFHM0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXBDLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUVuQyxVQUFVLENBQUMsR0FBRyxDQUFDLDBDQUFzQixFQUFFLFVBQUMsS0FBSyxFQUFFLE1BQU0sSUFBTyxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEcsVUFBVSxDQUFDLEdBQUcsQ0FBQyx1Q0FBbUIsRUFBRSxjQUFRLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUVPLGtEQUFtQixHQUEzQixVQUE0QixLQUFLLEVBQUUsTUFBTTtZQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDO1FBRU8sK0NBQWdCLEdBQXhCO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFFOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMzQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLElBQUk7b0JBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEMsQ0FBQztZQUFDLElBQUk7Z0JBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUVNLHNDQUFPLEdBQWQsVUFBZSxJQUFvQjtZQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBRU0seUNBQVUsR0FBakI7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQywrQkFBZSxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVNLDZDQUFjLEdBQXJCLFVBQXNCLElBQW9CO1lBRXRDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVNLHlDQUFVLEdBQWpCLFVBQWtCLFdBQVcsRUFBRSxLQUFZO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVNLCtDQUFnQixHQUF2QixVQUF3QixNQUF3QjtZQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDekMsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUF3QixDQUFBO29CQUNoRSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO2dCQUNELE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQzdCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFSixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQzdCLENBQUM7UUFDTCxDQUFDO1FBQ0wsMkJBQUM7SUFBRCxDQTVHQSxBQTRHQyxJQUFBO0lBR0Q7UUFDSSxNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsR0FBRztZQUNiLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxFQUFFLEtBQUs7WUFDZCxXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFVBQVUsRUFBRSxvQkFBb0I7WUFDaEMsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFHRCxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztTQUMxQixTQUFTLENBQUMsZUFBZSxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFFckQsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7QUMzSUwsWUFBWSxDQUFDO0FBR0YsUUFBQSxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztBQUNoRCxRQUFBLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0FBRXJEO0lBQUE7SUFJQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLHdDQUFjO0FBTTNCO0lBQUE7SUFJQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLDRDQUFnQjtBQXFCN0I7SUFJSSwyQkFDSSxNQUF3QixFQUN4QixVQUFnQztRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsc0JBQVcscUNBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG1DQUFJO2FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDN0IsQ0FBQzthQUVELFVBQWdCLEtBQWE7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUUxQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BUEE7SUFTRCxzQkFBVyxvQ0FBSzthQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM5QixDQUFDO2FBRUQsVUFBaUIsS0FBdUI7WUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUUzQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BUEE7SUFTRCxzQkFBVyx1Q0FBUTthQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxDQUFDO2FBRUQsVUFBb0IsS0FBYTtZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT00sb0NBQVEsR0FBZixVQUFnQixJQUFZLEVBQUUsUUFBaUI7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxxQ0FBUyxHQUFoQixVQUFpQixLQUF1QixFQUFFLFFBQWlCO1FBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLDJDQUFlLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsOEJBQXNCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDTCx3QkFBQztBQUFELENBaEVBLEFBZ0VDLElBQUE7QUFHRDtJQUFBO1FBQ1ksWUFBTyxHQUFxQjtZQUNoQyxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxJQUFJO1lBQ1gsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQztJQW1CTixDQUFDO0lBaEJHLHNCQUFXLG9DQUFJO2FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDN0IsQ0FBQzthQUVELFVBQWdCLEtBQWE7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUM7OztPQUpBO0lBTU0saUNBQUksR0FBWCxVQUFZLFVBQWdDO1FBQ3hDLFVBQVUsQ0FBQztRQUVYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRXBFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDTCx5QkFBQztBQUFELENBeEJBLEFBd0JDLElBQUE7QUFHRCxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztLQUMxQixRQUFRLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUM7O0FDaEluRCxZQUFZLENBQUM7Ozs7QUFFYixPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFFeEYsaUNBQStCO0FBQy9CLCtCQUE2QjtBQUU3Qix5Q0FBb0M7O0FDUHBDLFlBQVksQ0FBQztBQXdCYjtJQUVJLG9CQUFtQixTQUFTO1FBQ3hCLFVBQVUsQ0FBQztRQUVYLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM3RSxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDN0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3pGLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNoRixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDN0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2hGLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNuRixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDakYsQ0FBQztJQVdNLDBCQUFLLEdBQVo7UUFFSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUd2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUd6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBR25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBR3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQWhEQSxBQWdEQyxJQUFBO0FBRUQsT0FBTztLQUNGLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDO0tBQzNCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FDNUUxQyxZQUFZLENBQUM7QUFHYixDQUFDO0lBRUQseUJBQXlCLFNBQVM7UUFDOUIsVUFBVSxDQUFDO1FBRVgsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUV4RixNQUFNLENBQUMsVUFBVSxHQUFHO1lBQ2hCLE1BQU0sQ0FBQyxZQUFZLEdBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3BFLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFRCxPQUFPO1NBQ0YsTUFBTSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQztTQUM5QixNQUFNLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRTFDLENBQUMsQ0FBQyxFQUFFLENBQUM7O0FDbkJMLFlBQVksQ0FBQztBQUdiLENBQUM7SUFFRCxxQ0FBcUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUTtRQUNwRyxVQUFVLENBQUM7UUFFWCxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzVFLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUUsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNULFlBQVksR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDdkIsWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFFckMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEdBQUcsTUFBTSxHQUFHLFlBQVksR0FBRyxRQUFRLENBQUM7UUFHdkUsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLEtBQUssU0FBUyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDNUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNyRixNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBRTdDLE1BQU0sQ0FBQyxRQUFRLEdBQUc7WUFDZCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQy9CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsUUFBUSxHQUFHLFVBQVUsS0FBSztZQUM3QixNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUMzQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQztvQkFDTCxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLEdBQUc7WUFDVixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7UUFDTCxDQUFDLENBQUM7SUFFTixDQUFDO0lBRUQ7UUFDSSxNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsR0FBRztZQUNiLEtBQUssRUFBRTtnQkFDSCxVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUUsYUFBYTtnQkFDdEIsWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLE1BQU0sRUFBRSxvQkFBb0I7Z0JBQzVCLFNBQVMsRUFBRSxHQUFHO2FBQ2pCO1lBQ0QsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxVQUFVLEVBQUUsMkJBQTJCO1NBQzFDLENBQUM7SUFDTixDQUFDO0lBRUQsT0FBTztTQUNGLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQzNDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUVqRCxDQUFDLENBQUMsRUFBRSxDQUFDOztBQzNFTCxZQUFZLENBQUM7QUFFRixRQUFBLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO0FBRXpEO0lBQUE7SUFhQSxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQWJBLEFBYUMsSUFBQTtBQWJZLDBDQUFlO0FBYTNCLENBQUM7QUEyQkY7SUFJSSwwQkFBbUIsTUFBdUIsRUFBRSxVQUFnQztRQUN4RSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsc0JBQVcsb0NBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG1DQUFLO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFpQixLQUFhO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPRCxzQkFBVyxzQ0FBUTthQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxDQUFDO2FBRUQsVUFBb0IsS0FBYTtZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT0Qsc0JBQVcsc0NBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQWE7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLG1DQUFLO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFpQixLQUFpQjtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT0Qsc0JBQVcsbUNBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLEtBQWE7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMQTtJQU9NLCtCQUFJLEdBQVgsVUFBWSxLQUFhLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLGVBQXFCO1FBQ2hGLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQ3pDLElBQUk7WUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7UUFDekMsSUFBSTtZQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUUvQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLCtCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sMENBQWUsR0FBdkI7UUFDRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyw2QkFBcUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0F0RkEsQUFzRkMsSUFBQTtBQUVEO0lBQUE7UUFDWSxZQUFPLEdBQW9CLElBQUksZUFBZSxFQUFFLENBQUM7SUEwRjdELENBQUM7SUF2Rkcsc0JBQVcscUNBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO2FBRUQsVUFBa0IsS0FBc0I7WUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUksSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNsRCxDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLDhDQUFlO2FBQTFCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1FBQ3hDLENBQUM7YUFFRCxVQUEyQixLQUFhO1lBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUN6QyxDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLG9DQUFLO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFpQixLQUFhO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMvQixDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLHVDQUFRO2FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUFvQixLQUFhO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLHVDQUFRO2FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUFvQixLQUFhO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLG9DQUFLO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFpQixLQUFpQjtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQzs7O09BSkE7SUFNRCxzQkFBVyxvQ0FBSzthQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM5QixDQUFDO2FBRUQsVUFBaUIsS0FBYTtZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQzs7O09BSkE7SUFNTSwrQkFBRyxHQUFWLFVBQVcsS0FBYSxFQUFFLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxlQUFxQjtRQUMvRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUVqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztRQUN6QyxJQUFJO1lBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRS9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQ3pDLElBQUk7WUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVNLGlDQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFTSxnQ0FBSSxHQUFYLFVBQVksVUFBZ0M7UUFDeEMsVUFBVSxDQUFDO1FBRVgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVMLHdCQUFDO0FBQUQsQ0EzRkEsQUEyRkMsSUFBQTtBQUdELE9BQU87S0FDRixNQUFNLENBQUMsY0FBYyxDQUFDO0tBQ3RCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7QUNwT2pELFlBQVksQ0FBQztBQUdiLENBQUM7SUFFRyw0Q0FBNEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVk7UUFDNUYsVUFBVSxDQUFDO1FBRVgsSUFDSSxLQUFLLEdBQUcsSUFBSSxFQUNaLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEVBQ3pELE1BQU0sRUFDTixZQUFZLEVBQ1osa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBRy9CLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUUzQyxNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUNqQyxNQUFNLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNuQyxNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUVqQyxRQUFRLENBQUM7WUFDTCxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBRTVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1lBQ3JDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7WUFDbEMsQ0FBQztZQUVELGtCQUFrQixDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVAsVUFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQzFELFVBQVUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFekQsTUFBTSxDQUFDO1FBRVA7WUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDekMsTUFBTSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMvQyxNQUFNLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDbkQsQ0FBQztRQUdELHFCQUFxQixNQUFNO1lBQ3ZCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsaUJBQWlCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFBQSxDQUFDO1FBRUYsc0JBQXNCLE1BQU07WUFDeEIsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ1YsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUEsQ0FBQztRQUVGLHdCQUF3QixLQUFLLEVBQUUsS0FBSztZQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUNoQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBRXJCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsUUFBUSxDQUFDO29CQUNMLE1BQU0sQ0FBQyxVQUFVLEdBQUcsWUFBWSxJQUFJLFlBQVksQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDO2dCQUNwRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDWixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDOUIsQ0FBQztRQUNMLENBQUM7UUFFRCwyQkFBMkIsU0FBUyxFQUFFLEtBQUs7WUFDdkMsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUNkLGNBQWMsR0FBRyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUM1RSxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLFlBQVksRUFDaEYsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLEtBQUssRUFDakQsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDLE1BQU0sRUFDcEQsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUVmLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxXQUFXLEdBQUcsZUFBZSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM5RSxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQzlDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFDbEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxVQUFVLEdBQUcsZUFBZSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQzVFLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsVUFBVSxHQUFHLGNBQWMsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDOUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUM3QyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsR0FBRyxjQUFjLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDNUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUNoRCxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2xDLENBQUM7WUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFBQSxDQUFDO1FBRUYsa0JBQWtCLE1BQU0sRUFBRSxTQUFrQjtZQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFFcEIsSUFBSSxHQUFXLENBQUM7WUFFaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzFCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixrQkFBa0IsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLEdBQUcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO1lBQ2pDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLENBQUM7UUFDTCxDQUFDO1FBRUQsNEJBQTRCLE1BQU0sRUFBRSxNQUFNO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUNwQixRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBRXZCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUM1QixNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDbEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN0QyxDQUFDO1FBRUQ7WUFDSSxVQUFVLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDL0MsQ0FBQztJQUVMLENBQUM7SUFFRDtRQUNJLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEVBRU47WUFDRCxPQUFPLEVBQUUsS0FBSztZQUNkLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsVUFBVSxFQUFFLGtDQUFrQztTQUNqRCxDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU87U0FDRixNQUFNLENBQUMsY0FBYyxDQUFDO1NBQ3RCLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0FBRW5FLENBQUMsQ0FBQyxFQUFFLENBQUM7O0FDeEpMLFlBQVksQ0FBQzs7OztBQUViLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUVuRSw4QkFBNEI7QUFDNUIsc0NBQW9DO0FBRXBDLHdDQUFtQzs7QUNQbkMsWUFBWSxDQUFDO0FBR2IsQ0FBQztJQUVELG9DQUFvQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVU7UUFDekYsVUFBVSxDQUFDO1FBR1gsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVsQyxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFFbEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXRELE1BQU0sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBRXZDLDBCQUEwQixLQUFLLEVBQUUsTUFBTTtZQUNuQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUMzQixDQUFDO1FBRUQ7WUFDSSxJQUFJLFVBQVUsRUFBRSxZQUFZLENBQUM7WUFFN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osVUFBVSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDTCxDQUFDO0lBRUwsQ0FBQztJQUVEO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLEdBQUc7WUFDYixLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELE9BQU8sRUFBRSxLQUFLO1lBQ2QsV0FBVyxFQUFFLG1CQUFtQjtZQUNoQyxVQUFVLEVBQUUsMEJBQTBCO1NBQ3pDLENBQUM7SUFDTixDQUFDO0lBR0QsT0FBTztTQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDcEIsU0FBUyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBRS9DLENBQUMsQ0FBQyxFQUFFLENBQUM7O0FDM0RMLFlBQVksQ0FBQztBQUVGLFFBQUEsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFFckQ7SUFBQTtJQVdBLENBQUM7SUFBRCxvQkFBQztBQUFELENBWEEsQUFXQyxJQUFBO0FBWFksc0NBQWE7QUFXekIsQ0FBQztBQXNCRjtJQUlJLHdCQUFtQixNQUFxQixFQUFFLFVBQWdDO1FBQ3RFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzQkFBVyxrQ0FBTTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBRU8sMkNBQWtCLEdBQTFCLFVBQTJCLGVBQXFCO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQ3pDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQztJQUNMLENBQUM7SUFFTSxpQ0FBUSxHQUFmLFVBQWdCLGVBQXFCO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxpQ0FBUSxHQUFmLFVBQWdCLElBQVksRUFBRSxlQUFxQjtRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLGlDQUFRLEdBQWYsVUFBZ0IsZUFBcUI7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLGtDQUFTLEdBQWhCLFVBQWlCLFFBQWdCLEVBQUUsZUFBcUI7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSw2QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHdDQUFlLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsMkJBQW1CLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDTCxxQkFBQztBQUFELENBN0RBLEFBNkRDLElBQUE7QUFFRDtJQUFBO1FBQ1ksWUFBTyxHQUFrQixJQUFJLGFBQWEsRUFBRSxDQUFDO0lBeUR6RCxDQUFDO0lBdERHLHNCQUFXLG1DQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQWtCLEtBQW9CO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksYUFBYSxFQUFFLENBQUM7UUFDaEQsQ0FBQzs7O09BSkE7SUFNTyw0Q0FBa0IsR0FBMUIsVUFBMkIsZUFBcUI7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7UUFDekMsSUFBSTtZQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUUvQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztRQUN6QyxJQUFJO1lBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFTSxpQ0FBTyxHQUFkLFVBQWUsZUFBcUI7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0saUNBQU8sR0FBZCxVQUFlLElBQVksRUFBRSxlQUFxQjtRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0saUNBQU8sR0FBZCxVQUFlLGVBQXFCO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLGtDQUFRLEdBQWYsVUFBZ0IsUUFBZ0IsRUFBRSxlQUFxQjtRQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sK0JBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLDhCQUFJLEdBQVgsVUFBWSxVQUFnQztRQUN4QyxVQUFVLENBQUM7UUFFWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFakUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVMLHNCQUFDO0FBQUQsQ0ExREEsQUEwREMsSUFBQTtBQUdELE9BQU87S0FDRixNQUFNLENBQUMsWUFBWSxDQUFDO0tBQ3BCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FDbks3QyxZQUFZLENBQUM7Ozs7QUFFYixPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFFckYsNEJBQTBCO0FBQzFCLDhCQUE0QjtBQUU1QixzQ0FBaUM7O0FDUGhDLFlBQVksQ0FBQzs7OztBQUVkLDBDQUF3QztBQUN4Qyw4Q0FBNEM7QUFDNUMsd0NBQXNDO0FBQ3RDLGdDQUE4QjtBQUM5QixxQkFBbUI7QUFDbkIsb0JBQWtCO0FBQ2xCLG9CQUFrQjtBQUNsQix3QkFBc0I7QUFDdEIscUJBQW1CO0FBQ25CLG9CQUFrQjtBQUNsQixrQkFBZ0I7QUFDaEIsa0JBQWdCO0FBQ2hCLCtCQUE2QjtBQUU3QixPQUFPO0tBQ0YsTUFBTSxDQUFDLFFBQVEsRUFBRTtJQUNkLGVBQWU7SUFDZixhQUFhO0lBQ2IsU0FBUztJQUNULFdBQVc7SUFDWCxjQUFjO0lBQ2QsWUFBWTtJQUNaLGVBQWU7SUFDZixZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixjQUFjO0NBQ2pCLENBQUMsQ0FBQztBQUVQLCtCQUEwQjtBQUMxQiw4QkFBeUI7QUFDekIsa0NBQTZCO0FBQzdCLDhCQUF5QjtBQUN6QiwrQkFBMEI7QUFDMUIsNEJBQXVCO0FBQ3ZCLDRCQUF1QjtBQUN2Qiw4QkFBeUI7O0FDdEN6QixZQUFZLENBQUM7QUFHYixDQUFDO0lBRUQ7UUFJSSwyQ0FDSSxNQUFXLEVBQ1gsUUFBYSxFQUNiLE1BQVcsRUFDWCxVQUFnQyxFQUNoQyxRQUE0QixFQUM1QixTQUFjO1lBRWQsVUFBVSxDQUFDO1lBY1IsY0FBUyxHQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBWnRDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUd2RixRQUFRLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBR2xDLFVBQVUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFJRCxzQkFBVyx1REFBUTtpQkFBbkI7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzdELENBQUM7OztXQUFBO1FBRU0sd0RBQVksR0FBbkIsVUFBb0IsSUFBSTtZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRU0sMkRBQWUsR0FBdEIsVUFBdUIsUUFBUTtZQUEvQixpQkFNQztZQUxHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDVixLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDO2dCQUM3QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDVixDQUFDO1FBQ0wsQ0FBQztRQUVMLHdDQUFDO0lBQUQsQ0E1Q0EsQUE0Q0MsSUFBQTtJQUVEO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLEdBQUc7WUFDYixLQUFLLEVBQUU7Z0JBQ0gsU0FBUyxFQUFFLFlBQVk7YUFDMUI7WUFDRCxPQUFPLEVBQUUsS0FBSztZQUNkLFdBQVcsRUFBRSxVQUFVLE9BQU8sRUFBRSxJQUFJO2dCQUNoQyxNQUFNLENBQUMsOEJBQThCLENBQUM7WUFDMUMsQ0FBQztZQUNELFVBQVUsRUFBRSxpQ0FBaUM7WUFDN0MsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFFRCxPQUFPO1NBQ0YsTUFBTSxDQUFDLG1CQUFtQixFQUFFO1FBQ3pCLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0I7S0FDdkQsQ0FBQztTQUNELFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0FBRTdELENBQUMsQ0FBQyxFQUFFLENBQUM7O0FDeEVMLFlBQVksQ0FBQztBQUVGLFFBQUEsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFFckQ7SUFBQTtJQTJCQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQTNCQSxBQTJCQyxJQUFBO0FBM0JZLGtDQUFXO0FBNkJ4QjtJQUFBO0lBV0EsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYWSx3Q0FBYztBQWEzQjtJQUFBO0lBR0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FIQSxBQUdDLElBQUE7QUFIWSxzQ0FBYTtBQWtCMUI7SUFJSSx3QkFDSSxNQUFxQixFQUNyQixVQUFnQztRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsc0JBQVcsb0NBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQXVCO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT0Qsc0JBQVcsdUNBQVc7YUFBdEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDcEMsQ0FBQzthQWVELFVBQXVCLEtBQWE7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FsQkE7SUFFTSx5Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBWSxFQUFFLEtBQWE7UUFDL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFL0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFVBQUMsQ0FBQztnQkFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztvQkFDZixDQUFDLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFPTSxvQ0FBVyxHQUFsQixVQUFtQixJQUFZLEVBQUUsS0FBYTtRQUMxQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUUvQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQUMsQ0FBQztZQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsVUFBQyxDQUFDO2dCQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO29CQUNmLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLG9DQUFXLEdBQWxCO1FBQ0ksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFVBQUMsQ0FBQztnQkFDZCxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyx3Q0FBZSxHQUF2QjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLDJCQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQXJFQSxBQXFFQyxJQUFBO0FBRUQ7SUFBQTtRQUNZLFlBQU8sR0FBa0I7WUFDN0IsUUFBUSxFQUFFLEVBQUU7WUFDWixXQUFXLEVBQUUsY0FBYztTQUM5QixDQUFDO0lBMkJOLENBQUM7SUF4Qkcsc0JBQVcscUNBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQXVCO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDeEMsQ0FBQzs7O09BSkE7SUFNRCxzQkFBVyx3Q0FBVzthQUF0QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUNwQyxDQUFDO2FBRUQsVUFBdUIsS0FBYTtZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDckMsQ0FBQzs7O09BSkE7SUFNTSw4QkFBSSxHQUFYLFVBQVksVUFBVTtRQUNsQixVQUFVLENBQUM7UUFFWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFakUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0EvQkEsQUErQkMsSUFBQTtBQUVELE9BQU87S0FDRixNQUFNLENBQUMsWUFBWSxDQUFDO0tBQ3BCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FDMUs3QyxZQUFZLENBQUM7QUFHYixDQUFDO0lBRUcsMENBQTBDLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVTtRQUNuSSxVQUFVLENBQUM7UUFFWCxJQUFJLGlCQUFpQixHQUFHLEdBQUcsRUFDdkIsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRW5ELFFBQVEsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUV6QyxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUd6RCxjQUFjLEVBQUUsQ0FBQztRQUVqQixNQUFNLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFFNUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNyRCxVQUFVLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRXpELE1BQU0sQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRTNCLE1BQU0sQ0FBQztRQUVQO1lBQ0ksSUFBSSxTQUFTLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQztZQUMzRSxDQUFDO1lBRUQsTUFBTSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDbkMsQ0FBQztRQUVEO1lBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUE7WUFBQyxDQUFDO1lBRW5DLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBRW5DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUMxRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osaUJBQWlCLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDdkQsQ0FBQztZQUNELFVBQVUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFRCxrQkFBa0IsSUFBSTtZQUNsQixNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFRCx3QkFBd0IsY0FBYztZQUNsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsVUFBVSxJQUFJO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEIsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVELHlCQUF5QixLQUFLLEVBQUUsTUFBTTtZQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFFcEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3RDLENBQUM7UUFFRCx3QkFBd0IsS0FBSyxFQUFFLEtBQUs7WUFHaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBRW5CLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNsQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDbkMsTUFBTSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO1lBRTdDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxrQkFBa0IsSUFBSTtZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDdEUsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN0RSxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQztZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkUsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQztZQUNMLENBQUM7WUFHRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxtQkFBbUIsS0FBSyxFQUFFLElBQUk7WUFDMUIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBRXhCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRSxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ25CLE1BQU0sQ0FBQztnQkFDWCxDQUFDO2dCQUVELFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbkIsUUFBUSxDQUFDO29CQUNMLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3RDLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUV0QixNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkUsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNuQixNQUFNLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQztvQkFDTCxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBRXRCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBRXRFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDbkIsTUFBTSxDQUFDO2dCQUNYLENBQUM7Z0JBRUQsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQixRQUFRLENBQUM7b0JBQ0wsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzFCLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3JDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzVDLENBQUM7Z0JBQ0wsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBRXRCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDaEIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTVDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QixDQUFDO0lBQ0wsQ0FBQztJQUVEO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsRUFHTjtZQUNELE9BQU8sRUFBRSxLQUFLO1lBQ2QsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxVQUFVLEVBQUUsZ0NBQWdDO1NBQy9DLENBQUM7SUFDTixDQUFDO0lBRUQsT0FBTztTQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDcEIsU0FBUyxDQUFDLGtCQUFrQixFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFFL0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7QUM3TEwsWUFBWSxDQUFDOzs7O0FBRWIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0FBRXJGLDRCQUEwQjtBQUMxQixvQ0FBa0M7QUFFbEMsc0NBQWlDOztBQ1BqQyxZQUFZLENBQUM7QUFJYixpREFBcUQ7QUFDckQsaURBQXVEO0FBR3ZELENBQUM7SUFFRDtRQVFJLDZCQUNJLFFBQVEsRUFDUixVQUFnQyxFQUNoQyxTQUF5QjtZQUV6QixVQUFVLENBQUM7WUFMZixpQkFrQkM7WUFyQk0sWUFBTyxHQUFZLEtBQUssQ0FBQztZQUN6QixXQUFNLEdBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFTOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFHekIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXBDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUMvQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0IsRUFBRSxVQUFDLEtBQUssRUFBRSxNQUFNO2dCQUM3QyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTyx5Q0FBVyxHQUFuQjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFekQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNRLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDNUQsQ0FBQztRQUNMLENBQUM7UUFFTyw2Q0FBZSxHQUF2QixVQUF3QixLQUFLLEVBQUUsTUFBTTtZQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFTyx1Q0FBUyxHQUFqQjtZQUNJLFVBQVUsQ0FBQztnQkFDUCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDcEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ25CLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDVixDQUFDO1FBRU0sb0NBQU0sR0FBYjtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVNLHFDQUFPLEdBQWQ7WUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRW5CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxJQUFJO2dCQUNBLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLG9DQUFvQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFTSxtQ0FBSyxHQUFaO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25CLENBQUM7UUFDTCxDQUFDO1FBRU0sdUNBQVMsR0FBaEIsVUFBaUIsS0FBVTtZQUV2QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRW5CLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsQ0FBQztRQUNMLENBQUM7UUFDTCwwQkFBQztJQUFELENBbkdBLEFBbUdDLElBQUE7SUFHRDtRQUNJLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsS0FBSztZQUNkLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsVUFBVSxFQUFFLG1CQUFtQjtZQUMvQixZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1NBQ3pCLFNBQVMsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUVuRCxDQUFDLENBQUMsRUFBRSxDQUFDOztBQzlITCxZQUFZLENBQUM7QUFFRixRQUFBLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDbEMsUUFBQSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUNwQyxRQUFBLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQ3hDLFFBQUEsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7QUFFdkQ7SUFBQTtJQVdBLENBQUM7SUFBRCxtQkFBQztBQUFELENBWEEsQUFXQyxJQUFBO0FBWFksb0NBQVk7QUErQnpCO0lBSUksdUJBQ0ksTUFBb0IsRUFDcEIsVUFBZ0M7UUFGcEMsaUJBU0M7UUFMRyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUU3QixVQUFVLENBQUMsR0FBRyxDQUFDLHVCQUFlLEVBQUUsY0FBUSxLQUFJLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsVUFBVSxDQUFDLEdBQUcsQ0FBQyx3QkFBZ0IsRUFBRSxjQUFRLEtBQUksQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsc0JBQVcsaUNBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG1DQUFRO2FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUFvQixLQUFhO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPRCxzQkFBVyxpQ0FBTTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMvQixDQUFDO2FBRUQsVUFBa0IsS0FBVTtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDNUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT0Qsc0JBQVcsa0NBQU87YUFBbEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDaEMsQ0FBQzthQUVELFVBQW1CLEtBQWU7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLG1DQUFRO2FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUFvQixLQUFpQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT00sMkJBQUcsR0FBVixVQUFXLFFBQW9DLEVBQUUsUUFBaUIsRUFBRSxNQUFZLEVBQUUsT0FBa0I7UUFDaEcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sNkJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sNEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLDZCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSw4QkFBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHVDQUFlLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsMEJBQWtCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDTCxvQkFBQztBQUFELENBeEZBLEFBd0ZDLElBQUE7QUFFRDtJQUFBO1FBQ1ksWUFBTyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNDLGFBQVEsR0FBa0IsSUFBSSxDQUFDO0lBVTNDLENBQUM7SUFSVSw2QkFBSSxHQUFYLFVBQVksVUFBZ0M7UUFDeEMsVUFBVSxDQUFDO1FBRVgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDTCxxQkFBQztBQUFELENBWkEsQUFZQyxJQUFBO0FBR0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7S0FDekIsUUFBUSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQzs7QUNoSjNDLFlBQVksQ0FBQzs7OztBQUViLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUV2RiwyQkFBeUI7QUFDekIsZ0NBQThCO0FBRTlCLHFDQUFnQzs7QUNQaEMsWUFBWSxDQUFDO0FBR2IsQ0FBQztJQUVHLHdDQUF3QyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVTtRQUNwRixVQUFVLENBQUM7UUFFWCxJQUFJLFFBQVEsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUMxQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFHckIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNWLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELGdCQUFnQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDekMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXRELDBCQUEwQixLQUFLLEVBQUUsTUFBTTtZQUNuQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUMvQixJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLElBQUksU0FBUyxHQUFHLGdCQUFnQixDQUFDLENBQUM7WUFFL0UsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2pDLENBQUM7SUFFTCxDQUFDO0lBRUQsOEJBQThCLGFBQWE7UUFDdkMsVUFBVSxDQUFDO1FBRVgsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVCLE1BQU0sQ0FBQztZQUNILFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxzQkFBc0IsTUFBVyxFQUFFLFFBQVEsRUFBRSxNQUFNO2dCQUNyRCxNQUFNLENBQUMsSUFBSSxHQUFHLGNBQWMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNyQyxDQUFDO1lBQ0QsVUFBVSxFQUFFLDhCQUE4QjtTQUM3QyxDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU87U0FDRixNQUFNLENBQUMsWUFBWSxDQUFDO1NBQ3BCLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBRTNELENBQUMsQ0FBQyxFQUFFLENBQUM7O0FDdkRMLFlBQVksQ0FBQztBQUVGLFFBQUEsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDMUMsUUFBQSx3QkFBd0IsR0FBRyx3QkFBd0IsQ0FBQztBQUNwRCxRQUFBLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0FBQ3BDLFFBQUEsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7QUFFakQ7SUFBQTtJQU1BLENBQUM7SUFBRCxvQkFBQztBQUFELENBTkEsQUFNQyxJQUFBO0FBTlksc0NBQWE7QUF1QzFCO0lBT0ksd0JBQW1CLE1BQXFCLEVBQUUsVUFBZ0MsRUFBRSxVQUF1QztRQUYzRyxPQUFFLEdBQUcsb0JBQW9CLENBQUM7UUFHOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVELHNCQUFXLGtDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxtQ0FBTzthQUFsQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGlDQUFLO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFpQixLQUFVO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT0Qsc0JBQVcsaUNBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBaUIsS0FBVTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsZ0NBQXdCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEUsQ0FBQzs7O09BTEE7SUFPTSw2QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVNLDhCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRU0sK0JBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTSw2QkFBSSxHQUFYO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQzVCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVNLDZCQUFJLEdBQVg7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVNLGlDQUFRLEdBQWY7UUFBQSxpQkFLQztRQUxlLGlCQUFvQjthQUFwQixVQUFvQixFQUFwQixxQkFBb0IsRUFBcEIsSUFBb0I7WUFBcEIsNEJBQW9COztRQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7WUFDZCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLG9DQUFXLEdBQWxCO1FBQUEsaUJBS0M7UUFMa0IsaUJBQW9CO2FBQXBCLFVBQW9CLEVBQXBCLHFCQUFvQixFQUFwQixJQUFvQjtZQUFwQiw0QkFBb0I7O1FBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztZQUNkLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBQyxFQUFFLElBQUssT0FBQSxFQUFFLElBQUksQ0FBQyxFQUFQLENBQU8sQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSw2QkFBSSxHQUFYLFVBQVksSUFBWSxFQUFFLEtBQVU7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sd0NBQWUsR0FBdkI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQywyQkFBbUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0F2RkEsQUF1RkMsSUFBQTtBQUVEO0lBQUE7UUFDWSxZQUFPLEdBQWtCO1lBQzdCLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQztJQW9FTixDQUFDO0lBaEVHLHNCQUFXLG1DQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQWtCLEtBQW9CO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksYUFBYSxFQUFFLENBQUM7UUFDaEQsQ0FBQzs7O09BSkE7SUFNRCxzQkFBVyxrQ0FBSzthQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM5QixDQUFDO2FBRUQsVUFBaUIsS0FBVTtZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3JDLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsaUNBQUk7YUFBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUM3QixDQUFDO2FBRUQsVUFBZ0IsS0FBYTtZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDOUIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBVyxvQ0FBTzthQUFsQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxDQUFDO2FBRUQsVUFBbUIsS0FBYztZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDakMsQ0FBQzs7O09BSkE7SUFNRCxzQkFBVyxvQ0FBTzthQUFsQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxDQUFDO2FBRUQsVUFBbUIsS0FBZTtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3ZDLENBQUM7OztPQUpBO0lBTU0sa0NBQVEsR0FBZjtRQUFBLGlCQUlDO1FBSmUsaUJBQW9CO2FBQXBCLFVBQW9CLEVBQXBCLHFCQUFvQixFQUFwQixJQUFvQjtZQUFwQiw0QkFBb0I7O1FBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztZQUNkLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxxQ0FBVyxHQUFsQjtRQUFBLGlCQUlDO1FBSmtCLGlCQUFvQjthQUFwQixVQUFvQixFQUFwQixxQkFBb0IsRUFBcEIsSUFBb0I7WUFBcEIsNEJBQW9COztRQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7WUFDZCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQUMsRUFBRSxJQUFLLE9BQUEsRUFBRSxJQUFJLENBQUMsRUFBUCxDQUFPLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSw4QkFBSSxHQUFYLFVBQVksSUFBWSxFQUFFLEtBQVU7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFFTSw4QkFBSSxHQUFYLFVBQVksVUFBZ0MsRUFBRSxVQUF1QztRQUNqRixVQUFVLENBQUM7UUFFWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTdFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDTCxzQkFBQztBQUFELENBM0VBLEFBMkVDLElBQUE7QUFFRCwyQkFBMkIsVUFBZ0MsRUFBRSxVQUEyQjtJQUNwRixVQUFVLENBQUMsR0FBRyxDQUFDLHdCQUFnQixFQUFFLGNBQVEsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsVUFBVSxDQUFDLEdBQUcsQ0FBQyx5QkFBaUIsRUFBRSxjQUFRLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUFFRCxPQUFPO0tBQ0YsTUFBTSxDQUFDLFlBQVksQ0FBQztLQUNwQixRQUFRLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQztLQUN2QyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7QUM1TjVCLFlBQVksQ0FBQztBQUdiLENBQUM7SUFFRywwQ0FBMEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVTtRQUM3RyxVQUFVLENBQUM7UUFHWCxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxFQUN2RSxhQUFhLEdBQUcsV0FBVyxFQUMzQixRQUFRLEdBQUcsR0FBRyxFQUNkLFdBQVcsR0FBRyxHQUFHLEVBQ2pCLFVBQVUsR0FBRyxFQUFFLEVBQ2YsVUFBVSxHQUFHLEtBQUssRUFDbEIsaUJBQWlCLEdBQUcsR0FBRyxFQUN2QixnQkFBZ0IsQ0FBQztRQUVyQixRQUFRLEdBQUcsUUFBUSxLQUFLLFNBQVMsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRXhELE1BQU0sQ0FBQyxRQUFRLEdBQUc7WUFDZCxNQUFNLEVBQUU7Z0JBQ0osRUFBRSxFQUFFLFFBQVE7Z0JBQ1osUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixjQUFjLEVBQUUsS0FBSztnQkFDckIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLGdCQUFnQixFQUFFLEtBQUs7YUFDMUI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsUUFBUSxFQUFFLDJDQUEyQztnQkFDckQsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFlBQVksRUFBRSxJQUFJO2dCQUNsQixjQUFjLEVBQUUsS0FBSztnQkFDckIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLGdCQUFnQixFQUFFLElBQUk7YUFDekI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFlBQVksRUFBRSxJQUFJO2dCQUNsQixjQUFjLEVBQUUsSUFBSTtnQkFDcEIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLGdCQUFnQixFQUFFLElBQUk7YUFDekI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osRUFBRSxFQUFFLFFBQVE7Z0JBQ1osUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFlBQVksRUFBRSxJQUFJO2dCQUNsQixjQUFjLEVBQUUsS0FBSztnQkFDckIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLGdCQUFnQixFQUFFLEtBQUs7YUFDMUI7U0FDSixDQUFDO1FBRUYsZ0JBQWdCLEdBQUcsY0FBYyxFQUFFLENBQUM7UUFHcEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6RCxRQUFRLENBQUM7Z0JBQ0wsZ0JBQWdCLEVBQUUsQ0FBQTtZQUN0QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFUixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELFVBQVUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDL0MsVUFBVSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQzNCLFFBQVEsQ0FBQztnQkFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVosQ0FBQztRQUVELFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDcEQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXRELE1BQU0sQ0FBQztRQUdQO1lBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNwRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDaEMsQ0FBQztRQUNMLENBQUM7UUFFRCwwQkFBMEIsS0FBSyxFQUFFLE1BQU07WUFDbkMsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUUxQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDakIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLENBQUM7UUFDTCxDQUFDO1FBRUQsd0JBQXdCLEtBQUs7WUFDekIsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFFRCx3QkFBd0IsS0FBSyxFQUFFLEtBQUs7WUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQUVEO1lBQ0ksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDYixRQUFRLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFFOUMsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM5QyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN6RCxJQUFJLFlBQVksR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFdkQsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxFQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxRQUFRLENBQUMsUUFBUSxDQUFHLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsWUFBWSxHQUFHLGdCQUFnQixDQUFDLEVBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsRUFBRyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQixNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBK0J2QixDQUFDO1FBRUQsa0JBQWtCLEtBQWE7WUFDM0IsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFFbkUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLFFBQVEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM1QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBTUQsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWhELFVBQVUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUV2QyxRQUFRLENBQUM7Z0JBQ0wsZ0JBQWdCLEVBQUUsQ0FBQTtZQUN0QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFHUCxRQUFRLENBQUM7Z0JBQ0wsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUUxQixDQUFDO0lBQ0wsQ0FBQztJQUVEO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLEdBQUc7WUFDYixVQUFVLEVBQUUsSUFBSTtZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsVUFBVSxFQUFFLGdDQUFnQztTQUMvQyxDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU87U0FDRixNQUFNLENBQUMsWUFBWSxDQUFDO1NBQ3BCLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBRS9ELENBQUMsQ0FBQyxFQUFFLENBQUM7O0FDMU9MLFlBQVksQ0FBQzs7OztBQUViLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUVqRSw0QkFBMEI7QUFDMUIsa0NBQWdDO0FBQ2hDLG9DQUFrQztBQUVsQyxzQ0FBaUM7O0FDUmpDLFlBQVksQ0FBQztBQUdiLENBQUM7SUFFRyxpQ0FBaUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTTtRQUM5RixVQUFVLENBQUM7UUFFWCxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxFQUN2RSxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksRUFDdkUsWUFBWSxHQUFHLFNBQVMsQ0FBQztRQUU3QixNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVyQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDVCxZQUFZLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLFlBQVksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBRXJDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxZQUFZLEdBQUcsUUFBUSxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDZixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxZQUFZLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDckUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNwRSxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxLQUFLLFNBQVMsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzVELE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFFekUsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4RixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2YsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDakQsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3JFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixZQUFZLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDcEUsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUV4RCxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMzQixNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUNqQyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMzQixNQUFNLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVuQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxVQUFVLFFBQVE7Z0JBQzNDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLFFBQVEsSUFBSSxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELE1BQU0sQ0FBQztRQUVQO1lBQ0ksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDL0IsQ0FBQztRQUNMLENBQUM7UUFBQSxDQUFDO1FBRUYscUJBQXFCLEtBQUs7WUFDdEIsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFBQSxDQUFDO1FBRUYsa0JBQWtCLEtBQUs7WUFDbkIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUM5QixNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDcEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDeEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekYsQ0FBQztRQUNMLENBQUM7UUFBQSxDQUFDO1FBRUY7WUFDSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1FBQ0wsQ0FBQztRQUFBLENBQUM7UUFFRjtZQUNJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzdCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7UUFDTCxDQUFDO1FBQUEsQ0FBQztRQUVGLG1CQUFtQixLQUFLO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3pCLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkMsTUFBTSxDQUFDLEtBQUssSUFBSSxHQUFHLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQztRQUMzQyxDQUFDO0lBRUwsQ0FBQztJQUdEO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLEdBQUc7WUFDYixLQUFLLEVBQUU7Z0JBQ0gsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixjQUFjLEVBQUUsZ0JBQWdCO2dCQUNoQyxXQUFXLEVBQUUsaUJBQWlCO2dCQUM5QixNQUFNLEVBQUUsZ0JBQWdCO2FBQzNCO1lBQ0QsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixVQUFVLEVBQUUsdUJBQXVCO1NBQ3RDLENBQUM7SUFDTixDQUFDO0lBR0QsT0FBTztTQUNGLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3ZDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFFN0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7QUM5SEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IEFjdGlvbnNDaGFuZ2VkRXZlbnQgPSAncGlwQWN0aW9uc0NoYW5nZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpbXBsZUFjdGlvbkl0ZW0ge1xyXG4gICAgLy8gTmFtZSB0byByZWZlciB0byB0aGUgaXRlbVxyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIC8vIExpbmsgdmlzaWJsZSB0aXRsZVxyXG4gICAgcHVibGljIHRpdGxlPzogc3RyaW5nO1xyXG4gICAgLy8gU2hvdyBkaXZpZGVyIGluc3RlYWQgb2YgdGl0bGVcclxuICAgIHB1YmxpYyBkaXZpZGVyPzogYm9vbGVhbjtcclxuICAgIC8vIEljb24gbmFtZSBmcm9tICRpY29uUHJvdmlkZXJcclxuICAgIHB1YmxpYyBpY29uPzogc3RyaW5nO1xyXG4gICAgLy8gQ291bnRlciBiYWRnZVxyXG4gICAgcHVibGljIGNvdW50PzogbnVtYmVyO1xyXG4gICAgLy8gQWNjZXNzIGZ1bmN0aW9uXHJcbiAgICBwdWJsaWMgYWNjZXNzPzogKGFjdGlvbjogU2ltcGxlQWN0aW9uSXRlbSkgPT4gYm9vbGVhbjtcclxuICAgIC8vIFNob3cgb24gc3BlY2lmaWVkIGJyZWFrcG9pbnRzXHJcbiAgICBwdWJsaWMgYnJlYWtwb2ludHM/OiBzdHJpbmdbXTtcclxuICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcbiAgICBwdWJsaWMgaHJlZj86IHN0cmluZztcclxuICAgIC8vICRsb2NhdGlvbi51cmxcclxuICAgIHB1YmxpYyB1cmw/OiBzdHJpbmc7XHJcbiAgICAvLyAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zKVxyXG4gICAgcHVibGljIHN0YXRlPzogc3RyaW5nO1xyXG4gICAgLy8gUGFyYW1ldGVycyBmb3IgJHN0YXRlLmdvKHN0YXRlLCBzdGF0ZVBhcmFtcylcclxuICAgIHB1YmxpYyBzdGF0ZVBhcmFtcz86IGFueTtcclxuICAgIC8vICRyb290U2NvcGUuYnJvYWRjYXN0KGV2ZW50KVxyXG4gICAgcHVibGljIGV2ZW50Pzogc3RyaW5nO1xyXG4gICAgLy8gQ2xpY2sgY2FsbGJhY2tcclxuICAgIHB1YmxpYyBjbGljaz86IChhY3Rpb246IFNpbXBsZUFjdGlvbkl0ZW0pID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25JdGVtIGV4dGVuZHMgU2ltcGxlQWN0aW9uSXRlbSB7XHJcbiAgICBwdWJsaWMgc3ViQWN0aW9uczogU2ltcGxlQWN0aW9uSXRlbVtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uc0NvbmZpZyB7XHJcbiAgICAvLyBQcmltYXJ5IGdsb2JhbCBhY3Rpb25zIHZpc2libGUgb24gdGhlIHNjcmVlblxyXG4gICAgcHVibGljIHByaW1hcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW10gPSBbXTtcclxuICAgIC8vIFByaW1hcnkgbG9jYWwgYWN0aW9ucyB2aXNpYmxlIG9uIHRoZSBzY3JlZW5cclxuICAgIHB1YmxpYyBwcmltYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW10gPSBbXTtcclxuXHJcbiAgICAvLyBTZWNvbmRhcnkgZ2xvYmFsIGFjdGlvbnMgYXZhaWxhYmxlIGluIHBvcHVwXHJcbiAgICBwdWJsaWMgc2Vjb25kYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdID0gW107XHJcbiAgICAvLyBTZWNvbmRhcnkgbG9jYWwgYWN0aW9ucyBhdmFpbGFibGUgaW4gcG9wdXBcclxuICAgIHB1YmxpYyBzZWNvbmRhcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXT0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbnNTZXJ2aWNlIHtcclxuICAgIHJlYWRvbmx5IGNvbmZpZzogQWN0aW9uc0NvbmZpZztcclxuXHJcbiAgICBwcmltYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgcHJpbWFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107ICAgIFxyXG5cclxuICAgIHNob3cocHJpbWFyeUFjdGlvbnM/OiBBY3Rpb25JdGVtW10sIHNlY29uZGFyeUFjdGlvbnM/OiBBY3Rpb25JdGVtW10pOiB2b2lkO1xyXG4gICAgaGlkZSgpOiB2b2lkO1xyXG4gICAgdXBkYXRlQ291bnQobGluazogc3RyaW5nLCBjb3VudDogbnVtYmVyKTogdm9pZDsgXHJcbiAgICBjbGVhckNvdW50cygpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25zUHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGNvbmZpZzogQWN0aW9uc0NvbmZpZztcclxuICAgIFxyXG4gICAgcHJpbWFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHByaW1hcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHNlY29uZGFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHNlY29uZGFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdOyAgICBcclxufVxyXG5cclxuY2xhc3MgQWN0aW9uc1NlcnZpY2UgaW1wbGVtZW50cyBJQWN0aW9uc1NlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBY3Rpb25zQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBBY3Rpb25zQ29uZmlnLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBY3Rpb25zQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByaW1hcnlMb2NhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY29uZGFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwcmltYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSwgc2Vjb25kYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gcHJpbWFyeUFjdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9IHNlY29uZGFyeUFjdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDb3VudChhY3Rpb246IHN0cmluZywgY291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChhY3Rpb24gPT0gbnVsbCB8fCAhXy5pc051bWJlcihjb3VudCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGEubmFtZSA9PSBhY3Rpb24pXHJcbiAgICAgICAgICAgICAgICBhLmNvdW50ID0gY291bnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYS5uYW1lID09IGFjdGlvbilcclxuICAgICAgICAgICAgICAgIGEuY291bnQgPSBjb3VudDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJDb3VudHMoKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgYS5jb3VudCA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBhLmNvdW50ID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDaGFuZ2VFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoQWN0aW9uc0NoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQWN0aW9uc1Byb3ZpZGVyIGltcGxlbWVudHMgSUFjdGlvbnNQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEFjdGlvbnNDb25maWcgPSBuZXcgQWN0aW9uc0NvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWN0aW9uc1NlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogQWN0aW9uc0NvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogQWN0aW9uc0NvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBBY3Rpb25zQ29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwcmltYXJ5R2xvYmFsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucHJpbWFyeUdsb2JhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwcmltYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHByaW1hcnlMb2NhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwcmltYXJ5TG9jYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWNvbmRhcnlMb2NhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IEFjdGlvbnNTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEFjdGlvbnMnKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBBY3Rpb25zJywgQWN0aW9uc1Byb3ZpZGVyKTtcclxuXHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gUHJpbWFyeUFjdGlvbnNDb250cm9sbGVyKFxyXG4gICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24sICRpbmplY3RvciwgcGlwQWN0aW9ucykge1xyXG5cclxuICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1wcmltYXJ5LWFjdGlvbnMnKTtcclxuXHJcbiAgICBpZiAoJHNjb3BlLmxvY2FsQWN0aW9ucykgXHJcbiAgICAgICAgcGlwQWN0aW9ucy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gJHNjb3BlLmxvY2FsQWN0aW9ucztcclxuXHJcbiAgICBpZiAoJHNjb3BlLmdsb2JhbEFjdGlvbnMpXHJcbiAgICAgICAgcGlwQWN0aW9ucy5wcmltYXJ5R2xvYmFsQWN0aW9ucyA9ICRzY29wZS5nbG9iYWxBY3Rpb25zO1xyXG5cclxuICAgICRzY29wZS5jb25maWcgPSBwaXBBY3Rpb25zLmNvbmZpZztcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbigncGlwQWN0aW9uc0NoYW5nZWQnLCBvbkFjdGlvbnNDaGFuZ2VkKTtcclxuXHJcbiAgICAkc2NvcGUuaXNIaWRkZW4gPSBpc0hpZGRlbjtcclxuICAgICRzY29wZS5hY3Rpb25Db3VudCA9IGFjdGlvbkNvdW50O1xyXG4gICAgJHNjb3BlLmNsaWNrQWN0aW9uID0gY2xpY2tBY3Rpb247XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBmdW5jdGlvbiBvbkFjdGlvbnNDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAkc2NvcGUuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzSGlkZGVuKGFjdGlvbikge1xyXG4gICAgICAgIC8vIFRvZG86IENoZWNrIGJyZWFrcG9pbnRzIGhlcmVcclxuICAgICAgICByZXR1cm4gYWN0aW9uLmFjY2VzcyAmJiAhYWN0aW9uLmFjY2VzcyhhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGlvbkNvdW50KGFjdGlvbikge1xyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPT09IG51bGwgfHwgYWN0aW9uLmNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uLmNvdW50ID4gOTkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICchJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhY3Rpb24uY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY0FjdGlvbnMoYWN0aW9ucykge1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIF8uZWFjaChhY3Rpb25zLCBmdW5jdGlvbiAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNIaWRkZW4oYWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5QWN0aW9uc1Zpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwIHx8XHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5RGl2aWRlclZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwICYmXHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tBY3Rpb24oYWN0aW9uLCAkbWRPcGVuTWVudSkge1xyXG4gICAgICAgIGlmICghYWN0aW9uIHx8IGFjdGlvbi5kaXZpZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xvc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm9yaWdpbmF0b3JFdiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLm1lbnUpIHtcclxuICAgICAgICAgICAgJG1kT3Blbk1lbnUoJHNjb3BlLm9yaWdpbmF0b3JFdik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xpY2spIHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uaHJlZikge1xyXG4gICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhY3Rpb24uaHJlZjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi51cmwpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnVybChhY3Rpb24udXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5zdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoJGluamVjdG9yLmhhcygnJHN0YXRlJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhhY3Rpb24uc3RhdGUsIGFjdGlvbi5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoYWN0aW9uLmV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgcmFpc2Ugbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwQWN0aW9uQ2xpY2tlZCcsIGFjdGlvbi5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcHJpbWFyeUFjdGlvbnNEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbG9jYWxBY3Rpb25zOiAnPXBpcExvY2FsQWN0aW9ucycsXHJcbiAgICAgICAgICAgIGdsb2JhbEFjdGlvbnM6ICc9cGlwR2xvYmFsQWN0aW9ucydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYWN0aW9ucy9QcmltYXJ5QWN0aW9ucy5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBQcmltYXJ5QWN0aW9uc0NvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBY3Rpb25zJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcFByaW1hcnlBY3Rpb25zJywgcHJpbWFyeUFjdGlvbnNEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmZ1bmN0aW9uIFNlY29uZGFyeUFjdGlvbnNDb250cm9sbGVyKFxyXG4gICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24sICRpbmplY3RvciwgcGlwQWN0aW9ucykge1xyXG5cclxuICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zZWNvbmRhcnktYWN0aW9ucycpO1xyXG5cclxuICAgIGlmICgkc2NvcGUubG9jYWxBY3Rpb25zKSBcclxuICAgICAgICBwaXBBY3Rpb25zLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9ICRzY29wZS5sb2NhbEFjdGlvbnM7XHJcblxyXG4gICAgaWYgKCRzY29wZS5nbG9iYWxBY3Rpb25zKSBcclxuICAgICAgICBwaXBBY3Rpb25zLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSAkc2NvcGUuZ2xvYmFsQWN0aW9ucztcclxuXHJcbiAgICAkc2NvcGUuY29uZmlnID0gcGlwQWN0aW9ucy5jb25maWc7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJ3BpcEFjdGlvbnNDaGFuZ2VkJywgb25BY3Rpb25zQ2hhbmdlZCk7XHJcblxyXG4gICAgJHNjb3BlLmlzSGlkZGVuID0gaXNIaWRkZW47XHJcbiAgICAkc2NvcGUuYWN0aW9uQ291bnQgPSBhY3Rpb25Db3VudDtcclxuICAgICRzY29wZS5zZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSA9IHNlY29uZGFyeUFjdGlvbnNWaXNpYmxlO1xyXG4gICAgJHNjb3BlLnNlY29uZGFyeURpdmlkZXJWaXNpYmxlID0gc2Vjb25kYXJ5RGl2aWRlclZpc2libGU7XHJcblxyXG4gICAgJHNjb3BlLmNsaWNrQWN0aW9uID0gY2xpY2tBY3Rpb247XHJcblxyXG4gICAgJHNjb3BlLm9wZW5NZW51ID0gb3Blbk1lbnU7XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1lbnUoJG1kT3Blbk1lbnUsIGV2KSB7XHJcbiAgICAgICAgJHNjb3BlLm9yaWdpbmF0b3JFdiA9IGV2O1xyXG4gICAgICAgICRtZE9wZW5NZW51KGV2KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvbkFjdGlvbnNDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAkc2NvcGUuY29uZmlnID0gY29uZmlnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0hpZGRlbihhY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gYWN0aW9uLmFjY2VzcyAmJiAhYWN0aW9uLmFjY2VzcyhhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGlvbkNvdW50KGFjdGlvbikge1xyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPT09IG51bGwgfHwgYWN0aW9uLmNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uLmNvdW50ID4gOTkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICchJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhY3Rpb24uY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY0FjdGlvbnMoYWN0aW9ucykge1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIF8uZWFjaChhY3Rpb25zLCBmdW5jdGlvbiAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNIaWRkZW4oYWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5QWN0aW9uc1Zpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwIHx8XHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5RGl2aWRlclZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwICYmXHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tBY3Rpb24oYWN0aW9uLCAkbWRPcGVuTWVudSkge1xyXG4gICAgICAgIGlmICghYWN0aW9uIHx8IGFjdGlvbi5kaXZpZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xvc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm9yaWdpbmF0b3JFdiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLm1lbnUpIHtcclxuICAgICAgICAgICAgJG1kT3Blbk1lbnUoJHNjb3BlLm9yaWdpbmF0b3JFdik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xpY2spIHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uaHJlZikge1xyXG4gICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhY3Rpb24uaHJlZjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi51cmwpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnVybChhY3Rpb24udXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5zdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoJGluamVjdG9yLmhhcygnJHN0YXRlJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhhY3Rpb24uc3RhdGUsIGFjdGlvbi5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoYWN0aW9uLmV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgcmFpc2Ugbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwQWN0aW9uQ2xpY2tlZCcsIGFjdGlvbi5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWNvbmRhcnlBY3Rpb25zRGlyZWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGxvY2FsQWN0aW9uczogJz1waXBMb2NhbEFjdGlvbnMnLFxyXG4gICAgICAgICAgICBnbG9iYWxBY3Rpb25zOiAnPXBpcEdsb2JhbEFjdGlvbnMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9ucy5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBTZWNvbmRhcnlBY3Rpb25zQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQWN0aW9ucycpXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBTZWNvbmRhcnlBY3Rpb25zJywgc2Vjb25kYXJ5QWN0aW9uc0RpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBBY3Rpb25zJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UZW1wbGF0ZXMnLCAndWkucm91dGVyJ10pO1xyXG5cclxuaW1wb3J0ICcuL0FjdGlvbnNTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1ByaW1hcnlBY3Rpb25zRGlyZWN0aXZlJztcclxuaW1wb3J0ICcuL1NlY29uZGFyeUFjdGlvbnNEaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9BY3Rpb25zU2VydmljZSc7Iiwi77u/J3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5mdW5jdGlvbiBBcHBCYXJEaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRyb290U2NvcGUsIHBpcEFwcEJhcikge1xyXG4gICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1hcHBiYXInKTtcclxuICAgICRlbGVtZW50LmFkZENsYXNzKCdjb2xvci1wcmltYXJ5LWJnJyk7XHJcbiAgICBcclxuICAgIC8vJHNjb3BlLiRlbWl0KCdwaXBSZXNpemVXaW5kb3cnKTtcclxuXHJcbiAgICAkc2NvcGUuY29uZmlnID0gcGlwQXBwQmFyLmNvbmZpZztcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbigncGlwQXBwQmFyQ2hhbmdlZCcsIG9uQXBwQmFyQ2hhbmdlZCk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25BcHBCYXJDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAkc2NvcGUuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBiYXJEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcclxuICAgICAgICBzY29wZTogdHJ1ZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcGJhci9BcHBCYXIuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogQXBwQmFyRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQXBwQmFyJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcEFwcGJhcicsIGFwcGJhckRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gQXBwQmFyUGFydERpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCBwaXBBcHBCYXIpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICB2YXIgcGFydE5hbWUgPSAnJyArICRhdHRycy5waXBBcHBiYXJQYXJ0O1xyXG4gICAgdmFyIHBhcnRWYWx1ZSA9IG51bGw7XHJcblxyXG4gICAgLy8gQnJlYWsgcGFydCBhcGFydFxyXG4gICAgdmFyIHBvcyA9IHBhcnROYW1lLmluZGV4T2YoJzonKTtcclxuICAgIGlmIChwb3MgPiAwKSB7XHJcbiAgICAgICAgcGFydFZhbHVlID0gcGFydE5hbWUuc3Vic3RyKHBvcyArIDEpO1xyXG4gICAgICAgIHBhcnROYW1lID0gcGFydE5hbWUuc3Vic3RyKDAsIHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25BcHBCYXJDaGFuZ2VkKG51bGwsIHBpcEFwcEJhci5jb25maWcpO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCdwaXBBcHBCYXJDaGFuZ2VkJywgb25BcHBCYXJDaGFuZ2VkKTtcclxuXHJcbiAgICBmdW5jdGlvbiBvbkFwcEJhckNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgIHZhciBwYXJ0cyA9IGNvbmZpZy5wYXJ0cyB8fCB7fTtcclxuICAgICAgICB2YXIgY3VycmVudFBhcnRWYWx1ZSA9IHBhcnRzW3BhcnROYW1lXTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHZpc2libGUgdmFyaWFibGUgdG8gc3dpdGNoIG5nSWZcclxuICAgICAgICB2YXIgdmlzaWJsZSA9ICEhKHBhcnRWYWx1ZSA/IGN1cnJlbnRQYXJ0VmFsdWUgPT0gcGFydFZhbHVlIDogY3VycmVudFBhcnRWYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmICh2aXNpYmxlICE9ICRzY29wZS52aXNpYmxlKVxyXG4gICAgICAgICAgICAkc2NvcGUudmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vLyBFeGFtcGxlIGlzIHRha2VuIGZyb20gaGVyZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMDMyNTQ4MC9hbmd1bGFyanMtd2hhdHMtdGhlLWJlc3QtcHJhY3RpY2UtdG8tYWRkLW5naWYtdG8tYS1kaXJlY3RpdmUtcHJvZ3JhbW1hdGljYWxseVxyXG5mdW5jdGlvbiBhcHBiYXJQYXJ0RGlyZWN0aXZlKG5nSWZEaXJlY3RpdmUpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICB2YXIgbmdJZiA9IG5nSWZEaXJlY3RpdmVbMF07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0cmFuc2NsdWRlOiBuZ0lmLnRyYW5zY2x1ZGUsXHJcbiAgICAgICAgcHJpb3JpdHk6IG5nSWYucHJpb3JpdHksXHJcbiAgICAgICAgdGVybWluYWw6IG5nSWYudGVybWluYWwsXHJcbiAgICAgICAgcmVzdHJpY3Q6IG5nSWYucmVzdHJpY3QsXHJcbiAgICAgICAgc2NvcGU6IHRydWUsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gbGlua0Z1bmN0aW9uKCRzY29wZTogYW55LCAkZWxlbWVudCwgJGF0dHJzOiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gVmlzdWFsaXplIGJhc2VkIG9uIHZpc2libGUgdmFyaWFibGUgaW4gc2NvcGVcclxuICAgICAgICAgICAgJGF0dHJzLm5nSWYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnZpc2libGU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG5nSWYubGluay5hcHBseShuZ0lmLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogQXBwQmFyUGFydERpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBBcHBCYXInKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwQXBwYmFyUGFydCcsIGFwcGJhclBhcnREaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IEFwcEJhckNoYW5nZWRFdmVudCA9ICdwaXBBcHBCYXJDaGFuZ2VkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBCYXJDb25maWcge1xyXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxufSBcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFwcEJhclNlcnZpY2Uge1xyXG4gICAgcmVhZG9ubHkgY29uZmlnOiBBcHBCYXJDb25maWc7XHJcbiAgICByZWFkb25seSBjbGFzc2VzOiBzdHJpbmdbXTtcclxuICAgIHBhcnRzOiBhbnk7XHJcblxyXG4gICAgc2hvdyhwYXJ0cz86IGFueSwgY2xhc3Nlcz86IHN0cmluZ1tdLCBzaGFkb3dCcmVha3BvaW50cz86IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIGhpZGUoKTogdm9pZDtcclxuIFxyXG4gICAgYWRkU2hhZG93KC4uLmJyZWFrcG9pbnRzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVTaGFkb3coKTogdm9pZDtcclxuIFxyXG4gICAgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG4gXHJcbiAgICBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFwcEJhclByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBjb25maWc6IEFwcEJhckNvbmZpZztcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxuXHJcbiAgICBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcblxyXG4gICAgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBBcHBCYXJTZXJ2aWNlIGltcGxlbWVudHMgSUFwcEJhclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBcHBCYXJDb25maWc7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IEFwcEJhckNvbmZpZywgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBcHBCYXJDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJ0cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gdmFsdWUgfHwge307XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwYXJ0cz86IGFueSwgY2xhc3Nlcz86IHN0cmluZ1tdLCBzaGFkb3dCcmVha3BvaW50cz86IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHBhcnRzIHx8IHRoaXMuX2NvbmZpZy5wYXJ0cyB8fCB7fTtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IGNsYXNzZXMgfHwgdGhpcy5fY29uZmlnLmNsYXNzZXMgfHwgW107XHJcbiAgICAgICAgaWYgKHNoYWRvd0JyZWFrcG9pbnRzKSB0aGlzLnNldFNoYWRvdyhzaGFkb3dCcmVha3BvaW50cyk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlU2hhZG93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjKSA9PiBjLnN0YXJ0c1dpdGgoJ3BpcC1zaGFkb3cnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTaGFkb3coYnJlYWtwb2ludHM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oaWRlU2hhZG93KCk7XHJcblxyXG4gICAgICAgIGlmIChicmVha3BvaW50cyAhPSBudWxsICYmIGJyZWFrcG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgXy5lYWNoKGJyZWFrcG9pbnRzLCAoYnApID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goJ3BpcC1zaGFkb3ctJyArIGJwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaCgncGlwLXNoYWRvdycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkU2hhZG93KC4uLmJyZWFrcG9pbnRzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0U2hhZG93KGJyZWFrcG9pbnRzKTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVTaGFkb3coKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oaWRlU2hhZG93KCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBfLnJlamVjdCh0aGlzLl9jb25maWcuY2xhc3NlcywgKGNjKSA9PiBjYyA9PSBjKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHNbcGFydF0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KEFwcEJhckNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQXBwQmFyUHJvdmlkZXIgaW1wbGVtZW50cyBJQXBwQmFyUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBcHBCYXJDb25maWcgPSB7XHJcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICBwYXJ0czoge30sXHJcbiAgICAgICAgY2xhc3NlczogW11cclxuICAgIH07XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBcHBCYXJTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IEFwcEJhckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogQXBwQmFyQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsdWUgfHwgbmV3IEFwcEJhckNvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFydHMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnBhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFydHModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHZhbHVlIHx8IHt9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsYXNzZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNsYXNzZXModmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaChjKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBfLnJlamVjdCh0aGlzLl9jb25maWcuY2xhc3NlcywgKGNjKSA9PiBjYyA9PSBjKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzW3BhcnRdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgQXBwQmFyU2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH0gICAgIFxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBcHBCYXInKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBBcHBCYXInLCBBcHBCYXJQcm92aWRlcik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEFwcEJhcicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL0FwcEJhclNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vQXBwQmFyRGlyZWN0aXZlJztcclxuaW1wb3J0ICcuL0FwcEJhclBhcnREaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9BcHBCYXJTZXJ2aWNlJztcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlQWN0aW9uSXRlbSB9IGZyb20gJy4uL2FjdGlvbnMvQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBCcmVhZGNydW1iSXRlbSB9IGZyb20gJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCcmVhZGNydW1iQ29uZmlnIH0gZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IElCcmVhZGNydW1iU2VydmljZSB9IGZyb20gJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCcmVhZGNydW1iQ2hhbmdlZEV2ZW50IH0gZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWJCYWNrRXZlbnQgfSBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgT3BlblNlYXJjaEV2ZW50IH0gZnJvbSAnLi4vc2VhcmNoL1NlYXJjaFNlcnZpY2UnXHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmNsYXNzIEJyZWFkY3J1bWJDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF93aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9pbmplY3RvcjogbmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBvcmlnaW5hdG9yRXY6IEV2ZW50O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkZWxlbWVudDogYW55LCBcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuICAgICAgICAkc3RhdGU6IG5nLnVpLklTdGF0ZVNlcnZpY2UsXHJcbiAgICAgICAgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICRpbmplY3RvcjogbmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgIHBpcEJyZWFkY3J1bWI6IElCcmVhZGNydW1iU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgIHRoaXMuX3dpbmRvdyA9ICR3aW5kb3c7XHJcbiAgICAgICAgdGhpcy5fbG9jYXRpb24gPSAkbG9jYXRpb247XHJcbiAgICAgICAgdGhpcy5faW5qZWN0b3IgPSAkaW5qZWN0b3I7XHJcblxyXG4gICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtYnJlYWRjcnVtYicpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHBpcEJyZWFkY3J1bWIuY29uZmlnO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbihCcmVhZGNydW1iQ2hhbmdlZEV2ZW50LCAoZXZlbnQsIGNvbmZpZykgPT4geyB0aGlzLm9uQnJlYWRjcnVtYkNoYW5nZWQoZXZlbnQsIGNvbmZpZyk7IH0pO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKEJyZWFkY3J1bWJCYWNrRXZlbnQsICgpID0+IHsgdGhpcy5vbkJyZWFkY3J1bWJCYWNrKCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CcmVhZGNydW1iQ2hhbmdlZChldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJyZWFkY3J1bWJCYWNrKCkge1xyXG4gICAgICAgIGxldCBpdGVtcyA9IHRoaXMuY29uZmlnLml0ZW1zO1xyXG4gICAgICAgIC8vIEdvIHRvIHRoZSBsYXN0IGJyZWFkY3J1bWIgaXRlbVxyXG4gICAgICAgIGlmIChfLmlzQXJyYXkoaXRlbXMpICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpdGVtcy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgbGV0IGJhY2tDYWxsYmFjayA9IGl0ZW0uY2xpY2s7XHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oYmFja0NhbGxiYWNrKSkgXHJcbiAgICAgICAgICAgICAgICBiYWNrQ2FsbGJhY2soaXRlbSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgdGhpcy5fd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsaWNrKGl0ZW06IEJyZWFkY3J1bWJJdGVtKSB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtLmNsaWNrKSlcclxuICAgICAgICAgICAgaXRlbS5jbGljayhpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlblNlYXJjaCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdChPcGVuU2VhcmNoRXZlbnQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYWN0aW9uc1Zpc2libGUoaXRlbTogQnJlYWRjcnVtYkl0ZW0pOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNBcnJheShpdGVtLnN1YkFjdGlvbnMpICYmIGl0ZW0uc3ViQWN0aW9ucy5sZW5ndGggPiAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbk9wZW5NZW51KCRtZE9wZW5NZW51LCBldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLm9yaWdpbmF0b3JFdiA9IGV2ZW50O1xyXG4gICAgICAgICRtZE9wZW5NZW51KHRoaXMub3JpZ2luYXRvckV2KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdWJBY3Rpb25DbGljayhhY3Rpb246IFNpbXBsZUFjdGlvbkl0ZW0pOiB2b2lkIHsgXHJcbiAgICAgICAgaWYgKCFhY3Rpb24gfHwgYWN0aW9uLmRpdmlkZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5jbGljaykge1xyXG4gICAgICAgICAgICBhY3Rpb24uY2xpY2soYWN0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ocmVmKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gYWN0aW9uLmhyZWY7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24udXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uLnVybChhY3Rpb24udXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5zdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW5qZWN0b3IuaGFzKCckc3RhdGUnKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzdGF0ZSA9IHRoaXMuX2luamVjdG9yLmdldCgnJHN0YXRlJykgYXMgbmcudWkuSVN0YXRlU2VydmljZVxyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLnN0YXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KGFjdGlvbi5ldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYXRvckV2ID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgcmFpc2Ugbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBBY3Rpb25DbGlja2VkJywgYWN0aW9uLm5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLm9yaWdpbmF0b3JFdiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYnJlYWRjcnVtYkRpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICBzY29wZToge30sXHJcbiAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdicmVhZGNydW1iL0JyZWFkY3J1bWIuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogQnJlYWRjcnVtYkNvbnRyb2xsZXIsXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICB9O1xyXG59XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcEJyZWFkY3J1bWInKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwQnJlYWRjcnVtYicsIGJyZWFkY3J1bWJEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVBY3Rpb25JdGVtIH0gZnJvbSAnLi4vYWN0aW9ucy9BY3Rpb25zU2VydmljZSc7XHJcbmV4cG9ydCBsZXQgQnJlYWRjcnVtYkNoYW5nZWRFdmVudCA9IFwicGlwQnJlYWRjcnVtYkNoYW5nZWRcIjtcclxuZXhwb3J0IGxldCBCcmVhZGNydW1iQmFja0V2ZW50ID0gXCJwaXBCcmVhZGNydW1iQmFja1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJJdGVtIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBjbGljaz86IChpdGVtOiBCcmVhZGNydW1iSXRlbSkgPT4gdm9pZDsgICBcclxuICAgIHN1YkFjdGlvbnM/OiBTaW1wbGVBY3Rpb25JdGVtW107IFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkNvbmZpZyB7XHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbiAgICBpdGVtczogQnJlYWRjcnVtYkl0ZW1bXTtcclxuICAgIGNyaXRlcmlhOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJyZWFkY3J1bWJTZXJ2aWNlIHtcclxuICAgIGNvbmZpZzogQnJlYWRjcnVtYkNvbmZpZztcclxuICAgIHRleHQ6IHN0cmluZztcclxuICAgIGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdO1xyXG4gICAgY3JpdGVyaWE6IHN0cmluZztcclxuXHJcbiAgICBzaG93VGV4dCh0ZXh0OiBzdHJpbmcsIGNyaXRlcmlhPzogc3RyaW5nKTtcclxuICAgIHNob3dJdGVtcyhpdGVtczogQnJlYWRjcnVtYkl0ZW1bXSwgY3JpdGVyaWE/OiBzdHJpbmcpO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCcmVhZGNydW1iUHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIHRleHQ6IHN0cmluZztcclxufVxyXG5cclxuXHJcbmNsYXNzIEJyZWFkY3J1bWJTZXJ2aWNlIGltcGxlbWVudHMgSUJyZWFkY3J1bWJTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQnJlYWRjcnVtYkNvbmZpZztcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvbmZpZzogQnJlYWRjcnVtYkNvbmZpZyxcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0ZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGV4dCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pdGVtcyA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpdGVtcygpOiBCcmVhZGNydW1iSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLml0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaXRlbXModmFsdWU6IEJyZWFkY3J1bWJJdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLml0ZW1zID0gdmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjcml0ZXJpYSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY3JpdGVyaWE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjcml0ZXJpYSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1RleHQodGV4dDogc3RyaW5nLCBjcml0ZXJpYT86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLl9jb25maWcuaXRlbXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IGNyaXRlcmlhO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dJdGVtcyhpdGVtczogQnJlYWRjcnVtYkl0ZW1bXSwgY3JpdGVyaWE/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuaXRlbXMgPSBpdGVtcyB8fCBbXTtcclxuICAgICAgICB0aGlzLl9jb25maWcudGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gY3JpdGVyaWE7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KEJyZWFkY3J1bWJDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBCcmVhZGNydW1iUHJvdmlkZXIgaW1wbGVtZW50cyBJQnJlYWRjcnVtYlByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQnJlYWRjcnVtYkNvbmZpZyA9IHsgXHJcbiAgICAgICAgdGV4dDogbnVsbCxcclxuICAgICAgICBpdGVtczogbnVsbCxcclxuICAgICAgICBjcml0ZXJpYTogbnVsbFxyXG4gICAgfTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEJyZWFkY3J1bWJTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgdGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpOiBhbnkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBCcmVhZGNydW1iU2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBCcmVhZGNydW1iJylcclxuICAgIC5wcm92aWRlcigncGlwQnJlYWRjcnVtYicsIEJyZWFkY3J1bWJQcm92aWRlcik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBCcmVhZGNydW1iJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UZW1wbGF0ZXMnLCAncGlwTmF2LlRyYW5zbGF0ZSddKTtcclxuXHJcbmltcG9ydCAnLi9CcmVhZGNydW1iRGlyZWN0aXZlJztcclxuaW1wb3J0ICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5cclxuXHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IElOYXZJY29uU2VydmljZSB9IGZyb20gJy4uL2ljb24vTmF2SWNvblNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJTmF2TWVudVNlcnZpY2UgfSBmcm9tICcuLi9tZW51L05hdk1lbnVTZXJ2aWNlJztcclxuaW1wb3J0IHsgSU5hdkhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi9oZWFkZXIvTmF2SGVhZGVyU2VydmljZSc7XHJcbmltcG9ydCB7IElCcmVhZGNydW1iU2VydmljZSB9IGZyb20gJy4uL2JyZWFkY3J1bWIvQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJU2VhcmNoU2VydmljZSB9IGZyb20gJy4uL3NlYXJjaC9TZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0IHsgSUFjdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vYWN0aW9ucy9BY3Rpb25zU2VydmljZSc7XHJcbmltcG9ydCB7IElBcHBCYXJTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwYmFyL0FwcEJhclNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJU2lkZU5hdlNlcnZpY2UgfSBmcm9tICcuLi9zaWRlbmF2L1NpZGVOYXZTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdlNlcnZpY2Uge1xyXG4gICAgYXBwYmFyOiBJQXBwQmFyU2VydmljZTtcclxuICAgIGljb246IElOYXZJY29uU2VydmljZTsgXHJcbiAgICBicmVhZGNydW1iOiBJQnJlYWRjcnVtYlNlcnZpY2U7XHJcbiAgICBhY3Rpb25zOiBJQWN0aW9uc1NlcnZpY2U7XHJcbiAgICBzZWFyY2g6IElTZWFyY2hTZXJ2aWNlO1xyXG4gICAgc2lkZW5hdjogSVNpZGVOYXZTZXJ2aWNlO1xyXG4gICAgaGVhZGVyOiBJTmF2SGVhZGVyU2VydmljZTtcclxuICAgIG1lbnU6IElOYXZNZW51U2VydmljZTsgICBcclxuXHJcbiAgICByZXNldCgpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBOYXZTZXJ2aWNlIGltcGxlbWVudHMgSU5hdlNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigkaW5qZWN0b3IpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwYmFyID0gJGluamVjdG9yLmhhcygncGlwQXBwQmFyJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBBcHBCYXInKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5pY29uID0gJGluamVjdG9yLmhhcygncGlwTmF2SWNvbicpID8gJGluamVjdG9yLmdldCgncGlwTmF2SWNvbicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLmJyZWFkY3J1bWIgPSAkaW5qZWN0b3IuaGFzKCdwaXBCcmVhZGNydW1iJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBCcmVhZGNydW1iJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuYWN0aW9ucyA9ICRpbmplY3Rvci5oYXMoJ3BpcEFjdGlvbnMnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcEFjdGlvbnMnKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZWFyY2ggPSAkaW5qZWN0b3IuaGFzKCdwaXBTZWFyY2gnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFNlYXJjaCcpIDogbnVsbDtcclxuICAgICAgICB0aGlzLnNpZGVuYXYgPSAkaW5qZWN0b3IuaGFzKCdwaXBTaWRlTmF2JykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBTaWRlTmF2JykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gJGluamVjdG9yLmhhcygncGlwTmF2SGVhZGVyJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZIZWFkZXInKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5tZW51ID0gJGluamVjdG9yLmhhcygncGlwTmF2TWVudScpID8gJGluamVjdG9yLmdldCgncGlwTmF2TWVudScpIDogbnVsbDsgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFwcGJhcjogSUFwcEJhclNlcnZpY2U7XHJcbiAgICBwdWJsaWMgaWNvbjogSU5hdkljb25TZXJ2aWNlO1xyXG4gICAgcHVibGljIGJyZWFkY3J1bWI6IElCcmVhZGNydW1iU2VydmljZTtcclxuICAgIHB1YmxpYyBhY3Rpb25zOiBJQWN0aW9uc1NlcnZpY2U7XHJcbiAgICBwdWJsaWMgc2VhcmNoOiBJU2VhcmNoU2VydmljZTtcclxuICAgIHB1YmxpYyBzaWRlbmF2OiBJU2lkZU5hdlNlcnZpY2U7ICAgICAgICBcclxuICAgIHB1YmxpYyBoZWFkZXI6IElOYXZIZWFkZXJTZXJ2aWNlO1xyXG4gICAgcHVibGljIG1lbnU6IElOYXZNZW51U2VydmljZTsgICAgXHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgIC8vIFJlc2V0IGFwcGJhclxyXG4gICAgICAgIGlmICh0aGlzLmFwcGJhcikgXHJcbiAgICAgICAgICAgIHRoaXMuYXBwYmFyLnNob3coKTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgaWNvblxyXG4gICAgICAgIGlmICh0aGlzLmljb24pXHJcbiAgICAgICAgICAgIHRoaXMuaWNvbi5zaG93TWVudSgpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBicmVhZGNydW1iXHJcbiAgICAgICAgaWYgKHRoaXMuYnJlYWRjcnVtYilcclxuICAgICAgICAgICAgdGhpcy5icmVhZGNydW1iLnNob3dUZXh0KG51bGwpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBhY3Rpb25zXHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aW9ucylcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnNob3coKTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgc2VhcmNoXHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoKVxyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaC5zZXQobnVsbCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNpZGVuYXYpXHJcbiAgICAgICAgICAgIHRoaXMuc2lkZW5hdi5zaG93KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdlNlcnZpY2UnLCBbXSlcclxuICAgIC5zZXJ2aWNlKCdwaXBOYXZTZXJ2aWNlJywgTmF2U2VydmljZSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5mdW5jdGlvbiB0cmFuc2xhdGVGaWx0ZXIoJGluamVjdG9yKSB7XHJcbiAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgbGV0IHBpcFRyYW5zbGF0ZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHBpcFRyYW5zbGF0ZSAgPyBwaXBUcmFuc2xhdGUudHJhbnNsYXRlKGtleSkgfHwga2V5IDoga2V5O1xyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXYuVHJhbnNsYXRlJywgW10pXHJcbiAgICAuZmlsdGVyKCd0cmFuc2xhdGUnLCB0cmFuc2xhdGVGaWx0ZXIpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmZ1bmN0aW9uIERyb3Bkb3duRGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRpbmplY3RvciwgJHJvb3RTY29wZSwgJG1kTWVkaWEsICR0aW1lb3V0KSB7XHJcbiAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgbGV0IHBpcFRoZW1lID0gJGluamVjdG9yLmhhcygncGlwVGhlbWUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRoZW1lJykgOiBudWxsOyBcclxuICAgIGxldCBwaXBNZWRpYSA9ICRpbmplY3Rvci5oYXMoJ3BpcE1lZGlhJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBNZWRpYScpIDogbnVsbDtcclxuICAgIGxldCBjdXJyZW50VGhlbWUgPSAnZGVmYXVsdCc7XHJcblxyXG4gICAgaWYgKHBpcFRoZW1lKVxyXG4gICAgICAgIGN1cnJlbnRUaGVtZSA9IHBpcFRoZW1lLnVzZSgpO1xyXG4gICAgZWxzZSBpZiAoJHJvb3RTY29wZS4kdGhlbWUpXHJcbiAgICAgICAgY3VycmVudFRoZW1lID0gJHJvb3RTY29wZS4kdGhlbWU7XHJcblxyXG4gICAgJHNjb3BlLmNsYXNzID0gKCRhdHRycy5jbGFzcyB8fCAnJykgKyAnIG1kLScgKyBjdXJyZW50VGhlbWUgKyAnLXRoZW1lJztcclxuXHJcbiAgICAvL3BpcEFzc2VydC5pc0FycmF5KCRzY29wZS5hY3Rpb25zLCAncGlwRHJvcGRvd246IHBpcC1hY3Rpb25zIGF0dHJpYnV0ZSBzaG91bGQgdGFrZSBhbiBhcnJheSwgYnV0IHRha2UgJyArIHR5cGVvZiAkc2NvcGUuYWN0aW9ucyk7XHJcbiAgICAkc2NvcGUubWVkaWEgPSBwaXBNZWRpYSAhPT0gdW5kZWZpbmVkID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuICAgICRzY29wZS5hY3Rpb25zID0gKCRzY29wZS5hY3Rpb25zICYmIF8uaXNBcnJheSgkc2NvcGUuYWN0aW9ucykpID8gJHNjb3BlLmFjdGlvbnMgOiBbXTtcclxuICAgICRzY29wZS5hY3RpdmVJbmRleCA9ICRzY29wZS5hY3RpdmVJbmRleCB8fCAwO1xyXG5cclxuICAgICRzY29wZS5kaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJHNjb3BlLm5nRGlzYWJsZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLm5nRGlzYWJsZWQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUub25TZWxlY3QgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAkc2NvcGUuYWN0aXZlSW5kZXggPSBpbmRleDtcclxuICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0KCRzY29wZS5hY3Rpb25zW2luZGV4XSwgJHNjb3BlLmFjdGl2ZUluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkc2NvcGUucGlwQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnBpcENoYW5nZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkc2NvcGUuc2hvd0Ryb3Bkb3duKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zaG93RHJvcGRvd24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZHJvcGRvd25EaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbmdEaXNhYmxlZDogJyYnLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiAnPXBpcEFjdGlvbnMnLFxyXG4gICAgICAgICAgICBzaG93RHJvcGRvd246ICcmcGlwU2hvdycsXHJcbiAgICAgICAgICAgIGFjdGl2ZUluZGV4OiAnPXBpcEFjdGl2ZUluZGV4JyxcclxuICAgICAgICAgICAgc2VsZWN0OiAnPXBpcERyb3Bkb3duU2VsZWN0JyxcclxuICAgICAgICAgICAgcGlwQ2hhbmdlOiAnJidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnZHJvcGRvd24vRHJvcGRvd24uaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogRHJvcGRvd25EaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICB9O1xyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBEcm9wZG93bicsIFsncGlwTmF2LlRlbXBsYXRlcyddKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwRHJvcGRvd24nLCBkcm9wZG93bkRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBsZXQgTmF2SGVhZGVyQ2hhbmdlZEV2ZW50ID0gJ3BpcE5hdkhlYWRlckNoYW5nZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdkhlYWRlckNvbmZpZyB7XHJcbiAgICAvLyBJbWFnZSB1cmxcclxuICAgIHB1YmxpYyBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgLy8gSW1hZ2UgdXJsXHJcbiAgICBwdWJsaWMgZGVmYXVsdEltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICAvLyBUaXRsZVxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAvLyBTdWJ0aXRsZVxyXG4gICAgcHVibGljIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICAvLyBIYW5kbGUgaGVhZGVyIGNsaWNrIGV2ZW50XHJcbiAgICBjbGljazogKCkgPT4gdm9pZDtcclxuICAgIC8vIEV2ZW50IG5hbWVcclxuICAgIGV2ZW50OiBzdHJpbmdcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdkhlYWRlclNlcnZpY2Uge1xyXG4gICAgcmVhZG9ubHkgY29uZmlnOiBOYXZIZWFkZXJDb25maWc7XHJcbiAgICBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICBjbGljazogKCkgPT4gdm9pZDtcclxuICAgIGV2ZW50OiBzdHJpbmc7XHJcblxyXG4gICAgc2hvdyh0aXRsZTogc3RyaW5nLCBzdWJ0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgaGlkZSgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOYXZIZWFkZXJQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgY29uZmlnOiBOYXZIZWFkZXJDb25maWc7XHJcbiAgICBkZWZhdWx0SW1hZ2VVcmw6IHN0cmluZztcclxuICAgIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgc3VidGl0bGU6IHN0cmluZztcclxuICAgIGNsaWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgZXZlbnQ6IHN0cmluZztcclxuXHJcbiAgICBzZXQodGl0bGU6IHN0cmluZywgc3VidGl0bGU6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIGNsZWFyKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIE5hdkhlYWRlclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZIZWFkZXJDb25maWc7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IE5hdkhlYWRlckNvbmZpZywgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBOYXZIZWFkZXJDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN1YnRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN1YnRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaW1hZ2VVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmltYWdlVXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaW1hZ2VVcmwodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGljaygpOiAoKSA9PiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsaWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2xpY2sodmFsdWU6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZXZlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmV2ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZXZlbnQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3codGl0bGU6IHN0cmluZywgc3VidGl0bGU6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gc3VidGl0bGU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcblxyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcoY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDb25maWdFdmVudCgpIHtcclxuICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kZW1pdChOYXZIZWFkZXJDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE5hdkhlYWRlclByb3ZpZGVyIGltcGxlbWVudHMgSU5hdkhlYWRlclByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogTmF2SGVhZGVyQ29uZmlnID0gbmV3IE5hdkhlYWRlckNvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogTmF2SGVhZGVyU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBOYXZIZWFkZXJDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb25maWcodmFsdWU6IE5hdkhlYWRlckNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBOYXZIZWFkZXJDb25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlZmF1bHRJbWFnZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZGVmYXVsdEltYWdlVXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGVmYXVsdEltYWdlVXJsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZGVmYXVsdEltYWdlVXJsID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdWJ0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc3VidGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzdWJ0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbWFnZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpbWFnZVVybCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGljaygpOiAoKSA9PiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsaWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2xpY2sodmFsdWU6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGV2ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5ldmVudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGV2ZW50KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0KHRpdGxlOiBzdHJpbmcsIHN1YnRpdGxlOiBzdHJpbmcsIGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IHN1YnRpdGxlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IGltYWdlVXJsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrT3JFdmVudCkpXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICBlbHNlIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChfLmlzU3RyaW5nKGNhbGxiYWNrT3JFdmVudCkpXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICBlbHNlIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBOYXZIZWFkZXJTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG4gICAgIFxyXG59XHJcblxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2SGVhZGVyJylcclxuICAgIC5wcm92aWRlcigncGlwTmF2SGVhZGVyJywgTmF2SGVhZGVyUHJvdmlkZXIpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbiAgICBmdW5jdGlvbiBTdGlja3lOYXZIZWFkZXJEaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRyb290U2NvcGUsICR0aW1lb3V0LCBwaXBOYXZIZWFkZXIpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICBpbWFnZSA9IG51bGwsXHJcbiAgICAgICAgICAgIGltYWdlQmxvY2sgPSAkZWxlbWVudC5maW5kKCcucGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXInKSxcclxuICAgICAgICAgICAgJGltYWdlLFxyXG4gICAgICAgICAgICBjdXJyZW50U3RhdGUsXHJcbiAgICAgICAgICAgIGxvYWRlZERlZmF1bHRJbWFnZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXN0aWNreS1uYXYtaGVhZGVyJyk7XHJcblxyXG4gICAgICAgICRzY29wZS5vblVzZXJDbGljayA9IG9uVXNlckNsaWNrO1xyXG4gICAgICAgICRzY29wZS5vbkltYWdlRXJyb3IgPSBvbkltYWdlRXJyb3I7XHJcbiAgICAgICAgJHNjb3BlLm9uSW1hZ2VMb2FkID0gb25JbWFnZUxvYWQ7XHJcblxyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJGltYWdlID0gJGVsZW1lbnQuZmluZCgnLnBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLWltYWdlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGltYWdlWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2VbMF0ub25sb2FkID0gb25JbWFnZUxvYWQ7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2VbMF0ub25lcnJvciA9IG9uSW1hZ2VFcnJvcjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRpbWFnZS5vbmxvYWQgPSBvbkltYWdlTG9hZDtcclxuICAgICAgICAgICAgICAgICRpbWFnZS5vbmVycm9yID0gb25JbWFnZUVycm9yO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvbk5hdkhlYWRlckNoYW5nZWQobnVsbCwgcGlwTmF2SGVhZGVyLmNvbmZpZyk7XHJcbiAgICAgICAgfSwgMjApO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwTmF2SGVhZGVyQ2hhbmdlZCcsIG9uTmF2SGVhZGVyQ2hhbmdlZCk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcFNpZGVOYXZTdGF0ZUNoYW5nZWQnLCBvblN0YXRlQ2hhbmdlZCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdEhlYWRlcigpIHtcclxuICAgICAgICAgICAgaWYgKCFwaXBOYXZIZWFkZXIuY29uZmlnKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUudGl0bGUgPSBwaXBOYXZIZWFkZXIuY29uZmlnLnRpdGxlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc3VidGl0bGUgPSBwaXBOYXZIZWFkZXIuY29uZmlnLnN1YnRpdGxlO1xyXG4gICAgICAgICAgICAkc2NvcGUuaW1hZ2VVcmwgPSBwaXBOYXZIZWFkZXIuY29uZmlnLmltYWdlVXJsO1xyXG4gICAgICAgICAgICAkc2NvcGUuaW1hZ2VDc3MgPSBwaXBOYXZIZWFkZXIuY29uZmlnLmltYWdlQ3NzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gV2hlbiBpbWFnZSBpcyBsb2FkZWQgcmVzaXplL3JlcG9zaXRpb24gaXRcclxuICAgICAgICBmdW5jdGlvbiBvbkltYWdlTG9hZCgkZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGltYWdlID0gJCgkZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgc2V0SW1hZ2VNYXJnaW5DU1MoaW1hZ2VCbG9jaywgaW1hZ2UpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uSW1hZ2VFcnJvcigkZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGxvYWRlZERlZmF1bHRJbWFnZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNldEltYWdlKHBpcE5hdkhlYWRlci5jb25maWcsIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlZChldmVudCwgc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgICAgICAgICAgY3VycmVudFN0YXRlID0gc3RhdGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUuaWQgPT0gJ3RvZ2dsZScpIHtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd0hlYWRlciA9IGN1cnJlbnRTdGF0ZSAmJiBjdXJyZW50U3RhdGUuaWQgPT0gJ3RvZ2dsZSc7XHJcbiAgICAgICAgICAgICAgICB9LCA0MDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNob3dIZWFkZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0SW1hZ2VNYXJnaW5DU1MoY29udGFpbmVyLCBpbWFnZSkge1xyXG4gICAgICAgICAgICB2YXIgY3NzUGFyYW1zID0ge30sXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJXaWR0aCA9IGNvbnRhaW5lci53aWR0aCA/IGNvbnRhaW5lci53aWR0aCgpIDogY29udGFpbmVyLmNsaWVudFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVyLmhlaWdodCA/IGNvbnRhaW5lci5oZWlnaHQoKSA6IGNvbnRhaW5lci5jbGllbnRIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBpbWFnZVdpZHRoID0gaW1hZ2VbMF0ubmF0dXJhbFdpZHRoIHx8IGltYWdlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VIZWlnaHQgPSBpbWFnZVswXS5uYXR1cmFsSGVpZ2h0IHx8IGltYWdlLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIG1hcmdpbiA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoKGltYWdlV2lkdGggLyBjb250YWluZXJXaWR0aCkgPiAoaW1hZ2VIZWlnaHQgLyBjb250YWluZXJIZWlnaHQpKSB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4gPSAtKChpbWFnZVdpZHRoIC8gaW1hZ2VIZWlnaHQgKiBjb250YWluZXJIZWlnaHQgLSBjb250YWluZXJXaWR0aCkgLyAyKTtcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snbWFyZ2luLWxlZnQnXSA9ICcnICsgbWFyZ2luICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snaGVpZ2h0J10gPSAnJyArIGNvbnRhaW5lckhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ3dpZHRoJ10gPSAnJyArIGltYWdlV2lkdGggKiBjb250YWluZXJIZWlnaHQgLyBpbWFnZUhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ21hcmdpbi10b3AnXSA9ICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luID0gLSgoaW1hZ2VIZWlnaHQgLyBpbWFnZVdpZHRoICogY29udGFpbmVyV2lkdGggLSBjb250YWluZXJIZWlnaHQpIC8gMik7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ21hcmdpbi10b3AnXSA9ICcnICsgbWFyZ2luICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snaGVpZ2h0J10gPSAnJyArIGltYWdlSGVpZ2h0ICogY29udGFpbmVyV2lkdGggLyBpbWFnZVdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snd2lkdGgnXSA9ICcnICsgY29udGFpbmVyV2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydtYXJnaW4tbGVmdCddID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGltYWdlLmNzcyhjc3NQYXJhbXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldEltYWdlKGNvbmZpZywgbG9hZEVycm9yOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGlmICghY29uZmlnKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgdXJsOiBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxvYWRFcnJvciAmJiAhIWNvbmZpZy5pbWFnZVVybCAmJiAhbG9hZGVkRGVmYXVsdEltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBjb25maWcuaW1hZ2VVcmw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWREZWZhdWx0SW1hZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdXJsID0gY29uZmlnLmRlZmF1bHRJbWFnZVVybDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHVybCAmJiAkaW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgICRpbWFnZS5hdHRyKCdzcmMnLCB1cmwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VCbG9jay5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbk5hdkhlYWRlckNoYW5nZWQoJGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcpIHJldHVybjtcclxuICAgICAgICAgICAgc2V0SW1hZ2UoY29uZmlnLCBmYWxzZSlcclxuXHJcbiAgICAgICAgICAgICRzY29wZS50aXRsZSA9IGNvbmZpZy50aXRsZTtcclxuICAgICAgICAgICAgJHNjb3BlLnN1YnRpdGxlID0gY29uZmlnLnN1YnRpdGxlO1xyXG4gICAgICAgICAgICAkc2NvcGUuaW1hZ2VVcmwgPSBjb25maWcuaW1hZ2VVcmw7XHJcbiAgICAgICAgICAgICRzY29wZS5pbWFnZUNzcyA9IGNvbmZpZy5pbWFnZUNzcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uVXNlckNsaWNrKCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcE5hdlVzZXJDbGlja2VkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdGlja3lOYXZIZWFkZXJEaXJlY3RpdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdoZWFkZXIvU3RpY2t5TmF2SGVhZGVyLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBTdGlja3lOYXZIZWFkZXJEaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwTmF2SGVhZGVyJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdwaXBTdGlja3lOYXZIZWFkZXInLCBzdGlja3lOYXZIZWFkZXJEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwTmF2SGVhZGVyJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vTmF2SGVhZGVyU2VydmljZSc7XHJcbmltcG9ydCAnLi9TdGlja3lOYXZIZWFkZXJEaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9OYXZIZWFkZXJTZXJ2aWNlJzsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmZ1bmN0aW9uIE5hdkljb25EaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJHJvb3RTY29wZSwgJHdpbmRvdywgcGlwTmF2SWNvbikge1xyXG4gICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1uYXYtaWNvbicpO1xyXG5cclxuICAgICRzY29wZS5jb25maWcgPSBwaXBOYXZJY29uLmNvbmZpZztcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbigncGlwTmF2SWNvbkNoYW5nZWQnLCBvbk5hdkljb25DaGFuZ2VkKTtcclxuXHJcbiAgICAkc2NvcGUub25OYXZJY29uQ2xpY2sgPSBvbk5hdkljb25DbGljaztcclxuXHJcbiAgICBmdW5jdGlvbiBvbk5hdkljb25DaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAkc2NvcGUuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uTmF2SWNvbkNsaWNrKCkge1xyXG4gICAgICAgIHZhciBicmVhZGNydW1iLCBiYWNrQ2FsbGJhY2s7XHJcblxyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oJHNjb3BlLmNvbmZpZy5jbGljaykpIHtcclxuICAgICAgICAgICAgLy8gRXhlY3V0ZSBuYXYgaWNvbiBjYWxsYmFja1xyXG4gICAgICAgICAgICAkc2NvcGUuY29uZmlnLmNsaWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuY29uZmlnLmV2ZW50KSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgkc2NvcGUuY29uZmlnLmV2ZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5jb25maWcudHlwZSA9PSAnbWVudScpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBPcGVuU2lkZU5hdicpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLmNvbmZpZy50eXBlID09ICdiYWNrJykge1xyXG4gICAgICAgICAgICAkd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwTmF2SWNvbkNsaWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBuYXZJY29uRGlyZWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICc9cGlwVHlwZScsXHJcbiAgICAgICAgICAgIGltYWdlVXJsOiAnPXBpcEltYWdlVXJsJyxcclxuICAgICAgICAgICAgaWNvbjogJz1waXBJY29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdpY29uL05hdkljb24uaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogTmF2SWNvbkRpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZJY29uJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcE5hdkljb24nLCBuYXZJY29uRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBOYXZJY29uQ2hhbmdlZEV2ZW50ID0gJ3BpcE5hdkljb25DaGFuZ2VkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZJY29uQ29uZmlnIHtcclxuICAgIC8vIFR5cGUgb2YgbmF2IGljb246ICdiYWNrJywgJ21lbnUnLCAnaW1hZ2UnIG9yICdub25lJ1xyXG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAgIC8vIEltYWdlIHVybFxyXG4gICAgcHVibGljIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICAvLyBJY29uIG5hbWVcclxuICAgIHB1YmxpYyBpY29uOiBzdHJpbmc7XHJcbiAgICAvLyBIYW5kbGUgbmF2IGljb24gY2xpY2sgZXZlbnRcclxuICAgIGNsaWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgLy8gRXZlbnQgbmFtZVxyXG4gICAgZXZlbnQ6IHN0cmluZ1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2SWNvblNlcnZpY2Uge1xyXG4gICAgcmVhZG9ubHkgY29uZmlnOiBOYXZJY29uQ29uZmlnO1xyXG5cclxuICAgIHNob3dNZW51KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzaG93SWNvbihpY29uOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzaG93QmFjayhjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgc2hvd0ltYWdlKGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBoaWRlKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdkljb25Qcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgY29uZmlnOiBOYXZJY29uQ29uZmlnO1xyXG5cclxuICAgIHNldE1lbnUoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIHNldEljb24oaWNvbjogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgc2V0QmFjayhjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgc2V0SW1hZ2UoaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIGNsZWFyKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIE5hdkljb25TZXJ2aWNlIGltcGxlbWVudHMgSU5hdkljb25TZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogTmF2SWNvbkNvbmZpZztcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogTmF2SWNvbkNvbmZpZywgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBOYXZJY29uQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2tPckV2ZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzU3RyaW5nKGNhbGxiYWNrT3JFdmVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93TWVudShjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdtZW51JztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dJY29uKGljb246IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnaWNvbic7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0JhY2soY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnYmFjayc7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93SW1hZ2UoaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnaW1hZ2UnO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IGltYWdlVXJsO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdub25lJztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChudWxsKTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KE5hdkljb25DaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE5hdkljb25Qcm92aWRlciBpbXBsZW1lbnRzIElOYXZJY29uUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZJY29uQ29uZmlnID0gbmV3IE5hdkljb25Db25maWcoKTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IE5hdkljb25TZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkljb25Db25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb25maWcodmFsdWU6IE5hdkljb25Db25maWcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB2YWx1ZSB8fCBuZXcgTmF2SWNvbkNvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcoY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TWVudShjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdtZW51JztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJY29uKGljb246IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnaWNvbic7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEJhY2soY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnYmFjayc7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SW1hZ2UoaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnaW1hZ2UnO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IGltYWdlVXJsO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IE5hdkljb25TZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG4gICAgIFxyXG59XHJcblxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2SWNvbicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcE5hdkljb24nLCBOYXZJY29uUHJvdmlkZXIpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwTmF2SWNvbicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVHJhbnNsYXRlJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vTmF2SWNvblNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vTmF2SWNvbkRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL05hdkljb25TZXJ2aWNlJztcclxuIiwi77u/J3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICcuL2RlcGVuZGVuY2llcy9UcmFuc2xhdGVGaWx0ZXInO1xyXG5pbXBvcnQgJy4vbGFuZ3VhZ2UvTGFuZ3VhZ2VQaWNrZXJEaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vZHJvcGRvd24vRHJvcGRvd25EaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vdGFicy9UYWJzRGlyZWN0aXZlJztcclxuaW1wb3J0ICcuL2FjdGlvbnMnO1xyXG5pbXBvcnQgJy4vYXBwYmFyJztcclxuaW1wb3J0ICcuL3NlYXJjaCc7XHJcbmltcG9ydCAnLi9icmVhZGNydW1iJztcclxuaW1wb3J0ICcuL3NpZGVuYXYnO1xyXG5pbXBvcnQgJy4vaGVhZGVyJztcclxuaW1wb3J0ICcuL21lbnUnO1xyXG5pbXBvcnQgJy4vaWNvbic7XHJcbmltcG9ydCAnLi9jb21tb24vTmF2U2VydmljZSc7XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXYnLCBbXHJcbiAgICAgICAgJ3BpcE5hdlNlcnZpY2UnLFxyXG4gICAgICAgICdwaXBEcm9wZG93bicsXHJcbiAgICAgICAgJ3BpcFRhYnMnLFxyXG4gICAgICAgICdwaXBBcHBCYXInLFxyXG4gICAgICAgICdwaXBTZWFyY2hCYXInLFxyXG4gICAgICAgICdwaXBOYXZJY29uJyxcclxuICAgICAgICAncGlwQnJlYWRjcnVtYicsXHJcbiAgICAgICAgJ3BpcEFjdGlvbnMnLCBcclxuICAgICAgICAncGlwU2lkZU5hdicsXHJcbiAgICAgICAgJ3BpcE5hdk1lbnUnLFxyXG4gICAgICAgICdwaXBOYXZIZWFkZXInXHJcbiAgICBdKTtcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vYWN0aW9ucyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYXBwYmFyJztcclxuZXhwb3J0ICogZnJvbSAnLi9icmVhZGNydW1iJztcclxuZXhwb3J0ICogZnJvbSAnLi9zZWFyY2gnO1xyXG5leHBvcnQgKiBmcm9tICcuL3NpZGVuYXYnO1xyXG5leHBvcnQgKiBmcm9tICcuL2ljb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL21lbnUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2hlYWRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vY29tbW9uL05hdlNlcnZpY2UnO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmNsYXNzIExhbmd1YWdlUGlja2VyRGlyZWN0aXZlQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIF90cmFuc2xhdGU6IGFueTtcclxuICAgIHByaXZhdGUgX3RpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJHNjb3BlOiBhbnksIFxyXG4gICAgICAgICRlbGVtZW50OiBhbnksIFxyXG4gICAgICAgICRhdHRyczogYW55LCBcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSwgXHJcbiAgICAgICAgJHRpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZSxcclxuICAgICAgICAkaW5qZWN0b3I6IGFueVxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB0aGlzLl90aW1lb3V0ID0gJHRpbWVvdXQ7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtbGFuZ3VhZ2UtcGlja2VyJyk7XHJcblxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VzID0gJHNjb3BlLmxhbmd1YWdlcztcclxuXHJcbiAgICAgICAgLy8gVG9kbzogV2hlcmUgaXMgdGhpcyBldmVudCBjb21pbmcgZnJvbT8gV2h5IG5vdCB0aHJvdWdoIHNlcnZpY2Ugb3IgYXR0cmlidXRlP1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTZXRMYW5ndWFnZXMnLCB0aGlzLnNldExhbmd1YWdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxhbmd1YWdlczogc3RyaW5nW10gPSBbJ2VuJywgJ3J1J107XHJcblxyXG4gICAgcHVibGljIGdldCBsYW5ndWFnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNsYXRlID8gdGhpcy5fdHJhbnNsYXRlLmxhbmd1YWdlIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TGFuZ3VhZ2VzKGxhbmcpIHtcclxuICAgICAgICB0aGlzLmxhbmd1YWdlcyA9IGxhbmcubGVuZ3RoID4gMCA/IGxhbmcgOiBbJ2VuJywgJ3J1J107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uTGFuZ3VhZ2VDbGljayhsYW5ndWFnZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFuc2xhdGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZS5sYW5ndWFnZSA9IHRoaXMubGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxhbmd1YWdlUGlja2VyRGlyZWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGxhbmd1YWdlczogJz1sYW5ndWFnZXMnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnbGFuZ3VhZ2UvTGFuZ3VhZ2VQaWNrZXIuaHRtbCc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyOiBMYW5ndWFnZVBpY2tlckRpcmVjdGl2ZUNvbnRyb2xsZXIsXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICB9O1xyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBMYW5ndWFnZVBpY2tlcicsIFtcclxuICAgICAgICAnbmdNYXRlcmlhbCcsICdwaXBOYXYuVHJhbnNsYXRlJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXHJcbiAgICBdKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwTGFuZ3VhZ2VQaWNrZXInLCBsYW5ndWFnZVBpY2tlckRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBsZXQgTmF2TWVudUNoYW5nZWRFdmVudCA9ICdwaXBOYXZNZW51Q2hhbmdlZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2TWVudUxpbmsge1xyXG4gICAgLy8gTmFtZSB0byByZWZlciB0byB0aGUgaXRlbVxyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIC8vIExpbmsgdmlzaWJsZSB0aXRsZVxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAvLyBJY29uIG5hbWUgZnJvbSAkaWNvblByb3ZpZGVyXHJcbiAgICBwdWJsaWMgaWNvbj86IHN0cmluZztcclxuICAgIC8vIENvdW50ZXIgYmFkZ2VcclxuICAgIHB1YmxpYyBjb3VudD86IG51bWJlcjtcclxuICAgIC8vIGNsYXNzIGZvciBiYWRnZSBzdHlsZVxyXG4gICAgcHVibGljIGJhZGdlU3R5bGU/OiBzdHJpbmc7XHJcbiAgICAvLyBBY2Nlc3MgZnVuY3Rpb25cclxuICAgIHB1YmxpYyBhY2Nlc3M/OiAobGluazogTmF2TWVudUxpbmspID0+IGJvb2xlYW47XHJcbiAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZlxyXG4gICAgcHVibGljIGhyZWY/OiBzdHJpbmc7XHJcbiAgICAvLyAkbG9jYXRpb24udXJsXHJcbiAgICBwdWJsaWMgdXJsPzogc3RyaW5nO1xyXG4gICAgLy8gJHN0YXRlLmdvKHN0YXRlLCBzdGF0ZVBhcmFtcylcclxuICAgIHB1YmxpYyBzdGF0ZT86IHN0cmluZztcclxuICAgIC8vIFBhcmFtZXRlcnMgZm9yICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMpXHJcbiAgICBwdWJsaWMgc3RhdGVQYXJhbXM/OiBhbnk7XHJcbiAgICAvLyBwYXJlbnQgc3RhdGUgb3IgcGFyZW50IHN0YXRlIGZvciBzZWxlY3Rpb24gaXRlbSBcclxuICAgIHB1YmxpYyBwYXJlbnRTdGF0ZT86IHN0cmluZztcclxuICAgIC8vICRyb290U2NvcGUuYnJvYWRjYXN0KGV2ZW50KVxyXG4gICAgcHVibGljIGV2ZW50Pzogc3RyaW5nO1xyXG4gICAgLy8gQ2xpY2sgY2FsbGJhY2tcclxuICAgIHB1YmxpYyBjbGljaz86IChsaW5rOiBOYXZNZW51TGluaykgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5hdk1lbnVTZWN0aW9uIHtcclxuICAgIC8vIE5hbWUgdG8gcmVmZXIgdG8gdGhlIHNlY3Rpb25cclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICAvLyBTZWN0aW9uIHZpc2libGUgdGl0bGVcclxuICAgIHB1YmxpYyB0aXRsZT86IHN0cmluZztcclxuICAgIC8vIEljb24gbmFtZSBmcm9tICRpY29uUHJvdmlkZXJcclxuICAgIHB1YmxpYyBpY29uPzogc3RyaW5nO1xyXG4gICAgLy8gTGlua3Mgc2hvd24gaW4gdGhlIHNlY3Rpb25cclxuICAgIHB1YmxpYyBsaW5rczogTmF2TWVudUxpbmtbXTtcclxuICAgIC8vIEFjY2VzcyBmdW5jdGlvblxyXG4gICAgcHVibGljIGFjY2Vzcz86IChzZWN0aW9uOiBOYXZNZW51U2VjdGlvbikgPT4gYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5hdk1lbnVDb25maWcge1xyXG4gICAgc2VjdGlvbnM6IE5hdk1lbnVTZWN0aW9uW107XHJcbiAgICBkZWZhdWx0SWNvbjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOYXZNZW51U2VydmljZSB7XHJcbiAgICBzZWN0aW9uczogTmF2TWVudVNlY3Rpb25bXTtcclxuICAgIGRlZmF1bHRJY29uOiBzdHJpbmc7XHJcbiAgICB1cGRhdGVDb3VudChsaW5rOiBzdHJpbmcsIGNvdW50OiBudW1iZXIpOiB2b2lkOyBcclxuICAgIHVwZGF0ZUJhZGdlU3R5bGUobGluazogc3RyaW5nLCBzdHlsZTogc3RyaW5nKTogdm9pZDtcclxuICAgIGNsZWFyQ291bnRzKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdk1lbnVQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgc2VjdGlvbnM6IE5hdk1lbnVTZWN0aW9uW107XHJcbiAgICBkZWZhdWx0SWNvbjogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBOYXZNZW51U2VydmljZSBpbXBsZW1lbnRzIElOYXZNZW51U2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdk1lbnVDb25maWc7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25maWc6IE5hdk1lbnVDb25maWcsXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VjdGlvbnMoKTogTmF2TWVudVNlY3Rpb25bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlY3Rpb25zKHZhbHVlOiBOYXZNZW51U2VjdGlvbltdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlZmF1bHRJY29uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5kZWZhdWx0SWNvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlQmFkZ2VTdHlsZShsaW5rOiBzdHJpbmcsIHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAobGluayA9PSBudWxsIHx8ICFfLmlzU3RyaW5nKHN0eWxlKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnNlY3Rpb25zLCAocykgPT4ge1xyXG4gICAgICAgICAgICBfLmVhY2gocy5saW5rcywgKGwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsLm5hbWUgPT0gbGluaylcclxuICAgICAgICAgICAgICAgICAgICBsLmJhZGdlU3R5bGUgPSBzdHlsZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkZWZhdWx0SWNvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmRlZmF1bHRJY29uID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlQ291bnQobGluazogc3RyaW5nLCBjb3VudDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGxpbmsgPT0gbnVsbCB8fCAhXy5pc051bWJlcihjb3VudCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5zZWN0aW9ucywgKHMpID0+IHtcclxuICAgICAgICAgICAgXy5lYWNoKHMubGlua3MsIChsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobC5uYW1lID09IGxpbmspXHJcbiAgICAgICAgICAgICAgICAgICAgbC5jb3VudCA9IGNvdW50O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJDb3VudHMoKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5zZWN0aW9ucywgKHMpID0+IHtcclxuICAgICAgICAgICAgXy5lYWNoKHMubGlua3MsIChsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsLmNvdW50ID0gbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ2hhbmdlRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRlbWl0KE5hdk1lbnVDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE5hdk1lbnVQcm92aWRlciBpbXBsZW1lbnRzIElOYXZNZW51UHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZNZW51Q29uZmlnID0ge1xyXG4gICAgICAgIHNlY3Rpb25zOiBbXSxcclxuICAgICAgICBkZWZhdWx0SWNvbjogJ2ljb25zOmZvbGRlcidcclxuICAgIH07XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBOYXZNZW51U2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY3Rpb25zKCk6IE5hdk1lbnVTZWN0aW9uW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2VjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWN0aW9ucyh2YWx1ZTogTmF2TWVudVNlY3Rpb25bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVmYXVsdEljb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmRlZmF1bHRJY29uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGVmYXVsdEljb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5kZWZhdWx0SWNvbiA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGUpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgTmF2TWVudVNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2TWVudScpXHJcbiAgICAucHJvdmlkZXIoJ3BpcE5hdk1lbnUnLCBOYXZNZW51UHJvdmlkZXIpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbiAgICBmdW5jdGlvbiBTdGlja3lOYXZNZW51RGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkcm9vdFNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24sICR0aW1lb3V0LCAkaW5qZWN0b3IsIHBpcFNpZGVOYXYsIHBpcE5hdk1lbnUpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHZhciBhbmltYXRpb25EdXJhdGlvbiA9IDQ1MCxcclxuICAgICAgICAgICAgcGlwU2lkZU5hdkVsZW1lbnQgPSAkZWxlbWVudC5wYXJlbnQoKS5wYXJlbnQoKTtcclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXN0aWNreS1uYXYtbWVudScpO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VjdGlvbnMgPSAkc2NvcGUuc2VjdGlvbnMgfHwgcGlwTmF2TWVudS5zZWN0aW9ucztcclxuICAgICAgICAvLyAkc2NvcGUuc2hvd1Rvb2x0aXAgPSB0cnVlO1xyXG4gICAgICAgIC8vIHBpcE5hdk1lbnUuc2VjdGlvbnMgPSAkc2NvcGUuc2VjdGlvbnM7XHJcbiAgICAgICAgc2V0Q29sbGFwc2libGUoKTtcclxuICAgICAgICAvLyB0b2RvIHNldCBmcm9tIHNlcnZpY2VzXHJcbiAgICAgICAgJHNjb3BlLmRlZmF1bHRJY29uID0gcGlwTmF2TWVudS5kZWZhdWx0SWNvbjtcclxuXHJcbiAgICAgICAgb25TdGF0ZUNoYW5nZWQobnVsbCwgcGlwU2lkZU5hdi5zdGF0ZSk7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBOYXZNZW51Q2hhbmdlZCcsIG9uQ29uZmlnQ2hhbmdlZCk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcFNpZGVOYXZTdGF0ZUNoYW5nZWQnLCBvblN0YXRlQ2hhbmdlZCk7XHJcblxyXG4gICAgICAgICRzY29wZS5pdGVtVmlzaWJsZSA9IGlzSGlkZGVuO1xyXG4gICAgICAgICRzY29wZS5jbGlja0xpbmsgPSBjbGlja0xpbms7XHJcbiAgICAgICAgJHNjb3BlLmlzU2VjdGlvbkVtcHR5ID0gaXNTZWN0aW9uRW1wdHk7XHJcbiAgICAgICAgJHNjb3BlLm9uRXhwYW5kID0gb25FeHBhbmQ7XHJcbiAgICAgICAgJHNjb3BlLmlzQWN0aXZlID0gaXNBY3RpdmU7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0Q29sbGFwc2libGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBjb2xsYXBzZWQ7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oJHNjb3BlLmNvbGxhcHNlZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZCA9ICRzY29wZS5jb2xsYXBzZWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZCA9ICRzY29wZS5jb2xsYXBzZWQgIT09IGZhbHNlICYmICRzY29wZS5jb2xsYXBzZWQgIT09ICdmYWxzZSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRzY29wZS5pc0NvbGxhcHNlZCA9IGNvbGxhcHNlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uRXhwYW5kKCkge1xyXG4gICAgICAgICAgICBpZiAoISRzY29wZS5pc0NvbGxhcHNlZCkgeyByZXR1cm4gfVxyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmV4cGFuZGVkID0gISRzY29wZS5leHBhbmRlZDtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXZFbGVtZW50LnJlbW92ZUNsYXNzKCdwaXAtc3RpY2t5LW5hdi1zbWFsbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGlwU2lkZU5hdkVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LXNtYWxsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZW1pdCgncGlwTmF2RXhwYW5kZWQnLCAkc2NvcGUuZXhwYW5kZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaXNIaWRkZW4oaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbSAmJiBpdGVtLmFjY2VzcyAmJiAhaXRlbS5hY2Nlc3MoaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpc1NlY3Rpb25FbXB0eShsaW5rQ29sbGVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgXy5lYWNoKGxpbmtDb2xsZWN0aW9uLCBmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0hpZGRlbihsaW5rKSlcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkNvbmZpZ0NoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnNlY3Rpb25zID0gY29uZmlnLnNlY3Rpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25TdGF0ZUNoYW5nZWQoZXZlbnQsIHN0YXRlKSB7XHJcbiAgICAgICAgICAgIC8vIFNTPiBZb3Ugc2hhbGwgbm90IHNldCBpdCBpbnRvIHRoZSBtZW51IHN0YXRlLiBJbnN0ZWFkIGl0IHNoYWxsIGJlIGNvbnRyb2xsZWQgYnkgdGhlIHN0YXRlIG9mIFNpZGVuYXZcclxuICAgICAgICAgICAgLy9waXBOYXZNZW51LmNvbGxhcHNlZChzdGF0ZS5leHBhbmQpO1xyXG4gICAgICAgICAgICBpZiAoIXN0YXRlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSBzdGF0ZS5leHBhbmQ7XHJcbiAgICAgICAgICAgICRzY29wZS5leHBhbmRlZCA9IHN0YXRlLmlzRXhwYW5kZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS5leHBhbmRlZEJ1dHRvbiA9IHN0YXRlLmV4cGFuZGVkQnV0dG9uO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnNpZGVOYXZTdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaXNBY3RpdmUobGluaykge1xyXG4gICAgICAgICAgICBpZiAobGluay5wYXJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRzdGF0ZSA9ICRpbmplY3Rvci5oYXMoJyRzdGF0ZScpID8gJGluamVjdG9yLmdldCgnJHN0YXRlJykgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzdGF0ZSAhPSBudWxsICYmICRzdGF0ZS5pbmNsdWRlcyhsaW5rLnBhcmVudFN0YXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmsuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSA/ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICgkc3RhdGUgIT0gbnVsbCAmJiAkc3RhdGUuaW5jbHVkZXMobGluay5zdGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5rLmhyZWYpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLmhyZWYuc3BsaXQoJz8nKVswXSA9PT0gJHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5rLnVybCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmsudXJsLnNwbGl0KC9bXFxzLz9dKy8pWzFdID09PSAkbG9jYXRpb24udXJsKCkuc3BsaXQoL1tcXHMvP10rLylbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsaWNrTGluayhldmVudCwgbGluaykge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGluay5ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluay5ocmVmLnNwbGl0KCc/JylbMF0gPT09ICR3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGluay5ocmVmO1xyXG4gICAgICAgICAgICAgICAgfSwgYW5pbWF0aW9uRHVyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChsaW5rLnVybCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmsudXJsLnNwbGl0KC9bXFxzLz9dKy8pWzFdID09PSAkbG9jYXRpb24udXJsKCkuc3BsaXQoL1tcXHMvP10rLylbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24udXJsKGxpbmsudXJsKTtcclxuICAgICAgICAgICAgICAgIH0sIGFuaW1hdGlvbkR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobGluay5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRzdGF0ZSA9ICRpbmplY3Rvci5oYXMoJyRzdGF0ZScpID8gJGluamVjdG9yLmdldCgnJHN0YXRlJykgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc3RhdGUgIT0gbnVsbCAmJiAkc3RhdGUuY3VycmVudC5uYW1lID09PSBsaW5rLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRpbmplY3Rvci5oYXMoJyRzdGF0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKGxpbmsuc3RhdGUsIGxpbmsuc3RhdGVQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGFuaW1hdGlvbkR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobGluay5ldmVudClcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChsaW5rLmV2ZW50LCBsaW5rKTtcclxuXHJcbiAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RpY2t5TmF2TWVudURpcmVjdGl2ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIC8vIHNlY3Rpb25zOiAnPz1waXBTZWN0aW9ucycsXHJcbiAgICAgICAgICAgICAgICAvLyBjb2xsYXBzZWQ6ICc9cGlwQ29sbGFwc2VkJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdtZW51L1N0aWNreU5hdk1lbnUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFN0aWNreU5hdk1lbnVEaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwTmF2TWVudScpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgncGlwU3RpY2t5TmF2TWVudScsIHN0aWNreU5hdk1lbnVEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwTmF2TWVudScsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVHJhbnNsYXRlJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vTmF2TWVudVNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vU3RpY2t5TmF2TWVudURpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL05hdk1lbnVTZXJ2aWNlJzsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hDb25maWcgfSBmcm9tICcuL1NlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJU2VhcmNoU2VydmljZSB9IGZyb20gJy4vU2VhcmNoU2VydmljZSc7XHJcbmltcG9ydCB7IFNlYXJjaENoYW5nZWRFdmVudCB9IGZyb20gJy4vU2VhcmNoU2VydmljZSc7XHJcbmltcG9ydCB7IFNlYXJjaEFjdGl2YXRlZEV2ZW50IH0gZnJvbSAnLi9TZWFyY2hTZXJ2aWNlJztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuY2xhc3MgU2VhcmNoQmFyQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBjb25maWc6IFNlYXJjaENvbmZpZztcclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc2VhcmNoOiBhbnkgPSB7IHRleHQ6ICcnIH07XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yIChcclxuICAgICAgICAkZWxlbWVudCwgXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsIFxyXG4gICAgICAgIHBpcFNlYXJjaDogSVNlYXJjaFNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gJGVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtc2VhcmNoLWJhcicpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHBpcFNlYXJjaC5jb25maWc7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKFNlYXJjaENoYW5nZWRFdmVudCwgKGV2ZW50LCBjb25maWcpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hDaGFuZ2VkKGV2ZW50LCBjb25maWcpOyBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRlQ2hhbmdlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VsZW1lbnQnLCB0aGlzLl9lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5fZWxlbWVudC5hZGRDbGFzcygndy1zdHJldGNoJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuYWRkQ2xhc3MoJ3ctc3RyZXRjaCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LnBhcmVudCgpLmFkZENsYXNzKCdwaXAtc2VhcmNoLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZWxlbWVudCcsIHRoaXMuX2VsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9lbGVtZW50LnJlbW92ZUNsYXNzKCd3LXN0cmV0Y2gnKTtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmVDbGFzcygndy1zdHJldGNoJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3BpcC1zZWFyY2gtYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TZWFyY2hDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlYXJjaC50ZXh0ID0gJyc7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZm9jdXNUZXh0KCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9ICQoJy5waXAtc2VhcmNoLXRleHQnKTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoLnRleHQgPSB0aGlzLmNvbmZpZy5jcml0ZXJpYTtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZm9jdXNUZXh0KCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsaWNrKCkge1xyXG4gICAgICAgIGxldCBzZWFyY2ggPSB0aGlzLnNlYXJjaC50ZXh0O1xyXG5cclxuICAgICAgICB0aGlzLnNlYXJjaC50ZXh0ID0gJyc7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuY2FsbGJhY2spXHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmNhbGxiYWNrKHNlYXJjaCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdChTZWFyY2hBY3RpdmF0ZWRFdmVudCwgc2VhcmNoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoLnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2gudGV4dCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzVGV4dCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25LZXlEb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICAvLyBFbnRlciBwcmVzc2VkXHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKVxyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgICAgICAvLyBFU0MgcHJlc3NlZFxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2VhcmNoQmFyRGlyZWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3NlYXJjaC9TZWFyY2hCYXIuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogU2VhcmNoQmFyQ29udHJvbGxlcixcclxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBTZWFyY2hCYXInKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwU2VhcmNoQmFyJywgc2VhcmNoQmFyRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBPcGVuU2VhcmNoRXZlbnQgPSAncGlwT3BlblNlYXJjaCc7XHJcbmV4cG9ydCBsZXQgQ2xvc2VTZWFyY2hFdmVudCA9ICdwaXBDbG9zZVNlYXJjaCc7XHJcbmV4cG9ydCBsZXQgU2VhcmNoQ2hhbmdlZEV2ZW50ID0gJ3BpcFNlYXJjaENoYW5nZWQnO1xyXG5leHBvcnQgbGV0IFNlYXJjaEFjdGl2YXRlZEV2ZW50ID0gJ3BpcFNlYXJjaEFjdGl2YXRlZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29uZmlnIHtcclxuICAgIC8vIFNlYXJjaCB2aXNpYmxlXHJcbiAgICBwdWJsaWMgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgIC8vIFNlYXJjaCBjcml0ZXJpYVxyXG4gICAgcHVibGljIGNyaXRlcmlhOiBzdHJpbmc7XHJcbiAgICAvLyBDdXN0b20gc2VhcmNoIHBhcmFtZXRlcnNcclxuICAgIHB1YmxpYyBwYXJhbXM6IGFueTtcclxuICAgIC8vIEhpc3RvcnkgZm9yIHNlYXJjaCBhdXRvY29tcGxldGVcclxuICAgIHB1YmxpYyBoaXN0b3J5OiBzdHJpbmdbXTtcclxuICAgIC8vIENhbGxiYWNrIGZvciBzZWFyY2hcclxuICAgIGNhbGxiYWNrOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2VhcmNoU2VydmljZSB7XHJcbiAgICBjb25maWc6IFNlYXJjaENvbmZpZztcclxuICAgIGNyaXRlcmlhOiBzdHJpbmc7XHJcbiAgICBwYXJhbXM6IGFueTtcclxuICAgIGhpc3Rvcnk6IHN0cmluZ1tdO1xyXG4gICAgY2FsbGJhY2s6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkO1xyXG5cclxuICAgIHNldChjYWxsYmFjazogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQsIGNyaXRlcmlhPzogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGhpc3Rvcnk/OiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICBjbGVhcigpOiB2b2lkO1xyXG4gICAgb3BlbigpOiB2b2lkO1xyXG4gICAgY2xvc2UoKTogdm9pZDtcclxuICAgIHRvZ2dsZSgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZWFyY2hQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIgeyAgICBcclxufVxyXG5cclxuXHJcbmNsYXNzIFNlYXJjaFNlcnZpY2UgaW1wbGVtZW50cyBJU2VhcmNoU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IFNlYXJjaENvbmZpZztcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvbmZpZzogU2VhcmNoQ29uZmlnLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oT3BlblNlYXJjaEV2ZW50LCAoKSA9PiB7IHRoaXMub3BlbiB9KTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbihDbG9zZVNlYXJjaEV2ZW50LCAoKSA9PiB7IHRoaXMuY2xvc2UgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogU2VhcmNoQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY3JpdGVyaWEoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNyaXRlcmlhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY3JpdGVyaWEodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJhbXMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhcmFtcyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcmFtcyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBoaXN0b3J5KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmhpc3Rvcnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBoaXN0b3J5KHZhbHVlOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5oaXN0b3J5ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNhbGxiYWNrKCk6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2FsbGJhY2sodmFsdWU6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNhbGxiYWNrID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0KGNhbGxiYWNrOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZCwgY3JpdGVyaWE/OiBzdHJpbmcsIHBhcmFtcz86IGFueSwgaGlzdG9yeT86IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gY3JpdGVyaWE7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgICB0aGlzLl9jb25maWcuaGlzdG9yeSA9IGhpc3Rvcnk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJhbXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IGZhbHNlOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTsgICAgICAgICAgICAgICAgXHJcbiAgICB9ICAgICAgICAgICAgICAgIFxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSAhdGhpcy5fY29uZmlnLnZpc2libGU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTsgICAgICAgICAgICAgICAgXHJcbiAgICB9ICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KFNlYXJjaENoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU2VhcmNoUHJvdmlkZXIgaW1wbGVtZW50cyBJU2VhcmNoUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBTZWFyY2hDb25maWcgPSBuZXcgU2VhcmNoQ29uZmlnKCk7XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBTZWFyY2hTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfSBcclxufVxyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBTZWFyY2hCYXInKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBTZWFyY2gnLCBTZWFyY2hQcm92aWRlcik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBTZWFyY2hCYXInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRyYW5zbGF0ZScsICdwaXBOYXYuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL1NlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vU2VhcmNoQmFyRGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vU2VhcmNoU2VydmljZSc7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gU2lkZU5hdlBhcnREaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJHJvb3RTY29wZSwgcGlwU2lkZU5hdikge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdmFyIHBhcnROYW1lID0gJycgKyAkYXR0cnMucGlwU2lkZW5hdlBhcnQ7XHJcbiAgICAgICAgdmFyIHBhcnRWYWx1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIEJyZWFrIHBhcnQgYXBhcnRcclxuICAgICAgICB2YXIgcG9zID0gcGFydE5hbWUuaW5kZXhPZignOicpO1xyXG4gICAgICAgIGlmIChwb3MgPiAwKSB7XHJcbiAgICAgICAgICAgIHBhcnRWYWx1ZSA9IHBhcnROYW1lLnN1YnN0cihwb3MgKyAxKTtcclxuICAgICAgICAgICAgcGFydE5hbWUgPSBwYXJ0TmFtZS5zdWJzdHIoMCwgcG9zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uU2lkZU5hdkNoYW5nZWQobnVsbCwgcGlwU2lkZU5hdi5jb25maWcpXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcFNpZGVOYXZDaGFuZ2VkJywgb25TaWRlTmF2Q2hhbmdlZCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU2lkZU5hdkNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBjb25maWcucGFydHMgfHwge307XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50UGFydFZhbHVlID0gcGFydHNbcGFydE5hbWVdO1xyXG4gICAgICAgICAgICB2YXIgdmlzaWJsZSA9ICEhKHBhcnRWYWx1ZSA/IGN1cnJlbnRQYXJ0VmFsdWUgPT0gcGFydFZhbHVlIDogY3VycmVudFBhcnRWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodmlzaWJsZSAhPSAkc2NvcGUudmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICRzY29wZS52aXNpYmxlID0gdmlzaWJsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNpZGVuYXZQYXJ0RGlyZWN0aXZlKG5nSWZEaXJlY3RpdmUpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHZhciBuZ0lmID0gbmdJZkRpcmVjdGl2ZVswXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHJhbnNjbHVkZTogbmdJZi50cmFuc2NsdWRlLFxyXG4gICAgICAgICAgICBwcmlvcml0eTogbmdJZi5wcmlvcml0eSxcclxuICAgICAgICAgICAgdGVybWluYWw6IG5nSWYudGVybWluYWwsXHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiBuZ0lmLnJlc3RyaWN0LFxyXG4gICAgICAgICAgICBzY29wZTogdHJ1ZSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gbGlua0Z1bmN0aW9uKCRzY29wZTogYW55LCAkZWxlbWVudCwgJGF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICAkYXR0cnMubmdJZiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICRzY29wZS52aXNpYmxlIH07XHJcbiAgICAgICAgICAgICAgICBuZ0lmLmxpbmsuYXBwbHkobmdJZiwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogU2lkZU5hdlBhcnREaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwU2lkZU5hdicpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgncGlwU2lkZW5hdlBhcnQnLCBzaWRlbmF2UGFydERpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBsZXQgU2lkZU5hdkNoYW5nZWRFdmVudCA9ICdwaXBTaWRlTmF2Q2hhbmdlZCc7XHJcbmV4cG9ydCBsZXQgU2lkZU5hdlN0YXRlQ2hhbmdlZEV2ZW50ID0gJ3BpcFNpZGVOYXZTdGF0ZUNoYW5nZWQnO1xyXG5leHBvcnQgbGV0IE9wZW5TaWRlTmF2RXZlbnQgPSAncGlwT3BlblNpZGVOYXYnO1xyXG5leHBvcnQgbGV0IENsb3NlU2lkZU5hdkV2ZW50ID0gJ3BpcENsb3NlU2lkZU5hdic7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZU5hdkNvbmZpZyB7XHJcbiAgICBwYXJ0czogYW55O1xyXG4gICAgY2xhc3Nlczogc3RyaW5nW107XHJcbiAgICBzdGF0ZTogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2lkZU5hdlNlcnZpY2Uge1xyXG4gICAgcmVhZG9ubHkgY29uZmlnOiBTaWRlTmF2Q29uZmlnO1xyXG4gICAgcmVhZG9ubHkgY2xhc3Nlczogc3RyaW5nW107XHJcbiAgICBwYXJ0czogYW55O1xyXG4gICAgc3RhdGU6IGFueTtcclxuXHJcbiAgICBvcGVuKCk6IHZvaWQ7XHJcbiAgICBjbG9zZSgpOiB2b2lkO1xyXG4gICAgdG9nZ2xlKCk6IHZvaWQ7XHJcbiAgICBzaG93KCk6IHZvaWQ7XHJcbiAgICBoaWRlKCk6IHZvaWQ7XHJcblxyXG4gICAgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG5cclxuICAgIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2lkZU5hdlByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBjb25maWc6IFNpZGVOYXZDb25maWc7XHJcbiAgICBwYXJ0czogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgIGNsYXNzZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZDtcclxuXHJcbiAgICBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIFNpZGVOYXZTZXJ2aWNlIGltcGxlbWVudHMgSVNpZGVOYXZTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogU2lkZU5hdkNvbmZpZztcclxuICAgIHByaXZhdGUgX3N0YXRlOiBhbnk7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfc2lkZW5hdjogbmcubWF0ZXJpYWwuSVNpZGVuYXZTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBpZCA9ICdwaXAtc3RpY2t5LXNpZGVuYXYnO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IFNpZGVOYXZDb25maWcsICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCAkbWRTaWRlbmF2OiBuZy5tYXRlcmlhbC5JU2lkZW5hdlNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgICAgICB0aGlzLl9zaWRlbmF2ID0gJG1kU2lkZW5hdjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBTaWRlTmF2Q29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xhc3NlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFydHMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnBhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFydHModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHZhbHVlIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdGF0ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN0YXRlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KFNpZGVOYXZTdGF0ZUNoYW5nZWRFdmVudCwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuKCkge1xyXG4gICAgICAgIHRoaXMuX3NpZGVuYXYodGhpcy5pZCkub3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9zaWRlbmF2KHRoaXMuaWQpLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvZ2dsZSgpIHtcclxuICAgICAgICB0aGlzLl9zaWRlbmF2KHRoaXMuaWQpLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY29uZmlnLnZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLnZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBfLnJlamVjdCh0aGlzLl9jb25maWcuY2xhc3NlcywgKGNjKSA9PiBjYyA9PSBjKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0c1twYXJ0XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRlbWl0KFNpZGVOYXZDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNpZGVOYXZQcm92aWRlciBpbXBsZW1lbnRzIElTaWRlTmF2UHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBTaWRlTmF2Q29uZmlnID0ge1xyXG4gICAgICAgIHBhcnRzOiB7fSxcclxuICAgICAgICBjbGFzc2VzOiBbXSxcclxuICAgICAgICB0eXBlOiAnc3RpY2t5JyxcclxuICAgICAgICBzdGF0ZTogbnVsbCxcclxuICAgICAgICB2aXNpYmxlOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IFNpZGVOYXZTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IFNpZGVOYXZDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb25maWcodmFsdWU6IFNpZGVOYXZDb25maWcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB2YWx1ZSB8fCBuZXcgU2lkZU5hdkNvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFydHMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnBhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFydHModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHZhbHVlIHx8IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHR5cGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xhc3NlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2xhc3Nlcyh2YWx1ZTogc3RyaW5nW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IF8ucmVqZWN0KHRoaXMuX2NvbmZpZy5jbGFzc2VzLCAoY2MpID0+IGNjID09IGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0c1twYXJ0XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCAkbWRTaWRlbmF2OiBuZy5tYXRlcmlhbC5JU2lkZW5hdlNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgU2lkZU5hdlNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlLCAkbWRTaWRlbmF2KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhvb2tTaWRlTmF2RXZlbnRzKCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCBwaXBTaWRlTmF2OiBJU2lkZU5hdlNlcnZpY2UpIHtcclxuICAgICRyb290U2NvcGUuJG9uKE9wZW5TaWRlTmF2RXZlbnQsICgpID0+IHsgcGlwU2lkZU5hdi5vcGVuKCk7IH0pO1xyXG4gICAgJHJvb3RTY29wZS4kb24oQ2xvc2VTaWRlTmF2RXZlbnQsICgpID0+IHsgcGlwU2lkZU5hdi5jbG9zZSgpOyB9KTtcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwU2lkZU5hdicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcFNpZGVOYXYnLCBTaWRlTmF2UHJvdmlkZXIpXHJcbiAgICAucnVuKGhvb2tTaWRlTmF2RXZlbnRzKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gU3RpY2t5U2lkZU5hdkRpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJHJvb3RTY29wZSwgJGluamVjdG9yLCAkbWRNZWRpYSwgJHRpbWVvdXQsIHBpcFNpZGVOYXYpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIC8vIHZhciBwaXBNZWRpYSA9ICRtZE1lZGlhLCBcclxuICAgICAgICB2YXIgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGwsXHJcbiAgICAgICAgICAgIG1haW5Db250YWluZXIgPSAnLnBpcC1tYWluJyxcclxuICAgICAgICAgICAgYmlnV2lkdGggPSAzMjAsIC8vIGV4cGFuZGVkIHNpZGVuYXYgd2lkdGhcclxuICAgICAgICAgICAgbWlkZGxlV2lkdGggPSAyNDAsXHJcbiAgICAgICAgICAgIHNtYWxsV2lkdGggPSA3MiwgLy8gc2hyaW5rIHNpZGVuYXYgd2lkdGhcclxuICAgICAgICAgICAgaXNSZXNpemluZyA9IGZhbHNlLFxyXG4gICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbiA9IDYwMCxcclxuICAgICAgICAgICAgbWVkaWFCcmVha3BvaW50cztcclxuXHJcbiAgICAgICAgcGlwTWVkaWEgPSBwaXBNZWRpYSAhPT0gdW5kZWZpbmVkID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm5hdlN0YXRlID0ge1xyXG4gICAgICAgICAgICB0b2dnbGU6IHsgLy8gbWVkaWEoc20sIHhzKVxyXG4gICAgICAgICAgICAgICAgaWQ6ICd0b2dnbGUnLFxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6ICdzaWRlbmF2LW1vYmlsZScsIC8vIGNoYW5nZSBzaXplLCBjb2xvciwgc2VsZWN0ZWQ/XHJcbiAgICAgICAgICAgICAgICBzaG93SGVhZGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaXNMb2NrZWRPcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZGVkQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGlzRXhwYW5kZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBleHBhbmQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaG93SWNvblRvb2x0eXBlOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbWFsbDogeyAvLyBtZWRpYShtZClcclxuICAgICAgICAgICAgICAgIGlkOiAnc21hbGwnLFxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6ICdwaXAtc3RpY2t5LW5hdi1zbWFsbCBzaWRlbmF2LXNtYWxsZGVza3RvcCcsIC8vIGNoYW5nZSBzaXplLCBjb2xvciwgc2VsZWN0ZWQ/XHJcbiAgICAgICAgICAgICAgICBzaG93SGVhZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGlzTG9ja2VkT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZGVkQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGlzRXhwYW5kZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dJY29uVG9vbHR5cGU6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGFyZ2U6IHsgLy8gbWVkaWEobGcpXHJcbiAgICAgICAgICAgICAgICBpZDogJ2xhcmdlJyxcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzOiAnc2lkZW5hdi1zbWFsbGRlc2t0b3AnLCAvLyBjaGFuZ2Ugc2l6ZSwgY29sb3IsIHNlbGVjdGVkP1xyXG4gICAgICAgICAgICAgICAgc2hvd0hlYWRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0xvY2tlZE9wZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBleHBhbmRlZEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGlzRXhwYW5kZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBleHBhbmQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaG93SWNvblRvb2x0eXBlOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHhsYXJnZTogeyAvLyBtZWRpYSh4bClcclxuICAgICAgICAgICAgICAgIGlkOiAneGxhcmdlJyxcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzOiAnc2lkZW5hdi1kZXNrdG9wJywgLy8gY2hhbmdlIHNpemUsIGNvbG9yLCBzZWxlY3RlZD9cclxuICAgICAgICAgICAgICAgIHNob3dIZWFkZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNMb2NrZWRPcGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kZWRCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dJY29uVG9vbHR5cGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBtZWRpYUJyZWFrcG9pbnRzID0gc2V0QnJlYWtwb2ludHMoKTtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zdGlja3ktc2lkZW5hdicpO1xyXG5cclxuICAgICAgICBpZiAocGlwU2lkZU5hdi5jb25maWcgJiYgcGlwU2lkZU5hdi5jb25maWcudHlwZSAhPSAncG9wdXAnKSB7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNldFNpZGVOYXZlU3RhdGUoKVxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgdmFyIHdpbmRvd1Jlc2l6ZSA9IF8uZGVib3VuY2Uoc2V0U2lkZU5hdmVTdGF0ZSwgMTApO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwTWFpblJlc2l6ZWQnLCB3aW5kb3dSZXNpemUpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdlN0YXRlJywgb25TaWRlTmF2U3RhdGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlzUmVzaXppbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgJHNjb3BlLnNpZGVuYXZTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNldFN0YXRlKCd0b2dnbGUnKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwTmF2SWNvbkNsaWNrZWQnLCBvbk5hdkljb25DbGljayk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcFNpZGVOYXZDaGFuZ2VkJywgb25TaWRlTmF2Q2hhbmdlZCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBmdW5jdGlvbiBzZXRCcmVha3BvaW50cygpIHtcclxuICAgICAgICAgICAgaWYgKCFwaXBNZWRpYSB8fCAhYW5ndWxhci5pc09iamVjdChwaXBNZWRpYS5icmVha3BvaW50cykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHhzOiA2MzksIHNtOiA5NTksIG1kOiAxMDI0LCBsZzogMTkxOSB9O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpcE1lZGlhLmJyZWFrcG9pbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblNpZGVOYXZDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWcudmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbk5hdkljb25DbGljayhldmVudCkge1xyXG4gICAgICAgICAgICBwaXBTaWRlTmF2Lm9wZW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU2lkZU5hdlN0YXRlKGV2ZW50LCBzdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhzdGF0ZSkgJiYgJHNjb3BlLm5hdlN0YXRlW3N0YXRlXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFNpZGVOYXZlU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmIChpc1Jlc2l6aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChzZXRTaWRlTmF2ZVN0YXRlLCBhbmltYXRpb25EdXJhdGlvbik7IC8vIGZvciBcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBtYWluV2lkdGggPSAkKG1haW5Db250YWluZXIpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICAgICAgbGV0IHNpZGVOYXZXaWR0aCA9ICQoJy5waXAtc3RpY2t5LXNpZGVuYXYnKS5pbm5lcldpZHRoKCk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50V2lkdGggPSBzaWRlTmF2V2lkdGggPyBzaWRlTmF2V2lkdGggKyAyIDogMDsgLy8gYWRkIGJvcmRlciB3aWR0aFxyXG5cclxuICAgICAgICAgICAgaWYgKG1haW5XaWR0aCArIGN1cnJlbnRXaWR0aCA8IG1lZGlhQnJlYWtwb2ludHMuc20gKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZSgndG9nZ2xlJywgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAobWFpbldpZHRoICsgY3VycmVudFdpZHRoIDwgbWVkaWFCcmVha3BvaW50cy5tZCApIHtcclxuICAgICAgICAgICAgICAgIHNldFN0YXRlKCdzbWFsbCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgIGlmIChtYWluV2lkdGggKyBjdXJyZW50V2lkdGggPCBtZWRpYUJyZWFrcG9pbnRzLmxnICkge1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhdGUoJ2xhcmdlJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgICAgICBzZXRTdGF0ZSgneGxhcmdlJyk7ICAgICBcclxuICAgICAgICAgICAgLy8gaWYgKG1haW5XaWR0aCA8IG1lZGlhQnJlYWtwb2ludHMuc20pIHtcclxuICAgICAgICAgICAgLy8gICAgIHNldFN0YXRlKCd0b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gaWYgKG1haW5XaWR0aCA8IG1lZGlhQnJlYWtwb2ludHMubWQgKyBzbWFsbFdpZHRoICYmIG1haW5XaWR0aCA+PSBtZWRpYUJyZWFrcG9pbnRzLnNtICsgc21hbGxXaWR0aCkge1xyXG4gICAgICAgICAgICAvLyAgICAgc2V0U3RhdGUoJ3NtYWxsJyk7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gaWYgKG1haW5XaWR0aCA+PSBtZWRpYUJyZWFrcG9pbnRzLm1kICsgYmlnV2lkdGggJiYgbWFpbldpZHRoIDw9IG1lZGlhQnJlYWtwb2ludHMubGcpIHtcclxuICAgICAgICAgICAgLy8gICAgIHNldFN0YXRlKCdsYXJnZScpO1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGlmIChtYWluV2lkdGggPiBtZWRpYUJyZWFrcG9pbnRzLmxnKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBzZXRTdGF0ZSgneGxhcmdlJyk7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmICghJHNjb3BlLnNpZGVuYXZTdGF0ZSB8fCAhJHNjb3BlLnNpZGVuYXZTdGF0ZS5pZCkge1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKG1haW5XaWR0aCA8IG1lZGlhQnJlYWtwb2ludHMuc20gKyBzbWFsbFdpZHRoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgc2V0U3RhdGUoJ3RvZ2dsZScpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAobWFpbldpZHRoID4gbWVkaWFCcmVha3BvaW50cy5tZCArIGJpZ1dpZHRoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgc2V0U3RhdGUoJ2xhcmdlJyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgc2V0U3RhdGUoJ3NtYWxsJyk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFN0YXRlKHN0YXRlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGlzUmVzaXppbmcpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5zaWRlbmF2U3RhdGUgJiYgJHNjb3BlLnNpZGVuYXZTdGF0ZS5pZCA9PSBzdGF0ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlICE9ICd0b2dnbGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnc2lkZW5hdi1tb2JpbGUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlICE9ICdzbWFsbCcpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdwaXAtc3RpY2t5LW5hdi1zbWFsbCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgIT0gJ3hsYXJnZScpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdzaWRlbmF2LWRlc2t0b3AnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlICE9ICdsYXJnZScpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdzaWRlbmF2LXNtYWxsZGVza3RvcCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAoc3RhdGUgPT0gJ3RvZ2dsZScpIHtcclxuICAgICAgICAgICAgLy8gICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdzaWRlbmF2LWRlc2t0b3AnKTtcclxuICAgICAgICAgICAgLy8gICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdzaWRlbmF2LWRlc2t0b3AnKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBpc1Jlc2l6aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09ICd0b2dnbGUnKSB7XHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLnNpZGVuYXZTdGF0ZSA9ICRzY29wZS5uYXZTdGF0ZVtzdGF0ZV07XHJcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCRzY29wZS5zaWRlbmF2U3RhdGUuYWRkQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgcGlwU2lkZU5hdi5zdGF0ZSA9ICRzY29wZS5zaWRlbmF2U3RhdGU7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIHNpZGVOYXYgU3RhdGVcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0U2lkZU5hdmVTdGF0ZSgpXHJcbiAgICAgICAgICAgIH0sIDE1KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbXBsZXRlIGFuaW1hdGlvblxyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpc1Jlc2l6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIGFuaW1hdGlvbkR1cmF0aW9uKTsgLy9hbmltYXRpb25EdXJhdGlvblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RpY2t5U2lkZU5hdkRpcmVjdGl2ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxyXG4gICAgICAgICAgICBzY29wZTogdHJ1ZSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzaWRlbmF2L1N0aWNreVNpZGVOYXYuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFN0aWNreVNpZGVOYXZEaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwU2lkZU5hdicpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgncGlwU3RpY2t5U2lkZW5hdicsIHN0aWNreVNpZGVOYXZEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwU2lkZU5hdicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL1NpZGVOYXZTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1NpZGVOYXZQYXJ0RGlyZWN0aXZlJztcclxuaW1wb3J0ICcuL1N0aWNreVNpZGVOYXZEaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9TaWRlTmF2U2VydmljZSc7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gVGFic0RpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbWRNZWRpYSwgJGluamVjdG9yLCAkcm9vdFNjb3BlLCAkcGFyc2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHZhciBwaXBUaGVtZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRoZW1lJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUaGVtZScpIDogbnVsbCxcclxuICAgICAgICAgICAgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRUaGVtZSA9ICdkZWZhdWx0JztcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkID0ge307XHJcblxyXG4gICAgICAgIGlmIChwaXBUaGVtZSlcclxuICAgICAgICAgICAgY3VycmVudFRoZW1lID0gcGlwVGhlbWUudXNlKCk7XHJcbiAgICAgICAgZWxzZSBpZiAoJHJvb3RTY29wZS4kdGhlbWUpXHJcbiAgICAgICAgICAgIGN1cnJlbnRUaGVtZSA9ICRyb290U2NvcGUuJHRoZW1lO1xyXG5cclxuICAgICAgICAkc2NvcGUuY2xhc3MgPSAoJGF0dHJzLmNsYXNzIHx8ICcnKSArICcgbWQtJyArIGN1cnJlbnRUaGVtZSArICctdGhlbWUnO1xyXG5cclxuICAgICAgICBpZiAocGlwVHJhbnNsYXRlKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUudGFicy5sZW5ndGggPiAwICYmICRzY29wZS50YWJzWzBdLnRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRlT2JqZWN0cygkc2NvcGUudGFicywgJ3RpdGxlJywgJ25hbWVMb2NhbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZU9iamVjdHMoJHNjb3BlLnRhYnMsICduYW1lJywgJ25hbWVMb2NhbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUubWVkaWEgPSBwaXBNZWRpYSAhPT0gdW5kZWZpbmVkID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuICAgICAgICAkc2NvcGUudGFicyA9ICgkc2NvcGUudGFicyAmJiBfLmlzQXJyYXkoJHNjb3BlLnRhYnMpKSA/ICRzY29wZS50YWJzIDogW107XHJcblxyXG4gICAgICAgIHZhciBwaXBUcmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuICAgICAgICBpZiAocGlwVHJhbnNsYXRlKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUudGFicy5sZW5ndGggPiAwICYmICRzY29wZS50YWJzWzBdLnRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRlT2JqZWN0cygkc2NvcGUudGFicywgJ3RpdGxlJywgJ25hbWVMb2NhbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZU9iamVjdHMoJHNjb3BlLnRhYnMsICduYW1lJywgJ25hbWVMb2NhbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXggPSAkc2NvcGUuYWN0aXZlSW5kZXggfHwgMDtcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlVGFiID0gJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgICAgICAkc2NvcGUudGFiRGlzYWJsZWQgPSB0YWJEaXNhYmxlZDtcclxuICAgICAgICAkc2NvcGUub25TZWxlY3QgPSBvblNlbGVjdDtcclxuICAgICAgICAkc2NvcGUuc2hvd1NoYWRvdyA9IHNob3dTaGFkb3c7XHJcbiAgICAgICAgJHNjb3BlLnNob3cgPSBzaG93O1xyXG5cclxuICAgICAgICBpZiAodG9Cb29sZWFuKCRhdHRycy5waXBSZWJpbmQpKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goJ2FjdGl2ZUluZGV4JywgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXggPSBuZXdWYWx1ZSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZVRhYiA9ICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGlzYWJsZWQoKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUubmdEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5uZ0Rpc2FibGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0YWJEaXNhYmxlZChpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKCRzY29wZS5kaXNhYmxlZCgpICYmICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleCAhPSBpbmRleCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25TZWxlY3QoaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5kaXNhYmxlZCgpKSByZXR1cm47XHJcbiAgICAgICAgICAgICRzY29wZS5hY3RpdmVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZVRhYiA9ICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleDtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3QoJHNjb3BlLnRhYnNbJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4XSwgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dTaGFkb3coKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2hvd1RhYnNTaGFkb3cpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuc2hvd1RhYnNTaGFkb3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2hvd1RhYnMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuc2hvd1RhYnMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdG9Cb29sZWFuKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PSAnMScgfHwgdmFsdWUgPT0gJ3RydWUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHRhYnNEaXJlY3RpdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIG5nRGlzYWJsZWQ6ICcmJyxcclxuICAgICAgICAgICAgICAgIHRhYnM6ICc9cGlwVGFicycsXHJcbiAgICAgICAgICAgICAgICBzaG93VGFiczogJyZwaXBTaG93VGFicycsXHJcbiAgICAgICAgICAgICAgICBzaG93VGFic1NoYWRvdzogJyZwaXBUYWJzU2hhZG93JyxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4OiAnPXBpcEFjdGl2ZUluZGV4JyxcclxuICAgICAgICAgICAgICAgIHNlbGVjdDogJz1waXBUYWJzU2VsZWN0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RhYnMvVGFicy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogVGFic0RpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcInBpcFRhYnNcIiwgWydwaXBOYXYuVGVtcGxhdGVzJ10pXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgncGlwVGFicycsIHRhYnNEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYWN0aW9ucy9QcmltYXJ5QWN0aW9ucy5odG1sJyxcbiAgICAnPG1kLW1lbnUgbWQtcG9zaXRpb24tbW9kZT1cInRhcmdldC1yaWdodCB0YXJnZXRcIiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnNcIiBuZy1yZXBlYXQ9XCJhY3Rpb24gaW4gY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnNcIj48bWQtYnV0dG9uIGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9ucy1hY3Rpb24gbWQtaWNvbi1idXR0b25cIiBuZy1jbGljaz1cImNsaWNrQWN0aW9uKGFjdGlvbiwgJG1kT3Blbk1lbnUpO1wiIG5nLWhpZGU9XCJpc0hpZGRlbihhY3Rpb24pXCIgYXJpYS1sYWJlbD1cInt7YWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX1cIj48ZGl2IGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9ucy1iYWRnZVwiIG5nLXNob3c9XCJhY3Rpb24uY291bnQgPiAwXCI+e3thY3Rpb25Db3VudChhY3Rpb24pfX08L2Rpdj48bWQtaWNvbiBtZC1zdmctaWNvbj1cInt7YWN0aW9uLmljb259fVwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj48bWQtbWVudS1jb250ZW50IHdpZHRoPVwiM1wiPjxtZC1tZW51LWl0ZW0gbmctcmVwZWF0LXN0YXJ0PVwic3ViQWN0aW9uIGluIGFjdGlvbi5zdWJBY3Rpb25zXCIgbmctaWY9XCIhc3ViQWN0aW9uLmRpdmlkZXJcIiBuZy1oaWRlPVwiaXNIaWRkZW4oc3ViQWN0aW9uKVwiPjxtZC1idXR0b24gbmctaGlkZT1cInN1YkFjdGlvbi5kaXZpZGVyXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihzdWJBY3Rpb24pXCI+e3s6OnN1YkFjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cInN1YkFjdGlvbi5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT48bWQtbWVudSBtZC1wb3NpdGlvbi1tb2RlPVwidGFyZ2V0LXJpZ2h0IHRhcmdldFwiIGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9uc1wiIG5nLXJlcGVhdD1cImFjdGlvbiBpbiBjb25maWcucHJpbWFyeUdsb2JhbEFjdGlvbnNcIj48bWQtYnV0dG9uIGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9ucy1hY3Rpb24gbWQtaWNvbi1idXR0b25cIiBuZy1jbGljaz1cImNsaWNrQWN0aW9uKGFjdGlvbiwgJG1kT3Blbk1lbnUpO1wiIG5nLWhpZGU9XCJpc0hpZGRlbihhY3Rpb24pXCIgYXJpYS1sYWJlbD1cInt7YWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX1cIj48ZGl2IGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9ucy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLXNob3c9XCJhY3Rpb24uY291bnQgPiAwXCI+e3thY3Rpb25Db3VudChhY3Rpb24pfX08L2Rpdj48bWQtaWNvbiBtZC1zdmctaWNvbj1cInt7YWN0aW9uLmljb259fVwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj48bWQtbWVudS1jb250ZW50IHdpZHRoPVwiM1wiPjxtZC1tZW51LWl0ZW0gbmctcmVwZWF0LXN0YXJ0PVwic3ViQWN0aW9uIGluIGFjdGlvbi5zdWJBY3Rpb25zXCIgbmctaWY9XCIhc3ViQWN0aW9uLmRpdmlkZXJcIiBuZy1oaWRlPVwiaXNIaWRkZW4oc3ViQWN0aW9uKVwiPjxtZC1idXR0b24gbmctaGlkZT1cInN1YkFjdGlvbi5kaXZpZGVyXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihzdWJBY3Rpb24pXCI+e3tzdWJBY3Rpb24udGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJzdWJBY3Rpb24uZGl2aWRlclwiIG5nLXJlcGVhdC1lbmQ9XCJcIj48L21kLW1lbnUtZGl2aWRlcj48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYWN0aW9ucy9TZWNvbmRhcnlBY3Rpb25zLmh0bWwnLFxuICAgICc8bWQtbWVudSBuZy1pZj1cInNlY29uZGFyeUFjdGlvbnNWaXNpYmxlKClcIiBtZC1wb3NpdGlvbi1tb2RlPVwidGFyZ2V0LXJpZ2h0IHRhcmdldFwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIG5nLWNsaWNrPVwib25TZWNvbmRhcnlBY3Rpb25DbGljaygpOyBvcGVuTWVudSgkbWRPcGVuTWVudSwgJGV2ZW50KTtcIiBhcmlhLWxhYmVsPVwib3BlbiBhY3Rpb25zXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczp2ZG90c1wiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj48bWQtbWVudS1jb250ZW50IHdpZHRoPVwiM1wiPjxtZC1tZW51LWl0ZW0gbmctcmVwZWF0LXN0YXJ0PVwiYWN0aW9uIGluIGNvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnNcIiBuZy1pZj1cIiFhY3Rpb24uZGl2aWRlclwiIG5nLWhpZGU9XCJpc0hpZGRlbihhY3Rpb24pXCI+PG1kLWJ1dHRvbiBuZy1oaWRlPVwiYWN0aW9uLmRpdmlkZXJcIiBuZy1jbGljaz1cImNsaWNrQWN0aW9uKGFjdGlvbilcIj57ezo6YWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwiYWN0aW9uLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cInNlY29uZGFyeURpdmlkZXJWaXNpYmxlKClcIj48L21kLW1lbnUtZGl2aWRlcj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cImFjdGlvbiBpbiBjb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9uc1wiIG5nLWlmPVwiIWFjdGlvbi5kaXZpZGVyXCIgbmctaGlkZT1cImlzSGlkZGVuKGFjdGlvbilcIj48bWQtYnV0dG9uIG5nLWhpZGU9XCJhY3Rpb24uZGl2aWRlclwiIG5nLWNsaWNrPVwiY2xpY2tBY3Rpb24oYWN0aW9uKVwiPnt7OjphY3Rpb24udGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJhY3Rpb24uZGl2aWRlclwiIG5nLXJlcGVhdC1lbmQ9XCJcIj48L21kLW1lbnUtZGl2aWRlcj48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYXBwYmFyL0FwcEJhci5odG1sJyxcbiAgICAnPG1kLXRvb2xiYXIgY2xhc3M9XCJ7eyBjb25maWcuY2xhc3Nlcy5qb2luKFxcJyBcXCcpIH19XCIgbmctaWY9XCJjb25maWcudmlzaWJsZVwiIG5nLXRyYW5zY2x1ZGU9XCJcIj48L21kLXRvb2xiYXI+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYnJlYWRjcnVtYi9CcmVhZGNydW1iLmh0bWwnLFxuICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OiAyM3B4O1wiPjxkaXYgY2xhc3M9XCJoaWRlLXhzIHRleHQtb3ZlcmZsb3dcIj48c3BhbiBuZy1pZj1cInZtLmNvbmZpZy5jcml0ZXJpYVwiIG5nLWNsaWNrPVwidm0ub3BlblNlYXJjaCgpXCI+e3t2bS5jb25maWcuY3JpdGVyaWF9fSAtPC9zcGFuPjxzcGFuIGNsYXNzPVwicGlwLWJyZWFkY3J1bWItaXRlbSB7eyRsYXN0ID8gXFwnYnJlYWRjcnVtYi1hY2NlbnRcXCcgOiBcXCdcXCd9fVwiIG5nLWlmPVwidm0uY29uZmlnLml0ZW1zICYmIHZtLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAwXCIgbmctcmVwZWF0LXN0YXJ0PVwiaXRlbSBpbiB2bS5jb25maWcuaXRlbXNcIiBuZy1jbGljaz1cInZtLm9uQ2xpY2soaXRlbSlcIiBuZy1pbml0PVwic3RlcFdpZHRoID0gMTAwLyh2bS5jb25maWcuaXRlbXMubGVuZ3RoICsgMSlcIiBuZy1jbGFzcz1cIntcXCdjdXJzb3ItcG9pbnRlclxcJzogISRsYXN0fVwiIG5nLXN0eWxlPVwie1xcJ21heC13aWR0aFxcJzogc3RlcFdpZHRoICsgXFwnJVxcJ31cIj48c3BhbiBjbGFzcz1cImhpZGUteHNcIiBuZy1pZj1cIiEkbGFzdCB8fCAhdm0uYWN0aW9uc1Zpc2libGUoaXRlbSlcIj57e2l0ZW0udGl0bGUgfCB0cmFuc2xhdGV9fTwvc3Bhbj48ZGl2IG5nLWlmPVwiJGxhc3QgJiYgdm0uYWN0aW9uc1Zpc2libGUoaXRlbSlcIiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgcG9zaXRpb246IHJlbGF0aXZlO1wiPjxtZC1tZW51IGNsYXNzPVwiaGlkZS14c1wiIG1kLW9mZnNldD1cIjAgNDRcIj48c3BhbiBjbGFzcz1cImxheW91dC1yb3cgcGlwLWJyZWFkY3J1bWItaXRlbS1tZW51IGN1cnNvci1wb2ludGVyIHt7JGxhc3QgPyBcXCdicmVhZGNydW1iLWFjY2VudFxcJyA6IFxcJ1xcJ319XCIgbmctY2xpY2s9XCJ2bS5vbk9wZW5NZW51KCRtZE9wZW5NZW51LCAkZXZlbnQpXCIgbWQtaW5rLXJpcHBsZT1cIlwiIGFyaWEtbGFiZWw9XCJvcGVuIGJyZWFkY3J1bWIgYWN0aW9uc1wiPnt7aXRlbS50aXRsZSB8IHRyYW5zbGF0ZX19PG1kLWljb24gY2xhc3M9XCJwaXAtdHJpYW5nbGUtZG93blwiIG1kLXN2Zy1pY29uPVwiaWNvbnM6dHJpYW5nbGUtZG93blwiPjwvbWQtaWNvbj48L3NwYW4+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjRcIj48bWQtbWVudS1pdGVtIG5nLWlmPVwiIXN1Ykl0ZW0uZGl2aWRlclwiIG5nLXJlcGVhdC1zdGFydD1cInN1Ykl0ZW0gaW4gaXRlbS5zdWJBY3Rpb25zXCI+PG1kLWJ1dHRvbiBuZy1jbGljaz1cInZtLm9uU3ViQWN0aW9uQ2xpY2soc3ViSXRlbSlcIiBuZy1oaWRlPVwiYWN0aW9uLmRpdmlkZXJcIj48bWQtaWNvbiBtZC1tZW51LWFsaWduLXRhcmdldD1cIlwiIG5nLWlmPVwic3ViSXRlbS5pY29uXCIgbWQtc3ZnLWljb249XCJ7e3N1Ykl0ZW0uaWNvbn19XCI+PC9tZC1pY29uPjxzcGFuPnt7c3ViSXRlbS50aXRsZSB8IHRyYW5zbGF0ZX19PC9zcGFuPjwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJzdWJJdGVtLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PjwvZGl2Pjwvc3Bhbj48bWQtaWNvbiBuZy1yZXBlYXQtZW5kPVwiXCIgbWQtc3ZnLWljb249XCJpY29uczpjaGV2cm9uLXJpZ2h0XCIgbmctaGlkZT1cIiRsYXN0XCI+PC9tZC1pY29uPjxzcGFuIGNsYXNzPVwicGlwLXRpdGxlIGJyZWFkY3J1bWItYWNjZW50XCIgbmctaWY9XCJ2bS5jb25maWcudGV4dFwiPnt7dm0uY29uZmlnLnRleHQgfCB0cmFuc2xhdGV9fTwvc3Bhbj48L2Rpdj48ZGl2IHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiIGNsYXNzPVwiaGlkZS1ndC14c1wiPjxtZC1tZW51IG1kLW9mZnNldD1cIjAgNDRcIj48c3BhbiBjbGFzcz1cInBpcC1tb2JpbGUtYnJlYWRjcnVtYiBsYXlvdXQtcm93XCIgbmctY2xpY2s9XCJ2bS5jb25maWcuaXRlbXMgJiYgdm0uY29uZmlnLml0ZW1zLmxlbmd0aCA+IDEgPyAkbWRPcGVuTWVudSgpIDogcmV0dXJuXCIgYXJpYS1sYWJlbD1cIm9wZW4gYnJlYWRjcnVtYlwiPjxzcGFuIGNsYXNzPVwidGV4dC1vdmVyZmxvd1wiPjxzcGFuIG5nLWlmPVwidm0uY29uZmlnLmNyaXRlcmlhXCIgbmctY2xpY2s9XCJ2bS5vcGVuU2VhcmNoKClcIj57e3ZtLmNvbmZpZy5jcml0ZXJpYX19IC08L3NwYW4+IDxzcGFuIGNsYXNzPVwiYnJlYWRjcnVtYi1hY2NlbnRcIiBuZy1pZj1cInZtLmNvbmZpZy50ZXh0XCI+e3t2bS5jb25maWcudGV4dCB8IHRyYW5zbGF0ZX19PC9zcGFuPiA8c3BhbiBuZy1pZj1cInZtLmNvbmZpZy5pdGVtcyAmJiB2bS5jb25maWcuaXRlbXMubGVuZ3RoID4gMFwiIGNsYXNzPVwiYnJlYWRjcnVtYi1hY2NlbnQge3sodm0uY29uZmlnLml0ZW1zICYmIHZtLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAxKSA/IFxcJ2N1cnNvci1wb2ludGVyXFwnIDogXFwnXFwnIH19XCI+e3t2bS5jb25maWcuaXRlbXNbdm0uY29uZmlnLml0ZW1zLmxlbmd0aCAtIDFdLnRpdGxlIHwgdHJhbnNsYXRlfX08L3NwYW4+PC9zcGFuPjxtZC1pY29uIGNsYXNzPVwicGlwLXRyaWFuZ2xlLWRvd24gY3Vyc29yLXBvaW50ZXIgYnJlYWRjcnVtYi1hY2NlbnRcIiBtZC1zdmctaWNvbj1cImljb25zOnRyaWFuZ2xlLWRvd25cIiBuZy1pZj1cInZtLmNvbmZpZy5pdGVtcyAmJiB2bS5jb25maWcuaXRlbXMubGVuZ3RoID4gMVwiPjwvbWQtaWNvbj48L3NwYW4+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjRcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdD1cIml0ZW0gaW4gdm0uY29uZmlnLml0ZW1zXCIgbmctaWY9XCJ2bS5jb25maWcuaXRlbXMgJiYgdm0uY29uZmlnLml0ZW1zLmxlbmd0aCA+IDBcIj48bWQtYnV0dG9uIG5nLWNsaWNrPVwidm0ub25DbGljayhpdGVtKVwiPjxtZC1pY29uIG1kLW1lbnUtYWxpZ24tdGFyZ2V0PVwiXCIgbmctaWY9XCJpdGVtLmljb25cIiBtZC1zdmctaWNvbj1cInt7aXRlbS5pY29ufX1cIj48L21kLWljb24+PHNwYW4+e3tpdGVtLnRpdGxlIHwgdHJhbnNsYXRlfX08L3NwYW4+PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtaXRlbSBuZy1pZj1cInZtLmNvbmZpZy50ZXh0XCI+PG1kLWJ1dHRvbj48c3BhbiBjbGFzcz1cInRleHQtZ3JleVwiPnt7dm0uY29uZmlnLnRleHQgfCB0cmFuc2xhdGV9fTwvc3Bhbj48L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+PC9kaXY+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZHJvcGRvd24vRHJvcGRvd24uaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIGNsYXNzPVwibWQtc3ViaGVhZCBjb2xvci1wcmltYXJ5LWJnIHt7Y2xhc3N9fVwiIG5nLWlmPVwic2hvdygpXCIgbmctY2xhc3M9XCJ7XFwnbWQtd2hpdGVmcmFtZS0zZHBcXCc6IG1lZGlhKFxcJ3hzXFwnKX1cIj48ZGl2IGNsYXNzPVwicGlwLWRpdmlkZXJcIj48L2Rpdj48bWQtc2VsZWN0IG5nLW1vZGVsPVwic2VsZWN0ZWRJbmRleFwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWQoKVwiIG1kLWNvbnRhaW5lci1jbGFzcz1cInBpcC1mdWxsLXdpZHRoLWRyb3Bkb3duXCIgYXJpYS1sYWJlbD1cIkRST1BET1dOXCIgbWQtaW5rLXJpcHBsZT1cIlwiIG1kLW9uLWNsb3NlPVwib25TZWxlY3Qoc2VsZWN0ZWRJbmRleClcIj48bWQtb3B0aW9uIG5nLXJlcGVhdD1cImFjdGlvbiBpbiBhY3Rpb25zXCIgdmFsdWU9XCJ7eyA6OiRpbmRleCB9fVwiIG5nLXNlbGVjdGVkPVwiYWN0aXZlSW5kZXggPT0gJGluZGV4ID8gdHJ1ZSA6IGZhbHNlXCI+e3sgKGFjdGlvbi50aXRsZSB8fCBhY3Rpb24ubmFtZSB8fCBhY3Rpb24pIHwgdHJhbnNsYXRlIH19PC9tZC1vcHRpb24+PC9tZC1zZWxlY3Q+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2hlYWRlci9TdGlja3lOYXZIZWFkZXIuaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIG5nLXNob3c9XCJzaG93SGVhZGVyXCIgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIj48ZGl2IGNsYXNzPVwiZmxleC1maXhlZCBwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlclwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIG5nLWNsaWNrPVwib25Vc2VyQ2xpY2soKVwiIGFyaWEtbGFiZWw9XCJjdXJyZW50IHVzZXJcIj48aW1nIHNyYz1cIlwiIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXItaW1hZ2VcIiBuZy1jbGFzcz1cImltYWdlQ3NzXCI+PC9tZC1idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLXRleHRcIj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXItcHJpXCIgbmctY2xpY2s9XCJvblVzZXJDbGljaygpXCI+e3sgdGl0bGUgfCB0cmFuc2xhdGUgfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXItc2VjXCI+e3sgc3VidGl0bGUgfCB0cmFuc2xhdGUgfX08L2Rpdj48L2Rpdj48L21kLXRvb2xiYXI+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnaWNvbi9OYXZJY29uLmh0bWwnLFxuICAgICc8bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b24gcGlwLW5hdi1pY29uXCIgbmctaWY9XCJjb25maWcudHlwZSAhPSBcXCdub25lXFwnXCIgbmctY2xhc3M9XCJjb25maWcuY2xhc3NcIiBuZy1jbGljaz1cIm9uTmF2SWNvbkNsaWNrKClcIiBhcmlhLWxhYmVsPVwibWVudVwiPjxtZC1pY29uIG5nLWlmPVwiY29uZmlnLnR5cGU9PVxcJ21lbnVcXCdcIiBtZC1zdmctaWNvbj1cImljb25zOm1lbnVcIj48L21kLWljb24+PGltZyBuZy1zcmM9XCJ7e2NvbmZpZy5pbWFnZVVybH19XCIgbmctaWY9XCJjb25maWcudHlwZT09XFwnaW1hZ2VcXCdcIiBoZWlnaHQ9XCIyNFwiIHdpZHRoPVwiMjRcIj48bWQtaWNvbiBuZy1pZj1cImNvbmZpZy50eXBlPT1cXCdiYWNrXFwnXCIgbWQtc3ZnLWljb249XCJpY29uczphcnJvdy1sZWZ0XCI+PC9tZC1pY29uPjxtZC1pY29uIG5nLWlmPVwiY29uZmlnLnR5cGU9PVxcJ2ljb25cXCdcIiBtZC1zdmctaWNvbj1cInt7Y29uZmlnLmljb259fVwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdsYW5ndWFnZS9MYW5ndWFnZVBpY2tlci5odG1sJyxcbiAgICAnPG1kLW1lbnUgbWQtcG9zaXRpb24tbW9kZT1cInRhcmdldC1yaWdodCB0YXJnZXRcIj48c3BhbiBjbGFzcz1cInBpcC1sYW5ndWFnZVwiIG5nLWNsaWNrPVwiJG1kT3Blbk1lbnUoKVwiIGFyaWEtbGFiZWw9XCJsYW5ndWFnZSBzZWxlY3Rpb25cIj57e3ZtLmxhbmd1YWdlIHwgdHJhbnNsYXRlfX08bWQtaWNvbiBtZC1zdmctaWNvbj1cImljb25zOnRyaWFuZ2xlLWRvd25cIj48L21kLWljb24+PC9zcGFuPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCIzXCI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQ9XCJsYW5ndWFnZSBpbiB2bS5sYW5ndWFnZXNcIj48bWQtYnV0dG9uIG5nLWNsaWNrPVwidm0ub25MYW5ndWFnZUNsaWNrKGxhbmcpXCI+e3tsYW5ndWFnZSB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21lbnUvU3RpY2t5TmF2TWVudS5odG1sJyxcbiAgICAnPG1kLWxpc3QgY2xhc3M9XCJzaWRlbmF2LWxpc3RcIj48bWQtbGlzdC1pdGVtIGNsYXNzPVwicGlwLWZvY3VzYWJsZSBuby1ib3JkZXIgcGlwLXN0aWNreS1uYXYtbWVudS1pdGVtIHBpcC1zdGlja3ktbmF2LWV4cGFuZGVkLWJ1dHRvblwiIG5nLWNsaWNrPVwib25FeHBhbmQoKVwiIG5nLWRpc2FibGVkPVwiIWlzQ29sbGFwc2VkXCIgbmctaWY9XCJleHBhbmRlZEJ1dHRvblwiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y2hldnJvbi1sZWZ0XCIgbmctaWY9XCJleHBhbmRlZFwiIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uXCI+PC9tZC1pY29uPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y2hldnJvbi1yaWdodFwiIG5nLWlmPVwiIWV4cGFuZGVkXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb25cIj48L21kLWljb24+PC9tZC1saXN0LWl0ZW0+PG1kLWRpdmlkZXIgbmctc2hvdz1cImV4cGFuZGVkQnV0dG9uXCI+PC9tZC1kaXZpZGVyPjxkaXYgY2xhc3M9XCJwaXAtc2VjdGlvblwiIG5nLXJlcGVhdD1cInNlY3Rpb24gaW4gc2VjdGlvbnNcIiBuZy1oaWRlPVwic2VjdGlvbi5hY2Nlc3MgJiYgIXNlY3Rpb24uYWNjZXNzKHNlY3Rpb24pXCI+PG1kLWRpdmlkZXIgbmctc2hvdz1cIiRpbmRleCA+IDAgJiYgIWlzU2VjdGlvbkVtcHR5KHNlY3Rpb24ubGlua3MpXCI+PC9tZC1kaXZpZGVyPjxtZC1zdWJoZWFkZXIgbmctc2hvdz1cInNlY3Rpb24udGl0bGVcIiBzdHlsZT1cImhlaWdodDogNDhweDtcIj48c3BhbiBuZy1pZj1cImV4cGFuZGVkXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LXRpdGxlIHNlY3Rpb24tdGl0bGVcIj57ezo6c2VjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9zcGFuPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwie3tzZWN0aW9uLmljb259fVwiIG5nLWlmPVwiIXNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZCAmJiBzZWN0aW9uLmljb25cIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBzZWN0aW9uLWljb25cIj48L21kLWljb24+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e3NlY3Rpb24uaWNvbn19XCIgbmctaWY9XCJzaWRlTmF2U3RhdGUuc2hvd0ljb25Ub29sdHlwZSAmJiAhZXhwYW5kZWQgJiYgc2VjdGlvbi5pY29uXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgbWQtZGlyZWN0aW9uPVwicmlnaHRcIj57ezo6c2VjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48bWQtaWNvbiBtZC1zdmctaWNvbj1cInt7ZGVmYXVsdEljb259fVwiIG5nLWlmPVwiIXNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZCAmJiAhc2VjdGlvbi5pY29uXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCI+PC9tZC1pY29uPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwie3tkZWZhdWx0SWNvbn19XCIgbmctaWY9XCJzaWRlTmF2U3RhdGUuc2hvd0ljb25Ub29sdHlwZSAmJiAhZXhwYW5kZWQgJiYgIXNlY3Rpb24uaWNvblwiIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uIHNlY3Rpb24taWNvblwiPjxtZC10b29sdGlwIG1kLXZpc2libGU9XCJzaG93VG9vbHRpcFwiIGNsYXNzPVwibWQtc2Vjb25kYXJ5XCI+e3s6OnNlY3Rpb24udGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtdG9vbHRpcD48L21kLWljb24+PC9tZC1zdWJoZWFkZXI+PG1kLWxpc3QtaXRlbSBjbGFzcz1cIm5vLWJvcmRlciBwaXAtc3RpY2t5LW5hdi1tZW51LWl0ZW1cIiBuZy1yZXBlYXQ9XCJsaW5rIGluIHNlY3Rpb24ubGlua3NcIiBuZy1jbGFzcz1cIntcXCdhY3RpdmVcXCc6IGlzQWN0aXZlKGxpbmspfVwiIG5nLWhpZGU9XCJsaW5rLmFjY2VzcyAmJiAhbGluay5hY2Nlc3MobGluaylcIj48bWQtYnV0dG9uIGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyIHBpcC1mb2N1c2FibGVcIiBuZy1jbGljaz1cImNsaWNrTGluaygkZXZlbnQsIGxpbmspXCI+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbi1ibG9ja1wiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwie3tsaW5rLmljb259fVwiIG5nLWlmPVwiIShzaWRlTmF2U3RhdGUuc2hvd0ljb25Ub29sdHlwZSAmJiAhZXhwYW5kZWQpXCIgbmctaGlkZT1cIiFsaW5rLmljb25cIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBmbGV4LWZpeGVkXCI+PC9tZC1pY29uPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwie3tsaW5rLmljb259fVwiIG5nLWhpZGU9XCIhbGluay5pY29uXCIgbmctaWY9XCJzaWRlTmF2U3RhdGUuc2hvd0ljb25Ub29sdHlwZSAmJiAhZXhwYW5kZWRcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBmbGV4LWZpeGVkXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgbWQtZGlyZWN0aW9uPVwicmlnaHRcIj57ezo6bGluay50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS10aXRsZVwiPnt7OjpsaW5rLnRpdGxlIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1iYWRnZSB7eyBsaW5rLmJhZGdlU3R5bGUgPyBsaW5rLmJhZGdlU3R5bGUgOiBcXCdjb2xvci1iYWRnZS1iZ1xcJyB9fSBmbGV4LWZpeGVkXCIgbmctaWY9XCJsaW5rLmNvdW50ICYmIGxpbmsuY291bnQgPCAxMDBcIj57e2xpbmsuY291bnR9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWJhZGdlIHt7IGxpbmsuYmFkZ2VTdHlsZSA/IGxpbmsuYmFkZ2VTdHlsZSA6IFxcJ2NvbG9yLWJhZGdlLWJnXFwnIH19IGZsZXgtZml4ZWRcIiBuZy1pZj1cImxpbmsuY291bnQgJiYgbGluay5jb3VudCA+IDk5XCI+ITwvZGl2PjwvbWQtYnV0dG9uPjwvbWQtbGlzdC1pdGVtPjwvZGl2PjwvbWQtbGlzdD4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdzZWFyY2gvU2VhcmNoQmFyLmh0bWwnLFxuICAgICc8ZGl2IGNsYXNzPVwibWQtdG9vbGJhci10b29scyBwaXAtc2VhcmNoLWNvbnRhaW5lclwiIG5nLWlmPVwidm0uZW5hYmxlZFwiPjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IHBpcC1zZWFyY2gtc2VsZWN0ZWRcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiBhcmlhLWxhYmVsPVwic3RhcnQgc2VhcmNoXCIgbmctY2xpY2s9XCJ2bS5vbkNsaWNrKClcIj48bWQtaWNvbiBtZC1zdmctaWNvbj1cImljb25zOnNlYXJjaFwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj48aW5wdXQgY2xhc3M9XCJwaXAtc2VhcmNoLXRleHQgZmxleFwiIHR5cGU9XCJzZWFyY2hcIiBuZy1tb2RlbD1cInZtLnNlYXJjaC50ZXh0XCIgbmcta2V5ZG93bj1cInZtLm9uS2V5RG93bigkZXZlbnQpXCI+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWljb24tYnV0dG9uXCIgYXJpYS1sYWJlbD1cImNsZWFyIHNlYXJjaFwiIG5nLWNsaWNrPVwidm0uY2xlYXIoKVwiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y3Jvc3MtY2lyY2xlXCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJtZC10b29sYmFyLXRvb2xzIGxheW91dC1yb3cgbGF5b3V0LWFsaWduLWVuZC1jZW50ZXIgZmxleC1maXhlZCBscDAgcnAwXCIgbmctaWY9XCIhdm0uZW5hYmxlZFwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJzdGFydCBzZWFyY2hcIiBuZy1jbGljaz1cInZtLmVuYWJsZSgpXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpzZWFyY2hcIj48L21kLWljb24+PC9tZC1idXR0b24+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgndGFicy9UYWJzLmh0bWwnLFxuICAgICc8bWQtdG9vbGJhciBjbGFzcz1cInBpcC1uYXYge3sgY2xhc3MgfX1cIiBuZy1jbGFzcz1cIntcXCdwaXAtdmlzaWJsZVxcJzogc2hvdygpLCBcXCdwaXAtc2hhZG93XFwnOiBzaG93U2hhZG93KCl9XCI+PG1kLXRhYnMgbmctaWY9XCJtZWRpYShcXCdndC14c1xcJylcIiBtZC1zZWxlY3RlZD1cInNlbGVjdGVkLmFjdGl2ZVRhYlwiIG5nLWNsYXNzPVwie1xcJ2Rpc2FibGVkXFwnOiBkaXNhYmxlZCgpfVwiIG1kLXN0cmV0Y2gtdGFicz1cInRydWVcIiBtZC1keW5hbWljLWhlaWdodD1cInRydWVcIj48bWQtdGFiIG5nLXJlcGVhdD1cInRhYiBpbiB0YWJzIHRyYWNrIGJ5ICRpbmRleFwiIG5nLWRpc2FibGVkPVwidGFiRGlzYWJsZWQoJGluZGV4KVwiIG1kLW9uLXNlbGVjdD1cIm9uU2VsZWN0KCRpbmRleClcIj48bWQtdGFiLWxhYmVsPnt7Ojp0YWIubmFtZUxvY2FsIH19PGRpdiBjbGFzcz1cInBpcC10YWJzLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctaWY9XCJ0YWIubmV3Q291bnRzID4gMCAmJiB0YWIubmV3Q291bnRzIDw9IDk5XCI+e3sgdGFiLm5ld0NvdW50cyB9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtdGFicy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLWlmPVwidGFiLm5ld0NvdW50cyA+IDk5XCI+ITwvZGl2PjwvbWQtdGFiLWxhYmVsPjwvbWQtdGFiPjwvbWQtdGFicz48ZGl2IGNsYXNzPVwibWQtc3ViaGVhZCBwaXAtdGFicy1jb250ZW50IGNvbG9yLXByaW1hcnktYmdcIiBuZy1pZj1cIm1lZGlhKFxcJ3hzXFwnKVwiPjxkaXYgY2xhc3M9XCJwaXAtZGl2aWRlciBwb3NpdGlvbi10b3AgbTBcIj48L2Rpdj48bWQtc2VsZWN0IG5nLW1vZGVsPVwic2VsZWN0ZWQuYWN0aXZlSW5kZXhcIiBuZy1kaXNhYmxlZD1cImRpc2FibGVkKClcIiBtZC1jb250YWluZXItY2xhc3M9XCJwaXAtZnVsbC13aWR0aC1kcm9wZG93blwiIGFyaWEtbGFiZWw9XCJTRUxFQ1RcIiBtZC1pbmstcmlwcGxlPVwiXCIgbWQtb24tY2xvc2U9XCJvblNlbGVjdChzZWxlY3RlZC5hY3RpdmVJbmRleClcIj48bWQtb3B0aW9uIG5nLXJlcGVhdD1cInRhYiBpbiB0YWJzIHRyYWNrIGJ5ICRpbmRleFwiIGNsYXNzPVwicGlwLXRhYi1vcHRpb25cIiB2YWx1ZT1cInt7IDo6JGluZGV4IH19XCI+e3sgOjp0YWIubmFtZUxvY2FsIH19PGRpdiBjbGFzcz1cInBpcC10YWJzLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctaWY9XCJ0YWIubmV3Q291bnRzID4gMCAmJiB0YWIubmV3Q291bnRzIDw9IDk5XCI+e3sgdGFiLm5ld0NvdW50cyB9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtdGFicy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLWlmPVwidGFiLm5ld0NvdW50cyA+IDk5XCI+ITwvZGl2PjwvbWQtb3B0aW9uPjwvbWQtc2VsZWN0PjwvZGl2PjwvbWQtdG9vbGJhcj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdzaWRlbmF2L1N0aWNreVNpZGVOYXYuaHRtbCcsXG4gICAgJzxtZC1zaWRlbmF2IGNsYXNzPVwibWQtc2lkZW5hdi1sZWZ0XCIgbWQtaXMtbG9ja2VkLW9wZW49XCJzaWRlbmF2U3RhdGUuaXNMb2NrZWRPcGVuXCIgbWQtY29tcG9uZW50LWlkPVwicGlwLXN0aWNreS1zaWRlbmF2XCIgcGlwLWZvY3VzZWQ9XCJcIiBuZy10cmFuc2NsdWRlPVwiXCI+PC9tZC1zaWRlbmF2PicpO1xufV0pO1xufSkoKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGlwLXdlYnVpLW5hdi1odG1sLm1pbi5qcy5tYXBcbiJdfQ==