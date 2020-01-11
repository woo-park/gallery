// our video object
var capture;

// an image object to "memorize" the previous frame of video
var compareFrame;

// threshold to see how tolerant we should be
var threshold = 20;

// motion object
var motionObject;

function setup() {
  createCanvas(320, 240);

  // start up our web cam
  capture = createCapture({
    video: {
      mandatory: {
        minWidth: 320,
        minHeight: 240,
        maxWidth: 320,
        maxHeight: 240
      }
    }
  });
  capture.hide();

  // create an empty image that will hold a previous frame of video
  compareFrame = new p5.Image(320, 240);

  // create our motion object
  motionObjectX = 100;
  motionObjectY = 100;
  motionObjectWidth = 50;
  motionObjectHeight = 50;

  motionObject = new movingRegion(motionObjectX, motionObjectY, motionObjectWidth, motionObjectHeight);

}

function draw() {
  // adjust threshold based on the mouse position
  threshold = map(mouseX, 0, width, 0, 100);

  // expose the pixels in our video stream
  capture.loadPixels();
  compareFrame.loadPixels();

  // if we have pixels to work with ...
  if (capture.pixels.length > 0) {

    // ask our motion object to move
    motionObject.move();

    // draw our video
    image(capture, 0, 0);

    // ask our motion object to determine if it has been hit
    motionObject.checkHit();

    // ask our motion object to display itself
    motionObject.display();

    // important - this frame of video becomes our comparision frame for the next iteration of 'draw'
    compareFrame.copy(capture, 0, 0, 320, 240, 0, 0, 320, 240);
  }
}


function movingRegion(x, y, w, h) {
  // store our working values
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  // speed values
  this.xSpeed = 1;
  this.ySpeed = 2;

  // keep track of how many times this object has been hit
  this.hitCount = 0;

  // move this object
  this.move = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // bouncing logic
    if (this.x < 0) {
      this.x = 0;
      this.xSpeed *= -1;
    }
    if (this.y < 0) {
      this.y = 0;
      this.ySpeed *= -1;
    }
    if (this.x + this.w > width) {
      this.x = width - this.w;
      this.xSpeed *= -1;
    }
    if (this.y + this.h > height) {
      this.y = height - this.h;
      this.ySpeed *= -1;
    }
  }

  // display this object
  this.display = function() {
    noFill();
    stroke(0, 255, 0);
    rect(this.x, this.y, this.w, this.h);
    text("Hits: " + this.hitCount, this.x + 10, this.y + 10);
  }

  // determine if this object has been hit
  this.checkHit = function() {
    // assume no motion
    var movedPixels = 0;

    stroke(0,255,0);

    // note - we have to account for the fact that the video is being scaled 2x which
    // is why we divide the position & size of the region we are looking for by 2
    for (var x = this.x; x < this.x + this.w; x++) {
      for (var y = this.y; y < this.y + this.h; y++) {
        // compute 1D location
        var loc = (x + y * capture.width) * 4;

        // determine if there is motion here
        if (dist(capture.pixels[loc], capture.pixels[loc + 1], capture.pixels[loc + 2], compareFrame.pixels[loc], compareFrame.pixels[loc + 1], compareFrame.pixels[loc + 2]) > threshold) {

        // draw a point here if there is some motion
        point(x,y);

        movedPixels += 1;
        }
      }
    }

    // if we have 20% motion then we can qualify this as a hit
    if (movedPixels / (this.w * this.h / 2) > 0.2) {
      this.hitCount += 1;
    }
  }
}
