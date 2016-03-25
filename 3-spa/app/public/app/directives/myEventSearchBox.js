positioningApp.directive('myEventSearchBox', function() {
  return {
    restrict: 'E',
    template:
    '<div class="row">' +
    '  <div class="col-lg-6">' +
    '    <div class="input-group">' +
    '      <input type="text" class="form-control" placeholder="Search for..." ng-model="searchText" code="13" my-key-press="searchEvents()" >' +
    '      <span class="input-group-btn">' +
    '        <button class="btn btn-default" type="button" ng-click="searchEvents()">Search</button>' +
    '      </span>' +
    '    </div>' +
    '  </div>' +
    '</div>'
  };
});
