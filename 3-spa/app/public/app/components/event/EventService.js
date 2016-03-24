/**
 *
 */
positioningApp.factory('EventService', ['ResourceService', function(Resource) {
  // Returns the Service
  return {
    getEvents: function() {
      return Resource.getCollection('events');
    },
    getEvent: function(id) {
      return Resource.getCollection('events/' + id);
    },
    getEventsWithQuery: function(query) {
      return Resource.getCollection('events', {query: query});
    }
    // ...
  };
}]);
