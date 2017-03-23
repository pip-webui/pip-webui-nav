
(function (angular) {
    'use strict';

    var thisModule = angular.module('appNav.StickySideNav', []);

    thisModule.controller('StickySideNavController',
        function ($scope, $rootScope, pipSideNav, $mdTheming, $timeout, $mdMedia,
            $injector, pipNavHeader, pipNavMenu, pipNavService, pipNavIcon) {

            var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
            if (pipTranslate && pipTranslate.setTranslations) {
                // Set translation strings for the module
                pipTranslate.setTranslations('en', {
                    SAMPLE: 'sample',
                    CODE_TO_CONFIGURE_AND_DISPLAY: 'Code sample to configure and display Side Nav',
                    OPEN: 'Open',
                    CODE: 'Code',
                    CLOSE: 'Close',
                    TOGGLE: 'Toggle',
                    SET_TITLE : 'Set Title',
                    SET_SUBTITLE : 'Set Subtitle',
                    SET_IMAGE : 'Set Image',
                    RESET_TITLE : 'Reset Title',
                    RESET_SUBTITLE : 'Reset Subtitle',
                    RESET_IMAGE : 'Reset Image',
                    SET_CLICK: 'Set Click by Image',
                    RESET_CLICK: 'Reset Click by Image',
                    REFRESH_COUNTER: 'Refresh Counter',
                    SIDENAV_NEW_HEADER: 'Refresh Sidenav Header'
                });

                pipTranslate.setTranslations('ru', {
                    SAMPLE: 'пример',
                    CODE_TO_CONFIGURE_AND_DISPLAY: 'Пример кода для конфигурации и отображения Side Nav',
                    OPEN: 'Открыть',
                    CODE: 'Код',
                    CLOSE: 'Закрыть',
                    TOGGLE: 'Переключить',
                    SET_TITLE : 'Задать заголовок',
                    SET_SUBTITLE : 'Задать подзаголовок',
                    SET_IMAGE : 'Задать изображение',
                    RESET_TITLE : 'Удалить заголовок',
                    RESET_SUBTITLE : 'Удалить подзаголовок',
                    RESET_IMAGE : 'Удалить картинку',
                    SET_CLICK: 'Дбавить обработчик клика',
                    RESET_CLICK: 'Удалить обработчик клика',
                    REFRESH_COUNTER: 'Обновить счетчики',
                    SIDENAV_NEW_HEADER: 'Обновить Заголовок'                    
                });
            }

            $scope.user = {
                fullName: 'Kate Negrienko',
                details: 'details',
                imageUrl: 'https://www.american.edu/uploads/profiles/large/kate_resnick_avatar_3001.jpg'
            };

            pipSideNav.type = "sticky";
            $scope.media = pipMedia ? pipMedia : $mdMedia;
            $scope.$mdMedia = $mdMedia;
        
            $scope.open = true;
            onWindowResized();

            $timeout(function () {
                $('pre code').each(function (i, block) {
                    Prism.highlightElement(block);
                });
            });

            $scope.onLanguageClick = function (language) {
                pipTranslate.use(language);
            };

            $scope.$on('pipSideNavLinkClicked', function (event, link) {
                console.log('Link ' + link + ' Clicked');// eslint-disable-line
            });

            $scope.onOpenSideNav = function () {
                pipSideNav.open();
            };

            $scope.onSideNavShow = function () {
                $scope.open = true;
                pipSideNav.show();
            };

            $scope.onSideNavHide = function () {
                    $scope.open = false;
                pipSideNav.hide();
            };

            $scope.onCloseSideNav = function () {
                pipSideNav.close();
                    $scope.open = false;
            };

            $scope.onToggleSideNav = function () {
                pipSideNav.toggle();
            };

            $scope.onReset = function () {
                pipNavService.reset();
            };

            $scope.onRefreshCounter = function () {
                console.log('onRefreshCounter');
                pipNavMenu.updateCount('StickySideNav', Math.floor(Math.random() * (150 - 20) + 20));
                pipNavMenu.updateBadgeStyle('StickySideNav', 'color-warm-bg');
            };

            function showIcon() {
                if ($scope.media('gt-sm')) {
                    pipNavIcon.showIcon('icons:bags');
                } else {
                    pipNavIcon.showMenu();
                }
            }

            function onWindowResized() {
                var mainWidth = $('.pip-main').innerWidth(),
                    elementWidth = $('.pip-sticky-sidenav').innerWidth(),
                    resultSize;
                $scope.sizeLabel = 'Main region size: ' + mainWidth + '. SideNav size: ' + elementWidth;// + 'Size after change: '
                showIcon();
            }

            $scope.onSetTitleSideNav = function () {
                pipNavHeader.title = $scope.user.fullName;
            };
            $scope.onSetSubtitleSideNav = function () {
                pipNavHeader.subtitle = $scope.user.details;
            };
            $scope.onSetImageSideNav = function () {
                pipNavHeader.imageUrl = $scope.user.imageUrl;
            };
            $scope.onResetTitleSideNav = function () {
                pipNavHeader.title = null;
            };
            $scope.onResetSubtitleSideNav = function () {
                pipNavHeader.subtitle = null;
            };
            $scope.onResetImageSideNav = function () {
                pipNavHeader.imageUrl = null;
            };
            $scope.onSetClickSideNav = function () {
                pipNavHeader.click = function() {
                    console.log('onClick sidenav image');
                };
            };
            $scope.onResetClickSideNav = function () {
                pipNavHeader.click = null;
            };

            $scope.onShowNewHeader = function () {
                var newUser = {
                    fullName: 'Fedor Fedotov',
                    details: 'details Fedor',
                    imageUrl: 'https://leaders.com.ua/images/temp/rJM6HQsLT6bGC8i.png'
                };
               pipNavHeader.show(newUser.fullName, newUser.details, newUser.imageUrl);
            };

            $scope.onStickySideNav = function () {
                // pipSideNav.type = 'sticky';
            };
            $scope.onPopupSideNav = function () {
                // pipSideNav.type = 'popup';
            };


            $rootScope.$on('pipMainResized', onWindowResized);

        }
    );

})(window.angular);
