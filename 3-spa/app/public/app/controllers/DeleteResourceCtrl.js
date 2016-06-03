/**
 * Show/hide functionality for login/logout links for the Navbar
 */
positioningApp.controller('DeleteResourceController', ['$scope', '$routeParams', '$location', 'EventService',
  function($scope, $routeParams, $location, EventService) {

  $scope.flashMessage = '';

  /**
   * ng-show
   * @return {Boolean} [description]
   */
  $scope.showFlashMessage = function() {
    return $scope.flashMessage !== '';
  };

  // For now anyone that is logged in can "try" to delete,
  // should not pass the validation on server side
  $scope.isLoggedIn = function() {
    return sessionStorage.currentUser !== undefined;
  };

  /**
   * Delete resource, check resource type from url, get id from url/route,
   * get token from sessionstorage. Only handles event resources at the moment.
   */
  $scope.deleteResource = function() {
    if (isEvent()) {
      var token = JSON.parse(sessionStorage.currentUser).token;
      EventService.deleteEvent($routeParams.id, token).success(function(data) {
        $scope.flashMessage = 'The resource was successfully been removed.';
      }).error(function(err, status) {
        if (status) {
          $scope.flashMessage = err.error;
        } else {
          $scope.flashMessage = 'Unexpected error occured.';
        }
      });
    }

    function isEvent() {
      return $location.$$url.split('/')[1] === 'event';
    }
  };
}]);