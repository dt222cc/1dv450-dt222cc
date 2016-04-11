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
    },
    getEventsWithTagFilter: function(id) {
      return Resource.getCollection('events', {tag_id: id});
    },
    addEvent: function(event) {
      return Resource.postCollection('events', event); // Postponed, login first
    }
  };
}]);
