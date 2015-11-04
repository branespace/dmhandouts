require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');

var angular = window.angular;

var dmhandouts = angular.module('dmhandouts',
    ['ngRoute', 'base64', 'ngCookies']);

require('./users/users.js')(dmhandouts);
require('./global/global.js')(dmhandouts);
require('./router.js')(dmhandouts);
