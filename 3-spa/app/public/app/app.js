var app = angular.module('app', ['ngRoute']);

app.constant('API_KEY', 'BF6STN_TIeaHNM4t8oiBtw');
// Url depending on enviroment.
// app.constant('BASE_URL', 'http://localhost:3000/api/v1/');
// app.constant('BASE_URL', 'https://repo-1dv450-dt222cc-1.c9users.io/api/v1/');
app.constant('BASE_URL', 'https://repo-1dv450-2-dt222cc-1.c9users.io/api/v1/');

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/app/components/home/home.html'
    }).
    when('/events', {
      templateUrl: '/app/components/event/event-list.html'
      // controller: 'EventListController',
      // controllerAs: 'events'
    }).
    when('/event/:id', {
      templateUrl: '/app/components/event/event-detail.html'
      // controller: 'EventDetailController',
      // controllerAs: 'event'
    }).
    when('/players', {
      templateUrl: '/app/components/player/player-list.html',
      controller: 'PlayerListController',
      controllerAs: 'players'
    }).
    when('/player/:id', {
      templateUrl: '/app/components/player/player-detail.html',
      controller: 'PlayerDetailController',
      controllerAs: 'player'
    }).
    when('/login', {
      templateUrl: '/app/components/login/login.html'
      // controller: 'LoginController',
      // controllerAs: 'login'
    }).
    otherwise({
      redirectTo: '/app/components/home/home.html'
    });
  $locationProvider.html5Mode(true); // This removes the hash-bang and use the Session history management >= IE10
}]);
