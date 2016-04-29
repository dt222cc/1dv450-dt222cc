/**
 *
 */
positioningApp.controller('LoginController', ['$scope', 'EventService', function($scope, EventService) {
  // Notice: Using Basic Auth which is proably not recommended
  // This function generates an Basic Auth Digest with the two fields,
  // then try to do a POST to check if the username(email)+password combo exists in the db
  // Checks for status 403 (forbidden), 422 (authorized but invalid event data)
  // If ok store digest in session and user is "logged in"
  $scope.login = function() {
    var token = btoa($scope.email + ":" + $scope.password)
    console.log(token);

    EventService.addEvent({}, token).success(function(data) {
      console.log(data);
    }).error(function(err) {
      console.log(err);
    });
  };
}]);
