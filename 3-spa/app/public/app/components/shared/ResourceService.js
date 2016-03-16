/**
 * This is responsible of the calls to the API
 */
positioningApp.factory('ResourceService', ResourceService);

// We inject the http (for AJAX-handling) and the API constant with key, url and format
ResourceService.$inject = ['$http', 'API_CONSTANT'];

function ResourceService($http, API_CONSTANT) {
  console.log('inside ResourceService');

  // Returns the Service
  return {
    // Get the collectionName as parameter
    getCollection: function(collectionName) {
      // Returns a promise which will be fullfilled
      return $http({
        method: 'GET',
        url: API_CONSTANT.url + collectionName,
        headers: {
          'Accept': API_CONSTANT.format
        },
        params: {
          'access_token': API_CONSTANT.key
        }
      }).then(function(response) {
        console.log(response);
        return response.data;
      });
    }
    // ...
  }
}
