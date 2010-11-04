var hostname = "minedraft.net";
var gridSizeMinMax = [16, 64];
var gridSize = 32;

var blocks = { 
  "grass": [0, 0, 16, 16],
  "grassy-dirt": [48, 0, 16, 16],
  "dirt": [32, 0, 16, 16],
  "stone": [16, 0, 16, 16],
  "snow": [32, 64, 16, 16],
  "snowy-dirt": [64, 64, 16, 16],
  "wood": [64, 0, 16, 16],
  "step": [80, 0, 16, 16],
  "step-top": [96, 0, 16, 16],
  "cobblestone": [0, 16, 16, 16],
  "mossy-cobblestone": [64, 32, 16, 16],
  "hellstone": [112, 96, 16, 16],
  "bedrock": [16, 16, 16, 16],
  "sand": [32, 16, 16, 16],
  "slow-sand": [128, 96, 16, 16],
  "clay": [128, 64, 16, 16],
  "gravel": [48, 16, 16, 16],
  "tilled": [112, 80, 16, 16],
  "tilled-wet": [96, 80, 16, 16],
  "stump": [80, 16, 16, 16],
  "bark": [64, 16, 16, 16],
  "gold-ore": [0, 32, 16, 16],
  "iron-ore": [16, 32, 16, 16],
  "coal-ore": [32, 32, 16, 16],
  "diamond-ore": [32, 48, 16, 16],
  "redstone-ore": [48, 48, 16, 16],
  "lightstone-ore": [144, 96, 16, 16],
  "wool": [0, 64, 16, 16],
  "brick": [112, 0, 16, 16],
  "glass": [16, 48, 16, 16],
  "obsidian": [80, 32, 16, 16],
  "iron": [96, 16, 16, 16],
  "gold": [112, 16, 16, 16],
  "diamond": [128, 16, 16, 16],
  "toolbox": [192, 48, 16, 16],
  "toolbox-top": [176, 32, 16, 16],
  "forge": [192, 32, 16, 16],
  "chest": [176, 16, 16, 16],
  "spawner": [16, 64, 16, 16],
  "sponge": [0, 48, 16, 16],
  "tnt": [128, 0, 16, 16],
  "lava": [208, 224, 16, 16],
  "water": [208, 192, 16, 16],
  "ice": [48, 64, 16, 16],
  "torch": [0, 80, 16, 16],
  "redstone-torch-on": [48, 96, 16, 16],
  "redstone-torch-off": [48, 112, 16, 16],
  "redstone-line-on": [80, 96, 16, 16],
  "redstone-line-off": [80, 80, 16, 16],
  "redstone-cross-on": [64, 96, 16, 16],
  "redstone-cross-off": [64, 80, 16, 16],
  "ladder": [48, 80, 16, 16],
  "red-flower": [192, 0, 16, 16],
  "yellow-flower": [208, 0, 16, 16],
  "red-mushroom": [192, 16, 16, 16],
  "brown-mushroom": [208, 16, 16, 16],
  "rail-curve": [0, 112, 16, 16],
  "rail-straight": [0, 128, 16, 16],
  "cactus": [80, 64, 16, 16],
  "cactus-side": [96, 64, 16, 16],
  "reeds": [144, 64, 16, 16],
  "wheat": [240, 80, 16, 16],
  "shrubbery": [240, 0, 16, 16],
  "door-wood": [16, 80, 16, 32],
  "door-iron": [32, 80, 16, 32],
  "bookcase": [48, 32, 16, 16],
  "jukebox-top": [176, 64, 16, 16],
  "jukebox-side": [160, 64, 16, 16],
  "jack-o-lantern-on": [128, 112, 16, 16],
  "jack-o-lantern-off": [112, 112, 16, 16],
  "extras": {
    "eraser": [0, 0, 16, 16],
    "cart": [16, 0, 16, 16]
  }
};

var toolCats = {
  "Ore": [ "coal-ore", "iron-ore", "gold-ore", "redstone-ore", "diamond-ore", "lightstone-ore" ],
  "Natural": [ "dirt", "stone", "sand", "slow-sand", "gravel", "clay", "stump", "bark", "wool", "obsidian", "hellstone", "bedrock" ],
  "Crafted": [ "wood", "cobblestone", "glass", "brick", "iron", "gold", "diamond" ],
  "Ground": [ "grassy-dirt", "grass", "snowy-dirt", "snow", "tilled", "tilled-wet", "mossy-cobblestone", "cactus", "cactus-side", "reeds", "wheat", "shrubbery" ],
  "Fluids": [ "water", "ice", "lava" ],
  "Tracks": [ "rail-straight", "rail-curve" ],
  "Redstone": [ "redstone-torch-on", "redstone-torch-off", "redstone-line-on", "redstone-line-off", "redstone-cross-on", "redstone-cross-off" ],
  "Misc": [ "ladder", "step", "step-top", "toolbox", "toolbox-top", "forge", "chest", "sponge", "red-flower", "yellow-flower", "red-mushroom", "brown-mushroom", "jack-o-lantern-on", "jack-o-lantern-off", "door-wood", "door-iron", "bookcase", "spawner", "jukebox-top", "jukebox-side"],
  "All": [],
  "Tools": []
};

