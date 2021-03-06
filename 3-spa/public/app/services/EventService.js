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
    addEvent: function(event, token) {
      return Resource.postCollection('events', event, token);
    },
    deleteEvent: function(eventId, token) {
      return Resource.deleteCollection('events/' + eventId, token);
    },
    updateEvent: function(eventId, event, token) {
      return Resource.updateCollection('events/' + eventId, event, token);
    }
  };
}]);
