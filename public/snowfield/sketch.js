// variable to hold a reference to our A-Frame world
var world;

var sensor;

let box;

// class myCane{
// 	constructor(x, y){	//gets random x y
// 		this.x = x;
// 		this.y = y;
//
// 	}
// }


let myContainer
let box1
let box2
let box3
let box4
let box5
let box6
let box7
let box8
let box9
let box10
let box11
let box12
function setup() {

	noCanvas();
	world = new World('VRScene');





//
// 	myContainer = new Container3D({x:0, y:0, z:0});
//
// 	myContainer.addChild(box1)
// 	myContainer.addChild(box2)
// 	myContainer.addChild(box3)
// 	myContainer.addChild(box4)
// 	myContainer.addChild(box5)
// 	myContainer.addChild(box6)
//
// 	myContainer.tag.object3D.userData.solid = true;
// world.add(myContainer);

	// create a bunch of obstacles
	for (var i = 0; i < 50; i++) {


			box1 = new Box({
				x: 0,
				y: 0,
				z: 0,
				height: 1,
				red: 255,
				green: 255,
				blue: 255
			});
			box1.tag.object3D.userData.solid = true;

			box2 = new Box({
				x: 0,
				y: 1,
				z: 0,
				height: 1,
				red: 255,
				green: 0,
				blue: 0
			});
			box2.tag.object3D.userData.solid = true;

			box3 = new Box({
				x: 0,
				y: 2,
				z: 0,
				height: 1,
				red: 255,
				green: 255,
				blue: 255
			});
			box3.tag.object3D.userData.solid = true;

			box4 = new Box({
				x: 0,
				y: 3,
				z: 0,
				height: 1,
				red: 255,
				green: 0,
				blue: 0
			});
			box4.tag.object3D.userData.solid = true;

			box5 = new Box({
				x: 0,
				y: 4,
				z: 0,
				height: 1,
				red: 255,
				green: 255,
				blue: 255
			});
			box5.tag.object3D.userData.solid = true;

			box6 = new Box({
				x: 0,
				y: 5,
				z: 0,
				height: 1,
				red: 255,
				green: 0,
				blue: 0
			});
			box6.tag.object3D.userData.solid = true;

			box7 = new Box({
				x: 0,
				y: 6,
				z: 0,
				height: 1,
				red: 255,
				green: 255,
				blue: 255
			});
			box7.tag.object3D.userData.solid = true;

			box8 = new Box({
				x: 0,
				y: 7,
				z: 0,
				height: 1,
				red: 255,
				green: 0,
				blue: 0
			});
			box8.tag.object3D.userData.solid = true;

			box9 = new Box({
				x: 0,
				y: 8,
				z: 1,
				height: 1,
				red: 255,
				green: 255,
				blue: 255
			});
			box9.tag.object3D.userData.solid = true;

			box10 = new Box({
				x: 0,
				y: 8,
				z: 2,
				height: 1,
				red: 255,
				green: 0,
				blue: 0
			});
			box10.tag.object3D.userData.solid = true;


			box11 = new Box({
				x: 0,
				y: 7,
				z: 3,
				height: 1,
				red: 255,
				green: 255,
				blue: 255
			});
			box11.tag.object3D.userData.solid = true;

			box12 = new Box({
				x: 0,
				y: 6,
				z: 3,
				height: 1,
				red: 255,
				green: 0,
				blue: 0
			});
			box12.tag.object3D.userData.solid = true;
			// box7 = new Box({
			// 	x: 0,
			// 	y: 6,
			// 	z: 1,
			// 	height: 1,
			// 	red: 255,
			// 	green: 255,
			// 	blue: 255
			// });
			// box7.tag.object3D.userData.solid = true;

		myContainer = new Container3D({
			x:int(random(-49,49)),
			y:0,
			z:int(random(-45,49))}
		);

		myContainer.addChild(box1)
		myContainer.addChild(box2)
		myContainer.addChild(box3)
		myContainer.addChild(box4)
		myContainer.addChild(box5)
		myContainer.addChild(box6)
		myContainer.addChild(box7)
		myContainer.addChild(box8)
		myContainer.addChild(box9)
		myContainer.addChild(box10)
		myContainer.addChild(box11)
		myContainer.addChild(box12)


		myContainer.tag.object3D.userData.solid = true;
		world.add(myContainer);

		var grey = random(75,225);
		// box = new Box({
		// 	x: int(random(-49,49)),
		// 	y: 2,
		// 	z: int(random(-45,49)),
		// 	height: 4,
		// 	red: grey, green: grey, blue: grey
		// });
		//
		// // important -- set a property on the box to tell the system that this is
		// // an entity that we can collide with!
		// box.tag.object3D.userData.solid = true;
		//
		// world.add(box);


	}

	house = new OBJ({
		asset: 'house_obj',
		mtl: 'house_mtl',
		x: 0,
		y: 1.5,
		z: 0,
		rotationX:0,
		rotationY:90,
		scaleX:4,
		scaleY:4,
		scaleZ:4,
	});
	world.add(house);



	// create a plane to serve as our "ground"
	var g = new Plane({x:0, y:-1, z:0, asset:'ground',width:100, height:100, rotationX:-90, metalness:0.25});
	// g.tag.object3D.userData.solid = true;
	world.add(g);

	sensor = new Sensor();
}


function draw() {

	var objectAhead = sensor.getEntityInFrontOfUser();
	console.log(objectAhead,'ahead here')
	if (mouseIsPressed || keyIsDown(87)) {
		var okToMove = true;

		console.log(objectAhead);

		// if there is an object, it is close and it is solid, prevent motion
		if (objectAhead && objectAhead.distance < 1 && objectAhead.object.parent.userData.solid) {
			okToMove = false;
			console.log(objectAhead.object.el.object3D,'ahead');

		}


		if (okToMove) {
			world.moveUserForward(0.1);
		}
	}
	if (objectAhead && objectAhead.distance < 1 && objectAhead.object.parent.userData.solid) {
		if(!okToMove) {
			console.log(objectAhead.object.parent,'parent')
			objectAhead.object.parent.parent.rotateY(0.01)
			// console.log(objectAhead,'ahead')

		}
	}

}





class Sensor {

	constructor() {
		// raycaster - think of this like a "beam" that will fire out of the
		// bottom of the user's position to figure out what is below their avatar
		this.rayCaster = new THREE.Raycaster();
		this.userPosition = new THREE.Vector3(0,0,0);
		this.downVector = new THREE.Vector3(0,-1,0);
		this.intersects = [];

		this.rayCasterFront = new THREE.Raycaster();
		this.cursorPosition = new THREE.Vector2(0,0);
		this.intersectsFront = [];
	}

	getEntityInFrontOfUser() {
		// update the user's current position
		var cp = world.getUserPosition();
		this.userPosition.x = cp.x;
		this.userPosition.y = cp.y;
		this.userPosition.z = cp.z;

		if (world.camera.holder.object3D.children.length >= 2) {
			this.rayCasterFront.setFromCamera( this.cursorPosition, world.camera.holder.object3D.children[1]);
			this.intersectsFront = this.rayCasterFront.intersectObjects( world.threeSceneReference.children, true );

			// determine which "solid" items are in front of the user
			for (var i = 0; i < this.intersectsFront.length; i++) {
				if (!this.intersectsFront[i].object.el.object3D.userData.solid) {
					this.intersectsFront.splice(i,1);
					i--;
				}
			}

			if (this.intersectsFront.length > 0) {
				return this.intersectsFront[0];
			}
			return false;
		}
	}
}
