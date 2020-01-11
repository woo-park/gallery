
/*
You can assume that that the user will be experiencing your world using only a mobile device and a VR headset OR a computer that only has access to a mouse - no keyboard controls are allowed (with the exception of for debugging purposes)

Create a space that the user can navigate using only the mouse (mouseIsPressed) or a touch even (touchIsPressed). You may want to use A-Frame P5 methods such as moveUserForward, slideToObject and teleportToObject to navigate your space.

// navigate with mouse
//teleportToObject
//sound
//user's respond


//group this
Use at least 5 of the geometric primitives supported by A-Frame (box, plane, sphere, ring, torus, etc)
Use both color materials and bitmapped materials (JPG / PNG files)


Trigger sound in your experience at least once



At least one object in your world should respond the user's touch (collecting a coin, making something move, change size, etc)


*/



// letiable to hold a reference to our A-Frame world
let world;
let b4, b5, b6;


function textPanel() {

}

function inventory(){

}
inventory.bullet = 0;


function randomSpots() {
			// what textures can we choose from?
			let textures = ['iron', 'gold', 'stone'];

			// create lots of boxes
			for (let i = 0; i < 150; i++) {
				// pick a location
				let x = random(-50, 50);
				let z = random(-50, 50);

				// pick a random texture
				let t = textures[ int(random(textures.length)) ];

				// create a box here
				let b = new Box({
									x:x,
									y:0.5,
									z:z,
									asset:t
				});

				// add the box to the world
				world.add(b);
			}
}	// end of randomSpots function	=> call in setup



function primitives() {

		function primitiveShapesDisplay() {
			let b = new Box({
								x:-10, y:1, z:0,
								width:1, height: 1.2, depth: 2,
								red:random(255), green:random(255), blue:random(255)
							});
			world.add(b);

			// cylinder primitive
			let cl = new Cylinder({
								x: 6 , y:2, z:0,
								height:1.5,
								radius: 0.25,
								red:random(255), green:random(255), blue:random(255),
							});
			world.add(cl);

			// plane primitive
			let p = new Plane({
								x: -6, y:2, z:0,
								width: 2, height:2,
								red:random(255), green:random(255), blue:random(255),
								side:'double'
							});
			world.add(p);

			// dodecahedron primitive
			let d = new Dodecahedron({
								x: -4, y:1, z:0,
								radius: 0.5,
								red:random(255), green:random(255), blue:random(255),
							});
			world.add(d);

			// Octahedron primitive
			let o = new Octahedron({
								x: -2, y:2, z:0,
								radius: 0.7,
								red:random(255), green:random(255), blue:random(255),
							});
			world.add(o);

							//
							// // create a plane to serve as our "ground"
							// var ground = new Plane({x:0, y:2, z:0, width:100, height:100, red:0, green:102, blue:153, rotationX:-90, metalness:0.25});
							//
							// // create a plane to serve as a holder for our text
							// textHolder = new Plane({
							// 	x:0, y:0, z:0,
							// 	width: 5,
							// 	height: 1
							// });
							// world.add(textHolder)
							//
							// // now hack into the textHolder variable and give it some text properties
							// textHolder.tag.setAttribute('text',
							// 		'value: Hello, World!; color: rgb(0,0,0); align: center;');
							//
							// // add the plane to our world
							// world.add(ground);


				// circle primitive
				let c = new Circle({
									x: 2, y:2, z:0,
									radius: 1,
									// red:random(255), green:random(255), blue:random(255),
									asset: 'iron',
									side:'double'
								});
				world.add(c);

				// ring primitive
				let r = new Ring({
									x: 8 , y:1, z:0,
									radiusInner:0.5,
									radiusOuter: 1,
									side: 'double',
									asset: 'gold',
									red:random(255), green:random(255), blue:random(255),
								});
				world.add(r);

		}

		// create a plane to serve as our "ground"
		let g = new Plane({
							x:0, y:0, z:0,
							width:100,
							height:100,
							// red:0, green:102, blue:153,
							rotationX:-90,
							// metalness:0.25,
							side: 'double',
							asset: 'stone',
							repeatX: 50,
							repeatY: 50

						});

		// add the plane to our world
		world.add(g);


}	// end of primitives function => call in setup



