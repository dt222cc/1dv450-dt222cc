/**
 *
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
      // Should not arrive here, because of invalid object sent, "{}"
    }).error(function(err, status) {
      if (status !== 403) {
        if (status === 422) {
          setCurrentUser($scope.email, token);
        } else {
          console.log('An unexpected error occurred, try again later.');
          alert('An unexpected error occurred, try again later.');
        }
      } else {
        console.log('Forbidden. TODO: Message');
      }
    });
  };

  function setCurrentUser(email, token) {
    LoginService.getCreatorByEmail(email)
      .success(function(data) {
        var currentUser = {
          creator: data.creator,
          token: token
        };
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        $location.path('/');
      })
      .error(function(err) {
        console.log(err);
      });
  }
}]);
