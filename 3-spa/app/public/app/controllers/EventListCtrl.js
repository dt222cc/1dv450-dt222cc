/**
 *
 */
positioningApp.controller("EventListController", ['$scope', 'NgMap', 'EventService', 'TagService', '$filter',
  function($scope, NgMap, EventService, TagService, $filter) {
  // Using the ViewModel(vm), primarily to store objects as arrays which
  // fixes the angular 'filter' functionality which throws errors if I use $scope, because of 'not array')
  var vm = this;
  var searchTimeout = false; // Custom timeout
  vm.eventList = [];
  vm.tagList   = [];
  vm.message   = '';

  $scope.mapBox = { center: [56.56, 15.5], zoom: 8 }; // Default/intitial map view
  $scope.radioModel = { value: 'id' };                // Model for the radio buttons, Search Types: id (default), query & tag
  $scope.optionsRange = range(1, 100);                //Range for select inputs limit & offset, 1 to 100

  /**
   * Search for events depending of selected Search Type: id, query or tags.
   * Empty ID equals to ALL events
   */
  $scope.searchEvents = function() {
    if (!searchTimeout) {
      searchTimeout = true; // Set to timeout/pause until request is done
      switch ($scope.radioModel.value) {
        case 'id':
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
          searchTimeout = false;
      }
    }
  };

  /**
   * Determined if the tag/ID option is selected, usage: disable fields
   * @return {Boolean}
   */
  $scope.isTagSearch =  function() {
    return $scope.radioModel.value == 'tag';
  };
  $scope.isIdSearch =  function() {
    return $scope.radioModel.value == 'id';
  };

  /**
   * Show the event on the map. Center, zoom, open info window(map only)
   * @param  {[type]} event [description]
   * @param  {[type]} e     [The actual event]
   */
  $scope.showOnMap = function(event, e) {
    // New position and zoom
    $scope.mapBox = {
      center: [e.position.latitude, e.position.longitude],
      zoom: 15,
    };

    // The selected marker's position and events
    $scope.selectedMarker = {
      position: e.position,
      events: [] // Initialize here, next step is to populate this position's events
    };

    // Filter events to only show the events associated with selected address
    vm.eventList.forEach(function(event) {
      if (event.position.address_city === e.position.address_city) { // If found
        $scope.selectedMarker.events.push(event); // Populate the marker's events
      }
    });

    // Alter display of tags
    $scope.infoWindowTags = 'Has no tags';
    if (e.tags.length > 0) {
      e.tags.forEach(function(tag) {
        $scope.infoWindowTags += tag.name + ', ';
      });
      $scope.infoWindowTags = $scope.infoWindowTags.slice(0, -2);
    }

    $scope.map.showInfoWindow('eventInfo', this); // Open/show the Info Window
  };

  /* Get all events */
  function getAllEvents() {
    EventService.getEvents().success(function(data) {
      onSuccess(data.events, data.amount);
    }).error(function() {
      onError();
      vm.message = '(No events found, service down? Try again later)';
    });
  }

  /* Get a list of resources with a query search (text exists in name, description or tag name) */
  function getEventsWithQuery(query) {
    query = query ? query : $scope.searchText;
    EventService.getEventsWithQuery(query).success(function(data) {
      onSuccess(data.events, data.amount);
    }).error(function(err) {
      onError();
    });
  }

  /* Get single resource, put event in an array to reuse list logic */
  function getEvent() {
    EventService.getEvent($scope.searchText).success(function(data) {
      onSuccess([data.event]);
    }).error(function(err) {
      onError();
    });
  }

  /* Get all resources (events) with the selected tag */
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

  /* Retrieve all available tags for search by Tag name (select-options) */
  function getAllTags() {
    TagService.getTags().success(function(data) {
      vm.tagList = data.amount > 0 ? data.tags : [];
      vm.tagFirstSelectOption = vm.tagList ? 'Select tag' : 'No tags found, try again later';
    }).error(function(err) {
      vm.tagFirstSelectOption = 'No tags found, try again later';
    });
  }

  /**
   * Set eventList array and the message for user, singular or plural,
   * @param  {Array}   events [Events from the API]
   * @param  {Integer} amount [The amount of events, to handle singlur/plural text]
   */
  function onSuccess(events, amount) {
    var singularOrPlural = amount === 1 ? 'event' : 'events';
    vm.eventList = events;
    vm.message = $scope.radioModel.value === 'id'
      ? isSearchTextEmpty()
        ? '(Showing all events)'
        : '(Event with ID ' + $scope.searchText + ' found)'
      : '(' + amount + ' ' + singularOrPlural + ' found)';
    searchTimeout = false; // Clear timeout
  }

  /* Empty eventList and set the message for user, singular or plural, reset timeout */
  function onError() {
    vm.eventList  = [];
    vm.message = $scope.radioModel.value === 'id'
      ? '(Event with the ID ' + $scope.searchText + ' was not found)'
      : '(No events found)';
    searchTimeout = false;
  }

  /**
   * Returns true/false
   * @return {Boolean} [description]
   */
  function isSearchTextEmpty() {
    return $scope.searchText === undefined || $scope.searchText === '';
  }

  /**
   * Function which populates an array with numbers
   * @param  {Integer} start [Starting number]
   * @param  {Integer} end   [Ending number]
   * @return {Array}         [An array with an range]
   */
  function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }

  /*
   * On visit (init), show latest 20 events (default limit & offset),
   * also get all tags to "populate" the tag select options
   */
  function init() {
    getAllEvents();
    getAllTags();
  }

  init(); // Go go
}]);
