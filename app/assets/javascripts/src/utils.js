// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

function initGL(canvas_id) {
  //return WebGLDebugUtils.makeDebugContext(document.getElementById(canvas_id).getContext("experimental-webgl",  {antialias : false}));     
  return document.getElementById(canvas_id).getContext("experimental-webgl",  {antialias : false});       
}

function generateGrid(canvasSelector, maxX, maxY, elem) {
  canvases = $(canvasSelector);
  var id = 0;
  for(var y = 0; y < maxY; y++) {
    var row = $("<div/>", { "class": "smallCanvasframe" });
    row.appendTo(canvases);
    for(var x = 0; x < maxX; x++) {
      var canvas = $("<" + elem + "/>", { "id": elem + id, 'class': 'smallCanvas' }).appendTo(row);
      id ++;

    }
  }
}

// create a fixed fullscreen canvas and append to <body>
function createOverlayCanvas(id) {
//      var h= $('body').height();
      $("<canvas/>").attr({ 
      "id": id , 
      width:    $(window).width(), 
      height:   $(window).height()}).css({
      position: 'fixed', 
      top:      '0px',
      left:     '0px',
      'z-index': 100
      }).appendTo('body');
   var canvas = document.getElementById('canvas');
   addEvent(window, 'resize', function () { 
     canvas.width = $(window).width();
     canvas.height = $(window).height();
   });
}
// create a fixed fullscreen canvas and append to <body>
function createOverlayCanvas_v2(id) {
//      var h= $('body').height();
      $("<canvas/>").attr({ 
      "id": id , 
      width:    window.innerWidth, 
      height:   window.innerHeight}).css({
      position: 'fixed', 
      top:      '0px',
      left:     '0px',
      'z-index': 100,
      'pointer-events': 'none'
      }).appendTo('body');
   var canvas = document.getElementById('canvas');
   addEvent(window, 'resize', function () { 
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
   });
}


// http://www.zachhunter.com/2010/04/json-objects-to-html-table/

// This function creates a standard table with column/rows
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show
function CreateTableView(objArray, theme, enableHeader) {
  // set optional theme parameter
  if (theme === undefined) {
    theme = 'mediumTable'; //default theme
  }

  if (enableHeader === undefined) {
    enableHeader = true; //default enable headers
  }

  // If the returned data is an object do nothing, else try to parse
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

  var str = '<table class="' + theme + '">';

  // table head
  if (enableHeader) {
    str += '<thead><tr>';
    for (var index in array[0]) {
      str += '<th scope="col">' + index + '</th>';
    }
    str += '</tr></thead>';
  }

  // table body
  str += '<tbody>';
  for (var i = 0; i < array.length; i++) {
    str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
    for (var index in array[i]) {
      str += '<td>' + array[i][index] + '</td>';
    }
    str += '</tr>';
  }
  str += '</tbody>'
  str += '</table>';
  return str;
}

// appends script tag with a given src to body.
function includeScript(src) {
  var script   = document.createElement("script");
  script.async = false;
  script.type  = "text/javascript";
  script.src   = src;
  document.body.appendChild(script);
}
function sendLog() {
  $.get('http://localhost:8080/logandkill', {data:
    JSON.stringify(timer.toJSON())
  });
}

// http://www.sean.co.uk/a/webdesign/javascriptdelay.shtm
// function doing nothing for 'ms' milliseconds
function delay(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}
} 