var blockOrientations = {
  "none": 0,
  "vert": 1,
  "horiz": 2
};

// Object to hold data for all drawn items
function Obj() {
  this.x = 0;
  this.y = 0;
  this.w = gridSize + 1; // default width and height?
  this.h = gridSize + 1;
  this.f = 't';
  this.n = 'grass';
  this.r = 0;
  this.o = blockOrientations.none;
}

//Initialize a new Box, add it, and invalidate the canvas
function addObj(x, y, h, w, fill, name, rotate, orientation) {
  var obj = new Obj;
  obj.x = x;
  obj.y = y;
  obj.h = h;
  obj.w = w;
  obj.f = fill;
  obj.n = name;
  if(rotate !== undefined)
    obj.r = rotate;
  if(orientation !== undefined)
    obj.o = orientation;
  objects.push(obj);
  invalidate();
}

function addExtraObj(x, y, h, w, fill, name, rotate, orientation) {
  addObj(x, y, h, w, fill, name, rotate, orientation);
  objects[objects.length - 1].e = true;
}

// Create a new Object and create a tool out of it.  The default values for objects are good enough for tools.
function addTool(name, rotate, orientation, h, w) {
  var tool = new Obj;
  tool.n = name;
  tool.r = rotate;
  tool.o = orientation;
  if(h !== undefined && w !== undefined) {
    tool.h = h;
    tool.w = w;
  }
  tools.push(tool);
  invalidate();
}

function addExtraTool(name) {
  var tool = new Obj;
  tool.n = name;
  tool.m = true;
  tools.push(tool);
  invalidate();
}

// holds all our live objects
var objects = []; 
// Holds the items in the toolbar
var tools = [];

var canvas;
var ctx;
var toolcanvas; // Toolbox canvas and context
var tctx;
var HEIGHT;
var WIDTH;
var VHEIGHT; // Viewport height and width
var VWIDTH;
var INTERVAL = 20;  // how often, in milliseconds, we check to see if a redraw is needed

var isDrag = false;
var isScroll = false;
var isDragDraw = false;
var mx, my; // mouse coordinates
var msx, msy; // mouse coordinates for old scroll position.

 // when set to true, the canvas will redraw everything
 // invalidate() just sets this to false right now
 // we want to call invalidate() whenever we make a change
var canvasValid = false;

// The node (if any) being selected.
// If in the future we want to select multiple objects, this will get turned into an array
var mySel; 
var lastObj;

// The currently selected tool.
var activeTool;
var oldActiveTool;
var lockToolboxSize = false;
var currToolboxSize = gridSize;

// The selection color and width. Right now we have a red selection with a small width
var mySelColor = 'orangered';
var mySelWidth = 2;

var gridColor = '#ccc';
var gridWidth = 1;

// we use a fake canvas to draw individual shapes for selection testing
var ghostcanvas;
var gctx; // fake canvas context
var ghosttoolcanvas;
var gtctx;

// since we can drag from anywhere in a node
// instead of just its x/y corner, we need to save
// the offset of the mouse when we start dragging.
var offsetx, offsety;

// Padding and border style widths for mouse offsets
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
var toolboxStylePaddingLeft, toolboxStylePaddingTop, toolboxStyleBorderLeft, toolboxStyleBorderTop;

