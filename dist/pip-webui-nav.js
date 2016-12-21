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
        console.log('setShadow', breakpoints);
        this.hideShadow();
        if (breakpoints != null && breakpoints.length > 0) {
            _.each(breakpoints, function (bp) {
                console.log('111111setShadow', 'pip-shadow-' + bp);
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
        console.log('addShadow', breakpoints);
        console.log('addShadow typeof', typeof (breakpoints));
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



},{}]},{},[34,21])(34)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWN0aW9ucy9BY3Rpb25zU2VydmljZS50cyIsInNyYy9hY3Rpb25zL1ByaW1hcnlBY3Rpb25zRGlyZWN0aXZlLnRzIiwic3JjL2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9uc0RpcmVjdGl2ZS50cyIsInNyYy9hY3Rpb25zL2luZGV4LnRzIiwic3JjL2FwcGJhci9BcHBCYXJEaXJlY3RpdmUudHMiLCJzcmMvYXBwYmFyL0FwcEJhclBhcnREaXJlY3RpdmUudHMiLCJzcmMvYXBwYmFyL0FwcEJhclNlcnZpY2UudHMiLCJzcmMvYXBwYmFyL2luZGV4LnRzIiwic3JjL2JyZWFkY3J1bWIvQnJlYWRjcnVtYkRpcmVjdGl2ZS50cyIsInNyYy9icmVhZGNydW1iL0JyZWFkY3J1bWJTZXJ2aWNlLnRzIiwic3JjL2JyZWFkY3J1bWIvaW5kZXgudHMiLCJzcmMvY29tbW9uL05hdlNlcnZpY2UudHMiLCJzcmMvZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlci50cyIsInNyYy9kcm9wZG93bi9Ecm9wZG93bkRpcmVjdGl2ZS50cyIsInNyYy9oZWFkZXIvTmF2SGVhZGVyU2VydmljZS50cyIsInNyYy9oZWFkZXIvU3RpY2t5TmF2SGVhZGVyRGlyZWN0aXZlLnRzIiwic3JjL2hlYWRlci9pbmRleC50cyIsInNyYy9pY29uL05hdkljb25EaXJlY3RpdmUudHMiLCJzcmMvaWNvbi9OYXZJY29uU2VydmljZS50cyIsInNyYy9pY29uL2luZGV4LnRzIiwic3JjL2luZGV4LnRzIiwic3JjL2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyRGlyZWN0aXZlLnRzIiwic3JjL21lbnUvTmF2TWVudVNlcnZpY2UudHMiLCJzcmMvbWVudS9TdGlja3lOYXZNZW51RGlyZWN0aXZlLnRzIiwic3JjL21lbnUvaW5kZXgudHMiLCJzcmMvc2VhcmNoL1NlYXJjaEJhckRpcmVjdGl2ZS50cyIsInNyYy9zZWFyY2gvU2VhcmNoU2VydmljZS50cyIsInNyYy9zZWFyY2gvaW5kZXgudHMiLCJzcmMvc2lkZW5hdi9TaWRlTmF2UGFydERpcmVjdGl2ZS50cyIsInNyYy9zaWRlbmF2L1NpZGVOYXZTZXJ2aWNlLnRzIiwic3JjL3NpZGVuYXYvU3RpY2t5U2lkZU5hdkRpcmVjdGl2ZS50cyIsInNyYy9zaWRlbmF2L2luZGV4LnRzIiwic3JjL3RhYnMvVGFic0RpcmVjdGl2ZS50cyIsInRlbXAvcGlwLXdlYnVpLW5hdi1odG1sLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBRUYsUUFBQSxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUVyRDtJQUFBO0lBMkJBLENBQUM7SUFBRCx1QkFBQztBQUFELENBM0JBLEFBMkJDLElBQUE7QUEzQlksNENBQWdCO0FBNkI3QjtJQUFnQyw4QkFBZ0I7SUFBaEQ7O0lBRUEsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FGQSxBQUVDLENBRitCLGdCQUFnQixHQUUvQztBQUZZLGdDQUFVO0FBSXZCO0lBQUE7UUFFVyx5QkFBb0IsR0FBaUIsRUFBRSxDQUFDO1FBRXhDLHdCQUFtQixHQUFpQixFQUFFLENBQUM7UUFHdkMsMkJBQXNCLEdBQWlCLEVBQUUsQ0FBQztRQUUxQywwQkFBcUIsR0FBZ0IsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFBRCxvQkFBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBVlksc0NBQWE7QUFtQzFCO0lBSUksd0JBQ0ksTUFBcUIsRUFDckIsVUFBZ0M7UUFFaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELHNCQUFXLGtDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxnREFBb0I7YUFBL0I7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9B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O1NBQ3ZDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFFN0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7QUM5SEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IEFjdGlvbnNDaGFuZ2VkRXZlbnQgPSAncGlwQWN0aW9uc0NoYW5nZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpbXBsZUFjdGlvbkl0ZW0ge1xyXG4gICAgLy8gTmFtZSB0byByZWZlciB0byB0aGUgaXRlbVxyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIC8vIExpbmsgdmlzaWJsZSB0aXRsZVxyXG4gICAgcHVibGljIHRpdGxlPzogc3RyaW5nO1xyXG4gICAgLy8gU2hvdyBkaXZpZGVyIGluc3RlYWQgb2YgdGl0bGVcclxuICAgIHB1YmxpYyBkaXZpZGVyPzogYm9vbGVhbjtcclxuICAgIC8vIEljb24gbmFtZSBmcm9tICRpY29uUHJvdmlkZXJcclxuICAgIHB1YmxpYyBpY29uPzogc3RyaW5nO1xyXG4gICAgLy8gQ291bnRlciBiYWRnZVxyXG4gICAgcHVibGljIGNvdW50PzogbnVtYmVyO1xyXG4gICAgLy8gQWNjZXNzIGZ1bmN0aW9uXHJcbiAgICBwdWJsaWMgYWNjZXNzPzogKGFjdGlvbjogU2ltcGxlQWN0aW9uSXRlbSkgPT4gYm9vbGVhbjtcclxuICAgIC8vIFNob3cgb24gc3BlY2lmaWVkIGJyZWFrcG9pbnRzXHJcbiAgICBwdWJsaWMgYnJlYWtwb2ludHM/OiBzdHJpbmdbXTtcclxuICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcbiAgICBwdWJsaWMgaHJlZj86IHN0cmluZztcclxuICAgIC8vICRsb2NhdGlvbi51cmxcclxuICAgIHB1YmxpYyB1cmw/OiBzdHJpbmc7XHJcbiAgICAvLyAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zKVxyXG4gICAgcHVibGljIHN0YXRlPzogc3RyaW5nO1xyXG4gICAgLy8gUGFyYW1ldGVycyBmb3IgJHN0YXRlLmdvKHN0YXRlLCBzdGF0ZVBhcmFtcylcclxuICAgIHB1YmxpYyBzdGF0ZVBhcmFtcz86IGFueTtcclxuICAgIC8vICRyb290U2NvcGUuYnJvYWRjYXN0KGV2ZW50KVxyXG4gICAgcHVibGljIGV2ZW50Pzogc3RyaW5nO1xyXG4gICAgLy8gQ2xpY2sgY2FsbGJhY2tcclxuICAgIHB1YmxpYyBjbGljaz86IChhY3Rpb246IFNpbXBsZUFjdGlvbkl0ZW0pID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25JdGVtIGV4dGVuZHMgU2ltcGxlQWN0aW9uSXRlbSB7XHJcbiAgICBwdWJsaWMgc3ViQWN0aW9uczogU2ltcGxlQWN0aW9uSXRlbVtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uc0NvbmZpZyB7XHJcbiAgICAvLyBQcmltYXJ5IGdsb2JhbCBhY3Rpb25zIHZpc2libGUgb24gdGhlIHNjcmVlblxyXG4gICAgcHVibGljIHByaW1hcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW10gPSBbXTtcclxuICAgIC8vIFByaW1hcnkgbG9jYWwgYWN0aW9ucyB2aXNpYmxlIG9uIHRoZSBzY3JlZW5cclxuICAgIHB1YmxpYyBwcmltYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW10gPSBbXTtcclxuXHJcbiAgICAvLyBTZWNvbmRhcnkgZ2xvYmFsIGFjdGlvbnMgYXZhaWxhYmxlIGluIHBvcHVwXHJcbiAgICBwdWJsaWMgc2Vjb25kYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdID0gW107XHJcbiAgICAvLyBTZWNvbmRhcnkgbG9jYWwgYWN0aW9ucyBhdmFpbGFibGUgaW4gcG9wdXBcclxuICAgIHB1YmxpYyBzZWNvbmRhcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXT0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbnNTZXJ2aWNlIHtcclxuICAgIHJlYWRvbmx5IGNvbmZpZzogQWN0aW9uc0NvbmZpZztcclxuXHJcbiAgICBwcmltYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgcHJpbWFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107ICAgIFxyXG5cclxuICAgIHNob3cocHJpbWFyeUFjdGlvbnM/OiBBY3Rpb25JdGVtW10sIHNlY29uZGFyeUFjdGlvbnM/OiBBY3Rpb25JdGVtW10pOiB2b2lkO1xyXG4gICAgaGlkZSgpOiB2b2lkO1xyXG4gICAgdXBkYXRlQ291bnQobGluazogc3RyaW5nLCBjb3VudDogbnVtYmVyKTogdm9pZDsgXHJcbiAgICBjbGVhckNvdW50cygpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25zUHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGNvbmZpZzogQWN0aW9uc0NvbmZpZztcclxuICAgIFxyXG4gICAgcHJpbWFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHByaW1hcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHNlY29uZGFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHNlY29uZGFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdOyAgICBcclxufVxyXG5cclxuY2xhc3MgQWN0aW9uc1NlcnZpY2UgaW1wbGVtZW50cyBJQWN0aW9uc1NlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBY3Rpb25zQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBBY3Rpb25zQ29uZmlnLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBY3Rpb25zQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByaW1hcnlMb2NhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY29uZGFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwcmltYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSwgc2Vjb25kYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gcHJpbWFyeUFjdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9IHNlY29uZGFyeUFjdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDb3VudChhY3Rpb246IHN0cmluZywgY291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChhY3Rpb24gPT0gbnVsbCB8fCAhXy5pc051bWJlcihjb3VudCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGEubmFtZSA9PSBhY3Rpb24pXHJcbiAgICAgICAgICAgICAgICBhLmNvdW50ID0gY291bnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYS5uYW1lID09IGFjdGlvbilcclxuICAgICAgICAgICAgICAgIGEuY291bnQgPSBjb3VudDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJDb3VudHMoKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgYS5jb3VudCA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBhLmNvdW50ID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDaGFuZ2VFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoQWN0aW9uc0NoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQWN0aW9uc1Byb3ZpZGVyIGltcGxlbWVudHMgSUFjdGlvbnNQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEFjdGlvbnNDb25maWcgPSBuZXcgQWN0aW9uc0NvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWN0aW9uc1NlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogQWN0aW9uc0NvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogQWN0aW9uc0NvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBBY3Rpb25zQ29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwcmltYXJ5R2xvYmFsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucHJpbWFyeUdsb2JhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwcmltYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHByaW1hcnlMb2NhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwcmltYXJ5TG9jYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWNvbmRhcnlMb2NhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IEFjdGlvbnNTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEFjdGlvbnMnKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBBY3Rpb25zJywgQWN0aW9uc1Byb3ZpZGVyKTtcclxuXHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gUHJpbWFyeUFjdGlvbnNDb250cm9sbGVyKFxyXG4gICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24sICRpbmplY3RvciwgcGlwQWN0aW9ucykge1xyXG5cclxuICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1wcmltYXJ5LWFjdGlvbnMnKTtcclxuXHJcbiAgICBpZiAoJHNjb3BlLmxvY2FsQWN0aW9ucykgXHJcbiAgICAgICAgcGlwQWN0aW9ucy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gJHNjb3BlLmxvY2FsQWN0aW9ucztcclxuXHJcbiAgICBpZiAoJHNjb3BlLmdsb2JhbEFjdGlvbnMpXHJcbiAgICAgICAgcGlwQWN0aW9ucy5wcmltYXJ5R2xvYmFsQWN0aW9ucyA9ICRzY29wZS5nbG9iYWxBY3Rpb25zO1xyXG5cclxuICAgICRzY29wZS5jb25maWcgPSBwaXBBY3Rpb25zLmNvbmZpZztcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbigncGlwQWN0aW9uc0NoYW5nZWQnLCBvbkFjdGlvbnNDaGFuZ2VkKTtcclxuXHJcbiAgICAkc2NvcGUuaXNIaWRkZW4gPSBpc0hpZGRlbjtcclxuICAgICRzY29wZS5hY3Rpb25Db3VudCA9IGFjdGlvbkNvdW50O1xyXG4gICAgJHNjb3BlLmNsaWNrQWN0aW9uID0gY2xpY2tBY3Rpb247XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBmdW5jdGlvbiBvbkFjdGlvbnNDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAkc2NvcGUuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzSGlkZGVuKGFjdGlvbikge1xyXG4gICAgICAgIC8vIFRvZG86IENoZWNrIGJyZWFrcG9pbnRzIGhlcmVcclxuICAgICAgICByZXR1cm4gYWN0aW9uLmFjY2VzcyAmJiAhYWN0aW9uLmFjY2VzcyhhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGlvbkNvdW50KGFjdGlvbikge1xyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPT09IG51bGwgfHwgYWN0aW9uLmNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uLmNvdW50ID4gOTkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICchJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhY3Rpb24uY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY0FjdGlvbnMoYWN0aW9ucykge1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIF8uZWFjaChhY3Rpb25zLCBmdW5jdGlvbiAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNIaWRkZW4oYWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5QWN0aW9uc1Zpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwIHx8XHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5RGl2aWRlclZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwICYmXHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tBY3Rpb24oYWN0aW9uLCAkbWRPcGVuTWVudSkge1xyXG4gICAgICAgIGlmICghYWN0aW9uIHx8IGFjdGlvbi5kaXZpZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xvc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm9yaWdpbmF0b3JFdiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLm1lbnUpIHtcclxuICAgICAgICAgICAgJG1kT3Blbk1lbnUoJHNjb3BlLm9yaWdpbmF0b3JFdik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xpY2spIHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uaHJlZikge1xyXG4gICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhY3Rpb24uaHJlZjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi51cmwpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnVybChhY3Rpb24udXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5zdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoJGluamVjdG9yLmhhcygnJHN0YXRlJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhhY3Rpb24uc3RhdGUsIGFjdGlvbi5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoYWN0aW9uLmV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgcmFpc2Ugbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwQWN0aW9uQ2xpY2tlZCcsIGFjdGlvbi5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcHJpbWFyeUFjdGlvbnNEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbG9jYWxBY3Rpb25zOiAnPXBpcExvY2FsQWN0aW9ucycsXHJcbiAgICAgICAgICAgIGdsb2JhbEFjdGlvbnM6ICc9cGlwR2xvYmFsQWN0aW9ucydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYWN0aW9ucy9QcmltYXJ5QWN0aW9ucy5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBQcmltYXJ5QWN0aW9uc0NvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBY3Rpb25zJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcFByaW1hcnlBY3Rpb25zJywgcHJpbWFyeUFjdGlvbnNEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmZ1bmN0aW9uIFNlY29uZGFyeUFjdGlvbnNDb250cm9sbGVyKFxyXG4gICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24sICRpbmplY3RvciwgcGlwQWN0aW9ucykge1xyXG5cclxuICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zZWNvbmRhcnktYWN0aW9ucycpO1xyXG5cclxuICAgIGlmICgkc2NvcGUubG9jYWxBY3Rpb25zKSBcclxuICAgICAgICBwaXBBY3Rpb25zLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9ICRzY29wZS5sb2NhbEFjdGlvbnM7XHJcblxyXG4gICAgaWYgKCRzY29wZS5nbG9iYWxBY3Rpb25zKSBcclxuICAgICAgICBwaXBBY3Rpb25zLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSAkc2NvcGUuZ2xvYmFsQWN0aW9ucztcclxuXHJcbiAgICAkc2NvcGUuY29uZmlnID0gcGlwQWN0aW9ucy5jb25maWc7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJ3BpcEFjdGlvbnNDaGFuZ2VkJywgb25BY3Rpb25zQ2hhbmdlZCk7XHJcblxyXG4gICAgJHNjb3BlLmlzSGlkZGVuID0gaXNIaWRkZW47XHJcbiAgICAkc2NvcGUuYWN0aW9uQ291bnQgPSBhY3Rpb25Db3VudDtcclxuICAgICRzY29wZS5zZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSA9IHNlY29uZGFyeUFjdGlvbnNWaXNpYmxlO1xyXG4gICAgJHNjb3BlLnNlY29uZGFyeURpdmlkZXJWaXNpYmxlID0gc2Vjb25kYXJ5RGl2aWRlclZpc2libGU7XHJcblxyXG4gICAgJHNjb3BlLmNsaWNrQWN0aW9uID0gY2xpY2tBY3Rpb247XHJcblxyXG4gICAgJHNjb3BlLm9wZW5NZW51ID0gb3Blbk1lbnU7XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1lbnUoJG1kT3Blbk1lbnUsIGV2KSB7XHJcbiAgICAgICAgJHNjb3BlLm9yaWdpbmF0b3JFdiA9IGV2O1xyXG4gICAgICAgICRtZE9wZW5NZW51KGV2KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvbkFjdGlvbnNDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAkc2NvcGUuY29uZmlnID0gY29uZmlnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0hpZGRlbihhY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gYWN0aW9uLmFjY2VzcyAmJiAhYWN0aW9uLmFjY2VzcyhhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGlvbkNvdW50KGFjdGlvbikge1xyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPT09IG51bGwgfHwgYWN0aW9uLmNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uLmNvdW50ID4gOTkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICchJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhY3Rpb24uY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY0FjdGlvbnMoYWN0aW9ucykge1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIF8uZWFjaChhY3Rpb25zLCBmdW5jdGlvbiAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNIaWRkZW4oYWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5QWN0aW9uc1Zpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwIHx8XHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Vjb25kYXJ5RGl2aWRlclZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwICYmXHJcbiAgICAgICAgICAgIGNhbGNBY3Rpb25zKCRzY29wZS5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tBY3Rpb24oYWN0aW9uLCAkbWRPcGVuTWVudSkge1xyXG4gICAgICAgIGlmICghYWN0aW9uIHx8IGFjdGlvbi5kaXZpZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xvc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm9yaWdpbmF0b3JFdiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLm1lbnUpIHtcclxuICAgICAgICAgICAgJG1kT3Blbk1lbnUoJHNjb3BlLm9yaWdpbmF0b3JFdik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xpY2spIHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uaHJlZikge1xyXG4gICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhY3Rpb24uaHJlZjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi51cmwpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnVybChhY3Rpb24udXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5zdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoJGluamVjdG9yLmhhcygnJHN0YXRlJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhhY3Rpb24uc3RhdGUsIGFjdGlvbi5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoYWN0aW9uLmV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgcmFpc2Ugbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwQWN0aW9uQ2xpY2tlZCcsIGFjdGlvbi5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWNvbmRhcnlBY3Rpb25zRGlyZWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGxvY2FsQWN0aW9uczogJz1waXBMb2NhbEFjdGlvbnMnLFxyXG4gICAgICAgICAgICBnbG9iYWxBY3Rpb25zOiAnPXBpcEdsb2JhbEFjdGlvbnMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9ucy5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBTZWNvbmRhcnlBY3Rpb25zQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQWN0aW9ucycpXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBTZWNvbmRhcnlBY3Rpb25zJywgc2Vjb25kYXJ5QWN0aW9uc0RpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBBY3Rpb25zJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UZW1wbGF0ZXMnLCAndWkucm91dGVyJ10pO1xyXG5cclxuaW1wb3J0ICcuL0FjdGlvbnNTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1ByaW1hcnlBY3Rpb25zRGlyZWN0aXZlJztcclxuaW1wb3J0ICcuL1NlY29uZGFyeUFjdGlvbnNEaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9BY3Rpb25zU2VydmljZSc7Iiwi77u/J3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5mdW5jdGlvbiBBcHBCYXJEaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRyb290U2NvcGUsIHBpcEFwcEJhcikge1xyXG4gICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1hcHBiYXInKTtcclxuICAgICRlbGVtZW50LmFkZENsYXNzKCdjb2xvci1wcmltYXJ5LWJnJyk7XHJcbiAgICBcclxuICAgIC8vJHNjb3BlLiRlbWl0KCdwaXBSZXNpemVXaW5kb3cnKTtcclxuXHJcbiAgICAkc2NvcGUuY29uZmlnID0gcGlwQXBwQmFyLmNvbmZpZztcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbigncGlwQXBwQmFyQ2hhbmdlZCcsIG9uQXBwQmFyQ2hhbmdlZCk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25BcHBCYXJDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAkc2NvcGUuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBiYXJEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcclxuICAgICAgICBzY29wZTogdHJ1ZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcGJhci9BcHBCYXIuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogQXBwQmFyRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQXBwQmFyJylcclxuICAgIC5kaXJlY3RpdmUoJ3BpcEFwcGJhcicsIGFwcGJhckRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gQXBwQmFyUGFydERpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCBwaXBBcHBCYXIpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICB2YXIgcGFydE5hbWUgPSAnJyArICRhdHRycy5waXBBcHBiYXJQYXJ0O1xyXG4gICAgdmFyIHBhcnRWYWx1ZSA9IG51bGw7XHJcblxyXG4gICAgLy8gQnJlYWsgcGFydCBhcGFydFxyXG4gICAgdmFyIHBvcyA9IHBhcnROYW1lLmluZGV4T2YoJzonKTtcclxuICAgIGlmIChwb3MgPiAwKSB7XHJcbiAgICAgICAgcGFydFZhbHVlID0gcGFydE5hbWUuc3Vic3RyKHBvcyArIDEpO1xyXG4gICAgICAgIHBhcnROYW1lID0gcGFydE5hbWUuc3Vic3RyKDAsIHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25BcHBCYXJDaGFuZ2VkKG51bGwsIHBpcEFwcEJhci5jb25maWcpO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCdwaXBBcHBCYXJDaGFuZ2VkJywgb25BcHBCYXJDaGFuZ2VkKTtcclxuXHJcbiAgICBmdW5jdGlvbiBvbkFwcEJhckNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgIHZhciBwYXJ0cyA9IGNvbmZpZy5wYXJ0cyB8fCB7fTtcclxuICAgICAgICB2YXIgY3VycmVudFBhcnRWYWx1ZSA9IHBhcnRzW3BhcnROYW1lXTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHZpc2libGUgdmFyaWFibGUgdG8gc3dpdGNoIG5nSWZcclxuICAgICAgICB2YXIgdmlzaWJsZSA9ICEhKHBhcnRWYWx1ZSA/IGN1cnJlbnRQYXJ0VmFsdWUgPT0gcGFydFZhbHVlIDogY3VycmVudFBhcnRWYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmICh2aXNpYmxlICE9ICRzY29wZS52aXNpYmxlKVxyXG4gICAgICAgICAgICAkc2NvcGUudmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vLyBFeGFtcGxlIGlzIHRha2VuIGZyb20gaGVyZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMDMyNTQ4MC9hbmd1bGFyanMtd2hhdHMtdGhlLWJlc3QtcHJhY3RpY2UtdG8tYWRkLW5naWYtdG8tYS1kaXJlY3RpdmUtcHJvZ3JhbW1hdGljYWxseVxyXG5mdW5jdGlvbiBhcHBiYXJQYXJ0RGlyZWN0aXZlKG5nSWZEaXJlY3RpdmUpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICB2YXIgbmdJZiA9IG5nSWZEaXJlY3RpdmVbMF07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0cmFuc2NsdWRlOiBuZ0lmLnRyYW5zY2x1ZGUsXHJcbiAgICAgICAgcHJpb3JpdHk6IG5nSWYucHJpb3JpdHksXHJcbiAgICAgICAgdGVybWluYWw6IG5nSWYudGVybWluYWwsXHJcbiAgICAgICAgcmVzdHJpY3Q6IG5nSWYucmVzdHJpY3QsXHJcbiAgICAgICAgc2NvcGU6IHRydWUsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gbGlua0Z1bmN0aW9uKCRzY29wZTogYW55LCAkZWxlbWVudCwgJGF0dHJzOiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gVmlzdWFsaXplIGJhc2VkIG9uIHZpc2libGUgdmFyaWFibGUgaW4gc2NvcGVcclxuICAgICAgICAgICAgJGF0dHJzLm5nSWYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnZpc2libGU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG5nSWYubGluay5hcHBseShuZ0lmLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogQXBwQmFyUGFydERpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBBcHBCYXInKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwQXBwYmFyUGFydCcsIGFwcGJhclBhcnREaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IEFwcEJhckNoYW5nZWRFdmVudCA9ICdwaXBBcHBCYXJDaGFuZ2VkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBCYXJDb25maWcge1xyXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxufSBcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFwcEJhclNlcnZpY2Uge1xyXG4gICAgcmVhZG9ubHkgY29uZmlnOiBBcHBCYXJDb25maWc7XHJcbiAgICByZWFkb25seSBjbGFzc2VzOiBzdHJpbmdbXTtcclxuICAgIHBhcnRzOiBhbnk7XHJcblxyXG4gICAgc2hvdyhwYXJ0cz86IGFueSwgY2xhc3Nlcz86IHN0cmluZ1tdLCBzaGFkb3dCcmVha3BvaW50cz86IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIGhpZGUoKTogdm9pZDtcclxuIFxyXG4gICAgYWRkU2hhZG93KC4uLmJyZWFrcG9pbnRzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVTaGFkb3coKTogdm9pZDtcclxuIFxyXG4gICAgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG4gXHJcbiAgICBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFwcEJhclByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBjb25maWc6IEFwcEJhckNvbmZpZztcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxuXHJcbiAgICBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcblxyXG4gICAgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBBcHBCYXJTZXJ2aWNlIGltcGxlbWVudHMgSUFwcEJhclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBcHBCYXJDb25maWc7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IEFwcEJhckNvbmZpZywgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBcHBCYXJDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJ0cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gdmFsdWUgfHwge307XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwYXJ0cz86IGFueSwgY2xhc3Nlcz86IHN0cmluZ1tdLCBzaGFkb3dCcmVha3BvaW50cz86IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHBhcnRzIHx8IHRoaXMuX2NvbmZpZy5wYXJ0cyB8fCB7fTtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IGNsYXNzZXMgfHwgdGhpcy5fY29uZmlnLmNsYXNzZXMgfHwgW107XHJcbiAgICAgICAgaWYgKHNoYWRvd0JyZWFrcG9pbnRzKSB0aGlzLnNldFNoYWRvdyhzaGFkb3dCcmVha3BvaW50cyk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlU2hhZG93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjKSA9PiBjLnN0YXJ0c1dpdGgoJ3BpcC1zaGFkb3cnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTaGFkb3coYnJlYWtwb2ludHM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NldFNoYWRvdycsIGJyZWFrcG9pbnRzKTtcclxuICAgICAgICB0aGlzLmhpZGVTaGFkb3coKTtcclxuXHJcbiAgICAgICAgaWYgKGJyZWFrcG9pbnRzICE9IG51bGwgJiYgYnJlYWtwb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBfLmVhY2goYnJlYWtwb2ludHMsIChicCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJzExMTExMXNldFNoYWRvdycsICdwaXAtc2hhZG93LScgKyBicCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKCdwaXAtc2hhZG93LScgKyBicCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goJ3BpcC1zaGFkb3cnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFNoYWRvdyguLi5icmVha3BvaW50czogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWRkU2hhZG93JywgYnJlYWtwb2ludHMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGRTaGFkb3cgdHlwZW9mJywgdHlwZW9mKGJyZWFrcG9pbnRzKSk7XHJcbiAgICAgICAgdGhpcy5zZXRTaGFkb3coYnJlYWtwb2ludHMpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVNoYWRvdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhpZGVTaGFkb3coKTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaChjKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IF8ucmVqZWN0KHRoaXMuX2NvbmZpZy5jbGFzc2VzLCAoY2MpID0+IGNjID09IGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0c1twYXJ0XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoQXBwQmFyQ2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBcHBCYXJQcm92aWRlciBpbXBsZW1lbnRzIElBcHBCYXJQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEFwcEJhckNvbmZpZyA9IHtcclxuICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgIHBhcnRzOiB7fSxcclxuICAgICAgICBjbGFzc2VzOiBbXVxyXG4gICAgfTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFwcEJhclNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogQXBwQmFyQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29uZmlnKHZhbHVlOiBBcHBCYXJDb25maWcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB2YWx1ZSB8fCBuZXcgQXBwQmFyQ29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJ0cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gdmFsdWUgfHwge307XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xhc3NlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2xhc3Nlcyh2YWx1ZTogc3RyaW5nW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IF8ucmVqZWN0KHRoaXMuX2NvbmZpZy5jbGFzc2VzLCAoY2MpID0+IGNjID09IGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHNbcGFydF0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBBcHBCYXJTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfSAgICAgXHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEFwcEJhcicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcEFwcEJhcicsIEFwcEJhclByb3ZpZGVyKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQXBwQmFyJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vQXBwQmFyU2VydmljZSc7XHJcbmltcG9ydCAnLi9BcHBCYXJEaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vQXBwQmFyUGFydERpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL0FwcEJhclNlcnZpY2UnO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVBY3Rpb25JdGVtIH0gZnJvbSAnLi4vYWN0aW9ucy9BY3Rpb25zU2VydmljZSc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWJJdGVtIH0gZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWJDb25maWcgfSBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJyZWFkY3J1bWJTZXJ2aWNlIH0gZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWJDaGFuZ2VkRXZlbnQgfSBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYkJhY2tFdmVudCB9IGZyb20gJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPcGVuU2VhcmNoRXZlbnQgfSBmcm9tICcuLi9zZWFyY2gvU2VhcmNoU2VydmljZSdcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuY2xhc3MgQnJlYWRjcnVtYkNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuICAgIHByaXZhdGUgX3dpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9sb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZTtcclxuICAgIHByaXZhdGUgX2luamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2U7XHJcbiAgICBwcml2YXRlIG9yaWdpbmF0b3JFdjogRXZlbnQ7XHJcbiAgICBcclxuICAgIHB1YmxpYyBjb25maWc6IEJyZWFkY3J1bWJDb25maWc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRlbGVtZW50OiBhbnksIFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxyXG4gICAgICAgICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSxcclxuICAgICAgICAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgJGluamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2UsXHJcbiAgICAgICAgcGlwQnJlYWRjcnVtYjogSUJyZWFkY3J1bWJTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgdGhpcy5fd2luZG93ID0gJHdpbmRvdztcclxuICAgICAgICB0aGlzLl9sb2NhdGlvbiA9ICRsb2NhdGlvbjtcclxuICAgICAgICB0aGlzLl9pbmplY3RvciA9ICRpbmplY3RvcjtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1icmVhZGNydW1iJyk7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gcGlwQnJlYWRjcnVtYi5jb25maWc7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKEJyZWFkY3J1bWJDaGFuZ2VkRXZlbnQsIChldmVudCwgY29uZmlnKSA9PiB7IHRoaXMub25CcmVhZGNydW1iQ2hhbmdlZChldmVudCwgY29uZmlnKTsgfSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQnJlYWRjcnVtYkJhY2tFdmVudCwgKCkgPT4geyB0aGlzLm9uQnJlYWRjcnVtYkJhY2soKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJyZWFkY3J1bWJDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnJlYWRjcnVtYkJhY2soKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5jb25maWcuaXRlbXM7XHJcbiAgICAgICAgLy8gR28gdG8gdGhlIGxhc3QgYnJlYWRjcnVtYiBpdGVtXHJcbiAgICAgICAgaWYgKF8uaXNBcnJheShpdGVtcykgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBsZXQgYmFja0NhbGxiYWNrID0gaXRlbS5jbGljaztcclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihiYWNrQ2FsbGJhY2spKSBcclxuICAgICAgICAgICAgICAgIGJhY2tDYWxsYmFjayhpdGVtKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICB0aGlzLl93aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xpY2soaXRlbTogQnJlYWRjcnVtYkl0ZW0pIHtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0uY2xpY2spKVxyXG4gICAgICAgICAgICBpdGVtLmNsaWNrKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuU2VhcmNoKCkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KE9wZW5TZWFyY2hFdmVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhY3Rpb25zVmlzaWJsZShpdGVtOiBCcmVhZGNydW1iSXRlbSk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICByZXR1cm4gYW5ndWxhci5pc0FycmF5KGl0ZW0uc3ViQWN0aW9ucykgJiYgaXRlbS5zdWJBY3Rpb25zLmxlbmd0aCA+IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT3Blbk1lbnUoJG1kT3Blbk1lbnUsIGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYXRvckV2ID0gZXZlbnQ7XHJcbiAgICAgICAgJG1kT3Blbk1lbnUodGhpcy5vcmlnaW5hdG9yRXYpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblN1YkFjdGlvbkNsaWNrKGFjdGlvbjogU2ltcGxlQWN0aW9uSXRlbSk6IHZvaWQgeyBcclxuICAgICAgICBpZiAoIWFjdGlvbiB8fCBhY3Rpb24uZGl2aWRlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmNsaWNrKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbi5jbGljayhhY3Rpb24pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmhyZWYpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhY3Rpb24uaHJlZjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi51cmwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb24udXJsKGFjdGlvbi51cmwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbmplY3Rvci5oYXMoJyRzdGF0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHN0YXRlID0gdGhpcy5faW5qZWN0b3IuZ2V0KCckc3RhdGUnKSBhcyBuZy51aS5JU3RhdGVTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oYWN0aW9uLnN0YXRlLCBhY3Rpb24uc3RhdGVQYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoYWN0aW9uLmV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5vcmlnaW5hdG9yRXYgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByYWlzZSBub3RpZmljYXRpb25cclxuICAgICAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcEFjdGlvbkNsaWNrZWQnLCBhY3Rpb24ubmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYXRvckV2ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBicmVhZGNydW1iRGlyZWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2JyZWFkY3J1bWIvQnJlYWRjcnVtYi5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBCcmVhZGNydW1iQ29udHJvbGxlcixcclxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwQnJlYWRjcnVtYicpXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBCcmVhZGNydW1iJywgYnJlYWRjcnVtYkRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IFNpbXBsZUFjdGlvbkl0ZW0gfSBmcm9tICcuLi9hY3Rpb25zL0FjdGlvbnNTZXJ2aWNlJztcclxuZXhwb3J0IGxldCBCcmVhZGNydW1iQ2hhbmdlZEV2ZW50ID0gXCJwaXBCcmVhZGNydW1iQ2hhbmdlZFwiO1xyXG5leHBvcnQgbGV0IEJyZWFkY3J1bWJCYWNrRXZlbnQgPSBcInBpcEJyZWFkY3J1bWJCYWNrXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkl0ZW0ge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGNsaWNrPzogKGl0ZW06IEJyZWFkY3J1bWJJdGVtKSA9PiB2b2lkOyAgIFxyXG4gICAgc3ViQWN0aW9ucz86IFNpbXBsZUFjdGlvbkl0ZW1bXTsgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iQ29uZmlnIHtcclxuICAgIHRleHQ6IHN0cmluZztcclxuICAgIGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdO1xyXG4gICAgY3JpdGVyaWE6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQnJlYWRjcnVtYlNlcnZpY2Uge1xyXG4gICAgY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnO1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgaXRlbXM6IEJyZWFkY3J1bWJJdGVtW107XHJcbiAgICBjcml0ZXJpYTogc3RyaW5nO1xyXG5cclxuICAgIHNob3dUZXh0KHRleHQ6IHN0cmluZywgY3JpdGVyaWE/OiBzdHJpbmcpO1xyXG4gICAgc2hvd0l0ZW1zKGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdLCBjcml0ZXJpYT86IHN0cmluZyk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJyZWFkY3J1bWJQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuY2xhc3MgQnJlYWRjcnVtYlNlcnZpY2UgaW1wbGVtZW50cyBJQnJlYWRjcnVtYlNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLml0ZW1zID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGl0ZW1zKCk6IEJyZWFkY3J1bWJJdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpdGVtcyh2YWx1ZTogQnJlYWRjcnVtYkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuaXRlbXMgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNyaXRlcmlhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jcml0ZXJpYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNyaXRlcmlhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93VGV4dCh0ZXh0OiBzdHJpbmcsIGNyaXRlcmlhPzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pdGVtcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gY3JpdGVyaWE7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0l0ZW1zKGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdLCBjcml0ZXJpYT86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pdGVtcyA9IGl0ZW1zIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSBjcml0ZXJpYTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoQnJlYWRjcnVtYkNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIEJyZWFkY3J1bWJQcm92aWRlciBpbXBsZW1lbnRzIElCcmVhZGNydW1iUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnID0geyBcclxuICAgICAgICB0ZXh0OiBudWxsLFxyXG4gICAgICAgIGl0ZW1zOiBudWxsLFxyXG4gICAgICAgIGNyaXRlcmlhOiBudWxsXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQnJlYWRjcnVtYlNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCB0ZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSk6IGFueSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IEJyZWFkY3J1bWJTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcEJyZWFkY3J1bWInKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBCcmVhZGNydW1iJywgQnJlYWRjcnVtYlByb3ZpZGVyKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcEJyZWFkY3J1bWInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcycsICdwaXBOYXYuVHJhbnNsYXRlJ10pO1xyXG5cclxuaW1wb3J0ICcuL0JyZWFkY3J1bWJEaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcblxyXG5cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgSU5hdkljb25TZXJ2aWNlIH0gZnJvbSAnLi4vaWNvbi9OYXZJY29uU2VydmljZSc7XHJcbmltcG9ydCB7IElOYXZNZW51U2VydmljZSB9IGZyb20gJy4uL21lbnUvTmF2TWVudVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJTmF2SGVhZGVyU2VydmljZSB9IGZyb20gJy4uL2hlYWRlci9OYXZIZWFkZXJTZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJyZWFkY3J1bWJTZXJ2aWNlIH0gZnJvbSAnLi4vYnJlYWRjcnVtYi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IElTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoL1NlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQWN0aW9uc1NlcnZpY2UgfSBmcm9tICcuLi9hY3Rpb25zL0FjdGlvbnNTZXJ2aWNlJztcclxuaW1wb3J0IHsgSUFwcEJhclNlcnZpY2UgfSBmcm9tICcuLi9hcHBiYXIvQXBwQmFyU2VydmljZSc7XHJcbmltcG9ydCB7IElTaWRlTmF2U2VydmljZSB9IGZyb20gJy4uL3NpZGVuYXYvU2lkZU5hdlNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2U2VydmljZSB7XHJcbiAgICBhcHBiYXI6IElBcHBCYXJTZXJ2aWNlO1xyXG4gICAgaWNvbjogSU5hdkljb25TZXJ2aWNlOyBcclxuICAgIGJyZWFkY3J1bWI6IElCcmVhZGNydW1iU2VydmljZTtcclxuICAgIGFjdGlvbnM6IElBY3Rpb25zU2VydmljZTtcclxuICAgIHNlYXJjaDogSVNlYXJjaFNlcnZpY2U7XHJcbiAgICBzaWRlbmF2OiBJU2lkZU5hdlNlcnZpY2U7XHJcbiAgICBoZWFkZXI6IElOYXZIZWFkZXJTZXJ2aWNlO1xyXG4gICAgbWVudTogSU5hdk1lbnVTZXJ2aWNlOyAgIFxyXG5cclxuICAgIHJlc2V0KCk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIE5hdlNlcnZpY2UgaW1wbGVtZW50cyBJTmF2U2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCRpbmplY3Rvcikge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdGhpcy5hcHBiYXIgPSAkaW5qZWN0b3IuaGFzKCdwaXBBcHBCYXInKSA/ICRpbmplY3Rvci5nZXQoJ3BpcEFwcEJhcicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLmljb24gPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZJY29uJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZJY29uJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuYnJlYWRjcnVtYiA9ICRpbmplY3Rvci5oYXMoJ3BpcEJyZWFkY3J1bWInKSA/ICRpbmplY3Rvci5nZXQoJ3BpcEJyZWFkY3J1bWInKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gJGluamVjdG9yLmhhcygncGlwQWN0aW9ucycpID8gJGluamVjdG9yLmdldCgncGlwQWN0aW9ucycpIDogbnVsbDtcclxuICAgICAgICB0aGlzLnNlYXJjaCA9ICRpbmplY3Rvci5oYXMoJ3BpcFNlYXJjaCcpID8gJGluamVjdG9yLmdldCgncGlwU2VhcmNoJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuc2lkZW5hdiA9ICRpbmplY3Rvci5oYXMoJ3BpcFNpZGVOYXYnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFNpZGVOYXYnKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZIZWFkZXInKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE5hdkhlYWRlcicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLm1lbnUgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZNZW51JykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZNZW51JykgOiBudWxsOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXBwYmFyOiBJQXBwQmFyU2VydmljZTtcclxuICAgIHB1YmxpYyBpY29uOiBJTmF2SWNvblNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYnJlYWRjcnVtYjogSUJyZWFkY3J1bWJTZXJ2aWNlO1xyXG4gICAgcHVibGljIGFjdGlvbnM6IElBY3Rpb25zU2VydmljZTtcclxuICAgIHB1YmxpYyBzZWFyY2g6IElTZWFyY2hTZXJ2aWNlO1xyXG4gICAgcHVibGljIHNpZGVuYXY6IElTaWRlTmF2U2VydmljZTsgICAgICAgIFxyXG4gICAgcHVibGljIGhlYWRlcjogSU5hdkhlYWRlclNlcnZpY2U7XHJcbiAgICBwdWJsaWMgbWVudTogSU5hdk1lbnVTZXJ2aWNlOyAgICBcclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKSB7XHJcbiAgICAgICAgLy8gUmVzZXQgYXBwYmFyXHJcbiAgICAgICAgaWYgKHRoaXMuYXBwYmFyKSBcclxuICAgICAgICAgICAgdGhpcy5hcHBiYXIuc2hvdygpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBpY29uXHJcbiAgICAgICAgaWYgKHRoaXMuaWNvbilcclxuICAgICAgICAgICAgdGhpcy5pY29uLnNob3dNZW51KCk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGJyZWFkY3J1bWJcclxuICAgICAgICBpZiAodGhpcy5icmVhZGNydW1iKVxyXG4gICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWIuc2hvd1RleHQobnVsbCk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGFjdGlvbnNcclxuICAgICAgICBpZiAodGhpcy5hY3Rpb25zKVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuc2hvdygpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBzZWFyY2hcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2gpXHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLnNldChudWxsKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2lkZW5hdilcclxuICAgICAgICAgICAgdGhpcy5zaWRlbmF2LnNob3coKTtcclxuICAgIH1cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2U2VydmljZScsIFtdKVxyXG4gICAgLnNlcnZpY2UoJ3BpcE5hdlNlcnZpY2UnLCBOYXZTZXJ2aWNlKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbmZ1bmN0aW9uIHRyYW5zbGF0ZUZpbHRlcigkaW5qZWN0b3IpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICBsZXQgcGlwVHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gcGlwVHJhbnNsYXRlICA/IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoa2V5KSB8fCBrZXkgOiBrZXk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdi5UcmFuc2xhdGUnLCBbXSlcclxuICAgIC5maWx0ZXIoJ3RyYW5zbGF0ZScsIHRyYW5zbGF0ZUZpbHRlcik7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gRHJvcGRvd25EaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGluamVjdG9yLCAkcm9vdFNjb3BlLCAkbWRNZWRpYSwgJHRpbWVvdXQpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICBsZXQgcGlwVGhlbWUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUaGVtZScpID8gJGluamVjdG9yLmdldCgncGlwVGhlbWUnKSA6IG51bGw7IFxyXG4gICAgbGV0IHBpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsO1xyXG4gICAgbGV0IGN1cnJlbnRUaGVtZSA9ICdkZWZhdWx0JztcclxuXHJcbiAgICBpZiAocGlwVGhlbWUpXHJcbiAgICAgICAgY3VycmVudFRoZW1lID0gcGlwVGhlbWUudXNlKCk7XHJcbiAgICBlbHNlIGlmICgkcm9vdFNjb3BlLiR0aGVtZSlcclxuICAgICAgICBjdXJyZW50VGhlbWUgPSAkcm9vdFNjb3BlLiR0aGVtZTtcclxuXHJcbiAgICAkc2NvcGUuY2xhc3MgPSAoJGF0dHJzLmNsYXNzIHx8ICcnKSArICcgbWQtJyArIGN1cnJlbnRUaGVtZSArICctdGhlbWUnO1xyXG5cclxuICAgIC8vcGlwQXNzZXJ0LmlzQXJyYXkoJHNjb3BlLmFjdGlvbnMsICdwaXBEcm9wZG93bjogcGlwLWFjdGlvbnMgYXR0cmlidXRlIHNob3VsZCB0YWtlIGFuIGFycmF5LCBidXQgdGFrZSAnICsgdHlwZW9mICRzY29wZS5hY3Rpb25zKTtcclxuICAgICRzY29wZS5tZWRpYSA9IHBpcE1lZGlhICE9PSB1bmRlZmluZWQgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG4gICAgJHNjb3BlLmFjdGlvbnMgPSAoJHNjb3BlLmFjdGlvbnMgJiYgXy5pc0FycmF5KCRzY29wZS5hY3Rpb25zKSkgPyAkc2NvcGUuYWN0aW9ucyA6IFtdO1xyXG4gICAgJHNjb3BlLmFjdGl2ZUluZGV4ID0gJHNjb3BlLmFjdGl2ZUluZGV4IHx8IDA7XHJcblxyXG4gICAgJHNjb3BlLmRpc2FibGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkc2NvcGUubmdEaXNhYmxlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUubmdEaXNhYmxlZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5vblNlbGVjdCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICRzY29wZS5hY3RpdmVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGlmICgkc2NvcGUuc2VsZWN0KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3QoJHNjb3BlLmFjdGlvbnNbaW5kZXhdLCAkc2NvcGUuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRzY29wZS5waXBDaGFuZ2UpIHtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUucGlwQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCRzY29wZS5zaG93RHJvcGRvd24oKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNob3dEcm9wZG93bigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkcm9wZG93bkRpcmVjdGl2ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBuZ0Rpc2FibGVkOiAnJicsXHJcbiAgICAgICAgICAgIGFjdGlvbnM6ICc9cGlwQWN0aW9ucycsXHJcbiAgICAgICAgICAgIHNob3dEcm9wZG93bjogJyZwaXBTaG93JyxcclxuICAgICAgICAgICAgYWN0aXZlSW5kZXg6ICc9cGlwQWN0aXZlSW5kZXgnLFxyXG4gICAgICAgICAgICBzZWxlY3Q6ICc9cGlwRHJvcGRvd25TZWxlY3QnLFxyXG4gICAgICAgICAgICBwaXBDaGFuZ2U6ICcmJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdkcm9wZG93bi9Ecm9wZG93bi5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBEcm9wZG93bkRpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcERyb3Bkb3duJywgWydwaXBOYXYuVGVtcGxhdGVzJ10pXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBEcm9wZG93bicsIGRyb3Bkb3duRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBOYXZIZWFkZXJDaGFuZ2VkRXZlbnQgPSAncGlwTmF2SGVhZGVyQ2hhbmdlZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2SGVhZGVyQ29uZmlnIHtcclxuICAgIC8vIEltYWdlIHVybFxyXG4gICAgcHVibGljIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICAvLyBJbWFnZSB1cmxcclxuICAgIHB1YmxpYyBkZWZhdWx0SW1hZ2VVcmw6IHN0cmluZztcclxuICAgIC8vIFRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIC8vIFN1YnRpdGxlXHJcbiAgICBwdWJsaWMgc3VidGl0bGU6IHN0cmluZztcclxuICAgIC8vIEhhbmRsZSBoZWFkZXIgY2xpY2sgZXZlbnRcclxuICAgIGNsaWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgLy8gRXZlbnQgbmFtZVxyXG4gICAgZXZlbnQ6IHN0cmluZ1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2SGVhZGVyU2VydmljZSB7XHJcbiAgICByZWFkb25seSBjb25maWc6IE5hdkhlYWRlckNvbmZpZztcclxuICAgIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgc3VidGl0bGU6IHN0cmluZztcclxuICAgIGNsaWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgZXZlbnQ6IHN0cmluZztcclxuXHJcbiAgICBzaG93KHRpdGxlOiBzdHJpbmcsIHN1YnRpdGxlOiBzdHJpbmcsIGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBoaWRlKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdkhlYWRlclByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBjb25maWc6IE5hdkhlYWRlckNvbmZpZztcclxuICAgIGRlZmF1bHRJbWFnZVVybDogc3RyaW5nO1xyXG4gICAgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgY2xpY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBldmVudDogc3RyaW5nO1xyXG5cclxuICAgIHNldCh0aXRsZTogc3RyaW5nLCBzdWJ0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgY2xlYXIoKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgTmF2SGVhZGVyU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdkhlYWRlckNvbmZpZztcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogTmF2SGVhZGVyQ29uZmlnLCAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkhlYWRlckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3VidGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnN1YnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc3VidGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbWFnZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpbWFnZVVybCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsaWNrKCk6ICgpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xpY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGljayh2YWx1ZTogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBldmVudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBldmVudCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyh0aXRsZTogc3RyaW5nLCBzdWJ0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSBzdWJ0aXRsZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBpbWFnZVVybDtcclxuXHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc1N0cmluZyhjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgdGhpcy5fcm9vdFNjb3BlLiRlbWl0KE5hdkhlYWRlckNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2SGVhZGVyUHJvdmlkZXIgaW1wbGVtZW50cyBJTmF2SGVhZGVyUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZIZWFkZXJDb25maWcgPSBuZXcgTmF2SGVhZGVyQ29uZmlnKCk7XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBOYXZIZWFkZXJTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkhlYWRlckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogTmF2SGVhZGVyQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsdWUgfHwgbmV3IE5hdkhlYWRlckNvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVmYXVsdEltYWdlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5kZWZhdWx0SW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkZWZhdWx0SW1hZ2VVcmwodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5kZWZhdWx0SW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN1YnRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN1YnRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGltYWdlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5pbWFnZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGltYWdlVXJsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsaWNrKCk6ICgpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xpY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGljayh2YWx1ZTogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZXZlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmV2ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZXZlbnQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQodGl0bGU6IHN0cmluZywgc3VidGl0bGU6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gc3VidGl0bGU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcblxyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcoY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IE5hdkhlYWRlclNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbiAgICAgXHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZIZWFkZXInKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBOYXZIZWFkZXInLCBOYXZIZWFkZXJQcm92aWRlcik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuICAgIGZ1bmN0aW9uIFN0aWNreU5hdkhlYWRlckRpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJHJvb3RTY29wZSwgJHRpbWVvdXQsIHBpcE5hdkhlYWRlcikge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgICAgIGltYWdlID0gbnVsbCxcclxuICAgICAgICAgICAgaW1hZ2VCbG9jayA9ICRlbGVtZW50LmZpbmQoJy5waXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlcicpLFxyXG4gICAgICAgICAgICAkaW1hZ2UsXHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSxcclxuICAgICAgICAgICAgbG9hZGVkRGVmYXVsdEltYWdlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtc3RpY2t5LW5hdi1oZWFkZXInKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9uVXNlckNsaWNrID0gb25Vc2VyQ2xpY2s7XHJcbiAgICAgICAgJHNjb3BlLm9uSW1hZ2VFcnJvciA9IG9uSW1hZ2VFcnJvcjtcclxuICAgICAgICAkc2NvcGUub25JbWFnZUxvYWQgPSBvbkltYWdlTG9hZDtcclxuXHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkaW1hZ2UgPSAkZWxlbWVudC5maW5kKCcucGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXItaW1hZ2UnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkaW1hZ2VbMF0pIHtcclxuICAgICAgICAgICAgICAgICRpbWFnZVswXS5vbmxvYWQgPSBvbkltYWdlTG9hZDtcclxuICAgICAgICAgICAgICAgICRpbWFnZVswXS5vbmVycm9yID0gb25JbWFnZUVycm9yO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGltYWdlLm9ubG9hZCA9IG9uSW1hZ2VMb2FkO1xyXG4gICAgICAgICAgICAgICAgJGltYWdlLm9uZXJyb3IgPSBvbkltYWdlRXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9uTmF2SGVhZGVyQ2hhbmdlZChudWxsLCBwaXBOYXZIZWFkZXIuY29uZmlnKTtcclxuICAgICAgICB9LCAyMCk7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBOYXZIZWFkZXJDaGFuZ2VkJywgb25OYXZIZWFkZXJDaGFuZ2VkKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdlN0YXRlQ2hhbmdlZCcsIG9uU3RhdGVDaGFuZ2VkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0SGVhZGVyKCkge1xyXG4gICAgICAgICAgICBpZiAoIXBpcE5hdkhlYWRlci5jb25maWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS50aXRsZSA9IHBpcE5hdkhlYWRlci5jb25maWcudGl0bGU7XHJcbiAgICAgICAgICAgICRzY29wZS5zdWJ0aXRsZSA9IHBpcE5hdkhlYWRlci5jb25maWcuc3VidGl0bGU7XHJcbiAgICAgICAgICAgICRzY29wZS5pbWFnZVVybCA9IHBpcE5hdkhlYWRlci5jb25maWcuaW1hZ2VVcmw7XHJcbiAgICAgICAgICAgICRzY29wZS5pbWFnZUNzcyA9IHBpcE5hdkhlYWRlci5jb25maWcuaW1hZ2VDc3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBXaGVuIGltYWdlIGlzIGxvYWRlZCByZXNpemUvcmVwb3NpdGlvbiBpdFxyXG4gICAgICAgIGZ1bmN0aW9uIG9uSW1hZ2VMb2FkKCRldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSAkKCRldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICBzZXRJbWFnZU1hcmdpbkNTUyhpbWFnZUJsb2NrLCBpbWFnZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25JbWFnZUVycm9yKCRldmVudCkge1xyXG4gICAgICAgICAgICBpZiAobG9hZGVkRGVmYXVsdEltYWdlKSByZXR1cm47XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0SW1hZ2UocGlwTmF2SGVhZGVyLmNvbmZpZywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU3RhdGVDaGFuZ2VkKGV2ZW50LCBzdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjdXJyZW50U3RhdGUgPSBzdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5pZCA9PSAndG9nZ2xlJykge1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zaG93SGVhZGVyID0gY3VycmVudFN0YXRlICYmIGN1cnJlbnRTdGF0ZS5pZCA9PSAndG9nZ2xlJztcclxuICAgICAgICAgICAgICAgIH0sIDQwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd0hlYWRlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRJbWFnZU1hcmdpbkNTUyhjb250YWluZXIsIGltYWdlKSB7XHJcbiAgICAgICAgICAgIHZhciBjc3NQYXJhbXMgPSB7fSxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoID0gY29udGFpbmVyLndpZHRoID8gY29udGFpbmVyLndpZHRoKCkgOiBjb250YWluZXIuY2xpZW50V2lkdGgsXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJIZWlnaHQgPSBjb250YWluZXIuaGVpZ2h0ID8gY29udGFpbmVyLmhlaWdodCgpIDogY29udGFpbmVyLmNsaWVudEhlaWdodCxcclxuICAgICAgICAgICAgICAgIGltYWdlV2lkdGggPSBpbWFnZVswXS5uYXR1cmFsV2lkdGggfHwgaW1hZ2Uud2lkdGgsXHJcbiAgICAgICAgICAgICAgICBpbWFnZUhlaWdodCA9IGltYWdlWzBdLm5hdHVyYWxIZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmICgoaW1hZ2VXaWR0aCAvIGNvbnRhaW5lcldpZHRoKSA+IChpbWFnZUhlaWdodCAvIGNvbnRhaW5lckhlaWdodCkpIHtcclxuICAgICAgICAgICAgICAgIG1hcmdpbiA9IC0oKGltYWdlV2lkdGggLyBpbWFnZUhlaWdodCAqIGNvbnRhaW5lckhlaWdodCAtIGNvbnRhaW5lcldpZHRoKSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydtYXJnaW4tbGVmdCddID0gJycgKyBtYXJnaW4gKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydoZWlnaHQnXSA9ICcnICsgY29udGFpbmVySGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snd2lkdGgnXSA9ICcnICsgaW1hZ2VXaWR0aCAqIGNvbnRhaW5lckhlaWdodCAvIGltYWdlSGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snbWFyZ2luLXRvcCddID0gJyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4gPSAtKChpbWFnZUhlaWdodCAvIGltYWdlV2lkdGggKiBjb250YWluZXJXaWR0aCAtIGNvbnRhaW5lckhlaWdodCkgLyAyKTtcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snbWFyZ2luLXRvcCddID0gJycgKyBtYXJnaW4gKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydoZWlnaHQnXSA9ICcnICsgaW1hZ2VIZWlnaHQgKiBjb250YWluZXJXaWR0aCAvIGltYWdlV2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWyd3aWR0aCddID0gJycgKyBjb250YWluZXJXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ21hcmdpbi1sZWZ0J10gPSAnJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW1hZ2UuY3NzKGNzc1BhcmFtcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0SW1hZ2UoY29uZmlnLCBsb2FkRXJyb3I6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciB1cmw6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIGlmICghbG9hZEVycm9yICYmICEhY29uZmlnLmltYWdlVXJsICYmICFsb2FkZWREZWZhdWx0SW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgIHVybCA9IGNvbmZpZy5pbWFnZVVybDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZERlZmF1bHRJbWFnZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBjb25maWcuZGVmYXVsdEltYWdlVXJsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodXJsICYmICRpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgJGltYWdlLmF0dHIoJ3NyYycsIHVybCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUJsb2NrLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uTmF2SGVhZGVyQ2hhbmdlZCgkZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBzZXRJbWFnZShjb25maWcsIGZhbHNlKVxyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnRpdGxlID0gY29uZmlnLnRpdGxlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc3VidGl0bGUgPSBjb25maWcuc3VidGl0bGU7XHJcbiAgICAgICAgICAgICRzY29wZS5pbWFnZVVybCA9IGNvbmZpZy5pbWFnZVVybDtcclxuICAgICAgICAgICAgJHNjb3BlLmltYWdlQ3NzID0gY29uZmlnLmltYWdlQ3NzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25Vc2VyQ2xpY2soKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwTmF2VXNlckNsaWNrZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0aWNreU5hdkhlYWRlckRpcmVjdGl2ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hlYWRlci9TdGlja3lOYXZIZWFkZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFN0aWNreU5hdkhlYWRlckRpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBOYXZIZWFkZXInKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcFN0aWNreU5hdkhlYWRlcicsIHN0aWNreU5hdkhlYWRlckRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBOYXZIZWFkZXInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9OYXZIZWFkZXJTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1N0aWNreU5hdkhlYWRlckRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL05hdkhlYWRlclNlcnZpY2UnOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuZnVuY3Rpb24gTmF2SWNvbkRpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCAkd2luZG93LCBwaXBOYXZJY29uKSB7XHJcbiAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLW5hdi1pY29uJyk7XHJcblxyXG4gICAgJHNjb3BlLmNvbmZpZyA9IHBpcE5hdkljb24uY29uZmlnO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCdwaXBOYXZJY29uQ2hhbmdlZCcsIG9uTmF2SWNvbkNoYW5nZWQpO1xyXG5cclxuICAgICRzY29wZS5vbk5hdkljb25DbGljayA9IG9uTmF2SWNvbkNsaWNrO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uTmF2SWNvbkNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICRzY29wZS5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25OYXZJY29uQ2xpY2soKSB7XHJcbiAgICAgICAgdmFyIGJyZWFkY3J1bWIsIGJhY2tDYWxsYmFjaztcclxuXHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbigkc2NvcGUuY29uZmlnLmNsaWNrKSkge1xyXG4gICAgICAgICAgICAvLyBFeGVjdXRlIG5hdiBpY29uIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICRzY29wZS5jb25maWcuY2xpY2soKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5jb25maWcuZXZlbnQpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCRzY29wZS5jb25maWcuZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLmNvbmZpZy50eXBlID09ICdtZW51Jykge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcE9wZW5TaWRlTmF2Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuY29uZmlnLnR5cGUgPT0gJ2JhY2snKSB7XHJcbiAgICAgICAgICAgICR3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBOYXZJY29uQ2xpY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5hdkljb25EaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgdHlwZTogJz1waXBUeXBlJyxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6ICc9cGlwSW1hZ2VVcmwnLFxyXG4gICAgICAgICAgICBpY29uOiAnPXBpcEljb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2ljb24vTmF2SWNvbi5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBOYXZJY29uRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdkljb24nKVxyXG4gICAgLmRpcmVjdGl2ZSgncGlwTmF2SWNvbicsIG5hdkljb25EaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IE5hdkljb25DaGFuZ2VkRXZlbnQgPSAncGlwTmF2SWNvbkNoYW5nZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdkljb25Db25maWcge1xyXG4gICAgLy8gVHlwZSBvZiBuYXYgaWNvbjogJ2JhY2snLCAnbWVudScsICdpbWFnZScgb3IgJ25vbmUnXHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgLy8gSW1hZ2UgdXJsXHJcbiAgICBwdWJsaWMgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIC8vIEljb24gbmFtZVxyXG4gICAgcHVibGljIGljb246IHN0cmluZztcclxuICAgIC8vIEhhbmRsZSBuYXYgaWNvbiBjbGljayBldmVudFxyXG4gICAgY2xpY2s6ICgpID0+IHZvaWQ7XHJcbiAgICAvLyBFdmVudCBuYW1lXHJcbiAgICBldmVudDogc3RyaW5nXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOYXZJY29uU2VydmljZSB7XHJcbiAgICByZWFkb25seSBjb25maWc6IE5hdkljb25Db25maWc7XHJcblxyXG4gICAgc2hvd01lbnUoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIHNob3dJY29uKGljb246IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIHNob3dCYWNrKGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzaG93SW1hZ2UoaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZDtcclxuICAgIGhpZGUoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2SWNvblByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBjb25maWc6IE5hdkljb25Db25maWc7XHJcblxyXG4gICAgc2V0TWVudShjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgc2V0SWNvbihpY29uOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzZXRCYWNrKGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQ7XHJcbiAgICBzZXRJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgY2xlYXIoKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgTmF2SWNvblNlcnZpY2UgaW1wbGVtZW50cyBJTmF2SWNvblNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZJY29uQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBOYXZJY29uQ29uZmlnLCAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkljb25Db25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNTdHJpbmcoY2FsbGJhY2tPckV2ZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dNZW51KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ21lbnUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0ljb24oaWNvbjogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpY29uJztcclxuICAgICAgICB0aGlzLl9jb25maWcuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93QmFjayhjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdiYWNrJztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpbWFnZSc7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KG51bGwpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoTmF2SWNvbkNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2SWNvblByb3ZpZGVyIGltcGxlbWVudHMgSU5hdkljb25Qcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdkljb25Db25maWcgPSBuZXcgTmF2SWNvbkNvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogTmF2SWNvblNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogTmF2SWNvbkNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogTmF2SWNvbkNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBOYXZJY29uQ29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc1N0cmluZyhjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNZW51KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ21lbnUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEljb24oaWNvbjogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpY29uJztcclxuICAgICAgICB0aGlzLl9jb25maWcuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QmFjayhjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdiYWNrJztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpbWFnZSc7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgTmF2SWNvblNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbiAgICAgXHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZJY29uJylcclxuICAgIC5wcm92aWRlcigncGlwTmF2SWNvbicsIE5hdkljb25Qcm92aWRlcik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBOYXZJY29uJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9OYXZJY29uU2VydmljZSc7XHJcbmltcG9ydCAnLi9OYXZJY29uRGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vTmF2SWNvblNlcnZpY2UnO1xyXG4iLCLvu78ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJy4vZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlcic7XHJcbmltcG9ydCAnLi9sYW5ndWFnZS9MYW5ndWFnZVBpY2tlckRpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9kcm9wZG93bi9Ecm9wZG93bkRpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi90YWJzL1RhYnNEaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vYWN0aW9ucyc7XHJcbmltcG9ydCAnLi9hcHBiYXInO1xyXG5pbXBvcnQgJy4vc2VhcmNoJztcclxuaW1wb3J0ICcuL2JyZWFkY3J1bWInO1xyXG5pbXBvcnQgJy4vc2lkZW5hdic7XHJcbmltcG9ydCAnLi9oZWFkZXInO1xyXG5pbXBvcnQgJy4vbWVudSc7XHJcbmltcG9ydCAnLi9pY29uJztcclxuaW1wb3J0ICcuL2NvbW1vbi9OYXZTZXJ2aWNlJztcclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdicsIFtcclxuICAgICAgICAncGlwTmF2U2VydmljZScsXHJcbiAgICAgICAgJ3BpcERyb3Bkb3duJyxcclxuICAgICAgICAncGlwVGFicycsXHJcbiAgICAgICAgJ3BpcEFwcEJhcicsXHJcbiAgICAgICAgJ3BpcFNlYXJjaEJhcicsXHJcbiAgICAgICAgJ3BpcE5hdkljb24nLFxyXG4gICAgICAgICdwaXBCcmVhZGNydW1iJyxcclxuICAgICAgICAncGlwQWN0aW9ucycsIFxyXG4gICAgICAgICdwaXBTaWRlTmF2JyxcclxuICAgICAgICAncGlwTmF2TWVudScsXHJcbiAgICAgICAgJ3BpcE5hdkhlYWRlcidcclxuICAgIF0pO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9hY3Rpb25zJztcclxuZXhwb3J0ICogZnJvbSAnLi9hcHBiYXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2JyZWFkY3J1bWInO1xyXG5leHBvcnQgKiBmcm9tICcuL3NlYXJjaCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2lkZW5hdic7XHJcbmV4cG9ydCAqIGZyb20gJy4vaWNvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbWVudSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaGVhZGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb21tb24vTmF2U2VydmljZSc7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuY2xhc3MgTGFuZ3VhZ2VQaWNrZXJEaXJlY3RpdmVDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgX3RyYW5zbGF0ZTogYW55O1xyXG4gICAgcHJpdmF0ZSBfdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkc2NvcGU6IGFueSwgXHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueSwgXHJcbiAgICAgICAgJGF0dHJzOiBhbnksIFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCBcclxuICAgICAgICAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxyXG4gICAgICAgICRpbmplY3RvcjogYW55XHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSAkdGltZW91dDtcclxuICAgICAgICB0aGlzLl90cmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1sYW5ndWFnZS1waWNrZXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZXMgPSAkc2NvcGUubGFuZ3VhZ2VzO1xyXG5cclxuICAgICAgICAvLyBUb2RvOiBXaGVyZSBpcyB0aGlzIGV2ZW50IGNvbWluZyBmcm9tPyBXaHkgbm90IHRocm91Z2ggc2VydmljZSBvciBhdHRyaWJ1dGU/XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcFNldExhbmd1YWdlcycsIHRoaXMuc2V0TGFuZ3VhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGFuZ3VhZ2VzOiBzdHJpbmdbXSA9IFsnZW4nLCAncnUnXTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxhbmd1YWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFuc2xhdGUgPyB0aGlzLl90cmFuc2xhdGUubGFuZ3VhZ2UgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRMYW5ndWFnZXMobGFuZykge1xyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VzID0gbGFuZy5sZW5ndGggPiAwID8gbGFuZyA6IFsnZW4nLCAncnUnXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25MYW5ndWFnZUNsaWNrKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYW5zbGF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlLmxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gbGFuZ3VhZ2VQaWNrZXJEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbGFuZ3VhZ2VzOiAnPWxhbmd1YWdlcycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXBsYWNlOiBmYWxzZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdsYW5ndWFnZS9MYW5ndWFnZVBpY2tlci5odG1sJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IExhbmd1YWdlUGlja2VyRGlyZWN0aXZlQ29udHJvbGxlcixcclxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgIH07XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcExhbmd1YWdlUGlja2VyJywgW1xyXG4gICAgICAgICduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcydcclxuICAgIF0pXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBMYW5ndWFnZVBpY2tlcicsIGxhbmd1YWdlUGlja2VyRGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBOYXZNZW51Q2hhbmdlZEV2ZW50ID0gJ3BpcE5hdk1lbnVDaGFuZ2VkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZNZW51TGluayB7XHJcbiAgICAvLyBOYW1lIHRvIHJlZmVyIHRvIHRoZSBpdGVtXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgLy8gTGluayB2aXNpYmxlIHRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIC8vIEljb24gbmFtZSBmcm9tICRpY29uUHJvdmlkZXJcclxuICAgIHB1YmxpYyBpY29uPzogc3RyaW5nO1xyXG4gICAgLy8gQ291bnRlciBiYWRnZVxyXG4gICAgcHVibGljIGNvdW50PzogbnVtYmVyO1xyXG4gICAgLy8gY2xhc3MgZm9yIGJhZGdlIHN0eWxlXHJcbiAgICBwdWJsaWMgYmFkZ2VTdHlsZT86IHN0cmluZztcclxuICAgIC8vIEFjY2VzcyBmdW5jdGlvblxyXG4gICAgcHVibGljIGFjY2Vzcz86IChsaW5rOiBOYXZNZW51TGluaykgPT4gYm9vbGVhbjtcclxuICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcbiAgICBwdWJsaWMgaHJlZj86IHN0cmluZztcclxuICAgIC8vICRsb2NhdGlvbi51cmxcclxuICAgIHB1YmxpYyB1cmw/OiBzdHJpbmc7XHJcbiAgICAvLyAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zKVxyXG4gICAgcHVibGljIHN0YXRlPzogc3RyaW5nO1xyXG4gICAgLy8gUGFyYW1ldGVycyBmb3IgJHN0YXRlLmdvKHN0YXRlLCBzdGF0ZVBhcmFtcylcclxuICAgIHB1YmxpYyBzdGF0ZVBhcmFtcz86IGFueTtcclxuICAgIC8vIHBhcmVudCBzdGF0ZSBvciBwYXJlbnQgc3RhdGUgZm9yIHNlbGVjdGlvbiBpdGVtIFxyXG4gICAgcHVibGljIHBhcmVudFN0YXRlPzogc3RyaW5nO1xyXG4gICAgLy8gJHJvb3RTY29wZS5icm9hZGNhc3QoZXZlbnQpXHJcbiAgICBwdWJsaWMgZXZlbnQ/OiBzdHJpbmc7XHJcbiAgICAvLyBDbGljayBjYWxsYmFja1xyXG4gICAgcHVibGljIGNsaWNrPzogKGxpbms6IE5hdk1lbnVMaW5rKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2TWVudVNlY3Rpb24ge1xyXG4gICAgLy8gTmFtZSB0byByZWZlciB0byB0aGUgc2VjdGlvblxyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIC8vIFNlY3Rpb24gdmlzaWJsZSB0aXRsZVxyXG4gICAgcHVibGljIHRpdGxlPzogc3RyaW5nO1xyXG4gICAgLy8gSWNvbiBuYW1lIGZyb20gJGljb25Qcm92aWRlclxyXG4gICAgcHVibGljIGljb24/OiBzdHJpbmc7XHJcbiAgICAvLyBMaW5rcyBzaG93biBpbiB0aGUgc2VjdGlvblxyXG4gICAgcHVibGljIGxpbmtzOiBOYXZNZW51TGlua1tdO1xyXG4gICAgLy8gQWNjZXNzIGZ1bmN0aW9uXHJcbiAgICBwdWJsaWMgYWNjZXNzPzogKHNlY3Rpb246IE5hdk1lbnVTZWN0aW9uKSA9PiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2TWVudUNvbmZpZyB7XHJcbiAgICBzZWN0aW9uczogTmF2TWVudVNlY3Rpb25bXTtcclxuICAgIGRlZmF1bHRJY29uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdk1lbnVTZXJ2aWNlIHtcclxuICAgIHNlY3Rpb25zOiBOYXZNZW51U2VjdGlvbltdO1xyXG4gICAgZGVmYXVsdEljb246IHN0cmluZztcclxuICAgIHVwZGF0ZUNvdW50KGxpbms6IHN0cmluZywgY291bnQ6IG51bWJlcik6IHZvaWQ7IFxyXG4gICAgdXBkYXRlQmFkZ2VTdHlsZShsaW5rOiBzdHJpbmcsIHN0eWxlOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgY2xlYXJDb3VudHMoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTmF2TWVudVByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBzZWN0aW9uczogTmF2TWVudVNlY3Rpb25bXTtcclxuICAgIGRlZmF1bHRJY29uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIE5hdk1lbnVTZXJ2aWNlIGltcGxlbWVudHMgSU5hdk1lbnVTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogTmF2TWVudUNvbmZpZztcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvbmZpZzogTmF2TWVudUNvbmZpZyxcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWN0aW9ucygpOiBOYXZNZW51U2VjdGlvbltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VjdGlvbnModmFsdWU6IE5hdk1lbnVTZWN0aW9uW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2VjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVmYXVsdEljb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmRlZmF1bHRJY29uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVCYWRnZVN0eWxlKGxpbms6IHN0cmluZywgc3R5bGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChsaW5rID09IG51bGwgfHwgIV8uaXNTdHJpbmcoc3R5bGUpKSByZXR1cm47XHJcblxyXG4gICAgICAgIF8uZWFjaCh0aGlzLl9jb25maWcuc2VjdGlvbnMsIChzKSA9PiB7XHJcbiAgICAgICAgICAgIF8uZWFjaChzLmxpbmtzLCAobCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGwubmFtZSA9PSBsaW5rKVxyXG4gICAgICAgICAgICAgICAgICAgIGwuYmFkZ2VTdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRlZmF1bHRJY29uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZGVmYXVsdEljb24gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDb3VudChsaW5rOiBzdHJpbmcsIGNvdW50OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAobGluayA9PSBudWxsIHx8ICFfLmlzTnVtYmVyKGNvdW50KSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnNlY3Rpb25zLCAocykgPT4ge1xyXG4gICAgICAgICAgICBfLmVhY2gocy5saW5rcywgKGwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsLm5hbWUgPT0gbGluaylcclxuICAgICAgICAgICAgICAgICAgICBsLmNvdW50ID0gY291bnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckNvdW50cygpOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnNlY3Rpb25zLCAocykgPT4ge1xyXG4gICAgICAgICAgICBfLmVhY2gocy5saW5rcywgKGwpID0+IHtcclxuICAgICAgICAgICAgICAgIGwuY291bnQgPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDaGFuZ2VFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoTmF2TWVudUNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2TWVudVByb3ZpZGVyIGltcGxlbWVudHMgSU5hdk1lbnVQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdk1lbnVDb25maWcgPSB7XHJcbiAgICAgICAgc2VjdGlvbnM6IFtdLFxyXG4gICAgICAgIGRlZmF1bHRJY29uOiAnaWNvbnM6Zm9sZGVyJ1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IE5hdk1lbnVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VjdGlvbnMoKTogTmF2TWVudVNlY3Rpb25bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlY3Rpb25zKHZhbHVlOiBOYXZNZW51U2VjdGlvbltdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZWZhdWx0SWNvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZGVmYXVsdEljb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkZWZhdWx0SWNvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmRlZmF1bHRJY29uID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBOYXZNZW51U2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZNZW51JylcclxuICAgIC5wcm92aWRlcigncGlwTmF2TWVudScsIE5hdk1lbnVQcm92aWRlcik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFByZXZlbnQganVuayBmcm9tIGdvaW5nIGludG8gdHlwZXNjcmlwdCBkZWZpbml0aW9uc1xyXG4oKCkgPT4ge1xyXG5cclxuICAgIGZ1bmN0aW9uIFN0aWNreU5hdk1lbnVEaXJlY3RpdmVDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRyb290U2NvcGUsICR3aW5kb3csICRsb2NhdGlvbiwgJHRpbWVvdXQsICRpbmplY3RvciwgcGlwU2lkZU5hdiwgcGlwTmF2TWVudSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdmFyIGFuaW1hdGlvbkR1cmF0aW9uID0gNDUwLFxyXG4gICAgICAgICAgICBwaXBTaWRlTmF2RWxlbWVudCA9ICRlbGVtZW50LnBhcmVudCgpLnBhcmVudCgpO1xyXG4gICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtc3RpY2t5LW5hdi1tZW51Jyk7XHJcblxyXG4gICAgICAgICRzY29wZS5zZWN0aW9ucyA9ICRzY29wZS5zZWN0aW9ucyB8fCBwaXBOYXZNZW51LnNlY3Rpb25zO1xyXG4gICAgICAgICRzY29wZS5zaG93VG9vbHRpcCA9IHRydWU7XHJcbiAgICAgICAgLy8gcGlwTmF2TWVudS5zZWN0aW9ucyA9ICRzY29wZS5zZWN0aW9ucztcclxuICAgICAgICBzZXRDb2xsYXBzaWJsZSgpO1xyXG4gICAgICAgIC8vIHRvZG8gc2V0IGZyb20gc2VydmljZXNcclxuICAgICAgICAkc2NvcGUuZGVmYXVsdEljb24gPSBwaXBOYXZNZW51LmRlZmF1bHRJY29uO1xyXG5cclxuICAgICAgICBvblN0YXRlQ2hhbmdlZChudWxsLCBwaXBTaWRlTmF2LnN0YXRlKTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcE5hdk1lbnVDaGFuZ2VkJywgb25Db25maWdDaGFuZ2VkKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdlN0YXRlQ2hhbmdlZCcsIG9uU3RhdGVDaGFuZ2VkKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLml0ZW1WaXNpYmxlID0gaXNIaWRkZW47XHJcbiAgICAgICAgJHNjb3BlLmNsaWNrTGluayA9IGNsaWNrTGluaztcclxuICAgICAgICAkc2NvcGUuaXNTZWN0aW9uRW1wdHkgPSBpc1NlY3Rpb25FbXB0eTtcclxuICAgICAgICAkc2NvcGUub25FeHBhbmQgPSBvbkV4cGFuZDtcclxuICAgICAgICAkc2NvcGUuaXNBY3RpdmUgPSBpc0FjdGl2ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRDb2xsYXBzaWJsZSgpIHtcclxuICAgICAgICAgICAgdmFyIGNvbGxhcHNlZDtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbigkc2NvcGUuY29sbGFwc2VkKSkge1xyXG4gICAgICAgICAgICAgICAgY29sbGFwc2VkID0gJHNjb3BlLmNvbGxhcHNlZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29sbGFwc2VkID0gJHNjb3BlLmNvbGxhcHNlZCAhPT0gZmFsc2UgJiYgJHNjb3BlLmNvbGxhcHNlZCAhPT0gJ2ZhbHNlJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gY29sbGFwc2VkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25FeHBhbmQoKSB7XHJcbiAgICAgICAgICAgIGlmICghJHNjb3BlLmlzQ29sbGFwc2VkKSB7IHJldHVybiB9XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuZXhwYW5kZWQgPSAhJHNjb3BlLmV4cGFuZGVkO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRzY29wZS5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgcGlwU2lkZU5hdkVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LXNtYWxsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2RWxlbWVudC5hZGRDbGFzcygncGlwLXN0aWNreS1uYXYtc21hbGwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRlbWl0KCdwaXBOYXZFeHBhbmRlZCcsICRzY29wZS5leHBhbmRlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpc0hpZGRlbihpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtICYmIGl0ZW0uYWNjZXNzICYmICFpdGVtLmFjY2VzcyhpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlzU2VjdGlvbkVtcHR5KGxpbmtDb2xsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICBfLmVhY2gobGlua0NvbGxlY3Rpb24sIGZ1bmN0aW9uIChsaW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzSGlkZGVuKGxpbmspKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uQ29uZmlnQ2hhbmdlZChldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmICghY29uZmlnKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuc2VjdGlvbnMgPSBjb25maWcuc2VjdGlvbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlZChldmVudCwgc3RhdGUpIHtcclxuICAgICAgICAgICAgLy8gU1M+IFlvdSBzaGFsbCBub3Qgc2V0IGl0IGludG8gdGhlIG1lbnUgc3RhdGUuIEluc3RlYWQgaXQgc2hhbGwgYmUgY29udHJvbGxlZCBieSB0aGUgc3RhdGUgb2YgU2lkZW5hdlxyXG4gICAgICAgICAgICAvL3BpcE5hdk1lbnUuY29sbGFwc2VkKHN0YXRlLmV4cGFuZCk7XHJcbiAgICAgICAgICAgIGlmICghc3RhdGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5pc0NvbGxhcHNlZCA9IHN0YXRlLmV4cGFuZDtcclxuICAgICAgICAgICAgJHNjb3BlLmV4cGFuZGVkID0gc3RhdGUuaXNFeHBhbmRlZDtcclxuICAgICAgICAgICAgJHNjb3BlLmV4cGFuZGVkQnV0dG9uID0gc3RhdGUuZXhwYW5kZWRCdXR0b247XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuc2lkZU5hdlN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpc0FjdGl2ZShsaW5rKSB7XHJcbiAgICAgICAgICAgIGlmIChsaW5rLnBhcmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmhhcygnJHN0YXRlJykgPyAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlICE9IG51bGwgJiYgJHN0YXRlLmluY2x1ZGVzKGxpbmsucGFyZW50U3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluay5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRzdGF0ZSA9ICRpbmplY3Rvci5oYXMoJyRzdGF0ZScpID8gJGluamVjdG9yLmdldCgnJHN0YXRlJykgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzdGF0ZSAhPSBudWxsICYmICRzdGF0ZS5pbmNsdWRlcyhsaW5rLnN0YXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmsuaHJlZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdID09PSAkd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmsudXJsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluay51cmwuc3BsaXQoL1tcXHMvP10rLylbMV0gPT09ICRsb2NhdGlvbi51cmwoKS5zcGxpdCgvW1xccy8/XSsvKVsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xpY2tMaW5rKGV2ZW50LCBsaW5rKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaW5rKSB7XHJcbiAgICAgICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsaW5rLmhyZWYpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLmhyZWYuc3BsaXQoJz8nKVswXSA9PT0gJHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rLmhyZWY7XHJcbiAgICAgICAgICAgICAgICB9LCBhbmltYXRpb25EdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxpbmsudXJsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluay51cmwuc3BsaXQoL1tcXHMvP10rLylbMV0gPT09ICRsb2NhdGlvbi51cmwoKS5zcGxpdCgvW1xccy8/XSsvKVsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi51cmwobGluay51cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgYW5pbWF0aW9uRHVyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChsaW5rLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmhhcygnJHN0YXRlJykgPyAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzdGF0ZSAhPSBudWxsICYmICRzdGF0ZS5jdXJyZW50Lm5hbWUgPT09IGxpbmsuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwaXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGluamVjdG9yLmhhcygnJHN0YXRlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRzdGF0ZSA9ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28obGluay5zdGF0ZSwgbGluay5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgYW5pbWF0aW9uRHVyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChsaW5rLmV2ZW50KVxyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KGxpbmsuZXZlbnQsIGxpbmspO1xyXG5cclxuICAgICAgICAgICAgcGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdGlja3lOYXZNZW51RGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgLy8gc2VjdGlvbnM6ICc/PXBpcFNlY3Rpb25zJyxcclxuICAgICAgICAgICAgICAgIC8vIGNvbGxhcHNlZDogJz1waXBDb2xsYXBzZWQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ21lbnUvU3RpY2t5TmF2TWVudS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogU3RpY2t5TmF2TWVudURpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBOYXZNZW51JylcclxuICAgICAgICAuZGlyZWN0aXZlKCdwaXBTdGlja3lOYXZNZW51Jywgc3RpY2t5TmF2TWVudURpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBOYXZNZW51JywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9OYXZNZW51U2VydmljZSc7XHJcbmltcG9ydCAnLi9TdGlja3lOYXZNZW51RGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vTmF2TWVudVNlcnZpY2UnOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IFNlYXJjaENvbmZpZyB9IGZyb20gJy4vU2VhcmNoU2VydmljZSc7XHJcbmltcG9ydCB7IElTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9TZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VhcmNoQ2hhbmdlZEV2ZW50IH0gZnJvbSAnLi9TZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VhcmNoQWN0aXZhdGVkRXZlbnQgfSBmcm9tICcuL1NlYXJjaFNlcnZpY2UnO1xyXG5cclxuLy8gUHJldmVudCBqdW5rIGZyb20gZ29pbmcgaW50byB0eXBlc2NyaXB0IGRlZmluaXRpb25zXHJcbigoKSA9PiB7XHJcblxyXG5jbGFzcyBTZWFyY2hCYXJDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9lbGVtZW50OiBhbnk7XHJcblxyXG4gICAgcHVibGljIGNvbmZpZzogU2VhcmNoQ29uZmlnO1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzZWFyY2g6IGFueSA9IHsgdGV4dDogJycgfTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKFxyXG4gICAgICAgICRlbGVtZW50LCBcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSwgXHJcbiAgICAgICAgcGlwU2VhcmNoOiBJU2VhcmNoU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSAkZWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zZWFyY2gtYmFyJyk7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gcGlwU2VhcmNoLmNvbmZpZztcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oU2VhcmNoQ2hhbmdlZEV2ZW50LCAoZXZlbnQsIGNvbmZpZykgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5vblNlYXJjaENoYW5nZWQoZXZlbnQsIGNvbmZpZyk7IFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGVDaGFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZWxlbWVudCcsIHRoaXMuX2VsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9lbGVtZW50LmFkZENsYXNzKCd3LXN0cmV0Y2gnKTtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5hZGRDbGFzcygndy1zdHJldGNoJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQucGFyZW50KCkuYWRkQ2xhc3MoJ3BpcC1zZWFyY2gtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbGVtZW50JywgdGhpcy5fZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2VsZW1lbnQucmVtb3ZlQ2xhc3MoJ3ctc3RyZXRjaCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUNsYXNzKCd3LXN0cmV0Y2gnKTtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5wYXJlbnQoKS5yZW1vdmVDbGFzcygncGlwLXNlYXJjaC1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNlYXJjaENoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoLnRleHQgPSAnJztcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmb2N1c1RleHQoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gJCgnLnBpcC1zZWFyY2gtdGV4dCcpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2gudGV4dCA9IHRoaXMuY29uZmlnLmNyaXRlcmlhO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mb2N1c1RleHQoKTtcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xpY2soKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaCA9IHRoaXMuc2VhcmNoLnRleHQ7XHJcblxyXG4gICAgICAgIHRoaXMuc2VhcmNoLnRleHQgPSAnJztcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jYWxsYmFjaylcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuY2FsbGJhY2soc2VhcmNoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RTY29wZS4kYnJvYWRjYXN0KFNlYXJjaEFjdGl2YXRlZEV2ZW50LCBzZWFyY2gpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2gudGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaC50ZXh0ID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUZXh0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbktleURvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIC8vIEVudGVyIHByZXNzZWRcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpXHJcbiAgICAgICAgICAgIHRoaXMub25DbGljaygpO1xyXG4gICAgICAgIC8vIEVTQyBwcmVzc2VkXHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzZWFyY2hCYXJEaXJlY3RpdmUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VhcmNoL1NlYXJjaEJhci5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBTZWFyY2hCYXJDb250cm9sbGVyLFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgfTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcFNlYXJjaEJhcicpXHJcbiAgICAuZGlyZWN0aXZlKCdwaXBTZWFyY2hCYXInLCBzZWFyY2hCYXJEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgbGV0IE9wZW5TZWFyY2hFdmVudCA9ICdwaXBPcGVuU2VhcmNoJztcclxuZXhwb3J0IGxldCBDbG9zZVNlYXJjaEV2ZW50ID0gJ3BpcENsb3NlU2VhcmNoJztcclxuZXhwb3J0IGxldCBTZWFyY2hDaGFuZ2VkRXZlbnQgPSAncGlwU2VhcmNoQ2hhbmdlZCc7XHJcbmV4cG9ydCBsZXQgU2VhcmNoQWN0aXZhdGVkRXZlbnQgPSAncGlwU2VhcmNoQWN0aXZhdGVkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hDb25maWcge1xyXG4gICAgLy8gU2VhcmNoIHZpc2libGVcclxuICAgIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgLy8gU2VhcmNoIGNyaXRlcmlhXHJcbiAgICBwdWJsaWMgY3JpdGVyaWE6IHN0cmluZztcclxuICAgIC8vIEN1c3RvbSBzZWFyY2ggcGFyYW1ldGVyc1xyXG4gICAgcHVibGljIHBhcmFtczogYW55O1xyXG4gICAgLy8gSGlzdG9yeSBmb3Igc2VhcmNoIGF1dG9jb21wbGV0ZVxyXG4gICAgcHVibGljIGhpc3Rvcnk6IHN0cmluZ1tdO1xyXG4gICAgLy8gQ2FsbGJhY2sgZm9yIHNlYXJjaFxyXG4gICAgY2FsbGJhY2s6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZWFyY2hTZXJ2aWNlIHtcclxuICAgIGNvbmZpZzogU2VhcmNoQ29uZmlnO1xyXG4gICAgY3JpdGVyaWE6IHN0cmluZztcclxuICAgIHBhcmFtczogYW55O1xyXG4gICAgaGlzdG9yeTogc3RyaW5nW107XHJcbiAgICBjYWxsYmFjazogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQ7XHJcblxyXG4gICAgc2V0KGNhbGxiYWNrOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZCwgY3JpdGVyaWE/OiBzdHJpbmcsIHBhcmFtcz86IGFueSwgaGlzdG9yeT86IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIGNsZWFyKCk6IHZvaWQ7XHJcbiAgICBvcGVuKCk6IHZvaWQ7XHJcbiAgICBjbG9zZSgpOiB2b2lkO1xyXG4gICAgdG9nZ2xlKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNlYXJjaFByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7ICAgIFxyXG59XHJcblxyXG5cclxuY2xhc3MgU2VhcmNoU2VydmljZSBpbXBsZW1lbnRzIElTZWFyY2hTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogU2VhcmNoQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBTZWFyY2hDb25maWcsXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbihPcGVuU2VhcmNoRXZlbnQsICgpID0+IHsgdGhpcy5vcGVuIH0pO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKENsb3NlU2VhcmNoRXZlbnQsICgpID0+IHsgdGhpcy5jbG9zZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBTZWFyY2hDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjcml0ZXJpYSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY3JpdGVyaWE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjcml0ZXJpYSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmFtcygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFyYW1zKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFyYW1zID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhpc3RvcnkoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaGlzdG9yeTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGhpc3RvcnkodmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmhpc3RvcnkgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2FsbGJhY2soKTogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjYWxsYmFjayh2YWx1ZTogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2FsbGJhY2sgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQoY2FsbGJhY2s6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkLCBjcml0ZXJpYT86IHN0cmluZywgcGFyYW1zPzogYW55LCBoaXN0b3J5Pzogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSBjcml0ZXJpYTtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5oaXN0b3J5ID0gaGlzdG9yeTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcmFtcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTsgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gZmFsc2U7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpOyAgICAgICAgICAgICAgICBcclxuICAgIH0gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgcHVibGljIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9ICF0aGlzLl9jb25maWcudmlzaWJsZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpOyAgICAgICAgICAgICAgICBcclxuICAgIH0gICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoU2VhcmNoQ2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTZWFyY2hQcm92aWRlciBpbXBsZW1lbnRzIElTZWFyY2hQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IFNlYXJjaENvbmZpZyA9IG5ldyBTZWFyY2hDb25maWcoKTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IFNlYXJjaFNlcnZpY2UgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9IFxyXG59XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcFNlYXJjaEJhcicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcFNlYXJjaCcsIFNlYXJjaFByb3ZpZGVyKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcFNlYXJjaEJhcicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVHJhbnNsYXRlJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vU2VhcmNoU2VydmljZSc7XHJcbmltcG9ydCAnLi9TZWFyY2hCYXJEaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9TZWFyY2hTZXJ2aWNlJzsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbiAgICBmdW5jdGlvbiBTaWRlTmF2UGFydERpcmVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcm9vdFNjb3BlLCBwaXBTaWRlTmF2KSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXIgcGFydE5hbWUgPSAnJyArICRhdHRycy5waXBTaWRlbmF2UGFydDtcclxuICAgICAgICB2YXIgcGFydFZhbHVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gQnJlYWsgcGFydCBhcGFydFxyXG4gICAgICAgIHZhciBwb3MgPSBwYXJ0TmFtZS5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgaWYgKHBvcyA+IDApIHtcclxuICAgICAgICAgICAgcGFydFZhbHVlID0gcGFydE5hbWUuc3Vic3RyKHBvcyArIDEpO1xyXG4gICAgICAgICAgICBwYXJ0TmFtZSA9IHBhcnROYW1lLnN1YnN0cigwLCBwb3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25TaWRlTmF2Q2hhbmdlZChudWxsLCBwaXBTaWRlTmF2LmNvbmZpZylcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdkNoYW5nZWQnLCBvblNpZGVOYXZDaGFuZ2VkKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25TaWRlTmF2Q2hhbmdlZChldmVudCwgY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IGNvbmZpZy5wYXJ0cyB8fCB7fTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRQYXJ0VmFsdWUgPSBwYXJ0c1twYXJ0TmFtZV07XHJcbiAgICAgICAgICAgIHZhciB2aXNpYmxlID0gISEocGFydFZhbHVlID8gY3VycmVudFBhcnRWYWx1ZSA9PSBwYXJ0VmFsdWUgOiBjdXJyZW50UGFydFZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2aXNpYmxlICE9ICRzY29wZS52aXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2lkZW5hdlBhcnREaXJlY3RpdmUobmdJZkRpcmVjdGl2ZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdmFyIG5nSWYgPSBuZ0lmRGlyZWN0aXZlWzBdO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiBuZ0lmLnRyYW5zY2x1ZGUsXHJcbiAgICAgICAgICAgIHByaW9yaXR5OiBuZ0lmLnByaW9yaXR5LFxyXG4gICAgICAgICAgICB0ZXJtaW5hbDogbmdJZi50ZXJtaW5hbCxcclxuICAgICAgICAgICAgcmVzdHJpY3Q6IG5nSWYucmVzdHJpY3QsXHJcbiAgICAgICAgICAgIHNjb3BlOiB0cnVlLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiBsaW5rRnVuY3Rpb24oJHNjb3BlOiBhbnksICRlbGVtZW50LCAkYXR0cnMpIHtcclxuICAgICAgICAgICAgICAgICRhdHRycy5uZ0lmID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJHNjb3BlLnZpc2libGUgfTtcclxuICAgICAgICAgICAgICAgIG5nSWYubGluay5hcHBseShuZ0lmLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBTaWRlTmF2UGFydERpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBTaWRlTmF2JylcclxuICAgICAgICAuZGlyZWN0aXZlKCdwaXBTaWRlbmF2UGFydCcsIHNpZGVuYXZQYXJ0RGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGxldCBTaWRlTmF2Q2hhbmdlZEV2ZW50ID0gJ3BpcFNpZGVOYXZDaGFuZ2VkJztcclxuZXhwb3J0IGxldCBTaWRlTmF2U3RhdGVDaGFuZ2VkRXZlbnQgPSAncGlwU2lkZU5hdlN0YXRlQ2hhbmdlZCc7XHJcbmV4cG9ydCBsZXQgT3BlblNpZGVOYXZFdmVudCA9ICdwaXBPcGVuU2lkZU5hdic7XHJcbmV4cG9ydCBsZXQgQ2xvc2VTaWRlTmF2RXZlbnQgPSAncGlwQ2xvc2VTaWRlTmF2JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlTmF2Q29uZmlnIHtcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxuICAgIHN0YXRlOiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2aXNpYmxlOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaWRlTmF2U2VydmljZSB7XHJcbiAgICByZWFkb25seSBjb25maWc6IFNpZGVOYXZDb25maWc7XHJcbiAgICByZWFkb25seSBjbGFzc2VzOiBzdHJpbmdbXTtcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBzdGF0ZTogYW55O1xyXG5cclxuICAgIG9wZW4oKTogdm9pZDtcclxuICAgIGNsb3NlKCk6IHZvaWQ7XHJcbiAgICB0b2dnbGUoKTogdm9pZDtcclxuICAgIHNob3coKTogdm9pZDtcclxuICAgIGhpZGUoKTogdm9pZDtcclxuXHJcbiAgICBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcblxyXG4gICAgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaWRlTmF2UHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGNvbmZpZzogU2lkZU5hdkNvbmZpZztcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgY2xhc3Nlczogc3RyaW5nW107XHJcblxyXG4gICAgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkO1xyXG5cclxuICAgIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgU2lkZU5hdlNlcnZpY2UgaW1wbGVtZW50cyBJU2lkZU5hdlNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBTaWRlTmF2Q29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfc3RhdGU6IGFueTtcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9zaWRlbmF2OiBuZy5tYXRlcmlhbC5JU2lkZW5hdlNlcnZpY2U7XHJcbiAgICBwcml2YXRlIGlkID0gJ3BpcC1zdGlja3ktc2lkZW5hdic7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogU2lkZU5hdkNvbmZpZywgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsICRtZFNpZGVuYXY6IG5nLm1hdGVyaWFsLklTaWRlbmF2U2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgIHRoaXMuX3NpZGVuYXYgPSAkbWRTaWRlbmF2O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IFNpZGVOYXZDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJ0cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gdmFsdWUgfHwge307XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXRlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc3RhdGUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gdmFsdWUgfHwge307XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRicm9hZGNhc3QoU2lkZU5hdlN0YXRlQ2hhbmdlZEV2ZW50LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5fc2lkZW5hdih0aGlzLmlkKS5vcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX3NpZGVuYXYodGhpcy5pZCkuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlKCkge1xyXG4gICAgICAgIHRoaXMuX3NpZGVuYXYodGhpcy5pZCkudG9nZ2xlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3coKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWcudmlzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcudmlzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaChjKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IF8ucmVqZWN0KHRoaXMuX2NvbmZpZy5jbGFzc2VzLCAoY2MpID0+IGNjID09IGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzW3BhcnRdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDb25maWdFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoU2lkZU5hdkNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU2lkZU5hdlByb3ZpZGVyIGltcGxlbWVudHMgSVNpZGVOYXZQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IFNpZGVOYXZDb25maWcgPSB7XHJcbiAgICAgICAgcGFydHM6IHt9LFxyXG4gICAgICAgIGNsYXNzZXM6IFtdLFxyXG4gICAgICAgIHR5cGU6ICdzdGlja3knLFxyXG4gICAgICAgIHN0YXRlOiBudWxsLFxyXG4gICAgICAgIHZpc2libGU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogU2lkZU5hdlNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogU2lkZU5hdkNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogU2lkZU5hdkNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBTaWRlTmF2Q29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJ0cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gdmFsdWUgfHwge307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy52aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGFzc2VzKHZhbHVlOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzW3BhcnRdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsICRtZFNpZGVuYXY6IG5nLm1hdGVyaWFsLklTaWRlbmF2U2VydmljZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBTaWRlTmF2U2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUsICRtZFNpZGVuYXYpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaG9va1NpZGVOYXZFdmVudHMoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsIHBpcFNpZGVOYXY6IElTaWRlTmF2U2VydmljZSkge1xyXG4gICAgJHJvb3RTY29wZS4kb24oT3BlblNpZGVOYXZFdmVudCwgKCkgPT4geyBwaXBTaWRlTmF2Lm9wZW4oKTsgfSk7XHJcbiAgICAkcm9vdFNjb3BlLiRvbihDbG9zZVNpZGVOYXZFdmVudCwgKCkgPT4geyBwaXBTaWRlTmF2LmNsb3NlKCk7IH0pO1xyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBTaWRlTmF2JylcclxuICAgIC5wcm92aWRlcigncGlwU2lkZU5hdicsIFNpZGVOYXZQcm92aWRlcilcclxuICAgIC5ydW4oaG9va1NpZGVOYXZFdmVudHMpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbiAgICBmdW5jdGlvbiBTdGlja3lTaWRlTmF2RGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkcm9vdFNjb3BlLCAkaW5qZWN0b3IsICRtZE1lZGlhLCAkdGltZW91dCwgcGlwU2lkZU5hdikge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgLy8gdmFyIHBpcE1lZGlhID0gJG1kTWVkaWEsIFxyXG4gICAgICAgIHZhciBwaXBNZWRpYSA9ICRpbmplY3Rvci5oYXMoJ3BpcE1lZGlhJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBNZWRpYScpIDogbnVsbCxcclxuICAgICAgICAgICAgbWFpbkNvbnRhaW5lciA9ICcucGlwLW1haW4nLFxyXG4gICAgICAgICAgICBiaWdXaWR0aCA9IDMyMCwgLy8gZXhwYW5kZWQgc2lkZW5hdiB3aWR0aFxyXG4gICAgICAgICAgICBtaWRkbGVXaWR0aCA9IDI0MCxcclxuICAgICAgICAgICAgc21hbGxXaWR0aCA9IDcyLCAvLyBzaHJpbmsgc2lkZW5hdiB3aWR0aFxyXG4gICAgICAgICAgICBpc1Jlc2l6aW5nID0gZmFsc2UsXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uID0gNjAwLFxyXG4gICAgICAgICAgICBtZWRpYUJyZWFrcG9pbnRzO1xyXG5cclxuICAgICAgICBwaXBNZWRpYSA9IHBpcE1lZGlhICE9PSB1bmRlZmluZWQgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG5cclxuICAgICAgICAkc2NvcGUubmF2U3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZTogeyAvLyBtZWRpYShzbSwgeHMpXHJcbiAgICAgICAgICAgICAgICBpZDogJ3RvZ2dsZScsXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogJ3NpZGVuYXYtbW9iaWxlJywgLy8gY2hhbmdlIHNpemUsIGNvbG9yLCBzZWxlY3RlZD9cclxuICAgICAgICAgICAgICAgIHNob3dIZWFkZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpc0xvY2tlZE9wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kZWRCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dJY29uVG9vbHR5cGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNtYWxsOiB7IC8vIG1lZGlhKG1kKVxyXG4gICAgICAgICAgICAgICAgaWQ6ICdzbWFsbCcsXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogJ3BpcC1zdGlja3ktbmF2LXNtYWxsIHNpZGVuYXYtc21hbGxkZXNrdG9wJywgLy8gY2hhbmdlIHNpemUsIGNvbG9yLCBzZWxlY3RlZD9cclxuICAgICAgICAgICAgICAgIHNob3dIZWFkZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNMb2NrZWRPcGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kZWRCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBleHBhbmQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0ljb25Ub29sdHlwZTogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXJnZTogeyAvLyBtZWRpYShsZylcclxuICAgICAgICAgICAgICAgIGlkOiAnbGFyZ2UnLFxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6ICdzaWRlbmF2LXNtYWxsZGVza3RvcCcsIC8vIGNoYW5nZSBzaXplLCBjb2xvciwgc2VsZWN0ZWQ/XHJcbiAgICAgICAgICAgICAgICBzaG93SGVhZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGlzTG9ja2VkT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZGVkQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV4cGFuZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dJY29uVG9vbHR5cGU6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeGxhcmdlOiB7IC8vIG1lZGlhKHhsKVxyXG4gICAgICAgICAgICAgICAgaWQ6ICd4bGFyZ2UnLFxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6ICdzaWRlbmF2LWRlc2t0b3AnLCAvLyBjaGFuZ2Ugc2l6ZSwgY29sb3IsIHNlbGVjdGVkP1xyXG4gICAgICAgICAgICAgICAgc2hvd0hlYWRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0xvY2tlZE9wZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBleHBhbmRlZEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0V4cGFuZGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXhwYW5kOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0ljb25Ub29sdHlwZTogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1lZGlhQnJlYWtwb2ludHMgPSBzZXRCcmVha3BvaW50cygpO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXN0aWNreS1zaWRlbmF2Jyk7XHJcblxyXG4gICAgICAgIGlmIChwaXBTaWRlTmF2LmNvbmZpZyAmJiBwaXBTaWRlTmF2LmNvbmZpZy50eXBlICE9ICdwb3B1cCcpIHtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0U2lkZU5hdmVTdGF0ZSgpXHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgd2luZG93UmVzaXplID0gXy5kZWJvdW5jZShzZXRTaWRlTmF2ZVN0YXRlLCAxMCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBNYWluUmVzaXplZCcsIHdpbmRvd1Jlc2l6ZSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGUnLCBvblNpZGVOYXZTdGF0ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXNSZXNpemluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2lkZW5hdlN0YXRlID0gbnVsbDtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhdGUoJ3RvZ2dsZScpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBOYXZJY29uQ2xpY2tlZCcsIG9uTmF2SWNvbkNsaWNrKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdkNoYW5nZWQnLCBvblNpZGVOYXZDaGFuZ2VkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGZ1bmN0aW9uIHNldEJyZWFrcG9pbnRzKCkge1xyXG4gICAgICAgICAgICBpZiAoIXBpcE1lZGlhIHx8ICFhbmd1bGFyLmlzT2JqZWN0KHBpcE1lZGlhLmJyZWFrcG9pbnRzKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeHM6IDYzOSwgc206IDk1OSwgbWQ6IDEwMjQsIGxnOiAxOTE5IH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGlwTWVkaWEuYnJlYWtwb2ludHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uU2lkZU5hdkNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uTmF2SWNvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHBpcFNpZGVOYXYub3BlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25TaWRlTmF2U3RhdGUoZXZlbnQsIHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHN0YXRlKSAmJiAkc2NvcGUubmF2U3RhdGVbc3RhdGVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNldFN0YXRlKHN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U2lkZU5hdmVTdGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKGlzUmVzaXppbmcpIHtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KHNldFNpZGVOYXZlU3RhdGUsIGFuaW1hdGlvbkR1cmF0aW9uKTsgLy8gZm9yIFxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG1haW5XaWR0aCA9ICQobWFpbkNvbnRhaW5lcikuaW5uZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICBsZXQgc2lkZU5hdldpZHRoID0gJCgnLnBpcC1zdGlja3ktc2lkZW5hdicpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRXaWR0aCA9IHNpZGVOYXZXaWR0aCA/IHNpZGVOYXZXaWR0aCArIDIgOiAwOyAvLyBhZGQgYm9yZGVyIHdpZHRoXHJcblxyXG4gICAgICAgICAgICBpZiAobWFpbldpZHRoICsgY3VycmVudFdpZHRoIDwgbWVkaWFCcmVha3BvaW50cy5zbSApIHtcclxuICAgICAgICAgICAgICAgIHNldFN0YXRlKCd0b2dnbGUnLCApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChtYWluV2lkdGggKyBjdXJyZW50V2lkdGggPCBtZWRpYUJyZWFrcG9pbnRzLm1kICkge1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhdGUoJ3NtYWxsJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgaWYgKG1haW5XaWR0aCArIGN1cnJlbnRXaWR0aCA8IG1lZGlhQnJlYWtwb2ludHMubGcgKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZSgnbGFyZ2UnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFN0YXRlKCd4bGFyZ2UnKTsgICAgIFxyXG4gICAgICAgICAgICAvLyBpZiAobWFpbldpZHRoIDwgbWVkaWFCcmVha3BvaW50cy5zbSkge1xyXG4gICAgICAgICAgICAvLyAgICAgc2V0U3RhdGUoJ3RvZ2dsZScpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBpZiAobWFpbldpZHRoIDwgbWVkaWFCcmVha3BvaW50cy5tZCArIHNtYWxsV2lkdGggJiYgbWFpbldpZHRoID49IG1lZGlhQnJlYWtwb2ludHMuc20gKyBzbWFsbFdpZHRoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBzZXRTdGF0ZSgnc21hbGwnKTtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBpZiAobWFpbldpZHRoID49IG1lZGlhQnJlYWtwb2ludHMubWQgKyBiaWdXaWR0aCAmJiBtYWluV2lkdGggPD0gbWVkaWFCcmVha3BvaW50cy5sZykge1xyXG4gICAgICAgICAgICAvLyAgICAgc2V0U3RhdGUoJ2xhcmdlJyk7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gaWYgKG1haW5XaWR0aCA+IG1lZGlhQnJlYWtwb2ludHMubGcpIHtcclxuICAgICAgICAgICAgLy8gICAgIHNldFN0YXRlKCd4bGFyZ2UnKTtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKCEkc2NvcGUuc2lkZW5hdlN0YXRlIHx8ICEkc2NvcGUuc2lkZW5hdlN0YXRlLmlkKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAobWFpbldpZHRoIDwgbWVkaWFCcmVha3BvaW50cy5zbSArIHNtYWxsV2lkdGgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBzZXRTdGF0ZSgndG9nZ2xlJyk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIGlmIChtYWluV2lkdGggPiBtZWRpYUJyZWFrcG9pbnRzLm1kICsgYmlnV2lkdGgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBzZXRTdGF0ZSgnbGFyZ2UnKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICBzZXRTdGF0ZSgnc21hbGwnKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U3RhdGUoc3RhdGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoaXNSZXNpemluZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNpZGVuYXZTdGF0ZSAmJiAkc2NvcGUuc2lkZW5hdlN0YXRlLmlkID09IHN0YXRlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgIT0gJ3RvZ2dsZScpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCdzaWRlbmF2LW1vYmlsZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgIT0gJ3NtYWxsJykge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LXNtYWxsJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSAhPSAneGxhcmdlJykge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtZGVza3RvcCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgIT0gJ2xhcmdlJykge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtc21hbGxkZXNrdG9wJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmIChzdGF0ZSA9PSAndG9nZ2xlJykge1xyXG4gICAgICAgICAgICAvLyAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtZGVza3RvcCcpO1xyXG4gICAgICAgICAgICAvLyAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtZGVza3RvcCcpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGlzUmVzaXppbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT0gJ3RvZ2dsZScpIHtcclxuICAgICAgICAgICAgICAgIHBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc2NvcGUuc2lkZW5hdlN0YXRlID0gJHNjb3BlLm5hdlN0YXRlW3N0YXRlXTtcclxuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJHNjb3BlLnNpZGVuYXZTdGF0ZS5hZGRDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBwaXBTaWRlTmF2LnN0YXRlID0gJHNjb3BlLnNpZGVuYXZTdGF0ZTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgc2lkZU5hdiBTdGF0ZVxyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTaWRlTmF2ZVN0YXRlKClcclxuICAgICAgICAgICAgfSwgMTUpO1xyXG5cclxuICAgICAgICAgICAgLy8gY29tcGxldGUgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlzUmVzaXppbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgYW5pbWF0aW9uRHVyYXRpb24pOyAvL2FuaW1hdGlvbkR1cmF0aW9uXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdGlja3lTaWRlTmF2RGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNjb3BlOiB0cnVlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NpZGVuYXYvU3RpY2t5U2lkZU5hdi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogU3RpY2t5U2lkZU5hdkRpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBTaWRlTmF2JylcclxuICAgICAgICAuZGlyZWN0aXZlKCdwaXBTdGlja3lTaWRlbmF2Jywgc3RpY2t5U2lkZU5hdkRpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBTaWRlTmF2JywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vU2lkZU5hdlNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vU2lkZU5hdlBhcnREaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vU3RpY2t5U2lkZU5hdkRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL1NpZGVOYXZTZXJ2aWNlJzsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBQcmV2ZW50IGp1bmsgZnJvbSBnb2luZyBpbnRvIHR5cGVzY3JpcHQgZGVmaW5pdGlvbnNcclxuKCgpID0+IHtcclxuXHJcbiAgICBmdW5jdGlvbiBUYWJzRGlyZWN0aXZlQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRtZE1lZGlhLCAkaW5qZWN0b3IsICRyb290U2NvcGUsICRwYXJzZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdmFyIHBpcFRoZW1lID0gJGluamVjdG9yLmhhcygncGlwVGhlbWUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRoZW1lJykgOiBudWxsLFxyXG4gICAgICAgICAgICBwaXBNZWRpYSA9ICRpbmplY3Rvci5oYXMoJ3BpcE1lZGlhJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBNZWRpYScpIDogbnVsbCxcclxuICAgICAgICAgICAgY3VycmVudFRoZW1lID0gJ2RlZmF1bHQnO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWQgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKHBpcFRoZW1lKVxyXG4gICAgICAgICAgICBjdXJyZW50VGhlbWUgPSBwaXBUaGVtZS51c2UoKTtcclxuICAgICAgICBlbHNlIGlmICgkcm9vdFNjb3BlLiR0aGVtZSlcclxuICAgICAgICAgICAgY3VycmVudFRoZW1lID0gJHJvb3RTY29wZS4kdGhlbWU7XHJcblxyXG4gICAgICAgICRzY29wZS5jbGFzcyA9ICgkYXR0cnMuY2xhc3MgfHwgJycpICsgJyBtZC0nICsgY3VycmVudFRoZW1lICsgJy10aGVtZSc7XHJcblxyXG4gICAgICAgIGlmIChwaXBUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS50YWJzLmxlbmd0aCA+IDAgJiYgJHNjb3BlLnRhYnNbMF0udGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGVPYmplY3RzKCRzY29wZS50YWJzLCAndGl0bGUnLCAnbmFtZUxvY2FsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRlT2JqZWN0cygkc2NvcGUudGFicywgJ25hbWUnLCAnbmFtZUxvY2FsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5tZWRpYSA9IHBpcE1lZGlhICE9PSB1bmRlZmluZWQgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG4gICAgICAgICRzY29wZS50YWJzID0gKCRzY29wZS50YWJzICYmIF8uaXNBcnJheSgkc2NvcGUudGFicykpID8gJHNjb3BlLnRhYnMgOiBbXTtcclxuXHJcbiAgICAgICAgdmFyIHBpcFRyYW5zbGF0ZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG4gICAgICAgIGlmIChwaXBUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS50YWJzLmxlbmd0aCA+IDAgJiYgJHNjb3BlLnRhYnNbMF0udGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGVPYmplY3RzKCRzY29wZS50YWJzLCAndGl0bGUnLCAnbmFtZUxvY2FsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRlT2JqZWN0cygkc2NvcGUudGFicywgJ25hbWUnLCAnbmFtZUxvY2FsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleCA9ICRzY29wZS5hY3RpdmVJbmRleCB8fCAwO1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZC5hY3RpdmVUYWIgPSAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXg7XHJcblxyXG4gICAgICAgICRzY29wZS5kaXNhYmxlZCA9IGRpc2FibGVkO1xyXG4gICAgICAgICRzY29wZS50YWJEaXNhYmxlZCA9IHRhYkRpc2FibGVkO1xyXG4gICAgICAgICRzY29wZS5vblNlbGVjdCA9IG9uU2VsZWN0O1xyXG4gICAgICAgICRzY29wZS5zaG93U2hhZG93ID0gc2hvd1NoYWRvdztcclxuICAgICAgICAkc2NvcGUuc2hvdyA9IHNob3c7XHJcblxyXG4gICAgICAgIGlmICh0b0Jvb2xlYW4oJGF0dHJzLnBpcFJlYmluZCkpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgnYWN0aXZlSW5kZXgnLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleCA9IG5ld1ZhbHVlIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlVGFiID0gJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBkaXNhYmxlZCgpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5uZ0Rpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLm5nRGlzYWJsZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRhYkRpc2FibGVkKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoJHNjb3BlLmRpc2FibGVkKCkgJiYgJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4ICE9IGluZGV4KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblNlbGVjdChpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmRpc2FibGVkKCkpIHJldHVybjtcclxuICAgICAgICAgICAgJHNjb3BlLmFjdGl2ZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZC5hY3RpdmVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlVGFiID0gJHNjb3BlLnNlbGVjdGVkLmFjdGl2ZUluZGV4O1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdCgkc2NvcGUudGFic1skc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXhdLCAkc2NvcGUuc2VsZWN0ZWQuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd1NoYWRvdygpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5zaG93VGFic1NoYWRvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zaG93VGFic1NoYWRvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2hvdygpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5zaG93VGFicykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zaG93VGFicygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b0Jvb2xlYW4odmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09ICcxJyB8fCB2YWx1ZSA9PSAndHJ1ZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gdGFic0RpcmVjdGl2ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgbmdEaXNhYmxlZDogJyYnLFxyXG4gICAgICAgICAgICAgICAgdGFiczogJz1waXBUYWJzJyxcclxuICAgICAgICAgICAgICAgIHNob3dUYWJzOiAnJnBpcFNob3dUYWJzJyxcclxuICAgICAgICAgICAgICAgIHNob3dUYWJzU2hhZG93OiAnJnBpcFRhYnNTaGFkb3cnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXg6ICc9cGlwQWN0aXZlSW5kZXgnLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0OiAnPXBpcFRhYnNTZWxlY3QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGFicy9UYWJzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBUYWJzRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKFwicGlwVGFic1wiLCBbJ3BpcE5hdi5UZW1wbGF0ZXMnXSlcclxuICAgICAgICAuZGlyZWN0aXZlKCdwaXBUYWJzJywgdGFic0RpcmVjdGl2ZSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdhY3Rpb25zL1ByaW1hcnlBY3Rpb25zLmh0bWwnLFxuICAgICc8bWQtbWVudSBtZC1wb3NpdGlvbi1tb2RlPVwidGFyZ2V0LXJpZ2h0IHRhcmdldFwiIGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9uc1wiIG5nLXJlcGVhdD1cImFjdGlvbiBpbiBjb25maWcucHJpbWFyeUxvY2FsQWN0aW9uc1wiPjxtZC1idXR0b24gY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zLWFjdGlvbiBtZC1pY29uLWJ1dHRvblwiIG5nLWNsaWNrPVwiY2xpY2tBY3Rpb24oYWN0aW9uLCAkbWRPcGVuTWVudSk7XCIgbmctaGlkZT1cImlzSGlkZGVuKGFjdGlvbilcIiBhcmlhLWxhYmVsPVwie3thY3Rpb24udGl0bGUgfCB0cmFuc2xhdGV9fVwiPjxkaXYgY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zLWJhZGdlXCIgbmctc2hvdz1cImFjdGlvbi5jb3VudCA+IDBcIj57e2FjdGlvbkNvdW50KGFjdGlvbil9fTwvZGl2PjxtZC1pY29uIG1kLXN2Zy1pY29uPVwie3thY3Rpb24uaWNvbn19XCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCIzXCI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQtc3RhcnQ9XCJzdWJBY3Rpb24gaW4gYWN0aW9uLnN1YkFjdGlvbnNcIiBuZy1pZj1cIiFzdWJBY3Rpb24uZGl2aWRlclwiIG5nLWhpZGU9XCJpc0hpZGRlbihzdWJBY3Rpb24pXCI+PG1kLWJ1dHRvbiBuZy1oaWRlPVwic3ViQWN0aW9uLmRpdmlkZXJcIiBuZy1jbGljaz1cImNsaWNrQWN0aW9uKHN1YkFjdGlvbilcIj57ezo6c3ViQWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwic3ViQWN0aW9uLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PjxtZC1tZW51IG1kLXBvc2l0aW9uLW1vZGU9XCJ0YXJnZXQtcmlnaHQgdGFyZ2V0XCIgY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zXCIgbmctcmVwZWF0PVwiYWN0aW9uIGluIGNvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9uc1wiPjxtZC1idXR0b24gY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zLWFjdGlvbiBtZC1pY29uLWJ1dHRvblwiIG5nLWNsaWNrPVwiY2xpY2tBY3Rpb24oYWN0aW9uLCAkbWRPcGVuTWVudSk7XCIgbmctaGlkZT1cImlzSGlkZGVuKGFjdGlvbilcIiBhcmlhLWxhYmVsPVwie3thY3Rpb24udGl0bGUgfCB0cmFuc2xhdGV9fVwiPjxkaXYgY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctc2hvdz1cImFjdGlvbi5jb3VudCA+IDBcIj57e2FjdGlvbkNvdW50KGFjdGlvbil9fTwvZGl2PjxtZC1pY29uIG1kLXN2Zy1pY29uPVwie3thY3Rpb24uaWNvbn19XCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCIzXCI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQtc3RhcnQ9XCJzdWJBY3Rpb24gaW4gYWN0aW9uLnN1YkFjdGlvbnNcIiBuZy1pZj1cIiFzdWJBY3Rpb24uZGl2aWRlclwiIG5nLWhpZGU9XCJpc0hpZGRlbihzdWJBY3Rpb24pXCI+PG1kLWJ1dHRvbiBuZy1oaWRlPVwic3ViQWN0aW9uLmRpdmlkZXJcIiBuZy1jbGljaz1cImNsaWNrQWN0aW9uKHN1YkFjdGlvbilcIj57e3N1YkFjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cInN1YkFjdGlvbi5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdhY3Rpb25zL1NlY29uZGFyeUFjdGlvbnMuaHRtbCcsXG4gICAgJzxtZC1tZW51IG5nLWlmPVwic2Vjb25kYXJ5QWN0aW9uc1Zpc2libGUoKVwiIG1kLXBvc2l0aW9uLW1vZGU9XCJ0YXJnZXQtcmlnaHQgdGFyZ2V0XCI+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWljb24tYnV0dG9uXCIgbmctY2xpY2s9XCJvblNlY29uZGFyeUFjdGlvbkNsaWNrKCk7IG9wZW5NZW51KCRtZE9wZW5NZW51LCAkZXZlbnQpO1wiIGFyaWEtbGFiZWw9XCJvcGVuIGFjdGlvbnNcIj48bWQtaWNvbiBtZC1zdmctaWNvbj1cImljb25zOnZkb3RzXCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCIzXCI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQtc3RhcnQ9XCJhY3Rpb24gaW4gY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9uc1wiIG5nLWlmPVwiIWFjdGlvbi5kaXZpZGVyXCIgbmctaGlkZT1cImlzSGlkZGVuKGFjdGlvbilcIj48bWQtYnV0dG9uIG5nLWhpZGU9XCJhY3Rpb24uZGl2aWRlclwiIG5nLWNsaWNrPVwiY2xpY2tBY3Rpb24oYWN0aW9uKVwiPnt7OjphY3Rpb24udGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJhY3Rpb24uZGl2aWRlclwiIG5nLXJlcGVhdC1lbmQ9XCJcIj48L21kLW1lbnUtZGl2aWRlcj48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwic2Vjb25kYXJ5RGl2aWRlclZpc2libGUoKVwiPjwvbWQtbWVudS1kaXZpZGVyPjxtZC1tZW51LWl0ZW0gbmctcmVwZWF0LXN0YXJ0PVwiYWN0aW9uIGluIGNvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zXCIgbmctaWY9XCIhYWN0aW9uLmRpdmlkZXJcIiBuZy1oaWRlPVwiaXNIaWRkZW4oYWN0aW9uKVwiPjxtZC1idXR0b24gbmctaGlkZT1cImFjdGlvbi5kaXZpZGVyXCIgbmctY2xpY2s9XCJjbGlja0FjdGlvbihhY3Rpb24pXCI+e3s6OmFjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cImFjdGlvbi5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdhcHBiYXIvQXBwQmFyLmh0bWwnLFxuICAgICc8bWQtdG9vbGJhciBjbGFzcz1cInt7IGNvbmZpZy5jbGFzc2VzLmpvaW4oXFwnIFxcJykgfX1cIiBuZy1pZj1cImNvbmZpZy52aXNpYmxlXCIgbmctdHJhbnNjbHVkZT1cIlwiPjwvbWQtdG9vbGJhcj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdicmVhZGNydW1iL0JyZWFkY3J1bWIuaHRtbCcsXG4gICAgJzxkaXYgc3R5bGU9XCJoZWlnaHQ6IDIzcHg7XCI+PGRpdiBjbGFzcz1cImhpZGUteHMgdGV4dC1vdmVyZmxvd1wiPjxzcGFuIG5nLWlmPVwidm0uY29uZmlnLmNyaXRlcmlhXCIgbmctY2xpY2s9XCJ2bS5vcGVuU2VhcmNoKClcIj57e3ZtLmNvbmZpZy5jcml0ZXJpYX19IC08L3NwYW4+PHNwYW4gY2xhc3M9XCJwaXAtYnJlYWRjcnVtYi1pdGVtIHt7JGxhc3QgPyBcXCdicmVhZGNydW1iLWFjY2VudFxcJyA6IFxcJ1xcJ319XCIgbmctaWY9XCJ2bS5jb25maWcuaXRlbXMgJiYgdm0uY29uZmlnLml0ZW1zLmxlbmd0aCA+IDBcIiBuZy1yZXBlYXQtc3RhcnQ9XCJpdGVtIGluIHZtLmNvbmZpZy5pdGVtc1wiIG5nLWNsaWNrPVwidm0ub25DbGljayhpdGVtKVwiIG5nLWluaXQ9XCJzdGVwV2lkdGggPSAxMDAvKHZtLmNvbmZpZy5pdGVtcy5sZW5ndGggKyAxKVwiIG5nLWNsYXNzPVwie1xcJ2N1cnNvci1wb2ludGVyXFwnOiAhJGxhc3R9XCIgbmctc3R5bGU9XCJ7XFwnbWF4LXdpZHRoXFwnOiBzdGVwV2lkdGggKyBcXCclXFwnfVwiPjxzcGFuIGNsYXNzPVwiaGlkZS14c1wiIG5nLWlmPVwiISRsYXN0IHx8ICF2bS5hY3Rpb25zVmlzaWJsZShpdGVtKVwiPnt7aXRlbS50aXRsZSB8IHRyYW5zbGF0ZX19PC9zcGFuPjxkaXYgbmctaWY9XCIkbGFzdCAmJiB2bS5hY3Rpb25zVmlzaWJsZShpdGVtKVwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7XCI+PG1kLW1lbnUgY2xhc3M9XCJoaWRlLXhzXCIgbWQtb2Zmc2V0PVwiMCA0NFwiPjxzcGFuIGNsYXNzPVwibGF5b3V0LXJvdyBwaXAtYnJlYWRjcnVtYi1pdGVtLW1lbnUgY3Vyc29yLXBvaW50ZXIge3skbGFzdCA/IFxcJ2JyZWFkY3J1bWItYWNjZW50XFwnIDogXFwnXFwnfX1cIiBuZy1jbGljaz1cInZtLm9uT3Blbk1lbnUoJG1kT3Blbk1lbnUsICRldmVudClcIiBtZC1pbmstcmlwcGxlPVwiXCIgYXJpYS1sYWJlbD1cIm9wZW4gYnJlYWRjcnVtYiBhY3Rpb25zXCI+e3tpdGVtLnRpdGxlIHwgdHJhbnNsYXRlfX08bWQtaWNvbiBjbGFzcz1cInBpcC10cmlhbmdsZS1kb3duXCIgbWQtc3ZnLWljb249XCJpY29uczp0cmlhbmdsZS1kb3duXCI+PC9tZC1pY29uPjwvc3Bhbj48bWQtbWVudS1jb250ZW50IHdpZHRoPVwiNFwiPjxtZC1tZW51LWl0ZW0gbmctaWY9XCIhc3ViSXRlbS5kaXZpZGVyXCIgbmctcmVwZWF0LXN0YXJ0PVwic3ViSXRlbSBpbiBpdGVtLnN1YkFjdGlvbnNcIj48bWQtYnV0dG9uIG5nLWNsaWNrPVwidm0ub25TdWJBY3Rpb25DbGljayhzdWJJdGVtKVwiIG5nLWhpZGU9XCJhY3Rpb24uZGl2aWRlclwiPjxtZC1pY29uIG1kLW1lbnUtYWxpZ24tdGFyZ2V0PVwiXCIgbmctaWY9XCJzdWJJdGVtLmljb25cIiBtZC1zdmctaWNvbj1cInt7c3ViSXRlbS5pY29ufX1cIj48L21kLWljb24+PHNwYW4+e3tzdWJJdGVtLnRpdGxlIHwgdHJhbnNsYXRlfX08L3NwYW4+PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cInN1Ykl0ZW0uZGl2aWRlclwiIG5nLXJlcGVhdC1lbmQ9XCJcIj48L21kLW1lbnUtZGl2aWRlcj48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+PC9kaXY+PC9zcGFuPjxtZC1pY29uIG5nLXJlcGVhdC1lbmQ9XCJcIiBtZC1zdmctaWNvbj1cImljb25zOmNoZXZyb24tcmlnaHRcIiBuZy1oaWRlPVwiJGxhc3RcIj48L21kLWljb24+PHNwYW4gY2xhc3M9XCJwaXAtdGl0bGUgYnJlYWRjcnVtYi1hY2NlbnRcIiBuZy1pZj1cInZtLmNvbmZpZy50ZXh0XCI+e3t2bS5jb25maWcudGV4dCB8IHRyYW5zbGF0ZX19PC9zcGFuPjwvZGl2PjxkaXYgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgY2xhc3M9XCJoaWRlLWd0LXhzXCI+PG1kLW1lbnUgbWQtb2Zmc2V0PVwiMCA0NFwiPjxzcGFuIGNsYXNzPVwicGlwLW1vYmlsZS1icmVhZGNydW1iIGxheW91dC1yb3dcIiBuZy1jbGljaz1cInZtLmNvbmZpZy5pdGVtcyAmJiB2bS5jb25maWcuaXRlbXMubGVuZ3RoID4gMSA/ICRtZE9wZW5NZW51KCkgOiByZXR1cm5cIiBhcmlhLWxhYmVsPVwib3BlbiBicmVhZGNydW1iXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0LW92ZXJmbG93XCI+PHNwYW4gbmctaWY9XCJ2bS5jb25maWcuY3JpdGVyaWFcIiBuZy1jbGljaz1cInZtLm9wZW5TZWFyY2goKVwiPnt7dm0uY29uZmlnLmNyaXRlcmlhfX0gLTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJicmVhZGNydW1iLWFjY2VudFwiIG5nLWlmPVwidm0uY29uZmlnLnRleHRcIj57e3ZtLmNvbmZpZy50ZXh0IHwgdHJhbnNsYXRlfX08L3NwYW4+IDxzcGFuIG5nLWlmPVwidm0uY29uZmlnLml0ZW1zICYmIHZtLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAwXCIgY2xhc3M9XCJicmVhZGNydW1iLWFjY2VudCB7eyh2bS5jb25maWcuaXRlbXMgJiYgdm0uY29uZmlnLml0ZW1zLmxlbmd0aCA+IDEpID8gXFwnY3Vyc29yLXBvaW50ZXJcXCcgOiBcXCdcXCcgfX1cIj57e3ZtLmNvbmZpZy5pdGVtc1t2bS5jb25maWcuaXRlbXMubGVuZ3RoIC0gMV0udGl0bGUgfCB0cmFuc2xhdGV9fTwvc3Bhbj48L3NwYW4+PG1kLWljb24gY2xhc3M9XCJwaXAtdHJpYW5nbGUtZG93biBjdXJzb3ItcG9pbnRlciBicmVhZGNydW1iLWFjY2VudFwiIG1kLXN2Zy1pY29uPVwiaWNvbnM6dHJpYW5nbGUtZG93blwiIG5nLWlmPVwidm0uY29uZmlnLml0ZW1zICYmIHZtLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAxXCI+PC9tZC1pY29uPjwvc3Bhbj48bWQtbWVudS1jb250ZW50IHdpZHRoPVwiNFwiPjxtZC1tZW51LWl0ZW0gbmctcmVwZWF0PVwiaXRlbSBpbiB2bS5jb25maWcuaXRlbXNcIiBuZy1pZj1cInZtLmNvbmZpZy5pdGVtcyAmJiB2bS5jb25maWcuaXRlbXMubGVuZ3RoID4gMFwiPjxtZC1idXR0b24gbmctY2xpY2s9XCJ2bS5vbkNsaWNrKGl0ZW0pXCI+PG1kLWljb24gbWQtbWVudS1hbGlnbi10YXJnZXQ9XCJcIiBuZy1pZj1cIml0ZW0uaWNvblwiIG1kLXN2Zy1pY29uPVwie3tpdGVtLmljb259fVwiPjwvbWQtaWNvbj48c3Bhbj57e2l0ZW0udGl0bGUgfCB0cmFuc2xhdGV9fTwvc3Bhbj48L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1pdGVtIG5nLWlmPVwidm0uY29uZmlnLnRleHRcIj48bWQtYnV0dG9uPjxzcGFuIGNsYXNzPVwidGV4dC1ncmV5XCI+e3t2bS5jb25maWcudGV4dCB8IHRyYW5zbGF0ZX19PC9zcGFuPjwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT48L2Rpdj48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdkcm9wZG93bi9Ecm9wZG93bi5odG1sJyxcbiAgICAnPG1kLXRvb2xiYXIgY2xhc3M9XCJtZC1zdWJoZWFkIGNvbG9yLXByaW1hcnktYmcge3tjbGFzc319XCIgbmctaWY9XCJzaG93KClcIiBuZy1jbGFzcz1cIntcXCdtZC13aGl0ZWZyYW1lLTNkcFxcJzogbWVkaWEoXFwneHNcXCcpfVwiPjxkaXYgY2xhc3M9XCJwaXAtZGl2aWRlclwiPjwvZGl2PjxtZC1zZWxlY3QgbmctbW9kZWw9XCJzZWxlY3RlZEluZGV4XCIgbmctZGlzYWJsZWQ9XCJkaXNhYmxlZCgpXCIgbWQtY29udGFpbmVyLWNsYXNzPVwicGlwLWZ1bGwtd2lkdGgtZHJvcGRvd25cIiBhcmlhLWxhYmVsPVwiRFJPUERPV05cIiBtZC1pbmstcmlwcGxlPVwiXCIgbWQtb24tY2xvc2U9XCJvblNlbGVjdChzZWxlY3RlZEluZGV4KVwiPjxtZC1vcHRpb24gbmctcmVwZWF0PVwiYWN0aW9uIGluIGFjdGlvbnNcIiB2YWx1ZT1cInt7IDo6JGluZGV4IH19XCIgbmctc2VsZWN0ZWQ9XCJhY3RpdmVJbmRleCA9PSAkaW5kZXggPyB0cnVlIDogZmFsc2VcIj57eyAoYWN0aW9uLnRpdGxlIHx8IGFjdGlvbi5uYW1lIHx8IGFjdGlvbikgfCB0cmFuc2xhdGUgfX08L21kLW9wdGlvbj48L21kLXNlbGVjdD48L21kLXRvb2xiYXI+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnaWNvbi9OYXZJY29uLmh0bWwnLFxuICAgICc8bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b24gcGlwLW5hdi1pY29uXCIgbmctaWY9XCJjb25maWcudHlwZSAhPSBcXCdub25lXFwnXCIgbmctY2xhc3M9XCJjb25maWcuY2xhc3NcIiBuZy1jbGljaz1cIm9uTmF2SWNvbkNsaWNrKClcIiBhcmlhLWxhYmVsPVwibWVudVwiPjxtZC1pY29uIG5nLWlmPVwiY29uZmlnLnR5cGU9PVxcJ21lbnVcXCdcIiBtZC1zdmctaWNvbj1cImljb25zOm1lbnVcIj48L21kLWljb24+PGltZyBuZy1zcmM9XCJ7e2NvbmZpZy5pbWFnZVVybH19XCIgbmctaWY9XCJjb25maWcudHlwZT09XFwnaW1hZ2VcXCdcIiBoZWlnaHQ9XCIyNFwiIHdpZHRoPVwiMjRcIj48bWQtaWNvbiBuZy1pZj1cImNvbmZpZy50eXBlPT1cXCdiYWNrXFwnXCIgbWQtc3ZnLWljb249XCJpY29uczphcnJvdy1sZWZ0XCI+PC9tZC1pY29uPjxtZC1pY29uIG5nLWlmPVwiY29uZmlnLnR5cGU9PVxcJ2ljb25cXCdcIiBtZC1zdmctaWNvbj1cInt7Y29uZmlnLmljb259fVwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdoZWFkZXIvU3RpY2t5TmF2SGVhZGVyLmh0bWwnLFxuICAgICc8bWQtdG9vbGJhciBuZy1zaG93PVwic2hvd0hlYWRlclwiIGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyXCI+PGRpdiBjbGFzcz1cImZsZXgtZml4ZWQgcGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXJcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiBuZy1jbGljaz1cIm9uVXNlckNsaWNrKClcIiBhcmlhLWxhYmVsPVwiY3VycmVudCB1c2VyXCI+PGltZyBzcmM9XCJcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLWltYWdlXCIgbmctY2xhc3M9XCJpbWFnZUNzc1wiPjwvbWQtYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci10ZXh0XCI+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLXByaVwiIG5nLWNsaWNrPVwib25Vc2VyQ2xpY2soKVwiPnt7IHRpdGxlIHwgdHJhbnNsYXRlIH19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLXNlY1wiPnt7IHN1YnRpdGxlIHwgdHJhbnNsYXRlIH19PC9kaXY+PC9kaXY+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyLmh0bWwnLFxuICAgICc8bWQtbWVudSBtZC1wb3NpdGlvbi1tb2RlPVwidGFyZ2V0LXJpZ2h0IHRhcmdldFwiPjxzcGFuIGNsYXNzPVwicGlwLWxhbmd1YWdlXCIgbmctY2xpY2s9XCIkbWRPcGVuTWVudSgpXCIgYXJpYS1sYWJlbD1cImxhbmd1YWdlIHNlbGVjdGlvblwiPnt7dm0ubGFuZ3VhZ2UgfCB0cmFuc2xhdGV9fTxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6dHJpYW5nbGUtZG93blwiPjwvbWQtaWNvbj48L3NwYW4+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdD1cImxhbmd1YWdlIGluIHZtLmxhbmd1YWdlc1wiPjxtZC1idXR0b24gbmctY2xpY2s9XCJ2bS5vbkxhbmd1YWdlQ2xpY2sobGFuZylcIj57e2xhbmd1YWdlIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWVudS9TdGlja3lOYXZNZW51Lmh0bWwnLFxuICAgICc8bWQtbGlzdCBjbGFzcz1cInNpZGVuYXYtbGlzdFwiPjxtZC1saXN0LWl0ZW0gY2xhc3M9XCJwaXAtZm9jdXNhYmxlIG5vLWJvcmRlciBwaXAtc3RpY2t5LW5hdi1tZW51LWl0ZW0gcGlwLXN0aWNreS1uYXYtZXhwYW5kZWQtYnV0dG9uXCIgbmctY2xpY2s9XCJvbkV4cGFuZCgpXCIgbmctZGlzYWJsZWQ9XCIhaXNDb2xsYXBzZWRcIiBuZy1pZj1cImV4cGFuZGVkQnV0dG9uXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpjaGV2cm9uLWxlZnRcIiBuZy1pZj1cImV4cGFuZGVkXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb25cIj48bWQtdG9vbHRpcCBtZC12aXNpYmxlPVwic2hvd1Rvb2x0aXBcIiBuZy1zaG93PVwic2lkZU5hdlN0YXRlLnNob3dJY29uVG9vbHR5cGUgJiYgIWV4cGFuZGVkXCIgbWQtZGlyZWN0aW9uPVwicmlnaHRcIj57ezo6XFwnRXhwYW5kIG1lbnVcXCcgfCB0cmFuc2xhdGV9fTwvbWQtdG9vbHRpcD48L21kLWljb24+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpjaGV2cm9uLXJpZ2h0XCIgbmctaWY9XCIhZXhwYW5kZWRcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvblwiPjxtZC10b29sdGlwIG1kLXZpc2libGU9XCJzaG93VG9vbHRpcFwiIG5nLXNob3c9XCJzaWRlTmF2U3RhdGUuc2hvd0ljb25Ub29sdHlwZSAmJiAhZXhwYW5kZWRcIiBtZC1kaXJlY3Rpb249XCJyaWdodFwiPnt7OjpcXCdTaHJpbmsgbWVudVxcJyB8IHRyYW5zbGF0ZX19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48L21kLWxpc3QtaXRlbT48bWQtZGl2aWRlciBuZy1zaG93PVwiZXhwYW5kZWRCdXR0b25cIj48L21kLWRpdmlkZXI+PGRpdiBjbGFzcz1cInBpcC1zZWN0aW9uXCIgbmctcmVwZWF0PVwic2VjdGlvbiBpbiBzZWN0aW9uc1wiIG5nLWhpZGU9XCJzZWN0aW9uLmFjY2VzcyAmJiAhc2VjdGlvbi5hY2Nlc3Moc2VjdGlvbilcIj48bWQtZGl2aWRlciBuZy1zaG93PVwiJGluZGV4ID4gMCAmJiAhaXNTZWN0aW9uRW1wdHkoc2VjdGlvbi5saW5rcylcIj48L21kLWRpdmlkZXI+PG1kLXN1YmhlYWRlciBuZy1zaG93PVwic2VjdGlvbi50aXRsZVwiIHN0eWxlPVwiaGVpZ2h0OiA0OHB4O1wiPjxzcGFuIG5nLWlmPVwiZXhwYW5kZWRcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtdGl0bGUgc2VjdGlvbi10aXRsZVwiPnt7OjpzZWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlfX08L3NwYW4+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e3NlY3Rpb24uaWNvbn19XCIgbmctaWY9XCIhZXhwYW5kZWQgJiYgc2VjdGlvbi5pY29uXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgbmctc2hvdz1cInNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZFwiIG1kLWRpcmVjdGlvbj1cInJpZ2h0XCI+e3s6OnNlY3Rpb24udGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtdG9vbHRpcD48L21kLWljb24+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e2RlZmF1bHRJY29ufX1cIiBuZy1pZj1cIiFleHBhbmRlZCAmJiAhc2VjdGlvbi5pY29uXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgbmctc2hvdz1cInNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZFwiIG1kLWRpcmVjdGlvbj1cInJpZ2h0XCIgY2xhc3M9XCJtZC1zZWNvbmRhcnlcIj57ezo6c2VjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZX19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48L21kLXN1YmhlYWRlcj48bWQtbGlzdC1pdGVtIGNsYXNzPVwibm8tYm9yZGVyIHBpcC1zdGlja3ktbmF2LW1lbnUtaXRlbVwiIG5nLXJlcGVhdD1cImxpbmsgaW4gc2VjdGlvbi5saW5rc1wiIG5nLWNsYXNzPVwie1xcJ2FjdGl2ZVxcJzogaXNBY3RpdmUobGluayl9XCIgbmctaGlkZT1cImxpbmsuYWNjZXNzICYmICFsaW5rLmFjY2VzcyhsaW5rKVwiPjxtZC1idXR0b24gY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgcGlwLWZvY3VzYWJsZVwiIG5nLWNsaWNrPVwiY2xpY2tMaW5rKCRldmVudCwgbGluaylcIj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uLWJsb2NrXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7e2xpbmsuaWNvbn19XCIgbmctaGlkZT1cIiFsaW5rLmljb25cIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBmbGV4LWZpeGVkXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgbmctc2hvdz1cInNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFleHBhbmRlZFwiIG1kLWRpcmVjdGlvbj1cInJpZ2h0XCI+e3s6OmxpbmsudGl0bGUgfCB0cmFuc2xhdGV9fTwvbWQtdG9vbHRpcD48L21kLWljb24+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtdGl0bGVcIj57ezo6bGluay50aXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtYmFkZ2Uge3sgbGluay5iYWRnZVN0eWxlID8gbGluay5iYWRnZVN0eWxlIDogXFwnY29sb3ItYmFkZ2UtYmdcXCcgfX0gZmxleC1maXhlZFwiIG5nLWlmPVwibGluay5jb3VudCAmJiBsaW5rLmNvdW50IDwgMTAwXCI+e3tsaW5rLmNvdW50fX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1iYWRnZSB7eyBsaW5rLmJhZGdlU3R5bGUgPyBsaW5rLmJhZGdlU3R5bGUgOiBcXCdjb2xvci1iYWRnZS1iZ1xcJyB9fSBmbGV4LWZpeGVkXCIgbmctaWY9XCJsaW5rLmNvdW50ICYmIGxpbmsuY291bnQgPiA5OVwiPiE8L2Rpdj48L21kLWJ1dHRvbj48L21kLWxpc3QtaXRlbT48L2Rpdj48L21kLWxpc3Q+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnc2lkZW5hdi9TdGlja3lTaWRlTmF2Lmh0bWwnLFxuICAgICc8bWQtc2lkZW5hdiBjbGFzcz1cIm1kLXNpZGVuYXYtbGVmdFwiIG1kLWlzLWxvY2tlZC1vcGVuPVwic2lkZW5hdlN0YXRlLmlzTG9ja2VkT3BlblwiIG1kLWNvbXBvbmVudC1pZD1cInBpcC1zdGlja3ktc2lkZW5hdlwiIHBpcC1mb2N1c2VkPVwiXCIgbmctdHJhbnNjbHVkZT1cIlwiPjwvbWQtc2lkZW5hdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdzZWFyY2gvU2VhcmNoQmFyLmh0bWwnLFxuICAgICc8ZGl2IGNsYXNzPVwibWQtdG9vbGJhci10b29scyBwaXAtc2VhcmNoLWNvbnRhaW5lclwiIG5nLWlmPVwidm0uZW5hYmxlZFwiPjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IHBpcC1zZWFyY2gtc2VsZWN0ZWRcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiBhcmlhLWxhYmVsPVwic3RhcnQgc2VhcmNoXCIgbmctY2xpY2s9XCJ2bS5vbkNsaWNrKClcIj48bWQtaWNvbiBtZC1zdmctaWNvbj1cImljb25zOnNlYXJjaFwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj48aW5wdXQgY2xhc3M9XCJwaXAtc2VhcmNoLXRleHQgZmxleFwiIHR5cGU9XCJzZWFyY2hcIiBuZy1tb2RlbD1cInZtLnNlYXJjaC50ZXh0XCIgbmcta2V5ZG93bj1cInZtLm9uS2V5RG93bigkZXZlbnQpXCI+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWljb24tYnV0dG9uXCIgYXJpYS1sYWJlbD1cImNsZWFyIHNlYXJjaFwiIG5nLWNsaWNrPVwidm0uY2xlYXIoKVwiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y3Jvc3MtY2lyY2xlXCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJtZC10b29sYmFyLXRvb2xzIGxheW91dC1yb3cgbGF5b3V0LWFsaWduLWVuZC1jZW50ZXIgZmxleC1maXhlZCBscDAgcnAwXCIgbmctaWY9XCIhdm0uZW5hYmxlZFwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJzdGFydCBzZWFyY2hcIiBuZy1jbGljaz1cInZtLmVuYWJsZSgpXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpzZWFyY2hcIj48L21kLWljb24+PC9tZC1idXR0b24+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgndGFicy9UYWJzLmh0bWwnLFxuICAgICc8bWQtdG9vbGJhciBjbGFzcz1cInBpcC1uYXYge3sgY2xhc3MgfX1cIiBuZy1jbGFzcz1cIntcXCdwaXAtdmlzaWJsZVxcJzogc2hvdygpLCBcXCdwaXAtc2hhZG93XFwnOiBzaG93U2hhZG93KCl9XCI+PG1kLXRhYnMgbmctaWY9XCJtZWRpYShcXCdndC14c1xcJylcIiBtZC1zZWxlY3RlZD1cInNlbGVjdGVkLmFjdGl2ZVRhYlwiIG5nLWNsYXNzPVwie1xcJ2Rpc2FibGVkXFwnOiBkaXNhYmxlZCgpfVwiIG1kLXN0cmV0Y2gtdGFicz1cInRydWVcIiBtZC1keW5hbWljLWhlaWdodD1cInRydWVcIj48bWQtdGFiIG5nLXJlcGVhdD1cInRhYiBpbiB0YWJzIHRyYWNrIGJ5ICRpbmRleFwiIG5nLWRpc2FibGVkPVwidGFiRGlzYWJsZWQoJGluZGV4KVwiIG1kLW9uLXNlbGVjdD1cIm9uU2VsZWN0KCRpbmRleClcIj48bWQtdGFiLWxhYmVsPnt7Ojp0YWIubmFtZUxvY2FsIH19PGRpdiBjbGFzcz1cInBpcC10YWJzLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctaWY9XCJ0YWIubmV3Q291bnRzID4gMCAmJiB0YWIubmV3Q291bnRzIDw9IDk5XCI+e3sgdGFiLm5ld0NvdW50cyB9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtdGFicy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLWlmPVwidGFiLm5ld0NvdW50cyA+IDk5XCI+ITwvZGl2PjwvbWQtdGFiLWxhYmVsPjwvbWQtdGFiPjwvbWQtdGFicz48ZGl2IGNsYXNzPVwibWQtc3ViaGVhZCBwaXAtdGFicy1jb250ZW50IGNvbG9yLXByaW1hcnktYmdcIiBuZy1pZj1cIm1lZGlhKFxcJ3hzXFwnKVwiPjxkaXYgY2xhc3M9XCJwaXAtZGl2aWRlciBwb3NpdGlvbi10b3AgbTBcIj48L2Rpdj48bWQtc2VsZWN0IG5nLW1vZGVsPVwic2VsZWN0ZWQuYWN0aXZlSW5kZXhcIiBuZy1kaXNhYmxlZD1cImRpc2FibGVkKClcIiBtZC1jb250YWluZXItY2xhc3M9XCJwaXAtZnVsbC13aWR0aC1kcm9wZG93blwiIGFyaWEtbGFiZWw9XCJTRUxFQ1RcIiBtZC1pbmstcmlwcGxlPVwiXCIgbWQtb24tY2xvc2U9XCJvblNlbGVjdChzZWxlY3RlZC5hY3RpdmVJbmRleClcIj48bWQtb3B0aW9uIG5nLXJlcGVhdD1cInRhYiBpbiB0YWJzIHRyYWNrIGJ5ICRpbmRleFwiIGNsYXNzPVwicGlwLXRhYi1vcHRpb25cIiB2YWx1ZT1cInt7IDo6JGluZGV4IH19XCI+e3sgOjp0YWIubmFtZUxvY2FsIH19PGRpdiBjbGFzcz1cInBpcC10YWJzLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctaWY9XCJ0YWIubmV3Q291bnRzID4gMCAmJiB0YWIubmV3Q291bnRzIDw9IDk5XCI+e3sgdGFiLm5ld0NvdW50cyB9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtdGFicy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLWlmPVwidGFiLm5ld0NvdW50cyA+IDk5XCI+ITwvZGl2PjwvbWQtb3B0aW9uPjwvbWQtc2VsZWN0PjwvZGl2PjwvbWQtdG9vbGJhcj4nKTtcbn1dKTtcbn0pKCk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcC13ZWJ1aS1uYXYtaHRtbC5taW4uanMubWFwXG4iXX0=