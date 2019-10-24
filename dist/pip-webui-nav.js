(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).nav = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
        return _super !== null && _super.apply(this, arguments) || this;
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
Object.defineProperty(exports, "__esModule", { value: true });
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
            if (this.$injector.has('$state')) {
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
Object.defineProperty(exports, "__esModule", { value: true });
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
            if (this.$injector.has('$state')) {
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
Object.defineProperty(exports, "__esModule", { value: true });
angular.module('pipActions', ['ngMaterial', 'pipNav.Templates', 'ui.router']);
require("./ActionsService");
require("./PrimaryActions");
require("./SecondaryActions");
__export(require("./IActionsService"));
},{"./ActionsService":1,"./IActionsService":2,"./PrimaryActions":3,"./SecondaryActions":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
var AppBarConfig = (function () {
    function AppBarConfig() {
    }
    return AppBarConfig;
}());
exports.AppBarConfig = AppBarConfig;
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
angular
    .module('pipAppBar', ['ngMaterial', 'pipNav.Templates']);
require("./AppBarConfig");
require("./AppBarService");
require("./AppBar");
require("./AppBarPart");
__export(require("./AppBarService"));
},{"./AppBar":6,"./AppBarConfig":7,"./AppBarPart":8,"./AppBarService":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BreadcrumbService_1 = require("./BreadcrumbService");
var BreadcrumbService_2 = require("./BreadcrumbService");
var SearchService_1 = require("../search/SearchService");
var BreadcrumbController = (function () {
    BreadcrumbController.$inject = ['$rootScope', '$window', '$location', '$injector', 'pipBreadcrumb', '$mdMedia', '$state', '$element', 'navConstant'];
    function BreadcrumbController($rootScope, $window, $location, $injector, pipBreadcrumb, $mdMedia, $state, $element, navConstant) {
        "ngInject";
        var _this = this;
        this.$rootScope = $rootScope;
        this.$window = $window;
        this.$location = $location;
        this.$injector = $injector;
        this.navConstant = navConstant;
        $element.addClass('pip-breadcrumb');
        this.config = pipBreadcrumb.config;
        $rootScope.$on(BreadcrumbService_1.BreadcrumbChangedEvent, function (event, config) {
            _this.onBreadcrumbChanged(event, config);
        });
        $rootScope.$on(BreadcrumbService_2.BreadcrumbBackEvent, function () { _this.onBreadcrumbBack(); });
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this._media = pipMedia !== undefined ? pipMedia : $mdMedia;
        if (!this.config.breakpoint) {
            this.config.breakpoint = this.navConstant.BREADCRUMB_BREAKPOINT;
        }
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
    templateUrl: 'breadcrumb/Breadcrumb.html',
    controller: BreadcrumbController
};
angular
    .module('pipBreadcrumb')
    .component('pipBreadcrumb', breadcrumb);
},{"../search/SearchService":35,"./BreadcrumbService":13}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
    Object.defineProperty(BreadcrumbService.prototype, "breakpoint", {
        get: function () {
            return this._config.breakpoint;
        },
        set: function (value) {
            this._config.breakpoint = value;
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
Object.defineProperty(exports, "__esModule", { value: true });
angular.module('pipBreadcrumb', ['ngMaterial', 'pipNav.Templates', 'pipNav.Translate']);
require("./Breadcrumb");
require("./BreadcrumbService");
__export(require("./BreadcrumbService"));
},{"./Breadcrumb":11,"./BreadcrumbService":13}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
var NavHeaderConfig = (function () {
    function NavHeaderConfig() {
    }
    return NavHeaderConfig;
}());
exports.NavHeaderConfig = NavHeaderConfig;
;
},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
angular.module('pipNavHeader', ['ngMaterial', 'pipNav.Templates']);
require("./NavHeaderService");
require("./NavHeader");
__export(require("./NavHeaderService"));
},{"./NavHeader":18,"./NavHeaderService":20}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            this.$rootScope.$broadcast(SideNavService_1.ToggleSideNavEvent);
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
Object.defineProperty(exports, "__esModule", { value: true });
var NavIconConfig = (function () {
    function NavIconConfig() {
    }
    return NavIconConfig;
}());
exports.NavIconConfig = NavIconConfig;
;
},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
    'BREADCRUMB_BREAKPOINT': 'gt-xs',
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
            this._translate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            $element.addClass('pip-language-picker');
            this.setLanguages(this.languages);
            this.value = this.value || this.languages[0];
        }
        LanguagePickerDirectiveController.prototype.$onChanges = function (changes) {
            if (this.value != changes.value.previousValue) {
            }
        };
        Object.defineProperty(LanguagePickerDirectiveController.prototype, "language", {
            get: function () {
                return this._translate ? this._translate.language : null;
            },
            enumerable: true,
            configurable: true
        });
        LanguagePickerDirectiveController.prototype.setLanguages = function (languages) {
            this.languages = languages && languages.length > 0 ? languages : ['en', 'ru'];
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
        languages: '<?languages',
        value: '<?value'
    };
    var LanguagePickerChanges = (function () {
        function LanguagePickerChanges() {
        }
        return LanguagePickerChanges;
    }());
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
Object.defineProperty(exports, "__esModule", { value: true });
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
            this.expanded = null;
            this._state = $injector.has('$state') ? $injector.get('$state') : null;
            this._animationDuration = navConstant.SIDENAV_ANIMATION_DURATION,
                this._pipSideNavElement = $element.parents('pip-sidenav');
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
            if (!state.expandedButton || this.expanded == null)
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
angular.module('pipNavMenu', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require("./NavMenuService");
require("./NavMenu");
},{"./NavMenu":29,"./NavMenuService":30}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
var SearchConfig = (function () {
    function SearchConfig() {
    }
    return SearchConfig;
}());
exports.SearchConfig = SearchConfig;
},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
angular.module('pipSearchBar', ['ngMaterial', 'pipNav.Translate', 'pipNav.Templates']);
require("./SearchConfig");
require("./ISearchService");
require("./SearchService");
require("./SearchBar");
},{"./ISearchService":32,"./SearchBar":33,"./SearchConfig":34,"./SearchService":35}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SideNavService_1 = require("../sidenav/SideNavService");
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
        this.cleanupNavHeaderChanged = this.$rootScope.$on(SideNavService_1.ToggleSideNavEvent, function () {
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
        this.pipSideNav.toggle();
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
        var currentWidth = sideNavWidth ? sideNavWidth + 1 : 0;
        if (mainWidth + currentWidth <= this._mediaBreakpoints.sm) {
            this.setState(SideNavState_1.SideNavStateNames.Toggle);
            return;
        }
        if (mainWidth + currentWidth <= this._mediaBreakpoints.md) {
            this.setState(SideNavState_1.SideNavStateNames.Small);
            return;
        }
        if (mainWidth + currentWidth <= this._mediaBreakpoints.lg) {
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
},{"../sidenav/SideNavService":39,"./SideNavState":40}],38:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
var SideNavState_1 = require("./SideNavState");
exports.SideNavChangedEvent = 'pipSideNavChanged';
exports.SideNavStateChangedEvent = 'pipSideNavStateChanged';
exports.OpenSideNavEvent = 'pipOpenSideNav';
exports.CloseSideNavEvent = 'pipCloseSideNav';
exports.ToggleSideNavEvent = 'pipToggleSideNav';
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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
angular.module('pipSideNav', ['ngMaterial', 'pipNav.Templates']);
require("./SideNavState");
require("./SideNavService");
require("./SideNavPart");
require("./SideNav");
__export(require("./SideNavService"));
},{"./SideNav":37,"./SideNavPart":38,"./SideNavService":39,"./SideNavState":40}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    '<md-toolbar class="color-primary-bg {{ $ctrl.config.classes.join(\' \') }}" ng-if="$ctrl.config.visible" ng-transclude=""></md-toolbar>');
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
    '<div class="pip-breadcrumb-block"><div class="text-overflow" ng-if="$ctrl._media($ctrl.config.breakpoint)"><span ng-if="$ctrl.config.criteria" ng-click="$ctrl.openSearch()">{{ $ctrl.config.criteria }} -</span><span class="pip-breadcrumb-item {{ $last ? \'breadcrumb-accent\' : \'\' }}" ng-if="$ctrl.config.items && $ctrl.config.items.length > 0" ng-repeat-start="item in $ctrl.config.items" ng-click="$ctrl.onClick(item)" ng-init="stepWidth = 100/($ctrl.config.items.length + 1)" ng-class="{\'cursor-pointer\': !$last}" ng-style="{\'max-width\': stepWidth + \'%\'}"><span ng-if="!$last || !$ctrl.actionsVisible(item)">{{ item.title | translate }}</span><div ng-if="$last && $ctrl.actionsVisible(item)" style="display: inline-block; position: relative;"><md-menu md-offset="0 44"><span class="layout-row pip-breadcrumb-item-menu cursor-pointer {{ $last ? \'breadcrumb-accent\' : \'\' }}" ng-click="$ctrl.onOpenMenu($mdOpenMenu, $event)" md-ink-ripple="" aria-label="open breadcrumb actions">{{ item.title | translate }}<md-icon class="pip-triangle-down" md-svg-icon="icons:triangle-down"></md-icon></span><md-menu-content width="4"><md-menu-item ng-if="!subItem.divider" ng-repeat-start="subItem in item.subActions"><md-button ng-click="$ctrl.onSubActionClick(subItem)" ng-if="!action.divider" tabindex="4"><md-icon md-menu-align-target="" ng-if="subItem.icon" md-svg-icon="{{ subItem.icon }}"></md-icon><span>{{ subItem.title | translate }}</span></md-button></md-menu-item><md-menu-divider ng-if="subItem.divider" ng-repeat-end=""></md-menu-divider></md-menu-content></md-menu></div></span><md-icon ng-repeat-end="" md-svg-icon="icons:chevron-right" ng-hide="$last"></md-icon><span class="pip-title breadcrumb-accent" ng-if="$ctrl.config.text">{{ $ctrl.config.text | translate }}</span></div><div style="position: relative;" ng-if="!$ctrl._media($ctrl.config.breakpoint)"><md-menu md-offset="0 44"><span class="pip-mobile-breadcrumb layout-row" ng-click="$ctrl.config.items && $ctrl.config.items.length > 1 ? $mdOpenMenu() : return"><span class="text-overflow"><span ng-if="$ctrl.config.criteria" ng-click="$ctrl.openSearch()">{{ $ctrl.config.criteria }} -</span> <span class="breadcrumb-accent" ng-if="$ctrl.config.text">{{ $ctrl.config.text | translate }}</span> <span ng-if="$ctrl.config.items && $ctrl.config.items.length > 0" class="breadcrumb-accent {{ ($ctrl.config.items && $ctrl.config.items.length > 1) ? \'cursor-pointer\' : \'\' }}">{{ $ctrl.config.items[$ctrl.config.items.length - 1].title | translate }}</span></span><md-icon class="pip-triangle-down cursor-pointer breadcrumb-accent" md-svg-icon="icons:triangle-down" ng-if="$ctrl.config.items && $ctrl.config.items.length > 1"></md-icon></span><md-menu-content width="4"><md-menu-item ng-repeat="item in $ctrl.config.items" ng-if="$ctrl.config.items && $ctrl.config.items.length > 0"><md-button ng-click="$ctrl.onClick(item)" tabindex="5"><md-icon md-menu-align-target="" ng-if="item.icon" md-svg-icon="{{ item.icon }}"></md-icon><span>{{ item.title | translate }}</span></md-button></md-menu-item><md-menu-item ng-if="$ctrl.config.text"><md-button tabindex="5"><span class="text-grey">{{ $ctrl.config.text | translate }}</span></md-button></md-menu-item></md-menu-content></md-menu></div></div>');
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
  $templateCache.put('menu/NavMenu.html',
    '<div ng-if="$ctrl.sections && $ctrl.sections.length"><md-list class="sidenav-list" pip-focused="" pip-focused-tabindex="10" pip-with-hidden="true"><md-list-item class="no-border pip-sticky-nav-menu-item pip-sticky-nav-expanded-button" ng-click="$ctrl.onExpand()" ng-disabled="!$ctrl.isCollapsed" tabindex="-1" ng-if="$ctrl.expandedButton"><md-icon class="pip-sticky-nav-menu-icon" md-svg-icon="icons:chevron-left" ng-if="$ctrl.pipSideNav.state.isExpanded"></md-icon><md-icon class="pip-sticky-nav-menu-icon" md-svg-icon="icons:chevron-right" ng-if="!$ctrl.pipSideNav.state.isExpanded"></md-icon></md-list-item><md-divider ng-show="$ctrl.expandedButton"></md-divider><div class="pip-section" ng-repeat="section in $ctrl.sections" xxxng-hide="section.access && !section.access(section)"><md-divider ng-show="$index > 0 && !$ctrl.isSectionEmpty(section.links)"></md-divider><md-subheader ng-show="section.title" style="height: 48px;"><span ng-if="$ctrl.pipSideNav.state.isExpanded" class="pip-sticky-nav-menu-title section-title">{{ ::section.title | translate }}</span><md-icon class="pip-sticky-nav-menu-icon section-icon" md-svg-icon="{{ section.icon }}" ng-if="!$ctrl.sideNavState.showIconTooltype && !$ctrl.expanded && section.icon"></md-icon><md-icon class="pip-sticky-nav-menu-icon section-icon" md-svg-icon="{{ section.icon }}" ng-if="$ctrl.sideNavState.showIconTooltype && !$ctrl.expanded && section.icon"><md-tooltip md-visible="showTooltip" md-direction="right" class="sidenav-icon-tooltip">{{ ::section.tooltipText || section.title | translate }}</md-tooltip></md-icon><md-icon class="pip-sticky-nav-menu-icon section-icon" md-svg-icon="{{ $ctrl.defaultIcon }}" ng-if="!$ctrl.sideNavState.showIconTooltype && !$ctrl.expanded && !section.icon"></md-icon><md-icon class="pip-sticky-nav-menu-icon section-icon" md-svg-icon="{{ $ctrl.defaultIcon }}" ng-if="$ctrl.sideNavState.showIconTooltype && !$ctrl.expanded && !section.icon"><md-tooltip md-visible="showTooltip" class="md-secondary">{{ ::section.tooltipText || section.title | translate }}</md-tooltip></md-icon></md-subheader><md-list-item class="no-border pip-sticky-nav-menu-item pip-focusable" tabindex="-1" ng-repeat="link in section.links" ng-class="{\'active\': $ctrl.isActive(link)}"><md-button class="layout-row layout-align-start-center pip-button-block" tabindex="-1" ng-disabled="link.access && !link.access(link)" ng-click="$ctrl.clickLink($event, link)"><div class="pip-sticky-nav-menu-icon-block"><md-icon class="pip-sticky-nav-menu-icon flex-fixed" md-svg-icon="{{ link.icon }}" ng-if="!$ctrl.sideNavState.showIconTooltype || !link.tooltipText || $ctrl.pipSideNav.state.isExpanded" ng-hide="!link.icon"></md-icon><md-icon class="pip-sticky-nav-menu-icon flex-fixed" md-svg-icon="{{ link.icon }}" ng-hide="!link.icon" ng-if="$ctrl.sideNavState.showIconTooltype && link.tooltipText && !$ctrl.pipSideNav.state.isExpanded"><md-tooltip md-visible="showTooltip" md-direction="right" class="sidenav-icon-tooltip">{{ ::link.tooltipText || link.title | translate }}</md-tooltip></md-icon></div><div class="pip-sticky-nav-menu-title">{{ ::link.title | translate }}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count < 100">{{ link.count }}</div><div class="pip-sticky-nav-menu-badge {{ link.badgeStyle ? link.badgeStyle : \'color-badge-bg\' }} flex-fixed" ng-if="link.count && link.count > 99">!</div></md-button></md-list-item></div></md-list></div>');
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

//# sourceMappingURL=pip-webui-nav.js.map
