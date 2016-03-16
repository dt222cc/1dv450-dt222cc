positioningApp.factory('EventService', EventService);

EventService.$inject = ['ResourceService'];

function EventService(Resource) {
  console.log('inside EventService');

  return {
    getEvents: function() {
      return Resource.getCollection('events');
    }
    // ...
  }
}