/**
 *
 */
positioningApp.controller("EventListController", ['EventService', '$scope', 'NgMap', function(EventService, $scope, NgMap) {
  // Using the ViewModel, primarily to store events as an array (fixes 'filter' throwing errors because of 'not array')
  var vm = this;
  vm.eventList = [];
  var searchTimeout = false; // Custom timeout

  // On visit, show latest 20 events (default limit & offset)
  EventService.getEvents().success(function(data) {
    vm.eventList = data.amount > 0 ? data.events : [];
    vm.message   = data.amount > 0 ? '(Latest 20 events)' : '(No events found)';
  }).error(function() {
    vm.eventList = [];
    vm.message   = '(Service down, try again later)';
  });

  // User may use the search bar to search for events, acts depending on selected search type
  $scope.searchEvents = function() {
    console.log($scope.searchText);
    if (!searchTimeout) { // TODO: add preloaders so the user know the process is in effect?
      searchTimeout = true; // Set to timeout/pause until request is done
      switch ($scope.radioModel.value) {
        case 'id':
          if ($scope.searchText == 'undefined') { // If input field is empty: get 'All' else 'Single'
            getEventsWithQuery();
          } else {
            getEvent();
          }
          searchTimeout = false;
          break;
        case 'query':
          getEventsWithQuery();
          break;
        case 'tag':
          console.log('work in progress: tag');
          searchTimeout = false;
          break;
        default:
          console.log('just in case..');
          searchTimeout = false;
      }
    } else {
      console.log('paused, wait until last action has finished');
    }
  };

  // Model for the radio buttons, Search Type
  $scope.radioModel = {
    value: 'id' // id (default), query, tag
  };

  // Range for select inputs limit & offset, 1 to 100
  $scope.optionsRange = range(1, 100);
  function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }

  // Get a list of resources with a query search (text exists in name, description or tags)
  function getEventsWithQuery() {
    EventService.getEventsWithQuery($scope.searchText).success(function(data) {
        onSuccess(data.events, data.amount);
      }).error(function() {
        onError();
      });
  }

  // Get single resource
  function getEvent() {
    EventService.getEvent($scope.searchText).success(function(data) {
        onSuccess([data.event]);
      }).error(function() {
        onError();
      });
  }

  // Filter events to only keep events with specific tag
  function getEventsWithTagFilter() {

  }

  // Message singular or plural
  function onSuccess(events, amount) {
    vm.eventList = events;
    vm.message   = $scope.radioModel.value !== 'id' ? '(' + amount + ' events)' : '(Event with ID ' + $scope.searchText + ' found)';
    searchTimeout   = false;
  }

  // Empty list, Message singular or plural
  function onError() {
    vm.eventList  = [];
    vm.message    = $scope.radioModel.value !== 'id' ? '(No events found)' : '(Event with the ID ' + $scope.searchText + ' was not found)';
    searchTimeout = false;
  }

  // Test
  $scope.showOnMap = function() {
    console.log('click');
  };
}]);
