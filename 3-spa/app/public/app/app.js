'use strict';

var positioningApp = angular.module('positioningApp', ['ngRoute', 'ngMap']);

// Declare constants
positioningApp.constant('API_CONSTANT', {
  'key': 'BF6STN_TIeaHNM4t8oiBtw', // Bad practice!? Key on client.
  'url': 'http://repo-1dv450-dt222cc.c9users.io/api/v1/', // Replace with URL of API
  'format': 'application/json'
});

positioningApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/app/views/event-list.html',
      controller: 'EventListController as events'}).
    when('/event/:id', {
      templateUrl: '/app/views/event-detail.html',
      controller: 'EventDetailController as event'}).
    when('/add_event', {
      templateUrl: '/app/views/event-add.html',
      controller: 'EventAddController as add_event'}).
    when('/login', {
      templateUrl: '/app/views/login.html',
      controller: 'LoginController as login'}).
    when('/logout', {
      controller: 'LogoutController as logout'}).
    otherwise({ redirectTo: '/' });
  $locationProvider.html5Mode(true); // This removes the hash-bang and use the Session history management >= IE10
}]);
