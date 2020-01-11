
let capture;

/****************************** motion playing ******************************/

let ellipsePosY
let ellipsePosX


/****************************** motion detection ******************************/

// an image object to "memorize" the previous frame of video
let compareFrame;

// an image object to display the result of the background removal algorithm
let mergedFrame;

let motionLocationTotalX = 0;
let motionLocationTotalY = 0;
let motionNumPixels = 0;

let centerX = 0;
let centerY = 0;

/****************************** motion detection ******************************/


let r = 0;
let g = 0;
let b = 0;

let scalingFactor = 2;
let threshold = 20;


let matchingArray;


let img1;
function preload() {
  img1 = loadImage('./assets/ufo.png');
}

let inc = 0;

function setup() {
  createCanvas(600, 600);


  capture = createCapture({   //webcam configs
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

  // stroke(0,255,0);
  noFill();
  rectMode(CENTER);


  // create an empty image that will hold a previous frame of video
  compareFrame = new p5.Image(width, height);

  // create an empty image that will hold the result of the background removal algorithm
  mergedFrame = new p5.Image(width, height);



} //end of setup


let hitCount = 0;
let movedPixels
function draw() {
   inc += 0;
  capture.loadPixels(); // to get the pixels of webcam video
  compareFrame.loadPixels();
  mergedFrame.loadPixels();



  let diff = 0;
  console.log(hitCount);


  if(capture.pixels.length > 0 && compareFrame.pixels.length > 0) { //only when pixels are loaded

    motionLocationTotalX = 0;
    motionLocationTotalY = 0;
    motionNumPixels = 0;

    image(capture, 0, 0);

    matchingArray = [];



    for (let i = 0; i < capture.pixels.length; i += 4) { //loop by 4
      let match = dist(
        r,g,b,capture.pixels[i],capture.pixels[i+1],capture.pixels[i+2]
      );
      movedPixels = 0;
      if (match < threshold) {
        matchingArray.push(i);


      }


      if (dist(capture.pixels[i], capture.pixels[i+1], capture.pixels[i+2], compareFrame.pixels[i], compareFrame.pixels[i+1], compareFrame.pixels[i+2]) < threshold) {
        // this pixel is very similar - do nothing with it
        mergedFrame.pixels[i] = capture.pixels[i];
        mergedFrame.pixels[i+1] = capture.pixels[i+1];
        mergedFrame.pixels[i+2] = capture.pixels[i+2];
        mergedFrame.pixels[i+3] = 255;


      }
      else {
        // this pixel is very different - make it blue to mark it as a "motion" pixel
        mergedFrame.pixels[i] = 28
        mergedFrame.pixels[i+1] = mergedFrame.pixels[i-3];
        mergedFrame.pixels[i+2] = mergedFrame.pixels[i-3];
        mergedFrame.pixels[i+3] =
        mergedFrame.pixels[i-3];

        // keep track of this position


          motionLocationTotalX += (i/4)%width;
          motionLocationTotalY += (i/4)/width;

          motionNumPixels++;
          diff++;




      }


    }

    if (movedPixels / (width * height / 2) > 0.2) {
      hitCount += 1;
    }

    console.log(movedPixels);

    // for (let ep = ellipsePosY; ep < ellipsePosY + 640; ep += 4) {
    //   mergedFrame.pixels[ep] = 22;
    //   mergedFrame.pixels[ep + 1] = 22;
    //   mergedFrame.pixels[ep + 2] = 22;
    //   mergedFrame.pixels[ep + 3] = 255;
    // }

    // for (let y = ellipsePosY; y < ellipsePosY+ 60; y++) {
    //   for (let x = ellipsePosX; x < ellipsePosX + 60; x++) {
    //     // let index = (x + y * 60) * 4;
    //     //
    //     // //
    //     // mergedFrame.pixels[index] = 22;
    //     // mergedFrame.pixels[index + 1] = 22;
    //     // mergedFrame.pixels[index + 2] = 22;
    //     // mergedFrame.pixels[index + 3] = 255;
    //
    //
    //     let c = color(204 - x, 153 - y, 0);
    //     mergedFrame.set(x, y, c);
    //     // mergedFrame.set(x, y, 0);
    //     // mergedFrame.setAlpha(128 + 128 * sin(millis() / 1000));
    //     // mergedFrame.set(x, y, img1);
    //   }
    // }


    mergedFrame.updatePixels();
    image(mergedFrame, 0, 0);

    if (motionNumPixels > 1000) {
      centerX = (motionLocationTotalX / motionNumPixels);
      centerY = (motionLocationTotalY / motionNumPixels);
    }


    // important - this frame of video becomes our comparision frame for the next iteration of 'draw'
    if (diff !== 0) {
      compareFrame.copy(capture, 0, 0, width, height, 0, 0, width, height);
    }


    if (matchingArray.length > 0) {   // if the match is found
                                  //matching array holds the index number

      let xSum = 0;
      let ySum = 0;

      // stroke(0, 255, 0);
      strokeWeight(0);

      // for (let i = 0 ; i < matchingArray.length; i ++) {
      //     // point((matchingArray[i] / 4) % 320, (matchingArray[i] / 4) / 320);
      //     xSum += (matchingArray[i] / 4) % 320;   //320 is the width
      //     ySum += (matchingArray[i] / 4) / 320;
      // }
      matchingArray.forEach((each)=>{
        // point( (each / 4) % 320, (each/4) / 320 );
        xSum += (each / 4) % width;   //320 is the width
        ySum += (each / 4) / width;
      })


      var xPos = xSum / matchingArray.length;
      var yPos = ySum / matchingArray.length;

      // stroke(255,0,0);
      // strokeWeight(10);
      ellipse(xPos, yPos, width * 2/3, height * 2/3);



          // fill(255);
          // ellipse(xPos, yPos, 25, 25);

          // ellipse(xPos + 100, yPos, 10, 10);
          // ellipse(xPos - 100, yPos, 10, 10);

          push()
          imageMode(CENTER)
          translate(xPos + 100, yPos);
          rotate(inc);
          image(img1, 0 , 0);
          pop()

          push()
          imageMode(CENTER)
          translate(xPos - 100, yPos);
          rotate(inc);
          image(img1, 0 , 0);
          pop()




          imageMode(CORNER)
          fill(255, 255, 255, 40);

          ellipsePosX = xPos;
          ellipsePosY = yPos;
          // ellipse(ellipsePosX, ellipsePosY, 200, 200);

      //rect boundary
    }
  }
} // end of draw
function keyPressed() {
  console.log(motionLocationTotalX,centerY)
}

function mousePressed() {

  // memorize the color the user is clicking on
  var loc = int( (mouseX + mouseY * capture.width) * 4);
  r = capture.pixels[loc];
  g = capture.pixels[loc + 1];
  b = capture.pixels[loc + 2];

  console.log("Looking for: R=" + r + "; G=" + g + "; B=" + b);
}















//draw something on one's face
//or an photo tint app
// filter on video
// for this assignment - will use the webcam, but in the future, the filter will be applied to the provided videos



/*
creating a program that utilizes at least one of the tracking techniques

Fiducial marker tracking (augmented reality)
Face detection
Motion detection
Brightness tracking
Color tracking
Hardware tracking (Kinect & Leap)

Create a game where a character is constantly running forward — then use a webcam to detect motion and steer the character left and right as the user waves his or her hand in certain regions of the video stream. Create obstacles and other features as necessary.

Create an augmented reality installation that detects multiple markers. Each marker can be a physical “button” that triggers some event in a program.
Have the user put on a special glove that has colored markers on the fingertips. Write a drawing program that lets the user paint in 2D on the screen.

You could also use this assignment as a way to build out a component of your final project that will be using tracking techniques.

Documentation
 Include a playable version of your project or video if that isn't possible (i.e if you are using a Kinect or a Leap you won't be able to ensure that your users will have the necessary hardware installed).

 Also include a brief written overview of your design process. Keep in mind that you are writing for an audience that is potentially bigger than just our class,

  so make your post interesting and include additional multimedia (images, videos, etc) as appropriate. Also submit your source code to NYU Classes.

 */
