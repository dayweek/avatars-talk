var miniScenes, overlay, gl, viewportIndices;

function load_model(path, readyfunc) {
  var useWorker = true;
  if($.browser.opera) {
    useWorker = false;
  }
  var useBuffers = false;

  var loader = new THREE.CTMLoader();

  loader.loadParts( path,   function( geometries, materials ) {
    //var material = new THREE.MeshLambertMaterial( { color: 0xffaa00, ambient: 0x556677} );
    for(var i = 0; i < geometries.length; i++) {
      var mesh = new THREE.Mesh( geometries[i], materials[i]);
      readyfunc(mesh);
    }
  }, useWorker, useBuffers );
}
function MiniScene(url) {
  var miniSceneScope = this;



  var materials = [];
  for ( var i = 0; i < 6; i ++ ) {

    materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );

  }
  var rotObject = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
  rotObject.position.y = 150;

  var camera = new THREE.PerspectiveCamera( 45, 1, 1, 1000 );
  camera.position.x = 15;
  camera.position.y = 5;
  camera.up = new THREE.Vector3( 0, 1, 0);
  //camera.position.z = 50;
  camera.lookAt(new THREE.Vector3( 0, 0, 0));

  var scene = new THREE.Scene();
  scene.add( camera );
  var light = new THREE.AmbientLight( 0x222222 );
  scene.add(light);
  var point = new THREE.DirectionalLight(0xffffff);
  point.position =  new THREE.Vector3( 50, 0, 0 );
  scene.add(point);


  //       scene.add( rotObject );
  load_model(url, function(mesh) { 
    miniSceneScope.rotObject = mesh;
    scene.add(mesh)  ;
  });


  this.rotObject = null;
  this.camera = camera;
  this.scene = scene;
  return this;
}
function start() {
  if(!Detector.webgl) {
    Detector.addGetWebGLMessage({parent: document.getElementById('messagebox')});
    return;
  } 
  $('.avatar_placeholder').tooltip();
  createOverlayCanvas_v2('canvas');
  var relations = [];
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
  gl = renderer.getContext();
  renderer.autoClear = false;
  viewportIndices = placeholderToViewportIdx(models);
  miniScenes = (function createViewports() {
    var miniScenes = [];
    for(var i = 0, n = models.length; i < n; i++) {
      miniScenes.push(new MiniScene(models[i].url));
    }
    return miniScenes;
  }());

  for(var i = 0, n = miniScenes.length; i < n; i++) {
    var ids = [];
    for(var ii = 0, nn = models[i].placeholderIds.length; ii < nn; ii++) {
      ids.push(models[i].placeholderIds[ii]);
    }
    relations.push({renderFunction: (function () { 
      var p = i;
      return function() {
        renderer.render(miniScenes[p].scene, miniScenes[p].camera);
      };
    }())
    , placeholders: ids
    });
  }
  //renderer.render(viewports[0].scene, viewports[0].camera)
  overlay = GLOVERLAY(gl, relations);
  $('.avatar_placeholder').mousedown(function (e) {mouseDown(e);});

  drawScene();

}

function placeholderToViewportIdx(a) {
  var r = {};
  for(var i = 0, n = a.length; i < n; i++) {
    for(var ii = 0, nn = a[i].placeholderIds.length; ii < nn; ii++) {
      r[a[i].placeholderIds[ii]] = i;
    }
  }
  return r;
}

function drawScene() {
  requestAnimFrame(drawScene);
  //console.log('scene');
  gl.clear(gl.COLOR_BUFFER_BIT);
  overlay.render();
}


// mouse tracking
var trackMouse = false, lastX,
lastY, //so for not needed
activeCanvasId, selectTmp;
window.onmouseup = mouseUp;
window.onmousemove = mouseMove;

function mouseDown() {
  var event = arguments[0] || window.event;
  var elem  = event.target || event.srcElement;
  activeCanvasId = elem.id;
  lastX = event.clientX;
  lastY = event.clientY;
  trackMouse = true;

  // cancel out any text selections (http://luke.breuer.com/tutorial/javascript-drag-and-drop-tutorial.aspx)
    document.body.focus();
    // webkit
    selectTmp = document.onselectstart;
    document.onselectstart = function () { return false; };
    if($.browser.mozilla) {
      $('body').css('-moz-user-select', 'none');
    }
    return false;
}

function mouseUp() {
  var event = arguments[0] || window.event;
  lastX = event.clientX;
  lastY = event.clientY;
  trackMouse = false;
  document.onselectstart = selectTmp;
  if($.browser.mozilla) {
    $('body').css('-moz-user-select', 'all');
  }
}

function mouseMove() {
  if(trackMouse) {
    var event = arguments[0] || window.event;
    var newX = event.clientX
    ,newY = event.clientY;
    var obj = miniScenes[viewportIndices[activeCanvasId]].rotObject;
    if(obj) {
      miniScenes[viewportIndices[activeCanvasId]].rotObject.rotation.y += (newX - lastX) * 0.01;
    }
    lastX = newX;
    lastY = newY;
  }
  return false;

}
document.addEventListener('load', start) ;