let scaleChange = 0.01;		// needs to be global
function scaleObjects() {
	// get the current scale of the object (this is an object with three properties - x, y & z)
	let s = b4.getScale();

	// did we get too big or too small?
	if (s.x > 2 || s.x < 0.5) {
		scaleChange *= -1;
	}

	// update accordingly
	b4.setScale(s.x + scaleChange, s.y + scaleChange, s.z + scaleChange);
}	// end of scaleObjects function => call in draw


function rotateObjects() {
	b4 = new Box({
						x:1, y:1, z:0,
						rotationX: 45,
						red: random(255), green: random(255), blue: random(255)
	});
	world.add(b4);

	b5 = new Box({
						x:3, y:1, z:0,
						rotationY: 45,
						red: random(255), green: random(255), blue: random(255)
	});
	world.add(b5);

	b6 = new Box({
						x:5, y:1, z:0,
						rotationZ: 45,
						red: random(255), green: random(255), blue: random(255)
	});
	world.add(b6);
}		// end of rotateObjects function => call in setup

function rotateObjectsStart() {
	// spin each box in one of the axes
	b4.spinX(0.2);
	b5.spinY(0.2);
	b6.spinZ(0.2);
}		// end of rotateObjectsStart function => call in draw

function rotateObjectsReset() {
	b4.setRotation(0,0,0);
	b5.setRotation(0,0,0);
	b6.setRotation(0,0,0);
} // end of rotateObjectsReset function => call in mousePressed



//setting the boundary invisible wall and resets the position
function userPos() {
	let pos = world.getUserPosition();

	// now evaluate
	if (pos.x > 50) {
		world.setUserPosition(-50, pos.y, pos.z);
	}
	else if (pos.x < -50) {
		world.setUserPosition(50, pos.y, pos.z);
	}
	if (pos.z > 50) {
		world.setUserPosition(pos.x, pos.y, -50);
	}
	else if (pos.z < -50) {
		world.setUserPosition(pos.x, pos.y, 50);
	}
}	// end of userPos function => call in draw

function moveForwardWithPress() {
		// if (mouseIsPressed) {
		// 	world.moveUserForward(-0.2);
		// }
}	// end of userPos function => call in draw



let container;								//must be global
function containObjects() {

	container = new Container3D({x:0, y:1, z:-5});


	world.add(container);

	let b1 = new Box({
						x:-5, y:0, z:0,
						red: random(255), green:random(255), blue:random(255)
	});

	// add the box to the container
	container.addChild(b1);

	// create a second box
	let b2 = new Box({
						x:5, y:0, z:0,
						red: random(255), green:random(255), blue:random(255)
	});

	// add the box to the container
	container.addChild(b2);

}	//end of cointainObjects function => call in setup

function containObjectsSpin() {
	container.spinY(1);
} // end of containObjectsSpin function => call in draw


let particles = [];
function addParticle() {
	// always create a new particle
	let temp = new Particle(0, 0, -5);

	// add to array
	particles.push( temp );

	// draw all particles
	for (let i = 0; i < particles.length; i++) {
		let result = particles[i].move();
		if (result == "gone") {						//then also pops all particles
			particles.splice(i, 1);
			i-=1;
		}
	}
}	// end of addParticle function => call in draw


class Particle {

	constructor(x,y,z) {

		// construct a new Box that lives at this position
		this.myBox = new Sphere({
								x:x, y:y, z:z,
								red: random(255), green:random(255), blue:random(255),
								radius: 0.5
		});

		// add the box to the world
		world.add(this.myBox);

		// keep track of an offset in Perlin noise space
		this.xOffset = random(1000);
		this.zOffset = random(2000, 3000);
	}

	// function to move our box
	move() {
		// compute how the particle should move
		// the particle should always move up by a small amount
		let yMovement = 0.01;

		// the particle should randomly move in the x & z directions
		let xMovement = map( noise(this.xOffset), 0, 1, -0.05, 0.05);
		let zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);

		// update our poistions in perlin noise space
		this.xOffset += 0.01;			//updating perlin noise offset
		this.yOffset += 0.01;

		// set the position of our box (using the 'nudge' method)
		this.myBox.nudge(xMovement, yMovement, zMovement);

		// make the boxes shrink a little bit
		let boxScale = this.myBox.getScale();
		this.myBox.setScale( boxScale.x-0.005, boxScale.y-0.005, boxScale.z-0.005);