// initialize our canvas, add a ghost canvas, set draw loop
// then add everything we want to intially exist on the canvas
function init() {
  if(!supports_canvas())
    return;

  cookieGridSize = getCookie("gridSize");
  if(cookieGridSize != null && cookieGridSize != "")
    gridSize = parseFloat(cookieGridSize);
  cookieLockToolbox = getCookie("lockToolboxSize");
  if(cookieLockToolbox != null && cookieLockToolbox != "") {
    lockToolboxSize = false; // Set this to false so it'll be set to true when we call toggleToolboxLock
    toggleToolboxLock();
    currToolboxSize = parseFloat(cookieLockToolbox);
  }

  canvas = document.getElementById('minedraft');
  sizeCanvas();
  ctx = canvas.getContext('2d');

  ghostcanvas = document.createElement('canvas');
  ghostcanvas.height = HEIGHT;
  ghostcanvas.width = WIDTH;
  gctx = ghostcanvas.getContext('2d');

  toolcanvas = document.getElementById('toolbox');
  tctx = toolcanvas.getContext('2d');
  ghosttoolcanvas = document.createElement('canvas');
  //ghosttoolcanvas.height = toolcanvas.height;
  //ghosttoolcanvas.width = toolcanvas.width;
  gtctx = ghosttoolcanvas.getContext('2d');
    
  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.onselectstart = function () { return false; }
  
  // fixes mouse co-ordinate problems when there's a border or padding
  // see getMouse for more detail
  if (document.defaultView && document.defaultView.getComputedStyle) {
    stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }

  if (document.defaultView && document.defaultView.getComputedStyle) {
    toolboxStylePaddingLeft = parseInt(document.defaultView.getComputedStyle(toolcanvas, null)['paddingLeft'], 10)      || 0;
    toolboxStylePaddingTop  = parseInt(document.defaultView.getComputedStyle(toolcanvas, null)['paddingTop'], 10)       || 0;
    toolboxStyleBorderLeft  = parseInt(document.defaultView.getComputedStyle(toolcanvas, null)['borderLeftWidth'], 10)  || 0;
    toolboxStyleBorderTop   = parseInt(document.defaultView.getComputedStyle(toolcanvas, null)['borderTopWidth'], 10)   || 0;
  }
  
  // make draw() fire every INTERVAL milliseconds
  setInterval(draw, INTERVAL);
  
  // set our events. Up and down are for dragging,
  // double click is for making new boxes
  canvas.onmousedown = myDown;
  canvas.onmouseup = myUp;
  toolcanvas.onmousedown = myToolboxDown;
  //toolcanvas.onmouseup = myUp;
  canvas.ondblclick = myDblClick;
  window.onresize = sizeCanvas;
  document.onkeypress = myKeyPress;
  document.onmousewheel = myMouseWheel;

  // add custom initialization here:
  initTools();
  decodeObjects();
}

function myMouseWheel(e) {
  if(e.wheelDelta > -200)
    zoom('out');
  if(e.wheelDelta < 200)
    zoom('in');
}

function myKeyPress(e) {
  var key = (e) ? e.which : e.keyCode;
  switch(String.fromCharCode(key)) {
    case "-":
      zoom('out');
      break;
    case "=":
      zoom('in');
      break;
    case "w":
      moveCanvas('up');
      break;
    case "a":
      moveCanvas('left');
      break;
    case "s":
      moveCanvas('down');
      break;
    case "d":
      moveCanvas('right');
      break;
  }
}

function moveCanvas(dir) {
  switch(dir) {
    case "left":
      for(var i = 0; i < objects.length - 1; i++)
        objects[i].x -= gridSize;
    break;
    case "right":
      for(var i = 0; i < objects.length - 1; i++)
        objects[i].x += gridSize;
    break;
    case "up":
      for(var i = 0; i < objects.length - 1; i++)
        objects[i].y -= gridSize;
    break;
    case "down":
      for(var i = 0; i < objects.length - 1; i++)
        objects[i].y += gridSize;
    break;
  }
  invalidate();
}

function sizeCanvas() {
  VHEIGHT = window.innerHeight;
  VWIDTH = window.innerWidth;

  if (VHEIGHT != HEIGHT || VWIDTH != WIDTH) {
    canvas.setAttribute("height", VHEIGHT);
    canvas.setAttribute("width", VWIDTH);

    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    
    invalidate();
  }
}

