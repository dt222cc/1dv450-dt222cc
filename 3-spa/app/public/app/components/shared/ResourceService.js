/**
 * This is responsible of the calls to the API
 * We inject the http (for AJAX-handling) and the API constant with key, url and format
 */
positioningApp.factory('ResourceService', ['$http', 'API_CONSTANT', function($http, API_CONSTANT) {
  'use strict';
  // Returns the Service
  return {
    // Get the collectionName as parameter
    getCollection: function(collectionName) {
      // Returns a promise
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
  };
}]);
