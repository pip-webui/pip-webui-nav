'use strict';

suite('pipSideNav', function () {

   suite('directive', function () {
       var
           pipSideNav,
           $rootScope,
           scope,
           element,
           pipTranslate,
           $compile;

       setup(module('pipSideNav'));
       setup(module('pipTranslateFilters'));
       setup(module('pipDateTimeFilters'));
       setup(module('pipTranslate'));
       setup(module('pipSideNav.Service'));
       setup(module('pipState'));
//
       setup(inject(function(_pipSideNav_,_$compile_, _$rootScope_, _pipTranslate_) {
           pipSideNav = _pipSideNav_;
           $compile = _$compile_;
           $rootScope = _$rootScope_;
           pipTranslate = _pipTranslate_;
       }));
//

       test('should insert the template form templateURL with the appropriate content', function (done) {
           scope = $rootScope.$new();
           element = $compile('<pip-sidenav></pip-sidenav>')(scope);
           scope.$digest();

           assert.equal(element.find('> md-sidenav').length, 1);
           assert.equal(element.find('> md-sidenav').find('> md-toolbar').length, 1);

           done();
       });

       test('open', function (done) {

           scope = $rootScope.$new();
           element = $compile('<pip-sidenav></pip-sidenav>')(scope);
           scope.$digest();
           pipSideNav.open();
           scope.$digest();

           assert.equal(element.find('> md-sidenav').hasClass('md-closed'), false);

           done();
       });

       test('close', function (done) {

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

       test('toggle', function (done) {

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