		// if we get too small we need to indicate that this box is now no longer viable
		if (boxScale.x <= 0) {
			// remove the box from the world
			world.remove(this.myBox);
			return "gone";
		}
		else {
			return "ok";
		}
	}
}	// end of Class constructor


function animateObjects(arg) {
	arg.y += 1;
	arg.y = constrain(arg.y, 0, 30);
}

let container3d;						//must be global

let chair;
let table;
let tile;
let book1;
let panel;
let feather;
let pillow;

let textHolder;

let containObjects3d = function () {

	// for (let x = -20; x <= 20; x += 10 ) {							//okay populating works
	// 	for (let z = -20; z <= 20; z += 10) {
	// 		container3d = new Container3D({x:x, y:0, z:z});
	// 		world.add(container3d);
	// 		load3DObject(container3d);
	// 	}
	// }

	container3d = new Container3D({x:0, y:0, z:0});
	world.add(container3d);
	load3DObject(container3d);

}	//end of cointainObjects function => call in setup

containObjects3d.spinContainer = function(){
	container3d.spinY(0.1);
}

let subContainer3d;
let load3DObject_sub = function() {

	subContainer3d = new Container3D({x:3, y:0.1, z:2});


	pillow = new OBJ({
		asset: 'pillow_obj',
		mtl: 'pillow_mtl',
		x: 0,
		y: 0,		// 0.03 down
		z: 0,
		rotationX:0,
		rotationY:180,
		rotationZ:0,
		scaleX:0.2,
		scaleY:0.2,
		scaleZ:0.2
	});

	subContainer3d.addChild(pillow);


//tie feather and pillow

	// feather = new OBJ({
	// 	asset: 'feather_obj',
	// 	mtl: 'feather_mtl',
	// 	x: 0,
	// 	y: 1.22,		// 0.01 down
	// 	z: 0,
	// 	rotationX:180,
	// 	rotationY:90,
	// 	rotationZ:0,
	// 	scaleX:0.2,
	// 	scaleY:0.1,
	// 	scaleZ:0.1
	// });
	// subContainer3d.addChild(feather);

	container3d.addChild(subContainer3d);
}

let userPosition;
let targets = [];
let projectiles = [];
let feathers = [];
let hit = false;
function addFeathers() {
	// setTimeout(() => {
		// console.log(frameRate(),'frrate')
		if( int(frameRate()) % 5 == 0) {
			let temp = new FeatherParticle(0, 0, -5);

			feathers.push( temp );
		}



		for (let i = 0; i < feathers.length; i++) {
			let result = feathers[i].move();
			feathers[i].spinning();
			if (result == "gone") {						//then also pops all particles
				feathers.splice(i, 1);
				i-=1;
			}
		}

	// }, 1000);

}

class FeatherParticle {
	constructor(x,y,z) {

		// construct a new Box that lives at this position
		this.myFeather = new OBJ({
										asset: 'feather_obj',
										mtl: 'feather_mtl',
										x: 0,
										y: 0.14,		// 0.01 down
										z: 0,
										rotationX:180,
										rotationY:90,
										rotationZ:0,
										scaleX:0.2,
										scaleY:0.1,
										scaleZ:0.1
		});

		// add the box to the world
		subContainer3d.addChild(this.myFeather);

		// keep track of an offset in Perlin noise space
		this.xOffset = random(1000);
		this.zOffset = random(2000, 3000);
		this.spinRandom = random(-0.2,0.2);
	}

	move() {
		// compute how the particle should move
		// the particle should always move up by a small amount
		let yMovement = 0.01;

		// the particle should randomly move in the x & z directions
		let xMovement = map( noise(this.xOffset), 0, 1, -0.05, 0.05);
		let zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);

		// update our poistions in perlin noise space
		this.xOffset += 0.01;			//updating perlin noise offset
		this.zOffset += 0.01;


		// set the position of our box (using the 'nudge' method)
		this.myFeather.nudge(xMovement, yMovement, zMovement);

		// make the boxes shrink a little bit
		let boxScale = this.myFeather.getScale();
		this.myFeather.setScale( boxScale.x-0.001, boxScale.y-0.001, boxScale.z-0.001);

