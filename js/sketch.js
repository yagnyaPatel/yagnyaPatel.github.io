var cols, rows;
var scl = 50;
var w = 2000;
var h = 2000;

var flying = 0;

var terrain = [];

function setup() {
  var canv = createCanvas(windowWidth, windowHeight, WEBGL);
  canv.parent('waves');
  cols = w / scl;
  rows = h/ scl;
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {

  flying -= 0.03;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -10, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  if (night) {
    background(23,28,40);
  }else{
    background(0,0,0);
  }
  translate(0, 60);//(horizaontal shift, vertical shift)
  rotateX(PI/2.3);
  fill(255,255,255,0);
  stroke(31,55,112,0);
  translate(-w/2, -h/2);
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
