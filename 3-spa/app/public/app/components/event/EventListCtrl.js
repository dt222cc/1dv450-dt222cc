/**
 *
 */
positioningApp.controller("EventListController", ['EventService', '$scope', function(EventService, $scope) {
  EventService.getEvents().then(function(data) {
    $scope.events = data.data.events;
  });
}]);