		// if we get too small we need to indicate that this box is now no longer viable
		if (boxScale.x <= 0) {
			// remove the box from the world
			subContainer3d.removeChild(this.myFeather);
			return "gone";
		}
		else {
			return "ok";
		}
	}

	spinning() {

		this.myFeather.spinX(this.spinRandom);
		this.myFeather.spinY(this.spinRandom);
		this.myFeather.spinZ(this.spinRandom);
	}

}	// end of Class


function load3DObject(container3d) {

	load3DObject_sub();

	// add a Wavefront (OBJ) model
	// you need to make sure to reference both the OBJ and MTL file here (geometry & material are stored separately)
	chair = new OBJ({
		asset: 'chair_obj',
		mtl: 'chair_mtl',
		x: 0,
		y: 0.33,
		z: 1.5,
		rotationX:0,
		rotationY:0,
		rotationZ:0,
		scaleX:1,
		scaleY:1,
		scaleZ:1,
		clickFunction: function(e) {
			// e.setRed(random(255));
		}
	});
	container3d.addChild(chair);

	table = new OBJ({
		asset: 'table_obj',
		mtl: 'table_mtl',
		x: 0,
		y: 1.22,		// 0.01 down
		z: 0,
		rotationX:0,
		rotationY:180,
		rotationZ:0,
		scaleX:0.4,
		scaleY:0.4,
		scaleZ:0.4
	});
	// container3d.addChild(table);

	textHolder = new Plane({
		x:0, y:10, z:0,
		width: 50,
		height: 1,
		red: 0, green: 255, blue: 0
	});

	container3d.addChild(textHolder)
	textHolder.tag.setAttribute('text',
	    'value: Hello, World!; color: rgb(23,23,100); align: center;');


	for (let i =0; i < 5; i++) {
	book1 = new OBJ({
		asset: 'book1_obj',
		mtl: 'book1_mtl',
		x: random(5),
		y: 10.22,		// 0.01 down
		z: 0.4,
		rotationX:0,
		rotationY:180,
		rotationZ:0,
		scaleX:1.2,
		scaleY:1.2,
		scaleZ:1.2
	});

	targets.push( book1 );
	container3d.addChild(book1);

	}
	// panel = new OBJ({
	// 	asset: 'panel_obj',
	// 	mtl: 'panel_mtl',
	// 	x: 0,
	// 	y: 20.22,		// 0.01 down
	// 	z: 0,
	// 	rotationX:0,
	// 	rotationY:180,
	// 	scaleX:0.02,
	// 	scaleY:0.02,
	// 	scaleZ:0.02
	// });
	// world.add(panel);



	for (let t = -10; t <= 10; t += 10) {
		for (let p = -10; p <= 10; p+= 10) {
			tile = new OBJ({
				asset: 'tile_obj',
				mtl: 'tile_mtl',
				x: t,
				y: 0.01,
				z: p,
				rotationX:0,
				rotationY:90,
				rotationZ:0,
				scaleX:0.0755,
				scaleY:0.05,
				scaleZ:0.1305
			});

			container3d.addChild(tile);
		}
	}



}	//end of load3DObject function => call in cointainObjects3d



function setup() {
	// no canvas needed
	noCanvas();

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');




		primitives();


		// rotateObjects();

		//turn these on before submitting
		// randomSpots();
		// containObjects();
		containObjects3d();
		for (let k = 0; k < targets.length; k++) {

			targets[k].y = 10;
		}

		// let temp_init = new Projectile();
		// projectiles.push( temp_init );

		textPanel();





} // end of setup

