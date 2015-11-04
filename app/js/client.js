require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');

var angular = window.angular;

var dmhandouts = angular.module('dmhandouts',
    ['ngRoute', 'base64', 'ngCookies']);

require('./services/services')(dmhandouts);
require('./users/users')(dmhandouts);
require('./adventures/adventures')(dmhandouts);
require('./global/global')(dmhandouts);
require('./router')(dmhandouts);
