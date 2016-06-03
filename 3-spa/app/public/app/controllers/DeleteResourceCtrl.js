/**
 * Show/hide functionality for login/logout links for the Navbar
 */
positioningApp.controller('DeleteResourceController', ['$scope', '$routeParams', '$location', 'EventService',
  function($scope, $routeParams, $location, EventService) {
  // Must be logged in to be able to delete,
  // authorization if able to delete happens on server side,
  // which means that im not checking for "IS event creator"
  // which should probably be done on the client side aswell.
  if (sessionStorage.currentUser === undefined) {
    $location.path('/login');
  }

  $scope.flashMessage = '';

  /**
   * ng-show
   * @return {Boolean} [description]
   */
  $scope.showFlashMessage = function() {
    return $scope.flashMessage !== '';
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