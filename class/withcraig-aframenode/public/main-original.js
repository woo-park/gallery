/*

3. moving container for and backward with sensor infront of it

4. rotating the container right now

5. client listens to how much one should rotate '-1'

*/
// let world
function preload() {
  // noCanvas();
  // world = new World('VRScene');
}



let world;


let firstScreen;
let tempBox;
let tornado;
function initScreen() {

	firstScreen = new Plane({
		side:'double',
		red: 180, green: 180, blue: 180,
		opacity:0.8,
		width: 10,
		x:-10, y:1, z:-10,
		height: 10
	});
	world.camera.cursor.addChild(firstScreen);

	if(firstScreen) {		//just to ensure
		firstScreen.tag.setAttribute('text',
			    `value: Welcome! Here are some descriptions\n
									Your only goal is to find the treasure\n
									So look around how many are also online\n
									And be the first one to find it!
									;
					width:8;
					color: rgb(0,0,0);
					align: center;`
				);
	}

	//// create a plane to serve as a holder for our text
	textHolder = new Plane({
		side:'double',
		red: 180, green: 180, blue: 180,
		opacity:0.8,
		width: 4.5,
		x:10, y:2, z:-10,
		height: 2.5,


	});
	world.camera.cursor.addChild(textHolder);


	// tempBox = new Box({
	// 							x:0, y:0, z:0,
	// 							width:1, height: 2, depth: 1,
	// 							red:255, green:0, blue:0
	// 						});

			tempBox = new OBJ({
								asset: 'tornado_obj',
								mtl: 'tornado_mtl',
								x: 0,
								y: 0,
								z: 0,
								rotationX:0,
								rotationY:0,
								rotationZ:0,
								scaleX:0.5,
								scaleY:0.5,
								scaleZ:0.5
						});
	tempBox.myValue = 0;

	world.add(tempBox);
}
let gameStarted = false;

let action1 = true;
let action2 = true;
let action3 = true;
let action4 = true;
//
// let amount1 = -0.03;
// let amount2 = -0.03;
// let amount3 = 0.03;
// let amount4 = 0.03;
let tempor = 1;
let sequential_moving = () => {

				// let sequence = async function() {
				// 	let amount1 = -0.01;
				// 	let amount2 = -0.01;
				// 	let amount3 = 0.01;
				// 	let amount4 = 0.01;
				// 	let first = await new Promise((resolve, reject) => {
				// 			// tempBox.spinY(1);
				// 			if(action1 == true){
				// 				tempBox.nudge(amount1,0,0);
				// 				tempBox.spinY(1);
				// 			}
				//
				//
				// 			setTimeout(()=>{
				// 					action1 = false;
				// 					action2 = true;
				// 					resolve('first finished');
				// 					amount1 = 0;
				// 			}, 1000)
				// 	}).then((val) => console.log(val))
				//
				// 	let second = await new Promise((resolve, reject) => {
				//
				// 			// tempBox.spinZ(1)
				// 			if (action2) {
				// 					tempBox.nudge(0,0,amount2);
				// 			}
				//
				//
				// 			setTimeout(()=>{
				// 					resolve('second finished');
				// 					action2 = false;
				// 					action3 = true;
				// 					amount2 = 0;
				// 			}, 1000)
				//
				// 	}).then((val) => console.log(val))
				//
				// 	let third = await new Promise((resolve, reject) => {
				// 			// tempBox.spinY(1);
				// 			// tempBox.nudge(-0.05,0,0);
				// 			if (action3) {
				// 				tempBox.nudge(amount3,0,0);
				// 			}
				//
				//
				// 			setTimeout(()=>{
				// 					resolve('third finished');
				// 					action3 = false;
				// 					action4 = true;
				// 					amount3 = 0;
				// 			}, 1000)
				// 	}).then((val) => console.log(val))
				//
				// 	let fourth = await new Promise((resolve, reject) => {
				// 			// tempBox.spinY(1);
				// 			// tempBox.nudge(-0.05,0,0);
				// 			if (action4) {
				// 				tempBox.nudge(0,0,amount4);
				// 			}
				//
				// 			setTimeout(()=>{
				// 					resolve('fourth finished');
				// 					action4 = false;
				// 					action1 = true;
				// 					amount4 = 0;
				// 			}, 1000)
				// 	}).then((val) => console.log(val))
				//
				// }
				// sequence();
        let sequence = new Promise( (resolve, reject) => {      //center
					tempBox.spinY(tempor);
					tempBox.myValue += 1;


					if(tempBox.myValue == 360) {
						resolve('Success');
						tempBox.myValue = 0;
						tempor = tempor * -1;
					}
            // if(this.stem_finished) {
            //     push();
            //     noStroke();
            //     fill(this.ran_color);
            //     ellipseMode(CENTER);
            //     ellipse(this.x, this.stem_height, this.center_radius, this.center_radius)
            //     this.center_radius += this.radius_increment;
            //     this.center_radius = constrain(this.center_radius, 10, 10 + this.ran_radius)
            //     pop();
            //     if(this.center_radius == (10 + this.ran_radius)) resolve('Success!');
            // }
        });
				//
        sequence.then((value) => {
					console.log(tempBox.myValue)

					tempBox.myValue += 1;
					console.log(value)
					// for (let i = 0; i < 30; i ++) {
						tempBox.setScaleX((Math.random() * 2) + 0.3)
					// }
					console.log('spinning?')
					console.log(tempBox.myValue)


        // expected output: "Success!"          //width needs to vary
        })
				// .then(()=>{
				// 	tempBox.nudge(0,1,0);
				// 	console.log('hhuh')
				//
				//
        // });
    }



