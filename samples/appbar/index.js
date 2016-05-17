/* global angular */

(function() {	

	var thisModule = angular.module('app', ['pipAppBar', 'pipCore', 'ngMaterial']);

    thisModule.config(function($mdIconProvider, pipAppBarProvider, pipTranslateProvider) {
        $mdIconProvider.iconSet('icons', '../images/icons.svg', 512);

        pipTranslateProvider.translations('en', {
            TITLE: 'Title',
            THEME: 'Theme',
            TITLE_LOCAL_ACTION: 'Title of first primary action'
        });
        pipTranslateProvider.translations('ru', {
            TITLE: 'Заголовок',
            THEME: 'Тема',
            TITLE_LOCAL_ACTION: 'Заголовок первого основного действия'
        });

        pipAppBarProvider.globalActions(
            [
                { 
                    name: 'sample.notifications', tooltip: 'Notifications', 
                    event: 'pipNotificationsClicked', count: 0, 
                    icon: 'icons:bell' 
                }
            ],
            [
                { name: 'sample.settings', title: 'Settings' },
                { name: 'sample.signout', title: 'Signout' }
            ]
        );
    });

    thisModule.controller('appController', function ($scope, $mdDialog, $rootScope, pipAppBar, $mdTheming) {
        $rootScope.$party = {
            id: '55f26dda4b0c570c4b1f1313',
            name: 'Sergey Seroukhov'
        };

        $rootScope.$user = {
            id: '55f26dda4b0c570c4b1f1313',
            name: 'Sergey Seroukhov',
            owner: true,
            theme: $rootScope.$theme
        };

        $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));

        $scope.localActions = [
            [
                { name: 'sample.send', tooltip: 'Send Message', icon: 'icons:send', menu: true,
                    subActions: [{ name: 'sample.sendSomeone', title: 'Send someone' }, { name: 'sample.sendToAll', title: 'Send to All' }] },
                { name: 'sample.discard', tooltip: 'Discard Message', icon: 'icons:trash', hideSmall: true }
            ],
            [
                { name: 'sample.send', title: 'Send Message', close:true , event: 'pipGuidesClicked' },
                { name: 'sample.discard', title: 'Discard Message' },
                { divider: true },
                { name: 'configure', title: 'Configure...', href: 'http://www.google.com' }
            ]
        ];

        $scope.title = 'TITLE';
        $scope.notificationCount = 2;
        $scope.searchCriteria = 'XXX';

        $scope.$on('pipGuidesClicked', function (event) {
            $mdDialog.show(
                $mdDialog.alert()
                    .targetEvent(event)
                    .clickOutsideToClose(true)
                    .parent('body')
                    .title('Suddenly, a redial')
                    .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
                    .ok('That was easy')
            );
        });

        $scope.$on('pipAppBarNavIconClicked', function (event) {
            console.log('Nav Icon Clicked');
        });

        $scope.$on('pipAppBarSearchClicked', function (event, search) {
            console.log('Search Clicked: ' + search);
            $scope.searchCriteria = search;
            pipAppBar.updateSearchCriteria($scope.searchCriteria);
        });

        $scope.$on('pipAppBarActionClicked', function (event, action) {
            console.log('Action ' + action + ' Clicked');
        });

        $scope.onHideNavIcon = function() {
            pipAppBar.hideNavIcon();  
        };
        
        $scope.onShowMenuNavIcon = function() {
            pipAppBar.showMenuNavIcon();  
        };

        $scope.onShowBackNavIcon = function() {
            pipAppBar.showBackNavIcon();  
        };

        $scope.onShowTitleLogo = function () {
            pipAppBar.showTitleLogo('piplife_logo.svg');
        };

        $scope.onShowTitleText = function () {
            pipAppBar.showTitleText($scope.title);
        };

        $scope.onShowTitleBreadcrumb = function () {
            pipAppBar.showTitleBreadcrumb([
                { title: 'Header' },
                { title: 'SubHeader' },
                { title: $scope.title }
            ]);
        };

        $scope.onHideSearch = function () {
            pipAppBar.hideSearch();
        };

        $scope.onShowSearch = function () {
            pipAppBar.showSearch();
        };

        $scope.onUpdateSearch = function () {
            pipAppBar.updateSearchCriteria($scope.searchCriteria);
        };

        $scope.onHideActions = function () {
            pipAppBar.hideLocalActions();
            $scope.disableOfActionTitleEditing = true;
        };

        $scope.onShowLanguage = function () {
            pipAppBar.showLanguage(['en', 'ru']);
        };

        $scope.onShowShadow = function () {
            pipAppBar.showShadow();
        };

        $scope.onShowShadowSm = function () {
            pipAppBar.showShadowSm();
        };

        $scope.onHideShadow = function () {
            pipAppBar.hideShadow();
        };

        //$scope.updateTheme = _.debounce(updateTheme, 2000);

        $scope.onShowActions = function () {
            pipAppBar.showLocalActions(
                [
                    { name: 'sample.send', tooltip: 'Send Message', icon: 'icons:send', menu: true,
                        subActions: [{ name: 'sample.sendSomeone', title: 'Send someone' }, { name: 'sample.sendToAll', title: 'Send to All' }] },
                    { name: 'sample.discard', tooltip: 'Discard Message', icon: 'icons:trash', hideSmall: true },
                    { name: 'sample.discard2', tooltip: 'Discard2 Message', icon: 'icons:bug', showSmall: true }
                ],
                [
                    { name: 'sample.send', title: 'Send Message1' , close: true },
                    { name: 'sample.discard', title: 'Discard Message' },
                    { divider: true },
                    { name: 'configure', title: 'Configure...', href: 'http://www.google.com' }
                ]
            );
            
            pipAppBar.updateActionCount('sample.notifications', $scope.notificationCount);           
        };

        $scope.searchEnabled = true;
    });

})();