/**
 *
 */
positioningApp.factory('TagService', ['ResourceService', function(Resource) {
  // Returns the Service
  return {
    getTags: function() {
      return Resource.getCollection('tags');
    }
    // ...
  };
}]);