//wipes the canvas context
function clear(c) {
  c.clearRect(0, 0, WIDTH, HEIGHT);
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
function draw() {
  if (canvasValid == false) {
    sizeCanvas();
    clear(ctx);
    clear(tctx);

    
    // Add stuff you want drawn in the background all the time here
    drawGrid();

    // draw all boxes
    var l = objects.length;
    for (var i = 0; i < l; i++) {
      drawObject(ctx, objects[i], objects[i].f);
    }

    var l = tools.length;
    tctx.strokeStyle = "#eee";
    tctx.lineWidth = 2;
    for (var i = 0; i < l; i++) {
      drawObject(tctx, tools[i], tools[i].f);
      tctx.beginPath();
      tctx.moveTo(tools[i].x, tools[i].y + tools[i].h + 2);
      tctx.lineTo(tools[i].x + tools[i].w + 2, tools[i].y + tools[i].h + 2);
      tctx.lineTo(tools[i].x + tools[i].w + 2, tools[i].y - 1);
      tctx.stroke();
    }
    
    // draw selection
    // right now this is just a stroke along the edge of the selected box
    if (mySel != null) {
      ctx.strokeStyle = mySelColor;
      ctx.lineWidth = mySelWidth;
      ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
    }
    
    // Add stuff you want drawn on top all the time here
    // drawDebug();

    canvasValid = true;
  }
}

// Draws a single shape to a single context
// draw() will call this with the normal canvas
// myDown will call this with the ghost canvas
function drawObject(context, object, fill) {
  if(fill == 't')
    context.fillStyle = 'transparent';
  else
    context.fillStyle = fill;
  
  // We can skip the drawing of elements that have moved off the screen:
  if (object.x > WIDTH || object.y > HEIGHT) return; 
  if (object.x + object.w < 0 || object.y + object.h < 0) return;
  
  context.fillRect(object.x, object.y, object.w, object.h);

  if (context != gctx || context != gtctx) {
    //drawBlock(object);
    if(object.m == true) {
      drawMetaTool(context, object);
      return;
    }
    
    n = object.n;
    b = blocks[object.n];

    var img = document.getElementById("terrain");
    if(object.r != 0) {
      var destX = destY = 0;
      var scaleX = scaleY = 1;
      context.save();

      if(object.r == 90) {
        destX = object.x + 0;
        destY = object.y + object.h;
      } else if(object.r == 180) {
        destX = object.x + object.w;
        destY = object.y + object.h;
      } else if(object.r == 270) {
        destX = object.x + object.w;
        destY = object.y + 0;
      }

      context.translate(destX, destY);
      
      if(object.o != blockOrientations.none) {
        if(object.o == blockOrientations.horiz) {
          scaleX = -1;
          context.translate(object.w, 0);
        }  
        else if(object.o == blockOrientations.vert) {
          scaleY = -1;
          context.translate(0, -object.h);
        }
        context.scale(scaleX, scaleY);
      }

      context.rotate((360 - object.r) * (Math.PI / 180));

      context.drawImage(img, b[0], b[1], b[2], b[3], 0, 0, gridSize + 1, gridSize + 1);
      context.restore();
    } else {
      newH = (b[2] / 16) * gridSize;
      newW = (b[3] / 16) * gridSize;
      context.drawImage(img, b[0], b[1], b[2], b[3], object.x, object.y, newH, newW); //gridSize + 1, gridSize + 1);
    }
  }
}

function drawMetaTool(context, o) {
  img = document.getElementById("extras");
  b = blocks.extras[o.n];
  context.drawImage(img, b[0], b[1], b[2], b[3], o.x, o.y, gridSize + 1, gridSize + 1);
}

function eraseObjects(){
  if(confirm("Delete all the blocks?") && objects.length > 0) {
    if(activeTool) {
      var tool = objects.pop();
      objects = [];
      objects.push(tool);
    } else {
      objects = [];
    }
    invalidate();
  }
}

function clearTool() {
  if(activeTool) {
    objects.splice(objects.length - 1, 1);
    activeTool = null;
    mySel = null;
    isDrag = false;
    invalidate();
  }
}

// Snap the box to the closest grid
function alignObj() {
  if(mySel == null)
    return;

  offX = mySel.x % gridSize;
  offY = mySel.y % gridSize;

  if(offX != 0 || offY != 0) {
    if(offX <= gridSize / 2)
      mySel.x -= offX;
    if(offX > gridSize / 2)
      mySel.x += gridSize - offX;

    if(offY <= gridSize / 2)
      mySel.y -= offY;
    if(offY > gridSize / 2)
      mySel.y += gridSize - offY;
  }
  invalidate();
}

// Happens when the mouse is moving inside the canvas
function myMove(e){
  if (isDrag){
    getMouse(e);
    
    mySel.x = mx - offsetx;
    mySel.y = my - offsety;   
    
    // something is changing position so we better invalidate the canvas!
    invalidate();
  }
  if (isScroll) {
    getMouse(e);
    
    for(var i = 0; i < objects.length; i++) {
      objects[i].x += (mx - msx);
      objects[i].y += (my - msy);
    }

    msx = mx;
    msy = my;
    invalidate();
  }
  if (activeTool == undefined || activeTool == null)
    return;
  if (isDragDraw && activeTool.m == undefined || isDragDraw && !activeTool.m) {
    // Else we're just clicking and dragging the empty canvas.
    getMouse(e);
    var lastX, lastY, diffX, diffY;
    if(objects.length > 0) {
      lastObj = objects[objects.length - 2];
      lastX = lastObj.x;
      lastY = lastObj.y;
    } else
      lastX = lastY = 0;

    diffX = mx - lastX; //lastX - mx;
    diffY = my - lastY; //lastY - my;
    if(diffX >= gridSize || diffX < 0 || diffY >= gridSize || diffY < 0){ 
      alignObj();
      drawCurrentTool();
    }
  }else if(isDragDraw && activeTool.m) {
      useEraser(e);
  }
}

// Happens when the mouse is clicked in the canvas
function myDown(e){
  getMouse(e);
  clear(gctx);

  if(e.shiftKey) {
    scrollCanvas(e);
    return;
  }

  if(activeTool) {
    if(activeTool.m) {
      metaToolClicked(e);
      isDragDraw = true;
      canvas.onmousemove = myMove;
      return;
    }
    // Remove the current tool
    objects.splice(objects.length - 1);

    // Check if we've selected a block on the canvas,
    // if so, add a new tool and return.
    if(checkObjectClicked()) {
      return;
    }
    
    // Add a block to the canvas and set it to the current object, then align it.
    drawCurrentTool();
    alignObj();

    // Add a new tool
    drawCurrentTool();
  }
  
  isDragDraw = true;
  canvas.onmousemove = myMove;

  // havent returned means we have selected nothing
  //mySel = null;
  // clear the ghost canvas for next time
  clear(gctx);
  // invalidate because we might need the selection border to disappear
  invalidate();
}

function metaToolClicked(e) {
  if(activeTool.n == 'eraser')
    useEraser(e);
}

function useEraser(e) {
  getMouse(e);
  clear(gctx);

  // Remove the current tool.
  //objects.splice(objects.length - 1, 1);
  objects.pop();
  // Check to see if we've selected an object.
  var l = objects.length;
  for (var i = l-1; i >= 0; i--) {
    // draw shape onto ghost context
    drawObject(gctx, objects[i], 'black');

    // get image data at the mouse x,y pixel
    var imageData = gctx.getImageData(mx, my, 1, 1);
    var index = (mx + my * imageData.width) * 4;

    // if the mouse pixel exists, select and break
    if (imageData.data[3] > 0) {
      objects.splice(i, 1);
      invalidate();
      clear(gctx);
      // add the Tool back
      addObj(mx - (activeTool.w / 2), my - (activeTool.h / 2), activeTool.h, activeTool.w, activeTool.f, activeTool.n, activeTool.r, activeTool.o);
      objects[objects.length - 1].m = true;
      mySel = objects[objects.length - 1];
      return true;
    }
  }

  addObj(mx - (activeTool.w / 2), my - (activeTool.h / 2), activeTool.h, activeTool.w, activeTool.f, activeTool.n, activeTool.r, activeTool.o);
  objects[objects.length - 1].m = true;
  mySel = objects[objects.length - 1];

  // havent returned means we have selected nothing
  //mySel = null;
  // clear the ghost canvas for next time
  clear(gctx);
  // invalidate because we might need the selection border to disappear
  invalidate();
}

function scrollCanvas(e) {
  isScroll = true;
  getMouse(e);
  msx = mx;
  msy = my;
}

function drawCurrentTool() {
  addObj(mx - (activeTool.w / 2), my - (activeTool.h / 2), activeTool.h, activeTool.w, activeTool.f, activeTool.n, activeTool.r, activeTool.o);
  mySel = objects[objects.length - 1];  
}

function myToolboxDown(e){
  getMouseInToolbox(e);
  clear(gtctx);

  if(checkToolClicked())
    return;

  // havent returned means we have selected nothing
  mySel = null;
  // clear the ghost canvas for next time
  clear(gtctx);
  // invalidate because we might need the selection border to disappear
  invalidate();
}

function checkObjectClicked() {
  // Check to see if we've selected an object.
  var l = objects.length;
  for (var i = l-1; i >= 0; i--) {
    // draw shape onto ghost context
    drawObject(gctx, objects[i], 'black');
    
    // get image data at the mouse x,y pixel
    var imageData = gctx.getImageData(mx, my, 1, 1);
    var index = (mx + my * imageData.width) * 4;
    
    // if the mouse pixel exists, select and break
    if (imageData.data[3] > 0) {
      /*var tmp = objects.splice(i, 1);
      objects.push(tmp);
      mySel = objects[objects.length - 1];*/
      var tmp = objects[i];
      objects.splice(i, 1);
      objects.push(tmp);
      mySel = objects[objects.length - 1];
      //mySel = objects[i];
      offsetx = mx - mySel.x;
      offsety = my - mySel.y;
      mySel.x = mx - offsetx;
      mySel.y = my - offsety;
      isDrag = true;
      oldActiveTool = activeTool;
      activeTool = null;
      setCursor();
      canvas.onmousemove = myMove;
      invalidate();
      clear(gctx);
      return true;
    } 
  }
  return false;
}

function checkToolClicked() {
  // Check to see if we're selecting a tool
  l = tools.length;

  for(var i = 0; i < l; i++) {
    drawObject(gtctx, tools[i], 'black');

    var imageData = gtctx.getImageData(mx, my, 1, 1);
    if(imageData.data[3] > 0) {
      if(activeTool)
        objects.pop(); //objects.splice(objects.length - 1, 1);
      t = tools[i];
      addObj(mx - (t.w / 2), my - (t.h / 2), t.h, t.w, t.f, t.n, t.r, t.o);
      mySel = objects[objects.length - 1];
      activeTool = objects[objects.length - 1];
      offsetx = mx - mySel.x;
      offsety = my - mySel.y;
      mySel.x = mx - offsetx;
      mySel.y = my - offsety;
      if(t.m) {
        mySel.m = true;
        activeTool.m = true;
      }      
      isDrag = true;
      canvas.onmousemove = myMove;
      invalidate();
      clear(gtctx);
      return true;
     }
  }
  return false;
}

function zoom(dir) {
  var min = gridSizeMinMax[0];
  var max = gridSizeMinMax[1];
  var oldSize = gridSize;

  if(dir == "in") {
    if(gridSize >= max)
      return;
    gridSize += 16;
  }else if(dir == "out") {
    if(gridSize <= min)
      return;
    gridSize -= 16;
  }
  invalidate();
  drawTools();
  sizeToolbox();
  resizeObjects(dir, oldSize);
  setCookie("gridSize", gridSize, 365);
}

function resizeObjects(dir, oldSize) {
  for(var i = 0; i < objects.length; i++) {
    objects[i].h = gridSize;
    objects[i].w = gridSize;
    mySel = objects[i];

    // Get the object's old ratio to apply to the new position.    
    xRatio = objects[i].x / oldSize;
    yRatio = objects[i].y / oldSize;

    objects[i].x = gridSize * xRatio;
    objects[i].y = gridSize * yRatio;

  }
  for(var j = 0; j < tools.length; j++) {
    tools[j].h = gridSize;
    tools[j].w = gridSize;

    /*xRatio = tools[j].x / oldSize;
    yRatio = tools[j].y / oldSize;

    tools[j].x = gridSize * xRatio;
    tools[j].y = gridSize * yRatio;*/
  }
}

function myUp(){
  if(activeTool == null && oldActiveTool != null) {
    //isDrag = false;
    //canvas.onmousemove = null;
    alignObj();
    activeTool = oldActiveTool;
    oldActiveTool = null;
    setCursor();
    addObj(mx - (activeTool.w / 2), my - (activeTool.h / 2), activeTool.h, activeTool.w, activeTool.f, activeTool.n, activeTool.r, activeTool.o);
    mySel = objects[objects.length - 1];
  }
  if(isScroll) {
    var tmpSel = mySel;
    for(var i = 0; i < objects.length; i++) {
      mySel = objects[i];
      alignObj();
    }
    mySel = tmpSel;
    isScroll = false;
  }
  if(isDragDraw) {
    isDragDraw = false;
  }

}

function mouseHasMoved() {
  if(Math.abs(msx - mx) > 5 || Math.abs(msy - my) > 5)
    return true;
}


function setCursor() {
  if(oldActiveTool)
    document.body.style.cursor = 'move';
  else
    document.body.style.cursor = 'default';
}

// Delete the object on doubleclick
function myDblClick(e) {
  getMouse(e);
  clear(gctx);
  if(activeTool == undefined || activeTool == null)
    return;

  // Remove the current tool.
  objects.splice(objects.length - 1, 1);
  // Check to see if we've selected an object.
  var l = objects.length;
  for (var i = l-1; i >= 0; i--) {
    // draw shape onto ghost context
    drawObject(gctx, objects[i], 'black');

    // get image data at the mouse x,y pixel
    var imageData = gctx.getImageData(mx, my, 1, 1);
    var index = (mx + my * imageData.width) * 4;

    // if the mouse pixel exists, select and break
    if (imageData.data[3] > 0) {
      objects.splice(i, 1);
      invalidate();
      clear(gctx);
      // add the Tool back
      addObj(mx - (activeTool.w / 2), my - (activeTool.h / 2), activeTool.h, activeTool.w, activeTool.f, activeTool.n, activeTool.r, activeTool.o);
      mySel = objects[objects.length - 1];    
      return true;
    }
  }

  addObj(mx - (activeTool.w / 2), my - (activeTool.h / 2), activeTool.h, activeTool.w, activeTool.f, activeTool.n, activeTool.r, activeTool.o);
  if(activeTool.m)
    objects[objects.length - 1].m = true;
  mySel = objects[objects.length - 1];    

  // havent returned means we have selected nothing
  //mySel = null;
  // clear the ghost canvas for next time  
  clear(gctx);
  // invalidate because we might need the selection border to disappear
  invalidate();
  
}

function invalidate() {
  canvasValid = false;
}

// Sets mx,my to the mouse position relative to the canvas
// unfortunately this can be tricky, we have to worry about padding and borders
function getMouse(e) {
      var element = canvas, offsetX = 0, offsetY = 0;

      if (element.offsetParent) {
        do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
      }

      // Add padding and border style widths to offset
      offsetX += stylePaddingLeft;
      offsetY += stylePaddingTop;

      offsetX += styleBorderLeft;
      offsetY += styleBorderTop;

      mx = e.pageX - offsetX;
      my = e.pageY - offsetY
}

function getMouseInToolbox(e) {
  var element = toolcanvas, offsetX = 0, offsetY = 0;

  if (element.offsetParent) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  offsetX += toolboxStylePaddingLeft;
  offsetY += toolboxStylePaddingTop;

  offsetX += toolboxStyleBorderLeft;
  offsetY += toolboxStyleBorderTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY
}

function drawGrid() {
  ctx.beginPath();
  for (var x = gridSize + 0.5; x < WIDTH; x += gridSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
  }

  for (var y = gridSize + 0.5; y < HEIGHT; y += gridSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
  }

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = gridWidth;
  ctx.stroke();
}

var offset = 0;

function toolboxFlyout(cat) {
  tools = [];
  if(cat == "All"){
    $.each(toolCats, function(k, v) {
      $.each(toolCats[k], function(i, v) {
        addTool(toolCats[k][i], 0);
      })
      if(k == "Tracks")
        addRotatedTracks();
    });
  } else {
    $.each(toolCats[cat], function(i, v) {
      addTool(toolCats[cat][i], 0);
    });
  }
  if(cat == "Tracks")
    addRotatedTracks();
  if(cat == "Tools")
    addMetaTools();
  else
    calcToolDimensions();
  
  sizeToolbox();
  //$("#toolbox-wrapper").css("right", -gridSize - 14);
  $("#toolbox-list li a").removeClass("active");
  $("#toolbox-list li."+cat+" a").addClass("active");
  $("#toolbox-wrapper").show();
}

function addRotatedTracks() {
  addTool('rail-curve', 90, 16, 16);
  addTool('rail-curve', 180, blockOrientations.vert, 16, 16);
  addTool('rail-curve', 90, blockOrientations.horiz, 16, 16);
  addTool('rail-straight', 90, 16, 16);
}

function addMetaTools() {
  addExtraTool('eraser', 0);
}

function initTools() {
  var toolBox = "";
  $.each(toolCats, function(key, value) {
    $("#toolbox-list").append('<li class="' + key + '"><a onclick="toolboxFlyout(\'' + key + '\');" href="#" class="active vtip" title="Show ' + key + ' blocks."><img src="/images/tools/' + key.toLowerCase() + '.png" /> </a></li>');
  });
  vtip();

  if(currToolboxSize != gridSize) {
    $("#toolbox-list img").height(currToolboxSize);
    $("#toolbox-list a").width(currToolboxSize);
  } else {
    $("#toolbox-list img").height(gridSize);
    $("#toolbox-list a").width(gridSize);
  }
}

function calcToolDimensions() {
  var ratio = gridSize / 16;
  for(i = 0; i < tools.length; i++) {
    tools[i].w = blocks[tools[i].n][2] * ratio;
    tools[i].h = blocks[tools[i].n][3] * ratio;
  }
}

function drawTools() {
  var toolX = 0;
  var toolY = 0;

  for(i = 0; i < tools.length; i++) {
    tools[i].y = toolY;
    tools[i].x = toolX;
    toolY += tools[i].h + 3;
    if(toolY > ((gridSize + 3) * 11)) {
      toolX += gridSize + 3;
      toolY = 0;
    }
  }
}

function sizeToolbox() {
  //toolcanvas.setAttribute("height", tools.length * (gridSize + 3) - 2);
  //toolcanvas.setAttribute("width", gridSize);

    if (tools.length >= 12) {
      toolcanvas.setAttribute("height", 12 * (gridSize + 3) - 2);
      toolcanvas.setAttribute("width", Math.ceil(tools.length / 12) * (gridSize + 3) - 3);
    } else {
      toolcanvas.setAttribute("height", tools.length * (gridSize + 3) - 2);
      toolcanvas.setAttribute("width", gridSize);
    }
    ghosttoolcanvas.height = toolcanvas.height;
    ghosttoolcanvas.width = toolcanvas.width;

  if(!lockToolboxSize) {  
    currToolboxSize = gridSize;
    $("#toolbox-list img").height(gridSize);
    $("#toolbox-list a").width(gridSize);
    $("#toolbox-wrapper").css("right", -(Math.ceil(tools.length / 12) * (gridSize + 3)) - 12);
  } else {
    $("#toolbox-wrapper").css("right", -(Math.ceil(tools.length / 12) * (gridSize + 3)) - 12);  
  }
  drawTools();

}

function toggleToolboxLock() {
  if(lockToolboxSize) {
    $(".lockToolbox").attr("src", "/images/icons/lock_open.png");
    $(".lockToolbox").attr("title", "Toolbox size is unlocked.  Click to lock.");
    $(".lockToolbox").css("background-color", "transparent");
    lockToolboxSize = false;
    setCookie("lockToolboxSize", "", -1);
  } else {
    $(".lockToolbox").attr("src", "/images/icons/lock.png");
    $(".lockToolbox").attr("title", "Toolbox size is locked.  Click to unlock.");
    $(".lockToolbox").css("background-color", "orangered");
    lockToolboxSize = true;
    currToolboxSize = gridSize;
    setCookie("lockToolboxSize", currToolboxSize, 365);
  }
}

function drawDebug() {
  var bottom = HEIGHT - 100;
  var right = WIDTH - 50;

  ctx.fillStyle = "orangered";
  ctx.font = "10px sans-serif";
  ctx.fillText("mx: " + mx, right, bottom);
  ctx.fillText("my: " + my, right, bottom + 10);
}

function createLinks() {
  var bitlyUrl;
  $("#bitly-link").css("background", "#fff url('/images/spinner.gif') no-repeat 10px center");
  $("#links").fadeIn('slow');
  enc = encodeObjects();
  generateBitlyUrl(enc);
  $("#full-link").val("http://"+hostname+"/?md=" + enc);
  $("#bitly-link").val(bitlyUrl);
}

function generateBitlyUrl(enc) {
  var url = "http://"+hostname+"/?md="+enc;
  var bitlyUser = "minedraft";
  var bitlyKey = "R_f2239290351ea78c03e76d513099b4dd";
  var bitlyUrl;

  $.ajax({
    url:"http://api.bit.ly/v3/shorten",
    data:{longUrl:url, apiKey:bitlyKey, login:bitlyUser},
    dataType:"jsonp",
    success:function(v) {
      bitlyUrl = v.data.url;
      $("#bitly-link").css("background-image", "none");
      $('#bitly-link').val(bitlyUrl);
      $('#html-link').val('<a href="'+ bitlyUrl +'">My Minedraft</a>');
      $('#reddit-link').val('[My Minedraft]('+ bitlyUrl +')');
      $('#bbcode-link').val('[url='+ bitlyUrl +']My Minedraft[/url]');
    }
  });

  return bitlyUrl + "::";
}

function encodeObjects() {
  var toEncode, clean = [], tmp;
  // Encode all the objects except the current tool.
  if(activeTool)
    objects.pop();
  toEncode = objects;

  
  // Clean up the data a bit before we encode it.
  $.each(objects, function(key, value) {
    tmp = [];
    tmp.push(value.x);
    tmp.push(value.y);
    tmp.push(value.h);
    tmp.push(value.w);
    tmp.push(value.n);
    if(value.r != 0 || value.o != blockOrientations.none) {
      tmp.push(value.r);
      tmp.push(value.o);
    }
    clean.push(tmp);
  });  
  //alert(JSON.stringify(clean));
  return Base64.encode(JSON.stringify(clean));
}

function decodeObjects() {
  var mdParam = $.url.param('md');
  var tmp = [];

  if(mdParam != ""){
    try{
      tmp = JSON.parse(Base64.decode(mdParam));
    
      $.each(tmp, function(i, v) {
        if(v.length == 3)
          addObj(v[0], v[1], 16, 16, 't', v[2], 0, blockOrientations.none);
        else if(v.length == 5)
          addObj(v[0], v[1], v[2], v[3], 't', v[4], 0, blockOrientations.none);
        else if(v.length == 7)
          addObj(v[0], v[1], v[2], v[3], 't', v[4], v[5], v[6])
      });
    } catch(err) {
      $("body").append('<div id="parseError" class="overlay"><div class="close"><img src="/images/icons/cancel.png" onclick="$(\'#parseError\').toggleFade();" alt="Close Help" /></div><h1>Error</h1><p>Sorry, there was a problem parsing the URL you specified.  It may have been munged at some point and the MineDraft it pointed to can\'t be found.</p></div>');
      $("#parseError").toggleFade();
    }
  }
}

function setCookie(c_name, value, expires) {
  var date = new Date();
  date.setDate(date.getDate() + expires);
  document.cookie = c_name + "=" + escape(value) + ((expires == null) ? "" : ";expires=" + date.toUTCString());
}

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start += c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1)
        c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end)); 
    }
  }
  return "";
}

function supports_canvas() {
  return !!document.createElement('canvas').getContext;
}

function toggleMaterials(){
  $("#materials").toggleFade();
  if(objects.length == 0) {
    $("#materials-list").html("<p>Nothing needed yet....</p>");
    return;
  }

  var results = [];
  var str = "<ul>";

  for (var i = 0; i < objects.length; i++) {
    var key = objects[i].n;
    if(!results[key])
      results[key] = 1;
    else
      results[key] += 1;
  }

  for (var j in results) {
    str += "<li>" + j.replace(/-/gi, " ").capitalize() + ": " + results[j];
    if(results[j] > 64) {
      str += " [" + Math.floor(results[j] / 64);
      str += Math.floor(results[j] / 64) == 1 ? " stack" : " stacks";
      if(results[j] % 64 != 0)
        str += " +" + results[j] % 64 + " blocks";
      str += "]";
    }
    str += "</li>";
  }

  str += "</ul>";  
  $("#materials-list").html(str);
}

function objectsSort(a, b) {
  if(a.n > b.n)
    return 1;
  if(a.n < b.n)
    return -1;
  return 0;
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
