/**
 *
 */
positioningApp.controller("EventListController", ['$scope', 'NgMap', 'EventService', 'TagService', function($scope, NgMap, EventService, TagService) {
  // Using the ViewModel, primarily to store events as an array (fixes 'filter' throwing errors because of 'not array')
  var vm = this;
  vm.eventList = [];
  vm.tagList = [];
  vm.message = '';
  var searchTimeout = false; // Custom timeout

  // On visit (init), show latest 20 events (default limit & offset)
  EventService.getEvents().success(function(data) {
    vm.eventList = data.amount > 0 ? data.events : [];
    vm.message   = data.amount > 0 ? '(Latest 20 events)' : '(No events found)';
  }).error(function() {
    vm.eventList = [];
    vm.message   = '(Service down, try again later)';
  });

  // Also retrieve all tags for the select field
  TagService.getTags().success(function(data) {
    vm.tagList = data.amount > 0 ? data.tags : [];
    if (!vm.tagList) {
      console.log(data);
    } else {
      vm.tagFirstSelectOption = 'Select tag';
    }
  }).error(function(err) {
    vm.tagFirstSelectOption = 'No tags found, try again later';
    console.log(err);
  });

  // Search for events depending of selected Search Type
  $scope.searchEvents = function() {
    if (!searchTimeout) { // TODO: add preloaders so the user know the process is in effect?
      searchTimeout = true; // Set to timeout/pause until request is done
      switch ($scope.radioModel.value) {
        case 'id':
          if ($scope.searchText == 'undefined') { // If input field is empty: get 'All' else 'Single'
            getEventsWithQuery();
          } else {
            getEvent();
          }
          break;
        case 'query':
          getEventsWithQuery();
          break;
        case 'tag':
          getEventsWithTagFilter();
          break;
        default:
          console.log('just in case something odd happens..');
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

  // Determined if the tag option is selected, usage: disable fields
  $scope.isTagSearch =  function() {
    return $scope.radioModel.value == 'tag';
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

  // Get a list of resources with a query search (text exists in name, description or tag name)
  function getEventsWithQuery() {
    EventService.getEventsWithQuery($scope.searchText).success(function(data) {
      onSuccess(data.events, data.amount);
    }).error(function(err) {
      onError();
    });
  }

  // Get single resource
  function getEvent() {
    EventService.getEvent($scope.searchText).success(function(data) {
      onSuccess([data.event]);
    }).error(function(err) {
      onError();
    });
  }

  // Get all resources with the selected tag
  function getEventsWithTagFilter() {
    if ($scope.select) { // Check if the selected option is not the default one (is null)
      EventService.getEventsWithTagFilter($scope.select.id).success(function(data) {
        onSuccess(data.events);
      }).error(function(err) {
        onError();
      });
    }
  }

  // Set eventList array and the message for user, singular or plural, reset timeout
  function onSuccess(events, amount) {
    vm.eventList  = events;
    vm.message    = $scope.radioModel.value !== 'id' ? '(' + amount + ' events)' : '(Event with ID ' + $scope.searchText + ' found)';
    searchTimeout = false;
  }

  // Empty eventList and set the message for user, singular or plural, reset timeout
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