setTimeout(()=>{
	console.log(world.camera.cursor.children.length,'exists?');
	if (world.camera.cursor.children.length > 1){
		world.camera.cursor.removeChild(firstScreen);
		gameStarted = true;
	}
}, 4000)


// function timeTracker(timestamp){
// 	console.log(timestamp,'tmp stamp');
// 			timeTracker(timestamp);
// }
// // window.requestAnimationFrame(timeTracker);





function setup() {
	noCanvas();
  world = new World('VRScene');
  socket.emit('worldReady')

	currentTime = minute();
	currentSec = second();
	//world.camera.holder.setAttribute('wasd-controls','enabled:false');

	// create a plane to serve as our "ground"
	var ground = new Plane({x:0, y:0, z:0, width:worldSize, height:worldSize, rotationX:-90, metalness:0.25, asset:'asphalt'});
  ground.tag.object3D.userData.solid = true;
	// add the plane to our world
	world.add(ground);


	world.threeSceneReference.fog = new THREE.FogExp2( 0xffffff, 0.1)
	// world.cursorPosition.x = '-200px';
	// world.setFlying(true);
  console.log(playerArrayClient,'obj has not instantiated yet');

	initScreen();

	// set up initial user rotation
	setUserRotation()
	avatar = new OBJ({
		asset: 'plane_obj',
		mtl: 'plane_mtl',
		// x:each.xPos, y:each.yPos, z:each.zPos,
		z: -0.5, y: -0.5,
		rotationX:0,
		rotationY:180,
		rotationZ:0,
		scaleX:0.005,
		scaleY:0.007,
		scaleZ:0.002,
		clickFunction: function(e) {
			// e.setRed(random(255));
		}
	});

	// c.setPosition(0,-3,-5)
	world.camera.cursor.addChild(avatar);
	drawMap();
}

class Sensor {
  constructor() {
		// raycaster - think of this like a "beam" that will fire out of the
		// bottom of the user's position to figure out what is below their avatar
		this.rayCaster = new THREE.Raycaster();
		this.userPosition = new THREE.Vector3(0,0,0);
    this.frontVector = new THREE.Vector3(0,0,-1);

		this.rayCasterFront = new THREE.Raycaster();
		this.cursorPosition = new THREE.Vector2(0,0);
		this.intersectsFront = [];

	}

