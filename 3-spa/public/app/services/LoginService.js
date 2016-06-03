/**
 * Service for login process
 */
positioningApp.factory('LoginService', ['ResourceService', function(Resource) {
  return {
    authenticateUser: function(event, token) {
      return Resource.postCollection('events', event, token);
    },
    getCreatorByEmail: function(email) {
      return Resource.getCollection('creators', {email: email});
    },
    isLoggedIn: function() {
      return sessionStorage.currentUser;
    }
  };
}]);
