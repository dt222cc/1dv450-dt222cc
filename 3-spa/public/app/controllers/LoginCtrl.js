/**
 * Login Controller: Authenticates user
 */
positioningApp.controller('LoginController', ['$scope', '$location', 'LoginService', function($scope, $location, LoginService) {
  // Disable login if already logged in, redirect to '/'
  if (sessionStorage.currentUser !== undefined) {
    $location.path('/'); // Perhaps include a flash message
  }

  // Notice: Using Basic Auth which is probably not recommended
  // This function generates a Basic Auth Digest with the two fields (email/password),
  // then try to do a POST for authentication check
  // Checks for status 403 (forbidden) and 422 (authorized but invalid event data)
  // If status code is 422 get user details and set as logged in
  $scope.login = function() {
    var token = btoa($scope.email + ":" + $scope.password);
    LoginService.authenticateUser({}, token).success(function(data) {
      // There is no success path because of intentional invalid object, "{}"
    }).error(function(err, status) {
      if (status !== 403) {
        if (status === 422) { // Passed 403 and is 422 === Correct credentials
          setCurrentUser($scope.email, token);
        }
      } else {
        console.log('Forbidden, works as intended. TODO: Error/Flash Message');
      }
    });
  };

  // Set session storage, is logged in. Redirect away from login
  function setCurrentUser(email, token) {
    LoginService.getCreatorByEmail(email)
      .success(function(data) {
        var currentUser = {
          creator: data.creator,
          token: token
        };
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        $location.path('/add_event');
      });
  }
}]);
