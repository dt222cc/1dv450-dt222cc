/**
 * Logout Controller: Destroy/delete the session and redirect to login page
 */
positioningApp.controller('LogoutController', ['$scope', '$location', '$rootScope',
  function ($scope, $location, $rootScope) {
  sessionStorage.removeItem('currentUser');
  $location.path('/login'); // Alternative is to redirect to '/'
  $rootScope.setMessage({ message: 'Good bye! Successfully logged out', type: 'success' });
}]);
