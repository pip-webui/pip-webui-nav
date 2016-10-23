'use strict';

describe('pipSideNav', function () {

   describe('directive', function () {
       var
           pipSideNav,
           $rootScope,
           scope,
           element,
           pipTranslate,
           $compile;

       beforeEach(module('pipSideNav'));
       beforeEach(module('pipTranslateFilters'));
       beforeEach(module('pipDateTimeFilters'));
       beforeEach(module('pipTranslate'));
       beforeEach(module('pipSideNav.Service'));
       beforeEach(module('pipRouting'));
//
       beforeEach(inject(function(_pipSideNav_,_$compile_, _$rootScope_, _pipTranslate_) {
           pipSideNav = _pipSideNav_;
           $compile = _$compile_;
           $rootScope = _$rootScope_;
           pipTranslate = _pipTranslate_;
       }));
//

       it('should insert the template form templateURL with the appropriate content', function (done) {
           scope = $rootScope.$new();
           element = $compile('<pip-sidenav></pip-sidenav>')(scope);
           scope.$digest();

           assert.equal(element.find('> md-sidenav').length, 1);
           assert.equal(element.find('> md-sidenav').find('> md-toolbar').length, 1);

           done();
       });

       it('open', function (done) {

           scope = $rootScope.$new();
           element = $compile('<pip-sidenav></pip-sidenav>')(scope);
           scope.$digest();
           pipSideNav.open();
           scope.$digest();

           assert.equal(element.find('> md-sidenav').hasClass('md-closed'), false);

           done();
       });

       it('close', function (done) {

           scope = $rootScope.$new();
           element = $compile('<pip-sidenav></pip-sidenav>')(scope);
           scope.$digest();
           pipSideNav.open();
           scope.$digest();

           pipSideNav.close();
           scope.$digest();

           assert.equal(element.find('> md-sidenav').hasClass('md-closed'), true);

           done();
       });

       it('toggle', function (done) {

           scope = $rootScope.$new();
           element = $compile('<pip-sidenav></pip-sidenav>')(scope);
           scope.$digest();
           pipSideNav.toggle();
           scope.$digest();

           assert.equal(element.find('> md-sidenav').hasClass('md-closed'), false);

           pipSideNav.toggle();
           scope.$digest();

           assert.equal(element.find('> md-sidenav').hasClass('md-closed'), true);

           done();
       });
       
   });

});
