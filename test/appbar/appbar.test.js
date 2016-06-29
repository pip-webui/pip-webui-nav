describe('pipAppBar', function () {
    'use strict';

    describe('directive', function () {
        var
            pipAppBar,
            $rootScope,
            scope,
            element,
            pipTranslate,
            $compile;

        beforeEach(module('pipAppBar'));
        beforeEach(module('pipTranslateFilters'));
        beforeEach(module('pipTranslate'));
        beforeEach(module('pipAppBar.Service'));
        beforeEach(module('pipState'));

        beforeEach(inject(function (_pipAppBar_, _$compile_, _$rootScope_, _pipTranslate_) {
            pipAppBar = _pipAppBar_;
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            pipTranslate = _pipTranslate_;
        }));

        it('should insert the template form templateURL with the appropriate content', function () {
            scope = $rootScope.$new();
            element = $compile('<pip-appbar></pip-appbar>')(scope);
            scope.$digest();

            expect(element.find('> md-toolbar').length).to.equal(1);
        });

        it('showLanguage', function () {
            var languages = ['en', 'ru'],
                useLang = 'Language';

            pipAppBar.showLanguage(languages);
            pipTranslate.use(useLang);

            scope = $rootScope.$new();
            element = $compile('<pip-appbar></pip-appbar>')(scope);
            scope.$digest();

            expect(element.isolateScope().config.actionsType).to.equal('language');
            expect(element.isolateScope().config.languages).to.deep.equal(languages);
            expect(element.find('.pip-appbar-language').text()).to.include(useLang);
        });

        it('showMenuNavIcon and hideNavIcon', function () {
            pipAppBar.showMenuNavIcon();

            scope = $rootScope.$new();
            element = $compile('<pip-appbar></pip-appbar>')(scope);
            scope.$digest();

            expect(element.isolateScope().config.navIconType).to.equal('menu');
            expect(element.find('.md-icon-button').children('md-icon')[0].classList.contains('ng-hide')).to.be.false;

            pipAppBar.hideNavIcon();
            element = $compile('<pip-appbar></pip-appbar>')(scope);
            scope.$digest();

            expect(element.isolateScope().config.navIconType).equal('none');
            expect(element.find('.md-icon-button').children('md-icon')[0].classList.contains('ng-hide')).to.be.true;
        });

        it('showBackNavIcon', function () {
            pipAppBar.showBackNavIcon();

            scope = $rootScope.$new();
            element = $compile('<pip-appbar></pip-appbar>')(scope);
            scope.$digest();

            expect(element.isolateScope().config.navIconType).to.equal('back');
            expect(element.find('.md-icon-button').children('md-icon')[1].classList.contains('ng-hide')).to.be.false;
        });

        it('showTitleText', function () {
            var title = 'Pip title';

            pipAppBar.showTitleText(title);

            scope = $rootScope.$new();
            element = $compile('<pip-appbar></pip-appbar>')(scope);
            scope.$digest();

            expect(element.isolateScope().config.titleText).to.equal(title);
            expect(element.isolateScope().config.titleType).to.equal('text');
            // expect($($(element.find('div[ng-show="config.titleType==\'text\'"]')[0])
            // .children()[1]).text()).to.equal(title);
        });

        it('showSearch and updateSearchCriteria and hideSearch', function () {
            var searchCriteria = 'Pip criteria';
            
            pipAppBar.showSearch();

            scope = $rootScope.$new();
            element = $compile('<pip-appbar></pip-appbar>')(scope);
            scope.$digest();

            expect(element.isolateScope().config.searchVisible).to.be.true;
            expect(element.find("button[aria-label='open search']").hasClass('ng-hide')).to.be.false;

            pipAppBar.updateSearchCriteria(searchCriteria);
            // element = $compile('<pip-appbar></pip-appbar>')(scope);
            scope.$digest();
            // assert.equal($($(element.find('div[ng-show="config.titleType==\'text\'"]')[0])
            // .children()[0]).text(), searchCriteria + ' -');

            pipAppBar.hideSearch();
            element = $compile('<pip-appbar></pip-appbar>')(scope);
            scope.$digest();

            expect(element.isolateScope().config.searchVisible).to.be.false;
            expect(element.find("button[aria-label='open search']").hasClass('ng-hide')).to.be.true;
        });
    });

});
