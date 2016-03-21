/**
 *
 */
positioningApp.factory('EventService', ['ResourceService', function(Resource) {
  // Returns the Service
  return {
    getEvents: function() {
      return Resource.getCollection('events');
    }
    // ...
  };
}]);
