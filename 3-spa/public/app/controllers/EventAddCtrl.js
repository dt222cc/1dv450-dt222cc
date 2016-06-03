/**
 *
 */
positioningApp.controller("EventAddController", ['$scope', '$location', 'EventService', 'TagService', 'NgMap',
function($scope, $location, EventService, TagService, NgMap) {
  // Redirect to login page if not logged in
  if (sessionStorage.currentUser === undefined) {
    $location.path('/login');
  }

  var vm = this;
  vm.eventTags = [];

  var addressCity;
  var lastLocationSearch = { formatted_address: '' };
  var markers = [];
  var geocoder = new google.maps.Geocoder();

  $scope.mapBox = { center: [56.56, 15.5], zoom: 8 }; // Default/intitial map view

  /* Get all tags from API to populate the list of existing tags */
  TagService.getTags().success(function(data) {
    vm.tagList = data.amount > 0 ? data.tags : [];
    vm.tagFirstSelectOption = vm.tagList ? 'Select existing tag to add' : 'No existing tags to add';
  }).error(function(err) {
    vm.tagFirstSelectOption = 'No existing tags to add';
  });

  /* Keep submit button disabled if not completed */
  $scope.isFormCompleted = function() {
    return (isNotEmpty() && isValidLocation());

    function isNotEmpty() {
      return $scope.eventName !== undefined &&
        $scope.eventDescription !== undefined &&
        $scope.eventAddress !== undefined &&
        $scope.eventName !== '' &&
        $scope.eventDescription !== '' &&
        $scope.eventAddress.undefined !== '';
    }

    function isValidLocation() {
      return lastLocationSearch.formatted_address !== '';
    }
  };

  /* Get location from the input (geocoding, marker, infowindow, new center and zoom) */
  $scope.showLocation = function() {
    if ($scope.eventAddress.length > 1) {
      // Geocode the location, uses callback
      geocodeLocation($scope.eventAddress, function(location) {
        if (location !== undefined) {
          addMarker(location);
          $scope.map.setCenter(location.geometry.location);
          $scope.map.setZoom(15);
        }
      });
    }
  };

  /* Check and add an "existing" tag to the event */
  $scope.addExistingTag = function() {
    if ($scope.existingTags) {
      var found = vm.eventTags.some(function(el) {
        return el.name === $scope.existingTags.name;
      });
      if (!found) { vm.eventTags.push($scope.existingTags); }
    }
  };

  /* Check and add an "new" tag to the event */
  $scope.addNewTag = function() {
    if ($scope.newTag) {
      var found = vm.eventTags.some(function(el) {
        return el.name === $scope.newTag;
      });
      if (!found) { vm.eventTags.push({ name: $scope.newTag }); }
    }
  };

  /* Remove tag from list */
  $scope.removeTag = function(index) {
    vm.eventTags.splice(index, 1);
  };

  /* On submit, compile into an event object ... */
  $scope.submit = function() {
    // Formatting tags
    var formattedTagList = [];
    vm.eventTags.forEach(function(tag) {
      formattedTagList.push({ name: tag.name });
    });

    // Format event object
    var event = {
      name: $scope.eventName,
      description: $scope.eventDescription,
      position: {
        address_city: lastLocationSearch.formatted_address
      },
      tags: formattedTagList
    };

    var token = JSON.parse(sessionStorage.currentUser).token;

    EventService.addEvent({event: event}, token).success(function(data) {
      $location.path('/');
      // Needs confirmation of event creation, flash message
    }).error(function(err, status) {
      // Needs more testing and error message handling
      console.log('Failed to create the event.');
      console.log(err);
      console.log(status);
    });
  };

  /**
   * Open infoWindow on marker click
   * @param  {[type]} event [description]
   * @param  {[type]} l     [the marker location]
   */
  $scope.showMarker = function(event, l) {
    $scope.map.showInfoWindow('locationInfo', this);
  };

  /**
   * Get a location object from geocoding / reverse geocoding
   * @param  {Object}   location [description]
   * @param  {Function} callback [description]
   */
  function geocodeLocation(location, callback) {
    if (location !== lastLocationSearch.formatted_address) { // Only do a search if not same as before
      if (geocoder) {
        geocoder.geocode({ 'address': location }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
              // This will set the input text as the chosen address
              $scope.eventAddress = results[0].formatted_address;
              lastLocationSearch = results[0]; // Keep check of location to check if "valid"
              callback(results[0]);
            } else {
              console.log('No results found');
              callback(null);
            }
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
            callback(null);
          }
        });
      }
    }
  }

  /**
   * Add marker
   * @param {Object} location [description]
   */
  function addMarker(location) {
    $scope.currentMarker = {
      address: location.formatted_address,
      lat: location.geometry.location.lat(),
      lng: location.geometry.location.lng()
    };

    $scope.locations = [$scope.currentMarker];
  }
}]);
