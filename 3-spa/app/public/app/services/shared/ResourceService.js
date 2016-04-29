/**
 * This is responsible of the calls to the API
 * We inject the http (for AJAX-handling) and the API constant with key, url and format
 */
positioningApp.factory('ResourceService', function($http, API_CONSTANT) {
  // Returns the Service
  return {
    // Get the collectionName as parameter
    getCollection: function(collectionName, resourceParams) {
      // Compile params
      var params = Object.assign({ access_token: API_CONSTANT.key }, resourceParams);
      // Returns a promise
      return $http({
        method: 'GET',
        url: API_CONSTANT.url + collectionName,
        headers: { 'Accept': API_CONSTANT.format },
        params: params
      });
    },
    postCollection: function(collectionName, body, digest) {
      var params = Object.assign({ access_token: API_CONSTANT.key });
      return $http({
        method: 'POST',
        url: API_CONSTANT.url + collectionName,
        headers: {
          'Accept': API_CONSTANT.format,
          'Authorization': 'Basic ' + digest
        },
        params: params,
        data: body // TODO: Double check if working as intended
      });
    }
    // ...
  };
});
