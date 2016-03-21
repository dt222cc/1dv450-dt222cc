/**
 * // https://github.com/allenhwkim/angularjs-google-maps
 */
positioningApp.controller('MapController', ['$scope', 'NgMap', function($scope, NgMap) {
  var vm = this;

  NgMap.getMap().then(function(map) {
    vm.map = map;
  });

  /**
   * Pan to event, set new zoom(closer), show info window
   * @param  {[type]} e     [required]
   * @param  {[type]} event [the event]
   */
  $scope.showEvent = function(e, event) {
    vm.event = event;
    var eventPosition = new google.maps.LatLng(event.position.latitude, event.position.longitude);
    vm.map.setCenter(eventPosition);
    vm.map.setZoom(10);
    vm.map.showInfoWindow('eventInfo', this);
  };
}]);
