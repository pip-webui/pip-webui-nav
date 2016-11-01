'use strict';

let jsdom = require('jsdom').jsdom;

// Mimic browser DOM
global['document'] = jsdom('<html><head><script></script></head><body></body></html>');
global['window'] = global['document'].defaultView;
global['navigator'] = global['window'].navigator = {};
global['navigator'].userAgent = 'Node.js JsDom';
global['navigator'].appVersion = '';
global['Node'] = global['window'].Node;

// We must have that for mock.inject
global['window'].mocha = {};
global['window'].beforeEach = beforeEach;
global['window'].afterEach = afterEach;

// Load jquery
export let $ = require("jquery");
global['jQuery'] = $; 
global['$'] = $; 

// Load angular
require('angular/angular');
require('angular-aria');
require('angular-mocks');

// Override mocks
global['angular'] = global['window'].angular;
global['ngInject'] = global['angular'].mock.inject;
global['ngModule'] = global['angular'].mock.module;

export let angular: ng.IAngularStatic = global['window'].angular;
export let ngMock: any = global['angular'].mock;
export let ngInject: (any) => void = ngMock.inject;
export let ngModule: (name: string, requires?: string[], configFn?: Function) => ng.IModule = ngMock.module;

// Load angular material
require('angular-material');

// Load lodash
export let _ = require('lodash');
global['_'] = _;
global['window']._ = _;

// Load async
export let async = require('async');
global['async'] = async;
global['window'].async = async;