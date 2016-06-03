/**
 * Optimization can be done, I (the author) just copy+pasted the EventAddCtrl with some modification.
 */
positioningApp.controller("EventEditController", ['$scope', '$location', 'EventService', 'TagService', 'NgMap', '$routeParams',
function($scope, $location, EventService, TagService, NgMap, $routeParams) {
  if (sessionStorage.currentUser === undefined) {
    $location.path('/login');
  }

  var vm = this;
  vm.eventTags = [];

  $scope.currentEvent = {};

  $scope.eventDetailRoute = '/event/' + $routeParams.id;

  // Calling our service and get the event details
  EventService.getEvent($routeParams.id).then(function(data) {
    if (data) {
      if (data.data.event) {
        $scope.currentEvent = data.data.event;
        // Current event's tags
        if ($scope.currentEvent.tags.length > 0) {
          $scope.currentEvent.tags.forEach(function(tag) {
            vm.eventTags.push({ name: tag.name });
          });
        }
        // For the input fields (value and placeholder)
        $scope.eventName = $scope.currentEvent.name;
        $scope.eventDescription = $scope.currentEvent.description;
      }
    }
  });

  // Get all tags from the API for updating tags
  TagService.getTags().success(function(data) {
    vm.tagList = data.amount > 0 ? data.tags : [];
    $scope.tagFirstSelectOption = vm.tagList ? 'Select existing tag to add' : 'No existing tags to add';
  }).error(function(err) {
    $scope.tagFirstSelectOption = 'No existing tags to add';
  });

  // Keep submit button disabled if form not completed
  $scope.isFormCompleted = function() {
    return $scope.eventName !== undefined &&
      $scope.eventDescription !== undefined &&
      $scope.eventName !== '' &&
      $scope.eventDescription !== '';
  };

  /**
   * ng-show
   * @return {Boolean} [description]
   */
  $scope.showFlashMessage = function() {
    return $scope.flashMessage !== '';
  };

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

  // On submit, compile into an event object
  $scope.submit = function() {
    // Formatting tags
    var formattedTagList = [];
    vm.eventTags.forEach(function(tag) {
      formattedTagList.push({ name: tag.name });
    });

    // Format event object. Reminder: check if tags update properly
    var data = {
      event: {
        name: $scope.eventName,
        description: $scope.eventDescription,
        position: {
          address_city: $scope.currentEvent.position.address_city
        },
        tags: formattedTagList
      }
    };

    var token = JSON.parse(sessionStorage.currentUser).token;

    EventService.updateEvent($routeParams.id, data, token).success(function(data) {
      sessionStorage.updatedEvent = true;
      $location.path($scope.eventDetailRoute);
    }).error(function(err, status) {
      $scope.flashAlertStatus = 'danger';
      if (status) {
        console.log(status);
        $scope.flashMessage = err.error;
      } else {
        $scope.flashMessage = 'The update was aborted, an unexpected error occured.';
      }
    });
  };
}]);
