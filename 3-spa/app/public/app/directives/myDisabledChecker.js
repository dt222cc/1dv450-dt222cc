/**
 * Usage: Disable input field tags unless certain 'radio buton is checked in'. WIP
 */
positioningApp.directive('myDisabledChecker', function() {
  return {
    link: function(scope, element, attrs) {
      console.log(attrs.myDisabledChecker);
      // Post poned
    }
  };
});