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

let image1;

let counter_acc = 0
function preload() {
  image1 = loadImage('images/coin.png');
}


function setup() {
  createCanvas(500, 500);
  noiseDetail(24);

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
}

xpos= 0;
ypos = 0;
let ranX = 0;
let ranY = 0;
function draw() {
  // adjust threshold based on the mouse position
  // threshold = map(mouseX, 0, width, 0, 100);

  // expose the pixels in our video stream
  capture.loadPixels();
  compareFrame.loadPixels();

  // if we have pixels to work with ...
  if (capture.pixels.length > 0) {

    // ask our motion object to move
    // motionObject.move(xpos,ypos);
    // xpos+=1
    // ypos+=1


    // draw our video
    image(capture, 0, 0);

    if(frameCount % 13 == 0) {
      ranX = random(-1, 1);
      ranY = random(-1, 1);
    }
    // ask our motion object to determine if it has been hit
    // ask our motion object to display itself
      // for (let j = 0; j < motionObject.length; j++) {
      //   for (let k = 0; k < motionObject[j].length; k++) {
      //       // motionObject[j][k].move(ranX, ranY)
      //       motionObject[j][k].checkHit();
      //       motionObject[j][k].display();
      //       motionObject[j][k].hitCountAction();
      //   }
      // }



    motionObject.forEach((each) => {    //foreach faster
      each.forEach((item) => {
        let hitting = item.checkHit();


        if (hitting) {
          item.display();
          item.hitCountAction();
        } else{
          item.display();
          item.counterCountAction();
        }
        console.warn(hitting);

      })
    })



    // important - this frame of video becomes our comparision frame for the next iteration of 'draw'
    compareFrame.copy(capture, 0, 0, width, height, 0, 0, width, height);
  }
}

let action = false;
function movingRegion(x, y, w, h) {
  // store our working values
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  // this.boxColor = null;  //nah
  this.borderColor = 'black';

  this.randomVal1 = Math.floor(random(-2,2));
  this.randomVal2 = Math.floor(random(-2,2));

  // compute a perlin noise offiset
  this.noiseOffsetX = random(0, 1000);
  this.noiseOffsetY = random(0, 1000);

  // speed values
  this.xSpeed = 1;
  this.ySpeed = 2;

  // keep track of how many times this object has been hit
  this.hitCount = 0;

  this.counterCountAction = function() {

    image1.sizeX -= 0.1;
    image1.sizeY -= 0.1;
  }

  this.hitCountAction = function(arg1) {

      this.borderColor = 'white';
      // var xMovement = map(noise(this.noiseOffsetX), 0, 1, -5, 5);    // too expensive move here
      // var yMovement = map(noise(this.noiseOffsetY), 0, 1, -5, 5);
      //
      // this.x += xMovement;
      // this.y += yMovement;

      // this.move(random(-2,2),random(-2,2))

      this.x += this.randomVal1;    //cheaper solution so
      this.y += this.randomVal2;
      action = true;

      let bigger = () => {
        image1.sizeX += 0.1
        image1.sizeY += 0.1
      }


      // if (this.hitCount > 10) {     //buying some time here
      //     this.hitCount = 0;      //restore
      // } else {
        bigger();
      // }

      if (image1.sizeX > image1.sizeLimit) {
          this.hitCount = 0;      //restore
      }


      // console.warn(this)
      // this.noiseOffsetX += 0.05;
      // this.noiseOffsetY += 0.05;

  }


  // move this object
  this.move = function(arg1, arg2) {
    // if we have any arg ->
    // this.x = this.x + arg1
    // this.y = this.y + arg2

    // this.x += xMovement;
    //
    // if (this.x > width) {
    //   this.x = 0;
    // }
    //
    // if (this.x < 0) {
    //   this.x = width;
    // }
  }
  image1.sizeX = 50;
  image1.sizeY = 20;
  image1.sizeLimit = 80;
  // display this object
  this.display = function() {
    // noFill(); //moved to action == false
    stroke(this.borderColor);

    rect(this.x, this.y, this.w, this.h);

    image(image1, this.x, this.y, image1.sizeX, image1.sizeY);

    if (this.x > width) {
      this.x = 0;
    }

    if (this.x < 0) {
      this.x = width;
    }

    if (this.y > height) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.x = height;
    }


    text("Hits: " + this.hitCount, this.x + 10, this.y + 10);

    image1.sizeX = constrain(image1.sizeX, 0, image1.sizeLimit)
    image1.sizeY = constrain(image1.sizeY, 0, image1.sizeLimit) // 80 and 60 original size
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

        if(action == true) {
            // fill('grey');

            // fill('blue')

            // setTimeout(()=>{
            //   action = false
            // }, 10)
        } else {
          noFill();
        }

        // determine if there is motion here
        if (dist(capture.pixels[loc], capture.pixels[loc + 1], capture.pixels[loc + 2], compareFrame.pixels[loc], compareFrame.pixels[loc + 1], compareFrame.pixels[loc + 2]) > threshold) {

        // draw a point here if there is some motion
        //!important
        // point(x,y);

        movedPixels += 1;
        }
      }
    }

    // if we have 20% motion then we can qualify this as a hit
    if (movedPixels / (this.w * this.h / 2) > 0.2) {
      this.hitCount += 1;
    }


    if (this.hitCount > 5) {
      counter_acc += 1;
      return true;
    } else {
      return false;
    }
  }
}


// function colorAt(pixArray, camWidth, x, y) {   //reference
//   let idx = 4*int(y * camWidth + x);
//   return [pixArray[idx],
//     pixArray[idx + 1],
//     pixArray[idx + 2],
//     pixArray[idx + 3]
//   ];
// }




function mousePressed(){
  xpos = mouseX;
  ypos = mouseY;
}
