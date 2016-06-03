/**
 * Show/hide functionality for login/logout links for the Navbar
 */
positioningApp.controller('NavbarController', ['$scope', 'LoginService', function($scope, LoginService) {
  // Returns true if an user is logged in (checks sessionStorage)
  $scope.isLoggedIn = function() {
    return LoginService.isLoggedIn() !== undefined;
  };
}]);