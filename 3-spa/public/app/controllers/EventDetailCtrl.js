/**
 *
 */
positioningApp.controller("EventDetailController", ['$scope', '$routeParams', 'EventService',
  function($scope, $routeParams, EventService) {

  var vm         = this;
  vm.name        = '';
  vm.description = '';
  vm.location    = '';
  vm.tags        = '';
  vm.creator     = undefined;

  // Calling our service and get the event details
  EventService.getEvent($routeParams.id).then(function(data) {
    if (data) {
      if (data.data.event) {
        var event = data.data.event;
        vm.name = event.name;
        vm.description = event.description;
        vm.location = event.position.address_city;
        vm.creator = event.creator;

        event.tags.forEach(function(tag) {
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

  /**
   * ng-show (view)
   * @return {Boolean} [show, if owner]
   */
  $scope.isOwner = function() {
    if (vm.creator === undefined) { // Async
      return false;
    } else {
      return vm.creator.email === JSON.parse(sessionStorage.currentUser).creator.email;
    }
  };

  $scope.editRoute   = '/event/' + $routeParams.id + '/edit';
  $scope.deleteRoute = '/event/' + $routeParams.id + '/delete';
}]);