  getEntityInFrontOfUser() {
    // console.warn(arg1);
		// update the user's current position
        var cp = world.getUserPosition();    //difference?
        // var cp = arg1.getWorldPosition();
        this.userPosition.x = cp.x;
        this.userPosition.y = cp.y;
        this.userPosition.z = cp.z;
        //
        if (world.camera.holder.object3D.children.length >= 2) {
          this.rayCasterFront.setFromCamera( this.cursorPosition, world.camera.holder.object3D.children[1]);
          // this.rayCaster.set(this.userPosition, this.frontVector);
          this.intersectsFront = this.rayCasterFront.intersectObjects( world.threeSceneReference.children, true );

        }
        //
          // determine which "solid" items are in front of the user
          for (var i = 0; i < this.intersectsFront.length; i++) {
            if (!this.intersectsFront[i].object.el.object3D.userData.solid) {
              this.intersectsFront.splice(i,1);
              i--;
            }
          }
          // console.log(this.intersectsFront[0].object.el.object3D.userData.solid,'solid?');
          // console.log(this.intersectsFront.length);

          if (this.intersectsFront.length > 0) {
            // console.log(this.intersectsFront[0],'first')
            return this.intersectsFront[0];
          }
          return false;
	}
}





const socket = io();
let map;
//vr
let map1 = [
  [1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,3,0,3,0,0,0,0,1],
  [1,0,3,3,3,0,3,0,3,3,0,1],
  [1,0,0,0,0,0,3,0,3,0,0,1],
  [1,0,3,3,3,3,3,0,3,3,3,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,3,3,3,0,3,3,3,3,3,0,1],
  [1,0,0,3,0,3,0,0,0,0,0,1],
  [1,0,0,0,0,3,0,3,3,3,3,1],
  [1,0,3,0,0,3,0,0,0,0,0,1],
  [1,0,3,3,3,3,3,3,3,3,0,1],
  [1,0,3,5,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1]
];

let map2 = [
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,3,3,3,3,3,3,3,3,3,3,1],
	[1,3,0,0,0,0,0,0,0,0,3,1],
	[1,3,0,0,0,0,3,0,0,0,3,1],
	[1,3,0,0,0,0,0,0,0,0,3,1],
	[1,3,0,0,0,3,3,0,0,0,3,1],
	[1,3,0,0,0,3,3,0,0,0,3,1],
	[1,3,0,0,0,0,0,0,0,0,3,1],
	[1,3,0,0,0,0,0,0,0,0,3,1],
	[1,3,0,0,0,0,0,0,0,0,3,1],
	[1,3,0,0,0,0,0,0,0,0,3,1],
	[1,3,3,5,3,3,3,3,3,3,3,1],
	[1,1,1,1,1,1,1,1,1,1,1,1]
]

let map3 = [
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,3,3,3,3,3,3,0,3,0,5,1],
	[1,0,3,0,0,3,0,0,0,0,3,1],
	[1,0,3,0,0,0,3,0,3,0,0,1],
	[1,0,3,0,3,0,0,0,3,0,3,1],
	[1,0,3,0,3,3,3,0,3,0,0,1],
	[1,0,3,0,3,3,3,0,3,0,3,1],
	[1,0,0,0,3,0,0,0,0,0,0,1],
	[1,3,0,0,3,0,0,0,0,3,0,1],
	[1,3,0,0,3,0,0,0,0,3,0,1],
	[1,3,0,0,0,0,0,0,0,3,0,1],
	[1,3,3,5,3,3,3,3,3,3,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1]
]
map = map3;	//defines current map

let tileSize = 10;
let worldSize = 144;
let sensor;

let containerMap;







