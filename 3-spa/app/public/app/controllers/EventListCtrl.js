/**
 *
 */
positioningApp.controller("EventListController", ['$scope', 'NgMap', 'EventService', 'TagService', function($scope, NgMap, EventService, TagService) {
  // Using the ViewModel, primarily to store events as an array (fixes 'filter' throwing errors because of 'not array')
  var vm = this,
    searchTimeout = false; // Custom timeout
  vm.eventList = [];
  vm.tagList   = [];
  vm.message   = '';

  // On visit (init), show latest 20 events (default limit & offset),
  // also get all tags to "populate" the tag select options
  init();
  function init() {
    getAllEvents();
    getAllTags();
  }

  // Search for events depending of selected Search Type
  $scope.searchEvents = function() {
    if (!searchTimeout) { // TODO: add preloaders so the user know the process is in effect?
      searchTimeout = true; // Set to timeout/pause until request is done
      switch ($scope.radioModel.value) {
        case 'id':
        console.log($scope.searchText);
          if (isSearchTextEmpty()) {
            getAllEvents();
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

  // Determined if the ID option is selected, usage: disable fields
  $scope.isIdSearch =  function() {
    return $scope.radioModel.value == 'id';
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

  // Get all events, on error: overwrite the default error message
  function getAllEvents() {
    EventService.getEvents().success(function(data) {
      onSuccess(data.events, data.amount);
    }).error(function() {
      onError();
      vm.message = '(No events found, service down? Try again later)';
    });
  }

  // Get a list of resources with a query search (text exists in name, description or tag name)
  function getEventsWithQuery() {
    EventService.getEventsWithQuery($scope.searchText).success(function(data) {
      onSuccess(data.events, data.amount);
    }).error(function(err) {
      onError();
    });
  }

  // Get single resource, put event in an array to reuse list logic
  function getEvent() {
    EventService.getEvent($scope.searchText).success(function(data) {
      onSuccess([data.event]);
    }).error(function(err) {
      onError();
    });
  }

  // Get all resources (events) with the selected tag
  function getEventsWithTagFilter() {
    if ($scope.select) { // Check if the selected option is not the default one
      EventService.getEventsWithTagFilter($scope.select.id).success(function(data) {
        onSuccess(data.events, data.amount);
      }).error(function(err) {
        onError();
      });
    } else {
      searchTimeout = false; // Make sure to unset pause
    }
  }

  // Retrieve all available tags for search by Tag name (select-options)
  function getAllTags() {
    TagService.getTags().success(function(data) {
      vm.tagList = data.amount > 0 ? data.tags : [];
      vm.tagFirstSelectOption = vm.tagList ? 'Select tag' : 'No tags found, try again later';
    }).error(function(err) {
      vm.tagFirstSelectOption = 'No tags found, try again later';
    });
  }

  // Set eventList array and the message for user, singular or plural, reset timeout
  function onSuccess(events, amount) {
    var singularOrPlural = amount === 1 ? 'event' : 'events';
    vm.eventList = events;
    vm.message = $scope.radioModel.value === 'id'
      ? isSearchTextEmpty()
        ? '(Showing all events)'
        : '(Event with ID ' + $scope.searchText + ' found)'
      : '(' + amount + ' ' + singularOrPlural + ' found)';
    searchTimeout = false;
  }

  // Empty eventList and set the message for user, singular or plural, reset timeout
  function onError() {
    vm.eventList  = [];
    vm.message = $scope.radioModel.value === 'id'
      ? '(Event with the ID ' + $scope.searchText + ' was not found)'
      : '(No events found)';
    searchTimeout = false;
  }

  // Returns true/false
  function isSearchTextEmpty() {
    return $scope.searchText === undefined || $scope.searchText === '';
  }

  // // Postponed. Idea is to view the event on the map when you click
  // // on an event from the event "list"
  // $scope.showOnMap = function() {
  //   console.log('click');
  // };
}]);
