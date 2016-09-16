/**
 * @file Application App Bar service
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipAppBar.Service', []);

    thisModule.provider('pipAppBar', function () {
        var config = {
            appTitleText: null,
            appTitleLogo: 'images/piplife_logo.svg',

            // Theme to be applied to the header
            theme: 'blue',
            cssClass: '',
            ngClasses: {},
            logoState: null,

            // Type of nav icon: 'back', 'menu' or 'none'
            navIconType: 'none',
            // Handle nav icon click event
            navIconCallback: false,

            // Type of title: 'logo', 'text', 'breadcrumb' or 'none'
            titleType: 'none',
            // URL to logo
            titleLogo: null,
            // Title text
            titleText: null,
            // Navigation breadcrumb [{ title, click }],
            titleBreadcrumb: null,

            // Type of actions: 'language', 'list' or 'none'
            actionsType: 'none',

            // Language options
            languages: ['en', 'ru'],

            // Search visible
            searchVisible: false,
            // Search criteria
            searchCriteria: '',
            // History for search autocomplete
            searchHistory: [],
            // Callback for search
            searchCallback: null,

            // Primary global actions visible on the screen
            primaryGlobalActions: [],
            // Primary local actions visible on the screen
            primaryLocalActions: [],

            // Secondary global actions available in popup
            secondaryGlobalActions: [],
            // Secondary local actions available in popup
            secondaryLocalActions: []
        };

        // Configure global parameters
        this.appTitleText = appTitleText;
        this.appTitleLogo = appTitleLogo;
        this.theme = theme;
        this.globalActions = globalActions;
        this.globalPrimaryActions = globalPrimaryActions;
        this.globalSecondaryActions = globalSecondaryActions;

        // Get the service instance
        this.$get = function ($rootScope) {
            return {
                config: getConfig,
                cssClass: cssClass,
                
                logoState:logoState,
                setLogoState: setLogoState,

                hideNavIcon: hideNavIcon,
                showMenuNavIcon: showMenuNavIcon,
                showBackNavIcon: showBackNavIcon,

                showAppTitleLogo: showAppTitleLogo,
                showAppTitleText: showAppTitleText,
                showTitleLogo: showTitleLogo,
                showTitleText: showTitleText,
                showTitleBreadcrumb: showTitleBreadcrumb,
                hideTitle: hideTitle,

                showLanguage: showLanguage,
                showLocalActions: showLocalActions,
                hideLocalActions: hideLocalActions,
                updateActionCount: updateActionCount,

                showSearch: showSearch,
                hideSearch: hideSearch,
                updateSearchCriteria: updateSearchCriteria,
                updateSearchHistory: updateSearchHistory,

                showShadow: showShadow,
                showShadowSm: showShadowSm,
                showShadowSmXs: showShadowSmXs,
                hideShadow: hideShadow
            };
            // ----------------------

            function setLogoState(logoState) {
                config.logoState = logoState;
                return config.logoState;
            }
            
            function logoState() {
                return config.logoState;
            }
            
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

            // Show, hide appbar shadow
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

            // Show navigation icon
            function hideNavIcon() {
                config.navIconType = 'none';
                config.navIconCallback = null;
                sendConfigEvent();
            }

            function showMenuNavIcon(click) {
                config.navIconType = 'menu';
                config.navIconCallback = click;
                sendConfigEvent();
            }

            function showBackNavIcon(click) {
                config.navIconType = 'back';
                config.navIconCallback = click;

                sendConfigEvent();
            }

            // Show title
            function hideTitle() {
                config.titleType = 'none';
                config.titleLogo = null;
                config.titleText = null;
                config.titleBreadcrumb = null;

                sendConfigEvent();
            }

            function showTitleLogo(titleLogo) {
                config.titleType = 'logo';
                config.titleLogo = titleLogo;
                config.titleText = null;
                config.titleBreadcrumb = null;

                sendConfigEvent();
            }

            function showTitleText(titleText) {
                config.titleType = 'text';
                config.titleLogo = null;
                config.titleText = titleText;
                config.titleBreadcrumb = null;

                sendConfigEvent();
            }

            function showTitleBreadcrumb(titleText, titleBreadcrumb) {
                if (_.isArray(titleText)) {
                    titleBreadcrumb = titleText;
                    titleText = titleBreadcrumb[titleBreadcrumb.length - 1].title;
                    titleBreadcrumb.splice(titleBreadcrumb.length - 1, 1);
                }
                config.titleType = 'breadcrumb';
                config.titleLogo = null;
                config.titleText = titleText;
                config.titleBreadcrumb = titleBreadcrumb;
                if (titleBreadcrumb.length > 0) {
                    config.navIconType = config.navIconType === 'none' ? 'back' : config.navIconType;
                    config.navIconCallback = titleBreadcrumb[titleBreadcrumb.length - 1];
                } else {
                    config.navIconType = 'menu';
                    config.navIconCallback = null;
                }

                sendConfigEvent();
            }

            function showAppTitleLogo() {
                showTitleLogo(config.appTitleLogo);
            }

            function showAppTitleText() {
                showTitleText(config.appTitleText);
            }

            // Show actions
            function hideLocalActions() {
                config.actionsType = 'none';
                config.primaryLocalActions = [];
                config.secondaryLocalActions = [];

                sendConfigEvent();
            }

            function showLanguage(languages) {
                config.actionsType = 'language';
                config.languages = languages || config.languages;

                sendConfigEvent();
            }

            function showLocalActions(primaryActions, secondaryActions) {
                config.actionsType = 'list';
                config.primaryLocalActions = primaryActions || [];
                config.secondaryLocalActions = secondaryActions || [];

                sendConfigEvent();
            }

            function updateActionCount(actionName, count) {
                // Update global actions
                _.each(config.primaryGlobalActions, function (action) {
                    if (action.name === actionName) {
                        action.count = count;
                    }
                });
                // Update local action
                _.each(config.primaryLocalActions, function (action) {
                    if (action.name === actionName) {
                        action.count = count;
                    }
                });
                sendConfigEvent();
            }

            // Show actions
            function showSearch(callback, criteria, history) {
                config.searchVisible = true;
                config.searchCallback = callback;
                config.searchCriteria = criteria;
                config.searchHistory = history;

                sendConfigEvent();
            }

            function hideSearch() {
                config.searchVisible = false;
                config.searchCallback = null;
                config.searchCriteria = null;

                sendConfigEvent();
            }

            function updateSearchCriteria(criteria) {
                config.searchCriteria = criteria;
                sendConfigEvent();
            }

            function updateSearchHistory(history) {
                config.searchHistory = history;
                sendConfigEvent();
            }

            function sendConfigEvent() {
                $rootScope.$broadcast('pipAppBarChanged', config);
            }
        };
        function appTitleText(newTitleText) {
            if (newTitleText) {
                config.appTitleText = newTitleText;
            }

            return config.appTitleText;
        }

        function appTitleLogo(newTitleLogo) {
            if (newTitleLogo) {
                config.appTitleLogo = newTitleLogo;
            }

            return config.appTitleLogo;
        }

        function theme(theme) {
            config.theme = theme || config.theme;

            return config.theme;
        }

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

})(window.angular, window._);