let playerArrayClient = [];
document.addEventListener('DOMContentLoaded', function() {


let container;

let initX;
let initY;
let initZ;
socket.on('init', function(data){
  initX = data.initX;
  initY = data.initY;
  initZ = data.initZ;

  //console.log(data.userId,'SOCKETID connected')

	let b = new OBJ({
		asset: 'plane_obj',
		mtl: 'plane_mtl',
		x:initX, y:initY, z:initZ,
		rotationX:0,
		rotationY:180,
		rotationZ:0,
		scaleX:0.005,
		scaleY:0.007,
		scaleZ:0.002,
    red:random(255), green:random(255), blue:random(255),
		clickFunction: function(e) {
			// e.setRed(random(255));
		}
	});
  // b.setGreen(green);
  b.id = data.userId;

});

});   //end of DOMContentLoaded

let playerArrayServer;

let loaded = false;
let textHolder;
// socket.on('currentPlayers', function(data) {    //display current players
//   // debugHelper();
//   playerArrayServer = data.currentPlayers;
//   playerArrayServer.forEach((each)=>{
//
//     let dup = false;
//     for (let i = 0; i < playerArrayClient.length; i++) {
//       if (each.userId === playerArrayClient[i].id) {
//         dup = true;
//         console.log("found a dup!");
//         break;
//       }
//     }
//
//     if (!dup) {
//         console.dir(each);
//         let b = new OBJ({
//       		asset: 'plane_obj',
//       		mtl: 'plane_mtl',
//     		  // x:each.xPos, y:each.yPos, z:each.zPos,
//           x:0, y:0, z:0,
//       		rotationX:0,
//       		rotationY:180,
//       		rotationZ:0,
//       		scaleX:0.005,
//       		scaleY:0.007,
//       		scaleZ:0.002,
//       		clickFunction: function(e) {
//       			// e.setRed(random(255));
//       		}
//       	});
//         b.id = each.userId;
//
//         console.log(each.xPos +' & '+ each.yPos +' & '+ each.yPos);
//         // i am getting 0, 0, 0 here, so trace back up
//
//         //!set the pos here
//         container = new Container3D({x:each.xPos, y:each.yPos, z:each.zPos});
//         //testing
//         console.log(each.yCurrentRotation,'retrived??');
//         container.spinY(each.yCurrentRotation);
//         console.log(container.rotationY,'applied??')
//         // {x:each.getX(), y:each.getY(), z:each.getZ()}
//
//         // add in a little "sensor" in front of the shark we will have the shark
//         // constantly move toward this sensor
//         // (give this box an opacity of 0.0 if you want to hide it)
//         let sensorBox = new Box({
//           x: 0,
//           y: 0,
//           z: -5,
//           opacity: 0.2
//         });
//         container.addChild(sensorBox);
//
//         container.addChild(b);
//         container.id = b.id
//
//         playerArrayClient.push(container)
//         // followMyObject();
//         world.add( container )
//
//
// 				// 1.
//
// 				// can add something to the cursor like this - > like a panel would be great
//
// 				// avatar = new OBJ({
//       	// 	asset: 'plane_obj',
//       	// 	mtl: 'plane_mtl',
//     		//   // x:each.xPos, y:each.yPos, z:each.zPos,
// 				// 	z: -0.5, y: -0.5,
//       	// 	rotationX:0,
//       	// 	rotationY:180,
//       	// 	rotationZ:0,
//       	// 	scaleX:0.005,
//       	// 	scaleY:0.007,
//       	// 	scaleZ:0.002,
//       	// 	clickFunction: function(e) {
//       	// 		// e.setRed(random(255));
//       	// 	}
//       	// });
// 				//
// 				// // c.setPosition(0,-3,-5)
// 				// world.camera.cursor.addChild(avatar);
// 				console.log(world.camera.holder.object3D.parent,'This is camera holder parent')
//
//
//
// 				//for displaying how many players online
// 				playerNum = playerArrayClient.length;
//
//
//
//
//     }
//   });
//   if (playerArrayClient.length > 0) {
//     drawMap();
//     sensor = new Sensor();
//     loaded = true;
//   }
/*
  console.log("adding to world logic triggering ....")
  playerArrayClient.forEach((each) => {
    if(each.id == socket.id){
        world.add(each);
        console.log("just added myself " + each.id + " to the world")  //nice it works
    } else {
      world.add(each);
      console.log("just added someone else " + each.id + " to the world")
    }
  });
*/

