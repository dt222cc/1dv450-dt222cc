/**
 * Destroy/delete the session
 */
positioningApp.controller('LogoutController', ['$scope', '$location', function ($scope, $location) {
  sessionStorage.removeItem('currentUser');
  $location.path('/login'); // Alternative is to redirect to '/'
}]);
