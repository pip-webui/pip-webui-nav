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
    AppBarService.prototype.setShadow = function (breakpoints) {
        var _this = this;
        this._config.classes = _.reject(this._config.classes, function (c) { return c.startsWith('pip-shadow'); });
        if (breakpoints != null) {
            this._config.classes.push('pip-shadow');
            _.each(breakpoints, function (bp) {
                _this._config.classes.push('pip-shadow-' + bp);
            });
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
        this.setShadow(null);
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
        $scope.showTooltip = true;
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
  $templateCache.put('menu/StickyNavMenu.html',
    '<md-list class="sidenav-list"><md-list-item class="pip-focusable no-border pip-sticky-nav-menu-item pip-sticky-nav-expanded-button" ng-click="onExpand()" ng-disabled="!isCollapsed" ng-if="expandedButton"><md-icon md-svg-icon="icons:chevron-left" ng-if="expanded" class="pip-sticky-nav-menu-icon"><md-tooltip md-visible="showTooltip" ng-show="sideNavState.showIconTooltype && !expanded" md-direction="right">{{::\'Expand menu\' | translate}}</md-tooltip></md-icon><md-icon md-svg-icon="icons:chevron-right" ng-if="!expanded" class="pip-sticky-nav-menu-icon"><md-tooltip md-visible="showTooltip" ng-show="sideNavState.showIconTooltype && !expanded" md-direction="right">{{::\'Shrink menu\' | translate}}</md-tooltip></md-icon></md-list-item><md-divider ng-show="expandedButton"></md-divider><div class="pip-section" ng-repeat="section in sections" ng-hide="section.access && !section.access(section)"><md-divider ng-show="$index > 0 && !isSectionEmpty(section.links)"></md-divider><md-subheader ng-show="section.title" style="height: 48px;"><span ng-if="expanded" class="pip-sticky-nav-menu-title section-title">{{::section.title | translate}}</span><md-icon md-svg-icon="{{section.icon}}" ng-if="!expanded && section.icon" class="pip-sticky-nav-menu-icon section-icon"><md-tooltip md-visible="showTooltip" ng-show="sideNavState.showIconTooltype && !expanded" md-direction="right">{{::section.title | translate}}</md-tooltip></md-icon><md-icon md-svg-icon="{{defaultIcon}}" ng-if="!expanded && !section.icon" class="pip-sticky-nav-menu-icon section-icon"><md-tooltip md-visible="showTooltip" ng-show="sideNavState.showIconTooltype && !expanded" md-direction="right" class="md-secondary">{{::section.title | translate}}</md-tooltip></md-icon></md-subheader><md-list-item class="no-border pip-sticky-nav-menu-item" ng-repeat="link in section.links" ng-class="{\'active\': isActive(link)}" ng-hide="link.access && !link.access(link)"><md-button class="layout-row layout-align-start-center pip-focusable" ng-click="clickLink($event, link)"><div class="pip-sticky-nav-menu-icon-block"><md-icon md-svg-icon="{{link.icon}}" ng-hide="!link.icon" class="pip-sticky-nav-menu-icon flex-fixed"><md-tooltip md-visible="showTooltip" ng-show="sideNavState.showIconTooltype && !expanded" md-direction="right">{{::link.title | translate}}</md-tooltip></md-icon></div><div class="pip-sticky-nav-menu-title">{{::link.title | translate}}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count < 100">{{link.count}}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count > 99">!</div></md-button></md-list-item></div></md-list>');
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
    '<md-toolbar class="pip-nav {{ class }}" ng-class="{\'pip-visible\': show(), \'pip-shadow\': showShadow()}"><md-tabs ng-if="media(\'gt-xs\')" md-selected="selected.activeTab" ng-class="{\'disabled\': disabled()}" md-stretch-tabs="true" md-dynamic-height="true"><md-tab ng-repeat="tab in tabs track by $index" ng-disabled="tabDisabled($index)" md-on-select="onSelect($index)"><md-tab-label>{{::tab.nameLocal }}<div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">{{ tab.newCounts }}</div><div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div></md-tab-label></md-tab></md-tabs><div class="md-subhead pip-tabs-content color-primary-bg" ng-if="media(\'xs\')"><div class="pip-divider position-top m0"></div><md-select ng-model="selected.activeIndex" ng-disabled="disabled()" md-container-class="pip-full-width-dropdown" aria-label="SELECT" md-ink-ripple="" md-on-close="onSelect(selected.activeIndex)"><md-option ng-repeat="tab in tabs track by $index" class="pip-tab-option" value="{{ ::$index }}">{{ ::tab.nameLocal }}<div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 0 && tab.newCounts <= 99">{{ tab.newCounts }}</div><div class="pip-tabs-badge color-badge-bg" ng-if="tab.newCounts > 99">!</div></md-option></md-select></div></md-toolbar>');
}]);
})();



},{}]},{},[34,21])(34)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWN0aW9ucy9BY3Rpb25zU2VydmljZS50cyIsInNyYy9hY3Rpb25zL1ByaW1hcnlBY3Rpb25zRGlyZWN0aXZlLnRzIiwic3JjL2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9uc0RpcmVjdGl2ZS50cyIsInNyYy9hY3Rpb25zL2luZGV4LnRzIiwic3JjL2FwcGJhci9BcHBCYXJEaXJlY3RpdmUudHMiLCJzcmMvYXBwYmFyL0FwcEJhclBhcnREaXJlY3RpdmUudHMiLCJzcmMvYXBwYmFyL0FwcEJhclNlcnZpY2UudHMiLCJzcmMvYXBwYmFyL2luZGV4LnRzIiwic3JjL2JyZWFkY3J1bWIvQnJlYWRjcnVtYkRpcmVjdGl2ZS50cyIsInNyYy9icmVhZGNydW1iL0JyZWFkY3J1bWJTZXJ2aWNlLnRzIiwic3JjL2JyZWFkY3J1bWIvaW5kZXgudHMiLCJzcmMvY29tbW9uL05hdlNlcnZpY2UudHMiLCJzcmMvZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlci50cyIsInNyYy9kcm9wZG93bi9Ecm9wZG93bkRpcmVjdGl2ZS50cyIsInNyYy9oZWFkZXIvTmF2SGVhZGVyU2VydmljZS50cyIsInNyYy9oZWFkZXIvU3RpY2t5TmF2SGVhZGVyRGlyZWN0aXZlLnRzIiwic3JjL2hlYWRlci9pbmRleC50cyIsInNyYy9pY29uL05hdkljb25EaXJlY3RpdmUudHMiLCJzcmMvaWNvbi9OYXZJY29uU2VydmljZS50cyIsInNyYy9pY29uL2luZGV4LnRzIiwic3JjL2luZGV4LnRzIiwic3JjL2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyRGlyZWN0aXZlLnRzIiwic3JjL21lbnUvTmF2TWVudVNlcnZpY2UudHMiLCJzcmMvbWVudS9TdGlja3lOYXZNZW51RGlyZWN0aXZlLnRzIiwic3JjL21lbnUvaW5kZXgudHMiLCJzcmMvc2VhcmNoL1NlYXJjaEJhckRpcmVjdGl2ZS50cyIsInNyYy9zZWFyY2gvU2VhcmNoU2VydmljZS50cyIsInNyYy9zZWFyY2gvaW5kZXgudHMiLCJzcmMvc2lkZW5hdi9TaWRlTmF2UGFydERpcmVjdGl2ZS50cyIsInNyYy9zaWRlbmF2L1NpZGVOYXZTZXJ2aWNlLnRzIiwic3JjL3NpZGVuYXYvU3RpY2t5U2lkZU5hdkRpcmVjdGl2ZS50cyIsInNyYy9zaWRlbmF2L2luZGV4LnRzIiwic3JjL3RhYnMvVGFic0RpcmVjdGl2ZS50cyIsInRlbXAvcGlwLXdlYnVpLW5hdi1odG1sLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBRUYsUUFBQSxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUVyRDtJQUFBO0lBMkJBLENBQUM7SUFBRCx1QkFBQztBQUFELENBM0JBLEFBMkJDLElBQUE7QUEzQlksNENBQWdCO0FBNkI3QjtJQUFnQyw4QkFBZ0I7SUFBaEQ7O0lBRUEsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FGQSxBQUVDLENBRitCLGdCQUFnQixHQUUvQztBQUZZLGdDQUFVO0FBSXZCO0lBQUE7UUFFVyx5QkFBb0IsR0FBaUIsRUFBRSxDQUFDO1FBRXhDLHdCQUFtQixHQUFpQixFQUFFLENBQUM7UUFHdkMsMkJBQXNCLEdBQWlCLEVBQUUsQ0FBQztRQUUxQywwQkFBcUIsR0FBZ0IsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFBRCxvQkFBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBVlksc0NBQWE7QUFtQzFCO0lBSUksd0JBQ0ksTUFBcUIsRUFDckIsVUFBZ0M7UUFFaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELHNCQUFXLGtDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxnREFBb0I7YUFBL0I7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9B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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IEFjdGlvbnNDaGFuZ2VkRXZlbnQgPSAncGlwQWN0aW9uc0NoYW5nZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpbXBsZUFjdGlvbkl0ZW0ge1xyXG4gICAgLy8gTmFtZSB0byByZWZlciB0byB0aGUgaXRlbVxyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIC8vIExpbmsgdmlzaWJsZSB0aXRsZVxyXG4gICAgcHVibGljIHRpdGxlPzogc3RyaW5nO1xyXG4gICAgLy8gU2hvdyBkaXZpZGVyIGluc3RlYWQgb2YgdGl0bGVcclxuICAgIHB1YmxpYyBkaXZpZGVyPzogYm9vbGVhbjtcclxuICAgIC8vIEljb24gbmFtZSBmcm9tICRpY29uUHJvdmlkZXJcclxuICAgIHB1YmxpYyBpY29uPzogc3RyaW5nO1xyXG4gICAgLy8gQ291bnRlciBiYWRnZVxyXG4gICAgcHVibGljIGNvdW50PzogbnVtYmVyO1xyXG4gICAgLy8gQWNjZXNzIGZ1bmN0aW9uXHJcbiAgICBwdWJsaWMgYWNjZXNzPzogKGFjdGlvbjogU2ltcGxlQWN0aW9uSXRlbSkgPT4gYm9vbGVhbjtcclxuICAgIC8vIFNob3cgb24gc3BlY2lmaWVkIGJyZWFrcG9pbnRzXHJcbiAgICBwdWJsaWMgYnJlYWtwb2ludHM/OiBzdHJpbmdbXTtcclxuICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcbiAgICBwdWJsaWMgaHJlZj86IHN0cmluZztcclxuICAgIC8vICRsb2NhdGlvbi51cmxcclxuICAgIHB1YmxpYyB1cmw/OiBzdHJpbmc7XHJcbiAgICAvLyAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zKVxyXG4gICAgcHVibGljIHN0YXRlPzogc3RyaW5nO1xyXG4gICAgLy8gUGFyYW1ldGVycyBmb3IgJHN0YXRlLmdvKHN0YXRlLCBzdGF0ZVBhcmFtcylcclxuICAgIHB1YmxpYyBzdGF0ZVBhcmFtcz86IGFueTtcclxuICAgIC8vICRyb290U2NvcGUuYnJvYWRjYXN0KGV2ZW50KVxyXG4gICAgcHVibGljIGV2ZW50Pzogc3RyaW5nO1xyXG4gICAgLy8gQ2xpY2sgY2FsbGJhY2tcclxuICAgIHB1YmxpYyBjbGljaz86IChhY3Rpb246IFNpbXBsZUFjdGlvbkl0ZW0pID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25JdGVtIGV4dGVuZHMgU2ltcGxlQWN0aW9uSXRlbSB7XHJcbiAgICBwdWJsaWMgc3ViQWN0aW9uczogU2ltcGxlQWN0aW9uSXRlbVtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uc0NvbmZpZyB7XHJcbiAgICAvLyBQcmltYXJ5IGdsb2JhbCBhY3Rpb25zIHZpc2libGUgb24gdGhlIHNjcmVlblxyXG4gICAgcHVibGljIHByaW1hcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW10gPSBbXTtcclxuICAgIC8vIFByaW1hcnkgbG9jYWwgYWN0aW9ucyB2aXNpYmxlIG9uIHRoZSBzY3JlZW5cclxuICAgIHB1YmxpYyBwcmltYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW10gPSBbXTtcclxuXHJcbiAgICAvLyBTZWNvbmRhcnkgZ2xvYmFsIGFjdGlvbnMgYXZhaWxhYmxlIGluIHBvcHVwXHJcbiAgICBwdWJsaWMgc2Vjb25kYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdID0gW107XHJcbiAgICAvLyBTZWNvbmRhcnkgbG9jYWwgYWN0aW9ucyBhdmFpbGFibGUgaW4gcG9wdXBcclxuICAgIHB1YmxpYyBzZWNvbmRhcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXT0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbnNTZXJ2aWNlIHtcclxuICAgIHJlYWRvbmx5IGNvbmZpZzogQWN0aW9uc0NvbmZpZztcclxuXHJcbiAgICBwcmltYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgcHJpbWFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107ICAgIFxyXG5cclxuICAgIHNob3cocHJpbWFyeUFjdGlvbnM/OiBBY3Rpb25JdGVtW10sIHNlY29uZGFyeUFjdGlvbnM/OiBBY3Rpb25JdGVtW10pOiB2b2lkO1xyXG4gICAgaGlkZSgpOiB2b2lkO1xyXG4gICAgdXBkYXRlQ291bnQobGluazogc3RyaW5nLCBjb3VudDogbnVtYmVyKTogdm9pZDsgXHJcbiAgICBjbGVhckNvdW50cygpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25zUHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGNvbmZpZzogQWN0aW9uc0NvbmZpZztcclxuICAgIFxyXG4gICAgcHJpbWFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHByaW1hcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHNlY29uZGFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHNlY29uZGFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdOyAgICBcclxufVxyXG5cclxuY2xhc3MgQWN0aW9uc1NlcnZpY2UgaW1wbGVtZW50cyBJQWN0aW9uc1NlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBY3Rpb25zQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBBY3Rpb25zQ29uZmlnLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBY3Rpb25zQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByaW1hcnlMb2NhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY29uZGFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwcmltYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSwgc2Vjb25kYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gcHJpbWFyeUFjdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9IHNlY29uZGFyeUFjdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDb3VudChhY3Rpb246IHN0cmluZywgY291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChhY3Rpb24gPT0gbnVsbCB8fCAhXy5pc051bWJlcihjb3VudCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGEubmFtZSA9PSBhY3Rpb24pXHJcbiAgICAgICAgICAgICAgICBhLmNvdW50ID0gY291bnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYS5uYW1lID09IGFjdGlvbilcclxuICAgICAgICAgICAgICAgIGEuY291bnQgPSBjb3VudDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJDb3VudHMoKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgYS5jb3VudCA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBhLmNvdW50ID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDaGFuZ2VFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoQWN0aW9uc0NoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQWN0aW9uc1Byb3ZpZGVyIGltcGxlbWVudHMgSUFjdGlvbnNQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEFjdGlvbnNDb25maWcgPSBuZXcgQWN0aW9uc0NvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWN0aW9uc1NlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogQWN0aW9uc0NvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogQWN0aW9uc0NvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBBY3Rpb25zQ29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwcmltYXJ5R2xvYmFsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucHJpbWFyeUdsb2JhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwcmltYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHByaW1hcnlMb2NhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwcmltYXJ5TG9jYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWNvbmRhcnlMb2NhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IEFjdGlvbnNTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEFjdGlvbnMnKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBBY3Rpb25zJywgQWN0aW9uc1Byb3ZpZGVyKTtcclxuXHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gUHJpbWFyeUFjdGlvbnNDb250cm9sbGVyKFxyXG4gICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24sICRpbmplY3RvciwgcGlwQWN0aW9ucykge1xyXG5cclxuICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1wcmltYXJ5LWFjdGlvbnMnKTtcclxuXHJcbiAgICBpZiAoJHNjb3BlLmxvY2FsQWN0aW9ucykgXHJcbiAgICAgICAgcGlwQWN0aW9ucy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gJHNjb3BlLmxvY2FsQWN0aW9ucztcclxuXHJcbiAgICBpZiAoJHNjb3BlLmdsb2JhbEFjdGlvbnMpXHJcbiAgICAgICAgcGlwQWN0aW9ucy5wcmltYXJ5R2xvYmFsQWN0aW9ucyA9ICRzY29wZS5nbG9iYWxBY3Rpb25zO1xyXG5cclxuICAgICRzY29wZS5jb25maWcgPSBwaXBBY3Rpb25zLmNvbmZpZztcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbigncGlwQWN0aW9uc0NoYW5nZWQnLCBvbkFjdGlvbnNDaGFuZ2VkKTtcclxuXHJcbiAgICAkc2NvcGUuaXNIaWRkZW4gPSBpc0hpZGRlbjtcclxuICAgICRzY29wZS5hY3Rpb25Db3VudCA9IGFjdGlvbkNvdW50O1xyXG4gICAgJHNjb3BlLmNsaWNrQWN0aW9uID0gY2xpY2tBY3Rpb247XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBmdW5jdGlvbiBvbkFjdGlvbnNDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAkc2NvcGUuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzSGlkZGVuKGFjdGlvbikge1xyXG4gICAgICAgIC8vIFRvZG86IENoZWNrIGJyZWFrcG9pbnRzIGhlcmVcclxuICAgICAgICByZXR1cm4gYWN0aW9uLmFjY2VzcyAmJiAhYWN0aW9uLmFjY2VzcyhhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGlvbkNvdW50KGFjdGlvbikge1xyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPT09IG51bGwgfHwgYWN0aW9uLmNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uLmNvdW50ID4gOTkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICchJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhY3Rpb24uY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY0FjdGlvbnMoYWN0aW9ucykge1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIF8uZWFjaChhY3Rpb25zLCBmdW5jdGlvbiAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNIaWRkZW4oYWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5QWN0aW9uc1Zpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwIHx8XHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5RGl2aWRlclZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwICYmXHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tBY3Rpb24oYWN0aW9uLCAkbWRPcGVuTWVudSkge1xyXG4gICAgICAgIGlmICghYWN0aW9uIHx8IGFjdGlvbi5kaXZpZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xvc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm9yaWdpbmF0b3JFdiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLm1lbnUpIHtcclxuICAgICAgICAgICAgJG1kT3Blbk1lbnUoJHNjb3BlLm9yaWdpbmF0b3JFdik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xpY2spIHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uaHJlZikge1xyXG4gICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhY3Rpb24uaHJlZjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi51cmwpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnVybChhY3Rpb24udXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5zdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoJGluamVjdG9yLmhhcygnJHN0YXRlJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhhY3Rpb24uc3RhdGUsIGFjdGlvbi5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoYWN0aW9uLmV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgcmFpc2Ugbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwQWN0aW9uQ2xpY2tlZCcsIGFjdGlvbi5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcHJpbWFyeUFjdGlvbnNEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbG9jYWxBY3Rpb25zOiAnPXBpcExvY2FsQWN0aW9ucycsXHJcbiAgICAgICAgICAgIGdsb2JhbEFjdGlvbnM6ICc9cGlwR2xvYmFsQWN0aW9ucydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYWN0aW9ucy9QcmltYXJ5QWN0aW9ucy5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBQcmltYXJ5QWN0aW9uc0NvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBY3Rpb25zJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcFByaW1hcnlBY3Rpb25zJywgcHJpbWFyeUFjdGlvbnNEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmZ1bmN0aW9uIFNlY29uZGFyeUFjdGlvbnNDb250cm9sbGVyKFxyXG4gICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24sICRpbmplY3RvciwgcGlwQWN0aW9ucykge1xyXG5cclxuICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zZWNvbmRhcnktYWN0aW9ucycpO1xyXG5cclxuICAgIGlmICgkc2NvcGUubG9jYWxBY3Rpb25zKSBcclxuICAgICAgICBwaXBBY3Rpb25zLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9ICRzY29wZS5sb2NhbEFjdGlvbnM7XHJcblxyXG4gICAgaWYgKCRzY29wZS5nbG9iYWxBY3Rpb25zKSBcclxuICAgICAgICBwaXBBY3Rpb25zLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSAkc2NvcGUuZ2xvYmFsQWN0aW9ucztcclxuXHJcbiAgICAkc2NvcGUuY29uZmlnID0gcGlwQWN0aW9ucy5jb25maWc7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJ3BpcEFjdGlvbnNDaGFuZ2VkJywgb25BY3Rpb25zQ2hhbmdlZCk7XHJcblxyXG4gICAgJHNjb3BlLmlzSGlkZGVuID0gaXNIaWRkZW47XHJcbiAgICAkc2NvcGUuYWN0aW9uQ291bnQgPSBhY3Rpb25Db3VudDtcclxuICAgICRzY29wZS5zZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSA9IHNlY29uZGFyeUFjdGlvbnNWaXNpYmxlO1xyXG4gICAgJHNjb3BlLnNlY29uZGFyeURpdmlkZXJWaXNpYmxlID0gc2Vjb25kYXJ5RGl2aWRlclZpc2libGU7XHJcblxyXG4gICAgJHNjb3BlLmNsaWNrQWN0aW9uID0gY2xpY2tBY3Rpb247XHJcblxyXG4gICAgJHNjb3BlLm9wZW5NZW51ID0gb3Blbk1lbnU7XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1lbnUoJG1kT3Blbk1lbnUsIGV2KSB7XHJcbiAgICAgICAgJHNjb3BlLm9yaWdpbmF0b3JFdiA9IGV2O1xyXG4gICAgICAgICRtZE9wZW5NZW51KGV2KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvbkFjdGlvbnNDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAkc2NvcGUuY29uZmlnID0gY29uZmlnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0hpZGRlbihhY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gYWN0aW9uLmFjY2VzcyAmJiAhYWN0aW9uLmFjY2VzcyhhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGlvbkNvdW50KGFjdGlvbikge1xyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPT09IG51bGwgfHwgYWN0aW9uLmNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uLmNvdW50ID4gOTkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICchJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhY3Rpb24uY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY0FjdGlvbnMoYWN0aW9ucykge1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIF8uZWFjaChhY3Rpb25zLCBmdW5jdGlvbiAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNIaWRkZW4oYWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5QWN0aW9uc1Zpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwIHx8XHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5RGl2aWRlclZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwICYmXHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tBY3Rpb24oYWN0aW9uLCAkbWRPcGVuTWVudSkge1xyXG4gICAgICAgIGlmICghYWN0aW9uIHx8IGFjdGlvbi5kaXZpZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xvc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm9yaWdpbmF0b3JFdiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLm1lbnUpIHtcclxuICAgICAgICAgICAgJG1kT3Blbk1lbnUoJHNjb3BlLm9yaWdpbmF0b3JFdik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xpY2spIHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uaHJlZikge1xyXG4gICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhY3Rpb24uaHJlZjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi51cmwpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnVybChhY3Rpb24udXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5zdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoJGluamVjdG9yLmhhcygnJHN0YXRlJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhhY3Rpb24uc3RhdGUsIGFjdGlvbi5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoYWN0aW9uLmV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgcmFpc2Ugbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwQWN0aW9uQ2xpY2tlZCcsIGFjdGlvbi5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWNvbmRhcnlBY3Rpb25zRGlyZWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGxvY2FsQWN0aW9uczogJz1waXBMb2NhbEFjdGlvbnMnLFxyXG4gICAgICAgICAgICBnbG9iYWxBY3Rpb25zOiAnPXBpcEdsb2JhbEFjdGlvbnMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9ucy5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBTZWNvbmRhcnlBY3Rpb25zQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQWN0aW9ucycpXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBTZWNvbmRhcnlBY3Rpb25zJywgc2Vjb25kYXJ5QWN0aW9uc0RpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBBY3Rpb25zJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UZW1wbGF0ZXMnLCAndWkucm91dGVyJ10pO1xyXG5cclxuaW1wb3J0ICcuL0FjdGlvbnNTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1ByaW1hcnlBY3Rpb25zRGlyZWN0aXZlJztcclxuaW1wb3J0ICcuL1NlY29uZGFyeUFjdGlvbnNEaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9BY3Rpb25zU2VydmljZSc7Iiwi77u/J3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5mdW5jdGlvbiBBcHBCYXJEaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRyb290U2NvcGUsIHBpcEFwcEJhcikge1xyXG4gICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1hcHBiYXInKTtcclxuICAgICRlbGVtZW50LmFkZENsYXNzKCdjb2xvci1wcmltYXJ5LWJnJyk7XHJcbiAgICBcclxuICAgIC8vJHNjb3BlLiRlbWl0KCdwaXBSZXNpemVXaW5kb3cnKTtcclxuXHJcbiAgICAkc2NvcGUuY29uZmlnID0gcGlwQXBwQmFyLmNvbmZpZztcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbigncGlwQXBwQmFyQ2hhbmdlZCcsIG9uQXBwQmFyQ2hhbmdlZCk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25BcHBCYXJDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAkc2NvcGUuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBiYXJEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcclxuICAgICAgICBzY29wZTogdHJ1ZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcGJhci9BcHBCYXIuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogQXBwQmFyRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQXBwQmFyJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcEFwcGJhcicsIGFwcGJhckRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gQXBwQmFyUGFydERpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCBwaXBBcHBCYXIpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICB2YXIgcGFydE5hbWUgPSAnJyArICRhdHRycy5waXBBcHBiYXJQYXJ0O1xyXG4gICAgdmFyIHBhcnRWYWx1ZSA9IG51bGw7XHJcblxyXG4gICAgLy8gQnJlYWsgcGFydCBhcGFydFxyXG4gICAgdmFyIHBvcyA9IHBhcnROYW1lLmluZGV4T2YoJzonKTtcclxuICAgIGlmIChwb3MgPiAwKSB7XHJcbiAgICAgICAgcGFydFZhbHVlID0gcGFydE5hbWUuc3Vic3RyKHBvcyArIDEpO1xyXG4gICAgICAgIHBhcnROYW1lID0gcGFydE5hbWUuc3Vic3RyKDAsIHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25BcHBCYXJDaGFuZ2VkKG51bGwsIHBpcEFwcEJhci5jb25maWcpO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCdwaXBBcHBCYXJDaGFuZ2VkJywgb25BcHBCYXJDaGFuZ2VkKTtcclxuXHJcbiAgICBmdW5jdGlvbiBvbkFwcEJhckNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgIHZhciBwYXJ0cyA9IGNvbmZpZy5wYXJ0cyB8fCB7fTtcclxuICAgICAgICB2YXIgY3VycmVudFBhcnRWYWx1ZSA9IHBhcnRzW3BhcnROYW1lXTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHZpc2libGUgdmFyaWFibGUgdG8gc3dpdGNoIG5nSWZcclxuICAgICAgICB2YXIgdmlzaWJsZSA9ICEhKHBhcnRWYWx1ZSA/IGN1cnJlbnRQYXJ0VmFsdWUgPT0gcGFydFZhbHVlIDogY3VycmVudFBhcnRWYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmICh2aXNpYmxlICE9ICRzY29wZS52aXNpYmxlKVxyXG4gICAgICAgICAgICAkc2NvcGUudmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vLyBFeGFtcGxlIGlzIHRha2VuIGZyb20gaGVyZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMDMyNTQ4MC9hbmd1bGFyanMtd2hhdHMtdGhlLWJlc3QtcHJhY3RpY2UtdG8tYWRkLW5naWYtdG8tYS1kaXJlY3RpdmUtcHJvZ3JhbW1hdGljYWxseVxyXG5mdW5jdGlvbiBhcHBiYXJQYXJ0RGlyZWN0aXZlKG5nSWZEaXJlY3RpdmUpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICB2YXIgbmdJZiA9IG5nSWZEaXJlY3RpdmVbMF07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0cmFuc2NsdWRlOiBuZ0lmLnRyYW5zY2x1ZGUsXHJcbiAgICAgICAgcHJpb3JpdHk6IG5nSWYucHJpb3JpdHksXHJcbiAgICAgICAgdGVybWluYWw6IG5nSWYudGVybWluYWwsXHJcbiAgICAgICAgcmVzdHJpY3Q6IG5nSWYucmVzdHJpY3QsXHJcbiAgICAgICAgc2NvcGU6IHRydWUsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gbGlua0Z1bmN0aW9uKCRzY29wZTogYW55LCAkZWxlbWVudCwgJGF0dHJzOiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gVmlzdWFsaXplIGJhc2VkIG9uIHZpc2libGUgdmFyaWFibGUgaW4gc2NvcGVcclxuICAgICAgICAgICAgJGF0dHJzLm5nSWYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnZpc2libGU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG5nSWYubGluay5hcHBseShuZ0lmLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogQXBwQmFyUGFydERpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBBcHBCYXInKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwQXBwYmFyUGFydCcsIGFwcGJhclBhcnREaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IEFwcEJhckNoYW5nZWRFdmVudCA9ICdwaXBBcHBCYXJDaGFuZ2VkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBCYXJDb25maWcge1xyXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxufSBcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFwcEJhclNlcnZpY2Uge1xyXG4gICAgcmVhZG9ubHkgY29uZmlnOiBBcHBCYXJDb25maWc7XHJcbiAgICByZWFkb25seSBjbGFzc2VzOiBzdHJpbmdbXTtcclxuICAgIHBhcnRzOiBhbnk7XHJcblxyXG4gICAgc2hvdyhwYXJ0cz86IGFueSwgY2xhc3Nlcz86IHN0cmluZ1tdLCBzaGFkb3dCcmVha3BvaW50cz86IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIGhpZGUoKTogdm9pZDtcclxuIFxyXG4gICAgYWRkU2hhZG93KC4uLmJyZWFrcG9pbnRzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVTaGFkb3coKTogdm9pZDtcclxuIFxyXG4gICAgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG4gXHJcbiAgICBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFwcEJhclByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBjb25maWc6IEFwcEJhckNvbmZpZztcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxuXHJcbiAgICBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcblxyXG4gICAgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBBcHBCYXJTZXJ2aWNlIGltcGxlbWVudHMgSUFwcEJhclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBcHBCYXJDb25maWc7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IEFwcEJhckNvbmZpZywgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBcHBCYXJDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJ0cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gdmFsdWUgfHwge307XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwYXJ0cz86IGFueSwgY2xhc3Nlcz86IHN0cmluZ1tdLCBzaGFkb3dCcmVha3BvaW50cz86IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHBhcnRzIHx8IHRoaXMuX2NvbmZpZy5wYXJ0cyB8fCB7fTtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IGNsYXNzZXMgfHwgdGhpcy5fY29uZmlnLmNsYXNzZXMgfHwgW107XHJcbiAgICAgICAgaWYgKHNoYWRvd0JyZWFrcG9pbnRzKSB0aGlzLnNldFNoYWRvdyhzaGFkb3dCcmVha3BvaW50cyk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTaGFkb3coYnJlYWtwb2ludHM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBfLnJlamVjdCh0aGlzLl9jb25maWcuY2xhc3NlcywgKGMpID0+IGMuc3RhcnRzV2l0aCgncGlwLXNoYWRvdycpKTtcclxuXHJcbiAgICAgICAgaWYgKGJyZWFrcG9pbnRzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaCgncGlwLXNoYWRvdycpO1xyXG4gICAgICAgICAgICBfLmVhY2goYnJlYWtwb2ludHMsIChicCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaCgncGlwLXNoYWRvdy0nICsgYnApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFNoYWRvdyguLi5icmVha3BvaW50czogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFNoYWRvdyhicmVha3BvaW50cyk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2hhZG93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0U2hhZG93KG51bGwpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzW3BhcnRdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDb25maWdFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdChBcHBCYXJDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEFwcEJhclByb3ZpZGVyIGltcGxlbWVudHMgSUFwcEJhclByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQXBwQmFyQ29uZmlnID0ge1xyXG4gICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgcGFydHM6IHt9LFxyXG4gICAgICAgIGNsYXNzZXM6IFtdXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQXBwQmFyU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBcHBCYXJDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb25maWcodmFsdWU6IEFwcEJhckNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBBcHBCYXJDb25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcnRzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhcnRzKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHMgPSB2YWx1ZSB8fCB7fTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGFzc2VzKHZhbHVlOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0c1twYXJ0XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IEFwcEJhclNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9ICAgICBcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQXBwQmFyJylcclxuICAgIC5wcm92aWRlcigncGlwQXBwQmFyJywgQXBwQmFyUHJvdmlkZXIpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBcHBCYXInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9BcHBCYXJTZXJ2aWNlJztcclxuaW1wb3J0ICcuL0FwcEJhckRpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9BcHBCYXJQYXJ0RGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vQXBwQmFyU2VydmljZSc7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IFNpbXBsZUFjdGlvbkl0ZW0gfSBmcm9tICcuLi9hY3Rpb25zL0FjdGlvbnNTZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYkl0ZW0gfSBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYkNvbmZpZyB9IGZyb20gJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQnJlYWRjcnVtYlNlcnZpY2UgfSBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYkNoYW5nZWRFdmVudCB9IGZyb20gJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCcmVhZGNydW1iQmFja0V2ZW50IH0gZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IE9wZW5TZWFyY2hFdmVudCB9IGZyb20gJy4uL3NlYXJjaC9TZWFyY2hTZXJ2aWNlJ1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5jbGFzcyBCcmVhZGNydW1iQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfd2luZG93OiBuZy5JV2luZG93U2VydmljZTtcclxuICAgIHByaXZhdGUgX2xvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZTtcclxuICAgIHByaXZhdGUgb3JpZ2luYXRvckV2OiBFdmVudDtcclxuICAgIFxyXG4gICAgcHVibGljIGNvbmZpZzogQnJlYWRjcnVtYkNvbmZpZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueSwgXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2UsXHJcbiAgICAgICAgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlLFxyXG4gICAgICAgICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuICAgICAgICAkaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZSxcclxuICAgICAgICBwaXBCcmVhZGNydW1iOiBJQnJlYWRjcnVtYlNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgICAgICB0aGlzLl93aW5kb3cgPSAkd2luZG93O1xyXG4gICAgICAgIHRoaXMuX2xvY2F0aW9uID0gJGxvY2F0aW9uO1xyXG4gICAgICAgIHRoaXMuX2luamVjdG9yID0gJGluamVjdG9yO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLWJyZWFkY3J1bWInKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBwaXBCcmVhZGNydW1iLmNvbmZpZztcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQnJlYWRjcnVtYkNoYW5nZWRFdmVudCwgKGV2ZW50LCBjb25maWcpID0+IHsgdGhpcy5vbkJyZWFkY3J1bWJDaGFuZ2VkKGV2ZW50LCBjb25maWcpOyB9KTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbihCcmVhZGNydW1iQmFja0V2ZW50LCAoKSA9PiB7IHRoaXMub25CcmVhZGNydW1iQmFjaygpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnJlYWRjcnVtYkNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CcmVhZGNydW1iQmFjaygpIHtcclxuICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLmNvbmZpZy5pdGVtcztcclxuICAgICAgICAvLyBHbyB0byB0aGUgbGFzdCBicmVhZGNydW1iIGl0ZW1cclxuICAgICAgICBpZiAoXy5pc0FycmF5KGl0ZW1zKSAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIGxldCBiYWNrQ2FsbGJhY2sgPSBpdGVtLmNsaWNrO1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGJhY2tDYWxsYmFjaykpIFxyXG4gICAgICAgICAgICAgICAgYmFja0NhbGxiYWNrKGl0ZW0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX3dpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGljayhpdGVtOiBCcmVhZGNydW1iSXRlbSkge1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlbS5jbGljaykpXHJcbiAgICAgICAgICAgIGl0ZW0uY2xpY2soaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5TZWFyY2goKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoT3BlblNlYXJjaEV2ZW50KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFjdGlvbnNWaXNpYmxlKGl0ZW06IEJyZWFkY3J1bWJJdGVtKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIHJldHVybiBhbmd1bGFyLmlzQXJyYXkoaXRlbS5zdWJBY3Rpb25zKSAmJiBpdGVtLnN1YkFjdGlvbnMubGVuZ3RoID4gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25PcGVuTWVudSgkbWRPcGVuTWVudSwgZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hdG9yRXYgPSBldmVudDtcclxuICAgICAgICAkbWRPcGVuTWVudSh0aGlzLm9yaWdpbmF0b3JFdik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU3ViQWN0aW9uQ2xpY2soYWN0aW9uOiBTaW1wbGVBY3Rpb25JdGVtKTogdm9pZCB7IFxyXG4gICAgICAgIGlmICghYWN0aW9uIHx8IGFjdGlvbi5kaXZpZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xpY2spIHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsaWNrKGFjdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uaHJlZikge1xyXG4gICAgICAgICAgICB0aGlzLl93aW5kb3cubG9jYXRpb24uaHJlZiA9IGFjdGlvbi5ocmVmO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnVybCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbi51cmwoYWN0aW9uLnVybCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2luamVjdG9yLmhhcygnJHN0YXRlJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkc3RhdGUgPSB0aGlzLl9pbmplY3Rvci5nZXQoJyRzdGF0ZScpIGFzIG5nLnVpLklTdGF0ZVNlcnZpY2VcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhhY3Rpb24uc3RhdGUsIGFjdGlvbi5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdChhY3Rpb24uZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLm9yaWdpbmF0b3JFdiA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHJhaXNlIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdCgncGlwQWN0aW9uQ2xpY2tlZCcsIGFjdGlvbi5uYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5vcmlnaW5hdG9yRXYgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGJyZWFkY3J1bWJEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYnJlYWRjcnVtYi9CcmVhZGNydW1iLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IEJyZWFkY3J1bWJDb250cm9sbGVyLFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBCcmVhZGNydW1iJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcEJyZWFkY3J1bWInLCBicmVhZGNydW1iRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlQWN0aW9uSXRlbSB9IGZyb20gJy4uL2FjdGlvbnMvQWN0aW9uc1NlcnZpY2UnO1xyXG5leHBvcnQgbGV0IEJyZWFkY3J1bWJDaGFuZ2VkRXZlbnQgPSBcInBpcEJyZWFkY3J1bWJDaGFuZ2VkXCI7XHJcbmV4cG9ydCBsZXQgQnJlYWRjcnVtYkJhY2tFdmVudCA9IFwicGlwQnJlYWRjcnVtYkJhY2tcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iSXRlbSB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgY2xpY2s/OiAoaXRlbTogQnJlYWRjcnVtYkl0ZW0pID0+IHZvaWQ7ICAgXHJcbiAgICBzdWJBY3Rpb25zPzogU2ltcGxlQWN0aW9uSXRlbVtdOyBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJDb25maWcge1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgaXRlbXM6IEJyZWFkY3J1bWJJdGVtW107XHJcbiAgICBjcml0ZXJpYTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCcmVhZGNydW1iU2VydmljZSB7XHJcbiAgICBjb25maWc6IEJyZWFkY3J1bWJDb25maWc7XHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbiAgICBpdGVtczogQnJlYWRjcnVtYkl0ZW1bXTtcclxuICAgIGNyaXRlcmlhOiBzdHJpbmc7XHJcblxyXG4gICAgc2hvd1RleHQodGV4dDogc3RyaW5nLCBjcml0ZXJpYT86IHN0cmluZyk7XHJcbiAgICBzaG93SXRlbXMoaXRlbXM6IEJyZWFkY3J1bWJJdGVtW10sIGNyaXRlcmlhPzogc3RyaW5nKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQnJlYWRjcnVtYlByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbn1cclxuXHJcblxyXG5jbGFzcyBCcmVhZGNydW1iU2VydmljZSBpbXBsZW1lbnRzIElCcmVhZGNydW1iU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEJyZWFkY3J1bWJDb25maWc7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25maWc6IEJyZWFkY3J1bWJDb25maWcsXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0ZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuaXRlbXMgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXRlbXMoKTogQnJlYWRjcnVtYkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5pdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGl0ZW1zKHZhbHVlOiBCcmVhZGNydW1iSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pdGVtcyA9IHZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY3JpdGVyaWEoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNyaXRlcmlhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY3JpdGVyaWEodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dUZXh0KHRleHQ6IHN0cmluZywgY3JpdGVyaWE/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLml0ZW1zID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSBjcml0ZXJpYTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93SXRlbXMoaXRlbXM6IEJyZWFkY3J1bWJJdGVtW10sIGNyaXRlcmlhPzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLml0ZW1zID0gaXRlbXMgfHwgW107XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IGNyaXRlcmlhO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRDb25maWdFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdChCcmVhZGNydW1iQ2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgQnJlYWRjcnVtYlByb3ZpZGVyIGltcGxlbWVudHMgSUJyZWFkY3J1bWJQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEJyZWFkY3J1bWJDb25maWcgPSB7IFxyXG4gICAgICAgIHRleHQ6IG51bGwsXHJcbiAgICAgICAgaXRlbXM6IG51bGwsXHJcbiAgICAgICAgY3JpdGVyaWE6IG51bGxcclxuICAgIH07XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBCcmVhZGNydW1iU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0ZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGV4dCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKTogYW55IHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgQnJlYWRjcnVtYlNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwQnJlYWRjcnVtYicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcEJyZWFkY3J1bWInLCBCcmVhZGNydW1iUHJvdmlkZXIpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwQnJlYWRjcnVtYicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVGVtcGxhdGVzJywgJ3BpcE5hdi5UcmFuc2xhdGUnXSk7XHJcblxyXG5pbXBvcnQgJy4vQnJlYWRjcnVtYkRpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuXHJcblxyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBJTmF2SWNvblNlcnZpY2UgfSBmcm9tICcuLi9pY29uL05hdkljb25TZXJ2aWNlJztcclxuaW1wb3J0IHsgSU5hdk1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vbWVudS9OYXZNZW51U2VydmljZSc7XHJcbmltcG9ydCB7IElOYXZIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vaGVhZGVyL05hdkhlYWRlclNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQnJlYWRjcnVtYlNlcnZpY2UgfSBmcm9tICcuLi9icmVhZGNydW1iL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgSVNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi9zZWFyY2gvU2VhcmNoU2VydmljZSc7XHJcbmltcG9ydCB7IElBY3Rpb25zU2VydmljZSB9IGZyb20gJy4uL2FjdGlvbnMvQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQXBwQmFyU2VydmljZSB9IGZyb20gJy4uL2FwcGJhci9BcHBCYXJTZXJ2aWNlJztcclxuaW1wb3J0IHsgSVNpZGVOYXZTZXJ2aWNlIH0gZnJvbSAnLi4vc2lkZW5hdi9TaWRlTmF2U2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOYXZTZXJ2aWNlIHtcclxuICAgIGFwcGJhcjogSUFwcEJhclNlcnZpY2U7XHJcbiAgICBpY29uOiBJTmF2SWNvblNlcnZpY2U7IFxyXG4gICAgYnJlYWRjcnVtYjogSUJyZWFkY3J1bWJTZXJ2aWNlO1xyXG4gICAgYWN0aW9uczogSUFjdGlvbnNTZXJ2aWNlO1xyXG4gICAgc2VhcmNoOiBJU2VhcmNoU2VydmljZTtcclxuICAgIHNpZGVuYXY6IElTaWRlTmF2U2VydmljZTtcclxuICAgIGhlYWRlcjogSU5hdkhlYWRlclNlcnZpY2U7XHJcbiAgICBtZW51OiBJTmF2TWVudVNlcnZpY2U7ICAgXHJcblxyXG4gICAgcmVzZXQoKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgTmF2U2VydmljZSBpbXBsZW1lbnRzIElOYXZTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoJGluamVjdG9yKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB0aGlzLmFwcGJhciA9ICRpbmplY3Rvci5oYXMoJ3BpcEFwcEJhcicpID8gJGluamVjdG9yLmdldCgncGlwQXBwQmFyJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuaWNvbiA9ICRpbmplY3Rvci5oYXMoJ3BpcE5hdkljb24nKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE5hdkljb24nKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5icmVhZGNydW1iID0gJGluamVjdG9yLmhhcygncGlwQnJlYWRjcnVtYicpID8gJGluamVjdG9yLmdldCgncGlwQnJlYWRjcnVtYicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLmFjdGlvbnMgPSAkaW5qZWN0b3IuaGFzKCdwaXBBY3Rpb25zJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBBY3Rpb25zJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoID0gJGluamVjdG9yLmhhcygncGlwU2VhcmNoJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBTZWFyY2gnKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5zaWRlbmF2ID0gJGluamVjdG9yLmhhcygncGlwU2lkZU5hdicpID8gJGluamVjdG9yLmdldCgncGlwU2lkZU5hdicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLmhlYWRlciA9ICRpbmplY3Rvci5oYXMoJ3BpcE5hdkhlYWRlcicpID8gJGluamVjdG9yLmdldCgncGlwTmF2SGVhZGVyJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMubWVudSA9ICRpbmplY3Rvci5oYXMoJ3BpcE5hdk1lbnUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE5hdk1lbnUnKSA6IG51bGw7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhcHBiYXI6IElBcHBCYXJTZXJ2aWNlO1xyXG4gICAgcHVibGljIGljb246IElOYXZJY29uU2VydmljZTtcclxuICAgIHB1YmxpYyBicmVhZGNydW1iOiBJQnJlYWRjcnVtYlNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYWN0aW9uczogSUFjdGlvbnNTZXJ2aWNlO1xyXG4gICAgcHVibGljIHNlYXJjaDogSVNlYXJjaFNlcnZpY2U7XHJcbiAgICBwdWJsaWMgc2lkZW5hdjogSVNpZGVOYXZTZXJ2aWNlOyAgICAgICAgXHJcbiAgICBwdWJsaWMgaGVhZGVyOiBJTmF2SGVhZGVyU2VydmljZTtcclxuICAgIHB1YmxpYyBtZW51OiBJTmF2TWVudVNlcnZpY2U7ICAgIFxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICAvLyBSZXNldCBhcHBiYXJcclxuICAgICAgICBpZiAodGhpcy5hcHBiYXIpIFxyXG4gICAgICAgICAgICB0aGlzLmFwcGJhci5zaG93KCk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGljb25cclxuICAgICAgICBpZiAodGhpcy5pY29uKVxyXG4gICAgICAgICAgICB0aGlzLmljb24uc2hvd01lbnUoKTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgYnJlYWRjcnVtYlxyXG4gICAgICAgIGlmICh0aGlzLmJyZWFkY3J1bWIpXHJcbiAgICAgICAgICAgIHRoaXMuYnJlYWRjcnVtYi5zaG93VGV4dChudWxsKTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgYWN0aW9uc1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGlvbnMpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5zaG93KCk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IHNlYXJjaFxyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaClcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2guc2V0KG51bGwpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zaWRlbmF2KVxyXG4gICAgICAgICAgICB0aGlzLnNpZGVuYXYuc2hvdygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZTZXJ2aWNlJywgW10pXHJcbiAgICAuc2VydmljZSgncGlwTmF2U2VydmljZScsIE5hdlNlcnZpY2UpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gdHJhbnNsYXRlRmlsdGVyKCRpbmplY3Rvcikge1xyXG4gICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgIGxldCBwaXBUcmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiBwaXBUcmFuc2xhdGUgID8gcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZShrZXkpIHx8IGtleSA6IGtleTtcclxuICAgIH1cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2LlRyYW5zbGF0ZScsIFtdKVxyXG4gICAgLmZpbHRlcigndHJhbnNsYXRlJywgdHJhbnNsYXRlRmlsdGVyKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5mdW5jdGlvbiBEcm9wZG93bkRpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkaW5qZWN0b3IsICRyb290U2NvcGUsICRtZE1lZGlhLCAkdGltZW91dCkge1xyXG4gICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgIGxldCBwaXBUaGVtZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRoZW1lJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUaGVtZScpIDogbnVsbDsgXHJcbiAgICBsZXQgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcbiAgICBsZXQgY3VycmVudFRoZW1lID0gJ2RlZmF1bHQnO1xyXG5cclxuICAgIGlmIChwaXBUaGVtZSlcclxuICAgICAgICBjdXJyZW50VGhlbWUgPSBwaXBUaGVtZS51c2UoKTtcclxuICAgIGVsc2UgaWYgKCRyb290U2NvcGUuJHRoZW1lKVxyXG4gICAgICAgIGN1cnJlbnRUaGVtZSA9ICRyb290U2NvcGUuJHRoZW1lO1xyXG5cclxuICAgICRzY29wZS5jbGFzcyA9ICgkYXR0cnMuY2xhc3MgfHwgJycpICsgJyBtZC0nICsgY3VycmVudFRoZW1lICsgJy10aGVtZSc7XHJcblxyXG4gICAgLy9waXBBc3NlcnQuaXNBcnJheSgkc2NvcGUuYWN0aW9ucywgJ3BpcERyb3Bkb3duOiBwaXAtYWN0aW9ucyBhdHRyaWJ1dGUgc2hvdWxkIHRha2UgYW4gYXJyYXksIGJ1dCB0YWtlICcgKyB0eXBlb2YgJHNjb3BlLmFjdGlvbnMpO1xyXG4gICAgJHNjb3BlLm1lZGlhID0gcGlwTWVkaWEgIT09IHVuZGVmaW5lZCA/IHBpcE1lZGlhIDogJG1kTWVkaWE7XHJcbiAgICAkc2NvcGUuYWN0aW9ucyA9ICgkc2NvcGUuYWN0aW9ucyAmJiBfLmlzQXJyYXkoJHNjb3BlLmFjdGlvbnMpKSA/ICRzY29wZS5hY3Rpb25zIDogW107XHJcbiAgICAkc2NvcGUuYWN0aXZlSW5kZXggPSAkc2NvcGUuYWN0aXZlSW5kZXggfHwgMDtcclxuXHJcbiAgICAkc2NvcGUuZGlzYWJsZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCRzY29wZS5uZ0Rpc2FibGVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5uZ0Rpc2FibGVkKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLm9uU2VsZWN0ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgJHNjb3BlLmFjdGl2ZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgaWYgKCRzY29wZS5zZWxlY3QpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdCgkc2NvcGUuYWN0aW9uc1tpbmRleF0sICRzY29wZS5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJHNjb3BlLnBpcENoYW5nZSkge1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5waXBDaGFuZ2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJHNjb3BlLnNob3dEcm9wZG93bigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuc2hvd0Ryb3Bkb3duKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyb3Bkb3duRGlyZWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIG5nRGlzYWJsZWQ6ICcmJyxcclxuICAgICAgICAgICAgYWN0aW9uczogJz1waXBBY3Rpb25zJyxcclxuICAgICAgICAgICAgc2hvd0Ryb3Bkb3duOiAnJnBpcFNob3cnLFxyXG4gICAgICAgICAgICBhY3RpdmVJbmRleDogJz1waXBBY3RpdmVJbmRleCcsXHJcbiAgICAgICAgICAgIHNlbGVjdDogJz1waXBEcm9wZG93blNlbGVjdCcsXHJcbiAgICAgICAgICAgIHBpcENoYW5nZTogJyYnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2Ryb3Bkb3duL0Ryb3Bkb3duLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IERyb3Bkb3duRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwRHJvcGRvd24nLCBbJ3BpcE5hdi5UZW1wbGF0ZXMnXSlcclxuICAgIC5kaXJlY3RpdmUoJ3BpcERyb3Bkb3duJywgZHJvcGRvd25EaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IE5hdkhlYWRlckNoYW5nZWRFdmVudCA9ICdwaXBOYXZIZWFkZXJDaGFuZ2VkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZIZWFkZXJDb25maWcge1xyXG4gICAgLy8gSW1hZ2UgdXJsXHJcbiAgICBwdWJsaWMgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIC8vIEltYWdlIHVybFxyXG4gICAgcHVibGljIGRlZmF1bHRJbWFnZVVybDogc3RyaW5nO1xyXG4gICAgLy8gVGl0bGVcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gICAgLy8gU3VidGl0bGVcclxuICAgIHB1YmxpYyBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgLy8gSGFuZGxlIGhlYWRlciBjbGljayBldmVudFxyXG4gICAgY2xpY2s6ICgpID0+IHZvaWQ7XHJcbiAgICAvLyBFdmVudCBuYW1lXHJcbiAgICBldmVudDogc3RyaW5nXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOYXZIZWFkZXJTZXJ2aWNlIHtcclxuICAgIHJlYWRvbmx5IGNvbmZpZzogTmF2SGVhZGVyQ29uZmlnO1xyXG4gICAgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgY2xpY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBldmVudDogc3RyaW5nO1xyXG5cclxuICAgIHNob3codGl0bGU6IHN0cmluZywgc3VidGl0bGU6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIGhpZGUoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2SGVhZGVyUHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGNvbmZpZzogTmF2SGVhZGVyQ29uZmlnO1xyXG4gICAgZGVmYXVsdEltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICBjbGljazogKCkgPT4gdm9pZDtcclxuICAgIGV2ZW50OiBzdHJpbmc7XHJcblxyXG4gICAgc2V0KHRpdGxlOiBzdHJpbmcsIHN1YnRpdGxlOiBzdHJpbmcsIGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBjbGVhcigpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBOYXZIZWFkZXJTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogTmF2SGVhZGVyQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBOYXZIZWFkZXJDb25maWcsICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogTmF2SGVhZGVyQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdWJ0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc3VidGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzdWJ0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGltYWdlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5pbWFnZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGltYWdlVXJsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xpY2soKTogKCkgPT4gdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jbGljaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNsaWNrKHZhbHVlOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGV2ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5ldmVudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGV2ZW50KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93KHRpdGxlOiBzdHJpbmcsIHN1YnRpdGxlOiBzdHJpbmcsIGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IHN1YnRpdGxlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IGltYWdlVXJsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrT3JFdmVudCkpXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICBlbHNlIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChfLmlzU3RyaW5nKGNhbGxiYWNrT3JFdmVudCkpXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICBlbHNlIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoTmF2SGVhZGVyQ2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBOYXZIZWFkZXJQcm92aWRlciBpbXBsZW1lbnRzIElOYXZIZWFkZXJQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdkhlYWRlckNvbmZpZyA9IG5ldyBOYXZIZWFkZXJDb25maWcoKTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IE5hdkhlYWRlclNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogTmF2SGVhZGVyQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29uZmlnKHZhbHVlOiBOYXZIZWFkZXJDb25maWcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB2YWx1ZSB8fCBuZXcgTmF2SGVhZGVyQ29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZWZhdWx0SW1hZ2VVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmRlZmF1bHRJbWFnZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRlZmF1bHRJbWFnZVVybCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmRlZmF1bHRJbWFnZVVybCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3VidGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnN1YnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc3VidGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaW1hZ2VVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmltYWdlVXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaW1hZ2VVcmwodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xpY2soKTogKCkgPT4gdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jbGljaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNsaWNrKHZhbHVlOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBldmVudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBldmVudCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCh0aXRsZTogc3RyaW5nLCBzdWJ0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSBzdWJ0aXRsZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBpbWFnZVVybDtcclxuXHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc1N0cmluZyhjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgTmF2SGVhZGVyU2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxuICAgICBcclxufVxyXG5cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdkhlYWRlcicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcE5hdkhlYWRlcicsIE5hdkhlYWRlclByb3ZpZGVyKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gU3RpY2t5TmF2SGVhZGVyRGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkcm9vdFNjb3BlLCAkdGltZW91dCwgcGlwTmF2SGVhZGVyKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgaW1hZ2UgPSBudWxsLFxyXG4gICAgICAgICAgICBpbWFnZUJsb2NrID0gJGVsZW1lbnQuZmluZCgnLnBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyJyksXHJcbiAgICAgICAgICAgICRpbWFnZSxcclxuICAgICAgICAgICAgY3VycmVudFN0YXRlLFxyXG4gICAgICAgICAgICBsb2FkZWREZWZhdWx0SW1hZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LWhlYWRlcicpO1xyXG5cclxuICAgICAgICAkc2NvcGUub25Vc2VyQ2xpY2sgPSBvblVzZXJDbGljaztcclxuICAgICAgICAkc2NvcGUub25JbWFnZUVycm9yID0gb25JbWFnZUVycm9yO1xyXG4gICAgICAgICRzY29wZS5vbkltYWdlTG9hZCA9IG9uSW1hZ2VMb2FkO1xyXG5cclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRpbWFnZSA9ICRlbGVtZW50LmZpbmQoJy5waXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci1pbWFnZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRpbWFnZVswXSkge1xyXG4gICAgICAgICAgICAgICAgJGltYWdlWzBdLm9ubG9hZCA9IG9uSW1hZ2VMb2FkO1xyXG4gICAgICAgICAgICAgICAgJGltYWdlWzBdLm9uZXJyb3IgPSBvbkltYWdlRXJyb3I7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2Uub25sb2FkID0gb25JbWFnZUxvYWQ7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2Uub25lcnJvciA9IG9uSW1hZ2VFcnJvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb25OYXZIZWFkZXJDaGFuZ2VkKG51bGwsIHBpcE5hdkhlYWRlci5jb25maWcpO1xyXG4gICAgICAgIH0sIDIwKTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcE5hdkhlYWRlckNoYW5nZWQnLCBvbk5hdkhlYWRlckNoYW5nZWQpO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGVDaGFuZ2VkJywgb25TdGF0ZUNoYW5nZWQpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRIZWFkZXIoKSB7XHJcbiAgICAgICAgICAgIGlmICghcGlwTmF2SGVhZGVyLmNvbmZpZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnRpdGxlID0gcGlwTmF2SGVhZGVyLmNvbmZpZy50aXRsZTtcclxuICAgICAgICAgICAgJHNjb3BlLnN1YnRpdGxlID0gcGlwTmF2SGVhZGVyLmNvbmZpZy5zdWJ0aXRsZTtcclxuICAgICAgICAgICAgJHNjb3BlLmltYWdlVXJsID0gcGlwTmF2SGVhZGVyLmNvbmZpZy5pbWFnZVVybDtcclxuICAgICAgICAgICAgJHNjb3BlLmltYWdlQ3NzID0gcGlwTmF2SGVhZGVyLmNvbmZpZy5pbWFnZUNzcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdoZW4gaW1hZ2UgaXMgbG9hZGVkIHJlc2l6ZS9yZXBvc2l0aW9uIGl0XHJcbiAgICAgICAgZnVuY3Rpb24gb25JbWFnZUxvYWQoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICQoJGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgIHNldEltYWdlTWFyZ2luQ1NTKGltYWdlQmxvY2ssIGltYWdlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkltYWdlRXJyb3IoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChsb2FkZWREZWZhdWx0SW1hZ2UpIHJldHVybjtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRJbWFnZShwaXBOYXZIZWFkZXIuY29uZmlnLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25TdGF0ZUNoYW5nZWQoZXZlbnQsIHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlLmlkID09ICd0b2dnbGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNob3dIZWFkZXIgPSBjdXJyZW50U3RhdGUgJiYgY3VycmVudFN0YXRlLmlkID09ICd0b2dnbGUnO1xyXG4gICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zaG93SGVhZGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldEltYWdlTWFyZ2luQ1NTKGNvbnRhaW5lciwgaW1hZ2UpIHtcclxuICAgICAgICAgICAgdmFyIGNzc1BhcmFtcyA9IHt9LFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyV2lkdGggPSBjb250YWluZXIud2lkdGggPyBjb250YWluZXIud2lkdGgoKSA6IGNvbnRhaW5lci5jbGllbnRXaWR0aCxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lci5oZWlnaHQgPyBjb250YWluZXIuaGVpZ2h0KCkgOiBjb250YWluZXIuY2xpZW50SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VXaWR0aCA9IGltYWdlWzBdLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aCxcclxuICAgICAgICAgICAgICAgIGltYWdlSGVpZ2h0ID0gaW1hZ2VbMF0ubmF0dXJhbEhlaWdodCB8fCBpbWFnZS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW4gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKChpbWFnZVdpZHRoIC8gY29udGFpbmVyV2lkdGgpID4gKGltYWdlSGVpZ2h0IC8gY29udGFpbmVySGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luID0gLSgoaW1hZ2VXaWR0aCAvIGltYWdlSGVpZ2h0ICogY29udGFpbmVySGVpZ2h0IC0gY29udGFpbmVyV2lkdGgpIC8gMik7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ21hcmdpbi1sZWZ0J10gPSAnJyArIG1hcmdpbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ2hlaWdodCddID0gJycgKyBjb250YWluZXJIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWyd3aWR0aCddID0gJycgKyBpbWFnZVdpZHRoICogY29udGFpbmVySGVpZ2h0IC8gaW1hZ2VIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydtYXJnaW4tdG9wJ10gPSAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hcmdpbiA9IC0oKGltYWdlSGVpZ2h0IC8gaW1hZ2VXaWR0aCAqIGNvbnRhaW5lcldpZHRoIC0gY29udGFpbmVySGVpZ2h0KSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydtYXJnaW4tdG9wJ10gPSAnJyArIG1hcmdpbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ2hlaWdodCddID0gJycgKyBpbWFnZUhlaWdodCAqIGNvbnRhaW5lcldpZHRoIC8gaW1hZ2VXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ3dpZHRoJ10gPSAnJyArIGNvbnRhaW5lcldpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snbWFyZ2luLWxlZnQnXSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbWFnZS5jc3MoY3NzUGFyYW1zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRJbWFnZShjb25maWcsIGxvYWRFcnJvcjogYm9vbGVhbikge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVybDogc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsb2FkRXJyb3IgJiYgISFjb25maWcuaW1hZ2VVcmwgJiYgIWxvYWRlZERlZmF1bHRJbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gY29uZmlnLmltYWdlVXJsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkRGVmYXVsdEltYWdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHVybCA9IGNvbmZpZy5kZWZhdWx0SW1hZ2VVcmw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh1cmwgJiYgJGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2UuYXR0cignc3JjJywgdXJsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGltYWdlQmxvY2suY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25OYXZIZWFkZXJDaGFuZ2VkKCRldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmICghY29uZmlnKSByZXR1cm47XHJcbiAgICAgICAgICAgIHNldEltYWdlKGNvbmZpZywgZmFsc2UpXHJcblxyXG4gICAgICAgICAgICAkc2NvcGUudGl0bGUgPSBjb25maWcudGl0bGU7XHJcbiAgICAgICAgICAgICRzY29wZS5zdWJ0aXRsZSA9IGNvbmZpZy5zdWJ0aXRsZTtcclxuICAgICAgICAgICAgJHNjb3BlLmltYWdlVXJsID0gY29uZmlnLmltYWdlVXJsO1xyXG4gICAgICAgICAgICAkc2NvcGUuaW1hZ2VDc3MgPSBjb25maWcuaW1hZ2VDc3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblVzZXJDbGljaygpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBOYXZVc2VyQ2xpY2tlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RpY2t5TmF2SGVhZGVyRGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaGVhZGVyL1N0aWNreU5hdkhlYWRlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogU3RpY2t5TmF2SGVhZGVyRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcE5hdkhlYWRlcicpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgncGlwU3RpY2t5TmF2SGVhZGVyJywgc3RpY2t5TmF2SGVhZGVyRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcE5hdkhlYWRlcicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL05hdkhlYWRlclNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vU3RpY2t5TmF2SGVhZGVyRGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vTmF2SGVhZGVyU2VydmljZSc7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5mdW5jdGlvbiBOYXZJY29uRGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRyb290U2NvcGUsICR3aW5kb3csIHBpcE5hdkljb24pIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtbmF2LWljb24nKTtcclxuXHJcbiAgICAkc2NvcGUuY29uZmlnID0gcGlwTmF2SWNvbi5jb25maWc7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJ3BpcE5hdkljb25DaGFuZ2VkJywgb25OYXZJY29uQ2hhbmdlZCk7XHJcblxyXG4gICAgJHNjb3BlLm9uTmF2SWNvbkNsaWNrID0gb25OYXZJY29uQ2xpY2s7XHJcblxyXG4gICAgZnVuY3Rpb24gb25OYXZJY29uQ2hhbmdlZChldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgJHNjb3BlLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvbk5hdkljb25DbGljaygpIHtcclxuICAgICAgICB2YXIgYnJlYWRjcnVtYiwgYmFja0NhbGxiYWNrO1xyXG5cclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKCRzY29wZS5jb25maWcuY2xpY2spKSB7XHJcbiAgICAgICAgICAgIC8vIEV4ZWN1dGUgbmF2IGljb24gY2FsbGJhY2tcclxuICAgICAgICAgICAgJHNjb3BlLmNvbmZpZy5jbGljaygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLmNvbmZpZy5ldmVudCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJHNjb3BlLmNvbmZpZy5ldmVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuY29uZmlnLnR5cGUgPT0gJ21lbnUnKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwT3BlblNpZGVOYXYnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5jb25maWcudHlwZSA9PSAnYmFjaycpIHtcclxuICAgICAgICAgICAgJHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcE5hdkljb25DbGlja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gbmF2SWNvbkRpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICB0eXBlOiAnPXBpcFR5cGUnLFxyXG4gICAgICAgICAgICBpbWFnZVVybDogJz1waXBJbWFnZVVybCcsXHJcbiAgICAgICAgICAgIGljb246ICc9cGlwSWNvbidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnaWNvbi9OYXZJY29uLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IE5hdkljb25EaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICB9O1xyXG59XHJcblxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2SWNvbicpXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBOYXZJY29uJywgbmF2SWNvbkRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBsZXQgTmF2SWNvbkNoYW5nZWRFdmVudCA9ICdwaXBOYXZJY29uQ2hhbmdlZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2SWNvbkNvbmZpZyB7XHJcbiAgICAvLyBUeXBlIG9mIG5hdiBpY29uOiAnYmFjaycsICdtZW51JywgJ2ltYWdlJyBvciAnbm9uZSdcclxuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcbiAgICAvLyBJbWFnZSB1cmxcclxuICAgIHB1YmxpYyBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgLy8gSWNvbiBuYW1lXHJcbiAgICBwdWJsaWMgaWNvbjogc3RyaW5nO1xyXG4gICAgLy8gSGFuZGxlIG5hdiBpY29uIGNsaWNrIGV2ZW50XHJcbiAgICBjbGljazogKCkgPT4gdm9pZDtcclxuICAgIC8vIEV2ZW50IG5hbWVcclxuICAgIGV2ZW50OiBzdHJpbmdcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdkljb25TZXJ2aWNlIHtcclxuICAgIHJlYWRvbmx5IGNvbmZpZzogTmF2SWNvbkNvbmZpZztcclxuXHJcbiAgICBzaG93TWVudShjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgc2hvd0ljb24oaWNvbjogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgc2hvd0JhY2soY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIHNob3dJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgaGlkZSgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOYXZJY29uUHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGNvbmZpZzogTmF2SWNvbkNvbmZpZztcclxuXHJcbiAgICBzZXRNZW51KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzZXRJY29uKGljb246IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIHNldEJhY2soY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIHNldEltYWdlKGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBjbGVhcigpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBOYXZJY29uU2VydmljZSBpbXBsZW1lbnRzIElOYXZJY29uU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdkljb25Db25maWc7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IE5hdkljb25Db25maWcsICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogTmF2SWNvbkNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrT3JFdmVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc1N0cmluZyhjYWxsYmFja09yRXZlbnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd01lbnUoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnbWVudSc7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93SWNvbihpY29uOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ2ljb24nO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pY29uID0gaWNvbjtcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dCYWNrKGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ2JhY2snO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0ltYWdlKGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ2ltYWdlJztcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBpbWFnZVVybDtcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQobnVsbCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDb25maWdFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdChOYXZJY29uQ2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBOYXZJY29uUHJvdmlkZXIgaW1wbGVtZW50cyBJTmF2SWNvblByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogTmF2SWNvbkNvbmZpZyA9IG5ldyBOYXZJY29uQ29uZmlnKCk7XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBOYXZJY29uU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBOYXZJY29uQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29uZmlnKHZhbHVlOiBOYXZJY29uQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsdWUgfHwgbmV3IE5hdkljb25Db25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrT3JFdmVudCkpXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICBlbHNlIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChfLmlzU3RyaW5nKGNhbGxiYWNrT3JFdmVudCkpXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICBlbHNlIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE1lbnUoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnbWVudSc7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SWNvbihpY29uOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ2ljb24nO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pY29uID0gaWNvbjtcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRCYWNrKGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ2JhY2snO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEltYWdlKGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ2ltYWdlJztcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBpbWFnZVVybDtcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdub25lJztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBOYXZJY29uU2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxuICAgICBcclxufVxyXG5cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdkljb24nKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBOYXZJY29uJywgTmF2SWNvblByb3ZpZGVyKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcE5hdkljb24nLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRyYW5zbGF0ZScsICdwaXBOYXYuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL05hdkljb25TZXJ2aWNlJztcclxuaW1wb3J0ICcuL05hdkljb25EaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9OYXZJY29uU2VydmljZSc7XHJcbiIsIu+7vyd1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAnLi9kZXBlbmRlbmNpZXMvVHJhbnNsYXRlRmlsdGVyJztcclxuaW1wb3J0ICcuL2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyRGlyZWN0aXZlJztcclxuaW1wb3J0ICcuL2Ryb3Bkb3duL0Ryb3Bkb3duRGlyZWN0aXZlJztcclxuaW1wb3J0ICcuL3RhYnMvVGFic0RpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9hY3Rpb25zJztcclxuaW1wb3J0ICcuL2FwcGJhcic7XHJcbmltcG9ydCAnLi9zZWFyY2gnO1xyXG5pbXBvcnQgJy4vYnJlYWRjcnVtYic7XHJcbmltcG9ydCAnLi9zaWRlbmF2JztcclxuaW1wb3J0ICcuL2hlYWRlcic7XHJcbmltcG9ydCAnLi9tZW51JztcclxuaW1wb3J0ICcuL2ljb24nO1xyXG5pbXBvcnQgJy4vY29tbW9uL05hdlNlcnZpY2UnO1xyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2JywgW1xyXG4gICAgICAgICdwaXBOYXZTZXJ2aWNlJyxcclxuICAgICAgICAncGlwRHJvcGRvd24nLFxyXG4gICAgICAgICdwaXBUYWJzJyxcclxuICAgICAgICAncGlwQXBwQmFyJyxcclxuICAgICAgICAncGlwU2VhcmNoQmFyJyxcclxuICAgICAgICAncGlwTmF2SWNvbicsXHJcbiAgICAgICAgJ3BpcEJyZWFkY3J1bWInLFxyXG4gICAgICAgICdwaXBBY3Rpb25zJywgXHJcbiAgICAgICAgJ3BpcFNpZGVOYXYnLFxyXG4gICAgICAgICdwaXBOYXZNZW51JyxcclxuICAgICAgICAncGlwTmF2SGVhZGVyJ1xyXG4gICAgXSk7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2FjdGlvbnMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2FwcGJhcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vYnJlYWRjcnVtYic7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2VhcmNoJztcclxuZXhwb3J0ICogZnJvbSAnLi9zaWRlbmF2JztcclxuZXhwb3J0ICogZnJvbSAnLi9pY29uJztcclxuZXhwb3J0ICogZnJvbSAnLi9tZW51JztcclxuZXhwb3J0ICogZnJvbSAnLi9oZWFkZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbW1vbi9OYXZTZXJ2aWNlJztcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5jbGFzcyBMYW5ndWFnZVBpY2tlckRpcmVjdGl2ZUNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBfdHJhbnNsYXRlOiBhbnk7XHJcbiAgICBwcml2YXRlIF90aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRzY29wZTogYW55LCBcclxuICAgICAgICAkZWxlbWVudDogYW55LCBcclxuICAgICAgICAkYXR0cnM6IGFueSwgXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsIFxyXG4gICAgICAgICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UsXHJcbiAgICAgICAgJGluamVjdG9yOiBhbnlcclxuICAgICkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdGhpcy5fdGltZW91dCA9ICR0aW1lb3V0O1xyXG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLWxhbmd1YWdlLXBpY2tlcicpO1xyXG5cclxuICAgICAgICB0aGlzLmxhbmd1YWdlcyA9ICRzY29wZS5sYW5ndWFnZXM7XHJcblxyXG4gICAgICAgIC8vIFRvZG86IFdoZXJlIGlzIHRoaXMgZXZlbnQgY29taW5nIGZyb20/IFdoeSBub3QgdGhyb3VnaCBzZXJ2aWNlIG9yIGF0dHJpYnV0ZT9cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwU2V0TGFuZ3VhZ2VzJywgdGhpcy5zZXRMYW5ndWFnZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsYW5ndWFnZXM6IHN0cmluZ1tdID0gWydlbicsICdydSddO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgbGFuZ3VhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSA/IHRoaXMuX3RyYW5zbGF0ZS5sYW5ndWFnZSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldExhbmd1YWdlcyhsYW5nKSB7XHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZXMgPSBsYW5nLmxlbmd0aCA+IDAgPyBsYW5nIDogWydlbicsICdydSddO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkxhbmd1YWdlQ2xpY2sobGFuZ3VhZ2UpIHtcclxuICAgICAgICBpZiAodGhpcy5fdHJhbnNsYXRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2xhdGUubGFuZ3VhZ2UgPSB0aGlzLmxhbmd1YWdlO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBsYW5ndWFnZVBpY2tlckRpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBsYW5ndWFnZXM6ICc9bGFuZ3VhZ2VzJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cikge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyLmh0bWwnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogTGFuZ3VhZ2VQaWNrZXJEaXJlY3RpdmVDb250cm9sbGVyLFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTGFuZ3VhZ2VQaWNrZXInLCBbXHJcbiAgICAgICAgJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRyYW5zbGF0ZScsICdwaXBOYXYuVGVtcGxhdGVzJ1xyXG4gICAgXSlcclxuICAgIC5kaXJlY3RpdmUoJ3BpcExhbmd1YWdlUGlja2VyJywgbGFuZ3VhZ2VQaWNrZXJEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IE5hdk1lbnVDaGFuZ2VkRXZlbnQgPSAncGlwTmF2TWVudUNoYW5nZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdk1lbnVMaW5rIHtcclxuICAgIC8vIE5hbWUgdG8gcmVmZXIgdG8gdGhlIGl0ZW1cclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICAvLyBMaW5rIHZpc2libGUgdGl0bGVcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gICAgLy8gSWNvbiBuYW1lIGZyb20gJGljb25Qcm92aWRlclxyXG4gICAgcHVibGljIGljb24/OiBzdHJpbmc7XHJcbiAgICAvLyBDb3VudGVyIGJhZGdlXHJcbiAgICBwdWJsaWMgY291bnQ/OiBudW1iZXI7XHJcbiAgICAvLyBjbGFzcyBmb3IgYmFkZ2Ugc3R5bGVcclxuICAgIHB1YmxpYyBiYWRnZVN0eWxlPzogc3RyaW5nO1xyXG4gICAgLy8gQWNjZXNzIGZ1bmN0aW9uXHJcbiAgICBwdWJsaWMgYWNjZXNzPzogKGxpbms6IE5hdk1lbnVMaW5rKSA9PiBib29sZWFuO1xyXG4gICAgLy8gd2luZG93LmxvY2F0aW9uLmhyZWZcclxuICAgIHB1YmxpYyBocmVmPzogc3RyaW5nO1xyXG4gICAgLy8gJGxvY2F0aW9uLnVybFxyXG4gICAgcHVibGljIHVybD86IHN0cmluZztcclxuICAgIC8vICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMpXHJcbiAgICBwdWJsaWMgc3RhdGU/OiBzdHJpbmc7XHJcbiAgICAvLyBQYXJhbWV0ZXJzIGZvciAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zKVxyXG4gICAgcHVibGljIHN0YXRlUGFyYW1zPzogYW55O1xyXG4gICAgLy8gcGFyZW50IHN0YXRlIG9yIHBhcmVudCBzdGF0ZSBmb3Igc2VsZWN0aW9uIGl0ZW0gXHJcbiAgICBwdWJsaWMgcGFyZW50U3RhdGU/OiBzdHJpbmc7XHJcbiAgICAvLyAkcm9vdFNjb3BlLmJyb2FkY2FzdChldmVudClcclxuICAgIHB1YmxpYyBldmVudD86IHN0cmluZztcclxuICAgIC8vIENsaWNrIGNhbGxiYWNrXHJcbiAgICBwdWJsaWMgY2xpY2s/OiAobGluazogTmF2TWVudUxpbmspID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZNZW51U2VjdGlvbiB7XHJcbiAgICAvLyBOYW1lIHRvIHJlZmVyIHRvIHRoZSBzZWN0aW9uXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgLy8gU2VjdGlvbiB2aXNpYmxlIHRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU/OiBzdHJpbmc7XHJcbiAgICAvLyBJY29uIG5hbWUgZnJvbSAkaWNvblByb3ZpZGVyXHJcbiAgICBwdWJsaWMgaWNvbj86IHN0cmluZztcclxuICAgIC8vIExpbmtzIHNob3duIGluIHRoZSBzZWN0aW9uXHJcbiAgICBwdWJsaWMgbGlua3M6IE5hdk1lbnVMaW5rW107XHJcbiAgICAvLyBBY2Nlc3MgZnVuY3Rpb25cclxuICAgIHB1YmxpYyBhY2Nlc3M/OiAoc2VjdGlvbjogTmF2TWVudVNlY3Rpb24pID0+IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZNZW51Q29uZmlnIHtcclxuICAgIHNlY3Rpb25zOiBOYXZNZW51U2VjdGlvbltdO1xyXG4gICAgZGVmYXVsdEljb246IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2TWVudVNlcnZpY2Uge1xyXG4gICAgc2VjdGlvbnM6IE5hdk1lbnVTZWN0aW9uW107XHJcbiAgICBkZWZhdWx0SWNvbjogc3RyaW5nO1xyXG4gICAgdXBkYXRlQ291bnQobGluazogc3RyaW5nLCBjb3VudDogbnVtYmVyKTogdm9pZDsgXHJcbiAgICB1cGRhdGVCYWRnZVN0eWxlKGxpbms6IHN0cmluZywgc3R5bGU6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBjbGVhckNvdW50cygpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOYXZNZW51UHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIHNlY3Rpb25zOiBOYXZNZW51U2VjdGlvbltdO1xyXG4gICAgZGVmYXVsdEljb246IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgTmF2TWVudVNlcnZpY2UgaW1wbGVtZW50cyBJTmF2TWVudVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZNZW51Q29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBOYXZNZW51Q29uZmlnLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY3Rpb25zKCk6IE5hdk1lbnVTZWN0aW9uW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2VjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWN0aW9ucyh2YWx1ZTogTmF2TWVudVNlY3Rpb25bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZWZhdWx0SWNvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZGVmYXVsdEljb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUJhZGdlU3R5bGUobGluazogc3RyaW5nLCBzdHlsZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGxpbmsgPT0gbnVsbCB8fCAhXy5pc1N0cmluZyhzdHlsZSkpIHJldHVybjtcclxuXHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5zZWN0aW9ucywgKHMpID0+IHtcclxuICAgICAgICAgICAgXy5lYWNoKHMubGlua3MsIChsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobC5uYW1lID09IGxpbmspXHJcbiAgICAgICAgICAgICAgICAgICAgbC5iYWRnZVN0eWxlID0gc3R5bGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGVmYXVsdEljb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5kZWZhdWx0SWNvbiA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUNvdW50KGxpbms6IHN0cmluZywgY291bnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChsaW5rID09IG51bGwgfHwgIV8uaXNOdW1iZXIoY291bnQpKSByZXR1cm47XHJcblxyXG4gICAgICAgIF8uZWFjaCh0aGlzLl9jb25maWcuc2VjdGlvbnMsIChzKSA9PiB7XHJcbiAgICAgICAgICAgIF8uZWFjaChzLmxpbmtzLCAobCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGwubmFtZSA9PSBsaW5rKVxyXG4gICAgICAgICAgICAgICAgICAgIGwuY291bnQgPSBjb3VudDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQ291bnRzKCk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaCh0aGlzLl9jb25maWcuc2VjdGlvbnMsIChzKSA9PiB7XHJcbiAgICAgICAgICAgIF8uZWFjaChzLmxpbmtzLCAobCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbC5jb3VudCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENoYW5nZUV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kZW1pdChOYXZNZW51Q2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBOYXZNZW51UHJvdmlkZXIgaW1wbGVtZW50cyBJTmF2TWVudVByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogTmF2TWVudUNvbmZpZyA9IHtcclxuICAgICAgICBzZWN0aW9uczogW10sXHJcbiAgICAgICAgZGVmYXVsdEljb246ICdpY29uczpmb2xkZXInXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogTmF2TWVudVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBzZWN0aW9ucygpOiBOYXZNZW51U2VjdGlvbltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VjdGlvbnModmFsdWU6IE5hdk1lbnVTZWN0aW9uW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2VjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlZmF1bHRJY29uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5kZWZhdWx0SWNvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRlZmF1bHRJY29uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZGVmYXVsdEljb24gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IE5hdk1lbnVTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdk1lbnUnKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBOYXZNZW51JywgTmF2TWVudVByb3ZpZGVyKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gU3RpY2t5TmF2TWVudURpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJHJvb3RTY29wZSwgJHdpbmRvdywgJGxvY2F0aW9uLCAkdGltZW91dCwgJGluamVjdG9yLCBwaXBTaWRlTmF2LCBwaXBOYXZNZW51KSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXIgYW5pbWF0aW9uRHVyYXRpb24gPSA0NTAsXHJcbiAgICAgICAgICAgIHBpcFNpZGVOYXZFbGVtZW50ID0gJGVsZW1lbnQucGFyZW50KCkucGFyZW50KCk7XHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LW1lbnUnKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlY3Rpb25zID0gJHNjb3BlLnNlY3Rpb25zIHx8IHBpcE5hdk1lbnUuc2VjdGlvbnM7XHJcbiAgICAgICAgJHNjb3BlLnNob3dUb29sdGlwID0gdHJ1ZTtcclxuICAgICAgICAvLyBwaXBOYXZNZW51LnNlY3Rpb25zID0gJHNjb3BlLnNlY3Rpb25zO1xyXG4gICAgICAgIHNldENvbGxhcHNpYmxlKCk7XHJcbiAgICAgICAgLy8gdG9kbyBzZXQgZnJvbSBzZXJ2aWNlc1xyXG4gICAgICAgICRzY29wZS5kZWZhdWx0SWNvbiA9IHBpcE5hdk1lbnUuZGVmYXVsdEljb247XHJcblxyXG4gICAgICAgIG9uU3RhdGVDaGFuZ2VkKG51bGwsIHBpcFNpZGVOYXYuc3RhdGUpO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwTmF2TWVudUNoYW5nZWQnLCBvbkNvbmZpZ0NoYW5nZWQpO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGVDaGFuZ2VkJywgb25TdGF0ZUNoYW5nZWQpO1xyXG5cclxuICAgICAgICAkc2NvcGUuaXRlbVZpc2libGUgPSBpc0hpZGRlbjtcclxuICAgICAgICAkc2NvcGUuY2xpY2tMaW5rID0gY2xpY2tMaW5rO1xyXG4gICAgICAgICRzY29wZS5pc1NlY3Rpb25FbXB0eSA9IGlzU2VjdGlvbkVtcHR5O1xyXG4gICAgICAgICRzY29wZS5vbkV4cGFuZCA9IG9uRXhwYW5kO1xyXG4gICAgICAgICRzY29wZS5pc0FjdGl2ZSA9IGlzQWN0aXZlO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldENvbGxhcHNpYmxlKCkge1xyXG4gICAgICAgICAgICB2YXIgY29sbGFwc2VkO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKCRzY29wZS5jb2xsYXBzZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQgPSAkc2NvcGUuY29sbGFwc2VkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQgPSAkc2NvcGUuY29sbGFwc2VkICE9PSBmYWxzZSAmJiAkc2NvcGUuY29sbGFwc2VkICE9PSAnZmFsc2UnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkV4cGFuZCgpIHtcclxuICAgICAgICAgICAgaWYgKCEkc2NvcGUuaXNDb2xsYXBzZWQpIHsgcmV0dXJuIH1cclxuXHJcbiAgICAgICAgICAgICRzY29wZS5leHBhbmRlZCA9ICEkc2NvcGUuZXhwYW5kZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2RWxlbWVudC5yZW1vdmVDbGFzcygncGlwLXN0aWNreS1uYXYtc21hbGwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXZFbGVtZW50LmFkZENsYXNzKCdwaXAtc3RpY2t5LW5hdi1zbWFsbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGVtaXQoJ3BpcE5hdkV4cGFuZGVkJywgJHNjb3BlLmV4cGFuZGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlzSGlkZGVuKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gJiYgaXRlbS5hY2Nlc3MgJiYgIWl0ZW0uYWNjZXNzKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaXNTZWN0aW9uRW1wdHkobGlua0NvbGxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgIF8uZWFjaChsaW5rQ29sbGVjdGlvbiwgZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNIaWRkZW4obGluaykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25Db25maWdDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5zZWN0aW9ucyA9IGNvbmZpZy5zZWN0aW9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU3RhdGVDaGFuZ2VkKGV2ZW50LCBzdGF0ZSkge1xyXG4gICAgICAgICAgICAvLyBTUz4gWW91IHNoYWxsIG5vdCBzZXQgaXQgaW50byB0aGUgbWVudSBzdGF0ZS4gSW5zdGVhZCBpdCBzaGFsbCBiZSBjb250cm9sbGVkIGJ5IHRoZSBzdGF0ZSBvZiBTaWRlbmF2XHJcbiAgICAgICAgICAgIC8vcGlwTmF2TWVudS5jb2xsYXBzZWQoc3RhdGUuZXhwYW5kKTtcclxuICAgICAgICAgICAgaWYgKCFzdGF0ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gc3RhdGUuZXhwYW5kO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXhwYW5kZWQgPSBzdGF0ZS5pc0V4cGFuZGVkO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXhwYW5kZWRCdXR0b24gPSBzdGF0ZS5leHBhbmRlZEJ1dHRvbjtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5zaWRlTmF2U3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlzQWN0aXZlKGxpbmspIHtcclxuICAgICAgICAgICAgaWYgKGxpbmsucGFyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSA/ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICgkc3RhdGUgIT0gbnVsbCAmJiAkc3RhdGUuaW5jbHVkZXMobGluay5wYXJlbnRTdGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5rLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmhhcygnJHN0YXRlJykgPyAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlICE9IG51bGwgJiYgJHN0YXRlLmluY2x1ZGVzKGxpbmsuc3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluay5ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluay5ocmVmLnNwbGl0KCc/JylbMF0gPT09ICR3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluay51cmwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLnVybC5zcGxpdCgvW1xccy8/XSsvKVsxXSA9PT0gJGxvY2F0aW9uLnVybCgpLnNwbGl0KC9bXFxzLz9dKy8pWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbGlja0xpbmsoZXZlbnQsIGxpbmspIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmsuaHJlZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdID09PSAkd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbmsuaHJlZjtcclxuICAgICAgICAgICAgICAgIH0sIGFuaW1hdGlvbkR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobGluay51cmwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLnVybC5zcGxpdCgvW1xccy8/XSsvKVsxXSA9PT0gJGxvY2F0aW9uLnVybCgpLnNwbGl0KC9bXFxzLz9dKy8pWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnVybChsaW5rLnVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCBhbmltYXRpb25EdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxpbmsuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSA/ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlICE9IG51bGwgJiYgJHN0YXRlLmN1cnJlbnQubmFtZSA9PT0gbGluay5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkaW5qZWN0b3IuaGFzKCckc3RhdGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmdldCgnJHN0YXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhsaW5rLnN0YXRlLCBsaW5rLnN0YXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBhbmltYXRpb25EdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxpbmsuZXZlbnQpXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QobGluay5ldmVudCwgbGluayk7XHJcblxyXG4gICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0aWNreU5hdk1lbnVEaXJlY3RpdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZWN0aW9uczogJz89cGlwU2VjdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgLy8gY29sbGFwc2VkOiAnPXBpcENvbGxhcHNlZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbWVudS9TdGlja3lOYXZNZW51Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBTdGlja3lOYXZNZW51RGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcE5hdk1lbnUnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcFN0aWNreU5hdk1lbnUnLCBzdGlja3lOYXZNZW51RGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcE5hdk1lbnUnLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRyYW5zbGF0ZScsICdwaXBOYXYuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL05hdk1lbnVTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1N0aWNreU5hdk1lbnVEaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9OYXZNZW51U2VydmljZSc7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoQ29uZmlnIH0gZnJvbSAnLi9TZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0IHsgSVNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL1NlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hDaGFuZ2VkRXZlbnQgfSBmcm9tICcuL1NlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWFyY2hBY3RpdmF0ZWRFdmVudCB9IGZyb20gJy4vU2VhcmNoU2VydmljZSc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmNsYXNzIFNlYXJjaEJhckNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgY29uZmlnOiBTZWFyY2hDb25maWc7XHJcbiAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHNlYXJjaDogYW55ID0geyB0ZXh0OiAnJyB9O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoXHJcbiAgICAgICAgJGVsZW1lbnQsIFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCBcclxuICAgICAgICBwaXBTZWFyY2g6IElTZWFyY2hTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9ICRlbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXNlYXJjaC1iYXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBwaXBTZWFyY2guY29uZmlnO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbihTZWFyY2hDaGFuZ2VkRXZlbnQsIChldmVudCwgY29uZmlnKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLm9uU2VhcmNoQ2hhbmdlZChldmVudCwgY29uZmlnKTsgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0ZUNoYW5nZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbGVtZW50JywgdGhpcy5fZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2VsZW1lbnQuYWRkQ2xhc3MoJ3ctc3RyZXRjaCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LmFkZENsYXNzKCd3LXN0cmV0Y2gnKTtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5wYXJlbnQoKS5hZGRDbGFzcygncGlwLXNlYXJjaC1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VsZW1lbnQnLCB0aGlzLl9lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5fZWxlbWVudC5yZW1vdmVDbGFzcygndy1zdHJldGNoJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQ2xhc3MoJ3ctc3RyZXRjaCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdwaXAtc2VhcmNoLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2VhcmNoQ2hhbmdlZChldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWFyY2gudGV4dCA9ICcnO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZvY3VzVGV4dCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSAkKCcucGlwLXNlYXJjaC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaC50ZXh0ID0gdGhpcy5jb25maWcuY3JpdGVyaWE7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZvY3VzVGV4dCgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGljaygpIHtcclxuICAgICAgICBsZXQgc2VhcmNoID0gdGhpcy5zZWFyY2gudGV4dDtcclxuXHJcbiAgICAgICAgdGhpcy5zZWFyY2gudGV4dCA9ICcnO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmNhbGxiYWNrKVxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jYWxsYmFjayhzZWFyY2gpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoU2VhcmNoQWN0aXZhdGVkRXZlbnQsIHNlYXJjaCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaC50ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLnRleHQgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5mb2N1c1RleHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uS2V5RG93bihldmVudDogYW55KSB7XHJcbiAgICAgICAgLy8gRW50ZXIgcHJlc3NlZFxyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMylcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XHJcbiAgICAgICAgLy8gRVNDIHByZXNzZWRcclxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNlYXJjaEJhckRpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICBzY29wZToge30sXHJcbiAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzZWFyY2gvU2VhcmNoQmFyLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IFNlYXJjaEJhckNvbnRyb2xsZXIsXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICB9O1xyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwU2VhcmNoQmFyJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcFNlYXJjaEJhcicsIHNlYXJjaEJhckRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBsZXQgT3BlblNlYXJjaEV2ZW50ID0gJ3BpcE9wZW5TZWFyY2gnO1xyXG5leHBvcnQgbGV0IENsb3NlU2VhcmNoRXZlbnQgPSAncGlwQ2xvc2VTZWFyY2gnO1xyXG5leHBvcnQgbGV0IFNlYXJjaENoYW5nZWRFdmVudCA9ICdwaXBTZWFyY2hDaGFuZ2VkJztcclxuZXhwb3J0IGxldCBTZWFyY2hBY3RpdmF0ZWRFdmVudCA9ICdwaXBTZWFyY2hBY3RpdmF0ZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbmZpZyB7XHJcbiAgICAvLyBTZWFyY2ggdmlzaWJsZVxyXG4gICAgcHVibGljIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICAvLyBTZWFyY2ggY3JpdGVyaWFcclxuICAgIHB1YmxpYyBjcml0ZXJpYTogc3RyaW5nO1xyXG4gICAgLy8gQ3VzdG9tIHNlYXJjaCBwYXJhbWV0ZXJzXHJcbiAgICBwdWJsaWMgcGFyYW1zOiBhbnk7XHJcbiAgICAvLyBIaXN0b3J5IGZvciBzZWFyY2ggYXV0b2NvbXBsZXRlXHJcbiAgICBwdWJsaWMgaGlzdG9yeTogc3RyaW5nW107XHJcbiAgICAvLyBDYWxsYmFjayBmb3Igc2VhcmNoXHJcbiAgICBjYWxsYmFjazogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNlYXJjaFNlcnZpY2Uge1xyXG4gICAgY29uZmlnOiBTZWFyY2hDb25maWc7XHJcbiAgICBjcml0ZXJpYTogc3RyaW5nO1xyXG4gICAgcGFyYW1zOiBhbnk7XHJcbiAgICBoaXN0b3J5OiBzdHJpbmdbXTtcclxuICAgIGNhbGxiYWNrOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZDtcclxuXHJcbiAgICBzZXQoY2FsbGJhY2s6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkLCBjcml0ZXJpYT86IHN0cmluZywgcGFyYW1zPzogYW55LCBoaXN0b3J5Pzogc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgY2xlYXIoKTogdm9pZDtcclxuICAgIG9wZW4oKTogdm9pZDtcclxuICAgIGNsb3NlKCk6IHZvaWQ7XHJcbiAgICB0b2dnbGUoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2VhcmNoUHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHsgICAgXHJcbn1cclxuXHJcblxyXG5jbGFzcyBTZWFyY2hTZXJ2aWNlIGltcGxlbWVudHMgSVNlYXJjaFNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBTZWFyY2hDb25maWc7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25maWc6IFNlYXJjaENvbmZpZyxcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKE9wZW5TZWFyY2hFdmVudCwgKCkgPT4geyB0aGlzLm9wZW4gfSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQ2xvc2VTZWFyY2hFdmVudCwgKCkgPT4geyB0aGlzLmNsb3NlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IFNlYXJjaENvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNyaXRlcmlhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jcml0ZXJpYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNyaXRlcmlhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFyYW1zKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJhbXModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJhbXMgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaGlzdG9yeSgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5oaXN0b3J5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaGlzdG9yeSh2YWx1ZTogc3RyaW5nW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuaGlzdG9yeSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjYWxsYmFjaygpOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNhbGxiYWNrKHZhbHVlOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jYWxsYmFjayA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldChjYWxsYmFjazogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQsIGNyaXRlcmlhPzogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGhpc3Rvcnk/OiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IGNyaXRlcmlhO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmhpc3RvcnkgPSBoaXN0b3J5O1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFyYW1zID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpOyAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSBmYWxzZTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgfSAgICAgICAgICAgICAgICBcclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gIXRoaXMuX2NvbmZpZy52aXNpYmxlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgfSAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICBwcml2YXRlIHNlbmRDb25maWdFdmVudCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdChTZWFyY2hDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNlYXJjaFByb3ZpZGVyIGltcGxlbWVudHMgSVNlYXJjaFByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogU2VhcmNoQ29uZmlnID0gbmV3IFNlYXJjaENvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogU2VhcmNoU2VydmljZSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH0gXHJcbn1cclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwU2VhcmNoQmFyJylcclxuICAgIC5wcm92aWRlcigncGlwU2VhcmNoJywgU2VhcmNoUHJvdmlkZXIpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwU2VhcmNoQmFyJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9TZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1NlYXJjaEJhckRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL1NlYXJjaFNlcnZpY2UnOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuICAgIGZ1bmN0aW9uIFNpZGVOYXZQYXJ0RGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRyb290U2NvcGUsIHBpcFNpZGVOYXYpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHZhciBwYXJ0TmFtZSA9ICcnICsgJGF0dHJzLnBpcFNpZGVuYXZQYXJ0O1xyXG4gICAgICAgIHZhciBwYXJ0VmFsdWUgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBCcmVhayBwYXJ0IGFwYXJ0XHJcbiAgICAgICAgdmFyIHBvcyA9IHBhcnROYW1lLmluZGV4T2YoJzonKTtcclxuICAgICAgICBpZiAocG9zID4gMCkge1xyXG4gICAgICAgICAgICBwYXJ0VmFsdWUgPSBwYXJ0TmFtZS5zdWJzdHIocG9zICsgMSk7XHJcbiAgICAgICAgICAgIHBhcnROYW1lID0gcGFydE5hbWUuc3Vic3RyKDAsIHBvcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblNpZGVOYXZDaGFuZ2VkKG51bGwsIHBpcFNpZGVOYXYuY29uZmlnKVxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2Q2hhbmdlZCcsIG9uU2lkZU5hdkNoYW5nZWQpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblNpZGVOYXZDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gY29uZmlnLnBhcnRzIHx8IHt9O1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFBhcnRWYWx1ZSA9IHBhcnRzW3BhcnROYW1lXTtcclxuICAgICAgICAgICAgdmFyIHZpc2libGUgPSAhIShwYXJ0VmFsdWUgPyBjdXJyZW50UGFydFZhbHVlID09IHBhcnRWYWx1ZSA6IGN1cnJlbnRQYXJ0VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZpc2libGUgIT0gJHNjb3BlLnZpc2libGUpXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaWRlbmF2UGFydERpcmVjdGl2ZShuZ0lmRGlyZWN0aXZlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXIgbmdJZiA9IG5nSWZEaXJlY3RpdmVbMF07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IG5nSWYudHJhbnNjbHVkZSxcclxuICAgICAgICAgICAgcHJpb3JpdHk6IG5nSWYucHJpb3JpdHksXHJcbiAgICAgICAgICAgIHRlcm1pbmFsOiBuZ0lmLnRlcm1pbmFsLFxyXG4gICAgICAgICAgICByZXN0cmljdDogbmdJZi5yZXN0cmljdCxcclxuICAgICAgICAgICAgc2NvcGU6IHRydWUsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIGxpbmtGdW5jdGlvbigkc2NvcGU6IGFueSwgJGVsZW1lbnQsICRhdHRycykge1xyXG4gICAgICAgICAgICAgICAgJGF0dHJzLm5nSWYgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAkc2NvcGUudmlzaWJsZSB9O1xyXG4gICAgICAgICAgICAgICAgbmdJZi5saW5rLmFwcGx5KG5nSWYsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFNpZGVOYXZQYXJ0RGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcFNpZGVOYXYnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcFNpZGVuYXZQYXJ0Jywgc2lkZW5hdlBhcnREaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IFNpZGVOYXZDaGFuZ2VkRXZlbnQgPSAncGlwU2lkZU5hdkNoYW5nZWQnO1xyXG5leHBvcnQgbGV0IFNpZGVOYXZTdGF0ZUNoYW5nZWRFdmVudCA9ICdwaXBTaWRlTmF2U3RhdGVDaGFuZ2VkJztcclxuZXhwb3J0IGxldCBPcGVuU2lkZU5hdkV2ZW50ID0gJ3BpcE9wZW5TaWRlTmF2JztcclxuZXhwb3J0IGxldCBDbG9zZVNpZGVOYXZFdmVudCA9ICdwaXBDbG9zZVNpZGVOYXYnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZGVOYXZDb25maWcge1xyXG4gICAgcGFydHM6IGFueTtcclxuICAgIGNsYXNzZXM6IHN0cmluZ1tdO1xyXG4gICAgc3RhdGU6IGFueTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNpZGVOYXZTZXJ2aWNlIHtcclxuICAgIHJlYWRvbmx5IGNvbmZpZzogU2lkZU5hdkNvbmZpZztcclxuICAgIHJlYWRvbmx5IGNsYXNzZXM6IHN0cmluZ1tdO1xyXG4gICAgcGFydHM6IGFueTtcclxuICAgIHN0YXRlOiBhbnk7XHJcblxyXG4gICAgb3BlbigpOiB2b2lkO1xyXG4gICAgY2xvc2UoKTogdm9pZDtcclxuICAgIHRvZ2dsZSgpOiB2b2lkO1xyXG4gICAgc2hvdygpOiB2b2lkO1xyXG4gICAgaGlkZSgpOiB2b2lkO1xyXG5cclxuICAgIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZDtcclxuXHJcbiAgICBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNpZGVOYXZQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgY29uZmlnOiBTaWRlTmF2Q29uZmlnO1xyXG4gICAgcGFydHM6IGFueTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxuXHJcbiAgICBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcblxyXG4gICAgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBTaWRlTmF2U2VydmljZSBpbXBsZW1lbnRzIElTaWRlTmF2U2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IFNpZGVOYXZDb25maWc7XHJcbiAgICBwcml2YXRlIF9zdGF0ZTogYW55O1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuICAgIHByaXZhdGUgX3NpZGVuYXY6IG5nLm1hdGVyaWFsLklTaWRlbmF2U2VydmljZTtcclxuICAgIHByaXZhdGUgaWQgPSAncGlwLXN0aWNreS1zaWRlbmF2JztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBTaWRlTmF2Q29uZmlnLCAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSwgJG1kU2lkZW5hdjogbmcubWF0ZXJpYWwuSVNpZGVuYXZTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgdGhpcy5fc2lkZW5hdiA9ICRtZFNpZGVuYXY7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogU2lkZU5hdkNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsYXNzZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcnRzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhcnRzKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHMgPSB2YWx1ZSB8fCB7fTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3RhdGUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzdGF0ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB2YWx1ZSB8fCB7fTtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGJyb2FkY2FzdChTaWRlTmF2U3RhdGVDaGFuZ2VkRXZlbnQsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbigpIHtcclxuICAgICAgICB0aGlzLl9zaWRlbmF2KHRoaXMuaWQpLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fc2lkZW5hdih0aGlzLmlkKS5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGUoKSB7XHJcbiAgICAgICAgdGhpcy5fc2lkZW5hdih0aGlzLmlkKS50b2dnbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHNbcGFydF0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kZW1pdChTaWRlTmF2Q2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTaWRlTmF2UHJvdmlkZXIgaW1wbGVtZW50cyBJU2lkZU5hdlByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogU2lkZU5hdkNvbmZpZyA9IHtcclxuICAgICAgICBwYXJ0czoge30sXHJcbiAgICAgICAgY2xhc3NlczogW10sXHJcbiAgICAgICAgdHlwZTogJ3N0aWNreScsXHJcbiAgICAgICAgc3RhdGU6IG51bGwsXHJcbiAgICAgICAgdmlzaWJsZTogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBTaWRlTmF2U2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBTaWRlTmF2Q29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29uZmlnKHZhbHVlOiBTaWRlTmF2Q29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsdWUgfHwgbmV3IFNpZGVOYXZDb25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcnRzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhcnRzKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHMgPSB2YWx1ZSB8fCB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB2aXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsYXNzZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNsYXNzZXModmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaChjKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBfLnJlamVjdCh0aGlzLl9jb25maWcuY2xhc3NlcywgKGNjKSA9PiBjYyA9PSBjKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHNbcGFydF0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSwgJG1kU2lkZW5hdjogbmcubWF0ZXJpYWwuSVNpZGVuYXZTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IFNpZGVOYXZTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSwgJG1kU2lkZW5hdik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBob29rU2lkZU5hdkV2ZW50cygkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSwgcGlwU2lkZU5hdjogSVNpZGVOYXZTZXJ2aWNlKSB7XHJcbiAgICAkcm9vdFNjb3BlLiRvbihPcGVuU2lkZU5hdkV2ZW50LCAoKSA9PiB7IHBpcFNpZGVOYXYub3BlbigpOyB9KTtcclxuICAgICRyb290U2NvcGUuJG9uKENsb3NlU2lkZU5hdkV2ZW50LCAoKSA9PiB7IHBpcFNpZGVOYXYuY2xvc2UoKTsgfSk7XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcFNpZGVOYXYnKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBTaWRlTmF2JywgU2lkZU5hdlByb3ZpZGVyKVxyXG4gICAgLnJ1bihob29rU2lkZU5hdkV2ZW50cyk7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuICAgIGZ1bmN0aW9uIFN0aWNreVNpZGVOYXZEaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRyb290U2NvcGUsICRpbmplY3RvciwgJG1kTWVkaWEsICR0aW1lb3V0LCBwaXBTaWRlTmF2KSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICAvLyB2YXIgcGlwTWVkaWEgPSAkbWRNZWRpYSwgXHJcbiAgICAgICAgdmFyIHBpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsLFxyXG4gICAgICAgICAgICBtYWluQ29udGFpbmVyID0gJy5waXAtbWFpbicsXHJcbiAgICAgICAgICAgIGJpZ1dpZHRoID0gMzIwLCAvLyBleHBhbmRlZCBzaWRlbmF2IHdpZHRoXHJcbiAgICAgICAgICAgIG1pZGRsZVdpZHRoID0gMjQwLFxyXG4gICAgICAgICAgICBzbWFsbFdpZHRoID0gNzIsIC8vIHNocmluayBzaWRlbmF2IHdpZHRoXHJcbiAgICAgICAgICAgIGlzUmVzaXppbmcgPSBmYWxzZSxcclxuICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb24gPSA2MDAsXHJcbiAgICAgICAgICAgIG1lZGlhQnJlYWtwb2ludHM7XHJcblxyXG4gICAgICAgIHBpcE1lZGlhID0gcGlwTWVkaWEgIT09IHVuZGVmaW5lZCA/IHBpcE1lZGlhIDogJG1kTWVkaWE7XHJcblxyXG4gICAgICAgICRzY29wZS5uYXZTdGF0ZSA9IHtcclxuICAgICAgICAgICAgdG9nZ2xlOiB7IC8vIG1lZGlhKHNtLCB4cylcclxuICAgICAgICAgICAgICAgIGlkOiAndG9nZ2xlJyxcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzOiAnc2lkZW5hdi1tb2JpbGUnLCAvLyBjaGFuZ2Ugc2l6ZSwgY29sb3IsIHNlbGVjdGVkP1xyXG4gICAgICAgICAgICAgICAgc2hvd0hlYWRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGlzTG9ja2VkT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBleHBhbmRlZEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0V4cGFuZGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0ljb25Ub29sdHlwZTogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc21hbGw6IHsgLy8gbWVkaWEobWQpXHJcbiAgICAgICAgICAgICAgICBpZDogJ3NtYWxsJyxcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzOiAncGlwLXN0aWNreS1uYXYtc21hbGwgc2lkZW5hdi1zbWFsbGRlc2t0b3AnLCAvLyBjaGFuZ2Ugc2l6ZSwgY29sb3IsIHNlbGVjdGVkP1xyXG4gICAgICAgICAgICAgICAgc2hvd0hlYWRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0xvY2tlZE9wZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBleHBhbmRlZEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0V4cGFuZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93SWNvblRvb2x0eXBlOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxhcmdlOiB7IC8vIG1lZGlhKGxnKVxyXG4gICAgICAgICAgICAgICAgaWQ6ICdsYXJnZScsXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogJ3NpZGVuYXYtc21hbGxkZXNrdG9wJywgLy8gY2hhbmdlIHNpemUsIGNvbG9yLCBzZWxlY3RlZD9cclxuICAgICAgICAgICAgICAgIHNob3dIZWFkZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNMb2NrZWRPcGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kZWRCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpc0V4cGFuZGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0ljb25Ub29sdHlwZTogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB4bGFyZ2U6IHsgLy8gbWVkaWEoeGwpXHJcbiAgICAgICAgICAgICAgICBpZDogJ3hsYXJnZScsXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogJ3NpZGVuYXYtZGVza3RvcCcsIC8vIGNoYW5nZSBzaXplLCBjb2xvciwgc2VsZWN0ZWQ/XHJcbiAgICAgICAgICAgICAgICBzaG93SGVhZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGlzTG9ja2VkT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZGVkQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGlzRXhwYW5kZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBleHBhbmQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaG93SWNvblRvb2x0eXBlOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbWVkaWFCcmVha3BvaW50cyA9IHNldEJyZWFrcG9pbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtc3RpY2t5LXNpZGVuYXYnKTtcclxuXHJcbiAgICAgICAgaWYgKHBpcFNpZGVOYXYuY29uZmlnICYmIHBpcFNpZGVOYXYuY29uZmlnLnR5cGUgIT0gJ3BvcHVwJykge1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTaWRlTmF2ZVN0YXRlKClcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB3aW5kb3dSZXNpemUgPSBfLmRlYm91bmNlKHNldFNpZGVOYXZlU3RhdGUsIDEwKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcE1haW5SZXNpemVkJywgd2luZG93UmVzaXplKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcFNpZGVOYXZTdGF0ZScsIG9uU2lkZU5hdlN0YXRlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpc1Jlc2l6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5zaWRlbmF2U3RhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZSgndG9nZ2xlJyk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcE5hdkljb25DbGlja2VkJywgb25OYXZJY29uQ2xpY2spO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2Q2hhbmdlZCcsIG9uU2lkZU5hdkNoYW5nZWQpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0QnJlYWtwb2ludHMoKSB7XHJcbiAgICAgICAgICAgIGlmICghcGlwTWVkaWEgfHwgIWFuZ3VsYXIuaXNPYmplY3QocGlwTWVkaWEuYnJlYWtwb2ludHMpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4czogNjM5LCBzbTogOTU5LCBtZDogMTAyNCwgbGc6IDE5MTkgfTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwaXBNZWRpYS5icmVha3BvaW50cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25TaWRlTmF2Q2hhbmdlZChldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBjb25maWcgPSBjb25maWcgfHwge307XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnLnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25OYXZJY29uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICAgICAgcGlwU2lkZU5hdi5vcGVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblNpZGVOYXZTdGF0ZShldmVudCwgc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoc3RhdGUpICYmICRzY29wZS5uYXZTdGF0ZVtzdGF0ZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhdGUoc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRTaWRlTmF2ZVN0YXRlKCkge1xyXG4gICAgICAgICAgICBpZiAoaXNSZXNpemluZykge1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoc2V0U2lkZU5hdmVTdGF0ZSwgYW5pbWF0aW9uRHVyYXRpb24pOyAvLyBmb3IgXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgbWFpbldpZHRoID0gJChtYWluQ29udGFpbmVyKS5pbm5lcldpZHRoKCk7XHJcbiAgICAgICAgICAgIGxldCBzaWRlTmF2V2lkdGggPSAkKCcucGlwLXN0aWNreS1zaWRlbmF2JykuaW5uZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFdpZHRoID0gc2lkZU5hdldpZHRoID8gc2lkZU5hdldpZHRoICsgMiA6IDA7IC8vIGFkZCBib3JkZXIgd2lkdGhcclxuXHJcbiAgICAgICAgICAgIGlmIChtYWluV2lkdGggKyBjdXJyZW50V2lkdGggPCBtZWRpYUJyZWFrcG9pbnRzLnNtICkge1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhdGUoJ3RvZ2dsZScsICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKG1haW5XaWR0aCArIGN1cnJlbnRXaWR0aCA8IG1lZGlhQnJlYWtwb2ludHMubWQgKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZSgnc21hbGwnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICBpZiAobWFpbldpZHRoICsgY3VycmVudFdpZHRoIDwgbWVkaWFCcmVha3BvaW50cy5sZyApIHtcclxuICAgICAgICAgICAgICAgIHNldFN0YXRlKCdsYXJnZScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICAgICAgc2V0U3RhdGUoJ3hsYXJnZScpOyAgICAgXHJcbiAgICAgICAgICAgIC8vIGlmIChtYWluV2lkdGggPCBtZWRpYUJyZWFrcG9pbnRzLnNtKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBzZXRTdGF0ZSgndG9nZ2xlJyk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGlmIChtYWluV2lkdGggPCBtZWRpYUJyZWFrcG9pbnRzLm1kICsgc21hbGxXaWR0aCAmJiBtYWluV2lkdGggPj0gbWVkaWFCcmVha3BvaW50cy5zbSArIHNtYWxsV2lkdGgpIHtcclxuICAgICAgICAgICAgLy8gICAgIHNldFN0YXRlKCdzbWFsbCcpO1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGlmIChtYWluV2lkdGggPj0gbWVkaWFCcmVha3BvaW50cy5tZCArIGJpZ1dpZHRoICYmIG1haW5XaWR0aCA8PSBtZWRpYUJyZWFrcG9pbnRzLmxnKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBzZXRTdGF0ZSgnbGFyZ2UnKTtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBpZiAobWFpbldpZHRoID4gbWVkaWFCcmVha3BvaW50cy5sZykge1xyXG4gICAgICAgICAgICAvLyAgICAgc2V0U3RhdGUoJ3hsYXJnZScpO1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAoISRzY29wZS5zaWRlbmF2U3RhdGUgfHwgISRzY29wZS5zaWRlbmF2U3RhdGUuaWQpIHtcclxuICAgICAgICAgICAgLy8gICAgIGlmIChtYWluV2lkdGggPCBtZWRpYUJyZWFrcG9pbnRzLnNtICsgc21hbGxXaWR0aCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHNldFN0YXRlKCd0b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgaWYgKG1haW5XaWR0aCA+IG1lZGlhQnJlYWtwb2ludHMubWQgKyBiaWdXaWR0aCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHNldFN0YXRlKCdsYXJnZScpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIHNldFN0YXRlKCdzbWFsbCcpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChpc1Jlc2l6aW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2lkZW5hdlN0YXRlICYmICRzY29wZS5zaWRlbmF2U3RhdGUuaWQgPT0gc3RhdGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSAhPSAndG9nZ2xlJykge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtbW9iaWxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSAhPSAnc21hbGwnKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygncGlwLXN0aWNreS1uYXYtc21hbGwnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlICE9ICd4bGFyZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnc2lkZW5hdi1kZXNrdG9wJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSAhPSAnbGFyZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnc2lkZW5hdi1zbWFsbGRlc2t0b3AnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKHN0YXRlID09ICd0b2dnbGUnKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnc2lkZW5hdi1kZXNrdG9wJyk7XHJcbiAgICAgICAgICAgIC8vICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnc2lkZW5hdi1kZXNrdG9wJyk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaXNSZXNpemluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PSAndG9nZ2xlJykge1xyXG4gICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS5zaWRlbmF2U3RhdGUgPSAkc2NvcGUubmF2U3RhdGVbc3RhdGVdO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygkc2NvcGUuc2lkZW5hdlN0YXRlLmFkZENsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIHBpcFNpZGVOYXYuc3RhdGUgPSAkc2NvcGUuc2lkZW5hdlN0YXRlO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBzaWRlTmF2IFN0YXRlXHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNldFNpZGVOYXZlU3RhdGUoKVxyXG4gICAgICAgICAgICB9LCAxNSk7XHJcblxyXG4gICAgICAgICAgICAvLyBjb21wbGV0ZSBhbmltYXRpb25cclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaXNSZXNpemluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCBhbmltYXRpb25EdXJhdGlvbik7IC8vYW5pbWF0aW9uRHVyYXRpb25cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0aWNreVNpZGVOYXZEaXJlY3RpdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2NvcGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2lkZW5hdi9TdGlja3lTaWRlTmF2Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBTdGlja3lTaWRlTmF2RGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcFNpZGVOYXYnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcFN0aWNreVNpZGVuYXYnLCBzdGlja3lTaWRlTmF2RGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcFNpZGVOYXYnLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9TaWRlTmF2U2VydmljZSc7XHJcbmltcG9ydCAnLi9TaWRlTmF2UGFydERpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9TdGlja3lTaWRlTmF2RGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vU2lkZU5hdlNlcnZpY2UnOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuICAgIGZ1bmN0aW9uIFRhYnNEaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG1kTWVkaWEsICRpbmplY3RvciwgJHJvb3RTY29wZSwgJHBhcnNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXIgcGlwVGhlbWUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUaGVtZScpID8gJGluamVjdG9yLmdldCgncGlwVGhlbWUnKSA6IG51bGwsXHJcbiAgICAgICAgICAgIHBpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsLFxyXG4gICAgICAgICAgICBjdXJyZW50VGhlbWUgPSAnZGVmYXVsdCc7XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZCA9IHt9O1xyXG5cclxuICAgICAgICBpZiAocGlwVGhlbWUpXHJcbiAgICAgICAgICAgIGN1cnJlbnRUaGVtZSA9IHBpcFRoZW1lLnVzZSgpO1xyXG4gICAgICAgIGVsc2UgaWYgKCRyb290U2NvcGUuJHRoZW1lKVxyXG4gICAgICAgICAgICBjdXJyZW50VGhlbWUgPSAkcm9vdFNjb3BlLiR0aGVtZTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNsYXNzID0gKCRhdHRycy5jbGFzcyB8fCAnJykgKyAnIG1kLScgKyBjdXJyZW50VGhlbWUgKyAnLXRoZW1lJztcclxuXHJcbiAgICAgICAgaWYgKHBpcFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnRhYnMubGVuZ3RoID4gMCAmJiAkc2NvcGUudGFic1swXS50aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZU9iamVjdHMoJHNjb3BlLnRhYnMsICd0aXRsZScsICduYW1lTG9jYWwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGVPYmplY3RzKCRzY29wZS50YWJzLCAnbmFtZScsICduYW1lTG9jYWwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLm1lZGlhID0gcGlwTWVkaWEgIT09IHVuZGVmaW5lZCA/IHBpcE1lZGlhIDogJG1kTWVkaWE7XHJcbiAgICAgICAgJHNjb3BlLnRhYnMgPSAoJHNjb3BlLnRhYnMgJiYgXy5pc0FycmF5KCRzY29wZS50YWJzKSkgPyAkc2NvcGUudGFicyA6IFtdO1xyXG5cclxuICAgICAgICB2YXIgcGlwVHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcbiAgICAgICAgaWYgKHBpcFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnRhYnMubGVuZ3RoID4gMCAmJiAkc2NvcGUudGFic1swXS50aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZU9iamVjdHMoJHNjb3BlLnRhYnMsICd0aXRsZScsICduYW1lTG9jYWwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGVPYmplY3RzKCRzY29wZS50YWJzLCAnbmFtZScsICduYW1lTG9jYWwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4ID0gJHNjb3BlLmFjdGl2ZUluZGV4IHx8IDA7XHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZVRhYiA9ICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleDtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRpc2FibGVkID0gZGlzYWJsZWQ7XHJcbiAgICAgICAgJHNjb3BlLnRhYkRpc2FibGVkID0gdGFiRGlzYWJsZWQ7XHJcbiAgICAgICAgJHNjb3BlLm9uU2VsZWN0ID0gb25TZWxlY3Q7XHJcbiAgICAgICAgJHNjb3BlLnNob3dTaGFkb3cgPSBzaG93U2hhZG93O1xyXG4gICAgICAgICRzY29wZS5zaG93ID0gc2hvdztcclxuXHJcbiAgICAgICAgaWYgKHRvQm9vbGVhbigkYXR0cnMucGlwUmViaW5kKSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCdhY3RpdmVJbmRleCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4ID0gbmV3VmFsdWUgfHwgMDtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZC5hY3RpdmVUYWIgPSAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRpc2FibGVkKCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLm5nRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUubmdEaXNhYmxlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdGFiRGlzYWJsZWQoaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgkc2NvcGUuZGlzYWJsZWQoKSAmJiAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXggIT0gaW5kZXgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU2VsZWN0KGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuZGlzYWJsZWQoKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAkc2NvcGUuYWN0aXZlSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZC5hY3RpdmVUYWIgPSAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0KCRzY29wZS50YWJzWyRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleF0sICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93U2hhZG93KCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNob3dUYWJzU2hhZG93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNob3dUYWJzU2hhZG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93KCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNob3dUYWJzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNob3dUYWJzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvQm9vbGVhbih2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT0gJzEnIHx8IHZhbHVlID09ICd0cnVlJztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiB0YWJzRGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBuZ0Rpc2FibGVkOiAnJicsXHJcbiAgICAgICAgICAgICAgICB0YWJzOiAnPXBpcFRhYnMnLFxyXG4gICAgICAgICAgICAgICAgc2hvd1RhYnM6ICcmcGlwU2hvd1RhYnMnLFxyXG4gICAgICAgICAgICAgICAgc2hvd1RhYnNTaGFkb3c6ICcmcGlwVGFic1NoYWRvdycsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleDogJz1waXBBY3RpdmVJbmRleCcsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Q6ICc9cGlwVGFic1NlbGVjdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0YWJzL1RhYnMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFRhYnNEaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJwaXBUYWJzXCIsIFsncGlwTmF2LlRlbXBsYXRlcyddKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcFRhYnMnLCB0YWJzRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2FjdGlvbnMvUHJpbWFyeUFjdGlvbnMuaHRtbCcsXG4gICAgJzxtZC1tZW51IG1kLXBvc2l0aW9uLW1vZGU9XCJ0YXJnZXQtcmlnaHQgdGFyZ2V0XCIgY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zXCIgbmctcmVwZWF0PVwiYWN0aW9uIGluIGNvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zXCI+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnMtYWN0aW9uIG1kLWljb24tYnV0dG9uXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihhY3Rpb24sICRtZE9wZW5NZW51KTtcIiBuZy1oaWRlPVwiaXNIaWRkZW4oYWN0aW9uKVwiIGFyaWEtbGFiZWw9XCJ7e2FjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19XCI+PGRpdiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnMtYmFkZ2VcIiBuZy1zaG93PVwiYWN0aW9uLmNvdW50ID4gMFwiPnt7YWN0aW9uQ291bnQoYWN0aW9uKX19PC9kaXY+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e2FjdGlvbi5pY29ufX1cIj48L21kLWljb24+PC9tZC1idXR0b24+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cInN1YkFjdGlvbiBpbiBhY3Rpb24uc3ViQWN0aW9uc1wiIG5nLWlmPVwiIXN1YkFjdGlvbi5kaXZpZGVyXCIgbmctaGlkZT1cImlzSGlkZGVuKHN1YkFjdGlvbilcIj48bWQtYnV0dG9uIG5nLWhpZGU9XCJzdWJBY3Rpb24uZGl2aWRlclwiIG5nLWNsaWNrPVwiY2xpY2tBY3Rpb24oc3ViQWN0aW9uKVwiPnt7OjpzdWJBY3Rpb24udGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJzdWJBY3Rpb24uZGl2aWRlclwiIG5nLXJlcGVhdC1lbmQ9XCJcIj48L21kLW1lbnUtZGl2aWRlcj48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+PG1kLW1lbnUgbWQtcG9zaXRpb24tbW9kZT1cInRhcmdldC1yaWdodCB0YXJnZXRcIiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnNcIiBuZy1yZXBlYXQ9XCJhY3Rpb24gaW4gY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zXCI+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnMtYWN0aW9uIG1kLWljb24tYnV0dG9uXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihhY3Rpb24sICRtZE9wZW5NZW51KTtcIiBuZy1oaWRlPVwiaXNIaWRkZW4oYWN0aW9uKVwiIGFyaWEtbGFiZWw9XCJ7e2FjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19XCI+PGRpdiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnMtYmFkZ2UgY29sb3ItYmFkZ2UtYmdcIiBuZy1zaG93PVwiYWN0aW9uLmNvdW50ID4gMFwiPnt7YWN0aW9uQ291bnQoYWN0aW9uKX19PC9kaXY+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e2FjdGlvbi5pY29ufX1cIj48L21kLWljb24+PC9tZC1idXR0b24+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cInN1YkFjdGlvbiBpbiBhY3Rpb24uc3ViQWN0aW9uc1wiIG5nLWlmPVwiIXN1YkFjdGlvbi5kaXZpZGVyXCIgbmctaGlkZT1cImlzSGlkZGVuKHN1YkFjdGlvbilcIj48bWQtYnV0dG9uIG5nLWhpZGU9XCJzdWJBY3Rpb24uZGl2aWRlclwiIG5nLWNsaWNrPVwiY2xpY2tBY3Rpb24oc3ViQWN0aW9uKVwiPnt7c3ViQWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwic3ViQWN0aW9uLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9ucy5odG1sJyxcbiAgICAnPG1kLW1lbnUgbmctaWY9XCJzZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSgpXCIgbWQtcG9zaXRpb24tbW9kZT1cInRhcmdldC1yaWdodCB0YXJnZXRcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiBuZy1jbGljaz1cIm9uU2Vjb25kYXJ5QWN0aW9uQ2xpY2soKTsgb3Blbk1lbnUoJG1kT3Blbk1lbnUsICRldmVudCk7XCIgYXJpYS1sYWJlbD1cIm9wZW4gYWN0aW9uc1wiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6dmRvdHNcIj48L21kLWljb24+PC9tZC1idXR0b24+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cImFjdGlvbiBpbiBjb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zXCIgbmctaWY9XCIhYWN0aW9uLmRpdmlkZXJcIiBuZy1oaWRlPVwiaXNIaWRkZW4oYWN0aW9uKVwiPjxtZC1idXR0b24gbmctaGlkZT1cImFjdGlvbi5kaXZpZGVyXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihhY3Rpb24pXCI+e3s6OmFjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cImFjdGlvbi5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJzZWNvbmRhcnlEaXZpZGVyVmlzaWJsZSgpXCI+PC9tZC1tZW51LWRpdmlkZXI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQtc3RhcnQ9XCJhY3Rpb24gaW4gY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnNcIiBuZy1pZj1cIiFhY3Rpb24uZGl2aWRlclwiIG5nLWhpZGU9XCJpc0hpZGRlbihhY3Rpb24pXCI+PG1kLWJ1dHRvbiBuZy1oaWRlPVwiYWN0aW9uLmRpdmlkZXJcIiBuZy1jbGljaz1cImNsaWNrQWN0aW9uKGFjdGlvbilcIj57ezo6YWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwiYWN0aW9uLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2FwcGJhci9BcHBCYXIuaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIGNsYXNzPVwie3sgY29uZmlnLmNsYXNzZXMuam9pbihcXCcgXFwnKSB9fVwiIG5nLWlmPVwiY29uZmlnLnZpc2libGVcIiBuZy10cmFuc2NsdWRlPVwiXCI+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2JyZWFkY3J1bWIvQnJlYWRjcnVtYi5odG1sJyxcbiAgICAnPGRpdiBzdHlsZT1cImhlaWdodDogMjNweDtcIj48ZGl2IGNsYXNzPVwiaGlkZS14cyB0ZXh0LW92ZXJmbG93XCI+PHNwYW4gbmctaWY9XCJ2bS5jb25maWcuY3JpdGVyaWFcIiBuZy1jbGljaz1cInZtLm9wZW5TZWFyY2goKVwiPnt7dm0uY29uZmlnLmNyaXRlcmlhfX0gLTwvc3Bhbj48c3BhbiBjbGFzcz1cInBpcC1icmVhZGNydW1iLWl0ZW0ge3skbGFzdCA/IFxcJ2JyZWFkY3J1bWItYWNjZW50XFwnIDogXFwnXFwnfX1cIiBuZy1pZj1cInZtLmNvbmZpZy5pdGVtcyAmJiB2bS5jb25maWcuaXRlbXMubGVuZ3RoID4gMFwiIG5nLXJlcGVhdC1zdGFydD1cIml0ZW0gaW4gdm0uY29uZmlnLml0ZW1zXCIgbmctY2xpY2s9XCJ2bS5vbkNsaWNrKGl0ZW0pXCIgbmctaW5pdD1cInN0ZXBXaWR0aCA9IDEwMC8odm0uY29uZmlnLml0ZW1zLmxlbmd0aCArIDEpXCIgbmctY2xhc3M9XCJ7XFwnY3Vyc29yLXBvaW50ZXJcXCc6ICEkbGFzdH1cIiBuZy1zdHlsZT1cIntcXCdtYXgtd2lkdGhcXCc6IHN0ZXBXaWR0aCArIFxcJyVcXCd9XCI+PHNwYW4gY2xhc3M9XCJoaWRlLXhzXCIgbmctaWY9XCIhJGxhc3QgfHwgIXZtLmFjdGlvbnNWaXNpYmxlKGl0ZW0pXCI+e3tpdGVtLnRpdGxlIHwgdHJhbnNsYXRlfX08L3NwYW4+PGRpdiBuZy1pZj1cIiRsYXN0ICYmIHZtLmFjdGlvbnNWaXNpYmxlKGl0ZW0pXCIgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTtcIj48bWQtbWVudSBjbGFzcz1cImhpZGUteHNcIiBtZC1vZmZzZXQ9XCIwIDQ0XCI+PHNwYW4gY2xhc3M9XCJsYXlvdXQtcm93IHBpcC1icmVhZGNydW1iLWl0ZW0tbWVudSBjdXJzb3ItcG9pbnRlciB7eyRsYXN0ID8gXFwnYnJlYWRjcnVtYi1hY2NlbnRcXCcgOiBcXCdcXCd9fVwiIG5nLWNsaWNrPVwidm0ub25PcGVuTWVudSgkbWRPcGVuTWVudSwgJGV2ZW50KVwiIG1kLWluay1yaXBwbGU9XCJcIiBhcmlhLWxhYmVsPVwib3BlbiBicmVhZGNydW1iIGFjdGlvbnNcIj57e2l0ZW0udGl0bGUgfCB0cmFuc2xhdGV9fTxtZC1pY29uIGNsYXNzPVwicGlwLXRyaWFuZ2xlLWRvd25cIiBtZC1zdmctaWNvbj1cImljb25zOnRyaWFuZ2xlLWRvd25cIj48L21kLWljb24+PC9zcGFuPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCI0XCI+PG1kLW1lbnUtaXRlbSBuZy1pZj1cIiFzdWJJdGVtLmRpdmlkZXJcIiBuZy1yZXBlYXQtc3RhcnQ9XCJzdWJJdGVtIGluIGl0ZW0uc3ViQWN0aW9uc1wiPjxtZC1idXR0b24gbmctY2xpY2s9XCJ2bS5vblN1YkFjdGlvbkNsaWNrKHN1Ykl0ZW0pXCIgbmctaGlkZT1cImFjdGlvbi5kaXZpZGVyXCI+PG1kLWljb24gbWQtbWVudS1hbGlnbi10YXJnZXQ9XCJcIiBuZy1pZj1cInN1Ykl0ZW0uaWNvblwiIG1kLXN2Zy1pY29uPVwie3tzdWJJdGVtLmljb259fVwiPjwvbWQtaWNvbj48c3Bhbj57e3N1Ykl0ZW0udGl0bGUgfCB0cmFuc2xhdGV9fTwvc3Bhbj48L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwic3ViSXRlbS5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT48L2Rpdj48L3NwYW4+PG1kLWljb24gbmctcmVwZWF0LWVuZD1cIlwiIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y2hldnJvbi1yaWdodFwiIG5nLWhpZGU9XCIkbGFzdFwiPjwvbWQtaWNvbj48c3BhbiBjbGFzcz1cInBpcC10aXRsZSBicmVhZGNydW1iLWFjY2VudFwiIG5nLWlmPVwidm0uY29uZmlnLnRleHRcIj57e3ZtLmNvbmZpZy50ZXh0IHwgdHJhbnNsYXRlfX08L3NwYW4+PC9kaXY+PGRpdiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIiBjbGFzcz1cImhpZGUtZ3QteHNcIj48bWQtbWVudSBtZC1vZmZzZXQ9XCIwIDQ0XCI+PHNwYW4gY2xhc3M9XCJwaXAtbW9iaWxlLWJyZWFkY3J1bWIgbGF5b3V0LXJvd1wiIG5nLWNsaWNrPVwidm0uY29uZmlnLml0ZW1zICYmIHZtLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAxID8gJG1kT3Blbk1lbnUoKSA6IHJldHVyblwiIGFyaWEtbGFiZWw9XCJvcGVuIGJyZWFkY3J1bWJcIj48c3BhbiBjbGFzcz1cInRleHQtb3ZlcmZsb3dcIj48c3BhbiBuZy1pZj1cInZtLmNvbmZpZy5jcml0ZXJpYVwiIG5nLWNsaWNrPVwidm0ub3BlblNlYXJjaCgpXCI+e3t2bS5jb25maWcuY3JpdGVyaWF9fSAtPC9zcGFuPiA8c3BhbiBjbGFzcz1cImJyZWFkY3J1bWItYWNjZW50XCIgbmctaWY9XCJ2bS5jb25maWcudGV4dFwiPnt7dm0uY29uZmlnLnRleHQgfCB0cmFuc2xhdGV9fTwvc3Bhbj4gPHNwYW4gbmctaWY9XCJ2bS5jb25maWcuaXRlbXMgJiYgdm0uY29uZmlnLml0ZW1zLmxlbmd0aCA+IDBcIiBjbGFzcz1cImJyZWFkY3J1bWItYWNjZW50IHt7KHZtLmNvbmZpZy5pdGVtcyAmJiB2bS5jb25maWcuaXRlbXMubGVuZ3RoID4gMSkgPyBcXCdjdXJzb3ItcG9pbnRlclxcJyA6IFxcJ1xcJyB9fVwiPnt7dm0uY29uZmlnLml0ZW1zW3ZtLmNvbmZpZy5pdGVtcy5sZW5ndGggLSAxXS50aXRsZSB8IHRyYW5zbGF0ZX19PC9zcGFuPjwvc3Bhbj48bWQtaWNvbiBjbGFzcz1cInBpcC10cmlhbmdsZS1kb3duIGN1cnNvci1wb2ludGVyIGJyZWFkY3J1bWItYWNjZW50XCIgbWQtc3ZnLWljb249XCJpY29uczp0cmlhbmdsZS1kb3duXCIgbmctaWY9XCJ2bS5jb25maWcuaXRlbXMgJiYgdm0uY29uZmlnLml0ZW1zLmxlbmd0aCA+IDFcIj48L21kLWljb24+PC9zcGFuPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCI0XCI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQ9XCJpdGVtIGluIHZtLmNvbmZpZy5pdGVtc1wiIG5nLWlmPVwidm0uY29uZmlnLml0ZW1zICYmIHZtLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAwXCI+PG1kLWJ1dHRvbiBuZy1jbGljaz1cInZtLm9uQ2xpY2soaXRlbSlcIj48bWQtaWNvbiBtZC1tZW51LWFsaWduLXRhcmdldD1cIlwiIG5nLWlmPVwiaXRlbS5pY29uXCIgbWQtc3ZnLWljb249XCJ7e2l0ZW0uaWNvbn19XCI+PC9tZC1pY29uPjxzcGFuPnt7aXRlbS50aXRsZSB8IHRyYW5zbGF0ZX19PC9zcGFuPjwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWl0ZW0gbmctaWY9XCJ2bS5jb25maWcudGV4dFwiPjxtZC1idXR0b24+PHNwYW4gY2xhc3M9XCJ0ZXh0LWdyZXlcIj57e3ZtLmNvbmZpZy50ZXh0IHwgdHJhbnNsYXRlfX08L3NwYW4+PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PjwvZGl2PjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Ryb3Bkb3duL0Ryb3Bkb3duLmh0bWwnLFxuICAgICc8bWQtdG9vbGJhciBjbGFzcz1cIm1kLXN1YmhlYWQgY29sb3ItcHJpbWFyeS1iZyB7e2NsYXNzfX1cIiBuZy1pZj1cInNob3coKVwiIG5nLWNsYXNzPVwie1xcJ21kLXdoaXRlZnJhbWUtM2RwXFwnOiBtZWRpYShcXCd4c1xcJyl9XCI+PGRpdiBjbGFzcz1cInBpcC1kaXZpZGVyXCI+PC9kaXY+PG1kLXNlbGVjdCBuZy1tb2RlbD1cInNlbGVjdGVkSW5kZXhcIiBuZy1kaXNhYmxlZD1cImRpc2FibGVkKClcIiBtZC1jb250YWluZXItY2xhc3M9XCJwaXAtZnVsbC13aWR0aC1kcm9wZG93blwiIGFyaWEtbGFiZWw9XCJEUk9QRE9XTlwiIG1kLWluay1yaXBwbGU9XCJcIiBtZC1vbi1jbG9zZT1cIm9uU2VsZWN0KHNlbGVjdGVkSW5kZXgpXCI+PG1kLW9wdGlvbiBuZy1yZXBlYXQ9XCJhY3Rpb24gaW4gYWN0aW9uc1wiIHZhbHVlPVwie3sgOjokaW5kZXggfX1cIiBuZy1zZWxlY3RlZD1cImFjdGl2ZUluZGV4ID09ICRpbmRleCA/IHRydWUgOiBmYWxzZVwiPnt7IChhY3Rpb24udGl0bGUgfHwgYWN0aW9uLm5hbWUgfHwgYWN0aW9uKSB8IHRyYW5zbGF0ZSB9fTwvbWQtb3B0aW9uPjwvbWQtc2VsZWN0PjwvbWQtdG9vbGJhcj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdoZWFkZXIvU3RpY2t5TmF2SGVhZGVyLmh0bWwnLFxuICAgICc8bWQtdG9vbGJhciBuZy1zaG93PVwic2hvd0hlYWRlclwiIGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyXCI+PGRpdiBjbGFzcz1cImZsZXgtZml4ZWQgcGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXJcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiBuZy1jbGljaz1cIm9uVXNlckNsaWNrKClcIiBhcmlhLWxhYmVsPVwiY3VycmVudCB1c2VyXCI+PGltZyBzcmM9XCJcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLWltYWdlXCIgbmctY2xhc3M9XCJpbWFnZUNzc1wiPjwvbWQtYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci10ZXh0XCI+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLXByaVwiIG5nLWNsaWNrPVwib25Vc2VyQ2xpY2soKVwiPnt7IHRpdGxlIHwgdHJhbnNsYXRlIH19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLXNlY1wiPnt7IHN1YnRpdGxlIHwgdHJhbnNsYXRlIH19PC9kaXY+PC9kaXY+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2ljb24vTmF2SWNvbi5odG1sJyxcbiAgICAnPG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWljb24tYnV0dG9uIHBpcC1uYXYtaWNvblwiIG5nLWlmPVwiY29uZmlnLnR5cGUgIT0gXFwnbm9uZVxcJ1wiIG5nLWNsYXNzPVwiY29uZmlnLmNsYXNzXCIgbmctY2xpY2s9XCJvbk5hdkljb25DbGljaygpXCIgYXJpYS1sYWJlbD1cIm1lbnVcIj48bWQtaWNvbiBuZy1pZj1cImNvbmZpZy50eXBlPT1cXCdtZW51XFwnXCIgbWQtc3ZnLWljb249XCJpY29uczptZW51XCI+PC9tZC1pY29uPjxpbWcgbmctc3JjPVwie3tjb25maWcuaW1hZ2VVcmx9fVwiIG5nLWlmPVwiY29uZmlnLnR5cGU9PVxcJ2ltYWdlXFwnXCIgaGVpZ2h0PVwiMjRcIiB3aWR0aD1cIjI0XCI+PG1kLWljb24gbmctaWY9XCJjb25maWcudHlwZT09XFwnYmFja1xcJ1wiIG1kLXN2Zy1pY29uPVwiaWNvbnM6YXJyb3ctbGVmdFwiPjwvbWQtaWNvbj48bWQtaWNvbiBuZy1pZj1cImNvbmZpZy50eXBlPT1cXCdpY29uXFwnXCIgbWQtc3ZnLWljb249XCJ7e2NvbmZpZy5pY29ufX1cIj48L21kLWljb24+PC9tZC1idXR0b24+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbGFuZ3VhZ2UvTGFuZ3VhZ2VQaWNrZXIuaHRtbCcsXG4gICAgJzxtZC1tZW51IG1kLXBvc2l0aW9uLW1vZGU9XCJ0YXJnZXQtcmlnaHQgdGFyZ2V0XCI+PHNwYW4gY2xhc3M9XCJwaXAtbGFuZ3VhZ2VcIiBuZy1jbGljaz1cIiRtZE9wZW5NZW51KClcIiBhcmlhLWxhYmVsPVwibGFuZ3VhZ2Ugc2VsZWN0aW9uXCI+e3t2bS5sYW5ndWFnZSB8IHRyYW5zbGF0ZX19PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczp0cmlhbmdsZS1kb3duXCI+PC9tZC1pY29uPjwvc3Bhbj48bWQtbWVudS1jb250ZW50IHdpZHRoPVwiM1wiPjxtZC1tZW51LWl0ZW0gbmctcmVwZWF0PVwibGFuZ3VhZ2UgaW4gdm0ubGFuZ3VhZ2VzXCI+PG1kLWJ1dHRvbiBuZy1jbGljaz1cInZtLm9uTGFuZ3VhZ2VDbGljayhsYW5nKVwiPnt7bGFuZ3VhZ2UgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdzZWFyY2gvU2VhcmNoQmFyLmh0bWwnLFxuICAgICc8ZGl2IGNsYXNzPVwibWQtdG9vbGJhci10b29scyBwaXAtc2VhcmNoLWNvbnRhaW5lclwiIG5nLWlmPVwidm0uZW5hYmxlZFwiPjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IHBpcC1zZWFyY2gtc2VsZWN0ZWRcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiBhcmlhLWxhYmVsPVwic3RhcnQgc2VhcmNoXCIgbmctY2xpY2s9XCJ2bS5vbkNsaWNrKClcIj48bWQtaWNvbiBtZC1zdmctaWNvbj1cImljb25zOnNlYXJjaFwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj48aW5wdXQgY2xhc3M9XCJwaXAtc2VhcmNoLXRleHQgZmxleFwiIHR5cGU9XCJzZWFyY2hcIiBuZy1tb2RlbD1cInZtLnNlYXJjaC50ZXh0XCIgbmcta2V5ZG93bj1cInZtLm9uS2V5RG93bigkZXZlbnQpXCI+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWljb24tYnV0dG9uXCIgYXJpYS1sYWJlbD1cImNsZWFyIHNlYXJjaFwiIG5nLWNsaWNrPVwidm0uY2xlYXIoKVwiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y3Jvc3MtY2lyY2xlXCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJtZC10b29sYmFyLXRvb2xzIGxheW91dC1yb3cgbGF5b3V0LWFsaWduLWVuZC1jZW50ZXIgZmxleC1maXhlZCBscDAgcnAwXCIgbmctaWY9XCIhdm0uZW5hYmxlZFwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJzdGFydCBzZWFyY2hcIiBuZy1jbGljaz1cInZtLmVuYWJsZSgpXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpzZWFyY2hcIj48L21kLWljb24+PC9tZC1idXR0b24+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWVudS9TdGlja3lOYXZNZW51Lmh0bWwnLFxuICAgICc8bWQtbGlzdCBjbGFzcz1cInNpZGVuYXYtbGlzdFwiPjxtZC1saXN0LWl0ZW0gY2xhc3M9XCJwaXAtZm9jdXNhYmxlIG5vLWJvcmRlciBwaXAtc3RpY2t5LW5hdi1tZW51LWl0ZW0gcGlwLXN0aWNreS1uYXYtZXhwYW5kZWQtYnV0dG9uXCIgbmctY2xpY2s9XCJvbkV4cGFuZCgpXCIgbmctZGlzYWJsZWQ9XCIhaXNDb2xsYXBzZWRcIiBuZy1pZj1cImV4cGFuZGVkQnV0dG9uXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpjaGV2cm9uLWxlZnRcIiBuZy1pZj1cImV4cGFuZGVkXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb25cIj48bWQtdG9vbHRpcCBtZC12aXNpYmxlPVwic2hvd1Rvb2x0aXBcIiBuZy1zaG93PVwic2lkZU5hdlN0YXRlLnNob3dJY29uVG9vbHR5cGUgJiYgIWV4cGFuZGVkXCIgbWQtZGlyZWN0aW9uPVwicmlnaHRcIj57ezo6XFwnRXhwYW5kIG1lbnVcXCcgfCB0cmFuc2xhdGV9fTwvbWQtdG9vbHRpcD48L21kLWljb24+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpjaGV2cm9uLXJpZ2h0XCIgbmctaWY9XCIhZXhwYW5kZWRcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvblwiPjxtZC10b29sdGlwIG1kLXZpc2libGU9XCJzaG93VG9vbHRpcFwiIG5nLXNob3c9XCJzaWRlTmF2U3RhdGUuc2hvd0ljb25Ub29sdHlwZSAmJiAhZXhwYW5kZWRcIiBtZC1kaXJlY3Rpb249XCJyaWdodFwiPnt7OjpcXCdTaHJpbmsgbWVudVxcJyB8IHRyYW5zbGF0ZX19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48L21kLWxpc3QtaXRlbT48bWQtZGl2aWRlciBuZy1zaG93PVwiZXhwYW5kZWRCdXR0b25cIj48L21kLWRpdmlkZXI+PGRpdiBjbGFzcz1cInBpcC1zZWN0aW9uXCIgbmctcmVwZWF0PVwic2VjdGlvbiBpbiBzZWN0aW9uc1wiIG5nLWhpZGU9XCJzZWN0aW9uLmFjY2VzcyAmJiAhc2VjdGlvbi5hY2Nlc3Moc2VjdGlvbilcIj48bWQtZGl2aWRlciBuZy1zaG93PVwiJGluZGV4ID4gMCAmJiAhaXNTZWN0aW9uRW1wdHkoc2VjdGlvbi5saW5rcylcIj48L21kLWRpdmlkZXI+PG1kLXN1YmhlYWRlciBuZy1zaG93PVwic2VjdGlvbi50aXRsZVwiIHN0eWxlPVwiaGVpZ2h0OiA0OHB4O1wiPjxzcGFuIG5nLWlmPVwiZXhwYW5kZWRcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtdGl0bGUgc2VjdGlvbi10aXRsZVwiPnt7OjpzZWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L3NwYW4+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e3NlY3Rpb24uaWNvbn19XCIgbmctaWY9XCIhZXhwYW5kZWQgJiYgc2VjdGlvbi5pY29uXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgbmctc2hvdz1cInNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZFwiIG1kLWRpcmVjdGlvbj1cInJpZ2h0XCI+e3s6OnNlY3Rpb24udGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtdG9vbHRpcD48L21kLWljb24+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e2RlZmF1bHRJY29ufX1cIiBuZy1pZj1cIiFleHBhbmRlZCAmJiAhc2VjdGlvbi5pY29uXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgbmctc2hvdz1cInNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZFwiIG1kLWRpcmVjdGlvbj1cInJpZ2h0XCIgY2xhc3M9XCJtZC1zZWNvbmRhcnlcIj57ezo6c2VjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48L21kLXN1YmhlYWRlcj48bWQtbGlzdC1pdGVtIGNsYXNzPVwibm8tYm9yZGVyIHBpcC1zdGlja3ktbmF2LW1lbnUtaXRlbVwiIG5nLXJlcGVhdD1cImxpbmsgaW4gc2VjdGlvbi5saW5rc1wiIG5nLWNsYXNzPVwie1xcJ2FjdGl2ZVxcJzogaXNBY3RpdmUobGluayl9XCIgbmctaGlkZT1cImxpbmsuYWNjZXNzICYmICFsaW5rLmFjY2VzcyhsaW5rKVwiPjxtZC1idXR0b24gY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgcGlwLWZvY3VzYWJsZVwiIG5nLWNsaWNrPVwiY2xpY2tMaW5rKCRldmVudCwgbGluaylcIj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uLWJsb2NrXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e2xpbmsuaWNvbn19XCIgbmctaGlkZT1cIiFsaW5rLmljb25cIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBmbGV4LWZpeGVkXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgbmctc2hvdz1cInNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZFwiIG1kLWRpcmVjdGlvbj1cInJpZ2h0XCI+e3s6OmxpbmsudGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtdG9vbHRpcD48L21kLWljb24+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtdGl0bGVcIj57ezo6bGluay50aXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtYmFkZ2Uge3sgbGluay5iYWRnZVN0eWxlID8gbGluay5iYWRnZVN0eWxlIDogXFwnY29sb3ItYmFkZ2UtYmdcXCcgfX0gZmxleC1maXhlZFwiIG5nLWlmPVwibGluay5jb3VudCAmJiBsaW5rLmNvdW50IDwgMTAwXCI+e3tsaW5rLmNvdW50fX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1iYWRnZSB7eyBsaW5rLmJhZGdlU3R5bGUgPyBsaW5rLmJhZGdlU3R5bGUgOiBcXCdjb2xvci1iYWRnZS1iZ1xcJyB9fSBmbGV4LWZpeGVkXCIgbmctaWY9XCJsaW5rLmNvdW50ICYmIGxpbmsuY291bnQgPiA5OVwiPiE8L2Rpdj48L21kLWJ1dHRvbj48L21kLWxpc3QtaXRlbT48L2Rpdj48L21kLWxpc3Q+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnc2lkZW5hdi9TdGlja3lTaWRlTmF2Lmh0bWwnLFxuICAgICc8bWQtc2lkZW5hdiBjbGFzcz1cIm1kLXNpZGVuYXYtbGVmdFwiIG1kLWlzLWxvY2tlZC1vcGVuPVwic2lkZW5hdlN0YXRlLmlzTG9ja2VkT3BlblwiIG1kLWNvbXBvbmVudC1pZD1cInBpcC1zdGlja3ktc2lkZW5hdlwiIHBpcC1mb2N1c2VkPVwiXCIgbmctdHJhbnNjbHVkZT1cIlwiPjwvbWQtc2lkZW5hdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCd0YWJzL1RhYnMuaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIGNsYXNzPVwicGlwLW5hdiB7eyBjbGFzcyB9fVwiIG5nLWNsYXNzPVwie1xcJ3BpcC12aXNpYmxlXFwnOiBzaG93KCksIFxcJ3BpcC1zaGFkb3dcXCc6IHNob3dTaGFkb3coKX1cIj48bWQtdGFicyBuZy1pZj1cIm1lZGlhKFxcJ2d0LXhzXFwnKVwiIG1kLXNlbGVjdGVkPVwic2VsZWN0ZWQuYWN0aXZlVGFiXCIgbmctY2xhc3M9XCJ7XFwnZGlzYWJsZWRcXCc6IGRpc2FibGVkKCl9XCIgbWQtc3RyZXRjaC10YWJzPVwidHJ1ZVwiIG1kLWR5bmFtaWMtaGVpZ2h0PVwidHJ1ZVwiPjxtZC10YWIgbmctcmVwZWF0PVwidGFiIGluIHRhYnMgdHJhY2sgYnkgJGluZGV4XCIgbmctZGlzYWJsZWQ9XCJ0YWJEaXNhYmxlZCgkaW5kZXgpXCIgbWQtb24tc2VsZWN0PVwib25TZWxlY3QoJGluZGV4KVwiPjxtZC10YWItbGFiZWw+e3s6OnRhYi5uYW1lTG9jYWwgfX08ZGl2IGNsYXNzPVwicGlwLXRhYnMtYmFkZ2UgY29sb3ItYmFkZ2UtYmdcIiBuZy1pZj1cInRhYi5uZXdDb3VudHMgPiAwICYmIHRhYi5uZXdDb3VudHMgPD0gOTlcIj57eyB0YWIubmV3Q291bnRzIH19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC10YWJzLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctaWY9XCJ0YWIubmV3Q291bnRzID4gOTlcIj4hPC9kaXY+PC9tZC10YWItbGFiZWw+PC9tZC10YWI+PC9tZC10YWJzPjxkaXYgY2xhc3M9XCJtZC1zdWJoZWFkIHBpcC10YWJzLWNvbnRlbnQgY29sb3ItcHJpbWFyeS1iZ1wiIG5nLWlmPVwibWVkaWEoXFwneHNcXCcpXCI+PGRpdiBjbGFzcz1cInBpcC1kaXZpZGVyIHBvc2l0aW9uLXRvcCBtMFwiPjwvZGl2PjxtZC1zZWxlY3QgbmctbW9kZWw9XCJzZWxlY3RlZC5hY3RpdmVJbmRleFwiIG5nLWRpc2FibGVkPVwiZGlzYWJsZWQoKVwiIG1kLWNvbnRhaW5lci1jbGFzcz1cInBpcC1mdWxsLXdpZHRoLWRyb3Bkb3duXCIgYXJpYS1sYWJlbD1cIlNFTEVDVFwiIG1kLWluay1yaXBwbGU9XCJcIiBtZC1vbi1jbG9zZT1cIm9uU2VsZWN0KHNlbGVjdGVkLmFjdGl2ZUluZGV4KVwiPjxtZC1vcHRpb24gbmctcmVwZWF0PVwidGFiIGluIHRhYnMgdHJhY2sgYnkgJGluZGV4XCIgY2xhc3M9XCJwaXAtdGFiLW9wdGlvblwiIHZhbHVlPVwie3sgOjokaW5kZXggfX1cIj57eyA6OnRhYi5uYW1lTG9jYWwgfX08ZGl2IGNsYXNzPVwicGlwLXRhYnMtYmFkZ2UgY29sb3ItYmFkZ2UtYmdcIiBuZy1pZj1cInRhYi5uZXdDb3VudHMgPiAwICYmIHRhYi5uZXdDb3VudHMgPD0gOTlcIj57eyB0YWIubmV3Q291bnRzIH19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC10YWJzLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctaWY9XCJ0YWIubmV3Q291bnRzID4gOTlcIj4hPC9kaXY+PC9tZC1vcHRpb24+PC9tZC1zZWxlY3Q+PC9kaXY+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGlwLXdlYnVpLW5hdi1odG1sLm1pbi5qcy5tYXBcbiJdfQ==