// });

function drawMap() {
  containerMap = new Container3D({x:-worldSize/2, y:0, z:-worldSize/2}); // move to the center

  for (var row = 0; row < map.length; row++) {
    for (var col = 0; col < map[row].length; col++) {

      var xPos = col * tileSize;
      var zPos = row * tileSize;
      var block = new Box({
          x:xPos, y:3, z:zPos,
          opacity: 0,
          width: tileSize,
          depth: tileSize,
          height: 5
          // red: random(100,240), green:random(100,240), blue:random(100,240)
      });
      block.tag.object3D.userData.solid = true;

      let tree1 = new OBJ({
					asset: 'tree1_obj',
					mtl: 'tree1_mtl',
					x: xPos,
					y: 0,
					z: zPos,
					rotationX:0,
					rotationY:90,
					rotationZ:0,
					scaleX:2.0,
					scaleY:2.0,
					scaleZ:2.0
      });





      let bush1 = new OBJ({
					asset: 'bush1_obj',
					mtl: 'bush1_mtl',
					x: xPos,
					y: -3,
					z: zPos,
					rotationX:0,
					rotationY:90,
					rotationZ:0,
					scaleX:(3.0 + Math.floor(Math.random())),
					scaleY:(2.0 + Math.floor(Math.random())),
					scaleZ:(3.0 + Math.floor(Math.random())),
      });

      tree1.tag.object3D.userData.solid = true;
      bush1.tag.object3D.userData.solid = true;


      if ( map[row][col] == 3 ) {
        containerMap.addChild(bush1);
      }
      else if ( map[row][col] == 1 ) {
        containerMap.addChild(tree1);
        containerMap.addChild(block);
      }
      // else if ( map[row][col] == 2 ) {
      //   container.addChild(block);
      // }
      else if ( map[row][col] == 5 ) {
        var treasure = new OBJ({
      		asset: 'treasure',
      		mtl: 'treasure_mtl',
      		x: xPos,
      		y: 3.5,
      		z: zPos,
      		rotationX:0,
      		rotationY:180,
      		scaleX:5,
      		scaleY:5,
      		scaleZ:5,
      	});
        var treasureBox = new Box({
          x:xPos, y:3, z:zPos,
          opacity: 0.1,
          width: tileSize/4,
          depth: tileSize/4,
          height: 1.5,
          red: random(100,240), green:random(100,240), blue:random(100,240),
          clickFunction: function(t) {
            console.log("Clicked");
            //Ideally we want to move the winning screen
          }
        });
        treasureBox.tag.object3D.userData.solid = true;
        containerMap.addChild(treasure);
        containerMap.addChild(treasureBox);
      }

    }
  }

  world.add(containerMap);

}


function mousePressed() {
  debugHelper();
  return false;
}

function debugHelper() {
  socket.emit('debug');
  playerArrayClient.forEach((each, index) => {
    console.log(`player${index}, x: ${each.getX()}, z: ${each.getZ()}, rotated: ${each.rotationY}`);
  });
}

let pushthis = false;
let pressed = false
var okToMove = false;
let objectAhead
let y;
let a;

let directionVec3;
function directionVec(){
	let tempBox = new Box({
                x:10, y:10, z:10,
                width:1, height: 2, depth: 1,
                red:255, green:0, blue:0
              });

  world.add(tempBox);
	console.log(tempBox)
	directionVec3 = new THREE.Vector3(tempBox.getWorldPosition.get);
	// console.log(directionVec3)
}

