/**
 *
 */
positioningApp.controller("EventListController", ['EventService', '$scope', 'NgMap', '$timeout', function(EventService, $scope, NgMap, $timeout) {
  var vm = this;
  vm.eventList = [];
  vm.timeout = false;

  // On visit, show latest 20 events
  EventService.getEvents().success(function(data) {
    vm.eventList = data.amount > 0 ? data.events : [];
    vm.message   = data.amount > 0 ? '(Latest 20 events)' : '(No events found)';
  }).error(function() {
    vm.eventList = [];
    vm.message   = '(Service down, try again later)';
  });

  // User may use the search bar to get other events, uses query search by default
  // TODO: Perhaps only use query search if user "wants" to, add checkbox or something
  $scope.searchEvents = function() {
    if (!vm.timeout) { // TODO: add preloaders so the user know the process is in effect?
      console.log('search events');
      vm.timeout = true; // Set to timeout/pause until request is done
      EventService.getEventsWithQuery($scope.searchText).success(function(data) {
        vm.eventList = data.amount > 0 ? data.events : [];
        vm.message   = data.amount > 0 ? '(' + data.amount + ' events)' : '(No events found)';
        vm.timeout   = false;
      }).error(function() {
        vm.message   = '(No events found)';
        vm.timeout   = false;
      });
    } else {
      console.log('paused, wait until last action has finished');
    }
  };

  // Test
  $scope.showOnMap = function() {
    console.log('click');
  };
}]);
