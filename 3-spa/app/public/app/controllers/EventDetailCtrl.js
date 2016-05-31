/**
 *
 */
positioningApp.controller("EventDetailController", ['$routeParams', 'EventService', function($routeParams, EventService) {
  // Set the ViewModel
  var vm         = this;
  vm.name        = '';
  vm.description = '';
  vm.location    = '';
  vm.tags        = '';

  // Calling our service and get the event details
  EventService.getEvent($routeParams.id).then(function(data) {
    if (data) {
      if (data.data.event) {
        vm.name = data.data.event.name;
        vm.description = data.data.event.description;
        vm.location = data.data.event.position.address_city;
        data.data.event.tags.forEach(function(tag) {
          vm.tags += tag.name + ', ';
        });
        if (vm.tags !== '') {
          vm.tags = vm.tags.slice(0, -2);
        } else {
          vm.tags = 'This event has no tags';
        }
      }
    }
  });
}]);
