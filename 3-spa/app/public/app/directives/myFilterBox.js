positioningApp.directive('myFilterBox', function() {
  return {
    restrict: 'E',
    template:
    '<div class="row">' +
    '  <div class="col-lg-6">' +
    '    <input type="text" class="form-control" placeholder="Filter results" ng-model="filterText" >' +
    '  </div>' +
    '</div>'
  };
});
