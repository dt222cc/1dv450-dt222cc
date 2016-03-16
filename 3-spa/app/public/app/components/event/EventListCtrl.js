/**
 *
 */
positioningApp.controller("EventListController", ['EventService', '$scope', function(eventService, $scope) {
  'use strict';
  //
  eventService.getEvents().then(function(data) {
    console.log(data);
    $scope.events = data.events;
  });
}]);
