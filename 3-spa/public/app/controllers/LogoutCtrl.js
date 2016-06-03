/**
 * Logout Controller: Destroy/delete the session and redirect to login page
 */
positioningApp.controller('LogoutController', ['$scope', '$location', function ($scope, $location) {
  sessionStorage.removeItem('currentUser');
  $location.path('/login'); // Alternative is to redirect to '/'
}]);
