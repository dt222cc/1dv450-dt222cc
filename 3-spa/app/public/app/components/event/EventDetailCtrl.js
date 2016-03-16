// register the controller in the module (see ng-app in index.html)
positioningApp.controller("EventDetailController", EventDetailController);

// Dependency injections, routeParams give us the /:id
EventDetailController.$inject = ['$routeParams', 'eventService'];

function EventDetailController($routeParams, EventService) {
  console.log("inside EventDetailController");

  // Set the ViewModel
  var vm = this;

  // Calling our service
  var thePlayer = playerService.getPlayer($routeParams.id);

  // Update the ViewModel
  vm.name = thePlayer.name;
  vm.age = thePlayer.age;
}
