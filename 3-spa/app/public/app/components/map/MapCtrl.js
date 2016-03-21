/**
 *
 */
positioningApp.controller('MapController', function($scope, NgMap) {
  console.log('inside MapController');
  NgMap.getMap(map).then(function(map) { // Have to include map here to find the map..
    console.log('map retrieved');
    console.log(map);
  });
});
