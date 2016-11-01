'use strict';

angular.module('pipActions', ['ngMaterial', 'pipNav.Templates', 'ui.router']);

import './ActionsService';
import './PrimaryActionsDirective';
import './SecondaryActionsDirective';

export * from './ActionsService';