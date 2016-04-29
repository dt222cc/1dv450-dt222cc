/**
 * // https://github.com/allenhwkim/angularjs-google-maps
 */
positioningApp.controller('MapController', ['$scope', 'NgMap', function($scope, NgMap) {
  var vm = this;
  vm.defaultPosition = new google.maps.LatLng(56.56, 15.5);
  vm.defaultZoom = 8;
  vm.map;

  NgMap.getMap('map').then(function(map) {
    vm.map = map;
  });

  /**
   * Pan to event, set new zoom(closer), show info window
   * @param  {[type]} e     [required]
   * @param  {[type]} event [the event]
   */
  $scope.showEvent = function(e, event) {
    vm.event = event;

    vm.tags = '';
    if (vm.event.tags.length > 0) {
      vm.event.tags.forEach(function(tag) {
        vm.tags += tag.name + ', ';
      });
      vm.tags = vm.tags.slice(0, -2);
    } else {
      vm.tags = 'Has no tags';
    }

    var eventPosition = new google.maps.LatLng(event.position.latitude, event.position.longitude);
    vm.map.setCenter(eventPosition);
    vm.map.setZoom(10);
    vm.map.showInfoWindow('eventInfo', this);
  };

   /*
      Currently only sets the default map position and zoom,
      did not manage to "toggle/hide" currently open infowindows
      when clicking the reset btn
    */
  $scope.resetMap = function() {
    vm.map.setCenter(vm.defaultPosition);
    vm.map.setZoom(vm.defaultZoom);
  };
}]);
