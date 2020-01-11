//############################################################################################################//
/*






On Tuesday's class you will work in teams to create a simple physical controller for your game using a Makey Makey keyboard emulator.
We will go over how to do this in class, but you will be responsible to building a controller an documenting it using text, images and/or video.

Documentation

Create a web page that showcases your game called "assignment03.html"
- this page should be linked from your main "interactive" page (index.html).

Include a playable version of your game.

Also include a brief written overview of your design process and any inspirations that led you to try and build this kind of game.
Keep in mind that you are writing for an audience that is potentially bigger than just our class,
so make your post interesting and include multimedia (images, videos, etc) as appropriate.
Also document your physical controller with a written description images and/or video.

*/
// three and a half days to make it

// inspiration? mc escher. waves. escape. vectors. lines.

// need images

// need controller -- to be safe, use 'wsad' for now
// need character
// need obstacle
    // that moves
// need collision detection
// need sound when colliding

// need pause mode
// need start mode

// need levels
    // change speed, or number of obstacle increases

//############################################################################################################//
// preload images
let user_left, user_right;
let enemy_left, enemy_right;
let floor_background;
let key_graphic;

let player1;

let keys = [];
// points
let points = 0;

var counter = 0;
var maxCounter = 0;

function preload() {
  user_left = loadImage('./images/user_left.png');
  user_right = loadImage('./images/user_right.png');
  enemy_left = loadImage('./images/enemy_left.png');
  enemy_right = loadImage('./images/enemy_right.png');
  floor_background = loadImage('./images/floor_background.jpg');
  key_graphic = loadImage('./images/key_graphic.png');

  // see the 'index.html' file in this sketch folder - it contains a
  // div named '#p5_loading' - this div will be displayed while the
  // preload() function is operating - once it completes the div will
  // automatically be hidden
  //for now we have 6 temp pics - but the more we have, longer the load will be -- will come in handy
  for(let i = 0; i < 49; i ++) { //so if i have to load up a lot of images, and from different directory, i can use this method
    maxCounter++;

    let customImage = loadImage('./images_custom/' + i + '.png', updateCounter);  // its a callback //look at chapter 07 for multiple directories
  } // could use this for tile or background -
}


function updateCounter() {    // invoked inside the preload
  // increase our counter
  counter++;

  // use the counter to set the style on the '#progress_bar' div
  var progress_bar = select('#progress_bar');
  progress_bar.style('width', int(counter/maxCounter*100) + "%");
}

function setup() {
  let cx = createCanvas(500,500);
  cx.parent("#canvas_container");
  cx.style('display','block');
  cx.style('margin','auto');


  imageMode(CENTER);

  player1 = new Player();

  for(let i = 0; i < 20; i ++) {
    let randomX = random(0, 500)
    let randomY = random(0, 500)
    keys[i] = new Objects(20, randomX, randomY, 2, 2)
  }

  // repositionCanvas(); //dont erase - this goes with repositionCanvas(){} and windowResized(){}
}



function draw() {
  // background(0);
  image(floor_background, 250, 250);

  fill(255);
  text("Points: " + points, 20, 20);

  //!
  player1.move();
  player1.display();

  keys[1].display

  for(let i = 0; i < 10; i ++) {

    keys[i].display()

    if(keys[i].collision(player1.xPos, player1.yPos)){
      console.log('collision made!!')
      points += 1;
    }
    keys[i].move()
  }
  // console.log(keys)

}

class Player {
  constructor() {
    // initial pos
    this.xPos = 250;
    this.yPos = 250;

    // default facing left
    this.graphic_facing = user_left;
  }

  // this will display our player
  display() {
    // draw our player at their current position with the correct graphic
    image(this.graphic_facing, this.xPos, this.yPos);
  }

  // this will move our character
  move() {
    // figure out which key was pressed
    if (keyIsDown(LEFT_ARROW)) {
      this.xPos -= 5;
      this.graphic_facing = user_left;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.xPos += 5;
      this.graphic_facing = user_right;
    }
    if (keyIsDown(UP_ARROW)) {
      this.yPos -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.yPos += 5;
    }
  }

  // reset position of player
  reset() {
    this.xPos = 250;
    this.xPos = 250;
  }
}

// collect objectives
class Objects {

  constructor(size, xPos, yPos, xSpeed, ySpeed){
    this.size = size;
    this.xPos = xPos;
    this.yPos = yPos;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;

    // this.red = random(0, 255)
  }


  display () {
    image(key_graphic, this.xPos, this.yPos);
  }

  collision (x, y){                           // pass in players pos x and y !important
    if (dist(x, y, this.xPos, this.yPos) < 50) {   //50 detection point

      this.xPos = random(0, width);               //moving to random pos after colli
      this.yPos = random(0, height);

      return true;
    }
    return false;
  }

  move() {
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;

    if(this.xPos > width || this.xPos < 0) {
      this.xSpeed *= -1;
    }

    if(this.yPos > height || this.yPos < 0) {
      this.ySpeed *= -1;
    }
  }

  reset() {
    this.xPos = 100;
    this.yPos = 100;
  }
}






//##########################################################################//
// not doing anything but for later purposes
function repositionCanvas() {
  //// 'vanilla' JavaScript implementation

  // var xPos = int(windowWidth/2 - 0.5*width);
  // var yPos = int(windowHeight/2 - 0.5*height);

  // var canvasRef = document.querySelector('canvas');
  // canvasRef.style.position = 'absolute';
  // canvasRef.style.left = xPos + 'px';
  // canvasRef.style.top = yPos + 'px';

}

function windowResized() {
  repositionCanvas();
}
//##########################################################################//
