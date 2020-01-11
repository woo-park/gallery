// presenttoday// one player, one presenttoday, one rock, rock direction

var link;


// var presenttodayObjective;


var points = 0;


// var octo;


// so the rock is the rocks
// presenttodays are the present
//work with one image
// move leftward
// character only up and down


let penguin1;
let penguin2;
let penguin3;
let penguin4;

let stone1
let stone2
let stone3

let present1
let present2
let present3

let penguinarray
// preload assets
function preload() {

  penguin1 = loadImage('images/penguin1.png');
  penguin2 = loadImage('images/penguin2.png');
  penguin3 = loadImage('images/penguin3.png');
  penguin4 = loadImage('images/penguin4.png');
  present1 = loadImage('images/present1.png');
  present2 =loadImage('images/present2.png');
  present3 = loadImage('images/present3.png');
  snow = loadImage('images/snow.png');
  stone1 = loadImage('images/stone1.png');
  stone2 =loadImage('images/stone2.png');
  stone3 = loadImage('images/stone3.png');
  stonearray = [stone1, stone2, stone3];
  presentarray = [present1, present2, present3];
  penguinarray = [penguin1, penguin2, penguin3, penguin4];
}

let stonearray
let presentarray
let mypresent = [];

let stoneobj = [];
function setup() {
  createCanvas(800, 500);

  link = new Player();


  for (let i = 0; i < 5; i++){
      mypresent[i] = new Presenttoday();
  }

  for (let i = 0; i < 5; i++){
      stoneobj[i] = new Rock();
  }


  //
  // octo = new rock();
  // stoneobj = new Rock();



  // imageMode(CENTER);
}

//presents
//crashes
let present_points = 0;
let crash_points = 0;


function keyPressed(){

  link.move();
}
function draw() {
  // image(floor_background, 250, 250);
  background(0)

  fill(255);
  // text("Points: " + points, 20, 20);
  text("presents: " + present_points, width -100, 20);

  text("crashes: " + crash_points, width-100, 30);


  // ask our player to move itself
  // ask our player object to display itself
  // link.move();
  link.display();
  if (frameCount % 5 == 0){
      link.changegraphic();
  }



  for (let i = 0; i < 5; i++){
      stoneobj[i].display()
      stoneobj[i].move();
      if (stoneobj[i].detectHit(link.xPos, link.yPos)) {
        crash_points -= 1;
      }
  }
  // stoneobj.display();
  // stoneobj.move();
  // ask our presenttoday to display itself
  // presenttodayObjective.display();
  // if (stoneobj.detectHit(link.xPos, link.yPos)) {
  //   crash_points -= 1;
  // }


  for (let i = 0; i < 5; i++){
      mypresent[i].display();
      mypresent[i].move();
      if(mypresent[i].detectHit(link.xPos, link.yPos)){
        present_points += 1
      }
  }
  // mypresent.display();
  //
  // if(mypresent.detectHit(link.xPos, link.yPos)){
  //   present_points += 1
  // }

}

class Player {
  constructor() {
    this.xPos = 0;
    this.yPos = 0;


    this.myGraphic = penguin1;
  }

  changegraphic() {
    this.myGraphic = penguinarray[Math.floor(Math.random() * 4)];
  }

  display() {
    image(this.myGraphic, this.xPos, this.yPos);
  }


  move() {
    if (keyIsDown(UP_ARROW)) {
      this.yPos -= 100;   //change to 100
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.yPos += 100;
    }
  }

  reset() {
    this.xPos = 250;
    this.xPos = 250;
  }
}




// our Key class - this is our character's objective
class Presenttoday {
  constructor() {

    this.xPos = width + random(1000);
    // this.yPos = ranpos[Math.floor(Math.random() * 5)]; //okay works
    this.yPos = ranpos[Math.floor(Math.random() * 5)];
    this.graphic = presentarray[Math.floor(Math.random() * 3)];
  }

  // display our present
  display() {
    image(this.graphic, this.xPos, this.yPos);
  }

  move() {
    this.xPos -= 3;

    if (this.xPos < -100) {
      this.xPos = width + random(1000);
      this.yPos = ranpos[Math.floor(Math.random() * 5)];
    }
  }

  // x and y arg is the link(player's) postition
  detectHit(x, y) {
    if (dist(x,y, this.xPos, this.yPos) < 50) {
      // crash_points = crash_points -1;
      this.xPos = width + random(1000);
      this.yPos = ranpos[Math.floor(Math.random() * 5)];

      return true;
    }
    return false;
  }

  reset() {
    this.xPos = 100;
    this.yPos = 100;
  }
}


let ranpos = [0, 100, 200, 300, 400]
class Rock {
  constructor() {
    this.xPos = width + random(1000);
    // this.yPos = ranpos[Math.floor(Math.random() * 5)]; //okay works
    this.yPos = ranpos[Math.floor(Math.random() * 5)];

    // which graphic should the rock be using?
    // this.myGraphic = stone1;
    this.myGraphic = stonearray[Math.floor(Math.random() * 3)];
  }

  display() {
    image(this.myGraphic, this.xPos, this.yPos);
  }

  detectHit(x, y) {
    if (dist(x,y, this.xPos, this.yPos) < 50) {
      // crash_points = crash_points -1;
      this.xPos = width + random(1000);
      this.yPos = ranpos[Math.floor(Math.random() * 5)];
      return true;
    }
    return false;
  }

  reset() {
    this.xPos = width + 100;
    this.yPos = random(0, height);
  }

  move() {
    this.xPos -= 3;

    if (this.xPos < -100) {
      this.xPos = width + random(1000);
      this.yPos = ranpos[Math.floor(Math.random() * 5)];
    }
  }
}
