'use strict';

describe('pipAppBar', function () {

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
//
       beforeEach(inject(function(_pipAppBar_,_$compile_, _$rootScope_, _pipTranslate_) {
           pipAppBar = _pipAppBar_;
           $compile = _$compile_;
           $rootScope = _$rootScope_;
           pipTranslate = _pipTranslate_;
       }));
//

       it('should insert the template form templateURL with the appropriate content', function (done) {
           scope = $rootScope.$new();
           element = $compile('<pip-appbar></pip-appbar>')(scope);
           scope.$digest();

           assert.equal(element.find('> md-toolbar').length, 1);

           done();
       });

       it('showLanguage', function (done) {
           var languages = ['en', 'ru'],
               useLang = 'Language';

           pipAppBar.showLanguage(languages);
           pipTranslate.use(useLang);

           scope = $rootScope.$new();
           element = $compile('<pip-appbar></pip-appbar>')(scope);
           scope.$digest();

           assert.equal(element.isolateScope().config.actionsType, 'language');
           assert.strictEqual(element.isolateScope().config.languages, languages);
           assert.include(element.find('.pip-appbar-language').text(), useLang);

           done();
       });

       it('showMenuNavIcon and hideNavIcon', function (done) {
           pipAppBar.showMenuNavIcon();

           scope = $rootScope.$new();
           element = $compile('<pip-appbar></pip-appbar>')(scope);
           scope.$digest();

           assert.equal(element.isolateScope().config.navIconType, 'menu');
           assert.equal($(element.find('.md-icon-button').children('md-icon')[0]).hasClass('ng-hide'), false);

           pipAppBar.hideNavIcon();
           element = $compile('<pip-appbar></pip-appbar>')(scope);
           scope.$digest();

           assert.equal(element.isolateScope().config.navIconType, 'none');
           assert.equal($(element.find('.md-icon-button').children('md-icon')[0]).hasClass('ng-hide'), true);

           done();
       });

       it('showBackNavIcon', function (done) {
           pipAppBar.showBackNavIcon();

           scope = $rootScope.$new();
           element = $compile('<pip-appbar></pip-appbar>')(scope);
           scope.$digest();

           assert.equal(element.isolateScope().config.navIconType, 'back');
           assert.equal($(element.find('.md-icon-button').children('md-icon')[1]).hasClass('ng-hide'), false);

           done();
       });

       it('showTitleText', function (done) {
           var title = 'Pip title';

           pipAppBar.showTitleText(title);

           scope = $rootScope.$new();
           element = $compile('<pip-appbar></pip-appbar>')(scope);
           scope.$digest();

           assert.equal(element.isolateScope().config.titleText, title);
           assert.equal(element.isolateScope().config.titleType, 'text');
           assert.equal($($(element.find('div[ng-show="config.titleType==\'text\'"]')[0]).children()[1]).text(), title);

           done();
       });

       it('showSearch and updateSearchCriteria and hideSearch', function (done) {
           var searchCriteria = 'Pip criteria';
           pipAppBar.showSearch();

           scope = $rootScope.$new();
           element = $compile('<pip-appbar></pip-appbar>')(scope);
           scope.$digest();

           assert.equal(element.isolateScope().config.searchVisible, true);
           assert.equal(element.find("button[aria-label='open search']").hasClass('ng-hide'), false);

           pipAppBar.updateSearchCriteria(searchCriteria);
           element = $compile('<pip-appbar></pip-appbar>')(scope);
           scope.$digest();
           assert.equal($($(element.find('div[ng-show="config.titleType==\'text\'"]')[0]).children()[0]).text(), searchCriteria + ' -');

           pipAppBar.hideSearch();
           element = $compile('<pip-appbar></pip-appbar>')(scope);
           scope.$digest();

           assert.equal(element.isolateScope().config.searchVisible, false);
           assert.equal(element.find("button[aria-label='open search']").hasClass('ng-hide'), true);

           done();
       });
   });

});