let myTimeMinute = 0;
let myTimeStamp = 0;
let currentTime;
let currentSec;
function draw() {
		y += 0.1
    let changed = false;

    if(loaded == true) {
      if( typeof(sensor) != 'undefined' ){
        // console.log(sensor)
        playerArrayClient.forEach((each) => {
          if (socket.id == each.id) {

            objectAhead = sensor.getEntityInFrontOfUser();


          }});
      }

    }




		if (keyIsDown(65)) {
			rotationY += 0.25
			setUserRotation()
			world.camera.holder.object3D.lookAt( rotationVector )
		}
		else if (keyIsDown(68)) {
			rotationY -= 0.25
			setUserRotation()
			world.camera.holder.object3D.lookAt( rotationVector )
		}
		else if (keyIsDown(87)) {
			setUserPosition(0.1)
		}
		else if (keyIsDown(83)) {
			setUserPosition(-0.1)
		}

		// else if (keyIsDown(UP_ARROW) && pressed || mouseIsPressed) {
    //   okToMove = true;
		//
    //   // if there is an object, it is close and it is solid, prevent motion
		//
    //   //!important - made it  0.25 to 3.25 bc 3 is the distance bt camera and object
    //   if (objectAhead && objectAhead.distance < 3.25 && objectAhead.object.el.object3D.el.object3D.userData.solid) {
    //     console.log("Blocked!");
    //     okToMove = false;
    //     nudgeForward(-0.1);    //hit the wall - nudge back
    //   }
		//
    //   if (okToMove) {
    //     // world.moveUserForward(0.1);
    //     changed = true;
    //     nudgeForward(0.05);
		// 		world.moveUserForward(0.05);
    //   }
    //   // socket.emit('moveMyPlayer', {playerId: socket.id, direction:keyCode}); //up
    // } else if ( keyIsDown(DOWN_ARROW) && pressed) {
		//
    //   okToMove = true;
		//
    //   // if there is an object, it is close and it is solid, prevent motion
    //   if (objectAhead && objectAhead.distance < 0.25 && objectAhead.object.el.object3D.el.object3D.userData.solid) {
    //     console.log("Blocked!");
    //     okToMove = false;
    //     nudgeForward(0.1);
    //   }
		//
    //   if (okToMove) {
    //     // world.moveUserForward(0.1);
    //     changed = true;
    //     nudgeForward(-0.05);
		//
    //   }
		//
    //   // socket.emit('moveMyPlayer', {playerId: socket.id, direction:keyCode}); //down
    // }

    if (changed == true) {
      //** emit the new position of THIS character // emit('setPos')

      playerArrayClient.forEach((each) => {
        if (socket.id == each.id) {

            //!important  // should this go 'here mark'
            socket.emit('sendBack_newPos', {
              newPosX:each.getWorldPosition().x,
              newPosY:each.getWorldPosition().y,
              newPosZ:each.getWorldPosition().z,
              userId:each.id,                               //THIS IS THE LAST ONE I CHANGED HERE   //CHECK AGAIN
              yCurrentRotation:each.rotationY
            });
            // console.log(each.getRotationY,'1')    //this one returns null
            console.log(each.rotationY,'2')
        }
      });
    }
  if(playerArrayClient.length > 0) {
    followMyObject();     //updates camera live
			sequential_moving();
  }

} // end of draw


function keyPressed(){
  pressed = true;

}

function keyReleased(){
  pressed = false;
}


socket.on('broadcast', function(data) {
  playerArrayClient.forEach((each) => {
    if (data.userId == each.id) {
       // each.setPosition(data.xPos,data.yPos,data.zPos)
      if (each.id == socket.id) {     //awesome
          //it's myself so skip
      } else {
        each.setPosition(data.xPos,data.yPos,data.zPos)
				each.rotateY(data.yCurrentRotation);					///chek
      }

    }

  });

});


