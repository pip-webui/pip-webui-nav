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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWN0aW9ucy9BY3Rpb25zU2VydmljZS50cyIsInNyYy9hY3Rpb25zL0lBY3Rpb25zU2VydmljZS50cyIsInNyYy9hY3Rpb25zL1ByaW1hcnlBY3Rpb25zLnRzIiwic3JjL2FjdGlvbnMvU2Vjb25kYXJ5QWN0aW9ucy50cyIsInNyYy9hY3Rpb25zL2luZGV4LnRzIiwic3JjL2FwcGJhci9BcHBCYXIudHMiLCJzcmMvYXBwYmFyL0FwcEJhckNvbmZpZy50cyIsInNyYy9hcHBiYXIvQXBwQmFyUGFydC50cyIsInNyYy9hcHBiYXIvQXBwQmFyU2VydmljZS50cyIsInNyYy9hcHBiYXIvaW5kZXgudHMiLCJzcmMvYnJlYWRjcnVtYi9CcmVhZGNydW1iLnRzIiwic3JjL2JyZWFkY3J1bWIvQnJlYWRjcnVtYkNvbmZpZy50cyIsInNyYy9icmVhZGNydW1iL0JyZWFkY3J1bWJTZXJ2aWNlLnRzIiwic3JjL2JyZWFkY3J1bWIvaW5kZXgudHMiLCJzcmMvY29tbW9uL05hdlNlcnZpY2UudHMiLCJzcmMvZGVwZW5kZW5jaWVzL1RyYW5zbGF0ZUZpbHRlci50cyIsInNyYy9kcm9wZG93bi9Ecm9wZG93bi50cyIsInNyYy9oZWFkZXIvTmF2SGVhZGVyLnRzIiwic3JjL2hlYWRlci9OYXZIZWFkZXJDb25maWcudHMiLCJzcmMvaGVhZGVyL05hdkhlYWRlclNlcnZpY2UudHMiLCJzcmMvaGVhZGVyL2luZGV4LnRzIiwic3JjL2ljb24vTmF2SWNvbi50cyIsInNyYy9pY29uL05hdkljb25Db25maWcudHMiLCJzcmMvaWNvbi9OYXZJY29uU2VydmljZS50cyIsInNyYy9pY29uL2luZGV4LnRzIiwic3JjL2luZGV4LnRzIiwic3JjL2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyRGlyZWN0aXZlLnRzIiwic3JjL21lbnUvTmF2TWVudS50cyIsInNyYy9tZW51L05hdk1lbnVTZXJ2aWNlLnRzIiwic3JjL21lbnUvaW5kZXgudHMiLCJzcmMvc2VhcmNoL1NlYXJjaEJhci50cyIsInNyYy9zZWFyY2gvU2VhcmNoQ29uZmlnLnRzIiwic3JjL3NlYXJjaC9TZWFyY2hTZXJ2aWNlLnRzIiwic3JjL3NlYXJjaC9pbmRleC50cyIsInNyYy9zaWRlbmF2L1NpZGVOYXYudHMiLCJzcmMvc2lkZW5hdi9TaWRlTmF2UGFydC50cyIsInNyYy9zaWRlbmF2L1NpZGVOYXZTZXJ2aWNlLnRzIiwic3JjL3NpZGVuYXYvU2lkZU5hdlN0YXRlLnRzIiwic3JjL3NpZGVuYXYvaW5kZXgudHMiLCJzcmMvdGFicy9UYWJzLnRzIiwidGVtcC9waXAtd2VidWktbmF2LWh0bWwubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBLHFEQUFrRDtBQUVsRCxxREFBd0Q7QUFDeEQscURBQThEO0FBSzlEO0lBSUksd0JBQ0ksTUFBcUIsRUFDckIsVUFBZ0M7UUFFaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELHNCQUFXLGtDQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxnREFBb0I7YUFBL0I7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztRQUM3QyxDQUFDO2FBRUQsVUFBZ0MsS0FBbUI7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLGtEQUFzQjthQUFqQztZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO1FBQy9DLENBQUM7YUFFRCxVQUFrQyxLQUFtQjtZQUNqRCxJQUFJLENBQUMsT0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBBY3Rpb25zQ29uZmlnIH0gZnJvbSAnLi9JQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3Rpb25JdGVtIH0gZnJvbSAnLi9JQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3Rpb25zQ2hhbmdlZEV2ZW50IH0gZnJvbSAnLi9JQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWNvbmRhcnlBY3Rpb25zT3BlbkV2ZW50IH0gZnJvbSAnLi9JQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQWN0aW9uc1NlcnZpY2UgfSBmcm9tICcuL0lBY3Rpb25zU2VydmljZSc7XHJcbmltcG9ydCB7IElBY3Rpb25zUHJvdmlkZXIgfSBmcm9tICcuL0lBY3Rpb25zU2VydmljZSc7XHJcblxyXG5cclxuY2xhc3MgQWN0aW9uc1NlcnZpY2UgaW1wbGVtZW50cyBJQWN0aW9uc1NlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBY3Rpb25zQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBBY3Rpb25zQ29uZmlnLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBY3Rpb25zQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWNvbmRhcnlHbG9iYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByaW1hcnlMb2NhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY29uZGFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwcmltYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSwgc2Vjb25kYXJ5QWN0aW9ucz86IEFjdGlvbkl0ZW1bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zID0gcHJpbWFyeUFjdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9ucyA9IHNlY29uZGFyeUFjdGlvbnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucHJpbWFyeUxvY2FsQWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDb3VudChhY3Rpb246IHN0cmluZywgY291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChhY3Rpb24gPT0gbnVsbCB8fCAhXy5pc051bWJlcihjb3VudCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGEubmFtZSA9PSBhY3Rpb24pXHJcbiAgICAgICAgICAgICAgICBhLmNvdW50ID0gY291bnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYS5uYW1lID09IGFjdGlvbilcclxuICAgICAgICAgICAgICAgIGEuY291bnQgPSBjb3VudDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJDb3VudHMoKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgYS5jb3VudCA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBhLmNvdW50ID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDaGFuZ2VFdmVudCgpIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoQWN0aW9uc0NoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3Blbk1lbnVFdmVudCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUuJGVtaXQoU2Vjb25kYXJ5QWN0aW9uc09wZW5FdmVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEFjdGlvbnNQcm92aWRlciBpbXBsZW1lbnRzIElBY3Rpb25zUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBY3Rpb25zQ29uZmlnID0gbmV3IEFjdGlvbnNDb25maWcoKTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFjdGlvbnNTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IEFjdGlvbnNDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb25maWcodmFsdWU6IEFjdGlvbnNDb25maWcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB2YWx1ZSB8fCBuZXcgQWN0aW9uc0NvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnMoKTogQWN0aW9uSXRlbVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnByaW1hcnlHbG9iYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJpbWFyeUdsb2JhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlY29uZGFyeUdsb2JhbEFjdGlvbnModmFsdWU6IEFjdGlvbkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwcmltYXJ5TG9jYWxBY3Rpb25zKCk6IEFjdGlvbkl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wcmltYXJ5TG9jYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJpbWFyeUxvY2FsQWN0aW9ucyh2YWx1ZTogQWN0aW9uSXRlbVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnMgPSB2YWx1ZSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY29uZGFyeUxvY2FsQWN0aW9ucygpOiBBY3Rpb25JdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKHZhbHVlOiBBY3Rpb25JdGVtW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBBY3Rpb25zU2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBY3Rpb25zJylcclxuICAgIC5wcm92aWRlcigncGlwQWN0aW9ucycsIEFjdGlvbnNQcm92aWRlcik7XHJcblxyXG4iLCJleHBvcnQgY29uc3QgQWN0aW9uc0NoYW5nZWRFdmVudDogc3RyaW5nID0gJ3BpcEFjdGlvbnNDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IFNlY29uZGFyeUFjdGlvbnNPcGVuRXZlbnQ6IHN0cmluZyA9ICdwaXBTZWNvbmRhcnlBY3Rpb25zT3Blbic7XHJcblxyXG5leHBvcnQgY2xhc3MgU2ltcGxlQWN0aW9uSXRlbSB7XHJcbiAgICAvLyBOYW1lIHRvIHJlZmVyIHRvIHRoZSBpdGVtXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgLy8gTGluayB2aXNpYmxlIHRpdGxlXHJcbiAgICBwdWJsaWMgdGl0bGU/OiBzdHJpbmc7XHJcbiAgICAvLyBTaG93IGRpdmlkZXIgaW5zdGVhZCBvZiB0aXRsZVxyXG4gICAgcHVibGljIGRpdmlkZXI/OiBib29sZWFuO1xyXG4gICAgLy8gSWNvbiBuYW1lIGZyb20gJGljb25Qcm92aWRlclxyXG4gICAgcHVibGljIGljb24/OiBzdHJpbmc7XHJcbiAgICAvLyBDb3VudGVyIGJhZGdlXHJcbiAgICBwdWJsaWMgY291bnQ/OiBudW1iZXI7XHJcbiAgICAvLyBBY2Nlc3MgZnVuY3Rpb25cclxuICAgIHB1YmxpYyBhY2Nlc3M/OiAoYWN0aW9uOiBTaW1wbGVBY3Rpb25JdGVtKSA9PiBib29sZWFuO1xyXG4gICAgLy8gU2hvdyBvbiBzcGVjaWZpZWQgYnJlYWtwb2ludHNcclxuICAgIHB1YmxpYyBicmVha3BvaW50cz86IHN0cmluZ1tdO1xyXG4gICAgLy8gd2luZG93LmxvY2F0aW9uLmhyZWZcclxuICAgIHB1YmxpYyBocmVmPzogc3RyaW5nO1xyXG4gICAgLy8gJGxvY2F0aW9uLnVybFxyXG4gICAgcHVibGljIHVybD86IHN0cmluZztcclxuICAgIC8vICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMpXHJcbiAgICBwdWJsaWMgc3RhdGU/OiBzdHJpbmc7XHJcbiAgICAvLyBQYXJhbWV0ZXJzIGZvciAkc3RhdGUuZ28oc3RhdGUsIHN0YXRlUGFyYW1zKVxyXG4gICAgcHVibGljIHN0YXRlUGFyYW1zPzogYW55O1xyXG4gICAgLy8gJHJvb3RTY29wZS5icm9hZGNhc3QoZXZlbnQpXHJcbiAgICBwdWJsaWMgZXZlbnQ/OiBzdHJpbmc7XHJcbiAgICAvLyBDbGljayBjYWxsYmFja1xyXG4gICAgcHVibGljIGNsaWNrPzogKGFjdGlvbjogU2ltcGxlQWN0aW9uSXRlbSkgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGlvbkl0ZW0gZXh0ZW5kcyBTaW1wbGVBY3Rpb25JdGVtIHtcclxuICAgIHB1YmxpYyBzdWJBY3Rpb25zPzogU2ltcGxlQWN0aW9uSXRlbVtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uc0NvbmZpZyB7XHJcbiAgICAvLyBQcmltYXJ5IGdsb2JhbCBhY3Rpb25zIHZpc2libGUgb24gdGhlIHNjcmVlblxyXG4gICAgcHVibGljIHByaW1hcnlHbG9iYWxBY3Rpb25zOiBBY3Rpb25JdGVtW10gPSBbXTtcclxuICAgIC8vIFByaW1hcnkgbG9jYWwgYWN0aW9ucyB2aXNpYmxlIG9uIHRoZSBzY3JlZW5cclxuICAgIHB1YmxpYyBwcmltYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW10gPSBbXTtcclxuXHJcbiAgICAvLyBTZWNvbmRhcnkgZ2xvYmFsIGFjdGlvbnMgYXZhaWxhYmxlIGluIHBvcHVwXHJcbiAgICBwdWJsaWMgc2Vjb25kYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdID0gW107XHJcbiAgICAvLyBTZWNvbmRhcnkgbG9jYWwgYWN0aW9ucyBhdmFpbGFibGUgaW4gcG9wdXBcclxuICAgIHB1YmxpYyBzZWNvbmRhcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXT0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbnNTZXJ2aWNlIHtcclxuICAgIHJlYWRvbmx5IGNvbmZpZzogQWN0aW9uc0NvbmZpZztcclxuXHJcbiAgICBwcmltYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgcHJpbWFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5R2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgc2Vjb25kYXJ5TG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107ICAgIFxyXG5cclxuICAgIHNob3cocHJpbWFyeUFjdGlvbnM/OiBBY3Rpb25JdGVtW10sIHNlY29uZGFyeUFjdGlvbnM/OiBBY3Rpb25JdGVtW10pOiB2b2lkO1xyXG4gICAgaGlkZSgpOiB2b2lkO1xyXG4gICAgdXBkYXRlQ291bnQobGluazogc3RyaW5nLCBjb3VudDogbnVtYmVyKTogdm9pZDsgXHJcbiAgICBjbGVhckNvdW50cygpOiB2b2lkO1xyXG4gICAgb3Blbk1lbnVFdmVudCgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25zUHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGNvbmZpZzogQWN0aW9uc0NvbmZpZztcclxuICAgIFxyXG4gICAgcHJpbWFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHByaW1hcnlMb2NhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHNlY29uZGFyeUdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuICAgIHNlY29uZGFyeUxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdOyAgICBcclxufSIsImltcG9ydCB7IElBY3Rpb25zU2VydmljZSwgQWN0aW9uSXRlbSwgQWN0aW9uc0NvbmZpZyB9IGZyb20gXCIuL0lBY3Rpb25zU2VydmljZVwiO1xyXG5cclxuY2xhc3MgUHJpbWFyeUFjdGlvbnNDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgX3BpcFRyYW5zbGF0ZTogcGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlXHJcblxyXG4gICAgcHVibGljIGNvbmZpZzogQWN0aW9uc0NvbmZpZztcclxuXHJcbiAgICBwdWJsaWMgbG9jYWxBY3Rpb25zOiBBY3Rpb25JdGVtW107XHJcbiAgICBwdWJsaWMgZ2xvYmFsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgcHVibGljIG9yaWdpbmF0b3JFdjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgcHJpdmF0ZSAkaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICRzY29wZTogYW5ndWxhci5JU2NvcGUsXHJcbiAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcGlwQWN0aW9uczogSUFjdGlvbnNTZXJ2aWNlLFxyXG4gICAgICAgICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxyXG4gICAgICAgICRhdHRyczogbmcuSUF0dHJpYnV0ZXNcclxuXHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9waXBUcmFuc2xhdGUgPSB0aGlzLiRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gPHBpcC5zZXJ2aWNlcy5JVHJhbnNsYXRlU2VydmljZT50aGlzLiRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5fcGlwVHJhbnNsYXRlICYmIHRoaXMuX3BpcFRyYW5zbGF0ZS5zZXRUcmFuc2xhdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGlwVHJhbnNsYXRlLnNldFRyYW5zbGF0aW9ucygnZW4nLCB7XHJcbiAgICAgICAgICAgICAgICBET0NVTUVOVFNfQVRUQUNIRUQ6ICdkb2N1bWVudChzKSBhdHRhY2hlZCcsXHJcbiAgICAgICAgICAgICAgICBFUlJPUl9ET0NVTUVOVFNfTE9BREVEOiAnRXJyb3I6IDwlPSBlcnJvcl9udW1iZXIgJT4gZG9jdW1lbnQocykgYXJlIG5vdCBsb2FkZWQnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9waXBUcmFuc2xhdGUuc2V0VHJhbnNsYXRpb25zKCdydScsIHtcclxuICAgICAgICAgICAgICAgIERPQ1VNRU5UU19BVFRBQ0hFRDogJ9C00L7QutGD0LzQtdC90YLQvtCyINC00L7QsdCw0LLQu9C10L3QvicsXHJcbiAgICAgICAgICAgICAgICBFUlJPUl9ET0NVTUVOVFNfTE9BREVEOiAn0J7RiNC40LHQutCwOiA8JT0gZXJyb3JfbnVtYmVyICU+INC00L7QutGD0LzQtdC90YIo0L7Qsikg0L3QtSDQt9Cw0LPRgNGD0LbQtdC90L4nXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1wcmltYXJ5LWFjdGlvbnMnKTtcclxuXHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRvbigncGlwQWN0aW9uc0NoYW5nZWQnLCAoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIGNvbmZpZzogQWN0aW9uc0NvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uQWN0aW9uc0NoYW5nZWQoZXZlbnQsIGNvbmZpZyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgJG9uSW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5sb2NhbEFjdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5waXBBY3Rpb25zLnByaW1hcnlMb2NhbEFjdGlvbnMgPSB0aGlzLmxvY2FsQWN0aW9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdsb2JhbEFjdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5waXBBY3Rpb25zLnByaW1hcnlHbG9iYWxBY3Rpb25zID0gdGhpcy5nbG9iYWxBY3Rpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLnBpcEFjdGlvbnMuY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25BY3Rpb25zQ2hhbmdlZChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBBY3Rpb25zQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzSGlkZGVuKGFjdGlvbjogQWN0aW9uSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIFRvZG86IENoZWNrIGJyZWFrcG9pbnRzIGhlcmVcclxuICAgICAgICByZXR1cm4gYWN0aW9uLmFjY2VzcyAmJiAhYWN0aW9uLmFjY2VzcyhhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY3Rpb25Db3VudChhY3Rpb246IEFjdGlvbkl0ZW0pOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPT09IG51bGwgfHwgYWN0aW9uLmNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uLmNvdW50ID4gOTkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICchJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBTdHJpbmcoYWN0aW9uLmNvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xpY2tBY3Rpb24oYWN0aW9uOiBBY3Rpb25JdGVtLCAkbWRPcGVuTWVudTogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWFjdGlvbiB8fCBhY3Rpb24uZGl2aWRlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnN1YkFjdGlvbnMpIHtcclxuICAgICAgICAgICAgJG1kT3Blbk1lbnUodGhpcy5vcmlnaW5hdG9yRXYpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGFjdGlvbi5jbGljaykpIHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsaWNrKGFjdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uaHJlZikge1xyXG4gICAgICAgICAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFjdGlvbi5ocmVmO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnVybCkge1xyXG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi51cmwoYWN0aW9uLnVybCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24uc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJGluamVjdG9yLmhhcygndGhpcy5fc3RhdGUnKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IF9zdGF0ZTogYW5ndWxhci51aS5JU3RhdGVTZXJ2aWNlID0gdGhpcy4kaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/IDxhbmd1bGFyLnVpLklTdGF0ZVNlcnZpY2U+dGhpcy4kaW5qZWN0b3IuZ2V0KCckc3RhdGUnKSA6IG51bGwgO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zdGF0ZS5nbyhhY3Rpb24uc3RhdGUsIGFjdGlvbi5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChhY3Rpb24uZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByYWlzZSBub3RpZmljYXRpb25cclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcEFjdGlvbkNsaWNrZWQnLCBhY3Rpb24ubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmludGVyZmFjZSBJUHJpbWFyeUFjdGlvbnNCaW5kaW5ncyB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcblxyXG4gICAgbG9jYWxBY3Rpb25zOiBhbnksXHJcbiAgICBnbG9iYWxBY3Rpb25zOiBhbnksXHJcbiAgICBvcmlnaW5hdG9yRXY6IGFueVxyXG59XHJcblxyXG5jb25zdCBQcmltYXJ5QWN0aW9uc0JpbmRpbmdzOiBJUHJpbWFyeUFjdGlvbnNCaW5kaW5ncyA9IHtcclxuICAgIGxvY2FsQWN0aW9uczogJzxwaXBMb2NhbEFjdGlvbnMnLFxyXG4gICAgZ2xvYmFsQWN0aW9uczogJzxwaXBHbG9iYWxBY3Rpb25zJyxcclxuICAgIG9yaWdpbmF0b3JFdjogJzw/cGlwT3JpZ2luYXRvckV2J1xyXG59XHJcblxyXG5jbGFzcyBQcmltYXJ5QWN0aW9uc0NoYW5nZXMgaW1wbGVtZW50cyBuZy5JT25DaGFuZ2VzT2JqZWN0LCBJUHJpbWFyeUFjdGlvbnNCaW5kaW5ncyB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBuZy5JQ2hhbmdlc09iamVjdDxhbnk+O1xyXG5cclxuICAgIGxvY2FsQWN0aW9uczogbmcuSUNoYW5nZXNPYmplY3Q8QWN0aW9uSXRlbVtdPjtcclxuICAgIGdsb2JhbEFjdGlvbnM6IG5nLklDaGFuZ2VzT2JqZWN0PEFjdGlvbkl0ZW1bXT47XHJcbiAgICBvcmlnaW5hdG9yRXY6IG5nLklDaGFuZ2VzT2JqZWN0PGFueT47XHJcbn1cclxuXHJcblxyXG4oKCkgPT4ge1xyXG4gICAgY29uc3QgcHJpbWFyeUFjdGlvbnM6IG5nLklDb21wb25lbnRPcHRpb25zID0ge1xyXG4gICAgICAgIGJpbmRpbmdzOiBQcmltYXJ5QWN0aW9uc0JpbmRpbmdzLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYWN0aW9ucy9QcmltYXJ5QWN0aW9ucy5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBQcmltYXJ5QWN0aW9uc0NvbnRyb2xsZXJcclxuICAgIH07XHJcblxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBBY3Rpb25zJylcclxuICAgICAgICAuY29tcG9uZW50KCdwaXBQcmltYXJ5QWN0aW9ucycsIHByaW1hcnlBY3Rpb25zKTtcclxuXHJcbn0pKCk7IiwiaW1wb3J0IHsgSUFjdGlvbnNTZXJ2aWNlLCBBY3Rpb25JdGVtLCBBY3Rpb25zQ29uZmlnIH0gZnJvbSBcIi4vSUFjdGlvbnNTZXJ2aWNlXCI7XHJcblxyXG5jbGFzcyBTZWNvbmRhcnlBY3Rpb25zQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIHBpcFRyYW5zbGF0ZTogcGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlXHJcbiAgICBwcml2YXRlIF9tZW51Rm46IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBvcmlnaW5hdG9yRXY6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgY29uZmlnOiBBY3Rpb25zQ29uZmlnO1xyXG4gICAgcHVibGljIGxvY2FsQWN0aW9uczogQWN0aW9uSXRlbVtdO1xyXG4gICAgcHVibGljIGdsb2JhbEFjdGlvbnM6IEFjdGlvbkl0ZW1bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRhdHRyczogbmcuSUF0dHJpYnV0ZXMsXHJcbiAgICAgICAgcHJpdmF0ZSAkaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuICAgICAgICBwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHBpcEFjdGlvbnM6IElBY3Rpb25zU2VydmljZSxcclxuICAgICAgICAkZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3BpcC1zZWNvbmRhcnktYWN0aW9ucycpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5sb2NhbEFjdGlvbnMpIHtcclxuICAgICAgICAgICAgcGlwQWN0aW9ucy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMgPSB0aGlzLmxvY2FsQWN0aW9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdsb2JhbEFjdGlvbnMpIHtcclxuICAgICAgICAgICAgcGlwQWN0aW9ucy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zID0gdGhpcy5nbG9iYWxBY3Rpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBwaXBBY3Rpb25zLmNvbmZpZztcclxuXHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRvbigncGlwQWN0aW9uc0NoYW5nZWQnLCAoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIGNvbmZpZzogQWN0aW9uc0NvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uQWN0aW9uc0NoYW5nZWQoZXZlbnQsIGNvbmZpZyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kb24oJ3BpcFNlY29uZGFyeUFjdGlvbnNPcGVuJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uQWN0aW9uc01lbnVPcGVuKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRNZW51KG1lbnVGbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICAgdGhpcy5fbWVudUZuID0gbWVudUZuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkFjdGlvbnNNZW51T3BlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tZW51Rm4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3Blbk1lbnUoJG1kT3Blbk1lbnU6IEZ1bmN0aW9uLCBldjogbmcuSUFuZ3VsYXJFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYXRvckV2ID0gZXY7XHJcbiAgICAgICAgJG1kT3Blbk1lbnUoZXYpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25BY3Rpb25zQ2hhbmdlZChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBBY3Rpb25zQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzSGlkZGVuKGFjdGlvbjogQWN0aW9uSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIFRvZG86IENoZWNrIGJyZWFrcG9pbnRzIGhlcmVcclxuICAgICAgICByZXR1cm4gYWN0aW9uLmFjY2VzcyAmJiAhYWN0aW9uLmFjY2VzcyhhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY3Rpb25Db3VudChhY3Rpb246IEFjdGlvbkl0ZW0pOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChhY3Rpb24uY291bnQgPT09IG51bGwgfHwgYWN0aW9uLmNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uLmNvdW50ID4gOTkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICchJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBTdHJpbmcoYWN0aW9uLmNvdW50KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjQWN0aW9ucyhhY3Rpb25zOiBBY3Rpb25JdGVtW10pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgXy5lYWNoKGFjdGlvbnMsIChhY3Rpb246IEFjdGlvbkl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSGlkZGVuKGFjdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWNvbmRhcnlBY3Rpb25zVmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxjQWN0aW9ucyh0aGlzLmNvbmZpZy5zZWNvbmRhcnlHbG9iYWxBY3Rpb25zKSA+IDAgfHxcclxuICAgICAgICAgICAgdGhpcy5jYWxjQWN0aW9ucyh0aGlzLmNvbmZpZy5zZWNvbmRhcnlMb2NhbEFjdGlvbnMpID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2Vjb25kYXJ5RGl2aWRlclZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY0FjdGlvbnModGhpcy5jb25maWcuc2Vjb25kYXJ5R2xvYmFsQWN0aW9ucykgPiAwICYmXHJcbiAgICAgICAgICAgIHRoaXMuY2FsY0FjdGlvbnModGhpcy5jb25maWcuc2Vjb25kYXJ5TG9jYWxBY3Rpb25zKSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsaWNrQWN0aW9uKGFjdGlvbjogQWN0aW9uSXRlbSwgJG1kT3Blbk1lbnU6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFhY3Rpb24gfHwgYWN0aW9uLmRpdmlkZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdG9kbzogZG8gbm90IHN1cHBvcnRlZCBpbnRvIEFjdGlvbkl0ZW1cclxuICAgICAgICAvLyBpZiAoYWN0aW9uLmNsb3NlKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuJHNjb3BlLm9yaWdpbmF0b3JFdiA9IG51bGw7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnN1YkFjdGlvbnMpIHtcclxuICAgICAgICAgICAgJG1kT3Blbk1lbnUodGhpcy5vcmlnaW5hdG9yRXYpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmNsaWNrKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbi5jbGljayhhY3Rpb24pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmhyZWYpIHtcclxuICAgICAgICAgICAgdGhpcy4kd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhY3Rpb24uaHJlZjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi51cmwpIHtcclxuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24udXJsKGFjdGlvbi51cmwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRpbmplY3Rvci5oYXMoJ3RoaXMuX3N0YXRlJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfc3RhdGU6IGFuZ3VsYXIudWkuSVN0YXRlU2VydmljZSA9IHRoaXMuJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyA8YW5ndWxhci51aS5JU3RhdGVTZXJ2aWNlPnRoaXMuJGluamVjdG9yLmdldCgnJHN0YXRlJykgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zdGF0ZS5nbyhhY3Rpb24uc3RhdGUsIGFjdGlvbi5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChhY3Rpb24uZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByYWlzZSBub3RpZmljYXRpb25cclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3BpcEFjdGlvbkNsaWNrZWQnLCBhY3Rpb24ubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmludGVyZmFjZSBJU2Vjb25kYXJ5QWN0aW9uc0JpbmRpbmdzIHtcclxuICAgIFtrZXk6IHN0cmluZ106IGFueTtcclxuXHJcbiAgICBsb2NhbEFjdGlvbnM6IGFueSxcclxuICAgIGdsb2JhbEFjdGlvbnM6IGFueVxyXG59XHJcblxyXG5jb25zdCBTZWNvbmRhcnlBY3Rpb25zQmluZGluZ3M6IElTZWNvbmRhcnlBY3Rpb25zQmluZGluZ3MgPSB7XHJcbiAgICBsb2NhbEFjdGlvbnM6ICc8cGlwTG9jYWxBY3Rpb25zJyxcclxuICAgIGdsb2JhbEFjdGlvbnM6ICc8cGlwR2xvYmFsQWN0aW9ucydcclxufVxyXG5cclxuY2xhc3MgU2Vjb25kYXJ5QWN0aW9uc0NoYW5nZXMgaW1wbGVtZW50cyBuZy5JT25DaGFuZ2VzT2JqZWN0LCBJU2Vjb25kYXJ5QWN0aW9uc0JpbmRpbmdzIHtcclxuICAgIFtrZXk6IHN0cmluZ106IG5nLklDaGFuZ2VzT2JqZWN0PGFueT47XHJcblxyXG4gICAgbG9jYWxBY3Rpb25zOiBuZy5JQ2hhbmdlc09iamVjdDxBY3Rpb25JdGVtW10+O1xyXG4gICAgZ2xvYmFsQWN0aW9uczogbmcuSUNoYW5nZXNPYmplY3Q8QWN0aW9uSXRlbVtdPjtcclxufVxyXG5cclxuXHJcbigoKSA9PiB7XHJcbiAgICBjb25zdCBzZWNvbmRhcnlBY3Rpb25zOiBuZy5JQ29tcG9uZW50T3B0aW9ucyA9IHtcclxuICAgICAgICBiaW5kaW5nczogU2Vjb25kYXJ5QWN0aW9uc0JpbmRpbmdzLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYWN0aW9ucy9TZWNvbmRhcnlBY3Rpb25zLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IFNlY29uZGFyeUFjdGlvbnNDb250cm9sbGVyXHJcbiAgICB9O1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBBY3Rpb25zJylcclxuICAgICAgICAuY29tcG9uZW50KCdwaXBTZWNvbmRhcnlBY3Rpb25zJywgc2Vjb25kYXJ5QWN0aW9ucyk7XHJcblxyXG59KSgpO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgncGlwQWN0aW9ucycsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVGVtcGxhdGVzJywgJ3VpLnJvdXRlciddKTtcclxuXHJcbmltcG9ydCAnLi9BY3Rpb25zU2VydmljZSc7XHJcbmltcG9ydCAnLi9QcmltYXJ5QWN0aW9ucyc7XHJcbmltcG9ydCAnLi9TZWNvbmRhcnlBY3Rpb25zJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vSUFjdGlvbnNTZXJ2aWNlJzsiLCLvu79pbXBvcnQgeyBBcHBCYXJDb25maWcgfSBmcm9tICcuL0FwcEJhckNvbmZpZyc7XHJcbmltcG9ydCB7IElBcHBCYXJTZXJ2aWNlIH0gZnJvbSBcIi4vSUFwcEJhclNlcnZpY2VcIjtcclxuXHJcbmNsYXNzIEFwcEJhckNvbnRyb2xsZXIge1xyXG4gICAgcHVibGljIGNvbmZpZzogQXBwQmFyQ29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgIHBpcEFwcEJhcjogSUFwcEJhclNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLWFwcGJhcicpO1xyXG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdjb2xvci1wcmltYXJ5LWJnJyk7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gcGlwQXBwQmFyLmNvbmZpZztcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcEFwcEJhckNoYW5nZWQnLCAoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIGNvbmZpZzogQXBwQmFyQ29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25BcHBCYXJDaGFuZ2VkKGV2ZW50LCBjb25maWcpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQXBwQmFyQ2hhbmdlZChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBBcHBCYXJDb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG57XHJcbiAgICBjb25zdCBhcHBiYXI6IG5nLklDb21wb25lbnRPcHRpb25zID0ge1xyXG4gICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHBiYXIvQXBwQmFyLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IEFwcEJhckNvbnRyb2xsZXJcclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwQXBwQmFyJylcclxuICAgICAgICAuY29tcG9uZW50KCdwaXBBcHBiYXInLCBhcHBiYXIpO1xyXG5cclxufSIsImV4cG9ydCBjbGFzcyBBcHBCYXJDb25maWcge1xyXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgIHBhcnRzOiBhbnk7XHJcbiAgICBjbGFzc2VzOiBzdHJpbmdbXTtcclxufSAiLCJpbXBvcnQgeyBBcHBCYXJDb25maWcgfSBmcm9tICcuL0FwcEJhckNvbmZpZyc7XHJcbmltcG9ydCB7IElBcHBCYXJTZXJ2aWNlIH0gZnJvbSBcIi4vSUFwcEJhclNlcnZpY2VcIjtcclxuXHJcbmNsYXNzIEFwcEJhclBhcnRDb250cm9sbGVyIHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfcGFydE5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3BhcnRWYWx1ZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcbiAgICAgICAgJGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgJGF0dHJzOiBuZy5JQXR0cmlidXRlcyxcclxuICAgICAgICAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICBwaXBBcHBCYXI6IElBcHBCYXJTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuX3BhcnROYW1lID0gU3RyaW5nKCRhdHRyc1sncGlwQXBwYmFyUGFydCddKTtcclxuICAgICAgICB0aGlzLl9wYXJ0VmFsdWUgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBCcmVhayBwYXJ0IGFwYXJ0XHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyID0gdGhpcy5fcGFydE5hbWUuaW5kZXhPZignOicpO1xyXG4gICAgICAgIGlmIChwb3MgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcnRWYWx1ZSA9IHRoaXMuX3BhcnROYW1lLnN1YnN0cihwb3MgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5fcGFydE5hbWUgPSB0aGlzLl9wYXJ0TmFtZS5zdWJzdHIoMCwgcG9zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25BcHBCYXJDaGFuZ2VkKG51bGwsIHBpcEFwcEJhci5jb25maWcpO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBBcHBCYXJDaGFuZ2VkJywgKGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IEFwcEJhckNvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uQXBwQmFyQ2hhbmdlZChudWxsLCBjb25maWcpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25BcHBCYXJDaGFuZ2VkKGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IEFwcEJhckNvbmZpZykge1xyXG4gICAgICAgIGxldCBwYXJ0czogYW55ID0gY29uZmlnLnBhcnRzIHx8IHt9O1xyXG4gICAgICAgIGxldCBjdXJyZW50UGFydFZhbHVlID0gcGFydHNbdGhpcy5fcGFydE5hbWVdO1xyXG5cclxuICAgICAgICAvLyBTZXQgdmlzaWJsZSB2YXJpYWJsZSB0byBzd2l0Y2ggbmdJZlxyXG4gICAgICAgIGxldCB2aXNpYmxlOiBib29sZWFuID0gISEodGhpcy5fcGFydFZhbHVlID8gY3VycmVudFBhcnRWYWx1ZSA9PSB0aGlzLl9wYXJ0VmFsdWUgOiBjdXJyZW50UGFydFZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHZpc2libGUgIT0gdGhpcy4kc2NvcGVbJ3Zpc2libGUnXSlcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGVbJ3Zpc2libGUnXSA9IHZpc2libGU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vLyBFeGFtcGxlIGlzIHRha2VuIGZyb20gaGVyZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMDMyNTQ4MC9hbmd1bGFyanMtd2hhdHMtdGhlLWJlc3QtcHJhY3RpY2UtdG8tYWRkLW5naWYtdG8tYS1kaXJlY3RpdmUtcHJvZ3JhbW1hdGljYWxseVxyXG4oKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gYXBwYmFyUGFydChuZ0lmRGlyZWN0aXZlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB2YXIgbmdJZiA9IG5nSWZEaXJlY3RpdmVbMF07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IG5nSWYudHJhbnNjbHVkZSxcclxuICAgICAgICAgICAgcHJpb3JpdHk6IG5nSWYucHJpb3JpdHksXHJcbiAgICAgICAgICAgIHRlcm1pbmFsOiBuZ0lmLnRlcm1pbmFsLFxyXG4gICAgICAgICAgICByZXN0cmljdDogbmdJZi5yZXN0cmljdCxcclxuICAgICAgICAgICAgc2NvcGU6IHRydWUsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIGxpbmtGdW5jdGlvbigkc2NvcGU6IG5nLklTY29wZSwgJGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogbmcuSUF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIFZpc3VhbGl6ZSBiYXNlZCBvbiB2aXNpYmxlIHZhcmlhYmxlIGluIHNjb3BlXHJcbiAgICAgICAgICAgICAgICAkYXR0cnNbJ25nSWYnXSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlWyd2aXNpYmxlJ107XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbmdJZi5saW5rLmFwcGx5KG5nSWYsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IEFwcEJhclBhcnRDb250cm9sbGVyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgncGlwQXBwQmFyJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdwaXBBcHBiYXJQYXJ0JywgYXBwYmFyUGFydCk7XHJcblxyXG59KSgpOyIsImltcG9ydCB7IEFwcEJhckNvbmZpZyB9IGZyb20gJy4vQXBwQmFyQ29uZmlnJztcclxuaW1wb3J0IHsgSUFwcEJhclNlcnZpY2UsIElBcHBCYXJQcm92aWRlciB9IGZyb20gJy4vSUFwcEJhclNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwcEJhckNoYW5nZWRFdmVudDogc3RyaW5nID0gJ3BpcEFwcEJhckNoYW5nZWQnO1xyXG5cclxuY2xhc3MgQXBwQmFyU2VydmljZSBpbXBsZW1lbnRzIElBcHBCYXJTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQXBwQmFyQ29uZmlnO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IEFwcEJhckNvbmZpZywgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBcHBCYXJDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJ0cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gdmFsdWUgfHwge307XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwYXJ0cz86IGFueSwgY2xhc3Nlcz86IHN0cmluZ1tdLCBzaGFkb3dCcmVha3BvaW50cz86IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHBhcnRzIHx8IHRoaXMuX2NvbmZpZy5wYXJ0cyB8fCB7fTtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IGNsYXNzZXMgfHwgdGhpcy5fY29uZmlnLmNsYXNzZXMgfHwgW107XHJcbiAgICAgICAgaWYgKHNoYWRvd0JyZWFrcG9pbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hhZG93KHNoYWRvd0JyZWFrcG9pbnRzKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGlkZVNoYWRvdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xhc3NlcyA9IF8ucmVqZWN0KHRoaXMuX2NvbmZpZy5jbGFzc2VzLCAoYykgPT4gYy5zdGFydHNXaXRoKCdwaXAtc2hhZG93JykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2hhZG93KGJyZWFrcG9pbnRzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGlkZVNoYWRvdygpO1xyXG5cclxuICAgICAgICBpZiAoYnJlYWtwb2ludHMgIT0gbnVsbCAmJiBicmVha3BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaChicmVha3BvaW50cywgKGJwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKCdwaXAtc2hhZG93LScgKyBicCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goJ3BpcC1zaGFkb3cnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFNoYWRvdyguLi5icmVha3BvaW50czogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFNoYWRvdyhicmVha3BvaW50cyk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2hhZG93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGlkZVNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuIFxyXG4gICAgcHVibGljIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzW3BhcnRdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDb25maWdFdmVudCgpIHtcclxuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChBcHBCYXJDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEFwcEJhclByb3ZpZGVyIGltcGxlbWVudHMgSUFwcEJhclByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQXBwQmFyQ29uZmlnID0ge1xyXG4gICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgcGFydHM6IHt9LFxyXG4gICAgICAgIGNsYXNzZXM6IFtdXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQXBwQmFyU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBBcHBCYXJDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb25maWcodmFsdWU6IEFwcEJhckNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBBcHBCYXJDb25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcnRzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhcnRzKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHMgPSB2YWx1ZSB8fCB7fTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGFzc2VzKHZhbHVlOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBwYXJ0KHBhcnQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0c1twYXJ0XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IEFwcEJhclNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9ICAgICBcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwQXBwQmFyJylcclxuICAgIC5wcm92aWRlcigncGlwQXBwQmFyJywgQXBwQmFyUHJvdmlkZXIpO1xyXG4iLCJhbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBBcHBCYXInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9BcHBCYXJDb25maWcnO1xyXG5pbXBvcnQgJy4vQXBwQmFyU2VydmljZSc7XHJcbmltcG9ydCAnLi9BcHBCYXInO1xyXG5pbXBvcnQgJy4vQXBwQmFyUGFydCc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL0FwcEJhclNlcnZpY2UnO1xyXG4iLCJpbXBvcnQgeyBTaW1wbGVBY3Rpb25JdGVtIH0gZnJvbSAnLi4vYWN0aW9ucy9JQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBCcmVhZGNydW1iSXRlbSB9IGZyb20gJy4vQnJlYWRjcnVtYkNvbmZpZyc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWJDb25maWcgfSBmcm9tICcuL0JyZWFkY3J1bWJDb25maWcnO1xyXG5pbXBvcnQgeyBJQnJlYWRjcnVtYlNlcnZpY2UgfSBmcm9tICcuL0lCcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWJDaGFuZ2VkRXZlbnQgfSBmcm9tICcuL0JyZWFkY3J1bWJTZXJ2aWNlJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYkJhY2tFdmVudCB9IGZyb20gJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPcGVuU2VhcmNoRXZlbnQgfSBmcm9tICcuLi9zZWFyY2gvU2VhcmNoU2VydmljZSc7XHJcblxyXG5jbGFzcyBCcmVhZGNydW1iQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIG9yaWdpbmF0b3JFdjogRXZlbnQ7XHJcbiAgICBwcml2YXRlIF9tZWRpYTogYW55O1xyXG5cclxuICAgIHB1YmxpYyBjb25maWc6IEJyZWFkY3J1bWJDb25maWc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuICAgICAgICBwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICRpbmplY3RvcjogbmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgIHBpcEJyZWFkY3J1bWI6IElCcmVhZGNydW1iU2VydmljZSxcclxuICAgICAgICAkbWRNZWRpYTogYW5ndWxhci5tYXRlcmlhbC5JTWVkaWEsXHJcbiAgICAgICAgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlLFxyXG4gICAgICAgICRlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLWJyZWFkY3J1bWInKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBwaXBCcmVhZGNydW1iLmNvbmZpZztcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQnJlYWRjcnVtYkNoYW5nZWRFdmVudCwgKGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IEJyZWFkY3J1bWJDb25maWcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkJyZWFkY3J1bWJDaGFuZ2VkKGV2ZW50LCBjb25maWcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRyb290U2NvcGUuJG9uKEJyZWFkY3J1bWJCYWNrRXZlbnQsICgpID0+IHsgdGhpcy5vbkJyZWFkY3J1bWJCYWNrKCk7IH0pO1xyXG5cclxuICAgICAgICBsZXQgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbWVkaWEgPSBwaXBNZWRpYSAhPT0gdW5kZWZpbmVkID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnJlYWRjcnVtYkNoYW5nZWQoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIGNvbmZpZzogQnJlYWRjcnVtYkNvbmZpZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CcmVhZGNydW1iQmFjaygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaXRlbXM6IEJyZWFkY3J1bWJJdGVtW10gPSB0aGlzLmNvbmZpZy5pdGVtcztcclxuICAgICAgICAvLyBHbyB0byB0aGUgbGFzdCBicmVhZGNydW1iIGl0ZW1cclxuICAgICAgICBpZiAoXy5pc0FycmF5KGl0ZW1zKSAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOiBCcmVhZGNydW1iSXRlbSA9IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0uY2xpY2spKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsaWNrKGl0ZW0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGljayhpdGVtOiBCcmVhZGNydW1iSXRlbSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlbS5jbGljaykpIHtcclxuICAgICAgICAgICAgaXRlbS5jbGljayhpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5TZWFyY2goKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoT3BlblNlYXJjaEV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWN0aW9uc1Zpc2libGUoaXRlbTogQnJlYWRjcnVtYkl0ZW0pOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNBcnJheShpdGVtLnN1YkFjdGlvbnMpICYmIGl0ZW0uc3ViQWN0aW9ucy5sZW5ndGggPiAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbk9wZW5NZW51KCRtZE9wZW5NZW51OiBGdW5jdGlvbiwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hdG9yRXYgPSBldmVudDtcclxuICAgICAgICAkbWRPcGVuTWVudSh0aGlzLm9yaWdpbmF0b3JFdik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU3ViQWN0aW9uQ2xpY2soYWN0aW9uOiBTaW1wbGVBY3Rpb25JdGVtKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFhY3Rpb24gfHwgYWN0aW9uLmRpdmlkZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihhY3Rpb24uY2xpY2spKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbi5jbGljayhhY3Rpb24pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLmhyZWYpIHtcclxuICAgICAgICAgICAgdGhpcy4kd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhY3Rpb24uaHJlZjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi51cmwpIHtcclxuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24udXJsKGFjdGlvbi51cmwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRpbmplY3Rvci5oYXMoJyRzdGF0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3N0YXRlOiBhbmd1bGFyLnVpLklTdGF0ZVNlcnZpY2UgPSB0aGlzLiRpbmplY3Rvci5nZXQoJyRzdGF0ZScpIGFzIG5nLnVpLklTdGF0ZVNlcnZpY2VcclxuICAgICAgICAgICAgICAgIF9zdGF0ZS5nbyhhY3Rpb24uc3RhdGUsIGFjdGlvbi5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChhY3Rpb24uZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLm9yaWdpbmF0b3JFdiA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHJhaXNlIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdCgncGlwQWN0aW9uQ2xpY2tlZCcsIGFjdGlvbi5uYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5vcmlnaW5hdG9yRXYgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYnJlYWRjcnVtYjogbmcuSUNvbXBvbmVudE9wdGlvbnMgPSB7XHJcbiAgICBiaW5kaW5nczoge30sXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2JyZWFkY3J1bWIvQnJlYWRjcnVtYi5odG1sJyxcclxuICAgIGNvbnRyb2xsZXI6IEJyZWFkY3J1bWJDb250cm9sbGVyXHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEJyZWFkY3J1bWInKVxyXG4gICAgLmNvbXBvbmVudCgncGlwQnJlYWRjcnVtYicsIGJyZWFkY3J1bWIpOyIsImltcG9ydCB7IFNpbXBsZUFjdGlvbkl0ZW0gfSBmcm9tICcuLi9hY3Rpb25zL0lBY3Rpb25zU2VydmljZSc7XHJcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iSXRlbSB7XHJcbiAgICB0aXRsZTogc3RyaW5nID0gbnVsbDtcclxuICAgIGNsaWNrPzogKGl0ZW06IEJyZWFkY3J1bWJJdGVtKSA9PiB2b2lkID0gbnVsbDsgICBcclxuICAgIHN1YkFjdGlvbnM/OiBTaW1wbGVBY3Rpb25JdGVtW10gPSBudWxsOyBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJDb25maWcge1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgaXRlbXM6IEJyZWFkY3J1bWJJdGVtW107XHJcbiAgICBjcml0ZXJpYTogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7IEJyZWFkY3J1bWJJdGVtLCBCcmVhZGNydW1iQ29uZmlnIH0gZnJvbSAnLi9CcmVhZGNydW1iQ29uZmlnJztcclxuaW1wb3J0IHsgSUJyZWFkY3J1bWJTZXJ2aWNlLCBJQnJlYWRjcnVtYlByb3ZpZGVyIH0gZnJvbSAnLi9JQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEJyZWFkY3J1bWJDaGFuZ2VkRXZlbnQ6IHN0cmluZyA9IFwicGlwQnJlYWRjcnVtYkNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IEJyZWFkY3J1bWJCYWNrRXZlbnQ6IHN0cmluZyA9IFwicGlwQnJlYWRjcnVtYkJhY2tcIjtcclxuXHJcbmNsYXNzIEJyZWFkY3J1bWJTZXJ2aWNlIGltcGxlbWVudHMgSUJyZWFkY3J1bWJTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQnJlYWRjcnVtYkNvbmZpZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICBjb25maWc6IEJyZWFkY3J1bWJDb25maWdcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLml0ZW1zID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGl0ZW1zKCk6IEJyZWFkY3J1bWJJdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpdGVtcyh2YWx1ZTogQnJlYWRjcnVtYkl0ZW1bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuaXRlbXMgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNyaXRlcmlhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jcml0ZXJpYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNyaXRlcmlhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93VGV4dCh0ZXh0OiBzdHJpbmcsIGNyaXRlcmlhPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pdGVtcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gY3JpdGVyaWE7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0l0ZW1zKGl0ZW1zOiBCcmVhZGNydW1iSXRlbVtdLCBjcml0ZXJpYT86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pdGVtcyA9IGl0ZW1zIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSBjcml0ZXJpYTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kQ29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoQnJlYWRjcnVtYkNoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIEJyZWFkY3J1bWJQcm92aWRlciBpbXBsZW1lbnRzIElCcmVhZGNydW1iUHJvdmlkZXIsIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCcmVhZGNydW1iQ29uZmlnID0gbmV3IEJyZWFkY3J1bWJDb25maWcoKTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEJyZWFkY3J1bWJTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgdGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50ZXh0ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpOiBJQnJlYWRjcnVtYlNlcnZpY2Uge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBCcmVhZGNydW1iU2VydmljZSgkcm9vdFNjb3BlLCB0aGlzLl9jb25maWcpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEJyZWFkY3J1bWInKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBCcmVhZGNydW1iJywgQnJlYWRjcnVtYlByb3ZpZGVyKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3BpcEJyZWFkY3J1bWInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcycsICdwaXBOYXYuVHJhbnNsYXRlJ10pO1xyXG5cclxuaW1wb3J0ICcuL0JyZWFkY3J1bWInO1xyXG5pbXBvcnQgJy4vQnJlYWRjcnVtYlNlcnZpY2UnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9CcmVhZGNydW1iU2VydmljZSc7XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgSU5hdlNlcnZpY2UgfSBmcm9tICcuL0lOYXZTZXJ2aWNlJ1xyXG5pbXBvcnQgeyBJTmF2SWNvblNlcnZpY2UgfSBmcm9tICcuLi9pY29uL0lOYXZJY29uU2VydmljZSc7XHJcbmltcG9ydCB7IElOYXZNZW51U2VydmljZSB9IGZyb20gJy4uL21lbnUvSU5hdk1lbnVTZXJ2aWNlJztcclxuaW1wb3J0IHsgSU5hdkhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi9oZWFkZXIvSU5hdkhlYWRlclNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQnJlYWRjcnVtYlNlcnZpY2UgfSBmcm9tICcuLi9icmVhZGNydW1iL0lCcmVhZGNydW1iU2VydmljZSc7XHJcbmltcG9ydCB7IElTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoL0lTZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0IHsgSUFjdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vYWN0aW9ucy9JQWN0aW9uc1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQXBwQmFyU2VydmljZSB9IGZyb20gJy4uL2FwcGJhci9JQXBwQmFyU2VydmljZSc7XHJcbmltcG9ydCB7IElTaWRlTmF2U2VydmljZSB9IGZyb20gJy4uL3NpZGVuYXYvSVNpZGVOYXZTZXJ2aWNlJztcclxuXHJcbmNsYXNzIE5hdlNlcnZpY2UgaW1wbGVtZW50cyBJTmF2U2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGFwcGJhcjogSUFwcEJhclNlcnZpY2U7XHJcbiAgICBwdWJsaWMgaWNvbjogSU5hdkljb25TZXJ2aWNlO1xyXG4gICAgcHVibGljIGJyZWFkY3J1bWI6IElCcmVhZGNydW1iU2VydmljZTtcclxuICAgIHB1YmxpYyBhY3Rpb25zOiBJQWN0aW9uc1NlcnZpY2U7XHJcbiAgICBwdWJsaWMgc2VhcmNoOiBJU2VhcmNoU2VydmljZTtcclxuICAgIHB1YmxpYyBzaWRlbmF2OiBJU2lkZU5hdlNlcnZpY2U7XHJcbiAgICBwdWJsaWMgaGVhZGVyOiBJTmF2SGVhZGVyU2VydmljZTtcclxuICAgIHB1YmxpYyBtZW51OiBJTmF2TWVudVNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCRpbmplY3RvcjogbmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB0aGlzLmFwcGJhciA9ICRpbmplY3Rvci5oYXMoJ3BpcEFwcEJhcicpID8gPElBcHBCYXJTZXJ2aWNlPiRpbmplY3Rvci5nZXQoJ3BpcEFwcEJhcicpIDogbnVsbDtcclxuICAgICAgICB0aGlzLmljb24gPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZJY29uJykgPyA8SU5hdkljb25TZXJ2aWNlPiRpbmplY3Rvci5nZXQoJ3BpcE5hdkljb24nKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5icmVhZGNydW1iID0gJGluamVjdG9yLmhhcygncGlwQnJlYWRjcnVtYicpID8gPElCcmVhZGNydW1iU2VydmljZT4kaW5qZWN0b3IuZ2V0KCdwaXBCcmVhZGNydW1iJykgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuYWN0aW9ucyA9ICRpbmplY3Rvci5oYXMoJ3BpcEFjdGlvbnMnKSA/IDxJQWN0aW9uc1NlcnZpY2U+JGluamVjdG9yLmdldCgncGlwQWN0aW9ucycpIDogbnVsbDtcclxuICAgICAgICB0aGlzLnNlYXJjaCA9ICRpbmplY3Rvci5oYXMoJ3BpcFNlYXJjaCcpID8gPElTZWFyY2hTZXJ2aWNlPiRpbmplY3Rvci5nZXQoJ3BpcFNlYXJjaCcpIDogbnVsbDtcclxuICAgICAgICB0aGlzLnNpZGVuYXYgPSAkaW5qZWN0b3IuaGFzKCdwaXBTaWRlTmF2JykgPyA8SVNpZGVOYXZTZXJ2aWNlPiRpbmplY3Rvci5nZXQoJ3BpcFNpZGVOYXYnKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZIZWFkZXInKSA/IDxJTmF2SGVhZGVyU2VydmljZT4kaW5qZWN0b3IuZ2V0KCdwaXBOYXZIZWFkZXInKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5tZW51ID0gJGluamVjdG9yLmhhcygncGlwTmF2TWVudScpID8gPElOYXZNZW51U2VydmljZT4kaW5qZWN0b3IuZ2V0KCdwaXBOYXZNZW51JykgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICAvLyBSZXNldCBhcHBiYXJcclxuICAgICAgICBpZiAodGhpcy5hcHBiYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBiYXIuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVzZXQgaWNvblxyXG4gICAgICAgIGlmICh0aGlzLmljb24pIHtcclxuICAgICAgICAgICAgdGhpcy5pY29uLnNob3dNZW51KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNldCBicmVhZGNydW1iXHJcbiAgICAgICAgaWYgKHRoaXMuYnJlYWRjcnVtYikge1xyXG4gICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWIuc2hvd1RleHQobnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNldCBhY3Rpb25zXHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVzZXQgc2VhcmNoXHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLnNldChudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNpZGVuYXYpIHtcclxuICAgICAgICAgICAgdGhpcy5zaWRlbmF2LnNob3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZTZXJ2aWNlJywgW10pXHJcbiAgICAuc2VydmljZSgncGlwTmF2U2VydmljZScsIE5hdlNlcnZpY2UpOyIsIntcclxuXHJcbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVGaWx0ZXIoJGluamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGxldCBwaXBUcmFuc2xhdGU6IHBpcC5zZXJ2aWNlcy5JVHJhbnNsYXRlU2VydmljZSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpIFxyXG4gICAgICAgICAgICA/IDxwaXAuc2VydmljZXMuSVRyYW5zbGF0ZVNlcnZpY2U+JGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwaXBUcmFuc2xhdGUgPyBwaXBUcmFuc2xhdGUudHJhbnNsYXRlKGtleSkgfHwga2V5IDoga2V5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwTmF2LlRyYW5zbGF0ZScsIFtdKVxyXG4gICAgICAgIC5maWx0ZXIoJ3RyYW5zbGF0ZScsIHRyYW5zbGF0ZUZpbHRlcik7XHJcblxyXG59XHJcblxyXG4iLCJ7XHJcbiAgICBjbGFzcyBEcm9wZG93bkNvbnRyb2xsZXIge1xyXG4gICAgICAgIHByaXZhdGUgX3BpcFRyYW5zbGF0ZTogcGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlO1xyXG4gICAgICAgIHByaXZhdGUgX3BpcFRoZW1lOiBwaXAudGhlbWVzLklUaGVtZVNlcnZpY2U7XHJcbiAgICAgICAgcHJpdmF0ZSBfcGlwTWVkaWE6IHBpcC5sYXlvdXRzLklNZWRpYVNlcnZpY2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyB0aGVtZUNsYXNzOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIG1lZGlhOiBhbnk7XHJcbiAgICAgICAgcHVibGljIGFjdGlvbnM6IGFueVtdOyAvLyBzdHJpbmcgb3IgYXJyYXlcclxuICAgICAgICBwdWJsaWMgYWN0aXZlSW5kZXg6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBjdXJyZW50VGhlbWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIG5nRGlzYWJsZWQ6IEZ1bmN0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBzaG93RHJvcGRvd246IEZ1bmN0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBzZWxlY3Q6IGFueTtcclxuICAgICAgICBwdWJsaWMgcGlwQ2hhbmdlOiBGdW5jdGlvbjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbmd1bGFyLklTY29wZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxyXG4gICAgICAgICAgICAkZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICAgICAgJGF0dHJzOiBuZy5JQXR0cmlidXRlcyxcclxuICAgICAgICAgICAgJGluamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2UsXHJcbiAgICAgICAgICAgICRsb2c6IG5nLklMb2dTZXJ2aWNlLFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICAgICAgJG1kTWVkaWE6IGFuZ3VsYXIubWF0ZXJpYWwuSU1lZGlhLFxyXG5cclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcGlwVGhlbWUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUaGVtZScpID8gPHBpcC50aGVtZXMuSVRoZW1lU2VydmljZT4kaW5qZWN0b3IuZ2V0KCdwaXBUaGVtZScpIDogbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gPHBpcC5sYXlvdXRzLklNZWRpYVNlcnZpY2U+JGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGlwVGhlbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRoZW1lID0gdGhpcy5fcGlwVGhlbWUudGhlbWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJHJvb3RTY29wZVsnJHRoZW1lJ10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRoZW1lID0gJHJvb3RTY29wZVsnJHRoZW1lJ107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudGhlbWVDbGFzcyA9ICgkYXR0cnNbJ2NsYXNzJ10gfHwgJycpICsgJyBtZC0nICsgdGhpcy5jdXJyZW50VGhlbWUgKyAnLXRoZW1lJztcclxuXHJcbiAgICAgICAgICAgIC8vcGlwQXNzZXJ0LmlzQXJyYXkoJHNjb3BlLmFjdGlvbnMsICdwaXBEcm9wZG93bjogcGlwLWFjdGlvbnMgYXR0cmlidXRlIHNob3VsZCB0YWtlIGFuIGFycmF5LCBidXQgdGFrZSAnICsgdHlwZW9mICRzY29wZS5hY3Rpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5tZWRpYSA9ICFfLmlzVW5kZWZpbmVkKHRoaXMuX3BpcE1lZGlhKSA/IHRoaXMuX3BpcE1lZGlhIDogJG1kTWVkaWE7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9ICh0aGlzLmFjdGlvbnMgJiYgXy5pc0FycmF5KHRoaXMuYWN0aW9ucykpID8gdGhpcy5hY3Rpb25zIDogW107XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSB0aGlzLmFjdGl2ZUluZGV4IHx8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5nRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5nRGlzYWJsZWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uU2VsZWN0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuYWN0aW9uc1tpbmRleF0sIHRoaXMuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5waXBDaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlwQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNob3coKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IGJvb2xlYW47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dEcm9wZG93bigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0aGlzLnNob3dEcm9wZG93bigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpbnRlcmZhY2UgSURyb3Bkb3duQmluZGluZ3Mge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IGFueTtcclxuXHJcbiAgICAgICAgbmdEaXNhYmxlZDogYW55LFxyXG4gICAgICAgIGFjdGlvbnM6IGFueSxcclxuICAgICAgICBzaG93RHJvcGRvd246IGFueSxcclxuICAgICAgICBhY3RpdmVJbmRleDogYW55LFxyXG4gICAgICAgIHNlbGVjdDogYW55LFxyXG4gICAgICAgIHBpcENoYW5nZTogYW55XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgRHJvcGRvd25CaW5kaW5nczogSURyb3Bkb3duQmluZGluZ3MgPSB7XHJcbiAgICAgICAgbmdEaXNhYmxlZDogJyYnLFxyXG4gICAgICAgIGFjdGlvbnM6ICc9cGlwQWN0aW9ucycsXHJcbiAgICAgICAgc2hvd0Ryb3Bkb3duOiAnJnBpcFNob3cnLFxyXG4gICAgICAgIGFjdGl2ZUluZGV4OiAnPXBpcEFjdGl2ZUluZGV4JyxcclxuICAgICAgICBzZWxlY3Q6ICc9cGlwRHJvcGRvd25TZWxlY3QnLFxyXG4gICAgICAgIHBpcENoYW5nZTogJyYnXHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRHJvcGRvd25DaGFuZ2VzIGltcGxlbWVudHMgbmcuSU9uQ2hhbmdlc09iamVjdCwgSURyb3Bkb3duQmluZGluZ3Mge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IG5nLklDaGFuZ2VzT2JqZWN0PGFueT47XHJcblxyXG4gICAgICAgIG5nRGlzYWJsZWQ6IG5nLklDaGFuZ2VzT2JqZWN0PEZ1bmN0aW9uPjtcclxuICAgICAgICBhY3Rpb25zOiBuZy5JQ2hhbmdlc09iamVjdDxhbnk+O1xyXG4gICAgICAgIHNob3dEcm9wZG93bjogbmcuSUNoYW5nZXNPYmplY3Q8RnVuY3Rpb24+O1xyXG4gICAgICAgIGFjdGl2ZUluZGV4OiBuZy5JQ2hhbmdlc09iamVjdDxudW1iZXI+O1xyXG4gICAgICAgIHNlbGVjdDogbmcuSUNoYW5nZXNPYmplY3Q8YW55PjtcclxuICAgICAgICBwaXBDaGFuZ2U6IG5nLklDaGFuZ2VzT2JqZWN0PEZ1bmN0aW9uPjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkcm9wZG93bjogbmcuSUNvbXBvbmVudE9wdGlvbnMgPSB7XHJcbiAgICAgICAgYmluZGluZ3M6IERyb3Bkb3duQmluZGluZ3MsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdkcm9wZG93bi9Ecm9wZG93bi5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBEcm9wZG93bkNvbnRyb2xsZXJcclxuICAgIH07XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcERyb3Bkb3duJywgWydwaXBOYXYuVGVtcGxhdGVzJ10pXHJcbiAgICAgICAgLmNvbXBvbmVudCgncGlwRHJvcGRvd24nLCBkcm9wZG93bik7XHJcblxyXG59IiwiaW1wb3J0IHsgSU5hdkhlYWRlclNlcnZpY2UgfSBmcm9tIFwiLi9JTmF2SGVhZGVyU2VydmljZVwiO1xyXG5pbXBvcnQgeyBOYXZIZWFkZXJDb25maWcgfSBmcm9tIFwiLi9OYXZIZWFkZXJDb25maWdcIjtcclxuXHJcbntcclxuICAgIGNsYXNzIE5hdkhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIHByaXZhdGUgY2xlYW51cE5hdkhlYWRlckNoYW5nZWQ6IEZ1bmN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgY2xlYW51cFNpZGVOYXZTdGF0ZUNoYW5nZWQ6IEZ1bmN0aW9uO1xyXG5cclxuICAgICAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgc3VidGl0bGU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgaW1hZ2VVcmw6IHN0cmluZyA9IG51bGw7XHJcbiAgICAgICAgcHVibGljIGltYWdlQ3NzOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGltYWdlOiBhbnk7XHJcbiAgICAgICAgcHVibGljIGltYWdlQmxvY2s6IGFueTtcclxuICAgICAgICBwdWJsaWMgbG9hZGVkRGVmYXVsdEltYWdlOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBzaG93SGVhZGVyOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHJpdmF0ZSAkZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLFxyXG4gICAgICAgICAgICAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlIHBpcE5hdkhlYWRlcjogSU5hdkhlYWRlclNlcnZpY2UsXHJcbiAgICAgICAgICAgIG5hdkNvbnN0YW50OiBhbnlcclxuXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXN0aWNreS1uYXYtaGVhZGVyJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXRJbWFnZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jbGVhbnVwTmF2SGVhZGVyQ2hhbmdlZCA9ICRyb290U2NvcGUuJG9uKCdwaXBOYXZIZWFkZXJDaGFuZ2VkJywgKCRldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBOYXZIZWFkZXJDb25maWcpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25OYXZIZWFkZXJDaGFuZ2VkKCRldmVudCwgY29uZmlnKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhbnVwU2lkZU5hdlN0YXRlQ2hhbmdlZCA9ICRyb290U2NvcGUuJG9uKCdwaXBTaWRlTmF2U3RhdGVDaGFuZ2VkJywgKCRldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgc3RhdGU6IGFueSkgPT4geyAvL25hdlN0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkKCRldmVudCwgc3RhdGUpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyAkb25EZXN0cm95KCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzLmNsZWFudXBOYXZIZWFkZXJDaGFuZ2VkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhbnVwTmF2SGVhZGVyQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGhpcy5jbGVhbnVwU2lkZU5hdlN0YXRlQ2hhbmdlZCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYW51cFNpZGVOYXZTdGF0ZUNoYW5nZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0SW1hZ2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VCbG9jayA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLnBpcC1zdGlja3ktbmF2LWhlYWRlci11c2VyJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5waXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci1pbWFnZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmltYWdlWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZVswXS5vbmxvYWQgPSAoKCkgPT4gdGhpcy5vbkltYWdlTG9hZCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKCRldmVudDogSFRNTEVsZW1lbnQsIGVycm9ldjogRXZlbnQpOiBhbnkgPT4gIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5vbkltYWdlTG9hZCgkZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZVswXS5vbmVycm9yID0gKCgpID0+IHRoaXMub25JbWFnZUVycm9yKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICgkZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5vbkltYWdlRXJyb3IoJGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCgpID0+IHRoaXMub25JbWFnZUxvYWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZS5vbmVycm9yID0gKCgpID0+IHRoaXMub25JbWFnZUVycm9yKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub25OYXZIZWFkZXJDaGFuZ2VkKG51bGwsIHRoaXMucGlwTmF2SGVhZGVyLmNvbmZpZyk7XHJcbiAgICAgICAgICAgIH0sIDIwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdEhlYWRlcigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBpcE5hdkhlYWRlci5jb25maWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnBpcE5hdkhlYWRlci5jb25maWcudGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMuc3VidGl0bGUgPSB0aGlzLnBpcE5hdkhlYWRlci5jb25maWcuc3VidGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VVcmwgPSB0aGlzLnBpcE5hdkhlYWRlci5jb25maWcuaW1hZ2VVcmw7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VDc3MgPSB0aGlzLnBpcE5hdkhlYWRlci5jb25maWcuaW1hZ2VDc3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAvLyBXaGVuIGltYWdlIGlzIGxvYWRlZCByZXNpemUvcmVwb3NpdGlvbiBpdFxyXG4gICAgICAgIC8vIHByaXZhdGUgb25JbWFnZUxvYWQoJGV2ZW50KSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBpbWFnZTogbmcuSUF1Z21lbnRlZEpRdWVyeSA9ICQoJGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0SW1hZ2VNYXJnaW5DU1MoaW1hZ2UpO1xyXG4gICAgICAgIC8vIH07XHJcblxyXG4gICAgICAgIC8vIHByaXZhdGUgb25JbWFnZUVycm9yKCRldmVudCkge1xyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5sb2FkZWREZWZhdWx0SW1hZ2UpIHJldHVybjtcclxuICAgICAgICAvLyAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2V0SW1hZ2UodGhpcy5waXBOYXZIZWFkZXIuY29uZmlnLCB0cnVlKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfTtcclxuICAgICAgICAvLyBXaGVuIGltYWdlIGlzIGxvYWRlZCByZXNpemUvcmVwb3NpdGlvbiBpdFxyXG4gICAgICAgIHByaXZhdGUgb25JbWFnZUxvYWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SW1hZ2VNYXJnaW5DU1ModGhpcy5pbWFnZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbkltYWdlRXJyb3IoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvYWRlZERlZmF1bHRJbWFnZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kYXBwbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbWFnZSh0aGlzLnBpcE5hdkhlYWRlci5jb25maWcsIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIG9uU3RhdGVDaGFuZ2VkKGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBzdGF0ZTogYW55KSB7IC8vIG5hdlN0YXRlXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUuaWQgPT0gJ3RvZ2dsZScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0hlYWRlciA9IHN0YXRlICYmIHN0YXRlLmlkID09ICd0b2dnbGUnO1xyXG4gICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0hlYWRlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldEltYWdlTWFyZ2luQ1NTKGltYWdlOiBuZy5JQXVnbWVudGVkSlF1ZXJ5KSB7IC8vaW1hZ2VbMF1cclxuICAgICAgICAgICAgdmFyIGNzc1BhcmFtcyA9IHt9LFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyV2lkdGggPSB0aGlzLmltYWdlQmxvY2sud2lkdGggPyB0aGlzLmltYWdlQmxvY2sud2lkdGgoKSA6IHRoaXMuaW1hZ2VCbG9jay5jbGllbnRXaWR0aCxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckhlaWdodCA9IHRoaXMuaW1hZ2VCbG9jay5oZWlnaHQgPyB0aGlzLmltYWdlQmxvY2suaGVpZ2h0KCkgOiB0aGlzLmltYWdlQmxvY2suY2xpZW50SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VXaWR0aCA9IGltYWdlWzBdWyduYXR1cmFsV2lkdGgnXSB8fCBpbWFnZS53aWR0aCxcclxuICAgICAgICAgICAgICAgIGltYWdlSGVpZ2h0ID0gaW1hZ2VbMF1bJ25hdHVyYWxIZWlnaHQnXSB8fCBpbWFnZS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW4gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKChpbWFnZVdpZHRoIC8gY29udGFpbmVyV2lkdGgpID4gKGltYWdlSGVpZ2h0IC8gY29udGFpbmVySGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luID0gLSgoaW1hZ2VXaWR0aCAvIGltYWdlSGVpZ2h0ICogY29udGFpbmVySGVpZ2h0IC0gY29udGFpbmVyV2lkdGgpIC8gMik7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ21hcmdpbi1sZWZ0J10gPSAnJyArIG1hcmdpbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ2hlaWdodCddID0gJycgKyBjb250YWluZXJIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWyd3aWR0aCddID0gJycgKyBpbWFnZVdpZHRoICogY29udGFpbmVySGVpZ2h0IC8gaW1hZ2VIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydtYXJnaW4tdG9wJ10gPSAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hcmdpbiA9IC0oKGltYWdlSGVpZ2h0IC8gaW1hZ2VXaWR0aCAqIGNvbnRhaW5lcldpZHRoIC0gY29udGFpbmVySGVpZ2h0KSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgY3NzUGFyYW1zWydtYXJnaW4tdG9wJ10gPSAnJyArIG1hcmdpbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ2hlaWdodCddID0gJycgKyBpbWFnZUhlaWdodCAqIGNvbnRhaW5lcldpZHRoIC8gaW1hZ2VXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjc3NQYXJhbXNbJ3dpZHRoJ10gPSAnJyArIGNvbnRhaW5lcldpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNzc1BhcmFtc1snbWFyZ2luLWxlZnQnXSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbWFnZS5jc3MoY3NzUGFyYW1zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIHNldEltYWdlKGNvbmZpZywgbG9hZEVycm9yOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGlmICghY29uZmlnKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxvYWRFcnJvciAmJiAhIWNvbmZpZy5pbWFnZVVybCkge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gY29uZmlnLmltYWdlVXJsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWREZWZhdWx0SW1hZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdXJsID0gY29uZmlnLmRlZmF1bHRJbWFnZVVybDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHVybCAmJiB0aGlzLmltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlLmF0dHIoJ3NyYycsIHVybCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlQmxvY2suY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25OYXZIZWFkZXJDaGFuZ2VkKCRldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBOYXZIZWFkZXJDb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBjb25maWcudGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMuc3VidGl0bGUgPSBjb25maWcuc3VidGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VVcmwgPSBjb25maWcuaW1hZ2VVcmw7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VDc3MgPSBjb25maWcuaW1hZ2VDc3M7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEltYWdlKGNvbmZpZywgZmFsc2UpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb25Vc2VyQ2xpY2soKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdwaXBOYXZVc2VyQ2xpY2tlZCcpOyAvLyB0b2RvXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuYXZIZWFkZXI6IG5nLklDb21wb25lbnRPcHRpb25zID0ge1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnaGVhZGVyL05hdkhlYWRlci5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBOYXZIZWFkZXJDb250cm9sbGVyXHJcbiAgICB9O1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBOYXZIZWFkZXInKVxyXG4gICAgICAgIC5jb21wb25lbnQoJ3BpcE5hdkhlYWRlcicsIG5hdkhlYWRlcik7XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIE5hdkhlYWRlckNvbmZpZyB7XHJcbiAgICAvLyBJbWFnZSB1cmxcclxuICAgIHB1YmxpYyBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgLy8gSW1hZ2UgdXJsXHJcbiAgICBwdWJsaWMgZGVmYXVsdEltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICAvLyBUaXRsZVxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAvLyBTdWJ0aXRsZVxyXG4gICAgcHVibGljIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICAvLyBpbWFnZSBzdHlsZXNcclxuICAgIHB1YmxpYyBpbWFnZUNzczogc3RyaW5nO1xyXG4gICAgLy8gSGFuZGxlIGhlYWRlciBjbGljayBldmVudFxyXG4gICAgY2xpY2s6ICgpID0+IHZvaWQ7XHJcbiAgICAvLyBFdmVudCBuYW1lXHJcbiAgICBldmVudDogc3RyaW5nXHJcbn07IiwiaW1wb3J0IHsgTmF2SGVhZGVyQ29uZmlnIH0gZnJvbSBcIi4vTmF2SGVhZGVyQ29uZmlnXCI7XHJcbmltcG9ydCB7IElOYXZIZWFkZXJTZXJ2aWNlLCBJTmF2SGVhZGVyUHJvdmlkZXIgfSBmcm9tIFwiLi9JTmF2SGVhZGVyU2VydmljZVwiO1xyXG5cclxuZXhwb3J0IGxldCBOYXZIZWFkZXJDaGFuZ2VkRXZlbnQgPSAncGlwTmF2SGVhZGVyQ2hhbmdlZCc7XHJcblxyXG5jbGFzcyBOYXZIZWFkZXJTZXJ2aWNlIGltcGxlbWVudHMgSU5hdkhlYWRlclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZIZWFkZXJDb25maWc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogTmF2SGVhZGVyQ29uZmlnLCBwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkhlYWRlckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3VidGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnN1YnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc3VidGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbWFnZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpbWFnZVVybCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsaWNrKCk6ICgpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuY2xpY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGljayh2YWx1ZTogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBldmVudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBldmVudCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyh0aXRsZTogc3RyaW5nLCBzdWJ0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuc3VidGl0bGUgPSBzdWJ0aXRsZTtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBpbWFnZVVybDtcclxuXHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFja09yRXZlbnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoXy5pc1N0cmluZyhjYWxsYmFja09yRXZlbnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IGNhbGxiYWNrT3JFdmVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuaW1hZ2VVcmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChOYXZIZWFkZXJDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE5hdkhlYWRlclByb3ZpZGVyIGltcGxlbWVudHMgSU5hdkhlYWRlclByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogTmF2SGVhZGVyQ29uZmlnID0gbmV3IE5hdkhlYWRlckNvbmZpZygpO1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogTmF2SGVhZGVyU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBOYXZIZWFkZXJDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb25maWcodmFsdWU6IE5hdkhlYWRlckNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBOYXZIZWFkZXJDb25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlZmF1bHRJbWFnZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZGVmYXVsdEltYWdlVXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGVmYXVsdEltYWdlVXJsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZGVmYXVsdEltYWdlVXJsID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnRpdGxlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdWJ0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc3VidGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzdWJ0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN1YnRpdGxlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbWFnZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpbWFnZVVybCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGljaygpOiAoKSA9PiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsaWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2xpY2sodmFsdWU6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGV2ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5ldmVudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGV2ZW50KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZXZlbnQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0KHRpdGxlOiBzdHJpbmcsIHN1YnRpdGxlOiBzdHJpbmcsIGltYWdlVXJsOiBzdHJpbmcsIGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IHN1YnRpdGxlO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IGltYWdlVXJsO1xyXG5cclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrT3JFdmVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfLmlzU3RyaW5nKGNhbGxiYWNrT3JFdmVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudGl0bGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmltYWdlVXJsID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgTmF2SGVhZGVyU2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXZIZWFkZXInKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBOYXZIZWFkZXInLCBOYXZIZWFkZXJQcm92aWRlcik7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdwaXBOYXZIZWFkZXInLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRlbXBsYXRlcyddKTtcclxuXHJcbmltcG9ydCAnLi9OYXZIZWFkZXJTZXJ2aWNlJztcclxuaW1wb3J0ICcuL05hdkhlYWRlcic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL05hdkhlYWRlclNlcnZpY2UnOyIsImltcG9ydCB7IE9wZW5TaWRlTmF2RXZlbnQgfSBmcm9tICcuLi9zaWRlbmF2L1NpZGVOYXZTZXJ2aWNlJztcclxuaW1wb3J0IHsgTmF2SWNvbkNvbmZpZyB9IGZyb20gJy4vTmF2SWNvbkNvbmZpZyc7XHJcbmltcG9ydCB7IElOYXZJY29uU2VydmljZSB9IGZyb20gJy4vSU5hdkljb25TZXJ2aWNlJztcclxuaW1wb3J0IHsgTmF2SWNvbkNsaWNrZWRFdmVudCwgTmF2SWNvbkNoYW5nZWRFdmVudCB9IGZyb20gJy4vTmF2SWNvblNlcnZpY2UnO1xyXG5cclxuaW50ZXJmYWNlIElOYXZJY29uQmluZGluZ3Mge1xyXG4gICAgW2tleTogc3RyaW5nXTogYW55O1xyXG5cclxuICAgIHR5cGU6IGFueTtcclxuICAgIGltYWdlVXJsOiBhbnk7XHJcbiAgICBpY29uOiBhbnk7XHJcbn1cclxuXHJcbmNvbnN0IE5hdkljb25CaW5kaW5nczogSU5hdkljb25CaW5kaW5ncyA9IHtcclxuICAgIHR5cGU6ICc8P3BpcFR5cGUnLFxyXG4gICAgaW1hZ2VVcmw6ICc8P3BpcEltYWdlVXJsJyxcclxuICAgIGljb246ICc8P3BpcEljb24nXHJcbn1cclxuXHJcbmNsYXNzIE5hdkljb25DaGFuZ2VzIGltcGxlbWVudHMgbmcuSU9uQ2hhbmdlc09iamVjdCwgSU5hdkljb25CaW5kaW5ncyB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBuZy5JQ2hhbmdlc09iamVjdDxhbnk+O1xyXG4gICAgLy8gTm90IG9uZSB3YXkgYmluZGluZ3NcclxuXHJcbiAgICB0eXBlOiBuZy5JQ2hhbmdlc09iamVjdDxzdHJpbmc+O1xyXG4gICAgaW1hZ2VVcmw6IG5nLklDaGFuZ2VzT2JqZWN0PHN0cmluZz47XHJcbiAgICBpY29uOiBuZy5JQ2hhbmdlc09iamVjdDxzdHJpbmc+O1xyXG59XHJcblxyXG5jbGFzcyBOYXZJY29uQ29udHJvbGxlciBpbXBsZW1lbnRzIElOYXZJY29uQmluZGluZ3Mge1xyXG4gICAgcHJpdmF0ZSBjbGVhckZuOiBGdW5jdGlvbjtcclxuXHJcbiAgICBwdWJsaWMgY29uZmlnOiBOYXZJY29uQ29uZmlnO1xyXG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgcHVibGljIGljb246IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2UsXHJcbiAgICAgICAgJGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgJHNjb3BlOiBhbmd1bGFyLklTY29wZSxcclxuICAgICAgICAkbG9nOiBuZy5JTG9nU2VydmljZSxcclxuICAgICAgICBwaXBOYXZJY29uOiBJTmF2SWNvblNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcblxyXG4gICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtbmF2LWljb24nKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBwaXBOYXZJY29uLmNvbmZpZztcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhckZuID0gJHJvb3RTY29wZS4kb24oJ3BpcE5hdkljb25DaGFuZ2VkJywgKGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IE5hdkljb25Db25maWcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbk5hdkljb25DaGFuZ2VkKGV2ZW50LCBjb25maWcpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkb25Jbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcudHlwZSA9IHRoaXMudHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2VVcmwpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuaW1hZ2VVcmwgPSB0aGlzLmltYWdlVXJsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pY29uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmljb24gPSB0aGlzLmljb247XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLmNsZWFyRm4pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25OYXZJY29uQ2hhbmdlZChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBOYXZJY29uQ29uZmlnKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uTmF2SWNvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5jb25maWcuY2xpY2spKSB7XHJcbiAgICAgICAgICAgIC8vIEV4ZWN1dGUgbmF2IGljb24gY2FsbGJhY2tcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuY2xpY2soKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KHRoaXMuY29uZmlnLmV2ZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLnR5cGUgPT0gJ21lbnUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KE9wZW5TaWRlTmF2RXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcudHlwZSA9PSAnYmFjaycpIHtcclxuICAgICAgICAgICAgdGhpcy4kd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KE5hdkljb25DbGlja2VkRXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNvbnN0IE5hdkljb246IG5nLklDb21wb25lbnRPcHRpb25zID0ge1xyXG4gICAgYmluZGluZ3M6IE5hdkljb25CaW5kaW5ncyxcclxuICAgIHRlbXBsYXRlVXJsOiAnaWNvbi9OYXZJY29uLmh0bWwnLFxyXG4gICAgY29udHJvbGxlcjogTmF2SWNvbkNvbnRyb2xsZXJcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2SWNvbicpXHJcbiAgICAuY29tcG9uZW50KCdwaXBOYXZJY29uJywgTmF2SWNvbik7XHJcbiIsImV4cG9ydCBjbGFzcyBOYXZJY29uQ29uZmlnIHtcclxuICAgIC8vIFR5cGUgb2YgbmF2IGljb246ICdiYWNrJywgJ21lbnUnLCAnaW1hZ2UnIG9yICdub25lJ1xyXG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAgIC8vIEltYWdlIHVybFxyXG4gICAgcHVibGljIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICAvLyBJY29uIG5hbWVcclxuICAgIHB1YmxpYyBpY29uOiBzdHJpbmc7XHJcbiAgICAvLyBIYW5kbGUgbmF2IGljb24gY2xpY2sgZXZlbnRcclxuICAgIGNsaWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgLy8gRXZlbnQgbmFtZVxyXG4gICAgZXZlbnQ6IHN0cmluZ1xyXG59OyIsImltcG9ydCB7IE5hdkljb25Db25maWcgfSBmcm9tICcuL05hdkljb25Db25maWcnO1xyXG5pbXBvcnQgeyBJTmF2SWNvblNlcnZpY2UsIElOYXZJY29uUHJvdmlkZXIgfSBmcm9tICcuL0lOYXZJY29uU2VydmljZSc7XHJcblxyXG5leHBvcnQgY29uc3QgTmF2SWNvbkNsaWNrZWRFdmVudDogc3RyaW5nID0gJ3BpcE5hdkljb25DbGlja2VkJztcclxuZXhwb3J0IGNvbnN0IE5hdkljb25DaGFuZ2VkRXZlbnQ6IHN0cmluZyA9ICdwaXBOYXZJY29uQ2hhbmdlZCc7XHJcblxyXG5jbGFzcyBOYXZJY29uU2VydmljZSBpbXBsZW1lbnRzIElOYXZJY29uU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdkljb25Db25maWc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogTmF2SWNvbkNvbmZpZywgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBOYXZJY29uQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2tPckV2ZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xpY2sgPSBjYWxsYmFja09yRXZlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzU3RyaW5nKGNhbGxiYWNrT3JFdmVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGljayA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5ldmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93TWVudShjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdtZW51JztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dJY29uKGljb246IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnaWNvbic7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0JhY2soY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnYmFjayc7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93SW1hZ2UoaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnaW1hZ2UnO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IGltYWdlVXJsO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdub25lJztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChudWxsKTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KE5hdkljb25DaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE5hdkljb25Qcm92aWRlciBpbXBsZW1lbnRzIElOYXZJY29uUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZJY29uQ29uZmlnID0gbmV3IE5hdkljb25Db25maWcoKTtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IE5hdkljb25TZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IE5hdkljb25Db25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb25maWcodmFsdWU6IE5hdkljb25Db25maWcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB2YWx1ZSB8fCBuZXcgTmF2SWNvbkNvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNsaWNrID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmNsaWNrID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcoY2FsbGJhY2tPckV2ZW50KSlcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLmV2ZW50ID0gY2FsbGJhY2tPckV2ZW50O1xyXG4gICAgICAgIGVsc2UgdGhpcy5fY29uZmlnLmV2ZW50ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TWVudShjYWxsYmFja09yRXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudHlwZSA9ICdtZW51JztcclxuICAgICAgICB0aGlzLnNldENhbGxiYWNrT3JFdmVudChjYWxsYmFja09yRXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJY29uKGljb246IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnaWNvbic7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEJhY2soY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnYmFjayc7XHJcbiAgICAgICAgdGhpcy5zZXRDYWxsYmFja09yRXZlbnQoY2FsbGJhY2tPckV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SW1hZ2UoaW1hZ2VVcmw6IHN0cmluZywgY2FsbGJhY2tPckV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSAnaW1hZ2UnO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbWFnZVVybCA9IGltYWdlVXJsO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KGNhbGxiYWNrT3JFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsbGJhY2tPckV2ZW50KG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IE5hdkljb25TZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG4gICAgIFxyXG59XHJcblxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwTmF2SWNvbicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcE5hdkljb24nLCBOYXZJY29uUHJvdmlkZXIpO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgncGlwTmF2SWNvbicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVHJhbnNsYXRlJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vTmF2SWNvbkNvbmZpZyc7XHJcbmltcG9ydCAnLi9JTmF2SWNvblNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vTmF2SWNvblNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vTmF2SWNvbic7XHJcblxyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9OYXZJY29uQ29uZmlnJztcclxuZXhwb3J0ICogZnJvbSAnLi9JTmF2SWNvblNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL05hdkljb25TZXJ2aWNlJztcclxuIiwi77u/aW1wb3J0ICcuL2RlcGVuZGVuY2llcy9UcmFuc2xhdGVGaWx0ZXInO1xyXG5pbXBvcnQgJy4vbGFuZ3VhZ2UvTGFuZ3VhZ2VQaWNrZXJEaXJlY3RpdmUnO1xyXG5pbXBvcnQgJy4vZHJvcGRvd24vRHJvcGRvd24nO1xyXG5pbXBvcnQgJy4vdGFicy9UYWJzJztcclxuaW1wb3J0ICcuL2FjdGlvbnMnO1xyXG5pbXBvcnQgJy4vYXBwYmFyJztcclxuaW1wb3J0ICcuL3NlYXJjaCc7XHJcbmltcG9ydCAnLi9icmVhZGNydW1iJztcclxuaW1wb3J0ICcuL3NpZGVuYXYnO1xyXG5pbXBvcnQgJy4vaGVhZGVyJztcclxuaW1wb3J0ICcuL21lbnUnO1xyXG5pbXBvcnQgJy4vaWNvbic7XHJcbmltcG9ydCAnLi9jb21tb24vTmF2U2VydmljZSc7XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBOYXYnLCBbXHJcbiAgICAgICAgJ3BpcE5hdlNlcnZpY2UnLFxyXG4gICAgICAgICdwaXBEcm9wZG93bicsXHJcbiAgICAgICAgJ3BpcFRhYnMnLFxyXG4gICAgICAgICdwaXBBcHBCYXInLFxyXG4gICAgICAgICdwaXBTZWFyY2hCYXInLFxyXG4gICAgICAgICdwaXBOYXZJY29uJyxcclxuICAgICAgICAncGlwQnJlYWRjcnVtYicsXHJcbiAgICAgICAgJ3BpcExhbmd1YWdlUGlja2VyJyxcclxuICAgICAgICAncGlwQWN0aW9ucycsIFxyXG4gICAgICAgICdwaXBTaWRlTmF2JyxcclxuICAgICAgICAncGlwTmF2TWVudScsXHJcbiAgICAgICAgJ3BpcE5hdkhlYWRlcidcclxuICAgIF0pXHJcbiAgICAuY29uc3RhbnQoJ25hdkNvbnN0YW50Jywge1xyXG4gICAgICAgICdUQUJfQlJFQUtQT0lOVCc6ICdndC1zbScsXHJcbiAgICAgICAgJ1NJREVOQVZfQ09OVEFJTkVSJzogJy5waXAtbWFpbicsXHJcbiAgICAgICAgJ1NJREVOQVZfTEFSR0VfV0lEVEgnOiAzMjAsXHJcbiAgICAgICAgJ1NJREVOQVZfTUlERExFX1dJRFRIJzogMjQwLFxyXG4gICAgICAgICdTSURFTkFWX1NNQUxMX1dJRFRIJzogNzIsXHJcbiAgICAgICAgJ1NJREVOQVZfQU5JTUFUSU9OX0RVUkFUSU9OJzogNjAwXHJcbiAgICB9KVxyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9hY3Rpb25zJztcclxuZXhwb3J0ICogZnJvbSAnLi9hcHBiYXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2JyZWFkY3J1bWInO1xyXG5leHBvcnQgKiBmcm9tICcuL3NlYXJjaCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2lkZW5hdic7XHJcbmV4cG9ydCAqIGZyb20gJy4vaWNvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbWVudSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaGVhZGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb21tb24vSU5hdlNlcnZpY2UnO1xyXG4iLCJ7XHJcbiAgICBjbGFzcyBMYW5ndWFnZVBpY2tlckRpcmVjdGl2ZUNvbnRyb2xsZXIgaW1wbGVtZW50cyBJTGFuZ3VhZ2VQaWNrZXJCaW5kaW5ncyB7XHJcbiAgICAgICAgcHJpdmF0ZSBfdHJhbnNsYXRlOiBwaXAuc2VydmljZXMuSVRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgICAgICAgcHVibGljIGxhbmd1YWdlczogc3RyaW5nW10gPSBbJ2VuJywgJ3J1J107XHJcbiAgICAgICAgcHVibGljIHZhbHVlOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgICRlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgICAgICAgICAkaW5qZWN0b3I6IG5nLmF1dG8uSUluamVjdG9yU2VydmljZSxcclxuICAgICAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2VcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyA8cGlwLnNlcnZpY2VzLklUcmFuc2xhdGVTZXJ2aWNlPiRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGx5IGNsYXNzIGFuZCBjYWxsIHJlc2l6ZVxyXG4gICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLWxhbmd1YWdlLXBpY2tlcicpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRMYW5ndWFnZXModGhpcy5sYW5ndWFnZXMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgIHx8IHRoaXMubGFuZ3VhZ2VzWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBsYW5ndWFnZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zbGF0ZSA/IHRoaXMuX3RyYW5zbGF0ZS5sYW5ndWFnZSA6IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0TGFuZ3VhZ2VzKGxhbmd1YWdlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZXMgPSBsYW5ndWFnZXMubGVuZ3RoID4gMCA/IGxhbmd1YWdlcyA6IFsnZW4nLCAncnUnXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkxhbmd1YWdlQ2xpY2sobGFuZ3VhZ2U6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdHJhbnNsYXRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBsYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlLmxhbmd1YWdlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAgICAgICAgIC8vIH0sIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbnRlcmZhY2UgSUxhbmd1YWdlUGlja2VyQmluZGluZ3Mge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IGFueTtcclxuXHJcbiAgICAgICAgbGFuZ3VhZ2VzOiBhbnksXHJcbiAgICAgICAgdmFsdWU6IGFueVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IExhbmd1YWdlUGlja2VyQmluZGluZ3M6IElMYW5ndWFnZVBpY2tlckJpbmRpbmdzID0ge1xyXG4gICAgICAgIGxhbmd1YWdlczogJzxsYW5ndWFnZXMnLFxyXG4gICAgICAgIHZhbHVlOiAnPT92YWx1ZSdcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsYW5ndWFnZVBpY2tlckRpcmVjdGl2ZTogbmcuSUNvbXBvbmVudE9wdGlvbnMgPSB7XHJcbiAgICAgICAgYmluZGluZ3M6IExhbmd1YWdlUGlja2VyQmluZGluZ3MsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdsYW5ndWFnZS9MYW5ndWFnZVBpY2tlci5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBMYW5ndWFnZVBpY2tlckRpcmVjdGl2ZUNvbnRyb2xsZXJcclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwTGFuZ3VhZ2VQaWNrZXInLCBbXHJcbiAgICAgICAgICAgICduZ01hdGVyaWFsJywgJ3BpcE5hdi5UcmFuc2xhdGUnLCAncGlwTmF2LlRlbXBsYXRlcydcclxuICAgICAgICBdKVxyXG4gICAgICAgIC5jb21wb25lbnQoJ3BpcExhbmd1YWdlUGlja2VyJywgbGFuZ3VhZ2VQaWNrZXJEaXJlY3RpdmUpO1xyXG5cclxufSIsImltcG9ydCB7IElTaWRlTmF2U2VydmljZX0gZnJvbSAnLi4vc2lkZW5hdi9JU2lkZU5hdlNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJTmF2TWVudVNlcnZpY2V9IGZyb20gJy4vSU5hdk1lbnVTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2lkZU5hdlN0YXRlTmFtZXMsIFNpZGVOYXZTdGF0ZSwgU2lkZU5hdkNvbmZpZyB9IGZyb20gJy4uL3NpZGVuYXYvU2lkZU5hdlN0YXRlJztcclxuaW1wb3J0IHsgTmF2TWVudUNvbmZpZywgTmF2TWVudVNlY3Rpb24sIE5hdk1lbnVMaW5rIH0gZnJvbSAnLi9OYXZNZW51Q29uZmlnJztcclxuXHJcbigoKSA9PiB7XHJcbiAgICBjbGFzcyBOYXZNZW51Q29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBfc3RhdGU6IGFuZ3VsYXIudWkuSVN0YXRlU2VydmljZTtcclxuICAgICAgICBwcml2YXRlIF9waXBNZWRpYTogcGlwLmxheW91dHMuSU1lZGlhU2VydmljZTtcclxuICAgICAgICBwcml2YXRlIF9hbmltYXRpb25EdXJhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9waXBTaWRlTmF2RWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHVibGljIHNlY3Rpb25zOiBOYXZNZW51U2VjdGlvbltdO1xyXG4gICAgICAgIHB1YmxpYyBkZWZhdWx0SWNvbjogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBpc0NvbGxhcHNlZDogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgZXhwYW5kZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIGV4cGFuZGVkQnV0dG9uOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBzaWRlTmF2U3RhdGU6IFNpZGVOYXZTdGF0ZTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbmd1bGFyLklTY29wZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSBwaXBTaWRlTmF2OiBJU2lkZU5hdlNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgcGlwTmF2TWVudTogSU5hdk1lbnVTZXJ2aWNlLFxyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgICAgICRpbmplY3RvcjogbmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgICAgICBuYXZDb25zdGFudDogYW55XHJcblxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICRpbmplY3Rvci5oYXMoJyRzdGF0ZScpID8gPGFuZ3VsYXIudWkuSVN0YXRlU2VydmljZT4kaW5qZWN0b3IuZ2V0KCckc3RhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25EdXJhdGlvbiA9IG5hdkNvbnN0YW50LlNJREVOQVZfQU5JTUFUSU9OX0RVUkFUSU9OLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGlwU2lkZU5hdkVsZW1lbnQgPSAkZWxlbWVudC5wYXJlbnQoKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdwaXAtc3RpY2t5LW5hdi1tZW51Jyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlY3Rpb25zID0gdGhpcy4kc2NvcGVbJ3NlY3Rpb25zJ10gfHwgdGhpcy5waXBOYXZNZW51LnNlY3Rpb25zO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRDb2xsYXBzaWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0SWNvbiA9IHRoaXMucGlwTmF2TWVudS5kZWZhdWx0SWNvbjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZWQobnVsbCwgdGhpcy5waXBTaWRlTmF2LnN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjbGVhbnVwTmF2TWVudUNoYW5nZWQ6IEZ1bmN0aW9uID0gdGhpcy4kcm9vdFNjb3BlLiRvbigncGlwTmF2TWVudUNoYW5nZWQnLCAoJGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IE5hdk1lbnVDb25maWcpID0+IHsgLy9uYXZTdGF0ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbmZpZ0NoYW5nZWQoJGV2ZW50LCBjb25maWcpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgY2xlYW51cFNpZGVOYXZTdGF0ZUNoYW5nZWQ6IEZ1bmN0aW9uID0gdGhpcy4kcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdlN0YXRlQ2hhbmdlZCcsICgkZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIHN0YXRlOiBTaWRlTmF2U3RhdGUpID0+IHsgLy9uYXZTdGF0ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlZCgkZXZlbnQsIHN0YXRlKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGNsZWFudXBOYXZNZW51Q2hhbmdlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwTmF2TWVudUNoYW5nZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oY2xlYW51cFNpZGVOYXZTdGF0ZUNoYW5nZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cFNpZGVOYXZTdGF0ZUNoYW5nZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRDb2xsYXBzaWJsZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIGNvbGxhcHNlZDogYm9vbGVhbjtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzLiRzY29wZVsnY29sbGFwc2VkJ10pKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQgPSB0aGlzLiRzY29wZVsnY29sbGFwc2VkJ10oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZCA9IHRoaXMuJHNjb3BlWydjb2xsYXBzZWQnXSAhPT0gZmFsc2UgJiYgdGhpcy4kc2NvcGVbJ2NvbGxhcHNlZCddICE9PSAnZmFsc2UnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzQ29sbGFwc2VkID0gY29sbGFwc2VkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uRXhwYW5kKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNDb2xsYXBzZWQpIHsgcmV0dXJuIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9waXBTaWRlTmF2RWxlbWVudC5yZW1vdmVDbGFzcygncGlwLXN0aWNreS1uYXYtc21hbGwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BpcFNpZGVOYXZFbGVtZW50LmFkZENsYXNzKCdwaXAtc3RpY2t5LW5hdi1zbWFsbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgncGlwTmF2RXhwYW5kZWQnLCB0aGlzLmV4cGFuZGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0hpZGRlbihpdGVtOiBOYXZNZW51TGluayk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbSAmJiBpdGVtLmFjY2VzcyAmJiAhaXRlbS5hY2Nlc3MoaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaXNTZWN0aW9uRW1wdHkobGlua0NvbGxlY3Rpb246IE5hdk1lbnVMaW5rW10pOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgIF8uZWFjaChsaW5rQ29sbGVjdGlvbiwgKGxpbms6IE5hdk1lbnVMaW5rKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNIaWRkZW4obGluaykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbkNvbmZpZ0NoYW5nZWQoJGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBjb25maWc6IE5hdk1lbnVDb25maWcpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5zZWN0aW9ucyA9IGNvbmZpZy5zZWN0aW9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25TdGF0ZUNoYW5nZWQoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIHN0YXRlOiBTaWRlTmF2U3RhdGUpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy8gU1M+IFlvdSBzaGFsbCBub3Qgc2V0IGl0IGludG8gdGhlIG1lbnUgc3RhdGUuIEluc3RlYWQgaXQgc2hhbGwgYmUgY29udHJvbGxlZCBieSB0aGUgc3RhdGUgb2YgU2lkZW5hdlxyXG4gICAgICAgICAgICBpZiAoIXN0YXRlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzQ29sbGFwc2VkID0gc3RhdGUuZXhwYW5kO1xyXG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gc3RhdGUuaXNFeHBhbmRlZDtcclxuICAgICAgICAgICAgdGhpcy5leHBhbmRlZEJ1dHRvbiA9IHN0YXRlLmV4cGFuZGVkQnV0dG9uO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaWRlTmF2U3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0FjdGl2ZShsaW5rOiBOYXZNZW51TGluayk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBpZiAobGluay5wYXJlbnRTdGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSAhPSBudWxsICYmIHRoaXMuX3N0YXRlLmluY2x1ZGVzKGxpbmsucGFyZW50U3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluay5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9IG51bGwgJiYgdGhpcy5fc3RhdGUuaW5jbHVkZXMobGluay5zdGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5rLmhyZWYpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLmhyZWYuc3BsaXQoJz8nKVswXSA9PT0gdGhpcy4kd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmsudXJsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluay51cmwuc3BsaXQoL1tcXHMvP10rLylbMV0gPT09IHRoaXMuJGxvY2F0aW9uLnVybCgpLnNwbGl0KC9bXFxzLz9dKy8pWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGlja0xpbmsoZXZlbnQ6IG5nLklBbmd1bGFyRXZlbnQsIGxpbms6IE5hdk1lbnVMaW5rKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaW5rKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpcFNpZGVOYXYuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsaW5rLmhyZWYpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLmhyZWYuc3BsaXQoJz8nKVswXSA9PT0gdGhpcy4kd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlwU2lkZU5hdi5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5waXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbmsuaHJlZjtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMuX2FuaW1hdGlvbkR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluay51cmwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rLnVybC5zcGxpdCgvW1xccy8/XSsvKVsxXSA9PT0gdGhpcy4kbG9jYXRpb24udXJsKCkuc3BsaXQoL1tcXHMvP10rLylbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5waXBTaWRlTmF2LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi51cmwobGluay51cmwpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5fYW5pbWF0aW9uRHVyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5rLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUgIT0gbnVsbCAmJiB0aGlzLl9zdGF0ZS5jdXJyZW50Lm5hbWUgPT09IGxpbmsuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpcFNpZGVOYXYuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGlwU2lkZU5hdi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUuZ28obGluay5zdGF0ZSwgbGluay5zdGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLl9hbmltYXRpb25EdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmsuZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KGxpbmsuZXZlbnQsIGxpbmspO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW50ZXJmYWNlIElOYXZNZW51QmluZGluZ3Mge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IGFueTtcclxuICAgICAgICBzZWN0aW9uczogYW55LFxyXG4gICAgICAgIGNvbGxhcHNlZDogYW55XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgTmF2TWVudUJpbmRpbmdzOiBJTmF2TWVudUJpbmRpbmdzID0ge1xyXG4gICAgICAgIHNlY3Rpb25zOiAnPT9waXBTZWN0aW9ucycsXHJcbiAgICAgICAgY29sbGFwc2VkOiAnPT9waXBDb2xsYXBzZWQnXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIG5hdk1lbnVEaXJlY3RpdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBOYXZNZW51QmluZGluZ3MsXHJcbiAgICAgICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ21lbnUvTmF2TWVudS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogTmF2TWVudUNvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcE5hdk1lbnUnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3BpcE5hdk1lbnUnLCBuYXZNZW51RGlyZWN0aXZlKTtcclxuXHJcbn0pKCk7IiwiaW1wb3J0IHsgTmF2TWVudUNvbmZpZywgTmF2TWVudVNlY3Rpb24gfSBmcm9tICcuL05hdk1lbnVDb25maWcnO1xyXG5pbXBvcnQgeyBJTmF2TWVudVNlcnZpY2UsIElOYXZNZW51UHJvdmlkZXIgfSBmcm9tICcuL0lOYXZNZW51U2VydmljZSc7XHJcblxyXG5leHBvcnQgY29uc3QgTmF2TWVudUNoYW5nZWRFdmVudCA9ICdwaXBOYXZNZW51Q2hhbmdlZCc7XHJcblxyXG5jbGFzcyBOYXZNZW51U2VydmljZSBpbXBsZW1lbnRzIElOYXZNZW51U2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IE5hdk1lbnVDb25maWc7XHJcbiAgICBwcml2YXRlIF9yb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25maWc6IE5hdk1lbnVDb25maWcsXHJcbiAgICAgICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9yb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VjdGlvbnMoKTogTmF2TWVudVNlY3Rpb25bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zZWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlY3Rpb25zKHZhbHVlOiBOYXZNZW51U2VjdGlvbltdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnNlY3Rpb25zID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlZmF1bHRJY29uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5kZWZhdWx0SWNvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlQmFkZ2VTdHlsZShsaW5rOiBzdHJpbmcsIHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAobGluayA9PSBudWxsIHx8ICFfLmlzU3RyaW5nKHN0eWxlKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfLmVhY2godGhpcy5fY29uZmlnLnNlY3Rpb25zLCAocykgPT4ge1xyXG4gICAgICAgICAgICBfLmVhY2gocy5saW5rcywgKGwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsLm5hbWUgPT0gbGluaylcclxuICAgICAgICAgICAgICAgICAgICBsLmJhZGdlU3R5bGUgPSBzdHlsZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkZWZhdWx0SWNvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmRlZmF1bHRJY29uID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlQ291bnQobGluazogc3RyaW5nLCBjb3VudDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGxpbmsgPT0gbnVsbCB8fCAhXy5pc051bWJlcihjb3VudCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5zZWN0aW9ucywgKHMpID0+IHtcclxuICAgICAgICAgICAgXy5lYWNoKHMubGlua3MsIChsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobC5uYW1lID09IGxpbmspXHJcbiAgICAgICAgICAgICAgICAgICAgbC5jb3VudCA9IGNvdW50O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJDb3VudHMoKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NvbmZpZy5zZWN0aW9ucywgKHMpID0+IHtcclxuICAgICAgICAgICAgXy5lYWNoKHMubGlua3MsIChsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsLmNvdW50ID0gbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kQ2hhbmdlRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdFNjb3BlLiRlbWl0KE5hdk1lbnVDaGFuZ2VkRXZlbnQsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE5hdk1lbnVQcm92aWRlciBpbXBsZW1lbnRzIElOYXZNZW51UHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBOYXZNZW51Q29uZmlnID0ge1xyXG4gICAgICAgIHNlY3Rpb25zOiBbXSxcclxuICAgICAgICBkZWZhdWx0SWNvbjogJ2ljb25zOmZvbGRlcidcclxuICAgIH07XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBOYXZNZW51U2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlY3Rpb25zKCk6IE5hdk1lbnVTZWN0aW9uW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc2VjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWN0aW9ucyh2YWx1ZTogTmF2TWVudVNlY3Rpb25bXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zZWN0aW9ucyA9IHZhbHVlIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVmYXVsdEljb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmRlZmF1bHRJY29uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGVmYXVsdEljb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5kZWZhdWx0SWNvbiA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAkZ2V0KCRyb290U2NvcGUpIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgTmF2TWVudVNlcnZpY2UodGhpcy5fY29uZmlnLCAkcm9vdFNjb3BlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcE5hdk1lbnUnKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBOYXZNZW51JywgTmF2TWVudVByb3ZpZGVyKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3BpcE5hdk1lbnUnLCBbJ25nTWF0ZXJpYWwnLCAncGlwTmF2LlRyYW5zbGF0ZScsICdwaXBOYXYuVGVtcGxhdGVzJ10pO1xyXG5cclxuaW1wb3J0ICcuL05hdk1lbnVTZXJ2aWNlJztcclxuaW1wb3J0ICcuL05hdk1lbnUnOyIsImltcG9ydCB7IFNlYXJjaENvbmZpZyB9IGZyb20gJy4vU2VhcmNoQ29uZmlnJztcclxuaW1wb3J0IHsgSVNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL0lTZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0IHsgT3BlblNlYXJjaEV2ZW50LCBDbG9zZVNlYXJjaEV2ZW50LCBTZWFyY2hDaGFuZ2VkRXZlbnQsIFNlYXJjaEFjdGl2YXRlZEV2ZW50IH0gZnJvbSAnLi9TZWFyY2hTZXJ2aWNlJztcclxuXHJcbmNsYXNzIFNlYXJjaEJhckNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBjbGVhckZuOiBGdW5jdGlvbjtcclxuXHJcbiAgICBwdWJsaWMgY29uZmlnOiBTZWFyY2hDb25maWc7XHJcbiAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHNlYXJjaDogYW55ID0geyB0ZXh0OiAnJyB9O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgcGlwU2VhcmNoOiBJU2VhcmNoU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBjbGFzcyBhbmQgY2FsbCByZXNpemVcclxuICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXNlYXJjaC1iYXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBwaXBTZWFyY2guY29uZmlnO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICB0aGlzLmNsZWFyRm4gPSAkcm9vdFNjb3BlLiRvbihTZWFyY2hDaGFuZ2VkRXZlbnQsIChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBTZWFyY2hDb25maWcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblNlYXJjaENoYW5nZWQoZXZlbnQsIGNvbmZpZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLmNsZWFyRm4pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRlQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygndy1zdHJldGNoJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucGFyZW50KCkuYWRkQ2xhc3MoJ3BpcC1zZWFyY2gtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3ctc3RyZXRjaCcpO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnBhcmVudCgpLnJlbW92ZUNsYXNzKCdwaXAtc2VhcmNoLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2VhcmNoQ2hhbmdlZChldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBTZWFyY2hDb25maWcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlYXJjaC50ZXh0ID0gJyc7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZm9jdXNUZXh0KCk6IHZvaWQge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudDogSlF1ZXJ5ID0gJCgnLnBpcC1zZWFyY2gtdGV4dCcpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2gudGV4dCA9IHRoaXMuY29uZmlnLmNyaXRlcmlhO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mb2N1c1RleHQoKTtcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNlYXJjaCA9IHRoaXMuc2VhcmNoLnRleHQ7XHJcblxyXG4gICAgICAgIHRoaXMuc2VhcmNoLnRleHQgPSAnJztcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jYWxsYmFjayhzZWFyY2gpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KFNlYXJjaEFjdGl2YXRlZEV2ZW50LCBzZWFyY2gpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoLnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2gudGV4dCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzVGV4dCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgLy8gRW50ZXIgcHJlc3NlZFxyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMylcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XHJcbiAgICAgICAgLy8gRVNDIHByZXNzZWRcclxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgU2VhcmNoQmFyOiBuZy5JQ29tcG9uZW50T3B0aW9ucyA9IHtcclxuICAgIHRlbXBsYXRlVXJsOiAnc2VhcmNoL1NlYXJjaEJhci5odG1sJyxcclxuICAgIGNvbnRyb2xsZXI6IFNlYXJjaEJhckNvbnRyb2xsZXJcclxufVxyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZSgncGlwU2VhcmNoQmFyJylcclxuICAgIC5jb21wb25lbnQoJ3BpcFNlYXJjaEJhcicsIFNlYXJjaEJhcik7XHJcbiIsImV4cG9ydCBjbGFzcyBTZWFyY2hDb25maWcge1xyXG4gICAgLy8gU2VhcmNoIHZpc2libGVcclxuICAgIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgLy8gU2VhcmNoIGNyaXRlcmlhXHJcbiAgICBwdWJsaWMgY3JpdGVyaWE6IHN0cmluZztcclxuICAgIC8vIEN1c3RvbSBzZWFyY2ggcGFyYW1ldGVyc1xyXG4gICAgcHVibGljIHBhcmFtczogYW55O1xyXG4gICAgLy8gSGlzdG9yeSBmb3Igc2VhcmNoIGF1dG9jb21wbGV0ZVxyXG4gICAgcHVibGljIGhpc3Rvcnk6IHN0cmluZ1tdO1xyXG4gICAgLy8gQ2FsbGJhY2sgZm9yIHNlYXJjaFxyXG4gICAgY2FsbGJhY2s6IChjcml0ZXJpYTogc3RyaW5nKSA9PiB2b2lkO1xyXG59IiwiaW1wb3J0IHsgU2VhcmNoQ29uZmlnIH0gZnJvbSAnLi9TZWFyY2hDb25maWcnO1xyXG5pbXBvcnQgeyBJU2VhcmNoUHJvdmlkZXIsIElTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9JU2VhcmNoU2VydmljZSc7XHJcblxyXG5leHBvcnQgY29uc3QgT3BlblNlYXJjaEV2ZW50ID0gJ3BpcE9wZW5TZWFyY2gnO1xyXG5leHBvcnQgY29uc3QgQ2xvc2VTZWFyY2hFdmVudCA9ICdwaXBDbG9zZVNlYXJjaCc7XHJcbmV4cG9ydCBjb25zdCBTZWFyY2hDaGFuZ2VkRXZlbnQgPSAncGlwU2VhcmNoQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBTZWFyY2hBY3RpdmF0ZWRFdmVudCA9ICdwaXBTZWFyY2hBY3RpdmF0ZWQnO1xyXG5cclxuY2xhc3MgU2VhcmNoU2VydmljZSBpbXBsZW1lbnRzIElTZWFyY2hTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogU2VhcmNoQ29uZmlnO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25maWc6IFNlYXJjaENvbmZpZyxcclxuICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKE9wZW5TZWFyY2hFdmVudCwgKCkgPT4geyB0aGlzLm9wZW4gfSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQ2xvc2VTZWFyY2hFdmVudCwgKCkgPT4geyB0aGlzLmNsb3NlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IFNlYXJjaENvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNyaXRlcmlhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jcml0ZXJpYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNyaXRlcmlhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuY3JpdGVyaWEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFyYW1zKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5wYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJhbXModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJhbXMgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaGlzdG9yeSgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5oaXN0b3J5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaGlzdG9yeSh2YWx1ZTogc3RyaW5nW10pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuaGlzdG9yeSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjYWxsYmFjaygpOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNhbGxiYWNrKHZhbHVlOiAoY3JpdGVyaWE6IHN0cmluZykgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jYWxsYmFjayA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldChjYWxsYmFjazogKGNyaXRlcmlhOiBzdHJpbmcpID0+IHZvaWQsIGNyaXRlcmlhPzogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGhpc3Rvcnk/OiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jcml0ZXJpYSA9IGNyaXRlcmlhO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmhpc3RvcnkgPSBoaXN0b3J5O1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmNyaXRlcmlhID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFyYW1zID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcudmlzaWJsZSA9ICF0aGlzLl9jb25maWcudmlzaWJsZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KFNlYXJjaENoYW5nZWRFdmVudCwgdGhpcy5fY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU2VhcmNoUHJvdmlkZXIgaW1wbGVtZW50cyBJU2VhcmNoUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBTZWFyY2hDb25maWcgPSBuZXcgU2VhcmNoQ29uZmlnKCk7XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgJGdldCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBTZWFyY2hTZXJ2aWNlKHRoaXMuX2NvbmZpZywgJHJvb3RTY29wZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3BpcFNlYXJjaEJhcicpXHJcbiAgICAucHJvdmlkZXIoJ3BpcFNlYXJjaCcsIFNlYXJjaFByb3ZpZGVyKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3BpcFNlYXJjaEJhcicsIFsnbmdNYXRlcmlhbCcsICdwaXBOYXYuVHJhbnNsYXRlJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vU2VhcmNoQ29uZmlnJztcclxuaW1wb3J0ICcuL0lTZWFyY2hTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1NlYXJjaFNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vU2VhcmNoQmFyJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vSVNlYXJjaFNlcnZpY2UnO1xyXG4iLCJpbXBvcnQgeyBJU2lkZU5hdlNlcnZpY2UgfSBmcm9tICcuL0lTaWRlTmF2U2VydmljZSc7XHJcbmltcG9ydCB7IFNpZGVOYXZTdGF0ZU5hbWVzLCBTaWRlTmF2U3RhdGUsIFNpZGVOYXZTdGF0ZUNvbmZpZywgU2lkZU5hdkNvbmZpZyB9IGZyb20gJy4vU2lkZU5hdlN0YXRlJztcclxuXHJcbmNsYXNzIFNpZGVOYXZDb250cm9sbGVyIGltcGxlbWVudHMgSVNpZGVOYXZCaW5kaW5ncyB7XHJcbiAgICBwcml2YXRlIF9waXBNZWRpYTogcGlwLmxheW91dHMuSU1lZGlhU2VydmljZTtcclxuICAgIHByaXZhdGUgX2lzUmVzaXppbmc6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9hbmltYXRpb25EdXJhdGlvbjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbWFpbkNvbnRhaW5lcjogc3RyaW5nOyAvLyB0b2RvIGFkZCAgdG8gY29uZmlnXHJcbiAgICBwcml2YXRlIF9iaWdXaWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbWlkZGxlV2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3NtYWxsV2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX21lZGlhQnJlYWtwb2ludHM6IHBpcC5sYXlvdXRzLk1lZGlhQnJlYWtwb2ludHM7XHJcbiAgICBwcml2YXRlIF9uYXZTdGF0ZTogU2lkZU5hdlN0YXRlQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBjbGVhbnVwTWFpblJlc2l6ZWQ6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBjbGVhbnVwU2lkZU5hdlN0YXRlOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgY2xlYW51cE5hdkhlYWRlckNoYW5nZWQ6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBjbGVhbnVwU2lkZU5hdkNoYW5nZWQ6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSB3aW5kb3dSZXNpemU6IEZ1bmN0aW9uO1xyXG5cclxuICAgIHB1YmxpYyBzaWRlbmF2U3RhdGU6IFNpZGVOYXZTdGF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgICAgICRhdHRyczogbmcuSUF0dHJpYnV0ZXMsXHJcbiAgICAgICAgJGluamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLFxyXG4gICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcGlwU2lkZU5hdjogSVNpZGVOYXZTZXJ2aWNlLFxyXG4gICAgICAgIG5hdkNvbnN0YW50OiBhbnlcclxuXHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIHRoaXMuX3BpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/IDxwaXAubGF5b3V0cy5JTWVkaWFTZXJ2aWNlPiRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9tYWluQ29udGFpbmVyID0gbmF2Q29uc3RhbnQuU0lERU5BVl9DT05UQUlORVI7XHJcbiAgICAgICAgdGhpcy5fYmlnV2lkdGggPSBuYXZDb25zdGFudC5TSURFTkFWX0xBUkdFX1dJRFRIO1xyXG4gICAgICAgIHRoaXMuX21pZGRsZVdpZHRoID0gbmF2Q29uc3RhbnQuU0lERU5BVl9NSURETEVfV0lEVEg7XHJcbiAgICAgICAgdGhpcy5fc21hbGxXaWR0aCA9IG5hdkNvbnN0YW50LlNJREVOQVZfU01BTExfV0lEVEg7XHJcbiAgICAgICAgdGhpcy5faXNSZXNpemluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbkR1cmF0aW9uID0gbmF2Q29uc3RhbnQuU0lERU5BVl9BTklNQVRJT05fRFVSQVRJT047XHJcbiAgICAgICAgdGhpcy5fbmF2U3RhdGUgPSBuZXcgU2lkZU5hdlN0YXRlQ29uZmlnKCk7XHJcbiAgICAgICAgdGhpcy5fbWVkaWFCcmVha3BvaW50cyA9IHRoaXMuc2V0QnJlYWtwb2ludHMoKTtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgY2xhc3MgYW5kIGNhbGwgcmVzaXplXHJcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygncGlwLXN0aWNreS1zaWRlbmF2Jyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBpcFNpZGVOYXYuY29uZmlnICYmIHRoaXMucGlwU2lkZU5hdi5jb25maWcudHlwZSAhPSAncG9wdXAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTaWRlTmF2ZVN0YXRlKClcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplID0gXy5kZWJvdW5jZSgoKSA9PiB7IHRoaXMuc2V0U2lkZU5hdmVTdGF0ZSgpOyB9LCAxMCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cE1haW5SZXNpemVkID0gdGhpcy4kcm9vdFNjb3BlLiRvbigncGlwTWFpblJlc2l6ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpbmRvd1Jlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhbnVwU2lkZU5hdlN0YXRlID0gdGhpcy4kcm9vdFNjb3BlLiRvbigncGlwU2lkZU5hdlN0YXRlJywgKCRldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgc3RhdGU6IFNpZGVOYXZTdGF0ZU5hbWVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2lkZU5hdlN0YXRlKCRldmVudCwgc3RhdGUpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzUmVzaXppbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaWRlbmF2U3RhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBpcFNpZGVOYXYuY29uZmlnLmJhY2tkcm9wID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygncGlwLXNpZGVuYXYtaGlkZS1iYWNrZHJvcCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdwaXAtc2lkZW5hdi1oaWRlLWJhY2tkcm9wJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNpZGVOYXZTdGF0ZU5hbWVzLlRvZ2dsZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNsZWFudXBOYXZIZWFkZXJDaGFuZ2VkID0gdGhpcy4kcm9vdFNjb3BlLiRvbigncGlwTmF2SWNvbkNsaWNrZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25OYXZJY29uQ2xpY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNsZWFudXBTaWRlTmF2Q2hhbmdlZCA9IHRoaXMuJHJvb3RTY29wZS4kb24oJ3BpcFNpZGVOYXZDaGFuZ2VkJywgKCRldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBTaWRlTmF2Q29uZmlnKSA9PiB7IC8vbmF2U3RhdGVcclxuICAgICAgICAgICAgdGhpcy5vblNpZGVOYXZDaGFuZ2VkKCRldmVudCwgY29uZmlnKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJG9uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRoaXMuY2xlYW51cE5hdkhlYWRlckNoYW5nZWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cE5hdkhlYWRlckNoYW5nZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzLmNsZWFudXBTaWRlTmF2Q2hhbmdlZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhbnVwU2lkZU5hdkNoYW5nZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzLmNsZWFudXBNYWluUmVzaXplZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhbnVwTWFpblJlc2l6ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0aGlzLmNsZWFudXBTaWRlTmF2U3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cFNpZGVOYXZTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEJyZWFrcG9pbnRzKCk6IHBpcC5sYXlvdXRzLk1lZGlhQnJlYWtwb2ludHMge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGlwTWVkaWEgfHwgIWFuZ3VsYXIuaXNPYmplY3QodGhpcy5fcGlwTWVkaWEuYnJlYWtwb2ludHMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHhzOiA2MzksIHNtOiA5NTksIG1kOiAxMDI0LCBsZzogMTkxOSB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9waXBNZWRpYS5icmVha3BvaW50cztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNpZGVOYXZDaGFuZ2VkKCRldmVudDogbmcuSUFuZ3VsYXJFdmVudCwgY29uZmlnOiBTaWRlTmF2Q29uZmlnKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcudmlzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk5hdkljb25DbGljaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBpcFNpZGVOYXYub3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TaWRlTmF2U3RhdGUoJGV2ZW50OiBuZy5JQW5ndWxhckV2ZW50LCBzdGF0ZU5hbWU6IFNpZGVOYXZTdGF0ZU5hbWVzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoc3RhdGVOYW1lKSAmJiB0aGlzLl9uYXZTdGF0ZVtzdGF0ZU5hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNpZGVOYXZlU3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucGlwU2lkZU5hdi5jb25maWcgJiYgdGhpcy5waXBTaWRlTmF2LmNvbmZpZy50eXBlID09ICdwb3B1cCcpIHsgcmV0dXJuIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzUmVzaXppbmcpIHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7IHRoaXMuc2V0U2lkZU5hdmVTdGF0ZSgpIH0sIHRoaXMuX2FuaW1hdGlvbkR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYWluV2lkdGg6IG51bWJlciA9ICQodGhpcy5fbWFpbkNvbnRhaW5lcikuaW5uZXJXaWR0aCgpO1xyXG4gICAgICAgIGxldCBzaWRlTmF2V2lkdGg6IG51bWJlciA9ICQoJy5waXAtc3RpY2t5LXNpZGVuYXYnKS5pbm5lcldpZHRoKCk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRXaWR0aDogbnVtYmVyID0gc2lkZU5hdldpZHRoID8gc2lkZU5hdldpZHRoICsgMiA6IDA7IC8vIGFkZCBib3JkZXIgd2lkdGhcclxuXHJcbiAgICAgICAgaWYgKG1haW5XaWR0aCArIGN1cnJlbnRXaWR0aCA8IHRoaXMuX21lZGlhQnJlYWtwb2ludHMuc20pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShTaWRlTmF2U3RhdGVOYW1lcy5Ub2dnbGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYWluV2lkdGggKyBjdXJyZW50V2lkdGggPCB0aGlzLl9tZWRpYUJyZWFrcG9pbnRzLm1kKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU2lkZU5hdlN0YXRlTmFtZXMuU21hbGwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYWluV2lkdGggKyBjdXJyZW50V2lkdGggPCB0aGlzLl9tZWRpYUJyZWFrcG9pbnRzLmxnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU2lkZU5hdlN0YXRlTmFtZXMuTGFyZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU2lkZU5hdlN0YXRlTmFtZXMuWExhcmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFN0YXRlKHN0YXRlTmFtZTogU2lkZU5hdlN0YXRlTmFtZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNSZXNpemluZykgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLnNpZGVuYXZTdGF0ZSAmJiB0aGlzLnNpZGVuYXZTdGF0ZS5pZCA9PSBzdGF0ZU5hbWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHN0YXRlTmFtZSAhPSBTaWRlTmF2U3RhdGVOYW1lcy5Ub2dnbGUpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnc2lkZW5hdi1tb2JpbGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0ZU5hbWUgIT0gU2lkZU5hdlN0YXRlTmFtZXMuU21hbGwpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygncGlwLXN0aWNreS1uYXYtc21hbGwnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0ZU5hbWUgIT0gU2lkZU5hdlN0YXRlTmFtZXMuWExhcmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtZGVza3RvcCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXRlTmFtZSAhPSBTaWRlTmF2U3RhdGVOYW1lcy5MYXJnZSkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdzaWRlbmF2LXNtYWxsZGVza3RvcCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faXNSZXNpemluZyA9IHRydWU7XHJcbiAgICAgICAgLyppZiAoc3RhdGVOYW1lID09IFNpZGVOYXZTdGF0ZU5hbWVzLlRvZ2dsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBpcFNpZGVOYXYuY2xvc2UoKTtcclxuICAgICAgICB9Ki9cclxuICAgICAgICB0aGlzLnNpZGVuYXZTdGF0ZSA9IHRoaXMuX25hdlN0YXRlW1N0cmluZyhzdGF0ZU5hbWUpXTtcclxuICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKHRoaXMuc2lkZW5hdlN0YXRlLmFkZENsYXNzKTtcclxuXHJcbiAgICAgICAgdGhpcy5waXBTaWRlTmF2LnN0YXRlID0gdGhpcy5zaWRlbmF2U3RhdGU7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIHNpZGVOYXYgU3RhdGVcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaWRlTmF2ZVN0YXRlKClcclxuICAgICAgICB9LCAxNSk7XHJcblxyXG4gICAgICAgIC8vIGNvbXBsZXRlIGFuaW1hdGlvblxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1Jlc2l6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGhpcy5fYW5pbWF0aW9uRHVyYXRpb24pOyAvL2FuaW1hdGlvbkR1cmF0aW9uXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuaW50ZXJmYWNlIElTaWRlTmF2QmluZGluZ3Mge1xyXG4gICAgW2tleTogc3RyaW5nXTogYW55O1xyXG4gICAgc2lkZW5hdlN0YXRlOiBhbnk7XHJcbn1cclxuXHJcbmNvbnN0IFNpZGVOYXZCaW5kaW5nczogSVNpZGVOYXZCaW5kaW5ncyA9IHtcclxuICAgIHNpZGVuYXZTdGF0ZTogJz0/J1xyXG59O1xyXG5cclxuKCgpID0+IHtcclxuXHJcbiAgICBjb25zdCBzaWRlTmF2OiBuZy5JQ29tcG9uZW50T3B0aW9ucyA9IHtcclxuICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxyXG4gICAgICAgIGJpbmRpbmdzOiBTaWRlTmF2QmluZGluZ3MsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzaWRlbmF2L1NpZGVOYXYuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogU2lkZU5hdkNvbnRyb2xsZXJcclxuICAgIH07XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcFNpZGVOYXYnKVxyXG4gICAgICAgIC5jb21wb25lbnQoJ3BpcFNpZGVuYXYnLCBzaWRlTmF2KTtcclxuXHJcbn0pKCk7Iiwie1xyXG5cclxuICAgIGludGVyZmFjZSBJU2lkZU5hdlBhcnRCaW5kaW5ncyB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55O1xyXG4gICAgICAgIHZpc2libGU6IGFueVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IFNpZGVOYXZQYXJ0QmluZGluZ3M6IElTaWRlTmF2UGFydEJpbmRpbmdzID0ge1xyXG4gICAgICAgIHZpc2libGU6ICc9PydcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBTaWRlTmF2UGFydENvbnRyb2xsZXIge1xyXG4gICAgICAgIHByaXZhdGUgcGFydE5hbWU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHBhcnRWYWx1ZTogc3RyaW5nID0gbnVsbDtcclxuICAgICAgICBwcml2YXRlIHBvczogbnVtYmVyO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuICAgICAgICAgICAgJGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UsXHJcbiAgICAgICAgICAgICRhdHRyczogbmcuSUF0dHJpYnV0ZXMsXHJcbiAgICAgICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwaXBTaWRlTmF2KSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcnROYW1lID0gJycgKyAkYXR0cnNbJ3BpcFNpZGVuYXZQYXJ0J107XHJcbiAgICAgICAgICAgIHRoaXMucG9zID0gdGhpcy5wYXJ0TmFtZS5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFydFZhbHVlID0gdGhpcy5wYXJ0TmFtZS5zdWJzdHIodGhpcy5wb3MgKyAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFydE5hbWUgPSB0aGlzLnBhcnROYW1lLnN1YnN0cigwLCB0aGlzLnBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMub25TaWRlTmF2Q2hhbmdlZChudWxsLCBwaXBTaWRlTmF2LmNvbmZpZylcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcFNpZGVOYXZDaGFuZ2VkJywgKGV2ZW50LCBjb25maWcpID0+IHsgdGhpcy5vblNpZGVOYXZDaGFuZ2VkKGV2ZW50LCBjb25maWcpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvblNpZGVOYXZDaGFuZ2VkKGV2ZW50LCBjb25maWcpIHtcclxuICAgICAgICAgICAgbGV0IHBhcnRzID0gY29uZmlnLnBhcnRzIHx8IHt9O1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFBhcnRWYWx1ZSA9IHBhcnRzW3RoaXMucGFydE5hbWVdO1xyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZTogYm9vbGVhbiA9ICEhKHRoaXMucGFydFZhbHVlID8gY3VycmVudFBhcnRWYWx1ZSA9PSB0aGlzLnBhcnRWYWx1ZSA6IGN1cnJlbnRQYXJ0VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZpc2libGUgIT0gdGhpcy4kc2NvcGVbJ3Zpc2libGUnXSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlWyd2aXNpYmxlJ10gPSB2aXNpYmxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaWRlbmF2UGFydERpcmVjdGl2ZShuZ0lmRGlyZWN0aXZlKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG4gICAgICAgIGxldCBuZ0lmID0gbmdJZkRpcmVjdGl2ZVswXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHJhbnNjbHVkZTogbmdJZi50cmFuc2NsdWRlLFxyXG4gICAgICAgICAgICBwcmlvcml0eTogbmdJZi5wcmlvcml0eSxcclxuICAgICAgICAgICAgdGVybWluYWw6IG5nSWYudGVybWluYWwsXHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiBuZ0lmLnJlc3RyaWN0LFxyXG4gICAgICAgICAgICBzY29wZTogU2lkZU5hdlBhcnRCaW5kaW5ncyxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gbGlua0Z1bmN0aW9uKFxyXG4gICAgICAgICAgICAgICAgJHNjb3BlOiBuZy5JU2NvcGUsXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSxcclxuICAgICAgICAgICAgICAgICRhdHRyczogbmcuSUF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgICAgICRhdHRyc1snbmdJZiddID0gKCkgPT4geyByZXR1cm4gJHNjb3BlWyd2aXNpYmxlJ10gfTtcclxuICAgICAgICAgICAgICAgIG5nSWYubGluay5hcHBseShuZ0lmLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBTaWRlTmF2UGFydENvbnRyb2xsZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBTaWRlTmF2JylcclxuICAgICAgICAuZGlyZWN0aXZlKCdwaXBTaWRlbmF2UGFydCcsIHNpZGVuYXZQYXJ0RGlyZWN0aXZlKTtcclxuXHJcbn0iLCJpbXBvcnQgeyBTaWRlTmF2U3RhdGUsIFNpZGVOYXZDb25maWcgfSBmcm9tIFwiLi9TaWRlTmF2U3RhdGVcIjtcclxuaW1wb3J0IHsgSVNpZGVOYXZQcm92aWRlciwgSVNpZGVOYXZTZXJ2aWNlIH0gZnJvbSBcIi4vSVNpZGVOYXZTZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgU2lkZU5hdkNoYW5nZWRFdmVudCA9ICdwaXBTaWRlTmF2Q2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBTaWRlTmF2U3RhdGVDaGFuZ2VkRXZlbnQgPSAncGlwU2lkZU5hdlN0YXRlQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBPcGVuU2lkZU5hdkV2ZW50ID0gJ3BpcE9wZW5TaWRlTmF2JztcclxuZXhwb3J0IGNvbnN0IENsb3NlU2lkZU5hdkV2ZW50ID0gJ3BpcENsb3NlU2lkZU5hdic7XHJcblxyXG5jbGFzcyBTaWRlTmF2U2VydmljZSBpbXBsZW1lbnRzIElTaWRlTmF2U2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IFNpZGVOYXZDb25maWc7XHJcbiAgICBwcml2YXRlIF9zdGF0ZTogYW55O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25maWc6IFNpZGVOYXZDb25maWcsXHJcbiAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICRtZFNpZGVuYXY6IG5nLm1hdGVyaWFsLklTaWRlbmF2U2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBTaWRlTmF2Q29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xhc3NlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFydHMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnBhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFydHModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wYXJ0cyA9IHZhbHVlIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdGF0ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN0YXRlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KFNpZGVOYXZTdGF0ZUNoYW5nZWRFdmVudCwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHR5cGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy50eXBlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBiYWNrZHJvcCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmJhY2tkcm9wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYmFja2Ryb3AodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuYmFja2Ryb3AgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbigpIHtcclxuICAgICAgICB0aGlzLiRtZFNpZGVuYXYoJ3BpcC1zdGlja3ktc2lkZW5hdicpLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy4kbWRTaWRlbmF2KCdwaXAtc3RpY2t5LXNpZGVuYXYnKS5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGUoKSB7XHJcbiAgICAgICAgdGhpcy4kbWRTaWRlbmF2KCdwaXAtc3RpY2t5LXNpZGVuYXYnKS50b2dnbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRDbGFzcyguLi5jbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIF8uZWFjaChjbGFzc2VzLCAoYykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuY2xhc3Nlcy5wdXNoKGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VuZENvbmZpZ0V2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGFydChwYXJ0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcucGFydHNbcGFydF0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbmRDb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENvbmZpZ0V2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChTaWRlTmF2Q2hhbmdlZEV2ZW50LCB0aGlzLl9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTaWRlTmF2UHJvdmlkZXIgaW1wbGVtZW50cyBJU2lkZU5hdlByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZzogU2lkZU5hdkNvbmZpZyA9IHtcclxuICAgICAgICBwYXJ0czoge30sXHJcbiAgICAgICAgY2xhc3NlczogW10sXHJcbiAgICAgICAgdHlwZTogJ3BvcHVwJyxcclxuICAgICAgICBiYWNrZHJvcDogdHJ1ZSxcclxuICAgICAgICBzdGF0ZTogbnVsbCxcclxuICAgICAgICB2aXNpYmxlOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IFNpZGVOYXZTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgYmFja2Ryb3AoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5iYWNrZHJvcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGJhY2tkcm9wKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmJhY2tkcm9wID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWcoKTogU2lkZU5hdkNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogU2lkZU5hdkNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlIHx8IG5ldyBTaWRlTmF2Q29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJ0cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzID0gdmFsdWUgfHwge307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnR5cGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy52aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy52aXNpYmxlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGFzc2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjbGFzc2VzKHZhbHVlOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gdmFsdWUgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzLnB1c2goYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNsYXNzKC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNsYXNzZXMsIChjKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGFzc2VzID0gXy5yZWplY3QodGhpcy5fY29uZmlnLmNsYXNzZXMsIChjYykgPT4gY2MgPT0gYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBhcnQocGFydDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnBhcnRzW3BhcnRdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsICRtZFNpZGVuYXY6IG5nLm1hdGVyaWFsLklTaWRlbmF2U2VydmljZSkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBTaWRlTmF2U2VydmljZSh0aGlzLl9jb25maWcsICRyb290U2NvcGUsICRtZFNpZGVuYXYpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaG9va1NpZGVOYXZFdmVudHMoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsIHBpcFNpZGVOYXY6IElTaWRlTmF2U2VydmljZSkge1xyXG4gICAgJHJvb3RTY29wZS4kb24oT3BlblNpZGVOYXZFdmVudCwgKCkgPT4geyBwaXBTaWRlTmF2Lm9wZW4oKTsgfSk7XHJcbiAgICAkcm9vdFNjb3BlLiRvbihDbG9zZVNpZGVOYXZFdmVudCwgKCkgPT4geyBwaXBTaWRlTmF2LmNsb3NlKCk7IH0pO1xyXG59XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBTaWRlTmF2JylcclxuICAgIC5wcm92aWRlcigncGlwU2lkZU5hdicsIFNpZGVOYXZQcm92aWRlcilcclxuICAgIC5ydW4oaG9va1NpZGVOYXZFdmVudHMpO1xyXG4iLCJleHBvcnQgY2xhc3MgU2lkZU5hdlN0YXRlTmFtZXMge1xyXG4gICAgc3RhdGljIFRvZ2dsZTogc3RyaW5nID0gJ3RvZ2dsZSc7XHJcbiAgICBzdGF0aWMgU21hbGw6IHN0cmluZyA9ICdzbWFsbCc7XHJcbiAgICBzdGF0aWMgTGFyZ2U6IHN0cmluZyA9ICdsYXJnZSc7XHJcbiAgICBzdGF0aWMgWExhcmdlOiBzdHJpbmcgPSAneGxhcmdlJztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZGVOYXZTdGF0ZSB7XHJcbiAgICBpZDogU2lkZU5hdlN0YXRlTmFtZXM7XHJcbiAgICAvLyBDbGFzcyB3aGljaCBhZGRlZCB0byBzaWRlbmF2IGluIHRoaXMgc3RhdGVcclxuICAgIGFkZENsYXNzOiBzdHJpbmc7XHJcbiAgICAvLyBTaWRlIG5hdiBhbHdheXMgb3BlblxyXG4gICAgaXNMb2NrZWRPcGVuOiBib29sZWFuO1xyXG4gICAgLy8gU2hvdyBTaWRlTmF2IGhlYWRlciBcclxuICAgIHNob3dIZWFkZXI6IGJvb2xlYW47XHJcbiAgICAvLyBTaG93IGV4cGFuZGVkIGJ1dHRvblxyXG4gICAgZXhwYW5kZWRCdXR0b246IGJvb2xlYW47XHJcbiAgICAvLyBTaWRlTmF2IGhhcyBleHBhbmRcclxuICAgIGlzRXhwYW5kZWQ6IGJvb2xlYW47XHJcbiAgICAvLyBTaWRlTmF2IGlzIEV4cGFuZGVkIGluIHRoaXMgc3RhdGUgYnkgZGVmYXVsdFxyXG4gICAgZXhwYW5kOiBib29sZWFuO1xyXG4gICAgLy8gVG9vbHR5cGUgaXMgc2hvd1xyXG4gICAgc2hvd0ljb25Ub29sdHlwZTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZGVOYXZTdGF0ZUNvbmZpZyB7XHJcbiAgICB0b2dnbGU6IFNpZGVOYXZTdGF0ZSA9IHsgLy8gbWVkaWEoc20sIHhzKVxyXG4gICAgICAgIGlkOiBTaWRlTmF2U3RhdGVOYW1lcy5Ub2dnbGUsXHJcbiAgICAgICAgYWRkQ2xhc3M6ICdzaWRlbmF2LW1vYmlsZScsXHJcbiAgICAgICAgc2hvd0hlYWRlcjogdHJ1ZSxcclxuICAgICAgICBpc0xvY2tlZE9wZW46IGZhbHNlLFxyXG4gICAgICAgIGV4cGFuZGVkQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICBpc0V4cGFuZGVkOiB0cnVlLFxyXG4gICAgICAgIGV4cGFuZDogdHJ1ZSxcclxuICAgICAgICBzaG93SWNvblRvb2x0eXBlOiBmYWxzZVxyXG4gICAgfTtcclxuICAgIHNtYWxsOiBTaWRlTmF2U3RhdGUgPSB7IC8vIG1lZGlhKG1kKVxyXG4gICAgICAgIGlkOiBTaWRlTmF2U3RhdGVOYW1lcy5TbWFsbCxcclxuICAgICAgICBhZGRDbGFzczogJ3BpcC1zdGlja3ktbmF2LXNtYWxsIHNpZGVuYXYtc21hbGxkZXNrdG9wJyxcclxuICAgICAgICBzaG93SGVhZGVyOiBmYWxzZSxcclxuICAgICAgICBpc0xvY2tlZE9wZW46IHRydWUsXHJcbiAgICAgICAgZXhwYW5kZWRCdXR0b246IGZhbHNlLFxyXG4gICAgICAgIGlzRXhwYW5kZWQ6IGZhbHNlLFxyXG4gICAgICAgIGV4cGFuZDogZmFsc2UsXHJcbiAgICAgICAgc2hvd0ljb25Ub29sdHlwZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIGxhcmdlOiBTaWRlTmF2U3RhdGUgPSB7IC8vIG1lZGlhKGxnKVxyXG4gICAgICAgIGlkOiBTaWRlTmF2U3RhdGVOYW1lcy5MYXJnZSxcclxuICAgICAgICBhZGRDbGFzczogJ3NpZGVuYXYtc21hbGxkZXNrdG9wJyxcclxuICAgICAgICBzaG93SGVhZGVyOiBmYWxzZSxcclxuICAgICAgICBpc0xvY2tlZE9wZW46IHRydWUsXHJcbiAgICAgICAgZXhwYW5kZWRCdXR0b246IHRydWUsXHJcbiAgICAgICAgaXNFeHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICBleHBhbmQ6IHRydWUsXHJcbiAgICAgICAgc2hvd0ljb25Ub29sdHlwZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIHhsYXJnZTogU2lkZU5hdlN0YXRlID0geyAvLyBtZWRpYSh4bClcclxuICAgICAgICBpZDogU2lkZU5hdlN0YXRlTmFtZXMuWExhcmdlLFxyXG4gICAgICAgIGFkZENsYXNzOiAnc2lkZW5hdi1kZXNrdG9wJyxcclxuICAgICAgICBzaG93SGVhZGVyOiBmYWxzZSxcclxuICAgICAgICBpc0xvY2tlZE9wZW46IHRydWUsXHJcbiAgICAgICAgZXhwYW5kZWRCdXR0b246IGZhbHNlLFxyXG4gICAgICAgIGlzRXhwYW5kZWQ6IHRydWUsXHJcbiAgICAgICAgZXhwYW5kOiB0cnVlLFxyXG4gICAgICAgIHNob3dJY29uVG9vbHR5cGU6IGZhbHNlXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZU5hdkNvbmZpZyB7XHJcbiAgICBwYXJ0czogYW55O1xyXG4gICAgY2xhc3Nlczogc3RyaW5nW107XHJcbiAgICBzdGF0ZTogU2lkZU5hdlN0YXRlO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgYmFja2Ryb3A6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcclxufSIsImFuZ3VsYXIubW9kdWxlKCdwaXBTaWRlTmF2JywgWyduZ01hdGVyaWFsJywgJ3BpcE5hdi5UZW1wbGF0ZXMnXSk7XHJcblxyXG5pbXBvcnQgJy4vU2lkZU5hdlN0YXRlJztcclxuaW1wb3J0ICcuL1NpZGVOYXZTZXJ2aWNlJztcclxuaW1wb3J0ICcuL1NpZGVOYXZQYXJ0JztcclxuaW1wb3J0ICcuL1NpZGVOYXYnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9TaWRlTmF2U2VydmljZSc7IiwiXHJcbmV4cG9ydCBjbGFzcyBQaXBUYWIge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBjb3VudDogbnVtYmVyO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxufVxyXG5cclxue1xyXG4gICAgaW50ZXJmYWNlIElUYWJzQmluZGluZ3Mge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IGFueTtcclxuXHJcbiAgICAgICAgbmdEaXNhYmxlZDogYW55O1xyXG4gICAgICAgIHRhYnM6IGFueTtcclxuICAgICAgICBzaG93VGFiczogYW55O1xyXG4gICAgICAgIHNob3dUYWJzU2hhZG93OiBhbnk7XHJcbiAgICAgICAgYWN0aXZlSW5kZXg6IGFueTtcclxuICAgICAgICBzZWxlY3Q6IGFueTtcclxuICAgICAgICBicmVha3BvaW50czogYW55O1xyXG4gICAgICAgIHRoZW1lQ2xhc3M6IGFueTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBUYWJzQmluZGluZ3M6IElUYWJzQmluZGluZ3MgPSB7XHJcbiAgICAgICAgbmdEaXNhYmxlZDogJyY/JywgLy8gZnVuY3Rpb25cclxuICAgICAgICB0YWJzOiAnPHBpcFRhYnMnLCAvLyBQaXBUYWJbXVxyXG4gICAgICAgIHNob3dUYWJzOiAnJnBpcFNob3dUYWJzJywgLy8gZnVuY3Rpb25cclxuICAgICAgICBzaG93VGFic1NoYWRvdzogJyZwaXBUYWJzU2hhZG93JywgLy8gZnVuY3Rpb25cclxuICAgICAgICBhY3RpdmVJbmRleDogJzw/cGlwQWN0aXZlSW5kZXgnLCAvLyBudW1iZXJcclxuICAgICAgICBzZWxlY3Q6ICc9cGlwVGFic1NlbGVjdCcsIC8vIGZ1bmN0aW9uXHJcbiAgICAgICAgYnJlYWtwb2ludHM6ICc8P3BpcEJyZWFrcG9pbnRzJywgLy8gc3RyaW5nXHJcbiAgICAgICAgdGhlbWVDbGFzczogJzw/dGhlbWVDbGFzcycsIC8vIHN0cmluZ1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYnNDaGFuZ2VzIGltcGxlbWVudHMgbmcuSU9uQ2hhbmdlc09iamVjdCwgSVRhYnNCaW5kaW5ncyB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogbmcuSUNoYW5nZXNPYmplY3Q8YW55PjtcclxuICAgICAgICAvLyBOb3Qgb25lIHdheSBiaW5kaW5nc1xyXG4gICAgICAgIG5nRGlzYWJsZWQ6IG5nLklDaGFuZ2VzT2JqZWN0PCgpID0+IG5nLklQcm9taXNlPHZvaWQ+PjtcclxuICAgICAgICB0YWJzOiBuZy5JQ2hhbmdlc09iamVjdDxQaXBUYWJbXT47XHJcbiAgICAgICAgc2hvd1RhYnM6IG5nLklDaGFuZ2VzT2JqZWN0PCgpID0+IG5nLklQcm9taXNlPHZvaWQ+PjtcclxuICAgICAgICBzaG93VGFic1NoYWRvdzogbmcuSUNoYW5nZXNPYmplY3Q8KCkgPT4gbmcuSVByb21pc2U8dm9pZD4+O1xyXG4gICAgICAgIGFjdGl2ZUluZGV4OiBuZy5JQ2hhbmdlc09iamVjdDxudW1iZXI+O1xyXG4gICAgICAgIHNlbGVjdDogbmcuSUNoYW5nZXNPYmplY3Q8KCkgPT4gbmcuSVByb21pc2U8dm9pZD4+O1xyXG4gICAgICAgIGJyZWFrcG9pbnRzOiBuZy5JQ2hhbmdlc09iamVjdDxzdHJpbmc+O1xyXG4gICAgICAgIHRoZW1lQ2xhc3M6IG5nLklDaGFuZ2VzT2JqZWN0PHN0cmluZz47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFic0RpcmVjdGl2ZUNvbnRyb2xsZXIgaW1wbGVtZW50cyBJVGFic0JpbmRpbmdzIHtcclxuICAgICAgICBwcml2YXRlIF9waXBUcmFuc2xhdGU6IHBpcC5zZXJ2aWNlcy5JVHJhbnNsYXRlU2VydmljZTtcclxuICAgICAgICBwcml2YXRlIF9waXBUaGVtZTogcGlwLnRoZW1lcy5JVGhlbWVTZXJ2aWNlO1xyXG4gICAgICAgIHByaXZhdGUgcGlwTWVkaWE7XHJcbiAgICAgICAgcHJpdmF0ZSBzZWxlY3RlZFRhYklkOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBuZ0Rpc2FibGVkOiBGdW5jdGlvbjtcclxuICAgICAgICBwdWJsaWMgdGFiczogUGlwVGFiW107XHJcbiAgICAgICAgcHVibGljIGFjdGl2ZUluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGJyZWFrcG9pbnRzOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIHNob3dUYWJzOiBGdW5jdGlvbjtcclxuICAgICAgICBwdWJsaWMgc2hvd1RhYnNTaGFkb3c6IEZ1bmN0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBzZWxlY3Q6IEZ1bmN0aW9uO1xyXG4gICAgICAgIHB1YmxpYyB0aGVtZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjdXJyZW50VGhlbWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIGNoYW5nZTogKCkgPT4gbmcuSVByb21pc2U8YW55PjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHByaXZhdGUgJGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgICAgIHByaXZhdGUgJGluamVjdG9yOiBuZy5hdXRvLklJbmplY3RvclNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSBuYXZDb25zdGFudDogYW55LFxyXG4gICAgICAgICAgICAkbWRNZWRpYTogYW5ndWxhci5tYXRlcmlhbC5JTWVkaWFcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRUaGVtZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBpcE1lZGlhID0gdGhpcy4kaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gPHBpcC5sYXlvdXRzLklNZWRpYVNlcnZpY2U+dGhpcy4kaW5qZWN0b3IuZ2V0KCdwaXBNZWRpYScpIDogJG1kTWVkaWE7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYnJlYWtwb2ludHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnJlYWtwb2ludHMgPSB0aGlzLm5hdkNvbnN0YW50LlRBQl9CUkVBS1BPSU5UO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRUaGVtZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5fcGlwVGhlbWUgPSB0aGlzLiRpbmplY3Rvci5oYXMoJ3BpcFRoZW1lJykgPyA8cGlwLnRoZW1lcy5JVGhlbWVTZXJ2aWNlPnRoaXMuJGluamVjdG9yLmdldCgncGlwVGhlbWUnKSA6IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9waXBUaGVtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGhlbWUgPSB0aGlzLl9waXBUaGVtZS50aGVtZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRyb290U2NvcGVbJyR0aGVtZSddKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUaGVtZSA9IHRoaXMuJHJvb3RTY29wZVsnJHRoZW1lJ107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudGhlbWVDbGFzcyA9ICh0aGlzLnRoZW1lQ2xhc3MgfHwgJycpICsgJyBtZC0nICsgdGhpcy5jdXJyZW50VGhlbWUgKyAnLXRoZW1lJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0VHJhbnNsYXRlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9waXBUcmFuc2xhdGUgPSB0aGlzLiRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gPHBpcC5zZXJ2aWNlcy5JVHJhbnNsYXRlU2VydmljZT50aGlzLiRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BpcFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFicy5sZW5ndGggPiAwICYmIHRoaXMudGFic1swXS50aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BpcFRyYW5zbGF0ZS50cmFuc2xhdGVPYmplY3RzKHRoaXMudGFicywgJ3RpdGxlJywgJ25hbWVMb2NhbCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9waXBUcmFuc2xhdGUudHJhbnNsYXRlT2JqZWN0cyh0aGlzLnRhYnMsICduYW1lJywgJ25hbWVMb2NhbCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaXNEaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLm5nRGlzYWJsZWQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uZ0Rpc2FibGVkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0Jvb2xlYW4odGhpcy5uZ0Rpc2FibGVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHB1YmxpYyB0YWJEaXNhYmxlZChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5pc0Rpc2FibGVkKCkgJiYgdGhpcy5hY3RpdmVJbmRleCAhPSBpbmRleCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHVibGljIG9uU2VsZWN0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCgpKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYklkID0gdGhpcy50YWJzLmxlbmd0aCA+PSB0aGlzLmFjdGl2ZUluZGV4ID8gdGhpcy50YWJzW3RoaXMuYWN0aXZlSW5kZXhdLmlkIDogbnVsbDtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLnRhYnNbdGhpcy5hY3RpdmVJbmRleF0sIHRoaXMuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAwKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHVibGljIHNob3dTaGFkb3coKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5zaG93VGFic1NoYWRvdykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dUYWJzU2hhZG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0Jvb2xlYW4odGhpcy5zaG93VGFic1NoYWRvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgc2hvdygpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNob3dUYWJzKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLnNob3dUYWJzKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1RhYnMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvQm9vbGVhbih0aGlzLnNob3dUYWJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHB1YmxpYyB0b0Jvb2xlYW4odmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT0gJzEnIHx8IHZhbHVlID09ICd0cnVlJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyAkb25DaGFuZ2VzKGNoYW5nZXM6IFRhYnNDaGFuZ2VzKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNoYW5nZXMuYnJlYWtwb2ludHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5icmVha3BvaW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJlYWtwb2ludHMgPSB0aGlzLm5hdkNvbnN0YW50LlRBQl9CUkVBS1BPSU5UO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnJlYWtwb2ludHMgPSBjaGFuZ2VzLmJyZWFrcG9pbnRzLmN1cnJlbnRWYWx1ZSA/IGNoYW5nZXMuYnJlYWtwb2ludHMuY3VycmVudFZhbHVlIDogdGhpcy5uYXZDb25zdGFudC5UQUJfQlJFQUtQT0lOVFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5hY3RpdmVJbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBjaGFuZ2VzLmFjdGl2ZUluZGV4LmN1cnJlbnRWYWx1ZSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJHRpbWVvdXQgJiYgdGhpcy5hY3RpdmVJbmRleCAhPT0gY2hhbmdlcy5hY3RpdmVJbmRleC5wcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhID0gdGhpcy4kZWxlbWVudC5maW5kKCdtZC10YWJzLWNhbnZhcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYSAmJiBhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoYVswXSkuYXR0cignYWN0aXZlSW5kZXgnLCB0aGlzLmFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhLm9uKCdmb2N1c291dCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChhWzBdKS5hdHRyKCdhY3RpdmVJbmRleCcsIHRoaXMuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGFbMF0pLmF0dHIoJ2FjdGl2ZUluZGV4JywgdGhpcy5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlcy50YWJzID09PSB1bmRlZmluZWQgfHwgIV8uaXNBcnJheShjaGFuZ2VzLnRhYnMuY3VycmVudFZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRhYnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFicyA9IGNoYW5nZXMudGFicy5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNoYW5nZXMuYWN0aXZlSW5kZXggJiYgY2hhbmdlcy50YWJzICYmIHRoaXMuc2VsZWN0ZWRUYWJJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IF8uaW5kZXhPZih0aGlzLnRhYnMsIF8uZmluZCh0aGlzLnRhYnMsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5zZWxlY3RlZFRhYklkXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYklkID0gdGhpcy50YWJzLmxlbmd0aCA+PSB0aGlzLmFjdGl2ZUluZGV4ID8gdGhpcy50YWJzW3RoaXMuYWN0aXZlSW5kZXhdLmlkIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWJzLmxlbmd0aCA+IDAgJiYgdGhpcy5hY3RpdmVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYklkID0gdGhpcy50YWJzLmxlbmd0aCA+PSB0aGlzLmFjdGl2ZUluZGV4ID8gdGhpcy50YWJzW3RoaXMuYWN0aXZlSW5kZXhdLmlkIDogbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgVGFiczogbmcuSUNvbXBvbmVudE9wdGlvbnMgPSB7XHJcbiAgICAgICAgYmluZGluZ3M6IFRhYnNCaW5kaW5ncyxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RhYnMvVGFicy5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiBUYWJzRGlyZWN0aXZlQ29udHJvbGxlclxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBUYWJzJywgWydwaXBOYXYuVGVtcGxhdGVzJ10pXHJcbiAgICAgICAgLmNvbXBvbmVudCgncGlwVGFicycsIFRhYnMpO1xyXG59XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdhY3Rpb25zL1ByaW1hcnlBY3Rpb25zLmh0bWwnLFxuICAgICc8ZGl2IHBpcC1mb2N1c2VkPVwiXCIgcGlwLWZvY3VzZWQtdGFiaW5kZXg9XCIyXCI+PG1kLW1lbnUgbWQtcG9zaXRpb24tbW9kZT1cInRhcmdldC1yaWdodCB0YXJnZXRcIiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnNcIiBuZy1yZXBlYXQ9XCJhY3Rpb24gaW4gJGN0cmwuY29uZmlnLnByaW1hcnlMb2NhbEFjdGlvbnNcIj48bWQtYnV0dG9uIGNsYXNzPVwicGlwLXByaW1hcnktYWN0aW9ucy1hY3Rpb24gbWQtaWNvbi1idXR0b24gcGlwLWZvY3VzYWJsZVwiIG5nLWNsaWNrPVwiJGN0cmwuY2xpY2tBY3Rpb24oYWN0aW9uLCAkbWRPcGVuTWVudSk7XCIgdGFiaW5kZXg9XCItMVwiIG5nLWhpZGU9XCIkY3RybC5pc0hpZGRlbihhY3Rpb24pXCIgYXJpYS1sYWJlbD1cInt7IGFjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZSB9fVwiPjxkaXYgY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zLWJhZGdlXCIgbmctc2hvdz1cImFjdGlvbi5jb3VudCA+IDBcIj57eyAkY3RybC5hY3Rpb25Db3VudChhY3Rpb24pIH19PC9kaXY+PG1kLWljb24gbWQtc3ZnLWljb249XCJ7eyBhY3Rpb24uaWNvbn19XCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCIzXCI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQtc3RhcnQ9XCJzdWJBY3Rpb24gaW4gYWN0aW9uLnN1YkFjdGlvbnNcIiBuZy1pZj1cIiFzdWJBY3Rpb24uZGl2aWRlclwiIG5nLWhpZGU9XCIkY3RybC5pc0hpZGRlbihzdWJBY3Rpb24pXCI+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1mb2N1c2FibGVcIiBuZy1oaWRlPVwic3ViQWN0aW9uLmRpdmlkZXJcIiB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCIkY3RybC5jbGlja0FjdGlvbihzdWJBY3Rpb24pXCI+e3sgOjpzdWJBY3Rpb24udGl0bGUgfCB0cmFuc2xhdGUgfX08L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwic3ViQWN0aW9uLmRpdmlkZXJcIiBuZy1yZXBlYXQtZW5kPVwiXCI+PC9tZC1tZW51LWRpdmlkZXI+PC9tZC1tZW51LWNvbnRlbnQ+PC9tZC1tZW51PjxtZC1tZW51IG1kLXBvc2l0aW9uLW1vZGU9XCJ0YXJnZXQtcmlnaHQgdGFyZ2V0XCIgY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zXCIgbmctcmVwZWF0PVwiYWN0aW9uIGluICRjdHJsLmNvbmZpZy5wcmltYXJ5R2xvYmFsQWN0aW9uc1wiPjxtZC1idXR0b24gY2xhc3M9XCJwaXAtcHJpbWFyeS1hY3Rpb25zLWFjdGlvbiBtZC1pY29uLWJ1dHRvbiBwaXAtZm9jdXNhYmxlXCIgbmctY2xpY2s9XCIkY3RybC5jbGlja0FjdGlvbihhY3Rpb24sICRtZE9wZW5NZW51KTtcIiBuZy1oaWRlPVwiJGN0cmwuaXNIaWRkZW4oYWN0aW9uKVwiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWxhYmVsPVwie3sgYWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlIH19XCI+PGRpdiBjbGFzcz1cInBpcC1wcmltYXJ5LWFjdGlvbnMtYmFkZ2UgY29sb3ItYmFkZ2UtYmdcIiBuZy1zaG93PVwiYWN0aW9uLmNvdW50ID4gMFwiPnt7ICRjdHJsLmFjdGlvbkNvdW50KGFjdGlvbikgfX08L2Rpdj48bWQtaWNvbiBtZC1zdmctaWNvbj1cInt7IGFjdGlvbi5pY29uIH19XCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCIzXCI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQtc3RhcnQ9XCJzdWJBY3Rpb24gaW4gYWN0aW9uLnN1YkFjdGlvbnNcIiBuZy1pZj1cIiFzdWJBY3Rpb24uZGl2aWRlclwiIG5nLWhpZGU9XCIkY3RybC5pc0hpZGRlbihzdWJBY3Rpb24pXCI+PG1kLWJ1dHRvbiBjbGFzcz1cInBpcC1mb2N1c2FibGVcIiBuZy1oaWRlPVwic3ViQWN0aW9uLmRpdmlkZXJcIiB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCIkY3RybC5jbGlja0FjdGlvbihzdWJBY3Rpb24pXCI+e3sgc3ViQWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cInN1YkFjdGlvbi5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdhY3Rpb25zL1NlY29uZGFyeUFjdGlvbnMuaHRtbCcsXG4gICAgJzxtZC1tZW51IG5nLWlmPVwiJGN0cmwuc2Vjb25kYXJ5QWN0aW9uc1Zpc2libGUoKVwiIG1kLXBvc2l0aW9uLW1vZGU9XCJ0YXJnZXQtcmlnaHQgdGFyZ2V0XCI+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWljb24tYnV0dG9uXCIgdGFiaW5kZXg9XCIzXCIgbmctaW5pdD1cIiRjdHJsLmdldE1lbnUoJG1kT3Blbk1lbnUpXCIgbmctY2xpY2s9XCIkY3RybC5vblNlY29uZGFyeUFjdGlvbkNsaWNrKCk7ICRjdHJsLm9wZW5NZW51KCRtZE9wZW5NZW51LCAkZXZlbnQpO1wiIGFyaWEtbGFiZWw9XCJvcGVuIGFjdGlvbnNcIj48bWQtaWNvbiBtZC1zdmctaWNvbj1cImljb25zOnZkb3RzXCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCIzXCI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQtc3RhcnQ9XCJhY3Rpb24gaW4gJGN0cmwuY29uZmlnLnNlY29uZGFyeUxvY2FsQWN0aW9uc1wiIG5nLWlmPVwiIWFjdGlvbi5kaXZpZGVyXCIgbmctaGlkZT1cIiRjdHJsLmlzSGlkZGVuKGFjdGlvbilcIj48bWQtYnV0dG9uIG5nLWhpZGU9XCJhY3Rpb24uZGl2aWRlclwiIG5nLWNsaWNrPVwiJGN0cmwuY2xpY2tBY3Rpb24oYWN0aW9uKVwiPnt7IDo6YWN0aW9uLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9tZC1idXR0b24+PC9tZC1tZW51LWl0ZW0+PG1kLW1lbnUtZGl2aWRlciBuZy1pZj1cImFjdGlvbi5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCIkY3RybC5zZWNvbmRhcnlEaXZpZGVyVmlzaWJsZSgpXCI+PC9tZC1tZW51LWRpdmlkZXI+PG1kLW1lbnUtaXRlbSBuZy1yZXBlYXQtc3RhcnQ9XCJhY3Rpb24gaW4gJGN0cmwuY29uZmlnLnNlY29uZGFyeUdsb2JhbEFjdGlvbnNcIiBuZy1pZj1cIiFhY3Rpb24uZGl2aWRlclwiIG5nLWhpZGU9XCIkY3RybC5pc0hpZGRlbihhY3Rpb24pXCI+PG1kLWJ1dHRvbiBuZy1oaWRlPVwiYWN0aW9uLmRpdmlkZXJcIiBuZy1jbGljaz1cIiRjdHJsLmNsaWNrQWN0aW9uKGFjdGlvbilcIj57eyA6OmFjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWRpdmlkZXIgbmctaWY9XCJhY3Rpb24uZGl2aWRlclwiIG5nLXJlcGVhdC1lbmQ9XCJcIj48L21kLW1lbnUtZGl2aWRlcj48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYXBwYmFyL0FwcEJhci5odG1sJyxcbiAgICAnPG1kLXRvb2xiYXIgY2xhc3M9XCJ7eyAkY3RybC5jb25maWcuY2xhc3Nlcy5qb2luKFxcJyBcXCcpIH19XCIgbmctaWY9XCIkY3RybC5jb25maWcudmlzaWJsZVwiIG5nLXRyYW5zY2x1ZGU9XCJcIj48L21kLXRvb2xiYXI+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYnJlYWRjcnVtYi9CcmVhZGNydW1iLmh0bWwnLFxuICAgICc8ZGl2IGNsYXNzPVwicGlwLWJyZWFkY3J1bWItYmxvY2tcIj48ZGl2IGNsYXNzPVwidGV4dC1vdmVyZmxvd1wiIG5nLWlmPVwiISRjdHJsLl9tZWRpYShcXCd4c1xcJylcIj48c3BhbiBuZy1pZj1cIiRjdHJsLmNvbmZpZy5jcml0ZXJpYVwiIG5nLWNsaWNrPVwiJGN0cmwub3BlblNlYXJjaCgpXCI+e3sgJGN0cmwuY29uZmlnLmNyaXRlcmlhIH19IC08L3NwYW4+PHNwYW4gY2xhc3M9XCJwaXAtYnJlYWRjcnVtYi1pdGVtIHt7ICRsYXN0ID8gXFwnYnJlYWRjcnVtYi1hY2NlbnRcXCcgOiBcXCdcXCcgfX1cIiBuZy1pZj1cIiRjdHJsLmNvbmZpZy5pdGVtcyAmJiAkY3RybC5jb25maWcuaXRlbXMubGVuZ3RoID4gMFwiIG5nLXJlcGVhdC1zdGFydD1cIml0ZW0gaW4gJGN0cmwuY29uZmlnLml0ZW1zXCIgbmctY2xpY2s9XCIkY3RybC5vbkNsaWNrKGl0ZW0pXCIgbmctaW5pdD1cInN0ZXBXaWR0aCA9IDEwMC8oJGN0cmwuY29uZmlnLml0ZW1zLmxlbmd0aCArIDEpXCIgbmctY2xhc3M9XCJ7XFwnY3Vyc29yLXBvaW50ZXJcXCc6ICEkbGFzdH1cIiBuZy1zdHlsZT1cIntcXCdtYXgtd2lkdGhcXCc6IHN0ZXBXaWR0aCArIFxcJyVcXCd9XCI+PHNwYW4gbmctaWY9XCIhJGxhc3QgfHwgISRjdHJsLmFjdGlvbnNWaXNpYmxlKGl0ZW0pXCI+e3sgaXRlbS50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj48ZGl2IG5nLWlmPVwiJGxhc3QgJiYgJGN0cmwuYWN0aW9uc1Zpc2libGUoaXRlbSlcIiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgcG9zaXRpb246IHJlbGF0aXZlO1wiPjxtZC1tZW51IG1kLW9mZnNldD1cIjAgNDRcIj48c3BhbiBjbGFzcz1cImxheW91dC1yb3cgcGlwLWJyZWFkY3J1bWItaXRlbS1tZW51IGN1cnNvci1wb2ludGVyIHt7ICRsYXN0ID8gXFwnYnJlYWRjcnVtYi1hY2NlbnRcXCcgOiBcXCdcXCcgfX1cIiBuZy1jbGljaz1cIiRjdHJsLm9uT3Blbk1lbnUoJG1kT3Blbk1lbnUsICRldmVudClcIiBtZC1pbmstcmlwcGxlPVwiXCIgYXJpYS1sYWJlbD1cIm9wZW4gYnJlYWRjcnVtYiBhY3Rpb25zXCI+e3sgaXRlbS50aXRsZSB8IHRyYW5zbGF0ZSB9fTxtZC1pY29uIGNsYXNzPVwicGlwLXRyaWFuZ2xlLWRvd25cIiBtZC1zdmctaWNvbj1cImljb25zOnRyaWFuZ2xlLWRvd25cIj48L21kLWljb24+PC9zcGFuPjxtZC1tZW51LWNvbnRlbnQgd2lkdGg9XCI0XCI+PG1kLW1lbnUtaXRlbSBuZy1pZj1cIiFzdWJJdGVtLmRpdmlkZXJcIiBuZy1yZXBlYXQtc3RhcnQ9XCJzdWJJdGVtIGluIGl0ZW0uc3ViQWN0aW9uc1wiPjxtZC1idXR0b24gbmctY2xpY2s9XCIkY3RybC5vblN1YkFjdGlvbkNsaWNrKHN1Ykl0ZW0pXCIgbmctaWY9XCIhYWN0aW9uLmRpdmlkZXJcIiB0YWJpbmRleD1cIjRcIj48bWQtaWNvbiBtZC1tZW51LWFsaWduLXRhcmdldD1cIlwiIG5nLWlmPVwic3ViSXRlbS5pY29uXCIgbWQtc3ZnLWljb249XCJ7eyBzdWJJdGVtLmljb24gfX1cIj48L21kLWljb24+PHNwYW4+e3sgc3ViSXRlbS50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj48L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48bWQtbWVudS1kaXZpZGVyIG5nLWlmPVwic3ViSXRlbS5kaXZpZGVyXCIgbmctcmVwZWF0LWVuZD1cIlwiPjwvbWQtbWVudS1kaXZpZGVyPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT48L2Rpdj48L3NwYW4+PG1kLWljb24gbmctcmVwZWF0LWVuZD1cIlwiIG1kLXN2Zy1pY29uPVwiaWNvbnM6Y2hldnJvbi1yaWdodFwiIG5nLWhpZGU9XCIkbGFzdFwiPjwvbWQtaWNvbj48c3BhbiBjbGFzcz1cInBpcC10aXRsZSBicmVhZGNydW1iLWFjY2VudFwiIG5nLWlmPVwiJGN0cmwuY29uZmlnLnRleHRcIj57eyAkY3RybC5jb25maWcudGV4dCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj48L2Rpdj48ZGl2IHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiIG5nLWlmPVwiJGN0cmwuX21lZGlhKFxcJ3hzXFwnKVwiPjxtZC1tZW51IG1kLW9mZnNldD1cIjAgNDRcIj48c3BhbiBjbGFzcz1cInBpcC1tb2JpbGUtYnJlYWRjcnVtYiBsYXlvdXQtcm93XCIgbmctY2xpY2s9XCIkY3RybC5jb25maWcuaXRlbXMgJiYgJGN0cmwuY29uZmlnLml0ZW1zLmxlbmd0aCA+IDEgPyAkbWRPcGVuTWVudSgpIDogcmV0dXJuXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0LW92ZXJmbG93XCI+PHNwYW4gbmctaWY9XCIkY3RybC5jb25maWcuY3JpdGVyaWFcIiBuZy1jbGljaz1cIiRjdHJsLm9wZW5TZWFyY2goKVwiPnt7ICRjdHJsLmNvbmZpZy5jcml0ZXJpYSB9fSAtPC9zcGFuPiA8c3BhbiBjbGFzcz1cImJyZWFkY3J1bWItYWNjZW50XCIgbmctaWY9XCIkY3RybC5jb25maWcudGV4dFwiPnt7ICRjdHJsLmNvbmZpZy50ZXh0IHwgdHJhbnNsYXRlIH19PC9zcGFuPiA8c3BhbiBuZy1pZj1cIiRjdHJsLmNvbmZpZy5pdGVtcyAmJiAkY3RybC5jb25maWcuaXRlbXMubGVuZ3RoID4gMFwiIGNsYXNzPVwiYnJlYWRjcnVtYi1hY2NlbnQge3sgKCRjdHJsLmNvbmZpZy5pdGVtcyAmJiAkY3RybC5jb25maWcuaXRlbXMubGVuZ3RoID4gMSkgPyBcXCdjdXJzb3ItcG9pbnRlclxcJyA6IFxcJ1xcJyB9fVwiPnt7ICRjdHJsLmNvbmZpZy5pdGVtc1skY3RybC5jb25maWcuaXRlbXMubGVuZ3RoIC0gMV0udGl0bGUgfCB0cmFuc2xhdGUgfX08L3NwYW4+PC9zcGFuPjxtZC1pY29uIGNsYXNzPVwicGlwLXRyaWFuZ2xlLWRvd24gY3Vyc29yLXBvaW50ZXIgYnJlYWRjcnVtYi1hY2NlbnRcIiBtZC1zdmctaWNvbj1cImljb25zOnRyaWFuZ2xlLWRvd25cIiBuZy1pZj1cIiRjdHJsLmNvbmZpZy5pdGVtcyAmJiAkY3RybC5jb25maWcuaXRlbXMubGVuZ3RoID4gMVwiPjwvbWQtaWNvbj48L3NwYW4+PG1kLW1lbnUtY29udGVudCB3aWR0aD1cIjRcIj48bWQtbWVudS1pdGVtIG5nLXJlcGVhdD1cIml0ZW0gaW4gJGN0cmwuY29uZmlnLml0ZW1zXCIgbmctaWY9XCIkY3RybC5jb25maWcuaXRlbXMgJiYgJGN0cmwuY29uZmlnLml0ZW1zLmxlbmd0aCA+IDBcIj48bWQtYnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwub25DbGljayhpdGVtKVwiIHRhYmluZGV4PVwiNVwiPjxtZC1pY29uIG1kLW1lbnUtYWxpZ24tdGFyZ2V0PVwiXCIgbmctaWY9XCJpdGVtLmljb25cIiBtZC1zdmctaWNvbj1cInt7IGl0ZW0uaWNvbiB9fVwiPjwvbWQtaWNvbj48c3Bhbj57eyBpdGVtLnRpdGxlIHwgdHJhbnNsYXRlIH19PC9zcGFuPjwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjxtZC1tZW51LWl0ZW0gbmctaWY9XCIkY3RybC5jb25maWcudGV4dFwiPjxtZC1idXR0b24gdGFiaW5kZXg9XCI1XCI+PHNwYW4gY2xhc3M9XCJ0ZXh0LWdyZXlcIj57eyAkY3RybC5jb25maWcudGV4dCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj48L21kLWJ1dHRvbj48L21kLW1lbnUtaXRlbT48L21kLW1lbnUtY29udGVudD48L21kLW1lbnU+PC9kaXY+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZHJvcGRvd24vRHJvcGRvd24uaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIGNsYXNzPVwibWQtc3ViaGVhZCBjb2xvci1wcmltYXJ5LWJnIHt7ICRjdHJsLnRoZW1lQ2xhc3N9fVwiIG5nLWlmPVwiJGN0cmwuc2hvdygpXCIgbmctY2xhc3M9XCJ7XFwnbWQtd2hpdGVmcmFtZS0zZHBcXCc6ICRjdHJsLm1lZGlhKFxcJ3hzXFwnKX1cIj48ZGl2IGNsYXNzPVwicGlwLWRpdmlkZXJcIj48L2Rpdj48bWQtc2VsZWN0IG5nLW1vZGVsPVwiJGN0cmwuc2VsZWN0ZWRJbmRleFwiIHRhYmluZGV4PVwiMTVcIiBuZy1kaXNhYmxlZD1cIiRjdHJsLmRpc2FibGVkKClcIiBtZC1jb250YWluZXItY2xhc3M9XCJwaXAtZnVsbC13aWR0aC1kcm9wZG93blwiIGFyaWEtbGFiZWw9XCJEUk9QRE9XTlwiIG1kLWluay1yaXBwbGU9XCJcIiBtZC1vbi1jbG9zZT1cIiRjdHJsLm9uU2VsZWN0KCRjdHJsLnNlbGVjdGVkSW5kZXgpXCI+PG1kLW9wdGlvbiBuZy1yZXBlYXQ9XCJhY3Rpb24gaW4gJGN0cmwuYWN0aW9uc1wiIHZhbHVlPVwie3sgOjokaW5kZXggfX1cIiBuZy1zZWxlY3RlZD1cIiRjdHJsLmFjdGl2ZUluZGV4ID09ICRpbmRleCA/IHRydWUgOiBmYWxzZVwiPnt7IChhY3Rpb24udGl0bGUgfHwgYWN0aW9uLm5hbWUgfHwgYWN0aW9uKSB8IHRyYW5zbGF0ZSB9fTwvbWQtb3B0aW9uPjwvbWQtc2VsZWN0PjwvbWQtdG9vbGJhcj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdoZWFkZXIvTmF2SGVhZGVyLmh0bWwnLFxuICAgICc8bWQtdG9vbGJhciBuZy1zaG93PVwiJGN0cmwuc2hvd0hlYWRlclwiIGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyXCI+PGRpdiBjbGFzcz1cImZsZXgtZml4ZWQgcGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXJcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiBuZy1jbGljaz1cIiRjdHJsLm9uVXNlckNsaWNrKClcIiBhcmlhLWxhYmVsPVwiY3VycmVudCB1c2VyXCIgdGFiaW5kZXg9XCItMVwiPjxpbWcgc3JjPVwiXCIgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci1pbWFnZVwiIG5nLWNsYXNzPVwiJGN0cmwuaW1hZ2VDc3NcIj48L21kLWJ1dHRvbj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXItdGV4dFwiPjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1oZWFkZXItdXNlci1wcmlcIiBuZy1jbGljaz1cIiRjdHJsLm9uVXNlckNsaWNrKClcIiB0YWJpbmRleD1cIi0xXCI+e3sgJGN0cmwudGl0bGUgfCB0cmFuc2xhdGUgfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtaGVhZGVyLXVzZXItc2VjXCI+e3sgJGN0cmwuc3VidGl0bGUgfCB0cmFuc2xhdGUgfX08L2Rpdj48L2Rpdj48L21kLXRvb2xiYXI+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTmF2LlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnaWNvbi9OYXZJY29uLmh0bWwnLFxuICAgICc8bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b24gcGlwLW5hdi1pY29uXCIgbmctaWY9XCIkY3RybC5jb25maWcudHlwZSAhPSBcXCdub25lXFwnXCIgbmctY2xhc3M9XCIkY3RybC5jb25maWcuY2xhc3NcIiBuZy1jbGljaz1cIiRjdHJsLm9uTmF2SWNvbkNsaWNrKClcIiB0YWJpbmRleD1cInt7ICRjdHJsLmNvbmZpZy50eXBlPT1cXCdtZW51XFwnIHx8ICRjdHJsLmNvbmZpZy50eXBlPT1cXCdiYWNrXFwnID8gNCA6IC0xIH19XCIgYXJpYS1sYWJlbD1cIm1lbnVcIj48bWQtaWNvbiBuZy1pZj1cIiRjdHJsLmNvbmZpZy50eXBlPT1cXCdtZW51XFwnXCIgbWQtc3ZnLWljb249XCJpY29uczptZW51XCI+PC9tZC1pY29uPjxpbWcgbmctc3JjPVwie3sgJGN0cmwuY29uZmlnLmltYWdlVXJsIH19XCIgbmctaWY9XCIkY3RybC5jb25maWcudHlwZT09XFwnaW1hZ2VcXCdcIiBoZWlnaHQ9XCIyNFwiIHdpZHRoPVwiMjRcIj48bWQtaWNvbiBuZy1pZj1cIiRjdHJsLmNvbmZpZy50eXBlPT1cXCdiYWNrXFwnXCIgbWQtc3ZnLWljb249XCJpY29uczphcnJvdy1sZWZ0XCI+PC9tZC1pY29uPjxtZC1pY29uIG5nLWlmPVwiJGN0cmwuY29uZmlnLnR5cGU9PVxcJ2ljb25cXCdcIiBtZC1zdmctaWNvbj1cInt7ICRjdHJsLmNvbmZpZy5pY29uIH19XCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2xhbmd1YWdlL0xhbmd1YWdlUGlja2VyLmh0bWwnLFxuICAgICc8bWQtbWVudSBtZC1wb3NpdGlvbi1tb2RlPVwidGFyZ2V0LXJpZ2h0IHRhcmdldFwiPjxzcGFuIGNsYXNzPVwicGlwLWxhbmd1YWdlXCIgbmctY2xpY2s9XCIkbWRPcGVuTWVudSgpXCIgYXJpYS1sYWJlbD1cImxhbmd1YWdlIHNlbGVjdGlvblwiPnt7ICRjdHJsLnZhbHVlIHwgdHJhbnNsYXRlIH19PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczp0cmlhbmdsZS1kb3duXCI+PC9tZC1pY29uPjwvc3Bhbj48bWQtbWVudS1jb250ZW50IHdpZHRoPVwiM1wiPjxtZC1tZW51LWl0ZW0gbmctcmVwZWF0PVwibGFuZ3VhZ2UgaW4gJGN0cmwubGFuZ3VhZ2VzXCI+PG1kLWJ1dHRvbiBuZy1jbGljaz1cIiRjdHJsLm9uTGFuZ3VhZ2VDbGljayhsYW5ndWFnZSlcIiB0YWJpbmRleD1cIjdcIj57eyBsYW5ndWFnZSB8IHRyYW5zbGF0ZSB9fTwvbWQtYnV0dG9uPjwvbWQtbWVudS1pdGVtPjwvbWQtbWVudS1jb250ZW50PjwvbWQtbWVudT4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdtZW51L05hdk1lbnUuaHRtbCcsXG4gICAgJzxkaXYgbmctaWY9XCIkY3RybC5zZWN0aW9ucyAmJiAkY3RybC5zZWN0aW9ucy5sZW5ndGhcIj48bWQtbGlzdCBjbGFzcz1cInNpZGVuYXYtbGlzdFwiIHBpcC1mb2N1c2VkPVwiXCIgcGlwLWZvY3VzZWQtdGFiaW5kZXg9XCIxMFwiIHBpcC13aXRoLWhpZGRlbj1cInRydWVcIj48bWQtbGlzdC1pdGVtIGNsYXNzPVwibm8tYm9yZGVyIHBpcC1zdGlja3ktbmF2LW1lbnUtaXRlbSBwaXAtc3RpY2t5LW5hdi1leHBhbmRlZC1idXR0b25cIiBuZy1jbGljaz1cIiRjdHJsLm9uRXhwYW5kKClcIiBuZy1kaXNhYmxlZD1cIiEkY3RybC5pc0NvbGxhcHNlZFwiIHRhYmluZGV4PVwiLTFcIiBuZy1pZj1cIiRjdHJsLmV4cGFuZGVkQnV0dG9uXCI+PG1kLWljb24gY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb25cIiBtZC1zdmctaWNvbj1cImljb25zOmNoZXZyb24tbGVmdFwiIG5nLWlmPVwiJGN0cmwuZXhwYW5kZWRcIj48L21kLWljb24+PG1kLWljb24gY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb25cIiBtZC1zdmctaWNvbj1cImljb25zOmNoZXZyb24tcmlnaHRcIiBuZy1pZj1cIiEkY3RybC5leHBhbmRlZFwiPjwvbWQtaWNvbj48L21kLWxpc3QtaXRlbT48bWQtZGl2aWRlciBuZy1zaG93PVwiJGN0cmwuZXhwYW5kZWRCdXR0b25cIj48L21kLWRpdmlkZXI+PGRpdiBjbGFzcz1cInBpcC1zZWN0aW9uXCIgbmctcmVwZWF0PVwic2VjdGlvbiBpbiAkY3RybC5zZWN0aW9uc1wiIG5nLWhpZGU9XCJzZWN0aW9uLmFjY2VzcyAmJiAhc2VjdGlvbi5hY2Nlc3Moc2VjdGlvbilcIj48bWQtZGl2aWRlciBuZy1zaG93PVwiJGluZGV4ID4gMCAmJiAhJGN0cmwuaXNTZWN0aW9uRW1wdHkoc2VjdGlvbi5saW5rcylcIj48L21kLWRpdmlkZXI+PG1kLXN1YmhlYWRlciBuZy1zaG93PVwic2VjdGlvbi50aXRsZVwiIHN0eWxlPVwiaGVpZ2h0OiA0OHB4O1wiPjxzcGFuIG5nLWlmPVwiJGN0cmwuZXhwYW5kZWRcIiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtdGl0bGUgc2VjdGlvbi10aXRsZVwiPnt7IDo6c2VjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj48bWQtaWNvbiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBzZWN0aW9uLWljb25cIiBtZC1zdmctaWNvbj1cInt7IHNlY3Rpb24uaWNvbiB9fVwiIG5nLWlmPVwiISRjdHJsLnNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICEkY3RybC5leHBhbmRlZCAmJiBzZWN0aW9uLmljb25cIj48L21kLWljb24+PG1kLWljb24gY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCIgbWQtc3ZnLWljb249XCJ7eyBzZWN0aW9uLmljb24gfX1cIiBuZy1pZj1cIiRjdHJsLnNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICEkY3RybC5leHBhbmRlZCAmJiBzZWN0aW9uLmljb25cIj48bWQtdG9vbHRpcCBtZC12aXNpYmxlPVwic2hvd1Rvb2x0aXBcIiBtZC1kaXJlY3Rpb249XCJyaWdodFwiIGNsYXNzPVwic2lkZW5hdi1pY29uLXRvb2x0aXBcIj57eyA6OnNlY3Rpb24udG9vbHRpcFRleHQgfHwgc2VjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvbWQtdG9vbHRpcD48L21kLWljb24+PG1kLWljb24gY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24gc2VjdGlvbi1pY29uXCIgbWQtc3ZnLWljb249XCJ7eyAkY3RybC5kZWZhdWx0SWNvbiB9fVwiIG5nLWlmPVwiISRjdHJsLnNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICEkY3RybC5leHBhbmRlZCAmJiAhc2VjdGlvbi5pY29uXCI+PC9tZC1pY29uPjxtZC1pY29uIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uIHNlY3Rpb24taWNvblwiIG1kLXN2Zy1pY29uPVwie3sgJGN0cmwuZGVmYXVsdEljb24gfX1cIiBuZy1pZj1cIiRjdHJsLnNpZGVOYXZTdGF0ZS5zaG93SWNvblRvb2x0eXBlICYmICEkY3RybC5leHBhbmRlZCAmJiAhc2VjdGlvbi5pY29uXCI+PG1kLXRvb2x0aXAgbWQtdmlzaWJsZT1cInNob3dUb29sdGlwXCIgY2xhc3M9XCJtZC1zZWNvbmRhcnlcIj57eyA6OnNlY3Rpb24udG9vbHRpcFRleHQgfHwgc2VjdGlvbi50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvbWQtdG9vbHRpcD48L21kLWljb24+PC9tZC1zdWJoZWFkZXI+PG1kLWxpc3QtaXRlbSBjbGFzcz1cIm5vLWJvcmRlciBwaXAtc3RpY2t5LW5hdi1tZW51LWl0ZW0gcGlwLWZvY3VzYWJsZVwiIHRhYmluZGV4PVwiLTFcIiBuZy1yZXBlYXQ9XCJsaW5rIGluIHNlY3Rpb24ubGlua3NcIiBuZy1jbGFzcz1cIntcXCdhY3RpdmVcXCc6ICRjdHJsLmlzQWN0aXZlKGxpbmspfVwiIG5nLWhpZGU9XCJsaW5rLmFjY2VzcyAmJiAhbGluay5hY2Nlc3MobGluaylcIj48bWQtYnV0dG9uIGNsYXNzPVwibGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tc3RhcnQtY2VudGVyIHBpcC1idXR0b24tYmxvY2tcIiB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCIkY3RybC5jbGlja0xpbmsoJGV2ZW50LCBsaW5rKVwiPjxtZC10b29sdGlwIG1kLXZpc2libGU9XCJzaG93VG9vbHRpcFwiIG1kLWRpcmVjdGlvbj1cInJpZ2h0XCI+e3sgOjpsaW5rLnRvb2x0aXBUZXh0IHwgdHJhbnNsYXRlIH19PC9tZC10b29sdGlwPjxkaXYgY2xhc3M9XCJwaXAtc3RpY2t5LW5hdi1tZW51LWljb24tYmxvY2tcIj48bWQtaWNvbiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtaWNvbiBmbGV4LWZpeGVkXCIgbWQtc3ZnLWljb249XCJ7eyBsaW5rLmljb24gfX1cIiBuZy1pZj1cIiEoJGN0cmwuc2lkZU5hdlN0YXRlLnNob3dJY29uVG9vbHR5cGUgJiYgIWxpbmsudG9vbHRpcFRleHQgJiYgISRjdHJsLmV4cGFuZGVkKVwiIG5nLWhpZGU9XCIhbGluay5pY29uXCI+PC9tZC1pY29uPjxtZC1pY29uIGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1pY29uIGZsZXgtZml4ZWRcIiBtZC1zdmctaWNvbj1cInt7IGxpbmsuaWNvbiB9fVwiIG5nLWhpZGU9XCIhbGluay5pY29uXCIgbmctaWY9XCIkY3RybC5zaWRlTmF2U3RhdGUuc2hvd0ljb25Ub29sdHlwZSAmJiAhbGluay50b29sdGlwVGV4dCAmJiAhJGN0cmwuZXhwYW5kZWRcIj48bWQtdG9vbHRpcCBtZC12aXNpYmxlPVwic2hvd1Rvb2x0aXBcIiBtZC1kaXJlY3Rpb249XCJyaWdodFwiIGNsYXNzPVwic2lkZW5hdi1pY29uLXRvb2x0aXBcIj57eyA6OmxpbmsudG9vbHRpcFRleHQgfHwgbGluay50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvbWQtdG9vbHRpcD48L21kLWljb24+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtdGl0bGVcIj57eyA6OmxpbmsudGl0bGUgfCB0cmFuc2xhdGUgfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLXN0aWNreS1uYXYtbWVudS1iYWRnZSB7eyBsaW5rLmJhZGdlU3R5bGUgPyBsaW5rLmJhZGdlU3R5bGUgOiBcXCdjb2xvci1iYWRnZS1iZ1xcJyB9fSBmbGV4LWZpeGVkXCIgbmctaWY9XCJsaW5rLmNvdW50ICYmIGxpbmsuY291bnQgPCAxMDBcIj57eyBsaW5rLmNvdW50IH19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1zdGlja3ktbmF2LW1lbnUtYmFkZ2Uge3sgbGluay5iYWRnZVN0eWxlID8gbGluay5iYWRnZVN0eWxlIDogXFwnY29sb3ItYmFkZ2UtYmdcXCcgfX0gZmxleC1maXhlZFwiIG5nLWlmPVwibGluay5jb3VudCAmJiBsaW5rLmNvdW50ID4gOTlcIj4hPC9kaXY+PC9tZC1idXR0b24+PC9tZC1saXN0LWl0ZW0+PC9kaXY+PC9tZC1saXN0PjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcE5hdi5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3NlYXJjaC9TZWFyY2hCYXIuaHRtbCcsXG4gICAgJzxkaXYgY2xhc3M9XCJtZC10b29sYmFyLXRvb2xzIHBpcC1zZWFyY2gtY29udGFpbmVyXCIgbmctaWY9XCIkY3RybC5lbmFibGVkXCI+PGRpdiBjbGFzcz1cImxheW91dC1yb3cgcGlwLXNlYXJjaC1zZWxlY3RlZFwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1pY29uLWJ1dHRvblwiIHRhYmluZGV4PVwiNlwiIGFyaWEtbGFiZWw9XCJzdGFydCBzZWFyY2hcIiBuZy1jbGljaz1cIiRjdHJsLm9uQ2xpY2soKVwiPjxtZC1pY29uIG1kLXN2Zy1pY29uPVwiaWNvbnM6c2VhcmNoXCI+PC9tZC1pY29uPjwvbWQtYnV0dG9uPjxpbnB1dCBjbGFzcz1cInBpcC1zZWFyY2gtdGV4dCBmbGV4XCIgdHlwZT1cInNlYXJjaFwiIHRhYmluZGV4PVwiNlwiIG5nLW1vZGVsPVwiJGN0cmwuc2VhcmNoLnRleHRcIiBuZy1rZXlkb3duPVwiJGN0cmwub25LZXlEb3duKCRldmVudClcIj48bWQtYnV0dG9uIGNsYXNzPVwibWQtaWNvbi1idXR0b25cIiB0YWJpbmRleD1cIjZcIiBhcmlhLWxhYmVsPVwiY2xlYXIgc2VhcmNoXCIgbmctY2xpY2s9XCIkY3RybC5jbGVhcigpXCI+PG1kLWljb24gbWQtc3ZnLWljb249XCJpY29uczpjcm9zcy1jaXJjbGVcIj48L21kLWljb24+PC9tZC1idXR0b24+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cIm1kLXRvb2xiYXItdG9vbHMgbGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tZW5kLWNlbnRlciBmbGV4LWZpeGVkIGxwMCBycDBcIiBuZy1pZj1cIiEkY3RybC5lbmFibGVkXCI+PG1kLWJ1dHRvbiBjbGFzcz1cIm1kLWljb24tYnV0dG9uXCIgdGFiaW5kZXg9XCI1XCIgYXJpYS1sYWJlbD1cInN0YXJ0IHNlYXJjaFwiIG5nLWNsaWNrPVwiJGN0cmwuZW5hYmxlKClcIj48bWQtaWNvbiBtZC1zdmctaWNvbj1cImljb25zOnNlYXJjaFwiPjwvbWQtaWNvbj48L21kLWJ1dHRvbj48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdzaWRlbmF2L1NpZGVOYXYuaHRtbCcsXG4gICAgJzxtZC1zaWRlbmF2IGNsYXNzPVwibWQtc2lkZW5hdi1sZWZ0XCIgbWQtaXMtbG9ja2VkLW9wZW49XCIkY3RybC5zaWRlbmF2U3RhdGUuaXNMb2NrZWRPcGVuXCIgbWQtY29tcG9uZW50LWlkPVwicGlwLXN0aWNreS1zaWRlbmF2XCIgbmctdHJhbnNjbHVkZT1cIlwiPjwvbWQtc2lkZW5hdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBOYXYuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCd0YWJzL1RhYnMuaHRtbCcsXG4gICAgJzxtZC10b29sYmFyIG5nLWlmPVwiJGN0cmwucGlwTWVkaWFcIiBjbGFzcz1cInBpcC1uYXYgY29sb3ItcHJpbWFyeS1iZyB7eyAkY3RybC50aGVtZUNsYXNzIH19XCIgbmctY2xhc3M9XCJ7XFwncGlwLXZpc2libGVcXCc6ICRjdHJsLnNob3coKSwgXFwncGlwLXNoYWRvd1xcJzogJGN0cmwuc2hvd1NoYWRvdygpfVwiPjxtZC10YWJzIGNsYXNzPVwiY29sb3ItcHJpbWFyeS1iZ1wiIG5nLWlmPVwiJGN0cmwucGlwTWVkaWEoJGN0cmwuYnJlYWtwb2ludHMpXCIgbWQtc2VsZWN0ZWQ9XCIkY3RybC5hY3RpdmVJbmRleFwiIG5nLWNsYXNzPVwie1xcJ2Rpc2FibGVkXFwnOiAkY3RybC5pc0Rpc2FibGVkKCl9XCIgbWQtc3RyZXRjaC10YWJzPVwidHJ1ZVwiIG1kLWR5bmFtaWMtaGVpZ2h0PVwidHJ1ZVwiPjxtZC10YWIgbmctcmVwZWF0PVwidGFiIGluICRjdHJsLnRhYnMgdHJhY2sgYnkgJGluZGV4XCIgbmctZGlzYWJsZWQ9XCIkY3RybC50YWJEaXNhYmxlZCgkaW5kZXgpXCIgbWQtb24tc2VsZWN0PVwiJGN0cmwub25TZWxlY3QoJGluZGV4KVwiPjxtZC10YWItbGFiZWw+e3s6OiB0YWIubmFtZUxvY2FsIH19PGRpdiBjbGFzcz1cInBpcC10YWJzLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctaWY9XCJ0YWIuY291bnRzID4gMCAmJiB0YWIuY291bnRzIDw9IDk5XCI+e3sgdGFiLmNvdW50cyB9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtdGFicy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLWlmPVwidGFiLmNvdW50cyA+IDk5XCI+ITwvZGl2PjwvbWQtdGFiLWxhYmVsPjwvbWQtdGFiPjwvbWQtdGFicz48ZGl2IGNsYXNzPVwibWQtc3ViaGVhZCBwaXAtdGFicy1jb250ZW50IGNvbG9yLXByaW1hcnktYmdcIiBuZy1pZj1cIiEkY3RybC5waXBNZWRpYSgkY3RybC5icmVha3BvaW50cylcIj48ZGl2IGNsYXNzPVwicGlwLWRpdmlkZXIgcG9zaXRpb24tdG9wIG0wXCI+PC9kaXY+PG1kLXNlbGVjdCBuZy1tb2RlbD1cIiRjdHJsLmFjdGl2ZUluZGV4XCIgbmctZGlzYWJsZWQ9XCIkY3RybC5pc0Rpc2FibGVkKClcIiBtZC1jb250YWluZXItY2xhc3M9XCJwaXAtZnVsbC13aWR0aC1kcm9wZG93blwiIGFyaWEtbGFiZWw9XCJTRUxFQ1RcIiBtZC1pbmstcmlwcGxlPVwiXCIgbWQtb24tY2xvc2U9XCIkY3RybC5vblNlbGVjdCgkY3RybC5hY3RpdmVJbmRleClcIj48bWQtb3B0aW9uIG5nLXJlcGVhdD1cInRhYiBpbiAkY3RybC50YWJzIHRyYWNrIGJ5ICRpbmRleFwiIGNsYXNzPVwicGlwLXRhYi1vcHRpb25cIiB2YWx1ZT1cInt7IDo6JGluZGV4IH19XCI+e3sgOjp0YWIubmFtZUxvY2FsIH19PGRpdiBjbGFzcz1cInBpcC10YWJzLWJhZGdlIGNvbG9yLWJhZGdlLWJnXCIgbmctaWY9XCJ0YWIuY291bnRzID4gMCAmJiB0YWIuY291bnRzIDw9IDk5XCI+e3sgdGFiLmNvdW50cyB9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtdGFicy1iYWRnZSBjb2xvci1iYWRnZS1iZ1wiIG5nLWlmPVwidGFiLmNvdW50cyA+IDk5XCI+ITwvZGl2PjwvbWQtb3B0aW9uPjwvbWQtc2VsZWN0PjwvZGl2PjwvbWQtdG9vbGJhcj4nKTtcbn1dKTtcbn0pKCk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcC13ZWJ1aS1uYXYtaHRtbC5taW4uanMubWFwXG4iXX0=