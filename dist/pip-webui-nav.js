(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).nav = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var IActionsService_1 = require("./IActionsService");
var IActionsService_2 = require("./IActionsService");
var IActionsService_3 = require("./IActionsService");
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
        this._rootScope.$emit(IActionsService_2.ActionsChangedEvent, this._config);
    };
    ActionsService.prototype.openMenuEvent = function () {
        this._rootScope.$emit(IActionsService_3.SecondaryActionsOpenEvent);
    };
    return ActionsService;
}());
var ActionsProvider = (function () {
    function ActionsProvider() {
        this._config = new IActionsService_1.ActionsConfig();
    }
    Object.defineProperty(ActionsProvider.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value || new IActionsService_1.ActionsConfig();
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
},{"./IActionsService":2}],2:[function(require,module,exports){
"use strict";
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
},{}],3:[function(require,module,exports){
"use strict";
var PrimaryActionsController = (function () {
    PrimaryActionsController.$inject = ['$element', '$injector', '$scope', '$rootScope', '$window', '$location', 'pipActions', '$log', '$attrs'];
    function PrimaryActionsController($element, $injector, $scope, $rootScope, $window, $location, pipActions, $log, $attrs) {
        "ngInject";
        var _this = this;
        this.$element = $element;
        this.$injector = $injector;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$window = $window;
        this.$location = $location;
        this.pipActions = pipActions;
        this._pipTranslate = this.$injector.has('pipTranslate') ? this.$injector.get('pipTranslate') : null;
        if (this._pipTranslate && this._pipTranslate.setTranslations) {
            this._pipTranslate.setTranslations('en', {
                DOCUMENTS_ATTACHED: 'document(s) attached',
                ERROR_DOCUMENTS_LOADED: 'Error: <%= error_number %> document(s) are not loaded'
            });
            this._pipTranslate.setTranslations('ru', {
                DOCUMENTS_ATTACHED: 'документов добавлено',
                ERROR_DOCUMENTS_LOADED: 'Ошибка: <%= error_number %> документ(ов) не загружено'
            });
        }
        this.$element.addClass('pip-primary-actions');
        this.$rootScope.$on('pipActionsChanged', function (event, config) {
            _this.onActionsChanged(event, config);
        });
    }
    PrimaryActionsController.prototype.$onInit = function () {
        if (this.localActions) {
            this.pipActions.primaryLocalActions = this.localActions;
        }
        if (this.globalActions) {
            this.pipActions.primaryGlobalActions = this.globalActions;
        }
        this.config = this.pipActions.config;
    };
    PrimaryActionsController.prototype.onActionsChanged = function (event, config) {
        this.config = config;
    };
    PrimaryActionsController.prototype.isHidden = function (action) {
        return action.access && !action.access(action);
    };
    PrimaryActionsController.prototype.actionCount = function (action) {
        if (action.count === null || action.count <= 0) {
            return '';
        }
        if (action.count > 99) {
            return '!';
        }
        return String(action.count);
    };
    PrimaryActionsController.prototype.clickAction = function (action, $mdOpenMenu) {
        if (!action || action.divider) {
            return;
        }
        if (action.subActions) {
            $mdOpenMenu(this.originatorEv);
            return;
        }
        if (_.isFunction(action.click)) {
            action.click(action);
            return;
        }
        if (action.href) {
            this.$window.location.href = action.href;
            return;
        }
        if (action.url) {
            this.$location.url(action.url);
            return;
        }
        if (action.state) {
            if (this.$injector.has('this._state')) {
                var _state = this.$injector.has('pipTranslate') ? this.$injector.get('$state') : null;
                if (_state) {
                    _state.go(action.state, action.stateParams);
                }
            }
            return;
        }
        if (action.event) {
            this.$rootScope.$broadcast(action.event);
        }
        else {
            this.$rootScope.$broadcast('pipActionClicked', action.name);
        }
    };
    return PrimaryActionsController;
}());
var PrimaryActionsBindings = {
    localActions: '<pipLocalActions',
    globalActions: '<pipGlobalActions',
    originatorEv: '<?pipOriginatorEv'
};
var PrimaryActionsChanges = (function () {
    function PrimaryActionsChanges() {
    }
    return PrimaryActionsChanges;
}());
(function () {
    var primaryActions = {
        bindings: PrimaryActionsBindings,
        templateUrl: 'actions/PrimaryActions.html',
        controller: PrimaryActionsController
    };
    angular
        .module('pipActions')
        .component('pipPrimaryActions', primaryActions);
})();
},{}],4:[function(require,module,exports){
"use strict";
var SecondaryActionsController = (function () {
    SecondaryActionsController.$inject = ['$attrs', '$injector', '$log', '$rootScope', '$window', '$location', 'pipActions', '$element'];
    function SecondaryActionsController($attrs, $injector, $log, $rootScope, $window, $location, pipActions, $element) {
        "ngInject";
        var _this = this;
        this.$attrs = $attrs;
        this.$injector = $injector;
        this.$log = $log;
        this.$rootScope = $rootScope;
        this.$window = $window;
        this.$location = $location;
        this.pipActions = pipActions;
        $element.addClass('pip-secondary-actions');
        if (this.localActions) {
            pipActions.secondaryLocalActions = this.localActions;
        }
        if (this.globalActions) {
            pipActions.secondaryGlobalActions = this.globalActions;
        }
        this.config = pipActions.config;
        this.$rootScope.$on('pipActionsChanged', function (event, config) {
            _this.onActionsChanged(event, config);
        });
        this.$rootScope.$on('pipSecondaryActionsOpen', function () {
            _this.onActionsMenuOpen();
        });
    }
    SecondaryActionsController.prototype.getMenu = function (menuFn) {
        this._menuFn = menuFn;
    };
    SecondaryActionsController.prototype.onActionsMenuOpen = function () {
        this._menuFn();
    };
    SecondaryActionsController.prototype.openMenu = function ($mdOpenMenu, ev) {
        this.originatorEv = ev;
        $mdOpenMenu(ev);
    };
    SecondaryActionsController.prototype.onActionsChanged = function (event, config) {
        this.config = config;
    };
    SecondaryActionsController.prototype.isHidden = function (action) {
        return action.access && !action.access(action);
    };
    SecondaryActionsController.prototype.actionCount = function (action) {
        if (action.count === null || action.count <= 0) {
            return '';
        }
        if (action.count > 99) {
            return '!';
        }
        return String(action.count);
    };
    SecondaryActionsController.prototype.calcActions = function (actions) {
        var _this = this;
        var count = 0;
        _.each(actions, function (action) {
            if (!_this.isHidden(action)) {
                count++;
            }
        });
        return count;
    };
    SecondaryActionsController.prototype.secondaryActionsVisible = function () {
        return this.calcActions(this.config.secondaryGlobalActions) > 0 ||
            this.calcActions(this.config.secondaryLocalActions) > 0;
    };
    SecondaryActionsController.prototype.secondaryDividerVisible = function () {
        return this.calcActions(this.config.secondaryGlobalActions) > 0 &&
            this.calcActions(this.config.secondaryLocalActions) > 0;
    };
    SecondaryActionsController.prototype.clickAction = function (action, $mdOpenMenu) {
        if (!action || action.divider) {
            return;
        }
        if (action.subActions) {
            $mdOpenMenu(this.originatorEv);
            return;
        }
        if (action.click) {
            action.click(action);
            return;
        }
        if (action.href) {
            this.$window.location.href = action.href;
            return;
        }
        if (action.url) {
            this.$location.url(action.url);
            return;
        }
        if (action.state) {
            if (this.$injector.has('this._state')) {
                var _state = this.$injector.has('pipTranslate') ? this.$injector.get('$state') : null;
                if (_state) {
                    _state.go(action.state, action.stateParams);
                }
            }
            return;
        }
        if (action.event) {
            this.$rootScope.$broadcast(action.event);
        }
        else {
            this.$rootScope.$broadcast('pipActionClicked', action.name);
        }
    };
    return SecondaryActionsController;
}());
var SecondaryActionsBindings = {
    localActions: '<pipLocalActions',
    globalActions: '<pipGlobalActions'
};
var SecondaryActionsChanges = (function () {
    function SecondaryActionsChanges() {
    }
    return SecondaryActionsChanges;
}());
(function () {
    var secondaryActions = {
        bindings: SecondaryActionsBindings,
        templateUrl: 'actions/SecondaryActions.html',
        controller: SecondaryActionsController
    };
    angular
        .module('pipActions')
        .component('pipSecondaryActions', secondaryActions);
})();
},{}],5:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipActions', ['ngMaterial', 'pipNav.Templates', 'ui.router']);
require("./ActionsService");
require("./PrimaryActions");
require("./SecondaryActions");
__export(require("./IActionsService"));
},{"./ActionsService":1,"./IActionsService":2,"./PrimaryActions":3,"./SecondaryActions":4}],6:[function(require,module,exports){
"use strict";
var AppBarController = (function () {
    AppBarController.$inject = ['$element', '$rootScope', 'pipAppBar'];
    function AppBarController($element, $rootScope, pipAppBar) {
        "ngInject";
        var _this = this;
        $element.addClass('pip-appbar');
        $element.addClass('color-primary-bg');
        this.config = pipAppBar.config;
        $rootScope.$on('pipAppBarChanged', function (event, config) {
            _this.onAppBarChanged(event, config);
        });
    }
    AppBarController.prototype.onAppBarChanged = function (event, config) {
        this.config = config;
    };
    return AppBarController;
}());
{
    var appbar = {
        transclude: true,
        templateUrl: 'appbar/AppBar.html',
        controller: AppBarController
    };
    angular
        .module('pipAppBar')
        .component('pipAppbar', appbar);
}
},{}],7:[function(require,module,exports){
"use strict";
var AppBarConfig = (function () {
    function AppBarConfig() {
    }
    return AppBarConfig;
}());
exports.AppBarConfig = AppBarConfig;
},{}],8:[function(require,module,exports){
"use strict";
var AppBarPartController = (function () {
    AppBarPartController.$inject = ['$scope', '$element', '$attrs', '$log', '$rootScope', 'pipAppBar'];
    function AppBarPartController($scope, $element, $attrs, $log, $rootScope, pipAppBar) {
        "ngInject";
        var _this = this;
        this.$scope = $scope;
        this._partName = String($attrs['pipAppbarPart']);
        this._partValue = null;
        var pos = this._partName.indexOf(':');
        if (pos > 0) {
            this._partValue = this._partName.substr(pos + 1);
            this._partName = this._partName.substr(0, pos);
        }
        this.onAppBarChanged(null, pipAppBar.config);
        $rootScope.$on('pipAppBarChanged', function (event, config) {
            _this.onAppBarChanged(null, config);
        });
    }
    AppBarPartController.prototype.onAppBarChanged = function (event, config) {
        var parts = config.parts || {};
        var currentPartValue = parts[this._partName];
        var visible = !!(this._partValue ? currentPartValue == this._partValue : currentPartValue);
        if (visible != this.$scope['visible'])
            this.$scope['visible'] = visible;
    };
    return AppBarPartController;
}());
(function () {
    appbarPart.$inject = ['ngIfDirective'];
    function appbarPart(ngIfDirective) {
        "ngInject";
        var ngIf = ngIfDirective[0];
        return {
            transclude: ngIf.transclude,
            priority: ngIf.priority,
            terminal: ngIf.terminal,
            restrict: ngIf.restrict,
            scope: true,
            link: function linkFunction($scope, $element, $attrs) {
                $attrs['ngIf'] = function () {
                    return $scope['visible'];
                };
                ngIf.link.apply(ngIf, arguments);
            },
            controller: AppBarPartController
        };
    }
    angular.module('pipAppBar')
        .directive('pipAppbarPart', appbarPart);
})();
},{}],9:[function(require,module,exports){
"use strict";
var AppBarConfig_1 = require("./AppBarConfig");
exports.AppBarChangedEvent = 'pipAppBarChanged';
var AppBarService = (function () {
    function AppBarService(config, $rootScope) {
        this.$rootScope = $rootScope;
        this._config = config;
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
        if (shadowBreakpoints) {
            this.setShadow(shadowBreakpoints);
        }
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
        this.$rootScope.$broadcast(exports.AppBarChangedEvent, this._config);
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
            this._config = value || new AppBarConfig_1.AppBarConfig();
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
},{"./AppBarConfig":7}],10:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular
    .module('pipAppBar', ['ngMaterial', 'pipNav.Templates']);
require("./AppBarConfig");
require("./AppBarService");
require("./AppBar");
require("./AppBarPart");
__export(require("./AppBarService"));
},{"./AppBar":6,"./AppBarConfig":7,"./AppBarPart":8,"./AppBarService":9}],11:[function(require,module,exports){
"use strict";
var BreadcrumbService_1 = require("./BreadcrumbService");
var BreadcrumbService_2 = require("./BreadcrumbService");
var SearchService_1 = require("../search/SearchService");
var BreadcrumbController = (function () {
    BreadcrumbController.$inject = ['$rootScope', '$window', '$location', '$injector', 'pipBreadcrumb', '$mdMedia', '$state', '$element'];
    function BreadcrumbController($rootScope, $window, $location, $injector, pipBreadcrumb, $mdMedia, $state, $element) {
        "ngInject";
        var _this = this;
        this.$rootScope = $rootScope;
        this.$window = $window;
        this.$location = $location;
        this.$injector = $injector;
        $element.addClass('pip-breadcrumb');
        this.config = pipBreadcrumb.config;
        $rootScope.$on(BreadcrumbService_1.BreadcrumbChangedEvent, function (event, config) {
            _this.onBreadcrumbChanged(event, config);
        });
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
            if (_.isFunction(item.click)) {
                item.click(item);
            }
            else {
                this.$window.history.back();
            }
        }
        else {
            this.$window.history.back();
        }
    };
    BreadcrumbController.prototype.onClick = function (item) {
        if (_.isFunction(item.click)) {
            item.click(item);
        }
    };
    BreadcrumbController.prototype.openSearch = function () {
        this.$rootScope.$broadcast(SearchService_1.OpenSearchEvent);
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
        if (_.isFunction(action.click)) {
            action.click(action);
            return;
        }
        if (action.href) {
            this.$window.location.href = action.href;
            return;
        }
        if (action.url) {
            this.$location.url(action.url);
            return;
        }
        if (action.state) {
            if (this.$injector.has('$state')) {
                var _state = this.$injector.get('$state');
                _state.go(action.state, action.stateParams);
            }
            return;
        }
        if (action.event) {
            this.$rootScope.$broadcast(action.event);
            this.originatorEv = null;
        }
        else {
            this.$rootScope.$broadcast('pipActionClicked', action.name);
            this.originatorEv = null;
        }
    };
    return BreadcrumbController;
}());
var breadcrumb = {
    bindings: {},
    templateUrl: 'breadcrumb/Breadcrumb.html',
    controller: BreadcrumbController
};
angular
    .module('pipBreadcrumb')
    .component('pipBreadcrumb', breadcrumb);
},{"../search/SearchService":35,"./BreadcrumbService":13}],12:[function(require,module,exports){
"use strict";
var BreadcrumbItem = (function () {
    function BreadcrumbItem() {
        this.title = null;
        this.click = null;
        this.subActions = null;
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
},{}],13:[function(require,module,exports){
"use strict";
var BreadcrumbConfig_1 = require("./BreadcrumbConfig");
exports.BreadcrumbChangedEvent = "pipBreadcrumbChanged";
exports.BreadcrumbBackEvent = "pipBreadcrumbBack";
var BreadcrumbService = (function () {
    function BreadcrumbService($rootScope, config) {
        this.$rootScope = $rootScope;
        this._config = config;
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
        this.$rootScope.$broadcast(exports.BreadcrumbChangedEvent, this._config);
    };
    return BreadcrumbService;
}());
var BreadcrumbProvider = (function () {
    function BreadcrumbProvider() {
        this._config = new BreadcrumbConfig_1.BreadcrumbConfig();
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
            this._service = new BreadcrumbService($rootScope, this._config);
        return this._service;
    }];
    return BreadcrumbProvider;
}());
angular
    .module('pipBreadcrumb')
    .provider('pipBreadcrumb', BreadcrumbProvider);
},{"./BreadcrumbConfig":12}],14:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipBreadcrumb', ['ngMaterial', 'pipNav.Templates', 'pipNav.Translate']);
require("./Breadcrumb");
require("./BreadcrumbService");
__export(require("./BreadcrumbService"));
},{"./Breadcrumb":11,"./BreadcrumbService":13}],15:[function(require,module,exports){
"use strict";
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
        if (this.appbar) {
            this.appbar.show();
        }
        if (this.icon) {
            this.icon.showMenu();
        }
        if (this.breadcrumb) {
            this.breadcrumb.showText(null);
        }
        if (this.actions) {
            this.actions.show();
        }
        if (this.search) {
            this.search.set(null);
        }
        if (this.sidenav) {
            this.sidenav.show();
        }
    };
    return NavService;
}());
angular
    .module('pipNavService', [])
    .service('pipNavService', NavService);
},{}],16:[function(require,module,exports){
{
    translateFilter.$inject = ['$injector'];
    function translateFilter($injector) {
        "ngInject";
        var pipTranslate = $injector.has('pipTranslate')
            ? $injector.get('pipTranslate') : null;
        return function (key) {
            return pipTranslate ? pipTranslate.translate(key) || key : key;
        };
    }
    angular
        .module('pipNav.Translate', [])
        .filter('translate', translateFilter);
}
},{}],17:[function(require,module,exports){
{
    var DropdownController = (function () {
        DropdownController.$inject = ['$scope', '$timeout', '$element', '$attrs', '$injector', '$log', '$rootScope', '$mdMedia'];
        function DropdownController($scope, $timeout, $element, $attrs, $injector, $log, $rootScope, $mdMedia) {
            "ngInject";
            this.$scope = $scope;
            this.$timeout = $timeout;
            this._pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null;
            this._pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
            if (this._pipTheme) {
                this.currentTheme = this._pipTheme.theme;
            }
            else if ($rootScope['$theme']) {
                this.currentTheme = $rootScope['$theme'];
            }
            this.themeClass = ($attrs['class'] || '') + ' md-' + this.currentTheme + '-theme';
            this.media = !_.isUndefined(this._pipMedia) ? this._pipMedia : $mdMedia;
            this.actions = (this.actions && _.isArray(this.actions)) ? this.actions : [];
            this.activeIndex = this.activeIndex || 0;
        }
        DropdownController.prototype.disabled = function () {
            if (this.ngDisabled) {
                return this.ngDisabled();
            }
            else {
                return false;
            }
        };
        DropdownController.prototype.onSelect = function (index) {
            var _this = this;
            this.activeIndex = index;
            if (this.select) {
                this.select(this.actions[index], this.activeIndex);
            }
            if (this.pipChange) {
                this.$timeout(function () {
                    _this.pipChange();
                });
            }
        };
        DropdownController.prototype.show = function () {
            var result;
            if (this.showDropdown()) {
                return !!this.showDropdown();
            }
            else {
                return true;
            }
        };
        return DropdownController;
    }());
    var DropdownBindings = {
        ngDisabled: '&',
        actions: '=pipActions',
        showDropdown: '&pipShow',
        activeIndex: '=pipActiveIndex',
        select: '=pipDropdownSelect',
        pipChange: '&'
    };
    var DropdownChanges = (function () {
        function DropdownChanges() {
        }
        return DropdownChanges;
    }());
    var dropdown = {
        bindings: DropdownBindings,
        templateUrl: 'dropdown/Dropdown.html',
        controller: DropdownController
    };
    angular
        .module('pipDropdown', ['pipNav.Templates'])
        .component('pipDropdown', dropdown);
}
},{}],18:[function(require,module,exports){
"use strict";
{
    var NavHeaderController = (function () {
        NavHeaderController.$inject = ['$element', '$scope', '$log', '$rootScope', '$timeout', 'pipNavHeader', 'navConstant'];
        function NavHeaderController($element, $scope, $log, $rootScope, $timeout, pipNavHeader, navConstant) {
            "ngInject";
            var _this = this;
            this.$element = $element;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.pipNavHeader = pipNavHeader;
            this.imageUrl = null;
            $element.addClass('pip-sticky-nav-header');
            this.initImage();
            this.cleanupNavHeaderChanged = $rootScope.$on('pipNavHeaderChanged', function ($event, config) {
                _this.onNavHeaderChanged($event, config);
            });
            this.cleanupSideNavStateChanged = $rootScope.$on('pipSideNavStateChanged', function ($event, state) {
                _this.onStateChanged($event, state);
            });
        }
        NavHeaderController.prototype.$onDestroy = function () {
            if (angular.isFunction(this.cleanupNavHeaderChanged)) {
                this.cleanupNavHeaderChanged();
            }
            if (angular.isFunction(this.cleanupSideNavStateChanged)) {
                this.cleanupSideNavStateChanged();
            }
        };
        NavHeaderController.prototype.initImage = function () {
            var _this = this;
            this.imageBlock = this.$element.find('.pip-sticky-nav-header-user');
            this.$timeout(function () {
                _this.image = _this.$element.find('.pip-sticky-nav-header-user-image');
                if (_this.image[0]) {
                    _this.image[0].onload = (function () { return _this.onImageLoad(); });
                    _this.image[0].onerror = (function () { return _this.onImageError(); });
                }
                else {
                    _this.image.onload = (function () { return _this.onImageLoad(); });
                    _this.image.onerror = (function () { return _this.onImageError(); });
                }
                _this.onNavHeaderChanged(null, _this.pipNavHeader.config);
            }, 20);
        };
        NavHeaderController.prototype.initHeader = function () {
            if (!this.pipNavHeader.config)
                return;
            this.title = this.pipNavHeader.config.title;
            this.subtitle = this.pipNavHeader.config.subtitle;
            this.imageUrl = this.pipNavHeader.config.imageUrl;
            this.imageCss = this.pipNavHeader.config.imageCss;
        };
        NavHeaderController.prototype.onImageLoad = function () {
            this.setImageMarginCSS(this.image);
        };
        ;
        NavHeaderController.prototype.onImageError = function () {
            var _this = this;
            if (this.loadedDefaultImage)
                return;
            this.$scope.$apply(function () {
                _this.setImage(_this.pipNavHeader.config, true);
            });
        };
        ;
        NavHeaderController.prototype.onStateChanged = function (event, state) {
            var _this = this;
            if (state === undefined)
                return;
            if (state.id == 'toggle') {
                this.$timeout(function () {
                    _this.showHeader = state && state.id == 'toggle';
                }, 400);
            }
            else {
                this.showHeader = false;
            }
        };
        NavHeaderController.prototype.setImageMarginCSS = function (image) {
            var cssParams = {}, containerWidth = this.imageBlock.width ? this.imageBlock.width() : this.imageBlock.clientWidth, containerHeight = this.imageBlock.height ? this.imageBlock.height() : this.imageBlock.clientHeight, imageWidth = image[0]['naturalWidth'] || image.width, imageHeight = image[0]['naturalHeight'] || image.height, margin = 0;
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
        };
        ;
        NavHeaderController.prototype.setImage = function (config, loadError) {
            if (!config)
                return;
            var url;
            if (!loadError && !!config.imageUrl) {
                url = config.imageUrl;
            }
            else {
                this.loadedDefaultImage = true;
                url = config.defaultImageUrl;
            }
            if (url && this.image) {
                this.image.attr('src', url);
            }
            else {
                this.imageBlock.css("display", "none");
            }
        };
        NavHeaderController.prototype.onNavHeaderChanged = function ($event, config) {
            if (!config)
                return;
            this.title = config.title;
            this.subtitle = config.subtitle;
            this.imageUrl = config.imageUrl;
            this.imageCss = config.imageCss;
            this.setImage(config, false);
        };
        NavHeaderController.prototype.onUserClick = function () {
            this.$rootScope.$broadcast('pipNavUserClicked');
        };
        return NavHeaderController;
    }());
    var navHeader = {
        templateUrl: 'header/NavHeader.html',
        controller: NavHeaderController
    };
    angular
        .module('pipNavHeader')
        .component('pipNavHeader', navHeader);
}
},{}],19:[function(require,module,exports){
"use strict";
var NavHeaderConfig = (function () {
    function NavHeaderConfig() {
    }
    return NavHeaderConfig;
}());
exports.NavHeaderConfig = NavHeaderConfig;
;
},{}],20:[function(require,module,exports){
"use strict";
var NavHeaderConfig_1 = require("./NavHeaderConfig");
exports.NavHeaderChangedEvent = 'pipNavHeaderChanged';
var NavHeaderService = (function () {
    function NavHeaderService(config, $rootScope) {
        this.$rootScope = $rootScope;
        this._config = config;
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
        if (_.isFunction(callbackOrEvent)) {
            this._config.click = callbackOrEvent;
        }
        else {
            this._config.click = null;
        }
        if (_.isString(callbackOrEvent)) {
            this._config.event = callbackOrEvent;
        }
        else {
            this._config.event = null;
        }
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
        this.$rootScope.$emit(exports.NavHeaderChangedEvent, this._config);
    };
    return NavHeaderService;
}());
var NavHeaderProvider = (function () {
    function NavHeaderProvider() {
        this._config = new NavHeaderConfig_1.NavHeaderConfig();
    }
    Object.defineProperty(NavHeaderProvider.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value || new NavHeaderConfig_1.NavHeaderConfig();
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
        if (_.isFunction(callbackOrEvent)) {
            this._config.click = callbackOrEvent;
        }
        else {
            this._config.click = null;
        }
        if (_.isString(callbackOrEvent)) {
            this._config.event = callbackOrEvent;
        }
        else {
            this._config.event = null;
        }
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
},{"./NavHeaderConfig":19}],21:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipNavHeader', ['ngMaterial', 'pipNav.Templates']);
require("./NavHeaderService");
require("./NavHeader");
__export(require("./NavHeaderService"));
},{"./NavHeader":18,"./NavHeaderService":20}],22:[function(require,module,exports){
"use strict";
},{}],23:[function(require,module,exports){
"use strict";
var SideNavService_1 = require("../sidenav/SideNavService");
var NavIconService_1 = require("./NavIconService");
var NavIconBindings = {
    type: '<?pipType',
    imageUrl: '<?pipImageUrl',
    icon: '<?pipIcon'
};
var NavIconChanges = (function () {
    function NavIconChanges() {
    }
    return NavIconChanges;
}());
var NavIconController = (function () {
    NavIconController.$inject = ['$rootScope', '$window', '$element', '$scope', '$log', 'pipNavIcon'];
    function NavIconController($rootScope, $window, $element, $scope, $log, pipNavIcon) {
        "ngInject";
        var _this = this;
        this.$rootScope = $rootScope;
        this.$window = $window;
        $element.addClass('pip-nav-icon');
        this.config = pipNavIcon.config;
        this.clearFn = $rootScope.$on('pipNavIconChanged', function (event, config) {
            _this.onNavIconChanged(event, config);
        });
    }
    NavIconController.prototype.$onInit = function () {
        if (this.type) {
            this.config.type = this.type;
        }
        if (this.imageUrl) {
            this.config.imageUrl = this.imageUrl;
        }
        if (this.icon) {
            this.config.icon = this.icon;
        }
    };
    NavIconController.prototype.$onDestroy = function () {
        if (_.isFunction(this.clearFn)) {
            this.clearFn();
        }
    };
    NavIconController.prototype.onNavIconChanged = function (event, config) {
        this.config = config;
    };
    NavIconController.prototype.onNavIconClick = function () {
        if (_.isFunction(this.config.click)) {
            this.config.click();
        }
        else if (this.config.event) {
            this.$rootScope.$broadcast(this.config.event);
        }
        else if (this.config.type == 'menu') {
            this.$rootScope.$broadcast(SideNavService_1.OpenSideNavEvent);
        }
        else if (this.config.type == 'back') {
            this.$window.history.back();
        }
        else {
            this.$rootScope.$broadcast(NavIconService_1.NavIconClickedEvent);
        }
    };
    return NavIconController;
}());
var NavIcon = {
    bindings: NavIconBindings,
    templateUrl: 'icon/NavIcon.html',
    controller: NavIconController
};
angular
    .module('pipNavIcon')
    .component('pipNavIcon', NavIcon);
},{"../sidenav/SideNavService":39,"./NavIconService":25}],24:[function(require,module,exports){
"use strict";
var NavIconConfig = (function () {
    function NavIconConfig() {
    }
    return NavIconConfig;
}());
exports.NavIconConfig = NavIconConfig;
;
},{}],25:[function(require,module,exports){
"use strict";
var NavIconConfig_1 = require("./NavIconConfig");
exports.NavIconClickedEvent = 'pipNavIconClicked';
exports.NavIconChangedEvent = 'pipNavIconChanged';
var NavIconService = (function () {
    function NavIconService(config, $rootScope) {
        this.$rootScope = $rootScope;
        this._config = config;
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
        this.$rootScope.$broadcast(exports.NavIconChangedEvent, this._config);
    };
    return NavIconService;
}());
var NavIconProvider = (function () {
    function NavIconProvider() {
        this._config = new NavIconConfig_1.NavIconConfig();
    }
    Object.defineProperty(NavIconProvider.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value || new NavIconConfig_1.NavIconConfig();
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
},{"./NavIconConfig":24}],26:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipNavIcon', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require("./NavIconConfig");
require("./INavIconService");
require("./NavIconService");
require("./NavIcon");
__export(require("./NavIconConfig"));
__export(require("./NavIconService"));
},{"./INavIconService":22,"./NavIcon":23,"./NavIconConfig":24,"./NavIconService":25}],27:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
require("./dependencies/TranslateFilter");
require("./language/LanguagePickerDirective");
require("./dropdown/Dropdown");
require("./tabs/Tabs");
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
    'pipLanguagePicker',
    'pipActions',
    'pipSideNav',
    'pipNavMenu',
    'pipNavHeader'
])
    .constant('navConstant', {
    'TAB_BREAKPOINT': 'gt-sm',
    'SIDENAV_CONTAINER': '.pip-main',
    'SIDENAV_LARGE_WIDTH': 320,
    'SIDENAV_MIDDLE_WIDTH': 240,
    'SIDENAV_SMALL_WIDTH': 72,
    'SIDENAV_ANIMATION_DURATION': 600
});
__export(require("./actions"));
__export(require("./appbar"));
__export(require("./breadcrumb"));
__export(require("./sidenav"));
__export(require("./icon"));
__export(require("./header"));
},{"./actions":5,"./appbar":10,"./breadcrumb":14,"./common/NavService":15,"./dependencies/TranslateFilter":16,"./dropdown/Dropdown":17,"./header":21,"./icon":26,"./language/LanguagePickerDirective":28,"./menu":31,"./search":36,"./sidenav":41,"./tabs/Tabs":42}],28:[function(require,module,exports){
{
    var LanguagePickerDirectiveController = (function () {
        LanguagePickerDirectiveController.$inject = ['$element', '$injector', '$rootScope'];
        function LanguagePickerDirectiveController($element, $injector, $rootScope) {
            "ngInject";
            this.languages = ['en', 'ru'];
            this.value = null;
            this._translate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            $element.addClass('pip-language-picker');
            this.setLanguages(this.languages);
            this.value = this.value || this.languages[0];
        }
        Object.defineProperty(LanguagePickerDirectiveController.prototype, "language", {
            get: function () {
                return this._translate ? this._translate.language : null;
            },
            enumerable: true,
            configurable: true
        });
        LanguagePickerDirectiveController.prototype.setLanguages = function (languages) {
            this.languages = languages.length > 0 ? languages : ['en', 'ru'];
        };
        LanguagePickerDirectiveController.prototype.onLanguageClick = function (language) {
            if (this._translate != null) {
                this.value = language;
                this._translate.language = this.value;
            }
        };
        return LanguagePickerDirectiveController;
    }());
    var LanguagePickerBindings = {
        languages: '<languages',
        value: '=?value'
    };
    var languagePickerDirective = {
        bindings: LanguagePickerBindings,
        templateUrl: 'language/LanguagePicker.html',
        controller: LanguagePickerDirectiveController
    };
    angular
        .module('pipLanguagePicker', [
        'ngMaterial', 'pipNav.Translate', 'pipNav.Templates'
    ])
        .component('pipLanguagePicker', languagePickerDirective);
}
},{}],29:[function(require,module,exports){
"use strict";
(function () {
    var NavMenuController = (function () {
        NavMenuController.$inject = ['$scope', '$window', '$location', '$rootScope', '$timeout', 'pipSideNav', 'pipNavMenu', '$element', '$injector', 'navConstant'];
        function NavMenuController($scope, $window, $location, $rootScope, $timeout, pipSideNav, pipNavMenu, $element, $injector, navConstant) {
            "ngInject";
            var _this = this;
            this.$scope = $scope;
            this.$window = $window;
            this.$location = $location;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.pipSideNav = pipSideNav;
            this.pipNavMenu = pipNavMenu;
            this._state = $injector.has('$state') ? $injector.get('$state') : null;
            this._animationDuration = navConstant.SIDENAV_ANIMATION_DURATION,
                this._pipSideNavElement = $element.parent().parent();
            $element.addClass('pip-sticky-nav-menu');
            this.sections = this.$scope['sections'] || this.pipNavMenu.sections;
            this.setCollapsible();
            this.defaultIcon = this.pipNavMenu.defaultIcon;
            this.onStateChanged(null, this.pipSideNav.state);
            var cleanupNavMenuChanged = this.$rootScope.$on('pipNavMenuChanged', function ($event, config) {
                _this.onConfigChanged($event, config);
            });
            var cleanupSideNavStateChanged = this.$rootScope.$on('pipSideNavStateChanged', function ($event, state) {
                _this.onStateChanged($event, state);
            });
            this.$scope.$on('$destroy', function () {
                if (angular.isFunction(cleanupNavMenuChanged)) {
                    cleanupNavMenuChanged();
                }
                if (angular.isFunction(cleanupSideNavStateChanged)) {
                    cleanupSideNavStateChanged();
                }
            });
        }
        NavMenuController.prototype.setCollapsible = function () {
            var collapsed;
            if (angular.isFunction(this.$scope['collapsed'])) {
                collapsed = this.$scope['collapsed']();
            }
            else {
                collapsed = this.$scope['collapsed'] !== false && this.$scope['collapsed'] !== 'false';
            }
            this.isCollapsed = collapsed;
        };
        NavMenuController.prototype.onExpand = function () {
            if (!this.isCollapsed) {
                return;
            }
            this.expanded = !this.expanded;
            if (this.expanded) {
                this._pipSideNavElement.removeClass('pip-sticky-nav-small');
            }
            else {
                this._pipSideNavElement.addClass('pip-sticky-nav-small');
            }
            this.$rootScope.$emit('pipNavExpanded', this.expanded);
        };
        NavMenuController.prototype.isHidden = function (item) {
            return item && item.access && !item.access(item);
        };
        NavMenuController.prototype.isSectionEmpty = function (linkCollection) {
            var _this = this;
            var result = true;
            _.each(linkCollection, function (link) {
                if (!_this.isHidden(link)) {
                    result = false;
                }
            });
            return result;
        };
        NavMenuController.prototype.onConfigChanged = function ($event, config) {
            if (!config)
                return;
            this.sections = config.sections;
        };
        NavMenuController.prototype.onStateChanged = function (event, state) {
            if (!state)
                return;
            this.isCollapsed = state.expand;
            this.expanded = state.isExpanded;
            this.expandedButton = state.expandedButton;
            this.sideNavState = state;
        };
        NavMenuController.prototype.isActive = function (link) {
            if (link.parentState) {
                if (this._state != null && this._state.includes(link.parentState)) {
                    return true;
                }
            }
            else if (link.state) {
                if (this._state != null && this._state.includes(link.state)) {
                    return true;
                }
            }
            else if (link.href) {
                if (link.href.split('?')[0] === this.$window.location.href.split('?')[0]) {
                    return true;
                }
            }
            else if (link.url) {
                if (link.url.split(/[\s/?]+/)[1] === this.$location.url().split(/[\s/?]+/)[1]) {
                    return true;
                }
            }
            return false;
        };
        NavMenuController.prototype.clickLink = function (event, link) {
            var _this = this;
            event.stopPropagation();
            if (!link) {
                this.pipSideNav.close();
                return;
            }
            if (link.href) {
                if (link.href.split('?')[0] === this.$window.location.href.split('?')[0]) {
                    this.pipSideNav.close();
                    return;
                }
                this.pipSideNav.close();
                this.$timeout(function () {
                    _this.$window.location.href = link.href;
                }, this._animationDuration);
                return;
            }
            else if (link.url) {
                if (link.url.split(/[\s/?]+/)[1] === this.$location.url().split(/[\s/?]+/)[1]) {
                    this.pipSideNav.close();
                    return;
                }
                this.pipSideNav.close();
                this.$timeout(function () {
                    _this.$location.url(link.url);
                }, this._animationDuration);
                return;
            }
            else if (link.state) {
                if (this._state != null && this._state.current.name === link.state) {
                    this.pipSideNav.close();
                    return;
                }
                this.pipSideNav.close();
                this.$timeout(function () {
                    _this._state.go(link.state, link.stateParams);
                }, this._animationDuration);
                return;
            }
            else if (link.event) {
                this.$rootScope.$broadcast(link.event, link);
            }
            this.pipSideNav.close();
        };
        return NavMenuController;
    }());
    var NavMenuBindings = {
        sections: '=?pipSections',
        collapsed: '=?pipCollapsed'
    };
    function navMenuDirective() {
        return {
            restrict: 'EA',
            scope: NavMenuBindings,
            replace: false,
            templateUrl: 'menu/NavMenu.html',
            controller: NavMenuController,
            controllerAs: '$ctrl'
        };
    }
    angular
        .module('pipNavMenu')
        .directive('pipNavMenu', navMenuDirective);
})();
},{}],30:[function(require,module,exports){
"use strict";
exports.NavMenuChangedEvent = 'pipNavMenuChanged';
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
},{}],31:[function(require,module,exports){
"use strict";
angular.module('pipNavMenu', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require("./NavMenuService");
require("./NavMenu");
},{"./NavMenu":29,"./NavMenuService":30}],32:[function(require,module,exports){
"use strict";
},{}],33:[function(require,module,exports){
"use strict";
var SearchService_1 = require("./SearchService");
var SearchBarController = (function () {
    SearchBarController.$inject = ['$element', '$rootScope', 'pipSearch'];
    function SearchBarController($element, $rootScope, pipSearch) {
        "ngInject";
        var _this = this;
        this.$element = $element;
        this.$rootScope = $rootScope;
        this.enabled = false;
        this.search = { text: '' };
        $element.addClass('pip-search-bar');
        this.config = pipSearch.config;
        this.stateChange();
        this.clearFn = $rootScope.$on(SearchService_1.SearchChangedEvent, function (event, config) {
            _this.onSearchChanged(event, config);
        });
    }
    SearchBarController.prototype.$onDestroy = function () {
        if (_.isFunction(this.clearFn)) {
            this.clearFn();
        }
    };
    SearchBarController.prototype.stateChange = function () {
        if (this.enabled) {
            this.$element.addClass('w-stretch');
            this.$element.parent().addClass('pip-search-active');
        }
        else {
            this.$element.removeClass('w-stretch');
            this.$element.parent().removeClass('pip-search-active');
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
        if (this.config.callback) {
            this.config.callback(search);
        }
        else {
            this.$rootScope.$broadcast(SearchService_1.SearchActivatedEvent, search);
        }
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
var SearchBar = {
    templateUrl: 'search/SearchBar.html',
    controller: SearchBarController
};
angular
    .module('pipSearchBar')
    .component('pipSearchBar', SearchBar);
},{"./SearchService":35}],34:[function(require,module,exports){
"use strict";
var SearchConfig = (function () {
    function SearchConfig() {
    }
    return SearchConfig;
}());
exports.SearchConfig = SearchConfig;
},{}],35:[function(require,module,exports){
"use strict";
var SearchConfig_1 = require("./SearchConfig");
exports.OpenSearchEvent = 'pipOpenSearch';
exports.CloseSearchEvent = 'pipCloseSearch';
exports.SearchChangedEvent = 'pipSearchChanged';
exports.SearchActivatedEvent = 'pipSearchActivated';
var SearchService = (function () {
    function SearchService(config, $rootScope) {
        var _this = this;
        this.$rootScope = $rootScope;
        this._config = config;
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
        this.$rootScope.$broadcast(exports.SearchChangedEvent, this._config);
    };
    return SearchService;
}());
var SearchProvider = (function () {
    function SearchProvider() {
        this._config = new SearchConfig_1.SearchConfig();
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
},{"./SearchConfig":34}],36:[function(require,module,exports){
"use strict";
angular.module('pipSearchBar', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require("./SearchConfig");
require("./ISearchService");
require("./SearchService");
require("./SearchBar");
},{"./ISearchService":32,"./SearchBar":33,"./SearchConfig":34,"./SearchService":35}],37:[function(require,module,exports){
"use strict";
var SideNavState_1 = require("./SideNavState");
var SideNavController = (function () {
    SideNavController.$inject = ['$element', '$attrs', '$injector', '$scope', '$rootScope', '$timeout', 'pipSideNav', 'navConstant'];
    function SideNavController($element, $attrs, $injector, $scope, $rootScope, $timeout, pipSideNav, navConstant) {
        "ngInject";
        var _this = this;
        this.$element = $element;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.pipSideNav = pipSideNav;
        this._pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this._mainContainer = navConstant.SIDENAV_CONTAINER;
        this._bigWidth = navConstant.SIDENAV_LARGE_WIDTH;
        this._middleWidth = navConstant.SIDENAV_MIDDLE_WIDTH;
        this._smallWidth = navConstant.SIDENAV_SMALL_WIDTH;
        this._isResizing = false;
        this._animationDuration = navConstant.SIDENAV_ANIMATION_DURATION;
        this._navState = new SideNavState_1.SideNavStateConfig();
        this._mediaBreakpoints = this.setBreakpoints();
        this.$element.addClass('pip-sticky-sidenav');
        if (this.pipSideNav.config && this.pipSideNav.config.type != 'popup') {
            this.$timeout(function () {
                _this.setSideNaveState();
            }, 100);
            this.windowResize = _.debounce(function () { _this.setSideNaveState(); }, 10);
            this.cleanupMainResized = this.$rootScope.$on('pipMainResized', function () {
                _this.windowResize();
            });
            this.cleanupSideNavState = this.$rootScope.$on('pipSideNavState', function ($event, state) {
                _this.onSideNavState($event, state);
            });
        }
        else {
            this._isResizing = false;
            this.sidenavState = null;
            this.$timeout(function () {
                if (_this.pipSideNav.config.backdrop == false) {
                    _this.$element.addClass('pip-sidenav-hide-backdrop');
                }
                else {
                    _this.$element.removeClass('pip-sidenav-hide-backdrop');
                }
                _this.setState(SideNavState_1.SideNavStateNames.Toggle);
            }, 100);
        }
        this.cleanupNavHeaderChanged = this.$rootScope.$on('pipNavIconClicked', function () {
            _this.onNavIconClick();
        });
        this.cleanupSideNavChanged = this.$rootScope.$on('pipSideNavChanged', function ($event, config) {
            _this.onSideNavChanged($event, config);
        });
    }
    SideNavController.prototype.$onDestroy = function () {
        if (angular.isFunction(this.cleanupNavHeaderChanged)) {
            this.cleanupNavHeaderChanged();
        }
        if (angular.isFunction(this.cleanupSideNavChanged)) {
            this.cleanupSideNavChanged();
        }
        if (angular.isFunction(this.cleanupMainResized)) {
            this.cleanupMainResized();
        }
        if (angular.isFunction(this.cleanupSideNavState)) {
            this.cleanupSideNavState();
        }
    };
    SideNavController.prototype.setBreakpoints = function () {
        if (!this._pipMedia || !angular.isObject(this._pipMedia.breakpoints)) {
            return { xs: 639, sm: 959, md: 1024, lg: 1919 };
        }
        else {
            return this._pipMedia.breakpoints;
        }
    };
    SideNavController.prototype.onSideNavChanged = function ($event, config) {
        if (config && config.visible) {
            this.$element.css('display', 'block');
        }
        else {
            this.$element.css('display', 'none');
        }
    };
    SideNavController.prototype.onNavIconClick = function () {
        this.pipSideNav.open();
    };
    SideNavController.prototype.onSideNavState = function ($event, stateName) {
        if (angular.isString(stateName) && this._navState[stateName] !== undefined) {
            this.setState(stateName);
        }
    };
    SideNavController.prototype.setSideNaveState = function () {
        var _this = this;
        if (this.pipSideNav.config && this.pipSideNav.config.type == 'popup') {
            return;
        }
        if (this._isResizing) {
            this.$timeout(function () { _this.setSideNaveState(); }, this._animationDuration);
            return;
        }
        var mainWidth = $(this._mainContainer).innerWidth();
        var sideNavWidth = $('.pip-sticky-sidenav').innerWidth();
        var currentWidth = sideNavWidth ? sideNavWidth + 2 : 0;
        if (mainWidth + currentWidth < this._mediaBreakpoints.sm) {
            this.setState(SideNavState_1.SideNavStateNames.Toggle);
            return;
        }
        if (mainWidth + currentWidth < this._mediaBreakpoints.md) {
            this.setState(SideNavState_1.SideNavStateNames.Small);
            return;
        }
        if (mainWidth + currentWidth < this._mediaBreakpoints.lg) {
            this.setState(SideNavState_1.SideNavStateNames.Large);
            return;
        }
        this.setState(SideNavState_1.SideNavStateNames.XLarge);
    };
    SideNavController.prototype.setState = function (stateName) {
        var _this = this;
        if (this._isResizing)
            return;
        if (this.sidenavState && this.sidenavState.id == stateName)
            return;
        if (stateName != SideNavState_1.SideNavStateNames.Toggle) {
            this.$element.removeClass('sidenav-mobile');
        }
        if (stateName != SideNavState_1.SideNavStateNames.Small) {
            this.$element.removeClass('pip-sticky-nav-small');
        }
        if (stateName != SideNavState_1.SideNavStateNames.XLarge) {
            this.$element.removeClass('sidenav-desktop');
        }
        if (stateName != SideNavState_1.SideNavStateNames.Large) {
            this.$element.removeClass('sidenav-smalldesktop');
        }
        this._isResizing = true;
        this.sidenavState = this._navState[String(stateName)];
        this.$element.addClass(this.sidenavState.addClass);
        this.pipSideNav.state = this.sidenavState;
        this.$timeout(function () {
            _this.setSideNaveState();
        }, 15);
        this.$timeout(function () {
            _this._isResizing = false;
        }, this._animationDuration);
    };
    return SideNavController;
}());
var SideNavBindings = {
    sidenavState: '=?'
};
(function () {
    var sideNav = {
        transclude: true,
        bindings: SideNavBindings,
        templateUrl: 'sidenav/SideNav.html',
        controller: SideNavController
    };
    angular
        .module('pipSideNav')
        .component('pipSidenav', sideNav);
})();
},{"./SideNavState":40}],38:[function(require,module,exports){
{
    sidenavPartDirective.$inject = ['ngIfDirective'];
    var SideNavPartBindings_1 = {
        visible: '=?'
    };
    var SideNavPartController_1 = (function () {
        SideNavPartController_1.$inject = ['$scope', '$element', '$attrs', '$rootScope', 'pipSideNav'];
        function SideNavPartController_1($scope, $element, $attrs, $rootScope, pipSideNav) {
            var _this = this;
            this.$scope = $scope;
            this.partValue = null;
            this.partName = '' + $attrs['pipSidenavPart'];
            this.pos = this.partName.indexOf(':');
            if (this.pos > 0) {
                this.partValue = this.partName.substr(this.pos + 1);
                this.partName = this.partName.substr(0, this.pos);
            }
            this.onSideNavChanged(null, pipSideNav.config);
            $rootScope.$on('pipSideNavChanged', function (event, config) { _this.onSideNavChanged(event, config); });
        }
        SideNavPartController_1.prototype.onSideNavChanged = function (event, config) {
            var parts = config.parts || {};
            var currentPartValue = parts[this.partName];
            var visible = !!(this.partValue ? currentPartValue == this.partValue : currentPartValue);
            if (visible != this.$scope['visible'])
                this.$scope['visible'] = visible;
        };
        return SideNavPartController_1;
    }());
    function sidenavPartDirective(ngIfDirective) {
        "ngInject";
        var ngIf = ngIfDirective[0];
        return {
            transclude: ngIf.transclude,
            priority: ngIf.priority,
            terminal: ngIf.terminal,
            restrict: ngIf.restrict,
            scope: SideNavPartBindings_1,
            link: function linkFunction($scope, $element, $attrs) {
                $attrs['ngIf'] = function () { return $scope['visible']; };
                ngIf.link.apply(ngIf, arguments);
            },
            controller: SideNavPartController_1
        };
    }
    angular
        .module('pipSideNav')
        .directive('pipSidenavPart', sidenavPartDirective);
}
},{}],39:[function(require,module,exports){
"use strict";
hookSideNavEvents.$inject = ['$rootScope', 'pipSideNav'];
var SideNavState_1 = require("./SideNavState");
exports.SideNavChangedEvent = 'pipSideNavChanged';
exports.SideNavStateChangedEvent = 'pipSideNavStateChanged';
exports.OpenSideNavEvent = 'pipOpenSideNav';
exports.CloseSideNavEvent = 'pipCloseSideNav';
var SideNavService = (function () {
    function SideNavService(config, $rootScope, $mdSidenav) {
        this.$rootScope = $rootScope;
        this.$mdSidenav = $mdSidenav;
        this._config = config;
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
            this.$rootScope.$broadcast(exports.SideNavStateChangedEvent, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideNavService.prototype, "type", {
        get: function () {
            return this._config.type;
        },
        set: function (value) {
            this._config.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideNavService.prototype, "backdrop", {
        get: function () {
            return this._config.backdrop;
        },
        set: function (value) {
            this._config.backdrop = value;
        },
        enumerable: true,
        configurable: true
    });
    SideNavService.prototype.open = function () {
        this.$mdSidenav('pip-sticky-sidenav').open();
    };
    SideNavService.prototype.close = function () {
        this.$mdSidenav('pip-sticky-sidenav').close();
    };
    SideNavService.prototype.toggle = function () {
        this.$mdSidenav('pip-sticky-sidenav').toggle();
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
        this.$rootScope.$emit(exports.SideNavChangedEvent, this._config);
    };
    return SideNavService;
}());
var SideNavProvider = (function () {
    function SideNavProvider() {
        this._config = {
            parts: {},
            classes: [],
            type: 'popup',
            backdrop: true,
            state: null,
            visible: true
        };
    }
    Object.defineProperty(SideNavProvider.prototype, "backdrop", {
        get: function () {
            return this._config.backdrop;
        },
        set: function (value) {
            this._config.backdrop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideNavProvider.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value || new SideNavState_1.SideNavConfig();
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
},{"./SideNavState":40}],40:[function(require,module,exports){
"use strict";
var SideNavStateNames = (function () {
    function SideNavStateNames() {
    }
    return SideNavStateNames;
}());
SideNavStateNames.Toggle = 'toggle';
SideNavStateNames.Small = 'small';
SideNavStateNames.Large = 'large';
SideNavStateNames.XLarge = 'xlarge';
exports.SideNavStateNames = SideNavStateNames;
var SideNavState = (function () {
    function SideNavState() {
    }
    return SideNavState;
}());
exports.SideNavState = SideNavState;
var SideNavStateConfig = (function () {
    function SideNavStateConfig() {
        this.toggle = {
            id: SideNavStateNames.Toggle,
            addClass: 'sidenav-mobile',
            showHeader: true,
            isLockedOpen: false,
            expandedButton: false,
            isExpanded: true,
            expand: true,
            showIconTooltype: false
        };
        this.small = {
            id: SideNavStateNames.Small,
            addClass: 'pip-sticky-nav-small sidenav-smalldesktop',
            showHeader: false,
            isLockedOpen: true,
            expandedButton: false,
            isExpanded: false,
            expand: false,
            showIconTooltype: true
        };
        this.large = {
            id: SideNavStateNames.Large,
            addClass: 'sidenav-smalldesktop',
            showHeader: false,
            isLockedOpen: true,
            expandedButton: true,
            isExpanded: true,
            expand: true,
            showIconTooltype: true
        };
        this.xlarge = {
            id: SideNavStateNames.XLarge,
            addClass: 'sidenav-desktop',
            showHeader: false,
            isLockedOpen: true,
            expandedButton: false,
            isExpanded: true,
            expand: true,
            showIconTooltype: false
        };
    }
    return SideNavStateConfig;
}());
exports.SideNavStateConfig = SideNavStateConfig;
var SideNavConfig = (function () {
    function SideNavConfig() {
        this.backdrop = true;
    }
    return SideNavConfig;
}());
exports.SideNavConfig = SideNavConfig;
},{}],41:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular.module('pipSideNav', ['ngMaterial', 'pipNav.Templates']);
require("./SideNavState");
require("./SideNavService");
require("./SideNavPart");
require("./SideNav");
__export(require("./SideNavService"));
},{"./SideNav":37,"./SideNavPart":38,"./SideNavService":39,"./SideNavState":40}],42:[function(require,module,exports){
"use strict";
var PipTab = (function () {
    function PipTab() {
    }
    return PipTab;
}());
exports.PipTab = PipTab;
{
    var TabsBindings = {
        ngDisabled: '&?',
        tabs: '<pipTabs',
        showTabs: '&pipShowTabs',
        showTabsShadow: '&pipTabsShadow',
        activeIndex: '<?pipActiveIndex',
        select: '=pipTabsSelect',
        breakpoints: '<?pipBreakpoints',
        themeClass: '<?themeClass',
    };
    var TabsChanges = (function () {
        function TabsChanges() {
        }
        return TabsChanges;
    }());
    var TabsDirectiveController = (function () {
        TabsDirectiveController.$inject = ['$element', '$injector', '$rootScope', '$timeout', 'navConstant', '$mdMedia'];
        function TabsDirectiveController($element, $injector, $rootScope, $timeout, navConstant, $mdMedia) {
            "ngInject";
            this.$element = $element;
            this.$injector = $injector;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.navConstant = navConstant;
            this.setTheme();
            this.pipMedia = this.$injector.has('pipMedia') ? this.$injector.get('pipMedia') : $mdMedia;
            if (!this.breakpoints) {
                this.breakpoints = this.navConstant.TAB_BREAKPOINT;
            }
        }
        TabsDirectiveController.prototype.setTheme = function () {
            this._pipTheme = this.$injector.has('pipTheme') ? this.$injector.get('pipTheme') : null;
            if (this._pipTheme) {
                this.currentTheme = this._pipTheme.theme;
            }
            else if (this.$rootScope['$theme']) {
                this.currentTheme = this.$rootScope['$theme'];
            }
            this.themeClass = (this.themeClass || '') + ' md-' + this.currentTheme + '-theme';
        };
        TabsDirectiveController.prototype.setTranslate = function () {
            this._pipTranslate = this.$injector.has('pipTranslate') ? this.$injector.get('pipTranslate') : null;
            if (this._pipTranslate) {
                if (this.tabs.length > 0 && this.tabs[0].title) {
                    this._pipTranslate.translateObjects(this.tabs, 'title', 'nameLocal');
                }
                else {
                    this._pipTranslate.translateObjects(this.tabs, 'name', 'nameLocal');
                }
            }
        };
        TabsDirectiveController.prototype.isDisabled = function () {
            if (_.isFunction(this.ngDisabled)) {
                return this.ngDisabled();
            }
            else {
                return this.toBoolean(this.ngDisabled);
            }
        };
        ;
        TabsDirectiveController.prototype.tabDisabled = function (index) {
            return (this.isDisabled() && this.activeIndex != index);
        };
        ;
        TabsDirectiveController.prototype.onSelect = function (index) {
            var _this = this;
            if (this.isDisabled())
                return;
            this.activeIndex = index;
            this.selectedTabId = this.tabs.length >= this.activeIndex ? this.tabs[this.activeIndex].id : null;
            this.$timeout(function () {
                if (_this.select) {
                    _this.select(_this.tabs[_this.activeIndex], _this.activeIndex);
                }
            }, 0);
        };
        ;
        TabsDirectiveController.prototype.showShadow = function () {
            if (_.isFunction(this.showTabsShadow)) {
                return this.showTabsShadow();
            }
            else {
                return this.toBoolean(this.showTabsShadow);
            }
        };
        ;
        TabsDirectiveController.prototype.show = function () {
            if (!this.showTabs)
                return true;
            if (_.isFunction(this.showTabs)) {
                return this.showTabs();
            }
            else {
                return this.toBoolean(this.showTabs);
            }
        };
        ;
        TabsDirectiveController.prototype.toBoolean = function (value) {
            if (value == null)
                return false;
            if (!value)
                return false;
            value = value.toString().toLowerCase();
            return value == '1' || value == 'true';
        };
        TabsDirectiveController.prototype.$onChanges = function (changes) {
            var _this = this;
            if (!changes.breakpoints) {
                if (!this.breakpoints) {
                    this.breakpoints = this.navConstant.TAB_BREAKPOINT;
                }
            }
            else {
                this.breakpoints = changes.breakpoints.currentValue ? changes.breakpoints.currentValue : this.navConstant.TAB_BREAKPOINT;
            }
            if (changes.activeIndex === undefined) {
                if (!this.activeIndex) {
                    this.activeIndex = 0;
                }
            }
            else {
                this.activeIndex = changes.activeIndex.currentValue || 0;
                if (this.$timeout && this.activeIndex !== changes.activeIndex.previousValue) {
                    this.$timeout(function () {
                        var a = _this.$element.find('md-tabs-canvas');
                        if (a && a[0]) {
                            angular.element(a[0]).attr('activeIndex', _this.activeIndex);
                        }
                        a.on('focusout', function () {
                            angular.element(a[0]).attr('activeIndex', _this.activeIndex);
                            _this.$timeout(function () {
                                angular.element(a[0]).attr('activeIndex', _this.activeIndex);
                            }, 50);
                        });
                    }, 1000);
                }
            }
            if (changes.tabs === undefined || !_.isArray(changes.tabs.currentValue)) {
                if (!this.tabs) {
                    this.tabs = [];
                }
            }
            else {
                this.tabs = changes.tabs.currentValue;
                this.setTranslate();
            }
            if (!changes.activeIndex && changes.tabs && this.selectedTabId !== undefined) {
                var index = _.indexOf(this.tabs, _.find(this.tabs, {
                    id: this.selectedTabId
                }));
                if (index < 0) {
                    this.selectedTabId = this.tabs.length >= this.activeIndex ? this.tabs[this.activeIndex].id : null;
                }
                else if (this.tabs.length > 0 && this.activeIndex) {
                    this.onSelect(index);
                }
            }
            else {
                this.selectedTabId = this.tabs.length >= this.activeIndex ? this.tabs[this.activeIndex].id : null;
            }
        };
        return TabsDirectiveController;
    }());
    var Tabs = {
        bindings: TabsBindings,
        templateUrl: 'tabs/Tabs.html',
        controller: TabsDirectiveController
    };
    angular
        .module('pipTabs', ['pipNav.Templates'])
        .component('pipTabs', Tabs);
}
},{}],43:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipNav.Templates');
} catch (e) {
  module = angular.module('pipNav.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('actions/PrimaryActions.html',
    '<div pip-focused="" pip-focused-tabindex="2"><md-menu md-position-mode="target-right target" class="pip-primary-actions" ng-repeat="action in $ctrl.config.primaryLocalActions"><md-button class="pip-primary-actions-action md-icon-button pip-focusable" ng-click="$ctrl.clickAction(action, $mdOpenMenu);" tabindex="-1" ng-hide="$ctrl.isHidden(action)" aria-label="{{ action.title | translate }}"><div class="pip-primary-actions-badge" ng-show="action.count > 0">{{ $ctrl.actionCount(action) }}</div><md-icon md-svg-icon="{{ action.icon}}"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="subAction in action.subActions" ng-if="!subAction.divider" ng-hide="$ctrl.isHidden(subAction)"><md-button class="pip-focusable" ng-hide="subAction.divider" tabindex="-1" ng-click="$ctrl.clickAction(subAction)">{{ ::subAction.title | translate }}</md-button></md-menu-item><md-menu-divider ng-if="subAction.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu><md-menu md-position-mode="target-right target" class="pip-primary-actions" ng-repeat="action in $ctrl.config.primaryGlobalActions"><md-button class="pip-primary-actions-action md-icon-button pip-focusable" ng-click="$ctrl.clickAction(action, $mdOpenMenu);" ng-hide="$ctrl.isHidden(action)" tabindex="-1" aria-label="{{ action.title | translate }}"><div class="pip-primary-actions-badge color-badge-bg" ng-show="action.count > 0">{{ $ctrl.actionCount(action) }}</div><md-icon md-svg-icon="{{ action.icon }}"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="subAction in action.subActions" ng-if="!subAction.divider" ng-hide="$ctrl.isHidden(subAction)"><md-button class="pip-focusable" ng-hide="subAction.divider" tabindex="-1" ng-click="$ctrl.clickAction(subAction)">{{ subAction.title | translate }}</md-button></md-menu-item><md-menu-divider ng-if="subAction.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu></div>');
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
    '<md-menu ng-if="$ctrl.secondaryActionsVisible()" md-position-mode="target-right target"><md-button class="md-icon-button" tabindex="3" ng-init="$ctrl.getMenu($mdOpenMenu)" ng-click="$ctrl.onSecondaryActionClick(); $ctrl.openMenu($mdOpenMenu, $event);" aria-label="open actions"><md-icon md-svg-icon="icons:vdots"></md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat-start="action in $ctrl.config.secondaryLocalActions" ng-if="!action.divider" ng-hide="$ctrl.isHidden(action)"><md-button ng-hide="action.divider" ng-click="$ctrl.clickAction(action)">{{ ::action.title | translate }}</md-button></md-menu-item><md-menu-divider ng-if="action.divider" ng-repeat-end=""></md-menu-divider><md-menu-divider ng-if="$ctrl.secondaryDividerVisible()"></md-menu-divider><md-menu-item ng-repeat-start="action in $ctrl.config.secondaryGlobalActions" ng-if="!action.divider" ng-hide="$ctrl.isHidden(action)"><md-button ng-hide="action.divider" ng-click="$ctrl.clickAction(action)">{{ ::action.title | translate }}</md-button></md-menu-item><md-menu-divider ng-if="action.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu>');
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
    '<md-toolbar class="{{ $ctrl.config.classes.join(\' \') }}" ng-if="$ctrl.config.visible" ng-transclude=""></md-toolbar>');
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
    '<div class="pip-breadcrumb-block"><div class="text-overflow" ng-if="!$ctrl._media(\'xs\')"><span ng-if="$ctrl.config.criteria" ng-click="$ctrl.openSearch()">{{ $ctrl.config.criteria }} -</span><span class="pip-breadcrumb-item {{ $last ? \'breadcrumb-accent\' : \'\' }}" ng-if="$ctrl.config.items && $ctrl.config.items.length > 0" ng-repeat-start="item in $ctrl.config.items" ng-click="$ctrl.onClick(item)" ng-init="stepWidth = 100/($ctrl.config.items.length + 1)" ng-class="{\'cursor-pointer\': !$last}" ng-style="{\'max-width\': stepWidth + \'%\'}"><span ng-if="!$last || !$ctrl.actionsVisible(item)">{{ item.title | translate }}</span><div ng-if="$last && $ctrl.actionsVisible(item)" style="display: inline-block; position: relative;"><md-menu md-offset="0 44"><span class="layout-row pip-breadcrumb-item-menu cursor-pointer {{ $last ? \'breadcrumb-accent\' : \'\' }}" ng-click="$ctrl.onOpenMenu($mdOpenMenu, $event)" md-ink-ripple="" aria-label="open breadcrumb actions">{{ item.title | translate }}<md-icon class="pip-triangle-down" md-svg-icon="icons:triangle-down"></md-icon></span><md-menu-content width="4"><md-menu-item ng-if="!subItem.divider" ng-repeat-start="subItem in item.subActions"><md-button ng-click="$ctrl.onSubActionClick(subItem)" ng-if="!action.divider" tabindex="4"><md-icon md-menu-align-target="" ng-if="subItem.icon" md-svg-icon="{{ subItem.icon }}"></md-icon><span>{{ subItem.title | translate }}</span></md-button></md-menu-item><md-menu-divider ng-if="subItem.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu></div></span><md-icon ng-repeat-end="" md-svg-icon="icons:chevron-right" ng-hide="$last"></md-icon><span class="pip-title breadcrumb-accent" ng-if="$ctrl.config.text">{{ $ctrl.config.text | translate }}</span></div><div style="position: relative;" ng-if="$ctrl._media(\'xs\')"><md-menu md-offset="0 44"><span class="pip-mobile-breadcrumb layout-row" ng-click="$ctrl.config.items && $ctrl.config.items.length > 1 ? $mdOpenMenu() : return"><span class="text-overflow"><span ng-if="$ctrl.config.criteria" ng-click="$ctrl.openSearch()">{{ $ctrl.config.criteria }} -</span> <span class="breadcrumb-accent" ng-if="$ctrl.config.text">{{ $ctrl.config.text | translate }}</span> <span ng-if="$ctrl.config.items && $ctrl.config.items.length > 0" class="breadcrumb-accent {{ ($ctrl.config.items && $ctrl.config.items.length > 1) ? \'cursor-pointer\' : \'\' }}">{{ $ctrl.config.items[$ctrl.config.items.length - 1].title | translate }}</span></span><md-icon class="pip-triangle-down cursor-pointer breadcrumb-accent" md-svg-icon="icons:triangle-down" ng-if="$ctrl.config.items && $ctrl.config.items.length > 1"></md-icon></span><md-menu-content width="4"><md-menu-item ng-repeat="item in $ctrl.config.items" ng-if="$ctrl.config.items && $ctrl.config.items.length > 0"><md-button ng-click="$ctrl.onClick(item)" tabindex="5"><md-icon md-menu-align-target="" ng-if="item.icon" md-svg-icon="{{ item.icon }}"></md-icon><span>{{ item.title | translate }}</span></md-button></md-menu-item><md-menu-item ng-if="$ctrl.config.text"><md-button tabindex="5"><span class="text-grey">{{ $ctrl.config.text | translate }}</span></md-button></md-menu-item></md-menu-content></md-menu></div></div>');
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
    '<md-toolbar class="md-subhead color-primary-bg {{ $ctrl.themeClass}}" ng-if="$ctrl.show()" ng-class="{\'md-whiteframe-3dp\': $ctrl.media(\'xs\')}"><div class="pip-divider"></div><md-select ng-model="$ctrl.selectedIndex" tabindex="15" ng-disabled="$ctrl.disabled()" md-container-class="pip-full-width-dropdown" aria-label="DROPDOWN" md-ink-ripple="" md-on-close="$ctrl.onSelect($ctrl.selectedIndex)"><md-option ng-repeat="action in $ctrl.actions" value="{{ ::$index }}" ng-selected="$ctrl.activeIndex == $index ? true : false">{{ (action.title || action.name || action) | translate }}</md-option></md-select></md-toolbar>');
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
    '<md-toolbar ng-show="$ctrl.showHeader" class="layout-row layout-align-start-center"><div class="flex-fixed pip-sticky-nav-header-user"><md-button class="md-icon-button" ng-click="$ctrl.onUserClick()" aria-label="current user" tabindex="-1"><img src="" class="pip-sticky-nav-header-user-image" ng-class="$ctrl.imageCss"></md-button></div><div class="pip-sticky-nav-header-user-text"><div class="pip-sticky-nav-header-user-pri" ng-click="$ctrl.onUserClick()" tabindex="-1">{{ $ctrl.title | translate }}</div><div class="pip-sticky-nav-header-user-sec">{{ $ctrl.subtitle | translate }}</div></div></md-toolbar>');
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
    '<md-button class="md-icon-button pip-nav-icon" ng-if="$ctrl.config.type != \'none\'" ng-class="$ctrl.config.class" ng-click="$ctrl.onNavIconClick()" tabindex="{{ $ctrl.config.type==\'menu\' || $ctrl.config.type==\'back\' ? 4 : -1 }}" aria-label="menu"><md-icon ng-if="$ctrl.config.type==\'menu\'" md-svg-icon="icons:menu"></md-icon><img ng-src="{{ $ctrl.config.imageUrl }}" ng-if="$ctrl.config.type==\'image\'" height="24" width="24"><md-icon ng-if="$ctrl.config.type==\'back\'" md-svg-icon="icons:arrow-left"></md-icon><md-icon ng-if="$ctrl.config.type==\'icon\'" md-svg-icon="{{ $ctrl.config.icon }}"></md-icon></md-button>');
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
    '<md-menu md-position-mode="target-right target"><span class="pip-language" ng-click="$mdOpenMenu()" aria-label="language selection">{{ $ctrl.value | translate }}<md-icon md-svg-icon="icons:triangle-down"></md-icon></span><md-menu-content width="3"><md-menu-item ng-repeat="language in $ctrl.languages"><md-button ng-click="$ctrl.onLanguageClick(language)" tabindex="7">{{ language | translate }}</md-button></md-menu-item></md-menu-content></md-menu>');
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
    '<div ng-if="$ctrl.sections && $ctrl.sections.length"><md-list class="sidenav-list" pip-focused="" pip-focused-tabindex="10" pip-with-hidden="true"><md-list-item class="no-border pip-sticky-nav-menu-item pip-sticky-nav-expanded-button" ng-click="$ctrl.onExpand()" ng-disabled="!$ctrl.isCollapsed" tabindex="-1" ng-if="$ctrl.expandedButton"><md-icon class="pip-sticky-nav-menu-icon" md-svg-icon="icons:chevron-left" ng-if="$ctrl.expanded"></md-icon><md-icon class="pip-sticky-nav-menu-icon" md-svg-icon="icons:chevron-right" ng-if="!$ctrl.expanded"></md-icon></md-list-item><md-divider ng-show="$ctrl.expandedButton"></md-divider><div class="pip-section" ng-repeat="section in $ctrl.sections" ng-hide="section.access && !section.access(section)"><md-divider ng-show="$index > 0 && !$ctrl.isSectionEmpty(section.links)"></md-divider><md-subheader ng-show="section.title" style="height: 48px;"><span ng-if="$ctrl.expanded" class="pip-sticky-nav-menu-title section-title">{{ ::section.title | translate }}</span><md-icon class="pip-sticky-nav-menu-icon section-icon" md-svg-icon="{{ section.icon }}" ng-if="!$ctrl.sideNavState.showIconTooltype && !$ctrl.expanded && section.icon"></md-icon><md-icon class="pip-sticky-nav-menu-icon section-icon" md-svg-icon="{{ section.icon }}" ng-if="$ctrl.sideNavState.showIconTooltype && !$ctrl.expanded && section.icon"><md-tooltip md-visible="showTooltip" md-direction="right" class="sidenav-icon-tooltip">{{ ::section.tooltipText || section.title | translate }}</md-tooltip></md-icon><md-icon class="pip-sticky-nav-menu-icon section-icon" md-svg-icon="{{ $ctrl.defaultIcon }}" ng-if="!$ctrl.sideNavState.showIconTooltype && !$ctrl.expanded && !section.icon"></md-icon><md-icon class="pip-sticky-nav-menu-icon section-icon" md-svg-icon="{{ $ctrl.defaultIcon }}" ng-if="$ctrl.sideNavState.showIconTooltype && !$ctrl.expanded && !section.icon"><md-tooltip md-visible="showTooltip" class="md-secondary">{{ ::section.tooltipText || section.title | translate }}</md-tooltip></md-icon></md-subheader><md-list-item class="no-border pip-sticky-nav-menu-item pip-focusable" tabindex="-1" ng-repeat="link in section.links" ng-class="{\'active\': $ctrl.isActive(link)}" ng-hide="link.access && !link.access(link)"><md-button class="layout-row layout-align-start-center pip-button-block" tabindex="-1" ng-click="$ctrl.clickLink($event, link)"><md-tooltip md-visible="showTooltip" md-direction="right">{{ ::link.tooltipText | translate }}</md-tooltip><div class="pip-sticky-nav-menu-icon-block"><md-icon class="pip-sticky-nav-menu-icon flex-fixed" md-svg-icon="{{ link.icon }}" ng-if="!($ctrl.sideNavState.showIconTooltype && !link.tooltipText && !$ctrl.expanded)" ng-hide="!link.icon"></md-icon><md-icon class="pip-sticky-nav-menu-icon flex-fixed" md-svg-icon="{{ link.icon }}" ng-hide="!link.icon" ng-if="$ctrl.sideNavState.showIconTooltype && !link.tooltipText && !$ctrl.expanded"><md-tooltip md-visible="showTooltip" md-direction="right" class="sidenav-icon-tooltip">{{ ::link.tooltipText || link.title | translate }}</md-tooltip></md-icon></div><div class="pip-sticky-nav-menu-title">{{ ::link.title | translate }}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count < 100">{{ link.count }}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count > 99">!</div></md-button></md-list-item></div></md-list></div>');
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
    '<div class="md-toolbar-tools pip-search-container" ng-if="$ctrl.enabled"><div class="layout-row pip-search-selected"><md-button class="md-icon-button" tabindex="6" aria-label="start search" ng-click="$ctrl.onClick()"><md-icon md-svg-icon="icons:search"></md-icon></md-button><input class="pip-search-text flex" type="search" tabindex="6" ng-model="$ctrl.search.text" ng-keydown="$ctrl.onKeyDown($event)"><md-button class="md-icon-button" tabindex="6" aria-label="clear search" ng-click="$ctrl.clear()"><md-icon md-svg-icon="icons:cross-circle"></md-icon></md-button></div></div><div class="md-toolbar-tools layout-row layout-align-end-center flex-fixed lp0 rp0" ng-if="!$ctrl.enabled"><md-button class="md-icon-button" tabindex="5" aria-label="start search" ng-click="$ctrl.enable()"><md-icon md-svg-icon="icons:search"></md-icon></md-button></div>');
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
    '<md-sidenav class="md-sidenav-left" md-is-locked-open="$ctrl.sidenavState.isLockedOpen" md-component-id="pip-sticky-sidenav" ng-transclude=""></md-sidenav>');
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
    '<md-toolbar ng-if="$ctrl.pipMedia" class="pip-nav color-primary-bg {{ $ctrl.themeClass }}" ng-class="{\'pip-visible\': $ctrl.show(), \'pip-shadow\': $ctrl.showShadow()}"><md-tabs class="color-primary-bg" ng-if="$ctrl.pipMedia($ctrl.breakpoints)" md-selected="$ctrl.activeIndex" ng-class="{\'disabled\': $ctrl.isDisabled()}" md-stretch-tabs="true" md-dynamic-height="true"><md-tab ng-repeat="tab in $ctrl.tabs track by $index" ng-disabled="$ctrl.tabDisabled($index)" md-on-select="$ctrl.onSelect($index)"><md-tab-label>{{:: tab.nameLocal }}<div class="pip-tabs-badge color-badge-bg" ng-if="tab.counts > 0 && tab.counts <= 99">{{ tab.counts }}</div><div class="pip-tabs-badge color-badge-bg" ng-if="tab.counts > 99">!</div></md-tab-label></md-tab></md-tabs><div class="md-subhead pip-tabs-content color-primary-bg" ng-if="!$ctrl.pipMedia($ctrl.breakpoints)"><div class="pip-divider position-top m0"></div><md-select ng-model="$ctrl.activeIndex" ng-disabled="$ctrl.isDisabled()" md-container-class="pip-full-width-dropdown" aria-label="SELECT" md-ink-ripple="" md-on-close="$ctrl.onSelect($ctrl.activeIndex)"><md-option ng-repeat="tab in $ctrl.tabs track by $index" class="pip-tab-option" value="{{ ::$index }}">{{ ::tab.nameLocal }}<div class="pip-tabs-badge color-badge-bg" ng-if="tab.counts > 0 && tab.counts <= 99">{{ tab.counts }}</div><div class="pip-tabs-badge color-badge-bg" ng-if="tab.counts > 99">!</div></md-option></md-select></div></md-toolbar>');
}]);
})();



},{}]},{},[43,27])(43)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWN0aW9ucy9BY3Rpb25zU2VydmljZS50cyIsInNyYy9hY3Rpb25zL0lBY3Rpb25zU2VydmljZS50cyIsInNyYy9hY3Rpb25zL1ByaW1hcnlBY3Rpb25zLnRzIiwic3JjL2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9ucy50cyIsInNyYy9hY3Rpb25zL2luZGV4LnRzIiwic3JjL2FwcGJhci9BcHBCYXIudHMiLCJzcmMvYXBwYmFyL0FwcEJhckNvbmZpZy50cyIsInNyYy9hcHBiYXIvQXBwQmFyUGFydC50cyIsInNyYy9hcHBiYXIvQXBwQmFyU2VydmljZS50cyIsInNyYy9hcHBiYXIvaW5kZXgudHMiLCJzcmMvYnJlYWRjcnVtYi9CcmVhZGNydW1iLnRzIiwic3JjL2JyZWFkY3J1bWIvQnJlYWRjcnVtYkNvbmZpZy50cyIsInNyYy9icmVhZGNydW1iL0JyZWFkY3J1bWJTZXJ2aWNlLnRzIiwic3JjL2JyZWFkY3J1bWIvaW5kZXgudHMiLCJzcmMvY29tbW9uL05hdlNlcnZpY2UudHMiLCJzcmMvZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlci50cyIsInNyYy9kcm9wZG93bi9Ecm9wZG93bi50cyIsInNyYy9oZWFkZXIvTmF2SGVhZGVyLnRzIiwic3JjL2hlYWRlci9OYXZIZWFkZXJDb25maWcudHMiLCJzcmMvaGVhZGVyL05hdkhlYWRlclNlcnZpY2UudHMiLCJzcmMvaGVhZGVyL2luZGV4LnRzIiwic3JjL2ljb24vTmF2SWNvbi50cyIsInNyYy9pY29uL05hdkljb25Db25maWcudHMiLCJzcmMvaWNvbi9OYXZJY29uU2VydmljZS50cyIsInNyYy9pY29uL2luZGV4LnRzIiwic3JjL2luZGV4LnRzIiwic3JjL2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyRGlyZWN0aXZlLnRzIiwic3JjL21lbnUvTmF2TWVudS50cyIsInNyYy9tZW51L05hdk1lbnVTZXJ2aWNlLnRzIiwic3JjL21lbnUvaW5kZXgudHMiLCJzcmMvc2VhcmNoL1NlYXJjaEJhci50cyIsInNyYy9zZWFyY2gvU2VhcmNoQ29uZmlnLnRzIiwic3JjL3NlYXJjaC9TZWFyY2hTZXJ2aWNlLnRzIiwic3JjL3NlYXJjaC9pbmRleC50cyIsInNyYy9zaWRlbmF2L1NpZGVOYXYudHMiLCJzcmMvc2lkZW5hdi9TaWRlTmF2UGFydC50cyIsInNyYy9zaWRlbmF2L1NpZGVOYXZTZXJ2aWNlLnRzIiwic3JjL3NpZGVuYXYvU2lkZU5hdlN0YXRlLnRzIiwic3JjL3NpZGVuYXYvaW5kZXgudHMiLCJzcmMvdGFicy9UYWJzLnRzIiwidGVtcC9waXAtd2VidWktbmF2LWh0bWwubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBLHFEQUFrRDtBQUVsRCxxREFBd0Q7QUFDeEQscURBQThEO0FBSzlEO0lBSUksd0JBQ0ksTUFBcUIsRUFDckIsVUFBZ0M7UUFFaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELHNCQUFXLGtDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxnREFBb0I7YUFBL0I7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztRQUM3QyxDQUFDO2FBRUQsVUFBZ0MsS0FBbUI7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLGtEQUFzQjthQUFqQztZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO1FBQy9DLENBQUM7YUFFRCxVQUFrQyxLQUFtQjtZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT0Qsc0JBQVcsK0NBQW1CO2FBQTlCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7UUFDNUMsQ0FBQzthQUVELFVBQStCLEtBQW1CO1lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPRCxzQkFBVyxpREFBcUI7YUFBaEM7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztRQUM5QyxDQUFDO2FBRUQsVUFBaUMsS0FBbUI7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMQTtJQU9NLDZCQUFJLEdBQVgsVUFBWSxjQUE2QixFQUFFLGdCQUErQjtRQUN0RSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLGNBQWMsSUFBSSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7UUFDNUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSw2QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxvQ0FBVyxHQUFsQixVQUFtQixNQUFjLEVBQUUsS0FBYTtRQUM1QyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUVqRCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsVUFBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDO2dCQUNqQixDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxvQ0FBVyxHQUFsQjtRQUNJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxVQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyx3Q0FBZSxHQUF2QjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLHFDQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU0sc0NBQWEsR0FBcEI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQywyQ0FBeUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDTCxxQkFBQztBQUFELENBakdBLEFBaUdDLElBQUE7QUFFRDtJQUFBO1FBQ1ksWUFBTyxHQUFrQixJQUFJLCtCQUFhLEVBQUUsQ0FBQztJQW1EekQsQ0FBQztJQWhERyxzQkFBVyxtQ0FBTTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFrQixLQUFvQjtZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssSUFBSSxJQUFJLCtCQUFhLEVBQUUsQ0FBQztRQUNoRCxDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLGlEQUFvQjthQUEvQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDO1FBQzdDLENBQUM7YUFFRCxVQUFnQyxLQUFtQjtZQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDcEQsQ0FBQzs7O09BSkE7SUFNRCxzQkFBVyxtREFBc0I7YUFBakM7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztRQUMvQyxDQUFDO2FBRUQsVUFBa0MsS0FBbUI7WUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3RELENBQUM7OztPQUpBO0lBTUQsc0JBQVcsZ0RBQW1CO2FBQTlCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7UUFDNUMsQ0FBQzthQUVELFVBQStCLEtBQW1CO1lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNuRCxDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLGtEQUFxQjthQUFoQztZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDO1FBQzlDLENBQUM7YUFFRCxVQUFpQyxLQUFtQjtZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDckQsQ0FBQzs7O09BSkE7SUFNTSw4QkFBSSxHQUFYLFVBQVksVUFBVTtRQUNsQixVQUFVLENBQUM7UUFFWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFakUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FwREEsQUFvREMsSUFBQTtBQUVELE9BQU87S0FDRixNQUFNLENBQUMsWUFBWSxDQUFDO0tBQ3BCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7Ozs7Ozs7O0FDbktoQyxRQUFBLG1CQUFtQixHQUFXLG1CQUFtQixDQUFDO0FBQ2xELFFBQUEseUJBQXlCLEdBQVcseUJBQXlCLENBQUM7QUFFM0U7SUFBQTtJQTJCQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQTNCQSxBQTJCQyxJQUFBO0FBM0JZLDRDQUFnQjtBQTZCN0I7SUFBZ0MsOEJBQWdCO0lBQWhEOztJQUVBLENBQUM7SUFBRCxpQkFBQztBQUFELENBRkEsQUFFQyxDQUYrQixnQkFBZ0IsR0FFL0M7QUFGWSxnQ0FBVTtBQUl2QjtJQUFBO1FBRVcseUJBQW9CLEdBQWlCLEVBQUUsQ0FBQztRQUV4Qyx3QkFBbUIsR0FBaUIsRUFBRSxDQUFDO1FBR3ZDLDJCQUFzQixHQUFpQixFQUFFLENBQUM7UUFFMUMsMEJBQXFCLEdBQWdCLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQVZBLEFBVUMsSUFBQTtBQVZZLHNDQUFhOzs7QUNsQzFCO0lBU0ksa0NBQ1ksUUFBNkIsRUFDN0IsU0FBbUMsRUFDbkMsTUFBc0IsRUFDdEIsVUFBZ0MsRUFDaEMsT0FBMEIsRUFDMUIsU0FBOEIsRUFDOUIsVUFBMkIsRUFDbkMsSUFBb0IsRUFDcEIsTUFBc0I7UUFHdEIsVUFBVSxDQUFDO1FBWmYsaUJBbUNDO1FBbENXLGFBQVEsR0FBUixRQUFRLENBQXFCO1FBQzdCLGNBQVMsR0FBVCxTQUFTLENBQTBCO1FBQ25DLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQXNCO1FBQ2hDLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQzFCLGNBQVMsR0FBVCxTQUFTLENBQXFCO1FBQzlCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBUW5DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQW1DLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNwSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3JDLGtCQUFrQixFQUFFLHNCQUFzQjtnQkFDMUMsc0JBQXNCLEVBQUUsdURBQXVEO2FBQ2xGLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRTtnQkFDckMsa0JBQWtCLEVBQUUsc0JBQXNCO2dCQUMxQyxzQkFBc0IsRUFBRSx1REFBdUQ7YUFFbEYsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUdELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxLQUF1QixFQUFFLE1BQXFCO1lBQ3BGLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRU0sMENBQU8sR0FBZDtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM1RCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlELENBQUM7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3pDLENBQUM7SUFFTyxtREFBZ0IsR0FBeEIsVUFBeUIsS0FBdUIsRUFBRSxNQUFxQjtRQUNuRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRU0sMkNBQVEsR0FBZixVQUFnQixNQUFrQjtRQUU5QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVNLDhDQUFXLEdBQWxCLFVBQW1CLE1BQWtCO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSw4Q0FBVyxHQUFsQixVQUFtQixNQUFrQixFQUFFLFdBQXFCO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUN6QyxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLE1BQU0sR0FBNkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQTZCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBRTtnQkFDM0ksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVCxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFSixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEUsQ0FBQztJQUNMLENBQUM7SUFFTCwrQkFBQztBQUFELENBekhBLEFBeUhDLElBQUE7QUFXRCxJQUFNLHNCQUFzQixHQUE0QjtJQUNwRCxZQUFZLEVBQUUsa0JBQWtCO0lBQ2hDLGFBQWEsRUFBRSxtQkFBbUI7SUFDbEMsWUFBWSxFQUFFLG1CQUFtQjtDQUNwQyxDQUFBO0FBRUQ7SUFBQTtJQU1BLENBQUM7SUFBRCw0QkFBQztBQUFELENBTkEsQUFNQyxJQUFBO0FBR0QsQ0FBQztJQUNHLElBQU0sY0FBYyxHQUF5QjtRQUN6QyxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFdBQVcsRUFBRSw2QkFBNkI7UUFDMUMsVUFBVSxFQUFFLHdCQUF3QjtLQUN2QyxDQUFDO0lBR0YsT0FBTztTQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDcEIsU0FBUyxDQUFDLG1CQUFtQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBRXhELENBQUMsQ0FBQyxFQUFFLENBQUM7OztBQy9KTDtJQVNJLG9DQUNZLE1BQXNCLEVBQ3RCLFNBQW1DLEVBQ25DLElBQW9CLEVBQ3BCLFVBQWdDLEVBQ2hDLE9BQTBCLEVBQzFCLFNBQThCLEVBQzlCLFVBQTJCLEVBQ25DLFFBQTZCO1FBRTdCLFVBQVUsQ0FBQztRQVZmLGlCQWlDQztRQWhDVyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixjQUFTLEdBQVQsU0FBUyxDQUEwQjtRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFzQjtRQUNoQyxZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUMxQixjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQU1uQyxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEIsVUFBVSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDekQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLFVBQVUsQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzNELENBQUM7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFFaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxLQUF1QixFQUFFLE1BQXFCO1lBQ3BGLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRTtZQUMzQyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTSw0Q0FBTyxHQUFkLFVBQWUsTUFBZ0I7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDM0IsQ0FBQztJQUVNLHNEQUFpQixHQUF4QjtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU0sNkNBQVEsR0FBZixVQUFnQixXQUFxQixFQUFFLEVBQW9CO1FBQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRU8scURBQWdCLEdBQXhCLFVBQXlCLEtBQXVCLEVBQUUsTUFBcUI7UUFDbkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVNLDZDQUFRLEdBQWYsVUFBZ0IsTUFBa0I7UUFFOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSxnREFBVyxHQUFsQixVQUFtQixNQUFrQjtRQUNqQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBR08sZ0RBQVcsR0FBbkIsVUFBb0IsT0FBcUI7UUFBekMsaUJBVUM7UUFURyxJQUFJLEtBQUssR0FBVyxDQUFDLENBQUM7UUFFdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxNQUFrQjtZQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixLQUFLLEVBQUUsQ0FBQztZQUNaLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLDREQUF1QixHQUE5QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDO1lBQzNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0sNERBQXVCLEdBQTlCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUM7WUFDM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTSxnREFBVyxHQUFsQixVQUFtQixNQUFrQixFQUFFLFdBQXFCO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFPRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDekMsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxNQUFNLEdBQTZCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUE2QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEQsQ0FBQztZQUNMLENBQUM7WUFDRCxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRUosSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hFLENBQUM7SUFDTCxDQUFDO0lBRUwsaUNBQUM7QUFBRCxDQXBKQSxBQW9KQyxJQUFBO0FBVUQsSUFBTSx3QkFBd0IsR0FBOEI7SUFDeEQsWUFBWSxFQUFFLGtCQUFrQjtJQUNoQyxhQUFhLEVBQUUsbUJBQW1CO0NBQ3JDLENBQUE7QUFFRDtJQUFBO0lBS0EsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FMQSxBQUtDLElBQUE7QUFHRCxDQUFDO0lBQ0csSUFBTSxnQkFBZ0IsR0FBeUI7UUFDM0MsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyxXQUFXLEVBQUUsK0JBQStCO1FBQzVDLFVBQVUsRUFBRSwwQkFBMEI7S0FDekMsQ0FBQztJQUVGLE9BQU87U0FDRixNQUFNLENBQUMsWUFBWSxDQUFDO1NBQ3BCLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBRTVELENBQUMsQ0FBQyxFQUFFLENBQUM7Ozs7OztBQ3hMTCxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBRTlFLDRCQUEwQjtBQUMxQiw0QkFBMEI7QUFDMUIsOEJBQTRCO0FBRTVCLHVDQUFrQzs7O0FDSGxDO0lBR0ksMEJBQ0ksUUFBNkIsRUFDN0IsVUFBZ0MsRUFDaEMsU0FBeUI7UUFFekIsVUFBVSxDQUFDO1FBTGYsaUJBZUM7UUFSRyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFFL0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLEtBQXVCLEVBQUUsTUFBb0I7WUFDN0UsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sMENBQWUsR0FBdEIsVUFBdUIsS0FBdUIsRUFBRSxNQUFvQjtRQUNoRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUwsdUJBQUM7QUFBRCxDQXhCQSxBQXdCQyxJQUFBO0FBRUQsQ0FBQztJQUNHLElBQU0sTUFBTSxHQUF5QjtRQUNqQyxVQUFVLEVBQUUsSUFBSTtRQUNoQixXQUFXLEVBQUUsb0JBQW9CO1FBQ2pDLFVBQVUsRUFBRSxnQkFBZ0I7S0FDL0IsQ0FBQTtJQUVELE9BQU87U0FDRixNQUFNLENBQUMsV0FBVyxDQUFDO1NBQ25CLFNBQVMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFFeEMsQ0FBQzs7O0FDeENEO0lBQUE7SUFJQSxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLG9DQUFZOzs7QUNHekI7SUFLSSw4QkFDWSxNQUFpQixFQUN6QixRQUE2QixFQUM3QixNQUFzQixFQUN0QixJQUFvQixFQUNwQixVQUFnQyxFQUNoQyxTQUF5QjtRQUV6QixVQUFVLENBQUM7UUFSZixpQkF5QkM7UUF4QlcsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQVN6QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUd2QixJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsVUFBVSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLEtBQXVCLEVBQUUsTUFBb0I7WUFDN0UsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRU8sOENBQWUsR0FBdkIsVUFBd0IsS0FBdUIsRUFBRSxNQUFvQjtRQUNqRSxJQUFJLEtBQUssR0FBUSxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFHN0MsSUFBSSxPQUFPLEdBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFnQixDQUFDLENBQUM7UUFFcEcsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDekMsQ0FBQztJQUVMLDJCQUFDO0FBQUQsQ0EzQ0EsQUEyQ0MsSUFBQTtBQUdELENBQUM7SUFDRyxvQkFBb0IsYUFBYTtRQUM3QixVQUFVLENBQUM7UUFFWCxJQUFJLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUIsTUFBTSxDQUFDO1lBQ0gsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLHNCQUFzQixNQUFpQixFQUFFLFFBQTZCLEVBQUUsTUFBc0I7Z0JBRWhHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRztvQkFDYixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDRCxVQUFVLEVBQUUsb0JBQW9CO1NBQ25DLENBQUM7SUFDTixDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7U0FDdEIsU0FBUyxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUVoRCxDQUFDLENBQUMsRUFBRSxDQUFDOzs7QUMzRUwsK0NBQThDO0FBR2pDLFFBQUEsa0JBQWtCLEdBQVcsa0JBQWtCLENBQUM7QUFFN0Q7SUFHSSx1QkFBbUIsTUFBb0IsRUFBVSxVQUFnQztRQUFoQyxlQUFVLEdBQVYsVUFBVSxDQUFzQjtRQUM3RSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRUQsc0JBQVcsaUNBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGtDQUFPO2FBQWxCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsZ0NBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLEtBQVU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPTSw0QkFBSSxHQUFYLFVBQVksS0FBVyxFQUFFLE9BQWtCLEVBQUUsaUJBQTRCO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDN0QsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSw0QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sa0NBQVUsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFTyxpQ0FBUyxHQUFqQixVQUFrQixXQUFxQjtRQUF2QyxpQkFVQztRQVRHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQixFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFDLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNMLENBQUM7SUFFTSxpQ0FBUyxHQUFoQjtRQUFpQixxQkFBd0I7YUFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO1lBQXhCLGdDQUF3Qjs7UUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLG9DQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sZ0NBQVEsR0FBZjtRQUFBLGlCQUtDO1FBTGUsaUJBQW9CO2FBQXBCLFVBQW9CLEVBQXBCLHFCQUFvQixFQUFwQixJQUFvQjtZQUFwQiw0QkFBb0I7O1FBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztZQUNkLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sbUNBQVcsR0FBbEI7UUFBQSxpQkFLQztRQUxrQixpQkFBb0I7YUFBcEIsVUFBb0IsRUFBcEIscUJBQW9CLEVBQXBCLElBQW9CO1lBQXBCLDRCQUFvQjs7UUFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO1lBQ2QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFDLEVBQUUsSUFBSyxPQUFBLEVBQUUsSUFBSSxDQUFDLEVBQVAsQ0FBTyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLDRCQUFJLEdBQVgsVUFBWSxJQUFZLEVBQUUsS0FBVTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyx1Q0FBZSxHQUF2QjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLDBCQUFrQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQXZGQSxBQXVGQyxJQUFBO0FBRUQ7SUFBQTtRQUNZLFlBQU8sR0FBaUI7WUFDNUIsT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUUsRUFBRTtZQUNULE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQW9ETixDQUFDO0lBakRHLHNCQUFXLGtDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQWtCLEtBQW1CO1lBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQy9DLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsaUNBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLEtBQVU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUVyQyxDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLG1DQUFPO2FBQWxCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ2hDLENBQUM7YUFFRCxVQUFtQixLQUFlO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdkMsQ0FBQzs7O09BSkE7SUFNTSxpQ0FBUSxHQUFmO1FBQUEsaUJBSUM7UUFKZSxpQkFBb0I7YUFBcEIsVUFBb0IsRUFBcEIscUJBQW9CLEVBQXBCLElBQW9CO1lBQXBCLDRCQUFvQjs7UUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO1lBQ2QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLG9DQUFXLEdBQWxCO1FBQUEsaUJBSUM7UUFKa0IsaUJBQW9CO2FBQXBCLFVBQW9CLEVBQXBCLHFCQUFvQixFQUFwQixJQUFvQjtZQUFwQiw0QkFBb0I7O1FBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztZQUNkLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBQyxFQUFFLElBQUssT0FBQSxFQUFFLElBQUksQ0FBQyxFQUFQLENBQU8sQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDZCQUFJLEdBQVgsVUFBWSxJQUFZLEVBQUUsS0FBVTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVNLDZCQUFJLEdBQVgsVUFBWSxVQUFnQztRQUN4QyxVQUFVLENBQUM7UUFFWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0F6REEsQUF5REMsSUFBQTtBQUVELE9BQU87S0FDRixNQUFNLENBQUMsV0FBVyxDQUFDO0tBQ25CLFFBQVEsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7Ozs7OztBQzNKM0MsT0FBTztLQUNGLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0FBRTdELDBCQUF3QjtBQUN4QiwyQkFBeUI7QUFDekIsb0JBQWtCO0FBQ2xCLHdCQUFzQjtBQUV0QixxQ0FBZ0M7OztBQ0poQyx5REFBNkQ7QUFDN0QseURBQTBEO0FBQzFELHlEQUEwRDtBQUUxRDtJQU1JLDhCQUNZLFVBQWdDLEVBQ2hDLE9BQTBCLEVBQzFCLFNBQThCLEVBQzlCLFNBQW1DLEVBQzNDLGFBQWlDLEVBQ2pDLFFBQWlDLEVBQ2pDLE1BQTJCLEVBQzNCLFFBQTZCO1FBRTdCLFVBQVUsQ0FBQztRQVZmLGlCQXdCQztRQXZCVyxlQUFVLEdBQVYsVUFBVSxDQUFzQjtRQUNoQyxZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUMxQixjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUM5QixjQUFTLEdBQVQsU0FBUyxDQUEwQjtRQVMzQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRW5DLFVBQVUsQ0FBQyxHQUFHLENBQUMsMENBQXNCLEVBQUUsVUFBQyxLQUF1QixFQUFFLE1BQXdCO1lBQ3JGLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsR0FBRyxDQUFDLHVDQUFtQixFQUFFLGNBQVEsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4RSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzVFLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxLQUFLLFNBQVMsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQy9ELENBQUM7SUFFTyxrREFBbUIsR0FBM0IsVUFBNEIsS0FBdUIsRUFBRSxNQUF3QjtRQUN6RSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRU8sK0NBQWdCLEdBQXhCO1FBQ0ksSUFBSSxLQUFLLEdBQXFCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRWhELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksSUFBSSxHQUFtQixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHNDQUFPLEdBQWQsVUFBZSxJQUFvQjtRQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQUVNLHlDQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsK0JBQWUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSw2Q0FBYyxHQUFyQixVQUFzQixJQUFvQjtRQUV0QyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFTSx5Q0FBVSxHQUFqQixVQUFrQixXQUFxQixFQUFFLEtBQVk7UUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sK0NBQWdCLEdBQXZCLFVBQXdCLE1BQXdCO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUN6QyxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLE1BQU0sR0FBNkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUF3QixDQUFBO2dCQUMxRixNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFDRCxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRUosSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzdCLENBQUM7SUFDTCxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQTVHQSxBQTRHQyxJQUFBO0FBRUQsSUFBTSxVQUFVLEdBQXlCO0lBQ3JDLFFBQVEsRUFBRSxFQUFFO0lBQ1osV0FBVyxFQUFFLDRCQUE0QjtJQUN6QyxVQUFVLEVBQUUsb0JBQW9CO0NBQ25DLENBQUE7QUFFRCxPQUFPO0tBQ0YsTUFBTSxDQUFDLGVBQWUsQ0FBQztLQUN2QixTQUFTLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7QUM3SDVDO0lBQUE7UUFDSSxVQUFLLEdBQVcsSUFBSSxDQUFDO1FBQ3JCLFVBQUssR0FBb0MsSUFBSSxDQUFDO1FBQzlDLGVBQVUsR0FBd0IsSUFBSSxDQUFDO0lBQzNDLENBQUM7SUFBRCxxQkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksd0NBQWM7QUFNM0I7SUFBQTtJQUlBLENBQUM7SUFBRCx1QkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksNENBQWdCOzs7QUNQN0IsdURBQXNFO0FBR3pELFFBQUEsc0JBQXNCLEdBQVcsc0JBQXNCLENBQUM7QUFDeEQsUUFBQSxtQkFBbUIsR0FBVyxtQkFBbUIsQ0FBQztBQUUvRDtJQUdJLDJCQUNZLFVBQWdDLEVBQ3hDLE1BQXdCO1FBRGhCLGVBQVUsR0FBVixVQUFVLENBQXNCO1FBR3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFRCxzQkFBVyxxQ0FBTTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsbUNBQUk7YUFBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUM3QixDQUFDO2FBRUQsVUFBZ0IsS0FBYTtZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRTFCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FQQTtJQVNELHNCQUFXLG9DQUFLO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFpQixLQUF1QjtZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBRTNCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FQQTtJQVNELHNCQUFXLHVDQUFRO2FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUFvQixLQUFhO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPTSxvQ0FBUSxHQUFmLFVBQWdCLElBQVksRUFBRSxRQUFpQjtRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLHFDQUFTLEdBQWhCLFVBQWlCLEtBQXVCLEVBQUUsUUFBaUI7UUFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sMkNBQWUsR0FBdEI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyw4QkFBc0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0E5REEsQUE4REMsSUFBQTtBQUdEO0lBQUE7UUFDWSxZQUFPLEdBQXFCLElBQUksbUNBQWdCLEVBQUUsQ0FBQztJQW1CL0QsQ0FBQztJQWhCRyxzQkFBVyxvQ0FBSTthQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzdCLENBQUM7YUFFRCxVQUFnQixLQUFhO1lBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDOzs7T0FKQTtJQU1NLGlDQUFJLEdBQVgsVUFBWSxVQUFnQztRQUN4QyxVQUFVLENBQUM7UUFFWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVwRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBO0FBR0QsT0FBTztLQUNGLE1BQU0sQ0FBQyxlQUFlLENBQUM7S0FDdkIsUUFBUSxDQUFDLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDOzs7Ozs7QUNoR25ELE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUV4Rix3QkFBc0I7QUFDdEIsK0JBQTZCO0FBRTdCLHlDQUFvQzs7O0FDS3BDO0lBV0ksb0JBQW1CLFNBQW1DO1FBQ2xELFVBQVUsQ0FBQztRQUVYLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBbUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDN0YsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFvQixTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM5RixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQXVCLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzdHLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBb0IsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDakcsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFtQixTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM3RixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQW9CLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2pHLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBc0IsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdEcsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFvQixTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNsRyxDQUFDO0lBRU0sMEJBQUssR0FBWjtRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsQ0FBQztJQUVMLENBQUM7SUFDTCxpQkFBQztBQUFELENBdkRBLEFBdURDLElBQUE7QUFFRCxPQUFPO0tBQ0YsTUFBTSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUM7S0FDM0IsT0FBTyxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQzs7QUNyRTFDLENBQUM7SUFFRyx5QkFBeUIsU0FBbUM7UUFDeEQsVUFBVSxDQUFDO1FBRVgsSUFBSSxZQUFZLEdBQW1DLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO2NBQzFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTNFLE1BQU0sQ0FBQyxVQUFVLEdBQVc7WUFDeEIsTUFBTSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbkUsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUVELE9BQU87U0FDRixNQUFNLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDO1NBQzlCLE1BQU0sQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFOUMsQ0FBQzs7QUNqQkQsQ0FBQztJQUNHO1FBaUJJLDRCQUNZLE1BQXNCLEVBQ3RCLFFBQTRCLEVBQ3BDLFFBQTZCLEVBQzdCLE1BQXNCLEVBQ3RCLFNBQW1DLEVBQ25DLElBQW9CLEVBQ3BCLFVBQWdDLEVBQ2hDLFFBQWlDO1lBR2pDLFVBQVUsQ0FBQztZQVZILFdBQU0sR0FBTixNQUFNLENBQWdCO1lBQ3RCLGFBQVEsR0FBUixRQUFRLENBQW9CO1lBV3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBNkIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDeEcsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUE4QixTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUV6RyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztZQUdsRixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDeEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUM3RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFTSxxQ0FBUSxHQUFmO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDN0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztRQUNMLENBQUM7UUFFTSxxQ0FBUSxHQUFmLFVBQWdCLEtBQWE7WUFBN0IsaUJBV0M7WUFWRyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDVixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7UUFFTSxpQ0FBSSxHQUFYO1lBQ0ksSUFBSSxNQUFlLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztRQUNMLENBQUM7UUFFTCx5QkFBQztJQUFELENBN0VBLEFBNkVDLElBQUE7SUFjRCxJQUFNLGdCQUFnQixHQUFzQjtRQUN4QyxVQUFVLEVBQUUsR0FBRztRQUNmLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLFlBQVksRUFBRSxVQUFVO1FBQ3hCLFdBQVcsRUFBRSxpQkFBaUI7UUFDOUIsTUFBTSxFQUFFLG9CQUFvQjtRQUM1QixTQUFTLEVBQUUsR0FBRztLQUNqQixDQUFBO0lBRUQ7UUFBQTtRQVNBLENBQUM7UUFBRCxzQkFBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBRUQsSUFBTSxRQUFRLEdBQXlCO1FBQ25DLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLHdCQUF3QjtRQUNyQyxVQUFVLEVBQUUsa0JBQWtCO0tBQ2pDLENBQUM7SUFFRixPQUFPO1NBQ0YsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDM0MsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUU1QyxDQUFDOzs7QUN2SEQsQ0FBQztJQUNHO1FBYUksNkJBQ1ksUUFBNkIsRUFDN0IsTUFBc0IsRUFDOUIsSUFBb0IsRUFDWixVQUFnQyxFQUNoQyxRQUE0QixFQUM1QixZQUErQixFQUN2QyxXQUFnQjtZQUdoQixVQUFVLENBQUM7WUFWZixpQkF3QkM7WUF2QlcsYUFBUSxHQUFSLFFBQVEsQ0FBcUI7WUFDN0IsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7WUFFdEIsZUFBVSxHQUFWLFVBQVUsQ0FBc0I7WUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7WUFDNUIsaUJBQVksR0FBWixZQUFZLENBQW1CO1lBYnBDLGFBQVEsR0FBVyxJQUFJLENBQUM7WUFvQjNCLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFakIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsVUFBQyxNQUF3QixFQUFFLE1BQXVCO2dCQUNuSCxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQzNDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLDBCQUEwQixHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxNQUF3QixFQUFFLEtBQVU7Z0JBQzVHLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUVNLHdDQUFVLEdBQWpCO1lBRUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQ25DLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFDdEMsQ0FBQztRQUNMLENBQUM7UUFFTyx1Q0FBUyxHQUFqQjtZQUFBLGlCQXdCQztZQXZCRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFFcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBRXJFLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQixLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsV0FBVyxFQUFFLEVBQWxCLENBQWtCLENBQUMsQ0FBQztvQkFNbEQsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7Z0JBSXhELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFdBQVcsRUFBRSxFQUFsQixDQUFrQixDQUFDLENBQUM7b0JBQy9DLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLEVBQUUsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDO2dCQUVELEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1RCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRU8sd0NBQVUsR0FBbEI7WUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUV0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN0RCxDQUFDO1FBZU8seUNBQVcsR0FBbkI7WUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFBQSxDQUFDO1FBRU0sMENBQVksR0FBcEI7WUFBQSxpQkFLQztZQUpHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQSxDQUFDO1FBRU0sNENBQWMsR0FBdEIsVUFBdUIsS0FBdUIsRUFBRSxLQUFVO1lBQTFELGlCQVVDO1lBVEcsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFFaEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDO2dCQUNwRCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDWixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDNUIsQ0FBQztRQUNMLENBQUM7UUFFTywrQ0FBaUIsR0FBekIsVUFBMEIsS0FBMEI7WUFDaEQsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUNkLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUM5RixlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFDbEcsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUNwRCxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQ3ZELE1BQU0sR0FBRyxDQUFDLENBQUM7WUFFZixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsV0FBVyxHQUFHLGVBQWUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDOUUsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUM5QyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xELFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsVUFBVSxHQUFHLGVBQWUsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUM1RSxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxjQUFjLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDN0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxXQUFXLEdBQUcsY0FBYyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQzVFLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDaEQsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNsQyxDQUFDO1lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQUEsQ0FBQztRQUVNLHNDQUFRLEdBQWhCLFVBQWlCLE1BQU0sRUFBRSxTQUFrQjtZQUN2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFFcEIsSUFBSSxHQUFXLENBQUM7WUFFaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztnQkFDL0IsR0FBRyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDakMsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDM0MsQ0FBQztRQUNMLENBQUM7UUFFTyxnREFBa0IsR0FBMUIsVUFBMkIsTUFBd0IsRUFBRSxNQUF1QjtZQUN4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFFcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBRWhDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ2hDLENBQUM7UUFFTSx5Q0FBVyxHQUFsQjtZQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVMLDBCQUFDO0lBQUQsQ0FuTEEsQUFtTEMsSUFBQTtJQUVELElBQU0sU0FBUyxHQUF5QjtRQUNwQyxXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLFVBQVUsRUFBRSxtQkFBbUI7S0FDbEMsQ0FBQztJQUVGLE9BQU87U0FDRixNQUFNLENBQUMsY0FBYyxDQUFDO1NBQ3RCLFNBQVMsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFFOUMsQ0FBQzs7O0FDbE1EO0lBQUE7SUFlQSxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQWZZLDBDQUFlO0FBZTNCLENBQUM7OztBQ2ZGLHFEQUFvRDtBQUd6QyxRQUFBLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO0FBRXpEO0lBR0ksMEJBQW1CLE1BQXVCLEVBQVUsVUFBZ0M7UUFBaEMsZUFBVSxHQUFWLFVBQVUsQ0FBc0I7UUFDaEYsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVELHNCQUFXLG9DQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxtQ0FBSzthQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM5QixDQUFDO2FBRUQsVUFBaUIsS0FBYTtZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT0Qsc0JBQVcsc0NBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQWE7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLHNDQUFRO2FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUFvQixLQUFhO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPRCxzQkFBVyxtQ0FBSzthQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM5QixDQUFDO2FBRUQsVUFBaUIsS0FBaUI7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLG1DQUFLO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFpQixLQUFhO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPTSwrQkFBSSxHQUFYLFVBQVksS0FBYSxFQUFFLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxlQUFxQjtRQUNoRixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUVqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7UUFDekMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7UUFDekMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUM7UUFDRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLCtCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sMENBQWUsR0FBdkI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyw2QkFBcUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0F0RkEsQUFzRkMsSUFBQTtBQUVEO0lBQUE7UUFDWSxZQUFPLEdBQW9CLElBQUksaUNBQWUsRUFBRSxDQUFDO0lBNkY3RCxDQUFDO0lBMUZHLHNCQUFXLHFDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQWtCLEtBQXNCO1lBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksaUNBQWUsRUFBRSxDQUFDO1FBQ2xELENBQUM7OztPQUpBO0lBTUQsc0JBQVcsOENBQWU7YUFBMUI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFDeEMsQ0FBQzthQUVELFVBQTJCLEtBQWE7WUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsb0NBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLEtBQWE7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsdUNBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQWE7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsdUNBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQWE7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsb0NBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLEtBQWlCO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMvQixDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLG9DQUFLO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFpQixLQUFhO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMvQixDQUFDOzs7T0FKQTtJQU1NLCtCQUFHLEdBQVYsVUFBVyxLQUFhLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLGVBQXFCO1FBQy9FLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQztJQUNMLENBQUM7SUFFTSxpQ0FBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRU0sZ0NBQUksR0FBWCxVQUFZLFVBQWdDO1FBQ3hDLFVBQVUsQ0FBQztRQUVYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRW5FLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFTCx3QkFBQztBQUFELENBOUZBLEFBOEZDLElBQUE7QUFHRCxPQUFPO0tBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQztLQUN0QixRQUFRLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7Ozs7OztBQ2hNakQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0FBRW5FLDhCQUE0QjtBQUM1Qix1QkFBcUI7QUFFckIsd0NBQW1DOzs7OztBQ0xuQyw0REFBNkQ7QUFHN0QsbURBQTRFO0FBVTVFLElBQU0sZUFBZSxHQUFxQjtJQUN0QyxJQUFJLEVBQUUsV0FBVztJQUNqQixRQUFRLEVBQUUsZUFBZTtJQUN6QixJQUFJLEVBQUUsV0FBVztDQUNwQixDQUFBO0FBRUQ7SUFBQTtJQU9BLENBQUM7SUFBRCxxQkFBQztBQUFELENBUEEsQUFPQyxJQUFBO0FBRUQ7SUFRSSwyQkFDWSxVQUFnQyxFQUNoQyxPQUEwQixFQUNsQyxRQUE2QixFQUM3QixNQUFzQixFQUN0QixJQUFvQixFQUNwQixVQUEyQjtRQUUzQixVQUFVLENBQUM7UUFSZixpQkFvQkM7UUFuQlcsZUFBVSxHQUFWLFVBQVUsQ0FBc0I7UUFDaEMsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFVbEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFFaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFVBQUMsS0FBdUIsRUFBRSxNQUFxQjtZQUM5RixLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVNLG1DQUFPLEdBQWQ7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDakMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNqQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHNDQUFVLEdBQWpCO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDO0lBQ0wsQ0FBQztJQUVNLDRDQUFnQixHQUF2QixVQUF3QixLQUF1QixFQUFFLE1BQXFCO1FBQ2xFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFTSwwQ0FBYyxHQUFyQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxpQ0FBZ0IsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQ0FBbUIsQ0FBQyxDQUFDO1FBQ3BELENBQUM7SUFDTCxDQUFDO0lBRUwsd0JBQUM7QUFBRCxDQW5FQSxBQW1FQyxJQUFBO0FBRUQsSUFBTSxPQUFPLEdBQXlCO0lBQ2xDLFFBQVEsRUFBRSxlQUFlO0lBQ3pCLFdBQVcsRUFBRSxtQkFBbUI7SUFDaEMsVUFBVSxFQUFFLGlCQUFpQjtDQUNoQyxDQUFBO0FBRUQsT0FBTztLQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUM7S0FDcEIsU0FBUyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQzs7O0FDekd0QztJQUFBO0lBV0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYWSxzQ0FBYTtBQVd6QixDQUFDOzs7QUNYRixpREFBZ0Q7QUFHbkMsUUFBQSxtQkFBbUIsR0FBVyxtQkFBbUIsQ0FBQztBQUNsRCxRQUFBLG1CQUFtQixHQUFXLG1CQUFtQixDQUFDO0FBRS9EO0lBR0ksd0JBQW1CLE1BQXFCLEVBQVUsVUFBZ0M7UUFBaEMsZUFBVSxHQUFWLFVBQVUsQ0FBc0I7UUFDOUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVELHNCQUFXLGtDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFTywyQ0FBa0IsR0FBMUIsVUFBMkIsZUFBcUI7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7UUFDekMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUVNLGlDQUFRLEdBQWYsVUFBZ0IsZUFBcUI7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLGlDQUFRLEdBQWYsVUFBZ0IsSUFBWSxFQUFFLGVBQXFCO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0saUNBQVEsR0FBZixVQUFnQixlQUFxQjtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sa0NBQVMsR0FBaEIsVUFBaUIsUUFBZ0IsRUFBRSxlQUFxQjtRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLDZCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sd0NBQWUsR0FBdkI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQywyQkFBbUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0EzREEsQUEyREMsSUFBQTtBQUVEO0lBQUE7UUFDWSxZQUFPLEdBQWtCLElBQUksNkJBQWEsRUFBRSxDQUFDO0lBeUR6RCxDQUFDO0lBdERHLHNCQUFXLG1DQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQWtCLEtBQW9CO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksNkJBQWEsRUFBRSxDQUFDO1FBQ2hELENBQUM7OztPQUpBO0lBTU8sNENBQWtCLEdBQTFCLFVBQTJCLGVBQXFCO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQ3pDLElBQUk7WUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7UUFDekMsSUFBSTtZQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRU0saUNBQU8sR0FBZCxVQUFlLGVBQXFCO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLGlDQUFPLEdBQWQsVUFBZSxJQUFZLEVBQUUsZUFBcUI7UUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLGlDQUFPLEdBQWQsVUFBZSxlQUFxQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxrQ0FBUSxHQUFmLFVBQWdCLFFBQWdCLEVBQUUsZUFBcUI7UUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLCtCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSw4QkFBSSxHQUFYLFVBQVksVUFBZ0M7UUFDeEMsVUFBVSxDQUFDO1FBRVgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWpFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFTCxzQkFBQztBQUFELENBMURBLEFBMERDLElBQUE7QUFHRCxPQUFPO0tBQ0YsTUFBTSxDQUFDLFlBQVksQ0FBQztLQUNwQixRQUFRLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDOzs7Ozs7QUNsSTdDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUVyRiwyQkFBeUI7QUFDekIsNkJBQTJCO0FBQzNCLDRCQUEwQjtBQUMxQixxQkFBbUI7QUFHbkIscUNBQWdDO0FBRWhDLHNDQUFpQzs7Ozs7O0FDVmhDLDBDQUF3QztBQUN6Qyw4Q0FBNEM7QUFDNUMsK0JBQTZCO0FBQzdCLHVCQUFxQjtBQUNyQixxQkFBbUI7QUFDbkIsb0JBQWtCO0FBQ2xCLG9CQUFrQjtBQUNsQix3QkFBc0I7QUFDdEIscUJBQW1CO0FBQ25CLG9CQUFrQjtBQUNsQixrQkFBZ0I7QUFDaEIsa0JBQWdCO0FBQ2hCLCtCQUE2QjtBQUU3QixPQUFPO0tBQ0YsTUFBTSxDQUFDLFFBQVEsRUFBRTtJQUNkLGVBQWU7SUFDZixhQUFhO0lBQ2IsU0FBUztJQUNULFdBQVc7SUFDWCxjQUFjO0lBQ2QsWUFBWTtJQUNaLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osY0FBYztDQUNqQixDQUFDO0tBQ0QsUUFBUSxDQUFDLGFBQWEsRUFBRTtJQUNyQixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLG1CQUFtQixFQUFFLFdBQVc7SUFDaEMscUJBQXFCLEVBQUUsR0FBRztJQUMxQixzQkFBc0IsRUFBRSxHQUFHO0lBQzNCLHFCQUFxQixFQUFFLEVBQUU7SUFDekIsNEJBQTRCLEVBQUUsR0FBRztDQUNwQyxDQUFDLENBQUE7QUFFTiwrQkFBMEI7QUFDMUIsOEJBQXlCO0FBQ3pCLGtDQUE2QjtBQUU3QiwrQkFBMEI7QUFDMUIsNEJBQXVCO0FBRXZCLDhCQUF5Qjs7QUM3Q3pCLENBQUM7SUFDRztRQUtJLDJDQUNJLFFBQTZCLEVBQzdCLFNBQW1DLEVBQ25DLFVBQWdDO1lBRWhDLFVBQVUsQ0FBQztZQVJSLGNBQVMsR0FBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuQyxVQUFLLEdBQVcsSUFBSSxDQUFDO1lBU3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBbUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7WUFHdkgsUUFBUSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRXpDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWxDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRCxzQkFBVyx1REFBUTtpQkFBbkI7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzdELENBQUM7OztXQUFBO1FBRU0sd0RBQVksR0FBbkIsVUFBb0IsU0FBbUI7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUVNLDJEQUFlLEdBQXRCLFVBQXVCLFFBQWdCO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBRXRCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFMUMsQ0FBQztRQUNMLENBQUM7UUFFTCx3Q0FBQztJQUFELENBdkNBLEFBdUNDLElBQUE7SUFTRCxJQUFNLHNCQUFzQixHQUE0QjtRQUNwRCxTQUFTLEVBQUUsWUFBWTtRQUN2QixLQUFLLEVBQUUsU0FBUztLQUNuQixDQUFBO0lBRUQsSUFBTSx1QkFBdUIsR0FBeUI7UUFDbEQsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFVBQVUsRUFBRSxpQ0FBaUM7S0FDaEQsQ0FBQTtJQUVELE9BQU87U0FDRixNQUFNLENBQUMsbUJBQW1CLEVBQUU7UUFDekIsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQjtLQUN2RCxDQUFDO1NBQ0QsU0FBUyxDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixDQUFDLENBQUM7QUFFakUsQ0FBQzs7O0FDN0RELENBQUM7SUFDRztRQWFJLDJCQUNZLE1BQXNCLEVBQ3RCLE9BQTBCLEVBQzFCLFNBQThCLEVBQzlCLFVBQWdDLEVBQ2hDLFFBQTRCLEVBQzVCLFVBQTJCLEVBQzNCLFVBQTJCLEVBRW5DLFFBQTZCLEVBQzdCLFNBQW1DLEVBQ25DLFdBQWdCO1lBR2hCLFVBQVUsQ0FBQztZQWRmLGlCQStDQztZQTlDVyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtZQUN0QixZQUFPLEdBQVAsT0FBTyxDQUFtQjtZQUMxQixjQUFTLEdBQVQsU0FBUyxDQUFxQjtZQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFzQjtZQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFvQjtZQUM1QixlQUFVLEdBQVYsVUFBVSxDQUFpQjtZQUMzQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtZQVNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQTZCLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBRWpHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxXQUFXLENBQUMsMEJBQTBCO2dCQUM1RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXpELFFBQVEsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUV6QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFcEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXRCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7WUFFL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVqRCxJQUFJLHFCQUFxQixHQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFVBQUMsTUFBd0IsRUFBRSxNQUFxQjtnQkFDM0gsS0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLDBCQUEwQixHQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLFVBQUMsTUFBd0IsRUFBRSxLQUFtQjtnQkFDbkksS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLHFCQUFxQixFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakQsMEJBQTBCLEVBQUUsQ0FBQztnQkFDakMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUVPLDBDQUFjLEdBQXRCO1lBQ0ksSUFBSSxTQUFrQixDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUMzQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssT0FBTyxDQUFDO1lBQzNGLENBQUM7WUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUNqQyxDQUFDO1FBRU0sb0NBQVEsR0FBZjtZQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFBO1lBQUMsQ0FBQztZQUVqQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUUvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDN0QsQ0FBQztZQUNELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRU0sb0NBQVEsR0FBZixVQUFnQixJQUFpQjtZQUM3QixNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFTSwwQ0FBYyxHQUFyQixVQUFzQixjQUE2QjtZQUFuRCxpQkFTQztZQVJHLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztZQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFDLElBQWlCO2dCQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFTywyQ0FBZSxHQUF2QixVQUF3QixNQUF3QixFQUFFLE1BQXFCO1lBQ25FLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEMsQ0FBQztRQUVPLDBDQUFjLEdBQXRCLFVBQXVCLEtBQXVCLEVBQUUsS0FBbUI7WUFFL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBRW5CLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO1lBRTNDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUM7UUFFTSxvQ0FBUSxHQUFmLFVBQWdCLElBQWlCO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUVuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQztZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVNLHFDQUFTLEdBQWhCLFVBQWlCLEtBQXVCLEVBQUUsSUFBaUI7WUFBM0QsaUJBb0RDO1lBbkRHLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUV4QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFeEIsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUV4QixNQUFNLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMzQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBRTVCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDeEIsTUFBTSxDQUFDO2dCQUNYLENBQUM7Z0JBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDVixLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pDLENBQUMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFFNUIsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUV4QixNQUFNLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBRTVCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakQsQ0FBQztZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FqTUEsQUFpTUMsSUFBQTtJQVFELElBQU0sZUFBZSxHQUFxQjtRQUN0QyxRQUFRLEVBQUUsZUFBZTtRQUN6QixTQUFTLEVBQUUsZ0JBQWdCO0tBQzlCLENBQUM7SUFFRjtRQUNJLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLGVBQWU7WUFDdEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLFVBQVUsRUFBRSxpQkFBaUI7WUFDN0IsWUFBWSxFQUFFLE9BQU87U0FDeEIsQ0FBQztJQUNOLENBQUM7SUFFRCxPQUFPO1NBQ0YsTUFBTSxDQUFDLFlBQVksQ0FBQztTQUNwQixTQUFTLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFFbkQsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7O0FDaE9RLFFBQUEsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFFdkQ7SUFJSSx3QkFDSSxNQUFxQixFQUNyQixVQUFnQztRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsc0JBQVcsb0NBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQXVCO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT0Qsc0JBQVcsdUNBQVc7YUFBdEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDcEMsQ0FBQzthQWVELFVBQXVCLEtBQWE7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FsQkE7SUFFTSx5Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBWSxFQUFFLEtBQWE7UUFDL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFL0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFVBQUMsQ0FBQztnQkFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztvQkFDZixDQUFDLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFPTSxvQ0FBVyxHQUFsQixVQUFtQixJQUFZLEVBQUUsS0FBYTtRQUMxQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUUvQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQUMsQ0FBQztZQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsVUFBQyxDQUFDO2dCQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO29CQUNmLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLG9DQUFXLEdBQWxCO1FBQ0ksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFVBQUMsQ0FBQztnQkFDZCxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyx3Q0FBZSxHQUF2QjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLDJCQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQXJFQSxBQXFFQyxJQUFBO0FBRUQ7SUFBQTtRQUNZLFlBQU8sR0FBa0I7WUFDN0IsUUFBUSxFQUFFLEVBQUU7WUFDWixXQUFXLEVBQUUsY0FBYztTQUM5QixDQUFDO0lBMkJOLENBQUM7SUF4Qkcsc0JBQVcscUNBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQXVCO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDeEMsQ0FBQzs7O09BSkE7SUFNRCxzQkFBVyx3Q0FBVzthQUF0QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUNwQyxDQUFDO2FBRUQsVUFBdUIsS0FBYTtZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDckMsQ0FBQzs7O09BSkE7SUFNTSw4QkFBSSxHQUFYLFVBQVksVUFBVTtRQUNsQixVQUFVLENBQUM7UUFFWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFakUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0EvQkEsQUErQkMsSUFBQTtBQUVELE9BQU87S0FDRixNQUFNLENBQUMsWUFBWSxDQUFDO0tBQ3BCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7OztBQy9HN0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0FBRXJGLDRCQUEwQjtBQUMxQixxQkFBbUI7Ozs7O0FDRG5CLGlEQUE4RztBQUU5RztJQU9JLDZCQUNZLFFBQTZCLEVBQzdCLFVBQWdDLEVBQ3hDLFNBQXlCO1FBRXpCLFVBQVUsQ0FBQztRQUxmLGlCQWVDO1FBZFcsYUFBUSxHQUFSLFFBQVEsQ0FBcUI7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBc0I7UUFMckMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixXQUFNLEdBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFVOUIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLGtDQUFrQixFQUFFLFVBQUMsS0FBdUIsRUFBRSxNQUFvQjtZQUM1RixLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx3Q0FBVSxHQUFqQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQztJQUNMLENBQUM7SUFFTyx5Q0FBVyxHQUFuQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUV6RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzVELENBQUM7SUFDTCxDQUFDO0lBRU8sNkNBQWUsR0FBdkIsVUFBd0IsS0FBdUIsRUFBRSxNQUFvQjtRQUNqRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyx1Q0FBUyxHQUFqQjtRQUNJLFVBQVUsQ0FBQztZQUNQLElBQUksT0FBTyxHQUFXLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVNLG9DQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxxQ0FBTyxHQUFkO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsb0NBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQztJQUNMLENBQUM7SUFFTSxtQ0FBSyxHQUFaO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDO0lBQ0wsQ0FBQztJQUVNLHVDQUFTLEdBQWhCLFVBQWlCLEtBQW9CO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDO0lBQ0wsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FsR0EsQUFrR0MsSUFBQTtBQUVELElBQU0sU0FBUyxHQUF5QjtJQUNwQyxXQUFXLEVBQUUsdUJBQXVCO0lBQ3BDLFVBQVUsRUFBRSxtQkFBbUI7Q0FDbEMsQ0FBQTtBQUVELE9BQU87S0FDRixNQUFNLENBQUMsY0FBYyxDQUFDO0tBQ3RCLFNBQVMsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7OztBQy9HMUM7SUFBQTtJQVdBLENBQUM7SUFBRCxtQkFBQztBQUFELENBWEEsQUFXQyxJQUFBO0FBWFksb0NBQVk7OztBQ0F6QiwrQ0FBOEM7QUFHakMsUUFBQSxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQ2xDLFFBQUEsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDcEMsUUFBQSxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztBQUN4QyxRQUFBLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBRXpEO0lBR0ksdUJBQ0ksTUFBb0IsRUFDWixVQUFnQztRQUY1QyxpQkFRQztRQU5XLGVBQVUsR0FBVixVQUFVLENBQXNCO1FBRXhDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRXRCLFVBQVUsQ0FBQyxHQUFHLENBQUMsdUJBQWUsRUFBRSxjQUFRLEtBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxVQUFVLENBQUMsR0FBRyxDQUFDLHdCQUFnQixFQUFFLGNBQVEsS0FBSSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxzQkFBVyxpQ0FBTTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsbUNBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQWE7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLGlDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQy9CLENBQUM7YUFFRCxVQUFrQixLQUFVO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPRCxzQkFBVyxrQ0FBTzthQUFsQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxDQUFDO2FBRUQsVUFBbUIsS0FBZTtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT0Qsc0JBQVcsbUNBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQWlDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPTSwyQkFBRyxHQUFWLFVBQVcsUUFBb0MsRUFBRSxRQUFpQixFQUFFLE1BQVksRUFBRSxPQUFrQjtRQUNoRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSw2QkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSw0QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sNkJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLDhCQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sdUNBQWUsR0FBdkI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQywwQkFBa0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0F0RkEsQUFzRkMsSUFBQTtBQUVEO0lBQUE7UUFDWSxZQUFPLEdBQWlCLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQzNDLGFBQVEsR0FBa0IsSUFBSSxDQUFDO0lBVTNDLENBQUM7SUFSVSw2QkFBSSxHQUFYLFVBQVksVUFBZ0M7UUFDeEMsVUFBVSxDQUFDO1FBRVgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDTCxxQkFBQztBQUFELENBWkEsQUFZQyxJQUFBO0FBR0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7S0FDekIsUUFBUSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQzs7O0FDaEgzQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFFdkYsMEJBQXdCO0FBQ3hCLDRCQUEwQjtBQUMxQiwyQkFBeUI7QUFDekIsdUJBQXFCOzs7QUNKckIsK0NBQW9HO0FBRXBHO0lBa0JJLDJCQUNZLFFBQTZCLEVBQ3JDLE1BQXNCLEVBQ3RCLFNBQW1DLEVBQzNCLE1BQXNCLEVBQ3RCLFVBQWdDLEVBQ2hDLFFBQTRCLEVBQzVCLFVBQTJCLEVBQ25DLFdBQWdCO1FBR2hCLFVBQVUsQ0FBQztRQVhmLGlCQTJEQztRQTFEVyxhQUFRLEdBQVIsUUFBUSxDQUFxQjtRQUc3QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFzQjtRQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUM1QixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQU1uQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQThCLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRXpHLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixDQUFDO1FBQ3BELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLG1CQUFtQixDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixDQUFDO1FBQ3JELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLG1CQUFtQixDQUFDO1FBQ25ELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxXQUFXLENBQUMsMEJBQTBCLENBQUM7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGlDQUFrQixFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUcvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7WUFDM0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRVIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQVEsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO2dCQUM1RCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxNQUF3QixFQUFFLEtBQXdCO2dCQUNqSCxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzNDLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ3hELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztnQkFDRCxLQUFJLENBQUMsUUFBUSxDQUFDLGdDQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLENBQUM7UUFFRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUU7WUFDcEUsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFVBQUMsTUFBd0IsRUFBRSxNQUFxQjtZQUNsSCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVNLHNDQUFVLEdBQWpCO1FBQ0ksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDbkMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFFTywwQ0FBYyxHQUF0QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkUsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3BELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDRDQUFnQixHQUF4QixVQUF5QixNQUF3QixFQUFFLE1BQXFCO1FBQ3BFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDTCxDQUFDO0lBRU8sMENBQWMsR0FBdEI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTywwQ0FBYyxHQUF0QixVQUF1QixNQUF3QixFQUFFLFNBQTRCO1FBQ3pFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUNMLENBQUM7SUFFTyw0Q0FBZ0IsR0FBeEI7UUFBQSxpQkEwQkM7UUF6QkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUE7UUFBQyxDQUFDO1FBRWhGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBUSxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUUxRSxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1RCxJQUFJLFlBQVksR0FBVyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqRSxJQUFJLFlBQVksR0FBVyxZQUFZLEdBQUcsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFL0QsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLGdDQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsZ0NBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQ0FBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQ0FBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sb0NBQVEsR0FBaEIsVUFBaUIsU0FBNEI7UUFBN0MsaUJBdUNDO1FBdENHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFbkUsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLGdDQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLGdDQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLGdDQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLGdDQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFJeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUcxQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7UUFDM0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBR1AsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUVoQyxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQTVMQSxBQTRMQyxJQUFBO0FBUUQsSUFBTSxlQUFlLEdBQXFCO0lBQ3RDLFlBQVksRUFBRSxJQUFJO0NBQ3JCLENBQUM7QUFFRixDQUFDO0lBRUcsSUFBTSxPQUFPLEdBQXlCO1FBQ2xDLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSxzQkFBc0I7UUFDbkMsVUFBVSxFQUFFLGlCQUFpQjtLQUNoQyxDQUFDO0lBRUYsT0FBTztTQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDcEIsU0FBUyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUUxQyxDQUFDLENBQUMsRUFBRSxDQUFDOztBQ3hOTCxDQUFDO0lBT0csSUFBTSxxQkFBbUIsR0FBeUI7UUFDOUMsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQTtJQUVEO1FBS0ksaUNBQ1ksTUFBaUIsRUFDekIsUUFBZ0MsRUFDaEMsTUFBc0IsRUFDdEIsVUFBZ0MsRUFDaEMsVUFBVTtZQUxkLGlCQWdCQztZQWZXLFdBQU0sR0FBTixNQUFNLENBQVc7WUFKckIsY0FBUyxHQUFXLElBQUksQ0FBQztZQVU3QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0RCxDQUFDO1lBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDOUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLEtBQUssRUFBRSxNQUFNLElBQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JHLENBQUM7UUFFTyxrREFBZ0IsR0FBeEIsVUFBeUIsS0FBSyxFQUFFLE1BQU07WUFDbEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDL0IsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksT0FBTyxHQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRWxHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUN6QyxDQUFDO1FBQ0wsOEJBQUM7SUFBRCxDQS9CQSxBQStCQyxJQUFBO0lBRUQsOEJBQThCLGFBQWE7UUFDdkMsVUFBVSxDQUFDO1FBQ1gsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVCLE1BQU0sQ0FBQztZQUNILFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixLQUFLLEVBQUUscUJBQW1CO1lBQzFCLElBQUksRUFBRSxzQkFDRixNQUFpQixFQUNqQixRQUFnQyxFQUNoQyxNQUFzQjtnQkFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLGNBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDRCxVQUFVLEVBQUUsdUJBQXFCO1NBQ3BDLENBQUM7SUFDTixDQUFDO0lBRUQsT0FBTztTQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDcEIsU0FBUyxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDLENBQUM7QUFFM0QsQ0FBQzs7O0FDckVELCtDQUE2RDtBQUdoRCxRQUFBLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0FBQzFDLFFBQUEsd0JBQXdCLEdBQUcsd0JBQXdCLENBQUM7QUFDcEQsUUFBQSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUNwQyxRQUFBLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0FBRW5EO0lBSUksd0JBQ0ksTUFBcUIsRUFDYixVQUFnQyxFQUNoQyxVQUF1QztRQUR2QyxlQUFVLEdBQVYsVUFBVSxDQUFzQjtRQUNoQyxlQUFVLEdBQVYsVUFBVSxDQUE2QjtRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRUQsc0JBQVcsa0NBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG1DQUFPO2FBQWxCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsaUNBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLEtBQVU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPRCxzQkFBVyxpQ0FBSzthQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7YUFFRCxVQUFpQixLQUFVO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxnQ0FBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRSxDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLGdDQUFJO2FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDN0IsQ0FBQzthQUVELFVBQWdCLEtBQWE7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsb0NBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQWM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLENBQUM7OztPQUpBO0lBTU0sNkJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRU0sOEJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRU0sK0JBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRU0sNkJBQUksR0FBWDtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUM1QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFTSw2QkFBSSxHQUFYO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFTSxpQ0FBUSxHQUFmO1FBQUEsaUJBS0M7UUFMZSxpQkFBb0I7YUFBcEIsVUFBb0IsRUFBcEIscUJBQW9CLEVBQXBCLElBQW9CO1lBQXBCLDRCQUFvQjs7UUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO1lBQ2QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxvQ0FBVyxHQUFsQjtRQUFBLGlCQUtDO1FBTGtCLGlCQUFvQjthQUFwQixVQUFvQixFQUFwQixxQkFBb0IsRUFBcEIsSUFBb0I7WUFBcEIsNEJBQW9COztRQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7WUFDZCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQUMsRUFBRSxJQUFLLE9BQUEsRUFBRSxJQUFJLENBQUMsRUFBUCxDQUFPLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sNkJBQUksR0FBWCxVQUFZLElBQVksRUFBRSxLQUFVO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHdDQUFlLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsMkJBQW1CLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFDTCxxQkFBQztBQUFELENBckdBLEFBcUdDLElBQUE7QUFFRDtJQUFBO1FBQ1ksWUFBTyxHQUFrQjtZQUM3QixLQUFLLEVBQUUsRUFBRTtZQUNULE9BQU8sRUFBRSxFQUFFO1lBQ1gsSUFBSSxFQUFFLE9BQU87WUFDYixRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQztJQTRFTixDQUFDO0lBeEVHLHNCQUFXLHFDQUFRO2FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUFvQixLQUFjO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLG1DQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQWtCLEtBQW9CO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksNEJBQWEsRUFBRSxDQUFDO1FBQ2hELENBQUM7OztPQUpBO0lBTUQsc0JBQVcsa0NBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLEtBQVU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLGlDQUFJO2FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDN0IsQ0FBQzthQUVELFVBQWdCLEtBQWE7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsb0NBQU87YUFBbEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDaEMsQ0FBQzthQUVELFVBQW1CLEtBQWM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsb0NBQU87YUFBbEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDaEMsQ0FBQzthQUVELFVBQW1CLEtBQWU7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxDQUFDOzs7T0FKQTtJQU1NLGtDQUFRLEdBQWY7UUFBQSxpQkFJQztRQUplLGlCQUFvQjthQUFwQixVQUFvQixFQUFwQixxQkFBb0IsRUFBcEIsSUFBb0I7WUFBcEIsNEJBQW9COztRQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7WUFDZCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0scUNBQVcsR0FBbEI7UUFBQSxpQkFJQztRQUprQixpQkFBb0I7YUFBcEIsVUFBb0IsRUFBcEIscUJBQW9CLEVBQXBCLElBQW9CO1lBQXBCLDRCQUFvQjs7UUFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO1lBQ2QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFDLEVBQUUsSUFBSyxPQUFBLEVBQUUsSUFBSSxDQUFDLEVBQVAsQ0FBTyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sOEJBQUksR0FBWCxVQUFZLElBQVksRUFBRSxLQUFVO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUNyQyxDQUFDO0lBRU0sOEJBQUksR0FBWCxVQUFZLFVBQWdDLEVBQUUsVUFBdUM7UUFDakYsVUFBVSxDQUFDO1FBRVgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUU3RSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQXBGQSxBQW9GQyxJQUFBO0FBRUQsMkJBQTJCLFVBQWdDLEVBQUUsVUFBMkI7SUFDcEYsVUFBVSxDQUFDLEdBQUcsQ0FBQyx3QkFBZ0IsRUFBRSxjQUFRLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELFVBQVUsQ0FBQyxHQUFHLENBQUMseUJBQWlCLEVBQUUsY0FBUSxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBRUQsT0FBTztLQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUM7S0FDcEIsUUFBUSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUM7S0FDdkMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7OztBQzdNNUI7SUFBQTtJQUtBLENBQUM7SUFBRCx3QkFBQztBQUFELENBTEEsQUFLQztBQUpVLHdCQUFNLEdBQVcsUUFBUSxDQUFDO0FBQzFCLHVCQUFLLEdBQVcsT0FBTyxDQUFDO0FBQ3hCLHVCQUFLLEdBQVcsT0FBTyxDQUFDO0FBQ3hCLHdCQUFNLEdBQVcsUUFBUSxDQUFDO0FBSnhCLDhDQUFpQjtBQU85QjtJQUFBO0lBZ0JBLENBQUM7SUFBRCxtQkFBQztBQUFELENBaEJBLEFBZ0JDLElBQUE7QUFoQlksb0NBQVk7QUFrQnpCO0lBQUE7UUFDSSxXQUFNLEdBQWlCO1lBQ25CLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxNQUFNO1lBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsVUFBVSxFQUFFLElBQUk7WUFDaEIsWUFBWSxFQUFFLEtBQUs7WUFDbkIsY0FBYyxFQUFFLEtBQUs7WUFDckIsVUFBVSxFQUFFLElBQUk7WUFDaEIsTUFBTSxFQUFFLElBQUk7WUFDWixnQkFBZ0IsRUFBRSxLQUFLO1NBQzFCLENBQUM7UUFDRixVQUFLLEdBQWlCO1lBQ2xCLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxLQUFLO1lBQzNCLFFBQVEsRUFBRSwyQ0FBMkM7WUFDckQsVUFBVSxFQUFFLEtBQUs7WUFDakIsWUFBWSxFQUFFLElBQUk7WUFDbEIsY0FBYyxFQUFFLEtBQUs7WUFDckIsVUFBVSxFQUFFLEtBQUs7WUFDakIsTUFBTSxFQUFFLEtBQUs7WUFDYixnQkFBZ0IsRUFBRSxJQUFJO1NBQ3pCLENBQUM7UUFDRixVQUFLLEdBQWlCO1lBQ2xCLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxLQUFLO1lBQzNCLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsVUFBVSxFQUFFLEtBQUs7WUFDakIsWUFBWSxFQUFFLElBQUk7WUFDbEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsTUFBTSxFQUFFLElBQUk7WUFDWixnQkFBZ0IsRUFBRSxJQUFJO1NBQ3pCLENBQUM7UUFDRixXQUFNLEdBQWlCO1lBQ25CLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxNQUFNO1lBQzVCLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsVUFBVSxFQUFFLEtBQUs7WUFDakIsWUFBWSxFQUFFLElBQUk7WUFDbEIsY0FBYyxFQUFFLEtBQUs7WUFDckIsVUFBVSxFQUFFLElBQUk7WUFDaEIsTUFBTSxFQUFFLElBQUk7WUFDWixnQkFBZ0IsRUFBRSxLQUFLO1NBQzFCLENBQUM7SUFDTixDQUFDO0lBQUQseUJBQUM7QUFBRCxDQXpDQSxBQXlDQyxJQUFBO0FBekNZLGdEQUFrQjtBQTJDL0I7SUFBQTtRQUtJLGFBQVEsR0FBWSxJQUFJLENBQUM7SUFFN0IsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSxzQ0FBYTs7Ozs7O0FDcEUxQixPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFFakUsMEJBQXdCO0FBQ3hCLDRCQUEwQjtBQUMxQix5QkFBdUI7QUFDdkIscUJBQW1CO0FBRW5CLHNDQUFpQzs7O0FDTmpDO0lBQUE7SUFLQSxDQUFDO0lBQUQsYUFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTFksd0JBQU07QUFPbkIsQ0FBQztJQWNHLElBQU0sWUFBWSxHQUFrQjtRQUNoQyxVQUFVLEVBQUUsSUFBSTtRQUNoQixJQUFJLEVBQUUsVUFBVTtRQUNoQixRQUFRLEVBQUUsY0FBYztRQUN4QixjQUFjLEVBQUUsZ0JBQWdCO1FBQ2hDLFdBQVcsRUFBRSxrQkFBa0I7UUFDL0IsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLFVBQVUsRUFBRSxjQUFjO0tBQzdCLENBQUE7SUFFRDtRQUFBO1FBV0EsQ0FBQztRQUFELGtCQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFFRDtRQW1CSSxpQ0FDWSxRQUE2QixFQUM3QixTQUFtQyxFQUNuQyxVQUFnQyxFQUNoQyxRQUE0QixFQUM1QixXQUFnQixFQUN4QixRQUFpQztZQUVqQyxVQUFVLENBQUM7WUFQSCxhQUFRLEdBQVIsUUFBUSxDQUFxQjtZQUM3QixjQUFTLEdBQVQsU0FBUyxDQUEwQjtZQUNuQyxlQUFVLEdBQVYsVUFBVSxDQUFzQjtZQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFvQjtZQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQUt4QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBOEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBRXRILEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7WUFFdkQsQ0FBQztRQUNMLENBQUM7UUFFTywwQ0FBUSxHQUFoQjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQTZCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNsSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsQ0FBQztZQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztRQUN0RixDQUFDO1FBRU8sOENBQVksR0FBcEI7WUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFtQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDcEksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3pFLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDeEUsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRU0sNENBQVUsR0FBakI7WUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDN0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0wsQ0FBQztRQUFBLENBQUM7UUFFSyw2Q0FBVyxHQUFsQixVQUFtQixLQUFhO1lBQzVCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFBQSxDQUFDO1FBRUssMENBQVEsR0FBZixVQUFnQixLQUFhO1lBQTdCLGlCQVVDO1lBVEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNsRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDO1lBQ0wsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRVYsQ0FBQztRQUFBLENBQUM7UUFFSyw0Q0FBVSxHQUFqQjtZQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNqQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDTCxDQUFDO1FBQUEsQ0FBQztRQUVLLHNDQUFJLEdBQVg7WUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQztRQUFBLENBQUM7UUFFSywyQ0FBUyxHQUFoQixVQUFpQixLQUFVO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3pCLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkMsTUFBTSxDQUFDLEtBQUssSUFBSSxHQUFHLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQztRQUMzQyxDQUFDO1FBRU0sNENBQVUsR0FBakIsVUFBa0IsT0FBb0I7WUFBdEMsaUJBc0RDO1lBcERHLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7Z0JBRXZELENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQTtZQUM1SCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDekIsQ0FBQztZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQztnQkFDekQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQzt3QkFDVixJQUFJLENBQUMsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUM3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDWixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNoRSxDQUFDO3dCQUNELENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFOzRCQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBQzVELEtBQUksQ0FBQyxRQUFRLENBQUM7Z0NBQ1YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDaEUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNYLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDYixDQUFDO1lBQ0wsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDYixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQztZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDakQsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhO2lCQUN6QixDQUFDLENBQUMsQ0FBQztnQkFDSixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDdEcsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3RHLENBQUM7UUFDTCxDQUFDO1FBRUwsOEJBQUM7SUFBRCxDQXBLQSxBQW9LQyxJQUFBO0lBRUQsSUFBTSxJQUFJLEdBQXlCO1FBQy9CLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7UUFDN0IsVUFBVSxFQUFFLHVCQUF1QjtLQUN0QyxDQUFBO0lBRUQsT0FBTztTQUNGLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3ZDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEMsQ0FBQzs7QUM3TkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBBY3Rpb25zQ29uZmlnIH0gZnJvbSAnLi9JQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3Rpb25JdGVtIH0gZnJvbSAnLi9JQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3Rpb25zQ2hhbmdlZEV2ZW50IH0gZnJvbSAnLi9JQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWNvbmRhcnlBY3Rpb25zT3BlbkV2ZW50IH0gZnJvbSAnLi9JQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQWN0aW9uc1NlcnZpY2UgfSBmcm9tICcuL0lBY3Rpb25zU2VydmljZSc7XHJcbmltcG9ydCB7IElBY3Rpb25zUHJvdmlkZXIgfSBmcm9tICcuL0lBY3Rpb25zU2VydmljZSc7XHJcblxyXG5cclxuY2xhc3MgQWN0aW9uc1NlcnZpY2UgaW1wbGVtZW50cyBJQWN0aW9uc1NlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBY3Rpb25zQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBBY3Rpb25zQ29uZmlnLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBY3Rpb25zQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByaW1hcnlMb2NhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY29uZGFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwcmltYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSwgc2Vjb25kYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gcHJpbWFyeUFjdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9IHNlY29uZGFyeUFjdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDb3VudChhY3Rpb246IHN0cmluZywgY291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChhY3Rpb24gPT0gbnVsbCB8fCAhXy5pc051bWJlcihjb3VudCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGEubmFtZSA9PSBhY3Rpb24pXHJcbiAgICAgICAgICAgICAgICBhLmNvdW50ID0gY291bnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYS5uYW1lID09IGFjdGlvbilcclxuICAgICAgICAgICAgICAgIGEuY291bnQgPSBjb3VudDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJDb3VudHMoKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgYS5jb3VudCA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBhLmNvdW50ID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDaGFuZ2VFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoQWN0aW9uc0NoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3Blbk1lbnVFdmVudCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoU2Vjb25kYXJ5QWN0aW9uc09wZW5FdmVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEFjdGlvbnNQcm92aWRlciBpbXBsZW1lbnRzIElBY3Rpb25zUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBY3Rpb25zQ29uZmlnID0gbmV3IEFjdGlvbnNDb25maWcoKTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFjdGlvbnNTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IEFjdGlvbnNDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb25maWcodmFsdWU6IEFjdGlvbnNDb25maWcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB2YWx1ZSB8fCBuZXcgQWN0aW9uc0NvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlY29uZGFyeUdsb2JhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwcmltYXJ5TG9jYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJpbWFyeUxvY2FsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY29uZGFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBBY3Rpb25zU2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBY3Rpb25zJylcclxuICAgIC5wcm92aWRlcigncGlwQWN0aW9ucycsIEFjdGlvbnNQcm92aWRlcik7XHJcblxyXG4iLCJleHBvcnQgY29uc3QgQWN0aW9uc0NoYW5nZWRFdmVudDogc3RyaW5nID0gJ3BpcEFjdGlvbnNDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IFNlY29uZGFyeUFjdGlvbnNPcGVuRXZlbnQ6IHN0cmluZyA9ICdwaXBTZWNvbmRhcnlBY3Rpb25zT3Blbic7XHJcblxyXG5leHBvcnQgY2xhc3MgU2ltcGxlQWN0aW9uSXRlbSB7XHJcbiAgICAvLyBOYW1lIHRvIHJlZmVyIHRvIHRoZSBpdGVtXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgLy8gTGluayB2aXNpYmxlIHRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU/OiBzdHJpbmc7XHJcbiAgICAvLyBTaG93IGRpdmlkZXIgaW5zdGVhZCBvZiB0aXRsZVxyXG4gICAgcHVibGljIGRpdmlkZXI/OiBib29sZWFuO1xyXG4gICAgLy8gSWNvbiBuYW1lIGZyb20gJGljb25Qcm92aWRlclxyXG4gICAgcHVibGljIGljb24/OiBzdHJpbmc7XHJcbiAgICAvLyBDb3VudGVyIGJhZGdlXHJcbiAgICBwdWJsaWMgY291bnQ/OiBudW1iZXI7XHJcbiAgICAvLyBBY2Nlc3MgZnVuY3Rpb25cclxuICAgIHB1YmxpYyBhY2Nlc3M/OiAoYWN0aW9uOiBTaW1wbGVBY3Rpb25JdGVtKSA9PiBib29sZWFuO1xyXG4gICAgLy8gU2hvdyBvbiBzcGVjaWZpZWQgYnJlYWtwb2ludHNcclxuICAgIHB1YmxpYyBicmVha3BvaW50cz86IHN0cmluZ1tdO1xyXG4gICAgLy8gd2luZG93LmxvY2F0aW9uLmhyZWZcclxuICAgIHB1YmxpYyBocmVmPzogc3RyaW5nO1xyXG4gICAgLy8gJGxvY2F0aW9uLnVybFxyXG4gICAgcHVibGljIHVybD86IHN0cmluZztcclxuICAgIC8vICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMpXHJcbiAgICBwdWJsaWMgc3RhdGU/OiBzdHJpbmc7XHJcbiAgICAvLyBQYXJhbWV0ZXJzIGZvciAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zKVxyXG4gICAgcHVibGljIHN0YXRlUGFyYW1zPzogYW55O1xyXG4gICAgLy8gJHJvb3RTY29wZS5icm9hZGNhc3QoZXZlbnQpXHJcbiAgICBwdWJsaWMgZXZlbnQ/OiBzdHJpbmc7XHJcbiAgICAvLyBDbGljayBjYWxsYmFja1xyXG4gICAgcHVibGljIGNsaWNrPzogKGFjdGlvbjogU2ltcGxlQWN0aW9uSXRlbSkgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGlvbkl0ZW0gZXh0ZW5kcyBTaW1wbGVBY3Rpb25JdGVtIHtcclxuICAgIHB1YmxpYyBzdWJBY3Rpb25zOiBTaW1wbGVBY3Rpb25JdGVtW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25zQ29uZmlnIHtcclxuICAgIC8vIFByaW1hcnkgZ2xvYmFsIGFjdGlvbnMgdmlzaWJsZSBvbiB0aGUgc2NyZWVuXHJcbiAgICBwdWJsaWMgcHJpbWFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXSA9IFtdO1xyXG4gICAgLy8gUHJpbWFyeSBsb2NhbCBhY3Rpb25zIHZpc2libGUgb24gdGhlIHNjcmVlblxyXG4gICAgcHVibGljIHByaW1hcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXSA9IFtdO1xyXG5cclxuICAgIC8vIFNlY29uZGFyeSBnbG9iYWwgYWN0aW9ucyBhdmFpbGFibGUgaW4gcG9wdXBcclxuICAgIHB1YmxpYyBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW10gPSBbXTtcclxuICAgIC8vIFNlY29uZGFyeSBsb2NhbCBhY3Rpb25zIGF2YWlsYWJsZSBpbiBwb3B1cFxyXG4gICAgcHVibGljIHNlY29uZGFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdPSBbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uc1NlcnZpY2Uge1xyXG4gICAgcmVhZG9ubHkgY29uZmlnOiBBY3Rpb25zQ29uZmlnO1xyXG5cclxuICAgIHByaW1hcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBwcmltYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBzZWNvbmRhcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTsgICAgXHJcblxyXG4gICAgc2hvdyhwcmltYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSwgc2Vjb25kYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSk6IHZvaWQ7XHJcbiAgICBoaWRlKCk6IHZvaWQ7XHJcbiAgICB1cGRhdGVDb3VudChsaW5rOiBzdHJpbmcsIGNvdW50OiBudW1iZXIpOiB2b2lkOyBcclxuICAgIGNsZWFyQ291bnRzKCk6IHZvaWQ7XHJcbiAgICBvcGVuTWVudUV2ZW50KCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbnNQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgY29uZmlnOiBBY3Rpb25zQ29uZmlnO1xyXG4gICAgXHJcbiAgICBwcmltYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgcHJpbWFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107ICAgIFxyXG59IiwiaW1wb3J0IHsgSUFjdGlvbnNTZXJ2aWNlLCBBY3Rpb25JdGVtLCBBY3Rpb25zQ29uZmlnIH0gZnJvbSBcIi4vSUFjdGlvbnNTZXJ2aWNlXCI7XHJcblxyXG5jbGFzcyBQcmltYXJ5QWN0aW9uc0NvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBfcGlwVHJhbnNsYXRlOiBwaXAuc2VydmljZXMuSVRyYW5zbGF0ZVNlcnZpY2VcclxuXHJcbiAgICBwdWJsaWMgY29uZmlnOiBBY3Rpb25zQ29uZmlnO1xyXG5cclxuICAgIHB1YmxpYyBsb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHB1YmxpYyBnbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBwdWJsaWMgb3JpZ2luYXRvckV2OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICBwcml2YXRlICRpbmplY3RvcjogbmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbmd1bGFyLklTY29wZSxcclxuICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwaXBBY3Rpb25zOiBJQWN0aW9uc1NlcnZpY2UsXHJcbiAgICAgICAgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXHJcbiAgICAgICAgJGF0dHJzOiBuZy5JQXR0cmlidXRlc1xyXG5cclxuICAgICkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3BpcFRyYW5zbGF0ZSA9IHRoaXMuJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyA8cGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlPnRoaXMuJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLl9waXBUcmFuc2xhdGUgJiYgdGhpcy5fcGlwVHJhbnNsYXRlLnNldFRyYW5zbGF0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLl9waXBUcmFuc2xhdGUuc2V0VHJhbnNsYXRpb25zKCdlbicsIHtcclxuICAgICAgICAgICAgICAgIERPQ1VNRU5UU19BVFRBQ0hFRDogJ2RvY3VtZW50KHMpIGF0dGFjaGVkJyxcclxuICAgICAgICAgICAgICAgIEVSUk9SX0RPQ1VNRU5UU19MT0FERUQ6ICdFcnJvcjogPCU9IGVycm9yX251bWJlciAlPiBkb2N1bWVudChzKSBhcmUgbm90IGxvYWRlZCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BpcFRyYW5zbGF0ZS5zZXRUcmFuc2xhdGlvbnMoJ3J1Jywge1xyXG4gICAgICAgICAgICAgICAgRE9DVU1FTlRTX0FUVEFDSEVEOiAn0LTQvtC60YPQvNC10L3RgtC+0LIg0LTQvtCx0LDQstC70LXQvdC+JyxcclxuICAgICAgICAgICAgICAgIEVSUk9SX0RPQ1VNRU5UU19MT0FERUQ6ICfQntGI0LjQsdC60LA6IDwlPSBlcnJvcl9udW1iZXIgJT4g0LTQvtC60YPQvNC10L3RgijQvtCyKSDQvdC1INC30LDQs9GA0YPQttC10L3QvidcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygncGlwLXByaW1hcnktYWN0aW9ucycpO1xyXG5cclxuICAgICAgICB0aGlzLiRyb290U2NvcGUuJG9uKCdwaXBBY3Rpb25zQ2hhbmdlZCcsIChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBBY3Rpb25zQ29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25BY3Rpb25zQ2hhbmdlZChldmVudCwgY29uZmlnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyAkb25Jbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxvY2FsQWN0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLnBpcEFjdGlvbnMucHJpbWFyeUxvY2FsQWN0aW9ucyA9IHRoaXMubG9jYWxBY3Rpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2xvYmFsQWN0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLnBpcEFjdGlvbnMucHJpbWFyeUdsb2JhbEFjdGlvbnMgPSB0aGlzLmdsb2JhbEFjdGlvbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMucGlwQWN0aW9ucy5jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkFjdGlvbnNDaGFuZ2VkKGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IEFjdGlvbnNDb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNIaWRkZW4oYWN0aW9uOiBBY3Rpb25JdGVtKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gVG9kbzogQ2hlY2sgYnJlYWtwb2ludHMgaGVyZVxyXG4gICAgICAgIHJldHVybiBhY3Rpb24uYWNjZXNzICYmICFhY3Rpb24uYWNjZXNzKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFjdGlvbkNvdW50KGFjdGlvbjogQWN0aW9uSXRlbSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGFjdGlvbi5jb3VudCA9PT0gbnVsbCB8fCBhY3Rpb24uY291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPiA5OSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyEnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyhhY3Rpb24uY291bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGlja0FjdGlvbihhY3Rpb246IEFjdGlvbkl0ZW0sICRtZE9wZW5NZW51OiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmICghYWN0aW9uIHx8IGFjdGlvbi5kaXZpZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uc3ViQWN0aW9ucykge1xyXG4gICAgICAgICAgICAkbWRPcGVuTWVudSh0aGlzLm9yaWdpbmF0b3JFdik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oYWN0aW9uLmNsaWNrKSkge1xyXG4gICAgICAgICAgICBhY3Rpb24uY2xpY2soYWN0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ocmVmKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYWN0aW9uLmhyZWY7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24udXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnVybChhY3Rpb24udXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5zdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kaW5qZWN0b3IuaGFzKCd0aGlzLl9zdGF0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3N0YXRlOiBhbmd1bGFyLnVpLklTdGF0ZVNlcnZpY2UgPSB0aGlzLiRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gPGFuZ3VsYXIudWkuSVN0YXRlU2VydmljZT50aGlzLiRpbmplY3Rvci5nZXQoJyRzdGF0ZScpIDogbnVsbCA7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3N0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3N0YXRlLmdvKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLnN0YXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KGFjdGlvbi5ldmVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHJhaXNlIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwQWN0aW9uQ2xpY2tlZCcsIGFjdGlvbi5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuaW50ZXJmYWNlIElQcmltYXJ5QWN0aW9uc0JpbmRpbmdzIHtcclxuICAgIFtrZXk6IHN0cmluZ106IGFueTtcclxuXHJcbiAgICBsb2NhbEFjdGlvbnM6IGFueSxcclxuICAgIGdsb2JhbEFjdGlvbnM6IGFueSxcclxuICAgIG9yaWdpbmF0b3JFdjogYW55XHJcbn1cclxuXHJcbmNvbnN0IFByaW1hcnlBY3Rpb25zQmluZGluZ3M6IElQcmltYXJ5QWN0aW9uc0JpbmRpbmdzID0ge1xyXG4gICAgbG9jYWxBY3Rpb25zOiAnPHBpcExvY2FsQWN0aW9ucycsXHJcbiAgICBnbG9iYWxBY3Rpb25zOiAnPHBpcEdsb2JhbEFjdGlvbnMnLFxyXG4gICAgb3JpZ2luYXRvckV2OiAnPD9waXBPcmlnaW5hdG9yRXYnXHJcbn1cclxuXHJcbmNsYXNzIFByaW1hcnlBY3Rpb25zQ2hhbmdlcyBpbXBsZW1lbnRzIG5nLklPbkNoYW5nZXNPYmplY3QsIElQcmltYXJ5QWN0aW9uc0JpbmRpbmdzIHtcclxuICAgIFtrZXk6IHN0cmluZ106IG5nLklDaGFuZ2VzT2JqZWN0PGFueT47XHJcblxyXG4gICAgbG9jYWxBY3Rpb25zOiBuZy5JQ2hhbmdlc09iamVjdDxBY3Rpb25JdGVtW10+O1xyXG4gICAgZ2xvYmFsQWN0aW9uczogbmcuSUNoYW5nZXNPYmplY3Q8QWN0aW9uSXRlbVtdPjtcclxuICAgIG9yaWdpbmF0b3JFdjogbmcuSUNoYW5nZXNPYmplY3Q8YW55PjtcclxufVxyXG5cclxuXHJcbigoKSA9PiB7XHJcbiAgICBjb25zdCBwcmltYXJ5QWN0aW9uczogbmcuSUNvbXBvbmVudE9wdGlvbnMgPSB7XHJcbiAgICAgICAgYmluZGluZ3M6IFByaW1hcnlBY3Rpb25zQmluZGluZ3MsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhY3Rpb25zL1ByaW1hcnlBY3Rpb25zLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IFByaW1hcnlBY3Rpb25zQ29udHJvbGxlclxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcEFjdGlvbnMnKVxyXG4gICAgICAgIC5jb21wb25lbnQoJ3BpcFByaW1hcnlBY3Rpb25zJywgcHJpbWFyeUFjdGlvbnMpO1xyXG5cclxufSkoKTsiLCJpbXBvcnQgeyBJQWN0aW9uc1NlcnZpY2UsIEFjdGlvbkl0ZW0sIEFjdGlvbnNDb25maWcgfSBmcm9tIFwiLi9JQWN0aW9uc1NlcnZpY2VcIjtcclxuXHJcbmNsYXNzIFNlY29uZGFyeUFjdGlvbnNDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgcGlwVHJhbnNsYXRlOiBwaXAuc2VydmljZXMuSVRyYW5zbGF0ZVNlcnZpY2VcclxuICAgIHByaXZhdGUgX21lbnVGbjogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIG9yaWdpbmF0b3JFdjogYW55O1xyXG5cclxuICAgIHB1YmxpYyBjb25maWc6IEFjdGlvbnNDb25maWc7XHJcbiAgICBwdWJsaWMgbG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBwdWJsaWMgZ2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJGF0dHJzOiBuZy5JQXR0cmlidXRlcyxcclxuICAgICAgICBwcml2YXRlICRpbmplY3RvcjogbmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcGlwQWN0aW9uczogSUFjdGlvbnNTZXJ2aWNlLFxyXG4gICAgICAgICRlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXNlY29uZGFyeS1hY3Rpb25zJyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmxvY2FsQWN0aW9ucykge1xyXG4gICAgICAgICAgICBwaXBBY3Rpb25zLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9IHRoaXMubG9jYWxBY3Rpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2xvYmFsQWN0aW9ucykge1xyXG4gICAgICAgICAgICBwaXBBY3Rpb25zLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSB0aGlzLmdsb2JhbEFjdGlvbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHBpcEFjdGlvbnMuY29uZmlnO1xyXG5cclxuICAgICAgICB0aGlzLiRyb290U2NvcGUuJG9uKCdwaXBBY3Rpb25zQ2hhbmdlZCcsIChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBBY3Rpb25zQ29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25BY3Rpb25zQ2hhbmdlZChldmVudCwgY29uZmlnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRvbigncGlwU2Vjb25kYXJ5QWN0aW9uc09wZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25BY3Rpb25zTWVudU9wZW4oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1lbnUobWVudUZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgICB0aGlzLl9tZW51Rm4gPSBtZW51Rm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQWN0aW9uc01lbnVPcGVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21lbnVGbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuTWVudSgkbWRPcGVuTWVudTogRnVuY3Rpb24sIGV2OiBuZy5JQW5ndWxhckV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hdG9yRXYgPSBldjtcclxuICAgICAgICAkbWRPcGVuTWVudShldik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkFjdGlvbnNDaGFuZ2VkKGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IEFjdGlvbnNDb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNIaWRkZW4oYWN0aW9uOiBBY3Rpb25JdGVtKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gVG9kbzogQ2hlY2sgYnJlYWtwb2ludHMgaGVyZVxyXG4gICAgICAgIHJldHVybiBhY3Rpb24uYWNjZXNzICYmICFhY3Rpb24uYWNjZXNzKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFjdGlvbkNvdW50KGFjdGlvbjogQWN0aW9uSXRlbSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGFjdGlvbi5jb3VudCA9PT0gbnVsbCB8fCBhY3Rpb24uY291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPiA5OSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyEnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyhhY3Rpb24uY291bnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGNhbGNBY3Rpb25zKGFjdGlvbnM6IEFjdGlvbkl0ZW1bXSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGNvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBfLmVhY2goYWN0aW9ucywgKGFjdGlvbjogQWN0aW9uSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNIaWRkZW4oYWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlY29uZGFyeUFjdGlvbnNWaXNpYmxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGNBY3Rpb25zKHRoaXMuY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMpID4gMCB8fFxyXG4gICAgICAgICAgICB0aGlzLmNhbGNBY3Rpb25zKHRoaXMuY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucykgPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWNvbmRhcnlEaXZpZGVyVmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxjQWN0aW9ucyh0aGlzLmNvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zKSA+IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5jYWxjQWN0aW9ucyh0aGlzLmNvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMpID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xpY2tBY3Rpb24oYWN0aW9uOiBBY3Rpb25JdGVtLCAkbWRPcGVuTWVudTogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWFjdGlvbiB8fCBhY3Rpb24uZGl2aWRlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0b2RvOiBkbyBub3Qgc3VwcG9ydGVkIGludG8gQWN0aW9uSXRlbVxyXG4gICAgICAgIC8vIGlmIChhY3Rpb24uY2xvc2UpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy4kc2NvcGUub3JpZ2luYXRvckV2ID0gbnVsbDtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uc3ViQWN0aW9ucykge1xyXG4gICAgICAgICAgICAkbWRPcGVuTWVudSh0aGlzLm9yaWdpbmF0b3JFdik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uY2xpY2spIHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsaWNrKGFjdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uaHJlZikge1xyXG4gICAgICAgICAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFjdGlvbi5ocmVmO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnVybCkge1xyXG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi51cmwoYWN0aW9uLnVybCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJGluamVjdG9yLmhhcygndGhpcy5fc3RhdGUnKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IF9zdGF0ZTogYW5ndWxhci51aS5JU3RhdGVTZXJ2aWNlID0gdGhpcy4kaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/IDxhbmd1bGFyLnVpLklTdGF0ZVNlcnZpY2U+dGhpcy4kaW5qZWN0b3IuZ2V0KCckc3RhdGUnKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3N0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3N0YXRlLmdvKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLnN0YXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KGFjdGlvbi5ldmVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHJhaXNlIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwQWN0aW9uQ2xpY2tlZCcsIGFjdGlvbi5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuaW50ZXJmYWNlIElTZWNvbmRhcnlBY3Rpb25zQmluZGluZ3Mge1xyXG4gICAgW2tleTogc3RyaW5nXTogYW55O1xyXG5cclxuICAgIGxvY2FsQWN0aW9uczogYW55LFxyXG4gICAgZ2xvYmFsQWN0aW9uczogYW55XHJcbn1cclxuXHJcbmNvbnN0IFNlY29uZGFyeUFjdGlvbnNCaW5kaW5nczogSVNlY29uZGFyeUFjdGlvbnNCaW5kaW5ncyA9IHtcclxuICAgIGxvY2FsQWN0aW9uczogJzxwaXBMb2NhbEFjdGlvbnMnLFxyXG4gICAgZ2xvYmFsQWN0aW9uczogJzxwaXBHbG9iYWxBY3Rpb25zJ1xyXG59XHJcblxyXG5jbGFzcyBTZWNvbmRhcnlBY3Rpb25zQ2hhbmdlcyBpbXBsZW1lbnRzIG5nLklPbkNoYW5nZXNPYmplY3QsIElTZWNvbmRhcnlBY3Rpb25zQmluZGluZ3Mge1xyXG4gICAgW2tleTogc3RyaW5nXTogbmcuSUNoYW5nZXNPYmplY3Q8YW55PjtcclxuXHJcbiAgICBsb2NhbEFjdGlvbnM6IG5nLklDaGFuZ2VzT2JqZWN0PEFjdGlvbkl0ZW1bXT47XHJcbiAgICBnbG9iYWxBY3Rpb25zOiBuZy5JQ2hhbmdlc09iamVjdDxBY3Rpb25JdGVtW10+O1xyXG59XHJcblxyXG5cclxuKCgpID0+IHtcclxuICAgIGNvbnN0IHNlY29uZGFyeUFjdGlvbnM6IG5nLklDb21wb25lbnRPcHRpb25zID0ge1xyXG4gICAgICAgIGJpbmRpbmdzOiBTZWNvbmRhcnlBY3Rpb25zQmluZGluZ3MsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhY3Rpb25zL1NlY29uZGFyeUFjdGlvbnMuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogU2Vjb25kYXJ5QWN0aW9uc0NvbnRyb2xsZXJcclxuICAgIH07XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcEFjdGlvbnMnKVxyXG4gICAgICAgIC5jb21wb25lbnQoJ3BpcFNlY29uZGFyeUFjdGlvbnMnLCBzZWNvbmRhcnlBY3Rpb25zKTtcclxuXHJcbn0pKCk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdwaXBBY3Rpb25zJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UZW1wbGF0ZXMnLCAndWkucm91dGVyJ10pO1xyXG5cclxuaW1wb3J0ICcuL0FjdGlvbnNTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1ByaW1hcnlBY3Rpb25zJztcclxuaW1wb3J0ICcuL1NlY29uZGFyeUFjdGlvbnMnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9JQWN0aW9uc1NlcnZpY2UnOyIsIu+7v2ltcG9ydCB7IEFwcEJhckNvbmZpZyB9IGZyb20gJy4vQXBwQmFyQ29uZmlnJztcclxuaW1wb3J0IHsgSUFwcEJhclNlcnZpY2UgfSBmcm9tIFwiLi9JQXBwQmFyU2VydmljZVwiO1xyXG5cclxuY2xhc3MgQXBwQmFyQ29udHJvbGxlciB7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBBcHBCYXJDb25maWc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgcGlwQXBwQmFyOiBJQXBwQmFyU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG4gICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtYXBwYmFyJyk7XHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2NvbG9yLXByaW1hcnktYmcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBwaXBBcHBCYXIuY29uZmlnO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwQXBwQmFyQ2hhbmdlZCcsIChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBBcHBCYXJDb25maWcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkFwcEJhckNoYW5nZWQoZXZlbnQsIGNvbmZpZylcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25BcHBCYXJDaGFuZ2VkKGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IEFwcEJhckNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbntcclxuICAgIGNvbnN0IGFwcGJhcjogbmcuSUNvbXBvbmVudE9wdGlvbnMgPSB7XHJcbiAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcGJhci9BcHBCYXIuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogQXBwQmFyQ29udHJvbGxlclxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBBcHBCYXInKVxyXG4gICAgICAgIC5jb21wb25lbnQoJ3BpcEFwcGJhcicsIGFwcGJhcik7XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIEFwcEJhckNvbmZpZyB7XHJcbiAgICB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgcGFydHM6IGFueTtcclxuICAgIGNsYXNzZXM6IHN0cmluZ1tdO1xyXG59ICIsImltcG9ydCB7IEFwcEJhckNvbmZpZyB9IGZyb20gJy4vQXBwQmFyQ29uZmlnJztcclxuaW1wb3J0IHsgSUFwcEJhclNlcnZpY2UgfSBmcm9tIFwiLi9JQXBwQmFyU2VydmljZVwiO1xyXG5cclxuY2xhc3MgQXBwQmFyUGFydENvbnRyb2xsZXIge1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9wYXJ0TmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfcGFydFZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuICAgICAgICAkZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICAkYXR0cnM6IG5nLklBdHRyaWJ1dGVzLFxyXG4gICAgICAgICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgIHBpcEFwcEJhcjogSUFwcEJhclNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdGhpcy5fcGFydE5hbWUgPSBTdHJpbmcoJGF0dHJzWydwaXBBcHBiYXJQYXJ0J10pO1xyXG4gICAgICAgIHRoaXMuX3BhcnRWYWx1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIEJyZWFrIHBhcnQgYXBhcnRcclxuICAgICAgICBsZXQgcG9zOiBudW1iZXIgPSB0aGlzLl9wYXJ0TmFtZS5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgaWYgKHBvcyA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFydFZhbHVlID0gdGhpcy5fcGFydE5hbWUuc3Vic3RyKHBvcyArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJ0TmFtZSA9IHRoaXMuX3BhcnROYW1lLnN1YnN0cigwLCBwb3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbkFwcEJhckNoYW5nZWQobnVsbCwgcGlwQXBwQmFyLmNvbmZpZyk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcEFwcEJhckNoYW5nZWQnLCAoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIGNvbmZpZzogQXBwQmFyQ29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25BcHBCYXJDaGFuZ2VkKG51bGwsIGNvbmZpZylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkFwcEJhckNoYW5nZWQoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIGNvbmZpZzogQXBwQmFyQ29uZmlnKSB7XHJcbiAgICAgICAgbGV0IHBhcnRzOiBhbnkgPSBjb25maWcucGFydHMgfHwge307XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYXJ0VmFsdWUgPSBwYXJ0c1t0aGlzLl9wYXJ0TmFtZV07XHJcblxyXG4gICAgICAgIC8vIFNldCB2aXNpYmxlIHZhcmlhYmxlIHRvIHN3aXRjaCBuZ0lmXHJcbiAgICAgICAgbGV0IHZpc2libGU6IGJvb2xlYW4gPSAhISh0aGlzLl9wYXJ0VmFsdWUgPyBjdXJyZW50UGFydFZhbHVlID09IHRoaXMuX3BhcnRWYWx1ZSA6IGN1cnJlbnRQYXJ0VmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAodmlzaWJsZSAhPSB0aGlzLiRzY29wZVsndmlzaWJsZSddKVxyXG4gICAgICAgICAgICB0aGlzLiRzY29wZVsndmlzaWJsZSddID0gdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vIEV4YW1wbGUgaXMgdGFrZW4gZnJvbSBoZXJlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIwMzI1NDgwL2FuZ3VsYXJqcy13aGF0cy10aGUtYmVzdC1wcmFjdGljZS10by1hZGQtbmdpZi10by1hLWRpcmVjdGl2ZS1wcm9ncmFtbWF0aWNhbGx5XHJcbigoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBhcHBiYXJQYXJ0KG5nSWZEaXJlY3RpdmUpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHZhciBuZ0lmID0gbmdJZkRpcmVjdGl2ZVswXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHJhbnNjbHVkZTogbmdJZi50cmFuc2NsdWRlLFxyXG4gICAgICAgICAgICBwcmlvcml0eTogbmdJZi5wcmlvcml0eSxcclxuICAgICAgICAgICAgdGVybWluYWw6IG5nSWYudGVybWluYWwsXHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiBuZ0lmLnJlc3RyaWN0LFxyXG4gICAgICAgICAgICBzY29wZTogdHJ1ZSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gbGlua0Z1bmN0aW9uKCRzY29wZTogbmcuSVNjb3BlLCAkZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBuZy5JQXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICAgICAgLy8gVmlzdWFsaXplIGJhc2VkIG9uIHZpc2libGUgdmFyaWFibGUgaW4gc2NvcGVcclxuICAgICAgICAgICAgICAgICRhdHRyc1snbmdJZiddID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGVbJ3Zpc2libGUnXTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBuZ0lmLmxpbmsuYXBwbHkobmdJZiwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogQXBwQmFyUGFydENvbnRyb2xsZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdwaXBBcHBCYXInKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcEFwcGJhclBhcnQnLCBhcHBiYXJQYXJ0KTtcclxuXHJcbn0pKCk7IiwiaW1wb3J0IHsgQXBwQmFyQ29uZmlnIH0gZnJvbSAnLi9BcHBCYXJDb25maWcnO1xyXG5pbXBvcnQgeyBJQXBwQmFyU2VydmljZSwgSUFwcEJhclByb3ZpZGVyIH0gZnJvbSAnLi9JQXBwQmFyU2VydmljZSc7XHJcblxyXG5leHBvcnQgY29uc3QgQXBwQmFyQ2hhbmdlZEV2ZW50OiBzdHJpbmcgPSAncGlwQXBwQmFyQ2hhbmdlZCc7XHJcblxyXG5jbGFzcyBBcHBCYXJTZXJ2aWNlIGltcGxlbWVudHMgSUFwcEJhclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBcHBCYXJDb25maWc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogQXBwQmFyQ29uZmlnLCBwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IEFwcEJhckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsYXNzZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcnRzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhcnRzKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHMgPSB2YWx1ZSB8fCB7fTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93KHBhcnRzPzogYW55LCBjbGFzc2VzPzogc3RyaW5nW10sIHNoYWRvd0JyZWFrcG9pbnRzPzogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gcGFydHMgfHwgdGhpcy5fY29uZmlnLnBhcnRzIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gY2xhc3NlcyB8fCB0aGlzLl9jb25maWcuY2xhc3NlcyB8fCBbXTtcclxuICAgICAgICBpZiAoc2hhZG93QnJlYWtwb2ludHMpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGFkb3coc2hhZG93QnJlYWtwb2ludHMpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlU2hhZG93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjKSA9PiBjLnN0YXJ0c1dpdGgoJ3BpcC1zaGFkb3cnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTaGFkb3coYnJlYWtwb2ludHM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oaWRlU2hhZG93KCk7XHJcblxyXG4gICAgICAgIGlmIChicmVha3BvaW50cyAhPSBudWxsICYmIGJyZWFrcG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgXy5lYWNoKGJyZWFrcG9pbnRzLCAoYnApID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goJ3BpcC1zaGFkb3ctJyArIGJwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaCgncGlwLXNoYWRvdycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkU2hhZG93KC4uLmJyZWFrcG9pbnRzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0U2hhZG93KGJyZWFrcG9pbnRzKTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVTaGFkb3coKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oaWRlU2hhZG93KCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBfLnJlamVjdCh0aGlzLl9jb25maWcuY2xhc3NlcywgKGNjKSA9PiBjYyA9PSBjKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHNbcGFydF0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFwcEJhckNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQXBwQmFyUHJvdmlkZXIgaW1wbGVtZW50cyBJQXBwQmFyUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBcHBCYXJDb25maWcgPSB7XHJcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICBwYXJ0czoge30sXHJcbiAgICAgICAgY2xhc3NlczogW11cclxuICAgIH07XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBcHBCYXJTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IEFwcEJhckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogQXBwQmFyQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsdWUgfHwgbmV3IEFwcEJhckNvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFydHMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnBhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFydHModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHZhbHVlIHx8IHt9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsYXNzZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNsYXNzZXModmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaChjKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBfLnJlamVjdCh0aGlzLl9jb25maWcuY2xhc3NlcywgKGNjKSA9PiBjYyA9PSBjKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzW3BhcnRdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgQXBwQmFyU2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH0gICAgIFxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBcHBCYXInKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBBcHBCYXInLCBBcHBCYXJQcm92aWRlcik7XHJcbiIsImFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEFwcEJhcicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL0FwcEJhckNvbmZpZyc7XHJcbmltcG9ydCAnLi9BcHBCYXJTZXJ2aWNlJztcclxuaW1wb3J0ICcuL0FwcEJhcic7XHJcbmltcG9ydCAnLi9BcHBCYXJQYXJ0JztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vQXBwQmFyU2VydmljZSc7XHJcbiIsImltcG9ydCB7IFNpbXBsZUFjdGlvbkl0ZW0gfSBmcm9tICcuLi9hY3Rpb25zL0lBY3Rpb25zU2VydmljZSc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWJJdGVtIH0gZnJvbSAnLi9CcmVhZGNydW1iQ29uZmlnJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYkNvbmZpZyB9IGZyb20gJy4vQnJlYWRjcnVtYkNvbmZpZyc7XHJcbmltcG9ydCB7IElCcmVhZGNydW1iU2VydmljZSB9IGZyb20gJy4vSUJyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYkNoYW5nZWRFdmVudCB9IGZyb20gJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCcmVhZGNydW1iQmFja0V2ZW50IH0gZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IE9wZW5TZWFyY2hFdmVudCB9IGZyb20gJy4uL3NlYXJjaC9TZWFyY2hTZXJ2aWNlJztcclxuXHJcbmNsYXNzIEJyZWFkY3J1bWJDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgb3JpZ2luYXRvckV2OiBFdmVudDtcclxuICAgIHByaXZhdGUgX21lZGlhOiBhbnk7XHJcblxyXG4gICAgcHVibGljIGNvbmZpZzogQnJlYWRjcnVtYkNvbmZpZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgJGluamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2UsXHJcbiAgICAgICAgcGlwQnJlYWRjcnVtYjogSUJyZWFkY3J1bWJTZXJ2aWNlLFxyXG4gICAgICAgICRtZE1lZGlhOiBhbmd1bGFyLm1hdGVyaWFsLklNZWRpYSxcclxuICAgICAgICAkc3RhdGU6IG5nLnVpLklTdGF0ZVNlcnZpY2UsXHJcbiAgICAgICAgJGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtYnJlYWRjcnVtYicpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHBpcEJyZWFkY3J1bWIuY29uZmlnO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbihCcmVhZGNydW1iQ2hhbmdlZEV2ZW50LCAoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIGNvbmZpZzogQnJlYWRjcnVtYkNvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uQnJlYWRjcnVtYkNoYW5nZWQoZXZlbnQsIGNvbmZpZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQnJlYWRjcnVtYkJhY2tFdmVudCwgKCkgPT4geyB0aGlzLm9uQnJlYWRjcnVtYkJhY2soKTsgfSk7XHJcblxyXG4gICAgICAgIGxldCBwaXBNZWRpYSA9ICRpbmplY3Rvci5oYXMoJ3BpcE1lZGlhJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBNZWRpYScpIDogbnVsbDtcclxuICAgICAgICB0aGlzLl9tZWRpYSA9IHBpcE1lZGlhICE9PSB1bmRlZmluZWQgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CcmVhZGNydW1iQ2hhbmdlZChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJyZWFkY3J1bWJCYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpdGVtczogQnJlYWRjcnVtYkl0ZW1bXSA9IHRoaXMuY29uZmlnLml0ZW1zO1xyXG4gICAgICAgIC8vIEdvIHRvIHRoZSBsYXN0IGJyZWFkY3J1bWIgaXRlbVxyXG4gICAgICAgIGlmIChfLmlzQXJyYXkoaXRlbXMpICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06IEJyZWFkY3J1bWJJdGVtID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlbS5jbGljaykpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xpY2soaXRlbSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLiR3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsaWNrKGl0ZW06IEJyZWFkY3J1bWJJdGVtKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtLmNsaWNrKSkge1xyXG4gICAgICAgICAgICBpdGVtLmNsaWNrKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlblNlYXJjaCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChPcGVuU2VhcmNoRXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY3Rpb25zVmlzaWJsZShpdGVtOiBCcmVhZGNydW1iSXRlbSk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICByZXR1cm4gYW5ndWxhci5pc0FycmF5KGl0ZW0uc3ViQWN0aW9ucykgJiYgaXRlbS5zdWJBY3Rpb25zLmxlbmd0aCA+IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uT3Blbk1lbnUoJG1kT3Blbk1lbnU6IEZ1bmN0aW9uLCBldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9yaWdpbmF0b3JFdiA9IGV2ZW50O1xyXG4gICAgICAgICRtZE9wZW5NZW51KHRoaXMub3JpZ2luYXRvckV2KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdWJBY3Rpb25DbGljayhhY3Rpb246IFNpbXBsZUFjdGlvbkl0ZW0pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWFjdGlvbiB8fCBhY3Rpb24uZGl2aWRlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGFjdGlvbi5jbGljaykpIHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsaWNrKGFjdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uaHJlZikge1xyXG4gICAgICAgICAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFjdGlvbi5ocmVmO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnVybCkge1xyXG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi51cmwoYWN0aW9uLnVybCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJGluamVjdG9yLmhhcygnJHN0YXRlJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfc3RhdGU6IGFuZ3VsYXIudWkuSVN0YXRlU2VydmljZSA9IHRoaXMuJGluamVjdG9yLmdldCgnJHN0YXRlJykgYXMgbmcudWkuSVN0YXRlU2VydmljZVxyXG4gICAgICAgICAgICAgICAgX3N0YXRlLmdvKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLnN0YXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KGFjdGlvbi5ldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYXRvckV2ID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgcmFpc2Ugbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBBY3Rpb25DbGlja2VkJywgYWN0aW9uLm5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLm9yaWdpbmF0b3JFdiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBicmVhZGNydW1iOiBuZy5JQ29tcG9uZW50T3B0aW9ucyA9IHtcclxuICAgIGJpbmRpbmdzOiB7fSxcclxuICAgIHRlbXBsYXRlVXJsOiAnYnJlYWRjcnVtYi9CcmVhZGNydW1iLmh0bWwnLFxyXG4gICAgY29udHJvbGxlcjogQnJlYWRjcnVtYkNvbnRyb2xsZXJcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQnJlYWRjcnVtYicpXHJcbiAgICAuY29tcG9uZW50KCdwaXBCcmVhZGNydW1iJywgYnJlYWRjcnVtYik7IiwiaW1wb3J0IHsgU2ltcGxlQWN0aW9uSXRlbSB9IGZyb20gJy4uL2FjdGlvbnMvSUFjdGlvbnNTZXJ2aWNlJztcclxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJJdGVtIHtcclxuICAgIHRpdGxlOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgY2xpY2s/OiAoaXRlbTogQnJlYWRjcnVtYkl0ZW0pID0+IHZvaWQgPSBudWxsOyAgIFxyXG4gICAgc3ViQWN0aW9ucz86IFNpbXBsZUFjdGlvbkl0ZW1bXSA9IG51bGw7IFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkNvbmZpZyB7XHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbiAgICBpdGVtczogQnJlYWRjcnVtYkl0ZW1bXTtcclxuICAgIGNyaXRlcmlhOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgQnJlYWRjcnVtYkl0ZW0sIEJyZWFkY3J1bWJDb25maWcgfSBmcm9tICcuL0JyZWFkY3J1bWJDb25maWcnO1xyXG5pbXBvcnQgeyBJQnJlYWRjcnVtYlNlcnZpY2UsIElCcmVhZGNydW1iUHJvdmlkZXIgfSBmcm9tICcuL0lCcmVhZGNydW1iU2VydmljZSc7XHJcblxyXG5leHBvcnQgY29uc3QgQnJlYWRjcnVtYkNoYW5nZWRFdmVudDogc3RyaW5nID0gXCJwaXBCcmVhZGNydW1iQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQnJlYWRjcnVtYkJhY2tFdmVudDogc3RyaW5nID0gXCJwaXBCcmVhZGNydW1iQmFja1wiO1xyXG5cclxuY2xhc3MgQnJlYWRjcnVtYlNlcnZpY2UgaW1wbGVtZW50cyBJQnJlYWRjcnVtYlNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgIGNvbmZpZzogQnJlYWRjcnVtYkNvbmZpZ1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0ZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuaXRlbXMgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXRlbXMoKTogQnJlYWRjcnVtYkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5pdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGl0ZW1zKHZhbHVlOiBCcmVhZGNydW1iSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pdGVtcyA9IHZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY3JpdGVyaWEoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNyaXRlcmlhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY3JpdGVyaWEodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dUZXh0KHRleHQ6IHN0cmluZywgY3JpdGVyaWE/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLml0ZW1zID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSBjcml0ZXJpYTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93SXRlbXMoaXRlbXM6IEJyZWFkY3J1bWJJdGVtW10sIGNyaXRlcmlhPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLml0ZW1zID0gaXRlbXMgfHwgW107XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IGNyaXRlcmlhO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRDb25maWdFdmVudCgpIHtcclxuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChCcmVhZGNydW1iQ2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgQnJlYWRjcnVtYlByb3ZpZGVyIGltcGxlbWVudHMgSUJyZWFkY3J1bWJQcm92aWRlciwgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEJyZWFkY3J1bWJDb25maWcgPSBuZXcgQnJlYWRjcnVtYkNvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQnJlYWRjcnVtYlNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCB0ZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSk6IElCcmVhZGNydW1iU2VydmljZSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IEJyZWFkY3J1bWJTZXJ2aWNlKCRyb290U2NvcGUsIHRoaXMuX2NvbmZpZyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQnJlYWRjcnVtYicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcEJyZWFkY3J1bWInLCBCcmVhZGNydW1iUHJvdmlkZXIpO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgncGlwQnJlYWRjcnVtYicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVGVtcGxhdGVzJywgJ3BpcE5hdi5UcmFuc2xhdGUnXSk7XHJcblxyXG5pbXBvcnQgJy4vQnJlYWRjcnVtYic7XHJcbmltcG9ydCAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuXHJcblxyXG4iLCJpbXBvcnQgeyBJTmF2U2VydmljZSB9IGZyb20gJy4vSU5hdlNlcnZpY2UnXHJcbmltcG9ydCB7IElOYXZJY29uU2VydmljZSB9IGZyb20gJy4uL2ljb24vSU5hdkljb25TZXJ2aWNlJztcclxuaW1wb3J0IHsgSU5hdk1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vbWVudS9JTmF2TWVudVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJTmF2SGVhZGVyU2VydmljZSB9IGZyb20gJy4uL2hlYWRlci9JTmF2SGVhZGVyU2VydmljZSc7XHJcbmltcG9ydCB7IElCcmVhZGNydW1iU2VydmljZSB9IGZyb20gJy4uL2JyZWFkY3J1bWIvSUJyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgSVNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi9zZWFyY2gvSVNlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQWN0aW9uc1NlcnZpY2UgfSBmcm9tICcuLi9hY3Rpb25zL0lBY3Rpb25zU2VydmljZSc7XHJcbmltcG9ydCB7IElBcHBCYXJTZXJ2aWNlIH0gZnJvbSAnLi4vYXBwYmFyL0lBcHBCYXJTZXJ2aWNlJztcclxuaW1wb3J0IHsgSVNpZGVOYXZTZXJ2aWNlIH0gZnJvbSAnLi4vc2lkZW5hdi9JU2lkZU5hdlNlcnZpY2UnO1xyXG5cclxuY2xhc3MgTmF2U2VydmljZSBpbXBsZW1lbnRzIElOYXZTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgYXBwYmFyOiBJQXBwQmFyU2VydmljZTtcclxuICAgIHB1YmxpYyBpY29uOiBJTmF2SWNvblNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYnJlYWRjcnVtYjogSUJyZWFkY3J1bWJTZXJ2aWNlO1xyXG4gICAgcHVibGljIGFjdGlvbnM6IElBY3Rpb25zU2VydmljZTtcclxuICAgIHB1YmxpYyBzZWFyY2g6IElTZWFyY2hTZXJ2aWNlO1xyXG4gICAgcHVibGljIHNpZGVuYXY6IElTaWRlTmF2U2VydmljZTtcclxuICAgIHB1YmxpYyBoZWFkZXI6IElOYXZIZWFkZXJTZXJ2aWNlO1xyXG4gICAgcHVibGljIG1lbnU6IElOYXZNZW51U2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoJGluamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwYmFyID0gJGluamVjdG9yLmhhcygncGlwQXBwQmFyJykgPyA8SUFwcEJhclNlcnZpY2U+JGluamVjdG9yLmdldCgncGlwQXBwQmFyJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuaWNvbiA9ICRpbmplY3Rvci5oYXMoJ3BpcE5hdkljb24nKSA/IDxJTmF2SWNvblNlcnZpY2U+JGluamVjdG9yLmdldCgncGlwTmF2SWNvbicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLmJyZWFkY3J1bWIgPSAkaW5qZWN0b3IuaGFzKCdwaXBCcmVhZGNydW1iJykgPyA8SUJyZWFkY3J1bWJTZXJ2aWNlPiRpbmplY3Rvci5nZXQoJ3BpcEJyZWFkY3J1bWInKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gJGluamVjdG9yLmhhcygncGlwQWN0aW9ucycpID8gPElBY3Rpb25zU2VydmljZT4kaW5qZWN0b3IuZ2V0KCdwaXBBY3Rpb25zJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoID0gJGluamVjdG9yLmhhcygncGlwU2VhcmNoJykgPyA8SVNlYXJjaFNlcnZpY2U+JGluamVjdG9yLmdldCgncGlwU2VhcmNoJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuc2lkZW5hdiA9ICRpbmplY3Rvci5oYXMoJ3BpcFNpZGVOYXYnKSA/IDxJU2lkZU5hdlNlcnZpY2U+JGluamVjdG9yLmdldCgncGlwU2lkZU5hdicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLmhlYWRlciA9ICRpbmplY3Rvci5oYXMoJ3BpcE5hdkhlYWRlcicpID8gPElOYXZIZWFkZXJTZXJ2aWNlPiRpbmplY3Rvci5nZXQoJ3BpcE5hdkhlYWRlcicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLm1lbnUgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZNZW51JykgPyA8SU5hdk1lbnVTZXJ2aWNlPiRpbmplY3Rvci5nZXQoJ3BpcE5hdk1lbnUnKSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgIC8vIFJlc2V0IGFwcGJhclxyXG4gICAgICAgIGlmICh0aGlzLmFwcGJhcikge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGJhci5zaG93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNldCBpY29uXHJcbiAgICAgICAgaWYgKHRoaXMuaWNvbikge1xyXG4gICAgICAgICAgICB0aGlzLmljb24uc2hvd01lbnUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGJyZWFkY3J1bWJcclxuICAgICAgICBpZiAodGhpcy5icmVhZGNydW1iKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnJlYWRjcnVtYi5zaG93VGV4dChudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGFjdGlvbnNcclxuICAgICAgICBpZiAodGhpcy5hY3Rpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5zaG93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNldCBzZWFyY2hcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2gpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2guc2V0KG51bGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2lkZW5hdikge1xyXG4gICAgICAgICAgICB0aGlzLnNpZGVuYXYuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdlNlcnZpY2UnLCBbXSlcclxuICAgIC5zZXJ2aWNlKCdwaXBOYXZTZXJ2aWNlJywgTmF2U2VydmljZSk7Iiwie1xyXG5cclxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUZpbHRlcigkaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgbGV0IHBpcFRyYW5zbGF0ZTogcGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgXHJcbiAgICAgICAgICAgID8gPHBpcC5zZXJ2aWNlcy5JVHJhbnNsYXRlU2VydmljZT4kaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBpcFRyYW5zbGF0ZSA/IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoa2V5KSB8fCBrZXkgOiBrZXk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBOYXYuVHJhbnNsYXRlJywgW10pXHJcbiAgICAgICAgLmZpbHRlcigndHJhbnNsYXRlJywgdHJhbnNsYXRlRmlsdGVyKTtcclxuXHJcbn1cclxuXHJcbiIsIntcclxuICAgIGNsYXNzIERyb3Bkb3duQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBfcGlwVHJhbnNsYXRlOiBwaXAuc2VydmljZXMuSVRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgICAgICAgcHJpdmF0ZSBfcGlwVGhlbWU6IHBpcC50aGVtZXMuSVRoZW1lU2VydmljZTtcclxuICAgICAgICBwcml2YXRlIF9waXBNZWRpYTogcGlwLmxheW91dHMuSU1lZGlhU2VydmljZTtcclxuXHJcbiAgICAgICAgcHVibGljIHRoZW1lQ2xhc3M6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgbWVkaWE6IGFueTtcclxuICAgICAgICBwdWJsaWMgYWN0aW9uczogYW55W107IC8vIHN0cmluZyBvciBhcnJheVxyXG4gICAgICAgIHB1YmxpYyBhY3RpdmVJbmRleDogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGN1cnJlbnRUaGVtZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgbmdEaXNhYmxlZDogRnVuY3Rpb247XHJcbiAgICAgICAgcHVibGljIHNob3dEcm9wZG93bjogRnVuY3Rpb247XHJcbiAgICAgICAgcHVibGljIHNlbGVjdDogYW55O1xyXG4gICAgICAgIHB1YmxpYyBwaXBDaGFuZ2U6IEZ1bmN0aW9uO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLFxyXG4gICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UsXHJcbiAgICAgICAgICAgICRlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgICAgICAgICAkYXR0cnM6IG5nLklBdHRyaWJ1dGVzLFxyXG4gICAgICAgICAgICAkaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZSxcclxuICAgICAgICAgICAgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXHJcbiAgICAgICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAkbWRNZWRpYTogYW5ndWxhci5tYXRlcmlhbC5JTWVkaWEsXHJcblxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9waXBUaGVtZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRoZW1lJykgPyA8cGlwLnRoZW1lcy5JVGhlbWVTZXJ2aWNlPiRpbmplY3Rvci5nZXQoJ3BpcFRoZW1lJykgOiBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9waXBNZWRpYSA9ICRpbmplY3Rvci5oYXMoJ3BpcE1lZGlhJykgPyA8cGlwLmxheW91dHMuSU1lZGlhU2VydmljZT4kaW5qZWN0b3IuZ2V0KCdwaXBNZWRpYScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9waXBUaGVtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGhlbWUgPSB0aGlzLl9waXBUaGVtZS50aGVtZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgkcm9vdFNjb3BlWyckdGhlbWUnXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGhlbWUgPSAkcm9vdFNjb3BlWyckdGhlbWUnXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50aGVtZUNsYXNzID0gKCRhdHRyc1snY2xhc3MnXSB8fCAnJykgKyAnIG1kLScgKyB0aGlzLmN1cnJlbnRUaGVtZSArICctdGhlbWUnO1xyXG5cclxuICAgICAgICAgICAgLy9waXBBc3NlcnQuaXNBcnJheSgkc2NvcGUuYWN0aW9ucywgJ3BpcERyb3Bkb3duOiBwaXAtYWN0aW9ucyBhdHRyaWJ1dGUgc2hvdWxkIHRha2UgYW4gYXJyYXksIGJ1dCB0YWtlICcgKyB0eXBlb2YgJHNjb3BlLmFjdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhID0gIV8uaXNVbmRlZmluZWQodGhpcy5fcGlwTWVkaWEpID8gdGhpcy5fcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gKHRoaXMuYWN0aW9ucyAmJiBfLmlzQXJyYXkodGhpcy5hY3Rpb25zKSkgPyB0aGlzLmFjdGlvbnMgOiBbXTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IHRoaXMuYWN0aXZlSW5kZXggfHwgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubmdEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmdEaXNhYmxlZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb25TZWxlY3QoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QodGhpcy5hY3Rpb25zW2luZGV4XSwgdGhpcy5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBpcENoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waXBDaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2hvdygpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogYm9vbGVhbjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0Ryb3Bkb3duKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXRoaXMuc2hvd0Ryb3Bkb3duKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGludGVyZmFjZSBJRHJvcGRvd25CaW5kaW5ncyB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55O1xyXG5cclxuICAgICAgICBuZ0Rpc2FibGVkOiBhbnksXHJcbiAgICAgICAgYWN0aW9uczogYW55LFxyXG4gICAgICAgIHNob3dEcm9wZG93bjogYW55LFxyXG4gICAgICAgIGFjdGl2ZUluZGV4OiBhbnksXHJcbiAgICAgICAgc2VsZWN0OiBhbnksXHJcbiAgICAgICAgcGlwQ2hhbmdlOiBhbnlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBEcm9wZG93bkJpbmRpbmdzOiBJRHJvcGRvd25CaW5kaW5ncyA9IHtcclxuICAgICAgICBuZ0Rpc2FibGVkOiAnJicsXHJcbiAgICAgICAgYWN0aW9uczogJz1waXBBY3Rpb25zJyxcclxuICAgICAgICBzaG93RHJvcGRvd246ICcmcGlwU2hvdycsXHJcbiAgICAgICAgYWN0aXZlSW5kZXg6ICc9cGlwQWN0aXZlSW5kZXgnLFxyXG4gICAgICAgIHNlbGVjdDogJz1waXBEcm9wZG93blNlbGVjdCcsXHJcbiAgICAgICAgcGlwQ2hhbmdlOiAnJidcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEcm9wZG93bkNoYW5nZXMgaW1wbGVtZW50cyBuZy5JT25DaGFuZ2VzT2JqZWN0LCBJRHJvcGRvd25CaW5kaW5ncyB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogbmcuSUNoYW5nZXNPYmplY3Q8YW55PjtcclxuXHJcbiAgICAgICAgbmdEaXNhYmxlZDogbmcuSUNoYW5nZXNPYmplY3Q8RnVuY3Rpb24+O1xyXG4gICAgICAgIGFjdGlvbnM6IG5nLklDaGFuZ2VzT2JqZWN0PGFueT47XHJcbiAgICAgICAgc2hvd0Ryb3Bkb3duOiBuZy5JQ2hhbmdlc09iamVjdDxGdW5jdGlvbj47XHJcbiAgICAgICAgYWN0aXZlSW5kZXg6IG5nLklDaGFuZ2VzT2JqZWN0PG51bWJlcj47XHJcbiAgICAgICAgc2VsZWN0OiBuZy5JQ2hhbmdlc09iamVjdDxhbnk+O1xyXG4gICAgICAgIHBpcENoYW5nZTogbmcuSUNoYW5nZXNPYmplY3Q8RnVuY3Rpb24+O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRyb3Bkb3duOiBuZy5JQ29tcG9uZW50T3B0aW9ucyA9IHtcclxuICAgICAgICBiaW5kaW5nczogRHJvcGRvd25CaW5kaW5ncyxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2Ryb3Bkb3duL0Ryb3Bkb3duLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IERyb3Bkb3duQ29udHJvbGxlclxyXG4gICAgfTtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwRHJvcGRvd24nLCBbJ3BpcE5hdi5UZW1wbGF0ZXMnXSlcclxuICAgICAgICAuY29tcG9uZW50KCdwaXBEcm9wZG93bicsIGRyb3Bkb3duKTtcclxuXHJcbn0iLCJpbXBvcnQgeyBJTmF2SGVhZGVyU2VydmljZSB9IGZyb20gXCIuL0lOYXZIZWFkZXJTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE5hdkhlYWRlckNvbmZpZyB9IGZyb20gXCIuL05hdkhlYWRlckNvbmZpZ1wiO1xyXG5cclxue1xyXG4gICAgY2xhc3MgTmF2SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBjbGVhbnVwTmF2SGVhZGVyQ2hhbmdlZDogRnVuY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBjbGVhbnVwU2lkZU5hdlN0YXRlQ2hhbmdlZDogRnVuY3Rpb247XHJcblxyXG4gICAgICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBpbWFnZVVybDogc3RyaW5nID0gbnVsbDtcclxuICAgICAgICBwdWJsaWMgaW1hZ2VDc3M6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgaW1hZ2U6IGFueTtcclxuICAgICAgICBwdWJsaWMgaW1hZ2VCbG9jazogYW55O1xyXG4gICAgICAgIHB1YmxpYyBsb2FkZWREZWZhdWx0SW1hZ2U6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIHNob3dIZWFkZXI6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwcml2YXRlICRlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgICAgICAgICBwcml2YXRlICRzY29wZTogYW5ndWxhci5JU2NvcGUsXHJcbiAgICAgICAgICAgICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgcGlwTmF2SGVhZGVyOiBJTmF2SGVhZGVyU2VydmljZSxcclxuICAgICAgICAgICAgbmF2Q29uc3RhbnQ6IGFueVxyXG5cclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtc3RpY2t5LW5hdi1oZWFkZXInKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEltYWdlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNsZWFudXBOYXZIZWFkZXJDaGFuZ2VkID0gJHJvb3RTY29wZS4kb24oJ3BpcE5hdkhlYWRlckNoYW5nZWQnLCAoJGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IE5hdkhlYWRlckNvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk5hdkhlYWRlckNoYW5nZWQoJGV2ZW50LCBjb25maWcpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFudXBTaWRlTmF2U3RhdGVDaGFuZ2VkID0gJHJvb3RTY29wZS4kb24oJ3BpcFNpZGVOYXZTdGF0ZUNoYW5nZWQnLCAoJGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBzdGF0ZTogYW55KSA9PiB7IC8vbmF2U3RhdGVcclxuICAgICAgICAgICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZWQoJGV2ZW50LCBzdGF0ZSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljICRvbkRlc3Ryb3koKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRoaXMuY2xlYW51cE5hdkhlYWRlckNoYW5nZWQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFudXBOYXZIZWFkZXJDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzLmNsZWFudXBTaWRlTmF2U3RhdGVDaGFuZ2VkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhbnVwU2lkZU5hdlN0YXRlQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRJbWFnZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZUJsb2NrID0gdGhpcy4kZWxlbWVudC5maW5kKCcucGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXInKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLnBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLWltYWdlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW1hZ2VbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlWzBdLm9ubG9hZCA9ICgoKSA9PiB0aGlzLm9uSW1hZ2VMb2FkKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAoJGV2ZW50OiBIVE1MRWxlbWVudCwgZXJyb2V2OiBFdmVudCk6IGFueSA9PiAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLm9uSW1hZ2VMb2FkKCRldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlWzBdLm9uZXJyb3IgPSAoKCkgPT4gdGhpcy5vbkltYWdlRXJyb3IoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKCRldmVudDogbmcuSUFuZ3VsYXJFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLm9uSW1hZ2VFcnJvcigkZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKCkgPT4gdGhpcy5vbkltYWdlTG9hZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlLm9uZXJyb3IgPSAoKCkgPT4gdGhpcy5vbkltYWdlRXJyb3IoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk5hdkhlYWRlckNoYW5nZWQobnVsbCwgdGhpcy5waXBOYXZIZWFkZXIuY29uZmlnKTtcclxuICAgICAgICAgICAgfSwgMjApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0SGVhZGVyKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGlwTmF2SGVhZGVyLmNvbmZpZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMucGlwTmF2SGVhZGVyLmNvbmZpZy50aXRsZTtcclxuICAgICAgICAgICAgdGhpcy5zdWJ0aXRsZSA9IHRoaXMucGlwTmF2SGVhZGVyLmNvbmZpZy5zdWJ0aXRsZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZVVybCA9IHRoaXMucGlwTmF2SGVhZGVyLmNvbmZpZy5pbWFnZVVybDtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZUNzcyA9IHRoaXMucGlwTmF2SGVhZGVyLmNvbmZpZy5pbWFnZUNzcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC8vIFdoZW4gaW1hZ2UgaXMgbG9hZGVkIHJlc2l6ZS9yZXBvc2l0aW9uIGl0XHJcbiAgICAgICAgLy8gcHJpdmF0ZSBvbkltYWdlTG9hZCgkZXZlbnQpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGltYWdlOiBuZy5JQXVnbWVudGVkSlF1ZXJ5ID0gJCgkZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAvLyAgICAgdGhpcy5zZXRJbWFnZU1hcmdpbkNTUyhpbWFnZSk7XHJcbiAgICAgICAgLy8gfTtcclxuXHJcbiAgICAgICAgLy8gcHJpdmF0ZSBvbkltYWdlRXJyb3IoJGV2ZW50KSB7XHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLmxvYWRlZERlZmF1bHRJbWFnZSkgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgICB0aGlzLiRzY29wZS4kYXBwbHkoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zZXRJbWFnZSh0aGlzLnBpcE5hdkhlYWRlci5jb25maWcsIHRydWUpO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9O1xyXG4gICAgICAgIC8vIFdoZW4gaW1hZ2UgaXMgbG9hZGVkIHJlc2l6ZS9yZXBvc2l0aW9uIGl0XHJcbiAgICAgICAgcHJpdmF0ZSBvbkltYWdlTG9hZCgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRJbWFnZU1hcmdpbkNTUyh0aGlzLmltYWdlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIG9uSW1hZ2VFcnJvcigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9hZGVkRGVmYXVsdEltYWdlKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEltYWdlKHRoaXMucGlwTmF2SGVhZGVyLmNvbmZpZywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25TdGF0ZUNoYW5nZWQoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIHN0YXRlOiBhbnkpIHsgLy8gbmF2U3RhdGVcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5pZCA9PSAndG9nZ2xlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93SGVhZGVyID0gc3RhdGUgJiYgc3RhdGUuaWQgPT0gJ3RvZ2dsZSc7XHJcbiAgICAgICAgICAgICAgICB9LCA0MDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93SGVhZGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0SW1hZ2VNYXJnaW5DU1MoaW1hZ2U6IG5nLklBdWdtZW50ZWRKUXVlcnkpIHsgLy9pbWFnZVswXVxyXG4gICAgICAgICAgICB2YXIgY3NzUGFyYW1zID0ge30sXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJXaWR0aCA9IHRoaXMuaW1hZ2VCbG9jay53aWR0aCA/IHRoaXMuaW1hZ2VCbG9jay53aWR0aCgpIDogdGhpcy5pbWFnZUJsb2NrLmNsaWVudFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVySGVpZ2h0ID0gdGhpcy5pbWFnZUJsb2NrLmhlaWdodCA/IHRoaXMuaW1hZ2VCbG9jay5oZWlnaHQoKSA6IHRoaXMuaW1hZ2VCbG9jay5jbGllbnRIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBpbWFnZVdpZHRoID0gaW1hZ2VbMF1bJ25hdHVyYWxXaWR0aCddIHx8IGltYWdlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VIZWlnaHQgPSBpbWFnZVswXVsnbmF0dXJhbEhlaWdodCddIHx8IGltYWdlLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIG1hcmdpbiA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoKGltYWdlV2lkdGggLyBjb250YWluZXJXaWR0aCkgPiAoaW1hZ2VIZWlnaHQgLyBjb250YWluZXJIZWlnaHQpKSB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4gPSAtKChpbWFnZVdpZHRoIC8gaW1hZ2VIZWlnaHQgKiBjb250YWluZXJIZWlnaHQgLSBjb250YWluZXJXaWR0aCkgLyAyKTtcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snbWFyZ2luLWxlZnQnXSA9ICcnICsgbWFyZ2luICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snaGVpZ2h0J10gPSAnJyArIGNvbnRhaW5lckhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ3dpZHRoJ10gPSAnJyArIGltYWdlV2lkdGggKiBjb250YWluZXJIZWlnaHQgLyBpbWFnZUhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ21hcmdpbi10b3AnXSA9ICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luID0gLSgoaW1hZ2VIZWlnaHQgLyBpbWFnZVdpZHRoICogY29udGFpbmVyV2lkdGggLSBjb250YWluZXJIZWlnaHQpIC8gMik7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ21hcmdpbi10b3AnXSA9ICcnICsgbWFyZ2luICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snaGVpZ2h0J10gPSAnJyArIGltYWdlSGVpZ2h0ICogY29udGFpbmVyV2lkdGggLyBpbWFnZVdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snd2lkdGgnXSA9ICcnICsgY29udGFpbmVyV2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydtYXJnaW4tbGVmdCddID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGltYWdlLmNzcyhjc3NQYXJhbXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0SW1hZ2UoY29uZmlnLCBsb2FkRXJyb3I6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIGlmICghbG9hZEVycm9yICYmICEhY29uZmlnLmltYWdlVXJsKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBjb25maWcuaW1hZ2VVcmw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZERlZmF1bHRJbWFnZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBjb25maWcuZGVmYXVsdEltYWdlVXJsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodXJsICYmIHRoaXMuaW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UuYXR0cignc3JjJywgdXJsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VCbG9jay5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbk5hdkhlYWRlckNoYW5nZWQoJGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IE5hdkhlYWRlckNvbmZpZykge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IGNvbmZpZy50aXRsZTtcclxuICAgICAgICAgICAgdGhpcy5zdWJ0aXRsZSA9IGNvbmZpZy5zdWJ0aXRsZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZVVybCA9IGNvbmZpZy5pbWFnZVVybDtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZUNzcyA9IGNvbmZpZy5pbWFnZUNzcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0SW1hZ2UoY29uZmlnLCBmYWxzZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvblVzZXJDbGljaygpIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcE5hdlVzZXJDbGlja2VkJyk7IC8vIHRvZG9cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5hdkhlYWRlcjogbmcuSUNvbXBvbmVudE9wdGlvbnMgPSB7XHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdoZWFkZXIvTmF2SGVhZGVyLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IE5hdkhlYWRlckNvbnRyb2xsZXJcclxuICAgIH07XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcE5hdkhlYWRlcicpXHJcbiAgICAgICAgLmNvbXBvbmVudCgncGlwTmF2SGVhZGVyJywgbmF2SGVhZGVyKTtcclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgTmF2SGVhZGVyQ29uZmlnIHtcclxuICAgIC8vIEltYWdlIHVybFxyXG4gICAgcHVibGljIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICAvLyBJbWFnZSB1cmxcclxuICAgIHB1YmxpYyBkZWZhdWx0SW1hZ2VVcmw6IHN0cmluZztcclxuICAgIC8vIFRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIC8vIFN1YnRpdGxlXHJcbiAgICBwdWJsaWMgc3VidGl0bGU6IHN0cmluZztcclxuICAgIC8vIGltYWdlIHN0eWxlc1xyXG4gICAgcHVibGljIGltYWdlQ3NzOiBzdHJpbmc7XHJcbiAgICAvLyBIYW5kbGUgaGVhZGVyIGNsaWNrIGV2ZW50XHJcbiAgICBjbGljazogKCkgPT4gdm9pZDtcclxuICAgIC8vIEV2ZW50IG5hbWVcclxuICAgIGV2ZW50OiBzdHJpbmdcclxufTsiLCJpbXBvcnQgeyBOYXZIZWFkZXJDb25maWcgfSBmcm9tIFwiLi9OYXZIZWFkZXJDb25maWdcIjtcclxuaW1wb3J0IHsgSU5hdkhlYWRlclNlcnZpY2UsIElOYXZIZWFkZXJQcm92aWRlciB9IGZyb20gXCIuL0lOYXZIZWFkZXJTZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgbGV0IE5hdkhlYWRlckNoYW5nZWRFdmVudCA9ICdwaXBOYXZIZWFkZXJDaGFuZ2VkJztcclxuXHJcbmNsYXNzIE5hdkhlYWRlclNlcnZpY2UgaW1wbGVtZW50cyBJTmF2SGVhZGVyU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdkhlYWRlckNvbmZpZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBOYXZIZWFkZXJDb25maWcsIHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogTmF2SGVhZGVyQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdWJ0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc3VidGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzdWJ0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGltYWdlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5pbWFnZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGltYWdlVXJsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xpY2soKTogKCkgPT4gdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jbGljaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNsaWNrKHZhbHVlOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGV2ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5ldmVudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGV2ZW50KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93KHRpdGxlOiBzdHJpbmcsIHN1YnRpdGxlOiBzdHJpbmcsIGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IHN1YnRpdGxlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IGltYWdlVXJsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrT3JFdmVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfLmlzU3RyaW5nKGNhbGxiYWNrT3JFdmVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KE5hdkhlYWRlckNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2SGVhZGVyUHJvdmlkZXIgaW1wbGVtZW50cyBJTmF2SGVhZGVyUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZIZWFkZXJDb25maWcgPSBuZXcgTmF2SGVhZGVyQ29uZmlnKCk7XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBOYXZIZWFkZXJTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkhlYWRlckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogTmF2SGVhZGVyQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsdWUgfHwgbmV3IE5hdkhlYWRlckNvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVmYXVsdEltYWdlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5kZWZhdWx0SW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkZWZhdWx0SW1hZ2VVcmwodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5kZWZhdWx0SW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN1YnRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN1YnRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGltYWdlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5pbWFnZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGltYWdlVXJsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsaWNrKCk6ICgpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xpY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGljayh2YWx1ZTogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZXZlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmV2ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZXZlbnQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQodGl0bGU6IHN0cmluZywgc3VidGl0bGU6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gc3VidGl0bGU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcblxyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2tPckV2ZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcoY2FsbGJhY2tPckV2ZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBOYXZIZWFkZXJTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdkhlYWRlcicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcE5hdkhlYWRlcicsIE5hdkhlYWRlclByb3ZpZGVyKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3BpcE5hdkhlYWRlcicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL05hdkhlYWRlclNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vTmF2SGVhZGVyJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vTmF2SGVhZGVyU2VydmljZSc7IiwiaW1wb3J0IHsgT3BlblNpZGVOYXZFdmVudCB9IGZyb20gJy4uL3NpZGVuYXYvU2lkZU5hdlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOYXZJY29uQ29uZmlnIH0gZnJvbSAnLi9OYXZJY29uQ29uZmlnJztcclxuaW1wb3J0IHsgSU5hdkljb25TZXJ2aWNlIH0gZnJvbSAnLi9JTmF2SWNvblNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOYXZJY29uQ2xpY2tlZEV2ZW50LCBOYXZJY29uQ2hhbmdlZEV2ZW50IH0gZnJvbSAnLi9OYXZJY29uU2VydmljZSc7XHJcblxyXG5pbnRlcmZhY2UgSU5hdkljb25CaW5kaW5ncyB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcblxyXG4gICAgdHlwZTogYW55O1xyXG4gICAgaW1hZ2VVcmw6IGFueTtcclxuICAgIGljb246IGFueTtcclxufVxyXG5cclxuY29uc3QgTmF2SWNvbkJpbmRpbmdzOiBJTmF2SWNvbkJpbmRpbmdzID0ge1xyXG4gICAgdHlwZTogJzw/cGlwVHlwZScsXHJcbiAgICBpbWFnZVVybDogJzw/cGlwSW1hZ2VVcmwnLFxyXG4gICAgaWNvbjogJzw/cGlwSWNvbidcclxufVxyXG5cclxuY2xhc3MgTmF2SWNvbkNoYW5nZXMgaW1wbGVtZW50cyBuZy5JT25DaGFuZ2VzT2JqZWN0LCBJTmF2SWNvbkJpbmRpbmdzIHtcclxuICAgIFtrZXk6IHN0cmluZ106IG5nLklDaGFuZ2VzT2JqZWN0PGFueT47XHJcbiAgICAvLyBOb3Qgb25lIHdheSBiaW5kaW5nc1xyXG5cclxuICAgIHR5cGU6IG5nLklDaGFuZ2VzT2JqZWN0PHN0cmluZz47XHJcbiAgICBpbWFnZVVybDogbmcuSUNoYW5nZXNPYmplY3Q8c3RyaW5nPjtcclxuICAgIGljb246IG5nLklDaGFuZ2VzT2JqZWN0PHN0cmluZz47XHJcbn1cclxuXHJcbmNsYXNzIE5hdkljb25Db250cm9sbGVyIGltcGxlbWVudHMgSU5hdkljb25CaW5kaW5ncyB7XHJcbiAgICBwcml2YXRlIGNsZWFyRm46IEZ1bmN0aW9uO1xyXG5cclxuICAgIHB1YmxpYyBjb25maWc6IE5hdkljb25Db25maWc7XHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaWNvbjogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuICAgICAgICAkZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICAkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLFxyXG4gICAgICAgICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxyXG4gICAgICAgIHBpcE5hdkljb246IElOYXZJY29uU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1uYXYtaWNvbicpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHBpcE5hdkljb24uY29uZmlnO1xyXG5cclxuICAgICAgICB0aGlzLmNsZWFyRm4gPSAkcm9vdFNjb3BlLiRvbigncGlwTmF2SWNvbkNoYW5nZWQnLCAoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIGNvbmZpZzogTmF2SWNvbkNvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uTmF2SWNvbkNoYW5nZWQoZXZlbnQsIGNvbmZpZylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRvbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy50eXBlID0gdGhpcy50eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pbWFnZVVybCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5pbWFnZVVybCA9IHRoaXMuaW1hZ2VVcmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmljb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuaWNvbiA9IHRoaXMuaWNvbjtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJG9uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMuY2xlYXJGbikpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckZuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbk5hdkljb25DaGFuZ2VkKGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IE5hdkljb25Db25maWcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25OYXZJY29uQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5jbGljaykpIHtcclxuICAgICAgICAgICAgLy8gRXhlY3V0ZSBuYXYgaWNvbiBjYWxsYmFja1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jbGljaygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcuZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QodGhpcy5jb25maWcuZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcudHlwZSA9PSAnbWVudScpIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoT3BlblNpZGVOYXZFdmVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy50eXBlID09ICdiYWNrJykge1xyXG4gICAgICAgICAgICB0aGlzLiR3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoTmF2SWNvbkNsaWNrZWRFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuY29uc3QgTmF2SWNvbjogbmcuSUNvbXBvbmVudE9wdGlvbnMgPSB7XHJcbiAgICBiaW5kaW5nczogTmF2SWNvbkJpbmRpbmdzLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdpY29uL05hdkljb24uaHRtbCcsXHJcbiAgICBjb250cm9sbGVyOiBOYXZJY29uQ29udHJvbGxlclxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZJY29uJylcclxuICAgIC5jb21wb25lbnQoJ3BpcE5hdkljb24nLCBOYXZJY29uKTtcclxuIiwiZXhwb3J0IGNsYXNzIE5hdkljb25Db25maWcge1xyXG4gICAgLy8gVHlwZSBvZiBuYXYgaWNvbjogJ2JhY2snLCAnbWVudScsICdpbWFnZScgb3IgJ25vbmUnXHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgLy8gSW1hZ2UgdXJsXHJcbiAgICBwdWJsaWMgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIC8vIEljb24gbmFtZVxyXG4gICAgcHVibGljIGljb246IHN0cmluZztcclxuICAgIC8vIEhhbmRsZSBuYXYgaWNvbiBjbGljayBldmVudFxyXG4gICAgY2xpY2s6ICgpID0+IHZvaWQ7XHJcbiAgICAvLyBFdmVudCBuYW1lXHJcbiAgICBldmVudDogc3RyaW5nXHJcbn07IiwiaW1wb3J0IHsgTmF2SWNvbkNvbmZpZyB9IGZyb20gJy4vTmF2SWNvbkNvbmZpZyc7XHJcbmltcG9ydCB7IElOYXZJY29uU2VydmljZSwgSU5hdkljb25Qcm92aWRlciB9IGZyb20gJy4vSU5hdkljb25TZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBOYXZJY29uQ2xpY2tlZEV2ZW50OiBzdHJpbmcgPSAncGlwTmF2SWNvbkNsaWNrZWQnO1xyXG5leHBvcnQgY29uc3QgTmF2SWNvbkNoYW5nZWRFdmVudDogc3RyaW5nID0gJ3BpcE5hdkljb25DaGFuZ2VkJztcclxuXHJcbmNsYXNzIE5hdkljb25TZXJ2aWNlIGltcGxlbWVudHMgSU5hdkljb25TZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogTmF2SWNvbkNvbmZpZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBOYXZJY29uQ29uZmlnLCBwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkljb25Db25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNTdHJpbmcoY2FsbGJhY2tPckV2ZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dNZW51KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ21lbnUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0ljb24oaWNvbjogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpY29uJztcclxuICAgICAgICB0aGlzLl9jb25maWcuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93QmFjayhjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdiYWNrJztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpbWFnZSc7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KG51bGwpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoTmF2SWNvbkNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2SWNvblByb3ZpZGVyIGltcGxlbWVudHMgSU5hdkljb25Qcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdkljb25Db25maWcgPSBuZXcgTmF2SWNvbkNvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogTmF2SWNvblNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogTmF2SWNvbkNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogTmF2SWNvbkNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBOYXZJY29uQ29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc1N0cmluZyhjYWxsYmFja09yRXZlbnQpKVxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgZWxzZSB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNZW51KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ21lbnUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEljb24oaWNvbjogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpY29uJztcclxuICAgICAgICB0aGlzLl9jb25maWcuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QmFjayhjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdiYWNrJztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJbWFnZShpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdpbWFnZSc7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgTmF2SWNvblNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbiAgICAgXHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZJY29uJylcclxuICAgIC5wcm92aWRlcigncGlwTmF2SWNvbicsIE5hdkljb25Qcm92aWRlcik7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdwaXBOYXZJY29uJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9OYXZJY29uQ29uZmlnJztcclxuaW1wb3J0ICcuL0lOYXZJY29uU2VydmljZSc7XHJcbmltcG9ydCAnLi9OYXZJY29uU2VydmljZSc7XHJcbmltcG9ydCAnLi9OYXZJY29uJztcclxuXHJcblxyXG5leHBvcnQgKiBmcm9tICcuL05hdkljb25Db25maWcnO1xyXG5leHBvcnQgKiBmcm9tICcuL0lOYXZJY29uU2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vTmF2SWNvblNlcnZpY2UnO1xyXG4iLCLvu79pbXBvcnQgJy4vZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlcic7XHJcbmltcG9ydCAnLi9sYW5ndWFnZS9MYW5ndWFnZVBpY2tlckRpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9kcm9wZG93bi9Ecm9wZG93bic7XHJcbmltcG9ydCAnLi90YWJzL1RhYnMnO1xyXG5pbXBvcnQgJy4vYWN0aW9ucyc7XHJcbmltcG9ydCAnLi9hcHBiYXInO1xyXG5pbXBvcnQgJy4vc2VhcmNoJztcclxuaW1wb3J0ICcuL2JyZWFkY3J1bWInO1xyXG5pbXBvcnQgJy4vc2lkZW5hdic7XHJcbmltcG9ydCAnLi9oZWFkZXInO1xyXG5pbXBvcnQgJy4vbWVudSc7XHJcbmltcG9ydCAnLi9pY29uJztcclxuaW1wb3J0ICcuL2NvbW1vbi9OYXZTZXJ2aWNlJztcclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdicsIFtcclxuICAgICAgICAncGlwTmF2U2VydmljZScsXHJcbiAgICAgICAgJ3BpcERyb3Bkb3duJyxcclxuICAgICAgICAncGlwVGFicycsXHJcbiAgICAgICAgJ3BpcEFwcEJhcicsXHJcbiAgICAgICAgJ3BpcFNlYXJjaEJhcicsXHJcbiAgICAgICAgJ3BpcE5hdkljb24nLFxyXG4gICAgICAgICdwaXBCcmVhZGNydW1iJyxcclxuICAgICAgICAncGlwTGFuZ3VhZ2VQaWNrZXInLFxyXG4gICAgICAgICdwaXBBY3Rpb25zJywgXHJcbiAgICAgICAgJ3BpcFNpZGVOYXYnLFxyXG4gICAgICAgICdwaXBOYXZNZW51JyxcclxuICAgICAgICAncGlwTmF2SGVhZGVyJ1xyXG4gICAgXSlcclxuICAgIC5jb25zdGFudCgnbmF2Q29uc3RhbnQnLCB7XHJcbiAgICAgICAgJ1RBQl9CUkVBS1BPSU5UJzogJ2d0LXNtJyxcclxuICAgICAgICAnU0lERU5BVl9DT05UQUlORVInOiAnLnBpcC1tYWluJyxcclxuICAgICAgICAnU0lERU5BVl9MQVJHRV9XSURUSCc6IDMyMCxcclxuICAgICAgICAnU0lERU5BVl9NSURETEVfV0lEVEgnOiAyNDAsXHJcbiAgICAgICAgJ1NJREVOQVZfU01BTExfV0lEVEgnOiA3MixcclxuICAgICAgICAnU0lERU5BVl9BTklNQVRJT05fRFVSQVRJT04nOiA2MDBcclxuICAgIH0pXHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2FjdGlvbnMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2FwcGJhcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vYnJlYWRjcnVtYic7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2VhcmNoJztcclxuZXhwb3J0ICogZnJvbSAnLi9zaWRlbmF2JztcclxuZXhwb3J0ICogZnJvbSAnLi9pY29uJztcclxuZXhwb3J0ICogZnJvbSAnLi9tZW51JztcclxuZXhwb3J0ICogZnJvbSAnLi9oZWFkZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbW1vbi9JTmF2U2VydmljZSc7XHJcbiIsIntcclxuICAgIGNsYXNzIExhbmd1YWdlUGlja2VyRGlyZWN0aXZlQ29udHJvbGxlciBpbXBsZW1lbnRzIElMYW5ndWFnZVBpY2tlckJpbmRpbmdzIHtcclxuICAgICAgICBwcml2YXRlIF90cmFuc2xhdGU6IHBpcC5zZXJ2aWNlcy5JVHJhbnNsYXRlU2VydmljZTtcclxuICAgICAgICBwdWJsaWMgbGFuZ3VhZ2VzOiBzdHJpbmdbXSA9IFsnZW4nLCAncnUnXTtcclxuICAgICAgICBwdWJsaWMgdmFsdWU6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgJGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgICAgICRpbmplY3RvcjogbmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl90cmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/IDxwaXAuc2VydmljZXMuSVRyYW5zbGF0ZVNlcnZpY2U+JGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtbGFuZ3VhZ2UtcGlja2VyJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldExhbmd1YWdlcyh0aGlzLmxhbmd1YWdlcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSAgfHwgdGhpcy5sYW5ndWFnZXNbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IGxhbmd1YWdlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNsYXRlID8gdGhpcy5fdHJhbnNsYXRlLmxhbmd1YWdlIDogbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRMYW5ndWFnZXMobGFuZ3VhZ2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlcyA9IGxhbmd1YWdlcy5sZW5ndGggPiAwID8gbGFuZ3VhZ2VzIDogWydlbicsICdydSddO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uTGFuZ3VhZ2VDbGljayhsYW5ndWFnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90cmFuc2xhdGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGxhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2xhdGUubGFuZ3VhZ2UgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGludGVyZmFjZSBJTGFuZ3VhZ2VQaWNrZXJCaW5kaW5ncyB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55O1xyXG5cclxuICAgICAgICBsYW5ndWFnZXM6IGFueSxcclxuICAgICAgICB2YWx1ZTogYW55XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgTGFuZ3VhZ2VQaWNrZXJCaW5kaW5nczogSUxhbmd1YWdlUGlja2VyQmluZGluZ3MgPSB7XHJcbiAgICAgICAgbGFuZ3VhZ2VzOiAnPGxhbmd1YWdlcycsXHJcbiAgICAgICAgdmFsdWU6ICc9P3ZhbHVlJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxhbmd1YWdlUGlja2VyRGlyZWN0aXZlOiBuZy5JQ29tcG9uZW50T3B0aW9ucyA9IHtcclxuICAgICAgICBiaW5kaW5nczogTGFuZ3VhZ2VQaWNrZXJCaW5kaW5ncyxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IExhbmd1YWdlUGlja2VyRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBMYW5ndWFnZVBpY2tlcicsIFtcclxuICAgICAgICAgICAgJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRyYW5zbGF0ZScsICdwaXBOYXYuVGVtcGxhdGVzJ1xyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLmNvbXBvbmVudCgncGlwTGFuZ3VhZ2VQaWNrZXInLCBsYW5ndWFnZVBpY2tlckRpcmVjdGl2ZSk7XHJcblxyXG59IiwiaW1wb3J0IHsgSVNpZGVOYXZTZXJ2aWNlfSBmcm9tICcuLi9zaWRlbmF2L0lTaWRlTmF2U2VydmljZSc7XHJcbmltcG9ydCB7IElOYXZNZW51U2VydmljZX0gZnJvbSAnLi9JTmF2TWVudVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTaWRlTmF2U3RhdGVOYW1lcywgU2lkZU5hdlN0YXRlLCBTaWRlTmF2Q29uZmlnIH0gZnJvbSAnLi4vc2lkZW5hdi9TaWRlTmF2U3RhdGUnO1xyXG5pbXBvcnQgeyBOYXZNZW51Q29uZmlnLCBOYXZNZW51U2VjdGlvbiwgTmF2TWVudUxpbmsgfSBmcm9tICcuL05hdk1lbnVDb25maWcnO1xyXG5cclxuKCgpID0+IHtcclxuICAgIGNsYXNzIE5hdk1lbnVDb250cm9sbGVyIHtcclxuICAgICAgICBwcml2YXRlIF9zdGF0ZTogYW5ndWxhci51aS5JU3RhdGVTZXJ2aWNlO1xyXG4gICAgICAgIHByaXZhdGUgX3BpcE1lZGlhOiBwaXAubGF5b3V0cy5JTWVkaWFTZXJ2aWNlO1xyXG4gICAgICAgIHByaXZhdGUgX2FuaW1hdGlvbkR1cmF0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX3BpcFNpZGVOYXZFbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5O1xyXG5cclxuICAgICAgICBwdWJsaWMgc2VjdGlvbnM6IE5hdk1lbnVTZWN0aW9uW107XHJcbiAgICAgICAgcHVibGljIGRlZmF1bHRJY29uOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGlzQ29sbGFwc2VkOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBleHBhbmRlZDogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgZXhwYW5kZWRCdXR0b246IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIHNpZGVOYXZTdGF0ZTogU2lkZU5hdlN0YXRlO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLFxyXG4gICAgICAgICAgICBwcml2YXRlICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlIHBpcFNpZGVOYXY6IElTaWRlTmF2U2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSBwaXBOYXZNZW51OiBJTmF2TWVudVNlcnZpY2UsXHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICAgICAgJGluamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2UsXHJcbiAgICAgICAgICAgIG5hdkNvbnN0YW50OiBhbnlcclxuXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gJGluamVjdG9yLmhhcygnJHN0YXRlJykgPyA8YW5ndWxhci51aS5JU3RhdGVTZXJ2aWNlPiRpbmplY3Rvci5nZXQoJyRzdGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkR1cmF0aW9uID0gbmF2Q29uc3RhbnQuU0lERU5BVl9BTklNQVRJT05fRFVSQVRJT04sXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9waXBTaWRlTmF2RWxlbWVudCA9ICRlbGVtZW50LnBhcmVudCgpLnBhcmVudCgpO1xyXG4gICAgICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LW1lbnUnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VjdGlvbnMgPSB0aGlzLiRzY29wZVsnc2VjdGlvbnMnXSB8fCB0aGlzLnBpcE5hdk1lbnUuc2VjdGlvbnM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldENvbGxhcHNpYmxlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRJY29uID0gdGhpcy5waXBOYXZNZW51LmRlZmF1bHRJY29uO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlZChudWxsLCB0aGlzLnBpcFNpZGVOYXYuc3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNsZWFudXBOYXZNZW51Q2hhbmdlZDogRnVuY3Rpb24gPSB0aGlzLiRyb290U2NvcGUuJG9uKCdwaXBOYXZNZW51Q2hhbmdlZCcsICgkZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIGNvbmZpZzogTmF2TWVudUNvbmZpZykgPT4geyAvL25hdlN0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29uZmlnQ2hhbmdlZCgkZXZlbnQsIGNvbmZpZylcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBjbGVhbnVwU2lkZU5hdlN0YXRlQ2hhbmdlZDogRnVuY3Rpb24gPSB0aGlzLiRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGVDaGFuZ2VkJywgKCRldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgc3RhdGU6IFNpZGVOYXZTdGF0ZSkgPT4geyAvL25hdlN0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkKCRldmVudCwgc3RhdGUpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oY2xlYW51cE5hdk1lbnVDaGFuZ2VkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXBOYXZNZW51Q2hhbmdlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihjbGVhbnVwU2lkZU5hdlN0YXRlQ2hhbmdlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwU2lkZU5hdlN0YXRlQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldENvbGxhcHNpYmxlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgY29sbGFwc2VkOiBib29sZWFuO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRoaXMuJHNjb3BlWydjb2xsYXBzZWQnXSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZCA9IHRoaXMuJHNjb3BlWydjb2xsYXBzZWQnXSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29sbGFwc2VkID0gdGhpcy4kc2NvcGVbJ2NvbGxhcHNlZCddICE9PSBmYWxzZSAmJiB0aGlzLiRzY29wZVsnY29sbGFwc2VkJ10gIT09ICdmYWxzZSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb25FeHBhbmQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbGxhcHNlZCkgeyByZXR1cm4gfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BpcFNpZGVOYXZFbGVtZW50LnJlbW92ZUNsYXNzKCdwaXAtc3RpY2t5LW5hdi1zbWFsbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGlwU2lkZU5hdkVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zdGlja3ktbmF2LXNtYWxsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KCdwaXBOYXZFeHBhbmRlZCcsIHRoaXMuZXhwYW5kZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGlzSGlkZGVuKGl0ZW06IE5hdk1lbnVMaW5rKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtICYmIGl0ZW0uYWNjZXNzICYmICFpdGVtLmFjY2VzcyhpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc1NlY3Rpb25FbXB0eShsaW5rQ29sbGVjdGlvbjogTmF2TWVudUxpbmtbXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgXy5lYWNoKGxpbmtDb2xsZWN0aW9uLCAobGluazogTmF2TWVudUxpbmspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0hpZGRlbihsaW5rKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQ29uZmlnQ2hhbmdlZCgkZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIGNvbmZpZzogTmF2TWVudUNvbmZpZyk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZykgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnNlY3Rpb25zID0gY29uZmlnLnNlY3Rpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvblN0YXRlQ2hhbmdlZChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgc3RhdGU6IFNpZGVOYXZTdGF0ZSk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyBTUz4gWW91IHNoYWxsIG5vdCBzZXQgaXQgaW50byB0aGUgbWVudSBzdGF0ZS4gSW5zdGVhZCBpdCBzaGFsbCBiZSBjb250cm9sbGVkIGJ5IHRoZSBzdGF0ZSBvZiBTaWRlbmF2XHJcbiAgICAgICAgICAgIGlmICghc3RhdGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSBzdGF0ZS5leHBhbmQ7XHJcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSBzdGF0ZS5pc0V4cGFuZGVkO1xyXG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkQnV0dG9uID0gc3RhdGUuZXhwYW5kZWRCdXR0b247XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNpZGVOYXZTdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGlzQWN0aXZlKGxpbms6IE5hdk1lbnVMaW5rKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmIChsaW5rLnBhcmVudFN0YXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9IG51bGwgJiYgdGhpcy5fc3RhdGUuaW5jbHVkZXMobGluay5wYXJlbnRTdGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5rLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUgIT0gbnVsbCAmJiB0aGlzLl9zdGF0ZS5pbmNsdWRlcyhsaW5rLnN0YXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmsuaHJlZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdID09PSB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluay51cmwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLnVybC5zcGxpdCgvW1xccy8/XSsvKVsxXSA9PT0gdGhpcy4kbG9jYXRpb24udXJsKCkuc3BsaXQoL1tcXHMvP10rLylbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsaWNrTGluayhldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgbGluazogTmF2TWVudUxpbmspOiB2b2lkIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlwU2lkZU5hdi5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmsuaHJlZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdID09PSB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waXBTaWRlTmF2LmNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGluay5ocmVmO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5fYW5pbWF0aW9uRHVyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5rLnVybCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmsudXJsLnNwbGl0KC9bXFxzLz9dKy8pWzFdID09PSB0aGlzLiRsb2NhdGlvbi51cmwoKS5zcGxpdCgvW1xccy8/XSsvKVsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnVybChsaW5rLnVybCk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLl9hbmltYXRpb25EdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmsuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSAhPSBudWxsICYmIHRoaXMuX3N0YXRlLmN1cnJlbnQubmFtZSA9PT0gbGluay5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlwU2lkZU5hdi5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5waXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5nbyhsaW5rLnN0YXRlLCBsaW5rLnN0YXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMuX2FuaW1hdGlvbkR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluay5ldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QobGluay5ldmVudCwgbGluayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnRlcmZhY2UgSU5hdk1lbnVCaW5kaW5ncyB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55O1xyXG4gICAgICAgIHNlY3Rpb25zOiBhbnksXHJcbiAgICAgICAgY29sbGFwc2VkOiBhbnlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBOYXZNZW51QmluZGluZ3M6IElOYXZNZW51QmluZGluZ3MgPSB7XHJcbiAgICAgICAgc2VjdGlvbnM6ICc9P3BpcFNlY3Rpb25zJyxcclxuICAgICAgICBjb2xsYXBzZWQ6ICc9P3BpcENvbGxhcHNlZCdcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gbmF2TWVudURpcmVjdGl2ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuICAgICAgICAgICAgc2NvcGU6IE5hdk1lbnVCaW5kaW5ncyxcclxuICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbWVudS9OYXZNZW51Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBOYXZNZW51Q29udHJvbGxlcixcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwTmF2TWVudScpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgncGlwTmF2TWVudScsIG5hdk1lbnVEaXJlY3RpdmUpO1xyXG5cclxufSkoKTsiLCJpbXBvcnQgeyBOYXZNZW51Q29uZmlnLCBOYXZNZW51U2VjdGlvbiB9IGZyb20gJy4vTmF2TWVudUNvbmZpZyc7XHJcbmltcG9ydCB7IElOYXZNZW51U2VydmljZSwgSU5hdk1lbnVQcm92aWRlciB9IGZyb20gJy4vSU5hdk1lbnVTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBOYXZNZW51Q2hhbmdlZEV2ZW50ID0gJ3BpcE5hdk1lbnVDaGFuZ2VkJztcclxuXHJcbmNsYXNzIE5hdk1lbnVTZXJ2aWNlIGltcGxlbWVudHMgSU5hdk1lbnVTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogTmF2TWVudUNvbmZpZztcclxuICAgIHByaXZhdGUgX3Jvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvbmZpZzogTmF2TWVudUNvbmZpZyxcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWN0aW9ucygpOiBOYXZNZW51U2VjdGlvbltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VjdGlvbnModmFsdWU6IE5hdk1lbnVTZWN0aW9uW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2VjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVmYXVsdEljb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmRlZmF1bHRJY29uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVCYWRnZVN0eWxlKGxpbms6IHN0cmluZywgc3R5bGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChsaW5rID09IG51bGwgfHwgIV8uaXNTdHJpbmcoc3R5bGUpKSByZXR1cm47XHJcblxyXG4gICAgICAgIF8uZWFjaCh0aGlzLl9jb25maWcuc2VjdGlvbnMsIChzKSA9PiB7XHJcbiAgICAgICAgICAgIF8uZWFjaChzLmxpbmtzLCAobCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGwubmFtZSA9PSBsaW5rKVxyXG4gICAgICAgICAgICAgICAgICAgIGwuYmFkZ2VTdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRlZmF1bHRJY29uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZGVmYXVsdEljb24gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDb3VudChsaW5rOiBzdHJpbmcsIGNvdW50OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAobGluayA9PSBudWxsIHx8ICFfLmlzTnVtYmVyKGNvdW50KSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnNlY3Rpb25zLCAocykgPT4ge1xyXG4gICAgICAgICAgICBfLmVhY2gocy5saW5rcywgKGwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsLm5hbWUgPT0gbGluaylcclxuICAgICAgICAgICAgICAgICAgICBsLmNvdW50ID0gY291bnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckNvdW50cygpOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnNlY3Rpb25zLCAocykgPT4ge1xyXG4gICAgICAgICAgICBfLmVhY2gocy5saW5rcywgKGwpID0+IHtcclxuICAgICAgICAgICAgICAgIGwuY291bnQgPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDaGFuZ2VFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoTmF2TWVudUNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2TWVudVByb3ZpZGVyIGltcGxlbWVudHMgSU5hdk1lbnVQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdk1lbnVDb25maWcgPSB7XHJcbiAgICAgICAgc2VjdGlvbnM6IFtdLFxyXG4gICAgICAgIGRlZmF1bHRJY29uOiAnaWNvbnM6Zm9sZGVyJ1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IE5hdk1lbnVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VjdGlvbnMoKTogTmF2TWVudVNlY3Rpb25bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlY3Rpb25zKHZhbHVlOiBOYXZNZW51U2VjdGlvbltdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZWZhdWx0SWNvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZGVmYXVsdEljb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkZWZhdWx0SWNvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmRlZmF1bHRJY29uID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBOYXZNZW51U2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2TWVudScpXHJcbiAgICAucHJvdmlkZXIoJ3BpcE5hdk1lbnUnLCBOYXZNZW51UHJvdmlkZXIpO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgncGlwTmF2TWVudScsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVHJhbnNsYXRlJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vTmF2TWVudVNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vTmF2TWVudSc7IiwiaW1wb3J0IHsgU2VhcmNoQ29uZmlnIH0gZnJvbSAnLi9TZWFyY2hDb25maWcnO1xyXG5pbXBvcnQgeyBJU2VhcmNoU2VydmljZSB9IGZyb20gJy4vSVNlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPcGVuU2VhcmNoRXZlbnQsIENsb3NlU2VhcmNoRXZlbnQsIFNlYXJjaENoYW5nZWRFdmVudCwgU2VhcmNoQWN0aXZhdGVkRXZlbnQgfSBmcm9tICcuL1NlYXJjaFNlcnZpY2UnO1xyXG5cclxuY2xhc3MgU2VhcmNoQmFyQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIGNsZWFyRm46IEZ1bmN0aW9uO1xyXG5cclxuICAgIHB1YmxpYyBjb25maWc6IFNlYXJjaENvbmZpZztcclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc2VhcmNoOiBhbnkgPSB7IHRleHQ6ICcnIH07XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICBwaXBTZWFyY2g6IElTZWFyY2hTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtc2VhcmNoLWJhcicpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHBpcFNlYXJjaC5jb25maWc7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJGbiA9ICRyb290U2NvcGUuJG9uKFNlYXJjaENoYW5nZWRFdmVudCwgKGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IFNlYXJjaENvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uU2VhcmNoQ2hhbmdlZChldmVudCwgY29uZmlnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJG9uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMuY2xlYXJGbikpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckZuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGVDaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCd3LXN0cmV0Y2gnKTtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5wYXJlbnQoKS5hZGRDbGFzcygncGlwLXNlYXJjaC1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygndy1zdHJldGNoJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3BpcC1zZWFyY2gtYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TZWFyY2hDaGFuZ2VkKGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IFNlYXJjaENvbmZpZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoLnRleHQgPSAnJztcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmb2N1c1RleHQoKTogdm9pZCB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50OiBKUXVlcnkgPSAkKCcucGlwLXNlYXJjaC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlYXJjaC50ZXh0ID0gdGhpcy5jb25maWcuY3JpdGVyaWE7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZvY3VzVGV4dCgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGljaygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2VhcmNoID0gdGhpcy5zZWFyY2gudGV4dDtcclxuXHJcbiAgICAgICAgdGhpcy5zZWFyY2gudGV4dCA9ICcnO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmNhbGxiYWNrKHNlYXJjaCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoU2VhcmNoQWN0aXZhdGVkRXZlbnQsIHNlYXJjaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2gudGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaC50ZXh0ID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUZXh0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICAvLyBFbnRlciBwcmVzc2VkXHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKVxyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgICAgICAvLyBFU0MgcHJlc3NlZFxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBTZWFyY2hCYXI6IG5nLklDb21wb25lbnRPcHRpb25zID0ge1xyXG4gICAgdGVtcGxhdGVVcmw6ICdzZWFyY2gvU2VhcmNoQmFyLmh0bWwnLFxyXG4gICAgY29udHJvbGxlcjogU2VhcmNoQmFyQ29udHJvbGxlclxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBTZWFyY2hCYXInKVxyXG4gICAgLmNvbXBvbmVudCgncGlwU2VhcmNoQmFyJywgU2VhcmNoQmFyKTtcclxuIiwiZXhwb3J0IGNsYXNzIFNlYXJjaENvbmZpZyB7XHJcbiAgICAvLyBTZWFyY2ggdmlzaWJsZVxyXG4gICAgcHVibGljIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICAvLyBTZWFyY2ggY3JpdGVyaWFcclxuICAgIHB1YmxpYyBjcml0ZXJpYTogc3RyaW5nO1xyXG4gICAgLy8gQ3VzdG9tIHNlYXJjaCBwYXJhbWV0ZXJzXHJcbiAgICBwdWJsaWMgcGFyYW1zOiBhbnk7XHJcbiAgICAvLyBIaXN0b3J5IGZvciBzZWFyY2ggYXV0b2NvbXBsZXRlXHJcbiAgICBwdWJsaWMgaGlzdG9yeTogc3RyaW5nW107XHJcbiAgICAvLyBDYWxsYmFjayBmb3Igc2VhcmNoXHJcbiAgICBjYWxsYmFjazogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn0iLCJpbXBvcnQgeyBTZWFyY2hDb25maWcgfSBmcm9tICcuL1NlYXJjaENvbmZpZyc7XHJcbmltcG9ydCB7IElTZWFyY2hQcm92aWRlciwgSVNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL0lTZWFyY2hTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBPcGVuU2VhcmNoRXZlbnQgPSAncGlwT3BlblNlYXJjaCc7XHJcbmV4cG9ydCBjb25zdCBDbG9zZVNlYXJjaEV2ZW50ID0gJ3BpcENsb3NlU2VhcmNoJztcclxuZXhwb3J0IGNvbnN0IFNlYXJjaENoYW5nZWRFdmVudCA9ICdwaXBTZWFyY2hDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IFNlYXJjaEFjdGl2YXRlZEV2ZW50ID0gJ3BpcFNlYXJjaEFjdGl2YXRlZCc7XHJcblxyXG5jbGFzcyBTZWFyY2hTZXJ2aWNlIGltcGxlbWVudHMgSVNlYXJjaFNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBTZWFyY2hDb25maWc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvbmZpZzogU2VhcmNoQ29uZmlnLFxyXG4gICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oT3BlblNlYXJjaEV2ZW50LCAoKSA9PiB7IHRoaXMub3BlbiB9KTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbihDbG9zZVNlYXJjaEV2ZW50LCAoKSA9PiB7IHRoaXMuY2xvc2UgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogU2VhcmNoQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY3JpdGVyaWEoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNyaXRlcmlhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY3JpdGVyaWEodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJhbXMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhcmFtcyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcmFtcyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBoaXN0b3J5KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmhpc3Rvcnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBoaXN0b3J5KHZhbHVlOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5oaXN0b3J5ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNhbGxiYWNrKCk6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2FsbGJhY2sodmFsdWU6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNhbGxiYWNrID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0KGNhbGxiYWNrOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZCwgY3JpdGVyaWE/OiBzdHJpbmcsIHBhcmFtcz86IGFueSwgaGlzdG9yeT86IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gY3JpdGVyaWE7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgICB0aGlzLl9jb25maWcuaGlzdG9yeSA9IGhpc3Rvcnk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJhbXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gIXRoaXMuX2NvbmZpZy52aXNpYmxlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoU2VhcmNoQ2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTZWFyY2hQcm92aWRlciBpbXBsZW1lbnRzIElTZWFyY2hQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IFNlYXJjaENvbmZpZyA9IG5ldyBTZWFyY2hDb25maWcoKTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IFNlYXJjaFNlcnZpY2UgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncGlwU2VhcmNoQmFyJylcclxuICAgIC5wcm92aWRlcigncGlwU2VhcmNoJywgU2VhcmNoUHJvdmlkZXIpO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgncGlwU2VhcmNoQmFyJywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9TZWFyY2hDb25maWcnO1xyXG5pbXBvcnQgJy4vSVNlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vU2VhcmNoU2VydmljZSc7XHJcbmltcG9ydCAnLi9TZWFyY2hCYXInO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9JU2VhcmNoU2VydmljZSc7XHJcbiIsImltcG9ydCB7IElTaWRlTmF2U2VydmljZSB9IGZyb20gJy4vSVNpZGVOYXZTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2lkZU5hdlN0YXRlTmFtZXMsIFNpZGVOYXZTdGF0ZSwgU2lkZU5hdlN0YXRlQ29uZmlnLCBTaWRlTmF2Q29uZmlnIH0gZnJvbSAnLi9TaWRlTmF2U3RhdGUnO1xyXG5cclxuY2xhc3MgU2lkZU5hdkNvbnRyb2xsZXIgaW1wbGVtZW50cyBJU2lkZU5hdkJpbmRpbmdzIHtcclxuICAgIHByaXZhdGUgX3BpcE1lZGlhOiBwaXAubGF5b3V0cy5JTWVkaWFTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfaXNSZXNpemluZzogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2FuaW1hdGlvbkR1cmF0aW9uOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tYWluQ29udGFpbmVyOiBzdHJpbmc7IC8vIHRvZG8gYWRkICB0byBjb25maWdcclxuICAgIHByaXZhdGUgX2JpZ1dpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9taWRkbGVXaWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfc21hbGxXaWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbWVkaWFCcmVha3BvaW50czogcGlwLmxheW91dHMuTWVkaWFCcmVha3BvaW50cztcclxuICAgIHByaXZhdGUgX25hdlN0YXRlOiBTaWRlTmF2U3RhdGVDb25maWc7XHJcbiAgICBwcml2YXRlIGNsZWFudXBNYWluUmVzaXplZDogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIGNsZWFudXBTaWRlTmF2U3RhdGU6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBjbGVhbnVwTmF2SGVhZGVyQ2hhbmdlZDogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIGNsZWFudXBTaWRlTmF2Q2hhbmdlZDogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIHdpbmRvd1Jlc2l6ZTogRnVuY3Rpb247XHJcblxyXG4gICAgcHVibGljIHNpZGVuYXZTdGF0ZTogU2lkZU5hdlN0YXRlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgJGF0dHJzOiBuZy5JQXR0cmlidXRlcyxcclxuICAgICAgICAkaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICRzY29wZTogYW5ndWxhci5JU2NvcGUsXHJcbiAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwaXBTaWRlTmF2OiBJU2lkZU5hdlNlcnZpY2UsXHJcbiAgICAgICAgbmF2Q29uc3RhbnQ6IGFueVxyXG5cclxuICAgICkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdGhpcy5fcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gPHBpcC5sYXlvdXRzLklNZWRpYVNlcnZpY2U+JGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX21haW5Db250YWluZXIgPSBuYXZDb25zdGFudC5TSURFTkFWX0NPTlRBSU5FUjtcclxuICAgICAgICB0aGlzLl9iaWdXaWR0aCA9IG5hdkNvbnN0YW50LlNJREVOQVZfTEFSR0VfV0lEVEg7XHJcbiAgICAgICAgdGhpcy5fbWlkZGxlV2lkdGggPSBuYXZDb25zdGFudC5TSURFTkFWX01JRERMRV9XSURUSDtcclxuICAgICAgICB0aGlzLl9zbWFsbFdpZHRoID0gbmF2Q29uc3RhbnQuU0lERU5BVl9TTUFMTF9XSURUSDtcclxuICAgICAgICB0aGlzLl9pc1Jlc2l6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uRHVyYXRpb24gPSBuYXZDb25zdGFudC5TSURFTkFWX0FOSU1BVElPTl9EVVJBVElPTjtcclxuICAgICAgICB0aGlzLl9uYXZTdGF0ZSA9IG5ldyBTaWRlTmF2U3RhdGVDb25maWcoKTtcclxuICAgICAgICB0aGlzLl9tZWRpYUJyZWFrcG9pbnRzID0gdGhpcy5zZXRCcmVha3BvaW50cygpO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdwaXAtc3RpY2t5LXNpZGVuYXYnKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGlwU2lkZU5hdi5jb25maWcgJiYgdGhpcy5waXBTaWRlTmF2LmNvbmZpZy50eXBlICE9ICdwb3B1cCcpIHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNpZGVOYXZlU3RhdGUoKVxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5kb3dSZXNpemUgPSBfLmRlYm91bmNlKCgpID0+IHsgdGhpcy5zZXRTaWRlTmF2ZVN0YXRlKCk7IH0sIDEwKTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhbnVwTWFpblJlc2l6ZWQgPSB0aGlzLiRyb290U2NvcGUuJG9uKCdwaXBNYWluUmVzaXplZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFudXBTaWRlTmF2U3RhdGUgPSB0aGlzLiRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGUnLCAoJGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBzdGF0ZTogU2lkZU5hdlN0YXRlTmFtZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TaWRlTmF2U3RhdGUoJGV2ZW50LCBzdGF0ZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5faXNSZXNpemluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNpZGVuYXZTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGlwU2lkZU5hdi5jb25maWcuYmFja2Ryb3AgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdwaXAtc2lkZW5hdi1oaWRlLWJhY2tkcm9wJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3BpcC1zaWRlbmF2LWhpZGUtYmFja2Ryb3AnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU2lkZU5hdlN0YXRlTmFtZXMuVG9nZ2xlKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYW51cE5hdkhlYWRlckNoYW5nZWQgPSB0aGlzLiRyb290U2NvcGUuJG9uKCdwaXBOYXZJY29uQ2xpY2tlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbk5hdkljb25DbGljaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2xlYW51cFNpZGVOYXZDaGFuZ2VkID0gdGhpcy4kcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdkNoYW5nZWQnLCAoJGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IFNpZGVOYXZDb25maWcpID0+IHsgLy9uYXZTdGF0ZVxyXG4gICAgICAgICAgICB0aGlzLm9uU2lkZU5hdkNoYW5nZWQoJGV2ZW50LCBjb25maWcpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkb25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGhpcy5jbGVhbnVwTmF2SGVhZGVyQ2hhbmdlZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhbnVwTmF2SGVhZGVyQ2hhbmdlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRoaXMuY2xlYW51cFNpZGVOYXZDaGFuZ2VkKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFudXBTaWRlTmF2Q2hhbmdlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRoaXMuY2xlYW51cE1haW5SZXNpemVkKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFudXBNYWluUmVzaXplZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRoaXMuY2xlYW51cFNpZGVOYXZTdGF0ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhbnVwU2lkZU5hdlN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0QnJlYWtwb2ludHMoKTogcGlwLmxheW91dHMuTWVkaWFCcmVha3BvaW50cyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9waXBNZWRpYSB8fCAhYW5ndWxhci5pc09iamVjdCh0aGlzLl9waXBNZWRpYS5icmVha3BvaW50cykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgeHM6IDYzOSwgc206IDk1OSwgbWQ6IDEwMjQsIGxnOiAxOTE5IH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BpcE1lZGlhLmJyZWFrcG9pbnRzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2lkZU5hdkNoYW5nZWQoJGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IFNpZGVOYXZDb25maWcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTmF2SWNvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGlwU2lkZU5hdi5vcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNpZGVOYXZTdGF0ZSgkZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIHN0YXRlTmFtZTogU2lkZU5hdlN0YXRlTmFtZXMpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhzdGF0ZU5hbWUpICYmIHRoaXMuX25hdlN0YXRlW3N0YXRlTmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2lkZU5hdmVTdGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5waXBTaWRlTmF2LmNvbmZpZyAmJiB0aGlzLnBpcFNpZGVOYXYuY29uZmlnLnR5cGUgPT0gJ3BvcHVwJykgeyByZXR1cm4gfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faXNSZXNpemluZykge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHsgdGhpcy5zZXRTaWRlTmF2ZVN0YXRlKCkgfSwgdGhpcy5fYW5pbWF0aW9uRHVyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1haW5XaWR0aDogbnVtYmVyID0gJCh0aGlzLl9tYWluQ29udGFpbmVyKS5pbm5lcldpZHRoKCk7XHJcbiAgICAgICAgbGV0IHNpZGVOYXZXaWR0aDogbnVtYmVyID0gJCgnLnBpcC1zdGlja3ktc2lkZW5hdicpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICBsZXQgY3VycmVudFdpZHRoOiBudW1iZXIgPSBzaWRlTmF2V2lkdGggPyBzaWRlTmF2V2lkdGggKyAyIDogMDsgLy8gYWRkIGJvcmRlciB3aWR0aFxyXG5cclxuICAgICAgICBpZiAobWFpbldpZHRoICsgY3VycmVudFdpZHRoIDwgdGhpcy5fbWVkaWFCcmVha3BvaW50cy5zbSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNpZGVOYXZTdGF0ZU5hbWVzLlRvZ2dsZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1haW5XaWR0aCArIGN1cnJlbnRXaWR0aCA8IHRoaXMuX21lZGlhQnJlYWtwb2ludHMubWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShTaWRlTmF2U3RhdGVOYW1lcy5TbWFsbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1haW5XaWR0aCArIGN1cnJlbnRXaWR0aCA8IHRoaXMuX21lZGlhQnJlYWtwb2ludHMubGcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShTaWRlTmF2U3RhdGVOYW1lcy5MYXJnZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTaWRlTmF2U3RhdGVOYW1lcy5YTGFyZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U3RhdGUoc3RhdGVOYW1lOiBTaWRlTmF2U3RhdGVOYW1lcykge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1Jlc2l6aW5nKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuc2lkZW5hdlN0YXRlICYmIHRoaXMuc2lkZW5hdlN0YXRlLmlkID09IHN0YXRlTmFtZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoc3RhdGVOYW1lICE9IFNpZGVOYXZTdGF0ZU5hbWVzLlRvZ2dsZSkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdzaWRlbmF2LW1vYmlsZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXRlTmFtZSAhPSBTaWRlTmF2U3RhdGVOYW1lcy5TbWFsbCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdwaXAtc3RpY2t5LW5hdi1zbWFsbCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXRlTmFtZSAhPSBTaWRlTmF2U3RhdGVOYW1lcy5YTGFyZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnc2lkZW5hdi1kZXNrdG9wJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdGVOYW1lICE9IFNpZGVOYXZTdGF0ZU5hbWVzLkxhcmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtc21hbGxkZXNrdG9wJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pc1Jlc2l6aW5nID0gdHJ1ZTtcclxuICAgICAgICAvKmlmIChzdGF0ZU5hbWUgPT0gU2lkZU5hdlN0YXRlTmFtZXMuVG9nZ2xlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIHRoaXMuc2lkZW5hdlN0YXRlID0gdGhpcy5fbmF2U3RhdGVbU3RyaW5nKHN0YXRlTmFtZSldO1xyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5zaWRlbmF2U3RhdGUuYWRkQ2xhc3MpO1xyXG5cclxuICAgICAgICB0aGlzLnBpcFNpZGVOYXYuc3RhdGUgPSB0aGlzLnNpZGVuYXZTdGF0ZTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgc2lkZU5hdiBTdGF0ZVxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpZGVOYXZlU3RhdGUoKVxyXG4gICAgICAgIH0sIDE1KTtcclxuXHJcbiAgICAgICAgLy8gY29tcGxldGUgYW5pbWF0aW9uXHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzUmVzaXppbmcgPSBmYWxzZTtcclxuICAgICAgICB9LCB0aGlzLl9hbmltYXRpb25EdXJhdGlvbik7IC8vYW5pbWF0aW9uRHVyYXRpb25cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5pbnRlcmZhY2UgSVNpZGVOYXZCaW5kaW5ncyB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbiAgICBzaWRlbmF2U3RhdGU6IGFueTtcclxufVxyXG5cclxuY29uc3QgU2lkZU5hdkJpbmRpbmdzOiBJU2lkZU5hdkJpbmRpbmdzID0ge1xyXG4gICAgc2lkZW5hdlN0YXRlOiAnPT8nXHJcbn07XHJcblxyXG4oKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IHNpZGVOYXY6IG5nLklDb21wb25lbnRPcHRpb25zID0ge1xyXG4gICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgYmluZGluZ3M6IFNpZGVOYXZCaW5kaW5ncyxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3NpZGVuYXYvU2lkZU5hdi5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBTaWRlTmF2Q29udHJvbGxlclxyXG4gICAgfTtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwU2lkZU5hdicpXHJcbiAgICAgICAgLmNvbXBvbmVudCgncGlwU2lkZW5hdicsIHNpZGVOYXYpO1xyXG5cclxufSkoKTsiLCJ7XHJcblxyXG4gICAgaW50ZXJmYWNlIElTaWRlTmF2UGFydEJpbmRpbmdzIHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbiAgICAgICAgdmlzaWJsZTogYW55XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgU2lkZU5hdlBhcnRCaW5kaW5nczogSVNpZGVOYXZQYXJ0QmluZGluZ3MgPSB7XHJcbiAgICAgICAgdmlzaWJsZTogJz0/J1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFNpZGVOYXZQYXJ0Q29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBwYXJ0TmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgcGFydFZhbHVlOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgICAgIHByaXZhdGUgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG4gICAgICAgICAgICAkZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSxcclxuICAgICAgICAgICAgJGF0dHJzOiBuZy5JQXR0cmlidXRlcyxcclxuICAgICAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgICAgIHBpcFNpZGVOYXYpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFydE5hbWUgPSAnJyArICRhdHRyc1sncGlwU2lkZW5hdlBhcnQnXTtcclxuICAgICAgICAgICAgdGhpcy5wb3MgPSB0aGlzLnBhcnROYW1lLmluZGV4T2YoJzonKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucG9zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0VmFsdWUgPSB0aGlzLnBhcnROYW1lLnN1YnN0cih0aGlzLnBvcyArIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0TmFtZSA9IHRoaXMucGFydE5hbWUuc3Vic3RyKDAsIHRoaXMucG9zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5vblNpZGVOYXZDaGFuZ2VkKG51bGwsIHBpcFNpZGVOYXYuY29uZmlnKVxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdkNoYW5nZWQnLCAoZXZlbnQsIGNvbmZpZykgPT4geyB0aGlzLm9uU2lkZU5hdkNoYW5nZWQoZXZlbnQsIGNvbmZpZykgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uU2lkZU5hdkNoYW5nZWQoZXZlbnQsIGNvbmZpZykge1xyXG4gICAgICAgICAgICBsZXQgcGFydHMgPSBjb25maWcucGFydHMgfHwge307XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UGFydFZhbHVlID0gcGFydHNbdGhpcy5wYXJ0TmFtZV07XHJcbiAgICAgICAgICAgIGxldCB2aXNpYmxlOiBib29sZWFuID0gISEodGhpcy5wYXJ0VmFsdWUgPyBjdXJyZW50UGFydFZhbHVlID09IHRoaXMucGFydFZhbHVlIDogY3VycmVudFBhcnRWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodmlzaWJsZSAhPSB0aGlzLiRzY29wZVsndmlzaWJsZSddKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGVbJ3Zpc2libGUnXSA9IHZpc2libGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNpZGVuYXZQYXJ0RGlyZWN0aXZlKG5nSWZEaXJlY3RpdmUpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcbiAgICAgICAgbGV0IG5nSWYgPSBuZ0lmRGlyZWN0aXZlWzBdO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiBuZ0lmLnRyYW5zY2x1ZGUsXHJcbiAgICAgICAgICAgIHByaW9yaXR5OiBuZ0lmLnByaW9yaXR5LFxyXG4gICAgICAgICAgICB0ZXJtaW5hbDogbmdJZi50ZXJtaW5hbCxcclxuICAgICAgICAgICAgcmVzdHJpY3Q6IG5nSWYucmVzdHJpY3QsXHJcbiAgICAgICAgICAgIHNjb3BlOiBTaWRlTmF2UGFydEJpbmRpbmdzLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiBsaW5rRnVuY3Rpb24oXHJcbiAgICAgICAgICAgICAgICAkc2NvcGU6IG5nLklTY29wZSxcclxuICAgICAgICAgICAgICAgICRlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgJGF0dHJzOiBuZy5JQXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICAgICAgJGF0dHJzWyduZ0lmJ10gPSAoKSA9PiB7IHJldHVybiAkc2NvcGVbJ3Zpc2libGUnXSB9O1xyXG4gICAgICAgICAgICAgICAgbmdJZi5saW5rLmFwcGx5KG5nSWYsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFNpZGVOYXZQYXJ0Q29udHJvbGxlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcFNpZGVOYXYnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcFNpZGVuYXZQYXJ0Jywgc2lkZW5hdlBhcnREaXJlY3RpdmUpO1xyXG5cclxufSIsImltcG9ydCB7IFNpZGVOYXZTdGF0ZSwgU2lkZU5hdkNvbmZpZyB9IGZyb20gXCIuL1NpZGVOYXZTdGF0ZVwiO1xyXG5pbXBvcnQgeyBJU2lkZU5hdlByb3ZpZGVyLCBJU2lkZU5hdlNlcnZpY2UgfSBmcm9tIFwiLi9JU2lkZU5hdlNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBTaWRlTmF2Q2hhbmdlZEV2ZW50ID0gJ3BpcFNpZGVOYXZDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IFNpZGVOYXZTdGF0ZUNoYW5nZWRFdmVudCA9ICdwaXBTaWRlTmF2U3RhdGVDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IE9wZW5TaWRlTmF2RXZlbnQgPSAncGlwT3BlblNpZGVOYXYnO1xyXG5leHBvcnQgY29uc3QgQ2xvc2VTaWRlTmF2RXZlbnQgPSAncGlwQ2xvc2VTaWRlTmF2JztcclxuXHJcbmNsYXNzIFNpZGVOYXZTZXJ2aWNlIGltcGxlbWVudHMgSVNpZGVOYXZTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogU2lkZU5hdkNvbmZpZztcclxuICAgIHByaXZhdGUgX3N0YXRlOiBhbnk7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvbmZpZzogU2lkZU5hdkNvbmZpZyxcclxuICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgJG1kU2lkZW5hdjogbmcubWF0ZXJpYWwuSVNpZGVuYXZTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IFNpZGVOYXZDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJ0cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gdmFsdWUgfHwge307XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXRlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc3RhdGUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gdmFsdWUgfHwge307XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoU2lkZU5hdlN0YXRlQ2hhbmdlZEV2ZW50LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGJhY2tkcm9wKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuYmFja2Ryb3A7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBiYWNrZHJvcCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5iYWNrZHJvcCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuKCkge1xyXG4gICAgICAgIHRoaXMuJG1kU2lkZW5hdigncGlwLXN0aWNreS1zaWRlbmF2Jykub3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLiRtZFNpZGVuYXYoJ3BpcC1zdGlja3ktc2lkZW5hdicpLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvZ2dsZSgpIHtcclxuICAgICAgICB0aGlzLiRtZFNpZGVuYXYoJ3BpcC1zdGlja3ktc2lkZW5hdicpLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY29uZmlnLnZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLnZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBfLnJlamVjdCh0aGlzLl9jb25maWcuY2xhc3NlcywgKGNjKSA9PiBjYyA9PSBjKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0c1twYXJ0XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KFNpZGVOYXZDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNpZGVOYXZQcm92aWRlciBpbXBsZW1lbnRzIElTaWRlTmF2UHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBTaWRlTmF2Q29uZmlnID0ge1xyXG4gICAgICAgIHBhcnRzOiB7fSxcclxuICAgICAgICBjbGFzc2VzOiBbXSxcclxuICAgICAgICB0eXBlOiAncG9wdXAnLFxyXG4gICAgICAgIGJhY2tkcm9wOiB0cnVlLFxyXG4gICAgICAgIHN0YXRlOiBudWxsLFxyXG4gICAgICAgIHZpc2libGU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogU2lkZU5hdlNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGdldCBiYWNrZHJvcCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmJhY2tkcm9wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYmFja2Ryb3AodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuYmFja2Ryb3AgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBTaWRlTmF2Q29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29uZmlnKHZhbHVlOiBTaWRlTmF2Q29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsdWUgfHwgbmV3IFNpZGVOYXZDb25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcnRzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhcnRzKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHMgPSB2YWx1ZSB8fCB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB2aXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsYXNzZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNsYXNzZXModmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMucHVzaChjKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2xhc3MoLi4uY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY2xhc3NlcywgKGMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsYXNzZXMgPSBfLnJlamVjdCh0aGlzLl9jb25maWcuY2xhc3NlcywgKGNjKSA9PiBjYyA9PSBjKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHNbcGFydF0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSwgJG1kU2lkZW5hdjogbmcubWF0ZXJpYWwuSVNpZGVuYXZTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IFNpZGVOYXZTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSwgJG1kU2lkZW5hdik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBob29rU2lkZU5hdkV2ZW50cygkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSwgcGlwU2lkZU5hdjogSVNpZGVOYXZTZXJ2aWNlKSB7XHJcbiAgICAkcm9vdFNjb3BlLiRvbihPcGVuU2lkZU5hdkV2ZW50LCAoKSA9PiB7IHBpcFNpZGVOYXYub3BlbigpOyB9KTtcclxuICAgICRyb290U2NvcGUuJG9uKENsb3NlU2lkZU5hdkV2ZW50LCAoKSA9PiB7IHBpcFNpZGVOYXYuY2xvc2UoKTsgfSk7XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcFNpZGVOYXYnKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBTaWRlTmF2JywgU2lkZU5hdlByb3ZpZGVyKVxyXG4gICAgLnJ1bihob29rU2lkZU5hdkV2ZW50cyk7XHJcbiIsImV4cG9ydCBjbGFzcyBTaWRlTmF2U3RhdGVOYW1lcyB7XHJcbiAgICBzdGF0aWMgVG9nZ2xlOiBzdHJpbmcgPSAndG9nZ2xlJztcclxuICAgIHN0YXRpYyBTbWFsbDogc3RyaW5nID0gJ3NtYWxsJztcclxuICAgIHN0YXRpYyBMYXJnZTogc3RyaW5nID0gJ2xhcmdlJztcclxuICAgIHN0YXRpYyBYTGFyZ2U6IHN0cmluZyA9ICd4bGFyZ2UnO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZU5hdlN0YXRlIHtcclxuICAgIGlkOiBTaWRlTmF2U3RhdGVOYW1lcztcclxuICAgIC8vIENsYXNzIHdoaWNoIGFkZGVkIHRvIHNpZGVuYXYgaW4gdGhpcyBzdGF0ZVxyXG4gICAgYWRkQ2xhc3M6IHN0cmluZztcclxuICAgIC8vIFNpZGUgbmF2IGFsd2F5cyBvcGVuXHJcbiAgICBpc0xvY2tlZE9wZW46IGJvb2xlYW47XHJcbiAgICAvLyBTaG93IFNpZGVOYXYgaGVhZGVyIFxyXG4gICAgc2hvd0hlYWRlcjogYm9vbGVhbjtcclxuICAgIC8vIFNob3cgZXhwYW5kZWQgYnV0dG9uXHJcbiAgICBleHBhbmRlZEJ1dHRvbjogYm9vbGVhbjtcclxuICAgIC8vIFNpZGVOYXYgaGFzIGV4cGFuZFxyXG4gICAgaXNFeHBhbmRlZDogYm9vbGVhbjtcclxuICAgIC8vIFNpZGVOYXYgaXMgRXhwYW5kZWQgaW4gdGhpcyBzdGF0ZSBieSBkZWZhdWx0XHJcbiAgICBleHBhbmQ6IGJvb2xlYW47XHJcbiAgICAvLyBUb29sdHlwZSBpcyBzaG93XHJcbiAgICBzaG93SWNvblRvb2x0eXBlOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZU5hdlN0YXRlQ29uZmlnIHtcclxuICAgIHRvZ2dsZTogU2lkZU5hdlN0YXRlID0geyAvLyBtZWRpYShzbSwgeHMpXHJcbiAgICAgICAgaWQ6IFNpZGVOYXZTdGF0ZU5hbWVzLlRvZ2dsZSxcclxuICAgICAgICBhZGRDbGFzczogJ3NpZGVuYXYtbW9iaWxlJyxcclxuICAgICAgICBzaG93SGVhZGVyOiB0cnVlLFxyXG4gICAgICAgIGlzTG9ja2VkT3BlbjogZmFsc2UsXHJcbiAgICAgICAgZXhwYW5kZWRCdXR0b246IGZhbHNlLFxyXG4gICAgICAgIGlzRXhwYW5kZWQ6IHRydWUsXHJcbiAgICAgICAgZXhwYW5kOiB0cnVlLFxyXG4gICAgICAgIHNob3dJY29uVG9vbHR5cGU6IGZhbHNlXHJcbiAgICB9O1xyXG4gICAgc21hbGw6IFNpZGVOYXZTdGF0ZSA9IHsgLy8gbWVkaWEobWQpXHJcbiAgICAgICAgaWQ6IFNpZGVOYXZTdGF0ZU5hbWVzLlNtYWxsLFxyXG4gICAgICAgIGFkZENsYXNzOiAncGlwLXN0aWNreS1uYXYtc21hbGwgc2lkZW5hdi1zbWFsbGRlc2t0b3AnLFxyXG4gICAgICAgIHNob3dIZWFkZXI6IGZhbHNlLFxyXG4gICAgICAgIGlzTG9ja2VkT3BlbjogdHJ1ZSxcclxuICAgICAgICBleHBhbmRlZEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgaXNFeHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgZXhwYW5kOiBmYWxzZSxcclxuICAgICAgICBzaG93SWNvblRvb2x0eXBlOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgbGFyZ2U6IFNpZGVOYXZTdGF0ZSA9IHsgLy8gbWVkaWEobGcpXHJcbiAgICAgICAgaWQ6IFNpZGVOYXZTdGF0ZU5hbWVzLkxhcmdlLFxyXG4gICAgICAgIGFkZENsYXNzOiAnc2lkZW5hdi1zbWFsbGRlc2t0b3AnLFxyXG4gICAgICAgIHNob3dIZWFkZXI6IGZhbHNlLFxyXG4gICAgICAgIGlzTG9ja2VkT3BlbjogdHJ1ZSxcclxuICAgICAgICBleHBhbmRlZEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBpc0V4cGFuZGVkOiB0cnVlLFxyXG4gICAgICAgIGV4cGFuZDogdHJ1ZSxcclxuICAgICAgICBzaG93SWNvblRvb2x0eXBlOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgeGxhcmdlOiBTaWRlTmF2U3RhdGUgPSB7IC8vIG1lZGlhKHhsKVxyXG4gICAgICAgIGlkOiBTaWRlTmF2U3RhdGVOYW1lcy5YTGFyZ2UsXHJcbiAgICAgICAgYWRkQ2xhc3M6ICdzaWRlbmF2LWRlc2t0b3AnLFxyXG4gICAgICAgIHNob3dIZWFkZXI6IGZhbHNlLFxyXG4gICAgICAgIGlzTG9ja2VkT3BlbjogdHJ1ZSxcclxuICAgICAgICBleHBhbmRlZEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgaXNFeHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICBleHBhbmQ6IHRydWUsXHJcbiAgICAgICAgc2hvd0ljb25Ub29sdHlwZTogZmFsc2VcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlTmF2Q29uZmlnIHtcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxuICAgIHN0YXRlOiBTaWRlTmF2U3RhdGU7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBiYWNrZHJvcDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICB2aXNpYmxlOiBib29sZWFuO1xyXG59IiwiYW5ndWxhci5tb2R1bGUoJ3BpcFNpZGVOYXYnLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9TaWRlTmF2U3RhdGUnO1xyXG5pbXBvcnQgJy4vU2lkZU5hdlNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vU2lkZU5hdlBhcnQnO1xyXG5pbXBvcnQgJy4vU2lkZU5hdic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL1NpZGVOYXZTZXJ2aWNlJzsiLCJcclxuZXhwb3J0IGNsYXNzIFBpcFRhYiB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG59XHJcblxyXG57XHJcbiAgICBpbnRlcmZhY2UgSVRhYnNCaW5kaW5ncyB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55O1xyXG5cclxuICAgICAgICBuZ0Rpc2FibGVkOiBhbnk7XHJcbiAgICAgICAgdGFiczogYW55O1xyXG4gICAgICAgIHNob3dUYWJzOiBhbnk7XHJcbiAgICAgICAgc2hvd1RhYnNTaGFkb3c6IGFueTtcclxuICAgICAgICBhY3RpdmVJbmRleDogYW55O1xyXG4gICAgICAgIHNlbGVjdDogYW55O1xyXG4gICAgICAgIGJyZWFrcG9pbnRzOiBhbnk7XHJcbiAgICAgICAgdGhlbWVDbGFzczogYW55O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IFRhYnNCaW5kaW5nczogSVRhYnNCaW5kaW5ncyA9IHtcclxuICAgICAgICBuZ0Rpc2FibGVkOiAnJj8nLCAvLyBmdW5jdGlvblxyXG4gICAgICAgIHRhYnM6ICc8cGlwVGFicycsIC8vIFBpcFRhYltdXHJcbiAgICAgICAgc2hvd1RhYnM6ICcmcGlwU2hvd1RhYnMnLCAvLyBmdW5jdGlvblxyXG4gICAgICAgIHNob3dUYWJzU2hhZG93OiAnJnBpcFRhYnNTaGFkb3cnLCAvLyBmdW5jdGlvblxyXG4gICAgICAgIGFjdGl2ZUluZGV4OiAnPD9waXBBY3RpdmVJbmRleCcsIC8vIG51bWJlclxyXG4gICAgICAgIHNlbGVjdDogJz1waXBUYWJzU2VsZWN0JywgLy8gZnVuY3Rpb25cclxuICAgICAgICBicmVha3BvaW50czogJzw/cGlwQnJlYWtwb2ludHMnLCAvLyBzdHJpbmdcclxuICAgICAgICB0aGVtZUNsYXNzOiAnPD90aGVtZUNsYXNzJywgLy8gc3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFic0NoYW5nZXMgaW1wbGVtZW50cyBuZy5JT25DaGFuZ2VzT2JqZWN0LCBJVGFic0JpbmRpbmdzIHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBuZy5JQ2hhbmdlc09iamVjdDxhbnk+O1xyXG4gICAgICAgIC8vIE5vdCBvbmUgd2F5IGJpbmRpbmdzXHJcbiAgICAgICAgbmdEaXNhYmxlZDogbmcuSUNoYW5nZXNPYmplY3Q8KCkgPT4gbmcuSVByb21pc2U8dm9pZD4+O1xyXG4gICAgICAgIHRhYnM6IG5nLklDaGFuZ2VzT2JqZWN0PFBpcFRhYltdPjtcclxuICAgICAgICBzaG93VGFiczogbmcuSUNoYW5nZXNPYmplY3Q8KCkgPT4gbmcuSVByb21pc2U8dm9pZD4+O1xyXG4gICAgICAgIHNob3dUYWJzU2hhZG93OiBuZy5JQ2hhbmdlc09iamVjdDwoKSA9PiBuZy5JUHJvbWlzZTx2b2lkPj47XHJcbiAgICAgICAgYWN0aXZlSW5kZXg6IG5nLklDaGFuZ2VzT2JqZWN0PG51bWJlcj47XHJcbiAgICAgICAgc2VsZWN0OiBuZy5JQ2hhbmdlc09iamVjdDwoKSA9PiBuZy5JUHJvbWlzZTx2b2lkPj47XHJcbiAgICAgICAgYnJlYWtwb2ludHM6IG5nLklDaGFuZ2VzT2JqZWN0PHN0cmluZz47XHJcbiAgICAgICAgdGhlbWVDbGFzczogbmcuSUNoYW5nZXNPYmplY3Q8c3RyaW5nPjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJzRGlyZWN0aXZlQ29udHJvbGxlciBpbXBsZW1lbnRzIElUYWJzQmluZGluZ3Mge1xyXG4gICAgICAgIHByaXZhdGUgX3BpcFRyYW5zbGF0ZTogcGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlO1xyXG4gICAgICAgIHByaXZhdGUgX3BpcFRoZW1lOiBwaXAudGhlbWVzLklUaGVtZVNlcnZpY2U7XHJcbiAgICAgICAgcHJpdmF0ZSBwaXBNZWRpYTtcclxuICAgICAgICBwcml2YXRlIHNlbGVjdGVkVGFiSWQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIG5nRGlzYWJsZWQ6IEZ1bmN0aW9uO1xyXG4gICAgICAgIHB1YmxpYyB0YWJzOiBQaXBUYWJbXTtcclxuICAgICAgICBwdWJsaWMgYWN0aXZlSW5kZXg6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgYnJlYWtwb2ludHM6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgc2hvd1RhYnM6IEZ1bmN0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBzaG93VGFic1NoYWRvdzogRnVuY3Rpb247XHJcbiAgICAgICAgcHVibGljIHNlbGVjdDogRnVuY3Rpb247XHJcbiAgICAgICAgcHVibGljIHRoZW1lQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIGN1cnJlbnRUaGVtZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgY2hhbmdlOiAoKSA9PiBuZy5JUHJvbWlzZTxhbnk+O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHJpdmF0ZSAkZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlIG5hdkNvbnN0YW50OiBhbnksXHJcbiAgICAgICAgICAgICRtZE1lZGlhOiBhbmd1bGFyLm1hdGVyaWFsLklNZWRpYVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFRoZW1lKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGlwTWVkaWEgPSB0aGlzLiRpbmplY3Rvci5oYXMoJ3BpcE1lZGlhJykgPyA8cGlwLmxheW91dHMuSU1lZGlhU2VydmljZT50aGlzLiRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiAkbWRNZWRpYTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5icmVha3BvaW50cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5icmVha3BvaW50cyA9IHRoaXMubmF2Q29uc3RhbnQuVEFCX0JSRUFLUE9JTlQ7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldFRoZW1lKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9waXBUaGVtZSA9IHRoaXMuJGluamVjdG9yLmhhcygncGlwVGhlbWUnKSA/IDxwaXAudGhlbWVzLklUaGVtZVNlcnZpY2U+dGhpcy4kaW5qZWN0b3IuZ2V0KCdwaXBUaGVtZScpIDogbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BpcFRoZW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUaGVtZSA9IHRoaXMuX3BpcFRoZW1lLnRoZW1lO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHJvb3RTY29wZVsnJHRoZW1lJ10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRoZW1lID0gdGhpcy4kcm9vdFNjb3BlWyckdGhlbWUnXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50aGVtZUNsYXNzID0gKHRoaXMudGhlbWVDbGFzcyB8fCAnJykgKyAnIG1kLScgKyB0aGlzLmN1cnJlbnRUaGVtZSArICctdGhlbWUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRUcmFuc2xhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BpcFRyYW5zbGF0ZSA9IHRoaXMuJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyA8cGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlPnRoaXMuJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGlwVHJhbnNsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YWJzLmxlbmd0aCA+IDAgJiYgdGhpcy50YWJzWzBdLnRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZU9iamVjdHModGhpcy50YWJzLCAndGl0bGUnLCAnbmFtZUxvY2FsJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BpcFRyYW5zbGF0ZS50cmFuc2xhdGVPYmplY3RzKHRoaXMudGFicywgJ25hbWUnLCAnbmFtZUxvY2FsJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMubmdEaXNhYmxlZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5nRGlzYWJsZWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvQm9vbGVhbih0aGlzLm5nRGlzYWJsZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHVibGljIHRhYkRpc2FibGVkKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmlzRGlzYWJsZWQoKSAmJiB0aGlzLmFjdGl2ZUluZGV4ICE9IGluZGV4KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgb25TZWxlY3QoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rpc2FibGVkKCkpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiSWQgPSB0aGlzLnRhYnMubGVuZ3RoID49IHRoaXMuYWN0aXZlSW5kZXggPyB0aGlzLnRhYnNbdGhpcy5hY3RpdmVJbmRleF0uaWQgOiBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KHRoaXMudGFic1t0aGlzLmFjdGl2ZUluZGV4XSwgdGhpcy5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgc2hvd1NoYWRvdygpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLnNob3dUYWJzU2hhZG93KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1RhYnNTaGFkb3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvQm9vbGVhbih0aGlzLnNob3dUYWJzU2hhZG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHB1YmxpYyBzaG93KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2hvd1RhYnMpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMuc2hvd1RhYnMpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93VGFicygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9Cb29sZWFuKHRoaXMuc2hvd1RhYnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHVibGljIHRvQm9vbGVhbih2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PSAnMScgfHwgdmFsdWUgPT0gJ3RydWUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljICRvbkNoYW5nZXMoY2hhbmdlczogVGFic0NoYW5nZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghY2hhbmdlcy5icmVha3BvaW50cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmJyZWFrcG9pbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icmVha3BvaW50cyA9IHRoaXMubmF2Q29uc3RhbnQuVEFCX0JSRUFLUE9JTlQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5icmVha3BvaW50cyA9IGNoYW5nZXMuYnJlYWtwb2ludHMuY3VycmVudFZhbHVlID8gY2hhbmdlcy5icmVha3BvaW50cy5jdXJyZW50VmFsdWUgOiB0aGlzLm5hdkNvbnN0YW50LlRBQl9CUkVBS1BPSU5UXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmFjdGl2ZUluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hY3RpdmVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IGNoYW5nZXMuYWN0aXZlSW5kZXguY3VycmVudFZhbHVlIHx8IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kdGltZW91dCAmJiB0aGlzLmFjdGl2ZUluZGV4ICE9PSBjaGFuZ2VzLmFjdGl2ZUluZGV4LnByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGEgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ21kLXRhYnMtY2FudmFzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhICYmIGFbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChhWzBdKS5hdHRyKCdhY3RpdmVJbmRleCcsIHRoaXMuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGEub24oJ2ZvY3Vzb3V0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGFbMF0pLmF0dHIoJ2FjdGl2ZUluZGV4JywgdGhpcy5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoYVswXSkuYXR0cignYWN0aXZlSW5kZXgnLCB0aGlzLmFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLnRhYnMgPT09IHVuZGVmaW5lZCB8fCAhXy5pc0FycmF5KGNoYW5nZXMudGFicy5jdXJyZW50VmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGFicykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFicyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWJzID0gY2hhbmdlcy50YWJzLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghY2hhbmdlcy5hY3RpdmVJbmRleCAmJiBjaGFuZ2VzLnRhYnMgJiYgdGhpcy5zZWxlY3RlZFRhYklkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gXy5pbmRleE9mKHRoaXMudGFicywgXy5maW5kKHRoaXMudGFicywge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnNlbGVjdGVkVGFiSWRcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiSWQgPSB0aGlzLnRhYnMubGVuZ3RoID49IHRoaXMuYWN0aXZlSW5kZXggPyB0aGlzLnRhYnNbdGhpcy5hY3RpdmVJbmRleF0uaWQgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYnMubGVuZ3RoID4gMCAmJiB0aGlzLmFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiSWQgPSB0aGlzLnRhYnMubGVuZ3RoID49IHRoaXMuYWN0aXZlSW5kZXggPyB0aGlzLnRhYnNbdGhpcy5hY3RpdmVJbmRleF0uaWQgOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBUYWJzOiBuZy5JQ29tcG9uZW50T3B0aW9ucyA9IHtcclxuICAgICAgICBiaW5kaW5nczogVGFic0JpbmRpbmdzLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGFicy9UYWJzLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IFRhYnNEaXJlY3RpdmVDb250cm9sbGVyXHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcFRhYnMnLCBbJ3BpcE5hdi5UZW1wbGF0ZXMnXSlcclxuICAgICAgICAuY29tcG9uZW50KCdwaXBUYWJzJywgVGFicyk7XHJcbn1cclxuIiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2FjdGlvbnMvUHJpbWFyeUFjdGlvbnMuaHRtbCcsXG4gICAgJzxkaXYgcGlwLWZvY3VzZWQ9XCJcIiBwaXAtZm9jdXNlZC10YWJpbmRleD1cIjJcIj48bWQtbWVudSBtZC1wb3NpdGlvbi1tb2RlPVwidGFyZ2V0LXJpZ2h0IHRhcmdldFwiIGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9uc1wiIG5nLXJlcGVhdD1cImFjdGlvbiBpbiAkY3RybC5jb25maWcucHJpbWFyeUxvY2FsQWN0aW9uc1wiPjxtZC1idXR0b24gY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zLWFjdGlvbiBtZC1pY29uLWJ1dHRvbiBwaXAtZm9jdXNhYmxlXCIgbmctY2xpY2s9XCIkY3RybC5jbGlja0FjdGlvbihhY3Rpb24sICRtZE9wZW5NZW51KTtcIiB0YWJpbmRleD1cIi0xXCIgbmctaGlkZT1cIiRjdHJsLmlzSGlkZGVuKGFjdGlvbilcIiBhcmlhLWxhYmVsPVwie3sgYWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlIH19XCI+PGRpdiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnMtYmFkZ2VcIiBuZy1zaG93PVwiYWN0aW9uLmNvdW50ID4gMFwiPnt7ICRjdHJsLmFjdGlvbkNvdW50KGFjdGlvbikgfX08L2Rpdj48bWQtaWNvbiBtZC1zdmctaWNvbj1cInt7IGFjdGlvbi5pY29ufX1cIj48L21kLWljb24+PC9tZC1idXR0b24+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cInN1YkFjdGlvbiBpbiBhY3Rpb24uc3ViQWN0aW9uc1wiIG5nLWlmPVwiIXN1YkFjdGlvbi5kaXZpZGVyXCIgbmctaGlkZT1cIiRjdHJsLmlzSGlkZGVuKHN1YkFjdGlvbilcIj48bWQtYnV0dG9uIGNsYXNzPVwicGlwLWZvY3VzYWJsZVwiIG5nLWhpZGU9XCJzdWJBY3Rpb24uZGl2aWRlclwiIHRhYmluZGV4PVwiLTFcIiBuZy1jbGljaz1cIiRjdHJsLmNsaWNrQWN0aW9uKHN1YkFjdGlvbilcIj57eyA6OnN1YkFjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJzdWJBY3Rpb24uZGl2aWRlclwiIG5nLXJlcGVhdC1lbmQ9XCJcIj48L21kLW1lbnUtZGl2aWRlcj48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+PG1kLW1lbnUgbWQtcG9zaXRpb24tbW9kZT1cInRhcmdldC1yaWdodCB0YXJnZXRcIiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnNcIiBuZy1yZXBlYXQ9XCJhY3Rpb24gaW4gJGN0cmwuY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zXCI+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnMtYWN0aW9uIG1kLWljb24tYnV0dG9uIHBpcC1mb2N1c2FibGVcIiBuZy1jbGljaz1cIiRjdHJsLmNsaWNrQWN0aW9uKGFjdGlvbiwgJG1kT3Blbk1lbnUpO1wiIG5nLWhpZGU9XCIkY3RybC5pc0hpZGRlbihhY3Rpb24pXCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtbGFiZWw9XCJ7eyBhY3Rpb24udGl0bGUgfCB0cmFuc2xhdGUgfX1cIj48ZGl2IGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9ucy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLXNob3c9XCJhY3Rpb24uY291bnQgPiAwXCI+e3sgJGN0cmwuYWN0aW9uQ291bnQoYWN0aW9uKSB9fTwvZGl2PjxtZC1pY29uIG1kLXN2Zy1pY29uPVwie3sgYWN0aW9uLmljb24gfX1cIj48L21kLWljb24+PC9tZC1idXR0b24+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cInN1YkFjdGlvbiBpbiBhY3Rpb24uc3ViQWN0aW9uc1wiIG5nLWlmPVwiIXN1YkFjdGlvbi5kaXZpZGVyXCIgbmctaGlkZT1cIiRjdHJsLmlzSGlkZGVuKHN1YkFjdGlvbilcIj48bWQtYnV0dG9uIGNsYXNzPVwicGlwLWZvY3VzYWJsZVwiIG5nLWhpZGU9XCJzdWJBY3Rpb24uZGl2aWRlclwiIHRhYmluZGV4PVwiLTFcIiBuZy1jbGljaz1cIiRjdHJsLmNsaWNrQWN0aW9uKHN1YkFjdGlvbilcIj57eyBzdWJBY3Rpb24udGl0bGUgfCB0cmFuc2xhdGUgfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwic3ViQWN0aW9uLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9ucy5odG1sJyxcbiAgICAnPG1kLW1lbnUgbmctaWY9XCIkY3RybC5zZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSgpXCIgbWQtcG9zaXRpb24tbW9kZT1cInRhcmdldC1yaWdodCB0YXJnZXRcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiB0YWJpbmRleD1cIjNcIiBuZy1pbml0PVwiJGN0cmwuZ2V0TWVudSgkbWRPcGVuTWVudSlcIiBuZy1jbGljaz1cIiRjdHJsLm9uU2Vjb25kYXJ5QWN0aW9uQ2xpY2soKTsgJGN0cmwub3Blbk1lbnUoJG1kT3Blbk1lbnUsICRldmVudCk7XCIgYXJpYS1sYWJlbD1cIm9wZW4gYWN0aW9uc1wiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6dmRvdHNcIj48L21kLWljb24+PC9tZC1idXR0b24+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjNcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cImFjdGlvbiBpbiAkY3RybC5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zXCIgbmctaWY9XCIhYWN0aW9uLmRpdmlkZXJcIiBuZy1oaWRlPVwiJGN0cmwuaXNIaWRkZW4oYWN0aW9uKVwiPjxtZC1idXR0b24gbmctaGlkZT1cImFjdGlvbi5kaXZpZGVyXCIgbmctY2xpY2s9XCIkY3RybC5jbGlja0FjdGlvbihhY3Rpb24pXCI+e3sgOjphY3Rpb24udGl0bGUgfCB0cmFuc2xhdGUgfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwiYWN0aW9uLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cIiRjdHJsLnNlY29uZGFyeURpdmlkZXJWaXNpYmxlKClcIj48L21kLW1lbnUtZGl2aWRlcj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdC1zdGFydD1cImFjdGlvbiBpbiAkY3RybC5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9uc1wiIG5nLWlmPVwiIWFjdGlvbi5kaXZpZGVyXCIgbmctaGlkZT1cIiRjdHJsLmlzSGlkZGVuKGFjdGlvbilcIj48bWQtYnV0dG9uIG5nLWhpZGU9XCJhY3Rpb24uZGl2aWRlclwiIG5nLWNsaWNrPVwiJGN0cmwuY2xpY2tBY3Rpb24oYWN0aW9uKVwiPnt7IDo6YWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cImFjdGlvbi5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdhcHBiYXIvQXBwQmFyLmh0bWwnLFxuICAgICc8bWQtdG9vbGJhciBjbGFzcz1cInt7ICRjdHJsLmNvbmZpZy5jbGFzc2VzLmpvaW4oXFwnIFxcJykgfX1cIiBuZy1pZj1cIiRjdHJsLmNvbmZpZy52aXNpYmxlXCIgbmctdHJhbnNjbHVkZT1cIlwiPjwvbWQtdG9vbGJhcj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdicmVhZGNydW1iL0JyZWFkY3J1bWIuaHRtbCcsXG4gICAgJzxkaXYgY2xhc3M9XCJwaXAtYnJlYWRjcnVtYi1ibG9ja1wiPjxkaXYgY2xhc3M9XCJ0ZXh0LW92ZXJmbG93XCIgbmctaWY9XCIhJGN0cmwuX21lZGlhKFxcJ3hzXFwnKVwiPjxzcGFuIG5nLWlmPVwiJGN0cmwuY29uZmlnLmNyaXRlcmlhXCIgbmctY2xpY2s9XCIkY3RybC5vcGVuU2VhcmNoKClcIj57eyAkY3RybC5jb25maWcuY3JpdGVyaWEgfX0gLTwvc3Bhbj48c3BhbiBjbGFzcz1cInBpcC1icmVhZGNydW1iLWl0ZW0ge3sgJGxhc3QgPyBcXCdicmVhZGNydW1iLWFjY2VudFxcJyA6IFxcJ1xcJyB9fVwiIG5nLWlmPVwiJGN0cmwuY29uZmlnLml0ZW1zICYmICRjdHJsLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAwXCIgbmctcmVwZWF0LXN0YXJ0PVwiaXRlbSBpbiAkY3RybC5jb25maWcuaXRlbXNcIiBuZy1jbGljaz1cIiRjdHJsLm9uQ2xpY2soaXRlbSlcIiBuZy1pbml0PVwic3RlcFdpZHRoID0gMTAwLygkY3RybC5jb25maWcuaXRlbXMubGVuZ3RoICsgMSlcIiBuZy1jbGFzcz1cIntcXCdjdXJzb3ItcG9pbnRlclxcJzogISRsYXN0fVwiIG5nLXN0eWxlPVwie1xcJ21heC13aWR0aFxcJzogc3RlcFdpZHRoICsgXFwnJVxcJ31cIj48c3BhbiBuZy1pZj1cIiEkbGFzdCB8fCAhJGN0cmwuYWN0aW9uc1Zpc2libGUoaXRlbSlcIj57eyBpdGVtLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9zcGFuPjxkaXYgbmctaWY9XCIkbGFzdCAmJiAkY3RybC5hY3Rpb25zVmlzaWJsZShpdGVtKVwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7XCI+PG1kLW1lbnUgbWQtb2Zmc2V0PVwiMCA0NFwiPjxzcGFuIGNsYXNzPVwibGF5b3V0LXJvdyBwaXAtYnJlYWRjcnVtYi1pdGVtLW1lbnUgY3Vyc29yLXBvaW50ZXIge3sgJGxhc3QgPyBcXCdicmVhZGNydW1iLWFjY2VudFxcJyA6IFxcJ1xcJyB9fVwiIG5nLWNsaWNrPVwiJGN0cmwub25PcGVuTWVudSgkbWRPcGVuTWVudSwgJGV2ZW50KVwiIG1kLWluay1yaXBwbGU9XCJcIiBhcmlhLWxhYmVsPVwib3BlbiBicmVhZGNydW1iIGFjdGlvbnNcIj57eyBpdGVtLnRpdGxlIHwgdHJhbnNsYXRlIH19PG1kLWljb24gY2xhc3M9XCJwaXAtdHJpYW5nbGUtZG93blwiIG1kLXN2Zy1pY29uPVwiaWNvbnM6dHJpYW5nbGUtZG93blwiPjwvbWQtaWNvbj48L3NwYW4+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjRcIj48bWQtbWVudS1pdGVtIG5nLWlmPVwiIXN1Ykl0ZW0uZGl2aWRlclwiIG5nLXJlcGVhdC1zdGFydD1cInN1Ykl0ZW0gaW4gaXRlbS5zdWJBY3Rpb25zXCI+PG1kLWJ1dHRvbiBuZy1jbGljaz1cIiRjdHJsLm9uU3ViQWN0aW9uQ2xpY2soc3ViSXRlbSlcIiBuZy1pZj1cIiFhY3Rpb24uZGl2aWRlclwiIHRhYmluZGV4PVwiNFwiPjxtZC1pY29uIG1kLW1lbnUtYWxpZ24tdGFyZ2V0PVwiXCIgbmctaWY9XCJzdWJJdGVtLmljb25cIiBtZC1zdmctaWNvbj1cInt7IHN1Ykl0ZW0uaWNvbiB9fVwiPjwvbWQtaWNvbj48c3Bhbj57eyBzdWJJdGVtLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9zcGFuPjwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJzdWJJdGVtLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PjwvZGl2Pjwvc3Bhbj48bWQtaWNvbiBuZy1yZXBlYXQtZW5kPVwiXCIgbWQtc3ZnLWljb249XCJpY29uczpjaGV2cm9uLXJpZ2h0XCIgbmctaGlkZT1cIiRsYXN0XCI+PC9tZC1pY29uPjxzcGFuIGNsYXNzPVwicGlwLXRpdGxlIGJyZWFkY3J1bWItYWNjZW50XCIgbmctaWY9XCIkY3RybC5jb25maWcudGV4dFwiPnt7ICRjdHJsLmNvbmZpZy50ZXh0IHwgdHJhbnNsYXRlIH19PC9zcGFuPjwvZGl2PjxkaXYgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgbmctaWY9XCIkY3RybC5fbWVkaWEoXFwneHNcXCcpXCI+PG1kLW1lbnUgbWQtb2Zmc2V0PVwiMCA0NFwiPjxzcGFuIGNsYXNzPVwicGlwLW1vYmlsZS1icmVhZGNydW1iIGxheW91dC1yb3dcIiBuZy1jbGljaz1cIiRjdHJsLmNvbmZpZy5pdGVtcyAmJiAkY3RybC5jb25maWcuaXRlbXMubGVuZ3RoID4gMSA/ICRtZE9wZW5NZW51KCkgOiByZXR1cm5cIj48c3BhbiBjbGFzcz1cInRleHQtb3ZlcmZsb3dcIj48c3BhbiBuZy1pZj1cIiRjdHJsLmNvbmZpZy5jcml0ZXJpYVwiIG5nLWNsaWNrPVwiJGN0cmwub3BlblNlYXJjaCgpXCI+e3sgJGN0cmwuY29uZmlnLmNyaXRlcmlhIH19IC08L3NwYW4+IDxzcGFuIGNsYXNzPVwiYnJlYWRjcnVtYi1hY2NlbnRcIiBuZy1pZj1cIiRjdHJsLmNvbmZpZy50ZXh0XCI+e3sgJGN0cmwuY29uZmlnLnRleHQgfCB0cmFuc2xhdGUgfX08L3NwYW4+IDxzcGFuIG5nLWlmPVwiJGN0cmwuY29uZmlnLml0ZW1zICYmICRjdHJsLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAwXCIgY2xhc3M9XCJicmVhZGNydW1iLWFjY2VudCB7eyAoJGN0cmwuY29uZmlnLml0ZW1zICYmICRjdHJsLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAxKSA/IFxcJ2N1cnNvci1wb2ludGVyXFwnIDogXFwnXFwnIH19XCI+e3sgJGN0cmwuY29uZmlnLml0ZW1zWyRjdHJsLmNvbmZpZy5pdGVtcy5sZW5ndGggLSAxXS50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj48L3NwYW4+PG1kLWljb24gY2xhc3M9XCJwaXAtdHJpYW5nbGUtZG93biBjdXJzb3ItcG9pbnRlciBicmVhZGNydW1iLWFjY2VudFwiIG1kLXN2Zy1pY29uPVwiaWNvbnM6dHJpYW5nbGUtZG93blwiIG5nLWlmPVwiJGN0cmwuY29uZmlnLml0ZW1zICYmICRjdHJsLmNvbmZpZy5pdGVtcy5sZW5ndGggPiAxXCI+PC9tZC1pY29uPjwvc3Bhbj48bWQtbWVudS1jb250ZW50IHdpZHRoPVwiNFwiPjxtZC1tZW51LWl0ZW0gbmctcmVwZWF0PVwiaXRlbSBpbiAkY3RybC5jb25maWcuaXRlbXNcIiBuZy1pZj1cIiRjdHJsLmNvbmZpZy5pdGVtcyAmJiAkY3RybC5jb25maWcuaXRlbXMubGVuZ3RoID4gMFwiPjxtZC1idXR0b24gbmctY2xpY2s9XCIkY3RybC5vbkNsaWNrKGl0ZW0pXCIgdGFiaW5kZXg9XCI1XCI+PG1kLWljb24gbWQtbWVudS1hbGlnbi10YXJnZXQ9XCJcIiBuZy1pZj1cIml0ZW0uaWNvblwiIG1kLXN2Zy1pY29uPVwie3sgaXRlbS5pY29uIH19XCI+PC9tZC1pY29uPjxzcGFuPnt7IGl0ZW0udGl0bGUgfCB0cmFuc2xhdGUgfX08L3NwYW4+PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtaXRlbSBuZy1pZj1cIiRjdHJsLmNvbmZpZy50ZXh0XCI+PG1kLWJ1dHRvbiB0YWJpbmRleD1cIjVcIj48c3BhbiBjbGFzcz1cInRleHQtZ3JleVwiPnt7ICRjdHJsLmNvbmZpZy50ZXh0IHwgdHJhbnNsYXRlIH19PC9zcGFuPjwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT48L2Rpdj48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdkcm9wZG93bi9Ecm9wZG93bi5odG1sJyxcbiAgICAnPG1kLXRvb2xiYXIgY2xhc3M9XCJtZC1zdWJoZWFkIGNvbG9yLXByaW1hcnktYmcge3sgJGN0cmwudGhlbWVDbGFzc319XCIgbmctaWY9XCIkY3RybC5zaG93KClcIiBuZy1jbGFzcz1cIntcXCdtZC13aGl0ZWZyYW1lLTNkcFxcJzogJGN0cmwubWVkaWEoXFwneHNcXCcpfVwiPjxkaXYgY2xhc3M9XCJwaXAtZGl2aWRlclwiPjwvZGl2PjxtZC1zZWxlY3QgbmctbW9kZWw9XCIkY3RybC5zZWxlY3RlZEluZGV4XCIgdGFiaW5kZXg9XCIxNVwiIG5nLWRpc2FibGVkPVwiJGN0cmwuZGlzYWJsZWQoKVwiIG1kLWNvbnRhaW5lci1jbGFzcz1cInBpcC1mdWxsLXdpZHRoLWRyb3Bkb3duXCIgYXJpYS1sYWJlbD1cIkRST1BET1dOXCIgbWQtaW5rLXJpcHBsZT1cIlwiIG1kLW9uLWNsb3NlPVwiJGN0cmwub25TZWxlY3QoJGN0cmwuc2VsZWN0ZWRJbmRleClcIj48bWQtb3B0aW9uIG5nLXJlcGVhdD1cImFjdGlvbiBpbiAkY3RybC5hY3Rpb25zXCIgdmFsdWU9XCJ7eyA6OiRpbmRleCB9fVwiIG5nLXNlbGVjdGVkPVwiJGN0cmwuYWN0aXZlSW5kZXggPT0gJGluZGV4ID8gdHJ1ZSA6IGZhbHNlXCI+e3sgKGFjdGlvbi50aXRsZSB8fCBhY3Rpb24ubmFtZSB8fCBhY3Rpb24pIHwgdHJhbnNsYXRlIH19PC9tZC1vcHRpb24+PC9tZC1zZWxlY3Q+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2hlYWRlci9OYXZIZWFkZXIuaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIG5nLXNob3c9XCIkY3RybC5zaG93SGVhZGVyXCIgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXJcIj48ZGl2IGNsYXNzPVwiZmxleC1maXhlZCBwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlclwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIG5nLWNsaWNrPVwiJGN0cmwub25Vc2VyQ2xpY2soKVwiIGFyaWEtbGFiZWw9XCJjdXJyZW50IHVzZXJcIiB0YWJpbmRleD1cIi0xXCI+PGltZyBzcmM9XCJcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLWltYWdlXCIgbmctY2xhc3M9XCIkY3RybC5pbWFnZUNzc1wiPjwvbWQtYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci10ZXh0XCI+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyLXByaVwiIG5nLWNsaWNrPVwiJGN0cmwub25Vc2VyQ2xpY2soKVwiIHRhYmluZGV4PVwiLTFcIj57eyAkY3RybC50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci1zZWNcIj57eyAkY3RybC5zdWJ0aXRsZSB8IHRyYW5zbGF0ZSB9fTwvZGl2PjwvZGl2PjwvbWQtdG9vbGJhcj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdpY29uL05hdkljb24uaHRtbCcsXG4gICAgJzxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvbiBwaXAtbmF2LWljb25cIiBuZy1pZj1cIiRjdHJsLmNvbmZpZy50eXBlICE9IFxcJ25vbmVcXCdcIiBuZy1jbGFzcz1cIiRjdHJsLmNvbmZpZy5jbGFzc1wiIG5nLWNsaWNrPVwiJGN0cmwub25OYXZJY29uQ2xpY2soKVwiIHRhYmluZGV4PVwie3sgJGN0cmwuY29uZmlnLnR5cGU9PVxcJ21lbnVcXCcgfHwgJGN0cmwuY29uZmlnLnR5cGU9PVxcJ2JhY2tcXCcgPyA0IDogLTEgfX1cIiBhcmlhLWxhYmVsPVwibWVudVwiPjxtZC1pY29uIG5nLWlmPVwiJGN0cmwuY29uZmlnLnR5cGU9PVxcJ21lbnVcXCdcIiBtZC1zdmctaWNvbj1cImljb25zOm1lbnVcIj48L21kLWljb24+PGltZyBuZy1zcmM9XCJ7eyAkY3RybC5jb25maWcuaW1hZ2VVcmwgfX1cIiBuZy1pZj1cIiRjdHJsLmNvbmZpZy50eXBlPT1cXCdpbWFnZVxcJ1wiIGhlaWdodD1cIjI0XCIgd2lkdGg9XCIyNFwiPjxtZC1pY29uIG5nLWlmPVwiJGN0cmwuY29uZmlnLnR5cGU9PVxcJ2JhY2tcXCdcIiBtZC1zdmctaWNvbj1cImljb25zOmFycm93LWxlZnRcIj48L21kLWljb24+PG1kLWljb24gbmctaWY9XCIkY3RybC5jb25maWcudHlwZT09XFwnaWNvblxcJ1wiIG1kLXN2Zy1pY29uPVwie3sgJGN0cmwuY29uZmlnLmljb24gfX1cIj48L21kLWljb24+PC9tZC1idXR0b24+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbGFuZ3VhZ2UvTGFuZ3VhZ2VQaWNrZXIuaHRtbCcsXG4gICAgJzxtZC1tZW51IG1kLXBvc2l0aW9uLW1vZGU9XCJ0YXJnZXQtcmlnaHQgdGFyZ2V0XCI+PHNwYW4gY2xhc3M9XCJwaXAtbGFuZ3VhZ2VcIiBuZy1jbGljaz1cIiRtZE9wZW5NZW51KClcIiBhcmlhLWxhYmVsPVwibGFuZ3VhZ2Ugc2VsZWN0aW9uXCI+e3sgJGN0cmwudmFsdWUgfCB0cmFuc2xhdGUgfX08bWQtaWNvbiBtZC1zdmctaWNvbj1cImljb25zOnRyaWFuZ2xlLWRvd25cIj48L21kLWljb24+PC9zcGFuPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCIzXCI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQ9XCJsYW5ndWFnZSBpbiAkY3RybC5sYW5ndWFnZXNcIj48bWQtYnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwub25MYW5ndWFnZUNsaWNrKGxhbmd1YWdlKVwiIHRhYmluZGV4PVwiN1wiPnt7IGxhbmd1YWdlIHwgdHJhbnNsYXRlIH19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21lbnUvTmF2TWVudS5odG1sJyxcbiAgICAnPGRpdiBuZy1pZj1cIiRjdHJsLnNlY3Rpb25zICYmICRjdHJsLnNlY3Rpb25zLmxlbmd0aFwiPjxtZC1saXN0IGNsYXNzPVwic2lkZW5hdi1saXN0XCIgcGlwLWZvY3VzZWQ9XCJcIiBwaXAtZm9jdXNlZC10YWJpbmRleD1cIjEwXCIgcGlwLXdpdGgtaGlkZGVuPVwidHJ1ZVwiPjxtZC1saXN0LWl0ZW0gY2xhc3M9XCJuby1ib3JkZXIgcGlwLXN0aWNreS1uYXYtbWVudS1pdGVtIHBpcC1zdGlja3ktbmF2LWV4cGFuZGVkLWJ1dHRvblwiIG5nLWNsaWNrPVwiJGN0cmwub25FeHBhbmQoKVwiIG5nLWRpc2FibGVkPVwiISRjdHJsLmlzQ29sbGFwc2VkXCIgdGFiaW5kZXg9XCItMVwiIG5nLWlmPVwiJGN0cmwuZXhwYW5kZWRCdXR0b25cIj48bWQtaWNvbiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvblwiIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y2hldnJvbi1sZWZ0XCIgbmctaWY9XCIkY3RybC5leHBhbmRlZFwiPjwvbWQtaWNvbj48bWQtaWNvbiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvblwiIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y2hldnJvbi1yaWdodFwiIG5nLWlmPVwiISRjdHJsLmV4cGFuZGVkXCI+PC9tZC1pY29uPjwvbWQtbGlzdC1pdGVtPjxtZC1kaXZpZGVyIG5nLXNob3c9XCIkY3RybC5leHBhbmRlZEJ1dHRvblwiPjwvbWQtZGl2aWRlcj48ZGl2IGNsYXNzPVwicGlwLXNlY3Rpb25cIiBuZy1yZXBlYXQ9XCJzZWN0aW9uIGluICRjdHJsLnNlY3Rpb25zXCIgbmctaGlkZT1cInNlY3Rpb24uYWNjZXNzICYmICFzZWN0aW9uLmFjY2VzcyhzZWN0aW9uKVwiPjxtZC1kaXZpZGVyIG5nLXNob3c9XCIkaW5kZXggPiAwICYmICEkY3RybC5pc1NlY3Rpb25FbXB0eShzZWN0aW9uLmxpbmtzKVwiPjwvbWQtZGl2aWRlcj48bWQtc3ViaGVhZGVyIG5nLXNob3c9XCJzZWN0aW9uLnRpdGxlXCIgc3R5bGU9XCJoZWlnaHQ6IDQ4cHg7XCI+PHNwYW4gbmctaWY9XCIkY3RybC5leHBhbmRlZFwiIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS10aXRsZSBzZWN0aW9uLXRpdGxlXCI+e3sgOjpzZWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9zcGFuPjxtZC1pY29uIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uIHNlY3Rpb24taWNvblwiIG1kLXN2Zy1pY29uPVwie3sgc2VjdGlvbi5pY29uIH19XCIgbmctaWY9XCIhJGN0cmwuc2lkZU5hdlN0YXRlLnNob3dJY29uVG9vbHR5cGUgJiYgISRjdHJsLmV4cGFuZGVkICYmIHNlY3Rpb24uaWNvblwiPjwvbWQtaWNvbj48bWQtaWNvbiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBzZWN0aW9uLWljb25cIiBtZC1zdmctaWNvbj1cInt7IHNlY3Rpb24uaWNvbiB9fVwiIG5nLWlmPVwiJGN0cmwuc2lkZU5hdlN0YXRlLnNob3dJY29uVG9vbHR5cGUgJiYgISRjdHJsLmV4cGFuZGVkICYmIHNlY3Rpb24uaWNvblwiPjxtZC10b29sdGlwIG1kLXZpc2libGU9XCJzaG93VG9vbHRpcFwiIG1kLWRpcmVjdGlvbj1cInJpZ2h0XCIgY2xhc3M9XCJzaWRlbmF2LWljb24tdG9vbHRpcFwiPnt7IDo6c2VjdGlvbi50b29sdGlwVGV4dCB8fCBzZWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48bWQtaWNvbiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBzZWN0aW9uLWljb25cIiBtZC1zdmctaWNvbj1cInt7ICRjdHJsLmRlZmF1bHRJY29uIH19XCIgbmctaWY9XCIhJGN0cmwuc2lkZU5hdlN0YXRlLnNob3dJY29uVG9vbHR5cGUgJiYgISRjdHJsLmV4cGFuZGVkICYmICFzZWN0aW9uLmljb25cIj48L21kLWljb24+PG1kLWljb24gY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCIgbWQtc3ZnLWljb249XCJ7eyAkY3RybC5kZWZhdWx0SWNvbiB9fVwiIG5nLWlmPVwiJGN0cmwuc2lkZU5hdlN0YXRlLnNob3dJY29uVG9vbHR5cGUgJiYgISRjdHJsLmV4cGFuZGVkICYmICFzZWN0aW9uLmljb25cIj48bWQtdG9vbHRpcCBtZC12aXNpYmxlPVwic2hvd1Rvb2x0aXBcIiBjbGFzcz1cIm1kLXNlY29uZGFyeVwiPnt7IDo6c2VjdGlvbi50b29sdGlwVGV4dCB8fCBzZWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48L21kLXN1YmhlYWRlcj48bWQtbGlzdC1pdGVtIGNsYXNzPVwibm8tYm9yZGVyIHBpcC1zdGlja3ktbmF2LW1lbnUtaXRlbSBwaXAtZm9jdXNhYmxlXCIgdGFiaW5kZXg9XCItMVwiIG5nLXJlcGVhdD1cImxpbmsgaW4gc2VjdGlvbi5saW5rc1wiIG5nLWNsYXNzPVwie1xcJ2FjdGl2ZVxcJzogJGN0cmwuaXNBY3RpdmUobGluayl9XCIgbmctaGlkZT1cImxpbmsuYWNjZXNzICYmICFsaW5rLmFjY2VzcyhsaW5rKVwiPjxtZC1idXR0b24gY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1zdGFydC1jZW50ZXIgcGlwLWJ1dHRvbi1ibG9ja1wiIHRhYmluZGV4PVwiLTFcIiBuZy1jbGljaz1cIiRjdHJsLmNsaWNrTGluaygkZXZlbnQsIGxpbmspXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgbWQtZGlyZWN0aW9uPVwicmlnaHRcIj57eyA6OmxpbmsudG9vbHRpcFRleHQgfCB0cmFuc2xhdGUgfX08L21kLXRvb2x0aXA+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbi1ibG9ja1wiPjxtZC1pY29uIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uIGZsZXgtZml4ZWRcIiBtZC1zdmctaWNvbj1cInt7IGxpbmsuaWNvbiB9fVwiIG5nLWlmPVwiISgkY3RybC5zaWRlTmF2U3RhdGUuc2hvd0ljb25Ub29sdHlwZSAmJiAhbGluay50b29sdGlwVGV4dCAmJiAhJGN0cmwuZXhwYW5kZWQpXCIgbmctaGlkZT1cIiFsaW5rLmljb25cIj48L21kLWljb24+PG1kLWljb24gY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gZmxleC1maXhlZFwiIG1kLXN2Zy1pY29uPVwie3sgbGluay5pY29uIH19XCIgbmctaGlkZT1cIiFsaW5rLmljb25cIiBuZy1pZj1cIiRjdHJsLnNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICFsaW5rLnRvb2x0aXBUZXh0ICYmICEkY3RybC5leHBhbmRlZFwiPjxtZC10b29sdGlwIG1kLXZpc2libGU9XCJzaG93VG9vbHRpcFwiIG1kLWRpcmVjdGlvbj1cInJpZ2h0XCIgY2xhc3M9XCJzaWRlbmF2LWljb24tdG9vbHRpcFwiPnt7IDo6bGluay50b29sdGlwVGV4dCB8fCBsaW5rLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9tZC10b29sdGlwPjwvbWQtaWNvbj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS10aXRsZVwiPnt7IDo6bGluay50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWJhZGdlIHt7IGxpbmsuYmFkZ2VTdHlsZSA/IGxpbmsuYmFkZ2VTdHlsZSA6IFxcJ2NvbG9yLWJhZGdlLWJnXFwnIH19IGZsZXgtZml4ZWRcIiBuZy1pZj1cImxpbmsuY291bnQgJiYgbGluay5jb3VudCA8IDEwMFwiPnt7IGxpbmsuY291bnQgfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1iYWRnZSB7eyBsaW5rLmJhZGdlU3R5bGUgPyBsaW5rLmJhZGdlU3R5bGUgOiBcXCdjb2xvci1iYWRnZS1iZ1xcJyB9fSBmbGV4LWZpeGVkXCIgbmctaWY9XCJsaW5rLmNvdW50ICYmIGxpbmsuY291bnQgPiA5OVwiPiE8L2Rpdj48L21kLWJ1dHRvbj48L21kLWxpc3QtaXRlbT48L2Rpdj48L21kLWxpc3Q+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnc2VhcmNoL1NlYXJjaEJhci5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cIm1kLXRvb2xiYXItdG9vbHMgcGlwLXNlYXJjaC1jb250YWluZXJcIiBuZy1pZj1cIiRjdHJsLmVuYWJsZWRcIj48ZGl2IGNsYXNzPVwibGF5b3V0LXJvdyBwaXAtc2VhcmNoLXNlbGVjdGVkXCI+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWljb24tYnV0dG9uXCIgdGFiaW5kZXg9XCI2XCIgYXJpYS1sYWJlbD1cInN0YXJ0IHNlYXJjaFwiIG5nLWNsaWNrPVwiJGN0cmwub25DbGljaygpXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpzZWFyY2hcIj48L21kLWljb24+PC9tZC1idXR0b24+PGlucHV0IGNsYXNzPVwicGlwLXNlYXJjaC10ZXh0IGZsZXhcIiB0eXBlPVwic2VhcmNoXCIgdGFiaW5kZXg9XCI2XCIgbmctbW9kZWw9XCIkY3RybC5zZWFyY2gudGV4dFwiIG5nLWtleWRvd249XCIkY3RybC5vbktleURvd24oJGV2ZW50KVwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIHRhYmluZGV4PVwiNlwiIGFyaWEtbGFiZWw9XCJjbGVhciBzZWFyY2hcIiBuZy1jbGljaz1cIiRjdHJsLmNsZWFyKClcIj48bWQtaWNvbiBtZC1zdmctaWNvbj1cImljb25zOmNyb3NzLWNpcmNsZVwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwibWQtdG9vbGJhci10b29scyBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1lbmQtY2VudGVyIGZsZXgtZml4ZWQgbHAwIHJwMFwiIG5nLWlmPVwiISRjdHJsLmVuYWJsZWRcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiB0YWJpbmRleD1cIjVcIiBhcmlhLWxhYmVsPVwic3RhcnQgc2VhcmNoXCIgbmctY2xpY2s9XCIkY3RybC5lbmFibGUoKVwiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6c2VhcmNoXCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3NpZGVuYXYvU2lkZU5hdi5odG1sJyxcbiAgICAnPG1kLXNpZGVuYXYgY2xhc3M9XCJtZC1zaWRlbmF2LWxlZnRcIiBtZC1pcy1sb2NrZWQtb3Blbj1cIiRjdHJsLnNpZGVuYXZTdGF0ZS5pc0xvY2tlZE9wZW5cIiBtZC1jb21wb25lbnQtaWQ9XCJwaXAtc3RpY2t5LXNpZGVuYXZcIiBuZy10cmFuc2NsdWRlPVwiXCI+PC9tZC1zaWRlbmF2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RhYnMvVGFicy5odG1sJyxcbiAgICAnPG1kLXRvb2xiYXIgbmctaWY9XCIkY3RybC5waXBNZWRpYVwiIGNsYXNzPVwicGlwLW5hdiBjb2xvci1wcmltYXJ5LWJnIHt7ICRjdHJsLnRoZW1lQ2xhc3MgfX1cIiBuZy1jbGFzcz1cIntcXCdwaXAtdmlzaWJsZVxcJzogJGN0cmwuc2hvdygpLCBcXCdwaXAtc2hhZG93XFwnOiAkY3RybC5zaG93U2hhZG93KCl9XCI+PG1kLXRhYnMgY2xhc3M9XCJjb2xvci1wcmltYXJ5LWJnXCIgbmctaWY9XCIkY3RybC5waXBNZWRpYSgkY3RybC5icmVha3BvaW50cylcIiBtZC1zZWxlY3RlZD1cIiRjdHJsLmFjdGl2ZUluZGV4XCIgbmctY2xhc3M9XCJ7XFwnZGlzYWJsZWRcXCc6ICRjdHJsLmlzRGlzYWJsZWQoKX1cIiBtZC1zdHJldGNoLXRhYnM9XCJ0cnVlXCIgbWQtZHluYW1pYy1oZWlnaHQ9XCJ0cnVlXCI+PG1kLXRhYiBuZy1yZXBlYXQ9XCJ0YWIgaW4gJGN0cmwudGFicyB0cmFjayBieSAkaW5kZXhcIiBuZy1kaXNhYmxlZD1cIiRjdHJsLnRhYkRpc2FibGVkKCRpbmRleClcIiBtZC1vbi1zZWxlY3Q9XCIkY3RybC5vblNlbGVjdCgkaW5kZXgpXCI+PG1kLXRhYi1sYWJlbD57ezo6IHRhYi5uYW1lTG9jYWwgfX08ZGl2IGNsYXNzPVwicGlwLXRhYnMtYmFkZ2UgY29sb3ItYmFkZ2UtYmdcIiBuZy1pZj1cInRhYi5jb3VudHMgPiAwICYmIHRhYi5jb3VudHMgPD0gOTlcIj57eyB0YWIuY291bnRzIH19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC10YWJzLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctaWY9XCJ0YWIuY291bnRzID4gOTlcIj4hPC9kaXY+PC9tZC10YWItbGFiZWw+PC9tZC10YWI+PC9tZC10YWJzPjxkaXYgY2xhc3M9XCJtZC1zdWJoZWFkIHBpcC10YWJzLWNvbnRlbnQgY29sb3ItcHJpbWFyeS1iZ1wiIG5nLWlmPVwiISRjdHJsLnBpcE1lZGlhKCRjdHJsLmJyZWFrcG9pbnRzKVwiPjxkaXYgY2xhc3M9XCJwaXAtZGl2aWRlciBwb3NpdGlvbi10b3AgbTBcIj48L2Rpdj48bWQtc2VsZWN0IG5nLW1vZGVsPVwiJGN0cmwuYWN0aXZlSW5kZXhcIiBuZy1kaXNhYmxlZD1cIiRjdHJsLmlzRGlzYWJsZWQoKVwiIG1kLWNvbnRhaW5lci1jbGFzcz1cInBpcC1mdWxsLXdpZHRoLWRyb3Bkb3duXCIgYXJpYS1sYWJlbD1cIlNFTEVDVFwiIG1kLWluay1yaXBwbGU9XCJcIiBtZC1vbi1jbG9zZT1cIiRjdHJsLm9uU2VsZWN0KCRjdHJsLmFjdGl2ZUluZGV4KVwiPjxtZC1vcHRpb24gbmctcmVwZWF0PVwidGFiIGluICRjdHJsLnRhYnMgdHJhY2sgYnkgJGluZGV4XCIgY2xhc3M9XCJwaXAtdGFiLW9wdGlvblwiIHZhbHVlPVwie3sgOjokaW5kZXggfX1cIj57eyA6OnRhYi5uYW1lTG9jYWwgfX08ZGl2IGNsYXNzPVwicGlwLXRhYnMtYmFkZ2UgY29sb3ItYmFkZ2UtYmdcIiBuZy1pZj1cInRhYi5jb3VudHMgPiAwICYmIHRhYi5jb3VudHMgPD0gOTlcIj57eyB0YWIuY291bnRzIH19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC10YWJzLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctaWY9XCJ0YWIuY291bnRzID4gOTlcIj4hPC9kaXY+PC9tZC1vcHRpb24+PC9tZC1zZWxlY3Q+PC9kaXY+PC9tZC10b29sYmFyPicpO1xufV0pO1xufSkoKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGlwLXdlYnVpLW5hdi1odG1sLm1pbi5qcy5tYXBcbiJdfQ==