function nudgeForward(nudgeAmount){
  playerArrayClient.forEach((each) => {
    if (socket.id == each.id) {
      let d = nudgeAmount;
      let vectorHUD = new THREE.Vector3();
      vectorHUD.setFromMatrixPosition(each.children[0].tag.object3D.matrixWorld);

      // now compute how far off we are from this position
      let xDiff = vectorHUD.x - each.getX();
      let yDiff = vectorHUD.y - each.getY();
      let zDiff = vectorHUD.z - each.getZ();

      // nudge the container toward this position
      each.nudge(xDiff * d, yDiff * d, zDiff * d);

      let changedPosX = each.getX()
      let changedPosY = each.getY()
      let changedPosZ = each.getZ()

      console.log(changedPosX +' # '+ changedPosY +' # '+ changedPosZ);
      console.log(each.getWorldPosition().x + ' '+ each.getWorldPosition().y+' '+each.getWorldPosition().z )
    }
  });
}


function spinPlayer(spinAmount) {
	playerArrayClient.forEach((each) => {
		if (socket.id == each.id) {
			each.spinY(spinAmount);
		}
	});
}


let playerNum = 0;
function displayTextPanel() {

	// console.log(myTimeMinute);

	if(textHolder) {
		textHolder.tag.setAttribute('text',
					`value: Number of Players Online: ${playerNum}\n
									Find the treasure!\n

									;

					width:${textHolder.width * 1.5};
					color: rgb(0,0,0);
					align: center;`
				);
	}
}



function followMyObject() {
  playerArrayClient.forEach((each) => {
    if (socket.id == each.id) {
      // console.log(world.camera)
      world.camera.setPosition(each.getX(),each.getY()+3,each.getZ()+4);

				displayTextPanel();
    }
  });
}


function emitEvent(arg,obj,time = 1000,) {
  let send = false;
  if (mouseIsPressed) {
    send = true;
  }
  if(send == true) {
    socket.emit(arg,obj)
  }
  send = false;
}


// https://www.npmjs.com/package/aframe-look-at-component

socket.on('disconnect', function(data) {
  //console.log('number of players: ', playerArrayClient.length);

  for (let j = 0; j < playerArrayClient.length; j++) {
      if (playerArrayClient[j].id == data.id) {
        world.remove(playerArrayClient[j]);

        playerArrayClient.splice(j, 1);
        j-=1;
      }
  }
	playerNum = playerArrayClient.length
});


let rotationVector;
let rotationY = 0;
let avatar;
function setUserRotation() {
	let p = world.camera.holder.object3D.position //world.getUserPosition()
	rotationVector = new THREE.Vector3(sin(radians(rotationY))*10+p.x, p.y, cos(radians(rotationY))*10+p.z)
}


function setUserPosition(amount) {
	// get world position of the avatar
	var vectorAvatar = new THREE.Vector3();
	vectorAvatar.setFromMatrixPosition(avatar.tag.object3D.matrixWorld);
	console.log("*1", vectorAvatar)

	// get world position of camera
	var vectorCamera = new THREE.Vector3();
	vectorCamera.setFromMatrixPosition(world.camera.holder.object3D.matrixWorld);
	console.log("*2", vectorCamera)

	// compute differences
	var xDiff = vectorAvatar.x - vectorCamera.x;
	var yDiff = vectorAvatar.y - vectorCamera.y;
	var zDiff = vectorAvatar.z - vectorCamera.z;
	var vectorDiff = new THREE.Vector3( xDiff*amount, 0, zDiff*amount )

	console.log("*3", vectorDiff)

	// set new position
	console.log(world.camera.holder.object3D.position)
	world.camera.holder.object3D.position.add(vectorDiff)

	setUserRotation()
}




/*********************************************************/
