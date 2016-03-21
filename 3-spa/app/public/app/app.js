'use strict';

var positioningApp = angular.module('positioningApp', ['ngRoute', 'ngMap']);

positioningApp.constant('API_CONSTANT', {
  'key': 'BF6STN_TIeaHNM4t8oiBtw', // Bad practice!? Key on client.
  'url': 'http://repo-1dv450-dt222cc.c9users.io/api/v1/',
  // 'url': 'http://localhost:3000/api/v1/',
  'format': 'application/json'
});

positioningApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/app/components/event/event-list.html',
      controller: 'EventListController as events'}).
    when('/event/:id', {
      templateUrl: '/app/components/event/event-detail.html',
      controller: 'EventDetailController as event'}).
    when('/players', {
      templateUrl: '/app/components/player/player-list.html',
      controller: 'PlayerListController as players'}).
    when('/player/:id', {
      templateUrl: '/app/components/player/player-detail.html',
      controller: 'PlayerDetailController as player'}).
    when('/login', {
      templateUrl: '/app/components/login/login.html',
      controller: 'LoginController as login'}).
    otherwise({ redirectTo: '/' }); // Declare constants
  $locationProvider.html5Mode(true); // This removes the hash-bang and use the Session history management >= IE10
}]);
