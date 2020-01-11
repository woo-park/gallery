// our video object
var capture;

// an image object to "memorize" the previous frame of video
var compareFrame;

// threshold to see how tolerant we should be
var threshold = 40;

// motion object
var motionObject;


let row_count = 0;
let col_count = 0;

function setup() {
  createCanvas(500, 500);

  // start up our web cam
  capture = createCapture({
    video: {
      mandatory: {
        minWidth: width,
        minHeight: height,
        maxWidth: width,
        maxHeight: height
      }
    }
  });
  capture.hide();

  // create an empty image that will hold a previous frame of video
  compareFrame = new p5.Image(width, height);

  // create our motion object
  motionObjectX = 100;
  motionObjectY = 100;
  motionObjectWidth = 50;
  motionObjectHeight = 50;

  // motionObject = new movingRegion(motionObjectX, motionObjectY, motionObjectWidth, motionObjectHeight);

  motionObject2 = new movingRegion(motionObjectX, motionObjectY, motionObjectWidth, motionObjectHeight);

  motionObject3 = new movingRegion(motionObjectX, motionObjectY, motionObjectWidth, motionObjectHeight);

  motionObject4 = new movingRegion(motionObjectX, motionObjectY, motionObjectWidth, motionObjectHeight);

  motionObject5 = new movingRegion(motionObjectX, motionObjectY, motionObjectWidth, motionObjectHeight);

  motionObject = [];
  row_count = 0;


  // for (let i = 0; i < 20; i ++) {     //works but not accurate
  //   motionObject[i] = [];
  //   for (let q = 0; q < 20; q ++) {
  //     motionObject[i][q] = new movingRegion(motionObjectX * i, motionObjectY * q, motionObjectWidth, motionObjectHeight);
  //   }
  // }


  for (let i = 0; i < width; i += motionObjectWidth) {
    motionObject[row_count] = [];
    col_count = 0;
    for (let q = 0; q < height; q += motionObjectHeight) {

      motionObject[row_count][col_count] = new movingRegion(i, q, motionObjectWidth, motionObjectHeight);
      col_count += 1;
    }

    row_count += 1;
  }


  console.log(motionObject);

}

xpos= 0;
ypos = 0;
function draw() {
  // adjust threshold based on the mouse position
  // threshold = map(mouseX, 0, width, 0, 100);

  // expose the pixels in our video stream
  capture.loadPixels();
  compareFrame.loadPixels();

  // if we have pixels to work with ...
  if (capture.pixels.length > 0) {
    //
    // // ask our motion object to move
    // motionObject.move(xpos,ypos);
    // motionObject2.move(xpos + motionObject.w, ypos + motionObject.h);
    // motionObject3.move(xpos + 200,ypos);
    // motionObject4.move(xpos + 300,ypos);
    // motionObject5.move(xpos + 400,ypos);

    // xpos+=1
    // ypos+=1
    // draw our video
    image(capture, 0, 0);


    // motionObject.checkHit();// ask our motion object to determine if it has been hit
    // motionObject.display();// ask our motion object to display itself

    // motionObject2.checkHit();
    // motionObject2.display();
    //
    // motionObject3.checkHit();
    // motionObject3.display();
    //
    // motionObject4.checkHit();
    // motionObject4.display();
    //
    // motionObject4.checkHit();
    // motionObject4.display();


      for (let j = 0; j < motionObject.length; j++) {
        for (let k = 0; k < motionObject[j].length; k++) {
            motionObject[j][k].checkHit();
            motionObject[j][k].display();
        }
      }


    // important - this frame of video becomes our comparision frame for the next iteration of 'draw'
    compareFrame.copy(capture, 0, 0, width, height, 0, 0, width, height);
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
  this.move = function(arg1, arg2) {
    this.x = arg1
    this.y = arg2
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

function mousePressed(){
  xpos = mouseX;
  ypos = mouseY;
}
