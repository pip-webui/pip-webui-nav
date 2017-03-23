
(function (angular) {
    'use strict';

    var thisModule = angular.module('appNav.PopupSideNav', []);

    thisModule.controller('PopupSideNavController',
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
                    SET_TITLE: 'Set Title',
                    SET_SUBTITLE: 'Set Subtitle',
                    SET_IMAGE: 'Set Image',
                    RESET_TITLE: 'Reset Title',
                    RESET_SUBTITLE: 'Reset Subtitle',
                    RESET_IMAGE: 'Reset Image',
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
                    SET_TITLE: 'Задать заголовок',
                    SET_SUBTITLE: 'Задать подзаголовок',
                    SET_IMAGE: 'Задать изображение',
                    RESET_TITLE: 'Удалить заголовок',
                    RESET_SUBTITLE: 'Удалить подзаголовок',
                    RESET_IMAGE: 'Удалить картинку',
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


            $scope.media = pipMedia ? pipMedia : $mdMedia;
            $scope.title = true;
            $scope.subtitle = true;
            $scope.image = false;
            $scope.open = true;
            $scope.$mdMedia = $mdMedia;

            pipSideNav.type = "popup";
            pipSideNav.backdrop = false;
             pipSideNav.open();
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
                $scope.open = true;
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
                $scope.open = false;
                pipSideNav.close();
            };

            $scope.onToggleSideNav = function () {
                pipSideNav.toggle();
            };

            $scope.onReset = function () {
                pipNavService.reset();
            };

            $scope.onRefreshCounter = function () {
                pipNavMenu.updateCount('StickySideNav', Math.floor(Math.random() * (150 - 20) + 20));
                pipNavMenu.updateBadgeStyle('StickySideNav', 'color-warm-bg');
                pipSideNav.open();
                $scope.open = true;
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
                $scope.title = true;
                pipNavHeader.title = $scope.user.fullName;
                pipSideNav.open();
                $scope.open = true;
            };
            $scope.onSetSubtitleSideNav = function () {
                $scope.subtitle = true;
                pipNavHeader.subtitle = $scope.user.details;
                pipSideNav.open();
                $scope.open = true;
            };
            $scope.onSetImageSideNav = function () {
                $scope.image = true;
                pipNavHeader.imageUrl = $scope.user.imageUrl;
                pipSideNav.open();
                $scope.open = true;
            };
            $scope.onResetTitleSideNav = function () {
                $scope.title = false;
                pipNavHeader.title = null;
                pipSideNav.open();
                $scope.open = true;
            };
            $scope.onResetSubtitleSideNav = function () {
                $scope.subtitle = false;
                pipNavHeader.subtitle = null;
                pipSideNav.open();
                $scope.open = true;
            };
            $scope.onResetImageSideNav = function () {
                $scope.image = false;
                pipNavHeader.imageUrl = null;
                pipSideNav.open();
                $scope.open = true;
            };
            $scope.onSetClickSideNav = function () {
                pipNavHeader.click = function () {
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
                    imageUrl: 'https://what-messenger.com/uploads/posts/2015-10/1443925048_106987245_2953960_kung_fu_panda_by_juliafox90d4a031w.jpg'
                };
                pipNavHeader.show(newUser.fullName, newUser.details, newUser.imageUrl);
                pipSideNav.open();
                $scope.open = true;
            };

            $scope.onStickySideNav = function () {
                // pipSideNav.type = 'sticky';
            };
            $scope.onPopupSideNav = function () {
                // pipSideNav.type = 'popup';
            };


            $rootScope.$on('pipMainResized', onWindowResized);

        }
    )

})(window.angular);
