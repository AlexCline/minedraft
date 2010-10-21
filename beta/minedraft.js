var gridSize = 32;
var blocks = { 
  "grass": [0, 0, 16, 16],
  "stone": [16, 0, 16, 16],
  "dirt": [32, 0, 16, 16],
  "grassydirt": [48, 0, 16, 16],
  "wood": [64, 0, 16, 16],
  "step": [80, 0, 16, 8],
  "brick": [112, 0, 16, 16],
  "tnt": [128, 0, 16, 16],
  "cobblestone": [0, 16, 16, 16],
  "bedrock": [16, 16, 16, 16],
  "sand": [32, 16, 16, 16],
  "gravel": [48, 16, 16, 16],
  "stump": [80, 16, 16, 16],
  "iron": [96, 16, 16, 16],
  "gold": [112, 16, 16, 16],
  "diamond": [128, 16, 16, 16],
  "goldore": [0, 32, 16, 16],
  "ironore": [16, 32, 16, 16],
  "coalore": [32, 32, 16, 16],
  "mossycobblestone": [64, 32, 16, 16],
  "obsidian": [80, 32, 16, 16],
  "toolbox": [176, 32, 16, 16],
  "sponge": [0, 48, 16, 16],
  "glass": [16, 48, 16, 16],
  "diamondore": [32, 48, 16, 16],
  "redstoneore": [48, 48, 16, 16],
  "rail-curve": [0, 112, 16, 16],
  "rail-straight": [0, 128, 16, 16]
};

function drawBlocks() {
  var img = document.getElementById("terrain");
  var g = blocks.grass;
  ctx.drawImage(img, g[0], g[1], g[2], g[3], 96, 96, gridSize + 1, gridSize + 1);

}

// Object to hold data for all drawn items
function Obj() {
  this.x = 0;
  this.y = 0;
  this.w = gridSize + 1; // default width and height?
  this.h = gridSize + 1;
  this.fill = 'transparent';
  this.name = 'grass';
  this.rotate = 0;
  this.flip = "none";
}

//Initialize a new Box, add it, and invalidate the canvas
function addObj(x, y, fill, name, rotate, flip) {
  var obj = new Obj;
  obj.x = x;
  obj.y = y;
  obj.fill = fill;
  obj.name = name;
  if(rotate !== undefined)
    obj.rotate = rotate;
  if(flip !== undefined)
    obj.flip = flip;
  objects.push(obj);
  invalidate();
}

// Create a new Object and create a tool out of it.  The default values for objects are good enough for tools.
function addTool(name, rotate, flip) {
  var tool = new Obj;
  tool.name = name;
  tool.rotate = rotate;
  tool.flip = flip;
  tools.push(tool);
  invalidate();
}

// holds all our live objects
var objects = []; 
// Holds the items in the toolbar
var tools = [];

var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var INTERVAL = 20;  // how often, in milliseconds, we check to see if a redraw is needed

var isDrag = false;
var mx, my; // mouse coordinates

 // when set to true, the canvas will redraw everything
 // invalidate() just sets this to false right now
 // we want to call invalidate() whenever we make a change
var canvasValid = false;

// The node (if any) being selected.
// If in the future we want to select multiple objects, this will get turned into an array
var mySel; 

// The selection color and width. Right now we have a red selection with a small width
var mySelColor = '#CC0000';
var mySelWidth = 2;

// we use a fake canvas to draw individual shapes for selection testing
var ghostcanvas;
var gctx; // fake canvas context

// since we can drag from anywhere in a node
// instead of just its x/y corner, we need to save
// the offset of the mouse when we start dragging.
var offsetx, offsety;

// Padding and border style widths for mouse offsets
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;

// initialize our canvas, add a ghost canvas, set draw loop
// then add everything we want to intially exist on the canvas
function init() {
  canvas = document.getElementById('minedraft');
  HEIGHT = canvas.height;
  WIDTH = canvas.width;
  ctx = canvas.getContext('2d');
  ghostcanvas = document.createElement('canvas');
  ghostcanvas.height = HEIGHT;
  ghostcanvas.width = WIDTH;
  gctx = ghostcanvas.getContext('2d');
  
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
  
  // make draw() fire every INTERVAL milliseconds
  setInterval(draw, INTERVAL);
  
  // set our events. Up and down are for dragging,
  // double click is for making new boxes
  canvas.onmousedown = myDown;
  canvas.onmouseup = myUp;
  //canvas.ondblclick = myDblClick;
  
  // add custom initialization here:
  drawTools();
}

