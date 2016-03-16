positioningApp.controller("EventListController", EventListController);

EventListController.$inject = ['EventService', '$scope'];

function EventListController(eventService, $scope) {
	console.log('inside EventListController');

  eventService.getEvents().then(function(data) {
    console.log(data);
    $scope.events = data.events;
  });
}
