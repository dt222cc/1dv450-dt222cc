/**
 *
 */
positioningApp.controller("EventAddController", ['$scope', '$location', 'EventService', 'TagService', 'NgMap',
function($scope, $location, EventService, TagService, NgMap) {
  if (sessionStorage.currentUser === undefined) {
    $location.path('/login');
  }

  // Set the ViewModel
  var vm = this;
  vm.eventTags = [];
  var addressCity;
  var lastLocationSearch = {
    formatted_address: ''
  };

  // Bad practise? Handling map from this controller
  var map;
  var markers = [];
  var geocoder = new google.maps.Geocoder();
  NgMap.getMap('map').then(function(foundMap) {
    map = foundMap;
  });

  // Keep submit button disabled if not completed
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

  // Get location from the input (geocoding, marker, infowindow, new center and zoom)
  $scope.showLocation = function() {
    if ($scope.eventAddress.length > 1) {
      clearMarkers();
      geocodeLocation($scope.eventAddress, function(location) {
        if (location !== undefined) {
          addMarker(location);
          centerLocation(location);
          setNewZoom(15);
        }
      });
    }
  };

  // Get a location object from geocoding / reverse geocoding
  function geocodeLocation(location, callback) {
    if (location !== lastLocationSearch.formatted_address) { // Only do a search if not same as before
      if (geocoder) {
        geocoder.geocode({
          'address': location
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
              // This will set the input text to address, has to a second search to show up
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

  // Clear markers (only 1 marker displayed on the map)
  function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  // Add marker with infowindow, open infowindow
  function addMarker(location) {
    addressCity = location.formatted_address;

    var marker = new google.maps.Marker({
      position: location.geometry.location,
      map: map
    });

    var infowindow = new google.maps.InfoWindow({
      content: '<b>Address: </b>' + addressCity +
        '<br><b>Lat: </b>' + location.geometry.location.lat() +
        '<br><b>Lng: </b>' + location.geometry.location.lng(),
      size: new google.maps.Size(150, 50)
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

    infowindow.open(map, marker);
    markers.push(marker);
  }

  function centerLocation(location) {
    map.setCenter(location.geometry.location);
  }

  function setNewZoom(zoom) {
    map.setZoom(zoom);
  }

  // Get all tags from API to populate the list of existing tags
  TagService.getTags().success(function(data) {
    vm.tagList = data.amount > 0 ? data.tags : [];
    vm.tagFirstSelectOption = vm.tagList ? 'Select existing tag to add' : 'No existing tags to add';
  }).error(function(err) {
    vm.tagFirstSelectOption = 'No existing tags to add';
  });

  // Check and add an "existing" tag to the event
  $scope.addExistingTag = function() {
    if ($scope.existingTags) {
      var found = vm.eventTags.some(function(el) {
        return el.name === $scope.existingTags.name;
      });
      if (!found) {
        vm.eventTags.push($scope.existingTags);
      }
    }
  };

  // Check and add an "new" tag to the event
  $scope.addNewTag = function() {
    if ($scope.newTag) {
      var found = vm.eventTags.some(function(el) {
        return el.name === $scope.newTag;
      });
      if (!found) {
        vm.eventTags.push({ name: $scope.newTag });
      }
    }
  };

  // Remove tag from list
  $scope.removeTag = function(index) {
    vm.eventTags.splice(index, 1);
  };

  // On submit, compile into an event object ...
  $scope.submit = function() {
    var confirmMessage   = '';
    var tagsInString     = '';
    var formattedTagList = [];

    // Process tags
    vm.eventTags.forEach(function(tag) {
      formattedTagList.push({ name: tag.name });
      tagsInString += tag.name + ', ';
    });

    // Further processing of tags
    if (tagsInString !== undefined) {
      tagsInString = tagsInString.slice(0, -2);
    } else {
      tagsInString = '"No tags added"';
    }

  // The event object to be sent for creation
    var event = {
      name: $scope.eventName,
      description: $scope.eventDescription,
      position: {
        address_city: lastLocationSearch.formatted_address
      },
      tags: formattedTagList
    };

    // A confirm message for the confirmation window,
    // also used for reviewing event before the final submission
    confirmMessage = 'Are you sure you want to create this event?\n\nEvent name: ' +
      event.name + '\nEvent description: ' + event.description + '\nLocation: ' +
      event.position.address_city + '\nTags: ' + tagsInString;

    if (confirm(confirmMessage)) {
      // Work In Progress
      var token = JSON.parse(sessionStorage.currentUser).token;
      EventService.addEvent({event: event}, token).success(function(data) {
        $location.path('/');
        // Needs confirmation of event creation, flash message
      }).error(function(error, data) {
        // Needs more testing and error message handling
        console.log('Failed to create the event.');
        console.log(error);
        console.log(data);
      });
    }
  };
}]);
