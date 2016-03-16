/**
 *
 */
positioningApp.controller("EventDetailController", ['$routeParams', 'eventService', function($routeParams, EventService) {
  'use strict';
  // Set the ViewModel
  var vm = this;

  // Calling our service
  var thePlayer = playerService.getPlayer($routeParams.id);

  // Update the ViewModel
  vm.name = thePlayer.name;
  vm.age = thePlayer.age;
}]);

// Placeholder