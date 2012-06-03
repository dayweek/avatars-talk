/* Usage: 
overlay = GLOVERLAY([{renderFunction: function () { drawViewport(w); }, placeholders: ['#glViewport', '#glViewport2']}]);
overlay.render();
*/

var GLOVERLAY;
if(GLOVERLAY) {
  throw new Error("GLOVERLAY variable is already defined");  
}
GLOVERLAY = (function () {

  var placeholders, _gl;

  // Gets placeholders that are in current view
  var visiblePlaceholders = function() {
    return placeholders.filter(function (elem) { return isPartiallyScrolledIntoView(elem.placeholder); });
  };

  // Set up rendering function for each placeholder
  var itself = function (gl, relations) {
  _gl = gl;
    placeholders = [];
    for(var i = 0; i < relations.length; i++) {
      for(var ii = 0; ii < relations[i].placeholders.length; ii++) {
        placeholders.push({renderFunction: relations[i].renderFunction, placeholder: relations[i].placeholders[ii]});
      }
    }
    return { render: render };
  };

  // clears framebuffer, for each placeholder sets up appropriate viewport and launches it's render function
  var render = function() {
    var visiblePlaceholdersp = visiblePlaceholders();
    for(var i = 0; i < visiblePlaceholdersp.length; i++) {
      // compute coordinates for viewport
      var elem = $(visiblePlaceholdersp[i].placeholder);
      var elemTop = elem.offset().top;
      //console.log(elemTop);
      var elemLeft = elem.offset().left;
      var docViewTop = $(window).scrollTop();
      var docViewLeft = $(window).scrollLeft();

      //console.log(elemLeft - docViewLeft, $('#canvas').height() + docViewTop - elemTop - elem.height(), elem.width(), elem.height());
      gl.viewport(elemLeft - docViewLeft, $('#canvas').height() + docViewTop - elemTop - elem.height(), elem.width(), elem.height());

      visiblePlaceholdersp[i].renderFunction.call();
    }
  };
  return itself;
}());
