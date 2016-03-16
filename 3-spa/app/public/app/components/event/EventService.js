/**
 *
 */
positioningApp.factory('EventService', ['ResourceService', function(Resource) {
  'use strict';
  // Returns the Service
  return {
    getEvents: function() {
      return Resource.getCollection('events');
    }
    // ...
  };
}]);
