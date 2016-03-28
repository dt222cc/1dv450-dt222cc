/**
 * Usage: Add attribute 'my-key-code' in elements that should track keypresses,
 * include attribute 'code' with the key code it should accept
 */
positioningApp.directive('myKeyPress', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind("keypress", function(event) {
        var keyCode = event.which || event.keyCode;
        if (keyCode == attrs.code) { // Check if keycode match
          scope.$apply(function() {
            scope.$eval(attrs.myKeyPress); // Evaluate the expression
          });
        }
      });
    }
  };
});