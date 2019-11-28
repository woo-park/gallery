 const socket = io();

document.addEventListener('DOMContentLoaded', function() {
    const player1Btn = document.querySelector('.player1Btn');
    const player2Btn = document.querySelector('.player2Btn');
    const racer = document.querySelector('.racer');
    let player1pos = document.querySelector('.player1');
    let player2pos = document.querySelector('.player2');

    let p1currentPos = player1pos.style.left;
    let p2currentPos = player2pos.style.left;

//
    player1Btn.addEventListener('click', function() {
      socket.emit('move_player1', {xPos: p1currentPos})  //temp 50
    });
    player2Btn.addEventListener('click', function() {
      socket.emit('move_player2', {xPos: p2currentPos})
    });

// set initial pos
    socket.on('init',function(data){
      p1_init = data.initialPos_p1
      p2_init = data.initialPos_p2

      player1pos.style.left = p1_init + 'px';
      player2pos.style.left = p2_init+ 'px';
    })

//listen from server player1
    socket.on('move_player1', function(data) {
      let newPosX = data.newPosX;
      player1pos.style.left = newPosX+'px';
    });

//listen from server player2
    socket.on('move_player2', function(data) {
      let newPosX = data.newPosX;
      player2pos.style.left = newPosX+'px';
      recposy += 1;
      console.log(recposy,'recposy')
    });
});


/*********************************************************/
// this works - creating an individual canvas perhaps - change recposx
// let myrect;
// let recposx = 0;
// let recposy = 0;
// let sketch1 = function(p) {
//
//   p.setup = function() {
//     let cx = p.createCanvas(500, 500);
//   }
//
//   p.draw = function() {
//     p.background('grey');
//     p.push();
//
//     p.translate(p.width/2, p.height/2);
//     p.rotate( p.radians(45) );
//
//     p.rectMode(p.CENTER);
//     myrect = p.rect(recposx,recposy,100,100);
//
//     p.pop();
//   }
// }
// new p5(sketch1, 'canvas1');
/*********************************************************/


/*********************************************************/
//this works too, BUT downside to this is interaction is limited
class Player {                            // #############################################################
    constructor(xPos = 200, yPos = 250, id) {
      // initial pos
      this.xPos = xPos;
      this.yPos = yPos;
      this.id = id;

      // default facing left

    }

    reset() {
      this.xPos = Math.floor((Math.random() * 500) + 1);
      this.yPos =  Math.floor((Math.random() * 500) + 1);
    }

    update_pos(arg1, arg2) {                         // #############################################################
      this.xPos = arg1;
      this.yPos = arg2;
    }

    display() {
      ellipse(this.xPos, this.yPos, 30, 30);
    }
}


var myrect;
let myelli;

var recposx = 0;
var recposy = 0;
let elliposx = 0;
let elliposy = 0;

// let player1;
//
// player1 = new Player(120, 40);
let playerArrayClient = [];
let numberOfPlayers = [];
socket.on('newplayer', function(data) {
  playerArrayClient.push(new Player(120, data.ypos));
})

socket.on('currentPlayers', function(data) {
  numberOfPlayers = data.currentPlayers;
  console.log(numberOfPlayers,'hi there');

  numberOfPlayers.forEach((each)=> {
    playerArrayClient.push(new Player(each.xPos, each.yPos, each.userId));

  });
  // playerArrayClient.push(new Player(numberOfPlayers.for))
});

function setup() {
  console.log('ay?')
  createCanvas(500, 500);

}

// function setup() {
// 	noCanvas();
//
// 	world = new World('VRScene');
//
// 	// box primitive
// 	var b = new Box({
// 						x:0, y:1, z:0,
// 						width:1, height: 1.2, depth: 2,
// 						red:random(255), green:random(255), blue:random(255)
// 					});
// 	world.add(b);
//
// 	// create a plane to serve as our "ground"
// 	var g = new Plane({x:0, y:0, z:0, width:100, height:100, red:0, green:102, blue:153, rotationX:-90, metalness:0.25});
//
// 	// add the plane to our world
// 	world.add(g);
// }



let pushthis = false;

function draw() {
  background('grey')

  push();

  translate(width/2, height/2);
  rotate( radians(45) );

  rectMode(CENTER);
  myrect = rect(recposx,recposy,100,100);
  // myelli = ellipse(elliposx, elliposy, 50,50);

  pop();

    // player1.display();

  for (let i = 0; i < playerArrayClient.length; i++) {
    playerArrayClient[i].display();
  }
  emitEvent('move_player1')
}

function emitEvent(arg,obj,time = 1000,) {
  let send = false;
  if (keyIsPressed) {
    // console.log('key is pressed')
    send = true;
  }
  if(send == true) {
    socket.emit(arg,obj)
  }
  send = false;
  // setTimeout(()=>{   //use this if you wanna move a little more after the key is released
  //   send = false;
  // },time)
}

function keyPressed() {
  // pushthis = true
  playerArrayClient.forEach((each)=>{
    if (socket.id == each.id){
      each.xPos += 10;
      emitEvent('myPlayerMove', {playerid: socket.id})


    }
  });
}

socket.on('playerMoved', function(data){
  playerArrayClient.forEach((each)=>{
    if (data.id == each.id){
      // console.log(data.newPosX,'newposx')
      each.xPos = data.newPosX;
    }
  });
});

socket.on('disconnect', function(data) {
  console.log('number of players: ', playerArrayClient.length)
  for (let j = 0; j < playerArrayClient.length; j++) {
      if (playerArrayClient[j].id == data.id) {
        playerArrayClient.splice(j, 1);
        j-=1;
      }
  }
  console.log(socket.id, 'good bye!');
  console.log('number of players: ', playerArrayClient.length)


});




/*********************************************************/
