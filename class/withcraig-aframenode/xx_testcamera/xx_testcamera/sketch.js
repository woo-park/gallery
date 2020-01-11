// variable to hold a reference to our A-Frame world
var world;
var rotationY = 0
var rotationVector;
var avatar

function setup() {
	// no canvas needed
	noCanvas();

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');

	// set up initial user rotation
	setUserRotation()

	// add something to the HUD (in place of the user controlled avatar)
	avatar = new Box({
		red: 255, green: 255, blue: 0,
		width: 0.5, height: 0.5, depth: 0.5,
		z: -0.5, y: -0.5
	})
	// add the container to the user's HUD cursor
	world.camera.cursor.addChild(avatar);


	// some geometry to serve as a reference so we know where we are
	for (var i = 0; i < 300; i++) {
		let temp = new Box({
			red: 128, green: 128, blue: 128,
			y: random(-100,100), x: random(-100,100), z: random(-100,100)
		})
		world.add(temp)
	}
	let floor = new Plane({
		red: 255, green: 0, blue: 0,
		width: 100, height: 100,
		rotationX: -90
	})
	world.add(floor)
}

function draw() {


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

}

function setUserRotation() {
	let p = world.camera.holder.object3D.position //world.getUserPosition()
	rotationVector = new THREE.Vector3(sin(radians(rotationY))*10+p.x, p.y, cos(radians(rotationY))*10+p.z)
}

function setUserPosition(amount) {
	// get world position of the avatar
	var vectorAvatar = new THREE.Vector3();
	vectorAvatar.setFromMatrixPosition(avatar.tag.object3D.matrixWorld);
	console.log(vectorAvatar)

	// get world position of camera
	var vectorCamera = new THREE.Vector3();
	vectorCamera.setFromMatrixPosition(world.camera.holder.object3D.matrixWorld);
	console.log(vectorCamera)

	// compute differences
	var xDiff = vectorAvatar.x - vectorCamera.x;
	var yDiff = vectorAvatar.y - vectorCamera.y;
	var zDiff = vectorAvatar.z - vectorCamera.z;
	var vectorDiff = new THREE.Vector3( xDiff*amount, 0, zDiff*amount )

	console.log(vectorDiff)

	// set new position
	console.log(world.camera.holder.object3D.position)
	world.camera.holder.object3D.position.add(vectorDiff)

	setUserRotation()
}
