angular
  .module("app", ['ngRoute']) // you must inject the ngRoute (included as a separate js-file)
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
          templateUrl: '/app/components/home/homeView.html'
        }).
        when('/events', {
          templateUrl: '/app/components/event/eventsView.html'
          // controller: 'PlayerListController',
          // controllerAs: 'events' // players could be seen as an instance of the controller, use it in the view!
        }).
        when('/tags', {
          templateUrl: '/app/components/tag/tagsView.html'
          // controller: 'PlayerListController',
          // controllerAs: 'tags' // players could be seen as an instance of the controller, use it in the view!
        }).
        when('/players', {
          templateUrl: '/app/components/player/player-list.html',
          controller: 'PlayerListController',
          controllerAs: 'players' // players could be seen as an instance of the controller, use it in the view!
        }).
        when('/player/:id', {
          templateUrl: '/app/components/player/player-detail.html',
          controller: 'PlayerDetailController',
          controllerAs: 'player'
        }).
        when('/login', {
          templateUrl: '/app/components/login/loginView.html'
          // controller: 'PlayerDetailController',
          // controllerAs: 'player'
        }).
        otherwise({
          redirectTo: '/app/components/home/homeView.html'
        });
      $locationProvider.html5Mode(true); // This removes the hash-bang and use the Session history management >= IE10
    }]);