function draw() {
	// moveForwardWithPress();

	//turn these on before submitting
	// userPos();
	// rotateObjectsStart();
	// scaleObjects();
	// containObjectsSpin();




	userPosition = world.getUserPosition();		// question: i moved here inside draw bc user pos changes --- is this right?

	//spinning
	// containObjects3d.spinContainer();
	chair.spinY(-0.4);


	if (pillow.getY() > 0.1){
		pillow.y = 0.03
	}
	pillow.nudge(0,0.002,0)
	// pillow.y = constrain(pillow.getY(), 0, 1);


for (let k = 0; k < targets.length; k++) {
		// book.nudge()
		if(hit == false){
			targets[k].nudge(0,-0.03,0);
		}
		if (targets[k].getY() < 0.1) {
			targets[k].y = 0.1;
		}

	}



addFeathers();
for (let q = 0; q < feathers.length; q++) {
	mycurPosition = world.getUserPosition();

	// if (feathers[0].x) {
		// console.warn(feathers[0].myFeather.x);
		let dis = dist(mycurPosition.x, mycurPosition.y, mycurPosition.z, feathers[q].myFeather.x, feathers[q].myFeather.y, feathers[q].myFeather.z)
		if (dis < 1) {
			// // alert('hit!!')
			// let temp = new Projectile();
			// projectiles.push( temp );
			inventory.bullet += 1;
			// return false;
			// myStorage.push( temp );
		}

	// }

}
	// if(myStorage.length > 0){

	if (projectiles.length > 0) {
		// alert('exist')
		// if(shoot) {

			projectilesMove();
			// alert('shoot')

		// }

	}

	// }

}

let myStorage = [];
let start = null;
function step(timestamp) {
	if(!start) start = timestamp;
	let progress = timestamp - start;	//since the time timestamp began
	// addFeathers();
	if (progress < 8000) {
		// alert(timestamp)		//timestamp is given
		// alert(progress)
		window.requestAnimationFrame(step);
	}
}
window.requestAnimationFrame(step);

class Projectile {
	constructor() {


		// next, figure out how the user is currently rotated
		let userRotation = world.getUserRotation();

		this.myContainer = new Container3D({
			x: userPosition.x,
			y: userPosition.y,
			z: userPosition.z,
			rotationX: userRotation.x,
			rotationY: userRotation.y,
			rotationZ: userRotation.z
		});
		world.add(this.myContainer);


		this.myCube = new OBJ({
										asset: 'feather_obj',
										mtl: 'feather_mtl',
										x: 0,
										y: 0.14,		// 0.01 down
										z: 0,
										rotationX:180,
										rotationY:90,
										rotationZ:0,
										scaleX:0.2,
										scaleY:0.1,
										scaleZ:0.1
		});

		// add the assset to the container (not the world!)
		this.myContainer.addChild(this.myCube);

	}

	move() {
		// the projectile just moves along the z-axis by a certain amount
		// because it's been placed into a container that is already rotated correctly
		this.myCube.nudge(0,0,-0.2);
	}
}

function projectilesMove() {
	for (var i = 0; i < projectiles.length; i++) {
		projectiles[i].move();

		// get WORLD position for this projectile	//my cube
	let projectilePosition = projectiles[i].myCube.getWorldPosition();

	if (projectilePosition.x > 50 || projectilePosition.x < -50 || projectilePosition.z > 50 || projectilePosition.z < -50) {
		world.remove(projectiles[i].myContainer);
		projectiles.splice(i, 1);
		i--;
		continue;
	}



	for (var j = 0; j < targets.length; j++) {

		// compute distance
		var d = dist(projectilePosition.x, projectilePosition.y, projectilePosition.z, targets[j].getX(), targets[j].getY(), targets[j].getZ());
		if (d < 2) {
			// hit!

			//erasing from the world
			// container3d.removeChild(targets[j]);
			// targets.splice(j, 1);
			// break;

			// nudge back

			hit = true;
			let ranSpinValueX = random(300, 360)
			let ranSpinValueY = random(300, 360)
			let ranSpinValueZ = random(300, 360)
			let randomNudge = random(0.02,0.2);

			pillow.nudge(0,0.002,0)
			targets[j].nudge(0,randomNudge,-randomNudge);
			targets[j].spinX(ranSpinValueX);
			targets[j].spinY(ranSpinValueY);
			targets[j].spinZ(ranSpinValueZ);
			setTimeout(()=>{
				hit = false;
			},50)
		}
	}


}
}

let shoot = false;
function keyPressed() {

	// time to create a projectile!
	// let temp = new Projectile();
	// projectiles.push( myStorage[0] );
}

// class User {
// 	constructor() {
// 		this.bullet = 0;
// 	}
// 	static useBullet() {
//     return this.bullet;
//   }
// }


function mousePressed() {
	shoot = true;
	if(inventory.bullet > 0){
		let temp = new Projectile();
		projectiles.push( temp );
		inventory.bullet -= 1;
	}
	// rotateObjectsReset();
}
