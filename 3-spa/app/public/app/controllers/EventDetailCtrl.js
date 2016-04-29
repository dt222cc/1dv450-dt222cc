/**
 *
 */
positioningApp.controller("EventDetailController", ['$routeParams', 'EventService', function($routeParams, EventService) {
  // Set the ViewModel
  var vm = this;

  // Calling our service
  EventService.getEvent($routeParams.id).then(function(data) {
    if (data) {
      if (data.data.event) {
        vm.name = data.data.event.name;
        vm.description = data.data.event.description;
      } else {
        console.log('bummer, really: ' + data);
      }
    } else {
      console.log('bummer: ' + data);
    }
  });
}]);