//wipes the canvas context
function clear(c) {
  c.clearRect(0, 0, WIDTH, HEIGHT);
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
function draw() {
  if (canvasValid == false) {
    clear(ctx);
    
    // Add stuff you want drawn in the background all the time here
    drawGrid();
    //drawTools();

    // drawBlocks();

    // draw all boxes
    var l = objects.length;
    for (var i = 0; i < l; i++) {
        drawObject(ctx, objects[i], objects[i].fill);
    }

    var l = tools.length;
    for (var i = 0; i < l; i++) {
        drawObject(ctx, tools[i], tools[i].fill);
    }
    
    // draw selection
    // right now this is just a stroke along the edge of the selected box
    if (mySel != null) {
      ctx.strokeStyle = mySelColor;
      ctx.lineWidth = mySelWidth;
      ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
    }
    
    // Add stuff you want drawn on top all the time here
    drawDebug();

    canvasValid = true;
  }
}

// Draws a single shape to a single context
// draw() will call this with the normal canvas
// myDown will call this with the ghost canvas
function drawObject(context, object, fill) {
  context.fillStyle = fill;
  
  // We can skip the drawing of elements that have moved off the screen:
  if (object.x > WIDTH || object.y > HEIGHT) return; 
  if (object.x + object.w < 0 || object.y + object.h < 0) return;
  
  context.fillRect(object.x, object.y, object.w, object.h);

  if (context == ctx) {
    //drawBlock(object);
    n = object.name;
    b = blocks[object.name];

    //alert(b);
    var img = document.getElementById("terrain");
    if(object.rotate != 0) {
      var destX = destY = 0;
      var scaleX = scaleY = 1;
      context.save();

      if(object.rotate == 90) {
        destX = object.x + 0;
        destY = object.y + object.h;
      } else if(object.rotate == 180) {
        destX = object.x + object.w;
        destY = object.y + object.h;
      } else if(object.rotate == 270) {
        destX = object.x + object.w;
        destY = object.y + 0;
      }

      context.translate(destX, destY);
      
      if(object.flip != "none") {
        if(object.flip == "horiz") {
          scaleX = -1;
          context.translate(object.w, 0);
        }  
        else if(object.flip == "vert") {
          scaleY = -1;
          context.translate(0, -object.h);
        }
        context.scale(scaleX, scaleY);
      }

      context.rotate((360 - object.rotate) * (Math.PI / 180));
      context.drawImage(img, b[0], b[1], b[2], b[3], 0, 0, gridSize + 1, gridSize + 1);
      context.restore();

    } else {
      context.drawImage(img, b[0], b[1], b[2], b[3], object.x, object.y, gridSize + 1, gridSize + 1);
    }
  }
}

function drawBlock(object) {
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
}

// Happens when the mouse is clicked in the canvas
function myDown(e){
  getMouse(e);
  clear(gctx);
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
      mySel = objects[i];
      offsetx = mx - mySel.x;
      offsety = my - mySel.y;
      mySel.x = mx - offsetx;
      mySel.y = my - offsety;
      isDrag = true;
      canvas.onmousemove = myMove;
      invalidate();
      clear(gctx);
      return;
    }
    
  }

  // Check to see if we're selecting a tool
  l = tools.length;
  for(var i = 0; i < l; i++) {
    drawObject(gctx, tools[i], 'black');

    var imageData = gctx.getImageData(mx, my, 1, 1);
    if(imageData.data[3] > 0) {
      t = tools[i];
      addObj(t.x, t.y, t.fill, t.name, t.rotate, t.flip);
      mySel = objects[objects.length - 1];
      offsetx = mx - mySel.x;
      offsety = my - mySel.y;
      mySel.x = mx - offsetx;
      mySel.y = my - offsety;
      isDrag = true;
      canvas.onmousemove = myMove;
      invalidate();
      clear(gctx);
      return;      
     }
  }

  // havent returned means we have selected nothing
  mySel = null;
  // clear the ghost canvas for next time
  clear(gctx);
  // invalidate because we might need the selection border to disappear
  invalidate();
}

function myUp(){
  isDrag = false;
  canvas.onmousemove = null;
  alignObj();
}

// adds a new node
function myDblClick(e) {
  getMouse(e);
  // for this method width and height determine the starting X and Y, too.
  // so I left them as vars in case someone wanted to make them args for something and copy this code
  var width = 32;
  var height = 32;
  addObj(mx - (width / 2), my - (height / 2), width, height, '#77DD44');
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

function drawGrid() {
  for (var x = gridSize + 0.5; x < WIDTH; x += gridSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
  }

  for (var y = gridSize + 0.5; y < HEIGHT; y += gridSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
  }

  ctx.strokeStyle = "#666";
  ctx.lineWidth = 1;
  ctx.stroke();
}

var offset = 0;
// Draw the toolbar
function drawTools() {
  addTool('grass', 0);
  addTool('sand', 0);
  addTool('rail-curve', 0);
  addTool('rail-curve', 90);
  addTool('rail-curve', 180, 'vert');
  addTool('rail-curve', 90, 'horiz');
  addTool('rail-straight', 0);
  addTool('rail-straight', 90);
  addTool('redstoneore', 0);
  addTool('diamondore', 0);

  for(i = 0; i < tools.length; i++) {
    tools[i].y = i * gridSize;
    drawObject(ctx, tools[0], tools[0].fill);
  }

  /*0 + offset, 0, 'darkcyan', 'grass');
  addTool(0, gridSize * 1, 'darkgoldenrod', 'redstone');
  addTool(0, gridSize * 2, 'transparent', 'rail-curve');
  addTool(0, gridSize * 3, 'transparent', 'rail-curve', 90);
  addTool(0 + offset, gridSize * 4, 'transparent', 'rail-straight');
  offset += 1;*/
}

function drawDebug() {
  var bottom = HEIGHT - 20;
  var right = WIDTH - 50;

  ctx.fillStyle = "orangered";
  ctx.font = "10px sans-serif";
  ctx.fillText("mx: " + mx, right, bottom);
  ctx.fillText("my: " + my, right, bottom + 10);
}